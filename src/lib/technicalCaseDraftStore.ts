// ─────────────────────────────────────────────────────────────
// ESTAÇÃO INTERNA DE CASOS TÉCNICOS (Rodada 3H).
//
// Armazenamento LOCAL (localStorage do navegador do operador).
// Nenhum dado vai para o banco, nenhuma rota pública é criada e
// nenhum caso se torna publicável fora do gate fail-closed de
// src/lib/technicalCases.ts.
//
// Regra central: dado pessoal de cliente NUNCA deve ser digitado.
// O scanner de PII abaixo bloqueia a mudança de status para
// "review"/"approved" enquanto houver qualquer indício.
// ─────────────────────────────────────────────────────────────
import {
  validateTechnicalCase,
  type TechnicalCase,
  type TechnicalCaseCategory,
  type TechnicalCasePhoto,
  type TechnicalCaseStatus,
} from "@/lib/technicalCases";

const STORAGE_KEY = "tc.casos.rascunhos.v1";

export type DraftCase = TechnicalCase & { updatedAt: string };

// ── Persistência local ──────────────────────────────────────────────────────
export function readDrafts(): DraftCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as DraftCase[]) : [];
  } catch {
    return [];
  }
}

export function writeDrafts(drafts: DraftCase[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    /* cota excedida — o operador é avisado na UI */
  }
}

export function upsertDraft(draft: DraftCase): DraftCase[] {
  const all = readDrafts();
  const next = { ...draft, updatedAt: new Date().toISOString() };
  const i = all.findIndex((d) => d.id === draft.id);
  if (i >= 0) all[i] = next;
  else all.unshift(next);
  writeDrafts(all);
  return all;
}

export function removeDraft(id: string): DraftCase[] {
  const all = readDrafts().filter((d) => d.id !== id);
  writeDrafts(all);
  return all;
}

export function newDraft(category: TechnicalCaseCategory): DraftCase {
  const id = `caso-${Date.now().toString(36)}`;
  return {
    id,
    status: "draft",
    occurredAt: new Date().toISOString().slice(0, 10),
    title: "",
    equipment: { category },
    location: { city: "Curitiba" },
    reportedSymptoms: [],
    checksPerformed: [],
    confirmedDiagnosis: [],
    proceduresPerformed: [],
    observedResult: [],
    limitations: [],
    recommendations: [],
    serviceSlug: category,
    evidence: {
      photos: [],
      customerAuthorization: false,
      technicalReview: false,
    },
    privacy: {
      customerNameRemoved: false,
      serialNumberRemoved: false,
      personalDataRemoved: false,
      screenDataReviewed: false,
    },
    updatedAt: new Date().toISOString(),
  };
}

// ── Anonimização / varredura de PII ─────────────────────────────────────────
export interface PiiHit {
  field: string;
  kind: string;
  sample: string;
}

const PII_RULES: Array<{ kind: string; re: RegExp }> = [
  { kind: "telefone", re: /(?:\+?55\s*)?\(?\d{2}\)?\s*9?\d{4}[-.\s]?\d{4}/g },
  { kind: "e-mail", re: /[\w.+-]+@[\w-]+\.[\w.]{2,}/g },
  { kind: "CPF", re: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g },
  { kind: "documento de empresa", re: /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g },
  { kind: "CEP", re: /\b\d{5}-?\d{3}\b/g },
  { kind: "endereço", re: /\b(rua|avenida|av\.|travessa|alameda|rodovia|apto|apartamento|bloco)\b\s+[\wÀ-ÿ]/gi },
  { kind: "número de série", re: /\b(serial|nº\s*de\s*série|n[ºo]\s*serie|imei|s\/n)\b/gi },
  { kind: "credencial", re: /\b(senha|password|login do cliente|token)\b/gi },
];

