import { Link } from "react-router-dom";
import { Truck, ArrowRight } from "lucide-react";

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
            Não há cobrança de visita técnica. Serviço realizado com coleta e entrega.
          </span>
        </div>
        {showLink && (
          <Link to="/coleta-e-entrega" className="text-accent text-sm hover:underline inline-flex items-center gap-1 mt-1 ml-6">
            Ver detalhes <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <span className={`${compact ? "text-sm" : "text-base"} text-foreground font-medium`}>
        A partir de <span className="text-accent font-bold">R$ 69,99</span>
      </span>
      {showLink && (
        <Link to="/valores" className="text-accent text-sm hover:underline inline-flex items-center gap-1 ml-2">
          Ver detalhes <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
};

// Helper to determine if a service/page should use "coleta" pricing
export const CATEGORIAS_COLETA = ["tv", "notebook", "pc", "rádio", "radio", "caixa de som", "monitor", "manutencao-tv", "conserto-placa"];

export const isColetaCategory = (slug: string): boolean => {
  const lower = slug.toLowerCase();
  return CATEGORIAS_COLETA.some(cat => lower.includes(cat));
};
