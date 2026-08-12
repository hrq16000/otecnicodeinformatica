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
import { useEffect, useState } from "react";

export type VarianteWa = "a" | "b";

const STORAGE_KEY = "wa_variant_problemas";
const COOKIE_KEY = "wa_variant_problemas";
const UM_ANO = 60 * 60 * 24 * 365;

/** Sufixo aplicado à mensagem, por variante. */
const SUFIXO: Record<VarianteWa, string> = {
  // Controle: mensagem direta, sem promessa.
  a: "",
  // Desafiante: pedido explícito de próximo passo (aumenta taxa de resposta).
  b: "Pode me dizer qual seria o próximo passo e a modalidade indicada?",
};

export function sufixoVariante(v: VarianteWa): string {
  return SUFIXO[v] ?? "";
}

function lerCookie(): VarianteWa | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=(a|b)(?:;|$)`));
    return (m?.[1] as VarianteWa) ?? null;
  } catch {
    return null;
  }
}

function gravar(v: VarianteWa) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* modo privado: o cookie abaixo cobre */
  }
  try {
    document.cookie = `${COOKIE_KEY}=${v}; path=/; max-age=${UM_ANO}; SameSite=Lax`;
  } catch {
    /* noop */
  }
}

/**
 * Variante persistida do visitante (default "a" fora do browser).
 * Fonte de verdade: localStorage → cookie → sorteio novo (gravado nos dois).
 */
export function varianteWa(): VarianteWa {
  if (typeof window === "undefined") return "a";
  let salvo: string | null = null;
  try {
    salvo = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    salvo = null;
  }
  if (salvo !== "a" && salvo !== "b") salvo = lerCookie();
  if (salvo === "a" || salvo === "b") {
    // Reescreve para manter os dois storages sincronizados (e renovar o cookie).
    gravar(salvo);
    return salvo;
  }
  const sorteada: VarianteWa = Math.random() < 0.5 ? "a" : "b";
  gravar(sorteada);
  return sorteada;
}

/**
 * Hook estável: resolve a variante uma vez após a hidratação e mantém o mesmo
 * valor durante toda a sessão de navegação (nenhum re-sorteio por página).
 */
export function useVarianteWa(): VarianteWa {
  const [v, setV] = useState<VarianteWa>("a");
  useEffect(() => {
    setV(varianteWa());
  }, []);
  return v;
}

export default varianteWa;
