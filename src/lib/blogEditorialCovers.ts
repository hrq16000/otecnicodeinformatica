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
  "como-configurar-roteador-wifi-iniciantes": {
    src: "/blog/como-configurar-roteador-wifi-iniciantes.jpg",
    alt: "Roteador Wi-Fi doméstico com antenas externas sobre superfície clara",
    width: 1200,
    height: 630,
  },
  "como-saber-quem-esta-usando-meu-wifi": {
    src: "/blog/como-saber-quem-esta-usando-meu-wifi.jpg",
    alt: "Roteador de rede doméstica em uso, com indicadores luminosos acesos",
    width: 1200,
    height: 630,
  },
  "como-recuperar-dados-hd-com-defeito": {
    src: "/blog/como-recuperar-dados-hd-com-defeito.jpg",
    alt: "Disco rígido de notebook de 2,5 polegadas fora do equipamento, sobre superfície clara",
    width: 1200,
    height: 630,
  },
  "como-fazer-upgrade-ssd-nvme": {
    src: "/blog/como-fazer-upgrade-ssd-nvme.jpg",
    alt: "SSD NVMe no formato M.2 ao lado de um SSD M.2 SATA para comparação de tamanho",
    width: 1200,
    height: 630,
  },
  "como-instalar-windows-11-do-zero": {
    src: "/blog/como-instalar-windows-11-do-zero.jpg",
    alt: "Pendrive com mídia de instalação conectado à lateral de um notebook sobre mesa clara",
    width: 1200,
    height: 630,
  },
  "notebook-nao-liga-o-que-fazer": {
    src: "/blog/notebook-nao-liga-o-que-fazer.jpg",
    alt: "Placa-mãe de notebook com a bateria CMOS e seu par de fios conectados à placa",
    width: 1200,
    height: 630,
  },
  "computador-lento-causas-solucoes": {
    src: "/blog/computador-lento-causas-solucoes.jpg",
    alt: "Braço atuador e cabeça de leitura removidos de um disco rígido mecânico sobre fundo claro",
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
  "organizacao-de-ti-para-pequenos-escritorios": {
    src: "/blog/organizacao-de-ti-para-pequenos-escritorios.jpg",
    alt: "Estações de trabalho, impressora e equipamento de rede organizados em escritório pequeno",
    width: 1200,
    height: 630,
  },
  "como-escolher-uma-workstation": {
    src: "/blog/como-escolher-uma-workstation.jpg",
    alt: "Gabinete de estação de trabalho aberto sobre bancada técnica neutra",
    width: 1200,
    height: 630,
  },
  // ── Onda 4Y — capas fotográficas reais licenciadas (sem IA).
  "como-resolver-tela-azul-windows": {
    src: "/blog/como-resolver-tela-azul-windows.jpg",
    alt: "Notebook exibindo a tela azul do Windows com código de parada e QR code de diagnóstico",
    width: 1200,
    height: 630,
  },
  "como-trocar-tela-notebook-passo-a-passo": {
    src: "/blog/como-trocar-tela-notebook-passo-a-passo.jpg",
    alt: "Notebook aberto na bancada com a tampa inferior removida, placa, bateria e chaves de precisão ao lado",
    width: 1200,
    height: 630,
  },
};

export function getEditorialCover(slug: string): EditorialCover | undefined {
  return EDITORIAL_COVERS[slug];
}
