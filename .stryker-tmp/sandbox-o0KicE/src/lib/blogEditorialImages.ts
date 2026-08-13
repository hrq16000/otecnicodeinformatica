// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// BRIEFING DE IMAGENS EDITORIAIS — PROMPT 32 (+ enriquecimento
// framing/iluminação, PROMPT 35).
//
// Especificação tipada dos oito ativos visuais futuros. NÃO gera,
// baixa nem substitui imagens. NÃO altera imageOrigin (segue "unknown"
// em blogEditorialRegistry.ts). Estado inicial de todo brief: "briefed".
//
// Cada brief agora descreve explicitamente:
//   - subject   : o assunto central
//   - scene     : narrativa do que aparece
//   - framing   : enquadramento fotográfico (distância/ângulo/composição)
//   - lighting  : iluminação recomendada
//   - requiredElements / forbiddenElements / privacyRisks
//
// Requisitos de privacidade e propriedade estão descritos por brief e
// refinformados por REQUIRED_ASSET_SPEC (aplicável a qualquer captura futura).
// ─────────────────────────────────────────────────────────────

export type ImageBriefStatus = "briefed" | "captured" | "approved";

export interface EditorialImageBrief {
  slug: string;
  subject: string;
  /** Descrição narrativa do que aparece na cena. */
  scene: string;
  /** Enquadramento fotográfico: distância, ângulo e composição. */
  framing: string;
  /** Iluminação recomendada (temperatura de cor, direção, contraste). */
  lighting: string;
  requiredElements: string[];
  forbiddenElements: string[];
  privacyRisks: string[];
  aspectRatio: "16:9";
  minimumWidth: 1200;
  textOverlay: false;
  status: ImageBriefStatus;
}

// Requisitos obrigatórios de qualquer ativo futuro (não altera nada agora).
export const REQUIRED_ASSET_SPEC = {
  aspectRatio: "16:9" as const,
  minimumWidth: 1200,
  textOverlay: false,
  requires: [
    "origem confirmada (propriedade ou licença)",
    "versão otimizada com dimensões declaradas",
    "alt próprio e legenda quando útil",
    "ausência de dados pessoais",
    "EXIF removido quando necessário",
    "aprovação editorial registrada antes de indexação",
  ],
} as const;

