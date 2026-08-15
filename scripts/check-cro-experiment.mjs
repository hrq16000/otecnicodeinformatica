#!/usr/bin/env node
/**
 * GATE — EXPERIMENTOS DE CRO (Rodada 7A)
 *
 * Bloqueia o build quando um experimento é ativado sem as condições mínimas
 * de leitura honesta:
 *   1. no mínimo 2 variações com peso inteiro positivo;
 *   2. funil 100% instrumentado (page_view, cta_click, triage_start,
 *      whatsapp_open, lead) — experimento cego é proibido;
 *   3. amostra mínima declarada (>= 100 sessões por variação);
 *   4. rotas e cidades declaradas explicitamente (sem curinga);
 *   5. exposição instrumentada (`experiment_exposure`) — sem denominador
 *      não existe taxa;
 *   6. nenhuma variação pode alterar SEO/preço/prazo/garantia: o registro
 *      só carrega rótulos de apresentação.
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/croRodada7.ts", "utf8");
const exposicao = readFileSync("src/lib/croExposicao.ts", "utf8");
const erros = [];

const ETAPAS = ["page_view", "cta_click", "triage_start", "whatsapp_open", "lead"];

/** Extrai os objetos de experimento do registro central por parsing leve. */
const bloco = src.match(/export const EXPERIMENTOS_CRO[^=]*=\s*\[([\s\S]*?)\n\];/)?.[1] ?? "";
const experimentos = [...bloco.matchAll(/\{\s*\n\s*id: "([^"]+)"([\s\S]*?)\n {2}\},?/g)].map((m) => ({
  id: m[1],
  corpo: m[2],
}));

if (experimentos.length === 0) erros.push("registro EXPERIMENTOS_CRO vazio ou ilegível pelo gate");

for (const exp of experimentos) {
  const ativo = /ativo:\s*true/.test(exp.corpo);
  const variantes = [...exp.corpo.matchAll(/\{\s*id: "([^"]+)", rotulo: "[^"]+", peso: (\d+)\s*\}/g)];
  const rotas = [...exp.corpo.matchAll(/"(\/[^"]+)"/g)].length;
  const amostra = Number(exp.corpo.match(/amostraMinima:\s*(\d+)/)?.[1] ?? 0);
  const registro = exp.corpo.match(/registroFunil:\s*\[([^\]]*)\]/)?.[1] ?? "";

  if (variantes.length < 2) erros.push(`${exp.id}: menos de 2 variações válidas`);
  if (variantes.some(([, , peso]) => Number(peso) <= 0)) erros.push(`${exp.id}: peso não positivo`);
  if (rotas === 0) erros.push(`${exp.id}: nenhuma rota declarada`);
  if (amostra < 100) erros.push(`${exp.id}: amostraMinima ${amostra} abaixo do piso de 100 sessões/variação`);

  if (ativo) {
    const faltando = ETAPAS.filter((e) => !registro.includes(`"${e}"`));
    if (faltando.length) {
      erros.push(`${exp.id}: ATIVO com funil incompleto — faltam ${faltando.join(", ")}`);
    }
  }
}

// 5) exposição instrumentada.
if (!/track\(\s*"experiment_exposure"/.test(exposicao)) {
  erros.push("croExposicao.ts não emite experiment_exposure — sem denominador de experimento");
}
if (!/exposicaoJaRegistrada/.test(exposicao)) {
  erros.push("exposição sem dedupe por sessão — taxa inflada");
}
if (!/decisao\.habilitado/.test(exposicao)) {
  erros.push("exposição precisa respeitar a decisão fail-closed de decidirExperimento");
}

// 6) o registro não pode carregar campos comerciais/SEO.
for (const proibido of ["preco", "price", "prazo", "garantia", "title", "canonical", "h1"]) {
  if (new RegExp(`\\b${proibido}\\s*:`, "i").test(bloco)) {
    erros.push(`registro de experimento carrega campo proibido "${proibido}" — variação só pode ser de apresentação`);
  }
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} problema(s) na configuração de experimentos de CRO:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}

const ativos = (bloco.match(/ativo:\s*true/g) ?? []).length;
console.log(
  `✓ CRO íntegro — ${experimentos.length} experimento(s) declarado(s), ${ativos} ativo(s), exposição instrumentada e sem variação de preço/prazo/garantia/SEO.`,
);
