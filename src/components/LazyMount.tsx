import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** Minimum height reserved before mount to avoid CLS. */
  minHeight?: number | string;
  /** Root margin for IntersectionObserver. */
  rootMargin?: string;
  /** Force render immediately (debug/SEO). */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Mounts its children only once they enter the viewport (or are near it).
 * Use for heavy/below-the-fold sections to keep the initial render instant
 * and reduce JS/CSS work on first paint. Reserves a min-height to keep CLS at 0.
 */
export const LazyMount = ({
  children,
  minHeight = 320,
  rootMargin = "300px 0px",
  eager = false,
  className,
  style,
  as = "div",
}: LazyMountProps) => {
  const Tag = as as keyof JSX.IntrinsicElements;
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  const mergedStyle: CSSProperties = {
    minHeight: visible ? undefined : minHeight,
    contain: visible ? undefined : "layout paint",
    ...style,
  };

  // @ts-expect-error dynamic tag
  return (
    <Tag ref={ref} className={className} style={mergedStyle}>
      {visible ? children : null}
    </Tag>
  );
};

export default LazyMount;
