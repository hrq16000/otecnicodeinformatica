// Build-time prerender for /arrumar-pc/<cidade> routes.
// Generates dist/arrumar-pc/<slug>/index.html so FB/LinkedIn crawlers see
// the correct og:image, title, description and JSON-LD without executing JS.
//
// Invoked from vite.config.ts via the `prerenderCitiesPlugin` (closeBundle).

import { promises as fs } from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const OG_VERSION = "20260615";

// Mirrors src/pages/arrumar-pc/cities.ts. Keep in sync.
export const CITIES = [
  { slug: "sao-paulo", cidade: "São Paulo", estado: "SP", estadoNome: "São Paulo" },
  { slug: "rio-de-janeiro", cidade: "Rio de Janeiro", estado: "RJ", estadoNome: "Rio de Janeiro" },
  { slug: "belo-horizonte", cidade: "Belo Horizonte", estado: "MG", estadoNome: "Minas Gerais" },
  { slug: "brasilia", cidade: "Brasília", estado: "DF", estadoNome: "Distrito Federal" },
  { slug: "porto-alegre", cidade: "Porto Alegre", estado: "RS", estadoNome: "Rio Grande do Sul" },
  { slug: "florianopolis", cidade: "Florianópolis", estado: "SC", estadoNome: "Santa Catarina" },
  { slug: "salvador", cidade: "Salvador", estado: "BA", estadoNome: "Bahia" },
  { slug: "recife", cidade: "Recife", estado: "PE", estadoNome: "Pernambuco" },
  { slug: "fortaleza", cidade: "Fortaleza", estado: "CE", estadoNome: "Ceará" },
  { slug: "manaus", cidade: "Manaus", estado: "AM", estadoNome: "Amazonas" },
  { slug: "campinas", cidade: "Campinas", estado: "SP", estadoNome: "São Paulo" },
  { slug: "goiania", cidade: "Goiânia", estado: "GO", estadoNome: "Goiás" },
  { slug: "curitiba-nacional", cidade: "Curitiba", estado: "PR", estadoNome: "Paraná" },
  { slug: "belem", cidade: "Belém", estado: "PA", estadoNome: "Pará" },
  { slug: "natal", cidade: "Natal", estado: "RN", estadoNome: "Rio Grande do Norte" },
  { slug: "joao-pessoa", cidade: "João Pessoa", estado: "PB", estadoNome: "Paraíba" },
  { slug: "vitoria", cidade: "Vitória", estado: "ES", estadoNome: "Espírito Santo" },
  { slug: "cuiaba", cidade: "Cuiabá", estado: "MT", estadoNome: "Mato Grosso" },
  { slug: "campo-grande", cidade: "Campo Grande", estado: "MS", estadoNome: "Mato Grosso do Sul" },
  { slug: "maceio", cidade: "Maceió", estado: "AL", estadoNome: "Alagoas" },
];

function htmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cityMeta(c) {
  const path = `/arrumar-pc/${c.slug}`;
  const url = `${SITE}${path}`;
  const title = `Arrumar PC em ${c.cidade} ${c.estado} — Técnico online | Técnico Curitiba`;
  const description = `Técnico de informática online para ${c.cidade}/${c.estado}. Formatação, vírus, lentidão, tela azul e Wi-Fi via WhatsApp + acesso remoto. Orçamento grátis, paga só se resolver.`;
  return { path, url, title, description };
}

async function findHashedAsset(distDir, baseName) {
  // baseName e.g. "og-arrumar-pc-sao-paulo" — vite emits like
  // "og-arrumar-pc-sao-paulo-<hash>.jpg" under dist/assets/
  const assetsDir = path.join(distDir, "assets");
  let entries;
  try {
    entries = await fs.readdir(assetsDir);
  } catch {
    return undefined;
  }
  const re = new RegExp(`^${baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(-[A-Za-z0-9_-]+)?\\.jpg$`);
  const match = entries.find((f) => re.test(f));
  return match ? `/assets/${match}` : undefined;
}

function injectMeta(html, meta) {
  const titleTag = `<title>${htmlEscape(meta.title)}</title>`;
  const descTag = `<meta name="description" content="${htmlEscape(meta.description)}">`;
  const canonical = `<link rel="canonical" href="${meta.url}">`;
  const og = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${meta.url}">`,
    `<meta property="og:site_name" content="Técnico Curitiba">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${htmlEscape(meta.title)}">`,
    `<meta property="og:description" content="${htmlEscape(meta.description)}">`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
    meta.ogImage ? `<meta property="og:image:secure_url" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
    `<meta property="og:image:width" content="1280">`,
    `<meta property="og:image:height" content="672">`,
    `<meta property="og:image:type" content="image/jpeg">`,
  ].filter(Boolean).join("\n    ");
  const tw = [
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${htmlEscape(meta.title)}">`,
    `<meta name="twitter:description" content="${htmlEscape(meta.description)}">`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
  ].filter(Boolean).join("\n    ");

  const jsonLd = `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`;

  // Strip baseline title/description/canonical/og/twitter from index.html so
  // crawlers only see the per-city values (no duplicates).
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");

  const block = `\n    ${titleTag}\n    ${descTag}\n    ${canonical}\n    ${og}\n    ${tw}\n    ${jsonLd}\n  `;
  out = out.replace(/<\/head>/i, `${block}</head>`);
  return out;
}

export async function prerenderCities(distDir) {
  const indexPath = path.join(distDir, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");

  let written = 0;
  for (const c of CITIES) {
    const meta = cityMeta(c);
    const ogImage = await findHashedAsset(distDir, `og-arrumar-pc-${c.slug}`)
      ?? await findHashedAsset(distDir, "og-arrumar-pc-brasil");
    const absoluteOg = ogImage ? `${SITE}${ogImage}` : undefined;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Arrumar PC online em ${c.cidade}`,
      serviceType: "Suporte técnico remoto de informática",
      provider: { "@type": "Organization", name: "Técnico Curitiba", url: SITE },
      areaServed: {
        "@type": "City",
        name: c.cidade,
        containedInPlace: { "@type": "State", name: c.estadoNome },
      },
      description: meta.description,
      url: meta.url,
    };

    const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd });
    const outDir = path.join(distDir, "arrumar-pc", c.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
    written++;
  }
  // eslint-disable-next-line no-console
  console.log(`[prerender-cities] wrote ${written} per-city index.html files`);
}

export function prerenderCitiesPlugin() {
  return {
    name: "prerender-arrumar-pc-cities",
    apply: "build",
    async closeBundle() {
      try {
        await prerenderCities(path.resolve("dist"));
      } catch (err) {
        console.error("[prerender-cities] failed:", err);
      }
    },
  };
}
