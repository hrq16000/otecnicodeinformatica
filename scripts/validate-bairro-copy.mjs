#!/usr/bin/env node
/**
 * Valida a exigência de copy exclusiva por bairro para as landings âncora
 * Wi-Fi/TV Smart. Regras:
 *
 *  - Todo bairro com `indexable !== false` em BAIRROS_INDEXAVEIS precisa
 *    render, entre `descricaoLocal + narrativaLocal + FAQ + benefícios`,
 *    ≥ 300 palavras "próprias" (fora do vocabulário do template genérico
 *    e de stopwords PT-BR).
 *  - Jaccard entre dois bairros indexáveis ≤ 0.55, para evitar canibalização.
 *
 * Bairros herdados (sem `narrativaLocal`) são grandfathered com WARN — só
 * quebram o build a partir da onda 3 (novos slugs com narrativa obrigatória).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const STOPWORDS = new Set(
  ("a à ao aos as até com como da das de do dos e em entre é era eram essa esse essas esses esta estas este estes eu foi for foram há isso isto já lhe lhes mais mas me mesmo meu meus minha minhas na nas no nos nós num numa o os ou para pela pelas pelo pelos por qual quando que quem se sem ser será seu seus só sob sobre sua suas também te tem tém tinha tinham um uma umas uns você vocês")
    .split(/\s+/)
);

// Vocabulário genérico do template (marketing puro) — removido antes da
// contagem. Termos técnicos ficam preservados porque descrevem o serviço
// real; a uniqueness cruzada é checada pelo Jaccard abaixo.
const TEMPLATE_VOCAB = new Set([
  "orçamento","whatsapp","curitiba","cliente","aprovação","valor","mínimo",
  "r$","serviço","serviços","atendimento","técnico","técnica","técnicos",
]);

const src = readFileSync(resolve("src/pages/servico-bairro/wifiTvBairroData.ts"), "utf8");

// Extração leve (regex) do bloco BAIRROS_INDEXAVEIS. Suficiente porque o arquivo
// segue estrutura estável e este script roda no CI antes do build.
function extractEntries() {
  const entries = [];
  // Slugs válidos vêm entre aspas ou como chave direta seguindo `,\n  `.
  const bairroBlocks = src.matchAll(/\n  "?([a-z][a-z0-9-]*)"?:\s*\{\s*\n\s*slug:\s*"([a-z0-9-]+)",([\s\S]*?)\n\s{2}\},/g);
  for (const m of bairroBlocks) {
    const slug = m[2];
    const body = m[3];
    const nome = /nome:\s*"([^"]+)"/.exec(body)?.[1] || slug;
    const descricao = /descricaoLocal:\s*\n?\s*"([\s\S]*?)"(?=,\n)/.exec(body)?.[1] || "";
    const narrativa = /narrativaLocal:\s*\n?\s*"([\s\S]*?)"(?=,\n)/.exec(body)?.[1] || "";
    const indexable = /indexable:\s*false/.test(body) ? false : true;
    entries.push({ slug, nome, descricao, narrativa, indexable });
  }
  return entries;
}

function tokenize(text) {
  return (text.toLowerCase().normalize("NFC").match(/[a-záâãàéêíóôõúüç0-9$,]+/g) || [])
    .filter((w) => w.length >= 3)
    .filter((w) => !STOPWORDS.has(w));
}

function ownTokens(text) {
  // Lista (com repetição) usada para contagem de palavras.
  return tokenize(text).filter((w) => !TEMPLATE_VOCAB.has(w));
}
function ownWordSet(text) {
  return new Set(ownTokens(text));
}

function jaccard(a, b) {
  const inter = new Set([...a].filter((x) => b.has(x)));
  const uni = new Set([...a, ...b]);
  return uni.size === 0 ? 0 : inter.size / uni.size;
}

const entries = extractEntries();
const indexable = entries.filter((e) => e.indexable);

let failed = false;
const wordSets = new Map();

for (const e of indexable) {
  const combined = `${e.descricao} ${e.narrativa}`;
  const tokens = ownTokens(combined);
  const set = ownWordSet(combined);
  wordSets.set(e.slug, set);

  if (!e.narrativa) {
    console.warn(`[warn] ${e.slug} (${e.nome}) — sem narrativaLocal (grandfathered). Adicionar antes de re-promover.`);
    continue;
  }
  if (tokens.length < 300) {
    console.error(`[fail] ${e.slug} (${e.nome}) — ${tokens.length} palavras próprias (mínimo 300).`);
    failed = true;
  } else {
    console.log(`[ok]   ${e.slug} (${e.nome}) — ${tokens.length} palavras próprias (${set.size} únicas).`);
  }
}

const slugs = [...wordSets.keys()];
for (let i = 0; i < slugs.length; i++) {
  for (let j = i + 1; j < slugs.length; j++) {
    const a = wordSets.get(slugs[i]);
    const b = wordSets.get(slugs[j]);
    if (!a || !b || a.size === 0 || b.size === 0) continue;
    const jc = jaccard(a, b);
    if (jc > 0.55) {
      console.error(`[fail] Jaccard ${slugs[i]} × ${slugs[j]} = ${jc.toFixed(2)} (>0.55).`);
      failed = true;
    }
  }
}

if (failed) {
  console.error(`\nbairro-copy: FAIL. Reescreva narrativaLocal dos bairros acima.`);
  process.exit(1);
}
console.log(`\nbairro-copy: OK (${indexable.length} bairros indexáveis).`);
