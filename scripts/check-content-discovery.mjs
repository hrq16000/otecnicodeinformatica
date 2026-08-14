#!/usr/bin/env node
/**
 * GATE — DESCOBERTA DO CLUSTER EDITORIAL (Rodada 8F)
 * --------------------------------------------------
 * Bloqueia o build quando o cluster piloto perde as condições básicas
 * de ser encontrado. Este gate NÃO cobra indexação (isso é decisão do
 * Google); ele cobra o que depende de nós:
 *
 *   1. A rota existe no build (HTML presente).
 *   2. Está no sitemap.
 *   3. Canonical aponta para ela mesma.
 *   4. Não está com noindex.
 *   5. Tem pelo menos 2 links internos de entrada (nada de página órfã).
 *   6. Profundidade de clique a partir da Home ≤ 3.
 *   7. A coorte não divergiu do mapa de intenção da 8E.
 *
 * Fail-closed: sem dist, o gate não "passa por omissão" — ele avisa e
 * sai com erro quando executado em contexto de build.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.resolve(process.argv[2] || "dist");
const MIN_INBOUND = 2;
const MAX_DEPTH = 3;

const cohortSrc = readFileSync(path.join(ROOT, "src/lib/contentCohort.ts"), "utf8");
const COHORT = [...cohortSrc.matchAll(/url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)"/g)].map((m) => m[1]);
const intentSrc = readFileSync(path.join(ROOT, "src/lib/contentIntentMap.ts"), "utf8");

const erros = [];
const avisos = [];

// 7. coerência coorte × mapa de intenção
for (const url of COHORT) {
  if (!intentSrc.includes(`"${url}"`)) {
    erros.push(`Coorte contém \`${url}\`, que não está declarada em contentIntentMap.ts.`);
  }
}

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: dist ausente em ${DIST}. Rode o build antes de check:content-discovery.`);
  process.exit(1);
}

// varredura
const paginas = new Map();
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e === "index.html") {
      const rota = "/" + path.relative(DIST, dir).split(path.sep).join("/");
      paginas.set(rota === "/." ? "/" : rota, full);
    }
  }
})(DIST);

const cache = new Map();
const html = (f) => {
  if (!cache.has(f)) cache.set(f, readFileSync(f, "utf8"));
  return cache.get(f);
};
const links = (f) => [...new Set([...html(f).matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/+$/, "") || "/"))];

// profundidade a partir da Home
const depth = new Map();
if (paginas.has("/")) {
  depth.set("/", 0);
  const fila = ["/"];
  while (fila.length) {
    const at = fila.shift();
    for (const alvo of links(paginas.get(at))) {
      if (depth.has(alvo) || !paginas.has(alvo)) continue;
      depth.set(alvo, depth.get(at) + 1);
      fila.push(alvo);
    }
  }
}

// sitemap
const sitemap = new Set();
for (const f of readdirSync(DIST)) {
  if (!f.startsWith("sitemap") || !f.endsWith(".xml")) continue;
  for (const m of readFileSync(path.join(DIST, f), "utf8").matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
    try {
      sitemap.add(new URL(m[1]).pathname.replace(/\/+$/, "") || "/");
    } catch {
      /* outro gate cuida de loc inválido */
    }
  }
}

for (const url of COHORT) {
  const file = paginas.get(url) ?? (existsSync(path.join(DIST, `${url.replace(/^\//, "")}.html`)) ? path.join(DIST, `${url.replace(/^\//, "")}.html`) : null);
  if (!file) {
    erros.push(`\`${url}\`: sem HTML no build (rota não responde 200).`);
    continue;
  }
  const doc = html(file);

  if (!sitemap.has(url)) erros.push(`\`${url}\`: fora do sitemap.`);

  const canonical = doc.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const canonicalPath = (() => {
    try {
      return canonical ? new URL(canonical).pathname.replace(/\/+$/, "") || "/" : null;
    } catch {
      return null;
    }
  })();
  if (canonicalPath !== url) {
    erros.push(`\`${url}\`: canonical aponta para ${canonicalPath ?? "nenhum"} em vez de si mesma.`);
  }

  const robots = doc.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
  if (/noindex/i.test(robots)) erros.push(`\`${url}\`: marcada como noindex.`);

  const inbound = [...paginas].filter(([r, f]) => r !== url && links(f).includes(url)).map(([r]) => r);
  if (inbound.length < MIN_INBOUND) {
    erros.push(`\`${url}\`: apenas ${inbound.length} link(s) interno(s) de entrada (mínimo ${MIN_INBOUND}).`);
  }

  const d = depth.get(url);
  if (d === undefined) erros.push(`\`${url}\`: inalcançável navegando a partir da Home.`);
  else if (d > MAX_DEPTH) erros.push(`\`${url}\`: profundidade de clique ${d} (máximo ${MAX_DEPTH}).`);
  else if (d === MAX_DEPTH) avisos.push(`\`${url}\`: profundidade ${d}, no limite permitido.`);
}

console.log("── check:content-discovery ──");
console.log(`  coorte: ${COHORT.length} URLs`);
for (const a of avisos) console.log(`  aviso: ${a}`);

if (erros.length) {
  console.error(`\nBLOQUEADO — ${erros.length} problema(s) de descoberta:`);
  for (const e of erros) console.error(`  • ${e}`);
  process.exit(1);
}

console.log("  OK: cluster encontrável (sitemap, canonical, index, links internos, profundidade).");
