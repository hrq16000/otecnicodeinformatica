import { describe, expect, it } from "vitest";
import { resolverBusca, resolverComAmbiguidade, sugerir, expandirConsulta, INTENCOES, ROTA_FALLBACK } from "./buscaInteligente";

describe("busca inteligente de sintomas", () => {
  it("interpreta gírias e leva ao cluster de lentidão", () => {
    expect(resolverBusca("meu pc ta muito devagar").href).toBe("/problemas/computador-lento");
    expect(resolverBusca("notebook lerdo demora pra abrir").href).toBe("/problemas/computador-lento");
  });

  it("tolera erro de digitação", () => {
    expect(resolverBusca("tela azull do windons").href).toBe("/problemas/tela-azul");
    expect(resolverBusca("computadr lentoo").href).toBe("/problemas/computador-lento");
  });

  it("resolve sintomas de hardware e rede", () => {
    expect(resolverBusca("esquenta muito e desliga sozinho").href).toBe(
      "/servicos/manutencao-de-notebook",
    );
    expect(resolverBusca("wifi cai toda hora").href).toBe("/problemas/wifi-instavel");
    expect(resolverBusca("apaguei minhas fotos sem querer").href).toBe(
      "/problemas/arquivos-apagados",
    );
  });

  it("cai na triagem geral quando não há confiança", () => {
    const r = resolverBusca("xyzk qwerty");
    expect(r.href).toBe(ROTA_FALLBACK);
    expect(r.intencaoId).toBeNull();
  });

  it("expande sinônimos", () => {
    expect(expandirConsulta("PC devagar")).toContain("computador");
    expect(expandirConsulta("PC devagar")).toContain("lento");
  });

  it("sugere intenções sem consulta", () => {
    expect(sugerir("").length).toBe(6);
  });
});

describe("resolverComAmbiguidade", () => {
  it("pergunta antes de rotear quando o sintoma é ambíguo", () => {
    const r = resolverComAmbiguidade("a tela fica preta");
    expect(r.tipo).toBe("ambiguo");
    if (r.tipo === "ambiguo") {
      expect(r.opcoes.length).toBeGreaterThanOrEqual(2);
      expect(r.pergunta.length).toBeGreaterThan(10);
    }
  });

  it("roteia direto quando a intenção é clara", () => {
    const r = resolverComAmbiguidade("meu pc ta muito devagar");
    expect(r.tipo).toBe("destino");
    if (r.tipo === "destino") expect(r.href).toBe("/problemas/computador-lento");
  });

  it("nunca devolve opção fora do índice de intenções", () => {
    const rotas = new Set(INTENCOES.map((i) => i.href));
    const r = resolverComAmbiguidade("nao liga");
    if (r.tipo === "ambiguo") for (const o of r.opcoes) expect(rotas.has(o.href)).toBe(true);
  });
});
