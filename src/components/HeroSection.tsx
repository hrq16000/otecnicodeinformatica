import { MessageCircle, Bot, MapPin, Clock, Shield, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const trustSignals = [
  { icon: Clock, text: "Atendimento no mesmo dia" },
  { icon: Shield, text: "Garantia em todos os serviços" },
  { icon: MapPin, text: "A domicílio ou remoto" },
];

export const HeroSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  
  const openChatbot = () => {
    trackCTAClick('chatbot', 'hero');
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20" aria-label="Técnico de informática em Curitiba">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* SEO-optimized badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium">
                +10 anos atendendo Curitiba e região
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4 md:mb-6">
              Técnico de Informática
              <br />
              <span className="text-accent">em Curitiba</span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 mt-2">
                e Região Metropolitana
              </span>
            </h1>
            
            {/* SEO-rich subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-4">
              <strong>Conserto de computadores e notebooks</strong> com atendimento 
              <strong> a domicílio</strong> no mesmo dia. Formatação, remoção de vírus, 
              upgrade SSD e mais.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <signal.icon className="h-4 w-4 text-accent" />
                  <span className="text-white/90 text-sm">{signal.text}</span>
                </div>
              ))}
            </div>

            {/* Areas served - SEO important */}
            <p className="text-white/70 text-sm mb-6">
              <MapPin className="inline h-4 w-4 mr-1" />
              Atendemos: <strong>Curitiba</strong>, <strong>São José dos Pinhais</strong>, <strong>Araucária</strong>, <strong>Campo Largo</strong> e <strong>Pinhais</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="heroWhatsapp" className="animate-pulse-soft" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chamar técnico no WhatsApp">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                  Chamar Técnico Agora
                </a>
              </Button>
              
              <Button variant="heroCta" onClick={openChatbot} aria-label="Atendimento rápido por assistente virtual">
                <Bot className="h-5 w-5 md:h-6 md:w-6" />
                Atendimento Rápido
              </Button>
            </div>

            {/* Micro-conversion trust */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4 text-white/70 text-sm">
              <CheckCircle className="h-4 w-4 text-trust" />
              <span>Resposta em até 5 minutos • Orçamento sem compromisso</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img 
                alt="Técnico de informática profissional realizando conserto de computador em Curitiba" 
                className="w-64 sm:w-80 md:w-96 lg:w-auto lg:max-w-md rounded-2xl shadow-2xl" 
                loading="eager"
                width="400"
                height="400"
                src="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859.png" 
              />
              <div className="absolute -bottom-3 -right-3 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                ✓ Atendimento Imediato
              </div>
              {/* Rating badge for social proof */}
              <div className="absolute -top-3 -left-3 bg-white text-primary px-3 py-2 rounded-lg shadow-lg flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-sm">4.9</span>
                <span className="text-xs text-muted-foreground">/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};