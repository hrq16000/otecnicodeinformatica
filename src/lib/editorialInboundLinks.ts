// ─────────────────────────────────────────────────────────────
// LINKS DE ENTRADA EDITORIAIS (Rodada 3G — Parte A1).
//
// Cada artigo aprovado precisa de, no mínimo, dois links internos
// contextuais: um vindo do hub /blog e um segundo vindo da página
// comercial mais relacionada.
//
// Fail-closed: a lista final é sempre filtrada por
// isEditorialApproved(). Artigo sem aprovação editorial válida
// (noindex) nunca aparece — mesmo que esteja mapeado aqui.
// Máximo de 3 artigos por página comercial.
// ─────────────────────────────────────────────────────────────

import { isEditorialApproved } from "@/lib/blogEditorialRegistry";

export interface EditorialInboundLink {
  slug: string;
  /** Texto do link — descritivo, sem promessa de resultado. */
  label: string;
  /** Frase curta de contexto, factual. */
  hint: string;
}

const MAX_POR_PAGINA = 3;

/** Página comercial → artigos aprovados semanticamente relacionados. */
const MAPA: Record<string, EditorialInboundLink[]> = {
  "/servicos/upgrade-ssd-ram": [
    {
      slug: "como-fazer-upgrade-ssd-nvme",
      label: "Upgrade para SSD NVMe: quando compensa",
      hint: "Como verificar compatibilidade e o que muda de fato no uso diário.",
    },
    {
      slug: "quando-trocar-hd-por-ssd",
      label: "Quando vale trocar o HD por SSD",
      hint: "Critérios técnicos para decidir entre manter o disco atual ou migrar para SSD.",
    },
    {
      slug: "como-escolher-uma-workstation",
      label: "Como escolher uma workstation profissional",
      hint: "Quando dimensionar uma máquina nova em vez de melhorar a atual.",
    },
  ],
  "/servicos/remocao-de-virus": [
    {
      slug: "como-saber-se-pc-tem-virus-malware",
      label: "Como saber se o PC tem vírus ou malware",
      hint: "Sinais que ajudam a diferenciar infecção de problema de hardware ou de sistema.",
    },
    {
      slug: "como-escolher-um-bom-antivirus",
      label: "Como escolher um antivírus",
      hint: "Critérios técnicos de escolha e como reconhecer falso antivírus.",
    },
    {
      slug: "como-proteger-computador-golpes-internet",
      label: "Como se proteger de golpes na internet",
      hint: "Padrões de phishing e falso suporte, e o que fazer nas primeiras horas.",
    },
  ],
  "/servicos/recuperacao-de-dados": [
    {
      slug: "como-recuperar-dados-hd-com-defeito",
      label: "Recuperação de dados de HD com defeito",
      hint: "Diferença entre falha lógica e mecânica e o que evitar nos primeiros minutos.",
    },
    {
      slug: "backup-como-proteger-seus-arquivos",
      label: "Backup: como proteger seus arquivos",
      hint: "Rotinas de cópia que reduzem a dependência de recuperação de dados.",
    },
  ],
  "/seguranca-dos-dados": [
    {
      slug: "backup-como-proteger-seus-arquivos",
      label: "Backup: como proteger seus arquivos",
      hint: "O que preparar antes de entregar o equipamento e como manter cópias próprias.",
    },
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "Acessos, responsáveis e limites de sistemas mantidos por terceiros.",
    },
  ],
  "/servicos/redes-e-wifi": [
    {
      slug: "como-configurar-roteador-wifi-iniciantes",
      label: "Como configurar um roteador Wi-Fi do zero",
      hint: "Ordem correta das etapas, faixas 2,4/5 GHz e os ajustes de segurança que importam.",
    },
    {
      slug: "como-saber-quem-esta-usando-meu-wifi",
      label: "Quem está usando o seu Wi-Fi",
      hint: "Como identificar dispositivos e retomar o controle da rede doméstica.",
    },
    {
      slug: "como-melhorar-sinal-wifi-em-casa",
      label: "Como melhorar o sinal de Wi-Fi em casa",
      hint: "Ajustes de posicionamento e rede local antes de considerar troca de equipamento.",
    },
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "Como mapear pontos de rede, energia e equipamentos críticos do escritório.",
    },
  ],
  "/empresa-de-ti-curitiba": [
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "Inventário, arquivos, acessos e rotina de manutenção antes de contratar suporte.",
    },
    {
      slug: "como-escolher-uma-workstation",
      label: "Como escolher uma workstation profissional",
      hint: "Levantamento de requisitos antes de definir peças de uma estação de trabalho.",
    },
  ],
  "/servicos/suporte-tecnico-empresarial": [
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "O que registrar e documentar antes de acionar suporte avulso ou recorrente.",
    },
  ],
  "/servicos/manutencao-preventiva-empresas": [
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "Calendário de verificações e prioridades para reduzir improvisos.",
    },
  ],
  "/servicos/backup-para-empresas": [
    {
      slug: "organizacao-de-ti-para-pequenos-escritorios",
      label: "Como organizar a informática de um pequeno escritório",
      hint: "Onde os arquivos moram, quem responde por eles e como testar a restauração.",
    },
  ],
  "/servicos/montagem-de-pc": [
    {
      slug: "como-escolher-uma-workstation",
      label: "Como escolher uma workstation profissional",
      hint: "Critérios de requisitos, componentes e limites antes de montar a estação.",
    },
  ],
  "/servicos/manutencao-de-notebook": [
    {
      slug: "notebook-superaquecendo-o-que-fazer",
      label: "Notebook superaquecendo: o que fazer",
      hint: "Verificações de refrigeração e sinais que indicam limpeza interna.",
    },
    {
      slug: "como-limpar-notebook-por-dentro",
      label: "Limpeza interna de notebook: o que muda de verdade",
      hint: "Como a poeira compactada derruba a refrigeração e o que a limpeza não resolve.",
    },
    {
      slug: "como-trocar-pasta-termica-notebook",
      label: "Troca de pasta térmica: quando faz sentido",
      hint: "Como separar interface térmica de obstrução antes de abrir o equipamento.",
    },
  ],
};

/** Artigos aprovados a exibir na página comercial informada. */
export function getEditorialInboundLinks(path: string): EditorialInboundLink[] {
  const clean = path.replace(/\/$/, "") || "/";
  const itens = MAPA[clean] ?? [];
  return itens.filter((i) => isEditorialApproved(i.slug)).slice(0, MAX_POR_PAGINA);
}

/** Páginas comerciais com link de entrada editorial configurado. */
export const EDITORIAL_INBOUND_PATHS = Object.keys(MAPA);
