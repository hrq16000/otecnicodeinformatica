// ─────────────────────────────────────────────────────────────
// MANIFESTO DE FONTES EDITORIAIS — PROMPT 32 (revisão técnica).
//
// Fonte única e tipada das referências primárias consultadas para os
// oito conteúdos-piloto. Regras inegociáveis:
//
//   • Uma fonte só é cadastrada se foi REALMENTE consultada, a URL foi
//     confirmada e ela sustenta uma afirmação concreta do texto.
//   • Nenhuma fonte inventada, presumida ou reescrita por IA.
//   • Apenas domínios oficiais / padrões / pesquisa primária.
//   • `factChecked` NÃO é preenchido automaticamente. Enquanto a
//     revisão material não for concluída, permanece `false`.
//   • Este manifesto NÃO aprova nem indexa artigo algum. A única fonte
//     de indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT
//     (vazio) em blogEditorialRegistry.ts.
//
// `accessedAt` é a data real da consulta às fontes (não a data de build
// e não uma data de aprovação editorial).
// ─────────────────────────────────────────────────────────────

export type SourceType = "official" | "standard" | "primary_research";

/** Status técnico separado do status editorial. Nunca torna um artigo aprovado. */
export type TechnicalReviewStatus = "pending" | "reviewed" | "blocked";

export interface EditorialSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** Data ISO real da consulta. */
  accessedAt: string;
  sourceType: SourceType;
  /** Afirmações do texto que esta fonte sustenta. */
  supports: string[];
}

export interface ArticleSourceManifest {
  slug: string;
  /** IDs de EditorialSource que sustentam o artigo. */
  sources: string[];
  /** Estado da revisão técnica (estrutural + material). */
  technicalReview: TechnicalReviewStatus;
  /** true SOMENTE quando toda afirmação material foi verificada. */
  factChecked: boolean;
  /** Data ISO da checagem — apenas se realmente executada e concluída. */
  factCheckedAt?: string;
  /**
   * true quando o artigo se sustenta exclusivamente em conhecimento técnico
   * estável (sem afirmação instável/dependente de versão ou fabricante) e,
   * por isso, pode ficar "reviewed" sem fontes visíveis. Justificado em notes.
   */
  stableKnowledge?: boolean;
  notes?: string;
}


// Domínios permitidos para fontes primárias/oficiais. Qualquer URL fora
// desta lista é rejeitada pelo gate a menos que reclassificada.
export const ALLOWED_SOURCE_HOSTS = [
  "microsoft.com",
  "learn.microsoft.com",
  "support.microsoft.com",
  "www.microsoft.com",
  "cisa.gov",
  "www.cisa.gov",
  "cert.br",
  "cartilha.cert.br",
  "nist.gov",
  "www.nist.gov",
  "csrc.nist.gov",
  "wi-fi.org",
  "www.wi-fi.org",
] as const;

