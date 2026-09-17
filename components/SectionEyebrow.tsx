export default function SectionEyebrow({
  icon,
  children,
}: {
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 text-primary text-xs font-semibold uppercase tracking-[0.14em] mb-4">
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}
