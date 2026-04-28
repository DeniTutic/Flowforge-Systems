"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Always show for each visit after delay / scroll
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setIsVisible(true);
    };

    // Show after 4 seconds
    const timer = setTimeout(show, 4000);

    // Or show when user scrolls ~35% down the page (whichever comes first)
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.35) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Try again.");
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 300);
      }, 3000);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />
      
      {/* Popup */}
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
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-text-light dark:text-gray-400 hover:text-text dark:hover:text-white transition-colors"
            aria-label="Close"
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
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-2xl font-bold text-text dark:text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-text-light dark:text-gray-400">
                  Subscribe to get exclusive discounts, growth tips, and early
                  access to new services.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30 outline-none transition-all disabled:opacity-60"
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center" role="alert">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe Now"}
                </button>
                <p className="text-xs text-text-light dark:text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-text dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-text-light dark:text-gray-400">
                You've successfully subscribed. Check your inbox for exclusive
                content and discounts.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
