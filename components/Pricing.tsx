"use client";

import { useState } from "react";

export default function Pricing() {
  const [isLoadingPlan, setIsLoadingPlan] = useState<string | null>(null);
  const plans = [
    {
      name: "Starter",
      description: "Simple website",
      target: "For small businesses",
      price: "From $2,999",
      stripePlanId: "starter",
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
      stripePlanId: "growth",
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
      stripePlanId: null,
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

  const startCheckout = async (planId: string | null) => {
    if (!planId) {
      window.location.href = "#contact";
      return;
    }
    setIsLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start checkout.";
      window.alert(message);
    } finally {
      setIsLoadingPlan(null);
    }
  };

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
              <button
                type="button"
                onClick={() => startCheckout(plan.stripePlanId)}
                disabled={isLoadingPlan === plan.stripePlanId}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 dark:bg-gray-700 text-text dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isLoadingPlan === plan.stripePlanId ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
