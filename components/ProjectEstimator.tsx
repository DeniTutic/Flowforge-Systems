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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionEyebrow icon={<IconSparkles />}>AI-powered estimate</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Smart project estimate
          </h2>
          <p className="text-lg text-text-light dark:text-gray-400 max-w-xl mx-auto">
            Answer a few quick questions for an instant, conservative ballpark in USD—built for US
            businesses and founders. We confirm scope on a discovery call before any final quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <label
                htmlFor="size-depth"
                className="flex justify-between items-baseline text-sm font-medium text-text dark:text-gray-200 mb-2"
              >
                <span className="flex items-center gap-1.5">
                  <IconSliders className="w-4 h-4" /> Size &amp; depth
                </span>
                <span className="text-primary font-bold text-lg tabular-nums">{sizeDepth}/10</span>
              </label>
              <p className="text-xs text-text-light dark:text-gray-500 mb-3">
                1 = simple landing page · 10 = large product or multi-app build (typical US SMB scope)
              </p>
              <input
                id="size-depth"
                type="range"
                min={1}
                max={10}
                step={1}
                value={sizeDepth}
                onChange={(e) => setSizeDepth(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 accent-primary cursor-pointer"
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={sizeDepth}
                aria-label="Size and depth"
              />
              <div className="flex justify-between text-[0.65rem] text-text-light dark:text-gray-500 mt-1.5 px-0.5">
                <span>Landing page</span>
                <span>Multi-app build</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-gray-200 mb-3 flex items-center gap-1.5">
                <IconLayers className="w-4 h-4" /> Complexity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setComplexity(opt.value)}
                    className={`rounded-xl border px-3 py-3 text-left transition-all ${
                      complexity === opt.value
                        ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        complexity === opt.value ? "text-primary" : "text-text dark:text-gray-200"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-xs text-text-light dark:text-gray-500 mt-0.5">
                      {opt.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline text-sm font-medium text-text dark:text-gray-200 mb-2">
                <span className="flex items-center gap-1.5">
                  <IconLink className="w-4 h-4" /> Integrations
                </span>
                <span className="text-primary font-bold text-lg tabular-nums">{integrations}</span>
              </div>
              <p className="text-xs text-text-light dark:text-gray-500 mb-3">
                CRM, payments, analytics, custom APIs, etc.
              </p>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={integrations}
                onChange={(e) => setIntegrations(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 accent-primary cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={integrations}
                aria-label="Number of integrations"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-gray-200 mb-3 flex items-center gap-1.5">
                <IconCpu className="w-4 h-4" /> AI scope
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {aiOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAiScope(opt.value)}
                    className={`rounded-xl border px-3 py-3 text-left transition-all ${
                      aiScope === opt.value
                        ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        aiScope === opt.value ? "text-primary" : "text-text dark:text-gray-200"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-xs text-text-light dark:text-gray-500 mt-0.5">
                      {opt.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-text dark:text-gray-200 mb-3 flex items-center gap-1.5">
                <IconClock className="w-4 h-4" /> Timeline
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTimeline(opt.value)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                      timeline === opt.value
                        ? "border-primary bg-primary/10 text-primary dark:bg-primary/20 ring-1 ring-primary/30"
                        : "border-gray-200 dark:border-gray-600 text-text-light dark:text-gray-400 hover:border-primary/40"
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
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-transparent dark:from-primary/10 dark:to-transparent p-1 shadow-lg overflow-hidden">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ${
                  isAnalyzing ? "opacity-100 animate-pulse" : "opacity-0"
                }`}
                aria-hidden
              />
              <div className="rounded-xl bg-white dark:bg-gray-900 px-6 py-7 sm:px-7 sm:py-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 dark:bg-primary/15 text-primary text-[0.68rem] font-semibold uppercase tracking-wide">
                    ≈ {tier} package
                  </span>
                </div>

                <p className="text-xs font-medium text-text-light dark:text-gray-500 uppercase tracking-wide text-center mb-1">
                  {isAnalyzing ? "Analyzing your project…" : "Indicative range (USD)"}
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold text-center tabular-nums bg-gradient-to-br from-text via-primary to-primary-dark dark:from-white dark:via-primary dark:to-primary bg-clip-text text-transparent leading-tight">
                  {formatUsd(display.low, display.high)}
                </p>
                {display.aiPowered && (
                  <p className="text-center text-xs text-primary mt-2 font-medium flex items-center justify-center gap-1">
                    <IconSparkles className="w-3.5 h-3.5" /> AI-assisted explanation · prices set by our US rate model
                  </p>
                )}

                <div
                  className="mt-5 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 text-sm text-text-light dark:text-gray-300 leading-relaxed"
                  aria-live="polite"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                    How we calculated this
                  </p>
                  <p>{renderSummary(display.summary)}</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-text-light dark:text-gray-400">
                    {display.factors.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-primary shrink-0" aria-hidden>
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs text-text-light dark:text-gray-500 text-center">
                  Final pricing depends on project scope, features, timeline, and integrations.
                </p>
                <div className="mt-6 text-center">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"
                  >
                    Request a quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
