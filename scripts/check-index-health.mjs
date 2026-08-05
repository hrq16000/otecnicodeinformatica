#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE DE CI — SAÚDE DE INDEXAÇÃO
//
// Para CADA rota do sitemap curado + cada alias da matriz de redirects,
// valida contra o servidor rodando (dev ou preview):
//   1. status HTTP 200 (alias: 200 do SPA + canonical apontando ao destino)
//   2. content-type text/html
//   3. exatamente 1 <link rel="canonical"> e self-referente
//   4. meta robots sem "noindex" em rota do sitemap
//   5. JSON-LD presente e parseável, com os @type esperados
//   6. consistência com robots.txt (nenhuma URL do sitemap bloqueada)
//   7. nenhum alias/redirect dentro do sitemap (evita duplicidade)
//
// Uso: node scripts/check-index-health.mjs [--base http://localhost:8080]
// ─────────────────────────────────────────────────────────────
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argBase = process.argv.find((a) => a.startsWith("--base="));
// --strict: exige canonical/JSON-LD já corretos no HTML servido (usar contra o
// build com prerender curado). Sem a flag (dev server), essas checagens viram
// avisos, porque o Vite serve o index.html cru antes da hidratação.
const STRICT = process.argv.includes("--strict");
const BASE = (argBase ? argBase.split("=")[1] : process.env.CHECK_BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const CANONICAL_HOST = "https://tecnico.curitiba.br";

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ── 1. Rotas declaradas no sitemap curado ───────────────────────────
const sitemapFiles = readdirSync(resolve(root, "public")).filter(
  (f) => /^sitemap.*\.xml$/.test(f) && f !== "sitemap-index.xml" && f !== "sitemap.xml",
);
const sitemapPaths = new Set();
for (const f of sitemapFiles) {
  const xml = readFileSync(resolve(root, "public", f), "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = m[1].trim();
    if (!loc.startsWith(CANONICAL_HOST)) {
      fail(`${f}: <loc> fora do domínio canônico → ${loc}`);
      continue;
    }
    sitemapPaths.add(loc.slice(CANONICAL_HOST.length) || "/");
  }
}
if (sitemapPaths.size === 0) fail("sitemap curado vazio — nenhuma URL para validar");

// ── 2. Matriz de redirects (aliases) ────────────────────────────────
const matrixSrc = readFileSync(resolve(root, "src/lib/redirectMatrix.ts"), "utf8");
const rules = [...matrixSrc.matchAll(/from:\s*"([^"]+)",\s*to:\s*"([^"]+)"/g)].map((m) => ({
  from: m[1],
  to: m[2],
}));
if (rules.length === 0) fail("redirectMatrix.ts: nenhuma regra encontrada");

// Alias jamais pode estar no sitemap (duplicidade garantida).
for (const r of rules) {
  if (sitemapPaths.has(r.from)) fail(`alias ${r.from} está no sitemap — remova (destino: ${r.to})`);
}

// ── 3. robots.txt não pode bloquear URL do sitemap ──────────────────
const robots = readFileSync(resolve(root, "public/robots.txt"), "utf8");
const wildcardBlock = robots.split(/User-agent:\s*\*/i)[1] ?? "";
const disallows = [...wildcardBlock.matchAll(/^\s*Disallow:\s*(\S+)\s*$/gim)].map((m) => m[1]);
if (disallows.includes("/")) fail("robots.txt: `Disallow: /` bloqueia o site inteiro");
for (const p of sitemapPaths) {
  const hit = disallows.find((d) => d !== "/" && p.startsWith(d));
  if (hit) fail(`robots.txt bloqueia rota do sitemap: ${p} (regra "Disallow: ${hit}")`);
}
if (!/^Sitemap:\s*https?:\/\//im.test(robots)) fail("robots.txt sem diretiva Sitemap");

// ── 4. Validação HTTP rota a rota ───────────────────────────────────
// Tipos exigidos já no HTML estático (prerender curado). FAQPage e demais
// blocos montados na hidratação são cobertos pelos testes E2E.
const EXPECTED_JSONLD = {
  "/": ["Organization", "LocalBusiness", "WebSite"],
  "/precos-e-politicas": ["Organization", "WebPage", "BreadcrumbList"],
};

const head = (html, re) => (html.match(re) ?? [])[1];

async function checkRoute(path, { alias = null } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, { redirect: "follow" });
    // `vite preview` só resolve o index.html pré-renderizado de um diretório
    // quando a URL tem barra final; sem ela cai no fallback SPA. Hospedagens
    // reais (Lovable/Cloudflare) resolvem a URL limpa, então tentamos a variante
    // com barra antes de acusar falta de prerender.
    if (STRICT && path !== "/" && !path.endsWith("/")) {
      const alt = await fetch(`${BASE}${path}/`, { redirect: "follow" });
      if (alt.ok) res = alt;
    }
  } catch (e) {
    fail(`${path}: falha de rede (${e.message})`);
    return;
  }
  if (res.status !== 200) fail(`${path}: status ${res.status} (esperado 200)`);
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("text/html")) fail(`${path}: content-type "${ct}" (esperado text/html)`);
  const xrobots = res.headers.get("x-robots-tag");
  if (xrobots && /noindex/i.test(xrobots) && !alias) {
    fail(`${path}: header X-Robots-Tag bloqueia indexação ("${xrobots}")`);
  }

  const html = await res.text();

  const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)];
  if (canonicals.length === 0) fail(`${path}: sem <link rel="canonical">`);
  if (canonicals.length > 1) fail(`${path}: ${canonicals.length} canonicals (esperado 1)`);
  const canonicalHref = head(canonicals[0]?.[0] ?? "", /href=["']([^"']+)["']/i);
  const norm = (u) => (u ?? "").replace(/\/$/, "");
  if (alias) {
    // Um alias jamais pode ter canonical self-referente: isso cria duplicidade
    // com o destino. O canonical correto (destino) é aplicado na hidratação e
    // é coberto por e2e/canonical-alias-seo.spec.ts.
    if (norm(canonicalHref) === norm(`${CANONICAL_HOST}${path}`)) {
      fail(`${path}: alias com canonical self-referente — deveria apontar para ${alias}`);
    }
  } else {
    const expected = `${CANONICAL_HOST}${path}`;
    if (canonicalHref && norm(canonicalHref) !== norm(expected)) {
      const msg = `${path}: canonical "${canonicalHref}" ≠ esperado "${expected}"`;
      STRICT ? fail(msg) : warn(`${msg} (dev sem prerender)`);
    }
  }

  const robotsMeta = head(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  if (!alias && robotsMeta && /noindex/i.test(robotsMeta) && sitemapPaths.has(path)) {
    fail(`${path}: meta robots "${robotsMeta}" em rota presente no sitemap`);
  }

  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b[1]);
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        const graph = node["@graph"] ?? [node];
        for (const g of graph) {
          const t = g?.["@type"];
          // @type pode ser string ou array (ex.: LocalBusiness +
          // ComputerRepairService no nó de negócio local).
          for (const v of Array.isArray(t) ? t : t ? [t] : []) types.add(String(v));
        }
      }
    } catch {
      fail(`${path}: JSON-LD inválido (não parseável)`);
    }
  }
  if (!alias && blocks.length === 0) {
    const msg = `${path}: nenhum bloco JSON-LD`;
    STRICT ? fail(msg) : warn(msg);
  }
  for (const t of EXPECTED_JSONLD[path] ?? []) {
    if (!types.has(t)) {
      const msg = `${path}: JSON-LD sem @type "${t}"`;
      STRICT ? fail(msg) : warn(msg);
    }
  }
}

const routes = [...sitemapPaths].sort();
for (const p of routes) await checkRoute(p);
for (const r of rules) await checkRoute(r.from, { alias: r.to });

// ── Relatório ───────────────────────────────────────────────────────
console.log(`\nsaúde de indexação — base ${BASE}${STRICT ? " (strict)" : ""}`);
console.log(`  rotas do sitemap: ${routes.length}`);
console.log(`  aliases da matriz: ${rules.length}`);
for (const w of warnings) console.log(`  ⚠️  ${w}`);
if (errors.length) {
  console.error(`\n❌ ${errors.length} bloqueio(s) de indexação:`);
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log(`\n✅ Nenhum bloqueio de indexação (${warnings.length} aviso(s)).`);
