#!/usr/bin/env node
/**
 * MATRIZ DE DESCOBERTA DO CLUSTER /problemas (Rodada 8B — Frente A)
 *
 * Responde, por URL do cluster, a única pergunta que importa para descoberta:
 *   "o Googlebot consegue chegar aqui navegando, ou a URL depende do sitemap?"
 *
 * Colunas:
 *   URL · Indexável · Sitemap · Incoming internal links · Click depth · Search status
 *
 * Fontes REAIS usadas (nada é inferido por heurística de nome):
 *   - public/sitemap-problemas.xml            → presença no sitemap
 *   - varredura de src/**                     → links internos e origem deles
 *   - BFS a partir de "/" pelos links do código→ click depth
 *   - reports/discovery-coverage.json         → Search status (quando existir)
 *
 * Search status só é preenchido quando há evidência do Search Console.
 * Caso contrário: UNKNOWN (nunca inventado).
 *
 * Saídas: reports/problem-discovery-coverage.json e .md
 *         public/problem-discovery-status.json (consumido pelo painel /admin)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SITEMAP = "public/sitemap-problemas.xml";
const DISCOVERY = "reports/discovery-coverage.json";

/* ── 1. URLs do cluster (sitemap = fonte declarada) ─────────────────────── */
const sitemapPaths = new Set();
if (existsSync(SITEMAP)) {
  const xml = readFileSync(SITEMAP, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      const p = new URL(m[1].trim()).pathname.replace(/\/$/, "");
      if (p.startsWith("/problemas")) sitemapPaths.add(p);
    } catch { /* loc inválida é ignorada */ }
  }
}

/* ── 2. Varredura de código: grafo de links internos ────────────────────── */
function listFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) listFiles(p, out);
    else if (/\.(tsx?|json)$/.test(p)) out.push(p);
  }
  return out;
}

const files = listFiles("src");
/** path de página (aproximado pelo arquivo) → conjunto de rotas linkadas */
const graph = new Map();
/** rota de problema → [{ arquivo, anchor }] */
const incoming = new Map();

const ROUTE_RE = /["'`](\/(?:problemas|servicos|bairros|solucoes|equipamentos)\/[a-z0-9-]+|\/[a-z0-9-]{3,})["'`]/g;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const rotas = new Set();
  for (const m of src.matchAll(ROUTE_RE)) rotas.add(m[1].replace(/\/$/, ""));
  graph.set(file, rotas);
  for (const rota of rotas) {
    if (!rota.startsWith("/problemas/")) continue;
    if (!incoming.has(rota)) incoming.set(rota, []);
    // Âncora aproximada: texto do elemento seguinte ao href, quando legível.
    const idx = src.indexOf(rota);
    const trecho = src.slice(idx, idx + 400);
    const anchor = (trecho.match(/>\s*([^<>{}\n]{4,70}?)\s*</) || [, ""])[1].trim();
    incoming.get(rota).push({ arquivo: file, anchor });
  }
}

/** Arquivo que provavelmente renderiza determinada rota (heurística só para BFS). */
function arquivosDeRota(rota) {
  const slug = rota.split("/").filter(Boolean).join("-");
  return files.filter((f) => {
    const base = f.toLowerCase().replace(/[^a-z0-9]/g, "");
    return base.includes(slug.replace(/-/g, ""));
  });
}

/** Click depth a partir de "/" percorrendo o grafo de links do código. */
function clickDepth(alvo) {
  const inicio = files.filter((f) => /src\/pages\/Index\.tsx|src\/components\/(Header|Footer)\.tsx/.test(f));
  let fronteira = new Set(inicio);
  const vistos = new Set(inicio);
  for (let nivel = 1; nivel <= 4; nivel += 1) {
    const proxima = new Set();
    for (const f of fronteira) {
      const rotas = graph.get(f) || new Set();
      if (rotas.has(alvo)) return nivel;
      for (const r of rotas) {
        for (const nf of arquivosDeRota(r)) {
          if (!vistos.has(nf)) { vistos.add(nf); proxima.add(nf); }
        }
      }
    }
    if (proxima.size === 0) break;
    fronteira = proxima;
  }
  return null; // fora de alcance por navegação em até 4 níveis
}

