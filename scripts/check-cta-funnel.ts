import { readFileSync } from "node:fs";
import { join } from "node:path";
import { globSync } from "glob";

const ROOT = process.cwd();
const files = globSync("{src,pages,components}/**/*.{ts,tsx,js,jsx,html}", { cwd: ROOT, nodir: true, absolute: false })
  .concat(["index.html"])
  .filter((f, i, arr) => arr.indexOf(f) === i);

const allowed = [
  "src/components/WhatsAppFunnel.tsx",
  "src/pages/FunilIndisponivel.tsx",
  "src/components/AppErrorBoundary.tsx",
  "src/pages/admin/",
  "src/components/admin/",
];

const violations: string[] = [];
for (const file of files) {
  if (allowed.some((a) => file === a || file.startsWith(a))) continue;
  let text = "";
  try { text = readFileSync(join(ROOT, file), "utf8"); } catch { continue; }
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    const l = line.toLowerCase();
    const isWhatsappPath = l.includes("wa.me/") || l.includes("api.whatsapp.com") || l.includes("window.open(url") || l.includes("window.open(`https://wa.me") || l.includes("window.open(wa") || l.includes("href={whatsappurl") || l.includes("href={walink") || l.includes("href={whatsapp_url");
    const isTracked = l.includes("data-cta-location") || l.includes("trackctaclick") || l.includes("wa-funnel:open") || l.includes("data-wa-funnel") || l.includes("data-funnel-skip");
    if (isWhatsappPath && !isTracked) violations.push(`${file}:${idx + 1} WhatsApp CTA sem tracking/funil explícito`);
    if (l.includes("href=\"tel:") || l.includes("href={'tel:") || l.includes("href={`tel:")) violations.push(`${file}:${idx + 1} tel: direto proibido; use funil/CTA rastreável`);
  });
}

const funnel = readFileSync(join(ROOT, "src/components/WhatsAppFunnel.tsx"), "utf8");
if (!funnel.includes("R$ 99,99") || !funnel.includes("minimumAccepted") || !funnel.includes("disabled={!answers.minimumAccepted}")) {
  violations.push("src/components/WhatsAppFunnel.tsx validação obrigatória do mínimo R$ 99,99 ausente/incompleta");
}
if (!funnel.includes("click_location") && !readFileSync(join(ROOT, "src/lib/funnelAnalytics.ts"), "utf8").includes("click_location")) {
  violations.push("src/lib/funnelAnalytics.ts click_location ausente nos eventos do funil");
}

if (violations.length) {
  console.error("\nCTA funnel gate failed:\n" + violations.map((v) => `- ${v}`).join("\n"));
  process.exit(1);
}
console.log("CTA funnel gate passed: WhatsApp/phone CTAs protegidos, click_location e mínimo R$ 99,99 validados.");
