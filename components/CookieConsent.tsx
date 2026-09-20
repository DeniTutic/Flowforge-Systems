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

/** Fired so other interrupts (newsletter) know the banner is gone. */
export const COOKIE_CONSENT_EVENT = "flowforge:cookie-consent";

export default function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const existing = readStoredConsent();
    setHydrated(true);
    if (existing) return;
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const persist = useCallback((choice: CookieConsentRecord["choice"]) => {
    try {
      const record: CookieConsentRecord = { choice, at: Date.now() };
      localStorage.setItem(STORAGE.cookieConsent, JSON.stringify(record));
    } catch {
      /* ignore quota / private mode */
    }
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    }, 300);
  }, []);

  if (!hydrated || !isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={`fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-40 card p-4 sm:p-5 shadow-2xl shadow-ink/10 dark:shadow-black/40 transition-all duration-300 motion-safe:animate-popup-in ${
        isClosing ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
      }`}
    >
      <p className="text-sm text-text dark:text-steel-dark leading-relaxed">
        We use essential cookies to run this site and optional analytics to understand traffic.{" "}
        <a href="/privacy" className="text-primary dark:text-primary-light font-medium hover:underline">
          Privacy Policy
        </a>
      </p>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => persist("declined")}
          className="flex-1 min-h-[44px] px-4 rounded-full text-sm font-semibold border border-line dark:border-line-dark text-text dark:text-white hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => persist("accepted")}
          className="flex-1 min-h-[44px] px-4 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
