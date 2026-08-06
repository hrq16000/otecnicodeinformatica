// ─────────────────────────────────────────────────────────────
// CAPAS EDITORIAIS PRÓPRIAS — Rodada 4H (primeira onda indexável).
//
// Ativos gerados sob encomenda para a marca (uso próprio, sem terceiros,
// sem pessoas identificáveis, sem dados pessoais visíveis). Cada capa
// respeita o briefing correspondente em src/lib/blogEditorialImages.ts:
// 16:9, largura mínima 1200px e sem texto sobreposto.
//
// A presença de uma capa aqui NÃO aprova o artigo: a indexabilidade
// continua sendo decidida por APPROVED_EDITORIAL_CONTENT.
// ─────────────────────────────────────────────────────────────

export interface EditorialCover {
  /** Caminho servido a partir de /public. */
  src: string;
  alt: string;
  width: 1200;
  height: 630;
}

export const EDITORIAL_COVERS: Record<string, EditorialCover> = {
  "notebook-nao-liga-o-que-fazer": {
    src: "/blog/notebook-nao-liga-o-que-fazer.jpg",
    alt: "Notebook entreaberto sobre bancada clara com a tela desligada",
    width: 1200,
    height: 630,
  },
  "computador-lento-causas-solucoes": {
    src: "/blog/computador-lento-causas-solucoes.jpg",
    alt: "Monitor exibindo gráficos genéricos de uso de processador, memória e disco",
    width: 1200,
    height: 630,
  },
  "quando-trocar-hd-por-ssd": {
    src: "/blog/quando-trocar-hd-por-ssd.jpg",
    alt: "SSD e HD lado a lado sobre bancada técnica limpa com chave de fenda ao lado",
    width: 1200,
    height: 630,
  },
  "como-saber-se-pc-tem-virus-malware": {
    src: "/blog/como-saber-se-pc-tem-virus-malware.jpg",
    alt: "Notebook exibindo uma verificação de segurança genérica em andamento",
    width: 1200,
    height: 630,
  },
  "backup-como-proteger-seus-arquivos": {
    src: "/blog/backup-como-proteger-seus-arquivos.jpg",
    alt: "Disco externo de backup conectado a um notebook sobre mesa clara",
    width: 1200,
    height: 630,
  },
  "como-melhorar-sinal-wifi-em-casa": {
    src: "/blog/como-melhorar-sinal-wifi-em-casa.jpg",
    alt: "Roteador Wi-Fi branco posicionado em prateleira alta de uma sala iluminada",
    width: 1200,
    height: 630,
  },
  "notebook-superaquecendo-o-que-fazer": {
    src: "/blog/notebook-superaquecendo-o-que-fazer.jpg",
    alt: "Base de notebook sobre suporte ventilado em bancada técnica clara",
    width: 1200,
    height: 630,
  },
};

export function getEditorialCover(slug: string): EditorialCover | undefined {
  return EDITORIAL_COVERS[slug];
}
