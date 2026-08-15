#!/usr/bin/env node
/**
 * GATE — CONTRATO DE ATRIBUIÇÃO DE AQUISIÇÃO (Rodada 8A)
 *
 * Motivo: a auditoria de produção mostrou que 100% das sessões registradas em
 * `click_events` chegaram com `utm_source=site|ci|ga4ci` e `utm_medium=cta`,
 * gravadas como canal "direto"/"ads". Ou seja: cliques do próprio site e de
 * automações de CI estavam sendo lidos como aquisição real, inflando o funil.
 *
 * O gate impede que essa contaminação volte:
 *   1. Nenhum código pode carimbar `utm_medium=organic|cpc|paid` como default
 *      em links de saída (falsificação de origem).
 *   2. A taxonomia de canal é única: só `src/lib/canalAtribuicao.ts` define
 *      canais. Nada de literais avulsos ("direto", "ads") em código novo.
 *   3. `internal` precisa continuar existindo e fora de `CANAIS_DE_AQUISICAO`.
 *
 * Uso: node scripts/check-acquisition-attribution.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const CONTRATO = "src/lib/canalAtribuicao.ts";
const falhas = [];

if (!existsSync(CONTRATO)) {
  console.error(`✖ Contrato de canal ausente: ${CONTRATO}`);
  process.exit(1);
}

const contrato = readFileSync(CONTRATO, "utf8");

// 1) Canal interno existe e não conta como aquisição.
if (!/"internal"/.test(contrato)) {
  falhas.push(`${CONTRATO}: canal "internal" ausente da taxonomia.`);
}
const blocoAquisicao = contrato.match(/CANAIS_DE_AQUISICAO[^=]*=\s*\[([\s\S]*?)\]/);
if (!blocoAquisicao) {
  falhas.push(`${CONTRATO}: CANAIS_DE_AQUISICAO não declarado.`);
} else if (/"internal"/.test(blocoAquisicao[1])) {
  falhas.push(`${CONTRATO}: "internal" não pode integrar CANAIS_DE_AQUISICAO.`);
}
if (!/export function ehTrafegoInterno/.test(contrato)) {
  falhas.push(`${CONTRATO}: ehTrafegoInterno() é obrigatório para separar QA/CTA interno.`);
}

// 2) Defaults de UTM que falsificam aquisição.
const MEDIUMS_PROIBIDOS = ["organic", "cpc", "ppc", "paid", "seo", "referral"];
const grep = (padrao) => {
  try {
    return execSync(`rg -n --no-heading ${JSON.stringify(padrao)} src -g '!*.test.*'`, {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
};

const defaults = grep(String.raw`set\(["']utm_medium["'],\s*["'](\w+)["']\)`);
for (const linha of defaults.split("\n").filter(Boolean)) {
  const valor = linha.match(/set\(["']utm_medium["'],\s*["'](\w+)["']\)/)?.[1];
  if (valor && MEDIUMS_PROIBIDOS.includes(valor.toLowerCase())) {
    falhas.push(
      `Default de utm_medium="${valor}" falsifica aquisição em link de saída → ${linha.split(":").slice(0, 2).join(":")}`,
    );
  }
}

// 3) Literais de canal legado fora do contrato.
const literais = grep(String.raw`attribution_channel:\s*["'](direto|ads|organico|referencia)["']`);
for (const linha of literais.split("\n").filter(Boolean)) {
  if (linha.startsWith(CONTRATO)) continue;
  falhas.push(`Canal legado gravado fora do contrato → ${linha.trim()}`);
}

if (falhas.length) {
  console.error("✖ Contrato de atribuição de aquisição violado:\n");
  for (const f of falhas) console.error(`  · ${f}`);
  console.error(
    "\nCorrija em src/lib/canalAtribuicao.ts / src/lib/utmCapture.ts. Ver docs/governanca-utm.md.",
  );
  process.exit(1);
}

console.log("✔ Contrato de atribuição de aquisição íntegro (taxonomia única, sem UTM falsificada).");
