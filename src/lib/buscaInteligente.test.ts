import { describe, expect, it } from "vitest";
import { resolverBusca, sugerir, expandirConsulta, ROTA_FALLBACK } from "./buscaInteligente";

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
