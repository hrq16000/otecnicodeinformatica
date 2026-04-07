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
import { RealImageSection } from "@/components/RealImageSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Home, Zap } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em Todo Pinhais",
    description: "Técnico próximo, conhecemos bem a cidade. Do Centro ao Weissópolis, estamos perto de você.",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Por estar próximo a Curitiba, chegamos rápido. Agendamento para o mesmo dia quando possível.",
  },
  {
    icon: Shield,
    title: "Técnico Experiente",
    description: "Mais de 20 anos de experiência. Profissional identificado e com referências comprovadas.",
  },
  {
    icon: Wrench,
    title: "Serviço Garantido",
    description: "Todos os serviços com garantia. Formatação, conserto, upgrade e muito mais.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro-pinhais", hasPage: true },
  { name: "Weissópolis", slug: "weissopolis", hasPage: true },
  { name: "Pineville", slug: "pineville", hasPage: true },
  { name: "Emiliano Perneta", slug: "emiliano-perneta", hasPage: false },
  { name: "Maria Antonieta", slug: "maria-antonieta", hasPage: false },
  { name: "Vargem Grande", slug: "vargem-grande", hasPage: false },
  { name: "Estância Pinhais", slug: "estancia-pinhais", hasPage: false },
  { name: "Alto Tarumã", slug: "alto-taruma", hasPage: false },
  { name: "Graciosa", slug: "graciosa", hasPage: false },
  { name: "Jardim Amélia", slug: "jardim-amelia", hasPage: false },
  { name: "Palmital", slug: "palmital-pinhais", hasPage: false },
  { name: "Atuba", slug: "atuba-pinhais", hasPage: false },
  { name: "Sete Vilas", slug: "sete-vilas", hasPage: false },
  { name: "Vila Tarumã", slug: "vila-taruma", hasPage: false },
  { name: "Vale das Águas", slug: "vale-das-aguas", hasPage: false },
  { name: "Jardim Claudia", slug: "jardim-claudia", hasPage: false },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Windows 10/11 com drivers atualizados e programas essenciais",
    slug: "formatacao-computador",
  },
  {
    title: "Remoção de Vírus",
    description: "Limpeza completa de malware e instalação de antivírus",
    slug: "remocao-virus",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Diagnóstico e reparo de hardware com peças de qualidade",
    slug: "conserto-pc-notebook",
  },
  {
    title: "Upgrade SSD e Memória",
    description: "Deixe seu computador muito mais rápido",
    slug: "upgrade-ssd-memoria",
  },
  {
    title: "Configuração de Rede",
    description: "Wi-Fi, roteadores, repetidores e cabeamento",
    slug: "redes-wifi",
  },
  {
    title: "Backup e Recuperação",
    description: "Proteção e recuperação de arquivos importantes",
    slug: "backup-recuperacao",
  },
  {
    title: "Montagem de PC",
    description: "Montagem de PC gamer ou para trabalho",
    slug: "montagem-pc",
  },
  {
    title: "Suporte Empresarial",
    description: "Planos de suporte para pequenas empresas",
    slug: null,
  },
];

const localFaqs = [
  {
    question: "Por que o atendimento em Pinhais é mais rápido?",
    answer:
      "Como Pinhais faz divisa com Curitiba, o deslocamento costuma ficar entre 15 e 30 minutos (variando por bairro e trânsito). Isso facilita encaixes e urgências.",
  },
  {
    question: "Vocês atendem Weissópolis, Pineville e Centro de Pinhais?",
    answer:
      "Sim. Atendemos todos os bairros de Pinhais, incluindo Weissópolis, Pineville, Centro, Maria Antonieta, Emiliano Perneta e regiões próximas.",
  },
  {
    question: "Quanto custa a visita técnica em Pinhais?",
    answer:
      "A visita técnica começa em R$ 69,99. Após o diagnóstico, informamos o orçamento antes de realizar qualquer serviço.",
  },
  {
    question: "Vocês fazem suporte remoto para clientes de Pinhais?",
    answer:
      "Sim, quando o problema é de software (lentidão, configurações, instalação, limpeza), o suporte remoto pode resolver com rapidez. Para hardware, recomendamos atendimento presencial.",
  },
];

