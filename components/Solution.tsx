import HowWeWorkFlow from "./HowWeWorkFlow";
import Problem from "./Problem";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconCompass, IconZap, IconSearch, IconShieldCheck } from "./icons";

const stats = [
  { number: "10+", label: "Projects shipped" },
  { number: "100%", label: "Client satisfaction" },
  { number: "2–4 wks", label: "Typical delivery" },
];

const guarantees = [
  { icon: IconZap, text: "Fast, mobile-first builds" },
  { icon: IconSearch, text: "SEO-ready from day one" },
  { icon: IconShieldCheck, text: "You own the code and design" },
];

export default function Solution() {
  return (
    <section id="process" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper-soft dark:bg-ink-soft border-y border-line dark:border-line-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionEyebrow icon={<IconCompass />}>The problem</SectionEyebrow>
          <h2 className="section-title mb-4 text-balance">Most websites don&apos;t work. They just exist.</h2>
          <p className="section-lead max-w-2xl mx-auto">
            Most sites lose over 70% of visitors before they ever see the offer.
          </p>
        </Reveal>

        <Reveal delay={60} className="mb-20 sm:mb-24">
          <Problem />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light mb-3">
              Our answer
            </p>
            <h2 className="section-title mb-6 text-balance">We build systems, not just websites.</h2>
            <p className="section-lead leading-relaxed mb-8 text-pretty">
              Most agencies build websites. We build complete growth systems designed to generate
              leads, automate workflows, and support long-term business growth.
            </p>
            <ul className="space-y-3 mb-10">
              {guarantees.map((g) => (
                <li key={g.text} className="flex items-center gap-3 text-text dark:text-white font-medium">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary dark:text-primary-light shrink-0">
                    <g.icon className="w-4 h-4" />
                  </span>
                  {g.text}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="card p-4 sm:p-5">
                  <dt className="order-2 text-xs sm:text-sm text-text-light dark:text-steel-dark">{s.label}</dt>
                  <dd className="order-1 text-2xl sm:text-3xl font-semibold tracking-heading text-primary dark:text-primary-light mb-1 tabular-nums">
                    {s.number}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="absolute -inset-6 bg-primary-bright/10 blur-3xl rounded-full" aria-hidden />
            <div className="relative">
              <HowWeWorkFlow />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
