/**
 * ============================================================================
 * RODADA 2C — INVENTÁRIO E CLASSIFICAÇÃO DAS URLs LOCAIS
 * ============================================================================
 * Fonte única da estratégia local. Classificação:
 *
 *   L1 — página local principal (alta prioridade, conteúdo próprio)
 *   L2 — página local complementar (útil, depende de serviço/região)
 *   L3 — potencial futura (sem conteúdo suficiente ainda)
 *   L4 — redundante (canibaliza outra página)
 *   L5 — doorway/thin (só troca cidade/bairro)
 *   L6 — legado (fora da estratégia atual)
 *
 * Regra: somente L1 e L2 podem ser indexáveis e entrar no sitemap.
 * Todo o resto renderiza `noindex, follow` e fica fora dos shards.
 */

/** Tipos de rota local. */
export const TIPOS = {
  CIDADE: "cidade",
  BAIRRO: "bairro",
  SERVICO_CIDADE: "servico×cidade",
  SERVICO_BAIRRO: "servico×bairro",
  NACIONAL: "nacional",
  LEGADO: "legado",
};

/** Cidades — Nível 1 (prioridade real) e Nível 2 (operação já configurada). */
export const CIDADES_LOCAIS = [
  { path: "/tecnico-informatica-curitiba", nivel: 1, classe: "L1" },
  { path: "/tecnico-informatica-sao-jose-pinhais", nivel: 1, classe: "L1" },
  { path: "/tecnico-informatica-pinhais", nivel: 2, classe: "L2" },
  { path: "/tecnico-informatica-colombo", nivel: 2, classe: "L2" },
  { path: "/tecnico-informatica-araucaria", nivel: 2, classe: "L2" },
  { path: "/tecnico-informatica-campo-largo", nivel: 2, classe: "L2" },
  // Municípios sem operação declarada: rota existe, mas não é indexável.
  { path: "/tecnico-informatica-fazenda-rio-grande", nivel: 3, classe: "L3" },
  { path: "/tecnico-informatica-almirante-tamandare", nivel: 3, classe: "L3" },
  { path: "/tecnico-informatica-piraquara", nivel: 3, classe: "L3" },
  { path: "/tecnico-informatica-campo-magro", nivel: 3, classe: "L3" },
  { path: "/tecnico-informatica-quatro-barras", nivel: 3, classe: "L3" },
].map((e) => ({ ...e, tipo: TIPOS.CIDADE }));

/** Bairros-âncora de Curitiba aprovados pelos critérios do item 10. */
export const BAIRROS_LOCAIS = [
  { path: "/bairros/cic", classe: "L2" },
  { path: "/bairros/batel", classe: "L2" },
  { path: "/bairros/agua-verde", classe: "L2" },
  { path: "/bairros/centro", classe: "L2" },
  { path: "/bairros/portao", classe: "L2" },
].map((e) => ({ ...e, tipo: TIPOS.BAIRRO }));

/**
 * Clusters mantidos fora do índice nesta rodada.
 * Prefixos: qualquer rota que comece com o prefixo é considerada não indexável.
 */
export const PREFIXOS_NAO_INDEXAVEIS = [
  { prefix: "/arrumar-pc", classe: "L6", motivo: "cluster nacional fora da região prioritária" },
  { prefix: "/servicos/", suffixSegments: 3, classe: "L5", motivo: "serviço × localidade programático (doorway)" },
];

/** Conjunto plano de URLs locais indexáveis declaradas (L1 + L2). */
export const LOCAIS_INDEXAVEIS = [...CIDADES_LOCAIS, ...BAIRROS_LOCAIS]
  .filter((e) => e.classe === "L1" || e.classe === "L2")
  .map((e) => e.path);

/** Todas as URLs locais declaradas (para o relatório de inventário). */
export const LOCAIS_DECLARADOS = [...CIDADES_LOCAIS, ...BAIRROS_LOCAIS];

/**
 * Pares com sobreposição estrutural aceita (mesma família de template),
 * documentados explicitamente. Não isenta de revisão editorial.
 */
export const SIMILARITY_ALLOWLIST = [
  // vazio: nenhum par de páginas locais indexáveis tem isenção hoje.
];

/** Limiares de similaridade editorial (Jaccard sobre 5-gramas do <main>). */
export const SIMILARITY_THRESHOLDS = {
  critico: 0.9,
  alto: 0.8,
  revisar: 0.7,
};
