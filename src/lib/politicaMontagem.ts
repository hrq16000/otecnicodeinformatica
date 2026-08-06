/**
 * ============================================================================
 * POLÍTICA DE MONTAGEM E CONFIGURAÇÃO DE COMPUTADORES — RODADA 3L
 * ============================================================================
 * Fonte única das regras específicas do serviço de montagem/configuração de
 * desktops (inclui PC Gamer e workstation). NÃO altera política comercial
 * vigente: deriva de `politicaComercial.ts` (garantia, pagamento, dados) e
 * apenas detalha os pontos de alta responsabilidade exigidos pelo gate
 * operacional: peças do cliente, peças adquiridas, BIOS/firmware, testes e
 * limites de desempenho.
 *
 * GOVERNANÇA:
 *  - Nada aqui pode prometer desempenho, FPS, percentual de ganho, ausência de
 *    gargalo, prazo fixo ou preço fechado.
 *  - Toda capacidade publicada precisa constar em CAPACIDADES_MONTAGEM com a
 *    fonte interna correspondente (gate `check:pc-assembly-service`).
 */
import { GARANTIA, NOTA_FISCAL, PAGAMENTO } from "@/lib/politicaComercial";

export interface CapacidadeMontagem {
  capacidade: string;
  confirmada: boolean;
  fonte: string;
  limite: string;
}

/** Auditoria operacional (Parte A da Rodada 3L). Fonte = documento interno. */
export const CAPACIDADES_MONTAGEM: CapacidadeMontagem[] = [
  { capacidade: "Montagem física completa", confirmada: true, fonte: "Serviço publicado de montagem de desktop e registro de atendimentos de montagem e conexão de partes", limite: "Desktops padrão ATX/mATX/ITX. Sem servidores de rack e sem equipamento industrial." },
  { capacidade: "Avaliação de compatibilidade", confirmada: true, fonte: "Serviço de upgrade de SSD/RAM (verificação de compatibilidade) e consultoria de peças da oferta de montagem", limite: "Verificação documental e física dos componentes informados; depende dos dados corretos das peças." },
  { capacidade: "Processador e placa-mãe", confirmada: true, fonte: "Diagnóstico isolado de placa-mãe e CPU na manutenção de computador", limite: "Sem overclock e sem modificação não suportada pelo fabricante." },
  { capacidade: "Memória RAM", confirmada: true, fonte: "Upgrade de memória e teste de memória na manutenção de computador", limite: "Perfil de memória (XMP/EXPO) apenas quando suportado oficialmente pela placa." },
  { capacidade: "SSD e armazenamento", confirmada: true, fonte: "Upgrade de SSD e validação de armazenamento em manutenção/formatação", limite: "Migração de dados avaliada caso a caso, com backup prévio de responsabilidade do cliente." },
  { capacidade: "Placa de vídeo", confirmada: true, fonte: "Teste isolado de placa de vídeo no diagnóstico de desktop", limite: "Instalação, alimentação e validação. Sem promessa de desempenho em jogos." },
  { capacidade: "Fonte e consumo estimado", confirmada: true, fonte: "Teste de fonte e diagnóstico de alimentação em manutenção de computador", limite: "Estimativa de consumo pelos componentes declarados; potência nominal não é garantia de qualidade." },
  { capacidade: "Gabinete e dimensões", confirmada: true, fonte: "Avaliação de ventilação restrita de gabinete em equipamentos atendidos", limite: "Depende das medidas reais informadas pelo fabricante do gabinete e das peças." },
  { capacidade: "Refrigeração a ar", confirmada: true, fonte: "Limpeza interna, troca de pasta térmica e revisão de refrigeração já executadas", limite: "Sem garantia de temperatura universal — depende de ambiente e carga." },
  { capacidade: "Water cooler selado", confirmada: false, fonte: "Sem registro interno de instalação de water cooler selado", limite: "NÃO PUBLICAR como serviço. Casos assim são avaliados individualmente na triagem." },
  { capacidade: "Organização de cabos", confirmada: true, fonte: "Organização interna e cable management descritos na oferta de montagem", limite: "Depende do gabinete: nem todo modelo permite passagem traseira." },
  { capacidade: "Configuração de BIOS/UEFI", confirmada: true, fonte: "Configuração de BIOS e perfil de memória na oferta de montagem", limite: "Configuração básica: ordem de inicialização, reconhecimento de armazenamento e perfil suportado." },
  { capacidade: "Atualização de BIOS", confirmada: false, fonte: "Sem regra interna anterior de atualização de firmware", limite: "Somente quando tecnicamente indicada, com autorização por escrito e placa com recurso de recuperação." },
  { capacidade: "Instalação legítima do sistema", confirmada: true, fonte: "Serviço de formatação com sistema e licença legítima", limite: "Licença fornecida ou adquirida pelo cliente; não fornecemos ativação irregular." },
  { capacidade: "Drivers oficiais", confirmada: true, fonte: "Instalação de drivers oficiais na formatação e na oferta de montagem", limite: "Somente pacotes do fabricante do componente." },
  { capacidade: "Testes de temperatura", confirmada: true, fonte: "Diagnóstico de desligamento por temperatura e leitura térmica em manutenção", limite: "Medição sob carga controlada, sem meta numérica prometida." },
  { capacidade: "Testes de memória", confirmada: true, fonte: "Teste de memória em manutenção de computador e na oferta de montagem", limite: "Teste com tempo definido; falha intermitente pode exigir nova bateria de testes." },
  { capacidade: "Testes de estabilidade", confirmada: true, fonte: "Testes de estabilidade e estresse descritos na oferta de montagem", limite: "Carga controlada por período definido; não substitui uso prolongado." },
  { capacidade: "Validação de armazenamento", confirmada: true, fonte: "Verificação de disco em formatação e manutenção", limite: "Leitura de estado do dispositivo; não previne falha futura." },
  { capacidade: "Diagnóstico de montagem do cliente", confirmada: true, fonte: "Diagnóstico de instabilidade após troca de peça em equipamentos atendidos", limite: "Avaliação cobrada como diagnóstico quando não resulta em serviço." },
  { capacidade: "Upgrade de computador existente", confirmada: true, fonte: "Serviço de upgrade de SSD e memória em operação", limite: "Escopo de modernização pontual segue na página de upgrade." },
  { capacidade: "Registro das peças", confirmada: true, fonte: "Registro do atendimento e nota do fornecedor quando aplicável", limite: NOTA_FISCAL.pecaLabel },
  { capacidade: "Garantia da mão de obra", confirmada: true, fonte: "Política de garantia vigente", limite: GARANTIA.servicoLabel },
  { capacidade: "Autorização comercial", confirmada: true, fonte: "Política de pagamento e aprovação prévia", limite: PAGAMENTO.aprovacaoLabel },
];

