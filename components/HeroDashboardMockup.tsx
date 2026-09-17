"use client";

import { useEffect, useState } from "react";

const leads = [
  { icon: "💼", label: "SaaS Startup", detail: "Requested a demo" },
  { icon: "🏪", label: "Local Business", detail: "Booked a strategy call" },
  { icon: "🛒", label: "E-commerce Store", detail: "Downloaded pricing" },
  { icon: "🤖", label: "AI Startup", detail: "Submitted contact form" },
];

export default function HeroDashboardMockup() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [count, setCount] = useState(214);
  const [leadIndex, setLeadIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setCount((c) => c + 1), 3200);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setLeadIndex((i) => (i + 1) % leads.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const visibleLeads = [0, 1, 2].map((offset) => leads[(leadIndex + offset) % leads.length]);

  return (
    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/70">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 h-6 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center px-3">
          <span className="text-[0.7rem] text-text-light dark:text-gray-500 truncate">
            flowforge.systems/dashboard
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Stat + growth badge */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-wide text-text-light dark:text-gray-500 mb-1">
              Leads this month
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-text dark:text-white tabular-nums">
              {count}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
            </svg>
            +42%
          </span>
        </div>

        {/* Growth chart */}
        <div className="h-24 sm:h-28 -mx-1">
          <svg viewBox="0 0 280 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,78 L40,68 L80,74 L120,48 L160,54 L200,28 L240,34 L280,8 L280,100 L0,100 Z"
              fill="url(#heroChartFill)"
            />
            <path
              d="M0,78 L40,68 L80,74 L120,48 L160,54 L200,28 L240,34 L280,8"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              strokeDasharray={100}
              className={reducedMotion ? "" : "motion-safe:animate-draw-line"}
            />
            <circle cx="280" cy="8" r="4" fill="#6366f1" />
            {!reducedMotion && <circle cx="280" cy="8" r="4" fill="#6366f1" className="motion-safe:animate-ping" />}
          </svg>
        </div>

        {/* Incoming lead notifications */}
        <div className="space-y-2">
          {visibleLeads.map((lead, i) => (
            <div
              key={`${lead.label}-${leadIndex}-${i}`}
              className={`flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-800/60 px-3 py-2.5 ${
                i === 0 ? "motion-safe:animate-fade-in-up" : ""
              }`}
              style={{ opacity: i === 0 ? undefined : 1 - i * 0.35 }}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-base shrink-0">
                {lead.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text dark:text-white truncate">{lead.label}</p>
                <p className="text-xs text-text-light dark:text-gray-500 truncate">{lead.detail}</p>
              </div>
              {i === 0 && (
                <span className="ml-auto text-[0.65rem] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide shrink-0">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
