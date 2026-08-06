#!/usr/bin/env node
/**
 * RELATÓRIO SEMANAL — Search Console (+ conversões do funil, quando disponíveis)
 *
 * Consolida por URL prioritária e por consulta local:
 *   - impressões, cliques, CTR e posição média nos últimos 7 dias
 *   - variação semana a semana (WoW) contra os 7 dias anteriores
 *   - rastreamento de posição das consultas locais de Curitiba
 *   - conversões (cliques em WhatsApp/ligar) por rota, quando as credenciais
 *     do backend estiverem presentes (SUPABASE_URL + SUPABASE_ANON_KEY)
 *
 * Uso: node scripts/report-weekly-seo.mjs
 * Saídas: reports/weekly-seo.json · reports/weekly-seo.md
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { priorityUrls, BASE_URL, groupOf } from "./lib/priority-urls.mjs";
import { resolveSite, searchAnalytics, dayOffset } from "./lib/gsc-client.mjs";

mkdirSync("reports", { recursive: true });
const urls = priorityUrls();
const site = await resolveSite(urls[0].url);

// GSC entrega dados com ~2 dias de atraso: janela atual = D-9..D-3.
const current = { start: dayOffset(-9), end: dayOffset(-3) };
const previous = { start: dayOffset(-16), end: dayOffset(-10) };

const fetchRows = async (dimension, range) =>
  searchAnalytics(site, {
    startDate: range.start,
    endDate: range.end,
    dimensions: [dimension],
    rowLimit: 500,
  });

const index = (rows) => {
  const map = new Map();
  for (const r of rows) map.set(r.keys[0], r);
  return map;
};

const [pagesNow, pagesBefore, queriesNow, queriesBefore] = await Promise.all([
  fetchRows("page", current).then(index),
  fetchRows("page", previous).then(index),
  fetchRows("query", current).then(index),
  fetchRows("query", previous).then(index),
]);

const delta = (a = 0, b = 0) => Number((a - b).toFixed(2));
const metrics = (row) => ({
  clicks: row?.clicks ?? 0,
  impressions: row?.impressions ?? 0,
  ctr: Number((((row?.ctr ?? 0) * 100)).toFixed(2)),
  position: row?.position ? Number(row.position.toFixed(1)) : null,
});

const pageRows = urls.map(({ path, url, group }) => {
  const now = metrics(pagesNow.get(url));
  const before = metrics(pagesBefore.get(url));
  return {
    path,
    group,
    ...now,
    clicksWow: delta(now.clicks, before.clicks),
    impressionsWow: delta(now.impressions, before.impressions),
    ctrWow: delta(now.ctr, before.ctr),
    positionWow:
      now.position && before.position ? Number((before.position - now.position).toFixed(1)) : null,
  };
});

// Rastreamento de consultas locais (Curitiba e região metropolitana).
const LOCAL_HINTS = [
  "curitiba",
  "colombo",
  "pinhais",
  "araucaria",
  "araucária",
  "são josé dos pinhais",
  "sao jose dos pinhais",
  "fazenda rio grande",
  "campo largo",
  "perto de mim",
];
const isLocal = (q) => LOCAL_HINTS.some((h) => q.toLowerCase().includes(h));

const queryRows = [...queriesNow.values()]
  .filter((r) => isLocal(r.keys[0]))
  .map((r) => {
    const now = metrics(r);
    const before = metrics(queriesBefore.get(r.keys[0]));
    return {
      query: r.keys[0],
      ...now,
      positionWow:
        now.position && before.position ? Number((before.position - now.position).toFixed(1)) : null,
      impressionsWow: delta(now.impressions, before.impressions),
    };
  })
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 40);

// Conversões (opcional — só quando o backend estiver acessível pelo job).
let conversions = null;
let campaigns = null;
const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_ANON_KEY;
if (sbUrl && sbKey) {
  try {
    const since = new Date(`${previous.start}T00:00:00Z`).toISOString();
    const res = await fetch(
      `${sbUrl.replace(/\/$/, "")}/rest/v1/click_events?select=event_type,path,created_at,utm_source,utm_medium,utm_campaign&created_at=gte.${since}`,
      { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` } },
    );
    if (res.ok) {
      const events = await res.json();
      const byPath = new Map();
      const byCampaign = new Map();
      for (const e of events) {
        const path = e.path || "/";
        const cur = byPath.get(path) || { path, group: groupOf(path), wa: 0, call: 0 };
        if (e.event_type === "wa_click") cur.wa += 1;
        else if (e.event_type === "call_click") cur.call += 1;
        byPath.set(path, cur);

        const source = e.utm_source || "(direto/orgânico)";
        const medium = e.utm_medium || "(none)";
        const campaign = e.utm_campaign || "(sem campanha)";
        const key = `${source}|${medium}|${campaign}`;
        const c = byCampaign.get(key) || { source, medium, campaign, wa: 0, call: 0 };
        if (e.event_type === "wa_click") c.wa += 1;
        else if (e.event_type === "call_click") c.call += 1;
        byCampaign.set(key, c);
      }
      conversions = [...byPath.values()]
        .filter((r) => r.wa + r.call > 0)
        .sort((a, b) => b.wa + b.call - (a.wa + a.call));
      campaigns = [...byCampaign.values()]
        .filter((r) => r.wa + r.call > 0)
        .sort((a, b) => b.wa + b.call - (a.wa + a.call))
        .slice(0, 25);
    }
  } catch {
    conversions = null;
    campaigns = null;
  }
}

/**
 * Consolidado GSC × conversões: impressões, cliques, CTR e conversões por rota
 * prioritária (mesma taxonomia de eventos usada no GA4 — wa_click/call_click).
 */
