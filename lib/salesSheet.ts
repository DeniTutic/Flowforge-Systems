import { BUDGETS, labelFor } from "./contactOptions";
import type { Lead } from "./leadEmail";

/**
 * n8n can take a few seconds (it saves to the sheet before answering). The form waits on this,
 * so it is bounded; if it times out, n8n still finishes saving on its side.
 */
const TIMEOUT_MS = 6000;

let warnedUnconfigured = false;

/**
 * Copies a contact-form lead into the shared sales sheet ("Website Leads" workflow in n8n), next to
 * Hirehand's demo requests, with brand "flowforge". n8n also emails the owner, Reply-To the visitor.
 *
 * Best effort by design, like notifyNewLead: the lead is already stored before this runs, so this
 * never throws and never changes the visitor's response. Does nothing (and says so once in the
 * logs) until LEAD_FORWARD_URL and LEAD_FORWARD_SECRET are set. Server-only: the secret never
 * reaches the browser.
 */
export async function forwardToSalesSheet(lead: Lead): Promise<void> {
  const url = process.env.LEAD_FORWARD_URL?.trim();
  const secret = process.env.LEAD_FORWARD_SECRET?.trim();

  if (!url || !secret) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true;
      console.warn("[sales-sheet] LEAD_FORWARD_URL / LEAD_FORWARD_SECRET not set — leads are not copied to the sales sheet.");
    }
    return;
  }

  const budget = lead.budget ? (labelFor(BUDGETS, lead.budget) ?? lead.budget) : "";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Secret": secret },
      body: JSON.stringify({
        brand: "flowforge",
        lang: "en",
        source_page: "/#contact",
        name: lead.name,
        business: lead.company ?? "",
        business_type: lead.projectType ?? "unsure",
        phone: "",
        email: lead.email,
        message: budget ? `Budget: ${budget}\n\n${lead.message}` : lead.message,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[sales-sheet] the sales sheet rejected the lead (HTTP ${res.status}).`);
    }
  } catch (e) {
    console.error("[sales-sheet] could not reach the sales sheet:", e instanceof Error ? e.message : e);
  }
}
