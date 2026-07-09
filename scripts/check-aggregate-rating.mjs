#!/usr/bin/env node
/**
 * Guard: nenhuma página estática pode declarar aggregateRating com nota/contagem
 * "hardcoded" (inventada). Ratings só são permitidos via o pipeline dinâmico
 * (DynamicAggregateRating + edge function aggregate-rating + schemaValidation,
 * que bloqueia reviewCount < MIN_REVIEWS). Este check roda no CI/prebuild.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/pages", "src/components"];
// Arquivos autorizados a manipular aggregateRating de forma dinâmica (com dados reais).
const ALLOWLIST = [
  "src/components/DynamicAggregateRating.tsx",
  "src/components/ReviewsGrid.tsx",
  "src/components/ServiceLandingSchema.tsx",
  "src/components/CityServiceSchema.tsx",
  "src/hooks/useAggregateRating.ts",
  "src/lib/schemaValidation.ts",
];

const EXT = /\.(ts|tsx)$/;
// Detecta ratingValue/reviewCount com literal numérico (nota inventada).
const HARDCODED = /(ratingValue|reviewCount)\s*[:=]\s*["'`]?\d/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(join(ROOT, dir));
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = join(dir, entry).replace(/\\/g, "/");
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) walk(rel, out);
    else if (EXT.test(rel)) out.push(rel);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(d));
const violations = [];

for (const file of files) {
  if (ALLOWLIST.some((a) => file === a)) continue;
  const text = readFileSync(join(ROOT, file), "utf8");
  if (!/aggregateRating/i.test(text)) continue;
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    const l = line.trim();
    if (l.startsWith("//") || l.startsWith("*")) return; // ignora comentários
    if (HARDCODED.test(line)) {
      violations.push(`${file}:${idx + 1} ${l.slice(0, 120)}`);
    }
  });
}

if (violations.length) {
  console.error(
    "\naggregateRating gate FAILED: nota/contagem inventada em página estática:\n" +
      violations.map((v) => `- ${v}`).join("\n") +
      "\n\nUse o pipeline dinâmico (DynamicAggregateRating) — ratings só com reviews reais.",
  );
  process.exit(1);
}

console.log(
  `aggregateRating gate passed: ${files.length} arquivos verificados, nenhum rating inventado.`,
);
