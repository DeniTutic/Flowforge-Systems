"use client";

import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";

// Must match document order (top → bottom) — see the reverse scan below.
const SECTION_IDS = ["hero", "work", "process", "services", "pricing"];

// Hrefs are root-relative so they also work from /privacy, /terms and the 404 page.
const navLinks = [
  { id: "work", href: "/#work", label: "Work" },
  { id: "process", href: "/#process", label: "Process" },
  { id: "services", href: "/#services", label: "Services" },
  { id: "pricing", href: "/#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const getSectionDocTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      const scrollPosition = window.scrollY + 120;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTION_IDS[i]);
        if (section && getSectionDocTop(section) <= scrollPosition) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 border-b ${
        mobileMenuOpen
          ? "bg-paper dark:bg-ink border-line dark:border-line-dark"
          : scrolled
            ? "bg-paper/85 dark:bg-ink/85 backdrop-blur-md border-line dark:border-line-dark"
            : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-[4.25rem] sm:h-20">
          <a href="/" className="flex-shrink-0 rounded-full" aria-label="Flowforge Systems — home">
            <Logo compact />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  className={`relative px-3.5 py-2 rounded-full text-[0.95rem] font-medium transition-colors ${
                    active
                      ? "text-primary dark:text-primary-light"
                      : "text-text/80 dark:text-steel-dark hover:text-text dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary motion-safe:animate-underline-in"
                      aria-hidden
                    />
                  )}
                </a>
              );
            })}
            <div className="ml-2 flex items-center gap-2">
              <DarkModeToggle />
              <a href="/#contact" className="btn-primary px-5 py-2.5 text-[0.95rem]">
                Book a call
              </a>
            </div>
          </div>

          {/* Mobile: compact CTA pill + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/#contact"
              onClick={closeMenu}
              className="btn-primary px-4 py-2 text-sm shadow-md whitespace-nowrap"
            >
              Book a call
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text dark:text-white hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="overflow-hidden">
            <div className="py-3 pb-5 space-y-1 border-t border-line dark:border-line-dark">
              {navLinks.map((link) => {
                const active = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={`flex items-center min-h-[44px] px-4 rounded-xl text-base font-medium transition-colors ${
                      active
                        ? "text-primary bg-primary/10 dark:bg-primary/15"
                        : "text-text dark:text-steel-dark hover:bg-ink/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="flex items-center justify-between pt-3 px-1">
                <span className="text-sm text-text-light dark:text-steel-dark">Appearance</span>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
