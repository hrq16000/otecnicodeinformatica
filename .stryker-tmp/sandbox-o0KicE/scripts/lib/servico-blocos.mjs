/**
 * Espelha os blocos de conteúdo local (`blocoLocal`) já renderizados pelas
 * páginas de serviço (src/lib/servicosCore.ts) para o HTML estático curado.
 * Não inventa texto: lê a fonte única e reaproveita título + parágrafos, o que
 * garante paridade entre HTML inicial e DOM hidratado.
 */
// @ts-nocheck

import { readFileSync, existsSync } from "node:fs";

const SOURCE = "src/lib/servicosCore.ts";

const unescape = (s) =>
  s
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Blocos (h2 + parágrafos) da rota /servicos/<slug>, ou null. */
export function servicoBlocos(path) {
  const m = /^\/servicos\/([^/]+)$/.exec(path);
  if (!m || !existsSync(SOURCE)) return null;
  const slug = m[1];
  const src = readFileSync(SOURCE, "utf8");
  const start = src.indexOf(`path: "${slug}",`);
  if (start === -1) return null;
  const blocoStart = src.indexOf("blocoLocal: [", start);
  if (blocoStart === -1) return null;
  const blocoEnd = src.indexOf("\n    ],", blocoStart);
  const chunk = src.slice(blocoStart, blocoEnd === -1 ? undefined : blocoEnd);

  const out = [];
  const entryRe = /titulo:\s*"((?:[^"\\]|\\.)*)"\s*,\s*paragrafos:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  for (const e of chunk.matchAll(entryRe)) {
    const titulo = unescape(e[1]);
    const paragrafos = [...e[2].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((p) => unescape(p[1])).filter(Boolean);
    if (titulo && paragrafos.length) out.push({ titulo, paragrafos });
  }
  return out.length ? out : null;
}
