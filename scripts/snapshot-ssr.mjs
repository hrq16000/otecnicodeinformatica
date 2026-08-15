#!/usr/bin/env node
/**
 * Snapshot SSR → dist/
 *
 * Depois da migração para TanStack Start, o build gera dist/client + servidor SSR
 * em vez de um HTML por rota. Todos os gates locais (local-index-policy,
 * local-doorway, local-neighborhood-intent, local-service-intent, local-regression)
 * leem `dist/<rota>/index.html`. Este script busca o HTML renderizado pelo servidor
 * e o grava nesse formato, sem alterar os gates.
 *
 * Uso: node scripts/snapshot-ssr.mjs [dist] [baseUrl]
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

const dist = process.argv[2] || "dist";
const base = (process.argv[3] || process.env.SNAPSHOT_BASE_URL || "http://localhost:8080").replace(/\/$/, "");

function rotasDosSitemaps() {
  const rotas = new Set(["/"]);
  const dir = "public";
  if (!existsSync(dir)) return [...rotas];
  for (const f of readdirSync(dir)) {
    if (!/^sitemap.*\.xml$/.test(f)) continue;
    const xml = readFileSync(join(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (/sitemap.*\.xml$/.test(loc)) continue;
      try {
        rotas.add(new URL(loc).pathname.replace(/\/$/, "") || "/");
      } catch {
        /* loc inválido é problema do gate de sitemap, não deste script */
      }
    }
  }
  return [...rotas];
}

function rotasDaPolitica() {
  const p = "src/lib/localIndexPolicy.json";
  if (!existsSync(p)) return [];
  const data = JSON.parse(readFileSync(p, "utf8"));
  const out = new Set();
  for (const key of Object.keys(data)) {
    const val = data[key];
    if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === "string" && item.startsWith("/")) out.add(item);
        else if (item && typeof item === "object" && typeof item.slug === "string") {
          out.add(`/bairros/${item.slug}`);
          if (typeof item.parent === "string" && item.parent.startsWith("/")) out.add(item.parent);
        } else if (item && typeof item === "object" && typeof item.path === "string") out.add(item.path);
      }
    }
  }
  return [...out];
}

async function baixar(rota) {
  const res = await fetch(`${base}${rota}`, { headers: { "user-agent": "snapshot-ssr/1.0" } });
  const html = await res.text();
  return { status: res.status, html };
}

async function main() {
  const rotas = [...new Set([...rotasDosSitemaps(), ...rotasDaPolitica()])].sort();
  console.log(`snapshot-ssr: ${rotas.length} rota(s) a partir de ${base}`);

  let ok = 0;
  const falhas = [];
  const lote = 12;
  for (let i = 0; i < rotas.length; i += lote) {
    const parte = rotas.slice(i, i + lote);
    const resultados = await Promise.all(
      parte.map(async (rota) => {
        try {
          return { rota, ...(await baixar(rota)) };
        } catch (err) {
          return { rota, status: 0, html: "", erro: String(err) };
        }
      }),
    );
    for (const r of resultados) {
      if (r.status !== 200 || !r.html.includes("</html>")) {
        falhas.push(`${r.rota} → ${r.status}${r.erro ? ` (${r.erro})` : ""}`);
        continue;
      }
      const destino = join(dist, r.rota === "/" ? "index.html" : `${r.rota.replace(/^\//, "")}/index.html`);
      mkdirSync(dirname(destino), { recursive: true });
      writeFileSync(destino, r.html);
      ok++;
    }
  }

  // Arquivos estáticos que os gates procuram na raiz do dist.
  for (const f of ["robots.txt", ...readdirSync("public").filter((n) => /^sitemap.*\.xml$/.test(n)), "llms.txt"]) {
    const src = join("public", f);
    if (existsSync(src)) copyFileSync(src, join(dist, f));
  }

  console.log(`snapshot-ssr: ${ok} HTML gravado(s) em ${dist}/`);
  if (falhas.length) {
    console.log(`snapshot-ssr: ${falhas.length} rota(s) sem HTML:`);
    for (const f of falhas.slice(0, 30)) console.log(`  - ${f}`);
  }
}

main().catch((err) => {
  console.error("snapshot-ssr falhou:", err);
  process.exit(1);
});
