import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { Link } from "react-router-dom";
import { Wrench, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";

const ConsertoPcNotebook = () => {
  useEffect(() => {
    document.title = "Conserto de PC e Notebook em Curitiba | Hardware - Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conserto de computador e notebook em Curitiba. Reparo de hardware, placa-mãe, fonte, tela, teclado. Diagnóstico com coleta e entrega. Garantia.");
    }
    trackPageView("/servicos/conserto-pc-notebook", "Conserto de PC e Notebook");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "conserto-pc-notebook");
    const message = encodeURIComponent("Olá! Meu computador/notebook precisa de conserto. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Conserto de PC e Notebook em Curitiba | Hardware - Técnico Curitiba" description="Conserto de computador e notebook em Curitiba. Reparo de hardware, placa-mãe, fonte, tela, teclado. Diagnóstico com coleta e entrega. Garantia." path="/servicos/conserto-pc-notebook" />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Conserto de PC e Notebook" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Wrench className="h-5 w-5" />
              <span className="font-medium">Reparo Especializado</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Conserto de PC e Notebook em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto fade-section">
              Reparo de hardware profissional para computadores e notebooks. Diagnóstico preciso, peças de qualidade e garantia no serviço.
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

      {/* Aviso Coleta */}
      <section className="py-6 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <PrecoVisitaTecnica tipo="coleta" />
          </div>
        </div>
      </section>

      {/* Tipos de Conserto */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            O Que Consertamos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Placa-Mãe", desc: "Reparo de trilhas, capacitores e componentes" },
              { title: "Fonte de Alimentação", desc: "Substituição e reparo de fontes queimadas" },
              { title: "Tela de Notebook", desc: "Troca de LCD/LED quebrada ou com defeito" },
              { title: "Teclado", desc: "Substituição de teclados danificados" },
              { title: "Bateria", desc: "Troca de baterias viciadas ou sem carga" },
              { title: "Cooler/Ventilação", desc: "Limpeza e troca de coolers com ruído" },
              { title: "Dobradiças", desc: "Reparo de dobradiças quebradas de notebook" },
              { title: "Conector de Carga", desc: "Reparo de entrada de carregador" },
              { title: "Placa de Vídeo", desc: "Diagnóstico e reparo de GPU" },
            ].map((item, index) => (
              <div key={index} className="group flex gap-4 p-4 bg-secondary rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10" style={{ animationDelay: `${index * 60}ms` }}>
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

      {/* Problemas Comuns */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Problemas Comuns que Resolvemos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Computador não liga",
              "Notebook não carrega bateria",
              "Tela preta ou sem imagem",
              "Superaquecimento e desligamentos",
              "Ruídos estranhos no cooler",
              "Teclado com teclas falhando",
              "Tela do notebook quebrada",
              "Lentidão extrema do hardware",
            ].map((item, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 60}ms` }}>
                <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Como Funciona o Conserto
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Contato", desc: "Descreva o problema via WhatsApp" },
              { step: "2", title: "Diagnóstico", desc: "Identificamos a causa do defeito" },
              { step: "3", title: "Orçamento", desc: "Aprovação antes de iniciar o reparo" },
              { step: "4", title: "Reparo", desc: "Conserto com peças de qualidade" },
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

      {/* Diferenciais */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12 reveal-text">
            Por Que Escolher a Técnico Curitiba?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Diagnóstico Preciso", desc: "Identificamos o problema real" },
              { title: "Peças de Qualidade", desc: "Componentes originais e compatíveis" },
              { title: "Garantia", desc: "Garantia no serviço e nas peças" },
              { title: "Coleta e Entrega", desc: "Buscamos e entregamos na sua casa" },
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 bg-background rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" style={{ animationDelay: `${index * 80}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
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
              { q: "Quanto custa o diagnóstico?", a: "O diagnóstico com coleta custa R$99 caso desista do serviço. Se aprovar o orçamento, o valor é incluso no reparo." },
              { q: "Quanto tempo demora o conserto?", a: "Depende do problema e disponibilidade de peças. Consertos simples levam 1-2 dias. Reparos complexos podem levar até 7 dias." },
              { q: "Vocês trabalham com todas as marcas?", a: "Sim! Consertamos Dell, HP, Lenovo, Acer, Asus, Samsung, Apple e todas as outras marcas." },
              { q: "Vocês têm peças em estoque?", a: "Mantemos as peças mais comuns em estoque. Para componentes específicos, encomendamos com prazo de 1-3 dias." },
              { q: "Qual a garantia do serviço?", a: "Oferecemos garantia de 90 dias no serviço e nas peças substituídas." },
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
            Computador com Defeito? Resolva Agora!
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e receba um orçamento sem compromisso. Atendemos em toda Curitiba e região!
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
            <Link to="/servicos/upgrade-ssd-memoria" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Upgrade SSD/Memória
            </Link>
            <Link to="/servicos/formatacao-computador" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Formatação
            </Link>
            <Link to="/atendimento-domicilio" className="px-6 py-3 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              Atendimento Domiciliar
            </Link>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="notebookReparo" secondaryImageKey="ferramentas" layout="duo" caption="Reparo de notebook com ferramentas profissionais" secondaryCaption="Ferramentas especializadas para conserto" />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ConsertoPcNotebook;
