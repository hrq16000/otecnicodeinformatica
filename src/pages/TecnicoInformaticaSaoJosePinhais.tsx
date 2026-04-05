import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em São José dos Pinhais",
    description: "Cobrimos toda a cidade, do Centro aos bairros industriais. Técnico próximo a você na região metropolitana.",
  },
  {
    icon: Clock,
    title: "Rapidez no Atendimento",
    description: "Por estarmos na região metropolitana, chegamos rápido até você. Agendamento flexível conforme sua disponibilidade.",
  },
  {
    icon: Shield,
    title: "Profissional de Confiança",
    description: "Técnico identificado, com experiência comprovada e referências. Atendimento seguro para sua casa ou empresa.",
  },
  {
    icon: Wrench,
    title: "Serviço Completo",
    description: "Desde formatação até conserto de hardware. Resolvemos qualquer problema do seu computador ou notebook.",
  },
];

const bairros = [
  { name: "Centro SJP", slug: "sao-jose-dos-pinhais", hasPage: true },
  { name: "Afonso Pena", slug: "afonso-pena", hasPage: true },
  { name: "Cruzeiro", slug: "cruzeiro", hasPage: true },
  { name: "Aristocrata", slug: "aristocrata", hasPage: true },
  { name: "Braga", slug: "braga", hasPage: true },
  { name: "Costeira", slug: "costeira", hasPage: true },
  { name: "Aviação", slug: "aviacao", hasPage: true },
  { name: "Parque da Fonte", slug: "parque-da-fonte", hasPage: true },
  { name: "Guatupê", slug: "guatupe", hasPage: true },
  { name: "São Cristóvão", slug: "sao-cristovao", hasPage: true },
  { name: "São Domingos", slug: "sao-domingos", hasPage: true },
  { name: "São Marcos", slug: "sao-marcos", hasPage: true },
  { name: "São Francisco", slug: "sao-francisco", hasPage: true },
  { name: "Del Rey", slug: "del-rey", hasPage: true },
  { name: "Barro Preto", slug: "barro-preto", hasPage: true },
  { name: "Cidade Jardim", slug: null, hasPage: false },
  { name: "Pedro Moro", slug: null, hasPage: false },
  { name: "Ipê", slug: null, hasPage: false },
  { name: "Rio Pequeno", slug: null, hasPage: false },
  { name: "Borda do Campo", slug: null, hasPage: false },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Instalação limpa do Windows 10 ou 11 com drivers e programas essenciais",
    slug: "formatacao",
  },
  {
    title: "Remoção de Vírus",
    description: "Limpeza completa de malware, ransomware e proteção com antivírus",
    slug: "remocao-virus",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Reparo de hardware, troca de peças e diagnóstico técnico",
    slug: "conserto",
  },
  {
    title: "Upgrade SSD e Memória",
    description: "Aumente a velocidade do seu computador com SSD e mais RAM",
    slug: "upgrade",
  },
  {
    title: "Configuração de Rede",
    description: "Instalação e configuração de roteadores, repetidores e Wi-Fi",
    slug: "redes",
  },
  {
    title: "Backup e Recuperação",
    description: "Proteção e recuperação de arquivos importantes",
    slug: "backup",
  },
  {
    title: "Instalação de Programas",
    description: "Office, antivírus, drivers e softwares profissionais",
    slug: "instalacao",
  },
  {
    title: "Suporte para Empresas",
    description: "Atendimento contínuo e planos mensais para negócios locais",
    slug: "empresas",
  },
];

const localFaqs = [
  {
    question: "Vocês atendem a domicílio em São José dos Pinhais?",
    answer:
      "Sim. Fazemos atendimento a domicílio em toda a cidade, incluindo regiões próximas ao aeroporto e bairros como Afonso Pena, Costeira, Aviação e Centro.",
  },
  {
    question: "Quanto custa a visita do técnico em São José dos Pinhais?",
    answer:
      "A visita técnica parte de R$ 99,99 (30 minutos). Após o diagnóstico, informamos o orçamento antes de realizar qualquer procedimento.",
  },
  {
    question: "Quais serviços vocês fazem em São José dos Pinhais?",
    answer:
      "Os mais comuns são formatação, remoção de vírus, conserto de notebook/PC, upgrade para SSD e configuração de Wi‑Fi. Também fazemos backup e suporte remoto quando aplicável.",
  },
  {
    question: "Vocês atendem urgências (computador parou) em SJP?",
    answer:
      "Sim. Quando o caso é urgente, tentamos encaixe no mesmo dia. Chame no WhatsApp e informe o bairro e o problema para agilizar.",
  },
];

const TecnicoInformaticaSaoJosePinhais = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em São José dos Pinhais | Assistência Técnica | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em São José dos Pinhais. Atendimento em domicílio e empresas. Conserto de computador, formatação, remoção de vírus na região metropolitana de Curitiba."
      );
    }
    trackPageView("/tecnico-informatica-sao-jose-pinhais", "Técnico São José dos Pinhais");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em São José dos Pinhais" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em São José dos Pinhais"
          subtitle="Assistência técnica profissional na segunda maior cidade do Paraná. Atendimento rápido para residências e empresas."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Suporte Técnico Local em São José dos Pinhais"
          subtitle="Atendimento presencial e remoto para toda a cidade"
        />

        {/* Sobre a Cidade */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica em São José dos Pinhais
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  São José dos Pinhais, segunda maior cidade do Paraná e parte da região metropolitana de Curitiba, é um importante polo industrial e comercial. Com milhares de empresas e residências, a demanda por <strong className="text-foreground">técnico de informática em São José dos Pinhais</strong> é constante.
                </p>
                <p className="mb-4">
                  Nossa equipe atende toda a cidade, desde o Centro até os bairros industriais próximos ao aeroporto. Oferecemos <strong className="text-foreground">assistência técnica de computadores</strong> com a mesma qualidade e profissionalismo que nossos clientes em Curitiba já conhecem.
                </p>
                <p>
                  Se você mora ou trabalha em São José dos Pinhais e precisa de um técnico de computador confiável, entre em contato. Atendemos residências, comércios e empresas de todos os portes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros Atendidos com Links */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Bairros Atendidos em São José dos Pinhais
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Clique no bairro para ver serviços específicos e solicitar atendimento
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) => (
                  bairro.hasPage && bairro.slug ? (
                    <Link
                      key={index}
                      to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors group flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-accent group-hover:text-accent-foreground" />
                      {bairro.name}
                    </Link>
                  ) : (
                    <div
                      key={index}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {bairro.name}
                    </div>
                  )
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                E todos os demais bairros da cidade
              </p>
            </div>
          </div>
        </section>

        {/* Serviços com Links */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em São José dos Pinhais
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <Link 
                    key={index} 
                    to="/servicos"
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

        <ServiceLocalLinks currentCity="São José dos Pinhais" />
        <LocalFAQSection title="Perguntas Frequentes - São José dos Pinhais" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaSaoJosePinhais;