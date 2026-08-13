// @ts-nocheck
// Global UTM injector for WhatsApp links (wa.me / api.whatsapp.com).
// Runs once on mount; intercepts clicks and appends utm_source/medium/campaign
// derived from the current page so GA4/Ads can attribute lead origin.
function stryNS_9fa48() {
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
import { DEFAULT_UTM_SOURCE, campaignFromPath, normalizeTrackingLabel, normalizeUtmMedium, routeTypeFromPath } from '@/lib/trackingTaxonomy';
import { geoSuggestion } from '@/lib/geoContext';
import { MODALIDADES, REGRA_CANCELAMENTO, TERMOS_URL } from '@/lib/precosConfig';
import { siteConfig } from '@/lib/siteConfig';

// Bloco comercial padrão anexado a toda mensagem de WhatsApp: modalidade,
// valor, condições e local (quando detectado). Fonte única: precosConfig.
const CONDICOES_MARK = stryMutAct_9fa48("355") ? "" : (stryCov_9fa48("355"), 'Modalidades e valores:');
function buildCondicoesBlock(): string {
  if (stryMutAct_9fa48("356")) {
    {}
  } else {
    stryCov_9fa48("356");
    const linhas = MODALIDADES.map(stryMutAct_9fa48("357") ? () => undefined : (stryCov_9fa48("357"), m => stryMutAct_9fa48("358") ? `` : (stryCov_9fa48("358"), `• ${m.titulo}: ${m.valorLabel} (${m.unidade})`)));
    const local = geoSuggestion();
    return stryMutAct_9fa48("359") ? [CONDICOES_MARK, ...linhas, 'Peças, componentes e licenças não inclusos.', `Cancelamento: ${REGRA_CANCELAMENTO}`, `Condições completas: ${siteConfig.baseUrl}${TERMOS_URL}`, local ? `Local: ${local}` : ''].join('\n') : (stryCov_9fa48("359"), (stryMutAct_9fa48("360") ? [] : (stryCov_9fa48("360"), [CONDICOES_MARK, ...linhas, stryMutAct_9fa48("361") ? "" : (stryCov_9fa48("361"), 'Peças, componentes e licenças não inclusos.'), stryMutAct_9fa48("362") ? `` : (stryCov_9fa48("362"), `Cancelamento: ${REGRA_CANCELAMENTO}`), stryMutAct_9fa48("363") ? `` : (stryCov_9fa48("363"), `Condições completas: ${siteConfig.baseUrl}${TERMOS_URL}`), local ? stryMutAct_9fa48("364") ? `` : (stryCov_9fa48("364"), `Local: ${local}`) : stryMutAct_9fa48("365") ? "Stryker was here!" : (stryCov_9fa48("365"), '')])).filter(Boolean).join(stryMutAct_9fa48("366") ? "" : (stryCov_9fa48("366"), '\n')));
  }
}
const WA_HOSTS = stryMutAct_9fa48("367") ? [] : (stryCov_9fa48("367"), [stryMutAct_9fa48("368") ? "" : (stryCov_9fa48("368"), "wa.me"), stryMutAct_9fa48("369") ? "" : (stryCov_9fa48("369"), "api.whatsapp.com")]);
function isWhatsAppUrl(href: string): boolean {
  if (stryMutAct_9fa48("370")) {
    {}
  } else {
    stryCov_9fa48("370");
    try {
      if (stryMutAct_9fa48("371")) {
        {}
      } else {
        stryCov_9fa48("371");
        const u = new URL(href, window.location.origin);
        return stryMutAct_9fa48("372") ? WA_HOSTS.every(h => u.hostname.endsWith(h)) : (stryCov_9fa48("372"), WA_HOSTS.some(stryMutAct_9fa48("373") ? () => undefined : (stryCov_9fa48("373"), h => stryMutAct_9fa48("374") ? u.hostname.startsWith(h) : (stryCov_9fa48("374"), u.hostname.endsWith(h)))));
      }
    } catch {
      if (stryMutAct_9fa48("375")) {
        {}
      } else {
        stryCov_9fa48("375");
        return stryMutAct_9fa48("376") ? true : (stryCov_9fa48("376"), false);
      }
    }
  }
}
function deriveCampaign(): string {
  if (stryMutAct_9fa48("377")) {
    {}
  } else {
    stryCov_9fa48("377");
    return campaignFromPath(window.location.pathname);
  }
}
function deriveMedium(el: HTMLElement | null): string {
  if (stryMutAct_9fa48("378")) {
    {}
  } else {
    stryCov_9fa48("378");
    if (stryMutAct_9fa48("381") ? false : stryMutAct_9fa48("380") ? true : stryMutAct_9fa48("379") ? el : (stryCov_9fa48("379", "380", "381"), !el)) return stryMutAct_9fa48("382") ? "" : (stryCov_9fa48("382"), "cta");
    const cls = stryMutAct_9fa48("383") ? (el.closest("[data-wa-medium]") as HTMLElement | null).dataset.waMedium : (stryCov_9fa48("383"), (el.closest("[data-wa-medium]") as HTMLElement | null)?.dataset.waMedium);
    if (stryMutAct_9fa48("385") ? false : stryMutAct_9fa48("384") ? true : (stryCov_9fa48("384", "385"), cls)) return normalizeUtmMedium(cls);
    // Heuristics by location
    if (stryMutAct_9fa48("387") ? false : stryMutAct_9fa48("386") ? true : (stryCov_9fa48("386", "387"), el.closest(stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), "header")))) return stryMutAct_9fa48("389") ? "" : (stryCov_9fa48("389"), "header");
    if (stryMutAct_9fa48("391") ? false : stryMutAct_9fa48("390") ? true : (stryCov_9fa48("390", "391"), el.closest(stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "footer")))) return stryMutAct_9fa48("393") ? "" : (stryCov_9fa48("393"), "footer");
    if (stryMutAct_9fa48("396") ? el.closest("[class*='float']") && el.closest("[aria-label*='WhatsApp']") : stryMutAct_9fa48("395") ? false : stryMutAct_9fa48("394") ? true : (stryCov_9fa48("394", "395", "396"), el.closest(stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), "[class*='float']")) || el.closest(stryMutAct_9fa48("398") ? "" : (stryCov_9fa48("398"), "[aria-label*='WhatsApp']")))) return stryMutAct_9fa48("399") ? "" : (stryCov_9fa48("399"), "float");
    return stryMutAct_9fa48("400") ? "" : (stryCov_9fa48("400"), "cta");
  }
}

