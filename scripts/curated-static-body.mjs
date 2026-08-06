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
  foundedYear: "1998",
  phoneE164: "+5541997086380",
  whatsappNumber: "5541997086380",
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
  // Rotas com H1 explícito (espelho da fábrica serviço × bairro) mandam.
  if (route.h1) return route.h1;
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
  "/problemas/notebook-nao-liga": "Notebook não liga",
  "/seguranca-dos-dados": "Segurança dos dados",
  "/servicos/suporte-home-office": "Suporte para home office",
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
  if (path.startsWith("/problemas/")) return "problema";
  if (/^\/servicos\/[^/]+\/[^/]+$/.test(path)) return "servico-bairro";
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
const SERVICO_BAIRRO_PATHS = CURATED_ROUTES.filter((r) =>
  /^\/servicos\/[^/]+\/[^/]+$/.test(r.path),
).map((r) => r.path);
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
  if (fam === "servico" || fam === "servico-bairro") crumbs.push({ path: "/servicos", name: "Serviços" });
  if (fam === "servico-bairro") {
    const parent = `/servicos/${path.split("/")[2]}`;
    if (BY_PATH.has(parent)) crumbs.push({ path: parent, name: labelFor(parent) });
  }
  if (fam === "problema") crumbs.push({ path: "/servicos", name: "Serviços" });
  if (fam === "bairro" || fam === "cidade")
    crumbs.push({ path: "/tecnico-informatica-curitiba", name: "Técnico de Informática em Curitiba" });
  crumbs.push({ path, name: labelFor(path) });
  return crumbs;
}

/** Saídas obrigatórias por página de sintoma (contrato editorial da onda 3C). */
const PROBLEMA_LINKS = {
  "/problemas/computador-lento": [
    "/servicos/manutencao-de-computador",
    "/servicos/formatacao",
    "/servicos/upgrade-ssd-ram",
    "/servicos/remocao-de-virus",
    "/servicos/recuperacao-de-dados",
    "/precos-e-politicas",
    "/como-funciona",
  ],
};

/** Saídas obrigatórias do cluster empresarial (contrato editorial da onda 3D). */
const SERVICO_LINKS = {
  // Saídas para o cluster de sintoma: sem esses links o HTML servido deixava
  // /problemas/* órfão (só existiam no bundle React).
  "/servicos/manutencao-de-notebook": [
    "/problemas/notebook-nao-liga",
    "/servicos",
    "/servicos/formatacao",
    "/servicos/upgrade-ssd-ram",
    "/precos-e-politicas",
    "/contato",
  ],
  "/servicos/manutencao-de-computador": [
    "/problemas/computador-lento",
    "/servicos",
    "/servicos/formatacao",
    "/servicos/upgrade-ssd-ram",
    "/precos-e-politicas",
    "/contato",
  ],
  "/servicos/suporte-tecnico-empresarial": [
    "/empresa-de-ti-curitiba",
    "/servicos/manutencao-preventiva-empresas",
    "/servicos/backup-para-empresas",
    "/servicos/redes-e-wifi",
    "/atendimento-remoto",
    "/precos-e-politicas",
  ],
  "/servicos/manutencao-preventiva-empresas": [
    "/servicos/suporte-tecnico-empresarial",
    "/servicos/backup-para-empresas",
    "/servicos/manutencao-de-computador",
    "/empresa-de-ti-curitiba",
    "/como-funciona",
    "/precos-e-politicas",
  ],
  "/servicos/backup-para-empresas": [
    "/servicos/recuperacao-de-dados",
    "/servicos/suporte-tecnico-empresarial",
    "/servicos/manutencao-preventiva-empresas",
    "/empresa-de-ti-curitiba",
    "/como-funciona",
    "/precos-e-politicas",
  ],
  "/servicos/suporte-home-office": [
    "/atendimento-remoto",
    "/atendimento-domicilio",
    "/servicos/redes-e-wifi",
    "/servicos/backup-para-empresas",
    "/seguranca-dos-dados",
    "/precos-e-politicas",
  ],
  "/servicos/redes-e-wifi": [
    "/servicos/suporte-tecnico-empresarial",
    "/empresa-de-ti-curitiba",
    "/servicos/manutencao-preventiva-empresas",
    "/atendimento-domicilio",
    "/precos-e-politicas",
    "/servicos",
  ],
};