// ─────────────────────────────────────────────────────────────
// FONTES CONSULTADAS (URLs confirmadas em 2026-07-12).
// ─────────────────────────────────────────────────────────────
export const EDITORIAL_SOURCES: Record<string, EditorialSource> = {
  "ms-win11-requirements": {
    id: "ms-win11-requirements",
    title: "Windows 11 requirements",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Requisitos mínimos de hardware para instalar ou atualizar para o Windows 11.",
    ],
  },
  "ms-win11-installation-media": {
    id: "ms-win11-installation-media",
    title: "Create installation media for Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/create-installation-media-for-windows-99a58364-8c02-206f-aa6f-40c3b507420d",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Uso de mídia oficial de instalação para instalação limpa ou reinstalação do Windows.",
    ],
  },
  "ms-win11-activation": {
    id: "ms-win11-activation",
    title: "Activate Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/activate-windows-c39005d4-95ee-b91e-b399-2820fda32227",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "A ativação do Windows depende de uma licença digital ou chave de produto legítima vinculada ao dispositivo ou conta Microsoft.",
    ],
  },
  "ms-bitlocker-recovery": {
    id: "ms-bitlocker-recovery",
    title: "Finding your BitLocker recovery key in Windows",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/windows/finding-your-bitlocker-recovery-key-in-windows-6b71ad27-0b89-ea08-f143-056f5ab347d6",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Discos protegidos por BitLocker podem exigir a chave de recuperação; sem ela é possível perder o acesso aos dados.",
    ],
  },
  "ms-tech-support-scams": {
    id: "ms-tech-support-scams",
    title: "Protect yourself from tech support scams",
    publisher: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/office/protect-yourself-from-tech-support-scams",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Golpes de falso suporte técnico usam táticas de intimidação; não ligar para números exibidos em alertas.",
    ],
  },

  "certbr-golpes": {
    id: "certbr-golpes",
    title: "Cartilha de Segurança para Internet — Golpes",
    publisher: "CERT.br / NIC.br",
    url: "https://cartilha.cert.br/",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Como identificar sinais de golpes e fraudes on-line e como agir ao suspeitar de um golpe.",
    ],
  },
  "cisa-stop-ransomware": {
    id: "cisa-stop-ransomware",
    title: "#StopRansomware Guide",
    publisher: "CISA",
    url: "https://www.cisa.gov/stopransomware/ransomware-guide",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Boas práticas para prevenir, conter e responder a incidentes de ransomware; não pagar resgate como primeira reação.",
    ],
  },
  "cisa-backup": {
    id: "cisa-backup",
    title: "Back Up Business Data",
    publisher: "CISA",
    url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Backup como proteção contra perda de dados por falhas, exclusão acidental e ataques.",
    ],
  },
  "nist-sp-800-34": {
    id: "nist-sp-800-34",
    title: "SP 800-34 Rev. 1 — Contingency Planning Guide for Federal Information Systems",
    publisher: "NIST (CSRC)",
    url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
    accessedAt: "2026-07-12",
    sourceType: "standard",
    supports: [
      "Planejamento de contingência e restauração de dados; a restauração precisa ser testada, não apenas configurada.",
    ],
  },
  "wifi-alliance-home": {
    id: "wifi-alliance-home",
    title: "Wi-Fi Alliance connects and expands home Wi-Fi",
    publisher: "Wi-Fi Alliance",
    url: "https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-connects-and-expands-home-wi-fi",
    accessedAt: "2026-07-12",
    sourceType: "official",
    supports: [
      "Redes residenciais com múltiplos pontos (EasyMesh) para melhorar cobertura em ambientes maiores.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// MANIFESTO POR ARTIGO.
//
// Estado desta rodada:
//   • Nenhum artigo com factChecked=true (revisão material não concluída).
//   • Dois pilotos "blocked" por desalinhamento crítico de intenção
//     (ver notas). Os demais em "pending".
//   • Nenhum "reviewed": a revisão material com fontes primárias fica
//     para rodada posterior (PROMPT 33), com autorização explícita.
// ─────────────────────────────────────────────────────────────
export const ARTICLE_SOURCE_MANIFEST: Record<string, ArticleSourceManifest> = {
  "notebook-nao-liga-o-que-fazer": {
    slug: "notebook-nao-liga-o-que-fazer",
    sources: [],
    technicalReview: "blocked",
    factChecked: false,
    notes:
      "Desalinhamento crítico: slug foca em notebook, mas title/H1 tratam desktop com peso equivalente ('Computador ou notebook não liga'). Manter noindex. Não trocar slug nesta rodada. Recomendação futura: concentrar title/H1 em notebook e citar desktop apenas como observação secundária, ou consolidar sob slug adequado com análise de links/redirects.",
  },
  "computador-lento-causas-solucoes": {
    slug: "computador-lento-causas-solucoes",
    sources: [],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "Conteúdo majoritariamente conhecimento técnico básico e cauteloso (sem percentuais, sem 'SSD sempre resolve', sem 'formatação sempre resolve'). Revisão material pendente antes de qualquer promoção.",
  },
  "como-instalar-windows-11-do-zero": {
    slug: "como-instalar-windows-11-do-zero",
    sources: ["ms-win11-requirements", "ms-win11-installation-media"],
    technicalReview: "blocked",
    factChecked: false,
    notes:
      "Desalinhamento crítico: slug pede instalação limpa do Windows 11, mas title/H1/conteúdo respondem 'formatar ou reinstalar / quando faz sentido'. Requisitos e mídia oficial exigem fontes Microsoft (cadastradas, não verificadas materialmente). Manter noindex. Não trocar slug nesta rodada. Recomendação futura: realinhar ao slug (instalação limpa) ou consolidar com página de formatação sob slug adequado.",
  },
  "quando-trocar-hd-por-ssd": {
    slug: "quando-trocar-hd-por-ssd",
    sources: [],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "Conteúdo qualitativo (sem benchmark genérico, sem 'dez vezes mais rápido', sem 'serve em qualquer computador'). Qualquer número de desempenho exigiria fonte e contexto — não incluído. Revisão material pendente.",
  },
  "notebook-superaquecendo-o-que-fazer": {
    slug: "notebook-superaquecendo-o-que-fazer",
    sources: [],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "Sem limite universal de temperatura de risco; alertas de segurança presentes (bateria deformada, cheiro, desligamentos). Sem intervalo inventado para pasta térmica. Revisão material pendente.",
  },
  "backup-como-proteger-seus-arquivos": {
    slug: "backup-como-proteger-seus-arquivos",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "3-2-1 e restauração exigem fontes adequadas (CISA/NIST cadastradas, não verificadas materialmente). Não promete recuperação integral. Revisão material pendente.",
  },
  "como-saber-se-pc-tem-virus-malware": {
    slug: "como-saber-se-pc-tem-virus-malware",
    sources: ["certbr-golpes", "cisa-stop-ransomware", "ms-tech-support-scams"],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "Diferencia suspeita/confirmação/contenção/remoção; cita ransomware e golpe de suporte. Fontes de segurança cadastradas (CERT.br/CISA/Microsoft), não verificadas materialmente. Revisão material pendente.",
  },
  "como-melhorar-sinal-wifi-em-casa": {
    slug: "como-melhorar-sinal-wifi-em-casa",
    sources: ["wifi-alliance-home"],
    technicalReview: "pending",
    factChecked: false,
    notes:
      "Foco residencial; diferencia rede local e operadora; não prescreve canal/frequência/potência universais. Fonte Wi-Fi Alliance cadastrada, não verificada materialmente. Revisão material pendente.",
  },
};

/** Retorna a fonte tipada por id (ou undefined). */
export function getSource(id: string): EditorialSource | undefined {
  return EDITORIAL_SOURCES[id];
}

/** Fontes resolvidas de um artigo, na ordem declarada. */
export function getArticleSources(slug: string): EditorialSource[] {
  const manifest = ARTICLE_SOURCE_MANIFEST[slug];
  if (!manifest) return [];
  return manifest.sources
    .map((id) => EDITORIAL_SOURCES[id])
    .filter((s): s is EditorialSource => Boolean(s));
}

/** Status técnico de um slug (padrão: "pending"). */
export function getTechnicalReviewStatus(slug: string): TechnicalReviewStatus {
  return ARTICLE_SOURCE_MANIFEST[slug]?.technicalReview ?? "pending";
}

export default ARTICLE_SOURCE_MANIFEST;
