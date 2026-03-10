export default function Portfolio() {
  const projects = [
    {
      name: "TechFlow SaaS",
      description: "Conversion‑focused marketing site and onboarding flow for a B2B SaaS.",
      result: "+62% trial signups after redesign and copy overhaul",
      category: "SaaS Website",
    },
    {
      name: "EcoStore",
      description: "E‑commerce experience for sustainable products with optimized checkout.",
      result: "3× revenue growth in 6 months",
      category: "E‑commerce",
    },
    {
      name: "GrowthLab",
      description: "AI‑driven marketing automation and reporting dashboard.",
      result: "Reduced manual work by 60%",
      category: "AI & Automation",
    },
    {
      name: "FitPro App",
      description: "Coaching platform with programs, payments, and member dashboard.",
      result: "500% increase in user engagement",
      category: "Web Application",
    },
    {
      name: "LocalBiz Hub",
      description: "Directory and booking system for local businesses.",
      result: "2× more leads generated",
      category: "Local Services",
    },
    {
      name: "FinanceFlow",
      description: "Financial dashboards with live data and role‑based access.",
      result: "80% faster reporting process",
      category: "Internal Tools",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Selected work
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Outcome‑driven projects shipped for startups and growing brands.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/40 transition-all hover:shadow-xl group"
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
