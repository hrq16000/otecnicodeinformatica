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
import { WhatsAppChatbot } from "@/components/WhatsAppChatbot";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { FAQSection } from "@/components/FAQSection";
import { CitiesSection } from "@/components/CitiesSection";
import { trackPageView } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Curitiba e Região | Atendimento a Domicílio Hoje";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Técnico de informática em Curitiba, São José dos Pinhais, Araucária e região. Formatação, conserto de PC e notebook, remoção de vírus. Atendimento a domicílio no mesmo dia. WhatsApp (41) 99745-2053."
      );
    }
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
        <CitiesSection />
        <NeighborhoodsSection />
        <FAQSection />
        <TestimonialsSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppChatbot />
    </div>
  );
};

export default Index;
