/**
 * FOTOGRAFIA DAS PÁGINAS DE BAIRRO
 * ================================
 * Duas camadas, ambas com fotografia real (nenhuma imagem de IA):
 *
 * 1. GALERIA DE ATENDIMENTOS REAIS — fotos próprias, autorizadas, declaradas em
 *    `config/galeria-atendimentos-bairro.json`. Fail-closed: enquanto não houver
 *    material real do bairro, nada é renderizado. Nunca preenchemos essa galeria
 *    com banco de imagens.
 *
 * 2. FOTO TÉCNICA LICENCIADA — enquanto (1) está vazia, a página exibe uma
 *    fotografia Creative Commons do acervo já auditado (`fotosLicenciadas.ts`),
 *    escolhida pelo serviço prioritário do bairro e sempre com crédito visível.
 *    Ela ilustra o TIPO DE TRABALHO, nunca é apresentada como registro daquele
 *    atendimento específico.
 */
import galeriaManifesto from "../../config/galeria-atendimentos-bairro.json";
import { FOTOS_LICENCIADAS, type FotoLicenciada } from "@/lib/fotosLicenciadas";

export interface AtendimentoReal {
  bairroSlug: string;
  src: string;
  alt: string;
  legenda: string;
  /** AAAA-MM */
  data: string;
  autorizacao: "cliente" | "equipamento-proprio";
  width: number;
  height: number;
}

export const ATENDIMENTOS_REAIS = (galeriaManifesto.itens ?? []) as AtendimentoReal[];

export const galeriaDoBairro = (slug: string): AtendimentoReal[] =>
  ATENDIMENTOS_REAIS.filter((i) => i.bairroSlug === slug);

/** Dimensões intrínsecas do acervo licenciado (reserva de espaço → CLS 0). */
export const DIMENSOES_FOTO: Record<string, { width: number; height: number }> = {
  "bancada-tecnica": { width: 1024, height: 735 },
  "estacao-trabalho": { width: 1024, height: 765 },
  "infra-empresa": { width: 683, height: 1024 },
  "placa-eletronica": { width: 1024, height: 413 },
  "rede-cabeamento": { width: 683, height: 1024 },
  "roteador-wifi": { width: 1024, height: 683 },
};

/** Serviço prioritário do bairro → foto do acervo que representa aquele trabalho. */
const POR_SERVICO: Array<{ padrao: RegExp; foto: string }> = [
  { padrao: /redes-e-wifi|home-office/, foto: "roteador-wifi" },
  { padrao: /suporte-tecnico-empresarial|manutencao-preventiva-empresas|backup-para-empresas/, foto: "infra-empresa" },
  { padrao: /conserto-placa|conserto-tv|conserto-monitor/, foto: "placa-eletronica" },
  { padrao: /montagem-de-pc|pc-gamer|upgrade-ssd-ram/, foto: "estacao-trabalho" },
  { padrao: /manutencao-de-notebook|manutencao-de-computador|formatacao|remocao-de-virus|recuperacao-de-dados/, foto: "bancada-tecnica" },
];

export interface FotoDeBairro extends FotoLicenciada {
  width: number;
  height: number;
}

/**
 * Escolha determinística (mesmo bairro → mesma foto em todo build/SSR) a partir
 * dos serviços prioritários já declarados para aquele bairro.
 */
export function fotoTecnicaDoBairro(servicosPrioritarios: string[]): FotoDeBairro | null {
  let slugFoto: string | undefined;
  for (const servico of servicosPrioritarios) {
    const achou = POR_SERVICO.find((r) => r.padrao.test(servico));
    if (achou) {
      slugFoto = achou.foto;
      break;
    }
  }
  const foto = FOTOS_LICENCIADAS.find((f) => f.slug === (slugFoto ?? "bancada-tecnica"));
  if (!foto) return null;
  const dim = DIMENSOES_FOTO[foto.slug];
  if (!dim) return null;
  return { ...foto, ...dim };
}
