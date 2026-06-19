import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "./lib/webVitals";
import { initWhatsAppUtm } from "./lib/whatsappUtm";

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
// Vite emite este evento específico para falhas de preload de chunks após novo deploy
window.addEventListener("vite:preloadError", (e: Event) => {
  e.preventDefault?.();
  handleChunkError("Failed to fetch dynamically imported module");
});

createRoot(document.getElementById("root")!).render(<App />);

initWhatsAppUtm();
initWebVitals();
