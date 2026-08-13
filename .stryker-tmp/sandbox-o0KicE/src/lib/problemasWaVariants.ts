/**
 * A/B TESTING DAS MENSAGENS PRÉ-PREENCHIDAS DO WHATSAPP (/problemas)
 *
 * Objetivo: descobrir qual abertura gera mais resposta por sintoma, sem
 * mudar o conteúdo indexável da página (o teste vive apenas no texto que
 * segue para o WhatsApp e no `utm_term`).
 *
 * Regras:
 *  - A variante é sorteada UMA vez por visitante/dispositivo e persiste em
 *    localStorage + cookie de 1 ano. Assim o mesmo usuário mantém a mesma
 *    variante durante toda a navegação no hub /problemas (e entre sessões),
 *    reduzindo variância do experimento.
 *  - SSR/pré-render: sem `window`, cai sempre na variante de controle ("a"),
 *    garantindo HTML estático estável (nenhum risco de hydration mismatch
 *    porque o valor só é usado em href/onClick, não em texto renderizado).
 *  - Nenhum dado pessoal é usado no sorteio.
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
import { useEffect, useState } from "react";
export type VarianteWa = "a" | "b";
const STORAGE_KEY = stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), "wa_variant_problemas");
const COOKIE_KEY = stryMutAct_9fa48("195") ? "" : (stryCov_9fa48("195"), "wa_variant_problemas");
const UM_ANO = stryMutAct_9fa48("196") ? 60 * 60 * 24 / 365 : (stryCov_9fa48("196"), (stryMutAct_9fa48("197") ? 60 * 60 / 24 : (stryCov_9fa48("197"), (stryMutAct_9fa48("198") ? 60 / 60 : (stryCov_9fa48("198"), 60 * 60)) * 24)) * 365);

/** Sufixo aplicado à mensagem, por variante. */
const SUFIXO: Record<VarianteWa, string> = stryMutAct_9fa48("199") ? {} : (stryCov_9fa48("199"), {
  // Controle: mensagem direta, sem promessa.
  a: stryMutAct_9fa48("200") ? "Stryker was here!" : (stryCov_9fa48("200"), ""),
  // Desafiante: pedido explícito de próximo passo (aumenta taxa de resposta).
  b: stryMutAct_9fa48("201") ? "" : (stryCov_9fa48("201"), "Pode me dizer qual seria o próximo passo e a modalidade indicada?")
});
export function sufixoVariante(v: VarianteWa): string {
  if (stryMutAct_9fa48("202")) {
    {}
  } else {
    stryCov_9fa48("202");
    return stryMutAct_9fa48("203") ? SUFIXO[v] && "" : (stryCov_9fa48("203"), SUFIXO[v] ?? (stryMutAct_9fa48("204") ? "Stryker was here!" : (stryCov_9fa48("204"), "")));
  }
}
function lerCookie(): VarianteWa | null {
  if (stryMutAct_9fa48("205")) {
    {}
  } else {
    stryCov_9fa48("205");
    try {
      if (stryMutAct_9fa48("206")) {
        {}
      } else {
        stryCov_9fa48("206");
        const m = document.cookie.match(new RegExp(stryMutAct_9fa48("207") ? `` : (stryCov_9fa48("207"), `(?:^|; )${COOKIE_KEY}=(a|b)(?:;|$)`)));
        return stryMutAct_9fa48("208") ? m?.[1] as VarianteWa && null : (stryCov_9fa48("208"), m?.[1] as VarianteWa ?? null);
      }
    } catch {
      if (stryMutAct_9fa48("209")) {
        {}
      } else {
        stryCov_9fa48("209");
        return null;
      }
    }
  }
}
function gravar(v: VarianteWa) {
  if (stryMutAct_9fa48("210")) {
    {}
  } else {
    stryCov_9fa48("210");
    try {
      if (stryMutAct_9fa48("211")) {
        {}
      } else {
        stryCov_9fa48("211");
        window.localStorage.setItem(STORAGE_KEY, v);
      }
    } catch {
      /* modo privado: o cookie abaixo cobre */
    }
    try {
      if (stryMutAct_9fa48("212")) {
        {}
      } else {
        stryCov_9fa48("212");
        document.cookie = stryMutAct_9fa48("213") ? `` : (stryCov_9fa48("213"), `${COOKIE_KEY}=${v}; path=/; max-age=${UM_ANO}; SameSite=Lax`);
      }
    } catch {
      /* noop */
    }
  }
}

