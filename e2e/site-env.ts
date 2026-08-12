import { existsSync, readFileSync } from "node:fs";

/**
 * Fonte única de domínio/marca para a suíte E2E (Rodada 3).
 *
 * As specs traziam `https://tecnico.curitiba.br` fixo — domínio da marca de
 * origem. Isso deixava os testes verdes contra o alvo errado (ou vermelhos
 * contra o alvo certo). Aqui a origem é sempre a env do remix, com o mesmo
 * comportamento fail-closed dos gates: sem `VITE_SITE_DOMAIN`, sem domínio.
 */
function readEnv(key: string): string {
  if (process.env[key]) return String(process.env[key]).trim();
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && m[1] === key) return m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return "";
}

export const SITE_DOMAIN = readEnv("VITE_SITE_DOMAIN");
export const SITE_URL = SITE_DOMAIN ? `https://${SITE_DOMAIN}` : "";
export const WHATSAPP_NUMBER = readEnv("VITE_WHATSAPP_NUMBER");
