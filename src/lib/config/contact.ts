// ── CONTATO ──────────────────────────────────────────────────
// FONTE ÚNICA do WhatsApp. Nenhum componente pode conter número literal.
// FAIL CLOSED: sem número da nova operação configurado, todo CTA cai em
// /funil-indisponivel — jamais existe fallback para o número da marca de origem.
import { envStr } from "./env";

const raw = envStr("VITE_WHATSAPP_NUMBER");
const valid = Boolean(raw && /^\d{12,15}$/.test(raw));

/** Número em formato wa.me (somente dígitos). Vazio = canal desligado. */
export const WHATSAPP_NUMBER = valid ? (raw as string) : "";
export const WHATSAPP_CONFIGURED = valid;
/** E.164 para JSON-LD. `undefined` some do schema ao serializar. */
export const WHATSAPP_PHONE_E164 = valid ? `+${raw}` : undefined;
/** Rota neutra quando o canal não está configurado. */
export const CONTACT_FALLBACK_URL = "/funil-indisponivel";

/**
 * Exibição do número. Política da marca: o número NUNCA é texto visível
 * no DOM — só existe em deep links wa.me e no JSON-LD.
 */
export const WHATSAPP_DISPLAY: string | undefined = undefined;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e preciso de atendimento técnico em informática.";

/**
 * Horários de atendimento publicados nos schemas (Organization/LocalBusiness).
 * Formato do env `VITE_BUSINESS_HOURS` (padrão schema.org, abreviações EN):
 *   "Mo-Fr 08:00-18:00; Sa 09:00-13:00"
 *
 * FAIL-CLOSED COMERCIAL (Rodada 2A, item 25): NÃO existe horário padrão. O
 * horário da marca de origem nunca serve de fallback. Sem env confirmada,
 * nada é renderizado e nenhum openingHoursSpecification/hoursAvailable é
 * emitido.
 */
export const DEFAULT_BUSINESS_HOURS = "";

const DAY_NAMES: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};
const DAY_ORDER = Object.keys(DAY_NAMES);

export interface BusinessHourSpec {
  days: string[];
  opens: string;
  closes: string;
}

/** Converte "Mo-Fr 08:00-18:00; Sa 09:00-13:00" em specs de schema.org. */
export function parseBusinessHours(spec: string): BusinessHourSpec[] {
  const out: BusinessHourSpec[] = [];
  for (const part of spec.split(";")) {
    const m = part.trim().match(/^([A-Za-z,\-]+)\s+(\d{2}:\d{2})-(\d{2}:\d{2})$/);
    if (!m) continue;
    const days: string[] = [];
    for (const token of m[1].split(",")) {
      const range = token.split("-");
      if (range.length === 2) {
        const from = DAY_ORDER.indexOf(range[0]);
        const to = DAY_ORDER.indexOf(range[1]);
        if (from < 0 || to < 0 || to < from) continue;
        for (let i = from; i <= to; i += 1) days.push(DAY_NAMES[DAY_ORDER[i]]);
      } else if (DAY_NAMES[token]) {
        days.push(DAY_NAMES[token]);
      }
    }
    if (days.length) out.push({ days, opens: m[2], closes: m[3] });
  }
  return out;
}

export const BUSINESS_HOURS_SPEC = envStr("VITE_BUSINESS_HOURS") || DEFAULT_BUSINESS_HOURS;
/** true só quando existe horário confirmado por env. */
export const BUSINESS_HOURS_CONFIGURED = BUSINESS_HOURS_SPEC.trim().length > 0;
export const BUSINESS_HOURS: BusinessHourSpec[] = parseBusinessHours(BUSINESS_HOURS_SPEC);


export const contactConfig = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappConfigured: WHATSAPP_CONFIGURED,
  whatsappDisplay: WHATSAPP_DISPLAY,
  phoneE164: WHATSAPP_PHONE_E164,
  defaultWhatsappMessage: DEFAULT_WHATSAPP_MESSAGE,
  businessHours: BUSINESS_HOURS,
  fallbackUrl: CONTACT_FALLBACK_URL,
} as const;

/** Deep link do WhatsApp (interceptado pelo funil global). */
export function whatsappLink(message?: string): string {
  if (!WHATSAPP_CONFIGURED) return CONTACT_FALLBACK_URL;
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = message ?? DEFAULT_WHATSAPP_MESSAGE;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export default contactConfig;
