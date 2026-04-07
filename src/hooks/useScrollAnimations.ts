import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/scrollAnimations';

/**
 * Hook that initializes global scroll animations after each route change.
 * Waits for React to finish rendering before scanning the DOM.
 */
export function useScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // Wait for React to paint the page
    const raf = requestAnimationFrame(() => {
      // Small delay to ensure lazy components are mounted
      const timer = setTimeout(() => {
        initScrollAnimations();
      }, 100);
      return () => clearTimeout(timer);
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanupScrollAnimations();
    };
  }, [location.pathname]);
}
