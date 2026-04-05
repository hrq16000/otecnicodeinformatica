import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Monitor, CheckCircle, Clock, Shield, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";
const PHONE_NUMBER = "5541992671754";

const FormatacaoComputador = () => {
  useEffect(() => {
    document.title = "Formatação de Computador em Curitiba | Windows 10/11 - Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Formatação de computador e notebook em Curitiba. Instalação Windows 10/11, drivers, programas essenciais. Atendimento domiciliar. A partir de R$99,99.");
    }
    trackPageView("/servicos/formatacao-computador", "Formatação de Computador");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "formatacao-computador");
    const message = encodeURIComponent("Olá! Preciso de formatação de computador. Qual a disponibilidade?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handlePhoneClick = () => {
    trackCTAClick("phone", "formatacao-computador");
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Formatação de Computador" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Monitor className="h-5 w-5" />
              <span className="font-medium">Serviço Especializado</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Formatação de Computador em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Reinstalação completa do Windows 10/11 com drivers, programas essenciais e backup dos seus dados. Atendimento domiciliar em toda Curitiba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Agendar Formatação
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handlePhoneClick}>
                <Phone className="mr-2 h-5 w-5" />
                (41) 99267-1754
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preço Destaque */}
      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary">
            Formatação completa a partir de <span className="text-accent">R$ 99,99</span>
          </p>
          <p className="text-muted-foreground mt-2">Inclui Windows, drivers e programas básicos</p>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="flex gap-4 p-4 bg-secondary rounded-xl">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quando formatar */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <ArrowRight className="h-5 w-5 text-accent" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Como Funciona o Serviço?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Agendamento", desc: "Entre em contato via WhatsApp e agende a visita" },
              { step: "2", title: "Backup", desc: "Salvamos todos os seus arquivos importantes" },
              { step: "3", title: "Formatação", desc: "Instalamos o Windows e todos os programas" },
              { step: "4", title: "Entrega", desc: "Computador pronto e otimizado para uso" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-secondary rounded-xl">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="bg-background p-6 rounded-xl">
                <h3 className="font-bold text-primary mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Precisa Formatar Seu Computador?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e agende sua formatação. Atendimento rápido em toda Curitiba!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Agendar Formatação Agora
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/servicos/remocao-virus" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Remoção de Vírus
            </Link>
            <Link to="/servicos/upgrade-ssd-memoria" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Upgrade SSD
            </Link>
            <Link to="/servicos/backup-recuperacao" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Backup de Dados
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default FormatacaoComputador;
