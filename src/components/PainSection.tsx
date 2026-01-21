import { MessageCircle, CheckCircle, Zap, Shield, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const benefits = [
  {
    icon: Clock,
    text: "Mais de 10 anos de experiência",
    description: "Profissional experiente no mercado"
  },
  {
    icon: Shield,
    text: "Técnico identificado e de confiança",
    description: "Segurança para sua residência"
  },
  {
    icon: ThumbsUp,
    text: "Venda de serviços, não de peças",
    description: "Foco na sua real necessidade"
  },
  {
    icon: Zap,
    text: "Atendimento rápido e sem enrolação",
    description: "Resolução no primeiro contato"
  },
];

export const PainSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "pain_section");
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary" aria-labelledby="pain-heading">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* SEO-optimized H2 */}
          <h2 
            id="pain-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4"
          >
            Computador lento? Não liga? Travando ou com vírus?
          </h2>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-3">
            Fale direto com técnico. Sem call center. Sem enrolação.
          </p>

          {/* Additional SEO text */}
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Oferecemos <strong>assistência técnica de informática</strong> profissional em <strong>Curitiba</strong> e região. 
            Atendimento a <strong>domicílio</strong> para <strong>conserto de computador</strong>, 
            <strong> formatação</strong>, <strong>remoção de vírus</strong> e muito mais.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-background rounded-lg px-4 py-4 shadow-sm text-left"
              >
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-foreground font-semibold block">{benefit.text}</span>
                  <span className="text-muted-foreground text-sm">{benefit.description}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="whatsapp" 
            size="xl"
            className="animate-pulse-soft"
            asChild
            onClick={handleWhatsAppClick}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Resolver problema pelo WhatsApp">
              <MessageCircle className="h-5 w-5" />
              Resolver agora pelo WhatsApp
            </a>
          </Button>

          {/* Trust micro-copy */}
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-trust" />
            Atendimento em até 5 minutos • Sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
};
