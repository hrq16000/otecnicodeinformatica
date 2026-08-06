#!/usr/bin/env node
/**
 * RODADA 3T — gate da propagação do padrão visual empresarial.
 *
 * Escopo fechado: /servicos/manutencao-preventiva-empresas,
 * /servicos/backup-para-empresas e /servicos/redes-e-wifi.
 *
 * Valida apenas apresentação e conformidade editorial:
 *   • escopo fechado (três páginas, nenhuma propagação silenciosa);
 *   • hero e cartões de contexto próprios por página (sem template residencial);
 *   • um CTA primário + um único CTA secundário de contexto (link interno);
 *   • sem elementos exclusivos do template de sintoma;
 *   • sem promessa de prazo/SLA/resultado/conformidade e sem preço novo;
 *   • paridade do bloco de contexto entre React e HTML estático.
 */
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const lib = read("src/lib/visualEmpresarial3t.ts");
const core = read("src/pages/servicos/ServicoCore.tsx");
const layout = read("src/components/servico/ServicoLandingLayout.tsx");
const staticBody = read("scripts/curated-static-body.mjs");

const SLUGS = ["manutencao-preventiva-empresas", "backup-para-empresas", "redes-e-wifi"];

// 1. Escopo fechado
const pathsBloco = lib.match(/VISUAL_3T_PATHS = \[([\s\S]*?)\]/)?.[1] ?? "";
const paths = [...pathsBloco.matchAll(/"(\/[a-z0-9/-]+)"/g)].map((m) => m[1]);
check(
  paths.length === 3 && SLUGS.every((s) => paths.includes(`/servicos/${s}`)),
  "escopo 3T limitado às três páginas propagadas",
);
const slugsBloco = lib.match(/VISUAL_3T_SERVICO_SLUGS = \[([\s\S]*?)\]/)?.[1] ?? "";
const slugs = [...slugsBloco.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
check(slugs.length === 3 && SLUGS.every((s) => slugs.includes(s)), "slugs 3T conferem com o escopo");

// 2. Aplicação da variante empresarial
check(core.includes("visual3T") && core.includes("heroEmpresarial") && core.includes("contextoEmpresarial"), "ServicoCore aplica hero e contexto 3T");
check(
  layout.includes("const heroB2B = data.heroEmpresarial") && layout.includes("const contextoB2B = data.contextoEmpresarial"),
  "layout aceita hero e contexto empresarial por página",
);
check(!/EMPRESARIAL_SERVICO_HERO\.(contexto|ctaPrimario|condicoes)/.test(layout), "layout não usa copy 3S fixa quando há override");

// 3. Conteúdo próprio por página (sem hero genérico repetido)
const heros = SLUGS.map((s) => {
  const bloco = lib.match(new RegExp(`"${s}": \\{[\\s\\S]*?\\n  \\},`))?.[0] ?? "";
  return {
    slug: s,
    bloco,
    contexto: bloco.match(/contexto:\s*\n?\s*"([^"]+)"/)?.[1] ?? "",
    cta: bloco.match(/ctaPrimario:\s*"([^"]+)"/)?.[1] ?? "",
    cards: (bloco.match(/titulo:/g) || []).length,
  };
});
for (const h of heros) {
  check(h.contexto.length > 10 && h.cta.length > 5, `${h.slug}: hero empresarial próprio definido`);
  check(h.cards === 3, `${h.slug}: três cartões de contexto`);
  check(/\/servicos\/|\/empresa-de-ti-curitiba/.test(h.bloco), `${h.slug}: CTA secundário é link interno`);
  check(!/wa\.me/.test(h.bloco), `${h.slug}: sem segundo CTA de WhatsApp`);
}
const contextos = new Set(heros.map((h) => h.contexto));
const ctas = new Set(heros.map((h) => h.cta));
check(contextos.size === 3 && ctas.size === 3, "as três páginas têm hero e CTA distintos entre si");

// 4. Sem template residencial nem de sintoma na camada 3T
check(!/(urgente|hoje mesmo|corra|emergência)/i.test(lib), "3T: sem urgência residencial no hero");
check(!/(role="alert"|não insista)/i.test(lib), "3T: sem elementos do template de sintoma");

// 5. Claims proibidos e preço novo
const claims = [
  /em até \d+\s*(h|horas|dias)/i,
  /\bsla\b/i,
  /tempo de resposta/i,
  /chamados ilimitados/i,
  /garantimos? (o )?(resultado|funcionamento)/i,
  /100% (seguro|garantido)/i,
  /conformidade (com a )?(lgpd|iso)/i,
  /melhor (empresa|suporte) de curitiba/i,
];
const semComentarios = lib.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const hit = claims.find((re) => re.test(semComentarios));
check(!hit, `3T: sem promessa não comprovável${hit ? ` (${hit})` : ""}`);
check(!/R\$/.test(semComentarios), "3T: sem preço novo na camada visual");

// 6. Limites de sistemas de terceiros preservados onde é devido
check(/fornecedor/i.test(lib), "3T: limites de sistemas de terceiros explicitados");

// 7. Paridade HTML estático × React
check(staticBody.includes("VISUAL_3T_STATIC") && staticBody.includes("visual3tHtml(route.path)"), "HTML estático renderiza o bloco de contexto 3T");
for (const s of SLUGS) {
  check(staticBody.includes(`"/servicos/${s}"`), `HTML estático cobre /servicos/${s}`);
}

for (const m of ok) console.log(`  ✓ ${m}`);
if (errors.length) {
  console.error("\n✗ RODADA 3T com pendências:");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log("\nRODADA 3T: propagação do padrão visual empresarial validada.");
