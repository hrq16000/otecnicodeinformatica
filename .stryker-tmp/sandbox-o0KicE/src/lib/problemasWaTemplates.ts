/**
 * TEMPLATES DE WHATSAPP DO CLUSTER /problemas
 *
 * Objetivo: nenhum clique de WhatsApp sai do cluster de sintomas sem
 *   (a) mensagem pré-preenchida com sintoma, dispositivo, bairro e urgência;
 *   (b) parâmetros de atribuição (rota, sintoma, seção e rolagem) para o
 *       GA4/Google Ads conseguirem separar conversão por contexto.
 *
 * Não entra dado pessoal na URL: só rota, sintoma, seção, rolagem e as
 * escolhas de triagem (dispositivo/urgência), que são categorias, não PII.
 */
// @ts-nocheck
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
import { whatsappLinkComContexto } from "@/lib/waContextLink";
import { sufixoVariante, varianteWa, type VarianteWa } from "@/lib/problemasWaVariants";
export type UrgenciaChave = "hoje" | "72h" | "sem-pressa";
export const DISPOSITIVOS = [{
  chave: "notebook",
  label: "Notebook"
}, {
  chave: "desktop",
  label: "PC de mesa"
}, {
  chave: "all-in-one",
  label: "All-in-one"
}, {
  chave: "rede",
  label: "Rede / Wi-Fi"
}, {
  chave: "tv",
  label: "TV"
}, {
  chave: "outro",
  label: "Outro equipamento"
}] as const;
export const URGENCIAS: {
  chave: UrgenciaChave;
  label: string;
  frase: string;
}[] = stryMutAct_9fa48("90") ? [] : (stryCov_9fa48("90"), [stryMutAct_9fa48("91") ? {} : (stryCov_9fa48("91"), {
  chave: stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "hoje"),
  label: stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), "Preciso hoje"),
  frase: stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "Urgência: preciso de atendimento ainda hoje.")
}), stryMutAct_9fa48("95") ? {} : (stryCov_9fa48("95"), {
  chave: stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), "72h"),
  label: stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "Nas próximas 72h"),
  frase: stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "Urgência: posso aguardar as próximas 72 horas úteis.")
}), stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
  chave: stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "sem-pressa"),
  label: stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), "Sem pressa"),
  frase: stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "Urgência: sem pressa, quero primeiro entender o problema.")
})]);
export interface ContextoTriagem {
  dispositivo?: string;
  bairro?: string;
  urgencia?: UrgenciaChave;
}
export interface ProblemaWaCtx extends ContextoTriagem {
  /** Slug do sintoma (ex.: tela-azul). */
  sintoma: string;
  /** Seção da página onde o CTA foi clicado (ex.: faq). */
  secao: string;
  /** Faixa de rolagem no momento do clique (0, 25, 50, 75, 100). */
  rolagem?: number;
  /** Complemento específico do CTA/pergunta. */
  complemento?: string;
  /** Variante do A/B da mensagem (default: variante persistida do visitante). */
  variante?: VarianteWa;
}
function rotuloDispositivo(chave?: string): string | undefined {
  if (stryMutAct_9fa48("103")) {
    {}
  } else {
    stryCov_9fa48("103");
    return stryMutAct_9fa48("104") ? DISPOSITIVOS.find(d => d.chave === chave).label : (stryCov_9fa48("104"), DISPOSITIVOS.find(stryMutAct_9fa48("105") ? () => undefined : (stryCov_9fa48("105"), d => stryMutAct_9fa48("108") ? d.chave !== chave : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), d.chave === chave)))?.label);
  }
}
function fraseUrgencia(chave?: UrgenciaChave): string | undefined {
  if (stryMutAct_9fa48("109")) {
    {}
  } else {
    stryCov_9fa48("109");
    return stryMutAct_9fa48("110") ? URGENCIAS.find(u => u.chave === chave).frase : (stryCov_9fa48("110"), URGENCIAS.find(stryMutAct_9fa48("111") ? () => undefined : (stryCov_9fa48("111"), u => stryMutAct_9fa48("114") ? u.chave !== chave : stryMutAct_9fa48("113") ? false : stryMutAct_9fa48("112") ? true : (stryCov_9fa48("112", "113", "114"), u.chave === chave)))?.frase);
  }
}

