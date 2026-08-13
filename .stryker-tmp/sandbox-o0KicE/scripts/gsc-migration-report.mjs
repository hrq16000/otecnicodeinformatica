// @ts-nocheck
// RODADA 4B.2 — Relatório de Search Console para a migração.
// Lê sitemaps, estado de indexação das URLs prioritárias e o status da mudança
// de endereço (quando disponível na API) nas duas propriedades, produzindo um
// relatório para aprovação. NÃO executa mutações sem --submit-sitemap.
//
// Autenticação: connector gateway do Lovable (Google Search Console).
//   LOVABLE_API_KEY                  auth no gateway
//   GOOGLE_SEARCH_CONSOLE_API_KEY    chave da conexão
//
// Uso:
//   node scripts/gsc-migration-report.mjs
//   node scripts/gsc-migration-report.mjs --submit-sitemap
//
// Saídas: reports/gsc-migration.json · reports/gsc-migration.md
import { writeFileSync, mkdirSync } from "node:fs";
import { loadMap, criticalPaths } from "./lib/migration-critical.mjs";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const map = loadMap();
const args = process.argv.slice(2);
const SUBMIT = args.includes("--submit-sitemap");

const lovableKey = process.env.LOVABLE_API_KEY;
const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
const pendencies = [];

const headers = {
  Authorization: `Bearer ${lovableKey}`,
  "X-Connection-Api-Key": gscKey ?? "",
  "Content-Type": "application/json",
};

async function gsc(path, init = {}) {
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers: { ...headers, ...(init.headers ?? {}) } });
  const body = await res.text();
  if (!res.ok) throw new Error(`[${res.status}] ${body.slice(0, 300)}`);
  return body ? JSON.parse(body) : {};
}

const enc = encodeURIComponent;
const hostOf = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

function matches(siteUrl, domain) {
  const host = hostOf(domain);
  if (siteUrl.startsWith("sc-domain:")) {
    const d = siteUrl.slice(10).toLowerCase();
    return host === d || host.endsWith(`.${d}`);
  }
  return hostOf(siteUrl) === host;
}

const report = {
  generated_at: new Date().toISOString(),
  source_domain: map.source_domain,
  target_domain: map.target_domain,
  authenticated: Boolean(lovableKey && gscKey),
  properties: { old: [], new: [] },
  sitemaps: { old: [], new: [] },
  inspections: [],
  address_change: {
    supported_by_api: false,
    note: "A API do Search Console não expõe 'Alteração de endereço'. Executar manualmente em Configurações → Alteração de endereço.",
    status: "pendente",
  },
  pendencies,
};

