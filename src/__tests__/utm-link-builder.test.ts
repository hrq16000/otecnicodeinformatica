import { describe, expect, it } from "vitest";
import {
  PRESETS_AQUISICAO,
  construirLinkAquisicao,
  sanitizarValorUtm,
  validarDestino,
  validarValorUtm,
} from "@/lib/utmLinkBuilder";

describe("Rodada 8C — link builder de aquisição", () => {
  it("gera link válido para o preset do Google Business Profile", () => {
    const p = PRESETS_AQUISICAO.find((x) => x.id === "gbp_profile")!;
    const r = construirLinkAquisicao({
      destino: p.destinoSugerido,
      utm_source: p.utm_source,
      utm_medium: p.utm_medium,
      utm_campaign: p.utm_campaign,
    });
    expect(r.ok).toBe(true);
    expect(r.url).toContain("utm_source=google");
    expect(r.url).toContain("utm_medium=organic");
    expect(r.url).toContain("utm_campaign=gbp_profile");
  });

  it("rejeita destino externo, esquema perigoso e query própria", () => {
    expect(validarDestino("https://exemplo.com").ok).toBe(false);
    expect(validarDestino("//exemplo.com").ok).toBe(false);
    expect(validarDestino("javascript:alert(1)").ok).toBe(false);
    expect(validarDestino("/rota?x=1").ok).toBe(false);
    expect(validarDestino("/problemas/computador-lento").ok).toBe(true);
  });

  it("bloqueia PII e valores fora do padrão em UTM", () => {
    expect(validarValorUtm("utm_content", "cliente@email.com").ok).toBe(false);
    expect(validarValorUtm("utm_content", "41999999999").ok).toBe(false);
    expect(validarValorUtm("utm_campaign", "Campanha Curitiba").ok).toBe(false);
    expect(validarValorUtm("utm_campaign", "gbp_post").ok).toBe(true);
  });

  it("nunca aceita utm_source interno/QA como aquisição", () => {
    const r = construirLinkAquisicao({
      destino: "/",
      utm_source: "site",
      utm_medium: "cta",
      utm_campaign: "teste",
    });
    expect(r.ok).toBe(false);
  });

  it("sanitiza acentos e espaços para slug estável", () => {
    expect(sanitizarValorUtm("Manutenção Curitiba")).toBe("manutencao-curitiba");
  });

  it("todos os presets produzem link válido com o destino sugerido", () => {
    for (const p of PRESETS_AQUISICAO) {
      const r = construirLinkAquisicao({
        destino: p.destinoSugerido,
        utm_source: p.utm_source,
        utm_medium: p.utm_medium,
        utm_campaign: p.utm_campaign,
        utm_content: p.exigeContent ? "peca-exemplo" : undefined,
      });
      expect(r.ok, `${p.id}: ${r.erro ?? ""}`).toBe(true);
    }
  });
});
