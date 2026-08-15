#!/usr/bin/env node
/**
 * ONDA 30 — dossiê de revisão de fotos reais (painel /admin/fotos).
 *
 * Para cada fotografia licenciada do manifesto gera:
 *   • preview (src público), bytes e hash sha256;
 *   • EXIF legível quando existir (bloqueia assinatura de gerador de IA);
 *   • rotas que usam a foto e reuso entre rotas;
 *   • páginas indexáveis ainda SEM foto real (de reports/image-integrity.json).
 *
 * Saída: public/photo-review.json (lido pelo painel) + reports/photo-review.json
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { FOTOS, FOTO_POR_ROTA } from "./lib/fotos-rotas.mjs";

const AI_EXIF =
  /(midjourney|dall[·.]?e|openai|stable diffusion|automatic1111|comfyui|adobe firefly|leonardo\.ai|ideogram|flux\.1|imagen)/i;

const json = (f, fb) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return fb;
  }
};

/** Campos ASCII do EXIF (APP1) de um JPEG, sem dependências. */
function exifText(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let off = 2;
  while (off + 4 < buf.length) {
    if (buf[off] !== 0xff) break;
    const marker = buf[off + 1];
    const size = buf.readUInt16BE(off + 2);
    if (marker === 0xe1)
      return buf
        .subarray(off + 4, off + 2 + size)
        .toString("latin1")
        .replace(/[^\x20-\x7e]+/g, " ")
        .trim()
        .slice(0, 400);
    if (marker === 0xda) break;
    off += 2 + size;
  }
  return null;
}

const rotasPorSlug = new Map();
for (const [rota, slug] of FOTO_POR_ROTA) {
  rotasPorSlug.set(slug, [...(rotasPorSlug.get(slug) ?? []), rota]);
}

const erros = [];
const fotos = [];
for (const f of FOTOS.values()) {
  const file = `public${f.src}`;
  if (!existsSync(file)) {
    erros.push(`${f.slug}: arquivo ausente (${file})`);
    continue;
  }
  const buf = readFileSync(file);
  const exif = exifText(buf);
  if (exif && AI_EXIF.test(exif)) erros.push(`${f.slug}: EXIF indica gerador de IA`);
  fotos.push({
    ...f,
    bytes: statSync(file).size,
    hash: createHash("sha256").update(buf).digest("hex").slice(0, 16),
    exif,
    exifSuspeito: Boolean(exif && AI_EXIF.test(exif)),
    rotas: rotasPorSlug.get(f.slug) ?? [],
    reuso: (rotasPorSlug.get(f.slug) ?? []).length > 1,
  });
}

const integridade = json("reports/image-integrity.json", { semFotoReal: [], semImagem: [] });

const relatorio = {
  generatedAt: new Date().toISOString(),
  totalFotos: fotos.length,
  comReuso: fotos.filter((f) => f.reuso).length,
  fotos: fotos.sort((a, b) => a.slug.localeCompare(b.slug)),
  paginasSemFotoReal: integridade.semFotoReal ?? [],
  paginasSemImagem: integridade.semImagem ?? [],
  erros,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/photo-review.json", `${JSON.stringify(relatorio, null, 2)}\n`);
writeFileSync("public/photo-review.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(
  `photo-review: ${relatorio.totalFotos} foto(s) real(is) · ${relatorio.comReuso} com reuso · ` +
    `${relatorio.paginasSemFotoReal.length} página(s) sem foto real.`,
);
if (erros.length) {
  console.error("✖ problemas bloqueantes:");
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
