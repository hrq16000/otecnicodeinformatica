/**
 * Cobertura local para hubs de categoria (TV, Som, Videogame, Celular).
 * Curitiba + RMC + bairros principais. Reusado por todos os templates de categoria.
 */

export type LocalKind = "cidade" | "bairro";

export interface LocalData {
  slug: string;
  nome: string;
  kind: LocalKind;
  /** Cidade-mãe para bairros (ex.: "Curitiba"). */
  cidadeMae?: string;
  /** UF — sempre PR no MVP. */
  uf: "PR";
}

export const LOCAIS: LocalData[] = [
  // Cidades RMC
  { slug: "curitiba", nome: "Curitiba", kind: "cidade", uf: "PR" },
  { slug: "sao-jose-dos-pinhais", nome: "São José dos Pinhais", kind: "cidade", uf: "PR" },
  { slug: "araucaria", nome: "Araucária", kind: "cidade", uf: "PR" },
  { slug: "pinhais", nome: "Pinhais", kind: "cidade", uf: "PR" },
  { slug: "colombo", nome: "Colombo", kind: "cidade", uf: "PR" },
  { slug: "campo-largo", nome: "Campo Largo", kind: "cidade", uf: "PR" },
  { slug: "almirante-tamandare", nome: "Almirante Tamandaré", kind: "cidade", uf: "PR" },
  { slug: "fazenda-rio-grande", nome: "Fazenda Rio Grande", kind: "cidade", uf: "PR" },
  { slug: "piraquara", nome: "Piraquara", kind: "cidade", uf: "PR" },
  { slug: "quatro-barras", nome: "Quatro Barras", kind: "cidade", uf: "PR" },
  { slug: "campo-magro", nome: "Campo Magro", kind: "cidade", uf: "PR" },

  // Bairros Curitiba
  { slug: "batel", nome: "Batel", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "centro", nome: "Centro", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "cic", nome: "CIC", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "portao", nome: "Portão", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "santa-felicidade", nome: "Santa Felicidade", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "boqueirao", nome: "Boqueirão", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "cajuru", nome: "Cajuru", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
  { slug: "agua-verde", nome: "Água Verde", kind: "bairro", cidadeMae: "Curitiba", uf: "PR" },
];

export function findLocal(slug?: string): LocalData | undefined {
  if (!slug) return undefined;
  return LOCAIS.find((l) => l.slug === slug);
}

export function localFullName(l: LocalData): string {
  return l.kind === "bairro" ? `${l.nome} (${l.cidadeMae})` : l.nome;
}
