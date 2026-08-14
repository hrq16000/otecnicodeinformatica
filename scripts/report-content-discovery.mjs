#!/usr/bin/env node
/**
 * RODADA 8F — RELATÓRIO DE DESCOBERTA DA COORTE EDITORIAL
 * -------------------------------------------------------
 * Responde, para as URLs reais da coorte `content_cluster_formatacao_v1`:
 *
 *   • a rota existe e responde (HTML presente no dist)?
 *   • está no sitemap?
 *   • o canonical aponta para ela mesma?
 *   • é indexável (index,follow)?
 *   • quantos links internos apontam para ela e de onde?
 *   • qual a profundidade de clique a partir da Home?
 *   • o Google já conhece a URL? (somente com Search Console conectado)
 *
 * Nada é inferido. Sem Search Console, discovery = UNKNOWN — e isso é
 * registrado como "sem evidência", não como falha da página.
 *
 * Saída: reports/content-discovery.json e reports/content-discovery.md
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.resolve(process.argv[2] || "dist");
const OUT = path.join(ROOT, "reports");

// ── coorte (lida da fonte única, sem duplicar a lista) ──────────────
const cohortSrc = readFileSync(path.join(ROOT, "src/lib/contentCohort.ts"), "utf8");
const COHORT = [...cohortSrc.matchAll(
  /\{\s*url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)",\s*\n\s*publishedAt:\s*"([^"]+)",\s*\n\s*updatedAt:\s*"([^"]+)",\s*\n\s*novaNaRodada:\s*(true|false),\s*\n\s*papel:\s*"([^"]+)",/g,
)].map((m) => ({
  url: m[1],
  intent: m[2],
  publishedAt: m[3],
  updatedAt: m[4],
  novaNaRodada: m[5] === "true",
  papel: m[6],
}));

const COHORT_ID = cohortSrc.match(/CONTENT_COHORT_ID\s*=\s*"([^"]+)"/)?.[1] ?? "desconhecida";

if (COHORT.length === 0) {
  console.error("BLOQUEADO: não consegui ler a coorte em src/lib/contentCohort.ts.");
  process.exit(1);
}

// ── util ────────────────────────────────────────────────────────────
const htmlFor = (url) => {
  const rel = url.replace(/^\//, "");
  const candidatos = [path.join(DIST, rel, "index.html"), path.join(DIST, `${rel}.html`)];
  for (const c of candidatos) if (existsSync(c)) return c;
  return null;
};

const ageDays = (d) => Math.floor((Date.now() - new Date(`${d}T12:00:00Z`).getTime()) / 86_400_000);
const bucket = (d) => {
  const n = ageDays(d);
  return n <= 7 ? "0-7" : n <= 14 ? "8-14" : n <= 30 ? "15-30" : "30+";
};

// ── varredura do dist para links internos e profundidade ────────────
const paginas = new Map(); // rota -> { file, html }
if (existsSync(DIST)) {
  (function walk(dir) {
    for (const e of readdirSync(dir)) {
      const full = path.join(dir, e);
      if (statSync(full).isDirectory()) walk(full);
      else if (e === "index.html") {
        const rota = "/" + path.relative(DIST, dir).split(path.sep).join("/");
        paginas.set(rota === "/." ? "/" : rota, full);
      }
    }
  })(DIST);
}

const cacheHtml = new Map();
const lerHtml = (file) => {
  if (!cacheHtml.has(file)) cacheHtml.set(file, readFileSync(file, "utf8"));
  return cacheHtml.get(file);
};

const linksDe = (file) => {
  const html = lerHtml(file);
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/+$/, "") || "/");
  return [...new Set(hrefs)];
};

/** BFS a partir da Home para medir profundidade de clique real. */
function profundidades() {
  const dist = new Map();
  if (!paginas.has("/")) return dist;
  dist.set("/", 0);
  const fila = ["/"];
  while (fila.length) {
    const atual = fila.shift();
    const file = paginas.get(atual);
    if (!file) continue;
    for (const alvo of linksDe(file)) {
      if (dist.has(alvo)) continue;
      if (!paginas.has(alvo)) continue;
      dist.set(alvo, dist.get(atual) + 1);
      fila.push(alvo);
    }
  }
  return dist;
}

