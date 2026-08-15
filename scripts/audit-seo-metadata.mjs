#!/usr/bin/env node
/**
 * AUDITORIA DE SEO NO PIPELINE (preview + build).
 *
 * Roda ANTES do bundle (prebuild) sobre a fonte curada de metadados, para que
 * erros clássicos apareçam no preview em segundos, sem precisar de dist/:
 *   • noindex indevido (trava de indexação ligada / rota curada marcada noindex);
 *   • <title> longo ou duplicado entre rotas;
 *   • meta description ausente, curta demais ou longa demais;
 *   • OG inválido (imagem relativa, domínio ausente, extensão não suportada).
 *
 * Saída: reports/seo-audit-preview.json  (+ resumo no stdout)
 * Falhas ERRO travam o build; AVISOS apenas relatam.
 *
 * Uso: node scripts/audit-seo-metadata.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";
import { BASE_URL, INDEXING_ENABLED, SITE_CONFIGURED } from "./lib/site-env.mjs";

const TITLE_MAX = 60;
const TITLE_HARD_MAX = 70;
const DESC_MIN = 70;
const DESC_MAX = 160;
const DESC_HARD_MAX = 170;
const OG_PATH = (process.env.VITE_BRAND_OG_IMAGE || "/og-image.png").trim();

const erros = [];
const avisos = [];
const err = (rota, msg) => erros.push({ rota, msg });
const warn = (rota, msg) => avisos.push({ rota, msg });

// 1. Indexação global (noindex acidental em todo o site)
if (!SITE_CONFIGURED) err("*", "VITE_SITE_DOMAIN ausente — canonical/OG ficam relativos e o site serve noindex");
else if (!INDEXING_ENABLED) err("*", "VITE_SITE_INDEXING_ENABLED != true — TODAS as rotas servem noindex,nofollow");

// 2. OG padrão precisa ser absoluto e com extensão de imagem válida
const ogUrl = `${BASE_URL}${OG_PATH}`;
if (!/^https:\/\/[^/]+\/.+\.(jpg|jpeg|png|webp)$/i.test(ogUrl)) {
  err("*", `og:image inválido (precisa ser https absoluto e imagem): "${ogUrl}"`);
}

// 3. Auditoria rota a rota
const titulos = new Map();
const descricoes = new Map();

for (const rota of CURATED_ROUTES) {
  const path = rota.path;
  const title = (rota.title || "").trim();
  const desc = (rota.description || "").trim();

  if (!title) err(path, "sem <title>");
  else {
    if (title.length > TITLE_HARD_MAX) err(path, `title com ${title.length} chars (máx ${TITLE_HARD_MAX})`);
    else if (title.length > TITLE_MAX) warn(path, `title com ${title.length} chars (ideal ≤ ${TITLE_MAX})`);
    const anterior = titulos.get(title);
    if (anterior) err(path, `title duplicado com ${anterior}`);
    else titulos.set(title, path);
  }

  if (!desc) err(path, "sem meta description");
  else {
    if (desc.length > DESC_HARD_MAX) err(path, `description com ${desc.length} chars (máx ${DESC_HARD_MAX})`);
    else if (desc.length > DESC_MAX) warn(path, `description com ${desc.length} chars (ideal ≤ ${DESC_MAX})`);
    if (desc.length < DESC_MIN) warn(path, `description curta (${desc.length} chars, ideal ≥ ${DESC_MIN})`);
    const anterior = descricoes.get(desc);
    if (anterior) err(path, `description duplicada com ${anterior}`);
    else descricoes.set(desc, path);
  }

  if (rota.noindex) err(path, "rota curada marcada como noindex — remova do sitemap ou remova o noindex");
  if (!path.startsWith("/")) err(path, "path curado precisa começar com /");
}

const relatorio = {
  geradoEm: new Date().toISOString(),
  baseUrl: BASE_URL || null,
  indexacaoLiberada: INDEXING_ENABLED,
  rotasAuditadas: CURATED_ROUTES.length,
  erros,
  avisos,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/seo-audit-preview.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log("── audit:seo (preview/build) ──");
console.log(`  rotas auditadas: ${CURATED_ROUTES.length}`);
console.log(`  indexação: ${INDEXING_ENABLED ? "liberada (index,follow)" : "BLOQUEADA (noindex)"}`);
for (const a of avisos) console.log(`  ⚠ ${a.rota}: ${a.msg}`);
if (erros.length) {
  console.error(`\n✗ ${erros.length} erro(s) de SEO:`);
  for (const e of erros) console.error(`  ✗ ${e.rota}: ${e.msg}`);
  console.error("\nRelatório: reports/seo-audit-preview.json");
  process.exit(1);
}
console.log(`  ✓ sem erros de SEO (${avisos.length} aviso(s)) → reports/seo-audit-preview.json`);
