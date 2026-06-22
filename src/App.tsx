import { lazy, Suspense, startTransition, useEffect, useRef, useState } from "react";
import Index from "./pages/Index";
import { RouteLoader } from "./components/RouteLoader";

const LegacyApp = lazy(() => import("./LegacyApp"));

const routeCache = new Map<string, Promise<unknown>>();

const warmRoute = (pathname = "") => {
  if (routeCache.has(pathname)) return routeCache.get(pathname)!;

  const routeImport =
    pathname === "/servicos" ? import("./pages/Servicos")
    : pathname === "/como-funciona" ? import("./pages/ComoFunciona")
    : pathname === "/tecnico-informatica-curitiba" ? import("./pages/TecnicoInformaticaCuritiba")
    : pathname === "/blog" ? import("./pages/Blog")
    : pathname === "/diagnostico-60s" ? import("./pages/Diagnostico60s")
    : pathname === "/termos-e-condicoes" ? import("./pages/TermosCondicoes")
    : Promise.resolve();

  const promise = Promise.all([import("./LegacyApp"), routeImport]).catch(() => undefined);
  routeCache.set(pathname, promise);
  return promise;
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

const InstantNavigation = ({
  setRoutePath,
  setShowNavLoader,
}: {
  setRoutePath: (path: string) => void;
  setShowNavLoader: (show: boolean) => void;
}) => {
  const navId = useRef(0);

  useEffect(() => {
    warmRoute(window.location.pathname);
    const preloadCommon = window.setTimeout(() => {
      ["/servicos", "/como-funciona", "/tecnico-informatica-curitiba", "/blog"].forEach(warmRoute);
    }, 250);

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
      const currentNav = ++navId.current;
      const loaderTimer = window.setTimeout(() => setShowNavLoader(true), 90);

      const go = () => {
        window.history.pushState({}, "", url);
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        startTransition(() => setRoutePath(url.pathname));
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (navId.current === currentNav) setShowNavLoader(false);
          });
        });
      };

      warmRoute(url.pathname).then(go).finally(() => window.clearTimeout(loaderTimer));
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
      window.clearTimeout(preloadCommon);
    };
  }, [setRoutePath, setShowNavLoader]);
  return null;
};

const NavigationOverlay = () => (
  <div className="fixed inset-0 z-[var(--z-page-wipe)] animate-in fade-in duration-150">
    <RouteLoader />
  </div>
);

const HomeApp = () => {
  const [routePath, setRoutePath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );
  const [showNavLoader, setShowNavLoader] = useState(false);

  return (
    <>
      <AppInit />
      <InstantNavigation setRoutePath={setRoutePath} setShowNavLoader={setShowNavLoader} />
      {showNavLoader ? <NavigationOverlay /> : null}
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
