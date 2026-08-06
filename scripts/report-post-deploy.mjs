#!/usr/bin/env node
/**
 * RELATÓRIO PÓS-DEPLOY — RICH RESULTS E CONSISTÊNCIA NAP/ORGANIZATION
 *
 * Valida no HTML estático das P0 + /precos-e-politicas:
 *   - FAQPage: presente, com mainEntity não vazio e respostas com texto
 *   - Service: presente, com provider apontando para a Organization oficial
 *   - Organization/LocalBusiness: @id único, name, url, telephone e areaServed
 *     idênticos em todas as páginas (NAP consistente)
 *   - ausência de rating/review inventados
 *
 * Uso: node scripts/report-post-deploy.mjs [dist]
 * Saída: reports/post-deploy-rich-results.md (+ exit 1 em inconsistência)
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { P0_PATHS, PRECOS_PATH, BASE_URL } from "./lib/priority-urls.mjs";

const DIST = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "dist";
const ORG_ID = `${BASE_URL}/#organization`;
const ROUTES = [...P0_PATHS, PRECOS_PATH];
const errors = [];
const rows = [];

if (!existsSync(DIST)) {
  console.error(`✖ ${DIST}/ ausente — rode "npm run build" antes do relatório.`);
  process.exit(1);
}

const flatten = (node, acc = []) => {
  if (Array.isArray(node)) node.forEach((n) => flatten(n, acc));
  else if (node && typeof node === "object") {
    acc.push(node);
    if (Array.isArray(node["@graph"])) node["@graph"].forEach((n) => flatten(n, acc));
    for (const v of Object.values(node)) if (v && typeof v === "object") flatten(v, acc);
  }
  return acc;
};

const napSignatures = new Map();

for (const path of ROUTES) {
  const file = join(DIST, path === "/" ? "" : path.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) {
    errors.push(`${path}: HTML estático ausente em ${DIST}`);
    rows.push({ path, faq: "—", service: "—", nap: "ausente" });
    continue;
  }
  const html = readFileSync(file, "utf8");
  const nodes = [];
  for (const m of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      flatten(JSON.parse(m[1].trim()), nodes);
    } catch (e) {
      errors.push(`${path}: JSON-LD inválido (${e.message})`);
    }
  }
  const typed = (t) => nodes.filter((n) => [].concat(n["@type"] ?? []).includes(t));

  // FAQPage
  const faqs = typed("FAQPage");
  const faqQuestions = faqs.flatMap((f) => [].concat(f.mainEntity ?? []));
  if (!faqs.length) errors.push(`${path}: FAQPage ausente`);
  else if (!faqQuestions.length) errors.push(`${path}: FAQPage sem mainEntity`);
  else {
    const empty = faqQuestions.filter(
      (q) => !q?.name || !(q?.acceptedAnswer?.text || "").toString().trim(),
    );
    if (empty.length) errors.push(`${path}: ${empty.length} pergunta(s) de FAQ sem resposta`);
  }

  // Service
  const services = typed("Service");
  if (!services.length) errors.push(`${path}: Service ausente`);
  for (const s of services) {
    const provider = s.provider?.["@id"] ?? s.provider?.url ?? null;
    if (provider && provider !== ORG_ID)
      errors.push(`${path}: Service.provider "${provider}" ≠ ${ORG_ID}`);
  }

  // Organization / LocalBusiness (NAP)
  const orgs = nodes.filter((n) =>
    [].concat(n["@type"] ?? []).some((t) => ["Organization", "LocalBusiness"].includes(t)),
  );
  const org = orgs.find((o) => o["@id"] === ORG_ID) ?? orgs[0] ?? null;
  if (!org) errors.push(`${path}: Organization/LocalBusiness ausente`);
  else {
    if (org["@id"] !== ORG_ID) errors.push(`${path}: Organization @id "${org["@id"]}" ≠ ${ORG_ID}`);
    const signature = JSON.stringify({
      name: org.name ?? null,
      url: org.url ?? null,
      telephone: org.telephone ?? null,
      areaServed: org.areaServed ?? null,
      address: org.address ?? null,
    });
    napSignatures.set(path, signature);
  }

  // Ratings inventados
  if (nodes.some((n) => n.aggregateRating || n.review || n.reviews))
    errors.push(`${path}: contém aggregateRating/review — proibido sem prova verificável`);

  rows.push({
    path,
    faq: faqs.length ? `${faqQuestions.length} perguntas` : "ausente",
    service: services.length ? `${services.length}` : "ausente",
    nap: org ? "ok" : "ausente",
  });
}

const uniqueNap = new Set(napSignatures.values());
if (uniqueNap.size > 1) {
  errors.push(
    `NAP divergente entre páginas: ${[...napSignatures.entries()]
      .map(([p, s]) => `${p}=${s.slice(0, 120)}`)
      .join(" | ")}`,
  );
}

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/post-deploy-rich-results.md",
  [
    `# Pós-deploy — rich results e NAP`,
    ``,
    `Gerado em ${new Date().toISOString()} sobre \`${DIST}/\`.`,
    ``,
    `| URL | FAQPage | Service | Organization |`,
    `| --- | --- | --- | --- |`,
    ...rows.map((r) => `| ${r.path} | ${r.faq} | ${r.service} | ${r.nap} |`),
    ``,
    `NAP consistente entre páginas: **${uniqueNap.size <= 1 ? "sim" : "não"}**`,
    ``,
    errors.length ? `## Falhas\n\n${errors.map((e) => `- ${e}`).join("\n")}` : `Sem falhas.`,
  ].join("\n"),
);

console.log("── Relatório pós-deploy (rich results + NAP) ──");
for (const r of rows) console.log(`  ${r.path}: FAQ ${r.faq} · Service ${r.service} · Org ${r.nap}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} problema(s):\n${errors.map((e) => `  · ${e}`).join("\n")}`);
  process.exit(1);
}
console.log("\n✔ FAQPage, Service e NAP/Organization consistentes nas P0 e em /precos-e-politicas.");
