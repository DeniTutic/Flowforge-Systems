const MIN_FORM_MS = 2_500;
const MAX_FORM_AGE_MS = 60 * 60 * 1000;

/** Honeypot: must be absent or empty string. */
export function isHoneypotClean(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value !== "string") return false;
  return value.trim() === "";
}

/**
 * Client sends when the form was first shown / page loaded. Reject instant bot posts and stale tokens.
 */
export function validateFormTiming(startedAt: unknown): { ok: true } | { ok: false; message: string } {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return { ok: false, message: "Invalid request." };
  }
  const now = Date.now();
  const elapsed = now - startedAt;
  if (elapsed < MIN_FORM_MS) {
    return { ok: false, message: "Please take a moment to complete the form." };
  }
  if (elapsed > MAX_FORM_AGE_MS) {
    return { ok: false, message: "This form expired. Please refresh the page." };
  }
  return { ok: true };
}
