// ─────────────────────────────────────────────────────────────
// RODADA 4N — corpo estático autoral das rotas institucionais que ainda
// chegavam ao crawler apenas com os blocos comuns (grau C no inventário
// de herança editorial).
//
// Rotas cobertas: "/", "/diagnostico-tecnico", "/quando-nao-compensa",
// "/contato" e "/anuncie".
//
// Regras: nada aqui inventa avaliação, depoimento, endereço físico, prazo
// fixo ou parceiro. Preços e políticas espelham src/lib/precosConfig.ts e
// as páginas /precos-e-politicas e /termos-e-condicoes.
// ─────────────────────────────────────────────────────────────

export const BLOCOS_4N = {
  "/servicos": [
    {
      titulo: "Como escolher o serviço certo sem chutar",
      paragrafos: [
        "Serviço errado é dinheiro perdido duas vezes: paga-se pelo que foi feito e o problema continua. Por isso a lista abaixo é lida de trás para frente: primeiro o sintoma que você observa, depois o procedimento que costuma resolvê-lo. Computador que demora a abrir tudo aponta para disco mecânico e sistema saturado; travamento em jogo ou renderização aponta para temperatura e alimentação; queda de rede em parte do imóvel aponta para cobertura e canal de Wi-Fi.",
        "Quando o sintoma não é conclusivo, o caminho é o diagnóstico técnico: ele define a causa antes de qualquer execução e evita a troca de peça por tentativa, prática comum no mercado e que encarece o atendimento sem garantia de resultado.",
      ],
    },
    {
      titulo: "Serviços para uso doméstico e serviços para empresa",
      paragrafos: [
        "No uso doméstico e em home office predominam formatação com preservação de arquivos, troca por SSD e memória, remoção de vírus, recuperação de dados e estabilização de Wi-Fi. São atendimentos pontuais, resolvidos por acesso remoto ou em uma visita, e o critério de sucesso é simples: a máquina volta a servir para o que você usa.",
        "Em empresa a lógica muda. O que pesa não é o reparo isolado e sim a continuidade: parque de máquinas padronizado, rotina de backup testada, rede corporativa estável e manutenção preventiva agendada. Aqui o atendimento é contratado por recorrência ou por projeto, com registro do que foi feito em cada equipamento.",
      ],
    },
    {
      titulo: "Valores, aprovação e garantia — a mesma regra em todos os serviços",
      paragrafos: [
        "Os atendimentos partem de R$ 99,99 para diagnóstico e serviços simples. Casos que vão para bancada têm coleta sem custo e mínimo pré-aprovado de R$ 299,99: se o reparo couber nesse valor, é executado sem custo adicional; se ultrapassar, o valor é informado antes e só segue com sua autorização.",
        "Peças são cobradas à parte da mão de obra, com aprovação expressa. A mão de obra tem 90 dias de garantia no mesmo defeito tratado e as peças seguem a garantia do fornecedor ou fabricante. Não trabalhamos com balcão aberto ao público: tudo acontece por atendimento remoto, visita técnica ou coleta com entrega.",
      ],
    },
  ],

  "/": [
    {
      titulo: "Comece pelo sintoma, não pelo nome do serviço",
      paragrafos: [
        "A maioria das pessoas não chega procurando “formatação” ou “upgrade de SSD”: chega porque o computador ficou lento, o notebook não liga, o Wi-Fi cai no meio da reunião ou um arquivo importante sumiu. Por isso o portal é organizado por sintoma. Você descreve o que está acontecendo e a triagem indica o caminho técnico correto antes de qualquer valor ser mencionado.",
        "Essa ordem evita o erro mais caro do setor: pagar por um serviço que não resolve a causa. Um computador lento pode ser disco mecânico no fim da vida, sistema saturado, superaquecimento ou malware — e cada causa tem um procedimento diferente. A triagem existe para separar esses cenários antes de agendar.",
      ],
    },
    {
      titulo: "Três modalidades e um critério objetivo para escolher",
      paragrafos: [
        "Atendimento remoto resolve o que é software: lentidão por sistema, configuração, e-mail, impressora em rede, suporte a home office e limpeza de programas. É a via mais rápida porque não depende de deslocamento nem de agenda de rota.",
        "Visita técnica é indicada quando é preciso ver o equipamento: não liga, não dá imagem, ruído anormal, rede física, ponto de energia. A visita é sem compromisso e tem janela de até 30 minutos para inspeção, diagnóstico, avaliação e tentativa de reparo rápido compatível — peças não estão inclusas.",
        "Coleta e entrega entra quando o serviço passa de uma a duas horas de bancada: reparo de placa, recuperação de dados, troca de tela, limpeza com troca de pasta térmica. Nesses casos a coleta é sem custo, o mínimo pré-aprovado é R$ 299,99 e, se o reparo passar disso, o valor é informado antes de qualquer execução.",
      ],
    },
    {
      titulo: "Sem balcão: como isso muda o atendimento a seu favor",
      paragrafos: [
        "A operação é de campo e bancada, sem balcão aberto ao público. Na prática isso significa que você não perde meio dia levando o equipamento e voltando depois para buscar: o equipamento é retirado no seu endereço e devolvido no mesmo endereço, com combinação prévia de dia e janela de horário.",
        "O fluxo padrão é sempre o mesmo: triagem, definição da modalidade, aprovação do escopo e do valor, execução e devolução com o que foi feito descrito em texto. Mão de obra tem 90 dias de garantia no mesmo defeito tratado; peças seguem a garantia do fornecedor ou fabricante.",
      ],
    },
  ],

  "/diagnostico-tecnico": [
    {
      titulo: "O que é o diagnóstico técnico — e o que ele não é",
      paragrafos: [
        "Diagnóstico técnico é o procedimento que identifica a causa real da falha antes de qualquer reparo. Não é chute por sintoma nem troca de peça por eliminação: é verificação de energia, de inicialização, de armazenamento, de memória, de temperatura e de sistema, na ordem que faz o defeito aparecer de forma reproduzível.",
        "O objetivo do diagnóstico é responder três perguntas objetivas: qual componente ou camada está falhando, se o reparo é tecnicamente viável e quanto custa em relação ao valor do equipamento. Sem essas respostas, qualquer orçamento é especulação.",
      ],
    },
    {
      titulo: "Como o diagnóstico é conduzido na prática",
      paragrafos: [
        "Na visita técnica, a janela de até 30 minutos cobre inspeção, diagnóstico, avaliação e tentativa de reparo rápido quando for compatível — sem compromisso e sem peças inclusas. Muitos casos de configuração, sistema travado, impressora ou rede se encerram aí mesmo.",
        "Quando o caso exige bancada — teste com fonte controlada, medição em placa, análise de disco em outro equipamento, recuperação de dados — o equipamento é coletado sem custo. A partir daí o mínimo pré-aprovado é R$ 299,99: se o reparo couber nesse valor, é executado sem custo adicional; se ultrapassar, você é informado antes e decide.",
        "O diagnóstico avulso, quando o cliente quer apenas o laudo do que está acontecendo, parte de R$ 99,99. Se o serviço for aprovado na sequência, esse valor é considerado dentro do atendimento.",
      ],
    },
    {
      titulo: "Sinais que mudam a prioridade do diagnóstico",
      paragrafos: [
        "Ruído metálico ou clique repetido em disco rígido, cheiro de queimado, superaquecimento com desligamento súbito e tela azul recorrente são casos em que insistir em ligar o equipamento aumenta o risco de perda definitiva de dados. Nesses cenários a orientação é parar de usar e priorizar a cópia dos dados antes de qualquer tentativa de reparo.",
        "Já lentidão progressiva, travamentos em programas específicos, Wi-Fi oscilante e atualizações que não concluem quase nunca são emergência: dá para agendar com calma e, em boa parte dos casos, resolver por acesso remoto.",
      ],
    },
  ],

  "/quando-nao-compensa": [
    {
      titulo: "A conta que decide entre reparar e substituir",
      paragrafos: [
        "A régua usada na bancada é simples: quando o reparo passa de 40% a 50% do preço de um equipamento novo equivalente, a matemática deixa de fechar. O aparelho reparado continua com anos de uso acumulado e com outros componentes próximos do fim de vida, então o custo por mês de uso restante fica maior que o de um equipamento novo com garantia de fábrica.",
        "Essa régua não é dogma. Ela é aplicada junto com três variáveis: idade do equipamento, disponibilidade da peça no mercado e valor dos dados que estão dentro dele. Um notebook de dois anos com peça disponível costuma valer o reparo; o mesmo defeito em um modelo de nove anos, quase nunca.",
      ],
    },
    {
      titulo: "Cenários em que a resposta honesta é “não conserte”",
      paragrafos: [
        "Desktop com mais de oito a dez anos, memória de geração antiga e placa-mãe sem suporte a sistema atual: atualizar tudo se aproxima do preço de uma máquina nova com desempenho muito superior. Notebook com placa-mãe queimada em modelo antigo: a placa sozinha custa metade ou mais do valor de um aparelho novo.",
        "TV com painel trincado por impacto: o painel é 60% a 80% do valor do aparelho, então o reparo raramente compensa — diferente de falha de LED de retroiluminação, fonte ou T-CON, que costuma ficar em uma fração do preço. Disco rígido com ruído mecânico: o disco não se repara, se substitui; o que pode valer muito é recuperar os dados antes da troca.",
        "Múltiplos defeitos simultâneos no mesmo aparelho antigo — tela, bateria, teclado e armazenamento — somam mais que um equipamento novo e ainda tendem a revelar novas falhas durante o reparo.",
      ],
    },
    {
      titulo: "O que fazer quando não compensa reparar",
      paragrafos: [
        "Não compensar reparar não significa perder tudo. Na maior parte dos casos é possível aproveitar SSD, memória e fonte no equipamento novo, migrar o sistema e os arquivos e descartar o restante de forma correta. A recuperação e a migração de dados são atendimentos independentes do reparo.",
        "Quando o caminho é substituir, a orientação é dimensionar a máquina pelo uso real: escritório e estudo, trabalho com imagem e vídeo, ou jogos. Especificar acima do necessário custa caro sem ganho perceptível; especificar abaixo repete o problema em um ou dois anos.",
      ],
    },
  ],

  "/contato": [
    {
      titulo: "Como falar com o técnico e o que já deixar pronto",
      paragrafos: [
        "O contato é feito pelo WhatsApp, e não por balcão de atendimento: a operação trabalha com visita técnica, suporte remoto e coleta com entrega. Isso mantém a agenda previsível e evita que você se desloque para receber uma resposta que pode ser dada em texto.",
        "Para acelerar a triagem, tenha em mãos quatro informações: tipo de equipamento (notebook, desktop, TV, impressora, roteador), o sintoma descrito com suas palavras, há quanto tempo acontece e o bairro ou cidade do atendimento. Com isso é possível indicar a modalidade correta já na primeira resposta.",
      ],
    },
    {
      titulo: "O que acontece depois da primeira mensagem",
      paragrafos: [
        "A triagem separa o que é software do que é hardware. Sendo software, na maioria das vezes o atendimento remoto começa no mesmo contato. Sendo hardware, a escolha é entre visita técnica — inspeção, diagnóstico e tentativa de reparo rápido em janela de até 30 minutos, sem compromisso e sem peças inclusas — ou coleta sem custo para bancada quando o serviço passa de uma a duas horas.",
        "Nenhum serviço é executado sem aprovação. O escopo e o valor são apresentados antes, o mínimo pré-aprovado para casos de bancada é R$ 299,99 e qualquer valor acima disso é informado previamente. Peças são cobradas à parte da mão de obra e também dependem de autorização expressa.",
      ],
    },
    {
      titulo: "Horários, cobertura e retorno",
      paragrafos: [
        "O atendimento cobre Curitiba e cidades da região metropolitana. Mensagens recebidas fora do horário comercial são respondidas na abertura seguinte, por ordem de chegada — preferimos informar a janela real de agenda a prometer prazo fixo que não se cumpre.",
        "Para empresas, o contato inicial pode já ser direcionado ao fluxo empresarial, com suporte recorrente, manutenção preventiva, rede e rotina de backup tratados como um único plano em vez de chamados isolados.",
      ],
    },
  ],

  "/anuncie": [
    {
      titulo: "Por que anunciar em um portal técnico local",
      paragrafos: [
        "Este portal recebe visitas de pessoas e empresas de Curitiba e região no momento exato em que estão com um problema de equipamento: computador parado, rede instável, dados perdidos, decisão de comprar ou consertar. É audiência de intenção comercial declarada e recorte geográfico definido, não tráfego genérico.",
        "As páginas são organizadas por sintoma, serviço, equipamento e localidade. Isso permite que o anúncio fique próximo do assunto certo — uma loja de peças ao lado de conteúdo de upgrade, um provedor de internet junto ao conteúdo de Wi-Fi, uma revenda de equipamentos na página de quando não compensa reparar.",
      ],
    },
    {
      titulo: "Quem chega a este portal e em que momento",
      paragrafos: [
        "A maior parte das visitas não começa por marca nem por nome de empresa: começa por uma frase de problema — “computador lento”, “notebook não liga”, “internet caindo”, “apaguei um arquivo”. Quem digita isso está a poucos passos de uma decisão de compra ou de contratação, e normalmente decide em pouco tempo. É esse recorte de momento, e não o volume bruto de acessos, que dá valor ao espaço publicitário aqui.",
        "A segunda camada de audiência é de decisão de investimento: páginas sobre quando trocar HD por SSD, quando o reparo deixa de compensar, montagem de PC e escolha de workstation. Nelas o leitor está comparando custo de conserto contra custo de equipamento novo — contexto natural para revendas, lojas de peças, provedores de internet e integradores de TI.",
        "O terceiro grupo é empresarial: escritórios, clínicas, comércios e prestadores que buscam suporte recorrente, rede estável e rotina de backup. Esse público entra por páginas de serviço corporativo e por conteúdo de organização de TI, com ciclo de decisão mais longo e ticket maior do que o atendimento residencial.",
      ],
    },
    {
      titulo: "Formatos e posições disponíveis",
      paragrafos: [
        "Os formatos previstos são: faixa de topo acima da dobra, bloco no meio do conteúdo editorial, destaque de patrocinador ao final da página e menção de parceiro em páginas de categoria. Cada posição tem limite de ocupação por página para não comprometer leitura, velocidade e Core Web Vitals.",
        "Anúncios não se disfarçam de conteúdo técnico. Todo espaço comercial é identificado como publicidade ou patrocínio, e recomendações técnicas do portal nunca são vendidas — essa separação é o que sustenta a confiança da audiência que dá valor ao espaço.",
      ],
    },
    {
      titulo: "Regras de publicidade e próximo passo",
      paragrafos: [
        "Não são aceitos anúncios de serviços que prometam resultado impossível, de produtos falsificados, de conteúdo adulto ou de qualquer oferta que induza o leitor a erro técnico. Anunciantes do mesmo segmento de assistência técnica são avaliados caso a caso para evitar conflito com a operação do portal.",
        "Para receber formatos, posições e condições atualizadas, fale com o comercial pelo WhatsApp informando o segmento, a região de interesse e o período pretendido de veiculação.",
      ],
    },
  ],
};

export function blocos4n(path) {
  return BLOCOS_4N[path] ?? null;
}
