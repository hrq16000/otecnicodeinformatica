// Exportação de um caso técnico aprovado em PDF único (uso interno).
// Nada é publicado: o arquivo sai direto para o disco do operador.
import { createPdf, downloadBlob } from "@/lib/pdfDoc";
import { siteConfig } from "@/lib/siteConfig";
import { auditEvidenceSet, type DraftCase } from "@/lib/technicalCaseDraftStore";
import { buildRequirements, reviewedPhotoCount, scoreCase } from "@/lib/technicalCaseAudit";

export async function generateCasePdf(c: DraftCase): Promise<Blob> {
  const pdf = await createPdf();
  const score = scoreCase(c);
  const reqs = buildRequirements(c);
  const pending = reqs.filter((r) => !r.done);
  const evidenceIssues = auditEvidenceSet(c.evidence.photos);

  pdf.paragraph(`${siteConfig.brandName.toUpperCase()} · DOCUMENTO INTERNO — NÃO PUBLICADO`, { muted: true, size: 9 });
  pdf.title(c.title || "(caso sem título)");
  pdf.keyValue("ID interno", c.id);
  pdf.keyValue("Status", c.status);
  pdf.keyValue("Data do atendimento", c.occurredAt);
  pdf.keyValue("Revisão técnica", c.reviewedAt || "—");
  pdf.keyValue("Referência interna", c.evidence.workOrderReference || "—");
  pdf.keyValue("Serviço relacionado", `/servicos/${c.serviceSlug}`);
  pdf.keyValue(
    "Local",
    `${c.location.city}${c.location.neighborhood ? ` / ${c.location.neighborhood}` : ""}`,
  );
  pdf.keyValue(
    "Equipamento",
    [c.equipment.brand, c.equipment.model, c.equipment.approximateYear].filter(Boolean).join(" ") || "—",
  );
  pdf.rule();

  pdf.heading(`Resumo editorial — ${score.total}/14 · ${score.recommendation}`);
  score.criteria.forEach((x) => pdf.bullet(`${x.label}: ${x.score}`, x.note));

  const section = (title: string, items: string[]) => {
    pdf.heading(title);
    if (items.length === 0) pdf.paragraph("(pendente)", { muted: true });
    else items.forEach((i) => pdf.bullet(i));
  };

  section("Sintoma informado", c.reportedSymptoms);
  section("Testes e verificações", c.checksPerformed);
  section("Diagnóstico confirmado", c.confirmedDiagnosis);
  section("Intervenção realizada", c.proceduresPerformed);
  section("Peças utilizadas", c.partsUsed ?? []);
  section("Resultado observado", c.observedResult);
  section("Limitações declaradas", c.limitations);
  section("Recomendações", c.recommendations);

  if (c.measurements?.length) {
    pdf.heading("Medições");
    c.measurements.forEach((m) =>
      pdf.bullet(
        `${m.label}: ${m.before ?? "—"} → ${m.after ?? "—"} ${m.unit}`,
        `${m.tool} · ${m.method} · ${m.measuredAt} · limitações: ${m.limitations}`,
      ),
    );
  }

  pdf.heading(
    `Evidências — ${c.evidence.photos.length} foto(s), ${reviewedPhotoCountSafe(c)} revisada(s)`,
  );
  if (c.evidence.photos.length === 0) pdf.paragraph("(nenhuma evidência anexada)", { muted: true });
  c.evidence.photos.forEach((p, i) =>
    pdf.bullet(
      `Foto ${i + 1} · ${p.kind}${p.fromService ? "" : " (ilustrativa)"}`,
      `${p.caption || "sem legenda"} · alt: ${p.alt || "ausente"} · EXIF removido: ${p.exifStripped ? "sim" : "não"} · tela revisada: ${p.screenReviewed ? "sim" : "não"}${p.quality ? ` · ${p.quality.width}×${p.quality.height}` : ""}`,
    ),
  );
  if (evidenceIssues.length) {
    pdf.heading("Alertas de evidência");
    evidenceIssues.forEach((i) => pdf.bullet(i.message));
  }

  pdf.heading("Privacidade");
  pdf.bullet(`Nome removido: ${c.privacy.customerNameRemoved ? "sim" : "não"}`);
  pdf.bullet(`Número de série removido: ${c.privacy.serialNumberRemoved ? "sim" : "não"}`);
  pdf.bullet(`Dados pessoais removidos: ${c.privacy.personalDataRemoved ? "sim" : "não"}`);
  pdf.bullet(`Dados em tela revisados: ${c.privacy.screenDataReviewed ? "sim" : "não"}`);
  pdf.bullet(`Autorização do cliente: ${c.evidence.customerAuthorization ? "sim" : "não"}`);

  pdf.heading("Itens pendentes");
  if (pending.length === 0) pdf.paragraph("Nenhum item pendente.");
  else pending.forEach((p) => pdf.bullet(`[${p.group}] ${p.label}`, p.missing));

  pdf.space(6);
  pdf.rule();
  pdf.paragraph(
    "Documento gerado para revisão interna. A existência deste registro não autoriza publicação: qualquer uso público depende do gate fail-closed e de autorização registrada.",
    { muted: true, size: 9 },
  );
  pdf.footer(`${siteConfig.brandName} · caso ${c.id} · uso interno`);

  return pdf.blob();
}

export async function downloadCasePdf(c: DraftCase): Promise<void> {
  downloadBlob(await generateCasePdf(c), `caso-${c.id}.pdf`);
}

/** PDF consolidado de um bloco de prova (vários casos). */
export async function generateProofBlockPdf(
  title: string,
  cases: DraftCase[],
  pendencias: string[],
  recommendation: string,
): Promise<Blob> {
  const pdf = await createPdf();
  pdf.paragraph(`${siteConfig.brandName.toUpperCase()} · BLOCO DE PROVA — USO INTERNO`, { muted: true, size: 9 });
  pdf.title(title);
  pdf.keyValue("Casos no bloco", String(cases.length));
  pdf.keyValue("Recomendação editorial", recommendation);
  pdf.rule();

  cases.forEach((c) => {
    const s = scoreCase(c);
    pdf.heading(`${c.id} — ${c.title || "(sem título)"}`);
    pdf.keyValue("Status", `${c.status} · ${s.total}/14 · ${s.recommendation}`);
    pdf.keyValue("Serviço", `/servicos/${c.serviceSlug}`);
    pdf.keyValue("Evidências revisadas", String(reviewedPhotoCountSafe(c)));
    (c.confirmedDiagnosis.length ? c.confirmedDiagnosis : ["(diagnóstico pendente)"]).forEach((d) => pdf.bullet(d));
  });

  pdf.heading("Checklist único de pendências do bloco");
  if (pendencias.length === 0) pdf.paragraph("Nenhuma pendência no bloco.");
  else pendencias.forEach((p) => pdf.checkbox(p));

  pdf.footer(`${siteConfig.brandName} · bloco de prova · uso interno`);
  return pdf.blob();
}
