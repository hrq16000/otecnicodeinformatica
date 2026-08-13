// @ts-nocheck
// RODADA 4B.2 — Exportador de redirects para as camadas de edge/hospedagem.
// Fonte de verdade única: redirects/tecnicocuritiba.map.json
//
// Uso:
//   node scripts/export-redirects.mjs                 # todos os formatos
//   node scripts/export-redirects.mjs --format=nginx  # um formato
//
// Formatos gerados em redirects/export/:
//   cloudflare-bulk-redirects.csv     Bulk Redirects (lista de URLs)
//   cloudflare-ruleset.json           Ruleset dinâmico (http_request_dynamic_redirect)
//   nginx.conf                        map + return 301
//   apache.htaccess                   RewriteMap inline (RewriteRule por origem)
//   netlify-_redirects.txt            fallback de plataforma
//
// Regras preservadas integralmente: origem, destino, status permanente,
// exceções das 10 URLs mantidas (nunca redirecionadas) e ausência de qualquer
// regra genérica para "/".
import { mkdirSync, writeFileSync } from "node:fs";
import { loadMap } from "./lib/migration-critical.mjs";

const map = loadMap();
const OUT = "redirects/export";
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--format="))?.split("=")[1] ?? null;
const host = map.source_domain.replace("https://", "");
const kept = new Set(map.kept_urls ?? []);

const rules = map.rules.filter((r) => !kept.has(r.from));
if (rules.length !== map.rules.length) {
  console.error("BLOQUEADO: a matriz contém regra para uma URL mantida.");
  process.exit(1);
}
const generic = rules.filter((r) => r.to === `${map.target_domain}/` && r.from !== "/");
if (generic.length) {
  console.error(`BLOQUEADO: ${generic.length} regra(s) genérica(s) para a home: ${generic.slice(0, 5).map((r) => r.from).join(", ")}`);
  process.exit(1);
}

const esc = (s) => s.replace(/"/g, '\\"');
const header = (comment) =>
  [
    `${comment} Migração SEO ${map.source_domain} → ${map.target_domain}`,
    `${comment} Gerado por scripts/export-redirects.mjs em ${new Date().toISOString()}`,
    `${comment} ${rules.length} regras permanentes · ${kept.size} URLs mantidas (não redirecionadas)`,
    `${comment} Fonte de verdade: redirects/tecnicocuritiba.map.json — não editar à mão`,
    "",
  ].join("\n");

const builders = {
  // 1. Cloudflare Bulk Redirects (CSV importável no dashboard)
  "cloudflare-bulk-redirects.csv": () =>
    [
      "source_url,target_url,status_code,preserve_query_string,include_subdomains,subpath_matching,preserve_path_suffix",
      ...rules.map(
        (r) => `https://${host}${r.from},${r.to},${r.status},true,true,false,false`,
      ),
    ].join("\n") + "\n",

  // 2. Cloudflare Ruleset dinâmico (API /rulesets — phase http_request_dynamic_redirect)
  "cloudflare-ruleset.json": () =>
    JSON.stringify(
      {
        name: `Migração ${host} → ${map.target_domain.replace("https://", "")}`,
        description: `${rules.length} redirects 301 permanentes · gerado da matriz aprovada`,
        kind: "zone",
        phase: "http_request_dynamic_redirect",
        rules: rules.map((r) => ({
          action: "redirect",
          description: `301 ${r.from}`,
          expression: `(http.host in {"${host}" "www.${host}"} and http.request.uri.path eq "${esc(r.from)}")`,
          action_parameters: {
            from_value: {
              status_code: r.status,
              target_url: { value: r.to },
              preserve_query_string: true,
            },
          },
        })),
      },
      null,
      2,
    ) + "\n",

  // 3. Nginx
  "nginx.conf": () =>
    header("#") +
    [
      "map $request_uri $migracao_destino {",
      "    default \"\";",
      ...rules.map((r) => `    ${r.from} "${r.to}";`),
      "}",
      "",
      "server {",
      `    server_name ${host} www.${host};`,
      "",
      "    # URLs mantidas temporariamente (não redirecionar):",
      ...[...kept].map((p) => `    #   ${p}`),
      "",
      "    if ($migracao_destino != \"\") {",
      "        return 301 $migracao_destino;",
      "    }",
      "}",
      "",
    ].join("\n"),

  // 4. Apache
  "apache.htaccess": () =>
    header("#") +
    [
      "<IfModule mod_rewrite.c>",
      "  RewriteEngine On",
      "",
      "  # URLs mantidas temporariamente (nenhuma regra abaixo as cobre):",
      ...[...kept].map((p) => `  #   ${p}`),
      "",
      ...rules.map(
        (r) =>
          `  RewriteRule "^${r.from.replace(/^\//, "").replace(/([.$+?^{}()|\[\]\\])/g, "\\$1")}$" "${r.to}" [R=${r.status},L,QSA]`,
      ),
      "</IfModule>",
      "",
    ].join("\n"),

  // 5. Netlify / plataformas com _redirects
  "netlify-_redirects.txt": () =>
    header("#") + rules.map((r) => `${r.from}  ${r.to}  ${r.status}!`).join("\n") + "\n",
};

mkdirSync(OUT, { recursive: true });
const written = [];
for (const [file, build] of Object.entries(builders)) {
  if (only && !file.includes(only)) continue;
  writeFileSync(`${OUT}/${file}`, build());
  written.push(`${OUT}/${file}`);
}

if (!written.length) {
  console.error(`Formato desconhecido: ${only}. Use cloudflare, nginx, apache ou netlify.`);
  process.exit(1);
}

console.log(`export de redirects: ${rules.length} regras · ${kept.size} URLs mantidas preservadas`);
for (const f of written) console.log(`  ✔ ${f}`);
