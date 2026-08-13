// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// AUDITORIA EDITORIAL DE CASOS TÉCNICOS (somente leitura).
//
// Não publica nada, não cria rota, não toca no sitemap. Serve para
// o operador enxergar o que falta em cada caso e gerar um pacote
// de revisão interna com pontuação editorial.
// ─────────────────────────────────────────────────────────────
import { evaluateDraft, validatePhotoMetadata, type DraftCase } from "@/lib/technicalCaseDraftStore";

export const MIN_REVIEWED_PHOTOS = 3;

export interface AuditRequirement {
  id: string;
  group: "Diagnóstico" | "Resultado" | "Limitações" | "Evidências" | "Privacidade" | "Revisão";
  label: string;
  done: boolean;
  missing?: string;
}

/** Fotos que passaram na validação completa (alt, legenda, EXIF, tela revisada). */
export function reviewedPhotoCount(c: DraftCase): number {
  return c.evidence.photos.filter((p) => validatePhotoMetadata(p).length === 0 && p.fromService).length;
}

export function buildRequirements(c: DraftCase): AuditRequirement[] {
  const gate = evaluateDraft(c);
  const reviewed = reviewedPhotoCount(c);
  const r = (
    id: string,
    group: AuditRequirement["group"],
    label: string,
    done: boolean,
    missing?: string,
  ): AuditRequirement => ({ id, group, label, done, missing });

  return [
    r("sintoma", "Diagnóstico", "Sintoma relatado registrado", c.reportedSymptoms.length > 0, "adicione o relato do cliente"),
    r("testes", "Diagnóstico", "Pelo menos 2 testes com método e resultado", c.checksPerformed.length >= 2,
      `faltam ${Math.max(0, 2 - c.checksPerformed.length)} teste(s)`),
    r("diagnostico", "Diagnóstico", "Causa confirmada (não hipótese)", c.confirmedDiagnosis.length > 0, "registre a causa confirmada"),
    r("intervencao", "Resultado", "Intervenção documentada", c.proceduresPerformed.length > 0, "descreva o que foi executado"),
    r("resultado", "Resultado", "Resultado validado por teste", c.observedResult.length > 0, "registre o resultado observado"),
    r("medicao", "Resultado", "Medição antes/depois (opcional, soma pontos)", (c.measurements?.length ?? 0) > 0,
      "sem medição — resultado contará como qualitativo"),
    r("limitacoes", "Limitações", "Ao menos uma limitação real", c.limitations.length > 0, "todo caso precisa de limitação"),
    r("recomendacoes", "Limitações", "Recomendações relacionadas ao caso", c.recommendations.length > 0, "adicione recomendações"),
    r("fotos", "Evidências", `Mínimo de ${MIN_REVIEWED_PHOTOS} fotos revisadas do atendimento`, reviewed >= MIN_REVIEWED_PHOTOS,
      `${reviewed}/${MIN_REVIEWED_PHOTOS} revisadas (alt, legenda, EXIF e tela)`),
    r("autorizacao", "Evidências", "Autorização de uso registrada", c.evidence.customerAuthorization, "sem autorização não há uso de imagem"),
    r("os", "Revisão", "Referência interna do atendimento", !!c.evidence.workOrderReference?.trim(), "informe a OS/referência"),
    r("pii", "Privacidade", "Varredura de PII sem ocorrências", gate.pii.length === 0,
      gate.pii.map((h) => `${h.field}: ${h.kind}`).join("; ")),
    r("anonimizacao", "Privacidade", "Checklist de anonimização completo",
      c.privacy.customerNameRemoved && c.privacy.serialNumberRemoved && c.privacy.personalDataRemoved && c.privacy.screenDataReviewed,
      "marque os quatro itens de anonimização"),
    r("revisao", "Revisão", "Revisão técnica concluída e datada",
      c.evidence.technicalReview && /^\d{4}-\d{2}-\d{2}/.test(c.reviewedAt || ""), "conclua e date a revisão técnica"),
  ];
}

