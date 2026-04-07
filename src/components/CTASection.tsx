import { MessageCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

export const CTASection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  
  const openChatbot = () => {
    trackCTAClick('chatbot', 'cta_section');
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card relative overflow-hidden scan-line">
      {/* Ambient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-56 h-56 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img 
            alt="Técnico Curitiba" 
            className="h-16 md:h-20 mx-auto mb-6 brightness-110" 
            src="/lovable-uploads/b702f033-fd78-4d1e-ae32-2ad60f672710.webp"
            width="200"
            height="80"
            loading="lazy"
          />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 neon-text">
            Precisa resolver agora?
          </h2>
          
          <p className="text-lg md:text-xl text-neon-green font-semibold mb-8 font-mono flicker-subtle">
            Fale direto com o técnico. Atendimento imediato!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroWhatsapp" className="animate-neon-pulse neon-glow" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                WhatsApp Imediato
              </a>
            </Button>
            
            <Button variant="heroCta" onClick={openChatbot}>
              <Bot className="h-5 w-5 md:h-6 md:w-6" />
              Atendimento Rápido
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
