#!/usr/bin/env node
/**
 * GRAFO DE DESCOBERTA — HTML PÚBLICO DE PRODUÇÃO
 *
 * BFS a partir da Home usando somente <a href> do HTML realmente servido por
 * https://otecnicodeinformatica.com.br (sem SSR local, sem snapshot, sem JS).
 * Universo = URLs curadas (scripts/lib/curated-urls.mjs).
 *
 * Uso: node scripts/report-discovery-graph-prod.mjs [--out=reports/discovery-graph-prod.json]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CURATED_PATHS, BASE_URL } from "./lib/curated-urls.mjs";

const OUT =
  (process.argv.find((a) => a.startsWith("--out=")) || "").slice(6) ||
  "reports/discovery-graph-prod.json";
const universe = new Set(CURATED_PATHS);
const norm = (href) => {
  if (!href) return null;
  let u;
  try {
    u = new URL(href, BASE_URL);
  } catch {
    return null;
  }
  if (u.origin !== new URL(BASE_URL).origin) return null;
  let p = u.pathname.replace(/\/+$/, "");
  if (p === "") p = "/";
  return universe.has(p) ? p : null;
};

const html = new Map();
async function fetchPath(p) {
  if (html.has(p)) return html.get(p);
  const res = await fetch(`${BASE_URL}${p === "/" ? "/" : p}`, {
    headers: { "user-agent": "otecnicodeinformatica-discovery-graph/1.0" },
  });
  const body = res.ok ? await res.text() : "";
  html.set(p, body);
  return body;
}

const linksOf = (body) =>
  [...body.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((m) => norm(m[1])).filter(Boolean);

const inbound = new Map(CURATED_PATHS.map((p) => [p, new Set()]));
const depth = new Map([["/", 0]]);
const queue = ["/"];
const seen = new Set(["/"]);
const CONCURRENCY = 8;

while (queue.length) {
  const layer = queue.splice(0, queue.length);
  for (let i = 0; i < layer.length; i += CONCURRENCY) {
    const chunk = layer.slice(i, i + CONCURRENCY);
    const bodies = await Promise.all(chunk.map(fetchPath));
    chunk.forEach((from, idx) => {
      for (const to of new Set(linksOf(bodies[idx]))) {
        if (to !== from) inbound.get(to)?.add(from);
        if (!seen.has(to)) {
          seen.add(to);
          depth.set(to, (depth.get(from) ?? 0) + 1);
          queue.push(to);
        }
      }
    });
  }
}

const dist = {};
for (const p of CURATED_PATHS) {
  const d = depth.has(p) ? depth.get(p) : "orphan";
  const k = d === "orphan" ? "orphan" : d >= 5 ? "5+" : String(d);
  dist[k] = (dist[k] ?? 0) + 1;
}
const orphans = CURATED_PATHS.filter((p) => !depth.has(p));
const targets = [
  "/equipamentos/desktop",
  "/equipamentos/impressora",
  "/blog/como-resolver-tela-azul-windows",
  "/servicos/conserto-pc-notebook/centro",
  "/servicos/formatacao-computador/batel",
];
const report = {
  source: "production-html",
  baseUrl: BASE_URL,
  measuredAt: new Date().toISOString(),
  universe: CURATED_PATHS.length,
  distribution: dist,
  orphans,
  targets: targets.map((p) => ({
    url: p,
    inUniverse: universe.has(p),
    inbound: [...(inbound.get(p) ?? [])],
    inboundCount: inbound.get(p)?.size ?? 0,
    depth: depth.has(p) ? depth.get(p) : "orphan",
  })),
};
mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ dist, orphans: orphans.length, targets: report.targets }, null, 2));
console.log(`\nRelatório: ${OUT}`);
