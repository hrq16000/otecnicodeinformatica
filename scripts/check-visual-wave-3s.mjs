#!/usr/bin/env node
/**
 * RODADA 3S — gate do padrão visual das páginas empresariais.
 *
 * Escopo fechado: /empresa-de-ti-curitiba e /servicos/suporte-tecnico-empresarial.
 * Valida apresentação e conformidade editorial, sem tocar em conteúdo:
 *   • variante empresarial aplicada (sem herdar o template residencial);
 *   • CTA primário + no máximo um CTA secundário de contexto (link interno);
 *   • no máximo 3 CTAs de WhatsApp na página de serviço;
 *   • ausência de elementos exclusivos do template de sintoma;
 *   • ausência de claims proibidos (promessa de prazo/resultado/conformidade);
 *   • breadcrumb correto por família (hub sem pai, serviço com "Serviços").
 */
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const lib = read("src/lib/visualEmpresarial3s.ts");
const layout = read("src/components/servico/ServicoLandingLayout.tsx");
const core = read("src/pages/servicos/ServicoCore.tsx");
const hub = read("src/pages/EmpresaDeTiCuritiba.tsx");

// 1. Escopo fechado
const escopoBloco = lib.match(/VISUAL_3S_PATHS = \[([\s\S]*?)\]/)?.[1] ?? "";
const escopo = [...escopoBloco.matchAll(/"(\/[a-z0-9/-]+)"/g)].map((m) => m[1]);
check(
  escopo.includes("/empresa-de-ti-curitiba") &&
    escopo.includes("/servicos/suporte-tecnico-empresarial") &&
    escopo.length === 2,
  "escopo 3S limitado às duas páginas empresariais",
);

// 2. Variante empresarial ligada só ao slug do escopo
check(/VISUAL_3S_SERVICO_SLUGS = \["suporte-tecnico-empresarial"\]/.test(lib), "variante empresarial restrita ao slug do escopo");
check(core.includes("VISUAL_3S_SERVICO_SLUGS") && core.includes('variante: "empresarial"'), "ServicoCore aplica a variante empresarial");
check(layout.includes("const isEmpresarial = data.variante") && layout.includes("EMPRESARIAL_SERVICO_HERO"), "layout diferencia hero empresarial do residencial");

// 3. Hierarquia de CTAs
for (const [nome, src] of [["hub", hub], ["layout de serviço", layout]]) {
  const secundarios = (src.match(/data-cta-secundario="empresarial"/g) || []).length;
  check(secundarios === 1, `${nome}: exatamente um CTA secundário de contexto`);
}
const waCtas = (layout.match(/data-cta-location=\{`\$\{data\.trackingKey\}/g) || []).length;
check(waCtas <= 3, `layout de serviço: ${waCtas} CTA(s) de WhatsApp (limite 3)`);
const hubWa = (hub.match(/wa\.me|whatsappUrl}/g) || []).length;
check(hubWa > 0, "hub mantém CTA primário de WhatsApp");

// 4. Sem elementos do template de sintoma
const sintoma = [/role="alert"/, /não insista/i, /nao-insistir/];
for (const [nome, src] of [["hub", hub], ["layout de serviço", layout]]) {
  check(!sintoma.some((re) => re.test(src)), `${nome}: sem elementos exclusivos do template de sintoma`);
}

// 5. Claims proibidos na camada visual empresarial
const claims = [
  /em até \d+\s*(h|horas|dias)/i,
  /garantimos? (o )?(resultado|funcionamento)/i,
  /100% (seguro|garantido)/i,
  /conformidade (com a )?(lgpd|iso)/i,
  /melhor (empresa|suporte) de curitiba/i,
];
for (const [nome, src] of [["padrão 3S", lib], ["hub", hub], ["layout de serviço", layout]]) {
  const hit = claims.find((re) => re.test(src));
  check(!hit, `${nome}: sem promessa não comprovável${hit ? ` (${hit})` : ""}`);
}

// 6. Taxonomia / breadcrumbs
check(
  /Breadcrumbs items=\{\[\{ label: "Empresa de TI em Curitiba" \}\]\}/.test(hub.replace(/\s+/g, " ")),
  "hub: breadcrumb Início › Empresa de TI em Curitiba",
);
check(
  /items=\{\[\{ label: "Serviços", href: "\/servicos" \}/.test(layout.replace(/\s+/g, " ")),
  "serviço empresarial: breadcrumb com pai Serviços",
);

// 7. JSON-LD dentro do escopo (sem rating inventado, sem schema de sintoma)
check(!/aggregateRating|ratingValue/.test(hub), "hub: sem aggregateRating");
check(/"@type": "FAQPage"/.test(hub) && /"@type": "Service"/.test(hub), "hub: JSON-LD limitado a Service + FAQPage");

for (const m of ok) console.log(`  ✓ ${m}`);
if (errors.length) {
  console.error("\n✗ RODADA 3S com pendências:");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
console.log("\nRODADA 3S: padrão visual empresarial validado.");
