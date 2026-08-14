#!/usr/bin/env node
/**
 * GATE — CONTRATO DE EVENTOS DE ANALYTICS (Rodada 6, FASES 45/46/47)
 *
 * Falha quando:
 *   1. um evento canônico do contrato deixa de existir na base de código;
 *   2. algum campo sensível (PII) aparece em payload de analytics/telemetria;
 *   3. o contexto local recebe fallback falso (ex.: "curitiba" hard-coded como
 *      padrão de cidade quando a rota não declara cidade).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const EVENTOS_OBRIGATORIOS = [
  "page_view",
  "cta_click",
  "triage_start",
  "triage_step",
  "triage_complete",
  "triage_abandon",
  "whatsapp_open",
  "lead_submitted",
];

const CAMPOS_PROIBIDOS = [
  "nome",
  "name",
  "email",
  "telefone",
  "phone",
  "endereco",
  "address",
  "cpf",
  "documento",
  "document",
  "free_text",
  "descricao_livre",
  "lat",
  "lng",
  "latitude",
  "longitude",
  "cep",
  "foto",
];

const ARQUIVOS_ANALYTICS = [
  "src/lib/analyticsContract.ts",
  "src/lib/funnelAnalytics.ts",
  "src/components/PageViewTracker.tsx",
];

function arquivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return arquivos(p);
    return /\.tsx?$/.test(n) ? [p] : [];
  });
}

const erros = [];
const contrato = readFileSync("src/lib/analyticsContract.ts", "utf8");
const funil = readFileSync("src/lib/funnelAnalytics.ts", "utf8");
const tudo = ARQUIVOS_ANALYTICS.map((f) => readFileSync(f, "utf8")).join("\n");

// 1) Eventos canônicos presentes.
for (const ev of EVENTOS_OBRIGATORIOS) {
  if (!tudo.includes(`"${ev}"`)) erros.push(`evento canônico ausente: ${ev}`);
}

// 2) PII nunca entra no payload dos eventos.
for (const campo of CAMPOS_PROIBIDOS) {
  // Ignora anotações de tipo (`name: string`) — só interessa valor em payload.
  const re = new RegExp(`\\b${campo}\\s*:\\s*(?!\\s*(?:string|number|boolean|unknown|undefined|null|//))`, "i");
  for (const arquivo of ARQUIVOS_ANALYTICS) {
    const src = readFileSync(arquivo, "utf8");
    // Só linhas que estejam dentro de payloads (objeto passado a track/insert).
    src.split("\n").forEach((linha, i) => {
      if (linha.trim().startsWith("//") || linha.trim().startsWith("*")) return;
      if (re.test(linha)) erros.push(`${arquivo}:${i + 1} — campo sensível "${campo}" em payload de analytics`);
    });
  }
}

// 3) Sem fallback geográfico falso.
if (/city\s*[:=]\s*["']curitiba["']/i.test(tudo)) {
  erros.push("contexto local com fallback fixo para Curitiba — proibido (FASE 47)");
}
if (!/nao_definida|undefined/.test(contrato)) {
  erros.push("contrato precisa devolver ausência explícita quando não há cidade/bairro/serviço");
}

// 4) Deduplicação por event_id.
if (!/event_id/.test(funil)) erros.push("persistência sem event_id — dedupe impossível (FASE 36)");

/* ─────────────────────────────────────────────────────────────────────────
 * 5) DIVERGÊNCIA CONTRA O SNAPSHOT DO CONTRATO
 *    Detecta antes do build qualquer evento novo, removido ou renomeado e
 *    qualquer mudança nos campos de contexto permitidos/proibidos.
 *    `--update` regrava o snapshot (usar só após revisão consciente).
 * ───────────────────────────────────────────────────────────────────────── */
const SNAPSHOT = "docs/analytics-event-contract.snapshot.json";
const ATUALIZAR = process.argv.includes("--update");

const eventosEmitidos = [
  ...new Set(
    arquivos("src")
      .filter((p) => !/\.test\.tsx?$/.test(p))
      .flatMap((p) => [...readFileSync(p, "utf8").matchAll(/track\(\s*"([a-z0-9_]+)"/g)].map((m) => m[1])),
  ),
].sort();

const contextoAtual = [
  ...(contrato.match(/export const CONTEXT_KEYS = \[([\s\S]*?)\] as const/)?.[1] ?? "").matchAll(/"([a-z0-9_]+)"/g),
].map((m) => m[1]);

const snapshotAtual = {
  descricao:
    "Snapshot do contrato de analytics (Rodada 6). Atualize com `npm run check:analytics-event-contract -- --update` SOMENTE após revisar a mudança de nomes/parâmetros.",
  eventosCanonicos: [...EVENTOS_OBRIGATORIOS, "os_created", "conversion"],
  eventosEmitidos,
  camposContextoPermitidos: contextoAtual,
  camposProibidos: CAMPOS_PROIBIDOS,
};

if (ATUALIZAR) {
  writeFileSync(SNAPSHOT, `${JSON.stringify(snapshotAtual, null, 2)}\n`);
  console.log(`✓ Snapshot regravado (${eventosEmitidos.length} eventos emitidos).`);
} else {
  const anterior = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
  const diff = (nome, antes, agora) => {
    const removidos = antes.filter((v) => !agora.includes(v));
    const novos = agora.filter((v) => !antes.includes(v));
    if (removidos.length) erros.push(`${nome}: removido(s)/renomeado(s) → ${removidos.join(", ")}`);
    if (novos.length) erros.push(`${nome}: não declarado(s) no snapshot → ${novos.join(", ")}`);
  };
  diff("eventos emitidos", anterior.eventosEmitidos ?? [], eventosEmitidos);
  diff("campos de contexto", anterior.camposContextoPermitidos ?? [], contextoAtual);
  diff("campos proibidos", anterior.camposProibidos ?? [], CAMPOS_PROIBIDOS);
  diff("eventos canônicos", anterior.eventosCanonicos ?? [], snapshotAtual.eventosCanonicos);
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO: ${erros.length} violação(ões) do contrato de analytics:`);
  for (const e of erros) console.error(`  · ${e}`);
  console.error(
    "\nSe a mudança for intencional, revise o impacto em GA4/Ads e rode:\n  npm run check:analytics-event-contract -- --update\n",
  );
  process.exit(1);
}

console.log(
  `✓ Contrato de analytics íntegro — ${EVENTOS_OBRIGATORIOS.length} eventos canônicos, ${eventosEmitidos.length} eventos emitidos sem divergência, 0 campos sensíveis, 0 fallback geográfico.`,
);

