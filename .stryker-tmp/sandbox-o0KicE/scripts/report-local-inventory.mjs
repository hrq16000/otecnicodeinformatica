#!/usr/bin/env node
// @ts-nocheck
/**
 * RELATÓRIO — INVENTÁRIO DE URLs LOCAIS (Rodada 2C, Etapas A e B).
 *
 * Lê o HTML estático em `dist/` e imprime a tabela
 * | Rota | Tipo | Indexável hoje? | Sitemap? | Conteúdo próprio? | Classe |
 *
 * Uso: node scripts/report-local-inventory.mjs [dist]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { LOCAIS_DECLARADOS, LOCAIS_INDEXAVEIS } from "./lib/local-inventory.mjs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const ROOT = process.argv[2] || "dist";

const rows = LOCAIS_DECLARADOS.map((entry) => {
  const file = join(ROOT, entry.path.replace(/^\//, ""), "index.html");
  const html = existsSync(file) ? readFileSync(file, "utf8") : "";
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const words = html
    ? (html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html)
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ").length
    : 0;
  return {
    rota: entry.path,
    tipo: entry.tipo,
    indexavel: html ? (robots.toLowerCase().includes("noindex") ? "não" : "sim") : "s/ HTML",
    sitemap: CURATED_PATHS.includes(entry.path) ? "sim" : "não",
    conteudo: words >= 550 ? "sim" : words >= 350 ? "parcial" : "raso",
    palavras: words,
    classe: entry.classe,
    alvo: LOCAIS_INDEXAVEIS.includes(entry.path) ? "indexar" : "noindex",
  };
});

console.log("| Rota | Tipo | Indexável hoje? | Sitemap? | Conteúdo próprio? | Palavras | Classe | Alvo |");
console.log("|---|---|---|---|---|---|---|---|");
for (const r of rows) {
  console.log(
    `| ${r.rota} | ${r.tipo} | ${r.indexavel} | ${r.sitemap} | ${r.conteudo} | ${r.palavras} | ${r.classe} | ${r.alvo} |`,
  );
}

const counts = rows.reduce((acc, r) => ({ ...acc, [r.classe]: (acc[r.classe] ?? 0) + 1 }), {});
console.log(
  `\nTotal ${rows.length} · ` +
    ["L1", "L2", "L3", "L4", "L5", "L6"].map((c) => `${c} ${counts[c] ?? 0}`).join(" · "),
);