// JSON-LD específico para Pinhais
const pinhaisSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Pinhais",
  "description": "Assistência técnica de computadores em Pinhais PR. Atendimento a domicílio rápido. Formatação, conserto de notebook, remoção de vírus. Próximo a Curitiba.",
  "telephone": "+55-41-99745-2053",
  "url": "https://tecnicocuritiba.com.br/tecnico-informatica-pinhais",
  "areaServed": {
    "@type": "City",
    "name": "Pinhais",
    "containedInPlace": {
      "@type": "State",
      "name": "Paraná"
    }
  },
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Informática",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Formatação de Computador" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remoção de Vírus" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conserto de Notebook" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Upgrade SSD e Memória" } },
    ]
  }
};

const TecnicoInformaticaPinhais = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Pinhais | Assistência Técnica Rápida | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em Pinhais PR. Atendimento rápido a domicílio. Formatação, conserto de PC e notebook, remoção de vírus. Próximo a Curitiba. A partir de R$ 69,99."
      );
    }
    trackPageView("/tecnico-informatica-pinhais", "Técnico Pinhais");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Técnico de Informática em Pinhais | Assistência Técnica Rápida | Técnico Curitiba" description="Técnico de informática em Pinhais PR. Atendimento rápido a domicílio. Formatação, conserto de PC e notebook, remoção de vírus. Próximo a Curitiba. A partir de R$ 69,99." path="/tecnico-informatica-pinhais" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pinhaisSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Pinhais" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Pinhais"
          subtitle="Assistência técnica rápida para quem está em Pinhais. Atendimento a domicílio com a mesma qualidade de Curitiba."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Suporte Técnico em Pinhais"
          subtitle="Atendimento ágil para toda a cidade"
        />

        {/* Sobre a Cidade - SEO Rich Content */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica de Informática em Pinhais
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Pinhais</strong> é a menor cidade em área do Paraná, mas uma das mais 
                  desenvolvidas da região metropolitana de Curitiba. Com alta densidade demográfica e forte economia, 
                  a cidade demanda <strong className="text-foreground">serviços de informática rápidos e de qualidade</strong>.
                </p>
                <p className="mb-4">
                  Por fazer divisa direta com Curitiba, o <strong className="text-foreground">atendimento técnico em Pinhais</strong> é 
                  extremamente ágil. Atendemos desde o Centro, passando por Emiliano Perneta, Maria Antonieta, até o Weissópolis 
                  e região do Atuba. Nossa proximidade garante tempo de resposta reduzido.
                </p>
                <p>
                  Se você mora ou trabalha em Pinhais e precisa de <strong className="text-foreground">conserto de computador</strong>, 
                  <strong className="text-foreground"> formatação</strong> ou qualquer outro serviço de TI, pode contar conosco. 
                  Atendemos com urgência quando necessário.
                </p>
              </div>

              {/* Destaque para segmentos */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento domiciliar com hora marcada</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Empresas</h3>
                  <p className="text-sm text-muted-foreground">Suporte para escritórios e comércios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Atendimento Expresso</h3>
                  <p className="text-sm text-muted-foreground">Urgências atendidas no mesmo dia</p>
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
                Bairros Atendidos em Pinhais
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Técnico de informática a domicílio em todos os bairros de Pinhais
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
                Cobertura completa em toda a cidade de Pinhais
              </p>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em Pinhais
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
                  Ver todos os serviços disponíveis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Local */}
        <ServiceLocalLinks currentCity="Pinhais" />
        <LocalFAQSection title="Perguntas Frequentes - Pinhais" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="desktopMontado" secondaryImageKey="atendimentoDomiciliar" layout="duo" caption="Montagem e reparo de PC em Pinhais" secondaryCaption="Atendimento domiciliar profissional" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaPinhais;
