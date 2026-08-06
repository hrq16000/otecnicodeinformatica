// ─────────────────────────────────────────────────────────────
// IMPORTAÇÃO PREENCHÍVEL DE CASOS TÉCNICOS (JSON ou CSV).
//
// Valida campos obrigatórios e evidências ANTES de gravar. Nada é
// publicado; a importação apenas cria rascunhos locais em status
// "draft", sempre passando pela varredura de PII.
// ─────────────────────────────────────────────────────────────
import { TECHNICAL_CASE_CATEGORIES, type TechnicalCaseCategory } from "@/lib/technicalCases";
import { newDraft, scanPii, type DraftCase } from "@/lib/technicalCaseDraftStore";

export interface ImportIssue {
  row: number;
  field: string;
  message: string;
}

export interface ImportResult {
  drafts: DraftCase[];
  issues: ImportIssue[];
  skipped: number;
}

/** Campos aceitos na importação (JSON keys e cabeçalhos do CSV). */
export const IMPORT_FIELDS = [
  "title",
  "occurredAt",
  "category",
  "city",
  "neighborhood",
  "brand",
  "model",
  "workOrderReference",
  "reportedSymptoms",
  "checksPerformed",
  "confirmedDiagnosis",
  "proceduresPerformed",
  "partsUsed",
  "observedResult",
  "limitations",
  "recommendations",
  "photoUrls",
] as const;

export const IMPORT_CSV_TEMPLATE = `${IMPORT_FIELDS.join(";")}
Notebook não ligava após queda de energia — falha no circuito de carga;2026-08-01;manutencao-de-notebook;Curitiba;Zona Sul;;;OS-2026-014;Não liga e LED apagado|Sem reação com a fonte;Teste com fonte equivalente|Medição na entrada de energia;Circuito de carga sem tensão de saída;Substituição do conector de energia|Limpeza interna;Conector de energia;Liga e carrega em teste de 2 horas;Bateria com autonomia reduzida — não substituída nesta visita;Evitar filtro de linha danificado|Backup periódico;/casos/foto-1.jpg|/casos/foto-2.jpg`;

export const IMPORT_JSON_TEMPLATE = JSON.stringify(
  [
    {
      title: "Notebook não ligava após queda de energia — falha no circuito de carga",
      occurredAt: "2026-08-01",
      category: "manutencao-de-notebook",
      city: "Curitiba",
      neighborhood: "Zona Sul",
      workOrderReference: "OS-2026-014",
      reportedSymptoms: ["Não liga e LED apagado"],
      checksPerformed: ["Teste com fonte equivalente", "Medição na entrada de energia"],
      confirmedDiagnosis: ["Circuito de carga sem tensão de saída"],
      proceduresPerformed: ["Substituição do conector de energia"],
      partsUsed: ["Conector de energia"],
      observedResult: ["Liga e carrega em teste de 2 horas"],
      limitations: ["Bateria com autonomia reduzida — não substituída nesta visita"],
      recommendations: ["Backup periódico"],
      photoUrls: ["/casos/foto-1.jpg"],
    },
  ],
  null,
  2,
);

const LIST_FIELDS = new Set([
  "reportedSymptoms",
  "checksPerformed",
  "confirmedDiagnosis",
  "proceduresPerformed",
  "partsUsed",
  "observedResult",
  "limitations",
  "recommendations",
  "photoUrls",
]);

type RawRow = Record<string, unknown>;

function toList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string") {
    return v
      .split(/\||\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function parseCsv(text: string): RawRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(delimiter).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(delimiter);
    const row: RawRow = {};
    headers.forEach((h, i) => {
      row[h] = (cells[i] ?? "").trim();
    });
    return row;
  });
}

function parseInput(text: string): { rows: RawRow[]; error?: string } {
  const trimmed = text.trim();
  if (!trimmed) return { rows: [], error: "Nada para importar." };
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      const rows = Array.isArray(parsed) ? parsed : [parsed];
      return { rows: rows as RawRow[] };
    } catch {
      return { rows: [], error: "JSON inválido." };
    }
  }
  return { rows: parseCsv(trimmed) };
}

