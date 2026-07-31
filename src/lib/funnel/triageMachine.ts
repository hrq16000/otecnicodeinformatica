/**
 * ============================================================================
 * TRIAGEM — MÁQUINA DE ESTADOS (lógica pura, testável, sem React)
 * ============================================================================
 * Toda a decisão de rota, validação, resumo e mensagem vive aqui.
 * Os componentes apenas renderizam. Isto mantém a lógica reutilizável entre
 * projetos e facilita testes automatizados.
 */
import {
  EQUIPMENTS,
  EVENT_LABELS,
  EVENT_OPTIONS,
  EMPTY_ANSWERS,
  PRICING,
  QUALIFICATION_FIELDS,
  PRAZO_COLETA,
  ROUTE_LABEL,
  ROUTE_MIN_PRICE,
  ROUTE_PRAZO,
  TRIAGE_VERSION,
  BRAND_NAME,
  getEquipment,
  type EquipmentConfig,
  type Field,
  type ServiceRoute,
  type SymptomMeta,
  type TriageAnswers,
} from "./triageConfig";

// ─────────────────────────────────────────────────────────────
// ETAPAS
// ─────────────────────────────────────────────────────────────
export const STEPS = [
  "equipment", // 0
  "identity",  // 1 — identificação + sintoma
  "details",   // 2 — contexto + urgência
  "modality",  // 3 — modalidade definida (informativo)
  "terms",     // 4 — ciência e aceite
  "review",    // 5 — revisão + WhatsApp
] as const;

export type StepName = (typeof STEPS)[number];
export const TOTAL_STEPS = STEPS.length;

// ─────────────────────────────────────────────────────────────
// SINTOMA / EVENTO
// ─────────────────────────────────────────────────────────────
export function getSymptomMeta(a: TriageAnswers): SymptomMeta | undefined {
  const eq = getEquipment(a.equipment);
  if (!eq || !a.symptom) return undefined;
  return eq.symptomMeta[a.symptom];
}

export function getSymptomLabel(a: TriageAnswers): string {
  const eq = getEquipment(a.equipment);
  if (!eq || !a.symptom) return "";
  if (eq.symptomField.type === "textarea") return a.symptom;
  return eq.symptomField.options?.find((o) => o.value === a.symptom)?.label ?? a.symptom;
}

/** Campo temporal condicional derivado do sintoma (pode não existir). */
export function getEventField(a: TriageAnswers): Field | null {
  const meta = getSymptomMeta(a);
  if (!meta?.event) return null;
  return {
    id: "__event",
    label: EVENT_LABELS[meta.event],
    type: "single",
    required: true,
    options: EVENT_OPTIONS[meta.event],
  };
}

// ─────────────────────────────────────────────────────────────
// CAMPOS VISÍVEIS POR ETAPA
// ─────────────────────────────────────────────────────────────
function visible(fields: Field[], a: TriageAnswers): Field[] {
  return fields.filter((f) => !f.visibleWhen || f.visibleWhen(a));
}

/** Campos da etapa "identity" (qualificação + identificação + sintoma). */
export function getIdentityFields(a: TriageAnswers): Field[] {
  const eq = getEquipment(a.equipment);
  if (!eq) return [];
  return [
    ...QUALIFICATION_FIELDS,
    ...visible(eq.identityFields, a),
    eq.symptomField,
  ];
}


/** Campos da etapa "details" (contextuais + evento + urgência). */
export function getDetailsFields(a: TriageAnswers): Field[] {
  const eq = getEquipment(a.equipment);
  if (!eq) return [];
  const out: Field[] = [];
  const ev = getEventField(a);
  if (ev) out.push(ev);
  out.push(...visible(eq.contextFields, a));
  return out;
}

// ─────────────────────────────────────────────────────────────
// DETERMINAÇÃO DA MODALIDADE
// ─────────────────────────────────────────────────────────────
const PC_NOT_WORKING = ["nao-liga", "liga-nao-inicia", "liga-desliga"];

