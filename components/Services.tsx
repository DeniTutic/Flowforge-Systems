import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconTool, IconRocket, IconCpu, IconTarget, IconTrendingUp } from "./icons";

const services = [
  {
    title: "Websites that convert visitors into clients",
    description: "High-performance sites with clear messaging, fast load times, and built-in analytics.",
    icon: IconRocket,
  },
  {
    title: "AI systems that automate your work",
    description: "Custom chatbots, workflows, and internal tools that save your team hours every week.",
    icon: IconCpu,
  },
  {
    title: "Landing pages that print leads",
    description: "Launch-ready pages and funnels optimized for ads, campaigns, and email capture.",
    icon: IconTarget,
  },
  {
    title: "Ongoing optimization & support",
    description: "We keep testing, improving, and shipping changes so your conversion rate keeps climbing.",
    icon: IconTrendingUp,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={<IconTool />}>What we do</SectionEyebrow>
          <h2 className="section-title mb-4">What we build for you</h2>
          <p className="section-lead max-w-2xl mx-auto">
            Clear, outcome-driven services focused on revenue, not vanity metrics.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className="card card-hover p-7 sm:p-8 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary dark:text-primary-light mb-5">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-heading text-text dark:text-white mb-3 text-balance">
                  {service.title}
                </h3>
                <p className="text-text-light dark:text-steel-dark leading-relaxed text-pretty">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
