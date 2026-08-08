#!/usr/bin/env node
/**
 * ============================================================================
 * GATE — TRANSPARÊNCIA DA TELEMETRIA FIRST-PARTY (Rodada 4E.2)
 * ============================================================================
 * Garante que o banner de consentimento e a Política de Privacidade descrevam
 * de forma factual o registro técnico próprio do funil (click_events), e que
 * nenhum prazo de retenção ou base legal específica seja INVENTADO para esse
 * fluxo enquanto não houver decisão de governança.
 *
 * Este gate NÃO valida tracking — apenas texto público.
 * ============================================================================
 */
import { readFileSync } from "node:fs";

const BANNER = "src/components/ConsentBanner.tsx";
const POLICY = "src/pages/PoliticaPrivacidade.tsx";

const banner = readFileSync(BANNER, "utf8");
const policy = readFileSync(POLICY, "utf8");

const errors = [];
const ok = [];

const must = (label, cond) => (cond ? ok.push(label) : errors.push(label));

// ── Banner ────────────────────────────────────────────────────────────────
must("banner menciona 'cookies opcionais'", /cookies\s*<\/strong>|cookies opcionais|>cookies opcionais<|<strong>cookies opcionais<\/strong>/i.test(banner));
must(
  "banner descreve registro técnico próprio do funil",
  /registra diretamente/i.test(banner) && /funil/i.test(banner),
);
must(
  "banner esclarece que recusar não encerra o registro técnico",
  /sem aceit|mesmo que recuse|mesmo sem/i.test(banner),
);
must(
  "banner declara ausência de IP/nome/telefone/texto livre",
  /IP/.test(banner) && /telefone/i.test(banner) && /texto livre/i.test(banner),
);
must(
  "'Saiba mais' aponta para /politica-de-privacidade",
  /href="\/politica-de-privacidade[^"]*"[\s\S]{0,200}Saiba mais/i.test(banner),
);
must(
  "banner NÃO aponta cookies/telemetria para /termos-e-condicoes",
  !/termos-e-condicoes/.test(banner),
);
must("banner mantém opção de recusar", /Recusar/.test(banner));

// ── Política ──────────────────────────────────────────────────────────────
must('política possui subseção id="telemetria-funil"', /id: "telemetria-funil"/.test(policy));
must("subseção usa o termo telemetria do funil", /Telemetria técnica do funil/i.test(policy));
must("política explica sessionStorage", /sessionStorage/.test(policy));
must(
  "política lista dados NÃO registrados nesse fluxo",
  /não registra[\s\S]{0,240}IP[\s\S]{0,240}texto livre/i.test(policy),
);
must("política evita chamar o identificador de 'anônimo'", /pseudônimo/i.test(policy));
must(
  "política diferencia first-party de Google",
  /não<\/strong>\s*são enviados[\s\S]{0,120}Google|não são enviados automaticamente ao Google/i.test(
    policy,
  ),
);
must(
  "política explica acesso restrito",
  /restrita a usuários administrativos autorizados/i.test(policy),
);
must("política declara finalidades do funil", /abandono por etapa/i.test(policy));

// ── Proibições de governança ──────────────────────────────────────────────
const telemetryBlock = (policy.match(/id: "telemetria-funil"[\s\S]*?\n  \{\n    id: "/) || [""])[0];
must(
  "nenhum prazo de retenção inventado para a telemetria",
  !/\b(30|60|90|180|365)\s*dias\b|\b(6|12|14|24)\s*meses\b/i.test(telemetryBlock),
);
must(
  "nenhuma base legal específica atribuída à telemetria",
  !/legítimo interesse|execução de contrato|mediante consentimento/i.test(telemetryBlock),
);
must(
  "retenção da telemetria declarada como em definição",
  /em definição pela governança interna/i.test(policy),
);

console.log("── Transparência da telemetria first-party (4E.2) ──");
for (const o of ok) console.log(`  ✔ ${o}`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} verificação(ões) falharam:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`\n✔ ${ok.length} verificações OK — transparência factual da telemetria mantida.`);
