/**
 * REDESIGN — arquitetura da Home orientada a PROBLEMAS.
 *
 * Fonte única dos dados da primeira dobra e da faixa de contextos. A Home
 * deixou de ser "hero + grade de serviços": ela começa pelo sintoma que o
 * visitante consegue descrever com as próprias palavras e só depois oferece
 * o caminho técnico correspondente.
 *
 * Regra de negócio: informática domina visualmente. As demais verticais
 * (eletrônicos, instalações, outros reparos) existem em faixa secundária e
 * nunca competem com o núcleo da marca.
 *
 * Todas as rotas apontadas aqui já existem no portal — nenhuma URL nova é
 * inventada e nenhuma rota atual é removida.
 */

export type CaminhoEntrada = {
  id: string;
  titulo: string;
  descricao: string;
  cta: string;
  href: string;
};

/** ETAPA 1 — quatro caminhos de entrada, cada um com CTA próprio. */
export const CAMINHOS_ENTRADA: CaminhoEntrada[] = [
  {
    id: "problema",
    titulo: "Resolver um problema",
    descricao: "Você descreve o sintoma; a gente identifica a causa.",
    cta: "Diagnosticar meu problema",
    href: "/diagnostico-tecnico",
  },
  {
    id: "servico",
    titulo: "Encontrar um serviço",
    descricao: "Escopo, prazo e limites de cada reparo, escritos por extenso.",
    cta: "Ver possíveis soluções",
    href: "/servicos",
  },
  {
    id: "empresa",
    titulo: "Atendimento para empresa",
    descricao: "Estação parada, rede instável ou time sem conseguir trabalhar.",
    cta: "Solicitar atendimento empresarial",
    href: "/servicos/suporte-tecnico-empresarial",
  },
  {
    id: "profissional",
    titulo: "Falar com quem executa",
    descricao: "A triagem é feita pelo próprio técnico responsável pelo caso.",
    cta: "Pedir ajuda técnica",
    href: "/atendimento",
  },
];

export type Sintoma = {
  /** Texto em linguagem comum, como o cliente descreveria. */
  label: string;
  /** Termos extras para casar com o que a pessoa digita. */
  termos: string[];
  /** Rota da página que responde a essa intenção. */
  href: string;
};

/**
 * ETAPA 2 — sugestões do campo "O que está acontecendo?".
 * Ordenadas por frequência real de demanda no atendimento.
 */
export const SINTOMAS: Sintoma[] = [
  {
    label: "Meu computador está muito lento",
    termos: ["lento", "lentidao", "travando", "demora", "engasga"],
    href: "/problemas/computador-lento",
  },
  {
    label: "Notebook não liga",
    termos: ["nao liga", "sem reacao", "morto", "nao acende", "notebook"],
    href: "/problemas/notebook-nao-liga",
  },
  {
    label: "Esquenta e desliga sozinho",
    termos: ["esquenta", "quente", "superaquecimento", "desliga", "ventoinha"],
    href: "/servicos/manutencao-de-notebook",
  },
  {
    label: "Tela azul e erros do Windows",
    termos: ["tela azul", "bsod", "windows", "erro", "reinicia"],
    href: "/servicos/formatacao",
  },
  {
    label: "O Wi-Fi está ruim",
    termos: ["wifi", "wi-fi", "internet", "rede", "sinal", "roteador"],
    href: "/servicos/redes-e-wifi",
  },
  {
    label: "Preciso recuperar arquivos",
    termos: ["arquivos", "dados", "apagado", "perdi", "hd", "backup"],
    href: "/servicos/recuperacao-de-dados",
  },
  {
    label: "Acho que peguei vírus",
    termos: ["virus", "malware", "propaganda", "anuncio", "sequestro"],
    href: "/servicos/remocao-de-virus",
  },
  {
    label: "Minha empresa está sem sistema",
    termos: ["empresa", "sistema", "estacao", "trabalho", "escritorio", "urgente"],
    href: "/servicos/suporte-tecnico-empresarial",
  },
  {
    label: "Quero mais desempenho (SSD ou memória)",
    termos: ["ssd", "memoria", "ram", "upgrade", "desempenho", "rapido"],
    href: "/servicos/upgrade-ssd-ram",
  },
  {
    label: "Não sei qual é o problema",
    termos: ["nao sei", "duvida", "estranho", "diagnostico"],
    href: "/diagnostico-tecnico",
  },
];

