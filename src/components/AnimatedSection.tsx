import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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

const hiddenStateMap: Record<AnimationType, CSSProperties> = {
  fade: { opacity: 0, transform: "translateY(12px)" },
  "fade-up": { opacity: 0, transform: "translateY(24px)" },
  scale: { opacity: 0, transform: "scale(0.95)" },
  "slide-left": { opacity: 0, transform: "translateX(-20px)" },
  "slide-right": { opacity: 0, transform: "translateX(20px)" },
};

export const AnimatedSection = ({ children, className = "", delay = 0, animation = "fade" }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsVisible(true);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;

    if (prefersReduced || !el || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      setShouldAnimate(false);
      return;
    }

    setShouldAnimate(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            window.setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    observer.observe(el);

    const fallback = window.setTimeout(() => setIsVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  const hiddenStyle = shouldAnimate && !isVisible ? hiddenStateMap[animation] : undefined;
  const animClass = shouldAnimate && isVisible ? animClassMap[animation] : "";

  return (
    <div ref={ref} style={hiddenStyle} className={`${animClass} ${className}`.trim()}>
      {children}
    </div>
  );
};
