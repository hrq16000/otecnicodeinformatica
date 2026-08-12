// Testes unitários do edge router — sem Cloudflare real.
// Execução: npm run cf:edge:test
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { compileManifest, decide, normalizePath, assertManifestSane } from "./edge-router.mjs";
import { BASE_URL, SITE_DOMAIN } from "./site-env.mjs";

const manifest = JSON.parse(readFileSync("dist/route-manifest.json", "utf8"));
const m = compileManifest(manifest);
const req = (pathname, extra = {}) => ({ host: SITE_DOMAIN, method: "GET", pathname, search: "", ...extra });

test("manifesto passa no fail-safe de quantidades mínimas", () => {
  assert.deepEqual(assertManifestSane(m), []);
});

test("host inesperado é recusado", () => {
  assert.equal(decide(req("/", { host: "exemplo.com" }), m).action, "reject");
  {
    const d = decide(req("/servicos/manutencao-de-notebook", { host: `www.${SITE_DOMAIN}`, search: "?utm_source=x" }), m);
    assert.equal(d.action, "redirect");
    assert.equal(d.status, 308);
    assert.equal(d.location, `https://${SITE_DOMAIN}/servicos/manutencao-de-notebook?utm_source=x`);
  }
});

test("rotas válidas vão para a origem", () => {
  const rotas = ["/", "/servicos", "/faq", "/precos-e-politicas", "/contato", "/blog"].filter(
    (p) => p === "/" || manifest.validExact.includes(p),
  );
  assert.ok(rotas.length >= 3, "amostra de rotas válidas insuficiente");
  for (const p of rotas) assert.equal(decide(req(p), m).action, "proxy", p);
});

test("amostra ampla do manifesto é proxy", () => {
  const amostra = manifest.validExact.filter((p) => !p.includes(":")).slice(0, 120);
  for (const p of amostra) assert.equal(decide(req(p), m).action, "proxy", p);
});

test("aliases retornam 301 de salto único", () => {
  let checados = 0;
  for (const r of manifest.redirects ?? []) {
    const d = decide(req(r.from), m);
    assert.equal(d.status, 301, r.from);
    assert.equal(d.location, r.to);
    // Destino não pode ser, por sua vez, outro alias (salto único).
    assert.equal(decide(req(new URL(r.to, BASE_URL).pathname), m).action !== "redirect", true, r.to);
    checados += 1;
  }
  assert.ok(checados > 0);
});

test("query string é preservada no 301", () => {
  const r = (manifest.redirects ?? [])[0];
  if (!r) return;
  const d = decide(req(r.from, { search: "?utm_source=x" }), m);
  assert.ok(d.location.endsWith("?utm_source=x"));
});

const INVALIDAS = [
  "/rota-que-nao-existe",
  "/servicos/inventado",
  "/servico-inexistente-curitiba",
  "/bairros/bairro-inventado",
  "/tecnico-informatica-cidade-inventada",
  "/marcas/marca-inventada-xyz",
  "/problemas/problema-inventado-xyz",
  "/procedimentos/procedimento-inventado-xyz",
  "/wp-admin",
  "/wp-login.php",
  "/wordpress/wp-admin/setup-config.php",
  "/xmlrpc.php",
  "/index.php",
  "/config.php",
  "/.env",
  "/.git/config",
  "/admin.php",
  "/phpmyadmin",
  "/assets/nao-existe.js",
  "/assets/index-DEADBEEF.css",
  "/images/inexistente.png",
  "/fonts/inexistente.woff2",
  "/lovable-uploads/inexistente.png",
  "/blog/artigo-que-nunca-existiu",
  "/a/b/c/d/e/f/g",
  "/servicos/../../etc/passwd",
  "/%2e%2e%2f%2e%2e%2fetc%2fpasswd",
  "/rota%20inexistente",
  "/rota%2520duplo-encoding",
  "/ROTA-MAIUSCULA-INEXISTENTE",
  "/servicos-inexistente/",
  "/servicos//inexistente",
  "/./inexistente",
  "/faq/inexistente",
  "/contato/inexistente",
  "/precos-e-politicas/inexistente",
  "/blog/page/999",
  "/feed",
  "/rss.xml",
  "/atom.xml",
  "/sitemap-inexistente.xml",
  "/robots.txt.bak",
  "/backup.zip",
  "/dump.sql",
  "/api/v1/inexistente",
  "/graphql",
  "/telefone-inexistente",
  "/orcamento-inexistente",
  "/promocao-inexistente",
  "/curitiba/inexistente",
  "/tecnico/inexistente",
];

test("pelo menos 50 URLs inexistentes retornam 404 real", () => {
  assert.ok(INVALIDAS.length >= 50, `apenas ${INVALIDAS.length} casos`);
  for (const p of INVALIDAS) {
    const d = decide(req(p), m);
    assert.equal(d.status, 404, `${p} deveria ser 404, veio ${d.action}`);
  }
});

test("assets existentes passam e inexistentes viram 404", () => {
  const existente = (manifest.assetFiles ?? []).find((f) => f.endsWith(".js") || f.endsWith(".css"));
  assert.ok(existente, "manifesto sem assets emitidos");
  assert.equal(decide(req(existente), m).action, "asset");
  assert.equal(decide(req("/assets/inexistente-123.js"), m).status, 404);
});

test("robots e sitemap emitidos são servidos", () => {
  for (const f of ["/robots.txt", "/sitemap.xml"]) {
    if ((manifest.assetFiles ?? []).includes(f)) assert.equal(decide(req(f), m).action, "asset", f);
  }
});

test("normalização de paths", () => {
  assert.equal(normalizePath("/servicos/"), "/servicos");
  assert.equal(normalizePath("//servicos//"), "/servicos");
  assert.equal(normalizePath("/a/./b"), "/a/b");
  assert.equal(normalizePath("/a/../b"), "/b");
  assert.equal(normalizePath("/../etc"), null);
  assert.equal(normalizePath("servicos"), null);
  assert.equal(normalizePath("/%C3%A9"), "/é");
  assert.equal(normalizePath("/%zz"), null);
});

test("rotas administrativas e noindex válidas continuam sendo proxy", () => {
  for (const p of manifest.validExact.filter((x) => x.startsWith("/admin")).slice(0, 5)) {
    assert.equal(decide(req(p), m).action, "proxy", p);
  }
});

test("métodos não alteram a classificação da rota", () => {
  for (const method of ["GET", "HEAD", "OPTIONS", "POST", "PUT"]) {
    assert.equal(decide(req("/", { method }), m).action, "proxy");
    assert.equal(decide(req("/rota-inexistente-xyz", { method }), m).status, 404);
  }
});
