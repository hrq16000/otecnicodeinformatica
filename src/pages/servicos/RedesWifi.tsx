import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Link } from "react-router-dom";
import { Wifi, CheckCircle, Router, Signal, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997086380";

const RedesWifi = () => {
  useEffect(() => {
    document.title = "Configuração de Redes e Wi-Fi em Curitiba | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Configuração de redes Wi-Fi em Curitiba. Instalação de roteadores, repetidores, extensores. Internet lenta? Resolvemos! Atendimento domiciliar.");
    }
    trackPageView("/servicos/redes-wifi", "Redes e Wi-Fi");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "redes-wifi");
    const message = encodeURIComponent("Olá! Preciso de ajuda com minha rede Wi-Fi. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Configuração de Redes e Wi-Fi em Curitiba a partir de R$ 99,99 | Técnico Curitiba" description="Instalação e configuração de Wi-Fi, roteadores, repetidores e sistemas mesh em Curitiba a partir de R$ 99,99. Internet lenta? Resolvemos em até 30 min." path="/servicos/redes-wifi"  breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Redes e Wi-Fi", path: "/servicos/redes-wifi" }
      ]} />
      <ServiceLandingSchema
        serviceName="Configuração de Redes Wi-Fi, Roteadores e Mesh"
        description="Instalação de roteadores, repetidores e sistemas mesh, mapa de cobertura, troca de canal/banda 5 GHz e segurança da rede. Atendimento domiciliar em Curitiba."
        path="/servicos/redes-wifi"
        priceFrom={99.99}
        faqs={[
          { question: "Quanto custa configurar Wi-Fi em casa em Curitiba?", answer: "A configuração começa em R$ 99,99 e inclui mapa de cobertura, ajuste de canal/banda, senha forte e rede de visitantes. Para casas grandes recomendamos sistema mesh, orçado à parte." },
          { question: "Por que meu Wi-Fi vive caindo?", answer: "Os motivos mais comuns são interferência de canal, roteador mal posicionado, firmware desatualizado ou número de dispositivos acima do suportado. Diagnosticamos na visita técnica." },
          { question: "Vocês configuram sistema mesh (Deco, Nest, Eero)?", answer: "Sim. Instalamos sistemas mesh das principais marcas, posicionando os pontos para cobertura uniforme em toda a casa ou escritório." },
          { question: "Atendem empresas e escritórios?", answer: "Sim. Configuramos redes corporativas com VLANs, controle de acesso, rede de visitantes isolada e gestão de banda para empresas em Curitiba." },
          { question: "Quanto tempo demora?", answer: "Atendimento residencial leva em média 1 a 2 horas. Empresas e instalações mesh maiores levam 2 a 4 horas. Visita técnica em até 30 min do agendamento." },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Redes e Wi-Fi" }]} />
      
      {/* Hero Section */}
      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Wifi className="h-5 w-5" />
              <span className="font-medium">Conectividade Total</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Configuração de Redes e Wi-Fi em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Internet lenta ou com falhas? Configuramos sua rede Wi-Fi para máxima velocidade e cobertura em toda sua casa ou empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-text" data-reveal-delay="200">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Melhorar Meu Wi-Fi
              </Button>
            </div>
          </div>
        </div>
      </section>
      <RealImageSection imageKey="redesWifi" caption="Infraestrutura de rede profissional" />

      {/* Serviços de Rede */}
      <section className="py-10 bg-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Nossos Serviços de Rede
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Router, title: "Instalação de Roteador", desc: "Configuração completa do seu novo roteador" },
              { icon: Signal, title: "Extensores e Repetidores", desc: "Amplie o alcance do Wi-Fi na sua casa" },
              { icon: Wifi, title: "Rede Mesh", desc: "Cobertura total sem pontos mortos" },
              { icon: Router, title: "Roteador Dual-Band", desc: "Configure 2.4GHz e 5GHz corretamente" },
              { icon: Signal, title: "Otimização de Sinal", desc: "Melhore a velocidade e estabilidade" },
              { icon: Wifi, title: "Rede Cabeada", desc: "Instalação de cabos ethernet" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4 p-4 bg-secondary rounded-xl group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                  <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="servidores" caption="Rack de rede e equipamentos configurados profissionalmente" />

      {/* Problemas Comuns */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Problemas que Resolvemos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Internet lenta em alguns cômodos",
              "Wi-Fi não alcança todos os ambientes",
              "Conexão caindo constantemente",
              "Dispositivos não conectam ao Wi-Fi",
              "Velocidade diferente do contratado",
              "Muitos dispositivos derrubam a rede",
              "Interferência de redes vizinhas",
              "Configuração de novo roteador",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 60}ms` }}>
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Soluções para Cada Necessidade
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Casa Pequena", desc: "Até 60m² - Roteador bem posicionado resolve", price: "A partir de R$99", highlight: false },
              { title: "Casa Média", desc: "60-150m² - Roteador + repetidor", price: "A partir de R$199", highlight: true },
              { title: "Casa Grande", desc: "Acima de 150m² - Sistema Mesh recomendado", price: "A partir de R$399", highlight: false },
            ].map((item, index) => (
              <div key={index} className={`bg-secondary p-6 rounded-xl text-center group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 stagger-item ${item.highlight ? "border-2 border-accent shadow-[0_0_20px_rgba(var(--accent)/0.15)]" : ""}`} style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <p className="text-2xl font-bold text-accent">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Por que meu Wi-Fi é lento?", a: "Pode ser posicionamento ruim do roteador, interferência, canal congestionado, ou equipamento desatualizado. Fazemos diagnóstico completo." },
              { q: "O que é rede Mesh?", a: "É um sistema com múltiplos pontos de acesso que trabalham juntos para cobrir toda a casa com sinal forte e estável." },
              { q: "Preciso trocar meu roteador?", a: "Depende. Avaliamos seu equipamento atual e recomendamos troca apenas se necessário. Muitas vezes, uma boa configuração resolve." },
              { q: "Vocês instalam o equipamento?", a: "Sim! Instalamos e configuramos roteadores, repetidores, sistemas Mesh e redes cabeadas." },
              { q: "Qual a diferença entre 2.4GHz e 5GHz?", a: "2.4GHz tem maior alcance mas menor velocidade. 5GHz é mais rápido mas tem menor alcance. Configuramos ambas para uso ideal." },
            ].map((item, index) => (
              <div key={index} className="bg-background p-6 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Wi-Fi Lento ou Com Falhas?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e tenha internet rápida em toda sua casa ou empresa!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Melhorar Meu Wi-Fi
          </Button>
        </div>
      </section>



      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default RedesWifi;
