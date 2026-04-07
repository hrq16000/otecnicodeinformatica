import { MessageCircle, CheckCircle, Zap, Shield, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const benefits = [
  { icon: Clock, text: "Mais de 20 anos de experiência", description: "Profissional experiente no mercado" },
  { icon: Shield, text: "Técnico identificado e de confiança", description: "Segurança para sua residência" },
  { icon: ThumbsUp, text: "Venda de serviços, não de peças", description: "Foco na sua real necessidade" },
  { icon: Zap, text: "Atendimento rápido e sem enrolação", description: "Resolução no primeiro contato" },
];

export const PainSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Meu computador está com problema e preciso de ajuda técnica urgente.")}`;

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "pain_section");
  };

  return (
    <section className="py-14 md:py-18 lg:py-24 bg-muted relative overflow-hidden spotlight-sweep" aria-labelledby="pain-heading">
      <div data-parallax="0.08" className="absolute -top-10 -left-10 w-[350px] h-[350px] rounded-full bg-accent/[0.03] blur-[80px] pointer-events-none" />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            id="pain-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight reveal-text"
          >
            Computador lento? Não liga? Travando ou com vírus?
          </h2>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-3 reveal-text" data-reveal-delay="100">
            Fale direto com técnico. Sem call center. Sem enrolação.
          </p>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Oferecemos <strong className="text-foreground">assistência técnica de informática</strong> profissional em <strong className="text-foreground">Curitiba</strong> e região. 
            Atendimento a <strong className="text-foreground">domicílio</strong> para <strong className="text-foreground">conserto de computador</strong>, 
            <strong className="text-foreground"> formatação</strong>, <strong className="text-foreground">remoção de vírus</strong> e muito mais.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 glass-card gradient-border rounded-xl px-4 py-4 text-left hover:-translate-y-1.5 hover:scale-[1.03] card-shine animated-border transition-all duration-300 group stagger-item"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="bg-accent/10 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <benefit.icon className="h-5 w-5 text-accent icon-bounce" />
                </div>
                <div>
                  <span className="text-foreground font-semibold block text-[15px]">{benefit.text}</span>
                  <span className="text-muted-foreground text-sm">{benefit.description}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="whatsapp" 
            size="xl"
            className="animate-pulse-soft ripple-container shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300 btn-feedback ring-pulse"
            asChild
            onClick={handleWhatsAppClick}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Resolver problema pelo WhatsApp">
              <MessageCircle className="h-5 w-5" />
              Resolver meu problema agora
            </a>
          </Button>

          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-trust" />
            Atendimento em até 5 minutos • Sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
};
