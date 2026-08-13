#!/usr/bin/env node
/**
 * GATE — INTEGRIDADE E ORIGINALIDADE DAS IMAGENS PUBLICADAS.
 *
 * Roda sobre o build (dist) e valida TODA imagem realmente referenciada por
 * página indexável:
 *   • existência e tamanho mínimo (placeholder/ícone não passa);
 *   • unicidade por hash sha256 (mesma foto em páginas diferentes é reuso);
 *   • baixa originalidade: assinatura de bloco (primeiros bytes de pixel)
 *     igual entre arquivos distintos = provável recorte/reexport do mesmo ativo;
 *   • EXIF, quando existir: bloqueia geradores de IA no campo Software/
 *     ImageDescription (Midjourney, DALL·E, Stable Diffusion, Firefly, etc.);
 *   • nome de arquivo com marcação de IA.
 *
 * Uso: node scripts/check-image-integrity.mjs [dist] [--strict]
 * Saída: reports/image-integrity.json
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const DIST = path.resolve(process.argv[2]?.startsWith("--") ? "dist" : process.argv[2] || "dist");
const STRICT = process.argv.includes("--strict");
const MIN_BYTES = 12_000;
const RASTER = /\.(jpe?g|png|webp|avif)$/i;
const AI_NAME = /\b(ai[-_]?gen|generated[-_]?ai|midjourney|dalle|dall-e|stable[-_]?diffusion|firefly|sdxl|ia[-_]?gerad)/i;
const AI_EXIF = /(midjourney|dall[·.]?e|openai|stable diffusion|automatic1111|comfyui|adobe firefly|leonardo\.ai|ideogram|flux\.1|imagen)/i;

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

/** Lê os campos ASCII do EXIF de um JPEG (APP1/TIFF) sem dependências. */
function exifText(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null; // não é JPEG
  let off = 2;
  while (off + 4 < buf.length) {
    if (buf[off] !== 0xff) break;
    const marker = buf[off + 1];
    const size = buf.readUInt16BE(off + 2);
    if (marker === 0xe1) {
      const seg = buf.subarray(off + 4, off + 2 + size);
      // Apenas ASCII legível: suficiente para detectar assinatura de gerador.
      return seg.toString("latin1").replace(/[^\x20-\x7e]+/g, " ").trim();
    }
    if (marker === 0xda) break; // início dos dados comprimidos
    off += 2 + size;
  }
  return null;
}

/** Assinatura de bloco: amostra determinística do miolo do arquivo. */
function blockSignature(buf) {
  const start = Math.floor(buf.length * 0.25);
  const slice = buf.subarray(start, start + 4096);
  return createHash("sha1").update(slice).digest("hex").slice(0, 16);
}

const htmlFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e === "index.html") htmlFiles.push(full);
  }
})(DIST);

const byHash = new Map();
const bySignature = new Map();
const errors = [];
const warnings = [];
const paginas = [];

for (const file of htmlFiles.sort()) {
  const html = readFileSync(file, "utf8");
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  if (/noindex/i.test(robots)) continue;
  const route =
    ("/" + path.relative(DIST, file).replace(/index\.html$/, "").replace(/\\/g, "/")).replace(/\/$/, "") || "/";

  const srcs = new Set();
  for (const m of html.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/gi)) srcs.add(m[1]);
  for (const m of html.matchAll(/<source\b[^>]*?\ssrcset="([^"]+)"/gi))
    m[1].split(",").forEach((p) => srcs.add(p.trim().split(/\s+/)[0]));

  const imagens = [];
  for (const src of srcs) {
    if (!src.startsWith("/") || !RASTER.test(src)) continue;
    const abs = path.join(DIST, src.split("?")[0]);
    if (!existsSync(abs)) {
      errors.push(`${route}: imagem ausente no build → ${src}`);
      continue;
    }
    if (AI_NAME.test(src)) {
      errors.push(`${route}: nome de arquivo sinaliza imagem de IA → ${src}`);
      continue;
    }
    const buf = readFileSync(abs);
    if (buf.length < MIN_BYTES) {
      warnings.push(`${route}: imagem muito pequena (${buf.length}B) → ${src}`);
    }
    const exif = exifText(buf);
    if (exif && AI_EXIF.test(exif)) {
      errors.push(`${route}: EXIF indica gerador de IA → ${src}`);
      continue;
    }
    const hash = createHash("sha256").update(buf).digest("hex").slice(0, 16);
    const sig = blockSignature(buf);
    byHash.set(hash, new Set([...(byHash.get(hash) ?? []), src]));
    bySignature.set(sig, new Set([...(bySignature.get(sig) ?? []), src]));
    imagens.push({ src, bytes: buf.length, hash, sig, exif: Boolean(exif) });
  }
  paginas.push({ route, total: imagens.length, imagens });
}

// Reuso relevante = ARQUIVOS diferentes com o mesmo conteúdo (cópia duplicada).
// A mesma foto aparecer em listagem + página do post não é duplicidade.
for (const [hash, files] of byHash) {
  if (files.size > 1) warnings.push(`arquivo duplicado (${hash}): ${[...files].join(" · ")}`);
}
// Cobertura fotográfica: página indexável cujo único "conteúdo visual" é a marca.
const BRAND = /\/(logo|og-|favicon)/i;
for (const p of paginas) {
  const reais = p.imagens.filter((i) => !BRAND.test(i.src));
  if (!reais.length) warnings.push(`${p.route}: sem foto real (apenas marca) — priorizar na próxima onda`);
}
for (const [sig, files] of bySignature) {
  if (files.size > 1) warnings.push(`baixa originalidade (assinatura ${sig}): ${[...files].join(" · ")}`);
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  dist: DIST,
  minBytes: MIN_BYTES,
  paginas: paginas.length,
  imagens: paginas.reduce((n, p) => n + p.total, 0),
  unicas: byHash.size,
  semFotoReal: paginas.filter((p) => p.imagens.every((i) => /\/(logo|og-|favicon)/i.test(i.src))).map((p) => p.route),
  semImagem: paginas.filter((p) => p.total === 0).map((p) => p.route),
  errors,
  warnings,
  detalhe: paginas,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/image-integrity.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(
  `Imagens: ${relatorio.imagens} referências · ${relatorio.unicas} únicas em ${relatorio.paginas} páginas indexáveis`,
);
if (relatorio.semImagem.length)
  console.log(`Páginas indexáveis sem imagem: ${relatorio.semImagem.length} → ${relatorio.semImagem.slice(0, 10).join(", ")}`);
for (const w of warnings.slice(0, 20)) console.log(`  ⚠ ${w}`);

if (errors.length) {
  console.error(`\n✖ ${errors.length} problema(s) bloqueante(s) de imagem:`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}
if (STRICT && warnings.length) {
  console.error(`\n✖ modo --strict: ${warnings.length} alerta(s) tratados como erro.`);
  process.exit(1);
}
console.log("✔ Nenhuma imagem de IA, ausente ou bloqueante.");
