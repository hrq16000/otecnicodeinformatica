/**
 * A/B DE COPY E POSIÇÃO DOS CTAs DE WHATSAPP NO CLUSTER /problemas
 *
 * Complementa o A/B da mensagem pré-preenchida (problemasWaVariants):
 *  - `msg_a|msg_b`  → texto que vai PARA o WhatsApp;
 *  - `cta_1|cta_2`  → texto do botão + microcopy + POSIÇÃO do bloco na seção.
 *
 * Regras:
 *  - Variante sorteada uma única vez por visitante (localStorage + cookie de
 *    1 ano), estável entre páginas e sessões — mesma lógica do experimento de
 *    mensagem, para não misturar amostras.
 *  - SSR/pré-render sempre usa "1" (controle), mantendo o HTML estático igual
 *    ao indexado. A variante só altera microcopy/posição depois da hidratação,
 *    nunca o conteúdo editorial (H1, H2, FAQ, parágrafos).
 *  - Contato segue exclusivamente por WhatsApp: `call_click` permanece
 *    desativado por política (gate check:cta-funnel proíbe `tel:`), então o
 *    experimento mede apenas `wa_click` por variante e por seção.
 */
import { useEffect, useState } from "react";

export type VarianteCta = "1" | "2";

const STORAGE_KEY = "cta_variant_problemas";
const UM_ANO = 60 * 60 * 24 * 365;

export interface CopyCta {
  /** Microcopy acima/ao lado do botão. */
  texto: string;
  /** Rótulo do botão. */
  rotulo: string;
  /** Posição do bloco dentro da seção. */
  posicao: "depois" | "antes";
}

type Secao = string;

/** Copy de controle por seção (idêntica à publicada antes do experimento). */
const CONTROLE: Record<Secao, CopyCta> = {
  sintomas: {
    texto:
      "Seu caso se parece com algum desses? Descreva em uma frase e receba a orientação do próximo passo.",
    rotulo: "Descrever meu sintoma",
    posicao: "depois",
  },
  causas: {
    texto:
      "Não dá para saber a causa só pelo sintoma. Uma triagem rápida indica se resolve remoto, em visita ou em bancada.",
    rotulo: "Pedir triagem",
    posicao: "depois",
  },
  modalidades: {
    texto:
      "Quer saber qual modalidade se aplica ao seu caso? Conte o sintoma e a região de atendimento.",
    rotulo: "Ver minha modalidade",
    posicao: "depois",
  },
  faq: {
    texto: "Ficou uma dúvida que não está aqui? Pergunte direto pelo WhatsApp.",
    rotulo: "Tirar minha dúvida",
    posicao: "depois",
  },
};

/**
 * Desafiante: microcopy com próximo passo explícito e bloco no INÍCIO da
 * seção (antes do conteúdo), para medir efeito de posição além do texto.
 */
const DESAFIANTE: Record<Secao, CopyCta> = {
  sintomas: {
    texto:
      "Em 1 minuto: descreva o sintoma e recebemos com o histórico do aparelho para indicar o próximo passo.",
    rotulo: "Enviar meu sintoma agora",
    posicao: "antes",
  },
  causas: {
    texto:
      "Prefere pular a leitura? Mande o sintoma e devolvemos as causas mais prováveis para o seu caso.",
    rotulo: "Quero as causas do meu caso",
    posicao: "antes",
  },
  modalidades: {
    texto:
      "Diga o bairro e o aparelho: respondemos se dá para resolver remoto, em visita ou com coleta.",
    rotulo: "Descobrir como atender",
    posicao: "antes",
  },
  faq: {
    texto: "Sua dúvida é específica? Envie a pergunta e respondemos com o cenário do seu equipamento.",
    rotulo: "Perguntar pelo WhatsApp",
    posicao: "antes",
  },
};

const PADRAO: CopyCta = {
  texto: "Descreva o que está acontecendo e receba a orientação do próximo passo.",
  rotulo: "Falar pelo WhatsApp",
  posicao: "depois",
};

/** Copy do CTA para uma seção, já resolvida pela variante do visitante. */
export function copyCta(secao: Secao, variante: VarianteCta): CopyCta {
  const tabela = variante === "2" ? DESAFIANTE : CONTROLE;
  return tabela[secao] ?? CONTROLE[secao] ?? PADRAO;
}

function lerCookie(): VarianteCta | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=(1|2)(?:;|$)`));
    return (m?.[1] as VarianteCta) ?? null;
  } catch {
    return null;
  }
}

function gravar(v: VarianteCta) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* modo privado: cobre pelo cookie */
  }
  try {
    document.cookie = `${STORAGE_KEY}=${v}; path=/; max-age=${UM_ANO}; SameSite=Lax`;
  } catch {
    /* noop */
  }
}

/** Variante persistida do visitante ("1" fora do browser). */
export function varianteCta(): VarianteCta {
  if (typeof window === "undefined") return "1";
  let salvo: string | null = null;
  try {
    salvo = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    salvo = null;
  }
  if (salvo !== "1" && salvo !== "2") salvo = lerCookie();
  if (salvo === "1" || salvo === "2") {
    gravar(salvo);
    return salvo;
  }
  const sorteada: VarianteCta = Math.random() < 0.5 ? "1" : "2";
  gravar(sorteada);
  return sorteada;
}

/** Hook estável (resolve uma vez após a hidratação). */
export function useVarianteCta(): VarianteCta {
  const [v, setV] = useState<VarianteCta>("1");
  useEffect(() => {
    setV(varianteCta());
  }, []);
  return v;
}

export default varianteCta;