function walkText(c: DraftCase): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const push = (field: string, v?: string) => {
    if (v && v.trim()) out.push([field, v]);
  };
  push("título", c.title);
  push("referência interna", c.evidence.workOrderReference);
  push("marca", c.equipment.brand);
  push("modelo", c.equipment.model);
  push("cidade", c.location.city);
  push("região", c.location.neighborhood);
  const lists: Array<[string, string[]]> = [
    ["sintomas", c.reportedSymptoms],
    ["verificações", c.checksPerformed],
    ["diagnóstico", c.confirmedDiagnosis],
    ["intervenção", c.proceduresPerformed],
    ["peças", c.partsUsed ?? []],
    ["resultado", c.observedResult],
    ["limitações", c.limitations],
    ["recomendações", c.recommendations],
  ];
  for (const [field, arr] of lists) arr.forEach((v) => push(field, v));
  c.evidence.photos.forEach((p, i) => {
    push(`foto ${i + 1} · alt`, p.alt);
    push(`foto ${i + 1} · legenda`, p.caption);
  });
  return out;
}

/** Varredura fail-closed de dados pessoais em todos os campos textuais. */
export function scanPii(c: DraftCase): PiiHit[] {
  const hits: PiiHit[] = [];
  for (const [field, value] of walkText(c)) {
    for (const { kind, re } of PII_RULES) {
      const m = value.match(new RegExp(re.source, re.flags));
      if (m?.length) hits.push({ field, kind, sample: m[0].slice(0, 40) });
    }
  }
  return hits;
}

/** Substitui ocorrências de PII por marcadores neutros. */
export function anonymizeText(value: string): string {
  let out = value;
  for (const { kind, re } of PII_RULES) {
    out = out.replace(new RegExp(re.source, re.flags), (match) =>
      kind === "endereço" || kind === "número de série" || kind === "credencial"
        ? match
        : `[${kind} removido]`,
    );
  }
  return out;
}

/** Aplica anonimização automática em todos os campos livres do rascunho. */
export function anonymizeDraft(c: DraftCase): DraftCase {
  const map = (arr: string[]) => arr.map(anonymizeText);
  return {
    ...c,
    title: anonymizeText(c.title),
    equipment: {
      ...c.equipment,
      brand: c.equipment.brand ? anonymizeText(c.equipment.brand) : undefined,
      model: c.equipment.model ? anonymizeText(c.equipment.model) : undefined,
    },
    reportedSymptoms: map(c.reportedSymptoms),
    checksPerformed: map(c.checksPerformed),
    confirmedDiagnosis: map(c.confirmedDiagnosis),
    proceduresPerformed: map(c.proceduresPerformed),
    partsUsed: c.partsUsed ? map(c.partsUsed) : undefined,
    observedResult: map(c.observedResult),
    limitations: map(c.limitations),
    recommendations: map(c.recommendations),
    evidence: {
      ...c.evidence,
      photos: c.evidence.photos.map((p) => ({
        ...p,
        alt: anonymizeText(p.alt),
        caption: anonymizeText(p.caption),
      })),
    },
  };
}

// ── Validação de evidências ────────────────────────────────────────────────
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const MIN_EVIDENCE_WIDTH = 640;
export const MIN_EVIDENCE_HEIGHT = 360;

export type EvidenceQuality = NonNullable<TechnicalCasePhoto["quality"]>;

export interface EvidenceProcessResult {
  ok: boolean;
  errors: string[];
  /** Avisos que não bloqueiam o envio, mas entram no checklist. */
  warnings: string[];
  /** JPEG re-codificado (sem EXIF) em data URL. */
  dataUrl?: string;
  width?: number;
  height?: number;
  fingerprint?: string;
  quality?: EvidenceQuality;
}

