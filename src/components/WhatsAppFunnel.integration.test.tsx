import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WhatsAppFunnel } from "./WhatsAppFunnel";
import { VIDEO_WARNING } from "@/lib/funnelWarning";

const openSpy = vi.fn<(url?: string | URL, target?: string, features?: string) => Window | null>(
  () => null,
);

beforeEach(() => {
  openSpy.mockClear();
  vi.stubGlobal("open", openSpy);
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

async function openAndGetDialog() {
  await act(async () => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  return await screen.findByRole("dialog", {}, { timeout: 3000 });
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
    const dialog = await openAndGetDialog();

    fireEvent.click(within(dialog).getByRole("button", { name: /PC \/ Notebook/i }));
    fireEvent.click(await within(dialog).findByRole("button", { name: /^Dell$/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Lento \/ travando/i }));

    expect(within(dialog).getByText(/R\$ 99,99/)).toBeInTheDocument();
    expect(within(dialog).getByText(/R\$ 90/)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));
    expect(await within(dialog).findByText(/Triagem completa/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Próximo passo no WhatsApp/i)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: /Abrir WhatsApp/i }));

    const url = getLastWaUrl();
    expect(url, "deve abrir wa.me").not.toBeNull();
    const text = url!.searchParams.get("text") || "";
    expect(text).toContain("PC / Notebook");
    expect(text).toContain("Dell");
    expect(text).toContain("Lento");
    expect(text.endsWith(VIDEO_WARNING)).toBe(true);
  });
});

describe("WhatsAppFunnel — Cenário 2: Barreira de Fogo (TV > Não liga)", () => {
  it("bloqueia avanço até aceite da Coleta e mensagem final inclui R$ 300 + COLETA", async () => {
    renderFunnel();
    const dialog = await openAndGetDialog();

    fireEvent.click(within(dialog).getByRole("button", { name: /^TV$/i }));
    fireEvent.click(await within(dialog).findByRole("button", { name: /^Samsung$/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /^Não liga$/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    expect(await within(dialog).findByText(/exige.*Coleta e Entrega/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/R\$ 300/)).toBeInTheDocument();

    const continueBtn = within(dialog).getByRole("button", { name: /Continuar/i });
    expect(continueBtn).toBeDisabled();

    fireEvent.click(continueBtn);
    expect(getLastWaUrl()).toBeNull();

    const acceptCheckbox = within(dialog).getByRole("checkbox");
    fireEvent.click(acceptCheckbox);
    expect(continueBtn).toBeEnabled();

    fireEvent.click(continueBtn);
    fireEvent.click(await within(dialog).findByRole("button", { name: /Abrir WhatsApp/i }));

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
  it("aceita coleta e mensagem final inclui exigência completa de fotos + vídeo + etiqueta traseira", async () => {
    renderFunnel();
    const dialog = await openAndGetDialog();

    fireEvent.click(within(dialog).getByRole("button", { name: /Celular \/ Tablet/i }));
    fireEvent.click(await within(dialog).findByRole("button", { name: /iPhone \(Apple\)/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Tela trincada/i }));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));

    fireEvent.click(await within(dialog).findByRole("checkbox"));
    fireEvent.click(within(dialog).getByRole("button", { name: /Continuar/i }));
    fireEvent.click(await within(dialog).findByRole("button", { name: /Abrir WhatsApp/i }));

    const url = getLastWaUrl();
    expect(url).not.toBeNull();
    const text = url!.searchParams.get("text") || "";

    expect(text).toMatch(/fotos/i);
    expect(text).toMatch(/etiqueta traseira/i);
    expect(text).toMatch(/v[ií]deo/i);
    expect(text).toMatch(/sem .*[áa]udio/i);
    expect(text).toMatch(/atendimento n[ãa]o ser[áa] iniciado/i);
    expect(text.endsWith(VIDEO_WARNING)).toBe(true);
  });
});

describe("WhatsAppFunnel — guard de submit", () => {
  it("não abre WhatsApp se nenhum equipamento foi selecionado", async () => {
    renderFunnel();
    await openAndGetDialog();
    expect(getLastWaUrl()).toBeNull();
  });
});
