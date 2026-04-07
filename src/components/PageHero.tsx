import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

interface PageHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export const PageHero = ({ title, subtitle, ctaText = "Chame no WhatsApp" }: PageHeroProps) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackCTAClick('whatsapp', 'page_hero');
  };

  return (
    <section className="relative hero-gradient pt-10 pb-10 md:pt-12 md:pb-12 overflow-hidden">
      <div data-parallax="0.12" className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px] pointer-events-none orb-float" />
      <div data-parallax="0.08" className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/[0.03] blur-[80px] pointer-events-none liquid-blob" />
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-accent/[0.04] blur-[60px] pointer-events-none orb-float-reverse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      
      {/* Animated particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-accent/20 rounded-full particle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white/10 rounded-full particle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-accent/15 rounded-full particle" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/15 rounded-full particle" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight reveal-text">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 reveal-text" data-reveal-delay="100">
            {subtitle}
          </p>
          
          <Button
            variant="heroWhatsapp"
            size="lg"
            className="text-base md:text-lg px-8 animate-pulse-soft shadow-[0_0_30px_rgba(37,211,102,0.25)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:scale-[1.03] transition-all duration-300 elastic-click"
            asChild
            onClick={handleWhatsAppClick}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {ctaText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