/** Procura o marcador APP1/Exif no arquivo original (JPEG e WebP). */
async function detectExif(file: Blob): Promise<boolean> {
  try {
    const head = new Uint8Array(await file.slice(0, 65536).arrayBuffer());
    for (let i = 0; i < head.length - 5; i++) {
      if (head[i] === 0x45 && head[i + 1] === 0x78 && head[i + 2] === 0x69 && head[i + 3] === 0x66) {
        return true; // "Exif"
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Assinatura perceptual (aHash 8×8) + métricas de textura.
 * Usada para detectar evidência duplicada e foto genérica/ilustrativa.
 */
function analyzeCanvas(source: CanvasImageSource, width: number, height: number): { fingerprint: string; edgeEnergy: number; colorBuckets: number } | null {
  const small = document.createElement("canvas");
  small.width = 32;
  small.height = 32;
  const ctx = small.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(source, 0, 0, 32, 32);
  const { data } = ctx.getImageData(0, 0, 32, 32);

  const lum: number[] = [];
  const buckets = new Set<string>();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    lum.push(0.299 * r + 0.587 * g + 0.114 * b);
    buckets.add(`${r >> 5}-${g >> 5}-${b >> 5}`);
  }

  // aHash 8×8 a partir da média das células
  let bits = "";
  const cellAvgs: number[] = [];
  for (let by = 0; by < 8; by++) {
    for (let bx = 0; bx < 8; bx++) {
      let sum = 0;
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) sum += lum[(by * 4 + y) * 32 + (bx * 4 + x)];
      cellAvgs.push(sum / 16);
    }
  }
  const mean = cellAvgs.reduce((a, b) => a + b, 0) / cellAvgs.length;
  for (const v of cellAvgs) bits += v >= mean ? "1" : "0";
  const fingerprint = (bits.match(/.{1,4}/g) ?? []).map((n) => parseInt(n, 2).toString(16)).join("");

  // Energia de borda (gradiente médio) — fotos reais de bancada têm textura alta
  let energy = 0;
  for (let y = 1; y < 31; y++) {
    for (let x = 1; x < 31; x++) {
      const c = lum[y * 32 + x];
      energy += Math.abs(c - lum[y * 32 + x + 1]) + Math.abs(c - lum[(y + 1) * 32 + x]);
    }
  }
  void width;
  void height;
  return { fingerprint, edgeEnergy: Math.round(energy / (30 * 30 * 2)), colorBuckets: buckets.size };
}

function buildQuality(
  width: number,
  height: number,
  exifFound: boolean,
  metrics: { edgeEnergy: number; colorBuckets: number },
): EvidenceQuality {
  const genericSuspect = metrics.edgeEnergy < 6 || metrics.colorBuckets < 12;
  return { width, height, exifFound, ...metrics, genericSuspect };
}

function qualityWarnings(q: EvidenceQuality): string[] {
  const w: string[] = [];
  if (q.genericSuspect) {
    w.push(
      `Possível imagem genérica/ilustrativa (textura ${q.edgeEnergy}, ${q.colorBuckets} faixas de cor). Substitua por foto real do atendimento.`,
    );
  }
  if (q.exifFound) w.push("EXIF encontrado no arquivo original — removido na re-codificação.");
  return w;
}

/**
 * Processa um arquivo de evidência: valida tipo/tamanho/dimensões e
 * re-codifica em canvas — o que descarta EXIF (GPS, device, data).
 */
export async function processEvidenceFile(file: File): Promise<EvidenceProcessResult> {
  const errors: string[] = [];
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    errors.push(`Tipo não permitido (${file.type || "desconhecido"}). Use JPG, PNG ou WebP.`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    errors.push(`Arquivo acima de ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`);
  }
  if (errors.length) return { ok: false, errors, warnings: [] };

  const exifFound = await detectExif(file);
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return { ok: false, errors: ["Arquivo de imagem ilegível."], warnings: [] };

  if (bitmap.width < MIN_EVIDENCE_WIDTH || bitmap.height < MIN_EVIDENCE_HEIGHT) {
    return {
      ok: false,
      warnings: [],
      errors: [
        `Dimensões insuficientes (${bitmap.width}×${bitmap.height}). Mínimo ${MIN_EVIDENCE_WIDTH}×${MIN_EVIDENCE_HEIGHT}.`,
      ],
    };
  }

  const maxW = 1400;
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { ok: false, errors: ["Não foi possível processar a imagem neste navegador."], warnings: [] };
  ctx.drawImage(bitmap, 0, 0, w, h);
  const metrics = analyzeCanvas(bitmap, w, h);
  bitmap.close?.();

  const quality = metrics ? buildQuality(w, h, exifFound, metrics) : undefined;
  return {
    ok: true,
    errors: [],
    warnings: quality ? qualityWarnings(quality) : [],
    dataUrl: canvas.toDataURL("image/jpeg", 0.82),
    width: w,
    height: h,
    fingerprint: metrics?.fingerprint,
    quality,
  };
}

/** Confere que uma URL de evidência responde 200 e tem dimensões mínimas. */
export async function checkEvidenceUrl(url: string): Promise<EvidenceProcessResult> {
  if (!/^https?:\/\/|^\//.test(url)) return { ok: false, errors: ["URL inválida."], warnings: [] };
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return { ok: false, errors: [`HTTP ${res.status} ao buscar a evidência.`], warnings: [] };
    const blob = await res.blob();
    if (!ALLOWED_IMAGE_TYPES.includes(blob.type)) {
      return { ok: false, errors: [`Tipo não permitido (${blob.type || "desconhecido"}).`], warnings: [] };
    }
    const exifFound = await detectExif(blob);
    const bitmap = await createImageBitmap(blob).catch(() => null);
    if (!bitmap) return { ok: false, errors: ["Imagem ilegível na URL informada."], warnings: [] };
    const { width, height } = bitmap;
    if (width < MIN_EVIDENCE_WIDTH || height < MIN_EVIDENCE_HEIGHT) {
      bitmap.close?.();
      return { ok: false, errors: [`Dimensões insuficientes (${width}×${height}).`], warnings: [] };
    }
    const metrics = analyzeCanvas(bitmap, width, height);
    bitmap.close?.();
    const quality = metrics ? buildQuality(width, height, exifFound, metrics) : undefined;
    return {
      ok: true,
      errors: [],
      warnings: quality ? qualityWarnings(quality) : [],
      width,
      height,
      fingerprint: metrics?.fingerprint,
      quality,
    };
  } catch {
    return { ok: false, errors: ["Falha de rede ao validar a URL."], warnings: [] };
  }
}

/** Distância de Hamming entre duas assinaturas hexadecimais. */
export function fingerprintDistance(a: string, b: string): number {
  if (!a || !b || a.length !== b.length) return 64;
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) {
      d += x & 1;
      x >>= 1;
    }
  }
  return d;
}