/* ── 3. Search status (somente com evidência real do GSC) ───────────────── */
const searchStatus = new Map();
if (existsSync(DISCOVERY)) {
  try {
    const dados = JSON.parse(readFileSync(DISCOVERY, "utf8"));
    for (const item of dados.resultados ?? dados.results ?? []) {
      try {
        const p = new URL(item.url).pathname.replace(/\/$/, "");
        searchStatus.set(p, item.coorte || item.cohort || "UNKNOWN");
      } catch { /* ignora */ }
    }
  } catch { /* relatório ausente ou inválido: tudo fica UNKNOWN */ }
}

/* ── 4. Matriz ──────────────────────────────────────────────────────────── */
const rotas = [...new Set([...sitemapPaths, ...incoming.keys()])]
  .filter((r) => r.startsWith("/problemas/"))
  .sort();

const linhas = rotas.map((rota) => {
  const links = incoming.get(rota) ?? [];
  const origens = [...new Set(links.map((l) => l.arquivo))];
  const anchors = [...new Set(links.map((l) => l.anchor).filter(Boolean))].slice(0, 5);
  return {
    url: rota,
    indexavel: sitemapPaths.has(rota),
    sitemap: sitemapPaths.has(rota),
    incomingInternalLinks: origens.length,
    origens,
    anchors,
    clickDepth: clickDepth(rota),
    searchStatus: searchStatus.get(rota) ?? "UNKNOWN",
  };
});

const orfas = linhas.filter((l) => l.sitemap && l.incomingInternalLinks === 0);
// Só cobramos caminho de navegação das URLs indexáveis (as do sitemap).
const semNavegacao = linhas.filter((l) => l.sitemap && l.clickDepth === null);

const resumo = {
  generatedAt: new Date().toISOString(),
  total: linhas.length,
  noSitemap: linhas.filter((l) => l.sitemap).length,
  orfas: orfas.length,
  semNavegacao: semNavegacao.length,
  porStatus: linhas.reduce((acc, l) => {
    acc[l.searchStatus] = (acc[l.searchStatus] || 0) + 1;
    return acc;
  }, {}),
};

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/problem-discovery-coverage.json",
  `${JSON.stringify({ ...resumo, linhas }, null, 2)}\n`,
);

const md = [
  "# Cobertura de descoberta — cluster /problemas",
  "",
  `Gerado em ${resumo.generatedAt}`,
  "",
  `- URLs no cluster: **${resumo.total}**`,
  `- No sitemap: **${resumo.noSitemap}**`,
  `- Órfãs (sitemap sem link interno): **${resumo.orfas}**`,
  `- Sem caminho de navegação em até 4 níveis: **${resumo.semNavegacao}**`,
  "",
  "| URL | Indexável | Sitemap | Links internos | Click depth | Search status |",
  "| --- | --- | --- | ---: | ---: | --- |",
  ...linhas.map(
    (l) =>
      `| ${l.url} | ${l.indexavel ? "sim" : "não"} | ${l.sitemap ? "sim" : "não"} | ${l.incomingInternalLinks} | ${l.clickDepth ?? "—"} | ${l.searchStatus} |`,
  ),
  "",
  "## Origem dos links por URL",
  "",
  ...linhas.flatMap((l) => [
    `### ${l.url}`,
    l.origens.length ? l.origens.map((o) => `- ${o}`).join("\n") : "- (nenhum link interno)",
    l.anchors.length ? `\nÂncoras observadas: ${l.anchors.map((a) => `\`${a}\``).join(", ")}` : "",
    "",
  ]),
].join("\n");
writeFileSync("reports/problem-discovery-coverage.md", `${md}\n`);

// Espelho enxuto e público (sem dados sensíveis) para o painel /admin.
writeFileSync(
  "public/problem-discovery-status.json",
  `${JSON.stringify(
    {
      generatedAt: resumo.generatedAt,
      resumo: { total: resumo.total, orfas: resumo.orfas, semNavegacao: resumo.semNavegacao, porStatus: resumo.porStatus },
      urls: linhas.map((l) => ({
        url: l.url,
        sitemap: l.sitemap,
        links: l.incomingInternalLinks,
        clickDepth: l.clickDepth,
        searchStatus: l.searchStatus,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `[problem-discovery] ${resumo.total} URLs · ${resumo.orfas} órfã(s) · ${resumo.semNavegacao} sem navegação · relatórios em reports/.`,
);
