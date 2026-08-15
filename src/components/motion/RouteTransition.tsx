import { useEffect, useRef, useState, type ReactNode } from "react";

interface RouteTransitionProps {
  /** Chave da rota atual: mudar a chave dispara a transição de entrada. */
  routeKey: string;
  children: ReactNode;
  className?: string;
}

/**
 * Continuidade espacial entre rotas: o conteúdo novo entra com fade curto
 * (motion-enter), respondendo "de onde este conteúdo veio".
 *
 * - Sem transform espacial pesado, sem bloquear a página.
 * - `prefers-reduced-motion` / `data-reduced-motion` neutralizam via CSS.
 * - Não simula progresso: a barra real vive no overlay de navegação.
 */
export const RouteTransition = ({ routeKey, children, className = "" }: RouteTransitionProps) => {
  const first = useRef(true);
  const [key, setKey] = useState(routeKey);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey(routeKey);
  }, [routeKey]);

  return (
    <div key={key} className={`motion-enter ${className}`.trim()}>
      {children}
    </div>
  );
};
