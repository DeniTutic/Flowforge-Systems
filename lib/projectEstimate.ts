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
};

const complexityMultiplier: Record<Complexity, number> = {
  focused: 0.9,
  standard: 1,
  large: 1.4,
};

const timelineMultiplier: Record<Timeline, number> = {
  flexible: 0.95,
  normal: 1,
  rush: 1.2,
};

const aiAddon: Record<AiScope, { low: number; high: number; label: string }> = {
  none: { low: 0, high: 0, label: "No AI features" },
  light: { low: 1200, high: 2800, label: "Light AI (chat widget, embeds)" },
  moderate: { low: 3500, high: 7500, label: "Moderate AI (workflows, automations)" },
  advanced: { low: 8000, high: 18000, label: "Advanced AI (custom models, multi-agent)" },
};

function clampSizeDepth(n: number): number {
  return Math.min(10, Math.max(1, Math.round(n)));
}

export function computeProjectEstimate(raw: EstimateInput): EstimateResult {
  const sizeDepth = clampSizeDepth(raw.sizeDepth);
  const integrations = Math.min(10, Math.max(0, Math.round(raw.integrations)));

  const sizeFactor = 0.55 + sizeDepth * 0.12;
  let baseLow = 2400 * sizeFactor;
  let baseHigh = 4800 * sizeFactor;

  const cMul = complexityMultiplier[raw.complexity];
  baseLow *= cMul;
  baseHigh *= cMul;

  baseLow += integrations * 420;
  baseHigh += integrations * 880;

  const ai = aiAddon[raw.aiScope];
  baseLow += ai.low;
  baseHigh += ai.high;

  const tMul = timelineMultiplier[raw.timeline];
  baseLow *= tMul;
  baseHigh *= tMul;

  baseLow = Math.round(baseLow / 100) * 100;
  baseHigh = Math.round(baseHigh / 100) * 100;
  if (baseHigh <= baseLow) baseHigh = baseLow + 900;

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
    `Size & depth ${sizeDepth}/10 scales core design and build effort.`,
    `${complexityLabel.charAt(0).toUpperCase() + complexityLabel.slice(1)} adjusts architecture and QA.`,
    integrations > 0
      ? `${integrations} integration${integrations === 1 ? "" : "s"} add API, auth, and testing work.`
      : "No third-party integrations keeps the stack simpler.",
    ai.label + (raw.aiScope === "none" ? "." : " included."),
    `${timelineLabel.charAt(0).toUpperCase() + timelineLabel.slice(1)} affects resourcing and priority.`,
  ];

  const summary = `Based on your inputs, we estimate a **${formatUsd(baseLow, baseHigh)}** project. A size score of **${sizeDepth}/10** with **${complexityLabel}**, **${integrations}** integration${integrations === 1 ? "" : "s"}, and **${ai.label.toLowerCase()}** on a **${timelineLabel}** suggests this range. Final pricing depends on discovery, content readiness, and technical constraints—we confirm everything in a formal quote.`;

  return { low: baseLow, high: baseHigh, summary, factors };
}

export function formatUsd(low: number, high: number): string {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return `${fmt(low)} – ${fmt(high)}`;
}
