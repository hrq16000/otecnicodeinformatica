/**
 * ============================================================================
 * RODADA 4F — CLUSTER EDITORIAL (fonte única)
 * ============================================================================
 * Mapa determinístico entre conteúdo editorial e páginas-pilar comerciais.
 *
 * Regras não negociáveis:
 *  - Artigo NUNCA disputa a intenção transacional do pilar.
 *  - Todo conteúdo prioritário aponta para exatamente 1 pilar canônico.
 *  - CTA editorial abre a triagem (PF ou PJ). Nunca WhatsApp direto.
 *  - Nada aqui aprova artigo para indexação: a aprovação continua
 *    exclusivamente em src/lib/blogEditorialRegistry.ts (fail-closed).
 */

export type EditorialClusterId =
  | "defeito-hardware"
  | "lentidao-desempenho"
  | "ssd-memoria-upgrade"
  | "formatacao-sistema-virus"
  | "backup-recuperacao"
  | "redes-wifi"
  | "atendimento-endereco"
  | "suporte-remoto"
  | "ti-empresas"
  | "montagem-workstation"
  | "custo-beneficio"
  | "fundamentos-informatica";

export type EditorialAction =
  | "aprofundar"
  | "atualizar"
  | "consolidar"
  | "manter-noindex"
  | "fora-de-foco";

export type CtaBranch = "pf" | "pj";

export interface EditorialCluster {
  id: EditorialClusterId;
  nome: string;
  /** Página comercial canônica (pilar) que recebe a autoridade do cluster. */
  pilar: string;
  pilarLabel: string;
  /** Pilar secundário opcional (modalidade / decisão). */
  pilarApoio?: string;
  ctaBranch: CtaBranch;
  /** Intenção do pilar — artigos do cluster não podem repeti-la. */
  intencaoPilar: string;
}

export const EDITORIAL_CLUSTERS: Record<EditorialClusterId, EditorialCluster> = {
  "defeito-hardware": {
    id: "defeito-hardware",
    nome: "Computador e notebook com defeito",
    pilar: "/servicos/manutencao-de-computador",
    pilarLabel: "Manutenção e conserto de computador",
    pilarApoio: "/servicos/manutencao-de-notebook",
    ctaBranch: "pf",
    intencaoPilar: "contratar conserto de computador/notebook em Curitiba",
  },
  "lentidao-desempenho": {
    id: "lentidao-desempenho",
    nome: "Lentidão, travamentos e desempenho",
    pilar: "/servicos/manutencao-de-computador",
    pilarLabel: "Manutenção e diagnóstico de desempenho",
    pilarApoio: "/servicos/upgrade-ssd-ram",
    ctaBranch: "pf",
    intencaoPilar: "contratar manutenção para computador lento",
  },
  "ssd-memoria-upgrade": {
    id: "ssd-memoria-upgrade",
    nome: "SSD, memória e upgrades",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória",
    pilarApoio: "/quando-nao-compensa",
    ctaBranch: "pf",
    intencaoPilar: "contratar upgrade de SSD/RAM em Curitiba",
  },
  "formatacao-sistema-virus": {
    id: "formatacao-sistema-virus",
    nome: "Formatação, sistema e vírus",
    pilar: "/servicos/formatacao",
    pilarLabel: "Formatação e instalação de sistema",
    pilarApoio: "/servicos/remocao-de-virus",
    ctaBranch: "pf",
    intencaoPilar: "contratar formatação ou remoção de vírus",
  },
  "backup-recuperacao": {
    id: "backup-recuperacao",
    nome: "Backup e recuperação de dados",
    pilar: "/servicos/recuperacao-de-dados",
    pilarLabel: "Recuperação de dados",
    ctaBranch: "pf",
    intencaoPilar: "contratar recuperação de dados em Curitiba",
  },
  "redes-wifi": {
    id: "redes-wifi",
    nome: "Redes e Wi-Fi",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Redes e Wi-Fi",
    ctaBranch: "pf",
    intencaoPilar: "contratar instalação/ajuste de rede e Wi-Fi",
  },
  "atendimento-endereco": {
    id: "atendimento-endereco",
    nome: "Atendimento técnico no endereço",
    pilar: "/atendimento-domicilio",
    pilarLabel: "Atendimento técnico no endereço",
    pilarApoio: "/precos-e-politicas",
    ctaBranch: "pf",
    intencaoPilar: "agendar atendimento a domicílio em Curitiba",
  },
  "suporte-remoto": {
    id: "suporte-remoto",
    nome: "Suporte remoto",
    pilar: "/atendimento-remoto",
    pilarLabel: "Suporte remoto",
    ctaBranch: "pf",
    intencaoPilar: "agendar suporte remoto",
  },
  "ti-empresas": {
    id: "ti-empresas",
    nome: "Suporte de TI para empresas",
    pilar: "/empresa-de-ti-curitiba",
    pilarLabel: "Suporte de TI para empresas em Curitiba",
    pilarApoio: "/servicos/suporte-tecnico-empresarial",
    ctaBranch: "pj",
    intencaoPilar: "contratar suporte de TI empresarial em Curitiba",
  },
  "montagem-workstation": {
    id: "montagem-workstation",
    nome: "Montagem e dimensionamento de estação de trabalho",
    pilar: "/servicos/montagem-de-pc",
    pilarLabel: "Montagem de PC sob medida",
    pilarApoio: "/servicos/upgrade-ssd-ram",
    ctaBranch: "pj",
    intencaoPilar: "contratar montagem de PC/estação de trabalho em Curitiba",
  },
  "custo-beneficio": {
    id: "custo-beneficio",
    nome: "Decisão de reparo e custo-benefício",
    pilar: "/quando-nao-compensa",
    pilarLabel: "Quando o reparo não compensa",
    pilarApoio: "/precos-e-politicas",
    ctaBranch: "pf",
    intencaoPilar: "decidir entre reparar e substituir com avaliação técnica",
  },
  "fundamentos-informatica": {
    id: "fundamentos-informatica",
    nome: "Fundamentos de informática",
    pilar: "/blog",
    pilarLabel: "Hub de guias técnicos",
    pilarApoio: "/como-funciona",
    ctaBranch: "pf",
    intencaoPilar: "aprender os fundamentos de informática",
  },
};

