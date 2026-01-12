import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
const WHATSAPP_NUMBER = "5541999999999";
const PHONE_NUMBER = "5541999999999";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";
export const Header = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:+${PHONE_NUMBER}`;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3">
        <a href="/" className="flex-shrink-0">
          <img alt="Técnico Curitiba - Suporte em Informática" src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.png" className="h-12 md:h-14 w-auto object-scale-down" />
        </a>
        
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="whatsapp" size="sm" className="hidden sm:flex" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </Button>
          
          <Button variant="whatsapp" size="icon" className="sm:hidden" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>
          
          <Button variant="cta" size="sm" asChild>
            <a href={phoneUrl}>
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">(41) 99999-9999</span>
              <span className="md:hidden">Ligar</span>
            </a>
          </Button>
        </div>
      </div>
    </header>;
};