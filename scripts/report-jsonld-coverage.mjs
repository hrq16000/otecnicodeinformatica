#!/usr/bin/env node
// Relatório consolidado de JSON-LD (LocalBusiness + BreadcrumbList), canonical,
// robots e social tags (og:image / twitter:*) por rota do dist/.
//
// Uso:
//   node scripts/report-jsonld-coverage.mjs [dir]        # relatório
//   node scripts/report-jsonld-coverage.mjs [dir] --strict  # falha em regressão
//
// Saída: reports/jsonld-coverage.md e reports/jsonld-coverage.json
import { promises as fs } from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";

const ROOT = process.argv[2]?.startsWith("--") ? "dist" : (process.argv[2] ?? "dist");
const STRICT = process.argv.includes("--strict");
const OFFICIAL = BASE_URL;

// Rotas obrigatórias: home, atendimento e as 7 rotas de keyword.
const REQUIRED_LOCALBUSINESS = ["/", "/atendimento-remoto", "/atendimento-domicilio"];
// Aliases de keyword → destino canônico (Navigate replace no router).
const KEYWORD_ROUTES = {
  "/formatacao-de-computador-curitiba": "/servicos/formatacao",
  "/remocao-de-virus-curitiba": "/servicos/remocao-de-virus",
  "/upgrade-ssd-curitiba": "/servicos/upgrade-ssd-ram",
  "/upgrade-memoria-ram-curitiba": "/servicos/upgrade-ssd-ram",
  "/conserto-de-notebook-curitiba": "/servicos/manutencao-de-notebook",
  "/suporte-tecnico-remoto": "/atendimento-remoto",
  "/assistencia-tecnica-empresas-curitiba": "/servicos/suporte-tecnico-empresarial",
};
const ROUTER_SRC = "src/LegacyApp.tsx";

async function walk(dir) {
  const out = [];
  let entries = [];
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

const routeOf = (file) => {
  const rel = path.relative(ROOT, file).replace(/index\.html$/, "").replace(/\/$/, "");
  return "/" + rel;
};

function flatten(node, acc = []) {
  if (Array.isArray(node)) node.forEach((n) => flatten(n, acc));
  else if (node && typeof node === "object") {
    if (Array.isArray(node["@graph"])) flatten(node["@graph"], acc);
    else acc.push(node);
  }
  return acc;
}

const typesOf = (e) => (Array.isArray(e["@type"]) ? e["@type"] : [e["@type"]]).filter(Boolean);

async function analyze(file) {
  const html = await fs.readFile(file, "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const entities = [];
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      flatten(JSON.parse(s.textContent || "null"), entities);
    } catch {
      entities.push({ __parseError: true });
    }
  }
  // Dedupe por @id: uma entidade com @type array (LocalBusiness +
  // ProfessionalService) é UMA entidade, não duas.
  const uniq = [];
  const seen = new Set();
  for (const e of entities) {
    const key = e["@id"] ?? JSON.stringify(e).slice(0, 200);
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(e);
  }
  const byType = (t) => uniq.filter((e) => typesOf(e).includes(t));
  const lb = byType("LocalBusiness")[0] ?? byType("ProfessionalService")[0] ?? null;
  const bc = byType("BreadcrumbList")[0] ?? null;

  const meta = (sel, attr = "content") =>
    [...doc.querySelectorAll(sel)].map((n) => n.getAttribute(attr));

  return {
    route: routeOf(file),
    file,
    parseErrors: entities.filter((e) => e.__parseError).length,
    localBusiness: lb && {
      name: lb.name ?? null,
      telephone: lb.telephone ?? null,
      address: lb.address?.addressLocality ?? lb.address?.streetAddress ?? null,
      areaServed: Array.isArray(lb.areaServed)
        ? lb.areaServed.length
        : lb.areaServed
          ? 1
          : 0,
      openingHours: lb.openingHours ?? lb.openingHoursSpecification ? true : false,
      url: lb.url ?? null,
      id: lb["@id"] ?? null,
    },
      localBusinessCount: new Set(
      [...byType("LocalBusiness"), ...byType("ProfessionalService")].map(
        (e) => e["@id"] ?? "anon",
      ),
    ).size,
    breadcrumb: bc && { items: (bc.itemListElement ?? []).length },
    breadcrumbCount: byType("BreadcrumbList").length,
    organizationCount: byType("Organization").length,
    canonical: meta('link[rel="canonical"]', "href"),
    robots: meta('meta[name="robots"]'),
    ogImage: meta('meta[property="og:image"]'),
    twitterCard: meta('meta[name="twitter:card"]'),
    twitterTitle: meta('meta[name="twitter:title"]'),
    twitterDescription: meta('meta[name="twitter:description"]'),
    twitterImage: meta('meta[name="twitter:image"]'),
  };
}

const files = await walk(ROOT);
if (!files.length) {
  console.error(`Nenhum index.html encontrado em ${ROOT}. Rode "npm run build" antes.`);
  process.exit(1);
}

const pages = [];
for (const f of files) pages.push(await analyze(f));
pages.sort((a, b) => a.route.localeCompare(b.route));
const find = (r) => pages.find((p) => p.route === r || p.route === r + "/");

