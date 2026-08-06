#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// VALIDAÇÃO ESTÁTICA E DETERMINÍSTICA DE JSON-LD
//
// Percorre todos os `dist/**/index.html` gerados pelo build e valida os
// blocos <script type="application/ld+json"> sem depender de navegador
// (Chromium) nem de servidor. É reproduzível em qualquer runner Node.
//
// Regras:
//  1. Extrai os blocos JSON-LD via parser HTML real (jsdom), não regex frágil.
//  2. Rejeita bloco vazio.
//  3. JSON.parse em cada bloco; reporta arquivo + índice do bloco no erro.
//  4. Rejeita JSON truncado / vírgula inválida (falha de parse).
//  5. Aceita objeto único ou array; expande @graph.
//  6. @context, quando presente, deve ser https://schema.org.
//  7. @type deve existir em cada entidade de topo / item de @graph.
//  8. URLs absolutas do próprio site devem usar o domínio oficial.
//  9. Proíbe entidades/claims inventados: gpt-engineer, publisher divergente
//     "Técnico Curitiba", cargo "Técnico de Informática Sênior",
//     aggregateRating inventado.
// 10. Conteúdo editorial (/blog): proíbe Person fictício, jobTitle e
//     BlogPosting/Article tratados como aprovados (governança fail-closed).
//     Exceção: artigos da onda editorial aprovada (scripts/lib/editorial-wave.mjs)
//     podem declarar BlogPosting/Article/TechArticle — Person/jobTitle seguem proibidos.
// 11. Conta HTMLs, blocos e erros; encerra com código != 0 se houver erro.
//
// Uso:
//   node scripts/validate-jsonld-static.mjs            # valida dist/
//   node scripts/validate-jsonld-static.mjs <dir>      # valida outro dir
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

// Slugs aprovados na onda editorial: podem declarar BlogPosting/Article.
const APPROVED_EDITORIAL_SLUGS = new Set(EDITORIAL_WAVE.map((e) => e.slug));

const ROOT = process.argv[2] ?? "dist";
const OFFICIAL_HOST = "tecnico.curitiba.br";

// Tokens de string literalmente proibidos em qualquer valor JSON-LD.
const FORBIDDEN_STRINGS = [
  "gpt-engineer",
  "Técnico de Informática Sênior", // cargo fictício
];

// Valor de nome/marca divergente proibido (publisher/author/name === isto).
const FORBIDDEN_BRAND_EXACT = "Técnico Curitiba"; // oficial é "Técnico em Curitiba"

// @type proibidos em conteúdo editorial não aprovado (path /blog/).
const EDITORIAL_FORBIDDEN_TYPES = new Set([
  "Person",
  "BlogPosting",
  "Article",
  "NewsArticle",
  "TechArticle",
]);

const errors = [];
const push = (file, msg, blockIndex) =>
  errors.push(`${file}${blockIndex != null ? ` [bloco ${blockIndex}]` : ""}: ${msg}`);

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

// Normaliza @type (string ou array) para um array de strings.
function typesOf(node) {
  const t = node?.["@type"];
  if (!t) return [];
  return Array.isArray(t) ? t.map(String) : [String(t)];
}

// Expande a raiz JSON-LD em uma lista de entidades de topo.
function topLevelEntities(root) {
  const list = Array.isArray(root) ? root : [root];
  const out = [];
  for (const item of list) {
    if (item && typeof item === "object" && Array.isArray(item["@graph"])) {
      out.push(...item["@graph"].filter((x) => x && typeof x === "object"));
    } else if (item && typeof item === "object") {
      out.push(item);
    }
  }
  return out;
}

// Percorre recursivamente toda a árvore (objetos e strings) chamando visit.
function traverse(node, visit) {
  if (Array.isArray(node)) {
    for (const v of node) traverse(v, visit);
  } else if (node && typeof node === "object") {
    visit(node);
    for (const k of Object.keys(node)) traverse(node[k], visit);
  }
}

// Coleta todas as strings da árvore.
function collectStrings(node, acc = []) {
  if (typeof node === "string") acc.push(node);
  else if (Array.isArray(node)) node.forEach((v) => collectStrings(v, acc));
  else if (node && typeof node === "object")
    Object.values(node).forEach((v) => collectStrings(v, acc));
  return acc;
}

