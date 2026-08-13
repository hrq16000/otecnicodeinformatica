// @ts-nocheck
// RODADA 4C — Purge de cache/CDN no Cloudflare após publicar o ruleset.
//
// Evita que URLs antigas continuem sendo servidas do edge cache depois que os
// 301 entram no ar. Por padrão purga apenas as URLs afetadas pela matriz
// (origens + kept_urls, em lotes de 30); com --all faz purge_everything.
//
// Variáveis de ambiente:
//   CLOUDFLARE_API_TOKEN   token com Zone → Cache Purge → Purge
//   CLOUDFLARE_ZONE_ID     zona de tecnicocuritiba.com.br
//
// Uso:
//   node scripts/purge-cloudflare-cache.mjs --dry-run
//   node scripts/purge-cloudflare-cache.mjs
//   node scripts/purge-cloudflare-cache.mjs --all
import { loadMap } from "./lib/migration-critical.mjs";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const ALL = args.includes("--all");

const map = loadMap();
const source = map.source_domain.replace(/\/$/, "");
const urls = [
  ...new Set([
    ...map.rules.map((r) => `${source}${r.from}`),
    ...(map.kept_urls ?? []).map((u) => (/^https?:/i.test(u) ? u : `${source}${u}`)),
    `${source}/sitemap.xml`,
    `${source}/robots.txt`,
  ]),
];

export async function purgeCloudflareCache({ dry = false, all = false, log = console.log } = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zone = process.env.CLOUDFLARE_ZONE_ID;

  if (dry) {
    log(`DRY-RUN purge: ${all ? "purge_everything" : `${urls.length} URLs em ${Math.ceil(urls.length / 30)} lote(s)`}`);
    urls.slice(0, 5).forEach((u) => log(`  ${u}`));
    return { purged: 0, dry: true };
  }
  if (!token || !zone) {
    log("purge ignorado: defina CLOUDFLARE_API_TOKEN e CLOUDFLARE_ZONE_ID.");
    return { purged: 0, skipped: true };
  }

  const call = async (body) => {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false)
      throw new Error(`Cloudflare purge ${res.status}: ${JSON.stringify(json.errors ?? json).slice(0, 300)}`);
  };

  if (all) {
    await call({ purge_everything: true });
    log("purge_everything aplicado na zona.");
    return { purged: "everything" };
  }

  let purged = 0;
  for (let i = 0; i < urls.length; i += 30) {
    const batch = urls.slice(i, i + 30);
    await call({ files: batch });
    purged += batch.length;
    log(`purge lote ${Math.floor(i / 30) + 1}: ${batch.length} URLs (${purged}/${urls.length})`);
  }
  return { purged };
}

const isMain = process.argv[1] && process.argv[1].endsWith("purge-cloudflare-cache.mjs");
if (isMain) {
  try {
    const r = await purgeCloudflareCache({ dry: DRY, all: ALL });
    console.log(`purge:cf concluído — ${JSON.stringify(r)}`);
  } catch (e) {
    console.error(`BLOQUEADO: ${e.message}`);
    process.exit(1);
  }
}
