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

// ─────────────────────────────────────────────────────────────
// CENÁRIOS-LIMITE (fail-closed): www vs raiz, query, assets parecidos
// e caminhos de borda. Nenhum deles pode virar 200 acidental.
// ─────────────────────────────────────────────────────────────

test("www vs apex: sempre 308 para o apex, preservando path, query e trailing slash", () => {
  const casos = [
    ["/", "", `${BASE_URL}/`],
    ["/servicos", "?utm_source=ads&utm_medium=cpc", `${BASE_URL}/servicos?utm_source=ads&utm_medium=cpc`],
    ["/rota-que-nao-existe", "", `${BASE_URL}/rota-que-nao-existe`],
    ["/assets/inexistente.js", "", `${BASE_URL}/assets/inexistente.js`],
  ];
  for (const [pathname, search, esperado] of casos) {
    const d = decide(req(pathname, { host: `www.${SITE_DOMAIN}`, search }), m);
    assert.equal(d.status, 308, pathname);
    assert.equal(d.location, esperado, pathname);
  }
  // Host com porta explícita continua reconhecido.
  assert.equal(decide(req("/", { host: `www.${SITE_DOMAIN}:443` }), m).status, 308);
  // Subdomínio não previsto nunca é redirecionado — é recusado.
  assert.equal(decide(req("/", { host: `staging.${SITE_DOMAIN}` }), m).action, "reject");
});

test("query string nunca transforma rota inexistente em válida", () => {
  for (const search of ["?utm_source=x", "?page=2", "?a=1&b=2", "?__proto__=1"]) {
    assert.equal(decide(req("/rota-fantasma-xyz", { search }), m).action, "notfound", search);
  }
  // Em rota válida, a query é irrelevante para a decisão.
  assert.equal(decide(req("/servicos", { search: "?utm_campaign=abc" }), m).action, "proxy");
});

test("assets com paths parecidos: só o que o build emitiu passa", () => {
  const reais = (manifest.assetFiles ?? []).map((f) => (f.startsWith("/") ? f : `/${f}`));
  assert.ok(reais.length >= 5, "manifesto sem assets suficientes");
  for (const real of reais.slice(0, 8)) {
    assert.equal(decide(req(real), m).action, "asset", real);
    // Vizinhos quase idênticos precisam cair em 404.
    const parecidos = [
      real.replace(/(\.[a-z0-9]+)$/i, "-copy$1"),
      real.replace(/(\.[a-z0-9]+)$/i, "$1.map"),
      `${real}.bak`,
      real.toUpperCase() === real ? `${real}x` : real.toUpperCase(),
    ];
    for (const p of parecidos) {
      const d = decide(req(p), m);
      if (d.action === "asset") continue; // colisão real no manifesto: aceitável
      assert.equal(d.action, "notfound", p);
    }
  }
});

test("caminhos de borda malformados não escapam nem viram 200", () => {
  const malformados = [
    "//evil.com",
    "/../../etc/passwd",
    "/servicos/../../..",
    "/%2e%2e/%2e%2e/etc/passwd",
    "/rota\u0000nula",
    "servicos",
    "",
  ];
  for (const p of malformados) {
    const d = decide(req(p), m);
    assert.ok(["notfound", "reject", "proxy"].includes(d.action), p);
    assert.notEqual(d.action, "asset", p);
    if (d.action === "proxy") {
      // Só é aceitável quando a normalização resolveu para uma rota real.
      assert.ok(m.exact.has(normalizePath(p)), p);
    }
  }
  // Path traversal jamais vira asset ou redirect aberto.
  assert.equal(decide(req("/../../secret.env"), m).action, "notfound");
});

test("trailing slash e barras duplicadas resolvem para a mesma decisão", () => {
  const base = manifest.validExact.find((p) => p !== "/" && !p.includes(":"));
  assert.ok(base, "sem rota válida para o teste");
  for (const variante of [`${base}/`, `//${base.slice(1)}`, `${base}//`]) {
    assert.equal(decide(req(variante), m).action, "proxy", variante);
  }
});

test("fail-closed: manifesto degradado é detectado antes de publicar", () => {
  const vazio = compileManifest({ validExact: ["/"], redirects: [], assetFiles: [] });
  const problemas = assertManifestSane(vazio);
  assert.ok(problemas.length >= 3, "manifesto degradado deveria acusar todos os mínimos");
  // Mesmo degradado, o router nunca inventa 200 para rota inexistente.
  assert.equal(decide(req("/qualquer-coisa"), vazio).action, "notfound");
});
