#!/usr/bin/env node
// @ts-nocheck
/**
 * PIPELINE DE FOTOS REAIS → WebP/AVIF responsivos, com revalidação de privacidade.
 *
 * O que faz, em ordem (fail-closed):
 *   1. inspeciona cada foto e RECUSA publicar se ainda houver EXIF/GPS/IPTC/XMP;
 *   2. gera variantes responsivas (768 / 1280 / 1536 px) em WebP e AVIF;
 *   3. aplica teto de peso por variante (padrão 220 KB) reduzindo a qualidade;
 *   4. imprime um resumo com o ganho de bytes.
 *
 * Uso:
 *   node scripts/optimize-photos.mjs src/assets/bancada --out src/assets/bancada
 *   node scripts/optimize-photos.mjs foto.jpg --out src/assets --widths 768,1280 --max-kb 180
 *   node scripts/optimize-photos.mjs src/assets --dry-run
 *
 * Requisito de privacidade: rode antes `npm run photos:strip-exif`. Este script
 * NÃO limpa metadados — ele bloqueia a publicação quando encontra algum.
 */
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { inspectPhoto } from "./photo-metadata.mjs";

const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const args = process.argv.slice(2);

const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const outDir = flag("out", null);
const widths = String(flag("widths", "768,1280,1536"))
  .split(",")
  .map((w) => Number(w.trim()))
  .filter((w) => Number.isFinite(w) && w > 0);
const maxKb = Number(flag("max-kb", 220));
const dryRun = has("dry-run");
const targets = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

if (targets.length === 0 || (!outDir && !dryRun)) {
  console.error(
    "uso: node scripts/optimize-photos.mjs <arquivo|pasta> [...] --out <pasta> [--widths 768,1280,1536] [--max-kb 220] [--dry-run]",
  );
  process.exit(2);
}

async function collect(target) {
  const info = await stat(target);
  if (info.isFile()) return SOURCE_EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  const entries = await readdir(target, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(full)));
    else if (SOURCE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

/** Comprime até caber no teto de peso, degradando a qualidade em passos. */
async function encodeWithBudget(pipeline, format, budgetBytes) {
  const steps = format === "avif" ? [58, 48, 40, 32] : [82, 74, 66, 58];
  let last = null;
  for (const quality of steps) {
    const buf = await pipeline
      .clone()
      [format]({ quality, effort: format === "avif" ? 4 : 5 })
      .toBuffer();
    last = { buf, quality };
    if (buf.byteLength <= budgetBytes) return last;
  }
  return last;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  const files = (await Promise.all(targets.map(collect))).flat();
  // ignora variantes já geradas por este pipeline
  const sources = files.filter((f) => !/-(\d{3,4})\.(webp|avif)$/i.test(f));

  if (sources.length === 0) {
    console.error("nenhuma foto de origem encontrada.");
    process.exit(2);
  }

  const blocked = [];
  const rows = [];
  let inBytes = 0;
  let outBytes = 0;

  for (const file of sources) {
    const report = await inspectPhoto(file);
    const dirty = report?.findings?.length ? report.findings : [];
    if (dirty.length) {
      blocked.push({ file, dirty });
      continue;
    }

    const original = await stat(file);
    inBytes += original.size;

    const base = path.basename(file, path.extname(file));
    const dest = outDir ? path.resolve(outDir) : path.dirname(file);
    if (!dryRun) await mkdir(dest, { recursive: true });

    const meta = await sharp(file).metadata();
    for (const width of widths) {
      if (meta.width && meta.width < width) continue;
      const resized = sharp(file).rotate().resize({ width, withoutEnlargement: true });
      for (const format of ["webp", "avif"]) {
        const { buf, quality } = await encodeWithBudget(resized, format, maxKb * 1024);
        outBytes += buf.byteLength;
        const target = path.join(dest, `${base}-${width}.${format}`);
        if (!dryRun) await writeFile(target, buf);
        rows.push({
          file: path.relative(process.cwd(), target),
          size: buf.byteLength,
          quality,
          over: buf.byteLength > maxKb * 1024,
        });
      }
    }
  }

  if (blocked.length) {
    console.error("BLOQUEADO — fotos ainda com metadados sensíveis (rode npm run photos:strip-exif antes):");
    for (const b of blocked) console.error(`  • ${b.file}: ${b.dirty.map((d) => d.type || d).join(", ")}`);
    process.exit(1);
  }

  for (const r of rows) {
    console.log(`  ${r.over ? "!" : "✓"} ${r.file} — ${kb(r.size)} (q${r.quality})`);
  }
  const over = rows.filter((r) => r.over);
  console.log(
    `[optimize-photos] ${sources.length} origem(ns) → ${rows.length} variantes | origem ${kb(inBytes)} → variantes ${kb(outBytes)}${dryRun ? " (dry-run)" : ""}`,
  );
  if (over.length) {
    console.error(`BLOQUEADO — ${over.length} variante(s) acima do teto de ${maxKb} KB.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
