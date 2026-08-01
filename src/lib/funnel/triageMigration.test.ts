import { describe, it, expect, beforeEach } from "vitest";
import {
  loadPersisted,
  persist,
  clearPersisted,
  normalizeAnswers,
  migrateLegacyAnswers,
  resetForCustomerType,
  buildTriageSummary,
  buildWhatsAppMessage,
  getSteps,
  validateStep,
  LEGACY_STORAGE_KEYS,
} from "./triageMachine";
import { EMPTY_ANSWERS, STORAGE_KEY, TRIAGE_VERSION, type TriageAnswers } from "./triageConfig";

const LEGACY_KEY = LEGACY_STORAGE_KEYS[LEGACY_STORAGE_KEYS.length - 1]; // triage_state_5.0

function legacySession(answers: Record<string, unknown>, version = "5.0") {
  sessionStorage.setItem(LEGACY_KEY, JSON.stringify({ version, answers }));
}

beforeEach(() => sessionStorage.clear());

describe("estado v6 — normalização defensiva", () => {
  it("customerType ausente ou desconhecido vira null sem quebrar", () => {
    expect(normalizeAnswers({}).customerType).toBeNull();
    expect(normalizeAnswers({ customerType: "alien" }).customerType).toBeNull();
  });

  it("nunca produz undefined nos campos do contrato", () => {
    const a = normalizeAnswers({ fields: null, business: 42, termsAccepted: "x", finalNotes: 9 });
    for (const key of Object.keys(EMPTY_ANSWERS) as (keyof TriageAnswers)[]) {
      expect(a[key]).not.toBeUndefined();
    }
    expect(a.fields).toEqual({});
    expect(a.business).toEqual({});
  });

  it("estado PJ não carrega campos residenciais de equipamento", () => {
    const a = normalizeAnswers({
      customerType: "business",
      equipment: "tv",
      symptom: "nao-liga",
      fields: { nome: "Ana", bairro: "Batel", marca: "Samsung" },
      business: { "biz-intent": "rede" },
    });
    expect(a.equipment).toBeNull();
    expect(a.symptom).toBeNull();
    expect(a.fields.marca).toBeUndefined();
    expect(a.fields.nome).toBe("Ana");
  });

  it("estado PF não carrega campos empresariais", () => {
    const a = normalizeAnswers({ customerType: "residential", business: { "biz-empresa": "ACME" } });
    expect(a.business).toEqual({});
  });

  it("valores inválidos de enum são descartados", () => {
    const a = normalizeAnswers({ equipment: "nave", urgency: "amanha-cedo" });
    expect(a.equipment).toBeNull();
    expect(a.urgency).toBeNull();
  });

  it("estado incompleto não deixa o usuário preso numa etapa inexistente", () => {
    const a = normalizeAnswers({ customerType: "business" });
    const steps = getSteps(a);
    expect(steps.length).toBeGreaterThan(1);
    expect(validateStep(steps.length + 5, a).ok).toBe(true);
  });
});

describe("migração de sessões anteriores", () => {
  it("sessão antiga válida assume PF/residencial preservando respostas compatíveis", () => {
    legacySession({
      equipment: "tv",
      symptom: "nao-liga",
      urgency: "72h",
      fields: { nome: "Ana", bairro: "Batel, Curitiba", tipo: "led" },
      termsAccepted: { antigo: true },
    });
    const a = loadPersisted(STORAGE_KEY)!;
    expect(a.customerType).toBe("residential");
    expect(a.equipment).toBe("tv");
    expect(a.fields.bairro).toBe("Batel, Curitiba");
    // Aceites antigos não valem para os termos atuais.
    expect(a.termsAccepted).toEqual({});
    // Chave legada é limpa e o estado é regravado na chave atual.
    expect(sessionStorage.getItem(LEGACY_KEY)).toBeNull();
    expect(JSON.parse(sessionStorage.getItem(STORAGE_KEY)!).version).toBe(TRIAGE_VERSION);
  });

  it("migração é idempotente — abrir duas vezes não altera o estado", () => {
    legacySession({ equipment: "pc", fields: { nome: "Ana", bairro: "Batel" } });
    const first = loadPersisted(STORAGE_KEY);
    const second = loadPersisted(STORAGE_KEY);
    expect(second).toEqual(first);
  });

  it("sessão corrompida faz fallback seguro (sem exceção)", () => {
    sessionStorage.setItem(LEGACY_KEY, "{{{não é json");
    expect(() => loadPersisted(STORAGE_KEY)).not.toThrow();
    expect(loadPersisted(STORAGE_KEY)).toBeNull();
  });

  it("versão futura desconhecida é descartada com segurança", () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ version: "99.0", answers: { equipment: "tv" } }));
    expect(loadPersisted(STORAGE_KEY)).toBeNull();
  });

  it("sessão antiga vazia não gera estado fantasma", () => {
    legacySession({});
    expect(loadPersisted(STORAGE_KEY)).toBeNull();
  });

  it("migração descarta seletivamente sem apagar todo o progresso", () => {
    const a = migrateLegacyAnswers({
      customerType: "business",
      equipment: "tv",
      fields: { nome: "Ana", bairro: "Batel" },
      business: { "biz-empresa": "ACME" },
    });
    expect(a.customerType).toBe("residential");
    expect(a.business).toEqual({});
    expect(a.fields.nome).toBe("Ana");
  });
});

