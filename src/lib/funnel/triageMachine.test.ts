import { describe, it, expect } from "vitest";
import {
  determineServiceRoute,
  getPricingRules,
  getIdentityFields,
  getDetailsFields,
  getEventField,
  getTermsForRoute,
  validateStep,
  resetForEquipment,
  resetForSymptom,
  buildWhatsAppMessage,
  buildTriageSummary,
  STEPS,
} from "./triageMachine";
import { EMPTY_ANSWERS, type TriageAnswers } from "./triageConfig";

function base(patch: Partial<TriageAnswers>): TriageAnswers {
  return { ...EMPTY_ANSWERS, customerType: "residential", ...patch, fields: { ...(patch.fields ?? {}) } };
}

describe("triageMachine — regras de modalidade", () => {
  it("1. PC funcionando + instalar/configurar → remoto", () => {
    const a = base({ equipment: "pc", fields: { liga: "liga-normal" }, symptom: "instalar-configurar" });
    expect(determineServiceRoute(a)).toBe("remoto");
  });

  it("2. PC funcionando + impressora/periférico → visita", () => {
    const a = base({ equipment: "pc", fields: { liga: "liga-normal" }, symptom: "impressora-periferico" });
    expect(determineServiceRoute(a)).toBe("visita");
  });

  it("3. PC que não liga → coleta (mesmo se objetivo for software)", () => {
    const a = base({ equipment: "pc", fields: { liga: "nao-liga" }, symptom: "instalar-configurar" });
    expect(determineServiceRoute(a)).toBe("coleta");
  });

  it("4. Notebook com possível placa → coleta", () => {
    const a = base({ equipment: "pc", fields: { liga: "liga-normal", tipo: "notebook" }, symptom: "nao-liga-placa" });
    expect(determineServiceRoute(a)).toBe("coleta");
  });

  it("5. TV tela quebrada → coleta + hint de display", () => {
    const a = base({ equipment: "tv", fields: {}, symptom: "tela-quebrada" });
    const r = getPricingRules(a);
    expect(r.route).toBe("coleta");
    expect(r.priceHint).toMatch(/display/i);
  });

  it("6. TV não liga → coleta e evento é 'quando aconteceu' (não frequência)", () => {
    const a = base({ equipment: "tv", fields: {}, symptom: "nao-liga" });
    expect(determineServiceRoute(a)).toBe("coleta");
    expect(getEventField(a)?.label).toMatch(/quando aconteceu/i);
  });

  it("7. Celular molhou → coleta + perguntas condicionais de líquido", () => {
    const a = base({ equipment: "celular", fields: { tipo: "celular", marca: "Samsung" }, symptom: "molhou" });
    expect(determineServiceRoute(a)).toBe("coleta");
    const ids = getDetailsFields(a).map((f) => f.id);
    expect(ids).toContain("molhou-tentou");
    expect(ids).toContain("molhou-ligado");
    expect(getEventField(a)?.label).toMatch(/quando aconteceu/i);
  });

  it("8. Tablet tela quebrou → coleta", () => {
    const a = base({ equipment: "celular", fields: { tipo: "tablet", marca: "Apple" }, symptom: "tela-quebrou" });
    expect(determineServiceRoute(a)).toBe("coleta");
  });

  it("9. Surface → sempre coleta", () => {
    const a = base({ equipment: "surface", fields: { liga: "sim" }, symptom: "sistema" });
    expect(determineServiceRoute(a)).toBe("coleta");
  });

  it("10. Receiver sem som → coleta + campos específicos de áudio", () => {
    const a = base({ equipment: "som", fields: { tipo: "receiver" }, symptom: "liga-sem-som" });
    expect(determineServiceRoute(a)).toBe("coleta");
    expect(getIdentityFields(a).some((f) => f.id === "tipo")).toBe(true);
  });

  it("11. Videogame que desliga sozinho → coleta + frequência", () => {
    const a = base({ equipment: "videogame", fields: { console: "PlayStation 5" }, symptom: "desliga-sozinho" });
    expect(determineServiceRoute(a)).toBe("coleta");
    expect(getEventField(a)?.label).toMatch(/frequ/i);
  });

  it("12. Outro → coleta", () => {
    const a = base({ equipment: "outro", fields: { "equip-nome": "Drone", marca: "DJI", liga: "sim" }, symptom: "Não sobe" });
    expect(determineServiceRoute(a)).toBe("coleta");
  });
});

