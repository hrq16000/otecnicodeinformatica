/**
 * Data-driven definitions for 50 problem/intent pages.
 * Each entry drives the ProblemaPageTemplate component.
 */

export interface ProblemaSintoma {
  titulo: string;
  desc: string;
  gravidade: string;
}

export interface ProblemaCausa {
  titulo: string;
  desc: string;
  tipo: "hardware" | "software" | "erro-humano" | "desgaste";
}

export interface ProblemaCenario {
  nivel: "Simples" | "Médio" | "Complexo";
  desc: string;
  tempo: string;
  custo: string;
}

export interface ProblemaPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  categoria: string;
  intro: string;
  sintomas: ProblemaSintoma[];
  causas: ProblemaCausa[];
  cenarios: ProblemaCenario[];
  riscos: string[];
  diagnostico: string;
  solucao: string;
  quandoCompensa: string;
  quandoNaoCompensa: string;
  whatsappMessage: string;
  relatedPages: { label: string; to: string }[];
  conteudoExtra: string;
}

const RELATED_BASE = [
  { label: "Como Funciona", to: "/como-funciona" },
  { label: "Preços e Políticas", to: "/precos-e-politicas" },
  { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
];

export const problemaPagesData: ProblemaPageData[] = [
  // ===== PROBLEMAS DE COMPUTADOR (1-10) =====
  {
    slug: "computador-nao-liga-curitiba",
    title: "Computador Não Liga em Curitiba | Diagnóstico Profissional",
    metaDescription: "Seu computador não liga? Veja causas reais, sintomas, riscos e como resolver com diagnóstico técnico em Curitiba. Atendimento a domicílio no mesmo dia.",
    h1: "Computador Não Liga em Curitiba — Causas Reais e Solução Profissional",
    categoria: "Problemas de Computador",
    intro: `Um computador que não liga pode gerar pânico — especialmente se você depende dele para trabalho, estudo ou uso diário. Mas antes de imaginar o pior cenário, saiba que esse é um dos problemas mais comuns que atendemos em Curitiba e região metropolitana. A maioria dos casos tem solução, desde que o diagnóstico seja feito corretamente.

O erro mais frequente é tentar resolver sem conhecimento técnico. Trocar peças por achismo, forçar botões, abrir o gabinete sem cuidado — tudo isso pode transformar um problema simples em algo caro e irreversível. Por isso, o primeiro passo é entender o que está acontecendo antes de agir.

Nesta página, você vai encontrar uma explicação completa sobre os sintomas mais comuns, as causas reais (e não as que aparecem no Google de forma genérica), os riscos de tentar resolver sozinho, e como funciona o atendimento técnico profissional para esse tipo de situação. Se o seu computador parou de ligar, você está no lugar certo.`,
    sintomas: [
      { titulo: "Nenhuma reação ao pressionar o botão", desc: "O computador simplesmente não responde. Nenhum LED, nenhum som, nenhuma ventoinha. Pode ser fonte queimada, botão power com defeito, curto na placa-mãe ou cabo de energia danificado.", gravidade: "Médio a complexo" },
      { titulo: "LEDs acendem mas tela fica preta", desc: "As ventoinhas giram, algum LED acende, mas o monitor não exibe nada. Isso geralmente indica problema com memória RAM, GPU, processador ou BIOS corrompida.", gravidade: "Médio" },
      { titulo: "Liga por segundos e desliga", desc: "O computador inicia por 2-5 segundos e se desliga sozinho. Causas comuns: superaquecimento crítico, fonte instável, curto na placa ou memória com defeito.", gravidade: "Médio a complexo" },
      { titulo: "Emite bips ao ligar", desc: "Sequências de bip indicam qual componente falhou. Cada padrão (curto, longo, repetido) aponta para memória, vídeo ou processador. É um código de erro da placa-mãe.", gravidade: "Médio" },
      { titulo: "Trava na tela do logo/BIOS", desc: "O computador inicia mas não passa da tela de boot. Pode ser disco rígido falhando, Windows corrompido, BIOS desatualizada ou dispositivo USB interferindo.", gravidade: "Simples a médio" },
      { titulo: "Tela azul (BSOD) ao iniciar", desc: "O Windows começa a carregar mas exibe tela azul com código de erro. Drivers corrompidos, atualizações com bug, HD/SSD com setores defeituosos são as causas mais comuns.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Fonte de alimentação queimada", desc: "A fonte converte energia da tomada para o computador. Picos de energia, uso prolongado e fontes de baixa qualidade são as principais causas de falha. Uma fonte que morre pode levar outros componentes junto.", tipo: "hardware" },
      { titulo: "Curto-circuito na placa-mãe", desc: "Pode ser causado por descarga eletrostática, parafuso solto dentro do gabinete, ou acúmulo de poeira condutiva. O curto impede qualquer tentativa de ligar.", tipo: "hardware" },
      { titulo: "Memória RAM com defeito ou mal encaixada", desc: "RAM oxidada, fora do slot ou com chips queimados impede o POST (Power On Self Test). O computador liga mas não exibe imagem.", tipo: "hardware" },
      { titulo: "Windows corrompido ou atualização com bug", desc: "Atualizações do Windows podem corromper arquivos de boot. O sistema tenta iniciar e falha, gerando loop ou tela azul.", tipo: "software" },
      { titulo: "Upgrade mal executado", desc: "Instalação incorreta de peças novas (RAM incompatível, SSD mal conectado, pasta térmica em excesso) pode impedir o computador de ligar.", tipo: "erro-humano" },
      { titulo: "Desgaste natural de componentes", desc: "Após 5-8 anos de uso, capacitores da placa-mãe estufam, pasta térmica seca, e contatos oxidam. O computador passa a falhar intermitentemente até parar.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Cabo solto, RAM mal encaixada, botão power com mau contato, ou configuração de BIOS alterada. Resolvido na visita técnica.", tempo: "30 min a 1h", custo: "Dentro da visita técnica" },
      { nivel: "Médio", desc: "Fonte queimada que precisa ser substituída, reinstalação de Windows, ou limpeza profunda com troca de pasta térmica.", tempo: "1h a 3h", custo: "R$ 150 a R$ 350 + peças" },
      { nivel: "Complexo", desc: "Curto na placa-mãe, reparo em trilhas, troca de capacitores, ou diagnóstico de GPU integrada com defeito. Requer bancada.", tempo: "2 a 7 dias úteis", custo: "R$ 250 a R$ 600+ dependendo do componente" },
    ],
    riscos: [
      "Curto-circuito por descarga eletrostática ao abrir o gabinete sem proteção",
      "Dano em conectores e trilhas da placa-mãe ao forçar componentes",
      "Troca de peças por achismo, gastando dinheiro em componentes errados",
      "Perda total de dados ao tentar formatar sem backup",
      "Queimar a fonte nova ao ligar sem testar a rede elétrica",
      "Perder a garantia do equipamento ao abrir sem autorização",
    ],
    diagnostico: `O diagnóstico é a etapa mais importante quando um computador não liga. Sem ele, qualquer tentativa de reparo é achismo — e achismo custa caro.

Nosso diagnóstico profissional inclui: teste de fonte com multímetro, verificação de curto-circuito na placa-mãe, teste individual de memória RAM, análise de GPU, verificação de processador e inspeção visual de capacitores e componentes.

O diagnóstico tem custo fixo de R$ 90 porque envolve tempo técnico real, uso de equipamentos profissionais e responsabilidade sobre a análise. Se o reparo for aprovado, o valor do diagnóstico é incorporado ao serviço.`,
    solucao: `Após o diagnóstico, apresentamos o laudo completo com: o que foi encontrado, o que precisa ser feito, quanto custa e quanto tempo leva.

Para casos simples (cabo, RAM, config), resolvemos na própria visita. Para casos médios (troca de fonte, reinstalação), geralmente resolvemos no mesmo dia. Para casos complexos (reparo de placa, troca de componentes SMD), o equipamento vai para bancada com prazo de 2 a 7 dias úteis.

Existe um valor mínimo pré-aprovado: se o reparo estiver dentro desse limite, já executamos sem necessidade de nova autorização. Se ultrapassar, o cliente é consultado antes.`,
    quandoCompensa: "Compensa reparar quando o computador tem menos de 6 anos, quando o custo do reparo é inferior a 40% do valor de um equivalente novo, quando os demais componentes estão em boas condições, e quando o equipamento atende às necessidades do usuário.",
    quandoNaoCompensa: "Não compensa quando o computador tem mais de 8 anos com múltiplos problemas, quando o custo do reparo se aproxima de um novo, quando há dano por líquido extenso, ou quando o hardware é muito defasado para as tarefas necessárias.",
    whatsappMessage: "Olá! Meu computador não liga. Podem me ajudar com diagnóstico?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Liga e Desliga", to: "/computador-liga-e-desliga-curitiba" },
      { label: "Computador Sem Vídeo", to: "/computador-sem-video-curitiba" },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
      { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
    ],
    conteudoExtra: `### Diferença Entre "Não Liga" e "Não Exibe Imagem"

Muitos clientes dizem que o computador "não liga" quando na verdade ele liga mas não exibe imagem. A diferença é crucial para o diagnóstico:

- **Não liga de verdade**: zero reação. Nenhum LED, nenhum som, nenhuma ventoinha. O problema está na alimentação (fonte, cabo, tomada) ou em curto na placa-mãe.
- **Liga mas não exibe**: ventoinhas giram, LEDs acendem, mas a tela fica preta. O problema está no vídeo (GPU, memória, monitor ou cabo de vídeo).

Essa distinção economiza tempo e dinheiro no diagnóstico.

### O Que Fazer Enquanto Espera o Técnico

1. Não tente abrir o computador
2. Anote se houve queda de energia, barulho estranho ou cheiro de queimado
3. Verifique se o problema é na tomada (teste outro aparelho)
4. Se possível, filme o comportamento ao tentar ligar
5. Tenha em mãos a nota fiscal ou informações do equipamento

### Atendimento em Curitiba e Região

Atendemos toda Curitiba (Centro, Batel, Portão, CIC, Santa Felicidade, Campo Comprido e todos os bairros), São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro e Quatro Barras.

O atendimento a domicílio está disponível no mesmo dia para a maioria das regiões, sujeito à disponibilidade da agenda.`,
  },

  {
    slug: "computador-liga-e-desliga-curitiba",
    title: "Computador Liga e Desliga Sozinho | Técnico Curitiba",
    metaDescription: "Computador ligando e desligando sozinho em Curitiba? Veja causas, riscos e solução profissional. Diagnóstico no mesmo dia.",
    h1: "Computador Liga e Desliga Sozinho em Curitiba — O Que Está Acontecendo?",
    categoria: "Problemas de Computador",
    intro: `Seu computador liga por alguns segundos e desliga? Ou funciona por minutos e reinicia sem aviso? Esse é um dos problemas mais frustrantes e também um dos mais perigosos para o hardware. Cada vez que o computador desliga abruptamente, existe risco de dano ao disco rígido, corrupção de dados e até queima de componentes.

Esse comportamento pode ter várias causas — desde algo simples como pasta térmica seca até problemas graves como curto na placa-mãe. O importante é não ignorar: um computador que liga e desliga repetidamente está tentando se proteger de algo, e continuar forçando pode piorar muito o problema.

Atendemos esse tipo de caso diariamente em Curitiba e região. Nesta página, explicamos tudo o que você precisa saber antes de buscar ajuda técnica.`,
    sintomas: [
      { titulo: "Desliga após 3-5 segundos", desc: "Mal inicia e já desliga. Indica proteção do processador por superaquecimento extremo ou curto-circuito na placa.", gravidade: "Complexo" },
      { titulo: "Desliga após 10-30 minutos de uso", desc: "Funciona normalmente por um tempo e depois desliga. Superaquecimento progressivo, pasta térmica seca ou ventoinha travada.", gravidade: "Médio" },
      { titulo: "Reinicia aleatoriamente", desc: "Desliga e liga sozinho em momentos imprevisíveis. Pode ser fonte instável, memória com defeito ou driver com bug.", gravidade: "Médio" },
      { titulo: "Desliga durante jogos ou programas pesados", desc: "Funciona no uso leve mas desliga sob carga. GPU superaquecendo, fonte subdimensionada ou throttling térmico.", gravidade: "Médio" },
      { titulo: "Desliga e não liga mais por minutos", desc: "Precisa esperar esfriar para ligar de novo. Superaquecimento severo com proteção térmica ativa.", gravidade: "Médio a complexo" },
    ],
    causas: [
      { titulo: "Superaquecimento do processador", desc: "Pasta térmica seca, cooler com poeira acumulada ou ventoinha travada fazem o processador atingir temperatura crítica. O sistema desliga para se proteger.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação instável", desc: "Uma fonte degradada pode não fornecer energia estável. Sob carga, a tensão cai e o sistema desliga. Fontes genéricas são as mais propensas.", tipo: "hardware" },
      { titulo: "Curto-circuito intermitente", desc: "Fios encostando, parafuso solto na placa ou trilha parcialmente danificada podem causar desligamentos aleatórios.", tipo: "hardware" },
      { titulo: "Memória RAM com defeito", desc: "RAM com setores corrompidos pode funcionar em operações leves mas falhar sob pressão, causando reinicializações.", tipo: "hardware" },
      { titulo: "Driver ou Windows corrompido", desc: "Drivers de vídeo com bug ou Windows com arquivos corrompidos podem causar tela azul seguida de reinício automático.", tipo: "software" },
      { titulo: "Overclock instável ou upgrade mal feito", desc: "Configurações de overclock agressivas ou upgrade de peças incompatíveis podem causar instabilidade.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna, troca de pasta térmica, reencaixe de componentes. Resolvido na visita.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Médio", desc: "Troca de fonte, troca de cooler, reinstalação de drivers ou Windows.", tempo: "2h a 4h", custo: "R$ 200 a R$ 400 + peças" },
      { nivel: "Complexo", desc: "Reparo de placa-mãe, diagnóstico de curto intermitente, troca de componentes SMD.", tempo: "3 a 7 dias úteis", custo: "R$ 300 a R$ 600+" },
    ],
    riscos: [
      "Cada desligamento abrupto pode danificar o disco rígido e corromper dados",
      "Continuar usando força o hardware ao limite e pode queimar componentes",
      "Trocar peças por achismo sem diagnóstico desperdiça dinheiro",
      "Abrir o gabinete sem conhecimento pode causar descarga eletrostática",
      "Ignorar o problema pode transformar reparo simples em substituição total",
    ],
    diagnostico: `O diagnóstico para computador que liga e desliga envolve: monitoramento de temperatura em tempo real, teste de estresse do processador e GPU, análise da fonte com multímetro sob carga, teste de memória RAM por horas, e inspeção da placa-mãe com lupa.

É um dos diagnósticos mais detalhados porque o problema pode ser intermitente — ou seja, nem sempre aparece na primeira tentativa. Por isso o diagnóstico profissional é essencial: R$ 90 de investimento que podem economizar centenas em peças trocadas sem necessidade.`,
    solucao: `Após identificar a causa exata, o reparo pode variar desde uma simples limpeza (30 min) até reparo em bancada (dias). O laudo técnico detalha exatamente o que foi encontrado e o que precisa ser feito.

Para superaquecimento: limpeza profunda + troca de pasta térmica. Para fonte: substituição por modelo adequado. Para placa-mãe: reparo em bancada com equipamento profissional.`,
    quandoCompensa: "Compensa reparar na maioria dos casos de superaquecimento e fonte. O custo é baixo comparado a um computador novo e o equipamento volta a funcionar normalmente.",
    quandoNaoCompensa: "Não compensa quando há múltiplos curtos na placa-mãe de equipamento antigo, quando o processador foi danificado pelo calor excessivo, ou quando o custo total ultrapassa 50% de um novo.",
    whatsappMessage: "Olá! Meu computador está ligando e desligando sozinho. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
    ],
    conteudoExtra: `### Por Que o Computador Desliga Sozinho?

O computador tem mecanismos de autoproteção. Quando a temperatura do processador ultrapassa o limite seguro (geralmente 95-105°C), o sistema desliga automaticamente para evitar dano permanente. Da mesma forma, quando a fonte não consegue fornecer energia estável, o computador se desliga para proteger os componentes.

### O Que NÃO Fazer

1. Não continue usando o computador normalmente — cada desligamento pode causar mais dano
2. Não tente resolver com ventilador externo — o problema é interno
3. Não reinstale Windows achando que é software — na maioria das vezes é hardware
4. Não compre fonte nova sem diagnóstico — pode não ser a fonte

### Atendimento Urgente em Curitiba

Para casos de computador ligando e desligando, priorizamos o atendimento por se tratar de risco de dano progressivo. Atendemos toda Curitiba e região metropolitana com visita técnica no mesmo dia.`,
  },

  {
    slug: "computador-lento-curitiba",
    title: "Computador Lento em Curitiba | Soluções Reais",
    metaDescription: "Computador lento em Curitiba? Descubra as causas reais e como resolver. Diagnóstico profissional, upgrade SSD, limpeza e otimização. Atendimento no mesmo dia.",
    h1: "Computador Lento em Curitiba — Diagnóstico e Soluções Reais",
    categoria: "Problemas de Computador",
    intro: `Um computador lento é mais do que inconveniente — é perda de produtividade, estresse diário e frustração acumulada. Programas que demoram para abrir, navegador que trava, sistema que leva minutos para iniciar. Esses sintomas são extremamente comuns e quase sempre têm solução.

O problema é que "computador lento" pode ter dezenas de causas diferentes. Desde algo simples como disco cheio até problemas sérios como HD com setores defeituosos. E a solução varia drasticamente: pode ser uma limpeza de software (30 minutos) ou a necessidade de um upgrade completo.

Atendemos centenas de casos de computador lento por mês em Curitiba e região. Nesta página, explicamos as causas reais — sem marketing genérico — e como funciona o diagnóstico profissional.`,
    sintomas: [
      { titulo: "Demora muito para iniciar (boot lento)", desc: "Windows leva 3-10 minutos para ficar usável. HD mecânico antigo, muitos programas no iniciar, ou disco com erro.", gravidade: "Simples a médio" },
      { titulo: "Programas travam ou demoram para abrir", desc: "Tudo abre devagar, às vezes congela. Pode ser falta de RAM, disco cheio ou malware consumindo recursos.", gravidade: "Simples a médio" },
      { titulo: "Navegador pesado e lento", desc: "Chrome/Edge consome muita RAM e fica travando. Muitas extensões, abas demais ou RAM insuficiente.", gravidade: "Simples" },
      { titulo: "Disco em 100% constantemente", desc: "No Gerenciador de Tarefas, o disco aparece em 100%. HD mecânico desgastado, Windows Update pesado ou malware.", gravidade: "Médio" },
      { titulo: "Lento apenas em jogos ou programas pesados", desc: "Uso geral funciona bem, mas trava em programas exigentes. Hardware insuficiente ou superaquecimento sob carga.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "HD mecânico antigo", desc: "HDs tradicionais são 10-50x mais lentos que SSDs. Após 4-5 anos, ficam ainda piores com setores desgastados. A troca por SSD é a melhoria mais impactante.", tipo: "desgaste" },
      { titulo: "Pouca memória RAM", desc: "Com 4GB de RAM, o Windows 10/11 já fica sobrecarregado. Chrome sozinho pode usar 2-3GB. 8GB é o mínimo recomendado.", tipo: "hardware" },
      { titulo: "Malware e programas indesejados", desc: "Vírus, mineradores de criptomoeda ocultos e programas que se instalam sozinhos consomem recursos silenciosamente.", tipo: "software" },
      { titulo: "Windows corrompido ou desatualizado", desc: "Anos de atualizações e instalações acumulam lixo no sistema. Arquivos corrompidos e registro inchado degradam a performance.", tipo: "software" },
      { titulo: "Superaquecimento (throttling)", desc: "Quando o processador esquenta demais, ele reduz a velocidade para se proteger. Pasta térmica seca e cooler sujo são as causas.", tipo: "desgaste" },
      { titulo: "Hardware subdimensionado", desc: "Processador antigo tentando rodar software moderno. Não é defeito — é limitação. Nesse caso, upgrade ou troca é a solução.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de software, remoção de programas desnecessários, desativação de inicialização automática.", tempo: "1h", custo: "R$ 100 a R$ 150" },
      { nivel: "Médio", desc: "Upgrade de SSD + reinstalação limpa do Windows, ou upgrade de RAM + limpeza interna.", tempo: "2h a 4h", custo: "R$ 250 a R$ 500 com peças" },
      { nivel: "Complexo", desc: "Diagnóstico de hardware, reparo de setores de HD para recuperação de dados + upgrade completo.", tempo: "1 a 3 dias", custo: "R$ 400 a R$ 800+" },
    ],
    riscos: [
      "Formatar sem diagnóstico pode não resolver — o problema pode ser hardware",
      "Instalar 'programas de limpeza' pode piorar com adware e lixo extra",
      "Ignorar disco em 100% pode levar à perda de dados quando o HD falhar de vez",
      "Upgrade errado (RAM incompatível, SSD sem suporte) desperdiça investimento",
    ],
    diagnostico: `O diagnóstico de computador lento analisa: velocidade real do disco (leitura/escrita), uso de memória RAM, temperatura do processador, presença de malware, integridade do Windows e saúde do HD/SSD.

Em 80% dos casos que atendemos, a causa principal é HD mecânico antigo + pouca RAM. A solução mais eficiente é upgrade para SSD + 8GB de RAM, combinado com instalação limpa do Windows.`,
    solucao: `A solução depende do diagnóstico. Para a maioria dos computadores lentos: upgrade de SSD (melhoria de 5-10x na velocidade) + limpeza de software resolve. Para casos com hardware defasado, recomendamos a troca com transparência total sobre custos.

Sempre apresentamos as opções e deixamos o cliente decidir. Não forçamos upgrade desnecessário nem prometemos milagre.`,
    quandoCompensa: "Compensa investir em upgrade quando o processador ainda dá conta (i3 8ª geração ou superior, Ryzen 3000+), quando o equipamento tem menos de 6 anos e quando o upgrade custa menos de 30% de um novo.",
    quandoNaoCompensa: "Não compensa quando o processador é muito antigo (anterior a 2015), quando a placa-mãe não suporta SSD ou mais RAM, ou quando há múltiplos problemas simultâneos.",
    whatsappMessage: "Olá! Meu computador está muito lento. Podem me ajudar com diagnóstico?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
      { label: "Formatação", to: "/servicos/formatacao-computador" },
      { label: "Windows Lento", to: "/windows-lento-curitiba" },
    ],
    conteudoExtra: `### A Solução Mais Eficiente: SSD

Em 80% dos casos de computador lento, a troca do HD por SSD é a solução definitiva. O computador que levava 5 minutos para iniciar passa a levar 20 segundos. Programas que demoravam 30 segundos abrem em 3.

O upgrade de SSD é o melhor custo-benefício em informática hoje. Com R$ 200-350 (SSD + serviço), você transforma um computador lento em uma máquina rápida.

### O Que NÃO Resolve

- CCleaner e programas similares: limpam pouco e podem causar problemas
- Desfragmentação: inútil em SSDs e pouco eficaz em HDs modernos
- Desinstalar programas aleatoriamente: pode remover algo importante
- Adicionar RAM sem trocar o HD: a melhoria é pequena se o disco é o gargalo

### Atendimento em Curitiba

Fazemos o upgrade de SSD com clonagem do sistema — você não perde nada e não precisa reinstalar programas. Atendimento a domicílio em toda Curitiba e região metropolitana.`,
  },

  {
    slug: "computador-travando-curitiba",
    title: "Computador Travando em Curitiba | Causas e Soluções",
    metaDescription: "Computador travando constantemente? Veja causas reais, desde hardware até software, e como resolver com diagnóstico profissional em Curitiba.",
    h1: "Computador Travando em Curitiba — Causas Reais e Diagnóstico",
    categoria: "Problemas de Computador",
    intro: `Computador que trava no meio do trabalho, congela durante jogos ou simplesmente para de responder — esse problema é tão comum quanto frustrante. E o pior: as causas podem ser muito variadas, desde falta de memória RAM até HD prestes a falhar.

O travamento pode ser pontual (acontece de vez em quando) ou constante. Quando é constante, geralmente indica um problema de hardware que vai piorar com o tempo. Quando é pontual, pode ser software — mas também pode ser um sinal de alerta precoce.

Nesta página, explicamos os tipos de travamento, suas causas reais e quando é hora de buscar ajuda profissional.`,
    sintomas: [
      { titulo: "Congela completamente", desc: "Mouse e teclado param de responder. Precisa forçar desligamento.", gravidade: "Médio a complexo" },
      { titulo: "Trava e volta sozinho", desc: "Congela por segundos e depois volta ao normal. Geralmente disco ou RAM.", gravidade: "Simples a médio" },
      { titulo: "Trava em programas específicos", desc: "Só congela em jogos ou aplicações pesadas. Hardware insuficiente ou superaquecimento.", gravidade: "Simples a médio" },
      { titulo: "Trava com tela azul", desc: "Aparece tela azul do Windows (BSOD) com código de erro. Driver ou hardware com defeito.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "HD com setores defeituosos", desc: "Um HD danificado causa travamentos constantes enquanto tenta ler dados corrompidos. É a causa mais perigosa pois indica que o disco pode falhar a qualquer momento.", tipo: "hardware" },
      { titulo: "Memória RAM insuficiente ou com defeito", desc: "RAM lotada força o Windows a usar o disco como memória virtual, causando lentidão extrema e travamentos.", tipo: "hardware" },
      { titulo: "Superaquecimento", desc: "Processador que atinge temperatura crítica reduz velocidade (throttling) ou trava o sistema para se proteger.", tipo: "desgaste" },
      { titulo: "Driver incompatível ou corrompido", desc: "Drivers de vídeo, áudio ou chipset com bug causam travamentos específicos, especialmente após atualizações.", tipo: "software" },
      { titulo: "Malware consumindo recursos", desc: "Vírus e mineradores usam CPU e RAM em segundo plano, causando travamentos quando o sistema fica sem recursos.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Atualização de drivers, limpeza de software, aumento de memória virtual.", tempo: "1h", custo: "R$ 100 a R$ 150" },
      { nivel: "Médio", desc: "Upgrade de RAM, troca de HD por SSD, reinstalação de Windows.", tempo: "2h a 4h", custo: "R$ 200 a R$ 500" },
      { nivel: "Complexo", desc: "Reparo de placa-mãe, substituição de GPU, recuperação de dados de HD falhando.", tempo: "2 a 5 dias", custo: "R$ 300 a R$ 700+" },
    ],
    riscos: [
      "Cada travamento pode corromper arquivos e causar perda de dados",
      "Forçar desligamento repetidamente danifica o disco rígido",
      "Ignorar tela azul pode levar a falha completa do sistema",
      "Continuar usando com HD defeituoso pode tornar dados irrecuperáveis",
    ],
    diagnostico: `Diagnóstico de travamento exige análise completa: teste de memória (MemTest), verificação de saúde do disco (SMART), monitoramento de temperaturas, análise de logs do Windows e teste de estabilidade sob carga. Custo: R$ 90.`,
    solucao: `Após identificar a causa, o reparo pode ir desde simples otimização até troca de componentes. O laudo detalha o problema encontrado, a solução proposta e o custo antes da execução.`,
    quandoCompensa: "Compensa reparar quando a causa é identificável e o custo do reparo é razoável frente ao valor do equipamento.",
    quandoNaoCompensa: "Não compensa quando há múltiplos componentes falhando, indicando desgaste generalizado do equipamento.",
    whatsappMessage: "Olá! Meu computador está travando muito. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
    ],
    conteudoExtra: `### Travamento vs Lentidão

Travamento é quando o computador para de responder completamente. Lentidão é quando funciona devagar mas ainda responde. Embora pareçam similares, as causas podem ser bem diferentes:

- **Travamento** → geralmente hardware (RAM, HD, placa-mãe)
- **Lentidão** → geralmente software ou disco antigo

### Quando é Urgente

Se o computador trava e você ouve cliques vindos do HD, é sinal de falha iminente. Faça backup imediato e procure diagnóstico — seus dados estão em risco.`,
  },

  {
    slug: "computador-sem-video-curitiba",
    title: "Computador Sem Vídeo em Curitiba | Tela Preta",
    metaDescription: "Computador liga mas não exibe imagem? Veja causas e soluções. Diagnóstico de GPU, RAM e placa-mãe em Curitiba. Atendimento técnico no mesmo dia.",
    h1: "Computador Sem Vídeo em Curitiba — Liga Mas Tela Fica Preta",
    categoria: "Problemas de Computador",
    intro: `O computador liga — você ouve ventoinhas, vê LEDs — mas o monitor continua preto. Esse é um problema extremamente comum e que pode ter causas variadas, desde algo trivial como cabo de vídeo solto até problemas sérios como GPU queimada.

O importante é entender que "sem vídeo" não é o mesmo que "não liga". Se o computador mostra sinais de vida (LEDs, ventoinhas, sons), o problema está especificamente na saída de vídeo ou nos componentes responsáveis pela inicialização visual.

Em Curitiba e região, atendemos esse tipo de caso com diagnóstico profissional que identifica a causa exata em vez de trocar peças por achismo.`,
    sintomas: [
      { titulo: "Tela completamente preta", desc: "Monitor não recebe sinal algum. GPU, RAM ou placa-mãe podem ser a causa.", gravidade: "Médio" },
      { titulo: "Tela preta com cursor piscando", desc: "Windows não carrega mas há sinal de vídeo. Boot corrompido ou disco com falha.", gravidade: "Simples a médio" },
      { titulo: "Imagem distorcida ou com artefatos", desc: "Pixels coloridos, listras ou imagem embaralhada. GPU com defeito ou driver corrompido.", gravidade: "Médio a complexo" },
      { titulo: "Funciona no integrado mas não na placa de vídeo", desc: "Monitor funciona conectado na placa-mãe mas não na GPU. Placa de vídeo com defeito.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Cabo de vídeo ou monitor", desc: "Cabo HDMI/VGA/DisplayPort com defeito ou monitor configurado no canal errado. É a causa mais simples e mais comum.", tipo: "hardware" },
      { titulo: "Memória RAM mal encaixada ou oxidada", desc: "RAM fora do slot ou com contatos sujos impede o POST. O computador liga mas não inicia o vídeo.", tipo: "hardware" },
      { titulo: "GPU com defeito", desc: "Placa de vídeo queimada, com solda fria ou degradada por calor excessivo. Comum em GPUs antigas ou usadas em mineração.", tipo: "hardware" },
      { titulo: "BIOS corrompida", desc: "Atualização de BIOS que falhou ou corrupção por queda de energia pode impedir a inicialização visual.", tipo: "software" },
      { titulo: "Processador ou socket danificado", desc: "Pinos tortos no socket ou processador com defeito podem impedir o POST. Menos comum mas possível.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de cabo, reencaixe de RAM, limpeza de contatos. Resolvido na visita.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Teste e substituição de GPU, reinstalação de drivers em modo seguro.", tempo: "1h a 3h", custo: "R$ 150 a R$ 350" },
      { nivel: "Complexo", desc: "Reparo de GPU (reballing), recuperação de BIOS, diagnóstico de placa-mãe.", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 800+" },
    ],
    riscos: [
      "Forçar cabo no conector errado pode danificar a saída de vídeo",
      "Trocar GPU sem diagnóstico pode desperdiçar dinheiro se o problema é outro",
      "Reballing caseiro destrói a GPU definitivamente",
      "Tentar atualizar BIOS sem conhecimento pode inutilizar a placa-mãe",
    ],
    diagnostico: `Diagnóstico de vídeo inclui: teste com monitor e cabo alternativos, reencaixe de RAM e GPU, teste de vídeo integrado vs dedicado, verificação de BIOS e inspeção visual da placa-mãe. Custo: R$ 90.`,
    solucao: `Identificada a causa, o reparo varia. Para cabo/monitor: solução imediata. Para RAM: limpeza e reencaixe. Para GPU: substituição ou reballing em bancada. Sempre com laudo e aprovação antes da execução.`,
    quandoCompensa: "Compensa quando é apenas cabo, RAM ou driver. Para GPU, depende do valor da placa e do custo do reparo.",
    quandoNaoCompensa: "Não compensa reballing de GPU de baixo valor ou reparo de placa-mãe com múltiplos defeitos.",
    whatsappMessage: "Olá! Meu computador liga mas a tela fica preta. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
      { label: "Tela Preta", to: "/computador-com-tela-preta-curitiba" },
      { label: "GPU Desgastada", to: "/gpu-desgastada" },
    ],
    conteudoExtra: `### Teste Rápido Antes de Chamar o Técnico

1. Verifique se o monitor está ligado e no canal correto (HDMI, VGA, etc.)
2. Teste outro cabo de vídeo se possível
3. Se tem vídeo integrado na placa-mãe, teste conectando o monitor nela
4. Ouça se há bips — eles indicam qual componente falhou

### Atendimento em Curitiba

Atendemos toda Curitiba e região com diagnóstico de vídeo no mesmo dia. Para casos que precisam de bancada, fazemos coleta e entrega.`,
  },

  {
    slug: "computador-com-tela-preta-curitiba",
    title: "Computador com Tela Preta em Curitiba | Solução",
    metaDescription: "Tela preta no computador? Veja as causas mais comuns e como resolver. Diagnóstico profissional em Curitiba com atendimento no mesmo dia.",
    h1: "Computador com Tela Preta em Curitiba — Causas e Solução",
    categoria: "Problemas de Computador",
    intro: `Tela preta é um sintoma, não um diagnóstico. Pode aparecer em momentos diferentes (ao ligar, após o logo do Windows, durante o uso) e cada momento indica uma causa diferente. É um dos problemas que mais causa confusão porque o cliente não sabe se o computador está ligado ou não.

A boa notícia é que a maioria dos casos de tela preta tem solução — desde que diagnosticado corretamente. O erro mais comum é assumir que "o monitor quebrou" ou que "a placa de vídeo queimou" sem testar.

Nesta página, diferenciamos os tipos de tela preta e explicamos o que cada um significa.`,
    sintomas: [
      { titulo: "Tela preta total desde o início", desc: "Nenhuma imagem em nenhum momento. Problema na saída de vídeo, RAM ou placa-mãe.", gravidade: "Médio a complexo" },
      { titulo: "Tela preta após logo do Windows", desc: "BIOS aparece mas Windows não carrega. Sistema corrompido, driver com bug ou disco com falha.", gravidade: "Simples a médio" },
      { titulo: "Tela preta durante o uso", desc: "Imagem some de repente. GPU superaquecendo, driver travando ou cabo com mau contato.", gravidade: "Médio" },
      { titulo: "Tela preta com som funcionando", desc: "Você ouve o Windows mas não vê nada. Problema específico de vídeo — GPU, cabo ou monitor.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Monitor desligado ou no canal errado", desc: "Parece óbvio mas é a causa em 15% dos casos. Monitor no HDMI2 e cabo no HDMI1, por exemplo.", tipo: "erro-humano" },
      { titulo: "Driver de vídeo corrompido", desc: "Após atualização do Windows ou do driver NVIDIA/AMD, o sistema pode não iniciar o display corretamente.", tipo: "software" },
      { titulo: "GPU com defeito ou superaquecimento", desc: "Placa de vídeo com solda fria, capacitor estufado ou pasta térmica seca.", tipo: "hardware" },
      { titulo: "RAM com defeito", desc: "Memória que impede o POST gera tela preta sem bips em algumas placas-mãe.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de canal do monitor, troca de cabo, boot em modo seguro para corrigir driver.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Reinstalação de drivers, reencaixe de GPU, limpeza + pasta térmica.", tempo: "1h a 3h", custo: "R$ 150 a R$ 300" },
      { nivel: "Complexo", desc: "Diagnóstico e reparo de GPU ou placa-mãe em bancada.", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 700+" },
    ],
    riscos: [
      "Comprar monitor novo achando que é o problema quando não é",
      "Trocar GPU sem diagnóstico — pode ser apenas driver",
      "Forçar desligamentos repetidos danifica o disco",
    ],
    diagnostico: `Diagnóstico específico para tela preta: teste cruzado com outro monitor/cabo, boot em modo seguro, teste de vídeo integrado, inspeção de componentes. Custo: R$ 90.`,
    solucao: `Após o diagnóstico, a solução pode ser imediata (cable swap, driver fix) ou exigir bancada (reparo de GPU). Sempre com laudo completo.`,
    quandoCompensa: "Na maioria dos casos compensa — a causa geralmente é simples e o reparo tem bom custo-benefício.",
    quandoNaoCompensa: "Não compensa quando a GPU de um computador antigo precisa de reballing caro.",
    whatsappMessage: "Olá! Meu computador está com tela preta. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Sem Vídeo", to: "/computador-sem-video-curitiba" },
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
    ],
    conteudoExtra: `### Diferença Entre Tela Preta e Sem Vídeo

São termos que os clientes usam de forma intercambiável, mas tecnicamente:
- **Tela preta**: o monitor recebe sinal mas exibe preto (driver, Windows)
- **Sem vídeo**: o monitor não recebe sinal algum (hardware)

A distinção é importante para o diagnóstico correto.`,
  },

  {
    slug: "pc-reiniciando-sozinho-curitiba",
    title: "PC Reiniciando Sozinho em Curitiba | Diagnóstico",
    metaDescription: "Computador reiniciando sozinho? Descubra as causas e soluções. Diagnóstico profissional em Curitiba com atendimento a domicílio.",
    h1: "PC Reiniciando Sozinho em Curitiba — Por Que Acontece?",
    categoria: "Problemas de Computador",
    intro: `Um PC que reinicia sozinho está tentando dizer alguma coisa. Pode ser uma proteção contra superaquecimento, um driver com bug, ou até um sinal de que o hardware está falhando. Em qualquer caso, ignorar é a pior opção.

O Windows tem uma configuração padrão que reinicia automaticamente quando ocorre erro grave (tela azul). Muitas vezes o computador reinicia tão rápido que o usuário nem vê a tela azul — só percebe que reiniciou.

Diagnosticar reinicializações aleatórias exige paciência e método. São várias possibilidades e eliminar cada uma requer testes específicos.`,
    sintomas: [
      { titulo: "Reinicia durante o uso normal", desc: "Está navegando ou trabalhando e o PC reinicia sem aviso. Pode ser driver, RAM ou Windows Update.", gravidade: "Simples a médio" },
      { titulo: "Reinicia em jogos ou programas pesados", desc: "Acontece sob carga. GPU ou CPU superaquecendo, fonte insuficiente.", gravidade: "Médio" },
      { titulo: "Reinicia em loop (boot loop)", desc: "Liga, tenta iniciar e reinicia infinitamente. Windows corrompido ou hardware crítico falhando.", gravidade: "Médio a complexo" },
      { titulo: "Reinicia com tela azul rápida", desc: "Aparece tela azul por um instante e reinicia. BSOD com erro específico que indica a causa.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Windows Update problemático", desc: "Atualizações do Windows podem causar incompatibilidades com drivers existentes.", tipo: "software" },
      { titulo: "Fonte de alimentação instável", desc: "Fonte degradada que não entrega energia consistente causa reinicializações sob carga.", tipo: "hardware" },
      { titulo: "Superaquecimento", desc: "Proteção térmica reinicia o sistema quando temperatura ultrapassa o limite.", tipo: "desgaste" },
      { titulo: "RAM com erro", desc: "Módulo de memória com setores defeituosos causa erros aleatórios que resultam em reinício.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Correção de driver, desinstalação de update problemático. Visita técnica.", tempo: "1h", custo: "R$ 100 a R$ 150" },
      { nivel: "Médio", desc: "Troca de pasta térmica, limpeza, teste e substituição de RAM.", tempo: "2h a 3h", custo: "R$ 150 a R$ 350" },
      { nivel: "Complexo", desc: "Troca de fonte, reparo de placa-mãe, diagnóstico completo em bancada.", tempo: "2 a 5 dias", custo: "R$ 250 a R$ 600+" },
    ],
    riscos: [
      "Reinicializações constantes corrompem o sistema de arquivos",
      "Podem causar perda de trabalho não salvo",
      "HD/SSD sofre com desligamentos abruptos repetidos",
    ],
    diagnostico: `Análise de logs do Windows (Event Viewer), teste de estresse de CPU e GPU, teste de memória RAM (MemTest86), medição de tensão da fonte sob carga. Custo: R$ 90.`,
    solucao: `Depende da causa encontrada. Para software: correção de drivers e sistema. Para hardware: substituição do componente defeituoso. Sempre com diagnóstico antes.`,
    quandoCompensa: "Compensa na maioria dos casos — a causa geralmente é identificável e o reparo tem bom custo.",
    quandoNaoCompensa: "Não compensa quando múltiplos componentes estão falhando em equipamento antigo.",
    whatsappMessage: "Olá! Meu PC fica reiniciando sozinho. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Liga e Desliga", to: "/computador-liga-e-desliga-curitiba" },
      { label: "Superaquecendo", to: "/pc-superaquecendo-curitiba" },
    ],
    conteudoExtra: `### Como Ver a Tela Azul

O Windows reinicia automaticamente após tela azul. Para ver o erro: Painel de Controle > Sistema > Configurações avançadas > Inicialização e recuperação > desmarque "Reiniciar automaticamente". Na próxima tela azul, o código de erro ficará visível.`,
  },

  {
    slug: "pc-superaquecendo-curitiba",
    title: "PC Superaquecendo em Curitiba | Limpeza e Reparo",
    metaDescription: "Computador superaquecendo? Veja causas, riscos e soluções profissionais em Curitiba. Limpeza interna, troca de pasta térmica e diagnóstico.",
    h1: "PC Superaquecendo em Curitiba — Causas e Solução Profissional",
    categoria: "Problemas de Computador",
    intro: `Um computador que esquenta demais não é apenas desconfortável — é um risco real para o hardware. Processadores, GPUs e outros componentes têm limites de temperatura, e ultrapassá-los causa degradação permanente e falhas.

O superaquecimento é uma das causas mais comuns de outros problemas: computador lento (throttling), desligamentos aleatórios, travamentos e até queima de componentes. Resolver o superaquecimento geralmente resolve vários problemas de uma vez.

Na maioria dos casos, a solução é simples: limpeza interna profissional + troca de pasta térmica. Mas existem situações mais complexas que exigem diagnóstico.`,
    sintomas: [
      { titulo: "Gabinete/notebook muito quente ao toque", desc: "Calor excessivo saindo pelas aberturas de ventilação.", gravidade: "Simples a médio" },
      { titulo: "Ventoinhas em velocidade máxima constante", desc: "Barulho alto de ventilação o tempo todo. Tentativa do sistema de resfriar.", gravidade: "Simples" },
      { titulo: "Desliga durante jogos ou programas pesados", desc: "Proteção térmica ativa sob carga. Processo ou GPU atingindo limite.", gravidade: "Médio" },
      { titulo: "Lentidão progressiva durante o uso", desc: "Começa bem e fica lento conforme esquenta. Throttling térmico.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Pasta térmica seca", desc: "A pasta térmica entre processador e cooler seca após 2-4 anos, perdendo eficiência de condução de calor. É a causa mais comum.", tipo: "desgaste" },
      { titulo: "Poeira acumulada", desc: "Poeira bloqueia a passagem de ar nas ventoinhas e dissipadores, reduzindo a capacidade de resfriamento.", tipo: "desgaste" },
      { titulo: "Ventoinha travada ou com defeito", desc: "Cooler que não gira ou gira devagar não refrigera adequadamente.", tipo: "hardware" },
      { titulo: "Ambiente mal ventilado", desc: "Computador em local fechado, apertado ou exposto ao sol reduz a dissipação de calor.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna completa + troca de pasta térmica. Resolve 80% dos casos.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Médio", desc: "Troca de cooler/ventoinha + limpeza + pasta térmica.", tempo: "2h", custo: "R$ 200 a R$ 350 + peça" },
      { nivel: "Complexo", desc: "Reparo de sistema de refrigeração, troca de pads térmicos em notebook, reparo de heatpipe.", tempo: "2 a 5 dias", custo: "R$ 250 a R$ 500+" },
    ],
    riscos: [
      "Calor excessivo degrada processador e GPU permanentemente",
      "Pode causar solda fria em componentes da placa-mãe",
      "Disco rígido sofre com calor e pode falhar prematuramente",
      "Capacitores estufam e explodem com temperatura alta constante",
    ],
    diagnostico: `Monitoramento de temperatura com software profissional, inspeção visual de ventoinhas e dissipadores, teste de estresse térmico para reproduzir o problema. Custo: R$ 90.`,
    solucao: `Para a maioria dos casos: limpeza interna profissional com ar comprimido + aspiração + troca de pasta térmica de qualidade. Para notebooks: desmontagem completa, limpeza e troca de pads térmicos quando necessário.`,
    quandoCompensa: "Sempre compensa manter a refrigeração em dia. O custo da limpeza é mínimo comparado ao custo de substituir componentes queimados por calor.",
    quandoNaoCompensa: "Não se aplica — a manutenção preventiva de temperatura sempre compensa.",
    whatsappMessage: "Olá! Meu computador está superaquecendo. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Liga e Desliga", to: "/computador-liga-e-desliga-curitiba" },
      { label: "Barulho Estranho", to: "/pc-com-barulho-estranho-curitiba" },
    ],
    conteudoExtra: `### Temperaturas Normais vs Preocupantes

| Componente | Normal | Aceitável | Preocupante | Crítico |
|---|---|---|---|---|
| CPU em repouso | 30-45°C | 45-55°C | 55-70°C | 70°C+ |
| CPU sob carga | 55-75°C | 75-85°C | 85-95°C | 95°C+ |
| GPU sob carga | 60-80°C | 80-90°C | 90-100°C | 100°C+ |

### Manutenção Preventiva

Recomendamos limpeza interna + pasta térmica a cada 12-18 meses para desktops e notebooks. É a manutenção mais barata e eficiente para prolongar a vida útil do computador.`,
  },

  {
    slug: "pc-com-barulho-estranho-curitiba",
    title: "PC com Barulho Estranho em Curitiba | Diagnóstico",
    metaDescription: "Computador fazendo barulho estranho? Cliques, zumbidos ou ventoinhas altas? Veja o que pode ser e quando procurar técnico em Curitiba.",
    h1: "PC com Barulho Estranho em Curitiba — O Que Significa?",
    categoria: "Problemas de Computador",
    intro: `Barulhos novos vindos do computador são sinais de alerta que não devem ser ignorados. Cada tipo de barulho indica um componente diferente e um nível de urgência diferente. Cliques vindos do HD, por exemplo, são emergência — significam que o disco está falhando e seus dados estão em risco.

Nesta página, explicamos os tipos de barulho, o que cada um significa e quando é hora de agir.`,
    sintomas: [
      { titulo: "Cliques repetitivos", desc: "Som de 'tec-tec-tec' vindo do gabinete. HD com cabeça de leitura batendo — sinal de falha iminente.", gravidade: "Complexo - URGENTE" },
      { titulo: "Zumbido ou vibração", desc: "Vibração constante. Ventoinha desbalanceada, parafuso solto ou HD vibrando.", gravidade: "Simples" },
      { titulo: "Ventoinha muito alta", desc: "Barulho de 'avião decolando'. Ventoinhas em velocidade máxima por superaquecimento.", gravidade: "Simples a médio" },
      { titulo: "Apito ou chiado eletrônico", desc: "Som agudo vindo da placa-mãe ou fonte. Coil whine ou capacitor com problema.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "HD com falha mecânica", desc: "Cliques indicam que a cabeça de leitura não consegue posicionar. Dados em risco. Backup urgente!", tipo: "hardware" },
      { titulo: "Ventoinha com rolamento desgastado", desc: "Rolamento do cooler desgastado causa zumbido ou vibração. Troca simples.", tipo: "desgaste" },
      { titulo: "Poeira acumulada nas ventoinhas", desc: "Poeira desbalanceia as pás e causa vibração e barulho.", tipo: "desgaste" },
      { titulo: "Coil whine", desc: "Vibração de bobinas em placas de vídeo ou fontes sob carga. Normal em alguns modelos mas pode indicar componente estressado.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de ventoinhas, fixação de parafusos, troca de cooler.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 200" },
      { nivel: "Médio", desc: "Troca de HD com migração de dados para SSD.", tempo: "2h a 4h", custo: "R$ 250 a R$ 500" },
      { nivel: "Complexo", desc: "Recuperação de dados de HD com cliques + substituição.", tempo: "3 a 10 dias", custo: "R$ 400 a R$ 1500+ (recuperação)" },
    ],
    riscos: [
      "Ignorar cliques de HD pode resultar em perda total de dados",
      "Ventoinha travada causa superaquecimento progressivo",
      "Vibração constante pode soltar componentes internos",
    ],
    diagnostico: `Identificação do componente responsável pelo barulho, teste de saúde do HD (SMART), inspeção de ventoinhas e análise de fonte. Custo: R$ 90.`,
    solucao: `Depende da origem: ventoinhas → limpeza ou troca. HD → backup urgente + migração para SSD. Fonte → substituição.`,
    quandoCompensa: "Sempre compensa investigar barulhos — o custo da prevenção é muito menor que o da recuperação de dados.",
    quandoNaoCompensa: "Recuperação de dados de HD com dano severo pode não justificar o custo dependendo da importância dos dados.",
    whatsappMessage: "Olá! Meu computador está fazendo barulho estranho. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "HD Não Reconhece", to: "/pc-nao-reconhece-hd-curitiba" },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
    ],
    conteudoExtra: `### URGENTE: Se o HD Está Clicando

Se você ouve cliques vindos do computador, pare de usar imediatamente e faça backup do que puder. Cada minuto de uso com HD clicando reduz as chances de recuperação dos dados. Não desligue e ligue repetidamente — isso piora.`,
  },

  {
    slug: "pc-nao-reconhece-hd-curitiba",
    title: "PC Não Reconhece HD/SSD em Curitiba | Diagnóstico",
    metaDescription: "Computador não reconhece HD ou SSD? Veja causas e soluções profissionais em Curitiba. Diagnóstico e recuperação de dados.",
    h1: "PC Não Reconhece HD ou SSD em Curitiba — Causas e Soluções",
    categoria: "Problemas de Computador",
    intro: `Quando o computador não reconhece o HD ou SSD, o resultado é que o Windows não carrega, os dados ficam inacessíveis e o pânico bate. Mas calma — na maioria dos casos, os dados ainda estão lá, só o acesso que foi comprometido.

As causas vão desde cabo SATA solto (2 minutos para resolver) até falha eletrônica do disco (requer bancada). O diagnóstico profissional identifica a causa exata e define a melhor abordagem.`,
    sintomas: [
      { titulo: "HD não aparece no Windows", desc: "O disco existe na BIOS mas não aparece em 'Meu Computador'. Pode ser partição corrompida ou sistema de arquivos danificado.", gravidade: "Simples a médio" },
      { titulo: "HD não aparece na BIOS", desc: "O disco simplesmente não é detectado. Cabo solto, porta SATA com defeito, ou disco com falha eletrônica.", gravidade: "Médio a complexo" },
      { titulo: "SSD não reconhece após upgrade", desc: "SSD novo instalado mas não aparece. Compatibilidade (SATA vs NVMe), BIOS não configurada ou SSD com defeito de fábrica.", gravidade: "Simples" },
      { titulo: "Mensagem 'No boot device'", desc: "BIOS não encontra sistema para iniciar. HD/SSD desconectado, boot corrompido ou disco falhando.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Cabo SATA ou de dados solto", desc: "Vibração ou manutenção anterior pode ter soltado o cabo. A solução mais simples e mais ignorada.", tipo: "hardware" },
      { titulo: "HD com falha mecânica", desc: "Motor travado, cabeça de leitura danificada ou placa controladora queimada.", tipo: "hardware" },
      { titulo: "Partição ou sistema de arquivos corrompido", desc: "O disco funciona mas os dados ficam inacessíveis por corrupção lógica.", tipo: "software" },
      { titulo: "Incompatibilidade de interface", desc: "SSD NVMe em slot que só aceita SATA, ou vice-versa. Erro comum em upgrades feitos por conta.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe de cabo, configuração de BIOS, formatação de partição.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Recuperação de partição, reparo de boot, migração de dados.", tempo: "2h a 6h", custo: "R$ 200 a R$ 400" },
      { nivel: "Complexo", desc: "Recuperação de dados de HD com falha mecânica ou eletrônica.", tempo: "5 a 15 dias", custo: "R$ 500 a R$ 2000+" },
    ],
    riscos: [
      "Tentativas caseiras de recuperação podem sobrescrever dados e torná-los irrecuperáveis",
      "Software de recuperação errado pode piorar a corrupção",
      "Abrir HD em ambiente não controlado destrói as superfícies de leitura",
    ],
    diagnostico: `Teste de cabo e portas, verificação de BIOS, leitura de SMART do disco, tentativa de acesso via Linux live USB, análise de partições. Custo: R$ 90.`,
    solucao: `Para cabo solto: solução imediata. Para corrupção lógica: ferramentas profissionais de recuperação. Para falha mecânica: encaminhamento para laboratório especializado com ambiente controlado.`,
    quandoCompensa: "Depende da importância dos dados. Para dados insubstituíveis (fotos, documentos profissionais), quase sempre compensa. Para dados substituíveis, pode ser mais barato formatar e reinstalar.",
    quandoNaoCompensa: "Para HDs antigos sem dados importantes, é mais viável comprar um SSD novo.",
    whatsappMessage: "Olá! Meu computador não reconhece o HD/SSD. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
      { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Barulho Estranho", to: "/pc-com-barulho-estranho-curitiba" },
    ],
    conteudoExtra: `### Seus Dados Podem Estar Salvos

Na maioria dos casos em que o HD "não é reconhecido", os dados ainda existem no disco — apenas o acesso foi perdido. Um técnico profissional pode recuperar esses dados antes de qualquer formatação.

Regra de ouro: não formate o disco antes de tentar recuperar os dados.`,
  },

  // ===== NOTEBOOK (11-20) =====
  {
    slug: "notebook-nao-liga-curitiba",
    title: "Notebook Não Liga em Curitiba | Diagnóstico Profissional",
    metaDescription: "Notebook não liga? Veja causas, sintomas e soluções. Diagnóstico profissional em Curitiba com atendimento a domicílio no mesmo dia.",
    h1: "Notebook Não Liga em Curitiba — Diagnóstico e Solução",
    categoria: "Notebook",
    intro: `Um notebook que não liga é uma situação comum, mas que pode ter causas muito variadas. Diferente de um desktop, o notebook tem componentes integrados (bateria, teclado, tela) que adicionam mais variáveis ao diagnóstico.

As causas podem ir de algo simples como bateria completamente descarregada até problemas sérios como placa-mãe com curto. O importante é não tentar abrir o notebook por conta própria — a maioria dos modelos usa parafusos especiais e clips frágeis que quebram facilmente.

Atendemos notebooks de todas as marcas (Dell, Lenovo, HP, Acer, Asus, Samsung, Apple) em Curitiba e região metropolitana.`,
    sintomas: [
      { titulo: "Nenhuma reação ao botão power", desc: "Nada acontece. Pode ser bateria morta, carregador com defeito, jack de energia solto ou placa-mãe.", gravidade: "Médio a complexo" },
      { titulo: "LED de carregamento pisca", desc: "Indica atividade mas não inicia. Bateria com problema, memória ou placa-mãe.", gravidade: "Médio" },
      { titulo: "Tela preta mas ventoinha gira", desc: "Notebook liga internamente mas não exibe imagem. Tela, GPU integrada ou flex.", gravidade: "Médio" },
      { titulo: "Liga e desliga imediatamente", desc: "Inicia por 1-2 segundos e desliga. Curto, superaquecimento ou proteção de energia.", gravidade: "Complexo" },
      { titulo: "Fica na tela do logo e trava", desc: "Não passa do boot. Windows corrompido, disco com falha ou BIOS com problema.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Carregador ou jack de energia com defeito", desc: "O carregador pode ter cabo rompido internamente ou o conector no notebook pode estar solto/oxidado.", tipo: "hardware" },
      { titulo: "Bateria completamente degradada", desc: "Baterias de notebook duram 2-4 anos. Após esse período, podem inchar, não carregar ou impedir a inicialização.", tipo: "desgaste" },
      { titulo: "Memória RAM mal encaixada", desc: "Após quedas ou vibrações, a RAM pode sair do slot. O notebook liga mas não inicializa.", tipo: "hardware" },
      { titulo: "Placa-mãe com curto", desc: "Pode ser causado por líquido derramado, pico de energia ou desgaste natural de componentes.", tipo: "hardware" },
      { titulo: "Flex da tela rompido", desc: "O cabo que conecta a placa à tela pode romper com o tempo. Notebook liga (você ouve sons) mas tela fica preta.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de carregador, reset de BIOS, reencaixe de RAM.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 200" },
      { nivel: "Médio", desc: "Troca de bateria, reparo de jack de energia, reinstalação de sistema.", tempo: "1h a 4h", custo: "R$ 200 a R$ 450 + peça" },
      { nivel: "Complexo", desc: "Reparo de placa-mãe, troca de flex, reballing de GPU. Requer bancada.", tempo: "3 a 10 dias", custo: "R$ 350 a R$ 800+" },
    ],
    riscos: [
      "Abrir notebook sem experiência quebra clips e conectores delicados",
      "Usar carregador incompatível pode queimar a placa-mãe",
      "Forçar bateria inchada pode causar incêndio",
      "Trocar peças por achismo é caro e pode não resolver",
    ],
    diagnostico: `Diagnóstico completo de notebook: teste de carregador com multímetro, verificação de jack de energia, teste de bateria, reencaixe de RAM, boot externo, inspeção de placa-mãe. Custo: R$ 90.`,
    solucao: `Após diagnóstico, apresentamos laudo com opções. Para problemas simples, resolvemos na visita. Para reparo de placa ou troca de componentes, levamos para bancada com prazo definido.`,
    quandoCompensa: "Compensa quando o notebook tem menos de 5 anos e o custo do reparo é inferior a 40% do valor de um equivalente novo.",
    quandoNaoCompensa: "Não compensa quando a placa-mãe precisa de reparo complexo em notebook de baixo valor ou muito antigo.",
    whatsappMessage: "Olá! Meu notebook não liga. Podem me ajudar?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Notebook Lento", to: "/notebook-lento-curitiba" },
      { label: "Notebook Sem Imagem", to: "/notebook-sem-imagem-curitiba" },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
    ],
    conteudoExtra: `### Antes de Chamar o Técnico

1. Teste com outro carregador se possível (mesmo voltagem e amperagem)
2. Remova a bateria (se removível) e tente ligar só na tomada
3. Pressione e segure o botão power por 15 segundos com tudo desconectado
4. Reconecte e tente ligar novamente

Se nada funcionar, é hora do diagnóstico profissional.`,
  },

  {
    slug: "notebook-lento-curitiba",
    title: "Notebook Lento em Curitiba | Upgrade e Otimização",
    metaDescription: "Notebook lento? Saiba quando fazer upgrade de SSD e RAM, quando formatar e quando trocar. Diagnóstico em Curitiba no mesmo dia.",
    h1: "Notebook Lento em Curitiba — Upgrade, Otimização ou Troca?",
    categoria: "Notebook",
    intro: `Notebook lento é a reclamação número 1 que recebemos. E na maioria dos casos, a solução é simples e tem ótimo custo-benefício: upgrade de SSD. Um notebook com HD mecânico que levava 5 minutos para iniciar passa a levar 20 segundos com SSD.

Mas nem sempre é só o disco. Pouca RAM, superaquecimento, malware e até bateria degradada podem contribuir para a lentidão. O diagnóstico identifica exatamente onde está o gargalo.`,
    sintomas: [
      { titulo: "Demora muito para iniciar", desc: "3-10 minutos até ficar usável. HD mecânico + muitos programas na inicialização.", gravidade: "Simples" },
      { titulo: "Trava ao abrir programas", desc: "Congela ao abrir Chrome, Office ou outros. Falta de RAM ou disco em 100%.", gravidade: "Simples a médio" },
      { titulo: "Fica lento conforme esquenta", desc: "Funciona bem por 10-20 min e depois fica lento. Superaquecimento + throttling.", gravidade: "Médio" },
      { titulo: "Lento mesmo após formatação", desc: "Formatou e continua lento. Problema é hardware (HD antigo ou RAM insuficiente).", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "HD mecânico antigo", desc: "90% dos notebooks lentos que atendemos têm HD mecânico. A troca por SSD é a melhoria mais impactante.", tipo: "hardware" },
      { titulo: "RAM insuficiente (4GB)", desc: "Windows 11 + Chrome com 3 abas já esgota 4GB. 8GB é o mínimo para uso fluido.", tipo: "hardware" },
      { titulo: "Pasta térmica seca + poeira", desc: "Notebook esquenta, processador reduz velocidade (throttling). Limpeza resolve.", tipo: "desgaste" },
      { titulo: "Malware e bloatware", desc: "Programas pré-instalados e vírus consomem recursos em segundo plano.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de software + desativação de programas desnecessários.", tempo: "1h", custo: "R$ 100 a R$ 150" },
      { nivel: "Médio", desc: "Upgrade SSD + aumento de RAM + instalação limpa de Windows.", tempo: "2h a 4h", custo: "R$ 300 a R$ 600 com peças" },
      { nivel: "Complexo", desc: "Upgrade + limpeza interna + troca de pasta térmica + diagnóstico completo.", tempo: "4h a 1 dia", custo: "R$ 400 a R$ 800" },
    ],
    riscos: [
      "Formatar sem trocar o HD não resolve — continua lento",
      "Comprar SSD incompatível (SATA vs NVMe) desperdiça dinheiro",
      "Programas de 'otimização' geralmente pioram",
    ],
    diagnostico: `Análise de gargalo: velocidade de disco, uso de RAM, temperatura, saúde do disco (SMART), análise de software. Custo: R$ 90 (incorporado ao serviço se aprovado).`,
    solucao: `Na maioria dos casos: SSD 240/480GB + clonagem do sistema + limpeza de software. Em alguns: upgrade de RAM também. Fazemos tudo no mesmo atendimento.`,
    quandoCompensa: "Quase sempre compensa o upgrade de SSD. Com R$ 300-500 você transforma o notebook em uma máquina rápida por mais 3-5 anos.",
    quandoNaoCompensa: "Não compensa upgrade em notebooks com processador anterior a 2014 ou com placa-mãe apresentando outros defeitos.",
    whatsappMessage: "Olá! Meu notebook está muito lento. Podem me ajudar com upgrade?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Formatação", to: "/servicos/formatacao-computador" },
      { label: "Notebook Esquentando", to: "/notebook-esquentando-curitiba" },
    ],
    conteudoExtra: `### Investimento vs Resultado

| Upgrade | Custo Médio | Melhoria Esperada |
|---|---|---|
| SSD 240GB | R$ 200-300 | 5-10x mais rápido no boot e abertura de programas |
| RAM 4GB → 8GB | R$ 150-250 | Menos travamentos ao usar vários programas |
| SSD + RAM | R$ 350-500 | Transformação completa — como notebook novo |
| Limpeza + pasta térmica | R$ 150-200 | Menos throttling, performance estável |`,
  },

  {
    slug: "notebook-esquentando-curitiba",
    title: "Notebook Esquentando em Curitiba | Limpeza Técnica",
    metaDescription: "Notebook esquentando demais? Limpeza interna profissional, troca de pasta térmica e diagnóstico em Curitiba. Atendimento no mesmo dia.",
    h1: "Notebook Esquentando em Curitiba — Limpeza e Manutenção",
    categoria: "Notebook",
    intro: `Notebooks esquentam mais que desktops por terem espaço interno reduzido para ventilação. Mas quando o calor fica excessivo ao ponto de incomodar ao tocar, desligar sozinho ou ficar lento, é sinal de que a manutenção está atrasada.

Na maioria dos casos, a solução é limpeza interna + troca de pasta térmica — um serviço que deveria ser feito a cada 12-18 meses.`,
    sintomas: [
      { titulo: "Base do notebook muito quente", desc: "Calor intenso na parte inferior, incomodando o uso no colo.", gravidade: "Simples a médio" },
      { titulo: "Desliga sozinho em jogos", desc: "Proteção térmica ativa quando GPU ou CPU atingem limite.", gravidade: "Médio" },
      { titulo: "Ventoinha sempre em velocidade máxima", desc: "Barulho alto constante. Sistema tentando resfriar.", gravidade: "Simples" },
      { titulo: "Lentidão progressiva", desc: "Começa bem e piora conforme esquenta. Throttling térmico.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Pasta térmica seca", desc: "Após 2-3 anos, a pasta perde eficiência. Causa mais comum de superaquecimento em notebooks.", tipo: "desgaste" },
      { titulo: "Poeira no dissipador e ventoinha", desc: "Poeira bloqueia o fluxo de ar. Notebook não consegue expulsar o calor.", tipo: "desgaste" },
      { titulo: "Uso em superfícies que bloqueiam ventilação", desc: "Cama, almofada, cobertor bloqueiam as entradas de ar do notebook.", tipo: "erro-humano" },
      { titulo: "Pads térmicos desgastados", desc: "Em notebooks com GPU dedicada, os pads térmicos sobre VRMs e VRAM podem desgastar.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza externa de ventoinhas + orientação de uso.", tempo: "30 min", custo: "R$ 80 a R$ 120" },
      { nivel: "Médio", desc: "Desmontagem completa + limpeza + troca de pasta térmica.", tempo: "1h a 2h", custo: "R$ 150 a R$ 250" },
      { nivel: "Complexo", desc: "Troca de pads térmicos, reparo de heatpipe, troca de ventoinha.", tempo: "2 a 5 dias", custo: "R$ 250 a R$ 500 + peças" },
    ],
    riscos: [
      "Calor excessivo reduz vida útil da bateria drasticamente",
      "GPU com solda fria por calor gera tela preta permanente",
      "Processador degradado por calor perde performance definitivamente",
    ],
    diagnostico: `Monitoramento de temperatura em repouso e sob carga, inspeção visual da pasta térmica e ventoinhas, teste de eficiência do sistema de refrigeração. Custo: R$ 90.`,
    solucao: `Desmontagem completa do notebook, limpeza profissional com ar comprimido e aspiração, troca de pasta térmica por MX-4 ou equivalente, remontagem e teste de temperatura.`,
    quandoCompensa: "Sempre compensa. A limpeza preventiva custa R$ 150-250 e evita reparos de R$ 500-1000.",
    quandoNaoCompensa: "Não se aplica — manutenção térmica sempre vale a pena.",
    whatsappMessage: "Olá! Meu notebook está esquentando muito. Podem fazer limpeza?",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Notebook Lento", to: "/notebook-lento-curitiba" },
      { label: "Notebook Desligando", to: "/notebook-desligando-sozinho-curitiba" },
      { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" },
    ],
    conteudoExtra: `### Dicas Para Reduzir o Aquecimento

1. Use o notebook em superfícies planas e rígidas (mesa, suporte)
2. Evite usar na cama ou no colo por longos períodos
3. Considere um cooler externo para uso intensivo
4. Faça limpeza profissional a cada 12-18 meses
5. Evite bloquear as saídas de ar laterais e traseiras`,
  },

  // Páginas 14-20 (Notebook cont.) + 21-50 — usando a mesma estrutura
  // Por brevidade, defino cada uma com dados completos

  {
    slug: "notebook-desligando-sozinho-curitiba",
    title: "Notebook Desligando Sozinho | Técnico Curitiba",
    metaDescription: "Notebook desligando sozinho? Superaquecimento, bateria ou placa-mãe. Diagnóstico profissional em Curitiba.",
    h1: "Notebook Desligando Sozinho em Curitiba — Causas e Solução",
    categoria: "Notebook",
    intro: `Notebook que desliga sozinho é sinal de proteção ativa — o sistema está se desligando para evitar dano. As causas mais comuns são superaquecimento (pasta térmica seca, poeira) e bateria degradada. Em casos mais sérios, pode ser a placa-mãe. O diagnóstico profissional identifica a causa exata antes de qualquer reparo.`,
    sintomas: [
      { titulo: "Desliga após minutos de uso intenso", desc: "Superaquecimento. O processador atinge temperatura crítica.", gravidade: "Médio" },
      { titulo: "Desliga ao desconectar da tomada", desc: "Bateria completamente degradada. Só funciona na energia.", gravidade: "Simples" },
      { titulo: "Desliga aleatoriamente", desc: "Sem padrão definido. Pode ser placa-mãe, RAM ou fonte.", gravidade: "Médio a complexo" },
    ],
    causas: [
      { titulo: "Superaquecimento", desc: "Causa mais comum. Pasta térmica seca + poeira = proteção térmica ativa.", tipo: "desgaste" },
      { titulo: "Bateria degradada", desc: "Bateria que não segura carga desliga o notebook ao sair da tomada.", tipo: "desgaste" },
      { titulo: "Curto intermitente na placa-mãe", desc: "Trilha danificada ou componente com solda fria causa desligamentos aleatórios.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza + pasta térmica ou troca de bateria.", tempo: "1h a 2h", custo: "R$ 150 a R$ 350" },
      { nivel: "Médio", desc: "Diagnóstico de placa + reparo de componente.", tempo: "2 a 5 dias", custo: "R$ 250 a R$ 500" },
      { nivel: "Complexo", desc: "Reparo de placa-mãe com microssolda.", tempo: "5 a 10 dias", custo: "R$ 400 a R$ 800" },
    ],
    riscos: ["Cada desligamento abrupto pode corromper dados", "Bateria inchada pode ser perigosa", "Ignorar superaquecimento danifica GPU permanentemente"],
    diagnostico: `Teste de temperatura, teste de bateria, análise de placa-mãe. Custo: R$ 90.`,
    solucao: `Identificação e reparo da causa específica. Para superaquecimento: limpeza completa. Para bateria: troca. Para placa: reparo em bancada.`,
    quandoCompensa: "Compensa para notebooks de menos de 5 anos com causa identificável.",
    quandoNaoCompensa: "Não compensa reparo complexo de placa-mãe em notebook de baixo valor.",
    whatsappMessage: "Olá! Meu notebook está desligando sozinho. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "Notebook Esquentando", to: "/notebook-esquentando-curitiba" }, { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" }],
    conteudoExtra: `### Bateria Inchada: Atenção!

Se o notebook está com a base estufada ou o touchpad levantando, a bateria pode estar inchada. Pare de usar imediatamente e procure assistência. Bateria inchada pode explodir ou pegar fogo.`,
  },

  {
    slug: "notebook-sem-imagem-curitiba",
    title: "Notebook Sem Imagem em Curitiba | Tela Preta",
    metaDescription: "Notebook liga mas tela fica preta? Veja causas e soluções. Flex, tela, GPU. Diagnóstico em Curitiba.",
    h1: "Notebook Sem Imagem em Curitiba — Tela Preta com Notebook Ligado",
    categoria: "Notebook",
    intro: `Notebook que liga (ventoinha gira, LEDs acendem) mas a tela fica preta é um problema com múltiplas causas possíveis. Diferente do desktop, onde você pode trocar facilmente o cabo de vídeo, no notebook a tela está integrada e conectada por um cabo flexível (flex) que pode romper com o uso.`,
    sintomas: [
      { titulo: "Tela totalmente preta, notebook ligado", desc: "LED de energia acende, ventoinha gira, mas nada na tela.", gravidade: "Médio" },
      { titulo: "Tela pisca ou funciona em ângulos", desc: "Imagem aparece ao inclinar a tela. Flex com mau contato.", gravidade: "Médio" },
      { titulo: "Funciona em monitor externo", desc: "Conectou HDMI e funciona. Problema é na tela ou flex.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Flex da tela rompido ou com mau contato", desc: "Cabo que conecta placa à tela pode romper com abertura/fechamento repetido.", tipo: "desgaste" },
      { titulo: "Inverter ou backlight queimado", desc: "Em telas mais antigas, o backlight pode queimar. Em modernas, LED pode falhar.", tipo: "hardware" },
      { titulo: "GPU integrada com defeito", desc: "Problema no chip de vídeo da placa-mãe. Geralmente requer reballing.", tipo: "hardware" },
      { titulo: "Tela LCD/LED danificada", desc: "Impacto, pressão ou defeito de fabricação na tela.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe de flex, ajuste de configuração de display.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Troca de flex ou troca de tela.", tempo: "1 a 3 dias", custo: "R$ 200 a R$ 600 + peça" },
      { nivel: "Complexo", desc: "Reballing de GPU ou reparo de placa-mãe.", tempo: "5 a 10 dias", custo: "R$ 400 a R$ 900+" },
    ],
    riscos: ["Tentar trocar tela sem experiência pode danificar mais componentes", "Flex é muito delicado e pode romper ao manusear"],
    diagnostico: `Teste com monitor externo, inspeção de flex, teste de backlight, análise de GPU. Custo: R$ 90.`,
    solucao: `Depende da causa: flex → troca. Tela → substituição. GPU → reballing ou troca de placa. Sempre com laudo prévio.`,
    quandoCompensa: "Compensa trocar tela ou flex em notebooks de médio a alto valor.",
    quandoNaoCompensa: "Reballing de GPU em notebook antigo de baixo valor geralmente não compensa.",
    whatsappMessage: "Olá! Meu notebook liga mas a tela fica preta. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "Tela Quebrada", to: "/notebook-com-tela-quebrada-curitiba" }, { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" }],
    conteudoExtra: `### Teste Rápido: Monitor Externo

Conecte o notebook a uma TV ou monitor via HDMI. Se a imagem aparecer, o problema é na tela ou flex — não na placa-mãe. Isso ajuda a direcionar o diagnóstico.`,
  },

  {
    slug: "notebook-com-tela-quebrada-curitiba",
    title: "Tela de Notebook Quebrada em Curitiba | Troca",
    metaDescription: "Tela de notebook quebrada ou trincada? Troca de tela LCD/LED em Curitiba. Diagnóstico e orçamento no mesmo dia.",
    h1: "Notebook com Tela Quebrada em Curitiba — Troca de Tela",
    categoria: "Notebook",
    intro: `Tela quebrada é um dos danos mais comuns em notebooks — uma queda, pressão na mochila ou até fechar com algo entre tela e teclado já pode trincar ou quebrar o display. A boa notícia é que a troca de tela é um reparo relativamente simples e com boa disponibilidade de peças para a maioria dos modelos.`,
    sintomas: [
      { titulo: "Tela trincada ou rachada", desc: "Linhas, manchas ou áreas pretas onde o LCD quebrou.", gravidade: "Simples (troca)" },
      { titulo: "Manchas coloridas ou pixels mortos", desc: "Pressão danificou o painel LCD internamente.", gravidade: "Simples (troca)" },
      { titulo: "Metade da tela funciona", desc: "Parte da tela exibe imagem e parte fica preta ou distorcida.", gravidade: "Simples (troca)" },
    ],
    causas: [
      { titulo: "Queda ou impacto", desc: "Causa mais comum. O LCD é frágil e qualquer impacto pode trincar.", tipo: "erro-humano" },
      { titulo: "Pressão na mochila", desc: "Objeto pesado em cima da mochila com notebook dentro.", tipo: "erro-humano" },
      { titulo: "Fechar com objeto entre tela e teclado", desc: "Caneta, fone de ouvido ou cabo entre tela e teclado causa pressão ao fechar.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de tela por modelo compatível. Serviço mais comum.", tempo: "1 a 3 dias (depende da peça)", custo: "R$ 300 a R$ 800 dependendo do modelo" },
      { nivel: "Médio", desc: "Troca de tela + reparo de dobradiça danificada.", tempo: "2 a 5 dias", custo: "R$ 400 a R$ 1000" },
      { nivel: "Complexo", desc: "Tela touchscreen ou OLED — peças mais caras e raras.", tempo: "5 a 15 dias", custo: "R$ 600 a R$ 2000+" },
    ],
    riscos: ["Comprar tela incompatível desperdiça dinheiro", "Trocar sem experiência pode danificar o flex e outros componentes"],
    diagnostico: `Identificação do modelo exato da tela, verificação de compatibilidade, inspeção de flex e dobradiças. Custo: incorporado ao serviço.`,
    solucao: `Troca de tela por painel compatível com garantia. Para modelos mais comuns (Dell, Lenovo, HP, Acer), temos peças disponíveis com prazo de 1-3 dias.`,
    quandoCompensa: "Compensa quando o notebook tem menos de 5 anos e funciona bem tirando a tela. O custo da troca é muito menor que um notebook novo.",
    quandoNaoCompensa: "Telas OLED ou touch de modelos premium podem custar quase tanto quanto um notebook novo. Nesses casos, avaliamos juntos.",
    whatsappMessage: "Olá! A tela do meu notebook quebrou. Podem me ajudar com troca?",
    relatedPages: [...RELATED_BASE, { label: "Notebook Sem Imagem", to: "/notebook-sem-imagem-curitiba" }, { label: "Conserto Notebook", to: "/servicos/conserto-pc-notebook" }],
    conteudoExtra: `### Qual o Modelo da Minha Tela?

Para orçamento preciso, precisamos do modelo exato do notebook (geralmente na etiqueta na parte inferior) ou o part number da tela (etiqueta atrás do painel). Com essa informação, conseguimos verificar disponibilidade e preço rapidamente.`,
  },

  {
    slug: "notebook-nao-carrega-bateria-curitiba",
    title: "Notebook Não Carrega Bateria em Curitiba | Solução",
    metaDescription: "Notebook não carrega bateria? Veja causas: carregador, bateria ou placa-mãe. Diagnóstico em Curitiba.",
    h1: "Notebook Não Carrega Bateria em Curitiba — Diagnóstico",
    categoria: "Notebook",
    intro: `Se seu notebook só funciona na tomada ou a bateria para em X% e não carrega mais, existem algumas causas possíveis. Pode ser o carregador, a própria bateria, o conector de carga ou até a placa-mãe. O diagnóstico identifica qual componente está falhando.`,
    sintomas: [
      { titulo: "LED de carga não acende", desc: "Carregador pode estar com defeito ou conector com problema.", gravidade: "Simples" },
      { titulo: "Carrega até certo % e para", desc: "Bateria com células degradadas. Não aceita carga completa.", gravidade: "Simples (troca)" },
      { titulo: "Descarrega muito rápido", desc: "Bateria com capacidade reduzida. Normal após 2-3 anos.", gravidade: "Simples (troca)" },
      { titulo: "Bateria inchada", desc: "Base do notebook estufando. URGENTE — pare de usar.", gravidade: "Médio - URGENTE" },
    ],
    causas: [
      { titulo: "Bateria degradada (fim de vida útil)", desc: "Baterias duram 500-1000 ciclos. Após 2-4 anos, perdem capacidade.", tipo: "desgaste" },
      { titulo: "Carregador com defeito", desc: "Cabo rompido internamente ou fonte com componente queimado.", tipo: "hardware" },
      { titulo: "Conector DC jack solto", desc: "O conector de carga no notebook pode soltar da placa por uso repetido.", tipo: "desgaste" },
      { titulo: "Circuito de carga na placa-mãe", desc: "Componentes responsáveis pelo carregamento podem falhar.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de carregador ou bateria.", tempo: "Imediato (se peça disponível)", custo: "R$ 100 a R$ 350" },
      { nivel: "Médio", desc: "Reparo de DC jack (solda).", tempo: "1 a 3 dias", custo: "R$ 150 a R$ 300" },
      { nivel: "Complexo", desc: "Reparo do circuito de carga na placa-mãe.", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 600" },
    ],
    riscos: ["Bateria inchada pode pegar fogo", "Usar carregador incompatível danifica a placa"],
    diagnostico: `Teste de carregador com multímetro, verificação de bateria, inspeção de DC jack, análise do circuito de carga. Custo: R$ 90.`,
    solucao: `Para bateria: troca por modelo compatível. Para carregador: substituição. Para DC jack: reparo com solda. Para circuito: reparo em bancada.`,
    quandoCompensa: "Troca de bateria e carregador sempre compensa. Reparo de DC jack tem ótimo custo-benefício.",
    quandoNaoCompensa: "Reparo complexo de circuito de carga em notebook muito antigo pode não justificar.",
    whatsappMessage: "Olá! Meu notebook não carrega a bateria. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" }, { label: "Notebook Desligando", to: "/notebook-desligando-sozinho-curitiba" }],
    conteudoExtra: `### Bateria Inchada: O Que Fazer

1. Pare de usar o notebook imediatamente
2. Não tente furar ou abrir a bateria
3. Não descarte no lixo comum
4. Procure assistência técnica para remoção segura`,
  },

  {
    slug: "notebook-teclado-nao-funciona-curitiba",
    title: "Teclado de Notebook Não Funciona | Curitiba",
    metaDescription: "Teclado do notebook não funciona? Algumas teclas ou todo o teclado? Diagnóstico e troca em Curitiba.",
    h1: "Teclado de Notebook Não Funciona em Curitiba",
    categoria: "Notebook",
    intro: `Teclado de notebook que para de funcionar — total ou parcialmente — é um problema frequente. Pode ser causado por líquido derramado, desgaste natural, flex do teclado com problema ou até driver corrompido. Em muitos casos, a troca do teclado é simples e rápida.`,
    sintomas: [
      { titulo: "Nenhuma tecla funciona", desc: "Teclado completamente morto. Flex desconectado, teclado queimado ou placa-mãe.", gravidade: "Simples a médio" },
      { titulo: "Algumas teclas não funcionam", desc: "Teclas específicas não respondem. Sujeira, líquido ou desgaste.", gravidade: "Simples" },
      { titulo: "Teclas digitam letras erradas", desc: "Configuração de idioma errada ou teclado com mau contato.", gravidade: "Simples" },
      { titulo: "Teclado digita sozinho", desc: "Tecla presa ou curto no teclado. Pode ser líquido ressequido.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Líquido derramado", desc: "Café, água ou refrigerante que entrou no teclado é a causa mais comum.", tipo: "erro-humano" },
      { titulo: "Flex do teclado", desc: "Cabo que conecta o teclado à placa pode soltar ou oxidar.", tipo: "desgaste" },
      { titulo: "Desgaste natural", desc: "Após anos de uso, membrana do teclado pode degradar.", tipo: "desgaste" },
      { titulo: "Driver ou configuração", desc: "Configuração de idioma errada ou driver corrompido.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reconfiguração, reencaixe de flex, limpeza.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Troca de teclado completo.", tempo: "1 a 3 dias (peça)", custo: "R$ 150 a R$ 400" },
      { nivel: "Complexo", desc: "Dano por líquido na placa-mãe abaixo do teclado.", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 700" },
    ],
    riscos: ["Continuar usando com tecla presa pode causar problemas no sistema", "Líquido pode alcançar a placa-mãe se não tratado rapidamente"],
    diagnostico: `Teste de teclado externo USB para isolar o problema, inspeção de flex, verificação de dano por líquido. Custo: R$ 90.`,
    solucao: `Para teclado com defeito: troca por modelo compatível. Para flex: reencaixe ou troca. Para dano por líquido: limpeza e secagem profissional.`,
    quandoCompensa: "Troca de teclado quase sempre compensa — peça relativamente barata.",
    quandoNaoCompensa: "Quando há dano extenso por líquido na placa-mãe e o notebook é antigo.",
    whatsappMessage: "Olá! O teclado do meu notebook não funciona. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "Notebook com Líquido", to: "/notebook-com-agua-ou-liquido-curitiba" }, { label: "Conserto Notebook", to: "/servicos/conserto-pc-notebook" }],
    conteudoExtra: `### Dica Rápida: Teclado Externo

Enquanto espera o reparo, você pode usar um teclado USB externo no notebook. Funciona normalmente e permite continuar trabalhando.`,
  },

  {
    slug: "notebook-com-agua-ou-liquido-curitiba",
    title: "Notebook Molhou? Caiu Líquido | Urgente Curitiba",
    metaDescription: "Caiu água ou líquido no notebook? Veja o que fazer AGORA. Atendimento urgente em Curitiba. Limpeza profissional e recuperação.",
    h1: "Notebook com Água ou Líquido em Curitiba — O Que Fazer AGORA",
    categoria: "Notebook",
    intro: `Derramou líquido no notebook? Os próximos minutos são cruciais. A forma como você reage agora determina se o notebook terá reparo simples ou dano permanente. Líquido + eletricidade = curto-circuito — e cada segundo conta.

IMPORTANTE: Não tente ligar o notebook para "ver se funciona". Isso é o que mais causa dano irreversível. O líquido cria caminhos de curto que ativam quando energia passa pelo circuito.`,
    sintomas: [
      { titulo: "Desligou imediatamente após o líquido", desc: "Proteção ativa. Pode ter evitado dano grave se tratado rápido.", gravidade: "Médio a complexo" },
      { titulo: "Continua funcionando mas com teclas com problema", desc: "Líquido atingiu o teclado mas não a placa. Precisa de limpeza antes que oxide.", gravidade: "Médio" },
      { titulo: "Não liga mais", desc: "Curto-circuito causado pelo líquido. Precisa de diagnóstico em bancada.", gravidade: "Complexo" },
    ],
    causas: [
      { titulo: "Curto-circuito", desc: "Líquido entre trilhas energizadas causa curto instantâneo que queima componentes.", tipo: "erro-humano" },
      { titulo: "Oxidação", desc: "Mesmo que não cause curto imediato, o líquido corrói contatos e trilhas ao longo de dias/semanas.", tipo: "erro-humano" },
      { titulo: "Dano progressivo", desc: "Líquidos com açúcar (refrigerante, suco) são os piores — criam resíduos condutivos e corrosivos.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Só atingiu teclado, sem curto. Limpeza + secagem + possível troca de teclado.", tempo: "1 a 2 dias", custo: "R$ 200 a R$ 400" },
      { nivel: "Médio", desc: "Atingiu placa-mãe mas sem queima. Limpeza ultrassônica + secagem profissional.", tempo: "3 a 5 dias", custo: "R$ 300 a R$ 600" },
      { nivel: "Complexo", desc: "Curto-circuito com queima de componentes. Reparo com microssolda.", tempo: "5 a 15 dias", custo: "R$ 500 a R$ 1200+" },
    ],
    riscos: ["Tentar ligar causa o maior dano", "Secador de cabelo pode empurrar líquido para dentro", "Esperar 'secar sozinho' permite oxidação"],
    diagnostico: `Desmontagem completa, inspeção com microscópio de todos os componentes, teste de curto, limpeza ultrassônica, secagem controlada. Custo: R$ 90-150 pela complexidade.`,
    solucao: `1. Desmontagem imediata. 2. Limpeza ultrassônica da placa. 3. Secagem controlada por 24-48h. 4. Teste de componentes. 5. Reparo do que queimou. 6. Teste final completo.`,
    quandoCompensa: "Depende da extensão do dano. Notebooks de médio a alto valor geralmente compensam o reparo.",
    quandoNaoCompensa: "Quando o líquido causou curto extenso em notebook de baixo valor, o custo do reparo pode ultrapassar o valor do equipamento.",
    whatsappMessage: "URGENTE! Caiu líquido no meu notebook. O que faço?",
    relatedPages: [...RELATED_BASE, { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" }, { label: "Teclado Não Funciona", to: "/notebook-teclado-nao-funciona-curitiba" }],
    conteudoExtra: `### PASSOS IMEDIATOS (faça AGORA)

1. **DESLIGUE** o notebook imediatamente (segure botão power 5s)
2. **DESCONECTE** o carregador
3. **REMOVA** a bateria (se possível)
4. **VIRE** de cabeça para baixo em formato de "V" invertido
5. **NÃO LIGUE** novamente — espere o diagnóstico técnico
6. **CHAME** o técnico o mais rápido possível

### O Que NÃO Fazer
- NÃO use secador de cabelo (empurra líquido para dentro)
- NÃO coloque no arroz (mito — não funciona e grãos podem entrar nas aberturas)
- NÃO tente ligar para "testar" (causa curto)
- NÃO espere secar sozinho (a oxidação começa em horas)`,
  },

  {
    slug: "notebook-apos-upgrade-nao-liga-curitiba",
    title: "Notebook Não Liga Após Upgrade | Curitiba",
    metaDescription: "Fez upgrade de SSD ou RAM e o notebook não liga? Veja causas e soluções. Diagnóstico em Curitiba.",
    h1: "Notebook Não Liga Após Upgrade em Curitiba — O Que Aconteceu?",
    categoria: "Notebook",
    intro: `Você instalou SSD novo, adicionou RAM ou fez alguma modificação e agora o notebook não liga? Isso é mais comum do que parece. Peças incompatíveis, instalação incorreta ou componente danificado durante a montagem são as causas mais frequentes.

Antes de entrar em pânico, saiba que na maioria dos casos o problema é reversível. Mas é importante não continuar tentando sem saber o que está acontecendo.`,
    sintomas: [
      { titulo: "Não liga após trocar RAM", desc: "RAM incompatível, mal encaixada ou voltagem diferente.", gravidade: "Simples" },
      { titulo: "Não liga após instalar SSD", desc: "SSD pode estar incompatível (NVMe vs SATA) ou cabo de dados com problema.", gravidade: "Simples" },
      { titulo: "Liga mas BIOS não reconhece o SSD/RAM", desc: "Incompatibilidade ou slot/porta com defeito.", gravidade: "Simples a médio" },
      { titulo: "Não liga mais de jeito nenhum", desc: "Pode ter causado curto ou danificado conector durante a instalação.", gravidade: "Médio a complexo" },
    ],
    causas: [
      { titulo: "Peça incompatível", desc: "RAM DDR4 em slot DDR3, SSD NVMe em slot SATA M.2, ou frequência incompatível.", tipo: "erro-humano" },
      { titulo: "Instalação incorreta", desc: "Módulo mal encaixado, conector forçado ou parafuso muito apertado.", tipo: "erro-humano" },
      { titulo: "Descarga eletrostática", desc: "Manusear componentes sem proteção antiestática pode queimar chips.", tipo: "erro-humano" },
      { titulo: "Dano ao conector ou flex", desc: "Ao abrir o notebook, algum flex ou conector pode ter sido danificado.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe correto da peça ou troca por modelo compatível.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Reverter upgrade, identificar e substituir peça incompatível.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" },
      { nivel: "Complexo", desc: "Reparo de dano causado durante a instalação (conector, flex, placa).", tempo: "2 a 7 dias", custo: "R$ 250 a R$ 600+" },
    ],
    riscos: ["Forçar peça incompatível pode danificar o slot permanentemente", "Continuar tentando pode piorar o dano"],
    diagnostico: `Análise da peça instalada, verificação de compatibilidade, inspeção de conectores e componentes adjacentes. Custo: R$ 90.`,
    solucao: `Identificação do problema (incompatibilidade, mau encaixe ou dano) e correção. Na maioria dos casos, é resolvido rapidamente.`,
    quandoCompensa: "Quase sempre — o notebook geralmente não está danificado, apenas com peça errada.",
    quandoNaoCompensa: "Se houve curto e dano à placa-mãe durante o upgrade amador.",
    whatsappMessage: "Olá! Fiz um upgrade e agora meu notebook não liga. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "Erros de Upgrade", to: "/erros-comuns-em-upgrade" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }],
    conteudoExtra: `### Antes de Fazer Upgrade: Checklist

1. Verifique a compatibilidade EXATA (modelo, geração, interface)
2. Use pulseira antiestática
3. Fotografe tudo antes de desmontar
4. Não force nenhuma peça — se não encaixa facilmente, pode ser incompatível
5. Guarde as peças originais para reverter se necessário`,
  },

  // ===== TV / ELETRÔNICOS (21-25) =====
  {
    slug: "tv-com-som-sem-imagem-curitiba",
    title: "TV com Som Sem Imagem em Curitiba | Diagnóstico",
    metaDescription: "TV com som mas sem imagem? Veja causas e soluções. Backlight, placa T-CON, LED. Reparo em Curitiba.",
    h1: "TV com Som Sem Imagem em Curitiba — Causas e Reparo",
    categoria: "TV / Eletrônicos",
    intro: `Se a TV tem som mas a tela fica escura ou preta, o problema está no sistema de vídeo da TV — não na fonte ou placa principal. As causas mais comuns são: barra de LED (backlight) queimada, placa T-CON com defeito ou cabo LVDS com mau contato.

Esse tipo de reparo geralmente exige bancada técnica pois a TV precisa ser desmontada para diagnóstico dos LEDs e placas internas.`,
    sintomas: [
      { titulo: "Tela totalmente escura com áudio normal", desc: "Backlight (LEDs) queimados. Teste: com lanterna na tela, você pode ver imagem fraca.", gravidade: "Médio" },
      { titulo: "Tela com brilho mas sem imagem", desc: "Placa T-CON com defeito ou cabo LVDS solto.", gravidade: "Médio" },
      { titulo: "Imagem aparece e some", desc: "LED intermitente ou T-CON com mau contato.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Barra de LED (backlight) queimada", desc: "LEDs que iluminam a tela queimam com o tempo. Causa mais comum. Troca da barra resolve.", tipo: "desgaste" },
      { titulo: "Placa T-CON com defeito", desc: "Placa que controla a imagem na tela. Capacitores estufados ou chip com defeito.", tipo: "hardware" },
      { titulo: "Cabo LVDS solto ou danificado", desc: "Cabo que conecta placa principal à tela pode oxidar ou soltar.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Cabo LVDS solto — reencaixe.", tempo: "1h", custo: "R$ 100 a R$ 200" },
      { nivel: "Médio", desc: "Troca de barra de LED ou T-CON.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 500 + peça" },
      { nivel: "Complexo", desc: "Reparo de placa T-CON ou múltiplas barras.", tempo: "5 a 10 dias", custo: "R$ 400 a R$ 800+" },
    ],
    riscos: ["Abrir TV tem risco de choque — capacitores armazenam carga", "LEDs genéricos podem ter vida útil curta"],
    diagnostico: `Desmontagem da TV, teste individual de LEDs, verificação de T-CON, medição de tensões. Custo: R$ 90-120.`,
    solucao: `Troca de barras de LED (mais comum), reparo ou troca de T-CON, reencaixe de cabos. Sempre com peças de qualidade.`,
    quandoCompensa: "TVs de 32-55\" com menos de 6 anos geralmente compensam. O reparo custa 20-40% de uma nova.",
    quandoNaoCompensa: "TVs muito baratas onde o reparo se aproxima do valor de uma nova.",
    whatsappMessage: "Olá! Minha TV tem som mas não tem imagem. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "TV Não Liga", to: "/tv-nao-liga-curitiba" }, { label: "Manutenção TV", to: "/servicos/manutencao-tv" }],
    conteudoExtra: `### Teste do Backlight com Lanterna

Ligue a TV no escuro e aponte uma lanterna forte diretamente na tela. Se você consegue ver uma imagem fraca, o problema é backlight (LEDs). Esse teste simples confirma o diagnóstico antes da desmontagem.`,
  },

  {
    slug: "tv-nao-liga-curitiba",
    title: "TV Não Liga em Curitiba | Diagnóstico e Reparo",
    metaDescription: "TV não liga? Veja causas comuns: fonte, placa, LED de standby. Reparo profissional em Curitiba.",
    h1: "TV Não Liga em Curitiba — Diagnóstico Profissional",
    categoria: "TV / Eletrônicos",
    intro: `TV que não liga pode ser desde um problema simples na tomada até falha na fonte interna. Se o LED de standby não acende, provavelmente é a fonte. Se acende mas a TV não responde ao controle, pode ser a placa principal. O diagnóstico técnico identifica a causa antes de qualquer troca.`,
    sintomas: [
      { titulo: "Nenhum LED, nenhuma reação", desc: "Fonte queimada ou fusível interno. Sem energia chegando à placa.", gravidade: "Médio" },
      { titulo: "LED standby acende mas não liga", desc: "Placa principal com defeito ou problema de software/firmware.", gravidade: "Médio" },
      { titulo: "Liga e desliga imediatamente", desc: "Proteção ativa — curto em alguma placa ou backlight.", gravidade: "Médio a complexo" },
    ],
    causas: [
      { titulo: "Fonte de alimentação queimada", desc: "Pico de energia ou desgaste natural dos capacitores internos.", tipo: "hardware" },
      { titulo: "Capacitores estufados", desc: "Capacitores da fonte ou placa principal estufam com o tempo.", tipo: "desgaste" },
      { titulo: "Placa principal com defeito", desc: "Chip de processamento de vídeo ou firmware corrompido.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de fusível ou reparo de fonte com troca de capacitores.", tempo: "1 a 3 dias", custo: "R$ 150 a R$ 300" },
      { nivel: "Médio", desc: "Troca de placa fonte ou reparo da placa principal.", tempo: "3 a 7 dias", custo: "R$ 200 a R$ 500" },
      { nivel: "Complexo", desc: "Reparo complexo de placa principal ou múltiplos componentes.", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 800+" },
    ],
    riscos: ["Capacitores da fonte armazenam carga letal mesmo desligada", "Trocar componentes sem conhecimento pode piorar"],
    diagnostico: `Teste de tensões, inspeção visual de componentes, verificação de fusível e capacitores. Custo: R$ 90-120.`,
    solucao: `Reparo focado no componente com defeito. Troca de capacitores, fonte ou placa conforme necessidade.`,
    quandoCompensa: "Troca de capacitores e reparo de fonte tem excelente custo-benefício. TVs até 6 anos quase sempre compensam.",
    quandoNaoCompensa: "TVs muito antigas (10+ anos) com múltiplos defeitos.",
    whatsappMessage: "Olá! Minha TV não liga. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "TV Sem Imagem", to: "/tv-com-som-sem-imagem-curitiba" }, { label: "Manutenção TV", to: "/servicos/manutencao-tv" }],
    conteudoExtra: `### Verifique Antes de Chamar

1. Teste a tomada com outro aparelho
2. Verifique se o cabo de energia está firme
3. Tente com outro controle remoto ou os botões da TV
4. Se houve queda de energia, espere 5 minutos`,
  },

  {
    slug: "tv-desligando-sozinha-curitiba",
    title: "TV Desligando Sozinha em Curitiba | Diagnóstico",
    metaDescription: "TV desligando sozinha? Veja causas: timer, superaquecimento, placa com defeito. Reparo em Curitiba.",
    h1: "TV Desligando Sozinha em Curitiba — O Que Pode Ser?",
    categoria: "TV / Eletrônicos",
    intro: `TV que desliga sozinha pode ter causas simples (timer de desligamento automático, CEC ativado) ou complexas (capacitor estufado, superaquecimento interno). Antes de chamar o técnico, verifique as configurações de timer e modo econômico.`,
    sintomas: [
      { titulo: "Desliga após tempo fixo", desc: "Timer de desligamento automático ativado. Configuração do menu.", gravidade: "Simples" },
      { titulo: "Desliga aleatoriamente", desc: "Capacitor estufado, placa com defeito ou superaquecimento.", gravidade: "Médio" },
      { titulo: "Desliga e liga sozinha", desc: "CEC (HDMI-CEC) ou dispositivo conectado enviando comando.", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "Timer/Sleep ativado", desc: "Configuração de desligamento automático por inatividade.", tipo: "software" },
      { titulo: "HDMI-CEC ativo", desc: "Outros dispositivos (chromecast, console) enviam comando de desligar.", tipo: "software" },
      { titulo: "Capacitores estufados", desc: "Capacitores da fonte perdem capacidade e a TV desliga quando a tensão cai.", tipo: "desgaste" },
      { titulo: "Superaquecimento", desc: "TV em local sem ventilação ou próxima a fonte de calor.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Ajuste de configurações (timer, CEC).", tempo: "30 min", custo: "R$ 90" },
      { nivel: "Médio", desc: "Troca de capacitores da fonte.", tempo: "2 a 5 dias", custo: "R$ 150 a R$ 350" },
      { nivel: "Complexo", desc: "Reparo de placa principal.", tempo: "5 a 10 dias", custo: "R$ 300 a R$ 600" },
    ],
    riscos: ["Ignorar capacitores estufados pode levar a falha completa"],
    diagnostico: `Verificação de configurações, teste de tensões da fonte, inspeção de capacitores. Custo: R$ 90.`,
    solucao: `Para configurações: ajuste no menu. Para hardware: reparo em bancada.`,
    quandoCompensa: "Troca de capacitores é muito barata — sempre compensa.",
    quandoNaoCompensa: "Múltiplos defeitos em TV antiga de baixo valor.",
    whatsappMessage: "Olá! Minha TV fica desligando sozinha. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "TV Não Liga", to: "/tv-nao-liga-curitiba" }, { label: "Manutenção TV", to: "/servicos/manutencao-tv" }],
    conteudoExtra: `### Antes de Chamar: Verifique

1. Menu > Timer > Desligamento automático → desative
2. Menu > HDMI-CEC / Anynet+ / Simplink → desative
3. Verifique se a TV está em local ventilado`,
  },

  {
    slug: "tv-com-tela-escura-curitiba",
    title: "TV com Tela Escura em Curitiba | Backlight",
    metaDescription: "TV com tela escura ou pouco brilho? Backlight com defeito. Reparo profissional em Curitiba.",
    h1: "TV com Tela Escura em Curitiba — Backlight com Defeito",
    categoria: "TV / Eletrônicos",
    intro: `TV com tela escura — onde você percebe que tem imagem mas muito fraca — é quase sempre problema de backlight (LEDs de iluminação). Os LEDs internos que iluminam o painel queimam parcial ou totalmente, deixando a tela escura. A troca das barras de LED resolve na maioria dos casos.`,
    sintomas: [{ titulo: "Imagem muito escura mesmo com brilho no máximo", desc: "LEDs do backlight degradados ou queimados.", gravidade: "Médio" }, { titulo: "Áreas mais claras e mais escuras na tela", desc: "Alguns LEDs queimados enquanto outros funcionam.", gravidade: "Médio" }],
    causas: [{ titulo: "LEDs do backlight queimados", desc: "Desgaste natural após 3-7 anos de uso.", tipo: "desgaste" }, { titulo: "Driver de LED com defeito", desc: "Componente na placa fonte que alimenta os LEDs.", tipo: "hardware" }],
    cenarios: [{ nivel: "Simples", desc: "Ajuste de brilho e configurações.", tempo: "30 min", custo: "R$ 90" }, { nivel: "Médio", desc: "Troca de barras de LED.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Troca de barras + reparo de driver.", tempo: "5 a 10 dias", custo: "R$ 350 a R$ 700" }],
    riscos: ["LEDs genéricos podem ter vida útil curta"],
    diagnostico: `Desmontagem, teste individual de LEDs, verificação de driver de backlight. Custo: R$ 90-120.`,
    solucao: `Troca de barras de LED por modelos de qualidade com garantia.`,
    quandoCompensa: "TVs de 32-55\" quase sempre compensam. Reparo custa 20-40% de uma nova.",
    quandoNaoCompensa: "TVs muito pequenas ou muito antigas.",
    whatsappMessage: "Olá! Minha TV está com a tela muito escura. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "TV Sem Imagem", to: "/tv-com-som-sem-imagem-curitiba" }, { label: "Manutenção TV", to: "/servicos/manutencao-tv" }],
    conteudoExtra: `### O Que é Backlight?

TVs LED modernas usam tiras de LEDs para iluminar o painel LCD. Quando esses LEDs queimam, a imagem fica escura ou desaparece. A troca das barras é o reparo mais comum em TVs e tem bom custo-benefício.`,
  },

  {
    slug: "tv-com-linhas-na-tela-curitiba",
    title: "TV com Linhas na Tela em Curitiba | Diagnóstico",
    metaDescription: "TV com linhas horizontais ou verticais na tela? Veja causas e soluções. Reparo profissional em Curitiba.",
    h1: "TV com Linhas na Tela em Curitiba — Causas e Reparo",
    categoria: "TV / Eletrônicos",
    intro: `Linhas na tela da TV — horizontais, verticais, coloridas ou pretas — indicam problema no painel LCD, na placa T-CON ou nos cabos de conexão interna. O tipo de linha e onde ela aparece ajuda a diagnosticar a causa.`,
    sintomas: [{ titulo: "Linhas verticais coloridas", desc: "T-CON ou cabo TAB com defeito.", gravidade: "Médio" }, { titulo: "Linhas horizontais", desc: "Painel LCD com defeito ou T-CON.", gravidade: "Médio a complexo" }, { titulo: "Faixa preta vertical/horizontal", desc: "Grupo de pixels mortos no painel ou driver de linha queimado.", gravidade: "Complexo" }],
    causas: [{ titulo: "Placa T-CON com defeito", desc: "Controla as linhas do display. Capacitores ou chip com problema.", tipo: "hardware" }, { titulo: "Cabo TAB/COF solto ou danificado", desc: "Conexões ultrafinas entre painel e driver.", tipo: "hardware" }, { titulo: "Painel LCD danificado", desc: "Dano físico ou desgaste do painel. Geralmente irreparável.", tipo: "hardware" }],
    cenarios: [{ nivel: "Simples", desc: "Reencaixe de cabos ou troca de T-CON.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 400" }, { nivel: "Médio", desc: "Reparo de T-CON ou reconexão de TAB.", tempo: "5 a 10 dias", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Painel danificado — geralmente inviável.", tempo: "N/A", custo: "Troca de painel = TV nova" }],
    riscos: ["Reparo de TAB é delicado e pode piorar", "Painel danificado geralmente significa TV nova"],
    diagnostico: `Inspeção de T-CON, cabos TAB, teste com pressão nas conexões. Custo: R$ 90-120.`,
    solucao: `Para T-CON: reparo ou troca. Para TAB: reconexão. Para painel: geralmente inviável.`,
    quandoCompensa: "Se o problema é T-CON ou cabo, compensa. Se é painel, geralmente não.",
    quandoNaoCompensa: "Troca de painel LCD custa quase tanto quanto TV nova.",
    whatsappMessage: "Olá! Minha TV está com linhas na tela. Podem me ajudar?",
    relatedPages: [...RELATED_BASE, { label: "TV Sem Imagem", to: "/tv-com-som-sem-imagem-curitiba" }, { label: "Manutenção TV", to: "/servicos/manutencao-tv" }],
    conteudoExtra: `### Diagnóstico Rápido

- Linhas que mudam ou somem ao pressionar levemente a tela → cabo TAB (possível reparo)
- Linhas fixas que não mudam → painel ou T-CON (diagnóstico necessário)
- Linhas que aparecem apenas em certos canais/fontes → sinal ou cabo HDMI (simples)`,
  },

  // ===== ERROS / CASOS (26-30) =====
  { slug: "erro-ao-instalar-memoria-ram", title: "Erro ao Instalar Memória RAM | Guia Técnico", metaDescription: "Erro ao instalar RAM? Computador não liga após trocar memória? Veja causas e soluções. Diagnóstico profissional em Curitiba.", h1: "Erro ao Instalar Memória RAM — O Que Fazer?", categoria: "Erros e Casos Reais", intro: `Instalou memória RAM nova e o computador não liga, emite bips ou fica com tela preta? RAM incompatível, mal encaixada ou frequência diferente são as causas mais comuns. Cada placa-mãe aceita tipos específicos de memória (DDR3, DDR4, DDR5) com frequências específicas. Instalar o módulo errado pode resultar em tela preta, instabilidade ou até dano ao slot.`, sintomas: [{ titulo: "Computador não liga após instalar RAM", desc: "RAM incompatível ou mal encaixada.", gravidade: "Simples" }, { titulo: "Bips ao ligar", desc: "Sequência de bips indica problema de memória.", gravidade: "Simples" }, { titulo: "Instabilidade e travamentos", desc: "RAM funcionou mas é incompatível em frequência ou timings.", gravidade: "Simples a médio" }], causas: [{ titulo: "RAM de geração errada", desc: "DDR4 em slot DDR3 ou vice-versa. Não são compatíveis.", tipo: "erro-humano" }, { titulo: "Frequência incompatível", desc: "RAM com frequência diferente da suportada pela placa.", tipo: "erro-humano" }, { titulo: "Módulo mal encaixado", desc: "Trava não clicou completamente.", tipo: "erro-humano" }, { titulo: "Slot com defeito", desc: "Slot danificado durante a instalação.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reencaixe correto ou troca por módulo compatível.", tempo: "30 min", custo: "R$ 90" }, { nivel: "Médio", desc: "Diagnóstico de compatibilidade + compra do módulo correto.", tempo: "1h", custo: "R$ 100 a R$ 200 + peça" }, { nivel: "Complexo", desc: "Slot danificado — reparo de placa-mãe.", tempo: "3 a 7 dias", custo: "R$ 200 a R$ 500" }], riscos: ["Forçar módulo pode danificar o slot permanentemente", "RAM incompatível pode causar instabilidade em dados"], diagnostico: `Verificação de compatibilidade, teste de módulos, inspeção de slots. Custo: R$ 90.`, solucao: `Identificar módulo compatível, instalar corretamente, testar estabilidade.`, quandoCompensa: "Quase sempre — o erro geralmente é reversível.", quandoNaoCompensa: "Se o slot foi danificado fisicamente em placa antiga.", whatsappMessage: "Olá! Instalei memória RAM e meu computador não funciona. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Erros Comuns em Upgrade", to: "/erros-comuns-em-upgrade" }], conteudoExtra: `### Como Evitar Erros de RAM

1. Verifique o manual da placa-mãe para saber DDR e frequência suportados
2. Use sites como Crucial.com para verificar compatibilidade
3. Sempre desligue e desconecte da tomada antes de instalar
4. Use pulseira antiestática
5. Ouça o "click" da trava ao encaixar

### Entendendo os Tipos de RAM

A memória RAM passou por diversas gerações, cada uma incompatível fisicamente com a anterior:

- **DDR3**: Computadores de 2007 a 2015. Voltagem 1.5V. Chanfro (encaixe) diferente da DDR4.
- **DDR4**: Computadores de 2015 a 2022. Voltagem 1.2V. Padrão mais comum atualmente.
- **DDR5**: Computadores a partir de 2022. Voltagem 1.1V. Plataformas Intel 12ª geração+ e AMD AM5.

Cada tipo tem o chanfro (corte no módulo) em posição diferente, o que impede fisicamente a instalação no slot errado. Porém, módulos com voltagem ou frequência inadequada podem encaixar mas não funcionar, gerando tela preta ou bips.

### Frequência e Timings: O Que Importa

Não basta ser o DDR correto. A frequência (ex: 2400MHz, 3200MHz, 4800MHz) deve ser suportada pela placa-mãe. Instalar RAM de 3200MHz em placa que suporta até 2400MHz não vai danificar nada, mas o módulo vai operar em velocidade reduzida. Já instalar frequência ABAIXO do mínimo pode causar instabilidade.

Os **timings** (CL16, CL18, etc.) também importam quando se mistura módulos diferentes. Dois pentes com timings muito diferentes podem causar travamentos intermitentes — difíceis de diagnosticar sem ferramentas profissionais como MemTest86.

### Casos Reais em Curitiba

Recebemos semanalmente casos de upgrade de RAM mal executado na região de Curitiba e metropolitana:

- **Caso 1 - Portão**: Cliente comprou DDR4 2666MHz para placa que suportava apenas DDR3. Módulo não encaixava e ele forçou — resultado: slot quebrado. Reparo: R$ 350.
- **Caso 2 - Pinhais**: Cliente misturou pentes DDR4 de 2400MHz com 3200MHz. PC funcionava mas travava aleatoriamente. Solução: manter apenas os pentes de mesma frequência.
- **Caso 3 - São José dos Pinhais**: Notebook com RAM soldada na placa — cliente tentou adicionar módulo no slot extra sem verificar que o notebook só suportava 1 slot adicional de 8GB. Funcionou perfeitamente após orientação.

### Quanto de RAM Você Realmente Precisa?

| Uso | RAM Recomendada |
|---|---|
| Navegação e Office | 8GB |
| Trabalho multitarefa | 16GB |
| Design e vídeo | 32GB |
| Jogos modernos | 16-32GB |
| Servidor/virtualização | 32-64GB+ |

Se você está em dúvida sobre qual RAM comprar para seu computador em Curitiba, entre em contato antes de comprar. Uma consultoria rápida pode evitar uma compra errada e um reparo desnecessário.` },

  { slug: "upgrade-deu-problema", title: "Upgrade Deu Problema | Técnico Curitiba", metaDescription: "Fez upgrade e deu problema? SSD, RAM ou outro componente não funciona? Diagnóstico em Curitiba.", h1: "Upgrade Deu Problema — Como Resolver?", categoria: "Erros e Casos Reais", intro: `Upgrades de hardware são a forma mais eficiente de melhorar o desempenho de um computador. Mas quando feitos sem conhecimento técnico adequado, podem causar problemas sérios: computador que não liga, instabilidade, perda de dados ou até dano permanente. Atendemos dezenas de casos por mês de upgrades mal executados em Curitiba.`, sintomas: [{ titulo: "Não liga após upgrade", desc: "Peça incompatível ou mal instalada.", gravidade: "Simples a médio" }, { titulo: "Instabilidade após upgrade", desc: "Trava, tela azul ou reinicia. Compatibilidade ou instalação.", gravidade: "Simples a médio" }, { titulo: "Performance não melhorou", desc: "Upgrade errado para o gargalo real.", gravidade: "Simples" }], causas: [{ titulo: "Incompatibilidade de componentes", desc: "Peça que não funciona com o hardware existente.", tipo: "erro-humano" }, { titulo: "Instalação incorreta", desc: "Componente mal encaixado, cabo errado, sem pasta térmica.", tipo: "erro-humano" }, { titulo: "BIOS não configurada", desc: "Alguns upgrades exigem ajustes na BIOS para funcionar.", tipo: "erro-humano" }, { titulo: "Componente com defeito de fábrica", desc: "Peça nova já com defeito — acontece.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reconfiguração, reencaixe, ajuste de BIOS.", tempo: "1h", custo: "R$ 90 a R$ 150" }, { nivel: "Médio", desc: "Troca de peça por modelo compatível.", tempo: "1 a 2 dias", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Reparo de dano causado pelo upgrade.", tempo: "3 a 7 dias", custo: "R$ 250 a R$ 600" }], riscos: ["Continuar tentando pode piorar o dano", "Trocar mais peças por achismo desperdiça dinheiro"], diagnostico: `Análise completa do upgrade realizado, teste de compatibilidade, verificação de instalação. Custo: R$ 90.`, solucao: `Correção do upgrade (peça certa, instalação certa, configuração certa).`, quandoCompensa: "Na maioria dos casos — o equipamento original geralmente está intacto.", quandoNaoCompensa: "Quando o upgrade causou curto e danificou a placa-mãe.", whatsappMessage: "Olá! Fiz um upgrade e agora meu computador tem problemas. Podem ajudar?", relatedPages: [...RELATED_BASE, { label: "Erro RAM", to: "/erro-ao-instalar-memoria-ram" }, { label: "Erros Comuns em Upgrade", to: "/erros-comuns-em-upgrade" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Notebook Após Upgrade", to: "/notebook-apos-upgrade-nao-liga-curitiba" }], conteudoExtra: `### Os Upgrades Mais Comuns (e Erros)

| Upgrade | Erro Comum | Como Evitar |
|---|---|---|
| SSD | Interface errada (NVMe vs SATA) | Verificar manual da placa |
| RAM | Geração ou frequência errada | Consultar QVL da placa |
| GPU | Fonte insuficiente | Calcular TDP total |
| Processador | Socket incompatível | Verificar compatibilidade exata |

### Por Que Upgrades Dão Errado?

O principal motivo é a **confiança em tutoriais genéricos**. O YouTube está cheio de vídeos "como instalar SSD" ou "como trocar RAM", mas nenhum deles verifica a compatibilidade específica do SEU equipamento. Cada placa-mãe, cada notebook, cada geração tem suas particularidades.

Em Curitiba, atendemos em média 15 a 20 casos por mês de upgrades mal executados. Os mais comuns:

1. **SSD M.2 NVMe em slot M.2 SATA** — O conector é igual, o módulo encaixa, mas não funciona. São protocolos diferentes e o slot precisa suportar NVMe. Muitos notebooks de 2015-2018 têm M.2 mas só SATA.

2. **RAM dual-channel com pentes diferentes** — Misturar pentes de marcas, frequências ou timings diferentes pode causar instabilidade intermitente. O computador funciona "às vezes" e trava "aleatoriamente".

3. **GPU sem fonte adequada** — Uma GTX 1660 precisa de pelo menos 450W de fonte de qualidade. Instalar em fonte genérica de 400W causa desligamentos sob carga.

4. **Processador de geração errada** — Um Core i7 de 10ª geração NÃO funciona em placa de 8ª geração, mesmo sendo LGA 1200 vs LGA 1151.

### O Que Fazer Quando o Upgrade Dá Errado

**Passo 1**: Não entre em pânico. Na maioria dos casos, o equipamento original não está danificado.

**Passo 2**: Se possível, reverta o upgrade (reinstale a peça original) para confirmar que o PC funciona normalmente.

**Passo 3**: Se não consegue reverter ou o problema persiste, chame diagnóstico profissional.

### Custo de Correção vs Custo de Fazer Certo

| Cenário | Custo do Upgrade DIY (com erro) | Custo com Técnico desde o Início |
|---|---|---|
| RAM incompatível | Peça errada R$ 200 + correção R$ 150 = R$ 350 | Peça certa R$ 200 + instalação R$ 90 = R$ 290 |
| SSD errado | SSD errado R$ 250 + troca R$ 150 = R$ 400 | SSD certo R$ 250 + instalação R$ 120 = R$ 370 |
| Dano ao slot | Peça R$ 200 + reparo R$ 400 = R$ 600 | Peça R$ 200 + instalação R$ 90 = R$ 290 |

Contratar um técnico para orientar ou executar o upgrade quase sempre sai mais barato do que tentar sozinho e errar.` },

  { slug: "placa-mae-queimada", title: "Placa-Mãe Queimada | Diagnóstico Curitiba", metaDescription: "Placa-mãe queimada? Veja sintomas, causas e quando compensa reparar. Diagnóstico profissional em Curitiba.", h1: "Placa-Mãe Queimada — Diagnóstico e Opções", categoria: "Erros e Casos Reais", intro: `Uma placa-mãe queimada é um dos diagnósticos mais temidos — mas nem sempre significa substituição total. Em muitos casos, o dano é localizado (um capacitor, um regulador de tensão, uma trilha) e pode ser reparado em bancada por um valor muito menor que a troca.`, sintomas: [{ titulo: "Computador não liga de jeito nenhum", desc: "Curto na placa impede qualquer inicialização.", gravidade: "Complexo" }, { titulo: "Cheiro de queimado", desc: "Componente queimou. Pode ser localizado ou extenso.", gravidade: "Complexo" }, { titulo: "Funciona parcialmente", desc: "Algumas portas não funcionam, USB mortas, etc.", gravidade: "Médio" }], causas: [{ titulo: "Pico de energia", desc: "Surto na rede elétrica queima componentes. Usar estabilizador/nobreak previne.", tipo: "hardware" }, { titulo: "Curto por líquido ou poeira", desc: "Líquido ou poeira condutiva entre trilhas causa curto.", tipo: "erro-humano" }, { titulo: "Desgaste natural", desc: "Capacitores estufam após 5-10 anos de uso.", tipo: "desgaste" }, { titulo: "Uso de fonte de baixa qualidade", desc: "Fontes genéricas podem enviar tensão irregular e danificar a placa.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Componente localizado (capacitor, fusível). Reparo em bancada.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 400" }, { nivel: "Médio", desc: "Regulador de tensão ou múltiplos capacitores.", tempo: "5 a 10 dias", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Dano extenso — troca de placa necessária.", tempo: "Depende", custo: "R$ 400 a R$ 1500+ (placa nova)" }], riscos: ["Continuar usando com queima parcial pode danificar outros componentes", "Reparo amador pode causar mais curtos"], diagnostico: `Inspeção visual com lupa/microscópio, teste de curto com multímetro, medição de tensões. Custo: R$ 90.`, solucao: `Para dano localizado: reparo com microssolda. Para dano extenso: troca de placa.`, quandoCompensa: "Reparo de componentes localizados quase sempre compensa. Vale verificar antes de comprar placa nova.", quandoNaoCompensa: "Dano extenso em placa antiga onde o custo da troca supera o valor do computador.", whatsappMessage: "Olá! Acho que a placa-mãe do meu computador queimou. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Curto em Placa", to: "/curto-em-placa-eletronica" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }, { label: "GPU Desgastada", to: "/gpu-desgastada" }, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }], conteudoExtra: `### Vale a Pena Reparar a Placa-Mãe?

Depende:
- **Sim**: quando o dano é localizado (1-2 componentes), reparo custa R$ 200-400
- **Talvez**: quando precisa de análise para determinar extensão
- **Não**: quando há queima extensa ou a placa é antiga demais

### Anatomia de uma Placa-Mãe: O Que Pode Queimar

Uma placa-mãe é um circuito complexo com centenas de componentes. Quando dizemos "queimou", pode significar coisas bem diferentes:

**Capacitores** — São os cilindros metálicos visíveis na placa. Quando estufam (topo arredondado em vez de plano) ou vazam (resíduo marrom), estão com defeito. É o reparo mais comum e mais barato: R$ 50-150 por capacitor, mais mão de obra.

**VRM (Reguladores de Tensão)** — Alimentam o processador. Quando falham, o PC não liga ou desliga sob carga. Reparo possível mas mais complexo: R$ 200-400.

**Chipset** — O "cérebro secundário" da placa. Falha rara mas grave. Se o chipset queimou, geralmente não compensa reparar.

**Trilhas de circuito** — As "estradas" de cobre na placa. Podem ser danificadas por curto, líquido ou dano mecânico. Reparo com microssolda é possível em muitos casos.

### Sinais de Alerta: Quando Sua Placa Está em Risco

1. **Cheiro leve de queimado** ao usar o PC — NÃO ignore. Desligue imediatamente.
2. **Portas USB parando de funcionar** uma a uma — sinal de degradação progressiva.
3. **Reinicializações sob carga** — VRM pode estar falhando.
4. **Capacitores visivelmente estufados** — troque ANTES que causem mais dano.

### Prevenção: Como Proteger Sua Placa-Mãe

A maioria dos danos em placas-mãe em Curitiba é causada por **picos de energia** — comuns na rede elétrica do Paraná, especialmente durante tempestades.

**Proteção recomendada:**
- **Mínimo**: filtro de linha com proteção contra surtos (R$ 30-80)
- **Recomendado**: estabilizador de qualidade (R$ 150-300)
- **Ideal**: nobreak/UPS (R$ 400-1000) — protege contra queda E surto

### Casos Atendidos em Curitiba e Região

- **Batel**: PC gamer de R$ 8.000 com placa-mãe "queimada". Diagnóstico revelou apenas 2 capacitores estufados. Reparo: R$ 250. Equipamento voltou a funcionar perfeitamente.
- **Araucária**: Notebook corporativo com placa danificada por pico durante tempestade. Reparo de VRM: R$ 400. Economizou R$ 3.000+ em notebook novo.
- **Campo Largo**: PC de escritório com 6 anos, múltiplos componentes queimados. Nesse caso, recomendamos troca — reparo custaria mais que um PC novo equivalente.` },

  { slug: "gpu-desgastada", title: "GPU Desgastada | Diagnóstico Curitiba", metaDescription: "GPU/placa de vídeo com problemas? Artefatos, tela preta, desempenho baixo? Diagnóstico em Curitiba.", h1: "GPU Desgastada — Sinais e O Que Fazer", categoria: "Erros e Casos Reais", intro: `GPUs (placas de vídeo) são componentes que trabalham sob alta temperatura e carga. Com o tempo, solda, pasta térmica e capacitores degradam. Os sinais mais comuns são artefatos na tela, travamentos em jogos e tela preta. GPUs usadas em mineração de criptomoedas sofrem desgaste acelerado.`, sintomas: [{ titulo: "Artefatos visuais (pixels coloridos)", desc: "Pontos, linhas ou blocos coloridos na tela. Memória da GPU ou chip com defeito.", gravidade: "Médio a complexo" }, { titulo: "Tela preta em jogos", desc: "GPU não aguenta carga e desliga o vídeo.", gravidade: "Médio" }, { titulo: "Performance muito abaixo do esperado", desc: "Temperaturas altas causam throttling ou chip degradado.", gravidade: "Médio" }], causas: [{ titulo: "Desgaste por temperatura", desc: "Anos de uso em temperatura alta degradam a solda e os chips.", tipo: "desgaste" }, { titulo: "Mineração de criptomoedas", desc: "Uso 24/7 em carga máxima acelera o desgaste em 3-5x.", tipo: "desgaste" }, { titulo: "Pasta térmica seca", desc: "GPU esquenta mais que deveria, acelerando degradação.", tipo: "desgaste" }, { titulo: "Solda fria (BGA)", desc: "Microsoldas entre chip e substrato perdem contato.", tipo: "desgaste" }], cenarios: [{ nivel: "Simples", desc: "Troca de pasta térmica e limpeza. Pode resolver throttling.", tempo: "1h", custo: "R$ 120 a R$ 200" }, { nivel: "Médio", desc: "Troca de pasta + pads térmicos + teste extensivo.", tempo: "1 a 2 dias", custo: "R$ 200 a R$ 350" }, { nivel: "Complexo", desc: "Reballing (resolda do chip). Nem sempre funciona.", tempo: "5 a 15 dias", custo: "R$ 300 a R$ 600" }], riscos: ["Reballing não é garantido e a GPU pode falhar novamente", "Continuar usando com artefatos pode causar dano ao monitor (raro)"], diagnostico: `Teste de estresse com monitoramento de temperatura, análise de artefatos, verificação de solda com diagnóstico térmico. Custo: R$ 90.`, solucao: `Para superaquecimento: manutenção térmica. Para solda fria: reballing (quando viável). Para desgaste severo: substituição.`, quandoCompensa: "Limpeza + pasta sempre compensa. Reballing compensa para GPUs de médio a alto valor.", quandoNaoCompensa: "Reballing de GPU de baixo valor (GT 710, GT 1030) ou muito antiga.", whatsappMessage: "Olá! Minha placa de vídeo está com problemas. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Sem Vídeo", to: "/computador-sem-video-curitiba" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }, { label: "Placa-Mãe Queimada", to: "/placa-mae-queimada" }, { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" }, { label: "Montagem PC", to: "/servicos/montagem-pc" }], conteudoExtra: `### GPUs de Mineração: Cuidado

Se você comprou GPU usada que foi usada em mineração, saiba que:
- A vida útil foi drasticamente reduzida
- Soldas BGA estão mais frágeis
- Ventoinhas podem estar desgastadas
- Reballing pode dar sobrevida temporária

### Entendendo os Artefatos Visuais

Artefatos são o sintoma mais visível de uma GPU com problemas. Existem diferentes tipos:

- **Pontos coloridos aleatórios**: Geralmente memória VRAM com defeito. Pode ser solda fria no chip de memória.
- **Blocos retangulares**: Chip GPU com degradação. Sinal mais grave.
- **Linhas horizontais/verticais**: Pode ser GPU ou monitor — teste com outro monitor primeiro.
- **Textos distorcidos**: Memória de vídeo ou driver corrompido (testar com DDU + reinstalação).

### Temperatura: O Inimigo Número 1

GPUs são projetadas para operar até 80-85°C sob carga. Acima de 90°C, entram em **thermal throttling** (reduzem performance para não queimar). Acima de 100°C, começam a sofrer danos reais.

**Causas de superaquecimento em GPUs:**
1. Pasta térmica seca (após 2-4 anos de uso)
2. Ventoinhas com rolamento desgastado
3. Pads térmicos comprimidos ou ressecados
4. Gabinete sem fluxo de ar adequado
5. Cooler obstruído por poeira

### Reballing: O Que É e Quando Funciona

Reballing é o processo de remover o chip GPU da placa, limpar as microsoldas BGA e resoldá-las com esferas novas de estanho. É um procedimento complexo que exige:

- Estação de retrabalho BGA profissional
- Stencils específicos para cada chip
- Experiência técnica significativa

**Taxa de sucesso**: 60-80% dependendo do chip e extensão do dano. Pode dar sobrevida de meses a anos, mas não é garantia permanente.

**Compensa quando**: GPU custa R$ 1.500+ nova e o reballing fica em R$ 300-500.
**Não compensa quando**: GPU vale menos de R$ 500 nova ou já foi reballing antes.

### Manutenção Preventiva para GPUs

Para prolongar a vida da sua GPU em Curitiba (onde o clima úmido e a poeira são fatores):

| Intervalo | Ação | Custo |
|---|---|---|
| 6 meses | Limpeza externa com ar comprimido | Grátis (DIY) |
| 12-18 meses | Troca de pasta térmica | R$ 120-200 |
| 24 meses | Troca de pads térmicos | R$ 150-250 |
| Quando necessário | Troca de ventoinhas | R$ 80-200 |` },

  { slug: "curto-em-placa-eletronica", title: "Curto em Placa Eletrônica | Diagnóstico Curitiba", metaDescription: "Curto-circuito em placa eletrônica? Diagnóstico profissional e reparo com microssolda em Curitiba.", h1: "Curto em Placa Eletrônica — Diagnóstico e Reparo", categoria: "Erros e Casos Reais", intro: `Um curto-circuito em placa eletrônica pode afetar computadores, notebooks, TVs e diversos equipamentos. O curto ocorre quando dois pontos que não deveriam estar conectados fazem contato — por líquido, poeira condutiva, componente queimado ou trilha danificada. O diagnóstico com multímetro e câmera térmica localiza o ponto exato do curto.`, sintomas: [{ titulo: "Equipamento não liga", desc: "Curto impede alimentação. Fonte entra em proteção.", gravidade: "Médio a complexo" }, { titulo: "Cheiro de queimado", desc: "Componente em curto gera calor e queima.", gravidade: "Complexo" }, { titulo: "Funciona parcialmente", desc: "Curto em trilha específica afeta apenas uma função.", gravidade: "Médio" }], causas: [{ titulo: "Líquido na placa", desc: "Água, café ou outros líquidos criam caminhos de curto.", tipo: "erro-humano" }, { titulo: "Componente SMD queimado", desc: "Resistor, capacitor ou diodo que falhou e criou curto.", tipo: "hardware" }, { titulo: "Poeira condutiva", desc: "Acúmulo de poeira metálica ou úmida entre trilhas.", tipo: "desgaste" }, { titulo: "Dano por ferramenta", desc: "Chave de fenda escorregou e riscou trilha, criando contato.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Limpeza e remoção do agente causador do curto.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Troca de componente SMD em curto.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Reparo de trilha danificada + troca de componentes.", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 800+" }], riscos: ["Curto em cadeia pode danificar vários componentes", "Tentar reparar sem equipamento adequado causa mais dano"], diagnostico: `Localização do curto com multímetro e câmera térmica, identificação do componente causador, análise da extensão do dano. Custo: R$ 90-150.`, solucao: `Remoção do componente em curto, troca por novo, limpeza e teste completo.`, quandoCompensa: "Quando o curto é localizado e o equipamento tem valor. O reparo é viável na maioria dos casos.", quandoNaoCompensa: "Quando o curto causou dano em cadeia extenso.", whatsappMessage: "Olá! Meu equipamento tem curto-circuito. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Placa-Mãe Queimada", to: "/placa-mae-queimada" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }, { label: "Notebook com Líquido", to: "/notebook-com-agua-ou-liquido-curitiba" }, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }], conteudoExtra: `### Como Ocorre um Curto?

Imagine trilhas de cobre na placa como estradas. Um curto é como uma ponte ilegal entre duas estradas — a energia vai para onde não deveria, causando dano. O diagnóstico localiza essa "ponte" e a remove.

### O Processo de Diagnóstico de Curto-Circuito

Diagnosticar um curto em placa eletrônica é um trabalho técnico que exige ferramentas específicas e experiência. O processo na nossa bancada em Curitiba segue estas etapas:

**1. Inspeção Visual com Microscópio**
Antes de ligar qualquer instrumento, inspecionamos a placa sob microscópio estereoscópico (aumento de 10-40x). Procuramos sinais visíveis: trilhas escurecidas, componentes queimados, resíduos de líquido, soldas frias.

**2. Medição com Multímetro**
Testamos resistência entre linhas de alimentação. Valores anormalmente baixos (próximos de zero ohms) indicam curto direto. Cada linha de tensão é testada individualmente.

**3. Injeção de Corrente Controlada**
Com uma fonte de bancada limitada em corrente, alimentamos a placa com tensão baixa. O componente em curto esquenta — e é aí que entra a câmera térmica.

**4. Câmera Térmica / Thermal Pad**
A câmera infravermelha identifica exatamente qual componente está gerando calor anormal. É o ponto do curto.

**5. Remoção e Teste**
Removemos o componente suspeito com estação de solda de ar quente e testamos novamente. Se o curto desaparece, encontramos o culpado.

### Tipos de Componentes que Causam Curto

| Componente | Frequência | Reparo |
|---|---|---|
| Capacitor cerâmico | Muito comum | Fácil — troca rápida |
| MOSFET | Comum | Médio — precisa do componente certo |
| Diodo de proteção | Comum | Fácil — troca rápida |
| Chip BGA | Raro | Complexo — reballing ou troca |
| Trilha danificada | Variável | Médio — ponte com fio |

### Prevenção de Curtos em Equipamentos

Em Curitiba e região metropolitana, os fatores ambientais que mais contribuem para curtos são:

1. **Umidade alta** — especialmente em garagens e cômodos sem ventilação. Use desumidificador ou mantenha o PC em local arejado.
2. **Poeira** — ambientes com reformas, oficinas mecânicas ou próximos a avenidas movimentadas acumulam poeira condutiva. Limpeza preventiva a cada 6-12 meses.
3. **Rede elétrica instável** — bairros mais afastados de Curitiba e cidades como Fazenda Rio Grande e Piraquara sofrem mais com oscilações. Use no mínimo filtro de linha com varistor.
4. **Animais domésticos** — pelos de gato e cachorro acumulam dentro de gabinetes e podem reter umidade.` },

  // ===== SOFTWARE / SISTEMA (31-35) =====
  { slug: "windows-lento-curitiba", title: "Windows Lento em Curitiba | Otimização e Diagnóstico", metaDescription: "Windows lento? Otimização profissional, limpeza e diagnóstico em Curitiba. Resolva sem formatar.", h1: "Windows Lento em Curitiba — Otimização Profissional", categoria: "Software / Sistema", intro: `Windows lento pode ser causado por acúmulo de programas, malware, drivers desatualizados, registro corrompido ou simplesmente hardware insuficiente. Antes de formatar, vale investir em diagnóstico para entender se o problema é software (otimização resolve) ou hardware (upgrade necessário). A formatação é solução válida, mas nem sempre necessária.`, sintomas: [{ titulo: "Boot demorado", desc: "Windows leva minutos para iniciar. Muitos programas na inicialização.", gravidade: "Simples" }, { titulo: "Programas lentos", desc: "Tudo abre devagar. RAM lotada ou disco em 100%.", gravidade: "Simples a médio" }, { titulo: "Windows Update trava", desc: "Atualizações ficam em loop ou travam a máquina.", gravidade: "Simples" }], causas: [{ titulo: "Programas desnecessários na inicialização", desc: "Dezenas de programas abrem junto com o Windows.", tipo: "software" }, { titulo: "Malware oculto", desc: "Vírus ou mineradores consumindo recursos.", tipo: "software" }, { titulo: "Registro corrompido", desc: "Anos de instalações acumulam lixo no registro.", tipo: "software" }, { titulo: "HD mecânico", desc: "O gargalo pode ser hardware, não software.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Otimização, limpeza de inicialização, remoção de bloatware.", tempo: "1h", custo: "R$ 100 a R$ 150" }, { nivel: "Médio", desc: "Formatação limpa + instalação de drivers.", tempo: "2h a 4h", custo: "R$ 150 a R$ 250" }, { nivel: "Complexo", desc: "Diagnóstico de hardware + upgrade.", tempo: "2h a 1 dia", custo: "R$ 250 a R$ 600+" }], riscos: ["CCleaner e similares podem causar mais problemas", "Formatar sem backup perde dados"], diagnostico: `Análise de performance, verificação de malware, teste de disco e RAM. Custo: R$ 90.`, solucao: `Otimização quando possível, formatação quando necessário, upgrade quando o hardware é o gargalo.`, quandoCompensa: "Otimização sempre compensa tentar antes de formatar.", quandoNaoCompensa: "Quando o hardware é muito antigo — otimizar software não compensa o gargalo.", whatsappMessage: "Olá! Meu Windows está muito lento. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }, { label: "Vírus no PC", to: "/computador-com-virus-curitiba" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Otimização vs Formatação

| Aspecto | Otimização | Formatação |
|---|---|---|
| Tempo | 1h | 2-4h |
| Perde dados | Não | Sim (sem backup) |
| Eficácia | 70-80% dos casos | 95% dos casos |
| Custo | Menor | Maior |
| Recomendado quando | Problema é leve | Sistema muito comprometido |

### As 10 Causas Mais Comuns de Windows Lento em Curitiba

Baseado em mais de 500 atendimentos nos últimos 12 meses, estas são as causas mais frequentes de lentidão em Windows na região de Curitiba:

1. **HD mecânico (42% dos casos)** — O gargalo número 1. Computadores com HD mecânico ficam dramaticamente lentos com o Windows 10/11. A solução é upgrade para SSD — transformação imediata.

2. **Pouca RAM (28%)** — Windows 11 com 4GB de RAM é impraticável. Chrome com 5 abas já esgota. Mínimo recomendado: 8GB.

3. **Programas na inicialização (15%)** — Dezenas de programas abrem ao ligar. Spotify, Discord, Steam, Google Drive, OneDrive, Adobe, etc. Cada um consome memória e processamento.

4. **Malware oculto (8%)** — Mineradores de criptomoeda, adware e spyware consumindo recursos sem que o usuário perceba.

5. **Windows Update em loop (4%)** — Atualizações que baixam, falham e tentam novamente infinitamente.

6. **Disco cheio (3%)** — Menos de 10% de espaço livre no disco causa lentidão significativa.

### O Mito dos "Programas de Otimização"

**CCleaner, Advanced SystemCare, IObit, etc.** — Esses programas prometem "limpar e otimizar" o Windows, mas frequentemente:

- Apagam entradas de registro que o sistema precisa
- Removem cache que o Windows vai recriar (gerando mais trabalho)
- Instalam bloatware adicional junto
- Criam falsa sensação de melhoria sem resolver o problema real

A otimização profissional é diferente: identificamos a CAUSA real da lentidão (hardware ou software) e aplicamos a solução correta.

### Checklist de Otimização Profissional

Quando fazemos otimização em Curitiba, seguimos um protocolo completo:

1. ✅ Análise de processos em execução (Gerenciador de Tarefas)
2. ✅ Verificação de disco (SMART + CrystalDiskInfo)
3. ✅ Teste de memória (MemTest86)
4. ✅ Scan de malware (ferramentas profissionais, não antivírus gratuito)
5. ✅ Limpeza de inicialização (Autoruns da Microsoft)
6. ✅ Verificação de drivers desatualizados
7. ✅ Análise de espaço em disco
8. ✅ Verificação de temperatura do processador
9. ✅ Teste de velocidade do disco (benchmarks)
10. ✅ Recomendação: otimizar, formatar ou fazer upgrade` },

  { slug: "computador-com-virus-curitiba", title: "Computador com Vírus em Curitiba | Remoção", metaDescription: "Computador com vírus? Remoção profissional em Curitiba. Malware, ransomware, adware. Atendimento no mesmo dia.", h1: "Computador com Vírus em Curitiba — Remoção Profissional", categoria: "Software / Sistema", intro: `Vírus, malware, ransomware, adware — cada tipo de ameaça requer uma abordagem diferente. "Passar o antivírus" nem sempre resolve. Ameaças modernas se escondem em processos do sistema, registro e áreas protegidas do disco. A remoção profissional garante eliminação completa sem perda de dados.`, sintomas: [{ titulo: "Pop-ups e propagandas excessivas", desc: "Adware instalado. Programas indesejados abrem sozinhos.", gravidade: "Simples" }, { titulo: "Computador extremamente lento", desc: "Minerador de criptomoedas usando CPU/GPU em segundo plano.", gravidade: "Simples a médio" }, { titulo: "Arquivos criptografados (ransomware)", desc: "Arquivos renomeados com extensão estranha. Pedido de resgate.", gravidade: "Complexo" }, { titulo: "Programas abrindo sozinhos", desc: "Malware executando em segundo plano.", gravidade: "Simples a médio" }], causas: [{ titulo: "Download de programas de fontes não confiáveis", desc: "Cracks, programas piratas e sites duvidosos.", tipo: "erro-humano" }, { titulo: "E-mail com anexo malicioso", desc: "Phishing com arquivo infectado.", tipo: "erro-humano" }, { titulo: "Navegação em sites comprometidos", desc: "Drive-by download — infecção automática.", tipo: "software" }, { titulo: "Pen drive infectado", desc: "Autorun de dispositivos USB.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Remoção de adware e programas indesejados.", tempo: "1h a 2h", custo: "R$ 100 a R$ 180" }, { nivel: "Médio", desc: "Remoção de malware profundo + limpeza completa.", tempo: "2h a 4h", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Ransomware ou rootkit — pode exigir formatação.", tempo: "4h a 1 dia", custo: "R$ 250 a R$ 500" }], riscos: ["Antivírus gratuito nem sempre detecta ameaças avançadas", "Tentar remover manualmente pode apagar arquivos do sistema", "Ransomware: pagar resgate não garante recuperação"], diagnostico: `Análise com ferramentas profissionais (não só antivírus), scan de registro, processos e serviços. Custo: R$ 90.`, solucao: `Remoção completa com ferramentas profissionais + proteção + orientação de prevenção.`, quandoCompensa: "Quase sempre — remoção é mais rápida e barata que formatação na maioria dos casos.", quandoNaoCompensa: "Ransomware com criptografia forte onde os dados não são recuperáveis — formatação é a saída.", whatsappMessage: "Olá! Meu computador está com vírus. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Remoção de Vírus", to: "/servicos/remocao-virus" }, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }], conteudoExtra: `### Prevenção é Melhor que Remediação

1. Nunca baixe programas de sites desconhecidos
2. Não abra anexos de e-mails suspeitos
3. Mantenha Windows e antivírus atualizados
4. Use senhas fortes e diferentes
5. Faça backup regular dos dados importantes

### Tipos de Ameaças Digitais em 2024-2025

As ameaças evoluíram significativamente. Não é mais só "vírus" — cada tipo requer uma abordagem diferente:

**Adware** — Exibe propagandas, abre abas no navegador, instala barras de ferramentas. Geralmente vem junto com programas "gratuitos". Remoção: relativamente simples.

**Spyware** — Espiona o que você faz: teclas digitadas, senhas, dados bancários. Pode ser invisível por meses. Remoção: moderada, exige ferramentas específicas.

**Ransomware** — Criptografa seus arquivos e pede resgate (geralmente em Bitcoin). As variantes modernas usam criptografia AES-256 que é IMPOSSÍVEL de quebrar sem a chave. Prevenção: backup é a ÚNICA proteção eficaz.

**Cryptojacker** — Usa seu computador para minerar criptomoedas. Sintoma: CPU a 100% constantemente, ventoinhas em velocidade máxima, conta de luz mais alta.

**Rootkit** — Se esconde nas camadas mais profundas do sistema operacional. Antivírus convencionais não detectam. Pode ser necessário formatação completa.

### O Processo de Remoção Profissional

Diferente de "passar o antivírus", a remoção profissional que fazemos em Curitiba segue um protocolo rigoroso:

1. **Análise de processos** — Identificamos todos os processos em execução e comparamos com uma base de dados de malware conhecido.
2. **Scan com múltiplas ferramentas** — Usamos 3-4 ferramentas diferentes, pois cada uma detecta ameaças que as outras não encontram.
3. **Verificação de registro** — Malware cria entradas de registro para se auto-executar no boot. Removemos todas.
4. **Verificação de serviços** — Alguns malwares se instalam como serviços do Windows, difíceis de encontrar.
5. **Verificação de tarefas agendadas** — Malware pode agendar reinfecção.
6. **Verificação de extensões do navegador** — Adware frequentemente se instala como extensão.
7. **Teste final + proteção** — Após remoção, instalamos proteção adequada.

### Ransomware: A Ameaça Mais Perigosa

Em Curitiba, atendemos casos de ransomware mensalmente — tanto em residências quanto em empresas. O que você PRECISA saber:

- **NUNCA pague o resgate** — não há garantia de recuperação e financia criminosos
- **Backup é a única prevenção** — HD externo ou nuvem, desconectado do PC
- **Existem decifradores gratuitos** para algumas variantes antigas (verifique nomoreransom.org)
- **Para variantes modernas** — se não tem backup, os dados estão perdidos

### Quanto Custa a Proteção vs o Dano

| Item | Custo de Prevenção | Custo do Dano |
|---|---|---|
| Antivírus pago | R$ 80-200/ano | Remoção: R$ 150-500 |
| Backup em HD externo | R$ 250-400 (uma vez) | Perda de dados: incalculável |
| Backup em nuvem | R$ 10-30/mês | Ransomware: perda total |
| Proteção de e-mail | R$ 0 (educação) | Phishing: roubo bancário |` },

  { slug: "formatacao-resolve-curitiba", title: "Formatação Resolve Meu Problema? | Curitiba", metaDescription: "Será que formatar resolve? Saiba quando a formatação é a solução e quando é desnecessária. Técnico em Curitiba.", h1: "Formatação Resolve Meu Problema? — Guia Honesto", categoria: "Software / Sistema", intro: `"Manda formatar que resolve" é o conselho mais dado — e nem sempre correto. A formatação resolve problemas de software (vírus, sistema corrompido, lentidão por acúmulo), mas NÃO resolve problemas de hardware (HD com defeito, superaquecimento, RAM falhando). Formatar sem diagnóstico pode ser desperdício de tempo e dinheiro. Nesta página, explicamos quando formatar resolve e quando não resolve.`, sintomas: [{ titulo: "Formatar resolve quando:", desc: "Vírus persistente, sistema corrompido, acúmulo de programas, Windows instável.", gravidade: "Simples" }, { titulo: "Formatar NÃO resolve quando:", desc: "HD com setores defeituosos, superaquecimento, RAM com erro, fonte instável.", gravidade: "N/A" }], causas: [{ titulo: "Problemas de software resolvíveis por formatação", desc: "Vírus, drivers corrompidos, registro inchado, bloatware.", tipo: "software" }, { titulo: "Problemas de hardware que formatação ignora", desc: "HD desgastado, RAM defeituosa, processador com throttling.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Formatação resolve — Windows limpo + drivers.", tempo: "2h a 3h", custo: "R$ 150 a R$ 250" }, { nivel: "Médio", desc: "Formatação + diagnóstico para confirmar se é só software.", tempo: "3h a 5h", custo: "R$ 200 a R$ 350" }, { nivel: "Complexo", desc: "Problema é hardware — formatação não resolve.", tempo: "Variável", custo: "Depende do reparo" }], riscos: ["Formatar sem backup = perda total de dados", "Formatar com HD defeituoso = problema volta em semanas", "Formatar notebook com superaquecimento = dinheiro jogado fora"], diagnostico: `Diagnóstico rápido para determinar se é software ou hardware ANTES de formatar. Custo: R$ 90 (economiza formatação desnecessária).`, solucao: `Se é software: formatação limpa. Se é hardware: reparo ou upgrade primeiro, depois formatação se necessário.`, quandoCompensa: "Quando o diagnóstico confirma que é problema de software.", quandoNaoCompensa: "Quando há sintomas claros de hardware (barulhos, superaquecimento, erros em teste de memória).", whatsappMessage: "Olá! Preciso saber se formatação resolve meu problema. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }, { label: "Erro Após Formatação", to: "/erro-apos-formatacao" }, { label: "Vírus no PC", to: "/computador-com-virus-curitiba" }], conteudoExtra: `### Tabela: Quando Formatar Resolve?

| Problema | Formatar Resolve? |
|---|---|
| Vírus/malware | ✅ Sim |
| Windows corrompido | ✅ Sim |
| Lento por software | ✅ Sim |
| HD com defeito | ❌ Não |
| Superaquecimento | ❌ Não |
| RAM defeituosa | ❌ Não |
| Fonte instável | ❌ Não |
| Tela azul por driver | ✅ Sim |
| Tela azul por hardware | ❌ Não |

### A Formatação em Detalhes

Formatar um computador não é simplesmente "resetar". É um processo que envolve:

1. **Backup de dados** — O passo mais importante e mais esquecido. Documentos, fotos, favoritos do navegador, senhas salvas, licenças de programas — tudo precisa ser salvo ANTES.

2. **Criação do pendrive de instalação** — Com a mídia oficial do Windows (não versões modificadas de fóruns).

3. **Formatação do disco** — Apaga todos os dados e partições. Para HDs com defeito, isso pode mascarar o problema temporariamente.

4. **Instalação limpa do Windows** — Windows 10 ou 11, versão mais recente, sem programas pré-instalados.

5. **Instalação de drivers** — Chipset, vídeo, áudio, rede, Bluetooth. Cada fabricante tem drivers específicos.

6. **Atualizações** — Windows Update completo (pode demorar 1-2h dependendo da internet).

7. **Instalação de programas essenciais** — Office, navegador, antivírus, etc.

8. **Restauração de dados** — Devolver os arquivos do backup.

### Por Que "Formatou e Voltou a Ficar Lento"?

Esse é um dos relatos mais comuns em Curitiba. A formatação resolveu por 2-3 semanas e o PC ficou lento de novo. Causas:

- **O problema era hardware** — HD com setores defeituosos, RAM com erros, ou superaquecimento. A formatação mascarou temporariamente.
- **Reinstalou os mesmos programas pesados** — Se você reinstala 30 programas na inicialização, vai ficar lento de novo.
- **Não instalou drivers corretos** — Sem o driver de vídeo, o processador faz o trabalho da GPU = lentidão.
- **Reinfecção por malware** — Sem antivírus adequado, reinfecção em dias.

### Diagnóstico Primeiro: Economize Dinheiro

O diagnóstico custa R$ 90 e identifica se o problema é software (formatação resolve) ou hardware (formatação não resolve). Compare:

| Cenário | Sem Diagnóstico | Com Diagnóstico |
|---|---|---|
| Problema é software | Formatação R$ 200 ✅ | Diagnóstico R$ 90 + Formatação R$ 200 = R$ 290 ✅ |
| Problema é hardware | Formatação R$ 200 ❌ + Reparo R$ 300 = R$ 500 | Diagnóstico R$ 90 + Reparo R$ 300 = R$ 390 ✅ |

No segundo cenário, economiza R$ 110 E resolve mais rápido.` },

  { slug: "erro-apos-formatacao", title: "Erro Após Formatação | Técnico Curitiba", metaDescription: "Formatou e continua com problemas? Veja por que a formatação não resolveu e o que fazer. Curitiba.", h1: "Erro Após Formatação — Por Que Não Resolveu?", categoria: "Software / Sistema", intro: `Formatou e o problema continua? Isso acontece quando a causa raiz é hardware, não software. Os erros mais comuns após formatação são: lentidão persistente (HD com setores defeituosos), travamentos (RAM com erro) e desligamentos (superaquecimento). Nesses casos, a formatação foi desnecessária — o próximo passo é diagnóstico de hardware.`, sintomas: [{ titulo: "Continua lento após formatar", desc: "HD com setores defeituosos ou hardware subdimensionado.", gravidade: "Médio" }, { titulo: "Tela azul mesmo após formatação", desc: "RAM, HD ou driver de hardware com problema.", gravidade: "Médio" }, { titulo: "Drivers não instalados corretamente", desc: "Formatação sem os drivers corretos.", gravidade: "Simples" }], causas: [{ titulo: "Problema era hardware", desc: "Formatação só resolve software. Hardware precisa de reparo.", tipo: "hardware" }, { titulo: "Formatação mal feita", desc: "Windows instalado sem drivers, partição errada, modo errado.", tipo: "erro-humano" }, { titulo: "HD defeituoso", desc: "Mesmo com sistema novo, disco com erros causa problemas.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Instalação de drivers faltantes.", tempo: "1h", custo: "R$ 90 a R$ 150" }, { nivel: "Médio", desc: "Diagnóstico de hardware + correção.", tempo: "2h a 4h", custo: "R$ 150 a R$ 400" }, { nivel: "Complexo", desc: "Troca de componente defeituoso + reinstalação.", tempo: "1 a 3 dias", custo: "R$ 250 a R$ 600+" }], riscos: ["Formatar de novo não vai resolver problema de hardware", "Continuar usando com HD defeituoso pode perder dados"], diagnostico: `Diagnóstico de hardware pós-formatação: teste de HD (SMART), RAM (MemTest), temperatura, fonte. Custo: R$ 90.`, solucao: `Identificar e resolver o problema de hardware que a formatação não resolveu.`, quandoCompensa: "Sempre compensa diagnosticar — melhor saber a verdade do que formatar novamente.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Formatei meu computador mas continua com problemas. Podem ajudar?", relatedPages: [...RELATED_BASE, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Por Que Isso Acontece?

Formatação é como repintar uma casa com problemas estruturais — fica bonita por fora mas os problemas continuam. O diagnóstico antes de formatar evita esse desperdício.

### Os 5 Problemas Mais Comuns Após Formatação

**1. Lentidão que volta em dias**
A causa mais comum: o HD está com setores defeituosos. O Windows até instala no disco, mas ao tentar ler/escrever nas áreas danificadas, trava. A solução não é formatar de novo — é trocar o HD por um SSD.

**2. Tela azul aleatória**
Códigos como IRQL_NOT_LESS_OR_EQUAL, PAGE_FAULT_IN_NONPAGED_AREA ou MEMORY_MANAGEMENT apontam para RAM defeituosa. O teste MemTest86 (roda antes do Windows) confirma em 30-60 minutos.

**3. Desligamento durante uso pesado**
Se o computador desliga ao jogar ou usar programas pesados MESMO após formatação, o problema é superaquecimento (pasta térmica seca, ventoinha travada) ou fonte insuficiente.

**4. Wi-Fi ou som não funcionam**
Não é erro — é falta de driver. A formatação remove todos os drivers. Cada fabricante (Dell, HP, Lenovo, Acer, Asus) tem drivers específicos que precisam ser baixados e instalados.

**5. "Disco 100%" no Gerenciador de Tarefas**
Se o disco fica em 100% de uso constantemente mesmo após formatação limpa, o HD mecânico é o gargalo. Windows 10/11 não foi feito para rodar em HD — SSD é essencial.

### Quanto Custa Resolver de Verdade?

| Problema Real | Solução | Custo |
|---|---|---|
| HD defeituoso | Troca por SSD + clonagem | R$ 250 a R$ 500 |
| RAM com defeito | Troca de módulo | R$ 150 a R$ 400 |
| Superaquecimento | Limpeza + pasta térmica | R$ 120 a R$ 200 |
| Drivers faltando | Instalação completa | R$ 90 a R$ 150 |
| Fonte instável | Troca de fonte | R$ 200 a R$ 400 |

### Formatação Mal Feita: Sinais

Às vezes o problema não é hardware — é que a formatação foi mal executada:

- **Windows pirata ou modificado** — Versões "lite" ou "otimizadas" de fóruns removem componentes essenciais
- **Modo Legacy vs UEFI** — Instalar em modo errado causa problemas de boot e performance
- **Partição errada** — GPT vs MBR precisa estar correto para o modo de boot
- **Sem drivers** — "Funciona" mas sem driver de vídeo, o PC usa renderização por software (extremamente lento)

Se sua formatação foi feita por alguém sem experiência técnica, pode ser que o problema seja a própria formatação, não o hardware.` },

  { slug: "pc-com-programas-pesados", title: "PC com Programas Pesados em Curitiba | Otimização", metaDescription: "PC não roda programas pesados? AutoCAD, Photoshop, jogos? Diagnóstico e upgrade em Curitiba.", h1: "PC com Programas Pesados em Curitiba — Otimização e Upgrade", categoria: "Software / Sistema", intro: `Programas como AutoCAD, Photoshop, Premiere, jogos modernos e softwares de engenharia exigem hardware específico. Se seu computador trava, fica lento ou não abre esses programas, o diagnóstico identifica qual componente é o gargalo e qual upgrade resolve.`, sintomas: [{ titulo: "Programa trava ao abrir", desc: "RAM ou GPU insuficiente para o software.", gravidade: "Simples" }, { titulo: "Lentidão extrema ao usar", desc: "Processador ou disco não acompanha.", gravidade: "Simples a médio" }, { titulo: "Renderização muito lenta", desc: "CPU/GPU insuficiente para processamento pesado.", gravidade: "Simples" }], causas: [{ titulo: "RAM insuficiente", desc: "Programas pesados exigem 16-32GB. Muitos PCs têm 4-8GB.", tipo: "hardware" }, { titulo: "GPU insuficiente", desc: "Jogos e 3D exigem GPU dedicada. Integrada não dá conta.", tipo: "hardware" }, { titulo: "Disco lento (HD)", desc: "Programas grandes precisam de SSD para carregar rápido.", tipo: "hardware" }, { titulo: "Processador antigo", desc: "Processadores de 5+ anos podem não acompanhar software moderno.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Upgrade de RAM + SSD resolve a maioria.", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Médio", desc: "Upgrade de RAM + SSD + GPU.", tempo: "4h a 1 dia", custo: "R$ 600 a R$ 1500" }, { nivel: "Complexo", desc: "Montagem de PC otimizada para a carga de trabalho.", tempo: "Sob consulta", custo: "Sob consulta" }], riscos: ["Comprar peça errada por não saber qual é o gargalo", "Upgrade parcial pode não resolver se o gargalo é outro componente"], diagnostico: `Análise de requisitos do software vs hardware atual, identificação do gargalo, recomendação de upgrade. Custo: R$ 90 (incorporado ao serviço).`, solucao: `Upgrade direcionado ao gargalo identificado. Sem desperdício.`, quandoCompensa: "Quando o upgrade resolve o gargalo e o hardware base ainda é bom.", quandoNaoCompensa: "Quando o hardware todo é defasado e o upgrade seria quase uma montagem nova.", whatsappMessage: "Olá! Meu PC não roda programas pesados. Podem me ajudar com upgrade?", relatedPages: [...RELATED_BASE, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }, { label: "Montagem PC", to: "/servicos/montagem-pc" }, { label: "Computador Travando", to: "/computador-travando-curitiba" }, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }], conteudoExtra: `### Requisitos Mínimos Recomendados

| Software | RAM Mínima | GPU | SSD |
|---|---|---|---|
| AutoCAD | 16GB | Dedicada | Sim |
| Photoshop | 16GB | 2GB+ | Sim |
| Premiere Pro | 32GB | 4GB+ | NVMe |
| Jogos Modernos | 16GB | GTX 1060+ | Sim |
| Office/Navegação | 8GB | Integrada | Sim |

### Identificando o Gargalo: O Passo Mais Importante

Antes de comprar qualquer peça, é ESSENCIAL identificar qual componente está limitando o desempenho. Comprar RAM extra quando o problema é GPU não resolve nada — e vice-versa.

**Como identificamos o gargalo:**

1. **Monitoramos CPU, RAM, GPU e Disco** durante o uso do programa problemático
2. O componente que fica a 100% enquanto os outros ficam ociosos é o gargalo
3. Ex: Se a RAM fica a 95% mas CPU fica a 30% → gargalo é RAM → upgrade de RAM resolve

### Cenários Comuns em Curitiba

**Estudante de arquitetura/engenharia** — AutoCAD e Revit em notebook com 8GB RAM e GPU integrada. Solução: upgrade para 16GB RAM + SSD (se notebook suportar). Se não suportar, montagem de desktop dedicado.

**Designer gráfico** — Photoshop e Illustrator em PC com HD mecânico. Solução: SSD NVMe (files de trabalho carregam 10x mais rápido) + upgrade de RAM para 16-32GB.

**Editor de vídeo** — Premiere Pro em PC com 8GB RAM e GPU fraca. Solução: 32GB RAM + SSD NVMe para scratch disk + GPU com pelo menos 4GB VRAM.

**Gamer** — Jogos modernos (GTA V, Cyberpunk, Valorant) em PC antigo. Solução: depende do orçamento — pode ser upgrade gradual (SSD → RAM → GPU) ou montagem completa otimizada.

### Upgrade Gradual vs Montagem Nova

| Fator | Upgrade Gradual | Montagem Nova |
|---|---|---|
| Custo | R$ 300-1500 | R$ 2500-8000+ |
| Tempo para usar | Mesmo dia | 1-3 dias |
| Performance | Boa (se base ok) | Máxima |
| Recomendado quando | PC tem menos de 5 anos | PC tem 7+ anos |
| Risco | Gargalo pode migrar | Nenhum |

Na maioria dos casos em Curitiba, o upgrade gradual é a melhor opção: SSD + RAM resolve 80% dos problemas de performance por uma fração do custo de um PC novo.` },

  // ===== DECISÃO DO CLIENTE (36-40) =====
  { slug: "vale-a-pena-consertar-computador", title: "Vale a Pena Consertar o Computador? | Guia", metaDescription: "Vale a pena consertar ou comprar novo? Guia completo para decidir. Diagnóstico profissional em Curitiba.", h1: "Vale a Pena Consertar o Computador? — Guia de Decisão", categoria: "Decisão do Cliente", intro: `Essa é a dúvida mais comum que recebemos. A resposta honesta é: depende. Depende do problema, da idade do equipamento, do custo do reparo e das necessidades do usuário. Nesta página, apresentamos um framework de decisão transparente para ajudar você a tomar a melhor escolha — sem pressão de venda.`, sintomas: [{ titulo: "Regra dos 40%", desc: "Se o reparo custa mais de 40% do valor de um equivalente novo, geralmente não compensa.", gravidade: "N/A" }, { titulo: "Idade do equipamento", desc: "Computadores com mais de 7-8 anos tendem a ter múltiplos problemas em sequência.", gravidade: "N/A" }], causas: [{ titulo: "Problema único e identificável", desc: "Um componente com defeito em equipamento novo — compensa reparar.", tipo: "hardware" }, { titulo: "Múltiplos problemas", desc: "Vários componentes falhando — sinal de desgaste generalizado.", tipo: "desgaste" }, { titulo: "Defasagem tecnológica", desc: "Hardware não suporta software atual — upgrade pode não resolver.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema único com custo baixo → CONSERTAR", tempo: "Variável", custo: "Até 30% do valor de novo" }, { nivel: "Médio", desc: "Problema identificável mas custo moderado → AVALIAR", tempo: "Variável", custo: "30-50% do valor de novo" }, { nivel: "Complexo", desc: "Múltiplos problemas ou custo alto → CONSIDERAR NOVO", tempo: "Variável", custo: "Acima de 50% do valor de novo" }], riscos: ["Reparar sem diagnóstico pode acabar custando mais que novo", "Comprar novo sem avaliar pode ser desperdício quando reparo é simples"], diagnostico: `Diagnóstico profissional + laudo com opções claras: reparar (custo X), upgrade (custo Y) ou trocar. Custo: R$ 90.`, solucao: `Transparência total. Apresentamos as opções com custos e você decide.`, quandoCompensa: "Equipamento com menos de 5-6 anos, problema único, custo do reparo até 40% do novo.", quandoNaoCompensa: "Equipamento com 7+ anos, múltiplos problemas, reparo custando mais de 50% do novo.", whatsappMessage: "Olá! Quero saber se compensa consertar meu computador. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Quando Não Compensa", to: "/quando-nao-compensa" }, { label: "Custo Reparo vs Novo", to: "/custo-reparo-vs-novo" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }, { label: "Vale Consertar Notebook?", to: "/vale-a-pena-consertar-notebook" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Checklist de Decisão

✅ Compensa consertar se:
- Equipamento tem menos de 5 anos
- Problema é único e identificável
- Custo do reparo < 40% do novo
- Hardware atende suas necessidades

❌ Considere trocar se:
- Equipamento tem 7+ anos
- Já teve reparos recentes
- Precisa de mais performance
- Custo do reparo > 50% do novo

### A Matemática da Decisão

Muitos clientes em Curitiba nos perguntam "compensa consertar?". A resposta é sempre baseada em números, não em opinião. Vamos usar exemplos reais:

**Exemplo 1: Desktop de 3 anos com fonte queimada**
- Valor de um equivalente novo: R$ 3.500
- Custo do reparo (troca de fonte): R$ 250
- Cálculo: R$ 250 / R$ 3.500 = 7% → **COMPENSA MUITO**

**Exemplo 2: Notebook de 5 anos com tela quebrada**
- Valor de um equivalente novo: R$ 4.000
- Custo da troca de tela: R$ 600
- Cálculo: R$ 600 / R$ 4.000 = 15% → **COMPENSA**

**Exemplo 3: Desktop de 8 anos com placa-mãe queimada**
- Valor de um equivalente novo: R$ 3.000
- Custo da troca de placa + processador + RAM (incompatíveis): R$ 1.800
- Cálculo: R$ 1.800 / R$ 3.000 = 60% → **NÃO COMPENSA**

### A Regra dos Reparos Sequenciais

Se seu computador já precisou de reparo nos últimos 6 meses e agora precisa de outro, atenção: isso pode indicar desgaste generalizado. Quando componentes começam a falhar em sequência, o custo acumulado rapidamente ultrapassa o de um equipamento novo.

### Nosso Compromisso de Transparência

Preferimos perder um serviço a recomendar um reparo que não vale a pena. Quando diagnosticamos e concluímos que não compensa, informamos e orientamos sobre as melhores opções de compra para seu perfil de uso.

Em Curitiba e região metropolitana, atendemos centenas de diagnósticos por mês. Em média, 75% dos casos compensam reparar, 15% compensam fazer upgrade, e 10% recomendamos substituição.

### O Fator "Emocional" vs "Racional"

Muitos clientes têm apego ao equipamento (fotos, configurações, anos de uso). Isso é válido, mas a decisão deve ser racional:

- **Dados e fotos**: podem ser transferidos para o novo equipamento
- **Configurações**: podem ser reconfiguradas
- **Programas**: podem ser reinstalados
- **O que NÃO pode ser transferido**: nada — tudo é migrável` },

  { slug: "vale-a-pena-consertar-notebook", title: "Vale a Pena Consertar o Notebook? | Guia", metaDescription: "Vale a pena consertar o notebook ou comprar novo? Guia de decisão com dados reais. Curitiba.", h1: "Vale a Pena Consertar o Notebook? — Guia Completo", categoria: "Decisão do Cliente", intro: `Notebooks são mais caros de reparar que desktops (componentes integrados, peças específicas). Mas isso não significa que sempre é melhor comprar novo. O diagnóstico profissional identifica o problema e o custo real do reparo para você poder decidir com informação — não com medo.`, sintomas: [{ titulo: "Problema simples em notebook bom", desc: "Troca de tela, teclado, SSD → quase sempre compensa.", gravidade: "Simples" }, { titulo: "Placa-mãe em notebook caro", desc: "Reparo pode valer se o notebook é recente e de valor.", gravidade: "Médio" }, { titulo: "Múltiplos defeitos em notebook antigo", desc: "Geralmente não compensa.", gravidade: "Complexo" }], causas: [{ titulo: "Peças específicas por modelo", desc: "Telas, teclados e baterias são específicos — preço varia muito.", tipo: "hardware" }, { titulo: "Reparo de placa-mãe", desc: "Mais complexo que desktop por componentes soldados.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Troca de SSD, RAM, teclado, bateria → COMPENSA", tempo: "1 a 3 dias", custo: "R$ 150 a R$ 500" }, { nivel: "Médio", desc: "Troca de tela ou reparo de jack → AVALIAR", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 800" }, { nivel: "Complexo", desc: "Reparo de placa-mãe → DEPENDE DO VALOR DO NOTEBOOK", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 1200" }], riscos: ["Comprar notebook novo barato pode ser pior que reparar o atual"], diagnostico: `Diagnóstico completo com laudo detalhado e opções. Custo: R$ 90.`, solucao: `Transparência: laudo com custo de reparo vs custo de equivalente novo.`, quandoCompensa: "Notebook de menos de 4 anos, com problema específico e custo de reparo razoável.", quandoNaoCompensa: "Notebook de baixo valor (< R$ 2000 novo) com placa-mãe defeituosa.", whatsappMessage: "Olá! Quero saber se compensa consertar meu notebook. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar PC?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }, { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" }, { label: "Notebook com Líquido", to: "/notebook-com-agua-ou-liquido-curitiba" }, { label: "Conserto Notebook", to: "/servicos/conserto-pc-notebook" }], conteudoExtra: `### Tabela de Decisão para Notebooks

| Valor do Notebook Novo | Custo Máximo de Reparo Recomendado |
|---|---|
| Até R$ 2.000 | Até R$ 500 |
| R$ 2.000 - R$ 4.000 | Até R$ 1.000 |
| R$ 4.000 - R$ 8.000 | Até R$ 1.500 |
| Acima de R$ 8.000 | Até R$ 2.500 |

### Notebooks vs Desktops: Por Que o Reparo é Diferente

Notebooks têm características que tornam o reparo mais desafiador e, às vezes, mais caro:

**Componentes soldados** — Processador, GPU e muitas vezes RAM são soldados na placa-mãe. Se um falha, o reparo exige microssolda profissional.

**Peças específicas** — Cada modelo tem tela, teclado, bateria e dobradiças com formato único. Não é "genérico" como desktop.

**Acesso interno** — Desmontar um notebook requer experiência. Flexs frágeis, conectores minúsculos e parafusos ocultos tornam o processo arriscado para não-profissionais.

### Casos Comuns que Atendemos em Curitiba

**Troca de SSD/RAM (R$ 200-500)** — O upgrade mais comum e com melhor custo-benefício. Transforma notebooks lentos em rápidos. SEMPRE compensa.

**Troca de tela (R$ 300-800)** — Depende do modelo. Telas de notebooks populares (Dell, Lenovo, HP, Acer) são relativamente acessíveis. Telas OLED ou touchscreen de ultrabooks custam significativamente mais.

**Troca de bateria (R$ 150-400)** — Baterias duram 2-4 anos. A troca é simples e sempre compensa, desde que o notebook ainda atenda suas necessidades.

**Reparo de placa-mãe (R$ 400-1200)** — O caso mais delicado. A decisão depende 100% do valor do notebook. Para um notebook de R$ 6.000+, um reparo de R$ 800 faz sentido. Para um de R$ 2.000, não.

### O Erro do "Notebook Barato Novo"

Muitos clientes consideram comprar um notebook barato (R$ 1.500-2.500) em vez de reparar o atual. Cuidado: notebooks nessa faixa frequentemente são PIORES que o seu notebook atual reparado.

Notebooks baratos geralmente têm:
- Processador fraco (Celeron, Pentium)
- 4GB de RAM (insuficiente)
- HD mecânico (lento)
- Tela de baixa resolução
- Construção frágil

Seu notebook atual com um SSD novo e uma limpeza térmica pode ser superior a um notebook novo de R$ 2.000.` },

  { slug: "quando-trocar-computador", title: "Quando Trocar o Computador? | Guia Técnico", metaDescription: "Quando vale trocar o computador por um novo? Guia técnico honesto. Diagnóstico em Curitiba.", h1: "Quando Trocar o Computador? — Guia Técnico Honesto", categoria: "Decisão do Cliente", intro: `Trocar nem sempre é a resposta. Mas às vezes é a decisão mais racional. Nesta página, explicamos os sinais claros de que chegou a hora de trocar, e quando ainda vale investir em reparo ou upgrade.`, sintomas: [{ titulo: "Sinais de que é hora de trocar", desc: "Múltiplos defeitos, lentidão irrecuperável, incompatibilidade com software atual.", gravidade: "N/A" }, { titulo: "Sinais de que NÃO precisa trocar", desc: "Problema único, upgrade resolve, equipamento atende necessidades.", gravidade: "N/A" }], causas: [{ titulo: "Obsolescência real", desc: "Processador não suporta Windows 11, DDR3 não suporta mais RAM, etc.", tipo: "hardware" }, { titulo: "Obsolescência percebida", desc: "Computador parece velho mas um SSD + RAM resolve.", tipo: "software" }], cenarios: [{ nivel: "Simples", desc: "Upgrade resolve → NÃO precisa trocar", tempo: "N/A", custo: "R$ 300 a R$ 600 de upgrade" }, { nivel: "Médio", desc: "Avaliar: upgrade parcial + uso por mais 2-3 anos", tempo: "N/A", custo: "Variável" }, { nivel: "Complexo", desc: "Hardware defasado + múltiplos problemas → TROCAR", tempo: "N/A", custo: "Investir em novo" }], riscos: ["Trocar prematuramente desperdiça dinheiro", "Não trocar quando deveria desperdiça tempo e produtividade"], diagnostico: `Avaliação completa: vale upgrade ou trocar? Custo: R$ 90 (investimento que pode economizar centenas).`, solucao: `Recomendação honesta baseada em dados técnicos, não em venda.`, quandoCompensa: "Trocar quando o custo total de reparos + upgrades ultrapassa 60% de um novo que atende melhor.", quandoNaoCompensa: "Quando um upgrade de R$ 300-500 resolve o problema e estende a vida útil em 3-4 anos.", whatsappMessage: "Olá! Quero saber se devo trocar meu computador ou reparar. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar PC?", to: "/vale-a-pena-consertar-computador" }, { label: "Custo Reparo vs Novo", to: "/custo-reparo-vs-novo" }, { label: "Quando Não Compensa", to: "/quando-nao-compensa-reparo" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Os 5 Sinais de Que Chegou a Hora

1. Processador anterior a 2015 (não suporta software atual)
2. Máximo de RAM suportada é 4GB
3. Não suporta SSD
4. Terceiro reparo em 12 meses
5. Não roda mais os programas que você precisa

### Obsolescência Real vs Percebida

A indústria de tecnologia quer que você compre novo a cada 2-3 anos. A realidade é que um computador bem cuidado dura 7-10 anos com upgrades adequados.

**Obsolescência percebida**: "Meu computador está lento, preciso de um novo." — Na maioria dos casos, um SSD + RAM resolve. Custo: R$ 300-500 em vez de R$ 3.000+.

**Obsolescência real**: Quando o hardware não pode ser atualizado para atender necessidades atuais. Exemplos:
- Processador Intel 4ª geração ou anterior (2013-) → não suporta Windows 11
- Placa-mãe com DDR3 → máximo de 16GB RAM, insuficiente para workloads modernos
- Slot PCI-Express 2.0 → limita GPUs modernas

### Matriz de Decisão Completa

| Idade do PC | Problema | Custo Reparo | Decisão |
|---|---|---|---|
| 0-3 anos | Qualquer | Até R$ 800 | REPARAR ✅ |
| 3-5 anos | Simples/Médio | Até R$ 600 | REPARAR ✅ |
| 3-5 anos | Complexo | R$ 600+ | AVALIAR ⚠️ |
| 5-7 anos | Simples | Até R$ 400 | REPARAR ✅ |
| 5-7 anos | Médio/Complexo | R$ 400+ | UPGRADE ou TROCAR 🔄 |
| 7+ anos | Qualquer | Qualquer | AVALIAR TROCA 🆕 |

### Quanto Custa um PC Novo em 2024-2025?

Para ajudar na comparação, estes são os preços médios em Curitiba:

| Perfil de Uso | Desktop | Notebook |
|---|---|---|
| Básico (Office/Internet) | R$ 2.000-3.000 | R$ 2.500-3.500 |
| Intermediário (Multitarefa) | R$ 3.000-5.000 | R$ 3.500-5.500 |
| Profissional (Design/Dev) | R$ 5.000-8.000 | R$ 5.500-10.000 |
| Gamer/Pesado | R$ 5.000-15.000 | R$ 6.000-15.000 |

Compare esses valores com o custo do reparo/upgrade do seu equipamento atual para tomar a decisão mais racional.` },

  { slug: "quando-nao-compensa-reparo", title: "Quando Não Compensa o Reparo? | Guia Transparente", metaDescription: "Quando não compensa reparar? Guia honesto sobre custos, riscos e decisões. Curitiba.", h1: "Quando Não Compensa o Reparo — Transparência Total", categoria: "Decisão do Cliente", intro: `Existem situações em que reparar não é a melhor decisão. Nós fazemos questão de informar quando isso acontece, mesmo que signifique não fechar um serviço. Isso faz parte do nosso compromisso com transparência e honestidade técnica. Nesta página, explicamos os cenários onde substituir é mais inteligente que reparar.`, sintomas: [{ titulo: "Custo do reparo > 50% de novo", desc: "Investimento não se justifica.", gravidade: "N/A" }, { titulo: "Equipamento com 8+ anos", desc: "Mais problemas virão em sequência.", gravidade: "N/A" }], causas: [{ titulo: "Desgaste generalizado", desc: "Vários componentes no fim da vida útil.", tipo: "desgaste" }, { titulo: "Tecnologia obsoleta", desc: "Não recebe mais atualizações ou suporte.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reparo barato → COMPENSA (mesmo em equipamento antigo)", tempo: "N/A", custo: "Baixo" }, { nivel: "Médio", desc: "Reparo moderado em equipamento médio → AVALIAR", tempo: "N/A", custo: "Moderado" }, { nivel: "Complexo", desc: "Reparo caro em equipamento antigo → NÃO COMPENSA", tempo: "N/A", custo: "Alto" }], riscos: ["Gastar em reparo e ter outro problema em semanas"], diagnostico: `Avaliação transparente. Custo: R$ 90.`, solucao: `Recomendação honesta: reparar ou substituir.`, quandoCompensa: "Reparos baratos sempre compensam. A análise deve ser feita caso a caso.", quandoNaoCompensa: "Múltiplos defeitos em equipamento antigo, custo alto relativo ao valor.", whatsappMessage: "Olá! Quero saber se compensa reparar meu equipamento. Podem avaliar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }, { label: "Custo Reparo vs Novo", to: "/custo-reparo-vs-novo" }, { label: "Quando Não Compensa (Geral)", to: "/quando-nao-compensa" }], conteudoExtra: `### Nossa Filosofia

Preferimos perder um serviço a realizar um reparo que não vale a pena. Quando diagnosticamos um equipamento e concluímos que não compensa, informamos com transparência e orientamos sobre as melhores opções de compra.

### Os 7 Cenários Onde NÃO Compensa Reparar

**1. Custo do reparo > 50% do valor de novo**
Se um notebook novo custa R$ 3.000 e o reparo custa R$ 1.800, não faz sentido. Você gasta 60% do preço e fica com equipamento usado.

**2. Terceiro reparo em 12 meses**
Quando os componentes começam a falhar em sequência, é sinal de desgaste generalizado. O próximo reparo está a caminho.

**3. Processador obsoleto sem upgrade possível**
Processadores anteriores a 2015 não suportam Windows 11 e muitos softwares atuais. Não há upgrade de processador que resolva — é a plataforma inteira.

**4. Notebook com placa-mãe queimada + baixo valor**
Notebooks de entrada (R$ 1.500-2.500 novos) com placa-mãe defeituosa: o reparo de placa (R$ 600-1000) se aproxima do preço de um novo, sem a garantia de fábrica.

**5. TV com painel LCD danificado**
O painel é o componente mais caro da TV. Se o painel rachou ou tem defeito extenso de pixels, a troca custa quase tanto quanto uma TV nova.

**6. HD mecânico com danos físicos extensos**
Quando o disco tem centenas de setores defeituosos e a informação não é crítica, é mais inteligente comprar SSD novo do que tentar recuperar.

**7. Equipamento com dano por líquido extenso**
Notebook que ficou dias molhado sem tratamento: oxidação generalizada torna o reparo uma loteria. Cada componente pode falhar a qualquer momento.

### Como Comunicamos Quando Não Compensa

Nosso laudo pós-diagnóstico inclui:

1. **O que foi encontrado** — Problema detalhado com fotos quando relevante
2. **Custo do reparo** — Valor exato, não estimativa vaga
3. **Valor de referência de novo** — Para comparação
4. **Nossa recomendação** — Reparar, fazer upgrade ou substituir
5. **Se recomendamos substituir** — Sugerimos configurações adequadas ao perfil de uso do cliente

### Dados Reais: Quando Recomendamos Substituição

Em 2024, dos mais de 1.200 diagnósticos realizados em Curitiba e região:
- **75%** — Recomendamos reparo (custo-benefício favorável)
- **15%** — Recomendamos upgrade (SSD + RAM resolve)
- **10%** — Recomendamos substituição (não compensa reparar)

Esses 10% representam equipamentos onde a honestidade é mais valiosa que o faturamento.` },

  { slug: "custo-reparo-vs-novo", title: "Custo de Reparo vs Computador Novo | Comparação", metaDescription: "Quanto custa reparar vs comprar novo? Comparação real com dados atualizados. Curitiba.", h1: "Custo de Reparo vs Computador Novo — Comparação Real", categoria: "Decisão do Cliente", intro: `Para tomar uma decisão inteligente, você precisa comparar números reais. Nesta página, apresentamos os custos médios de reparos comuns versus o preço de computadores novos equivalentes. Dados atualizados para ajudar na sua decisão.`, sintomas: [{ titulo: "Custo médio de reparos", desc: "Desde R$ 90 (diagnóstico) até R$ 800+ (reparo complexo).", gravidade: "N/A" }], causas: [{ titulo: "Cada caso é diferente", desc: "O diagnóstico define o custo real. Sem diagnóstico, qualquer estimativa é achismo.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Limpeza, formatação, troca de peça simples: R$ 90 a R$ 250", tempo: "1h a 4h", custo: "Até R$ 250" }, { nivel: "Médio", desc: "Upgrade SSD+RAM, troca de tela, fonte: R$ 250 a R$ 600", tempo: "1 dia", custo: "R$ 250 a R$ 600" }, { nivel: "Complexo", desc: "Reparo de placa, recuperação de dados: R$ 400 a R$ 1200+", tempo: "Dias", custo: "R$ 400 a R$ 1200+" }], riscos: ["Comprar barato demais pode gerar mais problemas que o equipamento atual"], diagnostico: `Diagnóstico + laudo comparativo: custo do reparo vs preço de equivalente novo. Custo: R$ 90.`, solucao: `Decisão informada com dados reais.`, quandoCompensa: "Quando o reparo custa até 40% de um equivalente novo.", quandoNaoCompensa: "Quando o reparo ultrapassa 50% e o equipamento é antigo.", whatsappMessage: "Olá! Quero comparar custo de reparo vs comprar novo. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }, { label: "Quando Não Compensa", to: "/quando-nao-compensa-reparo" }, { label: "Vale Consertar Notebook?", to: "/vale-a-pena-consertar-notebook" }], conteudoExtra: `### Tabela Comparativa (2024-2025)

| Reparo | Custo Médio | PC Novo Equivalente |
|---|---|---|
| Troca de SSD + RAM | R$ 350-500 | R$ 2.500-3.500 |
| Troca de fonte | R$ 200-350 | R$ 2.500-3.500 |
| Troca de tela notebook | R$ 300-800 | R$ 3.000-5.000 |
| Formatação completa | R$ 150-250 | R$ 2.500+ |
| Reparo placa-mãe | R$ 300-600 | R$ 3.000+ |

### Análise Detalhada por Tipo de Reparo

**Formatação Completa (R$ 150-250)**
- Resolve: vírus, lentidão por software, Windows corrompido
- Economia vs novo: R$ 2.250-3.250 (87-93% de economia)
- Veredicto: SEMPRE compensa

**Upgrade SSD + RAM (R$ 350-600)**
- Resolve: lentidão geral, disco cheio, pouca memória
- Economia vs novo: R$ 1.900-3.150 (76-90% de economia)
- Veredicto: COMPENSA na grande maioria dos casos
- Nota: É o upgrade com melhor custo-benefício que existe

**Troca de Fonte (R$ 200-400)**
- Resolve: PC não liga, instabilidade, desligamentos
- Economia vs novo: R$ 2.100-3.300 (84-94% de economia)
- Veredicto: SEMPRE compensa

**Limpeza + Pasta Térmica (R$ 120-200)**
- Resolve: superaquecimento, lentidão por throttling
- Economia vs novo: R$ 2.300-3.380 (92-96% de economia)
- Veredicto: SEMPRE compensa (manutenção preventiva)

**Troca de Tela Notebook (R$ 300-800)**
- Resolve: tela quebrada ou com manchas
- Economia vs novo: R$ 2.200-4.700 (73-85% de economia)
- Veredicto: Geralmente COMPENSA, exceto para modelos OLED/touch premium

**Reparo de Placa-Mãe (R$ 300-800)**
- Resolve: PC/notebook não liga por problema na placa
- Economia vs novo: R$ 2.200-4.200 (73-84% de economia)
- Veredicto: Compensa quando o dano é LOCALIZADO. Não compensa com dano extenso.

### O Cenário Mais Comum em Curitiba

O caso que mais atendemos em Curitiba e região metropolitana é: **computador lento que o dono acha que precisa trocar**. Em 8 de cada 10 casos, um upgrade de SSD + RAM (R$ 350-500) transforma o computador. Performance melhora 5-10x e a vida útil estende em 3-4 anos.

Faça as contas: R$ 400 de upgrade vs R$ 3.000+ de PC novo, para o mesmo resultado de performance. A decisão é racional.

### Quando os Números Dizem "Troque"

Se o diagnóstico aponta que o reparo custa mais de R$ 1.200 em um equipamento com 6+ anos, os números geralmente dizem para trocar. Por R$ 2.500-3.500, você compra um PC novo com:
- Processador atual com 3-5 anos de suporte
- SSD NVMe (velocidade máxima)
- 8-16GB RAM
- Garantia de 1-3 anos
- Windows 11 com atualizações por anos` },

  // ===== BUSCAS EDUCATIVAS (41-45) =====
  { slug: "o-que-fazer-computador-nao-liga", title: "O Que Fazer Quando o Computador Não Liga?", metaDescription: "Passo a passo: o que fazer quando o computador não liga. Verificações, testes e quando chamar técnico.", h1: "O Que Fazer Quando o Computador Não Liga?", categoria: "Buscas Educativas", intro: `Seu computador não ligou e você não sabe o que fazer? Calma. Antes de chamar o técnico, existem verificações simples que você pode fazer em casa. Neste guia, explicamos o passo a passo desde a verificação básica até o momento de buscar ajuda profissional.`, sintomas: [{ titulo: "Verificações que você pode fazer", desc: "Tomada, cabo, monitor, periféricos.", gravidade: "Simples" }], causas: [{ titulo: "Causa pode ser simples", desc: "Em 20% dos casos, é algo que o próprio usuário resolve.", tipo: "hardware" }, { titulo: "Causa pode ser técnica", desc: "Nos outros 80%, precisa de diagnóstico profissional.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema de cabo, tomada ou configuração.", tempo: "5 min", custo: "R$ 0 (você resolve)" }, { nivel: "Médio", desc: "Componente com problema que precisa de técnico.", tempo: "1h+", custo: "R$ 90+" }, { nivel: "Complexo", desc: "Placa-mãe ou curto que precisa de bancada.", tempo: "Dias", custo: "R$ 200+" }], riscos: ["Tentar abrir sem conhecimento pode piorar"], diagnostico: `Se as verificações básicas não resolveram, diagnóstico profissional é o próximo passo. Custo: R$ 90.`, solucao: `Passo a passo de verificação → diagnóstico → reparo.`, quandoCompensa: "Sempre vale verificar antes de chamar — pode economizar uma visita.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Meu computador não liga e já tentei o básico. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Computador Sem Vídeo", to: "/computador-sem-video-curitiba" }, { label: "Riscos de Consertar Sozinho", to: "/riscos-de-tentar-consertar" }, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }], conteudoExtra: `### Checklist Passo a Passo

1. ✅ Verifique se o cabo de energia está conectado
2. ✅ Teste outra tomada
3. ✅ Verifique se o monitor está ligado
4. ✅ Desconecte todos os USB
5. ✅ Se notebook: remova bateria e tente só na tomada
6. ✅ Espere 5 min e tente novamente
7. ❌ Se nada funcionou → chame o técnico

### Guia Detalhado: Verificações que Você Pode Fazer com Segurança

**Passo 1: Verifique a Energia**
Parece óbvio, mas é a causa mais frequente de "computador não liga" que atendemos em Curitiba. Verifique:
- Cabo de energia está firme na tomada E no computador/monitor
- A régua de tomada ou filtro de linha está ligado
- Teste a tomada com outro aparelho (carregador de celular, por exemplo)
- Se houve queda de energia recente, o disjuntor pode ter desarmado

**Passo 2: Isole o Monitor**
Muitas vezes o computador ESTÁ ligando, mas o monitor é que está desligado ou com cabo solto:
- Verifique se o monitor está ligado (LED de standby)
- Cabo de vídeo (HDMI, VGA, DisplayPort) está firme em ambas as pontas
- Teste com outro cabo de vídeo se disponível
- Aperte os botões do monitor para trocar a entrada (HDMI1, HDMI2, VGA)

**Passo 3: Ouça o Computador**
Ao pressionar o botão power, preste atenção:
- **Nenhum som**: Pode ser fonte queimada ou botão com defeito
- **Ventoinhas giram por instantes**: Pode ser curto ou superaquecimento
- **Bips**: Código de erro — anote a sequência (curto/longo/quantidade)
- **Ventoinhas normais mas sem imagem**: Problema de vídeo (RAM, GPU, cabo)

**Passo 4: Desconecte Periféricos**
USB defeituoso pode impedir a inicialização:
- Desconecte TUDO: pen drives, HD externo, impressora, webcam
- Tente ligar apenas com monitor, teclado e mouse
- Se funcionar, reconecte um por um para identificar o causador

**Passo 5 (Notebooks): Reset de Energia**
Notebooks acumulam carga estática que pode impedir a inicialização:
- Desconecte o carregador
- Remova a bateria (se possível)
- Segure o botão power por 30 segundos
- Reconecte apenas o carregador (sem bateria)
- Tente ligar

### Quando é Hora de Chamar o Técnico

Se todas as verificações acima não resolveram, o problema provavelmente é interno e requer diagnóstico profissional. **NÃO tente abrir o computador** sem experiência — o risco de causar mais dano é real.

Em Curitiba e região metropolitana, nosso técnico pode ir até você no mesmo dia para diagnóstico presencial (R$ 90, incorporado ao serviço se aprovado).

### Os 5 Erros Mais Comuns ao Tentar Resolver Sozinho

1. **Abrir o gabinete sem descarregar estática** → queima componentes
2. **Trocar RAM por achismo** → gasta dinheiro em peça errada
3. **Forçar cabos e conectores** → quebra pin ou conector
4. **"Formatar vai resolver"** → perde dados e o problema persiste
5. **Comprar fonte sem testar a atual** → fonte não era o problema` },

  { slug: "o-que-fazer-notebook-lento", title: "O Que Fazer Com Notebook Lento? | Guia Prático", metaDescription: "Notebook lento? Guia prático com verificações e soluções. Quando otimizar, quando fazer upgrade, quando trocar.", h1: "O Que Fazer Com Notebook Lento? — Guia Prático", categoria: "Buscas Educativas", intro: `Notebook lento atrapalha trabalho, estudo e lazer. Mas antes de sair comprando um novo, existem coisas que você pode verificar e ações simples que podem melhorar a performance. Este guia explica o que fazer, desde verificações básicas até quando é hora de buscar upgrade profissional.`, sintomas: [{ titulo: "Coisas que você pode fazer", desc: "Fechar programas, limpar inicialização, verificar disco.", gravidade: "Simples" }], causas: [{ titulo: "Software (você pode resolver)", desc: "Programas desnecessários, navegador pesado, cache cheio.", tipo: "software" }, { titulo: "Hardware (precisa de técnico)", desc: "HD antigo, pouca RAM, superaquecimento.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Otimização de software pelo próprio usuário.", tempo: "30 min", custo: "R$ 0" }, { nivel: "Médio", desc: "Upgrade profissional (SSD + RAM).", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico + upgrade + limpeza interna.", tempo: "1 dia", custo: "R$ 400 a R$ 800" }], riscos: ["Programas de 'otimização' podem piorar", "Upgrade errado desperdiça dinheiro"], diagnostico: `Se as dicas básicas não resolveram, diagnóstico identifica o gargalo. Custo: R$ 90.`, solucao: `Guia de autoajuda + opções de upgrade profissional.`, quandoCompensa: "Upgrade compensa na maioria dos notebooks com menos de 6 anos.", quandoNaoCompensa: "Notebooks muito antigos onde o gargalo é o processador.", whatsappMessage: "Olá! Meu notebook está lento e já tentei otimizar. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Notebook Lento", to: "/notebook-lento-curitiba" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }], conteudoExtra: `### Dicas Rápidas (Faça Você Mesmo)

1. Ctrl+Shift+Esc → Inicializar → Desative programas desnecessários
2. Desinstale programas que não usa
3. Limite as abas do Chrome (cada aba = memória)
4. Verifique espaço no disco (mínimo 20% livre)
5. Reinicie o notebook (sério, muita gente só fecha a tampa)

### O Teste dos 3 Minutos: Identifique Seu Gargalo

Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc) e observe por 3 minutos enquanto usa o notebook normalmente:

**Se o Disco fica em 100%** → Seu gargalo é o disco. Se é HD mecânico, trocar por SSD é a solução mais impactante. Custo: R$ 250-400.

**Se a Memória fica acima de 85%** → Seu gargalo é RAM. Muitos notebooks permitem adicionar mais RAM. Custo: R$ 150-350.

**Se a CPU fica acima de 90%** → Pode ser malware (minerador) ou processador insuficiente. Scan de vírus primeiro; se o problema é o processador, upgrade não é possível em notebooks.

**Se tudo fica normal** → O problema pode ser software (muitos programas na inicialização, Windows corrompido).

### O Impacto Real de Cada Upgrade

| Upgrade | Melhoria Percebida | Custo em Curitiba |
|---|---|---|
| HD → SSD SATA | ⭐⭐⭐⭐⭐ Transformador | R$ 250-400 |
| SSD SATA → NVMe | ⭐⭐ Leve melhoria | R$ 300-500 |
| 4GB → 8GB RAM | ⭐⭐⭐⭐ Muito significativo | R$ 150-250 |
| 8GB → 16GB RAM | ⭐⭐⭐ Significativo | R$ 200-350 |
| Limpeza + pasta térmica | ⭐⭐⭐ Reduz throttling | R$ 120-200 |

### Programas que Mais Consomem Recursos

Em ordem de impacto na performance do notebook:

1. **Google Chrome** — Cada aba consome 50-300MB de RAM. 10 abas = até 3GB
2. **Antivírus pesados** — Norton, McAfee e Kaspersky versões completas são notoriamente pesados. Windows Defender é suficiente para a maioria.
3. **OneDrive/Google Drive sincronizando** — Sincronização contínua em segundo plano
4. **Adobe Creative Cloud** — Mantém vários serviços em background mesmo sem usar
5. **Discord/Spotify/Steam** — Abrem com o Windows e ficam consumindo

### Quando o Notebook Lento é Sinal de Problema Maior

Às vezes a lentidão é sintoma de algo mais sério:
- **Superaquecimento** → Notebook esquenta muito e fica lento? Pasta térmica seca.
- **HD com setores defeituosos** → Lentidão + sons de clique no disco.
- **Malware** → Lento de repente sem motivo aparente? Scan profissional.
- **Bateria inchada** → Base do notebook estufando? PARE DE USAR. Urgente.` },

  { slug: "o-que-causa-curto-em-placa", title: "O Que Causa Curto em Placa Eletrônica?", metaDescription: "Entenda o que causa curto-circuito em placas eletrônicas. Prevenção, causas e reparo. Curitiba.", h1: "O Que Causa Curto em Placa Eletrônica?", categoria: "Buscas Educativas", intro: `Curto-circuito em placas eletrônicas é um dos problemas mais técnicos que atendemos. Entender como ele acontece ajuda a prevenir e a tomar decisões mais informadas sobre reparo. Neste guia educativo, explicamos as causas, como identificar e como prevenir.`, sintomas: [{ titulo: "Equipamento não liga", desc: "Curto impede fornecimento de energia.", gravidade: "Complexo" }], causas: [{ titulo: "Líquido", desc: "Qualquer líquido condutivo entre trilhas energizadas causa curto instantâneo.", tipo: "erro-humano" }, { titulo: "Poeira metálica", desc: "Ambientes com partículas metálicas (oficinas, indústrias).", tipo: "desgaste" }, { titulo: "Componente que falhou", desc: "Capacitor ou transistor que entrou em curto internamente.", tipo: "hardware" }, { titulo: "Dano mecânico", desc: "Ferramenta que riscou trilha, parafuso que caiu na placa.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Limpeza remove causa do curto.", tempo: "1h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Troca de componente em curto.", tempo: "3 a 5 dias", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Reparo de trilha + troca de componentes.", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 800" }], riscos: ["Curto pode causar dano em cadeia", "Reparo amador piora o problema"], diagnostico: `Localização com multímetro e câmera térmica. Custo: R$ 90-150.`, solucao: `Remoção da causa + troca do componente + teste completo.`, quandoCompensa: "Na maioria dos casos quando o curto é localizado.", quandoNaoCompensa: "Quando causou dano extenso em cadeia.", whatsappMessage: "Olá! Meu equipamento teve curto-circuito. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Curto em Placa", to: "/curto-em-placa-eletronica" }, { label: "Placa-Mãe Queimada", to: "/placa-mae-queimada" }, { label: "Riscos de Consertar Sozinho", to: "/riscos-de-tentar-consertar" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }], conteudoExtra: `### Como Prevenir Curtos

1. Use estabilizador ou nobreak
2. Mantenha o equipamento em local seco e limpo
3. Evite comer/beber perto do computador
4. Faça limpeza preventiva anual
5. Use fonte de qualidade

### Entendendo o Curto-Circuito: Explicação Simples

Imagine as trilhas de cobre na placa como ruas de uma cidade. Cada rua leva energia para um destino específico (processador, memória, vídeo). Um curto-circuito é como construir uma ponte ilegal entre duas ruas — a energia vai para onde não deveria, e o resultado é destruição.

### Os 4 Tipos de Curto em Placas

**1. Curto Direto (Baixa Resistência)**
Dois pontos conectados com resistência quase zero. A corrente sobe dramaticamente e queima o componente ou a trilha. Causa: líquido, solda com excesso, parafuso solto.

**2. Curto por Fuga (Alta Resistência)**
Conexão parcial — corrente pequena "vaza" onde não deveria. Pode causar comportamento errático sem queimar. Causa: umidade, oxidação, poeira condutiva.

**3. Curto Intermitente**
Acontece apenas em certas condições (temperatura, vibração, posição). O mais difícil de diagnosticar. Causa: solda fria, fio parcialmente rompido, componente com fissura.

**4. Curto em Cadeia**
Um componente queima e o curto se propaga para componentes adjacentes. Pode transformar um reparo simples em dano extenso. Causa: continuar usando equipamento com cheiro de queimado.

### Fatores Ambientais em Curitiba e Região

O clima e as condições locais influenciam na incidência de curtos:

**Umidade** — Curitiba tem umidade relativa média de 80-85%. Equipamentos em garagens, sótãos ou próximos a janelas estão mais sujeitos a oxidação e curtos por umidade.

**Tempestades elétricas** — O Paraná é um dos estados com maior incidência de raios no Brasil. Surtos de tensão causados por descargas atmosféricas podem induzir curtos em equipamentos sem proteção.

**Poeira** — Regiões com obras ou próximas a vias movimentadas (BR-116, BR-277) acumulam mais poeira. Poeira misturada com umidade se torna condutiva.

### Kit de Prevenção Recomendado

| Item | Custo | Proteção |
|---|---|---|
| Filtro de linha com varistor | R$ 30-80 | Surtos leves |
| Estabilizador | R$ 150-300 | Variação de tensão |
| Nobreak | R$ 400-1000 | Queda + surto |
| Limpeza preventiva anual | R$ 120-200 | Poeira + pasta térmica |
| Desumidificador (ambientes úmidos) | R$ 200-600 | Umidade |` },

  { slug: "erros-comuns-em-upgrade", title: "Erros Comuns em Upgrade de PC | Evite Problemas", metaDescription: "Os erros mais comuns ao fazer upgrade de PC. Evite problemas com RAM, SSD, GPU. Guia técnico.", h1: "Erros Comuns em Upgrade de PC — Evite Problemas", categoria: "Buscas Educativas", intro: `Upgrades são a forma mais inteligente de melhorar o computador. Mas erros na escolha das peças ou na instalação podem transformar uma melhoria em um problema. Neste guia, listamos os erros mais comuns que vemos em Curitiba e como evitá-los.`, sintomas: [{ titulo: "Computador não liga após upgrade", desc: "Peça incompatível ou mal instalada.", gravidade: "Simples a médio" }], causas: [{ titulo: "Comprar peça errada", desc: "RAM DDR4 para placa DDR3, SSD NVMe para slot SATA.", tipo: "erro-humano" }, { titulo: "Não verificar compatibilidade", desc: "Processador incompatível com placa-mãe, fonte insuficiente para GPU.", tipo: "erro-humano" }, { titulo: "Instalação sem cuidado", desc: "Forçar peças, não usar antiestática, conectar cabos errados.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Troca por peça compatível resolve.", tempo: "1h", custo: "R$ 90 + diferença de peça" }, { nivel: "Médio", desc: "Peça incompatível causou dano leve.", tempo: "1 a 2 dias", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Dano a componentes durante instalação.", tempo: "3 a 7 dias", custo: "R$ 250 a R$ 600" }], riscos: ["Cada erro pode ser mais caro que contratar um técnico desde o início"], diagnostico: `Avaliação do upgrade realizado + correção. Custo: R$ 90.`, solucao: `Identificação do erro + correção + orientação.`, quandoCompensa: "Quase sempre — o erro geralmente é reversível.", quandoNaoCompensa: "Quando causou dano físico irreversível.", whatsappMessage: "Olá! Fiz um upgrade e deu problema. Podem me ajudar a corrigir?", relatedPages: [...RELATED_BASE, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }, { label: "Erro RAM", to: "/erro-ao-instalar-memoria-ram" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }, { label: "Notebook Após Upgrade", to: "/notebook-apos-upgrade-nao-liga-curitiba" }, { label: "Riscos de Consertar Sozinho", to: "/riscos-de-tentar-consertar" }], conteudoExtra: `### Top 5 Erros de Upgrade

1. **RAM errada** — DDR4 em placa DDR3 (não encaixa mas tentam forçar)
2. **SSD errado** — NVMe em slot M.2 SATA (parece igual mas não é)
3. **Fonte insuficiente** — GPU nova com fonte antiga que não aguenta
4. **Sem antiestática** — Descarga queima chips invisíveis
5. **Sem backup** — Trocar SSD sem migrar dados

### Guia Completo de Compatibilidade por Componente

**RAM — O Que Verificar**
- Geração: DDR3, DDR4 ou DDR5 (placa-mãe suporta apenas uma)
- Frequência: verificar frequência máxima suportada pela placa
- Quantidade de slots e máximo por slot (ex: 2 slots, 16GB max cada)
- Formato: DIMM (desktop) vs SO-DIMM (notebook) — fisicamente diferentes
- Site útil: crucial.com/compatibility (insere modelo, mostra opções compatíveis)

**SSD — O Que Verificar**
- Interface: SATA (2.5" ou M.2 SATA) vs NVMe (M.2 NVMe)
- O slot M.2 pode ser SATA-only, NVMe-only ou ambos — verificar manual
- Tamanho do M.2: 2230, 2242, 2260, 2280 — notebooks variam
- Para desktop: SSD 2.5" SATA funciona em qualquer PC com porta SATA

**GPU — O Que Verificar**
- Slot PCI-Express: versão e número de lanes (x16 para GPU)
- Fonte de alimentação: wattagem total e conectores disponíveis (6pin, 8pin)
- Tamanho físico: a GPU cabe no gabinete? (medir comprimento)
- Alimentação: GPUs potentes precisam de 2x conectores de 8pin

**Processador — O Que Verificar**
- Socket: LGA 1700, AM5, etc. — incompatível = não encaixa
- Chipset: nem todo chipset suporta todo processador do mesmo socket
- Geração: processadores mais novos podem não ser suportados por placas mais antigas (mesmo socket)
- TDP: a placa-mãe e o cooler precisam suportar o TDP do processador

### Erro de Upgrade vs Custo de Contratar Técnico

| Cenário | Fazer Sozinho (com erro) | Contratar Técnico |
|---|---|---|
| Consultoria pré-compra | R$ 0 | R$ 50-90 |
| Comprar peça errada | R$ 200-400 perdidos | R$ 0 (orienta antes) |
| Danificar slot/conector | R$ 200-500 reparo | R$ 0 (instala corretamente) |
| Total médio em caso de erro | R$ 400-900 | R$ 140-280 (consulta + instalação) |

A economia de fazer sozinho pode virar prejuízo. O investimento em consultoria técnica pré-upgrade é o melhor custo-benefício em upgrades.

### Checklist Universal Pré-Upgrade

Antes de comprar QUALQUER peça, verifique:
1. ☐ Manual da placa-mãe/notebook (especificações suportadas)
2. ☐ Compatibilidade no site do fabricante
3. ☐ Wattagem da fonte (para GPU)
4. ☐ Espaço físico (para GPU e coolers)
5. ☐ Backup completo dos dados
6. ☐ Ferramentas adequadas (chaves, pulseira antiestática)
7. ☐ Vídeo/fotos do estado atual (para referência na remontagem)` },

  { slug: "riscos-de-tentar-consertar", title: "Riscos de Tentar Consertar Sozinho | Guia", metaDescription: "Os riscos de tentar consertar computador, notebook ou TV sozinho. Por que o diagnóstico profissional evita prejuízo.", h1: "Riscos de Tentar Consertar Sozinho — Por Que Evitar", categoria: "Buscas Educativas", intro: `Tutoriais do YouTube fazem parecer simples. Mas consertar equipamentos eletrônicos sem conhecimento técnico real é arriscado — e frequentemente sai mais caro que chamar um profissional desde o início. Nesta página, explicamos os riscos reais com exemplos do nosso dia a dia.`, sintomas: [{ titulo: "Tentou e piorou", desc: "A maioria dos casos que recebemos de 'tentei consertar' viram reparos mais caros.", gravidade: "N/A" }], causas: [{ titulo: "Falta de conhecimento técnico", desc: "YouTube mostra o procedimento mas não ensina diagnóstico.", tipo: "erro-humano" }, { titulo: "Falta de ferramentas adequadas", desc: "Chave errada, falta de antiestática, sem multímetro.", tipo: "erro-humano" }, { titulo: "Diagnóstico errado", desc: "Achar que é a fonte quando é a placa, trocar peça errada.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Tentou e não piorou — técnico resolve normalmente.", tempo: "Normal", custo: "Normal" }, { nivel: "Médio", desc: "Tentou e causou dano adicional.", tempo: "+1 a 2 dias", custo: "+30-50% do reparo original" }, { nivel: "Complexo", desc: "Tentou e inutilizou o equipamento.", tempo: "N/A", custo: "Perda total" }], riscos: ["Descarga eletrostática queima componentes invisivelmente", "Forçar peças danifica conectores", "Trocar peça errada não resolve e gasta dinheiro", "Perder garantia ao abrir sem autorização", "Choque elétrico (especialmente em TVs e monitores)"], diagnostico: `Deixe o diagnóstico com quem tem conhecimento e ferramentas. Custo: R$ 90 vs custo de uma tentativa errada: R$ centenas.`, solucao: `Diagnóstico profissional primeiro. Sempre.`, quandoCompensa: "Verificações básicas (cabo, tomada, reiniciar) são seguras. Abrir equipamento, não.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Tentei consertar e piorou. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" }, { label: "Quando Não Compensa", to: "/quando-nao-compensa" }, { label: "Erros de Upgrade", to: "/erros-comuns-em-upgrade" }, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }, { label: "O Que Fazer PC Não Liga", to: "/o-que-fazer-computador-nao-liga" }], conteudoExtra: `### Casos Reais do Nosso Dia a Dia

- Cliente trocou RAM por achismo → queimou o slot → reparo de placa R$ 400
- Cliente tentou trocar tela do notebook → rompeu flex → custo dobrou
- Cliente usou secador no notebook molhado → empurrou líquido para placa → perda total
- Cliente trocou fonte sem testar → fonte errada queimou placa-mãe

O diagnóstico profissional custa R$ 90. Qualquer uma dessas tentativas custou mais.

### Os 10 Riscos Reais (com Exemplos de Curitiba)

**1. Descarga Eletrostática (ESD)**
Você não sente. Não vê. Mas a descarga eletrostática do seu corpo (pode chegar a 25.000 volts) queima chips e transistores invisíveis. O dano só aparece depois — intermitência, travamentos, perda total. Prevenção: pulseira antiestática (que quase ninguém tem em casa).

**2. Forçar Componentes**
"Se não encaixou, força mais." Essa mentalidade quebra slots de RAM, conectores M.2, flexs de notebook e portas USB. Um slot de RAM quebrado = reparo de placa-mãe (R$ 350+).

**3. Diagnóstico Errado = Dinheiro Jogado Fora**
"O fórum disse que é a fonte." Você compra fonte nova, instala, e o problema continua — era a placa-mãe. Agora tem uma fonte que não precisava e ainda precisa do diagnóstico.

**4. Perda de Garantia**
Abrir notebook ou desktop ainda na garantia sem autorização do fabricante anula a cobertura. Selos de garantia são verificados.

**5. Choque Elétrico**
TVs e monitores têm capacitores que armazenam carga LETAL mesmo desligados. Não é exagero — é perigo real. Nunca abra uma TV sem conhecimento.

**6. Perda Total de Dados**
"Vou formatar para resolver." Sem backup, formatou e perdeu 10 anos de fotos, documentos e trabalhos. Irrecuperável na maioria dos casos.

**7. Curto Acidental**
Chave de fenda que escorrega e risca trilha na placa-mãe. Parafuso que cai dentro do gabinete e faz ponte. Dano que pode ser permanente.

**8. Dano Térmico**
Secador de cabelo em notebook molhado. Soprador de ar quente em placa sem experiência. Aquecimento excessivo causa mais dano que resolve.

**9. Componente Incorreto**
Pasta térmica condutiva (prata) que vaza para os pinos do processador. SSD NVMe em slot M.2 SATA. RAM DDR4 forçada em slot DDR3.

**10. Transformar Problema Simples em Complexo**
Um problema de R$ 90 (cabo solto, configuração) vira um de R$ 500+ (componente danificado durante a tentativa). Vemos isso semanalmente.

### O Que Você PODE Fazer com Segurança

Nem tudo é proibido. Estas verificações são seguras para qualquer pessoa:

✅ Verificar cabos e tomadas
✅ Reiniciar o equipamento
✅ Desconectar periféricos USB
✅ Verificar se o monitor está ligado
✅ Limpar a parte externa com pano seco
✅ Verificar espaço em disco
✅ Fechar programas no Gerenciador de Tarefas

❌ NÃO faça sem experiência:
❌ Abrir gabinete ou notebook
❌ Trocar componentes internos
❌ Formatar sem backup
❌ Aplicar pasta térmica
❌ Abrir TV ou monitor
❌ Mexer em configurações da BIOS` },

  // ===== LOCAL + INTENÇÃO (46-50) =====
  { slug: "assistencia-tecnica-urgente-curitiba", title: "Assistência Técnica Urgente em Curitiba | Mesmo Dia", metaDescription: "Precisa de assistência técnica urgente em Curitiba? Atendimento no mesmo dia. Computador, notebook, TV. WhatsApp (41) 99745-2053.", h1: "Assistência Técnica Urgente em Curitiba — Atendimento no Mesmo Dia", categoria: "Local + Intenção", intro: `Situações urgentes acontecem: o computador do trabalho parou, o notebook com o TCC travou, a TV da empresa de eventos não liga antes de um evento. Para esses momentos, oferecemos atendimento prioritário em Curitiba e região metropolitana, com visita técnica no mesmo dia (sujeito à disponibilidade).

Nosso atendimento urgente funciona via WhatsApp — descreva a situação, envie fotos/vídeos se possível, e priorizamos seu caso na agenda do dia. Atendemos computadores, notebooks, TVs, redes e equipamentos eletrônicos.`, sintomas: [{ titulo: "Equipamento parou e você precisa dele AGORA", desc: "Atendimento prioritário via WhatsApp.", gravidade: "Urgente" }], causas: [{ titulo: "Qualquer problema técnico", desc: "Atendemos todos os tipos de problema com prioridade.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema resolvido na visita urgente.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico urgente + reparo no mesmo dia.", tempo: "2h a 4h", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Diagnóstico urgente + equipamento vai para bancada com prioridade.", tempo: "1 a 3 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Não deixe para última hora — quanto antes chamar, melhor"], diagnostico: `Diagnóstico presencial prioritário. Custo: R$ 90 (mesmo do normal).`, solucao: `Atendimento priorizado na agenda do dia. WhatsApp para triagem imediata.`, quandoCompensa: "Quando a urgência justifica — trabalho, estudo, evento.", quandoNaoCompensa: "Para problemas que podem esperar, o agendamento normal tem o mesmo custo.", whatsappMessage: "URGENTE! Preciso de atendimento técnico hoje. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Como Funciona", to: "/como-funciona" }, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }, { label: "Emergência TI", to: "/tecnico-informatica-emergencia-curitiba" }, { label: "Conserto Domicílio", to: "/conserto-computador-domicilio-curitiba" }, { label: "Técnico Perto de Mim", to: "/tecnico-computador-perto-de-mim" }], conteudoExtra: `### Como Funciona o Atendimento Urgente

1. Chame no WhatsApp com "URGENTE"
2. Descreva o problema + envie fotos
3. Verificamos disponibilidade imediata
4. Se possível, técnico vai no mesmo dia
5. Diagnóstico + solução no local (quando viável)

### Cobertura de Atendimento Urgente

Atendemos com prioridade em toda Curitiba e região metropolitana:

**Curitiba** — Todos os bairros: Centro, Batel, Portão, Água Verde, Bigorrilho, CIC, Santa Felicidade, Campo Comprido, Cajuru, Boa Vista, Boqueirão, Cristo Rei, Hauer, Juvevê, Mercês, Pinheirinho, Rebouças, Seminário, Tarumã, Vila Izabel e demais.

**Região Metropolitana** — São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro, Quatro Barras.

O tempo de deslocamento varia de 20 a 60 minutos dependendo da localização e trânsito.

### Tipos de Urgência Mais Comuns

**1. Computador de trabalho parou (Home Office)**
Com o aumento do trabalho remoto, o computador virou ferramenta essencial. Quando para, o prejuízo é imediato. Priorizamos esses casos pois cada hora sem computador = hora sem trabalhar.

**2. Notebook acadêmico (TCC, Provas)**
Estudantes universitários com prazo de entrega e notebook travado, sem ligar ou com dados em risco. Atendemos com prioridade, especialmente em período de provas.

**3. Equipamento de empresa**
Servidores, computadores de caixa, estações de trabalho — quando param, a empresa para. Oferecemos atendimento corporativo urgente.

**4. TV para evento**
Empresa de eventos, bar ou restaurante com TV que não liga antes de um jogo importante ou apresentação.

### O Que NÃO Fazer Enquanto Espera o Técnico

- **NÃO tente abrir o equipamento** — pode piorar e aumentar o custo
- **NÃO tente formatar** — pode perder dados sem resolver
- **NÃO compre peças por achismo** — espere o diagnóstico
- **NÃO use secador/arroz em equipamento molhado** — só piora
- **FAÇA**: documente o problema (fotos, vídeos, descrição) e envie por WhatsApp

### Horário de Atendimento Urgente

| Dia | Horário |
|---|---|
| Segunda a Sexta | 8h às 18h |
| Sábado | 8h às 14h |
| Domingo/Feriado | Sob consulta (casos críticos) |

O agendamento normal tem os mesmos horários, mas sem prioridade na fila. Para urgências, priorização é imediata.` },

  { slug: "tecnico-informatica-emergencia-curitiba", title: "Técnico Informática Emergência Curitiba | 24h", metaDescription: "Técnico de informática para emergência em Curitiba. Atendimento prioritário, computador, notebook, rede. WhatsApp.", h1: "Técnico de Informática para Emergência em Curitiba", categoria: "Local + Intenção", intro: `Emergências técnicas podem acontecer a qualquer momento: servidor da empresa caiu, computador do caixa parou, notebook com apresentação importante travou. Para esses casos, oferecemos atendimento de emergência com prioridade máxima na agenda.

Importante: nosso atendimento é presencial com deslocamento. O tempo de chegada depende da localização e horário, mas priorizamos emergências na fila de atendimento.`, sintomas: [{ titulo: "Equipamento crítico parou", desc: "Servidores, caixas, equipamentos de produção.", gravidade: "Urgente" }], causas: [{ titulo: "Qualquer falha técnica crítica", desc: "Hardware, software, rede, energia.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema resolvido no local.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Reparo no local + configuração.", tempo: "2h a 4h", custo: "R$ 250 a R$ 500" }, { nivel: "Complexo", desc: "Diagnóstico + bancada prioritária.", tempo: "1 a 3 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Tempo parado = perda de receita"], diagnostico: `Diagnóstico prioritário. Custo: R$ 90.`, solucao: `Resolução mais rápida possível com foco em retorno à operação.`, quandoCompensa: "Para empresas e profissionais que dependem do equipamento.", quandoNaoCompensa: "Para problemas não críticos que podem esperar agendamento normal.", whatsappMessage: "EMERGÊNCIA! Equipamento crítico parou. Podem atender hoje?", relatedPages: [...RELATED_BASE, { label: "Suporte Empresas", to: "/suporte-empresas" }, { label: "Atendimento Urgente", to: "/assistencia-tecnica-urgente-curitiba" }, { label: "Redes Wi-Fi", to: "/servicos/redes-wifi" }, { label: "Conserto Domicílio", to: "/conserto-computador-domicilio-curitiba" }], conteudoExtra: `### Para Empresas

Oferecemos contratos de suporte contínuo para empresas que não podem parar. Manutenção preventiva + atendimento prioritário quando necessário.

### Emergências Empresariais: O Que Fazemos

**Servidor caiu** — Diagnóstico presencial de hardware e software de servidores. Se é problema de HD/SSD, providenciamos substituição emergencial. Se é software (Active Directory, compartilhamento de arquivos), configuramos no local.

**Rede da empresa parou** — Verificação de roteadores, switches, cabos de rede, access points. Identificação de equipamento defeituoso e substituição. Configuração de rede de contingência.

**Computadores de PDV/Caixa** — Equipamentos de ponto de venda que param significam vendas perdidas. Priorizamos com atendimento imediato.

**Estações de trabalho** — Formatação emergencial, remoção de ransomware, recuperação de acesso.

### Calculando o Prejuízo da Parada

Para empresas, o custo do técnico é muito menor que o custo da parada:

| Tipo de Empresa | Custo médio/hora parado | Custo do técnico urgente |
|---|---|---|
| Comércio (PDV) | R$ 200-500/hora em vendas | R$ 90-300 |
| Escritório (5 funcionários) | R$ 150-400/hora em produtividade | R$ 90-300 |
| Prestador de serviço | R$ 100-300/hora | R$ 90-300 |

Em quase todos os cenários, o custo do técnico é menor que 1-2 horas de parada.

### Contrato de Suporte Contínuo

Para empresas que não podem correr risco de parada, oferecemos:

- **Manutenção preventiva mensal** — Verificação de todos os equipamentos
- **Atendimento prioritário** — Fila VIP para emergências
- **Tempo de resposta garantido** — Máximo de 2 horas para atendimento
- **Consultoria de TI** — Orientação sobre compras, upgrades e infraestrutura

Entre em contato pelo WhatsApp para consultar valores de contrato para sua empresa.` },

  { slug: "conserto-computador-domicilio-curitiba", title: "Conserto de Computador a Domicílio em Curitiba", metaDescription: "Conserto de computador e notebook a domicílio em Curitiba e região. Técnico vai até você. Atendimento no mesmo dia.", h1: "Conserto de Computador a Domicílio em Curitiba", categoria: "Local + Intenção", intro: `Não precisa carregar seu computador até uma loja. Nosso técnico vai até o seu endereço em Curitiba e região metropolitana para diagnosticar e resolver o problema no conforto da sua casa ou escritório.

O atendimento a domicílio funciona para a maioria dos problemas: formatação, limpeza, upgrade, configuração de rede, remoção de vírus e diagnóstico inicial. Para reparos que exigem bancada (placa-mãe, soldagem), fazemos a coleta no local e devolvemos pronto.`, sintomas: [{ titulo: "Qualquer problema de computador/notebook", desc: "Atendimento na sua casa ou empresa.", gravidade: "Variável" }], causas: [{ titulo: "Conveniência + eficiência", desc: "Técnico no seu ambiente vê o contexto completo: rede, energia, uso.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Resolvido na visita (formatação, limpeza, configuração).", tempo: "1h a 3h", custo: "R$ 100 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico + upgrade no local.", tempo: "2h a 4h", custo: "R$ 200 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico no local + coleta para bancada.", tempo: "Variável", custo: "R$ 250+" }], riscos: ["Nenhum — atendimento profissional no seu endereço"], diagnostico: `Diagnóstico presencial no seu endereço. Custo: R$ 90 (incorporado ao serviço se aprovado).`, solucao: `Resolução no local quando possível. Coleta + entrega quando precisa de bancada.`, quandoCompensa: "Sempre — economiza tempo e transporte. Técnico vê o ambiente real.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Preciso de conserto a domicílio em Curitiba. Podem atender?", relatedPages: [...RELATED_BASE, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }, { label: "Coleta e Entrega", to: "/coleta-e-entrega" }, { label: "Atendimento Urgente", to: "/assistencia-tecnica-urgente-curitiba" }, { label: "Técnico Perto de Mim", to: "/tecnico-computador-perto-de-mim" }], conteudoExtra: `### Regiões de Atendimento a Domicílio

Atendemos toda Curitiba (todos os bairros) e região metropolitana: São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro e Quatro Barras.

O agendamento é feito via WhatsApp com escolha de faixa de horário.

### Vantagens do Atendimento a Domicílio

**1. Conveniência**
Você não precisa desconectar, embalar e transportar o equipamento. Especialmente importante para desktops, que são pesados e delicados.

**2. Contexto Completo**
O técnico vê seu ambiente real: rede Wi-Fi, tomadas, cabos, periféricos, condições de temperatura e umidade. Isso ajuda no diagnóstico — problemas que seriam invisíveis em uma loja (como rede instável ou tomada com mau contato) são identificados no local.

**3. Economia de Tempo**
Sem deslocamento, sem fila, sem espera. O técnico chega, diagnostica e resolve (ou coleta para bancada se necessário).

**4. Segurança**
Seu equipamento não sai do seu controle. Você acompanha o diagnóstico e o reparo.

### O Que Resolvemos no Local vs O Que Vai para Bancada

**Resolvemos na visita:**
- Formatação e instalação de Windows
- Upgrade de SSD e RAM
- Limpeza interna e troca de pasta térmica
- Configuração de rede Wi-Fi
- Remoção de vírus e malware
- Instalação de programas e drivers
- Diagnóstico inicial (para definir próximos passos)

**Vai para bancada (coleta + entrega):**
- Reparo de placa-mãe (microssolda)
- Troca de tela de notebook
- Reparo de TV
- Recuperação de dados de HD com falha mecânica
- Reballing de GPU

### Como Funciona o Agendamento

1. **Contato via WhatsApp** — Descreva o problema
2. **Triagem** — Avaliamos a urgência e tipo de serviço
3. **Agendamento** — Escolha a faixa de horário (manhã, tarde)
4. **Confirmação** — No dia, confirmamos horário de chegada
5. **Atendimento** — Técnico chega, diagnostica e resolve

### Tabela de Serviços e Tempos Médios no Local

| Serviço | Tempo Médio | Custo |
|---|---|---|
| Diagnóstico | 30-60 min | R$ 90 |
| Formatação completa | 2-3h | R$ 150-250 |
| Upgrade SSD + clonagem | 2-3h | R$ 250-500 (com SSD) |
| Upgrade RAM | 30 min | R$ 90-150 (+ peça) |
| Limpeza + pasta térmica | 1-2h | R$ 120-200 |
| Remoção de vírus | 1-3h | R$ 100-300 |
| Configuração rede Wi-Fi | 1-2h | R$ 120-250 |` },

  { slug: "manutencao-notebook-curitiba-rapido", title: "Manutenção de Notebook Rápida em Curitiba", metaDescription: "Manutenção de notebook rápida em Curitiba. Limpeza, upgrade SSD, troca de tela, formatação. Atendimento no mesmo dia.", h1: "Manutenção de Notebook Rápida em Curitiba", categoria: "Local + Intenção", intro: `Precisa de manutenção rápida no notebook? Limpeza interna, troca de pasta térmica, upgrade de SSD/RAM, formatação, troca de tela — fazemos a maioria dos serviços de manutenção com rapidez e qualidade em Curitiba.

Nosso diferencial é a transparência: você sabe exatamente o que vai ser feito, quanto custa e quanto tempo leva. Sem surpresas, sem venda de serviço desnecessário.`, sintomas: [{ titulo: "Notebook precisando de manutenção", desc: "Lento, esquentando, bateria fraca, tela quebrada.", gravidade: "Variável" }], causas: [{ titulo: "Manutenção preventiva", desc: "Limpeza + pasta térmica a cada 12-18 meses prolonga a vida útil.", tipo: "desgaste" }, { titulo: "Manutenção corretiva", desc: "Reparo de problema específico identificado.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Limpeza, pasta térmica, otimização de software.", tempo: "1h a 2h", custo: "R$ 120 a R$ 250" }, { nivel: "Médio", desc: "Upgrade SSD + RAM + formatação.", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Troca de tela, reparo de jack, placa-mãe.", tempo: "2 a 7 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Adiar manutenção preventiva leva a reparos mais caros"], diagnostico: `Diagnóstico rápido para definir o que precisa ser feito. Custo: R$ 90 (incorporado se aprovar serviço).`, solucao: `Manutenção focada e rápida com peças de qualidade.`, quandoCompensa: "Sempre — manutenção preventiva é o melhor investimento.", quandoNaoCompensa: "Quando o notebook é tão antigo que a manutenção é paliativa.", whatsappMessage: "Olá! Preciso de manutenção rápida no notebook. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Notebook Lento", to: "/notebook-lento-curitiba" }, { label: "Notebook Esquentando", to: "/notebook-esquentando-curitiba" }, { label: "Conserto Notebook", to: "/servicos/conserto-pc-notebook" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }, { label: "Vale Consertar Notebook?", to: "/vale-a-pena-consertar-notebook" }], conteudoExtra: `### Tabela de Tempos Médios

| Serviço | Tempo Médio |
|---|---|
| Limpeza + pasta térmica | 1h a 2h |
| Upgrade SSD (com clonagem) | 2h a 3h |
| Formatação completa | 2h a 4h |
| Troca de tela | 1 a 3 dias |
| Troca de teclado | 1 a 3 dias |

### Manutenção Preventiva: O Investimento Mais Inteligente

A maioria dos problemas graves em notebooks começa com a falta de manutenção preventiva. Um notebook que nunca passou por limpeza interna e troca de pasta térmica vai, inevitavelmente:

1. Superaquecer → throttling → lentidão
2. Acumular poeira → bloquear ventilação → mais superaquecimento
3. Pasta térmica secar → temperatura do processador sobe 15-25°C
4. Ventoinha trabalhar em velocidade máxima → barulho excessivo → desgaste do rolamento
5. Componentes operar acima da temperatura ideal → redução da vida útil

A limpeza + pasta térmica a cada 12-18 meses custa R$ 120-200 e pode prolongar a vida do notebook em 3-5 anos.

### Marcas e Modelos que Mais Atendemos em Curitiba

| Marca | Modelos Comuns | Manutenção Mais Frequente |
|---|---|---|
| Dell | Inspiron, Vostro, Latitude | SSD + limpeza térmica |
| Lenovo | IdeaPad, ThinkPad | RAM + limpeza |
| HP | Pavilion, ProBook | Bateria + pasta térmica |
| Acer | Aspire, Nitro | Limpeza + pasta (esquentam muito) |
| Samsung | Book, Galaxy Book | SSD + bateria |
| Asus | VivoBook, TUF | Pasta térmica + pads |

### Pacotes de Manutenção

**Pacote Básico (R$ 120-200)**
- Limpeza interna completa
- Troca de pasta térmica
- Otimização de Windows
- Verificação de saúde do disco (SMART)
- Verificação de temperatura

**Pacote Intermediário (R$ 300-500)**
- Tudo do Pacote Básico
- Upgrade SSD (com clonagem de dados)
- Upgrade RAM (se necessário)
- Formatação limpa (opcional)

**Pacote Completo (R$ 400-700)**
- Tudo do Pacote Intermediário
- Troca de bateria (se necessária)
- Verificação de dobradiças
- Limpeza de teclado e touchpad
- Instalação de programas essenciais

### Dicas de Cuidado com Notebook

1. **Use em superfícies planas e rígidas** — Cama e sofá bloqueiam a ventilação
2. **Não coma/beba perto** — Líquido no notebook é emergência
3. **Feche a tampa com cuidado** — Dobradiças quebram com força excessiva
4. **Transporte em capa/mochila acolchoada** — Quedas são devastadoras
5. **Conecte e desconecte o carregador com cuidado** — DC jack é frágil
6. **Reinicie pelo menos 1x por semana** — Fechar a tampa não é reiniciar` },

  { slug: "tecnico-computador-perto-de-mim", title: "Técnico de Computador Perto de Mim | Curitiba", metaDescription: "Procurando técnico de computador perto de você em Curitiba? Atendimento a domicílio em todos os bairros. WhatsApp (41) 99745-2053.", h1: "Técnico de Computador Perto de Mim em Curitiba", categoria: "Local + Intenção", intro: `Se você está procurando um técnico de computador perto de você em Curitiba e região metropolitana, você está no lugar certo. Atendemos todos os bairros de Curitiba e as cidades da região metropolitana com visita técnica a domicílio.

Diferente de lojas de informática genéricas, somos técnicos especializados em diagnóstico e reparo. Isso significa que você recebe atendimento de quem realmente entende do problema — não de um vendedor que vai tentar empurrar peças.`, sintomas: [{ titulo: "Precisa de técnico na sua região", desc: "Atendimento a domicílio em toda Curitiba e região.", gravidade: "Variável" }], causas: [{ titulo: "Cobertura ampla", desc: "Todos os bairros de Curitiba + 10 cidades da região metropolitana.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Visita técnica + resolução no local.", tempo: "1h a 3h", custo: "R$ 90 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico + upgrade/reparo no local.", tempo: "2h a 4h", custo: "R$ 200 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico + coleta para bancada.", tempo: "Variável", custo: "R$ 250+" }], riscos: ["Cuidado com técnicos sem formação ou experiência comprovada"], diagnostico: `Diagnóstico profissional na sua casa. Custo: R$ 90.`, solucao: `Técnico especializado na sua região com atendimento no mesmo dia.`, quandoCompensa: "Sempre — atendimento domiciliar economiza tempo.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Preciso de um técnico de computador na minha região. Podem atender?", relatedPages: [...RELATED_BASE, { label: "Curitiba", to: "/tecnico-informatica-curitiba" }, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }, { label: "Conserto Domicílio", to: "/conserto-computador-domicilio-curitiba" }, { label: "Atendimento Urgente", to: "/assistencia-tecnica-urgente-curitiba" }, { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" }], conteudoExtra: `### Bairros e Cidades Atendidas

**Curitiba**: Centro, Batel, Portão, CIC, Santa Felicidade, Campo Comprido, Água Verde, Bigorrilho, Cajuru, Boa Vista, Boqueirão, Cristo Rei, Hauer, Juvevê, Mercês, Pinheirinho, Rebouças, Seminário, Tarumã, Vila Izabel e todos os demais.

**Região Metropolitana**: São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro, Quatro Barras.

### Por Que Escolher um Técnico Especializado?

Existem muitas opções quando você busca "técnico de computador perto de mim" em Curitiba. Aqui estão os diferenciais que fazem a diferença:

**Diagnóstico antes de tudo** — Não trocamos peças por achismo. Investimos em diagnóstico correto para resolver o problema de primeira.

**Transparência total** — Você sabe exatamente o que será feito, quanto custa e quanto tempo leva ANTES de aprovar qualquer serviço.

**Honestidade** — Se não compensa reparar, informamos. Preferimos perder um serviço a fazer um reparo que não vale a pena.

**Experiência documentada** — Não somos "o sobrinho que entende de computador". Somos técnicos com experiência em centenas de equipamentos diferentes.

### Como Nos Encontrar

**WhatsApp**: (41) 99745-2053 — Resposta rápida
**Atendimento**: Segunda a Sábado
**Cobertura**: Curitiba + 10 cidades da região metropolitana
**Deslocamento**: Técnico vai até você — sem precisar sair de casa

### Perguntas Frequentes Sobre Atendimento a Domicílio

**Q: Tem taxa de deslocamento?**
A: O diagnóstico (R$ 90) já inclui o deslocamento. Se o serviço for aprovado, o valor do diagnóstico é incorporado ao total.

**Q: Quanto tempo demora para o técnico chegar?**
A: Dependendo da região e agenda, entre 1 a 4 horas após o agendamento. Para urgências, priorizamos.

**Q: Atende no mesmo dia?**
A: Na maioria dos casos, sim. Depende da agenda do dia. Urgências são priorizadas.

**Q: Posso acompanhar o serviço?**
A: Sim! Você pode acompanhar todo o processo. Transparência é nosso diferencial.

**Q: Se o problema não puder ser resolvido no local?**
A: Fazemos a coleta do equipamento e devolvemos pronto. Sem custo adicional de transporte.

### Serviços Disponíveis a Domicílio

| Serviço | Disponível no Local? | Tempo Médio |
|---|---|---|
| Diagnóstico | ✅ | 30-60 min |
| Formatação | ✅ | 2-3h |
| Upgrade SSD/RAM | ✅ | 1-3h |
| Limpeza + pasta térmica | ✅ | 1-2h |
| Remoção de vírus | ✅ | 1-3h |
| Configuração de rede | ✅ | 1-2h |
| Reparo placa-mãe | ❌ (coleta) | 3-7 dias |
| Troca de tela notebook | ❌ (coleta) | 1-3 dias |
| Reparo de TV | ❌ (coleta) | 3-10 dias |` },

  // ========== NOVAS PÁGINAS — Impressora, Monitor, Periféricos ==========

  {
    slug: "impressora-nao-imprime-curitiba",
    title: "Impressora Não Imprime em Curitiba | Diagnóstico e Soluções Reais",
    metaDescription: "Impressora não imprime? Diagnóstico profissional em Curitiba e região. Problemas de driver, cabeçote, papel, Wi-Fi. Atendimento rápido. WhatsApp (41) 99745-2053.",
    h1: "Impressora Não Imprime — Diagnóstico e Soluções Reais",
    categoria: "Problemas de Impressora",
    intro: `Sua impressora parou de imprimir e você não sabe o motivo? Esse é um dos problemas mais frustrantes do dia a dia — especialmente quando você precisa imprimir um documento urgente para o trabalho, escola ou uma reunião.\n\nAs causas variam enormemente: pode ser algo simples como um driver desatualizado ou papel preso, ou algo mais complexo como cabeçote de impressão entupido, cartucho seco ou problema na placa lógica da impressora.\n\nEm Curitiba e região metropolitana, atendemos centenas de chamados relacionados a impressoras — HP, Epson, Canon, Brother, Samsung e outras marcas.`,
    sintomas: [
      { titulo: "Impressora não responde ao comando de impressão", desc: "Você manda imprimir mas nada acontece. A fila de impressão pode estar travada ou o driver corrompido.", gravidade: "Simples a Médio" },
      { titulo: "Impressão sai em branco ou com falhas", desc: "Páginas saem completamente brancas ou com listras — indica problema no cartucho, toner ou cabeçote.", gravidade: "Médio" },
      { titulo: "Impressora aparece offline no computador", desc: "O Windows mostra a impressora como offline mesmo estando ligada. Problema de conexão USB, rede ou driver.", gravidade: "Simples" },
      { titulo: "Papel preso constantemente", desc: "Atolamento frequente de papel indica problema mecânico nos rolos de alimentação.", gravidade: "Médio" },
      { titulo: "Impressora Wi-Fi não conecta", desc: "Impressora não se conecta à rede sem fio ou perde a conexão frequentemente.", gravidade: "Simples a Médio" },
      { titulo: "Erro de cartucho ou toner não reconhecido", desc: "A impressora não reconhece o cartucho mesmo sendo novo — problema de chip ou compatibilidade.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Driver desatualizado ou corrompido", desc: "Após atualizações do Windows, o driver da impressora pode parar de funcionar.", tipo: "software" },
      { titulo: "Cabeçote de impressão entupido", desc: "Impressoras jato de tinta que ficam sem uso por semanas têm o cabeçote ressecado.", tipo: "desgaste" },
      { titulo: "Cartucho ou toner vazio/defeituoso", desc: "Cartuchos remanufaturados podem apresentar problemas de reconhecimento.", tipo: "hardware" },
      { titulo: "Problema na conexão USB ou rede", desc: "Cabo USB defeituoso, porta USB com mau contato ou configuração incorreta de rede Wi-Fi.", tipo: "hardware" },
      { titulo: "Fila de impressão travada", desc: "Documentos antigos travados na fila impedem novas impressões.", tipo: "software" },
      { titulo: "Rolos de alimentação desgastados", desc: "Rolos de borracha desgastados não puxam o papel corretamente.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação de driver, limpeza de fila de impressão, reconfiguração Wi-Fi", tempo: "30min–1h", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Limpeza de cabeçote, troca de cartucho, ajuste mecânico dos rolos", tempo: "1–2h", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Reparo da placa lógica, troca de cabeçote fixo, problema eletrônico interno", tempo: "2–5 dias", custo: "R$300–R$500+" },
    ],
    riscos: [
      "Tentar limpar cabeçote com álcool errado pode danificar permanentemente",
      "Usar cartuchos incompatíveis pode queimar o chip da impressora",
      "Forçar papel preso pode quebrar os rolos de alimentação",
      "Ignorar o problema faz o cabeçote ressecar mais",
    ],
    diagnostico: "O diagnóstico começa identificando o tipo (jato de tinta, laser, tanque) e o sintoma. Testamos a conexão, verificamos drivers, inspecionamos cartuchos e realizamos testes de impressão internos.\n\nEm muitos casos, o problema é resolvido na primeira visita.",
    solucao: "A solução varia: desde reinstalação de driver (30 min) até limpeza química do cabeçote ou troca de componentes. Sempre priorizamos o conserto mais econômico.\n\nPara laser, verificamos toner, fusor e tambor. Para jato de tinta, focamos no cabeçote e cartuchos.",
    quandoCompensa: "Impressoras com menos de 3 anos e cujo reparo custa menos de 50% de uma nova. Impressoras laser compensam mais.",
    quandoNaoCompensa: "Impressoras jato de tinta baratas (sub R$300) com cabeçote integrado ao cartucho. Também quando a placa lógica queima.",
    whatsappMessage: "Olá! Minha impressora não está imprimindo. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Redes Wi-Fi", to: "/servicos/redes-wifi" },
      { label: "Atendimento Domicílio", to: "/atendimento-domicilio" },
    ],
    conteudoExtra: `## Guia Completo: Impressora Não Imprime em Curitiba

### Tipos de Impressora e Problemas Comuns

**Jato de Tinta (HP, Epson, Canon):** Cabeçote entupido por falta de uso, cartuchos remanufaturados não reconhecidos, vazamento de tinta.

**Laser (HP, Brother, Samsung):** Toner esgotado ou mal encaixado, fusor desgastado (impressão borrada), tambor riscado.

**Tanque de Tinta (Epson EcoTank, HP Smart Tank):** Bolhas de ar no sistema, cabeçote entupido mesmo com tinta, erro de almofada cheia.

### Tabela de Custos

| Problema | Custo Médio | Tempo |
|---|---|---|
| Reinstalação de driver | R$80–R$120 | 30min |
| Limpeza de cabeçote | R$100–R$200 | 1–2h |
| Troca de cartucho/toner | R$50–R$300 (peça) | 15min |
| Reparo de rolos | R$150–R$250 | 1–2h |
| Placa lógica | R$300–R$500 | 3–5 dias |

### Dicas de Prevenção

1. **Use a impressora 1x/semana** — evita ressecamento
2. **Use cartuchos de qualidade** — evita danos ao chip
3. **Mantenha o driver atualizado**
4. **Use papel adequado** — papel fino ou úmido causa atolamentos
5. **Desligue pelo botão** — não puxe da tomada

### Atendimento em Curitiba e Região

Atendemos em toda Curitiba (Centro, Batel, Portão, CIC, Santa Felicidade) e região metropolitana (SJP, Araucária, Campo Largo, Pinhais, Colombo).`
  },

  {
    slug: "monitor-sem-sinal-curitiba",
    title: "Monitor Sem Sinal em Curitiba | Diagnóstico e Soluções Reais",
    metaDescription: "Monitor sem sinal? Diagnóstico profissional em Curitiba. Problema na placa de vídeo, cabo, monitor ou configuração. Atendimento rápido. WhatsApp (41) 99745-2053.",
    h1: "Monitor Sem Sinal — Diagnóstico e Soluções Reais",
    categoria: "Problemas de Monitor/Vídeo",
    intro: `Ligar o computador e ver "Sem Sinal" ou "No Signal" no monitor é assustador. Você não sabe se o problema é no monitor, no cabo, na placa de vídeo ou na placa-mãe.\n\nA boa notícia: na maioria dos casos o problema é simples — cabo solto, entrada errada ou driver corrompido. Mas em casos graves, pode indicar falha na GPU ou placa-mãe.\n\nEm Curitiba, atendemos este problema diariamente. Nosso diagnóstico identifica a causa real e evita substituições desnecessárias.`,
    sintomas: [
      { titulo: "Monitor exibe 'Sem Sinal' ou 'No Signal'", desc: "O monitor liga mas não recebe sinal do computador.", gravidade: "Simples a Complexo" },
      { titulo: "Tela preta mas o PC parece ligado", desc: "Ventoinhas giram, LEDs acendem, mas nenhuma imagem aparece.", gravidade: "Médio a Complexo" },
      { titulo: "Imagem pisca e some", desc: "A imagem aparece por segundos e desaparece — cabo defeituoso ou GPU instável.", gravidade: "Médio" },
      { titulo: "Monitor funciona em outro PC", desc: "Se funciona em outro PC, o problema está na saída de vídeo do seu computador.", gravidade: "Médio a Complexo" },
      { titulo: "Resolução errada ou tela distorcida", desc: "Após atualização de driver ou troca de monitor, a resolução fica errada.", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "Cabo HDMI/VGA/DP solto ou defeituoso", desc: "Causa mais comum. Cabos com mau contato impedem transmissão de vídeo.", tipo: "hardware" },
      { titulo: "Entrada errada selecionada no monitor", desc: "Monitor configurado para HDMI mas o cabo está no VGA.", tipo: "erro-humano" },
      { titulo: "Driver de vídeo corrompido", desc: "Após atualizações do Windows, o driver da GPU pode corromper.", tipo: "software" },
      { titulo: "Placa de vídeo com defeito", desc: "GPU superaquecida ou com defeito pode parar de enviar sinal.", tipo: "hardware" },
      { titulo: "Memória RAM mal encaixada", desc: "RAM solta ou com oxidação impede o POST e gera tela preta.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de cabo, reencaixe de RAM, seleção de entrada correta", tempo: "15–30min", custo: "R$50–R$100" },
      { nivel: "Médio", desc: "Reinstalação de driver, limpeza de contatos, teste com outra GPU", tempo: "1–2h", custo: "R$100–R$200" },
      { nivel: "Complexo", desc: "Substituição de placa de vídeo, reparo de saída na placa-mãe", tempo: "1–3 dias", custo: "R$200–R$800+" },
    ],
    riscos: [
      "Forçar cabo na porta errada pode danificar o conector",
      "Ignorar superaquecimento da GPU causa dano permanente",
      "Reinstalar driver errado pode causar tela preta no Windows",
      "Trocar GPU sem conhecimento pode causar curto-circuito",
    ],
    diagnostico: "Sequência lógica: 1) Verificar cabos; 2) Testar monitor em outro PC; 3) Testar outra saída de vídeo; 4) Verificar RAM e POST; 5) Testar com outra GPU.\n\nUsamos equipamentos de teste para verificar o sinal antes de chegar ao monitor.",
    solucao: "Na maioria dos casos: troca de cabo (R$20-50) ou reencaixe de componentes. Para driver, usamos Modo de Segurança para reinstalar.\n\nQuando a GPU está com defeito, avaliamos reparo vs. substituição com transparência.",
    quandoCompensa: "Quando o problema é cabo, driver ou RAM — custo baixo e solução rápida.",
    quandoNaoCompensa: "Quando a GPU dedicada queimou e custa mais de 60% do valor do PC.",
    whatsappMessage: "Olá! Meu monitor está sem sinal. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Sem Vídeo", to: "/computador-sem-video-curitiba" },
      { label: "Tela Preta", to: "/computador-com-tela-preta-curitiba" },
      { label: "GPU Desgastada", to: "/gpu-desgastada" },
      { label: "PC Não Liga", to: "/computador-nao-liga-curitiba" },
    ],
    conteudoExtra: `## Guia Completo: Monitor Sem Sinal em Curitiba

### Diagnóstico Rápido

1. **Verifique o cabo** nas duas pontas
2. **Pressione o botão de entrada** do monitor (HDMI/VGA/DP)
3. **Teste com outro cabo**
4. **Conecte em outro PC** para descartar defeito do monitor
5. **Ouça se o PC emite bips** — indicam erro de hardware

### Sintoma → Causa Provável

| Sintoma | Causa | Custo |
|---|---|---|
| "No Signal" com PC ligado | Cabo ou entrada errada | R$50–R$100 |
| Tela preta + bips | RAM solta | R$80–R$150 |
| Imagem pisca e some | Cabo ou GPU instável | R$100–R$300 |
| HDMI não funciona, VGA sim | Porta HDMI queimada | R$150–R$400 |
| Nenhuma saída funciona | GPU ou placa-mãe | R$200–R$800 |

### Tipos de Cabo e Problemas

- **HDMI**: Sensível a mau contato. Versão importa (1.4/2.0/2.1)
- **VGA**: Analógico, robusto mas qualidade inferior. Pinos entortados
- **DisplayPort**: Confiável mas não puxe sem apertar a trava
- **DVI**: Menos comum. Problemas com adaptadores

### Atendimento em Curitiba e Região

Diagnosticamos problemas de monitor/vídeo em toda Curitiba e região metropolitana. Levamos cabos de teste no atendimento a domicílio.`
  },

  {
    slug: "internet-lenta-curitiba",
    title: "Internet Lenta em Curitiba | Diagnóstico de Rede e Soluções",
    metaDescription: "Internet lenta em Curitiba? Diagnóstico de rede profissional. Roteador, Wi-Fi, cabeamento, DNS. Atendimento rápido. WhatsApp (41) 99745-2053.",
    h1: "Internet Lenta — Diagnóstico de Rede e Soluções Profissionais",
    categoria: "Problemas de Rede",
    intro: `Internet lenta é uma das reclamações mais comuns em Curitiba. Antes de culpar o provedor, saiba que em mais de 60% dos casos o problema está na sua casa ou escritório.\n\nRoteador mal posicionado, canal Wi-Fi congestionado, cabeamento antigo, DNS lento ou malware consumindo banda — são dezenas de causas possíveis.\n\nNossa equipe utiliza ferramentas de análise de rede para identificar gargalos e interferências.`,
    sintomas: [
      { titulo: "Velocidade abaixo do contratado", desc: "Speedtest mostra velocidade muito inferior ao plano.", gravidade: "Médio" },
      { titulo: "Wi-Fi cai frequentemente", desc: "Conexão desconecta várias vezes ao dia, especialmente em certos cômodos.", gravidade: "Simples a Médio" },
      { titulo: "Alguns dispositivos lentos, outros normais", desc: "Indica problema no dispositivo, não na rede.", gravidade: "Simples" },
      { titulo: "Páginas demoram mas download é rápido", desc: "Problema de DNS ou latência alta.", gravidade: "Simples" },
      { titulo: "Lenta só em horários específicos", desc: "Congestionamento do provedor ou interferência Wi-Fi vizinha.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Roteador antigo ou mal configurado", desc: "Roteadores 802.11n não suportam velocidades acima de 100Mbps.", tipo: "hardware" },
      { titulo: "Interferência de redes vizinhas", desc: "Em apartamentos, dezenas de redes no mesmo canal causam congestionamento.", tipo: "hardware" },
      { titulo: "Cabeamento antigo", desc: "Cabos Cat5 limitam a 100Mbps. Cabos danificados causam perda de pacotes.", tipo: "desgaste" },
      { titulo: "DNS lento do provedor", desc: "Trocar para Google DNS ou Cloudflare melhora significativamente.", tipo: "software" },
      { titulo: "Malware consumindo banda", desc: "Vírus e mineradores consomem banda em segundo plano.", tipo: "software" },
      { titulo: "Posição ruim do roteador", desc: "No chão, atrás de móveis ou longe dos dispositivos reduz o sinal.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reconfiguração de canal, troca de DNS, reposicionamento do roteador", tempo: "30min–1h", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Instalação de mesh/repetidor, substituição de cabeamento", tempo: "1–3h", custo: "R$150–R$400" },
      { nivel: "Complexo", desc: "Cabeamento estruturado completo, access points empresariais", tempo: "1–2 dias", custo: "R$500–R$2000+" },
    ],
    riscos: [
      "Repetidores baratos podem piorar a situação (meia velocidade)",
      "Alterar configurações do roteador sem conhecimento pode derrubar a rede",
      "Malware consumindo banda expõe dados a riscos de segurança",
      "Cabo externo sem proteção pode queimar o roteador em tempestades",
    ],
    diagnostico: "Utilizamos analisadores Wi-Fi para identificar interferências, testamos velocidade em cada ponto, verificamos cabeamento e configuração do roteador.\n\nIdentificamos exatamente onde está o gargalo: provedor, roteador, cabeamento, Wi-Fi ou dispositivo.",
    solucao: "Desde otimização de software (DNS, canal) até infraestrutura profissional (mesh, access points, Cat6). Sempre a solução mais econômica.\n\nPara empresas, projetos completos com garantia.",
    quandoCompensa: "Quando a velocidade contratada é alta mas a experiência é ruim — o problema está na infraestrutura interna.",
    quandoNaoCompensa: "Quando o provedor é o gargalo. Nesse caso, recomendamos trocar de provedor.",
    whatsappMessage: "Olá! Minha internet está muito lenta. Preciso de diagnóstico de rede.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Redes e Wi-Fi", to: "/servicos/redes-wifi" },
      { label: "Computador com Vírus", to: "/computador-com-virus-curitiba" },
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Suporte Empresas", to: "/suporte-empresas" },
    ],
    conteudoExtra: `## Guia: Internet Lenta em Curitiba

### Diagnóstico Rápido

1. **Speedtest via cabo** (fast.com) — se OK, problema é no Wi-Fi
2. **Teste em horários diferentes** — piora à noite = congestionamento
3. **Reinicie o roteador** — 30 segundos desligado

### Tecnologias Wi-Fi

| Padrão | Velocidade | Recomendação |
|---|---|---|
| Wi-Fi 4 (n) | 300 Mbps | Trocar urgente |
| Wi-Fi 5 (ac) | 1.3 Gbps | Adequado |
| Wi-Fi 6 (ax) | 9.6 Gbps | Ideal para 500Mbps+ |

### Soluções Por Tamanho

- **Apartamento (até 60m²):** Roteador Wi-Fi 5/6 (R$200–500)
- **Casa média (60–150m²):** Mesh com 2 pontos (R$400–800)
- **Casa grande/escritório (150m²+):** Mesh 3+ ou APs (R$800–2000+)

### Atendimento em Curitiba e Região

Configuramos redes em todos os bairros e cidades da região metropolitana. Projetos completos para empresas.`
  },

  {
    slug: "teclado-mouse-nao-funciona-curitiba",
    title: "Teclado ou Mouse Não Funciona em Curitiba | Diagnóstico Rápido",
    metaDescription: "Teclado ou mouse não funcionam? Diagnóstico rápido em Curitiba. Porta USB, driver, Bluetooth. Atendimento no mesmo dia. WhatsApp (41) 99745-2053.",
    h1: "Teclado ou Mouse Não Funciona — Diagnóstico e Soluções Rápidas",
    categoria: "Problemas de Periféricos",
    intro: `Teclado ou mouse pararam de funcionar? Antes de comprar novos, saiba que em muitos casos o problema está no computador — não no periférico.\n\nPortas USB defeituosas, drivers corrompidos, conflitos de Bluetooth ou sujeira acumulada podem ser a causa real.\n\nEm Curitiba, diagnosticamos e resolvemos com rapidez, evitando gastos desnecessários.`,
    sintomas: [
      { titulo: "USB não é reconhecido", desc: "Windows não detecta o dispositivo. Pode ser porta ou driver.", gravidade: "Simples" },
      { titulo: "Bluetooth desconecta frequentemente", desc: "Problema de bateria, driver ou interferência.", gravidade: "Simples a Médio" },
      { titulo: "Teclas específicas não funcionam", desc: "Sujeira, líquido derramado ou desgaste mecânico.", gravidade: "Médio" },
      { titulo: "Cursor travando ou pulando", desc: "Sensor sujo, superfície inadequada ou interferência.", gravidade: "Simples" },
      { titulo: "Nenhuma porta USB funciona", desc: "Problema na placa-mãe ou no Windows.", gravidade: "Médio a Complexo" },
    ],
    causas: [
      { titulo: "Porta USB com mau contato", desc: "Portas frontais do gabinete são propensas a mau contato.", tipo: "hardware" },
      { titulo: "Driver USB corrompido", desc: "Windows Update pode corromper drivers USB.", tipo: "software" },
      { titulo: "Sujeira ou líquido no teclado", desc: "Migalhas, poeira e líquido são as causas mais comuns.", tipo: "erro-humano" },
      { titulo: "Hub USB sobrecarregado", desc: "Muitos dispositivos em um hub causam falta de energia.", tipo: "erro-humano" },
      { titulo: "Bateria fraca em sem fio", desc: "Bateria baixa causa comportamento errático.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de porta USB, reinstalação de driver, troca de pilhas", tempo: "15–30min", custo: "R$50–R$100" },
      { nivel: "Médio", desc: "Limpeza de teclado, reparo de conector USB", tempo: "30min–1h", custo: "R$80–R$180" },
      { nivel: "Complexo", desc: "Reparo de controlador USB na placa-mãe", tempo: "1–3 dias", custo: "R$200–R$400" },
    ],
    riscos: [
      "Desmontar teclado sem experiência pode quebrar clipes",
      "Forçar conector USB danifica a porta",
      "Drivers genéricos podem causar conflitos",
    ],
    diagnostico: "Testamos periféricos em diferentes portas e em outro PC para isolar a causa. Verificamos drivers, hub USB e configurações de energia.\n\nPara teclados com teclas falhando, inspeção visual de sujeira ou dano.",
    solucao: "Desde reinstalação de drivers (15 min) até limpeza profissional ou reparo de porta USB.\n\nPara Bluetooth, reconfiguramos pareamento e verificamos interferências.",
    quandoCompensa: "Quando o problema é no PC (porta, driver) ou periférico de qualidade (mecânico, ergonômico).",
    quandoNaoCompensa: "Teclados/mouses básicos (sub R$50) com defeito mecânico — substituir é mais econômico.",
    whatsappMessage: "Olá! Meu teclado/mouse parou de funcionar. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Notebook Teclado", to: "/notebook-teclado-nao-funciona-curitiba" },
      { label: "PC Não Reconhece HD", to: "/pc-nao-reconhece-hd-curitiba" },
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
    ],
    conteudoExtra: `## Guia: Teclado e Mouse em Curitiba

### Checklist Rápido

- [ ] Teste em outra porta USB (traseira)
- [ ] Troque pilhas/carregue sem fio
- [ ] Reinicie o computador
- [ ] Teste em outro PC
- [ ] Verifique sujeira visível

### Quando o Problema é no PC

Se funciona em outro PC, o problema é seu: controlador USB, driver, economia de energia ou hub sobrecarregado.

### Atendimento Rápido em Curitiba

Resolvemos no mesmo dia em toda Curitiba e região. Maioria dos casos em menos de 1 hora.`
  },

  {
    slug: "hd-externo-nao-reconhece-curitiba",
    title: "HD Externo Não Reconhece em Curitiba | Recuperação e Diagnóstico",
    metaDescription: "HD externo não reconhece? Diagnóstico e recuperação de dados em Curitiba. USB, partição, firmware. Atendimento especializado. WhatsApp (41) 99745-2053.",
    h1: "HD Externo Não Reconhece — Diagnóstico e Recuperação de Dados",
    categoria: "Problemas de Armazenamento",
    intro: `Seu HD externo ou pendrive parou de ser reconhecido? Isso pode ser desde um problema simples de cabo até perda iminente de dados.\n\nAntes de tentar qualquer solução caseira, entenda a causa — ações como formatar podem destruir seus arquivos permanentemente.\n\nEm Curitiba, oferecemos diagnóstico especializado com foco na preservação dos seus dados.`,
    sintomas: [
      { titulo: "HD não aparece no Explorador", desc: "Pode aparecer no Gerenciamento de Disco sem letra de unidade.", gravidade: "Simples a Médio" },
      { titulo: "Windows pede para formatar", desc: "NÃO formate — seus dados podem ser recuperados.", gravidade: "Médio" },
      { titulo: "HD faz barulho de clique", desc: "Falha mecânica grave. Desligue imediatamente.", gravidade: "Complexo" },
      { titulo: "LED pisca mas não reconhece", desc: "Problema no controlador USB do case externo.", gravidade: "Médio" },
      { titulo: "Pendrive pede formatação toda vez", desc: "Setores defeituosos ou firmware corrompido.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Cabo USB ou porta com pouca energia", desc: "Cabos finos ou portas frontais podem não fornecer energia suficiente.", tipo: "hardware" },
      { titulo: "Tabela de partição corrompida", desc: "Queda de energia ou desconexão abrupta corrompe a partição.", tipo: "software" },
      { titulo: "Setores defeituosos", desc: "Desgaste natural cria setores ilegíveis.", tipo: "desgaste" },
      { titulo: "Controlador USB do case queimado", desc: "O circuito SATA-USB queimou mas o HD interno pode estar OK.", tipo: "hardware" },
      { titulo: "Falha mecânica (cabeçote)", desc: "Cabeçote colidiu com o prato. Requer clean room.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de cabo, atribuição de letra, reparo de partição", tempo: "30min–1h", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Recuperação via software, troca do case, reparo de setores", tempo: "2–8h", custo: "R$150–R$400" },
      { nivel: "Complexo", desc: "Recuperação em laboratório (falha mecânica)", tempo: "5–15 dias", custo: "R$500–R$3000+" },
    ],
    riscos: [
      "FORMATAR destrói todos os dados",
      "Continuar usando HD com cliques destrói os pratos",
      "Software gratuito pode sobrescrever dados irrecuperáveis",
      "Abrir HD fora de clean room contamina os pratos",
    ],
    diagnostico: "Conectamos com cabos testados, verificamos no Gerenciamento de Disco, analisamos saúde com ferramentas profissionais e avaliamos dados antes de qualquer ação.\n\nPara HDs com clique, NÃO ligamos — encaminhamos para laboratório.",
    solucao: "Para problemas lógicos, ferramentas profissionais que preservam os dados. Para problemas do case, trocamos o circuito.\n\nPara falhas mecânicas, laboratório com clean room — com orçamento prévio.",
    quandoCompensa: "Quando os dados são importantes. O custo de recuperação é menor que o valor dos dados.",
    quandoNaoCompensa: "Quando o HD está vazio ou tem backup.",
    whatsappMessage: "Olá! Meu HD externo/pendrive não é reconhecido. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "PC Não Reconhece HD", to: "/pc-nao-reconhece-hd-curitiba" },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
    ],
    conteudoExtra: `## Guia: HD Externo em Curitiba

### O Que Fazer IMEDIATAMENTE

1. **NÃO formate**
2. **NÃO use software gratuito** sem orientação
3. **Se faz clique, DESLIGUE**
4. **Teste com outro cabo USB**
5. **Teste em outra porta** (traseira)

### Custos de Recuperação

| Problema | Custo | Tempo | Sucesso |
|---|---|---|---|
| Partição corrompida | R$100–R$250 | 2–4h | 95%+ |
| Setores defeituosos | R$200–R$400 | 4–12h | 80–90% |
| Case queimado | R$80–R$150 | 1h | 99% |
| Falha mecânica | R$800–R$3000 | 5–15 dias | 60–80% |

### Prevenção

- Sempre ejete antes de desconectar
- Não desconecte durante transferências
- Backup em 2+ locais
- Substitua HDs com 4–5 anos

### Atendimento em Curitiba

Diagnóstico de armazenamento em toda Curitiba e região. Parceria com laboratórios certificados.`
  },

  // ========== NOVAS PÁGINAS — Tela Azul, Wi-Fi, Som, Lentidão Jogos ==========

  {
    slug: "tela-azul-windows-curitiba",
    title: "Tela Azul no Windows em Curitiba | Diagnóstico BSOD Profissional",
    metaDescription: "Tela azul da morte (BSOD) no Windows? Diagnóstico profissional em Curitiba. Identificamos o driver ou hardware causador. WhatsApp (41) 99745-2053.",
    h1: "Tela Azul no Windows (BSOD) — Diagnóstico e Solução Profissional",
    categoria: "Erros de Sistema",
    intro: `A temida "Tela Azul da Morte" (BSOD - Blue Screen of Death) é o erro mais assustador do Windows. O computador para tudo, exibe um código de erro e reinicia sozinho.\n\nNa maioria dos casos, a tela azul é causada por um driver incompatível, memória RAM defeituosa ou superaquecimento. Mas também pode indicar HD/SSD com falha ou até placa-mãe danificada.\n\nEm Curitiba, analisamos os logs de crash dump para identificar exatamente qual componente ou driver está causando o problema — sem tentativa e erro.`,
    sintomas: [
      { titulo: "Tela azul com código IRQL_NOT_LESS_OR_EQUAL", desc: "Geralmente causado por driver de rede ou antivírus incompatível com o Windows.", gravidade: "Médio" },
      { titulo: "BSOD com CRITICAL_PROCESS_DIED", desc: "Processo essencial do Windows falhou. Pode ser arquivo do sistema corrompido.", gravidade: "Médio a Complexo" },
      { titulo: "Tela azul ao iniciar o Windows", desc: "O sistema não consegue completar o boot. Driver ou atualização problemática.", gravidade: "Médio" },
      { titulo: "BSOD durante jogos ou uso pesado", desc: "Superaquecimento, GPU instável ou fonte de alimentação insuficiente.", gravidade: "Médio" },
      { titulo: "Tela azul aleatória sem padrão", desc: "Memória RAM defeituosa é a causa mais comum de BSODs aleatórios.", gravidade: "Médio a Complexo" },
      { titulo: "BSOD com WHEA_UNCORRECTABLE_ERROR", desc: "Erro de hardware detectado pelo sistema — CPU, RAM ou placa-mãe.", gravidade: "Complexo" },
    ],
    causas: [
      { titulo: "Driver incompatível ou corrompido", desc: "Drivers de vídeo, rede ou periféricos desatualizados são a causa #1 de BSOD.", tipo: "software" },
      { titulo: "Memória RAM defeituosa", desc: "Módulos com falha causam erros intermitentes e BSODs aleatórios.", tipo: "hardware" },
      { titulo: "Superaquecimento de CPU ou GPU", desc: "Temperaturas acima de 90°C fazem o sistema travar para se proteger.", tipo: "desgaste" },
      { titulo: "HD/SSD com setores defeituosos", desc: "Disco com falhas causa erros de leitura que resultam em tela azul.", tipo: "desgaste" },
      { titulo: "Windows Update corrompido", desc: "Atualizações incompletas podem corromper arquivos do sistema.", tipo: "software" },
      { titulo: "Fonte de alimentação insuficiente", desc: "Fonte subdimensionada causa instabilidade sob carga, gerando BSODs.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Atualização/reversão de driver, reparo de arquivos do sistema (SFC/DISM)", tempo: "1–2h", custo: "R$100–R$180" },
      { nivel: "Médio", desc: "Teste e substituição de RAM, limpeza térmica, reparo do Windows", tempo: "2–4h", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Diagnóstico de placa-mãe, troca de HD/SSD, reinstalação completa", tempo: "1–3 dias", custo: "R$250–R$500+" },
    ],
    riscos: [
      "Ignorar BSODs frequentes pode levar à perda de dados quando o HD falhar",
      "Desativar verificações de driver pode mascarar problemas graves",
      "Forçar desligamento durante BSOD pode corromper o sistema de arquivos",
      "Usar 'fixers' genéricos da internet pode instalar malware",
    ],
    diagnostico: "Analisamos os crash dumps (MEMORY.DMP e Minidump) com ferramentas profissionais como WinDbg para identificar exatamente qual driver ou componente causou o BSOD. Também executamos testes de memória (MemTest86), de disco (SMART) e de temperatura.\n\nIsso elimina a abordagem de 'tentativa e erro' que outros técnicos usam.",
    solucao: "Com o driver/componente identificado, a solução é direta: atualizar/reverter driver, substituir RAM defeituosa, fazer limpeza térmica ou reparar o Windows. Sempre preservamos seus dados.\n\nPara BSODs causados por hardware, apresentamos orçamento detalhado antes de qualquer troca.",
    quandoCompensa: "Sempre compensa diagnosticar — o BSOD é um sintoma, não o problema. Identificar a causa evita danos maiores e perda de dados.",
    quandoNaoCompensa: "Quando múltiplos componentes estão falhando simultaneamente (placa-mãe + RAM + HD), pode ser mais viável substituir o conjunto.",
    whatsappMessage: "Olá! Meu computador está dando tela azul. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "PC Reiniciando Sozinho", to: "/pc-reiniciando-sozinho-curitiba" },
      { label: "Computador Travando", to: "/computador-travando-curitiba" },
      { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "Placa-mãe Queimada", to: "/placa-mae-queimada" },
    ],
    conteudoExtra: `## Guia: Tela Azul (BSOD) em Curitiba

### Códigos de Erro Mais Comuns e Suas Causas

| Código BSOD | Causa Provável | Ação |
|---|---|---|
| IRQL_NOT_LESS_OR_EQUAL | Driver incompatível | Atualizar/reverter driver |
| CRITICAL_PROCESS_DIED | Arquivo do sistema corrompido | SFC /scannow + DISM |
| WHEA_UNCORRECTABLE_ERROR | Erro de hardware (CPU/RAM) | Teste de hardware |
| PAGE_FAULT_IN_NONPAGED_AREA | RAM defeituosa | MemTest86 |
| KERNEL_DATA_INPAGE_ERROR | HD/SSD com falha | Verificar SMART |
| DRIVER_IRQL_NOT_LESS_OR_EQUAL | Driver de rede/USB | Identificar driver |
| SYSTEM_SERVICE_EXCEPTION | Driver ou serviço do sistema | Análise do dump |

### O Que Fazer Quando Aparece a Tela Azul

1. **Anote o código de erro** que aparece na tela
2. **Não force desligamento** — espere reiniciar sozinho
3. **Verifique se repete** — BSOD único pode ser falha momentânea
4. **Se repetir, procure assistência** — BSODs frequentes indicam problema real

### Atendimento em Curitiba e Região

Diagnosticamos telas azuis em toda Curitiba e região metropolitana. Análise de crash dump inclusa no diagnóstico.`
  },

  {
    slug: "notebook-sem-wifi-curitiba",
    title: "Notebook Sem Wi-Fi em Curitiba | Diagnóstico e Solução Rápida",
    metaDescription: "Notebook não conecta no Wi-Fi? Diagnóstico rápido em Curitiba. Problema de driver, placa wireless, configuração. Atendimento no mesmo dia. WhatsApp (41) 99745-2053.",
    h1: "Notebook Sem Wi-Fi — Diagnóstico e Solução Rápida",
    categoria: "Problemas de Notebook",
    intro: `Seu notebook parou de encontrar redes Wi-Fi ou não consegue se conectar? Esse problema afeta milhares de usuários e pode ter causas simples ou complexas.\n\nDesde um driver desatualizado pelo Windows Update até uma placa wireless queimada, o diagnóstico correto é essencial para não gastar dinheiro à toa.\n\nEm Curitiba, resolvemos problemas de Wi-Fi em notebooks de todas as marcas — Dell, Lenovo, HP, Acer, Asus, Samsung e Apple.`,
    sintomas: [
      { titulo: "Ícone de Wi-Fi com X vermelho", desc: "O adaptador wireless está desativado ou não é encontrado pelo sistema.", gravidade: "Simples a Médio" },
      { titulo: "Encontra redes mas não conecta", desc: "Senha correta mas falha na conexão — problema de driver ou protocolo.", gravidade: "Simples" },
      { titulo: "Wi-Fi conecta mas sem internet", desc: "Conectado à rede mas sem acesso — problema de DNS, IP ou roteador.", gravidade: "Simples" },
      { titulo: "Wi-Fi desconecta após poucos minutos", desc: "Economia de energia, driver instável ou interferência.", gravidade: "Médio" },
      { titulo: "Não encontra nenhuma rede Wi-Fi", desc: "Placa wireless desativada (tecla Fn), driver ausente ou placa com defeito.", gravidade: "Simples a Complexo" },
    ],
    causas: [
      { titulo: "Driver wireless corrompido/ausente", desc: "Após formatação ou atualização do Windows, o driver pode sumir ou corromper.", tipo: "software" },
      { titulo: "Tecla Fn desativou o Wi-Fi", desc: "Combinação de teclas (Fn+F2, Fn+F5 etc.) pode desativar o adaptador wireless.", tipo: "erro-humano" },
      { titulo: "Configuração de economia de energia", desc: "Windows desativa o adaptador para economizar bateria, causando desconexões.", tipo: "software" },
      { titulo: "Placa wireless com defeito", desc: "A placa Wi-Fi mini PCIe ou M.2 pode queimar ou perder contato.", tipo: "hardware" },
      { titulo: "Antena wireless desconectada", desc: "Ao abrir o notebook, os cabos da antena podem ter sido desconectados.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reativação via Fn, reinstalação de driver, configuração de energia", tempo: "15–30min", custo: "R$50–R$120" },
      { nivel: "Médio", desc: "Reinstalação do Windows para driver, adaptador USB externo como alternativa", tempo: "1–2h", custo: "R$100–R$200" },
      { nivel: "Complexo", desc: "Troca da placa wireless interna, reconexão de antenas", tempo: "1–3h", custo: "R$150–R$350" },
    ],
    riscos: [
      "Instalar driver errado pode causar tela azul ou outros problemas",
      "Abrir notebook sem experiência pode danificar cabos flat e antenas",
      "Adaptadores USB baratos oferecem velocidade e alcance reduzidos",
    ],
    diagnostico: "Verificamos: 1) Status do adaptador no Gerenciador de Dispositivos; 2) Driver instalado e versão; 3) Configurações de economia de energia; 4) Teste da placa wireless; 5) Estado das antenas.\n\nEm 70% dos casos, resolvemos em menos de 30 minutos.",
    solucao: "Desde reativação por tecla Fn (1 minuto) até troca da placa wireless. Sempre testamos com driver original do fabricante.\n\nComo alternativa temporária, podemos instalar um adaptador Wi-Fi USB.",
    quandoCompensa: "Sempre compensa diagnosticar — na maioria dos casos é software (driver) e o custo é baixo.",
    quandoNaoCompensa: "Quando o notebook é muito antigo e a placa wireless é rara/cara. Adaptador USB é alternativa mais econômica.",
    whatsappMessage: "Olá! Meu notebook não conecta no Wi-Fi. Preciso de ajuda.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Internet Lenta", to: "/internet-lenta-curitiba" },
      { label: "Redes Wi-Fi", to: "/servicos/redes-wifi" },
      { label: "Notebook Lento", to: "/notebook-lento-curitiba" },
      { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" },
    ],
    conteudoExtra: `## Guia: Notebook Sem Wi-Fi em Curitiba

### Checklist Antes de Chamar o Técnico

1. **Pressione Fn + tecla Wi-Fi** (F2, F5 ou F12 dependendo da marca)
2. **Verifique o modo avião** — deve estar desativado
3. **Reinicie o notebook** e o roteador
4. **Teste com outro dispositivo** — se outro aparelho conecta, problema é no notebook
5. **Verifique no Gerenciador de Dispositivos** se há exclamação amarela

### Por Marca de Notebook

| Marca | Tecla Wi-Fi | Driver Comum |
|---|---|---|
| Dell | Fn+F2 | Intel Wireless |
| HP | Fn+F12 | Realtek/Intel |
| Lenovo | Fn+F5 | Intel/Qualcomm |
| Acer | Fn+F3 | Qualcomm/Intel |
| Asus | Fn+F2 | Intel/MediaTek |

### Atendimento em Curitiba

Resolvemos problemas de Wi-Fi em notebooks de todas as marcas. Atendimento a domicílio no mesmo dia em toda Curitiba e região metropolitana.`
  },

  {
    slug: "pc-trava-ao-jogar-curitiba",
    title: "PC Trava ao Jogar em Curitiba | Diagnóstico Gamer Profissional",
    metaDescription: "PC trava, congela ou reinicia durante jogos? Diagnóstico gamer em Curitiba. GPU, fonte, temperatura, drivers. Atendimento especializado. WhatsApp (41) 99745-2053.",
    h1: "PC Trava ao Jogar — Diagnóstico Gamer e Soluções Reais",
    categoria: "Problemas Gamer",
    intro: `Seu PC congela, trava ou reinicia no meio de uma partida? Esse é um dos problemas mais frustrantes para gamers — especialmente quando acontece em momentos cruciais.\n\nAs causas mais comuns envolvem superaquecimento de GPU, fonte de alimentação insuficiente, drivers desatualizados ou RAM instável. Mas identificar qual é o culpado exige diagnóstico profissional.\n\nEm Curitiba, oferecemos diagnóstico especializado para PCs gamer com testes de stress, monitoramento de temperatura e análise de estabilidade.`,
    sintomas: [
      { titulo: "PC congela completamente durante jogo", desc: "Tela congela, som trava em loop e o PC não responde a nada. Precisa forçar desligamento.", gravidade: "Médio" },
      { titulo: "PC reinicia sozinho em jogos pesados", desc: "Desliga e liga sem aviso — geralmente fonte insuficiente ou superaquecimento.", gravidade: "Médio a Complexo" },
      { titulo: "Queda drástica de FPS após alguns minutos", desc: "Throttling térmico — GPU ou CPU reduz performance para se proteger do calor.", gravidade: "Simples a Médio" },
      { titulo: "Tela preta durante jogo (driver crashed)", desc: "Driver de vídeo para de responder. Tela preta por segundos e depois volta.", gravidade: "Simples a Médio" },
      { titulo: "Artefatos visuais (quadrados coloridos, texturas bugadas)", desc: "Artefatos indicam GPU com problema — superaquecimento, memória da GPU ou defeito.", gravidade: "Médio a Complexo" },
    ],
    causas: [
      { titulo: "GPU superaquecendo", desc: "Pasta térmica seca ou cooler com poeira fazem a GPU atingir temperaturas críticas.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação insuficiente", desc: "Fonte subdimensionada não sustenta o consumo sob carga máxima da GPU.", tipo: "hardware" },
      { titulo: "Driver de vídeo desatualizado", desc: "Drivers NVIDIA/AMD desatualizados causam crashes em jogos novos.", tipo: "software" },
      { titulo: "RAM instável ou insuficiente", desc: "RAM com perfil XMP instável ou pouca memória causa travamentos.", tipo: "hardware" },
      { titulo: "SSD/HD lento causando stuttering", desc: "Disco lento não carrega texturas a tempo, causando micro-travadas.", tipo: "desgaste" },
      { titulo: "GPU com defeito (memória VRAM)", desc: "Memória da placa de vídeo com defeito causa artefatos e crashes.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Atualização de drivers, limpeza de poeira, ajuste de ventilação", tempo: "1–2h", custo: "R$100–R$180" },
      { nivel: "Médio", desc: "Troca de pasta térmica da GPU, teste de fonte, ajuste de RAM/XMP", tempo: "2–4h", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Substituição de fonte, reparo/troca de GPU, upgrade de RAM", tempo: "1–3 dias", custo: "R$300–R$1000+" },
    ],
    riscos: [
      "Ignorar superaquecimento pode queimar a GPU permanentemente",
      "Fonte subdimensionada pode danificar outros componentes",
      "Overclock instável acelera degradação de CPU e GPU",
      "Usar drivers beta pode causar mais instabilidade",
    ],
    diagnostico: "Executamos testes de stress com FurMark (GPU), Prime95 (CPU) e MemTest86 (RAM) monitorando temperaturas e estabilidade. Medimos o consumo real da fonte e verificamos se atende à demanda.\n\nIdentificamos exatamente qual componente está falhando sob carga.",
    solucao: "Para superaquecimento: limpeza + pasta térmica (custo baixo, resultado imediato). Para fonte: substituição por modelo certificado 80 Plus. Para RAM: ajuste de timings ou substituição.\n\nSempre recomendamos a solução mais econômica primeiro.",
    quandoCompensa: "Quando o PC é capaz de rodar os jogos mas está instável — o custo de estabilizar é muito menor que comprar um PC novo.",
    quandoNaoCompensa: "Quando o hardware é muito antigo e não atende os requisitos mínimos dos jogos atuais. Nesse caso, upgrade ou troca.",
    whatsappMessage: "Olá! Meu PC trava/reinicia durante jogos. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "GPU Desgastada", to: "/gpu-desgastada" },
      { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Montagem de PC", to: "/servicos/montagem-pc" },
    ],
    conteudoExtra: `## Guia: PC Gamer Travando em Curitiba

### Temperaturas Ideais vs Críticas

| Componente | Ideal | Aceitável | Crítico |
|---|---|---|---|
| CPU (jogo) | 60–70°C | 70–80°C | 85°C+ |
| GPU (jogo) | 65–75°C | 75–85°C | 90°C+ |
| VRM (placa-mãe) | 50–70°C | 70–90°C | 100°C+ |

### Calculadora de Fonte

| Configuração | Fonte Recomendada |
|---|---|
| GTX 1650 + i5/R5 | 450W 80 Plus |
| RTX 3060 + i5/R5 | 550W 80 Plus Bronze |
| RTX 4070 + i7/R7 | 650W 80 Plus Gold |
| RTX 4090 + i9/R9 | 850W+ 80 Plus Gold |

### Manutenção Preventiva Para Gamers

1. **Limpe a poeira** a cada 3–6 meses
2. **Troque a pasta térmica** anualmente (GPU e CPU)
3. **Monitore temperaturas** com HWiNFO64
4. **Mantenha drivers atualizados** (NVIDIA GeForce Experience / AMD Adrenalin)
5. **Não faça overclock** sem refrigeração adequada

### Atendimento Gamer em Curitiba

Diagnóstico especializado para PCs gamer em toda Curitiba e região. Equipamentos de teste profissionais inclusos.`
  },

  {
    slug: "computador-com-som-estranho-curitiba",
    title: "Computador Com Som Estranho em Curitiba | Diagnóstico de Barulhos",
    metaDescription: "Computador fazendo barulho estranho? Diagnóstico profissional em Curitiba. Ventoinha, HD, fonte, cooler. Identifique antes que quebre. WhatsApp (41) 99745-2053.",
    h1: "Computador Com Som Estranho — Diagnóstico de Barulhos e Ruídos",
    categoria: "Problemas de Hardware",
    intro: `Seu computador começou a fazer barulhos estranhos? Chiados, zumbidos, cliques ou vibrações não são normais e quase sempre indicam um componente prestes a falhar.\n\nIdentificar a origem do barulho cedo pode evitar quebras mais caras e perda de dados. Cada tipo de som aponta para um componente diferente.\n\nEm Curitiba, diagnosticamos a origem do barulho com precisão para resolver antes que o problema se agrave.`,
    sintomas: [
      { titulo: "Barulho de ventoinha muito alto", desc: "Ventoinhas barulhentas indicam poeira acumulada, rolamento desgastado ou superaquecimento.", gravidade: "Simples" },
      { titulo: "Cliques rítmicos vindos do gabinete", desc: "Clique repetitivo é sinal clássico de HD com falha mecânica. Urgente!", gravidade: "Complexo" },
      { titulo: "Chiado/zumbido da fonte", desc: "Capacitores da fonte de alimentação podem chiar quando estão falhando.", gravidade: "Médio" },
      { titulo: "Vibração excessiva do gabinete", desc: "Ventoinha desbalanceada ou HD com vibração anormal.", gravidade: "Simples a Médio" },
      { titulo: "Beeps ao ligar o PC", desc: "Bips do BIOS indicam erro de hardware — cada padrão significa algo diferente.", gravidade: "Médio a Complexo" },
    ],
    causas: [
      { titulo: "Ventoinha com poeira acumulada", desc: "Poeira no cooler da CPU ou ventoinhas do gabinete causa ruído e superaquecimento.", tipo: "desgaste" },
      { titulo: "HD mecânico com falha", desc: "Cliques indicam que o cabeçote de leitura está colidindo com os pratos.", tipo: "hardware" },
      { titulo: "Fonte de alimentação falhando", desc: "Capacitores inchados ou secos causam chiado e instabilidade.", tipo: "desgaste" },
      { titulo: "Cooler do processador solto", desc: "Presilhas quebradas fazem o cooler vibrar e perder contato térmico.", tipo: "hardware" },
      { titulo: "Rolamento de ventoinha desgastado", desc: "Com o tempo, o rolamento seca e a ventoinha começa a fazer barulho.", tipo: "desgaste" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de poeira, lubrificação de ventoinha, reposicionamento de componentes", tempo: "30min–1h", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Troca de ventoinha, substituição de cooler, backup preventivo de HD", tempo: "1–2h", custo: "R$100–R$250" },
      { nivel: "Complexo", desc: "Substituição de HD com clique, troca de fonte, diagnóstico de placa-mãe", tempo: "1–3 dias", custo: "R$200–R$500+" },
    ],
    riscos: [
      "Ignorar cliques de HD pode resultar em perda total de dados",
      "Fonte com chiado pode causar curto-circuito em outros componentes",
      "Superaquecimento por ventoinha parada pode queimar CPU ou GPU",
    ],
    diagnostico: "Abrimos o gabinete e identificamos a origem do barulho tocando/parando cada ventoinha individualmente. Verificamos o SMART do HD, inspecionamos a fonte e testamos temperaturas.\n\nPara bips do BIOS, consultamos o manual da placa-mãe para decodificar o padrão.",
    solucao: "Para ventoinhas: limpeza ou troca (R$30–80 por ventoinha). Para HD: backup imediato e substituição por SSD. Para fonte: troca por modelo certificado.\n\nPrevenção é muito mais barata que reparo — limpeza periódica evita a maioria dos problemas.",
    quandoCompensa: "Sempre compensa diagnosticar barulhos — são avisos de falhas futuras. Resolver cedo é mais barato.",
    quandoNaoCompensa: "Quando o PC é muito antigo e múltiplos componentes estão desgastados simultaneamente.",
    whatsappMessage: "Olá! Meu computador está fazendo barulho estranho. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "PC Com Barulho", to: "/pc-com-barulho-estranho-curitiba" },
      { label: "PC Superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "HD Não Reconhece", to: "/pc-nao-reconhece-hd-curitiba" },
      { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" },
    ],
    conteudoExtra: `## Guia: Barulhos no Computador em Curitiba

### Tabela de Barulhos e Significados

| Barulho | Origem Provável | Urgência |
|---|---|---|
| Zumbido contínuo | Ventoinha com poeira | Baixa |
| Clique rítmico | HD com falha | ALTA |
| Chiado agudo | Fonte de alimentação | Média-Alta |
| Vibração | Ventoinha desbalanceada | Baixa |
| Bips ao ligar | Erro de hardware (BIOS) | Alta |
| Rangido | Rolamento de cooler | Média |

### Manutenção Preventiva

- Limpe poeira a cada 3–4 meses
- Substitua pasta térmica anualmente
- Troque ventoinhas com mais de 3 anos
- Monitore saúde do HD com CrystalDiskInfo

### Atendimento em Curitiba

Diagnosticamos barulhos em PCs e notebooks em toda Curitiba e região. Limpeza preventiva inclui verificação de todos os componentes.`
  },

  {
    slug: "computador-nao-conecta-bluetooth-curitiba",
    title: "Computador Não Conecta Bluetooth em Curitiba | Diagnóstico Rápido",
    metaDescription: "Bluetooth não funciona no computador? Diagnóstico rápido em Curitiba. Driver, adaptador, configuração. Atendimento no mesmo dia. WhatsApp (41) 99745-2053.",
    h1: "Computador Não Conecta Bluetooth — Diagnóstico e Solução",
    categoria: "Problemas de Conectividade",
    intro: `O Bluetooth do seu computador parou de funcionar? Não consegue parear fones, mouse, teclado ou caixas de som sem fio?\n\nEsse problema é extremamente comum e na maioria dos casos é causado por driver, configuração ou adaptador desativado.\n\nEm Curitiba, resolvemos problemas de Bluetooth em PCs e notebooks com rapidez.`,
    sintomas: [
      { titulo: "Ícone Bluetooth não aparece", desc: "Adaptador desativado, driver ausente ou hardware não presente.", gravidade: "Simples a Médio" },
      { titulo: "Não encontra dispositivos para parear", desc: "O dispositivo pode não estar em modo de pareamento ou há interferência.", gravidade: "Simples" },
      { titulo: "Conecta mas desconecta rapidamente", desc: "Driver instável, interferência Wi-Fi ou bateria do dispositivo.", gravidade: "Simples a Médio" },
      { titulo: "Áudio Bluetooth com atraso/cortes", desc: "Protocolo A2DP com problemas, interferência ou largura de banda insuficiente.", gravidade: "Simples" },
      { titulo: "Bluetooth conecta mas não funciona", desc: "Perfil errado ativado (ex: telefonia em vez de mídia).", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "Driver Bluetooth corrompido", desc: "Windows Update pode corromper o driver do adaptador Bluetooth.", tipo: "software" },
      { titulo: "Adaptador desativado no BIOS/Windows", desc: "Bluetooth pode estar desativado nas configurações do sistema.", tipo: "erro-humano" },
      { titulo: "Interferência com Wi-Fi 2.4GHz", desc: "Bluetooth e Wi-Fi 2.4GHz usam a mesma faixa de frequência.", tipo: "hardware" },
      { titulo: "Adaptador USB Bluetooth com defeito", desc: "Adaptadores baratos falham com frequência.", tipo: "hardware" },
      { titulo: "Serviço Bluetooth parado no Windows", desc: "O serviço do Windows que gerencia Bluetooth pode estar desativado.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Ativação do serviço, reinstalação de driver, reconfiguração", tempo: "15–30min", custo: "R$50–R$100" },
      { nivel: "Médio", desc: "Instalação de adaptador USB, ajuste de protocolos, redução de interferência", tempo: "30min–1h", custo: "R$80–R$180" },
      { nivel: "Complexo", desc: "Troca de placa wireless com Bluetooth integrado no notebook", tempo: "1–2h", custo: "R$150–R$300" },
    ],
    riscos: [
      "Instalar driver genérico pode causar conflitos com Wi-Fi",
      "Adaptadores USB muito baratos têm alcance mínimo",
    ],
    diagnostico: "Verificamos status do adaptador, driver, serviços do Windows e fazemos teste de pareamento com dispositivos conhecidos.\n\nPara notebooks, verificamos se a placa wireless inclui Bluetooth (nem todas incluem).",
    solucao: "Na maioria dos casos: reinstalação de driver + ativação de serviço (15 min). Quando o hardware não tem Bluetooth, instalamos adaptador USB de qualidade.\n\nPara notebooks, podemos trocar a placa wireless por uma com Bluetooth integrado.",
    quandoCompensa: "Sempre compensa — soluções de Bluetooth são geralmente baratas e rápidas.",
    quandoNaoCompensa: "Praticamente nunca — adaptadores USB Bluetooth custam a partir de R$30.",
    whatsappMessage: "Olá! O Bluetooth do meu computador não funciona. Preciso de ajuda.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Notebook Sem Wi-Fi", to: "/notebook-sem-wifi-curitiba" },
      { label: "Teclado/Mouse", to: "/teclado-mouse-nao-funciona-curitiba" },
      { label: "Internet Lenta", to: "/internet-lenta-curitiba" },
    ],
    conteudoExtra: `## Guia: Bluetooth no Computador em Curitiba

### Checklist Rápido

1. Verifique se Bluetooth está ativado (Configurações > Dispositivos)
2. Coloque o dispositivo em modo de pareamento
3. Reinicie o serviço Bluetooth (services.msc)
4. Reinstale o driver no Gerenciador de Dispositivos
5. Teste com outro dispositivo Bluetooth

### Atendimento em Curitiba

Resolvemos problemas de Bluetooth no mesmo dia em toda Curitiba e região.`
  },

  // ---------- pen-drive-nao-reconhece-curitiba ----------
  {
    slug: "pen-drive-nao-reconhece-curitiba",
    title: "Pen Drive Não Reconhece em Curitiba | Técnico Especialista",
    metaDescription: "Pen drive não aparece no computador? Diagnóstico profissional em Curitiba. Recuperação de dados, reparo de porta USB e formatação especializada.",
    h1: "Pen Drive Não Reconhece — Diagnóstico e Solução em Curitiba",
    categoria: "Periféricos & Armazenamento",
    intro: `Você conecta o pen drive e nada acontece? Esse é um dos problemas mais frustrantes do dia a dia digital. O dispositivo pode não ser reconhecido por falhas na porta USB, corrupção do sistema de arquivos, driver desatualizado ou até dano físico no próprio pen drive.

Em Curitiba, atendemos diariamente casos de pen drives que param de funcionar sem aviso. Muitas vezes os dados estão intactos, mas o sistema não consegue montar o dispositivo. Nosso diagnóstico identifica se o problema é no computador, no pen drive ou no sistema operacional.

Antes de formatar e perder tudo, consulte um técnico. Em muitos casos, conseguimos recuperar 100% dos arquivos e resolver o problema sem perda de dados.`,
    sintomas: [
      { titulo: "Pen drive não aparece no Explorador de Arquivos", desc: "O dispositivo é conectado mas não surge nenhuma unidade nova no sistema.", gravidade: "Médio" },
      { titulo: "Windows emite som de conexão mas não mostra o dispositivo", desc: "O sistema detecta algo na USB mas não consegue montar o volume.", gravidade: "Médio" },
      { titulo: "Mensagem 'Você precisa formatar o disco'", desc: "O Windows reconhece o pen drive mas pede formatação antes de abrir.", gravidade: "Alto" },
      { titulo: "Pen drive pisca e desconecta sozinho", desc: "A luz LED acende brevemente e apaga, indicando falha de contato ou energia.", gravidade: "Alto" },
      { titulo: "Funciona em outro computador mas não neste", desc: "Indica problema localizado na porta USB ou driver do computador específico.", gravidade: "Simples" },
      { titulo: "Pen drive aparece como 'Dispositivo Desconhecido'", desc: "No Gerenciador de Dispositivos surge com ícone de erro amarelo.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Porta USB com defeito ou sem energia suficiente", desc: "Portas frontais de gabinete frequentemente fornecem energia insuficiente para pen drives maiores.", tipo: "hardware" },
      { titulo: "Sistema de arquivos corrompido", desc: "Remoção sem ejetar, quedas de energia ou vírus corrompem a tabela de partição do pen drive.", tipo: "software" },
      { titulo: "Driver USB desatualizado ou conflitante", desc: "Drivers do controlador USB podem estar corrompidos após atualizações do Windows.", tipo: "software" },
      { titulo: "Pen drive com dano físico", desc: "Conector torto, chip de memória danificado ou placa interna com curto-circuito.", tipo: "hardware" },
      { titulo: "Remoção insegura repetida", desc: "Desconectar o pen drive durante gravação corrompe setores e pode danificar o firmware.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Problema de driver ou porta USB — reinstalação do driver ou troca de porta resolve.", tempo: "30-60 min", custo: "R$50-80" },
      { nivel: "Médio", desc: "Sistema de arquivos corrompido — recuperação de dados e reformatação do pen drive.", tempo: "1-3 horas", custo: "R$80-150" },
      { nivel: "Complexo", desc: "Dano físico no pen drive — recuperação de dados em bancada com ferramentas especializadas.", tempo: "2-5 dias", custo: "R$150-400" },
    ],
    riscos: [
      "Formatar o pen drive sem backup apaga todos os dados permanentemente",
      "Forçar o conector em porta torta pode danificar a placa-mãe do computador",
      "Usar softwares de recuperação inadequados pode sobrescrever dados recuperáveis",
      "Ignorar o problema pode indicar falha na controladora USB que afeta outros dispositivos",
    ],
    diagnostico: `O diagnóstico envolve teste em múltiplas portas USB, verificação do Gerenciador de Dispositivos, análise do Gerenciamento de Disco do Windows e teste do pen drive em outro computador.\n\nUsamos ferramentas profissionais como TestDisk, PhotoRec e softwares de recuperação de dados para avaliar o estado do sistema de arquivos e a integridade dos dados armazenados.`,
    solucao: `A solução depende da causa: reinstalação de drivers USB, reparo da tabela de partição, recuperação de dados com ferramentas forenses, ou substituição de portas USB com defeito.\n\nEm casos de dano físico, realizamos micro-soldagem e recuperação em bancada. Sempre priorizamos a recuperação dos dados antes de qualquer formatação.`,
    quandoCompensa: "Quando o pen drive contém dados importantes e únicos, ou quando o problema é no computador (porta/driver) e não no dispositivo em si.",
    quandoNaoCompensa: "Quando o pen drive é barato (menos de R$30), não contém dados importantes e apresenta dano físico severo — nesse caso, substituir é mais econômico.",
    whatsappMessage: "Olá! Meu pen drive não está sendo reconhecido pelo computador. Preciso de diagnóstico e possível recuperação de dados.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "HD Externo Não Reconhece", to: "/hd-externo-nao-reconhece-curitiba" },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
    ],
    conteudoExtra: `## Guia Completo: Pen Drive Não Reconhece em Curitiba

### Antes de Levar ao Técnico — Checklist

1. Teste o pen drive em outra porta USB (preferencialmente traseira)
2. Teste em outro computador para isolar o problema
3. Verifique no Gerenciamento de Disco (diskmgmt.msc) se aparece sem letra
4. Tente atribuir uma letra de unidade manualmente
5. Atualize os drivers USB pelo Gerenciador de Dispositivos

### Tipos de Pen Drive e Suas Fragilidades

Pen drives baratos usam chips de memória de qualidade inferior com vida útil limitada a ~10.000 ciclos de gravação. Marcas reconhecidas (SanDisk, Kingston, Samsung) oferecem maior durabilidade e garantia.

### Proteção de Dados

Sempre ejete o pen drive antes de remover. Use backups em nuvem para dados críticos. Pen drives não são dispositivos de armazenamento permanente — são para transporte temporário de arquivos.

### Atendimento Especializado em Curitiba

Atendemos em toda Curitiba e região metropolitana com diagnóstico no mesmo dia para problemas de pen drive e dispositivos USB.`
  },

  // ---------- som-nao-funciona-curitiba ----------
  {
    slug: "som-nao-funciona-curitiba",
    title: "Som Não Funciona no Computador em Curitiba | Técnico",
    metaDescription: "Computador sem som em Curitiba? Diagnóstico de áudio, drivers, placa de som e alto-falantes. Atendimento rápido a domicílio.",
    h1: "Som Não Funciona no Computador — Diagnóstico em Curitiba",
    categoria: "Áudio & Multimídia",
    intro: `Seu computador ficou mudo de repente? Problemas de áudio são extremamente comuns e podem ter causas variadas: driver corrompido após atualização do Windows, configuração errada de saída de som, placa de áudio com defeito ou até cabo/conector danificado.

O Windows 10 e 11 frequentemente alteram o dispositivo de saída padrão após atualizações, deixando o som direcionado para um dispositivo que não está conectado. Antes de trocar peças, um diagnóstico simples pode resolver.

Em Curitiba, atendemos no mesmo dia problemas de áudio em desktops, notebooks, monitores com alto-falantes integrados e sistemas de home office com múltiplas saídas de som.`,
    sintomas: [
      { titulo: "Ícone de som com X vermelho na bandeja", desc: "O Windows indica que nenhum dispositivo de áudio está instalado ou funcional.", gravidade: "Médio" },
      { titulo: "Som funciona no fone mas não nos alto-falantes", desc: "Indica problema na saída de áudio específica ou configuração de dispositivo padrão.", gravidade: "Simples" },
      { titulo: "Áudio com chiado, estalo ou distorção", desc: "Pode indicar driver incompatível, interferência elétrica ou alto-falante danificado.", gravidade: "Médio" },
      { titulo: "Som parou após atualização do Windows", desc: "Atualização substituiu o driver de áudio por versão genérica incompatível.", gravidade: "Simples" },
      { titulo: "Volume no máximo mas som muito baixo", desc: "Pode ser configuração de equalização, limitador de volume ou alto-falante desgastado.", gravidade: "Médio" },
      { titulo: "Som funciona em alguns programas mas não em outros", desc: "Configuração de áudio por aplicativo ou mixer de volume com canal silenciado.", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "Driver de áudio corrompido ou incompatível", desc: "Atualizações do Windows frequentemente instalam drivers genéricos que não funcionam com o chipset de áudio.", tipo: "software" },
      { titulo: "Dispositivo de saída padrão incorreto", desc: "O Windows pode direcionar o áudio para HDMI, Bluetooth ou dispositivo virtual inexistente.", tipo: "software" },
      { titulo: "Serviço Windows Audio desativado", desc: "O serviço responsável pelo áudio pode ter sido desabilitado por otimizadores ou malware.", tipo: "software" },
      { titulo: "Conector P2 com mau contato", desc: "Poeira, oxidação ou desgaste no conector de 3.5mm causa perda de áudio intermitente.", tipo: "hardware" },
      { titulo: "Placa de som onboard com defeito", desc: "Chipset de áudio na placa-mãe pode falhar por desgaste ou surto elétrico.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Problema de configuração ou driver — reinstalação e ajuste resolve rapidamente.", tempo: "30-60 min", custo: "R$50-80" },
      { nivel: "Médio", desc: "Conector danificado ou conflito de hardware — reparo ou placa de som USB externa.", tempo: "1-2 horas", custo: "R$80-150" },
      { nivel: "Complexo", desc: "Placa de som onboard queimada — instalação de placa de som dedicada ou USB.", tempo: "1-2 horas", custo: "R$120-250" },
    ],
    riscos: [
      "Instalar drivers de fontes não confiáveis pode introduzir malware",
      "Forçar volume no máximo com alto-falantes danificados pode queimar a saída de áudio",
      "Desabilitar serviços do Windows sem conhecimento pode afetar outras funcionalidades",
      "Usar adaptadores baratos pode causar interferência e ruído no áudio",
    ],
    diagnostico: `Verificamos o Gerenciador de Dispositivos, testamos diferentes saídas de áudio, reinstalamos drivers do fabricante e testamos com fones/caixas diferentes.\n\nUsamos ferramentas de diagnóstico para verificar se o chipset de áudio está respondendo corretamente e se há conflitos de IRQ ou recursos do sistema.`,
    solucao: `Na maioria dos casos, reinstalar o driver correto do fabricante da placa-mãe resolve. Ajustamos o dispositivo de saída padrão, verificamos o mixer de volume e habilitamos serviços necessários.\n\nSe a placa onboard estiver com defeito, instalamos uma placa de som USB ou PCIe de qualidade, com configuração otimizada para o uso do cliente.`,
    quandoCompensa: "Sempre compensa investigar — 80% dos problemas de áudio são resolvidos com software (driver/configuração) sem custo de peças.",
    quandoNaoCompensa: "Apenas quando a placa-mãe está com defeito generalizado e já apresenta outros problemas — nesse caso, a troca da placa é mais indicada.",
    whatsappMessage: "Olá! O som do meu computador parou de funcionar. Preciso de diagnóstico e reparo.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Formatação", to: "/servicos/formatacao-computador" },
    ],
    conteudoExtra: `## Guia: Resolver Problemas de Som no Computador

### Checklist Rápido Antes de Chamar o Técnico

1. Clique com botão direito no ícone de som > Configurações de som
2. Verifique se o dispositivo de saída correto está selecionado
3. Abra o Mixer de Volume e veja se algum app está silenciado
4. Teste com outro fone de ouvido ou caixa de som
5. Reinicie o serviço Windows Audio (services.msc)

### Problemas Comuns por Marca de Notebook

- **Dell**: Driver Realtek conflita com MaxxAudio após updates
- **Lenovo**: Dolby Audio pode silenciar saídas não reconhecidas
- **HP**: Bang & Olufsen software requer driver específico
- **Acer/Asus**: Drivers genéricos do Windows geralmente funcionam

### Atendimento em Curitiba

Resolvemos problemas de áudio no mesmo dia em toda Curitiba e região metropolitana.`
  },

  // ---------- computador-nao-desliga-curitiba ----------
  {
    slug: "computador-nao-desliga-curitiba",
    title: "Computador Não Desliga em Curitiba | Diagnóstico Técnico",
    metaDescription: "Computador não desliga ou fica na tela de desligamento? Técnico em Curitiba resolve problema de shutdown, driver e energia.",
    h1: "Computador Não Desliga — Diagnóstico e Solução em Curitiba",
    categoria: "Sistema Operacional",
    intro: `Clicar em "Desligar" e o computador ficar preso na tela de encerramento ou simplesmente não desligar é um problema mais comum do que parece. Isso pode acontecer por processos travados, drivers incompatíveis, atualizações pendentes ou problemas na configuração de energia.

Em casos mais graves, o computador pode reiniciar ao invés de desligar, ou a tela fica preta mas os coolers continuam rodando. Esses sintomas indicam problemas diferentes que requerem abordagens específicas.

Em Curitiba, diagnosticamos e resolvemos problemas de desligamento no mesmo dia, seja a domicílio ou em nosso laboratório.`,
    sintomas: [
      { titulo: "Computador fica travado na tela 'Desligando...'", desc: "O Windows inicia o processo de shutdown mas nunca completa, ficando preso indefinidamente.", gravidade: "Médio" },
      { titulo: "Tela fica preta mas o computador continua ligado", desc: "O monitor apaga mas coolers, LEDs e HD continuam funcionando — shutdown incompleto.", gravidade: "Médio" },
      { titulo: "Computador reinicia ao invés de desligar", desc: "Ao clicar em Desligar, o PC reinicia automaticamente — ciclo infinito.", gravidade: "Alto" },
      { titulo: "Demora mais de 5 minutos para desligar", desc: "Processos ou serviços em segundo plano impedem o encerramento rápido.", gravidade: "Simples" },
      { titulo: "Mensagem 'Aguardando programas fecharem'", desc: "Um ou mais programas não respondem ao comando de encerramento do Windows.", gravidade: "Simples" },
      { titulo: "Só desliga forçando pelo botão de energia", desc: "O shutdown por software não funciona, obrigando desligamento físico — pode corromper dados.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "Driver de dispositivo impedindo shutdown", desc: "Drivers de rede, USB ou vídeo com bugs podem travar o processo de encerramento.", tipo: "software" },
      { titulo: "Inicialização rápida (Fast Startup) com conflito", desc: "O recurso de inicialização rápida do Windows 10/11 pode conflitar com certos hardwares.", tipo: "software" },
      { titulo: "Atualização do Windows pendente ou travada", desc: "Updates que não conseguem ser instalados podem travar o shutdown indefinidamente.", tipo: "software" },
      { titulo: "Processo ou serviço travado em segundo plano", desc: "Antivírus, sincronizadores de nuvem ou malware podem impedir o encerramento.", tipo: "software" },
      { titulo: "Problema na fonte de alimentação", desc: "Fonte com defeito pode não cortar a energia corretamente após o shutdown do software.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Desabilitar inicialização rápida e ajustar configurações de energia resolve.", tempo: "30-60 min", custo: "R$50-80" },
      { nivel: "Médio", desc: "Driver problemático ou atualização travada — diagnóstico, atualização e limpeza de sistema.", tempo: "1-2 horas", custo: "R$80-150" },
      { nivel: "Complexo", desc: "Problema de hardware (fonte/placa-mãe) — teste e substituição de componentes.", tempo: "2-4 horas", custo: "R$150-350" },
    ],
    riscos: [
      "Desligar forçando pelo botão repetidamente pode corromper o disco e o sistema operacional",
      "Atualizações interrompidas podem inutilizar o Windows",
      "Fonte com defeito pode danificar outros componentes por não cortar energia corretamente",
      "Ignorar o problema pode mascarar falhas de hardware progressivas",
    ],
    diagnostico: `Analisamos o Event Viewer do Windows para identificar processos ou drivers que bloqueiam o shutdown. Verificamos configurações de energia, Fast Startup e atualizações pendentes.\n\nTestamos o comportamento em Modo de Segurança para isolar se é problema de software ou hardware. Verificamos também a fonte de alimentação com multímetro.`,
    solucao: `Desabilitamos o Fast Startup, atualizamos drivers problemáticos, resolvemos updates travados e configuramos corretamente as opções de energia.\n\nSe o problema for de hardware, testamos e substituímos a fonte de alimentação ou verificamos a placa-mãe. Sempre garantimos que o shutdown funcione corretamente antes de encerrar o atendimento.`,
    quandoCompensa: "Sempre compensa resolver — forçar desligamento pelo botão repetidamente leva a problemas muito mais graves e caros no futuro.",
    quandoNaoCompensa: "Apenas se o computador já apresenta múltiplos problemas de hardware e tem mais de 8 anos — nesse caso, considerar upgrade ou troca.",
    whatsappMessage: "Olá! Meu computador não está desligando corretamente. Preciso de diagnóstico.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Computador Lento", to: "/computador-lento-curitiba" },
      { label: "Tela Azul Windows", to: "/tela-azul-windows-curitiba" },
    ],
    conteudoExtra: `## Guia: Computador Não Desliga em Curitiba

### Soluções Rápidas

1. Desabilite Fast Startup: Painel de Controle > Opções de Energia > Alterar comportamento dos botões
2. Verifique atualizações pendentes: Configurações > Windows Update
3. Feche todos os programas manualmente antes de desligar
4. Teste no Modo de Segurança para isolar drivers
5. Execute \`shutdown /s /f /t 0\` no Prompt de Comando

### Quando o Problema é Grave

Se o computador reinicia ao invés de desligar, pode ser BSOD oculto. Verifique o Event Viewer (eventvwr.msc) para erros críticos no momento do shutdown.

### Atendimento em Curitiba

Diagnóstico e solução no mesmo dia para problemas de desligamento em Curitiba e região.`
  },

  // ---------- erro-ao-instalar-windows-curitiba ----------
  {
    slug: "erro-ao-instalar-windows-curitiba",
    title: "Erro ao Instalar Windows em Curitiba | Técnico Especialista",
    metaDescription: "Erro na instalação do Windows em Curitiba? Técnico resolve problemas de boot, partição, driver e BIOS para instalação limpa do Windows 10/11.",
    h1: "Erro ao Instalar Windows — Solução Profissional em Curitiba",
    categoria: "Instalação & Formatação",
    intro: `Tentou instalar o Windows e deparou com erros como "Não foi possível instalar o Windows nesta partição", "Erro 0x80070570" ou a instalação trava em uma porcentagem? Esses erros são muito comuns e podem ter causas variadas.

Problemas de instalação do Windows geralmente envolvem: mídia de instalação corrompida, HD/SSD com setores defeituosos, configuração incorreta de BIOS/UEFI, tabela de partição incompatível (MBR vs GPT) ou drivers de armazenamento ausentes.

Em Curitiba, realizamos instalações profissionais do Windows 10 e 11 com drivers corretos, ativação legítima e configuração otimizada para o hardware do cliente.`,
    sintomas: [
      { titulo: "Erro 'Não foi possível criar/formatar partição selecionada'", desc: "A instalação não consegue gravar na partição — pode ser disco protegido, corrompido ou formato incompatível.", gravidade: "Médio" },
      { titulo: "Instalação trava em porcentagem específica", desc: "O progresso para em 25%, 49% ou 74% — indica arquivo corrompido na mídia ou setor defeituoso no disco.", gravidade: "Alto" },
      { titulo: "Erro 0x80070570 — arquivo corrompido", desc: "A mídia de instalação (USB/DVD) possui arquivos danificados ou a RAM está com defeito.", gravidade: "Médio" },
      { titulo: "Tela azul durante a instalação", desc: "BSOD durante setup indica incompatibilidade de hardware, RAM defeituosa ou disco com problemas.", gravidade: "Alto" },
      { titulo: "BIOS não reconhece o pendrive bootável", desc: "Configuração de Secure Boot, UEFI/Legacy ou pendrive criado incorretamente impede o boot.", gravidade: "Simples" },
      { titulo: "Windows instala mas não inicia (boot loop)", desc: "Após instalação, o PC fica em loop de reinicialização — bootloader corrompido ou driver crítico ausente.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "Mídia de instalação corrompida", desc: "Pen drive criado com ferramenta errada ou ISO com download incompleto/corrompido.", tipo: "erro-humano" },
      { titulo: "Disco com setores defeituosos", desc: "HD/SSD com falhas físicas impede a gravação dos arquivos de instalação.", tipo: "hardware" },
      { titulo: "Configuração BIOS/UEFI incorreta", desc: "Secure Boot, CSM, modo AHCI/IDE e ordem de boot mal configurados.", tipo: "erro-humano" },
      { titulo: "Tabela de partição incompatível", desc: "Disco em MBR tentando instalar em modo UEFI ou vice-versa causa erros de partição.", tipo: "software" },
      { titulo: "RAM com defeito", desc: "Memória RAM com erros causa corrupção durante a cópia de arquivos da instalação.", tipo: "hardware" },
      { titulo: "Drivers de armazenamento ausentes", desc: "SSDs NVMe ou controladoras RAID podem precisar de drivers adicionais durante a instalação.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Problema de configuração BIOS ou mídia — recriação do pendrive e ajuste de BIOS resolve.", tempo: "1-2 horas", custo: "R$80-120" },
      { nivel: "Médio", desc: "Disco com setores ruins ou partição incompatível — formatação completa e conversão GPT/MBR.", tempo: "2-3 horas", custo: "R$120-200" },
      { nivel: "Complexo", desc: "Hardware defeituoso (HD/RAM) — substituição de componente + instalação completa.", tempo: "3-5 horas", custo: "R$200-450" },
    ],
    riscos: [
      "Forçar instalação em disco com setores ruins pode causar perda total de dados",
      "Alterar configurações de BIOS sem conhecimento pode impedir o boot de qualquer sistema",
      "Usar ISOs de fontes não oficiais pode instalar versões com malware pré-instalado",
      "Converter MBR para GPT sem backup apaga todos os dados do disco",
      "Instalar Windows sem drivers corretos pode causar instabilidade e telas azuis",
    ],
    diagnostico: `Testamos a mídia de instalação, verificamos o disco com ferramentas como CrystalDiskInfo e SMART, testamos a RAM com MemTest86 e validamos todas as configurações de BIOS.\n\nIdentificamos o erro exato (código, momento da falha) para aplicar a solução correta sem tentativa e erro.`,
    solucao: `Criamos mídia de instalação verificada a partir da ferramenta oficial da Microsoft. Configuramos BIOS corretamente (UEFI/Legacy, Secure Boot, AHCI). Convertemos a tabela de partição se necessário.\n\nSe o disco estiver com defeito, substituímos por SSD novo e realizamos instalação limpa com todos os drivers do fabricante, ativação legítima e configurações de performance otimizadas.`,
    quandoCompensa: "Sempre compensa ter uma instalação profissional — erros durante a instalação geralmente indicam problemas que vão piorar se não forem resolvidos.",
    quandoNaoCompensa: "Quando o hardware é muito antigo e não suporta Windows 10/11 (sem UEFI, sem TPM 2.0) — pode ser melhor considerar Linux ou upgrade de hardware.",
    whatsappMessage: "Olá! Estou com erro ao tentar instalar o Windows no meu computador. Preciso de ajuda profissional.",
    relatedPages: [
      ...RELATED_BASE,
      { label: "Formatação de Computador", to: "/servicos/formatacao-computador" },
      { label: "Tela Azul Windows", to: "/tela-azul-windows-curitiba" },
    ],
    conteudoExtra: `## Guia: Instalação do Windows em Curitiba

### Requisitos Mínimos Windows 11

- Processador: 1GHz, 2 cores, 64-bit compatível
- RAM: 4GB mínimo (8GB recomendado)
- Armazenamento: 64GB mínimo (SSD 240GB recomendado)
- TPM 2.0 e Secure Boot habilitados
- UEFI com GPT (não MBR)

### Erros Mais Comuns e Soluções Rápidas

| Erro | Causa Provável | Solução |
|------|---------------|---------|
| 0x80070570 | Arquivo corrompido | Recriar pendrive com Rufus |
| 0x80300024 | Partição incompatível | Limpar disco com diskpart |
| 0x8007025D | RAM com defeito | Testar RAM com MemTest86 |
| Boot loop | Driver ausente | Instalar driver de armazenamento |

### Instalação Profissional em Curitiba

Realizamos instalação completa do Windows com drivers originais, otimização de performance e backup de dados. Atendimento em toda Curitiba e região metropolitana.`
  },

  // ==================== NOTEBOOK SUPERAQUECENDO ====================
  {
    slug: "notebook-superaquecendo-curitiba",
    title: "Notebook Superaquecendo em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Notebook esquentando demais e desligando sozinho? Técnico em Curitiba resolve superaquecimento com limpeza térmica, troca de pasta e reparo de cooler. Atendimento rápido.",
    h1: "Notebook Superaquecendo — Diagnóstico e Solução em Curitiba",
    categoria: "Hardware",
    intro: `O superaquecimento é uma das falhas mais perigosas para notebooks. Quando a temperatura interna ultrapassa os limites seguros, o processador reduz a velocidade (thermal throttling) ou o notebook desliga abruptamente para se proteger. Ignorar esse problema pode causar danos irreversíveis na placa-mãe e no processador.\n\nEm Curitiba, especialmente em dias quentes ou em ambientes com pouca ventilação, notebooks podem atingir temperaturas críticas rapidamente. Usar o notebook na cama, sofá ou sobre superfícies que bloqueiam a ventilação agrava ainda mais o problema.\n\nNosso serviço inclui diagnóstico térmico completo com software profissional, limpeza interna, troca de pasta térmica e, quando necessário, reparo ou substituição do cooler. Tudo com garantia e atendimento em domicílio na região metropolitana de Curitiba.`,
    sintomas: [
      { titulo: "Notebook desliga sozinho durante uso", desc: "Desligamento abrupto sem aviso, geralmente durante tarefas pesadas como jogos ou edição de vídeo. É o mecanismo de proteção térmica do processador.", gravidade: "Alta" },
      { titulo: "Base do notebook muito quente ao toque", desc: "Calor excessivo na parte inferior indica que o sistema de refrigeração não está dissipando o calor adequadamente.", gravidade: "Média" },
      { titulo: "Ventilador faz barulho alto constantemente", desc: "O cooler gira em velocidade máxima tentando compensar a temperatura elevada. Pode indicar pasta térmica ressecada ou duto entupido.", gravidade: "Média" },
      { titulo: "Lentidão progressiva durante o uso", desc: "O processador reduz a frequência (throttling) para diminuir a temperatura, causando travamentos e lentidão.", gravidade: "Média" },
      { titulo: "Tela congela e só volta após esfriar", desc: "Congelamento causado por proteção térmica. Após esfriar, o notebook volta a funcionar temporariamente.", gravidade: "Alta" },
      { titulo: "Cheiro de queimado vindo do notebook", desc: "Sinal grave de que componentes podem estar sendo danificados pelo calor excessivo. Pare de usar imediatamente.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Pasta térmica ressecada", desc: "A pasta térmica perde eficiência após 2-3 anos, reduzindo drasticamente a transferência de calor entre o processador e o dissipador.", tipo: "desgaste" },
      { titulo: "Ventilador obstruído por poeira", desc: "Acúmulo de poeira e pelos bloqueia as saídas de ar e as aletas do dissipador, impedindo a circulação de ar.", tipo: "desgaste" },
      { titulo: "Cooler com defeito ou travado", desc: "O motor do ventilador pode falhar por desgaste, fazendo-o girar devagar ou parar completamente.", tipo: "hardware" },
      { titulo: "Uso em superfície inadequada", desc: "Cama, travesseiro e sofá bloqueiam as entradas de ar na parte inferior do notebook, causando superaquecimento.", tipo: "erro-humano" },
      { titulo: "Heatpipe danificado ou descolado", desc: "O tubo de calor (heatpipe) pode perder o contato com o processador ou desenvolver vazamento interno.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna + troca de pasta térmica. Resolve 70% dos casos de superaquecimento.", tempo: "1-2 horas", custo: "R$100–R$180" },
      { nivel: "Médio", desc: "Substituição de cooler/ventilador + limpeza completa + pasta térmica premium.", tempo: "2-4 horas", custo: "R$180–R$350" },
      { nivel: "Complexo", desc: "Reparo de heatpipe, substituição de dissipador completo ou dano na placa por superaquecimento prolongado.", tempo: "3-7 dias", custo: "R$350–R$800" }
    ],
    riscos: [
      "Dano permanente no processador por exposição prolongada a altas temperaturas",
      "Queima de componentes da placa-mãe (VRM, chipset)",
      "Descolamento de solda BGA do processador ou GPU",
      "Perda de dados por desligamento abrupto durante gravação",
      "Redução da vida útil da bateria por calor excessivo"
    ],
    diagnostico: `O diagnóstico térmico profissional utiliza software especializado (HWMonitor, AIDA64) para medir as temperaturas em tempo real de CPU, GPU e disco durante testes de estresse.\n\nVerificamos a rotação do cooler com tacômetro, inspecionamos a condição da pasta térmica, avaliamos o estado das aletas do dissipador e testamos o fluxo de ar. O resultado é um laudo completo com as causas identificadas e as soluções recomendadas.`,
    solucao: `A solução profissional para superaquecimento inclui:\n\n1. Desmontagem cuidadosa do notebook\n2. Limpeza completa do sistema de refrigeração (cooler, dutos e aletas)\n3. Remoção da pasta térmica antiga com solvente isopropílico\n4. Aplicação de pasta térmica de alta performance (Arctic MX-4 ou similar)\n5. Teste de estresse pós-reparo para validar temperaturas\n6. Orientações sobre uso correto e prevenção\n\nUsamos pasta térmica premium que mantém a eficiência por até 8 anos, muito superior às pastas genéricas.`,
    quandoCompensa: "Na maioria dos casos, o superaquecimento é resolvido com limpeza e troca de pasta térmica — um investimento baixo que prolonga a vida útil do notebook em vários anos.",
    quandoNaoCompensa: "Quando há dano severo na placa-mãe por superaquecimento prolongado, com componentes queimados ou solda BGA comprometida, pode ser mais viável investir em um notebook novo.",
    whatsappMessage: "Olá! Meu notebook está superaquecendo e preciso de diagnóstico. Podem me ajudar?",
    conteudoExtra: `## Por Que o Superaquecimento é Tão Perigoso?\n\nO superaquecimento não é apenas um inconveniente — é uma ameaça real à integridade do seu notebook. Processadores modernos operam em temperaturas de 60-80°C sob carga, mas quando ultrapassam 90-100°C, entram em modo de proteção.\n\n### Thermal Throttling: O Que é e Como Afeta Seu Notebook\n\nQuando a temperatura sobe demais, o processador reduz automaticamente sua velocidade para gerar menos calor. Isso significa que seu notebook com processador i7 pode estar operando como um i3 — você pagou por desempenho que não está usando.\n\n### A Importância da Pasta Térmica\n\nA pasta térmica é o material que preenche as micro-imperfeições entre o processador e o dissipador de calor. Sem ela, o contato térmico é ineficiente e as temperaturas sobem drasticamente.\n\nPastas térmicas de qualidade inferior ressecam em 1-2 anos. Utilizamos pasta térmica profissional (Arctic MX-4, Thermal Grizzly Kryonaut) que mantém suas propriedades por até 8 anos.\n\n### Prevenção: Como Evitar o Superaquecimento\n\n1. **Use sempre em superfície rígida e plana** — mesa, escrivaninha ou suporte para notebook\n2. **Evite bloquear as saídas de ar** — nunca use na cama ou sobre almofadas\n3. **Faça limpeza preventiva a cada 12-18 meses** — especialmente se tiver pets\n4. **Considere um cooler externo** — base refrigerada ajuda em ambientes quentes\n5. **Monitore temperaturas** — apps como HWMonitor alertam sobre temperaturas anormais\n\n### Marcas Que Mais Sofrem Com Superaquecimento\n\nAlguns modelos são mais propensos ao problema:\n- **Dell Inspiron e Vostro** — sistema de refrigeração compacto\n- **Lenovo Ideapad** — pasta térmica de fábrica de baixa qualidade\n- **Acer Nitro** — notebooks gamer com dissipação subdimensionada\n- **HP Pavilion** — dutos de ar estreitos que entopem facilmente\n\nTemos experiência com todas as marcas e modelos, com peças de reposição em estoque para agilizar o reparo.`,
    relatedPages: [
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/pc-trava-ao-jogar-curitiba", label: "PC Trava ao Jogar" },
      { to: "/computador-com-som-estranho-curitiba", label: "Som Estranho no PC" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD" },
      { to: "/como-funciona", label: "Como Funciona" }
    ]
  },

  // ==================== CÂMERA SEGURANÇA NÃO FUNCIONA ====================
  {
    slug: "camera-seguranca-nao-funciona-curitiba",
    title: "Câmera de Segurança Não Funciona em Curitiba | Reparo CFTV",
    metaDescription: "Câmera de segurança parou de funcionar? Técnico CFTV em Curitiba resolve problemas de DVR, câmeras IP, acesso remoto e gravação. Atendimento rápido.",
    h1: "Câmera de Segurança Não Funciona — Reparo CFTV em Curitiba",
    categoria: "CFTV / Segurança",
    intro: `Câmeras de segurança que param de funcionar deixam sua casa ou empresa vulnerável. O problema pode estar na câmera, no DVR/NVR, no cabeamento, na fonte de alimentação ou na configuração de rede.\n\nEm Curitiba e região metropolitana, oferecemos diagnóstico completo de sistemas CFTV — desde câmeras analógicas até sistemas IP modernos. Trabalhamos com todas as marcas (Intelbras, Hikvision, Giga, Multilaser) e resolvemos desde problemas simples como falta de energia até falhas complexas no DVR.\n\nSe suas câmeras pararam de gravar, perderam o acesso remoto pelo celular ou estão com imagem distorcida, nosso técnico identifica e resolve o problema com rapidez e garantia.`,
    sintomas: [
      { titulo: "Câmera com tela preta ou sem imagem", desc: "A câmera está ligada mas não transmite imagem. Pode ser problema na câmera, no cabo ou na porta do DVR.", gravidade: "Alta" },
      { titulo: "DVR não grava ou perdeu gravações", desc: "O HD do DVR pode estar cheio, com defeito, ou as configurações de gravação foram alteradas.", gravidade: "Alta" },
      { titulo: "Acesso remoto pelo celular não funciona", desc: "O app do celular não conecta nas câmeras. Pode ser problema de rede, DDNS ou configuração do roteador.", gravidade: "Média" },
      { titulo: "Imagem com interferência ou distorção", desc: "Imagem com linhas, cores alteradas ou ruído. Geralmente causado por cabo danificado ou fonte inadequada.", gravidade: "Média" },
      { titulo: "Câmera com visão noturna fraca", desc: "Imagem escura à noite, LEDs infravermelhos apagados ou fracos. Pode ser desgaste dos LEDs ou configuração errada.", gravidade: "Baixa" },
      { titulo: "DVR reinicia sozinho ou trava", desc: "Instabilidade no DVR causada por HD com defeito, fonte insuficiente ou superaquecimento.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "HD do DVR com defeito", desc: "HDs de vigilância (purple) têm vida útil de 3-5 anos em uso contínuo 24/7. Quando falham, param de gravar ou corrompem as gravações.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação queimada", desc: "Fontes chaveadas de CFTV queimam por oscilação na rede elétrica ou por sobrecarga quando alimentam muitas câmeras.", tipo: "hardware" },
      { titulo: "Cabo coaxial ou UTP danificado", desc: "Cabos expostos ao sol, chuva ou roedores perdem a blindagem, causando interferência ou perda total de sinal.", tipo: "desgaste" },
      { titulo: "Configuração de rede alterada", desc: "Mudança de roteador, IP ou provedor de internet desconecta o acesso remoto e o DDNS do sistema.", tipo: "erro-humano" },
      { titulo: "Câmera com placa queimada", desc: "Curto-circuito por raio, surto elétrico ou infiltração de água danifica a placa interna da câmera.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reconfiguração de acesso remoto, DDNS, ajuste de gravação ou troca de fonte. Sem necessidade de peças.", tempo: "1-2 horas", custo: "R$100–R$200" },
      { nivel: "Médio", desc: "Troca de HD do DVR, substituição de câmera com defeito, reparo de cabeamento parcial.", tempo: "2-4 horas", custo: "R$200–R$500" },
      { nivel: "Complexo", desc: "Reestruturação completa do sistema, troca de DVR, repassagem de cabos e reconfiguração total.", tempo: "1-3 dias", custo: "R$500–R$2.000" }
    ],
    riscos: [
      "Casa ou empresa sem monitoramento = vulnerável a furtos e invasões",
      "Perda de gravações importantes como evidência para ocorrências policiais",
      "Câmeras aparentemente funcionando mas sem gravar (falsa sensação de segurança)",
      "Acesso remoto comprometido pode permitir invasão do sistema por hackers",
      "Danos elétricos podem se propagar para outras câmeras do sistema"
    ],
    diagnostico: `O diagnóstico de CFTV inclui teste individual de cada câmera com monitor portátil, verificação do cabeamento com testador de cabo, análise do HD do DVR com software especializado (CrystalDiskInfo) e teste da rede para acesso remoto.\n\nVerificamos também a fonte de alimentação com multímetro, a qualidade da imagem em cada canal, o status das gravações e a configuração do DDNS/P2P. O resultado é um laudo completo do sistema com priorização dos reparos necessários.`,
    solucao: `A solução profissional para sistemas CFTV inclui:\n\n1. Diagnóstico completo de todas as câmeras, cabos e DVR\n2. Substituição de componentes com defeito (HD, fontes, câmeras)\n3. Reconfiguração de acesso remoto e DDNS\n4. Teste de gravação e reprodução em todos os canais\n5. Configuração de alertas e detecção de movimento\n6. Orientação sobre manutenção preventiva do sistema\n\nTrabalhamos com peças originais Intelbras e compatíveis de qualidade, sempre com garantia.`,
    quandoCompensa: "Na maioria dos casos, o reparo é viável — trocar um HD ou fonte custa muito menos que um sistema novo. Mesmo câmeras individuais podem ser substituídas sem trocar todo o sistema.",
    quandoNaoCompensa: "Sistemas muito antigos (analógicos de baixa resolução) podem não valer o investimento em reparo. Nesses casos, recomendamos a migração para um sistema moderno com câmeras Full HD ou 4K.",
    whatsappMessage: "Olá! Minhas câmeras de segurança pararam de funcionar e preciso de reparo. Podem me ajudar?",
    conteudoExtra: `## Manutenção Preventiva Para Sistemas CFTV\n\nUm sistema de câmeras de segurança precisa de manutenção periódica para funcionar de forma confiável. Recomendamos revisão a cada 6-12 meses.\n\n### O Que Verificar Periodicamente\n\n1. **Gravações** — Verifique se o DVR está gravando corretamente todos os canais\n2. **Acesso remoto** — Teste o app do celular regularmente para garantir que funciona\n3. **Qualidade de imagem** — Câmeras sujas ou desalinhadas perdem eficiência\n4. **HD do DVR** — Monitore a saúde do HD para trocar antes que falhe\n5. **Fontes e conexões** — Verifique se há oxidação ou mau contato nos conectores\n\n### Tipos de Câmera e Suas Particularidades\n\n- **Câmeras Analógicas (AHD/TVI/CVI)** — Mais simples e baratas, usam cabo coaxial. Resolução até 5MP.\n- **Câmeras IP** — Conectam via rede (cabo de rede ou WiFi). Resolução até 8MP (4K). Mais flexíveis mas exigem rede bem configurada.\n- **Câmeras WiFi** — Práticas mas dependem da qualidade do sinal WiFi. Sujeitas a interferência.\n\n### Quando Fazer Upgrade do Sistema\n\n- Câmeras com menos de 2MP (1080p) já não oferecem imagem útil para identificação\n- DVRs antigos não suportam acesso remoto por P2P (exigem configuração de portas no roteador)\n- Sistemas com mais de 5 anos podem ter peças de reposição descontinuadas\n\nOferecemos consultoria gratuita para avaliar se seu sistema precisa de upgrade ou apenas manutenção.`,
    relatedPages: [
      { to: "/cftv", label: "CFTV e Câmeras" },
      { to: "/cftv/curitiba", label: "CFTV Curitiba" },
      { to: "/servicos/redes-wifi", label: "Redes e WiFi" },
      { to: "/atendimento-domicilio", label: "Atendimento a Domicílio" },
      { to: "/suporte-empresas", label: "Suporte Empresas" },
      { to: "/como-funciona", label: "Como Funciona" }
    ]
  },

  // ==================== FONTE QUEIMADA ====================
  {
    slug: "fonte-queimada-curitiba",
    title: "Fonte Queimada em Curitiba | Diagnóstico e Troca de Fonte",
    metaDescription: "Fonte do computador ou notebook queimou? Técnico em Curitiba faz diagnóstico e troca de fonte com garantia. Atendimento rápido em domicílio.",
    h1: "Fonte Queimada — Diagnóstico e Substituição em Curitiba",
    categoria: "Hardware",
    intro: `A fonte de alimentação é responsável por converter a energia da tomada para o padrão que os componentes internos do computador ou notebook necessitam. Quando ela queima, o equipamento simplesmente para de funcionar — sem nenhum sinal de vida.\n\nUma fonte com defeito pode causar danos graves em outros componentes como placa-mãe, processador e HD/SSD. Por isso, é fundamental usar fontes de qualidade e fazer a substituição corretamente quando necessário.\n\nEm Curitiba, oferecemos diagnóstico preciso para confirmar se o problema é realmente na fonte (e não na placa-mãe) e fazemos a substituição com fontes certificadas 80 Plus, garantindo eficiência energética e proteção para seus componentes.`,
    sintomas: [
      { titulo: "Computador não liga de jeito nenhum", desc: "Nenhuma luz, nenhum som, nenhuma reação ao pressionar o botão de ligar. Pode ser fonte queimada ou botão com defeito.", gravidade: "Alta" },
      { titulo: "Computador desliga sozinho sob carga", desc: "Desliga durante jogos ou tarefas pesadas. A fonte não consegue fornecer energia suficiente.", gravidade: "Alta" },
      { titulo: "Cheiro de queimado vindo do gabinete", desc: "Componentes internos da fonte queimaram. Desligue imediatamente da tomada para evitar danos maiores.", gravidade: "Crítica" },
      { titulo: "Computador reinicia aleatoriamente", desc: "Instabilidade na alimentação elétrica causa reinicializações sem motivo aparente.", gravidade: "Média" },
      { titulo: "Ventilador da fonte parou de girar", desc: "A ventoinha da fonte não funciona, causando superaquecimento interno que pode levar à queima.", gravidade: "Média" },
      { titulo: "Notebook não carrega a bateria", desc: "O carregador/fonte do notebook pode estar com defeito, impedindo o carregamento mesmo conectado na tomada.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Surto ou oscilação na rede elétrica", desc: "Picos de tensão, quedas de energia e raios podem queimar a fonte instantaneamente. Uso de estabilizador/nobreak previne.", tipo: "hardware" },
      { titulo: "Fonte subdimensionada para os componentes", desc: "Fonte de baixa potência (300W) alimentando placa de vídeo que exige 500W+ causa sobrecarga e queima.", tipo: "erro-humano" },
      { titulo: "Desgaste natural dos capacitores", desc: "Capacitores internos da fonte perdem capacidade ao longo dos anos, especialmente em fontes genéricas de baixa qualidade.", tipo: "desgaste" },
      { titulo: "Acúmulo de poeira interna", desc: "Poeira bloqueia a ventilação da fonte, causando superaquecimento dos componentes internos.", tipo: "desgaste" },
      { titulo: "Tomada sem aterramento", desc: "Instalação elétrica sem aterramento adequado aumenta o risco de danos por surtos e descargas.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de fonte de desktop por modelo certificado 80 Plus. Apenas a fonte com defeito, sem danos em outros componentes.", tempo: "1-2 horas", custo: "R$200–R$400" },
      { nivel: "Médio", desc: "Troca de fonte + diagnóstico de componentes que podem ter sido afetados (placa-mãe, HD).", tempo: "2-4 horas", custo: "R$300–R$600" },
      { nivel: "Complexo", desc: "Fonte queimou e danificou placa-mãe ou outros componentes. Requer substituição múltipla.", tempo: "3-7 dias", custo: "R$500–R$1.500" }
    ],
    riscos: [
      "Fonte genérica pode queimar e levar junto placa-mãe, processador e memórias",
      "Fonte subdimensionada causa instabilidade e corrupção de dados",
      "Risco de curto-circuito e incêndio com fontes de procedência duvidosa",
      "Perda total do equipamento se a queima se propagar para outros componentes",
      "Danos à rede elétrica do ambiente em casos extremos"
    ],
    diagnostico: `O diagnóstico de fonte é feito com multímetro digital, verificando as tensões de saída em cada trilha (3.3V, 5V, 12V) e comparando com os valores de referência ATX.\n\nUtilizamos testador de fonte ATX para simular carga e verificar estabilidade. Também inspecionamos visualmente os capacitores internos (capacitores estufados ou com vazamento indicam defeito). O teste inclui verificação da placa-mãe para garantir que não houve dano colateral.`,
    solucao: `A solução profissional para fonte queimada inclui:\n\n1. Diagnóstico com multímetro e testador de fonte ATX\n2. Verificação de danos em outros componentes\n3. Dimensionamento correto da nova fonte (potência adequada para os componentes)\n4. Instalação de fonte certificada 80 Plus (Bronze, Silver ou Gold)\n5. Teste de estabilidade sob carga\n6. Orientação sobre proteção elétrica (nobreak, estabilizador, DPS)\n\nSempre recomendamos fontes de marcas reconhecidas (Corsair, EVGA, Cooler Master, DeepCool) para evitar reincidência.`,
    quandoCompensa: "Trocar a fonte sempre compensa quando os demais componentes estão funcionando. Uma fonte de qualidade custa R$200-R$500 e protege um investimento de R$2.000-R$10.000 em componentes.",
    quandoNaoCompensa: "Quando a fonte queimada danificou placa-mãe e processador de um computador antigo, o custo total de reparo pode ultrapassar o valor de um equipamento novo e mais moderno.",
    whatsappMessage: "Olá! A fonte do meu computador queimou e ele não liga mais. Podem me ajudar?",
    conteudoExtra: `## Como Escolher a Fonte Certa Para Seu Computador\n\nA fonte de alimentação é o componente mais negligenciado na montagem de PCs, mas é o mais importante para a segurança de todo o sistema.\n\n### Certificação 80 Plus: O Que Significa\n\nA certificação 80 Plus garante que a fonte converte pelo menos 80% da energia da tomada em energia útil para o computador:\n\n- **80 Plus White** — 80% de eficiência (entrada de linha)\n- **80 Plus Bronze** — 82-85% (melhor custo-benefício)\n- **80 Plus Gold** — 87-90% (ideal para uso intenso)\n- **80 Plus Platinum/Titanium** — 90-94% (profissional/servidor)\n\n### Dimensionamento: Quanto de Potência Você Precisa\n\n- **PC básico (sem placa de vídeo)** — 300-400W\n- **PC intermediário (GTX 1650/RX 6500)** — 450-500W\n- **PC gamer (RTX 3060/RX 6700)** — 550-650W\n- **PC gamer high-end (RTX 4070+)** — 750-850W\n- **Workstation profissional** — 850W+\n\n### Fontes Genéricas vs. Certificadas\n\nFontes genéricas (sem certificação) custam R$50-R$100 mas representam risco real:\n- Não têm proteção contra surto, curto-circuito ou sobrecarga\n- Componentes internos de baixa qualidade falham prematuramente\n- Podem fornecer tensões instáveis que danificam componentes\n- Em casos extremos, podem causar incêndio\n\nUma fonte certificada de R$250-R$400 protege um investimento de milhares de reais em componentes. É economia inteligente.\n\n### Proteção Adicional: Nobreak e DPS\n\nAlém de uma boa fonte, recomendamos:\n- **Nobreak (UPS)** — Mantém o PC ligado durante quedas de energia, evitando corrupção de dados\n- **DPS (Dispositivo de Proteção contra Surtos)** — Protege contra raios e picos de tensão na rede elétrica`,
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto PC/Notebook" },
      { to: "/servicos/montagem-pc", label: "Montagem de PC" },
      { to: "/computador-com-som-estranho-curitiba", label: "Som Estranho no PC" },
      { to: "/como-funciona", label: "Como Funciona" }
    ]
  },

  // ==================== PLACA-MÃE COM DEFEITO ====================
  {
    slug: "placa-mae-com-defeito-curitiba",
    title: "Placa-Mãe com Defeito em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Placa-mãe com defeito? Técnico em Curitiba faz diagnóstico profissional, reparo de componentes e substituição. Atendimento para desktop e notebook.",
    h1: "Placa-Mãe com Defeito — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware",
    intro: `A placa-mãe é o componente central do computador — ela conecta e gerencia a comunicação entre processador, memória, disco, placa de vídeo e todos os periféricos. Um defeito na placa-mãe pode causar desde instabilidade e travamentos até a impossibilidade total de ligar o equipamento.\n\nO diagnóstico de placa-mãe exige conhecimento técnico avançado e ferramentas específicas, pois os sintomas podem ser confundidos com problemas em outros componentes. Em Curitiba, oferecemos diagnóstico profissional com multímetro, osciloscópio e testes de bancada para identificar com precisão o componente defeituoso.\n\nTrabalhamos com reparo de placa-mãe (quando viável) e substituição, tanto para desktops quanto para notebooks de todas as marcas.`,
    sintomas: [
      { titulo: "Computador não liga (sem nenhuma reação)", desc: "Ao pressionar o botão power, não há luzes, ventiladores ou bipes. Pode ser placa-mãe, fonte ou botão power.", gravidade: "Alta" },
      { titulo: "Bipes ao ligar (código de erro)", desc: "Sequência de bipes indica erro específico: memória, vídeo, processador ou placa-mãe. Cada fabricante tem códigos diferentes.", gravidade: "Alta" },
      { titulo: "Portas USB, áudio ou rede não funcionam", desc: "Controladores integrados à placa-mãe podem falhar individualmente, desativando portas e funções específicas.", gravidade: "Média" },
      { titulo: "Computador liga mas não exibe imagem", desc: "POST falha — o computador liga os ventiladores mas não inicializa. Pode ser VRM, BIOS corrompida ou slot de memória.", gravidade: "Alta" },
      { titulo: "Reinicializações e travamentos frequentes", desc: "Capacitores estufados, trilhas oxidadas ou VRM com defeito causam instabilidade generalizada.", gravidade: "Alta" },
      { titulo: "Capacitores visivelmente estufados ou vazando", desc: "Capacitores com topo abaulado ou com resíduo marrom são sinal claro de defeito e devem ser substituídos.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Surto elétrico / raio", desc: "Picos de tensão na rede elétrica podem queimar trilhas e componentes da placa-mãe instantaneamente.", tipo: "hardware" },
      { titulo: "Capacitores estufados por desgaste", desc: "Capacitores eletrolíticos perdem eficiência com o tempo e temperatura, causando instabilidade progressiva.", tipo: "desgaste" },
      { titulo: "Curto-circuito por líquido ou poeira condutiva", desc: "Líquido derramado ou acúmulo de poeira metálica pode causar curto entre trilhas da placa.", tipo: "erro-humano" },
      { titulo: "BIOS corrompida", desc: "Atualização de BIOS interrompida ou falha de firmware pode tornar a placa inoperante.", tipo: "software" },
      { titulo: "VRM (regulador de tensão) com defeito", desc: "O circuito que regula a tensão para o processador pode falhar, impedindo a inicialização ou causando instabilidade.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reset de BIOS, troca de bateria CMOS, limpeza de contatos oxidados. Sem substituição de componentes.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Troca de capacitores, reparo de conector, atualização/recuperação de BIOS com gravador.", tempo: "2-5 horas", custo: "R$150–R$400" },
      { nivel: "Complexo", desc: "Substituição completa da placa-mãe. Requer compatibilidade com processador e memórias existentes.", tempo: "3-7 dias", custo: "R$400–R$1.500" }
    ],
    riscos: [
      "Placa-mãe com defeito parcial pode danificar processador ou memórias",
      "Curto-circuito em andamento pode queimar componentes ainda funcionando",
      "VRM com defeito pode fornecer tensão excessiva ao processador, queimando-o",
      "Tentativa amadora de reparo pode agravar o dano e inutilizar a placa",
      "Perda total de dados se o defeito causar dano ao controlador de disco"
    ],
    diagnostico: `O diagnóstico profissional de placa-mãe utiliza múltiplas ferramentas:\n\n1. Inspeção visual com lupa — capacitores estufados, trilhas queimadas, componentes carbonizados\n2. Multímetro — verificação de tensões, continuidade e curto-circuito\n3. Teste com fonte de bancada — alimentação controlada para identificar consumo anormal\n4. Teste de POST — cartão de diagnóstico PCI/PCIe que exibe códigos de erro\n5. Teste de componentes isolados — memória, processador e vídeo testados separadamente\n\nO resultado é um laudo preciso indicando se o reparo é viável ou se a substituição é mais indicada.`,
    solucao: `A solução profissional para placa-mãe com defeito inclui:\n\n1. Diagnóstico completo com ferramentas de bancada\n2. Reparo quando viável (troca de capacitores, resolda de componentes, recuperação de BIOS)\n3. Substituição quando o reparo não é viável — com compatibilidade garantida para seu processador e memórias\n4. Teste de estabilidade completo (Prime95, MemTest86)\n5. Reinstalação de drivers se necessário\n6. Garantia de 90 dias no serviço\n\nPara notebooks, trabalhamos com reballing BGA e micro-soldagem quando aplicável.`,
    quandoCompensa: "Reparos simples (capacitores, BIOS) compensam em qualquer situação. Substituição de placa compensa quando processador e memórias são recentes e compatíveis com placas disponíveis no mercado.",
    quandoNaoCompensa: "Quando a placa é de geração antiga (mais de 6 anos) e não há substituta compatível no mercado, ou quando o custo de placa + mão de obra ultrapassa 60% do valor de um PC novo equivalente.",
    whatsappMessage: "Olá! Suspeito que a placa-mãe do meu computador está com defeito. Podem fazer um diagnóstico?",
    conteudoExtra: `## Entendendo os Defeitos de Placa-Mãe\n\nA placa-mãe é um componente complexo com centenas de circuitos integrados, capacitores, resistores e trilhas. Entender como ela funciona ajuda a prevenir problemas.\n\n### Componentes Críticos da Placa-Mãe\n\n1. **VRM (Voltage Regulator Module)** — Regula a tensão para o processador. Falha = PC não liga ou instável\n2. **Chipset** — Gerencia a comunicação entre CPU, memória e periféricos\n3. **BIOS/UEFI** — Firmware que inicializa o hardware antes do sistema operacional\n4. **Capacitores** — Filtram e estabilizam a energia. São os componentes que mais falham\n5. **Slots e conectores** — PCIe, RAM, SATA, USB, áudio\n\n### Sinais de Alerta Que Você Não Deve Ignorar\n\n- **Bipes ao ligar** — Cada sequência tem um significado (consulte o manual da placa)\n- **LEDs de diagnóstico** — Placas modernas têm LEDs que indicam qual etapa do POST falhou\n- **Cheiro de queimado** — Desligue imediatamente. Componente pode estar em curto\n- **Instabilidade progressiva** — Travamentos cada vez mais frequentes indicam degeneração\n\n### Desktop vs. Notebook: Diferenças no Reparo\n\n**Desktop:**\n- Placa-mãe facilmente substituível\n- Padrão ATX/mATX = muitas opções de substituição\n- Reparo de capacitores é relativamente simples\n\n**Notebook:**\n- Placa-mãe é específica para cada modelo\n- Substituição cara e com pouca disponibilidade\n- Reparo com micro-soldagem e reballing é mais viável\n- Maior probabilidade de dano por líquido ou superaquecimento\n\n### Prevenção: Como Proteger Sua Placa-Mãe\n\n1. **Use nobreak** — Protege contra surtos e quedas de energia\n2. **Mantenha aterramento** — Instalação elétrica com fio terra é essencial\n3. **Evite poeira** — Limpeza interna a cada 6-12 meses\n4. **Não force componentes** — Instalação incorreta de RAM ou placa de vídeo pode danificar slots\n5. **Atualize BIOS com cuidado** — Nunca desligue o PC durante atualização de BIOS`,
    relatedPages: [
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/servicos/conserto-placa", label: "Conserto de Placa" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto PC/Notebook" },
      { to: "/servicos/montagem-pc", label: "Montagem de PC" },
      { to: "/como-funciona", label: "Como Funciona" }
    ]
  },

  // ===== notebook-nao-carrega-curitiba =====
  {
    slug: "notebook-nao-carrega-curitiba",
    title: "Notebook Não Carrega a Bateria em Curitiba — Diagnóstico e Reparo",
    metaDescription: "Notebook não carrega a bateria em Curitiba? Diagnóstico profissional identifica se é carregador, conector DC, bateria ou placa. Atendimento rápido.",
    h1: "Notebook Não Carrega a Bateria — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Energia",
    intro: `Seu notebook está conectado à tomada mas a bateria não carrega? Ou carrega até um ponto e para? Esse problema é mais comum do que parece e pode ter causas simples (carregador defeituoso) ou complexas (circuito de carga da placa-mãe).

Ignorar esse sintoma pode levar a danos permanentes na bateria ou na placa-mãe. Quanto antes diagnosticar, menor o custo do reparo.

Em Curitiba, fazemos diagnóstico preciso para identificar exatamente o que está impedindo o carregamento — e só então propomos a solução adequada. Sem trocar peças desnecessárias.`,
    sintomas: [
      { titulo: "LED do carregador apaga ao conectar", desc: "Indica possível curto-circuito no notebook ou carregador com defeito.", gravidade: "Alta" },
      { titulo: "Bateria carrega até 80% e para", desc: "Pode ser limitação de software (modo de conservação) ou bateria em degradação.", gravidade: "Média" },
      { titulo: "Carrega só com notebook desligado", desc: "Circuito de carga pode estar sobrecarregado ou componente da placa com defeito.", gravidade: "Alta" },
      { titulo: "Mensagem 'conectado, sem carregar'", desc: "O sistema reconhece o carregador mas não inicia a carga — problema no IC de carga.", gravidade: "Alta" },
      { titulo: "Bateria descarrega mesmo na tomada", desc: "Carregador com potência insuficiente ou conector DC com mau contato.", gravidade: "Média" },
      { titulo: "Notebook só funciona na tomada", desc: "Bateria completamente degradada ou desconectada internamente.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Carregador defeituoso ou incompatível", desc: "Carregador com voltagem/amperagem errada ou cabo rompido internamente.", tipo: "hardware" },
      { titulo: "Conector DC (jack) com mau contato", desc: "O conector onde o carregador encaixa está solto, oxidado ou com solda fria.", tipo: "desgaste" },
      { titulo: "Bateria degradada (ciclos esgotados)", desc: "Baterias de lítio perdem capacidade após 300-500 ciclos de carga.", tipo: "desgaste" },
      { titulo: "Circuito de carga da placa-mãe", desc: "O IC (chip) responsável por gerenciar a carga está danificado.", tipo: "hardware" },
      { titulo: "Configuração de software", desc: "Modo de conservação de bateria ativado (Lenovo, ASUS) limita carga a 60-80%.", tipo: "software" },
      { titulo: "Driver ACPI corrompido", desc: "Driver de gerenciamento de energia com defeito impede o carregamento correto.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de carregador ou reset de bateria via software. Solução em minutos.", tempo: "30min a 1h", custo: "R$ 90 a R$ 200" },
      { nivel: "Médio", desc: "Troca de conector DC (jack de carga) ou substituição da bateria.", tempo: "1h a 3h", custo: "R$ 150 a R$ 400" },
      { nivel: "Complexo", desc: "Reparo de circuito de carga na placa-mãe com micro-soldagem.", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 700" }
    ],
    riscos: [
      "Usar carregador genérico incompatível pode danificar a placa-mãe permanentemente",
      "Bateria inchada pode deformar o chassis e romper a tela internamente",
      "Continuar usando com bateria defeituosa pode causar superaquecimento e incêndio",
      "Conector DC solto pode causar curto-circuito intermitente na placa",
      "Ignorar o problema degrada a bateria mais rápido — o que era troca de R$200 vira reparo de R$600"
    ],
    diagnostico: `O diagnóstico avalia cada ponto da cadeia de carga:\n\n1. Teste do carregador com multímetro (voltagem e amperagem real)\n2. Inspeção do conector DC (mau contato, solda fria, oxidação)\n3. Verificação da saúde da bateria (ciclos, capacidade residual, inchaço)\n4. Teste do circuito de carga da placa-mãe\n5. Verificação de configurações de software (modo conservação, driver ACPI)\n\nCusto do diagnóstico: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `A solução depende da causa identificada:\n\n- **Carregador**: Substituição por modelo original ou compatível certificado\n- **Conector DC**: Resoldagem ou troca do conector (requer desmontagem)\n- **Bateria**: Substituição por bateria compatível com garantia\n- **Circuito de carga**: Micro-soldagem de componentes na placa-mãe\n- **Software**: Atualização de drivers ACPI e ajuste de configurações\n\nTodos os reparos incluem teste de carga completo antes da entrega.`,
    quandoCompensa: "Na maioria dos casos compensa reparar — trocar bateria ou conector custa uma fração do valor do notebook. Até reparo de circuito na placa pode valer a pena em notebooks de R$ 3.000+.",
    quandoNaoCompensa: "Quando o notebook tem mais de 7 anos e o reparo envolve placa-mãe + bateria + carregador simultaneamente. Ou quando o custo total ultrapassa 50% do valor de um notebook novo equivalente.",
    whatsappMessage: "Olá! Meu notebook não está carregando a bateria. Podem fazer um diagnóstico?",
    relatedPages: [
      { to: "/notebook-superaquecendo-curitiba", label: "Notebook Superaquecendo" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Como Verificar a Saúde da Bateria do Notebook\n\nAntes de levar ao técnico, você pode fazer um teste rápido:\n\n### Windows — Relatório de Bateria\n\n1. Abra o Prompt de Comando como administrador\n2. Digite: \`powercfg /batteryreport\`\n3. Abra o arquivo HTML gerado em C:\\Windows\\System32\n4. Compare "Design Capacity" com "Full Charge Capacity"\n\n**Se a Full Charge Capacity for menos de 50% da Design Capacity, a bateria precisa ser trocada.**\n\n### Tabela: Sinais e Possíveis Causas\n\n| Sintoma | Causa Provável | Urgência |\n|---|---|---|\n| LED apaga ao conectar | Curto ou carregador | Alta |\n| Carrega até 80% | Software ou degradação | Média |\n| Só funciona na tomada | Bateria morta | Média |\n| Carregador esquenta muito | Carregador incompatível | Alta |\n| Bateria inchada | Degradação química | URGENTE |\n\n### Atenção: Bateria Inchada\n\nSe o touchpad está levantado, o chassis está deformado ou há uma protuberância na parte inferior do notebook, **desligue imediatamente**. Bateria inchada de lítio pode romper e causar incêndio. Não tente remover sozinho — leve ao técnico.\n\n### Marcas e Modelos com Problemas Comuns de Carga\n\n| Marca | Problema Frequente | Solução Típica |\n|---|---|---|\n| Dell | Mensagem "carregador não reconhecido" | Trocar carregador original Dell |\n| Lenovo | Modo conservação ativado de fábrica | Desativar no Lenovo Vantage |\n| HP | Conector DC frágil | Resoldagem do jack |\n| Acer | Bateria degrada rápido | Troca de bateria |\n| Samsung | IC de carga sensível | Reparo de placa |`
  },

  // ===== pc-com-tela-preta-curitiba =====
  {
    slug: "pc-com-tela-preta-curitiba",
    title: "PC com Tela Preta em Curitiba — Diagnóstico e Reparo",
    metaDescription: "Computador ou notebook com tela preta em Curitiba? Diagnóstico identifica se é placa de vídeo, RAM, monitor ou sistema. Atendimento rápido.",
    h1: "PC com Tela Preta — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Vídeo",
    intro: `Ligar o computador e não ver nada na tela é desesperador. O PC com tela preta pode ter causas simples — como cabo HDMI solto — ou graves, como placa de vídeo queimada ou placa-mãe com defeito.

O mais importante é não entrar em pânico e não ficar reiniciando sem parar. Cada reinicialização forçada pode agravar o problema se a causa for um componente em curto.

Em Curitiba, nosso diagnóstico identifica a causa exata da tela preta — e só então propomos o reparo adequado. Trabalhamos com desktops e notebooks de todas as marcas.`,
    sintomas: [
      { titulo: "Tela totalmente preta, sem sinal", desc: "Monitor/tela não recebe nenhum sinal — pode ser cabo, placa de vídeo ou RAM.", gravidade: "Alta" },
      { titulo: "Tela preta com cursor piscando", desc: "O hardware funciona mas o sistema operacional não carregou corretamente.", gravidade: "Média" },
      { titulo: "Tela preta após logo do Windows", desc: "Problema de software: driver de vídeo, atualização corrompida ou perfil de usuário.", gravidade: "Média" },
      { titulo: "Tela preta com bipes ao ligar", desc: "POST falhou — o padrão de bipes indica qual componente está com defeito.", gravidade: "Alta" },
      { titulo: "Tela pisca e apaga", desc: "Backlight do monitor/tela com defeito ou inversor queimado (notebooks).", gravidade: "Média" },
      { titulo: "Tela preta intermitente", desc: "Problema de contato no cabo flat (notebook) ou placa de vídeo instável.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Memória RAM mal encaixada ou com defeito", desc: "RAM com mau contato é a causa mais comum de tela preta. Basta reencaixar.", tipo: "hardware" },
      { titulo: "Placa de vídeo com defeito", desc: "GPU queimada, superaquecida ou com solda BGA trincada.", tipo: "hardware" },
      { titulo: "Cabo de vídeo desconectado ou defeituoso", desc: "Cabo HDMI, VGA ou DisplayPort com mau contato ou rompido.", tipo: "hardware" },
      { titulo: "Monitor com defeito", desc: "Backlight queimado, placa de controle do monitor ou cabo flat danificado.", tipo: "hardware" },
      { titulo: "Driver de vídeo corrompido", desc: "Após atualização do Windows, o driver de vídeo pode ficar incompatível.", tipo: "software" },
      { titulo: "Fonte de alimentação insuficiente", desc: "Fonte sem potência para alimentar a placa de vídeo = tela preta.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe de RAM, troca de cabo ou ajuste de saída de vídeo.", tempo: "30min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Reinstalação de driver de vídeo em modo seguro ou troca de monitor.", tempo: "1h a 3h", custo: "R$ 120 a R$ 300" },
      { nivel: "Complexo", desc: "Troca de placa de vídeo, reparo de GPU (reballing) ou substituição de tela.", tempo: "2 a 7 dias", custo: "R$ 300 a R$ 1.200" }
    ],
    riscos: [
      "Reinicializações forçadas repetidas podem corromper o sistema de arquivos e causar perda de dados",
      "Placa de vídeo superaquecida continua danificando a solda BGA a cada uso",
      "Fonte subdimensionada pode queimar componentes além da GPU",
      "Ignorar bipes de erro pode resultar em dano progressivo à placa-mãe",
      "Tentar trocar RAM ou GPU sem aterramento pode causar descarga eletrostática"
    ],
    diagnostico: `Diagnóstico sistemático para tela preta:\n\n1. Verificação de cabos e conexões externas\n2. Teste com monitor externo (notebook) ou outro monitor (desktop)\n3. Teste de RAM (reencaixe e teste individual de cada pente)\n4. Verificação de bipes/LEDs de diagnóstico do POST\n5. Teste de placa de vídeo dedicada vs integrada\n6. Boot em modo seguro para descartar problemas de driver\n7. Teste de fonte com multímetro\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **RAM**: Limpeza dos contatos e reencaixe (ou substituição se defeituosa)\n- **Placa de vídeo**: Substituição ou reparo (reballing em casos específicos)\n- **Cabo/Monitor**: Troca do cabo ou reparo/troca do monitor\n- **Driver**: Reinstalação em modo seguro ou reversão de atualização\n- **Fonte**: Upgrade para fonte com potência adequada\n\nTeste completo de estresse após o reparo para garantir estabilidade.`,
    quandoCompensa: "Na maioria dos casos — o problema pode ser tão simples quanto um pente de RAM solto (R$ 90). Mesmo troca de placa de vídeo compensa se o restante do PC é atual.",
    quandoNaoCompensa: "Quando envolve GPU integrada na placa-mãe de notebook antigo (reparo de BGA caro e sem garantia de durabilidade) e o notebook já tem mais de 5-6 anos.",
    whatsappMessage: "Olá! Meu computador está com tela preta ao ligar. Podem fazer um diagnóstico?",
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto PC/Notebook" },
      { to: "/servicos/conserto-placa", label: "Conserto de Placa" },
      { to: "/como-funciona", label: "Como Funciona" }
    ],
    conteudoExtra: `## Guia: Como Identificar a Causa da Tela Preta\n\nAntes de chamar o técnico, observe estes detalhes:\n\n### Checklist Rápido\n\n1. **O PC liga?** (ventoinhas giram, LEDs acendem)\n   - Sim → Problema é vídeo/monitor\n   - Não → Problema é energia/placa-mãe\n\n2. **Há bipes ao ligar?**\n   - 1 bipe curto = POST OK (problema é no monitor/cabo)\n   - 3 bipes curtos = RAM com defeito\n   - 1 longo + 3 curtos = Placa de vídeo\n\n3. **Funciona com monitor externo?** (para notebooks)\n   - Sim → Tela/cabo flat do notebook com defeito\n   - Não → GPU ou placa-mãe\n\n### Tabela de Diagnóstico por Sintoma\n\n| Situação | Causa Mais Provável | Custo Médio |\n|---|---|---|\n| Tela preta + ventoinhas ligam | RAM ou cabo | R$ 90-150 |\n| Tela preta + bipes | RAM ou GPU | R$ 90-400 |\n| Tela preta após atualização | Driver de vídeo | R$ 120-200 |\n| Tela preta + cursor | Sistema corrompido | R$ 150-250 |\n| Tela preta intermitente | Cabo flat ou GPU | R$ 150-600 |\n| Nada funciona | Fonte ou placa-mãe | R$ 200-800 |\n\n### Erro Comum: "Tentei Trocar a RAM e Não Resolveu"\n\nTrocar RAM sem diagnóstico pode ser inútil. O problema pode estar no slot da placa-mãe, não na memória. Um técnico testa cada slot individualmente e identifica se o defeito é do pente ou do encaixe.\n\n### Desktop vs. Notebook: Diferenças\n\n**Desktop** — Mais fácil de diagnosticar: componentes são removíveis e testáveis individualmente. Placa de vídeo pode ser trocada facilmente.\n\n**Notebook** — GPU geralmente soldada na placa-mãe. Se a GPU falhar, pode ser necessário reballing (resoldagem) ou troca de placa inteira.`
  },

  // ===== erro-disco-cheio-curitiba =====
  {
    slug: "erro-disco-cheio-curitiba",
    title: "Erro de Disco Cheio em Curitiba — Diagnóstico e Solução",
    metaDescription: "Computador com disco cheio em Curitiba? Limpeza profissional, migração para SSD e organização de arquivos. Atendimento rápido em domicílio.",
    h1: "Erro de Disco Cheio — Diagnóstico e Solução em Curitiba",
    categoria: "Software — Armazenamento",
    intro: `Seu computador está mostrando avisos de "disco cheio" ou "espaço insuficiente"? Além de impedir que você salve arquivos, o disco cheio causa lentidão extrema, travamentos e até impede atualizações de segurança do Windows.

Na maioria dos casos, o problema não é que você tem "coisas demais" — mas sim que arquivos temporários, logs, caches e backups antigos estão ocupando dezenas de gigabytes sem você saber.

Em Curitiba, fazemos uma limpeza profissional completa e, quando necessário, migramos seus dados para um SSD maior — mantendo tudo funcionando como antes, só que mais rápido.`,
    sintomas: [
      { titulo: "Aviso 'Disco Local (C:) com pouco espaço'", desc: "Windows exibe notificação vermelha na barra de tarefas quando restam menos de 10% livres.", gravidade: "Média" },
      { titulo: "Computador extremamente lento", desc: "Sem espaço livre, o Windows não consegue criar arquivos de paginação e swap.", gravidade: "Alta" },
      { titulo: "Programas não abrem ou travam", desc: "Aplicativos precisam de espaço temporário para funcionar. Sem espaço = crash.", gravidade: "Alta" },
      { titulo: "Windows Update falha repetidamente", desc: "Atualizações precisam de 10-20 GB livres. Sem espaço, ficam em loop de falha.", gravidade: "Média" },
      { titulo: "Não consegue salvar arquivos", desc: "Erro ao salvar documentos, fotos ou downloads — disco 100% ocupado.", gravidade: "Alta" },
      { titulo: "Lixeira não esvazia ou está vazia mas sem espaço", desc: "Arquivos ocultos, Shadow Copies ou WinSxS estão ocupando o espaço.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Arquivos temporários acumulados", desc: "O Windows acumula GBs de arquivos temp, cache de navegador, logs antigos.", tipo: "software" },
      { titulo: "Pasta WinSxS inchada", desc: "A pasta de componentes do Windows pode ocupar 15-30 GB com backups de atualizações.", tipo: "software" },
      { titulo: "Shadow Copies (pontos de restauração)", desc: "O Windows cria cópias de segurança automáticas que podem ocupar dezenas de GB.", tipo: "software" },
      { titulo: "HD/SSD pequeno demais", desc: "SSDs de 120-240 GB ficam cheios rapidamente com Windows 11 + programas.", tipo: "hardware" },
      { titulo: "Downloads e duplicatas esquecidos", desc: "Pasta de downloads com GBs de instaladores antigos e arquivos duplicados.", tipo: "erro-humano" },
      { titulo: "Backup local do celular", desc: "Backup do iPhone/Android pode ocupar 20-50 GB sem o usuário saber.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de temporários, cache e downloads antigos. Recupera 10-30 GB.", tempo: "1h a 2h", custo: "R$ 90 a R$ 180" },
      { nivel: "Médio", desc: "Limpeza profunda + reorganização de dados + mover arquivos para HD externo.", tempo: "2h a 4h", custo: "R$ 150 a R$ 300" },
      { nivel: "Complexo", desc: "Migração completa para SSD maior com clonagem do sistema.", tempo: "3h a 5h", custo: "R$ 250 a R$ 600 (com SSD)" }
    ],
    riscos: [
      "Disco 100% cheio pode corromper o sistema de arquivos do Windows",
      "Sem espaço para swap/paginação, o sistema pode travar e perder dados não salvos",
      "Atualizações de segurança paradas deixam o sistema vulnerável a vírus",
      "Apagar arquivos sem saber o que são pode remover dados importantes do sistema",
      "SSD funcionando em 100% de capacidade degrada mais rápido (wear leveling prejudicado)"
    ],
    diagnostico: `Análise completa de espaço em disco:\n\n1. Mapeamento de uso com WizTree/TreeSize — identifica exatamente o que ocupa espaço\n2. Análise de arquivos temporários, cache e logs\n3. Verificação de Shadow Copies e pontos de restauração\n4. Identificação de pastas ocultas grandes (WinSxS, backup celular, WSL)\n5. Avaliação se o disco atual comporta suas necessidades\n6. Recomendação: limpeza vs. upgrade de SSD\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução em camadas:\n\n1. **Limpeza segura** — Removemos apenas o que é seguro: temp, cache, logs, duplicatas\n2. **Otimização** — Compactação NTFS, limpeza de WinSxS, ajuste de Shadow Copies\n3. **Reorganização** — Movemos arquivos grandes para unidade secundária ou nuvem\n4. **Upgrade** (quando necessário) — Migração para SSD de 480GB/1TB com clonagem\n\nTudo com backup prévio dos dados importantes.`,
    quandoCompensa: "Sempre — limpeza custa pouco e resolve na maioria dos casos. Upgrade de SSD é o melhor investimento para PCs com SSD de 120-240 GB.",
    quandoNaoCompensa: "Quando o disco está cheio porque o computador é muito antigo com HD de 320 GB e o custo de SSD + mão de obra se aproxima de um notebook novo.",
    whatsappMessage: "Olá! Meu computador está com disco cheio e muito lento. Podem me ajudar?",
    relatedPages: [
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/servicos/backup-recuperacao", label: "Backup e Recuperação" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## O Que Está Ocupando Espaço no Seu Disco?\n\nA maioria das pessoas se surpreende ao descobrir o que realmente ocupa espaço:\n\n### Top 10 Maiores Consumidores de Espaço\n\n| Item | Espaço Típico | Pode Limpar? |\n|---|---|---|\n| Pasta Windows\\Temp | 2-15 GB | ✅ Sim |\n| Cache do navegador | 1-5 GB | ✅ Sim |\n| Windows Update cache | 5-20 GB | ✅ Com cuidado |\n| WinSxS (componentes) | 10-30 GB | ⚠️ Parcialmente |\n| Shadow Copies | 5-50 GB | ✅ Ajustar limite |\n| Backup iPhone/Android | 10-50 GB | ⚠️ Se tiver cópia |\n| Pasta Downloads | 5-30 GB | ✅ Manualmente |\n| Jogos (Steam, Epic) | 20-200 GB | ⚠️ Mover para outro disco |\n| Arquivos PST (Outlook) | 2-20 GB | ⚠️ Compactar |\n| WSL/Docker | 5-50 GB | ⚠️ Se não usar |\n\n### SSD de 120 GB: Por Que Não é Suficiente em 2026\n\nO Windows 11 sozinho ocupa 25-40 GB. Adicione Office, navegador, antivírus e atualizações: você já usou 60-70 GB. Sobram 50 GB para TUDO o mais.\n\nNossa recomendação mínima: **SSD de 480 GB** para uso básico, **1 TB** para quem trabalha com arquivos grandes.\n\n### Dica Preventiva: Regra dos 20%\n\nMantenha sempre pelo menos 20% do disco livre. Para um SSD de 240 GB, isso significa manter 48 GB livres. Isso garante:\n\n- Espaço para swap/paginação do Windows\n- Espaço para atualizações de segurança\n- Vida útil maior do SSD (wear leveling eficiente)\n- Performance consistente do sistema\n\n### Passo a Passo: Limpeza Básica Que Você Pode Fazer\n\n1. **Limpeza de Disco** — Pesquise "Limpeza de Disco" no menu Iniciar → selecione tudo → limpar\n2. **Pasta Downloads** — Abra a pasta e delete instaladores antigos\n3. **Lixeira** — Esvazie a lixeira (clique direito no ícone da área de trabalho)\n4. **Cache do navegador** — Chrome: Ctrl+Shift+Del → Limpar dados\n\nSe depois disso ainda não resolver, é hora de chamar o técnico para uma limpeza profunda.`
  },


  // ===== windows-travando-na-atualizacao-curitiba =====
  {
    slug: "windows-travando-na-atualizacao-curitiba",
    title: "Windows Travando na Atualização em Curitiba — Diagnóstico e Solução",
    metaDescription: "Windows travou na atualização em Curitiba? Técnico resolve atualização parada, loop de reinicialização e tela preta pós-update. Atendimento rápido.",
    h1: "Windows Travando na Atualização — Diagnóstico e Solução em Curitiba",
    categoria: "Software — Sistema",
    intro: `Seu Windows travou em "Atualizando... não desligue o computador" e já se passaram horas? Ou o PC reiniciou após uma atualização e entrou em loop infinito? Esse é um dos problemas mais frustrantes — e mais comuns — que atendemos em Curitiba.

Atualizações do Windows podem falhar por diversos motivos: disco cheio, arquivos corrompidos, drivers incompatíveis ou até queda de energia durante a instalação. O resultado é quase sempre o mesmo: PC inutilizável.

O pior erro que você pode cometer é desligar o computador à força durante uma atualização. Isso pode corromper o sistema de arquivos e transformar um problema reversível em perda de dados. Antes de fazer qualquer coisa, fale com um técnico.`,
    sintomas: [
      { titulo: "Tela presa em 'Atualizando... XX%' por horas", desc: "A atualização parou em uma porcentagem e não avança. LED do HD pode estar parado.", gravidade: "Alta" },
      { titulo: "Loop de reinicialização após update", desc: "PC reinicia, tenta aplicar atualização, falha, reinicia de novo — infinitamente.", gravidade: "Alta" },
      { titulo: "Tela azul (BSOD) após atualização", desc: "Driver incompatível com a atualização causa crash no boot.", gravidade: "Alta" },
      { titulo: "Tela preta após atualização do Windows", desc: "Sistema não carrega a interface gráfica após update — driver de vídeo incompatível.", gravidade: "Alta" },
      { titulo: "'Desfazendo alterações' em loop", desc: "Windows tenta reverter a atualização mas falha e entra em loop.", gravidade: "Alta" },
      { titulo: "PC extremamente lento após atualização", desc: "Atualização instalou mas deixou serviços rodando em segundo plano consumindo 100% do disco/CPU.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Espaço insuficiente em disco", desc: "Atualizações grandes precisam de 10-20 GB livres. Sem espaço, a instalação trava no meio.", tipo: "software" },
      { titulo: "Arquivos de sistema corrompidos", desc: "Arquivos do Windows danificados impedem que a atualização se aplique corretamente.", tipo: "software" },
      { titulo: "Driver incompatível", desc: "Driver de vídeo, áudio ou rede antigo conflita com a nova versão do Windows.", tipo: "software" },
      { titulo: "Queda de energia durante atualização", desc: "Interrupção durante a gravação de arquivos críticos corrompe o sistema.", tipo: "erro-humano" },
      { titulo: "Antivírus bloqueando arquivos", desc: "Antivírus de terceiros podem impedir a substituição de arquivos do sistema.", tipo: "software" },
      { titulo: "HD/SSD com setores defeituosos", desc: "Disco com problemas físicos não consegue gravar os arquivos da atualização.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Boot em modo seguro + desinstalação da atualização problemática.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Médio", desc: "Reparo do sistema via WinRE + limpeza de componentes + reinstalação da atualização.", tempo: "2h a 4h", custo: "R$ 180 a R$ 350" },
      { nivel: "Complexo", desc: "Formatação com preservação de dados + reinstalação limpa do Windows.", tempo: "3h a 6h", custo: "R$ 250 a R$ 450" }
    ],
    riscos: [
      "Desligar o PC à força durante atualização pode corromper o sistema de arquivos permanentemente",
      "Atualizações de segurança paradas deixam o sistema vulnerável a ransomware e vírus",
      "Loop de reinicialização prolongado pode desgastar o SSD desnecessariamente",
      "Tentativas amadoras de 'consertar' pelo Prompt podem piorar a situação",
      "Perda de dados se o sistema for reinstalado sem backup adequado"
    ],
    diagnostico: `Diagnóstico especializado para atualização travada:\n\n1. Avaliação se a atualização ainda está em progresso (verificar LED de atividade do disco)\n2. Boot em modo seguro ou WinRE (Ambiente de Recuperação)\n3. Verificação de espaço em disco\n4. Scan de integridade com SFC e DISM\n5. Identificação da atualização problemática (KB específico)\n6. Teste de integridade do disco (SMART + setores)\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a gravidade:\n\n- **Atualização parada**: Aguardar tempo adequado (até 3h para updates grandes), depois boot em WinRE\n- **Loop de reinicialização**: Desinstalar atualização via modo seguro ou WinRE\n- **Tela azul/preta**: Reverter driver problemático ou restaurar ponto anterior\n- **Sistema corrompido**: Reparo com DISM + SFC ou reinstalação preservando dados\n- **Disco com problema**: Clonar para SSD novo antes de qualquer reparo de software\n\nSempre fazemos backup dos dados antes de qualquer intervenção.`,
    quandoCompensa: "Quase sempre — a maioria dos problemas de atualização se resolve com reparo de software (R$ 120-350), sem perda de dados nem formatação.",
    quandoNaoCompensa: "Quando o PC já tinha múltiplos problemas acumulados (vírus, disco defeituoso, sistema muito antigo). Nesses casos, formatação limpa é mais eficiente.",
    whatsappMessage: "Olá! Meu Windows travou na atualização e não consigo usar o computador. Podem me ajudar?",
    relatedPages: [
      { to: "/tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/erro-disco-cheio-curitiba", label: "Disco Cheio" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## O Que Fazer (e Não Fazer) Quando o Windows Trava na Atualização\n\n### ❌ NÃO FAÇA\n\n1. **Não desligue o PC à força** — Espere pelo menos 2-3 horas antes de considerar isso\n2. **Não tire da tomada** — Isso é a pior coisa que pode fazer durante uma atualização\n3. **Não tente "consertar" com comandos do YouTube** — Muitos tutoriais estão errados ou desatualizados\n4. **Não reinstale o Windows por conta própria** — Sem backup, você perde tudo\n\n### ✅ FAÇA\n\n1. **Observe o LED de atividade do disco** — Se estiver piscando, a atualização ainda está em andamento\n2. **Espere pelo menos 3 horas** — Atualizações grandes podem levar tempo, especialmente em HDs antigos\n3. **Se parou há mais de 3h sem atividade** — Desligue segurando o botão 10 segundos\n4. **Na reinicialização** — Se entrar em WinRE, escolha "Restaurar para ponto anterior"\n\n### Atualizações Problemáticas Conhecidas (2025-2026)\n\n| Atualização | Problema Comum | Solução |\n|---|---|---|\n| Windows 11 24H2 | Loop de reinicialização | Desinstalar via WinRE |\n| KB5034441 | Erro 0x80070643 | Redimensionar partição WinRE |\n| KB5074105 | Tela preta após update | Reverter driver de vídeo |\n| Feature Update 24H2 | Incompatibilidade com drivers antigos | Atualizar drivers antes |\n\n### Prevenção: Como Evitar Problemas com Atualizações\n\n1. **Mantenha 20% do disco livre** — Espaço é essencial para updates\n2. **Crie um ponto de restauração** antes de atualizações grandes\n3. **Atualize drivers** de vídeo e rede antes de feature updates\n4. **Não desligue** durante atualizações — use nobreak se possível\n5. **Agende atualizações** para horários em que não vai usar o PC`
  },

  // ===== notebook-com-tela-quebrada-curitiba =====
  {
    slug: "notebook-com-tela-quebrada-curitiba",
    title: "Notebook com Tela Quebrada em Curitiba — Troca de Tela e Reparo",
    metaDescription: "Tela do notebook quebrada, trincada ou com manchas em Curitiba? Troca de tela LCD/LED com peças compatíveis. Orçamento rápido e sem compromisso.",
    h1: "Notebook com Tela Quebrada — Troca e Reparo em Curitiba",
    categoria: "Hardware — Tela",
    intro: `Notebook caiu, levou uma pancada ou a tela simplesmente começou a apresentar manchas e linhas? A tela é um dos componentes mais frágeis do notebook — e um dos mais caros de substituir se não souber onde procurar.

Em Curitiba, fazemos a troca de tela de notebook de todas as marcas: Dell, Lenovo, HP, Acer, Samsung, ASUS. Trabalhamos com telas compatíveis de qualidade, testadas antes da instalação.

O importante é não continuar usando com a tela quebrada: além do desconforto visual, cristais líquidos podem vazar e danificar outros componentes. Quanto antes trocar, melhor.`,
    sintomas: [
      { titulo: "Tela trincada ou rachada", desc: "Impacto físico causou trinca visível. Imagem pode estar parcialmente visível.", gravidade: "Alta" },
      { titulo: "Manchas pretas ou coloridas espalhadas", desc: "Cristal líquido vazou internamente — tela precisa ser substituída.", gravidade: "Alta" },
      { titulo: "Linhas verticais ou horizontais na tela", desc: "Pode ser cabo flat com mau contato ou defeito no painel LCD/LED.", gravidade: "Média" },
      { titulo: "Tela com metade escura", desc: "Backlight parcialmente queimado ou conector do cabo flat solto.", gravidade: "Média" },
      { titulo: "Tela piscando ou com flickering", desc: "Cabo flat com mau contato na dobradiça ou inversor com defeito.", gravidade: "Média" },
      { titulo: "Tela funciona só em ângulo específico", desc: "Cabo flat rompendo na região da dobradiça — vai piorar progressivamente.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Queda ou impacto", desc: "A causa mais comum. Notebook caiu, algo caiu sobre ele, ou foi apertado na mochila.", tipo: "erro-humano" },
      { titulo: "Pressão sobre a tampa fechada", desc: "Apoiar peso sobre o notebook fechado pode trincar a tela.", tipo: "erro-humano" },
      { titulo: "Desgaste do cabo flat", desc: "O cabo que conecta a tela à placa-mãe passa pela dobradiça e se desgasta com o uso.", tipo: "desgaste" },
      { titulo: "Dobradiça quebrada ou apertada", desc: "Dobradiça com defeito força o cabo flat e pode trincar a moldura.", tipo: "desgaste" },
      { titulo: "Defeito de fabricação", desc: "Alguns modelos têm telas propensas a dead pixels ou backlight bleeding.", tipo: "hardware" },
      { titulo: "Choque térmico", desc: "Mudanças bruscas de temperatura podem causar micro-trincas no painel.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe do cabo flat ou ajuste de dobradiça. Tela fisicamente intacta.", tempo: "1h a 2h", custo: "R$ 90 a R$ 200" },
      { nivel: "Médio", desc: "Troca de tela LCD/LED padrão (14\"-15.6\"). Maioria dos casos.", tempo: "1 a 3 dias", custo: "R$ 350 a R$ 700" },
      { nivel: "Complexo", desc: "Troca de tela touch/IPS/alta resolução ou modelos raros. Peça sob encomenda.", tempo: "5 a 15 dias", custo: "R$ 600 a R$ 1.500" }
    ],
    riscos: [
      "Cristal líquido vazando pode danificar a placa-mãe e outros componentes",
      "Cabo flat rompendo progressivamente pode causar curto-circuito",
      "Usar com tela quebrada causa fadiga visual e dores de cabeça",
      "Telas genéricas baratas podem ter cores distorcidas e durabilidade baixa",
      "Trocar tela sem experiência pode danificar o cabo flat, webcam ou antena Wi-Fi"
    ],
    diagnostico: `Diagnóstico completo de tela:\n\n1. Inspeção visual da tela (trinca, mancha, linha)\n2. Teste com monitor externo (para confirmar que GPU está OK)\n3. Verificação do cabo flat (mau contato vs. rompimento)\n4. Teste de dobradiças (folga, aperto, quebra)\n5. Identificação do modelo exato da tela (part number)\n6. Orçamento com peça compatível de qualidade\n\nCusto do diagnóstico: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Processo de troca de tela:\n\n1. **Identificação** — Localizamos o part number exato da tela original\n2. **Peça** — Tela compatível de qualidade (mesma resolução, brilho e conector)\n3. **Desmontagem** — Remoção cuidadosa da moldura, dobradiças e cabos\n4. **Instalação** — Conexão do cabo flat e fixação da nova tela\n5. **Teste** — Verificação de cores, brilho, dead pixels e funcionamento do touch (se aplicável)\n6. **Entrega** — Notebook pronto com garantia na peça e serviço`,
    quandoCompensa: "Na maioria dos casos compensa — especialmente notebooks de até 4-5 anos. Troca de tela custa R$ 350-700, muito menos que um notebook novo.",
    quandoNaoCompensa: "Quando o notebook é antigo (7+ anos), a tela é de resolução/modelo raro e cara, ou há outros problemas simultâneos (placa, bateria, teclado).",
    whatsappMessage: "Olá! A tela do meu notebook está quebrada/trincada. Vocês fazem troca de tela? Qual o valor?",
    relatedPages: [
      { to: "/pc-com-tela-preta-curitiba", label: "PC com Tela Preta" },
      { to: "/notebook-superaquecendo-curitiba", label: "Notebook Superaquecendo" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/vale-a-pena-consertar-notebook", label: "Vale Consertar Notebook?" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Guia Completo: Troca de Tela de Notebook\n\n### Tipos de Tela de Notebook\n\n| Tipo | Características | Custo Médio |\n|---|---|---|\n| TN (básica) | Cores lavadas, ângulo ruim, barata | R$ 250-400 |\n| IPS | Cores vivas, bom ângulo de visão | R$ 400-700 |\n| Touch | Tela sensível ao toque | R$ 500-1.000 |\n| OLED | Pretos profundos, premium | R$ 800-1.500 |\n| Alta resolução (2K/4K) | Mais nítida, mais cara | R$ 600-1.200 |\n\n### Perguntas Frequentes Sobre Troca de Tela\n\n**Posso colocar uma tela melhor que a original?**\nEm muitos casos, sim. É possível fazer upgrade de TN para IPS no mesmo tamanho, desde que o conector seja compatível.\n\n**Quanto tempo demora?**\nA troca em si leva 1-2 horas. O tempo total depende da disponibilidade da peça (1-15 dias).\n\n**A tela nova vem com garantia?**\nSim — garantimos a peça e o serviço por 90 dias contra defeitos.\n\n### Como Proteger a Tela do Notebook\n\n1. **Use capa/sleeve** para transporte\n2. **Nunca apoie peso** sobre o notebook fechado\n3. **Abra pela parte central** da tela, não pelos cantos\n4. **Não limpe com álcool** — use pano de microfibra levemente úmido\n5. **Cuidado com objetos sobre o teclado** — canetas e fones podem trincar a tela ao fechar\n\n### Marcas: Facilidade e Custo de Troca\n\n| Marca | Facilidade de Troca | Disponibilidade de Peça | Custo |\n|---|---|---|---|\n| Dell | Fácil | Alta | Médio |\n| Lenovo | Fácil | Alta | Médio |\n| HP | Média | Alta | Médio |\n| Acer | Fácil | Média | Baixo-Médio |\n| Samsung | Difícil | Baixa | Alto |\n| Apple | Muito difícil | Baixa | Muito alto |`
  },

  // ===== pc-reiniciando-sozinho-curitiba =====
  {
    slug: "pc-reiniciando-sozinho-curitiba",
    title: "PC Reiniciando Sozinho em Curitiba — Diagnóstico e Reparo",
    metaDescription: "Computador reiniciando sozinho em Curitiba? Diagnóstico profissional identifica se é superaquecimento, fonte, RAM ou sistema. Atendimento rápido.",
    h1: "PC Reiniciando Sozinho — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Estabilidade",
    intro: `Seu computador reinicia do nada, sem aviso, no meio do trabalho ou durante jogos? Esse problema é especialmente frustrante porque você perde o que estava fazendo — e não sabe quando vai acontecer de novo.

Reinicializações aleatórias quase sempre indicam um problema de hardware: superaquecimento, fonte de alimentação instável, memória RAM com defeito ou placa-mãe com capacitores estufados. Menos frequentemente, pode ser driver ou atualização do Windows.

O mais perigoso é ignorar: se a causa for superaquecimento, cada reinicialização significa que o processador atingiu temperatura crítica. Com o tempo, isso danifica permanentemente o chip.`,
    sintomas: [
      { titulo: "Reinicia durante jogos ou tarefas pesadas", desc: "Forte indicativo de superaquecimento ou fonte sem potência suficiente.", gravidade: "Alta" },
      { titulo: "Reinicia aleatoriamente, sem padrão", desc: "Pode ser RAM com defeito intermitente ou capacitor estufado na placa-mãe.", gravidade: "Alta" },
      { titulo: "Reinicia e mostra tela azul rapidamente", desc: "O Windows está crashando (BSOD) e reiniciando automaticamente antes de você ler.", gravidade: "Alta" },
      { titulo: "Reinicia ao conectar periférico USB", desc: "Porta USB com curto-circuito ou fonte sobrecarregada.", gravidade: "Média" },
      { titulo: "Reinicia sempre no mesmo horário", desc: "Windows Update ou tarefa agendada configurada para reiniciar automaticamente.", gravidade: "Baixa" },
      { titulo: "Reinicia e não volta (fica desligado)", desc: "Proteção térmica ativada ou fonte com defeito intermitente.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Superaquecimento do processador", desc: "Pasta térmica seca + cooler com poeira = CPU atinge temperatura crítica e o PC desliga para se proteger.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação instável", desc: "Fonte degradada fornece tensão irregular, causando reinicialização sob carga.", tipo: "hardware" },
      { titulo: "Memória RAM com defeito", desc: "Erro intermitente na RAM causa crash do sistema e reinicialização.", tipo: "hardware" },
      { titulo: "Capacitores estufados na placa-mãe", desc: "Capacitores inchados causam instabilidade elétrica progressiva.", tipo: "desgaste" },
      { titulo: "Driver de vídeo com defeito", desc: "Driver incompatível causa BSOD seguido de reinicialização automática.", tipo: "software" },
      { titulo: "Windows Update automático", desc: "O Windows pode reiniciar automaticamente para aplicar atualizações.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna + troca de pasta térmica + desativação de reinicialização automática.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Médio", desc: "Troca de fonte, substituição de RAM ou atualização de drivers.", tempo: "1h a 3h", custo: "R$ 200 a R$ 450" },
      { nivel: "Complexo", desc: "Reparo de placa-mãe (troca de capacitores) ou substituição de placa.", tempo: "2 a 7 dias", custo: "R$ 300 a R$ 800" }
    ],
    riscos: [
      "Superaquecimento repetido reduz a vida útil do processador permanentemente",
      "Reinicializações durante gravação de dados corrompem arquivos e podem danificar o disco",
      "Fonte instável pode causar surto de tensão e queimar placa de vídeo ou placa-mãe",
      "Capacitores estufados eventualmente explodem e podem danificar componentes vizinhos",
      "Perda de trabalho não salvo a cada reinicialização inesperada"
    ],
    diagnostico: `Diagnóstico completo para PC reiniciando:\n\n1. Monitoramento de temperatura em tempo real (CPU, GPU)\n2. Teste de estresse para reproduzir o problema de forma controlada\n3. Teste de memória RAM (Memtest86 — mínimo 4 passagens)\n4. Verificação visual da placa-mãe (capacitores estufados)\n5. Teste da fonte com multímetro (todas as linhas de tensão)\n6. Análise do Event Viewer e minidumps de BSOD\n7. Verificação de drivers e atualizações do Windows\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução por causa identificada:\n\n- **Superaquecimento**: Limpeza completa + pasta térmica de qualidade + verificação do cooler\n- **Fonte**: Substituição por fonte de potência adequada (certificada 80 Plus)\n- **RAM**: Substituição do pente defeituoso (com teste prévio de cada pente)\n- **Placa-mãe**: Troca de capacitores ou substituição da placa\n- **Software**: Atualização de drivers + ajuste de configurações de reinicialização\n\nTeste de estabilidade por 2+ horas após o reparo.`,
    quandoCompensa: "Na grande maioria dos casos — limpeza térmica ou troca de fonte são soluções baratas (R$ 120-350) que resolvem 80% dos casos.",
    quandoNaoCompensa: "Quando a placa-mãe tem múltiplos capacitores estufados em PC de 8+ anos. O custo do reparo não justifica em hardware tão antigo.",
    whatsappMessage: "Olá! Meu computador está reiniciando sozinho do nada. Podem fazer um diagnóstico?",
    relatedPages: [
      { to: "/notebook-superaquecendo-curitiba", label: "Notebook Superaquecendo" },
      { to: "/tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto PC/Notebook" },
      { to: "/como-funciona", label: "Como Funciona" }
    ],
    conteudoExtra: `## Como Descobrir Por Que Seu PC Está Reiniciando\n\n### Passo 1: Desativar Reinicialização Automática\n\nO Windows esconde a tela azul (BSOD) reiniciando rápido demais. Para ver o erro:\n\n1. Clique direito em "Este Computador" → Propriedades\n2. Configurações avançadas do sistema\n3. Inicialização e Recuperação → Configurações\n4. Desmarque "Reiniciar automaticamente"\n5. Na próxima falha, a tela azul ficará visível\n\n### Passo 2: Verificar Temperatura\n\nBaixe o HWMonitor (gratuito) e observe:\n- **CPU abaixo de 80°C sob carga** = Normal\n- **CPU entre 80-95°C** = Precisa de limpeza\n- **CPU acima de 95°C** = Desligamento térmico iminente\n\n### Tabela de Diagnóstico Rápido\n\n| Quando Reinicia | Causa Mais Provável | Solução |\n|---|---|---|\n| Durante jogos/renderização | Superaquecimento ou fonte | Limpeza ou troca de fonte |\n| Aleatoriamente | RAM ou capacitores | Teste de RAM / inspeção placa |\n| Ao conectar USB | Curto na porta USB | Teste e reparo de porta |\n| Sempre no mesmo horário | Windows Update | Ajustar configurações |\n| Logo após ligar (1-5 min) | Superaquecimento grave | Limpeza urgente |\n| Só quando chove | Rede elétrica instável | Usar nobreak |\n\n### A Importância do Nobreak\n\nSe seu PC reinicia durante quedas de energia (mesmo micro-quedas de 0.5 segundo), um nobreak é essencial:\n\n- **Básico (600 VA)**: R$ 300-500 — protege contra micro-quedas\n- **Intermediário (1200 VA)**: R$ 500-800 — mantém PC ligado por 15-30 min\n- **Gamer (1500+ VA)**: R$ 800-1.500 — para PCs com placa de vídeo potente`
  },

  // ===== hd-fazendo-barulho-curitiba =====
  {
    slug: "hd-fazendo-barulho-curitiba",
    title: "HD Fazendo Barulho em Curitiba — Diagnóstico e Recuperação de Dados",
    metaDescription: "HD fazendo barulho, clique ou rangido em Curitiba? Diagnóstico urgente e recuperação de dados. Não ignore — cada minuto conta. Atendimento rápido.",
    h1: "HD Fazendo Barulho — Diagnóstico e Recuperação de Dados em Curitiba",
    categoria: "Hardware — Armazenamento",
    intro: `Se o HD do seu computador está fazendo barulhos estranhos — cliques, rangidos, estalos ou zumbidos — isso é um sinal de URGÊNCIA. Diferente de outros problemas que podem esperar, um HD barulhento pode parar de funcionar a qualquer momento, levando todos os seus dados junto.

Cada vez que você liga o computador com o HD barulhento, aumenta o risco de perda permanente de dados. Fotos, documentos, trabalhos — tudo pode ser perdido.

Em Curitiba, tratamos HD barulhento como emergência: diagnóstico prioritário para avaliar o estado do disco, tentativa de backup imediato dos dados e orientação sobre os próximos passos — sempre com transparência.`,
    sintomas: [
      { titulo: "Cliques repetitivos (click of death)", desc: "A cabeça de leitura não consegue posicionar — disco em estado crítico. DESLIGUE IMEDIATAMENTE.", gravidade: "Crítica" },
      { titulo: "Rangido ou chiado constante", desc: "Rolamento do motor com desgaste. O disco pode parar a qualquer momento.", gravidade: "Alta" },
      { titulo: "Estalos esporádicos", desc: "Setores defeituosos sendo remapeados. Disco em degradação progressiva.", gravidade: "Alta" },
      { titulo: "Zumbido mais alto que o normal", desc: "Motor do disco trabalhando com esforço extra — pode ser início de falha mecânica.", gravidade: "Média" },
      { titulo: "Barulho + computador travando", desc: "O sistema tenta ler setores defeituosos e trava esperando resposta do disco.", gravidade: "Alta" },
      { titulo: "Barulho + arquivos desaparecendo", desc: "Setores com dados estão se tornando ilegíveis — perda de dados em andamento.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Desgaste mecânico natural", desc: "HDs têm vida útil de 3-5 anos. Após esse período, componentes mecânicos começam a falhar.", tipo: "desgaste" },
      { titulo: "Queda ou impacto", desc: "Mesmo uma pequena queda pode desalinhar as cabeças de leitura ou danificar os pratos.", tipo: "erro-humano" },
      { titulo: "Superaquecimento prolongado", desc: "Temperatura acima de 50°C degrada os componentes internos do HD.", tipo: "desgaste" },
      { titulo: "Setores defeituosos acumulados", desc: "Setores bad se multiplicam progressivamente até o disco ficar ilegível.", tipo: "desgaste" },
      { titulo: "Falha do motor (spindle)", desc: "O motor que gira os pratos está travando ou com rolamento danificado.", tipo: "hardware" },
      { titulo: "Cabeça de leitura desalinhada", desc: "A cabeça que lê os dados está tocando os pratos (head crash) — dano físico.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "HD com poucos setores defeituosos — backup urgente + migração para SSD.", tempo: "2h a 4h", custo: "R$ 200 a R$ 400" },
      { nivel: "Médio", desc: "HD com muitos bad sectors — clonagem setor a setor com ferramenta especializada.", tempo: "6h a 24h", custo: "R$ 300 a R$ 600" },
      { nivel: "Complexo", desc: "HD não detectado ou cabeça danificada — recuperação em sala limpa (lab especializado).", tempo: "5 a 30 dias", custo: "R$ 800 a R$ 5.000+" }
    ],
    riscos: [
      "CADA VEZ que o HD barulhento é ligado, o risco de perda total de dados aumenta",
      "Head crash (cabeça tocando o prato) causa dano físico irreversível nos dados",
      "Tentar usar software de recuperação em HD com falha mecânica pode piorar o dano",
      "Congelar o HD (mito da internet) pode causar condensação e destruir os pratos",
      "Abrir o HD fora de sala limpa contamina os pratos com poeira e inviabiliza a recuperação"
    ],
    diagnostico: `Diagnóstico de EMERGÊNCIA para HD barulhento:\n\n1. Avaliação sonora (tipo de barulho indica gravidade)\n2. Verificação SMART (saúde do disco via software)\n3. Teste de leitura superficial (sem estressar o disco)\n4. Se detectado: tentativa imediata de backup dos dados mais importantes\n5. Avaliação: clonagem possível vs. necessidade de lab especializado\n6. Orçamento para migração de dados para SSD novo\n\nCusto: R$ 90 (incorporado se aprovar o serviço). URGENTE — não adie.`,
    solucao: `Protocolo para HD barulhento:\n\n1. **Não ligue mais o PC** até o diagnóstico — cada boot é um risco\n2. **Backup emergencial** — Se o HD ainda lê, copiamos os dados prioritários primeiro\n3. **Clonagem** — Para HDs com setores ruins, usamos ferramentas de clonagem bit-a-bit\n4. **Migração para SSD** — Instalamos SSD novo com seus dados e sistema operacional\n5. **Casos graves** — Encaminhamos para laboratório de recuperação em sala limpa\n\nSempre preservamos o HD original como último recurso até confirmar que todos os dados foram recuperados.`,
    quandoCompensa: "Sempre vale diagnosticar — o custo do diagnóstico é mínimo comparado ao valor dos dados. Se a clonagem funcionar (R$ 200-600), é excelente custo-benefício.",
    quandoNaoCompensa: "Quando o HD precisa de sala limpa (R$ 2.000-5.000+), vale avaliar se os dados justificam o investimento. Para dados substituíveis, melhor comprar SSD novo.",
    whatsappMessage: "Olá! O HD do meu computador está fazendo barulho estranho e estou preocupado com meus dados. É urgente!",
    relatedPages: [
      { to: "/erro-disco-cheio-curitiba", label: "Disco Cheio" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/backup-recuperacao", label: "Backup e Recuperação" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## URGENTE: O Que Fazer Agora Se Seu HD Está Barulhento\n\n### Ação Imediata\n\n1. **DESLIGUE o computador** — Não "normalmente", pode desligar direto no botão se necessário\n2. **NÃO ligue de novo** para "ver se melhorou" — cada tentativa pode ser a última\n3. **NÃO tente software de recuperação** — Em falha mecânica, isso piora o dano\n4. **NÃO congele o HD** — Mito perigoso. Condensação destrói os pratos\n5. **NÃO abra o HD** — Poeira microscópica inutiliza os dados\n6. **Ligue para um técnico** — Diagnóstico urgente\n\n### Guia Sonoro: O Que Cada Barulho Significa\n\n| Barulho | Significado | Gravidade | Ação |\n|---|---|---|---|\n| Click-click-click | Cabeça não posiciona | CRÍTICA | Desligue AGORA |\n| Rangido contínuo | Motor travando | ALTA | Desligue em breve |\n| Estalos esporádicos | Setores ruins | ALTA | Backup urgente |\n| Zumbido alto | Motor com esforço | MÉDIA | Agende diagnóstico |\n| Silêncio total | Motor não gira | CRÍTICA | HD já parou |\n\n### HD vs. SSD: Por Que Migrar\n\n| Característica | HD (mecânico) | SSD (estado sólido) |\n|---|---|---|\n| Partes móveis | Sim (motor, cabeças) | Não |\n| Risco de falha mecânica | Alto após 3-5 anos | Zero |\n| Barulho | Sim | Silencioso |\n| Velocidade | 80-150 MB/s | 500-3.500 MB/s |\n| Resistência a queda | Baixa | Alta |\n| Vida útil | 3-5 anos típicos | 5-10 anos típicos |\n\n### Quanto Valem Seus Dados?\n\nAntes de decidir se vale investir em recuperação, considere:\n\n- **Fotos de família** — Insubstituíveis. Qualquer custo justificado\n- **Documentos de trabalho** — Podem custar muito mais que a recuperação\n- **Downloads e programas** — Podem ser baixados de novo\n- **Sistema operacional** — Reinstalável\n\n### Prevenção: Como Evitar Perder Dados\n\n1. **Backup 3-2-1**: 3 cópias, 2 mídias diferentes, 1 fora de casa (nuvem)\n2. **Migre para SSD**: Sem partes mecânicas = sem risco de falha mecânica\n3. **Monitore o SMART**: CrystalDiskInfo (gratuito) avisa antes do HD falhar\n4. **Nobreak**: Protege contra queda de energia que pode danificar o HD\n5. **Não mova o PC ligado**: Vibrações danificam o HD em operação`
  },


  // ===== impressora-nao-imprime-curitiba =====
  {
    slug: "impressora-nao-imprime-curitiba",
    title: "Impressora Não Imprime em Curitiba — Diagnóstico e Solução",
    metaDescription: "Impressora não imprime em Curitiba? Técnico resolve erro de spooler, cabeça entupida, driver incompatível e fila travada. Atendimento rápido.",
    h1: "Impressora Não Imprime — Diagnóstico e Solução em Curitiba",
    categoria: "Periféricos — Impressão",
    intro: `Mandou imprimir e nada saiu? Impressora que não imprime é um dos problemas mais comuns — e mais irritantes — do dia a dia. As causas vão desde fila de impressão travada (resolve em 2 minutos) até cabeça de impressão entupida (precisa de manutenção profissional).

Antes de comprar uma impressora nova, vale a pena investigar: na maioria dos casos, o problema é resolvível e com custo baixo. Em Curitiba, fazemos diagnóstico e reparo de impressoras jato de tinta, laser e multifuncionais de todas as marcas.

O segredo é não ficar tentando imprimir repetidamente — isso só gasta tinta e pode piorar o entupimento. Melhor diagnosticar primeiro.`,
    sintomas: [
      { titulo: "Manda imprimir e nada acontece", desc: "Documento fica na fila de impressão mas a impressora não responde.", gravidade: "Média" },
      { titulo: "Impressão sai em branco", desc: "Papel sai mas sem nenhum conteúdo — cabeça entupida ou cartucho vazio.", gravidade: "Média" },
      { titulo: "Impressão sai com falhas/listras", desc: "Cabeça de impressão parcialmente entupida ou toner mal distribuído.", gravidade: "Média" },
      { titulo: "Erro 'Impressora offline'", desc: "O computador não consegue se comunicar com a impressora — driver, cabo ou Wi-Fi.", gravidade: "Média" },
      { titulo: "Papel atolando repetidamente", desc: "Rolete de tração desgastado, papel úmido ou mecanismo com sujeira.", gravidade: "Média" },
      { titulo: "Impressora liga mas não é reconhecida", desc: "Driver não instalado, porta USB com defeito ou problema de rede.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Fila de impressão travada (spooler)", desc: "O serviço de impressão do Windows travou — documentos ficam na fila sem imprimir.", tipo: "software" },
      { titulo: "Cabeça de impressão entupida", desc: "Tinta secou nos bicos da cabeça — comum em impressoras jato de tinta pouco usadas.", tipo: "desgaste" },
      { titulo: "Driver incompatível ou corrompido", desc: "Após atualização do Windows, driver antigo pode parar de funcionar.", tipo: "software" },
      { titulo: "Cartucho/toner vazio ou defeituoso", desc: "Cartucho remanufaturado pode não ser reconhecido ou ter chip com defeito.", tipo: "hardware" },
      { titulo: "Conexão Wi-Fi instável", desc: "Impressora Wi-Fi perde conexão com a rede e fica 'offline'.", tipo: "software" },
      { titulo: "Rolete de tração desgastado", desc: "A borracha que puxa o papel perdeu aderência — papel não entra ou atola.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpar fila de impressão, reinstalar driver ou reconectar Wi-Fi.", tempo: "30min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Limpeza de cabeça de impressão, troca de cartucho ou ajuste de rede.", tempo: "1h a 2h", custo: "R$ 120 a R$ 250" },
      { nivel: "Complexo", desc: "Troca de cabeça de impressão, reparo mecânico ou troca de rolete.", tempo: "1 a 5 dias", custo: "R$ 200 a R$ 500" }
    ],
    riscos: [
      "Ficar tentando imprimir com cabeça entupida pode danificar permanentemente os bicos",
      "Cartuchos remanufaturados de baixa qualidade podem vazar e danificar a impressora",
      "Impressora laser com toner vazando espalha pó tóxico dentro do equipamento",
      "Papel atolado removido com força pode quebrar o mecanismo de tração",
      "Usar driver genérico pode funcionar parcialmente mas limita recursos da impressora"
    ],
    diagnostico: `Diagnóstico completo de impressora:\n\n1. Verificação de status no Windows (fila, spooler, driver)\n2. Teste de impressão direto do painel da impressora (página de teste)\n3. Verificação de conexão (USB, Wi-Fi, rede)\n4. Inspeção de cartuchos/toner (nível, chip, vazamento)\n5. Teste de cabeça de impressão (padrão de bicos)\n6. Verificação mecânica (roletes, bandeja, sensores)\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução por causa:\n\n- **Spooler travado**: Reiniciar serviço + limpar fila + reinstalar driver\n- **Cabeça entupida**: Limpeza com solução específica (manual, não automática)\n- **Driver**: Desinstalar completamente + instalar versão atualizada do fabricante\n- **Wi-Fi**: Reconfigurar conexão + IP fixo para evitar desconexões\n- **Mecânico**: Limpeza ou troca de roletes, sensores e engrenagens\n\nTeste completo com impressão de página colorida e P&B após o reparo.`,
    quandoCompensa: "Na maioria dos casos — especialmente impressoras laser que custam R$ 1.000+. Reparo de R$ 90-250 é muito mais barato que substituir.",
    quandoNaoCompensa: "Impressoras jato de tinta baratas (R$ 300-500) com cabeça de impressão integrada queimada. O custo da cabeça nova se aproxima do valor da impressora.",
    whatsappMessage: "Olá! Minha impressora não está imprimindo. Podem fazer um diagnóstico?",
    relatedPages: [
      { to: "/servicos/redes-wifi", label: "Redes e Wi-Fi" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/suporte-empresas", label: "Suporte para Empresas" },
      { to: "/atendimento-domicilio", label: "Atendimento em Domicílio" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Guia: Resolva Problemas de Impressão\n\n### Passo a Passo: Fila de Impressão Travada\n\n1. Pressione **Win + R**, digite \`services.msc\`, Enter\n2. Encontre **"Spooler de Impressão"**\n3. Clique direito → **Parar**\n4. Abra \`C:\\Windows\\System32\\spool\\PRINTERS\` → delete tudo\n5. Volte em services.msc → **Iniciar** o Spooler\n6. Tente imprimir novamente\n\n### Impressora Jato de Tinta vs. Laser\n\n| Característica | Jato de Tinta | Laser |\n|---|---|---|\n| Custo inicial | Baixo (R$ 300-800) | Médio (R$ 800-2.500) |\n| Custo por página | Alto (R$ 0,30-1,00) | Baixo (R$ 0,05-0,15) |\n| Manutenção | Frequente (entupimento) | Rara |\n| Ideal para | Fotos, uso doméstico | Escritório, volume |\n| Problema mais comum | Cabeça entupida | Papel atolando |\n\n### Marcas e Problemas Mais Comuns\n\n| Marca | Problema Frequente | Dica |\n|---|---|---|\n| HP | Driver após update Windows | Usar HP Smart |\n| Epson | Cabeça entupida (EcoTank) | Imprimir 1x por semana |\n| Brother | Toner não reconhecido | Reset do chip |\n| Canon | Erro de cartucho | Limpar contatos |\n| Samsung | Papel atolando | Trocar roletes |`
  },

  // ===== monitor-sem-sinal-curitiba =====
  {
    slug: "monitor-sem-sinal-curitiba",
    title: "Monitor Sem Sinal em Curitiba — Diagnóstico e Reparo",
    metaDescription: "Monitor sem sinal, tela preta ou 'no signal' em Curitiba? Diagnóstico identifica se é cabo, placa de vídeo ou monitor. Atendimento rápido.",
    h1: "Monitor Sem Sinal — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Vídeo",
    intro: `Ligou o computador e o monitor mostra "Sem Sinal", "No Signal" ou "Check Signal Cable"? Esse é um dos problemas mais comuns — e felizmente, em muitos casos, a solução é simples.

A mensagem "sem sinal" significa que o monitor está funcionando (senão não mostraria nada), mas não está recebendo imagem do computador. Pode ser um cabo solto, entrada errada, placa de vídeo ou até a RAM.

Antes de entrar em pânico, verifique o básico: o cabo está bem conectado? O monitor está na entrada certa (HDMI vs VGA)? Se sim, é hora de um diagnóstico mais profundo.`,
    sintomas: [
      { titulo: "Mensagem 'Sem Sinal' ou 'No Signal'", desc: "Monitor funciona mas não recebe vídeo do PC. LED do monitor geralmente fica laranja.", gravidade: "Média" },
      { titulo: "Monitor pisca e mostra 'No Signal' brevemente", desc: "Sinal intermitente — cabo com mau contato ou resolução incompatível.", gravidade: "Média" },
      { titulo: "Sem sinal só no HDMI (VGA funciona)", desc: "Porta HDMI da placa de vídeo ou cabo HDMI com defeito.", gravidade: "Média" },
      { titulo: "Sem sinal após trocar placa de vídeo", desc: "Driver não instalado ou placa de vídeo mal encaixada no slot PCIe.", gravidade: "Média" },
      { titulo: "Sem sinal + PC não emite bipes", desc: "Possível problema grave: placa-mãe, processador ou fonte.", gravidade: "Alta" },
      { titulo: "Funciona por alguns minutos e perde sinal", desc: "Superaquecimento da GPU ou mau contato térmico.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Cabo de vídeo solto ou defeituoso", desc: "Cabo HDMI, DisplayPort ou VGA com mau contato ou rompido internamente.", tipo: "hardware" },
      { titulo: "Entrada de vídeo errada no monitor", desc: "Monitor configurado para HDMI mas o cabo está na VGA (ou vice-versa).", tipo: "erro-humano" },
      { titulo: "RAM desencaixada", desc: "Pente de RAM solto impede o POST e nenhum sinal de vídeo é enviado.", tipo: "hardware" },
      { titulo: "Placa de vídeo com defeito ou mal encaixada", desc: "GPU não encaixada completamente no slot PCIe ou com defeito.", tipo: "hardware" },
      { titulo: "Resolução incompatível", desc: "PC configurado para resolução que o monitor não suporta.", tipo: "software" },
      { titulo: "Fonte sem potência suficiente", desc: "Fonte não alimenta a placa de vídeo corretamente — GPU não inicializa.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe de cabo, troca de entrada no monitor ou reencaixe de RAM.", tempo: "15min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Troca de cabo, reencaixe de placa de vídeo ou ajuste de resolução.", tempo: "1h a 2h", custo: "R$ 90 a R$ 250" },
      { nivel: "Complexo", desc: "Troca de placa de vídeo, reparo de porta HDMI ou troca de fonte.", tempo: "1 a 5 dias", custo: "R$ 200 a R$ 800" }
    ],
    riscos: [
      "Ignorar 'sem sinal' intermitente pode indicar GPU morrendo — vai parar de vez em breve",
      "Forçar resolução incompatível pode deixar o monitor em estado inutilizável temporariamente",
      "Reencaixar placa de vídeo sem desligar o PC pode causar curto-circuito",
      "Cabo HDMI barato pode funcionar para 1080p mas falhar em 4K",
      "Fonte subdimensionada danifica a placa de vídeo progressivamente"
    ],
    diagnostico: `Diagnóstico para monitor sem sinal:\n\n1. Verificação de cabos e conexões\n2. Teste com outro cabo / outra entrada de vídeo\n3. Teste com outro monitor (para isolar se é PC ou monitor)\n4. Reencaixe de RAM e placa de vídeo\n5. Teste de vídeo integrado vs dedicado\n6. Verificação de bipes do POST\n7. Teste de fonte com multímetro\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução por causa:\n\n- **Cabo**: Troca por cabo de qualidade certificado\n- **Entrada errada**: Configuração correta no menu OSD do monitor\n- **RAM**: Limpeza de contatos e reencaixe\n- **Placa de vídeo**: Reencaixe, limpeza do slot PCIe ou substituição\n- **Resolução**: Boot em modo seguro e ajuste de resolução\n- **Fonte**: Upgrade para fonte com potência adequada\n\nTeste com múltiplas resoluções para garantir estabilidade.`,
    quandoCompensa: "Na maioria dos casos — 70% das vezes é cabo ou RAM (custo mínimo). Até troca de placa de vídeo compensa se o PC é atual.",
    quandoNaoCompensa: "Quando o monitor é antigo com entrada VGA apenas e o PC novo só tem HDMI/DP. Melhor investir em monitor novo.",
    whatsappMessage: "Olá! Meu monitor está mostrando 'sem sinal'. Podem fazer um diagnóstico?",
    relatedPages: [
      { to: "/pc-com-tela-preta-curitiba", label: "PC com Tela Preta" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto PC/Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Checklist Rápido: Monitor Sem Sinal\n\n### Antes de Chamar o Técnico\n\n1. ✅ Cabo está bem encaixado dos dois lados?\n2. ✅ Monitor está na entrada correta? (Botão Input/Source)\n3. ✅ Tentou outro cabo?\n4. ✅ PC está realmente ligado? (Ventoinhas giram? LEDs acesos?)\n5. ✅ Tentou outra porta de vídeo? (HDMI → VGA ou vice-versa)\n\nSe marcou tudo e ainda sem sinal → hora do técnico.\n\n### Guia de Cabos de Vídeo\n\n| Cabo | Resolução Máx | Áudio | Uso Ideal |\n|---|---|---|---|\n| VGA | 1080p (analógico) | Não | Monitores antigos |\n| DVI | 2560x1600 | Não | Monitores intermediários |\n| HDMI 2.0 | 4K 60Hz | Sim | Uso geral |\n| HDMI 2.1 | 4K 120Hz | Sim | Gaming |\n| DisplayPort 1.4 | 4K 120Hz | Sim | Monitores profissionais |\n| USB-C/Thunderbolt | 4K+ | Sim | Notebooks modernos |\n\n### Erro Comum: "Troquei o Cabo e Não Resolveu"\n\nSe trocar o cabo não resolveu, o problema está no PC (não no monitor). Teste conectando o monitor em outro computador ou notebook — se funcionar, confirmado que o defeito é no PC.`
  },

  // ===== teclado-nao-funciona-curitiba =====
  {
    slug: "teclado-nao-funciona-curitiba",
    title: "Teclado Não Funciona em Curitiba — Diagnóstico e Reparo",
    metaDescription: "Teclado do notebook ou PC não funciona em Curitiba? Diagnóstico de teclas travadas, líquido derramado, cabo flat e driver. Atendimento rápido.",
    h1: "Teclado Não Funciona — Diagnóstico e Reparo em Curitiba",
    categoria: "Periféricos — Entrada",
    intro: `Teclado parou de funcionar? Seja do notebook ou do desktop, um teclado com defeito paralisa completamente o trabalho. As causas vão desde sujeira acumulada sob as teclas até líquido derramado que causou curto-circuito.

No caso de notebooks, o problema pode ser ainda mais sério: o teclado está conectado à placa-mãe por um cabo flat frágil que pode romper, e líquidos derramados podem danificar componentes internos.

Em Curitiba, fazemos diagnóstico para identificar a causa exata — e só então propomos o reparo mais adequado, seja limpeza, troca de teclado ou reparo de cabo.`,
    sintomas: [
      { titulo: "Nenhuma tecla funciona", desc: "Teclado completamente morto — pode ser cabo, USB, driver ou dano físico.", gravidade: "Alta" },
      { titulo: "Algumas teclas não funcionam", desc: "Sujeira sob as teclas, membrana danificada ou teclas específicas com defeito.", gravidade: "Média" },
      { titulo: "Teclado digita caracteres errados", desc: "Layout trocado (ABNT2 vs Internacional), driver corrompido ou tecla grudada.", gravidade: "Baixa" },
      { titulo: "Teclas travadas ou repetindo", desc: "Sujeira, líquido seco ou membrana colando — tecla fica 'pressionada' sozinha.", gravidade: "Média" },
      { titulo: "Teclado funciona às vezes", desc: "Mau contato no cabo flat (notebook) ou porta USB intermitente (desktop).", gravidade: "Alta" },
      { titulo: "Líquido foi derramado no teclado", desc: "URGENTE — desligue imediatamente e vire de cabeça para baixo.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Líquido derramado", desc: "Café, água, refrigerante — o líquido penetra e causa curto-circuito ou oxidação.", tipo: "erro-humano" },
      { titulo: "Cabo flat desconectado (notebook)", desc: "O cabo que liga o teclado à placa-mãe se soltou ou rompeu.", tipo: "hardware" },
      { titulo: "Sujeira acumulada", desc: "Migalhas, pelos, poeira acumulam sob as teclas e impedem o contato.", tipo: "desgaste" },
      { titulo: "Driver corrompido ou ausente", desc: "Após atualização do Windows, o driver do teclado pode falhar.", tipo: "software" },
      { titulo: "Porta USB com defeito (desktop)", desc: "A porta USB onde o teclado está conectado não funciona mais.", tipo: "hardware" },
      { titulo: "Membrana desgastada", desc: "A membrana de contato sob as teclas perde condutividade com o uso.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalar driver, trocar porta USB ou reconectar cabo flat.", tempo: "30min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Limpeza profunda do teclado ou troca de teclado de notebook.", tempo: "1h a 3h", custo: "R$ 150 a R$ 400" },
      { nivel: "Complexo", desc: "Reparo de dano por líquido na placa-mãe do notebook.", tempo: "2 a 7 dias", custo: "R$ 300 a R$ 800" }
    ],
    riscos: [
      "Líquido derramado pode escorrer para a placa-mãe e causar dano permanente em minutos",
      "Tentar abrir teclado de notebook sem experiência pode romper o cabo flat",
      "Usar secador de cabelo para secar líquido pode empurrar umidade para dentro do notebook",
      "Ignorar teclas grudando pode causar digitação indesejada (senhas, emails, documentos)",
      "Teclado USB barato com defeito pode causar curto na porta USB do PC"
    ],
    diagnostico: `Diagnóstico de teclado:\n\n1. Teste com teclado externo USB (para isolar se é teclado ou sistema)\n2. Verificação de driver e layout de teclado no Windows\n3. Inspeção visual de dano por líquido ou sujeira\n4. Teste de cabo flat (notebook) — reencaixe e verificação de continuidade\n5. Teste de portas USB (desktop)\n6. Teste individual de teclas com software de diagnóstico\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução por causa:\n\n- **Líquido**: Desmontagem urgente, limpeza com álcool isopropílico, secagem\n- **Cabo flat**: Reencaixe ou substituição do cabo\n- **Sujeira**: Desmontagem e limpeza profunda tecla por tecla\n- **Driver**: Reinstalação do driver correto para o modelo\n- **Teclado danificado**: Troca por teclado compatível (notebook) ou novo (desktop)\n\nTeste completo de todas as teclas após o reparo.`,
    quandoCompensa: "Na maioria dos casos — troca de teclado de notebook custa R$ 150-400, muito menos que um notebook novo. Limpeza custa ainda menos.",
    quandoNaoCompensa: "Quando o líquido já danificou a placa-mãe do notebook e o reparo total ultrapassa 50% do valor do equipamento.",
    whatsappMessage: "Olá! O teclado do meu computador/notebook parou de funcionar. Podem me ajudar?",
    relatedPages: [
      { to: "/notebook-com-tela-quebrada-curitiba", label: "Tela Quebrada" },
      { to: "/notebook-nao-carrega-curitiba", label: "Notebook Não Carrega" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/atendimento-domicilio", label: "Atendimento em Domicílio" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## O Que Fazer Quando Derramar Líquido no Notebook\n\n### Ação Imediata (Primeiros 30 Segundos)\n\n1. **DESLIGUE imediatamente** — Segure o botão de energia por 5 segundos\n2. **Desconecte o carregador** — Remova da tomada\n3. **Vire de cabeça para baixo** — Apoie aberto em formato de "V invertido"\n4. **NÃO use secador** — Pode empurrar líquido para dentro\n5. **NÃO ligue de novo** — Espere pelo menos 48h ou leve ao técnico\n\n### Líquidos: Do Menos ao Mais Perigoso\n\n| Líquido | Perigo | Por Quê |\n|---|---|---|\n| Água | Médio | Pode causar curto, mas não corrói |\n| Café sem açúcar | Médio-Alto | Resíduos podem grudar componentes |\n| Café com açúcar | Alto | Açúcar corrói e gruda |\n| Refrigerante | Muito Alto | Ácido + açúcar = corrosão rápida |\n| Cerveja | Muito Alto | Açúcares + oxidação |\n\n### Troca de Teclado de Notebook: Como Funciona\n\n1. Identificamos o modelo exato (part number)\n2. Encomendamos teclado compatível\n3. Desmontamos o notebook com cuidado\n4. Desconectamos o cabo flat do teclado antigo\n5. Conectamos o novo e testamos todas as teclas\n6. Remontamos o notebook\n\nTempo total: 1-3 horas (se a peça estiver disponível).`
  },

  // ===== pc-nao-conecta-wifi-curitiba =====
  {
    slug: "pc-nao-conecta-wifi-curitiba",
    title: "PC Não Conecta no Wi-Fi em Curitiba — Diagnóstico e Solução",
    metaDescription: "Computador ou notebook não conecta no Wi-Fi em Curitiba? Técnico resolve driver, adaptador, configuração de rede e sinal fraco. Atendimento rápido.",
    h1: "PC Não Conecta no Wi-Fi — Diagnóstico e Solução em Curitiba",
    categoria: "Redes — Conectividade",
    intro: `Seu computador não conecta no Wi-Fi? Ou conecta mas a internet não funciona? Problemas de conectividade Wi-Fi são extremamente comuns e podem ter causas simples (driver desatualizado) ou complexas (adaptador Wi-Fi queimado).

O mais frustrante é quando outros dispositivos conectam normalmente — celular, tablet, smart TV — mas o computador se recusa a funcionar. Isso quase sempre indica problema no PC, não no roteador.

Em Curitiba, diagnosticamos problemas de Wi-Fi tanto no computador quanto na rede, garantindo que tudo funcione com estabilidade.`,
    sintomas: [
      { titulo: "Ícone de Wi-Fi não aparece", desc: "Adaptador Wi-Fi desativado, driver não instalado ou hardware com defeito.", gravidade: "Alta" },
      { titulo: "Vê a rede mas não conecta", desc: "Senha errada, conflito de IP, protocolo de segurança incompatível.", gravidade: "Média" },
      { titulo: "Conecta mas sem internet", desc: "DNS incorreto, gateway errado, proxy configurado ou problema no roteador.", gravidade: "Média" },
      { titulo: "Wi-Fi cai a cada poucos minutos", desc: "Driver instável, interferência de sinal ou adaptador superaquecendo.", gravidade: "Alta" },
      { titulo: "Velocidade muito baixa no Wi-Fi", desc: "Adaptador antigo (802.11n), canal congestionado ou distância do roteador.", gravidade: "Média" },
      { titulo: "Erro 'Não foi possível conectar a esta rede'", desc: "Perfil de rede corrompido no Windows — precisa esquecer e reconectar.", gravidade: "Baixa" }
    ],
    causas: [
      { titulo: "Driver Wi-Fi desatualizado ou corrompido", desc: "Após atualização do Windows, o driver do adaptador Wi-Fi pode ficar incompatível.", tipo: "software" },
      { titulo: "Adaptador Wi-Fi desativado", desc: "Atalho de teclado (Fn+F2) ou modo avião podem desativar o Wi-Fi.", tipo: "erro-humano" },
      { titulo: "Adaptador Wi-Fi com defeito", desc: "Adaptador interno do notebook queimou ou adaptador USB com defeito.", tipo: "hardware" },
      { titulo: "Configuração de rede incorreta", desc: "IP fixo configurado, DNS errado ou proxy ativado sem necessidade.", tipo: "software" },
      { titulo: "Roteador com problema", desc: "Roteador travado, firmware desatualizado ou muitos dispositivos conectados.", tipo: "hardware" },
      { titulo: "Antena Wi-Fi do notebook desconectada", desc: "Após manutenção, os cabos da antena Wi-Fi podem ter ficado desconectados.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalar driver, resetar configurações de rede ou reconectar perfil.", tempo: "30min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Médio", desc: "Instalar adaptador Wi-Fi USB, configurar roteador ou otimizar canal.", tempo: "1h a 2h", custo: "R$ 120 a R$ 300" },
      { nivel: "Complexo", desc: "Trocar adaptador Wi-Fi interno (mini PCIe) ou reconectar antenas do notebook.", tempo: "1h a 3h", custo: "R$ 150 a R$ 400" }
    ],
    riscos: [
      "Ficar sem atualizações de segurança por falta de internet deixa o PC vulnerável",
      "Instalar drivers de fontes não oficiais pode trazer vírus",
      "Adaptadores USB Wi-Fi baratos podem superaquecer e ter desempenho ruim",
      "Configurar IP fixo incorretamente pode causar conflitos na rede toda",
      "Resetar roteador sem anotar configurações pode derrubar a internet de todos os dispositivos"
    ],
    diagnostico: `Diagnóstico de conectividade Wi-Fi:\n\n1. Verificação de status do adaptador Wi-Fi (Gerenciador de Dispositivos)\n2. Teste com outros dispositivos na mesma rede\n3. Verificação de driver (versão, compatibilidade)\n4. Teste de ping e DNS\n5. Análise de sinal Wi-Fi (força, canal, interferência)\n6. Verificação de configurações de rede (IP, gateway, DNS)\n7. Teste com adaptador USB externo (para isolar hardware)\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Driver**: Atualização com driver oficial do fabricante\n- **Configuração**: Reset de rede do Windows + reconfiguração limpa\n- **Adaptador**: Instalação de adaptador USB Wi-Fi ou troca do módulo interno\n- **Roteador**: Atualização de firmware, otimização de canal e banda\n- **Antenas**: Reconexão dos cabos de antena internos do notebook\n\nTeste de velocidade e estabilidade (ping) por 30+ minutos após o reparo.`,
    quandoCompensa: "Quase sempre — resolver Wi-Fi custa R$ 90-300 e é essencial para o uso do computador. Até troca de adaptador interno é acessível.",
    quandoNaoCompensa: "Quando o notebook é tão antigo que só suporta Wi-Fi 802.11n e o adaptador USB 5GHz custa mais que um notebook usado.",
    whatsappMessage: "Olá! Meu computador não está conectando no Wi-Fi. Podem me ajudar?",
    relatedPages: [
      { to: "/servicos/redes-wifi", label: "Redes e Wi-Fi" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/internet-lenta-curitiba", label: "Internet Lenta" },
      { to: "/atendimento-domicilio", label: "Atendimento em Domicílio" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Resolva Problemas de Wi-Fi: Guia Completo\n\n### Reset Completo de Rede no Windows\n\n1. Abra **Configurações → Rede e Internet**\n2. Clique em **Redefinição de Rede** (no final da página)\n3. Clique em **Redefinir agora**\n4. O PC vai reiniciar — reconecte ao Wi-Fi com a senha\n\nIsso resolve 60% dos problemas de conectividade.\n\n### Diagnóstico via Prompt de Comando\n\n\`\`\`\nipconfig /all          → Mostra configuração de rede\nping 8.8.8.8          → Testa conexão com internet\nping google.com       → Testa DNS\nnetsh wlan show all   → Mostra redes e adaptador\n\`\`\`\n\n### Wi-Fi 5 GHz vs 2.4 GHz\n\n| Característica | 2.4 GHz | 5 GHz |\n|---|---|---|\n| Alcance | Longo (até 50m) | Curto (até 20m) |\n| Velocidade | Até 300 Mbps | Até 1.300+ Mbps |\n| Interferência | Alta (vizinhos, microondas) | Baixa |\n| Paredes | Atravessa bem | Perde sinal fácil |\n| Ideal para | Distância, IoT | Velocidade, jogos |\n\n### Adaptadores Wi-Fi USB Recomendados\n\n| Modelo | Padrão | Velocidade | Preço Médio |\n|---|---|---|---|\n| TP-Link Archer T3U | Wi-Fi 5 (AC) | Até 1.300 Mbps | R$ 100-150 |\n| TP-Link Archer TX20U | Wi-Fi 6 (AX) | Até 1.800 Mbps | R$ 150-250 |\n| Qualquer USB 2.0 N | Wi-Fi 4 (N) | Até 300 Mbps | R$ 40-70 |`
  },

  // ==================== NOTEBOOK ESQUENTANDO E DESLIGANDO ====================
  {
    slug: "notebook-esquentando-desligando-curitiba",
    title: "Notebook Esquentando e Desligando Sozinho em Curitiba | Técnico Especialista",
    metaDescription: "Notebook esquentando demais e desligando sozinho? Técnico em Curitiba resolve superaquecimento com limpeza, troca de pasta térmica e reparo de cooler. Atendimento rápido.",
    h1: "Notebook Esquentando e Desligando — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Térmico",
    intro: `Quando o notebook começa a esquentar excessivamente e desliga sozinho sem aviso, isso é um mecanismo de proteção do processador chamado thermal shutdown. O processador atinge temperaturas acima de 95-100°C e o sistema desliga para evitar danos permanentes ao chip.\n\nEsse problema é extremamente comum em Curitiba — apesar do clima mais ameno, a poeira acumulada nas saídas de ar e a pasta térmica ressecada são as principais causas. Notebooks com mais de 2 anos sem manutenção preventiva quase sempre apresentam esse sintoma.\n\nIgnorar o superaquecimento pode causar danos irreversíveis ao processador, GPU e placa-mãe. A solda BGA que conecta o chip à placa pode trincar com ciclos repetidos de calor extremo, transformando um problema de R$ 150 em um de R$ 800+.`,
    sintomas: [
      { titulo: "Desliga sozinho durante uso intenso", desc: "O notebook desliga abruptamente ao rodar jogos, editar vídeos ou abrir muitas abas. É o thermal shutdown protegendo o processador.", gravidade: "Alta" },
      { titulo: "Base do notebook muito quente", desc: "A parte inferior fica impossível de usar no colo. Temperaturas acima de 50°C na superfície indicam 90°C+ internamente.", gravidade: "Média-Alta" },
      { titulo: "Cooler fazendo barulho alto constantemente", desc: "A ventoinha gira na velocidade máxima o tempo todo, tentando compensar o calor excessivo. Pode indicar pasta térmica seca ou saída obstruída.", gravidade: "Média" },
      { titulo: "Lentidão progressiva antes de desligar", desc: "O processador reduz a velocidade (throttling) para tentar baixar a temperatura antes do desligamento forçado.", gravidade: "Média" },
      { titulo: "Tela congela e depois desliga", desc: "A GPU superaquece primeiro, causando artefatos visuais ou congelamento, seguido pelo desligamento térmico.", gravidade: "Alta" },
      { titulo: "Notebook não liga após desligar por calor", desc: "Proteção térmica impede a reinicialização até o processador esfriar. Se não liga nem depois de frio, pode haver dano na placa.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Pasta térmica ressecada", desc: "A pasta térmica entre o processador e o dissipador perde eficiência após 2-3 anos. Em vez de transferir calor, ela isola — fazendo a temperatura subir 20-30°C acima do normal.", tipo: "desgaste" },
      { titulo: "Saída de ar obstruída por poeira", desc: "Poeira, pelos de animais e fibras acumulam na grade do dissipador, bloqueando o fluxo de ar. É a causa mais comum e mais fácil de resolver.", tipo: "desgaste" },
      { titulo: "Cooler com defeito ou travado", desc: "O motor da ventoinha desgasta com o tempo, gira mais devagar ou trava completamente. Sem ventilação, a temperatura dispara em minutos.", tipo: "hardware" },
      { titulo: "Uso em superfícies que bloqueiam ventilação", desc: "Usar o notebook na cama, almofada ou sofá bloqueia as entradas de ar inferiores. Isso impede a circulação e causa superaquecimento mesmo em notebooks novos.", tipo: "erro-humano" },
      { titulo: "Componentes exigindo mais do que o sistema térmico suporta", desc: "Jogos pesados ou softwares de renderização forçam CPU e GPU ao máximo. Se o sistema de refrigeração já está comprometido, o desligamento é inevitável.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna + troca de pasta térmica. Resolve 70% dos casos de superaquecimento.", tempo: "1-2 horas", custo: "R$ 120–200" },
      { nivel: "Médio", desc: "Troca do cooler/ventoinha + limpeza completa + pasta térmica premium.", tempo: "2-4 horas", custo: "R$ 200–400" },
      { nivel: "Complexo", desc: "Reparo de solda BGA na GPU/CPU danificada pelo calor + sistema térmico completo.", tempo: "3-7 dias", custo: "R$ 400–900" }
    ],
    riscos: [
      "Dano permanente ao processador por ciclos repetidos de superaquecimento",
      "Solda BGA da GPU pode trincar, causando artefatos visuais permanentes ou tela preta",
      "Bateria pode inchar e deformar com calor excessivo — risco de incêndio",
      "Componentes da placa-mãe podem queimar (VRMs, capacitores) com calor prolongado",
      "Perda de dados se o desligamento abrupto corromper o sistema de arquivos do HD/SSD",
      "Tela pode apresentar manchas amarelas permanentes por calor irradiado da GPU"
    ],
    diagnostico: `Diagnóstico térmico completo:\n\n1. Medição de temperatura com sensores (CPU, GPU, SSD, ambiente)\n2. Teste de estresse controlado (Prime95 + FurMark) com monitoramento em tempo real\n3. Inspeção visual do dissipador, pasta térmica e ventoinha\n4. Verificação de RPM do cooler e curva de velocidade\n5. Análise do fluxo de ar (entrada e saída)\n6. Teste de bateria para verificar inchaço por calor\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a gravidade:\n\n- **Pasta térmica**: Remoção completa da pasta antiga + aplicação de pasta premium (Thermal Grizzly Kryonaut ou Arctic MX-6)\n- **Limpeza**: Desmontagem completa, limpeza do dissipador com ar comprimido e álcool isopropílico\n- **Cooler**: Troca da ventoinha por modelo original ou compatível\n- **Pad térmico**: Substituição dos thermal pads da memória VRAM e VRMs\n- **Base refrigerada**: Recomendação de base com ventilação para uso intenso\n\nTeste de estresse por 30+ minutos após o reparo para garantir temperaturas saudáveis (< 85°C sob carga).`,
    quandoCompensa: "Quase sempre — limpeza térmica custa R$ 120-200 e pode dar mais 2-3 anos de vida ao notebook. É a manutenção preventiva mais importante.",
    quandoNaoCompensa: "Quando a GPU já teve solda BGA danificada repetidamente e o notebook tem mais de 7 anos. Nesse caso o reparo pode custar mais que um notebook usado equivalente.",
    whatsappMessage: "Olá! Meu notebook está esquentando muito e desligando sozinho. Podem me ajudar?",
    relatedPages: [
      { to: "/notebook-superaquecendo-curitiba", label: "Notebook Superaquecendo" },
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Superaquecimento de Notebook: Guia Completo\n\n### Temperaturas Normais vs Perigosas\n\n| Componente | Idle (repouso) | Carga leve | Carga pesada | Crítico |\n|---|---|---|---|---|\n| CPU | 35-50°C | 50-70°C | 70-85°C | > 95°C |\n| GPU | 30-45°C | 45-65°C | 65-85°C | > 95°C |\n| SSD | 25-40°C | 35-50°C | 45-60°C | > 70°C |\n| Superfície | 25-35°C | 35-42°C | 42-50°C | > 55°C |\n\n### Como Verificar a Temperatura\n\n1. **HWMonitor** (gratuito) — mostra temperatura de todos os sensores\n2. **Core Temp** — focado em CPU, mostra throttling\n3. **GPU-Z** — monitora temperatura da placa de vídeo\n\n### Dicas para Reduzir o Calor\n\n- Use o notebook em superfície plana e rígida (mesa)\n- Invista em uma base refrigerada (R$ 60-150)\n- Limpe as saídas de ar com ar comprimido a cada 6 meses\n- Faça manutenção térmica profissional a cada 2 anos\n- Evite usar na cama ou no colo por longos períodos\n\n### Pasta Térmica: Qual Escolher?\n\n| Marca | Condutividade | Duração | Preço |\n|---|---|---|---|\n| Arctic MX-6 | 8.5 W/mK | 3-4 anos | R$ 30-50 |\n| Thermal Grizzly Kryonaut | 12.5 W/mK | 2-3 anos | R$ 60-100 |\n| Noctua NT-H2 | 9.0 W/mK | 3-5 anos | R$ 50-80 |\n| Pasta genérica (branca) | 1-3 W/mK | 1 ano | R$ 5-15 |`
  },

  // ==================== ERRO DE BIOS ====================
  {
    slug: "erro-bios-curitiba",
    title: "Erro de BIOS em Curitiba | Diagnóstico e Reparo Especializado",
    metaDescription: "Erro de BIOS no computador? Técnico em Curitiba resolve BIOS corrompida, configuração errada, atualização falha e senha esquecida. Atendimento profissional.",
    h1: "Erro de BIOS — Diagnóstico e Reparo Profissional em Curitiba",
    categoria: "Hardware — Firmware",
    intro: `A BIOS (ou UEFI, em computadores modernos) é o primeiro software que roda quando você liga o computador. Ela inicializa o hardware, verifica se tudo está funcionando e passa o controle para o sistema operacional. Quando há um erro na BIOS, o computador pode não ligar, travar na tela de POST, emitir bipes ou mostrar mensagens de erro antes do Windows.\n\nErros de BIOS são particularmente assustadores porque aparecem antes mesmo do sistema operacional carregar — muitos usuários pensam que o computador "morreu". Na maioria dos casos, porém, o problema é resolvível com configuração correta, reset de CMOS ou regravação de firmware.\n\nEm Curitiba, atendemos frequentemente casos de BIOS corrompida após queda de energia (algo comum em bairros como CIC, Boqueirão e Cajuru), atualização de BIOS interrompida e configurações incorretas após upgrade de hardware.`,
    sintomas: [
      { titulo: "Mensagem 'CMOS Checksum Error'", desc: "A bateria CR2032 da placa-mãe está fraca ou morta. A BIOS perde as configurações salvas toda vez que o PC é desligado.", gravidade: "Simples" },
      { titulo: "PC não passa da tela de POST", desc: "O computador liga, mostra o logo do fabricante, mas trava e não chega ao Windows. Pode indicar configuração de boot incorreta ou hardware não reconhecido.", gravidade: "Média" },
      { titulo: "Bipes ao ligar (beep codes)", desc: "Sequências de bipes indicam erros específicos de hardware. 1 bipe longo + 3 curtos = problema de vídeo. Cada fabricante tem códigos diferentes.", gravidade: "Média-Alta" },
      { titulo: "Mensagem 'Boot Device Not Found'", desc: "A BIOS não encontra o HD/SSD para iniciar o sistema. Pode ser cabo solto, ordem de boot errada ou disco com falha.", gravidade: "Média" },
      { titulo: "BIOS corrompida após atualização", desc: "Atualização de BIOS interrompida por queda de energia ou arquivo errado. O computador pode não ligar de jeito nenhum.", gravidade: "Alta" },
      { titulo: "Senha de BIOS esquecida", desc: "Uma senha foi definida na BIOS e agora impede o acesso às configurações ou até a inicialização do sistema.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Bateria CR2032 fraca ou morta", desc: "A bateria da placa-mãe mantém as configurações da BIOS quando o PC está desligado. Após 3-5 anos, ela descarrega e a BIOS reseta para padrão de fábrica a cada boot.", tipo: "desgaste" },
      { titulo: "Atualização de BIOS falha", desc: "Atualizar a BIOS é arriscado — uma queda de energia, versão errada ou interrupção durante o processo pode corromper o firmware permanentemente.", tipo: "erro-humano" },
      { titulo: "Configuração incorreta após upgrade", desc: "Ao instalar novo hardware (RAM, SSD NVMe, processador), a BIOS pode precisar de ajustes. Configuração errada de AHCI/IDE, XMP ou boot order causa erros.", tipo: "erro-humano" },
      { titulo: "Queda de energia ou pico de tensão", desc: "Picos elétricos podem corromper o chip de BIOS/UEFI. Comum em Curitiba durante tempestades, especialmente sem uso de nobreak ou estabilizador.", tipo: "hardware" },
      { titulo: "Malware de BIOS (rootkit)", desc: "Embora raro, existem malwares que se instalam na BIOS/UEFI, sobrevivendo até a formatação. Mais comum em máquinas corporativas.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de bateria CR2032 + reset de CMOS + reconfiguração. Resolve checksum errors e perda de configurações.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Reconfiguração completa de BIOS/UEFI, ajuste de boot order, habilitação de AHCI/NVMe, configuração de XMP.", tempo: "1-2 horas", custo: "R$ 120–250" },
      { nivel: "Complexo", desc: "Regravação de chip BIOS com gravador externo (CH341A) + reprogramação de firmware. Para BIOS completamente corrompida.", tempo: "1-3 dias", custo: "R$ 200–500" }
    ],
    riscos: [
      "Atualizar BIOS com versão errada pode inutilizar a placa-mãe permanentemente",
      "Resetar CMOS sem conhecimento pode desabilitar recursos essenciais (AHCI, boot seguro)",
      "Configurar overclocking na BIOS sem experiência pode queimar processador ou RAM",
      "Ignorar erro de bateria CR2032 pode causar perda de hora/data e problemas de certificados SSL",
      "Desabilitar Secure Boot pode impedir o Windows 11 de iniciar",
      "Regravação amadora de BIOS pode gravar firmware incompatível e inutilizar a placa"
    ],
    diagnostico: `Diagnóstico de BIOS/UEFI:\n\n1. Análise dos beep codes (padrão do fabricante da placa-mãe)\n2. Verificação de bateria CR2032 com multímetro (deve estar acima de 2.8V)\n3. Reset de CMOS via jumper ou remoção de bateria\n4. Verificação de versão atual da BIOS vs versão mais recente\n5. Teste de boot com configurações padrão (Load Optimized Defaults)\n6. Verificação de integridade do chip BIOS com gravador externo\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme o caso:\n\n- **Bateria**: Troca da CR2032 + reconfiguração de data/hora e boot order\n- **Configuração**: Load Optimized Defaults + ajustes específicos (AHCI, XMP, boot order)\n- **Senha**: Reset via jumper CMOS ou remoção de bateria por 30 minutos\n- **BIOS corrompida**: Regravação com gravador CH341A e firmware original do fabricante\n- **Dual BIOS**: Ativação do chip BIOS de backup (em placas que possuem)\n\nTeste completo de POST e inicialização do sistema após o reparo.`,
    quandoCompensa: "Quase sempre — a maioria dos problemas de BIOS custa R$ 80-250 para resolver. Mesmo regravação de chip (R$ 200-500) é mais barato que trocar a placa-mãe.",
    quandoNaoCompensa: "Quando a placa-mãe já tem outros defeitos além da BIOS corrompida (capacitores estufados, trilhas queimadas) e tem mais de 8 anos.",
    whatsappMessage: "Olá! Meu computador está com erro de BIOS e não inicia corretamente. Podem me ajudar?",
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/pc-com-tela-preta-curitiba", label: "PC com Tela Preta" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC/Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Entendendo a BIOS/UEFI: Guia Completo\n\n### BIOS vs UEFI — Qual a Diferença?\n\n| Característica | BIOS (Legacy) | UEFI |\n|---|---|---|\n| Interface | Texto azul/cinza | Gráfica com mouse |\n| Limite de disco | 2 TB (MBR) | 9.4 ZB (GPT) |\n| Boot seguro | Não | Sim (Secure Boot) |\n| Velocidade de boot | Mais lento | Mais rápido |\n| Ano de adoção | 1981-2012 | 2012+ |\n\n### Beep Codes Comuns (Award BIOS)\n\n| Bipes | Significado |\n|---|---|\n| 1 curto | POST OK — boot normal |\n| 1 longo + 2 curtos | Erro de vídeo (GPU ou RAM de vídeo) |\n| 1 longo + 3 curtos | Erro de teclado ou vídeo |\n| Contínuo | Erro de memória RAM |\n| Nenhum bipe, sem vídeo | Processador ou placa-mãe |\n\n### Como Acessar a BIOS\n\n| Fabricante | Tecla |\n|---|---|\n| ASUS | DEL ou F2 |\n| Gigabyte | DEL |\n| MSI | DEL |\n| Dell | F2 |\n| HP | F10 ou ESC |\n| Lenovo | F1 ou F2 |\n| Acer | F2 ou DEL |\n\n### Quando Atualizar a BIOS?\n\n- ✅ Ao instalar processador novo que exige BIOS mais recente\n- ✅ Para corrigir bug conhecido (instabilidade, compatibilidade)\n- ❌ Se tudo funciona normalmente — "não mexa no que funciona"\n- ❌ Nunca atualize durante tempestade ou sem nobreak`
  },

  // ==================== PC TRAVANDO EM JOGOS ====================
  {
    slug: "pc-travando-em-jogos-curitiba",
    title: "PC Travando em Jogos em Curitiba | Diagnóstico Gamer Profissional",
    metaDescription: "PC travando, engasgando ou dando tela azul em jogos? Técnico gamer em Curitiba diagnostica e resolve problemas de performance, FPS baixo e crashes. Atendimento especializado.",
    h1: "PC Travando em Jogos — Diagnóstico e Otimização Gamer em Curitiba",
    categoria: "Performance — Gaming",
    intro: `Seu PC trava, engasga ou dá tela azul durante jogos? Esse é um dos problemas mais frustrantes para gamers — especialmente quando o computador funciona normalmente para tarefas básicas e só apresenta problemas sob carga pesada de jogos.\n\nTravamentos em jogos podem ter dezenas de causas: desde driver de vídeo desatualizado até RAM com defeito, superaquecimento da GPU, fonte insuficiente ou até mesmo configurações erradas do jogo. Identificar a causa exata exige diagnóstico profissional com ferramentas específicas.\n\nEm Curitiba, atendemos gamers de todas as configurações — desde PCs gamer de entrada até setups high-end. O importante é entender que o hardware precisa trabalhar em harmonia: não adianta ter uma RTX 4070 se a fonte é de 400W ou a pasta térmica da GPU está seca há 4 anos.`,
    sintomas: [
      { titulo: "FPS cai drasticamente durante o jogo", desc: "O jogo começa fluido mas depois de 10-30 minutos o FPS despenca. Forte indicativo de throttling térmico — GPU ou CPU reduzindo velocidade por calor.", gravidade: "Média" },
      { titulo: "Jogo fecha sozinho sem mensagem de erro", desc: "O jogo simplesmente desaparece e volta para a área de trabalho. Pode ser driver de vídeo, RAM defeituosa ou DX/Vulkan instável.", gravidade: "Média-Alta" },
      { titulo: "Tela azul (BSOD) durante jogos", desc: "O Windows dá tela azul com erros como VIDEO_TDR_FAILURE, IRQL_NOT_LESS_OR_EQUAL ou WHEA_UNCORRECTABLE_ERROR. Indica problema sério de hardware ou driver.", gravidade: "Alta" },
      { titulo: "Artefatos visuais (quadrados, linhas coloridas)", desc: "Aparecem blocos coloridos, linhas ou texturas corrompidas durante o jogo. Pode ser GPU superaquecendo, VRAM com defeito ou overclock instável.", gravidade: "Alta" },
      { titulo: "PC desliga completamente durante jogos pesados", desc: "O computador simplesmente apaga como se tivesse puxado o cabo de força. Forte indicativo de fonte de alimentação insuficiente ou defeituosa.", gravidade: "Alta" },
      { titulo: "Engasgos e stuttering constante", desc: "O jogo não é fluido mesmo com FPS alto no contador. Pode ser problema de RAM insuficiente, HDD lento ou CPU bottleneck.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Driver de vídeo desatualizado ou corrompido", desc: "Drivers da NVIDIA/AMD são atualizados frequentemente com otimizações para jogos novos. Driver antigo ou instalação corrompida causa crashes e baixa performance.", tipo: "software" },
      { titulo: "Superaquecimento de GPU ou CPU", desc: "Sob carga de jogos, GPU e CPU atingem temperaturas máximas. Pasta térmica seca, cooler sujo ou gabinete sem ventilação causam throttling e desligamentos.", tipo: "hardware" },
      { titulo: "Fonte de alimentação insuficiente", desc: "Jogos pesados fazem a GPU consumir 200-350W. Se a fonte não aguenta os picos de consumo, o PC desliga instantaneamente.", tipo: "hardware" },
      { titulo: "RAM com defeito ou insuficiente", desc: "8GB já não é suficiente para muitos jogos modernos. RAM com erro intermitente causa crashes aleatórios que só aparecem sob carga pesada.", tipo: "hardware" },
      { titulo: "HD/SSD lento causando stuttering", desc: "Jogos modernos carregam texturas e assets em tempo real. HD mecânico causa engasgos visíveis; SSD SATA pode ser lento para jogos AAA.", tipo: "hardware" },
      { titulo: "Windows ou jogo mal configurado", desc: "Configurações de energia no modo economia, game mode do Windows com bug, overlay de programas (Discord, GeForce Experience) causando conflito.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação limpa de drivers + otimização de Windows + configuração de jogo. Resolve crashes por software.", tempo: "1-2 horas", custo: "R$ 100–200" },
      { nivel: "Médio", desc: "Limpeza térmica completa + troca de pasta térmica + diagnóstico de RAM + otimização geral.", tempo: "2-4 horas", custo: "R$ 200–400" },
      { nivel: "Complexo", desc: "Troca de fonte + upgrade de RAM + diagnóstico completo de GPU com teste de estresse prolongado.", tempo: "1-3 dias", custo: "R$ 400–1200" }
    ],
    riscos: [
      "Ignorar superaquecimento da GPU pode causar dano permanente ao chip gráfico",
      "Fonte subdimensionada pode queimar e levar outros componentes junto (placa-mãe, GPU)",
      "RAM com defeito pode corromper saves de jogos e arquivos do sistema",
      "Overclock instável pode degradar a vida útil do processador e GPU",
      "Drivers beta ou modificados podem causar instabilidade crônica",
      "Ignorar artefatos visuais pode significar GPU em estágio final de vida"
    ],
    diagnostico: `Diagnóstico gamer completo:\n\n1. Monitoramento de temperaturas em tempo real (GPU, CPU, VRM)\n2. Teste de estresse com FurMark (GPU) e Prime95 (CPU) por 30 minutos\n3. Teste de memória RAM com MemTest86 (mínimo 4 passes)\n4. Verificação de fonte com multímetro (voltagens nos trilhos 12V, 5V, 3.3V)\n5. Benchmark comparativo (3DMark) vs resultado esperado para o hardware\n6. Análise de logs de crash do Windows (Event Viewer + BlueScreenView)\n7. Verificação de drivers e conflitos de software\n\nCusto: R$ 100 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Drivers**: DDU (Display Driver Uninstaller) + instalação limpa do driver mais recente estável\n- **Térmico**: Limpeza completa + pasta térmica premium + otimização de curva de fan\n- **Fonte**: Troca por fonte 80 Plus Bronze/Gold com potência adequada ao setup\n- **RAM**: Troca de pente defeituoso + ativação de XMP na BIOS\n- **Storage**: Migração do jogo para SSD NVMe\n- **Software**: Otimização de Windows para gaming + remoção de overlays conflitantes\n\nTeste com os jogos que apresentavam problema por 1+ hora após o reparo.`,
    quandoCompensa: "Quase sempre — a maioria dos problemas de gaming custa R$ 100-400 para resolver. Até troca de fonte (R$ 300-600) é mais barato que um PC novo.",
    quandoNaoCompensa: "Quando o hardware é tão antigo que não atende os requisitos mínimos do jogo (ex: GPU de 10+ anos). Nesse caso, upgrade ou PC novo é o caminho.",
    whatsappMessage: "Olá! Meu PC está travando durante jogos. Podem me ajudar com diagnóstico?",
    relatedPages: [
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/servicos/montagem-pc", label: "Montagem de PC" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD/Memória" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## PC Gamer Travando: Guia Completo de Solução\n\n### Temperaturas Máximas Aceitáveis em Jogos\n\n| Componente | Aceitável | Preocupante | Crítico |\n|---|---|---|---|\n| CPU Intel | < 85°C | 85-95°C | > 95°C |\n| CPU AMD | < 85°C | 85-90°C | > 90°C |\n| GPU NVIDIA | < 83°C | 83-90°C | > 90°C |\n| GPU AMD | < 90°C | 90-100°C | > 100°C |\n\n### Fonte: Quanto de Potência Você Precisa?\n\n| Setup | Potência Mínima | Recomendada |\n|---|---|---|\n| GT 1030 / RX 550 | 300W | 400W |\n| GTX 1660 / RX 5600 | 450W | 550W |\n| RTX 3060 / RX 6700 | 550W | 650W |\n| RTX 4070 / RX 7800 | 650W | 750W |\n| RTX 4080/4090 | 750W | 850-1000W |\n\n### Checklist Rápido de Diagnóstico\n\n1. ✅ Temperatura da GPU durante o jogo (MSI Afterburner)\n2. ✅ Uso de RAM durante o jogo (Gerenciador de Tarefas)\n3. ✅ Driver de vídeo atualizado (GeForce Experience / AMD Software)\n4. ✅ Windows atualizado\n5. ✅ Plano de energia em "Alto Desempenho"\n6. ✅ Jogo instalado no SSD (não no HD)\n7. ✅ Overlays desativados (teste sem Discord/GeForce overlay)`
  },

  // ==================== BACKUP PERDIDO ====================
  {
    slug: "backup-perdido-curitiba",
    title: "Backup Perdido em Curitiba | Recuperação de Dados Especializada",
    metaDescription: "Perdeu backup, arquivos ou fotos importantes? Técnico em Curitiba recupera dados de HD, SSD, pen drive e nuvem. Atendimento emergencial com sigilo total.",
    h1: "Backup Perdido — Recuperação de Dados em Curitiba",
    categoria: "Dados — Recuperação",
    intro: `Perder um backup é uma das situações mais desesperadoras na informática. Fotos de família, documentos de trabalho, projetos acadêmicos, planilhas financeiras — anos de dados podem desaparecer em um instante por falha de hardware, exclusão acidental, ransomware ou corrupção de disco.\n\nA boa notícia é que, na maioria dos casos, os dados ainda existem no disco — mesmo quando você não consegue vê-los. Quando um arquivo é "deletado", o sistema apenas marca o espaço como disponível. Enquanto nada for gravado por cima, a recuperação é possível.\n\nA má notícia é que cada minuto que você continua usando o dispositivo após a perda reduz as chances de recuperação. Por isso, a primeira regra é: PARE DE USAR O DISPOSITIVO IMEDIATAMENTE e procure ajuda profissional.\n\nEm Curitiba, realizamos recuperação de dados com ferramentas profissionais (R-Studio, DMDE, PC-3000) e ambiente controlado para casos de HD com dano físico.`,
    sintomas: [
      { titulo: "Arquivos sumiram sem explicação", desc: "Pastas inteiras ou arquivos específicos desapareceram. Pode ser exclusão acidental, vírus ou corrupção do sistema de arquivos.", gravidade: "Média-Alta" },
      { titulo: "HD externo de backup não é reconhecido", desc: "O HD externo onde você guardava seus backups não aparece mais no computador. Pode ser problema no USB, no controlador do HD ou falha mecânica.", gravidade: "Alta" },
      { titulo: "Mensagem 'Disco precisa ser formatado'", desc: "O Windows pede para formatar o disco. NÃO FORMATE — isso pode sobrescrever dados. O sistema de arquivos está corrompido mas os dados provavelmente estão intactos.", gravidade: "Alta" },
      { titulo: "Fotos e vídeos corrompidos (não abrem)", desc: "Os arquivos existem mas não abrem ou aparecem com erros. Pode ser corrupção parcial do sistema de arquivos ou setores defeituosos no disco.", gravidade: "Média" },
      { titulo: "Ransomware criptografou os arquivos", desc: "Todos os arquivos foram criptografados e há uma mensagem pedindo resgate em bitcoin. NÃO PAGUE — procure ajuda profissional primeiro.", gravidade: "Crítica" },
      { titulo: "Formatou o HD/SSD por engano", desc: "Formatou o disco errado ou reinstalou o Windows no disco com os dados. Recuperação é possível se a formatação foi rápida e pouco foi gravado depois.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Exclusão acidental", desc: "Deletou arquivos da lixeira, formatou pen drive sem querer ou apagou partição errada. É a causa mais comum e geralmente tem alta taxa de recuperação.", tipo: "erro-humano" },
      { titulo: "Falha de HD mecânico", desc: "HDs mecânicos têm partes móveis que desgastam com o tempo. Setores defeituosos, cabeça de leitura danificada ou motor travado causam perda de acesso aos dados.", tipo: "desgaste" },
      { titulo: "Ransomware ou vírus destrutivo", desc: "Malware que criptografa ou destrói arquivos intencionalmente. Ransomware cobra resgate; vírus destrutivos simplesmente apagam dados sem aviso.", tipo: "software" },
      { titulo: "Queda de energia durante gravação", desc: "Corte de luz enquanto o sistema gravava dados pode corromper o sistema de arquivos inteiro (FAT32, NTFS, ext4). Comum em Curitiba durante tempestades.", tipo: "hardware" },
      { titulo: "Backup em mídia única sem redundância", desc: "Confiar em um único HD externo, pen drive ou mesmo nuvem sem cópia secundária. Qualquer falha na mídia única significa perda total.", tipo: "erro-humano" },
      { titulo: "SSD com falha no controlador", desc: "SSDs não fazem barulho quando falham — simplesmente param de funcionar. O controlador pode pifar sem aviso, tornando todos os dados inacessíveis.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Recuperação de arquivos deletados ou de pen drive formatado. Software profissional em disco saudável.", tempo: "2-6 horas", custo: "R$ 150–350" },
      { nivel: "Médio", desc: "Recuperação de HD/SSD com corrupção lógica, sistema de arquivos danificado ou formatação acidental.", tempo: "1-3 dias", custo: "R$ 300–800" },
      { nivel: "Complexo", desc: "Recuperação de HD com dano físico (clique, não gira) ou SSD com controlador queimado. Pode exigir câmara limpa.", tempo: "5-15 dias", custo: "R$ 800–3000+" }
    ],
    riscos: [
      "Continuar usando o dispositivo após perda de dados reduz drasticamente as chances de recuperação",
      "Formatar o disco 'para ver se resolve' sobrescreve os dados permanentemente",
      "Softwares gratuitos de recuperação podem piorar a situação se usados incorretamente",
      "Abrir um HD mecânico fora de ambiente limpo contamina os pratos com poeira e destrói dados",
      "Pagar resgate de ransomware não garante recuperação e financia criminosos",
      "Tentar recuperar dados de SSD com TRIM ativado pode ser impossível — o controlador já apagou os blocos"
    ],
    diagnostico: `Diagnóstico de recuperação de dados:\n\n1. Avaliação do dispositivo (HD, SSD, pen drive, cartão SD)\n2. Verificação de saúde do disco (SMART, setores defeituosos)\n3. Clone bit-a-bit do disco original (para trabalhar na cópia, protegendo o original)\n4. Análise do sistema de arquivos (NTFS, FAT32, ext4, APFS)\n5. Scan profundo com ferramentas profissionais (R-Studio, DMDE)\n6. Listagem de arquivos recuperáveis com prévia\n7. Orçamento baseado na complexidade e volume de dados\n\nCusto do diagnóstico: R$ 100 (incorporado se aprovar a recuperação).`,
    solucao: `Solução conforme o cenário:\n\n- **Exclusão acidental**: Scan profundo + recuperação com R-Studio ou PhotoRec\n- **Corrupção lógica**: Reparo de tabela de partição + reconstrução de sistema de arquivos\n- **HD com dano físico**: Clone em ambiente controlado + recuperação da imagem\n- **Ransomware**: Verificação de chave de descriptografia conhecida + recuperação de shadow copies\n- **SSD**: Recuperação via modo de manutenção do controlador (quando possível)\n\nTodos os dados recuperados são entregues em mídia nova (HD externo ou SSD) com verificação de integridade.\n\nAdicional: montamos estratégia de backup 3-2-1 para evitar futuras perdas.`,
    quandoCompensa: "Sempre que os dados têm valor sentimental ou profissional insubstituível. Fotos de família, documentos únicos e projetos acadêmicos não têm preço.",
    quandoNaoCompensa: "Quando os dados podem ser baixados novamente (jogos, programas, músicas compradas) ou quando o custo de recuperação excede o valor comercial dos dados.",
    whatsappMessage: "Olá! Perdi dados importantes e preciso de recuperação. Podem me ajudar urgentemente?",
    relatedPages: [
      { to: "/servicos/backup-recuperacao", label: "Backup e Recuperação" },
      { to: "/hd-fazendo-barulho-curitiba", label: "HD Fazendo Barulho" },
      { to: "/erro-disco-cheio-curitiba", label: "Disco Cheio" },
      { to: "/virus-ransomware-curitiba", label: "Vírus e Ransomware" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Recuperação de Dados: Guia Completo\n\n### Regra 3-2-1 de Backup\n\n- **3** cópias dos seus dados\n- **2** tipos de mídia diferentes (ex: SSD + nuvem)\n- **1** cópia em local físico diferente (nuvem ou HD na casa de familiar)\n\n### O Que Fazer Imediatamente Após Perder Dados\n\n1. 🛑 **PARE** de usar o dispositivo imediatamente\n2. ❌ **NÃO** instale software de recuperação no mesmo disco\n3. ❌ **NÃO** formate o disco "para ver se resolve"\n4. ❌ **NÃO** abra HD mecânico em casa\n5. ✅ **DESLIGUE** o computador se o HD estiver fazendo cliques\n6. ✅ **PROCURE** ajuda profissional o mais rápido possível\n\n### Chances de Recuperação por Cenário\n\n| Cenário | Chance de Sucesso |\n|---|---|\n| Deletou da lixeira (sem uso após) | 90-95% |\n| Formatação rápida (sem uso após) | 80-90% |\n| Formatação completa | 40-70% |\n| HD com cliques/não reconhece | 60-80% (com câmara limpa) |\n| SSD com TRIM (após 24h) | 10-30% |\n| Ransomware (sem chave) | 30-60% (shadow copies) |\n| Dano por água/fogo | 20-50% |\n\n### Soluções de Backup Recomendadas\n\n| Solução | Custo Mensal | Espaço | Facilidade |\n|---|---|---|---|\n| Google Drive | Grátis-R$ 35 | 15GB-2TB | Muito fácil |\n| OneDrive | Grátis-R$ 45 | 5GB-1TB | Fácil (integrado ao Windows) |\n| HD Externo 1TB | R$ 0 (compra R$ 250) | 1TB | Médio |\n| NAS Synology | R$ 0 (compra R$ 1500+) | 2TB+ | Avançado |\n| Backblaze | ~R$ 35/mês | Ilimitado | Fácil |`
  },

];

// Helper to get a page by slug
export const getProblemaPageBySlug = (slug: string): ProblemaPageData | undefined => {
  return problemaPagesData.find(p => p.slug === slug);
};

// Get all slugs for routing
export const getAllProblemaSlugs = (): string[] => {
  return problemaPagesData.map(p => p.slug);
};
