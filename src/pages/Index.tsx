import { lazy, Suspense, useEffect } from "react";
import { upsertCanonical } from "@/lib/canonicalUrl";
import { FastHeader } from "@/components/FastHeader";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroTriagem } from "@/components/home/HeroTriagem";
import { ContextosBento } from "@/components/home/ContextosBento";
import { FaixaFotografica } from "@/components/home/FaixaFotografica";


import { TrustStrip } from "@/components/TrustStrip";

import { LazyOnVisible } from "@/components/LazyOnVisible";
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
  useEffect(() => {
    document.title = siteConfig.homeTitle;
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", siteConfig.homeDescription);
    upsertCanonical(`${siteConfig.baseUrl}/`);
    setMeta('meta[property="og:url"]', "content", `${siteConfig.baseUrl}/`);
    setMeta('meta[property="og:title"]', "content", siteConfig.homeTitle);
    setMeta('meta[property="og:description"]', "content", siteConfig.homeDescription);

    const id = window.setTimeout(() => {
      import("@/lib/analytics").then(({ trackPageView }) => trackPageView("/", "Home"));
    }, 1800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-height)]" />
      <main>
        <HeroTriagem />
        <TrustStrip />
        <ContextosBento />
        <FaixaFotografica />




        <LazyOnVisible minHeight="900px" rootMargin="-200px 0px">
          <Suspense fallback={<SectionFallback height="900px" />}>
            <HomeSections />
          </Suspense>
        </LazyOnVisible>
      </main>

      <LazyOnVisible minHeight="400px" rootMargin="-100px 0px">
        <Suspense fallback={<SectionFallback height="400px" />}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default Index;
