import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { RealImageSection } from "@/components/RealImageSection";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { Link } from "react-router-dom";
import { Cpu, CheckCircle, AlertCircle, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const tiposPlaca = [
  { titulo: "Placa-mãe de desktop", desc: "Trilhas queimadas, capacitores estufados, VRM danificado, socket com pino torto. Diagnóstico com multímetro e osciloscópio.", prazo: "7-30 dias" },
  { titulo: "Placa-mãe de notebook", desc: "Curto-circuito, chip BGA com solda fria, reguladores de tensão queimados. Pode exigir reballing.", prazo: "15-45 dias" },
  { titulo: "Placa de vídeo (GPU)", desc: "Artefatos na tela, sem imagem, superaquecimento. GPU com desgaste, VRAM defeituosa ou VRM queimado.", prazo: "15-60 dias" },
  { titulo: "Placa-fonte de TV/monitor", desc: "Capacitores estufados, MOSFETs queimados, transformador danificado. Reparo em componentes SMD.", prazo: "7-20 dias" },
  { titulo: "Placas eletrônicas diversas", desc: "Inversores, placas de controle de eletrodomésticos, centrais automotivas, controladores industriais.", prazo: "Sob consulta" },
];

const ConsertoPlaca = () => {
  useEffect(() => {
    document.title = "Conserto de Placa Eletrônica em Curitiba | Placa-mãe, GPU, Fonte | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conserto de placa-mãe, placa de vídeo, placa-fonte e eletrônica em geral. Reparo em nível de componente em Curitiba. Diagnóstico profissional com coleta e entrega.");
    }
    trackPageView("/servicos/conserto-placa", "Conserto de Placa");
  }, []);

  const handleWhatsApp = () => {
    trackCTAClick("whatsapp", "conserto-placa");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Preciso de conserto de placa eletrônica. Podem avaliar?")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Conserto de Placa Eletrônica em Curitiba | Placa-mãe, GPU, Fonte | Técnico Curitiba" description="Conserto de placa-mãe, placa de vídeo, placa-fonte e eletrônica em geral. Reparo em nível de componente em Curitiba. Diagnóstico profissional com coleta e entrega." path="/servicos/conserto-placa" />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Conserto de Placa" }]} />

      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Cpu className="h-5 w-5" />
              <span className="font-medium">Reparo em Nível de Componente</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Conserto de Placa Eletrônica em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Reparo profissional de placas-mãe, GPU, fontes e eletrônica em geral. Diagnóstico com equipamento especializado e técnico experiente.
            </p>
            <div className="reveal-text" data-reveal-delay="200">
              <Button size="lg" variant="cta" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" /> Preciso Consertar uma Placa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Aviso */}
      <section className="py-6 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <PrecoVisitaTecnica tipo="coleta" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">⚡ Serviço de laboratório:</strong> Conserto de placa exige bancada, equipamentos de precisão e tempo de análise. 
              O prazo varia de 7 a 60 dias conforme a complexidade.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section className="py-12 md:py-16 bg-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center reveal-text">
              Tipos de Placas que Consertamos
            </h2>
            <div className="space-y-4">
              {tiposPlaca.map((tipo, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border flex flex-col sm:flex-row gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-accent/20 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{tipo.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{tipo.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full h-fit whitespace-nowrap">
                    <Clock className="h-3 w-3" /> {tipo.prazo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="placaMae" secondaryImageKey="diagnostico" layout="duo" caption="Placa-mãe em diagnóstico" secondaryCaption="Reparo em nível de componente" />

      {/* Casos complexos */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center reveal-text">Casos Complexos que Atendemos</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Reballing de chip BGA",
                "Curto-circuito em placa-mãe",
                "GPU com artefatos visuais",
                "Placa de notebook após líquido",
                "Capacitores estufados",
                "Reparo de VRM e reguladores",
                "Dano por upgrade mal executado",
                "Placa pós-mineração (desgaste)",
                "Substituição de chip BIOS",
              ].map((caso, i) => (
                <div key={caso} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm border border-border hover:-translate-y-0.5 hover:shadow-md hover:border-accent/20 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 50}ms` }}>
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-foreground">{caso}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-destructive/5 border border-destructive/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Transparência no Reparo de Placas</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Reparar placas eletrônicas é um serviço especializado. Alguns pontos importantes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Nem toda placa é reparável.</strong> Se o dano for extenso ou o custo superar o valor de reposição, avisamos antes.</li>
                <li><strong className="text-foreground">Diagnóstico é sempre pago</strong> (R$ 90). Se não houver viabilidade, você paga apenas o diagnóstico.</li>
                <li><strong className="text-foreground">Prazos variam muito.</strong> Peças importadas, componentes raros ou reballing podem levar semanas.</li>
                <li><strong className="text-foreground">Garantia limitada ao componente.</strong> Placas reparadas têm garantia do reparo, mas componentes adjacentes podem falhar depois.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">Páginas Relacionadas</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Conserto de PC/Notebook", to: "/servicos/conserto-pc-notebook" },
                { label: "Manutenção de TV", to: "/servicos/manutencao-tv" },
                { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
                { label: "Problemas Reais e Casos", to: "/problemas-reais-e-casos" },
                { label: "Coleta e Entrega", to: "/coleta-e-entrega" },
                { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm font-medium text-foreground hover:text-accent hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <ArrowRight className="h-4 w-4 text-accent" />{link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 reveal-text">Placa Com Defeito?</h2>
          <p className="text-white/80 mb-6">Envie fotos e descrição do problema. Orientamos pelo WhatsApp sobre viabilidade e prazo.</p>
          <Button size="lg" variant="cta" onClick={handleWhatsApp}>
            <MessageCircle className="mr-2 h-5 w-5" /> Enviar Detalhes para Avaliação
          </Button>
        </div>
      </section>

      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default ConsertoPlaca;
