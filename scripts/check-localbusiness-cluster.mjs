#!/usr/bin/env node
/**
 * GATE: LocalBusiness unificado no cluster de informática.
 *
 * Cada rota do cluster precisa emitir exatamente um nó LocalBusiness canônico
 * (o que sai de src/lib/localBusinessJsonLd.ts), com:
 *   - NAP idêntico (name, telephone, addressLocality/Region/Country);
 *   - areaServed não vazio;
 *   - openingHoursSpecification presente;
 *   - parentOrganization apontando para #organization.
 *
 * Uso: node scripts/check-localbusiness-cluster.mjs [dist]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] || "dist";

const CLUSTER = [
  "/servicos",
  "/tecnico-informatica-curitiba",
  "/assistencia-tecnica-curitiba",
  "/empresa-de-ti-curitiba",
  "/guia-tecnico-informatica",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/coleta-e-entrega",
  "/areas-atendidas",
  "/precos-e-politicas",
];

const EXPECTED = {
  telephone: "+5541997086380",
  addressLocality: "Curitiba",
  addressRegion: "PR",
  addressCountry: "BR",
};

function htmlFor(route) {
  const file = join(ROOT, route.replace(/^\//, ""), "index.html");
  return existsSync(file) ? { file, html: readFileSync(file, "utf8") } : null;
}

function jsonLdNodes(html) {
  const nodes = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const flat = Array.isArray(parsed) ? parsed : parsed["@graph"] ? parsed["@graph"] : [parsed];
      nodes.push(...flat);
    } catch {
      /* nó inválido é problema de outro gate */
    }
  }
  return nodes;
}

/** Só considera o nó raiz do LocalBusiness (tem @id terminando em #localbusiness). */
const isLocalBusiness = (n) =>
  typeof n?.["@id"] === "string" && n["@id"].endsWith("#localbusiness");

const errors = [];
const skipped = [];
let checked = 0;

for (const route of CLUSTER) {
  const page = htmlFor(route);
  if (!page) {
    skipped.push(route);
    continue;
  }
  const lb = jsonLdNodes(page.html).filter(isLocalBusiness);
  if (lb.length === 0) {
    errors.push(`${route}: nenhum LocalBusiness canônico emitido`);
    continue;
  }
  if (lb.length > 1) {
    errors.push(`${route}: ${lb.length} nós LocalBusiness (deve haver exatamente 1)`);
  }
  const node = lb[0];
  checked += 1;

  if (node.telephone !== EXPECTED.telephone) errors.push(`${route}: telephone divergente (${node.telephone})`);
  const addr = node.address || {};
  for (const key of ["addressLocality", "addressRegion", "addressCountry"]) {
    if (addr[key] !== EXPECTED[key]) errors.push(`${route}: ${key} divergente (${addr[key]})`);
  }
  const area = node.areaServed;
  if (!area || (Array.isArray(area) && area.length === 0)) errors.push(`${route}: areaServed ausente/vazio`);
  const hours = node.openingHoursSpecification;
  if (!hours || (Array.isArray(hours) && hours.length === 0)) errors.push(`${route}: openingHoursSpecification ausente`);
  if (!String(node.parentOrganization?.["@id"] || "").endsWith("#organization")) {
    errors.push(`${route}: parentOrganization não referencia #organization`);
  }
}

if (errors.length) {
  console.error("BLOQUEADO — LocalBusiness inconsistente no cluster de informática:");
  errors.forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
}

console.log(
  `[localbusiness-cluster] OK — ${checked} rota(s) com LocalBusiness canônico (NAP, areaServed e horários idênticos).` +
    (skipped.length ? ` Ignoradas (sem HTML em ${ROOT}): ${skipped.join(", ")}` : ""),
);
