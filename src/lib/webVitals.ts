// Web Vitals reporter — logs LCP, CLS, INP, FCP, TTFB to console & GA
import { onLCP, onCLS, onINP, onFCP, onTTFB, type Metric } from "web-vitals";

const fmt = (v: number) => Math.round(v * 100) / 100;
let started = false;

type WebVitalSnapshot = Pick<Metric, "name" | "value" | "rating" | "id" | "delta"> & {
  navigationType?: string;
  timestamp: number;
};

const colors: Record<string, string> = {
  good: "color:#10b981;font-weight:bold",
  "needs-improvement": "color:#f59e0b;font-weight:bold",
  poor: "color:#ef4444;font-weight:bold",
};

function report(metric: Metric) {
  const rating = metric.rating;
  const snapshot: WebVitalSnapshot = {
    name: metric.name,
    value: metric.value,
    rating,
    id: metric.id,
    delta: metric.delta,
    navigationType: "navigationType" in metric ? String(metric.navigationType) : undefined,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    const w = window as Window & { __WEB_VITALS__?: Record<string, WebVitalSnapshot> };
    w.__WEB_VITALS__ = { ...(w.__WEB_VITALS__ || {}), [metric.name]: snapshot };
    try {
      localStorage.setItem("tc_web_vitals", JSON.stringify(w.__WEB_VITALS__));
    } catch {
      // Ignore storage limits/private mode.
    }
  }

  // eslint-disable-next-line no-console
  console.log(
    `%c[Web Vitals] ${metric.name}: ${fmt(metric.value)}${metric.name === "CLS" ? "" : "ms"} (${rating})`,
    colors[rating] || ""
  );
  // Send to GA4 if available
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", metric.name, {
      event_category: "Web Vitals",
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  }
}

export function initWebVitals() {
  if (started) return;
  started = true;
  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}
