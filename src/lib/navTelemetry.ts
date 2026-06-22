/**
 * Telemetria de navegação client-side.
 *
 * - Mede o tempo entre o clique e o paint da nova rota.
 * - Mantém um histórico curto em sessionStorage (últimas 30 navegações)
 *   para cálculo de p50/p95.
 * - Modo debug: `?debug=nav` na URL OU `localStorage.NAV_DEBUG=1`.
 *   Em debug, loga cada navegação no console com cor por faixa.
 * - Alerta (console.warn) quando uma navegação ultrapassa o
 *   threshold de 90ms — equivalente ao gatilho do RouteLoader.
 *
 * Uso:
 *   const end = startNav(pathname);     // no início do click handler
 *   end({ cached: true|false });         // após o paint da nova rota
 */
const STORE_KEY = "__nav_p95__";
const MAX_SAMPLES = 30;
const SLOW_THRESHOLD_MS = 90;

type Sample = { path: string; ms: number; cached: boolean; at: number };

const isDebug = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).has("debug")) return true;
    return window.localStorage?.getItem("NAV_DEBUG") === "1";
  } catch {
    return false;
  }
};

const readSamples = (): Sample[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Sample[]) : [];
  } catch {
    return [];
  }
};

const writeSamples = (samples: Sample[]) => {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify(samples.slice(-MAX_SAMPLES)));
  } catch {
    /* noop */
  }
};

const percentile = (sorted: number[], p: number) => {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return Math.round(sorted[Math.max(0, i)]);
};

export const getNavStats = () => {
  const samples = readSamples();
  const sorted = samples.map((s) => s.ms).sort((a, b) => a - b);
  return {
    count: samples.length,
    p50: percentile(sorted, 50),
    p95: percentile(sorted, 95),
    max: sorted[sorted.length - 1] ?? 0,
    slowCount: samples.filter((s) => s.ms > SLOW_THRESHOLD_MS).length,
    samples,
  };
};

export const startNav = (path: string) => {
  const t0 = performance.now();
  const mark = `nav:${path}:${t0.toFixed(0)}`;
  try {
    performance.mark(`${mark}:start`);
  } catch {
    /* noop */
  }

  return ({ cached = false }: { cached?: boolean } = {}) => {
    const ms = performance.now() - t0;
    const samples = readSamples();
    samples.push({ path, ms, cached, at: Date.now() });
    writeSamples(samples);

    try {
      performance.mark(`${mark}:end`);
      performance.measure(`nav ${path}`, `${mark}:start`, `${mark}:end`);
    } catch {
      /* noop */
    }

    if (ms > SLOW_THRESHOLD_MS) {
      // Acima do threshold do loader → digno de atenção
      // eslint-disable-next-line no-console
      console.warn(
        `[nav] slow ${ms.toFixed(0)}ms → ${path}${cached ? " (cached)" : ""}`,
      );
    } else if (isDebug()) {
      // eslint-disable-next-line no-console
      console.log(
        `%c[nav] ${ms.toFixed(0)}ms → ${path}${cached ? " (cached)" : ""}`,
        ms < 30 ? "color:#22c55e" : ms < 90 ? "color:#eab308" : "color:#ef4444",
      );
    }
  };
};

// Expor stats no console em modo debug para inspeção rápida
if (typeof window !== "undefined") {
  (window as unknown as { __navStats?: typeof getNavStats }).__navStats = getNavStats;
}
