"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ThreeHeroCanvas = dynamic(() => import("./ThreeHeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll("h1, p, div");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Three.js background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-35">
          <ThreeHeroCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/96 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/96" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text dark:text-white mb-6 leading-tight opacity-0">
            Websites and AI systems that generate leads for your business.
          </h1>
          <p className="text-xl sm:text-2xl text-text-light dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto opacity-0">
            We design and build modern websites and AI automations that turn traffic into clients
            and help businesses scale faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0">
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book a Free Strategy Call
            </a>
            <a
              href="#portfolio"
              className="bg-white dark:bg-gray-800 text-text dark:text-white border-2 border-gray-200 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get a Free Website Audit
            </a>
          </div>
          <div className="space-y-4 opacity-0">
            <p className="text-sm text-text-light dark:text-gray-500 uppercase tracking-wider">
              10+ projects shipped · 100% client satisfaction · 2–4 week delivery
            </p>
            {/* Credibility bar */}
            <div className="inline-flex flex-col items-center gap-2 rounded-full bg-white/70 dark:bg-gray-900/70 px-5 py-3 shadow-sm border border-gray-100/80 dark:border-gray-700/80 backdrop-blur">
              <span className="text-xs font-medium tracking-[0.18em] uppercase text-text-light dark:text-gray-400">
                Trusted by founders and growing businesses
              </span>
              <div className="flex flex-wrap justify-center gap-2 text-[0.7rem]">
                {["SaaS", "AI Startups", "Local Businesses", "E-commerce"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-gray-50/80 dark:bg-gray-800/70 text-text-light dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