if (!report.authenticated) {
  pendencies.push(
    "credenciais do Search Console ausentes (LOVABLE_API_KEY / GOOGLE_SEARCH_CONSOLE_API_KEY) — conecte o Google Search Console",
  );
} else {
  try {
    const { siteEntry = [] } = await gsc("/webmasters/v3/sites");
    const verified = siteEntry.filter((s) => s.permissionLevel !== "siteUnverifiedUser");
    report.properties.old = verified.filter((s) => matches(s.siteUrl, map.source_domain)).map((s) => s.siteUrl);
    report.properties.new = verified.filter((s) => matches(s.siteUrl, map.target_domain)).map((s) => s.siteUrl);

    for (const [key, domain] of [["old", map.source_domain], ["new", map.target_domain]]) {
      const props = report.properties[key];
      if (!props.length) {
        pendencies.push(`nenhuma propriedade verificada cobre ${domain} — verificar propriedade no Search Console`);
        continue;
      }
      if (props.length > 1) {
        pendencies.push(`múltiplas propriedades cobrem ${domain} (${props.join(", ")}) — escolher uma antes de submeter`);
        continue;
      }
      const site = props[0];
      try {
        const { sitemap = [] } = await gsc(`/webmasters/v3/sites/${enc(site)}/sitemaps`);
        report.sitemaps[key] = sitemap.map((s) => ({
          path: s.path,
          lastSubmitted: s.lastSubmitted ?? null,
          lastDownloaded: s.lastDownloaded ?? null,
          errors: Number(s.errors ?? 0),
          warnings: Number(s.warnings ?? 0),
          isPending: Boolean(s.isPending),
        }));
        for (const s of report.sitemaps[key])
          if (s.errors) pendencies.push(`sitemap ${s.path} reporta ${s.errors} erro(s) — causa não informada pela API`);
      } catch (err) {
        pendencies.push(`falha ao ler sitemaps de ${site}: ${err.message}`);
      }
    }

    // Inspeção de indexação das URLs prioritárias no domínio novo.
    const newSite = report.properties.new[0];
    if (newSite) {
      const priority = criticalPaths(map).slice(0, 15);
      for (const p of priority) {
        const rule = map.rules.find((r) => r.from === p);
        const inspectionUrl = rule?.to ?? `${map.target_domain}${p}`;
        try {
          const data = await gsc("/v1/urlInspection/index:inspect", {
            method: "POST",
            body: JSON.stringify({ inspectionUrl, siteUrl: newSite }),
          });
          const idx = data.inspectionResult?.indexStatusResult ?? {};
          report.inspections.push({
            url: inspectionUrl,
            verdict: idx.verdict ?? null,
            coverageState: idx.coverageState ?? null,
            googleCanonical: idx.googleCanonical ?? null,
            userCanonical: idx.userCanonical ?? null,
            lastCrawlTime: idx.lastCrawlTime ?? null,
            robotsTxtState: idx.robotsTxtState ?? null,
          });
          if (idx.googleCanonical && idx.userCanonical && idx.googleCanonical !== idx.userCanonical)
            pendencies.push(`canonical divergente em ${inspectionUrl}: Google escolheu ${idx.googleCanonical}`);
        } catch (err) {
          report.inspections.push({ url: inspectionUrl, error: err.message });
        }
      }
    }

    if (SUBMIT && report.properties.new.length === 1) {
      const site = report.properties.new[0];
      const sitemapUrl = `${map.target_domain}/sitemap-index.xml`;
      await gsc(`/webmasters/v3/sites/${enc(site)}/sitemaps/${enc(sitemapUrl)}`, { method: "PUT" });
      report.submitted_sitemap = sitemapUrl;
    } else if (SUBMIT) {
      pendencies.push("--submit-sitemap ignorado: propriedade do domínio novo não resolvida com exatidão");
    }
  } catch (err) {
    pendencies.push(`erro na API do Search Console: ${err.message}`);
  }
}

mkdirSync("reports", { recursive: true });
writeFileSync("reports/gsc-migration.json", JSON.stringify(report, null, 2) + "\n");

const md = [
  "# Search Console — relatório da migração",
  "",
  `- Gerado em: ${report.generated_at}`,
  `- Autenticado: ${report.authenticated ? "sim" : "NÃO"}`,
  `- Propriedade antiga: ${report.properties.old.join(", ") || "não verificada"}`,
  `- Propriedade nova: ${report.properties.new.join(", ") || "não verificada"}`,
  "",
  "## Sitemaps",
  "",
  "| Propriedade | Sitemap | Último envio | Erros | Avisos | Pendente |",
  "| --- | --- | --- | --- | --- | --- |",
  ...["old", "new"].flatMap((k) =>
    report.sitemaps[k].map(
      (s) => `| ${k === "old" ? "antiga" : "nova"} | ${s.path} | ${s.lastSubmitted ?? "-"} | ${s.errors} | ${s.warnings} | ${s.isPending ? "sim" : "não"} |`,
    ),
  ),
  report.sitemaps.old.length + report.sitemaps.new.length ? "" : "| - | _sem dados_ | - | - | - | - |",
  "",
  "## Indexação das URLs prioritárias (domínio novo)",
  "",
  "| URL | Veredito | Cobertura | Canonical do Google | Canonical declarado | Último rastreamento |",
  "| --- | --- | --- | --- | --- | --- |",
  ...report.inspections.map(
    (i) =>
      `| ${i.url} | ${i.verdict ?? (i.error ? "erro" : "-")} | ${i.coverageState ?? "-"} | ${i.googleCanonical ?? "-"} | ${
        i.userCanonical ?? "-"
      } | ${i.lastCrawlTime ?? "-"} |`,
  ),
  report.inspections.length ? "" : "| - | _sem dados_ | - | - | - | - |",
  "",
  "## Alteração de endereço",
  "",
  `- Suportada pela API: **não**. ${report.address_change.note}`,
  `- Status: ${report.address_change.status}`,
  "",
  "## Pendências",
  "",
  pendencies.length ? pendencies.map((p) => `- ${p}`).join("\n") : "_nenhuma_",
  "",
].join("\n");
writeFileSync("reports/gsc-migration.md", md);

console.log(`Search Console: ${report.inspections.length} URLs inspecionadas · ${pendencies.length} pendências`);
for (const p of pendencies) console.log(`  PENDENTE ${p}`);
console.log("relatórios: reports/gsc-migration.json · reports/gsc-migration.md");
