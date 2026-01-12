import { MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const benefits = [
  "Mais de 10 anos de experiência",
  "Técnico identificado e de confiança",
  "Venda de serviços, não de peças",
  "Atendimento rápido e sem enrolação",
];

export const PainSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Computador lento? Não liga? Travando ou com vírus?
          </h2>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-8">
            Fale direto com técnico. Sem call center. Sem enrolação.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-background rounded-lg px-4 py-3 shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-trust flex-shrink-0" />
                <span className="text-foreground font-medium text-left">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            variant="whatsapp" 
            size="xl"
            className="animate-pulse-soft"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Resolver agora pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
