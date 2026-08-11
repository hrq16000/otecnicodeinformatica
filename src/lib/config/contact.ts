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
 * Horários de atendimento. NÃO herdados: só entram nos schemas quando
 * a nova operação confirmar. Vazio = campo omitido (sem inventar).
 */
export const BUSINESS_HOURS: Array<{
  days: string[];
  opens: string;
  closes: string;
}> = [];

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
