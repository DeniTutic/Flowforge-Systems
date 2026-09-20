"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { STORAGE } from "@/lib/siteStorage";
import { COOKIE_CONSENT_EVENT } from "./CookieConsent";
import { IconMail, IconCheckCircle } from "./icons";

/** Never interrupt a first impression: earliest the dialog may appear, in ms. */
const MIN_TIME_ON_PAGE_MS = 25_000;

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

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

    const loadedAt = Date.now();
    let shown = false;
    let pending = false;

    const cookieBannerVisible = () => Boolean(document.querySelector('[aria-label="Cookie consent"]'));

    const show = () => {
      if (shown) return;
      if (Date.now() - loadedAt < MIN_TIME_ON_PAGE_MS) return;
      // Only one interrupt at a time: wait for the cookie card to be answered.
      if (cookieBannerVisible()) {
        pending = true;
        return;
      }
      shown = true;
      setIsVisible(true);
      if (formStartedAtRef.current === null) {
        formStartedAtRef.current = Date.now();
      }
    };

    // Desktop: exit intent (pointer leaves through the top edge).
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) {
        show();
      }
    };

    // Everyone: reached the FAQ (they've read pricing — genuinely interested).
    const faq = document.getElementById("faq");
    const observer = faq
      ? new IntersectionObserver(
          (entries) => {
            if (entries.some((en) => en.isIntersecting)) show();
          },
          { threshold: 0.3 }
        )
      : null;
    observer?.observe(faq as Element);

    const onConsent = () => {
      if (pending) show();
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
      observer?.disconnect();
    };
  }, [hydrated, optedIn]);

  const handleDismiss = useCallback((permanentOptIn: boolean) => {
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
  }, []);

  const handleClose = useCallback(() => {
    handleDismiss(false);
  }, [handleDismiss]);

  // Focus management + Escape + tab trap while open.
  useEffect(() => {
    if (!isVisible) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => emailRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isVisible, handleClose]);


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
        className={`fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
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
          ref={dialogRef}
          className={`card max-w-md w-full p-8 relative shadow-2xl ${!isClosing ? "motion-safe:animate-popup-in" : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-popup-title"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full text-text-light dark:text-steel-dark hover:text-text dark:hover:text-white hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
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
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary dark:text-primary-light mb-4"
                  aria-hidden
                >
                  <IconMail className="w-8 h-8" />
                </div>
                <h3
                  id="newsletter-popup-title"
                  className="text-2xl font-semibold tracking-heading text-text dark:text-white mb-2"
                >
                  Growth notes, occasionally
                </h3>
                <p className="text-text-light dark:text-steel-dark text-pretty">
                  Practical tips on websites and AI that bring in clients. A few emails a year, never spam.
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
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    className="w-full px-4 py-3 min-h-[48px] rounded-xl border border-line dark:border-line-dark bg-paper dark:bg-ink text-text dark:text-white placeholder:text-text-light/70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-60"
                  />
                </div>
                <div aria-live="polite">
                  {submitError ? (
                    <p className="text-sm text-rose-600 dark:text-rose-400 text-center" role="alert">{submitError}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe"}
                </button>
                <p className="text-xs text-text-light dark:text-steel-dark text-center">
                  Unsubscribe any time. See our{" "}
                  <a href="/privacy" className="text-primary dark:text-primary-light hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4"
                aria-hidden
              >
                <IconCheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-semibold tracking-heading text-text dark:text-white mb-2">You&apos;re in.</h3>
              <p className="text-text-light dark:text-steel-dark">
                You&apos;re subscribed. We&apos;ll only send useful updates—no spam.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
