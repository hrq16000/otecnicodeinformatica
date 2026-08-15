/**
 * RODADA 6 — AVALIAÇÃO DE LIMITES DO FUNIL (lógica pura, testável)
 *
 * Recebe eventos brutos (já sem QA) e a configuração de limites, devolve as
 * violações. Nenhuma decisão é tomada com amostra insuficiente e nenhum
 * recorte geográfico é inferido: cidade/bairro/serviço vêm do próprio evento.
 */

const ETAPAS = {
  cta: ["cta_click"],
  triagem: ["funnel_open", "triage_start", "triage_complete"],
  whatsapp: ["wa_click", "whatsapp_open"],
  lead: ["lead_submitted", "wa_funnel_submit"],
};

const RATE_ETAPA = {
  cta_rate: "cta",
  triage_rate: "triagem",
  whatsapp_rate: "whatsapp",
  lead_rate: "lead",
};

/** Cidade a partir da rota. Sem fallback para Curitiba. */
export function cidadeDaRota(path) {
  if (!path) return undefined;
  const svc = /^\/servicos\/[^/]+\/([a-z0-9-]+)$/.exec(path);
  if (svc) return svc[1];
  const local = /^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/.exec(path);
  return local ? local[1] : undefined;
}

function chaveDoRecorte(tipo, evento) {
  switch (tipo) {
    case "route":
      return evento.path || undefined;
    case "city":
      return evento.cidade || cidadeDaRota(evento.path);
    case "neighborhood":
      return evento.neighborhood_slug || undefined;
    case "service":
      return evento.servico || undefined;
    case "route_family":
      return evento.route_family || undefined;
    default:
      return undefined;
  }
}

/** Agrega sessões distintas por etapa dentro de um recorte. */
export function agregarRecorte(eventos, tipo, valor) {
  const buckets = { sessoes: new Set(), cta: new Set(), triagem: new Set(), whatsapp: new Set(), lead: new Set() };
  for (const e of eventos) {
    const chave = chaveDoRecorte(tipo, e);
    if (valor !== undefined && chave !== valor) continue;
    const sid = e.session_id || e.created_at || "sem-sessao";
    buckets.sessoes.add(sid);
    for (const [etapa, tipos] of Object.entries(ETAPAS)) {
      if (tipos.includes(e.event_type)) buckets[etapa].add(sid);
    }
  }
  return {
    sessoes: buckets.sessoes.size,
    cta: buckets.cta.size,
    triagem: buckets.triagem.size,
    whatsapp: buckets.whatsapp.size,
    lead: buckets.lead.size,
  };
}

const taxa = (parte, base) => (base > 0 ? parte / base : undefined);

/**
 * Avalia limites e devolve `{ violacoes, avaliados }`.
 * Uma violação só existe com amostra >= amostraMinima do recorte.
 */
export function avaliarLimites(eventos, config) {
  const violacoes = [];
  const avaliados = [];

  const alvos = [
    { tipo: "global", valor: "(todas as rotas)", limites: config.global ?? {}, amostraMinima: config.amostraMinima ?? 30 },
    ...(config.recortes ?? []).map((r) => ({
      tipo: r.tipo,
      valor: r.valor,
      limites: r.limites ?? {},
      amostraMinima: r.amostraMinima ?? config.amostraMinima ?? 30,
    })),
  ];

  for (const alvo of alvos) {
    const agg =
      alvo.tipo === "global"
        ? agregarRecorte(eventos, "global", undefined)
        : agregarRecorte(eventos, alvo.tipo, alvo.valor);
    const taxas = {
      cta_rate: taxa(agg.cta, agg.sessoes),
      triage_rate: taxa(agg.triagem, agg.sessoes),
      whatsapp_rate: taxa(agg.whatsapp, agg.sessoes),
      lead_rate: taxa(agg.lead, agg.sessoes),
    };
    const status = agg.sessoes < alvo.amostraMinima ? "insufficient_data" : "actionable";
    avaliados.push({ ...alvo, agg, taxas, status });
    if (status !== "actionable") continue;

    for (const [metrica, limite] of Object.entries(alvo.limites)) {
      const atual = taxas[metrica];
      if (atual === undefined || !RATE_ETAPA[metrica]) continue;
      if (atual < limite) {
        violacoes.push({
          tipo: alvo.tipo,
          valor: alvo.valor,
          metrica,
          atual: Math.round(atual * 10000) / 10000,
          limite,
          sessoes: agg.sessoes,
        });
      }
    }
  }

  return { violacoes, avaliados };
}

/** Texto de alerta para o Slack (sem PII, sem inventar contexto). */
export function formatarAlerta(violacoes, meta = {}) {
  if (violacoes.length === 0) return null;
  const linhas = violacoes.map(
    (v) =>
      `• *${v.tipo}* \`${v.valor}\` — ${v.metrica}: ${(v.atual * 100).toFixed(1)}% (limite ${(v.limite * 100).toFixed(1)}%, ${v.sessoes} sessões)`,
  );
  return [
    `:rotating_light: *Funil abaixo do limite* — janela de ${meta.janelaDias ?? "?"} dias`,
    ...linhas,
    meta.painel ? `Painel: ${meta.painel}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
