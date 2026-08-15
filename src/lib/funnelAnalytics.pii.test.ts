import { describe, it, expect, beforeEach, vi } from "vitest";
import { sanitizeTelemetry, BLOCKED_TELEMETRY_KEYS, track, trackFunnelBusinessProfile } from "./funnelAnalytics";

describe("telemetria da triagem — bloqueio de PII", () => {
  beforeEach(() => {
    sessionStorage.clear();
    globalThis.gtag = vi.fn();
    (window as unknown as { __waFunnelEvents?: unknown[] }).__waFunnelEvents = [];
  });

  it("remove nome, empresa, descrição, endereço, telefone e coordenadas", () => {
    const out = sanitizeTelemetry({
      customer_type: "business",
      nome: "Ana Souza",
      empresa: "ACME & Cia",
      "biz-empresa": "ACME",
      descricao: "texto livre do cliente",
      telefone: "41999999999",
      endereco: "Rua X, 123",
      cep: "80000-000",
      latitude: -25.4,
      longitude: -49.2,
      marca: "Samsung",
      modelo: "50UN",
      wa_message: "mensagem completa",
    });
    expect(out).toEqual({ customer_type: "business" });
  });

  it("nunca serializa o objeto completo da triagem", () => {
    const out = sanitizeTelemetry({ answers: { fields: { nome: "Ana" } }, business: { "biz-intent": "rede" }, step: 3 });
    expect(out).toEqual({ step: 3 });
  });

  it("mantém dimensões categóricas permitidas", () => {
    const out = sanitizeTelemetry({
      customer_type: "business",
      business_intent: "rede",
      business_engagement: "recurring_evaluation",
      business_device_range: "6-15",
      business_impact: "empresa-toda",
      modalidade: "visita",
      bairro: "Batel, Curitiba",
      step: 2,
      abandoned_step: "business-context",
    });
    expect(Object.keys(out).sort()).toEqual(
      [
        "abandoned_step",
        "bairro",
        "business_device_range",
        "business_engagement",
        "business_impact",
        "business_intent",
        "customer_type",
        "modalidade",
        "step",
      ].sort(),
    );
  });

  it("limita cardinalidade de strings longas", () => {
    const out = sanitizeTelemetry({ origin_url: "x".repeat(500) }) as { origin_url: string };
    expect(out.origin_url.length).toBeLessThanOrEqual(80);
  });

  it("track() não vaza PII mesmo se o chamador enviar", () => {
    track("wa_funnel_step", { step: 1, nome: "Ana", descricao: "texto livre" });
    const payload = (globalThis.gtag as unknown as { mock: { calls: unknown[][] } }).mock.calls[0][2] as Record<string, unknown>;
    for (const k of ["nome", "descricao"]) expect(payload[k]).toBeUndefined();
    expect(payload.step).toBe(1);
  });

  it("perfil empresarial envia apenas enums normalizados", () => {
    trackFunnelBusinessProfile({ intent: "rede", engagement: "one_time", deviceRange: "2-5", impact: "algumas" });
    const payload = (globalThis.gtag as unknown as { mock: { calls: unknown[][] } }).mock.calls[0][2] as Record<string, unknown>;
    expect(payload.business_intent).toBe("rede");
    expect(JSON.stringify(payload)).not.toMatch(/ACME|Ana/);
  });

  it("a lista de bloqueio cobre os campos sensíveis do contrato", () => {
    for (const k of ["nome", "empresa", "descricao", "telefone", "endereco", "cep", "latitude", "longitude", "answers"]) {
      expect(BLOCKED_TELEMETRY_KEYS).toContain(k);
    }
  });
});
