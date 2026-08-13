#!/usr/bin/env node
// @ts-nocheck
/**
 * RANK TRACKING LOCAL — Curitiba e Região Metropolitana
 *
 * Acompanha posição média, impressões, cliques e CTR por CONSULTA × URL
 * (dimensões `query` + `page` do Search Console), com variação semana a
 * semana e comparação contra o baseline anterior.
 *
 * Complementa o relatório semanal: aqui o recorte é por keyword local,
 * incluindo as consultas-alvo monitoradas mesmo quando ainda não têm dados.
 *
 * Uso:
 *   node scripts/report-rank-tracking.mjs           # relatório WoW
 *   node scripts/report-rank-tracking.mjs --save    # grava novo baseline
 *
 * Saídas: reports/rank-tracking.json · reports/rank-tracking.md
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { priorityUrls, BASE_URL } from "./lib/priority-urls.mjs";
import { resolveSite, searchAnalytics, dayOffset } from "./lib/gsc-client.mjs";

const SAVE = process.argv.includes("--save");
const BASELINE = "reports/rank-tracking-baseline.json";

/** Consultas-alvo do negócio (sempre listadas, mesmo sem dados na janela). */
export const TARGET_QUERIES = [
  "técnico de informática curitiba",
  "assistência técnica de computador curitiba",
  "conserto de notebook curitiba",
  "formatação de computador curitiba",
  "manutenção de computador curitiba",
  "empresa de ti curitiba",
  "suporte técnico de informática curitiba",
  "técnico de informática perto de mim",
  "conserto de pc são josé dos pinhais",
  "assistência técnica de notebook colombo",
  "técnico de informática pinhais",
  "manutenção de computador araucária",
];

const LOCAL_HINTS = [
  "curitiba", "colombo", "pinhais", "araucaria", "araucária", "campo largo",
  "são josé dos pinhais", "sao jose dos pinhais", "fazenda rio grande",
  "piraquara", "quatro barras", "almirante tamandaré", "perto de mim",
];
const isLocal = (q) => LOCAL_HINTS.some((h) => q.toLowerCase().includes(h));

mkdirSync("reports", { recursive: true });
const site = await resolveSite(priorityUrls()[0].url);

// GSC entrega dados com ~2 dias de atraso.
const current = { start: dayOffset(-9), end: dayOffset(-3) };
const previous = { start: dayOffset(-16), end: dayOffset(-10) };

const fetchPairs = (range) =>
  searchAnalytics(site, {
    startDate: range.start,
    endDate: range.end,
    dimensions: ["query", "page"],
    rowLimit: 1000,
  });

const keyOf = (row) => `${row.keys[0]}||${row.keys[1]}`;
const index = (rows) => new Map(rows.map((r) => [keyOf(r), r]));

const [now, before] = await Promise.all([fetchPairs(current).then(index), fetchPairs(previous).then(index)]);

const round = (n, d = 1) => (n == null ? null : Number(n.toFixed(d)));
const rows = [...now.values()]
  .filter((r) => isLocal(r.keys[0]))
  .map((r) => {
    const past = before.get(keyOf(r));
    return {
      query: r.keys[0],
      url: r.keys[1].replace(BASE_URL, "") || "/",
      position: round(r.position),
      positionWow: past?.position ? round(past.position - r.position) : null, // + = subiu
      impressions: r.impressions,
      impressionsWow: (r.impressions ?? 0) - (past?.impressions ?? 0),
      clicks: r.clicks,
      ctr: round((r.ctr ?? 0) * 100, 2),
      target: TARGET_QUERIES.includes(r.keys[0].toLowerCase()),
    };
  })
  .sort((a, b) => (a.position ?? 999) - (b.position ?? 999));

const missingTargets = TARGET_QUERIES.filter(
  (q) => !rows.some((r) => r.query.toLowerCase() === q),
);

const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : null;
const prevBaseline = new Map((baseline?.rows ?? []).map((r) => [`${r.query}||${r.url}`, r]));
const drops = rows.filter((r) => {
  const b = prevBaseline.get(`${r.query}||${r.url}`);
  return b?.position != null && r.position != null && r.position - b.position >= 3;
});

const report = {
  generatedAt: new Date().toISOString(),
  site,
  window: current,
  comparedTo: previous,
  tracked: rows.length,
  missingTargets,
  drops: drops.map((d) => `${d.query} → ${d.url}`),
  rows,
};
writeFileSync("reports/rank-tracking.json", JSON.stringify(report, null, 2));

const sign = (n) => (n == null ? "—" : n > 0 ? `+${n}` : `${n}`);
writeFileSync(
  "reports/rank-tracking.md",
  [
    `# Rank tracking local — ${current.start} a ${current.end}`,
    ``,
    `Propriedade \`${site}\` · comparação com ${previous.start} a ${previous.end}.`,
    `Ganho positivo em "Posição (WoW)" significa que a URL subiu no ranking.`,
    ``,
    `| Alvo | Consulta | URL | Posição (WoW) | Impressões (WoW) | Cliques | CTR % |`,
    `| --- | --- | --- | --- | --- | --- | --- |`,
    ...rows.map(
      (r) =>
        `| ${r.target ? "★" : ""} | ${r.query} | ${r.url} | ${r.position ?? "—"} (${sign(r.positionWow)}) | ${r.impressions} (${sign(r.impressionsWow)}) | ${r.clicks} | ${r.ctr} |`,
    ),
    ``,
    missingTargets.length
      ? `## Consultas-alvo sem dados reportados\n\n${missingTargets.map((q) => `- ${q}`).join("\n")}\n\n> Ausência de dados não prova ausência de indexação: o Search Console omite consultas de baixo volume.`
      : `Todas as consultas-alvo tiveram dados reportados nesta janela.`,
    ``,
    drops.length
      ? `## ⚠️ Quedas de 3+ posições vs baseline\n\n${drops.map((d) => `- ${d.query} → ${d.url} (${d.position})`).join("\n")}`
      : `Sem quedas relevantes contra o baseline.`,
  ].join("\n"),
);

console.log(`✔ reports/rank-tracking.md gerado (${rows.length} pares consulta×URL, ${drops.length} queda(s)).`);

if (SAVE || !baseline) {
  writeFileSync(BASELINE, JSON.stringify(report, null, 2));
  console.log(`Baseline gravado em ${BASELINE}.`);
}
