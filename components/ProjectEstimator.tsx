"use client";

import { useMemo, useState } from "react";

type Complexity = 0 | 1 | 2;
type Timeline = 0 | 1 | 2;

const complexityLabels = ["Focused scope", "Standard build", "Large / multi-system"];
const timelineLabels = ["Flexible", "Normal", "Rush / tight"];

function formatUsd(low: number, high: number) {
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return `${fmt(low)} – ${fmt(high)}`;
}

export default function ProjectEstimator() {
  const [pages, setPages] = useState(40);
  const [complexity, setComplexity] = useState<Complexity>(1);
  const [integrations, setIntegrations] = useState(2);
  const [timeline, setTimeline] = useState<Timeline>(1);

  const estimate = useMemo(() => {
    let baseLow = 2800;
    let baseHigh = 5500;

    const pageFactor = 0.35 + (pages / 100) * 1.15;
    baseLow *= pageFactor;
    baseHigh *= pageFactor + 0.12;

    const complexityMul = complexity === 0 ? 0.92 : complexity === 1 ? 1 : 1.35;
    baseLow *= complexityMul;
    baseHigh *= complexityMul;

    baseLow += integrations * 450;
    baseHigh += integrations * 900;

    const timelineMul = timeline === 0 ? 0.95 : timeline === 1 ? 1 : 1.18;
    baseLow *= timelineMul;
    baseHigh *= timelineMul;

    baseLow = Math.round(baseLow / 100) * 100;
    baseHigh = Math.round(baseHigh / 100) * 100;
    if (baseHigh <= baseLow) baseHigh = baseLow + 800;

    return { low: baseLow, high: baseHigh };
  }, [pages, complexity, integrations, timeline]);

  return (
    <section
      id="estimator"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-700/80"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Project estimator
          </h2>
          <p className="text-lg text-text-light dark:text-gray-400 max-w-xl mx-auto">
            Adjust the sliders for a non-binding ballpark. We&apos;ll confirm scope, timeline, and
            integrations in a proper quote.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-8">
          <div>
            <div className="flex justify-between text-sm font-medium text-text dark:text-gray-200 mb-2">
              <span>Size &amp; depth</span>
              <span className="text-text-light dark:text-gray-400">{pages}% of a typical site</span>
            </div>
            <input
              type="range"
              min={15}
              max={100}
              step={5}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 accent-primary cursor-pointer"
              aria-valuemin={15}
              aria-valuemax={100}
              aria-valuenow={pages}
              aria-label="Project size relative to a typical website"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-text dark:text-gray-200 mb-3">Complexity</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {([0, 1, 2] as const).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setComplexity(i)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                    complexity === i
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                      : "border-gray-200 dark:border-gray-600 text-text-light dark:text-gray-400 hover:border-primary/40"
                  }`}
                >
                  {complexityLabels[i]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium text-text dark:text-gray-200 mb-2">
              <span>Integrations (CRM, payments, APIs, …)</span>
              <span className="text-text-light dark:text-gray-400">{integrations}</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={integrations}
              onChange={(e) => setIntegrations(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 accent-primary cursor-pointer"
              aria-valuemin={0}
              aria-valuemax={8}
              aria-valuenow={integrations}
              aria-label="Number of third-party integrations"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-text dark:text-gray-200 mb-3">Timeline</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {([0, 1, 2] as const).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTimeline(i)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                    timeline === i
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                      : "border-gray-200 dark:border-gray-600 text-text-light dark:text-gray-400 hover:border-primary/40"
                  }`}
                >
                  {timelineLabels[i]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 px-5 py-6 text-center">
            <p className="text-sm font-medium text-text-light dark:text-gray-400 uppercase tracking-wide mb-1">
              Indicative range
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-text dark:text-white">
              {formatUsd(estimate.low, estimate.high)}
            </p>
            <p className="mt-3 text-sm text-text-light dark:text-gray-400 max-w-md mx-auto">
              Final pricing depends on project scope, features, timeline, and integrations.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-md"
            >
              Request a quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
