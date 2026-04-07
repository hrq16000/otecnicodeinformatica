import { useEffect } from "react";
import { IMAGES } from "@/lib/images";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, ArrowRight, Truck, Shield, Clock, CheckCircle2,
  MapPin, Package, AlertTriangle, Phone,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_NUMBER = "5541997452053";

const ColetaEntrega = () => {
  useEffect(() => {
    document.title = "Coleta e Entrega de Equipamentos | Assistência Técnica Curitiba";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content",
        "Serviço de coleta e entrega de computadores, notebooks e TVs em Curitiba e região metropolitana. Logística segura, rastreamento e garantia no transporte."
      );
    }
    trackPageView("/coleta-e-entrega", "Coleta e Entrega");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Preciso do serviço de coleta e entrega para meu equipamento.")}`;
  const handleCTA = (label: string) => trackCTAClick("whatsapp", `coleta-${label}`);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.lovable.app/" },
          { "@type": "ListItem", position: 2, name: "Coleta e Entrega", item: "https://tecnicocuritiba.lovable.app/coleta-e-entrega" },
        ],
      })}} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Coleta e Entrega" }]} />

      <main>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-14 md:pt-32 md:pb-20">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Coleta e Entrega de Equipamentos em Curitiba
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Não pode trazer seu equipamento? Nós buscamos na sua casa ou empresa, realizamos o serviço em laboratório e devolvemos funcionando. Comodidade total com segurança.
              </p>
              <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("hero")}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Agendar Coleta
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Imagem coleta */}
        <section className="py-0 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto -mt-8 relative z-20">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={IMAGES.coletaEntrega} alt={IMAGES.coletaEntregaAlt} className="w-full h-48 md:h-64 object-cover" loading="eager" width="800" height="400" />
              </div>
            </div>
          </div>
        </section>

        {/* QUANDO É NECESSÁRIO */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Quando a Coleta e Entrega É Necessária?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Nem todo reparo pode ser feito no local. Alguns serviços exigem <strong className="text-foreground">bancada de laboratório</strong>, ferramentas especializadas ou tempo estendido de diagnóstico. Nesses casos, a coleta e entrega é a solução ideal.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[
                  "Reparo de placa mãe com micro-solda",
                  "Troca de tela de notebook ou TV",
                  "Recuperação de dados de HD danificado",
                  "Diagnóstico complexo (múltiplos componentes)",
                  "Limpeza ultrassônica de placa após líquido",
                  "Reballing ou reflow de GPU",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-secondary rounded-lg p-4">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Como Funciona o Processo
              </h2>
              <div className="space-y-0">
                {[
                  { icon: Phone, title: "1. Contato Inicial", desc: "Você descreve o problema via WhatsApp. O técnico avalia se é necessário levar para laboratório e informa o valor pré-aprovado." },
                  { icon: Truck, title: "2. Coleta no Local", desc: "Agendamos a coleta no seu endereço, em horário conveniente. O equipamento é embalado com proteção profissional para transporte seguro." },
                  { icon: Shield, title: "3. Diagnóstico e Aprovação", desc: "Em laboratório, o técnico realiza diagnóstico completo. Se estiver dentro do valor pré-aprovado (R$ 300 a R$ 400), o reparo é realizado. Acima disso, consultamos antes." },
                  { icon: Package, title: "4. Entrega com Garantia", desc: "Equipamento reparado, testado e devolvido no seu endereço. Garantia por escrito de todo o serviço realizado." },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="relative flex gap-4 md:gap-6">
                      {i < 3 && <div className="absolute left-5 md:left-6 top-14 bottom-0 w-0.5 bg-border" />}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="bg-accent text-accent-foreground rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                      </div>
                      <div className="pb-10 md:pb-12 flex-1">
                        <div className="bg-background rounded-xl p-5 md:p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-accent" />
                            <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SEGURANÇA */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Segurança no Transporte
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Embalagem Profissional", desc: "Cada equipamento é embalado com proteção anti-impacto, espuma e plástico bolha profissional." },
                  { icon: MapPin, title: "Transporte Dedicado", desc: "O equipamento vai direto do seu endereço ao laboratório, sem escalas ou depósitos intermediários." },
                  { icon: Clock, title: "Prazo Informado", desc: "O prazo médio é de 15 a 60 dias, dependendo da complexidade. Mantemos você informado em cada etapa." },
                  { icon: CheckCircle2, title: "Recibo de Entrega", desc: "Emitimos recibo detalhado na coleta com descrição do equipamento, acessórios e estado de conservação." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-secondary rounded-xl p-5 flex gap-4">
                      <div className="bg-primary rounded-lg p-2 h-fit flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* REGIÕES */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
                Regiões Atendidas para Coleta e Entrega
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Coletamos e entregamos em toda Curitiba e região metropolitana:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Curitiba", "São José dos Pinhais", "Pinhais", "Araucária", "Campo Largo", "Colombo", "Almirante Tamandaré", "Fazenda Rio Grande"].map((cidade, i) => (
                  <div key={i} className="bg-background rounded-lg p-3 text-center">
                    <MapPin className="h-4 w-4 text-accent mx-auto mb-1" />
                    <span className="text-sm font-medium text-primary">{cidade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Quanto Custa a Coleta e Entrega?
              </h2>
              <div className="bg-secondary rounded-2xl p-6 md:p-8 border-2 border-accent/20 text-center">
                <p className="text-muted-foreground mb-4">
                  A coleta e entrega está <strong className="text-accent">inclusa no valor do reparo</strong> quando o serviço é aprovado. Em caso de desistência do reparo, o custo do diagnóstico (R$ 90 a R$ 100) cobre também a logística.
                </p>
                <div className="bg-accent/10 rounded-xl p-4 mb-6">
                  <p className="text-sm text-foreground font-medium">
                    Valor pré-aprovado padrão: <strong className="text-accent">R$ 300 a R$ 400</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reparos dentro desse valor são executados automaticamente. Acima, consultamos antes.
                  </p>
                </div>
                <Button variant="cta" size="lg" asChild>
                  <Link to="/valores">
                    Ver Tabela de Preços <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Perguntas Frequentes
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { q: "A coleta é gratuita?", a: "A coleta está inclusa quando o reparo é aprovado. Se desistir, paga apenas o valor do diagnóstico." },
                  { q: "Quanto tempo demora o reparo?", a: "O prazo médio é de 15 a 60 dias, dependendo da complexidade e disponibilidade de peças." },
                  { q: "Meu equipamento está seguro?", a: "Sim. Emitimos recibo detalhado na coleta e o transporte é feito com proteção profissional." },
                  { q: "Posso acompanhar o andamento?", a: "Sim! Mantemos contato via WhatsApp com atualizações sobre cada etapa do processo." },
                  { q: "E se eu desistir do reparo?", a: "Você paga apenas o valor do diagnóstico (R$ 90 a R$ 100) e devolvemos o equipamento." },
                  { q: "Atendem no fim de semana?", a: "As coletas são agendadas de segunda a sexta. Em casos urgentes, avaliamos disponibilidade no sábado." },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl border-none px-5">
                    <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-14 md:py-20 bg-primary">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Precisa de Coleta e Entrega?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Agende agora a coleta do seu equipamento. Sem complicação, com segurança e garantia.
            </p>
            <Button variant="heroWhatsapp" size="lg" asChild onClick={() => handleCTA("cta-final")}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Agendar Coleta pelo WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>

      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ColetaEntrega;
