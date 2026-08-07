#!/usr/bin/env node
/**
 * GATE DA RODADA 3Y — expansão premium multieletrônicos.
 *
 * Escopo autorizado: /servicos/conserto-tv, /servicos/conserto-placa e
 * /servicos/conserto-monitor (única rota de monitor — sem variação por marca,
 * sintoma ou "monitor gamer").
 * O gate falha se:
 *   1. uma das duas rotas sair do manifesto curado (deixar de ser indexável);
 *   2. o conteúdo editorial ficar abaixo do mínimo (TV 1200 / Placa 900 palavras);
 *   3. surgir nova arquitetura de hub (/eletronicos/*) ou rota própria para
 *      áudio/som, ou uma segunda rota de monitor, que a auditoria manteve
 *      fora do escopo;
 *   4. faltar bloco de aceite/recusa, garantia ou coleta nas duas páginas.
 *
 * Uso: node scripts/check-multielectronics-wave-3y.mjs
 */
import { readFileSync } from "node:fs";
import { SERVICOS } from "./lib/curated-urls.mjs";
import { servicoBlocos } from "./lib/servico-blocos.mjs";
import { servicoFaqs } from "./lib/servico-faqs.mjs";

const WAVE = [
  { path: "/servicos/conserto-tv", minWords: 1200 },
  { path: "/servicos/conserto-placa", minWords: 900 },
  { path: "/servicos/conserto-monitor", minWords: 1200 },
];

const errors = [];
const curated = new Set(SERVICOS.map((s) => s.path));
const app = readFileSync("src/LegacyApp.tsx", "utf8");

/**
 * Rodada 4B (P0): rota curada no sitemap sem entrada em curated-routes-meta
 * não é prerenderizada — o Google recebe só o shell da SPA.
 * Toda rota desta onda precisa de title/description estáticos.
 */
const curatedMeta = JSON.parse(
  readFileSync("scripts/curated-routes-meta.mjs", "utf8").match(/\[[\s\S]*\]/)?.[0] ?? "[]",
);
const metaPaths = new Set(curatedMeta.map((m) => m.path));


for (const { path, minWords } of WAVE) {
  if (!curated.has(path)) errors.push(`${path}: fora do manifesto curado (não indexável)`);

  const slug = path.split("/").pop();
  if (!app.includes(`<ServicoCore slug="${slug}" />`)) {
    errors.push(`${path}: rota não usa o template curado ServicoCore`);
  }

  const blocos = servicoBlocos(path) ?? [];
  const faqs = servicoFaqs(path) ?? [];
  const texto = [
    ...blocos.flatMap((b) => [b.titulo, ...b.paragrafos]),
    ...faqs.flatMap((f) => [f.pergunta ?? f.question ?? "", f.resposta ?? f.answer ?? ""]),
  ].join(" ");
  const words = texto.split(/\s+/).filter(Boolean).length;
  if (words < minWords) errors.push(`${path}: ${words} palavras editoriais (mínimo ${minWords})`);

  const lower = texto.toLowerCase();
  for (const [label, re] of [
    ["aceite/recusa", /recus/],
    ["garantia", /garantia/],
    ["coleta", /coleta/],
    ["bancada", /bancada/],
  ]) {
    if (!re.test(lower)) errors.push(`${path}: bloco obrigatório ausente (${label})`);
  }
}

// Arquitetura: nenhum hub /eletronicos e nenhuma rota própria de monitor/áudio.
const FORBIDDEN_ROUTES = [
  /path="\/eletronicos/,
  /path="\/servicos\/conserto-audio/,
  /path="\/servicos\/conserto-som/,
  /path="\/servicos\/conserto-monitor-gamer/,
  /path="\/servicos\/monitor-/,
  /path="\/servicos\/caixa-de-som/,
];
for (const re of FORBIDDEN_ROUTES) {
  if (re.test(app)) errors.push(`arquitetura fora do escopo 3Y: ${re}`);
}
for (const { path } of SERVICOS) {
  if (/^\/eletronicos|conserto-audio|conserto-som/.test(path)) {
    errors.push(`rota fora do escopo 3Y no manifesto curado: ${path}`);
  }
}

if (errors.length) {
  console.error("✗ Rodada 3Y — gate reprovado:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ Rodada 3Y — ${WAVE.length} rotas multieletrônicos válidas (conteúdo, template e escopo).`);
