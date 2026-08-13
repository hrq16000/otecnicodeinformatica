/**
 * MÉTRICAS DE INTERAÇÃO E ESTADOS DE CARREGAMENTO.
 *
 * Mede quanto tempo o usuário fica esperando depois de agir:
 *   • `medirInteracao`  → clique/submit até a promessa resolver;
 *   • `iniciarEstadoCarregamento` → duração de um estado de loading
 *     (LoadingButton, AsyncContent/Skeleton) até o conteúdo aparecer.
 *
 * Cada ciclo gera:
 *   • Sentry: evento `ui.loading_start` (info) no início e
 *     `ui.loading_end` (info/warning) no fim, com duração, resultado e o
 *     CTA que originou a espera — dá para reconstruir "toque no CTA de
 *     WhatsApp → botão em loading por 3,2 s → erro";
 *   • OTLP: span `ui.loading` com a mesma duração, no trace da sessão;
 *   • GA4: `ui_interaction_latency` / `ui_loading_state` e
 *     `ui_budget_exceeded` quando a espera estoura o orçamento do CI;
 *   • histórico local (localStorage) consumido pelo painel
 *     /admin/ui-performance.
 *
 * Sem PII: só nome da superfície, rota, CTA, resultado e duração em ms.
 */
import {
  registrarLog,
  capturarErro,
  capturarEvento,
  registrarSpan,
  observabilidadeAtiva,
} from "@/lib/observability";
import { BUDGETS, formatarMetrica } from "@/lib/uiPerformanceBudgets";

/** Tetos idênticos aos do gate de CI (fonte única em uiPerformanceBudgets). */
export const ORCAMENTO_INTERACAO_MS = BUDGETS.INTERACTION;
export const ORCAMENTO_LOADING_MS = BUDGETS.LOADING;

export type ResultadoInteracao = "success" | "error" | "abort";

export type Amostra = {
  tipo: "interaction" | "loading";
  superficie: string;
  primitiva: string;
  duracao: number;
  resultado: ResultadoInteracao;
  rota: string;
  excedeu: boolean;
  timestamp: number;
  /** CTA tocado imediatamente antes da espera (correlação de funil). */
  ctaTipo?: string;
  ctaLocal?: string;
};

export type AlertaUi = {
  metrica: "INTERACTION" | "LOADING";
  superficie: string;
  primitiva: string;
  duracao: number;
  budget: number;
  rota: string;
  resultado: ResultadoInteracao;
  timestamp: number;
};

const MAX_AMOSTRAS = 100;
const MAX_PERSISTIDAS = 300;
const MAX_ALERTAS = 50;
const CHAVE_AMOSTRAS = "tc_ui_metrics";
const CHAVE_ALERTAS = "tc_ui_alerts";
/** Janela em que um clique de CTA ainda explica o loading que começou. */
const JANELA_CTA_MS = 10_000;

const amostras: Amostra[] = [];

/** Snapshot em memória — consumido por painéis internos e testes E2E. */
export const lerAmostrasInteracao = (): Amostra[] => [...amostras];