/** Mensagem pré-preenchida: base do sintoma + campos da triagem rápida. */
export function buildProblemaWaMessage(base: string, ctx: ProblemaWaCtx): string {
  if (stryMutAct_9fa48("115")) {
    {}
  } else {
    stryCov_9fa48("115");
    const linhas: string[] = stryMutAct_9fa48("116") ? [] : (stryCov_9fa48("116"), [stryMutAct_9fa48("117") ? base : (stryCov_9fa48("117"), base.trim())]);
    if (stryMutAct_9fa48("119") ? false : stryMutAct_9fa48("118") ? true : (stryCov_9fa48("118", "119"), ctx.complemento)) linhas.push(stryMutAct_9fa48("120") ? ctx.complemento : (stryCov_9fa48("120"), ctx.complemento.trim()));
    const campos: string[] = stryMutAct_9fa48("121") ? ["Stryker was here"] : (stryCov_9fa48("121"), []);
    const disp = rotuloDispositivo(ctx.dispositivo);
    if (stryMutAct_9fa48("123") ? false : stryMutAct_9fa48("122") ? true : (stryCov_9fa48("122", "123"), disp)) campos.push(stryMutAct_9fa48("124") ? `` : (stryCov_9fa48("124"), `Equipamento: ${disp}`));
    if (stryMutAct_9fa48("126") ? false : stryMutAct_9fa48("125") ? true : (stryCov_9fa48("125", "126"), ctx.bairro)) campos.push(stryMutAct_9fa48("127") ? `` : (stryCov_9fa48("127"), `Bairro/cidade: ${ctx.bairro}`));
    const urg = fraseUrgencia(ctx.urgencia);
    if (stryMutAct_9fa48("129") ? false : stryMutAct_9fa48("128") ? true : (stryCov_9fa48("128", "129"), urg)) campos.push(urg);
    if (stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : (stryCov_9fa48("130", "131"), campos.length)) linhas.push(campos.join(stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), "\n")));
    const sufixo = sufixoVariante(stryMutAct_9fa48("133") ? ctx.variante && varianteWa() : (stryCov_9fa48("133"), ctx.variante ?? varianteWa()));
    if (stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : (stryCov_9fa48("134", "135"), sufixo)) linhas.push(sufixo);
    return stryMutAct_9fa48("136") ? linhas.join("\n\n") : (stryCov_9fa48("136"), linhas.filter(Boolean).join(stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), "\n\n")));
  }
}

/** Link wa.me com mensagem pronta + UTMs e identificadores de atribuição. */
export function buildProblemaWaHref(base: string, ctx: ProblemaWaCtx): string {
  if (stryMutAct_9fa48("138")) {
    {}
  } else {
    stryCov_9fa48("138");
    const variante = stryMutAct_9fa48("139") ? ctx.variante && varianteWa() : (stryCov_9fa48("139"), ctx.variante ?? varianteWa());
    const href = whatsappLinkComContexto(buildProblemaWaMessage(base, stryMutAct_9fa48("140") ? {} : (stryCov_9fa48("140"), {
      ...ctx,
      variante
    })), stryMutAct_9fa48("141") ? {} : (stryCov_9fa48("141"), {
      medium: stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), "cta_problema"),
      servico: ctx.sintoma,
      posicao: stryMutAct_9fa48("143") ? `` : (stryCov_9fa48("143"), `problemas_${ctx.secao}`),
      etapa: stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), "triagem"),
      variante: stryMutAct_9fa48("145") ? `` : (stryCov_9fa48("145"), `msg_${variante}`)
    }));
    if (stryMutAct_9fa48("148") ? false : stryMutAct_9fa48("147") ? true : stryMutAct_9fa48("146") ? /^https?:\/\//.test(href) : (stryCov_9fa48("146", "147", "148"), !(stryMutAct_9fa48("150") ? /^https:\/\// : stryMutAct_9fa48("149") ? /https?:\/\// : (stryCov_9fa48("149", "150"), /^https?:\/\//)).test(href))) return href;
    try {
      if (stryMutAct_9fa48("151")) {
        {}
      } else {
        stryCov_9fa48("151");
        const url = new URL(href);
        url.searchParams.set(stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "rota"), stryMutAct_9fa48("153") ? `` : (stryCov_9fa48("153"), `/problemas/${ctx.sintoma}`));
        url.searchParams.set(stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), "sintoma"), ctx.sintoma);
        url.searchParams.set(stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), "secao"), ctx.secao);
        if (stryMutAct_9fa48("158") ? typeof ctx.rolagem !== "number" : stryMutAct_9fa48("157") ? false : stryMutAct_9fa48("156") ? true : (stryCov_9fa48("156", "157", "158"), typeof ctx.rolagem === (stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), "number")))) url.searchParams.set(stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), "rolagem"), String(ctx.rolagem));
        if (stryMutAct_9fa48("162") ? false : stryMutAct_9fa48("161") ? true : (stryCov_9fa48("161", "162"), ctx.dispositivo)) url.searchParams.set(stryMutAct_9fa48("163") ? "" : (stryCov_9fa48("163"), "dispositivo"), ctx.dispositivo);
        if (stryMutAct_9fa48("165") ? false : stryMutAct_9fa48("164") ? true : (stryCov_9fa48("164", "165"), ctx.urgencia)) url.searchParams.set(stryMutAct_9fa48("166") ? "" : (stryCov_9fa48("166"), "urgencia"), ctx.urgencia);
        url.searchParams.set(stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), "variante"), variante);
        return url.toString();
      }
    } catch {
      if (stryMutAct_9fa48("168")) {
        {}
      } else {
        stryCov_9fa48("168");
        return href;
      }
    }
  }
}

