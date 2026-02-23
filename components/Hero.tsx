"use client";

import { useEffect, useRef } from "react";

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
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text dark:text-white mb-6 leading-tight opacity-0">
            Digital products that grow your business
          </h1>
          <p className="text-xl sm:text-2xl text-text-light dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto opacity-0">
            We design and develop fast, scalable websites and web applications
            that bring you customers and automate your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0">
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Book a Free Consultation
            </a>
            <a
              href="#portfolio"
              className="bg-white dark:bg-gray-800 text-text dark:text-white border-2 border-gray-200 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View Our Work
            </a>
          </div>
          <p className="text-sm text-text-light dark:text-gray-500 uppercase tracking-wider opacity-0">
            Trusted by growing businesses
          </p>
        </div>
      </div>
    </section>
  );
}
