import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Link } from "react-router-dom";
import { Monitor, CheckCircle, Clock, Shield, ArrowRight, MessageCircle } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const FormatacaoComputador = () => {
  useEffect(() => {
    document.title = "Formatação de Computador em Curitiba | Windows 10/11 - Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Formatação de computador e notebook em Curitiba. Instalação Windows 10/11, drivers, programas essenciais. Atendimento domiciliar. A partir de A partir de R$ 69,99.");
    }
    trackPageView("/servicos/formatacao-computador", "Formatação de Computador");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "formatacao-computador");
    const message = encodeURIComponent("Olá! Preciso de formatação de computador. Qual a disponibilidade?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Formatação de Computador em Curitiba | Windows 10/11 - Técnico Curitiba" description="Formatação de computador e notebook em Curitiba. Instalação Windows 10/11, drivers, programas essenciais. Atendimento domiciliar. A partir de A partir de R$ 69,99." path="/servicos/formatacao-computador" breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Formatação de Computador", path: "/servicos/formatacao-computador" }
      ]} />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Formatação de Computador" },
        ]}
      />
      
      <section className="relative pt-14 pb-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <FloatingParticles count={18} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-[120px] animate-breathe" />
          <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Monitor className="h-5 w-5" />
              <span className="font-medium">Serviço Especializado</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Formatação de Computador em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto fade-section">
              Reinstalação completa do Windows 10/11 com drivers, programas essenciais e backup dos seus dados. Atendimento domiciliar em toda Curitiba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-section">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Agendar Formatação
              </Button>
            </div>
          </div>
          <div className="glow-separator max-w-[160px] mx-auto mt-6" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
          </svg>
        </div>
      </section>
      <RealImageSection imageKey="tecnicoTrabalhando" caption="Formatação profissional com backup dos seus dados" />

      {/* Preço Destaque */}
      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary reveal-text">
            Formatação completa a partir de <span className="text-accent">R$ 69,99</span>
          </p>
          <p className="text-muted-foreground mt-2">Inclui Windows, drivers e programas básicos</p>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            O Que Está Incluso na Formatação?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Backup de Dados", desc: "Salvamos seus arquivos importantes antes de formatar" },
              { title: "Windows Original", desc: "Instalação do Windows 10 ou 11 original e atualizado" },
              { title: "Drivers Completos", desc: "Todos os drivers de hardware instalados e funcionando" },
              { title: "Programas Essenciais", desc: "Navegador, antivírus, Office, WinRAR e mais" },
              { title: "Otimização do Sistema", desc: "Configurações para máximo desempenho" },
              { title: "Restauração de Dados", desc: "Seus arquivos de volta no lugar certo" },
            ].map((item, index) => (
              <div key={index} className="group flex gap-4 p-4 glass-card gradient-border rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]" style={{ animationDelay: `${index * 60}ms` }}>
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="desktopMontado" caption="Computador pronto e otimizado após formatação" />

      {/* Quando formatar */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Quando Devo Formatar Meu Computador?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Computador extremamente lento mesmo após limpeza",
              "Vírus persistentes que não são removidos",
              "Erros constantes do Windows (tela azul, travamentos)",
              "Sistema operacional corrompido",
              "Acúmulo de programas desnecessários",
              "Venda ou troca do computador",
              "Upgrade de HD para SSD",
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <ArrowRight className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Como Funciona o Serviço?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Agendamento", desc: "Entre em contato via WhatsApp e agende a visita" },
              { step: "2", title: "Backup", desc: "Salvamos todos os seus arquivos importantes" },
              { step: "3", title: "Formatação", desc: "Instalamos o Windows e todos os programas" },
              { step: "4", title: "Entrega", desc: "Computador pronto e otimizado para uso" },
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 bg-secondary rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_16px_hsl(var(--accent)/0.3)]">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes sobre Formatação
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Quanto tempo demora a formatação?", a: "Em média, o serviço leva de 1 a 2 horas, dependendo da quantidade de dados para backup e do hardware do computador." },
              { q: "Vou perder meus arquivos?", a: "Não! Fazemos backup completo de todos os seus documentos, fotos, vídeos e arquivos importantes antes de formatar." },
              { q: "Qual Windows vocês instalam?", a: "Instalamos Windows 10 ou 11 original, de acordo com a compatibilidade do seu hardware e sua preferência." },
              { q: "Os programas vêm inclusos?", a: "Sim! Instalamos navegadores, antivírus, Office, WinRAR, Adobe Reader e outros programas essenciais." },
              { q: "Vocês atendem em domicílio?", a: "Sim! Atendemos em toda Curitiba e região metropolitana. Também oferecemos coleta e entrega." },
            ].map((item, index) => (
              <div key={index} className="group bg-background p-6 rounded-xl stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
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
            Precisa Formatar Seu Computador?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e agende sua formatação. Atendimento rápido em toda Curitiba!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Agendar Formatação Agora
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/servicos/remocao-virus" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Remoção de Vírus
            </Link>
            <Link to="/servicos/upgrade-ssd-memoria" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Upgrade SSD
            </Link>
            <Link to="/servicos/backup-recuperacao" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm">
              Backup de Dados
            </Link>
          </div>
        </div>
      </section>
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default FormatacaoComputador;
