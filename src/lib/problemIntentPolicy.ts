/**
 * RODADA 4 — POLÍTICA DE INTENÇÃO E DO SUFIXO "-curitiba".
 *
 * Fonte única da regra que separa página de SINTOMA de landing LOCAL. Usada
 * pelo relatório de inventário (`report:problem-intent`), pelo gate de CI
 * (`check:problem-intent`) e pelo gerador de recomendações de interlink, para
 * que os três nunca discordem entre si.
 *
 * ── A REGRA ────────────────────────────────────────────────────────────────
 *
 * 1. Uma página em /problemas/* responde a um SINTOMA. A intenção primária é
 *    DIAGNÓSTICA (ou INFORMATIVA quando o slug é explicativo). A intenção
 *    comercial/local é sempre SECUNDÁRIA — ela vive no CTA, no serviço
 *    relacionado e no breadcrumb, não na promessa da URL.
 *
 * 2. O sufixo "-curitiba" no slug declara intenção LOCAL. Ele é PROIBIDO em
 *    página de sintoma indexável: inverte a intenção primária e coloca a
 *    página para disputar a mesma SERP das landings de serviço local.
 *
 * 3. Slugs herdados com "-curitiba" NÃO são renomeados nem removidos (as URLs
 *    continuam existindo — Fase 40). Eles permanecem fora do sitemap e, quando
 *    existe o gêmeo limpo /problemas/<slug>, apontam canonical para ele.
 *
 * 4. Localidade no conteúdo é permitida com parcimônia (Fase 11): no máximo
 *    uma menção a Curitiba no title e uma no H1. Meta description e H1 não
 *    devem repetir a cidade para "reforçar" — isso é o padrão de página rasa.
 */

export type IntencaoPrimaria =
  | "DIAGNÓSTICA"
  | "INFORMATIVA"
  | "COMERCIAL"
  | "TRANSACIONAL"
  | "LOCAL"
  | "NAVEGACIONAL";

export type Indexabilidade = "index" | "noindex" | "reavaliar";

export const SUFIXO_LOCAL = "-curitiba";

/** Menções à cidade toleradas por campo antes de virar excesso (Fase 11). */
export const LIMITE_MENCOES_CIDADE = { title: 1, h1: 1, metaDescription: 1 } as const;

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const temSufixoLocal = (urlOuSlug: string) =>
  normalizar(urlOuSlug).replace(/\/$/, "").endsWith(SUFIXO_LOCAL);

/** Remove o sufixo local do slug, devolvendo o slug canônico do sintoma. */
export const slugCanonico = (urlOuSlug: string) => {
  const limpo = urlOuSlug.replace(/\/$/, "");
  return temSufixoLocal(limpo) ? limpo.slice(0, -SUFIXO_LOCAL.length) : limpo;
};

export const contarMencoesCidade = (texto: string) =>
  (normalizar(texto).match(/curitiba/g) || []).length;

/**
 * Intenção que a URL REALMENTE sinaliza hoje, lendo slug + títulos.
 * É o lado "observado" da comparação — não o desejado.
 */
export function intencaoObservada(url: string, titulo: string): [IntencaoPrimaria, IntencaoPrimaria] {
  const t = normalizar(`${url} ${titulo}`);
  if (/(preco|orcamento|quanto custa|valor)/.test(t)) return ["COMERCIAL", "DIAGNÓSTICA"];
  if (temSufixoLocal(url) || /(bairro|perto de mim|domicilio)/.test(t)) return ["LOCAL", "DIAGNÓSTICA"];
  if (/(o que e|como funciona|guia|significa|por que)/.test(t)) return ["INFORMATIVA", "DIAGNÓSTICA"];
  return ["DIAGNÓSTICA", "COMERCIAL"];
}

/**
 * Intenção que a URL DEVERIA ter segundo a política.
 * Página de sintoma é diagnóstica; slug explicativo é informativa; slug com
 * preço/orçamento é comercial. Localidade nunca é primária em /problemas/*.
 */
export function intencaoEsperada(url: string, titulo = ""): IntencaoPrimaria {
  const t = normalizar(`${slugCanonico(url)} ${titulo}`);
  if (/(preco|orcamento|quanto custa|valor)/.test(t)) return "COMERCIAL";
  if (/(o que e|como funciona|guia|significa|por que)/.test(t)) return "INFORMATIVA";
  return "DIAGNÓSTICA";
}