const profundidade = profundidades();

const inbound = (alvo) => {
  const fontes = [];
  for (const [rota, file] of paginas) {
    if (rota === alvo) continue;
    if (linksDe(file).includes(alvo)) fontes.push(rota);
  }
  return fontes;
};

// ── sitemap ─────────────────────────────────────────────────────────
const sitemapUrls = new Set();
if (existsSync(DIST)) {
  for (const f of readdirSync(DIST)) {
    if (!f.startsWith("sitemap") || !f.endsWith(".xml")) continue;
    const xml = readFileSync(path.join(DIST, f), "utf8");
    for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
      try {
        sitemapUrls.add(new URL(m[1]).pathname.replace(/\/+$/, "") || "/");
      } catch {
        /* loc inválido é problema de outro gate */
      }
    }
  }
}

// ── Search Console (opcional e fail-closed) ─────────────────────────
async function evidenciaGsc() {
  if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) return null;
  try {
    const { resolveSite, inspectUrl } = await import("./lib/gsc-client.mjs");
    const base = process.env.SITE_BASE_URL || "https://otecnicodeinformatica.com.br";
    const site = await resolveSite(base);
    const out = {};
    for (const m of COHORT) {
      const r = await inspectUrl(site, `${base}${m.url}`);
      const idx = r?.inspectionResult?.indexStatusResult ?? {};
      out[m.url] = {
        coverageState: idx.coverageState ?? null,
        lastCrawlTime: idx.lastCrawlTime ?? null,
        googleCanonical: idx.googleCanonical ?? null,
        userCanonical: idx.userCanonical ?? null,
        robotsTxtState: idx.robotsTxtState ?? null,
        sitemap: idx.sitemap ?? [],
        referringUrls: idx.referringUrls ?? [],
      };
    }
    return { site, urls: out };
  } catch (e) {
    return { erro: String(e?.message ?? e) };
  }
}

const estadoDeCoverage = (c) => {
  const s = String(c || "").toLowerCase();
  if (!s) return "UNKNOWN";
  if (s.includes("unknown")) return "UNKNOWN";
  if (s.includes("indexed") && !s.includes("not indexed")) return "INDEXED";
  if (s.includes("crawled")) return "CRAWLED";
  if (s.includes("discovered")) return "DISCOVERED";
  return "UNKNOWN";
};

// ── montagem ────────────────────────────────────────────────────────
const gsc = await evidenciaGsc();

const linhas = COHORT.map((m) => {
  const file = htmlFor(m.url);
  const html = file ? lerHtml(file) : "";
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null;
  const canonicalPath = (() => {
    try {
      return canonical ? new URL(canonical).pathname.replace(/\/+$/, "") || "/" : null;
    } catch {
      return null;
    }
  })();
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "index,follow (padrão)";
  const fontes = file ? inbound(m.url) : [];
  const ev = gsc?.urls?.[m.url];
  return {
    ...m,
    rota200: Boolean(file),
    noSitemap: sitemapUrls.has(m.url),
    canonical: canonicalPath,
    selfCanonical: canonicalPath === m.url,
    indexavel: !/noindex/i.test(robots),
    linksInternos: fontes.length,
    fontes,
    orfa: fontes.length === 0,
    clickDepth: profundidade.has(m.url) ? profundidade.get(m.url) : null,
    idadeDias: ageDays(m.publishedAt),
    faixaIdade: bucket(m.publishedAt),
    discovery: ev ? estadoDeCoverage(ev.coverageState) : "UNKNOWN",
    evidenciaDiscovery: ev ? "search-console" : "sem-evidencia",
    coverageState: ev?.coverageState ?? null,
    lastCrawlTime: ev?.lastCrawlTime ?? null,
    googleCanonical: ev?.googleCanonical ?? null,
    referringUrls: ev?.referringUrls ?? [],
  };
});