const convByPath = new Map((conversions ?? []).map((c) => [c.path, c]));
const funnelRows = pageRows.map((r) => {
  const c = convByPath.get(r.path);
  const conv = (c?.wa ?? 0) + (c?.call ?? 0);
  return {
    ...r,
    conversions: conv,
    conversionRate: r.clicks ? Number(((conv / r.clicks) * 100).toFixed(1)) : null,
  };
});
const totals = funnelRows.reduce(
  (acc, r) => ({
    clicks: acc.clicks + r.clicks,
    impressions: acc.impressions + r.impressions,
    conversions: acc.conversions + r.conversions,
  }),
  { clicks: 0, impressions: 0, conversions: 0 },
);

const report = {
  generatedAt: new Date().toISOString(),
  site,
  window: current,
  comparedTo: previous,
  pages: pageRows,
  localQueries: queryRows,
  conversions,
};
writeFileSync("reports/weekly-seo.json", JSON.stringify(report, null, 2));

const sign = (n) => (n === null ? "—" : n > 0 ? `+${n}` : `${n}`);
const md = [
  `# Relatório semanal de busca — ${current.start} a ${current.end}`,
  ``,
  `Propriedade \`${site}\` · comparação com ${previous.start} a ${previous.end}.`,
  ``,
  `## URLs prioritárias`,
  ``,
  `| Grupo | URL | Cliques (WoW) | Impressões (WoW) | CTR % (WoW) | Posição (ganho) |`,
  `| --- | --- | --- | --- | --- | --- |`,
  ...pageRows.map(
    (r) =>
      `| ${r.group} | ${r.path} | ${r.clicks} (${sign(r.clicksWow)}) | ${r.impressions} (${sign(r.impressionsWow)}) | ${r.ctr} (${sign(r.ctrWow)}) | ${r.position ?? "—"} (${sign(r.positionWow)}) |`,
  ),
  ``,
  `## Consultas locais monitoradas`,
  ``,
  queryRows.length
    ? [
        `| Consulta | Impressões (WoW) | Cliques | CTR % | Posição (ganho) |`,
        `| --- | --- | --- | --- | --- |`,
        ...queryRows.map(
          (r) =>
            `| ${r.query} | ${r.impressions} (${sign(r.impressionsWow)}) | ${r.clicks} | ${r.ctr} | ${r.position ?? "—"} (${sign(r.positionWow)}) |`,
        ),
      ].join("\n")
    : `Sem consultas locais com dados reportados nesta janela.`,
  ``,
  `## Conversões do funil`,
  ``,
  conversions
    ? [
        `| Grupo | Rota | WhatsApp | Ligar |`,
        `| --- | --- | --- | --- |`,
        ...conversions.map((r) => `| ${r.group} | ${r.path} | ${r.wa} | ${r.call} |`),
      ].join("\n")
    : `Credenciais do backend ausentes no job — use o painel /admin/dashboard para as conversões.`,
  ``,
  `> Ausência de dados no Search Console não prova ausência de indexação: consultas de baixo volume podem não ser reportadas.`,
  ``,
  `Base: ${BASE_URL}`,
].join("\n");
writeFileSync("reports/weekly-seo.md", md);

console.log(`✔ reports/weekly-seo.md gerado (${pageRows.length} URLs, ${queryRows.length} consultas locais).`);
