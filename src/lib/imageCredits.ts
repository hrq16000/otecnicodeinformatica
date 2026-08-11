/**
 * ============================================================================
 * CRÉDITOS E LICENÇAS DE IMAGEM — FONTE ÚNICA
 * ============================================================================
 * Todas as fotos do portal são fotografias reais licenciadas (nunca geradas
 * por IA). Este módulo resolve, a partir da URL do arquivo, o crédito visível
 * e os campos de licença usados no schema.org ImageObject.
 *
 * Fontes permitidas:
 *  • images.unsplash.com — Licença Unsplash (uso comercial livre)
 *  • images.pexels.com   — Licença Pexels (uso comercial livre)
 *  • assets locais (/lovable-uploads, /images) — produção própria do estúdio
 *
 * O gate `npm run check:image-credits` falha o build quando alguma foto
 * pública aparece sem crédito visível ou fora de uma fonte licenciada.
 */

export interface ImageCredit {
  /** Texto curto exibido sob a figura e usado em creditText. */
  creditText: string;
  /** Nome da licença. */
  license: string;
  /** URL da licença (schema.org/license). */
  licenseUrl: string;
  /** Página de origem da foto (acquireLicensePage). */
  sourceUrl: string;
  /** Autor/provedor. */
  provider: string;
}

export const LICENSE_SOURCES = {
  unsplash: {
    host: "images.unsplash.com",
    provider: "Unsplash",
    license: "Licença Unsplash",
    licenseUrl: "https://unsplash.com/license",
  },
  pexels: {
    host: "images.pexels.com",
    provider: "Pexels",
    license: "Licença Pexels",
    licenseUrl: "https://www.pexels.com/license/",
  },
  own: {
    host: "",
    provider: "Técnico em Curitiba",
    license: "Acervo próprio — uso autorizado",
    licenseUrl: `${SITE_BASE_URL}/termos-e-condicoes`,
  },
} as const;

/** Extrai o ID da foto de uma URL do Unsplash (photo-1531482615713-2afd69097998). */
export function unsplashPhotoId(url: string): string | null {
  return url.match(/photo-([0-9a-zA-Z-]+)/)?.[0] ?? null;
}

/** Resolve o crédito de qualquer imagem usada no portal. */
export function creditFor(src: string | undefined | null): ImageCredit {
  const url = String(src ?? "");
  if (url.includes(LICENSE_SOURCES.unsplash.host)) {
    const id = unsplashPhotoId(url);
    const s = LICENSE_SOURCES.unsplash;
    return {
      creditText: "Foto: Unsplash (licença livre para uso comercial)",
      license: s.license,
      licenseUrl: s.licenseUrl,
      sourceUrl: id ? `https://unsplash.com/photos/${id}` : "https://unsplash.com",
      provider: s.provider,
    };
  }
  if (url.includes(LICENSE_SOURCES.pexels.host)) {
    const s = LICENSE_SOURCES.pexels;
    return {
      creditText: "Foto: Pexels (licença livre para uso comercial)",
      license: s.license,
      licenseUrl: s.licenseUrl,
      sourceUrl: "https://www.pexels.com",
      provider: s.provider,
    };
  }
  const s = LICENSE_SOURCES.own;
  return {
    creditText: "Foto: acervo Técnico em Curitiba",
    license: s.license,
    licenseUrl: s.licenseUrl,
    sourceUrl: `${SITE_BASE_URL}/sobre`,
    provider: s.provider,
  };
}

/** Prefixo procurado pelo gate de CI no HTML renderizado. */
export const CREDIT_PREFIX = "Foto:";

/** Monta o nó schema.org ImageObject com atribuição/licença. */
export function imageObjectSchema(params: {
  url: string;
  caption: string;
  pageUrl: string;
  width?: number;
  height?: number;
}) {
  const c = creditFor(params.url);
  return {
    "@type": "ImageObject",
    "@id": `${params.pageUrl}#image`,
    contentUrl: params.url,
    url: params.url,
    caption: params.caption,
    description: params.caption,
    representativeOfPage: true,
    width: String(params.width ?? 1200),
    height: String(params.height ?? 630),
    creditText: c.creditText,
    license: c.licenseUrl,
    acquireLicensePage: c.sourceUrl,
    copyrightNotice: c.creditText,
    creator: { "@type": "Organization", name: c.provider, url: c.sourceUrl },
  };
}
