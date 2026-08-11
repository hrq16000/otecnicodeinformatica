import { defineConfig, devices } from "@playwright/test";

/**
 * Configuração oficial do Playwright do projeto (Rodada 3).
 *
 * Antes este arquivo importava `lovable-agent-playwright-config/config`, um
 * pacote que não existe no registro nem no lockfile — a suíte oficial não
 * executava em ambiente nenhum. A dependência era acidental, então foi
 * removida e substituída por uma configuração local equivalente.
 *
 * As specs leem a URL de `E2E_BASE_URL`/`SMOKE_URL` e caem em dois alvos:
 *  • http://localhost:8080 — servidor de desenvolvimento (Vite);
 *  • http://localhost:4173 — `vite preview`, servindo o build de `dist`.
 * Por isso os dois sobem juntos, reaproveitando processos já em execução.
 */
const CI = !!process.env.CI;

export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:8080",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "npm run dev",
      url: "http://localhost:8080",
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: "npm run preview -- --port 4173 --strictPort",
      url: "http://localhost:4173",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
