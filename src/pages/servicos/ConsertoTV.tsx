import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { AnimatedSection } from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { IMAGES } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Link } from "react-router-dom";
import {
  MessageCircle, Tv, Shield, Clock, CheckCircle,
  AlertTriangle, ArrowRight, MapPin, Wrench, Users, Truck
} from "lucide-react";
import {
  COLETA_TAXA_MINIMA_LABEL,
  PRAZO_LONGO,
  REGRA_ESTIMATIVA_GRATIS,
  REGRA_COLETA_SEM_VISITA,
  MSG_COLETA_RESUMO,
} from "@/lib/coletaConfig";

const WHATSAPP_NUMBER = "5541997086380";

const marcasAtendidas = [
  "Samsung", "LG", "Sony", "TCL", "Philips", "AOC", "Philco",
  "Panasonic", "Semp", "Hisense", "Toshiba", "JVC"
];

const problemasComuns = [
  { titulo: "TV não liga", descricao: "Pode ser problema na fonte de alimentação, placa principal ou fusível interno." },
  { titulo: "Tela escura com som", descricao: "Defeito no backlight (LED), inverter ou placa T-CON." },
  { titulo: "Imagem com listras ou manchas", descricao: "Problema na placa T-CON, flat cable ou painel LCD/LED." },
  { titulo: "TV liga e desliga sozinha", descricao: "Capacitores danificados na fonte ou falha no software interno." },
  { titulo: "Sem sinal HDMI", descricao: "Defeito na porta HDMI, placa principal ou configuração do sistema." },
  { titulo: "Smart TV travando", descricao: "Memória cheia, firmware desatualizado ou problema no processador interno." },
];

