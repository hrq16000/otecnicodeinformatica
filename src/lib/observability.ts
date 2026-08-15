/**
 * OBSERVABILIDADE (fail-closed, sem SDK de terceiros no bundle).
 *
 * Um único sink neutro, ligado apenas por variável de ambiente:
 *   • VITE_SENTRY_DSN    → envia exceções pela Store API do Sentry (HTTP puro);
 *   • VITE_OTLP_ENDPOINT → envia logs/spans em OTLP-JSON (coletor OpenTelemetry,
 *     Datadog Agent OTLP ou New Relic OTLP — o destino é escolhido pela env,
 *     nunca hardcoded).
 *
 * Sem env configurada nada é enviado: nenhum request, nenhum peso extra.
 * Nada de PII — só rota, tipo de evento, versão do build e ids de trace.
 */
import { envStr, envNum } from "@/lib/config/env";

declare const __APP_VERSION__: string;
const VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";

const DSN = envStr("VITE_SENTRY_DSN");
const OTLP = envStr("VITE_OTLP_ENDPOINT");
const SAMPLE = envNum("VITE_OBSERVABILITY_SAMPLE") ?? 1;
const AMBIENTE = envStr("VITE_OBSERVABILITY_ENV") ?? "production";

export const observabilidadeAtiva = () => Boolean(DSN || OTLP);

