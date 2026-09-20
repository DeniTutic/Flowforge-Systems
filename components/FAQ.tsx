"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconHelpCircle } from "./icons";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects ship in 2–4 weeks, depending on scope and how quickly we get feedback and content from you. Larger builds with custom automation or multiple integrations can run longer — we'll give you a realistic timeline on the discovery call.",
  },
  {
    question: "Is the price from the estimator final?",
    answer:
      "It's a conservative ballpark, not a locked quote. We confirm exact scope, features, and final pricing together on a discovery call before any work starts — no surprises once we begin.",
  },
  {
    question: "Do I own the code and design when we're done?",
    answer:
      "Yes. Once the project is paid in full, the site, design files, and any custom code are yours — no lock-in, no recurring license fees to keep using what we built.",
  },
  {
    question: "I already have a website — can you redesign it instead of starting from scratch?",
    answer:
      "Absolutely. Many of our projects are redesigns. We'll audit what you have, keep what's working (like existing content or SEO equity), and rebuild the rest around a system designed to convert.",
  },
  {
    question: "Do you handle hosting and maintenance after launch?",
    answer:
      "Every package includes a support window (3, 6, or 12 months depending on your plan) covering fixes and small updates. We can also set you up with simple, low-maintenance hosting, or work with your existing provider.",
  },
  {
    question: "What if I need changes after the support window ends?",
    answer:
      "You're never stuck. Since you own the code, you can bring on any developer — or come back to us for ongoing support or a new project whenever you need it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper-soft dark:bg-ink-soft border-y border-line dark:border-line-dark scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <SectionEyebrow icon={<IconHelpCircle />}>FAQ</SectionEyebrow>
          <h2 className="section-title mb-4">Questions, answered</h2>
          <p className="section-lead max-w-xl mx-auto">
            The things people usually ask before booking a call.
          </p>
        </Reveal>

        <Reveal delay={80} className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-paper dark:bg-ink-card transition-colors ${
                  isOpen ? "border-primary/40 shadow-sm" : "border-line dark:border-line-dark"
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left min-h-[44px] rounded-2xl"
                >
                  <span className="font-semibold text-text dark:text-white">{faq.question}</span>
                  <span
                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary dark:text-primary-light transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-text-light dark:text-steel-dark leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <p className="mt-10 text-center text-text-light dark:text-steel-dark">
          Still have questions?{" "}
          <a href="#contact" className="text-primary dark:text-primary-light font-semibold hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  );
}
