#!/usr/bin/env node
/**
 * RODADA 5D — AUDITORIA LOCAL POR URL.
 *
 * Varre o dist gerado e produz, para cada rota serviço × cidade governada pela
 * política local, o estado real de:
 *   canonical · robots · sitemap · Service · BreadcrumbList · WebPage · FAQPage
 *   · areaServed · veredito do gate (verde/bloqueado).
 *
 * Saída: dist/local-audit.json e public/local-audit.json (consumido pelo
 * dashboard /admin/auditoria-local). Nada é escrito à mão.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ENTIDADES, resolveLocal } from "./lib/local-index-policy.mjs";
import { servicoCuritibaPorPath } from "./lib/servico-curitiba.mjs";

const dist = process.argv[2] || "dist";

const readHtml = (p) => {
  for (const f of [join(dist, `${p.replace(/^\//, "")}/index.html`), join(dist, `${p.replace(/^\//, "")}.html`)]) {
    if (existsSync(f)) return readFileSync(f, "utf8");
  }
  return null;
};

const sitemapPaths = new Set();
for (const file of ["sitemap-servicos.xml", "sitemap-main.xml", "sitemap-regioes.xml", "sitemap-bairros.xml"]) {
  const f = join(dist, file);
  if (!existsSync(f)) continue;
  for (const m of readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      sitemapPaths.add(new URL(m[1]).pathname.replace(/\/$/, "") || "/");
    } catch {
      /* ignora loc inválida */
    }
  }
}

const jsonLdTypes = (html) => {
  const tipos = new Set();
  let areaServed = null;
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = data["@graph"] ?? (Array.isArray(data) ? data : [data]);
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const t = node["@type"];
      for (const tipo of Array.isArray(t) ? t : [t]) if (tipo) tipos.add(tipo);
      if (node.areaServed && (node["@type"] === "Service" || !areaServed)) {
        const lista = [].concat(node.areaServed);
        const nomes = lista.map((a) => (typeof a === "string" ? a : a?.name)).filter(Boolean);
        if (nomes.length) areaServed = nomes.join(", ");
      }
    }
  }
  return { tipos: [...tipos], areaServed };
};

const linhas = [];
for (const entidade of ENTIDADES.filter((e) => e.family === "SERVICO_CIDADE" || e.family === "CIDADE")) {
  const d = resolveLocal(entidade.path);
  const html = readHtml(d.path);
  const conteudo = servicoCuritibaPorPath(d.path);
  const cidade = d.path.split("/")[3] ?? d.path.replace("/tecnico-informatica-", "");

  if (!html) {
    linhas.push({
      path: d.path,
      familia: d.family,
      cidade,
      indexability: d.indexability,
      gate: d.indexability === "index" ? "BLOQUEADO" : "N/A",
      observacao: "sem HTML estático no dist",
    });
    continue;
  }

  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
  const { tipos, areaServed } = jsonLdTypes(html);
  const canonicalPath = canonical ? new URL(canonical, "https://x").pathname.replace(/\/$/, "") : "";
  const noSitemap = sitemapPaths.has(d.path.replace(/\/$/, ""));

  const problemas = [];
  if (canonicalPath !== d.canonical.replace(/\/$/, "")) problemas.push("canonical divergente da política");
  if (d.indexability === "index" && /noindex/i.test(robots)) problemas.push("robots noindex em rota indexável");
  if (d.indexability !== "index" && !/noindex/i.test(robots)) problemas.push("rota não indexável sem noindex");
  if (d.sitemap !== noSitemap) problemas.push("presença no sitemap divergente da política");
  if (d.indexability === "index" && d.family === "SERVICO_CIDADE") {
    for (const exigido of ["Service", "BreadcrumbList", "WebPage", "FAQPage"]) {
      if (!tipos.includes(exigido)) problemas.push(`schema ausente: ${exigido}`);
    }
    if (!conteudo) problemas.push("sem conteúdo local declarado");
    const esperada = conteudo?.cidadeNome ?? (cidade === "curitiba" ? "Curitiba" : null);
    if (esperada && areaServed && !areaServed.includes(esperada)) problemas.push(`areaServed '${areaServed}' ≠ '${esperada}'`);
    if (!areaServed) problemas.push("areaServed ausente");
  }

  linhas.push({
    path: d.path,
    familia: d.family,
    cidade,
    indexability: d.indexability,
    canonical: canonicalPath,
    canonicalOk: canonicalPath === d.canonical.replace(/\/$/, ""),
    robots: robots || "(ausente)",
    sitemapEsperado: d.sitemap,
    sitemapReal: noSitemap,
    schemas: tipos.filter((t) => ["Service", "BreadcrumbList", "WebPage", "FAQPage", "LocalBusiness"].includes(t)),
    areaServed,
    parent: d.parent ?? null,
    gate: problemas.length ? "BLOQUEADO" : "VERDE",
    problemas,
  });
}

const payload = {
  geradoEm: new Date().toISOString(),
  total: linhas.length,
  verdes: linhas.filter((l) => l.gate === "VERDE").length,
  bloqueados: linhas.filter((l) => l.gate === "BLOQUEADO").length,
  rotas: linhas.sort((a, b) => a.path.localeCompare(b.path)),
};

const json = `${JSON.stringify(payload, null, 2)}\n`;
mkdirSync(join(process.cwd(), "public"), { recursive: true });
writeFileSync(join(process.cwd(), "public/local-audit.json"), json);
if (existsSync(dist)) writeFileSync(join(dist, "local-audit.json"), json);

console.log(
  `✓ auditoria local — ${payload.total} rota(s) · ${payload.verdes} verde(s) · ${payload.bloqueados} bloqueada(s) → /local-audit.json`,
);
if (payload.bloqueados) {
  for (const l of payload.rotas.filter((r) => r.gate === "BLOQUEADO")) {
    console.log(`  ✗ ${l.path}: ${(l.problemas ?? [l.observacao]).join("; ")}`);
  }
  process.exit(1);
}
