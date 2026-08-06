#!/usr/bin/env node
/**
 * PRÉ-VOO DE BORDA — confirma que os hostnames do site estão numa zona
 * Cloudflare sob nosso controle e com proxy ativo ANTES de publicar o worker.
 *
 * Somente leitura: usa apenas GET na API da Cloudflare.
 *   GET /zones?name=<zona>
 *   GET /zones/{id}/dns_records?name=<host>
 *
 * Variáveis:
 *   CLOUDFLARE_API_TOKEN   token com Zone:Read + DNS:Read (não é impresso)
 *   CLOUDFLARE_ZONE_ID     opcional — valida diretamente essa zona
 *   CLOUDFLARE_ZONE_NAME   opcional — zona esperada (padrão: derivada dos hosts)
 *
 * Uso:
 *   node scripts/check-cloudflare-zone.mjs            # avisa e sai 0 sem token
 *   node scripts/check-cloudflare-zone.mjs --enforce  # falha se não estiver apto
 */
const args = process.argv.slice(2);
const ENFORCE = args.includes("--enforce");

const HOSTS = ["tecnico.curitiba.br", "www.tecnico.curitiba.br"];
const ZONE_CANDIDATES = [
  process.env.CLOUDFLARE_ZONE_NAME,
  "tecnico.curitiba.br",
  "curitiba.br",
].filter(Boolean);

const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneIdEnv = process.env.CLOUDFLARE_ZONE_ID;

const out = [];
const log = (m) => {
  out.push(m);
  console.log(m);
};
const finish = (ok, reason) => {
  log(ok ? "APTO: worker pode ser publicado nesta zona." : `NÃO APTO: ${reason}`);
  if (!ok && ENFORCE) process.exit(1);
  process.exit(0);
};

if (!token) {
  log("[cf-zone] CLOUDFLARE_API_TOKEN ausente — verificação de zona não executada.");
  if (ENFORCE) {
    console.error("BLOQUEADO: --enforce exige CLOUDFLARE_API_TOKEN (Zone:Read + DNS:Read).");
    process.exit(1);
  }
  process.exit(0);
}

const api = async (path) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: ctrl.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false)
      throw new Error(`Cloudflare ${res.status}: ${JSON.stringify(json.errors ?? {}).slice(0, 300)}`);
    return json.result;
  } finally {
    clearTimeout(t);
  }
};

let zone = null;
try {
  if (/^[0-9a-f]{32}$/.test(zoneIdEnv ?? "")) {
    zone = await api(`/zones/${zoneIdEnv}`);
  } else {
    if (zoneIdEnv) log("[cf-zone] CLOUDFLARE_ZONE_ID inválido — caindo para busca por nome da zona.");
    for (const name of ZONE_CANDIDATES) {
      const found = await api(`/zones?name=${encodeURIComponent(name)}`);
      if (found?.length) {
        zone = found[0];
        break;
      }
    }
  }
} catch (e) {
  finish(false, `falha ao consultar zonas (${e.message}).`);
}

if (!zone) finish(false, `nenhuma zona sob controle para ${ZONE_CANDIDATES.join(", ")}.`);

log(`[cf-zone] zona: ${zone.name} · status: ${zone.status}`);
if (zone.status !== "active") finish(false, `zona ${zone.name} não está ativa (status ${zone.status}).`);

const covers = (host) => host === zone.name || host.endsWith(`.${zone.name}`);
const uncovered = HOSTS.filter((h) => !covers(h));
if (uncovered.length) finish(false, `a zona ${zone.name} não cobre: ${uncovered.join(", ")}.`);

let records = [];
try {
  records = await api(`/zones/${zone.id}/dns_records?per_page=200`);
} catch (e) {
  finish(false, `falha ao ler DNS da zona (${e.message}).`);
}

const notProxied = [];
for (const host of HOSTS) {
  const rec = records.find((r) => r.name === host && ["A", "AAAA", "CNAME"].includes(r.type));
  if (!rec) {
    notProxied.push(`${host}: sem registro A/AAAA/CNAME na zona`);
    continue;
  }
  log(`[cf-zone] ${host} → ${rec.type} (proxied: ${rec.proxied})`);
  if (!rec.proxied) notProxied.push(`${host}: registro existe mas NÃO está proxied (nuvem cinza)`);
}

if (notProxied.length)
  finish(
    false,
    `tráfego não passa pelo edge Cloudflare — ${notProxied.join("; ")}. ` +
      "Publicar o worker não resolverá o soft-404 enquanto o hostname não estiver proxied.",
  );

finish(true);
