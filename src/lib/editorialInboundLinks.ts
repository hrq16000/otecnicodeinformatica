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
      slug: "quando-trocar-hd-por-ssd",
      label: "Quando vale trocar o HD por SSD",
      hint: "Critérios técnicos para decidir entre manter o disco atual ou migrar para SSD.",
    },
  ],
  "/servicos/remocao-de-virus": [
    {
      slug: "como-saber-se-pc-tem-virus-malware",
      label: "Como saber se o PC tem vírus ou malware",
      hint: "Sinais que ajudam a diferenciar infecção de problema de hardware ou de sistema.",
    },
  ],
  "/servicos/recuperacao-de-dados": [
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
  ],
  "/servicos/redes-e-wifi": [
    {
      slug: "como-melhorar-sinal-wifi-em-casa",
      label: "Como melhorar o sinal de Wi-Fi em casa",
      hint: "Ajustes de posicionamento e rede local antes de considerar troca de equipamento.",
    },
  ],
  "/servicos/manutencao-de-notebook": [
    {
      slug: "notebook-superaquecendo-o-que-fazer",
      label: "Notebook superaquecendo: o que fazer",
      hint: "Verificações de refrigeração e sinais que indicam limpeza interna.",
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
