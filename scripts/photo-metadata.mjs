// Utilitário compartilhado: leitura de metadados sensíveis de fotos (EXIF/GPS/IPTC/XMP).
// Usado por scripts/check-photo-privacy.mjs e scripts/strip-photo-exif.mjs.
import sharp from 'sharp';

const GPS_IFD_TAG = 0x8825;

/** Lê o ponteiro do IFD GPS dentro do bloco EXIF (TIFF header). */
export function exifHasGps(exifBuffer) {
  if (!exifBuffer || exifBuffer.length < 16) return false;
  // sharp devolve o bloco iniciado por "Exif\0\0" em muitos casos.
  let offset = 0;
  if (exifBuffer.slice(0, 4).toString('ascii') === 'Exif') offset = 6;
  const byteOrder = exifBuffer.slice(offset, offset + 2).toString('ascii');
  if (byteOrder !== 'II' && byteOrder !== 'MM') return false;
  const le = byteOrder === 'II';
  const u16 = (p) => (le ? exifBuffer.readUInt16LE(p) : exifBuffer.readUInt16BE(p));
  const u32 = (p) => (le ? exifBuffer.readUInt32LE(p) : exifBuffer.readUInt32BE(p));
  try {
    const ifd0 = offset + u32(offset + 4);
    const count = u16(ifd0);
    for (let i = 0; i < count; i += 1) {
      const entry = ifd0 + 2 + i * 12;
      if (entry + 12 > exifBuffer.length) break;
      if (u16(entry) === GPS_IFD_TAG) return true;
    }
  } catch {
    // Buffer inesperado: trata como suspeito (fail-closed no chamador).
    return true;
  }
  return false;
}

/** Retorna o inventário de metadados sensíveis de um arquivo de imagem. */
export async function inspectPhoto(file) {
  const meta = await sharp(file).metadata();
  const exif = meta.exif ?? null;
  return {
    file,
    format: meta.format,
    width: meta.width,
    height: meta.height,
    hasExif: Boolean(exif),
    hasGps: exif ? exifHasGps(exif) : false,
    hasIptc: Boolean(meta.iptc),
    hasXmp: Boolean(meta.xmp),
    hasIcc: Boolean(meta.icc),
  };
}
