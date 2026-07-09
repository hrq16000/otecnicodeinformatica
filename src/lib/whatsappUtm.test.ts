import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { auditWhatsAppUrl, initWhatsAppUtm } from "./whatsappUtm";

describe("auditWhatsAppUrl", () => {
  it("detecta utm_source/medium/campaign/click_location ausentes", () => {
    const a = auditWhatsAppUrl("https://wa.me/5541997086380?text=oi");
    expect(a.ok).toBe(false);
    expect(a.missing).toEqual(
      expect.arrayContaining(["utm_source", "utm_medium", "utm_campaign", "click_location"]),
    );
  });

  it("aprova quando todos os parâmetros obrigatórios estão presentes", () => {
    const url =
      "https://wa.me/5541997086380?text=oi&utm_source=site&utm_medium=cta&utm_campaign=home&click_location=hero";
    const a = auditWhatsAppUrl(url);
    expect(a.ok).toBe(true);
    expect(a.missing).toEqual([]);
    expect(a.params.utm_source).toBe("site");
    expect(a.params.click_location).toBe("hero");
  });
});

describe("initWhatsAppUtm — injeta UTMs e audita no clique", () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = "";
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("aplica utm_source/medium/campaign/click_location e dispara wa-utm:audit OK", () => {
    initWhatsAppUtm();
    const a = document.createElement("a");
    a.href = "https://wa.me/5541997086380?text=oi";
    a.dataset.ctaLocation = "hero_test";
    document.body.appendChild(a);

    const auditSpy = vi.fn();
    window.addEventListener("wa-utm:audit", (e) => auditSpy((e as CustomEvent).detail));

    // preventDefault para o jsdom não tentar navegar
    a.addEventListener("click", (e) => e.preventDefault());
    a.click();

    expect(auditSpy).toHaveBeenCalledTimes(1);
    const audit = auditSpy.mock.calls[0][0];
    expect(audit.ok).toBe(true);
    expect(audit.params.click_location).toBe("hero_test");
    expect(audit.params.utm_source).toBeTruthy();
    expect(audit.params.utm_medium).toBeTruthy();
    expect(audit.params.utm_campaign).toBeTruthy();
  });
});
