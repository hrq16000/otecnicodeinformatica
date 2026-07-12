// ─────────────────────────────────────────────────────────────
// BRIEFING DE IMAGENS EDITORIAIS — PROMPT 32.
//
// Especificação tipada dos oito ativos visuais futuros. NÃO gera,
// baixa nem substitui imagens. NÃO altera imageOrigin (segue "unknown"
// em blogEditorialRegistry.ts). Estado inicial de todo brief: "briefed".
//
// Requisitos de privacidade e propriedade estão descritos por brief e
// reforçados por REQUIRED_ASSET_SPEC (aplicável a qualquer captura futura).
// ─────────────────────────────────────────────────────────────

export type ImageBriefStatus = "briefed" | "captured" | "approved";

export interface EditorialImageBrief {
  slug: string;
  subject: string;
  scene: string;
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
    scene: "Notebook real fechado/entreaberto em bancada limpa, foco no botão de energia e no LED de status; tela sem imagem.",
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
    scene: "Computador em uso com monitor de recursos genérico aberto, ambiente neutro.",
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
    scene: "Tela oficial de instalação ou recuperação do Windows em um notebook, ambiente neutro.",
    requiredElements: ["tela oficial de instalação ou recuperação"],
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
    scene: "SSD e HD lado a lado em bancada técnica limpa, sem destaque de marca específica.",
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
    scene: "Saída de ar/ventoinha de notebook, com sinais de poeira acumulada; ambiente neutro.",
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
    scene: "Armazenamento externo (HD/SSD ou pen drive) ao lado de interface de nuvem genérica em tela.",
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
    scene: "Alerta de golpe simulado ou interface de segurança genérica em tela; ambiente neutro.",
    requiredElements: ["alerta de golpe simulado ou interface genérica de segurança"],
    forbiddenElements: ["malware real reproduzido", "telefone de golpe legível", "URL maliciosa ativa"],
    privacyRisks: ["dados pessoais em tela", "telefone", "URL maliciosa"],
    aspectRatio: "16:9",
    minimumWidth: 1200,
    textOverlay: false,
    status: "briefed",
  },
  "como-melhorar-sinal-wifi-em-casa": {
    slug: "como-melhorar-sinal-wifi-em-casa",
    subject: "Wi-Fi residencial",
    scene: "Roteador moderno em ambiente residencial neutro, posicionado em local alto/central.",
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
