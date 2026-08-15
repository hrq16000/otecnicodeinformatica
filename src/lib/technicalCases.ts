// ─────────────────────────────────────────────────────────────
// REGISTRO INTERNO DE CASOS TÉCNICOS REAIS (Rodada 3G — Parte B).
//
// Estrutura interna para registrar atendimentos reais e, no futuro,
// publicar provas técnicas verificáveis. Regras inegociáveis:
//
//   • FAIL-CLOSED: só é publicável o caso com status "approved" E
//     todos os requisitos de evidência, revisão e privacidade.
//   • A existência de um registro NÃO torna o caso público.
//   • Nada aqui pode ser inventado: sem cliente fictício, sem número
//     aproximado, sem "antes e depois" sem evidência.
//   • Nenhum dado pessoal do cliente entra neste arquivo.
//
// Estado inicial desta rodada: ZERO casos registrados.
// ─────────────────────────────────────────────────────────────

/** Categorias permitidas — espelham o escopo de serviços atual. */
export const TECHNICAL_CASE_CATEGORIES = [
  "manutencao-de-notebook",
  "manutencao-de-computador",
  "formatacao",
  "remocao-de-virus",
  "upgrade-ssd-ram",
  "recuperacao-de-dados",
  "redes-e-wifi",
  "suporte-tecnico-empresarial",
  "manutencao-preventiva-empresas",
  "backup-para-empresas",
  "atendimento-remoto",
  "suporte-home-office",
] as const;

export type TechnicalCaseCategory = (typeof TECHNICAL_CASE_CATEGORIES)[number];

export type TechnicalCaseStatus = "draft" | "review" | "approved" | "rejected";

/** Classificação obrigatória de cada foto. */
export type TechnicalCasePhotoKind =
  | "equipamento-recebido"
  | "detalhe-externo-do-defeito"
  | "componente-danificado"
  | "poeira-e-refrigeracao"
  | "armazenamento-substituido"
  | "bancada"
  | "teste-tecnico"
  | "organizacao-interna"
  | "resultado-fisico";

export interface TechnicalCasePhoto {
  src: string;
  /** Alt descritivo obrigatório. */
  alt: string;
  /** Legenda factual obrigatória. */
  caption: string;
  kind: TechnicalCasePhotoKind;
  /** true = fotografia do próprio atendimento; false = imagem ilustrativa. */
  fromService: boolean;
  /** EXIF removido / revisado antes de qualquer uso. */
  exifStripped: boolean;
  /** Revisão de tela, etiqueta, documento e reflexo concluída. */
  screenReviewed: boolean;
  /** Assinatura perceptual (aHash) para detectar evidência repetida. */
  fingerprint?: string;
  /** Métricas técnicas da evidência, preenchidas na validação automática. */
  quality?: {
    width: number;
    height: number;
    /** EXIF encontrado no arquivo original (antes da re-codificação). */
    exifFound?: boolean;
    /** Energia de borda média — imagens muito lisas tendem a ser genéricas. */
    edgeEnergy: number;
    /** Quantidade de faixas de cor distintas. */
    colorBuckets: number;
    /** Suspeita automática de foto genérica/ilustrativa. */
    genericSuspect: boolean;
  };
}


/** Medição real. Só existe quando houve instrumento e método. */
export interface TechnicalCaseMeasurement {
  label: string;
  before?: string;
  after?: string;
  unit: string;
  tool: string;
  method: string;
  measuredAt: string;
  limitations: string;
}

export interface TechnicalCase {
  id: string;
  status: TechnicalCaseStatus;
  /** Data real do atendimento (ISO). */
  occurredAt: string;
  reviewedAt?: string;

  /** Título factual, descritivo — sem promessa de resultado. */
  title: string;

  equipment: {
    category: TechnicalCaseCategory;
    brand?: string;
    model?: string;
    approximateYear?: string;
  };

  location: {
    city: string;
    /** Região ampla; nunca endereço. */
    neighborhood?: string;
  };

  reportedSymptoms: string[];
  checksPerformed: string[];
  confirmedDiagnosis: string[];
  proceduresPerformed: string[];
  partsUsed?: string[];
  observedResult: string[];
  limitations: string[];
  recommendations: string[];
  measurements?: TechnicalCaseMeasurement[];

  /** Serviço canônico relacionado (sem criar rota nova). */
  serviceSlug: TechnicalCaseCategory;
  problemSlug?: string;

  evidence: {
    /** Referência interna da ordem de serviço (nunca a OS integral). */
    workOrderReference?: string;
    photos: TechnicalCasePhoto[];
    customerAuthorization: boolean;
    technicalReview: boolean;
  };

  privacy: {
    customerNameRemoved: boolean;
    serialNumberRemoved: boolean;
    personalDataRemoved: boolean;
    screenDataReviewed: boolean;
  };
}

// ─────────────────────────────────────────────────────────────
// REGISTRO. Vazio por definição até existir atendimento real
// documentado, revisado e anonimizado.
// ─────────────────────────────────────────────────────────────
export const TECHNICAL_CASES: TechnicalCase[] = [];

