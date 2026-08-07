import { describe, it, expect } from "vitest";
import { EQUIPMENT_BRANCHES, getBranch, getSintoma } from "./equipmentBranches";

describe("equipmentBranches", () => {
  it("expõe os 7 equipamentos esperados", () => {
    const ids = EQUIPMENT_BRANCHES.map((b) => b.id).sort();
    expect(ids).toEqual(["celular", "monitor", "outro", "pc", "som", "tv", "videogame"]);
  });

  it("monitor: todo sintoma listado exige Coleta e Entrega", () => {
    const b = getBranch("monitor");
    expect(b?.sintomas.length).toBeGreaterThan(0);
    for (const s of b!.sintomas) {
      expect(s.requiresColeta, `monitor/${s.id} deve exigir coleta`).toBe(true);
    }
  });

  it("'não liga' sempre exige Coleta e Entrega", () => {
    for (const equip of ["pc", "tv", "som", "videogame"] as const) {
      const sintoma = getSintoma(equip, "nao-liga");
      expect(sintoma?.requiresColeta, `${equip}/nao-liga deve exigir coleta`).toBe(true);
    }
  });

  it("TV: 'liga-desliga' (desliga sozinha) exige coleta + vídeo", () => {
    const s = getSintoma("tv", "liga-desliga");
    expect(s?.requiresColeta).toBe(true);
    expect(s?.requiresVideo).toBe(true);
  });

  it("celular tela trincada exige coleta", () => {
    const s = getSintoma("celular", "tela-trincada");
    expect(s?.requiresColeta).toBe(true);
  });

  it("PC 'lento' NÃO exige coleta (atendível em visita / remoto)", () => {
    const s = getSintoma("pc", "lento");
    expect(s?.requiresColeta).toBeFalsy();
  });

  it("branch 'outro' não tem opções de sintoma (vai direto pra descrição)", () => {
    const b = getBranch("outro");
    expect(b?.sintomas.length).toBe(0);
  });
});
