import { useEffect, useRef } from 'react';

/**
 * Lightweight parallax hook using CSS transforms.
 * Applies a subtle vertical shift to elements with [data-parallax] attribute.
 * Speed factor: 0.0 (static) to 1.0 (full scroll speed). Default 0.15 = subtle.
 * Respects prefers-reduced-motion.
 */
export function useParallax() {
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    if (!elements.length) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        elements.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.15');
          const rect = el.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const offset = (centerY - viewportCenter) * speed * -1;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      elements.forEach((el) => { el.style.transform = ''; });
    };
  }, []);
}
