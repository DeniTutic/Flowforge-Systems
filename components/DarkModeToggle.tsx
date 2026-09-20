"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle({ className = "" }: { className?: string }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // The inline script in app/layout.tsx already applied the class before paint.
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem("darkMode", String(newMode));
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-text dark:text-white hover:bg-ink/5 dark:hover:bg-white/10 transition-colors ${className}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
    >
      {darkMode ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
