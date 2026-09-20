import { IconMoon, IconClock, IconTrendingDown, IconHourglass } from "./icons";

const problems = [
  { title: "Your website doesn't bring clients", description: "It looks fine and does nothing.", icon: IconMoon },
  { title: "Slow, outdated design", description: "Visitors leave before they understand the offer.", icon: IconClock },
  { title: "No system for growth", description: "Revenue depends on inconsistent traffic.", icon: IconTrendingDown },
  { title: "Hours lost to manual work", description: "Your team is busy with tasks software should do.", icon: IconHourglass },
];

/** Compact 4-up strip. Rendered inside the Process chapter, directly above the solution. */
export default function Problem() {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Common problems">
      {problems.map((p) => (
        <li key={p.title} className="card p-5 flex gap-3.5 items-start">
          <span className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <p.icon className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-semibold text-text dark:text-white leading-snug">{p.title}</h3>
            <p className="text-sm text-text-light dark:text-steel-dark mt-1">{p.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
