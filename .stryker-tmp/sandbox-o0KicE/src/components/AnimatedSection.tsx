// @ts-nocheck
import { type ReactNode, useEffect, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-soft";
}

/**
 * Scroll-triggered animation wrapper using IntersectionObserver.
 * Content is always visible by default (no CLS). The observer adds
 * .anim-ready (hidden state) then .anim-visible (animated reveal).
 * Respects prefers-reduced-motion automatically via CSS.
 */
export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if user prefers reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Set initial hidden state
    el.classList.add("anim-ready");
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("anim-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const animClass = `anim-${animation}`;

  return (
    <div ref={ref} className={`${animClass} ${className}`.trim() || undefined}>
      {children}
    </div>
  );
};