/**
 * Fallback para quem não tem o app instalado (desktop sem WhatsApp Desktop,
 * navegador sem handler): api.whatsapp.com/send abre o WhatsApp Web com a
 * MESMA mensagem e os MESMOS parâmetros de tracking do link principal.
 */
export function buildProblemaWaFallbackHref(base: string, ctx: ProblemaWaCtx): string {
  if (stryMutAct_9fa48("169")) {
    {}
  } else {
    stryCov_9fa48("169");
    const href = buildProblemaWaHref(base, ctx);
    if (stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : stryMutAct_9fa48("170") ? /^https?:\/\/wa\.me\//.test(href) : (stryCov_9fa48("170", "171", "172"), !(stryMutAct_9fa48("174") ? /^https:\/\/wa\.me\// : stryMutAct_9fa48("173") ? /https?:\/\/wa\.me\// : (stryCov_9fa48("173", "174"), /^https?:\/\/wa\.me\//)).test(href))) return href;
    try {
      if (stryMutAct_9fa48("175")) {
        {}
      } else {
        stryCov_9fa48("175");
        const url = new URL(href);
        const phone = url.pathname.replace(stryMutAct_9fa48("176") ? /\// : (stryCov_9fa48("176"), /^\//), stryMutAct_9fa48("177") ? "Stryker was here!" : (stryCov_9fa48("177"), ""));
        const web = new URL(stryMutAct_9fa48("178") ? "" : (stryCov_9fa48("178"), "https://api.whatsapp.com/send"));
        url.searchParams.forEach(stryMutAct_9fa48("179") ? () => undefined : (stryCov_9fa48("179"), (v, k) => web.searchParams.set(k, v)));
        web.searchParams.set(stryMutAct_9fa48("180") ? "" : (stryCov_9fa48("180"), "phone"), phone);
        return web.toString();
      }
    } catch {
      if (stryMutAct_9fa48("181")) {
        {}
      } else {
        stryCov_9fa48("181");
        return href;
      }
    }
  }
}

/** Rótulo padronizado de evento GA4/Ads: rota + seção + rolagem. */
export function rotuloEvento(ctx: ProblemaWaCtx): string {
  if (stryMutAct_9fa48("182")) {
    {}
  } else {
    stryCov_9fa48("182");
    const partes = stryMutAct_9fa48("183") ? [] : (stryCov_9fa48("183"), [stryMutAct_9fa48("184") ? `` : (stryCov_9fa48("184"), `problema_${ctx.sintoma}`), ctx.secao]);
    if (stryMutAct_9fa48("187") ? typeof ctx.rolagem !== "number" : stryMutAct_9fa48("186") ? false : stryMutAct_9fa48("185") ? true : (stryCov_9fa48("185", "186", "187"), typeof ctx.rolagem === (stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), "number")))) partes.push(stryMutAct_9fa48("189") ? `` : (stryCov_9fa48("189"), `scroll${ctx.rolagem}`));
    if (stryMutAct_9fa48("191") ? false : stryMutAct_9fa48("190") ? true : (stryCov_9fa48("190", "191"), ctx.variante)) partes.push(stryMutAct_9fa48("192") ? `` : (stryCov_9fa48("192"), `msg${ctx.variante}`));
    return partes.join(stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), "_"));
  }
}