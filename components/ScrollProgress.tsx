"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[200] pointer-events-none" aria-hidden="true">
      <div
        className={`h-full bg-primary-bright origin-left ${reducedMotion ? "" : "transition-transform duration-150"}`}
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
}
