"use client";

import { useEffect, useState } from "react";
import { IconCompass, IconPalette, IconTool, IconRocket, IconTrendingUp } from "./icons";

const steps = [
  { icon: IconCompass, title: "Strategy", description: "We understand your business and define the growth system." },
  { icon: IconPalette, title: "Design", description: "We design a modern, conversion-focused interface." },
  { icon: IconTool, title: "Build", description: "We develop the website and integrate automation systems." },
  { icon: IconRocket, title: "Launch", description: "We ship your system live and monitor it in the wild." },
  { icon: IconTrendingUp, title: "Optimize", description: "We keep testing and refining so results keep climbing." },
];

// Line spans center-to-center of the first and last node (not edge-to-edge of the row).
const EDGE_INSET_PCT = 50 / steps.length;
const LINE_SPAN_PCT = 100 - EDGE_INSET_PCT * 2;

export default function HowWeWorkFlow() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="h-64 sm:h-72 lg:h-80 w-full rounded-3xl overflow-hidden border border-gray-200/90 dark:border-gray-800/70 shadow-xl bg-gradient-to-br from-white via-gray-50 to-sky-50 dark:from-gray-900 dark:via-slate-900 dark:to-black p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/80">
          Our process
        </span>
        <h3 className="mt-1 text-lg sm:text-xl font-bold text-text dark:text-white">How we work</h3>
      </div>

      <div>
        {/* Icon row: line sits at the exact vertical center of the circles, unaffected by label height */}
        <div className="relative grid grid-cols-5 items-center px-1">
          <div
            className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-gray-200 dark:bg-gray-700"
            style={{ left: `${EDGE_INSET_PCT}%`, right: `${EDGE_INSET_PCT}%` }}
          />
          <div
            className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-700 ease-out"
            style={{
              left: `${EDGE_INSET_PCT}%`,
              width: `${(active / (steps.length - 1)) * LINE_SPAN_PCT}%`,
            }}
          />
          {steps.map((step, i) => (
            <div key={step.title} className="relative z-10 flex justify-center">
              <div
                className={`flex items-center justify-center rounded-full border-2 transition-all duration-700 ease-out ${
                  i === active
                    ? "w-14 h-14 sm:w-16 sm:h-16 border-primary bg-primary text-white shadow-lg shadow-primary/40"
                    : i < active
                      ? "w-11 h-11 sm:w-12 sm:h-12 border-primary/60 bg-primary/20 text-primary"
                      : "w-11 h-11 sm:w-12 sm:h-12 border-primary/30 bg-primary/10 text-primary"
                }`}
              >
                <step.icon className={i === active ? "w-6 h-6 sm:w-7 sm:h-7" : "w-5 h-5"} />
              </div>
            </div>
          ))}
        </div>

        {/* Label row: same grid columns as the icon row, so labels line up exactly under each node */}
        <div className="grid grid-cols-5 px-1 mt-3">
          {steps.map((step, i) => (
            <span
              key={step.title}
              className={`text-center text-[0.65rem] font-medium transition-colors duration-500 ${
                i === active ? "text-primary" : "text-text-light dark:text-gray-500"
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[3.2rem]">
        <p
          key={active}
          className="text-sm text-text-light dark:text-gray-400 leading-relaxed animate-fade-in-up"
        >
          {steps[active].description}
        </p>
      </div>
    </div>
  );
}