/**
 * Variante persistida do visitante (default "a" fora do browser).
 * Fonte de verdade: localStorage → cookie → sorteio novo (gravado nos dois).
 */
export function varianteWa(): VarianteWa {
  if (stryMutAct_9fa48("214")) {
    {}
  } else {
    stryCov_9fa48("214");
    if (stryMutAct_9fa48("217") ? typeof window !== "undefined" : stryMutAct_9fa48("216") ? false : stryMutAct_9fa48("215") ? true : (stryCov_9fa48("215", "216", "217"), typeof window === (stryMutAct_9fa48("218") ? "" : (stryCov_9fa48("218"), "undefined")))) return stryMutAct_9fa48("219") ? "" : (stryCov_9fa48("219"), "a");
    let salvo: string | null = null;
    try {
      if (stryMutAct_9fa48("220")) {
        {}
      } else {
        stryCov_9fa48("220");
        salvo = window.localStorage.getItem(STORAGE_KEY);
      }
    } catch {
      if (stryMutAct_9fa48("221")) {
        {}
      } else {
        stryCov_9fa48("221");
        salvo = null;
      }
    }
    if (stryMutAct_9fa48("224") ? salvo !== "a" || salvo !== "b" : stryMutAct_9fa48("223") ? false : stryMutAct_9fa48("222") ? true : (stryCov_9fa48("222", "223", "224"), (stryMutAct_9fa48("226") ? salvo === "a" : stryMutAct_9fa48("225") ? true : (stryCov_9fa48("225", "226"), salvo !== (stryMutAct_9fa48("227") ? "" : (stryCov_9fa48("227"), "a")))) && (stryMutAct_9fa48("229") ? salvo === "b" : stryMutAct_9fa48("228") ? true : (stryCov_9fa48("228", "229"), salvo !== (stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), "b")))))) salvo = lerCookie();
    if (stryMutAct_9fa48("233") ? salvo === "a" && salvo === "b" : stryMutAct_9fa48("232") ? false : stryMutAct_9fa48("231") ? true : (stryCov_9fa48("231", "232", "233"), (stryMutAct_9fa48("235") ? salvo !== "a" : stryMutAct_9fa48("234") ? false : (stryCov_9fa48("234", "235"), salvo === (stryMutAct_9fa48("236") ? "" : (stryCov_9fa48("236"), "a")))) || (stryMutAct_9fa48("238") ? salvo !== "b" : stryMutAct_9fa48("237") ? false : (stryCov_9fa48("237", "238"), salvo === (stryMutAct_9fa48("239") ? "" : (stryCov_9fa48("239"), "b")))))) {
      if (stryMutAct_9fa48("240")) {
        {}
      } else {
        stryCov_9fa48("240");
        // Reescreve para manter os dois storages sincronizados (e renovar o cookie).
        gravar(salvo);
        return salvo;
      }
    }
    const sorteada: VarianteWa = (stryMutAct_9fa48("244") ? Math.random() >= 0.5 : stryMutAct_9fa48("243") ? Math.random() <= 0.5 : stryMutAct_9fa48("242") ? false : stryMutAct_9fa48("241") ? true : (stryCov_9fa48("241", "242", "243", "244"), Math.random() < 0.5)) ? stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), "a") : stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), "b");
    gravar(sorteada);
    return sorteada;
  }
}

/**
 * Hook estável: resolve a variante uma vez após a hidratação e mantém o mesmo
 * valor durante toda a sessão de navegação (nenhum re-sorteio por página).
 */
export function useVarianteWa(): VarianteWa {
  if (stryMutAct_9fa48("247")) {
    {}
  } else {
    stryCov_9fa48("247");
    const [v, setV] = useState<VarianteWa>(stryMutAct_9fa48("248") ? "" : (stryCov_9fa48("248"), "a"));
    useEffect(() => {
      if (stryMutAct_9fa48("249")) {
        {}
      } else {
        stryCov_9fa48("249");
        setV(varianteWa());
      }
    }, stryMutAct_9fa48("250") ? ["Stryker was here"] : (stryCov_9fa48("250"), []));
    return v;
  }
}
export default varianteWa;