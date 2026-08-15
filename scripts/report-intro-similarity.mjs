#!/usr/bin/env node
/**
 * RELATÓRIO (não bloqueante) — similaridade de INTRODUÇÃO entre rotas locais.
 *
 * Usa exatamente a mesma normalização, tokenização e janela (120 palavras do
 * <main>, 4-gramas) do gate check-local-doorway. Serve apenas para reportar
 * números; não altera régua, threshold nem comparador.
 */
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";
import { resolveLocal, SERVICO_CIDADE_INDEXAVEIS } from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";
const semAcento = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function textoDe(html) {
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
}

function ngrams(texto, n = 4) {
  const w = texto.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(" "));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
}

await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist });
abortarSeBloqueado("report-intro-similarity");

const alvos = SERVICO_CIDADE_INDEXAVEIS.filter((p) => resolveLocal(p).indexability === "index");
const intros = new Map();
for (const path of alvos) {
  const html = htmlDaRota(path, dist);
  if (!html) continue;
  intros.set(path, ngrams(textoDe(html).split(" ").slice(0, 120).join(" ")));
}

const linhas = [];
const chaves = [...intros.keys()];
for (let i = 0; i < chaves.length; i++)
  for (let j = i + 1; j < chaves.length; j++)
    linhas.push([chaves[i], chaves[j], jaccard(intros.get(chaves[i]), intros.get(chaves[j]))]);

linhas.sort((a, b) => b[2] - a[2]);
for (const [a, b, s] of linhas) console.log(`${s.toFixed(3)}  ${a} ↔ ${b}`);
console.log(`\nmaior similaridade de introdução: ${linhas[0]?.[2].toFixed(3)} (limite do gate: 0.400)`);
