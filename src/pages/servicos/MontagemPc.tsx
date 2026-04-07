import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { Monitor, CheckCircle, Cpu, Gamepad2, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";

const MontagemPc = () => {
  useEffect(() => {
    document.title = "Montagem de PC Gamer e Workstation em Curitiba | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Montagem de PC Gamer e Workstation em Curitiba. Computador personalizado para jogos, trabalho ou edição. Configuração ideal para seu orçamento.");
    }
    trackPageView("/servicos/montagem-pc", "Montagem de PC");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "montagem-pc");
    const message = encodeURIComponent("Olá! Quero montar um PC personalizado. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };


  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Montagem de PC Gamer e Workstation em Curitiba | Técnico Curitiba" description="Montagem de PC Gamer e Workstation em Curitiba. Computador personalizado para jogos, trabalho ou edição. Configuração ideal para seu orçamento." path="/servicos/montagem-pc" />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Montagem de PC" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Cpu className="h-5 w-5" />
              <span className="font-medium">PC Personalizado</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Montagem de PC Gamer e Workstation em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Computador montado sob medida para suas necessidades. PC Gamer, Workstation para edição, ou PC para trabalho e estudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de PC */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Montamos o PC Ideal Para Você
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-secondary p-8 rounded-xl text-center">
              <Gamepad2 className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">PC Gamer</h3>
              <p className="text-muted-foreground mb-6">Para jogos em alta performance, streaming e realidade virtual.</p>
              <ul className="text-left space-y-2 mb-6">
                {["Placa de vídeo dedicada", "SSD NVMe rápido", "Memória RAM alta", "Gabinete com RGB", "Refrigeração eficiente"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold text-accent">A partir de R$3.500</p>
            </div>
            <div className="bg-secondary p-8 rounded-xl text-center border-2 border-accent">
              <Monitor className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Workstation</h3>
              <p className="text-muted-foreground mb-6">Para edição de vídeo, 3D, design e aplicações profissionais.</p>
              <ul className="text-left space-y-2 mb-6">
                {["Processador multi-core", "32GB+ de RAM", "GPU profissional", "Armazenamento amplo", "Estabilidade total"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold text-accent">A partir de R$5.000</p>
            </div>
            <div className="bg-secondary p-8 rounded-xl text-center">
              <Briefcase className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">PC Trabalho</h3>
              <p className="text-muted-foreground mb-6">Para escritório, home office, navegação e tarefas do dia a dia.</p>
              <ul className="text-left space-y-2 mb-6">
                {["Processador eficiente", "8-16GB RAM", "SSD rápido", "Silencioso", "Consumo baixo"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold text-accent">A partir de R$1.800</p>
            </div>
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            O Que Está Incluso no Serviço
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Consultoria", desc: "Ajudamos a escolher as peças ideais para seu uso" },
              { title: "Montagem", desc: "Montagem profissional com cuidado" },
              { title: "Sistema", desc: "Windows instalado e configurado" },
              { title: "Testes", desc: "Testes de estresse e estabilidade" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-xl">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Conversa", desc: "Entendemos sua necessidade e orçamento" },
              { step: "2", title: "Orçamento", desc: "Montamos a configuração ideal" },
              { step: "3", title: "Aprovação", desc: "Você aprova as peças escolhidas" },
              { step: "4", title: "Montagem", desc: "Montamos, testamos e entregamos" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-secondary rounded-xl">
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
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Posso escolher as peças?", a: "Claro! Você pode trazer suas peças ou escolher junto conosco. Damos sugestões baseadas no seu orçamento e necessidade." },
              { q: "Vocês vendem as peças?", a: "Podemos ajudar na compra das peças em lojas parceiras com bons preços, ou você pode adquirir por conta própria." },
              { q: "Qual a garantia?", a: "As peças têm garantia do fabricante. O serviço de montagem tem garantia de 90 dias." },
              { q: "Quanto tempo demora?", a: "Com todas as peças disponíveis, a montagem leva de 1 a 2 dias úteis." },
              { q: "Vocês entregam?", a: "Sim! Entregamos o PC pronto na sua casa em toda Curitiba e região." },
            ].map((item, index) => (
              <div key={index} className="bg-background p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
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
            Quer um PC Sob Medida?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e monte o computador dos seus sonhos com a gente!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar Orçamento
          </Button>
        </div>
      </section>

      <RealImageSection imageKey="desktopMontado" secondaryImageKey="placaMae" layout="duo" caption="PC gamer montado sob medida" secondaryCaption="Componentes de alta performance" />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MontagemPc;
