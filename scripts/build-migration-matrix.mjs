// RODADA 4B — Gera a matriz de migração tecnicocuritiba.com.br → tecnico.curitiba.br
// SOMENTE LEITURA sobre o app: lê rotas de src/App.tsx + src/LegacyApp.tsx e o
// inventário de URLs antigas (arquivo texto, um path por linha).
// Saídas: docs/migracao/matriz-redirects.csv e redirects/tecnicocuritiba.map.json
// Não publica nada. Não altera hospedagem.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const OLD = "https://tecnicocuritiba.com.br";
const NEW = "https://tecnico.curitiba.br";

const INVENTORY = process.env.OLD_URLS ?? "docs/migracao/old-paths.txt";

// ── rotas do domínio novo ────────────────────────────────────────
const routeSrc = ["src/App.tsx", "src/LegacyApp.tsx"]
  .filter((f) => existsSync(f))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");
const routes = [...new Set([...routeSrc.matchAll(/path="([^"]+)"/g)].map((m) => m[1]))];
const staticRoutes = new Set(routes.filter((r) => !r.includes(":") && r !== "*"));
const dynamicRoutes = routes
  .filter((r) => r.includes(":"))
  .map((r) => ({
    route: r,
    re: new RegExp(`^${r.replace(/:[^/]+/g, "[^/]+")}$`),
  }));

// ── consolidações explícitas (canibalização / renomeações) ───────
// Cada entrada é uma decisão manual auditada, não uma regra em massa.
const EXPLICIT = {
  "/valores": { to: "/precos-e-politicas", type: "consolidada", why: "intenção de preço; canibalizava 'tecnico informatica curitiba'" },
  "/precos": { to: "/precos-e-politicas", type: "equivalente", why: "alias de preço" },
  "/privacidade": { to: "/politica-de-privacidade", type: "alias", why: "alias utilitário" },
  "/index": { to: "/", type: "duplicata", why: "duplicata da home" },
  "/servicos/conserto-pc-notebook": { to: "/servicos/manutencao-de-notebook", type: "consolidada", why: "slug canônico novo" },
  "/servicos/formatacao-computador": { to: "/servicos/formatacao", type: "consolidada", why: "slug canônico novo" },
  "/servicos/remocao-virus": { to: "/servicos/remocao-de-virus", type: "consolidada", why: "slug canônico novo" },
  "/servicos/redes-wifi": { to: "/servicos/redes-e-wifi", type: "consolidada", why: "slug canônico novo" },
  "/servicos/upgrade-ssd-memoria": { to: "/servicos/upgrade-ssd-ram", type: "consolidada", why: "slug canônico novo" },
  "/servicos/backup-recuperacao": { to: "/servicos/recuperacao-de-dados", type: "consolidada", why: "slug canônico novo" },
  "/manutencao-notebook-pc-curitiba": { to: "/servicos/manutencao-de-notebook", type: "equivalente", why: "mesma intenção: manutenção de notebook/PC em Curitiba" },
  "/autor/tecnico-curitiba": { to: "/gestor-responsavel", type: "utilitária", why: "página de autor → gestor responsável (E-E-A-T)" },
};

// Slugs de cidade divergentes entre os dois portais.
const CITY_SLUG_ALIAS = {
  "sao-jose-dos-pinhais": "sao-jose-pinhais",
};

// Prefixos consolidados (intenção idêntica, hierarquia antiga descontinuada).
const PREFIX_RULES = [
  // /atendimento/<cidade>/<bairro> e /atendimento/<cidade> → hub de cidade real
  {
    test: /^\/atendimento\/([^/]+)(?:\/[^/]+)?$/,
    map: (m) => `/tecnico-informatica-${CITY_SLUG_ALIAS[m[1]] ?? m[1]}`,
    type: "consolidada",
    why: "hierarquia /atendimento descontinuada; intenção local preservada no hub de cidade",
  },
  { test: /^\/atendimento$/, map: () => "/atendimento-domicilio", type: "equivalente", why: "intenção de modalidade de atendimento" },
];

// Intenção incompatível com informática: nunca redirecionar para serviço de PC.
const OFF_TOPIC = [
  { re: /^\/servicos\/(conserto-tv|manutencao-tv)/, group: "TV" },
  { re: /^\/conserto-tv/, group: "TV" },
  { re: /^\/servicos\/conserto-celular/, group: "Celular" },
  { re: /^\/conserto-celular/, group: "Celular" },
  { re: /^\/microsoldagem-celular/, group: "Celular" },
  { re: /^\/cftv/, group: "CFTV" },
  { re: /^\/conserto-impressora/, group: "Impressora" },
  { re: /^\/conserto-som/, group: "Som" },
  { re: /^\/conserto-videogame/, group: "Videogame" },
  { re: /^\/assistencia-eletrodomesticos/, group: "Eletrodomésticos" },
  { re: /^\/marcas/, group: "Marcas (multi-categoria)" },
];

function existsOnNew(path) {
  if (staticRoutes.has(path)) return true;
  return dynamicRoutes.some((d) => d.re.test(path));
}

function decide(path) {
  const ex = EXPLICIT[path];
  if (ex) {
    return { to: ex.to, type: ex.type, decision: existsOnNew(ex.to) ? "301" : "manter", why: ex.why };
  }
  for (const rule of PREFIX_RULES) {
    const m = path.match(rule.test);
    if (m) {
      const to = rule.map(m);
      return existsOnNew(to)
        ? { to, type: rule.type, decision: "301", why: rule.why }
        : { to: "", type: "sem destino atual", decision: "manter", why: `${rule.why} (destino ${to} inexistente)` };
    }
  }
  const off = OFF_TOPIC.find((o) => o.re.test(path));
  if (off) {
    return existsOnNew(path)
      ? { to: path, type: "exata", decision: "301", why: `fora do foco (${off.group}) mas rota equivalente existe — sem troca de intenção` }
      : { to: "", type: "conteúdo fora do foco", decision: "decisão pendente", why: `${off.group}: sem equivalente; classificar A/B/C/D antes de 410` };
  }
  if (existsOnNew(path)) {
    return { to: path, type: "exata", decision: "301", why: "rota idêntica no domínio novo" };
  }
  return { to: "", type: "sem destino atual", decision: "manter", why: "sem equivalente auditado — manter temporariamente" };
}

const paths = readFileSync(resolve(INVENTORY), "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l.startsWith("/"));

const rows = [...new Set(paths)].sort().map((p) => ({ from: p, ...decide(p) }));

mkdirSync("docs/migracao", { recursive: true });
mkdirSync("redirects", { recursive: true });

const csv = [
  "url_antiga,intencao_tipo,url_nova,decisao,motivo",
  ...rows.map((r) => `${OLD}${r.from},${r.type},${r.to ? NEW + r.to : ""},${r.decision},"${r.why}"`),
].join("\n");
writeFileSync("docs/migracao/matriz-redirects.csv", csv + "\n");

const map = rows
  .filter((r) => r.decision === "301" && r.to)
  .map((r) => ({ from: r.from, to: `${NEW}${r.to}`, status: 301 }));
writeFileSync(
  "redirects/tecnicocuritiba.map.json",
  JSON.stringify({ source_domain: OLD, target_domain: NEW, generated_from: INVENTORY, published: false, rules: map }, null, 2) + "\n",
);

const counts = rows.reduce((a, r) => ((a[r.decision] = (a[r.decision] ?? 0) + 1), a), {});
console.log(`matriz: ${rows.length} URLs`, counts);
