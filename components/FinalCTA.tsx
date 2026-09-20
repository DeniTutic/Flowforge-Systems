import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-white py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-bright/60 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[52rem] h-[36rem] rounded-full bg-primary-bright/[0.16] blur-3xl" />
        <div className="absolute -bottom-48 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/[0.12] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
      </div>
      <Reveal className="relative max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-light mb-4">Let&apos;s build yours</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-display leading-[1.05] mb-6 text-balance">
          Ready to turn your website into a growth system?
        </h2>
        <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto text-pretty">
          Tell us about your project. We reply within 24 hours and show you exactly how your site can generate more leads.
        </p>
        <a href="#contact" className="btn-primary text-base px-8 py-4">
          Book a free strategy call
        </a>
        <p className="mt-5 text-sm text-white/55">15-minute call. No pitch deck, no pressure.</p>
      </Reveal>
    </section>
  );
}
