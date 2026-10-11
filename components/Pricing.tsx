import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconCreditCard } from "./icons";
import { GROWTH_FROM, STARTER_FROM, usd } from "@/lib/projectEstimate";

const plans = [
  {
    name: "Starter",
    description: "Simple website",
    target: "For small businesses",
    price: `From ${usd(STARTER_FROM)}`,
    features: ["Custom design", "Mobile responsive", "Basic SEO setup", "Content management", "3 months support"],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth",
    description: "Custom design + SEO",
    target: "For scaling businesses",
    price: `From ${usd(GROWTH_FROM)}`,
    features: [
      "Everything in Starter",
      "Advanced SEO optimization",
      "Performance optimization",
      "Analytics setup",
      "Conversion optimization",
      "6 months support",
    ],
    cta: "Start with Growth",
    popular: true,
  },
  {
    name: "Scale",
    description: "Web apps + automation",
    target: "For serious growth",
    price: "Quoted per project",
    features: [
      "Everything in Growth",
      "Custom web application",
      "Automation & integrations",
      "Advanced analytics",
      "Dedicated account manager",
      "12 months support",
    ],
    cta: "Request a quote",
    popular: false,
  },
];

function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-1 text-primary dark:text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={<IconCreditCard />}>Plans &amp; pricing</SectionEyebrow>
          <h2 className="section-title mb-4">Simple, productized packages</h2>
          <p className="section-lead max-w-2xl mx-auto">
            Pick the stage you&apos;re at. Every package ships with a support window, and you own everything we build.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90} className="h-full">
              <article
                className={`relative h-full flex flex-col p-7 sm:p-8 rounded-2xl border transition-all duration-200 ${
                  plan.popular
                    ? "border-primary/60 dark:border-primary/60 bg-paper-soft dark:bg-ink-card shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                    : "card card-hover"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary text-white text-xs font-semibold px-3 py-1 shadow-md">
                    Most popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold tracking-heading text-text dark:text-white mb-1">{plan.name}</h3>
                <p className="text-text-light dark:text-steel-dark">{plan.description}</p>
                <p className="text-sm text-text-light dark:text-steel-dark mb-6">{plan.target}</p>
                <div className="text-3xl sm:text-[2rem] font-semibold tracking-heading text-text dark:text-white mb-7">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-text-light dark:text-steel-dark">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-auto w-full ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-text-light dark:text-steel-dark max-w-2xl mx-auto leading-relaxed px-2">
          Final pricing depends on project scope, features, timeline, and integrations.
          Not sure where you land? Ballpark it below.
        </p>
      </div>
    </section>
  );
}
