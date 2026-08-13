/**
 * ============================================================================
 * GATE — MALHA DE LINKS INTERNOS SEMÂNTICA (Rodada 4K)
 * ============================================================================
 * Objetivo: garantir que cada página de serviço indexável aponte para as
 * páginas mais relevantes da sua vizinhança semântica (não para uma lista
 * genérica) e que os pares declarados sejam recíprocos.
 *
 * Regras verificadas no HTML SERVIDO (dist/<rota>/index.html):
 *  1. toda página de serviço curada linka ≥ 3 outras URLs curadas;
 *  2. toda página de serviço linka pelo menos 1 destino do seu próprio par
 *     semântico declarado abaixo (vizinhança de intenção);
 *  3. pares recíprocos declarados linkam nos dois sentidos;
 *  4. nenhuma página de serviço curada aponta para rota noindex consolidada
 *     (/servicos/manutencao-tv, /servicos/conserto-celular, /cftv).
 *
 * Uso: node scripts/check-malha-interna.mjs [dist]
 */
// @ts-nocheck

import { readFileSync, existsSync } from "node:fs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const DIST = process.argv[2] ?? "dist";

/** Vizinhança semântica mínima por serviço (intenção adjacente real). */
const VIZINHANCA = {
  "/servicos/formatacao": ["/servicos/remocao-de-virus", "/servicos/upgrade-ssd-ram", "/problemas/computador-lento"],
  "/servicos/manutencao-de-notebook": ["/problemas/notebook-nao-liga", "/servicos/upgrade-ssd-ram", "/servicos/conserto-placa"],
  "/servicos/manutencao-de-computador": ["/problemas/computador-lento", "/servicos/formatacao", "/servicos/upgrade-ssd-ram"],
  "/servicos/montagem-de-pc": ["/servicos/pc-gamer", "/servicos/upgrade-ssd-ram"],
  "/servicos/pc-gamer": ["/servicos/montagem-de-pc", "/servicos/manutencao-de-computador", "/servicos/upgrade-ssd-ram"],
  "/servicos/upgrade-ssd-ram": ["/servicos/recuperacao-de-dados", "/servicos/manutencao-de-computador"],
  "/servicos/remocao-de-virus": ["/servicos/formatacao", "/problemas/computador-lento"],
  "/servicos/recuperacao-de-dados": ["/servicos/upgrade-ssd-ram", "/servicos/backup-para-empresas"],
  "/servicos/redes-e-wifi": ["/servicos/suporte-tecnico-empresarial", "/empresa-de-ti-curitiba"],
  "/servicos/suporte-tecnico-empresarial": ["/empresa-de-ti-curitiba", "/servicos/manutencao-preventiva-empresas"],
  "/servicos/manutencao-preventiva-empresas": ["/servicos/suporte-tecnico-empresarial", "/servicos/backup-para-empresas"],
  "/servicos/backup-para-empresas": ["/servicos/recuperacao-de-dados", "/servicos/suporte-tecnico-empresarial"],
  "/servicos/suporte-home-office": ["/atendimento-remoto", "/servicos/redes-e-wifi"],
  "/servicos/conserto-tv": ["/servicos/conserto-placa", "/servicos/conserto-monitor"],
  "/servicos/conserto-placa": ["/servicos/conserto-tv", "/servicos/manutencao-de-notebook"],
  "/servicos/conserto-monitor": ["/servicos/conserto-tv", "/servicos/manutencao-de-computador"],
};

/** Pares que precisam linkar nos dois sentidos (anti-beco sem saída). */
const RECIPROCOS = [
  ["/servicos/montagem-de-pc", "/servicos/pc-gamer"],
  ["/servicos/conserto-tv", "/servicos/conserto-placa"],
  ["/servicos/conserto-monitor", "/servicos/conserto-tv"],
  ["/servicos/backup-para-empresas", "/servicos/recuperacao-de-dados"],
];

/** Rotas herdadas consolidadas: existem, mas são noindex e não recebem link de página curada. */
const CONSOLIDADAS_NOINDEX = ["/servicos/manutencao-tv", "/servicos/conserto-celular", "/cftv"];

const CURATED = new Set(CURATED_PATHS);

function htmlFor(path) {
  const file = path === "/" ? `${DIST}/index.html` : `${DIST}${path}/index.html`;
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function linksOf(html) {
  const out = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    out.add(m[1].replace(/\/$/, "") || "/");
  }
  return out;
}

const falhas = [];
const servicos = CURATED_PATHS.filter((p) => /^\/servicos\/[^/]+$/.test(p));
const mapa = new Map();

for (const path of servicos) {
  const html = htmlFor(path);
  if (!html) {
    falhas.push(`${path} → HTML estático ausente em ${DIST}`);
    continue;
  }
  const links = linksOf(html);
  mapa.set(path, links);

  const curados = [...links].filter((l) => l !== path && CURATED.has(l));
  if (curados.length < 3) {
    falhas.push(`${path} → só ${curados.length} link(s) para URLs curadas (mínimo 3)`);
  }

  const vizinhos = VIZINHANCA[path] ?? [];
  if (vizinhos.length && !vizinhos.some((v) => links.has(v))) {
    falhas.push(`${path} → nenhum link para a vizinhança semântica declarada (${vizinhos.join(", ")})`);
  }

  const proibidos = CONSOLIDADAS_NOINDEX.filter((c) => links.has(c));
  if (proibidos.length) {
    falhas.push(`${path} → aponta para rota consolidada noindex: ${proibidos.join(", ")}`);
  }
}

for (const [a, b] of RECIPROCOS) {
  const la = mapa.get(a);
  const lb = mapa.get(b);
  if (la && !la.has(b)) falhas.push(`reciprocidade quebrada: ${a} não linka ${b}`);
  if (lb && !lb.has(a)) falhas.push(`reciprocidade quebrada: ${b} não linka ${a}`);
}

if (falhas.length) {
  console.error(`\n❌ [malha-interna] ${falhas.length} falha(s):`);
  falhas.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

console.log(
  `✅ [malha-interna] ${servicos.length} páginas de serviço com vizinhança semântica, mínimo de 3 links curados e pares recíprocos.`,
);
