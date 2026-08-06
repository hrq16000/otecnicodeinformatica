// Ordem de serviço de montagem gerada a partir dos dados do mini-wizard.
// Documento de registro (abertura de atendimento) — não fecha valor
// nem promessa de desempenho. Gerado no navegador sob clique.
import { createPdf, downloadBlob } from "@/lib/pdfDoc";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import { PECAS_DO_CLIENTE, TESTES_MONTAGEM } from "@/lib/politicaMontagem";

export interface MontagemOsData {
  protocolo: string;
  modelo: string;
  uso: string;
  origemPecas: string;
  pecas?: string;
  identificacaoPecas?: string;
  enviaFotos?: boolean;
  cidade?: string;
  modalidade?: string;
  janela?: string;
  consentimentoLgpd?: boolean;
}

export const MONTAGEM_OS_PATH = "/servicos/montagem-de-pc";

export function gerarProtocoloMontagem(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `OS-MTG-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`;
}

export async function generateMontagemOsPdf(data: MontagemOsData): Promise<Blob> {
  const pdf = await createPdf();

  pdf.paragraph(siteConfig.brandName.toUpperCase(), { muted: true, size: 9 });
  pdf.title("Ordem de serviço — montagem e configuração de computador");
  pdf.paragraph(
    "Registro de abertura do atendimento com os dados informados pelo cliente. Serve como comprovante do que foi solicitado; a verificação de compatibilidade e a conferência física das peças acontecem antes de qualquer execução.",
  );
  pdf.rule();

  pdf.heading("Identificação");
  pdf.keyValue("Protocolo", data.protocolo);
  pdf.keyValue("Data de abertura", new Date().toLocaleDateString("pt-BR"));
  if (data.cidade) pdf.keyValue("Cidade/bairro", data.cidade);
  if (data.modalidade) pdf.keyValue("Modalidade preferida", data.modalidade);
  if (data.janela) pdf.keyValue("Janela preferida de atendimento", data.janela);

  pdf.heading("Solicitação");
  pdf.keyValue("Configuração pretendida", data.modelo || "—");
  pdf.keyValue("Uso pretendido", data.uso || "—");
  pdf.keyValue("Origem das peças", data.origemPecas || "—");
  if (data.pecas) pdf.keyValue("Peças informadas", data.pecas);
  if (data.identificacaoPecas) pdf.keyValue("Identificação (série/nota)", data.identificacaoPecas);
  pdf.keyValue("Fotos das peças", data.enviaFotos ? "Serão enviadas pelo atendimento" : "Não informado");

  pdf.heading("Peças fornecidas pelo cliente");
  PECAS_DO_CLIENTE.forEach((p) => pdf.bullet(p));

  pdf.heading("Verificações previstas antes da entrega");
  TESTES_MONTAGEM.forEach((t) => pdf.checkbox(t));

  if (data.consentimentoLgpd) {
    pdf.heading("Consentimento de dados (LGPD)");
    pdf.paragraph(
      "O cliente autorizou o uso dos dados desta solicitação e das fotos enviadas no atendimento exclusivamente para triagem, orçamento e execução deste serviço. Os registros ficam no histórico da conversa e nesta ordem de serviço; o site não armazena arquivos. A exclusão pode ser solicitada a qualquer momento pelo próprio atendimento.",
      { size: 9 },
    );
  }

  pdf.space(6);
  pdf.rule();
  pdf.paragraph(
    `Condições completas, garantia e política de peças do cliente em ${absoluteUrl("/precos-e-politicas")} e ${absoluteUrl("/politica-de-pecas-do-cliente")}. ${siteConfig.pricingDisclaimer}`,
    { muted: true, size: 9 },
  );
  pdf.footer(`${siteConfig.brandName} · ${absoluteUrl(MONTAGEM_OS_PATH)}`);

  return pdf.blob();
}

export async function downloadMontagemOsPdf(data: MontagemOsData): Promise<void> {
  const blob = await generateMontagemOsPdf(data);
  downloadBlob(blob, `${data.protocolo.toLowerCase()}.pdf`);
}
