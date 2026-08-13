/**
 * ORÇAMENTOS DE PERFORMANCE EM RUNTIME.
 *
 * Espelham exatamente os budgets bloqueantes do CI
 * (`scripts/check-performance-budgets.mjs`) para que o alerta em produção
 * use o mesmo critério do gate: se reprovaria no CI, dispara alerta aqui.
 *
 * Fonte única consumida por:
 *   • src/lib/webVitals.ts (alerta de LCP/CLS/INP);
 *   • src/lib/interactionMetrics.ts (tempo até interação / loading);
 *   • src/pages/admin/AdminUiPerformance.tsx (painel).
 */
export const BUDGETS = {
  LCP: 3500,
  CLS: 0.1,
  INP: 200,
  FCP: 2200,
  TTFB: 800,
  /** Clique/submit → resposta (ver interactionMetrics). */
  INTERACTION: 1000,
  /** Skeleton visível → conteúdo real. */
  LOADING: 2500,
} as const;

export type NomeBudget = keyof typeof BUDGETS;

/** Retorna o teto da métrica quando ela é governada por budget. */
export const budgetDe = (nome: string): number | null =>
  nome in BUDGETS ? BUDGETS[nome as NomeBudget] : null;

/** True quando o valor medido estoura o teto do CI. */
export const estourouBudget = (nome: string, valor: number): boolean => {
  const teto = budgetDe(nome);
  return teto !== null && valor > teto;
};

/** Formatação humana: CLS é adimensional, o resto é milissegundo. */
export const formatarMetrica = (nome: string, valor: number): string =>
  nome === "CLS" ? valor.toFixed(3) : `${Math.round(valor)}ms`;
