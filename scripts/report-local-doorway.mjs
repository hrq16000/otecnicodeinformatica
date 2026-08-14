#!/usr/bin/env node
/**
 * RELATÓRIO — RISCO DE DOORWAY E COBERTURA LOCAL (Rodada 5B / Rota B)
 *
 * Exporta, a partir do dist gerado:
 *   reports/local-doorway.csv   — matriz par a par por família
 *   reports/local-doorway.html  — auditoria visual com blocos coincidentes
 *   reports/local-doorway.json  — dados brutos (CI e dashboards)
 *
 * Métricas por par:
 *   jaccard          — 5-gramas do <main>
 *   semLocalidade    — mesmo cálculo removendo os nomes de cidade/bairro
 *   introSim         — 4-gramas das 120 primeiras palavras
 *   h2Overlap        — proporção de H2 coincidentes
 *   faqOverlap       — proporção de perguntas de FAQ coincidentes
 *   blocosTop        — as maiores sequências de texto idênticas entre as duas
 *
 * Cobertura (Lote Local 1): robots, canonical, presença em sitemap e palavras.
 * Somente leitura — não bloqueia o build (o gate bloqueante é check:local-doorway).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { resolveLocal, LOTE_LOCAL_1 } from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";
const outDir = resolve("reports");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const LOCALIDADES = [
  "curitiba", "sao jose dos pinhais", "sao jose", "pinhais", "colombo", "araucaria",
  "campo largo", "batel", "agua verde", "centro", "portao", "cic", "cidade industrial",
  "regiao metropolitana", "rmc",
];

const semAcento = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function htmlPath(p) {
  const clean = p === "/" ? "/index" : p.replace(/\/$/, "");
  for (const c of [resolve(dist, `.${clean}.html`), resolve(dist, `.${clean}/index.html`)]) {
    if (existsSync(c)) return c;
  }
  return null;
}

function textoDe(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return semAcento(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " "),
  )
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ngrams = (t, n = 5) => {
  const w = t.split(" ").filter(Boolean);
  const s = new Set();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" "));
  return s;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
};

const semLocalidade = (t) => {
  let x = t;
  for (const l of LOCALIDADES) x = x.split(l).join(" ");
  return x.replace(/\s+/g, " ").trim();
};

/** Maiores sequências contíguas de palavras idênticas entre dois textos. */
function blocosCoincidentes(a, b, minPalavras = 6, limite = 3) {
  const wa = a.split(" ");
  const setB = ngrams(b, minPalavras);
  const achados = [];
  let i = 0;
  while (i + minPalavras <= wa.length) {
    let n = minPalavras;
    if (!setB.has(wa.slice(i, i + n).join(" "))) {
      i++;
      continue;
    }
    while (i + n + 1 <= wa.length && b.includes(wa.slice(i, i + n + 1).join(" "))) n++;
    achados.push({ palavras: n, texto: wa.slice(i, i + n).join(" ") });
    i += n;
  }
  return achados.sort((x, y) => y.palavras - x.palavras).slice(0, limite);
}

// ── Sitemap ───────────────────────────────────────────────────────────────
const sitemapUrls = new Set();
if (existsSync(dist)) {
  for (const f of readdirSync(dist).filter((x) => /^sitemap.*\.xml$/.test(x) && !/images|news|index/.test(x))) {
    for (const m of readFileSync(resolve(dist, f), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        sitemapUrls.add(new URL(m[1]).pathname.replace(/\/$/, "") || "/");
      } catch {
        sitemapUrls.add(m[1]);
      }
    }
  }
}

