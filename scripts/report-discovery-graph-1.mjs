#!/usr/bin/env node
/**
 * MICRO-RODADA DISCOVERY 1 — grafo real de descoberta interna.
 *
 * Mede, contra o HTML SSR realmente servido (nada de JS/hydration):
 *   - inbound links por URL curada (quem aponta para ela);
 *   - click depth por BFS a partir da Home;
 *   - click depth a partir do hub natural declarado;
 *   - órfãos globais (URL indexável sem nenhum link interno);
 *   - distribuição global de profundidade.
 *
 * Não altera conteúdo. Só observa.
 *
 * Uso: node scripts/with-ssr-server.mjs node scripts/report-discovery-graph-1.mjs [--invalidar]
 */
import { existsSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado, resumo } from "./lib/ssr-harness.mjs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const args = process.argv.slice(2);
const dist = args.find((a) => !a.startsWith("--")) || "dist";
const INVALIDAR = args.includes("--invalidar") || process.env.CI === "true";

/** Alvos desta rodada + hub natural semântico de cada um. */
export const ALVOS_DISCOVERY_1 = {
  "/equipamentos/desktop": "/equipamentos",
  "/equipamentos/impressora": "/equipamentos",
  "/servicos/conserto-pc-notebook/centro": "/bairros/centro",
  "/servicos/formatacao-computador/batel": "/bairros/batel",
};

if (INVALIDAR) {
  for (const alvo of [`${dist}/ssr-snapshot-manifest.json`]) {
    if (existsSync(alvo)) rmSync(alvo, { recursive: true, force: true });
  }
  console.log("[discovery-1] snapshot SSR invalidado.");
}

const norm = (p) => {
  const limpo = String(p || "/").split("#")[0].split("?")[0];
  const sem = limpo.replace(/\/+$/, "");
  return sem === "" ? "/" : sem;
};

const universo = [...new Set(CURATED_PATHS.map((p) => (typeof p === "string" ? p : p.path)).map(norm))].filter(
  (p) => !/^\/(admin|debug|status|lovable)/.test(p),
);
const rotas = [...new Set(["/", ...universo])];

await prepararSsr(rotas, { dist });
abortarSeBloqueado("report-discovery-graph-1");
console.log(`[discovery-1] SSR: ${JSON.stringify(resumo())}`);

const info = new Map();
for (const rota of rotas) {
  const html = htmlDaRota(rota, dist);
  if (!html) {
    info.set(rota, { ausente: true, links: [], robots: null, canonical: null });
    continue;
  }
  const links = new Set();
  for (const m of html.matchAll(/<a[^>]+href=["'](\/[^"'?]*)["']/gi)) {
    const alvo = norm(m[1]);
    if (alvo !== rota) links.add(alvo);
  }
  info.set(rota, {
    ausente: false,
    links: [...links],
    robots: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? null,
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1] ?? null,
  });
}

/** inbound: só conta origem indexável (não-noindex) e existente. */
const inbound = new Map(rotas.map((r) => [r, []]));
for (const [origem, dados] of info) {
  if (dados.ausente) continue;
  if (/noindex/i.test(dados.robots ?? "")) continue;
  for (const destino of dados.links) {
    if (inbound.has(destino)) inbound.get(destino).push(origem);
  }
}

const bfs = (raiz) => {
  const d = new Map([[raiz, 0]]);
  const fila = [raiz];
  while (fila.length) {
    const at = fila.shift();
    for (const alvo of info.get(at)?.links ?? []) {
      if (d.has(alvo) || !info.has(alvo)) continue;
      d.set(alvo, d.get(at) + 1);
      fila.push(alvo);
    }
  }
  return d;
};

const depthHome = bfs("/");

const distribuicao = { 1: 0, 2: 0, 3: 0, 4: 0, "5+": 0, orphan: 0 };
const orfaos = [];
for (const url of universo) {
  const d = depthHome.get(url);
  const inb = inbound.get(url)?.length ?? 0;
  if (inb === 0) {
    orfaos.push(url);
    distribuicao.orphan += 1;
    continue;
  }
  if (d === undefined) distribuicao["5+"] += 1;
  else if (d <= 1) distribuicao[1] += 1;
  else if (d >= 5) distribuicao["5+"] += 1;
  else distribuicao[d] += 1;
}

const alvos = [];
for (const [url, hub] of Object.entries(ALVOS_DISCOVERY_1)) {
  const dHub = info.has(hub) ? bfs(hub).get(url) : undefined;
  alvos.push({
    url,
    inbound: inbound.get(url)?.length ?? 0,
    origens: inbound.get(url) ?? [],
    depthHome: depthHome.get(url) ?? null,
    hub,
    depthHub: dHub ?? null,
    robots: info.get(url)?.robots ?? null,
    canonical: info.get(url)?.canonical ?? null,
    ausente: info.get(url)?.ausente ?? true,
  });
}

/** Candidatos a "artigo do blog com depth >= 4 ou órfão". */
const blogProfundo = universo
  .filter((u) => u.startsWith("/blog/"))
  .map((u) => ({ url: u, inbound: inbound.get(u)?.length ?? 0, depth: depthHome.get(u) ?? null }))
  .filter((x) => x.inbound === 0 || x.depth === null || x.depth >= 4)
  .sort((a, b) => (b.depth ?? 99) - (a.depth ?? 99));

const relatorio = {
  geradoEm: new Date().toISOString(),
  universo: universo.length,
  distribuicao,
  orfaos,
  alvos,
  blogProfundo,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/discovery-graph-1.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log("\n| URL | Inbound | Depth Home | Hub natural | Depth Hub |");
console.log("| --- | --- | --- | --- | --- |");
for (const a of alvos) {
  console.log(`| ${a.url} | ${a.inbound} | ${a.depthHome ?? "—"} | ${a.hub} | ${a.depthHub ?? "—"} |`);
}
console.log(`\nblog profundo/órfão: ${JSON.stringify(blogProfundo, null, 2)}`);
console.log(`distribuição: ${JSON.stringify(distribuicao)}`);
console.log(`órfãos globais: ${orfaos.length}`);
if (orfaos.length) console.log(orfaos.map((o) => `  - ${o}`).join("\n"));
