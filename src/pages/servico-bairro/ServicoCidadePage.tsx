import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  CheckCircle, Clock, Shield, MessageCircle, 
  MapPin, Star, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { SERVICOS, CIDADES, getServico, getCidade, getFaqPorServico } from "@/lib/servicoCidadeData";
import { ServiceCityLinks } from "@/components/ServiceCityLinks";
import NotFound from "@/pages/NotFound";

const WHATSAPP_NUMBER = "5541997452053";

const ServicoCidadePage = () => {
  const { servico: servicoSlug, cidade: cidadeSlug } = useParams<{ servico: string; cidade: string }>();
  
  const servico = servicoSlug ? getServico(servicoSlug) : undefined;
  const cidade = cidadeSlug ? getCidade(cidadeSlug) : undefined;

  useEffect(() => {
    if (!servico || !cidade) return;
    document.title = `${servico.nome} em ${cidade.nome} | Técnico a Domicílio | Atendimento Hoje`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        `Técnico de informática em ${cidade.nome}. ${servico.nome} com atendimento a domicílio no mesmo dia. Sem sair de casa. WhatsApp: (41) 99745-2053.`
      );
    }
    // Set canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://tecnicocuritiba.com.br/servicos/${servicoSlug}/${cidadeSlug}`;

    trackPageView(`/servicos/${servicoSlug}/${cidadeSlug}`, `${servico.nome} - ${cidade.nome}`);
  }, [servico, cidade, servicoSlug, cidadeSlug]);

  if (!servico || !cidade) return <NotFound />;

  const faqs = getFaqPorServico(servico.slug, cidade.nome);

  const waMessage = encodeURIComponent(
    `Olá! Preciso de ${servico.nome} em ${cidade.nome}. Podem me atender hoje?`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", `${servico.slug}-${cidade.slug}`);
    window.open(waLink, "_blank");
  };


  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `Técnico de Informática em ${cidade.nome}`,
        "telephone": "+55-41-99745-2053",
        "url": "https://tecnicocuritiba.com.br",
        "areaServed": cidade.nome,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cidade.nome,
          "addressRegion": "PR",
          "addressCountry": "BR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.pergunta,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.resposta
          }
        }))
      }
    ]
  };

  const beneficios = [
    { icon: MapPin, titulo: `Atendimento Local em ${cidade.nome}`, descricao: "Técnico vai até seu endereço com todas as ferramentas" },
    { icon: Clock, titulo: "Atendimento no Mesmo Dia", descricao: "Agende pelo WhatsApp e receba o técnico ainda hoje" },
    { icon: Shield, titulo: "Garantia em Todos os Serviços", descricao: "Serviço garantido. Se precisar, voltamos sem custo" },
    { icon: Star, titulo: "Orçamento Grátis", descricao: "Avaliação sem compromisso. Você só paga se aprovar" },
  ];

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
          { label: servico.nome, href: servico.servicoSlugExistente ? `/servicos/${servico.servicoSlugExistente}` : "/servicos" },
          { label: cidade.nome },
        ]}
      />

      {/* Hero */}
      <section className="pt-10 pb-10 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{cidade.nome}, PR</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {servico.nome} em {cidade.nome} – Técnico a Domicílio
            </h1>

            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Atendemos no seu endereço em {cidade.nome} ainda hoje
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">✓ Mesmo dia</span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">✓ Sem sair de casa</span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">✓ Orçamento grátis</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Chamar pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {beneficios.map((b, i) => (
              <div key={i} className="text-center p-6 bg-secondary rounded-xl">
                <b.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{b.titulo}</h3>
                <p className="text-sm text-muted-foreground">{b.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="atendimentoDomiciliar" secondaryImageKey="tecnicoTrabalhando" layout="duo" caption={`Técnico em atendimento a domicílio em ${cidade.nome}`} secondaryCaption="Diagnóstico profissional no local" />

      {/* Como Funciona */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-6">
            Como Funciona o Atendimento em {cidade.nome}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", titulo: "Chame no WhatsApp", desc: `Descreva o problema e informe sua localização em ${cidade.nome}` },
              { step: "2", titulo: "Agendamento Rápido", desc: `Definimos o melhor horário para ir até você em ${cidade.nome}` },
              { step: "3", titulo: "Serviço Concluído", desc: "Técnico resolve no local com garantia. Você acompanha tudo" },
            ].map((p, i) => (
              <div key={i} className="text-center p-6 bg-background rounded-xl">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{p.titulo}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-6">
            Perguntas Frequentes: {servico.nome} em {cidade.nome}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <details key={index} className="group bg-secondary rounded-xl">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-foreground">
                  {item.pergunta}
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">
                  {item.resposta}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Precisa de {servico.nome} em {cidade.nome}?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e agende seu atendimento a domicílio. Respondemos em até 15 minutos.
          </p>
          <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Agendar {servico.nome} em {cidade.nome}
          </Button>
        </div>
      </section>

      {/* Interlinking */}
      <ServiceCityLinks servicoSlug={servico.slug} cidadeSlug={cidade.slug} />

      <Footer />
    </div>
  );
};

export default ServicoCidadePage;
