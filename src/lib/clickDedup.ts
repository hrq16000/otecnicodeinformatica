/**
 * Deduplicação e anti-fraude de eventos de clique (Rodada 4M).
 *
 * Problema medido: um mesmo lead gera vários `wa_click` — duplo toque no
 * mobile, retentativa quando o WhatsApp demora a abrir, volta do app e novo
 * clique. Isso infla a taxa de conversão por sessão e distorce o A/B.
 *
 * Regras (todas em memória + sessionStorage, sem cookie e sem dado pessoal):
 *  1. Janela curta: o mesmo (evento + posição do CTA) na mesma sessão só é
 *     persistido uma vez a cada `JANELA_MS` (padrão 8s) — mata duplo clique
 *     e retentativa imediata.
 *  2. Teto por sessão: no máximo `MAX_POR_EVENTO` cliques do mesmo tipo por
 *     sessão (padrão 12). Acima disso o evento é descartado como ruído/robô.
 *  3. Rajada: mais de `MAX_RAJADA` cliques em `RAJADA_MS` marca a sessão como
 *     suspeita e todos os cliques seguintes são descartados.
 *
 * O clique do usuário NUNCA é bloqueado: a deduplicação só decide se o evento
 * entra na base de medição.
 */

const KEY = "click_dedup_v1";
const JANELA_MS = 8_000;
const MAX_POR_EVENTO = 12;
const MAX_RAJADA = 6;
const RAJADA_MS = 3_000;

interface DedupState {
  /** timestamp do último evento aceito por chave (evento+posição) */
  ultimo: Record<string, number>;
  /** contagem aceita por tipo de evento na sessão */
  contagem: Record<string, number>;
  /** timestamps recentes, para detectar rajada */
  recentes: number[];
  /** sessão marcada como suspeita (rajada) */
  suspeita?: boolean;
}

const vazio = (): DedupState => ({ ultimo: {}, contagem: {}, recentes: [] });

function ler(): DedupState {
  if (typeof window === "undefined") return vazio();
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return vazio();
    const parsed = JSON.parse(raw) as DedupState;
    return {
      ultimo: parsed.ultimo ?? {},
      contagem: parsed.contagem ?? {},
      recentes: Array.isArray(parsed.recentes) ? parsed.recentes : [],
      suspeita: parsed.suspeita === true,
    };
  } catch {
    return vazio();
  }
}

function gravar(state: DedupState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage indisponível — dedup vira no-op */
  }
}

export type MotivoDescarte = "duplicado" | "teto_sessao" | "rajada";

export interface ResultadoDedup {
  aceito: boolean;
  motivo?: MotivoDescarte;
}

/**
 * Decide se o evento deve ser medido. Só eventos de conversão
 * (`wa_click`, `call_click`) passam por aqui — eventos de navegação e de
 * etapa do funil continuam com a própria lógica.
 */
export function avaliarClique(
  eventType: string,
  posicao: string,
  agora: number = Date.now(),
): ResultadoDedup {
  const state = ler();

  if (state.suspeita) return { aceito: false, motivo: "rajada" };

  const chave = `${eventType}:${posicao || "sem-posicao"}`;
  const ultimo = state.ultimo[chave] ?? 0;
  if (agora - ultimo < JANELA_MS) return { aceito: false, motivo: "duplicado" };

  if ((state.contagem[eventType] ?? 0) >= MAX_POR_EVENTO) {
    return { aceito: false, motivo: "teto_sessao" };
  }

  const recentes = [...state.recentes.filter((t) => agora - t < RAJADA_MS), agora];
  if (recentes.length > MAX_RAJADA) {
    gravar({ ...state, recentes, suspeita: true });
    return { aceito: false, motivo: "rajada" };
  }

  gravar({
    ultimo: { ...state.ultimo, [chave]: agora },
    contagem: { ...state.contagem, [eventType]: (state.contagem[eventType] ?? 0) + 1 },
    recentes,
    suspeita: false,
  });
  return { aceito: true };
}

/** Reinicia o estado (usado em testes e no painel de debug). */
export function resetDedup() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}

export const DEDUP_CONFIG = { JANELA_MS, MAX_POR_EVENTO, MAX_RAJADA, RAJADA_MS };