// Fonte do clique (substitui o antigo "Ligar Agora"): rótulo declarado no
// próprio CTA via [data-wa-source]. Vira utm_source quando o visitante não
// chegou por uma campanha externa (que sempre tem prioridade de atribuição).
function deriveSource(el: HTMLElement | null): string | null {
  if (stryMutAct_9fa48("401")) {
    {}
  } else {
    stryCov_9fa48("401");
    if (stryMutAct_9fa48("404") ? false : stryMutAct_9fa48("403") ? true : stryMutAct_9fa48("402") ? el : (stryCov_9fa48("402", "403", "404"), !el)) return null;
    const src = stryMutAct_9fa48("405") ? (el.closest("[data-wa-source]") as HTMLElement | null).dataset.waSource : (stryCov_9fa48("405"), (el.closest("[data-wa-source]") as HTMLElement | null)?.dataset.waSource);
    return (stryMutAct_9fa48("408") ? src || src.trim() : stryMutAct_9fa48("407") ? false : stryMutAct_9fa48("406") ? true : (stryCov_9fa48("406", "407", "408"), src && (stryMutAct_9fa48("409") ? src : (stryCov_9fa48("409"), src.trim())))) ? normalizeTrackingLabel(src) : null;
  }
}
function readEntryUtms(): Record<string, string> {
  if (stryMutAct_9fa48("410")) {
    {}
  } else {
    stryCov_9fa48("410");
    try {
      if (stryMutAct_9fa48("411")) {
        {}
      } else {
        stryCov_9fa48("411");
        const raw = sessionStorage.getItem(stryMutAct_9fa48("412") ? "" : (stryCov_9fa48("412"), "utm_payload_v1"));
        return raw ? JSON.parse(raw) as Record<string, string> : {};
      }
    } catch {
      if (stryMutAct_9fa48("413")) {
        {}
      } else {
        stryCov_9fa48("413");
        return {};
      }
    }
  }
}
function withUtm(href: string, medium: string, campaign: string, location: string, source: string | null): string {
  if (stryMutAct_9fa48("414")) {
    {}
  } else {
    stryCov_9fa48("414");
    try {
      if (stryMutAct_9fa48("415")) {
        {}
      } else {
        stryCov_9fa48("415");
        const u = new URL(href, window.location.origin);
        const text = u.searchParams.get(stryMutAct_9fa48("416") ? "" : (stryCov_9fa48("416"), "text"));

        // 1) Propaga UTMs originais da entrada do visitante (atribuição da campanha).
        const entry = readEntryUtms();
        for (const [k, v] of Object.entries(entry)) {
          if (stryMutAct_9fa48("417")) {
            {}
          } else {
            stryCov_9fa48("417");
            if (stryMutAct_9fa48("420") ? v || !u.searchParams.has(k) : stryMutAct_9fa48("419") ? false : stryMutAct_9fa48("418") ? true : (stryCov_9fa48("418", "419", "420"), v && (stryMutAct_9fa48("421") ? u.searchParams.has(k) : (stryCov_9fa48("421"), !u.searchParams.has(k))))) u.searchParams.set(k, v);
          }
        }

        // 2) Fallbacks por local de clique (não sobrescreve UTMs de campanha).
        //    data-wa-source define a origem site-side (ex.: whatsapp_cta).
        if (stryMutAct_9fa48("424") ? false : stryMutAct_9fa48("423") ? true : stryMutAct_9fa48("422") ? u.searchParams.has("utm_source") : (stryCov_9fa48("422", "423", "424"), !u.searchParams.has(stryMutAct_9fa48("425") ? "" : (stryCov_9fa48("425"), "utm_source")))) u.searchParams.set(stryMutAct_9fa48("426") ? "" : (stryCov_9fa48("426"), "utm_source"), stryMutAct_9fa48("429") ? source && DEFAULT_UTM_SOURCE : stryMutAct_9fa48("428") ? false : stryMutAct_9fa48("427") ? true : (stryCov_9fa48("427", "428", "429"), source || DEFAULT_UTM_SOURCE));
        if (stryMutAct_9fa48("432") ? false : stryMutAct_9fa48("431") ? true : stryMutAct_9fa48("430") ? u.searchParams.has("utm_medium") : (stryCov_9fa48("430", "431", "432"), !u.searchParams.has(stryMutAct_9fa48("433") ? "" : (stryCov_9fa48("433"), "utm_medium")))) u.searchParams.set(stryMutAct_9fa48("434") ? "" : (stryCov_9fa48("434"), "utm_medium"), normalizeUtmMedium(medium));
        if (stryMutAct_9fa48("437") ? false : stryMutAct_9fa48("436") ? true : stryMutAct_9fa48("435") ? u.searchParams.has("utm_campaign") : (stryCov_9fa48("435", "436", "437"), !u.searchParams.has(stryMutAct_9fa48("438") ? "" : (stryCov_9fa48("438"), "utm_campaign")))) u.searchParams.set(stryMutAct_9fa48("439") ? "" : (stryCov_9fa48("439"), "utm_campaign"), campaign);

        // 3) Marca o local de clique e o tipo de rota (home/pf/pj/servico/local).
        u.searchParams.set(stryMutAct_9fa48("440") ? "" : (stryCov_9fa48("440"), "click_location"), normalizeTrackingLabel(location));
        u.searchParams.set(stryMutAct_9fa48("441") ? "" : (stryCov_9fa48("441"), "route_type"), routeTypeFromPath(window.location.pathname));

        // 4) Pré-preenche a mensagem com modalidade, valor, condições e local.
        //    Só anexa uma vez (marcador CONDICOES_MARK) e nunca remove o texto do CTA.
        if (stryMutAct_9fa48("444") ? text === null : stryMutAct_9fa48("443") ? false : stryMutAct_9fa48("442") ? true : (stryCov_9fa48("442", "443", "444"), text !== null)) {
          if (stryMutAct_9fa48("445")) {
            {}
          } else {
            stryCov_9fa48("445");
            const enriched = text.includes(CONDICOES_MARK) ? text : stryMutAct_9fa48("446") ? `` : (stryCov_9fa48("446"), `${stryMutAct_9fa48("447") ? text : (stryCov_9fa48("447"), text.trim())}\n\n${buildCondicoesBlock()}`);
            u.searchParams.delete(stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "text"));
            u.searchParams.set(stryMutAct_9fa48("449") ? "" : (stryCov_9fa48("449"), "text"), enriched);
          }
        }
        return u.toString();
      }
    } catch {
      if (stryMutAct_9fa48("450")) {
        {}
      } else {
        stryCov_9fa48("450");
        return href;
      }
    }
  }
}

