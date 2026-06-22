import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import { RouteLoader } from "./components/RouteLoader";

const LegacyApp = lazy(() => import("./LegacyApp"));

const AppInit = () => {
  useEffect(() => {
    import("@/lib/utmCapture").then(({ captureUtmsFromUrl }) => captureUtmsFromUrl());
  }, []);
  return null;
};

const isHomeRoute = () => {
  const path =
    typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index";
};

// Pré-carrega o bundle do roteador em idle quando estamos na home,
// assim o primeiro clique para outra página NÃO espera o chunk baixar.
const PrefetchLegacy = () => {
  useEffect(() => {
    if (!isHomeRoute()) return;
    const prefetch = () => {
      import("./LegacyApp");
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(prefetch, { timeout: 2500 })
      : (window.setTimeout(prefetch, 1500) as unknown as number);
    return () => {
      const w2 = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (w2.cancelIdleCallback) w2.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
  return null;
};

const HomeApp = () => (
  <>
    <AppInit />
    {isHomeRoute() ? (
      <>
        <Index />
        <PrefetchLegacy />
      </>
    ) : (
      <Suspense fallback={<RouteLoader />}>
        <LegacyApp />
      </Suspense>
    )}
  </>
);

export default HomeApp;
