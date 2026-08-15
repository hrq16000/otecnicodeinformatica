#!/usr/bin/env node
/**
 * GATE — CONFORMIDADE DA POLÍTICA LOCAL (RODADA 5)
 *
 * Fonte única: src/lib/localIndexPolicy.json.
 * Valida, no dist gerado, que cada rota local declarada respeita a decisão
 * central em três superfícies simultâneas:
 *   1. meta robots       (index/noindex)
 *   2. link canonical    (self ou pai declarado)
 *   3. sitemap.xml       (presente somente quando sitemap === true)
 *
 * Fail-closed: rota declarada como indexável cujo HTML não existe é erro.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { ENTIDADES, resolveLocal } from "./lib/local-index-policy.mjs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";


const dist = process.argv[2] || "dist";
const erros = [];
const avisos = [];

// Harness SSR: HTML renderizado é a única fonte aceita (Micro-Rodada Local 1.1).
await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist });
abortarSeBloqueado("check-local-index-policy");

const sitemapUrls = new Set();
const arquivosSitemap = existsSync(dist)
  ? readdirSync(dist).filter((f) => /^sitemap.*\.xml$/.test(f) && !/images|news|index/.test(f))
  : [];
for (const file of arquivosSitemap) {
  const xml = readFileSync(resolve(dist, file), "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      sitemapUrls.add(new URL(m[1]).pathname.replace(/\/$/, "") || "/");
    } catch {
      sitemapUrls.add(m[1]);
    }
  }
}

for (const entidade of ENTIDADES) {
  const d = resolveLocal(entidade.path);
  const html = htmlDaRota(d.path, dist);

  if (!html) {
    if (d.indexability === "index") {
      erros.push(`${d.path}: declarado indexável, mas não existe HTML estático no dist.`);
    }
    continue;
  }

  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? "";
  const canonicalPath = canonical ? (canonical.startsWith("http") ? new URL(canonical).pathname : canonical) : "";

  const temNoindex = /noindex/i.test(robots);
  const deveNoindex = d.indexability !== "index";

  if (robots === "") {
    erros.push(`${d.path}: sem meta robots explícito (a política exige declaração explícita).`);
  } else if (temNoindex !== deveNoindex) {
    erros.push(
      `${d.path}: robots "${robots}" conflita com a política "${d.indexability}" (${d.reason ?? "sem motivo declarado"}).`,
    );
  }

  const esperado = (d.canonical || d.path).replace(/\/$/, "") || "/";
  const obtido = (canonicalPath || "").replace(/\/$/, "") || canonicalPath;
  if (canonicalPath && obtido !== esperado) {
    erros.push(`${d.path}: canonical "${obtido}" difere do esperado "${esperado}".`);
  }
  if (!canonicalPath) {
    avisos.push(`${d.path}: sem canonical no HTML estático.`);
  }

  const noSitemap = sitemapUrls.has((d.path.replace(/\/$/, "") || "/"));
  if (d.sitemap && !noSitemap) {
    erros.push(`${d.path}: política manda incluir no sitemap, mas a URL está ausente.`);
  }
  if (!d.sitemap && noSitemap) {
    erros.push(`${d.path}: política manda excluir do sitemap, mas a URL está presente.`);
  }
}

// Coerência com a lista curada: nada indexável pela política pode faltar nela.
const curados = new Set(CURATED_PATHS.map((p) => (typeof p === "string" ? p : p.path)));
for (const e of ENTIDADES) {
  const d = resolveLocal(e.path);
  if (d.sitemap && !curados.has(d.path)) {
    erros.push(`${d.path}: indexável na política, mas fora de CURATED_PATHS.`);
  }
}

for (const a of avisos) console.warn(`[check-local-index-policy] aviso: ${a}`);

if (erros.length) {
  console.error(`\n[check-local-index-policy] ${erros.length} divergência(s) entre a política e o build:`);
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(
  `[check-local-index-policy] OK — ${ENTIDADES.length} rotas locais conferidas (robots, canonical e sitemap coerentes com a política).`,
);
