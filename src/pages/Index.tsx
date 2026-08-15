import { lazy, Suspense, useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { FastHeader } from "@/components/FastHeader";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroTriagem } from "@/components/home/HeroTriagem";
import { ContextosBento } from "@/components/home/ContextosBento";
import { FaixaFotografica } from "@/components/home/FaixaFotografica";


import { TrustStrip } from "@/components/TrustStrip";

import { LazyOnVisible } from "@/components/LazyOnVisible";
import { SkeletonSection } from "@/components/SkeletonSection";
import { siteConfig } from "@/lib/siteConfig";

const HomeSections = lazy(() =>
  import("@/components/home/HomeSections").then((m) => ({ default: m.HomeSections })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

// ONDA 4T/5J — placeholder de carregamento com shimmer (nunca espaço em branco).
const SectionFallback = ({ height = "480px" }: { height?: string }) => (
  <SkeletonSection height={height} />
);

const Index = () => {
  // Metadados da home agora saem no HTML do SSR (PageSEO em JSX), não em efeito.
  useEffect(() => {
    // ONDA 5M — pré-carrega os chunks abaixo da dobra em tempo ocioso.
    // Sem isso, o bloco lazy só baixa quando já está visível e a troca
    // esqueleto → conteúdo real acontece na tela (CLS alto e intermitente).
    const prefetch = () => {
      void import("@/components/home/HomeSections");
      void import("@/components/Footer");
    };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const idleId = ric ? ric(prefetch) : window.setTimeout(prefetch, 1200);

    const id = window.setTimeout(() => {
      import("@/lib/analytics").then(({ trackPageView }) => trackPageView("/", "Home"));
    }, 1800);
    return () => {
      window.clearTimeout(id);
      const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (ric && cic) cic(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={siteConfig.homeTitle} description={siteConfig.homeDescription} path="/" />
      <JsonLdSchema />
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-space)]" />
      <main>
        <HeroTriagem />
        <TrustStrip />
        <ContextosBento />
        <FaixaFotografica />




        <LazyOnVisible
          minHeight="900px"
          rootMargin="900px 0px"
          placeholder={<SectionFallback height="900px" />}
        >
          <Suspense fallback={<SectionFallback height="900px" />}>
            <HomeSections />
          </Suspense>
        </LazyOnVisible>
      </main>

      <LazyOnVisible
        minHeight="400px"
        rootMargin="600px 0px"
        placeholder={<SectionFallback height="400px" />}
      >
        <Suspense fallback={<SectionFallback height="400px" />}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default Index;
