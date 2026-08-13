#!/usr/bin/env node
// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// PUBLICADOR — Cloudflare Bulk Redirects (Frente A, Rodada 2A.2)
//
// Substitui o publicador antigo (612 regras em http_request_dynamic_redirect),
// que era inviável pelo limite de regras por ruleset.
//
// Arquitetura:
//   1. Bulk Redirect List (kind = "redirect") na CONTA, nome determinístico.
//   2. Uma única regra de ativação na fase http_request_redirect da conta,
//      com action_parameters.from_list apontando para a lista.
//
// Endpoints (todos só usados fora do dry-run):
//   GET/POST  /accounts/{account}/rules/lists
//   GET/PUT   /accounts/{account}/rules/lists/{list}/items
//   GET/PUT   /accounts/{account}/rulesets/phases/http_request_redirect/entrypoint
//
// Token A (domínio antigo) — permissões mínimas:
//   Account · Account Filter Lists: Edit
//   Account · Account Rulesets: Edit
//   (NENHUMA permissão de Workers)
//
// Uso:
//   node scripts/publish-cloudflare-bulk-redirects.mjs --dry-run
//   node scripts/publish-cloudflare-bulk-redirects.mjs --verify
//   node scripts/publish-cloudflare-bulk-redirects.mjs --approve="APROVO 612 REGRAS"
//   node scripts/publish-cloudflare-bulk-redirects.mjs --rollback=redirects/rollback/bulk/<stamp>.json
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import {
  LIST_NAME,
  LIST_DESCRIPTION,
  RULE_DESCRIPTION,
  OWNER_MARKER,
  REDIRECT_PHASE,
  buildItems,
  buildPlan,
  chunk,
  diffItems,
} from "./lib/bulk-redirects.mjs";

const MAP_FILE = "redirects/tecnicocuritiba.map.json";
const PLAN_FILE = "redirects/export/bulk-redirects-plan.json";
const ROLLBACK_DIR = "redirects/rollback/bulk";

const args = process.argv.slice(2);
const argVal = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? null;
const has = (n) => args.includes(`--${n}`);
const fail = (m) => {
  console.error(`BLOQUEADO: ${m}`);
  process.exit(1);
};

const map = JSON.parse(readFileSync(MAP_FILE, "utf8"));
const items = buildItems(map);
const plan = buildPlan(map);

// ── Dry-run local (sem credenciais, sem escrita) ──
if (has("dry-run")) {
  console.log(`Bulk Redirects · plano local (sem escrita)`);
  console.log(`  lista .............. ${plan.listName}`);
  console.log(`  regra .............. ${plan.ruleDescription} (fase ${plan.phase})`);
  console.log(`  marcador ........... ${plan.ownerMarker}`);
  console.log(`  redirects .......... ${plan.count}`);
  console.log(`  lotes .............. ${plan.batches} × ${plan.batchSize}`);
  console.log(`  hash da matriz ..... ${plan.hash}`);
  console.log(`  origens duplicadas . ${plan.validation.stats.duplicateSources}`);
  console.log(`  chains internas .... ${plan.validation.stats.chains}`);
  console.log(`  destinos p/ home ... ${plan.validation.stats.homeTargets}`);
  for (const w of plan.validation.warnings) console.log(`  aviso: ${w}`);
  mkdirSync("redirects/export", { recursive: true });
  writeFileSync(PLAN_FILE, `${JSON.stringify({ ...plan, items }, null, 2)}\n`);
  console.log(`  plano gravado em ... ${PLAN_FILE}`);
  if (!plan.validation.ok) {
    for (const e of plan.validation.errors) console.error(`  erro: ${e}`);
    fail("matriz inválida — corrija antes de publicar.");
  }
  console.log("OK: matriz válida, nenhuma chamada remota realizada.");
  process.exit(0);
}

// ── A partir daqui é necessário credencial (nunca nesta rodada) ──
const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!token || !account)
  fail("defina CLOUDFLARE_API_TOKEN (Token A) e CLOUDFLARE_ACCOUNT_ID. Use --dry-run para planejar sem credenciais.");

const api = async (path, init = {}, attempt = 1) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
      ...init,
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) {
      if (res.status >= 500 && attempt < 3) return api(path, init, attempt + 1);
      throw new Error(`Cloudflare ${res.status}: ${JSON.stringify(json.errors ?? json).slice(0, 400)}`);
    }
    return json.result;
  } catch (err) {
    if (err.name === "AbortError" && attempt < 3) return api(path, init, attempt + 1);
    throw err;
  } finally {
    clearTimeout(timer);
  }
};

