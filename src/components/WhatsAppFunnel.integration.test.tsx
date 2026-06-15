import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WhatsAppFunnel } from "./WhatsAppFunnel";
import { VIDEO_WARNING } from "@/lib/funnelWarning";

// Mock Supabase para o funil não tentar bater na rede (jsdom não tem fetch real).
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
  },
}));

async function waitForWaCall() {
  await waitFor(() => expect(getLastWaUrl()).not.toBeNull(), { timeout: 3000 });
}


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

/**
 * Localiza um botão dentro do dialog atual cujo *primeiro* nó de texto
 * corresponde ao label dado. Ignora badges adjacentes (ex.: "COLETA") e
 * emojis em `<p>` ao lado do label do equipamento.
 */
async function clickButton(label: string | RegExp) {
  const dialog = await screen.findByRole("dialog");
  const buttons = Array.from(dialog.querySelectorAll<HTMLButtonElement>("button"));
  const matches = (txt: string) =>
    typeof label === "string" ? txt === label : label.test(txt);
  const btn = buttons.find((b) => {
    // Inspeciona cada child textNode/span/p individualmente
    const parts: string[] = [];
    b.querySelectorAll("p, span").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (t) parts.push(t);
    });
    if (parts.length === 0 && b.textContent) parts.push(b.textContent.trim());
    return parts.some(matches);
  });
  if (!btn) {
    throw new Error(
      `Botão não encontrado para ${label}. Botões disponíveis: ${
        buttons.map((b) => `"${b.textContent}"`).join(" | ")
      }`,
    );
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
  it("fluxo passa direto e a URL final contém o aviso obrigatório + preços R$ 99,99 e R$ 90 estão visíveis no step inicial", async () => {
    renderFunnel();
    await openFunnel();

    // Step 0 mostra o bloco de transparência com os preços
    expect(dialogText()).toMatch(/R\$ 99,99/);
    expect(dialogText()).toMatch(/R\$ 90/);

    await clickButton("PC / Notebook");       // step 0 → step 1
    await clickButton("Dell");
    await clickButton("Lento / travando");

    await clickButton("Continuar");           // pula step 2 → step 3
    expect(dialogText()).toMatch(/Triagem completa/i);
    expect(dialogText()).toMatch(/Próximo passo no WhatsApp/i);

    await clickButton(/Abrir WhatsApp/i);
    await waitForWaCall();

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

    await clickButton("TV");
    await clickButton("Samsung");
    await clickButton("Não liga");
    await clickButton("Continuar");           // step 1 → step 2 (coleta)

    expect(dialogText()).toMatch(/Coleta e Entrega/i);
    expect(dialogText()).toMatch(/R\$ 300/);
    expect(continueIsDisabled()).toBe(true);

    // Tentativa de forçar avanço sem aceite — não pode abrir wa.me
    await clickButton("Continuar");
    expect(getLastWaUrl()).toBeNull();

    await clickAcceptCheckbox();
    expect(continueIsDisabled()).toBe(false);

    await clickButton("Continuar");           // → step 3
    await clickButton(/Abrir WhatsApp/i);
    await waitForWaCall();

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

    await clickButton("Celular / Tablet");
    await clickButton("iPhone (Apple)");
    await clickButton("Tela trincada / quebrada");
    await clickButton("Continuar");           // → step 2 (coleta)

    await clickAcceptCheckbox();
    await clickButton("Continuar");           // → step 3
    await clickButton(/Abrir WhatsApp/i);
    await waitForWaCall();

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
