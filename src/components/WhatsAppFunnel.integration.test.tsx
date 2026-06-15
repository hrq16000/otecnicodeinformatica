import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, cleanup } from "@testing-library/react";
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

async function openFunnel() {
  await act(async () => {
    window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
  });
  await screen.findByRole("dialog", {}, { timeout: 3000 });
}

/** Encontra um botão dentro do dialog atual e clica nele, aguardando re-render. */
async function clickButton(re: RegExp) {
  const dialog = await screen.findByRole("dialog");
  const buttons = dialog.querySelectorAll<HTMLButtonElement>("button");
  const btn = Array.from(buttons).find((b) => re.test(b.textContent || ""));
  if (!btn) {
    throw new Error(`Botão não encontrado para ${re} dentro do dialog`);
  }
  await act(async () => {
    btn.click();
  });
}

/** Marca/desmarca o checkbox de aceite da Coleta (input[type=checkbox] dentro do card). */
async function clickAcceptCheckbox() {
  const dialog = await screen.findByRole("dialog");
  const cb = dialog.querySelector<HTMLInputElement>('input[type="checkbox"]');
  if (!cb) throw new Error("checkbox de aceite não encontrado");
  await act(async () => {
    cb.click();
  });
}

function dialogText(): string {
  const d = screen.queryByRole("dialog");
  return d?.textContent || "";
}

function continueIsDisabled(): boolean {
  const dialog = screen.getByRole("dialog");
  const btn = Array.from(dialog.querySelectorAll<HTMLButtonElement>("button"))
    .find((b) => /Continuar/i.test(b.textContent || ""));
  if (!btn) throw new Error("Continuar button missing");
  return btn.disabled;
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
    await openFunnel();

    await clickButton(/PC \/ Notebook/i);     // step 0 → step 1
    await clickButton(/^Dell$/);
    await clickButton(/Lento \/ travando/i);

    expect(dialogText()).toMatch(/R\$ 99,99/);
    expect(dialogText()).toMatch(/R\$ 90/);

    await clickButton(/Continuar/i);          // pula step 2 → step 3

    expect(dialogText()).toMatch(/Triagem completa/i);
    expect(dialogText()).toMatch(/Próximo passo no WhatsApp/i);

    await clickButton(/Abrir WhatsApp/i);

    const url = getLastWaUrl();
    expect(url).not.toBeNull();
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
    await openFunnel();

    await clickButton(/^TV$/i);
    await clickButton(/^Samsung$/i);
    await clickButton(/^Não liga$/i);
    await clickButton(/Continuar/i);          // step 1 → step 2 (coleta)

    expect(dialogText()).toMatch(/Coleta e Entrega/i);
    expect(dialogText()).toMatch(/R\$ 300/);
    expect(continueIsDisabled()).toBe(true);

    // tenta forçar — não pode abrir wa.me
    await clickButton(/Continuar/i);
    expect(getLastWaUrl()).toBeNull();

    await clickAcceptCheckbox();
    expect(continueIsDisabled()).toBe(false);

    await clickButton(/Continuar/i);          // → step 3
    await clickButton(/Abrir WhatsApp/i);

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
  it("mensagem final contém exigência completa de fotos + vídeo + etiqueta traseira sem áudio", async () => {
    renderFunnel();
    await openFunnel();

    await clickButton(/Celular \/ Tablet/i);
    await clickButton(/iPhone \(Apple\)/i);
    await clickButton(/Tela trincada/i);
    await clickButton(/Continuar/i);          // → step 2 (coleta)

    await clickAcceptCheckbox();
    await clickButton(/Continuar/i);          // → step 3
    await clickButton(/Abrir WhatsApp/i);

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
  it("não abre WhatsApp em nenhuma circunstância sem completar a triagem", async () => {
    renderFunnel();
    await openFunnel();
    // Sem nenhum clique nas etapas: nada de wa.me
    expect(getLastWaUrl()).toBeNull();
  });
});
