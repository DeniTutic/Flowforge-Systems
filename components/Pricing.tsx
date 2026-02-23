export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Simple website",
      target: "For small businesses",
      price: "From $2,999",
      features: [
        "Custom design",
        "Mobile responsive",
        "Basic SEO setup",
        "Content management",
        "3 months support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      description: "Custom design + SEO",
      target: "For scaling businesses",
      price: "From $7,999",
      features: [
        "Everything in Starter",
        "Advanced SEO optimization",
        "Performance optimization",
        "Analytics setup",
        "6 months support",
        "Conversion optimization",
      ],
      cta: "Get Started",
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
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Pricing
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Productized packages designed for different growth stages.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border-2 transition-all ${
                plan.popular
                  ? "border-primary bg-gradient-to-br from-primary/5 to-white shadow-xl scale-105"
                  : "border-gray-100 bg-white hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-text mb-2">
                {plan.name}
              </h3>
              <p className="text-text-light mb-1">{plan.description}</p>
              <p className="text-sm text-text-light mb-6">{plan.target}</p>
              <div className="text-4xl font-bold text-text mb-6">
                {plan.price}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-text-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 text-text hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
