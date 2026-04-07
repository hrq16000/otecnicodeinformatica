import { useRef, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setIsTransitioning(true);

    // Phase 1: Exit with clip-path wipe
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(16px) scale(0.99)";
    el.style.filter = "blur(4px)";

    // Phase 2: Enter with smooth reveal
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
        el.style.filter = "blur(0)";
        
        setTimeout(() => setIsTransitioning(false), 400);
      });
    });
  }, [location.pathname]);

  return (
    <>
      {/* Transition overlay wipe */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.05))",
            animation: "pageWipe 0.5s ease-out forwards",
          }}
        />
      )}
      <div ref={containerRef} style={{ opacity: 1, transform: "translateY(0)", filter: "blur(0)" }}>
        {children}
      </div>
      <style>{`
        @keyframes pageWipe {
          0% { clip-path: inset(0 0 100% 0); opacity: 1; }
          50% { clip-path: inset(0 0 0 0); opacity: 0.6; }
          100% { clip-path: inset(100% 0 0 0); opacity: 0; }
        }
      `}</style>
    </>
  );
};