const lerLista = <T>(chave: string): T[] => {
  try {
    const raw = localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
};

const gravarLista = (chave: string, lista: unknown[], max: number) => {
  try {
    localStorage.setItem(chave, JSON.stringify(lista.slice(-max)));
  } catch {
    /* quota cheia: métrica é descartável */
  }
};

/** Histórico persistido (sobrevive a navegações) — base do painel. */
export const lerHistoricoUi = (): Amostra[] => lerLista<Amostra>(CHAVE_AMOSTRAS);
export const limparHistoricoUi = () => {
  try {
    localStorage.removeItem(CHAVE_AMOSTRAS);
  } catch {
    /* ignore */
  }
};

/** Alertas de budget estourado (mesmo critério do CI). */
export const lerAlertasUi = (): AlertaUi[] => lerLista<AlertaUi>(CHAVE_ALERTAS);
export const limparAlertasUi = () => {
  try {
    localStorage.removeItem(CHAVE_ALERTAS);
  } catch {
    /* ignore */
  }
};

const agora = () =>
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();

const rotaAtual = () => (typeof location !== "undefined" ? location.pathname : "");

/**
 * Último CTA tocado (gravado por `trackCTAClick`), se ainda recente.
 * É o que amarra a espera do botão ao toque que a originou.
 */
const contextoCta = () => {
  if (typeof window === "undefined") return {};
  const w = window as Window & {
    __ctaTracked?: { type: string; location: string; t: number };
  };
  const cta = w.__ctaTracked;
  if (!cta || Date.now() - cta.t > JANELA_CTA_MS) return {};
  return { ctaTipo: cta.type, ctaLocal: cta.location };
};

const dispararAlerta = (amostra: Amostra) => {
  const metrica = amostra.tipo === "interaction" ? "INTERACTION" : "LOADING";
  const budget = amostra.tipo === "interaction" ? BUDGETS.INTERACTION : BUDGETS.LOADING;
  const alerta: AlertaUi = {
    metrica,
    superficie: amostra.superficie,
    primitiva: amostra.primitiva,
    duracao: Math.round(amostra.duracao),
    budget,
    rota: amostra.rota,
    resultado: amostra.resultado,
    timestamp: amostra.timestamp,
  };

  gravarLista(CHAVE_ALERTAS, [...lerAlertasUi(), alerta], MAX_ALERTAS);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ui-metric-alert", { detail: alerta }));
    window.gtag?.("event", "ui_budget_exceeded", {
      metric_name: metrica,
      metric_value: alerta.duracao,
      budget_value: budget,
      surface: amostra.superficie,
      primitive: amostra.primitiva,
      outcome: amostra.resultado,
      page_path: amostra.rota,
      cta_type: amostra.ctaTipo,
      cta_location: amostra.ctaLocal,
      non_interaction: true,
    });
  }

  capturarEvento("ui.budget_exceeded", "warning", {
    message: `${metrica} ${formatarMetrica("INTERACTION", amostra.duracao)} acima do budget ${budget}ms em ${amostra.primitiva}:${amostra.superficie} (${amostra.rota})`,
    surface: amostra.superficie,
    primitive: amostra.primitiva,
    outcome: amostra.resultado,
    duration_ms: alerta.duracao,
    budget_ms: budget,
    path: amostra.rota,
    cta_type: amostra.ctaTipo,
    cta_location: amostra.ctaLocal,
  });
};

