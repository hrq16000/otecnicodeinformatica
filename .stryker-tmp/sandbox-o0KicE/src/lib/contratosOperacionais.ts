/**
 * ============================================================================
 * CONTRATOS OPERACIONAIS INTERNOS — Triagem e Autorização (TV e Placa)
 * ============================================================================
 * Regra central: FAIL-CLOSED.
 * Nenhuma etapa avança sem que TODOS os itens obrigatórios do checkpoint
 * anterior estejam registrados. Na dúvida, o fluxo PARA e vira recusa
 * ou pedido de informação — nunca segue "no risco".
 *
 * Uso:
 *  - Painel interno /admin/operacao (aba Contratos)
 *  - Páginas públicas /servicos/conserto-placa e /servicos/conserto-monitor
 *    (blocos de aceite, limitações e garantia)
 *  - Gate de coleta no funil de WhatsApp
 */
// @ts-nocheck


import type { CategoriaId } from "@/lib/operacaoCategorias";

export interface ContratoItem {
  id: string;
  label: string;
  /** obrigatório = bloqueia o avanço quando não cumprido (fail-closed) */
  obrigatorio: boolean;
  /** o que fazer quando o item falha */
  seFalhar: string;
}

export interface ContratoCheckpoint {
  id: string;
  ordem: number;
  nome: string;
  objetivo: string;
  itens: ContratoItem[];
  /** condição explícita para liberar o próximo checkpoint */
  liberaQuando: string;
}

export interface GarantiaReparo {
  tipo: string;
  prazo: string;
  cobre: string;
  naoCobre: string;
}

export interface LimitacaoValidacao {
  titulo: string;
  descricao: string;
}

export interface ContratoOperacional {
  categoria: Extract<CategoriaId, "tv" | "monitor" | "placa">;
  nome: string;
  versao: string;
  atualizadoEm: string;
  resumo: string;
  checkpoints: ContratoCheckpoint[];
  /** o que a bancada NÃO consegue validar/garantir e precisa ser dito antes */
  limitacoesValidacao: LimitacaoValidacao[];
  garantias: GarantiaReparo[];
  /** motivos que interrompem o fluxo imediatamente */
  paradasImediatas: string[];
}

const AUTORIZACAO_PADRAO: ContratoCheckpoint = {
  id: "autorizacao",
  ordem: 3,
  nome: "Checkpoint 3 — Autorização do reparo",
  objetivo: "Nenhum componente é substituído sem autorização escrita registrada.",
  itens: [
    { id: "laudo-enviado", label: "Laudo com achado técnico enviado por escrito no WhatsApp", obrigatorio: true, seFalhar: "Não executar. Concluir o laudo antes." },
    { id: "valor-fechado", label: "Valor total e prazo de execução informados antes da autorização", obrigatorio: true, seFalhar: "Não executar. Recalcular e reenviar." },
    { id: "aceite-registrado", label: "Aceite do cliente registrado em texto (print salvo na OS)", obrigatorio: true, seFalhar: "Aparelho fica em aguardando-aprovação; contagem de prazo interna pausada." },
    { id: "riscos-cientes", label: "Riscos e limitações do reparo comunicados e confirmados", obrigatorio: true, seFalhar: "Reenviar as limitações e aguardar confirmação." },
    { id: "prazo-peca", label: "Prazo de peça sob encomenda confirmado com o fornecedor", obrigatorio: false, seFalhar: "Informar prazo aberto e revisar semanalmente." },
  ],
  liberaQuando: "Aceite textual do cliente + valor + prazo registrados na OS.",
};

