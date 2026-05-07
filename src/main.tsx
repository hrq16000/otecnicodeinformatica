import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "./lib/webVitals";
import { initWhatsAppUtm } from "./lib/whatsappUtm";

createRoot(document.getElementById("root")!).render(<App />);

initWhatsAppUtm();

// Measure LCP, CLS, INP, FCP, TTFB after hydration
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => initWebVitals());
  } else {
    setTimeout(initWebVitals, 1500);
  }
}
