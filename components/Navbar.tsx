"use client";

import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["hero", "services", "portfolio", "pricing", "about"];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Work" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-text dark:text-white hover:text-primary transition-colors">
              Flowforge Systems
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors relative ${
                  activeSection === link.href.slice(1)
                    ? "text-primary font-medium"
                    : "text-text dark:text-gray-300 hover:text-primary"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}
            <DarkModeToggle />
            <a
              href="#contact"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-all hover:scale-105 shadow-md hover:shadow-lg"
            >
              Book Free Call
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text hover:text-primary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-primary bg-primary/10 dark:bg-primary/20 font-medium"
                    : "text-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block bg-primary text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-primary-dark transition-colors mt-4"
            >
              Book Free Call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
