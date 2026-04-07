import { useState } from "react";
import { MessageCircle, MapPin, Clock, Shield, Star, CheckCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { TechnicianAvailabilityInline } from "@/components/TechnicianAvailability";
import { SchedulingModal } from "@/components/scheduling";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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
    <section className="hero-gradient pt-24 pb-14 md:pt-28 md:pb-18 lg:pb-24 relative overflow-hidden" aria-label="Técnico de informática em Curitiba">
      {/* Elegant ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-4 py-2 mb-5 animate-fade-in">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                +<AnimatedCounter end={20} className="font-bold" /> anos atendendo Curitiba e região
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-white leading-[1.15] mb-5 md:mb-6 tracking-tight">
              Técnico de Informática
              <br />
              <span className="text-accent drop-shadow-sm">em Curitiba</span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-white/75 mt-2 tracking-normal">
                e Região Metropolitana
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/85 mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0">
              <strong className="text-white">Conserto de computadores e notebooks</strong> com atendimento 
              <strong className="text-white"> a domicílio</strong> no mesmo dia. Formatação, remoção de vírus, 
              upgrade SSD e mais.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-6">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] rounded-full px-3 py-1.5">
                  <signal.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-white/85 text-[13px]">{signal.text}</span>
                </div>
              ))}
            </div>

            {/* Areas served */}
            <p className="text-white/60 text-sm mb-7">
              <MapPin className="inline h-3.5 w-3.5 mr-1 relative -top-px" />
              Atendemos: <strong className="text-white/75">Curitiba</strong>, <strong className="text-white/75">São José dos Pinhais</strong>, <strong className="text-white/75">Araucária</strong>, <strong className="text-white/75">Campo Largo</strong> e <strong className="text-white/75">Pinhais</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <Button variant="heroWhatsapp" className="animate-pulse-soft hover-glow-cta ripple-container shadow-lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chamar técnico no WhatsApp">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                  Chamar Técnico Agora
                </a>
              </Button>
              
              <Button variant="heroCta" className="ripple-container hover-glow-cta shadow-lg" onClick={() => setIsSchedulingOpen(true)} aria-label="Agendar atendimento técnico online">
                <CalendarDays className="h-5 w-5 md:h-6 md:w-6" />
                Agendar Atendimento
              </Button>
            </div>

            <div className="mt-5">
              <TechnicianAvailabilityInline />
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-white/60 text-sm">
              <CheckCircle className="h-3.5 w-3.5 text-trust" />
              <span>Resposta em até 5 minutos • Orçamento sem compromisso</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Soft glow behind image */}
              <div className="absolute -inset-4 bg-accent/[0.08] rounded-3xl blur-2xl group-hover:bg-accent/[0.12] transition-all duration-700 pointer-events-none" />
              <img 
                alt="Técnico de informática profissional realizando conserto de computador em Curitiba" 
                className="relative w-64 sm:w-80 md:w-96 lg:w-auto lg:max-w-md rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="400"
                height="400"
                src="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859.webp" 
              />
              <div className="absolute -bottom-3 -right-3 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-bounce-subtle">
                ✓ Atendimento Imediato
              </div>
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
    </>
  );
};