export type Contexto = {
  id: string;
  titulo: string;
  /** Rótulo curto de categoria, em terroso. */
  rotulo: string;
  descricao: string;
  cta: string;
  href: string;
  /** Peso visual no bento: informática ocupa os compartimentos maiores. */
  peso: "dominante" | "medio" | "compacto";
};

/**
 * ETAPA 3 — navegação por contexto. Os compartimentos "dominante" e "medio"
 * são todos de informática; conectividade e empresas fecham o núcleo.
 */
export const CONTEXTOS: Contexto[] = [
  {
    id: "computadores",
    titulo: "Computadores e notebooks",
    rotulo: "Núcleo",
    descricao:
      "Lentidão, travamento, superaquecimento, não liga, tela sem imagem, teclado, bateria e falha de placa. Diagnóstico antes de qualquer peça, com o cenário real explicado em português.",
    cta: "Ver soluções para o equipamento",
    href: "/servicos/manutencao-de-computador",
    peso: "dominante",
  },
  {
    id: "sistemas",
    titulo: "Sistemas e desempenho",
    rotulo: "Software",
    descricao:
      "Windows que não inicia, formatação com salvamento de dados, drivers, licenças, upgrade de SSD e memória para a máquina acompanhar o uso atual.",
    cta: "Ver possíveis soluções",
    href: "/servicos/formatacao",
    peso: "medio",
  },
  {
    id: "dados",
    titulo: "Dados e backup",
    rotulo: "Crítico",
    descricao:
      "Tentativa de leitura e cópia conforme o estado real da mídia. Recuperação de dados não é garantida — e dizemos isso antes, não depois.",
    cta: "Entender o que é possível",
    href: "/servicos/recuperacao-de-dados",
    peso: "compacto",
  },
  {
    id: "redes",
    titulo: "Redes e Wi-Fi",
    rotulo: "Conectividade",
    descricao:
      "Sinal fraco em parte do imóvel, roteador mal posicionado, cabeamento improvisado, impressora que some da rede.",
    cta: "Ver soluções de rede",
    href: "/servicos/redes-e-wifi",
    peso: "compacto",
  },
  {
    id: "empresas",
    titulo: "Empresas e home office",
    rotulo: "Operação",
    descricao:
      "Estações paradas, manutenção preventiva, rede e impressoras. A triagem empresarial prioriza o que impede as pessoas de trabalhar.",
    cta: "Solicitar atendimento empresarial",
    href: "/servicos/suporte-tecnico-empresarial",
    peso: "medio",
  },
];

/**
 * ETAPA 3.4 — além da informática. Faixa discreta, sem cards grandes,
 * para não competir com o núcleo da marca na primeira leitura.
 */
export const ALEM_DA_INFORMATICA: { label: string; href: string }[] = [
  { label: "Assistência técnica em geral", href: "/assistencia-tecnica-curitiba" },
  { label: "Conserto de TV", href: "/servicos/conserto-tv" },
  { label: "Conserto de placa eletrônica", href: "/servicos/conserto-placa" },
  { label: "Conserto de monitor", href: "/servicos/conserto-monitor" },
  { label: "Impressoras", href: "/conserto-impressora-curitiba" },
  { label: "Equipamentos e instalações", href: "/equipamentos-atendidos" },
];

/** Normaliza texto para casar sugestões sem depender de acento. */
export const normalizar = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const filtrarSintomas = (consulta: string, limite = 6): Sintoma[] => {
  const q = normalizar(consulta);
  if (!q) return SINTOMAS.slice(0, limite);
  const hits = SINTOMAS.filter(
    (s) => normalizar(s.label).includes(q) || s.termos.some((t) => t.includes(q) || q.includes(t)),
  );
  return (hits.length ? hits : SINTOMAS).slice(0, limite);
};
