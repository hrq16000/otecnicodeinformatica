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
    <section className="py-12 md:py-16 lg:py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <img 
            alt="Técnico Curitiba" 
            className="h-16 md:h-20 mx-auto mb-6" 
            src="/lovable-uploads/b702f033-fd78-4d1e-ae32-2ad60f672710.webp" 
          />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Precisa resolver agora?
          </h2>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-8">
            Fale direto com o técnico. Atendimento imediato!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroWhatsapp" className="animate-pulse-soft" asChild>
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