"use client";

import { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";

const benefits = [
  {
    title: "Fast performance",
    description: "Lightning-fast load times that keep visitors engaged.",
    emoji: "⚡",
    color: "bg-amber-500/10 dark:bg-amber-500/15",
  },
  {
    title: "Mobile-first",
    description: "Perfect experience on every device, every time.",
    emoji: "📱",
    color: "bg-sky-500/10 dark:bg-sky-500/15",
  },
  {
    title: "SEO-ready",
    description: "Built to rank and attract organic traffic.",
    emoji: "🔍",
    color: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  {
    title: "Secure & scalable",
    description: "Enterprise-grade security that grows with you.",
    emoji: "🔒",
    color: "bg-violet-500/10 dark:bg-violet-500/15",
  },
  {
    title: "Easy to manage",
    description: "Simple content management you'll actually use.",
    emoji: "✨",
    color: "bg-primary/10 dark:bg-primary/15",
  },
  {
    title: "Built for growth",
    description: "Designed to scale as your business expands.",
    emoji: "📈",
    color: "bg-rose-500/10 dark:bg-rose-500/15",
  },
];

export default function Benefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow icon="⭐">Benefits</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Why choose us
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`benefit-float motion-reduce:!animate-none ${hoveredIndex !== null && hoveredIndex !== index ? "benefit-paused" : ""} ${hoveredIndex === index ? "benefit-hovered" : ""}`}
              style={{ animationDelay: `${index * 0.4}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "shadow-lg border-primary/30 dark:border-primary/40 ring-2 ring-primary/10"
                    : "hover:shadow-md"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${benefit.color} text-2xl mb-3`}
                >
                  {benefit.emoji}
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-light dark:text-gray-400 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