const registrar = (amostra: Amostra) => {
  amostras.push(amostra);
  while (amostras.length > MAX_AMOSTRAS) amostras.shift();
  gravarLista(CHAVE_AMOSTRAS, [...lerHistoricoUi(), amostra], MAX_PERSISTIDAS);

  if (typeof window !== "undefined") {
    const w = window as Window & { __UI_METRICS__?: Amostra[] };
    w.__UI_METRICS__ = amostras;
    window.dispatchEvent(new CustomEvent("ui-metric", { detail: amostra }));

    const evento = amostra.tipo === "interaction" ? "ui_interaction_latency" : "ui_loading_state";
    window.gtag?.("event", evento, {
      surface: amostra.superficie,
      primitive: amostra.primitiva,
      outcome: amostra.resultado,
      duration_ms: Math.round(amostra.duracao),
      over_budget: amostra.excedeu,
      page_path: amostra.rota,
      cta_type: amostra.ctaTipo,
      cta_location: amostra.ctaLocal,
    });
  }

  if (amostra.excedeu) dispararAlerta(amostra);

  if (!observabilidadeAtiva()) return;

  const atributos = {
    "ui.surface": amostra.superficie,
    "ui.primitive": amostra.primitiva,
    "ui.outcome": amostra.resultado,
    "ui.duration_ms": Math.round(amostra.duracao),
    "ui.over_budget": amostra.excedeu,
    "ui.cta_type": amostra.ctaTipo ?? "",
    "ui.cta_location": amostra.ctaLocal ?? "",
  };

  registrarLog(amostra.excedeu ? "WARN" : "INFO", `ui.${amostra.tipo}`, atributos);
  registrarSpan(
    `ui.${amostra.tipo}`,
    amostra.duracao,
    atributos,
    amostra.resultado === "error" ? "error" : "ok",
  );

  // Fim do ciclo de loading: sempre visível no Sentry (info quando dentro do
  // budget, warning quando estourou) — permite montar o funil toque → espera.
  if (amostra.tipo === "loading" && amostra.resultado !== "abort") {
    capturarEvento("ui.loading_end", amostra.excedeu ? "warning" : "info", {
      message: `${amostra.primitiva}:${amostra.superficie} ${amostra.resultado} em ${Math.round(amostra.duracao)}ms`,
      surface: amostra.superficie,
      primitive: amostra.primitiva,
      outcome: amostra.resultado,
      duration_ms: Math.round(amostra.duracao),
      path: amostra.rota,
      cta_type: amostra.ctaTipo,
      cta_location: amostra.ctaLocal,
    });
  }

  if (amostra.resultado === "error") {
    capturarErro("ui.interaction_failed", {
      message: `${amostra.primitiva}:${amostra.superficie} falhou após ${Math.round(amostra.duracao)}ms`,
      surface: amostra.superficie,
      duration_ms: Math.round(amostra.duracao),
      cta_type: amostra.ctaTipo,
      cta_location: amostra.ctaLocal,
    });
  }
};

/**
 * Abre uma janela de medição de estado de carregamento.
 * Retorna a função de encerramento — chame quando o conteúdo real aparecer.
 */
export const iniciarEstadoCarregamento = (
  superficie: string,
  primitiva: "loading-button" | "skeleton" | "async-content" | string = "skeleton",
) => {
  const inicio = agora();
  const cta = contextoCta();
  let encerrado = false;

  if (primitiva === "loading-button") {
    // Início registrado na hora: se o usuário abandonar a página no meio da
    // espera, o Sentry ainda mostra que o botão ficou travado em loading.
    capturarEvento("ui.loading_start", "info", {
      message: `${primitiva}:${superficie} entrou em loading`,
      surface: superficie,
      primitive: primitiva,
      path: rotaAtual(),
      cta_type: cta.ctaTipo,
      cta_location: cta.ctaLocal,
    });
  }

  return (resultado: ResultadoInteracao = "success") => {
    if (encerrado) return 0;
    encerrado = true;
    const duracao = agora() - inicio;
    registrar({
      tipo: "loading",
      superficie,
      primitiva,
      duracao,
      resultado,
      rota: rotaAtual(),
      excedeu: resultado !== "abort" && duracao > ORCAMENTO_LOADING_MS,
      timestamp: Date.now(),
      ...cta,
    });
    return duracao;
  };
};

/** Mede uma ação assíncrona disparada pelo usuário (clique → resposta). */
export const medirInteracao = async <T>(
  superficie: string,
  acao: () => Promise<T>,
  primitiva = "loading-button",
): Promise<T> => {
  const inicio = agora();
  try {
    const valor = await acao();
    finalizarInteracao(superficie, primitiva, agora() - inicio, "success");
    return valor;
  } catch (erro) {
    finalizarInteracao(superficie, primitiva, agora() - inicio, "error");
    throw erro;
  }
};

const finalizarInteracao = (
  superficie: string,
  primitiva: string,
  duracao: number,
  resultado: ResultadoInteracao,
) =>
  registrar({
    tipo: "interaction",
    superficie,
    primitiva,
    duracao,
    resultado,
    rota: rotaAtual(),
    excedeu: duracao > ORCAMENTO_INTERACAO_MS,
    timestamp: Date.now(),
    ...contextoCta(),
  });
