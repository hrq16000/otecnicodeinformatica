import { describe, expect, it } from "vitest";
import {
  avaliarIntencao,
  canonicalRecomendado,
  contarMencoesCidade,
  indexabilidadeRecomendada,
  intencaoEsperada,
  intencaoObservada,
  slugCanonico,
  temSufixoLocal,
} from "../problemIntentPolicy";

const base = {
  url: "/problemas/computador-lento",
  titulo: "Computador lento: causas e o que fazer",
  h1: "Computador lento: o que pode estar causando?",
  metaDescription: "Entenda por que um computador fica lento e quando buscar diagnóstico.",
  indexavel: true,
};

describe("sufixo -curitiba", () => {
  it("detecta o sufixo e devolve o slug canônico", () => {
    expect(temSufixoLocal("/problemas/hd-fazendo-barulho-curitiba")).toBe(true);
    expect(temSufixoLocal("/problemas/hd-fazendo-barulho")).toBe(false);
    expect(slugCanonico("/problemas/hd-fazendo-barulho-curitiba")).toBe("/problemas/hd-fazendo-barulho");
  });

  it("não confunde cidade no meio do slug com sufixo", () => {
    expect(temSufixoLocal("/problemas/curitiba-computador-lento")).toBe(false);
  });

  it("canonicaliza no gêmeo limpo apenas quando ele existe", () => {
    const existentes = new Set(["/problemas/hd-fazendo-barulho"]);
    expect(canonicalRecomendado("/problemas/hd-fazendo-barulho-curitiba", existentes)).toBe(
      "/problemas/hd-fazendo-barulho",
    );
    expect(canonicalRecomendado("/problemas/tv-listras-curitiba", existentes)).toBe(
      "/problemas/tv-listras-curitiba",
    );
  });
});

describe("intenção", () => {
  it("sintoma é diagnóstico por padrão", () => {
    expect(intencaoEsperada(base.url, base.titulo)).toBe("DIAGNÓSTICA");
    expect(intencaoObservada(base.url, base.h1)[0]).toBe("DIAGNÓSTICA");
  });

  it("slug com sufixo local inverte a intenção observada", () => {
    expect(intencaoObservada("/problemas/computador-lento-curitiba", "Computador lento")[0]).toBe("LOCAL");
    expect(intencaoEsperada("/problemas/computador-lento-curitiba", "Computador lento")).toBe("DIAGNÓSTICA");
  });

  it("slug de preço é comercial e slug explicativo é informativo", () => {
    expect(intencaoEsperada("/problemas/preco-troca-de-tela")).toBe("COMERCIAL");
    expect(intencaoEsperada("/problemas/o-que-e-tela-azul")).toBe("INFORMATIVA");
  });

  it("conta menções à cidade ignorando acento e caixa", () => {
    expect(contarMencoesCidade("Curitiba e curitiba")).toBe(2);
  });
});

describe("avaliarIntencao", () => {
  it("aprova página de sintoma canônica", () => {
    expect(avaliarIntencao(base)).toEqual([]);
  });

  it("reprova como ERRO quando a página indexável tem sufixo local", () => {
    const desvios = avaliarIntencao({ ...base, url: "/problemas/computador-lento-curitiba" });
    expect(desvios.map((d) => d.regra)).toContain("SUFIXO_LOCAL");
    expect(desvios.map((d) => d.regra)).toContain("INTENCAO_INVERTIDA");
    expect(desvios.every((d) => d.severidade === "erro")).toBe(true);
  });

  it("rebaixa para AVISO quando a página está fora do sitemap", () => {
    const desvios = avaliarIntencao({
      ...base,
      url: "/problemas/computador-lento-curitiba",
      indexavel: false,
    });
    expect(desvios.every((d) => d.severidade === "aviso")).toBe(true);
  });

  it("acusa excesso de cidade no title e no h1", () => {
    const desvios = avaliarIntencao({
      ...base,
      titulo: "Computador lento em Curitiba | Assistência em Curitiba",
      h1: "Computador lento em Curitiba, Curitiba e região",
    });
    const campos = desvios.filter((d) => d.regra === "EXCESSO_CIDADE").map((d) => d.detalhe);
    expect(campos.some((d) => d.startsWith("title"))).toBe(true);
    expect(campos.some((d) => d.startsWith("h1"))).toBe(true);
  });

  it("acusa canonical apontando para fora do sintoma", () => {
    const desvios = avaliarIntencao({ ...base, canonical: "https://exemplo.com/servicos/manutencao" });
    expect(desvios.map((d) => d.regra)).toContain("CANONICAL_INCOERENTE");
  });
});

describe("indexabilidade recomendada", () => {
  it("suffixada com gêmeo limpo vira noindex canonicalizado", () => {
    expect(
      indexabilidadeRecomendada({
        url: "/problemas/hd-fazendo-barulho-curitiba",
        indexavel: false,
        risco: "BAIXO",
        temGemeoLimpo: true,
      }).valor,
    ).toBe("noindex");
  });

  it("suffixada sem gêmeo e com risco alto vai para reavaliar", () => {
    expect(
      indexabilidadeRecomendada({
        url: "/problemas/tv-listras-curitiba",
        indexavel: false,
        risco: "ALTO",
        temGemeoLimpo: false,
      }).valor,
    ).toBe("reavaliar");
  });

  it("sintoma canônico já curado permanece index", () => {
    expect(
      indexabilidadeRecomendada({
        url: "/problemas/computador-lento",
        indexavel: true,
        risco: "MÉDIO",
        temGemeoLimpo: false,
      }).valor,
    ).toBe("index");
  });

  it("sobreposição crítica bloqueia index mesmo em página curada", () => {
    expect(
      indexabilidadeRecomendada({
        url: "/problemas/computador-lento",
        indexavel: true,
        risco: "CRÍTICO",
        temGemeoLimpo: false,
      }).valor,
    ).toBe("reavaliar");
  });
});
