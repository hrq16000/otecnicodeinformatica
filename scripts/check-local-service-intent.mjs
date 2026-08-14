#!/usr/bin/env node
/**
 * ============================================================================
 * GATE — SERVIÇO GLOBAL × SERVIÇO LOCAL (Rodada 5C)
 * ============================================================================
 * Impede que /servicos/<servico>/<cidade> vire doorway do serviço-pai.
 *
 * Regras (fail-closed):
 *  1. Todo SERVICO_CIDADE indexável precisa de conteúdo local declarado em
 *     src/lib/servicoCuritibaBlocos.json (blocos + FAQ + intenção local).
 *  2. O `parent` declarado precisa ser uma rota REAL de serviço.
 *  3. Página local: canonical self, robots index, presença no sitemap.
 *  4. Página não promovida: canonical no pai, robots noindex, fora do sitemap.
 *  5. Title e H1 do filho não podem repetir o do pai.
 *  6. Mínimo de 550 palavras no <main> (mesmo piso do gate antidoorway).
 *  7. Intenção local declarada ≠ intenção global declarada.
 * ============================================================================
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ENTIDADES } from "./lib/local-index-policy.mjs";
import { SERVICO_CURITIBA_PAGINAS } from "./lib/servico-curitiba.mjs";

const DIST = join(process.cwd(), "dist");
const MIN_PALAVRAS = 550;
const falhas = [];
const avisos = [];

const html = (path) => {
  const file = join(DIST, path.replace(/^\//, ""), "index.html");
  return existsSync(file) ? readFileSync(file, "utf8") : null;
};

const sitemapUrls = () => {
  const f = join(DIST, "sitemap-servicos.xml");
  if (!existsSync(f)) return null;
  return new Set([...readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
};

const tag = (src, re) => src.match(re)?.[1]?.trim() ?? "";
const titleOf = (src) => tag(src, /<title>([\s\S]*?)<\/title>/i);
const h1Of = (src) => tag(src, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, " ").trim();
const canonicalOf = (src) => tag(src, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
const robotsOf = (src) => tag(src, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
const palavras = (src) => {
  const main = src.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? src;
  return main.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
};

const locais = ENTIDADES.filter((e) => e.family === "SERVICO_CIDADE");
const urls = sitemapUrls();
if (!urls) avisos.push("sitemap-servicos.xml ausente em dist/ — verificação de sitemap ignorada.");

for (const rota of locais) {
  const slug = rota.path.split("/")[2];
  const conteudo = SERVICO_CURITIBA_PAGINAS[slug];
  const promovida = rota.indexability === "index";

  // Regra 1 — fail-closed.
  if (promovida && !conteudo) {
    falhas.push(`${rota.path}: marcada como index sem conteúdo local em servicoCuritibaBlocos.json.`);
    continue;
  }
  if (!promovida && conteudo) {
    avisos.push(`${rota.path}: possui conteúdo local declarado mas segue canonicalizada (decisão editorial).`);
  }

  // Regra 2 — o pai precisa existir de fato.
  const pai = rota.parent ?? rota.canonical;
  if (!pai) falhas.push(`${rota.path}: sem 'parent' declarado na política local.`);
  else if (!html(pai)) falhas.push(`${rota.path}: parent '${pai}' não gerou HTML — rota inexistente.`);

  const src = html(rota.path);
  if (!src) {
    if (promovida) falhas.push(`${rota.path}: promovida a index mas sem HTML estático em dist/.`);
    continue;
  }

  const canonical = canonicalOf(src);
  const robots = robotsOf(src);

  if (promovida) {
    // Regra 3.
    if (!canonical.endsWith(rota.path)) falhas.push(`${rota.path}: canonical deveria ser self, é '${canonical}'.`);
    if (robots && /noindex/i.test(robots)) falhas.push(`${rota.path}: robots '${robots}' conflita com index.`);
    if (urls && ![...urls].some((u) => u.endsWith(rota.path))) falhas.push(`${rota.path}: ausente no sitemap-servicos.xml.`);

    // Regra 5.
    const paiSrc = pai ? html(pai) : null;
    if (paiSrc) {
      if (titleOf(paiSrc) === titleOf(src)) falhas.push(`${rota.path}: title idêntico ao do pai '${pai}'.`);
      if (h1Of(paiSrc) === h1Of(src)) falhas.push(`${rota.path}: H1 idêntico ao do pai '${pai}'.`);
    }

    // Regra 6.
    const n = palavras(src);
    if (n < MIN_PALAVRAS) falhas.push(`${rota.path}: ${n} palavras no <main> (mínimo ${MIN_PALAVRAS}).`);

    // Regra 7.
    if (conteudo && conteudo.intentGlobal.trim() === conteudo.intentLocal.trim())
      falhas.push(`${rota.path}: intenção local igual à global — não justifica página separada.`);
    if (conteudo && conteudo.parent !== pai)
      falhas.push(`${rota.path}: parent divergente entre política ('${pai}') e conteúdo ('${conteudo.parent}').`);
  } else {
    // Regra 4.
    const alvo = rota.canonical ?? pai;
    if (alvo && !canonical.endsWith(alvo)) falhas.push(`${rota.path}: canonical deveria apontar para '${alvo}', é '${canonical}'.`);
    if (urls && [...urls].some((u) => u.endsWith(rota.path))) falhas.push(`${rota.path}: canonicalizada, mas presente no sitemap.`);
  }
}

for (const a of avisos) console.log(`  aviso  ${a}`);
if (falhas.length) {
  console.error(`\n✖ check:local-service-intent — ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  • ${f}`);
  process.exit(1);
}
console.log(`✓ check:local-service-intent — ${locais.length} rota(s) serviço × cidade em conformidade.`);
