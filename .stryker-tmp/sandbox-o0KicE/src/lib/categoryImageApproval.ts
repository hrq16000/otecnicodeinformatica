// @ts-nocheck
export type ApprovalCategory = "windows" | "celular" | "wifi";

export const CATEGORY_IMAGE_PROMPTS: Record<ApprovalCategory, string> = {
  windows:
    "Capa editorial 1200x630 para tutorial Windows em Curitiba: técnico de informática configurando notebook com interface abstrata do Windows, cores da marca azul escuro e laranja, sem textos legíveis, sem logotipos de terceiros, fotografia realista com iluminação limpa.",
  celular:
    "Capa editorial 1200x630 para tutorial de celular em Curitiba: smartphone em bancada técnica com ferramentas organizadas, visual premium, cores azul escuro e laranja da marca, sem textos, sem marcas/logotipos, fotografia realista.",
  wifi:
    "Capa editorial 1200x630 para tutorial de Wi‑Fi em Curitiba: roteador moderno com ondas de sinal abstratas e notebook ao fundo, ambiente residencial/empresa, cores azul escuro e laranja da marca, sem textos, sem logotipos, fotografia realista.",
};

// Trava de governança: chamadas futuras de geração devem consultar este mapa
// antes de usar getUniqueImage/getUniqueImageSrcSet para categorias críticas.
export const CATEGORY_IMAGE_APPROVALS: Record<ApprovalCategory, { approved: boolean; approvedAt?: string; note: string }> = {
  windows: { approved: false, note: "Aguardando aprovação manual do prompt antes de gerar nova imagem." },
  celular: { approved: false, note: "Aguardando aprovação manual do prompt antes de gerar nova imagem." },
  wifi: { approved: false, note: "Aguardando aprovação manual do prompt antes de gerar nova imagem." },
};

export function isCategoryImageApproved(category: ApprovalCategory | null): boolean {
  return !category || CATEGORY_IMAGE_APPROVALS[category]?.approved === true;
}

export function getCategoryPromptPreview(category: ApprovalCategory): string {
  return CATEGORY_IMAGE_PROMPTS[category];
}
