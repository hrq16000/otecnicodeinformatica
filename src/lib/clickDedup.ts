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
    window.sessionStorage.removeItem(BUCKET_KEY);
  } catch {
    /* noop */
  }
}

export const DEDUP_CONFIG = { JANELA_MS, MAX_POR_EVENTO, MAX_RAJADA, RAJADA_MS };

/* ------------------------------------------------------------------ *
 * RATE LIMITING (token bucket) — Onda 27
 *
 * A deduplicação acima mata repetição do MESMO clique. O balde abaixo
 * limita o VOLUME total de eventos de conversão/funil por sessão em
 * picos (bot, page em kiosk, loop de re-render), evitando explosão de
 * telemetria e custo. O clique do usuário nunca é bloqueado — só o
 * envio do evento é descartado.
 * ------------------------------------------------------------------ */

const BUCKET_KEY = "click_bucket_v1";
/** Capacidade máxima de eventos em rajada. */
const CAPACIDADE = 20;
/** Reposição de tokens por segundo (≈1 evento a cada 3s em regime). */
const RECARGA_POR_MS = 1 / 3_000;

interface BucketState {
  tokens: number;
  atualizadoEm: number;
  descartados: number;
}

function lerBucket(agora: number): BucketState {
  const inicial: BucketState = { tokens: CAPACIDADE, atualizadoEm: agora, descartados: 0 };
  if (typeof window === "undefined") return inicial;
  try {
    const raw = window.sessionStorage.getItem(BUCKET_KEY);
    if (!raw) return inicial;
    const p = JSON.parse(raw) as BucketState;
    return {
      tokens: Number.isFinite(p.tokens) ? p.tokens : CAPACIDADE,
      atualizadoEm: Number.isFinite(p.atualizadoEm) ? p.atualizadoEm : agora,
      descartados: Number.isFinite(p.descartados) ? p.descartados : 0,
    };
  } catch {
    return inicial;
  }
}

function gravarBucket(state: BucketState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(BUCKET_KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

export interface ResultadoRate {
  permitido: boolean;
  restantes: number;
  descartados: number;
}

/**
 * Consome um token do balde. Usado por `wa_click`, `call_click` e
 * `funnel_open` antes de qualquer envio (GA4, Supabase, observabilidade).
 */
export function consumirToken(agora: number = Date.now()): ResultadoRate {
  const state = lerBucket(agora);
  const decorrido = Math.max(0, agora - state.atualizadoEm);
  const tokens = Math.min(CAPACIDADE, state.tokens + decorrido * RECARGA_POR_MS);

  if (tokens < 1) {
    const proximo = { tokens, atualizadoEm: agora, descartados: state.descartados + 1 };
    gravarBucket(proximo);
    return { permitido: false, restantes: 0, descartados: proximo.descartados };
  }

  const proximo = { tokens: tokens - 1, atualizadoEm: agora, descartados: state.descartados };
  gravarBucket(proximo);
  return { permitido: true, restantes: Math.floor(proximo.tokens), descartados: proximo.descartados };
}

/** Decisão completa: dedup + rate limit. */
export function podeMedirEvento(
  eventType: string,
  posicao: string,
  agora: number = Date.now(),
): { aceito: boolean; motivo?: MotivoDescarte | "rate_limit" } {
  const dedup = avaliarClique(eventType, posicao, agora);
  if (!dedup.aceito) return dedup;
  const rate = consumirToken(agora);
  return rate.permitido ? { aceito: true } : { aceito: false, motivo: "rate_limit" };
}

export const RATE_CONFIG = { CAPACIDADE, RECARGA_POR_MS };
