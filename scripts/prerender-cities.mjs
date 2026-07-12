// Build-time prerender for /arrumar-pc/<cidade> and category hubs
// (/conserto-{tv,som,videogame,celular}/<local>).
// Generates static dist/<path>/index.html so FB/LinkedIn crawlers see
// the correct og:image, title, description and JSON-LD without executing JS.

import { promises as fs } from "node:fs";
import path from "node:path";
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";

const SITE = "https://tecnico.curitiba.br";
const OG_VERSION = "20260615";
const DEFAULT_OG = `${SITE}/og-image.png`;

// Política de robots explícita (nunca herdada silenciosamente do index.html base).
const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const ROBOTS_NOINDEX = "noindex, follow";

// Remove TODO meta robots existente e injeta exatamente um com o conteúdo dado.
// Falha (throw) se não conseguir garantir exatamente um meta robots.
function setRobots(html, content) {
  let out = html.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "");
  const tag = `<meta name="robots" content="${content}">`;
  out = out.replace(/<\/head>/i, `    ${tag}\n  </head>`);
  const found = (out.match(/<meta\s+name=["']robots["']/gi) || []).length;
  if (found !== 1) {
    throw new Error(`[prerender-cities] setRobots: esperado exatamente 1 meta robots, encontrou ${found}`);
  }
  return out;
}

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
export const CATEGORIES = [
  { id: "tv", slug: "conserto-tv", nome: "TV", titlePrefix: "Conserto de TV" },
  { id: "som", slug: "conserto-som", nome: "Som", titlePrefix: "Conserto de Som e Áudio" },
  { id: "videogame", slug: "conserto-videogame", nome: "Videogame", titlePrefix: "Conserto de Videogame" },
  { id: "celular", slug: "conserto-celular", nome: "Celular", titlePrefix: "Conserto de Celular" },
];

export const LOCAIS = [
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

// === CFTV (câmeras de segurança) — espelha src/pages/cftv/* ===
// Hub /cftv + 7 páginas locais = 8 rotas. Todas noindex,follow (fora do sitemap).
export const CFTV_ROUTES = [
  {
    path: "/cftv", city: "Curitiba e Região", hub: true,
    title: "Kit 4 Câmeras de Segurança Intelbras | Instalação Profissional em Curitiba e Região | R$ 1.350",
    description: "Kit 4 Câmeras Intelbras com instalação profissional inclusa e acesso remoto pelo celular. R$ 1.350 completo. Atendemos Curitiba, São José dos Pinhais, Itapoá e Guaratuba. Desde 1999. WhatsApp.",
  },
  {
    path: "/cftv/curitiba", city: "Curitiba",
    title: "Câmeras de Segurança em Curitiba | Kit 4 Câmeras Intelbras R$ 1.350 | Instalação Profissional",
    description: "Instalação de câmeras de segurança Intelbras em Curitiba. Kit 4 câmeras com DVR, HD e acesso remoto por R$ 1.350. Desde 1999. WhatsApp.",
  },
  {
    path: "/cftv/sao-jose-dos-pinhais", city: "São José dos Pinhais",
    title: "Câmeras de Segurança em São José dos Pinhais | Kit Intelbras R$ 1.350 | Instalação Inclusa",
    description: "Kit 4 câmeras Intelbras com instalação profissional em São José dos Pinhais. Acesso remoto pelo celular. R$ 1.350 completo. Desde 1999. WhatsApp.",
  },
  {
    path: "/cftv/litoral", city: "Litoral do Paraná",
    title: "Câmeras de Segurança no Litoral do PR | Itapoá e Guaratuba | Kit Intelbras R$ 1.350",
    description: "Instalação de câmeras de segurança no Litoral do Paraná: Itapoá, Guaratuba e região. Kit 4 câmeras Intelbras com acesso remoto. R$ 1.350. WhatsApp.",
  },
  {
    path: "/cftv/guaratuba", city: "Guaratuba",
    title: "Câmeras de Segurança em Guaratuba | Kit 4 Câmeras Intelbras R$ 1.350 | Instalação Profissional",
    description: "Kit 4 câmeras Intelbras com instalação em Guaratuba. Monitore sua casa de praia pelo celular de qualquer lugar. R$ 1.350 completo. WhatsApp.",
  },
  {
    path: "/cftv/araucaria", city: "Araucária",
    title: "Câmeras de Segurança em Araucária | Kit Intelbras R$ 1.350 | Instalação Inclusa",
    description: "Kit 4 câmeras Intelbras com instalação profissional em Araucária. Acesso remoto pelo celular. R$ 1.350 completo. Desde 1999. WhatsApp.",
  },
  {
    path: "/cftv/campo-largo", city: "Campo Largo",
    title: "Câmeras de Segurança em Campo Largo | Kit Intelbras R$ 1.350 | Instalação Inclusa",
    description: "Kit 4 câmeras Intelbras com instalação profissional em Campo Largo. Acesso remoto pelo celular. R$ 1.350 completo. Desde 1999. WhatsApp.",
  },
  {
    path: "/cftv/pinhais", city: "Pinhais",
    title: "Câmeras de Segurança em Pinhais | Kit Intelbras R$ 1.350 | Instalação Inclusa",
    description: "Kit 4 câmeras Intelbras com instalação profissional em Pinhais. Acesso remoto pelo celular. R$ 1.350 completo. Desde 1999. WhatsApp.",
  },
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
    `<meta property="og:site_name" content="Técnico em Curitiba">`,
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
  // Política de robots explícita por rota (default: noindex para famílias legadas).
  out = setRobots(out, meta.robots || ROBOTS_NOINDEX);
  return out;
}

async function writePage(distDir, routePath, html) {
  const outDir = path.join(distDir, ...routePath.split("/").filter(Boolean));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

// Injeção cirúrgica para rotas CURADAS: preserva og:image e demais tags do
// index.html base, apenas reescrevendo title/description/canonical/og:url e
// os alternates hreflang para a URL da rota (self-referente).
function injectCuratedMeta(html, url, title, description) {
  const t = htmlEscape(title);
  const d = htmlEscape(description);
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`)
    .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${d}">`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${url}" />`)
    .replace(/<link\s+rel=["']alternate["']\s+hreflang=["']pt-BR["'][^>]*>/i, `<link rel="alternate" hreflang="pt-BR" href="${url}" />`)
    .replace(/<link\s+rel=["']alternate["']\s+hreflang=["']x-default["'][^>]*>/i, `<link rel="alternate" hreflang="x-default" href="${url}" />`)
    .replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${t}">`)
    .replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${d}">`)
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${t}">`)
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${d}">`);
  // Rotas curadas recebem robots explícito index,follow (não herdado silenciosamente).
  return setRobots(out, ROBOTS_INDEX);
}

// ─────────────────────────────────────────────────────────────
// BLOG EDITORIAL — extração de slugs + metadados (fail-closed).
// Parseia as fontes reais (blogPostsContentBase + programmaticPosts)
// para gerar HTML estático próprio por artigo. Todos os artigos são
// noindex, follow (registro editorial vazio nesta fase). Fora do sitemap.
// ─────────────────────────────────────────────────────────────
const HOWTO_DEFAULT_DATE = "2026-06-14";

function extractField(block, name) {
  const re = new RegExp(`^\\s*${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m");
  const m = block.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : undefined;
}

export async function getBlogPosts(rootDir = ".") {
  const posts = [];
  const seen = new Set();
  const duplicates = [];

  // --- Base manual (blogPostsContentBase) ---
  const basePath = path.join(rootDir, "src/data/blogPostsContent.tsx");
  const baseSrc = await fs.readFile(basePath, "utf8");
  const entryRe = /^  "([a-z0-9-]+)":\s*\{/gm;
  const matches = [...baseSrc.matchAll(entryRe)];
  for (let i = 0; i < matches.length; i++) {
    const slug = matches[i][1];
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : baseSrc.length;
    const block = baseSrc.slice(start, end);
    const title = extractField(block, "title");
    const excerpt = extractField(block, "excerpt");
    const date = extractField(block, "date");
    const category = extractField(block, "category");
    if (!title) continue;
    if (seen.has(slug)) { duplicates.push(slug); continue; }
    seen.add(slug);
    posts.push({ slug, title, excerpt: excerpt ?? "", date: date ?? HOWTO_DEFAULT_DATE, category: category ?? "", origin: "manual" });
  }

  // --- Programáticos (defs em blogProgrammaticPosts.tsx) ---
  const progPath = path.join(rootDir, "src/data/blogProgrammaticPosts.tsx");
  const progSrc = await fs.readFile(progPath, "utf8");
  const defsIdx = progSrc.indexOf("const defs");
  const defsSrc = defsIdx >= 0 ? progSrc.slice(defsIdx) : progSrc;
  const slugRe = /slug:\s*"([a-z0-9-]+)"/g;
  const slugMatches = [...defsSrc.matchAll(slugRe)];
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1];
    const start = slugMatches[i].index;
    const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : defsSrc.length;
    const block = defsSrc.slice(start, end);
    const title = extractField(block, "title");
    const excerpt = extractField(block, "excerpt");
    const date = extractField(block, "date");
    const category = extractField(block, "category");
    if (!title) continue;
    if (seen.has(slug)) { duplicates.push(slug); continue; }
    seen.add(slug);
    posts.push({ slug, title, excerpt: excerpt ?? "", date: date ?? HOWTO_DEFAULT_DATE, category: category ?? "", origin: "programmatic" });
  }

  return { posts, duplicates };
}

// Gera o HTML estático de um artigo não aprovado (noindex,follow, self-canonical).
async function writeBlogPostPage(distDir, baseHtml, post) {
  const routePath = `/blog/${post.slug}`;
  const url = `${SITE}${routePath}`;
  const title = `${post.title} | Blog | Técnico em Curitiba`;
  const description = post.excerpt || post.title;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: post.title,
    description,
    url,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: "Técnico em Curitiba", url: SITE },
    publisher: { "@type": "Organization", name: "Técnico em Curitiba", url: SITE },
  };
  const html = injectMeta(baseHtml, {
    path: routePath, url, title, description,
    ogImage: DEFAULT_OG, jsonLd, robots: ROBOTS_NOINDEX,
  });
  await writePage(distDir, routePath, html);
}

export async function prerenderCities(distDir) {
  const indexPath = path.join(distDir, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");
  const fallbackOg = await findHashedAsset(distDir, "og-arrumar-pc-brasil");
  let written = 0;

  // --- rotas CURADAS (serviços, cidades âncora, institucionais) ---
  // "/" já sai correto no index.html base; as demais recebem canonical/og por rota.
  let curated = 0;
  for (const route of CURATED_ROUTES) {
    if (route.path === "/") continue;
    const url = `${SITE}${route.path}`;
    const html = injectCuratedMeta(baseHtml, url, route.title, route.description);
    await writePage(distDir, route.path, html);
    curated++;
  }
  console.log(`[prerender-cities] wrote ${curated} curated per-route index.html files`);

  // --- /valores (alias de /precos-e-politicas) ---
  // Rota alias sem HTML próprio: o fallback dist/index.html entregava o canonical
  // da home para crawlers sem JS. Geramos dist/valores/index.html reaproveitando
  // os metadados oficiais de /precos-e-politicas e forçando canonical + og:url
  // para a URL canônica /precos-e-politicas (nunca a home). Fora de todos os
  // sitemaps — apenas HTML estático para corrigir o canonical pré-hidratação.
  const precos = CURATED_ROUTES.find((r) => r.path === "/precos-e-politicas");
  if (precos) {
    const precosUrl = `${SITE}/precos-e-politicas`;
    const html = injectCuratedMeta(baseHtml, precosUrl, precos.title, precos.description);
    await writePage(distDir, "/valores", html);
    console.log(`[prerender-cities] wrote /valores alias -> canonical ${precosUrl}`);
  } else {
    console.warn("[prerender-cities] /precos-e-politicas ausente em CURATED_ROUTES; /valores não gerado");
  }





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
      provider: { "@type": "Organization", name: "Técnico em Curitiba", url: SITE },
      areaServed: { "@type": "City", name: c.cidade, containedInPlace: { "@type": "State", name: c.estadoNome } },
      description: meta.description,
      url: meta.url,
    };
    const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd, robots: ROBOTS_NOINDEX });
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
      provider: { "@type": "LocalBusiness", name: "Técnico em Curitiba", url: SITE, telephone: "+5541997086380" },
      areaServed: { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
      description: meta.description,
      url: meta.url,
    };
    const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd, robots: ROBOTS_NOINDEX });
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
        provider: { "@type": "LocalBusiness", name: "Técnico em Curitiba", url: SITE, telephone: "+5541997086380", address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" } },
        areaServed: { "@type": local.kind === "bairro" ? "Place" : "City", name: meta.cityLabel, containedInPlace: { "@type": "State", name: "Paraná" } },
        offers: {
          "@type": "Offer", priceCurrency: "BRL", price: "300",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL", minPrice: "300" },
          availability: "https://schema.org/InStock", url: meta.url,
        },
        description: meta.description,
        url: meta.url,
      };
      const html = injectMeta(baseHtml, { ...meta, ogImage: absoluteOg, jsonLd, robots: ROBOTS_NOINDEX });
      await writePage(distDir, meta.path, html);
      written++;
    }
  }

  // --- CFTV (câmeras de segurança) — família legada adjacente ao núcleo ---
  // As rotas /cftv e /cftv/<local> não tinham HTML estático próprio e caíam no
  // fallback do index.html (robots + canonical da home). Geramos HTML estático
  // self-referente com noindex,follow. Fora de todos os sitemaps.
  for (const r of CFTV_ROUTES) {
    const url = `${SITE}${r.path}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Instalação de Câmeras de Segurança em ${r.city}`,
      serviceType: "Instalação de CFTV e câmeras de segurança",
      provider: { "@type": "Organization", name: "Mileuma Soluções / Mestre dos Serviços" },
      areaServed: r.hub
        ? { "@type": "AdministrativeArea", name: "Curitiba e Região Metropolitana" }
        : { "@type": "City", name: r.city },
      offers: { "@type": "Offer", price: "1350.00", priceCurrency: "BRL", availability: "https://schema.org/InStock", url },
      description: r.description,
      url,
    };
    const html = injectMeta(baseHtml, {
      path: r.path, url, title: r.title, description: r.description,
      ogImage: DEFAULT_OG, jsonLd, robots: ROBOTS_NOINDEX,
    });
    await writePage(distDir, r.path, html);
    written++;
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
