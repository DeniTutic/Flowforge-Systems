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

/**
 * Package starting prices. Single source of truth: Pricing.tsx renders these same numbers,
 * and the estimator never shows a range that starts below the package it names.
 */
export const STARTER_FROM = 2999;
export const GROWTH_FROM = 7999;

/**
 * Scale is quoted per project, so it has no price. This is only the midpoint at which the
 * estimator starts calling a scope "Scale" instead of "Growth".
 */
const SCALE_FROM_MIDPOINT = 15000;

/** Nearest package for an estimate, judged by the middle of the range. */
export function estimateTier(low: number, high: number): PricingTier {
  const mid = (low + high) / 2;
  if (mid >= SCALE_FROM_MIDPOINT) return "Scale";
  if (mid >= GROWTH_FROM) return "Growth";
  return "Starter";
}

/** Raise a range so it starts at or above the package it falls into. */
function applyPriceFloor(low: number, high: number): [number, number] {
  const floor = estimateTier(low, high) === "Starter" ? STARTER_FROM : GROWTH_FROM;
  const floored = Math.max(low, floor);
  return [floored, Math.max(high, floored + 700)];
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

  /* Soft ceiling guard so sliders never produce absurd enterprise numbers. The low end may
     only be pulled UP to keep the range at most $12k wide — never down to a fixed floor. */
  baseHigh = Math.min(baseHigh, 45000);
  baseLow = Math.max(baseLow, baseHigh - 12000);

  /* Never quote below the package this lands in. Applied twice: the first pass can lift the
     range into the next package, whose own floor then has to hold. */
  [baseLow, baseHigh] = applyPriceFloor(baseLow, baseHigh);
  [baseLow, baseHigh] = applyPriceFloor(baseLow, baseHigh);

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

  const summary = `For a US-based project like yours, we estimate **${formatUsd(baseLow, baseHigh)}**. At **${sizeDepth}/10** size with **${complexityLabel}**, **${integrations}** integration${integrations === 1 ? "" : "s"}, **${ai.label.charAt(0).toLowerCase() + ai.label.slice(1)}**, and a **${timelineLabel}**, this is a realistic ballpark for a boutique studio—not an enterprise quote. We confirm scope and final pricing after a discovery call.`;

  return { low: baseLow, high: baseHigh, summary, factors, aiPowered: false };
}

export function usd(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatUsd(low: number, high: number): string {
  return `${usd(low)} – ${usd(high)}`;
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
