import { CATEGORY_IMAGE_APPROVALS, CATEGORY_IMAGE_PROMPTS } from "../src/lib/categoryImageApproval";

console.log("Prévia de prompts para aprovação manual antes de chamar getUniqueImage/getUniqueImageSrcSet:\n");
for (const [category, prompt] of Object.entries(CATEGORY_IMAGE_PROMPTS)) {
  const approval = CATEGORY_IMAGE_APPROVALS[category as keyof typeof CATEGORY_IMAGE_APPROVALS];
  console.log(`## ${category.toUpperCase()} — ${approval.approved ? "APROVADO" : "PENDENTE"}`);
  console.log(prompt);
  console.log(approval.note ? `Nota: ${approval.note}` : "");
  console.log("");
}
if (Object.values(CATEGORY_IMAGE_APPROVALS).some((a) => !a.approved)) {
  console.log("Fluxo travado: aprove os prompts alterando CATEGORY_IMAGE_APPROVALS antes de gerar novas capas.");
  process.exitCode = 1;
}
