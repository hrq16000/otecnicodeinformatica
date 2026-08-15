#!/usr/bin/env bun
/**
 * GATE — nenhuma página de /problemas fica em "reavaliar" (Rodada 4C).
 *
 * Falha o CI quando:
 *   • uma URL recomendada como `reavaliar` no inventário não tem decisão em
 *     src/lib/problemDecisions4c.ts;
 *   • uma decisão CANONICALIZAR aponta para alvo inexistente ou não indexável;
 *   • uma decisão CANONICALIZAR aponta para outra página que também tem decisão
 *     (cadeia de canonical — o alvo precisa ser terminal);
 *   • uma URL decidida voltou para o sitemap com o sufixo local.
 *
 * Uso: bun scripts/check-problem-decisions.ts
 */
import { readFileSync } from "node:fs";
import { DECISOES_4C, decisao4cDe } from "../src/lib/problemDecisions4c";
import { problemaPagesData } from "../src/lib/problemIntentSources";
import { temSufixoLocal } from "../src/lib/problemIntentPolicy";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const curados = new Set(
  (CURATED_PATHS as (string | { path: string })[]).map((p) => (typeof p === "string" ? p : p.path)),
);

const entradas = problemaPagesData();
const urlsExistentes = new Set(entradas.map((e) => e.url));
const erros: string[] = [];

/** Inventário congelado da Rodada 4 — fonte do estado "reavaliar". */
const registros: { url: string; indexabilidadeRecomendada: string }[] = JSON.parse(
  readFileSync("reports/problem-intent-map.json", "utf8"),
).registros;

for (const r of registros) {
  if (r.indexabilidadeRecomendada !== "reavaliar") continue;
  if (!decisao4cDe(r.url)) erros.push(`${r.url} — sem decisão registrada (estado "reavaliar")`);
}

for (const d of DECISOES_4C) {
  if (!urlsExistentes.has(d.url)) {
    erros.push(`${d.url} — decisão registrada para URL que não existe mais nas fontes`);
  }
  if (curados.has(d.url) && temSufixoLocal(d.url)) {
    erros.push(`${d.url} — URL com sufixo local voltou ao sitemap curado`);
  }
  if (d.decisao === "CANONICALIZAR") {
    if (!curados.has(d.canonical)) {
      erros.push(`${d.url} → ${d.canonical} — alvo de canonical não é indexável (fora do sitemap)`);
    }
    if (decisao4cDe(d.canonical)) {
      erros.push(`${d.url} → ${d.canonical} — cadeia de canonical: o alvo também é redirecionado`);
    }
    if (temSufixoLocal(d.canonical)) {
      erros.push(`${d.url} → ${d.canonical} — alvo de canonical tem sufixo local`);
    }
  } else if (curados.has(d.criarCanonico)) {
    erros.push(
      `${d.url} — canônico ${d.criarCanonico} já existe: a decisão deveria ser CANONICALIZAR`,
    );
  }
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO: ${erros.length} problema(s) nas decisões da Rodada 4C:`);
  for (const e of erros) console.error(`  · ${e}`);
  console.error("\n  Fonte da decisão: src/lib/problemDecisions4c.ts");
  process.exit(1);
}

const canon = DECISOES_4C.filter((d) => d.decisao === "CANONICALIZAR").length;
console.log(
  `✓ ${DECISOES_4C.length} decisão(ões) 4C válidas (${canon} canonicalizadas · ${DECISOES_4C.length - canon} repositionadas) · 0 páginas em "reavaliar".`,
);