// ── Pontuação editorial (0–2 por critério, máx. 14) ─────────────────────────
export interface EditorialScore {
  criteria: Array<{ label: string; score: 0 | 1 | 2; note: string }>;
  total: number;
  recommendation: "CASO INDIVIDUAL" | "BLOCO DE PROVA" | "MANTER INTERNO";
}

export function scoreCase(c: DraftCase): EditorialScore {
  const gate = evaluateDraft(c);
  const reviewed = reviewedPhotoCount(c);
  const hasMeasurement = (c.measurements?.length ?? 0) > 0;

  const criteria: EditorialScore["criteria"] = [
    {
      label: "Diagnóstico",
      score: c.confirmedDiagnosis.length === 0 ? 0 : c.checksPerformed.length >= 2 ? 2 : 1,
      note: c.confirmedDiagnosis.length === 0 ? "incerto" : c.checksPerformed.length >= 2 ? "confirmado" : "parcial",
    },
    {
      label: "Evidência visual",
      score: reviewed === 0 ? 0 : reviewed >= MIN_REVIEWED_PHOTOS ? 2 : 1,
      note: `${reviewed} foto(s) revisada(s)`,
    },
    {
      label: "Resultado",
      score: c.observedResult.length === 0 ? 0 : hasMeasurement ? 2 : 1,
      note: c.observedResult.length === 0 ? "não validado" : hasMeasurement ? "mensurado" : "qualitativo",
    },
    {
      label: "Valor educativo",
      score: c.checksPerformed.length + c.recommendations.length >= 6 ? 2 : c.checksPerformed.length > 0 ? 1 : 0,
      note: "profundidade de testes e recomendações",
    },
    {
      label: "Diferenciação",
      score: c.confirmedDiagnosis.length >= 2 || (c.partsUsed?.length ?? 0) > 0 ? 2 : c.confirmedDiagnosis.length ? 1 : 0,
      note: "quanto o caso foge do trivial",
    },
    {
      label: "Privacidade",
      score: gate.pii.length > 0 ? 0 : c.privacy.customerNameRemoved && c.privacy.serialNumberRemoved
        && c.privacy.personalDataRemoved && c.privacy.screenDataReviewed ? 2 : 1,
      note: gate.pii.length > 0 ? "pendente" : "revisada",
    },
    {
      label: "Relação comercial",
      score: c.serviceSlug ? (c.problemSlug ? 2 : 1) : 0,
      note: c.serviceSlug ? `/servicos/${c.serviceSlug}` : "sem serviço principal",
    },
  ];

  const total = criteria.reduce((s, c2) => s + c2.score, 0);
  const recommendation = total >= 11 ? "CASO INDIVIDUAL" : total >= 8 ? "BLOCO DE PROVA" : "MANTER INTERNO";
  return { criteria, total, recommendation };
}