const resumo = {
  cohort: COHORT_ID,
  geradoEm: new Date().toISOString(),
  total: linhas.length,
  rota200: linhas.filter((l) => l.rota200).length,
  noSitemap: linhas.filter((l) => l.noSitemap).length,
  selfCanonical: linhas.filter((l) => l.selfCanonical).length,
  indexaveis: linhas.filter((l) => l.indexavel).length,
  orfas: linhas.filter((l) => l.orfa).length,
  discovery: Object.fromEntries(
    ["UNKNOWN", "DISCOVERED", "CRAWLED", "INDEXED"].map((s) => [s, linhas.filter((l) => l.discovery === s).length]),
  ),
  fonteDiscovery: gsc ? (gsc.erro ? `indisponível (${gsc.erro})` : "search-console") : "não conectado nesta execução",
};

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "content-discovery.json"), JSON.stringify({ resumo, urls: linhas }, null, 2));

const sim = (b) => (b ? "sim" : "não");
const md = [
  "# Descoberta do cluster editorial — Rodada 8F",
  "",
  `Coorte: \`${resumo.cohort}\` · gerado em ${resumo.geradoEm.slice(0, 10)}.`,
  `Fonte de discovery: ${resumo.fonteDiscovery}.`,
  "",
  "## Situação técnica por URL",
  "",
  "| URL | Intenção | 200 | Sitemap | Self-canonical | Indexável | Links internos | Profundidade | Idade |",
  "| --- | --- | :-: | :-: | :-: | :-: | --: | --: | --- |",
  ...linhas.map(
    (l) =>
      `| \`${l.url}\` | ${l.intent} | ${sim(l.rota200)} | ${sim(l.noSitemap)} | ${sim(l.selfCanonical)} | ${sim(l.indexavel)} | ${l.linksInternos} | ${l.clickDepth ?? "—"} | ${l.idadeDias}d (${l.faixaIdade}) |`,
  ),
  "",
  "## Estado de descoberta",
  "",
  "| URL | Estado | coverageState | Última rastreagem | Canonical do Google |",
  "| --- | --- | --- | --- | --- |",
  ...linhas.map(
    (l) =>
      `| \`${l.url}\` | ${l.discovery} | ${l.coverageState ?? "sem evidência"} | ${l.lastCrawlTime ?? "—"} | ${l.googleCanonical ?? "—"} |`,
  ),
  "",
  `Indexadas: **${resumo.discovery.INDEXED}/${resumo.total}** · descobertas: ${resumo.discovery.DISCOVERED} · rastreadas: ${resumo.discovery.CRAWLED} · desconhecidas: ${resumo.discovery.UNKNOWN}.`,
  "",
  "## Caminhos internos de entrada",
  "",
  ...linhas.flatMap((l) => [
    `### \`${l.url}\``,
    l.fontes.length ? l.fontes.map((f) => `- \`${f}\``).join("\n") : "- Sem link interno de entrada (órfã).",
    "",
  ]),
  "## Leitura",
  "",
  "Idade baixa com estado UNKNOWN não é sinal de conteúdo ruim: é ausência de",
  "descoberta. Enquanto uma URL tiver zero impressão, não faz sentido reescrever",
  "título para “melhorar CTR” — o gargalo ainda é anterior.",
  "",
].join("\n");

writeFileSync(path.join(OUT, "content-discovery.md"), md);

console.log("── report:content-discovery ──");
console.log(`  coorte ${resumo.cohort}: ${resumo.total} URLs`);
console.log(`  rota 200 ${resumo.rota200}/${resumo.total} · sitemap ${resumo.noSitemap}/${resumo.total} · self-canonical ${resumo.selfCanonical}/${resumo.total}`);
console.log(`  indexadas ${resumo.discovery.INDEXED}/${resumo.total} (fonte: ${resumo.fonteDiscovery})`);
console.log("  → reports/content-discovery.md");
