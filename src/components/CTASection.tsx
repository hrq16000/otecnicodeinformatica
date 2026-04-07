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
    <section className="py-14 md:py-18 lg:py-24 bg-muted relative overflow-hidden transition-all duration-500 hover:bg-muted/80 section-divider">
      {/* Parallax ambient glow */}
      <div data-parallax="0.1" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.06)_0%,_transparent_70%)]" />
      <div data-parallax="0.15" className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none animate-breathe" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img 
            alt="Técnico Curitiba" 
            className="h-16 md:h-20 mx-auto mb-7" 
            src="/lovable-uploads/b702f033-fd78-4d1e-ae32-2ad60f672710.webp"
            width="200"
            height="80"
            loading="lazy"
          />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">
            Precisa resolver agora?
          </h2>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-9">
            Fale direto com o técnico. Atendimento imediato!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroWhatsapp" className="animate-pulse-soft ripple-container shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 btn-feedback cta-pulse" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                WhatsApp Imediato
              </a>
            </Button>
            
            <Button variant="heroCta" className="ripple-container shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 btn-feedback" onClick={openChatbot}>
              <Bot className="h-5 w-5 md:h-6 md:w-6" />
              Atendimento Rápido
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
