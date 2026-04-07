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
      <div
        className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent rounded-r-full transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the tip */}
      <div
        className="absolute top-0 h-[3px] w-8 rounded-full blur-sm bg-accent/60 transition-[left] duration-100 ease-out"
        style={{ left: `calc(${progress}% - 16px)` }}
      />
    </div>
  );
};
