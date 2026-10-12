"use client";

import { useState, useRef, useEffect } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import Reveal from "./Reveal";
import { BUDGETS, PROJECT_TYPES } from "@/lib/contactOptions";

const steps = [
  {
    n: "1",
    title: "We reply within 24 hours",
    text: "A real person reads your message and answers with next steps.",
  },
  {
    n: "2",
    title: "15-minute strategy call",
    text: "We map your goals, audience and what a growth system looks like for you.",
  },
  {
    n: "3",
    title: "Scope and fixed quote",
    text: "You get a clear proposal with timeline and price. No surprises after we start.",
  },
];

const inputBase =
  "w-full px-4 py-3 min-h-[48px] rounded-xl border outline-none transition-all bg-paper-soft dark:bg-ink text-text dark:text-white placeholder:text-text-light dark:placeholder:text-steel-dark";
const inputOk =
  "border-line dark:border-line-dark focus:border-primary focus:ring-2 focus:ring-primary/20";
const inputErr =
  "border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/30";

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light dark:text-steel-dark"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
    </svg>
  );
}

export default function Contact() {
  const formStartedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!submitSuccess) return;
    const t = window.setTimeout(() => setSubmitSuccess(false), 10000);
    return () => window.clearTimeout(t);
  }, [submitSuccess]);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email address";
        break;
      case "message":
        if (!value.trim()) error = "Tell us a little about the project";
        else if (value.trim().length < 10) error = "Message must be at least 10 characters";
        break;
      default:
        return true;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in errors && errors[name as keyof typeof errors]) {
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

    const ok = [
      validateField("name", formData.name),
      validateField("email", formData.email),
      validateField("message", formData.message),
    ].every(Boolean);

    if (!ok) {
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
          company: formData.company.trim() || undefined,
          projectType: formData.projectType || undefined,
          budget: formData.budget || undefined,
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
      setFormData({ name: "", email: "", company: "", projectType: "", budget: "", message: "" });
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
    <section
      id="contact"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-start">
          {/* Form */}
          <Reveal>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3">
                Let&apos;s talk
              </p>
              <h2 className="section-title mb-3">Tell us about your project</h2>
              <p className="section-lead">We reply within 24 hours with next steps.</p>
            </div>

            <div ref={statusRef} className="space-y-4 mb-6 scroll-mt-28">
              {submitError && (
                <div
                  className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 flex items-center gap-2"
                  role="alert"
                  aria-live="assertive"
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
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
                  className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center gap-2"
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
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

            <form onSubmit={handleSubmit} className="space-y-5 relative" noValidate>
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

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text dark:text-white mb-2"
                  >
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
                    className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text dark:text-white mb-2"
                  >
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
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-text dark:text-white mb-2"
                >
                  Company{" "}
                  <span className="text-text-light dark:text-steel-dark font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className={`${inputBase} ${inputOk}`}
                  placeholder="Company or project name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-text dark:text-white mb-2"
                  >
                    Project type
                  </label>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`${inputBase} ${inputOk} appearance-none pr-10`}
                    >
                      <option value="">Select one</option>
                      {PROJECT_TYPES.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-text dark:text-white mb-2"
                  >
                    Budget range
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`${inputBase} ${inputOk} appearance-none pr-10`}
                    >
                      <option value="">Select one</option>
                      {BUDGETS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text dark:text-white mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
                  placeholder="What are you building, and what should it do for your business?"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
              <p className="text-xs text-text-light dark:text-steel-dark text-center">
                No spam, no newsletter sign-up — just a reply about your project.
              </p>
            </form>
          </Reveal>

          {/* What happens next */}
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div className="card p-7 sm:p-8">
              <h3 className="text-lg font-semibold tracking-heading text-text dark:text-white mb-6">
                What happens next
              </h3>
              <ol className="space-y-6">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="inline-flex shrink-0 items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary-dark dark:text-primary-light font-semibold text-sm">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-semibold text-text dark:text-white">{s.title}</p>
                      <p className="text-sm text-text-light dark:text-steel-dark mt-1 text-pretty">
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {CONTACT_EMAIL && (
                <div className="mt-8 pt-6 border-t border-line dark:border-line-dark text-sm text-text-light dark:text-steel-dark">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-primary dark:text-primary-light font-medium hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
