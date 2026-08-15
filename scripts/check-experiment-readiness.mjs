#!/usr/bin/env node
/**
 * GATE — PRONTIDÃO DE EXPERIMENTO (Rodada 7B)
 *
 * Valida a política central de readiness (não os dados de produção):
 *   1. experimento conhecido no registro de CRO;
 *   2. métrica primária declarada (numerador + denominador);
 *   3. unidade experimental = sessão elegível (nunca pageview/evento bruto);
 *   4. thresholds explícitos (sessões, conversões, janela, contexto);
 *   5. gates de qualidade obrigatórios declarados e existentes no package.json;
 *   6. exclusão de QA aplicada no cálculo;
 *   7. versionamento do experimento (experiment-00X-vY).
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/experimentReadiness.ts", "utf8");
const cro = readFileSync("src/lib/croRodada7.ts", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const erros = [];

const num = (campo) => Number(src.match(new RegExp(`${campo}:\\s*([\\d.]+)`))?.[1] ?? Number.NaN);

const experimentId = src.match(/experimentId:\s*"([^"]+)"/)?.[1];
if (!experimentId) erros.push("política sem experimentId");
else if (!cro.includes(`id: "${experimentId}"`)) {
  erros.push(`experimentId "${experimentId}" não existe em EXPERIMENTOS_CRO`);
}

const versao = src.match(/experimentVersion:\s*"([^"]+)"/)?.[1] ?? "";
if (!/^experiment-\d{3}-v\d+$/.test(versao)) {
  erros.push(`experimentVersion "${versao}" fora do padrão experiment-00X-vY`);
}

if (!/unidadeExperimental:\s*"sessao_elegivel"/.test(src)) {
  erros.push("unidade experimental precisa ser sessão elegível (pageview/evento bruto é proibido)");
}

if (!/primaryMetric:\s*\{[\s\S]*?numerador:\s*\[[^\]]+\][\s\S]*?denominador:\s*"sessoes_elegiveis"/.test(src)) {
  erros.push("métrica primária incompleta (numerador/denominador)");
}

const thresholds = {
  minEligibleSessionsPerVariant: 100,
  minPrimaryConversions: 20,
  minObservationDays: 3,
  minContextCompleteness: 0.8,
};
for (const [campo, piso] of Object.entries(thresholds)) {
  const v = num(campo);
  if (!Number.isFinite(v)) erros.push(`threshold ${campo} não declarado`);
  else if (v < piso) erros.push(`threshold ${campo} = ${v} abaixo do piso governado (${piso})`);
}

const mde = num("mdeAlvo");
if (!Number.isFinite(mde) || mde <= 0) erros.push("mdeAlvo não declarado");
else if (mde > 0.3) erros.push(`mdeAlvo ${mde} escolhido para "caber" no tráfego — sem utilidade comercial`);

const gates = [...(src.match(/gatesObrigatorios:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map(
  (m) => m[1],
);
const criticos = [
  "analytics-event-contract",
  "analytics-pii",
  "analytics-local-context",
  "analytics-journey-integrity",
  "cro-experiment",
];
for (const g of criticos) {
  if (!gates.includes(g)) erros.push(`gate crítico ausente da política: ${g}`);
  if (!pkg.scripts?.[`check:${g}`]) erros.push(`gate declarado sem script npm: check:${g}`);
}

if (!/isQaEvent/.test(src)) erros.push("cálculo de baseline sem exclusão de QA");
if (!/BLOCKED_DATA_QUALITY/.test(src)) erros.push("sem estado de bloqueio por qualidade de dados");
if (!/podeAtivar/.test(src) || !/status === "READY"/.test(src)) {
  erros.push("regra de ativação ausente: READY é condição necessária");
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} problema(s) na política de prontidão de experimento:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}

console.log(
  `✓ Readiness íntegro — ${versao} sobre sessões elegíveis, ${gates.length} gates de qualidade exigidos, thresholds explícitos e QA excluído.`,
);
