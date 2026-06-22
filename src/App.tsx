import { lazy, Suspense, startTransition, useEffect, useState } from "react";
import Index from "./pages/Index";
import { RouteLoader } from "./components/RouteLoader";

const LegacyApp = lazy(() => import("./LegacyApp"));

const warmRoute = (pathname = "") => {
  import("./LegacyApp");
  if (pathname === "/servicos") import("./pages/Servicos");
  else if (pathname === "/como-funciona") import("./pages/ComoFunciona");
  else if (pathname === "/tecnico-informatica-curitiba") import("./pages/TecnicoInformaticaCuritiba");
  else if (pathname === "/blog") import("./pages/Blog");
  else if (pathname === "/diagnostico-60s") import("./pages/Diagnostico60s");
  else if (pathname === "/termos-e-condicoes") import("./pages/TermosCondicoes");
};

const AppInit = () => {
  useEffect(() => {
    import("@/lib/utmCapture").then(({ captureUtmsFromUrl }) => captureUtmsFromUrl());
  }, []);
  return null;
};

const isHomeRoute = (pathname?: string) => {
  const path = (pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname)).replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index";
};

const InstantNavigation = ({ setRoutePath }: { setRoutePath: (path: string) => void }) => {
  useEffect(() => {
    warmRoute(window.location.pathname);

    const getInternalUrl = (target: EventTarget | null) => {
      const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return null;
      const url = new URL(anchor.href, window.location.href);
      return url.origin === window.location.origin ? url : null;
    };

    const prefetch = (event: Event) => {
      const url = getInternalUrl(event.target);
      if (url) warmRoute(url.pathname);
    };

    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = getInternalUrl(event.target);
      if (!url || (url.pathname === window.location.pathname && url.search === window.location.search && url.hash)) return;

      event.preventDefault();
      warmRoute(url.pathname);
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      startTransition(() => setRoutePath(url.pathname));
    };

    const pop = () => startTransition(() => setRoutePath(window.location.pathname));

    document.addEventListener("pointerover", prefetch, true);
    document.addEventListener("focusin", prefetch, true);
    document.addEventListener("touchstart", prefetch, true);
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop);
    return () => {
      document.removeEventListener("pointerover", prefetch, true);
      document.removeEventListener("focusin", prefetch, true);
      document.removeEventListener("touchstart", prefetch, true);
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop);
    };
  }, [setRoutePath]);
  return null;
};

const HomeApp = () => {
  const [routePath, setRoutePath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  return (
    <>
      <AppInit />
      <InstantNavigation setRoutePath={setRoutePath} />
      {isHomeRoute(routePath) ? (
        <Index />
      ) : (
        <Suspense fallback={<RouteLoader />}>
          <LegacyApp />
        </Suspense>
      )}
    </>
  );
};

export default HomeApp;
