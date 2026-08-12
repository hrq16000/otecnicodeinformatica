// Lista determinística das 41 URLs críticas da migração
// tecnicocuritiba.com.br → o domínio configurado.
//
// Composição: 11 URLs núcleo (Etapa 10 da Rodada 4B.1) + representantes
// obrigatórios por categoria fora do core (TV, celular, CFTV, impressora,
// bairros, cidades, marcas, serviços, blog). A seleção é estável: as
// categorias são preenchidas em ordem alfabética a partir da própria matriz,
// então o conjunto só muda se a matriz mudar.
import { readFileSync } from "node:fs";

export const MAP_PATH = "redirects/tecnicocuritiba.map.json";
export const OFFICIAL_WA = "5541997086380";
export const LEGACY_WA = "5541997452053";

export function loadMap(path = MAP_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

// Núcleo: home, dinheiro, cidades-âncora, bairro-âncora, serviço, funil, B2B.
const CORE = [
  "/",
  "/valores",
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-fazenda-rio-grande",
  "/tecnico-informatica-colombo",
  "/assistencia-tecnica-curitiba",
  "/bairros/jardim-das-americas",
  "/servicos/conserto-pc-notebook/portao",
  "/diagnostico-60s",
  "/suporte-empresas",
  "/seja-parceiro",
];

// Categorias fora do core que precisam de equivalência temática comprovada.
const CATEGORY_MATCHERS = [
  ["tv", (p) => /(^|\/)(conserto-tv|manutencao-tv)|\/problemas\/tv-/.test(p)],
  ["celular", (p) => /celular/.test(p)],
  ["cftv", (p) => p.startsWith("/cftv")],
  ["impressora", (p) => /impressora/.test(p)],
  ["marcas", (p) => p.startsWith("/marcas/")],
  ["servicos", (p) => p.startsWith("/servicos/") && !CORE.includes(p)],
  ["bairros", (p) => p.startsWith("/bairros/") && !CORE.includes(p)],
  ["atendimento", (p) => p.startsWith("/atendimento/")],
  ["blog", (p) => p.startsWith("/blog")],
  ["problemas", (p) => p.startsWith("/problemas/")],
];

export const CRITICAL_TARGET = 41;

export function criticalPaths(map = loadMap()) {
  const all = map.rules.map((r) => r.from);
  const set = new Set(CORE.filter((p) => all.includes(p)));
  const perCategory = 3;
  for (let round = 0; round < perCategory; round += 1) {
    for (const [, match] of CATEGORY_MATCHERS) {
      if (set.size >= CRITICAL_TARGET) break;
      const candidate = all
        .filter((p) => match(p) && !set.has(p))
        .sort()
        .at(round);
      if (candidate) set.add(candidate);
    }
  }
  // completa com a ordem da matriz caso alguma categoria esteja vazia
  for (const p of all) {
    if (set.size >= CRITICAL_TARGET) break;
    set.add(p);
  }
  return [...set].slice(0, CRITICAL_TARGET);
}

export function categoryOf(path) {
  for (const [name, match] of CATEGORY_MATCHERS) if (match(path)) return name;
  return CORE.includes(path) ? "core" : "outros";
}

// Detecta um número em qualquer formatação dentro de um texto arbitrário.
export function containsNumber(text, number) {
  const flat = String(text).replace(/&#\d+;/g, "").replace(/\D/g, "");
  return flat.includes(number) || flat.includes(number.slice(2));
}

// Superfícies onde o número legado pode aparecer.
export function scanLegacySurfaces(html, number = LEGACY_WA) {
  const hits = [];
  const push = (surface, sample) => hits.push({ surface, sample: sample.slice(0, 160) });
  for (const m of html.matchAll(/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\d{10,15})/g))
    if (containsNumber(m[1], number)) push("wa.me", m[0]);
  for (const m of html.matchAll(/tel:\+?([\d\s().-]{8,})/g))
    if (containsNumber(m[1], number)) push("tel:", m[0]);
  for (const m of html.matchAll(/"(?:telephone|sameAs|contactPoint|identifier)"\s*:\s*("[^"]*"|\[[^\]]*\])/g))
    if (containsNumber(m[1], number)) push("json-ld", m[0]);
  for (const m of html.matchAll(/(?:src|href|content|alt|aria-label|data-[\w-]+)="([^"]*)"/gi))
    if (containsNumber(m[1], number)) push("atributo/asset", m[0]);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ");
  if (containsNumber(text, number)) push("texto visível", "ocorrência no texto renderizado");
  return hits;
}
