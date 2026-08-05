#!/usr/bin/env node
/**
 * RELATÓRIO HTML DE AUDITORIA LOCAL
 *
 * Consolida em reports/local-audit.html:
 *   - antes/depois do sitemap (snapshot versionado em reports/sitemap-snapshot.json);
 *   - status de indexação de cada rota (canonical, robots, H1, palavras);
 *   - resultado de todos os gates SEO/E-E-A-T;
 *   - checklist de validação por página do cluster local.
 *
 * Uso:
 *   node scripts/report-local-audit.mjs            # gera o relatório
 *   node scripts/report-local-audit.mjs --snapshot # grava o snapshot atual como "antes"
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const DIST = "dist";
const BASE = "https://tecnico.curitiba.br";
const OUT_DIR = "reports";
const OUT = join(OUT_DIR, "local-audit.html");
const SNAPSHOT = join(OUT_DIR, "sitemap-snapshot.json");
const MOTHER = "/tecnico-informatica-curitiba";
const P0 = ["/", MOTHER, "/atendimento-domicilio", "/empresa-de-ti-curitiba"];
const SITEMAPS = ["public/sitemap.xml", "public/sitemap-bairros.xml", "public/sitemap-regioes.xml", "public/sitemap-servicos.xml"];

const GATES = [
  ["Links internos + sitemap", "check:internal-links"],
  ["Canibalização (P0)", "check:cannibalization"],
  ["Hierarquia local", "check:local-hierarchy"],
  ["Interlinking local", "check:local-interlinking"],
  ["JSON-LD P0", "check:jsonld-p0"],
  ["Cobertura E-E-A-T", "check:eeat"],
  ["Páginas órfãs", "check:orphan-pages"],
  ["Funil de CTA", "check:cta-funnel"],
];

if (!existsSync(DIST)) {
  console.error('✖ dist/ ausente — rode "npm run build" antes do relatório.');
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

// ── sitemap atual ─────────────────────────────────────────────────────────
const current = [];
for (const f of SITEMAPS) {
  if (!existsSync(f)) continue;
  for (const m of readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const p = m[1].replace(BASE, "") || "/";
    if (!p.endsWith(".xml")) current.push(p);
  }
}
const currentSet = [...new Set(current)].sort();

if (process.argv.includes("--snapshot")) {
  writeFileSync(SNAPSHOT, JSON.stringify({ takenAt: new Date().toISOString(), urls: currentSet }, null, 2));
  console.log(`✔ Snapshot gravado em ${SNAPSHOT} (${currentSet.length} URLs).`);
  process.exit(0);
}

const before = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, "utf8")) : null;
const beforeSet = new Set(before?.urls ?? []);
const added = before ? currentSet.filter((u) => !beforeSet.has(u)) : [];
const removed = before ? [...beforeSet].filter((u) => !currentSet.includes(u)) : [];

// ── inspeção por página ───────────────────────────────────────────────────
const localPaths = currentSet.filter((p) => p.startsWith("/bairros/") || (p.startsWith("/tecnico-informatica-") && p !== MOTHER));
const audited = [...new Set([...P0, ...localPaths])];

const pages = audited.map((path) => {
  const file = join(DIST, path === "/" ? "" : path.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) return { path, missing: true };
  const html = readFileSync(file, "utf8");
  const body = html.slice(html.indexOf("<body"));
  const text = body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const h1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const canonical = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1] ?? "";
  const robots = (html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/) || [])[1] ?? "index,follow (default)";
  const jsonld = [...html.matchAll(/application\/ld\+json/g)].length;
  const inSitemap = currentSet.includes(path);
  const links = new Set([...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, "") || "/"));
  return {
    path,
    words: text.split(" ").length,
    h1count: h1.length,
    h1: h1[0] ?? "—",
    canonical,
    canonicalOk: canonical.replace(/\/$/, "") === `${BASE}${path}`.replace(/\/$/, ""),
    robots,
    jsonld,
    inSitemap,
    toMother: path === MOTHER ? true : links.has(MOTHER),
    servicos: [...links].filter((l) => l === "/servicos" || l.startsWith("/servicos/")).length,
    eeat: /41\.723\.708\/0001-58/.test(html) && html.includes("wa.me/5541997086380"),
  };
});

// ── gates ─────────────────────────────────────────────────────────────────
const gateResults = GATES.map(([label, script]) => {
  try {
    const out = execFileSync("npm", ["run", "--silent", script], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { label, script, ok: true, output: out.trim().split("\n").slice(-6).join("\n") };
  } catch (e) {
    const out = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim();
    return { label, script, ok: false, output: out.split("\n").slice(-12).join("\n") };
  }
});

// ── HTML ──────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const badge = (ok, yes = "OK", no = "FALHA") =>
  `<span class="badge ${ok ? "ok" : "bad"}">${ok ? yes : no}</span>`;

const checklist = (p) => [
  ["Pré-renderizada em dist/", !p.missing],
  ["H1 único", p.h1count === 1],
  ["Canonical autorreferente", p.canonicalOk],
  ["Presente no sitemap", p.inSitemap],
  ["Conteúdo ≥ 300 palavras (shell)", p.words >= 300],
  ["JSON-LD presente", p.jsonld > 0],
  ["Aponta para a página-mãe", p.toMother],
  ["Aponta para serviço canônico", p.servicos > 0],
  ["Identidade E-E-A-T + canal oficial", p.eeat],
];

const rows = pages
  .map((p) => {
    if (p.missing) return `<tr class="bad"><td>${esc(p.path)}</td><td colspan="8">HTML ausente em dist/</td></tr>`;
    return `<tr>
      <td><code>${esc(p.path)}</code></td>
      <td>${p.words}</td>
      <td>${badge(p.h1count === 1, p.h1count, p.h1count)}</td>
      <td>${badge(p.canonicalOk)}</td>
      <td>${esc(p.robots)}</td>
      <td>${p.jsonld}</td>
      <td>${badge(p.inSitemap, "sim", "não")}</td>
      <td>${badge(p.toMother, "sim", "não")}</td>
      <td>${badge(p.eeat, "sim", "não")}</td>
    </tr>`;
  })
  .join("");

const checklists = pages
  .filter((p) => !p.missing)
  .map(
    (p) => `<details><summary><code>${esc(p.path)}</code> — ${checklist(p).filter(([, v]) => v).length}/${checklist(p).length} itens</summary>
      <p class="h1">H1: ${esc(p.h1)}</p>
      <ul class="check">${checklist(p).map(([label, ok]) => `<li class="${ok ? "ok" : "bad"}">${ok ? "✓" : "✗"} ${esc(label)}</li>`).join("")}</ul>
    </details>`,
  )
  .join("");

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Auditoria local — Técnico em Curitiba</title>
<style>
:root{--bg:#0f1720;--card:#16212c;--fg:#e8eef4;--mut:#9fb3c4;--ok:#16a34a;--bad:#dc2626;--acc:#12a6cf}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.6 system-ui,Arial,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:32px 20px}
h1{font-size:1.8rem;margin:0 0 4px}h2{margin:34px 0 10px;font-size:1.2rem;border-left:4px solid var(--acc);padding-left:10px}
.mut{color:var(--mut)}table{width:100%;border-collapse:collapse;background:var(--card);border-radius:10px;overflow:hidden;font-size:.9rem}
th,td{padding:9px 10px;text-align:left;border-bottom:1px solid #22303d}th{background:#1c2a36;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;color:var(--mut)}
code{background:#0d151c;padding:1px 5px;border-radius:4px}
.badge{padding:1px 8px;border-radius:99px;font-size:.75rem;font-weight:700}.badge.ok{background:rgba(22,163,74,.18);color:#4ade80}.badge.bad{background:rgba(220,38,38,.18);color:#f87171}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.card{background:var(--card);border-radius:10px;padding:14px}
details{background:var(--card);border-radius:10px;padding:10px 14px;margin-bottom:8px}summary{cursor:pointer;font-weight:600}
ul.check{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:2px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
ul.check li.ok{color:#4ade80}ul.check li.bad{color:#f87171}
pre{background:#0d151c;padding:10px;border-radius:8px;overflow:auto;font-size:.8rem;color:var(--mut);white-space:pre-wrap}
.h1{color:var(--mut);font-size:.85rem;margin:6px 0 0}
</style></head><body><div class="wrap">
<h1>Auditoria local — cluster Curitiba</h1>
<p class="mut">Gerado em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} · ${pages.length} páginas auditadas · base ${BASE}</p>

<h2>Gates automatizados</h2>
<div class="grid">${gateResults.map((g) => `<div class="card"><strong>${esc(g.label)}</strong> ${badge(g.ok)}<pre>${esc(g.output || "(sem saída)")}</pre></div>`).join("")}</div>

<h2>Sitemap: antes × depois</h2>
${
  before
    ? `<p class="mut">Snapshot anterior: ${esc(before.takenAt)} — ${beforeSet.size} URLs · atual: ${currentSet.length} URLs</p>
       <div class="grid">
         <div class="card"><strong>Adicionadas (${added.length})</strong><pre>${esc(added.join("\n") || "nenhuma")}</pre></div>
         <div class="card"><strong>Removidas (${removed.length})</strong><pre>${esc(removed.join("\n") || "nenhuma")}</pre></div>
       </div>`
    : `<p class="mut">Nenhum snapshot anterior. Rode <code>npm run report:local-audit -- --snapshot</code> para gravar a linha de base (${currentSet.length} URLs atuais).</p>`
}

<h2>Status de indexação por página</h2>
<table><thead><tr><th>Rota</th><th>Palavras</th><th>H1</th><th>Canonical</th><th>Robots</th><th>JSON-LD</th><th>Sitemap</th><th>→ Mãe</th><th>E-E-A-T</th></tr></thead><tbody>${rows}</tbody></table>

<h2>Checklist de validação por página</h2>
${checklists}
</div></body></html>`;

writeFileSync(OUT, html);
const failed = gateResults.filter((g) => !g.ok);
console.log(`✔ Relatório gerado: ${OUT} (${pages.length} páginas, ${gateResults.length} gates, ${failed.length} falha[s]).`);
if (failed.length && process.argv.includes("--enforce")) process.exit(1);