describe("troca PF ↔ PJ — limpeza seletiva", () => {
  const pf: TriageAnswers = {
    ...EMPTY_ANSWERS,
    customerType: "residential",
    equipment: "tv",
    symptom: "nao-liga",
    urgency: "72h",
    fields: { nome: "Ana", bairro: "Batel, Curitiba", marca: "Samsung", modelo: "50UN" },
    termsAccepted: { coleta: true },
  };

  it("PF → PJ remove equipamento, sintoma e aceites, preservando nome/bairro/urgência", () => {
    const pj = resetForCustomerType(pf, "business");
    expect(pj.equipment).toBeNull();
    expect(pj.symptom).toBeNull();
    expect(pj.fields.marca).toBeUndefined();
    expect(pj.termsAccepted).toEqual({});
    expect(pj.fields.nome).toBe("Ana");
    expect(pj.fields.bairro).toBe("Batel, Curitiba");
    expect(pj.urgency).toBe("72h");
  });

  it("PJ → PF remove empresa, intenção, engajamento, faixa, ambiente e impacto", () => {
    const pj: TriageAnswers = {
      ...EMPTY_ANSWERS,
      customerType: "business",
      urgency: "semana",
      fields: { nome: "Ana", bairro: "Batel" },
      business: {
        "biz-empresa": "ACME & Cia",
        "biz-intent": "rede",
        "biz-engagement": "recurring_evaluation",
        "biz-device-range": "6-15",
        "biz-environment": "servidor",
        "biz-impact": "empresa-toda",
        "biz-descricao": "Rede caindo",
        "biz-modality": "visita",
      },
    };
    const back = resetForCustomerType(pj, "residential");
    expect(back.business).toEqual({});
    const summary = JSON.stringify(buildTriageSummary(back));
    expect(summary).not.toMatch(/ACME/);
    const msg = buildWhatsAppMessage(back, "T-TESTE");
    expect(msg).not.toMatch(/ACME/);
    expect(msg).not.toMatch(/Rede caindo/);
    expect(msg).not.toMatch(/undefined|null/);
  });
});

describe("PJ recorrente — verdade comercial", () => {
  const recorrente: TriageAnswers = {
    ...EMPTY_ANSWERS,
    customerType: "business",
    urgency: "semana",
    fields: { nome: "Ana", bairro: "Batel, Curitiba" },
    business: {
      "biz-empresa": "ACME & Cia",
      "biz-intent": "recorrente",
      "biz-engagement": "recurring_evaluation",
      "biz-device-range": "6-15",
      "biz-impact": "avaliacao",
      "biz-modality": "orientacao",
    },
  };

  it("não promete mensalidade, SLA, prazo garantido ou técnico dedicado", () => {
    const msg = buildWhatsAppMessage(recorrente, "T-TESTE");
    for (const rx of [/mensalidad/i, /por m[êe]s/i, /\bSLA\b/, /prazo garantido/i, /t[ée]cnico dedicado/i, /fidelidade/i, /zero downtime/i]) {
      expect(msg).not.toMatch(rx);
    }
  });

  it("recorrente não apresenta valor fechado — fica sob avaliação", () => {
    const msg = buildWhatsAppMessage(recorrente, "T-TESTE");
    expect(msg).toMatch(/Definido após avaliação/i);
    expect(msg).not.toMatch(/or[çc]amento fechado/i);
  });

  it("PJ avulso mantém o mínimo oficial de R$ 99,99 como referência", () => {
    const avulso: TriageAnswers = {
      ...recorrente,
      business: {
        ...recorrente.business,
        "biz-intent": "pontual",
        "biz-engagement": "one_time",
        "biz-impact": "algumas",
        "biz-modality": "visita",
      },
    };
    const msg = buildWhatsAppMessage(avulso, "T-TESTE");
    expect(msg).toMatch(/R\$ 99,99/);
    expect(msg).not.toMatch(/or[çc]amento fechado/i);
  });

  it("mensagem PJ é URL-encodável com acentos, & e aspas sem perda", () => {
    const a: TriageAnswers = {
      ...recorrente,
      business: { ...recorrente.business, "biz-descricao": 'Servidor "principal" & rede lenta — não conecta' },
    };
    const msg = buildWhatsAppMessage(a, "T-TESTE");
    const url = new URL("https://wa.me/5541999999999");
    url.searchParams.set("text", msg);
    expect(url.searchParams.get("text")).toBe(msg);
    expect(msg).not.toMatch(/undefined|\[object Object\]/);
  });

  it("empresa vazia não gera linha vazia nem 'undefined'", () => {
    const a: TriageAnswers = { ...recorrente, business: { ...recorrente.business, "biz-empresa": "" } };
    const msg = buildWhatsAppMessage(a, "T-TESTE");
    expect(msg).not.toMatch(/Empresa:\*?\s*$/m);
    expect(msg).not.toMatch(/undefined/);
  });
});

describe("nova triagem após conclusão", () => {
  it("estado limpo não contamina a próxima abertura", () => {
    persist(STORAGE_KEY, { ...EMPTY_ANSWERS, customerType: "business", business: { "biz-intent": "rede" } });
    clearPersisted(STORAGE_KEY);
    expect(loadPersisted(STORAGE_KEY)).toBeNull();
  });
});
