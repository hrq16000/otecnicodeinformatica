import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { OrcamentoNotebookCalculator } from "@/components/OrcamentoNotebookCalculator";
import { Link } from "react-router-dom";
import { Laptop, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997086380";

const ConsertoNotebookCuritiba = () => {
  useEffect(() => {
    trackPageView(
      "/servicos/conserto-notebook-curitiba",
      "Conserto de Notebook Curitiba"
    );
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "conserto-notebook-curitiba");
    const message = encodeURIComponent(
      "Olá! Meu notebook precisa de conserto em Curitiba. Podem me ajudar?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Conserto de Notebook Curitiba a partir de R$ 99,99 | Hoje"
        description="Conserto de notebook em Curitiba a partir de R$ 99,99: troca de tela, dobradiça, teclado, bateria e reparo de placa. Coleta e entrega + 90 dias de garantia."
        path="/servicos/conserto-notebook-curitiba"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Conserto de Notebook Curitiba", path: "/servicos/conserto-notebook-curitiba" },
        ]}
      />
      <ServiceLandingSchema
        serviceName="Conserto de Notebook em Curitiba"
        description="Reparo especializado de notebooks em Curitiba: troca de tela LCD/LED, dobradiça, teclado, bateria, conector de carga, cooler e reparo de placa-mãe. Coleta e entrega em toda a região, orçamento fechado antes do serviço e 90 dias de garantia."
        path="/servicos/conserto-notebook-curitiba"
        priceFrom={99.99}
        faqs={[
          {
            question: "Quanto custa consertar um notebook em Curitiba?",
            answer:
              "A visita técnica e o diagnóstico começam em R$ 99,99. Trocas comuns (tela, teclado, bateria) variam de R$ 250 a R$ 900 dependendo da peça. O orçamento é fechado antes da execução — você só paga se aprovar.",
          },
          {
            question: "Vocês consertam tela de notebook quebrada?",
            answer:
              "Sim. Trocamos telas LCD e LED de 11\" a 17\" de todas as marcas (Dell, HP, Lenovo, Acer, Asus, Samsung, Apple). A maioria das trocas é feita no mesmo dia após a chegada da peça.",
          },
          {
            question: "Notebook não liga — vocês consertam?",
            answer:
              "Sim. Diagnosticamos a causa real (fonte, conector de carga, placa-mãe, BIOS, chip BGA) e apresentamos o orçamento fechado. Em muitos casos é apenas o conector de carga ou a bateria.",
          },
          {
            question: "Tem coleta e entrega em Curitiba?",
            answer:
              "Sim. Coletamos o notebook na sua casa ou empresa em Curitiba, Pinhais, São José dos Pinhais, Colombo e Araucária. Entregamos consertado com prazo combinado por WhatsApp.",
          },
          {
            question: "Quanto tempo demora o conserto de notebook?",
            answer:
              "Trocas de tela, teclado, bateria e formatação saem em 24h. Reparos de placa-mãe e BGA levam de 3 a 7 dias úteis dependendo da disponibilidade da peça.",
          },
          {
            question: "Qual a garantia do conserto?",
            answer:
              "Toda mão de obra tem 90 dias de garantia. Peças trocadas seguem a garantia do fabricante, registradas na ordem de serviço.",
          },
        ]}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Conserto de Notebook Curitiba" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-10 pb-10 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Laptop className="h-5 w-5" />
              <span className="font-medium">Especialista em Notebooks</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Conserto de Notebook em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto fade-section">
              A partir de <strong>R$ 99,99</strong> — tela, teclado, dobradiça, bateria e placa-mãe.
            </p>
            <p className="text-base text-white/80 mb-8 max-w-2xl mx-auto fade-section">
              Coleta e entrega em Curitiba e RMC. Orçamento fechado antes do serviço. 90 dias de garantia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-section">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Orçamento no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
      <RealImageSection imageKey="notebookReparo" caption="Reparo profissional de notebooks em Curitiba" />

      <section className="py-6 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <PrecoVisitaTecnica tipo="coleta" />
          </div>
        </div>
      </section>

      {/* Calculadora de orçamento — acima da dobra */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <OrcamentoNotebookCalculator />
        </div>
      </section>

      {/* Reparos que fazemos */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-8 reveal-text">
            Reparos de Notebook que Fazemos em Curitiba
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Troca de Tela LCD/LED", desc: "11\" a 17\" — Dell, HP, Lenovo, Acer, Asus, Samsung, Apple. A partir de R$ 350." },
              { title: "Troca de Dobradiça", desc: "Reparo de dobradiça quebrada, carcaça rachada e suporte de tela." },
              { title: "Troca de Teclado", desc: "Teclas falhando, líquido derramado ou teclado completo. A partir de R$ 220." },
              { title: "Troca de Bateria", desc: "Bateria viciada ou sem carga. Peça original ou compatível com garantia." },
              { title: "Conector de Carga", desc: "Solda de conector DC jack que não carrega ou faz mau contato." },
              { title: "Reparo de Placa-Mãe", desc: "Curto, chip de carga, capacitores e reflow BGA (chipset/GPU)." },
              { title: "Limpeza + Pasta Térmica", desc: "Notebook esquentando ou desligando sozinho. Coolers + pasta nova." },
              { title: "SSD e Memória", desc: "Upgrade de HDD para SSD e expansão de RAM — ganho de até 10× em velocidade." },
              { title: "Formatação + Backup", desc: "Reinstalação Windows/Linux, drivers e backup dos seus arquivos." },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex gap-4 p-4 bg-secondary rounded-xl stagger-item transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
                style={{ animationDelay: `${index * 60}ms` }}
              >
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

      {/* Problemas comuns */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Problemas de Notebook que Mais Atendemos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Notebook não liga ou não dá vídeo",
              "Bateria não carrega ou descarrega rápido",
              "Tela quebrada, com manchas ou linhas",
              "Dobradiça solta ou tampa quebrada",
              "Teclas travadas ou líquido derramado",
              "Notebook esquentando e desligando",
              "Lentidão extrema mesmo após formatar",
              "Conector de carga frouxo / não conecta",
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 p-4 bg-background rounded-lg stagger-item transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <AlertCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-6">
            Consertamos Todas as Marcas de Notebook
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Atendimento em Curitiba e região metropolitana — Pinhais, São José dos Pinhais, Colombo,
            Araucária, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Largo, Campo Magro e Quatro Barras.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Dell", "HP", "Lenovo", "Acer", "Asus", "Samsung", "Apple / MacBook", "Positivo", "LG", "Multilaser", "Vaio", "Microsoft Surface"].map(
              (marca) => (
                <span key={marca} className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground">
                  {marca}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-8 reveal-text">
            Como Funciona o Conserto do Seu Notebook
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Chame no WhatsApp", desc: "Descreva o problema e mande fotos." },
              { step: "2", title: "Coleta ou Visita", desc: "Buscamos o notebook ou vamos até você." },
              { step: "3", title: "Orçamento Fechado", desc: "Você aprova antes da execução." },
              { step: "4", title: "Conserto + Entrega", desc: "Reparo + 90 dias de garantia." },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-xl stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-8 reveal-text">
            Perguntas Frequentes — Conserto de Notebook Curitiba
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Quanto custa consertar um notebook em Curitiba?", a: "A visita técnica e o diagnóstico começam em R$ 99,99. Trocas mais comuns ficam entre R$ 250 e R$ 900. Você só paga se aprovar o orçamento." },
              { q: "Vocês consertam tela de notebook quebrada?", a: "Sim — telas de 11\" a 17\" de todas as marcas, normalmente trocadas no mesmo dia após a chegada da peça." },
              { q: "Notebook não liga, é caro consertar?", a: "Na maioria dos casos é apenas o conector de carga ou a bateria. Diagnosticamos antes de qualquer cobrança de reparo." },
              { q: "Tem coleta e entrega em Curitiba e RMC?", a: "Sim, coletamos em Curitiba, Pinhais, São José dos Pinhais, Colombo, Araucária e cidades vizinhas." },
              { q: "Qual a garantia?", a: "90 dias de garantia em mão de obra + garantia do fabricante nas peças, registrada na OS." },
            ].map((item, index) => (
              <details key={index} className="group bg-secondary p-5 rounded-xl">
                <summary className="font-bold text-foreground cursor-pointer">{item.q}</summary>
                <p className="text-muted-foreground mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora — final da página, antes do CTA */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <OrcamentoNotebookCalculator variant="compact" />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Seu notebook com defeito? Resolvemos hoje.
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Orçamento sem compromisso pelo WhatsApp. Coleta em toda Curitiba e região.
          </p>
          <Button
            size="lg"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar com Técnico Agora
          </Button>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-4">Serviços Relacionados</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/servicos/conserto-pc-notebook" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 text-sm">Conserto de PC e Notebook</Link>
            <Link to="/servicos/upgrade-ssd-memoria" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 text-sm">Upgrade SSD/Memória</Link>
            <Link to="/servicos/formatacao-computador" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 text-sm">Formatação</Link>
            <Link to="/atendimento-domicilio" className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 text-sm">Atendimento Domiciliar</Link>
          </div>
        </div>
      </section>

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default ConsertoNotebookCuritiba;
