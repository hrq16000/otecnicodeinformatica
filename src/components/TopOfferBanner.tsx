import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Zap, ArrowRight } from "lucide-react";

const STORAGE_KEY = "top_offer_banner_dismissed_v1";

/**
 * Banner topo da home com a oferta-âncora "Serviço Rápido até 30 min — R$ 99,99".
 * Dispara o WhatsAppFunnel via custom event. Pode ser dispensado (sessionStorage).
 */
export const TopOfferBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
  };

  const openFunnel = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", { detail: { location: "top_banner" } }),
    );
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Oferta: serviço rápido até 30 minutos por R$ 99,99"
      className="relative z-40 w-full bg-gradient-to-r from-accent via-accent to-primary text-white shadow-md"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-2 text-center sm:text-left">
        <div className="flex items-center gap-2 min-w-0">
          <Zap className="h-4 w-4 flex-shrink-0 fill-yellow-300 text-yellow-300" />
          <p className="text-[13px] sm:text-sm font-semibold tracking-tight">
            Serviço Rápido até <span className="underline decoration-2 underline-offset-2">30 min</span> — apenas{" "}
            <span className="text-yellow-300 font-extrabold">R$ 99,99</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-[12px] sm:text-sm">
          <a
            href="https://wa.me/5541997452053"
            onClick={openFunnel}
            data-wa-medium="top_banner"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-1 font-semibold transition-colors"
          >
            Chamar agora <ArrowRight className="h-3 w-3" />
          </a>
          <Link
            to="/termos-e-condicoes"
            className="text-white/85 hover:text-white underline underline-offset-2 font-medium"
          >
            Termos e Condições
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fechar oferta"
        className="absolute right-1 top-1 sm:top-1/2 sm:-translate-y-1/2 sm:right-3 p-1 rounded-md hover:bg-white/20 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TopOfferBanner;