const REQUIRED_LISTS: Array<[string, string]> = [
  ["reportedSymptoms", "sintoma informado"],
  ["checksPerformed", "testes e verificações"],
  ["confirmedDiagnosis", "diagnóstico confirmado"],
  ["proceduresPerformed", "intervenção realizada"],
  ["observedResult", "resultado observado"],
  ["limitations", "limitações declaradas"],
  ["recommendations", "recomendações"],
];

/**
 * Converte texto JSON/CSV em rascunhos válidos. Linhas com erro são
 * descartadas — fail-closed: nada entra pela metade.
 */
export function importCases(text: string): ImportResult {
  const { rows, error } = parseInput(text);
  if (error) return { drafts: [], issues: [{ row: 0, field: "arquivo", message: error }], skipped: 0 };

  const issues: ImportIssue[] = [];
  const drafts: DraftCase[] = [];
  let skipped = 0;

  rows.forEach((row, idx) => {
    const n = idx + 1;
    const rowIssues: ImportIssue[] = [];
    const get = (k: string) => (typeof row[k] === "string" ? (row[k] as string).trim() : row[k]);

    const category = String(get("category") ?? "") as TechnicalCaseCategory;
    if (!TECHNICAL_CASE_CATEGORIES.includes(category)) {
      rowIssues.push({ row: n, field: "category", message: `categoria inválida ("${category || "vazia"}")` });
    }
    const title = String(get("title") ?? "");
    if (title.trim().length < 12) rowIssues.push({ row: n, field: "title", message: "título factual com 12+ caracteres" });

    const occurredAt = String(get("occurredAt") ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(occurredAt)) {
      rowIssues.push({ row: n, field: "occurredAt", message: "data no formato AAAA-MM-DD" });
    } else if (occurredAt > new Date().toISOString().slice(0, 10)) {
      rowIssues.push({ row: n, field: "occurredAt", message: "data no futuro não é atendimento real" });
    }

    const city = String(get("city") ?? "").trim();
    if (!city) rowIssues.push({ row: n, field: "city", message: "cidade obrigatória" });

    const workOrderReference = String(get("workOrderReference") ?? "").trim();
    if (!workOrderReference) {
      rowIssues.push({ row: n, field: "workOrderReference", message: "referência interna do atendimento obrigatória" });
    }

    const lists: Record<string, string[]> = {};
    for (const field of LIST_FIELDS) lists[field] = toList(row[field]);
    for (const [field, label] of REQUIRED_LISTS) {
      if (lists[field].length === 0) rowIssues.push({ row: n, field, message: `${label} obrigatório` });
    }
    if (lists.checksPerformed.length < 2) {
      rowIssues.push({ row: n, field: "checksPerformed", message: "mínimo de 2 testes com método e resultado" });
    }
    if (lists.photoUrls.length === 0) {
      rowIssues.push({ row: n, field: "photoUrls", message: "informe as evidências (serão validadas antes de aprovar)" });
    }

    if (rowIssues.length > 0) {
      issues.push(...rowIssues);
      skipped++;
      return;
    }

    const base = newDraft(category);
    const draft: DraftCase = {
      ...base,
      title,
      occurredAt,
      equipment: {
        category,
        brand: String(get("brand") ?? "") || undefined,
        model: String(get("model") ?? "") || undefined,
      },
      location: { city, neighborhood: String(get("neighborhood") ?? "") || undefined },
      reportedSymptoms: lists.reportedSymptoms,
      checksPerformed: lists.checksPerformed,
      confirmedDiagnosis: lists.confirmedDiagnosis,
      proceduresPerformed: lists.proceduresPerformed,
      partsUsed: lists.partsUsed.length ? lists.partsUsed : undefined,
      observedResult: lists.observedResult,
      limitations: lists.limitations,
      recommendations: lists.recommendations,
      evidence: {
        ...base.evidence,
        workOrderReference,
        photos: lists.photoUrls.map((src) => ({
          src,
          alt: "",
          caption: "",
          kind: "equipamento-recebido" as const,
          fromService: true,
          exifStripped: false,
          screenReviewed: false,
        })),
      },
    };

    const pii = scanPii(draft);
    if (pii.length > 0) {
      pii.forEach((h) => issues.push({ row: n, field: h.field, message: `dado pessoal detectado (${h.kind}) — corrija antes de importar` }));
      skipped++;
      return;
    }

    drafts.push(draft);
  });

  return { drafts, issues, skipped };
}
