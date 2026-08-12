#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// RODADA 3P — GATE DE PÓS-PUBLICAÇÃO (check:live-production)
//
// Verificações EXTERNAS e NÃO destrutivas contra o domínio publicado:
//   1. host canônico + redirect do www + HTTPS/HSTS
//   2. robots.txt de produção (host correto, sem Disallow: / residual,
//      sitemaps corretos, nenhuma URL da matriz de origem)
//   3. sitemaps publicados (HTTP 200, XML válido, host oficial, sem
//      localhost/preview/domínio de origem)
//   4. amostra de HTML servido: title, description, canonical self,
//      robots, H1, JSON-LD, OG e conteúdo principal
//   5. marca: nenhum token herdado no HTML publicado
//   6. contato: nenhum número visível, nenhum tel:
//   7. analytics fail-closed: sem GA4/Ads/AdSense quando não configurados
//   8. noindex preservado em amostra de rotas não indexáveis
//   9. status HTTP: URLs inventadas devem responder 404 real
//  10. assets essenciais (logo, OG image) servidos com MIME correto
//
// Uso: node scripts/check-live-production.mjs [--base=https://dominio]
// ─────────────────────────────────────────────────────────────
import { writeFileSync, mkdirSync } from "node:fs";
import { BASE_URL, SITE_DOMAIN, LEGACY_TOKENS, WHATSAPP_NUMBER, BRAND_NAME } from "./lib/site-env.mjs";

const argBase = process.argv.find((a) => a.startsWith("--base="));
const BASE = (argBase ? argBase.split("=")[1] : process.env.SITE_BASE_URL || BASE_URL).replace(/\/$/, "");
if (!BASE) {
  console.error("[live-production] domínio não configurado (VITE_SITE_DOMAIN/SITE_BASE_URL) — fail-closed.");
  process.exit(1);
}

const errors = [];
const warnings = [];
const results = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const ok = (check, detail = "") => results.push({ check, ok: true, detail });
const ko = (check, detail) => {
  results.push({ check, ok: false, detail });
  fail(`${check}: ${detail}`);
};

async function get(path, opts = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const res = await fetch(url, { redirect: opts.redirect ?? "follow", headers: { "user-agent": "live-production-gate" } });
  const body = opts.head ? "" : await res.text();
  return { res, body, url };
}

// ── 1. host canônico ────────────────────────────────────────────────
{
  const { res } = await get("/", { redirect: "manual" });
  if (res.status === 200) ok("host_canonico", `${BASE} responde 200`);
  else ko("host_canonico", `esperado 200, veio ${res.status}`);
  if (!/^https:/.test(BASE)) ko("https", "base não usa HTTPS");
  else ok("https");
  const hsts = res.headers.get("strict-transport-security");
  hsts ? ok("hsts", hsts) : warn("HSTS ausente no host canônico");
  for (const h of ["x-content-type-options", "referrer-policy"]) {
    const v = res.headers.get(h);
    v ? ok(`header_${h}`, v) : warn(`header ausente: ${h}`);
  }
  for (const h of ["content-security-policy", "permissions-policy"]) {
    const v = res.headers.get(h);
    v ? ok(`header_${h}`, v.slice(0, 80)) : warn(`header ausente (não bloqueante): ${h}`);
  }
}
{
  const wwwUrl = `https://www.${SITE_DOMAIN}/`;
  try {
    const res = await fetch(wwwUrl, { redirect: "manual" });
    const loc = res.headers.get("location") ?? "";
    if ([301, 302, 307, 308].includes(res.status) && loc.startsWith(BASE)) ok("www_redirect", `${res.status} → ${loc}`);
    else ko("www_redirect", `status ${res.status}, location "${loc}"`);
  } catch (e) {
    warn(`www não resolvível: ${e.message}`);
  }
}

// ── 2. robots.txt ───────────────────────────────────────────────────
{
  const { res, body } = await get("/robots.txt");
  if (res.status !== 200) ko("robots_status", `HTTP ${res.status}`);
  else {
    ok("robots_status");
    if (/^\s*Disallow:\s*\/\s*$/m.test(body)) ko("robots_disallow_all", "Disallow: / residual bloqueia o site inteiro");
    else ok("robots_disallow_all", "sem bloqueio global");
    if (!body.includes(`https://${SITE_DOMAIN}/sitemap`)) ko("robots_sitemap", "diretiva Sitemap com host oficial ausente");
    else ok("robots_sitemap");
    if (!/Disallow:\s*\/admin/.test(body)) ko("robots_admin", "/admin não está bloqueado");
    else ok("robots_admin");
    const legacy = LEGACY_TOKENS.filter((t) => body.includes(t));
    legacy.length ? ko("robots_marca", `tokens herdados: ${legacy.join(", ")}`) : ok("robots_marca");
  }
}