export interface EditorialEntry {
  slug: string;
  cluster: EditorialClusterId;
  /** Ação definida no inventário da Rodada 4F. */
  acao: EditorialAction;
  /** Consulta-alvo (informacional) — nunca a intenção transacional do pilar. */
  consulta: string;
  /** Slugs relacionados (progressão lógica), no máximo 3. */
  relacionados?: string[];
  /** Slug canônico quando a ação é "consolidar". */
  consolidarEm?: string;
  nota?: string;
}

/**
 * PRIMEIRA ONDA — limites da Rodada 4F:
 *   8 aprofundamentos + 4 novos + 4 consolidações + 4 noindex/arquivo.
 * Os 4 "novos" só entram quando não houver equivalente no acervo; nesta
 * rodada nenhum conteúdo novo foi criado — os equivalentes já existem e
 * foram classificados como aprofundamento. Ver docs/rodada-4f-cluster-editorial.md.
 */
export const EDITORIAL_FIRST_WAVE: EditorialEntry[] = [
  // ── 8 aprofundamentos (fila de revisão editorial) ──────────
  {
    slug: "notebook-nao-liga-o-que-fazer",
    cluster: "defeito-hardware",
    acao: "aprofundar",
    consulta: "notebook não liga o que fazer",
    relacionados: ["pc-nao-liga-o-que-fazer", "notebook-superaquecendo-o-que-fazer"],
  },
  {
    slug: "computador-lento-causas-solucoes",
    cluster: "lentidao-desempenho",
    acao: "aprofundar",
    consulta: "computador lento causas",
    relacionados: ["quando-trocar-hd-por-ssd", "como-saber-se-pc-tem-virus-malware"],
  },
  {
    slug: "quando-trocar-hd-por-ssd",
    cluster: "ssd-memoria-upgrade",
    acao: "aprofundar",
    consulta: "quando trocar HD por SSD vale a pena",
    relacionados: ["computador-lento-causas-solucoes", "quando-trocar-computador-ou-reparar"],
  },
  {
    slug: "como-instalar-windows-11-do-zero",
    cluster: "formatacao-sistema-virus",
    acao: "aprofundar",
    consulta: "quando formatar e como instalar Windows 11",
    relacionados: ["backup-como-proteger-seus-arquivos", "como-saber-se-pc-tem-virus-malware"],
  },
  {
    slug: "como-saber-se-pc-tem-virus-malware",
    cluster: "formatacao-sistema-virus",
    acao: "aprofundar",
    consulta: "como saber se o pc tem vírus",
    relacionados: ["como-instalar-windows-11-do-zero", "backup-como-proteger-seus-arquivos"],
  },
  {
    slug: "backup-como-proteger-seus-arquivos",
    cluster: "backup-recuperacao",
    acao: "aprofundar",
    consulta: "diferença entre backup e recuperação de dados",
    relacionados: ["como-recuperar-arquivos-apagados", "computador-lento-causas-solucoes"],
  },
  {
    slug: "como-melhorar-sinal-wifi-em-casa",
    cluster: "redes-wifi",
    acao: "aprofundar",
    consulta: "wi-fi fraco em casa o que fazer",
    relacionados: ["wifi-caindo-toda-hora", "como-configurar-repetidor-wifi"],
  },
  {
    slug: "notebook-superaquecendo-o-que-fazer",
    cluster: "defeito-hardware",
    acao: "aprofundar",
    consulta: "notebook esquentando e desligando",
    relacionados: ["notebook-nao-liga-o-que-fazer", "computador-lento-causas-solucoes"],
  },

  // ── Rodada 3O — onda educacional empresarial (2 conteúdos, 0 rotas novas)
  {
    slug: "organizacao-de-ti-para-pequenos-escritorios",
    cluster: "ti-empresas",
    acao: "aprofundar",
    consulta: "como organizar a informática de um escritório pequeno",
    relacionados: ["backup-como-proteger-seus-arquivos", "como-escolher-uma-workstation"],
  },
  {
    slug: "como-escolher-uma-workstation",
    cluster: "montagem-workstation",
    acao: "aprofundar",
    consulta: "como escolher uma estação de trabalho profissional",
    relacionados: ["quando-trocar-hd-por-ssd", "organizacao-de-ti-para-pequenos-escritorios"],
  },

  // ── 4 consolidações (mesma intenção duplicada) ─────────────
  {
    slug: "pc-muito-lento-como-acelerar",
    cluster: "lentidao-desempenho",
    acao: "consolidar",
    consulta: "pc muito lento como acelerar",
    consolidarEm: "computador-lento-causas-solucoes",
  },
  {
    slug: "como-recuperar-dados-hd-defeituoso",
    cluster: "backup-recuperacao",
    acao: "consolidar",
    consulta: "recuperar dados de HD com defeito",
    consolidarEm: "como-recuperar-dados-hd-com-defeito",
  },
  {
    slug: "como-instalar-windows-11-do-zero-2026",
    cluster: "formatacao-sistema-virus",
    acao: "consolidar",
    consulta: "instalar windows 11 do zero",
    consolidarEm: "como-instalar-windows-11-do-zero",
  },
  {
    slug: "notebook-superaquecendo-solucoes",
    cluster: "defeito-hardware",
    acao: "consolidar",
    consulta: "notebook superaquecendo soluções",
    consolidarEm: "notebook-superaquecendo-o-que-fazer",
  },

  // ── 4 mantidos noindex / arquivo futuro (fora do core) ─────
  {
    slug: "preciso-de-um-para-tecnicos-informatica",
    cluster: "ti-empresas",
    acao: "fora-de-foco",
    consulta: "plataforma de prestadores",
    nota: "Conteúdo de outra marca. Manter noindex; avaliar transferência.",
  },
  {
    slug: "como-escolher-melhor-kit-cameras-seguranca",
    cluster: "ti-empresas",
    acao: "fora-de-foco",
    consulta: "kit de câmeras de segurança",
    nota: "CFTV fora do core editorial. Manter noindex, sem link a partir do core.",
  },
  {
    slug: "como-conectar-wifi-tv-nao-conecta",
    cluster: "redes-wifi",
    acao: "manter-noindex",
    consulta: "TV não conecta no wi-fi",
    nota: "Tema de TV: manter noindex; não apontar para conserto de computador.",
  },
  {
    slug: "como-deixar-celular-android-mais-rapido",
    cluster: "lentidao-desempenho",
    acao: "fora-de-foco",
    consulta: "celular android lento",
    nota: "Celular fora do core. Manter noindex; avaliar transferência de marca.",
  },

  // ── Rodada 9B — pilares nacionais de autoridade editorial (fundamentos).
  {
    slug: "o-que-e-informatica",
    cluster: "fundamentos-informatica",
    acao: "aprofundar",
    consulta: "o que é informática",
    relacionados: ["informatica-basica", "como-aprender-informatica"],
  },
  {
    slug: "informatica-basica",
    cluster: "fundamentos-informatica",
    acao: "aprofundar",
    consulta: "informática básica",
    relacionados: ["o-que-e-informatica", "como-aprender-informatica"],
  },
  {
    slug: "como-aprender-informatica",
    cluster: "fundamentos-informatica",
    acao: "aprofundar",
    consulta: "como aprender informática",
    relacionados: ["o-que-e-informatica", "informatica-basica"],
  },
];

const BY_SLUG = new Map(EDITORIAL_FIRST_WAVE.map((e) => [e.slug, e]));

export function getEditorialEntry(slug: string): EditorialEntry | undefined {
  return BY_SLUG.get(slug);
}

export function getClusterForSlug(slug: string): EditorialCluster | undefined {
  const entry = BY_SLUG.get(slug);
  return entry ? EDITORIAL_CLUSTERS[entry.cluster] : undefined;
}

/** Conteúdos prioritários (aprofundamento) de um pilar — usado pelo pilar → artigo. */
export function articlesForPilar(pilar: string): EditorialEntry[] {
  return EDITORIAL_FIRST_WAVE.filter(
    (e) => e.acao === "aprofundar" && EDITORIAL_CLUSTERS[e.cluster].pilar === pilar,
  );
}

/** Slugs que não podem receber link a partir de páginas do core. */
export function isOutOfScope(slug: string): boolean {
  const e = BY_SLUG.get(slug);
  return e?.acao === "fora-de-foco" || e?.acao === "manter-noindex";
}