const hex = (n: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/** Trace da sessão (W3C trace context) — correlaciona erro, funil e vitals. */
let traceId = "";
export const getTraceId = () => {
  if (!traceId) traceId = typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function" ? hex(16) : "0".repeat(32);
  return traceId;
};

const amostrar = () => Math.random() < Math.min(Math.max(SAMPLE, 0), 1);

type Attrs = Record<string, unknown>;

const atributosBase = (): Attrs => ({
  "service.name": "otecnicodeinformatica",
  "service.version": VERSION,
  "deployment.environment": AMBIENTE,
  "url.path": typeof location !== "undefined" ? location.pathname : "",
  "trace.id": getTraceId(),
});

const enviar = (url: string, corpo: unknown, headers: Record<string, string> = {}) => {
  try {
    const body = JSON.stringify(corpo);
    const h = { "content-type": "application/json", ...headers };
    // keepalive garante entrega mesmo em unload; falha silenciosa por design.
    void fetch(url, { method: "POST", body, headers: h, keepalive: true, mode: "cors" }).catch(() => undefined);
  } catch {
    /* noop */
  }
};

/** Endpoint de ingestão derivado do DSN (`https://<key>@<host>/<project>`). */
const sentryAlvo = () => {
  if (!DSN) return null;
  try {
    const u = new URL(DSN);
    const projeto = u.pathname.replace(/^\//, "");
    return {
      url: `${u.protocol}//${u.host}/api/${projeto}/store/`,
      auth: `Sentry sentry_version=7, sentry_key=${u.username}, sentry_client=lovable-lite/1.0`,
    };
  } catch {
    return null;
  }
};

/** Exceção (Sentry) + log de erro (OTLP). */
export const capturarErro = (kind: string, payload: Attrs) => {
  if (!observabilidadeAtiva() || !amostrar()) return;
  const mensagem = String(payload.message ?? kind).slice(0, 500);

  const alvo = sentryAlvo();
  if (alvo) {
    enviar(
      alvo.url,
      {
        event_id: hex(16),
        timestamp: new Date().toISOString(),
        platform: "javascript",
        level: "error",
        logger: kind,
        release: VERSION,
        environment: AMBIENTE,
        message: { formatted: mensagem },
        contexts: { trace: { trace_id: getTraceId(), span_id: hex(8), op: kind } },
        tags: { kind, path: typeof location !== "undefined" ? location.pathname : "" },
        extra: { ...payload, stack: String(payload.stack ?? "").slice(0, 4000) },
      },
      { "x-sentry-auth": alvo.auth },
    );
  }

  registrarLog("ERROR", mensagem, { ...atributosBase(), "event.kind": kind, ...payload });
};

const valorOtlp = (v: unknown) =>
  typeof v === "number"
    ? Number.isInteger(v)
      ? { intValue: String(v) }
      : { doubleValue: v }
    : typeof v === "boolean"
      ? { boolValue: v }
      : { stringValue: String(v ?? "").slice(0, 1000) };

const paraAtributos = (attrs: Attrs) =>
  Object.entries(attrs).map(([key, value]) => ({ key, value: valorOtlp(value) }));

/** Log estruturado em OTLP-JSON (Datadog/New Relic/OTel Collector). */
export const registrarLog = (
  severidade: "INFO" | "WARN" | "ERROR",
  corpo: string,
  attrs: Attrs = {},
) => {
  if (!OTLP) return;
  enviar(`${OTLP.replace(/\/$/, "")}/v1/logs`, {
    resourceLogs: [
      {
        resource: { attributes: paraAtributos(atributosBase()) },
        scopeLogs: [
          {
            scope: { name: "portal.web" },
            logRecords: [
              {
                timeUnixNano: `${Date.now()}000000`,
                severityText: severidade,
                severityNumber: severidade === "ERROR" ? 17 : severidade === "WARN" ? 13 : 9,
                body: { stringValue: corpo.slice(0, 1000) },
                traceId: getTraceId(),
                spanId: hex(8),
                attributes: paraAtributos({ ...atributosBase(), ...attrs }),
              },
            ],
          },
        ],
      },
    ],
  });
};

/**
 * Evento não-fatal no Sentry (nível info/warning) + log OTLP.
 * Usado para o ciclo de vida de estados de carregamento e para alertas de
 * budget: são sinais operacionais, não exceções — por isso não usam
 * `capturarErro` (que sobe como `level: error` e polui a taxa de crash).
 */
export const capturarEvento = (
  kind: string,
  nivel: "info" | "warning",
  payload: Attrs = {},
) => {
  if (!observabilidadeAtiva() || !amostrar()) return;
  const mensagem = String(payload.message ?? kind).slice(0, 500);

  const alvo = sentryAlvo();
  if (alvo) {
    enviar(
      alvo.url,
      {
        event_id: hex(16),
        timestamp: new Date().toISOString(),
        platform: "javascript",
        level: nivel,
        logger: kind,
        release: VERSION,
        environment: AMBIENTE,
        message: { formatted: mensagem },
        contexts: { trace: { trace_id: getTraceId(), span_id: hex(8), op: kind } },
        tags: {
          kind,
          path: typeof location !== "undefined" ? location.pathname : "",
          ...(payload.surface ? { surface: String(payload.surface).slice(0, 80) } : {}),
          ...(payload.primitive ? { primitive: String(payload.primitive).slice(0, 40) } : {}),
          ...(payload.outcome ? { outcome: String(payload.outcome).slice(0, 20) } : {}),
        },
        extra: payload,
      },
      { "x-sentry-auth": alvo.auth },
    );
  }

  registrarLog(nivel === "warning" ? "WARN" : "INFO", mensagem, {
    ...atributosBase(),
    "event.kind": kind,
    ...payload,
  });
};

/**
 * Span OTLP de duração conhecida (ex.: janela de loading de um botão).
 * Vai para o mesmo trace da sessão, então o span aparece ao lado dos logs
 * de funil e dos alertas de Web Vitals daquela navegação.
 */
export const registrarSpan = (
  nome: string,
  duracaoMs: number,
  attrs: Attrs = {},
  status: "ok" | "error" = "ok",
) => {
  if (!OTLP) return;
  const fimNano = Date.now() * 1e6;
  const inicioNano = fimNano - Math.max(0, Math.round(duracaoMs)) * 1e6;
  enviar(`${OTLP.replace(/\/$/, "")}/v1/traces`, {
    resourceSpans: [
      {
        resource: { attributes: paraAtributos(atributosBase()) },
        scopeSpans: [
          {
            scope: { name: "portal.web" },
            spans: [
              {
                traceId: getTraceId(),
                spanId: hex(8),
                name: nome.slice(0, 120),
                kind: 1,
                startTimeUnixNano: String(inicioNano),
                endTimeUnixNano: String(fimNano),
                attributes: paraAtributos(attrs),
                status: { code: status === "error" ? 2 : 1 },
              },
            ],
          },
        ],
      },
    ],
  });
};

/**
 * Etapa do funil de conversão (clique em WhatsApp, abertura do funil…).
 * Espelha o evento já enviado ao GA4 — aqui só para alertas/observabilidade.
 */
export const registrarEtapaFunil = (evento: string, attrs: Attrs = {}) => {
  if (!observabilidadeAtiva()) return;
  registrarLog("INFO", `funnel.${evento}`, { "funnel.event": evento, ...attrs });
};

/**
 * Falhas de carregamento de recurso (script/imagem/CSS que não baixou).
 * É o sinal mais direto de "página quebrada em produção" e alimenta alertas.
 */
export const iniciarObservabilidade = () => {
  if (typeof window === "undefined" || !observabilidadeAtiva()) return;
  const w = window as unknown as { __obsInit?: boolean };
  if (w.__obsInit) return;
  w.__obsInit = true;

  window.addEventListener(
    "error",
    (e) => {
      const alvo = e.target as (HTMLElement & { src?: string; href?: string }) | null;
      if (!alvo || alvo === (window as unknown as HTMLElement) || !alvo.tagName) return;
      const recurso = alvo.src || alvo.href;
      if (!recurso) return;
      registrarLog("ERROR", "resource.load_failed", {
        "resource.tag": alvo.tagName.toLowerCase(),
        "resource.url": recurso,
      });
    },
    true,
  );

  registrarLog("INFO", "page.view", { "page.title": document.title.slice(0, 120) });
};
