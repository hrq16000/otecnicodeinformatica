import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico. Podem me atender hoje?";

const ANIMATIONS = [
  "animate-wa-bounce",
  "animate-wa-pulse",
  "animate-wa-wiggle",
  "animate-wa-ring",
] as const;

export const WhatsAppFloat = () => {
  const [animClass, setAnimClass] = useState<string>(ANIMATIONS[0]);

  useEffect(() => {
    // Switch animation randomly every 6-10 seconds
    const pick = () => {
      const next = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
      setAnimClass(next);
    };
    pick();
    const id = setInterval(pick, 6000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 left-6 z-50 flex items-center gap-2",
        "bg-whatsapp hover:bg-whatsapp-hover text-white",
        "pl-4 pr-5 py-3 rounded-full",
        "shadow-[0_4px_20px_hsl(var(--whatsapp)/0.4)] hover:shadow-[0_6px_30px_hsl(var(--whatsapp)/0.6)]",
        "transition-all duration-300 hover:scale-110 group",
        animClass
      )}
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
};
