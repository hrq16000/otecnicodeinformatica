#!/usr/bin/env node
// strip-photo-exif.mjs — remove EXIF, GPS, IPTC e XMP das fotos antes de anexar no GBP
// ou publicar no portal. Nunca sobrescreve o original: grava em uma pasta de saída.
//
// Uso:
//   node scripts/strip-photo-exif.mjs fotos/ --out fotos-limpas
//   node scripts/strip-photo-exif.mjs a.jpg b.jpg --out saida --max 2000 --quality 82
import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { inspectPhoto } from './photo-metadata.mjs';

const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);
const args = process.argv.slice(2);

function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const outDir = flag('out', null);
const maxSide = Number(flag('max', 2400));
const quality = Number(flag('quality', 85));
const targets = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));

if (!outDir || targets.length === 0) {
  console.error('uso: node scripts/strip-photo-exif.mjs <arquivo|pasta> [...] --out <pasta> [--max 2400] [--quality 85]');
  process.exit(2);
}

async function collect(target) {
  const info = await stat(target);
  if (info.isFile()) return EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  const entries = await readdir(target, { withFileTypes: true });
  const out = [];
  for (const entry of entries) out.push(...(await collect(path.join(target, entry.name))));
  return out;
}

const files = (await Promise.all(targets.map(collect))).flat();
if (files.length === 0) {
  console.error('Nenhuma imagem encontrada.');
  process.exit(2);
}

await mkdir(outDir, { recursive: true });
let residual = 0;

for (const file of files.sort()) {
  const base = path.parse(file).name;
  const dest = path.join(outDir, `${base}.jpg`);

  // sharp não copia metadados por padrão: a saída já nasce sem EXIF/GPS/IPTC/XMP.
  await sharp(file)
    .rotate() // aplica a orientação antes de descartar o EXIF
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(dest);

  const after = await inspectPhoto(dest);
  const clean = !after.hasExif && !after.hasGps && !after.hasIptc && !after.hasXmp;
  if (!clean) residual += 1;
  console.log(`${clean ? 'OK  ' : 'ALER'} ${file} → ${dest} (${after.width}x${after.height})`);
}

console.log(`\n${files.length} arquivo(s) processado(s) em ${outDir}. Residual com metadado: ${residual}.`);
console.log('Próximo passo: node scripts/check-photo-privacy.mjs ' + outDir + ' --ocr\n');
process.exit(residual ? 1 : 0);
