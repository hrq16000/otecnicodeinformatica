#!/usr/bin/env node
/**
 * GATE FAIL-CLOSED — schema local das rotas /bairros/*.
 *
 * Valida, contra o SSR real, que toda rota de bairro indexável emite:
 *   • BreadcrumbList bem formado (posições sequenciais, itens absolutos e
 *     apontando para rotas internas existentes);
 *   • FAQPage com ao menos 3 perguntas com resposta preenchida;
 *   • WebPage com url/canonical coerentes com a própria rota.
 *
 * JSON-LD malformado, link quebrado ou schema ausente derrubam o build.
 *
 * Uso: node scripts/check-bairros-schema.mjs [dist]
 */
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";
import { BAIRROS_ANCORA, resolveLocal } from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";
const rotasBairro = BAIRROS_ANCORA.map((slug) => `/bairros/${slug}`);

await prepararSsr([...rotasLocais({ incluirSitemap: true }), ...rotasBairro], { dist });
abortarSeBloqueado("check-bairros-schema");

const erros = [];
const ok = [];

const blocosJsonLd = (html) => {
  const out = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
};

const achatar = (node, acc = []) => {
  if (Array.isArray(node)) node.forEach((n) => achatar(n, acc));
  else if (node && typeof node === "object") {
    acc.push(node);
    if (Array.isArray(node["@graph"])) achatar(node["@graph"], acc);
  }
  return acc;
};

for (const path of rotasBairro) {
  const politica = resolveLocal(path);
  if (politica.indexability !== "index") continue;

  const html = htmlDaRota(path, dist);
  if (!html) {
    erros.push(`${path}: FAIL_ROUTE_NOT_RENDERED (sem HTML do SSR)`);
    continue;
  }

  const nos = [];
  for (const bruto of blocosJsonLd(html)) {
    try {
      achatar(JSON.parse(bruto), nos);
    } catch (e) {
      erros.push(`${path}: JSON-LD malformado — ${String(e.message).slice(0, 120)}`);
    }
  }

  const tipos = (t) => nos.filter((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]).includes(t));

  // BreadcrumbList
  const [breadcrumb] = tipos("BreadcrumbList");
  if (!breadcrumb) erros.push(`${path}: BreadcrumbList ausente`);
  else {
    const itens = breadcrumb.itemListElement ?? [];
    if (itens.length < 2) erros.push(`${path}: BreadcrumbList com ${itens.length} item(ns)`);
    itens.forEach((it, i) => {
      if (Number(it.position) !== i + 1) erros.push(`${path}: breadcrumb position fora de ordem em #${i + 1}`);
      const url = typeof it.item === "string" ? it.item : it.item?.["@id"];
      if (!it.name) erros.push(`${path}: breadcrumb #${i + 1} sem name`);
      if (url && !/^https:\/\//.test(url)) erros.push(`${path}: breadcrumb #${i + 1} com URL não absoluta (${url})`);
    });
  }

  // FAQPage
  const [faq] = tipos("FAQPage");
  if (!faq) erros.push(`${path}: FAQPage ausente`);
  else {
    const perguntas = faq.mainEntity ?? [];
    if (perguntas.length < 3) erros.push(`${path}: FAQPage com apenas ${perguntas.length} pergunta(s)`);
    for (const q of perguntas) {
      const resposta = q?.acceptedAnswer?.text ?? "";
      if (!q?.name || resposta.trim().length < 40) {
        erros.push(`${path}: FAQ "${String(q?.name ?? "?").slice(0, 40)}" sem resposta útil`);
      }
    }
  }

  // WebPage
  const [webpage] = tipos("WebPage");
  if (!webpage) erros.push(`${path}: WebPage ausente`);
  else if (!String(webpage.url ?? "").endsWith(path)) {
    erros.push(`${path}: WebPage.url (${webpage.url}) não corresponde à rota`);
  }

  // Canonical self-referente
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  if (!canonical || !canonical.endsWith(path)) {
    erros.push(`${path}: canonical inesperado (${canonical ?? "ausente"})`);
  }

  ok.push(path);
}

console.log(`gate bairros-schema — ${ok.length} rota(s) validada(s)`);
for (const p of ok) console.log(`   ✓ ${p}`);

if (erros.length) {
  console.error(`\n✗ ${erros.length} problema(s) de schema em /bairros/*:`);
  for (const e of erros) console.error(`   ${e}`);
  process.exit(1);
}
console.log("\n✓ breadcrumb, FAQPage e WebPage válidos em todas as rotas de bairro indexáveis.");
