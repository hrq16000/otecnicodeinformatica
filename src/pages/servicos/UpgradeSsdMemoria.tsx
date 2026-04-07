import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { HardDrive, CheckCircle, Zap, TrendingUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";

const UpgradeSsdMemoria = () => {
  useEffect(() => {
    document.title = "Upgrade SSD e Memória RAM em Curitiba | Notebook e PC - Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Upgrade de SSD e memória RAM em Curitiba. Deixe seu notebook ou PC até 10x mais rápido. Instalação profissional com garantia. Atendimento domiciliar.");
    }
    trackPageView("/servicos/upgrade-ssd-memoria", "Upgrade SSD e Memória");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "upgrade-ssd-memoria");
    const message = encodeURIComponent("Olá! Quero fazer upgrade de SSD/memória no meu computador. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Upgrade SSD e Memória RAM em Curitiba | Notebook e PC - Técnico Curitiba" description="Upgrade de SSD e memória RAM em Curitiba. Deixe seu notebook ou PC até 10x mais rápido. Instalação profissional com garantia. Atendimento domiciliar." path="/servicos/upgrade-ssd-memoria" />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Upgrade SSD e Memória" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Performance Máxima</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Upgrade de SSD e Memória RAM em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto fade-section">
              Deixe seu computador ou notebook até 10x mais rápido com upgrade de SSD e memória RAM. Instalação profissional com migração de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-section">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo de Performance */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Diferença de Performance: HD vs SSD
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-secondary p-8 rounded-xl border-l-4 border-red-500 stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10">
                <h3 className="text-xl font-bold text-red-500 mb-4">Com HD Tradicional</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>⏱️ Windows inicia em 2-3 minutos</li>
                  <li>⏱️ Programas demoram para abrir</li>
                  <li>⏱️ Transferência de arquivos lenta</li>
                  <li>⏱️ Travamentos frequentes</li>
                  <li>🔊 Ruído mecânico do disco</li>
                </ul>
              </div>
              <div className="group bg-secondary p-8 rounded-xl border-l-4 border-accent stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10" style={{ animationDelay: '80ms' }}>
                <h3 className="text-xl font-bold text-accent mb-4">Com SSD</h3>
                <ul className="space-y-3 text-foreground">
                  <li>⚡ Windows inicia em 15-30 segundos</li>
                  <li>⚡ Programas abrem instantaneamente</li>
                  <li>⚡ Transferência até 10x mais rápida</li>
                  <li>⚡ Desempenho fluido e estável</li>
                  <li>🔇 Operação silenciosa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Upgrade */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Opções de Upgrade
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: HardDrive, title: "SSD SATA", desc: "Ideal para notebooks e PCs mais antigos. Até 550MB/s de velocidade.", price: "A partir de R$299", sub: "SSD 240GB + instalação", featured: false },
              { icon: HardDrive, title: "SSD NVMe", desc: "Máxima velocidade para notebooks e PCs modernos. Até 3.500MB/s.", price: "A partir de R$399", sub: "SSD NVMe 256GB + instalação", featured: true },
              { icon: TrendingUp, title: "Memória RAM", desc: "Mais memória para multitarefas e programas pesados.", price: "A partir de R$199", sub: "8GB DDR4 + instalação", featured: false },
            ].map((item, index) => (
              <div key={index} className={`group text-center p-6 bg-background rounded-xl stagger-item transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.featured ? 'border-2 border-accent shadow-[0_0_24px_hsl(var(--accent)/0.15)]' : ''}`} style={{ animationDelay: `${index * 80}ms` }}>
                <item.icon className="h-12 w-12 text-accent mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <p className="text-2xl font-bold text-accent">{item.price}</p>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Benefícios do Upgrade
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "10x Mais Rápido", desc: "Boot e programas instantâneos" },
              { title: "Sem Travamentos", desc: "Multitarefas fluido" },
              { title: "Maior Durabilidade", desc: "SSD não tem peças móveis" },
              { title: "Economia de Energia", desc: "Mais autonomia no notebook" },
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 bg-secondary rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" style={{ animationDelay: `${index * 80}ms` }}>
                <Zap className="h-10 w-10 text-accent mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            O Que Está Incluso
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Diagnóstico de compatibilidade",
              "SSD ou memória RAM de qualidade",
              "Clonagem/migração de dados",
              "Instalação profissional",
              "Testes de funcionamento",
              "Garantia de 12 meses",
              "Atendimento domiciliar",
              "Suporte pós-upgrade",
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Meu notebook suporta upgrade?", a: "A maioria dos notebooks suporta upgrade de SSD e/ou memória RAM. Fazemos diagnóstico gratuito para verificar compatibilidade." },
              { q: "Vou perder meus dados?", a: "Não! Fazemos clonagem completa do HD para o SSD. Todos os seus programas, arquivos e configurações são preservados." },
              { q: "Quanto tempo demora o serviço?", a: "O upgrade leva de 1 a 3 horas, dependendo da quantidade de dados para migrar." },
              { q: "Qual a diferença entre SATA e NVMe?", a: "O SSD NVMe é até 6x mais rápido que o SATA, mas requer slot M.2 disponível. Verificamos qual opção é melhor para seu equipamento." },
              { q: "Posso fazer upgrade de notebook antigo?", a: "Sim! Notebooks mais antigos podem receber SSD SATA e, dependendo do modelo, mais memória RAM." },
            ].map((item, index) => (
              <div key={index} className="group bg-secondary p-6 rounded-xl stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-breathe" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Deixe Seu Computador Mais Rápido Hoje!
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Solicite um orçamento sem compromisso e descubra como deixar seu computador voando!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar Orçamento
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8 reveal-text">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/servicos/conserto-pc-notebook" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Conserto de Hardware
            </Link>
            <Link to="/servicos/formatacao-computador" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Formatação
            </Link>
            <Link to="/servicos/montagem-pc" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Montagem de PC
            </Link>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="componentesSsd" secondaryImageKey="placaMae" layout="duo" caption="SSD e memória RAM para upgrade" secondaryCaption="Diagnóstico de placa-mãe para compatibilidade" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default UpgradeSsdMemoria;
