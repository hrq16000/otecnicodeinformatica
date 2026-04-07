import { useEffect } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { IMAGES } from "@/lib/images";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { GeoSpecificFAQs, bairroFAQs } from "@/components/GeoSpecificFAQs";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle,
  Wrench,
  Monitor,
  HardDrive,
  ArrowRight
} from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";

interface BairroData {
  nome: string;
  slug: string;
  cidade: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitulo: string;
  descricaoLonga: string;
  pontosReferencia: string[];
  tempoDeslocamento: string;
  servicosDestaque: string[];
  conteudoExclusivo?: string;
  problemasComuns?: string[];
  dicasLocais?: string;
}

interface BairroTemplateProps {
  data: BairroData;
}

export const BairroTemplate = ({ data }: BairroTemplateProps) => {
  const whatsappMessage = `Olá! Preciso de um técnico de informática em ${data.nome}. Serviço: [DESCREVA O PROBLEMA]`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  

  useEffect(() => {
    document.title = data.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", data.metaDescription);
    }
    trackPageView(`/bairros/${data.slug}`, `Bairro ${data.nome}`);
  }, [data]);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", `bairro_${data.slug}`);
  };


  const benefits = [
    {
      icon: MapPin,
      title: `Atendimento Local em ${data.nome}`,
      description: `Técnico especializado com conhecimento da região. Chegamos rápido até você em ${data.nome} e arredores.`,
    },
    {
      icon: Clock,
      title: data.tempoDeslocamento,
      description: "Atendimento ágil, com horário agendado conforme sua disponibilidade. Sem longas esperas.",
    },
    {
      icon: Shield,
      title: "Profissional Identificado",
      description: "Técnico credenciado, com identificação e equipamentos profissionais. Segurança para sua família.",
    },
    {
      icon: Wrench,
      title: "Resolução na Hora",
      description: "A maioria dos problemas é resolvida na primeira visita. Se precisar de peças, informamos antes.",
    },
  ];

  // JSON-LD específico para a localidade
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Técnico de Informática em ${data.nome}`,
    "description": data.metaDescription,
    "telephone": "+55-41-99745-2053",
    "areaServed": {
      "@type": "Place",
      "name": data.nome,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.cidade,
        "addressRegion": "PR",
        "addressCountry": "BR"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Informática",
      "itemListElement": data.servicosDestaque.map((servico) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": servico
        }
      }))
    }
  };

  const localFaqs = [
    {
      question: `Vocês atendem a domicílio no ${data.nome}?`,
      answer: `Sim. Fazemos atendimento a domicílio no ${data.nome} (${data.cidade}) com horário agendado. Levamos ferramentas e fazemos diagnóstico no local sempre que possível.`,
    },
    {
      question: `Quanto tempo demora para o técnico chegar no ${data.nome}?`,
      answer: `Em geral, ${data.tempoDeslocamento.toLowerCase()}. O tempo pode variar conforme trânsito e disponibilidade do dia. Para urgências, tentamos encaixe no mesmo dia.`,
    },
    {
      question: `Quais serviços vocês fazem no ${data.nome}?`,
      answer: `Os mais comuns são ${data.servicosDestaque.slice(0, 4).join(", ")}. Também realizamos diagnóstico, manutenção preventiva, suporte remoto (quando aplicável) e melhorias de desempenho.`,
    },
    {
      question: `Qual o valor da visita técnica no ${data.nome}?`,
      answer:
        "A visita técnica começa em R$ 69,99. Após o diagnóstico, informamos o orçamento antes de executar qualquer serviço adicional.",
    },
  ];

  // Determinar link da cidade
  const getCityLink = () => {
    switch (data.cidade) {
      case "Curitiba": return "/tecnico-informatica-curitiba";
      case "São José dos Pinhais": return "/tecnico-informatica-sao-jose-pinhais";
      case "Araucária": return "/tecnico-informatica-araucaria";
      case "Campo Largo": return "/tecnico-informatica-campo-largo";
      case "Pinhais": return "/tecnico-informatica-pinhais";
      case "Colombo": return "/tecnico-informatica-colombo";
      case "Fazenda Rio Grande": return "/tecnico-informatica-fazenda-rio-grande";
      case "Almirante Tamandaré": return "/tecnico-informatica-almirante-tamandare";
      case "Piraquara": return "/tecnico-informatica-piraquara";
      case "Campo Magro": return "/tecnico-informatica-campo-magro";
      case "Quatro Barras": return "/tecnico-informatica-quatro-barras";
      default: return "/";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: `Técnico em ${data.cidade}`, href: getCityLink() },
          { label: data.nome },
        ]}
      />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                {data.h1}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {data.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  variant="heroWhatsapp"
                  size="lg"
                  className="text-base md:text-lg px-8"
                  asChild
                  onClick={handleWhatsAppClick}
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Chamar Técnico em {data.nome}
                  </a>
                </Button>

              </div>

              <div className="bg-white/10 rounded-xl p-4 inline-block">
                <p className="text-white/90 text-sm">
                  ⚡ Serviços a partir de <strong className="text-accent">R$ 69,99</strong> • Atendimento hoje mesmo
                </p>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-6 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <PricingBanner />
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={IMAGES.atendimentoDomiciliar} 
                  alt={`Técnico de informática realizando atendimento a domicílio no ${data.nome}, ${data.cidade}`}
                  className="w-full h-48 md:h-64 object-cover"
                  loading="lazy"
                  width="800"
                  height="400"
                />
              </div>
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                    Assistência Técnica em Informática no {data.nome}
                  </h2>
                  <div className="prose prose-lg text-muted-foreground">
                    <p className="mb-4">{data.descricaoLonga}</p>
                    <p className="mb-4">
                      Nosso técnico de informática atende toda a região do {data.nome} e arredores, 
                      oferecendo serviços completos de manutenção, conserto e suporte para computadores 
                      e notebooks. Seja para residências ou empresas, garantimos atendimento profissional 
                      com qualidade e pontualidade.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Regiões Atendidas Próximas:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.pontosReferencia.map((ponto, index) => (
                        <span key={index} className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-sm">
                          {ponto}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-secondary rounded-xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Serviços em {data.nome}
                    </h3>
                    <ul className="space-y-3">
                      {data.servicosDestaque.map((servico, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                          <span className="text-foreground">{servico}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button variant="whatsapp" className="w-full" asChild onClick={handleWhatsAppClick}>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-5 w-5" />
                          Solicitar Orçamento
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        <BenefitsGrid
          benefits={benefits}
          title={`Por Que Escolher o Técnico Curitiba em ${data.nome}?`}
          subtitle="Atendimento profissional com foco em qualidade e agilidade"
        />
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Informática no {data.nome}: O Que Você Precisa Saber
              </h2>

              {data.conteudoExclusivo ? (
                <div className="prose prose-lg text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: "" }}>
                </div>
              ) : null}

              <div className="prose prose-lg text-muted-foreground mb-8">
                <p>
                  Moradores e empresas do {data.nome} ({data.cidade}) enfrentam problemas de informática 
                  que, quando ignorados, se transformam em prejuízo. Um computador lento pode significar 
                  desde um HD desgastado até uma infecção silenciosa por malware. Um notebook que 
                  superaquece pode estar com a pasta térmica ressecada — ou pode ser sinal de que o 
                  componente está prestes a falhar.
                </p>
                <p>
                  <strong>É por isso que o diagnóstico correto faz toda a diferença.</strong> Antes de trocar 
                  peças ou formatar, é preciso entender o que realmente está acontecendo. Nosso técnico 
                  atende o {data.nome} com equipamento profissional, faz a análise no local e explica 
                  com clareza o que precisa ser feito — e o que não precisa.
                </p>
                <p>
                  Quando o reparo pode ser feito na hora (como formatação, troca de SSD, limpeza interna 
                  ou configuração de rede), resolvemos na primeira visita. Quando o caso exige bancada 
                  (como reparo de placa-mãe ou troca de tela), informamos prazo e valor antes de retirar 
                  o equipamento. <strong>Transparência total, sem surpresas.</strong>
                </p>
              </div>

              <div className="bg-secondary rounded-xl p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Problemas Mais Comuns no {data.nome}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(data.problemasComuns || [
                    "Computador lento que trava ao abrir programas",
                    "Notebook superaquecendo e desligando sozinho",
                    "Wi-Fi que cai ou fica lento em cômodos distantes",
                    "Vírus, pop-ups e programas indesejados",
                    "Tela azul ou computador que não liga",
                    "Perda de arquivos e necessidade de backup urgente",
                  ]).map((problema, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{problema}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Se você enfrenta algum desses problemas no {data.nome}, fale com nosso técnico. 
                  Atendemos com horário agendado e resolvemos a maioria dos casos na primeira visita.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/como-funciona" className="bg-secondary rounded-xl p-5 hover:shadow-md transition-all group">
                  <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">Como Funciona</h4>
                  <p className="text-muted-foreground text-sm">Entenda o passo a passo do atendimento técnico a domicílio.</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm mt-2 group-hover:gap-2 transition-all">
                    Ver detalhes <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
                <Link to="/valores" className="bg-secondary rounded-xl p-5 hover:shadow-md transition-all group">
                  <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">Preços e Condições</h4>
                  <p className="text-muted-foreground text-sm">Valores claros, sem surpresas. A partir de R$ 69,99.</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm mt-2 group-hover:gap-2 transition-all">
                    Ver preços <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
                <Link to="/diagnostico-tecnico" className="bg-secondary rounded-xl p-5 hover:shadow-md transition-all group">
                  <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">Diagnóstico Técnico</h4>
                  <p className="text-muted-foreground text-sm">Por que o diagnóstico é pago e como ele protege você.</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm mt-2 group-hover:gap-2 transition-all">
                    Entender <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Principais Serviços no {data.nome}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4">
                    <Monitor className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Formatação</h3>
                  <p className="text-muted-foreground text-sm">
                    Instalação limpa do Windows, drivers e programas. Computador como novo.
                  </p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Remoção de Vírus</h3>
                  <p className="text-muted-foreground text-sm">
                    Limpeza completa de malwares, trojans e ransomware. Proteção instalada.
                  </p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center">
                  <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4">
                    <HardDrive className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Upgrade SSD</h3>
                  <p className="text-muted-foreground text-sm">
                    Troca de HD por SSD. Seu computador 10x mais rápido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        {bairroFAQs[data.slug] ? (
          <GeoSpecificFAQs
            bairroSlug={data.slug}
            bairroNome={data.nome}
            cidadeNome={data.cidade}
          />
        ) : (
          <LocalFAQSection
            title={`Perguntas Frequentes - ${data.nome}`}
            faqs={[
              {
                question: `Vocês atendem a domicílio no ${data.nome}?`,
                answer: `Sim. Fazemos atendimento a domicílio no ${data.nome} (${data.cidade}) com horário agendado. Levamos ferramentas e fazemos diagnóstico no local sempre que possível.`,
              },
              {
                question: `Quanto tempo demora para o técnico chegar no ${data.nome}?`,
                answer: `Em geral, ${data.tempoDeslocamento.toLowerCase()}. O tempo pode variar conforme trânsito e disponibilidade do dia.`,
              },
              {
                question: `Quais serviços vocês fazem no ${data.nome}?`,
                answer: `Os mais comuns são ${data.servicosDestaque.slice(0, 4).join(", ")}. Também realizamos diagnóstico e manutenção preventiva.`,
              },
              {
                question: `Qual o valor da visita técnica no ${data.nome}?`,
                answer: "A visita técnica começa em R$ 69,99. Após o diagnóstico, informamos o orçamento antes de executar qualquer serviço adicional.",
              },
            ]}
          />
        )}
        </AnimatedSection>

        <AnimatedSection>
        <ServiceLocalLinks currentCity={data.cidade} currentNeighborhood={data.nome} />
        </AnimatedSection>

        <AnimatedSection><TrustSection /></AnimatedSection>
        <AnimatedSection><CTASection /></AnimatedSection>
      </main>
      <BlocoInteligencia compact />
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default BairroTemplate;
