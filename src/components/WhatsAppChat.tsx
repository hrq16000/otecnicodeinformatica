import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997086380";

const presetMessages = [
  {
    label: "Visita técnica presencial",
    message: "Olá, sou [NOME]. Preciso de atendimento técnico em [ENDEREÇO/BAIRRO]. Serviço: [SERVIÇO]. Preferência de data/hora: [DIA/HH]. Li e concordo com a política de preços (A partir de R$ 69,99)."
  },
  {
    label: "Diagnóstico com coleta",
    message: "Olá, sou [NOME]. Solicito diagnóstico com coleta. Endereço: [ENDEREÇO]. Preferência de data: [DIA]. Estou ciente da taxa de diagnóstico de R$99 em caso de desistência."
  },
  {
    label: "Suporte remoto",
    message: "Olá! Preciso de suporte remoto. Meu computador está [DESCREVA O PROBLEMA]."
  },
  {
    label: "valor do atendimento geral",
    message: "Olá! Gostaria de solicitar um valor para [DESCREVA O SERVIÇO]."
  }
];

export const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleMessageClick = (message: string) => {
    trackCTAClick("whatsapp", "chat_widget");
    // Route through the global funnel so the 3-4 questions modal always shows
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", { detail: { location: "chat_widget", message } })
    );
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-background rounded-xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-whatsapp p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Técnico Curitiba</p>
                  <p className="text-sm text-white/80">Geralmente responde em minutos</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Selecione uma opção para iniciar a conversa:
            </p>
            <div className="space-y-2">
              {presetMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMessageClick(item.message)}
                  className="w-full text-left p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <Send className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-secondary/50 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              💬 Atendimento rápido via WhatsApp
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          !isOpen ? "animate-pulse-soft" : ""
        }`}
        aria-label="Abrir chat WhatsApp"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </button>
    </>
  );
};
