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
import { RealImageSection } from "@/components/RealImageSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Factory, Home } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em Toda Araucária",
    description: "Do Centro aos bairros industriais. Técnico próximo a você na região metropolitana de Curitiba.",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Agendamento para o mesmo dia ou próximo dia útil. Horários flexíveis para sua conveniência.",
  },
  {
    icon: Shield,
    title: "Técnico Confiável",
    description: "Profissional identificado com experiência comprovada. Atendimento seguro para casa e empresa.",
  },
  {
    icon: Wrench,
    title: "Serviço Completo",
    description: "Formatação, conserto de hardware, redes e suporte técnico. Resolvemos qualquer problema.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro-araucaria", hasPage: true },
  { name: "Capela Velha", slug: "capela-velha", hasPage: true },
  { name: "Thomaz Coelho", slug: "thomaz-coelho", hasPage: true },
  { name: "Chapada", slug: "chapada", hasPage: false },
  { name: "Costeira", slug: "costeira-araucaria", hasPage: false },
  { name: "Iguaçu", slug: "iguacu-araucaria", hasPage: false },
  { name: "Campina da Barra", slug: "campina-da-barra", hasPage: false },
  { name: "Porto das Laranjeiras", slug: "porto-das-laranjeiras", hasPage: false },
  { name: "Tindiquera", slug: "tindiquera", hasPage: false },
  { name: "Barigui", slug: "barigui-araucaria", hasPage: false },
  { name: "Fazenda Velha", slug: "fazenda-velha-araucaria", hasPage: false },
  { name: "Estação", slug: "estacao-araucaria", hasPage: false },
  { name: "Boqueirão", slug: "boqueirao-araucaria", hasPage: false },
  { name: "Sabiá", slug: "sabia", hasPage: false },
  { name: "Passaúna", slug: "passauna", hasPage: false },
  { name: "Guajuvira", slug: "guajuvira", hasPage: false },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Instalação limpa do Windows 10/11 com drivers e programas essenciais",
    slug: "formatacao-computador",
  },
  {
    title: "Remoção de Vírus",
    description: "Limpeza completa de malware, ransomware e proteção antivírus",
    slug: "remocao-virus",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Reparo de hardware, troca de peças e diagnóstico técnico",
    slug: "conserto-pc-notebook",
  },
  {
    title: "Upgrade SSD e Memória",
    description: "Aumente a velocidade do computador com SSD e mais RAM",
    slug: "upgrade-ssd-memoria",
  },
  {
    title: "Configuração de Rede",
    description: "Instalação de roteadores, repetidores Wi-Fi e cabeamento",
    slug: "redes-wifi",
  },
  {
    title: "Backup e Recuperação",
    description: "Proteção e recuperação de arquivos e dados importantes",
    slug: "backup-recuperacao",
  },
  {
    title: "Suporte para Empresas",
    description: "Atendimento contínuo e planos mensais para negócios locais",
    slug: null,
  },
  {
    title: "Montagem de PC",
    description: "Montagem personalizada de computadores para gaming e trabalho",
    slug: "montagem-pc",
  },
];

const localFaqs = [
  {
    question: "Qual o tempo de atendimento em Araucária?",
    answer:
      "O tempo de deslocamento até Araucária costuma ficar entre 30 e 50 minutos (varia conforme o bairro e o trânsito). Quando possível, atendemos no mesmo dia com horário agendado.",
  },
  {
    question: "Vocês atendem empresas no polo industrial de Araucária?",
    answer:
      "Sim. Atendemos comércios e empresas em toda a cidade, incluindo a região do CIAR e áreas industriais. Podemos montar um plano de suporte recorrente para reduzir paradas e prevenir problemas.",
  },
  {
    question: "Quanto custa a visita do técnico em Araucária?",
    answer:
      "A visita técnica parte de R$ 99,99 (30 minutos). Antes de executar qualquer serviço adicional, fazemos diagnóstico e informamos o valor com transparência.",
  },
  {
    question: "Vocês fazem formatação e remoção de vírus em Araucária?",
    answer:
      "Sim. Realizamos formatação do Windows (com drivers e ajustes), remoção de malware/ransomware, otimização e orientação de segurança para evitar reinfecção.",
  },
];

