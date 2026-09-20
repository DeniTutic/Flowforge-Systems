/** Shared between the contact form (client) and /api/contact (server) so values are whitelisted. */
export const PROJECT_TYPES = [
  { value: "website", label: "Website or redesign" },
  { value: "webapp", label: "Web application" },
  { value: "ai", label: "AI automation" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const BUDGETS = [
  { value: "under-5k", label: "Under $5k" },
  { value: "5k-10k", label: "$5k – $10k" },
  { value: "10k-25k", label: "$10k – $25k" },
  { value: "25k-plus", label: "$25k+" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];
export type Budget = (typeof BUDGETS)[number]["value"];

export const PROJECT_TYPE_VALUES = new Set<string>(PROJECT_TYPES.map((o) => o.value));
export const BUDGET_VALUES = new Set<string>(BUDGETS.map((o) => o.value));

export function labelFor(list: readonly { value: string; label: string }[], value?: string) {
  return list.find((o) => o.value === value)?.label;
}
