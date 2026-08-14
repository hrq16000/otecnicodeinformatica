// RODADA 5C — espelho de build do conteúdo serviço × Curitiba.
// Lê a MESMA fonte usada em runtime (src/lib/servicoCuritibaBlocos.json),
// evitando divergência entre o HTML estático e o app React.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(resolve(here, "../../src/lib/servicoCuritibaBlocos.json"), "utf8"));

export const SERVICO_CURITIBA_PAGINAS = raw.paginas;

export function servicoCuritibaPorPath(path) {
  return Object.values(raw.paginas).find((p) => p.path === path) ?? null;
}

export const SERVICO_CURITIBA_PATHS = Object.values(raw.paginas).map((p) => p.path);
