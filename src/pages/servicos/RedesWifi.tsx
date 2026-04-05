import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Wifi, CheckCircle, Router, Signal, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541992671754";
const PHONE_NUMBER = "5541992671754";

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

  const handlePhoneClick = () => {
    trackCTAClick("phone", "redes-wifi");
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Redes e Wi-Fi" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Wifi className="h-5 w-5" />
              <span className="font-medium">Conectividade Total</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Configuração de Redes e Wi-Fi em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Internet lenta ou com falhas? Configuramos sua rede Wi-Fi para máxima velocidade e cobertura em toda sua casa ou empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Melhorar Meu Wi-Fi
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handlePhoneClick}>
                <Phone className="mr-2 h-5 w-5" />
                (41) 99267-1754
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços de Rede */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
                <div key={index} className="flex gap-4 p-4 bg-secondary rounded-xl">
                  <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
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

      {/* Problemas Comuns */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Soluções para Cada Necessidade
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-secondary p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-primary mb-4">Casa Pequena</h3>
              <p className="text-muted-foreground mb-4">Até 60m² - Roteador bem posicionado resolve</p>
              <p className="text-2xl font-bold text-accent">A partir de R$99</p>
            </div>
            <div className="bg-secondary p-6 rounded-xl text-center border-2 border-accent">
              <h3 className="text-xl font-bold text-primary mb-4">Casa Média</h3>
              <p className="text-muted-foreground mb-4">60-150m² - Roteador + repetidor</p>
              <p className="text-2xl font-bold text-accent">A partir de R$199</p>
            </div>
            <div className="bg-secondary p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-primary mb-4">Casa Grande</h3>
              <p className="text-muted-foreground mb-4">Acima de 150m² - Sistema Mesh recomendado</p>
              <p className="text-2xl font-bold text-accent">A partir de R$399</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
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
            Wi-Fi Lento ou Com Falhas?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e tenha internet rápida em toda sua casa ou empresa!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Melhorar Meu Wi-Fi
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default RedesWifi;
