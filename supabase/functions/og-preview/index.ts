// Static HTML preview endpoint for OG validation tools (FB Sharing Debugger,
// LinkedIn Post Inspector, X Card Validator). Returns a minimal HTML page
// containing only the per-city meta tags — no JS, no React — so crawlers
// always see the correct og:image even before the prerender is deployed.
//
// Usage: /functions/v1/og-preview?cidade=sao-paulo

const SITE = "https://tecnico.curitiba.br";
const OG_VERSION = "20260615";

const CITIES: Record<string, { cidade: string; estado: string; estadoNome: string }> = {
  "sao-paulo": { cidade: "São Paulo", estado: "SP", estadoNome: "São Paulo" },
  "rio-de-janeiro": { cidade: "Rio de Janeiro", estado: "RJ", estadoNome: "Rio de Janeiro" },
  "belo-horizonte": { cidade: "Belo Horizonte", estado: "MG", estadoNome: "Minas Gerais" },
  "brasilia": { cidade: "Brasília", estado: "DF", estadoNome: "Distrito Federal" },
  "porto-alegre": { cidade: "Porto Alegre", estado: "RS", estadoNome: "Rio Grande do Sul" },
  "florianopolis": { cidade: "Florianópolis", estado: "SC", estadoNome: "Santa Catarina" },
  "salvador": { cidade: "Salvador", estado: "BA", estadoNome: "Bahia" },
  "recife": { cidade: "Recife", estado: "PE", estadoNome: "Pernambuco" },
  "fortaleza": { cidade: "Fortaleza", estado: "CE", estadoNome: "Ceará" },
  "manaus": { cidade: "Manaus", estado: "AM", estadoNome: "Amazonas" },
  "campinas": { cidade: "Campinas", estado: "SP", estadoNome: "São Paulo" },
  "goiania": { cidade: "Goiânia", estado: "GO", estadoNome: "Goiás" },
  "curitiba-nacional": { cidade: "Curitiba", estado: "PR", estadoNome: "Paraná" },
  "belem": { cidade: "Belém", estado: "PA", estadoNome: "Pará" },
  "natal": { cidade: "Natal", estado: "RN", estadoNome: "Rio Grande do Norte" },
  "joao-pessoa": { cidade: "João Pessoa", estado: "PB", estadoNome: "Paraíba" },
  "vitoria": { cidade: "Vitória", estado: "ES", estadoNome: "Espírito Santo" },
  "cuiaba": { cidade: "Cuiabá", estado: "MT", estadoNome: "Mato Grosso" },
  "campo-grande": { cidade: "Campo Grande", estado: "MS", estadoNome: "Mato Grosso do Sul" },
  "maceio": { cidade: "Maceió", estado: "AL", estadoNome: "Alagoas" },
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// We cannot know the hashed filename here, so reference the canonical
// production path. After the next build + deploy, the og image at the
// canonical URL is the per-city prerendered one.
function ogImageFor(slug: string) {
  // Public CDN URL of the city OG card (served from dist after build).
  // Fallback path uses the slug verbatim with a versioned query string.
  return `${SITE}/og/arrumar-pc-${slug}.jpg?v=${OG_VERSION}`;
}

Deno.serve((req) => {
  const url = new URL(req.url);
  const slug = (url.searchParams.get("cidade") || "").toLowerCase().trim();
  const city = CITIES[slug];

  if (!city) {
    return new Response(
      `<!doctype html><meta charset="utf-8"><title>OG preview</title><body><h1>Missing ?cidade=&lt;slug&gt;</h1><p>Valid slugs: ${Object.keys(CITIES).join(", ")}</p></body>`,
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const canonical = `${SITE}/arrumar-pc/${slug}`;
  const title = `Arrumar PC em ${city.cidade} ${city.estado} — Técnico online | Técnico Curitiba`;
  const description = `Técnico de informática online para ${city.cidade}/${city.estado}. Formatação, vírus, lentidão, tela azul e Wi-Fi via WhatsApp + acesso remoto. Orçamento grátis, paga só se resolver.`;
  const og = ogImageFor(slug);

  const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Técnico Curitiba">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${og}">
<meta property="og:image:secure_url" content="${og}">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="672">
<meta property="og:image:type" content="image/jpeg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
</head><body>
<h1>${esc(title)}</h1>
<p>${esc(description)}</p>
<p><a href="${canonical}">Ver página oficial →</a></p>
<p><img src="${og}" alt="OG ${esc(city.cidade)}" style="max-width:600px"></p>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=300",
      "access-control-allow-origin": "*",
    },
  });
});
