// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// TAXONOMIA ÚNICA DE TRACKING (GA4 + Google Ads + UTMs)
// Fonte única de verdade para nomes de eventos, utm_source/medium
// e normalização de `click_location`. Qualquer novo CTA deve usar
// estas constantes — nomes livres quebram os relatórios.
// ─────────────────────────────────────────────────────────────

/** Nomes canônicos de eventos GA4. */function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export const GA4_EVENTS = {
  ctaClick: "cta_click",
  whatsapp: "click_whatsapp",
  call: "click_call",
  lead: "generate_lead",
  adsConversion: "conversion",
  funnelOpen: "funnel_open",
  funnelSubmit: "funnel_submit",
  faqToggle: "faq_toggle",
  /** Clique na âncora da pergunta (deep link #faq-N). */
  faqAnchor: "faq_anchor_click",
  /** Clique em link interno contextual dentro de uma resposta da FAQ. */
  faqInternalLink: "faq_internal_link",
  /** Marco de leitura (25/50/75/100%) de uma seção específica da FAQ. */
  faqSectionDepth: "faq_section_depth",
  fileDownload: "file_download"
} as const;

/** utm_source padrão quando o visitante não veio de campanha externa. */
export const DEFAULT_UTM_SOURCE = stryMutAct_9fa48("251") ? "" : (stryCov_9fa48("251"), "site");

/** utm_medium canônicos — todo CTA cai em um destes. */
export const UTM_MEDIUMS = ["header", "footer", "float", "hero", "modal", "funnel", "cta"] as const;
export type UtmMedium = (typeof UTM_MEDIUMS)[number];

/** Normaliza qualquer rótulo para snake_case ASCII estável. */
export function normalizeTrackingLabel(raw: string | undefined | null): string {
  if (stryMutAct_9fa48("252")) {
    {}
  } else {
    stryCov_9fa48("252");
    if (stryMutAct_9fa48("255") ? false : stryMutAct_9fa48("254") ? true : stryMutAct_9fa48("253") ? raw : (stryCov_9fa48("253", "254", "255"), !raw)) return stryMutAct_9fa48("256") ? "" : (stryCov_9fa48("256"), "desconhecido");
    return stryMutAct_9fa48("259") ? raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) && "desconhecido" : stryMutAct_9fa48("258") ? false : stryMutAct_9fa48("257") ? true : (stryCov_9fa48("257", "258", "259"), (stryMutAct_9fa48("261") ? raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) : stryMutAct_9fa48("260") ? raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") : (stryCov_9fa48("260", "261"), raw.normalize(stryMutAct_9fa48("262") ? "" : (stryCov_9fa48("262"), "NFD")).replace(stryMutAct_9fa48("263") ? /[^\u0300-\u036f]/g : (stryCov_9fa48("263"), /[\u0300-\u036f]/g), stryMutAct_9fa48("264") ? "Stryker was here!" : (stryCov_9fa48("264"), "")).toLowerCase().replace(stryMutAct_9fa48("266") ? /[a-z0-9]+/g : stryMutAct_9fa48("265") ? /[^a-z0-9]/g : (stryCov_9fa48("265", "266"), /[^a-z0-9]+/g), stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), "_")).replace(stryMutAct_9fa48("271") ? /^_+|_$/g : stryMutAct_9fa48("270") ? /^_+|_+/g : stryMutAct_9fa48("269") ? /^_|_+$/g : stryMutAct_9fa48("268") ? /_+|_+$/g : (stryCov_9fa48("268", "269", "270", "271"), /^_+|_+$/g), stryMutAct_9fa48("272") ? "Stryker was here!" : (stryCov_9fa48("272"), "")).slice(0, 60))) || (stryMutAct_9fa48("273") ? "" : (stryCov_9fa48("273"), "desconhecido")));
  }
}

/** Garante que o medium enviado é um dos canônicos. */
export function normalizeUtmMedium(raw: string | undefined | null): UtmMedium {
  if (stryMutAct_9fa48("274")) {
    {}
  } else {
    stryCov_9fa48("274");
    const v = normalizeTrackingLabel(raw) as UtmMedium;
    return (UTM_MEDIUMS as readonly string[]).includes(v) ? v : stryMutAct_9fa48("275") ? "" : (stryCov_9fa48("275"), "cta");
  }
}

