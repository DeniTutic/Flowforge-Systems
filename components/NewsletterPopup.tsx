"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      // Here you would typically send the email to your backend/newsletter service
      console.log("Subscribed:", email);
      setIsSubmitted(true);
      
      // Close popup after showing thank you message for 3 seconds
      setTimeout(() => {
        handleClose();
        // Reset after closing
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 300);
      }, 3000);
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
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-text-light hover:text-text transition-colors"
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
                <h3 className="text-2xl font-bold text-text mb-2">
                  Stay Updated
                </h3>
                <p className="text-text-light">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  Subscribe Now
                </button>
                <p className="text-xs text-text-light text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-text mb-2">
                Thank You!
              </h3>
              <p className="text-text-light">
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
