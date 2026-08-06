// ─────────────────────────────────────────────────────────────
// RODADA 3T — PROPAGAÇÃO DO PADRÃO VISUAL EMPRESARIAL (3S)
//
// Estende a camada de apresentação B2B aprovada na Rodada 3S para
// três páginas de serviço, preservando a distinção de escopo de
// cada uma (o hero e os cartões de contexto são próprios por slug):
//
//   • /servicos/manutencao-preventiva-empresas  → rotina periódica
//   • /servicos/backup-para-empresas            → dados e restauração
//   • /servicos/redes-e-wifi                    → infraestrutura de rede
//
// Regras herdadas da 3S (auditadas por scripts/check-visual-wave-3t.mjs):
//   1. Sem template residencial no hero (nada de urgência doméstica).
//   2. Sem elementos exclusivos do template de sintoma.
//   3. Um CTA primário + um único CTA secundário de contexto (link interno).
//   4. Sem promessa de prazo, SLA, garantia de resultado ou conformidade.
//
// Camada de apresentação apenas: não cria rota, não altera H1, título,
// canônico, JSON-LD, conteúdo editorial nem política comercial.
// ─────────────────────────────────────────────────────────────

import type { EmpresarialHeroCopy } from "./visualEmpresarial3s";

/** Escopo fechado da Rodada 3T. */
export const VISUAL_3T_PATHS = [
  "/servicos/manutencao-preventiva-empresas",
  "/servicos/backup-para-empresas",
  "/servicos/redes-e-wifi",
] as const;

/** Slugs que recebem a variante empresarial nesta rodada. */
export const VISUAL_3T_SERVICO_SLUGS = [
  "manutencao-preventiva-empresas",
  "backup-para-empresas",
  "redes-e-wifi",
] as const;

export interface Visual3TConfig {
  hero: EmpresarialHeroCopy;
  /** Cartões de contexto abaixo do hero — reafirmam informação já publicada. */
  contexto: { titulo: string; texto: string }[];
}

export const VISUAL_3T: Record<string, Visual3TConfig> = {
  "manutencao-preventiva-empresas": {
    hero: {
      contexto: "Rotina preventiva para empresas • Curitiba e Região Metropolitana",
      condicoes:
        "Periodicidade combinada • Itens acompanhados definidos no escopo • Valor informado antes da execução",
      ctaPrimario: "Falar sobre a rotina preventiva",
      ctaSecundario: {
        label: "Ver o suporte técnico empresarial",
        to: "/servicos/suporte-tecnico-empresarial",
      },
    },
    contexto: [
      {
        titulo: "O que a rotina cobre",
        texto:
          "Revisão periódica de estações, limpeza interna, checagem de armazenamento, atualizações e verificação das rotinas de backup já existentes.",
      },
      {
        titulo: "Como o escopo é fechado",
        texto:
          "Levantamos os equipamentos em uso e definimos junto com a empresa quais entram na rotina e com que periodicidade. Nada é executado sem aprovação.",
      },
      {
        titulo: "O que fica fora",
        texto:
          "Preventiva não substitui reparo de falha em curso nem manutenção de sistemas de terceiros (ERP, contábil, e-mail corporativo), que seguem com o fornecedor.",
      },
    ],
  },
  "backup-para-empresas": {
    hero: {
      contexto: "Rotinas de backup para empresas • Curitiba e Região Metropolitana",
      condicoes:
        "Estruturação e verificação de cópias • Acesso mínimo autorizado pela empresa • Valor informado antes da execução",
      ctaPrimario: "Falar sobre o backup da empresa",
      ctaSecundario: {
        label: "Ver como organizamos a TI da empresa",
        to: "/empresa-de-ti-curitiba",
      },
    },
    contexto: [
      {
        titulo: "O que entra no escopo",
        texto:
          "Mapeamento do que precisa ser copiado, definição de destino das cópias, agendamento das rotinas e teste de restauração dos arquivos combinados.",
      },
      {
        titulo: "Acessos e credenciais",
        texto:
          "Trabalhamos com o acesso mínimo necessário, sempre autorizado por quem responde pela empresa. Credenciais permanecem sob controle do cliente.",
      },
      {
        titulo: "Limites de sistemas de terceiros",
        texto:
          "Backup interno de plataformas mantidas por fornecedores (ERP, CRM, e-mail em nuvem) depende do recurso que o próprio fornecedor oferece. Registramos por escrito o que não é possível copiar.",
      },
    ],
  },
  "redes-e-wifi": {
    hero: {
      contexto: "Infraestrutura de rede e Wi-Fi • Curitiba e Região Metropolitana",
      condicoes:
        "Avaliação do ambiente antes de propor solução • Escopo aprovado por você • Atendimento no local",
      ctaPrimario: "Falar sobre a rede do local",
      ctaSecundario: {
        label: "Ver o suporte técnico empresarial",
        to: "/servicos/suporte-tecnico-empresarial",
      },
    },
    contexto: [
      {
        titulo: "O que avaliamos",
        texto:
          "Cobertura do sinal por ambiente, posicionamento dos equipamentos, cabeamento existente, interferência e comportamento da rede em horário de maior uso.",
      },
      {
        titulo: "Onde termina o nosso escopo",
        texto:
          "Cuidamos da rede interna: roteadores, pontos de acesso, cabeamento e dispositivos conectados. O link contratado e o equipamento do provedor seguem com a operadora.",
      },
      {
        titulo: "Como a solução é definida",
        texto:
          "Primeiro medimos, depois propomos. Troca de equipamento ou novo cabeamento só entra no escopo depois que a causa é identificada e o valor é aprovado.",
      },
    ],
  },
};

/** Retorna a configuração 3T do slug, se estiver no escopo. */
export const visual3T = (slug: string): Visual3TConfig | undefined => VISUAL_3T[slug];