/** Linguagem proibida em qualquer campo textual de um caso. */
export const FORBIDDEN_CASE_PHRASES = [
  "sempre resolve",
  "resultado garantido",
  "igual ao novo",
  "100% recuperado",
  "reparo definitivo",
  "melhor assistência",
  "serviço perfeito",
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/;

const nonEmpty = (arr?: string[]) =>
  Array.isArray(arr) && arr.length > 0 && arr.every((s) => typeof s === "string" && s.trim() !== "");

function textFields(c: TechnicalCase): string[] {
  return [
    c.title,
    ...c.reportedSymptoms,
    ...c.checksPerformed,
    ...c.confirmedDiagnosis,
    ...c.proceduresPerformed,
    ...(c.partsUsed ?? []),
    ...c.observedResult,
    ...c.limitations,
    ...c.recommendations,
    ...c.evidence.photos.flatMap((p) => [p.alt, p.caption]),
  ];
}

export interface CaseValidation {
  ok: boolean;
  reasons: string[];
}

/**
 * Validação fail-closed. Retorna ok=true SOMENTE quando o caso é real,
 * documentado, revisado, anonimizado e aprovado.
 */
export function validateTechnicalCase(c: TechnicalCase): CaseValidation {
  const reasons: string[] = [];
  const req = (cond: boolean, msg: string) => {
    if (!cond) reasons.push(msg);
  };

  req(!!c.id && c.id.trim() !== "", "id ausente");
  req(c.status === "approved", "status diferente de approved");
  req(ISO_DATE.test(c.occurredAt ?? ""), "occurredAt inválido (atendimento real obrigatório)");
  req(ISO_DATE.test(c.reviewedAt ?? ""), "reviewedAt ausente (revisão técnica obrigatória)");
  req(!!c.title && c.title.trim().length >= 12, "título factual ausente");
  req(
    TECHNICAL_CASE_CATEGORIES.includes(c.equipment?.category as TechnicalCaseCategory),
    "categoria fora do escopo atual",
  );
  req(
    TECHNICAL_CASE_CATEGORIES.includes(c.serviceSlug as TechnicalCaseCategory),
    "serviceSlug fora do escopo atual",
  );
  req(!!c.location?.city, "localidade ampla ausente");
  req(nonEmpty(c.reportedSymptoms), "sintoma informado ausente");
  req(nonEmpty(c.checksPerformed), "verificações realizadas ausentes");
  req(nonEmpty(c.confirmedDiagnosis), "diagnóstico confirmado ausente");
  req(nonEmpty(c.proceduresPerformed), "intervenção documentada ausente");
  req(nonEmpty(c.observedResult), "resultado observado ausente");
  req(nonEmpty(c.limitations), "limitações não registradas");
  req(nonEmpty(c.recommendations), "recomendações ausentes");

  req(!!c.evidence?.workOrderReference, "referência interna de atendimento ausente");
  req(c.evidence?.technicalReview === true, "revisão técnica não registrada");
  req(c.evidence?.customerAuthorization === true, "autorização do cliente ausente");

  for (const p of c.evidence?.photos ?? []) {
    req(!!p.src, "foto sem arquivo");
    req(!!p.alt && p.alt.trim() !== "", "foto sem alt");
    req(!!p.caption && p.caption.trim() !== "", "foto sem legenda factual");
    req(!!p.kind, "foto sem classificação");
    req(p.exifStripped === true, "foto sem revisão de metadados (EXIF)");
    req(p.screenReviewed === true, "foto sem revisão de tela/etiqueta");
  }

  req(c.privacy?.customerNameRemoved === true, "anonimização de nome pendente");
  req(c.privacy?.serialNumberRemoved === true, "remoção de número de série pendente");
  req(c.privacy?.personalDataRemoved === true, "remoção de dados pessoais pendente");
  req(c.privacy?.screenDataReviewed === true, "revisão de dados em tela pendente");

  for (const m of c.measurements ?? []) {
    req(!!m.tool && !!m.method && !!m.unit && ISO_DATE.test(m.measuredAt ?? ""), `medição incompleta: ${m.label}`);
    req(!!m.limitations, `medição sem limitações declaradas: ${m.label}`);
  }

  const haystack = textFields(c).join(" ").toLowerCase();
  for (const phrase of FORBIDDEN_CASE_PHRASES) {
    if (haystack.includes(phrase)) reasons.push(`linguagem proibida: "${phrase}"`);
  }

  return { ok: reasons.length === 0, reasons };
}

/** Único acesso permitido a casos publicáveis. Fail-closed. */
export function getPublishableCases(): TechnicalCase[] {
  return TECHNICAL_CASES.filter((c) => validateTechnicalCase(c).ok);
}

/** Há prova técnica real disponível para exibição pública? */
export function hasPublishableCases(): boolean {
  return getPublishableCases().length > 0;
}
