import { Link } from "react-router-dom";

export const PricingBanner = () => {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground" aria-hidden="true">i</span>
        <div>
          <p className="text-foreground font-semibold mb-1">
            Visita técnica a partir de <span className="text-accent">R$ 69,99</span>
          </p>
          <p className="text-muted-foreground text-sm">
            Orçamento estimado grátis pelo WhatsApp — rápido e sem compromisso.
            <Link to="/valores" className="text-accent hover:underline ml-1">
              Ver detalhes →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
