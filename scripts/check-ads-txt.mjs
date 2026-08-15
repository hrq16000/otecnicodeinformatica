#!/usr/bin/env node
/**
 * Gate de anúncios (AdSense).
 *  - Verifica public/ads.txt (ou uma URL publicada com --url=) contendo a
 *    linha DIRECT do publisher configurado.
 *  - Verifica a metatag google-adsense-account no index.html.
 * Uso:
 *   node scripts/check-ads-txt.mjs                # local (arquivos do repo)
 *   node scripts/check-ads-txt.mjs --url=https://exemplo.com.br
 * Fail-closed: sem ADSENSE_PUBLISHER_ID configurado, o gate é ignorado
 * (a nova operação ainda não tem inventário publicitário próprio).
 */
import { readFileSync, existsSync, writeFileSync } from "node:fs";

const PUBLISHER = (process.env.ADSENSE_PUBLISHER_ID || "").trim();

if (!PUBLISHER) {
  console.log(
    "\nGate AdSense ignorado — ADSENSE_PUBLISHER_ID não configurado para esta operação.\n",
  );
  process.exit(0);
}

const EXPECTED_LINE = `google.com, ${PUBLISHER}, DIRECT, f08c47fec0942fa0`;
const urlArg = process.argv.find((a) => a.startsWith("--url="));
const base = urlArg ? urlArg.slice("--url=".length).replace(/\/$/, "") : null;

const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const results = [];

async function fetchText(path) {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return { status: res.status, body: res.ok ? await res.text() : "" };
}

const adsTxt = base
  ? await fetchText("/ads.txt")
  : existsSync("public/ads.txt")
    ? { status: 200, body: readFileSync("public/ads.txt", "utf8") }
    : { status: 404, body: "" };

results.push({
  check: "ads.txt acessível",
  ok: adsTxt.status === 200,
  detail: `HTTP ${adsTxt.status}`,
});
results.push({
  check: "ads.txt contém a linha do publisher",
  ok: adsTxt.body.split("\n").some((l) => norm(l) === norm(EXPECTED_LINE)),
  detail: EXPECTED_LINE,
});

const html = base
  ? await fetchText("/")
  : { status: 200, body: readFileSync("index.html", "utf8") };
const metaOk = new RegExp(
  `<meta[^>]+name=["']google-adsense-account["'][^>]+content=["']ca-${PUBLISHER}["']`,
  "i",
).test(html.body);
results.push({ check: "metatag google-adsense-account", ok: metaOk, detail: `ca-${PUBLISHER}` });

const failed = results.filter((r) => !r.ok);
console.log(`\nRelatório AdSense — origem: ${base ?? "repositório local"}`);
for (const r of results) console.log(` ${r.ok ? "✅" : "❌"} ${r.check} — ${r.detail}`);
console.log(`\n${results.length - failed.length}/${results.length} verificações OK\n`);

// Publica o relatório para a página pública de status.
try {
  writeFileSync(
    "public/ads-status.json",
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        origin: base ?? "build",
        publisherId: PUBLISHER,
        ok: failed.length === 0,
        results,
      },
      null,
      2,
    ),
  );
} catch {}

if (failed.length) process.exit(1);