/** utm_campaign derivado da rota atual (ex.: servicos_formatacao). */
export function campaignFromPath(pathname: string): string {
  if (stryMutAct_9fa48("276")) {
    {}
  } else {
    stryCov_9fa48("276");
    const path = stryMutAct_9fa48("279") ? pathname.replace(/^\/+|\/+$/g, "") && "home" : stryMutAct_9fa48("278") ? false : stryMutAct_9fa48("277") ? true : (stryCov_9fa48("277", "278", "279"), pathname.replace(stryMutAct_9fa48("283") ? /^\/+|\/$/g : stryMutAct_9fa48("282") ? /^\/+|\/+/g : stryMutAct_9fa48("281") ? /^\/|\/+$/g : stryMutAct_9fa48("280") ? /\/+|\/+$/g : (stryCov_9fa48("280", "281", "282", "283"), /^\/+|\/+$/g), stryMutAct_9fa48("284") ? "Stryker was here!" : (stryCov_9fa48("284"), "")) || (stryMutAct_9fa48("285") ? "" : (stryCov_9fa48("285"), "home")));
    return stryMutAct_9fa48("288") ? normalizeTrackingLabel(path.replace(/\//g, "_")) && "home" : stryMutAct_9fa48("287") ? false : stryMutAct_9fa48("286") ? true : (stryCov_9fa48("286", "287", "288"), normalizeTrackingLabel(path.replace(/\//g, stryMutAct_9fa48("289") ? "" : (stryCov_9fa48("289"), "_"))) || (stryMutAct_9fa48("290") ? "" : (stryCov_9fa48("290"), "home")));
  }
}

/**
 * Tipo de rota para segmentar conversão real no GA4/Ads.
 * home | pf | pj | servico | local | institucional | outro
 */
export type RouteType = "home" | "pf" | "pj" | "servico" | "local" | "institucional" | "outro";
export function routeTypeFromPath(pathname: string): RouteType {
  if (stryMutAct_9fa48("291")) {
    {}
  } else {
    stryCov_9fa48("291");
    const p = stryMutAct_9fa48("294") ? (pathname || "/").toLowerCase().replace(/\/+$/, "") && "/" : stryMutAct_9fa48("293") ? false : stryMutAct_9fa48("292") ? true : (stryCov_9fa48("292", "293", "294"), (stryMutAct_9fa48("295") ? (pathname || "/").toUpperCase().replace(/\/+$/, "") : (stryCov_9fa48("295"), (stryMutAct_9fa48("298") ? pathname && "/" : stryMutAct_9fa48("297") ? false : stryMutAct_9fa48("296") ? true : (stryCov_9fa48("296", "297", "298"), pathname || (stryMutAct_9fa48("299") ? "" : (stryCov_9fa48("299"), "/")))).toLowerCase().replace(stryMutAct_9fa48("301") ? /\/$/ : stryMutAct_9fa48("300") ? /\/+/ : (stryCov_9fa48("300", "301"), /\/+$/), stryMutAct_9fa48("302") ? "Stryker was here!" : (stryCov_9fa48("302"), "")))) || (stryMutAct_9fa48("303") ? "" : (stryCov_9fa48("303"), "/")));
    if (stryMutAct_9fa48("306") ? p !== "/" : stryMutAct_9fa48("305") ? false : stryMutAct_9fa48("304") ? true : (stryCov_9fa48("304", "305", "306"), p === (stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), "/")))) return stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), "home");
    if (stryMutAct_9fa48("310") ? false : stryMutAct_9fa48("309") ? true : (stryCov_9fa48("309", "310"), /(empresa|empresas|corporativ|pj|suporte-empresas|ti-curitiba)/.test(p))) return stryMutAct_9fa48("311") ? "" : (stryCov_9fa48("311"), "pj");
    if (stryMutAct_9fa48("313") ? false : stryMutAct_9fa48("312") ? true : (stryCov_9fa48("312", "313"), /(pessoa-fisica|residencial|domicilio|pf)\b/.test(p))) return stryMutAct_9fa48("314") ? "" : (stryCov_9fa48("314"), "pf");
    if (stryMutAct_9fa48("316") ? false : stryMutAct_9fa48("315") ? true : (stryCov_9fa48("315", "316"), (stryMutAct_9fa48("317") ? /\/(servicos|servico|arrumar-pc|problemas|marcas|cftv)/ : (stryCov_9fa48("317"), /^\/(servicos|servico|arrumar-pc|problemas|marcas|cftv)/)).test(p))) return stryMutAct_9fa48("318") ? "" : (stryCov_9fa48("318"), "servico");
    if (stryMutAct_9fa48("320") ? false : stryMutAct_9fa48("319") ? true : (stryCov_9fa48("319", "320"), (stryMutAct_9fa48("322") ? /^\/(bairros|tecnico-informatica-|assistencia-tecnica-)/ : stryMutAct_9fa48("321") ? /\/(bairros?|tecnico-informatica-|assistencia-tecnica-)/ : (stryCov_9fa48("321", "322"), /^\/(bairros?|tecnico-informatica-|assistencia-tecnica-)/)).test(p))) return stryMutAct_9fa48("323") ? "" : (stryCov_9fa48("323"), "local");
    if (stryMutAct_9fa48("325") ? false : stryMutAct_9fa48("324") ? true : (stryCov_9fa48("324", "325"), (stryMutAct_9fa48("326") ? /\/(sobre|contato|faq|blog|precos-e-politicas|termos-e-condicoes|politica-privacidade|como-funciona|ordem-de-servico|seja-parceiro|status)/ : (stryCov_9fa48("326"), /^\/(sobre|contato|faq|blog|precos-e-politicas|termos-e-condicoes|politica-privacidade|como-funciona|ordem-de-servico|seja-parceiro|status)/)).test(p))) return stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), "institucional");
    return stryMutAct_9fa48("328") ? "" : (stryCov_9fa48("328"), "outro");
  }
}

