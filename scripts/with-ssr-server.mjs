#!/usr/bin/env node
/**
 * Sobe um servidor SSR (vite dev) em background, espera ficar pronto,
 * executa o comando recebido com SSR_BASE_URL apontado para ele e derruba
 * o servidor no fim. Usado pelos gates locais no CI, onde não existe um
 * dev server já rodando.
 *
 * Uso: node scripts/with-ssr-server.mjs npm run check:local-regression
 */
import { spawn } from "node:child_process";

const PORTA = Number(process.env["SSR_PORT"] ?? 8080);
const BASE = `http://127.0.0.1:${PORTA}`;
const TIMEOUT_MS = Number(process.env["SSR_BOOT_TIMEOUT_MS"] ?? 180_000);

const comando = process.argv.slice(2);
if (comando.length === 0) {
  console.error("[with-ssr-server] informe o comando a executar.");
  process.exit(2);
}

async function esperarPronto() {
  const limite = Date.now() + TIMEOUT_MS;
  while (Date.now() < limite) {
    try {
      const r = await fetch(`${BASE}/`, { redirect: "manual" });
      if (r.status < 500) return true;
    } catch {
      /* ainda subindo */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

const servidor = spawn("npx", ["vite", "dev", "--port", String(PORTA), "--host", "127.0.0.1"], {
  stdio: ["ignore", "inherit", "inherit"],
  env: { ...process.env },
});

let encerrado = false;
const derrubar = () => {
  if (encerrado) return;
  encerrado = true;
  try {
    servidor.kill("SIGTERM");
  } catch {
    /* já morto */
  }
};
process.on("exit", derrubar);
process.on("SIGINT", () => {
  derrubar();
  process.exit(130);
});

const pronto = await esperarPronto();
if (!pronto) {
  console.error(`[with-ssr-server] servidor SSR não respondeu em ${BASE} dentro do timeout.`);
  derrubar();
  process.exit(1);
}

const filho = spawn(comando[0], comando.slice(1), {
  stdio: "inherit",
  env: { ...process.env, SSR_BASE_URL: BASE },
  shell: process.platform === "win32",
});

filho.on("exit", (code, signal) => {
  derrubar();
  process.exit(signal ? 1 : (code ?? 1));
});
