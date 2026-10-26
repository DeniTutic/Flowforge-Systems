import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconFolder } from "./icons";
import { HIREHAND_URL } from "@/lib/sisterBrands";

const projects = [
  {
    name: "Hirehand",
    description: "AI phone assistant that books, cancels and sends reminders.",
    result: "Answers calls 24/7",
    category: "AI Automation",
    screenshot: "/portfolio/hirehand.jpg",
    url: HIREHAND_URL,
  },
  {
    name: "Vela",
    description: "AI-powered landing page + product design.",
    result: "Thousands of users onboarded",
    category: "AI SaaS",
    screenshot: "/portfolio/vela.jpg",
    url: "https://vela-situationship-ai-tranlator.vercel.app",
  },
  {
    name: "Voćar",
    description: "Full website redesign + SEO overhaul for a 35-year snack brand.",
    result: "1,000+ customers reached",
    category: "Food & Retail",
    screenshot: "/portfolio/vocar.jpg",
    url: "https://vocar-website.vercel.app",
  },
];

function domainOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Portfolio() {
  return (
    <section id="work" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-ink scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={<IconFolder />}>Selected work</SectionEyebrow>
          <h2 className="section-title mb-4">Real projects, live today.</h2>
          <p className="section-lead max-w-2xl mx-auto">
            Three sites we designed, built and shipped — click through to see them running.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 90}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card card-hover block overflow-hidden h-full"
              >
                {/* Browser window */}
                <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-line dark:border-line-dark bg-paper dark:bg-ink-soft">
                  <span className="w-2 h-2 rounded-full bg-ink/15 dark:bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-ink/15 dark:bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-ink/15 dark:bg-white/20" />
                  <span className="ml-2 flex-1 h-5 rounded-full bg-paper-soft dark:bg-ink border border-line dark:border-line-dark flex items-center px-2.5 text-[0.65rem] text-text-light dark:text-steel-dark truncate">
                    {domainOf(project.url)}
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-muted dark:bg-ink">
                  <Image
                    src={project.screenshot}
                    alt={`${project.name} website screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover pan-on-hover"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold tracking-heading text-text dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-text-light dark:text-steel-dark mb-5 text-pretty">{project.description}</p>
                  <div className="pt-4 border-t border-line dark:border-line-dark flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-text dark:text-white">{project.result}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-text-light dark:text-steel-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors shrink-0">
                      Visit
                      <svg className="w-3.5 h-3.5 motion-safe:transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
