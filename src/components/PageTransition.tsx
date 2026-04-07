import { useRef, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reset and trigger animation
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [location.pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 1, transform: "translateY(0)" }}>
      {children}
    </div>
  );
};
