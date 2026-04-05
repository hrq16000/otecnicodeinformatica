import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico. Podem me atender hoje?";

export const WhatsAppFloat = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-bounce-subtle group"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
};
