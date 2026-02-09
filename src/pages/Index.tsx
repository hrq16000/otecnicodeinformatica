import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PainSection } from "@/components/PainSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { NeighborhoodsSection } from "@/components/NeighborhoodsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppChatbot } from "@/components/WhatsAppChatbot";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { FAQSection } from "@/components/FAQSection";
import { CitiesSection } from "@/components/CitiesSection";
import { TopSearchedServicesSection } from "@/components/TopSearchedServicesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { CoverageMapSection } from "@/components/CoverageMapSection";
import { TechnicianAvailability } from "@/components/TechnicianAvailability";
import { SchedulingSection } from "@/components/scheduling";
import { SocialProofProvider, TrustBadges, SecurityBadge } from "@/components/social-proof";
import { SocialProofAdminPanel } from "@/components/social-proof/AdminPanel";
import { trackPageView } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Curitiba | Assistência Técnica Nº1 da Região | Atendimento Hoje";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "A assistência técnica em informática mais bem avaliada de Curitiba e região. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio no mesmo dia. ⭐ 4.9/5 - 347+ avaliações. WhatsApp (41) 99745-2053."
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
        {/* Availability + Pricing */}
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
        <PainSection />
        <SchedulingSection />
        <ServicesSection />
        <TopSearchedServicesSection />
        <CoverageMapSection />
        <CitiesSection />
        <NeighborhoodsSection />
        <SocialProofSection />
        <FAQSection />
        <TrustSection />
        <CTASection />
        {/* Trust Badges Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <SecurityBadge />
            </div>
            <TrustBadges variant="card" />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppChatbot />
      
      {/* Social Proof System */}
      <SocialProofProvider />
      <SocialProofAdminPanel />
    </div>
  );
};

export default Index;
