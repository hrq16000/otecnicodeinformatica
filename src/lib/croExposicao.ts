/**
 * RODADA 7A — EXPOSIÇÃO DE EXPERIMENTO (instrumentação antes da ativação)
 * ----------------------------------------------------------------------
 * Registra que uma sessão VIU uma variação. Sem exposição registrada não
 * existe denominador — e sem denominador não existe leitura de experimento.
 *
 * Regras:
 *  • fail-closed: se `decidirExperimento` bloquear, nada é emitido;
 *  • uma exposição por sessão × experimento (dedupe em sessionStorage);
 *  • payload sem PII: apenas `experiment_id`, `variant` e contexto de rota;
 *  • a variação vira `activeVariant()`, viajando para `click_events` em todos
 *    os eventos seguintes da sessão (CTA, triagem, WhatsApp, lead).
 */
import { buildRouteContext } from "./analyticsContract";
import { decidirExperimento, type DecisaoCro } from "./croRodada7";
import { setActiveVariant, track } from "./funnelAnalytics";

const CHAVE = "cro7_exposicao_v1";

const lidas = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CHAVE);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const marcar = (chave: string) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify([...new Set([...lidas(), chave])]));
  } catch {
    /* sessionStorage indisponível: no máximo perdemos o dedupe */
  }
};

/** `true` quando a exposição já foi contabilizada nesta sessão. */
export const exposicaoJaRegistrada = (experimentoId: string, sessionId: string): boolean =>
  lidas().includes(`${experimentoId}:${sessionId}`);

/**
 * Decide e registra a exposição. Devolve a decisão para a UI aplicar
 * (ou não) a variação — a UI nunca decide sozinha.
 */
export function registrarExposicao(params: {
  path: string;
  cidade?: string | null;
  sessionId: string;
}): DecisaoCro {
  const decisao = decidirExperimento(params);
  if (!decisao.habilitado) return decisao;

  const chave = `${decisao.experimento.id}:${params.sessionId}`;
  setActiveVariant(decisao.variante.id);
  if (exposicaoJaRegistrada(decisao.experimento.id, params.sessionId)) return decisao;

  const ctx = buildRouteContext(params.path);
  track("experiment_exposure", {
    experiment_id: decisao.experimento.id,
    variant: decisao.variante.id,
    route: ctx.route,
    route_family: ctx.route_family,
    page_slug: ctx.page_slug,
    service_slug: ctx.service_slug,
    city: ctx.city,
    neighborhood_slug: ctx.neighborhood_slug,
    intent: ctx.intent,
  });
  marcar(chave);
  return decisao;
}
