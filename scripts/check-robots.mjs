#!/usr/bin/env node
/**
 * GATE — robots.txt e X-Robots-Tag coerentes com as rotas indexáveis.
 *
 * Valida no build final (dist/):
 *   • robots.txt existe e está sincronizado com o gerador (sem edição manual);
 *   • nenhuma rota curada/indexável cai em regra Disallow;
 *   • todas as áreas privadas continuam bloqueadas;
 *   • cada diretiva Sitemap aponta para um arquivo realmente publicado;
 *   • nenhum header X-Robots-Tag em dist/_headers aplica noindex a rota indexável.
 *
 * Uso: node scripts/check-robots.mjs [dist]
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { BASE_URL, INDEXING_ENABLED } from "./lib/site-env.mjs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";
import { buildRobots, ROTAS_PRIVADAS } from "./generate-robots.mjs";

const DIST = path.resolve(process.argv[2] || "dist");
const errors = [];

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const robotsFile = path.join(DIST, "robots.txt");
if (!existsSync(robotsFile)) {
  console.error("BLOQUEADO: dist/robots.txt ausente.");
  process.exit(1);
}
const robots = readFileSync(robotsFile, "utf8");

// 1. Sincronia com o gerador (robots.txt é artefato, não arquivo editável).
if (robots.trim() !== buildRobots().trim()) {
  errors.push("robots.txt divergente do gerador — rode `npm run generate:robots` e refaça o build.");
}

// 2. Regras do grupo genérico (User-agent: *).
const grupoGenerico = (() => {
  const linhas = robots.split("\n").map((l) => l.trim());
  const inicio = linhas.findIndex((l) => /^user-agent:\s*\*$/i.test(l));
  if (inicio === -1) return null;
  const regras = [];
  for (const linha of linhas.slice(inicio + 1)) {
    if (/^user-agent:/i.test(linha)) break;
    const m = linha.match(/^(allow|disallow):\s*(\S*)$/i);
    if (m) regras.push({ tipo: m[1].toLowerCase(), valor: m[2] });
  }
  return regras;
})();

if (!grupoGenerico) {
  errors.push('robots.txt sem grupo "User-agent: *".');
} else {
  const bloqueia = (rota) => {
    const casa = (padrao) => padrao && (rota === padrao || rota.startsWith(padrao));
    const disallow = grupoGenerico.filter((r) => r.tipo === "disallow" && casa(r.valor));
    if (disallow.length === 0) return false;
    const allow = grupoGenerico.filter((r) => r.tipo === "allow" && casa(r.valor));
    const maior = (lista) => Math.max(0, ...lista.map((r) => r.valor.length));
    return maior(disallow) > maior(allow);
  };

  if (INDEXING_ENABLED) {
    for (const rota of CURATED_PATHS) {
      if (bloqueia(rota)) errors.push(`rota indexável bloqueada no robots.txt: ${rota}`);
    }
  }
  for (const priv of ROTAS_PRIVADAS) {
    if (!grupoGenerico.some((r) => r.tipo === "disallow" && r.valor === priv)) {
      errors.push(`área privada sem Disallow no robots.txt: ${priv}`);
    }
  }
}

// 3. Diretivas Sitemap apontando para arquivos publicados no domínio correto.
const sitemaps = [...robots.matchAll(/^Sitemap:\s*(\S+)$/gim)].map((m) => m[1]);
if (INDEXING_ENABLED && sitemaps.length === 0) errors.push("robots.txt sem diretiva Sitemap.");
for (const url of sitemaps) {
  if (!url.startsWith(`${BASE_URL}/`)) {
    errors.push(`diretiva Sitemap fora do domínio canônico: ${url}`);
    continue;
  }
  const arquivo = path.join(DIST, url.slice(BASE_URL.length + 1));
  if (!existsSync(arquivo)) errors.push(`Sitemap declarado mas não publicado: ${url}`);
}

// 4. X-Robots-Tag em dist/_headers não pode aplicar noindex a rota indexável.
const headersFile = path.join(DIST, "_headers");
if (existsSync(headersFile) && INDEXING_ENABLED) {
  let escopoAtual = null;
  for (const linha of readFileSync(headersFile, "utf8").split("\n")) {
    if (/^\S/.test(linha) && linha.trim().startsWith("/")) {
      escopoAtual = linha.trim();
      continue;
    }
    const m = linha.match(/^\s+X-Robots-Tag:\s*(.+)$/i);
    if (!m || !/noindex/i.test(m[1])) continue;
    const padrao = (escopoAtual || "").replace(/\*$/, "");
    const atingidas = CURATED_PATHS.filter((r) => r === escopoAtual || (padrao && r.startsWith(padrao)));
    if (escopoAtual === "/*" || atingidas.length > 0) {
      errors.push(
        `X-Robots-Tag noindex em "${escopoAtual}" atinge ${escopoAtual === "/*" ? "todas as rotas" : `${atingidas.length} rota(s) indexável(is)`}`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error("BLOQUEADO — robots.txt / X-Robots-Tag inconsistentes:\n");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log(
  `OK — robots.txt coerente: ${CURATED_PATHS.length} rota(s) indexável(is) liberada(s), ${ROTAS_PRIVADAS.length} área(s) privada(s) bloqueada(s), ${sitemaps.length} sitemap(s) publicado(s).`,
);
