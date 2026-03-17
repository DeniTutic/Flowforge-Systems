export default function Portfolio() {
  const projects = [
    {
      name: "SaaS Startup",
      description: "Website redesign + AI onboarding flow.",
      result: "42% increase in conversions",
      category: "SaaS",
    },
    {
      name: "Local Service Business",
      description: "New website + automated lead capture.",
      result: "3× more inbound leads",
      category: "Local Services",
    },
    {
      name: "AI Product",
      description: "Landing page + product positioning.",
      result: "60% increase in demo bookings",
      category: "AI & B2B",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
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
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="text-sm text-primary font-medium mb-3">
                {project.category}
              </div>
              <h3 className="text-2xl font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-text-light dark:text-gray-400 mb-4">{project.description}</p>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-lg font-semibold text-primary">
                  {project.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
