import { lazy, Suspense } from "react";
import { BrowserRouter, useInRouterContext } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LazyOnVisible } from "@/components/LazyOnVisible";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const PainSection = lazy(() => import("@/components/PainSection").then(m => ({ default: m.PainSection })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const TrustSection = lazy(() => import("@/components/TrustSection").then(m => ({ default: m.TrustSection })));
const NeighborhoodsSection = lazy(() => import("@/components/NeighborhoodsSection").then(m => ({ default: m.NeighborhoodsSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const CitiesSection = lazy(() => import("@/components/CitiesSection").then(m => ({ default: m.CitiesSection })));
const TopSearchedServicesSection = lazy(() => import("@/components/TopSearchedServicesSection").then(m => ({ default: m.TopSearchedServicesSection })));
const SocialProofSection = lazy(() => import("@/components/SocialProofSection").then(m => ({ default: m.SocialProofSection })));
const CoverageMapSection = lazy(() => import("@/components/CoverageMapSection").then(m => ({ default: m.CoverageMapSection })));
const SchedulingSection = lazy(() => import("@/components/scheduling").then(m => ({ default: m.SchedulingSection })));
const TrustBadges = lazy(() => import("@/components/social-proof").then(m => ({ default: m.TrustBadges })));
const SecurityBadge = lazy(() => import("@/components/social-proof").then(m => ({ default: m.SecurityBadge })));
const SocialProofAdminPanel = lazy(() => import("@/components/social-proof/AdminPanel").then(m => ({ default: m.SocialProofAdminPanel })));
const HomePricingBlock = lazy(() => import("@/components/HomePricingBlock").then(m => ({ default: m.HomePricingBlock })));
const HomeDiagnosticoBlock = lazy(() => import("@/components/HomeDiagnosticoBlock").then(m => ({ default: m.HomeDiagnosticoBlock })));
const HomeEquipamentosBlock = lazy(() => import("@/components/HomeEquipamentosBlock").then(m => ({ default: m.HomeEquipamentosBlock })));
const HomeParaQuemBlock = lazy(() => import("@/components/HomeParaQuemBlock").then(m => ({ default: m.HomeParaQuemBlock })));
const InterlinkingBlock = lazy(() => import("@/components/InterlinkingBlock").then(m => ({ default: m.InterlinkingBlock })));
const ProblemasDestaque = lazy(() => import("@/components/ProblemasDestaque").then(m => ({ default: m.ProblemasDestaque })));
const TechBrandsMarquee = lazy(() => import("@/components/TechBrandsMarquee").then(m => ({ default: m.TechBrandsMarquee })));
const GeolocationTrigger = lazy(() => import("@/components/GeolocationTrigger").then(m => ({ default: m.GeolocationTrigger })));

const SectionFallback = ({ height = "400px" }: { height?: string }) => (
  <div style={{ minHeight: height }} className="w-full" aria-hidden="true" />
);

const DeferredContent = () => (
  <>
    <PageSEO title="Técnico de Informática Curitiba | Hoje R$ 99,99" description="Técnico de informática em Curitiba hoje. Conserto de PC/notebook, formatação, vírus e SSD a partir de R$ 99,99. Chame no WhatsApp." path="/" />
    <JsonLdSchema />

    <LazyOnVisible minHeight="120px" rootMargin="-240px 0px"><Suspense fallback={<SectionFallback height="120px" />}><TechBrandsMarquee /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><PainSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><SchedulingSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><ServicesSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><TopSearchedServicesSection /></Suspense></LazyOnVisible>
    <LazyOnVisible minHeight="1px" rootMargin="-240px 0px"><Suspense fallback={null}><GeolocationTrigger /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><CoverageMapSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><CitiesSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><NeighborhoodsSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><SocialProofSection /></Suspense></LazyOnVisible>

    <section className="py-14 md:py-18 bg-muted relative overflow-hidden section-divider mesh-gradient-warm noise-overlay" aria-labelledby="como-funciona-home">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.04] morph-blob pointer-events-none blur-[100px]" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 id="como-funciona-home" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 tracking-tight reveal-text">Como Funciona Nosso <span className="gradient-text">Atendimento</span></h2>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">Sem ansiedade e sem surpresa: você só aprova o serviço depois de saber o que vai ser feito e quanto custa.</p>
          <div className="glow-separator max-w-xs mx-auto mb-8" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 text-left">
            {[
              { step: "1", title: "Chame no WhatsApp", desc: "Mande uma mensagem descrevendo o problema. Falamos direto com o técnico, sem call center." },
              { step: "2", title: "Diagnóstico e orientação", desc: "Recebe orientação inicial e, quando aplicável, diagnóstico explicado por foto, vídeo ou no local." },
              { step: "3", title: "Aprovação do atendimento", desc: "Você recebe o orçamento fechado por escrito. Só seguimos depois da sua aprovação." },
              { step: "4", title: "Serviço executado", desc: "Reparo realizado por técnico identificado, com cuidado no equipamento e seus dados." },
            ].map((item, i) => (
              <li key={i} className="glass-card gradient-border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover-streak animated-border slide-up-stagger group" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-base mb-3 shadow-sm group-hover:scale-110 transition-all duration-300">{item.step}</div>
                <h3 className="font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-200">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
          <a href="/como-funciona" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm btn-feedback elastic-click hover-streak hover:shadow-[var(--shadow-lg)]">Entender Como Funciona <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
        </div>
      </div>
    </section>


    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><HomePricingBlock /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><HomeDiagnosticoBlock /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><HomeEquipamentosBlock /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><HomeParaQuemBlock /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><ProblemasDestaque /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><InterlinkingBlock /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><FAQSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><TrustSection /></Suspense></LazyOnVisible>
    <LazyOnVisible rootMargin="-240px 0px"><Suspense fallback={<SectionFallback />}><CTASection /></Suspense></LazyOnVisible>

    <LazyOnVisible minHeight="200px" rootMargin="-240px 0px">
      <section className="py-8 bg-muted/30"><div className="container mx-auto"><div className="text-center mb-6"><Suspense fallback={null}><SecurityBadge /></Suspense></div><Suspense fallback={<SectionFallback height="100px" />}><TrustBadges variant="card" /></Suspense></div></section>
    </LazyOnVisible>
    <LazyOnVisible minHeight="280px"><Suspense fallback={<SectionFallback height="280px" />}><Footer /></Suspense></LazyOnVisible>
    <LazyOnVisible minHeight="1px" rootMargin="0px"><Suspense fallback={null}><SocialProofAdminPanel /></Suspense></LazyOnVisible>
  </>
);

export const HomeDeferredSections = () => {
  const inRouter = useInRouterContext();
  return inRouter ? <DeferredContent /> : <BrowserRouter><DeferredContent /></BrowserRouter>;
};

export default HomeDeferredSections;