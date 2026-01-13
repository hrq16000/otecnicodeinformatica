import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Clock, MapPin, Mail, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";
const PHONE_NUMBER = "5541997452053";
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
  const phoneUrl = `tel:+${PHONE_NUMBER}`;

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "contato-principal");
  };

  const handlePhoneClick = () => {
    trackCTAClick("phone", "contato-principal");
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Fale Conosco
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Precisa de suporte técnico? Entre em contato agora mesmo e resolva seu problema rapidamente.
              </p>
            </div>
          </div>
        </section>

        {/* Contatos Principais */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* WhatsApp */}
                <div className="bg-secondary rounded-2xl p-8 text-center border-2 border-transparent hover:border-whatsapp/30 transition-all">
                  <div className="bg-whatsapp rounded-full p-4 w-fit mx-auto mb-4">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">WhatsApp</h2>
                  <p className="text-muted-foreground mb-4">
                    Resposta rápida e atendimento imediato
                  </p>
                  <p className="text-xl font-bold text-foreground mb-4">(41) 9.9745-2053</p>
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

                {/* Telefone */}
                <div className="bg-secondary rounded-2xl p-8 text-center border-2 border-transparent hover:border-accent/30 transition-all">
                  <div className="bg-accent rounded-full p-4 w-fit mx-auto mb-4">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Telefone</h2>
                  <p className="text-muted-foreground mb-4">
                    Ligue diretamente para o técnico
                  </p>
                  <p className="text-xl font-bold text-foreground mb-4">(41) 9.9745-2053</p>
                  <Button variant="cta" size="lg" className="w-full" asChild>
                    <a href={phoneUrl} onClick={handlePhoneClick}>
                      <Phone className="h-5 w-5" />
                      Ligar Agora
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Informações de Atendimento
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-accent" />
                    <h3 className="font-semibold text-foreground">Horário</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h<br />
                    <span className="text-accent font-medium">Urgências via WhatsApp</span>
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-6 w-6 text-accent" />
                    <h3 className="font-semibold text-foreground">Área de Atendimento</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Curitiba e toda região metropolitana<br />
                    São José dos Pinhais<br />
                    <span className="text-accent font-medium">Atendimento remoto para todo Brasil</span>
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-6 w-6 text-accent" />
                    <h3 className="font-semibold text-foreground">Resposta Rápida</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Respondemos em até 30 minutos durante o horário comercial.<br />
                    <span className="text-accent font-medium">WhatsApp é o canal mais rápido</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que entrar em contato */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Por Que Falar Conosco?
              </h2>

              <div className="space-y-3">
                {[
                  "Orçamento gratuito e sem compromisso",
                  "Você fala direto com o técnico, sem call center",
                  "Atendimento mesmo para dúvidas simples",
                  "Resposta rápida via WhatsApp",
                  "Agendamento flexível conforme sua disponibilidade",
                  "Serviços a partir de R$ 99,99",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-secondary rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para Resolver seu Problema?
              </h2>
              <p className="text-white/80 mb-6">
                Não perca mais tempo. Fale agora com um técnico de informática e volte a usar seu computador.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <Button variant="heroCta" size="lg" asChild>
                  <a href={phoneUrl} onClick={handlePhoneClick}>
                    <Phone className="h-5 w-5" />
                    Ligar Agora
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Contato;
