import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PainSection } from "@/components/PainSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { NeighborhoodsSection } from "@/components/NeighborhoodsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { trackPageView } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Curitiba – Atendimento Rápido e Profissional | Técnico Curitiba";
    trackPageView("/", "Home");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        <HeroSection />
        {/* Pricing Banner */}
        <section className="py-4 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <PricingBanner />
            </div>
          </div>
        </section>
        <PainSection />
        <ServicesSection />
        <NeighborhoodsSection />
        <TestimonialsSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Index;
