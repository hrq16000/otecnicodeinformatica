/**
 * Estrutura declarativa do funil ramificado por tipo de equipamento.
 * Cada equipamento tem perguntas múltipla-escolha e marca sintomas
 * que exigem Coleta e Entrega (`requiresColeta = true`).
 */
// @ts-nocheck


export type Equipment =
  | "pc"
  | "tv"
  | "monitor"
  | "celular"
  | "som"
  | "videogame"
  | "outro";

export interface SintomaOption {
  id: string;
  label: string;
  /** se true, força a modalidade Coleta e Entrega + R$ 300 mínimo */
  requiresColeta?: boolean;
  /** se true, exige upload de vídeo (não apenas foto) */
  requiresVideo?: boolean;
}

export interface EquipmentBranch {
  id: Equipment;
  label: string;
  emoji: string;
  /** Primeira pergunta: marca/tipo */
  marcaLabel: string;
  marcaOptions: string[];
  /** Segunda pergunta: sintoma */
  sintomas: SintomaOption[];
}

export const EQUIPMENT_BRANCHES: EquipmentBranch[] = [
  {
    id: "pc",
    label: "PC / Notebook",
    emoji: "💻",
    marcaLabel: "Qual a marca/tipo?",
    marcaOptions: ["Dell", "Lenovo", "HP", "Acer", "Asus", "Samsung", "Apple (Mac)", "Desktop montado", "Outra"],
    sintomas: [
      { id: "nao-liga", label: "Não liga / sem imagem", requiresColeta: true, requiresVideo: true },
      { id: "desliga-sozinho", label: "Desliga sozinho / superaquece", requiresColeta: true, requiresVideo: true },
      { id: "tela-quebrada", label: "Tela quebrada / com manchas", requiresColeta: true, requiresVideo: true },
      { id: "molhou", label: "Molhou / caiu líquido", requiresColeta: true },
      { id: "lento", label: "Lento / travando" },
      { id: "virus", label: "Vírus / lentidão suspeita" },
      { id: "wifi", label: "Sem Wi-Fi / internet" },
      { id: "outro", label: "Outro problema" },
    ],
  },
  {
    id: "tv",
    label: "TV",
    emoji: "📺",
    marcaLabel: "Marca e tamanho",
    marcaOptions: ["Samsung", "LG", "Sony", "TCL", "Philco", "AOC", "Philips", "Toshiba", "Outra"],
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true },
      { id: "liga-desliga", label: "Liga e desliga sozinha", requiresColeta: true, requiresVideo: true },
      { id: "tela-quebrada", label: "Tela quebrada / trincada", requiresColeta: true, requiresVideo: true },
      { id: "sem-imagem", label: "Sem imagem (só som)", requiresColeta: true, requiresVideo: true },
      { id: "sem-som", label: "Sem som (imagem normal)", requiresColeta: true, requiresVideo: true },
      { id: "linhas-manchas", label: "Linhas / manchas na tela", requiresColeta: true, requiresVideo: true },
      { id: "hdmi", label: "Não reconhece HDMI / cabo", requiresColeta: true },
    ],
  },
  {
    id: "monitor",
    label: "Monitor",
    emoji: "🖥️",
    marcaLabel: "Marca e polegadas",
    marcaOptions: ["Dell", "LG", "Samsung", "AOC", "Acer", "Asus", "Philips", "Ultrawide / curvo", "Outra"],
    sintomas: [
      { id: "nao-liga", label: "Não liga (nenhum LED acende)", requiresColeta: true, requiresVideo: true },
      { id: "led-sem-imagem", label: "LED acende, mas a tela fica preta", requiresColeta: true, requiresVideo: true },
      { id: "backlight", label: "Imagem só aparece com lanterna (tela escura)", requiresColeta: true, requiresVideo: true },
      { id: "piscando", label: "Tela piscando / apaga e volta", requiresColeta: true, requiresVideo: true },
      { id: "desliga-sozinho", label: "Desliga sozinho depois de alguns minutos", requiresColeta: true, requiresVideo: true },
      { id: "sem-sinal", label: "Não reconhece HDMI / DisplayPort", requiresColeta: true },
      { id: "fonte-externa", label: "Suspeita da fonte externa (tijolinho)", requiresColeta: true },
      { id: "painel-danificado", label: "Tela trincada / mancha de pressão", requiresColeta: true, requiresVideo: true },
    ],
  },
  {
    id: "celular",
    label: "Celular / Tablet",
    emoji: "📱",
    marcaLabel: "Marca",
    marcaOptions: ["iPhone (Apple)", "Samsung", "Motorola", "Xiaomi", "LG", "Outra"],
    sintomas: [
      { id: "tela-trincada", label: "Tela trincada / quebrada", requiresColeta: true, requiresVideo: true },
      { id: "nao-carrega", label: "Não carrega / não liga", requiresColeta: true, requiresVideo: true },
      { id: "molhou", label: "Molhou", requiresColeta: true },
      { id: "sem-som", label: "Sem som / alto-falante", requiresColeta: true, requiresVideo: true },
      { id: "lento", label: "Lento / travando" },
      { id: "bateria", label: "Bateria acaba rápido", requiresColeta: true },
    ],
  },
  {
    id: "som",
    label: "Som / Áudio",
    emoji: "🔊",
    marcaLabel: "Tipo / marca",
    marcaOptions: ["Caixa Bluetooth (JBL, etc.)", "Soundbar", "Home-theater", "Mini system", "Receiver", "Outro"],
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true },
      { id: "sem-som", label: "Não emite som", requiresColeta: true, requiresVideo: true },
      { id: "chiado", label: "Chiado / ruído estranho", requiresColeta: true, requiresVideo: true },
      { id: "bluetooth", label: "Bluetooth não conecta" },
      { id: "molhou", label: "Molhou", requiresColeta: true },
    ],
  },
  {
    id: "videogame",
    label: "Videogame",
    emoji: "🎮",
    marcaLabel: "Console",
    marcaOptions: ["PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "Nintendo Switch", "PS3 / Xbox 360", "Outro"],
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true },
      { id: "desliga-sozinho", label: "Desliga / superaquece", requiresColeta: true, requiresVideo: true },
      { id: "nao-le-disco", label: "Não lê disco", requiresColeta: true, requiresVideo: true },
      { id: "hdmi", label: "Sem imagem / HDMI queimado", requiresColeta: true, requiresVideo: true },
      { id: "drift", label: "Drift / controle solto" },
      { id: "outro", label: "Outro problema" },
    ],
  },
  {
    id: "outro",
    label: "Outro / Só o valor",
    emoji: "💬",
    marcaLabel: "Conte sobre o equipamento",
    marcaOptions: [],
    sintomas: [],
  },
];

export function getBranch(id: Equipment): EquipmentBranch | undefined {
  return EQUIPMENT_BRANCHES.find((b) => b.id === id);
}

export function getSintoma(equipId: Equipment, sintomaId: string): SintomaOption | undefined {
  return getBranch(equipId)?.sintomas.find((s) => s.id === sintomaId);
}
