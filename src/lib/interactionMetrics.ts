/**
 * MÉTRICAS DE INTERAÇÃO E ESTADOS DE CARREGAMENTO.
 *
 * Mede quanto tempo o usuário fica esperando depois de agir:
 *   • `medirInteracao`  → clique/submit até a promessa resolver;
 *   • `iniciarEstadoCarregamento` → duração de um estado de loading
 *     (LoadingButton, AsyncContent/Skeleton) até o conteúdo aparecer.
 *
 * Cada amostra vira:
 *   • evento GA4 (`ui_interaction_latency` / `ui_loading_state`);
 *   • log estruturado OTLP + breadcrumb de erro no Sentry quando a
 *     espera estoura o orçamento (útil para correlacionar loading lento
 *     com abandono de funil).
 *
 * Sem PII: só nome da superfície, rota, resultado e duração em ms.
 */
import { registrarLog, capturarErro, observabilidadeAtiva } from "@/lib/observability";

/** Acima disso a espera é considerada ruim e vira alerta. */
export const ORCAMENTO_INTERACAO_MS = 1000;
export const ORCAMENTO_LOADING_MS = 2500;

export type ResultadoInteracao = "success" | "error" | "abort";

type Amostra = {
  tipo: "interaction" | "loading";
  superficie: string;
  primitiva: string;
  duracao: number;
  resultado: ResultadoInteracao;
  rota: string;
  excedeu: boolean;
  timestamp: number;
};

const MAX_AMOSTRAS = 100;
const amostras: Amostra[] = [];

/** Snapshot em memória — consumido por painéis internos e testes E2E. */
export const lerAmostrasInteracao = (): Amostra[] => [...amostras];

const agora = () =>
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();

const rotaAtual = () => (typeof location !== "undefined" ? location.pathname : "");

const registrar = (amostra: Amostra) => {
  amostras.push(amostra);
  while (amostras.length > MAX_AMOSTRAS) amostras.shift();

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
    });
  }

  if (!observabilidadeAtiva()) return;

  registrarLog(amostra.excedeu ? "WARN" : "INFO", `ui.${amostra.tipo}`, {
    "ui.surface": amostra.superficie,
    "ui.primitive": amostra.primitiva,
    "ui.outcome": amostra.resultado,
    "ui.duration_ms": Math.round(amostra.duracao),
    "ui.over_budget": amostra.excedeu,
  });

  if (amostra.resultado === "error") {
    capturarErro("ui.interaction_failed", {
      message: `${amostra.primitiva}:${amostra.superficie} falhou após ${Math.round(amostra.duracao)}ms`,
      surface: amostra.superficie,
      duration_ms: Math.round(amostra.duracao),
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
  let encerrado = false;
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
      excedeu: duracao > ORCAMENTO_LOADING_MS,
      timestamp: Date.now(),
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
  });
