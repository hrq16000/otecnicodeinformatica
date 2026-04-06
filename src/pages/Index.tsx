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
import { HomePricingBlock } from "@/components/HomePricingBlock";
import { HomeDiagnosticoBlock } from "@/components/HomeDiagnosticoBlock";
import { HomeEquipamentosBlock } from "@/components/HomeEquipamentosBlock";
import { HomeParaQuemBlock } from "@/components/HomeParaQuemBlock";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";

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

        {/* Como Funciona - Resumo */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                Como Funciona Nosso Atendimento
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Atendimento técnico simples, rápido e transparente em 3 passos
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3">1</div>
                  <h3 className="font-bold text-primary mb-2">Chame no WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Descreva o problema e receba orientação imediata do técnico</p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3">2</div>
                  <h3 className="font-bold text-primary mb-2">Diagnóstico e Orçamento</h3>
                  <p className="text-sm text-muted-foreground">Avaliação profissional com orçamento transparente antes da execução</p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto mb-3">3</div>
                  <h3 className="font-bold text-primary mb-2">Execução com Garantia</h3>
                  <p className="text-sm text-muted-foreground">Serviço realizado com aprovação e garantia por escrito</p>
                </div>
              </div>
              <a href="/como-funciona" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Entender Como Funciona
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </section>

        <HomePricingBlock />
        <HomeDiagnosticoBlock />
        <HomeEquipamentosBlock />
        <HomeParaQuemBlock />
        <InterlinkingBlock />

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
