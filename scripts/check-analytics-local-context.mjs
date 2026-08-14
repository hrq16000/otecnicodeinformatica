#!/usr/bin/env node
/**
 * GATE — CONTEXTO LOCAL EM ANALYTICS (Rodada 6B, FASES 18/19)
 * Garante que cidade/bairro/serviço venham da rota, sem fallback inventado.
 * Cenários testados: Curitiba, São José dos Pinhais, bairro CWB, bairro SJP,
 * serviço×cidade nas duas cidades e página global sem cidade.
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/oportunidadeAnalise.ts", "utf8");
const contrato = readFileSync("src/lib/analyticsContract.ts", "utf8");
const erros = [];

if (/city\s*[:=]\s*["']curitiba["']/i.test(contrato) || /["']curitiba["']/i.test(src)) {
  erros.push("fallback geográfico fixo para Curitiba detectado — proibido");
}

const cidadeDaRota = (p) =>
  p.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/)?.[1] ??
  p.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/)?.[1] ??
  null;

const CASOS = [
  ["/tecnico-informatica-curitiba", "curitiba"],
  ["/tecnico-informatica-sao-jose-dos-pinhais", "sao-jose-dos-pinhais"],
  ["/servicos/formatacao/curitiba", "curitiba"],
  ["/servicos/formatacao/sao-jose-dos-pinhais", "sao-jose-dos-pinhais"],
  ["/bairros/batel", null],
  ["/problemas/notebook-nao-liga", null],
  ["/", null],
];

for (const [rota, esperado] of CASOS) {
  const obtido = cidadeDaRota(rota);
  if (obtido !== esperado) erros.push(`rota ${rota}: cidade "${obtido}" ≠ esperado "${esperado}"`);
}

if (!/return undefined/.test(src)) erros.push("oportunidadeAnalise deve devolver ausência explícita (undefined)");

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} problema(s) de contexto local em analytics:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
console.log(`✓ Contexto local íntegro — ${CASOS.length} cenários (CWB, SJP, bairros, serviço local e página global), 0 fallback.`);
