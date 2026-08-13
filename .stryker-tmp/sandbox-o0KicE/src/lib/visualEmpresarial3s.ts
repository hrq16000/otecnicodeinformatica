// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// RODADA 3S — PADRÃO VISUAL PRÓPRIO DAS PÁGINAS EMPRESARIAIS
//
// Define a camada de apresentação B2B usada por:
//   • /empresa-de-ti-curitiba            (hub empresarial)
//   • /servicos/suporte-tecnico-empresarial (serviço empresarial)
//
// Regras do padrão (auditadas por scripts/check-visual-wave-3s.mjs):
//   1. Nada de template residencial no hero: contexto B2B explícito
//      (operação, estações, aprovação prévia) em vez de urgência doméstica.
//   2. Nada de elementos exclusivos do template de sintoma
//      (alerta de risco, "não insista", passo a passo invasivo).
//   3. CTA primário de conversão acima da dobra + um único CTA
//      secundário de contexto (link interno), sem multiplicar WhatsApp.
//   4. Sem promessa de prazo, garantia de resultado, exclusividade
//      ou conformidade regulatória.
//
// Esta camada é apenas apresentação: não cria rota, não altera H1,
// título, canônico, política comercial nem JSON-LD.
// ─────────────────────────────────────────────────────────────

/** Escopo fechado da Rodada 3S. */
export const VISUAL_3S_PATHS = [
  "/empresa-de-ti-curitiba",
  "/servicos/suporte-tecnico-empresarial",
] as const;

/** Slugs de serviço que recebem a variante empresarial do layout. */
export const VISUAL_3S_SERVICO_SLUGS = ["suporte-tecnico-empresarial"] as const;

export interface EmpresarialHeroCopy {
  /** Selo curto acima do H1 — contexto B2B, sem urgência residencial. */
  contexto: string;
  /** Linha objetiva abaixo dos CTAs (condições, não promessas). */
  condicoes: string;
  /** CTA primário (WhatsApp / triagem). */
  ctaPrimario: string;
  /** CTA secundário: link interno de contexto, nunca um segundo WhatsApp. */
  ctaSecundario: { label: string; to: string };
}

/** Copy do hero empresarial de serviço (usado pelo ServicoLandingLayout). */
export const EMPRESARIAL_SERVICO_HERO: EmpresarialHeroCopy = {
  contexto: "Atendimento para empresas • Curitiba e Região Metropolitana",
  condicoes:
    "Avulso ou recorrente • Escopo e valor informados antes da execução • Nota fiscal de serviço",
  ctaPrimario: "Falar sobre o suporte da empresa",
  ctaSecundario: {
    label: "Ver como organizamos a TI da empresa",
    to: "/empresa-de-ti-curitiba",
  },
};

/** Copy do hero do hub empresarial. */
export const EMPRESARIAL_HUB_HERO: EmpresarialHeroCopy = {
  contexto: "Estrutura de TI para pequenas empresas • Curitiba e região",
  condicoes:
    "Diagnóstico do ambiente antes de propor solução • Escopo aprovado por você • Atendimento remoto ou no local",
  ctaPrimario: "Conversar sobre a estrutura de TI",
  ctaSecundario: {
    label: "Ver o suporte técnico empresarial",
    to: "/servicos/suporte-tecnico-empresarial",
  },
};

/**
 * Cartões de contexto B2B exibidos logo abaixo do hero.
 * Reafirmam informação já publicada (modalidade, escopo, limites),
 * sem introduzir prazo, preço fechado ou promessa nova.
 */
export const EMPRESARIAL_CONTEXTO_CARDS: { titulo: string; texto: string }[] = [
  {
    titulo: "Quem decide",
    texto:
      "Falamos com quem responde pela operação. Alterações que afetam acesso, rede ou dados só acontecem com autorização registrada da empresa.",
  },
  {
    titulo: "O que entra no escopo",
    texto:
      "Camada de computador, rede e acesso: estações, cabeamento, Wi-Fi, impressoras, contas locais e rotinas de backup combinadas.",
  },
  {
    titulo: "O que fica com o fornecedor",
    texto:
      "O funcionamento interno de sistemas mantidos por terceiros (ERP, CRM, contábil, e-mail corporativo) é do fornecedor. Registramos a constatação por escrito.",
  },
];