/** Saídas obrigatórias das modalidades e hubs institucionais (onda 3E). */
const PAGE_LINKS = {
  "/atendimento-remoto": [
    "/servicos/suporte-home-office",
    "/servicos/suporte-tecnico-empresarial",
    "/seguranca-dos-dados",
    "/como-funciona",
    "/precos-e-politicas",
    "/atendimento-domicilio",
  ],
  "/atendimento-domicilio": [
    "/equipamentos-atendidos",
    "/servicos/suporte-home-office",
    "/como-funciona",
    "/precos-e-politicas",
    "/coleta-e-entrega",
    "/atendimento-remoto",
  ],
  "/equipamentos-atendidos": [
    "/servicos/manutencao-de-notebook",
    "/servicos/manutencao-de-computador",
    "/servicos/upgrade-ssd-ram",
    "/servicos/recuperacao-de-dados",
    "/servicos/redes-e-wifi",
    "/servicos/suporte-home-office",
  ],
  "/seguranca-dos-dados": [
    "/precos-e-politicas",
    "/servicos/formatacao",
    "/servicos/recuperacao-de-dados",
    "/servicos/backup-para-empresas",
    "/atendimento-remoto",
    "/como-funciona",
  ],
};

export function linksFor(path) {
  if (PAGE_LINKS[path]) {
    return [...new Set(PAGE_LINKS[path].filter((p) => p !== path && BY_PATH.has(p)))];
  }
  const fam = familyOf(path);
  let out = [];
  switch (fam) {
    case "home":
      out = ["/servicos", "/tecnico-informatica-curitiba", "/como-funciona", "/precos-e-politicas", "/contato"];
      break;
    case "hub-servicos":
      out = [
        ...siblings(SERVICOS, path, 3),
        "/problemas/notebook-nao-liga",
        "/problemas/computador-lento",
        "/precos-e-politicas",
        "/contato",
      ];
      break;
    case "servico-bairro": {
      const parent = `/servicos/${path.split("/")[2]}`;
      out = [
        parent,
        "/tecnico-informatica-curitiba",
        ...siblings(SERVICO_BAIRRO_PATHS, path, 2),
        "/atendimento-domicilio",
        "/precos-e-politicas",
      ];
      break;
    }
    case "problema":
      // Cada sintoma aponta para os serviços que realmente resolvem aquele cenário.
      out = PROBLEMA_LINKS[path] ?? [
        "/servicos/manutencao-de-notebook",
        "/precos-e-politicas",
        "/como-funciona",
        "/quando-nao-compensa",
        "/servicos",
      ];
      break;
    case "servico":
      out = SERVICO_LINKS[path] ?? ["/servicos", ...siblings(SERVICOS, path, 3), "/precos-e-politicas", "/contato"];
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
      out = [
        "/servicos/suporte-tecnico-empresarial",
        "/servicos/manutencao-preventiva-empresas",
        "/servicos/backup-para-empresas",
        "/servicos/redes-e-wifi",
        "/atendimento-remoto",
        "/precos-e-politicas",
      ];
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
  return [...new Set(out.filter((p) => p !== path && BY_PATH.has(p)))].slice(0, PROBLEMA_LINKS[path]?.length ?? SERVICO_LINKS[path]?.length ?? 6);
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
  const faqHtml = route.faq?.length
    ? `<h2 style="font-size:1.1rem;margin:24px 0 8px">Perguntas frequentes</h2>` +
      route.faq
        .map(
          (f) =>
            `<h3 style="font-size:1rem;margin:14px 0 4px">${esc(f.pergunta)}</h3><p style="margin:0;font-size:.95rem;opacity:.94">${esc(f.resposta)}</p>`,
        )
        .join("")
    : "";
  const offersHtml = route.offers?.length
    ? `<h2 style="font-size:1.1rem;margin:24px 0 8px">Valores de referência</h2>` +
      `<ul style="line-height:1.8;padding-left:20px;font-size:.95rem">` +
      route.offers
        .map(
          (o) =>
            `<li><strong>${esc(o.nome)}</strong> — ${esc(o.valor)}${o.obs ? ` <span style="opacity:.85">(${esc(o.obs)})</span>` : ""}</li>`,
        )
        .join("") +
      `</ul>`
    : "";
  const blocosHtml = route.blocos?.length
    ? route.blocos
        .map(
          (b) =>
            `<h2 style="font-size:1.1rem;margin:24px 0 8px">${esc(b.titulo)}</h2>` +
            b.paragrafos.map((t) => `<p style="margin:0 0 10px;font-size:.95rem;opacity:.94">${esc(t)}</p>`).join(""),
        )
        .join("")
    : "";
  const subHtml = route.subtitulo
    ? `<p style="margin:0 0 16px;font-size:.98rem;opacity:.92">${esc(route.subtitulo)}</p>`
    : "";
  const linksHtml = links
    .map((p) => `<li><a href="${p}" style="color:#7fd4ec">${esc(labelFor(p))}</a></li>`)
    .join("");

  return `
        <div style="min-height:100vh;background:linear-gradient(155deg,hsl(205,58%,15%) 0%,hsl(200,45%,22%) 100%);color:#fff;padding:32px 20px;font-family:Arial,sans-serif;max-width:820px;margin:0 auto">
          <img src="/logo.webp" alt="Técnico em Curitiba" width="240" height="78" style="max-width:60vw;height:auto" />
          <nav aria-label="Trilha de navegação" style="font-size:.85rem;opacity:.9;margin:16px 0">${crumbHtml}</nav>
          <h1 style="font-size:1.6rem;line-height:1.25;margin:8px 0 12px">${esc(h1)}</h1>
          <p style="margin:0 0 16px;font-size:1rem;opacity:.94">${esc(route.description)}</p>
          ${subHtml}
          <p style="margin:0 0 20px"><a href="${waLink(route)}" data-cta-location="noscript_static" style="background:#16a34a;color:#fff;font-weight:bold;padding:14px 26px;border-radius:12px;text-decoration:none;display:inline-block">Falar no WhatsApp</a></p>
          ${blocosHtml}
          ${offersHtml}
          ${faqHtml}
          <h2 style="font-size:1.1rem;margin:24px 0 8px">Páginas relacionadas</h2>
          <ul style="line-height:1.9;padding-left:20px">${linksHtml}</ul>
          <h2 style="font-size:1.1rem;margin:24px 0 8px">Identificação e responsabilidade técnica</h2>
          <p style="margin:0 0 8px;font-size:.9rem;opacity:.9">${esc(SITE_CONFIG.brandName)} — atuação em informática desde ${esc(SITE_CONFIG.foundedYear)} em Curitiba e região metropolitana. Atendimento exclusivamente pelo WhatsApp.</p>
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

/** Nó Service padrão da rota (provider sempre = Organization oficial). */
function serviceNode(route, { name } = {}) {
  const url = `${SITE}${route.path === "/" ? "/" : route.path}`;
  const label = name ?? h1For(route);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: label,
    serviceType: label,
    description: route.description,
    url,
    areaServed: SITE_CONFIG.serviceArea.map((n) => ({ "@type": "City", name: n })),
    provider: { "@id": `${SITE}/#organization` },
    ...(route.offers?.length
      ? {
          offers: route.offers.map((o) => ({
            "@type": "Offer",
            name: o.nome,
            price: o.price,
            priceCurrency: o.priceCurrency,
            availability: "https://schema.org/InStock",
            url,
          })),
        }
      : {}),
  };
}

