// [DEPRECATED — RODADA 2A.2] Publicador antigo (ruleset dinâmico de zona).
// Bloqueado: 612 redirects não cabem em http_request_dynamic_redirect.
// Use `npm run migration:cf:bulk:dry` / `migration:cf:bulk:publish`.
// Código histórico preservado abaixo, mas inalcançável.
console.error(
  "BLOQUEADO: publicação bloqueada: 612 redirects devem usar Bulk Redirects " +
    "(npm run migration:cf:bulk:dry). Este publicador está deprecated.",
);
process.exit(1);

// RODADA 4B.2 — Publicador dos redirects no Cloudflare (ruleset dinâmico).
// Aplica o ruleset gerado por scripts/export-redirects.mjs na zona do domínio
// antigo, sempre com backup do ruleset anterior (rollback) e exigindo a frase
// de aprovação da matriz.
//
// Variáveis de ambiente obrigatórias:
//   CLOUDFLARE_API_TOKEN   token com permissão Zone → Config Rules → Edit
//   CLOUDFLARE_ZONE_ID     zona de tecnicocuritiba.com.br
//
// Uso:
//   node scripts/publish-cloudflare-redirects.mjs --dry-run
//   node scripts/publish-cloudflare-redirects.mjs --approve="APROVO 612 REGRAS"
//   node scripts/publish-cloudflare-redirects.mjs --rollback=redirects/rollback/cloudflare/<stamp>.json
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { loadMap } from "./lib/migration-critical.mjs";

const RULESET_FILE = "redirects/export/cloudflare-ruleset.json";
const PHASE = "http_request_dynamic_redirect";
const args = process.argv.slice(2);
const argVal = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? null;
const fail = (m) => {
  console.error(`BLOQUEADO: ${m}`);
  process.exit(1);
};

const map = loadMap();
if (!existsSync(RULESET_FILE)) fail(`${RULESET_FILE} não existe — rode "npm run migration:export" antes.`);
const ruleset = JSON.parse(readFileSync(RULESET_FILE, "utf8"));

const token = process.env.CLOUDFLARE_API_TOKEN;
const zone = process.env.CLOUDFLARE_ZONE_ID;
const api = async (path, init = {}) => {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false)
    throw new Error(`Cloudflare ${res.status}: ${JSON.stringify(json.errors ?? json).slice(0, 400)}`);
  return json.result;
};

const rollbackArg = argVal("rollback");
if (rollbackArg) {
  if (!token || !zone) fail("defina CLOUDFLARE_API_TOKEN e CLOUDFLARE_ZONE_ID para reverter.");
  const prev = JSON.parse(readFileSync(rollbackArg, "utf8"));
  await api(`/zones/${zone}/rulesets/${prev.id}`, {
    method: "PUT",
    body: JSON.stringify({ name: prev.name, kind: prev.kind, phase: prev.phase, rules: prev.rules ?? [] }),
  });
  console.log(`rollback aplicado: ruleset ${prev.id} restaurado com ${(prev.rules ?? []).length} regras.`);
  process.exit(0);
}

const expectedPhrase = `APROVO ${map.rules.length} REGRAS`;
const dry = args.includes("--dry-run");
if (!dry && argVal("approve") !== expectedPhrase)
  fail(`frase de aprovação ausente ou incorreta. Esperado --approve="${expectedPhrase}"`);

console.log(`Cloudflare · zona ${zone ?? "(não definida)"} · fase ${PHASE}`);
console.log(`Ruleset: ${ruleset.rules.length} regras 301 · matriz: ${map.rules.length} regras · mantidas: ${(map.kept_urls ?? []).length}`);
if (ruleset.rules.length !== map.rules.length)
  fail(`divergência: ruleset ${ruleset.rules.length} ≠ matriz ${map.rules.length}. Rode o export novamente.`);

if (dry) {
  console.log("DRY-RUN: nada foi enviado ao Cloudflare.");
  console.log("Exemplo das 3 primeiras regras que seriam aplicadas:");
  for (const r of ruleset.rules.slice(0, 3))
    console.log(`  ${r.expression}\n    → ${r.action_parameters.from_value.target_url.value} (${r.action_parameters.from_value.status_code})`);
  console.log(`\nPara publicar: node scripts/publish-cloudflare-redirects.mjs --approve="${expectedPhrase}"`);
  process.exit(0);
}

if (!token || !zone) fail("defina CLOUDFLARE_API_TOKEN e CLOUDFLARE_ZONE_ID no ambiente.");

const existing = (await api(`/zones/${zone}/rulesets`)).find((r) => r.phase === PHASE);
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
mkdirSync("redirects/rollback/cloudflare", { recursive: true });

let target = existing;
if (existing) {
  const full = await api(`/zones/${zone}/rulesets/${existing.id}`);
  writeFileSync(`redirects/rollback/cloudflare/${stamp}.json`, JSON.stringify(full, null, 2) + "\n");
  console.log(`backup do ruleset anterior: redirects/rollback/cloudflare/${stamp}.json (${(full.rules ?? []).length} regras)`);
} else {
  target = await api(`/zones/${zone}/rulesets`, {
    method: "POST",
    body: JSON.stringify({ name: ruleset.name, kind: "zone", phase: PHASE, rules: [] }),
  });
  writeFileSync(
    `redirects/rollback/cloudflare/${stamp}.json`,
    JSON.stringify({ id: target.id, name: ruleset.name, kind: "zone", phase: PHASE, rules: [] }, null, 2) + "\n",
  );
}

const applied = await api(`/zones/${zone}/rulesets/${target.id}`, {
  method: "PUT",
  body: JSON.stringify({ name: ruleset.name, kind: "zone", phase: PHASE, rules: ruleset.rules }),
});

console.log(`PUBLICADO no Cloudflare: ${applied.rules?.length ?? 0} regras ativas (ruleset ${target.id}).`);
console.log(`rollback: node scripts/publish-cloudflare-redirects.mjs --rollback=redirects/rollback/cloudflare/${stamp}.json`);

// Purge automático do cache/CDN — evita que o edge continue servindo o
// conteúdo antigo das URLs que passaram a redirecionar. Use --no-purge para pular.
if (!args.includes("--no-purge")) {
  try {
    const { purgeCloudflareCache } = await import("./purge-cloudflare-cache.mjs");
    const result = await purgeCloudflareCache({ all: args.includes("--purge-all") });
    console.log(`cache purgado: ${JSON.stringify(result)}`);
  } catch (e) {
    console.error(`AVISO: purge de cache falhou (${e.message}). Rode "npm run purge:cf" manualmente.`);
  }
}

console.log("Próximo: npm run verify:cf:strict, npm run check:redirects:critical e npm run report:critical-evidence");
