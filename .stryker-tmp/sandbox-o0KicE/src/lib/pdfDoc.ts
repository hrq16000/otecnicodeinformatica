// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// Utilitário de geração de PDF no navegador (jsPDF carregado sob
// demanda — nada entra no bundle inicial). Uso interno e sob clique.
// ─────────────────────────────────────────────────────────────
import type { jsPDF } from "jspdf";

const MARGIN = 44;
const PAGE_W = 595.28; // A4 pt
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;

export interface PdfWriter {
  doc: jsPDF;
  title: (text: string) => void;
  heading: (text: string) => void;
  paragraph: (text: string, opts?: { muted?: boolean; size?: number }) => void;
  bullet: (text: string, sub?: string) => void;
  checkbox: (text: string, sub?: string) => void;
  keyValue: (label: string, value: string) => void;
  rule: () => void;
  space: (n?: number) => void;
  footer: (text: string) => void;
  blob: () => Blob;
}

export async function createPdf(): Promise<PdfWriter> {
  const { jsPDF: JsPDF } = await import("jspdf");
  const doc = new JsPDF({ unit: "pt", format: "a4" });
  let y = MARGIN;

  const ensure = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN - 24) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const write = (text: string, size: number, style: "normal" | "bold", indent = 0, color: [number, number, number] = [30, 34, 40]) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, CONTENT_W - indent) as string[];
    for (const line of lines) {
      ensure(size + 5);
      doc.text(line, MARGIN + indent, y);
      y += size + 5;
    }
  };

  return {
    doc,
    title: (text) => {
      write(text, 18, "bold");
      y += 4;
    },
    heading: (text) => {
      y += 10;
      ensure(28);
      write(text, 12.5, "bold", 0, [10, 110, 130]);
      y += 2;
    },
    paragraph: (text, opts) =>
      write(text, opts?.size ?? 10, "normal", 0, opts?.muted ? [110, 118, 128] : [30, 34, 40]),
    bullet: (text, sub) => {
      write(`•  ${text}`, 10, "bold", 4);
      if (sub) write(sub, 9.5, "normal", 18, [95, 103, 112]);
      y += 2;
    },
    checkbox: (text, sub) => {
      ensure(20);
      doc.setDrawColor(120, 130, 140);
      doc.rect(MARGIN, y - 8.5, 10, 10);
      write(text, 10, "bold", 18);
      if (sub) write(sub, 9.5, "normal", 18, [95, 103, 112]);
      y += 3;
    },
    keyValue: (label, value) => {
      write(`${label}: ${value}`, 10, "normal", 0);
    },
    rule: () => {
      ensure(14);
      doc.setDrawColor(215, 220, 226);
      doc.line(MARGIN, y, PAGE_W - MARGIN, y);
      y += 12;
    },
    space: (n = 8) => {
      y += n;
    },
    footer: (text) => {
      const total = doc.getNumberOfPages();
      for (let p = 1; p <= total; p++) {
        doc.setPage(p);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(140, 148, 156);
        doc.text(`${text}  ·  ${p}/${total}`, MARGIN, PAGE_H - 26);
      }
    },
    blob: () => doc.output("blob") as Blob,
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