/** Rotas P0 fora das famílias de serviço que também precisam de Service. */
const EXTRA_SERVICE_PATHS = new Set(["/", "/precos-e-politicas"]);

/** JSON-LD estático da rota — um nó lógico por entidade. */
export function jsonLdFor(route) {
  const path = route.path;
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const fam = familyOf(path);
  const out = [organization(), website()];

  if (fam === "home") {
    out.push(localBusiness("/", { description: route.description }));
    out.push(
      serviceNode(route, { name: "Assistência técnica de informática em Curitiba e região" }),
    );
    if (route.faq?.length) {
      out.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: route.faq.map((f) => ({
          "@type": "Question",
          name: f.pergunta,
          acceptedAnswer: { "@type": "Answer", text: f.resposta },
        })),
      });
    }
    return out;
  }

  if (
    fam === "servico" ||
    fam === "servico-bairro" ||
    fam === "hub-servicos" ||
    fam === "empresa" ||
    fam === "modalidade" ||
    fam === "cidade-mae" ||
    EXTRA_SERVICE_PATHS.has(path)
  ) {
    out.push(serviceNode(route));
  }

  const hasService = out.some((n) => n["@type"] === "Service");
  if (fam === "bairro" || fam === "cidade" || fam === "cidade-mae" || fam === "modalidade") {
    const local =
      fam === "cidade" || fam === "bairro"
        ? [h1For(route).replace(/^Técnico (de Informática )?(em|no|na) /i, "").split("(")[0].split("|")[0].trim()]
        : undefined;
    out.push(localBusiness(path, { name: h1For(route), description: route.description, areaServed: local }));
  } else if (!hasService) {
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
  if (route.faq?.length) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: route.faq.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    });
  }
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
