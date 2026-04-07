import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType = "fade" | "fade-up" | "scale" | "slide-left" | "slide-right";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
}

const animClassMap: Record<AnimationType, string> = {
  "fade": "anim-fade",
  "fade-up": "anim-fade-up",
  "scale": "anim-scale",
  "slide-left": "anim-slide-left",
  "slide-right": "anim-slide-right",
};

export const AnimatedSection = ({ children, className = "", delay = 0, animation = "fade" }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const animClass = animClassMap[animation];

  return (
    <div
      ref={ref}
      className={`${animClass} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
