// ── DOMÍNIO ──────────────────────────────────────────────────
// Fonte única de domínio/URL. Nenhum arquivo pode conter domínio literal.
import { envStr, envFlag } from "./env";

/** Domínio oficial da nova marca (sem protocolo, sem www). */
export const DOMAIN = envStr("VITE_SITE_DOMAIN") ?? "otecnicodeinformatica.com.br";

export const BASE_URL = `https://${DOMAIN}`;
export const CANONICAL_BASE = BASE_URL;
export const ASSET_BASE = BASE_URL;

/** O site tem domínio próprio definido (sempre verdadeiro após a Rodada 2). */
export const SITE_CONFIGURED = true;

/**
 * TRAVA DE INDEXAÇÃO — permanece ligada enquanto houver conteúdo herdado.
 * Só destrava com VITE_SITE_INDEXING_ENABLED=true.
 */
export const INDEXING_ENABLED = envFlag("VITE_SITE_INDEXING_ENABLED");

export const domainConfig = {
  domain: DOMAIN,
  baseUrl: BASE_URL,
  canonicalBase: CANONICAL_BASE,
  assetBase: ASSET_BASE,
  indexingEnabled: INDEXING_ENABLED,
} as const;

/** URL absoluta a partir de um path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const normalized = clean === "/" ? "/" : clean.replace(/\/$/, "");
  return `${BASE_URL}${normalized}`;
}

export default domainConfig;
