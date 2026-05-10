export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Simple website",
      target: "For small businesses",
      price: "Starting at $2,999",
      features: [
        "Custom design",
        "Mobile responsive",
        "Basic SEO setup",
        "Content management",
        "3 months support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      description: "Custom design + SEO",
      target: "For scaling businesses",
      price: "Starting at $7,999",
      features: [
        "Everything in Starter",
        "Advanced SEO optimization",
        "Performance optimization",
        "Analytics setup",
        "6 months support",
        "Conversion optimization",
      ],
      popular: true,
    },
    {
      name: "Scale",
      description: "Web apps + automation",
      target: "For serious growth",
      price: "Custom",
      features: [
        "Everything in Growth",
        "Custom web application",
        "Automation & integrations",
        "Advanced analytics",
        "12 months support",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Pricing
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Productized packages designed for different growth stages.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 transition-all ${
                plan.popular
                  ? "border-primary bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-gray-800 shadow-xl scale-105"
                  : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/30 dark:hover:border-primary/40"
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-text dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-text-light dark:text-gray-400 mb-1">{plan.description}</p>
              <p className="text-sm text-text-light dark:text-gray-500 mb-6">{plan.target}</p>
              <div className="text-4xl font-bold text-text dark:text-white mb-6">
                {plan.price}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-text-light dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 dark:bg-gray-700 text-text dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Request a Quote
              </a>
            </div>
          ))}
        </div>
        <p className="mt-12 sm:mt-14 mb-2 text-center text-sm sm:text-base text-text-light dark:text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
          Final pricing depends on project scope, features, timeline, and integrations.
        </p>
      </div>
    </section>
  );
}
