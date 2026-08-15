#!/usr/bin/env node
/**
 * GATE — QUALIDADE DAS PÁGINAS LOCAIS (Rodada 2C).
 *
 * Valida, sobre o HTML estático em `dist/`:
 *   - toda URL local indexável declarada tem title, description, H1 único,
 *     canonical self-referente e conteúdo mínimo;
 *   - nenhuma URL local indexável emite `noindex`;
 *   - toda URL local indexável está no sitemap curado;
 *   - nenhuma URL `noindex` aparece no sitemap;
 *   - canonical nunca aponta para domínio de terceiros;
 *   - páginas locais não criam LocalBusiness fictício (endereço/filial por bairro).
 *
 * Uso: node scripts/check-local-seo-quality.mjs [dist]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { LOCAIS_DECLARADOS, LOCAIS_INDEXAVEIS } from "./lib/local-inventory.mjs";
import { CURATED_PATHS, BASE_URL } from "./lib/curated-urls.mjs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";

const ROOT = process.argv[2] || "dist";
/**
 * O HTML estático é o shell pré-renderizado (título, H1, blocos locais críticos);
 * o corpo editorial completo é hidratado no cliente. O piso abaixo valida que o
 * crawler recebe conteúdo local real no primeiro byte, não a página completa.
 */
const MIN_WORDS = 100;

const errors = [];
const warnings = [];
const skipped = [];

await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist: ROOT });
abortarSeBloqueado("check-local-seo-quality");

function htmlFor(route) {
  return htmlDaRota(route, ROOT);
}

const textOf = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const attr = (html, re) => html.match(re)?.[1]?.trim() ?? "";

let checked = 0;

for (const entry of LOCAIS_DECLARADOS) {
  const html = htmlFor(entry.path);
  if (!html) {
    // Fail-closed (FASE 20): rota indexável sem HTML renderizado é falha, não skip.
    if (LOCAIS_INDEXAVEIS.includes(entry.path)) {
      errors.push(`${entry.path}: FAIL_ROUTE_NOT_RENDERED — indexável sem HTML SSR verificável`);
    } else {
      skipped.push(entry.path);
    }
    continue;
  }
  const indexavel = LOCAIS_INDEXAVEIS.includes(entry.path);
  const robots = attr(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i).toLowerCase();
  const noindex = robots.includes("noindex");
  const canonical = attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  );
  const words = textOf(html).split(" ").filter(Boolean).length;
  const noSitemap = !CURATED_PATHS.includes(entry.path);
  checked += 1;

  if (canonical && BASE_URL && !canonical.startsWith(BASE_URL)) {
    errors.push(`${entry.path}: canonical aponta para fora do domínio (${canonical})`);
  }

  if (indexavel) {
    if (noindex) errors.push(`${entry.path}: declarada indexável (${entry.classe}) mas emite noindex`);
    if (!title) errors.push(`${entry.path}: sem <title>`);
    if (!desc) errors.push(`${entry.path}: sem meta description`);
    if (h1s.length !== 1) errors.push(`${entry.path}: ${h1s.length} H1 (deve haver exatamente 1)`);
    if (!canonical) errors.push(`${entry.path}: sem canonical`);
    else if (BASE_URL && canonical.replace(/\/$/, "") !== `${BASE_URL}${entry.path}`.replace(/\/$/, "")) {
      errors.push(`${entry.path}: canonical não é self-referente (${canonical})`);
    }
    if (words < MIN_WORDS) errors.push(`${entry.path}: conteúdo raso (${words} palavras < ${MIN_WORDS})`);
    if (noSitemap) errors.push(`${entry.path}: indexável mas fora do sitemap curado`);
  } else {
    if (!noindex) errors.push(`${entry.path}: classe ${entry.classe} deveria emitir noindex`);
    if (!noSitemap) errors.push(`${entry.path}: noindex/${entry.classe} mas presente no sitemap`);
  }

  // Nenhuma "filial" fictícia: LocalBusiness com endereço de rua por bairro.
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .join(" ");
  if (/"streetAddress"\s*:\s*"(?!\s*")[^"]+/.test(ld)) {
    errors.push(`${entry.path}: emite streetAddress (unidade física inexistente)`);
  }
  const lbCount = (ld.match(/"@type"\s*:\s*"LocalBusiness"/g) || []).length;
  if (lbCount > 1) errors.push(`${entry.path}: ${lbCount} nós LocalBusiness (rede fictícia de filiais)`);
  if (indexavel && words >= MIN_WORDS && words < 150) {
    warnings.push(`${entry.path}: conteúdo curto (${words} palavras) — reforçar bloco local estático`);
  }
}

if (errors.length) {
  console.error("BLOQUEADO — qualidade das páginas locais:");
  errors.forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
}

warnings.forEach((w) => console.warn(`  ! ${w}`));
console.log(
  `[local-seo-quality] OK — ${checked} rota(s) locais verificadas ` +
    `(${LOCAIS_INDEXAVEIS.length} indexáveis).` +
    (skipped.length ? ` SKIPPED_NON_INDEXABLE (sem HTML SSR): ${skipped.length}.` : ""),
);
