import { lazy, Suspense, useEffect, useState } from "react";
import { FastHeader } from "@/components/FastHeader";
import { FastHeroSection } from "@/components/FastHeroSection";
import { TopOfferBanner } from "@/components/TopOfferBanner";
import { LazyOnVisible } from "@/components/LazyOnVisible";

const HomeDeferredSections = lazy(() => import("@/components/HomeDeferredSections"));
const PricingBanner = lazy(() => import("@/components/PricingBanner").then((m) => ({ default: m.PricingBanner })));
const TechnicianAvailability = lazy(() => import("@/components/TechnicianAvailability").then((m) => ({ default: m.TechnicianAvailability })));

// Skeleton placeholder to reserve space and avoid layout shifts during load
const SectionFallback = ({ height = "400px" }: { height?: string }) => (
  <div style={{ minHeight: height }} className="w-full" aria-hidden="true" />
);

const Index = () => {
  const [showNearFold, setShowNearFold] = useState(false);

  useEffect(() => {
    document.title = "Técnico de Informática Curitiba | Hoje R$ 99,99";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática em Curitiba hoje. Conserto de PC/notebook, formatação, vírus e SSD a partir de R$ 99,99. Chame no WhatsApp."
      );
    }
    const id = window.setTimeout(() => {
      import("@/lib/analytics").then(({ trackPageView }) => trackPageView("/", "Home"));
    }, 1800);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const show = () => setShowNearFold(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 1600 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(show, 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FastHeader />
      <TopOfferBanner />
      <main>
        <FastHeroSection />

        {showNearFold ? (
          <section className="py-6 bg-background">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Suspense fallback={<SectionFallback height="160px" />}>
                    <TechnicianAvailability />
                    <div className="flex items-center">
                      <PricingBanner />
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <LazyOnVisible minHeight="900px" rootMargin="-320px 0px">
          <Suspense fallback={<SectionFallback height="900px" />}>
            <HomeDeferredSections />
          </Suspense>
        </LazyOnVisible>
      </main>
    </div>
  );
};

export default Index;
