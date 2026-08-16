#!/usr/bin/env node
/**
 * GATE FAIL-CLOSED — galeria de atendimentos reais por bairro.
 *
 * Regra: só entra na galeria fotografia PRÓPRIA do atendimento, autorizada e
 * com arquivo presente no repositório. Nada de IA, nada de banco de imagens
 * apresentado como atendimento próprio, nada declarado sem arquivo.
 *
 * Manifesto vazio é estado VÁLIDO (fail-closed: a seção simplesmente não
 * renderiza). O gate derruba o build apenas quando algo é declarado errado.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { BAIRROS_ANCORA } from "./lib/local-index-policy.mjs";

const manifesto = JSON.parse(readFileSync("config/galeria-atendimentos-bairro.json", "utf8"));
const itens = manifesto.itens ?? [];
const ancoras = new Set(BAIRROS_ANCORA);
const erros = [];

const OBRIGATORIOS = ["bairroSlug", "src", "alt", "legenda", "data", "autorizacao", "width", "height"];
const AUTORIZACOES = new Set(["cliente", "equipamento-proprio"]);

itens.forEach((item, i) => {
  const id = `item #${i + 1} (${item.src ?? "sem src"})`;
  for (const campo of OBRIGATORIOS) {
    if (item[campo] === undefined || item[campo] === "") erros.push(`${id}: campo obrigatório ausente — ${campo}`);
  }
  if (item.bairroSlug && !ancoras.has(item.bairroSlug)) {
    erros.push(`${id}: bairroSlug "${item.bairroSlug}" não é bairro âncora indexável`);
  }
  if (item.src && !item.src.startsWith("/atendimentos/")) {
    erros.push(`${id}: src deve ficar em /atendimentos/ (foto própria)`);
  }
  if (item.src) {
    const arquivo = path.join("public", item.src.replace(/^\//, ""));
    if (!existsSync(arquivo)) erros.push(`${id}: arquivo ausente em ${arquivo}`);
    else if (statSync(arquivo).size < 10_000) erros.push(`${id}: arquivo suspeito (< 10 KB)`);
  }
  if (item.alt && item.alt.trim().length < 20) erros.push(`${id}: alt curto demais (mínimo 20 caracteres)`);
  if (item.data && !/^\d{4}-\d{2}$/.test(item.data)) erros.push(`${id}: data deve ser AAAA-MM`);
  if (item.autorizacao && !AUTORIZACOES.has(item.autorizacao)) {
    erros.push(`${id}: autorizacao inválida (${item.autorizacao})`);
  }
  if (/(^|[^a-z])(ia|ai|midjourney|dall-?e|stable-?diffusion|generated)([^a-z]|$)/i.test(item.src ?? "")) {
    erros.push(`${id}: nome de arquivo sugere imagem gerada — proibido`);
  }
});

const porBairro = itens.reduce((acc, i) => ((acc[i.bairroSlug] = (acc[i.bairroSlug] ?? 0) + 1), acc), {});

if (erros.length) {
  console.error(`✗ [bairros-galeria] ${erros.length} problema(s):`);
  for (const e of erros) console.error(`   ${e}`);
  process.exit(1);
}

console.log(
  itens.length === 0
    ? "✓ [bairros-galeria] manifesto vazio (fail-closed): nenhuma galeria renderizada, nenhuma foto inventada."
    : `✓ [bairros-galeria] ${itens.length} foto(s) real(is) validada(s) em ${Object.keys(porBairro).length} bairro(s).`,
);
