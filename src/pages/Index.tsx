import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PainSection } from "@/components/PainSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { NeighborhoodsSection } from "@/components/NeighborhoodsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { FAQSection } from "@/components/FAQSection";
import { CitiesSection } from "@/components/CitiesSection";
import { TopSearchedServicesSection } from "@/components/TopSearchedServicesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { CoverageMapSection } from "@/components/CoverageMapSection";
import { TechnicianAvailability } from "@/components/TechnicianAvailability";
import { SchedulingSection } from "@/components/scheduling";
import { TrustBadges, SecurityBadge } from "@/components/social-proof";
import { SocialProofAdminPanel } from "@/components/social-proof/AdminPanel";
import { trackPageView } from "@/lib/analytics";
import { HomePricingBlock } from "@/components/HomePricingBlock";
import { HomeDiagnosticoBlock } from "@/components/HomeDiagnosticoBlock";
import { HomeEquipamentosBlock } from "@/components/HomeEquipamentosBlock";
import { HomeParaQuemBlock } from "@/components/HomeParaQuemBlock";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { ProblemasDestaque } from "@/components/ProblemasDestaque";
import { TechBrandsMarquee } from "@/components/TechBrandsMarquee";
import { GeolocationTrigger } from "@/components/GeolocationTrigger";

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
      <PageSEO title="Técnico de Informática em Curitiba | Assistência Técnica Nº1 da Região | Atendimento Hoje" description="A assistência técnica em informática mais bem avaliada de Curitiba e região. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio no mesmo dia. ⭐ 4.9/5 - 347+ avaliações. WhatsApp (41) 99745-2053." path="/" />
      <JsonLdSchema />
      <Header />
      <main>
        <HeroSection />

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

        <TechBrandsMarquee />
        <PainSection />
        <SchedulingSection />
        <ServicesSection />
        <TopSearchedServicesSection />
        <CoverageMapSection />
        <CitiesSection />
        <NeighborhoodsSection />
        <SocialProofSection />

        <section className="py-14 md:py-18 bg-muted relative overflow-hidden section-divider mesh-gradient-warm noise-overlay">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] morph-blob pointer-events-none blur-[100px]" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 tracking-tight reveal-text">
                Como Funciona Nosso <span className="gradient-text">Atendimento</span>
              </h2>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
                Atendimento técnico simples, rápido e transparente em 3 passos
              </p>
              <div className="glow-separator max-w-xs mx-auto mb-8" />
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {[
                  { step: "1", title: "Chame no WhatsApp", desc: "Descreva o problema e receba orientação imediata do técnico" },
                  { step: "2", title: "Diagnóstico e Orçamento", desc: "Avaliação profissional com orçamento transparente antes da execução" },
                  { step: "3", title: "Execução com Garantia", desc: "Serviço realizado com aprovação e garantia por escrito" },
                ].map((item, i) => (
                  <div key={i} className="glass-card gradient-border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover-streak animated-border slide-up-stagger group" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)] transition-all duration-300">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* Connecting line between steps (desktop only) */}
              <a href="/como-funciona" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm btn-feedback elastic-click hover-streak hover:shadow-[var(--shadow-lg)]">
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
        <ProblemasDestaque />
        <InterlinkingBlock />
        <FAQSection />
        <TrustSection />
        <CTASection />

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
      <SocialProofAdminPanel />
    </div>
  );
};

export default Index;
