/**
 * ============================================================================
 * PROVAS REAIS DE BANCADA, UNIFORME E ATENDIMENTO — MANIFESTO FAIL-CLOSED
 * ============================================================================
 * Governança (Rodada 4G):
 *  • Só entra aqui fotografia REAL da nossa operação, capturada por nós.
 *  • PROIBIDO: banco de imagens, imagem gerada por IA, cenário montado.
 *  • PROIBIDO exibir endereço, CEP, fachada com numeração, placa de rua,
 *    dados pessoais, OS identificável, tela de cliente ou documento.
 *  • Modelo operacional é SERVICE AREA BUSINESS: nada de "loja aberta".
 *
 * Enquanto a lista estiver vazia, a seção NÃO é renderizada (fail-closed).
 * Basta adicionar os itens abaixo para a seção aparecer automaticamente.
 */

export type ProvaBancadaCategoria = "bancada" | "uniforme" | "atendimento" | "processo";

export interface ProvaBancadaFoto {
  /** URL pública da foto (asset do projeto ou CDN). */
  src: string;
  /** Texto alternativo factual — sem claim promocional. */
  alt: string;
  /** Legenda curta e factual. */
  legenda: string;
  categoria: ProvaBancadaCategoria;
  /** Data da captura (YYYY-MM). */
  capturadaEm: string;
  /** Confirmação de revisão de privacidade (sem PII / sem endereço). */
  privacidadeRevisada: boolean;
  width: number;
  height: number;
}

/**
 * MANIFESTO. Vazio = nenhuma prova real capturada até o momento.
 * Não preencher com ilustração de banco de imagens.
 */
export const PROVAS_BANCADA: ProvaBancadaFoto[] = [];

/** Só publica foto revisada quanto a privacidade. */
export const provasPublicaveis = (fotos: ProvaBancadaFoto[] = PROVAS_BANCADA) =>
  fotos.filter((f) => f.privacidadeRevisada && f.src.trim().length > 0);

/** Gate de renderização: mínimo de 3 fotos aprovadas para a seção existir. */
export const MIN_PROVAS_PARA_PUBLICAR = 3;

export const temProvasReais = (fotos: ProvaBancadaFoto[] = PROVAS_BANCADA) =>
  provasPublicaveis(fotos).length >= MIN_PROVAS_PARA_PUBLICAR;