export interface EvidenceSetIssue {
  index: number;
  kind: "duplicada" | "generica" | "exif" | "ilustrativa";
  message: string;
}

/** Auditoria do conjunto de evidências: duplicidade, genérica, EXIF. */
export function auditEvidenceSet(photos: TechnicalCasePhoto[]): EvidenceSetIssue[] {
  const issues: EvidenceSetIssue[] = [];
  photos.forEach((p, i) => {
    if (p.quality?.genericSuspect) {
      issues.push({
        index: i,
        kind: "generica",
        message: `Foto ${i + 1}: suspeita de imagem genérica (textura ${p.quality.edgeEnergy}, ${p.quality.colorBuckets} faixas de cor). Substitua por foto real do atendimento.`,
      });
    }
    if (p.quality?.exifFound && !p.exifStripped) {
      issues.push({ index: i, kind: "exif", message: `Foto ${i + 1}: EXIF detectado e ainda não removido.` });
    }
    if (!p.fromService) {
      issues.push({ index: i, kind: "ilustrativa", message: `Foto ${i + 1}: marcada como ilustrativa — não conta como prova.` });
    }
    for (let j = 0; j < i; j++) {
      const other = photos[j];
      const same =
        (p.src && p.src === other.src) ||
        (!!p.fingerprint && !!other.fingerprint && fingerprintDistance(p.fingerprint, other.fingerprint) <= 4);
      if (same) {
        issues.push({ index: i, kind: "duplicada", message: `Foto ${i + 1}: praticamente idêntica à foto ${j + 1}. Substitua por outro ângulo/etapa.` });
        break;
      }
    }
  });
  return issues;
}

export function validatePhotoMetadata(p: TechnicalCasePhoto): string[] {
  const errs: string[] = [];
  if (!p.src) errs.push("arquivo ausente");
  if (!p.alt?.trim() || p.alt.trim().length < 15) errs.push("alt descritivo com pelo menos 15 caracteres");
  if (!p.caption?.trim()) errs.push("legenda factual obrigatória");
  if (!p.kind) errs.push("classificação obrigatória");
  if (!p.exifStripped) errs.push("EXIF não confirmado como removido");
  if (!p.screenReviewed) errs.push("revisão de tela/etiqueta pendente");
  if (p.quality?.genericSuspect) errs.push("suspeita de foto genérica — substituir");
  return errs;
}