// ── Coleta ────────────────────────────────────────────────────────────────
const paginas = [];
for (const path of ["/", ...LOTE_LOCAL_1]) {
  const file = htmlPath(path);
  const decisao = path === "/" ? { family: "HOME", indexability: "index", canonical: "/", sitemap: true } : resolveLocal(path);
  if (!file) {
    paginas.push({ path, decisao, ausente: true });
    continue;
  }
  const html = readFileSync(file, "utf8");
  const texto = textoDe(html);
  paginas.push({
    path,
    decisao,
    ausente: false,
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "",
    description: html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "",
    h1: (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    robots: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "",
    canonical: (() => {
      const c = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? "";
      try {
        return c ? new URL(c).pathname : c;
      } catch {
        return c;
      }
    })(),
    h2: [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
      semAcento(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(),
    ),
    faqs: [...html.matchAll(/"@type"\s*:\s*"Question"\s*,\s*"name"\s*:\s*"([^"]+)"/g)].map((m) => semAcento(m[1]).trim()),
    texto,
    intro: texto.split(" ").slice(0, 120).join(" "),
    palavras: texto.split(" ").filter(Boolean).length,
    grams: ngrams(texto),
    noSitemap: sitemapUrls.has(path.replace(/\/$/, "") || "/"),
  });
}

const vivas = paginas.filter((p) => !p.ausente);
const porFamilia = new Map();
for (const p of vivas) {
  if (p.decisao.indexability !== "index") continue;
  const f = p.path === "/" ? "HOME_CIDADE" : p.decisao.family;
  if (!porFamilia.has(f)) porFamilia.set(f, []);
  porFamilia.get(f).push(p);
}
// A Home é comparada contra a landing da cidade (par crítico da Rodada 5B).
const homePage = vivas.find((p) => p.path === "/");
const curitiba = vivas.find((p) => p.path === "/tecnico-informatica-curitiba");
if (homePage && curitiba) porFamilia.set("HOME_CIDADE", [homePage, curitiba]);

const proporcao = (a, b) => {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  return a.filter((x) => setB.has(x)).length / Math.max(a.length, b.length);
};

const pares = [];
for (const [familia, lista] of porFamilia) {
  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      const a = lista[i];
      const b = lista[j];
      pares.push({
        familia,
        a: a.path,
        b: b.path,
        jaccard: +jaccard(a.grams, b.grams).toFixed(4),
        semLocalidade: +jaccard(ngrams(semLocalidade(a.texto)), ngrams(semLocalidade(b.texto))).toFixed(4),
        introSim: +jaccard(ngrams(a.intro, 4), ngrams(b.intro, 4)).toFixed(4),
        h2Overlap: +proporcao(a.h2, b.h2).toFixed(4),
        faqOverlap: +proporcao(a.faqs, b.faqs).toFixed(4),
        ordemFaqIgual: a.faqs.length > 1 && a.faqs.join("|") === b.faqs.join("|"),
        blocosTop: blocosCoincidentes(a.texto, b.texto),
      });
    }
  }
}
pares.sort((x, y) => y.jaccard - x.jaccard);

const cobertura = vivas.map((p) => ({
  path: p.path,
  familia: p.decisao.family,
  indexabilidade: p.decisao.indexability,
  robots: p.robots,
  canonical: p.canonical,
  canonicalEsperado: p.decisao.canonical ?? p.path,
  noSitemap: p.noSitemap,
  sitemapEsperado: !!p.decisao.sitemap,
  palavras: p.palavras,
  title: p.title,
  description: p.description,
  h1: p.h1,
  conforme:
    (p.decisao.indexability === "index") !== /noindex/i.test(p.robots) &&
    p.noSitemap === !!p.decisao.sitemap,
}));

// ── CSV ───────────────────────────────────────────────────────────────────
const csvEsc = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [
  ["familia", "url_a", "url_b", "jaccard", "sem_localidade", "intro_sim", "h2_overlap", "faq_overlap", "ordem_faq_igual", "maior_bloco_palavras", "maior_bloco_texto"].join(","),
  ...pares.map((p) =>
    [
      p.familia, p.a, p.b, p.jaccard, p.semLocalidade, p.introSim, p.h2Overlap, p.faqOverlap,
      p.ordemFaqIgual ? "sim" : "nao",
      p.blocosTop[0]?.palavras ?? 0,
      p.blocosTop[0]?.texto ?? "",
    ].map(csvEsc).join(","),
  ),
].join("\n");
writeFileSync(resolve(outDir, "local-doorway.csv"), `${csv}\n`);

const csvCob = [
  ["url", "familia", "indexabilidade", "robots", "canonical", "canonical_esperado", "no_sitemap", "sitemap_esperado", "palavras", "conforme"].join(","),
  ...cobertura.map((c) =>
    [c.path, c.familia, c.indexabilidade, c.robots, c.canonical, c.canonicalEsperado, c.noSitemap, c.sitemapEsperado, c.palavras, c.conforme ? "sim" : "NAO"]
      .map(csvEsc)
      .join(","),
  ),
].join("\n");
writeFileSync(resolve(outDir, "local-coverage.csv"), `${csvCob}\n`);

