import { describe, it, expect, beforeEach } from "vitest";
import { avaliarClique, resetDedup, DEDUP_CONFIG } from "./clickDedup";

describe("clickDedup — deduplicação e anti-fraude", () => {
  beforeEach(() => {
    sessionStorage.clear();
    resetDedup();
  });

  it("aceita o primeiro clique e descarta o duplo clique imediato", () => {
    const t = 1_000_000;
    expect(avaliarClique("wa_click", "mobile_sticky", t).aceito).toBe(true);
    const dup = avaliarClique("wa_click", "mobile_sticky", t + 300);
    expect(dup.aceito).toBe(false);
    expect(dup.motivo).toBe("duplicado");
  });

  it("aceita novamente após a janela de deduplicação", () => {
    const t = 2_000_000;
    expect(avaliarClique("wa_click", "hero", t).aceito).toBe(true);
    expect(avaliarClique("wa_click", "hero", t + DEDUP_CONFIG.JANELA_MS + 1).aceito).toBe(true);
  });

  it("posições diferentes são eventos distintos", () => {
    const t = 3_000_000;
    expect(avaliarClique("wa_click", "hero", t).aceito).toBe(true);
    expect(avaliarClique("wa_click", "mobile_sticky", t + 100).aceito).toBe(true);
  });

  it("marca rajada como suspeita e descarta os cliques seguintes", () => {
    const t = 4_000_000;
    for (let i = 0; i <= DEDUP_CONFIG.MAX_RAJADA; i += 1) {
      avaliarClique("wa_click", `pos_${i}`, t + i * 10);
    }
    const depois = avaliarClique("wa_click", "outro", t + 10_000);
    expect(depois.aceito).toBe(false);
    expect(depois.motivo).toBe("rajada");
  });

  it("respeita o teto de eventos por sessão", () => {
    let t = 5_000_000;
    let aceitos = 0;
    for (let i = 0; i < DEDUP_CONFIG.MAX_POR_EVENTO + 3; i += 1) {
      // espaça o suficiente para não cair em janela nem em rajada
      t += DEDUP_CONFIG.JANELA_MS + 100;
      if (avaliarClique("wa_click", "hero", t).aceito) aceitos += 1;
    }
    expect(aceitos).toBe(DEDUP_CONFIG.MAX_POR_EVENTO);
  });
});
