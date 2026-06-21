import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { ScrollToTop } from "@/components/ScrollToTop";
import { captureUtmsFromUrl } from "@/lib/utmCapture";

const LegacyApp = lazy(() => import("./LegacyApp"));
const WhatsAppFunnel = lazy(() => import("@/components/WhatsAppFunnel").then((m) => ({ default: m.WhatsAppFunnel })));
const WhatsAppChatbot = lazy(() => import("@/components/WhatsAppChatbot").then((m) => ({ default: m.WhatsAppChatbot })));
const SocialProofProvider = lazy(() => import("@/components/social-proof").then((m) => ({ default: m.SocialProofProvider })));

const PageLoader = () => (
  <div className="min-h-[40vh] bg-background flex items-center justify-center px-4 py-12" role="status" aria-label="Carregando">
    <img
      src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
      alt="Técnico Curitiba"
      width="304"
      height="98"
      decoding="sync"
      fetchPriority="high"
      className="h-12 w-auto object-scale-down motion-safe:animate-pulse sm:h-14"
      style={{ animationDuration: "1s" }}
    />
  </div>
);

const AppInit = () => {
  useEffect(() => { captureUtmsFromUrl(); }, []);
  return null;
};

const IdleEnhancements = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const activate = () => setEnabled(true);
    const id = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(activate, { timeout: 6500 })
      : window.setTimeout(activate, 4500);
    return () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <WhatsAppChatbot />
      <SocialProofProvider />
    </Suspense>
  );
};

const HomeApp = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppInit />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="*" element={<LegacyApp />} />
      </Routes>
    </Suspense>
    <Suspense fallback={null}>
      <WhatsAppFunnel />
    </Suspense>
    <IdleEnhancements />
  </BrowserRouter>
);

export default HomeApp;