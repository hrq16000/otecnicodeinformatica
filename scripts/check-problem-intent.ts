#!/usr/bin/env bun
/**
 * GATE — intenção invertida em /problemas/*.
 *
 * Falha o CI quando uma página do LOTE INDEXÁVEL sinaliza intenção LOCAL (ou
 * qualquer outra) onde a política exige DIAGNÓSTICA/INFORMATIVA/COMERCIAL:
 *
 *   • slug terminando em "-curitiba" numa página de sintoma indexável;
 *   • intenção observada ≠ intenção esperada;
 *   • excesso de menções à cidade em title/h1/description (Fase 11).
 *
 * Páginas herdadas fora do sitemap geram AVISO, não erro: são dívida conhecida
 * a ser reescrita ou consolidada por lote, e travar o CI por elas só impediria
 * o trabalho de sair. `--strict` promove os avisos a erro.
 *
 * Regra é a de src/lib/problemIntentPolicy.ts — este script não tem regra própria.
 *
 * Uso: bun scripts/check-problem-intent.ts [--strict]
 */
import { problemaPagesData } from "../src/lib/problemIntentSources";
import { avaliarIntencao, type DesvioIntencao } from "../src/lib/problemIntentPolicy";

const STRICT = process.argv.includes("--strict");

const entradas = problemaPagesData();
const desvios: DesvioIntencao[] = entradas.flatMap((e) => avaliarIntencao(e));

const erros = desvios.filter((d) => d.severidade === "erro" || STRICT);
const avisos = desvios.filter((d) => d.severidade === "aviso" && !STRICT);

const agrupar = (lista: DesvioIntencao[]) => {
  const mapa = new Map<string, number>();
  for (const d of lista) mapa.set(d.regra, (mapa.get(d.regra) ?? 0) + 1);
  return [...mapa].map(([k, v]) => `${k}=${v}`).join(" · ") || "nenhum";
};

const indexaveis = entradas.filter((e) => e.indexavel).length;

if (avisos.length) {
  console.log(`⚠ ${avisos.length} desvio(s) em páginas fora do sitemap (${agrupar(avisos)}).`);
  console.log("   Dívida editorial conhecida — resolvida por lote, não bloqueia o build.");
}

if (erros.length) {
  console.error(
    `\n✖ BLOQUEADO: ${erros.length} desvio(s) de intenção em página${STRICT ? "" : " indexável"} (${agrupar(erros)}):`,
  );
  for (const d of erros.slice(0, 40)) {
    console.error(`  · ${d.url} [${d.regra}] ${d.detalhe}`);
  }
  if (erros.length > 40) console.error(`  … +${erros.length - 40}`);
  console.error("\n  Política: src/lib/problemIntentPolicy.ts");
  console.error("  Página de sintoma tem intenção DIAGNÓSTICA. Localidade vive no CTA e no");
  console.error("  serviço relacionado — nunca no slug nem repetida no title/h1.");
  process.exit(1);
}

console.log(
  `✓ Intenção coerente em ${entradas.length} página(s) de problema (${indexaveis} indexável(is)).`,
);
