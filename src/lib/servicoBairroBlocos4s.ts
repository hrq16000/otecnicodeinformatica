// ─────────────────────────────────────────────────────────────
// ONDA 4S — BLOCOS AUTORAIS POR COMBINAÇÃO SERVIÇO × BAIRRO
//
// Fonte única: src/lib/servicoBairroBlocos4s.json (lido também pelo
// prerender estático em scripts/lib/blocos-4s.mjs, sem drift).
//
// Regra fail-closed: uma combinação só é indexável se tiver blocos
// próprios declarados aqui. Sem blocos → permanece noindex, follow.
// ─────────────────────────────────────────────────────────────
import data from "./servicoBairroBlocos4s.json";

export interface BlocoServicoBairro {
  titulo: string;
  paragrafos: string[];
}

const BLOCOS = (data as { blocos: Record<string, BlocoServicoBairro[]> }).blocos;

export const SERVICO_BAIRRO_BLOCOS_4S: Record<string, BlocoServicoBairro[]> = BLOCOS;

/** Chaves no formato `servico/bairro` com conteúdo próprio declarado. */
export const SERVICO_BAIRRO_BLOCOS_4S_KEYS = Object.keys(BLOCOS);

export function blocosServicoBairro(
  servicoSlug: string,
  bairroSlug: string,
): BlocoServicoBairro[] | null {
  return BLOCOS[`${servicoSlug}/${bairroSlug}`] ?? null;
}

export function temBlocosProprios(servicoSlug: string, bairroSlug: string): boolean {
  return Boolean(BLOCOS[`${servicoSlug}/${bairroSlug}`]?.length);
}
