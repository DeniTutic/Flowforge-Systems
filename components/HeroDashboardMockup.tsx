"use client";

import { useEffect, useState } from "react";
import { SITE_HOST } from "@/lib/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IconBriefcase, IconStore, IconCart, IconCpu } from "./icons";

const leads = [
  { icon: IconBriefcase, label: "SaaS Startup", detail: "Requested a demo", aiReply: "AI replied in 8s", time: "Just now" },
  { icon: IconStore, label: "Local Business", detail: "Booked a strategy call", aiReply: "AI replied in 14s", time: "2m ago" },
  { icon: IconCart, label: "E-commerce Store", detail: "Downloaded pricing", aiReply: "AI replied in 6s", time: "5m ago" },
  { icon: IconCpu, label: "AI Startup", detail: "Submitted contact form", aiReply: "AI replied in 11s", time: "9m ago" },
];

const channels = [
  { label: "Website", pct: 46, color: "bg-primary" },
  { label: "Referral", pct: 27, color: "bg-primary/60" },
  { label: "Paid ads", pct: 18, color: "bg-primary/35" },
  { label: "Social", pct: 9, color: "bg-primary/20" },
];

const chartMonths = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function HeroDashboardMockup() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(214);
  const [leadIndex, setLeadIndex] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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
    }, 3400);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const visibleLeads = [0, 1].map((offset) => leads[(leadIndex + offset) % leads.length]);
  const barsVisible = reducedMotion || mounted;

  return (
    <div className="relative rounded-2xl border border-line dark:border-line-dark shadow-2xl shadow-ink/10 dark:shadow-black/40 overflow-hidden bg-paper-soft dark:bg-ink-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line dark:border-line-dark bg-paper dark:bg-ink-soft">
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15 dark:bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15 dark:bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15 dark:bg-white/20" />
        <div className="ml-2 flex-1 h-6 rounded-full bg-paper-soft dark:bg-ink border border-line dark:border-line-dark flex items-center px-3">
          <span className="text-[0.7rem] text-text-light dark:text-steel-dark truncate">
            {SITE_HOST}/dashboard
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Dashboard header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text dark:text-white">Overview</h3>
            <span className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[0.65rem] font-semibold uppercase tracking-wide">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 motion-safe:animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
          <span className="text-[0.7rem] text-text-light dark:text-steel-dark border border-line dark:border-line-dark rounded-full px-2.5 py-1">
            Last 30 days
          </span>
        </div>

        {/* Stat + secondary KPIs */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-wide text-text-light dark:text-steel-dark mb-1">
              Leads this month
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-text dark:text-white tabular-nums">
              {count}
            </p>
            <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
              </svg>
              +42% vs last month
            </span>
          </div>
          <div className="flex flex-col gap-3 shrink-0 text-right">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-text-light dark:text-steel-dark">
                Conversion
              </p>
              <p className="text-sm font-semibold text-text dark:text-white">24.6%</p>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-text-light dark:text-steel-dark">
                Avg. response
              </p>
              <p className="text-sm font-semibold text-text dark:text-white">1.8 min</p>
            </div>
          </div>
        </div>

        {/* Growth chart */}
        <div>
          <div className="h-24 sm:h-28 -mx-1">
            <svg viewBox="0 0 280 100" className="w-full h-full overflow-visible text-primary" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60, 80].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="280"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ink/[0.06] dark:text-white/[0.06]"
                />
              ))}
              <path
                d="M0,82 L56,74 L112,68 L168,52 L224,40 L280,12 L280,100 L0,100 Z"
                fill="url(#heroChartFill)"
              />
              <path
                d="M0,82 L56,74 L112,68 L168,52 L224,40 L280,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                strokeDasharray={100}
                className={reducedMotion ? "" : "motion-safe:animate-draw-line"}
              />
              <circle cx="280" cy="12" r="4" fill="currentColor" />
              {!reducedMotion && (
                <circle cx="280" cy="12" r="4" fill="currentColor" className="motion-safe:animate-ping" />
              )}
            </svg>
          </div>
          <div className="flex justify-between mt-1 px-0.5">
            {chartMonths.map((m) => (
              <span key={m} className="text-[0.6rem] text-text-light dark:text-steel-dark">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Lead source breakdown */}
        <div className="space-y-2">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-text-light dark:text-steel-dark">
            Lead sources
          </p>
          <div className="space-y-1.5">
            {channels.map((channel) => (
              <div key={channel.label} className="flex items-center gap-2.5">
                <span className="w-14 shrink-0 text-[0.7rem] text-text-light dark:text-steel-dark">
                  {channel.label}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-ink/[0.06] dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${channel.color} transition-all duration-1000 ease-out`}
                    style={{ width: barsVisible ? `${channel.pct}%` : "0%" }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[0.7rem] tabular-nums text-text-light dark:text-steel-dark">
                  {channel.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming lead notifications */}
        <div className="space-y-2">
          {visibleLeads.map((lead, i) => (
            <div
              key={`${lead.label}-${leadIndex}-${i}`}
              className={`rounded-xl border border-line dark:border-line-dark bg-paper dark:bg-ink-soft px-3 py-2.5 ${
                i === 0 ? "motion-safe:animate-fade-in-up" : ""
              }`}
              style={{ opacity: i === 0 ? undefined : 0.6 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <lead.icon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text dark:text-white truncate">{lead.label}</p>
                  <p className="text-xs text-text-light dark:text-steel-dark truncate">{lead.detail}</p>
                </div>
                <span
                  className={`ml-auto text-[0.65rem] font-semibold uppercase tracking-wide shrink-0 ${
                    i === 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-text-light dark:text-steel-dark normal-case font-medium"
                  }`}
                >
                  {i === 0 ? "New" : lead.time}
                </span>
              </div>
              <p className="mt-1.5 pl-11 text-[0.7rem] text-primary flex items-center gap-1">
                <IconCpu className="w-3 h-3" />
                {lead.aiReply}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
