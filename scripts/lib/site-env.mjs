// RODADA 1 — ISOLAMENTO CRÍTICO DO REMIX
// Fonte única de verdade de domínio/marca para TODOS os scripts de build e SEO.
// Nada aqui pode ter fallback para o domínio da marca de origem: sem env
// configurada, o remix fica "fail-closed" (sem domínio, sem indexação).

const env = process.env;

const clean = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");

/** Domínio da NOVA marca (ex.: otecnicodeinformatica.com.br). Vazio = não configurado. */
export const SITE_DOMAIN = clean(env.VITE_SITE_DOMAIN);
export const SITE_CONFIGURED = Boolean(SITE_DOMAIN);
export const BASE_URL = SITE_CONFIGURED ? `https://${SITE_DOMAIN}` : "";

/** Indexação só é liberada com domínio próprio E flag explícita. */
export const INDEXING_ENABLED =
  SITE_CONFIGURED && clean(env.VITE_SITE_INDEXING_ENABLED).toLowerCase() === "true";

export const BRAND_NAME = clean(env.VITE_BRAND_NAME) || "O Técnico de Informática";

/** WhatsApp da nova operação. Vazio = funil não pode apontar para lugar nenhum. */
const wa = clean(env.VITE_WHATSAPP_NUMBER);
export const WHATSAPP_NUMBER = /^\d{12,15}$/.test(wa) ? wa : "";
export const WHATSAPP_CONFIGURED = Boolean(WHATSAPP_NUMBER);

/** Identificadores herdados que NUNCA podem reaparecer em artefato publicado. */
export const LEGACY_TOKENS = [
  "tecnico.curitiba.br",
  "tecnicocuritiba.com.br",
  "5541997086380",
  "G-B9VPHCZC10",
  "AW-17892118207",
  "ca-pub-3762170279587706",
  "hisepaayuwxjrnumbqeq",
];

export function requireSite(scriptName) {
  if (!SITE_CONFIGURED) {
    console.error(
      `[${scriptName}] VITE_SITE_DOMAIN não configurado — script abortado (fail-closed do remix).`,
    );
    process.exit(1);
  }
}
