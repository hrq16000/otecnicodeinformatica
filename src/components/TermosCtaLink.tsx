import { Link } from "react-router-dom";

/**
 * Link curto de transparência exibido junto aos CTAs principais.
 * Aponta para /termos-e-condicoes (valores, prazos, garantia e coleta).
 */
export const TermosCtaLink = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground ${className}`}>
    Ao continuar você concorda com os{" "}
    <Link to="/termos-e-condicoes" className="underline underline-offset-2 hover:text-foreground">
      termos, valores e prazos de atendimento
    </Link>
    .
  </p>
);

export default TermosCtaLink;