/** Capacidades centrais exigidas pelo gate de aprovação da rota. */
export const CAPACIDADES_CENTRAIS = [
  "Montagem física completa",
  "Avaliação de compatibilidade",
  "Fonte e consumo estimado",
  "Refrigeração a ar",
  "Configuração de BIOS/UEFI",
  "Drivers oficiais",
  "Testes de memória",
  "Testes de temperatura",
  "Testes de estabilidade",
  "Registro das peças",
  "Garantia da mão de obra",
  "Autorização comercial",
] as const;

/** true quando todas as capacidades centrais estão confirmadas. */
export const MONTAGEM_APROVADA = CAPACIDADES_CENTRAIS.every((nome) =>
  CAPACIDADES_MONTAGEM.some((c) => c.capacidade === nome && c.confirmada),
);

/** Peças fornecidas pelo cliente — regra explícita exigida pelo gate. */
export const PECAS_DO_CLIENTE = [
  "Conferimos compatibilidade declarada antes de agendar a montagem, com base nos modelos exatos informados por você.",
  "Peças chegam lacradas ou usadas: registramos o estado no recebimento, incluindo acessórios, parafusos e cabos ausentes.",
  "Procedência: pedimos a nota ou o comprovante de compra da peça. Sem comprovante, a montagem pode ser feita, mas o componente entra como item sem garantia rastreável e isso fica registrado no atendimento.",
  "Peça com defeito de fábrica é acionada por você junto ao vendedor ou fabricante — não assumimos a garantia do componente.",
  "Prazo de troca: quando uma peça sua falha no teste, paramos a montagem e comunicamos o resultado. O equipamento fica aguardando a sua substituição por até 5 dias úteis sem custo de permanência; passado esse prazo, combinamos a devolução do conjunto ou a continuidade do atendimento. O prazo de troca junto ao vendedor é dele e não controlamos esse tempo.",

  "Componente usado ou fora de garantia é montado somente com o seu aceite registrado do risco de falha.",
  "Dano prévio identificado (pino torto, conector quebrado, oxidação) é fotografado e comunicado antes de qualquer instalação.",
  "Se uma peça incompatível inviabilizar a montagem, cobramos apenas o que já foi executado e explicamos a troca necessária.",
];

