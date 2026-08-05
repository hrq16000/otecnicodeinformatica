// ─────────────────────────────────────────────────────────────
// CORPO ESTÁTICO + JSON-LD ESTÁTICO POR ROTA CURADA
//
// Objetivo (Rodada 1 — Static SEO Foundation): eliminar o fallback da
// homepage no HTML inicial das rotas curadas. Cada rota recebe:
//   • um único H1 próprio
//   • um primeiro parágrafo próprio
//   • breadcrumb semântico (apenas para URLs que existem)
//   • 3–6 links internos contextuais
//   • CTA textual reaproveitando o deep link oficial do WhatsApp
//   • JSON-LD estático coerente com o tipo da página
//
// Fonte dos títulos/descrições: scripts/curated-routes-meta.mjs (espelho
// curado das fontes React). Nada aqui inventa preço, avaliação, SLA,
// endereço físico ou parceiro. Nenhum conteúdo é ocultado (o bloco vive
// dentro do <noscript> do #root e é substituído pelo React na hidratação).
// ─────────────────────────────────────────────────────────────

import { CURATED_ROUTES } from "./curated-routes-meta.mjs";

export const SITE = "https://tecnico.curitiba.br";

// Espelho mínimo de src/lib/siteConfig.ts / src/lib/localBusinessJsonLd.ts.
// Mantém NAP, área atendida e horários idênticos ao runtime.
export const SITE_CONFIG = {
  brandName: "Técnico em Curitiba",
  legalName: "Técnico em Curitiba — Assistência Técnica em Informática",
  legalEntityName: "Ping Soluções",
  cnpj: "41.723.708/0001-58",
  foundedYear: "1998",
  phoneE164: "+5541997086380",
  whatsappNumber: "5541997086380",
  email: "contato@tecnico.curitiba.br",
  primaryCity: "Curitiba",
  region: "PR",
  country: "BR",
  businessType: ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  serviceArea: [
    "Curitiba",
    "São José dos Pinhais",
    "Pinhais",
    "Colombo",
    "Araucária",
    "Campo Largo",
    "Região Metropolitana de Curitiba",
  ],
};

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
];

const NAP = {
  name: SITE_CONFIG.brandName,
  legalName: SITE_CONFIG.legalName,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE_CONFIG.primaryCity,
    addressRegion: SITE_CONFIG.region,
    addressCountry: SITE_CONFIG.country,
  },
  telephone: SITE_CONFIG.phoneE164,
  email: SITE_CONFIG.email,
};

export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BY_PATH = new Map(CURATED_ROUTES.map((r) => [r.path, r]));

/** Rótulo curto (H1) derivado do título curado da própria rota. */
export function h1For(route) {
  const head = route.title.split("|")[0].trim();
  // Títulos muito curtos ganham o complemento do próprio título curado
  // (evita H1 genérico como "Equipamentos Atendidos").
  if (head.length < 26) {
    const tail = route.title.split("|").slice(1).join("|").split("-")[0].trim();
    return tail ? `${head} — ${tail}` : head;
  }
  return head;
}

const SHORT_LABEL = {
  "/": "Início",
  "/servicos": "Serviços",
  "/sobre": "Sobre",
  "/faq": "Dúvidas frequentes",
  "/contato": "Contato",
  "/como-funciona": "Como funciona",
  "/precos-e-politicas": "Preços e políticas",
  "/tecnico-informatica-curitiba": "Técnico em Curitiba",
  "/empresa-de-ti-curitiba": "Empresa de TI em Curitiba",
  "/atendimento-domicilio": "Atendimento em domicílio",
  "/atendimento-remoto": "Atendimento remoto",
  "/coleta-e-entrega": "Coleta e entrega",
  "/diagnostico-tecnico": "Diagnóstico técnico",
  "/equipamentos-atendidos": "Equipamentos atendidos",
  "/quando-nao-compensa": "Quando não compensa reparar",
};

export function labelFor(path) {
  if (SHORT_LABEL[path]) return SHORT_LABEL[path];
  const route = BY_PATH.get(path);
  if (route) return h1For(route);
  return path;
}