const problems = [];
for (const p of pages) {
  if (p.parseErrors) problems.push(`${p.route}: ${p.parseErrors} bloco(s) JSON-LD inválido(s)`);
  if (p.localBusinessCount > 1) problems.push(`${p.route}: LocalBusiness duplicado (${p.localBusinessCount})`);
  if (p.breadcrumbCount > 1) problems.push(`${p.route}: BreadcrumbList duplicado (${p.breadcrumbCount})`);
  if (p.canonical.length > 1) problems.push(`${p.route}: ${p.canonical.length} canonical no head`);
  if (p.canonical[0] && !p.canonical[0].startsWith(OFFICIAL) && !p.canonical[0].startsWith("/"))
    problems.push(`${p.route}: canonical fora do domínio oficial (${p.canonical[0]})`);
  if (p.twitterCard.length > 1) problems.push(`${p.route}: twitter:card duplicado (${p.twitterCard.length})`);
  if (p.ogImage.length > 1) problems.push(`${p.route}: og:image duplicado (${p.ogImage.length})`);
  if (!p.ogImage.length) problems.push(`${p.route}: og:image ausente`);
  if (!p.twitterCard.length) problems.push(`${p.route}: twitter:card ausente`);
}
for (const r of REQUIRED_LOCALBUSINESS) {
  const p = find(r);
  if (!p) problems.push(`rota obrigatória ausente no dist: ${r}`);
  else if (!p.localBusiness) problems.push(`${r}: LocalBusiness ausente`);
  else {
    if (!p.localBusiness.telephone) problems.push(`${r}: LocalBusiness sem telephone (NAP)`);
    if (!p.localBusiness.address) problems.push(`${r}: LocalBusiness sem endereço/localidade`);
    if (!p.localBusiness.areaServed) problems.push(`${r}: LocalBusiness sem areaServed`);
    if (!p.localBusiness.openingHours) problems.push(`${r}: LocalBusiness sem horários`);
  }
}
// Aliases de keyword: não têm HTML estático próprio (são Navigate replace no
// router). Exigimos que o alias esteja declarado e que o destino canônico
// exista no dist com canonical apontando para si mesmo.
const routerSrc = await fs.readFile(ROUTER_SRC, "utf8").catch(() => "");
const keywordRows = [];
for (const [alias, target] of Object.entries(KEYWORD_ROUTES)) {
  const declared = routerSrc.includes(`path="${alias}"`) && routerSrc.includes(`to="${target}"`);
  const dest = find(target);
  if (!declared) problems.push(`alias de keyword não declarado em ${ROUTER_SRC}: ${alias} → ${target}`);
  if (!dest) problems.push(`destino canônico do alias ${alias} ausente no dist: ${target}`);
  else if (!dest.canonical.length) problems.push(`${target}: canonical ausente (destino de ${alias})`);
  else if (dest.canonical.some((c) => c.includes(alias)))
    problems.push(`${target}: canonical aponta para o alias ${alias} (canibalização)`);
  keywordRows.push({
    alias,
    target,
    declared,
    canonical: dest?.canonical ?? [],
    robots: dest?.robots ?? [],
  });
}


const yesno = (v) => (v ? "sim" : "não");
const lines = [
  "# Relatório consolidado — JSON-LD, canonical e social tags",
  "",
  `Gerado em ${new Date().toISOString()} a partir de \`${ROOT}\` (${pages.length} páginas).`,
  "",
  "## LocalBusiness (NAP, área atendida, horários)",
  "",
  "| Rota | LocalBusiness | telephone | localidade | areaServed | horários | @id |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...pages
    .filter((p) => p.localBusiness)
    .map(
      (p) =>
        `| \`${p.route}\` | ${p.localBusinessCount} | ${p.localBusiness.telephone ?? "—"} | ${p.localBusiness.address ?? "—"} | ${p.localBusiness.areaServed} | ${yesno(p.localBusiness.openingHours)} | ${p.localBusiness.id ?? "—"} |`,
    ),
  "",
  "## BreadcrumbList",
  "",
  "| Rota | Blocos | Itens |",
  "| --- | --- | --- |",
  ...pages
    .filter((p) => p.breadcrumb)
    .map((p) => `| \`${p.route}\` | ${p.breadcrumbCount} | ${p.breadcrumb.items} |`),
  "",
  "## Rotas de keyword — alias, destino canônico e robots",
  "",
  "| Alias | Declarado no router | Destino canônico | canonical do destino | robots |",
  "| --- | --- | --- | --- | --- |",
  ...keywordRows.map(
    (k) =>
      `| \`${k.alias}\` | ${yesno(k.declared)} | \`${k.target}\` | ${k.canonical.join(", ") || "—"} | ${k.robots.join(", ") || "—"} |`,
  ),
  "",
  "## og:image e Twitter Card",
  "",
  "| Rota | og:image | twitter:card | twitter:title | twitter:image |",
  "| --- | --- | --- | --- | --- |",
  ...pages.map(
    (p) =>
      `| \`${p.route}\` | ${p.ogImage.length} | ${p.twitterCard.length} | ${p.twitterTitle.length} | ${p.twitterImage.length} |`,
  ),
  "",
  "## Pendências",
  "",
  problems.length ? problems.map((p) => `- ${p}`).join("\n") : "Nenhuma pendência detectada.",
  "",
];

await fs.mkdir("reports", { recursive: true });
await fs.writeFile("reports/jsonld-coverage.md", lines.join("\n"));
await fs.writeFile("reports/jsonld-coverage.json", JSON.stringify({ pages, problems }, null, 2) + "\n");

console.log(`JSON-LD coverage: ${pages.length} páginas · ${problems.length} pendências`);
for (const p of problems.slice(0, 40)) console.log(`  - ${p}`);
console.log("relatórios: reports/jsonld-coverage.md e reports/jsonld-coverage.json");
if (STRICT && problems.length) process.exit(1);
