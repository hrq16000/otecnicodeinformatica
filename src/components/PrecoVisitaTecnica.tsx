import { Link } from "react-router-dom";
import { Truck, ArrowRight, MessageCircle } from "lucide-react";

interface PrecoVisitaTecnicaProps {
  tipo: "padrao" | "coleta";
  className?: string;
  showLink?: boolean;
  compact?: boolean;
}

export const PrecoVisitaTecnica = ({ tipo, className = "", showLink = true, compact = false }: PrecoVisitaTecnicaProps) => {
  if (tipo === "coleta") {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-accent flex-shrink-0" />
          <span className={`${compact ? "text-sm" : "text-base"} text-foreground font-medium`}>
            Sem visita técnica. Coleta e entrega inclusa — taxa mínima <span className="text-accent font-bold">R$ 300</span> pré-aprovada.
          </span>
        </div>
        <div className={`ml-6 mt-1.5 space-y-1 ${compact ? "text-xs" : "text-sm"}`}>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <MessageCircle className="h-3 w-3 text-accent flex-shrink-0" />
            Estimativa gratuita somente via WhatsApp. Orçamento preciso após coleta.
          </p>
          <p className="text-muted-foreground">
            📱 Celular / Rádio / Caixa de Som: <strong className="text-foreground">2 a 3 dias úteis</strong>
          </p>
          <p className="text-muted-foreground">
            📺 TV / Monitor / Notebook / PC: <strong className="text-foreground">15 a 60 dias úteis</strong>
          </p>
        </div>
        {showLink && (
          <Link to="/coleta-e-entrega" className="text-accent text-sm hover:underline inline-flex items-center gap-1 mt-2 ml-6">
            Ver detalhes <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <span className={`${compact ? "text-sm" : "text-base"} text-foreground font-medium`}>
        Visita técnica a partir de <span className="text-accent font-bold">R$ 69,99</span>
      </span>
      <p className={`${compact ? "text-xs" : "text-sm"} text-muted-foreground mt-0.5`}>
        Estimativa gratuita via WhatsApp. Diagnóstico presencial é pago.
      </p>
      {showLink && (
        <Link to="/valores" className="text-accent text-sm hover:underline inline-flex items-center gap-1 mt-1">
          Ver tabela de valores <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
};

// Helper to determine if a service/page should use "coleta" pricing
export const CATEGORIAS_COLETA = ["tv", "notebook", "pc", "rádio", "radio", "caixa de som", "monitor", "celular", "manutencao-tv", "conserto-placa", "conserto-celular"];

export const isColetaCategory = (slug: string): boolean => {
  const lower = slug.toLowerCase();
  return CATEGORIAS_COLETA.some(cat => lower.includes(cat));
};
