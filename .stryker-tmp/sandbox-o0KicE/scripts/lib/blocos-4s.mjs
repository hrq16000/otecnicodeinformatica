// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// ESPELHO DE BUILD — ONDA 4S (serviço × bairro).
// Lê a mesma fonte única do runtime (src/lib/servicoBairroBlocos4s.json),
// garantindo HTML estático idêntico ao que o React hidrata.
// ─────────────────────────────────────────────────────────────
import { readFileSync } from "node:fs";
import { join } from "node:path";

const raw = JSON.parse(
  readFileSync(join(process.cwd(), "src/lib/servicoBairroBlocos4s.json"), "utf8"),
);

export const BLOCOS_4S = raw.blocos;

/** Paths `/servicos/<servico>/<bairro>` com conteúdo próprio da onda 4S. */
export const BLOCOS_4S_PATHS = Object.keys(BLOCOS_4S).map((k) => `/servicos/${k}`);

/** Blocos autorais de um path serviço × bairro (ou null). */
export function blocos4s(path) {
  const m = path.match(/^\/servicos\/([^/]+)\/([^/]+)$/);
  if (!m) return null;
  return BLOCOS_4S[`${m[1]}/${m[2]}`] ?? null;
}