// ── HTML ──────────────────────────────────────────────────────────────────
const risco = (p) =>
  p.jaccard >= 0.45 || p.semLocalidade >= 0.82 || p.ordemFaqIgual
    ? "alto"
    : p.jaccard >= 0.3 || p.semLocalidade >= 0.6 || p.introSim >= 0.35
      ? "medio"
      : "baixo";

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Auditoria de doorway local — Lote Local 1</title>
<style>
 body{font:14px/1.5 system-ui,sans-serif;margin:0;padding:32px;background:#0f1419;color:#e6edf3}
 h1,h2{font-weight:700} h1{font-size:24px} h2{font-size:18px;margin-top:32px}
 table{border-collapse:collapse;width:100%;margin-top:12px;font-size:13px}
 th,td{border:1px solid #263039;padding:7px 9px;text-align:left;vertical-align:top}
 th{background:#161d24;position:sticky;top:0}
 .alto{color:#ff7b72;font-weight:700}.medio{color:#e3b341;font-weight:700}.baixo{color:#3fb950}
 code{background:#161d24;padding:1px 5px;border-radius:4px;font-size:12px}
 .meta{color:#8b949e}
</style></head><body>
<h1>Auditoria de risco de doorway — arquitetura local</h1>
<p class="meta">Gerado em ${new Date().toISOString()} · ${vivas.length} páginas · ${pares.length} pares comparados.
Limites bloqueantes: Jaccard &lt; 0,45 · sem-localidade &lt; 0,82 · ordem de FAQ não pode repetir.</p>

<h2>1. Pares por família</h2>
<table><thead><tr><th>Risco</th><th>Família</th><th>A</th><th>B</th><th>Jaccard</th><th>Sem localidade</th><th>Intro</th><th>H2</th><th>FAQ</th><th>Maior bloco coincidente</th></tr></thead><tbody>
${pares
  .map(
    (p) => `<tr><td class="${risco(p)}">${risco(p)}</td><td>${p.familia}</td><td><code>${esc(p.a)}</code></td><td><code>${esc(p.b)}</code></td>
<td>${p.jaccard.toFixed(3)}</td><td>${p.semLocalidade.toFixed(3)}</td><td>${p.introSim.toFixed(3)}</td><td>${p.h2Overlap.toFixed(2)}</td><td>${p.faqOverlap.toFixed(2)}${p.ordemFaqIgual ? " (ordem igual)" : ""}</td>
<td>${p.blocosTop.length ? p.blocosTop.map((b) => `<div><b>${b.palavras}p</b> — ${esc(b.texto.slice(0, 180))}</div>`).join("") : '<span class="baixo">nenhum bloco ≥ 6 palavras</span>'}</td></tr>`,
  )
  .join("\n")}
</tbody></table>

<h2>2. Cobertura (robots · canonical · sitemap)</h2>
<table><thead><tr><th>URL</th><th>Família</th><th>Política</th><th>robots</th><th>canonical</th><th>Sitemap</th><th>Palavras</th><th>Conforme</th></tr></thead><tbody>
${cobertura
  .map(
    (c) => `<tr><td><code>${esc(c.path)}</code></td><td>${c.familia}</td><td>${c.indexabilidade}</td><td>${esc(c.robots)}</td>
<td>${esc(c.canonical)}${c.canonical === c.canonicalEsperado ? "" : ` <span class="alto">≠ ${esc(c.canonicalEsperado)}</span>`}</td>
<td>${c.noSitemap ? "sim" : "não"} <span class="meta">(esperado ${c.sitemapEsperado ? "sim" : "não"})</span></td>
<td>${c.palavras}</td><td class="${c.conforme ? "baixo" : "alto"}">${c.conforme ? "ok" : "FALHA"}</td></tr>`,
  )
  .join("\n")}
</tbody></table>

<h2>3. Páginas declaradas sem HTML estático</h2>
<p>${paginas.filter((p) => p.ausente).length ? paginas.filter((p) => p.ausente).map((p) => `<code>${esc(p.path)}</code> (${p.decisao.indexability})`).join(" · ") : "nenhuma."}</p>
</body></html>`;
writeFileSync(resolve(outDir, "local-doorway.html"), html);

writeFileSync(
  resolve(outDir, "local-doorway.json"),
  `${JSON.stringify({ geradoEm: new Date().toISOString(), pares, cobertura }, null, 2)}\n`,
);

const altos = pares.filter((p) => risco(p) === "alto").length;
const medios = pares.filter((p) => risco(p) === "medio").length;
console.log(
  `report:local-doorway — ${pares.length} pares (${altos} alto, ${medios} médio) · ${cobertura.length} URLs de cobertura.`,
);
console.log("  reports/local-doorway.csv · reports/local-coverage.csv · reports/local-doorway.html · reports/local-doorway.json");
