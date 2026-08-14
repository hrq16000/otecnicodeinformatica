/**
 * RODADA 8F — MAPA DE CAUDA LONGA → INTENÇÃO → DESTINO
 * -----------------------------------------------------
 * "Formatar" é uma palavra só, mas são três pessoas diferentes:
 *
 *   • "quanto custa formatar um computador"  → quer preço  (comercial)
 *   • "como formatar sem perder arquivos"    → quer método (informacional)
 *   • "formatação de computador em curitiba" → quer alguém (local)
 *
 * Mandar as três para a mesma página desperdiça duas. Este mapa resolve
 * o termo para a rota certa do cluster e devolve o par
 * (route_family, intent) que o analytics registra — sem jamais enviar o
 * texto digitado, que é dado livre e pode conter PII.
 */
import { routeFamilyFromPath, type RouteFamily } from "@/lib/analyticsContract";
import { normalizar } from "@/lib/buscaInteligente";
import { isCohortUrl } from "@/lib/contentCohort";
import type { ContentIntent } from "@/lib/contentIntentMap";

export type RegraCaudaLonga = {
  /** Identificador categórico — é isto que vai para o analytics. */
  id: string;
  /** Termos normalizados que caracterizam a intenção. */
  gatilhos: string[];
  destino: string;
  intent: ContentIntent;
};

/**
 * Regras avaliadas em ordem: a primeira que casar vence. Comercial e
 * local vêm antes do informacional porque são mais específicas.
 */
export const REGRAS_CAUDA_LONGA: RegraCaudaLonga[] = [
  {
    id: "formatacao_custo",
    gatilhos: [
      "quanto custa formatar",
      "quanto custa formatacao",
      "preco formatacao",
      "preco para formatar",
      "valor formatacao",
      "valor para formatar",
      "orcamento formatacao",
      "formatacao barata",
      "custo formatacao",
    ],
    destino: "/blog/quanto-custa-formatar-um-computador",
    intent: "commercial",
  },
  {
    id: "formatacao_local",
    gatilhos: [
      "formatacao curitiba",
      "formatar computador curitiba",
      "formatar notebook curitiba",
      "formatacao perto de mim",
      "assistencia formatacao curitiba",
      "tecnico para formatar",
      "formatacao a domicilio",
    ],
    destino: "/servicos/formatacao",
    intent: "local_commercial",
  },
  {
    id: "formatacao_metodo",
    gatilhos: [
      "formatar sem perder arquivos",
      "formatar sem perder nada",
      "como formatar",
      "backup antes de formatar",
      "salvar arquivos antes de formatar",
      "passo a passo formatar",
      "formatar mantendo arquivos",
    ],
    destino: "/blog/como-formatar-pc-sem-perder-arquivos",
    intent: "informational",
  },
  {
    id: "formatacao_diagnostico",
    gatilhos: [
      "formatar resolve lentidao",
      "formatar deixa mais rapido",
      "preciso formatar meu pc",
      "vale a pena formatar",
      "formatar computador lento",
    ],
    destino: "/problemas/computador-lento",
    intent: "diagnostic",
  },
];

export type ResolucaoCaudaLonga = {
  regraId: string;
  destino: string;
  intent: ContentIntent;
  route_family: RouteFamily;
};

/**
 * Resolve um termo de busca para o destino do cluster.
 * Retorna `undefined` quando nada casa — nesse caso quem decide é a
 * busca semântica geral, não este mapa.
 */
export function resolverCaudaLonga(consulta: string): ResolucaoCaudaLonga | undefined {
  const q = normalizar(consulta || "");
  if (!q) return undefined;

  for (const regra of REGRAS_CAUDA_LONGA) {
    const casou = regra.gatilhos.some((g) => q.includes(normalizar(g)));
    if (!casou) continue;
    // Fail-closed: uma regra nunca aponta para fora da coorte declarada.
    if (!isCohortUrl(regra.destino)) continue;
    return {
      regraId: regra.id,
      destino: regra.destino,
      intent: regra.intent,
      route_family: routeFamilyFromPath(regra.destino),
    };
  }
  return undefined;
}

/**
 * Contexto categórico para o analytics. Nunca inclui o texto digitado.
 */
export function contextoCaudaLonga(consulta: string) {
  const r = resolverCaudaLonga(consulta);
  return {
    long_tail_rule: r?.regraId ?? "none",
    long_tail_intent: r?.intent ?? "unmatched",
    long_tail_route_family: r?.route_family ?? "unknown",
  };
}
