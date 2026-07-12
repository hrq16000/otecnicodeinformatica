#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE DE REVISÃO TÉCNICA DOS OITO PILOTOS — PROMPT 32.
//
// Verificações OBJETIVAS sobre arquivos estáticos. Não aprova nem
// indexa artigos. Garante que:
//   • existem exatamente 8 pilotos, todos in_review e não aprovados;
//   • APPROVED_EDITORIAL_CONTENT permanece vazio;
//   • imageOrigin continua "unknown";
//   • todo piloto tem status de revisão técnica e brief de imagem;
//   • fontes têm URL absoluta e domínio permitido, sem fonte inventada;
//   • os dois desalinhamentos críticos estão "blocked";
//   • nenhum "revisado por" / Person / promessa proibida vaza no texto;
//   • pilotos ficam fora dos sitemaps.
//
// Uso: node scripts/check-editorial-technical-review.mjs
// Sai com código 1 em qualquer violação crítica.
// ─────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.join(root, p);
const read = (p) => fs.readFileSync(rel(p), "utf8");
const exists = (p) => fs.existsSync(rel(p));

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const EXPECTED_PILOTS = [
  "notebook-nao-liga-o-que-fazer",
  "computador-lento-causas-solucoes",
  "como-instalar-windows-11-do-zero",
  "quando-trocar-hd-por-ssd",
  "notebook-superaquecendo-o-que-fazer",
  "backup-como-proteger-seus-arquivos",
  "como-saber-se-pc-tem-virus-malware",
  "como-melhorar-sinal-wifi-em-casa",
];

// Pilotos que, nesta rodada, devem estar "blocked" por desalinhamento crítico
// de intenção (slug × title/H1/conteúdo). Enquanto não forem resolvidos com
// análise de links/redirects, não podem ser "reviewed".
const CRITICAL_ALIGNMENT = new Set([
  "notebook-nao-liga-o-que-fazer",
  "como-instalar-windows-11-do-zero",
]);

const ALLOWED_SOURCE_HOSTS = new Set([
  "microsoft.com",
  "www.microsoft.com",
  "learn.microsoft.com",
  "support.microsoft.com",
  "cisa.gov",
  "www.cisa.gov",
  "cert.br",
  "cartilha.cert.br",
  "nist.gov",
  "www.nist.gov",
  "csrc.nist.gov",
  "wi-fi.org",
  "www.wi-fi.org",
]);

// Extrai blocos "  "slug": {" ... até o próximo top-level slug.
function extractSlugBlocks(src) {
  const starts = [...src.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{/gm)];
  const blocks = new Map();
  for (let i = 0; i < starts.length; i++) {
    const slug = starts[i][1];
    const start = starts[i].index;
    const end = i + 1 < starts.length ? starts[i + 1].index : src.length;
    blocks.set(slug, src.slice(start, end));
  }
  return blocks;
}

// ── 1. Registro editorial ────────────────────────────────────
const registry = read("src/lib/blogEditorialRegistry.ts");

if (/APPROVED_EDITORIAL_CONTENT\.set\s*\(/.test(registry)) {
  fail("APPROVED_EDITORIAL_CONTENT recebeu .set() — registro de aprovados deve ficar VAZIO.");
}
if (!/APPROVED_EDITORIAL_CONTENT\s*=\s*new Map<[^>]*>\(\s*\)\s*;/.test(registry)) {
  fail("APPROVED_EDITORIAL_CONTENT não está declarado como Map vazio.");
}

const slugsMatch = registry.match(/EDITORIAL_PILOT_SLUGS\s*=\s*\[([\s\S]*?)\]/);
const pilotSlugs = slugsMatch
  ? [...slugsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];
if (pilotSlugs.length !== 8) fail(`Esperado 8 slugs-piloto, encontrados ${pilotSlugs.length}.`);
for (const s of EXPECTED_PILOTS) {
  if (!pilotSlugs.includes(s)) fail(`Piloto esperado ausente do registro: ${s}`);
}

const queueMatch = registry.match(/EDITORIAL_REVIEW_QUEUE\s*=\s*new Map[\s\S]*?\n\);/);
if (!queueMatch) {
  fail("EDITORIAL_REVIEW_QUEUE não encontrado.");
} else {
  const q = queueMatch[0];
  if (!/status:\s*"in_review"/.test(q)) fail("Fila não define status 'in_review'.");
  if (/approvedAt\s*:/.test(q)) fail("Fila contém approvedAt — proibido para pilotos.");
  if (/reviewedAt\s*:/.test(q)) fail("Fila contém reviewedAt — nenhuma revisão material concluída.");
  if (!/imageOrigin:\s*"unknown"/.test(q)) fail("Fila não mantém imageOrigin 'unknown'.");
  if (!/authorType:\s*"organization"/.test(q)) fail("Fila não usa autoria 'organization'.");
}

