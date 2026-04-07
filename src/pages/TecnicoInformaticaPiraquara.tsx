import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Home, Zap } from "lucide-react";

const benefits = [
  { icon: MapPin, title: "Atendimento em Todo Piraquara", description: "Cobrimos do Centro ao Jardim Primavera. Técnico com conhecimento da região." },
  { icon: Clock, title: "Chegamos em 40-60 Minutos", description: "Acesso pela BR-116 e Estrada do Encanamento. Agendamento no mesmo dia quando possível." },
  { icon: Shield, title: "Técnico Credenciado", description: "Mais de 20 anos de experiência. Profissional identificado com equipamento profissional." },
  { icon: Wrench, title: "Garantia em Todo Serviço", description: "Diagnóstico transparente, orçamento antes da execução e garantia por escrito." },
];

const bairros = [
  { name: "Centro", hasPage: false }, { name: "Jardim Primavera", hasPage: false },
  { name: "Planta Deodoro", hasPage: false }, { name: "Vila Macedo", hasPage: false },
  { name: "Guarituba", hasPage: false }, { name: "Prado Velho", hasPage: false },
  { name: "São Cristóvão", hasPage: false }, { name: "Vila São Cristóvão", hasPage: false },
  { name: "Jardim Bela Vista", hasPage: false }, { name: "Caiuá", hasPage: false },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers e programas", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza completa e proteção instalada", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo profissional", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Computador até 10x mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi, roteadores e cabeamento", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção e recuperação de dados", slug: "backup-recuperacao" },
];

const localFaqs = [
  { question: "Vocês atendem Piraquara a domicílio?", answer: "Sim. Atendemos todos os bairros de Piraquara com visita agendada. O deslocamento leva de 40 a 60 minutos dependendo do bairro." },
  { question: "Qual o valor da visita técnica em Piraquara?", answer: "A visita técnica começa em R$ 69,99. Diagnóstico no local com orçamento antes da execução." },
  { question: "Fazem coleta e entrega?", answer: "Sim. Para serviços de bancada (reparo de placa, troca de tela), coletamos e devolvemos no seu endereço." },
  { question: "Atendem empresas em Piraquara?", answer: "Sim. Suporte para escritórios, comércios e pequenas empresas com manutenção de rede, backup e suporte contínuo." },
];

const schema = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "name": "Técnico de Informática em Piraquara",
  "description": "Assistência técnica de computadores em Piraquara PR. Atendimento a domicílio.",
  "telephone": "+55-41-99745-2053",
  "areaServed": { "@type": "City", "name": "Piraquara", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaPiraquara = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Piraquara PR | Atendimento Domicílio | Técnico Curitiba";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Técnico de informática em Piraquara PR. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de A partir de R$ 69,99.");
    trackPageView("/tecnico-informatica-piraquara", "Técnico Piraquara");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Técnico de Informática em Piraquara PR | Atendimento Domicílio | Técnico Curitiba" description="Técnico de informática em Piraquara PR. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de A partir de R$ 69,99." path="/tecnico-informatica-piraquara" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Piraquara" }]} />
      <main>
        <PageHero title="Técnico de Informática em Piraquara" subtitle="Assistência técnica profissional em Piraquara. Atendimento a domicílio com diagnóstico transparente e garantia." ctaText="Falar com Técnico" />
        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Piraquara" subtitle="Atendimento profissional para toda a cidade" />

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">Assistência Técnica em Piraquara</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4"><strong className="text-foreground">Piraquara</strong> é uma cidade de mais de 110 mil habitantes na região leste da região metropolitana de Curitiba. Com forte perfil residencial e crescimento constante, a demanda por <strong className="text-foreground">serviços de informática confiáveis</strong> é cada vez maior.</p>
              <p>Nosso técnico atende Piraquara a domicílio com equipamento profissional. Resolvemos problemas como computador lento, notebook que não liga, vírus, Wi-Fi instável e upgrades de hardware. Para serviços de bancada, oferecemos coleta e entrega.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Home className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Residências</h3><p className="text-sm text-muted-foreground">Atendimento com hora marcada</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Building2 className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Empresas</h3><p className="text-sm text-muted-foreground">Suporte para comércios e escritórios</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Zap className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Coleta e Entrega</h3><p className="text-sm text-muted-foreground">Para serviços de bancada</p></div>
            </div>
          </div></div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">Bairros Atendidos em Piraquara</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {bairros.map((b, i) => (
                <div key={b.name} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item hover:-translate-y-0.5 transition-all" style={{ animationDelay: `${i * 50}ms` }}>
                  <MapPin className="h-4 w-4 text-accent" />{b.name}
                </div>
              ))}
            </div>
          </div></div>
        </section>

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center reveal-text">Serviços em Piraquara</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {servicos.map((s, i) => (
                <Link key={i} to={`/servicos/${s.slug}`} className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md border border-transparent hover:border-accent/30 hover:-translate-y-1 transition-all group stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1"><h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{s.title}</h3><p className="text-sm text-muted-foreground mt-1">{s.description}</p></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                </Link>
              ))}
            </div>
          </div></div>
        </section>

        <ServiceLocalLinks currentCity="Piraquara" />
        <LocalFAQSection title="Perguntas Frequentes - Piraquara" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaPiraquara;
