import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";

const LegacyApp = lazy(() => import("./LegacyApp"));

const PageLoader = () => (
  <div className="min-h-[40vh] bg-background flex items-center justify-center px-4 py-12" role="status" aria-label="Carregando">
    <img
      src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
      alt="Técnico Curitiba"
      width="304"
      height="98"
      decoding="sync"
      className="h-12 w-auto object-scale-down motion-safe:animate-pulse sm:h-14"
      style={{ animationDuration: "1s" }}
    />
  </div>
);

const AppInit = () => {
  useEffect(() => {
    import("@/lib/utmCapture").then(({ captureUtmsFromUrl }) => captureUtmsFromUrl());
  }, []);
  return null;
};

const isHomeRoute = () => {
  const path = typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index";
};

const HomeApp = () => (
  <>
    <AppInit />
    {isHomeRoute() ? (
      <Index />
    ) : (
      <Suspense fallback={<PageLoader />}>
        <LegacyApp />
      </Suspense>
    )}
  </>
);

export default HomeApp;