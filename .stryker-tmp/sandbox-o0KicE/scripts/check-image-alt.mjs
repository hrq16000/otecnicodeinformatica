#!/usr/bin/env node
// @ts-nocheck
/**
 * GATE: alt text de imagens no HTML renderizado.
 *
 * Falha (exit 1) quando qualquer <img> das páginas geradas em `dist`:
 *  - não tem atributo alt;
 *  - tem alt vazio SEM role="presentation"/aria-hidden="true" (decorativa);
 *  - usa alt genérico ("imagem", "foto", "image", "logo", "banner", "placeholder"…);
 *  - aponta para placeholder (placeholder.svg, /placeholder, via.placeholder, lorem…).
 *
 * Uso: node scripts/check-image-alt.mjs [dist]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.argv[2] || "dist";

const GENERIC_ALT = new Set([
  "imagem",
  "imagens",
  "foto",
  "fotos",
  "image",
  "img",
  "picture",
  "photo",
  "logo",
  "icone",
  "ícone",
  "icon",
  "banner",
  "placeholder",
  "thumbnail",
  "figura",
  "ilustracao",
  "ilustração",
  "screenshot",
  "untitled",
  "sem titulo",
  "sem título",
]);

const PLACEHOLDER_SRC = [
  "placeholder.svg",
  "/placeholder",
  "via.placeholder",
  "placehold.it",
  "placehold.co",
  "dummyimage.com",
  "lorempixel",
  "picsum.photos",
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function attrs(tag) {
  const map = {};
  const re = /([a-zA-Z_:@.-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tag))) map[m[1].toLowerCase()] = m[3] ?? m[4] ?? "";
  if (/\salt(?=[\s/>])/.test(tag) && !("alt" in map)) map.alt = "";
  return map;
}

const normalize = (s) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");

let files;
try {
  files = walk(ROOT);
} catch {
  console.error(`[check:image-alt] Diretório não encontrado: ${ROOT}. Rode o build antes.`);
  process.exit(1);
}

const problems = [];
let imgCount = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(ROOT, file).replace(/index\.html$/, "").replace(/\.html$/, "");
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    imgCount += 1;
    const a = attrs(tag);
    const src = a.src || a["data-src"] || "";
    const decorative = a.role === "presentation" || a["aria-hidden"] === "true" || a.role === "none";

    if (PLACEHOLDER_SRC.some((p) => src.toLowerCase().includes(p))) {
      problems.push({ page, src, reason: "src aponta para placeholder" });
      continue;
    }
    if (!("alt" in a)) {
      problems.push({ page, src, reason: "sem atributo alt" });
      continue;
    }
    const alt = normalize(a.alt);
    if (!alt) {
      if (!decorative)
        problems.push({ page, src, reason: 'alt vazio sem role="presentation"/aria-hidden' });
      continue;
    }
    if (GENERIC_ALT.has(alt) || alt.length < 8) {
      problems.push({ page, src, reason: `alt genérico/curto demais ("${a.alt}")` });
    }
  }
}

console.log(`[check:image-alt] ${files.length} páginas · ${imgCount} <img> analisadas`);

if (problems.length) {
  console.error(`\n[check:image-alt] FAIL — ${problems.length} imagem(ns) com alt inválido:\n`);
  for (const p of problems.slice(0, 60)) {
    console.error(`  ${p.page}\n    src: ${p.src || "(vazio)"}\n    → ${p.reason}`);
  }
  if (problems.length > 60) console.error(`  … +${problems.length - 60} ocorrência(s)`);
  process.exit(1);
}

console.log("[check:image-alt] PASS — todas as imagens têm alt descritivo e sem placeholders.");
