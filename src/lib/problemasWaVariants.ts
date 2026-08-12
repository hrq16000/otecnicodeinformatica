/**
 * A/B TESTING DAS MENSAGENS PRÉ-PREENCHIDAS DO WHATSAPP (/problemas)
 *
 * Objetivo: descobrir qual abertura gera mais resposta por sintoma, sem
 * mudar o conteúdo indexável da página (o teste vive apenas no texto que
 * segue para o WhatsApp e no `utm_term`).
 *
 * Regras:
 *  - A variante é sorteada UMA vez por visitante e persiste (localStorage),
 *    para o mesmo usuário nunca ver mensagens diferentes entre páginas.
 *  - SSR/pré-render: sem `window`, cai sempre na variante de controle ("a"),
 *    garantindo HTML estático estável (nenhum risco de hydration mismatch
 *    porque o valor só é usado em href/onClick, não em texto renderizado).
 *  - Nenhum dado pessoal é usado no sorteio.
 */

export type VarianteWa = "a" | "b";

const STORAGE_KEY = "wa_variant_problemas";

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

/** Variante persistida do visitante (default "a" fora do browser). */
export function varianteWa(): VarianteWa {
  if (typeof window === "undefined") return "a";
  try {
    const salvo = window.localStorage.getItem(STORAGE_KEY);
    if (salvo === "a" || salvo === "b") return salvo;
    const sorteada: VarianteWa = Math.random() < 0.5 ? "a" : "b";
    window.localStorage.setItem(STORAGE_KEY, sorteada);
    return sorteada;
  } catch {
    return "a";
  }
}

export default varianteWa;
