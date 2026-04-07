import { MessageCircle } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Vi o site de vocês e preciso de um técnico de informática. Podem me atender hoje?";

export const WhatsAppFloat = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick('whatsapp', 'float_button')}
      className={cn(
        "fixed bottom-6 left-6 z-50 flex items-center gap-2",
        "bg-whatsapp hover:bg-whatsapp-hover text-white",
        "pl-4 pr-5 py-3 rounded-full",
        "shadow-[0_4px_20px_hsl(var(--whatsapp)/0.35)] hover:shadow-[0_8px_30px_hsl(var(--whatsapp)/0.5)]",
        "transition-all duration-300 hover:scale-110 group",
        "wa-pulse"
      )}
      aria-label="Falar com técnico pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" />
      <span className="text-sm font-semibold hidden sm:inline">Fale com Técnico</span>
    </a>
  );
};
