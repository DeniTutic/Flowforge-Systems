"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-text">
              Flowbyte
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-text hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="text-text hover:text-primary transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#pricing"
              className="text-text hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-text hover:text-primary transition-colors"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Book Consultation
            </a>
          </div>
          <div className="md:hidden">
            <a
              href="#contact"
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
