// ported from src/main.tsx (pré-migração TanStack Start).
// Roda uma única vez no cliente, após a hidratação — nunca no SSR.

let started = false;

export function runClientInit() {
  if (started || typeof window === "undefined") return;
  started = true;

  void import("@/lib/errorReporter").then(({ initErrorReporter, APP_BUILD_INFO }) => {
    initErrorReporter();

    // Sinaliza hidratação + versão do build (o meta vem do head() da rota raiz).
    try {
      document.documentElement.dataset.hydrated = "1";
      const meta = document.querySelector('meta[name="app-version"]');
      if (meta) meta.setAttribute("content", `${APP_BUILD_INFO.version} @ ${APP_BUILD_INFO.buildTime}`);
      // Cache-bust automático: 1 reload se a versão mudou nesta sessão (sem loop).
      try {
        const KEY = "__app_version__";
        const last = sessionStorage.getItem(KEY);
        if (last && last !== APP_BUILD_INFO.version) {
          sessionStorage.setItem(KEY, APP_BUILD_INFO.version);
          if (!sessionStorage.getItem("__app_version_reloaded__")) {
            sessionStorage.setItem("__app_version_reloaded__", "1");
            location.reload();
          }
        } else if (!last) {
          sessionStorage.setItem(KEY, APP_BUILD_INFO.version);
        } else {
          sessionStorage.removeItem("__app_version_reloaded__");
        }
      } catch { /* noop */ }
    } catch { /* noop */ }
  });

  void import("@/lib/ctaRuntimeGuard").then(({ installCtaRuntimeGuard }) => installCtaRuntimeGuard());
  // Observabilidade (Sentry/OTLP) — só ativa quando as envs estão configuradas.
  void import("@/lib/observability").then(({ iniciarObservabilidade }) => iniciarObservabilidade());
  // RODADA 1 — trava de indexação + analytics só da propriedade própria.
  void import("@/lib/indexingPolicy").then(({ applyIndexingPolicy }) => applyIndexingPolicy());
  void import("@/lib/analytics").then(({ initGoogleTags }) => initGoogleTags());

  // Tema único (claro): remove qualquer `dark` herdado e força color-scheme light.
  try {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    localStorage.removeItem("theme");
  } catch { /* noop */ }

  // Recarrega 1x quando um chunk antigo (deploy novo) falha em ser baixado.
  const RELOAD_KEY = "__chunk_reloaded__";
  const isChunkLoadError = (msg: string) =>
    /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk \d+ failed/i.test(
      msg || "",
    );
  const handleChunkError = (msg: string) => {
    if (!isChunkLoadError(msg)) return;
    try {
      if (sessionStorage.getItem(RELOAD_KEY)) return;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };
  window.addEventListener("error", (e) => handleChunkError(e?.message || ""));
  window.addEventListener("unhandledrejection", (e) =>
    handleChunkError((e?.reason && (e.reason.message || String(e.reason))) || ""),
  );
  window.addEventListener("load", () => {
    try { sessionStorage.removeItem(RELOAD_KEY); } catch { /* noop */ }
  });
  window.addEventListener("vite:preloadError", (e: Event) => {
    e.preventDefault?.();
    handleChunkError("Failed to fetch dynamically imported module");
  });

  const runWhenIdle = (fn: () => void) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(fn, { timeout: 3000 });
    } else {
      window.setTimeout(fn, 1200);
    }
  };

  runWhenIdle(() => {
    void import("@/lib/whatsappUtm").then(({ initWhatsAppUtm }) => initWhatsAppUtm());
    void import("@/lib/webVitals").then(({ initWebVitals }) => initWebVitals());
  });
}