export function determineServiceRoute(a: TriageAnswers): ServiceRoute {
  const eq = getEquipment(a.equipment);
  if (!eq) return "coleta";
  // Equipamentos com rota fixa → sempre coleta.
  if (eq.forcedRoute) return eq.forcedRoute;

  // PC / Notebook — única categoria com remoto/visita.
  if (eq.id === "pc") {
    const liga = a.fields.liga;
    if (PC_NOT_WORKING.includes(liga)) return "coleta";
    const meta = a.symptom ? eq.symptomMeta[a.symptom] : undefined;
    if (!meta) return "visita";
    // remoto exige computador ligando normalmente (garantido acima).
    if (meta.route === "remoto") return liga === "liga-normal" ? "remoto" : "coleta";
    return meta.route;
  }
  return "coleta";
}

export interface PricingRules {
  route: ServiceRoute;
  routeLabel: string;
  minPrice: string;
  prazo: string;
  priceHint?: string;
  /** Explicação em linguagem simples do porquê da modalidade. */
  explanation: string;
}

export function getPricingRules(a: TriageAnswers): PricingRules {
  const route = determineServiceRoute(a);
  const eq = getEquipment(a.equipment);
  const meta = getSymptomMeta(a);
  const equipLabel = eq?.label ?? "equipamento";

  let explanation = "";
  if (route === "remoto") {
    explanation =
      "Pelas informações fornecidas, o serviço pode ser compatível com atendimento remoto, pois o computador está funcionando e a solicitação envolve instalação ou configuração. A confirmação será feita no WhatsApp.";
  } else if (route === "visita") {
    explanation =
      "Pelas informações fornecidas, seu caso pode ser avaliado por visita técnica. O atendimento custa R$ 99,99 por até 30 minutos. Se for identificada necessidade de bancada, coleta ou peças, você será informado antes.";
  } else if (meta?.category) {
    explanation = `Os sintomas informados têm indício de ${meta.category}. O valor depende de avaliação técnica e este equipamento precisa ser encaminhado por coleta e entrega. O valor mínimo é de ${PRICING.coletaMin}, com peças não inclusas.`;
  } else {
    explanation = `Pelas informações fornecidas, este ${equipLabel.toLowerCase()} precisa ser encaminhado por coleta e entrega para avaliação técnica. O valor mínimo é de ${PRICING.coletaMin}, com peças não inclusas.`;
  }

  return {
    route,
    routeLabel: ROUTE_LABEL[route],
    minPrice: ROUTE_MIN_PRICE[route],
    prazo: ROUTE_PRAZO[route],
    priceHint: route === "coleta" ? meta?.priceHint : undefined,
    explanation,
  };
}

// ─────────────────────────────────────────────────────────────
// TERMOS / ACEITES (dependem da rota)
// ─────────────────────────────────────────────────────────────
export interface TermItem {
  id: string;
  text: string;
}

export function getTermsForRoute(route: ServiceRoute): TermItem[] {
  const base: TermItem[] = [
    {
      id: "ciencia-geral",
      text: "Esta triagem é obrigatória e registra minha ciência sobre a modalidade indicada, os valores mínimos, os prazos e as condições. O WhatsApp será aberto apenas para agendar o atendimento compatível.",
    },
  ];

  if (route === "coleta") {
    return [
      ...base,
      {
        id: "coleta-min",
        text: `Estou ciente de que o valor mínimo da coleta e entrega é de ${PRICING.coletaMin}, com peças não inclusas. Serviços ou procedimentos de até ${PRICING.coletaTeto} poderão ser realizados sem nova autorização. Valores acima de ${PRICING.coletaTeto} serão informados previamente para aprovação.`,
      },
      {
        id: "coleta-cancel",
        text: `Estou ciente de que, em caso de cancelamento, desistência ou não aprovação do orçamento, será cobrado ${PRICING.coletaCancel} pelo diagnóstico, análise e permanência do equipamento na fila técnica.`,
      },
      {
        id: "coleta-prazo",
        text: `Estou ciente de que o prazo estimado é de ${PRAZO_COLETA}.`,
      },
    ];
  }

  if (route === "visita") {
    return [
      ...base,
      {
        id: "visita-valor",
        text: `Estou ciente de que a visita técnica para PC / Notebook custa ${PRICING.visita}, com nova cobrança a cada período adicional de até 30 minutos. A visita não garante o reparo e peças não estão inclusas.`,
      },
    ];
  }

  // remoto
  return [
    ...base,
    {
      id: "remoto-valor",
      text: `Estou ciente de que o valor mínimo do atendimento é de ${PRICING.minGeral} e que o serviço remoto depende de o equipamento estar ligado, com acesso e conexão à internet.`,
    },
  ];
}

