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
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const KEY = stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), "click_dedup_v1");
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
const vazio = stryMutAct_9fa48("1") ? () => undefined : (stryCov_9fa48("1"), (() => {
  const vazio = (): DedupState => stryMutAct_9fa48("2") ? {} : (stryCov_9fa48("2"), {
    ultimo: {},
    contagem: {},
    recentes: stryMutAct_9fa48("3") ? ["Stryker was here"] : (stryCov_9fa48("3"), [])
  });
  return vazio;
})());
function ler(): DedupState {
  if (stryMutAct_9fa48("4")) {
    {}
  } else {
    stryCov_9fa48("4");
    if (stryMutAct_9fa48("7") ? typeof window !== "undefined" : stryMutAct_9fa48("6") ? false : stryMutAct_9fa48("5") ? true : (stryCov_9fa48("5", "6", "7"), typeof window === (stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "undefined")))) return vazio();
    try {
      if (stryMutAct_9fa48("9")) {
        {}
      } else {
        stryCov_9fa48("9");
        const raw = window.sessionStorage.getItem(KEY);
        if (stryMutAct_9fa48("12") ? false : stryMutAct_9fa48("11") ? true : stryMutAct_9fa48("10") ? raw : (stryCov_9fa48("10", "11", "12"), !raw)) return vazio();
        const parsed = JSON.parse(raw) as DedupState;
        return stryMutAct_9fa48("13") ? {} : (stryCov_9fa48("13"), {
          ultimo: stryMutAct_9fa48("14") ? parsed.ultimo && {} : (stryCov_9fa48("14"), parsed.ultimo ?? {}),
          contagem: stryMutAct_9fa48("15") ? parsed.contagem && {} : (stryCov_9fa48("15"), parsed.contagem ?? {}),
          recentes: Array.isArray(parsed.recentes) ? parsed.recentes : stryMutAct_9fa48("16") ? ["Stryker was here"] : (stryCov_9fa48("16"), []),
          suspeita: stryMutAct_9fa48("19") ? parsed.suspeita !== true : stryMutAct_9fa48("18") ? false : stryMutAct_9fa48("17") ? true : (stryCov_9fa48("17", "18", "19"), parsed.suspeita === (stryMutAct_9fa48("20") ? false : (stryCov_9fa48("20"), true)))
        });
      }
    } catch {
      if (stryMutAct_9fa48("21")) {
        {}
      } else {
        stryCov_9fa48("21");
        return vazio();
      }
    }
  }
}
function gravar(state: DedupState) {
  if (stryMutAct_9fa48("22")) {
    {}
  } else {
    stryCov_9fa48("22");
    if (stryMutAct_9fa48("25") ? typeof window !== "undefined" : stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24", "25"), typeof window === (stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("27")) {
        {}
      } else {
        stryCov_9fa48("27");
        window.sessionStorage.setItem(KEY, JSON.stringify(state));
      }
    } catch {
      /* storage indisponível — dedup vira no-op */
    }
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
export function avaliarClique(eventType: string, posicao: string, agora: number = Date.now()): ResultadoDedup {
  if (stryMutAct_9fa48("28")) {
    {}
  } else {
    stryCov_9fa48("28");
    const state = ler();
    if (stryMutAct_9fa48("30") ? false : stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29", "30"), state.suspeita)) return stryMutAct_9fa48("31") ? {} : (stryCov_9fa48("31"), {
      aceito: stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32"), false),
      motivo: stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "rajada")
    });
    const chave = stryMutAct_9fa48("34") ? `` : (stryCov_9fa48("34"), `${eventType}:${stryMutAct_9fa48("37") ? posicao && "sem-posicao" : stryMutAct_9fa48("36") ? false : stryMutAct_9fa48("35") ? true : (stryCov_9fa48("35", "36", "37"), posicao || (stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "sem-posicao")))}`);
    const ultimo = stryMutAct_9fa48("39") ? state.ultimo[chave] && 0 : (stryCov_9fa48("39"), state.ultimo[chave] ?? 0);
    if (stryMutAct_9fa48("43") ? agora - ultimo >= JANELA_MS : stryMutAct_9fa48("42") ? agora - ultimo <= JANELA_MS : stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41", "42", "43"), (stryMutAct_9fa48("44") ? agora + ultimo : (stryCov_9fa48("44"), agora - ultimo)) < JANELA_MS)) return stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
      aceito: stryMutAct_9fa48("46") ? true : (stryCov_9fa48("46"), false),
      motivo: stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "duplicado")
    });
    if (stryMutAct_9fa48("51") ? (state.contagem[eventType] ?? 0) < MAX_POR_EVENTO : stryMutAct_9fa48("50") ? (state.contagem[eventType] ?? 0) > MAX_POR_EVENTO : stryMutAct_9fa48("49") ? false : stryMutAct_9fa48("48") ? true : (stryCov_9fa48("48", "49", "50", "51"), (stryMutAct_9fa48("52") ? state.contagem[eventType] && 0 : (stryCov_9fa48("52"), state.contagem[eventType] ?? 0)) >= MAX_POR_EVENTO)) {
      if (stryMutAct_9fa48("53")) {
        {}
      } else {
        stryCov_9fa48("53");
        return stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
          aceito: stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55"), false),
          motivo: stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), "teto_sessao")
        });
      }
    }
    const recentes = stryMutAct_9fa48("57") ? [] : (stryCov_9fa48("57"), [...(stryMutAct_9fa48("58") ? state.recentes : (stryCov_9fa48("58"), state.recentes.filter(stryMutAct_9fa48("59") ? () => undefined : (stryCov_9fa48("59"), t => stryMutAct_9fa48("63") ? agora - t >= RAJADA_MS : stryMutAct_9fa48("62") ? agora - t <= RAJADA_MS : stryMutAct_9fa48("61") ? false : stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60", "61", "62", "63"), (stryMutAct_9fa48("64") ? agora + t : (stryCov_9fa48("64"), agora - t)) < RAJADA_MS))))), agora]);
    if (stryMutAct_9fa48("68") ? recentes.length <= MAX_RAJADA : stryMutAct_9fa48("67") ? recentes.length >= MAX_RAJADA : stryMutAct_9fa48("66") ? false : stryMutAct_9fa48("65") ? true : (stryCov_9fa48("65", "66", "67", "68"), recentes.length > MAX_RAJADA)) {
      if (stryMutAct_9fa48("69")) {
        {}
      } else {
        stryCov_9fa48("69");
        gravar(stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
          ...state,
          recentes,
          suspeita: stryMutAct_9fa48("71") ? false : (stryCov_9fa48("71"), true)
        }));
        return stryMutAct_9fa48("72") ? {} : (stryCov_9fa48("72"), {
          aceito: stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73"), false),
          motivo: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "rajada")
        });
      }
    }
    gravar(stryMutAct_9fa48("75") ? {} : (stryCov_9fa48("75"), {
      ultimo: stryMutAct_9fa48("76") ? {} : (stryCov_9fa48("76"), {
        ...state.ultimo,
        [chave]: agora
      }),
      contagem: stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
        ...state.contagem,
        [eventType]: stryMutAct_9fa48("78") ? (state.contagem[eventType] ?? 0) - 1 : (stryCov_9fa48("78"), (stryMutAct_9fa48("79") ? state.contagem[eventType] && 0 : (stryCov_9fa48("79"), state.contagem[eventType] ?? 0)) + 1)
      }),
      recentes,
      suspeita: stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80"), false)
    }));
    return stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
      aceito: stryMutAct_9fa48("82") ? false : (stryCov_9fa48("82"), true)
    });
  }
}

/** Reinicia o estado (usado em testes e no painel de debug). */
export function resetDedup() {
  if (stryMutAct_9fa48("83")) {
    {}
  } else {
    stryCov_9fa48("83");
    if (stryMutAct_9fa48("86") ? typeof window !== "undefined" : stryMutAct_9fa48("85") ? false : stryMutAct_9fa48("84") ? true : (stryCov_9fa48("84", "85", "86"), typeof window === (stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("88")) {
        {}
      } else {
        stryCov_9fa48("88");
        window.sessionStorage.removeItem(KEY);
      }
    } catch {
      /* noop */
    }
  }
}
export const DEDUP_CONFIG = stryMutAct_9fa48("89") ? {} : (stryCov_9fa48("89"), {
  JANELA_MS,
  MAX_POR_EVENTO,
  MAX_RAJADA,
  RAJADA_MS
});