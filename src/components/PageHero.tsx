import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541999999999";
const PHONE_NUMBER = "5541999999999";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

interface PageHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

export const PageHero = ({ title, subtitle, ctaText = "Chame no WhatsApp" }: PageHeroProps) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:+${PHONE_NUMBER}`;

  const handleWhatsAppClick = () => {
    trackCTAClick('whatsapp', 'page_hero');
  };

  const handlePhoneClick = () => {
    trackCTAClick('phone', 'page_hero');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="heroWhatsapp"
              size="lg"
              className="text-base md:text-lg px-8"
              asChild
              onClick={handleWhatsAppClick}
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {ctaText}
              </a>
            </Button>
            
            <Button
              variant="heroCta"
              size="lg"
              className="text-base md:text-lg px-8"
              asChild
              onClick={handlePhoneClick}
            >
              <a href={phoneUrl}>
                <Phone className="h-5 w-5" />
                Ligar Agora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
