/**
 * Fotos reais (fotografia licenciada, nunca imagem gerada por IA) associadas
 * a cada página de serviço. Fonte única para evitar páginas sem imagem.
 * As chaves apontam para src/lib/images.ts.
 */
import type { ImageKey } from "@/components/RealImageSection";

export interface ServicoImagens {
  primary: ImageKey;
  secondary?: ImageKey;
  caption?: string;
  secondaryCaption?: string;
}

const MAPA: Record<string, ServicoImagens> = {
  formatacao: {
    primary: "tecnicoTrabalhando",
    secondary: "bancadaTecnica",
    caption: "Reinstalação de sistema com backup prévio dos arquivos.",
    secondaryCaption: "Bancada usada para preparação e testes após a instalação.",
  },
  "manutencao-de-notebook": {
    primary: "notebookReparo",
    secondary: "ferramentas",
    caption: "Notebook aberto para limpeza interna e revisão térmica.",
    secondaryCaption: "Ferramental usado na desmontagem e remontagem.",
  },
  "manutencao-de-computador": {
    primary: "desktopMontado",
    secondary: "bancadaTecnica",
    caption: "Desktop revisado após limpeza e testes de estabilidade.",
    secondaryCaption: "Bancada de avaliação com instrumentos de medição.",
  },
  "upgrade-ssd-ram": {
    primary: "componentesSsd",
    secondary: "ferramentas",
    caption: "Unidades de armazenamento usadas em upgrades.",
    secondaryCaption: "Instrumental para troca de componentes internos.",
  },
  "remocao-de-virus": {
    primary: "segurancaDigital",
    secondary: "suporteRemoto",
    caption: "Higienização do sistema e revisão de proteção.",
    secondaryCaption: "Verificação de comportamento após a limpeza.",
  },
  "recuperacao-de-dados": {
    primary: "componentesSsd",
    secondary: "bancadaTecnica",
    caption: "Discos e SSDs avaliados antes de qualquer tentativa de leitura.",
    secondaryCaption: "Trabalho conduzido em bancada, sobre cópia quando possível.",
  },
  "redes-e-wifi": {
    primary: "redesWifi",
    secondary: "servidores",
    caption: "Cabeamento e equipamentos de rede organizados em rack.",
    secondaryCaption: "Infraestrutura de rede em ambiente com vários usuários.",
  },
  "suporte-tecnico-empresarial": {
    primary: "servidores",
    secondary: "tecnicoTrabalhando",
    caption: "Infraestrutura corporativa acompanhada de forma recorrente.",
    secondaryCaption: "Atendimento técnico em estação de trabalho.",
  },
  "manutencao-preventiva-empresas": {
    primary: "bancadaTecnica",
    secondary: "ferramentas",
    caption: "Rotina de revisão preventiva executada em bancada.",
    secondaryCaption: "Instrumental utilizado nas revisões programadas.",
  },
  "backup-para-empresas": {
    primary: "servidores",
    secondary: "componentesSsd",
    caption: "Armazenamento usado nas rotinas de cópia corporativa.",
    secondaryCaption: "Mídias verificadas periodicamente para restauração.",
  },
  "suporte-home-office": {
    primary: "suporteRemoto",
    secondary: "atendimentoDomiciliar",
    caption: "Suporte remoto para quem trabalha de casa.",
    secondaryCaption: "Atendimento presencial quando o caso exige.",
  },
  "montagem-de-pc": {
    primary: "desktopMontado",
    secondary: "ferramentas",
    caption: "Máquina montada e testada antes da entrega.",
    secondaryCaption: "Ferramental usado na montagem e no cable management.",
  },
  "conserto-tv": {
    primary: "smartTv",
    secondary: "estacaoSolda",
    caption: "Televisor avaliado em bancada, com o aparelho aberto.",
    secondaryCaption: "Estação de solda usada no reparo em nível de componente.",
  },
  "conserto-placa": {
    primary: "microsoldagem",
    secondary: "microscopio",
    caption: "Placa em análise para reparo em nível de componente.",
    secondaryCaption: "Ampliação óptica usada na microsoldagem.",
  },
};

export function imagensParaServico(trackingKey: string): ServicoImagens | undefined {
  return MAPA[trackingKey];
}

export const SERVICO_IMAGENS = MAPA;
