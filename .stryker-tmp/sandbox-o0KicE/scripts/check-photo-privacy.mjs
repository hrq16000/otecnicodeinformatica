#!/usr/bin/env node
// @ts-nocheck
// check-photo-privacy.mjs — sinaliza fotos com EXIF/GPS ou metadados pessoais antes da
// aprovação para GBP/portal. Fail-closed: qualquer GPS/EXIF residual reprova.
//
// Uso:
//   node scripts/check-photo-privacy.mjs <arquivo|pasta> [...]
//   node scripts/check-photo-privacy.mjs fotos/ --ocr   (OCR opcional via pytesseract)
//
// Saída: relatório por arquivo + exit code 1 se houver reprovação.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { inspectPhoto } from './photo-metadata.mjs';

const execFileAsync = promisify(execFile);
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic']);

const args = process.argv.slice(2);
const useOcr = args.includes('--ocr');
const targets = args.filter((a) => !a.startsWith('--'));

if (targets.length === 0) {
  console.error('uso: node scripts/check-photo-privacy.mjs <arquivo|pasta> [...] [--ocr]');
  process.exit(2);
}

async function collect(target) {
  const info = await stat(target);
  if (info.isFile()) return EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  const entries = await readdir(target, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    out.push(...(await collect(path.join(target, entry.name))));
  }
  return out;
}

// OCR opcional: procura padrões de dado pessoal visível na própria foto.
const PATTERNS = [
  [/\b(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/, 'telefone/WhatsApp visível'],
  [/[\w.+-]+@[\w-]+\.[\w.]+/, 'e-mail visível'],
  [/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/, 'CPF visível'],
  [/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/, 'CNPJ visível'],
  [/\b\d{5}-?\d{3}\b/, 'CEP visível'],
  [/\b(senha|password|wi-?fi)\b/i, 'credencial visível'],
];

async function ocrFindings(file) {
  try {
    const { stdout } = await execFileAsync('python3', [
      '-c',
      'import sys,pytesseract\nfrom PIL import Image\nprint(pytesseract.image_to_string(Image.open(sys.argv[1]), lang="por+eng"))',
      file,
    ]);
    return PATTERNS.filter(([re]) => re.test(stdout)).map(([, label]) => label);
  } catch {
    return ['__ocr_indisponivel__'];
  }
}

const files = (await Promise.all(targets.map(collect))).flat();
if (files.length === 0) {
  console.error('Nenhuma imagem encontrada nos caminhos informados.');
  process.exit(2);
}

let failed = 0;
console.log(`\nAuditoria de privacidade — ${files.length} arquivo(s)\n`);

for (const file of files.sort()) {
  const meta = await inspectPhoto(file);
  const problems = [];
  if (meta.hasGps) problems.push('GPS embutido');
  if (meta.hasExif) problems.push('EXIF presente');
  if (meta.hasIptc) problems.push('IPTC presente');
  if (meta.hasXmp) problems.push('XMP presente');

  let ocr = [];
  if (useOcr) {
    ocr = await ocrFindings(file);
    if (ocr.includes('__ocr_indisponivel__')) {
      ocr = [];
      console.log(`  (OCR indisponível para ${path.basename(file)} — revisão visual manual obrigatória)`);
    }
  }
  problems.push(...ocr);

  const ok = problems.length === 0;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${file}  [${meta.format} ${meta.width}x${meta.height}]` +
      (ok ? '' : `\n      → ${problems.join(' · ')}`),
  );
}

console.log(
  `\nResumo: ${files.length - failed} aprovada(s) · ${failed} reprovada(s).` +
    (failed ? '\nRode: node scripts/strip-photo-exif.mjs <arquivos> --out <pasta>\n' : '\n'),
);
console.log(
  'Lembrete: metadado limpo não substitui a checagem visual de 15 itens de ' +
    'docs/rodada-4i-m-execucao-manual.md (nome, OS, etiqueta, tela privada).\n',
);

process.exit(failed ? 1 : 0);
