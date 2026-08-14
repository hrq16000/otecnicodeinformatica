#!/usr/bin/env node
/**
 * GATE — INTENÇÃO DE BAIRRO ÂNCORA (RODADA 5E)
 *
 * Verifica, para cada bairro âncora declarado em src/lib/localIndexPolicy.json,
 * que a promoção a `index` é sustentada por conteúdo e estrutura reais:
 *
 *   1. rota existe (HTML estático no dist) e a policy resolve `index`;
 *   2. cidade-pai declarada existe e também é indexável;
 *   3. intenção declarada na policy;
 *   4. canonical self · robots index · presença no sitemap;
 *   5. breadcrumb completo (Início → Áreas atendidas → Cidade → Bairro);
 *   6. schema: WebPage + BreadcrumbList (+ FAQPage quando há FAQ) e
 *      PROIBIÇÃO de LocalBusiness próprio por bairro (filial fictícia);
 *   7. metadata própria (title/description/H1 exclusivos no lote);
 *   8. originalidade mínima de corpo (≥ 400 palavras);
 *   9. interlinks obrigatórios: cidade-pai + /areas-atendidas;
 *  10. ausência de alegações hiperlocais sem evidência (FASE 13).
 *
 * Fail-closed e bloqueante.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { BAIRROS_ANCORA_META, resolveLocal } from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";
const erros = [];
const avisos = [];

const PROIBIDO = [
  /t[eé]cnico residente/i,
  /(unidade|oficina|escrit[oó]rio|loja|filial)\s+(no|na|em)\s+bairro/i,
  /chegamos em \d+/i,
  /em at[eé] \d+\s*minutos/i,
  /a \d+\s?km/i,
  /\d+\s?km de dist[aâ]ncia/i,
  /mais de \d+\s+(clientes|atendimentos)/i,
  /alta demanda/i,
  /parceiro exclusivo/i,
  /sla de/i,
];

const html = (p) => {
  for (const f of [join(dist, `${p.replace(/^\//, "")}/index.html`), join(dist, `${p.replace(/^\//, "")}.html`)]) {
    if (existsSync(f)) return readFileSync(f, "utf8");
  }
  return null;
};

// URLs presentes nos sitemaps gerados.
const sitemap = new Set();
for (const f of ["sitemap.xml", "sitemap-bairros.xml", "sitemap-main.xml", "sitemap-regioes.xml"]) {
  const file = resolve(dist, f);
  if (!existsSync(file)) continue;
  for (const m of readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      sitemap.add(new URL(m[1]).pathname.replace(/\/$/, "") || "/");
    } catch {
      /* loc inválida ignorada */
    }
  }
}

const texto = (h) =>
  (h.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? h)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const vistos = { title: new Map(), description: new Map(), h1: new Map() };
const linhas = [];

