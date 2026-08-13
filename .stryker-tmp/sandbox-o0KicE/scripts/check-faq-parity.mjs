#!/usr/bin/env node
// @ts-nocheck
/**
 * GATE — Paridade 1:1 entre FAQPage (JSON-LD) e a FAQ visível.
 *
 * Cobre todas as páginas do dist/ que declaram FAQPage e exige:
 *   • cada pergunta do JSON-LD presente no conteúdo visível;
 *   • cada resposta (trecho inicial) presente no conteúdo visível;
 *   • nenhuma pergunta visível fora do JSON-LD (1:1 nos dois sentidos)
 *     nas famílias localizadas (serviço × cidade/bairro);
 *   • no máximo um nó FAQPage por página e perguntas sem duplicatas.
 *
 * Uso: node scripts/check-faq-parity.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { CATEGORIES, LOCAIS, localizedFaqs } from "./lib/category-local.mjs";

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

const norm = (s) =>
  String(s ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? Array.isArray(n["@graph"]) ? n["@graph"].flatMap(flatten) : [n]
      : [];

const typesOf = (n) => (Array.isArray(n?.["@type"]) ? n["@type"] : n?.["@type"] ? [n["@type"]] : []);

const visible = (html) =>
  norm(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );

// Mapa das FAQs esperadas por rota localizada (fonte única).
const expectedByRoute = new Map();
for (const cat of CATEGORIES) {
  for (const local of LOCAIS) {
    expectedByRoute.set(`/${cat.slug}/${local.slug}`, localizedFaqs(cat, local));
  }
}

const errors = [];
let pages = 0;
let questions = 0;

for (const file of files.sort()) {
  const rel = "/" + path.relative(DIST, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const route = rel.replace(/\/$/, "") || "/";
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .filter(Boolean);
  const faqNodes = blocks.flatMap(flatten).filter((n) => typesOf(n).includes("FAQPage"));
  if (!faqNodes.length) {
    if (expectedByRoute.has(route)) errors.push(`${route}: FAQPage ausente (esperado 5 perguntas localizadas)`);
    continue;
  }
  if (faqNodes.length > 1) errors.push(`${route}: ${faqNodes.length} nós FAQPage (esperado 1)`);
  pages++;

  const text = visible(html);
  const entries = [].concat(faqNodes[0].mainEntity ?? []);
  const seen = new Set();
  for (const q of entries) {
    questions++;
    const name = norm(q?.name);
    if (!name) { errors.push(`${route}: Question sem name`); continue; }
    if (seen.has(name)) errors.push(`${route}: pergunta duplicada "${q.name}"`);
    seen.add(name);
    if (!text.includes(name)) errors.push(`${route}: pergunta fora do conteúdo visível — "${q.name}"`);
    const answer = norm(q?.acceptedAnswer?.text).split(" ").slice(0, 12).join(" ");
    if (!answer) errors.push(`${route}: resposta ausente para "${q.name}"`);
    else if (!text.includes(answer)) errors.push(`${route}: resposta fora do conteúdo visível — "${q.name}"`);
  }

  // 1:1 estrito nas rotas localizadas.
  const expected = expectedByRoute.get(route);
  if (expected) {
    const expectedNorm = expected.map((f) => norm(f.q));
    if (entries.length !== expected.length)
      errors.push(`${route}: FAQPage com ${entries.length} perguntas (esperado ${expected.length})`);
    for (const e of expectedNorm) {
      if (!seen.has(e)) errors.push(`${route}: pergunta esperada ausente do JSON-LD — "${e}"`);
    }
    for (const s of seen) {
      if (!expectedNorm.includes(s)) errors.push(`${route}: pergunta extra no JSON-LD — "${s}"`);
    }
  }
}

if (errors.length) {
  console.error(`BLOQUEADO — ${errors.length} divergência(s) de FAQ 1:1:`);
  errors.slice(0, 40).forEach((e) => console.error(`  • ${e}`));
  if (errors.length > 40) console.error(`  … +${errors.length - 40}`);
  process.exit(1);
}

console.log(`OK — ${questions} perguntas em ${pages} FAQPage(s) com paridade 1:1 com o conteúdo visível.`);
