#!/usr/bin/env node
// @ts-nocheck
/**
 * GATE: número de WhatsApp nunca visível no HTML renderizado.
 *
 * Varre os HTMLs de `dist` (ou do diretório passado como argumento), remove
 * <script>/<style> (JSON-LD `telephone` e bundles são permitidos) e todas as
 * tags/atributos (href="https://wa.me/..." é permitido), sobrando apenas o
 * TEXTO VISÍVEL. Se o número oficial aparecer nesse texto — em qualquer
 * formatação — o gate falha.
 *
 * Uso: node scripts/check-wa-number-dom.mjs [dist]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { WHATSAPP_NUMBER } from "./lib/site-env.mjs";
import { join, extname } from "node:path";

const DIR = process.argv[2] || "dist";
const DIGITS = WHATSAPP_NUMBER;
const LOCAL = WHATSAPP_NUMBER.replace(/^55/, "");

const files = [];
const walk = (p) => {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) return readdirSync(p).forEach((f) => walk(join(p, f)));
  if (extname(p) === ".html") files.push(p);
};
walk(DIR);

if (!files.length) {
  console.error(`❌ Nenhum HTML encontrado em "${DIR}". Rode o build antes do gate.`);
  process.exit(1);
}

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ");

const findings = [];
for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"));
  const compact = text.replace(/[\s().+\-]/g, "");
  if (compact.includes(DIGITS) || compact.includes(LOCAL)) {
    const snippet = text.replace(/\s+/g, " ").trim().slice(0, 160);
    findings.push({ file, snippet });
  }
}

if (findings.length) {
  console.error(`\n❌ Número de WhatsApp visível em ${findings.length} página(s):\n`);
  for (const f of findings) console.error(`  ${f.file}\n      ${f.snippet}`);
  console.error("\nO número só pode existir em wa.me, no atributo telephone do JSON-LD e nas constantes.");
  process.exit(1);
}

console.log(`✅ Número oculto: ${files.length} HTML(s) sem o WhatsApp em texto visível.`);
