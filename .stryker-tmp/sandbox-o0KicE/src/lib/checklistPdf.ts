// @ts-nocheck
// Gera o PDF do checklist de diagnóstico rápido de um sintoma.
// Sob demanda, no navegador, sem rota pública e sem coletar dados.
import { createPdf, downloadBlob } from "@/lib/pdfDoc";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import type { DiagnosticoChecklist } from "@/lib/diagnosticoChecklists";

export async function generateChecklistPdf(checklist: DiagnosticoChecklist): Promise<Blob> {
  const pdf = await createPdf();

  pdf.paragraph(siteConfig.brandName.toUpperCase(), { muted: true, size: 9 });
  pdf.title(checklist.title);
  pdf.paragraph(checklist.intro);
  pdf.rule();

  pdf.heading("Checklist de verificação");
  checklist.steps.forEach((s, i) => pdf.checkbox(`${i + 1}. ${s.label}`, s.hint));

  pdf.heading("Quando parar e chamar o técnico");
  checklist.stopSigns.forEach((s) => pdf.bullet(s));

  pdf.heading("Limites deste checklist");
  checklist.limits.forEach((s) => pdf.bullet(s));

  pdf.space(6);
  pdf.rule();
  pdf.paragraph(
    `Diagnóstico técnico em ${siteConfig.primaryCity} e região a partir de ${siteConfig.minPriceLabel}. ${siteConfig.pricingDisclaimer}`,
    { muted: true, size: 9 },
  );
  pdf.paragraph(`Conteúdo completo: ${absoluteUrl(checklist.path)}`, { muted: true, size: 9 });
  pdf.footer(`${siteConfig.brandName} · ${absoluteUrl(checklist.path)}`);

  return pdf.blob();
}

export async function downloadChecklistPdf(checklist: DiagnosticoChecklist): Promise<void> {
  const blob = await generateChecklistPdf(checklist);
  downloadBlob(blob, `checklist-${checklist.slug}.pdf`);
}

/** Mensagem de compartilhamento — aponta para a página, nunca para um arquivo solto. */
export function checklistShareMessage(checklist: DiagnosticoChecklist): string {
  return `Olá! Usei o checklist de diagnóstico rápido "${checklist.title.replace(/^Checklist de diagnóstico rápido — /, "")}" (${absoluteUrl(
    checklist.path,
  )}) e gostaria de continuar o diagnóstico com um técnico.`;
}
