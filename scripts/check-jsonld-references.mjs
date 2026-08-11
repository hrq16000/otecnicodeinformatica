#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE — INTEGRIDADE REFERENCIAL DO JSON-LD (Rodada 3.2)
//
// Escopo: rotas curadas (indexáveis) dentro de dist/.
//
// Regras:
//  1. Todo `@id` do domínio oficial referenciado (publisher, provider,
//     seller, parentOrganization, about, isPartOf, worksFor, mainEntity…)
//     precisa estar DEFINIDO no mesmo documento — sem referência quebrada.
//  2. Nenhum `@id` pode ser definido por duas entidades no mesmo documento.
//  3. Existe exatamente UMA entidade institucional `#organization`.
//  4. A Organization da marca não pode ser repetida como objeto completo
//     dentro de outro schema: quando o nome for o da marca, deve ser
//     apenas `{ "@id": "…/#organization" }`.
//
// Uso: node scripts/check-jsonld-references.mjs [dist]
// ─────────────────────────────────────────────────────────────
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";

import { BASE_URL } from "./lib/site-env.mjs";

// Fail-closed: sem VITE_SITE_DOMAIN, URLs relativas (nunca o domínio herdado).
const SITE = BASE_URL;
const ORG_ID = `${SITE}/#organization`;
const BRAND_NAMES = new Set([
  "O Técnico de Informática",
  "O Técnico de Informática",
  "O Técnico de Informática — Assistência Técnica em Informática",
]);
const REF_KEYS = new Set([
  "publisher",
  "provider",
  "seller",
  "parentOrganization",
  "about",
  "isPartOf",
  "worksFor",
  "mainEntity",
  "mainEntityOfPage",
  "author",
  "brand",
]);

const dist = process.argv[2] ?? "dist";
const failures = [];
const fail = (route, msg) => failures.push(`${route} → ${msg}`);

function blocksOf(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1].trim())
    .filter(Boolean);
}

/** Percorre a árvore coletando ids definidos, referências e objetos inline. */
function walk(node, ctx, parentKey = "", depth = 0) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, ctx, parentKey, depth);
    return;
  }
  if (!node || typeof node !== "object") return;

  const keys = Object.keys(node);
  const id = typeof node["@id"] === "string" ? node["@id"] : "";
  const isPureRef = id && keys.every((k) => k === "@id" || k === "@type");

  if (isPureRef) {
    if (id.startsWith(SITE)) ctx.refs.push({ id, parentKey });
  } else if (id) {
    ctx.defined.set(id, (ctx.defined.get(id) ?? 0) + 1);
  }

  const types = node["@type"]
    ? Array.isArray(node["@type"])
      ? node["@type"]
      : [String(node["@type"])]
    : [];
  if (types.includes("Organization")) {
    if (depth > 0 && BRAND_NAMES.has(String(node.name ?? "")) && !isPureRef) {
      ctx.inlineOrg.push(parentKey || "(aninhado)");
    }
    if (depth === 0 || (!isPureRef && id === ORG_ID)) ctx.orgNodes.push(id || "(sem @id)");
  }

  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("@")) continue;
    walk(v, ctx, REF_KEYS.has(k) ? k : parentKey, depth + 1);
  }
}

for (const route of CURATED_ROUTES) {
  const file =
    route.path === "/"
      ? join(dist, "index.html")
      : join(dist, ...route.path.split("/").filter(Boolean), "index.html");
  if (!existsSync(file)) {
    fail(route.path, `HTML não gerado (${file})`);
    continue;
  }

  const ctx = { defined: new Map(), refs: [], inlineOrg: [], orgNodes: [] };
  for (const block of blocksOf(readFileSync(file, "utf8"))) {
    let parsed;
    try {
      parsed = JSON.parse(block);
    } catch (e) {
      fail(route.path, `JSON-LD inválido: ${e.message}`);
      continue;
    }
    walk(parsed, ctx);
  }

  for (const [id, n] of ctx.defined) {
    if (n > 1) fail(route.path, `@id definido ${n}x: ${id}`);
  }
  for (const { id, parentKey } of ctx.refs) {
    if (!ctx.defined.has(id)) {
      fail(route.path, `referência quebrada em "${parentKey || "@id"}": ${id} não é definido no documento`);
    }
  }
  const orgDefined = ctx.defined.get(ORG_ID) ?? 0;
  if (orgDefined !== 1) fail(route.path, `esperado exatamente 1 nó ${ORG_ID}, encontrou ${orgDefined}`);
  for (const where of ctx.inlineOrg) {
    fail(route.path, `Organization da marca repetida como objeto completo em "${where}" — use { "@id": "${ORG_ID}" }`);
  }
}

if (failures.length) {
  console.error(`\n❌ [jsonld-refs] ${failures.length} falha(s) em ${CURATED_ROUTES.length} rotas curadas:`);
  for (const f of failures) console.error(`   • ${f}`);
  console.error("");
  process.exit(1);
}
console.log(
  `✅ [jsonld-refs] ${CURATED_ROUTES.length} rotas curadas OK — Organization única, referências @id resolvidas e sem objeto institucional duplicado.`,
);