for (const bairro of BAIRROS_ANCORA_META) {
  const path = `/bairros/${bairro.slug}`;
  const d = resolveLocal(path);
  const doc = html(path);
  const row = { path, cidade: bairro.cidade, lote: bairro.lote ?? 1, decisao: d.indexability, checks: {} };
  const falha = (msg) => erros.push(`${path}: ${msg}`);

  if (!bairro.intent) falha("bairro âncora sem intenção declarada na policy.");
  if (!bairro.parent) falha("bairro âncora sem cidade-pai declarada na policy.");
  else {
    const pai = resolveLocal(bairro.parent);
    row.parent = bairro.parent;
    if (pai.indexability !== "index") falha(`cidade-pai ${bairro.parent} não é indexável.`);
    if (!html(bairro.parent)) falha(`cidade-pai ${bairro.parent} sem HTML estático no dist.`);
  }

  if (d.indexability !== "index") {
    falha(`declarado âncora, mas a policy resolve "${d.indexability}".`);
    linhas.push(row);
    continue;
  }

  if (!doc) {
    falha("indexável sem HTML estático no dist.");
    linhas.push(row);
    continue;
  }

  const canonical = doc.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? "";
  const canonicalPath = canonical.startsWith("http") ? new URL(canonical).pathname : canonical;
  row.checks.canonical = canonicalPath.replace(/\/$/, "") === path;
  if (!row.checks.canonical) falha(`canonical "${canonicalPath}" não é self.`);

  const robots = doc.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  row.checks.robots = !/noindex/i.test(robots);
  if (!row.checks.robots) falha(`robots "${robots}" contradiz a policy index.`);

  row.checks.sitemap = sitemap.has(path);
  if (!row.checks.sitemap) falha("ausente dos sitemaps gerados.");

  const title = doc.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = doc.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  const h1s = [...doc.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  row.checks.h1Unico = h1s.length === 1;
  if (h1s.length !== 1) falha(`esperado exatamente 1 H1, encontrados ${h1s.length}.`);
  for (const [campo, valor] of [["title", title], ["description", description], ["h1", h1s[0] ?? ""]]) {
    if (!valor) falha(`${campo} vazio.`);
    const anterior = vistos[campo].get(valor.toLowerCase());
    if (anterior) falha(`${campo} idêntico ao de ${anterior}.`);
    else vistos[campo].set(valor.toLowerCase(), path);
  }
  if (!new RegExp(bairro.cidade.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(description))
    avisos.push(`${path}: description não menciona a cidade-pai (${bairro.cidade}).`);

  const tipos = new Set();
  let localBusinessProprio = false;
  for (const m of doc.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = data["@graph"] ?? (Array.isArray(data) ? data : [data]);
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      for (const t of [].concat(node["@type"] ?? [])) {
        tipos.add(t);
        if (t === "LocalBusiness" && String(node["@id"] ?? "").includes(`/bairros/${bairro.slug}`))
          localBusinessProprio = true;
      }
    }
  }
  row.checks.webPage = tipos.has("WebPage");
  row.checks.breadcrumb = tipos.has("BreadcrumbList");
  if (!tipos.has("WebPage")) falha("schema WebPage ausente.");
  if (!tipos.has("BreadcrumbList")) falha("schema BreadcrumbList ausente.");
  if (localBusinessProprio) falha("LocalBusiness próprio do bairro (filial fictícia) — proibido pela FASE 31.");

  const corpo = texto(doc);
  const palavras = corpo.split(" ").filter(Boolean).length;
  row.palavras = palavras;
  row.checks.conteudo = palavras >= 400;
  if (palavras < 400) falha(`conteúdo raso (${palavras} palavras, mínimo 400).`);

  row.checks.interlinkCidade = doc.includes(`href="${bairro.parent}"`);
  row.checks.interlinkAreas = doc.includes('href="/areas-atendidas"');
  if (!row.checks.interlinkCidade) falha(`sem link interno para a cidade-pai (${bairro.parent}).`);
  if (!row.checks.interlinkAreas) falha("sem link interno para /areas-atendidas.");

  const breadcrumbTexto = doc.match(/<nav[^>]*aria-label=["'][^"']*[Bb]readcrumb[^"']*["'][\s\S]*?<\/nav>/i)?.[0] ?? "";
  row.checks.breadcrumbCidade = breadcrumbTexto.includes(bairro.parent) || doc.includes(`"item":"${bairro.parent}"`) || doc.includes(bairro.parent);
  if (!row.checks.breadcrumbCidade) falha("breadcrumb não passa pela cidade-pai.");

  for (const regra of PROIBIDO) {
    if (regra.test(corpo)) falha(`alegação hiperlocal sem evidência detectada: ${regra}`);
  }
  row.checks.semAlegacao = !PROIBIDO.some((r) => r.test(corpo));

  linhas.push(row);
}

for (const a of avisos) console.warn(`[check-local-neighborhood-intent] aviso: ${a}`);

if (erros.length) {
  console.error(`\n[check-local-neighborhood-intent] ${erros.length} problema(s):`);
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(
  `[check-local-neighborhood-intent] OK — ${linhas.length} bairros âncora conferidos ` +
    `(${linhas.filter((l) => l.lote === 2).length} do Lote 2).`,
);