/** Peças adquiridas para o serviço. */
export const PECAS_ADQUIRIDAS = [
  PAGAMENTO.pecasLabel + ".",
  "A compra só acontece após a sua autorização expressa do item, do valor e do fornecedor.",
  GARANTIA.pecasLabel + ", acionada com a nota do fornecedor.",
  "Substituição ou devolução segue o prazo e a regra do fornecedor, não um prazo criado por nós.",
  "Mão de obra e peça são valores separados no registro do atendimento.",
];

/** BIOS e firmware. */
export const REGRA_BIOS = [
  "Configuração de BIOS/UEFI faz parte da montagem: ordem de inicialização, reconhecimento de armazenamento e perfil de memória quando oficialmente suportado.",
  "Atualização de firmware não é rotina. Só é feita quando há motivo técnico — como suporte a um processador mais novo — e com a sua autorização registrada.",
  "Interrupção de energia durante a gravação pode inutilizar a placa. Por isso só atualizamos placas com recurso de recuperação do fabricante e usando a versão estável publicada por ele.",
  "Placa sem recurso de recuperação: informamos o risco e, se você não autorizar por escrito, a atualização não é executada.",
  "Drivers vêm exclusivamente do site oficial do fabricante de cada componente — chipset, vídeo, rede, áudio e armazenamento. Não usamos programas que baixam driver automaticamente nem pacotes de terceiros.",
  "Não realizamos overclock, modificação de BIOS não oficial nem alteração fora do que o fabricante suporta.",

];

/** Testes efetivamente executados (nada além disso pode ser publicado). */
export const TESTES_MONTAGEM = [
  "Reconhecimento de todos os componentes instalados na BIOS/UEFI e no sistema",
  "Inicialização repetida, incluindo reinicializações e partida a frio",
  "Teste de memória com ciclo definido",
  "Verificação do estado e da leitura dos dispositivos de armazenamento",
  "Carga controlada de processador e placa de vídeo com acompanhamento de temperatura",
  "Estabilidade sob carga por período definido no atendimento",
  "Portas USB, áudio, vídeo e rede",
];

/** Delimitação de garantia específica da montagem. */
export const GARANTIA_MONTAGEM = [
  { titulo: "Garantia da montagem", desc: `${GARANTIA.servicoLabel}: instalação, fixação, conexões e organização interna executadas por nós.` },
  { titulo: "Garantia da configuração", desc: "Configuração de BIOS, sistema e drivers entregue funcionando; alterações feitas depois pelo usuário saem da cobertura." },
  { titulo: "Garantia da peça", desc: GARANTIA.pecasLabel + ", com prazo e canal definidos pelo próprio fabricante." },
  { titulo: "Fora da cobertura", desc: "Defeito posterior sem relação com a montagem, alteração feita pelo cliente, overclock, uso inadequado, surto elétrico e dano físico." },
];

/** Fatores reais de variação de valor (nunca preço fechado). */
export const FATORES_VALOR_MONTAGEM = [
  "Quantidade e tipo de componentes",
  "Estado das peças e presença de acessórios",
  "Necessidade de verificação de compatibilidade mais profunda",
  "Necessidade de atualização de firmware autorizada",
  "Complexidade da montagem e do gabinete",
  "Solução de refrigeração escolhida",
  "Nível de organização interna solicitado",
  "Instalação de sistema, drivers e programas",
  "Bateria de testes necessária",
  "Correções de uma montagem anterior instável",
  "Modalidade: bancada, atendimento no local ou coleta e entrega",
];