// ─────────────────────────────────────────────────────────────
// VALIDAÇÃO POR ETAPA
// ─────────────────────────────────────────────────────────────
export interface ValidationResult {
  ok: boolean;
  /** id do primeiro campo incompleto (para foco). */
  firstIncomplete?: string;
  reason?: string;
}

function fieldValue(a: TriageAnswers, f: Field): string {
  if (f.id === "symptom") return a.symptom ?? "";
  if (f.id === "__event") return a.fields.__event ?? "";
  return a.fields[f.id] ?? "";
}

function fieldComplete(a: TriageAnswers, f: Field): boolean {
  if (!f.required) return true;
  const v = fieldValue(a, f).trim();
  if (!v) return false;
  if (f.minLength && v.length < f.minLength) return false;
  return true;
}

export function validateStep(step: number, a: TriageAnswers): ValidationResult {
  const name = STEPS[step];
  if (name === "equipment") {
    return a.equipment ? { ok: true } : { ok: false, reason: "Selecione o equipamento." };
  }
  if (name === "identity") {
    for (const f of getIdentityFields(a)) {
      if (!fieldComplete(a, f)) {
        return { ok: false, firstIncomplete: f.id, reason: `Preencha: ${f.label}` };
      }
    }
    return { ok: true };
  }
  if (name === "details") {
    for (const f of getDetailsFields(a)) {
      if (!fieldComplete(a, f)) {
        return { ok: false, firstIncomplete: f.id, reason: `Preencha: ${f.label}` };
      }
    }
    if (!a.urgency) {
      return { ok: false, firstIncomplete: "__urgency", reason: "Selecione a urgência." };
    }
    return { ok: true };
  }
  if (name === "modality") {
    return { ok: true };
  }
  if (name === "terms") {
    const route = determineServiceRoute(a);
    for (const t of getTermsForRoute(route)) {
      if (!a.termsAccepted[t.id]) {
        return { ok: false, firstIncomplete: t.id, reason: "Confirme todos os itens para continuar." };
      }
    }
    return { ok: true };
  }
  return { ok: true };
}

export function getFirstIncompleteField(step: number, a: TriageAnswers): string | undefined {
  return validateStep(step, a).firstIncomplete;
}

// ─────────────────────────────────────────────────────────────
// LIMPEZA DE RESPOSTAS DEPENDENTES
// ─────────────────────────────────────────────────────────────
/** Ao trocar de equipamento, descarta tudo que era específico do anterior. */
export function resetForEquipment(a: TriageAnswers, next: TriageAnswers["equipment"]): TriageAnswers {
  if (a.equipment === next) return a;
  return {
    ...EMPTY_ANSWERS,
    equipment: next,
    urgency: a.urgency, // urgência é neutra, pode ser preservada
  };
}

/** Ao trocar o sintoma, descarta respostas contextuais que dependiam dele. */
export function resetForSymptom(a: TriageAnswers, nextSymptom: string): TriageAnswers {
  if (a.symptom === nextSymptom) return a;
  const eq = getEquipment(a.equipment);
  if (!eq) return { ...a, symptom: nextSymptom };
  // Remove valores de campos contextuais + evento (serão recalculados).
  const keptFields: Record<string, string> = {};
  const contextIds = new Set(eq.contextFields.map((f) => f.id));
  for (const [k, v] of Object.entries(a.fields)) {
    if (k === "__event") continue;
    if (contextIds.has(k)) continue;
    keptFields[k] = v;
  }
  return { ...a, symptom: nextSymptom, fields: keptFields };
}

// ─────────────────────────────────────────────────────────────
// RESUMO + MENSAGEM DE WHATSAPP
// ─────────────────────────────────────────────────────────────
export interface SummaryRow {
  label: string;
  value: string;
}

function detailLabel(eq: EquipmentConfig, a: TriageAnswers): string {
  // Junta respostas contextuais legíveis (evento + campos).
  const parts: string[] = [];
  const ev = getEventField(a);
  if (ev) {
    const v = a.fields.__event;
    const opt = ev.options?.find((o) => o.value === v);
    if (opt) parts.push(`${ev.label} ${opt.label}`);
  }
  for (const f of visible(eq.contextFields, a)) {
    const raw = a.fields[f.id];
    if (!raw) continue;
    const label = f.options?.find((o) => o.value === raw)?.label ?? raw;
    parts.push(`${f.label} ${label}`);
  }
  return parts.join(" · ");
}

