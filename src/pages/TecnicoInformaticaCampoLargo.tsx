import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Home, Trees } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em Campo Largo",
    description: "Cobrimos do Centro até os bairros rurais. Técnico especializado para a região oeste metropolitana.",
  },
  {
    icon: Clock,
    title: "Agendamento Flexível",
    description: "Atendimento agendado com horários que se encaixam na sua rotina. Sem longas esperas.",
  },
  {
    icon: Shield,
    title: "Profissional Qualificado",
    description: "Técnico identificado com mais de 10 anos de experiência. Atendimento seguro e confiável.",
  },
  {
    icon: Wrench,
    title: "Solução Completa",
    description: "De formatação a conserto de hardware. Resolvemos qualquer problema do seu computador.",
  },
];

const bairros = [
  { name: "Centro", hasPage: false },
  { name: "Jardim Guilhermina", hasPage: false },
  { name: "Jardim América", hasPage: false },
  { name: "Ferraria", hasPage: false },
  { name: "Botiatuva", hasPage: false },
  { name: "Rondinha", hasPage: false },
  { name: "São Silvestre", hasPage: false },
  { name: "Três Córregos", hasPage: false },
  { name: "Itaqui", hasPage: false },
  { name: "Ouro Fino", hasPage: false },
  { name: "Bateias", hasPage: false },
  { name: "Palmital", hasPage: false },
  { name: "Santa Cruz", hasPage: false },
  { name: "Correia de Freitas", hasPage: false },
  { name: "Jardim Planalto", hasPage: false },
  { name: "Vila Solene", hasPage: false },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Instalação limpa do Windows 10/11 com drivers e programas",
    slug: "formatacao-computador",
  },
  {
    title: "Remoção de Vírus",
    description: "Limpeza de malware e configuração de antivírus",
    slug: "remocao-virus",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Diagnóstico e reparo de hardware",
    slug: "conserto-pc-notebook",
  },
  {
    title: "Upgrade SSD e Memória",
    description: "Melhore a velocidade do seu computador",
    slug: "upgrade-ssd-memoria",
  },
  {
    title: "Configuração de Rede Wi-Fi",
    description: "Instalação de roteadores e repetidores",
    slug: "redes-wifi",
  },
  {
    title: "Backup e Recuperação",
    description: "Proteção e recuperação de dados importantes",
    slug: "backup-recuperacao",
  },
  {
    title: "Suporte Remoto",
    description: "Atendimento online para problemas de software",
    slug: null,
  },
  {
    title: "Montagem de PC",
    description: "Montagem personalizada para suas necessidades",
    slug: "montagem-pc",
  },
];

// JSON-LD específico para Campo Largo
const campoLargoSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Campo Largo",
  "description": "Assistência técnica de computadores em Campo Largo PR. Atendimento a domicílio. Formatação, conserto de notebook, remoção de vírus. Capital da Louça.",
  "telephone": "+55-41-99745-2053",
  "url": "https://tecnicocuritiba.com.br/tecnico-informatica-campo-largo",
  "areaServed": {
    "@type": "City",
    "name": "Campo Largo",
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
    ]
  }
};

const TecnicoInformaticaCampoLargo = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Campo Largo | Assistência Técnica | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em Campo Largo PR. Atendimento a domicílio para computadores e notebooks. Formatação, vírus, upgrade. Visita a partir de R$ 99,99. Capital da Louça."
      );
    }
    trackPageView("/tecnico-informatica-campo-largo", "Técnico Campo Largo");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(campoLargoSchema) }} />
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Técnico de Informática em Campo Largo"
          subtitle="Assistência técnica especializada na Capital da Louça. Atendimento a domicílio para residências e empresas."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Suporte Técnico em Campo Largo"
          subtitle="Atendimento profissional para toda a cidade"
        />

        {/* Sobre a Cidade - SEO Rich Content */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica de Informática em Campo Largo
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Campo Largo</strong>, conhecida como a Capital da Louça, é um importante 
                  município da região oeste metropolitana de Curitiba. Com sua economia diversificada entre indústria cerâmica, 
                  comércio e turismo rural, a cidade demanda <strong className="text-foreground">suporte técnico de informática de qualidade</strong>.
                </p>
                <p className="mb-4">
                  Nossa equipe de <strong className="text-foreground">técnicos de informática em Campo Largo</strong> atende 
                  desde o Centro até bairros como Ferraria, Jardim Guilhermina e região rural. Entendemos as necessidades 
                  tanto de residências quanto de empresas locais, oferecendo <strong className="text-foreground">atendimento a domicílio</strong> 
                  com a mesma qualidade de Curitiba.
                </p>
                <p>
                  Seja você empresário, comerciante ou residente em Campo Largo, pode contar com nosso suporte técnico. 
                  Diagnóstico preciso, orçamento transparente e garantia em todos os serviços.
                </p>
              </div>

              {/* Destaque para segmentos */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento em casa com hora marcada</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Comércios</h3>
                  <p className="text-sm text-muted-foreground">Suporte técnico para lojas e escritórios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Trees className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Área Rural</h3>
                  <p className="text-sm text-muted-foreground">Atendimento na região de chácaras e sítios</p>
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
                Bairros Atendidos em Campo Largo
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Técnico de informática a domicílio em todos os bairros de Campo Largo
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) => (
                  <div
                    key={index}
                    className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-accent" />
                    {bairro.name}
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                E todos os demais bairros e distritos da cidade
              </p>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em Campo Largo
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
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Perguntas Frequentes - Campo Largo
              </h2>
              <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Vocês atendem na área rural de Campo Largo?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim, atendemos toda a região de Campo Largo, incluindo distritos como Ferraria, Bateias, 
                    e áreas de chácaras. O atendimento é agendado com antecedência para garantir disponibilidade.
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Qual o tempo de deslocamento até Campo Largo?</h3>
                  <p className="text-muted-foreground text-sm">
                    O tempo de deslocamento de Curitiba até Campo Largo é de aproximadamente 40-60 minutos, 
                    dependendo do bairro. Agendamos atendimentos com horários que funcionem para você.
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Atendem empresas do setor cerâmico?</h3>
                  <p className="text-muted-foreground text-sm">
                    Sim! Atendemos empresas de todos os segmentos em Campo Largo, incluindo o setor cerâmico. 
                    Oferecemos suporte para sistemas de gestão, redes e manutenção de equipamentos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaCampoLargo;