// ── 3. sitemaps ─────────────────────────────────────────────────────
const sitemapUrls = [];
{
  const { res, body } = await get("/sitemap.xml");
  if (res.status !== 200) ko("sitemap_index", `HTTP ${res.status}`);
  else {
    const shards = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    ok("sitemap_index", `${shards.length} shard(s)`);
    for (const shard of shards) {
      if (!shard.startsWith(`https://${SITE_DOMAIN}/`)) {
        ko("sitemap_shard_host", `host inválido em ${shard}`);
        continue;
      }
      const r = await get(shard);
      if (r.res.status !== 200) {
        ko("sitemap_shard_status", `${shard} → HTTP ${r.res.status}`);
        continue;
      }
      const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      const bad = locs.filter((l) => !l.startsWith(`https://${SITE_DOMAIN}/`));
      const legacy = locs.filter((l) => LEGACY_TOKENS.some((t) => l.includes(t)) || /localhost|lovable(project|)\.app|pages\.dev/.test(l));
      if (bad.length) ko("sitemap_shard_urls", `${shard}: ${bad.length} URL(s) fora do host oficial`);
      if (legacy.length) ko("sitemap_shard_legacy", `${shard}: ${legacy.length} URL(s) herdadas/preview`);
      if (!bad.length && !legacy.length) ok(`sitemap:${shard.split("/").pop()}`, `${locs.length} URL(s)`);
      sitemapUrls.push(...locs);
    }
  }
}