export const EDITORIAL_IMAGE_BRIEFS: Record<string, EditorialImageBrief> = {
  "notebook-nao-liga-o-que-fazer": {
    slug: "notebook-nao-liga-o-que-fazer",
    subject: "Notebook que não liga",
    scene:
      "Notebook real fechado ou entreaberto em bancada limpa, foco no botão de energia e no LED de status; tela sem imagem.",
    framing:
      "Plano médio-fechado a ~45° de cima, terço superior enquadra o botão de energia; fundo desfocado sem elementos concorrentes.",
    lighting:
      "Luz suave difusa vinda da esquerda superior (5000-5500K), leve preenchimento à direita para evitar sombras duras; sem reflexos na tela.",
    requiredElements: ["notebook real", "botão de energia ou LED", "tela sem imagem"],
    forbiddenElements: ["desktop como foco principal", "procedimento perigoso", "ferramenta improvisada"],
    privacyRisks: ["número de série", "etiqueta de identificação", "dados do usuário visíveis"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "computador-lento-causas-solucoes": {
    slug: "computador-lento-causas-solucoes",
    subject: "Computador lento",
    scene:
      "Computador em uso com monitor de recursos (CPU/RAM/Disco) genérico aberto na tela; ambiente neutro tipo home-office.",
    framing:
      "Plano ombro-monitor, câmera ligeiramente acima da linha do olho do usuário; monitor ocupa 60% do quadro, mão descansada no mouse compõe o primeiro plano desfocado.",
    lighting:
      "Ambiente claro e neutro (~4500K), sem contraluz atrás do monitor; ganho na tela ajustado para não estourar branco no monitor de recursos.",
    requiredElements: ["monitor de recursos ou computador em uso"],
    forbiddenElements: ["velocímetro artificial", "promessa de percentual"],
    privacyRisks: ["nomes de usuário", "nomes de arquivos", "aplicativos pessoais identificáveis"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "como-instalar-windows-11-do-zero": {
    slug: "como-instalar-windows-11-do-zero",
    subject: "Instalação/recuperação do Windows 11",
    scene:
      "Pendrive de mídia de instalação conectado à lateral de um notebook, em mesa clara e ambiente neutro.",
    framing:
      "Closeup lateral do notebook com o pendrive em evidência; margem generosa para respiro editorial.",
    lighting:
      "Luz natural difusa, sem reflexos duros e sem sombras marcadas sobre o teclado.",
    requiredElements: ["mídia de instalação conectada ao equipamento"],
    forbiddenElements: ["ativador", "software não oficial", "método de bypass"],
    privacyRisks: ["chave de produto", "e-mail", "nome de conta", "identificadores de máquina"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "quando-trocar-hd-por-ssd": {
    slug: "quando-trocar-hd-por-ssd",
    subject: "Troca de HD por SSD",
    scene:
      "Um SSD 2,5\"/M.2 e um HD 2,5\"/3,5\" lado a lado em bancada técnica limpa; opcional: parafusadeira Phillips fora de foco no canto.",
    framing:
      "Top-down (flat lay) simétrico, HD e SSD em diagonal ocupando a linha central; regra dos terços aplicada, respiro à direita para chamada editorial.",
    lighting:
      "Luz cenital suave em softbox (~5000K), com reflexo controlado nos rótulos para que nenhuma marca se torne o herói da imagem.",
    requiredElements: ["SSD e HD em bancada limpa"],
    forbiddenElements: ["marca como recomendação implícita", "promessa de desempenho"],
    privacyRisks: ["números de série", "dados de cliente"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "notebook-superaquecendo-o-que-fazer": {
    slug: "notebook-superaquecendo-o-que-fazer",
    subject: "Notebook superaquecendo",
    scene:
      "Saída de ar/ventoinha lateral de notebook, com sinais visíveis de poeira acumulada; ambiente neutro (bancada clara).",
    framing:
      "Macro/close a 30°, foco seletivo na saída de ar (f/4-5.6), corte deixando parte do teclado desfocado ao fundo; sem mãos ou ferramentas em uso.",
    lighting:
      "Luz lateral rasante (~4500K) para revelar textura da poeira sem gerar sombras dramatizadas; fundo levemente esmaecido.",
    requiredElements: ["saída de ar", "ventoinha", "poeira"],
    forbiddenElements: ["procedimento perigoso", "chama", "secador", "ferramenta improvisada"],
    privacyRisks: ["etiqueta legível", "número de série"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "backup-como-proteger-seus-arquivos": {
    slug: "backup-como-proteger-seus-arquivos",
    subject: "Backup preventivo",
    scene:
      "Armazenamento externo (HD/SSD portátil ou pen drive) sobre a mesa, ao lado de tela mostrando interface de nuvem genérica (sem marca dominante).",
    framing:
      "Plano de 3/4 com HD/SSD em primeiro plano nítido e monitor levemente desfocado ao fundo; profundidade de campo cria hierarquia dispositivo → nuvem.",
    lighting:
      "Luz suave frontal-superior (~5000K), leve backlight para separar o dispositivo do fundo; nada de highlight forte na tela.",
    requiredElements: ["armazenamento externo", "interface de nuvem genérica"],
    forbiddenElements: ["marcas identificáveis", "contas identificáveis"],
    privacyRisks: ["nomes de arquivos", "e-mail/conta em tela"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "como-saber-se-pc-tem-virus-malware": {
    slug: "como-saber-se-pc-tem-virus-malware",
    subject: "Sinais de vírus/malware e golpes",
    scene:
      "Alerta de golpe SIMULADO (fake, criado para o artigo) ou interface genérica de central de segurança do SO em tela; ambiente neutro.",
    framing:
      "Plano frontal do monitor ocupando ~70% do quadro; leve inclinação da câmera (~5°) evita paralelismo perfeito; margem inferior para chamada.",
    lighting:
      "Ambiente com luz neutra baixa (~4000K) para valorizar o alerta na tela sem estourar; sem reflexo no monitor.",
    requiredElements: ["alerta de golpe simulado ou interface genérica de segurança"],
    forbiddenElements: [
      "malware real reproduzido",
      "telefone de golpe legível",
      "URL maliciosa ativa",
      "logo de antivírus específico como herói",
    ],
    privacyRisks: ["dados pessoais em tela", "telefone", "URL maliciosa"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "como-melhorar-sinal-wifi-em-casa": {
    slug: "como-melhorar-sinal-wifi-em-casa",
    subject: "Wi-Fi residencial",
    scene:
      "Roteador moderno em ambiente residencial neutro, posicionado em local alto/central (estante ou console), sem obstruções próximas.",
    framing:
      "Plano médio a ~30°, câmera na altura do roteador; regra dos terços com o roteador à esquerda e ambiente respirando à direita para respiro editorial.",
    lighting:
      "Luz ambiente residencial quente (~3000-3500K) suavizada; LEDs do roteador visíveis mas não estourados; sem contraluz de janela.",
    requiredElements: ["roteador em ambiente residencial"],
    forbiddenElements: ["etiqueta traseira legível", "alteração insegura de firmware"],
    privacyRisks: ["SSID", "senha", "endereço MAC", "QR code de acesso"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
};

export function getImageBrief(slug: string): EditorialImageBrief | undefined {
  return EDITORIAL_IMAGE_BRIEFS[slug];
}

export default EDITORIAL_IMAGE_BRIEFS;
