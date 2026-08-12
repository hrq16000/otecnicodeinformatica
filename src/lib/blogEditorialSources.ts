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
// MANIFESTO POR ARTIGO — fechamento técnico (PROMPT 33).
//
// Estado desta rodada:
//   • Os dois desalinhamentos críticos (notebook / Windows 11) foram
//     resolvidos no conteúdo e realinhados ao slug. Ambos saíram de
//     "blocked".
//   • Fact-check material concluído para os oito pilotos: cada afirmação
//     instável foi confirmada por fonte primária ou qualificada no texto.
//   • Resultado: 8 "reviewed", 0 "pending", 0 "blocked".
//   • Artigos sem fonte visível se sustentam em conhecimento técnico
//     estável (stableKnowledge:true), justificado em notes.
//   • factCheckedAt é a data interna real da checagem. NÃO altera
//     dateModified público e NÃO aprova nem indexa o artigo. A única
//     fonte de indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT
//     (vazio) em blogEditorialRegistry.ts.
// ─────────────────────────────────────────────────────────────
export const ARTICLE_SOURCE_MANIFEST: Record<string, ArticleSourceManifest> = {
  "notebook-nao-liga-o-que-fazer": {
    slug: "notebook-nao-liga-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Desalinhamento resolvido: title/H1/introdução/estrutura focados exclusivamente em notebook; desktop aparece só como menção contextual curta, fora de title e H1. Conteúdo baseado em conhecimento técnico estável de triagem segura, sem afirmação específica de fabricante, sem número instável e sem procedimento perigoso. Não afirma causa única sem diagnóstico. Sem fonte visível por depender de conhecimento estável.",
  },
  "computador-lento-causas-solucoes": {
    slug: "computador-lento-causas-solucoes",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: formatação não é solução universal, SSD não resolve todo gargalo, memória sem número mínimo universal e malware tratado como possibilidade (não diagnóstico). Sem percentuais de ganho e sem métrica do Gerenciador de Tarefas como diagnóstico definitivo. Conhecimento técnico estável, sem afirmação instável — sem fonte visível.",
  },
  "como-instalar-windows-11-do-zero": {
    slug: "como-instalar-windows-11-do-zero",
    sources: [
      "ms-win11-requirements",
      "ms-win11-installation-media",
      "ms-win11-activation",
      "ms-bitlocker-recovery",
    ],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Desalinhamento resolvido: title/H1/introdução/estrutura realinhados à instalação limpa do Windows 11 (guia de preparação e decisão segura). Afirmações materiais (requisitos, mídia oficial, ativação/licença, BitLocker/chave de recuperação) sustentadas por fontes oficiais Microsoft. Sem ativador, crack, bypass de requisitos, imagem modificada ou download de terceiros. Publisher: Microsoft.",
  },
  "quando-trocar-hd-por-ssd": {
    slug: "quando-trocar-hd-por-ssd",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: compatibilidade física e lógica (SATA/NVMe e espaço) tratada como verificação, clonagem pode carregar problemas existentes, sem promessa de velocidade, sem 'fica como novo' e sem compatibilidade universal. Conhecimento técnico estável; nenhum número de desempenho promocional — sem fonte visível.",
  },
  "notebook-superaquecendo-o-que-fazer": {
    slug: "notebook-superaquecendo-o-que-fazer",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    stableKnowledge: true,
    notes:
      "Fact-check concluído: sem temperatura universal de risco e sem intervalo universal para pasta térmica; alertas de segurança presentes (bateria estufada, cheiro, desligamentos) com orientação de parar o uso; foco em notebook. Conhecimento técnico estável — sem fonte visível.",
  },
  "backup-como-proteger-seus-arquivos": {
    slug: "backup-como-proteger-seus-arquivos",
    sources: ["cisa-backup", "nist-sp-800-34", "cisa-stop-ransomware"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: sincronização não equivale sempre a backup, cópia no mesmo disco não protege contra falha do disco, sem garantia de recuperação e estratégia de múltiplas cópias apresentada como referência (não regra única). Restauração precisa ser testada. Fontes CISA/NIST.",
  },
  "como-saber-se-pc-tem-virus-malware": {
    slug: "como-saber-se-pc-tem-virus-malware",
    sources: ["certbr-golpes", "cisa-stop-ransomware", "ms-tech-support-scams"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: sintomas não confirmam infecção, contenção segura (desconectar da rede, não pagar resgate), troca de senha em dispositivo confiável, sem ferramenta desconhecida e sem prometer remoção ou preservação integral. Golpe de falso suporte tratado. Fontes CERT.br/CISA/Microsoft.",
  },
  "como-melhorar-sinal-wifi-em-casa": {
    slug: "como-melhorar-sinal-wifi-em-casa",
    sources: ["wifi-alliance-home"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-07-12",
    notes:
      "Fact-check concluído: diferencia sinal e internet, dispositivo e rede, operadora e Wi-Fi local; sem canal/frequência/potência universais; foco residencial. Cobertura com múltiplos pontos (mesh) sustentada pela Wi-Fi Alliance.",
  },
  "organizacao-de-ti-para-pequenos-escritorios": {
    slug: "organizacao-de-ti-para-pequenos-escritorios",
    sources: ["cisa-backup", "nist-sp-800-34"],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-06",
    notes:
      "Revisão concluída (Rodada 3O): conteúdo organizacional, sem consultoria de conformidade, sem SLA, sem promessa de continuidade e sem orientação para armazenar senhas junto ao inventário. Limite entre camada de máquina e sistemas de terceiros explicitado. Estratégia de cópias apresentada como referência, com teste de restauração obrigatório — sustentada por CISA/NIST.",
  },
  "como-escolher-uma-workstation": {
    slug: "como-escolher-uma-workstation",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-06",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 3O): critérios de levantamento de requisitos, sem configuração universal, sem benchmark, sem promessa de desempenho, sem nome de software no slug/H1/title e sem selo de homologação não publicado pelo fabricante. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-resolver-tela-azul-windows": {
    slug: "como-resolver-tela-azul-windows",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 4Y): interpretação do código de parada como pista e não como diagnóstico fechado, ordem segura de verificação (alterações recentes, memória, disco, energia), aviso explícito de risco de perda de dados quando o disco está envolvido e nenhuma promessa de correção definitiva. Conhecimento técnico estável — sem fonte visível.",
  },
  "como-trocar-tela-notebook-passo-a-passo": {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    sources: [],
    technicalReview: "reviewed",
    factChecked: true,
    factCheckedAt: "2026-08-12",
    stableKnowledge: true,
    notes:
      "Revisão concluída (Rodada 4Y): identificação da tela pelo código do painel, distinção entre defeito de painel e de cabo/placa de vídeo, alerta de risco em telas coladas e touch, sem indicação de peça específica, sem preço de peça e sem promessa de compatibilidade universal. Conhecimento técnico estável — sem fonte visível.",
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