export type DesvioIntencao = {
  url: string;
  regra: "SUFIXO_LOCAL" | "INTENCAO_INVERTIDA" | "EXCESSO_CIDADE" | "CANONICAL_INCOERENTE";
  severidade: "erro" | "aviso";
  detalhe: string;
};

export type EntradaProblema = {
  url: string;
  titulo: string;
  h1: string;
  metaDescription: string;
  /** Está no sitemap curado hoje (ou seja: faz parte do lote indexável). */
  indexavel: boolean;
  /** Canonical declarado, quando conhecido. */
  canonical?: string;
};

/**
 * Avalia uma página contra a política.
 *
 * Severidade: em página indexável (o lote) toda inversão é ERRO — é ela que
 * disputa SERP. Em página herdada fora do sitemap é AVISO: o plano é reescrever
 * ou consolidar depois, sem travar o CI por dívida antiga conhecida.
 */
export function avaliarIntencao(entrada: EntradaProblema): DesvioIntencao[] {
  const desvios: DesvioIntencao[] = [];
  const sev: "erro" | "aviso" = entrada.indexavel ? "erro" : "aviso";
  const esperada = intencaoEsperada(entrada.url, entrada.titulo);
  const [observada] = intencaoObservada(entrada.url, `${entrada.h1} ${entrada.titulo}`);

  if (temSufixoLocal(entrada.url)) {
    desvios.push({
      url: entrada.url,
      regra: "SUFIXO_LOCAL",
      severidade: sev,
      detalhe: `slug termina em "${SUFIXO_LOCAL}"; o canônico do sintoma é ${slugCanonico(entrada.url)}`,
    });
  }

  if (observada !== esperada) {
    desvios.push({
      url: entrada.url,
      regra: "INTENCAO_INVERTIDA",
      severidade: sev,
      detalhe: `intenção observada ${observada}, esperada ${esperada}`,
    });
  }

  for (const [campo, limite] of Object.entries(LIMITE_MENCOES_CIDADE) as [
    keyof typeof LIMITE_MENCOES_CIDADE,
    number,
  ][]) {
    const n = contarMencoesCidade(entrada[campo] ?? "");
    if (n > limite) {
      desvios.push({
        url: entrada.url,
        regra: "EXCESSO_CIDADE",
        severidade: sev,
        detalhe: `${campo} cita Curitiba ${n}x (limite ${limite})`,
      });
    }
  }

  if (entrada.canonical) {
    const alvo = temSufixoLocal(entrada.url) ? slugCanonico(entrada.url) : entrada.url;
    if (!entrada.canonical.endsWith(alvo)) {
      desvios.push({
        url: entrada.url,
        regra: "CANONICAL_INCOERENTE",
        severidade: sev,
        detalhe: `canonical ${entrada.canonical} deveria apontar para ${alvo}`,
      });
    }
  }

  return desvios;
}

/**
 * Canonical recomendado: o sintoma sem sufixo, quando o gêmeo limpo existe.
 * Sem gêmeo, a URL herdada é canônica de si mesma (não se inventa redirect
 * para página inexistente).
 */
export function canonicalRecomendado(url: string, urlsExistentes: Set<string>) {
  const limpo = slugCanonico(url);
  return limpo !== url && urlsExistentes.has(limpo) ? limpo : url;
}

/**
 * Indexabilidade recomendada pela política, sem tocar em nada sozinha.
 * `risco` vem da matriz de canibalização.
 */
export function indexabilidadeRecomendada(entrada: {
  url: string;
  indexavel: boolean;
  risco: "BAIXO" | "MÉDIO" | "ALTO" | "CRÍTICO";
  temGemeoLimpo: boolean;
}): { valor: Indexabilidade; motivo: string } {
  if (temSufixoLocal(entrada.url)) {
    return entrada.temGemeoLimpo
      ? { valor: "noindex", motivo: "duplica o sintoma canônico sem sufixo; canonical aponta para o gêmeo limpo" }
      : { valor: "reavaliar", motivo: "sufixo local sem gêmeo limpo — decidir entre reposicionar intenção ou consolidar" };
  }
  if (entrada.risco === "CRÍTICO") {
    return { valor: "reavaliar", motivo: "sobreposição crítica com outra página do mesmo cluster" };
  }
  if (entrada.indexavel) {
    return { valor: "index", motivo: "sintoma canônico já validado no sitemap curado" };
  }
  return { valor: "noindex", motivo: "aguardando reescrita editorial do lote" };
}
