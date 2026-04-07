import { useState } from "react";
import { MessageCircle, Bot, MapPin, Clock, Shield, Star, CheckCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { TechnicianAvailabilityInline } from "@/components/TechnicianAvailability";
import { SchedulingModal } from "@/components/scheduling";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const trustSignals = [
  { icon: Clock, text: "Atendimento no mesmo dia" },
  { icon: Shield, text: "Garantia em todos os serviços" },
  { icon: MapPin, text: "A domicílio ou remoto" },
];

export const HeroSection = () => {
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  
  const openChatbot = () => {
    trackCTAClick('chatbot', 'hero');
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <>
    <SchedulingModal isOpen={isSchedulingOpen} onClose={() => setIsSchedulingOpen(false)} />
    <section className="hero-gradient cyber-grid pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20 relative overflow-hidden scan-line" aria-label="Técnico de informática em Curitiba">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* SEO-optimized badge */}
            <div className="inline-flex items-center gap-2 bg-neon-green/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 neon-border border-neon-green/20 flicker-subtle">
              <Star className="h-4 w-4 text-neon-green fill-neon-green" />
              <span className="text-foreground/90 text-sm font-mono">
                +20 anos atendendo Curitiba e região
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-4 md:mb-6">
              <span className="neon-text">Técnico de Informática</span>
              <br />
              <span className="text-gradient-cyber">em Curitiba</span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/60 mt-2 font-mono">
                e Região Metropolitana
              </span>
            </h1>
            
            {/* SEO-rich subtitle */}
            <p className="text-lg md:text-xl text-foreground/80 mb-4 font-mono">
              <strong className="text-neon-green">Conserto de computadores e notebooks</strong> com atendimento 
              <strong className="text-neon-cyan"> a domicílio</strong> no mesmo dia. Formatação, remoção de vírus, 
              upgrade SSD e mais.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-neon-green/5 backdrop-blur-sm rounded-full px-3 py-1.5 neon-border">
                  <signal.icon className="h-4 w-4 text-neon-green" />
                  <span className="text-foreground/80 text-sm font-mono">{signal.text}</span>
                </div>
              ))}
            </div>

            {/* Areas served */}
            <p className="text-foreground/50 text-sm mb-6 font-mono">
              <MapPin className="inline h-4 w-4 mr-1 text-neon-green" />
              Atendemos: <strong className="text-neon-green/80">Curitiba</strong>, <strong className="text-neon-green/80">São José dos Pinhais</strong>, <strong className="text-neon-green/80">Araucária</strong>, <strong className="text-neon-green/80">Campo Largo</strong> e <strong className="text-neon-green/80">Pinhais</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="heroWhatsapp" className="animate-neon-pulse neon-glow" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chamar técnico no WhatsApp">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                  Chamar Técnico Agora
                </a>
              </Button>
              
              <Button variant="heroCta" onClick={() => setIsSchedulingOpen(true)} aria-label="Agendar atendimento técnico online">
                <CalendarDays className="h-5 w-5 md:h-6 md:w-6" />
                Agendar Atendimento
              </Button>
            </div>

            {/* Real-time availability */}
            <div className="mt-4">
              <TechnicianAvailabilityInline />
            </div>

            {/* Micro-conversion trust */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-foreground/50 text-sm font-mono">
              <CheckCircle className="h-4 w-4 text-neon-green" />
              <span>Resposta em até 5 minutos • Orçamento sem compromisso</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 via-neon-cyan/10 to-neon-blue/20 rounded-2xl blur-sm" />
              <img 
                alt="Técnico de informática profissional realizando conserto de computador em Curitiba" 
                className="relative w-64 sm:w-80 md:w-96 lg:w-auto lg:max-w-md rounded-2xl shadow-2xl border border-neon-green/20" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="400"
                height="400"
                src="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859.webp" 
              />
              <div className="absolute -bottom-3 -right-3 bg-neon-green text-background px-4 py-2 rounded-lg font-bold text-sm shadow-lg neon-glow font-mono">
                ✓ Atendimento Imediato
              </div>
              {/* Rating badge */}
              <div className="absolute -top-3 -left-3 bg-card text-foreground px-3 py-2 rounded-lg shadow-lg flex items-center gap-1 neon-border">
                <Star className="h-4 w-4 text-neon-green fill-neon-green" />
                <span className="font-bold text-sm font-mono">4.9</span>
                <span className="text-xs text-muted-foreground">/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
