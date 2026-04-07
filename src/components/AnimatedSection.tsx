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
  // Start visible by default so content is never hidden
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    // Only hide and animate if IntersectionObserver is supported
    setIsVisible(false);
    setShouldAnimate(true);

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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    // Safety fallback: ensure visible after 2s no matter what
    const fallback = setTimeout(() => setIsVisible(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  const animClass = shouldAnimate ? animClassMap[animation] : "";

  return (
    <div
      ref={ref}
      className={`${animClass} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
