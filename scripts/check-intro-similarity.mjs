#!/usr/bin/env node
/**
 * GATE FAIL-CLOSED — similaridade de INTRODUÇÃO entre rotas serviço × cidade.
 *
 * Micro-Rodada Local 1.2 corrigiu 3 pares acima do limite editorial (0.400).
 * Este gate impede a regressão: qualquer par de páginas indexáveis cuja
 * janela de 120 palavras iniciais do <main> ultrapasse o limite bloqueia o
 * build, com o par e o score impressos no console.
 *
 * Fail-closed: se o harness SSR não conseguir renderizar as rotas, o gate
 * falha (nunca passa em silêncio).
 *
 * Uso: node scripts/check-intro-similarity.mjs [dist] [--limite=0.4]
 */
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";
import { resolveLocal, SERVICO_CIDADE_INDEXAVEIS } from "./lib/local-index-policy.mjs";

const args = process.argv.slice(2);
const dist = args.find((a) => !a.startsWith("--")) || "dist";
const LIMITE = Number(args.find((a) => a.startsWith("--limite="))?.split("=")[1] ?? 0.4);
const JANELA = 120;

const semAcento = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const textoDe = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return semAcento(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " "),
  )
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const ngrams = (texto, n = 4) => {
  const w = texto.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(" "));
  return set;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
};

await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist });
abortarSeBloqueado("check-intro-similarity");

const alvos = SERVICO_CIDADE_INDEXAVEIS.filter((p) => resolveLocal(p).indexability === "index");
const intros = new Map();
const semHtml = [];

for (const path of alvos) {
  const html = htmlDaRota(path, dist);
  if (!html) {
    semHtml.push(path);
    continue;
  }
  intros.set(path, ngrams(textoDe(html).split(" ").slice(0, JANELA).join(" ")));
}

if (semHtml.length) {
  console.error("✗ FAIL_ROUTE_NOT_RENDERED — sem HTML para:");
  for (const p of semHtml) console.error(`   ${p}`);
  process.exit(1);
}

const chaves = [...intros.keys()];
const pares = [];
for (let i = 0; i < chaves.length; i++) {
  for (let j = i + 1; j < chaves.length; j++) {
    pares.push([chaves[i], chaves[j], jaccard(intros.get(chaves[i]), intros.get(chaves[j]))]);
  }
}
pares.sort((a, b) => b[2] - a[2]);

const violacoes = pares.filter(([, , s]) => s > LIMITE);

console.log(`gate intro-similarity — ${chaves.length} rotas, ${pares.length} pares, limite ${LIMITE.toFixed(3)}`);
for (const [a, b, s] of pares.slice(0, 5)) console.log(`   ${s.toFixed(3)}  ${a} ↔ ${b}`);

if (violacoes.length) {
  console.error(`\n✗ ${violacoes.length} par(es) acima do limite editorial:`);
  for (const [a, b, s] of violacoes) {
    console.error(`   ${s.toFixed(3)} > ${LIMITE.toFixed(3)}  ${a} ↔ ${b}`);
  }
  console.error("\nCorreção esperada: reescrever a introdução (bloco `intro`) com a intenção");
  console.error("e a jornada específicas do serviço naquela cidade — não alterar o limite.");
  process.exit(1);
}

console.log(`\n✓ maior similaridade de introdução: ${(pares[0]?.[2] ?? 0).toFixed(3)} (limite ${LIMITE.toFixed(3)})`);
