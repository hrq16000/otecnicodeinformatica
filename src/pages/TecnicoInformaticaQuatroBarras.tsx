import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Home, Zap } from "lucide-react";

const benefits = [
  { icon: MapPin, title: "Atendimento em Quatro Barras", description: "Cobrimos toda a cidade. Técnico com conhecimento do acesso pela BR-116." },
  { icon: Clock, title: "Chegamos em 40-55 Minutos", description: "Acesso rápido pela BR-116 sentido Joinville. Agendamento no mesmo dia." },
  { icon: Shield, title: "Profissional Credenciado", description: "Mais de 20 anos de experiência. Identificado e equipado profissionalmente." },
  { icon: Wrench, title: "Serviço Garantido", description: "Orçamento antes da execução. Garantia por escrito em todos os serviços." },
];

const bairros = [
  { name: "Centro" }, { name: "Jardim Menino Deus" }, { name: "Vila São José" },
  { name: "Borda do Campo" }, { name: "São Lourenço" }, { name: "Vila Maria" },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers e configuração", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza completa e proteção", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo profissional", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Computador muito mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi, roteadores e internet", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção de dados e arquivos", slug: "backup-recuperacao" },
];

const localFaqs = [
  { question: "Vocês atendem Quatro Barras a domicílio?", answer: "Sim. Atendemos Quatro Barras com visita agendada. Deslocamento de 40 a 55 minutos pela BR-116." },
  { question: "Qual o valor da visita?", answer: "A visita técnica começa em R$ 69,99. Diagnóstico no local e orçamento antes de qualquer execução." },
  { question: "Fazem coleta e entrega?", answer: "Sim. Para serviços que exigem bancada, coletamos e devolvemos no seu endereço." },
];

const schema = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "name": "Técnico de Informática em Quatro Barras",
  "description": "Assistência técnica em Quatro Barras PR. Atendimento a domicílio.",
  "telephone": "+55-41-99745-2053",
  "areaServed": { "@type": "City", "name": "Quatro Barras", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaQuatroBarras = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Quatro Barras PR | Atendimento Domicílio | Técnico Curitiba";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Técnico de informática em Quatro Barras PR. Formatação, conserto, vírus, upgrade SSD. Atendimento a domicílio. A partir de A partir de R$ 69,99.");
    trackPageView("/tecnico-informatica-quatro-barras", "Técnico Quatro Barras");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Quatro Barras" }]} />
      <main>
        <PageHero title="Técnico de Informática em Quatro Barras" subtitle="Assistência técnica profissional em Quatro Barras. Atendimento a domicílio com diagnóstico transparente e garantia." ctaText="Falar com Técnico" />
        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Quatro Barras" subtitle="Atendimento profissional para toda a cidade" />

        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Assistência Técnica em Quatro Barras</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4"><strong className="text-foreground">Quatro Barras</strong> está na região nordeste da região metropolitana de Curitiba, com acesso rápido pela BR-116. Cidade com cerca de 25 mil habitantes e perfil residencial, tem demanda crescente por <strong className="text-foreground">serviços de informática de qualidade</strong>.</p>
              <p>Nosso técnico atende Quatro Barras com o mesmo padrão de qualidade de Curitiba: diagnóstico transparente, orçamento antes da execução e garantia por escrito. Para casos que exigem bancada, fazemos coleta e entrega.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-background rounded-lg p-4 text-center border border-border"><Home className="h-8 w-8 text-accent mx-auto mb-2" /><h3 className="font-semibold text-foreground">Residências</h3><p className="text-sm text-muted-foreground">Visita agendada</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border"><Building2 className="h-8 w-8 text-accent mx-auto mb-2" /><h3 className="font-semibold text-foreground">Empresas</h3><p className="text-sm text-muted-foreground">Suporte para negócios locais</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border"><Zap className="h-8 w-8 text-accent mx-auto mb-2" /><h3 className="font-semibold text-foreground">Coleta e Entrega</h3><p className="text-sm text-muted-foreground">Para serviços de bancada</p></div>
            </div>
          </div></div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Bairros e Regiões Atendidas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bairros.map((b) => (
                <div key={b.name} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />{b.name}
                </div>
              ))}
            </div>
          </div></div>
        </section>

        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">Serviços em Quatro Barras</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {servicos.map((s, i) => (
                <Link key={i} to={`/servicos/${s.slug}`} className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md border border-transparent hover:border-accent/30 transition-all group">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1"><h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{s.title}</h3><p className="text-sm text-muted-foreground mt-1">{s.description}</p></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors mt-1" />
                </Link>
              ))}
            </div>
          </div></div>
        </section>

        <ServiceLocalLinks currentCity="Quatro Barras" />
        <LocalFAQSection title="Perguntas Frequentes - Quatro Barras" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaQuatroBarras;
