// @ts-nocheck
import { useEffect, useRef } from "react";

/**
 * Invisible component that triggers browser geolocation permission
 * when it enters the viewport (via IntersectionObserver).
 * Place it above sections that benefit from location data.
 */
export const GeolocationTrigger = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          navigator.geolocation?.getCurrentPosition(
            () => {},
            () => {},
            { enableHighAccuracy: false, timeout: 5000 }
          );
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={triggerRef} aria-hidden="true" className="h-0 w-0 overflow-hidden" />;
};
