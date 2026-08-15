/// <reference types="vite/client" />
import { Suspense, useEffect, type ReactNode } from "react";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import appCss from "../styles.css?url";

import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { MotionProvider } from "@/components/MotionProvider";
import { GeoAutoDetect } from "@/components/GeoAutoDetect";
import { InstitutionalJsonLd } from "@/components/InstitutionalJsonLd";
import {
  JsonLdCollectorContext,
  JsonLdSsrSink,
  createJsonLdCollector,
} from "@/lib/jsonLdSsr";
import { PageViewTracker } from "@/components/PageViewTracker";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { RouteLoader } from "@/components/RouteLoader";
import { WhatsAppFunnel } from "@/components/WhatsAppFunnel";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollToTop } from "@/components/ScrollToTop";
import ConsentBanner from "@/components/ConsentBanner";
import {
  IdleEnhancements,
  LegacyNotFound,
  legacyNavigateRedirects,
} from "@/legacyRouteElements";
import { REDIRECT_MATRIX } from "@/lib/redirectMatrix";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { runClientInit } from "@/lib/clientInit";

// Google Consent Mode v2 — precisa rodar antes de qualquer ping (LGPD).
// Portado do <head> do index.html pré-migração.
const CONSENT_MODE_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var saved = localStorage.getItem('lgpd_consent_v1');
  if (saved === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch(e){}
gtag('js', new Date());
`.trim();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      // title/description/robots/og:title/og:description/twitter:* de página
      // são emitidos por <PageSEO> (SSR via React 19). Manter defaults aqui
      // duplicaria as tags no <head> e o crawler leria a versão genérica.
      { "http-equiv": "x-dns-prefetch-control", content: "on" },
      { name: "theme-color", content: "#0b2733" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      {
        name: "keywords",
        content:
          "técnico de informática curitiba, assistência técnica informática curitiba, conserto de computador curitiba, formatação curitiba, remover vírus curitiba, suporte técnico curitiba, técnico notebook curitiba, manutenção de computador curitiba, técnico de informática são josé dos pinhais, assistência técnica são josé dos pinhais, técnico de informática araucária, técnico de informática campo largo, técnico de informática pinhais, atendimento a domicílio informática, conserto pc domicílio curitiba",
      },
      { name: "google-adsense-account", content: "ca-pub-3762170279587706" },
      { name: "author", content: "O Técnico de Informática" },
      { name: "geo.region", content: "BR-PR" },
      { name: "geo.placename", content: "Curitiba" },
      { name: "geo.position", content: "-25.4284;-49.2733" },
      { name: "ICBM", content: "-25.4284, -49.2733" },
      { name: "app-version", content: "bootstrap" },
      { name: "format-detection", content: "telephone=no" },
      { name: "msapplication-TileColor", content: "#0b2733" },
      { name: "application-name", content: "O Técnico de Informática" },
      { property: "og:image:alt", content: "O Técnico de Informática" },
      { property: "og:image:type", content: "image/png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", as: "image", href: "/logo.webp", type: "image/webp", fetchPriority: "high" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/figtree-var.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/outfit-var.woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", sizes: "192x192", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json", crossOrigin: "use-credentials" },
    ],
    scripts: [
      { children: CONSENT_MODE_SCRIPT },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3762170279587706",
        async: true,
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: RootNotFound,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // ported from main.tsx — observabilidade, indexing policy, analytics, cache-bust
  useEffect(() => {
    runClientInit();
  }, []);

  // ported from App.tsx AppInit — UTMs + atribuição first-touch
  useEffect(() => {
    import("@/lib/utmCapture").then(({ captureUtmsFromUrl }) => captureUtmsFromUrl());
    import("@/lib/attribution").then(({ captureAttribution }) => captureAttribution());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorBoundary>
        <MotionProvider>
          <ScrollToTop />
          <GeoAutoDetect />
          <InstitutionalJsonLd />
          <PageViewTracker path={pathname} />
          <JsonLdCollectorContext.Provider value={jsonLdCollector}>
            <RouteTransition routeKey={pathname}>
              <Suspense fallback={<RouteLoader />}>
                <Outlet />
                {/* Sink renderizado após o Outlet: já enxerga os slots da rota. */}
                <JsonLdSsrSink />
              </Suspense>
            </RouteTransition>
          </JsonLdCollectorContext.Provider>
          <WhatsAppFunnel />
          <WhatsAppFloat />
          <ConsentBanner />
          <IdleEnhancements />
        </MotionProvider>
      </AppErrorBoundary>
    </QueryClientProvider>
  );
}

/**
 * 404 raiz: primeiro consulta a matriz única de redirects 301 (mesma fonte de
 * verdade do CDN e do gate check:index-health) e os aliases <Navigate> do
 * roteador antigo; só então renderiza o NotFound real.
 */
function RootNotFound() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const target =
    legacyNavigateRedirects[normalized] ??
    REDIRECT_MATRIX.find((r) => r.from === normalized)?.to;

  useEffect(() => {
    if (target) {
      router.navigate({ to: target, replace: true });
    }
  }, [target, router]);

  if (target) return null;
  return (
    <Suspense fallback={<RouteLoader />}>
      <LegacyNotFound />
    </Suspense>
  );
}

function RootErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <h1 className="text-2xl font-semibold">Esta página não carregou</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Algo deu errado ao carregar esta página. Tente novamente ou volte para a página inicial.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium"
        >
          Ir para a home
        </a>
      </div>
    </div>
  );
}
