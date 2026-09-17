import SectionEyebrow from "./SectionEyebrow";

export default function Problem() {
  const problems = [
    {
      title: "Your website doesn't bring clients",
      description: "It just sits there looking nice but doing nothing.",
      icon: "💤",
    },
    {
      title: "Slow and outdated design",
      description: "Visitors leave before they understand what you offer.",
      icon: "🐢",
    },
    {
      title: "No clear system for growth",
      description: "Your business depends on inconsistent traffic.",
      icon: "📉",
    },
    {
      title: "Wasting time on manual tasks",
      description: "Your team could focus on higher-value work.",
      icon: "⏳",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow icon="👀">The problem</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Most websites don't work. They just exist.
          </h2>
          <p className="text-lg text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Most websites lose over 70% of visitors before they ever see the offer.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-l-[3px] border-l-rose-400/70 dark:border-l-rose-500/60 hover:border-primary/20 dark:hover:border-primary/40 hover:border-l-rose-400 dark:hover:border-l-rose-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-br from-primary/60 via-transparent to-emerald-400/60" />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 text-2xl mb-4">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-text dark:text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-text-light dark:text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
