#!/usr/bin/env node
/**
 * MICRO-RODADA INDEXAÇÃO 1 — diagnóstico cirúrgico de 10 URLs indexáveis.
 *
 * Não cria página, não reescreve conteúdo, não muda threshold. Apenas mede,
 * contra o SSR real e contra o Search Console (somente leitura):
 *
 *   FASE 0  invalidação de snapshot velho (o incidente da Local 2)
 *   FASE 1  universo = URLs curadas (index + self-canonical + sitemap)
 *   FASE 2  arquitetura × SSR × dado real
 *   FASE 3  seleção de exatamente 10 com diversidade de família
 *   FASE 5  click depth por BFS no grafo de links HTML do SSR
 *   FASE 6  descoberta interna (links de páginas indexáveis, fora do sitemap)
 *   FASE 20 índice ≠ performance: coverage e search analytics separados
 *   FASE 24 relatório estruturado em reports/indexation-microlot-1.json
 *
 * UNKNOWN nunca é convertido em zero nem em falha (FASE 30).
 *
 * Uso:
 *   node scripts/with-ssr-server.mjs node scripts/diagnose-indexation-microlot-1.mjs [--invalidar]
 */
import { existsSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado, resumo } from "./lib/ssr-harness.mjs";
import { ACTIVE_SITEMAPS, CURATED_PATHS, BASE_URL } from "./lib/curated-urls.mjs";
import { resolveLocal, isLocalPath } from "./lib/local-index-policy.mjs";

const args = process.argv.slice(2);
const dist = args.find((a) => !a.startsWith("--")) || "dist";
const INVALIDAR = args.includes("--invalidar") || process.env.CI === "true";
const ALVO = 10;

// ───────────────────────── FASE 0 — snapshot velho é mentira ─────────────────
if (INVALIDAR) {
  for (const alvo of [`${dist}/ssr-snapshot-manifest.json`, `${dist}/bairros`]) {
    if (existsSync(alvo)) rmSync(alvo, { recursive: true, force: true });
  }
  console.log("[fase 0] snapshot SSR invalidado (manifesto + dist/bairros).");
} else {
  console.log("[fase 0] reaproveitando snapshot dentro do TTL (use --invalidar para forçar).");
}

// ───────────────────────── FASE 1 — universo de candidatos ───────────────────
const familiaPorSitemap = {
  "sitemap-main.xml": "institucional",
  "sitemap-servicos.xml": "servico",
  "sitemap-regioes.xml": "cidade",
  "sitemap-bairros.xml": "bairro",
  "sitemap-problemas.xml": "problema",
  "sitemap-equipamentos.xml": "equipamento",
  "sitemap-solucoes.xml": "solucao",
  "sitemap-editorial.xml": "editorial",
};

const familiaDe = (path) => {
  for (const [arquivo, entradas] of ACTIVE_SITEMAPS) {
    if (entradas.some((e) => (typeof e === "string" ? e : e.path) === path)) {
      const base = familiaPorSitemap[arquivo] ?? "outro";
      if (base === "servico") {
        const partes = path.split("/").filter(Boolean);
        if (partes.length === 3) return path.includes("bairro") ? "servico_bairro" : "servico_cidade";
        return "servico";
      }
      return base;
    }
  }
  return "outro";
};

const universo = [...new Set(CURATED_PATHS.map((p) => (typeof p === "string" ? p : p.path)))]
  .filter((p) => !/^\/(admin|debug|status|lovable)/.test(p));

console.log(`[fase 1] universo curado: ${universo.length} URL(s) indexáveis declaradas.`);

// ───────────────────────── FASE 2 — SSR real ─────────────────────────────────
await prepararSsr(["/", ...universo], { dist });
abortarSeBloqueado("diagnose-indexation-microlot-1");
console.log(`[fase 2] SSR: ${JSON.stringify(resumo())}`);

const attr = (html, re) => html.match(re)?.[1]?.trim() ?? null;

