/**
 * ONDA 30 — mapa rota → fotografia real licenciada.
 *
 * Fonte única: src/lib/fotosLicenciadas.ts (manifesto gerado) e o campo
 * `foto:` declarado em src/lib/clusterProblemas.ts. Nada de imagem de IA:
 * o manifesto só recebe fotografia com licença comercial verificada.
 *
 * Fail-closed: slug sem correspondência no manifesto simplesmente não gera
 * ImageObject — nunca cai para imagem genérica.
 */
import { existsSync, readFileSync } from "node:fs";
import { BASE_URL } from "./site-env.mjs";

const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");

/** slug → metadados da foto licenciada. */
export const FOTOS = new Map();
{
  const src = read("src/lib/fotosLicenciadas.ts");
  const re =
    /"slug":\s*"([^"]+)",\s*\n\s*"src":\s*"([^"]+)",\s*\n\s*"alt":\s*"([^"]*)",\s*\n\s*"autor":\s*"([^"]*)",\s*\n\s*"autorUrl":\s*"([^"]*)",\s*\n\s*"origem":\s*"([^"]*)",\s*\n\s*"licenca":\s*"([^"]*)",\s*\n\s*"licencaUrl":\s*"([^"]*)"/g;
  for (const m of src.matchAll(re)) {
    FOTOS.set(m[1], {
      slug: m[1],
      src: m[2],
      alt: m[3],
      autor: m[4],
      autorUrl: m[5],
      origem: m[6],
      licenca: m[7],
      licencaUrl: m[8],
    });
  }
}

/** rota → slug da foto (cluster de problemas). */
export const FOTO_POR_ROTA = new Map();
{
  const src = read("src/lib/clusterProblemas.ts");
  const re = /path:\s*"(\/problemas\/[a-z0-9-]+)"([\s\S]*?)(?=\n\s{2}\{\s*\n\s*slug:|\n\];)/g;
  for (const m of src.matchAll(re)) {
    const slug = /foto:\s*"([a-z0-9-]+)"/.exec(m[2])?.[1];
    if (slug && FOTOS.has(slug)) FOTO_POR_ROTA.set(m[1], slug);
  }
}

/** Nó schema.org ImageObject da foto real da rota (ou null). */
export function imageObjectFor(path) {
  const slug = FOTO_POR_ROTA.get(path);
  const f = slug ? FOTOS.get(slug) : null;
  if (!f) return null;
  const pageUrl = `${BASE_URL}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#image`,
    contentUrl: `${BASE_URL}${f.src}`,
    url: `${BASE_URL}${f.src}`,
    caption: f.alt,
    description: f.alt,
    representativeOfPage: true,
    creditText: `Foto: ${f.autor} (${f.licenca})`,
    copyrightNotice: `Foto: ${f.autor} (${f.licenca})`,
    license: f.licencaUrl,
    acquireLicensePage: f.origem,
    creator: { "@type": "Person", name: f.autor, url: f.autorUrl },
  };
}
