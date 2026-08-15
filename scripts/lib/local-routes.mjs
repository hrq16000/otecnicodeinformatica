#!/usr/bin/env node
/**
 * Fonte única das rotas locais que os gates precisam renderizar (FASE 5).
 * Nada é escrito à mão: tudo deriva de src/lib/localIndexPolicy.json e dos
 * sitemaps reais em public/.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { BAIRROS_ANCORA_META, pathsIndexaveis } from "./local-index-policy.mjs";

const norm = (p) => {
  const s = String(p).replace(/\/+$/, "");
  return s === "" ? "/" : s;
};

export function rotasDosSitemapsLocais(dir = "public") {
  const rotas = new Set();
  if (!existsSync(dir)) return rotas;
  for (const f of readdirSync(dir)) {
    if (!/^sitemap.*\.xml$/.test(f)) continue;
    if (/images|news|index/.test(f)) continue;
    const xml = readFileSync(join(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (/sitemap.*\.xml$/.test(loc)) continue;
      try {
        rotas.add(norm(new URL(loc).pathname));
      } catch {
        /* loc inválida é problema do gate de sitemap */
      }
    }
  }
  return rotas;
}

/** Rotas mínimas para validar o contrato local: home, cidades, bairros âncora e pais. */
export function rotasLocais({ incluirSitemap = false } = {}) {
  const rotas = new Set(["/", "/areas-atendidas"]);
  for (const p of pathsIndexaveis()) rotas.add(norm(p));
  for (const b of BAIRROS_ANCORA_META) {
    rotas.add(norm(`/bairros/${b.slug}`));
    if (b.parent) rotas.add(norm(b.parent));
  }
  if (incluirSitemap) for (const r of rotasDosSitemapsLocais()) rotas.add(r);
  return [...rotas].sort();
}
