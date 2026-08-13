// @ts-nocheck
// RODADA 4B.2 — Monitoramento diário pós-migração.
// Amostra a matriz de redirects em produção e reporta erros, loops, cadeias,
// destinos quebrados e reaparecimento do número legado. Pensado para rodar em
// cron/CI uma vez por dia. Não cria painel novo.
//
// Uso:
//   node scripts/monitor-redirects-daily.mjs                 # amostra de 60 + 41 críticas
//   node scripts/monitor-redirects-daily.mjs --sample=150
//   node scripts/monitor-redirects-daily.mjs --strict        # exit 1 em qualquer erro
//
// Saídas: reports/daily/redirects-<YYYY-MM-DD>.json e .md (+ reports/daily/latest.md)
import { writeFileSync, mkdirSync } from "node:fs";
import { loadMap, criticalPaths, categoryOf, scanLegacySurfaces, LEGACY_WA } from "./lib/migration-critical.mjs";

const map = loadMap();
const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const SAMPLE = Number(args.find((a) => a.startsWith("--sample="))?.split("=")[1] ?? 60);

const day = new Date().toISOString().slice(0, 10);
const critical = new Set(criticalPaths(map));
// Amostra rotativa determinística: muda todo dia, cobre a matriz ao longo do tempo.
const all = map.rules.map((r) => r.from);
const seed = Number(day.replace(/-/g, "")) % Math.max(all.length, 1);
const rotating = Array.from({ length: Math.min(SAMPLE, all.length) }, (_, i) => all[(seed + i) % all.length]);
const paths = [...new Set([...critical, ...rotating])];
const byFrom = new Map(map.rules.map((r) => [r.from, r]));

const hop = async (url) => {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") ?? "" };
};

const rows = [];
for (const from of paths) {
  const rule = byFrom.get(from);
  const origin = `${map.source_domain}${from}`;
  const row = { origin, category: categoryOf(from), critical: critical.has(from), issues: [], hops: 0, finalStatus: null, finalUrl: "" };
  try {
    let current = origin;
    let step = await hop(current);
    if (step.status === 200) {
      row.issues.push("redirect ausente (origem 200)");
    } else {
      const seen = new Set([current]);
      while ([301, 302, 307, 308].includes(step.status) && row.hops < 6) {
        row.hops += 1;
        if (seen.has(step.location)) {
          row.issues.push("loop de redirect");
          break;
        }
        seen.add(step.location);
        current = step.location;
        step = await hop(current);
      }
      row.finalUrl = current;
      row.finalStatus = step.status;
      if (row.hops > 1) row.issues.push(`cadeia com ${row.hops} saltos`);
      if (step.status >= 400) row.issues.push(`destino ${step.status}`);
      if (rule && rule.to !== `${map.target_domain}/` && current.replace(/\/$/, "") === map.target_domain)
        row.issues.push("redirect genérico para a home");
      if (current.includes(map.source_domain.replace("https://", ""))) row.issues.push("retorno ao domínio antigo");
      if (row.critical && step.status === 200) {
        const html = await (await fetch(current)).text();
        const hits = scanLegacySurfaces(html, LEGACY_WA);
        if (hits.length) row.issues.push(`número legado (${[...new Set(hits.map((h) => h.surface))].join(", ")})`);
        if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) row.issues.push("noindex no destino");
      }
    }
  } catch (err) {
    row.issues.push(`erro de rede: ${err.message}`);
  }
  rows.push(row);
}

const problems = rows.filter((r) => r.issues.length);
const buckets = {};
for (const r of problems) for (const i of r.issues) buckets[i.split(" (")[0]] = (buckets[i.split(" (")[0]] ?? 0) + 1;

const summary = {
  date: day,
  generated_at: new Date().toISOString(),
  checked: rows.length,
  critical_checked: rows.filter((r) => r.critical).length,
  healthy: rows.length - problems.length,
  problems: problems.length,
  by_issue: buckets,
  results: rows,
};

mkdirSync("reports/daily", { recursive: true });
writeFileSync(`reports/daily/redirects-${day}.json`, JSON.stringify(summary, null, 2) + "\n");

const md = [
  `# Monitoramento de redirects — ${day}`,
  "",
  `- Verificadas: ${rows.length} (${summary.critical_checked} críticas + amostra rotativa)`,
  `- Saudáveis: ${summary.healthy} · Com problema: ${problems.length}`,
  "",
  "## Problemas por tipo",
  "",
  Object.keys(buckets).length
    ? Object.entries(buckets).map(([k, v]) => `- ${k}: ${v}`).join("\n")
    : "_nenhum_",
  "",
  "## Detalhe",
  "",
  problems.length ? "| Origem | Crítica | Saltos | Status final | Problemas |" : "_sem ocorrências_",
  ...(problems.length ? ["| --- | --- | --- | --- | --- |"] : []),
  ...problems.map(
    (r) => `| ${r.origin} | ${r.critical ? "sim" : "não"} | ${r.hops} | ${r.finalStatus ?? "-"} | ${r.issues.join("; ")} |`,
  ),
  "",
].join("\n");
writeFileSync(`reports/daily/redirects-${day}.md`, md);
writeFileSync("reports/daily/latest.md", md);

console.log(`monitor ${day}: ${rows.length} verificadas · ${problems.length} com problema`);
for (const [k, v] of Object.entries(buckets)) console.log(`  ${k}: ${v}`);
console.log(`relatórios: reports/daily/redirects-${day}.md · reports/daily/latest.md`);
if (STRICT && problems.length) process.exit(1);
