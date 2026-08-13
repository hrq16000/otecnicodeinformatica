#!/usr/bin/env node
// @ts-nocheck
/**
 * RELATÓRIO SEMANAL — RODADA 3C (5 páginas)
 *
 * Para cada página aprofundada na segunda onda editorial:
 *   - impressões, cliques, CTR e posição média (últimos 7 dias fechados)
 *   - variação WoW contra os 7 dias anteriores
 *   - estado de indexação no índice do Google (URL Inspection, somente leitura)
 *   - consultas que já trazem impressão para a página
 *   - erros de acesso detectados na borda (HTTP != 200 ou redirect)
 *
 * Uso:
 *   node scripts/report-weekly-3c.mjs           # relatório
 *   node scripts/report-weekly-3c.mjs --alert   # sai 1 se houver erro/queda
 *
 * Saídas: reports/weekly-3c.json · reports/weekly-3c.md
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { wave3cUrls } from "./lib/priority-urls.mjs";
import { resolveSite, searchAnalytics, inspectUrl, dayOffset } from "./lib/gsc-client.mjs";

const ALERT = process.argv.includes("--alert");
mkdirSync("reports", { recursive: true });

const urls = wave3cUrls();
const site = await resolveSite(urls[0].url);
const current = { start: dayOffset(-9), end: dayOffset(-3) };
const previous = { start: dayOffset(-16), end: dayOffset(-10) };

const byPage = async (range) => {
  const rows = await searchAnalytics(site, {
    startDate: range.start,
    endDate: range.end,
    dimensions: ["page"],
    rowLimit: 1000,
  });
  return new Map(rows.map((r) => [r.keys[0], r]));
};

const queriesFor = async (url) => {
  const rows = await searchAnalytics(site, {
    startDate: current.start,
    endDate: current.end,
    dimensions: ["query"],
    dimensionFilterGroups: [
      { filters: [{ dimension: "page", operator: "equals", expression: url }] },
    ],
    rowLimit: 10,
  });
  return rows.map((r) => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    position: Number((r.position ?? 0).toFixed(1)),
  }));
};

const m = (row) => ({
  clicks: row?.clicks ?? 0,
  impressions: row?.impressions ?? 0,
  ctr: Number(((row?.ctr ?? 0) * 100).toFixed(2)),
  position: row?.position ? Number(row.position.toFixed(1)) : null,
});

const [now, before] = await Promise.all([byPage(current), byPage(previous)]);

const rows = [];
for (const { path, url } of urls) {
  const a = m(now.get(url));
  const b = m(before.get(url));

  let http = null;
  let redirect = null;
  try {
    const res = await fetch(url, { redirect: "manual" });
    http = res.status;
    redirect = res.headers.get("location");
  } catch (e) {
    http = `erro: ${e.message}`;
  }

  let index = { verdict: "ERROR", coverageState: null, error: null };
  try {
    index = await inspectUrl(site, url);
  } catch (e) {
    index = { verdict: "ERROR", coverageState: null, error: e.message };
  }

  rows.push({
    path,
    url,
    http,
    redirect,
    index: { verdict: index.verdict, coverageState: index.coverageState ?? null, error: index.error ?? null },
    current: a,
    previous: b,
    delta: {
      clicks: a.clicks - b.clicks,
      impressions: a.impressions - b.impressions,
      ctr: Number((a.ctr - b.ctr).toFixed(2)),
      position: a.position != null && b.position != null ? Number((a.position - b.position).toFixed(1)) : null,
    },
    queries: await queriesFor(url),
  });
}

const problems = rows.filter(
  (r) => r.http !== 200 || r.index.verdict !== "PASS" || r.delta.impressions < -0.3 * (r.previous.impressions || 0),
);

const report = {
  generatedAt: new Date().toISOString(),
  site,
  window: { current, previous },
  totals: {
    clicks: rows.reduce((s, r) => s + r.current.clicks, 0),
    impressions: rows.reduce((s, r) => s + r.current.impressions, 0),
  },
  rows,
  problems: problems.map((r) => ({
    path: r.path,
    http: r.http,
    verdict: r.index.verdict,
    coverageState: r.index.coverageState,
  })),
};
writeFileSync("reports/weekly-3c.json", JSON.stringify(report, null, 2));

const md = [
  "# Relatório semanal — Rodada 3C",
  "",
  `Propriedade: \`${site}\` · janela ${current.start} → ${current.end} (WoW vs ${previous.start} → ${previous.end})`,
  "",
  "| Página | HTTP | Índice | Impr. | Δ | Cliques | Δ | CTR | Posição |",
  "| --- | ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |",
  ...rows.map(
    (r) =>
      `| ${r.path} | ${r.http} | ${r.index.coverageState ?? r.index.verdict} | ${r.current.impressions} | ${r.delta.impressions >= 0 ? "+" : ""}${r.delta.impressions} | ${r.current.clicks} | ${r.delta.clicks >= 0 ? "+" : ""}${r.delta.clicks} | ${r.current.ctr}% | ${r.current.position ?? "—"} |`,
  ),
  "",
  "## Consultas por página",
  ...rows.flatMap((r) => [
    "",
    `### ${r.path}`,
    r.queries.length
      ? r.queries.map((q) => `- ${q.query} — ${q.impressions} impr., ${q.clicks} cliques, pos. ${q.position}`).join("\n")
      : "- sem consultas com dados reportados na janela",
  ]),
  "",
  problems.length
    ? `## Atenção\n${problems.map((p) => `- ${p.path}: HTTP ${p.http} · índice ${p.coverageState ?? p.verdict}`).join("\n")}`
    : "## Atenção\n- nenhuma página com erro de acesso, perda de indexação ou queda >30% de impressões",
  "",
].join("\n");
writeFileSync("reports/weekly-3c.md", md);

console.log(md);
if (ALERT && problems.length) process.exit(1);
