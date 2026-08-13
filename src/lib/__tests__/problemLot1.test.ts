/**
 * RODADA 4B — testes do Lote 1 indexável de /problemas.
 *
 * Um teste por critério de aprovação da rodada. Eles guardam o padrão
 * editorial: qualquer página nova do cluster precisa passar por aqui antes
 * de entrar no sitemap.
 */
import { describe, expect, it } from "vitest";
import { CLUSTER_PROBLEMAS } from "@/lib/clusterProblemas";
import { LIMITE_MENCOES_CIDADE, intencaoEsperada, temSufixoLocal } from "@/lib/problemIntentPolicy";

const LOTE = CLUSTER_PROBLEMAS;
const PATHS = new Set(LOTE.map((p) => p.path));
const contarCuritiba = (t: string) => (t.toLowerCase().match(/curitiba/g) ?? []).length;

describe("problem-lot1-indexability", () => {
  it("todas as páginas do lote vivem sob /problemas/ e têm slug coerente com o path", () => {
    for (const p of LOTE) {
      expect(p.path).toBe(`/problemas/${p.slug}`);
    }
  });

  it("nenhuma página indexável usa sufixo local -curitiba", () => {
    for (const p of LOTE) {
      expect(temSufixoLocal(p.path), p.path).toBe(false);
    }
  });
});

describe("problem-lot1-canonical", () => {
  it("cada página tem path único (canonical self-referente, sem colisão)", () => {
    expect(new Set(LOTE.map((p) => p.path)).size).toBe(LOTE.length);
  });

  it("nenhuma página aponta canonical para variante local ou para serviço", () => {
    for (const p of LOTE) {
      expect(p.path.includes("-curitiba"), p.path).toBe(false);
      expect(p.path.startsWith("/servicos/"), p.path).toBe(false);
    }
  });
});

describe("problem-lot1-intent", () => {
  it("intenção esperada nunca é LOCAL — sintoma é diagnóstico, cidade é secundária", () => {
    for (const p of LOTE) {
      expect(intencaoEsperada(p.path, p.titulo), p.path).not.toBe("LOCAL");
    }
  });

  it("a abertura explica o sintoma antes de vender serviço", () => {
    const propaganda = /^(o t[ée]cnico de inform[áa]tica|se voc[êe] est[áa] procurando|somos especialistas)/i;
    for (const p of LOTE) {
      expect(propaganda.test(p.resumo.trim()), p.path).toBe(false);
      expect(p.resumo.length).toBeGreaterThan(120);
    }
  });
});

describe("problem-lot1-metadata", () => {
  it("title, H1 e description são únicos no lote", () => {
    for (const campo of ["metaTitle", "titulo", "metaDescription"] as const) {
      const valores = LOTE.map((p) => p[campo]);
      expect(new Set(valores).size, campo).toBe(valores.length);
    }
  });

  it("title e description ficam em faixa utilizável e o H1 não é vazio", () => {
    for (const p of LOTE) {
      expect(p.metaTitle.length, p.path).toBeGreaterThan(24);
      expect(p.metaDescription.length, p.path).toBeGreaterThan(70);
      expect(p.titulo.trim().length, p.path).toBeGreaterThan(10);
    }
  });
});

describe("problem-lot1-locality", () => {
  it("respeita o limite de menções a Curitiba em title, H1 e description", () => {
    for (const p of LOTE) {
      expect(contarCuritiba(p.metaTitle), `${p.path} title`).toBeLessThanOrEqual(LIMITE_MENCOES_CIDADE.titulo);
      expect(contarCuritiba(p.titulo), `${p.path} h1`).toBeLessThanOrEqual(LIMITE_MENCOES_CIDADE.h1);
      expect(contarCuritiba(p.metaDescription), `${p.path} description`).toBeLessThanOrEqual(
        LIMITE_MENCOES_CIDADE.metaDescription,
      );
    }
  });
});

describe("problem-lot1-interlinks", () => {
  it("cada página tem 1 serviço/solução e nenhum autolink ou destino repetido", () => {
    for (const p of LOTE) {
      const destinos = p.relacionados.map((r) => r.to);
      expect(destinos, p.path).not.toContain(p.path);
      expect(new Set(destinos).size, p.path).toBe(destinos.length);
      expect(destinos.some((d) => d.startsWith("/servicos/") || d.startsWith("/solucoes/")), p.path).toBe(true);
    }
  });

  it("links para outros sintomas do lote apontam para páginas que existem", () => {
    for (const p of LOTE) {
      for (const r of p.relacionados) {
        if (!r.to.startsWith("/problemas/")) continue;
        const ehDoLote = PATHS.has(r.to);
        const ehSatelite = r.to.includes("-curitiba") || r.to === "/problemas/computador-lento" || r.to === "/problemas/notebook-nao-liga";
        expect(ehDoLote || ehSatelite, `${p.path} → ${r.to}`).toBe(true);
      }
    }
  });

  it("âncoras são descritivas — nada de 'clique aqui'", () => {
    const vazias = /^(clique aqui|saiba mais|veja aqui|leia mais)$/i;
    for (const p of LOTE) {
      for (const r of p.relacionados) {
        expect(vazias.test(r.titulo.trim()), `${p.path} → ${r.to}`).toBe(false);
        expect(r.titulo.trim().length).toBeGreaterThan(3);
      }
    }
  });
});

describe("problem-lot1-conteudo", () => {
  it("toda página tem causas, verificações seguras e FAQ pertinente (3–6)", () => {
    for (const p of LOTE) {
      expect(p.causas.length, `${p.path} causas`).toBeGreaterThanOrEqual(3);
      expect(p.antesDeChamar.length, `${p.path} verificações`).toBeGreaterThanOrEqual(3);
      expect(p.faq.length, `${p.path} faq`).toBeGreaterThanOrEqual(3);
      expect(p.faq.length, `${p.path} faq`).toBeLessThanOrEqual(6);
    }
  });

  it("nenhuma FAQ é reaproveitada entre páginas do lote", () => {
    const perguntas = LOTE.flatMap((p) => p.faq.map((f) => `${f.q.toLowerCase().trim()}`));
    expect(new Set(perguntas).size).toBe(perguntas.length);
  });

  it("não promete diagnóstico fechado nem recuperação garantida", () => {
    const proibido = /(garantimos? (a )?recupera|recupera(ç|c)ão garantida|100% dos casos|sempre resolve)/i;
    for (const p of LOTE) {
      const texto = [p.resumo, ...p.causas.map((c) => c.desc), ...p.faq.map((f) => f.a)].join(" ");
      expect(proibido.test(texto), p.path).toBe(false);
    }
  });
});
