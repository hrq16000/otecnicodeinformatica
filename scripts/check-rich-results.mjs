#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE DE RICH RESULTS — LocalBusiness / Service / FAQPage
//
// Valida os requisitos que o Google exige para elegibilidade a rich results
// nos três tipos que sustentam o SEO local do projeto. Percorre os HTMLs
// gerados em `dist/` (mesma base do validate:jsonld) e falha o build quando
// há ERRO. Avisos que impedem rich results (campos "recomendados" que o
// Rich Results Test reporta) também falham quando `--strict` é usado — o CI
// roda em modo estrito.
//
// Uso:
//   node scripts/check-rich-results.mjs [dir] [--strict]
// ─────────────────────────────────────────────────────────────
import { promises as fs } from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const ROOT = args.find((a) => !a.startsWith("--")) ?? "dist";

const errors = [];
const warnings = [];
const seen = { LocalBusiness: 0, Service: 0, FAQPage: 0 };

const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

const typesOf = (node) => {
  const t = node?.["@type"];
  if (!t) return [];
  return Array.isArray(t) ? t.map(String) : [String(t)];
};

const isLocalBusiness = (types) =>
  types.some((t) => t === "LocalBusiness" || /^(ComputerStore|ProfessionalService|HomeAndConstructionBusiness|Store|LocalBusiness)$/.test(t));

function flatten(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    node.forEach((n) => flatten(n, acc));
    return acc;
  }
  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((n) => flatten(n, acc));
  }
  if (node["@type"]) acc.push(node);
  return acc;
}

const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

function checkLocalBusiness(file, node) {
  seen.LocalBusiness += 1;
  if (!nonEmpty(node.name)) err(file, "LocalBusiness sem `name`");
  const addr = node.address;
  if (!addr || typeof addr !== "object") {
    err(file, "LocalBusiness sem `address` (PostalAddress)");
  } else {
    for (const f of ["addressLocality", "addressRegion", "addressCountry"]) {
      if (!nonEmpty(addr[f])) err(file, `LocalBusiness.address sem \`${f}\``);
    }
  }
  if (!nonEmpty(node.telephone)) warn(file, "LocalBusiness sem `telephone` (recomendado para rich result local)");
  if (!nonEmpty(node.url)) warn(file, "LocalBusiness sem `url`");
  if (!node.areaServed) warn(file, "LocalBusiness sem `areaServed`");
  if (node.aggregateRating) err(file, "LocalBusiness com `aggregateRating` (proibido: sem base real de avaliações)");
}

function checkService(file, node) {
  seen.Service += 1;
  if (!nonEmpty(node.name)) err(file, "Service sem `name`");
  if (!node.provider) err(file, "Service sem `provider`");
  if (!node.areaServed) warn(file, "Service sem `areaServed`");
  if (!nonEmpty(node.description)) warn(file, "Service sem `description`");
  const offers = Array.isArray(node.offers) ? node.offers : node.offers ? [node.offers] : [];
  for (const o of offers) {
    if (!nonEmpty(String(o.price ?? "")) && !o.priceSpecification) {
      err(file, "Service.offers sem `price` nem `priceSpecification`");
    }
    if (!nonEmpty(o.priceCurrency) && !o.priceSpecification?.priceCurrency) {
      err(file, "Service.offers sem `priceCurrency`");
    }
  }
}

function checkFaq(file, node) {
  seen.FAQPage += 1;
  const list = Array.isArray(node.mainEntity) ? node.mainEntity : [];
  if (list.length < 2) {
    err(file, `FAQPage com ${list.length} pergunta(s) — mínimo de 2 para rich result`);
  }
  const perguntas = new Set();
  list.forEach((q, i) => {
    if (!typesOf(q).includes("Question")) err(file, `FAQPage.mainEntity[${i}] não é Question`);
    if (!nonEmpty(q.name)) err(file, `FAQPage.mainEntity[${i}] sem \`name\``);
    const ans = q.acceptedAnswer;
    if (!ans || !typesOf(ans).includes("Answer")) {
      err(file, `FAQPage.mainEntity[${i}] sem \`acceptedAnswer\` do tipo Answer`);
    } else if (!nonEmpty(ans.text)) {
      err(file, `FAQPage.mainEntity[${i}].acceptedAnswer sem \`text\``);
    } else if (ans.text.trim().length < 20) {
      warn(file, `FAQPage.mainEntity[${i}] com resposta muito curta (<20 caracteres)`);
    }
    const key = String(q.name || "").trim().toLowerCase();
    if (key && perguntas.has(key)) err(file, `FAQPage com pergunta duplicada: "${q.name}"`);
    perguntas.add(key);
  });
}

const files = await walk(ROOT);
if (files.length === 0) {
  console.error(`check-rich-results: nenhum index.html em "${ROOT}" — rode o build antes.`);
  process.exit(1);
}

for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const dom = new JSDOM(html);
  const blocks = [...dom.window.document.querySelectorAll('script[type="application/ld+json"]')];
  for (const [i, block] of blocks.entries()) {
    const raw = block.textContent?.trim();
    if (!raw) {
      err(file, `bloco JSON-LD ${i} vazio`);
      continue;
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      err(file, `bloco JSON-LD ${i} inválido: ${e.message}`);
      continue;
    }
    for (const node of flatten(parsed)) {
      const types = typesOf(node);
      if (isLocalBusiness(types)) checkLocalBusiness(file, node);
      if (types.includes("Service")) checkService(file, node);
      if (types.includes("FAQPage")) checkFaq(file, node);
    }
  }
}

console.log(
  `check-rich-results: ${files.length} HTML | LocalBusiness=${seen.LocalBusiness} Service=${seen.Service} FAQPage=${seen.FAQPage}`,
);
for (const w of warnings) console.warn(`AVISO  ${w}`);
for (const e of errors) console.error(`ERRO   ${e}`);

const failing = errors.length > 0 || (STRICT && warnings.length > 0);
if (failing) {
  console.error(
    `check-rich-results: FALHOU — ${errors.length} erro(s), ${warnings.length} aviso(s)${STRICT ? " (modo estrito)" : ""}.`,
  );
  process.exit(1);
}
console.log("check-rich-results: OK");