const cidades = [
  { nome: "Curitiba", slug: "curitiba" },
  { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
  { nome: "Araucária", slug: "araucaria" },
  { nome: "Colombo", slug: "colombo" },
  { nome: "Pinhais", slug: "pinhais" },
  { nome: "Campo Largo", slug: "campo-largo" },
  { nome: "Fazenda Rio Grande", slug: "fazenda-rio-grande" },
  { nome: "Almirante Tamandaré", slug: "almirante-tamandare" },
  { nome: "Piraquara", slug: "piraquara" },
  { nome: "Campo Magro", slug: "campo-magro" },
  { nome: "Quatro Barras", slug: "quatro-barras" },
];

const ConsertoTV = () => {
  useEffect(() => {
    document.title = "Conserto de TV em Curitiba e Região | Atendimento sem Compromisso | Técnico Curitiba";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Conserto de TV LED, LCD, OLED e Smart TV em Curitiba e região metropolitana. atendimento humanizado sem compromisso. Samsung, LG, Sony, TCL e todas as marcas.");
    trackPageView("/servicos/conserto-tv", "Conserto de TV");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "conserto-tv");
    const msg = encodeURIComponent("Olá! Preciso de atendimento para conserto de TV. Qual o procedimento?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Conserto de TV",
    description: "Serviço de conserto de TV LED, LCD, OLED e Smart TV em Curitiba e região metropolitana.",
    provider: {
      "@type": "LocalBusiness",
      name: "Técnico Curitiba",
    },
    areaServed: { "@type": "City", name: "Curitiba" },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO noindex
        title="Conserto de TV em Curitiba e Região | Atendimento sem Compromisso"
        description="Conserto de TV LED, LCD, OLED e Smart TV. atendimento humanizado. Samsung, LG, Sony, TCL e todas as marcas."
        path="/servicos/conserto-tv"
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Conserto de TV", path: "/servicos/conserto-tv" }]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Conserto de TV" }]} />

      {/* Hero */}
      <section className="pt-10 pb-10 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Tv className="h-5 w-5" />
              <span className="font-medium">Conserto de TV – Todas as Marcas</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Conserto de TV em Curitiba e Região Metropolitana
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {REGRA_ESTIMATIVA_GRATIS}. Coleta e entrega disponível para toda a região.
            </p>

            <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Truck className="h-5 w-5" />
                <span className="font-bold text-sm">COLETA E ENTREGA</span>
              </div>
              <p className="text-white/90 text-sm">
                {MSG_COLETA_RESUMO} Prazo para TV: <strong>{PRAZO_LONGO}</strong>.
              </p>
            </div>

            <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Solicitar atendimento via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <AnimatedSection>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
              Como Funciona o Conserto de TV
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { step: "1", titulo: "Contato pelo WhatsApp", desc: `Descreva o problema da sua TV e envie fotos. ${REGRA_ESTIMATIVA_GRATIS}.` },
                { step: "2", titulo: "Coleta ou Entrega", desc: `Organizamos coleta no seu endereço ou você traz à oficina. Taxa mínima ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada.` },
                { step: "3", titulo: "Diagnóstico e valor", desc: "Diagnóstico completo em bancada. valor preciso somente após coleta." },
                { step: "4", titulo: "Reparo e Devolução", desc: `Após aprovação, realizamos o conserto e devolvemos. Prazo: ${PRAZO_LONGO}.` },
              ].map((p, i) => (
                <div key={i} className="text-center p-6 bg-secondary rounded-xl">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{p.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Problemas comuns */}
      <AnimatedSection>
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
              Problemas Mais Comuns em TVs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {problemasComuns.map((p, i) => (
                <div key={i} className="bg-background p-6 rounded-xl">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-accent" />
                    {p.titulo}
                  </h3>
                  <p className="text-muted-foreground text-sm">{p.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Marcas */}
      <AnimatedSection>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-8">
              Marcas Atendidas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {marcasAtendidas.map((marca, i) => (
                <span key={i} className="px-5 py-3 bg-secondary rounded-lg font-medium text-foreground">
                  {marca}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Diferenciais */}
      <AnimatedSection>
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
              Por Que Escolher Nosso Conserto de TV
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Users, titulo: "Atendimento Humanizado", desc: "Explicamos o problema com clareza, sem jargão técnico. Você entende antes de aprovar." },
                { icon: Shield, titulo: "Garantia no Serviço", desc: "Todo reparo conta com garantia. Se o problema voltar, consertamos novamente." },
                { icon: CheckCircle, titulo: "Valor Transparente", desc: "Informamos o valor exato antes de qualquer execução. Sem surpresas na hora de pagar." },
                { icon: Clock, titulo: "Prazo Informado", desc: `Prazo para TV: ${PRAZO_LONGO}. Atualizações por WhatsApp.` },
              ].map((d, i) => (
                <div key={i} className="text-center p-6 bg-background rounded-xl">
                  <d.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{d.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
              Perguntas Frequentes – Conserto de TV
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Vocês fazem visita técnica para TV?", a: `Não. ${REGRA_COLETA_SEM_VISITA} Organizamos coleta e entrega com taxa mínima de ${COLETA_TAXA_MINIMA_LABEL}.` },
                { q: "Quanto custa o conserto de TV?", a: `${REGRA_ESTIMATIVA_GRATIS}. valor preciso somente após coleta, com taxa mínima de ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada.` },
                { q: "Consertam TV de tela quebrada?", a: "Avaliamos caso a caso. Em muitos modelos, a troca do painel tem custo próximo ao de uma TV nova. Orientamos com honestidade." },
                { q: "Quanto tempo leva o conserto?", a: `Prazo padrão para TV: ${PRAZO_LONGO}, dependendo do defeito e disponibilidade de peças.` },
                { q: "Quais formas de pagamento?", a: "PIX, dinheiro e cartão. Consulte condições pelo WhatsApp." },
                { q: "A garantia cobre o quê?", a: "Cobre o serviço realizado e a peça trocada. O prazo varia conforme o tipo de reparo." },
              ].map((faq, i) => (
                <div key={i} className="bg-secondary p-6 rounded-xl">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Cidades */}
      <AnimatedSection>
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
              Conserto de TV por Cidade
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {cidades.map((c, i) => (
                <Link
                  key={i}
                  to={`/servicos/conserto-tv/${c.slug}`}
                  className="px-5 py-3 bg-background rounded-lg hover:bg-accent/20 transition-colors text-foreground"
                >
                  Conserto de TV em {c.nome}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Sua TV com Defeito? Solicite um valor
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato pelo WhatsApp e descreva o problema. Atendimento humanizado, valor transparente e sem compromisso.
          </p>
          <Button size="lg" variant="whatsapp" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar atendimento pelo WhatsApp
          </Button>
        </div>
      </section>

      <BlocoInteligencia />
      <Footer />
    </div>
  );
};

export default ConsertoTV;
