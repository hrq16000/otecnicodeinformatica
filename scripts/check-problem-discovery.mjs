#!/usr/bin/env node
/**
 * GATE — descoberta do cluster /problemas (Rodada 8B).
 *
 * Regra única e verificável: nenhuma URL indexável (presente no sitemap do
 * cluster) pode depender exclusivamente do sitemap. Toda URL indexável
 * precisa de pelo menos um link interno apontando para ela.
 *
 * Roda sobre reports/problem-discovery-coverage.json, gerado por
 * scripts/report-problem-discovery.mjs (executado automaticamente aqui).
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

execFileSync(process.execPath, ["scripts/report-problem-discovery.mjs"], { stdio: "inherit" });

const dados = JSON.parse(readFileSync("reports/problem-discovery-coverage.json", "utf8"));
const indexaveis = dados.linhas.filter((l) => l.sitemap);
const orfas = indexaveis.filter((l) => l.incomingInternalLinks === 0);

if (orfas.length) {
  console.error("[check:problem-discovery] URLs indexáveis sem nenhum link interno:");
  for (const o of orfas) console.error(`  - ${o.url}`);
  console.error("Adicione links contextuais a partir de páginas já rastreadas antes de publicar.");
  process.exit(1);
}

console.log(
  `[check:problem-discovery] OK — ${indexaveis.length} URLs indexáveis, todas alcançáveis por link interno.`,
);
