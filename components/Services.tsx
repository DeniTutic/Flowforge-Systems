"use client";

import { useState } from "react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            What we build for you
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Clear, outcome‑driven services focused on revenue, not vanity metrics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-xl group cursor-pointer"
              style={{
                transform: hoveredIndex === index 
                  ? "perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02)" 
                  : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-text dark:text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-text-light dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
