import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyOnVisibleProps {
  children: ReactNode;
  /** Reserve vertical space until mounted to avoid layout shift. */
  minHeight?: string;
  /** Distance (px) ahead of viewport that triggers mount. */
  rootMargin?: string;
}

/**
 * Renders children only when its placeholder approaches the viewport.
 * Prevents below-the-fold Suspense boundaries from all fetching their
 * chunks immediately after the first paint.
 */
export const LazyOnVisible = ({
  children,
  minHeight = "400px",
  rootMargin = "0px 0px",
}: LazyOnVisibleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  if (visible) return <>{children}</>;
  return <div ref={ref} aria-hidden="true" style={{ minHeight }} />;
};

export default LazyOnVisible;