export function buildTriageSummary(a: TriageAnswers): SummaryRow[] {
  const eq = getEquipment(a.equipment);
  const rules = getPricingRules(a);
  const rows: SummaryRow[] = [];
  if (eq) rows.push({ label: "Equipamento", value: eq.label });

  const marca = a.fields.marca || a.fields.console || a.fields["equip-nome"];
  const modelo = a.fields.modelo;
  const marcaModelo = [marca, modelo].filter(Boolean).join(" · ");
  if (marcaModelo) rows.push({ label: "Marca/modelo", value: marcaModelo });

  if (a.fields.idade) {
    const idadeOpt = eq?.identityFields
      .find((f) => f.id === "idade")
      ?.options?.find((o) => o.value === a.fields.idade);
    rows.push({ label: "Idade aproximada", value: idadeOpt?.label ?? a.fields.idade });
  }

  const symptom = getSymptomLabel(a);
  if (symptom) rows.push({ label: "Problema", value: symptom });

  const details = eq ? detailLabel(eq, a) : "";
  if (details) rows.push({ label: "Detalhes", value: details });

  if (a.urgency) {
    const u = URGENCY_LABEL(a.urgency);
    if (u) rows.push({ label: "Urgência", value: u });
  }

  rows.push({ label: "Modalidade indicada", value: rules.routeLabel });
  rows.push({ label: "Valor mínimo informado", value: rules.minPrice });
  rows.push({ label: "Prazo informado", value: rules.prazo });

  if (a.finalNotes.trim()) rows.push({ label: "Observação adicional", value: a.finalNotes.trim() });
  return rows;
}

import { URGENCY_OPTIONS } from "./triageConfig";
function URGENCY_LABEL(v: string): string {
  return URGENCY_OPTIONS.find((o) => o.value === v)?.label ?? v;
}

/** Identificador simples da triagem (data/hora + hash curto). */
export function makeTriageId(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `T-${stamp}-${rand}`;
}

export function buildWhatsAppMessage(
  a: TriageAnswers,
  triageId: string,
  originUrl?: string,
): string {
  const rows = buildTriageSummary(a);
  const lines: string[] = [];
  lines.push(`Olá! Concluí a triagem obrigatória pelo site ${BRAND_NAME}.`);
  lines.push("");
  for (const r of rows) {
    if (r.label === "Observação adicional") continue; // vai por último
    lines.push(`*${r.label}:* ${r.value}`);
  }
  if (originUrl) {
    lines.push(`*Página de origem:* ${originUrl}`);
  }
  lines.push("");
  lines.push("Confirmo que li e aceitei as condições apresentadas no funil.");
  const obs = rows.find((r) => r.label === "Observação adicional");
  if (obs) {
    lines.push("");
    lines.push(`*Observação adicional:* ${obs.value}`);
  }
  lines.push("");
  lines.push(`_Triagem ${triageId} · ${new Date().toLocaleString("pt-BR")} · v${TRIAGE_VERSION}_`);
  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────
// PERSISTÊNCIA COM VERSIONAMENTO (fail-safe)
// ─────────────────────────────────────────────────────────────
interface PersistShape {
  version: string;
  answers: TriageAnswers;
}

export function loadPersisted(key: string): TriageAnswers | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistShape>;
    // Descarta estado de versão incompatível.
    if (parsed.version !== TRIAGE_VERSION || !parsed.answers) return null;
    const a = parsed.answers;
    // Sanitização defensiva contra estruturas antigas/corrompidas.
    return {
      ...EMPTY_ANSWERS,
      ...a,
      fields: a.fields && typeof a.fields === "object" ? a.fields : {},
      termsAccepted: a.termsAccepted && typeof a.termsAccepted === "object" ? a.termsAccepted : {},
      equipment: EQUIPMENTS.some((e) => e.id === a.equipment) ? a.equipment! : null,
    };
  } catch {
    return null;
  }
}

export function persist(key: string, answers: TriageAnswers): void {
  try {
    const payload: PersistShape = { version: TRIAGE_VERSION, answers };
    sessionStorage.setItem(key, JSON.stringify(payload));
  } catch {
    /* noop */
  }
}

export function clearPersisted(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* noop */
  }
}
