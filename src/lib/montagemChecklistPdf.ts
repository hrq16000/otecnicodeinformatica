// Checklist final de entrega para montagem de desktop/PC Gamer.
// Gerado no navegador sob clique (jsPDF sob demanda). Sem promessa de desempenho.
import { createPdf, downloadBlob } from "@/lib/pdfDoc";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import {
  REGRA_BIOS,
  TESTES_MONTAGEM,
  GARANTIA_MONTAGEM,
  PECAS_DO_CLIENTE,
} from "@/lib/politicaMontagem";

export const MONTAGEM_CHECKLIST_PATH = "/servicos/montagem-de-pc";

export async function generateMontagemChecklistPdf(): Promise<Blob> {
  const pdf = await createPdf();

  pdf.paragraph(siteConfig.brandName.toUpperCase(), { muted: true, size: 9 });
  pdf.title("Checklist final de entrega — montagem de desktop e PC Gamer");
  pdf.paragraph(
    "Lista do que é conferido antes da entrega do equipamento montado. Este documento registra verificações executadas; não contém estimativa de quadros por segundo, percentual de ganho nem promessa de desempenho.",
  );
  pdf.rule();

  pdf.heading("Testes executados antes da entrega");
  TESTES_MONTAGEM.forEach((t) => pdf.checkbox(t));

  pdf.heading("BIOS/UEFI, firmware e drivers");
  REGRA_BIOS.forEach((r) => pdf.bullet(r));

  pdf.heading("Peças fornecidas pelo cliente");
  PECAS_DO_CLIENTE.forEach((p) => pdf.bullet(p));

  pdf.heading("Garantia delimitada");
  GARANTIA_MONTAGEM.forEach((g) => pdf.bullet(g.titulo, g.desc));

  pdf.space(6);
  pdf.rule();
  pdf.paragraph(
    `Atendimento em ${siteConfig.primaryCity} e região a partir de ${siteConfig.minPriceLabel}. ${siteConfig.pricingDisclaimer}`,
    { muted: true, size: 9 },
  );
  pdf.paragraph(`Conteúdo completo: ${absoluteUrl(MONTAGEM_CHECKLIST_PATH)}`, { muted: true, size: 9 });
  pdf.footer(`${siteConfig.brandName} · ${absoluteUrl(MONTAGEM_CHECKLIST_PATH)}`);

  return pdf.blob();
}

export async function downloadMontagemChecklistPdf(): Promise<void> {
  const blob = await generateMontagemChecklistPdf();
  downloadBlob(blob, "checklist-final-montagem-pc.pdf");
}
