#!/usr/bin/env node
/**
 * ONDA 30 — GATE de ImageObject nas rotas com fotografia real.
 *
 * Toda rota que declara foto licenciada precisa entregar, já no HTML estático:
 *   • um nó ImageObject com contentUrl absoluto da foto publicada;
 *   • crédito (creditText) e licença (license) — exigência das licenças CC;
 *   • o arquivo realmente presente no build.
 *
 * Uso: node scripts/check-imageobject-jsonld.mjs [dist]
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { FOTOS, FOTO_POR_ROTA } from "./lib/fotos-rotas.mjs";

const DIST = path.resolve(process.argv[2] || "dist");
if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? Array.isArray(n["@graph"])
        ? n["@graph"].flatMap(flatten)
        : [n]
      : [];

const errors = [];
let checked = 0;

for (const [rota, slug] of FOTO_POR_ROTA) {
  const foto = FOTOS.get(slug);
  const file = path.join(DIST, rota.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) {
    errors.push(`${rota}: HTML estático ausente`);
    continue;
  }
  checked += 1;
  const html = readFileSync(file, "utf8");
  const nodes = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap((m) => {
      try {
        return flatten(JSON.parse(m[1]));
      } catch {
        return [];
      }
    })
    .filter((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]).includes("ImageObject"));

  const node = nodes.find((n) => String(n.contentUrl ?? "").endsWith(foto.src));
  if (!node) {
    errors.push(`${rota}: sem ImageObject apontando para ${foto.src}`);
    continue;
  }
  if (!node.creditText) errors.push(`${rota}: ImageObject sem creditText`);
  if (!node.license) errors.push(`${rota}: ImageObject sem license`);
  if (!node.caption) errors.push(`${rota}: ImageObject sem caption`);
  if (!existsSync(path.join(DIST, foto.src.replace(/^\//, ""))))
    errors.push(`${rota}: arquivo da foto ausente no build (${foto.src})`);
}

if (errors.length) {
  console.error(`✖ ${errors.length} problema(s) de ImageObject:`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}
console.log(`✔ ImageObject válido em ${checked} rota(s) com fotografia real licenciada.`);
