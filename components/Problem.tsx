export default function Problem() {
  const problems = [
    {
      title: "Your website doesn't bring clients",
      description: "It just sits there, looking nice but doing nothing.",
    },
    {
      title: "Slow and outdated design",
      description: "Visitors leave before they see what you offer.",
    },
    {
      title: "No clear system for growth",
      description: "You're stuck doing everything manually.",
    },
    {
      title: "Wasting time on manual tasks",
      description: "Your team could be focusing on what matters.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Most websites don't work. They just exist.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40 transition-all hover:shadow-lg"
            >
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
