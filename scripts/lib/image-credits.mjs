/**
 * Espelho MJS de src/lib/imageCredits.ts — usado pelo prerender e pelos gates.
 * Mantenha os dois arquivos em sincronia (o gate check:image-credits valida
 * o resultado no HTML gerado).
 */

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
    provider: "O Técnico de Informática",
    license: "Acervo próprio — uso autorizado",
    licenseUrl: "https://tecnico.curitiba.br/termos-e-condicoes",
  },
};

export const CREDIT_PREFIX = "Foto:";

/** Hosts externos aceitos — qualquer outro reprova o gate de licenças. */
export const ALLOWED_REMOTE_HOSTS = [
  LICENSE_SOURCES.unsplash.host,
  LICENSE_SOURCES.pexels.host,
];

export function unsplashPhotoId(url) {
  const m = String(url).match(/photo-([0-9a-zA-Z-]+)/);
  return m ? m[0] : null;
}

export function creditFor(src) {
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
    creditText: "Foto: acervo O Técnico de Informática",
    license: s.license,
    licenseUrl: s.licenseUrl,
    sourceUrl: "https://tecnico.curitiba.br/sobre",
    provider: s.provider,
  };
}

export function imageObjectSchema({ url, caption, pageUrl, width = 1200, height = 630 }) {
  const c = creditFor(url);
  return {
    "@type": "ImageObject",
    "@id": `${pageUrl}#image`,
    contentUrl: url,
    url,
    caption,
    description: caption,
    representativeOfPage: true,
    width: String(width),
    height: String(height),
    creditText: c.creditText,
    license: c.licenseUrl,
    acquireLicensePage: c.sourceUrl,
    copyrightNotice: c.creditText,
    creator: { "@type": "Organization", name: c.provider, url: c.sourceUrl },
  };
}
