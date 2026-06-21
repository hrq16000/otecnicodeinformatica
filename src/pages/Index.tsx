import { lazy, Suspense, useEffect } from "react";
import { FastHeader } from "@/components/FastHeader";
import { FastHeroSection } from "@/components/FastHeroSection";
import { PricingBanner } from "@/components/PricingBanner";
import { TopOfferBanner } from "@/components/TopOfferBanner";
import { LazyOnVisible } from "@/components/LazyOnVisible";
import { TechnicianAvailability } from "@/components/TechnicianAvailability";

const HomeDeferredSections = lazy(() => import("@/components/HomeDeferredSections"));

// Skeleton placeholder to reserve space and avoid layout shifts during load
const SectionFallback = ({ height = "400px" }: { height?: string }) => (
  <div style={{ minHeight: height }} className="w-full" aria-hidden="true" />
);

const Index = () => {
  useEffect(() => {
    document.title = "Técnico de Informática Curitiba | Atendimento Hoje R$ 99";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática a domicílio em Curitiba e RMC. Formatação, conserto de PC/notebook, remoção de vírus e upgrade SSD a partir de R$ 99,99. ⭐ 4.9/5."
      );
    }
    const id = window.setTimeout(() => {
      import("@/lib/analytics").then(({ trackPageView }) => trackPageView("/", "Home"));
    }, 1800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FastHeader />
      <TopOfferBanner />
      <main>
        <FastHeroSection />

        <section className="py-6 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <TechnicianAvailability />
                <div className="flex items-center">
                  <PricingBanner />
                </div>
              </div>
            </div>
          </div>
        </section>

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