// JSON-LD específico para Araucária
const araucariaSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Araucária",
  "description": "Assistência técnica de computadores e notebooks em Araucária. Atendimento a domicílio para residências e empresas. Formatação, conserto, remoção de vírus.",
  "telephone": "+55-41-99745-2053",
  "url": "https://tecnicocuritiba.com.br/tecnico-informatica-araucaria",
  "areaServed": {
    "@type": "City",
    "name": "Araucária",
    "containedInPlace": {
      "@type": "State",
      "name": "Paraná"
    }
  },
  "priceRange": "R$ 99,99 - R$ 500",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Informática",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Formatação de Computador" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remoção de Vírus" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conserto de Notebook" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Upgrade SSD e Memória" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Configuração de Rede Wi-Fi" } },
    ]
  }
};

const TecnicoInformaticaAraucaria = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Araucária | Assistência Técnica a Domicílio | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em Araucária PR. Atendimento a domicílio para PC e notebook. Formatação, conserto, remoção de vírus. Visita a partir de R$ 99,99. Polo industrial e residencial."
      );
    }
    trackPageView("/tecnico-informatica-araucaria", "Técnico Araucária");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(araucariaSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Araucária" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Araucária"
          subtitle="Assistência técnica profissional em Araucária. Atendimento rápido para residências, comércios e indústrias na região metropolitana."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Suporte Técnico em Araucária"
          subtitle="Atendimento presencial e remoto para toda a cidade"
        />

        {/* Sobre a Cidade - SEO Rich Content */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica de Informática em Araucária
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Araucária</strong> é uma das cidades mais importantes da região metropolitana de Curitiba, 
                  conhecida pelo seu forte polo industrial, incluindo a refinaria da Petrobras (REPAR). A cidade possui milhares de empresas 
                  e residências que dependem de <strong className="text-foreground">tecnologia e suporte técnico de qualidade</strong>.
                </p>
                <p className="mb-4">
                  Nossa equipe de <strong className="text-foreground">técnicos de informática em Araucária</strong> atende desde o Centro 
                  até os bairros industriais como Chapada, Thomaz Coelho e região do CIAR. Oferecemos 
                  <strong className="text-foreground"> assistência técnica a domicílio</strong> para residências, escritórios e pequenas empresas.
                </p>
                <p>
                  Se você está em Araucária e precisa de um <strong className="text-foreground">técnico de computador confiável</strong>, 
                  entre em contato. Atendemos com o mesmo padrão de qualidade que nossos clientes em Curitiba já conhecem, 
                  com preços justos e orçamento transparente.
                </p>
              </div>

              {/* Destaque para segmentos */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento em casa com horário agendado</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Comércios</h3>
                  <p className="text-sm text-muted-foreground">Suporte para lojas e escritórios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Factory className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Indústrias</h3>
                  <p className="text-sm text-muted-foreground">Suporte técnico para o polo industrial</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros Atendidos */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Bairros Atendidos em Araucária
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Técnico de informática com atendimento a domicílio em todos os bairros de Araucária
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro) =>
                  bairro.hasPage ? (
                    <Link
                      key={bairro.slug}
                      to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-accent" />
                      {bairro.name}
                    </Link>
                  ) : (
                    <div
                      key={bairro.slug}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-accent" />
                      {bairro.name}
                    </div>
                  )
                )}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                E todos os demais bairros da cidade • Consulte disponibilidade
              </p>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em Araucária
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  servico.slug ? (
                    <Link 
                      key={index} 
                      to={`/servicos/${servico.slug}`}
                      className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md hover:border-accent/30 border border-transparent transition-all group"
                    >
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {servico.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {servico.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors mt-1" />
                    </Link>
                  ) : (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 bg-background rounded-lg p-4 border border-transparent"
                    >
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {servico.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {servico.description}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="text-center mt-8">
                <Link 
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  Ver lista completa de serviços
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Local */}
        <ServiceLocalLinks currentCity="Araucária" />
        <LocalFAQSection title="Perguntas Frequentes - Araucária" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="notebookReparo" secondaryImageKey="diagnostico" layout="duo" caption="Reparo de notebook em Araucária" secondaryCaption="Diagnóstico profissional com equipamento especializado" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaAraucaria;
