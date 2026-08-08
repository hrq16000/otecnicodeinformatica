#!/usr/bin/env node
/**
 * Gate de JSON-LD das páginas de política.
 * Garante que /politica-de-cookies-e-anuncios e /politica-de-privacidade
 * declarem FAQPage e BreadcrumbList válidos (JSON parseável e campos mínimos).
 */
import { readFileSync } from "node:fs";

const PAGES = [
  { file: "src/pages/PoliticaCookiesAnuncios.tsx", label: "/politica-de-cookies-e-anuncios" },
  { file: "src/pages/PoliticaPrivacidade.tsx", label: "/politica-de-privacidade" },
];

const errors = [];

for (const { file, label } of PAGES) {
  const src = readFileSync(file, "utf8");

  const hasFaq = /"@type":\s*"FAQPage"|"@type": "FAQPage"|@type": "FAQPage/.test(src)
    || /"FAQPage"/.test(src);
  const hasCrumb = /"BreadcrumbList"/.test(src);
  if (!hasFaq) errors.push(`${label}: FAQPage ausente`);
  if (!hasCrumb) errors.push(`${label}: BreadcrumbList ausente`);

  // Estrutura mínima: perguntas com resposta e itens de breadcrumb com posição.
  if (hasFaq && !/acceptedAnswer/.test(src)) {
    errors.push(`${label}: FAQPage sem acceptedAnswer`);
  }
  if (hasCrumb && !/itemListElement/.test(src)) {
    errors.push(`${label}: BreadcrumbList sem itemListElement`);
  }
  if (hasCrumb && !/position:\s*1/.test(src)) {
    errors.push(`${label}: BreadcrumbList sem position inicial`);
  }
}

if (errors.length) {
  console.error("❌ JSON-LD das políticas inconsistente:");
  for (const e of errors) console.error(`   - ${e}`);
  process.exit(1);
}
console.log("✅ JSON-LD das páginas de política consistente (FAQPage + BreadcrumbList).");
