"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, applied via CSS var so it stays on the compositor. */
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Fade + 12px rise, once, when the wrapper enters the viewport.
 * Observes one wrapper per block — never every child — so sections don't stutter in.
 * Reduced motion is handled in CSS (.reveal is forced visible).
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("is-visible");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when it enters, or if it's already above the fold (e.g. the page loaded
          // on a hash and jumped past it) — otherwise it would stay invisible until scrolled up.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) show();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    // A hash jump can skip an element without ever intersecting it; catch that on scroll.
    const onScroll = () => {
      if (el.getBoundingClientRect().bottom < 0) show();
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
