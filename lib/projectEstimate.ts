export type Complexity = "focused" | "standard" | "large";
export type Timeline = "flexible" | "normal" | "rush";
export type AiScope = "none" | "light" | "moderate" | "advanced";

export type EstimateInput = {
  sizeDepth: number;
  complexity: Complexity;
  integrations: number;
  aiScope: AiScope;
  timeline: Timeline;
};

export type EstimateResult = {
  low: number;
  high: number;
  summary: string;
  factors: string[];
  aiPowered?: boolean;
};

export type PricingTier = "Starter" | "Growth" | "Scale";

/** Rough package mapping used to badge the estimate — keep in sync with Pricing.tsx tiers. */
export function estimateTier(high: number): PricingTier {
  if (high <= 4500) return "Starter";
  if (high <= 10000) return "Growth";
  return "Scale";
}

/** Realistic US indie/small-agency ballparks (USD), aligned with Flowforge pricing tiers. */
const complexityMultiplier: Record<Complexity, number> = {
  focused: 0.88,
  standard: 1,
  large: 1.22,
};

const timelineMultiplier: Record<Timeline, number> = {
  flexible: 0.92,
  normal: 1,
  rush: 1.1,
};

const aiAddon: Record<AiScope, { low: number; high: number; label: string }> = {
  none: { low: 0, high: 0, label: "No AI features" },
  light: { low: 750, high: 1800, label: "Light AI (chat widget, embeds)" },
  moderate: { low: 2200, high: 4800, label: "Moderate AI (workflows, automations)" },
  advanced: { low: 5500, high: 12000, label: "Advanced AI (custom AI systems)" },
};

export const INPUT_LABELS = {
  complexity: {
    focused: "Focused scope (marketing site, few templates)",
    standard: "Standard build (custom design + CMS)",
    large: "Large / multi-system (portals, apps, many flows)",
  },
  timeline: {
    flexible: "Flexible timeline",
    normal: "Normal timeline",
    rush: "Rush / tight timeline",
  },
  aiScope: {
    none: "No AI",
    light: "Light AI",
    moderate: "Moderate AI",
    advanced: "Advanced AI",
  },
} as const;

function clampSizeDepth(n: number): number {
  return Math.min(10, Math.max(1, Math.round(n)));
}

export function computeProjectEstimate(raw: EstimateInput): EstimateResult {
  const sizeDepth = clampSizeDepth(raw.sizeDepth);
  const integrations = Math.min(10, Math.max(0, Math.round(raw.integrations)));

  /* Size 1 ≈ $1.8k–$3.2k base; each step adds modest US-market increment */
  let baseLow = 1600 + sizeDepth * 320;
  let baseHigh = 2800 + sizeDepth * 580;

  const cMul = complexityMultiplier[raw.complexity];
  baseLow *= cMul;
  baseHigh *= cMul;

  baseLow += integrations * 320;
  baseHigh += integrations * 620;

  const ai = aiAddon[raw.aiScope];
  baseLow += ai.low;
  baseHigh += ai.high;

  const tMul = timelineMultiplier[raw.timeline];
  baseLow *= tMul;
  baseHigh *= tMul;

  baseLow = Math.round(baseLow / 100) * 100;
  baseHigh = Math.round(baseHigh / 100) * 100;
  if (baseHigh <= baseLow) baseHigh = baseLow + 700;

  /* Soft ceiling guard so sliders never produce absurd enterprise numbers */
  baseHigh = Math.min(baseHigh, 45000);
  baseLow = Math.min(baseLow, Math.max(1500, baseHigh - 12000));

  const complexityLabel =
    raw.complexity === "focused"
      ? "focused scope"
      : raw.complexity === "standard"
        ? "standard build"
        : "large / multi-system scope";

  const timelineLabel =
    raw.timeline === "flexible"
      ? "flexible timeline"
      : raw.timeline === "normal"
        ? "standard timeline"
        : "accelerated delivery";

  const factors = [
    `Size & depth ${sizeDepth}/10 — typical for US small businesses and startups at this scale.`,
    `${complexityLabel.charAt(0).toUpperCase() + complexityLabel.slice(1)} — common for agencies serving SMB clients.`,
    integrations > 0
      ? `${integrations} integration${integrations === 1 ? "" : "s"} — CRM, payments, or APIs add setup and QA time.`
      : "No third-party integrations — keeps build and maintenance lean.",
    ai.label + (raw.aiScope === "none" ? "." : " — priced conservatively for US project budgets."),
    `${timelineLabel.charAt(0).toUpperCase() + timelineLabel.slice(1)} — rush work may require focused resourcing.`,
  ];

  const summary = `For a US-based project like yours, we estimate **${formatUsd(baseLow, baseHigh)}**. At **${sizeDepth}/10** size with **${complexityLabel}**, **${integrations}** integration${integrations === 1 ? "" : "s"}, **${ai.label.toLowerCase()}**, and a **${timelineLabel}**, this is a realistic ballpark for a boutique studio—not an enterprise quote. We confirm scope and final pricing after a discovery call.`;

  return { low: baseLow, high: baseHigh, summary, factors, aiPowered: false };
}

export function formatUsd(low: number, high: number): string {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return `${fmt(low)} – ${fmt(high)}`;
}

export function describeInput(input: EstimateInput) {
  const sizeDepth = clampSizeDepth(input.sizeDepth);
  return {
    sizeDepth,
    integrations: Math.min(10, Math.max(0, Math.round(input.integrations))),
    complexity: INPUT_LABELS.complexity[input.complexity],
    timeline: INPUT_LABELS.timeline[input.timeline],
    aiScope: INPUT_LABELS.aiScope[input.aiScope],
  };
}
