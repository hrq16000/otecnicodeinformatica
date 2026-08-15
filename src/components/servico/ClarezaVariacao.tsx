import { useEffect, useMemo } from "react";
import { copyVariacao, variantePara } from "@/lib/experimentos4b";
import { getSessionId } from "@/lib/funnelSubmission";
import { setActiveVariant, track } from "@/lib/funnelAnalytics";

/**
 * Rodada 4B — variação controlada de clareza acima da dobra.
 *
 * Renderiza uma linha adicional (nunca substitui o conteúdo estático) e
 * registra a variação atribuída para que o painel compare conversão por
 * CTA entre `controle`, `processo` e `decisao`. Não altera escopo de
 * serviço, preço, prazo nem garantia.
 */
export const ClarezaVariacao = ({ path }: { path: string }) => {
  const sessionId = typeof window === "undefined" ? "server" : getSessionId();
  const variacao = useMemo(() => copyVariacao(path, sessionId), [path, sessionId]);

  useEffect(() => {
    if (!variacao) return;
    setActiveVariant(variacao.id);
    track("experiment_view", {
      experiment: "clareza-dobra-4b",
      variant: variacao.id,
      cta_location: `${path}_hero`,
    });
    return () => setActiveVariant(null);
  }, [variacao, path]);

  if (!variacao || variacao.id === "controle") return null;

  return (
    <p
      data-experiment="clareza-dobra-4b"
      data-variant={variantePara(path, sessionId)}
      className="mt-3 max-w-2xl text-sm font-medium text-white/80 md:text-base"
    >
      {variacao.resumoHero}
    </p>
  );
};

export default ClarezaVariacao;
