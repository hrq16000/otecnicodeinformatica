// @ts-nocheck
import { describe, it, expect } from "vitest";
import { BLOCOS_4A, BLOCOS_4A_PATHS, CTA_4A, CONTEXTO_4A } from "@/lib/blocos4a";

/**
 * Rodada 4A — contratos de conteúdo das duas verticais multieletrônicos.
 * Testa a fonte única (compartilhada entre React e HTML estático).
 */
const texto = (path: string) => JSON.stringify(BLOCOS_4A[path]);

describe("Rodada 4A — escopo", () => {
  it("cobre exatamente as duas rotas já existentes", () => {
    expect(BLOCOS_4A_PATHS).toEqual(["/servicos/conserto-tv", "/servicos/conserto-placa"]);
  });

  it("não cria rota de monitor, áudio, marca, BGA ou hub de eletrônicos", () => {
    const todo = texto("/servicos/conserto-tv") + texto("/servicos/conserto-placa");
    expect(todo).not.toMatch(/\/eletronicos/);
    expect(todo).not.toMatch(/\/servicos\/conserto-(som|audio|jbl)/);
    expect(todo).not.toMatch(/reballing|\bBGA\b/i);
  });

  it("limita os indicadores do hero a quatro por página", () => {
    for (const p of BLOCOS_4A_PATHS) expect(BLOCOS_4A[p].resumo.length).toBeLessThanOrEqual(4);
  });
});

describe("Rodada 4A — TV / Smart TV", () => {
  const tv = "/servicos/conserto-tv";
  const t = () => texto(tv);

  it("delimita painel e display com a ressalva de viabilidade", () => {
    expect(t()).toMatch(/Painel e display são avaliados separadamente/);
    expect(t()).toMatch(/pode não apresentar viabilidade econômica/);
  });

  it("descreve a coleta e entrega em doze passos, com registro de estado", () => {
    const coleta = BLOCOS_4A[tv].secoes.find((s) => s.id === "coleta-tv") as { passos: string[] };
    expect(coleta.passos).toHaveLength(12);
    expect(t()).not.toMatch(/leva e traz/i);
  });

  it("apresenta reparo localizado sem prometer reparabilidade", () => {
    expect(t()).toMatch(/não é automaticamente a primeira opção/);
    expect(t()).toMatch(/pode ser considerado/);
    expect(t()).not.toMatch(/garantimos o reparo/i);
  });

  it("declara o escopo do teste final sem usar 'teste completo'", () => {
    expect(t()).toMatch(/depois do reparo/i);
    expect(t()).not.toMatch(/teste completo/i);
    expect(t()).not.toMatch(/100% (revisad|aprovad)/i);
  });

  it("mantém a garantia de 90 dias sempre com escopo", () => {
    for (const m of t().matchAll(/90 dias/g)) {
      const janela = t().slice(m.index!, m.index! + 120);
      expect(janela).toMatch(/mão de obra|ponto reparado|serviço executado/);
    }
  });

  it("usa o CTA e o contexto de triagem corretos", () => {
    expect(CTA_4A[tv].label).toBe("Descrever o problema da TV");
    expect(CONTEXTO_4A[tv]).toMatchObject({ service: "conserto-tv", equipment: "tv" });
  });

  it("não introduz prazo nem preço", () => {
    expect(t()).not.toMatch(/R\$\s?\d/);
    expect(t()).not.toMatch(/em at[ée] \d+\s*(dias|horas)/i);
  });
});

describe("Rodada 4A — reparo de placas", () => {
  const pl = "/servicos/conserto-placa";
  const t = () => texto(pl);

  it("apresenta os três níveis de intervenção", () => {
    expect(t()).toMatch(/N1 — módulo/);
    expect(t()).toMatch(/N2 — componente/);
    expect(t()).toMatch(/N3 — retrabalho avançado/);
  });

  it("responde placa avulsa com os dois caminhos e o limite de validação", () => {
    expect(t()).toMatch(/Sim, em determinados casos/);
    expect(t()).toMatch(/não podem ser completamente validadas fora do equipamento de origem/);
    const sec = BLOCOS_4A[pl].secoes.find((s) => s.id === "placa-avulsa") as {
      colunas: { titulo: string }[];
    };
    expect(sec.colunas).toHaveLength(2);
  });

  it("declara aceite, avaliação limitada e recusa", () => {
    const sec = BLOCOS_4A[pl].secoes.find((s) => s.id === "aceite-recusa") as {
      listas: { titulo: string; itens: string[] }[];
    };
    expect(sec.listas.map((l) => l.titulo)).toEqual([
      "Candidata a diagnóstico",
      "Pode ter avaliação limitada",
      "Pode ser recusada",
    ]);
    expect(sec.listas[2].itens.join(" ")).toMatch(/Carbonização extensa/);
  });

  it("trata placas já manipuladas sem recusa automática", () => {
    expect(t()).toMatch(/podem ser avaliadas, mas o histórico de intervenção/);
  });

  it("mantém a garantia de 90 dias sempre com escopo", () => {
    for (const m of t().matchAll(/90 dias/g)) {
      const janela = t().slice(m.index!, m.index! + 120);
      expect(janela).toMatch(/mão de obra|ponto reparado|serviço executado/);
    }
  });

  it("usa o CTA e o contexto de triagem corretos", () => {
    expect(CTA_4A[pl].label).toBe("Descrever a placa e o defeito");
    expect(CONTEXTO_4A[pl]).toMatchObject({ service: "conserto-placa" });
  });
});
