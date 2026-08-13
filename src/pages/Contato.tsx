import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { GarantiaNotaFiscalPagamento } from "@/components/comercial/GarantiaNotaFiscalPagamento";
import { QrContatoBlock } from "@/components/contato/QrContatoBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { FloatingParticles } from "@/components/FloatingParticles";
import { AnimatedSection } from "@/components/AnimatedSection";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, MapPin, Mail, CheckCircle } from "lucide-react";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";
import { BUSINESS_HOURS, BUSINESS_HOURS_CONFIGURED } from "@/lib/config/contact";

const WHATSAPP_NUMBER = WA_NUMBER;
const WHATSAPP_MESSAGE =
  "Olá! Quero um orçamento. Vou descrever o equipamento e o que está acontecendo com ele.";

const Contato = () => {
  useEffect(() => {
    document.title = "Contato | Fale com o Técnico de Informática em Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Descreva o problema do seu notebook, computador ou rede pelo WhatsApp e receba a modalidade indicada, o prazo e o valor antes da execução."
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
      <PageSEO title="Contato | Fale com o Técnico de Informática em Curitiba" description="Descreva o problema do seu notebook, computador ou rede pelo WhatsApp e receba a modalidade indicada, o prazo e o valor antes da execução." path="/contato" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }]} />
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={25} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(var(--glow-whatsapp)/0.08)] blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-24">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white/90 mb-6 border border-white/15 shimmer">
                  <MessageCircle className="h-4 w-4 text-accent" />
                  <span>Atendimento por WhatsApp</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5">
                  <span className="block">Fale com o técnico</span>
                  <span className="block gradient-text-animated">e descreva o problema</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  O contato é o começo da triagem, não um formulário perdido. Conte o equipamento e
                  o sintoma; a partir daí definimos a modalidade, o prazo e o valor — sempre antes
                  de executar qualquer coisa.
                </p>
                <div className="glow-separator max-w-[200px] mx-auto mt-6" />
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* Contatos Principais */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-10 right-0 w-80 h-80 bg-[hsl(var(--glow-whatsapp)/0.06)] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
             <div className="max-w-2xl mx-auto">
                {/* WhatsApp */}
                <div className="group glass-card gradient-border rounded-2xl p-8 text-center hover:shadow-[var(--shadow-xl)] transition-all duration-300">
                  <div className="bg-[hsl(var(--whatsapp))] rounded-full p-4 w-fit mx-auto mb-4 group-hover:shadow-[0_0_28px_hsl(var(--glow-whatsapp)/0.4)] transition-all duration-300">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">WhatsApp</h2>
                  <p className="text-muted-foreground mb-4">
                    Canal único de atendimento. Descreva o equipamento, o sintoma e desde quando
                    acontece — isso adianta a triagem.
                  </p>
                  <Button variant="whatsapp" size="lg" className="w-full" asChild>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Iniciar atendimento
                    </a>
                  </Button>
                </div>
            </div>
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center reveal-text">
                Antes de mandar a mensagem
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ...(BUSINESS_HOURS_CONFIGURED
                    ? [
                        {
                          icon: Clock,
                          title: "Horário de atendimento",
                          content: (
                            <>
                              {BUSINESS_HOURS.map((h) => (
                                <span key={`${h.days.join()}-${h.opens}`} className="block">
                                  {h.days.join(", ")}: {h.opens} às {h.closes}
                                </span>
                              ))}
                            </>
                          ),
                        },
                      ]
                    : []),
                  {
                    icon: MapPin,
                    title: "Onde atendemos",
                    content: (
                      <>
                        Curitiba e São José dos Pinhais.
                        <br />
                        Demais municípios da Região Metropolitana conforme a modalidade.
                        <br />
                        <span className="text-accent font-medium">
                          Casos de software podem ser resolvidos remotamente.
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "O que enviar na primeira mensagem",
                    content: (
                      <>
                        Equipamento e marca, o que acontece, desde quando e se houve queda,
                        líquido ou atualização recente.
                        <br />
                        <span className="text-accent font-medium">
                          Quanto mais claro o sintoma, mais rápida a triagem.
                        </span>
                      </>
                    ),
                  },
                ].map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <div key={i} className="group glass-card gradient-border rounded-xl p-6 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)] transition-all duration-300" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <IconComp className="h-6 w-6 text-accent transition-transform duration-300" />
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
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Por Que Falar Conosco?
              </h2>

              <div className="space-y-3">
                {[
                  "Estimativa inicial sem compromisso pelo WhatsApp",
                  "Você fala direto com o técnico, sem call center",
                  "Triagem que organiza o seu pedido antes do diagnóstico",
                  "Atendimento em Curitiba e região metropolitana",
                  "Valor informado antes de qualquer execução",
                  "Foco em informática: notebook, PC, redes e suporte empresarial",
                ].map((item, index) => (
                  <div key={index} className="group flex items-center gap-3 glass-card gradient-border rounded-lg p-4 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 transition-transform duration-300" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-8 md:py-10 bg-primary relative overflow-hidden">
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
                  className=""
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
      <div className="container mx-auto px-4 pb-4">
        <QrContatoBlock location="contato" />
      </div>
      <GarantiaNotaFiscalPagamento compact />

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default Contato;
