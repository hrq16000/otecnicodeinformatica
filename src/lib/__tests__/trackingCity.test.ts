import { describe, expect, it } from "vitest";
import { cityFromPath, serviceSlugFromPath } from "@/lib/trackingTaxonomy";

describe("dimensão city dos eventos de conversão (Rodada 5D)", () => {
  it("extrai a cidade das rotas serviço × cidade", () => {
    expect(cityFromPath("/servicos/conserto-notebook/curitiba")).toBe("curitiba");
    expect(cityFromPath("/servicos/conserto-notebook/sao-jose-dos-pinhais")).toBe(
      "sao_jose_dos_pinhais",
    );
  });

  it("extrai a cidade das landings locais", () => {
    expect(cityFromPath("/tecnico-informatica-sao-jose-pinhais")).toBe("sao_jose_pinhais");
    expect(cityFromPath("/bairros/batel")).toBe("curitiba");
  });

  it("nunca cai em Curitiba por fallback", () => {
    expect(cityFromPath("/servicos/conserto-notebook")).toBe("nao_definida");
    expect(cityFromPath("/blog/algum-artigo")).toBe("nao_definida");
  });

  it("expõe o slug do serviço quando aplicável", () => {
    expect(serviceSlugFromPath("/servicos/redes-wifi/sao-jose-dos-pinhais")).toBe("redes_wifi");
    expect(serviceSlugFromPath("/")).toBe("nao_aplicavel");
  });
});
