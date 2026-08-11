#!/usr/bin/env node
/**
 * GATE — SIMILARIDADE ENTRE PÁGINAS LOCAIS PROGRAMÁTICAS (Rodada 2C).
 *
 * Compara o conteúdo editorial principal (<main>, sem header/footer/CTA global)
 * das URLs locais indexáveis usando Jaccard sobre 5-gramas.
 *
 *   >= 0.90 crítico  → falha o build
 *   >= 0.80 alto     → falha o build
 *   >= 0.70 revisar  → aviso
 *
 * Allowlist documentada em scripts/lib/local-inventory.mjs.
 *
 * Uso: node scripts/check-programmatic-similarity.mjs [dist] [--report]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  LOCAIS_INDEXAVEIS,
  SIMILARITY_ALLOWLIST,
  SIMILARITY_THRESHOLDS,
} from "./lib/local-inventory.mjs";

const args = process.argv.slice(2);
const ROOT = args.find((a) => !a.startsWith("--")) || "dist";
const REPORT = args.includes("--report");

/** Remove blocos globais (header, footer, nav, CTA fixo) antes de comparar. */
function editorialText(html) {
  let main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  main = main
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  return main
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingles(text, n = 5) {
  const w = text.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i += 1) set.add(w.slice(i, i + n).join(" "));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) inter += 1;
  return inter / (a.size + b.size - inter);
}

const allowed = new Set(SIMILARITY_ALLOWLIST.map(([a, b]) => [a, b].sort().join(" | ")));

const pages = [];
const missing = [];
for (const path of LOCAIS_INDEXAVEIS) {
  const file = join(ROOT, path.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) {
    missing.push(path);
    continue;
  }
  const text = editorialText(readFileSync(file, "utf8"));
  pages.push({ path, words: text.split(" ").filter(Boolean).length, sh: shingles(text) });
}

const pairs = [];
for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    pairs.push({
      a: pages[i].path,
      b: pages[j].path,
      score: Number(jaccard(pages[i].sh, pages[j].sh).toFixed(3)),
    });
  }
}
pairs.sort((x, y) => y.score - x.score);

const failures = pairs.filter(
  (p) => p.score >= SIMILARITY_THRESHOLDS.alto && !allowed.has([p.a, p.b].sort().join(" | ")),
);
const revisar = pairs.filter(
  (p) => p.score >= SIMILARITY_THRESHOLDS.revisar && p.score < SIMILARITY_THRESHOLDS.alto,
);

if (REPORT) {
  console.log("── 20 pares mais semelhantes (conteúdo editorial) ──");
  pairs.slice(0, 20).forEach((p) => console.log(`  ${p.score.toFixed(3)}  ${p.a}  ×  ${p.b}`));
}

if (failures.length) {
  console.error("BLOQUEADO — páginas locais quase idênticas (doorway):");
  failures.forEach((p) => {
    const nivel = p.score >= SIMILARITY_THRESHOLDS.critico ? "CRÍTICO" : "ALTO";
    console.error(`  • [${nivel}] ${p.score.toFixed(3)} — ${p.a} × ${p.b}`);
  });
  process.exit(1);
}

revisar.forEach((p) => console.warn(`  ! revisar ${p.score.toFixed(3)} — ${p.a} × ${p.b}`));
console.log(
  `[programmatic-similarity] OK — ${pages.length} páginas locais indexáveis, ` +
    `${pairs.length} pares comparados, máx ${pairs[0]?.score.toFixed(3) ?? "0.000"}.` +
    (missing.length ? ` Sem HTML: ${missing.join(", ")}.` : ""),
);
