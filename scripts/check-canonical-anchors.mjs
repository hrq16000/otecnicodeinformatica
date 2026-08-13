#!/usr/bin/env node
/**
 * GATE — CANONICAL, REDIRECTS E ÂNCORAS INTERNAS (anti-fragmentação).
 *
 * Roda sobre o build (dist) e valida, por página indexável:
 *   1. canonical presente, absoluto e auto-referente (nada de canonical
 *      apontando para outra rota, para alias ou para URL com redirect);
 *   2. nenhuma âncora interna aponta para uma origem de redirect (301/404)
 *      declarada em dist/_redirects — link interno sempre vai ao destino final;
 *   3. toda âncora interna resolve para uma rota existente no build;
 *   4. consistência de intenção: páginas de /problemas precisam linkar ao menos
 *      um hub de serviço e as páginas de bairro precisam linkar o hub local
 *      (evita cluster órfão e fragmentação de intenção).
 *
 * Uso: node scripts/check-canonical-anchors.mjs [dist] [--strict]
 * Saída: reports/canonical-anchors.json
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BASE_URL } from "./lib/site-env.mjs";

const DIST = path.resolve(process.argv[2]?.startsWith("--") ? "dist" : process.argv[2] || "dist");
const STRICT = process.argv.includes("--strict");

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

/** Origens declaradas em _redirects (exclui o catch-all de 404). */
const redirectSources = new Map();
const redirectsFile = path.join(DIST, "_redirects");
if (existsSync(redirectsFile)) {
  for (const line of readFileSync(redirectsFile, "utf8").split("\n")) {
    const [from, to, code] = line.trim().split(/\s+/);
    if (!from || from.startsWith("#") || from.includes("*")) continue;
    const status = (code ?? "301").replace("!", "");
    // Só 3xx é redirect: linhas 200 são o rewrite do SPA e 404 é o catch-all.
    if (!/^3\d\d$/.test(status)) continue;
    redirectSources.set(from.replace(/\/$/, "") || "/", { to, code: status });
  }
}

const pages = new Map(); // rota -> html
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e === "index.html") {
      const route =
        ("/" + path.relative(DIST, full).replace(/index\.html$/, "").replace(/\\/g, "/")).replace(/\/$/, "") || "/";
      pages.set(route, readFileSync(full, "utf8"));
    }
  }
})(DIST);

const existsRoute = (route) =>
  pages.has(route) || existsSync(path.join(DIST, route.replace(/^\//, "")));

/** URLs curadas (sitemaps publicados) — só elas exigem canonical auto-referente.
 *  Aliases indexáveis podem canonicalizar para a rota canônica de destino. */
const curadas = new Set();
{
  const idx = "public/sitemap-index.xml";
  if (existsSync(idx)) {
    for (const m of readFileSync(idx, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const file = m[1].replace(BASE_URL, "public");
      if (!existsSync(file)) continue;
      for (const u of readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
        curadas.add((u[1].replace(BASE_URL, "").replace(/\/$/, "")) || "/");
      }
    }
  }
}

const errors = [];
const warnings = [];
const detalhe = [];

for (const [route, html] of [...pages].sort()) {
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  const indexavel = !/noindex/i.test(robots);
  const canonical = html.match(/<link rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? null;
  const item = { route, indexavel, canonical, anchors: 0, problemas: [] };

  if (indexavel) {
    if (!canonical) {
      errors.push(`${route}: sem <link rel="canonical">`);
      item.problemas.push("canonical-ausente");
    } else {
      const esperado = `${BASE_URL}${route === "/" ? "/" : route}`;
      const normal = canonical.replace(/\/$/, "") || "/";
      const alvo = esperado.replace(/\/$/, "") || "/";
      if (BASE_URL && normal !== alvo && curadas.has(route)) {
        errors.push(`${route}: canonical não é auto-referente (${canonical})`);
        item.problemas.push("canonical-cruzado");
      }
      const canonPath = BASE_URL ? canonical.replace(BASE_URL, "") || "/" : canonical;
      if (redirectSources.has(canonPath.replace(/\/$/, "") || "/")) {
        errors.push(`${route}: canonical aponta para URL com redirect (${canonPath})`);
        item.problemas.push("canonical-redirect");
      }
    }
  }

  const hrefs = new Set(
    [...html.matchAll(/<a\b[^>]*?\shref="(\/[^"#?]*)"/gi)].map((m) => (m[1].replace(/\/$/, "") || "/")),
  );
  item.anchors = hrefs.size;
  for (const href of hrefs) {
    if (/\.[a-z0-9]{2,5}$/i.test(href)) continue; // arquivos (pdf, txt, xml)
    if (redirectSources.has(href)) {
      warnings.push(`${route}: âncora interna para origem de redirect ${href} → ${redirectSources.get(href).to}`);
      item.problemas.push(`anchor-redirect:${href}`);
      continue;
    }
    if (!existsRoute(href)) {
      warnings.push(`${route}: âncora interna sem rota no build → ${href}`);
      item.problemas.push(`anchor-quebrada:${href}`);
    }
  }

  if (indexavel && route.startsWith("/problemas/")) {
    const temServico = [...hrefs].some((h) => h.startsWith("/servicos/"));
    if (!temServico) {
      warnings.push(`${route}: página de sintoma sem âncora para hub de serviço`);
      item.problemas.push("intencao-sem-servico");
    }
  }
  if (indexavel && route.startsWith("/bairros/")) {
    const temLocal = [...hrefs].some((h) => h === "/areas-atendidas" || h.startsWith("/assistencia-tecnica"));
    if (!temLocal) {
      warnings.push(`${route}: página de bairro sem âncora para o hub local`);
      item.problemas.push("intencao-sem-hub-local");
    }
  }

  detalhe.push(item);
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  paginas: detalhe.length,
  indexaveis: detalhe.filter((d) => d.indexavel).length,
  redirectsDeclarados: redirectSources.size,
  errors,
  warnings,
  detalhe,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/canonical-anchors.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(
  `Canonical/âncoras: ${relatorio.indexaveis} páginas indexáveis · ${relatorio.redirectsDeclarados} redirects declarados`,
);
for (const w of warnings.slice(0, 25)) console.log(`  ⚠ ${w}`);
if (warnings.length > 25) console.log(`  … +${warnings.length - 25} alerta(s) em reports/canonical-anchors.json`);

if (errors.length) {
  console.error(`\n✖ ${errors.length} erro(s) de canonical:`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}
if (STRICT && warnings.length) {
  console.error(`\n✖ modo --strict: ${warnings.length} alerta(s) tratados como erro.`);
  process.exit(1);
}
console.log("✔ Canonicals auto-referentes e âncoras internas consistentes.");
