import { test, expect } from "@playwright/test";
import { forwardToSalesSheet } from "../lib/salesSheet";
import type { Lead } from "../lib/leadEmail";

const lead: Lead = {
  name: "Ana Test",
  email: "ana@example.com",
  company: "Acme d.o.o.",
  projectType: "website",
  budget: "5k-10k",
  message: "We need a new site that actually brings in clients.",
};

type Call = { url: string; init: RequestInit };

const ENV_KEYS = ["LEAD_FORWARD_URL", "LEAD_FORWARD_SECRET"] as const;
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

test("does nothing until both URL and secret are set", async () => {
  stubFetch(() => Promise.resolve(new Response("{}")));
  await forwardToSalesSheet(lead);
  process.env.LEAD_FORWARD_URL = "https://hooks.example.com/lead";
  await forwardToSalesSheet(lead); // URL but no secret
  expect(calls).toHaveLength(0);
});

test("posts the lead as brand flowforge with the secret header", async () => {
  process.env.LEAD_FORWARD_URL = "https://hooks.example.com/lead";
  process.env.LEAD_FORWARD_SECRET = "s3cret";
  stubFetch(() => Promise.resolve(new Response('{"ok":true}', { status: 200 })));

  await forwardToSalesSheet(lead);

  expect(calls).toHaveLength(1);
  const { url, init } = calls[0];
  expect(url).toBe("https://hooks.example.com/lead");
  expect(init.method).toBe("POST");
  expect((init.headers as Record<string, string>)["X-Lead-Secret"]).toBe("s3cret");
  expect(init.signal).toBeInstanceOf(AbortSignal); // can never hang the form

  const body = JSON.parse(String(init.body));
  expect(body).toMatchObject({
    brand: "flowforge",
    name: "Ana Test",
    business: "Acme d.o.o.",
    business_type: "website",
    email: "ana@example.com",
  });
  expect(body.message).toBe("Budget: $5k – $10k\n\nWe need a new site that actually brings in clients.");
});

test("a failing or unreachable sheet never throws", async () => {
  process.env.LEAD_FORWARD_URL = "https://hooks.example.com/lead";
  process.env.LEAD_FORWARD_SECRET = "s3cret";

  stubFetch(() => Promise.resolve(new Response('{"error":"forbidden"}', { status: 403 })));
  await expect(forwardToSalesSheet(lead)).resolves.toBeUndefined();

  stubFetch(() => Promise.reject(new Error("network down")));
  await expect(forwardToSalesSheet(lead)).resolves.toBeUndefined();
});
