"use client";

import { useState, useEffect, useRef } from "react";
import { STORAGE } from "@/lib/siteStorage";

export default function NewsletterPopup() {
  const [hydrated, setHydrated] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      setOptedIn(localStorage.getItem(STORAGE.newsletterSubscribed) === "1");
    } catch {
      setOptedIn(false);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || optedIn) return;
    try {
      if (sessionStorage.getItem(STORAGE.newsletterSessionDismissed) === "1") return;
    } catch {
      /* ignore */
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setIsVisible(true);
      if (formStartedAtRef.current === null) {
        formStartedAtRef.current = Date.now();
      }
    };

    const timer = setTimeout(show, 4000);
    const onScroll = () => {
      const denom = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = denom > 0 ? window.scrollY / denom : 0;
      if (scrolled >= 0.35) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hydrated, optedIn]);

  const handleDismiss = (permanentOptIn: boolean) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      setIsSubmitted(false);
      setEmail("");
      if (permanentOptIn) {
        setOptedIn(true);
      } else {
        try {
          sessionStorage.setItem(STORAGE.newsletterSessionDismissed, "1");
        } catch {
          /* ignore */
        }
      }
    }, 300);
  };

  const handleClose = () => {
    handleDismiss(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    const startedAt = formStartedAtRef.current;
    if (startedAt === null) {
      formStartedAtRef.current = Date.now();
      setSubmitError("Please wait a moment and try again.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          website: honeypot,
          formStartedAt: startedAt,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Try again.");
        return;
      }

      try {
        localStorage.setItem(STORAGE.newsletterSubscribed, "1");
      } catch {
        /* ignore */
      }
      setIsSubmitted(true);
      setTimeout(() => {
        handleDismiss(true);
      }, 3000);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hydrated || optedIn) return null;
  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-hidden
      />

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative ${
            !isClosing ? "animate-popup-in" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-popup-title"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-text-light dark:text-gray-400 hover:text-text dark:hover:text-white transition-colors"
            aria-label="Close newsletter dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-4" aria-hidden>
                  📧
                </div>
                <h3
                  id="newsletter-popup-title"
                  className="text-2xl font-bold text-text dark:text-white mb-2"
                >
                  Stay Updated
                </h3>
                <p className="text-text-light dark:text-gray-400">
                  Subscribe for growth tips, product updates, and occasional offers from Flowforge.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="absolute w-px h-px -left-[9999px] overflow-hidden" aria-hidden="true">
                  <label htmlFor="newsletter-website">Website</label>
                  <input
                    type="text"
                    id="newsletter-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30 outline-none transition-all disabled:opacity-60"
                  />
                </div>
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {submitError ? (
                    <p className="text-sm text-red-600 dark:text-red-400 text-center">{submitError}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe Now"}
                </button>
                <p className="text-xs text-text-light dark:text-gray-500 text-center">
                  We respect your privacy. Unsubscribe any time. See our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-6xl mb-4" aria-hidden>
                ✅
              </div>
              <h3 className="text-2xl font-bold text-text dark:text-white mb-2">Thank You!</h3>
              <p className="text-text-light dark:text-gray-400">
                You&apos;re subscribed. We&apos;ll only send useful updates—no spam.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
