// RODADA 1 — ISOLAMENTO CRÍTICO DO REMIX
// Fonte única de verdade de domínio/marca para TODOS os scripts de build e SEO.
// Nada aqui pode ter fallback para o domínio da marca de origem: sem env
// configurada, o remix fica "fail-closed" (sem domínio, sem indexação).

import { readFileSync, existsSync } from "node:fs";

// Fonte única: process.env + .env do projeto (node não carrega .env sozinho,
// diferente do bun/vite — sem isso os gates e o prerender divergiam).
const fileEnv = {};
for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    if (key in fileEnv) continue;
    fileEnv[key] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}
const env = { ...fileEnv, ...process.env };

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

/** Horários de atendimento (mesmo formato de src/lib/config/contact.ts). */
const DAY_NAMES = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };
const DAY_ORDER = Object.keys(DAY_NAMES);
// Fail-closed comercial: sem VITE_BUSINESS_HOURS confirmada não há horário.
export const DEFAULT_BUSINESS_HOURS = "";
export const BUSINESS_HOURS_SPEC = clean(env.VITE_BUSINESS_HOURS) || DEFAULT_BUSINESS_HOURS;
export function parseBusinessHours(spec) {
  const out = [];
  for (const part of String(spec).split(";")) {
    const m = part.trim().match(/^([A-Za-z,\-]+)\s+(\d{2}:\d{2})-(\d{2}:\d{2})$/);
    if (!m) continue;
    const days = [];
    for (const token of m[1].split(",")) {
      const range = token.split("-");
      if (range.length === 2) {
        const from = DAY_ORDER.indexOf(range[0]);
        const to = DAY_ORDER.indexOf(range[1]);
        if (from < 0 || to < 0 || to < from) continue;
        for (let i = from; i <= to; i += 1) days.push(DAY_NAMES[DAY_ORDER[i]]);
      } else if (DAY_NAMES[token]) days.push(DAY_NAMES[token]);
    }
    if (days.length) out.push({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: m[2], closes: m[3] });
  }
  return out;
}
export const OPENING_HOURS = parseBusinessHours(BUSINESS_HOURS_SPEC);

/** GA4 / Google Ads da nova operação (vazio = telemetria externa desligada). */
export const GA4_ID = clean(env.VITE_GA4_ID);
export const GOOGLE_ADS_ID = clean(env.VITE_GOOGLE_ADS_ID);
export const GOOGLE_ADS_CONVERSION_LABEL = clean(env.VITE_GOOGLE_ADS_CONVERSION_LABEL);

/** Publisher AdSense da operação atual (vazio = anúncios desligados). */
export const ADSENSE_PUBLISHER_ID = clean(env.ADSENSE_PUBLISHER_ID);

/** Identificadores herdados que NUNCA podem reaparecer em artefato publicado. */
export const LEGACY_TOKENS = [
  "tecnico.curitiba.br",
  "tecnicocuritiba.com.br",
  // Número da marca de ORIGEM. O número canônico atual (definido em
  // VITE_WHATSAPP_NUMBER e cobrado por check:canonical-contact) não entra
  // nesta lista — ele precisa aparecer em wa.me e no telephone do JSON-LD.
  "5541997452053",
  "G-B9VPHCZC10",
  "AW-17892118207",
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
