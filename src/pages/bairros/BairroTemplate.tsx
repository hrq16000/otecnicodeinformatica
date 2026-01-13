import { useEffect } from "react";
import { Header } from "@/components/Header";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { PricingBanner } from "@/components/PricingBanner";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle,
  Wrench,
  Monitor,
  HardDrive
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
}

interface BairroTemplateProps {
  data: BairroData;
}

export const BairroTemplate = ({ data }: BairroTemplateProps) => {
  const whatsappMessage = `Olá! Preciso de um técnico de informática em ${data.nome}. Serviço: [DESCREVA O PROBLEMA]`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const phoneUrl = `tel:+${WHATSAPP_NUMBER}`;

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

  const handlePhoneClick = () => {
    trackCTAClick("phone", `bairro_${data.slug}`);
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

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <Header />
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

                <Button
                  variant="heroCta"
                  size="lg"
                  className="text-base md:text-lg px-8"
                  asChild
                  onClick={handlePhoneClick}
                >
                  <a href={phoneUrl}>
                    <Phone className="h-5 w-5" />
                    Ligar Agora
                  </a>
                </Button>
              </div>

              <div className="bg-white/10 rounded-xl p-4 inline-block">
                <p className="text-white/90 text-sm">
                  ⚡ Serviços a partir de <strong className="text-accent">R$ 99,99</strong> (30 min) • Atendimento hoje mesmo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Banner */}
        <section className="py-6 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <PricingBanner />
            </div>
          </div>
        </section>

        {/* Conteúdo Local */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
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

                  {/* Pontos de Referência */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Regiões Atendidas Próximas:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.pontosReferencia.map((ponto, index) => (
                        <span
                          key={index}
                          className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {ponto}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Serviços */}
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

        <BenefitsGrid
          benefits={benefits}
          title={`Por Que Escolher o Técnico Curitiba em ${data.nome}?`}
          subtitle="Atendimento profissional com foco em qualidade e agilidade"
        />

        {/* Serviços Detalhados */}
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

        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default BairroTemplate;
