// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// BULK REDIRECTS — lógica pura (Rodada 2A.2, Frente A).
//
// Converte a matriz única (redirects/tecnicocuritiba.map.json) em itens de uma
// Bulk Redirect List da Cloudflare, valida a matriz e planeja os lotes.
// Nenhuma chamada de rede aqui: a camada de I/O vive no publicador.
// ─────────────────────────────────────────────────────────────
import { createHash } from "node:crypto";

export const LIST_NAME = "tecnicocuritiba_migration_list";
export const RULE_DESCRIPTION = "tecnicocuritiba-migration-rule";
export const LIST_DESCRIPTION = "tecnicocuritiba-migration-list (projeto o domínio configurado — Rodada 2A.2)";
export const OWNER_MARKER = "tecnico-curitiba-migration";
export const BATCH_SIZE = 1000; // limite de itens por operação de lista
export const REDIRECT_PHASE = "http_request_redirect"; // fase de Bulk Redirects (conta)

/** Item de Bulk Redirect conforme a API de Lists (kind = "redirect"). */
export function toItem(rule, sourceDomain) {
  const source = new URL(rule.from, sourceDomain).toString();
  return {
    redirect: {
      source_url: stripScheme(source),
      target_url: rule.to,
      status_code: rule.status ?? 301,
      include_subdomains: false,
      subpath_matching: false, // correspondência exata (A3)
      preserve_query_string: true, // query preservada explicitamente
      preserve_path_suffix: false,
    },
  };
}

const stripScheme = (u) => u.replace(/^https?:\/\//, "");

export function buildItems(map) {
  return map.rules.map((r) => toItem(r, map.source_domain));
}

/** Validações A7 sobre a matriz. */
export function validateMatrix(map) {
  const errors = [];
  const warnings = [];
  const rules = map.rules ?? [];
  const seenFrom = new Map();
  const targets = new Map();
  const canonicalTarget = (map.target_domain || "").replace(/\/$/, "");

  for (const r of rules) {
    if (!r.from?.startsWith("/")) errors.push(`origem inválida: ${JSON.stringify(r.from)}`);
    if (!/^https:\/\//.test(r.to || "")) errors.push(`destino sem HTTPS absoluto: ${r.from} → ${r.to}`);
    if ((r.status ?? 301) !== 301) errors.push(`status diferente de 301: ${r.from} → ${r.status}`);
    seenFrom.set(r.from, (seenFrom.get(r.from) ?? 0) + 1);
    targets.set(r.to, (targets.get(r.to) ?? 0) + 1);
    // Loop: origem e destino iguais no domínio de destino.
    const sourceAbs = `${(map.source_domain || "").replace(/\/$/, "")}${r.from}`;
    if (r.to === sourceAbs) errors.push(`loop direto: ${r.from}`);
  }

  const duplicates = [...seenFrom.entries()].filter(([, n]) => n > 1).map(([k]) => k);
  if (duplicates.length) errors.push(`origens duplicadas: ${duplicates.slice(0, 10).join(", ")}`);

  // Chain interna: destino aponta para um path que também é origem de outra regra.
  const fromSet = new Set(rules.map((r) => r.from));
  const chains = rules
    .filter((r) => {
      if (!r.to.startsWith(canonicalTarget)) return false;
      const p = r.to.slice(canonicalTarget.length) || "/";
      return p !== r.from && fromSet.has(p) && sameDomain(map);
    })
    .map((r) => `${r.from} → ${r.to}`);
  if (chains.length) errors.push(`chains internas: ${chains.slice(0, 10).join(", ")}`);

  // Destinos para a home precisam de justificativa (apenas a raiz é aceita).
  const homeTargets = rules.filter((r) => r.to.replace(/\/$/, "") === canonicalTarget && r.from !== "/");
  if (homeTargets.length) warnings.push(`${homeTargets.length} destino(s) para a home sem justificativa`);

  const duplicateTargets = [...targets.entries()].filter(([, n]) => n > 1).length;
  if (duplicateTargets) warnings.push(`${duplicateTargets} destino(s) recebem mais de uma origem`);

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    stats: {
      total: rules.length,
      duplicateSources: duplicates.length,
      duplicateTargets,
      chains: chains.length,
      homeTargets: homeTargets.length,
    },
  };
}

// Origem e destino são domínios diferentes na migração; chain só existe se
// o destino cair de novo em uma origem do mesmo domínio de origem.
const sameDomain = (map) =>
  (map.source_domain || "").replace(/^https?:\/\//, "") === (map.target_domain || "").replace(/^https?:\/\//, "");

export function chunk(items, size = BATCH_SIZE) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function matrixHash(items) {
  return createHash("sha256").update(JSON.stringify(items)).digest("hex");
}

/** Plano local completo (dry-run sem credenciais). */
export function buildPlan(map) {
  const validation = validateMatrix(map);
  const items = buildItems(map);
  const batches = chunk(items);
  return {
    listName: LIST_NAME,
    ruleDescription: RULE_DESCRIPTION,
    ownerMarker: OWNER_MARKER,
    phase: REDIRECT_PHASE,
    count: items.length,
    batches: batches.length,
    batchSize: BATCH_SIZE,
    hash: matrixHash(items),
    validation,
    sample: items.slice(0, 3),
  };
}

/** Diferença entre itens remotos e locais (idempotência). */
export function diffItems(remoteItems, localItems) {
  const key = (i) => `${i.redirect.source_url} → ${i.redirect.target_url} (${i.redirect.status_code})`;
  const remote = new Map(remoteItems.map((i) => [key(i), i]));
  const local = new Map(localItems.map((i) => [key(i), i]));
  const toAdd = [...local.keys()].filter((k) => !remote.has(k));
  const toRemove = [...remote.keys()].filter((k) => !local.has(k));
  return { toAdd, toRemove, identical: toAdd.length === 0 && toRemove.length === 0 };
}
