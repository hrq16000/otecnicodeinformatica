#!/usr/bin/env node
/**
 * GATE — Offer / PriceSpecification nas seções de preço.
 *
 * Percorre o dist/ e valida todo nó Offer encontrado no JSON-LD:
 *   • campos obrigatórios (price ou priceSpecification, priceCurrency BRL, url);
 *   • preço numérico coerente (> 0) e sem separador de milhar textual;
 *   • PriceSpecification com priceCurrency e price/minPrice numéricos;
 *   • o valor precisa aparecer no conteúdo visível da própria página
 *     (markup de preço sem preço visível é rich-result inválido).
 *
 * Uso: node scripts/check-price-schema.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e.endsWith(".html")) files.push(full);
  }
})(DIST);

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? [n, ...Object.values(n).flatMap((v) => (v && typeof v === "object" ? flatten(v) : []))]
      : [];

const typesOf = (n) => (Array.isArray(n?.["@type"]) ? n["@type"] : n?.["@type"] ? [n["@type"]] : []);

/** "300" -> ["r$ 300", "300"] ; "99.99" -> ["r$ 99,99", "99,99"] */
const priceVariants = (raw) => {
  const n = Number(raw);
  if (!Number.isFinite(n)) return [];
  const inteiro = Number.isInteger(n);
  const br = inteiro ? String(n) : n.toFixed(2).replace(".", ",");
  return [`r$ ${br}`, br].map((s) => s.toLowerCase());
};

const visible = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

const errors = [];
let offers = 0;
let pages = 0;

for (const file of files.sort()) {
  const rel = "/" + path.relative(DIST, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .filter(Boolean);
  const nodes = blocks.flatMap(flatten);
  const found = nodes.filter((n) => typesOf(n).includes("Offer"));
  if (!found.length) continue;
  pages++;
  const text = visible(html);

  for (const offer of found) {
    offers++;
    const specs = [].concat(offer.priceSpecification ?? []);
    if (offer.price === undefined && !specs.length)
      errors.push(`${rel}: Offer sem price nem priceSpecification`);
    if (offer.priceCurrency && offer.priceCurrency !== "BRL")
      errors.push(`${rel}: Offer.priceCurrency="${offer.priceCurrency}" (esperado BRL)`);
    if (offer.price !== undefined) {
      if (!/^\d+(\.\d{1,2})?$/.test(String(offer.price)))
        errors.push(`${rel}: Offer.price="${offer.price}" não é numérico simples (use ponto decimal)`);
      else if (Number(offer.price) <= 0)
        errors.push(`${rel}: Offer.price deve ser > 0`);
      else if (!priceVariants(offer.price).some((v) => text.includes(v)))
        errors.push(`${rel}: Offer.price=${offer.price} não aparece no conteúdo visível`);
      if (!offer.priceCurrency) errors.push(`${rel}: Offer com price mas sem priceCurrency`);
    }
    if (!offer.url) errors.push(`${rel}: Offer sem url`);
    for (const spec of specs) {
      if (!typesOf(spec).some((t) => t.endsWith("PriceSpecification")))
        errors.push(`${rel}: priceSpecification com @type inválido (${typesOf(spec).join(",") || "ausente"})`);
      if (spec.priceCurrency !== "BRL")
        errors.push(`${rel}: PriceSpecification sem priceCurrency=BRL`);
      const value = spec.price ?? spec.minPrice;
      if (value === undefined) {
        errors.push(`${rel}: PriceSpecification sem price/minPrice`);
        continue;
      }
      if (!/^\d+(\.\d{1,2})?$/.test(String(value)))
        errors.push(`${rel}: PriceSpecification price="${value}" não numérico`);
      else if (!priceVariants(value).some((v) => text.includes(v)))
        errors.push(`${rel}: PriceSpecification ${value} não aparece no conteúdo visível`);
    }
  }
}

if (errors.length) {
  console.error(`BLOQUEADO — ${errors.length} problema(s) de markup de preço:`);
  errors.slice(0, 40).forEach((e) => console.error(`  • ${e}`));
  if (errors.length > 40) console.error(`  … +${errors.length - 40}`);
  process.exit(1);
}

console.log(`OK — ${offers} Offer(s) válidos em ${pages} página(s), com preços refletidos no conteúdo visível.`);
