#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE: nenhum CTA editorial aponta direto para o WhatsApp.
//
// Todo contato originado em conteúdo editorial (/blog/**) deve passar pela
// triagem central (funil), nunca por um link wa.me / api.whatsapp.com direto.
//
// Exceções explícitas (modos degradados globais, não são CTAs editoriais):
//   • data-cta-location="hydration_timeout_bar" — barra injetada só quando o
//     app falha em hidratar.
//   • data-cta-location="noscript_static" — shell <noscript> genérico do site,
//     permitido apenas em artigos NÃO aprovados (noindex, sem corpo editorial
//     próprio). Nos artigos da onda aprovada o CTA precisa ser a triagem.
//
// Uso: node scripts/check-editorial-no-direct-wa.mjs [dir=dist]
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

const APPROVED = new Set(EDITORIAL_WAVE.map((e) => e.slug));

const ROOT = process.argv[2] ?? "dist";
const ALWAYS_ALLOWED = ['data-cta-location="hydration_timeout_bar"'];
const SHELL_ALLOWED = ['data-cta-location="noscript_static"'];
const DIRECT_WA = /(wa\.me\/|api\.whatsapp\.com)/g;

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name === "index.html") out.push(full);
  }
  return out;
}

// Extrai a tag <a> (ou trecho) que contém a ocorrência, para decidir a exceção.
function surroundingTag(html, index) {
  const start = html.lastIndexOf("<", index);
  const end = html.indexOf(">", index);
  return html.slice(start === -1 ? 0 : start, end === -1 ? index + 200 : end + 1);
}

const errors = [];
const blogDir = path.join(ROOT, "blog");
const files = await walk(blogDir);

for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const slug = file.replace(/\\/g, "/").match(/\/blog\/([^/]+)\/index\.html$/)?.[1] ?? null;
  const allowed = APPROVED.has(slug) ? ALWAYS_ALLOWED : [...ALWAYS_ALLOWED, ...SHELL_ALLOWED];
  for (const match of html.matchAll(DIRECT_WA)) {
    const tag = surroundingTag(html, match.index);
    if (allowed.some((marker) => tag.includes(marker))) continue;
    errors.push(`${file}: CTA editorial com WhatsApp direto (${match[0]}) — use a triagem central`);
  }
}

console.log("── check:editorial-no-direct-wa ──");
console.log(`  HTMLs editoriais : ${files.length}`);
console.log(`  violações        : ${errors.length}`);

if (errors.length > 0) {
  console.error("\n✗ CTAs editoriais diretos para WhatsApp encontrados:");
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\n✓ nenhum CTA editorial direto para WhatsApp — toda origem passa pela triagem central");