/** Família da rota — decide breadcrumb, links e schema. */
export function familyOf(path) {
  if (path === "/") return "home";
  if (path.startsWith("/servicos/")) return "servico";
  if (path === "/servicos") return "hub-servicos";
  if (path.startsWith("/bairros/")) return "bairro";
  if (path === "/tecnico-informatica-curitiba") return "cidade-mae";
  if (path.startsWith("/tecnico-informatica-")) return "cidade";
  if (path === "/empresa-de-ti-curitiba") return "empresa";
  if (path === "/sobre") return "sobre";
  if (path === "/contato") return "contato";
  if (["/atendimento-domicilio", "/atendimento-remoto", "/coleta-e-entrega", "/diagnostico-tecnico"].includes(path))
    return "modalidade";
  return "institucional";
}

const SERVICOS = CURATED_ROUTES.filter((r) => r.path.startsWith("/servicos/")).map((r) => r.path);
const BAIRROS = CURATED_ROUTES.filter((r) => r.path.startsWith("/bairros/")).map((r) => r.path);
const CIDADES = CURATED_ROUTES.filter(
  (r) => r.path.startsWith("/tecnico-informatica-") && r.path !== "/tecnico-informatica-curitiba",
).map((r) => r.path);

/** Rotação determinística de irmãos (evita blocos de links idênticos). */
function siblings(list, self, count) {
  const others = list.filter((p) => p !== self);
  const start = Math.abs(hash(self)) % Math.max(others.length, 1);
  const out = [];
  for (let i = 0; i < Math.min(count, others.length); i++) {
    out.push(others[(start + i) % others.length]);
  }
  return out;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export function breadcrumbFor(path) {
  const fam = familyOf(path);
  const crumbs = [{ path: "/", name: "Início" }];
  if (fam === "home") return crumbs;
  if (fam === "servico") crumbs.push({ path: "/servicos", name: "Serviços" });
  if (fam === "bairro" || fam === "cidade")
    crumbs.push({ path: "/tecnico-informatica-curitiba", name: "Técnico de Informática em Curitiba" });
  crumbs.push({ path, name: labelFor(path) });
  return crumbs;
}

export function linksFor(path) {
  const fam = familyOf(path);
  let out = [];
  switch (fam) {
    case "home":
      out = ["/servicos", "/tecnico-informatica-curitiba", "/como-funciona", "/precos-e-politicas", "/contato"];
      break;
    case "hub-servicos":
      out = [...siblings(SERVICOS, path, 4), "/precos-e-politicas", "/contato"];
      break;
    case "servico":
      out = ["/servicos", ...siblings(SERVICOS, path, 3), "/precos-e-politicas", "/contato"];
      break;
    case "bairro":
      out = ["/tecnico-informatica-curitiba", ...siblings(BAIRROS, path, 2), "/servicos", "/atendimento-domicilio"];
      break;
    case "cidade":
      out = ["/tecnico-informatica-curitiba", ...siblings(CIDADES, path, 2), "/servicos", "/coleta-e-entrega"];
      break;
    case "cidade-mae":
      // A página-mãe distribui autoridade para bairros-âncora E cidades da RMC.
      out = [
        "/servicos",
        ...siblings(BAIRROS, path, 2),
        ...siblings(CIDADES, path, 2),
        "/atendimento-domicilio",
        "/precos-e-politicas",
      ];
      break;
    case "empresa":
      out = ["/servicos/suporte-tecnico-empresarial", "/servicos/redes-e-wifi", "/atendimento-remoto", "/contato"];
      break;
    case "sobre":
      out = ["/como-funciona", "/precos-e-politicas", "/servicos", "/contato"];
      break;
    case "contato":
      out = ["/servicos", "/como-funciona", "/precos-e-politicas", "/atendimento-domicilio"];
      break;
    case "modalidade":
      out = ["/servicos", "/como-funciona", "/precos-e-politicas", "/tecnico-informatica-curitiba"];
      break;
    default:
      out = ["/servicos", "/como-funciona", "/faq", "/contato"];
  }
  return [...new Set(out.filter((p) => p !== path && BY_PATH.has(p)))].slice(0, 6);
}

const WA_BASE = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

function waLink(route) {
  const msg = `Olá! Vim da página ${route.path} do site Técnico em Curitiba e preciso de atendimento.`;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}

/** HTML estático (dentro do <noscript> do #root) específico da rota. */
export function staticBodyFor(route) {
  const h1 = h1For(route);
  const crumbs = breadcrumbFor(route.path);
  const links = linksFor(route.path);
  const crumbHtml = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span aria-current="page">${esc(c.name)}</span>`
        : `<a href="${c.path}" style="color:#7fd4ec">${esc(c.name)}</a> ›`,
    )
    .join(" ");
  const linksHtml = links
    .map((p) => `<li><a href="${p}" style="color:#7fd4ec">${esc(labelFor(p))}</a></li>`)
    .join("");

  return `
        <div style="min-height:100vh;background:linear-gradient(155deg,hsl(205,58%,15%) 0%,hsl(200,45%,22%) 100%);color:#fff;padding:32px 20px;font-family:Arial,sans-serif;max-width:820px;margin:0 auto">
          <img src="/logo.webp" alt="Técnico em Curitiba" width="240" height="78" style="max-width:60vw;height:auto" />
          <nav aria-label="Trilha de navegação" style="font-size:.85rem;opacity:.9;margin:16px 0">${crumbHtml}</nav>
          <h1 style="font-size:1.6rem;line-height:1.25;margin:8px 0 12px">${esc(h1)}</h1>
          <p style="margin:0 0 16px;font-size:1rem;opacity:.94">${esc(route.description)}</p>
          <p style="margin:0 0 20px"><a href="${waLink(route)}" data-cta-location="noscript_static" style="background:#16a34a;color:#fff;font-weight:bold;padding:14px 26px;border-radius:12px;text-decoration:none;display:inline-block">Falar no WhatsApp</a></p>
          <h2 style="font-size:1.1rem;margin:24px 0 8px">Páginas relacionadas</h2>
          <ul style="line-height:1.9;padding-left:20px">${linksHtml}</ul>
          <h2 style="font-size:1.1rem;margin:24px 0 8px">Identificação e responsabilidade técnica</h2>
          <p style="margin:0 0 8px;font-size:.9rem;opacity:.9">${esc(SITE_CONFIG.legalEntityName)} — CNPJ ${esc(SITE_CONFIG.cnpj)} — atuação em informática desde ${esc(SITE_CONFIG.foundedYear)}. Contato oficial: <a href="mailto:${SITE_CONFIG.email}" style="color:#7fd4ec">${esc(SITE_CONFIG.email)}</a>.</p>
          <ul style="line-height:1.9;padding-left:20px;font-size:.9rem">
            <li><a href="/gestor-responsavel" style="color:#7fd4ec">Gestor responsável e escopo técnico</a></li>
            <li><a href="/precos-e-politicas" style="color:#7fd4ec">Preços, garantia e políticas</a></li>
          </ul>
          <p style="margin-top:22px;font-size:.85rem;opacity:.85">Para uma experiência completa, ative o JavaScript no seu navegador.</p>
        </div>`;
}

function localBusiness(path, { name, description, areaServed } = {}) {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const isHome = path === "/";
  return {
    "@context": "https://schema.org",
    "@type": SITE_CONFIG.businessType,
    "@id": isHome ? `${SITE}/#localbusiness` : `${url}#localbusiness`,
    parentOrganization: { "@id": `${SITE}/#organization` },
    name: name ?? NAP.name,
    legalName: NAP.legalName,
    foundingDate: SITE_CONFIG.foundedYear,
    url,
    address: NAP.address,
    telephone: NAP.telephone,
    email: NAP.email,
    areaServed: (areaServed ?? SITE_CONFIG.serviceArea).map((n) => ({ "@type": "City", name: n })),
    openingHoursSpecification: OPENING_HOURS,
    ...(description ? { description } : {}),
  };
}

