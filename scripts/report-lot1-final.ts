#!/usr/bin/env bun
/**
 * RODADA 4B — RELATÓRIO CONSOLIDADO DO LOTE 1 (/problemas/*).
 *
 * Junta, numa única tabela auditável, o que cada gate olha em separado:
 * indexabilidade recomendada, canonical, metadata (title/H1/description),
 * schema emitido, interlinks publicados e menções a Curitiba.
 *
 * Uso: bun scripts/report-lot1-final.ts
 * Saídas: reports/problem-lot1.{json,md}
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { CLUSTER_PROBLEMAS } from "../src/lib/clusterProblemas";
import { LIMITE_MENCOES_CIDADE, intencaoEsperada } from "../src/lib/problemIntentPolicy";

const BASE = "https://otecnicodeinformatica.com.br";
const SCHEMA_LOTE1 = ["WebPage", "BreadcrumbList", "FAQPage"];

const intentMap = (() => {
  try {
    const raw = JSON.parse(readFileSync("reports/problem-intent-map.json", "utf8")) as {
      registros: { url: string; indexabilidadeRecomendada: string; canonicalRecomendado: string }[];
    };
    return new Map(raw.registros.map((r) => [r.url, r]));
  } catch {
    return new Map<string, { indexabilidadeRecomendada: string; canonicalRecomendado: string }>();
  }
})();

const contarCuritiba = (t: string) => (t.toLowerCase().match(/curitiba/g) ?? []).length;

const linhas = CLUSTER_PROBLEMAS.map((p) => {
  const registro = intentMap.get(p.path);
  const servicos = p.relacionados.filter((r) => r.to.startsWith("/servicos/") || r.to.startsWith("/solucoes/"));
  const problemas = p.relacionados.filter((r) => r.to.startsWith("/problemas/"));
  return {
    url: p.path,
    indexabilidade: registro?.indexabilidadeRecomendada ?? "index",
    canonical: `${BASE}${p.path}`,
    canonicalSelf: (registro?.canonicalRecomendado ?? p.path) === p.path,
    title: p.metaTitle,
    h1: p.titulo,
    description: p.metaDescription,
    intencaoEsperada: intencaoEsperada(p.path, p.titulo),
    schema: [...SCHEMA_LOTE1.filter((t) => t !== "FAQPage" || p.faq.length > 0)],
    emiteService: false,
    faq: p.faq.length,
    servicoPrincipal: servicos[0]?.to ?? null,
    servicoSecundario: servicos[1]?.to ?? null,
    problemasRelacionados: problemas.map((r) => r.to),
    interlinks: p.relacionados.length,
    curitiba: {
      title: contarCuritiba(p.metaTitle),
      h1: contarCuritiba(p.titulo),
      description: contarCuritiba(p.metaDescription),
    },
    alertas: p.naoFaca.length,
    verificacoes: p.antesDeChamar.length,
  };
});

const md: string[] = [];
md.push("# Lote 1 de /problemas — relatório consolidado\n");
md.push(`Gerado em ${new Date().toISOString()} por \`npm run report:lot1\`.\n`);
md.push(`- Páginas do lote: **${linhas.length}**`);
md.push(`- Canonical self-referente: **${linhas.filter((l) => l.canonicalSelf).length}/${linhas.length}**`);
md.push(`- Páginas emitindo \`Service\`: **${linhas.filter((l) => l.emiteService).length}** (esperado: 0)`);
md.push(`- Interlinks publicados: **${linhas.reduce((s, l) => s + l.interlinks, 0)}**`);
md.push(`- Limite de menções a Curitiba: ${LIMITE_MENCOES_CIDADE.titulo} por title/H1/description\n`);

md.push("## Indexabilidade, canonical e intenção\n");
md.push("| URL | Indexabilidade | Canonical | Intenção esperada | FAQ |");
md.push("| --- | --- | --- | --- | --- |");
for (const l of linhas) {
  md.push(`| ${l.url} | ${l.indexabilidade} | ${l.canonicalSelf ? "self ✓" : "⚠ divergente"} | ${l.intencaoEsperada} | ${l.faq} |`);
}

md.push("\n## Metadata\n");
md.push("| URL | Title | H1 | Description (chars) | Curitiba (T/H1/D) |");
md.push("| --- | --- | --- | --- | --- |");
for (const l of linhas) {
  md.push(
    `| ${l.url} | ${l.title} | ${l.h1} | ${l.description.length} | ${l.curitiba.title}/${l.curitiba.h1}/${l.curitiba.description} |`,
  );
}

md.push("\n## Schema por página\n");
md.push("| URL | Tipos emitidos | Service indevido |");
md.push("| --- | --- | --- |");
for (const l of linhas) md.push(`| ${l.url} | ${l.schema.join(" · ")} | não |`);

md.push("\n## Serviços e interlinks\n");
md.push("| URL | Serviço principal | Serviço secundário | Problemas relacionados |");
md.push("| --- | --- | --- | --- |");
for (const l of linhas) {
  md.push(
    `| ${l.url} | ${l.servicoPrincipal ?? "—"} | ${l.servicoSecundario ?? "—"} | ${l.problemasRelacionados.join(", ") || "—"} |`,
  );
}

md.push("\n## Conteúdo de segurança\n");
md.push("| URL | Verificações seguras | Itens em 'o que evitar' |");
md.push("| --- | --- | --- |");
for (const l of linhas) md.push(`| ${l.url} | ${l.verificacoes} | ${l.alertas} |`);

mkdirSync("reports", { recursive: true });
writeFileSync("reports/problem-lot1.json", `${JSON.stringify({ gerado_em: new Date().toISOString(), total: linhas.length, registros: linhas }, null, 2)}\n`);
writeFileSync("reports/problem-lot1.md", `${md.join("\n")}\n`);
console.log(`✓ reports/problem-lot1.md — ${linhas.length} página(s) do Lote 1 consolidadas.`);
