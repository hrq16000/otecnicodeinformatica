// ─────────────────────────────────────────────────────────────
// REGISTRO EDITORIAL FAIL-CLOSED — fonte única de aprovação de conteúdo.
//
// Regra inegociável: um artigo só é indexável / publicável se possuir
// um registro EXPLÍCITO e TIPADO de aprovação. Sem registro válido, o
// artigo é tratado como rascunho (draft): noindex, fora do sitemap,
// fora da listagem pública e sem schema de autoria pessoal.
//
// A aprovação NÃO pode depender de: categoria, data, presença de
// conteúdo, presença de imagem, slug, origem (manual/programática)
// ou tema. Depende exclusivamente deste registro.
//
// Estado inicial: ZERO artigos aprovados.
// ─────────────────────────────────────────────────────────────

import { siteConfig } from "@/lib/siteConfig";

export type EditorialStatus = "draft" | "in_review" | "approved" | "archived";

export type EditorialAuthorType = "organization" | "person";

export type EditorialImageOrigin = "owned" | "licensed" | "generated" | "unknown";

export interface EditorialApproval {
  slug: string;
  status: EditorialStatus;
  authorType: EditorialAuthorType;
  /** Identificador do autor aprovado (ex.: "org:tecnico-em-curitiba"). */
  authorId: string;
  /** Data ISO da revisão editorial (opcional até revisão material). */
  reviewedAt?: string;
  /** Data ISO real da aprovação — obrigatória para status approved. */
  approvedAt?: string;
  imageOrigin: EditorialImageOrigin;
  imageLicense?: string;
  imageAttribution?: string;
  notes?: string;
}

// Autoria institucional temporária. Enquanto não houver autor pessoal
// real e verificado, a autoria é a própria entidade oficial.
// Todos os dados vêm de siteConfig — nunca duplicar manualmente.
export const INSTITUTIONAL_AUTHOR = {
  id: "org:tecnico-em-curitiba",
  type: "organization" as EditorialAuthorType,
  name: siteConfig.brandName,
  url: siteConfig.baseUrl,
} as const;

// Publisher institucional oficial (alinhado à entidade da marca).
export const EDITORIAL_PUBLISHER = {
  name: siteConfig.brandName,
  url: siteConfig.baseUrl,
  logo: `${siteConfig.baseUrl}/logo.png`,
} as const;

// ─────────────────────────────────────────────────────────────
// PRIMEIRA ONDA EDITORIAL INDEXÁVEL (Rodada 4H).
//
// Cada item abaixo só entrou após: revisão técnica concluída e
// fact-check registrado (src/lib/blogEditorialSources.ts), capa
// própria com origem declarada (src/lib/blogEditorialCovers.ts) e
// aprovação editorial datada. Artigos fora deste Map permanecem
// noindex, follow, fora do sitemap e fora da listagem pública.
//
// Espelho de build/gates: scripts/lib/editorial-wave.mjs.
// ─────────────────────────────────────────────────────────────
const FIRST_WAVE_APPROVED_AT = "2026-08-06";

// Rodada 3F — liberação controlada: os dois guias que disputavam a mesma
// intenção das novas páginas de sintoma (/problemas/notebook-nao-liga e
// /problemas/computador-lento) voltaram para revisão (noindex, follow) e
// o guia de superaquecimento entrou no lugar, apoiando manutenção de
// notebook. Limite da onda: 6 artigos.
// Rodada 3O — onda educacional empresarial: dois conteúdos já existentes no
// acervo (nenhuma rota nova) promovidos após revisão técnica, capa própria e
// interlinking de entrada. Limite total de artigos indexáveis: 7.
const FIRST_WAVE_SLUGS = [
  "quando-trocar-hd-por-ssd",
  "como-saber-se-pc-tem-virus-malware",
  "backup-como-proteger-seus-arquivos",
  "como-melhorar-sinal-wifi-em-casa",
  "notebook-superaquecendo-o-que-fazer",
  "organizacao-de-ti-para-pequenos-escritorios",
  "como-escolher-uma-workstation",
] as const;


