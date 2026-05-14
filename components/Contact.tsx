"use client";

import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const formStartedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!submitSuccess) return;
    const t = window.setTimeout(() => setSubmitSuccess(false), 8000);
    return () => window.clearTimeout(t);
  }, [submitSuccess]);

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const scrollStatusIntoView = () => {
    requestAnimationFrame(() => {
      statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      scrollStatusIntoView();
      return;
    }

    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          website: honeypot,
          formStartedAt: formStartedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(data.error || "Could not send your message. Try again.");
        scrollStatusIntoView();
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      formStartedAt.current = Date.now();
      scrollStatusIntoView();
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
      scrollStatusIntoView();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Let&apos;s talk
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div ref={statusRef} className="space-y-4 mb-6">
          {submitError && (
            <div
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center gap-2"
              role="alert"
              aria-live="assertive"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{submitError}</span>
            </div>
          )}
          {submitSuccess && (
            <div
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center gap-2"
              role="status"
              aria-live="polite"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Thank you! We&apos;ll get back to you within 24 hours.</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
          <div className="absolute w-px h-px -left-[9999px] overflow-hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              type="text"
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all bg-white dark:bg-gray-800 text-text dark:text-white ${
                errors.name
                  ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                  : "border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <span aria-hidden>⚠</span> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all bg-white dark:bg-gray-800 text-text dark:text-white ${
                errors.email
                  ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                  : "border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <span aria-hidden>⚠</span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none bg-white dark:bg-gray-800 text-text dark:text-white ${
                errors.message
                  ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                  : "border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30"
              }`}
              placeholder="Tell us about your project..."
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <span aria-hidden>⚠</span> {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 motion-reduce:animate-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
