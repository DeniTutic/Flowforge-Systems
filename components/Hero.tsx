import HeroDashboardMockup from "./HeroDashboardMockup";
import { IconBriefcase, IconCpu, IconStore, IconCart } from "./icons";

const niches = [
  { label: "SaaS", icon: IconBriefcase },
  { label: "AI startups", icon: IconCpu },
  { label: "Local businesses", icon: IconStore },
  { label: "E-commerce", icon: IconCart },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-paper dark:bg-ink"
    >
      {/* Ambient: one ember glow + one cool steel wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-primary-bright/15 dark:bg-primary-bright/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-steel/10 dark:bg-steel/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(11 15 20 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(11 15 20 / 0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="hero-in">
              <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-semibold tracking-display leading-[1.06] sm:leading-[1.04] text-text dark:text-white mb-6 text-balance">
                Websites and AI systems that generate leads for your business.
              </h1>
            </div>
            <div className="hero-in" style={{ "--in-delay": "80ms" } as React.CSSProperties}>
              <p className="text-lg sm:text-xl text-text-light dark:text-steel-dark mb-9 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
                We design and build modern websites and AI automations that turn traffic into
                clients and help businesses scale faster.
              </p>
            </div>
            <div className="hero-in" style={{ "--in-delay": "160ms" } as React.CSSProperties}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-12">
                <a href="#contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                  Book a free strategy call
                </a>
                <a href="#work" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                  See our work
                </a>
              </div>
            </div>
            <div className="hero-in" style={{ "--in-delay": "240ms" } as React.CSSProperties}>
              <div className="inline-flex flex-col items-center lg:items-start gap-3">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-text-light dark:text-steel-dark">
                  Trusted by founders and growing businesses
                </span>
                <ul className="flex flex-wrap justify-center lg:justify-start gap-2" aria-label="Industries we serve">
                  {niches.map((tag) => (
                    <li
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-line dark:border-line-dark bg-paper-soft/70 dark:bg-white/5 backdrop-blur text-text-light dark:text-steel-dark text-[0.8rem] font-medium"
                    >
                      <tag.icon className="w-3.5 h-3.5 text-primary" />
                      {tag.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hero-in max-w-lg mx-auto lg:max-w-none w-full" style={{ "--in-delay": "200ms" } as React.CSSProperties}>
            <HeroDashboardMockup />
          </div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to our work"
        className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 text-text-light dark:text-steel-dark hover:text-primary dark:hover:text-primary-light transition-colors"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <svg className="w-4 h-4 motion-safe:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
