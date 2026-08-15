import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { htmlDaRota, prepararSsr, ssrBloqueado, resumo, REASONS } from "../lib/ssr-harness.mjs";

/**
 * Fixtures do contrato do harness SSR (Micro-Rodada Local 1.1):
 * PASS  → snapshot com proveniência no manifesto;
 * FAIL  → HTML órfão (stack antigo) não é aceito como verdade;
 * UNKNOWN → sem servidor SSR e sem snapshot ⇒ bloqueado, nunca verde.
 */
let dist;

beforeAll(() => {
  dist = mkdtempSync(join(tmpdir(), "ssr-harness-"));
  mkdirSync(join(dist, "bairros/valido"), { recursive: true });
  writeFileSync(join(dist, "bairros/valido/index.html"), "<html><title>ok</title></html>");
  mkdirSync(join(dist, "bairros/orfao"), { recursive: true });
  writeFileSync(join(dist, "bairros/orfao/index.html"), "<html><title>legado</title></html>");
  writeFileSync(
    join(dist, "ssr-snapshot-manifest.json"),
    JSON.stringify({
      geradoEm: Date.now(),
      base: "http://localhost:8080",
      rotas: { "/bairros/valido": { status: 200, renderizadoEm: Date.now() } },
    }),
  );
});

afterAll(() => rmSync(dist, { recursive: true, force: true }));

describe("ssr-harness", () => {
  it("PASS: devolve HTML de rota com proveniência no manifesto", () => {
    expect(htmlDaRota("/bairros/valido", dist)).toContain("<title>ok</title>");
  });

  it("FAIL: ignora HTML órfão do stack estático antigo", () => {
    expect(htmlDaRota("/bairros/orfao", dist)).toBeNull();
  });

  it("FAIL: rota inexistente devolve null (nunca string vazia)", () => {
    expect(htmlDaRota("/bairros/inexistente", dist)).toBeNull();
  });

  it("UNKNOWN: sem servidor SSR alcançável o harness bloqueia com reason code", async () => {
    const anterior = process.env.SSR_BASE_URL;
    process.env.SSR_BASE_URL = "http://127.0.0.1:9";
    const r = await prepararSsr(["/rota-que-precisa-de-ssr"], { dist });
    if (r.bloqueado) {
      expect(ssrBloqueado()).toBe(true);
      expect(resumo().reason).toBe(REASONS.SSR_UNAVAILABLE);
    } else {
      // Um servidor local respondeu: o contrato exige base registrada.
      expect(r.base).toBeTruthy();
    }
    if (anterior === undefined) delete process.env.SSR_BASE_URL;
    else process.env.SSR_BASE_URL = anterior;
  }, 30000);
});
