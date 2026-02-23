"use client";

import { useState } from "react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "High-Converting Websites",
      description: "Convert visitors into customers with strategic design and clear messaging.",
      icon: "🚀",
    },
    {
      title: "Custom Web Applications",
      description: "Build scalable apps that automate work and streamline operations.",
      icon: "⚡",
    },
    {
      title: "E-commerce Systems",
      description: "Complete online stores that sell products and grow revenue.",
      icon: "🛒",
    },
    {
      title: "SEO & Performance Optimization",
      description: "Rank higher, load faster, and convert better with technical excellence.",
      icon: "📈",
    },
    {
      title: "Automation & Integrations",
      description: "Connect tools and automate workflows to save time and reduce errors.",
      icon: "🔗",
    },
    {
      title: "Landing Pages & Funnels",
      description: "High-converting pages that capture leads and drive sign-ups.",
      icon: "🎯",
    },
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            What we build
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Every service is designed to drive growth and deliver results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl group cursor-pointer"
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
              <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