// ── 2. Manifesto de fontes / revisão técnica ─────────────────
if (!exists("src/lib/blogEditorialSources.ts")) {
  fail("src/lib/blogEditorialSources.ts ausente.");
}
const sourcesSrc = exists("src/lib/blogEditorialSources.ts") ? read("src/lib/blogEditorialSources.ts") : "";

// Fontes: toda URL absoluta https e host permitido.
const urls = [...sourcesSrc.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
if (urls.length === 0) warn("Nenhuma fonte cadastrada em EDITORIAL_SOURCES.");
for (const u of urls) {
  if (!/^https:\/\//.test(u)) {
    fail(`Fonte com URL não absoluta/insegura: ${u}`);
    continue;
  }
  let host;
  try {
    host = new URL(u).host;
  } catch {
    fail(`Fonte com URL inválida: ${u}`);
    continue;
  }
  if (!ALLOWED_SOURCE_HOSTS.has(host)) {
    fail(`Fonte em domínio não permitido/não classificado: ${host} (${u})`);
  }
}

// Manifesto por artigo.
const manifestSection = sourcesSrc.slice(
  sourcesSrc.indexOf("ARTICLE_SOURCE_MANIFEST"),
);
const manifestBlocks = extractSlugBlocks(manifestSection);
for (const slug of EXPECTED_PILOTS) {
  const block = manifestBlocks.get(slug);
  if (!block) {
    fail(`Manifesto de fontes sem entrada para: ${slug}`);
    continue;
  }
  const trM = block.match(/technicalReview:\s*"(pending|reviewed|blocked)"/);
  if (!trM) {
    fail(`"${slug}" sem technicalReview válido no manifesto.`);
    continue;
  }
  const status = trM[1];
  const factChecked = /factChecked:\s*true/.test(block);
  const sourceIds = [...(block.match(/sources:\s*\[([\s\S]*?)\]/)?.[1].matchAll(/"([^"]+)"/g) ?? [])].map((m) => m[1]);

  if (status === "reviewed") {
    if (!factChecked) fail(`"${slug}" está 'reviewed' mas factChecked não é true.`);
    if (sourceIds.length === 0) fail(`"${slug}" está 'reviewed' sem fontes obrigatórias.`);
  }
  if (CRITICAL_ALIGNMENT.has(slug) && status !== "blocked") {
    fail(`"${slug}" é desalinhamento crítico e deve estar 'blocked' (ou resolvido em rodada dedicada).`);
  }
  // Ids de fonte referenciados devem existir em EDITORIAL_SOURCES.
  for (const id of sourceIds) {
    if (!new RegExp(`"${id}":\\s*\\{`).test(sourcesSrc)) {
      fail(`"${slug}" referencia fonte inexistente: ${id}`);
    }
  }
}

// ── 3. Briefing de imagens ───────────────────────────────────
if (!exists("src/lib/blogEditorialImages.ts")) {
  fail("src/lib/blogEditorialImages.ts ausente.");
}
const imagesSrc = exists("src/lib/blogEditorialImages.ts") ? read("src/lib/blogEditorialImages.ts") : "";
const imgSection = imagesSrc.slice(imagesSrc.indexOf("EDITORIAL_IMAGE_BRIEFS"));
const imgBlocks = extractSlugBlocks(imgSection);
if (imgBlocks.size !== 8) fail(`Esperado 8 briefings de imagem, encontrados ${imgBlocks.size}.`);
for (const slug of EXPECTED_PILOTS) {
  const block = imgBlocks.get(slug);
  if (!block) {
    fail(`Briefing de imagem ausente para: ${slug}`);
    continue;
  }
  const statusM = block.match(/status:\s*"(briefed|captured|approved)"/);
  if (!statusM) fail(`"${slug}" briefing sem status válido.`);
  else if (statusM[1] !== "briefed") fail(`"${slug}" briefing não está 'briefed' (está '${statusM[1]}').`);
  if (!/aspectRatio:\s*"16:9"/.test(block)) fail(`"${slug}" briefing sem aspectRatio 16:9.`);
  if (!/textOverlay:\s*false/.test(block)) fail(`"${slug}" briefing sem textOverlay:false.`);
}

// ── 4. Corpo dos artigos: sem autoria pessoal/promessas ──────
const contentSrc = read("src/data/blogPostsContent.tsx");
const contentBlocks = extractSlugBlocks(contentSrc);
const forbiddenBody = [
  "revisado por",
  "reviewed by",
  "escrito por técnico",
  "técnico sênior",
  "especialista sênior",
];
for (const slug of EXPECTED_PILOTS) {
  const block = contentBlocks.get(slug);
  if (!block) {
    fail(`Conteúdo ausente para piloto: ${slug}`);
    continue;
  }
  const low = block.toLowerCase();
  for (const f of forbiddenBody) {
    if (low.includes(f)) fail(`"${slug}" contém autoria/credencial proibida no corpo: "${f}".`);
  }
  if (/"@type":\s*"Person"/.test(block) || /schema\.org\/Person/.test(block)) {
    fail(`"${slug}" contém Person no corpo.`);
  }
}

// Windows: sem ativador/crack/bypass/download não oficial.
const win = contentBlocks.get("como-instalar-windows-11-do-zero") ?? "";
for (const bad of ["ativador", "crack", "bypass de licença", "burlar", "kmspico", "serial gratis"]) {
  if (win.toLowerCase().includes(bad)) {
    // "não fornece ... ativador" / "burlar" em contexto negativo é permitido.
    const negOk = new RegExp(`(não|nao)[^.]{0,40}${bad}`, "i").test(win);
    if (!negOk) fail(`Windows: contém termo proibido fora de contexto negativo: "${bad}".`);
  }
}

// SSD: sem promessas absolutas.
const ssd = (contentBlocks.get("quando-trocar-hd-por-ssd") ?? "").toLowerCase();
for (const bad of ["dez vezes mais rápido", "como novo", "serve em qualquer computador", "fica novo"]) {
  if (ssd.includes(bad)) fail(`SSD: promessa absoluta proibida: "${bad}".`);
}

// ── 5. Sitemaps não contêm pilotos ──────────────────────────
const publicDir = rel("public");
const sitemaps = fs.readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"));
for (const sm of sitemaps) {
  const xml = fs.readFileSync(path.join(publicDir, sm), "utf8");
  for (const slug of EXPECTED_PILOTS) {
    if (xml.includes(`/blog/${slug}`)) {
      fail(`Piloto "${slug}" aparece no sitemap ${sm}.`);
    }
  }
}

// ── Relatório ────────────────────────────────────────────────
console.log("── check:editorial-technical-review ──");
console.log(`Pilotos: ${EXPECTED_PILOTS.length}`);
for (const slug of EXPECTED_PILOTS) {
  const b = manifestBlocks.get(slug) ?? "";
  const st = b.match(/technicalReview:\s*"([a-z]+)"/)?.[1] ?? "?";
  const src = [...(b.match(/sources:\s*\[([\s\S]*?)\]/)?.[1].matchAll(/"([^"]+)"/g) ?? [])].length;
  console.log(`  • ${slug} → technicalReview=${st}, sources=${src}, image=briefed`);
}
if (warnings.length) {
  console.log("\nAvisos:");
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (errors.length) {
  console.error("\n❌ FALHAS:");
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log("\n✅ Gate de revisão técnica aprovado.");
