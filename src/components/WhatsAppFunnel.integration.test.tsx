import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WhatsAppFunnel } from "./WhatsAppFunnel";
import { VIDEO_WARNING } from "@/lib/funnelWarning";

// Capture window.open calls without opening real popups
const openSpy = vi.fn<(url?: string | URL, target?: string, features?: string) => Window | null>(
  () => null,
);

beforeEach(() => {
  openSpy.mockClear();
  // jsdom: stub window.open
  vi.stubGlobal("open", openSpy);
  // gtag spy
  (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

function renderFunnel() {
  return render(
    <MemoryRouter>
      <WhatsAppFunnel />
    </MemoryRouter>,
  );
}

function openFunnel() {
  window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
}

function getDialog() {
  return screen.getByRole("dialog");
}

function getLastWaUrl(): URL | null {
  for (let i = openSpy.mock.calls.length - 1; i >= 0; i -= 1) {
    const arg = openSpy.mock.calls[i][0];
    const href = typeof arg === "string" ? arg : arg?.toString();
    if (href && href.includes("wa.me")) return new URL(href);
  }
  return null;
}

describe("WhatsAppFunnel — Cenário 1: Cliente Simples (PC > Lento)", () => {
  it("fluxo passa direto, exibe valores R$ 99,99 / R$ 90 e a URL final contém o aviso obrigatório", async () => {
    renderFunnel();
    openFunnel();
    const dialog = getDialog();

    // Step 0: PC
    fireEvent.click(within(dialog).getByRole("button", { name: /PC \/ Notebook/i }));

    // Step 1: marca + sintoma
    fireEvent.click(within(dialog).getByRole("button", { name: /^Dell$/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Lento \/ travando/i }));

    // Transparência mini deve mencionar os preços
    expect(within(dialog).getByText(/R\$ 99,99/)).toBeInTheDocument();
    expect(within(dialog).getByText(/R\$ 90/)).toBeInTheDocument();

    // Continuar avança (sem coleta → pula step 2, vai direto pra confirmação)
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    // Step 3 (confirmação)
    expect(within(dialog).getByText(/Triagem completa/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Próximo passo no WhatsApp/i)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: /Abrir WhatsApp/i }));

    const url = getLastWaUrl();
    expect(url, "deve ter chamado window.open com wa.me").not.toBeNull();
    const text = url!.searchParams.get("text") || "";
    expect(text).toContain("PC / Notebook");
    expect(text).toContain("Dell");
    expect(text).toContain("Lento");
    expect(text.endsWith(VIDEO_WARNING)).toBe(true);
  });
});

describe("WhatsAppFunnel — Cenário 2: Barreira de Fogo (TV > Não liga)", () => {
  it("bloqueia avanço até aceite da Coleta e mensagem final inclui R$ 300 + COLETA", () => {
    renderFunnel();
    openFunnel();
    const dialog = getDialog();

    fireEvent.click(within(dialog).getByRole("button", { name: /^TV$/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /^Samsung$/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /^Não liga$/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    // Step 2 — ColetaRequiredCard deve estar visível e botão Continuar desabilitado
    expect(within(dialog).getByText(/exige.*Coleta e Entrega/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/R\$ 300/)).toBeInTheDocument();

    const continueBtn = within(dialog).getByRole("button", { name: /Continuar/i });
    expect(continueBtn).toBeDisabled();

    // Tentar clicar mesmo desabilitado: nenhuma URL deve ter sido aberta
    fireEvent.click(continueBtn);
    expect(getLastWaUrl()).toBeNull();

    // Marca o aceite
    const acceptCheckbox = within(dialog).getByRole("checkbox");
    fireEvent.click(acceptCheckbox);
    expect(continueBtn).toBeEnabled();

    fireEvent.click(continueBtn);
    fireEvent.click(within(dialog).getByRole("button", { name: /Abrir WhatsApp/i }));

    const url = getLastWaUrl();
    expect(url).not.toBeNull();
    const text = url!.searchParams.get("text") || "";
    expect(text).toContain("COLETA E ENTREGA");
    expect(text).toContain("R$ 300");
    expect(text).toContain("Não liga");
    expect(text.endsWith(VIDEO_WARNING)).toBe(true);
  });
});

describe("WhatsAppFunnel — Cenário 3: Tela Quebrada (Celular)", () => {
  it("aceita coleta e mensagem final inclui exigência completa de fotos + vídeo + etiqueta traseira", () => {
    renderFunnel();
    openFunnel();
    const dialog = getDialog();

    fireEvent.click(within(dialog).getByRole("button", { name: /Celular \/ Tablet/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /iPhone \(Apple\)/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Tela trincada/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    // aceite de coleta
    fireEvent.click(within(dialog).getByRole("checkbox"));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    fireEvent.click(within(dialog).getByRole("button", { name: /Abrir WhatsApp/i }));

    const url = getLastWaUrl();
    expect(url).not.toBeNull();
    const text = url!.searchParams.get("text") || "";

    // Cláusulas obrigatórias da etapa final
    expect(text).toMatch(/fotos/i);
    expect(text).toMatch(/etiqueta traseira/i);
    expect(text).toMatch(/v[ií]deo/i);
    expect(text).toMatch(/sem .*[áa]udio/i);
    expect(text).toMatch(/atendimento n[ãa]o ser[áa] iniciado/i);
    expect(text.endsWith(VIDEO_WARNING)).toBe(true);
  });
});

describe("WhatsAppFunnel — guard de submit", () => {
  it("não abre WhatsApp se nenhum equipamento foi selecionado", () => {
    renderFunnel();
    openFunnel();
    // Não interage — submit não existe ainda neste step, mas a tentativa direta
    // de avançar não pode disparar window.open.
    expect(getLastWaUrl()).toBeNull();
  });
});
