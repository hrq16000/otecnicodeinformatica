// ─────────────────────────────────────────────────────────────
// FONTE ÚNICA DE VERDADE — marca, domínio, SEO e contato.
//
// RODADA 1 — ISOLAMENTO DO REMIX
// Todos os dados de identidade agora vêm de variáveis de ambiente
// (`VITE_*`). NÃO existe fallback para a marca de origem
// (domínio e WhatsApp da marca de origem). Quando um dado não está
// configurado o sistema falha de forma segura: omite o dado,
// desabilita o canal ou emite URL relativa — nunca reaproveita o
// valor herdado.
//
// Regra do WhatsApp: o número só pode existir em deep links (wa.me)
// e no campo `telephone` do JSON-LD. Nunca como texto visível no DOM.
// ─────────────────────────────────────────────────────────────

const env = import.meta.env as unknown as Record<string, string | undefined>;

const str = (v: string | undefined): string | undefined => {
  const t = typeof v === "string" ? v.trim() : "";
  return t.length > 0 ? t : undefined;
};

// ── Marca ────────────────────────────────────────────────────
export const BRAND_NAME = str(env.VITE_BRAND_NAME) ?? "O Técnico de Informática";
export const BRAND_SHORT_NAME = str(env.VITE_BRAND_SHORT_NAME) ?? BRAND_NAME;
export const BRAND_LEGAL_NAME =
  str(env.VITE_BRAND_LEGAL_NAME) ?? `${BRAND_NAME} — Assistência Técnica em Informática`;

/**
 * Ano de fundação. NÃO tem valor padrão: o histórico da empresa de
 * origem ("desde 1998") não é transferível. Enquanto não houver dado
 * verdadeiro da nova marca, o campo fica indefinido e não é renderizado.
 */
export const BRAND_FOUNDED_YEAR = str(env.VITE_BRAND_FOUNDED_YEAR);

// ── Domínio ──────────────────────────────────────────────────
/** Domínio público (sem protocolo, sem www). Vazio = ambiente sem domínio definido. */
export const SITE_DOMAIN = str(env.VITE_SITE_DOMAIN);
export const SITE_CONFIGURED = Boolean(SITE_DOMAIN);
/** URL base absoluta. Quando não configurada, retorna "" → URLs relativas (nunca o domínio antigo). */
export const SITE_BASE_URL = SITE_DOMAIN ? `https://${SITE_DOMAIN}` : "";

// ── Contato (WhatsApp) ───────────────────────────────────────
const waRaw = str(env.VITE_WHATSAPP_NUMBER);
/** true somente quando há um número válido da NOVA marca configurado. */
export const WHATSAPP_CONFIGURED = Boolean(waRaw && /^\d{12,15}$/.test(waRaw));
/** Número em formato wa.me. Vazio quando não configurado — jamais o número herdado. */
export const WHATSAPP_NUMBER = WHATSAPP_CONFIGURED ? (waRaw as string) : "";
/** Telefone E.164 para JSON-LD. `undefined` some do schema ao serializar. */
export const WHATSAPP_PHONE_E164 = WHATSAPP_CONFIGURED ? `+${waRaw}` : undefined;
/** Destino seguro quando o canal não está configurado (não envia lead a lugar nenhum). */
export const CONTACT_FALLBACK_URL = "/funil-indisponivel";

// ── Geo / área de atendimento ────────────────────────────────
export const PRIMARY_CITY = str(env.VITE_PRIMARY_CITY) ?? "Curitiba";
export const REGION_UF = str(env.VITE_REGION_UF) ?? "PR";
const geoLat = Number(env.VITE_GEO_LAT);
const geoLng = Number(env.VITE_GEO_LNG);
export const GEO_COORDS =
  Number.isFinite(geoLat) && Number.isFinite(geoLng) ? { lat: geoLat, lng: geoLng } : undefined;

const SERVICE_AREA = (str(env.VITE_SERVICE_AREA) ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SAME_AS = (str(env.VITE_SAME_AS) ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// ── Imagens institucionais ───────────────────────────────────
export const BRAND_LOGO_PATH = str(env.VITE_BRAND_LOGO) ?? "/logo.webp";
export const BRAND_OG_PATH = str(env.VITE_BRAND_OG_IMAGE) ?? "/og-image.png";

export const siteConfig = {
  // Marca
  siteName: BRAND_NAME,
  brandName: BRAND_NAME,
  shortName: BRAND_SHORT_NAME,
  legalName: BRAND_LEGAL_NAME,

  /** Pode ser `undefined` — nunca renderizar sem checar. */
  foundedYear: BRAND_FOUNDED_YEAR,

  // Domínio
  domain: SITE_DOMAIN ?? "",
  baseUrl: SITE_BASE_URL,
  isConfigured: SITE_CONFIGURED,
  get canonicalUrl() {
    return this.baseUrl;
  },

  // SEO base — derivado da marca ativa (conteúdo editorial é tratado em rodada própria)
  defaultTitle: `${BRAND_NAME} | Notebook, PC e Suporte de TI`,
  defaultDescription:
    "Assistência técnica em informática: notebook, PC, formatação, upgrade SSD/RAM, backup, recuperação de dados, redes e suporte empresarial. Diagnóstico honesto.",
  homeTitle: `${BRAND_NAME} | Assistência Técnica e Suporte`,
  homeDescription:
    "Assistência técnica em informática com diagnóstico honesto: atendimento a domicílio, remoto ou com coleta. Escolha o serviço e continue o atendimento.",
  defaultOgImage: SITE_BASE_URL ? `${SITE_BASE_URL}${BRAND_OG_PATH}` : BRAND_OG_PATH,

  // Contato — número NUNCA exibido como texto; só em wa.me / JSON-LD.
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappConfigured: WHATSAPP_CONFIGURED,
  phoneE164: WHATSAPP_PHONE_E164,

  // Localização / negócio
  primaryCity: PRIMARY_CITY,
  region: REGION_UF,
  country: "BR",
  businessType: ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  geo: GEO_COORDS,
  serviceArea: SERVICE_AREA,

  // Presença externa (só o que for comprovadamente da nova marca)
  sameAs: SAME_AS,

  // Interlink de ecossistema — controlado, contextual, NUNCA em massa.
  ecosystemLinks: [] as Array<{ label: string; url: string }>,

  // Política comercial (real — não inventar valores fechados)
  minPriceLabel: "R$ 99,99",
  pricingDisclaimer:
    "O valor final pode variar conforme equipamento, urgência, deslocamento, complexidade, peças e condição real do problema.",
};

/**
 * Monta URL absoluta canônica a partir de um path.
 * Sem domínio configurado devolve caminho RELATIVO — jamais o domínio herdado.
 */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const normalized = clean === "/" ? "/" : clean.replace(/\/$/, "");
  return `${siteConfig.baseUrl}${normalized}`;
}

/**
 * Deep link WhatsApp (será interceptado pelo funil global).
 * Sem número configurado retorna a rota de indisponibilidade —
 * fail-safe explícito, nunca o contato da marca de origem.
 */
export function whatsappLink(message?: string): string {
  if (!WHATSAPP_CONFIGURED) return CONTACT_FALLBACK_URL;
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export default siteConfig;
