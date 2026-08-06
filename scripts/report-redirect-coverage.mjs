#!/usr/bin/env node
/**
 * COBERTURA DE REDIRECTS — matriz declarada × comportamento observado.
 *
 * Cruza a matriz de redirects/rotas do manifesto de build com o resultado real
 * medido por `scripts/smoke-edge-routes.mjs` (reports/edge-smoke.json) e
 * classifica cada entrada em: 301 correto, 301 divergente, 404, proxy/200 ou
 * não observado.
 *
 * Uso:
 *   node scripts/report-redirect-coverage.mjs [--dist=dist] [--strict]
 *
 * Artefatos: reports/redirect-coverage.json e docs/relatorio-cobertura-redirects.md
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.split("=")[1] ?? d;
const STRICT = args.includes("--strict");
const DIST = path.resolve(flag("dist", "dist"));

const manifest = JSON.parse(readFileSync(path.join(DIST, "route-manifest.json"), "utf8"));
const smokeFile = flag("smoke", "reports/edge-smoke.json");
if (!existsSync(smokeFile)) {
  console.error(`[cobertura] ${smokeFile} ausente — rode antes: npm run smoke:edge`);
  process.exit(1);
}
const smoke = JSON.parse(readFileSync(smokeFile, "utf8"));

const observedAlias = new Map(smoke.results.aliases.map((a) => [a.from, a]));
const observedValid = new Map(smoke.results.valid.map((v) => [v.path, v]));
const observed404 = smoke.results.notFound ?? [];

const rows = [];
for (const red of manifest.redirects ?? []) {
  const from = red.from ?? red[0];
  const to = red.to ?? red[1];
  const obs = observedAlias.get(from);
  let verdict;
  if (!obs) verdict = "nao-observado";
  else if (obs.status === 301 && obs.location === to && obs.hopStatus === 200) verdict = "301-correto";
  else if (obs.status === 301) verdict = "301-divergente";
  else if (obs.status === 404) verdict = "404-indevido";
  else if (obs.status === 200) verdict = "200-sem-redirect";
  else verdict = `status-${obs.status}`;
  rows.push({ tipo: "alias", from, esperado: `301 → ${to}`, observado: obs ? `${obs.status} → ${obs.location ?? "-"} (${obs.hopStatus ?? "-"})` : "-", verdict, motivo: red.motivo ?? null });
}

for (const [p, obs] of observedValid) {
  rows.push({
    tipo: "rota",
    from: p,
    esperado: "200 (proxy/origem)",
    observado: String(obs.status),
    verdict: obs.ok ? "200-correto" : "200-divergente",
  });
}

const nf = { total: observed404.length, ok: observed404.filter((r) => r.ok).length };
rows.push({
  tipo: "404",
  from: `${nf.total} URLs inexistentes`,
  esperado: "404 real",
  observado: `${nf.ok} com 404`,
  verdict: nf.ok === nf.total ? "404-correto" : "404-divergente",
});

const byVerdict = rows.reduce((acc, r) => ({ ...acc, [r.verdict]: (acc[r.verdict] ?? 0) + 1 }), {});
const divergences = rows.filter((r) => !r.verdict.endsWith("correto"));

const coverageAlias = rows.filter((r) => r.tipo === "alias");
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);
const cobertura = {
  base: smoke.base,
  geradoEm: new Date().toISOString(),
  aliasesDeclarados: coverageAlias.length,
  aliasesCorretos: coverageAlias.filter((r) => r.verdict === "301-correto").length,
  coberturaAliasPct: pct(coverageAlias.filter((r) => r.verdict === "301-correto").length, coverageAlias.length),
  rotasObservadas: observedValid.size,
  urls404: nf,
  byVerdict,
  divergences,
  rows,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/redirect-coverage.json", JSON.stringify(cobertura, null, 2));

const md = [
  "# Cobertura de redirects — declarado × observado",
  "",
  `- Base observada: \`${smoke.base}\``,
  `- Gerado em: ${cobertura.geradoEm}`,
  `- Cobertura de aliases corretos: **${cobertura.coberturaAliasPct}%** (${cobertura.aliasesCorretos}/${cobertura.aliasesDeclarados})`,
  `- Rotas válidas observadas: ${cobertura.rotasObservadas} · URLs inexistentes com 404: ${nf.ok}/${nf.total}`,
  "",
  "## Veredictos",
  "",
  "| Veredicto | Entradas |",
  "| --- | ---: |",
  ...Object.entries(byVerdict).map(([k, v]) => `| ${k} | ${v} |`),
  "",
  divergences.length
    ? ["## Divergências", "", "| Tipo | Origem | Esperado | Observado | Veredicto |", "| --- | --- | --- | --- | --- |",
       ...divergences.map((d) => `| ${d.tipo} | \`${d.from}\` | ${d.esperado} | ${d.observado} | ${d.verdict} |`)].join("\n")
    : "Sem divergências entre a matriz declarada e o comportamento observado.",
  "",
  "Artefatos: `reports/redirect-coverage.json`, `reports/edge-smoke.json`, `docs/relatorio-smoke-edge.md`.",
].join("\n");
writeFileSync("docs/relatorio-cobertura-redirects.md", `${md}\n`);

console.log("── Cobertura de redirects ──");
console.log(`  aliases corretos: ${cobertura.aliasesCorretos}/${cobertura.aliasesDeclarados} (${cobertura.coberturaAliasPct}%)`);
console.log(`  divergências: ${divergences.length}`);
if (divergences.length && STRICT) process.exitCode = 1;
