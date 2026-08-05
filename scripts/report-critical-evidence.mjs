// RODADA 4C — Relatório HTML de evidências das 41 URLs críticas.
//
// Para cada URL crítica coleta e registra:
//   • cabeçalhos HTTP da resposta inicial (status, Location, cache, server);
//   • cadeia completa até a URL final;
//   • trecho do HTML final (head recortado);
//   • trechos de JSON-LD encontrados;
//   • ocorrências de wa.me / tel: e verificação do número legado.
//
// Uso:
//   node scripts/report-critical-evidence.mjs
//   node scripts/report-critical-evidence.mjs --limit=10
//
// Saída: reports/critical-evidence.html
import { writeFileSync, mkdirSync } from "node:fs";
import { loadMap, criticalPaths, categoryOf, scanLegacySurfaces, LEGACY_WA, OFFICIAL_WA } from "./lib/migration-critical.mjs";

const args = process.argv.slice(2);
const limit = Number(args.find((a) => a.startsWith("--limit="))?.slice(8) ?? 0) || Infinity;

const map = loadMap();
const byFrom = new Map(map.rules.map((r) => [r.from, r]));
const source = map.source_domain.replace(/\/$/, "");
const esc = (s) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

const HEADERS_OF_INTEREST = ["location", "server", "cf-cache-status", "cache-control", "content-type", "x-robots-tag"];

