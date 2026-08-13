// @ts-nocheck
// Web Vitals reporter — captures LCP, CLS, INP, FCP, TTFB per page,
// stores rolling history in localStorage, exposes a snapshot on window,
// emits a `web-vital` CustomEvent, sends to GA4 (gtag) and optionally
// to a beacon endpoint (set VITE_VITALS_ENDPOINT).
import { onLCP, onCLS, onINP, onFCP, onTTFB, type Metric } from "web-vitals";

const fmt = (v: number) => Math.round(v * 100) / 100;
let started = false;

const HISTORY_KEY = "tc_web_vitals_history";
const SNAPSHOT_KEY = "tc_web_vitals";
const MAX_HISTORY = 200;

export type WebVitalEntry = {
  name: string;
  value: number;
  rating: string;
  id: string;
  delta: number;
  path: string;
  navigationType?: string;
  timestamp: number;
};

const colors: Record<string, string> = {
  good: "color:#10b981;font-weight:bold",
  "needs-improvement": "color:#f59e0b;font-weight:bold",
  poor: "color:#ef4444;font-weight:bold",
};

function pushHistory(entry: WebVitalEntry) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list: WebVitalEntry[] = raw ? JSON.parse(raw) : [];
    list.push(entry);
    while (list.length > MAX_HISTORY) list.shift();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function readVitalsHistory(): WebVitalEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as WebVitalEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearVitalsHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* ignore */
  }
}

function report(metric: Metric) {
  const entry: WebVitalEntry = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    delta: metric.delta,
    path: typeof location !== "undefined" ? location.pathname : "",
    navigationType:
      "navigationType" in metric ? String(metric.navigationType) : undefined,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    const w = window as Window & {
      __WEB_VITALS__?: Record<string, WebVitalEntry>;
    };
    w.__WEB_VITALS__ = { ...(w.__WEB_VITALS__ || {}), [metric.name]: entry };
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(w.__WEB_VITALS__));
    } catch {
      /* ignore */
    }
    pushHistory(entry);
    window.dispatchEvent(new CustomEvent("web-vital", { detail: entry }));
  }

  // eslint-disable-next-line no-console
  console.log(
    `%c[Web Vitals] ${metric.name}: ${fmt(metric.value)}${metric.name === "CLS" ? "" : "ms"} (${entry.rating}) — ${entry.path}`,
    colors[entry.rating] || ""
  );

  // GA4
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; __APP_VERSION__?: string };
  if (typeof window !== "undefined" && w.gtag) {
    w.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: entry.path,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating,
      app_version: w.__APP_VERSION__ || "dev",
      non_interaction: true,
    });
  }

  // Optional beacon endpoint
  const endpoint = (import.meta as unknown as { env?: Record<string, string> })
    .env?.VITE_VITALS_ENDPOINT;
  if (endpoint && typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    try {
      const blob = new Blob([JSON.stringify(entry)], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
    } catch {
      /* ignore */
    }
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
