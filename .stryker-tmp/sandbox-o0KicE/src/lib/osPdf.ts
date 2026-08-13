// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// PDF público da ordem de serviço (gerado no navegador, sob clique).
// Contém apenas o que o cliente já vê na consulta autenticada pelo
// celular: etapas com data/hora, sintomas informados, previsão e a
// relação de fotos enviadas no portal (links temporários).
// ─────────────────────────────────────────────────────────────
import { createPdf, downloadBlob } from "@/lib/pdfDoc";
import { siteConfig } from "@/lib/siteConfig";

export interface OsPdfEtapa {
  titulo: string;
  status?: string;
  em?: string;
  prazo?: string;
  nota?: string;
}

export interface OsPdfData {
  protocolo: string;
  status: string;
  equipamento?: string | null;
  marcaModelo?: string | null;
  modalidade?: string | null;
  sintomas?: string | null;
  previsao?: string | null;
  observacoes?: string | null;
  etapas: OsPdfEtapa[];
  fotos: string[];
  progresso: number;
}

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";

const rotuloStatus = (s?: string) =>
  s === "concluida" ? "Concluída" : s === "andamento" ? "Em andamento" : "Pendente";

/** Gera e baixa o PDF da OS. Lança erro em caso de falha na geração. */
export async function baixarPdfOs(data: OsPdfData): Promise<void> {
  const pdf = await createPdf();

  pdf.title(`Ordem de serviço ${data.protocolo}`);
  pdf.paragraph(
    `${siteConfig.brandName} — documento gerado pelo próprio cliente em ${fmt(new Date().toISOString())}.`,
    { muted: true },
  );
  pdf.rule();

  pdf.heading("Resumo");
  pdf.keyValue("Protocolo", data.protocolo);
  pdf.keyValue("Situação", data.status);
  pdf.keyValue("Progresso", `${data.progresso}%`);
  pdf.keyValue(
    "Equipamento",
    [data.equipamento, data.marcaModelo].filter(Boolean).join(" · ") || "—",
  );
  pdf.keyValue("Modalidade", data.modalidade || "—");
  pdf.keyValue("Previsão de conclusão", data.previsao ? fmt(data.previsao) : "Sem previsão registrada");

  pdf.heading("Sintomas informados");
  pdf.paragraph(data.sintomas || "Nenhum sintoma registrado na abertura.");

  pdf.heading("Linha do tempo");
  if (data.etapas.length === 0) {
    pdf.paragraph("Nenhuma etapa registrada até o momento.");
  } else {
    for (const etapa of data.etapas) {
      const quando = etapa.em ? fmt(etapa.em) : etapa.prazo ? `Prazo: ${etapa.prazo}` : "Aguardando";
      pdf.bullet(
        `${etapa.titulo} — ${rotuloStatus(etapa.status)}`,
        `${quando}${etapa.nota ? ` · ${etapa.nota}` : ""}`,
      );
    }
  }

  if (data.observacoes) {
    pdf.heading("Observações do atendimento");
    pdf.paragraph(data.observacoes);
  }

  pdf.heading("Fotos enviadas no portal");
  if (data.fotos.length === 0) {
    pdf.paragraph("Nenhuma foto anexada.");
  } else {
    pdf.paragraph(
      `${data.fotos.length} foto(s) anexada(s). Os links abaixo são temporários e expiram por segurança — se estiverem vencidos, consulte novamente pelo celular.`,
      { muted: true },
    );
    data.fotos.forEach((url, i) => pdf.bullet(`Foto ${i + 1}`, url));
  }

  pdf.space(8);
  pdf.rule();
  pdf.paragraph(
    "Documento informativo. Valores, peças e prazos seguem o que foi apresentado e aprovado no atendimento.",
    { muted: true, size: 9 },
  );
  pdf.footer(`${siteConfig.brandName} · ${siteConfig.baseUrl}`);

  downloadBlob(pdf.blob(), `ordem-de-servico-${data.protocolo}.pdf`);
}
