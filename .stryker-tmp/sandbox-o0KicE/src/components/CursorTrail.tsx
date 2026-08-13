// @ts-nocheck
import { useEffect, useRef, useCallback } from "react";

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animRef = useRef(0);
  const isTouch = useRef(false);

  const handleMove = useCallback((e: MouseEvent) => {
    if (isTouch.current) return;
    mouseRef.current = { x: e.clientX, y: e.clientY };
    // Add a new dot at cursor position
    dotsRef.current.push({
      x: e.clientX,
      y: e.clientY,
      opacity: 0.5,
      size: 6,
    });
    // Limit trail length
    if (dotsRef.current.length > 20) {
      dotsRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;
    if (prefersReduced || isTouchDevice || isSmallScreen) return;

    // Detect touch devices
    const onTouch = () => { isTouch.current = true; };
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow at cursor
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0 && !isTouch.current) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 60);
        gradient.addColorStop(0, "hsla(24, 92%, 52%, 0.08)");
        gradient.addColorStop(0.5, "hsla(24, 92%, 52%, 0.03)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 60, y - 60, 120, 120);
      }

      // Draw and fade trail dots
      for (let i = dotsRef.current.length - 1; i >= 0; i--) {
        const dot = dotsRef.current[i];
        dot.opacity -= 0.02;
        dot.size *= 0.97;

        if (dot.opacity <= 0) {
          dotsRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(24, 92%, 52%, ${dot.opacity * 0.4})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [handleMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