// ── Pacote de auditoria somente-leitura ─────────────────────────────────────
export function buildAuditPackage(cases: DraftCase[]): string {
  const now = new Date().toISOString().slice(0, 16).replace("T", " ");
  const lines: string[] = [
    "# Pacote de auditoria — casos técnicos (somente leitura)",
    "",
    `Gerado em: ${now} · ${cases.length} caso(s) · Nenhuma publicação realizada.`,
    "",
    "## 1. Casos",
    "",
    "| ID | Categoria | Serviço relacionado | Status | Pontuação | Recomendação |",
    "|---|---|---|---|---|---|",
  ];

  for (const c of cases) {
    const s = scoreCase(c);
    lines.push(`| ${c.id} | ${c.equipment.category} | /servicos/${c.serviceSlug} | ${c.status} | ${s.total}/14 | ${s.recommendation} |`);
  }

  for (const c of cases) {
    const s = scoreCase(c);
    const reqs = buildRequirements(c);
    const pending = reqs.filter((r) => !r.done);
    lines.push(
      "",
      `## Caso ${c.id} — ${c.title || "(sem título)"}`,
      "",
      `- Data: ${c.occurredAt} · Local: ${c.location.city}${c.location.neighborhood ? ` / ${c.location.neighborhood}` : ""}`,
      `- Referência interna: ${c.evidence.workOrderReference || "—"}`,
      `- Equipamento: ${[c.equipment.brand, c.equipment.model, c.equipment.approximateYear].filter(Boolean).join(" ") || "—"}`,
      "",
      "### Diagnóstico confirmado",
      ...(c.confirmedDiagnosis.length ? c.confirmedDiagnosis.map((d) => `- ${d}`) : ["- (pendente)"]),
      "",
      "### Resultado observado",
      ...(c.observedResult.length ? c.observedResult.map((d) => `- ${d}`) : ["- (pendente)"]),
      "",
      "### Limitações",
      ...(c.limitations.length ? c.limitations.map((d) => `- ${d}`) : ["- (pendente)"]),
      "",
      `### Evidências: ${c.evidence.photos.length} foto(s), ${reviewedPhotoCount(c)} revisada(s)`,
      "",
      "### Pontuação editorial",
      "",
      "| Critério | Nota | Nota técnica |",
      "|---|---|---|",
      ...s.criteria.map((x) => `| ${x.label} | ${x.score} | ${x.note} |`),
      `| **Total** | **${s.total}/14** | ${s.recommendation} |`,
      "",
      "### Itens pendentes",
      ...(pending.length ? pending.map((p) => `- [${p.group}] ${p.label} — ${p.missing ?? ""}`) : ["- Nenhum."]),
    );
  }

  lines.push(
    "",
    "## Decisão",
    "",
    cases.length >= 3 && cases.filter((c) => c.status === "approved").length >= 3
      ? "TRÊS CASOS REAIS APTOS PARA AVALIAÇÃO EDITORIAL"
      : "COLETA DE CASOS AINDA INCOMPLETA",
    "",
  );

  return lines.join("\n");
}

/** Modelo copiável do formulário de coleta (um atendimento). */
export const CASE_FORM_TEMPLATE = `CASO ___ (um formulário por atendimento)

1. IDENTIFICAÇÃO INTERNA
ID interno:
Data do atendimento (AAAA-MM-DD):
Ordem de serviço / referência:
Responsável técnico:
Status inicial: draft

2. EQUIPAMENTO
Categoria (serviço relacionado):
Marca:
Modelo (sem número de série):
Ano aproximado:
Configuração relevante:
Sistema operacional:

3. LOCALIDADE AMPLA
Cidade:
Região/bairro (nunca endereço):
Modalidade (remoto | domicílio | empresa | coleta | bancada):

4. SINTOMA RELATADO (palavras do cliente, sem identificação)
-

5. ESTADO INICIAL OBSERVADO (somente fatos)
- Ligava:
- Imagem:
- Inicializava o sistema:
- Ruído / aquecimento:
- Mensagens de erro:
- Arquivos acessíveis:
- Dano físico visível:

6. TESTES REALIZADOS (mínimo 2 — teste | método | resultado | limitação)
-
-

7. DIAGNÓSTICO CONFIRMADO
Hipóteses iniciais:
Causa confirmada:
Evidências:

8. INTERVENÇÃO REALIZADA (executado | recomendado | não autorizado | não aplicável)
Procedimentos:
Peças/componentes:
Configurações:
Backup realizado:
Autorização do cliente:

9. RESULTADO OBSERVADO (somente validado)
Antes:
Depois:
Método de validação:

10. LIMITAÇÕES (obrigatório ao menos uma)
-

11. RECOMENDAÇÕES FINAIS
-

12. FOTOS (mínimo 3 reais do atendimento)
Foto 1 — tipo | legenda factual | alt | autorizada | PII removida | EXIF revisado
Foto 2 —
Foto 3 —

13. PRIVACIDADE (todas devem ser "sim")
Nome removido / telefone removido / e-mail removido / endereço removido /
série removida / arquivos pessoais ausentes / senhas ausentes /
dados empresariais revisados / fotos autorizadas

14. AUTORIZAÇÃO
Obtida: Data: Forma: Responsável pelo registro:

15. REVISÃO TÉCNICA
Revisado por: Data: Correções solicitadas: Resultado:
`;
