/**
 * RODADA 6 — EXPORTAÇÃO DE RELATÓRIOS (CSV / PDF)
 * -----------------------------------------------
 * Utilitários puros para transformar tabelas do painel em arquivo.
 *   • CSV: separador vírgula, BOM UTF-8 (abre certo no Excel pt-BR).
 *   • PDF: HTML imprimível aberto em nova janela → "Salvar como PDF".
 *     Não adiciona dependência de bundle (FASE 60 — performance).
 *
 * Nenhum campo pessoal entra aqui: o painel só entrega agregados.
 */

export type LinhaRelatorio = Record<string, string | number>;

export type Relatorio = {
  titulo: string;
  periodo: string;
  colunas: string[];
  linhas: LinhaRelatorio[];
  observacao?: string;
};

const escaparCsv = (v: string | number) => `"${String(v ?? "").replace(/"/g, '""')}"`;

/** Serializa um relatório em CSV (com cabeçalho). */
export function relatorioParaCsv(rel: Relatorio): string {
  const head = rel.colunas.map(escaparCsv).join(",");
  const body = rel.linhas.map((l) => rel.colunas.map((c) => escaparCsv(l[c] ?? "")).join(","));
  return [head, ...body].join("\n");
}

const escaparHtml = (v: string | number) =>
  String(v ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);

/** Documento HTML imprimível de um ou mais relatórios (base do PDF). */
export function relatoriosParaHtml(relatorios: Relatorio[], subtitulo = ""): string {
  const blocos = relatorios
    .map(
      (rel) => `
    <section>
      <h2>${escaparHtml(rel.titulo)}</h2>
      <p class="meta">Período: ${escaparHtml(rel.periodo)}</p>
      ${
        rel.linhas.length === 0
          ? "<p class='vazio'>Sem dados no período.</p>"
          : `<table>
        <thead><tr>${rel.colunas.map((c) => `<th>${escaparHtml(c)}</th>`).join("")}</tr></thead>
        <tbody>${rel.linhas
          .map((l) => `<tr>${rel.colunas.map((c) => `<td>${escaparHtml(l[c] ?? "")}</td>`).join("")}</tr>`)
          .join("")}</tbody>
      </table>`
      }
      ${rel.observacao ? `<p class="meta">${escaparHtml(rel.observacao)}</p>` : ""}
    </section>`,
    )
    .join("\n");

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" />
<title>Relatório de conversão</title>
<style>
  body{font-family:system-ui,Arial,sans-serif;margin:24px;color:#111}
  h1{font-size:20px;margin:0 0 4px}
  h2{font-size:15px;margin:24px 0 6px}
  .meta{font-size:11px;color:#555;margin:2px 0}
  .vazio{font-size:12px;color:#666}
  table{width:100%;border-collapse:collapse;font-size:11px}
  th,td{border:1px solid #ddd;padding:4px 6px;text-align:left}
  th{background:#f3f4f6}
  @media print{@page{size:A4 landscape;margin:12mm}}
</style></head>
<body>
  <h1>O Técnico de Informática — relatórios de conversão</h1>
  <p class="meta">${escaparHtml(subtitulo)}</p>
  <p class="meta">Gerado em ${new Date().toLocaleString("pt-BR")} · tráfego de QA excluído · sem dados pessoais</p>
  ${blocos}
</body></html>`;
}

/** Dispara o download de um CSV no navegador. */
export function baixarCsv(rel: Relatorio, nomeArquivo: string) {
  const blob = new Blob(["\uFEFF" + relatorioParaCsv(rel)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo.endsWith(".csv") ? nomeArquivo : `${nomeArquivo}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Abre a versão imprimível (PDF via diálogo de impressão do navegador). */
export function imprimirPdf(relatorios: Relatorio[], subtitulo = "") {
  const html = relatoriosParaHtml(relatorios, subtitulo);
  const win = window.open("", "_blank", "noopener,noreferrer,width=1100,height=800");
  if (!win) return false;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 400);
  return true;
}
