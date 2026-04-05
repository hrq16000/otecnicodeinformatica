import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HardDrive, CheckCircle, Zap, TrendingUp, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";
const PHONE_NUMBER = "5541992671754";

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

  const handlePhoneClick = () => {
    trackCTAClick("phone", "upgrade-ssd-memoria");
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Upgrade SSD e Memória" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Performance Máxima</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Upgrade de SSD e Memória RAM em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Deixe seu computador ou notebook até 10x mais rápido com upgrade de SSD e memória RAM. Instalação profissional com migração de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handlePhoneClick}>
                <Phone className="mr-2 h-5 w-5" />
                (41) 99267-1754
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo de Performance */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Diferença de Performance: HD vs SSD
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary p-8 rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-500 mb-4">Com HD Tradicional</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>⏱️ Windows inicia em 2-3 minutos</li>
                  <li>⏱️ Programas demoram para abrir</li>
                  <li>⏱️ Transferência de arquivos lenta</li>
                  <li>⏱️ Travamentos frequentes</li>
                  <li>🔊 Ruído mecânico do disco</li>
                </ul>
              </div>
              <div className="bg-secondary p-8 rounded-xl border-l-4 border-accent">
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
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Opções de Upgrade
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl text-center">
              <HardDrive className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">SSD SATA</h3>
              <p className="text-muted-foreground mb-4">Ideal para notebooks e PCs mais antigos. Até 550MB/s de velocidade.</p>
              <p className="text-2xl font-bold text-accent">A partir de R$299</p>
              <p className="text-sm text-muted-foreground">SSD 240GB + instalação</p>
            </div>
            <div className="bg-background p-6 rounded-xl text-center border-2 border-accent">
              <HardDrive className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">SSD NVMe</h3>
              <p className="text-muted-foreground mb-4">Máxima velocidade para notebooks e PCs modernos. Até 3.500MB/s.</p>
              <p className="text-2xl font-bold text-accent">A partir de R$399</p>
              <p className="text-sm text-muted-foreground">SSD NVMe 256GB + instalação</p>
            </div>
            <div className="bg-background p-6 rounded-xl text-center">
              <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Memória RAM</h3>
              <p className="text-muted-foreground mb-4">Mais memória para multitarefas e programas pesados.</p>
              <p className="text-2xl font-bold text-accent">A partir de R$199</p>
              <p className="text-sm text-muted-foreground">8GB DDR4 + instalação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Benefícios do Upgrade
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "10x Mais Rápido", desc: "Boot e programas instantâneos" },
              { title: "Sem Travamentos", desc: "Multitarefas fluido" },
              { title: "Maior Durabilidade", desc: "SSD não tem peças móveis" },
              { title: "Economia de Energia", desc: "Mais autonomia no notebook" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-secondary rounded-xl">
                <Zap className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="bg-secondary p-6 rounded-xl">
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
            Deixe Seu Computador Mais Rápido Hoje!
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Solicite um orçamento sem compromisso e descubra como deixar seu computador voando!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar Orçamento
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
            <Link to="/servicos/conserto-pc-notebook" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Conserto de Hardware
            </Link>
            <Link to="/servicos/formatacao-computador" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Formatação
            </Link>
            <Link to="/servicos/montagem-pc" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-colors">
              Montagem de PC
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default UpgradeSsdMemoria;
