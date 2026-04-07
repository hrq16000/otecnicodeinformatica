import { useEffect, useRef } from "react";

/**
 * Hook that adds `.revealed` class to elements with reveal-* classes
 * when they enter the viewport, creating a scroll-driven text reveal effect.
 */
export function useRevealOnScroll() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Immediately reveal everything
      document.querySelectorAll(".reveal-text, .reveal-text-left, .reveal-text-right, .reveal-scale").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply stagger delay based on data attribute
            const delay = (entry.target as HTMLElement).dataset.revealDelay;
            if (delay) {
              setTimeout(() => entry.target.classList.add("revealed"), parseInt(delay));
            } else {
              entry.target.classList.add("revealed");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-text, .reveal-text-left, .reveal-text-right, .reveal-scale").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
