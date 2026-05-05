// Web Vitals reporter — logs LCP, CLS, INP, FCP, TTFB to console & GA
import { onLCP, onCLS, onINP, onFCP, onTTFB, type Metric } from "web-vitals";

const fmt = (v: number) => Math.round(v * 100) / 100;

const colors: Record<string, string> = {
  good: "color:#10b981;font-weight:bold",
  "needs-improvement": "color:#f59e0b;font-weight:bold",
  poor: "color:#ef4444;font-weight:bold",
};

function report(metric: Metric) {
  const rating = metric.rating;
  // eslint-disable-next-line no-console
  console.log(
    `%c[Web Vitals] ${metric.name}: ${fmt(metric.value)}${metric.name === "CLS" ? "" : "ms"} (${rating})`,
    colors[rating] || ""
  );
  // Send to GA4 if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
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
  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}
