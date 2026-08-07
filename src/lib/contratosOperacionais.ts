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
 *  - Página pública /servicos/conserto-placa (blocos de aceite, limitações e garantia)
 *  - Gate de coleta no funil de WhatsApp
 */

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
  categoria: Extract<CategoriaId, "tv" | "placa">;
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
    { id: "aceite-registrado", label: "Aceite do cliente registrado em texto (print salvo na OS)", obrigatorio: true, seFalhar: "Aparelho fica em aguardando-aprovação; SLA pausado." },
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
