import SectionEyebrow from "./SectionEyebrow";

export default function Portfolio() {
  const projects = [
    {
      name: "SaaS Startup",
      description: "Website redesign + AI onboarding flow.",
      result: "42% increase in conversions",
      category: "SaaS",
      icon: "📊",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Local Service Business",
      description: "New website + automated lead capture.",
      result: "3× more inbound leads",
      category: "Local Services",
      icon: "🏪",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "AI Product",
      description: "Landing page + product positioning.",
      result: "60% increase in demo bookings",
      category: "AI & B2B",
      icon: "🤖",
      gradient: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow icon="📁">Case studies</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            A sample of systems we’ve built to generate leads and automate growth.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden"
            >
              {/* Stylized project visual (illustrative mockup, not an actual client screenshot) */}
              <div className={`relative h-36 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute -right-6 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-md" />
                <div className="absolute -left-4 -top-6 w-20 h-20 rounded-full bg-white/10 blur-md" />
                <div className="absolute top-3.5 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {project.icon}
                </div>
                <div className="absolute bottom-4 left-4 right-4 space-y-1.5 opacity-70">
                  <div className="h-1.5 w-2/3 rounded-full bg-white/50" />
                  <div className="h-1.5 w-1/3 rounded-full bg-white/30" />
                </div>
              </div>

              <div className="p-8">
                <div className="text-sm text-primary font-medium mb-3">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-text-light dark:text-gray-400 mb-4">{project.description}</p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-lg font-semibold text-primary">
                    {project.result}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
