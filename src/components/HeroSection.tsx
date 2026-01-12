import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-technician.png";

const WHATSAPP_NUMBER = "5541997452053";
const PHONE_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

export const HeroSection = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:+${PHONE_NUMBER}`;

  return (
    <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4 md:mb-6">
              Técnico de Informática
              <br />
              <span className="text-accent">em Curitiba</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Atendimento rápido • No local ou remoto • Com garantia
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="heroWhatsapp"
                className="animate-pulse-soft"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                  WhatsApp Agora
                </a>
              </Button>
              
              <Button 
                variant="heroCta"
                asChild
              >
                <a href={phoneUrl}>
                  <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  Ligar Agora
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Técnico de informática profissional em Curitiba" 
                className="w-64 sm:w-80 md:w-96 lg:w-auto lg:max-w-md rounded-2xl shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-3 -right-3 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                ✓ Atendimento Imediato
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
