// RODADA 5C/5D — espelho de build do conteúdo serviço × cidade.
// Lê as MESMAS fontes usadas em runtime (src/lib/servicoCuritibaBlocos.json e
// src/lib/servicoSjpBlocos.json), evitando divergência entre o HTML estático
// e o app React.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const read = (rel) => JSON.parse(readFileSync(resolve(here, rel), "utf8"));

const raw = read("../../src/lib/servicoCuritibaBlocos.json");
const rawSjp = read("../../src/lib/servicoSjpBlocos.json");

export const SERVICO_CURITIBA_PAGINAS = raw.paginas;
export const SERVICO_SJP_PAGINAS = rawSjp.paginas;

/** Cidade → (slug de serviço → conteúdo local). */
export const SERVICO_CIDADE_PAGINAS = {
  curitiba: raw.paginas,
  "sao-jose-dos-pinhais": rawSjp.paginas,
};

/** Todas as páginas serviço × cidade com conteúdo autoral declarado. */
export const TODAS_PAGINAS_LOCAIS = [
  ...Object.values(raw.paginas),
  ...Object.values(rawSjp.paginas),
];

export function servicoCuritibaPorPath(path) {
  return TODAS_PAGINAS_LOCAIS.find((p) => p.path === path) ?? null;
}

/** Conteúdo local pelo par (serviço, cidade). */
export function servicoLocal(servicoSlug, cidadeSlug) {
  return SERVICO_CIDADE_PAGINAS[cidadeSlug]?.[servicoSlug] ?? null;
}

export const SERVICO_CURITIBA_PATHS = Object.values(raw.paginas).map((p) => p.path);
export const SERVICO_SJP_PATHS = Object.values(rawSjp.paginas).map((p) => p.path);
