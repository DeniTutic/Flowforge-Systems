/**
 * Brand mark: ember tile with a "flowing F" and a spark. Used in the navbar, footer,
 * favicon and OG image so the identity is one shape everywhere.
 */
export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="#C2410C" />
      <rect x="9" y="8" width="4" height="16" rx="2" fill="#fff" />
      <rect x="9" y="8" width="14" height="4" rx="2" fill="#fff" />
      <rect x="9" y="15" width="10" height="4" rx="2" fill="#fff" />
      <circle cx="23" cy="21" r="2.25" fill="#FDBA74" />
    </svg>
  );
}

export default function Logo({
  className = "",
  markClassName = "w-8 h-8",
  textClassName = "text-lg",
  /** Hide the second word on narrow screens (navbar) so it never fights the CTA for space. */
  compact = false,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className={`font-semibold tracking-heading text-text dark:text-white whitespace-nowrap ${textClassName}`}>
        Flowforge
        <span className={`text-text-light dark:text-steel-dark font-medium ${compact ? "hidden sm:inline" : ""}`}>
          {" "}
          Systems
        </span>
      </span>
    </span>
  );
}