function isSiteUrl(u) {
  try {
    const url = new URL(u);
    const h = url.hostname.toLowerCase();
    // Hosts "parecidos com o site" que devem obrigatoriamente ser o oficial.
    return /tecnicocuritiba|tecnico\.curitiba/.test(h) || h.endsWith("tecnicocuritiba.com.br");
  } catch {
    return false;
  }
}

function validateEntity(entity, file, blockIndex, isEditorial) {
  // @context (quando presente) deve ser https://schema.org.
  if ("@context" in entity) {
    const ctx = entity["@context"];
    if (ctx !== "https://schema.org") {
      push(file, `@context inválido: ${JSON.stringify(ctx)} (esperado https://schema.org)`, blockIndex);
    }
  }
  // @type obrigatório na entidade de topo.
  if (typesOf(entity).length === 0) {
    push(file, "entidade sem @type", blockIndex);
  }

  // Verificações recursivas de tipo/estrutura.
  traverse(entity, (node) => {
    const types = typesOf(node);

    // aggregateRating inventado (nunca permitido — política do projeto).
    if (types.includes("AggregateRating") || "aggregateRating" in node) {
      push(file, "aggregateRating inventado é proibido", blockIndex);
    }

    if (isEditorial) {
      for (const t of types) {
        if (EDITORIAL_FORBIDDEN_TYPES.has(t)) {
          push(file, `tipo editorial proibido "${t}" (governança fail-closed)`, blockIndex);
        }
      }
      if ("jobTitle" in node) {
        push(file, "jobTitle fictício proibido em conteúdo editorial", blockIndex);
      }
    }

    // Marca divergente em campos de nome.
    for (const key of ["name", "publisher", "author"]) {
      const v = node[key];
      if (v === FORBIDDEN_BRAND_EXACT) {
        push(file, `${key} usa marca divergente "${FORBIDDEN_BRAND_EXACT}" (oficial: "Técnico em Curitiba")`, blockIndex);
      }
      if (v && typeof v === "object" && v.name === FORBIDDEN_BRAND_EXACT) {
        push(file, `${key}.name usa marca divergente "${FORBIDDEN_BRAND_EXACT}"`, blockIndex);
      }
    }
  });

  // Strings globais: tokens proibidos e URLs de site não-oficiais.
  for (const s of collectStrings(entity)) {
    for (const bad of FORBIDDEN_STRINGS) {
      if (s.includes(bad)) push(file, `string proibida "${bad}"`, blockIndex);
    }
    if (/^https?:\/\//i.test(s) && isSiteUrl(s)) {
      try {
        const host = new URL(s).hostname.toLowerCase();
        if (host !== OFFICIAL_HOST) {
          push(file, `URL de site com domínio não-oficial: ${s} (esperado ${OFFICIAL_HOST})`, blockIndex);
        }
      } catch {
        push(file, `URL malformada: ${s}`, blockIndex);
      }
    }
  }
}

async function main() {
  const files = await walk(ROOT);
  if (files.length === 0) {
    console.error(`✗ nenhum index.html encontrado em ${ROOT}/ — rode o build antes da validação`);
    process.exit(1);
  }

  let blockCount = 0;
  let htmlWithLd = 0;

  for (const file of files) {
    const html = await fs.readFile(file, "utf8");
    const dom = new JSDOM(html);
    const nodes = [...dom.window.document.querySelectorAll('script[type="application/ld+json"]')];
    if (nodes.length > 0) htmlWithLd++;

    const isEditorial = /(^|\/)blog(\/|$)/.test(file.replace(/\\/g, "/"));

    nodes.forEach((node, i) => {
      blockCount++;
      const raw = (node.textContent ?? "").trim();
      if (raw === "") {
        push(file, "bloco JSON-LD vazio", i);
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        push(file, `JSON inválido: ${err.message}`, i);
        return;
      }
      for (const entity of topLevelEntities(parsed)) {
        validateEntity(entity, file, i, isEditorial);
      }
    });
  }

  console.log("── validate:jsonld (estático) ──");
  console.log(`  HTMLs percorridos : ${files.length}`);
  console.log(`  HTMLs com JSON-LD : ${htmlWithLd}`);
  console.log(`  blocos JSON-LD    : ${blockCount}`);
  console.log(`  erros             : ${errors.length}`);

  if (errors.length) {
    console.error(`\n✗ validação JSON-LD FALHOU (${errors.length}):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log("\n✓ JSON-LD estático válido em todos os HTMLs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
