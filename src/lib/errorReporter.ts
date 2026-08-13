/**
 * Captura global de erros em produção. Loga no console com a versão do build
 * para facilitar correlação com deploys e envia um evento `app_error` ao GA4
 * (quando consent autorizar). Também dispara `app:error` no window para que
 * testes/observability local possam ouvir.
 */
declare const __APP_VERSION__: string;
declare const __APP_BUILD_TIME__: string;

const APP_VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
const APP_BUILD_TIME = typeof __APP_BUILD_TIME__ !== "undefined" ? __APP_BUILD_TIME__ : "dev";

declare global {
  interface Window {
    __APP_VERSION__?: string;
    __APP_BUILD_TIME__?: string;
    __APP_ERRORS__?: Array<Record<string, unknown>>;
  }
}

const MAX_BUFFER = 25;

/**
 * Contexto adicional anexado a todo erro reportado (ex.: ramo da triagem
 * PF × PJ). Chaves neutras — nunca dados pessoais.
 */
let errorContext: Record<string, unknown> = {};

export const setErrorContext = (partial: Record<string, unknown>) => {
  errorContext = { ...errorContext, ...partial };
  if (typeof window !== "undefined") {
    (window as unknown as { __APP_ERROR_CONTEXT__?: Record<string, unknown> }).__APP_ERROR_CONTEXT__ = errorContext;
  }
};

export const getErrorContext = () => ({ ...errorContext });

const push = (entry: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  window.__APP_ERRORS__ = window.__APP_ERRORS__ || [];
  window.__APP_ERRORS__.push(entry);
  if (window.__APP_ERRORS__.length > MAX_BUFFER) window.__APP_ERRORS__.shift();
};

const report = (kind: string, payload: Record<string, unknown>) => {
  const entry = {
    kind,
    version: APP_VERSION,
    build_time: APP_BUILD_TIME,
    url: typeof location !== "undefined" ? location.href : "",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    ts: Date.now(),
    ...errorContext,
    ...payload,
  };
  push(entry);

  try {
    // eslint-disable-next-line no-console
    console.error(`[app:error:${kind}]`, entry);
  } catch { /* noop */ }
  try {
    window.dispatchEvent(new CustomEvent("app:error", { detail: entry }));
  } catch { /* noop */ }
  try {
    void import("@/lib/observability").then(({ capturarErro }) => capturarErro(kind, entry));
  } catch { /* noop */ }
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "app_error", {
        error_kind: kind,
        error_message: String(payload.message || "").slice(0, 250),
        app_version: APP_VERSION,
        non_interaction: true,
      });
    }
  } catch { /* noop */ }
};

export const initErrorReporter = () => {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __errReporterInit?: boolean }).__errReporterInit) return;
  (window as unknown as { __errReporterInit?: boolean }).__errReporterInit = true;

  window.__APP_VERSION__ = APP_VERSION;
  window.__APP_BUILD_TIME__ = APP_BUILD_TIME;

  window.addEventListener("error", (e: ErrorEvent) => {
    report("window.error", {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      stack: e.error?.stack,
    });
  });
  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const reason = e.reason as { message?: string; stack?: string } | string | undefined;
    report("unhandledrejection", {
      message: typeof reason === "string" ? reason : reason?.message,
      stack: typeof reason === "object" ? reason?.stack : undefined,
    });
  });

  try {
    // eslint-disable-next-line no-console
    console.info(`[app] version=${APP_VERSION} build=${APP_BUILD_TIME}`);
  } catch { /* noop */ }
};

export const APP_BUILD_INFO = { version: APP_VERSION, buildTime: APP_BUILD_TIME };