const findList = async () => {
  const lists = (await api(`/accounts/${account}/rules/lists`)) ?? [];
  return lists.find((l) => l.name === LIST_NAME && l.kind === "redirect") ?? null;
};

const readRemoteItems = async (listId) => {
  const out = [];
  let cursor = null;
  do {
    const q = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
    const res = await api(`/accounts/${account}/rules/lists/${listId}/items${q}`);
    const batch = Array.isArray(res) ? res : (res.result ?? []);
    out.push(...batch);
    cursor = Array.isArray(res) ? null : (res.result_info?.cursors?.after ?? null);
  } while (cursor);
  return out.map((i) => ({ redirect: i.redirect }));
};

// ── Verificação (somente leitura) ──
if (has("verify")) {
  const list = await findList();
  if (!list) fail(`lista ${LIST_NAME} não existe na conta.`);
  const remote = await readRemoteItems(list.id);
  const d = diffItems(remote, items);
  console.log(`lista ${list.id} · ${remote.length} itens remotos · ${items.length} locais`);
  console.log(d.identical ? "OK: idempotente, nada a aplicar." : `divergência: +${d.toAdd.length} / -${d.toRemove.length}`);
  process.exit(d.identical ? 0 : 2);
}

// ── Rollback ──
const rollbackArg = argVal("rollback");
if (rollbackArg) {
  const prev = JSON.parse(readFileSync(rollbackArg, "utf8"));
  if (prev.ownerMarker !== OWNER_MARKER) fail("backup não pertence a este projeto.");
  await api(`/accounts/${account}/rules/lists/${prev.listId}/items`, {
    method: "PUT",
    body: JSON.stringify(prev.items),
  });
  console.log(`rollback aplicado: ${prev.items.length} itens restaurados na lista ${prev.listId}.`);
  process.exit(0);
}

// ── Publicação (exige aprovação explícita) ──
const expected = `APROVO ${items.length} REGRAS`;
if (argVal("approve") !== expected) fail(`frase de aprovação ausente. Esperado --approve="${expected}"`);
if (!plan.validation.ok) fail(`matriz inválida: ${plan.validation.errors[0]}`);

let list = await findList();
if (!list) {
  list = await api(`/accounts/${account}/rules/lists`, {
    method: "POST",
    body: JSON.stringify({ name: LIST_NAME, kind: "redirect", description: LIST_DESCRIPTION }),
  });
  console.log(`lista criada: ${list.id}`);
} else {
  if (!String(list.description ?? "").includes("tecnicocuritiba-migration-list"))
    fail(`lista ${LIST_NAME} existe mas não tem o marcador do projeto — abortando para não sobrescrever recurso alheio.`);
  const remote = await readRemoteItems(list.id);
  const d = diffItems(remote, items);
  if (d.identical) {
    console.log("nada a fazer: lista já idêntica à matriz local.");
    process.exit(0);
  }
  console.log(`diff: +${d.toAdd.length} / -${d.toRemove.length}`);
  mkdirSync(ROLLBACK_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  writeFileSync(
    `${ROLLBACK_DIR}/${stamp}.json`,
    `${JSON.stringify({ ownerMarker: OWNER_MARKER, listId: list.id, items: remote }, null, 2)}\n`,
  );
  console.log(`backup: ${ROLLBACK_DIR}/${stamp}.json`);
}

for (const [i, batch] of chunk(items).entries()) {
  await api(`/accounts/${account}/rules/lists/${list.id}/items`, {
    method: i === 0 ? "PUT" : "POST",
    body: JSON.stringify(batch),
  });
  console.log(`lote ${i + 1} aplicado (${batch.length} itens).`);
}

const final = await readRemoteItems(list.id);
if (final.length !== items.length) fail(`quantidade final divergente: ${final.length} != ${items.length}`);

const entry = await api(`/accounts/${account}/rulesets/phases/${REDIRECT_PHASE}/entrypoint`).catch(() => null);
const rules = (entry?.rules ?? []).filter((r) => r.description !== RULE_DESCRIPTION);
rules.push({
  expression: 'http.request.full_uri in $' + LIST_NAME,
  description: RULE_DESCRIPTION,
  action: "redirect",
  action_parameters: { from_list: { name: LIST_NAME, key: "http.request.full_uri" } },
  enabled: true,
});
await api(`/accounts/${account}/rulesets/phases/${REDIRECT_PHASE}/entrypoint`, {
  method: "PUT",
  body: JSON.stringify({ rules }),
});
console.log(`OK: ${final.length} redirects publicados e regra de ativação confirmada.`);
