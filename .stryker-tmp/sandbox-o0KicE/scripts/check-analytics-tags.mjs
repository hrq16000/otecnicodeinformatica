/**
 * ─────────────────────────────────────────────────────────────
 * GATE — TAGS E EVENTOS DE LEAD (GA4 + GOOGLE ADS)
 * ─────────────────────────────────────────────────────────────
 * Roda no postbuild, sobre o `dist/` real. Garante que:
 *
 *  1. Os IDs configurados têm formato válido (G-… / AW-…).
 *  2. Quando há GA4 configurado, o build contém o ID, o loader do gtag,
 *     o bootstrap de Consent Mode e os eventos de lead.
 *  3. Quando há Google Ads configurado, existe rótulo de conversão e o
 *     `send_to` sai no formato AW-XXXX/Label.
 *  4. FAIL-CLOSED: sem IDs configurados, NENHUMA tag pode aparecer no build.
 *  5. Nenhum ID da marca de origem volta ao artefato publicado.
 *
 * Uso: node scripts/check-analytics-tags.mjs [dist]
 */
// @ts-nocheck

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { GA4_ID, GOOGLE_ADS_ID, GOOGLE_ADS_CONVERSION_LABEL, LEGACY_TOKENS } from "./lib/site-env.mjs";

const DIST = process.argv[2] || "dist";
const errors = [];
const notes = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(js|html)$/.test(entry)) out.push(full);
  }
  return out;
}

let files;
try {
  files = walk(DIST);
} catch {
  console.error(`[analytics-tags] diretório "${DIST}" não encontrado — rode após o build.`);
  process.exit(1);
}
const blob = files.map((f) => readFileSync(f, "utf8")).join("\n");

// 1 — formato dos IDs
if (GA4_ID && !/^G-[A-Z0-9]{6,12}$/.test(GA4_ID)) {
  errors.push(`VITE_GA4_ID "${GA4_ID}" fora do formato G-XXXXXXXXXX.`);
}
if (GOOGLE_ADS_ID && !/^AW-\d{9,12}$/.test(GOOGLE_ADS_ID)) {
  errors.push(`VITE_GOOGLE_ADS_ID "${GOOGLE_ADS_ID}" fora do formato AW-XXXXXXXXX.`);
}

// 2 — GA4 configurado
if (GA4_ID) {
  if (!blob.includes(GA4_ID)) errors.push(`GA4 ${GA4_ID} configurado mas ausente do build.`);
  if (!blob.includes("googletagmanager.com/gtag/js")) errors.push("loader do gtag.js ausente do build.");
  if (!/consent['"]?\s*,\s*['"]default/.test(blob)) errors.push("Consent Mode default ausente do build.");
  for (const ev of ["generate_lead", "cta_click"]) {
    if (!blob.includes(ev)) errors.push(`evento de lead "${ev}" ausente do build.`);
  }
  notes.push(`GA4 ${GA4_ID} presente, com Consent Mode e eventos de lead.`);
} else {
  // 4 — fail-closed
  const stray = blob.match(/\bG-[A-Z0-9]{8,12}\b/) || blob.match(/\bAW-\d{9,12}\b/);
  if (stray) errors.push(`sem GA4/Ads configurado, mas o build contém a tag "${stray[0]}".`);
  // O loader existe no bundle como código morto (guardado por GA4_ID em runtime);
  // o que não pode existir é um ID concreto na URL.
  if (/googletagmanager\.com\/gtag\/js\?id=(G-|AW-)/.test(blob)) {
    errors.push("sem GA4 configurado, mas o loader do gtag.js já vem com um ID concreto.");
  }
  notes.push("GA4/Ads desligados (sem IDs em env) — nenhuma tag externa no build.");
}

// 3 — Google Ads configurado
if (GOOGLE_ADS_ID) {
  if (!GOOGLE_ADS_CONVERSION_LABEL) {
    errors.push("VITE_GOOGLE_ADS_ID configurado sem VITE_GOOGLE_ADS_CONVERSION_LABEL — conversão nunca dispararia.");
  } else {
    const full = GOOGLE_ADS_CONVERSION_LABEL.includes("/")
      ? GOOGLE_ADS_CONVERSION_LABEL
      : `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;
    if (!/^AW-\d{9,12}\/[\w-]{8,}$/.test(full)) {
      errors.push(`rótulo de conversão "${full}" fora do formato AW-XXXXXXXXX/AbC-D_efG.`);
    }
    if (!blob.includes(GOOGLE_ADS_ID)) errors.push(`Google Ads ${GOOGLE_ADS_ID} ausente do build.`);
    if (!blob.includes("'conversion'") && !blob.includes('"conversion"')) {
      errors.push("evento de conversão do Google Ads ausente do build.");
    }
    notes.push(`Google Ads ${full} presente no build.`);
  }
} else if (GOOGLE_ADS_CONVERSION_LABEL) {
  errors.push("VITE_GOOGLE_ADS_CONVERSION_LABEL configurado sem VITE_GOOGLE_ADS_ID.");
}

// 5 — herança
for (const token of LEGACY_TOKENS.filter((t) => /^(G-|AW-)/.test(t))) {
  if (blob.includes(token)) errors.push(`ID da marca de origem "${token}" reapareceu no build.`);
}

console.log("── Gate de tags e eventos (GA4 / Google Ads) ──");
for (const n of notes) console.log(`  • ${n}`);
if (errors.length) {
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`FALHOU: ${errors.length} problema(s) de medição. Build bloqueado.`);
  process.exit(1);
}
console.log("✔ Medição consistente com a configuração de env.");
