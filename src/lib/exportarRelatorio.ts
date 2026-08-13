/** Exportação de relatórios dos painéis internos em CSV/JSON. */

const baixar = (conteudo: string, tipo: string, nome: string) => {
  const url = URL.createObjectURL(new Blob([conteudo], { type: `${tipo};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const celula = (v: unknown) => {
  const t = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",;\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

export function paraCsv(linhas: Array<Record<string, unknown>>): string {
  if (!linhas.length) return "";
  const colunas = [...new Set(linhas.flatMap((l) => Object.keys(l)))];
  return [colunas.join(";"), ...linhas.map((l) => colunas.map((c) => celula(l[c])).join(";"))].join("\n");
}

export function exportarCsv(nome: string, linhas: Array<Record<string, unknown>>): void {
  baixar(`\ufeff${paraCsv(linhas)}\n`, "text/csv", `${nome}-${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportarJson(nome: string, dados: unknown): void {
  baixar(
    `${JSON.stringify(dados, null, 2)}\n`,
    "application/json",
    `${nome}-${new Date().toISOString().slice(0, 10)}.json`,
  );
}