// Rodada 4X — promoção do guia de instalação limpa do Windows 11, o último
// piloto sem sobreposição de intenção com as páginas de sintoma. Capa é
// FOTOGRAFIA REAL licenciada (Creative Commons), nunca imagem de IA.
// Limite total de artigos indexáveis: 8.
const WAVE_4X: EditorialApproval[] = [
  {
    slug: "como-instalar-windows-11-do-zero",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-07-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 2.0",
    imageAttribution:
      "Foto: Shixart1985 (Wikimedia Commons), CC BY 2.0 — https://commons.wikimedia.org/w/index.php?curid=194512723",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada (Openverse/Wikimedia Commons), sem IA.",
  },
];

// Rodada 4Y — reforma de dois guias herdados de alta intenção técnica, sem
// sobreposição com /problemas/*: tela azul (BSOD) e troca de tela de notebook.
// Ambas as capas são FOTOGRAFIAS REAIS licenciadas (Creative Commons).
// Limite total de artigos indexáveis: 10.
const WAVE_4Y: EditorialApproval[] = [
  {
    slug: "como-resolver-tela-azul-windows",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: QueenBarenziah (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/w/index.php?curid=130534314",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: Gregory Karastergios (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/w/index.php?curid=113932150",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

// Rodada 4Z — os dois guias herdados de maior intenção comercial do acervo.
// Capas trocadas por FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons).
// Limite total de artigos indexáveis: 12.
const WAVE_4Z: EditorialApproval[] = [
  {
    slug: "notebook-nao-liga-o-que-fazer",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 3.0",
    imageAttribution:
      "Foto: Rider Adil (Wikimedia Commons), CC BY 3.0 — https://commons.wikimedia.org/wiki/File:Laptop_hardware.jpg",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "computador-lento-causas-solucoes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Mk2010 (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:Actuator_arm_assembly_of_a_hard_disk_drive.jpg",
    notes:
      "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

// Rodada 5A — dois procedimentos técnicos herdados REESCRITOS do zero:
// o texto-modelo programático e a marca de origem foram removidos.
// Capas são FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons), sem IA.
// Limite total de artigos indexáveis: 14.
const WAVE_5A: EditorialApproval[] = [
  {
    slug: "como-recuperar-dados-hd-com-defeito",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Brian Wong (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:Toshiba_Laptop_Hard_Drive.jpg",
    notes:
      "Reescrita integral na Onda 5A; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-fazer-upgrade-ssd-nvme",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: User5515 (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/wiki/File:256GB_2230_NVME_SSD_%2B_256GB_NGFF_SSD.jpg",
    notes:
      "Reescrita integral na Onda 5A; fact-check registrado em blogEditorialSources.ts; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

// Rodada 5B — cluster de redes Wi-Fi doméstica: dois guias herdados
// reescritos do zero, com intenções distintas entre si e do guia de
// cobertura já indexado. Capas são FOTOGRAFIAS REAIS licenciadas.
// Limite total de artigos indexáveis: 16.
const WAVE_5B: EditorialApproval[] = [
  {
    slug: "como-configurar-roteador-wifi-iniciantes",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY 4.0",
    imageAttribution:
      "Foto: Hayden Schiff (Wikimedia Commons), CC BY 4.0 — https://commons.wikimedia.org/wiki/File:TP-Link_TL-WR740N_router_HS5.jpg",
    notes:
      "Reescrita integral na Onda 5B; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-saber-quem-esta-usando-meu-wifi",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: Mrbeastmodeallday (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Home_wifi.jpg",
    notes:
      "Reescrita integral na Onda 5B; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

// ── ONDA 5C — cluster de segurança: escolha de antivírus e golpes on-line,
// reescritos do zero com intenções distintas entre si. Capas são
// FOTOGRAFIAS REAIS licenciadas (Wikimedia Commons), sem IA.
// Limite total de artigos indexáveis: 18.
const WAVE_5C: EditorialApproval[] = [
  {
    slug: "como-escolher-um-bom-antivirus",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution:
      "Foto: BrayLockBoy (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:MEMZ_Trojan_running_on_Samsung_N130,_13_December_2019.jpg",
    notes:
      "Reescrita integral na Onda 5C; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-proteger-computador-golpes-internet",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC0 1.0",
    imageAttribution:
      "Foto: Packer1028 (Wikimedia Commons), CC0 1.0 — https://commons.wikimedia.org/wiki/File:Computer_virus_scam.jpg",
    notes:
      "Reescrita integral na Onda 5C; fact-check registrado em blogEditorialSources.ts; capa é fotografia real de domínio público (CC0), sem IA.",
  },
];

/**
 * ── Onda 5D — manutenção física de notebook (limpeza interna e pasta térmica).
 */
const WAVE_5D: EditorialApproval[] = [
  {
    slug: "como-limpar-notebook-por-dentro",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: DMahalko / Dale Mahalko (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Laptop_overheating_due_to_dust-clogged_internal_heatsinks_in_2.5_year_old_laptop.jpg",
    notes:
      "Reescrita integral na Onda 5D; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-trocar-pasta-termica-notebook",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Jyothis (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Thermal_compound_Applied.JPG",
    notes:
      "Reescrita integral na Onda 5D; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

/**
 * ── Onda 5E — armazenamento (clonagem de disco e segundo SSD).
 */
const WAVE_5E: EditorialApproval[] = [
  {
    slug: "como-clonar-hd-para-ssd",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: Wikimedia Commons, licença livre — https://commons.wikimedia.org/wiki/File:Maxtor_HDD_and_Intel_SSD_20100117.jpg",
    notes:
      "Reescrita integral na Onda 5E; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-instalar-segundo-ssd-notebook",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 2.0",
    imageAttribution:
      "Foto: Deviantart (Wikimedia Commons), CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:WesterDigital-Black-NVMe-SSD.jpg",
    notes:
      "Reescrita integral na Onda 5E; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

/**
 * ── Onda 5F — continuidade empresarial (ransomware e backup em nuvem).
 */
const WAVE_5F: EditorialApproval[] = [
  {
    slug: "ransomware-como-proteger-empresa",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "Public domain",
    imageAttribution:
      "Foto: Wikimedia Commons, domínio público — https://commons.wikimedia.org/wiki/File:2017_Petya_cyberattack_screenshot.jpg",
    notes:
      "Reescrita integral na Onda 5F; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution:
      "Foto: BalticServers.com (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:BalticServers_data_center.jpg",
    notes:
      "Reescrita integral na Onda 5F; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

const WAVE_5G: EditorialApproval[] = [
  {
    slug: "como-instalar-impressora-windows-passo-a-passo",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 3.0",
    imageAttribution: "Foto: Somebody in the WWW (Wikimedia Commons), CC BY-SA 3.0 — https://commons.wikimedia.org/wiki/File:Epson-inkjet-printer.jpg",
    notes:
      "Reescrita integral na Onda 5G; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
  {
    slug: "como-conectar-wifi-tv-nao-conecta",
    status: "approved",
    authorType: "organization",
    authorId: INSTITUTIONAL_AUTHOR.id,
    reviewedAt: "2026-08-12",
    approvedAt: "2026-08-12",
    imageOrigin: "licensed",
    imageLicense: "CC BY-SA 4.0",
    imageAttribution: "Foto: Suyash Dwivedi (Wikimedia Commons), CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:LG_Smart_TV_WIFI_%2B_IR_Remote_04.jpg",
    notes:
      "Reescrita integral na Onda 5G; fact-check registrado em blogEditorialSources.ts; capa é fotografia real licenciada, sem IA.",
  },
];

export const APPROVED_EDITORIAL_CONTENT = new Map<string, EditorialApproval>([

  ...FIRST_WAVE_SLUGS.map((slug) => [
    slug,
    {
      slug,
      status: "approved" as EditorialStatus,
      authorType: "organization" as EditorialAuthorType,
      authorId: INSTITUTIONAL_AUTHOR.id,
      reviewedAt: FIRST_WAVE_APPROVED_AT,
      approvedAt: FIRST_WAVE_APPROVED_AT,
      imageOrigin: "generated" as EditorialImageOrigin,
      imageLicense: "Ativo gerado sob encomenda para uso próprio da marca",
      imageAttribution: "O Técnico de Informática",
      notes:
        "Revisão técnica concluída e fact-check registrado em blogEditorialSources.ts; capa própria conforme briefing.",
    },
  ] as [string, EditorialApproval]),

  ...WAVE_4X.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_4Y.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_4Z.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5A.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5B.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5C.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5D.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5E.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5F.map((a) => [a.slug, a] as [string, EditorialApproval]),

  ...WAVE_5G.map((a) => [a.slug, a] as [string, EditorialApproval]),
]);


// ─────────────────────────────────────────────────────────────
// FILA DE REVISÃO EDITORIAL (in_review) — separada dos aprovados.
//
// Os oito conteúdos-piloto foram reescritos com profundidade, mas
// NÃO estão aprovados: seguem noindex, fora do sitemap e fora da
// listagem pública. Esta fila é apenas um registro de trabalho.
// Ela NÃO influencia isEditorialApproved() — a única fonte de
// indexabilidade continua sendo APPROVED_EDITORIAL_CONTENT.
//
// Regras para cada item aqui:
//   status: "in_review"
//   authorType: "organization" (autoria institucional; sem pessoa)
//   authorId: entidade oficial (INSTITUTIONAL_AUTHOR.id)
//   imageOrigin: "unknown" (nenhuma imagem aprovada)
//   approvedAt: AUSENTE
//   reviewedAt: AUSENTE (não houve revisão material concluída)
// ─────────────────────────────────────────────────────────────
// Fila-piloto: artigos ainda em revisão (noindex, fora do sitemap).
// Os slugs promovidos na primeira onda (FIRST_WAVE_SLUGS) saíram desta fila.
export const EDITORIAL_PILOT_SLUGS = [
  // Rodada 3F: despromovidos por sobreposição de intenção com as páginas
  // de sintoma /problemas/notebook-nao-liga e /problemas/computador-lento.
  "notebook-nao-liga-o-que-fazer",
  "computador-lento-causas-solucoes",
] as const;


export const EDITORIAL_REVIEW_QUEUE = new Map<string, EditorialApproval>(
  EDITORIAL_PILOT_SLUGS.map((slug) => [
    slug,
    {
      slug,
      status: "in_review" as EditorialStatus,
      authorType: "organization" as EditorialAuthorType,
      authorId: INSTITUTIONAL_AUTHOR.id,
      imageOrigin: "unknown" as EditorialImageOrigin,
      // Rascunho em revisao — sem data de aprovacao e sem data de revisao material.
    },
  ]),
);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/;

/**
 * Validação fail-closed. Retorna true SOMENTE quando todos os
 * requisitos explícitos estão presentes e coerentes.
 */
function isValidApproval(a: EditorialApproval | undefined): a is EditorialApproval {
  if (!a) return false;
  if (a.status !== "approved") return false;
  if (a.authorType !== "organization" && a.authorType !== "person") return false;
  if (!a.authorId || a.authorId.trim() === "") return false;
  if (!a.imageOrigin || a.imageOrigin === "unknown") return false;
  if (!a.approvedAt || !ISO_DATE.test(a.approvedAt)) return false;
  // Rejeita datas de aprovação no futuro (proteção anti-build-date).
  const ts = new Date(a.approvedAt).getTime();
  if (Number.isNaN(ts) || ts > Date.now()) return false;
  return true;
}

/** Status editorial de um slug. Padrão fail-closed: "draft". */
export function getEditorialStatus(slug: string): EditorialStatus {
  const entry = APPROVED_EDITORIAL_CONTENT.get(slug);
  return entry?.status ?? "draft";
}

/** Registro editorial bruto de um slug (se existir). */
export function getEditorialApproval(slug: string): EditorialApproval | undefined {
  return APPROVED_EDITORIAL_CONTENT.get(slug);
}

/** Verdadeiro apenas se o slug tem aprovação editorial válida e completa. */
export function isEditorialApproved(slug: string): boolean {
  return isValidApproval(APPROVED_EDITORIAL_CONTENT.get(slug));
}

/** Lista de slugs efetivamente aprovados (validados). Vazia nesta fase. */
export function getApprovedSlugs(): string[] {
  return [...APPROVED_EDITORIAL_CONTENT.values()]
    .filter(isValidApproval)
    .map((a) => a.slug);
}

export default APPROVED_EDITORIAL_CONTENT;
