/**
 * ============================================================================
 * PRIMEIRA ONDA EDITORIAL INDEXÁVEL — Rodada 4H
 * ============================================================================
 * Fonte única (build/gates) dos artigos editoriais liberados para indexação.
 * Espelha `APPROVED_EDITORIAL_CONTENT` em `src/lib/blogEditorialRegistry.ts`
 * (paridade validada por `scripts/check-editorial-governance.mjs`).
 *
 * Regras da onda:
 *   • Só entra artigo com revisão técnica concluída (blogEditorialSources.ts),
 *     imagem própria com origem declarada e aprovação editorial datada.
 *   • Todo artigo aqui é indexável, entra no sitemap-editorial.xml e recebe
 *     HTML estático próprio com BlogPosting + BreadcrumbList.
 *   • Qualquer artigo fora desta lista permanece noindex, follow e fora de
 *     todos os sitemaps (fail-closed).
 */

export const EDITORIAL_WAVE = [
  {
    slug: "notebook-nao-liga-o-que-fazer",
    approvedAt: "2026-08-06",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/notebook-nao-liga-o-que-fazer.jpg",
  },
  {
    slug: "computador-lento-causas-solucoes",
    approvedAt: "2026-08-06",
    pilar: "/servicos/manutencao-de-computador",
    pilarLabel: "Manutenção de computador em Curitiba",
    apoio: "/servicos/upgrade-ssd-ram",
    apoioLabel: "Upgrade de SSD e memória",
    cover: "/blog/computador-lento-causas-solucoes.jpg",
  },
  {
    slug: "quando-trocar-hd-por-ssd",
    approvedAt: "2026-08-06",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória",
    apoio: "/quando-nao-compensa",
    apoioLabel: "Quando o reparo não compensa",
    cover: "/blog/quando-trocar-hd-por-ssd.jpg",
  },
  {
    slug: "como-saber-se-pc-tem-virus-malware",
    approvedAt: "2026-08-06",
    pilar: "/servicos/remocao-de-virus",
    pilarLabel: "Remoção de vírus e malware",
    apoio: "/servicos/formatacao",
    apoioLabel: "Formatação e instalação do sistema",
    cover: "/blog/como-saber-se-pc-tem-virus-malware.jpg",
  },
  {
    slug: "backup-como-proteger-seus-arquivos",
    approvedAt: "2026-08-06",
    pilar: "/servicos/recuperacao-de-dados",
    pilarLabel: "Recuperação de dados",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/backup-como-proteger-seus-arquivos.jpg",
  },
  {
    slug: "como-melhorar-sinal-wifi-em-casa",
    approvedAt: "2026-08-06",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Redes e Wi-Fi",
    apoio: "/atendimento-domicilio",
    apoioLabel: "Atendimento técnico no endereço",
    cover: "/blog/como-melhorar-sinal-wifi-em-casa.jpg",
  },
];

export const EDITORIAL_WAVE_SLUGS = EDITORIAL_WAVE.map((a) => a.slug);

const BY_SLUG = new Map(EDITORIAL_WAVE.map((a) => [a.slug, a]));

export function getWaveArticle(slug) {
  return BY_SLUG.get(slug);
}

export function isWaveApproved(slug) {
  return BY_SLUG.has(slug);
}