// Validação obrigatória: garante que UTMs e click_location estão presentes
// antes do clique sair para o WhatsApp. Em modo debug, loga no console.
const REQUIRED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "click_location"] as const;
export type WaUtmAudit = {
  href: string;
  params: Record<string, string | null>;
  missing: string[];
  ok: boolean;
};
export function auditWhatsAppUrl(href: string): WaUtmAudit {
  if (stryMutAct_9fa48("451")) {
    {}
  } else {
    stryCov_9fa48("451");
    const params: Record<string, string | null> = {};
    let url: URL | null = null;
    try {
      if (stryMutAct_9fa48("452")) {
        {}
      } else {
        stryCov_9fa48("452");
        url = new URL(href, (stryMutAct_9fa48("455") ? typeof window === "undefined" : stryMutAct_9fa48("454") ? false : stryMutAct_9fa48("453") ? true : (stryCov_9fa48("453", "454", "455"), typeof window !== (stryMutAct_9fa48("456") ? "" : (stryCov_9fa48("456"), "undefined")))) ? window.location.origin : stryMutAct_9fa48("457") ? "" : (stryCov_9fa48("457"), "https://x"));
      }
    } catch {
      if (stryMutAct_9fa48("458")) {
        {}
      } else {
        stryCov_9fa48("458");
        return stryMutAct_9fa48("459") ? {} : (stryCov_9fa48("459"), {
          href,
          params,
          missing: stryMutAct_9fa48("460") ? [] : (stryCov_9fa48("460"), [...REQUIRED_PARAMS]),
          ok: stryMutAct_9fa48("461") ? true : (stryCov_9fa48("461"), false)
        });
      }
    }
    const missing: string[] = stryMutAct_9fa48("462") ? ["Stryker was here"] : (stryCov_9fa48("462"), []);
    for (const k of REQUIRED_PARAMS) {
      if (stryMutAct_9fa48("463")) {
        {}
      } else {
        stryCov_9fa48("463");
        const v = url.searchParams.get(k);
        params[k] = v;
        if (stryMutAct_9fa48("466") ? false : stryMutAct_9fa48("465") ? true : stryMutAct_9fa48("464") ? v : (stryCov_9fa48("464", "465", "466"), !v)) missing.push(k);
      }
    }
    return stryMutAct_9fa48("467") ? {} : (stryCov_9fa48("467"), {
      href: url.toString(),
      params,
      missing,
      ok: stryMutAct_9fa48("470") ? missing.length !== 0 : stryMutAct_9fa48("469") ? false : stryMutAct_9fa48("468") ? true : (stryCov_9fa48("468", "469", "470"), missing.length === 0)
    });
  }
}
function isDebugEnabled(): boolean {
  if (stryMutAct_9fa48("471")) {
    {}
  } else {
    stryCov_9fa48("471");
    if (stryMutAct_9fa48("474") ? typeof window !== "undefined" : stryMutAct_9fa48("473") ? false : stryMutAct_9fa48("472") ? true : (stryCov_9fa48("472", "473", "474"), typeof window === (stryMutAct_9fa48("475") ? "" : (stryCov_9fa48("475"), "undefined")))) return stryMutAct_9fa48("476") ? true : (stryCov_9fa48("476"), false);
    try {
      if (stryMutAct_9fa48("477")) {
        {}
      } else {
        stryCov_9fa48("477");
        if (stryMutAct_9fa48("480") ? (import.meta as any).env.DEV : stryMutAct_9fa48("479") ? false : stryMutAct_9fa48("478") ? true : (stryCov_9fa48("478", "479", "480"), (import.meta as any).env?.DEV)) return stryMutAct_9fa48("481") ? false : (stryCov_9fa48("481"), true);
        const sp = new URLSearchParams(window.location.search);
        if (stryMutAct_9fa48("484") ? sp.get("debug_utm") !== "1" : stryMutAct_9fa48("483") ? false : stryMutAct_9fa48("482") ? true : (stryCov_9fa48("482", "483", "484"), sp.get(stryMutAct_9fa48("485") ? "" : (stryCov_9fa48("485"), "debug_utm")) === (stryMutAct_9fa48("486") ? "" : (stryCov_9fa48("486"), "1")))) return stryMutAct_9fa48("487") ? false : (stryCov_9fa48("487"), true);
        if (stryMutAct_9fa48("490") ? window.localStorage.getItem("debug_utm") !== "1" : stryMutAct_9fa48("489") ? false : stryMutAct_9fa48("488") ? true : (stryCov_9fa48("488", "489", "490"), window.localStorage.getItem(stryMutAct_9fa48("491") ? "" : (stryCov_9fa48("491"), "debug_utm")) === (stryMutAct_9fa48("492") ? "" : (stryCov_9fa48("492"), "1")))) return stryMutAct_9fa48("493") ? false : (stryCov_9fa48("493"), true);
      }
    } catch {/* noop */}
    return stryMutAct_9fa48("494") ? true : (stryCov_9fa48("494"), false);
  }
}
export function initWhatsAppUtm() {
  if (stryMutAct_9fa48("495")) {
    {}
  } else {
    stryCov_9fa48("495");
    if (stryMutAct_9fa48("498") ? typeof window !== "undefined" : stryMutAct_9fa48("497") ? false : stryMutAct_9fa48("496") ? true : (stryCov_9fa48("496", "497", "498"), typeof window === (stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), "undefined")))) return;
    document.addEventListener(stryMutAct_9fa48("500") ? "" : (stryCov_9fa48("500"), "click"), e => {
      if (stryMutAct_9fa48("501")) {
        {}
      } else {
        stryCov_9fa48("501");
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest("a") as HTMLAnchorElement | null;
        if (stryMutAct_9fa48("504") ? false : stryMutAct_9fa48("503") ? true : stryMutAct_9fa48("502") ? anchor : (stryCov_9fa48("502", "503", "504"), !anchor)) return;
        const href = anchor.getAttribute(stryMutAct_9fa48("505") ? "" : (stryCov_9fa48("505"), "href"));
        if (stryMutAct_9fa48("508") ? !href && !isWhatsAppUrl(href) : stryMutAct_9fa48("507") ? false : stryMutAct_9fa48("506") ? true : (stryCov_9fa48("506", "507", "508"), (stryMutAct_9fa48("509") ? href : (stryCov_9fa48("509"), !href)) || (stryMutAct_9fa48("510") ? isWhatsAppUrl(href) : (stryCov_9fa48("510"), !isWhatsAppUrl(href))))) return;
        if (stryMutAct_9fa48("513") ? anchor.dataset.utmApplied !== "1" : stryMutAct_9fa48("512") ? false : stryMutAct_9fa48("511") ? true : (stryCov_9fa48("511", "512", "513"), anchor.dataset.utmApplied === (stryMutAct_9fa48("514") ? "" : (stryCov_9fa48("514"), "1")))) return;
        const medium = deriveMedium(anchor);
        const campaign = deriveCampaign();
        const source = deriveSource(anchor);
        const location = stryMutAct_9fa48("517") ? ((anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation || anchor.dataset.ctaLocation || source) && medium : stryMutAct_9fa48("516") ? false : stryMutAct_9fa48("515") ? true : (stryCov_9fa48("515", "516", "517"), (stryMutAct_9fa48("519") ? ((anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation || anchor.dataset.ctaLocation) && source : stryMutAct_9fa48("518") ? false : (stryCov_9fa48("518", "519"), (stryMutAct_9fa48("521") ? (anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation && anchor.dataset.ctaLocation : stryMutAct_9fa48("520") ? false : (stryCov_9fa48("520", "521"), (stryMutAct_9fa48("522") ? (anchor.closest("[data-cta-location]") as HTMLElement | null).dataset.ctaLocation : (stryCov_9fa48("522"), (anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation)) || anchor.dataset.ctaLocation)) || source)) || medium);
        anchor.href = withUtm(anchor.href, medium, campaign, location, source);
        anchor.dataset.utmApplied = stryMutAct_9fa48("523") ? "" : (stryCov_9fa48("523"), "1");

        // Validação + log debug — antes do navegador seguir o link.
        const audit = auditWhatsAppUrl(anchor.href);
        if (stryMutAct_9fa48("525") ? false : stryMutAct_9fa48("524") ? true : (stryCov_9fa48("524", "525"), isDebugEnabled())) {
          if (stryMutAct_9fa48("526")) {
            {}
          } else {
            stryCov_9fa48("526");
            const style = audit.ok ? stryMutAct_9fa48("527") ? "" : (stryCov_9fa48("527"), "color:#16a34a;font-weight:bold") : stryMutAct_9fa48("528") ? "" : (stryCov_9fa48("528"), "color:#dc2626;font-weight:bold");
            // eslint-disable-next-line no-console
            console.groupCollapsed(stryMutAct_9fa48("529") ? `` : (stryCov_9fa48("529"), `%c[WA UTM] ${audit.ok ? stryMutAct_9fa48("530") ? "" : (stryCov_9fa48("530"), "OK") : stryMutAct_9fa48("531") ? "" : (stryCov_9fa48("531"), "FALTANDO")} → ${location}`), style);
            // eslint-disable-next-line no-console
            console.log(stryMutAct_9fa48("532") ? "" : (stryCov_9fa48("532"), "href:"), audit.href);
            // eslint-disable-next-line no-console
            console.table(audit.params);
            if (stryMutAct_9fa48("535") ? false : stryMutAct_9fa48("534") ? true : stryMutAct_9fa48("533") ? audit.ok : (stryCov_9fa48("533", "534", "535"), !audit.ok)) {
              if (stryMutAct_9fa48("536")) {
                {}
              } else {
                stryCov_9fa48("536");
                // eslint-disable-next-line no-console
                console.warn(stryMutAct_9fa48("537") ? "" : (stryCov_9fa48("537"), "Parâmetros ausentes:"), audit.missing);
              }
            }
            // eslint-disable-next-line no-console
            console.groupEnd();
          }
        } else if (stryMutAct_9fa48("540") ? false : stryMutAct_9fa48("539") ? true : stryMutAct_9fa48("538") ? audit.ok : (stryCov_9fa48("538", "539", "540"), !audit.ok)) {
          if (stryMutAct_9fa48("541")) {
            {}
          } else {
            stryCov_9fa48("541");
            // Sempre avisa em produção se algo crítico faltar.
            // eslint-disable-next-line no-console
            console.warn(stryMutAct_9fa48("542") ? "" : (stryCov_9fa48("542"), "[WA UTM] link sem parâmetros obrigatórios"), audit.missing, audit.href);
          }
        }

        // Expõe último audit para inspeção manual / e2e.
        try {
          if (stryMutAct_9fa48("543")) {
            {}
          } else {
            stryCov_9fa48("543");
            (window as any).__lastWaUtmAudit = audit;
            window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("544") ? "" : (stryCov_9fa48("544"), "wa-utm:audit"), stryMutAct_9fa48("545") ? {} : (stryCov_9fa48("545"), {
              detail: audit
            })));
          }
        } catch {/* noop */}
      }
    }, stryMutAct_9fa48("546") ? false : (stryCov_9fa48("546"), true));
  }
}