"use client";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "We understand your business and define the growth system.",
    color: "from-blue-500/10 to-primary/10",
    borderColor: "hover:border-primary/40",
    accent: "text-primary",
  },
  {
    number: "02",
    title: "Design",
    description: "We design a modern, conversion-focused interface.",
    color: "from-indigo-500/10 to-primary/10",
    borderColor: "hover:border-indigo-400/40",
    accent: "text-indigo-600",
  },
  {
    number: "03",
    title: "Build",
    description: "We develop the website and integrate automation systems.",
    color: "from-violet-500/10 to-primary/10",
    borderColor: "hover:border-violet-400/40",
    accent: "text-violet-600",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "We launch and improve performance based on real data.",
    color: "from-primary/10 to-blue-500/10",
    borderColor: "hover:border-primary/40",
    accent: "text-primary",
  },
];

export default function Process() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            How we work
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            A simple, proven process that delivers results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div
                className={`p-8 rounded-2xl bg-gradient-to-br ${step.color} border border-gray-100 dark:border-gray-700 ${step.borderColor} transition-all duration-300 h-full hover:shadow-lg process-step`}
              >
                <div
                  className={`text-5xl font-bold mb-4 opacity-80 ${step.accent} process-number`}
                >
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-text dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-text-light dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 dark:from-gray-600 to-transparent transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
