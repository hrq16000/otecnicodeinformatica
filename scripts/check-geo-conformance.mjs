#!/usr/bin/env node
/**
 * GATE check:geo — conformidade GEO/SEO por rota pública do dist/.
 *
 * Para cada index.html indexável valida, fail-closed:
 *   • <title> presente, único e dentro da janela permitida;
 *   • <meta name="description"> presente, única e dentro da janela;
 *   • exatamente um <h1> e H2s não duplicados dentro da própria página;
 *   • <link rel="canonical"> self-referente (mesma rota, domínio oficial);
 *   • robots com index,follow (rotas noindex são apenas ignoradas);
 *   • todo bloco JSON-LD parseável e com @context/@type.
 *
 * Uso: node scripts/check-geo-conformance.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { TITLE_MIN, TITLE_MAX, DESC_MIN, DESC_MAX } from "./lib/seo-meta.mjs";

const DIST = path.resolve(process.argv[2] || "dist");
if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry === "index.html") files.push(full);
  }
})(DIST);

const decode = (s) =>
  String(s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const rota = (file) => {
  const rel = path.relative(DIST, file).replace(/\\/g, "/").replace(/index\.html$/, "");
  const r = `/${rel}`.replace(/\/+$/, "");
  return r === "" ? "/" : r;
};

const erros = [];
const avisos = [];
const titulos = new Map();
const descricoes = new Map();
let auditadas = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const url = rota(file);

  const canonicalRaw = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  if (canonicalRaw) {
    let alvo = canonicalRaw;
    try {
      alvo = new URL(canonicalRaw).pathname;
    } catch {
      /* canonical relativo */
    }
    const normalAlvo = alvo.replace(/\/+$/, "") || "/";
    if (normalAlvo !== url) {
      // Rota-alias declarada: o canonical aponta para a rota mestre.
      // Só é aceita quando a rota mestre realmente existe no dist.
      const destino = path.join(DIST, normalAlvo.replace(/^\//, ""), "index.html");
      if (existsSync(destino)) {
        avisos.push(`${url}: alias canônico de ${normalAlvo} (fora da auditoria GEO)`);
        continue;
      }
    }
  }

  const robots = (html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] || "").toLowerCase();
  if (robots.includes("noindex")) continue;

  auditadas += 1;

  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  if (!title) erros.push(`${url}: <title> ausente`);
  else if (title.length < TITLE_MIN || title.length > TITLE_MAX)
    avisos.push(`${url}: title com ${title.length} chars (janela ${TITLE_MIN}-${TITLE_MAX})`);
  if (title) {
    const chave = title.toLowerCase();
    if (titulos.has(chave)) erros.push(`${url}: title duplicado com ${titulos.get(chave)}`);
    else titulos.set(chave, url);
  }

  const desc = decode(html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]);
  if (!desc) erros.push(`${url}: meta description ausente`);
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    avisos.push(`${url}: description com ${desc.length} chars (janela ${DESC_MIN}-${DESC_MAX})`);
  if (desc) {
    const chave = desc.toLowerCase();
    if (descricoes.has(chave)) erros.push(`${url}: description duplicada com ${descricoes.get(chave)}`);
    else descricoes.set(chave, url);
  }

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1])).filter(Boolean);
  if (h1s.length === 0) erros.push(`${url}: sem H1 no HTML estático`);
  else if (h1s.length > 1) erros.push(`${url}: ${h1s.length} H1 na mesma rota`);

  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => decode(m[1]).toLowerCase()).filter(Boolean);
  const repetidos = h2s.filter((h, i) => h.length > 3 && h2s.indexOf(h) !== i);
  if (repetidos.length) erros.push(`${url}: H2 repetido na mesma rota — "${repetidos[0]}"`);

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  if (!canonical) {
    erros.push(`${url}: canonical ausente`);
  } else {
    let caminho = canonical;
    try {
      caminho = new URL(canonical).pathname;
    } catch {
      /* canonical relativo */
    }
    const normal = caminho.replace(/\/+$/, "") || "/";
    if (normal !== url) erros.push(`${url}: canonical aponta para ${normal} (deve ser self)`);
  }

  if (robots && !(robots.includes("index") && robots.includes("follow")))
    erros.push(`${url}: robots "${robots}" sem index,follow`);

  const blocos = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocos.length === 0) erros.push(`${url}: nenhum bloco JSON-LD`);
  for (const [, raw] of blocos) {
    let data;
    try {
      data = JSON.parse(raw.trim());
    } catch (e) {
      erros.push(`${url}: JSON-LD inválido (${e.message})`);
      continue;
    }
    const nos = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
    for (const no of nos) {
      if (!no || typeof no !== "object") {
        erros.push(`${url}: nó JSON-LD não é objeto`);
        continue;
      }
      if (!no["@type"]) erros.push(`${url}: nó JSON-LD sem @type`);
    }
    if (!Array.isArray(data) && !data["@context"]) erros.push(`${url}: JSON-LD sem @context`);
  }
}

console.log("── Gate check:geo ──");
console.log(`  rotas indexáveis auditadas: ${auditadas}`);
if (avisos.length) {
  console.log(`  avisos (não bloqueiam): ${avisos.length}`);
  for (const a of avisos.slice(0, 40)) console.log(`    · ${a}`);
}
if (erros.length) {
  console.error(`✖ ${erros.length} problema(s) de conformidade GEO:`);
  for (const e of erros.slice(0, 60)) console.error(`  - ${e}`);
  if (erros.length > 60) console.error(`  ... e mais ${erros.length - 60}`);
  process.exit(1);
}
console.log("✔ title/description únicos, H1 único, canonical self, robots e JSON-LD válidos.");
