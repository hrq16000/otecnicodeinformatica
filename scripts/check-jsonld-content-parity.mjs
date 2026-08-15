#!/usr/bin/env node
/**
 * GATE — PARIDADE ENTRE CONTEÚDO VISÍVEL E JSON-LD
 *
 * Roda sobre o build (dist/) antes do deploy e bloqueia quando o markup
 * estruturado promete algo que o usuário não vê no HTML servido:
 *
 *   1. FAQPage  — toda pergunta (e o início da resposta) precisa aparecer no
 *                 corpo estático da página.
 *   2. Offer    — todo nome/preço de oferta precisa aparecer no corpo estático.
 *   3. LocalBusiness — no máximo UM nó por página, com nome e telefone iguais
 *                 aos do NAP oficial.
 *
 * Uso: node scripts/check-jsonld-content-parity.mjs [dist]
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { WHATSAPP_NUMBER } from "./lib/site-env.mjs";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
const OFFICIAL_PHONE = `+${WHATSAPP_NUMBER}`;

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) htmlFiles.push(full);
  }
})(DIST);

const norm = (s) =>
  (s ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const visibleText = (html) => {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return norm(body);
};

const flatten = (node) => {
  if (Array.isArray(node)) return node.flatMap(flatten);
  if (node && typeof node === "object") {
    if (Array.isArray(node["@graph"])) return node["@graph"].flatMap(flatten);
    return [node];
  }
  return [];
};

const typesOf = (n) => {
  const t = n?.["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
};

const errors = [];
const notes = [];
let pages = 0;
let faqChecked = 0;
let offerChecked = 0;

for (const file of htmlFiles.sort()) {
  const rel = "/" + path.relative(DIST, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const text = visibleText(html);
  pages += 1;

  const nodes = [
    ...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((m) => {
    try {
      return flatten(JSON.parse(m[1]));
    } catch {
      errors.push(`${rel}: bloco JSON-LD inválido (não parseia)`);
      return [];
    }
  });

  // 1. FAQPage × perguntas visíveis
  for (const faq of nodes.filter((n) => typesOf(n).includes("FAQPage"))) {
    const entities = Array.isArray(faq.mainEntity) ? faq.mainEntity : [];
    if (!entities.length) {
      errors.push(`${rel}: FAQPage sem mainEntity`);
      continue;
    }
    for (const q of entities) {
      faqChecked += 1;
      const question = norm(q.name);
      if (question && !text.includes(question)) {
        errors.push(`${rel}: pergunta do FAQPage não aparece no HTML visível — "${q.name}"`);
        continue;
      }
      const answer = norm(q.acceptedAnswer?.text).split(" ").slice(0, 8).join(" ");
      if (answer && !text.includes(answer)) {
        errors.push(`${rel}: resposta do FAQPage não aparece no HTML visível — "${q.name}"`);
      }
    }
  }

  // 2. Offer × preço visível
  const offers = nodes.flatMap((n) => {
    const o = n.offers;
    return Array.isArray(o) ? o : o && typeof o === "object" ? [o] : [];
  });
  for (const offer of [...offers, ...nodes.filter((n) => typesOf(n).some((t) => /Offer/.test(t)))]) {
    offerChecked += 1;
    const name = norm(offer.name ?? offer.itemOffered?.name);
    if (name && !text.includes(name)) {
      errors.push(`${rel}: Offer "${offer.name}" não aparece no HTML visível`);
    }
    if (offer.price) {
      const [int, dec = ""] = String(offer.price).split(".");
      const brl = norm(`R$ ${int},${dec.padEnd(2, "0")}`);
      if (!text.includes(brl)) {
        errors.push(`${rel}: preço ${offer.price} do Offer não aparece no HTML visível`);
      }
    }
  }

  // 3. LocalBusiness único e consistente com o NAP
  const locals = nodes.filter((n) =>
    typesOf(n).some((t) => /LocalBusiness|ComputerRepairService|ProfessionalService/.test(t)),
  );
  const uniqueLocals = new Set(locals.map((n) => n["@id"] ?? JSON.stringify(n).slice(0, 80)));
  if (uniqueLocals.size > 1) {
    errors.push(`${rel}: ${uniqueLocals.size} nós LocalBusiness na mesma página (esperado 1)`);
  }
  for (const lb of locals) {
    if (lb.telephone && lb.telephone.replace(/\D/g, "") !== OFFICIAL_PHONE.replace(/\D/g, "")) {
      errors.push(`${rel}: LocalBusiness com telefone fora do NAP oficial (${lb.telephone})`);
    }
    if (!lb.name) errors.push(`${rel}: LocalBusiness sem name`);
  }
  if (locals.length) notes.push(`${rel}: LocalBusiness OK`);
}

console.log(
  `Paridade JSON-LD × conteúdo: ${pages} páginas · ${faqChecked} pergunta(s) FAQ · ${offerChecked} oferta(s) · ${notes.length} LocalBusiness.`,
);

if (errors.length) {
  console.error(`\n✖ BLOQUEADO: ${errors.length} divergência(s) entre JSON-LD e conteúdo visível:`);
  for (const e of errors.slice(0, 60)) console.error(`  - ${e}`);
  if (errors.length > 60) console.error(`  … e mais ${errors.length - 60}.`);
  process.exit(1);
}
console.log("✔ JSON-LD em paridade com o conteúdo visível (FAQPage, Offer e LocalBusiness).");
