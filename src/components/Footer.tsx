import { MapPin, Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-8 md:py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img 
              src={logo} 
              alt="Técnico Curitiba" 
              className="h-10 brightness-0 invert"
            />
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Curitiba, PR</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/5541997452053" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>(41) 9.97452-053</span>
            </a>
            <a 
              href="tel:+5541997452053"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>(41) 99745-2053</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-6 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Técnico Curitiba. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
