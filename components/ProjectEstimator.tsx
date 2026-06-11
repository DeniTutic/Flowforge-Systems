"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  computeProjectEstimate,
  formatUsd,
  type AiScope,
  type Complexity,
  type EstimateResult,
  type Timeline,
} from "@/lib/projectEstimate";

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

  return (
    <section
      id="estimator"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-700/80"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Smart project estimate
          </h2>
          <p className="text-lg text-text-light dark:text-gray-400 max-w-xl mx-auto">
            Built for US businesses and founders—adjust the inputs for a conservative ballpark in USD.
            We confirm scope on a discovery call before any final quote.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-8">
          <div>
            <label
              htmlFor="size-depth"
              className="flex justify-between text-sm font-medium text-text dark:text-gray-200 mb-2"
            >
              <span>Size &amp; depth</span>
              <span className="text-primary font-semibold tabular-nums">{sizeDepth} / 10</span>
            </label>
            <p className="text-xs text-text-light dark:text-gray-500 mb-3">
              1 = simple landing page · 10 = large product or multi-app build (typical US SMB scope)
            </p>
            <input
              id="size-depth"
              type="number"
              min={1}
              max={10}
              step={1}
              value={sizeDepth}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) setSizeDepth(Math.min(10, Math.max(1, v)));
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-text dark:text-gray-200 mb-3">Complexity</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {complexityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setComplexity(opt.value)}
                  className={`rounded-xl border px-3 py-3 text-left transition-all ${
                    complexity === opt.value
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
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
            <div className="flex justify-between text-sm font-medium text-text dark:text-gray-200 mb-2">
              <span>Integrations</span>
              <span className="text-text-light dark:text-gray-400 tabular-nums">{integrations}</span>
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
            <p className="text-sm font-medium text-text dark:text-gray-200 mb-3">AI scope</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {aiOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAiScope(opt.value)}
                  className={`rounded-xl border px-3 py-3 text-left transition-all ${
                    aiScope === opt.value
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
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
            <p className="text-sm font-medium text-text dark:text-gray-200 mb-3">Timeline</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {timelineOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTimeline(opt.value)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                    timeline === opt.value
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                      : "border-gray-200 dark:border-gray-600 text-text-light dark:text-gray-400 hover:border-primary/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 px-5 py-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              {isAnalyzing && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse motion-reduce:animate-none"
                  aria-hidden
                />
              )}
              <p className="text-sm font-medium text-text-light dark:text-gray-400 uppercase tracking-wide text-center">
                {isAnalyzing ? "Analyzing your project…" : "Indicative range (USD)"}
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-text dark:text-white text-center tabular-nums">
              {formatUsd(display.low, display.high)}
            </p>
            {display.aiPowered && (
              <p className="text-center text-xs text-primary mt-2 font-medium">
                AI-assisted explanation · prices set by our US rate model
              </p>
            )}

            <div
              className="mt-5 p-4 rounded-lg bg-white/60 dark:bg-gray-900/40 border border-primary/10 text-sm text-text-light dark:text-gray-300 leading-relaxed"
              aria-live="polite"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                How we calculated this
              </p>
              <p>{renderSummary(display.summary)}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-text-light dark:text-gray-400">
                {display.factors.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary shrink-0">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-sm text-text-light dark:text-gray-400 text-center max-w-md mx-auto">
              Final pricing depends on project scope, features, timeline, and integrations.
            </p>
            <div className="mt-6 text-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                Request a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
