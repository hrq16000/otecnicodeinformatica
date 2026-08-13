// @ts-nocheck
// Testes unitários dos Bulk Redirects — nenhuma chamada à Cloudflare.
// Execução: npm run migration:cf:bulk:test
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BASE_URL, SITE_DOMAIN } from "./site-env.mjs";
import {
  buildItems,
  buildPlan,
  validateMatrix,
  chunk,
  diffItems,
  matrixHash,
  BATCH_SIZE,
  LIST_NAME,
} from "./bulk-redirects.mjs";

const map = JSON.parse(readFileSync("redirects/tecnicocuritiba.map.json", "utf8"));
const items = buildItems(map);

test("matriz carrega todas as entradas", () => {
  assert.equal(items.length, map.rules.length);
  assert.ok(items.length >= 600, `esperado ~612, veio ${items.length}`);
});

test("validação: zero duplicidade, loop ou chain", () => {
  const v = validateMatrix(map);
  assert.deepEqual(v.errors, []);
  assert.equal(v.stats.duplicateSources, 0);
  assert.equal(v.stats.chains, 0);
});

test("todas as entradas são 301 com destino HTTPS absoluto", () => {
  for (const i of items) {
    assert.equal(i.redirect.status_code, 301);
    assert.match(i.redirect.target_url, /^https:\/\//);
    assert.ok(!i.redirect.source_url.startsWith("http"), "source_url sem esquema");
  }
});

test("correspondência exata e query preservada", () => {
  for (const i of items) {
    assert.equal(i.redirect.subpath_matching, false);
    assert.equal(i.redirect.include_subdomains, false);
    assert.equal(i.redirect.preserve_query_string, true);
  }
});

test("nenhum destino para a home sem justificativa", () => {
  const home = map.target_domain.replace(/\/$/, "");
  const suspeitos = map.rules.filter((r) => r.to.replace(/\/$/, "") === home && r.from !== "/");
  assert.deepEqual(suspeitos, []);
});

test("lotes respeitam o limite da API", () => {
  const batches = chunk(items);
  assert.equal(batches.length, Math.ceil(items.length / BATCH_SIZE));
  for (const b of batches) assert.ok(b.length <= BATCH_SIZE);
});

test("idempotência: diff vazio contra o mesmo conjunto", () => {
  assert.equal(diffItems(items, items).identical, true);
  const menos = items.slice(0, items.length - 1);
  const d = diffItems(menos, items);
  assert.equal(d.toAdd.length, 1);
  assert.equal(d.toRemove.length, 0);
});

test("hash é determinístico e o plano expõe recursos determinísticos", () => {
  assert.equal(matrixHash(items), matrixHash(buildItems(map)));
  const plan = buildPlan(map);
  assert.equal(plan.listName, LIST_NAME);
  assert.equal(plan.phase, "http_request_redirect");
  assert.equal(plan.count, items.length);
});

test("matriz inválida é reprovada", () => {
  const ruim = {
    source_domain: "https://tecnicocuritiba.com.br",
    target_domain: BASE_URL,
    rules: [
      { from: "/a", to: "http://o domínio configurado/a", status: 301 },
      { from: "/a", to: `${BASE_URL}/b`, status: 302 },
    ],
  };
  const v = validateMatrix(ruim);
  assert.equal(v.ok, false);
  assert.ok(v.errors.some((e) => e.includes("HTTPS")));
  assert.ok(v.errors.some((e) => e.includes("301")));
  assert.ok(v.errors.some((e) => e.includes("duplicadas")));
});
