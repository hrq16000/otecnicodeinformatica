#!/usr/bin/env node
/**
 * DIFF DE SEO LOCAL (SSR real) — metadata / canonical / robots / schema por URL.
 *
 * Renderiza as rotas locais contra o SSR, extrai a assinatura de SEO de cada
 * uma e compara com o snapshot anterior (reports/local-seo-baseline.json),
 * imprimindo um diff legível por URL. Serve de evidência antes/depois em
 * qualquer rodada local — não bloqueia o build.
 *
 * Uso:
 *   node scripts/report-local-seo-diff.mjs [dist] [--save]   (--save atualiza a baseline)
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";
import { rotasLocais } from "./lib/local-routes.mjs";
import { BAIRROS_ANCORA, resolveLocal } from "./lib/local-index-policy.mjs";

const args = process.argv.slice(2);
const dist = args.find((a) => !a.startsWith("--")) || "dist";
const SALVAR = args.includes("--save");
const BASELINE = "reports/local-seo-baseline.json";

const rotas = [...new Set([...rotasLocais({ incluirSitemap: true }), ...BAIRROS_ANCORA.map((s) => `/bairros/${s}`)])];

await prepararSsr(rotas, { dist });
abortarSeBloqueado("report-local-seo-diff");

const meta = (html, re) => html.match(re)?.[1]?.trim() ?? null;

const assinatura = (html) => {
  const tipos = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const json = JSON.parse(m[1]);
      const nodes = Array.isArray(json) ? json : json["@graph"] ?? [json];
      for (const n of nodes) if (n?.["@type"]) tipos.push(String(n["@type"]));
    } catch {
      tipos.push("INVALID_JSON_LD");
    }
  }
  return {
    title: meta(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: meta(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonical: meta(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    robots: meta(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    ogTitle: meta(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i),
    schema: [...new Set(tipos)].sort(),
  };
};

const atual = {};
for (const path of rotas) {
  const html = htmlDaRota(path, dist);
  atual[path] = html
    ? { policy: resolveLocal(path).indexability, ...assinatura(html) }
    : { policy: resolveLocal(path).indexability, erro: "ROUTE_NOT_RENDERED" };
}

const anterior = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")).rotas ?? {} : {};
const diffs = [];

for (const [path, sig] of Object.entries(atual)) {
  const antes = anterior[path];
  if (!antes) {
    diffs.push({ path, tipo: "novo", campos: [] });
    continue;
  }
  const campos = [];
  for (const k of new Set([...Object.keys(antes), ...Object.keys(sig)])) {
    const a = JSON.stringify(antes[k] ?? null);
    const b = JSON.stringify(sig[k] ?? null);
    if (a !== b) campos.push({ campo: k, antes: antes[k] ?? null, depois: sig[k] ?? null });
  }
  if (campos.length) diffs.push({ path, tipo: "alterado", campos });
}
for (const path of Object.keys(anterior)) if (!atual[path]) diffs.push({ path, tipo: "removido", campos: [] });

mkdirSync("reports", { recursive: true });
const relatorio = { geradoEm: new Date().toISOString(), total: rotas.length, diffs, rotas: atual };
writeFileSync("reports/local-seo-diff.json", JSON.stringify(relatorio, null, 2));

const linhas = [
  "# Diff de SEO local (SSR real)",
  "",
  `Gerado em ${relatorio.geradoEm} · ${rotas.length} rota(s) · ${diffs.length} com mudança`,
  "",
];
for (const d of diffs) {
  linhas.push(`## ${d.path} — ${d.tipo}`);
  for (const c of d.campos) {
    linhas.push(`- **${c.campo}**`, `  - antes: \`${JSON.stringify(c.antes)}\``, `  - depois: \`${JSON.stringify(c.depois)}\``);
  }
  linhas.push("");
}
writeFileSync("reports/local-seo-diff.md", linhas.join("\n"));

console.log(`diff local: ${diffs.length} rota(s) com mudança de ${rotas.length}`);
for (const d of diffs.slice(0, 20)) console.log(`   ${d.tipo.padEnd(9)} ${d.path} ${d.campos.map((c) => c.campo).join(", ")}`);

if (SALVAR) {
  writeFileSync(BASELINE, JSON.stringify({ geradoEm: relatorio.geradoEm, rotas: atual }, null, 2));
  console.log(`baseline atualizada em ${BASELINE}`);
}