export const CONTRATOS_OPERACIONAIS: ContratoOperacional[] = [
  {
    categoria: "tv",
    nome: "TV / Smart TV",
    versao: "1.0",
    atualizadoEm: "2026-08-07",
    resumo:
      "Triagem remota por foto antes de qualquer deslocamento. Painel trincado e OLED com burn-in são recusa automática. Sem foto da etiqueta e da tela ligada, não há agendamento.",
    checkpoints: [
      {
        id: "triagem-remota",
        ordem: 1,
        nome: "Checkpoint 1 — Triagem remota (antes de agendar)",
        objetivo: "Eliminar caso inviável antes de gastar deslocamento e bancada.",
        itens: [
          { id: "modelo", label: "Marca, modelo exato e polegadas registrados", obrigatorio: true, seFalhar: "Pedir a etiqueta traseira. Sem isso, não agenda." },
          { id: "foto-tela", label: "Foto da tela ligada (com o defeito visível ou tela apagada)", obrigatorio: true, seFalhar: "Sem foto, não agenda." },
          { id: "foto-etiqueta", label: "Foto da etiqueta traseira com número de série", obrigatorio: true, seFalhar: "Sem foto, não agenda." },
          { id: "trinca", label: "Confirmado que NÃO há trinca, mancha de pressão ou marca de impacto", obrigatorio: true, seFalhar: "Recusa automática — enviar script de recusa por painel danificado." },
          { id: "polegadas", label: "Aparelho até 65 polegadas (limite de transporte seguro)", obrigatorio: true, seFalhar: "Recusa automática — sem logística segura." },
          { id: "terceiro", label: "Histórico de abertura por terceiro declarado", obrigatorio: true, seFalhar: "Se houve, avaliar caso a caso e registrar ressalva de garantia." },
        ],
        liberaQuando: "Todos os itens obrigatórios marcados. Qualquer item em falha → recusa ou pedido de informação.",
      },
      {
        id: "coleta",
        ordem: 2,
        nome: "Checkpoint 2 — Coleta e recebimento",
        objetivo: "Blindar estado do aparelho e evitar disputa sobre dano preexistente.",
        itens: [
          { id: "faixa", label: "Endereço dentro do raio de 30 km e faixa logística definida", obrigatorio: true, seFalhar: "Fora do raio: recusar ou orientar entrega na bancada." },
          { id: "fotos-360", label: "Fotos do aparelho de todos os lados no momento da retirada", obrigatorio: true, seFalhar: "Não retirar sem o registro fotográfico." },
          { id: "teste-tela", label: "Tela testada com lanterna na frente do cliente (backlight)", obrigatorio: true, seFalhar: "Registrar impossibilidade e a razão." },
          { id: "acessorios", label: "Controle, base/suporte e cabos listados no protocolo", obrigatorio: true, seFalhar: "Listar como 'não recebido' explicitamente." },
          { id: "termo", label: "Condições aceitas (diagnóstico R$ 99,99 / mínimo R$ 299,99)", obrigatorio: true, seFalhar: "Não retirar o aparelho." },
        ],
        liberaQuando: "Protocolo gerado, fotos anexadas e termo aceito.",
      },
      AUTORIZACAO_PADRAO,
      {
        id: "entrega",
        ordem: 4,
        nome: "Checkpoint 4 — Entrega e encerramento",
        objetivo: "Entregar com prova de funcionamento e prazo de garantia explícito.",
        itens: [
          { id: "teste-2h", label: "Teste em bancada com no mínimo 2 horas ligada após o reparo", obrigatorio: true, seFalhar: "Não entregar. Repetir o burn-in." },
          { id: "video", label: "Vídeo curto da TV funcionando anexado à OS", obrigatorio: true, seFalhar: "Não entregar sem prova." },
          { id: "acessorios-volta", label: "Todos os acessórios listados devolvidos", obrigatorio: true, seFalhar: "Localizar antes de encerrar." },
          { id: "garantia-doc", label: "Prazo de garantia por escrito entregue ao cliente", obrigatorio: true, seFalhar: "Emitir antes de encerrar a OS." },
        ],
        liberaQuando: "Cliente confere o funcionamento na entrega e a OS é encerrada com garantia registrada.",
      },
    ],
    limitacoesValidacao: [
      { titulo: "Painel não é testável fora do aparelho", descricao: "Falha de painel (linhas, manchas, colunas mortas) só aparece com a TV montada e ligada. Se o defeito for do painel, o reparo não é viável — o painel novo geralmente custa mais que uma TV equivalente." },
      { titulo: "Falha intermitente exige tempo", descricao: "Defeitos que aparecem depois de horas ligada exigem burn-in prolongado. O prazo aumenta e o laudo só sai depois do teste completo." },
      { titulo: "Firmware fechado", descricao: "Atualizações e travas de software de Smart TV dependem do fabricante. Não há como forçar firmware bloqueado por conta ou região." },
    ],
    garantias: [
      { tipo: "Troca de capacitores / reparo de fonte", prazo: "90 dias", cobre: "Os componentes substituídos e o circuito reparado.", naoCobre: "Outras seções da placa e falhas por oscilação de rede elétrica." },
      { tipo: "Reparo de placa T-CON", prazo: "90 dias", cobre: "O reparo executado e os componentes trocados.", naoCobre: "Degradação do painel e flat cable com fadiga." },
      { tipo: "Troca de placa completa (peça nova)", prazo: "90 dias", cobre: "A peça fornecida e a instalação.", naoCobre: "Danos por surto elétrico após a entrega." },
      { tipo: "Retrabalho em placa já aberta por terceiro", prazo: "30 dias, com ressalva registrada", cobre: "Somente o ponto reparado por nós.", naoCobre: "Qualquer intervenção anterior de terceiro." },
    ],
    paradasImediatas: [
      "Painel trincado, com mancha de impacto ou pressão",
      "OLED com burn-in permanente",
      "Aparelho acima de 65 polegadas",
      "Cliente se recusa a registrar o estado do aparelho por foto",
    ],
  },
  {
    categoria: "monitor",
    nome: "Monitor",
    versao: "1.0",
    atualizadoEm: "2026-08-07",
    resumo:
      "Nenhum monitor é coletado sem foto do painel e sem o teste externo já feito pelo cliente (outro cabo, outra tomada, outra fonte de vídeo). Painel trincado ou com mancha de pressão é recusa automática. Reparo só após laudo e autorização por escrito.",
    checkpoints: [
      {
        id: "triagem-remota",
        ordem: 1,
        nome: "Checkpoint 1 — Triagem remota (antes de agendar a coleta)",
        objetivo: "Eliminar dano de painel e causa externa antes de gastar logística e bancada.",
        itens: [
          { id: "modelo", label: "Marca, modelo e polegadas registrados", obrigatorio: true, seFalhar: "Pedir foto da etiqueta traseira. Sem isso, não agenda." },
          { id: "foto-tela", label: "Foto da tela ligada (com o defeito visível ou apagada)", obrigatorio: true, seFalhar: "Sem foto, não agenda." },
          { id: "foto-etiqueta", label: "Foto da etiqueta traseira com número de série", obrigatorio: true, seFalhar: "Sem foto, não agenda." },
          { id: "painel-integro", label: "Confirmado que NÃO há trinca, mancha de pressão ou marca de impacto", obrigatorio: true, seFalhar: "Recusa automática — enviar script de recusa por painel danificado." },
          { id: "teste-externo", label: "Cliente testou outro cabo, outra tomada e outra fonte de vídeo", obrigatorio: true, seFalhar: "Orientar o teste antes de coletar — causa externa é frequente." },
          { id: "tipo-fonte", label: "Tipo de alimentação identificado (fonte externa ou tomada direta)", obrigatorio: true, seFalhar: "Pedir foto do cabo/fonte. Fonte externa deve vir junto na coleta." },
          { id: "viabilidade-economica", label: "Monitor com 22 polegadas ou mais, ou valor de mercado que justifique o reparo", obrigatorio: false, seFalhar: "Informar que o reparo pode não compensar e registrar a ciência do cliente." },
        ],
        liberaQuando: "Todos os itens obrigatórios marcados e nenhuma parada imediata acionada.",
      },
      {
        id: "bancada",
        ordem: 2,
        nome: "Checkpoint 2 — Recebimento e diagnóstico em bancada",
        objetivo: "Registrar o estado real do aparelho e isolar o caminho de falha antes de abrir.",
        itens: [
          { id: "registro-entrada", label: "Registro de entrada com fotos do painel, moldura, traseira, base e cabos", obrigatorio: true, seFalhar: "Não iniciar o diagnóstico sem o registro fotográfico." },
          { id: "acessorios", label: "Base/pedestal, fonte e cabos recebidos listados na OS", obrigatorio: true, seFalhar: "Listar como ausente e comunicar o cliente antes de prosseguir." },
          { id: "teste-fonte", label: "Fonte externa ou interna medida antes de abrir o conjunto óptico", obrigatorio: true, seFalhar: "Refazer a medição. Não abrir o painel por suspeita não confirmada." },
          { id: "teste-lanterna", label: "Teste de iluminação (lanterna) executado para separar backlight de placa lógica", obrigatorio: true, seFalhar: "Executar antes de qualquer hipótese sobre placa lógica." },
          { id: "entradas", label: "Entradas de vídeo testadas com cabo e fonte de sinal de bancada", obrigatorio: true, seFalhar: "Testar antes de imputar defeito ao monitor." },
          { id: "avaria-transporte", label: "Comparação entre o estado na coleta e o estado no recebimento", obrigatorio: true, seFalhar: "Abrir tratativa de avaria de transporte antes de qualquer reparo." },
        ],
        liberaQuando: "Caminho de falha identificado (fonte externa, fonte interna, backlight ou placa lógica) e registrado na OS.",
      },
      AUTORIZACAO_PADRAO,
      {
        id: "entrega",
        ordem: 4,
        nome: "Checkpoint 4 — Teste final, prova visual e entrega",
        objetivo: "Entregar com prova de funcionamento e limites de garantia explícitos.",
        itens: [
          { id: "teste-2-entradas", label: "Monitor ligado e testado em duas entradas de vídeo diferentes", obrigatorio: true, seFalhar: "Não entregar. Repetir o teste." },
          { id: "burn-in", label: "Mínimo de 2 horas ligado após o reparo, para flagrar falha térmica", obrigatorio: true, seFalhar: "Não entregar. Repetir o período contínuo." },
          { id: "uniformidade", label: "Verificação de uniformidade de brilho registrada", obrigatorio: true, seFalhar: "Registrar a divergência no laudo antes de entregar." },
          { id: "prova-visual", label: "Fotos de entrada, placa lógica, teste final e embalagem anexadas à OS", obrigatorio: true, seFalhar: "Não encerrar a OS sem o conjunto de provas." },
          { id: "acessorios-volta", label: "Base, fonte e cabos devolvidos conforme a lista de entrada", obrigatorio: true, seFalhar: "Localizar antes de encerrar." },
          { id: "garantia-doc", label: "Prazo e limites de garantia entregues por escrito", obrigatorio: true, seFalhar: "Emitir antes de encerrar a OS." },
        ],
        liberaQuando: "Cliente confere o funcionamento na entrega e a OS é encerrada com garantia registrada.",
      },
    ],
    limitacoesValidacao: [
      { titulo: "Painel não é peça reparada por nós", descricao: "Trinca, mancha de pressão, marca de impacto e colunas mortas dependem de substituição de painel, cujo custo se aproxima ou supera o de um monitor equivalente novo. É recusa declarada na triagem." },
      { titulo: "Desempenho não é certificável nesta bancada", descricao: "Taxa de atualização máxima, tempo de resposta, faixa de cor e sincronização adaptativa não são medidos aqui. O teste final comprova funcionamento estável em duas entradas, e é só isso que o laudo declara." },
      { titulo: "Falha intermitente exige tempo ligado", descricao: "Defeito que só aparece com o aquecimento exige período contínuo em bancada. O prazo aumenta e o laudo sai depois do teste completo." },
      { titulo: "Placa avulsa não tem validação real", descricao: "Monitor enviado só como placa é avaliado dentro do que o circuito permite, sem teste com painel montado. Esse caso pertence ao atendimento de reparo de placa eletrônica." },
    ],
    garantias: [
      { tipo: "Troca de fonte externa (adaptador)", prazo: "90 dias", cobre: "A peça fornecida e a validação do funcionamento na entrega.", naoCobre: "Dano por tensão incorreta, surto elétrico posterior ou uso de outro adaptador." },
      { tipo: "Reparo de fonte interna / troca de capacitores", prazo: "90 dias", cobre: "Os componentes substituídos e o circuito reparado.", naoCobre: "Outras seções da placa e falhas por oscilação da rede elétrica." },
      { tipo: "Reparo de driver de backlight", prazo: "90 dias", cobre: "O estágio reparado e os componentes trocados.", naoCobre: "Degradação natural das barras de LED e do difusor." },
      { tipo: "Troca de barra de LED", prazo: "90 dias", cobre: "A peça fornecida e a instalação.", naoCobre: "Variação de brilho entre barras nova e remanescente, quando a substituição é parcial." },
      { tipo: "Reparo em nível de componente na placa lógica", prazo: "90 dias", cobre: "O componente trocado e o circuito diretamente reparado.", naoCobre: "Outros estágios da mesma placa e dano por conexão a quente." },
      { tipo: "Troca de conector de vídeo (HDMI / DisplayPort)", prazo: "90 dias", cobre: "O conector substituído e a solda.", naoCobre: "Rompimento novo por tração no cabo ou esforço mecânico." },
      { tipo: "Monitor com histórico de líquido ou reparo de terceiro", prazo: "30 dias, com ressalva registrada", cobre: "Somente o ponto reparado por nós.", naoCobre: "Corrosão remanescente, intervenção anterior e reincidência em outra região." },
      { tipo: "Painel (qualquer situação)", prazo: "Sem cobertura", cobre: "Nada — não é peça reparada nem fornecida por nós.", naoCobre: "Trinca, mancha de pressão, impacto, infiltração e colunas mortas." },
    ],
    paradasImediatas: [
      "Painel trincado, com mancha de pressão ou marca de impacto",
      "Infiltração visível entre o painel e a moldura",
      "Peça necessária sem fornecimento no mercado nacional",
      "Cliente exige garantia de desempenho (taxa de atualização, tempo de resposta, sincronização adaptativa)",
      "Cliente se recusa a registrar o estado do aparelho por foto",
    ],
  },
  {
    categoria: "placa",
    nome: "Reparo de placa eletrônica",
    versao: "1.0",
    atualizadoEm: "2026-08-07",
    resumo:
      "Nenhuma placa entra em bancada sem foto nítida dos dois lados e histórico de intervenção declarado. Placa com pad arrancado, oxidação generalizada ou dano multicamada é recusa. Reparo só após laudo e autorização por escrito.",
    checkpoints: [
      {
        id: "triagem-remota",
        ordem: 1,
        nome: "Checkpoint 1 — Triagem remota (antes de aceitar)",
        objetivo: "Separar placa reparável de placa perdida antes de cobrar diagnóstico.",
        itens: [
          { id: "modelo-placa", label: "Modelo do equipamento e código serigrafado da placa", obrigatorio: true, seFalhar: "Pedir foto da serigrafia. Sem isso, não aceita." },
          { id: "fotos-2-lados", label: "Fotos nítidas dos dois lados da placa, com foco na área afetada", obrigatorio: true, seFalhar: "Sem foto, não aceita." },
          { id: "liquido", label: "Contato com líquido declarado (sim/não e há quanto tempo)", obrigatorio: true, seFalhar: "Assumir pior caso e registrar ressalva de oxidação." },
          { id: "terceiro", label: "Intervenção anterior de terceiro declarada e detalhada", obrigatorio: true, seFalhar: "Se houve retrabalho com pad arrancado → recusa." },
          { id: "oxidacao", label: "Sem oxidação generalizada visível nas fotos", obrigatorio: true, seFalhar: "Recusa automática — recuperação sem garantia real." },
          { id: "disponibilidade-bga", label: "Chip BGA com stencil/insumo disponível quando aplicável", obrigatorio: true, seFalhar: "Recusa técnica — informar ausência de insumo." },
        ],
        liberaQuando: "Todos os itens obrigatórios marcados e nenhuma parada imediata acionada.",
      },
      {
        id: "bancada",
        ordem: 2,
        nome: "Checkpoint 2 — Recebimento e diagnóstico em bancada",
        objetivo: "Diagnóstico repetível, com medição registrada e sem execução prematura.",
        itens: [
          { id: "esd", label: "Placa manuseada em área ESD com pulseira aterrada", obrigatorio: true, seFalhar: "Não manipular fora da área ESD." },
          { id: "inspecao", label: "Inspeção sob microscópio registrada em foto", obrigatorio: true, seFalhar: "Refazer antes de qualquer medição de bancada." },
          { id: "medicao", label: "Consumo em fonte ajustável e linhas de alimentação medidas", obrigatorio: true, seFalhar: "Sem medição não há laudo — não estimar valores." },
          { id: "sem-execucao", label: "Nenhum componente substituído antes do laudo", obrigatorio: true, seFalhar: "Violação de contrato: registrar ocorrência e assumir o custo." },
          { id: "foto-recebimento", label: "Fotos de recebimento anexadas à OS antes de abrir", obrigatorio: true, seFalhar: "Não iniciar o serviço." },
        ],
        liberaQuando: "Laudo com achado técnico + medições anexadas à OS.",
      },
      AUTORIZACAO_PADRAO,
      {
        id: "entrega",
        ordem: 4,
        nome: "Checkpoint 4 — Teste, entrega e garantia",
        objetivo: "Provar que o sintoma original não retorna sob carga.",
        itens: [
          { id: "teste-carga", label: "Teste sob carga com o sintoma original reproduzido e resolvido", obrigatorio: true, seFalhar: "Não entregar. Reabrir diagnóstico." },
          { id: "burnin", label: "Burn-in mínimo de 4 horas para falha térmica ou intermitente", obrigatorio: true, seFalhar: "Não entregar sem o ciclo completo." },
          { id: "foto-pos", label: "Foto da área reparada sob microscópio anexada à OS", obrigatorio: true, seFalhar: "Registrar antes de fechar a OS." },
          { id: "garantia-escopo", label: "Escopo da garantia por tipo de reparo entregue por escrito", obrigatorio: true, seFalhar: "Emitir antes de encerrar." },
        ],
        liberaQuando: "Teste aprovado, prova fotográfica anexada e garantia entregue.",
      },
    ],
    limitacoesValidacao: [
      { titulo: "Placa isolada nem sempre valida 100%", descricao: "Quando recebemos só a placa, sem o restante do equipamento, o teste final é limitado ao que a bancada consegue simular. O teste definitivo acontece com o conjunto montado." },
      { titulo: "Oxidação continua avançando", descricao: "Placas que tiveram contato com líquido podem apresentar falha nova em outro ponto semanas depois, mesmo com o reparo original bem-sucedido. Isso não é reincidência do reparo." },
      { titulo: "Falha intermitente pode não reproduzir", descricao: "Se o defeito não aparece durante o ciclo de teste, não há como confirmar a correção. Nesse caso comunicamos a limitação antes de cobrar." },
      { titulo: "Componente sem substituto no mercado", descricao: "Alguns controladores e chips específicos não têm reposição nacional. Sem peça, a placa é devolvida com laudo e cobra-se apenas o diagnóstico." },
      { titulo: "Reballing tem taxa de sucesso, não certeza", descricao: "Reflow e reballing de BGA são procedimentos de recuperação. Podem falhar por dano interno no die, que nenhum equipamento de bancada detecta antes." },
    ],
    garantias: [
      { tipo: "Reparo em nível de componente (SMD, MOSFET, regulador, capacitor)", prazo: "90 dias", cobre: "O componente trocado e o circuito diretamente reparado.", naoCobre: "Outras seções da placa e falhas por surto elétrico." },
      { tipo: "Reparo de trilha rompida / jumper", prazo: "90 dias", cobre: "A continuidade elétrica do ponto reparado.", naoCobre: "Rompimento novo por esforço mecânico ou nova queda." },
      { tipo: "Troca de conector de carga / conector físico", prazo: "90 dias", cobre: "O conector substituído e a solda.", naoCobre: "Dano por uso de carregador inadequado ou tração no cabo." },
      { tipo: "Reballing / retrabalho de BGA", prazo: "30 dias", cobre: "A execução do reballing e a fixação do chip.", naoCobre: "Degradação interna do chip, que não é detectável em bancada." },
      { tipo: "Reparo em placa com histórico de líquido", prazo: "30 dias, com ressalva registrada", cobre: "Somente o ponto reparado.", naoCobre: "Falha nova em outra região por avanço da oxidação." },
      { tipo: "Placa já retrabalhada por terceiro", prazo: "30 dias, com ressalva registrada", cobre: "Exclusivamente a intervenção feita por nós.", naoCobre: "Qualquer serviço anterior e seus efeitos." },
    ],
    paradasImediatas: [
      "Pads arrancados por retrabalho anterior",
      "Oxidação generalizada nas duas faces",
      "Dano multicamada por impacto (placa empenada ou trincada)",
      "Ausência de insumo/stencil para o chip específico",
      "Cliente exige execução sem laudo prévio",
    ],
  },
];

export const getContrato = (categoria: string) =>
  CONTRATOS_OPERACIONAIS.find((c) => c.categoria === categoria);

/** Total de itens obrigatórios do contrato — base do gate fail-closed. */
export const itensObrigatorios = (c: ContratoOperacional) =>
  c.checkpoints.flatMap((cp) => cp.itens.filter((i) => i.obrigatorio));

/**
 * Avalia um checkpoint em modo fail-closed: só libera quando todos os itens
 * obrigatórios estão marcados. Retorna também o que falta e a ação corretiva.
 */
export function avaliarCheckpoint(
  cp: ContratoCheckpoint,
  marcados: Record<string, boolean>,
): { liberado: boolean; pendencias: ContratoItem[] } {
  const pendencias = cp.itens.filter((i) => i.obrigatorio && !marcados[i.id]);
  return { liberado: pendencias.length === 0, pendencias };
}
