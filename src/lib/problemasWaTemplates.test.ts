import { describe, expect, it } from "vitest";
import {
  buildProblemaWaHref,
  buildProblemaWaFallbackHref,
  buildProblemaWaMessage,
  rotuloEvento,
} from "@/lib/problemasWaTemplates";

const BASE = "Meu notebook está com tela azul.";
const CTX = {
  sintoma: "tela-azul",
  secao: "faq-2",
  rolagem: 50,
  dispositivo: "notebook",
  bairro: "Batel",
  urgencia: "hoje" as const,
  variante: "a" as const,
};

describe("CTA de WhatsApp em /problemas", () => {
  it("mensagem traz sintoma, equipamento, bairro e urgência", () => {
    const msg = buildProblemaWaMessage(BASE, CTX);
    expect(msg).toContain(BASE);
    expect(msg).toContain("Equipamento: Notebook");
    expect(msg).toContain("Bairro/cidade: Batel");
    expect(msg).toMatch(/Urgência: preciso de atendimento ainda hoje/);
  });

  it("variante B acrescenta o pedido de próximo passo", () => {
    const msg = buildProblemaWaMessage(BASE, { ...CTX, variante: "b" });
    expect(msg).toMatch(/próximo passo/i);
  });

  it("href carrega UTM, rota, sintoma, seção, rolagem e variante", () => {
    const href = buildProblemaWaHref(BASE, CTX);
    if (!/^https?:\/\//.test(href)) return; // canal desligado (fail-closed)
    const url = new URL(href);
    expect(url.searchParams.get("text")).toContain("Batel");
    expect(url.searchParams.get("utm_medium")).toBe("cta_problema");
    expect(url.searchParams.get("utm_campaign")).toBe("tela-azul");
    expect(url.searchParams.get("utm_content")).toBe("problemas_faq-2");
    expect(url.searchParams.get("utm_term")).toBe("msg_a");
    expect(url.searchParams.get("rota")).toBe("/problemas/tela-azul");
    expect(url.searchParams.get("sintoma")).toBe("tela-azul");
    expect(url.searchParams.get("secao")).toBe("faq-2");
    expect(url.searchParams.get("rolagem")).toBe("50");
    expect(url.searchParams.get("dispositivo")).toBe("notebook");
    expect(url.searchParams.get("urgencia")).toBe("hoje");
    expect(url.searchParams.get("variante")).toBe("a");
  });

  it("fallback web mantém mensagem e todos os parâmetros de tracking", () => {
    const href = buildProblemaWaHref(BASE, CTX);
    if (!/^https?:\/\/wa\.me\//.test(href)) return;
    const principal = new URL(href);
    const fb = new URL(buildProblemaWaFallbackHref(BASE, CTX));
    expect(fb.origin + fb.pathname).toBe("https://api.whatsapp.com/send");
    expect(fb.searchParams.get("phone")).toBe(principal.pathname.replace("/", ""));
    for (const key of ["text", "utm_medium", "utm_campaign", "utm_content", "rota", "sintoma", "secao", "rolagem", "variante"]) {
      expect(fb.searchParams.get(key)).toBe(principal.searchParams.get(key));
    }
  });

  it("rótulo de evento identifica sintoma, seção, rolagem e variante", () => {
    expect(rotuloEvento(CTX)).toBe("problema_tela-azul_faq-2_scroll50_msga");
  });
});
