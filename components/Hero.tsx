"use client";

import { useEffect, useRef, useState } from "react";
import HeroDashboardMockup from "./HeroDashboardMockup";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion && heroRef.current) {
      heroRef.current.querySelectorAll(".opacity-0").forEach((el) => {
        el.classList.remove("opacity-0");
      });
      return;
    }

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
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-dvh flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text dark:text-white mb-6 leading-tight opacity-0">
              Websites and AI systems that generate leads for your business.
            </h1>
            <p className="text-xl sm:text-2xl text-text-light dark:text-gray-400 mb-8 leading-relaxed opacity-0">
              We design and build modern websites and AI automations that turn traffic into clients
              and help businesses scale faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 opacity-0">
              <a
                href="#contact"
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all motion-safe:transform motion-safe:hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            <div className="opacity-0">
              {/* Credibility bar */}
              <div className="inline-flex flex-col items-center lg:items-start gap-3">
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-text-light dark:text-gray-400">
                  Trusted by founders and growing businesses
                </span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  {[
                    { label: "SaaS", icon: "💼" },
                    { label: "AI Startups", icon: "🤖" },
                    { label: "Local Businesses", icon: "🏪" },
                    { label: "E-commerce", icon: "🛒" },
                  ].map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur text-text-light dark:text-gray-300 text-xs font-medium shadow-sm hover:border-primary/40 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <span aria-hidden>{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-0 max-w-md mx-auto lg:max-w-none w-full">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>

      <a
        href="#problem"
        aria-label="Scroll to learn more"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-text-light dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors motion-safe:animate-bounce"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
