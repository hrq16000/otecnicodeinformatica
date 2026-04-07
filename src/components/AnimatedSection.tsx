import { useEffect, useRef, type ReactNode } from "react";

type AnimationType = "fade" | "fade-up" | "scale" | "slide-left" | "slide-right";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
}

const animClassMap: Record<AnimationType, string> = {
  fade: "anim-fade",
  "fade-up": "anim-fade-up",
  scale: "anim-scale",
  "slide-left": "anim-slide-left",
  "slide-right": "anim-slide-right",
};

export const AnimatedSection = ({ children, className = "", delay = 0, animation = "fade" }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("is-visible"), delay);
          } else {
            el.classList.add("is-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.02, rootMargin: "0px 0px -10px 0px" },
    );

    observer.observe(el);

    // Safety: always show after 800ms
    const fallback = setTimeout(() => el.classList.add("is-visible"), 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  const animClass = animClassMap[animation];

  return (
    <div ref={ref} className={`${animClass} ${className}`.trim()}>
      {children}
    </div>
  );
};
