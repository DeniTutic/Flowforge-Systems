import { test, expect } from "@playwright/test";
import { notifyNewLead, type Lead } from "../lib/leadEmail";

const lead: Lead = {
  name: "Ana Test",
  email: "ana@example.com",
  company: "Acme d.o.o.",
  projectType: "website",
  budget: "5k-10k",
  message: "We need a new site that actually brings in clients.",
};

type Call = { url: string; init: RequestInit };

const ENV_KEYS = ["RESEND_API_KEY", "LEAD_NOTIFY_EMAIL", "LEAD_FROM_EMAIL"] as const;
const realFetch = globalThis.fetch;
const savedEnv: Record<string, string | undefined> = {};
let calls: Call[] = [];

function stubFetch(respond: () => Promise<Response>) {
  calls = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return respond();
  }) as typeof fetch;
}

const ok = () => Promise.resolve(new Response('{"id":"abc"}', { status: 200 }));

test.describe.configure({ mode: "serial" });

test.beforeEach(() => {
  for (const k of ENV_KEYS) savedEnv[k] = process.env[k];
  for (const k of ENV_KEYS) delete process.env[k];
});

test.afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
});

test("does nothing until it is configured", async () => {
  stubFetch(ok);
  await notifyNewLead(lead);
  expect(calls).toHaveLength(0);

  process.env.RESEND_API_KEY = "re_test";
  await notifyNewLead(lead); // key but no recipient
  expect(calls).toHaveLength(0);
});

test("sends one plain-text email with the visitor as Reply-To", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.LEAD_NOTIFY_EMAIL = "owner@example.com";
  stubFetch(ok);

  await notifyNewLead(lead);

  expect(calls).toHaveLength(1);
  const { url, init } = calls[0];
  expect(url).toBe("https://api.resend.com/emails");
  expect(init.method).toBe("POST");
  expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test_key");
  expect(init.signal).toBeInstanceOf(AbortSignal); // can never hang the form

  const body = JSON.parse(String(init.body));
  expect(body.from).toBe("Flowforge Leads <onboarding@resend.dev>");
  expect(body.to).toEqual(["owner@example.com"]);
  expect(body.reply_to).toBe("ana@example.com");
  expect(body.subject).toBe("New lead: Ana Test — Website or redesign");
  expect(body.text).toContain("Acme d.o.o.");
  expect(body.text).toContain("$5k – $10k");
  expect(body.text).toContain("We need a new site that actually brings in clients.");
  expect(body).not.toHaveProperty("html"); // visitor input is never rendered as HTML
});

test("supports several recipients and a custom sender", async () => {
  process.env.RESEND_API_KEY = "re_test";
  process.env.LEAD_NOTIFY_EMAIL = "a@example.com, b@example.com ,not-an-email";
  process.env.LEAD_FROM_EMAIL = "Flowforge <leads@flowforge.systems>";
  stubFetch(ok);

  await notifyNewLead(lead);

  const body = JSON.parse(String(calls[0].init.body));
  expect(body.to).toEqual(["a@example.com", "b@example.com"]);
  expect(body.from).toBe("Flowforge <leads@flowforge.systems>");
});

test("visitor text cannot inject extra headers or recipients", async () => {
  process.env.RESEND_API_KEY = "re_test";
  process.env.LEAD_NOTIFY_EMAIL = "owner@example.com";
  stubFetch(ok);

  await notifyNewLead({
    ...lead,
    name: "Eve\r\nBcc: attacker@example.com\r\nSubject: pwned",
    company: "Evil\nCc: attacker@example.com",
  });

  const body = JSON.parse(String(calls[0].init.body));
  expect(body.subject).not.toMatch(/[\r\n]/);
  expect(body.subject.length).toBeLessThanOrEqual(120);
  expect(body.text).not.toMatch(/^Bcc:/m);
  expect(body.text).not.toMatch(/^Cc:/m);
  expect(body).not.toHaveProperty("bcc");
  expect(body).not.toHaveProperty("cc");
  expect(body.to).toEqual(["owner@example.com"]);
});

test("never throws when the provider is down or rejects the email", async () => {
  process.env.RESEND_API_KEY = "re_test";
  process.env.LEAD_NOTIFY_EMAIL = "owner@example.com";

  stubFetch(() => Promise.reject(new Error("network down")));
  await expect(notifyNewLead(lead)).resolves.toBeUndefined();

  stubFetch(() => Promise.resolve(new Response('{"message":"forbidden"}', { status: 403 })));
  await expect(notifyNewLead(lead)).resolves.toBeUndefined();

  stubFetch(() => Promise.reject(new DOMException("timed out", "TimeoutError")));
  await expect(notifyNewLead(lead)).resolves.toBeUndefined();
});
