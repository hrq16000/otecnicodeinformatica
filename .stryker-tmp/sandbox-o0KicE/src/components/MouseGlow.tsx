// @ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";

interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

/**
 * Adds a radial glow effect that follows the mouse within the container.
 * Disables on touch devices and when prefers-reduced-motion is set.
 */
export const MouseGlow = ({ 
  children, 
  className = "", 
  glowColor = "var(--accent)",
  glowSize = 300 
}: MouseGlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsEnabled(!isTouch && !prefersReduced);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !containerRef.current || !isEnabled) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.transform = `translate(${x - glowSize / 2}px, ${y - glowSize / 2}px)`;
    glowRef.current.style.opacity = "1";
  }, [isEnabled, glowSize]);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isEnabled && (
        <div
          ref={glowRef}
          className="absolute pointer-events-none transition-opacity duration-300 z-0"
          style={{
            width: glowSize,
            height: glowSize,
            borderRadius: "50%",
            background: `radial-gradient(circle, hsl(${glowColor} / 0.08) 0%, transparent 70%)`,
            opacity: 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