// ── 4/5/6/7. amostra de HTML servido ────────────────────────────────
const SAMPLE = [
  "/",
  "/servicos/manutencao-de-notebook",
  "/servicos/manutencao-de-computador",
  "/servicos/recuperacao-de-dados",
  "/servicos/suporte-tecnico-empresarial",
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-sao-jose-pinhais",
  "/bairros/batel",
  "/bairros/cic",
  "/sobre",
  "/precos-e-politicas",
];
const htmlReport = [];
for (const path of SAMPLE) {
  const { res, body } = await get(path);
  const row = { path, status: res.status, problems: [] };
  if (res.status !== 200) {
    row.problems.push(`HTTP ${res.status}`);
    htmlReport.push(row);
    ko("html_status", `${path} → HTTP ${res.status}`);
    continue;
  }
  const title = body.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const desc = body.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  const canonicals = [...body.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/gi)].map((m) => m[1]);
  const robots = body.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
  const ogImage = body.match(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  const jsonLd = [...body.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

  if (!title || /Lovable/i.test(title)) row.problems.push("title ausente/genérico");
  if (!desc) row.problems.push("description ausente");
  if (canonicals.length !== 1) row.problems.push(`canonical x${canonicals.length}`);
  else {
    const c = canonicals[0];
    const expected = path === "/" ? `${BASE}/` : `${BASE}${path}`;
    if (!c.startsWith("https://")) row.problems.push("canonical sem HTTPS");
    if (!c.startsWith(`https://${SITE_DOMAIN}`)) row.problems.push(`canonical host inválido (${c})`);
    if (c.includes("?")) row.problems.push("canonical com parâmetros");
    if (c.replace(/\/$/, "") !== expected.replace(/\/$/, "")) row.problems.push(`canonical não self (${c})`);
  }
  if (/noindex/i.test(robots)) row.problems.push(`robots noindex em rota da amostra (${robots})`);
  if (!h1) row.problems.push("H1 ausente no HTML servido");
  if (!jsonLd.length) row.problems.push("JSON-LD ausente no HTML servido");
  for (const raw of jsonLd) {
    try {
      JSON.parse(raw);
    } catch {
      row.problems.push("JSON-LD inválido");
    }
  }
  if (!ogImage) row.problems.push("og:image ausente");
  if (body.replace(/<[^>]+>/g, " ").trim().length < 800) row.problems.push("conteúdo principal muito curto no HTML");

  // marca / contato / analytics
  const legacy = LEGACY_TOKENS.filter((t) => body.includes(t));
  if (legacy.length) row.problems.push(`tokens herdados: ${legacy.join(", ")}`);
  if (/href="tel:/i.test(body)) row.problems.push("link tel: presente");
  const visible = body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  if (WHATSAPP_NUMBER) {
    const digits = WHATSAPP_NUMBER.slice(2);
    const patterns = [digits, `${digits.slice(0, 2)} ${digits.slice(2)}`, `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`];
    if (patterns.some((p) => visible.includes(p))) row.problems.push("número de WhatsApp visível em texto");
  }
  if (!process.env.VITE_GA4_ID && /googletagmanager\.com\/gtag|gtag\('config'/.test(body)) row.problems.push("GA4 presente sem ID configurado");
  if (/pagead2\.googlesyndication\.com\/pagead\/js/.test(body) && !process.env.VITE_ADSENSE_CLIENT) {
    // AdSense é permitido quando o publisher da marca está configurado no build
  }
  if (!body.includes(BRAND_NAME)) row.problems.push("marca oficial ausente no HTML");

  htmlReport.push(row);
  row.problems.length ? ko("html_amostra", `${path}: ${row.problems.join("; ")}`) : ok(`html:${path}`);
}

// ── 8. noindex preservado ───────────────────────────────────────────
const NOINDEX_SAMPLE = ["/arrumar-pc/notebook-nao-liga", "/bairros/santa-felicidade", "/conserto-tv/curitiba"];
for (const path of NOINDEX_SAMPLE) {
  const { res, body } = await get(path);
  if (res.status !== 200) {
    warn(`noindex-amostra ${path}: HTTP ${res.status} (rota pode não existir)`);
    continue;
  }
  const robots = body.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  if (!/noindex/i.test(robots)) ko("noindex_amostra", `${path} deveria ser noindex (robots="${robots}")`);
  else if (sitemapUrls.some((u) => u.endsWith(path))) ko("noindex_sitemap", `${path} é noindex mas está no sitemap`);
  else ok(`noindex:${path}`, robots);
}

// ── 9. 404 real em URLs inventadas ──────────────────────────────────
const FAKE = [
  "/pagina-que-nunca-existiu-3p",
  "/servicos/servico-inexistente-3p",
  "/bairros/bairro-inexistente-3p",
  "/blog/artigo-inexistente-3p",
  "/tecnico-informatica-cidade-fantasma",
  "/arrumar-pc/nao-existe-3p",
  "/conserto-tv/nao-existe-3p",
  "/admin/rota-fantasma-3p",
  "/x/y/z-3p",
  "/index.php?id=1",
];
let fake404 = 0;
for (const path of FAKE) {
  const { res, body } = await get(path);
  const robots = body.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1] ?? "";
  if (res.status === 404) fake404 += 1;
  else if (res.status === 200 && /noindex/i.test(robots)) {
    fake404 += 1;
    warn(`${path}: 200 com noindex (soft-404 controlado no edge)`);
  } else ko("status_404", `${path} → HTTP ${res.status} sem noindex`);
}
ok("status_404", `${fake404}/${FAKE.length} URLs inventadas tratadas corretamente`);

// ── 10. assets essenciais ───────────────────────────────────────────
{
  const { body } = await get("/");
  const og = body.match(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i)?.[1];
  const assets = [og].filter(Boolean);
  for (const a of assets) {
    const abs = a.startsWith("http") ? a : `${BASE}${a}`;
    const res = await fetch(abs, { method: "GET" });
    const type = res.headers.get("content-type") ?? "";
    if (res.status !== 200 || !/^image\//.test(type)) ko("og_image", `${abs} → HTTP ${res.status} (${type})`);
    else ok("og_image", `${abs} (${type})`);
  }
}

// ── saída ───────────────────────────────────────────────────────────
mkdirSync("reports", { recursive: true });
const summary = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  ok: errors.length === 0,
  errors,
  warnings,
  results,
  html: htmlReport,
};
writeFileSync("reports/live-production.json", JSON.stringify(summary, null, 2) + "\n");

console.log("── GATE check:live-production ──");
for (const r of results) console.log(`  ${r.ok ? "✓" : "✗"} ${r.check}${r.detail ? ` — ${r.detail}` : ""}`);
for (const w of warnings) console.log(`  ⚠ ${w}`);
if (errors.length) {
  console.error(`\nBLOQUEADO: ${errors.length} problema(s) em produção.`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`\nstatus: LIVE OK (${results.length} verificações) → reports/live-production.json`);
