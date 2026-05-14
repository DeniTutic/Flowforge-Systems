"use client";

import { useState, useEffect, useCallback } from "react";
import { STORAGE, type CookieConsentRecord } from "@/lib/siteStorage";

function readStoredConsent(): CookieConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE.cookieConsent);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentRecord;
    if (parsed.choice !== "accepted" && parsed.choice !== "declined") return null;
    if (typeof parsed.at !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const existing = readStoredConsent();
    setHydrated(true);
    if (existing) return;
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const persist = useCallback((choice: CookieConsentRecord["choice"]) => {
    try {
      const record: CookieConsentRecord = { choice, at: Date.now() };
      localStorage.setItem(STORAGE.cookieConsent, JSON.stringify(record));
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  const handleAccept = () => {
    persist("accepted");
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    persist("declined");
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!hydrated || !isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent notification"
      aria-live="polite"
      className={`fixed bottom-0 left-0 right-0 z-[150] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 ${
        isClosing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-text dark:text-gray-300">
              We use essential cookies to run this site and optional analytics to understand traffic. By
              clicking Accept, you agree to our use of cookies as described in our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . See also our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              aria-label="Decline optional cookies"
              className="px-4 py-2 text-sm font-medium text-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              aria-label="Accept cookies"
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
