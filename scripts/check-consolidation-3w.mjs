#!/usr/bin/env node
/**
 * Gate da Rodada 3W — consolidação final pré-expansão.
 * Valida exclusivamente as quatro correções P1 da auditoria 3V:
 *  1) PrecoModalidades renderizado uma única vez em /precos-e-politicas;
 *  2) landmark <main> único no ServicoLandingLayout;
 *  3) badge de hero com variante de acento clara (contraste AA em fundo escuro);
 *  4) botão flutuante com offset dinâmico enquanto o banner de cookies existe.
 */
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(p, "utf8");
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

// 1 — duplicação de PrecoModalidades
const termos = read("src/components/TermosConteudo.tsx");
const precos = read("src/pages/PrecosEPoliticas.tsx");
check(
  /withModalidades\s*&&\s*<PrecoModalidades/.test(termos),
  "TermosConteudo renderiza PrecoModalidades sob a flag withModalidades",
);
check(
  /<TermosConteudo\s+withModalidades=\{false\}/.test(precos),
  "PrecosEPoliticas desativa o bloco duplicado em TermosConteudo",
);
check(
  (precos.match(/<PrecoModalidades/g) || []).length === 1,
  "PrecosEPoliticas renderiza PrecoModalidades uma única vez",
);
const modalidades = read("src/components/PrecoModalidades.tsx");
check(
  (modalidades.match(/id="modalidades-atendimento"/g) || []).length === 1,
  "id modalidades-atendimento declarado uma única vez na fonte",
);

// 2 — landmark main
const layout = read("src/components/servico/ServicoLandingLayout.tsx");
const opens = (layout.match(/<main[\s>]/g) || []).length;
const closes = (layout.match(/<\/main>/g) || []).length;
check(opens === 1 && closes === 1, "ServicoLandingLayout possui exatamente um <main>");
check(
  layout.indexOf("<main") < layout.indexOf("<Footer />"),
  "<main> fecha antes do <Footer /> no ServicoLandingLayout",
);

// 3 — contraste do badge de hero
const css = read("src/index.css");
check(/--accent-on-dark:\s*197 88% 64%/.test(css), "Token --accent-on-dark definido");
check(/"on-dark":\s*"hsl\(var\(--accent-on-dark\)\)"/.test(read("tailwind.config.ts")), "Cor accent-on-dark exposta no Tailwind");
for (const p of [
  "src/pages/AtendimentoRemoto.tsx",
  "src/pages/SegurancaDosDados.tsx",
  "src/pages/problemas/ComputadorLento.tsx",
]) {
  check(/tracking-wide text-accent-on-dark/.test(read(p)), `Badge de hero AA em ${p}`);
}

// 4 — colisão cookies x botão flutuante
const consent = read("src/components/ConsentBanner.tsx");
check(/data-consent-banner/.test(consent), "ConsentBanner sinaliza estado via data-consent-banner");
check(/--consent-banner-h/.test(consent), "ConsentBanner publica a altura real do banner");
check(/wa-float-offset/.test(read("src/components/WhatsAppFloat.tsx")), "Botão flutuante usa .wa-float-offset");
check(
  /:root\[data-consent-banner="open"\][^}]*\.wa-float-offset/.test(css) ||
    /:root\[data-consent-banner="open"\] \.wa-float-offset/.test(css),
  "CSS eleva o botão flutuante enquanto o banner está aberto",
);

for (const m of ok) console.log(`  ok  ${m}`);
if (errors.length) {
  console.error("\nFALHAS (Rodada 3W):");
  for (const m of errors) console.error(`  x  ${m}`);
  process.exit(1);
}
console.log(`\ncheck:consolidation-3w OK (${ok.length} verificações)`);
