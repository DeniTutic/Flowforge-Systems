"use client";

import { useState } from "react";

const benefits = [
  {
    title: "Fast performance",
    description: "Lightning-fast load times that keep visitors engaged.",
    emoji: "⚡",
  },
  {
    title: "Mobile-first",
    description: "Perfect experience on every device, every time.",
    emoji: "📱",
  },
  {
    title: "SEO-ready",
    description: "Built to rank and attract organic traffic.",
    emoji: "🔍",
  },
  {
    title: "Secure & scalable",
    description: "Enterprise-grade security that grows with you.",
    emoji: "🔒",
  },
  {
    title: "Easy to manage",
    description: "Simple content management you'll actually use.",
    emoji: "✨",
  },
  {
    title: "Built for growth",
    description: "Designed to scale as your business expands.",
    emoji: "📈",
  },
];

export default function Benefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Why choose us
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`benefit-float ${hoveredIndex !== null && hoveredIndex !== index ? "benefit-paused" : ""} ${hoveredIndex === index ? "benefit-hovered" : ""}`}
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
                <div className="text-3xl mb-3">{benefit.emoji}</div>
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
