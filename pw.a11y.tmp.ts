import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  use: {
    baseURL: "http://localhost:8080",
    launchOptions: { executablePath: "/opt/ms-playwright/chromium-1194/chrome-linux/chrome" },
  },
});
