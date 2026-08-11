// ─────────────────────────────────────────────────────────────
// FONTE ÚNICA DE VERDADE — marca, domínio, SEO e contato.
// Nenhum domínio/telefone deve ser hardcoded fora daqui.
// Regra do WhatsApp: o número só pode existir em deep links (wa.me)
// e no campo `telephone` do JSON-LD. Nunca como texto visível no DOM.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // Marca
  siteName: "Técnico em Curitiba",
  brandName: "Técnico em Curitiba",
  legalName: "Técnico em Curitiba — Assistência Técnica em Informática",

  // Identidade operacional. Razão social, CNPJ e e-mail NÃO são publicados
  // em nenhum lugar do site (nem no DOM, nem em JSON-LD).
  foundedYear: "1998",

  // Domínio (sem www)
  domain: "tecnico.curitiba.br",
  baseUrl: "https://tecnico.curitiba.br",
  get canonicalUrl() {
    return this.baseUrl;
  },

  // SEO base (marca institucional — usado como fallback/schema em outras páginas)
  defaultTitle:
    "Técnico em Curitiba | Notebook, PC e Suporte de TI",
  defaultDescription:
    "Técnico em Curitiba para notebook, PC, formatação, upgrade SSD/RAM, backup, recuperação de dados, redes e suporte empresarial. Diagnóstico honesto via WhatsApp.",
  // SEO da home (marca + conversão + roteamento — não disputa a intenção da landing local)
  homeTitle:
    "Técnico em Curitiba | Assistência Técnica e Suporte Local",
  homeDescription:
    "Assistência técnica em Curitiba com diagnóstico honesto: atendimento a domicílio, remoto ou com coleta. Escolha o serviço e continue pelo WhatsApp.",
  defaultOgImage: "https://tecnico.curitiba.br/og-image.png",

  // Contato — número NUNCA exibido como texto; só em wa.me / JSON-LD.
  whatsappNumber: "5541997086380",
  phoneE164: "+5541997086380",

  // Localização / negócio
  primaryCity: "Curitiba",
  region: "PR",
  country: "BR",
  businessType: ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  geo: { lat: -25.4284, lng: -49.2733 },
  serviceArea: [
    "Curitiba",
    "São José dos Pinhais",
    "Pinhais",
    "Colombo",
    "Araucária",
    "Campo Largo",
    "Região Metropolitana de Curitiba",
  ],

  // Presença externa
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=T%C3%A9cnico+em+Curitiba",
  ],

  // Interlink de ecossistema — controlado, contextual, NUNCA em massa.
  ecosystemLinks: [] as Array<{ label: string; url: string }>,

  // Política comercial (real — não inventar valores fechados)
  minPriceLabel: "R$ 99,99",
  pricingDisclaimer:
    "O valor final pode variar conforme equipamento, urgência, deslocamento, complexidade, peças e condição real do problema.",
} as const;

/** Monta URL absoluta canônica a partir de um path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.baseUrl}${clean === "/" ? "/" : clean.replace(/\/$/, "")}`;
}

/** Deep link WhatsApp (será interceptado pelo funil global). */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export default siteConfig;
