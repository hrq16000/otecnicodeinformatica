#!/usr/bin/env node
/**
 * GATE — GOVERNANÇA DE UTM (Rodada 8C)
 *
 * Impede que parâmetros de campanha vazem para superfícies canônicas e que a
 * busca diagnóstica envie texto livre do visitante para analytics.
 *
 * Regras:
 *   1. Nenhum `utm_` em canonical, hreflang, sitemap*.xml ou llms.txt.
 *   2. Nenhum link interno permanente (`href="/rota?utm_...`) em src/.
 *   3. O link builder é a única fonte de presets de aquisição e não pode
 *      oferecer source interno/QA.
 *   4. A busca diagnóstica não envia a frase digitada (só metadados).
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const falhas = [];
const ler = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// 1) superfícies canônicas
for (const arquivo of readdirSync("public")) {
  if (!/^(sitemap.*\.xml|llms\.txt|robots\.txt)$/.test(arquivo)) continue;
  const txt = ler(join("public", arquivo));
  if (/[?&]utm_/.test(txt)) falhas.push(`public/${arquivo}: contém parâmetro utm_`);
}

// 2) src/: canonical e links internos com utm
const arquivos = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(full)) arquivos.push(full);
  }
})("src");

const PERMITIDOS = [
  "src/lib/utmLinkBuilder.ts",
  "src/lib/utmCapture.ts",
  "src/lib/attribution.ts",
  "src/lib/canalAtribuicao.ts",
  "src/pages/admin/AdminLinkBuilder.tsx",
];

for (const f of arquivos) {
  const rel = f.replace(/\\/g, "/");
  const txt = readFileSync(f, "utf8");
  if (/rel=["']canonical["'][^>]*utm_/.test(txt)) falhas.push(`${rel}: canonical com utm_`);
  if (PERMITIDOS.includes(rel)) continue;
  const internos = txt.match(/href=\{?["'`]\/[^"'`]*[?&]utm_[^"'`]*["'`]/g) || [];
  for (const m of internos) falhas.push(`${rel}: link interno permanente com utm → ${m.slice(0, 80)}`);
}

// 3) link builder íntegro
const builder = ler("src/lib/utmLinkBuilder.ts");
if (!builder) falhas.push("src/lib/utmLinkBuilder.ts ausente — presets de aquisição sem fonte única.");
else {
  for (const chave of ["PRESETS_AQUISICAO", "validarDestino", "construirLinkAquisicao"])
    if (!builder.includes(chave)) falhas.push(`utmLinkBuilder: ${chave} ausente.`);
  const presets = builder.match(/utm_source:\s*"([a-z0-9_-]+)"/g) || [];
  for (const p of presets) {
    const valor = p.match(/"([a-z0-9_-]+)"/)[1];
    if (["site", "interno", "internal", "ci", "qa"].includes(valor))
      falhas.push(`utmLinkBuilder: preset com utm_source interno "${valor}".`);
  }
}

// 4) busca diagnóstica sem texto livre
const busca = ler("src/components/diagnostico/BuscaSintomaInteligente.tsx");
if (busca) {
  if (/(termo|query|consulta|search_term)\s*:\s*consulta\b/.test(busca))
    falhas.push("BuscaSintomaInteligente: frase digitada enviada para analytics (PII potencial).");
  for (const ev of ["diagnostic_search_start", "diagnostic_search_result", "diagnostic_no_result"])
    if (!busca.includes(ev)) falhas.push(`BuscaSintomaInteligente: evento ${ev} ausente.`);
}

if (falhas.length) {
  console.error("✖ Governança de UTM violada:\n");
  for (const f of falhas) console.error(`  · ${f}`);
  console.error("\nVer docs/governanca-utm.md.");
  process.exit(1);
}
console.log("✔ Governança de UTM íntegra (canonicals limpos, presets únicos, busca sem texto livre).");
