import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import { IconFolder } from "./icons";

export default function Portfolio() {
  const projects = [
    {
      name: "Voćar",
      description: "Full website redesign + SEO overhaul for a 35-year snack brand.",
      result: "1,000+ customers reached",
      category: "Food & Retail",
      screenshot: "/portfolio/vocar.jpg",
      url: "https://vocar-website.vercel.app",
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
      name: "CVlens",
      description: "AI CV analysis with a prioritized, actionable rewrite plan.",
      result: "Results in under a minute",
      category: "AI Tools",
      screenshot: "/portfolio/cvlens.jpg",
      url: "https://ai-cv-cc.vercel.app",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow icon={<IconFolder />}>Case studies</SectionEyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            Real projects we’ve shipped — click through to see them live.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden"
            >
              {/* Real screenshot of the live site */}
              <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                  src={project.screenshot}
                  alt={`${project.name} website screenshot`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 inset-x-0 h-7 bg-gradient-to-b from-black/50 to-transparent flex items-center gap-1.5 px-4">
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                </div>
              </div>

              <div className="p-8">
                <div className="text-sm text-primary font-medium mb-3">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-text dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-text-light dark:text-gray-400 mb-4">{project.description}</p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-lg font-semibold text-primary mb-2">
                    {project.result}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-text-light dark:text-gray-400 group-hover:text-primary transition-colors">
                    Visit live site
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