// ── Checklist operacional ──────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  hint?: string;
}

export function buildChecklist(c: DraftCase): ChecklistItem[] {
  const pii = scanPii(c);
  const photoErrs = c.evidence.photos.flatMap(validatePhotoMetadata);
  const evidenceIssues = auditEvidenceSet(c.evidence.photos);
  const item = (id: string, label: string, done: boolean, hint?: string): ChecklistItem => ({
    id,
    label,
    done,
    hint,
  });
  return [
    item("titulo", "Título factual (12+ caracteres, sem promessa)", c.title.trim().length >= 12),
    item("data", "Data real do atendimento registrada", /^\d{4}-\d{2}-\d{2}/.test(c.occurredAt || "")),
    item("sintoma", "Sintoma informado pelo cliente", c.reportedSymptoms.length > 0),
    item("testes", "Testes e verificações executados", c.checksPerformed.length > 0),
    item("diagnostico", "Diagnóstico confirmado (não suposto)", c.confirmedDiagnosis.length > 0),
    item("intervencao", "Intervenção documentada", c.proceduresPerformed.length > 0),
    item("resultado", "Resultado observado", c.observedResult.length > 0),
    item("limitacoes", "Limitações declaradas", c.limitations.length > 0),
    item("recomendacoes", "Recomendações ao cliente", c.recommendations.length > 0),
    item("os", "Referência interna do atendimento", !!c.evidence.workOrderReference?.trim()),
    item("evidencia", "Evidências válidas (tipo, alt, EXIF, dimensões)", c.evidence.photos.length > 0 && photoErrs.length === 0, photoErrs.join("; ")),
    item(
      "evidencia-conjunto",
      "Conjunto de evidências sem duplicidade ou foto genérica",
      c.evidence.photos.length > 0 && evidenceIssues.length === 0,
      evidenceIssues.map((i) => i.message).join(" "),
    ),

    item("autorizacao", "Autorização do cliente registrada", c.evidence.customerAuthorization),
    item("revisao", "Revisão técnica concluída", c.evidence.technicalReview && /^\d{4}-\d{2}-\d{2}/.test(c.reviewedAt || "")),
    item("anonimizacao", "Anonimização confirmada (nome, série, dados, tela)",
      c.privacy.customerNameRemoved && c.privacy.serialNumberRemoved && c.privacy.personalDataRemoved && c.privacy.screenDataReviewed),
    item("pii", "Varredura de PII sem ocorrências", pii.length === 0, pii.map((h) => `${h.field}: ${h.kind}`).join("; ")),
  ];
}

export interface GateResult {
  checklist: ChecklistItem[];
  pii: PiiHit[];
  /** Reprovações do validador fail-closed oficial (simulando status approved). */
  failClosedReasons: string[];
  /** Pronto para gerar rascunho de revisão interna. */
  readyForInternalPreview: boolean;
  /** Pronto para receber status "approved". */
  readyForApproval: boolean;
}

export function evaluateDraft(c: DraftCase): GateResult {
  const checklist = buildChecklist(c);
  const pii = scanPii(c);
  const asApproved: TechnicalCase = { ...c, status: "approved" };
  const failClosedReasons = validateTechnicalCase(asApproved).reasons;
  const allDone = checklist.every((i) => i.done);
  return {
    checklist,
    pii,
    failClosedReasons,
    readyForInternalPreview: allDone && failClosedReasons.length === 0,
    readyForApproval: allDone && failClosedReasons.length === 0 && pii.length === 0,
  };
}

/** Transição de status permitida somente com o gate satisfeito. */
export function canTransition(c: DraftCase, next: TechnicalCaseStatus): { ok: boolean; reason?: string } {
  if (next === "draft" || next === "rejected") return { ok: true };
  const g = evaluateDraft(c);
  if (next === "review") {
    if (g.pii.length > 0) return { ok: false, reason: "Há indícios de dados pessoais. Rode a anonimização antes." };
    return { ok: true };
  }
  if (!g.readyForApproval) {
    return {
      ok: false,
      reason: g.failClosedReasons[0] ?? "Checklist operacional incompleto.",
    };
  }
  return { ok: true };
}
