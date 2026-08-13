#!/usr/bin/env node
/**
 * ONDA 31 — consolida os relatórios dos gates de qualidade num único JSON
 * público, para que os painéis internos possam exportar CSV/JSON e acompanhar
 * pendências por página.
 *
 * Fontes: reports/image-integrity.json, reports/imageobject-jsonld.json,
 *         reports/cross-cluster-similarity.json, reports/photo-review.json.
 * Saída:  public/gates-report.json (+ dist/gates-report.json quando existir).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ler = (f) => {
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
};

const imagem = ler("reports/image-integrity.json");
const imageObject = ler("reports/imageobject-jsonld.json");
const similaridade = ler("reports/cross-cluster-similarity.json");
const fotos = ler("reports/photo-review.json");

const linhas = [];

for (const p of imagem?.semFotoReal ?? [])
  linhas.push({ gate: "imagem", severidade: "pendencia", pagina: p, detalhe: "página indexável sem foto real" });
for (const p of imagem?.semImagem ?? [])
  linhas.push({ gate: "imagem", severidade: "bloqueio", pagina: p, detalhe: "página sem nenhuma imagem" });
for (const e of imagem?.erros ?? [])
  linhas.push({ gate: "imagem", severidade: "bloqueio", pagina: e.pagina ?? "-", detalhe: e.motivo ?? String(e) });

for (const e of imageObject?.erros ?? imageObject?.pendencias ?? [])
  linhas.push({
    gate: "imageobject",
    severidade: "bloqueio",
    pagina: e.rota ?? e.pagina ?? "-",
    detalhe: e.motivo ?? String(e),
  });
for (const r of imageObject?.rotas ?? [])
  if (r.ok === false)
    linhas.push({ gate: "imageobject", severidade: "bloqueio", pagina: r.rota ?? r.path, detalhe: r.motivo ?? "ImageObject ausente" });

for (const par of similaridade?.pares ?? [])
  if ((par.score ?? 0) >= 0.5)
    linhas.push({
      gate: "similaridade",
      severidade: (par.score ?? 0) >= 0.62 ? "bloqueio" : "aviso",
      pagina: `${par.a} × ${par.b}`,
      detalhe: `Jaccard ${Number(par.score).toFixed(3)}`,
      score: par.score,
    });

for (const f of fotos?.fotos ?? [])
  if (f.exifSuspeito)
    linhas.push({ gate: "imagem", severidade: "bloqueio", pagina: f.slug, detalhe: "EXIF com assinatura de IA" });

const relatorio = {
  generatedAt: new Date().toISOString(),
  resumo: {
    total: linhas.length,
    bloqueios: linhas.filter((l) => l.severidade === "bloqueio").length,
    avisos: linhas.filter((l) => l.severidade === "aviso").length,
    pendencias: linhas.filter((l) => l.severidade === "pendencia").length,
    fontesAusentes: [
      ["image-integrity", imagem],
      ["imageobject-jsonld", imageObject],
      ["cross-cluster-similarity", similaridade],
      ["photo-review", fotos],
    ]
      .filter(([, v]) => !v)
      .map(([k]) => k),
  },
  linhas,
};

const body = `${JSON.stringify(relatorio, null, 2)}\n`;
mkdirSync("public", { recursive: true });
writeFileSync("public/gates-report.json", body);
if (existsSync("dist")) writeFileSync("dist/gates-report.json", body);

console.log(
  `gates-report: ${relatorio.resumo.total} item(ns) — ${relatorio.resumo.bloqueios} bloqueio(s), ` +
    `${relatorio.resumo.avisos} aviso(s), ${relatorio.resumo.pendencias} pendência(s).`,
);
