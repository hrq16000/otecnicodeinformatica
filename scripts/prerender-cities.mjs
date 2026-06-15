// Build-time prerender for /arrumar-pc/<cidade> and category hubs
// (/conserto-{tv,som,videogame,celular}/<local>).
// Generates static dist/<path>/index.html so FB/LinkedIn crawlers see
// the correct og:image, title, description and JSON-LD without executing JS.

import { promises as fs } from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const OG_VERSION = "20260615";

// === Cidades para arrumar-pc (national hub) ===
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

// === Categorias × Locais (RMC/bairros) — mirrors src/pages/hubs/{categories,locais}.ts ===
const CATEGORIES = [
  { id: "tv", slug: "conserto-tv", nome: "TV", titlePrefix: "Conserto de TV" },
  { id: "som", slug: "conserto-som", nome: "Som", titlePrefix: "Conserto de Som e Áudio" },
  { id: "videogame", slug: "conserto-videogame", nome: "Videogame", titlePrefix: "Conserto de Videogame" },
  { id: "celular", slug: "conserto-celular", nome: "Celular", titlePrefix: "Conserto de Celular" },
];

const LOCAIS = [
  { slug: "curitiba", nome: "Curitiba", kind: "cidade" },
  { slug: "sao-jose-dos-pinhais", nome: "São José dos Pinhais", kind: "cidade" },
  { slug: "araucaria", nome: "Araucária", kind: "cidade" },
  { slug: "pinhais", nome: "Pinhais", kind: "cidade" },
  { slug: "colombo", nome: "Colombo", kind: "cidade" },
  { slug: "campo-largo", nome: "Campo Largo", kind: "cidade" },
  { slug: "almirante-tamandare", nome: "Almirante Tamandaré", kind: "cidade" },
  { slug: "fazenda-rio-grande", nome: "Fazenda Rio Grande", kind: "cidade" },
  { slug: "piraquara", nome: "Piraquara", kind: "cidade" },
  { slug: "quatro-barras", nome: "Quatro Barras", kind: "cidade" },
  { slug: "campo-magro", nome: "Campo Magro", kind: "cidade" },
  { slug: "batel", nome: "Batel", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "centro", nome: "Centro", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "cic", nome: "CIC", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "portao", nome: "Portão", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "santa-felicidade", nome: "Santa Felicidade", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "boqueirao", nome: "Boqueirão", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "cajuru", nome: "Cajuru", kind: "bairro", cidadeMae: "Curitiba" },
  { slug: "agua-verde", nome: "Água Verde", kind: "bairro", cidadeMae: "Curitiba" },
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

function categoryLocalMeta(cat, local) {
  const cityLabel = local.kind === "bairro" ? `${local.nome}, ${local.cidadeMae}` : local.nome;
  const path = `/${cat.slug}/${local.slug}`;
  const url = `${SITE}${path}`;
  const title = `${cat.titlePrefix} em ${cityLabel} | Coleta e Entrega · Técnico Curitiba`;
  const description = `${cat.titlePrefix} em ${cityLabel}/PR com coleta e entrega. Reparo a partir de R$ 300 com diagnóstico incluso, garantia de 90 dias e orçamento sem compromisso pelo WhatsApp.`;
  return { path, url, title, description, cityLabel };
}

function categoryHubMeta(cat) {
  const path = `/${cat.slug}-curitiba`;
  const url = `${SITE}${path}`;
  const title = `${cat.titlePrefix} em Curitiba e Região Metropolitana | Coleta e Entrega`;
  const description = `${cat.titlePrefix} para Curitiba, São José dos Pinhais, Araucária, Pinhais, Colombo, Campo Largo e mais. Coleta e entrega, reparo mínimo R$ 300 com diagnóstico incluso.`;
  return { path, url, title, description };
}

async function findHashedAsset(distDir, baseName) {
  const assetsDir = path.join(distDir, "assets");
  let entries;
  try { entries = await fs.readdir(assetsDir); } catch { return undefined; }
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

async function writePage(distDir, routePath, html) {
  const outDir = path.join(distDir, ...routePath.split("/").filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

export async function prerenderCities(distDir) {
  const indexPath = path.join(distDir, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");
  const fallbackOg = await findHashedAsset(distDir, "og-arrumar-pc-brasil");
  let written = 0;

  // --- arrumar-pc cities ---
  for (const c of CITIES) {
    const meta = cityMeta(c);
    const ogImage = await findHashedAsset(distDir, `og-arrumar-pc-${c.slug}`) ?? fallbackOg;
    const absoluteOg = ogImage ? `${SITE}${ogImage}` : undefined;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Arrumar PC online em ${c.cidade}`,
      serviceType: "Suporte técnico remoto de informática",
      provider: { "@type": "Organization", name: "Técnico Curitiba", url: SITE },
      areaServed: { "@type": "City", name: c.cidade, containedInPlace: { "@type": "State", name: c.estadoNome } },
      description: meta.description,
      url: meta.url,
    };
    const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd });
    await writePage(distDir, meta.path, html);
    written++;
  }

  // --- category hubs (e.g. /conserto-tv-curitiba) ---
  for (const cat of CATEGORIES) {
    const meta = categoryHubMeta(cat);
    const absoluteOg = fallbackOg ? `${SITE}${fallbackOg}` : undefined;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: cat.titlePrefix,
      serviceType: cat.titlePrefix,
      provider: { "@type": "LocalBusiness", name: "Técnico Curitiba", url: SITE, telephone: "+5541997452053" },
      areaServed: { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
      description: meta.description,
      url: meta.url,
    };
    const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd });
    await writePage(distDir, meta.path, html);
    written++;
  }

  // --- category × local (e.g. /conserto-tv/curitiba) ---
  for (const cat of CATEGORIES) {
    for (const local of LOCAIS) {
      const meta = categoryLocalMeta(cat, local);
      const absoluteOg = fallbackOg ? `${SITE}${fallbackOg}` : undefined;
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${cat.titlePrefix} em ${meta.cityLabel}`,
        serviceType: cat.titlePrefix,
        provider: { "@type": "LocalBusiness", name: "Técnico Curitiba", url: SITE, telephone: "+5541997452053", address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" } },
        areaServed: { "@type": local.kind === "bairro" ? "Place" : "City", name: meta.cityLabel, containedInPlace: { "@type": "State", name: "Paraná" } },
        offers: {
          "@type": "Offer", priceCurrency: "BRL", price: "300",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL", minPrice: "300" },
          availability: "https://schema.org/InStock", url: meta.url,
        },
        description: meta.description,
        url: meta.url,
      };
      const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd });
      await writePage(distDir, meta.path, html);
      written++;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`[prerender-cities] wrote ${written} per-route index.html files`);
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
