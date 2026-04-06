import { useEffect } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { IMAGES } from "@/lib/images";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Clock, Shield, ArrowRight, MessageCircle, Phone, 
  MapPin, Star, Award, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const PHONE_NUMBER = "5541997452053";

export interface ServicoBairroData {
  // SEO
  metaTitle: string;
  metaDescription: string;
  
  // Content
  servico: string;
  servicoSlug: string;
  bairro: string;
  bairroSlug: string;
  cidade: string;
  cidadeSlug?: string;
  
  // Hero
  h1: string;
  subtitulo: string;
  
  // Pricing
  precoBase: string;
  precoDescricao: string;
  
  // Content sections
  descricaoLonga: string;
  beneficios: string[];
  processoPasso: { titulo: string; descricao: string }[];
  faq: { pergunta: string; resposta: string }[];
  
  // Local SEO
  pontosReferencia: string[];
  tempoAtendimento: string;
  
  // Related
  servicosRelacionados: { nome: string; slug: string }[];
  bairrosProximos: { nome: string; slug: string }[];
}

export const ServicoBairroTemplate = ({ data }: { data: ServicoBairroData }) => {
  useEffect(() => {
    document.title = data.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", data.metaDescription);
    }
    trackPageView(
      `/servicos/${data.servicoSlug}/${data.bairroSlug}`, 
      `${data.servico} - ${data.bairro}`
    );
  }, [data]);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", `${data.servicoSlug}-${data.bairroSlug}`);
    const message = encodeURIComponent(
      `Olá! Preciso de ${data.servico.toLowerCase()} no ${data.bairro}. Qual a disponibilidade?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handlePhoneClick = () => {
    trackCTAClick("phone", `${data.servicoSlug}-${data.bairroSlug}`);
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  // Generate JSON-LD for local service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.servico} no ${data.bairro}`,
    description: data.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Técnico Curitiba",
      telephone: "+55-41-99745-2053",
      address: {
        "@type": "PostalAddress",
        addressLocality: data.cidade,
        addressRegion: "PR",
        addressCountry: "BR"
      },
    },
    areaServed: {
      "@type": "Place",
      name: `${data.bairro}, ${data.cidade}`
    },
    offers: {
      "@type": "Offer",
      price: data.precoBase.replace(/[^\d,]/g, "").replace(",", "."),
      priceCurrency: "BRL"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: data.servico, href: `/servicos/${data.servicoSlug}` },
          { label: data.bairro },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{data.bairro}, {data.cidade}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {data.h1}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {data.subtitulo}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-white font-medium">4.9/5 (347+ avaliações)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-white">{data.tempoAtendimento}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-white">Garantia inclusa</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="whatsapp"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Agendar no {data.bairro}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10" 
                onClick={handlePhoneClick}
              >
                <Phone className="mr-2 h-5 w-5" />
                (41) 99745-2053
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preço Destaque */}
      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {data.servico} a partir de <span className="text-accent">{data.precoBase}</span>
          </p>
          <p className="text-muted-foreground mt-2">{data.precoDescricao}</p>
        </div>
      </section>

      {/* Descrição Local */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                  {data.servico} no {data.bairro}: Por Que Nos Escolher?
                </h2>
                <div className="prose prose-lg text-muted-foreground">
                  <p>{data.descricaoLonga}</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={data.servicoSlug.includes("conserto") ? IMAGES.notebookReparo 
                    : data.servicoSlug.includes("formatacao") ? IMAGES.tecnicoTrabalhando
                    : data.servicoSlug.includes("virus") ? IMAGES.segurancaDigital
                    : data.servicoSlug.includes("upgrade") ? IMAGES.componentesSsd
                    : data.servicoSlug.includes("redes") ? IMAGES.redesWifi
                    : data.servicoSlug.includes("backup") ? IMAGES.diagnostico
                    : data.servicoSlug.includes("montagem") ? IMAGES.desktopMontado
                    : IMAGES.tecnicoTrabalhando}
                  alt={`${data.servico} profissional no ${data.bairro}, ${data.cidade}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  width="800"
                  height="400"
                />
              </div>
            </div>
            
            {/* Pontos de Referência */}
            <div className="mt-8 p-6 bg-secondary rounded-xl">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Atendemos perto de:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.pontosReferencia.map((ponto, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground"
                  >
                    {ponto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            O Que Está Incluso?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.beneficios.map((beneficio, index) => (
              <div key={index} className="flex gap-4 p-4 bg-background rounded-xl">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Como Funciona o Atendimento no {data.bairro}?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {data.processoPasso.map((passo, index) => (
              <div key={index} className="text-center p-6 bg-secondary rounded-xl">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-primary mb-2">{passo.titulo}</h3>
                <p className="text-muted-foreground text-sm">{passo.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Local */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Perguntas Frequentes: {data.servico} no {data.bairro}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {data.faq.map((item, index) => (
              <div key={index} className="bg-background p-6 rounded-xl">
                <h3 className="font-bold text-primary mb-2">{item.pergunta}</h3>
                <p className="text-muted-foreground">{item.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Precisa de {data.servico} no {data.bairro}?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e agende seu atendimento. Técnico especializado com chegada rápida!
          </p>
          <Button 
            size="lg" 
            variant="whatsapp"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chamar Técnico no {data.bairro}
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            Outros Serviços no {data.bairro}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {data.servicosRelacionados.map((servico, index) => (
              <Link 
                key={index}
                to={`/servicos/${servico.slug}/${data.bairroSlug}`} 
                className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors"
              >
                {servico.nome} no {data.bairro}
              </Link>
            ))}
          </div>
          
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            {data.servico} em Bairros Próximos
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.bairrosProximos.map((bairro, index) => (
              <Link 
                key={index}
                to={`/servicos/${data.servicoSlug}/${bairro.slug}`} 
                className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors"
              >
                {data.servico} no {bairro.nome}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BlocoInteligencia />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};
