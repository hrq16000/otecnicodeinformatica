// @ts-nocheck
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const START_DIRS = ["src", "public"].filter((d) => existsSync(join(ROOT, d)));
const EXTRA_FILES = ["index.html"].filter((f) => existsSync(join(ROOT, f)));
const EXT = /\.(ts|tsx|js|jsx|html)$/;
const ALLOWLIST = ["src/components/WhatsAppFunnel.tsx", "src/pages/FunilIndisponivel.tsx", "src/pages/admin/", "src/components/admin/"];

function walk(dir: string, out: string[] = []) {
  for (const entry of readdirSync(join(ROOT, dir))) {
    const full = join(ROOT, dir, entry);
    const rel = relative(ROOT, full).replace(/\\/g, "/");
    const st = statSync(full);
    if (st.isDirectory()) walk(rel, out);
    else if (EXT.test(rel)) out.push(rel);
  }
  return out;
}

const files = [...START_DIRS.flatMap((d) => walk(d)), ...EXTRA_FILES];
const violations: string[] = [];

for (const file of files) {
  if (ALLOWLIST.some((a) => file === a || file.startsWith(a))) continue;
  const text = readFileSync(join(ROOT, file), "utf8");

  const anchors = text.match(/<a\b[\s\S]{0,1600}?>/g) || [];
  for (const tag of anchors) {
    const low = tag.toLowerCase();
    if ((low.includes("wa.me/") || low.includes("api.whatsapp.com")) && !low.includes("data-funnel-skip")) {
      if (!low.includes("data-cta-location") && !low.includes("onclick=") && !low.includes("onclick={")) {
        const line = text.slice(0, text.indexOf(tag)).split(/\r?\n/).length;
        violations.push(`${file}:${line} WhatsApp anchor sem click_location/onClick`);
      }
    }
  }

  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    const l = line.toLowerCase();
    const opensWa = /window\.open\s*\(/.test(line) && (l.includes("wa.me") || l.includes("whatsapp_number") || l.includes("whatsapp"));
    if (opensWa) {
      const ctx = lines.slice(Math.max(0, idx - 12), idx + 1).join("\n").toLowerCase();
      if (!ctx.includes("trackctaclick") && !ctx.includes("wa-funnel:open") && !ctx.includes("data-cta-location")) {
        violations.push(`${file}:${idx + 1} window.open WhatsApp sem tracking/funil explícito`);
      }
    }
    if (l.includes("href=\"tel:") || l.includes("href={'tel:") || l.includes("href={`tel:")) {
      violations.push(`${file}:${idx + 1} link tel: direto proibido; todos os contatos passam pelo funil`);
    }
  });
}

const funnel = readFileSync(join(ROOT, "src/components/WhatsAppFunnel.tsx"), "utf8");
const analytics = readFileSync(join(ROOT, "src/lib/funnelAnalytics.ts"), "utf8");
// V6 semantics (PF × PJ): valor mínimo R$ 99,99 é confirmado via etapa de termos (validateStep)
// antes do submit. O laço de validação percorre as etapas do ramo atual (`getSteps(answers)`),
// que pode ser residencial (7) ou empresarial (6).
const validatesAllSteps =
  /for \(let s = 0; s < TOTAL_STEPS/.test(funnel) ||
  /for \(let s = 0; s < getSteps\(answers\)\.length/.test(funnel);
if (!funnel.includes("R$ 99,99") || !funnel.includes("minimumAccepted") || !validatesAllSteps) {
  violations.push("src/components/WhatsAppFunnel.tsx deve exigir confirmação do valor mínimo R$ 99,99 antes de abrir WhatsApp");
}
if (!analytics.includes("click_location") || !analytics.includes("app_version")) {
  violations.push("src/lib/funnelAnalytics.ts deve enviar click_location e app_version em todos os eventos do wa-funnel");
}

if (violations.length) {
  console.error("\nCTA funnel gate failed:\n" + violations.map((v) => `- ${v}`).join("\n"));
  process.exit(1);
}
console.log("CTA funnel gate passed: CTAs protegidos, sem tel:, click_location/app_version e mínimo R$ 99,99 validados.");
