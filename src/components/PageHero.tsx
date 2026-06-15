import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/FloatingParticles";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

interface PageHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export const PageHero = ({ title, subtitle, ctaText = "Chame no WhatsApp", heroImage, heroImageAlt }: PageHeroProps) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackCTAClick('whatsapp', 'page_hero');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient" />
      <FloatingParticles count={20} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-breathe" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="glow-separator max-w-[160px] mx-auto mb-8" />
          
          <Button
            variant="heroWhatsapp"
            size="lg"
            className="text-base md:text-lg px-8 shadow-[0_0_30px_rgba(37,211,102,0.25)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:scale-[1.03] transition-all duration-300 elastic-click"
            asChild
            onClick={handleWhatsAppClick}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {ctaText}
            </a>
          </Button>

          {heroImage && (
            <div className="mt-10 md:mt-12 max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                <img
                  src={heroImage}
                  alt={heroImageAlt ?? title}
                  width={1536}
                  height={768}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
};
