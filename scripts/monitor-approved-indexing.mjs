#!/usr/bin/env node
/**
 * PÓS-DEPLOY — URLs APROVADAS QUE AINDA NÃO INDEXARAM.
 *
 * Cruza o status editorial (public/publish-status.json → estado "pronto") com
 * o estado real no índice do Google (URL Inspection, somente leitura) e alerta
 * quando uma URL aprovada continua fora do índice.
 *
 * Uso:
 *   node scripts/monitor-approved-indexing.mjs          # relatório
 *   node scripts/monitor-approved-indexing.mjs --alert  # exit 1 se houver pendência
 *   node scripts/monitor-approved-indexing.mjs --limit 25
 *
 * Saídas: reports/approved-indexing.json · reports/approved-indexing.md
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolveSite, inspectUrl } from "./lib/gsc-client.mjs";

const ALERT = process.argv.includes("--alert");
const limiteArg = process.argv.indexOf("--limit");
const LIMITE = limiteArg > -1 ? Number(process.argv[limiteArg + 1]) || 30 : 30;
const FONTE = "public/publish-status.json";

if (!existsSync(FONTE)) {
  console.error(`✖ ${FONTE} ausente — rode "npm run report:publish-status" antes.`);
  process.exit(1);
}

const status = JSON.parse(readFileSync(FONTE, "utf8"));
const aprovadas = status.urls.filter((u) => u.estado === "pronto").slice(0, LIMITE);
if (!aprovadas.length) {
  console.log("Nenhuma URL aprovada para monitorar.");
  process.exit(0);
}

const site = await resolveSite(aprovadas[0].url);
console.log(`Propriedade: ${site} · ${aprovadas.length} URLs aprovadas`);

const resultados = [];
for (const item of aprovadas) {
  try {
    const estado = await inspectUrl(site, item.url);
    resultados.push({ ...item, ...estado, indexada: estado.verdict === "PASS", erro: null });
  } catch (e) {
    resultados.push({ ...item, verdict: "ERROR", indexada: false, erro: e.message });
  }
}

const pendentes = resultados.filter((r) => !r.indexada);
const relatorio = {
  generatedAt: new Date().toISOString(),
  site,
  total: resultados.length,
  indexadas: resultados.length - pendentes.length,
  pendentes: pendentes.map((p) => p.path),
  resultados,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/approved-indexing.json", `${JSON.stringify(relatorio, null, 2)}\n`);
writeFileSync(
  "reports/approved-indexing.md",
  [
    `# URLs aprovadas × indexação`,
    ``,
    `- Propriedade: \`${site}\``,
    `- Gerado em: ${relatorio.generatedAt}`,
    `- Indexadas: **${relatorio.indexadas}/${relatorio.total}**`,
    ``,
    `| URL | Verdict | Cobertura | Último rastreio |`,
    `| --- | --- | --- | --- |`,
    ...resultados.map(
      (r) => `| ${r.path} | ${r.verdict} | ${r.coverageState ?? r.erro ?? "—"} | ${r.lastCrawlTime ?? "—"} |`,
    ),
    ``,
    pendentes.length
      ? `## ⚠️ Aprovadas e ainda não indexadas\n\n${pendentes.map((p) => `- ${p.path} → ${p.coverageState ?? p.erro ?? "sem dado"}`).join("\n")}`
      : `Todas as URLs aprovadas estão indexadas.`,
  ].join("\n"),
);

console.log(`Indexadas: ${relatorio.indexadas}/${relatorio.total}`);
for (const p of pendentes) console.log(`  · ${p.path} → ${p.coverageState ?? p.erro ?? "sem dado"}`);
if (pendentes.length && ALERT) {
  console.error(`\n✖ ${pendentes.length} URL(s) aprovada(s) ainda não indexada(s).`);
  process.exit(1);
}
