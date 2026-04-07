import { useState, useEffect, useCallback } from "react";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      {/* Main progress bar */}
      <div
        className="h-full rounded-r-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.8), hsl(var(--primary)))`,
        }}
      />
      {/* Glow effect at the tip */}
      <div
        className="absolute top-0 h-[6px] w-12 rounded-full transition-[left] duration-100 ease-out"
        style={{
          left: `calc(${progress}% - 24px)`,
          background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.7), transparent)`,
          filter: "blur(3px)",
        }}
      />
      {/* Shimmer trail */}
      <div
        className="absolute top-0 h-[3px] rounded-r-full transition-[width] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, transparent 80%, hsl(var(--accent) / 0.4))`,
        }}
      />
    </div>
  );
};