const analisar = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const schema = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const json = JSON.parse(m[1]);
      const nodes = Array.isArray(json) ? json : (json["@graph"] ?? [json]);
      for (const n of nodes) if (n?.["@type"]) schema.push(String(n["@type"]));
    } catch {
      schema.push("INVALID_JSON_LD");
    }
  }
  const links = new Set();
  for (const l of main.matchAll(/<a[^>]+href=["'](\/[^"'#?]*)["']/gi)) {
    const href = l[1].replace(/\/+$/, "") || "/";
    links.add(href);
  }
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((x) =>
    x[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const texto = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    title: attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonical: attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    robots: attr(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    h1: h1s[0] ?? null,
    h1Count: h1s.length,
    schema: [...new Set(schema)],
    links: [...links],
    palavras: texto.split(" ").filter(Boolean).length,
  };
};

const dados = new Map();
const rotasParaAnalisar = ["/", ...universo];
for (const path of rotasParaAnalisar) {
  const html = htmlDaRota(path, dist);
  dados.set(path, html ? analisar(html) : { erro: "FAIL_ROUTE_NOT_RENDERED", links: [], schema: [] });
}

// ───────────────────── FASES 5/6 — grafo, click depth e descoberta ───────────
const norm = (p) => (p.replace(/\/+$/, "") || "/");
const inbound = new Map(rotasParaAnalisar.map((p) => [norm(p), new Set()]));
for (const [origem, info] of dados) {
  for (const alvo of info.links ?? []) {
    const a = norm(alvo);
    if (inbound.has(a) && a !== norm(origem)) inbound.get(a).add(norm(origem));
  }
}

// BFS a partir da home usando apenas links HTML reais do SSR.
const profundidade = new Map([["/", 0]]);
const fila = ["/"];
while (fila.length) {
  const atual = fila.shift();
  for (const alvo of dados.get(atual)?.links ?? []) {
    const a = norm(alvo);
    if (!dados.has(a) || profundidade.has(a)) continue;
    profundidade.set(a, profundidade.get(atual) + 1);
    fila.push(a);
  }
}

// ───────────────────────── FASE 20 — Search Console (leitura) ────────────────
let siteUrl = null;
let coberturaDisponivel = false;
let analyticsPorPagina = new Map();
let erroGsc = null;

try {
  const { resolveSite, searchAnalytics, inspectUrl, dayOffset } = await import("./lib/gsc-client.mjs");
  siteUrl = await resolveSite(BASE_URL || "https://otecnicodeinformatica.com.br");
  coberturaDisponivel = true;
  const linhas = await searchAnalytics(siteUrl, {
    startDate: dayOffset(-28),
    endDate: dayOffset(-1),
    dimensions: ["page"],
    rowLimit: 500,
  });
  for (const r of linhas) {
    try {
      analyticsPorPagina.set(norm(new URL(r.keys[0]).pathname), {
        impressions: r.impressions,
        clicks: r.clicks,
        ctr: r.ctr,
        position: r.position,
      });
    } catch {
      /* keys inesperadas: ignorar sem inventar dado */
    }
  }
  globalThis.__inspectUrl = inspectUrl;
} catch (e) {
  erroGsc = String(e.message).slice(0, 240);
  console.log(`[fase 20] Search Console indisponível → cobertura UNKNOWN. Motivo: ${erroGsc}`);
}

// ───────────────────────── FASE 3 — seleção dos 10 ───────────────────────────
const fichas = universo.map((path) => {
  const p = norm(path);
  const info = dados.get(path) ?? {};
  const policy = isLocalPath(p) ? resolveLocal(p).indexability : "index";
  const canonicalEsperado = `${BASE_URL}${p === "/" ? "/" : p}`;
  const canonicalOk = info.canonical ? norm(info.canonical.replace(BASE_URL, "") || "/") === p : false;
  const robots = info.robots ?? "(ausente)";
  const noindex = /noindex/i.test(robots);
  const entradas = [...(inbound.get(p) ?? [])];
  const depth = profundidade.get(p);
  const sa = analyticsPorPagina.get(p) ?? null;

  return {
    url: `${BASE_URL}${p}`,
    path: p,
    familia: familiaDe(path),
    policy,
    sitemap: true,
    ssr: {
      renderizado: !info.erro,
      title: info.title ?? null,
      titleLen: info.title?.length ?? 0,
      description: info.description ?? null,
      descriptionLen: info.description?.length ?? 0,
      canonical: info.canonical ?? null,
      canonicalEsperado,
      canonicalOk,
      robots,
      h1: info.h1 ?? null,
      h1Count: info.h1Count ?? 0,
      schema: info.schema ?? [],
      palavras: info.palavras ?? 0,
    },
    descoberta: {
      inboundInternos: entradas.length,
      exemplos: entradas.slice(0, 5),
      clickDepth: depth === undefined ? "orfa" : depth,
      orfa: entradas.length === 0,
    },
    searchAnalytics: sa ?? "NO_DATA",
    indexStatus: "UNKNOWN",
  };
});

const semEvidencia = (f) => f.searchAnalytics === "NO_DATA";
const problemaTecnico = (f) =>
  !f.ssr.renderizado || !f.ssr.canonicalOk || /noindex/i.test(f.ssr.robots) || f.ssr.h1Count !== 1;

const pontuar = (f) => {
  let s = 0;
  if (problemaTecnico(f)) s += 100;
  if (f.descoberta.orfa) s += 60;
  if (typeof f.descoberta.clickDepth === "number" && f.descoberta.clickDepth >= 3) s += 25;
  if (f.descoberta.clickDepth === "orfa") s += 40;
  if (semEvidencia(f)) s += 20;
  if (f.descoberta.inboundInternos <= 2) s += 10;
  return s;
};

// Diversidade: no máximo 2 por família na primeira passada (FASE 3/DIVERSIDADE).
const ordenadas = [...fichas].sort((a, b) => pontuar(b) - pontuar(a) || a.path.localeCompare(b.path));
const selecionadas = [];
const porFamilia = new Map();
for (const f of ordenadas) {
  if (selecionadas.length >= ALVO) break;
  const n = porFamilia.get(f.familia) ?? 0;
  if (n >= 2) continue;
  porFamilia.set(f.familia, n + 1);
  selecionadas.push(f);
}
for (const f of ordenadas) {
  if (selecionadas.length >= ALVO) break;
  if (!selecionadas.includes(f)) selecionadas.push(f);
}

// ───────────────── FASE 20 — cobertura só para as 10 selecionadas ────────────
if (coberturaDisponivel && globalThis.__inspectUrl) {
  for (const f of selecionadas) {
    try {
      const r = await globalThis.__inspectUrl(siteUrl, f.url);
      f.indexStatus = r.verdict === "PASS" ? "INDEXED" : (r.coverageState ?? "UNKNOWN");
      f.coverage = r;
    } catch (e) {
      f.indexStatus = "UNKNOWN";
      f.coverageErro = String(e.message).slice(0, 200);
    }
  }
}

// ───────────────────────── Decisão + reason codes (FASE 29) ──────────────────
for (const f of selecionadas) {
  const razoes = [];
  let decisao = "OBSERVE";

  if (!f.ssr.renderizado) {
    razoes.push("ROUTE_ERROR");
    decisao = "TECHNICAL_FIX";
  }
  if (/noindex/i.test(f.ssr.robots)) {
    razoes.push("NOINDEX_ERROR");
    decisao = "TECHNICAL_FIX";
  }
  if (f.ssr.renderizado && !f.ssr.canonicalOk) {
    razoes.push("CANONICAL_ERROR");
    decisao = "TECHNICAL_FIX";
  }
  if (decisao !== "TECHNICAL_FIX") {
    if (f.descoberta.orfa) {
      razoes.push("NO_INTERNAL_DISCOVERY");
      decisao = "DISCOVERY_FIX";
    } else if (typeof f.descoberta.clickDepth === "number" && f.descoberta.clickDepth >= 4) {
      razoes.push("HIGH_CLICK_DEPTH");
      decisao = "DISCOVERY_FIX";
    } else if (f.descoberta.clickDepth === "orfa") {
      razoes.push("NO_INTERNAL_DISCOVERY");
      decisao = "DISCOVERY_FIX";
    }
  }
  if (decisao === "OBSERVE") {
    razoes.push(f.indexStatus === "INDEXED" ? "HEALTHY_WAITING" : "TOO_NEW");
  }
  if (f.searchAnalytics === "NO_DATA") razoes.push("LOW_SAMPLE");
  if (!coberturaDisponivel) razoes.push("NO_CONTINUOUS_INDEX_SOURCE");

  f.reasonCodes = [...new Set(razoes)];
  f.decision = decisao;
}

// ───────────────────────── FASE 24/25/26 — relatório ─────────────────────────
mkdirSync("reports", { recursive: true });
const relatorio = {
  coorte: "indexation_microlot_1",
  baseline: new Date().toISOString(),
  site: siteUrl,
  coberturaDisponivel,
  erroGsc,
  universo: universo.length,
  selecionadas: selecionadas.length,
  contagemDecisoes: selecionadas.reduce((acc, f) => {
    acc[f.decision] = (acc[f.decision] ?? 0) + 1;
    return acc;
  }, {}),
  urls: selecionadas,
};
writeFileSync("reports/indexation-microlot-1.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(`\n[fase 24] reports/indexation-microlot-1.json — coorte indexation_microlot_1`);
console.log(`decisões: ${JSON.stringify(relatorio.contagemDecisoes)}\n`);
for (const f of selecionadas) {
  console.log(
    `${f.decision.padEnd(14)} ${f.indexStatus.padEnd(22)} depth=${String(f.descoberta.clickDepth).padEnd(5)} in=${String(
      f.descoberta.inboundInternos,
    ).padEnd(3)} ${f.path}  [${f.reasonCodes.join(",")}]`,
  );
}
