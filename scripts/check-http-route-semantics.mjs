#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// RODADA 3P.1 — GATE DE SEMÂNTICA HTTP DE ROTAS (check:http-route-semantics)
//
// Valida as quatro classes de URL contra o build servido com paridade de
// produção (scripts/serve-dist.mjs) ou contra uma base remota (--base=URL):
//
//   INDEXABLE     → 200 + robots index + canonical self
//   NOINDEX_VALID → 200 + robots noindex + canonical da PRÓPRIA rota
//   REDIRECT      → 301/308 + destino correto (salto único)
//   NOT_FOUND     → 404 + noindex + sem canonical da home
//   ASSET AUSENTE → 404 (nunca HTML)
//
// O ponto central: nenhuma dessas classes pode receber o title/canonical/
// robots da HOME antes da hidratação.
// ─────────────────────────────────────────────────────────────
import { promises as fs } from "node:fs";
import path from "node:path";
import { createServer } from "./serve-dist.mjs";
import { BASE_URL } from "./lib/site-env.mjs";

const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith("--base="))?.split("=")[1];
const DIST = path.resolve("dist");
const PORT = 4191;

const INDEXABLE = ["/", "/servicos", "/servicos/manutencao-de-notebook", "/tecnico-informatica-curitiba", "/bairros/batel"];

const UNKNOWN = [
  "/isto-nao-existe-938472",
  "/servicos/banana-quantica",
  "/bairros/bairro-que-nao-existe",
  "/blog/artigo-inexistente-938472",
  "/qualquer/coisa/profundamente/inexistente",
  "/pagina-inexistente?utm_source=test",
  "/Sobre-Que-Nao-Existe",
];

const MISSING_ASSETS = ["/assets/arquivo-que-nao-existe.js", "/imagem-que-nao-existe.png", "/dados-inexistentes.json"];

const failures = [];
let checks = 0;
const assert = (cond, msg) => {
  checks += 1;
  if (!cond) failures.push(msg);
};

const meta = (html, re) => (html.match(re) || [])[1] || "";
const robotsOf = (html) => meta(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
const canonicalOf = (html) => meta(html, /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
const titleOf = (html) => meta(html, /<title>([\s\S]*?)<\/title>/i);

async function get(base, url, redirect = "manual") {
  const res = await fetch(base + url, { redirect });
  return { status: res.status, location: res.headers.get("location"), body: await res.text() };
}

async function main() {
  let server;
  let base = baseArg;
  if (!base) {
    server = await createServer({ distDir: DIST });
    await new Promise((r) => server.listen(PORT, r));
    base = `http://localhost:${PORT}`;
  }
  const site = (baseArg || BASE_URL).replace(/\/$/, "");
  const manifest = JSON.parse(await fs.readFile(path.join(DIST, "route-manifest.json"), "utf8"));
  const curated = new Set((manifest.curated || []).map((c) => (typeof c === "string" ? c : c.path)));
  const homeHtml = (await get(base, "/")).body;
  const homeTitle = titleOf(homeHtml);

  // 1. INDEXABLE
  for (const p of INDEXABLE) {
    const r = await get(base, p);
    assert(r.status === 200, `[indexable] ${p} → ${r.status} (esperado 200)`);
    assert(/^index/i.test(robotsOf(r.body)), `[indexable] ${p} robots="${robotsOf(r.body)}" (esperado index)`);
    assert(
      canonicalOf(r.body) === `${site}${p === "/" ? "/" : p}`,
      `[indexable] ${p} canonical="${canonicalOf(r.body)}" (esperado ${site}${p})`,
    );
  }

  // 2. NOINDEX_VALID — famílias dinâmicas preservadas como 200.
  const families = [/^\/bairros\//, /^\/servicos\/[^/]+\/[^/]+$/, /^\/arrumar-pc\//, /^\/marcas\//, /^\/problemas\//];
  const pool = (manifest.validExact || []).filter((p) => !curated.has(p));
  const noindexSample = [];
  for (const fam of families) {
    const hit = pool.find((p) => fam.test(p));
    if (hit) noindexSample.push(hit);
  }
  assert(noindexSample.length >= 3, `[noindex] amostra insuficiente de rotas dinâmicas válidas (${noindexSample.length})`);
  for (const p of noindexSample) {
    const r = await get(base, p);
    assert(r.status === 200, `[noindex] ${p} → ${r.status} (esperado 200)`);
    assert(/noindex/i.test(robotsOf(r.body)), `[noindex] ${p} robots="${robotsOf(r.body)}" (esperado noindex)`);
    assert(canonicalOf(r.body) === `${site}${p}`, `[noindex] ${p} canonical="${canonicalOf(r.body)}" (esperado self)`);
    assert(titleOf(r.body) !== homeTitle, `[noindex] ${p} reusa o <title> da home`);
  }

  // 3. REDIRECT
  for (const rule of (manifest.redirects || []).slice(0, 5)) {
    const r = await get(base, rule.from);
    assert([301, 308].includes(r.status), `[redirect] ${rule.from} → ${r.status} (esperado 301/308)`);
    assert(r.location === rule.to, `[redirect] ${rule.from} → ${r.location} (esperado ${rule.to})`);
  }

  // 4. NOT_FOUND
  for (const p of UNKNOWN) {
    const r = await get(base, p);
    assert(r.status === 404, `[404] ${p} → ${r.status} (esperado 404)`);
    assert(/noindex/i.test(robotsOf(r.body)), `[404] ${p} sem meta robots noindex`);
    const canon = canonicalOf(r.body);
    assert(!canon, `[404] ${p} emitiu canonical="${canon}" (proibido)`);
    assert(titleOf(r.body) !== homeTitle, `[404] ${p} reusa o <title> da home`);
  }

  // 5. ASSETS INEXISTENTES
  for (const p of MISSING_ASSETS) {
    const r = await get(base, p);
    assert(r.status === 404, `[asset] ${p} → ${r.status} (esperado 404)`);
    assert(!/<div id="root"/.test(r.body), `[asset] ${p} devolveu HTML de aplicação`);
  }

  if (server) await new Promise((r) => server.close(r));

  console.log("── Gate check:http-route-semantics ──");
  console.log(`  base: ${base} | verificações: ${checks}`);
  console.log(`  noindex amostrados: ${noindexSample.join(", ")}`);
  if (failures.length) {
    console.error(`\n✖ ${failures.length} falha(s):`);
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log("✔ indexáveis 200/index, noindex 200/noindex com canonical próprio, redirects 301, desconhecidas 404.");
}

main().catch((err) => {
  console.error("[http-route-semantics] erro:", err);
  process.exit(1);
});
