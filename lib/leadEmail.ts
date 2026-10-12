import { BUDGETS, PROJECT_TYPES, labelFor } from "./contactOptions";
import { SITE_URL } from "./site";

export type Lead = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
};

const RESEND_URL = "https://api.resend.com/emails";

/** The form already waits on this, so a slow provider must not hold the visitor hostage. */
const TIMEOUT_MS = 3000;

/** Default sender works with no verified domain, but then Resend only delivers to the account owner. */
const DEFAULT_FROM = "Flowforge Leads <onboarding@resend.dev>";

let warnedUnconfigured = false;

/** Strip line breaks so visitor-supplied text can never add a header or a second subject line. */
function oneLine(text: string, max: number): string {
  return text.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function buildText(lead: Lead): string {
  const base = SITE_URL;
  const lines = [
    "New enquiry from the Flowforge website.",
    "",
    `Name:     ${oneLine(lead.name, 200)}`,
    `Email:    ${lead.email}`,
    lead.company ? `Company:  ${oneLine(lead.company, 200)}` : null,
    lead.projectType
      ? `Project:  ${labelFor(PROJECT_TYPES, lead.projectType) ?? lead.projectType}`
      : null,
    lead.budget ? `Budget:   ${labelFor(BUDGETS, lead.budget) ?? lead.budget}` : null,
    `Received: ${new Date().toISOString().replace("T", " ").slice(0, 16)} UTC`,
    "",
    "Message:",
    lead.message,
    "",
    "—",
    "Reply to this email to answer them directly.",
    `All enquiries: ${base}/admin`,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

/**
 * Emails the owner about a new contact-form lead.
 *
 * Best effort by design: the lead is already stored before this runs, so this never throws and
 * never changes the visitor's response. Plain text only — visitor input is never rendered as HTML.
 * Does nothing (and says so once in the logs) until RESEND_API_KEY and LEAD_NOTIFY_EMAIL are set.
 */
export async function notifyNewLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipients = (process.env.LEAD_NOTIFY_EMAIL ?? "")
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r.includes("@"));

  if (!apiKey || recipients.length === 0) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true;
      console.warn(
        "[lead-email] RESEND_API_KEY / LEAD_NOTIFY_EMAIL not set — new leads are saved but not emailed."
      );
    }
    return;
  }

  const from = process.env.LEAD_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const topic = lead.projectType ? labelFor(PROJECT_TYPES, lead.projectType) : undefined;
  const subject = oneLine(`New lead: ${lead.name}${topic ? ` — ${topic}` : ""}`, 120);

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        text: buildText(lead),
        reply_to: lead.email,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error(`[lead-email] Resend rejected the email (HTTP ${res.status}). ${detail}`);
    }
  } catch (e) {
    console.error("[lead-email] could not reach Resend:", e instanceof Error ? e.message : e);
  }
}
