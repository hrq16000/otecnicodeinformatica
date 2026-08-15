import { describe, expect, it } from "vitest";
import { agregarRecorte, avaliarLimites, cidadeDaRota, formatarAlerta } from "../../scripts/lib/funnel-thresholds.mjs";

const sessoes = (n: number, prefixo: string, eventos: string[], extra: Record<string, unknown> = {}) =>
  Array.from({ length: n }).flatMap((_, i) =>
    eventos.map((event_type) => ({
      event_type,
      session_id: `${prefixo}-${i}`,
      created_at: new Date().toISOString(),
      path: "/servicos/manutencao-de-notebook/curitiba",
      ...extra,
    })),
  );

describe("cidadeDaRota", () => {
  it("extrai cidade da rota serviço × cidade", () => {
    expect(cidadeDaRota("/servicos/manutencao-de-notebook/sao-jose-dos-pinhais")).toBe("sao-jose-dos-pinhais");
  });
  it("não inventa Curitiba quando a rota não declara cidade", () => {
    expect(cidadeDaRota("/problemas/notebook-nao-liga")).toBeUndefined();
    expect(cidadeDaRota(null)).toBeUndefined();
  });
});

describe("avaliarLimites", () => {
  const config = { amostraMinima: 30, janelaDias: 7, global: { whatsapp_rate: 0.1 }, recortes: [] };

  it("não alerta com amostra insuficiente", () => {
    const { violacoes, avaliados } = avaliarLimites(sessoes(5, "s", ["page_view"]), config);
    expect(violacoes).toHaveLength(0);
    expect(avaliados[0].status).toBe("insufficient_data");
  });

  it("alerta quando a taxa fica abaixo do limite com amostra suficiente", () => {
    const { violacoes } = avaliarLimites(sessoes(40, "s", ["page_view"]), config);
    expect(violacoes[0]).toMatchObject({ metrica: "whatsapp_rate", limite: 0.1, sessoes: 40 });
  });

  it("não alerta quando a taxa está acima do limite", () => {
    const dados = [...sessoes(40, "s", ["page_view"]), ...sessoes(20, "s", ["wa_click"])];
    const { violacoes } = avaliarLimites(dados, config);
    expect(violacoes).toHaveLength(0);
  });

  it("avalia recorte por cidade sem fallback geográfico", () => {
    const dados = sessoes(40, "sjp", ["page_view"], {
      path: "/servicos/manutencao-de-notebook/sao-jose-dos-pinhais",
    });
    const agg = agregarRecorte(dados, "city", "curitiba");
    expect(agg.sessoes).toBe(0);
    expect(agregarRecorte(dados, "city", "sao-jose-dos-pinhais").sessoes).toBe(40);
  });
});

describe("formatarAlerta", () => {
  it("devolve null sem violações", () => {
    expect(formatarAlerta([])).toBeNull();
  });
  it("formata mensagem sem PII", () => {
    const texto = formatarAlerta(
      [{ tipo: "city", valor: "curitiba", metrica: "whatsapp_rate", atual: 0.01, limite: 0.02, sessoes: 60 }],
      { janelaDias: 7 },
    );
    expect(texto).toContain("whatsapp_rate");
    expect(texto).toContain("60 sessões");
  });
});
