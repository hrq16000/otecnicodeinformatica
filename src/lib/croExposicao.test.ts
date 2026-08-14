import { beforeEach, describe, expect, it, vi } from "vitest";
import { exposicaoJaRegistrada, registrarExposicao } from "./croExposicao";
import type { ExperimentoCro } from "./croRodada7";

const trackMock = vi.fn();
vi.mock("./funnelAnalytics", () => ({
  track: (...args: unknown[]) => trackMock(...args),
  setActiveVariant: vi.fn(),
}));

const ativo: ExperimentoCro = {
  id: "exp-teste",
  hipotese: "h",
  rotas: ["/servicos/formatacao/curitiba"],
  cidades: ["curitiba"],
  ativo: true,
  variantes: [
    { id: "controle", rotulo: "Controle", peso: 1 },
    { id: "b", rotulo: "B", peso: 1 },
  ],
  registroFunil: ["page_view", "cta_click", "triage_start", "whatsapp_open", "lead"],
  amostraMinima: 200,
};

describe("croExposicao", () => {
  beforeEach(() => {
    sessionStorage.clear();
    trackMock.mockClear();
  });

  it("não emite exposição quando o experimento está desligado (fail-closed)", () => {
    const d = registrarExposicao({ path: "/", sessionId: "s1" });
    expect(d.habilitado).toBe(false);
    expect(trackMock).not.toHaveBeenCalled();
  });

  it("emite uma única exposição por sessão, sem PII", () => {
    const params = { path: "/servicos/formatacao/curitiba", cidade: "curitiba", sessionId: "s2", registro: [ativo] };
    const primeira = registrarExposicao(params);
    const segunda = registrarExposicao(params);
    expect(primeira.habilitado).toBe(true);
    expect(segunda.habilitado).toBe(true);
    expect(trackMock).toHaveBeenCalledTimes(1);
    const [nome, payload] = trackMock.mock.calls[0] as [string, Record<string, unknown>];
    expect(nome).toBe("experiment_exposure");
    expect(payload.experiment_id).toBe("exp-teste");
    expect(payload.city).toBe("curitiba");
    for (const proibido of ["nome", "email", "telefone", "cep", "lat", "lng"]) {
      expect(payload[proibido]).toBeUndefined();
    }
    expect(exposicaoJaRegistrada("exp-teste", "s2")).toBe(true);
  });
});

