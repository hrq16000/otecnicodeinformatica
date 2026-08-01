import { defineConfig, devices } from "@playwright/test";

/**
 * Configuração usada exclusivamente pelo CI para a suíte completa por navegador.
 * Cada job da matriz roda com PW_BROWSER=chromium|firefox|webkit, permitindo
 * registrar resultados separados sem alterar a config local do agente.
 */
const browser = (process.env.PW_BROWSER || "chromium") as "chromium" | "firefox" | "webkit";
const deviceName =
  browser === "firefox" ? "Desktop Firefox" : browser === "webkit" ? "Desktop Safari" : "Desktop Chrome";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  workers: 2,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [
    ["list"],
    ["json", { outputFile: `playwright-report/${browser}/results.json` }],
    ["html", { outputFolder: `playwright-report/${browser}/html`, open: "never" }],
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:8080",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    launchOptions: { args: browser === "chromium" ? ["--no-sandbox", "--disable-dev-shm-usage"] : [] },
  },
  projects: [{ name: browser, use: { ...devices[deviceName] } }],
});