describe("triageMachine — limpeza de respostas dependentes", () => {
  it("trocar equipamento limpa respostas incompatíveis", () => {
    const a = base({ equipment: "pc", fields: { liga: "liga-normal", tipo: "notebook" }, symptom: "instalar-configurar" });
    const next = resetForEquipment(a, "tv");
    expect(next.equipment).toBe("tv");
    expect(next.symptom).toBeNull();
    expect(next.fields).toEqual({});
  });

  it("trocar sintoma limpa respostas contextuais dependentes", () => {
    const a = base({
      equipment: "celular",
      fields: { tipo: "celular", marca: "Samsung", "molhou-tentou": "liguei", __event: "hoje" },
      symptom: "molhou",
    });
    const next = resetForSymptom(a, "caiu");
    expect(next.symptom).toBe("caiu");
    expect(next.fields["molhou-tentou"]).toBeUndefined();
    expect(next.fields.__event).toBeUndefined();
    // Identificação preservada
    expect(next.fields.marca).toBe("Samsung");
  });
});

describe("triageMachine — validação e termos", () => {
  it("bloqueia identidade sem sintoma", () => {
    const a = base({
      equipment: "pc",
      fields: { nome: "Ana", bairro: "Batel, Curitiba", tipo: "notebook", liga: "liga-normal" },
    });
    const v = validateStep(2, a);
    expect(v.ok).toBe(false);
    expect(v.firstIncomplete).toBe("symptom");
  });

  it("exige qualificação curta (nome e bairro) antes de seguir", () => {
    const a = base({ equipment: "pc", fields: { tipo: "notebook" } });
    const v = validateStep(2, a);
    expect(v.ok).toBe(false);
    expect(v.firstIncomplete).toBe("nome");
  });


  it("coleta exige 4 aceites; remoto exige 2", () => {
    expect(getTermsForRoute("coleta")).toHaveLength(4);
    expect(getTermsForRoute("visita")).toHaveLength(2);
    expect(getTermsForRoute("remoto")).toHaveLength(2);
  });

  it("terms step falha sem todos os aceites", () => {
    const a = base({ equipment: "tv", symptom: "nao-liga", urgency: "72h", fields: {} });
    const stepTerms = STEPS.indexOf("terms");
    expect(validateStep(stepTerms, a).ok).toBe(false);
  });
});

describe("triageMachine — mensagem de WhatsApp", () => {
  it("gera resumo legível sem campos vazios e com modalidade/valores", () => {
    const a = base({
      equipment: "tv",
      fields: { tipo: "led", modelo: "Samsung 50", __event: "hoje" },
      symptom: "tela-quebrada",
      urgency: "72h",
    });
    const msg = buildWhatsAppMessage(a, "T-TESTE");
    expect(msg).toMatch(/Equipamento:\*? TV/);
    expect(msg).toMatch(/Modalidade indicada:\*? Coleta e entrega/i);
    expect(msg).toMatch(/R\$ 299,99/);
    expect(msg).toMatch(/T-TESTE/);
    // Não deve conter marcadores de valor vazio
    expect(msg).not.toMatch(/:\s*$/m);
  });

  it("resumo inclui urgência com o novo texto de 72h e não 'Hoje'", () => {
    const a = base({ equipment: "pc", fields: { liga: "liga-normal", tipo: "notebook" }, symptom: "instalar-configurar", urgency: "72h" });
    const rows = buildTriageSummary(a);
    const urg = rows.find((r) => r.label === "Urgência");
    expect(urg?.value).toMatch(/72 horas úteis/i);
  });
});
