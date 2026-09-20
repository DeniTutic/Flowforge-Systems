"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  computeProjectEstimate,
  estimateTier,
  formatUsd,
  type AiScope,
  type Complexity,
  type EstimateResult,
  type Timeline,
} from "@/lib/projectEstimate";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconSparkles, IconSliders, IconLayers, IconLink, IconCpu, IconClock } from "./icons";

const complexityOptions: { value: Complexity; label: string; hint: string }[] = [
  { value: "focused", label: "Focused scope", hint: "Marketing site, few templates" },
  { value: "standard", label: "Standard build", hint: "Custom design + CMS" },
  { value: "large", label: "Large / multi-system", hint: "Portals, apps, many flows" },
];

const aiOptions: { value: AiScope; label: string; hint: string }[] = [
  { value: "none", label: "None", hint: "No AI features" },
  { value: "light", label: "Light", hint: "Chat widget, embeds" },
  { value: "moderate", label: "Moderate", hint: "Workflows & automations" },
  { value: "advanced", label: "Advanced", hint: "Custom AI systems" },
];

const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "flexible", label: "Flexible" },
  { value: "normal", label: "Normal" },
  { value: "rush", label: "Rush / tight" },
];

function renderSummary(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text dark:text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ProjectEstimator() {
  const [sizeDepth, setSizeDepth] = useState(5);
  const [complexity, setComplexity] = useState<Complexity>("standard");
  const [integrations, setIntegrations] = useState(2);
  const [aiScope, setAiScope] = useState<AiScope>("none");
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const input = useMemo(
    () => ({ sizeDepth, complexity, integrations, aiScope, timeline }),
    [sizeDepth, complexity, integrations, aiScope, timeline]
  );

  const runEstimate = useCallback(async () => {
    setIsAnalyzing(true);
    const instant = computeProjectEstimate(input);
    setResult(instant);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const data = (await res.json()) as EstimateResult;
        setResult(data);
      }
    } catch {
      /* keep client-side result */
    } finally {
      setIsAnalyzing(false);
    }
  }, [input]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      void runEstimate();
    }, 280);
    return () => window.clearTimeout(t);
  }, [runEstimate]);

  const display = result ?? computeProjectEstimate(input);
  const tier = estimateTier(display.high);

  return (
    <section
      id="estimator"
      className="pt-10 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <SectionEyebrow icon={<IconSparkles />}>AI-powered estimate</SectionEyebrow>
          <h2 className="section-title mb-4">Not sure? Ballpark it.</h2>
          <p className="section-lead max-w-xl mx-auto">
            Answer a few quick questions for an instant, conservative range in USD. We confirm
            scope on a discovery call before any final quote.
          </p>
        </Reveal>

        <Reveal delay={80} className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-3 card p-6 sm:p-8 space-y-8">
            <div>
              <label
                htmlFor="size-depth"
                className="flex justify-between items-baseline text-sm font-medium text-text dark:text-white mb-2"
              >
                <span className="flex items-center gap-1.5">
                  <IconSliders className="w-4 h-4" /> Size &amp; depth
                </span>
                <span className="text-primary dark:text-primary-light font-semibold text-lg tabular-nums">{sizeDepth}/10</span>
              </label>
              <p className="text-xs text-text-light dark:text-steel-dark mb-3">
                1 = simple landing page · 10 = large product or multi-app build
              </p>
              <input
                id="size-depth"
                type="range"
                min={1}
                max={10}
                step={1}
                value={sizeDepth}
                onChange={(e) => setSizeDepth(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-ink/10 dark:bg-white/10 accent-primary cursor-pointer"
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={sizeDepth}
                aria-label="Size and depth"
              />
              <div className="flex justify-between text-[0.65rem] text-text-light dark:text-steel-dark mt-1.5 px-0.5">
                <span>Landing page</span>
                <span>Multi-app build</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-white mb-3 flex items-center gap-1.5">
                <IconLayers className="w-4 h-4" /> Complexity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setComplexity(opt.value)}
                    className={`rounded-xl border px-3 py-3 min-h-[44px] text-left transition-all ${
                      complexity === opt.value
                        ? "border-primary bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/30"
                        : "border-line dark:border-line-dark hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        complexity === opt.value ? "text-primary dark:text-primary-light" : "text-text dark:text-white"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-xs text-text-light dark:text-steel-dark mt-0.5">
                      {opt.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline text-sm font-medium text-text dark:text-white mb-2">
                <span className="flex items-center gap-1.5">
                  <IconLink className="w-4 h-4" /> Integrations
                </span>
                <span className="text-primary dark:text-primary-light font-semibold text-lg tabular-nums">{integrations}</span>
              </div>
              <p className="text-xs text-text-light dark:text-steel-dark mb-3">
                CRM, payments, analytics, custom APIs, etc.
              </p>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={integrations}
                onChange={(e) => setIntegrations(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-ink/10 dark:bg-white/10 accent-primary cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={integrations}
                aria-label="Number of integrations"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-white mb-3 flex items-center gap-1.5">
                <IconCpu className="w-4 h-4" /> AI scope
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {aiOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAiScope(opt.value)}
                    className={`rounded-xl border px-3 py-3 min-h-[44px] text-left transition-all ${
                      aiScope === opt.value
                        ? "border-primary bg-primary/10 dark:bg-primary/15 ring-1 ring-primary/30"
                        : "border-line dark:border-line-dark hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        aiScope === opt.value ? "text-primary dark:text-primary-light" : "text-text dark:text-white"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-xs text-text-light dark:text-steel-dark mt-0.5">
                      {opt.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-white mb-3 flex items-center gap-1.5">
                <IconClock className="w-4 h-4" /> Timeline
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTimeline(opt.value)}
                    className={`rounded-xl border px-3 py-3 min-h-[44px] text-sm font-medium transition-all ${
                      timeline === opt.value
                        ? "border-primary bg-primary/10 text-primary dark:text-primary-light dark:bg-primary/15 ring-1 ring-primary/30"
                        : "border-line dark:border-line-dark text-text-light dark:text-steel-dark hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="relative rounded-2xl border border-primary/25 dark:border-primary/30 bg-paper-soft dark:bg-ink-card shadow-xl shadow-primary/5 overflow-hidden">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary-bright to-transparent transition-opacity duration-300 ${
                  isAnalyzing ? "opacity-100 animate-pulse" : "opacity-0"
                }`}
                aria-hidden
              />
              <div className="px-6 py-7 sm:px-7 sm:py-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light text-[0.68rem] font-semibold uppercase tracking-wide">
                    ≈ {tier} package
                  </span>
                </div>

                <p className="text-xs font-medium text-text-light dark:text-steel-dark uppercase tracking-wide text-center mb-1">
                  {isAnalyzing ? "Analyzing your project…" : "Indicative range (USD)"}
                </p>
                <p className="text-4xl sm:text-[2.75rem] font-semibold tracking-display text-center tabular-nums text-text dark:text-white leading-tight">
                  {formatUsd(display.low, display.high)}
                </p>
                {display.aiPowered && (
                  <p className="text-center text-xs text-primary dark:text-primary-light mt-2 font-medium flex items-center justify-center gap-1">
                    <IconSparkles className="w-3.5 h-3.5" /> AI-assisted explanation · prices from our rate model
                  </p>
                )}

                <div
                  className="mt-5 p-4 rounded-xl bg-paper dark:bg-ink-soft border border-line dark:border-line-dark text-sm text-text-light dark:text-steel-dark leading-relaxed"
                  aria-live="polite"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-primary-light mb-2">
                    How we calculated this
                  </p>
                  <p>{renderSummary(display.summary)}</p>
                  <ul className="mt-3 space-y-1.5 text-xs">
                    {display.factors.map((f) => (
                      <li key={f} className="flex gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary dark:text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs text-text-light dark:text-steel-dark text-center">
                  Final pricing depends on scope, features, timeline, and integrations.
                </p>
                <div className="mt-6">
                  <a href="#contact" className="btn-primary w-full">
                    Get an exact quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
