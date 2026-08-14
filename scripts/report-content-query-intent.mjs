#!/usr/bin/env node
/**
 * RODADA 8F — CONSULTAS REAIS × INTENÇÃO DECLARADA
 * ------------------------------------------------
 * Compara o que o Search Console mostra (consultas que geraram
 * impressão) com a intenção que declaramos em `contentIntentMap`.
 *
 * Só relata o que existe. Sem consulta real, o veredito é
 * SEM_EVIDENCIA — nunca "intenção confirmada".
 *
 * Saída: reports/content-query-intent.json e .md
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "reports");
const BASE = process.env.SITE_BASE_URL || "https://otecnicodeinformatica.com.br";

const cohortSrc = readFileSync(path.join(ROOT, "src/lib/contentCohort.ts"), "utf8");
const COHORT = [...cohortSrc.matchAll(/url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)"/g)].map((m) => ({
  url: m[1],
  intent: m[2],
}));

/** Marcadores léxicos de intenção — usados só para classificar consultas reais. */
const MARCADORES = {
  commercial: ["preco", "preço", "quanto custa", "valor", "orcamento", "orçamento", "barato", "custo"],
  local_commercial: ["curitiba", "perto de mim", "proximo", "próximo", "sao jose dos pinhais", "são josé dos pinhais", "bairro"],
  informational: ["como", "o que e", "o que é", "passo a passo", "tutorial", "sem perder", "guia"],
  diagnostic: ["lento", "travando", "nao liga", "não liga", "erro", "tela azul", "problema", "por que"],
};

const classificar = (q) => {
  const s = q.toLowerCase();
  const achados = Object.entries(MARCADORES)
    .filter(([, ts]) => ts.some((t) => s.includes(t)))
    .map(([k]) => k);
  if (achados.includes("local_commercial") && achados.includes("commercial")) return "local_commercial";
  return achados[0] ?? "indefinida";
};

async function consultas() {
  if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) return null;
  try {
    const { resolveSite, searchAnalytics, dayOffset } = await import("./lib/gsc-client.mjs");
    const site = await resolveSite(BASE);
    const r = await searchAnalytics(site, {
      startDate: dayOffset(31),
      endDate: dayOffset(3),
      dimensions: ["page", "query"],
      rowLimit: 500,
    });
    return { site, rows: r?.rows ?? [] };
  } catch (e) {
    return { erro: String(e?.message ?? e) };
  }
}

const dados = await consultas();
const rows = dados?.rows ?? [];

const porUrl = COHORT.map((c) => {
  const alvo = `${BASE}${c.url}`;
  const minhas = rows.filter((r) => (r.keys?.[0] || "").replace(/\/+$/, "") === alvo);
  const impressoes = minhas.reduce((a, r) => a + (r.impressions || 0), 0);
  const cliques = minhas.reduce((a, r) => a + (r.clicks || 0), 0);
  const queries = minhas
    .map((r) => ({
      query: r.keys?.[1] ?? "",
      impressions: r.impressions || 0,
      clicks: r.clicks || 0,
      position: r.position ?? null,
      intencaoObservada: classificar(r.keys?.[1] ?? ""),
    }))
    .sort((a, b) => b.impressions - a.impressions);

  const alinhadas = queries.filter((q) => q.intencaoObservada === c.intent).length;
  const veredito =
    !dados || dados.erro
      ? "SEM_EVIDENCIA"
      : queries.length === 0
        ? "SEM_EVIDENCIA"
        : alinhadas / queries.length >= 0.6
          ? "INTENCAO_CONFIRMADA"
          : "DIVERGENCIA_DE_INTENCAO";

  return { ...c, impressoes, cliques, queries, alinhadas, veredito };
});

const resumo = {
  geradoEm: new Date().toISOString(),
  fonte: dados ? (dados.erro ? `indisponível (${dados.erro})` : "search-console") : "não conectado nesta execução",
  urls: porUrl.length,
  comConsulta: porUrl.filter((u) => u.queries.length > 0).length,
  semEvidencia: porUrl.filter((u) => u.veredito === "SEM_EVIDENCIA").length,
};

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "content-query-intent.json"), JSON.stringify({ resumo, urls: porUrl }, null, 2));

const md = [
  "# Consultas reais × intenção declarada — Rodada 8F",
  "",
  `Fonte: ${resumo.fonte}. URLs com pelo menos uma consulta real: **${resumo.comConsulta}/${resumo.urls}**.`,
  "",
  ...porUrl.flatMap((u) => [
    `## \`${u.url}\``,
    `Intenção declarada: **${u.intent}** · veredito: **${u.veredito}** · ${u.impressoes} impressões, ${u.cliques} cliques.`,
    "",
    u.queries.length
      ? [
          "| Consulta | Impressões | Cliques | Posição | Intenção observada |",
          "| --- | --: | --: | --: | --- |",
          ...u.queries
            .slice(0, 20)
            .map(
              (q) =>
                `| ${q.query} | ${q.impressions} | ${q.clicks} | ${q.position ? q.position.toFixed(1) : "—"} | ${q.intencaoObservada} |`,
            ),
        ].join("\n")
      : "Nenhuma consulta registrada no período. Sem consulta não há divergência de intenção a corrigir — o gargalo é descoberta.",
    "",
  ]),
].join("\n");

writeFileSync(path.join(OUT, "content-query-intent.md"), md);

console.log("── report:content-query-intent ──");
console.log(`  fonte: ${resumo.fonte}`);
console.log(`  URLs com consulta real: ${resumo.comConsulta}/${resumo.urls}`);
console.log("  → reports/content-query-intent.md");