/**
 * Organization — entidade institucional única do documento.
 * Espelha src/lib/organizationJsonLd.ts. Todos os `publisher`/`provider`/
 * `parentOrganization` referenciam este `@id` (nunca repetem o objeto).
 */
function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: SITE_CONFIG.brandName,
    alternateName: ["Técnico Curitiba", "Técnico de Informática Curitiba"],
    legalName: SITE_CONFIG.legalName,
    taxID: SITE_CONFIG.cnpj,
    url: `${SITE}/`,
    logo: `${SITE}/logo.png`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phoneE164,
    foundingDate: SITE_CONFIG.foundedYear,
    areaServed: SITE_CONFIG.serviceArea.map((name) => ({ "@type": "City", name })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
      areaServed: "BR-PR",
    },
    sameAs: [`https://wa.me/${SITE_CONFIG.whatsappNumber}`],
  };
}

function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: SITE_CONFIG.brandName,
    url: `${SITE}/`,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE}/#organization` },
  };
}

function breadcrumbList(path) {
  const crumbs = breadcrumbFor(path);
  if (crumbs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE}${path === "/" ? "/" : path}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path === "/" ? "/" : c.path}`,
    })),
  };
}

/** JSON-LD estático da rota — um nó lógico por entidade. */
export function jsonLdFor(route) {
  const path = route.path;
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const fam = familyOf(path);
  const out = [organization(), website()];

  if (fam === "home") {
    out.push(localBusiness("/", { description: route.description }));
    return out;
  }

  if (fam === "servico" || fam === "hub-servicos" || fam === "empresa") {
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: h1For(route),
      serviceType: h1For(route),
      description: route.description,
      url,
      areaServed: SITE_CONFIG.serviceArea.map((n) => ({ "@type": "City", name: n })),
      provider: { "@id": `${SITE}/#organization` },
    });
  } else if (fam === "bairro" || fam === "cidade" || fam === "cidade-mae" || fam === "modalidade") {
    const local =
      fam === "cidade" || fam === "bairro"
        ? [h1For(route).replace(/^Técnico (de Informática )?(em|no|na) /i, "").split("(")[0].split("|")[0].trim()]
        : undefined;
    out.push(localBusiness(path, { name: h1For(route), description: route.description, areaServed: local }));
  } else {
    const type = fam === "sobre" ? "AboutPage" : fam === "contato" ? "ContactPage" : "WebPage";
    out.push({
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${url}#webpage`,
      name: h1For(route),
      description: route.description,
      url,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE}/#website` },
      publisher: { "@id": `${SITE}/#organization` },
    });
  }

  const bc = breadcrumbList(path);
  if (bc) out.push(bc);
  return out;
}

