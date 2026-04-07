import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, MapPin, Mail, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um atendimento.";

const Contato = () => {
  useEffect(() => {
    document.title = "Contato | Técnico Curitiba - Fale Conosco";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Entre em contato com a Técnico Curitiba. WhatsApp, telefone e atendimento rápido para suporte técnico em informática em Curitiba e região."
      );
    }
    trackPageView("/contato", "Contato");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "contato-principal");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Contato | Técnico Curitiba - Fale Conosco" description="Entre em contato com a Técnico Curitiba. WhatsApp, telefone e atendimento rápido para suporte técnico em informática em Curitiba e região." path="/contato" />
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--glow-whatsapp)/0.12),transparent_60%)] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4 reveal-text">
                Fale Conosco
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Precisa de suporte técnico? Entre em contato agora mesmo e resolva seu problema rapidamente.
              </p>
            </div>
          </div>
        </section>

        {/* Contatos Principais */}
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
          <div className="absolute top-10 right-0 w-80 h-80 bg-[hsl(var(--glow-whatsapp)/0.06)] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
             <div className="max-w-2xl mx-auto">
                {/* WhatsApp */}
                <div className="group bg-secondary rounded-2xl p-8 text-center border-2 border-border/50 hover:border-[hsl(var(--whatsapp)/0.4)] hover:shadow-xl transition-all duration-300">
                  <div className="bg-[hsl(var(--whatsapp))] rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_28px_hsl(var(--glow-whatsapp)/0.4)] transition-all duration-300">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">WhatsApp</h2>
                  <p className="text-muted-foreground mb-4">
                    Resposta rápida e atendimento imediato
                  </p>
                  <Button variant="whatsapp" size="lg" className="w-full" asChild>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chamar no WhatsApp
                    </a>
                  </Button>
                </div>
            </div>
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="py-12 md:py-16 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center reveal-text">
                Informações de Atendimento
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Clock,
                    title: "Horário",
                    content: <>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 12h<br /><span className="text-accent font-medium">Urgências via WhatsApp</span></>,
                  },
                  {
                    icon: MapPin,
                    title: "Área de Atendimento",
                    content: <>Curitiba e toda região metropolitana<br />São José dos Pinhais<br /><span className="text-accent font-medium">Atendimento remoto para todo Brasil</span></>,
                  },
                  {
                    icon: Mail,
                    title: "Resposta Rápida",
                    content: <>Respondemos em até 30 minutos durante o horário comercial.<br /><span className="text-accent font-medium">WhatsApp é o canal mais rápido</span></>,
                  },
                ].map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <div key={i} className="group bg-background rounded-xl p-6 border border-border/50 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <IconComp className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Por que entrar em contato */}
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Por Que Falar Conosco?
              </h2>

              <div className="space-y-3">
                {[
                  "Orçamento gratuito e sem compromisso",
                  "Você fala direto com o técnico, sem call center",
                  "Atendimento mesmo para dúvidas simples",
                  "Resposta rápida via WhatsApp",
                  "Agendamento flexível conforme sua disponibilidade",
                  "Serviços a partir de R$ 69,99",
                ].map((item, index) => (
                  <div key={index} className="group flex items-center gap-3 bg-secondary rounded-lg p-4 border border-border/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--glow-accent)/0.15),transparent_70%)] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para Resolver seu Problema?
              </h2>
              <p className="text-white/80 mb-6">
                Não perca mais tempo. Fale agora com um técnico de informática e volte a usar seu computador.
              </p>
              <Button
                  variant="heroWhatsapp"
                  size="lg"
                  className="animate-pulse-soft"
                  asChild
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Agora
                  </a>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <RealImageSection imageKey="clienteSatisfeito" caption="Atendimento humanizado e profissional" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Contato;
