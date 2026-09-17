import HowWeWorkFlow from "./HowWeWorkFlow";
import SectionEyebrow from "./SectionEyebrow";

export default function Solution() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionEyebrow icon="🧭">Why Flowforge</SectionEyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-6">
              We build systems, not just websites.
            </h2>
            <p className="text-xl text-text-light dark:text-gray-400 leading-relaxed mb-8">
              Most agencies build websites. We build complete growth systems designed to generate leads,
              automate workflows, and support long-term business growth.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-text-light dark:text-gray-400">Projects Shipped</div>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-text-light dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-2xl font-bold text-primary mb-1">2–4 weeks</div>
                <div className="text-sm text-text-light dark:text-gray-400">Typical Delivery</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-emerald-400/5 to-sky-500/10 blur-3xl opacity-70" />
            <div className="relative">
              <HowWeWorkFlow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

