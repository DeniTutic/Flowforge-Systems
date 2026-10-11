import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconChat } from "./icons";

const testimonials = [
  {
    quote: "They didn't just build a site - they helped us get more clients. Our leads increased by 3x in the first month.",
    author: "Esed Music",
    role: "CEO, Vocar d.o.o",
    rating: 5,
  },
  {
    quote: "Flowforge Systems built a system that automates 80% of our manual work. We can finally focus on growing the business.",
    author: "Kemal Mustafic",
    role: "CEO & Founder, Aurora Code Factory",
    rating: 5,
  },
  {
    quote: "Professional, fast, and results-driven. They understand business, not just code. Worth every dollar.",
    author: "Edi Tutic",
    role: "Project & Product Manager",
    rating: 4.5,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= rating ? 1 : i - 0.5 <= rating ? 0.5 : 0;
        return (
          <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-ink/15 dark:text-white/15" aria-hidden>
            <defs>
              <linearGradient id={`star-${i}-${fill}`} x1="0" x2="1">
                <stop offset={`${fill * 100}%`} stopColor="#EA580C" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
              </linearGradient>
            </defs>
            <path
              fill={fill === 1 ? "#EA580C" : fill === 0 ? "currentColor" : `url(#star-${i}-${fill})`}
              d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.8l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z"
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper-soft dark:bg-ink-soft border-y border-line dark:border-line-dark">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={<IconChat />}>Testimonials</SectionEyebrow>
          <h2 className="section-title mb-4">What clients say</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 90}>
              <figure className="card card-hover p-7 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <svg className="w-8 h-8 text-primary/30 dark:text-primary-light/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7.2 5C4.3 5 2 7.3 2 10.2c0 2.6 1.9 4.7 4.4 5.1-.4 1.6-1.5 2.9-3 3.6l.9 1.5C8 18.9 10.3 15.8 10.3 11.3 10.3 7.9 9 5 7.2 5zm10.5 0C14.8 5 12.5 7.3 12.5 10.2c0 2.6 1.9 4.7 4.4 5.1-.4 1.6-1.5 2.9-3 3.6l.9 1.5c3.7-1.5 6-4.6 6-9.1C20.8 7.9 19.5 5 17.7 5z" />
                  </svg>
                  <Stars rating={t.rating} />
                </div>
                <blockquote className="text-text dark:text-white text-[1.05rem] leading-relaxed mb-6 flex-1 text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary-dark dark:text-primary-light font-semibold text-sm shrink-0" aria-hidden>
                    {initials(t.author)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-text dark:text-white">{t.author}</div>
                    <div className="text-sm text-text-light dark:text-steel-dark">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
