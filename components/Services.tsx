"use client";

import { useEffect, useState } from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "Websites that convert visitors into clients",
      description:
        "High-performance sites with clear messaging, fast load times, and built-in analytics.",
      icon: "🚀",
    },
    {
      title: "AI systems that automate your work",
      description:
        "Custom chatbots, workflows, and internal tools that save your team hours every week.",
      icon: "🤖",
    },
    {
      title: "Landing pages that print leads",
      description:
        "Launch-ready pages and funnels optimized for ads, campaigns, and email capture.",
      icon: "🎯",
    },
    {
      title: "Ongoing optimization & support",
      description:
        "We keep testing, improving, and shipping changes so your conversion rate keeps climbing.",
      icon: "📈",
    },
  ];

  // Auto-slide services one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow icon="🛠️">What we do</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            What we build for you
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Clear, outcome‑driven services focused on revenue, not vanity metrics.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div className="relative h-full">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`p-10 sm:p-12 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-2xl transition-all duration-700 ease-out ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-6 pointer-events-none absolute inset-0"
                  }`}
                >
                  <div className="text-5xl mb-5 animate-pulse-slow">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-text-light dark:text-gray-400 leading-relaxed max-w-3xl">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2.5 bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