const collect = async (from) => {
  const rule = byFrom.get(from);
  const origin = `${source}${from}`;
  const ev = {
    origin,
    category: categoryOf(from),
    expected: rule?.to ?? null,
    chain: [],
    initialHeaders: {},
    finalUrl: "",
    finalStatus: null,
    html: "",
    jsonLd: [],
    waLinks: [],
    telLinks: [],
    legacyHits: [],
    officialFound: false,
    state: "pendente",
    error: "",
  };
  try {
    let current = origin;
    for (let i = 0; i < 6; i += 1) {
      const res = await fetch(current, { redirect: "manual" });
      if (i === 0) for (const h of HEADERS_OF_INTEREST) ev.initialHeaders[h] = res.headers.get(h) ?? "";
      ev.chain.push({ url: current, status: res.status, location: res.headers.get("location") ?? "" });
      if (![301, 302, 307, 308].includes(res.status)) {
        ev.finalUrl = current;
        ev.finalStatus = res.status;
        ev.html = await res.text();
        break;
      }
      current = new URL(res.headers.get("location"), current).toString();
    }
    if (ev.html) {
      ev.jsonLd = [...ev.html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
        .map((m) => m[1].trim().slice(0, 900))
        .slice(0, 4);
      ev.waLinks = [...new Set([...ev.html.matchAll(/https?:\/\/(?:wa\.me|api\.whatsapp\.com)[^"'\s<]*/g)].map((m) => m[0]))].slice(0, 8);
      ev.telLinks = [...new Set([...ev.html.matchAll(/tel:\+?[\d\s().-]{8,}/g)].map((m) => m[0].trim()))].slice(0, 8);
      ev.legacyHits = scanLegacySurfaces(ev.html, LEGACY_WA);
      ev.officialFound = ev.html.replace(/\D/g, "").includes(OFFICIAL_WA);
    }
    const first = ev.chain[0];
    if (first?.status === 301 && first.location === ev.expected) ev.state = ev.legacyHits.length ? "atenção" : "ok";
    else if (first?.status === 200) ev.error = "origem ainda responde 200 (redirect não publicado)";
    else ev.error = `Location divergente (esperado ${ev.expected})`;
  } catch (e) {
    ev.state = "erro";
    ev.error = e.message;
  }
  return ev;
};

const paths = criticalPaths(map).slice(0, limit);
const evidences = [];
for (const p of paths) evidences.push(await collect(p));

const badge = (s) =>
  `<span class="badge ${s}">${s}</span>`;

const section = (ev, i) => `
<section id="u${i}" class="card">
  <h2>${i + 1}. ${esc(ev.origin)} ${badge(ev.state)}</h2>
  <p class="meta">Categoria: <b>${esc(ev.category)}</b> · Destino esperado: <code>${esc(ev.expected)}</code>${ev.error ? ` · <span class="err">${esc(ev.error)}</span>` : ""}</p>

  <h3>Cabeçalhos HTTP (resposta inicial)</h3>
  <table><tbody>${Object.entries(ev.initialHeaders).map(([k, v]) => `<tr><th>${esc(k)}</th><td><code>${esc(v) || "—"}</code></td></tr>`).join("")}</tbody></table>

  <h3>Cadeia de redirect</h3>
  <ol class="chain">${ev.chain.map((c) => `<li><code>${c.status}</code> ${esc(c.url)}${c.location ? ` → ${esc(c.location)}` : ""}</li>`).join("") || "<li>—</li>"}</ol>
  <p class="meta">URL final: <code>${esc(ev.finalUrl) || "—"}</code> (status ${ev.finalStatus ?? "—"})</p>

  <h3>WhatsApp / telefone</h3>
  <p class="meta">Número oficial <code>${OFFICIAL_WA}</code>: <b>${ev.officialFound ? "presente" : "ausente"}</b> · legado <code>${LEGACY_WA}</code>: <b class="${ev.legacyHits.length ? "err" : "ok"}">${ev.legacyHits.length ? `${ev.legacyHits.length} ocorrência(s)` : "ausente"}</b></p>
  <pre>${esc([...ev.waLinks, ...ev.telLinks].join("\n")) || "—"}</pre>
  ${ev.legacyHits.length ? `<pre class="err">${esc(ev.legacyHits.map((h) => `${h.surface}: ${h.sample}`).join("\n"))}</pre>` : ""}

  <h3>JSON-LD (trechos)</h3>
  ${ev.jsonLd.length ? ev.jsonLd.map((j) => `<pre>${esc(j)}</pre>`).join("") : "<p class='meta'>Nenhum bloco JSON-LD na resposta final.</p>"}

  <h3>HTML final (head recortado)</h3>
  <pre>${esc((ev.html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? ev.html).slice(0, 1800))}</pre>
</section>`;

const okCount = evidences.filter((e) => e.state === "ok").length;
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Evidências das URLs críticas — migração ${esc(source)}</title>
<style>
:root{color-scheme:dark}
body{margin:0;padding:32px;background:#0e1116;color:#e6edf3;font:15px/1.6 ui-sans-serif,system-ui,sans-serif}
h1{font-size:26px;margin:0 0 4px}
.summary{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:16px 20px;margin:20px 0}
.card{background:#12171f;border:1px solid #262d36;border-radius:12px;padding:18px 22px;margin:16px 0}
h2{font-size:18px;margin:0 0 6px}h3{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#8b949e;margin:18px 0 6px}
code{background:#20262e;padding:1px 5px;border-radius:4px;font-size:13px;word-break:break-all}
pre{background:#0b0f14;border:1px solid #262d36;border-radius:8px;padding:12px;overflow:auto;max-height:320px;font-size:12.5px;white-space:pre-wrap;word-break:break-word}
table{border-collapse:collapse;width:100%}th{text-align:left;color:#8b949e;font-weight:600;width:180px;padding:3px 8px 3px 0;vertical-align:top}
td{padding:3px 0}
.meta{color:#9aa4af;font-size:13.5px;margin:4px 0}
.err{color:#ff7b72}.ok{color:#3fb950}
.badge{font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:2px 8px;border-radius:99px;border:1px solid #30363d;vertical-align:middle}
.badge.ok{background:#0f2f1b;color:#3fb950}.badge.pendente{background:#3a2a08;color:#e3b341}
.badge\\.atenção,.badge{}
.badge.erro,.badge.divergente{background:#3a1414;color:#ff7b72}
ol.chain{margin:0;padding-left:20px}
nav a{color:#58a6ff;text-decoration:none;margin-right:10px;font-size:13px}
</style></head>
<body>
<h1>Evidências das URLs críticas</h1>
<p class="meta">Origem: <code>${esc(source)}</code> → destino: <code>${esc(map.target_domain)}</code> · gerado em ${new Date().toISOString()}</p>
<div class="summary">
  <b>${okCount}/${evidences.length}</b> URLs com 301 e Location exato.
  Matriz: <b>${map.rules.length}</b> regras · URLs mantidas: <b>${(map.kept_urls ?? []).length}</b>.
  <p class="meta">Aprovação: revise cada bloco abaixo (headers, cadeia, JSON-LD e ausência do número legado) antes de assinar a publicação.</p>
  <nav>${evidences.map((e, i) => `<a href="#u${i}">${i + 1}</a>`).join("")}</nav>
</div>
${evidences.map(section).join("")}
</body></html>`;

mkdirSync("reports", { recursive: true });
writeFileSync("reports/critical-evidence.html", html);
console.log(`report:critical-evidence — ${okCount}/${evidences.length} ok · reports/critical-evidence.html`);
