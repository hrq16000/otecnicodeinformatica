#!/usr/bin/env node
/**
 * GATE DE OBSERVABILIDADE EM PRODUÇÃO.
 *
 * Em build de produção (CI, NODE_ENV=production ou --strict) exige pelo menos
 * um sink configurado e, quando configurado, exige valor válido:
 *   VITE_SENTRY_DSN    → https://<key>@<host>/<projeto>
 *   VITE_OTLP_ENDPOINT → URL http(s) sem barra final obrigatória
 *
 * Em desenvolvimento apenas avisa: o sink é fail-closed por design e nada é
 * enviado sem env — o build local não pode quebrar por isso.
 *
 * Escape hatch consciente: OBSERVABILITY_OPTIONAL=true.
 */
import { existsSync, readFileSync } from "node:fs";

const STRICT =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.NODE_ENV === "production";

/** Lê .env do projeto sem sobrescrever o que já veio do ambiente. */
const fromEnvFile = (chave) => {
  for (const arquivo of [".env.production", ".env"]) {
    if (!existsSync(arquivo)) continue;
    const linha = readFileSync(arquivo, "utf8")
      .split("\n")
      .find((l) => l.trim().startsWith(`${chave}=`));
    if (linha) return linha.slice(linha.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  }
  return "";
};

const valor = (chave) => (process.env[chave] || fromEnvFile(chave) || "").trim();

const dsn = valor("VITE_SENTRY_DSN");
const otlp = valor("VITE_OTLP_ENDPOINT");
const erros = [];

if (dsn) {
  try {
    const u = new URL(dsn);
    if (!u.username || !u.pathname.replace(/^\//, "")) throw new Error("formato");
  } catch {
    erros.push(
      "VITE_SENTRY_DSN inválido — use o DSN completo do Sentry no formato https://<publicKey>@<host>/<idDoProjeto>.",
    );
  }
}
if (otlp && !/^https?:\/\/[^\s]+$/.test(otlp)) {
  erros.push(
    "VITE_OTLP_ENDPOINT inválido — informe a URL base do coletor OTLP (ex.: https://otlp.seu-coletor.com), sem o sufixo /v1/logs.",
  );
}
if (!dsn && !otlp) {
  const msg =
    "Nenhum sink de observabilidade configurado: defina VITE_SENTRY_DSN (erros) e/ou VITE_OTLP_ENDPOINT (logs/traces). Sem eles, erros de produção ficam invisíveis.";
  if (STRICT && process.env.OBSERVABILITY_OPTIONAL !== "true") erros.push(msg);
  else console.warn(`⚠ ${msg}`);
}

if (erros.length) {
  console.error("\n✖ Observabilidade não configurada para produção:");
  for (const e of erros) console.error(`  · ${e}`);
  console.error(
    "\nDefina as variáveis no ambiente de build (ou OBSERVABILITY_OPTIONAL=true para liberar conscientemente).",
  );
  process.exit(1);
}
console.log(
  `✔ Observabilidade: ${[dsn && "Sentry", otlp && "OTLP"].filter(Boolean).join(" + ") || "desligada (dev)"}.`,
);