/**
 * Faixa de viewport para segmentar conversão mobile nos relatórios GA4
 * (360 / 390 / 430 são os alvos de QA das páginas empresariais).
 */
export function viewportBucket(w: number): string {
  if (stryMutAct_9fa48("329")) {
    {}
  } else {
    stryCov_9fa48("329");
    if (stryMutAct_9fa48("332") ? false : stryMutAct_9fa48("331") ? true : stryMutAct_9fa48("330") ? w : (stryCov_9fa48("330", "331", "332"), !w)) return stryMutAct_9fa48("333") ? "" : (stryCov_9fa48("333"), "unknown");
    if (stryMutAct_9fa48("337") ? w > 375 : stryMutAct_9fa48("336") ? w < 375 : stryMutAct_9fa48("335") ? false : stryMutAct_9fa48("334") ? true : (stryCov_9fa48("334", "335", "336", "337"), w <= 375)) return stryMutAct_9fa48("338") ? "" : (stryCov_9fa48("338"), "360");
    if (stryMutAct_9fa48("342") ? w > 400 : stryMutAct_9fa48("341") ? w < 400 : stryMutAct_9fa48("340") ? false : stryMutAct_9fa48("339") ? true : (stryCov_9fa48("339", "340", "341", "342"), w <= 400)) return stryMutAct_9fa48("343") ? "" : (stryCov_9fa48("343"), "390");
    if (stryMutAct_9fa48("347") ? w >= 768 : stryMutAct_9fa48("346") ? w <= 768 : stryMutAct_9fa48("345") ? false : stryMutAct_9fa48("344") ? true : (stryCov_9fa48("344", "345", "346", "347"), w < 768)) return stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), "430");
    if (stryMutAct_9fa48("352") ? w >= 1024 : stryMutAct_9fa48("351") ? w <= 1024 : stryMutAct_9fa48("350") ? false : stryMutAct_9fa48("349") ? true : (stryCov_9fa48("349", "350", "351", "352"), w < 1024)) return stryMutAct_9fa48("353") ? "" : (stryCov_9fa48("353"), "tablet");
    return stryMutAct_9fa48("354") ? "" : (stryCov_9fa48("354"), "desktop");
  }
}