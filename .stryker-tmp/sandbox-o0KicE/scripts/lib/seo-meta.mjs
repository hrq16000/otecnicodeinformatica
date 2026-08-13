/**
 * Normalização de <title> e <meta description> para rotas programáticas.
 * Limites alinhados ao gate scripts/check-meta-uniqueness.mjs.
 */
// @ts-nocheck

export const TITLE_MIN = 25;
export const TITLE_MAX = 70;
export const DESC_MIN = 70;
export const DESC_MAX = 165;

const collapse = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

/** Corta em fronteira de palavra, sem reticências penduradas. */
export function clamp(text, max) {
  const t = collapse(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:·|—-]+$/, "")}…`;
}

/**
 * Monta o título com sufixo de marca somente quando couber no limite.
 * Sem sufixo, o próprio título é reduzido em fronteira de palavra.
 */
export function normalizeTitle(base, brand) {
  const t = collapse(base);
  const withBrand = `${t} | ${brand}`;
  if (withBrand.length <= TITLE_MAX) return withBrand;
  if (t.length <= TITLE_MAX) return t;
  return clamp(t, TITLE_MAX);
}

/**
 * Garante descrição dentro da janela. Descrições curtas recebem um
 * complemento factual (nunca inventado) até atingir o mínimo.
 */
export function normalizeDescription(base, filler) {
  let d = collapse(base);
  if (d.length < DESC_MIN && filler) {
    d = `${d.replace(/[.\s]+$/, "")}. ${collapse(filler)}`;
  }
  return clamp(d, DESC_MAX);
}