/**
 * Slot (chave estável) de cada entidade estruturada. Mesma convenção do
 * runtime em src/lib/jsonLdSlots.ts — o client adota (upsert) o nó estático
 * pela chave, nunca por coincidência de @type.
 */
export function slotFor(schema) {
  const types = Array.isArray(schema["@type"]) ? schema["@type"] : [schema["@type"]];
  if (types.includes("BreadcrumbList")) return "breadcrumb";
  if (types.includes("WebSite")) return "website";
  if (types.includes("Organization") && !types.some((t) => /Business|Service/.test(t))) return "organization";
  if (types.some((t) => /LocalBusiness|ComputerRepairService|ProfessionalService/.test(t))) return "local-business";
  if (types.includes("Service")) return "service";
  if (types.includes("FAQPage")) return "faq";
  if (types.includes("AboutPage")) return "about-page";
  if (types.includes("ContactPage")) return "contact-page";
  return "web-page";
}

/** Tipo principal (string) de um schema — usado para diagnóstico. */
export function primaryType(schema) {
  const t = schema["@type"];
  return Array.isArray(t) ? t[0] : t;
}

/** Scripts JSON-LD estáticos prontos para injeção no <head>. */
export function jsonLdScriptsFor(route) {
  return jsonLdFor(route)
    .map((schema, i) => {
      const types = (Array.isArray(schema["@type"]) ? schema["@type"] : [schema["@type"]]).join(" ");
      return `<script type="application/ld+json" id="ld-static-${i}" data-static-jsonld="1" data-schema-key="${slotFor(schema)}" data-jsonld-type="${esc(types)}">${JSON.stringify(schema)}</script>`;
    })
    .join("\n    ");
}

export { CURATED_ROUTES };
