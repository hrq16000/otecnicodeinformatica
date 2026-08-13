// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// BLOCO DE PROVA — agrupamento de casos aprovados.
//
// Consolida vários casos em um único conjunto editorial com
// recomendação e checklist único de pendências. Somente leitura:
// agrupar não publica nada.
// ─────────────────────────────────────────────────────────────
import { auditEvidenceSet, evaluateDraft, type DraftCase } from "@/lib/technicalCaseDraftStore";
import { buildRequirements, MIN_REVIEWED_PHOTOS, reviewedPhotoCount, scoreCase } from "@/lib/technicalCaseAudit";

const STORAGE_KEY = "tc.casos.blocos.v1";

export interface ProofBlock {
  id: string;
  name: string;
  /** IDs dos casos agrupados. */
  caseIds: string[];
  createdAt: string;
}

export function readBlocks(): ProofBlock[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as ProofBlock[]) : [];
  } catch {
    return [];
  }
}

export function writeBlocks(blocks: ProofBlock[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  } catch {
    /* cota excedida — avisado na UI */
  }
}

export function upsertBlock(block: ProofBlock): ProofBlock[] {
  const all = readBlocks();
  const i = all.findIndex((b) => b.id === block.id);
  if (i >= 0) all[i] = block;
  else all.unshift(block);
  writeBlocks(all);
  return all;
}

export function removeBlock(id: string): ProofBlock[] {
  const next = readBlocks().filter((b) => b.id !== id);
  writeBlocks(next);
  return next;
}

export function newBlock(name: string): ProofBlock {
  return { id: `bloco-${Date.now().toString(36)}`, name, caseIds: [], createdAt: new Date().toISOString() };
}

export type BlockRecommendation =
  | "PUBLICAR COMO BLOCO DE PROVA"
  | "PUBLICAR CASO INDIVIDUAL"
  | "MANTER INTERNO";

export interface BlockEvaluation {
  cases: DraftCase[];
  approvedCount: number;
  averageScore: number;
  /** Serviços cobertos pelo bloco. */
  services: string[];
  /** Checklist único: uma linha por pendência real do bloco. */
  pendencias: string[];
  recommendation: BlockRecommendation;
  rationale: string;
}

export function evaluateBlock(block: ProofBlock, allCases: DraftCase[]): BlockEvaluation {
  const cases = block.caseIds
    .map((id) => allCases.find((c) => c.id === id))
    .filter((c): c is DraftCase => Boolean(c));

  const approvedCount = cases.filter((c) => c.status === "approved").length;
  const scores = cases.map((c) => scoreCase(c).total);
  const averageScore = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;
  const services = Array.from(new Set(cases.map((c) => c.serviceSlug)));

  const pendencias: string[] = [];
  if (cases.length === 0) pendencias.push("Bloco sem casos: adicione pelo menos um caso aprovado.");

  for (const c of cases) {
    const label = c.title || c.id;
    if (c.status !== "approved") pendencias.push(`${label}: status "${c.status}" — só caso aprovado entra em bloco de prova.`);
    const gate = evaluateDraft(c);
    if (gate.pii.length > 0) pendencias.push(`${label}: varredura de PII com ${gate.pii.length} ocorrência(s).`);
    gate.failClosedReasons.forEach((r) => pendencias.push(`${label}: ${r}`));
    buildRequirements(c)
      .filter((r) => !r.done && r.id !== "medicao")
      .forEach((r) => pendencias.push(`${label}: ${r.label}${r.missing ? ` — ${r.missing}` : ""}`));
    if (reviewedPhotoCount(c) < MIN_REVIEWED_PHOTOS) {
      pendencias.push(`${label}: ${reviewedPhotoCount(c)}/${MIN_REVIEWED_PHOTOS} fotos revisadas.`);
    }
    auditEvidenceSet(c.evidence.photos).forEach((i) => pendencias.push(`${label}: ${i.message}`));
  }

  // Duplicidade de evidência entre casos diferentes do mesmo bloco
  const seen = new Map<string, string>();
  for (const c of cases) {
    for (const p of c.evidence.photos) {
      const key = p.fingerprint || p.src;
      if (!key) continue;
      const owner = seen.get(key);
      if (owner && owner !== c.id) {
        pendencias.push(`Evidência repetida entre os casos ${owner} e ${c.id} — cada caso precisa das próprias fotos.`);
      } else {
        seen.set(key, c.id);
      }
    }
  }

  const unique = Array.from(new Set(pendencias));

  let recommendation: BlockRecommendation = "MANTER INTERNO";
  let rationale = "Há pendências abertas ou casos ainda não aprovados; o bloco permanece interno.";
  if (unique.length === 0 && approvedCount >= 3 && averageScore >= 9) {
    recommendation = "PUBLICAR COMO BLOCO DE PROVA";
    rationale = `${approvedCount} casos aprovados, média ${averageScore}/14, cobrindo ${services.length} serviço(s).`;
  } else if (unique.length === 0 && approvedCount >= 1) {
    recommendation = "PUBLICAR CASO INDIVIDUAL";
    rationale = `Apenas ${approvedCount} caso(s) apto(s): publique individualmente antes de montar bloco.`;
  }

  return { cases, approvedCount, averageScore, services, pendencias: unique, recommendation, rationale };
}
