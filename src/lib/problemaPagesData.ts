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

  // ==================== NOTEBOOK NÃO CONECTA BLUETOOTH ====================
  {
    slug: "notebook-nao-conecta-bluetooth-curitiba",
    title: "Notebook Não Conecta Bluetooth em Curitiba | Técnico Especialista",
    metaDescription: "Bluetooth do notebook não funciona, não pareia ou não aparece? Técnico em Curitiba resolve problemas de Bluetooth com diagnóstico rápido. Atendimento profissional.",
    h1: "Notebook Não Conecta Bluetooth — Diagnóstico e Reparo em Curitiba",
    categoria: "Conectividade — Bluetooth",
    intro: `O Bluetooth do notebook parou de funcionar, não encontra dispositivos ou sumiu das configurações? Esse problema é cada vez mais impactante com a popularização de fones sem fio, mouses Bluetooth, teclados e caixas de som wireless.\n\nAs causas vão desde um simples driver desatualizado até falha no módulo Wi-Fi/Bluetooth (que geralmente é um chip combo). Em notebooks, o módulo Bluetooth compartilha a mesma placa do Wi-Fi — se um funciona e o outro não, geralmente é problema de software ou antena.\n\nEm Curitiba, atendemos muitos casos onde uma atualização do Windows desabilitou o Bluetooth ou corrompeu o driver. Também é comum o Bluetooth "sumir" após reinstalação do sistema sem os drivers corretos do fabricante.`,
    sintomas: [
      { titulo: "Ícone do Bluetooth sumiu da barra de tarefas", desc: "O Bluetooth desapareceu completamente das configurações e da bandeja do sistema. Pode ser driver removido, serviço desabilitado ou módulo desativado na BIOS.", gravidade: "Média" },
      { titulo: "Bluetooth não encontra nenhum dispositivo", desc: "A busca roda mas nunca encontra fones, mouses ou outros dispositivos. Pode ser problema de antena, driver ou modo avião ativado parcialmente.", gravidade: "Média" },
      { titulo: "Dispositivo pareia mas desconecta constantemente", desc: "O fone ou mouse conecta por alguns segundos e depois cai. Indica interferência, driver instável ou perfil Bluetooth incompatível.", gravidade: "Média" },
      { titulo: "Áudio Bluetooth com atraso ou falhas", desc: "O som pelo fone Bluetooth chega com delay, engasga ou tem qualidade muito baixa. Pode ser codec inadequado (SBC vs AAC/aptX) ou interferência.", gravidade: "Baixa-Média" },
      { titulo: "Erro 'Dispositivo Bluetooth desconhecido' no Gerenciador", desc: "O Windows mostra o módulo Bluetooth com triângulo amarelo no Gerenciador de Dispositivos. Driver ausente ou corrompido.", gravidade: "Média" },
      { titulo: "Bluetooth funciona apenas após reiniciar", desc: "O Bluetooth para de funcionar após o notebook sair do modo de suspensão (sleep). Bug comum de gerenciamento de energia do Windows.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Driver Bluetooth corrompido ou desatualizado", desc: "Windows Update pode instalar driver genérico que não funciona bem com o módulo específico do notebook. O driver do fabricante é essencial.", tipo: "software" },
      { titulo: "Serviço Bluetooth desabilitado no Windows", desc: "O serviço 'Bluetooth Support Service' pode estar parado ou desabilitado. Sem ele, nenhuma funcionalidade Bluetooth opera.", tipo: "software" },
      { titulo: "Módulo Wi-Fi/Bluetooth com defeito", desc: "O chip combo Intel/Realtek/Qualcomm pode falhar parcialmente — Wi-Fi funciona mas Bluetooth não, ou vice-versa.", tipo: "hardware" },
      { titulo: "Antena interna desconectada", desc: "Os cabos de antena que vão do módulo até a tampa do notebook podem se soltar após manutenção ou impacto. Sem antena, o sinal é praticamente zero.", tipo: "hardware" },
      { titulo: "Configuração de energia desligando o módulo", desc: "O Windows pode desligar o Bluetooth para economizar energia durante suspensão e não religar ao acordar. Configuração em Gerenciador de Dispositivos.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação de driver correto do fabricante + reconfiguração de serviços. Resolve 60% dos casos.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Troca do módulo Wi-Fi/Bluetooth interno (chip M.2) por modelo compatível.", tempo: "1-2 horas", custo: "R$ 150–300" },
      { nivel: "Complexo", desc: "Reparo de conector de antena + troca de módulo + reconfiguração completa de drivers.", tempo: "2-4 horas", custo: "R$ 250–450" }
    ],
    riscos: [
      "Instalar driver Bluetooth de fonte não oficial pode trazer malware",
      "Desabilitar serviços do Windows sem conhecimento pode afetar outras funcionalidades",
      "Trocar módulo Wi-Fi/Bluetooth por modelo incompatível pode causar problemas de Wi-Fi também",
      "Forçar pareamento com dispositivos incompatíveis pode travar o sistema Bluetooth",
      "Mexer nas antenas internas sem experiência pode danificar os conectores frágeis"
    ],
    diagnostico: `Diagnóstico de Bluetooth:\n\n1. Verificação do módulo no Gerenciador de Dispositivos\n2. Teste de serviço Bluetooth Support Service\n3. Verificação de driver (versão, fabricante, compatibilidade)\n4. Teste com adaptador USB Bluetooth externo (para isolar hardware)\n5. Verificação de antena interna (conexão, integridade)\n6. Teste de pareamento com múltiplos dispositivos\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Driver**: Remoção completa do driver atual + instalação do driver oficial do fabricante\n- **Serviço**: Reativação e configuração do Bluetooth Support Service para início automático\n- **Módulo**: Troca do chip M.2 Wi-Fi/Bluetooth por modelo compatível (Intel AX200/AX210)\n- **Antena**: Reconexão dos cabos de antena internos + teste de sinal\n- **Energia**: Desabilitar gerenciamento de energia do módulo Bluetooth\n\nTeste completo de pareamento e estabilidade de conexão após o reparo.`,
    quandoCompensa: "Sempre — resolver Bluetooth custa R$ 80-300 e é essencial para uso de periféricos sem fio modernos. Até troca de módulo é barata.",
    quandoNaoCompensa: "Quando o notebook é tão antigo que só suporta Bluetooth 2.0 e o adaptador USB 5.0 por R$ 30 resolve melhor.",
    whatsappMessage: "Olá! O Bluetooth do meu notebook não está funcionando. Podem me ajudar?",
    relatedPages: [
      { to: "/pc-nao-conecta-wifi-curitiba", label: "PC Não Conecta Wi-Fi" },
      { to: "/teclado-nao-funciona-curitiba", label: "Teclado Não Funciona" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Bluetooth no Notebook: Guia Completo\n\n### Versões de Bluetooth e Compatibilidade\n\n| Versão | Alcance | Velocidade | Áudio | Dispositivos simultâneos |\n|---|---|---|---|---|\n| BT 4.0 | 50m | 1 Mbps | SBC | 3 |\n| BT 4.2 | 50m | 1 Mbps | SBC | 5 |\n| BT 5.0 | 200m | 2 Mbps | SBC/AAC | 7 |\n| BT 5.2 | 200m | 2 Mbps | LC3 (LE Audio) | 10+ |\n| BT 5.3 | 200m | 2 Mbps | LC3 | 10+ |\n\n### Como Verificar se o Bluetooth Está Funcionando\n\n1. **Win+I** → Dispositivos → Bluetooth → Deve estar "Ativado"\n2. **Gerenciador de Dispositivos** → Bluetooth → Sem triângulo amarelo\n3. **services.msc** → Bluetooth Support Service → Status: Em execução\n\n### Solução Rápida: Reset do Bluetooth\n\n1. Abra **Gerenciador de Dispositivos**\n2. Expanda **Bluetooth**\n3. Clique com botão direito no módulo → **Desinstalar dispositivo**\n4. Marque "Excluir driver" → OK\n5. Reinicie o notebook\n6. O Windows reinstalará o driver automaticamente`
  },

  // ==================== ERRO DE DRIVER WINDOWS ====================
  {
    slug: "erro-driver-windows-curitiba",
    title: "Erro de Driver no Windows em Curitiba | Diagnóstico e Correção",
    metaDescription: "Erro de driver no Windows? Tela azul, dispositivo não reconhecido, hardware sem funcionar? Técnico em Curitiba resolve problemas de drivers com diagnóstico profissional.",
    h1: "Erro de Driver no Windows — Diagnóstico e Correção em Curitiba",
    categoria: "Software — Drivers",
    intro: `Drivers são os "tradutores" entre o hardware do seu computador e o sistema operacional. Quando um driver está ausente, corrompido, desatualizado ou incompatível, o resultado pode ir desde um dispositivo que não funciona até telas azuis constantes e instabilidade total do sistema.\n\nO Windows Update tenta instalar drivers automaticamente, mas frequentemente instala versões genéricas que não funcionam corretamente — especialmente para placas de vídeo, Wi-Fi, áudio e impressoras. Cada fabricante (Intel, NVIDIA, AMD, Realtek) tem drivers específicos otimizados para seus produtos.\n\nEm Curitiba, o problema mais comum que vemos é após formatação ou reinstalação do Windows: o técnico anterior instalou o sistema mas não colocou os drivers corretos, deixando dispositivos sem funcionar. Outro cenário frequente é o Windows Update forçar uma atualização de driver que causa conflito.`,
    sintomas: [
      { titulo: "Triângulo amarelo no Gerenciador de Dispositivos", desc: "Um ou mais dispositivos aparecem com ícone de alerta amarelo, indicando driver ausente, corrompido ou com conflito.", gravidade: "Média" },
      { titulo: "Tela azul (BSOD) com erro de driver", desc: "Erros como DRIVER_IRQL_NOT_LESS_OR_EQUAL, SYSTEM_SERVICE_EXCEPTION ou VIDEO_TDR_FAILURE indicam driver problemático.", gravidade: "Alta" },
      { titulo: "Dispositivo 'desconhecido' após formatação", desc: "Após reinstalar o Windows, vários dispositivos aparecem como 'Dispositivo Desconhecido' — sem áudio, sem rede, sem vídeo correto.", gravidade: "Média" },
      { titulo: "Áudio não funciona após atualização", desc: "O Windows Update instalou driver de áudio genérico que não funciona com o chip Realtek/Conexant do seu notebook.", gravidade: "Média" },
      { titulo: "Impressora ou scanner não é reconhecido", desc: "O dispositivo USB é detectado mas não funciona. Drivers específicos do fabricante (HP, Epson, Canon, Brother) são necessários.", gravidade: "Baixa-Média" },
      { titulo: "Performance de vídeo muito baixa", desc: "Jogos ou vídeos rodam com lentidão extrema. O Windows está usando driver genérico 'Microsoft Basic Display Adapter' em vez do driver NVIDIA/AMD/Intel.", gravidade: "Média-Alta" }
    ],
    causas: [
      { titulo: "Windows Update instalou driver incompatível", desc: "O Windows força atualizações de driver que podem ser versões genéricas ou beta instáveis. Muito comum com drivers de vídeo e áudio.", tipo: "software" },
      { titulo: "Formatação sem instalação de drivers", desc: "Reinstalar o Windows remove todos os drivers. Sem instalar os drivers do fabricante, muitos dispositivos ficam sem funcionar.", tipo: "erro-humano" },
      { titulo: "Driver corrompido por queda de energia", desc: "Picos elétricos ou desligamentos abruptos podem corromper arquivos de driver no disco, causando erro na inicialização do dispositivo.", tipo: "hardware" },
      { titulo: "Conflito entre drivers", desc: "Dois drivers tentando controlar o mesmo dispositivo (ex: driver antigo + driver novo instalado por cima) causam instabilidade e telas azuis.", tipo: "software" },
      { titulo: "Hardware novo sem driver disponível", desc: "Periféricos muito novos ou muito antigos podem não ter driver compatível com a versão atual do Windows.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Identificação e instalação do driver correto do fabricante. Resolve triângulos amarelos e dispositivos não reconhecidos.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Remoção de drivers conflitantes + instalação limpa + bloqueio de Windows Update para drivers específicos.", tempo: "1-3 horas", custo: "R$ 150–300" },
      { nivel: "Complexo", desc: "Diagnóstico de telas azuis causadas por driver + reparo de sistema + reinstalação completa de drivers.", tempo: "2-5 horas", custo: "R$ 250–450" }
    ],
    riscos: [
      "Instalar drivers de sites não oficiais pode trazer vírus e malware junto",
      "Programas 'atualizadores de driver automáticos' geralmente são scam ou instalam versões erradas",
      "Forçar driver incompatível pode causar tela azul permanente (boot loop)",
      "Desinstalar driver errado pode deixar o sistema sem rede, vídeo ou áudio",
      "Ignorar erros de driver pode causar instabilidade progressiva e perda de dados",
      "Reverter driver de chipset pode impedir o Windows de iniciar"
    ],
    diagnostico: `Diagnóstico de drivers:\n\n1. Varredura completa do Gerenciador de Dispositivos\n2. Identificação de hardware via IDs de dispositivo (VEN/DEV)\n3. Verificação de versão de cada driver crítico (vídeo, áudio, rede, chipset)\n4. Análise de logs de tela azul (BlueScreenView + WinDbg)\n5. Teste de estabilidade com drivers limpos\n6. Verificação de conflitos entre drivers\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução completa:\n\n- **Identificação**: Uso de ferramentas profissionais para identificar todo hardware e drivers necessários\n- **Remoção**: Desinstalação limpa de drivers problemáticos (DDU para vídeo, DriverStoreExplorer para outros)\n- **Instalação**: Download e instalação de drivers oficiais do fabricante do notebook/placa-mãe\n- **Bloqueio**: Configuração do Windows Update para não sobrescrever drivers específicos\n- **Teste**: Verificação de funcionamento de todos os dispositivos e estabilidade do sistema\n\nDocumentação entregue com lista de drivers instalados e fontes oficiais para futuras atualizações.`,
    quandoCompensa: "Sempre — resolver problemas de driver custa R$ 80-300 e restaura toda a funcionalidade do hardware. É essencial após qualquer formatação.",
    quandoNaoCompensa: "Quando o hardware é tão antigo que o fabricante nunca lançou driver para Windows 10/11 e não existe driver genérico funcional.",
    whatsappMessage: "Olá! Meu computador está com erro de driver e dispositivos não funcionam. Podem me ajudar?",
    relatedPages: [
      { to: "/erro-tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/som-nao-funciona-curitiba", label: "Som Não Funciona" },
      { to: "/pc-nao-conecta-wifi-curitiba", label: "PC Não Conecta Wi-Fi" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Drivers do Windows: Guia Completo\n\n### Drivers Essenciais Após Formatação\n\n| Prioridade | Driver | Por quê |\n|---|---|---|\n| 1º | Chipset (Intel/AMD) | Base para todos os outros drivers |\n| 2º | Rede (Ethernet/Wi-Fi) | Para baixar outros drivers |\n| 3º | Vídeo (NVIDIA/AMD/Intel) | Performance gráfica |\n| 4º | Áudio (Realtek/Conexant) | Som do sistema |\n| 5º | Bluetooth | Periféricos sem fio |\n| 6º | Touchpad (Synaptics/ELAN) | Gestos e funcionalidades |\n\n### Onde Baixar Drivers Seguros\n\n- **Intel**: intel.com/support\n- **NVIDIA**: nvidia.com.br/drivers\n- **AMD**: amd.com/support\n- **Realtek**: realtek.com/downloads\n- **Fabricante do notebook**: support.dell.com, support.lenovo.com, etc.\n\n⚠️ **NUNCA** use sites como "driverpack", "driverbooster" ou "driverupdate" — são fontes de malware.\n\n### Como Identificar Hardware Desconhecido\n\n1. Abra o **Gerenciador de Dispositivos**\n2. Clique com botão direito no dispositivo desconhecido → **Propriedades**\n3. Aba **Detalhes** → Propriedade: **IDs de Hardware**\n4. Copie o valor (ex: PCI\\VEN_8086&DEV_A370)\n5. Pesquise no Google: "VEN_8086 DEV_A370 driver"\n6. Baixe do site oficial do fabricante`
  },

  // ==================== PC SEM IMAGEM ====================
  {
    slug: "pc-sem-imagem-curitiba",
    title: "PC Sem Imagem no Monitor em Curitiba | Diagnóstico Especializado",
    metaDescription: "PC liga mas não aparece imagem no monitor? Técnico em Curitiba diagnostica e resolve problemas de vídeo, GPU, cabo e placa-mãe. Atendimento rápido.",
    h1: "PC Sem Imagem no Monitor — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Vídeo",
    intro: `O computador liga, os LEDs acendem, a ventoinha gira, mas o monitor fica preto sem nenhuma imagem? Esse é um dos problemas mais comuns e ao mesmo tempo mais difíceis de diagnosticar sem experiência, porque a causa pode estar em qualquer ponto da cadeia: monitor, cabo, placa de vídeo, memória RAM, processador ou placa-mãe.\n\nA primeira coisa a entender é: "sem imagem" é diferente de "tela preta com cursor". Se o monitor mostra "sem sinal" ou fica completamente apagado, o problema está antes do sistema operacional — é hardware. Se aparece o logo do Windows e depois fica preto, geralmente é software.\n\nEm Curitiba, atendemos esse problema diariamente. Na maioria dos casos, a causa é simples: cabo HDMI/VGA solto, RAM mal encaixada ou monitor na entrada errada. Mas também pode indicar GPU queimada ou placa-mãe com defeito, especialmente após quedas de energia.`,
    sintomas: [
      { titulo: "Monitor mostra 'Sem Sinal' (No Signal)", desc: "O monitor está funcionando mas não recebe sinal de vídeo do computador. Pode ser cabo, entrada errada, GPU ou RAM.", gravidade: "Média" },
      { titulo: "PC liga mas monitor fica totalmente preto", desc: "Ventoinhas giram, LEDs acendem, mas nenhuma imagem aparece. O monitor pode estar desligado, em standby ou sem receber sinal.", gravidade: "Média-Alta" },
      { titulo: "Imagem aparece por segundos e some", desc: "A imagem pisca brevemente durante o boot e depois desaparece. Pode indicar GPU com mau contato ou superaquecimento.", gravidade: "Alta" },
      { titulo: "Bipes ao ligar sem imagem", desc: "O PC emite sequência de bipes ao ligar e não mostra imagem. Os bipes indicam o tipo de erro — geralmente RAM ou GPU.", gravidade: "Média-Alta" },
      { titulo: "Monitor funciona em outro PC", desc: "Testou o monitor em outro computador e funciona. O problema está no PC — GPU, cabo, RAM ou placa-mãe.", gravidade: "Média" },
      { titulo: "Ventoinhas giram forte mas sem imagem", desc: "O cooler da GPU gira no máximo e não há imagem. Indica que o POST não completa — o sistema trava antes de inicializar vídeo.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Cabo de vídeo solto ou defeituoso", desc: "Cabos HDMI, DisplayPort e VGA podem ter mau contato ou fio rompido internamente. É a causa mais simples e a primeira a verificar.", tipo: "hardware" },
      { titulo: "Memória RAM mal encaixada ou com defeito", desc: "RAM fora do slot ou com oxidação nos contatos impede o POST. Sem completar o POST, não há sinal de vídeo. Solução: reencaixar ou limpar contatos.", tipo: "hardware" },
      { titulo: "Placa de vídeo com defeito", desc: "GPU queimada, com solda BGA trincada ou superaquecimento. Pode falhar gradualmente (artefatos) ou de repente (sem imagem total).", tipo: "hardware" },
      { titulo: "Saída de vídeo errada selecionada", desc: "PC com vídeo integrado e placa dedicada — o cabo pode estar na saída errada. Ao instalar GPU, o vídeo integrado geralmente é desabilitado.", tipo: "erro-humano" },
      { titulo: "Placa-mãe com defeito no slot PCIe ou VRM", desc: "Problemas no slot da placa de vídeo ou nos reguladores de tensão da placa-mãe impedem a GPU de funcionar.", tipo: "hardware" },
      { titulo: "Processador sem vídeo integrado", desc: "CPUs como Ryzen sem 'G' (ex: Ryzen 5 5600) não têm vídeo integrado. Sem GPU dedicada, não há saída de vídeo.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Troca de cabo, reencaixe de RAM ou ajuste de saída de vídeo. Resolve 50% dos casos.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Diagnóstico de GPU + teste com outra placa + limpeza de contatos oxidados.", tempo: "1-3 horas", custo: "R$ 150–300" },
      { nivel: "Complexo", desc: "Troca de placa de vídeo ou reparo de placa-mãe (slot PCIe, VRM). Pode exigir peça nova.", tempo: "1-5 dias", custo: "R$ 300–1500+" }
    ],
    riscos: [
      "Forçar cabo em entrada errada pode danificar os conectores",
      "Ignorar bipes de erro e continuar ligando pode piorar danos na placa-mãe",
      "Usar GPU em slot PCIe com defeito pode queimar a placa de vídeo nova",
      "Tentar reballing caseiro de GPU com secador/forno causa mais dano",
      "Comprar GPU nova sem diagnosticar pode ser desperdício se o problema é na placa-mãe",
      "Desmontar notebook sem experiência pode romper cabos flat do display"
    ],
    diagnostico: `Diagnóstico de vídeo completo:\n\n1. Teste com outro cabo (HDMI, DP, VGA)\n2. Teste com outro monitor/TV\n3. Verificação de RAM (reencaixe, teste individual de cada pente)\n4. Teste de POST (beep codes)\n5. Teste com GPU alternativa\n6. Teste de vídeo integrado (remover GPU dedicada)\n7. Verificação de fonte (voltagem nos trilhos PCIe)\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Cabo**: Troca por cabo novo de qualidade certificada\n- **RAM**: Limpeza dos contatos com borracha + reencaixe firme\n- **GPU**: Troca da placa de vídeo ou reparo de solda BGA profissional\n- **Saída errada**: Redirecionamento do cabo para a saída correta + configuração de BIOS\n- **Placa-mãe**: Reparo do slot PCIe ou VRM (quando viável) ou troca\n\nTeste completo com monitor e resolução nativa após o reparo.`,
    quandoCompensa: "Na maioria dos casos — problemas simples (cabo, RAM) custam R$ 80-150. Mesmo troca de GPU vale se o restante do PC é bom.",
    quandoNaoCompensa: "Quando a placa-mãe e GPU precisam de troca e o PC tem mais de 8 anos — o custo de peças supera o valor de um PC usado equivalente.",
    whatsappMessage: "Olá! Meu PC liga mas não aparece imagem no monitor. Podem me ajudar?",
    relatedPages: [
      { to: "/monitor-sem-sinal-curitiba", label: "Monitor Sem Sinal" },
      { to: "/pc-com-tela-preta-curitiba", label: "PC com Tela Preta" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/erro-bios-curitiba", label: "Erro de BIOS" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## PC Sem Imagem: Guia Completo de Diagnóstico\n\n### Fluxograma de Diagnóstico Rápido\n\n1. Monitor liga? → Se não, verifique cabo de força e botão do monitor\n2. Monitor mostra "sem sinal"? → Troque o cabo HDMI/DP\n3. PC emite bipes? → Consulte tabela de beep codes\n4. Tem GPU dedicada? → Teste na saída de vídeo integrada\n5. Reencaixe a RAM → Resolve 30% dos casos\n\n### Tipos de Cabo de Vídeo\n\n| Cabo | Resolução Máx | Áudio | Observação |\n|---|---|---|---|\n| VGA | 1920x1080 | Não | Analógico, evite |\n| DVI-D | 2560x1600 | Não | Digital, bom |\n| HDMI 2.0 | 4K 60Hz | Sim | Mais comum |\n| HDMI 2.1 | 4K 120Hz | Sim | Para gaming |\n| DisplayPort 1.4 | 4K 120Hz | Sim | Melhor para PC |\n\n### Beep Codes Relacionados a Vídeo\n\n| Fabricante | Padrão | Significado |\n|---|---|---|\n| Award | 1 longo + 2 curtos | Erro de GPU/vídeo |\n| AMI | 8 curtos | Erro de memória de vídeo |\n| Intel | 2 curtos | Erro de vídeo |\n| Phoenix | 1-2-2-3 | Verificação de ROM de vídeo falhou |`
  },

  // ==================== MEMÓRIA RAM COM DEFEITO ====================
  {
    slug: "memoria-ram-com-defeito-curitiba",
    title: "Memória RAM com Defeito em Curitiba | Diagnóstico e Troca",
    metaDescription: "Memória RAM com defeito? PC travando, tela azul ou reiniciando? Técnico em Curitiba diagnostica e troca RAM com teste MemTest86. Atendimento profissional.",
    h1: "Memória RAM com Defeito — Diagnóstico e Troca em Curitiba",
    categoria: "Hardware — Memória",
    intro: `A memória RAM é o componente mais traiçoeiro quando apresenta defeito. Diferente de um HD que para de funcionar de vez ou uma GPU que mostra artefatos claros, RAM defeituosa causa problemas intermitentes e aparentemente aleatórios: telas azuis esporádicas, travamentos que somem após reiniciar, programas que crasham sem motivo e erros de corrupção de dados.\n\nO diagnóstico é especialmente difícil porque os sintomas imitam outros problemas — parece vírus, parece driver, parece superaquecimento. Muitos técnicos inexperientes formatam o computador ou trocam o HD sem nunca testar a RAM, e o cliente volta com o mesmo problema semanas depois.\n\nEm Curitiba, usamos MemTest86 com mínimo de 4 passes completos (2-4 horas de teste) para garantir detecção de erros intermitentes. Também testamos cada pente individualmente em cada slot para identificar se o defeito é no módulo de RAM ou no slot da placa-mãe.`,
    sintomas: [
      { titulo: "Telas azuis aleatórias com códigos variados", desc: "BSODs como MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL, PAGE_FAULT_IN_NONPAGED_AREA. Diferentes erros em momentos diferentes = forte sinal de RAM.", gravidade: "Alta" },
      { titulo: "PC reinicia sozinho sem tela azul", desc: "O computador reinicia abruptamente sem mensagem de erro. Pode ser RAM com erro que causa crash tão severo que o Windows nem grava o BSOD.", gravidade: "Alta" },
      { titulo: "Programas fecham com 'erro de memória'", desc: "Aplicativos mostram mensagens como 'A instrução em 0x... referenciou memória em 0x...' ou simplesmente fecham sem aviso.", gravidade: "Média-Alta" },
      { titulo: "Lentidão extrema mesmo com pouco uso", desc: "O PC fica muito lento mesmo com poucas janelas abertas. Pode indicar que o Windows está evitando setores defeituosos da RAM, usando menos memória.", gravidade: "Média" },
      { titulo: "PC não liga ou dá bipes ao ligar", desc: "Bipes contínuos ou sequência de bipes ao ligar sem imagem. RAM não detectada ou completamente defeituosa.", gravidade: "Alta" },
      { titulo: "Arquivos corrompidos aleatoriamente", desc: "Documentos, fotos ou programas ficam corrompidos sem motivo. A RAM defeituosa altera bits durante a gravação no disco.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Defeito de fabricação ou desgaste", desc: "Módulos de RAM podem ter defeito de fábrica que só se manifesta com o tempo, ou desgastar após anos de uso intenso (calor, ciclos de energia).", tipo: "desgaste" },
      { titulo: "Pico de tensão elétrica", desc: "Raios, picos na rede elétrica ou fontes de alimentação instáveis podem danificar chips de memória instantaneamente.", tipo: "hardware" },
      { titulo: "Contatos oxidados", desc: "Os contatos dourados do pente de RAM oxidam com o tempo, especialmente em ambientes úmidos. Causa mau contato intermitente.", tipo: "desgaste" },
      { titulo: "Overclock ou XMP instável", desc: "Perfil XMP ativado na BIOS pode exigir mais do que os módulos suportam. Funciona em testes curtos mas falha sob carga prolongada.", tipo: "erro-humano" },
      { titulo: "Incompatibilidade entre módulos", desc: "Misturar pentes de marcas, velocidades ou timings diferentes pode causar instabilidade. A placa-mãe opera na velocidade do mais lento.", tipo: "erro-humano" },
      { titulo: "Slot de RAM da placa-mãe com defeito", desc: "O problema pode não ser no pente mas no slot. Trilha solta, sujeira no conector ou dano físico no encaixe.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de contatos + reencaixe + teste MemTest86. Resolve quando o problema é oxidação ou mau contato.", tempo: "2-4 horas", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Troca de pente defeituoso por módulo novo compatível + configuração de XMP/timings na BIOS.", tempo: "1-2 horas", custo: "R$ 150–400" },
      { nivel: "Complexo", desc: "Diagnóstico de slot de placa-mãe + troca de RAM + teste extensivo de estabilidade (8h+).", tempo: "1-2 dias", custo: "R$ 300–600" }
    ],
    riscos: [
      "RAM defeituosa pode corromper dados no HD/SSD silenciosamente por semanas antes de ser detectada",
      "Formatar o PC sem testar RAM faz o cliente voltar com o mesmo problema",
      "Comprar RAM incompatível pode causar instabilidade igual ou pior",
      "Misturar pentes de velocidades diferentes causa degradação de performance",
      "Ignorar o problema pode danificar o sistema de arquivos e causar perda de dados",
      "Overclock de RAM sem conhecimento pode degradar a vida útil dos módulos"
    ],
    diagnostico: `Diagnóstico completo de memória RAM:\n\n1. Identificação dos módulos instalados (marca, velocidade, timings)\n2. Teste individual de cada pente com MemTest86 (mínimo 4 passes = ~2h por pente)\n3. Teste de cada slot da placa-mãe com pente sabidamente bom\n4. Verificação de configuração de XMP/DOCP na BIOS\n5. Teste de estabilidade sob carga (Prime95 modo Large FFTs)\n6. Verificação visual de contatos (oxidação, sujeira, dano)\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme o diagnóstico:\n\n- **Oxidação**: Limpeza dos contatos com borracha branca + álcool isopropílico\n- **Pente defeituoso**: Troca por módulo novo compatível (mesma velocidade e timings)\n- **Incompatibilidade**: Substituição de todos os módulos por kit pareado (dual channel)\n- **XMP instável**: Ajuste manual de frequência e timings na BIOS\n- **Slot defeituoso**: Uso de slots alternativos ou reparo da placa-mãe\n\nTeste MemTest86 completo (8+ passes) após a troca para garantir zero erros.`,
    quandoCompensa: "Quase sempre — troca de RAM custa R$ 150-400 e pode dar anos de vida estável ao PC. É um dos upgrades com melhor custo-benefício.",
    quandoNaoCompensa: "Quando a placa-mãe é tão antiga que usa DDR2 ou DDR3 cara e rara. Nesse caso, upgrade completo (placa + CPU + RAM DDR4/DDR5) faz mais sentido.",
    whatsappMessage: "Olá! Meu PC está com suspeita de memória RAM defeituosa (telas azuis, travamentos). Podem diagnosticar?",
    relatedPages: [
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/erro-tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD/Memória" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Memória RAM: Guia Completo\n\n### Tipos de RAM por Geração\n\n| Geração | Velocidade Típica | Voltagem | Ano | Status |\n|---|---|---|---|---|\n| DDR3 | 1333-1866 MHz | 1.5V | 2007-2014 | Obsoleta |\n| DDR4 | 2400-3600 MHz | 1.2V | 2014-2022 | Atual |\n| DDR5 | 4800-7200 MHz | 1.1V | 2022+ | Nova geração |\n\n### Quanto de RAM Você Precisa?\n\n| Uso | Mínimo | Recomendado |\n|---|---|---|\n| Navegação/Office | 4 GB | 8 GB |\n| Multitarefa/Trabalho | 8 GB | 16 GB |\n| Gaming | 16 GB | 32 GB |\n| Edição de vídeo/3D | 32 GB | 64 GB |\n\n### Como Verificar a RAM no Windows\n\n1. **Gerenciador de Tarefas** (Ctrl+Shift+Esc) → Aba Desempenho → Memória\n2. **msinfo32** → Mostra tipo, velocidade e fabricante\n3. **CPU-Z** (gratuito) → Aba SPD mostra detalhes técnicos de cada slot\n\n### Dual Channel: Por Que Importa\n\nUsar 2 pentes idênticos em vez de 1 dobra a largura de banda da memória:\n- ❌ 1x 16GB = Single Channel = ~25 GB/s\n- ✅ 2x 8GB = Dual Channel = ~50 GB/s\n\nImpacto real: 10-30% mais performance em jogos e aplicações pesadas.`
  },

  // ==================== NOTEBOOK COM TELA PISCANDO ====================
  {
    slug: "notebook-com-tela-piscando-curitiba",
    title: "Notebook com Tela Piscando em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Tela do notebook piscando, tremendo ou com flickering? Técnico em Curitiba diagnostica e resolve problemas de tela com reparo profissional. Atendimento rápido.",
    h1: "Notebook com Tela Piscando — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Display",
    intro: `A tela do notebook fica piscando, tremendo ou dando flicker? Esse problema pode ser desde algo simples como uma configuração de taxa de atualização errada até um defeito físico no cabo flat que conecta a tela à placa-mãe.\n\nO flickering de tela é especialmente incômodo porque causa fadiga visual, dor de cabeça e torna o notebook praticamente inutilizável para trabalho prolongado. Muitos usuários tentam conviver com o problema, mas ele tende a piorar progressivamente — o que era um piscar ocasional vira tela completamente apagando e voltando.\n\nEm Curitiba, o diagnóstico mais importante é determinar se o problema é de hardware (cabo flat, inversor, painel LCD) ou software (driver de vídeo, taxa de atualização, aplicativo conflitante). Um teste simples: conecte um monitor externo — se a imagem no monitor externo é estável, o problema é na tela/cabo do notebook.`,
    sintomas: [
      { titulo: "Tela pisca rapidamente (flickering constante)", desc: "A tela fica piscando em frequência rápida, como se estivesse sendo ligada e desligada várias vezes por segundo. Pode ser driver, taxa de atualização ou backlight.", gravidade: "Média" },
      { titulo: "Tela pisca ao abrir/fechar a tampa", desc: "Mover a tampa do notebook causa piscar ou apagão momentâneo. Forte indicativo de cabo flat com mau contato na dobradiça.", gravidade: "Média-Alta" },
      { titulo: "Linhas horizontais ou verticais piscando", desc: "Linhas coloridas aparecem e desaparecem na tela. Pode ser painel LCD com defeito, cabo flat danificado ou GPU com problema.", gravidade: "Alta" },
      { titulo: "Brilho da tela oscila sozinho", desc: "O brilho sobe e desce sem controle do usuário. Pode ser sensor de luz ambiente com defeito ou problema no circuito de backlight.", gravidade: "Baixa-Média" },
      { titulo: "Tela apaga por segundos e volta", desc: "A tela fica preta por 1-3 segundos e depois volta ao normal. Pode ser driver de vídeo crashando e reiniciando ou cabo flat intermitente.", gravidade: "Média-Alta" },
      { titulo: "Flickering só em determinados programas", desc: "A tela só pisca ao usar Chrome, Excel ou jogos específicos. Indica problema de software — driver de vídeo, aceleração de hardware ou incompatibilidade.", gravidade: "Baixa" }
    ],
    causas: [
      { titulo: "Cabo flat (LVDS/eDP) com mau contato", desc: "O cabo que conecta a tela à placa-mãe passa pela dobradiça e sofre flexão a cada abertura/fechamento. Com o tempo, fios internos se rompem parcialmente.", tipo: "desgaste" },
      { titulo: "Driver de vídeo com problema", desc: "Driver de GPU desatualizado, corrompido ou incompatível pode causar flickering. Windows Update frequentemente instala drivers genéricos problemáticos.", tipo: "software" },
      { titulo: "Taxa de atualização incompatível", desc: "Configurar a tela para uma taxa de atualização não suportada nativamente pode causar flickering. Comum após conectar/desconectar monitor externo.", tipo: "software" },
      { titulo: "Painel LCD/LED com defeito", desc: "O próprio painel da tela pode ter defeito nos transistores (TFT) ou no circuito de backlight LED. Mais comum em telas com mais de 5 anos.", tipo: "hardware" },
      { titulo: "Aplicativo com aceleração de hardware conflitante", desc: "Chrome, Discord e outros apps usam aceleração de hardware da GPU. Se o driver tem bug, esses apps causam flickering.", tipo: "software" },
      { titulo: "Inversor de backlight com defeito (telas CCFL)", desc: "Em notebooks mais antigos com backlight CCFL (não LED), o inversor pode falhar, causando piscar ou escurecimento progressivo.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Atualização de driver de vídeo + ajuste de taxa de atualização + desabilitar aceleração de hardware em apps.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Troca do cabo flat (LVDS/eDP) + limpeza dos conectores. Resolve a maioria dos flickerings por hardware.", tempo: "1-3 horas", custo: "R$ 150–350" },
      { nivel: "Complexo", desc: "Troca do painel LCD/LED completo ou reparo do circuito de backlight na placa-mãe.", tempo: "2-5 dias", custo: "R$ 350–900" }
    ],
    riscos: [
      "Flickering prolongado causa fadiga visual, dor de cabeça e pode afetar a visão",
      "Cabo flat com fio semi-rompido pode causar curto-circuito e danificar a placa-mãe",
      "Ignorar o problema faz o cabo flat se romper completamente — tela apaga de vez",
      "Trocar tela por modelo incompatível pode causar cores erradas ou resolução incorreta",
      "Desmontar notebook sem experiência pode danificar a dobradiça ou romper outros cabos"
    ],
    diagnostico: `Diagnóstico de tela piscando:\n\n1. Teste com monitor externo (HDMI/VGA) — se estável, problema é na tela/cabo\n2. Teste de driver: boot em Modo de Segurança — se não pisca, é driver\n3. Verificação de cabo flat (movimentar tampa e observar)\n4. Teste de taxa de atualização e resolução\n5. Inspeção visual do cabo flat e conectores\n6. Teste com painel substituto (quando disponível)\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Driver**: DDU + instalação limpa do driver Intel/NVIDIA/AMD oficial\n- **Configuração**: Ajuste de taxa de atualização para nativa + desabilitar aceleração de hardware\n- **Cabo flat**: Troca do cabo LVDS/eDP por modelo original compatível\n- **Painel**: Substituição do LCD/LED por painel compatível (mesma resolução e conector)\n- **Backlight**: Reparo do circuito inversor ou troca de LEDs de backlight\n\nTeste de estabilidade por 1+ hora com abertura/fechamento da tampa.`,
    quandoCompensa: "Na maioria dos casos — troca de cabo flat custa R$ 150-350 e resolve o problema. Até troca de tela (R$ 400-800) vale para notebooks de até 5 anos.",
    quandoNaoCompensa: "Quando o painel é de resolução ou tamanho raro e o custo da peça + mão de obra supera 60% do valor do notebook.",
    whatsappMessage: "Olá! A tela do meu notebook está piscando/tremendo. Podem me ajudar?",
    relatedPages: [
      { to: "/notebook-com-tela-quebrada-curitiba", label: "Tela Quebrada" },
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Tela Piscando: Guia Completo\n\n### Teste Rápido: Software ou Hardware?\n\n| Teste | Resultado | Diagnóstico |\n|---|---|---|\n| Monitor externo estável? | Sim | Problema na tela/cabo do notebook |\n| Pisca no Modo de Segurança? | Não | Problema de driver/software |\n| Pisca ao mover a tampa? | Sim | Cabo flat com mau contato |\n| Pisca em tela preta (BIOS)? | Sim | Hardware (backlight/painel) |\n\n### Tipos de Cabo de Tela\n\n| Tipo | Uso | Pinos |\n|---|---|---|\n| LVDS | Notebooks até 2015 | 30 ou 40 pinos |\n| eDP | Notebooks modernos | 30 ou 40 pinos |\n| eDP 2.0 | Notebooks premium 4K | 40 pinos |\n\n### Como Desabilitar Aceleração de Hardware\n\n**Chrome**: Configurações → Sistema → Desativar "Usar aceleração de hardware"\n**Discord**: Configurações → Avançado → Desativar "Aceleração de hardware"\n**Excel/Office**: Arquivo → Opções → Avançado → Marcar "Desabilitar aceleração gráfica de hardware"`
  },

  // ==================== PC FAZENDO BARULHO ESTRANHO ====================
  {
    slug: "pc-fazendo-barulho-estranho-curitiba",
    title: "PC Fazendo Barulho Estranho em Curitiba | Diagnóstico Profissional",
    metaDescription: "Computador fazendo barulho estranho? Cliques, zumbido, chiado ou vibração? Técnico em Curitiba identifica a origem e resolve. Diagnóstico rápido e preciso.",
    h1: "PC Fazendo Barulho Estranho — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Mecânico",
    intro: `Seu computador começou a fazer barulhos estranhos — cliques, zumbidos, chiados, vibrações ou roncos? Qualquer ruído incomum é um sinal de alerta que não deve ser ignorado. O tipo de barulho indica exatamente qual componente está com problema e qual a urgência do reparo.\n\nCliques repetitivos podem indicar um HD mecânico em falha iminente (e seus dados em risco). Zumbido alto pode ser uma ventoinha com rolamento desgastado. Chiado elétrico (coil whine) geralmente vem da placa de vídeo ou fonte sob carga. Vibração excessiva pode ser uma ventoinha desbalanceada ou parafuso solto.\n\nEm Curitiba, o diagnóstico acústico é parte essencial do nosso atendimento. Com experiência, conseguimos identificar a origem do barulho sem sequer abrir o gabinete em muitos casos. Mas o diagnóstico completo envolve isolar cada componente para confirmar a fonte exata.`,
    sintomas: [
      { titulo: "Cliques rítmicos e repetitivos", desc: "Som de 'tec-tec-tec' em intervalos regulares. URGENTE: forte indicativo de HD mecânico com cabeça de leitura danificada. Risco de perda total de dados.", gravidade: "Crítica" },
      { titulo: "Zumbido alto e constante", desc: "Ruído contínuo como de motor. Geralmente uma ventoinha (cooler de CPU, GPU ou gabinete) com rolamento desgastado girando com atrito.", gravidade: "Média" },
      { titulo: "Chiado elétrico (coil whine)", desc: "Som agudo de alta frequência, como um 'iiiii' fino. Vem de indutores na placa de vídeo ou fonte sob carga pesada. Geralmente não é defeito.", gravidade: "Baixa" },
      { titulo: "Vibração forte no gabinete", desc: "O gabinete inteiro treme ou vibra. Pode ser ventoinha desbalanceada, HD sem amortecedor de borracha ou parafuso solto.", gravidade: "Baixa-Média" },
      { titulo: "Barulho de arranhar/raspar", desc: "Som de algo raspando dentro do gabinete. Pode ser cabo encostando em ventoinha, ventoinha batendo na grade ou HD com prato danificado.", gravidade: "Média-Alta" },
      { titulo: "Estalidos ao ligar o PC", desc: "Sons de estalo quando o computador é ligado. Pode ser relé da fonte acionando, capacitor estufado ou arco elétrico em conexão frouxa.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "HD mecânico com falha", desc: "O disco rígido tem peças móveis que desgastam. Cliques indicam que a cabeça de leitura não consegue se posicionar — falha iminente e risco de perda de dados.", tipo: "desgaste" },
      { titulo: "Ventoinha com rolamento desgastado", desc: "Coolers de CPU, GPU e gabinete têm rolamentos que desgastam após 3-5 anos. O barulho começa baixo e piora progressivamente.", tipo: "desgaste" },
      { titulo: "Cabo encostando na ventoinha", desc: "Cabos de alimentação ou SATA podem cair e encostar nas pás da ventoinha, causando ruído de batida intermitente.", tipo: "erro-humano" },
      { titulo: "Fonte de alimentação com problema", desc: "Fontes baratas ou velhas podem apresentar chiado (coil whine), estalidos ou zumbido. Ventoinhas de fonte também desgastam.", tipo: "hardware" },
      { titulo: "Parafusos soltos ou gabinete vibrando", desc: "Parafusos de HD, SSD, ventoinha ou tampa do gabinete podem afrouxar com vibração, amplificando ruídos.", tipo: "desgaste" },
      { titulo: "Placa de vídeo com coil whine", desc: "Indutores da GPU vibram microscopicamente sob carga pesada (jogos), emitindo som agudo. É normal em muitas GPUs, mas pode ser atenuado.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Organização de cabos + reaperto de parafusos + limpeza de ventoinhas. Resolve vibrações e barulhos mecânicos simples.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Troca de ventoinha defeituosa + lubrificação de rolamentos + amortecedores de HD.", tempo: "1-2 horas", custo: "R$ 120–300" },
      { nivel: "Complexo", desc: "Backup emergencial de HD clicando + migração para SSD + troca de fonte. Quando múltiplos componentes estão barulhentos.", tempo: "1-3 dias", custo: "R$ 250–700" }
    ],
    riscos: [
      "HD clicando pode falhar totalmente a qualquer momento — faça backup IMEDIATO",
      "Ventoinha parada por rolamento travado causa superaquecimento e danos térmicos",
      "Ignorar vibração pode afrouxar conexões internas e causar mau contato",
      "Fonte com estalidos pode indicar arco elétrico — risco de curto-circuito",
      "Continuar usando HD barulhento reduz drasticamente as chances de recuperação de dados",
      "Cabo preso em ventoinha pode derreter por atrito e causar curto"
    ],
    diagnostico: `Diagnóstico acústico e mecânico:\n\n1. Identificação da origem do barulho com PC ligado (escuta técnica)\n2. Teste individual de cada ventoinha (parar uma por vez com segurança)\n3. Verificação de saúde do HD (SMART, CrystalDiskInfo)\n4. Inspeção de cabos e parafusos internos\n5. Teste de fonte com multímetro e sob carga\n6. Verificação de coil whine em GPU sob stress test\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a origem:\n\n- **HD clicando**: Backup emergencial IMEDIATO + migração para SSD\n- **Ventoinha**: Troca por modelo silencioso ou lubrificação profissional\n- **Cabos**: Reorganização com abraçadeiras e afastamento de ventoinhas\n- **Parafusos**: Reaperto + uso de arruelas de borracha para amortecimento\n- **Fonte**: Troca por modelo silencioso com ventoinha de 120mm\n- **Coil whine**: Atenuação com ajuste de frame rate ou troca de fonte\n\nTeste de ruído comparativo antes e depois do reparo.`,
    quandoCompensa: "Quase sempre — troca de ventoinha ou organização de cabos custa R$ 80-200. Migração de HD para SSD elimina o barulho e melhora a performance.",
    quandoNaoCompensa: "Quando o coil whine é inerente ao design da GPU e não indica defeito — nesse caso, é característica do hardware.",
    whatsappMessage: "Olá! Meu PC está fazendo barulho estranho. Podem diagnosticar a origem?",
    relatedPages: [
      { to: "/hd-fazendo-barulho-curitiba", label: "HD Fazendo Barulho" },
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Barulhos no PC: Guia de Identificação\n\n### Tabela de Sons e Causas\n\n| Som | Origem Provável | Urgência |\n|---|---|---|\n| Tec-tec-tec (clique) | HD mecânico | 🔴 Crítica |\n| Zumbido contínuo | Ventoinha | 🟡 Média |\n| Chiado agudo | Coil whine (GPU/fonte) | 🟢 Baixa |\n| Vibração/treme | Parafuso/HD solto | 🟡 Média |\n| Raspando/arranhando | Cabo na ventoinha | 🟠 Média-Alta |\n| Estalo ao ligar | Relé da fonte/capacitor | 🟡 Média |\n| Ronco intermitente | Ventoinha suja | 🟡 Média |\n\n### Como Reduzir Ruído do PC\n\n1. **Troque por ventoinhas silenciosas** (Noctua, Arctic, be quiet!)\n2. **Migre o HD para SSD** — elimina 100% do ruído do disco\n3. **Organize os cabos** — afaste de ventoinhas\n4. **Use amortecedores de borracha** em HDs e ventoinhas\n5. **Limpe as ventoinhas** a cada 6 meses\n6. **Considere gabinete com isolamento acústico**`
  },

  // ==================== ERRO DE PARTIÇÃO WINDOWS ====================
  {
    slug: "erro-particao-windows-curitiba",
    title: "Erro de Partição no Windows em Curitiba | Reparo Profissional",
    metaDescription: "Erro de partição no Windows? Disco não reconhecido, partição RAW ou corrompida? Técnico em Curitiba recupera partições e dados. Atendimento especializado.",
    h1: "Erro de Partição no Windows — Reparo e Recuperação em Curitiba",
    categoria: "Software — Disco",
    intro: `Erros de partição são problemas na estrutura lógica do disco que impedem o Windows de acessar seus dados. O disco pode aparecer como RAW (sem sistema de arquivos), a partição pode sumir do Explorador de Arquivos, ou o Windows pode pedir para formatar o disco — mas NUNCA formate sem antes consultar um técnico.\n\nA tabela de partições (MBR ou GPT) é como um índice que diz ao sistema operacional onde cada partição começa e termina. Quando esse índice se corrompe — por queda de energia, vírus, erro de software ou operação incorreta — o Windows perde o acesso a todo o conteúdo, mesmo que os dados estejam intactos no disco.\n\nEm Curitiba, atendemos frequentemente casos de partição corrompida após queda de energia (especialmente em HDs mecânicos), tentativas fracassadas de redimensionar partições e erros causados por dual boot mal configurado.`,
    sintomas: [
      { titulo: "Disco aparece como RAW no Gerenciamento de Disco", desc: "A partição perdeu o sistema de arquivos e aparece como RAW. O Windows não consegue ler os dados mas eles geralmente ainda estão lá.", gravidade: "Alta" },
      { titulo: "Windows pede para formatar o disco", desc: "Mensagem 'Você precisa formatar o disco antes de usá-lo'. NÃO FORMATE — os dados existem mas a tabela de partições está corrompida.", gravidade: "Alta" },
      { titulo: "Partição sumiu do Explorador de Arquivos", desc: "O disco existe no Gerenciamento de Disco mas a partição não aparece. Pode ter perdido a letra de unidade ou a partição foi deletada acidentalmente.", gravidade: "Média-Alta" },
      { titulo: "Erro 'Disco não inicializado' no Gerenciamento", desc: "O disco aparece como 'Não inicializado' e o Windows quer inicializar (apagar tudo). A tabela de partições MBR/GPT foi corrompida.", gravidade: "Alta" },
      { titulo: "Windows não inicia após redimensionar partição", desc: "Tentou redimensionar, mover ou criar partição com software e agora o Windows não inicia. O bootloader ou partição EFI foram corrompidos.", gravidade: "Alta" },
      { titulo: "Erro de boot: 'Operating System Not Found'", desc: "O BIOS/UEFI não encontra o sistema operacional. A partição de boot (EFI ou MBR) pode ter sido deletada ou corrompida.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Queda de energia durante gravação", desc: "Corte de luz enquanto o sistema gravava na tabela de partições corrompe a estrutura. Muito comum em Curitiba com HDs mecânicos.", tipo: "hardware" },
      { titulo: "Software de particionamento causou erro", desc: "Programas como EaseUS, MiniTool ou GParted podem corromper partições se interrompidos, usados incorretamente ou com bugs.", tipo: "software" },
      { titulo: "Vírus ou ransomware", desc: "Alguns malwares atacam diretamente a tabela de partições ou o MBR para impedir o boot e exigir resgate.", tipo: "software" },
      { titulo: "Remoção incorreta de disco externo", desc: "Desconectar HD externo ou pen drive sem 'Remover com segurança' pode corromper a tabela de partições, especialmente durante gravação.", tipo: "erro-humano" },
      { titulo: "Dual boot mal configurado", desc: "Instalar Linux ao lado do Windows sem configurar corretamente o GRUB ou redimensionar partições pode corromper o bootloader do Windows.", tipo: "erro-humano" },
      { titulo: "Setores defeituosos na área da tabela de partições", desc: "Setores bad exatamente na região onde a tabela MBR/GPT está gravada tornam a partição inacessível.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Recuperação de partição deletada ou reassociação de letra de unidade. Ferramentas como TestDisk resolvem em minutos.", tempo: "30-90 min", custo: "R$ 100–200" },
      { nivel: "Médio", desc: "Reparo de tabela de partições corrompida + reconstrução de MBR/GPT + recuperação de bootloader EFI.", tempo: "2-4 horas", custo: "R$ 200–400" },
      { nivel: "Complexo", desc: "Recuperação de dados de partição RAW + reconstrução de sistema de arquivos NTFS + migração de dados.", tempo: "1-3 dias", custo: "R$ 350–800" }
    ],
    riscos: [
      "Formatar o disco quando o Windows pede APAGA todos os dados permanentemente",
      "Inicializar disco 'Não inicializado' destrói a tabela de partições existente",
      "Usar chkdsk em partição RAW pode piorar a corrupção em alguns casos",
      "Software gratuito de partição pode ter bugs que causam mais danos",
      "Converter MBR para GPT sem backup pode perder todas as partições",
      "Tentar reparar boot sem conhecimento pode tornar o Windows irrecuperável"
    ],
    diagnostico: `Diagnóstico de partição:\n\n1. Análise do Gerenciamento de Disco (estrutura atual)\n2. Verificação de tabela de partições com ferramentas profissionais (TestDisk, GParted)\n3. Verificação de saúde do disco (SMART, setores defeituosos)\n4. Identificação do tipo de tabela (MBR vs GPT)\n5. Scan de partições perdidas/deletadas\n6. Verificação de integridade do sistema de arquivos\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme o caso:\n\n- **Partição deletada**: Recuperação com TestDisk (restaura a partição original)\n- **Tabela corrompida**: Reconstrução de MBR/GPT com ferramentas profissionais\n- **Partição RAW**: Recuperação de dados + recriação da partição com sistema de arquivos correto\n- **Boot corrompido**: Reparo do bootloader Windows (bootrec, bcdboot) ou recriação da partição EFI\n- **Dual boot**: Reparação do GRUB/bootloader + configuração correta de partições\n\nTodos os dados são verificados e validados após a recuperação da partição.`,
    quandoCompensa: "Sempre quando há dados importantes na partição. Recuperação custa R$ 100-400 na maioria dos casos — muito menos que perder os dados.",
    quandoNaoCompensa: "Quando o disco tem dano físico severo (muitos setores defeituosos) e os dados já têm backup em outro lugar.",
    whatsappMessage: "Olá! Meu disco está com erro de partição e não consigo acessar meus dados. Podem me ajudar?",
    relatedPages: [
      { to: "/erro-disco-cheio-curitiba", label: "Disco Cheio" },
      { to: "/backup-perdido-curitiba", label: "Backup Perdido" },
      { to: "/hd-fazendo-barulho-curitiba", label: "HD Fazendo Barulho" },
      { to: "/servicos/backup-recuperacao", label: "Backup e Recuperação" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Partições no Windows: Guia Completo\n\n### MBR vs GPT — Qual a Diferença?\n\n| Característica | MBR | GPT |\n|---|---|---|\n| Limite de disco | 2 TB | 9.4 ZB |\n| Partições primárias | 4 | 128 |\n| Redundância | Nenhuma | Backup no final do disco |\n| Compatibilidade | BIOS + UEFI | Apenas UEFI |\n| Windows 11 | Não suporta | Obrigatório |\n\n### Estrutura de Partições do Windows\n\n| Partição | Tamanho | Função |\n|---|---|---|\n| EFI System (ESP) | 100-500 MB | Bootloader UEFI |\n| MSR (Microsoft Reserved) | 16-128 MB | Reservada pelo Windows |\n| Windows (C:) | Restante | Sistema operacional + dados |\n| Recovery | 500-1000 MB | Ambiente de recuperação |\n\n### Ferramentas Profissionais de Reparo\n\n- **TestDisk** (gratuito) — Recupera partições deletadas e repara tabela de partições\n- **GParted** (gratuito) — Gerenciamento de partições em Linux\n- **DMDE** — Recuperação avançada de dados e partições\n- **bootrec /fixmbr** — Repara MBR do Windows\n- **bcdboot** — Recria bootloader EFI do Windows`
  },

  // ==================== COMPUTADOR DESLIGANDO APÓS SEGUNDOS ====================
  {
    slug: "computador-desligando-apos-segundos-curitiba",
    title: "Computador Desligando Após Poucos Segundos em Curitiba | Diagnóstico",
    metaDescription: "Computador liga e desliga sozinho após poucos segundos? Técnico em Curitiba diagnostica problemas de fonte, processador, placa-mãe e superaquecimento. Atendimento rápido.",
    h1: "Computador Desligando Após Poucos Segundos — Diagnóstico em Curitiba",
    categoria: "Hardware — Energia",
    intro: `O computador liga, as ventoinhas giram por 3 a 10 segundos e depois desliga sozinho? Esse comportamento indica um problema sério de hardware que impede o sistema de completar o POST (Power-On Self-Test). O computador detecta uma condição insegura e se desliga para proteger os componentes.\n\nAs causas mais comuns são: proteção térmica instantânea (cooler de CPU desencaixado ou sem pasta térmica), fonte de alimentação defeituosa, curto-circuito na placa-mãe ou memória RAM incompatível/defeituosa. Em casos raros, pode ser o processador com defeito.\n\nEsse é um dos problemas mais assustadores para o usuário, mas na maioria dos casos a causa é simples e o reparo é acessível. Em Curitiba, diagnosticamos com método de eliminação: testamos cada componente isoladamente para encontrar o culpado.`,
    sintomas: [
      { titulo: "Liga por 3-5 segundos e desliga", desc: "Ventoinhas giram brevemente e tudo apaga. Padrão clássico de proteção térmica — cooler de CPU não detectado ou não funcionando.", gravidade: "Alta" },
      { titulo: "Liga e desliga em loop infinito", desc: "O PC tenta ligar, desliga, liga de novo, desliga... sem parar. Indica fonte com problema ou curto-circuito na placa-mãe.", gravidade: "Alta" },
      { titulo: "Liga por 10-30 segundos sem imagem e desliga", desc: "Mais tempo ligado sugere que o POST progride parcialmente. Pode ser RAM defeituosa, GPU com problema ou erro de BIOS.", gravidade: "Média-Alta" },
      { titulo: "Cheiro de queimado ao ligar", desc: "Odor de componente eletrônico queimado. DESLIGUE IMEDIATAMENTE. Pode ser capacitor, VRM da placa-mãe ou fonte com curto.", gravidade: "Crítica" },
      { titulo: "LED da placa-mãe acende mas não liga", desc: "O LED standby da placa-mãe acende (indica que recebe energia) mas apertar o botão de power não faz nada ou liga por um instante.", gravidade: "Média-Alta" },
      { titulo: "Funciona na segunda ou terceira tentativa", desc: "Desliga nas primeiras tentativas mas eventualmente liga. Indica capacitores desgastados na fonte ou placa-mãe com mau contato.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Cooler de CPU desencaixado ou sem pasta térmica", desc: "A proteção térmica detecta que a CPU não está sendo refrigerada e desliga em segundos. Acontece após manutenção onde o cooler foi removido e recolocado incorretamente.", tipo: "erro-humano" },
      { titulo: "Fonte de alimentação defeituosa", desc: "Fonte com capacitores estufados, trilha queimada ou ventilação entupida. Não consegue manter a alimentação estável e o sistema desliga.", tipo: "hardware" },
      { titulo: "Curto-circuito na placa-mãe", desc: "Parafuso extra fazendo contato, standoff em posição errada ou trilha da placa-mãe com curto. O sistema de proteção desliga imediatamente.", tipo: "hardware" },
      { titulo: "Memória RAM incompatível ou mal encaixada", desc: "RAM não suportada pela placa-mãe ou encaixada parcialmente. O POST falha e o sistema desliga após tentativas.", tipo: "erro-humano" },
      { titulo: "Processador com defeito ou incompatível", desc: "CPU queimada por pico de tensão ou CPU de geração não suportada pela BIOS. Raro mas possível.", tipo: "hardware" },
      { titulo: "Botão de power com mau contato", desc: "O botão liga/desliga do gabinete pode ter fio partido ou conector solto, enviando sinal intermitente.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reencaixe do cooler + nova pasta térmica + reencaixe de RAM. Resolve 40% dos casos.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Troca de fonte de alimentação + verificação de curto-circuito + teste de componentes.", tempo: "1-3 horas", custo: "R$ 200–450" },
      { nivel: "Complexo", desc: "Diagnóstico de placa-mãe com curto + reparo ou troca + verificação de todos os componentes.", tempo: "1-5 dias", custo: "R$ 350–900" }
    ],
    riscos: [
      "Continuar tentando ligar com curto-circuito pode queimar mais componentes",
      "Cheiro de queimado indica componente já danificado — desligar da tomada imediatamente",
      "Fonte defeituosa pode enviar tensão errada e queimar placa-mãe, RAM e GPU",
      "Ligar sem cooler de CPU pode danificar o processador em segundos",
      "Ignorar loop de boot pode desgastar a fonte e piorar o problema",
      "Trocar fonte por modelo muito barato pode causar o mesmo problema em semanas"
    ],
    diagnostico: `Diagnóstico de desligamento precoce:\n\n1. Verificação visual de componentes (queimados, estufados, mau contato)\n2. Teste de fonte com multímetro (voltagens e estabilidade)\n3. Teste bare-bones (placa + CPU + 1 pente de RAM — mínimo para POST)\n4. Verificação de cooler de CPU (encaixe, pasta térmica, rotação)\n5. Teste individual de cada pente de RAM\n6. Verificação de curto-circuito (standoffs, parafusos, gabinete)\n7. Teste com fonte alternativa\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Cooler**: Reencaixe correto + nova pasta térmica + verificação de rotação\n- **Fonte**: Troca por fonte 80 Plus certificada com potência adequada\n- **Curto**: Remoção da causa do curto (parafuso, standoff, trilha) + teste de isolamento\n- **RAM**: Reencaixe ou troca por módulo compatível confirmado no QVL da placa-mãe\n- **Processador**: Teste com outro CPU compatível + verificação de socket\n- **Botão**: Reparo ou troca do cabo do botão power\n\nTeste de estabilidade por 30+ minutos após o reparo para garantir que não desliga.`,
    quandoCompensa: "Na maioria dos casos — reencaixe de cooler ou troca de fonte custa R$ 80-400. O restante dos componentes geralmente está intacto.",
    quandoNaoCompensa: "Quando placa-mãe e processador estão queimados e o PC é muito antigo — custo de peças equivale a um PC usado mais novo.",
    whatsappMessage: "Olá! Meu computador liga e desliga sozinho após poucos segundos. Podem me ajudar?",
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## PC Desligando Sozinho: Guia de Diagnóstico\n\n### Tempo Ligado vs Causa Provável\n\n| Tempo | Causa Mais Provável |\n|---|---|\n| 0-3 segundos | Curto-circuito ou proteção da fonte |\n| 3-5 segundos | Cooler de CPU não detectado |\n| 5-15 segundos | RAM defeituosa ou incompatível |\n| 15-60 segundos | Superaquecimento (sem pasta térmica) |\n| Minutos | Fonte subdimensionada sob carga |\n| Aleatório | Capacitor estufado / mau contato |\n\n### Teste Bare-Bones (Diagnóstico por Eliminação)\n\n1. Remova TUDO do gabinete: GPU, HDs, SSDs, ventoinhas extras\n2. Deixe apenas: placa-mãe + CPU + cooler + 1 pente de RAM\n3. Conecte a fonte e tente ligar\n4. Se funcionar: adicione um componente por vez até encontrar o culpado\n5. Se não funcionar: problema é na placa-mãe, CPU, RAM ou fonte\n\n### Sinais Visuais de Problemas\n\n| Sinal | Componente | Ação |\n|---|---|---|\n| Capacitor estufado (topo abaulado) | Placa-mãe/Fonte | Trocar componente |\n| Marca de queimado na placa | Placa-mãe | Avaliar reparo |\n| Pinos tortos no socket | Processador | Endireitar ou trocar |\n| Conector derretido | Fonte/GPU | Trocar imediatamente |`
  },

  // ==================== NOTEBOOK TOUCHPAD NÃO FUNCIONA ====================
  {
    slug: "notebook-touchpad-nao-funciona-curitiba",
    title: "Touchpad do Notebook Não Funciona em Curitiba | Técnico Especialista",
    metaDescription: "Touchpad do notebook parou de funcionar, não responde ao toque ou está travado? Técnico em Curitiba resolve problemas de touchpad com diagnóstico rápido e preciso.",
    h1: "Touchpad do Notebook Não Funciona — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Periférico",
    intro: `O touchpad do notebook parou de responder, funciona de forma intermitente ou perdeu gestos como scroll e zoom? Esse problema pode parecer menor, mas torna o notebook praticamente inútil sem um mouse externo — especialmente para quem usa o equipamento fora de casa.\n\nAs causas vão desde uma simples tecla de atalho que desativou o touchpad (Fn + F-key) até problemas de driver, cabo flat desconectado ou defeito no próprio sensor capacitivo. Em notebooks mais recentes com touchpad de precisão (Windows Precision), problemas de driver são especialmente comuns após atualizações do Windows.\n\nEm Curitiba, atendemos muitos casos onde o touchpad parou após atualização do Windows, derramamento de líquido sobre o teclado (que atinge o touchpad por baixo) ou após manutenção onde o cabo flat não foi reconectado corretamente.`,
    sintomas: [
      { titulo: "Touchpad completamente morto (sem resposta)", desc: "Nenhum movimento, clique ou gesto funciona. Pode ser desativado por tecla de atalho, driver ausente ou cabo flat desconectado.", gravidade: "Média" },
      { titulo: "Cursor se move mas cliques não funcionam", desc: "O cursor acompanha o dedo mas tocar para clicar ou os botões físicos não respondem. Problema de configuração ou sensor de clique.", gravidade: "Baixa-Média" },
      { titulo: "Touchpad funciona de forma intermitente", desc: "Às vezes funciona, às vezes para. Piora com temperatura ou posição específica. Indica cabo flat com mau contato ou sensor com falha parcial.", gravidade: "Média" },
      { titulo: "Gestos de scroll/zoom pararam de funcionar", desc: "O cursor se move mas scroll com dois dedos, pinch-to-zoom e outros gestos não respondem. Geralmente problema de driver ou configuração.", gravidade: "Baixa" },
      { titulo: "Cursor pula ou se move sozinho", desc: "O cursor salta para posições aleatórias ou se move sem tocar. Pode ser interferência eletrostática, sujeira no sensor ou driver com bug.", gravidade: "Média" },
      { titulo: "Touchpad desativa quando conecta mouse USB", desc: "Configuração do Windows ou BIOS que desativa o touchpad quando mouse externo é detectado. Pode ser ajustado nas configurações.", gravidade: "Baixa" }
    ],
    causas: [
      { titulo: "Desativado por tecla de atalho (Fn + F-key)", desc: "A maioria dos notebooks tem uma tecla (F5, F6, F7 ou F9) que desativa o touchpad. Muitos usuários apertam sem querer e acham que quebrou.", tipo: "erro-humano" },
      { titulo: "Driver Synaptics/ELAN corrompido ou ausente", desc: "Após atualização do Windows, o driver do touchpad pode ser substituído por versão genérica que não suporta gestos ou funciona parcialmente.", tipo: "software" },
      { titulo: "Cabo flat desconectado ou danificado", desc: "O cabo flat que conecta o touchpad à placa-mãe pode se soltar após impacto, vibração ou manutenção. Fio rompido causa falha total.", tipo: "hardware" },
      { titulo: "Líquido derramado sobre o teclado", desc: "Água, café ou refrigerante derramado no teclado pode escorrer para baixo e atingir o circuito do touchpad, causando curto ou corrosão.", tipo: "erro-humano" },
      { titulo: "Touchpad desativado na BIOS", desc: "Algumas BIOS/UEFI têm opção de desativar o touchpad. Pode ter sido alterado acidentalmente ou durante manutenção.", tipo: "erro-humano" },
      { titulo: "Sensor capacitivo com defeito", desc: "O próprio sensor do touchpad pode falhar por desgaste, impacto ou defeito de fabricação. Mais comum em notebooks com mais de 4 anos.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reativação por tecla de atalho + reinstalação de driver + configuração de gestos. Resolve 50% dos casos.", tempo: "20-40 min", custo: "R$ 70–130" },
      { nivel: "Médio", desc: "Reconexão do cabo flat + limpeza de contatos + instalação de driver específico do fabricante.", tempo: "1-2 horas", custo: "R$ 130–250" },
      { nivel: "Complexo", desc: "Troca do módulo touchpad completo ou reparo de trilha na placa do touchpad após dano por líquido.", tempo: "2-5 dias", custo: "R$ 200–500" }
    ],
    riscos: [
      "Derramamento de líquido pode corroer outros componentes além do touchpad",
      "Forçar cabo flat pode romper o conector na placa-mãe — reparo caro",
      "Instalar driver de touchpad genérico pode causar conflito com outros dispositivos",
      "Desmontar notebook sem experiência pode danificar clipes e travas do touchpad",
      "Usar mouse externo permanentemente sobrecarrega a porta USB e limita mobilidade"
    ],
    diagnostico: `Diagnóstico de touchpad:\n\n1. Verificação de tecla de atalho (Fn + F-key)\n2. Verificação de configuração do Windows (Configurações → Dispositivos → Touchpad)\n3. Verificação no Gerenciador de Dispositivos (driver, status)\n4. Teste com mouse USB conectado e desconectado\n5. Verificação na BIOS (touchpad habilitado?)\n6. Inspeção física do cabo flat e conector\n\nCusto: R$ 70 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Tecla de atalho**: Reativação via Fn + F-key ou Configurações do Windows\n- **Driver**: Remoção do driver genérico + instalação do driver Synaptics/ELAN do fabricante\n- **Cabo flat**: Reconexão segura ou troca do cabo\n- **BIOS**: Reativação da opção de touchpad nas configurações de BIOS\n- **Sensor**: Troca do módulo touchpad por peça compatível\n- **Líquido**: Limpeza com álcool isopropílico + secagem + teste de continuidade\n\nTeste completo de todos os gestos e cliques após o reparo.`,
    quandoCompensa: "Sempre — resolver touchpad custa R$ 70-250 na maioria dos casos. Mesmo troca do módulo (R$ 200-500) é mais barato que usar mouse externo para sempre.",
    quandoNaoCompensa: "Quando o notebook é muito antigo e a peça de reposição não existe mais. Nesse caso, um mouse Bluetooth compacto resolve por R$ 50-100.",
    whatsappMessage: "Olá! O touchpad do meu notebook parou de funcionar. Podem me ajudar?",
    relatedPages: [
      { to: "/teclado-nao-funciona-curitiba", label: "Teclado Não Funciona" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver" },
      { to: "/notebook-nao-conecta-bluetooth-curitiba", label: "Bluetooth Não Conecta" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Touchpad do Notebook: Guia Completo\n\n### Teclas de Atalho para Touchpad por Fabricante\n\n| Fabricante | Tecla | Observação |\n|---|---|---|\n| Dell | Fn + F5 | Ícone de touchpad na tecla |\n| Lenovo | Fn + F6 | Varia por modelo |\n| HP | Duplo toque no canto superior esquerdo | Ou Fn + F-key |\n| Acer | Fn + F7 | LED indicador no touchpad |\n| ASUS | Fn + F9 | Varia por modelo |\n| Samsung | Fn + F5 | Ícone na tecla |\n\n### Tipos de Touchpad\n\n| Tipo | Gestos | Precisão | Notebooks |\n|---|---|---|---|\n| Synaptics | Básicos | Boa | Maioria até 2018 |\n| ELAN | Básicos a intermediários | Boa | Dell, Acer, ASUS |\n| Windows Precision | Completos (4+ dedos) | Excelente | Modernos 2019+ |\n| Apple Force Touch | Completos + força | Excelente | MacBook |\n\n### Como Verificar se o Touchpad Está Ativo\n\n1. **Win + I** → Dispositivos → Touchpad → Deve estar "Ativado"\n2. Verifique se existe um LED no touchpad (alguns modelos) — se aceso, está desativado\n3. Conecte um mouse USB → vá em Configurações → desmaque "Desativar touchpad quando mouse está conectado"`
  },

  // ==================== PC NÃO RECONHECE SEGUNDO MONITOR ====================
  {
    slug: "pc-nao-reconhece-segundo-monitor-curitiba",
    title: "PC Não Reconhece Segundo Monitor em Curitiba | Técnico Especialista",
    metaDescription: "Segundo monitor não é reconhecido pelo PC ou notebook? Técnico em Curitiba resolve problemas de dual monitor com diagnóstico profissional. Atendimento rápido.",
    h1: "PC Não Reconhece Segundo Monitor — Diagnóstico e Configuração em Curitiba",
    categoria: "Hardware — Vídeo",
    intro: `Conectou um segundo monitor mas o PC não reconhece, não detecta ou mostra apenas um? O setup dual monitor se tornou essencial para produtividade, home office e gaming, mas configurá-lo nem sempre é simples — especialmente quando envolve tipos diferentes de saída de vídeo, adaptadores e configurações do Windows.\n\nOs problemas mais comuns envolvem: cabo ou adaptador incompatível, driver de vídeo desatualizado, configuração errada no Windows (modo de exibição), limitação da placa de vídeo ou notebook que não suporta saída simultânea em determinada resolução.\n\nEm Curitiba, configuramos setups dual e triple monitor diariamente para home offices, escritórios de contabilidade, design e programação. O diagnóstico identifica se o problema é hardware (cabo, porta, GPU) ou software (driver, configuração) para resolver com eficiência.`,
    sintomas: [
      { titulo: "Segundo monitor mostra 'Sem Sinal'", desc: "O monitor está ligado mas não recebe sinal do PC. Pode ser cabo errado, porta inativa, adaptador incompatível ou GPU não suportando duas saídas.", gravidade: "Média" },
      { titulo: "Windows só detecta um monitor", desc: "Em Configurações → Sistema → Tela, aparece apenas '1 monitor'. O segundo não é listado nem com 'Detectar'. Problema de driver ou hardware.", gravidade: "Média" },
      { titulo: "Segundo monitor duplica em vez de estender", desc: "Ambos os monitores mostram a mesma imagem em vez de estender a área de trabalho. Configuração de modo de exibição precisa ser alterada.", gravidade: "Baixa" },
      { titulo: "Resolução errada no segundo monitor", desc: "O segundo monitor mostra imagem borrada, esticada ou com barras pretas. A resolução nativa não está sendo usada — ajuste necessário.", gravidade: "Baixa" },
      { titulo: "Monitor funciona sozinho mas não com o outro", desc: "Cada monitor funciona individualmente quando é o único conectado, mas ao conectar os dois, um deles não funciona.", gravidade: "Média" },
      { titulo: "Segundo monitor pisca ou desconecta intermitentemente", desc: "O monitor fica conectando e desconectando sozinho. Pode ser cabo com mau contato, adaptador de baixa qualidade ou limitação de bandwidth.", gravidade: "Média" }
    ],
    causas: [
      { titulo: "Cabo ou adaptador incompatível", desc: "Adaptadores HDMI-VGA baratos nem sempre funcionam. Conversores ativos são necessários para certas combinações (ex: DisplayPort para HDMI em resolução 4K).", tipo: "hardware" },
      { titulo: "Driver de vídeo desatualizado ou genérico", desc: "O driver Microsoft Basic Display Adapter não suporta múltiplos monitores. É necessário o driver oficial da NVIDIA, AMD ou Intel.", tipo: "software" },
      { titulo: "Placa de vídeo não suporta saídas simultâneas", desc: "Algumas GPUs integradas ou modelos antigos limitam o número de saídas simultâneas ou a resolução máxima em dual monitor.", tipo: "hardware" },
      { titulo: "Configuração de exibição errada no Windows", desc: "O Windows pode estar em modo 'Apenas tela do PC' ou 'Duplicar' em vez de 'Estender'. Win + P alterna entre modos.", tipo: "erro-humano" },
      { titulo: "BIOS desabilitou vídeo integrado", desc: "Ao instalar GPU dedicada, a BIOS pode desabilitar o vídeo integrado. Para usar monitor na placa-mãe + GPU, é preciso habilitar 'IGD Multi-Monitor'.", tipo: "software" },
      { titulo: "Porta de vídeo com defeito", desc: "A porta HDMI, DP ou VGA do PC ou do monitor pode ter defeito mecânico — pinos tortos, oxidação ou conector frouxo.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Configuração correta do Windows + atualização de driver + troca de cabo. Resolve 60% dos casos.", tempo: "30-60 min", custo: "R$ 80–150" },
      { nivel: "Médio", desc: "Instalação de adaptador ativo + configuração de BIOS para multi-monitor + ajuste de resoluções e refresh rate.", tempo: "1-2 horas", custo: "R$ 150–300" },
      { nivel: "Complexo", desc: "Instalação de placa de vídeo adicional ou dock station USB-C para suportar múltiplos monitores.", tempo: "2-4 horas", custo: "R$ 250–800" }
    ],
    riscos: [
      "Adaptadores baratos podem danificar portas de vídeo com voltagem incorreta",
      "Forçar resolução não suportada pode causar tela preta permanente até reset",
      "Usar splitter HDMI em vez de dual output resulta em imagem duplicada, não estendida",
      "Driver de vídeo errado pode desabilitar todos os monitores temporariamente",
      "Notebooks com GPU híbrida (Intel + NVIDIA) têm limitações de saída que confundem o diagnóstico"
    ],
    diagnostico: `Diagnóstico de dual monitor:\n\n1. Verificação de cabos e adaptadores (tipo, qualidade, compatibilidade)\n2. Teste de cada porta de vídeo individualmente\n3. Verificação de driver de vídeo (versão, fabricante)\n4. Configuração do Windows (Win + P, Configurações de Tela)\n5. Verificação de BIOS (IGD Multi-Monitor, saída primária)\n6. Teste com outro monitor/cabo para isolar o problema\n\nCusto: R$ 80 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme a causa:\n\n- **Cabo**: Troca por cabo certificado do tipo correto (HDMI 2.0, DP 1.4)\n- **Adaptador**: Instalação de adaptador ativo de qualidade (não splitter)\n- **Driver**: DDU + instalação limpa do driver NVIDIA/AMD/Intel\n- **Configuração**: Win + P → Estender + ajuste de resolução e posição dos monitores\n- **BIOS**: Habilitação de IGD Multi-Monitor e configuração de saída primária\n- **GPU**: Instalação de placa de vídeo com múltiplas saídas ou dock USB-C\n\nCalibração de resolução, refresh rate e posição dos monitores incluída.`,
    quandoCompensa: "Sempre — configurar dual monitor custa R$ 80-300 e aumenta drasticamente a produtividade. Até instalar GPU dedicada vale o investimento.",
    quandoNaoCompensa: "Quando o notebook ou PC simplesmente não tem capacidade gráfica para dois monitores na resolução desejada — nesse caso, upgrade de GPU é necessário.",
    whatsappMessage: "Olá! Meu PC não reconhece o segundo monitor. Podem me ajudar a configurar?",
    relatedPages: [
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/monitor-sem-sinal-curitiba", label: "Monitor Sem Sinal" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver" },
      { to: "/servicos/redes-wifi", label: "Redes e Infraestrutura" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Dual Monitor: Guia Completo\n\n### Tipos de Conexão de Vídeo\n\n| Conexão | Resolução Máx | Áudio | Melhor Para |\n|---|---|---|---|\n| VGA | 1920x1080 | Não | Monitores antigos |\n| DVI-D | 2560x1600 | Não | Desktop |\n| HDMI 2.0 | 4K 60Hz | Sim | Uso geral |\n| HDMI 2.1 | 4K 120Hz | Sim | Gaming |\n| DisplayPort 1.4 | 4K 120Hz | Sim | Produtividade |\n| USB-C/Thunderbolt | 5K 60Hz | Sim | Notebooks modernos |\n\n### Atalhos Úteis para Dual Monitor\n\n| Atalho | Função |\n|---|---|\n| Win + P | Alternar modo (Duplicar/Estender) |\n| Win + Shift + ← ou → | Mover janela entre monitores |\n| Win + ↑ | Maximizar janela no monitor atual |\n| Win + ← ou → | Snap janela para metade da tela |\n\n### Configuração Ideal por Uso\n\n| Uso | Resolução Ideal | Tamanho | Painel |\n|---|---|---|---|\n| Escritório/Office | Full HD (1080p) | 24" | IPS |\n| Design/Foto | QHD (1440p) ou 4K | 27" | IPS sRGB 99%+ |\n| Programação | QHD (1440p) | 27" | IPS |\n| Gaming | Full HD ou QHD | 24-27" | IPS 144Hz+ |`
  },

  // ==================== ERRO ATUALIZAÇÃO WINDOWS 11 ====================
  {
    slug: "erro-atualizacao-windows-11-curitiba",
    title: "Erro na Atualização do Windows 11 em Curitiba | Técnico Especialista",
    metaDescription: "Erro ao atualizar o Windows 11? Atualização travada, falha de instalação ou PC incompatível? Técnico em Curitiba resolve problemas de update com segurança.",
    h1: "Erro na Atualização do Windows 11 — Diagnóstico e Correção em Curitiba",
    categoria: "Software — Windows",
    intro: `Atualizações do Windows 11 são essenciais para segurança e desempenho, mas frequentemente causam dor de cabeça: atualizações que travam em uma porcentagem, erros com códigos incompreensíveis (0x80070002, 0x800f081f), PC que não inicia após update ou a mensagem temida "Desfazendo alterações, não desligue o computador".\n\nO Windows 11 trouxe requisitos de hardware mais rígidos (TPM 2.0, Secure Boot, processador compatível), e muitos PCs que rodavam Windows 10 perfeitamente enfrentam bloqueios ou instabilidade ao tentar migrar ou atualizar. Além disso, atualizações cumulativas mensais podem conflitar com drivers, softwares de terceiros ou configurações específicas.\n\nEm Curitiba, atendemos diariamente problemas de atualização — desde updates mensais que falham até migrações completas do Windows 10 para 11. Nosso diagnóstico identifica a causa exata e resolve sem perda de dados.`,
    sintomas: [
      { titulo: "Atualização trava em porcentagem fixa", desc: "O update fica parado em 20%, 45%, 73% ou 99% por horas. Pode ser conflito de driver, espaço em disco insuficiente ou arquivo de update corrompido.", gravidade: "Média" },
      { titulo: "Erro com código (0x80070002, 0x800f081f, etc.)", desc: "Windows exibe código de erro e a atualização falha. Cada código indica uma causa diferente — arquivo corrompido, serviço parado ou componente ausente.", gravidade: "Média" },
      { titulo: "'Desfazendo alterações' em loop", desc: "O PC reinicia mostrando 'Desfazendo alterações, não desligue' e fica em loop. A atualização falhou e o Windows tenta reverter sem sucesso.", gravidade: "Alta" },
      { titulo: "PC não inicia após atualização", desc: "Tela azul, tela preta ou loop de reparo automático após instalar update. A atualização corrompeu drivers ou arquivos do sistema.", gravidade: "Alta" },
      { titulo: "Mensagem 'Este PC não atende aos requisitos'", desc: "O Windows 11 exige TPM 2.0, Secure Boot e processador compatível. PCs de antes de 2018 geralmente são bloqueados.", gravidade: "Média" },
      { titulo: "Espaço insuficiente para atualização", desc: "Windows pede 20-64 GB livres para updates maiores. Em SSDs de 128 GB, o espaço acaba rapidamente com cache de update.", gravidade: "Baixa-Média" }
    ],
    causas: [
      { titulo: "Cache de Windows Update corrompido", desc: "A pasta SoftwareDistribution acumula arquivos de updates anteriores que podem se corromper e bloquear novas atualizações.", tipo: "software" },
      { titulo: "Driver incompatível com a nova versão", desc: "Drivers de vídeo, áudio ou rede antigos podem conflitar com a atualização, causando tela azul ou falha na instalação.", tipo: "software" },
      { titulo: "Espaço em disco insuficiente", desc: "Updates grandes (feature updates) precisam de 20-64 GB livres. SSDs de 128 GB frequentemente não têm espaço suficiente.", tipo: "software" },
      { titulo: "Hardware não atende requisitos do Windows 11", desc: "TPM 2.0 não presente ou desabilitado, Secure Boot desligado ou processador fora da lista de compatibilidade da Microsoft.", tipo: "hardware" },
      { titulo: "Software de segurança bloqueando o update", desc: "Antivírus de terceiros (Avast, Kaspersky, Norton) podem interferir no processo de atualização, corrompendo arquivos durante a instalação.", tipo: "software" },
      { titulo: "Arquivos de sistema corrompidos", desc: "Erros pré-existentes nos arquivos do Windows (detectáveis com SFC /scannow e DISM) impedem que updates se instalem corretamente.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de cache de update + reset de componentes do Windows Update + reinstalação do update. Resolve 60% dos casos.", tempo: "1-2 horas", custo: "R$ 100–200" },
      { nivel: "Médio", desc: "Reparo de arquivos de sistema (SFC + DISM) + atualização de drivers + resolução de erros específicos por código.", tempo: "2-4 horas", custo: "R$ 200–350" },
      { nivel: "Complexo", desc: "Repair install do Windows 11 (mantém dados e programas) + resolução de incompatibilidades de hardware/TPM.", tempo: "3-6 horas", custo: "R$ 300–500" }
    ],
    riscos: [
      "Desligar o PC durante atualização pode corromper o Windows permanentemente",
      "Forçar instalação do Windows 11 em hardware incompatível pode causar instabilidade crônica",
      "Ignorar atualizações de segurança deixa o PC vulnerável a malware e ransomware",
      "Resetar o Windows Update incorretamente pode quebrar o sistema de updates permanentemente",
      "Antivírus de terceiros podem corromper arquivos de sistema durante o update",
      "Updates grandes podem apagar programas instalados sem aviso prévio"
    ],
    diagnostico: `Diagnóstico de atualização do Windows 11:\n\n1. Verificação de código de erro específico e causa catalogada\n2. Análise de logs do Windows Update (CBS.log, WindowsUpdate.log)\n3. Verificação de espaço em disco e saúde do SSD/HD\n4. Teste de integridade do sistema (SFC /scannow + DISM)\n5. Verificação de compatibilidade de hardware (TPM, Secure Boot, CPU)\n6. Identificação de drivers e softwares conflitantes\n\nCusto: R$ 90 (incorporado se aprovar o serviço).`,
    solucao: `Solução conforme o problema:\n\n- **Cache corrompido**: Reset da pasta SoftwareDistribution + reinício dos serviços de update\n- **Arquivos de sistema**: Reparo com SFC /scannow + DISM /RestoreHealth\n- **Drivers**: Atualização prévia de todos os drivers críticos antes do update\n- **Espaço**: Limpeza de disco + remoção de updates antigos + Storage Sense\n- **Incompatibilidade**: Configuração de TPM na BIOS + habilitação de Secure Boot\n- **Loop**: Boot em modo de segurança + desinstalação do update problemático\n\nVerificação completa de funcionamento do sistema após a atualização bem-sucedida.`,
    quandoCompensa: "Sempre — manter o Windows atualizado é essencial para segurança. O custo de R$ 100-350 evita problemas maiores no futuro.",
    quandoNaoCompensa: "Quando o hardware é incompatível com Windows 11 e o PC roda bem com Windows 10 (que terá suporte até outubro de 2025). Nesse caso, usar o 10 até planejar upgrade.",
    whatsappMessage: "Olá! Estou com erro ao atualizar o Windows 11. Podem me ajudar?",
    relatedPages: [
      { to: "/windows-travando-na-atualizacao-curitiba", label: "Windows Travando na Atualização" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Atualização do Windows 11: Guia Completo\n\n### Requisitos Mínimos do Windows 11\n\n| Componente | Requisito |\n|---|---|\n| Processador | 1 GHz, 2+ núcleos, 64-bit compatível |\n| RAM | 4 GB (recomendado 8 GB) |\n| Armazenamento | 64 GB livres |\n| TPM | Versão 2.0 |\n| Secure Boot | Habilitado |\n| Placa de vídeo | DirectX 12 com WDDM 2.0 |\n| Tela | 720p, 9" ou maior |\n\n### Códigos de Erro Comuns e Soluções\n\n| Código | Significado | Solução |\n|---|---|---|\n| 0x80070002 | Arquivo não encontrado | Limpar cache do WU |\n| 0x800f081f | Componente ausente | DISM /RestoreHealth |\n| 0x80240034 | Download falhou | Reset do WU + tentar novamente |\n| 0xC1900101 | Erro de driver | Atualizar drivers antes |\n| 0x80070070 | Espaço insuficiente | Liberar disco |\n\n### Como Limpar Cache do Windows Update\n\n\`\`\`\nnet stop wuauserv\nnet stop cryptSvc\nnet stop bits\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nren C:\\Windows\\System32\\catroot2 catroot2.old\nnet start wuauserv\nnet start cryptSvc\nnet start bits\n\`\`\`\n\n### Como Verificar TPM 2.0\n\n1. Pressione **Win + R** → digite **tpm.msc** → Enter\n2. Se mostrar "TPM está pronto para uso" e versão 2.0 → OK\n3. Se não encontrar: verifique na BIOS (Security → TPM → Enable)`
  },

  // ==================== COMPUTADOR COM CHEIRO DE QUEIMADO ====================
  {
    slug: "computador-com-cheiro-de-queimado-curitiba",
    title: "Computador com Cheiro de Queimado em Curitiba | Emergência Técnica",
    metaDescription: "Computador com cheiro de queimado? DESLIGUE IMEDIATAMENTE. Técnico em Curitiba diagnostica componente queimado (fonte, placa-mãe, capacitor) com urgência.",
    h1: "Computador com Cheiro de Queimado — Atendimento de Emergência em Curitiba",
    categoria: "Hardware — Emergência",
    intro: `Se seu computador está exalando cheiro de queimado, a primeira e mais importante ação é: DESLIGUE DA TOMADA IMEDIATAMENTE. Não desligue pelo botão — puxe o cabo de força da parede. Cheiro de queimado em eletrônico indica que algum componente está superaquecendo perigosamente ou já queimou, e continuar com o PC ligado pode causar danos em cadeia, incêndio ou choque elétrico.\n\nOs cheiros mais comuns são: plástico queimando (geralmente isolamento de fio ou conector derretendo), cheiro químico acre (capacitor estufando ou vazando eletrólito) e cheiro de metal quente (componente eletrônico queimando). Cada tipo de cheiro aponta para uma causa diferente.\n\nEm Curitiba, tratamos cheiro de queimado como atendimento de emergência. Após quedas de energia (frequentes durante tempestades), picos de tensão e uso de fontes de alimentação baratas, componentes podem queimar silenciosamente e o cheiro é o primeiro — e às vezes único — aviso antes de uma falha catastrófica.`,
    sintomas: [
      { titulo: "Cheiro de plástico queimando", desc: "Isolamento de fios, conectores Molex/SATA ou plástico do gabinete derretendo por calor excessivo. DESLIGUE IMEDIATAMENTE.", gravidade: "Crítica" },
      { titulo: "Cheiro químico acre (vinagre/azedo)", desc: "Capacitor eletrolítico estufando ou vazando. O eletrólito tem cheiro característico. Comum em fontes baratas e placas-mãe com mais de 5 anos.", gravidade: "Crítica" },
      { titulo: "Fumaça visível saindo do gabinete", desc: "Fumaça indica combustão ativa. DESLIGUE DA TOMADA (não pelo botão), afaste-se e ventile o ambiente. Não abra o gabinete enquanto houver fumaça.", gravidade: "Crítica" },
      { titulo: "Cheiro de queimado após queda de energia", desc: "Pico de tensão ao retornar a energia pode queimar fonte, placa-mãe ou outros componentes. Não religue sem diagnóstico.", gravidade: "Alta" },
      { titulo: "PC funciona mas com cheiro constante", desc: "O cheiro persiste durante o uso normal. Pode ser poeira acumulada queimando no dissipador ou componente no limite térmico.", gravidade: "Média-Alta" },
      { titulo: "Cheiro apenas durante uso pesado (jogos, renderização)", desc: "Aparece só sob carga alta. Pode ser GPU superaquecendo, VRMs da placa-mãe no limite ou fonte subdimensionada.", gravidade: "Média-Alta" }
    ],
    causas: [
      { titulo: "Capacitor eletrolítico estufado/vazando", desc: "Capacitores em fontes e placas-mãe podem estufar (topo abaulado) e vazar eletrólito por calor excessivo, idade ou fabricação defeituosa. Cheiro ácido característico.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação barata ou subdimensionada", desc: "Fontes sem certificação 80 Plus usam componentes de baixa qualidade que falham sob carga. Pior cenário: curto-circuito que danifica todo o PC.", tipo: "hardware" },
      { titulo: "Pico de tensão na rede elétrica", desc: "Raios, oscilações e retorno de energia após queda podem enviar voltagem acima do normal. Sem protetor de surto ou nobreak, componentes queimam.", tipo: "hardware" },
      { titulo: "Poeira acumulada em componentes quentes", desc: "Poeira depositada em dissipadores, VRMs e reguladores de tensão pode carbonizar com o calor, gerando cheiro de queimado sem necessariamente haver dano.", tipo: "desgaste" },
      { titulo: "Conector Molex/SATA derretendo", desc: "Conectores de alimentação Molex e SATA com mau contato geram calor no ponto de conexão, derretendo o plástico. Adaptadores Molex-SATA são notórios por isso.", tipo: "hardware" },
      { titulo: "VRM da placa-mãe sobrecarregado", desc: "Os reguladores de tensão (VRMs) que alimentam o processador podem sobrecarregar com CPUs de alto consumo ou overclock, gerando calor extremo.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza de poeira carbonizada + verificação de todos os componentes. Nenhum dano real — apenas acúmulo de sujeira em peças quentes.", tempo: "1-2 horas", custo: "R$ 100–200" },
      { nivel: "Médio", desc: "Troca de fonte queimada ou capacitor estufado + verificação de danos colaterais em outros componentes.", tempo: "2-4 horas", custo: "R$ 200–500" },
      { nivel: "Complexo", desc: "Múltiplos componentes queimados (fonte + placa-mãe + possível GPU). Avaliação de viabilidade de reparo vs troca.", tempo: "2-5 dias", custo: "R$ 400–1500+" }
    ],
    riscos: [
      "RISCO DE INCÊNDIO: componente em combustão pode causar fogo no gabinete e se espalhar",
      "RISCO DE CHOQUE: componente queimado pode expor partes energizadas",
      "Continuar usando pode queimar componentes saudáveis por efeito cascata",
      "Fonte queimada pode enviar tensão errada para placa-mãe, RAM e GPU, destruindo tudo",
      "Inalação de fumaça de eletrônico é tóxica — ventile o ambiente imediatamente",
      "Capacitor vazando pode corroer trilhas da placa-mãe se não limpo rapidamente"
    ],
    diagnostico: `Diagnóstico de emergência (com PC DESLIGADO da tomada):\n\n1. Inspeção visual completa: componentes queimados, estufados, derretidos\n2. Teste de cheiro isolado (qual componente exala o odor)\n3. Verificação de capacitores em fonte e placa-mãe (visual + multímetro)\n4. Teste de fonte isolada (sem conectar na placa-mãe)\n5. Verificação de conectores (Molex, SATA, EPS, PCIe) — derretidos/escurecidos\n6. Teste individual de cada componente em bancada limpa\n\nCusto: R$ 100 (incorporado se aprovar o serviço). Atendimento prioritário.`,
    solucao: `Solução conforme a causa:\n\n- **Poeira**: Limpeza profunda completa + verificação térmica de todos os componentes\n- **Capacitor**: Troca de capacitor por técnico em eletrônica (quando viável) ou troca da placa\n- **Fonte**: Troca por fonte 80 Plus Bronze/Gold certificada + instalação de protetor de surto\n- **Conector**: Troca do cabo de alimentação danificado + verificação de todos os conectores\n- **VRM**: Verificação de compatibilidade CPU/placa + melhoria de refrigeração dos VRMs\n\nInstalação de protetor de surto ou nobreak recomendada para evitar recorrência.\n\nTeste de estabilidade prolongado (2h+) com monitoramento térmico após o reparo.`,
    quandoCompensa: "Quando apenas a fonte ou um capacitor queimou e os demais componentes estão intactos. Diagnóstico rápido evita gastar com peças desnecessárias.",
    quandoNaoCompensa: "Quando fonte, placa-mãe e GPU queimaram juntas em efeito cascata. O custo de reparo pode ultrapassar o valor de um PC novo equivalente.",
    whatsappMessage: "Olá! Meu computador está com cheiro de queimado. URGENTE — podem me ajudar?",
    relatedPages: [
      { to: "/fonte-queimada-curitiba", label: "Fonte Queimada" },
      { to: "/placa-mae-com-defeito-curitiba", label: "Placa-Mãe com Defeito" },
      { to: "/computador-desligando-apos-segundos-curitiba", label: "PC Desligando em Segundos" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/como-funciona", label: "Como Funciona" },
      { to: "/precos-e-politicas", label: "Preços e Políticas" }
    ],
    conteudoExtra: `## Cheiro de Queimado no PC: Guia de Emergência\n\n### O Que Fazer IMEDIATAMENTE\n\n1. 🔴 **DESLIGUE DA TOMADA** (puxe o cabo, não use o botão)\n2. 🔴 **AFASTE-SE** se houver fumaça — ventile o ambiente\n3. ❌ **NÃO ABRA** o gabinete enquanto houver fumaça ou calor\n4. ❌ **NÃO RELIGUE** sem diagnóstico profissional\n5. ✅ **AGUARDE** esfriar completamente (30+ minutos)\n6. ✅ **PROCURE** técnico especializado\n\n### Identificando o Componente pelo Cheiro\n\n| Cheiro | Componente Provável |\n|---|---|\n| Plástico derretendo | Conector Molex/SATA, cabo |\n| Químico acre/vinagre | Capacitor estufado |\n| Metal quente | VRM, regulador, chip |\n| Borracha queimando | Fio de alimentação |\n| Poeira queimando | Dissipador sujo (menos grave) |\n\n### Prevenção: Como Proteger Seu PC\n\n| Proteção | Custo | Protege Contra |\n|---|---|---|\n| Filtro de linha básico | R$ 20-50 | Nada (não protege de verdade) |\n| Protetor de surto (DPS) | R$ 50-150 | Picos de tensão |\n| Estabilizador | R$ 100-300 | Oscilações leves |\n| Nobreak (UPS) | R$ 300-1000 | Queda + pico + estabilização |\n\n⚠️ **Filtro de linha NÃO É protetor de surto** — a maioria dos filtros baratos não tem proteção real contra picos.`
  },

  // ─── notebook-bateria-nao-carrega-curitiba ───
  {
    slug: "notebook-bateria-nao-carrega-curitiba",
    title: "Notebook Não Carrega a Bateria em Curitiba | Diagnóstico Especializado",
    metaDescription: "Notebook não carrega a bateria? Técnico em Curitiba diagnostica problemas no carregador, conector DC, chip de carga e bateria com laudo profissional.",
    h1: "Notebook Não Carrega a Bateria — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware",
    intro: `Seu notebook está conectado na tomada, mostra "conectado, sem carregar" ou simplesmente não reconhece o carregador? Esse é um dos problemas mais comuns em notebooks com mais de 2 anos de uso e pode ter causas simples (cabo danificado) ou complexas (chip de gerenciamento de carga queimado).

Em Curitiba, atendemos dezenas de casos por mês de notebooks que não carregam. O problema pode estar no carregador, no conector DC-in do notebook, na placa-mãe (circuito de carga) ou na própria bateria. Sem diagnóstico correto, muitos usuários trocam peças desnecessariamente.

A bateria de íon-lítio tem vida útil de 300 a 500 ciclos completos. Após esse período, sua capacidade cai significativamente. Mas antes de trocar a bateria, é fundamental verificar se o problema não está no carregador ou no circuito de carga da placa-mãe — caso contrário, a bateria nova também não carregará.`,
    whatsappMessage: "Olá! Meu notebook não está carregando a bateria. Gostaria de agendar um diagnóstico.",
    sintomas: [
      { titulo: "Mensagem 'Conectado, sem carregar'", desc: "O Windows reconhece o carregador mas a bateria não carrega. Pode indicar bateria no fim da vida útil, driver corrompido ou problema no chip de carga.", gravidade: "Médio" },
      { titulo: "LED de carga não acende", desc: "O indicador luminoso de carregamento não liga ao conectar o carregador. Problema pode ser no carregador, cabo ou conector DC-in.", gravidade: "Médio" },
      { titulo: "Bateria trava em percentual fixo", desc: "A bateria fica parada em 0%, 50% ou outro valor e não avança. Indica célula defeituosa ou controlador BMS com falha.", gravidade: "Alto" },
      { titulo: "Notebook só funciona na tomada", desc: "Ao desconectar o carregador, o notebook desliga imediatamente. Bateria completamente degradada ou desconectada internamente.", gravidade: "Alto" },
      { titulo: "Carregador esquenta excessivamente", desc: "A fonte de alimentação fica muito quente e para de fornecer energia. Pode indicar curto interno no carregador ou consumo anormal do notebook.", gravidade: "Alto" },
      { titulo: "Carga intermitente", desc: "A bateria carrega e para, carrega e para, de forma aleatória. Conector DC-in com mau contato ou cabo do carregador danificado internamente.", gravidade: "Médio" }
    ],
    causas: [
      { titulo: "Carregador defeituoso ou incompatível", desc: "Carregadores genéricos com voltagem/amperagem errada não fornecem energia suficiente. Cabos com rompimento interno são causa frequente.", tipo: "hardware" },
      { titulo: "Conector DC-in danificado", desc: "O conector onde o carregador é plugado se desgasta com o tempo, causando mau contato. Em muitos modelos é soldado à placa-mãe.", tipo: "desgaste" },
      { titulo: "Bateria com ciclos esgotados", desc: "Baterias de lítio perdem capacidade após 300-500 ciclos. Software como BatteryInfoView mostra o desgaste real (wear level).", tipo: "desgaste" },
      { titulo: "Chip de gerenciamento de carga (BQ chip)", desc: "O CI responsável por controlar a carga da bateria na placa-mãe pode queimar por picos de energia ou uso de carregadores incompatíveis.", tipo: "hardware" },
      { titulo: "Driver ACPI corrompido", desc: "O driver de gerenciamento de energia do Windows pode corromper e impedir o reconhecimento correto da bateria.", tipo: "software" },
      { titulo: "Oxidação nos contatos da bateria", desc: "Umidade e tempo causam oxidação nos terminais de contato entre a bateria e a placa-mãe, interrompendo a comunicação.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Problema no carregador ou driver — substituição do carregador ou reinstalação do driver ACPI resolve.", tempo: "1-2 horas", custo: "R$80–R$200" },
      { nivel: "Médio", desc: "Conector DC-in com mau contato — necessita dessoldar e ressoldar ou substituir o conector. Ou troca de bateria.", tempo: "2-4 horas", custo: "R$150–R$400" },
      { nivel: "Complexo", desc: "Chip de gerenciamento de carga queimado na placa-mãe — reparo de micro-solda BGA com estação profissional.", tempo: "3-7 dias", custo: "R$300–R$700" }
    ],
    riscos: [
      "Usar carregador genérico com especificações erradas pode queimar o chip de carga da placa-mãe",
      "Bateria completamente degradada pode inchar e danificar o chassi ou a tela do notebook",
      "Ignorar o problema pode causar desligamentos abruptos e perda de dados",
      "Tentativas de reparo sem experiência podem danificar o conector soldado à placa-mãe"
    ],
    diagnostico: `O diagnóstico de carregamento envolve múltiplas etapas: teste do carregador com multímetro (voltagem e amperagem de saída), inspeção do conector DC-in com lupa e teste de continuidade, verificação do estado da bateria via software (ciclos, wear level, voltagem das células) e análise do circuito de carga na placa-mãe.

Utilizamos carregadores de referência para isolar o problema e ferramentas de diagnóstico de bateria que mostram a saúde real das células. Em casos de suspeita de chip de carga, usamos osciloscópio para verificar os sinais de controle.`,
    solucao: `A solução depende da causa raiz identificada no diagnóstico:

Para carregadores defeituosos, recomendamos sempre fontes originais ou compatíveis homologadas com a voltagem e amperagem corretas para o modelo.

Conectores DC-in são reparados com estação de solda — em modelos onde o conector é separado da placa, a troca é simples. Quando soldado à placa-mãe, requer micro-solda.

Baterias degradadas são substituídas por células compatíveis. Verificamos o Part Number original para garantir compatibilidade física e elétrica.

Problemas no chip de carga (BQ24xxx, ISL6xxx, etc.) exigem reballing ou substituição do componente SMD com estação BGA profissional.`,
    quandoCompensa: "Notebooks com menos de 4 anos, quando o problema é carregador, conector ou bateria. Mesmo reparo de chip de carga compensa se o notebook vale mais de R$2.500.",
    quandoNaoCompensa: "Notebooks muito antigos (7+ anos) com placa-mãe danificada em múltiplos pontos. O custo do reparo pode ultrapassar o valor do equipamento.",
    conteudoExtra: `## Dicas para Preservar a Bateria do Notebook

### Cuidados no Dia a Dia
- Mantenha a carga entre 20% e 80% sempre que possível
- Evite usar o notebook em superfícies que bloqueiem a ventilação
- Use sempre carregadores originais ou homologados
- Em uso fixo prolongado, alguns fabricantes oferecem modo de "carga limitada" na BIOS

### Sinais de Bateria Inchada
Se o touchpad começar a ficar alto, a base do notebook não fechar direito ou você notar uma protuberância na parte inferior, **desligue imediatamente** e procure assistência. Baterias inchadas são risco de incêndio.

### Verificando a Saúde da Bateria
No Windows, execute no Prompt de Comando como administrador:
\`powercfg /batteryreport\`
O relatório mostra a capacidade original vs. atual e o número de ciclos.`,
    relatedPages: [
      { to: "/computador-desligando-sozinho-curitiba", label: "PC Desligando Sozinho" },
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/computador-com-cheiro-de-queimado-curitiba", label: "Cheiro de Queimado" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD e Memória" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" }
    ]
  },

  // ─── pc-com-pop-ups-e-propagandas-curitiba ───
  {
    slug: "pc-com-pop-ups-e-propagandas-curitiba",
    title: "PC com Pop-ups e Propagandas em Curitiba | Remoção de Adware",
    metaDescription: "Computador cheio de pop-ups e propagandas? Técnico em Curitiba remove adware, browser hijackers e PUPs com limpeza profunda e proteção contra reinfecção.",
    h1: "PC com Pop-ups e Propagandas — Remoção Profissional em Curitiba",
    categoria: "Software / Segurança",
    intro: `Seu computador abriu uma enxurrada de pop-ups, propagandas em sites que antes não tinham, barras de ferramentas estranhas no navegador ou a página inicial mudou sozinha? Esses são sintomas clássicos de adware e browser hijackers — softwares indesejados que se instalam silenciosamente e bombardeiam você com publicidade.

Diferente de vírus tradicionais que danificam arquivos, adwares são projetados para gerar receita publicitária às custas do seu conforto e privacidade. Eles rastreiam seus hábitos de navegação, redirecionam buscas para sites patrocinados e podem abrir portas para ameaças mais graves como ransomware e trojans.

Em Curitiba, esse é um dos problemas mais frequentes que atendemos. Muitas vezes o adware chega junto com programas "gratuitos" baixados da internet, extensões de navegador maliciosas ou cliques em links suspeitos. A remoção completa exige mais do que um antivírus — é necessário limpar registros, extensões, tarefas agendadas e políticas de grupo.`,
    whatsappMessage: "Olá! Meu computador está cheio de pop-ups e propagandas. Preciso de ajuda para remover.",
    sintomas: [
      { titulo: "Pop-ups constantes mesmo sem navegador aberto", desc: "Janelas de propaganda aparecem na área de trabalho. Indica adware instalado como serviço do sistema ou tarefa agendada.", gravidade: "Alto" },
      { titulo: "Página inicial do navegador alterada", desc: "O Google foi substituído por um buscador desconhecido (Hao123, Delta Search, etc.). Browser hijacker modificou as configurações.", gravidade: "Médio" },
      { titulo: "Propagandas inseridas em sites limpos", desc: "Banners e links patrocinados aparecem em sites como Google e Wikipedia. Extensão maliciosa injetando anúncios nas páginas.", gravidade: "Alto" },
      { titulo: "Navegador abrindo abas sozinho", desc: "Novas abas com sites de apostas, downloads ou conteúdo adulto abrem automaticamente. Redirecionamento por script malicioso.", gravidade: "Alto" },
      { titulo: "Computador lento após infecção", desc: "O adware consome CPU e memória para exibir propagandas, tornando o sistema visivelmente mais lento.", gravidade: "Médio" },
      { titulo: "Barras de ferramentas desconhecidas", desc: "Toolbars como Ask, Babylon ou Conduit aparecem no navegador sem terem sido instaladas conscientemente.", gravidade: "Médio" }
    ],
    causas: [
      { titulo: "Download de programas com bundleware", desc: "Instaladores de programas gratuitos incluem adware nas opções 'Recomendado' ou 'Express'. Clicar em 'Avançar' sem ler instala tudo.", tipo: "erro-humano" },
      { titulo: "Extensões maliciosas de navegador", desc: "Extensões que prometem funcionalidades úteis mas na verdade injetam propagandas e rastreiam navegação.", tipo: "software" },
      { titulo: "Clique em anúncios enganosos", desc: "Botões falsos de 'Download' ou 'Fechar' em sites de pirataria que na verdade instalam adware.", tipo: "erro-humano" },
      { titulo: "Cracks e keygens infectados", desc: "Ativadores piratas de software frequentemente contêm adware, spyware e trojans embutidos.", tipo: "software" },
      { titulo: "Políticas de grupo (GPO) alteradas", desc: "Adwares avançados modificam políticas de grupo do Windows para impedir a remoção e forçar configurações do navegador.", tipo: "software" },
      { titulo: "Notificações push aceitas acidentalmente", desc: "Sites que pedem para 'Permitir notificações' e depois enviam spam de propaganda pelo sistema de notificações do navegador.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Adware superficial — remoção de extensões, limpeza de navegadores e desinstalação de PUPs. Caso resolva.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Adware persistente com tarefas agendadas, GPO alterado e múltiplos navegadores infectados. Limpeza profunda necessária.", tempo: "2-4 horas", custo: "R$150–R$250" },
      { nivel: "Complexo", desc: "Infecção combinada (adware + trojan + rootkit). Pode exigir formatação com backup seletivo e reinstalação limpa.", tempo: "4-8 horas", custo: "R$200–R$350" }
    ],
    riscos: [
      "Adware pode evoluir para spyware que rouba senhas e dados bancários",
      "Pop-ups podem redirecionar para sites de phishing e golpes financeiros",
      "Extensões maliciosas têm acesso a tudo que você digita no navegador, incluindo senhas",
      "Ignorar a infecção permite que mais malware seja baixado silenciosamente"
    ],
    diagnostico: `O diagnóstico de adware é minucioso e envolve: verificação de programas instalados (lista de PUPs conhecidos), análise de extensões em todos os navegadores (Chrome, Firefox, Edge), inspeção de tarefas agendadas no Windows, verificação de políticas de grupo (GPO), análise do arquivo HOSTS e das configurações de proxy.

Utilizamos ferramentas especializadas como AdwCleaner, Malwarebytes, HitmanPro e FRST (Farbar Recovery Scan Tool) para identificar todos os componentes da infecção. O relatório do FRST mostra modificações em registros, serviços e tarefas que antivírus comuns não detectam.`,
    solucao: `A remoção profissional de adware segue um protocolo rigoroso:

1. Desinstalação de todos os PUPs (Programas Potencialmente Indesejados) pelo Painel de Controle e ferramentas especializadas.

2. Remoção de extensões maliciosas de todos os navegadores instalados e reset das configurações (página inicial, buscador padrão, proxy).

3. Limpeza de tarefas agendadas, serviços e entradas de registro criadas pelo adware.

4. Restauração de políticas de grupo (GPO) ao padrão do Windows.

5. Verificação e limpeza do arquivo HOSTS e configurações de DNS.

6. Instalação de bloqueador de anúncios (uBlock Origin) e configuração de proteção contra notificações push indesejadas.

7. Orientação ao usuário sobre práticas seguras de download e navegação para evitar reinfecção.`,
    quandoCompensa: "Sempre compensa remover adware — o custo é baixo e os riscos de não agir são altos (roubo de dados, phishing, mais infecções).",
    quandoNaoCompensa: "Se o sistema já está comprometido com múltiplos tipos de malware (rootkits, ransomware), pode ser mais eficiente formatar e reinstalar o Windows.",
    conteudoExtra: `## Como Evitar Adware e Pop-ups

### Regras de Ouro
1. **Nunca clique em "Avançar" sem ler** — sempre escolha instalação "Personalizada" ou "Avançada"
2. **Baixe apenas de fontes oficiais** — site do fabricante ou lojas de apps verificadas
3. **Use uBlock Origin** — o melhor bloqueador de anúncios gratuito para navegadores
4. **Nunca aceite notificações push** de sites desconhecidos
5. **Evite cracks e keygens** — são a principal porta de entrada para malware

### O Que Fazer se Já Está Infectado
- Não clique em nenhum pop-up, nem no botão "X" — use o Gerenciador de Tarefas para fechar
- Não insira senhas ou dados bancários até o computador ser limpo
- Procure assistência técnica profissional para remoção completa`,
    relatedPages: [
      { to: "/remocao-virus-malware-curitiba", label: "Remoção de Vírus" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/remocao-virus", label: "Serviço Remoção de Vírus" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" }
    ]
  },

  // ─── erro-0x0000007b-curitiba ───
  {
    slug: "erro-0x0000007b-curitiba",
    title: "Erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE) Curitiba | Reparo Especializado",
    metaDescription: "Erro 0x0000007B INACCESSIBLE_BOOT_DEVICE? Técnico em Curitiba resolve tela azul na inicialização com diagnóstico de disco, BIOS e drivers de armazenamento.",
    h1: "Erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE) — Reparo em Curitiba",
    categoria: "Software / Hardware",
    intro: `O erro 0x0000007B — também conhecido como INACCESSIBLE_BOOT_DEVICE — é uma das telas azuis (BSOD) mais temidas do Windows. Ele aparece durante a inicialização e impede completamente o carregamento do sistema operacional. A tela exibe a mensagem "Your PC ran into a problem" seguida do código de parada INACCESSIBLE_BOOT_DEVICE.

Esse erro significa que o Windows não consegue acessar o dispositivo de armazenamento (HD ou SSD) onde está instalado. As causas vão desde configurações erradas na BIOS (modo AHCI/IDE) até falhas físicas no disco, cabo SATA danificado ou drivers de armazenamento corrompidos.

Em Curitiba, esse é um erro frequente após atualizações do Windows, troca de placa-mãe, clonagem de disco mal-feita ou quando o HD/SSD começa a apresentar defeitos. Sem diagnóstico correto, tentativas de reparo podem piorar a situação e até causar perda de dados.`,
    whatsappMessage: "Olá! Meu computador está dando erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE). Preciso de ajuda.",
    sintomas: [
      { titulo: "Tela azul com código 0x0000007B na inicialização", desc: "O Windows não chega a carregar e exibe a BSOD com o código de parada. Sistema completamente inacessível.", gravidade: "Alto" },
      { titulo: "Loop de reparo automático", desc: "O Windows tenta reparar a inicialização repetidamente sem sucesso, alternando entre tela azul e tela de reparo.", gravidade: "Alto" },
      { titulo: "Erro após atualização do Windows", desc: "O sistema funcionava normalmente, atualizou e na próxima reinicialização deu o erro 0x0000007B.", gravidade: "Médio" },
      { titulo: "Erro após troca de hardware", desc: "Trocou placa-mãe, adicionou SSD ou alterou configurações da BIOS e o erro começou.", gravidade: "Médio" },
      { titulo: "Erro intermitente", desc: "O computador às vezes inicia normalmente e às vezes dá o erro. Indica problema físico no disco ou cabo SATA.", gravidade: "Alto" },
      { titulo: "Disco não aparece na BIOS", desc: "Além do erro no Windows, a própria BIOS não detecta o HD/SSD. Indica falha física grave.", gravidade: "Alto" }
    ],
    causas: [
      { titulo: "Modo SATA alterado na BIOS (AHCI/IDE/RAID)", desc: "A mudança do modo de operação SATA na BIOS sem preparar o Windows causa o erro porque os drivers de armazenamento são incompatíveis.", tipo: "software" },
      { titulo: "Drivers de armazenamento corrompidos", desc: "O driver iaStorV, storahci ou outro driver de controladora de disco pode corromper após atualização falha ou malware.", tipo: "software" },
      { titulo: "Cabo SATA defeituoso", desc: "Cabo SATA com mau contato ou rompimento interno impede a comunicação estável entre a placa-mãe e o disco.", tipo: "hardware" },
      { titulo: "HD/SSD com setores defeituosos no boot", desc: "Setores ruins na área de inicialização do disco impedem a leitura dos arquivos de boot do Windows.", tipo: "hardware" },
      { titulo: "BCD (Boot Configuration Data) corrompido", desc: "O registro de inicialização do Windows foi danificado, apontando para um dispositivo incorreto ou inexistente.", tipo: "software" },
      { titulo: "Clonagem de disco mal-feita", desc: "Ao clonar um HD para SSD sem ajustar o modo SATA ou o esquema de partição (MBR/GPT), o boot falha.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Configuração BIOS incorreta (AHCI/IDE) — ajuste na BIOS e/ou ativação do driver correto via registro offline resolve.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "BCD corrompido ou drivers danificados — reparo via WinPE com bootrec, bcdedit e injeção de drivers.", tempo: "2-4 horas", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Disco com falha física — necessita substituição do disco, reinstalação do Windows e recuperação de dados.", tempo: "4-24 horas", custo: "R$250–R$600" }
    ],
    riscos: [
      "Tentativas de reparo sem conhecimento podem sobrescrever o BCD e tornar a recuperação impossível",
      "Alterar configurações na BIOS aleatoriamente pode agravar o problema",
      "Se o disco tem defeito físico, cada tentativa de boot pode danificar mais setores",
      "Formatação sem diagnóstico correto não resolve se o problema é hardware"
    ],
    diagnostico: `O diagnóstico do erro 0x0000007B segue uma sequência lógica:

1. Verificação da BIOS: modo SATA (AHCI/IDE/RAID), ordem de boot e detecção do disco.

2. Boot via WinPE ou Linux Live para acessar o disco sem depender do Windows instalado.

3. Teste de integridade do disco: SMART (via CrystalDiskInfo), teste de superfície e verificação de setores na área de boot.

4. Análise do BCD e dos drivers de armazenamento instalados no Windows offline.

5. Teste de cabos SATA e portas SATA alternativas na placa-mãe.

6. Verificação do dump de memória (minidump) quando disponível para confirmar o driver causador.`,
    solucao: `A solução é aplicada conforme a causa identificada:

**Modo SATA incorreto**: Ajuste na BIOS para o modo original (AHCI ou IDE). Se precisar mudar o modo, primeiro ativamos o driver correspondente via registro offline antes de alterar a BIOS.

**BCD corrompido**: Usamos o ambiente de recuperação do Windows (WinRE) com os comandos bootrec /fixmbr, bootrec /fixboot, bootrec /rebuildbcd para reconstruir a configuração de inicialização.

**Drivers corrompidos**: Injeção de drivers de armazenamento corretos via DISM offline ou modificação do registro para ativar o driver genérico storahci.

**Falha no disco**: Substituição do HD/SSD defeituoso, reinstalação limpa do Windows e recuperação de dados do disco antigo (quando possível).

**Cabo SATA**: Substituição do cabo e teste em porta SATA alternativa.`,
    quandoCompensa: "Sempre compensa diagnosticar — o reparo de software (BIOS, BCD, drivers) é rápido e barato. Mesmo troca de disco compensa se os dados são importantes.",
    quandoNaoCompensa: "Se o disco tem falha física grave E não há dados importantes, pode ser mais rápido substituir o disco e reinstalar tudo do zero.",
    conteudoExtra: `## Entendendo o Erro 0x0000007B

### O Que o Código Significa
O código 0x0000007B traduz-se como INACCESSIBLE_BOOT_DEVICE. Em termos simples: o Windows encontrou o kernel na memória, mas quando tentou acessar o disco para continuar carregando, não conseguiu.

### Diferença Entre AHCI e IDE
- **AHCI** (Advanced Host Controller Interface): modo moderno, suporta NCQ, hot-swap e melhor desempenho com SSDs
- **IDE** (Legacy): modo de compatibilidade antigo, mais lento, sem recursos avançados
- O Windows instala drivers específicos para o modo selecionado. Mudar sem preparação causa o erro 0x0000007B

### Prevenção
- Antes de alterar a BIOS, crie um ponto de restauração
- Ao clonar discos, use ferramentas que ajustam automaticamente o esquema de partição
- Mantenha um pen drive de recuperação do Windows atualizado`,
    relatedPages: [
      { to: "/tela-azul-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/computador-nao-liga-curitiba", label: "PC Não Liga" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver" },
      { to: "/hd-com-defeito-curitiba", label: "HD com Defeito" },
      { to: "/erro-particao-windows-curitiba", label: "Erro de Partição" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" }
    ]
  },

  // ─── computador-nao-reconhece-usb-curitiba ───
  {
    slug: "computador-nao-reconhece-usb-curitiba",
    title: "Computador Não Reconhece USB em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Computador não reconhece pendrive, HD externo ou dispositivo USB? Técnico em Curitiba diagnostica portas, drivers, hub e controladora USB.",
    h1: "Computador Não Reconhece USB — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware / Software",
    intro: `Você conecta um pendrive, HD externo, mouse, teclado ou impressora na porta USB e nada acontece? O Windows não emite o som de conexão, o dispositivo não aparece no Explorador de Arquivos ou surge a mensagem "Dispositivo USB não reconhecido"? Esse é um problema extremamente comum e pode ter causas simples ou complexas.

As portas USB são os conectores mais utilizados em qualquer computador. Com o uso constante, elas podem sofrer desgaste mecânico, acumular poeira, ou ter problemas elétricos. Além disso, drivers USB corrompidos, conflitos de energia e falhas na controladora USB da placa-mãe também causam o problema.

Em Curitiba, atendemos muitos casos de portas USB que param de funcionar — especialmente em notebooks, onde o reparo da porta exige micro-solda. Antes de trocar qualquer peça, nosso diagnóstico identifica se o problema está na porta, no cabo, no dispositivo ou no software.`,
    whatsappMessage: "Olá! Meu computador não está reconhecendo dispositivos USB. Gostaria de agendar um diagnóstico.",
    sintomas: [
      { titulo: "'Dispositivo USB não reconhecido'", desc: "Mensagem do Windows indicando que o dispositivo conectado não foi identificado. Pode ser problema no dispositivo, driver ou porta.", gravidade: "Médio" },
      { titulo: "Nenhuma reação ao conectar USB", desc: "Não há som, não há notificação, dispositivo não aparece em lugar nenhum. Porta pode estar desabilitada ou fisicamente danificada.", gravidade: "Alto" },
      { titulo: "USB funciona e para intermitentemente", desc: "O dispositivo conecta, funciona por alguns segundos e desconecta. Mau contato na porta ou cabo defeituoso.", gravidade: "Médio" },
      { titulo: "Apenas algumas portas USB não funcionam", desc: "Portas traseiras funcionam mas frontais não (ou vice-versa). Problema no cabo interno do painel frontal ou na controladora.", gravidade: "Médio" },
      { titulo: "Todos os dispositivos USB falhando", desc: "Nenhum dispositivo é reconhecido em nenhuma porta. Indica problema no driver da controladora USB ou falha na placa-mãe.", gravidade: "Alto" },
      { titulo: "USB fornece pouca energia", desc: "Dispositivos como HDs externos não ligam ou pendrives não são detectados, mas mouse funciona. Problema de fornecimento de energia USB.", gravidade: "Médio" }
    ],
    causas: [
      { titulo: "Porta USB com desgaste mecânico", desc: "Conectar e desconectar dispositivos milhares de vezes causa folga nos contatos internos da porta. Comum em notebooks.", tipo: "desgaste" },
      { titulo: "Driver de controladora USB corrompido", desc: "Atualizações do Windows, vírus ou remoção insegura podem corromper os drivers da controladora xHCI/EHCI.", tipo: "software" },
      { titulo: "Gerenciamento de energia suspendendo USB", desc: "O Windows pode desativar portas USB para economizar energia. Configuração comum em notebooks que causa falhas.", tipo: "software" },
      { titulo: "Hub USB interno sobrecarregado", desc: "Cada controladora USB tem limite de dispositivos e banda. Conectar muitos dispositivos pode exceder a capacidade.", tipo: "hardware" },
      { titulo: "Cabo do painel frontal desconectado", desc: "O cabo que liga as portas USB frontais à placa-mãe pode se soltar com vibrações ou manutenções.", tipo: "hardware" },
      { titulo: "Controladora USB da placa-mãe com defeito", desc: "O chipset responsável pelas portas USB pode falhar por pico de energia ou curto-circuito ao conectar dispositivos defeituosos.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Problema de driver ou configuração de energia — reinstalação de drivers e ajuste de gerenciamento de energia resolve.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Porta USB com mau contato ou cabo frontal desconectado — resolda da porta ou reconexão do cabo interno.", tempo: "2-3 horas", custo: "R$100–R$250" },
      { nivel: "Complexo", desc: "Controladora USB na placa-mãe com defeito — reparo de componente SMD ou substituição da placa-mãe.", tempo: "3-7 dias", custo: "R$250–R$600" }
    ],
    riscos: [
      "Forçar dispositivos em portas com mau contato pode causar curto-circuito e danificar o dispositivo",
      "Conectar dispositivos em portas com defeito elétrico pode queimar pendrives e HDs externos",
      "Ignorar o problema pode indicar falha progressiva na placa-mãe que vai afetar outras funções",
      "Remoção insegura de pendrives com dados importantes pode causar corrupção de arquivos"
    ],
    diagnostico: `O diagnóstico de USB envolve testes sistemáticos:

1. Teste cruzado: conectar dispositivos conhecidos (mouse, pendrive testado) em todas as portas para mapear quais funcionam.

2. Verificação no Gerenciador de Dispositivos: buscar controladoras USB com erro (triângulo amarelo), dispositivos desconhecidos ou desabilitados.

3. Teste de energia USB: medição da voltagem nas portas (devem fornecer 5V estáveis com corrente adequada para o padrão USB 2.0/3.0).

4. Inspeção física: verificação de contatos oxidados, tortos ou com folga usando lupa e teste de continuidade.

5. Teste de software: verificação de drivers, políticas de grupo e configurações de gerenciamento de energia.

6. Análise da BIOS: verificação de portas USB desabilitadas na configuração do sistema.`,
    solucao: `A solução varia conforme a causa identificada:

**Drivers**: Reinstalação dos drivers da controladora USB via Gerenciador de Dispositivos, com remoção completa dos drivers antigos e instalação dos oficiais do fabricante da placa-mãe.

**Gerenciamento de energia**: Desativação da opção "O computador pode desligar este dispositivo para economizar energia" em todas as controladoras USB e Root Hubs.

**Porta física**: Resolda dos contatos da porta USB com estação de solda. Em notebooks, pode exigir troca do módulo USB (placa filha) ou micro-solda na placa-mãe.

**Painel frontal**: Reconexão ou substituição do cabo que liga as portas frontais ao header USB da placa-mãe.

**Controladora**: Quando a controladora USB integrada ao chipset falha, a solução é usar uma placa PCI-E USB ou, em casos graves, substituir a placa-mãe.`,
    quandoCompensa: "Problemas de driver ou portas individuais sempre compensam reparar. Mesmo resolda de portas em notebooks é viável e econômica.",
    quandoNaoCompensa: "Se a controladora USB do chipset falhou e o computador é antigo, o custo de reparo da placa-mãe pode não compensar. Uma placa PCI-E USB é alternativa para desktops.",
    conteudoExtra: `## Guia Rápido de Problemas USB

### Checklist Antes de Chamar o Técnico
1. Teste o dispositivo em outro computador — pode ser o dispositivo e não a porta
2. Teste com outro cabo USB — cabos são a causa mais frequente e barata
3. Reinicie o computador — às vezes o driver trava e reiniciar resolve
4. Teste em portas traseiras — portas frontais dependem de cabo interno que pode estar solto

### USB 2.0 vs 3.0 vs USB-C
- **USB 2.0** (preto): 480 Mbps, 500 mA de corrente
- **USB 3.0** (azul): 5 Gbps, 900 mA de corrente
- **USB-C**: conector reversível, pode ser USB 3.1/3.2 ou Thunderbolt
- Dispositivos USB 3.0 em portas 2.0 funcionam mais lentos mas devem ser reconhecidos

### Remoção Segura
Sempre use "Remover hardware com segurança" antes de desconectar pendrives e HDs externos. A remoção sem ejetar pode corromper o sistema de arquivos do dispositivo.`,
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "PC Não Liga" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver Windows" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC/Notebook" },
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/servicos/redes-wifi", label: "Redes e Conectividade" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" }
    ]
  },

  // ============================================================
  // notebook-teclado-nao-funciona-curitiba
  // ============================================================
  {
    slug: "notebook-teclado-nao-funciona-curitiba",
    title: "Teclado do Notebook Não Funciona? Causas e Soluções | Técnico Curitiba",
    metaDescription: "Teclado do notebook parou de funcionar? Teclas travadas, sem resposta ou digitando errado? Diagnóstico e reparo em Curitiba. Atendimento rápido a domicílio.",
    h1: "Teclado do Notebook Não Funciona em Curitiba? Resolvemos!",
    categoria: "Hardware",
    intro: `O teclado é um dos componentes mais usados do notebook e, por isso, um dos que mais apresentam problemas. Teclas que não respondem, que digitam caracteres errados, ou um teclado completamente inoperante podem ter diversas causas — desde líquido derramado até falha no flat cable. Em Curitiba, nosso técnico diagnostica a causa real e resolve com peças de qualidade.`,
    sintomas: [
      { titulo: "Nenhuma tecla responde", desc: "O teclado inteiro para de funcionar. Pode ser flat cable desconectado, driver corrompido ou dano na placa-mãe.", gravidade: "Médio a complexo" },
      { titulo: "Teclas específicas não funcionam", desc: "Algumas teclas não respondem ao toque. Geralmente sujeira sob a membrana, tecla quebrada ou trilha danificada.", gravidade: "Simples a médio" },
      { titulo: "Teclado digita sozinho", desc: "Caracteres aparecem sem você digitar. Pode ser curto-circuito por líquido, tecla travada ou interferência de software.", gravidade: "Médio" },
      { titulo: "Teclado digitando errado", desc: "Teclas produzem caracteres diferentes do esperado. Configuração de idioma incorreta, driver errado ou dano físico.", gravidade: "Simples" },
      { titulo: "Teclas duras ou travadas", desc: "Precisam de muita força para pressionar. Sujeira acumulada, resíduo de líquido ou mecanismo de mola danificado.", gravidade: "Simples a médio" },
      { titulo: "Funciona com teclado USB externo", desc: "Teclado externo funciona normal mas o integrado não. Confirma problema no teclado interno, flat cable ou conector.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Líquido derramado", desc: "Água, café ou refrigerante causam curto-circuito nas trilhas condutoras da membrana do teclado.", tipo: "erro-humano" },
      { titulo: "Flat cable danificado", desc: "O cabo flexível que conecta o teclado à placa-mãe pode se romper, desencaixar ou oxidar com o tempo.", tipo: "desgaste" },
      { titulo: "Driver corrompido", desc: "Atualização do Windows ou conflito de software pode corromper o driver do teclado PS/2 integrado.", tipo: "software" },
      { titulo: "Sujeira acumulada", desc: "Migalhas, poeira e cabelos se acumulam sob as teclas e impedem o contato elétrico.", tipo: "desgaste" },
      { titulo: "Conector na placa-mãe", desc: "O conector ZIF onde o flat cable encaixa pode estar com a trava quebrada ou com mau contato.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Configuração de idioma errada ou driver corrompido — resolvido com software", tempo: "30 min", custo: "R$ 80–120" },
      { nivel: "Médio", desc: "Troca do teclado completo ou limpeza profunda após derramamento de líquido", tempo: "1–2 horas", custo: "R$ 150–280" },
      { nivel: "Complexo", desc: "Reparo no conector da placa-mãe ou micro-solda em trilhas danificadas", tempo: "2–4 horas", custo: "R$ 250–450" },
    ],
    riscos: [
      "Forçar teclas travadas pode quebrar o mecanismo permanentemente",
      "Derramar mais líquido tentando 'limpar' pode causar curto na placa-mãe",
      "Trocar teclado sem experiência pode danificar o flat cable ou conector ZIF",
      "Usar secador de cabelo em líquido derramado pode espalhar o resíduo para áreas mais profundas",
    ],
    diagnostico: `1. Teste com teclado USB externo para confirmar se o problema é no teclado integrado ou no sistema operacional.

2. Verificação no Gerenciador de Dispositivos do status do driver do teclado PS/2.

3. Boot via BIOS/UEFI para testar se o teclado funciona fora do Windows — se funcionar, o problema é software.

4. Inspeção física: remoção do teclado, verificação do flat cable, conector ZIF e presença de resíduos de líquido.

5. Teste de continuidade nas trilhas da membrana para identificar teclas com circuito interrompido.`,
    solucao: `**Driver/Software**: Reinstalação do driver do teclado, verificação de configurações de idioma e layout, desinstalação de softwares que possam estar interceptando teclas.

**Limpeza**: Remoção do teclado, limpeza com álcool isopropílico das membranas e contatos, secagem completa e remontagem.

**Flat cable**: Reconexão ou substituição do flat cable. Verificação e reparo da trava do conector ZIF se necessário.

**Troca completa**: Substituição do teclado por peça compatível com o modelo exato do notebook. Inclui teste de todas as teclas e atalhos de função (Fn).`,
    quandoCompensa: "Na maioria dos casos compensa reparar. A troca do teclado é relativamente barata e rápida, devolvendo funcionalidade total ao notebook.",
    quandoNaoCompensa: "Se o líquido atingiu a placa-mãe e causou danos além do teclado, o custo total de reparo pode não compensar em notebooks antigos.",
    conteudoExtra: `## Dicas Para Evitar Problemas no Teclado

### Prevenção
1. **Nunca coma ou beba sobre o notebook** — migalhas e líquidos são os maiores inimigos
2. **Limpe periodicamente** com ar comprimido entre as teclas
3. **Use película protetora** de silicone se trabalha em ambientes com poeira
4. **Feche a tampa com cuidado** — batidas podem desencaixar o flat cable

### O Que Fazer se Derramar Líquido
1. **Desligue imediatamente** — não tente salvar o trabalho
2. **Vire de cabeça para baixo** para escorrer o líquido
3. **NÃO use secador de cabelo** — o ar quente pode derreter componentes
4. **Leve ao técnico o mais rápido possível** — quanto mais tempo, mais corrosão

### Teclado Externo Como Solução Temporária
Enquanto aguarda o reparo, um teclado USB externo funciona perfeitamente com qualquer notebook. É uma solução prática para não perder produtividade.`,
    whatsappMessage: "Olá! O teclado do meu notebook parou de funcionar. Podem me ajudar?",
    relatedPages: [
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/notebook-com-tela-quebrada-curitiba", label: "Tela Quebrada" },
      { to: "/notebook-touchpad-nao-funciona-curitiba", label: "Touchpad Não Funciona" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // pc-sem-audio-curitiba
  // ============================================================
  {
    slug: "pc-sem-audio-curitiba",
    title: "PC Sem Áudio? Computador Sem Som | Técnico em Curitiba",
    metaDescription: "Computador ou notebook sem som? Áudio parou de funcionar? Diagnóstico e reparo em Curitiba e região metropolitana. Atendimento rápido a domicílio.",
    h1: "PC ou Notebook Sem Áudio em Curitiba? Diagnóstico e Solução",
    categoria: "Hardware / Software",
    intro: `Ficar sem áudio no computador é mais do que um incômodo — afeta reuniões online, aulas, entretenimento e trabalho. O problema pode estar no hardware (placa de som, alto-falantes, conector P2) ou no software (driver, configuração do Windows, serviço de áudio). Nosso técnico em Curitiba identifica a causa exata e resolve com agilidade.`,
    sintomas: [
      { titulo: "Nenhum som sai do computador", desc: "Sem áudio em nenhum programa, ícone de som com X vermelho. Pode ser driver, serviço de áudio parado ou placa de som com defeito.", gravidade: "Simples a médio" },
      { titulo: "Som apenas pelo fone de ouvido", desc: "Alto-falantes não funcionam mas fone sim (ou vice-versa). Problema no conector, detecção automática ou configuração de saída.", gravidade: "Simples" },
      { titulo: "Áudio com chiado ou estalo", desc: "Som sai mas com ruído, estalo ou distorção. Pode ser interferência, driver desatualizado ou alto-falante danificado.", gravidade: "Simples a médio" },
      { titulo: "Volume muito baixo", desc: "Mesmo no máximo o som é fraco. Equalização mal configurada, driver incorreto ou alto-falante desgastado.", gravidade: "Simples" },
      { titulo: "Microfone não funciona", desc: "O microfone integrado ou externo não capta áudio. Driver, permissões de privacidade ou hardware defeituoso.", gravidade: "Simples a médio" },
      { titulo: "Áudio trava ou falha intermitente", desc: "Som funciona e para aleatoriamente. Conflito de driver, gerenciamento de energia ou problema no chipset de áudio.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Driver de áudio corrompido", desc: "Atualizações do Windows podem instalar drivers genéricos incompatíveis com o chipset Realtek, Conexant ou outro.", tipo: "software" },
      { titulo: "Serviço Windows Audio parado", desc: "O serviço responsável pelo áudio pode travar ou ser desabilitado por otimizadores de sistema.", tipo: "software" },
      { titulo: "Conector P2 danificado", desc: "Entrada de fone de ouvido ou microfone com mau contato, oxidação ou soldas frias.", tipo: "hardware" },
      { titulo: "Chipset de áudio com defeito", desc: "O chip Realtek/Conexant na placa-mãe pode falhar, especialmente após picos de energia.", tipo: "hardware" },
      { titulo: "Configuração de saída errada", desc: "Windows direcionando áudio para dispositivo inexistente (HDMI, Bluetooth desconectado, monitor sem caixas).", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação de driver ou reconfiguração de dispositivo de saída padrão", tempo: "30–60 min", custo: "R$ 80–120" },
      { nivel: "Médio", desc: "Reparo do conector P2 ou substituição de alto-falantes internos do notebook", tempo: "1–2 horas", custo: "R$ 120–220" },
      { nivel: "Complexo", desc: "Substituição do chipset de áudio na placa-mãe ou instalação de placa de som dedicada", tempo: "2–3 horas", custo: "R$ 200–400" },
    ],
    riscos: [
      "Instalar drivers de áudio de fontes não confiáveis pode trazer malware",
      "Forçar o conector P2 pode quebrar a ponta do plug dentro da entrada",
      "Desabilitar serviços do Windows sem conhecimento pode causar outros problemas",
      "Ajustar volume no máximo com driver incorreto pode danificar alto-falantes",
    ],
    diagnostico: `1. Verificação do Gerenciador de Dispositivos para status do driver de áudio (exclamação amarela, driver genérico, dispositivo desabilitado).

2. Teste do serviço Windows Audio (services.msc) — verificar se está iniciado e em modo automático.

3. Teste com fone de ouvido e com alto-falante externo para isolar se o problema é na saída interna.

4. Verificação da configuração de dispositivo de reprodução padrão no painel de som do Windows.

5. Teste em outro sistema operacional (Linux live USB) para confirmar se é hardware ou software.

6. Inspeção física dos conectores, alto-falantes internos e chicote de cabos de áudio.`,
    solucao: `**Driver**: Download e instalação do driver oficial do fabricante da placa-mãe/notebook. Remoção completa do driver anterior com DDU (Display Driver Uninstaller para áudio Realtek).

**Serviço**: Reinicialização do Windows Audio e dependências (Windows Audio Endpoint Builder, RPC). Configuração para início automático.

**Hardware**: Resolda do conector P2, substituição de alto-falantes internos ou instalação de placa de som USB/PCI-E como alternativa ao chipset integrado com defeito.

**Configuração**: Definição correta do dispositivo de reprodução padrão, desativação de aprimoramentos de áudio que causam conflito, ajuste de formato de áudio (16/24 bit, 44.1/48 kHz).`,
    quandoCompensa: "Problemas de software são rápidos e baratos de resolver. Mesmo troca de conector P2 ou alto-falantes internos tem custo acessível.",
    quandoNaoCompensa: "Se o chipset de áudio da placa-mãe falhou em notebook antigo, uma placa de som USB externa (R$ 30-80) pode ser mais prática que micro-solda.",
    conteudoExtra: `## Soluções Rápidas Para Problemas de Áudio

### Checklist Antes do Técnico
1. Verifique se o volume não está no mudo (ícone na barra de tarefas)
2. Clique com botão direito no ícone de som > Configurações de som > verifique o dispositivo de saída
3. Teste com fone de ouvido — se funcionar, o problema é nos alto-falantes
4. Reinicie o computador — às vezes o serviço de áudio trava

### Atalho Útil
- **Win + I > Sistema > Som**: acesso rápido às configurações de áudio no Windows 10/11
- **Painel de Controle > Som**: acesso às propriedades avançadas do dispositivo

### Placa de Som USB
Para quem não quer esperar o reparo, uma placa de som USB externa (adaptador USB para P2) custa entre R$ 20 e R$ 80 e funciona plug-and-play na maioria dos computadores.`,
    whatsappMessage: "Olá! Meu computador está sem áudio/som. Podem me ajudar?",
    relatedPages: [
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver Windows" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC/Notebook" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // erro-disco-100-porcento-curitiba
  // ============================================================
  {
    slug: "erro-disco-100-porcento-curitiba",
    title: "Disco 100% no Gerenciador de Tarefas? Solução | Técnico Curitiba",
    metaDescription: "Disco em 100% no Windows? Computador extremamente lento por uso de disco constante? Diagnóstico e solução em Curitiba. Atendimento rápido.",
    h1: "Disco 100% no Gerenciador de Tarefas em Curitiba? Resolvemos!",
    categoria: "Software / Hardware",
    intro: `O disco em 100% de uso no Gerenciador de Tarefas é um dos problemas mais comuns e frustrantes do Windows 10 e 11. O computador fica extremamente lento, programas demoram minutos para abrir e até digitar no teclado tem atraso. As causas vão desde configurações erradas do Windows até HD mecânico chegando ao fim da vida útil. Nosso técnico em Curitiba resolve esse problema com diagnóstico preciso.`,
    sintomas: [
      { titulo: "Disco 100% constante no Gerenciador", desc: "A coluna 'Disco' mostra 100% o tempo todo, mesmo sem programas abertos. O sistema fica travando constantemente.", gravidade: "Médio" },
      { titulo: "Computador leva minutos para iniciar", desc: "Após o login do Windows, demora 5-10 minutos até poder usar o computador. Disco em atividade constante.", gravidade: "Médio" },
      { titulo: "Programas abrem muito devagar", desc: "Clicar em qualquer programa (Chrome, Word, etc) demora 30-60 segundos para abrir. Cursor de carregamento constante.", gravidade: "Simples a médio" },
      { titulo: "Travamentos ao salvar arquivos", desc: "Salvar documentos ou fazer download trava o sistema. O disco não consegue processar as operações de escrita.", gravidade: "Médio" },
      { titulo: "Ruído constante do HD", desc: "HD mecânico fazendo barulho de acesso contínuo (tec-tec-tec). Indica atividade intensa ou problemas físicos.", gravidade: "Médio a complexo" },
      { titulo: "100% causado por processo específico", desc: "Processos como Windows Search, Superfetch/SysMain, Windows Update ou antivírus monopolizam o disco.", gravidade: "Simples" },
    ],
    causas: [
      { titulo: "HD mecânico lento ou defeituoso", desc: "HDs de 5400 RPM não acompanham a demanda do Windows moderno. Setores defeituosos pioram drasticamente.", tipo: "hardware" },
      { titulo: "Windows Search indexando", desc: "O serviço de busca do Windows reconstrói o índice de busca constantemente, consumindo todo o disco.", tipo: "software" },
      { titulo: "Superfetch/SysMain", desc: "Serviço que pré-carrega programas na memória. Em HDs mecânicos, causa mais lentidão do que benefício.", tipo: "software" },
      { titulo: "Windows Update baixando/instalando", desc: "Atualizações sendo baixadas e instaladas em segundo plano consomem disco intensamente.", tipo: "software" },
      { titulo: "Malware minerando ou escrevendo em disco", desc: "Vírus e malware podem usar o disco intensamente para mineração, gravação de logs ou propagação.", tipo: "software" },
      { titulo: "Memória RAM insuficiente", desc: "Com pouca RAM, o Windows usa paginação (arquivo de swap) intensamente, sobrecarregando o disco.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Desabilitação de serviços desnecessários (SysMain, Windows Search) e otimização do Windows", tempo: "1–2 horas", custo: "R$ 100–150" },
      { nivel: "Médio", desc: "Upgrade de HD mecânico para SSD — solução definitiva para 80% dos casos", tempo: "1–2 horas", custo: "R$ 200–350 (com SSD)" },
      { nivel: "Complexo", desc: "Diagnóstico de HD com setores defeituosos + migração de dados + instalação de SSD", tempo: "3–5 horas", custo: "R$ 300–500" },
    ],
    riscos: [
      "Ignorar disco 100% por muito tempo pode causar perda de dados se o HD estiver falhando",
      "Desabilitar serviços do Windows sem critério pode causar instabilidade",
      "HD em 100% constante indica possível falha iminente — faça backup urgente",
      "Formatação sem diagnóstico pode não resolver se o problema é o HD físico",
    ],
    diagnostico: `1. Análise do Gerenciador de Tarefas: identificação do processo que mais consome disco (Windows Search, SysMain, antivírus, etc).

2. Teste de saúde do HD/SSD com CrystalDiskInfo: verificação de setores realocados, contagem de erros e temperatura.

3. Verificação da memória RAM disponível e uso de paginação — RAM insuficiente causa uso intenso de swap.

4. Scan por malware com ferramentas profissionais para descartar atividade maliciosa.

5. Análise do Event Viewer (Visualizador de Eventos) para erros de disco e NTFS.

6. Benchmark de velocidade do disco para comparar com valores esperados do modelo.`,
    solucao: `**Otimização de Software**:
- Desabilitação do SysMain (Superfetch) e Windows Search se desnecessários
- Configuração do Windows Update para horários específicos
- Remoção de programas que iniciam com o sistema desnecessariamente
- Verificação e remoção de malware

**Upgrade para SSD (Solução Definitiva)**:
A troca do HD mecânico por um SSD resolve 80-90% dos casos de disco 100%. O SSD é 10-50x mais rápido que um HD convencional, eliminando o gargalo. Inclui:
- Clonagem do sistema atual para o SSD (sem perder dados)
- Instalação física do SSD
- Otimização do Windows para SSD (TRIM, alinhamento)

**Expansão de RAM**: Se a causa é paginação excessiva, adicionar memória RAM reduz drasticamente o uso do disco.`,
    quandoCompensa: "Sempre compensa resolver. O upgrade para SSD é a melhor relação custo-benefício em informática — transforma completamente a experiência de uso.",
    quandoNaoCompensa: "Se o computador é muito antigo (pré-2010) e não suporta SSD SATA, pode ser mais vantajoso investir em um equipamento novo.",
    conteudoExtra: `## Disco 100%: A Solução Definitiva é o SSD

### Por Que o SSD Resolve
O principal motivo do disco 100% em computadores com HD mecânico é simples: **o Windows moderno exige mais do que um HD consegue entregar**. O sistema operacional faz milhares de operações de leitura/escrita simultâneas que um HD com prato giratório não consegue processar.

Um SSD não tem partes móveis e acessa dados instantaneamente, eliminando o gargalo.

### Comparativo Real
| Operação | HD Mecânico | SSD |
|----------|------------|-----|
| Boot do Windows | 2-5 minutos | 15-30 segundos |
| Abrir Chrome | 30-60 seg | 2-3 seg |
| Copiar 1GB | 1-2 min | 5-10 seg |
| Uso de disco | 80-100% | 5-20% |

### Quanto Custa o Upgrade
- SSD 240GB: R$ 120-180
- SSD 480GB: R$ 200-300
- Mão de obra (clonagem + instalação): R$ 100-150
- **Total**: R$ 220-450 para transformar seu computador`,
    whatsappMessage: "Olá! Meu computador está com disco em 100% e muito lento. Podem me ajudar?",
    relatedPages: [
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD/Memória" },
      { to: "/servicos/remocao-virus", label: "Remoção de Vírus" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // computador-reiniciando-sozinho-curitiba
  // ============================================================
  {
    slug: "computador-reiniciando-sozinho-curitiba",
    title: "Computador Reiniciando Sozinho? Causas e Soluções | Técnico Curitiba",
    metaDescription: "Computador reiniciando sozinho sem aviso? Pode ser superaquecimento, fonte, RAM ou Windows. Diagnóstico profissional em Curitiba. Atendimento rápido.",
    h1: "Computador Reiniciando Sozinho em Curitiba? Encontramos a Causa!",
    categoria: "Hardware / Software",
    intro: `Um computador que reinicia sozinho sem aviso é sinal de algo grave. O sistema detecta uma condição crítica (temperatura, voltagem, erro de memória) e faz um desligamento de proteção. Ignorar esse sintoma pode levar a danos permanentes no hardware. Em Curitiba, nosso técnico identifica a causa raiz com ferramentas profissionais de diagnóstico.`,
    sintomas: [
      { titulo: "Reinicia sem aviso prévio", desc: "O computador simplesmente desliga e liga novamente, sem tela azul ou mensagem de erro. Geralmente é hardware.", gravidade: "Médio a complexo" },
      { titulo: "Reinicia com tela azul (BSOD)", desc: "Aparece uma tela azul com código de erro antes de reiniciar. O código indica a causa: memória, driver ou disco.", gravidade: "Médio" },
      { titulo: "Reinicia durante jogos ou uso pesado", desc: "Só acontece em carga alta (jogos, renderização). Indica superaquecimento ou fonte insuficiente.", gravidade: "Médio" },
      { titulo: "Reinicia aleatoriamente", desc: "Acontece em momentos imprevisíveis, sem padrão. Pode ser memória RAM com defeito ou fonte instável.", gravidade: "Médio a complexo" },
      { titulo: "Reinicia em loop (boot loop)", desc: "Liga, começa a carregar e reinicia antes de completar o boot. Windows corrompido ou hardware falhando.", gravidade: "Complexo" },
      { titulo: "Reinicia apenas com programas específicos", desc: "Certos programas causam o reinício. Driver incompatível, conflito de software ou recurso de hardware insuficiente.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Superaquecimento", desc: "CPU ou GPU ultrapassam a temperatura máxima e o sistema desliga por proteção. Pasta térmica seca ou cooler obstruído.", tipo: "hardware" },
      { titulo: "Fonte de alimentação instável", desc: "Fonte sub-dimensionada ou com capacitores estufados não mantém voltagem estável, causando reinícios sob carga.", tipo: "hardware" },
      { titulo: "Memória RAM com defeito", desc: "Módulos de RAM com células defeituosas causam erros aleatórios que forçam reinícios de proteção.", tipo: "hardware" },
      { titulo: "Driver incompatível ou corrompido", desc: "Drivers de vídeo, chipset ou rede podem causar BSOD que resulta em reinício automático.", tipo: "software" },
      { titulo: "Windows corrompido", desc: "Arquivos de sistema corrompidos por desligamento forçado, vírus ou disco com defeito.", tipo: "software" },
      { titulo: "Placa-mãe com defeito", desc: "Capacitores estufados, reguladores de tensão falhando ou trilhas com micro-fissuras.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Driver corrompido ou configuração do Windows (reinício automático em erro) — resolvido com software", tempo: "1–2 horas", custo: "R$ 100–150" },
      { nivel: "Médio", desc: "Limpeza + troca de pasta térmica, troca de memória RAM ou substituição da fonte", tempo: "1–3 horas", custo: "R$ 150–350" },
      { nivel: "Complexo", desc: "Diagnóstico de placa-mãe com defeito, reparo ou substituição de componentes", tempo: "3–5 horas", custo: "R$ 300–600" },
    ],
    riscos: [
      "Reinícios constantes podem corromper o sistema de arquivos e causar perda de dados",
      "Superaquecimento ignorado pode queimar o processador permanentemente",
      "Fonte instável pode danificar placa-mãe, memória e outros componentes",
      "Usar o computador com RAM defeituosa pode corromper arquivos e instalações de programas",
    ],
    diagnostico: `1. Monitoramento de temperatura em tempo real da CPU e GPU com HWMonitor para detectar superaquecimento.

2. Teste de memória RAM com MemTest86 (mínimo 4 passes) para identificar células defeituosas.

3. Teste de estabilidade da fonte com multímetro nas linhas 12V, 5V e 3.3V sob carga.

4. Análise dos dumps de BSOD (arquivos .dmp) para identificar o driver ou componente causador.

5. Verificação visual da placa-mãe: capacitores estufados, marcas de queimado, soldas frias.

6. Teste de estresse (Prime95 + FurMark) para reproduzir o problema em ambiente controlado.`,
    solucao: `**Superaquecimento**: Limpeza completa interna, troca de pasta térmica (Arctic MX-4 ou similar), verificação dos coolers e ventilação. Em notebooks, limpeza do sistema de heat pipe.

**Fonte**: Substituição por fonte de qualidade com potência adequada ao sistema. Em notebooks, teste e troca do carregador se necessário.

**Memória RAM**: Identificação do módulo defeituoso e substituição. Teste dos slots da placa-mãe para confirmar que não é o slot com defeito.

**Software**: Desativação do reinício automático em erro (para poder ver o código BSOD), atualização de drivers problemáticos, reparo ou reinstalação do Windows.

**Placa-mãe**: Troca de capacitores estufados, reparo de reguladores de tensão ou substituição da placa em casos mais graves.`,
    quandoCompensa: "Na maioria dos casos, a causa é algo reparável (limpeza, pasta térmica, fonte, RAM). O diagnóstico é essencial para não trocar peças desnecessariamente.",
    quandoNaoCompensa: "Se a placa-mãe tem múltiplos capacitores estufados em computador antigo, ou se o processador já sofreu dano térmico, pode ser mais vantajoso trocar o equipamento.",
    conteudoExtra: `## Reinício Constante: Guia de Emergência

### Antes de Chamar o Técnico
1. **Desabilite o reinício automático**: Painel de Controle > Sistema > Configurações avançadas > Inicialização e Recuperação > desmarque "Reiniciar automaticamente"
2. **Anote o código da tela azul** — ex: KERNEL_DATA_INPAGE_ERROR, WHEA_UNCORRECTABLE_ERROR
3. **Verifique a temperatura** — se o gabinete está muito quente, desligue e espere esfriar
4. **Ouça a fonte** — estalo ou cheiro de queimado indica problema elétrico urgente

### Códigos de BSOD Mais Comuns
- **WHEA_UNCORRECTABLE_ERROR**: Problema de hardware (CPU, RAM, placa-mãe)
- **KERNEL_DATA_INPAGE_ERROR**: HD/SSD com setores defeituosos
- **IRQL_NOT_LESS_OR_EQUAL**: Driver incompatível ou RAM defeituosa
- **CRITICAL_PROCESS_DIED**: Arquivo de sistema corrompido
- **MEMORY_MANAGEMENT**: RAM com defeito

### Prevenção
- Mantenha a limpeza interna a cada 6 meses
- Use um nobreak/estabilizador para proteger contra oscilações elétricas
- Monitore temperaturas periodicamente com HWMonitor ou Core Temp`,
    whatsappMessage: "Olá! Meu computador fica reiniciando sozinho. Podem me ajudar?",
    relatedPages: [
      { to: "/computador-nao-liga-curitiba", label: "PC Não Liga" },
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/computador-desligando-apos-segundos-curitiba", label: "Desligando Após Segundos" },
      { to: "/memoria-ram-com-defeito-curitiba", label: "RAM com Defeito" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC/Notebook" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // pc-nao-conecta-internet-curitiba
  // ============================================================
  {
    slug: "pc-nao-conecta-internet-curitiba",
    title: "PC Não Conecta na Internet? Causas e Soluções | Técnico Curitiba",
    metaDescription: "Computador ou notebook sem internet? Wi-Fi não conecta, cabo sem rede? Diagnóstico e solução em Curitiba e região. Atendimento rápido a domicílio.",
    h1: "PC ou Notebook Não Conecta na Internet em Curitiba? Resolvemos!",
    categoria: "Redes / Software",
    intro: `Ficar sem internet é um dos problemas mais urgentes para quem trabalha ou estuda em casa. O computador pode não se conectar ao Wi-Fi, não reconhecer o cabo de rede, ou até conectar mas sem navegar. As causas vão de configurações simples do Windows até falhas na placa de rede. Em Curitiba, nosso técnico diagnostica e resolve com rapidez.`,
    sintomas: [
      { titulo: "Wi-Fi não aparece na lista", desc: "Nenhuma rede sem fio é detectada. Pode ser adaptador desabilitado, driver ausente ou placa Wi-Fi com defeito.", gravidade: "Médio" },
      { titulo: "Conecta mas sem internet", desc: "Mostra 'Conectado, sem internet' ou 'Sem acesso à internet'. Problema de DNS, gateway ou configuração do roteador.", gravidade: "Simples a médio" },
      { titulo: "Cabo de rede não funciona", desc: "Conecta o cabo Ethernet mas não reconhece. Pode ser porta de rede queimada, cabo danificado ou driver.", gravidade: "Simples a médio" },
      { titulo: "Internet lenta só neste PC", desc: "Outros dispositivos funcionam normal mas este PC está lento. Driver desatualizado, malware ou configuração de rede.", gravidade: "Simples" },
      { titulo: "Desconecta sozinho do Wi-Fi", desc: "Conecta e depois de minutos cai. Gerenciamento de energia, interferência ou driver instável.", gravidade: "Simples a médio" },
      { titulo: "Ícone de rede com X vermelho", desc: "Windows indica que não há adaptador de rede ativo. Hardware desabilitado, driver removido ou placa com defeito.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Driver de rede corrompido", desc: "Atualização do Windows pode instalar driver genérico que não funciona corretamente com o adaptador de rede.", tipo: "software" },
      { titulo: "Adaptador Wi-Fi desabilitado", desc: "Tecla Fn+F2 (ou similar) pode ter desligado o Wi-Fi. Modo avião ativado acidentalmente.", tipo: "software" },
      { titulo: "Configuração de DNS incorreta", desc: "DNS configurado manualmente com endereço incorreto ou servidor DNS do provedor fora do ar.", tipo: "software" },
      { titulo: "Placa de rede com defeito", desc: "Adaptador Wi-Fi ou porta Ethernet pode ter queimado, especialmente após picos de energia.", tipo: "hardware" },
      { titulo: "Gerenciamento de energia", desc: "Windows desliga o adaptador Wi-Fi para economizar energia, causando desconexões intermitentes.", tipo: "software" },
      { titulo: "Malware alterando configurações", desc: "Vírus podem modificar proxy, DNS ou arquivo hosts, impedindo a navegação normal.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação de driver, reconfiguração de DNS ou desativação do modo avião", tempo: "30–60 min", custo: "R$ 80–120" },
      { nivel: "Médio", desc: "Remoção de malware que alterou configurações de rede + restauração", tempo: "1–2 horas", custo: "R$ 120–200" },
      { nivel: "Complexo", desc: "Substituição de placa Wi-Fi interna ou instalação de adaptador USB Wi-Fi", tempo: "1–2 horas", custo: "R$ 150–300" },
    ],
    riscos: [
      "Alterar configurações de rede sem conhecimento pode deixar o computador completamente offline",
      "Baixar drivers de sites não oficiais pode instalar malware",
      "Resetar o roteador sem anotar as configurações pode derrubar a rede de toda a casa/empresa",
      "Forçar o adaptador Wi-Fi interno pode danificar o conector na placa-mãe do notebook",
    ],
    diagnostico: `1. Verificação do Gerenciador de Dispositivos: status do adaptador de rede (exclamação amarela, desabilitado, ausente).

2. Teste com outro dispositivo na mesma rede para confirmar se o problema é no PC ou no roteador/provedor.

3. Teste de ping (ping 8.8.8.8) para diferenciar problema de DNS vs problema de conectividade.

4. Verificação de configurações: IP, DNS, gateway, proxy e arquivo hosts.

5. Teste com adaptador USB Wi-Fi externo para isolar se o problema é na placa interna.

6. Scan por malware que possa ter alterado configurações de rede.`,
    solucao: `**Driver**: Download e instalação do driver oficial do fabricante. Remoção do driver anterior via Gerenciador de Dispositivos.

**Configuração**: Reset do TCP/IP stack (netsh int ip reset), flush de DNS (ipconfig /flushdns), configuração de DNS público (8.8.8.8 / 8.8.4.4).

**Gerenciamento de energia**: Desativação de "O computador pode desligar este dispositivo para economizar energia" no adaptador de rede.

**Hardware**: Substituição da placa Wi-Fi Mini PCIe/M.2 interna ou instalação de adaptador USB Wi-Fi AC/AX como alternativa.

**Malware**: Remoção completa de vírus, restauração de configurações de proxy e DNS, limpeza do arquivo hosts.`,
    quandoCompensa: "Na grande maioria dos casos é problema de software e tem solução rápida e barata. Mesmo troca de placa Wi-Fi é acessível.",
    quandoNaoCompensa: "Raramente não compensa. Um adaptador USB Wi-Fi (R$ 40-120) resolve quando a placa interna falha e o reparo é caro.",
    conteudoExtra: `## Soluções Rápidas de Internet

### Checklist Antes do Técnico
1. Reinicie o roteador (desligue, espere 30 segundos, ligue)
2. Teste com outro dispositivo (celular) na mesma rede
3. Verifique se o modo avião não está ativado
4. Tente conectar com cabo Ethernet direto no roteador
5. Execute no Prompt de Comando: \`ipconfig /flushdns\`

### Comandos Úteis (Prompt como Administrador)
\`\`\`
ipconfig /flushdns
ipconfig /release
ipconfig /renew
netsh winsock reset
netsh int ip reset
\`\`\`

### DNS Público Recomendado
- **Google**: 8.8.8.8 e 8.8.4.4
- **Cloudflare**: 1.1.1.1 e 1.0.0.1
- Configurar DNS público resolve muitos problemas de "conectado sem internet"`,
    whatsappMessage: "Olá! Meu computador não está conectando na internet. Podem me ajudar?",
    relatedPages: [
      { to: "/servicos/redes-wifi", label: "Redes e Wi-Fi" },
      { to: "/erro-driver-windows-curitiba", label: "Erro de Driver Windows" },
      { to: "/servicos/remocao-virus", label: "Remoção de Vírus" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // erro-registro-windows-curitiba
  // ============================================================
  {
    slug: "erro-registro-windows-curitiba",
    title: "Erro no Registro do Windows? Solução | Técnico em Curitiba",
    metaDescription: "Erros no registro do Windows? Computador travando, programas não abrem? Reparo profissional do registro em Curitiba. Sem risco de perda de dados.",
    h1: "Erro no Registro do Windows em Curitiba? Reparo Seguro e Profissional",
    categoria: "Software",
    intro: `O Registro do Windows é o banco de dados central que armazena todas as configurações do sistema operacional, programas e drivers. Quando o registro é corrompido, os efeitos são devastadores: programas param de funcionar, o sistema trava, configurações se perdem e erros aparecem constantemente. Em Curitiba, nosso técnico repara o registro com segurança, sem risco de perda de dados.`,
    sintomas: [
      { titulo: "Mensagem 'Erro no registro'", desc: "Windows exibe alertas como 'Registry error', 'Hive not loaded' ou erros com códigos do registro.", gravidade: "Médio" },
      { titulo: "Programas não abrem ou fecham sozinhos", desc: "Softwares que funcionavam param de abrir. Chaves de registro corrompidas impedem a execução.", gravidade: "Simples a médio" },
      { titulo: "Windows lento na inicialização", desc: "Boot demora muito porque o sistema tenta ler entradas corrompidas ou inválidas do registro.", gravidade: "Simples a médio" },
      { titulo: "Associações de arquivo quebradas", desc: "Arquivos .pdf, .jpg etc. não abrem com duplo-clique ou abrem com o programa errado.", gravidade: "Simples" },
      { titulo: "Tela azul com erro de registro", desc: "BSOD com erros como REGISTRY_ERROR ou SYSTEM_HIVE_ERROR indica corrupção grave.", gravidade: "Complexo" },
      { titulo: "Configurações que não salvam", desc: "Você altera uma configuração e ela volta ao anterior após reiniciar. Permissões ou corrupção no registro.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Desligamento forçado", desc: "Desligar o computador no botão durante operações de escrita no registro causa corrupção.", tipo: "erro-humano" },
      { titulo: "Limpadores de registro agressivos", desc: "Programas como CCleaner podem remover chaves válidas, quebrando programas e recursos do sistema.", tipo: "erro-humano" },
      { titulo: "Malware", desc: "Vírus alteram, adicionam ou corrompem chaves do registro para se manter no sistema.", tipo: "software" },
      { titulo: "Instalação/desinstalação incorreta", desc: "Programas mal desinstalados deixam resíduos no registro que causam conflitos.", tipo: "software" },
      { titulo: "Disco com setores defeituosos", desc: "Se os arquivos do registro (SAM, SYSTEM, SOFTWARE) estão em setores ruins do disco, a corrupção é inevitável.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reparo de associações de arquivo ou restauração de chaves específicas do registro", tempo: "30–60 min", custo: "R$ 80–130" },
      { nivel: "Médio", desc: "Restauração do registro via ponto de restauração ou backup automático do Windows", tempo: "1–2 horas", custo: "R$ 120–200" },
      { nivel: "Complexo", desc: "Reconstrução manual de hives corrompidos ou reinstalação preservando dados", tempo: "2–4 horas", custo: "R$ 200–350" },
    ],
    riscos: [
      "Editar o registro manualmente sem conhecimento pode tornar o Windows não inicializável",
      "Limpadores de registro podem remover chaves essenciais do sistema",
      "Importar arquivos .reg de fontes não confiáveis pode injetar malware",
      "Restaurar registro antigo pode reverter atualizações de segurança importantes",
    ],
    diagnostico: `1. Análise do Event Viewer para identificar erros específicos relacionados ao registro (Event ID 6008, Event Source: Registrar).

2. Verificação de integridade com SFC (sfc /scannow) e DISM para reparar arquivos de sistema e registro.

3. Verificação de saúde do disco — setores defeituosos na área do registro causam corrupção recorrente.

4. Análise de pontos de restauração disponíveis para reverter a um estado funcional.

5. Verificação de malware que possa estar alterando o registro continuamente.

6. Backup do registro atual antes de qualquer intervenção de reparo.`,
    solucao: `**Reparo automático**: Execução de SFC /scannow e DISM /Online /Cleanup-Image /RestoreHealth para corrigir automaticamente arquivos de sistema e registro corrompidos.

**Restauração**: Uso de ponto de restauração do sistema para reverter o registro a um estado anterior funcional, sem perder documentos pessoais.

**Reparo manual**: Edição específica de chaves corrompidas via Regedit, com backup prévio. Importação de chaves padrão quando necessário.

**Reconstrução**: Em casos graves, cópia dos hives de backup (RegBack) para substituir os corrompidos. Se necessário, reinstalação do Windows preservando dados.

**Prevenção**: Configuração de pontos de restauração automáticos e desinstalação de limpadores de registro agressivos.`,
    quandoCompensa: "Na maioria dos casos, o reparo do registro resolve o problema sem necessidade de formatação. É rápido e preserva todos os dados.",
    quandoNaoCompensa: "Se o registro está tão corrompido que o Windows nem inicia e não há backup, uma reinstalação limpa pode ser mais eficiente.",
    conteudoExtra: `## O Que É o Registro do Windows

### Entendendo o Registro
O Registro do Windows é como o "cérebro" do sistema operacional. Ele armazena:
- Configurações de todos os programas instalados
- Preferências do usuário (papel de parede, tema, atalhos)
- Informações de hardware e drivers
- Associações de tipo de arquivo (.pdf, .docx, etc.)
- Configurações de rede, segurança e atualizações

### NUNCA Faça Isso
1. **Não use limpadores de registro** — o próprio Microsoft desaconselha
2. **Não edite o registro sem backup** — uma chave errada pode impedir o boot
3. **Não importe .reg de sites desconhecidos** — pode ser malware
4. **Não delete chaves que não conhece** — podem ser essenciais

### Comando Útil
- **regedit**: Editor do Registro (use com cuidado)
- **sfc /scannow**: Verifica e repara arquivos de sistema
- **DISM /Online /Cleanup-Image /RestoreHealth**: Reparo mais profundo`,
    whatsappMessage: "Olá! Meu Windows está com erros de registro. Podem me ajudar?",
    relatedPages: [
      { to: "/windows-travando-na-atualizacao-curitiba", label: "Windows Travando" },
      { to: "/erro-atualizacao-windows-11-curitiba", label: "Erro Windows 11" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/servicos/remocao-virus", label: "Remoção de Vírus" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // notebook-nao-carrega-curitiba
  // ============================================================
  {
    slug: "notebook-nao-carrega-curitiba",
    title: "Notebook Não Carrega? Bateria Não Carrega | Técnico Curitiba",
    metaDescription: "Notebook não carrega a bateria? Carregador não funciona? LED não acende? Diagnóstico e reparo em Curitiba. Atendimento rápido a domicílio.",
    h1: "Notebook Não Carrega em Curitiba? Diagnóstico e Solução Rápida",
    categoria: "Hardware",
    intro: `Notebook que não carrega é um problema urgente — sem bateria, sem mobilidade. As causas variam do simples (cabo do carregador com mau contato) ao complexo (circuito de carga da placa-mãe). Antes de comprar um carregador novo às cegas, é importante diagnosticar a causa real. Em Curitiba, nosso técnico testa carregador, bateria e circuito de carga para identificar exatamente o que precisa ser reparado ou substituído.`,
    sintomas: [
      { titulo: "LED do carregador não acende", desc: "O indicador do carregador fica apagado ao conectar na tomada. Pode ser carregador queimado, cabo rompido ou curto na placa.", gravidade: "Simples a médio" },
      { titulo: "Carregador conectado mas bateria não carrega", desc: "LED acende, notebook funciona na tomada, mas bateria fica em 0% ou não aumenta. Bateria ou circuito de carga.", gravidade: "Médio" },
      { titulo: "Carrega até certa porcentagem e para", desc: "Bateria carrega até 40%, 60% ou 80% e para. Células da bateria degradadas ou calibração necessária.", gravidade: "Simples a médio" },
      { titulo: "Carregador esquenta muito", desc: "Fonte de alimentação fica extremamente quente. Pode indicar curto interno no carregador ou consumo excessivo.", gravidade: "Médio" },
      { titulo: "Notebook só funciona na tomada", desc: "Sem o carregador conectado, desliga instantaneamente. Bateria completamente degradada ou não reconhecida.", gravidade: "Médio" },
      { titulo: "Conector de carga solto", desc: "O plug do carregador não encaixa firme, cai ou precisa ficar em ângulo específico. Conector DC Jack com folga.", gravidade: "Médio" },
    ],
    causas: [
      { titulo: "Carregador com defeito", desc: "Fonte de alimentação queimada, cabo rompido internamente ou plug com mau contato. É a causa mais comum.", tipo: "desgaste" },
      { titulo: "Bateria degradada", desc: "Baterias de lítio perdem capacidade após 300-500 ciclos de carga. Após 2-3 anos, a degradação é significativa.", tipo: "desgaste" },
      { titulo: "DC Jack (conector de carga) danificado", desc: "O conector onde o carregador encaixa pode soltar da placa-mãe ou ter soldas frias por uso repetido.", tipo: "hardware" },
      { titulo: "Circuito de carga na placa-mãe", desc: "O CI controlador de carga (MOSFET, regulador) na placa-mãe pode queimar, impedindo a carga da bateria.", tipo: "hardware" },
      { titulo: "Carregador incompatível", desc: "Usar carregador com voltagem ou amperagem diferente do original pode não carregar ou danificar o notebook.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Substituição do carregador por um compatível de qualidade", tempo: "Imediato", custo: "R$ 80–180" },
      { nivel: "Médio", desc: "Troca da bateria ou resolda do DC Jack (conector de carga)", tempo: "1–2 horas", custo: "R$ 150–350" },
      { nivel: "Complexo", desc: "Reparo do circuito de carga na placa-mãe (micro-solda de CI controlador)", tempo: "2–5 horas", custo: "R$ 250–500" },
    ],
    riscos: [
      "Usar carregador genérico de baixa qualidade pode queimar a placa-mãe",
      "Forçar o plug do carregador em conector solto pode romper trilhas na placa-mãe",
      "Bateria estufada (inchada) é risco de incêndio — pare de usar imediatamente",
      "Carregar com voltagem errada pode causar danos irreversíveis ao circuito de carga",
    ],
    diagnostico: `1. Teste do carregador com multímetro: verificação de voltagem e amperagem de saída vs especificações.

2. Teste com outro carregador compatível para isolar se o problema é na fonte ou no notebook.

3. Verificação do DC Jack: teste de continuidade, inspeção visual de soldas e firmeza do conector.

4. Verificação da bateria: ciclos de carga, capacidade real vs nominal, presença de inchaço.

5. Análise do circuito de carga: teste dos MOSFETs, reguladores e CI controlador de carga na placa-mãe.

6. Verificação de software: drivers de gerenciamento de energia e BIOS atualizada.`,
    solucao: `**Carregador**: Substituição por carregador original ou compatível de qualidade com voltagem e amperagem corretas para o modelo.

**Bateria**: Substituição por bateria compatível. Calibração inicial (carga completa, descarga total, carga completa).

**DC Jack**: Resolda do conector na placa-mãe com estação de solda profissional. Em alguns modelos, troca do módulo DC Jack (placa filha).

**Circuito de carga**: Micro-solda para substituição do CI controlador de carga, MOSFETs ou reguladores de tensão na placa-mãe.

**Software**: Atualização do BIOS e driver de gerenciamento de bateria do fabricante. Reset do EC (Embedded Controller) quando necessário.`,
    quandoCompensa: "Troca de carregador e bateria sempre compensam. Resolda de DC Jack é viável e econômica. Reparo de circuito de carga compensa em notebooks de até 3-4 anos.",
    quandoNaoCompensa: "Se o circuito de carga da placa-mãe falhou em notebook muito antigo (5+ anos), o custo do reparo pode se aproximar do valor de um notebook usado melhor.",
    conteudoExtra: `## Guia de Carga do Notebook

### Como Preservar a Bateria
1. **Não deixe sempre na tomada** — manter em 100% constante degrada a bateria
2. **Ideal**: manter entre 20% e 80% de carga no dia a dia
3. **Não use até 0%** frequentemente — descargas profundas encurtam a vida útil
4. **Evite calor** — bateria quente degrada mais rápido

### Sinais de Bateria Estufada (URGENTE)
- Touchpad levantado ou desnivelado
- Base do notebook não fecha completamente
- Teclado com teclas desniveladas
- **PARE DE USAR IMEDIATAMENTE** — risco de incêndio

### Como Verificar a Saúde da Bateria
No Prompt de Comando como Administrador:
\`\`\`
powercfg /batteryreport
\`\`\`
Abre um relatório HTML com capacidade original vs atual e histórico de carga.`,
    whatsappMessage: "Olá! Meu notebook não está carregando. Podem me ajudar?",
    relatedPages: [
      { to: "/notebook-bateria-nao-carrega-curitiba", label: "Bateria Não Carrega" },
      { to: "/notebook-esquentando-desligando-curitiba", label: "Notebook Esquentando" },
      { to: "/computador-nao-liga-curitiba", label: "PC Não Liga" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ============================================================
  // pc-com-virus-ransomware-curitiba
  // ============================================================
  {
    slug: "pc-com-virus-ransomware-curitiba",
    title: "PC com Vírus Ransomware? Arquivos Criptografados | Técnico Curitiba",
    metaDescription: "Computador infectado com ransomware? Arquivos criptografados e pedido de resgate? Diagnóstico e tentativa de recuperação em Curitiba. Atendimento urgente.",
    h1: "PC com Ransomware em Curitiba? Ação Urgente Necessária",
    categoria: "Segurança",
    intro: `O ransomware é o tipo mais devastador de malware: ele criptografa todos os seus arquivos (documentos, fotos, vídeos) e exige pagamento de resgate para devolver o acesso. É uma emergência digital que exige ação imediata e profissional. Em Curitiba, nosso técnico atua com urgência para identificar a variante do ransomware, avaliar possibilidades de recuperação e proteger contra novos ataques.`,
    sintomas: [
      { titulo: "Arquivos com extensão estranha", desc: "Documentos renomeados com extensões como .locked, .encrypted, .crypt, .cerber, .wannacry. São os arquivos criptografados.", gravidade: "Complexo" },
      { titulo: "Mensagem pedindo resgate", desc: "Tela ou arquivo de texto exigindo pagamento em Bitcoin para desbloquear os arquivos. NÃO PAGUE.", gravidade: "Complexo" },
      { titulo: "Arquivos não abrem", desc: "Fotos, documentos e planilhas existem mas não abrem — conteúdo foi criptografado e é ilegível.", gravidade: "Complexo" },
      { titulo: "Papel de parede alterado", desc: "Fundo de tela trocado por mensagem do ransomware com instruções de pagamento.", gravidade: "Complexo" },
      { titulo: "Computador extremamente lento", desc: "Durante a criptografia, o ransomware consome todo o disco e CPU. Se pegar nessa fase, desligue IMEDIATAMENTE.", gravidade: "Médio a complexo" },
      { titulo: "Programas e sistema funcionam", desc: "O Windows funciona mas seus arquivos pessoais estão inacessíveis. O ransomware foca em dados, não no sistema.", gravidade: "Complexo" },
    ],
    causas: [
      { titulo: "E-mail com anexo infectado", desc: "Anexos .zip, .doc com macro, .exe disfarçado em e-mails falsos de bancos, correios ou empresas.", tipo: "erro-humano" },
      { titulo: "Download de software pirata", desc: "Cracks, keygens e ativadores são os maiores vetores de ransomware. O 'software grátis' sai caríssimo.", tipo: "erro-humano" },
      { titulo: "Site comprometido", desc: "Anúncios maliciosos (malvertising) em sites legítimos podem instalar ransomware via exploit do navegador.", tipo: "software" },
      { titulo: "Acesso remoto exposto (RDP)", desc: "Porta 3389 aberta na internet permite que atacantes entrem no computador e executem o ransomware manualmente.", tipo: "software" },
      { titulo: "Rede compartilhada infectada", desc: "Ransomware pode se espalhar por pastas compartilhadas na rede, infectando todos os computadores conectados.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Ransomware de tela (screen locker) sem criptografia real — remoção do malware restaura acesso", tempo: "1–2 horas", custo: "R$ 150–250" },
      { nivel: "Médio", desc: "Ransomware com criptografia mas com ferramenta de descriptografia disponível (variante conhecida)", tempo: "2–5 horas", custo: "R$ 200–400" },
      { nivel: "Complexo", desc: "Ransomware com criptografia forte sem ferramenta disponível — recuperação parcial de backups/shadow copies", tempo: "4–8 horas", custo: "R$ 300–600" },
    ],
    riscos: [
      "NUNCA pague o resgate — não há garantia de que receberá a chave e você financia criminosos",
      "Tentar descriptografar sem identificar a variante correta pode corromper os arquivos permanentemente",
      "O ransomware pode estar ainda ativo e criptografar backups conectados ao computador",
      "Reinstalar Windows sem análise forense destrói evidências e possíveis chaves na memória RAM",
      "Conectar pendrives ou HDs externos no PC infectado pode criptografá-los também",
    ],
    diagnostico: `1. **ISOLAMENTO IMEDIATO**: Desconexão do computador da rede (Wi-Fi e cabo) para evitar propagação.

2. Identificação da variante do ransomware: análise da extensão dos arquivos criptografados e da nota de resgate.

3. Consulta em bancos de dados como ID Ransomware (id-ransomware.malwarehunterteam.com) e No More Ransom (nomoreransom.org).

4. Verificação de Shadow Volume Copies (versões anteriores do Windows) que podem não ter sido deletadas.

5. Análise de backups disponíveis: nuvem (OneDrive, Google Drive), HD externo, backups de rede.

6. Scan completo com ferramentas anti-malware para garantir que o ransomware foi completamente removido antes de qualquer recuperação.`,
    solucao: `**Identificação**: Determinação exata da família/variante do ransomware através da nota de resgate e extensão dos arquivos.

**Descriptografia**: Se houver ferramenta disponível (No More Ransom, Emsisoft, Kaspersky), aplicação da ferramenta de descriptografia específica para a variante.

**Recuperação**: Restauração de arquivos a partir de Shadow Copies, backups em nuvem, versões anteriores do OneDrive/Google Drive ou backups offline.

**Remoção**: Eliminação completa do ransomware e backdoors associados. Verificação de persistência no sistema.

**Proteção**: Instalação de anti-ransomware, configuração de backup automático (regra 3-2-1), fechamento de portas expostas, atualização do sistema e orientação sobre engenharia social.`,
    quandoCompensa: "Sempre compensa tentar a recuperação profissional. Mesmo que os arquivos não possam ser descriptografados agora, novas ferramentas são lançadas regularmente.",
    quandoNaoCompensa: "Se não havia backup e a variante não tem descriptografador disponível, a reinstalação limpa é o caminho mais rápido para voltar a usar o computador.",
    conteudoExtra: `## Ransomware: O Que Fazer IMEDIATAMENTE

### Primeiros 5 Minutos (Críticos)
1. **DESLIGUE O WI-FI E DESCONECTE O CABO DE REDE** — impede propagação
2. **NÃO desligue o computador** se estiver ligado — chaves podem estar na RAM
3. **NÃO conecte pendrives ou HDs externos** — serão criptografados
4. **Tire fotos da tela de resgate** — ajuda na identificação da variante
5. **Ligue para o técnico IMEDIATAMENTE**

### NUNCA Faça Isso
- ❌ Pagar o resgate (você financia criminosos e não tem garantia)
- ❌ Tentar descriptografar com ferramentas aleatórias
- ❌ Formatar sem analisar antes (destrói possibilidades de recuperação)
- ❌ Conectar dispositivos de backup no PC infectado

### Prevenção (Regra 3-2-1 de Backup)
- **3** cópias dos seus dados
- **2** tipos de mídia diferentes (HD externo + nuvem)
- **1** cópia offline (desconectada do computador)

### Recursos Gratuitos
- **No More Ransom** (nomoreransom.org): ferramentas gratuitas de descriptografia
- **ID Ransomware**: identifica a variante pelo arquivo criptografado
- **Emsisoft Decryptor**: ferramentas para dezenas de variantes`,
    whatsappMessage: "Olá! Meu computador foi infectado com ransomware e meus arquivos estão criptografados. URGENTE!",
    relatedPages: [
      { to: "/pc-com-pop-ups-e-propagandas-curitiba", label: "PC com Pop-ups" },
      { to: "/servicos/remocao-virus", label: "Remoção de Vírus" },
      { to: "/servicos/backup-recuperacao", label: "Backup e Recuperação" },
      { to: "/backup-perdido-curitiba", label: "Backup Perdido" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // --- notebook-tela-amarelada-curitiba ---
  {
    slug: "notebook-tela-amarelada-curitiba",
    title: "Notebook com Tela Amarelada em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Tela do notebook amarelada ou com tonalidade quente? Saiba as causas reais — cabo flat, inversor, painel LCD ou configuração — e como resolver em Curitiba.",
    h1: "Notebook com Tela Amarelada — Causas, Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware — Notebook",
    intro: `A tela do notebook ficou amarelada, com tonalidade quente ou cores distorcidas? Esse problema pode ter origem em configuração de software (modo noturno, perfil de cor), cabo flat deteriorado, falha no inversor da backlight ou degradação do próprio painel LCD.\n\nEm muitos casos, a causa é simples — o modo noturno (Night Light) do Windows está ativado ou o perfil de cor ICC está incorreto. Porém, quando a tonalidade persiste mesmo com ajustes de software, o problema é físico e exige diagnóstico profissional.\n\nEm Curitiba, nosso técnico realiza testes com monitor externo para isolar se a falha está na placa de vídeo, no cabo flat ou no painel LCD, garantindo um diagnóstico preciso antes de qualquer reparo.`,
    sintomas: [
      { titulo: "Tela com tom amarelado uniforme", desc: "Toda a tela apresenta uma tonalidade quente/amarelada que não existia antes, alterando a percepção de cores.", gravidade: "Médio" },
      { titulo: "Cores distorcidas em parte da tela", desc: "Apenas uma região da tela apresenta alteração de cor, podendo indicar dano no painel LCD.", gravidade: "Alto" },
      { titulo: "Tela amarelada após atualização do Windows", desc: "O problema surgiu após uma atualização que pode ter ativado o modo noturno ou alterado perfis de cor.", gravidade: "Baixo" },
      { titulo: "Tonalidade muda ao inclinar a tela", desc: "A cor muda conforme o ângulo, indicando possível problema no cabo flat ou conexão do painel.", gravidade: "Médio" },
      { titulo: "Tela amarelada com linhas ou manchas", desc: "Além da tonalidade alterada, surgem linhas ou manchas, indicando degradação do painel LCD.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "Modo Noturno (Night Light) ativado", desc: "O Windows possui um filtro de luz azul que torna a tela amarelada. Pode ser ativado acidentalmente ou por atualização.", tipo: "software" },
      { titulo: "Perfil de cor ICC incorreto", desc: "Drivers de vídeo ou atualizações podem alterar o perfil de cores do monitor, distorcendo a tonalidade.", tipo: "software" },
      { titulo: "Cabo flat deteriorado", desc: "O cabo que conecta a placa-mãe ao painel LCD pode oxidar ou romper parcialmente, causando alteração de cores.", tipo: "desgaste" },
      { titulo: "Degradação do painel LCD", desc: "Painéis LCD têm vida útil limitada. Com o tempo, a backlight pode amarelecer, especialmente em notebooks mais antigos.", tipo: "desgaste" },
      { titulo: "Falha na placa de vídeo integrada", desc: "Problemas no chip gráfico podem causar distorção de cores em toda a saída de vídeo.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Modo noturno ativado ou perfil de cor incorreto — ajuste via configurações do Windows e driver de vídeo.", tempo: "15-30 min", custo: "R$50–R$80" },
      { nivel: "Médio", desc: "Cabo flat oxidado ou com mau contato — substituição do cabo flat do display.", tempo: "1-2 horas", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Painel LCD degradado ou falha na GPU — substituição do painel ou reparo na placa-mãe.", tempo: "2-5 dias", custo: "R$400–R$900" },
    ],
    riscos: [
      "Forçar o cabo flat pode romper a conexão permanentemente",
      "Usar perfis de cor genéricos pode mascarar problemas reais de hardware",
      "Ignorar o problema pode indicar degradação progressiva do painel",
      "Tentativas de reparo sem experiência podem danificar o display",
    ],
    diagnostico: `O diagnóstico começa verificando configurações de software: modo noturno, perfil de cor ICC e driver de vídeo. Se o problema persistir, conectamos um monitor externo para testar a saída de vídeo da placa gráfica.\n\nSe a imagem no monitor externo estiver normal, o problema está no cabo flat ou painel LCD. Realizamos inspeção visual do cabo e testes de continuidade. Em casos de degradação do painel, avaliamos o custo-benefício da substituição versus um notebook novo.`,
    solucao: `Para causas de software, desativamos o Night Light, recalibramos o perfil de cor e atualizamos o driver de vídeo. Em casos de cabo flat, realizamos a substituição com peça compatível.\n\nPara painéis LCD degradados, substituímos o display completo com painel compatível. Em casos de falha na GPU integrada, avaliamos reparo por reballing ou substituição da placa-mãe, sempre considerando o custo-benefício.`,
    quandoCompensa: "Quando o notebook tem menos de 4 anos, o problema é no cabo flat (reparo barato) ou é apenas configuração de software.",
    quandoNaoCompensa: "Quando o painel LCD está degradado em notebook antigo e o custo de substituição ultrapassa 60% do valor de um notebook novo equivalente.",
    whatsappMessage: "Olá! A tela do meu notebook está amarelada. Preciso de diagnóstico e reparo em Curitiba.",
    conteudoExtra: `## Como Verificar se é Problema de Software\n\n1. **Desative o Night Light**: Vá em Configurações → Sistema → Tela → Desative \"Luz noturna\"\n2. **Verifique o perfil de cor**: Painel de Controle → Gerenciamento de Cores → Remova perfis personalizados\n3. **Atualize o driver de vídeo**: Acesse o site do fabricante (Intel, NVIDIA, AMD) e instale a versão mais recente\n4. **Teste com monitor externo**: Conecte via HDMI/VGA — se as cores estiverem normais no externo, o problema é no display do notebook\n\n## Quando Procurar um Técnico\n\nSe após os ajustes de software a tela continuar amarelada, é necessário diagnóstico profissional. Nosso técnico em Curitiba utiliza equipamentos de teste para identificar se a causa é o cabo flat, o painel ou a placa de vídeo.`,
    relatedPages: [
      { to: "/notebook-com-tela-piscando-curitiba", label: "Tela Piscando" },
      { to: "/pc-sem-imagem-curitiba", label: "PC Sem Imagem" },
      { to: "/servicos/conserto-pc-notebook", label: "Conserto de Notebook" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // --- pc-nao-entra-modo-seguro-curitiba ---
  {
    slug: "pc-nao-entra-modo-seguro-curitiba",
    title: "PC Não Entra no Modo Seguro em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Computador não entra no Modo Seguro do Windows? Saiba as causas — BCD corrompido, falha no disco, malware — e como resolver em Curitiba.",
    h1: "PC Não Entra no Modo Seguro — Causas e Soluções em Curitiba",
    categoria: "Software — Windows",
    intro: `O Modo Seguro é essencial para diagnosticar e resolver problemas do Windows. Quando o computador não consegue entrar nesse modo, a situação é crítica — indica que o sistema operacional pode estar severamente corrompido.\n\nAs causas mais comuns incluem BCD (Boot Configuration Data) corrompido, setores defeituosos no disco que impedem o carregamento dos arquivos de boot, infecção por malware que altera o bootloader, ou falha em componentes de hardware como RAM e disco.\n\nEm Curitiba, nosso técnico utiliza ferramentas de boot externo (WinPE, Linux Live) para acessar o sistema, reparar o BCD e recuperar o acesso ao Modo Seguro, preservando os dados do cliente.`,
    sintomas: [
      { titulo: "Tela preta ao tentar Modo Seguro", desc: "O computador exibe tela preta sem cursor após selecionar Modo Seguro no menu de boot.", gravidade: "Alto" },
      { titulo: "Reinicia em loop ao selecionar Modo Seguro", desc: "O PC tenta carregar o Modo Seguro mas reinicia automaticamente, entrando em loop infinito.", gravidade: "Alto" },
      { titulo: "Erro 'Winload.exe ausente' no boot", desc: "Mensagem de erro indicando que o arquivo de boot do Windows está corrompido ou ausente.", gravidade: "Alto" },
      { titulo: "Menu de boot não aparece com F8", desc: "A tecla F8 não abre o menu de opções avançadas, impedindo o acesso ao Modo Seguro.", gravidade: "Médio" },
      { titulo: "BSOD ao carregar Modo Seguro", desc: "Tela azul aparece durante o carregamento do Modo Seguro, indicando falha crítica de driver ou hardware.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "BCD (Boot Configuration Data) corrompido", desc: "O arquivo de configuração de boot foi danificado por desligamento forçado, vírus ou falha de disco.", tipo: "software" },
      { titulo: "Setores defeituosos no disco", desc: "Áreas do disco onde estão os arquivos de boot do Modo Seguro estão fisicamente danificadas.", tipo: "hardware" },
      { titulo: "Malware no bootloader", desc: "Rootkits e bootkits podem alterar o processo de boot, impedindo o carregamento do Modo Seguro.", tipo: "software" },
      { titulo: "Driver incompatível travando o boot", desc: "Um driver essencial falha mesmo no Modo Seguro, causando BSOD ou trava.", tipo: "software" },
      { titulo: "RAM com defeito", desc: "Módulos de memória com falha podem causar erros aleatórios durante qualquer processo de boot.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "BCD corrompido — reparo via bcdedit e bootrec a partir de mídia de instalação do Windows.", tempo: "30-60 min", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Arquivos de sistema corrompidos — reparo via SFC/DISM com boot externo ou reinstalação preservando dados.", tempo: "2-4 horas", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Disco com setores defeituosos ou malware no bootloader — clonagem de disco, remoção de rootkit ou substituição de hardware.", tempo: "1-3 dias", custo: "R$250–R$500" },
    ],
    riscos: [
      "Tentativas incorretas de reparo do BCD podem tornar o Windows completamente inacessível",
      "Formatação precipitada causa perda total de dados sem necessidade",
      "Ignorar setores defeituosos leva à perda progressiva de dados",
      "Rootkits não removidos podem roubar senhas e dados bancários",
    ],
    diagnostico: `Iniciamos o diagnóstico com boot via mídia externa (WinPE ou Linux Live) para acessar o disco e verificar a integridade dos arquivos de boot. Executamos bootrec /fixmbr, bootrec /fixboot e bootrec /rebuildbcd.\n\nSe o reparo do BCD não resolver, verificamos a integridade do disco com CHKDSK e realizamos teste de memória RAM. Em casos de suspeita de malware, fazemos varredura offline com ferramentas especializadas.`,
    solucao: `Para BCD corrompido, reconstruímos a configuração de boot usando o Prompt de Comando do ambiente de recuperação. Para arquivos de sistema danificados, executamos SFC /scannow e DISM offline.\n\nEm casos de disco defeituoso, realizamos clonagem para um disco saudável antes de qualquer reparo. Para malware no bootloader, utilizamos ferramentas de remoção offline e, se necessário, reinstalamos o Windows preservando os dados do usuário.`,
    quandoCompensa: "Quando o problema é apenas BCD corrompido ou driver incompatível — reparo rápido e barato que restaura o acesso completo.",
    quandoNaoCompensa: "Quando o disco está com muitos setores defeituosos e o sistema já apresentava instabilidade — melhor migrar para SSD novo com instalação limpa.",
    whatsappMessage: "Olá! Meu PC não entra no Modo Seguro do Windows. Preciso de ajuda técnica em Curitiba.",
    conteudoExtra: `## Alternativas ao F8 para Acessar o Modo Seguro\n\nNo Windows 10/11, o F8 está desabilitado por padrão. Alternativas:\n\n1. **Via Configurações**: Configurações → Atualização → Recuperação → Reiniciar agora → Solução de Problemas → Opções Avançadas → Configurações de Inicialização\n2. **Via msconfig**: Execute msconfig → aba Inicialização do Sistema → marque \"Inicialização segura\"\n3. **Via Shift+Reiniciar**: Na tela de login, segure Shift e clique em Reiniciar\n4. **Forçar Recuperação**: Desligue o PC 3 vezes durante o boot para ativar o Reparo Automático\n\n## Quando o Modo Seguro é Essencial\n\nO Modo Seguro carrega apenas drivers básicos, permitindo remover programas problemáticos, desinstalar drivers incompatíveis e executar antivírus em ambiente limpo.`,
    relatedPages: [
      { to: "/erro-0xc000021a-curitiba", label: "Erro 0xc000021a" },
      { to: "/tela-azul-bsod-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/computador-nao-liga-curitiba", label: "PC Não Liga" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
    ]
  },

  // --- erro-0xc000021a-curitiba ---
  {
    slug: "erro-0xc000021a-curitiba",
    title: "Erro 0xc000021a Windows em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Erro 0xc000021a no Windows? Tela azul crítica com STATUS_SYSTEM_PROCESS_TERMINATED. Saiba as causas e como resolver em Curitiba.",
    h1: "Erro 0xc000021a no Windows — Diagnóstico e Reparo em Curitiba",
    categoria: "Software — Windows",
    intro: `O erro 0xc000021a (STATUS_SYSTEM_PROCESS_TERMINATED) é uma das telas azuis mais críticas do Windows. Ele indica que um processo essencial do sistema (csrss.exe ou winlogon.exe) falhou, e o Windows não consegue continuar operando.\n\nEste erro geralmente impede o boot completo do sistema, deixando o computador preso em loop de reinicialização ou na tela azul. As causas incluem atualização do Windows mal-sucedida, arquivos de sistema corrompidos, driver incompatível ou infecção por malware.\n\nEm Curitiba, nosso técnico resolve este erro utilizando ferramentas de recuperação avançadas, reparando arquivos de sistema sem perda de dados.`,
    sintomas: [
      { titulo: "Tela azul com código 0xc000021a", desc: "BSOD exibindo STATUS_SYSTEM_PROCESS_TERMINATED, impedindo o carregamento do Windows.", gravidade: "Alto" },
      { titulo: "Loop de reinicialização infinito", desc: "O PC tenta iniciar, mostra o erro e reinicia automaticamente sem conseguir carregar o desktop.", gravidade: "Alto" },
      { titulo: "Erro após atualização do Windows", desc: "O problema surgiu imediatamente após uma atualização do Windows Update que falhou ou foi interrompida.", gravidade: "Alto" },
      { titulo: "Reparo automático não resolve", desc: "O Windows tenta o Reparo Automático mas falha, exibindo 'Não foi possível reparar o PC'.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "Atualização do Windows corrompida", desc: "Uma atualização foi interrompida ou instalou arquivos incompatíveis, corrompendo processos críticos (csrss.exe, winlogon.exe).", tipo: "software" },
      { titulo: "Arquivos de sistema corrompidos", desc: "Desligamento forçado ou falha de disco corrompeu arquivos essenciais do Windows.", tipo: "software" },
      { titulo: "Driver incompatível", desc: "Um driver de dispositivo instalado recentemente causa conflito com processos críticos do sistema.", tipo: "software" },
      { titulo: "Infecção por malware", desc: "Vírus ou rootkits podem substituir ou corromper processos essenciais do Windows.", tipo: "software" },
      { titulo: "Disco com setores defeituosos", desc: "Falhas físicas no disco onde estão armazenados os arquivos de sistema do Windows.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Atualização recente causou o problema — reversão da atualização via Ambiente de Recuperação.", tempo: "30-60 min", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Arquivos de sistema corrompidos — reparo via SFC/DISM offline ou restauração do sistema.", tempo: "2-4 horas", custo: "R$150–R$300" },
      { nivel: "Complexo", desc: "Disco defeituoso ou corrupção severa — clonagem de disco, reinstalação do Windows preservando dados.", tempo: "1-3 dias", custo: "R$250–R$500" },
    ],
    riscos: [
      "Tentativas repetidas de boot podem agravar a corrupção de arquivos",
      "Formatação sem backup causa perda total de dados",
      "Ignorar setores defeituosos no disco leva a falhas recorrentes",
      "Reinstalação sem resolver a causa raiz faz o erro retornar",
    ],
    diagnostico: `O diagnóstico inicia com boot via mídia de recuperação do Windows ou Linux Live para acessar o disco sem carregar o sistema corrompido. Verificamos os logs de erro em C:\\Windows\\System32\\winevt\\Logs para identificar o processo que falhou.\n\nExecutamos SFC /scannow e DISM offline para verificar e reparar arquivos de sistema. Testamos a integridade do disco com CHKDSK e realizamos verificação de malware offline. Se o erro surgiu após atualização, tentamos reverter via DISM /Remove-Package.`,
    solucao: `Para atualizações problemáticas, revertemos o pacote específico usando DISM offline. Para arquivos corrompidos, reparamos com SFC/DISM ou restauramos de um ponto de restauração.\n\nEm casos severos, realizamos uma instalação de reparo (In-Place Upgrade) que reinstala o Windows mantendo programas e dados. Se o disco estiver defeituoso, clonamos para um SSD saudável antes de qualquer reparo.`,
    quandoCompensa: "Quando o erro surgiu após uma atualização específica ou o sistema tem ponto de restauração disponível — reparo rápido sem perda de dados.",
    quandoNaoCompensa: "Quando o disco está fisicamente danificado e o sistema já apresentava múltiplos erros — melhor instalar Windows limpo em SSD novo.",
    whatsappMessage: "Olá! Meu PC está com erro 0xc000021a e não liga. Preciso de ajuda técnica em Curitiba.",
    conteudoExtra: `## O Que Significa o Erro 0xc000021a\n\nEste código indica que um dos dois processos mais críticos do Windows falhou:\n\n- **csrss.exe** (Client/Server Runtime Subsystem): Gerencia console, criação/destruição de threads e funções críticas do kernel\n- **winlogon.exe**: Responsável pelo login, logoff e carregamento do perfil do usuário\n\nQuando qualquer um desses processos termina inesperadamente, o Windows não pode continuar e exibe a tela azul.\n\n## Passos de Emergência\n\n1. **Não force reinicializações repetidas** — isso pode piorar a corrupção\n2. **Acesse o Ambiente de Recuperação** — use uma mídia de instalação USB do Windows\n3. **Tente a Restauração do Sistema** — se houver pontos de restauração disponíveis\n4. **Não formate sem backup** — seus dados provavelmente estão intactos no disco`,
    relatedPages: [
      { to: "/tela-azul-bsod-curitiba", label: "Tela Azul (BSOD)" },
      { to: "/erro-0x0000007b-curitiba", label: "Erro 0x0000007B" },
      { to: "/pc-nao-entra-modo-seguro-curitiba", label: "PC Não Entra no Modo Seguro" },
      { to: "/servicos/formatacao-computador", label: "Formatação" },
    ]
  },

  // --- computador-sem-wifi-curitiba ---
  {
    slug: "computador-sem-wifi-curitiba",
    title: "Computador Sem Wi-Fi em Curitiba | Diagnóstico e Reparo",
    metaDescription: "Computador não conecta no Wi-Fi? Ícone de rede ausente ou adaptador desativado? Saiba as causas e como resolver em Curitiba.",
    h1: "Computador Sem Wi-Fi — Causas, Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware/Software — Rede",
    intro: `O computador parou de mostrar redes Wi-Fi disponíveis ou o ícone de rede sem fio desapareceu? Este problema pode ter causas variadas — desde um simples botão de Wi-Fi desativado até falha no adaptador de rede sem fio.\n\nAs causas mais comuns incluem adaptador Wi-Fi desativado no Windows ou por tecla de função (Fn), driver de rede corrompido após atualização, serviço WLAN AutoConfig parado, antena Wi-Fi desconectada (em notebooks) ou falha física no módulo wireless.\n\nEm Curitiba, nosso técnico diagnostica rapidamente se o problema é de software (driver, serviço, configuração) ou hardware (módulo Wi-Fi, antena), resolvendo na maioria dos casos no mesmo dia.`,
    sintomas: [
      { titulo: "Ícone de Wi-Fi ausente na barra de tarefas", desc: "O ícone de rede sem fio desapareceu completamente, sem opção de conectar a redes.", gravidade: "Médio" },
      { titulo: "Adaptador Wi-Fi não aparece no Gerenciador de Dispositivos", desc: "O Windows não reconhece nenhum adaptador de rede sem fio instalado.", gravidade: "Alto" },
      { titulo: "Wi-Fi aparece mas não encontra redes", desc: "O adaptador está ativo mas a lista de redes disponíveis está sempre vazia.", gravidade: "Médio" },
      { titulo: "Conecta mas desconecta frequentemente", desc: "O Wi-Fi conecta por alguns minutos e depois cai, exigindo reconexão manual.", gravidade: "Médio" },
      { titulo: "Erro 'Sem adaptador de rede sem fio'", desc: "Mensagem indicando que nenhum adaptador wireless foi encontrado no sistema.", gravidade: "Alto" },
    ],
    causas: [
      { titulo: "Adaptador Wi-Fi desativado", desc: "O adaptador pode ter sido desativado por tecla de função (Fn+F2/F5), pelo Modo Avião ou nas configurações do Windows.", tipo: "software" },
      { titulo: "Driver de rede corrompido ou ausente", desc: "Atualização do Windows removeu ou corrompeu o driver do adaptador Wi-Fi.", tipo: "software" },
      { titulo: "Serviço WLAN AutoConfig parado", desc: "O serviço do Windows responsável por gerenciar conexões Wi-Fi não está em execução.", tipo: "software" },
      { titulo: "Antena Wi-Fi desconectada (notebook)", desc: "Os cabos da antena Wi-Fi dentro do notebook podem ter se desconectado, especialmente após manutenção.", tipo: "hardware" },
      { titulo: "Módulo Wi-Fi com defeito", desc: "O chip ou placa Wi-Fi (geralmente mini PCIe ou M.2) falhou e precisa ser substituído.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Adaptador desativado ou Modo Avião ligado — reativação via configurações, tecla Fn ou Gerenciador de Dispositivos.", tempo: "15-30 min", custo: "R$50–R$80" },
      { nivel: "Médio", desc: "Driver corrompido ou serviço parado — reinstalação do driver e configuração de serviços do Windows.", tempo: "30-60 min", custo: "R$80–R$150" },
      { nivel: "Complexo", desc: "Módulo Wi-Fi defeituoso ou antena desconectada — substituição do módulo wireless ou reconexão da antena.", tempo: "1-2 horas", custo: "R$150–R$350" },
    ],
    riscos: [
      "Instalar drivers genéricos pode causar instabilidade no sistema",
      "Abrir o notebook sem experiência pode danificar cabos flat e antenas",
      "Usar adaptador USB como solução permanente pode causar desconexões",
      "Ignorar o problema pode indicar falha progressiva na placa-mãe",
    ],
    diagnostico: `O diagnóstico inicia verificando se o adaptador está visível no Gerenciador de Dispositivos. Se ausente, testamos com boot via Linux Live para verificar se o hardware é reconhecido — isso diferencia falha de software (driver Windows) de falha física.\n\nVerificamos o serviço WLAN AutoConfig, testamos diferentes drivers e, em notebooks, inspecionamos a conexão física da antena e do módulo Wi-Fi. Em desktops, testamos com outro adaptador Wi-Fi para confirmar a falha.`,
    solucao: `Para problemas de software, reinstalamos o driver correto do fabricante, reiniciamos serviços de rede e reconfiguramos o adaptador. Em casos de driver removido por atualização, fazemos rollback.\n\nPara falhas de hardware em notebooks, reconectamos a antena ou substituímos o módulo Wi-Fi (mini PCIe/M.2) por peça compatível. Em desktops, substituímos a placa Wi-Fi PCIe ou configuramos um adaptador USB de alta qualidade como alternativa.`,
    quandoCompensa: "Quando o problema é de software (driver, serviço) ou quando o módulo Wi-Fi é barato e fácil de substituir no modelo específico.",
    quandoNaoCompensa: "Quando a falha está na placa-mãe (trilha do slot Wi-Fi danificada) e o custo de reparo ultrapassa o valor de um adaptador USB externo de qualidade.",
    whatsappMessage: "Olá! Meu computador não conecta no Wi-Fi. Preciso de diagnóstico e reparo em Curitiba.",
    conteudoExtra: `## Verificações Rápidas Antes de Chamar um Técnico\n\n1. **Verifique o Modo Avião**: Configurações → Rede e Internet → certifique-se que o Modo Avião está desligado\n2. **Tecla de função**: Pressione Fn + tecla com ícone de Wi-Fi (varia por fabricante: F2, F5, F12)\n3. **Gerenciador de Dispositivos**: Clique com botão direito no menu Iniciar → Gerenciador de Dispositivos → Adaptadores de Rede → verifique se o adaptador Wi-Fi está ativo\n4. **Serviço WLAN**: Execute services.msc → procure \"Configuração Automática de WLAN\" → certifique-se que está Iniciado e Automático\n5. **Reset de rede**: Configurações → Rede → Redefinição de rede\n\n## Adaptador USB como Solução Temporária\n\nEnquanto aguarda o reparo, um adaptador Wi-Fi USB pode restaurar a conectividade. Recomendamos modelos com antena externa para melhor sinal. Nosso técnico pode indicar o modelo ideal para seu caso.`,
    relatedPages: [
      { to: "/pc-nao-conecta-internet-curitiba", label: "PC Sem Internet" },
      { to: "/notebook-nao-conecta-bluetooth-curitiba", label: "Sem Bluetooth" },
      { to: "/servicos/redes-wifi", label: "Redes e Wi-Fi" },
      { to: "/diagnostico-tecnico", label: "Diagnóstico Técnico" },
    ]
  },

  // ==================== NOTEBOOK SEM WEBCAM ====================
  {
    slug: "notebook-sem-webcam-curitiba",
    title: "Notebook Sem Webcam Funcionando em Curitiba | Câmera Não Detectada",
    metaDescription: "Webcam do notebook não funciona em Curitiba? Diagnóstico de driver, cabo flat e módulo da câmera. Técnico especialista com atendimento rápido.",
    h1: "Notebook Sem Webcam Funcionando em Curitiba — Câmera Não Detectada",
    categoria: "Problemas de Notebook",
    intro: `A webcam integrada do notebook parou de funcionar ou não é detectada pelo sistema. O problema pode aparecer como "câmera não encontrada", tela preta em aplicativos de vídeo, LED da câmera não acende, ou a webcam simplesmente desapareceu do Gerenciador de Dispositivos.\n\nEm Curitiba, com o aumento do trabalho remoto e reuniões online, esse problema impacta diretamente a produtividade. As causas variam desde configurações de privacidade do Windows até falha física do módulo da câmera.`,
    sintomas: [
      { titulo: "Webcam não aparece no Gerenciador de Dispositivos", desc: "O módulo da câmera não é reconhecido pelo sistema. Pode ser driver ausente, cabo flat desconectado ou falha no hardware.", gravidade: "Médio a complexo" },
      { titulo: "Tela preta em aplicativos de vídeo", desc: "Zoom, Teams ou Google Meet exibem tela preta. O dispositivo pode estar bloqueado por privacidade ou com driver corrompido.", gravidade: "Simples a médio" },
      { titulo: "LED da câmera não acende", desc: "Ao abrir aplicativos de vídeo, o LED indicador não liga, sugerindo que o hardware não está sendo ativado.", gravidade: "Médio" },
      { titulo: "Mensagem 'Não foi possível encontrar sua câmera'", desc: "Erro 0xA00F4244 do Windows indica que nenhum dispositivo de câmera foi detectado pelo sistema.", gravidade: "Médio" },
      { titulo: "Webcam funciona intermitentemente", desc: "Liga e desliga sozinha durante uso. Geralmente indica cabo flat com mau contato ou driver instável.", gravidade: "Médio" },
      { titulo: "Imagem congelada ou com linhas", desc: "A câmera é detectada mas a imagem congela ou apresenta artefatos visuais, indicando falha parcial do sensor.", gravidade: "Médio a complexo" },
    ],
    causas: [
      { titulo: "Configurações de Privacidade do Windows", desc: "O Windows 10/11 tem opções que bloqueiam o acesso à câmera por aplicativos. Uma atualização pode redefinir essas configurações.", tipo: "software" },
      { titulo: "Driver corrompido ou ausente", desc: "Atualizações do Windows podem remover ou corromper o driver da webcam, tornando o dispositivo invisível ao sistema.", tipo: "software" },
      { titulo: "Cabo flat desconectado", desc: "Em notebooks que sofreram queda ou tiveram a tela aberta para reparo, o cabo flat da câmera pode ter se desconectado.", tipo: "hardware" },
      { titulo: "Módulo da câmera defeituoso", desc: "Falha no hardware do sensor CMOS da webcam. Pode ocorrer por desgaste ou impacto.", tipo: "hardware" },
      { titulo: "Antivírus bloqueando acesso", desc: "Alguns antivírus possuem proteção de webcam que impede o acesso por aplicativos não autorizados.", tipo: "software" },
      { titulo: "Tampa de privacidade física fechada", desc: "Slider de privacidade fechado (comum em notebooks corporativos Lenovo, HP e Dell) bloqueia fisicamente a câmera.", tipo: "erro-humano" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Configuração de privacidade bloqueando, tampa física fechada ou driver desatualizado. Resolvido remotamente ou na visita.", tempo: "15 min a 30 min", custo: "Dentro da visita técnica" },
      { nivel: "Médio", desc: "Driver corrompido por atualização, conflito de software ou reinstalação necessária. Pode exigir rollback.", tempo: "30 min a 1h", custo: "R$ 90 a R$ 150" },
      { nivel: "Complexo", desc: "Cabo flat desconectado ou módulo da câmera defeituoso. Requer abertura do notebook e possível substituição de peça.", tempo: "1h a 3h", custo: "R$ 150 a R$ 300 + peça" },
    ],
    riscos: [
      "Reinstalar drivers incorretos pode causar conflitos com outros dispositivos",
      "Abrir a tampa do notebook sem experiência pode danificar o cabo flat da tela",
      "Usar webcam USB como alternativa permanente ocupa porta e reduz portabilidade",
      "Ignorar falha intermitente pode indicar problema progressivo no cabo flat",
    ],
    diagnostico: `O diagnóstico começa verificando as Configurações de Privacidade do Windows (Configurações → Privacidade → Câmera). Em seguida, verificamos o Gerenciador de Dispositivos para confirmar se o hardware é reconhecido.\n\nSe o dispositivo aparece com erro, testamos reinstalação de driver. Se não aparece, fazemos boot com Linux Live USB para verificar se o hardware é detectado fora do Windows — isso diferencia falha de software de hardware.\n\nPara suspeita de cabo flat, inspecionamos a conexão física entre a placa-mãe e o módulo da câmera na tampa do notebook.`,
    solucao: `Para problemas de software, reconfiguramos as permissões de privacidade, reinstalamos o driver correto do fabricante e removemos conflitos de antivírus. Em casos de driver corrompido por atualização, fazemos rollback.\n\nPara falhas de hardware, reconectamos o cabo flat da webcam ou substituímos o módulo da câmera. A maioria dos módulos de webcam para notebook é acessível e tem custo baixo. Em casos raros onde a placa controladora falhou, configuramos uma webcam USB compacta de alta qualidade como alternativa.`,
    quandoCompensa: "Quando o problema é de software (driver, permissão) ou quando o módulo da câmera é acessível e barato para o modelo específico.",
    quandoNaoCompensa: "Quando a falha está na placa controladora integrada à placa-mãe e o custo de reparo ultrapassa o valor de uma webcam USB externa de qualidade.",
    whatsappMessage: "Olá! A webcam do meu notebook não está funcionando. Preciso de diagnóstico e reparo em Curitiba.",
    conteudoExtra: `## Verificações Rápidas Antes de Chamar um Técnico\n\n1. **Verifique a tampa de privacidade**: Muitos notebooks têm um slider físico sobre a câmera\n2. **Configurações de Privacidade**: Configurações → Privacidade e Segurança → Câmera → ative "Acesso à câmera"\n3. **Gerenciador de Dispositivos**: Clique com botão direito no menu Iniciar → procure "Câmeras" ou "Dispositivos de imagem"\n4. **Teste em outro app**: Se não funciona no Teams, teste no aplicativo Câmera do Windows\n5. **Reinicie o notebook**: Um simples reinício pode resolver conflitos temporários\n\n## Webcam USB como Solução Temporária\n\nPara reuniões urgentes, uma webcam USB pode ser conectada imediatamente. Modelos Full HD com microfone integrado custam a partir de R$ 80 e oferecem qualidade superior à maioria das webcams integradas.`,
    relatedPages: [
      { label: "Notebook Não Liga", to: "/notebook-nao-liga-curitiba" },
      { label: "Conserto de Notebook", to: "/servicos/conserto-pc-notebook" },
      { label: "Tela Preta", to: "/notebook-tela-preta-curitiba" },
      { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
    ]
  },

  // ==================== ERRO 0xC00000E ====================
  {
    slug: "erro-0xc00000e-curitiba",
    title: "Erro 0xc00000e em Curitiba | PC Não Inicia — BCD Corrompido",
    metaDescription: "Erro 0xc00000e no Windows em Curitiba? Reparo de BCD, boot manager e configuração de inicialização. Técnico especialista com diagnóstico rápido.",
    h1: "Erro 0xc00000e — PC Não Inicia em Curitiba — BCD Corrompido",
    categoria: "Erros de Windows",
    intro: `O erro 0xc00000e é uma das telas azuis mais comuns que impedem o Windows de iniciar. Ele indica que o Boot Configuration Data (BCD) — o arquivo que diz ao sistema onde encontrar o Windows no disco — está corrompido, ausente ou referenciando uma partição incorreta.\n\nEm Curitiba, atendemos esse erro frequentemente após atualizações do Windows que falharam, clonagem de disco mal feita, ou quando o usuário adicionou/removeu um segundo HD/SSD sem reconfigurar o boot. A tela exibe "Seu PC precisa ser reparado" com o código 0xc000000e.`,
    sintomas: [
      { titulo: "Tela azul com código 0xc000000e", desc: "Ao ligar o PC, aparece tela azul de recuperação com o código de erro específico, impedindo qualquer acesso ao sistema.", gravidade: "Complexo" },
      { titulo: "Mensagem 'Seu PC precisa ser reparado'", desc: "O Windows exibe tela de recuperação indicando que o dispositivo precisa ser reparado antes de iniciar.", gravidade: "Médio a complexo" },
      { titulo: "Windows não inicia após múltiplas tentativas", desc: "Mesmo reiniciando várias vezes, o sistema não consegue passar da tela de erro.", gravidade: "Complexo" },
      { titulo: "Erro após atualização do Windows", desc: "O problema surgiu imediatamente após uma atualização do Windows que foi interrompida ou falhou.", gravidade: "Médio" },
      { titulo: "Problema após clonar disco ou trocar SSD", desc: "Ao migrar para SSD novo, o BCD não foi transferido corretamente e o boot falha.", gravidade: "Médio" },
      { titulo: "Tela de recuperação em loop infinito", desc: "O reparo automático tenta corrigir mas falha repetidamente, entrando em ciclo.", gravidade: "Complexo" },
    ],
    causas: [
      { titulo: "BCD corrompido", desc: "O arquivo de configuração de boot foi danificado por desligamento forçado ou falha de energia durante gravação.", tipo: "software" },
      { titulo: "Clonagem de disco incorreta", desc: "Ao migrar para SSD, a partição EFI/boot não foi clonada corretamente, deixando o bootloader órfão.", tipo: "erro-humano" },
      { titulo: "Atualização do Windows falhou", desc: "Update interrompido por falta de energia ou desligamento corrompeu os arquivos de inicialização.", tipo: "software" },
      { titulo: "Ordem de boot alterada na BIOS", desc: "BIOS/UEFI está tentando iniciar pelo disco errado após alteração manual ou reset de CMOS.", tipo: "erro-humano" },
      { titulo: "Partição EFI danificada", desc: "A partição de sistema EFI (100-500MB) foi modificada ou formatada acidentalmente por software de partição.", tipo: "software" },
      { titulo: "Setores defeituosos no disco", desc: "Área do disco onde o BCD está armazenado possui bad blocks, impossibilitando a leitura do bootloader.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Ordem de boot errada na BIOS ou BCD com referência incorreta após adição de segundo disco. Correção rápida.", tempo: "20 min a 40 min", custo: "Dentro da visita técnica" },
      { nivel: "Médio", desc: "BCD corrompido por atualização ou clonagem. Reconstrução com bootrec e bcdboot via ambiente de recuperação.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Complexo", desc: "Partição EFI danificada ou disco com setores defeituosos. Recriação da partição EFI ou substituição de disco.", tempo: "2h a 4h", custo: "R$ 200 a R$ 400 + peça" },
    ],
    riscos: [
      "Usar comandos bootrec sem conhecimento pode apagar a configuração de todos os sistemas instalados",
      "Formatar a partição EFI incorreta pode tornar outros sistemas (dual boot) inacessíveis",
      "Ignorar setores defeituosos pode levar à perda de dados progressiva",
      "Tentativas repetidas de reparo automático podem agravar a corrupção",
    ],
    diagnostico: `O diagnóstico inicia com boot via mídia de instalação do Windows (USB/DVD) para acessar o Prompt de Comando do ambiente de recuperação. Verificamos o estado do BCD com \`bcdedit /enum\` e identificamos se as referências de partição estão corretas.\n\nTestamos a integridade do disco com \`chkdsk /r\` na partição do sistema e verificamos se a partição EFI existe e está íntegra. Em sistemas UEFI, confirmamos que o tipo de partição GPT está correto. Se o erro surgiu após clonagem, verificamos se o bootloader foi transferido corretamente.`,
    solucao: `Para BCD corrompido, reconstruímos usando os comandos \`bootrec /fixmbr\`, \`bootrec /fixboot\`, \`bootrec /scanos\` e \`bootrec /rebuildbcd\` a partir do ambiente de recuperação. Em sistemas UEFI, recriamos a entrada no boot manager com \`bcdboot\`.\n\nSe a partição EFI foi danificada, recriamos a partição de sistema EFI e reinstalamos o bootloader. Para discos com setores defeituosos, fazemos backup dos dados e substituímos o disco. Após clonagem mal feita, reconfiguramos o BCD para apontar para as partições corretas no novo SSD.`,
    quandoCompensa: "Quando o problema é apenas de BCD corrompido e o disco está saudável — o reparo é rápido e sem perda de dados.",
    quandoNaoCompensa: "Quando o disco possui setores defeituosos extensos na área de boot ou quando a instalação do Windows está severamente corrompida, sendo mais rápido reinstalar.",
    whatsappMessage: "Olá! Meu PC está com erro 0xc00000e e não inicia. Preciso de reparo em Curitiba.",
    conteudoExtra: `## O Que Fazer Quando Aparece o Erro 0xc00000e\n\n1. **Não entre em pânico**: Seus dados provavelmente estão seguros — o erro é no bootloader, não nos arquivos\n2. **Verifique a ordem de boot**: Entre na BIOS (Del, F2 ou F12 ao ligar) e confirme que o disco correto está como primeiro boot\n3. **Tente o Reparo Automático**: Se o Windows oferece "Opções avançadas", tente "Reparo de Inicialização"\n4. **Não formate**: Formatar apaga seus dados — o erro pode ser resolvido sem perda\n5. **Desligue o PC**: Tentativas repetidas de ligar com disco defeituoso podem agravar o problema\n\n## Erro Após Clonagem de SSD\n\nSe o erro apareceu após migrar para um SSD novo, o problema quase certamente é que o BCD não foi transferido. Nosso técnico reconfigura o bootloader no novo SSD sem necessidade de reinstalar o Windows, preservando todos os programas e configurações.`,
    relatedPages: [
      { label: "Erro 0xc000021a", to: "/erro-0xc000021a-curitiba" },
      { label: "Tela Azul (BSOD)", to: "/tela-azul-bsod-curitiba" },
      { label: "PC Não Liga", to: "/computador-nao-liga-curitiba" },
      { label: "Formatação", to: "/servicos/formatacao-computador" },
    ]
  },

  // ==================== PC COM TELA CONGELADA ====================
  {
    slug: "pc-com-tela-congelada-curitiba",
    title: "PC com Tela Congelada em Curitiba | Computador Trava e Não Responde",
    metaDescription: "Computador congela e trava em Curitiba? Diagnóstico de superaquecimento, RAM, disco e drivers. Técnico especialista resolve com atendimento rápido.",
    h1: "PC com Tela Congelada em Curitiba — Computador Trava e Não Responde",
    categoria: "Problemas de Computador",
    intro: `O computador congela completamente — o mouse para, o teclado não responde e a única saída é forçar o desligamento pelo botão de energia. Esse problema pode ser aleatório ou ocorrer em situações específicas como ao abrir programas pesados, jogar ou após um tempo de uso.\n\nEm Curitiba, diagnosticamos centenas de casos de tela congelada. As causas mais comuns são superaquecimento (especialmente em dias quentes ou notebooks com ventilação obstruída), memória RAM defeituosa, disco rígido com setores defeituosos e drivers de vídeo incompatíveis.`,
    sintomas: [
      { titulo: "Tela congela completamente", desc: "Mouse e teclado não respondem. A única saída é forçar desligamento pelo botão de energia.", gravidade: "Médio a complexo" },
      { titulo: "Travamentos aleatórios durante o uso", desc: "O computador congela sem padrão aparente, podendo ocorrer a qualquer momento durante uso normal.", gravidade: "Médio" },
      { titulo: "Congelamento ao usar programas específicos", desc: "Sempre trava ao abrir determinado programa ou jogo, sugerindo incompatibilidade ou falta de recursos.", gravidade: "Simples a médio" },
      { titulo: "Trava durante jogos ou tarefas pesadas", desc: "Congelamento sob carga indica superaquecimento, fonte instável ou GPU com defeito.", gravidade: "Médio a complexo" },
      { titulo: "Trava após poucos minutos de uso", desc: "PC funciona brevemente e congela, sugerindo superaquecimento rápido ou RAM com erro.", gravidade: "Médio" },
      { titulo: "Travamento com áudio em loop", desc: "O som fica repetindo o último fragmento enquanto a tela congela — indica travamento de kernel.", gravidade: "Complexo" },
    ],
    causas: [
      { titulo: "Superaquecimento", desc: "Pasta térmica seca, cooler obstruído por poeira ou ventilação insuficiente fazem o processador throttle e congelar o sistema.", tipo: "hardware" },
      { titulo: "Memória RAM defeituosa", desc: "Módulos com erros intermitentes causam travamentos aleatórios. Pode ser oxidação ou chip danificado.", tipo: "hardware" },
      { titulo: "HD com setores defeituosos", desc: "HD mecânico com bad blocks congela ao tentar ler áreas danificadas do disco.", tipo: "desgaste" },
      { titulo: "Driver de vídeo incompatível", desc: "Driver da GPU corrompido ou versão incompatível com o Windows causa travamento durante renderização.", tipo: "software" },
      { titulo: "Fonte de alimentação instável", desc: "Fonte fornecendo voltagem irregular causa travamentos sob carga quando a demanda de energia aumenta.", tipo: "hardware" },
      { titulo: "Capacitores estufados na placa-mãe", desc: "Capacitores danificados causam instabilidade geral e travamentos imprevisíveis.", tipo: "desgaste" },
      { titulo: "Conflito de software ou malware", desc: "Antivírus, programas em segundo plano ou malware consumindo 100% dos recursos do sistema.", tipo: "software" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Driver de vídeo desatualizado, conflito de software ou configuração errada. Resolvido com atualização ou remoção.", tempo: "30 min a 1h", custo: "Dentro da visita técnica" },
      { nivel: "Médio", desc: "Superaquecimento por poeira ou pasta térmica seca. Limpeza completa e troca de pasta térmica.", tempo: "1h a 2h", custo: "R$ 120 a R$ 200" },
      { nivel: "Complexo", desc: "RAM defeituosa, HD com bad blocks, fonte instável ou capacitores estufados. Substituição de componentes.", tempo: "1 a 3 dias", custo: "R$ 200 a R$ 500 + peças" },
    ],
    riscos: [
      "Desligamentos forçados repetidos podem corromper o sistema de arquivos",
      "Ignorar superaquecimento pode danificar permanentemente o processador",
      "Continuar usando HD com setores defeituosos pode causar perda total de dados",
      "Atualizar driver de vídeo incorretamente pode causar tela preta",
    ],
    diagnostico: `O diagnóstico segue uma metodologia de eliminação. Primeiro, monitoramos temperaturas do processador e GPU em tempo real durante stress test para descartar superaquecimento. Em seguida, executamos MemTest86 para verificar a integridade da RAM.\n\nTestamos o disco com ferramentas como CrystalDiskInfo (SMART) e Victoria para identificar setores defeituosos. Verificamos a estabilidade da fonte com multímetro nas linhas de 3.3V, 5V e 12V sob carga. Por fim, analisamos logs do Windows (Visualizador de Eventos) para identificar o componente responsável pelo congelamento.`,
    solucao: `Para superaquecimento, fazemos limpeza completa do sistema de refrigeração, troca de pasta térmica e verificação dos coolers. Para RAM defeituosa, identificamos o módulo com falha e substituímos.\n\nPara HD com setores defeituosos, fazemos backup imediato dos dados e substituímos por SSD. Para drivers de vídeo, fazemos remoção completa com DDU (Display Driver Uninstaller) e instalação da versão estável mais recente. Para fontes instáveis, substituímos por modelo de qualidade certificada.`,
    quandoCompensa: "Quando o problema é resolvível com limpeza, troca de pasta térmica, substituição de RAM ou HD — custos acessíveis com grande impacto.",
    quandoNaoCompensa: "Quando a placa-mãe tem capacitores estufados extensivamente ou quando múltiplos componentes estão falhando simultaneamente em equipamento antigo.",
    whatsappMessage: "Olá! Meu computador está congelando e travando. Preciso de diagnóstico e reparo em Curitiba.",
    conteudoExtra: `## O Que Fazer Quando o PC Congela\n\n1. **Aguarde 2-3 minutos**: Às vezes o sistema está processando e pode voltar ao normal\n2. **Ctrl+Alt+Del**: Tente abrir o Gerenciador de Tarefas para fechar o programa travado\n3. **Verifique a temperatura**: Toque na saída de ar — se estiver muito quente, desligue e aguarde esfriar\n4. **Monitore a frequência**: Anote quando os travamentos ocorrem (horário, programa aberto, tempo de uso)\n5. **Faça backup**: Se travamentos são frequentes, faça backup dos dados importantes imediatamente\n\n## Superaquecimento — A Causa Mais Comum\n\nEm Curitiba, especialmente nos meses mais quentes, o superaquecimento é a causa #1 de travamentos. Notebooks usados sobre cama, almofada ou superfícies que bloqueiam a ventilação são os mais afetados. Uma limpeza preventiva a cada 12 meses evita esse problema.`,
    relatedPages: [
      { label: "PC Lento", to: "/computador-lento-curitiba" },
      { label: "Tela Azul (BSOD)", to: "/tela-azul-bsod-curitiba" },
      { label: "Superaquecimento", to: "/computador-superaquecendo-curitiba" },
      { label: "Conserto de PC", to: "/servicos/conserto-pc-notebook" },
    ]
  },

  // ==================== COMPUTADOR MUITO BARULHENTO ====================
  {
    slug: "computador-muito-barulhento-curitiba",
    title: "Computador Muito Barulhento em Curitiba | Ventoinhas e Ruídos Anormais",
    metaDescription: "Computador fazendo barulho em Curitiba? Diagnóstico de cooler, HD, ventoinha e vibração. Técnico especialista com atendimento rápido e solução definitiva.",
    h1: "Computador Muito Barulhento em Curitiba — Ventoinhas e Ruídos Anormais",
    categoria: "Problemas de Computador",
    intro: `O computador começou a fazer barulho excessivo — ventoinhas girando em alta rotação, sons de clique, zumbido constante ou vibração. Esse problema vai além do incômodo: ruídos anormais frequentemente indicam que algum componente está falhando ou que o sistema está superaquecendo.\n\nEm Curitiba, diagnosticamos que a maioria dos computadores barulhentos sofre de acúmulo de poeira nos coolers (que força rotações mais altas para compensar), rolamentos desgastados em ventoinhas, ou HD mecânico com falha iminente emitindo sons de clique.`,
    sintomas: [
      { titulo: "Ventoinhas em alta rotação constante", desc: "Coolers giram no máximo o tempo todo, mesmo em idle. Indica superaquecimento ou curva de fan agressiva na BIOS.", gravidade: "Médio" },
      { titulo: "Sons de clique rítmico do HD", desc: "Cliques vindos do disco rígido indicam cabeças de leitura com dificuldade — sinal de falha iminente.", gravidade: "Complexo" },
      { titulo: "Zumbido ou vibração do gabinete", desc: "Ressonância causada por parafusos soltos, painéis desencaixados ou HD sem borrachas anti-vibração.", gravidade: "Simples" },
      { titulo: "Barulho aumenta com programas ou jogos", desc: "Ruído cresce proporcionalmente à carga do sistema, indicando que o resfriamento está no limite.", gravidade: "Médio" },
      { titulo: "Ventoinha com raspagem ou ranger", desc: "Rolamento desgastado produz ruído metálico de raspagem. A ventoinha pode parar a qualquer momento.", gravidade: "Médio" },
      { titulo: "Notebook parece um 'secador de cabelo'", desc: "Ventilação extrema ao ligar indica pasta térmica seca ou sistema de refrigeração obstruído por poeira.", gravidade: "Médio" },
      { titulo: "Coil whine da placa de vídeo ou fonte", desc: "Zumbido agudo de alta frequência vindo de indutores sob carga. Comum em GPUs e fontes de baixa qualidade.", gravidade: "Simples a médio" },
    ],
    causas: [
      { titulo: "Acúmulo de poeira nos coolers", desc: "Poeira obstrui as aletas do dissipador, reduzindo a eficiência térmica e forçando rotações mais altas.", tipo: "desgaste" },
      { titulo: "Rolamento desgastado nas ventoinhas", desc: "Ventoinhas com rolamento gasto produzem ruído de raspagem, vibração e podem parar de funcionar.", tipo: "desgaste" },
      { titulo: "HD mecânico com falha iminente", desc: "Sons de clique indicam que as cabeças de leitura estão com dificuldade para acessar dados — falha próxima.", tipo: "hardware" },
      { titulo: "Pasta térmica seca", desc: "Sem transferência térmica eficiente entre processador e dissipador, o cooler precisa girar mais rápido para compensar.", tipo: "desgaste" },
      { titulo: "Curva de ventoinha agressiva na BIOS", desc: "BIOS configurada para manter ventoinhas em alta rotação mesmo com temperaturas normais.", tipo: "software" },
      { titulo: "Vibração estrutural do gabinete", desc: "Parafusos soltos, painéis desencaixados ou HD montado sem borrachas anti-vibração causam ressonância.", tipo: "hardware" },
      { titulo: "Coil whine em componentes eletrônicos", desc: "Vibração de indutores em placas de vídeo ou fontes sob carga pesada. Característica do componente.", tipo: "hardware" },
    ],
    cenarios: [
      { nivel: "Simples", desc: "Parafusos soltos, curva de fan na BIOS ou vibração de gabinete. Ajuste rápido na visita.", tempo: "15 min a 30 min", custo: "Dentro da visita técnica" },
      { nivel: "Médio", desc: "Limpeza de coolers, troca de pasta térmica e substituição de ventoinha com rolamento desgastado.", tempo: "1h a 2h", custo: "R$ 100 a R$ 200 + peça" },
      { nivel: "Complexo", desc: "HD com cliques (falha iminente) — backup emergencial e substituição por SSD.", tempo: "2h a 1 dia", custo: "R$ 200 a R$ 450 + SSD" },
    ],
    riscos: [
      "Ignorar cliques do HD pode resultar em perda total de dados sem aviso",
      "Rodar com ventoinhas ineficientes causa superaquecimento e danos permanentes",
      "Lubrificar ventoinhas com produtos inadequados pode causar curto-circuito",
      "Usar o computador sem cooler funcional pode queimar o processador",
    ],
    diagnostico: `O diagnóstico inicia identificando a fonte exata do ruído. Abrimos o gabinete e, com o sistema ligado, paramos individualmente cada ventoinha (com segurança) para isolar qual está gerando o barulho.\n\nPara HDs, usamos ferramentas SMART (CrystalDiskInfo) para verificar contadores de erro e saúde do disco. Verificamos temperaturas do processador e GPU para confirmar se o ruído é compensação por superaquecimento. Inspecionamos parafusos, painéis e borrachas anti-vibração do gabinete.`,
    solucao: `Para acúmulo de poeira, fazemos limpeza completa com ar comprimido e aspirador antiestático, incluindo troca de pasta térmica. Para ventoinhas com rolamento desgastado, substituímos por modelos de qualidade com rolamento de esferas ou hidráulico.\n\nPara HD com cliques, fazemos backup emergencial dos dados e substituímos por SSD — que é silencioso e muito mais rápido. Para coil whine, ajustamos configurações de energia ou limitamos FPS em jogos. Para vibrações do gabinete, reposicionamos componentes e adicionamos borrachas anti-vibração.`,
    quandoCompensa: "Quando a solução é limpeza, troca de pasta térmica ou substituição de ventoinha — custos baixos e resultado imediato.",
    quandoNaoCompensa: "Quando o coil whine é inerente ao modelo da placa de vídeo (característica do componente) ou quando o gabinete inteiro está comprometido estruturalmente.",
    whatsappMessage: "Olá! Meu computador está fazendo muito barulho. Preciso de diagnóstico em Curitiba.",
    conteudoExtra: `## Identificando o Tipo de Ruído\n\n- **Ventilação alta constante**: Provavelmente poeira ou pasta térmica seca → limpeza resolve\n- **Cliques rítmicos**: HD mecânico com falha → **faça backup imediatamente**\n- **Raspagem/ranger**: Ventoinha com rolamento gasto → substituição do cooler\n- **Vibração/ressonância**: Parafusos soltos ou HD sem borrachas → reposicionamento\n- **Zumbido agudo sob carga**: Coil whine → ajuste de software ou troca de componente\n\n## Manutenção Preventiva — Evite Ruídos\n\nA limpeza interna a cada 6-12 meses previne a maioria dos problemas de ruído. Em ambientes com pets ou muita poeira, recomendamos limpeza a cada 6 meses. A troca de pasta térmica a cada 2-3 anos mantém as temperaturas baixas e os coolers silenciosos.\n\n## SSD — A Solução Silenciosa\n\nSe seu computador ainda usa HD mecânico, a troca por SSD elimina completamente o ruído do disco, além de acelerar o sistema em até 10x. É o upgrade com melhor custo-benefício disponível.`,
    relatedPages: [
      { label: "Superaquecimento", to: "/computador-superaquecendo-curitiba" },
      { label: "PC Lento", to: "/computador-lento-curitiba" },
      { label: "HD com Barulho", to: "/hd-fazendo-barulho-curitiba" },
      { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" },
    ]
  },
  // ---------- pc-reiniciando-sozinho-curitiba ----------
  {
    slug: "pc-reiniciando-sozinho-curitiba",
    title: "PC Reiniciando Sozinho em Curitiba — Diagnóstico e Solução",
    metaDescription: "Seu PC fica reiniciando sozinho? Veja as causas reais (superaquecimento, fonte, RAM, Windows) e como resolver em Curitiba com diagnóstico profissional.",
    h1: "PC Reiniciando Sozinho — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware / Software",
    intro: "Um computador que reinicia sozinho sem aviso pode indicar problemas graves de hardware ou instabilidade de software. Esse comportamento é frustrante porque interrompe o trabalho, pode causar perda de dados e, se ignorado, pode danificar componentes permanentemente.\n\nAs causas variam desde superaquecimento do processador e fonte de alimentação com defeito até erros de driver, infecção por malware ou módulos de memória RAM com falha. Em Curitiba, onde variações de tensão na rede elétrica são comuns em alguns bairros, a fonte de alimentação é uma das vilãs mais frequentes.\n\nO diagnóstico preciso é fundamental porque o sintoma — reinício aleatório — pode ter dezenas de origens diferentes. Tentar resolver por tentativa e erro geralmente agrava o problema ou causa gastos desnecessários com peças que não eram a causa real.",
    sintomas: [
      { titulo: "PC reinicia durante uso normal", desc: "O computador desliga e liga novamente sem tela azul, geralmente indicando superaquecimento ou falha na fonte de alimentação.", gravidade: "Médio" },
      { titulo: "Reinício ao abrir jogos ou programas pesados", desc: "Ocorre quando a fonte não entrega energia suficiente ou o processador/GPU superaquece sob carga.", gravidade: "Médio" },
      { titulo: "Tela azul rápida antes do reinício", desc: "Um BSOD aparece por frações de segundo antes de reiniciar, indicando erro de driver, RAM ou disco.", gravidade: "Complexo" },
      { titulo: "Reinício em loop antes de entrar no Windows", desc: "O sistema tenta iniciar mas reinicia repetidamente, geralmente por corrupção do sistema ou falha de hardware.", gravidade: "Complexo" },
      { titulo: "PC reinicia apenas quando move o gabinete", desc: "Indica mau contato em cabos internos, placa de vídeo mal encaixada ou conector da fonte solto.", gravidade: "Simples" },
      { titulo: "Reinício com cheiro de queimado", desc: "Sinal grave de componente queimando — capacitor estufado, VRM da placa-mãe ou fonte em curto.", gravidade: "Complexo" }
    ],
    causas: [
      { titulo: "Superaquecimento do processador", desc: "Pasta térmica seca, cooler com poeira ou ventilador parado fazem o CPU atingir temperatura crítica e o sistema desliga para proteção.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação insuficiente ou defeituosa", desc: "Fontes genéricas ou desgastadas não fornecem energia estável, causando reinícios aleatórios especialmente sob carga.", tipo: "hardware" },
      { titulo: "Memória RAM com defeito", desc: "Módulos de RAM com setores defeituosos causam erros aleatórios que resultam em reinícios e telas azuis.", tipo: "hardware" },
      { titulo: "Driver incompatível ou corrompido", desc: "Drivers de vídeo, chipset ou rede podem causar instabilidade no kernel do Windows, forçando reinício.", tipo: "software" },
      { titulo: "Infecção por malware", desc: "Alguns malwares causam instabilidade proposital no sistema, corrompendo arquivos do Windows e forçando reinícios.", tipo: "software" },
      { titulo: "Instabilidade na rede elétrica", desc: "Quedas e picos de tensão frequentes danificam a fonte e podem causar reinícios — uso de nobreak é recomendado.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna, reencaixe de cabos e componentes, troca de pasta térmica.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Troca de fonte de alimentação, remoção de malware, reinstalação de drivers.", tempo: "2-4 horas", custo: "R$150–R$350" },
      { nivel: "Complexo", desc: "Substituição de placa-mãe, troca de RAM defeituosa ou reparo elétrico.", tempo: "1-3 dias", custo: "R$300–R$700+" }
    ],
    riscos: [
      "Perda de dados por desligamento abrupto durante gravação em disco",
      "Dano permanente ao HD/SSD por desligamentos repetidos sem shutdown correto",
      "Queima de componentes se a causa for elétrica e não for tratada",
      "Corrupção progressiva do Windows tornando o sistema irrecuperável",
      "Risco de curto-circuito se houver componente queimando internamente"
    ],
    diagnostico: "O diagnóstico começa com inspeção visual interna (capacitores estufados, poeira excessiva, cabos soltos). Em seguida, monitoramos temperaturas do CPU/GPU sob estresse com HWMonitor. Testamos a fonte com multímetro e testador de PSU. A memória RAM é verificada com MemTest86. Analisamos os logs do Visualizador de Eventos do Windows para identificar o erro exato que precede cada reinício. Também verificamos a estabilidade do sistema operacional e drivers instalados.",
    solucao: "A solução depende da causa identificada. Para superaquecimento: limpeza completa, troca de pasta térmica e verificação dos coolers. Para fonte defeituosa: substituição por modelo certificado 80 Plus com potência adequada. Para RAM: substituição do módulo defeituoso após teste individual. Para software: reparo do Windows via SFC/DISM, atualização de drivers e remoção de malware. Recomendamos instalação de nobreak para proteção contra instabilidade elétrica.",
    quandoCompensa: "Na maioria dos casos compensa reparar — a causa costuma ser fonte, pasta térmica ou RAM, com custo bem inferior a um PC novo. Mesmo troca de placa-mãe pode valer se o processador e demais componentes estiverem em bom estado.",
    quandoNaoCompensa: "Se o PC tem mais de 8 anos, múltiplos componentes com defeito simultâneo e a placa-mãe não aceita peças atuais, o investimento em reparo pode ultrapassar o valor de um equipamento novo com garantia.",
    whatsappMessage: "Olá! Meu PC fica reiniciando sozinho e preciso de diagnóstico profissional em Curitiba. Podem me ajudar?",
    conteudoExtra: `## Como Identificar a Causa do Reinício Sozinho\n\nAntes de levar ao técnico, você pode reunir informações úteis:\n\n### Verifique o Visualizador de Eventos\n1. Pressione Win + R e digite **eventvwr.msc**\n2. Vá em Logs do Windows > Sistema\n3. Procure por eventos com nível "Crítico" ou "Erro" no horário do reinício\n4. Anote o código do erro — isso ajuda muito no diagnóstico\n\n### Monitore a Temperatura\n- Instale o **HWMonitor** e observe as temperaturas\n- CPU acima de 90°C indica superaquecimento\n- GPU acima de 95°C também é crítico\n\n### Observe o Padrão\n- Reinicia **só em jogos**? Provavelmente fonte ou GPU\n- Reinicia **aleatoriamente**? Pode ser RAM ou driver\n- Reinicia **ao ligar**? Provável falha de hardware grave\n\n## Fonte de Alimentação: A Vilã Silenciosa\n\nEm Curitiba, muitos PCs usam fontes genéricas que não entregam a potência prometida. Uma fonte de 500W genérica pode entregar apenas 300W reais. Quando o sistema exige mais energia (jogos, renderização), a fonte não aguenta e o PC reinicia.\n\n**Recomendação**: fontes certificadas 80 Plus Bronze ou superior, de marcas como Corsair, EVGA ou Cooler Master.\n\n## Curitiba: Rede Elétrica e Seus Efeitos\n\nAlguns bairros de Curitiba sofrem com instabilidade na rede elétrica, especialmente durante tempestades. Picos e quedas de tensão danificam fontes de alimentação e podem causar reinícios. A instalação de um **nobreak** (UPS) é altamente recomendada para proteger seu equipamento.`,
    relatedPages: [
      { to: "/pc-desligando-sozinho-curitiba", label: "PC Desligando Sozinho" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/tela-azul-windows-curitiba", label: "Tela Azul Windows" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/computador-muito-barulhento-curitiba", label: "PC Barulhento" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ---------- notebook-sem-audio-curitiba ----------
  {
    slug: "notebook-sem-audio-curitiba",
    title: "Notebook Sem Áudio em Curitiba — Diagnóstico e Solução",
    metaDescription: "Notebook sem som? Veja causas reais (driver, serviço de áudio, alto-falante queimado) e como resolver em Curitiba com técnico especializado.",
    h1: "Notebook Sem Áudio — Diagnóstico e Reparo em Curitiba",
    categoria: "Software / Hardware",
    intro: "Perder o áudio do notebook é um problema comum que afeta reuniões, aulas online, entretenimento e produtividade. A causa pode ser tão simples quanto um driver desatualizado ou tão complexa quanto um alto-falante interno queimado.\n\nEm muitos casos, o problema surge após atualizações do Windows que substituem o driver de áudio por uma versão genérica incompatível. Em outros, o conector P2 está com mau contato interno, ou o serviço Windows Audio parou de funcionar.\n\nO diagnóstico correto evita gastos desnecessários — não adianta trocar o alto-falante se o problema é software, e não adianta reinstalar drivers se o componente físico está danificado.",
    sintomas: [
      { titulo: "Ícone de som com X vermelho", desc: "O Windows não detecta nenhum dispositivo de áudio instalado. Geralmente problema de driver ou serviço desativado.", gravidade: "Simples" },
      { titulo: "Som funciona só no fone de ouvido", desc: "O alto-falante interno pode estar queimado ou o conector P2 está travado na posição 'fone conectado'.", gravidade: "Médio" },
      { titulo: "Áudio chiando ou com estática", desc: "Pode indicar alto-falante danificado, interferência elétrica na placa de áudio ou driver com conflito.", gravidade: "Médio" },
      { titulo: "Volume no máximo mas som muito baixo", desc: "Alto-falante com bobina desgastada, configuração de equalização incorreta ou limitador de volume ativo.", gravidade: "Simples" },
      { titulo: "Som parou após atualização do Windows", desc: "Driver de áudio foi substituído por versão genérica durante o Windows Update.", gravidade: "Simples" },
      { titulo: "Áudio trava e faz loops de som", desc: "Conflito de driver, DPC latency alto ou falha no chip de áudio da placa-mãe.", gravidade: "Complexo" }
    ],
    causas: [
      { titulo: "Driver de áudio ausente ou corrompido", desc: "Após formatação ou atualização do Windows, o driver Realtek/Conexant pode ser removido ou substituído por versão genérica.", tipo: "software" },
      { titulo: "Serviço Windows Audio desativado", desc: "O serviço responsável pelo áudio pode ter sido desativado por otimizadores de sistema ou erro do Windows.", tipo: "software" },
      { titulo: "Alto-falante interno queimado", desc: "Uso em volume máximo prolongado ou curto-circuito pode danificar a bobina do alto-falante interno.", tipo: "hardware" },
      { titulo: "Conector P2 com mau contato", desc: "O conector de fone de ouvido pode estar com detrito interno, fazendo o sistema pensar que há fone conectado.", tipo: "desgaste" },
      { titulo: "Chip de áudio com defeito na placa-mãe", desc: "O codec de áudio (Realtek ALC, Conexant) na placa-mãe pode ter falhado por sobretensão.", tipo: "hardware" },
      { titulo: "Conflito entre dispositivos de áudio", desc: "HDMI, Bluetooth e alto-falante interno competindo como dispositivo padrão causa confusão no sistema.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação de driver, reativação do serviço Windows Audio, ajuste de dispositivo padrão.", tempo: "30-60 min", custo: "R$60–R$120" },
      { nivel: "Médio", desc: "Limpeza/reparo do conector P2, troca de alto-falante interno.", tempo: "1-3 horas", custo: "R$120–R$250" },
      { nivel: "Complexo", desc: "Reparo ou substituição do chip de áudio na placa-mãe, uso de placa de som USB externa.", tempo: "1-3 dias", custo: "R$200–R$450" }
    ],
    riscos: [
      "Instalar drivers de áudio incompatíveis pode causar tela azul",
      "Forçar o conector P2 pode danificar a trilha da placa-mãe",
      "Desinstalar drivers errados pode afetar outros dispositivos",
      "Ignorar chiado no áudio pode indicar curto-circuito progressivo"
    ],
    diagnostico: "Verificamos primeiro se o problema é software: testamos o driver no Gerenciador de Dispositivos, verificamos o serviço Windows Audio, testamos com fone de ouvido para isolar alto-falante vs. sistema. Usamos diagnóstico de áudio integrado do fabricante (Dell, Lenovo, HP). Se software estiver OK, abrimos o notebook para inspecionar o alto-falante, cabo flat de áudio e conector P2.",
    solucao: "Para software: instalação do driver correto do fabricante, configuração do dispositivo de áudio padrão, reativação de serviços. Para hardware: troca do alto-falante interno (peça específica por modelo), limpeza ou troca do conector P2, ou instalação de placa de som USB externa quando o chip onboard está danificado.",
    quandoCompensa: "Quase sempre compensa resolver — a maioria dos casos é software (custo baixo). Mesmo troca de alto-falante é acessível (R$80-R$150 a peça + mão de obra).",
    quandoNaoCompensa: "Se o chip de áudio na placa-mãe queimou em notebook muito antigo (7+ anos), o custo de micro-solda pode não justificar. Nesses casos, uma placa de som USB externa (R$30-R$80) é a alternativa mais econômica.",
    whatsappMessage: "Olá! Meu notebook está sem áudio e preciso de diagnóstico em Curitiba. Podem me ajudar?",
    conteudoExtra: `## Soluções Rápidas Para Testar Antes do Técnico\n\n### 1. Verifique o Dispositivo de Áudio Padrão\n- Clique com botão direito no ícone de som > **Configurações de som**\n- Verifique se o dispositivo correto está selecionado como saída\n- Se aparecer "HDMI" como padrão, mude para "Alto-falantes"\n\n### 2. Reinicie o Serviço de Áudio\n1. Pressione Win + R e digite **services.msc**\n2. Encontre **Windows Audio** e **Windows Audio Endpoint Builder**\n3. Clique com botão direito > **Reiniciar** em ambos\n\n### 3. Teste com Fone de Ouvido\n- Se funciona no fone mas não no alto-falante, o problema é hardware interno\n- Se não funciona em nenhum, provavelmente é driver ou serviço\n\n## Drivers de Áudio: O Problema Mais Comum\n\nApós atualizações do Windows 10/11, o driver de áudio do fabricante é frequentemente substituído por um driver genérico da Microsoft. Esse driver genérico funciona parcialmente mas pode causar:\n- Volume máximo muito baixo\n- Microfone não funcionando\n- Som cortando intermitentemente\n\n**Solução**: baixe o driver diretamente do site do fabricante (Dell, Lenovo, HP, Acer) usando o número de série/modelo exato do notebook.\n\n## Alto-Falantes de Notebook: Fragilidade Conhecida\n\nAlto-falantes internos de notebooks são componentes pequenos e frágeis. O uso prolongado em volume máximo acelera o desgaste da bobina. Em notebooks mais finos (ultrabooks), o espaço reduzido limita a qualidade e durabilidade do áudio.`,
    relatedPages: [
      { to: "/notebook-sem-webcam-curitiba", label: "Notebook Sem Webcam" },
      { to: "/notebook-lento-curitiba", label: "Notebook Lento" },
      { to: "/notebook-nao-liga-curitiba", label: "Notebook Não Liga" },
      { to: "/conserto-notebook-curitiba", label: "Conserto de Notebook" },
      { to: "/formatacao-computador-curitiba", label: "Formatação" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ---------- erro-0x80070005-curitiba ----------
  {
    slug: "erro-0x80070005-curitiba",
    title: "Erro 0x80070005 em Curitiba — Acesso Negado no Windows",
    metaDescription: "Erro 0x80070005 (Acesso Negado) no Windows? Veja causas reais e soluções profissionais em Curitiba. Diagnóstico técnico especializado.",
    h1: "Erro 0x80070005 (Acesso Negado) — Solução em Curitiba",
    categoria: "Erros do Windows",
    intro: "O erro 0x80070005, também conhecido como ACCESS_DENIED, é um dos códigos mais frustrantes do Windows. Ele impede atualizações do sistema, instalação de programas, ativação do Windows e até o funcionamento correto de aplicativos.\n\nEsse erro ocorre quando o Windows ou um programa não tem permissões suficientes para acessar um arquivo, pasta ou registro do sistema. As causas incluem permissões corrompidas, perfil de usuário danificado, antivírus bloqueando operações do sistema e infecção por malware que altera permissões de arquivos críticos.\n\nDiferente de erros simples, o 0x80070005 frequentemente exige intervenção em permissões NTFS, registro do Windows e políticas de grupo — operações que, se feitas incorretamente, podem tornar o sistema inacessível.",
    sintomas: [
      { titulo: "Windows Update falha com erro 0x80070005", desc: "As atualizações baixam mas não instalam, exibindo 'Acesso negado' repetidamente.", gravidade: "Médio" },
      { titulo: "Impossível instalar ou atualizar programas", desc: "Instaladores travam com mensagem de permissão insuficiente, mesmo executando como administrador.", gravidade: "Médio" },
      { titulo: "Ativação do Windows falha", desc: "Ao tentar ativar o Windows, o erro 0x80070005 impede a comunicação com servidores Microsoft.", gravidade: "Simples" },
      { titulo: "Restauração do sistema bloqueada", desc: "Não é possível criar ou restaurar pontos de restauração — acesso negado às pastas de backup.", gravidade: "Complexo" },
      { titulo: "Erro ao acessar pastas do sistema", desc: "Pastas como Windows, System32 ou ProgramData ficam inacessíveis mesmo para administradores.", gravidade: "Complexo" },
      { titulo: "Microsoft Store não instala apps", desc: "Aplicativos da Store falham com erro de permissão durante download ou instalação.", gravidade: "Simples" }
    ],
    causas: [
      { titulo: "Permissões NTFS corrompidas", desc: "Atualizações falhas ou desligamentos abruptos podem corromper a tabela de permissões de arquivos do sistema.", tipo: "software" },
      { titulo: "Perfil de usuário danificado", desc: "O perfil do usuário atual pode ter perdido privilégios administrativos por corrupção do registro.", tipo: "software" },
      { titulo: "Antivírus bloqueando operações do sistema", desc: "Softwares de segurança podem interpretar operações legítimas do Windows Update como ameaças.", tipo: "software" },
      { titulo: "Malware alterando permissões", desc: "Vírus e ransomware alteram permissões de pastas críticas para impedir remoção e reparo do sistema.", tipo: "software" },
      { titulo: "Serviço Windows Update corrompido", desc: "Os componentes do Windows Update (pasta SoftwareDistribution, serviços BITS/wuauserv) podem estar danificados.", tipo: "software" },
      { titulo: "Política de grupo mal configurada", desc: "Em ambientes corporativos ou após uso de 'otimizadores', políticas de grupo podem restringir acesso.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reset do Windows Update, limpeza de cache, execução como administrador.", tempo: "30-60 min", custo: "R$60–R$120" },
      { nivel: "Médio", desc: "Reparo de permissões NTFS, recriação de perfil de usuário, SFC/DISM.", tempo: "1-3 horas", custo: "R$120–R$250" },
      { nivel: "Complexo", desc: "Reparo offline do registro, remoção de malware avançado, reinstalação do Windows preservando dados.", tempo: "3-8 horas", custo: "R$200–R$400" }
    ],
    riscos: [
      "Alterar permissões NTFS incorretamente pode tornar o Windows inacessível",
      "Ignorar o erro permite acúmulo de atualizações de segurança pendentes",
      "Sistema sem atualizações fica vulnerável a ransomware e exploits",
      "Tentar 'forçar' permissões com takeown em pastas erradas pode quebrar o sistema",
      "Malware pode estar usando o erro como cortina de fumaça para atividade maliciosa"
    ],
    diagnostico: "Identificamos primeiro o contexto exato do erro: Windows Update, instalação de programa ou acesso a pasta. Verificamos o Visualizador de Eventos para logs detalhados. Testamos permissões NTFS com icacls. Verificamos integridade do sistema com SFC /scannow e DISM. Escaneamos por malware com ferramentas offline. Analisamos políticas de grupo e perfil do usuário.",
    solucao: "Para Windows Update: reset completo dos componentes (parar serviços, renomear SoftwareDistribution/catroot2, reiniciar serviços). Para permissões: reparo via icacls e takeown nos diretórios corretos. Para perfil corrompido: criação de novo perfil com migração de dados. Para malware: remoção com boot externo e restauração de permissões padrão. Executamos SFC/DISM para garantir integridade dos arquivos do sistema.",
    quandoCompensa: "Sempre compensa resolver — o erro 0x80070005 geralmente é software puro, sem necessidade de trocar hardware. Mesmo nos casos mais complexos, o custo é muito inferior ao de um equipamento novo.",
    quandoNaoCompensa: "Raramente não compensa. Apenas se o Windows estiver tão corrompido que múltiplos erros se acumularam e uma formatação limpa seria mais rápida e econômica que tentar reparar individualmente.",
    whatsappMessage: "Olá! Meu computador está com erro 0x80070005 (Acesso Negado) e preciso de ajuda profissional em Curitiba.",
    conteudoExtra: `## Entendendo o Erro 0x80070005 em Detalhes\n\nO código **0x80070005** traduz para **E_ACCESSDENIED** na API do Windows. Significa que uma operação tentou acessar um recurso (arquivo, pasta, chave de registro, serviço) sem ter as permissões necessárias.\n\n### Onde Este Erro Aparece\n- **Windows Update**: a situação mais comum\n- **Microsoft Store**: ao instalar ou atualizar apps\n- **Ativação do Windows**: ao tentar ativar licença\n- **Backup e Restauração**: ao criar pontos de restauração\n- **Instalação de programas**: especialmente .NET Framework e Visual C++\n\n### Solução Passo a Passo (Nível Básico)\n\n#### Reset do Windows Update\n\`\`\`\nnet stop wuauserv\nnet stop cryptSvc\nnet stop bits\nnet stop msiserver\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nren C:\\Windows\\System32\\catroot2 catroot2.old\nnet start wuauserv\nnet start cryptSvc\nnet start bits\nnet start msiserver\n\`\`\`\n\n#### Verificação de Integridade\n\`\`\`\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n\`\`\`\n\n**Importante**: se esses comandos também retornarem erro de acesso, o problema é mais profundo e requer diagnóstico profissional.\n\n## Quando o Erro Indica Malware\n\nAlguns tipos de malware alteram propositalmente as permissões de pastas do Windows para:\n- Impedir que o antivírus acesse seus arquivos\n- Bloquear atualizações de segurança\n- Impedir que o usuário remova o malware\n\nSe o erro 0x80070005 surgiu repentinamente junto com lentidão e comportamento estranho, há forte suspeita de infecção.`,
    relatedPages: [
      { to: "/erro-0xc000021a-curitiba", label: "Erro 0xc000021a" },
      { to: "/erro-0xc00000e-curitiba", label: "Erro 0xc00000e" },
      { to: "/tela-azul-windows-curitiba", label: "Tela Azul Windows" },
      { to: "/remocao-virus-curitiba", label: "Remoção de Vírus" },
      { to: "/formatacao-computador-curitiba", label: "Formatação" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ---------- pc-desligando-sozinho-curitiba ----------
  {
    slug: "pc-desligando-sozinho-curitiba",
    title: "PC Desligando Sozinho em Curitiba — Diagnóstico e Solução",
    metaDescription: "PC desliga sozinho sem aviso? Veja causas reais (superaquecimento, fonte, placa-mãe) e solução profissional em Curitiba. Diagnóstico técnico.",
    h1: "PC Desligando Sozinho — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware",
    intro: "Quando o computador desliga completamente sozinho — sem reiniciar, sem tela azul — o problema quase sempre é hardware. Diferente do reinício, onde o PC volta a ligar automaticamente, o desligamento total indica que algo cortou a energia abruptamente.\n\nAs causas mais comuns são superaquecimento severo (o processador ativa proteção térmica e corta energia), fonte de alimentação falhando sob carga, e problemas na placa-mãe como capacitores estufados ou VRM com defeito.\n\nEsse é um sintoma que não deve ser ignorado: cada desligamento abrupto pode causar dano ao disco rígido, corrupção de dados e desgaste acelerado de componentes. O diagnóstico rápido previne danos maiores e mais caros.",
    sintomas: [
      { titulo: "PC desliga completamente sem aviso", desc: "Como se tivesse tirado da tomada — sem tela azul, sem mensagem. Indica corte abrupto de energia.", gravidade: "Complexo" },
      { titulo: "Desliga após alguns minutos de uso", desc: "Padrão típico de superaquecimento: funciona frio, desliga quando esquenta. Tempo diminui progressivamente.", gravidade: "Médio" },
      { titulo: "Desliga só em jogos ou renderização", desc: "A fonte não suporta o consumo máximo de CPU + GPU, cortando energia sob carga pesada.", gravidade: "Médio" },
      { titulo: "Desliga e não liga mais por alguns minutos", desc: "Proteção térmica ativada — o sistema só permite religar após o processador esfriar.", gravidade: "Complexo" },
      { titulo: "Desliga com cheiro de queimado", desc: "Componente em curto-circuito — situação grave que requer desligar da tomada imediatamente.", gravidade: "Complexo" },
      { titulo: "Desliga ao tocar ou mover o gabinete", desc: "Mau contato em cabos de energia, placa-mãe com parafuso solto ou conector ATX com folga.", gravidade: "Simples" }
    ],
    causas: [
      { titulo: "Superaquecimento crítico do processador", desc: "Quando o CPU ultrapassa a temperatura máxima (geralmente 100-105°C), o sistema desliga instantaneamente para evitar dano permanente.", tipo: "desgaste" },
      { titulo: "Fonte de alimentação com defeito", desc: "Fontes desgastadas ou subdimensionadas falham ao fornecer energia estável, especialmente sob carga máxima.", tipo: "hardware" },
      { titulo: "Capacitores estufados na placa-mãe", desc: "Capacitores eletrolíticos incham com o tempo, causando instabilidade de tensão e desligamentos aleatórios.", tipo: "desgaste" },
      { titulo: "VRM da placa-mãe superaquecendo", desc: "Os reguladores de tensão (VRM) aquecem excessivamente em placas sem dissipador adequado, cortando energia ao CPU.", tipo: "hardware" },
      { titulo: "Curto-circuito interno", desc: "Parafuso solto, cabo encostando em componente ou placa com trilha rompida podem causar curto intermitente.", tipo: "hardware" },
      { titulo: "Botão power com mau contato", desc: "O botão de ligar/desligar pode estar com contato intermitente, enviando sinal de desligamento aleatoriamente.", tipo: "desgaste" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna profunda, troca de pasta térmica, reencaixe de cabos e conectores.", tempo: "1-2 horas", custo: "R$80–R$150" },
      { nivel: "Médio", desc: "Troca de fonte de alimentação, reparo do botão power, substituição de cooler.", tempo: "2-4 horas", custo: "R$150–R$400" },
      { nivel: "Complexo", desc: "Substituição de placa-mãe, reparo de VRM/capacitores, diagnóstico de curto-circuito.", tempo: "2-5 dias", custo: "R$300–R$800+" }
    ],
    riscos: [
      "HD pode desenvolver setores defeituosos por desligamentos abruptos repetidos",
      "SSD pode sofrer corrupção da tabela de partição",
      "Componente em curto pode danificar outros componentes conectados",
      "Dados não salvos são perdidos a cada desligamento",
      "Superaquecimento ignorado pode queimar o processador permanentemente"
    ],
    diagnostico: "Abrimos o gabinete para inspeção visual: procuramos capacitores estufados, marcas de queimado, poeira excessiva e cabos soltos. Medimos temperaturas do CPU/GPU/VRM com sensores. Testamos a fonte com multímetro em todas as linhas (3.3V, 5V, 12V). Verificamos o botão power. Fazemos teste de estresse controlado para reproduzir o desligamento e identificar o limiar exato (temperatura, carga, tempo).",
    solucao: "Para superaquecimento: limpeza profunda com ar comprimido, troca de pasta térmica premium, verificação/substituição de coolers. Para fonte: substituição por modelo 80 Plus certificado com potência adequada ao sistema. Para placa-mãe: reparo de capacitores (quando viável) ou substituição completa. Para curto-circuito: identificação e isolamento do ponto de falha. Sempre recomendamos uso de nobreak para proteção adicional.",
    quandoCompensa: "Na maioria dos casos compensa reparar. Troca de fonte e limpeza térmica são soluções de baixo custo com alto impacto. Mesmo troca de placa-mãe pode valer se processador e memórias estiverem funcionais.",
    quandoNaoCompensa: "Se a placa-mãe queimou e levou junto processador e/ou memórias, o custo acumulado de substituição pode se aproximar de um PC novo. PCs com mais de 8-10 anos geralmente não justificam investimento alto em reparo.",
    whatsappMessage: "Olá! Meu PC está desligando sozinho e preciso de diagnóstico profissional em Curitiba. Podem me ajudar?",
    conteudoExtra: `## Desligando vs. Reiniciando: Qual a Diferença?\n\nÉ importante distinguir os dois sintomas, pois indicam causas diferentes:\n\n| Comportamento | Causa Provável | Gravidade |\n|---|---|---|\n| **Desliga e não religa** | Superaquecimento, fonte defeituosa | Alta |\n| **Desliga e religa sozinho** | Driver, RAM, instabilidade elétrica | Média |\n| **Desliga só em jogos** | Fonte subdimensionada, GPU superaquecendo | Média |\n| **Desliga com cheiro** | Curto-circuito, componente queimando | Crítica |\n\n## Superaquecimento: O Inimigo #1 em Curitiba\n\nEmbora Curitiba tenha clima mais ameno, o acúmulo de poeira nos coolers é igualmente problemático. PCs em ambientes com carpete, cortinas e animais de estimação acumulam poeira muito mais rapidamente.\n\n### Sinais de Superaquecimento\n- PC desliga após tempo previsível (5, 10, 15 minutos)\n- Ventiladores fazem barulho excessivo antes de desligar\n- Gabinete está quente ao toque\n- O tempo até desligar é cada vez menor\n\n### Prevenção\n- Limpeza interna a cada 6 meses\n- Troca de pasta térmica anualmente\n- Gabinete em local ventilado (não dentro de móvel fechado)\n- Filtros de poeira nos ventiladores\n\n## Fonte de Alimentação: Não Economize\n\nUma fonte de qualidade é o investimento mais importante para a longevidade do PC. Fontes genéricas sem certificação podem:\n- Entregar tensão instável que danifica componentes\n- Não ter proteção contra surto/curto\n- Falhar silenciosamente, degradando outros componentes\n\n**Recomendação**: invista em fonte 80 Plus Bronze ou superior, dimensionada com 20-30% de folga acima do consumo real do sistema.`,
    relatedPages: [
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/computador-nao-liga-curitiba", label: "Computador Não Liga" },
      { to: "/computador-muito-barulhento-curitiba", label: "PC Barulhento" },
      { to: "/tela-azul-windows-curitiba", label: "Tela Azul Windows" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ======= notebook-esquentando-muito-curitiba =======
  {
    slug: "notebook-esquentando-muito-curitiba",
    title: "Notebook Esquentando Muito em Curitiba | Superaquecimento — Técnico Especializado",
    metaDescription: "Notebook esquentando demais em Curitiba? Limpeza interna, troca de pasta térmica e reparo de cooler. Diagnóstico profissional com atendimento rápido.",
    h1: "Notebook Esquentando Muito — Diagnóstico e Reparo em Curitiba",
    categoria: "Hardware",
    intro: "Quando o notebook esquenta além do normal, o desempenho cai drasticamente e há risco real de dano permanente aos componentes internos. Processadores modernos possuem proteção térmica (thermal throttling) que reduz a velocidade para evitar queima, mas isso transforma seu notebook em uma máquina lenta e instável.\n\nO superaquecimento é um dos problemas mais comuns e mais negligenciados. Poeira acumulada nos dutos de ventilação, pasta térmica ressecada e ventoinhas com rolamento desgastado são as causas mais frequentes. Em Curitiba, apesar do clima mais ameno, ambientes com carpete, cama e superfícies que bloqueiam a ventilação aceleram o problema.\n\nIgnorar o superaquecimento pode levar à queima do processador, da GPU ou até da placa-mãe — reparos que custam muito mais do que a manutenção preventiva. Nosso diagnóstico térmico identifica exatamente a causa e aplica a solução correta.",
    sintomas: [
      { titulo: "Base do notebook muito quente ao toque", desc: "A região do processador e GPU irradia calor excessivo, desconfortável para uso no colo.", gravidade: "Moderada" },
      { titulo: "Ventoinha girando em alta rotação constantemente", desc: "O cooler trabalha no máximo o tempo todo, gerando ruído alto e indicando que não consegue dissipar o calor.", gravidade: "Moderada" },
      { titulo: "Desligamentos repentinos durante uso intenso", desc: "O notebook desliga sozinho como proteção térmica quando a temperatura ultrapassa o limite seguro.", gravidade: "Alta" },
      { titulo: "Lentidão progressiva após minutos de uso", desc: "O processador reduz a frequência (throttling) para se proteger, causando travamentos e lentidão.", gravidade: "Moderada" },
      { titulo: "Tela congela durante jogos ou edição de vídeo", desc: "Tarefas que exigem GPU causam congelamento por superaquecimento do chip gráfico.", gravidade: "Alta" },
      { titulo: "Ventoinha parou de funcionar", desc: "Ausência total de ruído do cooler indica falha mecânica — risco iminente de dano.", gravidade: "Crítica" }
    ],
    causas: [
      { titulo: "Pasta térmica ressecada", desc: "A pasta térmica entre o processador e o dissipador perde eficiência após 2-3 anos, criando uma barreira de calor.", tipo: "desgaste" },
      { titulo: "Dutos de ventilação obstruídos por poeira", desc: "Acúmulo de poeira e pelos nos dutos e aletas do dissipador bloqueia o fluxo de ar.", tipo: "desgaste" },
      { titulo: "Ventoinha com rolamento desgastado", desc: "O motor do cooler perde eficiência ou para completamente, eliminando a refrigeração ativa.", tipo: "desgaste" },
      { titulo: "Uso em superfícies que bloqueiam ventilação", desc: "Cama, almofada ou colo bloqueiam as entradas de ar na base do notebook.", tipo: "erro-humano" },
      { titulo: "Thermal pad degradado na GPU", desc: "Os pads térmicos que transferem calor dos chips de memória e VRM para o dissipador se deterioram.", tipo: "desgaste" },
      { titulo: "Dissipador de calor com mau contato", desc: "Parafusos soltos ou deformação no dissipador criam gaps que impedem a transferência de calor.", tipo: "hardware" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Limpeza interna completa com ar comprimido, remoção de poeira dos dutos e troca de pasta térmica.", tempo: "1-2 horas", custo: "R$120–R$180" },
      { nivel: "Médio", desc: "Limpeza + troca de pasta térmica premium + substituição de thermal pads da GPU e VRM.", tempo: "2-3 horas", custo: "R$180–R$280" },
      { nivel: "Complexo", desc: "Substituição completa do sistema de refrigeração (ventoinha + dissipador) + repaste com pasta de alta performance.", tempo: "3-5 horas", custo: "R$280–R$450" }
    ],
    riscos: [
      "Queima permanente do processador por exposição prolongada a temperaturas acima de 100°C",
      "Dano irreversível à GPU, especialmente em notebooks com chip soldado à placa-mãe",
      "Degradação acelerada da bateria — calor excessivo reduz a vida útil em até 50%",
      "Dessolda de componentes BGA (Ball Grid Array) causando falhas intermitentes",
      "Perda de dados por desligamentos abruptos sem salvamento"
    ],
    diagnostico: "O diagnóstico térmico profissional utiliza software de monitoramento em tempo real (HWiNFO, ThrottleStop) para medir temperaturas de CPU, GPU e SSD sob carga controlada. Verificamos o funcionamento do cooler com RPM real, inspecionamos visualmente a pasta térmica e os dutos de ventilação.\n\nAnalisamos o histórico de throttling para determinar se houve dano térmico acumulado. O diagnóstico identifica se o problema é apenas manutenção preventiva ou se há componentes danificados que precisam de substituição.",
    solucao: "A solução padrão envolve desmontagem completa do notebook, limpeza profunda de todos os componentes internos com ar comprimido e álcool isopropílico, remoção da pasta térmica antiga e aplicação de pasta de alta qualidade (Arctic MX-6 ou Thermal Grizzly Kryonaut).\n\nEm casos mais graves, substituímos thermal pads degradados por versões de maior condutividade térmica e trocamos ventoinhas com rolamento desgastado. Após a remontagem, realizamos teste de estresse térmico para validar que as temperaturas estão dentro dos parâmetros ideais (CPU abaixo de 85°C sob carga total).",
    quandoCompensa: "Notebooks com menos de 4 anos que nunca fizeram manutenção térmica se beneficiam enormemente. Uma limpeza + repaste pode reduzir as temperaturas em 15-25°C e devolver o desempenho original.",
    quandoNaoCompensa: "Se o processador ou GPU já apresentam danos por superaquecimento crônico (artefatos visuais permanentes, crashes mesmo em temperaturas normais), o custo de troca da placa-mãe pode não justificar em notebooks antigos.",
    whatsappMessage: "Olá! Meu notebook está esquentando muito e preciso de diagnóstico térmico. Podem me ajudar?",
    conteudoExtra: `## Temperaturas Ideais para Notebooks\n\n| Componente | Idle | Carga Leve | Carga Total | Limite Crítico |\n|---|---|---|---|---|\n| CPU | 35-50°C | 50-70°C | 70-85°C | 100°C |\n| GPU | 30-45°C | 45-65°C | 65-85°C | 95°C |\n| SSD NVMe | 30-40°C | 40-55°C | 55-70°C | 75°C |\n\n## Dicas de Prevenção\n\n- Use o notebook sempre em superfícies planas e rígidas\n- Invista em uma base com ventilação (cooler pad)\n- Faça limpeza interna preventiva a cada 12-18 meses\n- Evite bloquear as saídas de ar laterais e traseiras\n- Monitore temperaturas com HWiNFO64 (gratuito)`,
    relatedPages: [
      { to: "/computador-muito-barulhento-curitiba", label: "PC Barulhento" },
      { to: "/pc-desligando-sozinho-curitiba", label: "PC Desligando Sozinho" },
      { to: "/pc-travando-em-jogos-curitiba", label: "PC Travando em Jogos" },
      { to: "/notebook-lento-curitiba", label: "Notebook Lento" },
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ======= erro-0x80004005-curitiba =======
  {
    slug: "erro-0x80004005-curitiba",
    title: "Erro 0x80004005 em Curitiba | Falha Não Especificada — Técnico Windows",
    metaDescription: "Erro 0x80004005 no Windows em Curitiba? Diagnóstico profissional para resolver falhas de atualização, rede e registro. Atendimento rápido.",
    h1: "Erro 0x80004005 no Windows — Diagnóstico e Correção em Curitiba",
    categoria: "Erros Windows",
    intro: "O código de erro 0x80004005 é um dos mais genéricos e frustrantes do Windows, significando literalmente 'Falha Não Especificada'. Ele pode aparecer em dezenas de contextos diferentes: ao tentar atualizar o Windows, acessar pastas compartilhadas na rede, extrair arquivos compactados, ou até ao iniciar máquinas virtuais.\n\nA natureza genérica desse erro torna o diagnóstico particularmente difícil para usuários comuns. Cada contexto em que ele aparece tem causas e soluções completamente diferentes. Um erro 0x80004005 durante o Windows Update tem causas totalmente distintas do mesmo código ao acessar uma pasta de rede.\n\nNosso diagnóstico identifica o contexto exato do erro, analisa os logs do sistema (Event Viewer, CBS.log, WindowsUpdate.log) e aplica a correção específica para o seu caso.",
    sintomas: [
      { titulo: "Erro ao instalar atualizações do Windows", desc: "O Windows Update falha repetidamente com código 0x80004005, impedindo a instalação de patches de segurança.", gravidade: "Moderada" },
      { titulo: "Impossível acessar pastas compartilhadas na rede", desc: "Ao tentar abrir uma pasta de outro computador na rede, aparece 'Erro não especificado' com este código.", gravidade: "Moderada" },
      { titulo: "Falha ao extrair arquivos ZIP ou RAR", desc: "Arquivos compactados não podem ser extraídos, exibindo erro 0x80004005 durante o processo.", gravidade: "Baixa" },
      { titulo: "Máquina virtual não inicia (VirtualBox/Hyper-V)", desc: "VMs falham ao iniciar com este erro, geralmente relacionado a conflitos de virtualização.", gravidade: "Alta" },
      { titulo: "Erro ao renomear ou mover arquivos", desc: "Operações simples de gerenciamento de arquivos falham com 'Erro não especificado'.", gravidade: "Moderada" }
    ],
    causas: [
      { titulo: "Componentes do Windows Update corrompidos", desc: "A pasta SoftwareDistribution ou o cache do BITS contém dados corrompidos que bloqueiam atualizações.", tipo: "software" },
      { titulo: "Protocolo SMBv1 desabilitado", desc: "Versões recentes do Windows desabilitam SMBv1 por segurança, mas dispositivos antigos na rede ainda o exigem.", tipo: "software" },
      { titulo: "Chaves de registro corrompidas", desc: "Entradas inválidas no registro do Windows interferem com operações normais do sistema.", tipo: "software" },
      { titulo: "Conflito Hyper-V e VirtualBox", desc: "Ambas as tecnologias de virtualização não podem coexistir ativas, causando falhas na inicialização de VMs.", tipo: "software" },
      { titulo: "Permissões de arquivo incorretas", desc: "ACLs (Access Control Lists) corrompidas impedem operações legítimas sobre arquivos e pastas.", tipo: "software" },
      { titulo: "Antivírus bloqueando operações", desc: "Software de segurança de terceiros pode interceptar e bloquear operações legítimas do Windows.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reset de componentes do Windows Update (SoftwareDistribution, catroot2) ou habilitação do protocolo de rede correto.", tempo: "30min–1 hora", custo: "R$80–R$130" },
      { nivel: "Médio", desc: "Reparo de registro do Windows, correção de permissões NTFS e resolução de conflitos de virtualização.", tempo: "1-2 horas", custo: "R$130–R$200" },
      { nivel: "Complexo", desc: "Reparo completo do Windows com DISM/SFC, reconstrução de perfil de usuário e restauração de componentes do sistema.", tempo: "2-4 horas", custo: "R$200–R$350" }
    ],
    riscos: [
      "Atualizações de segurança não instaladas deixam o sistema vulnerável a malware",
      "Edição incorreta do registro pode tornar o Windows não inicializável",
      "Desabilitar proteções de segurança para contornar o erro expõe o sistema",
      "Tentativas de reparo sem diagnóstico podem agravar a corrupção do sistema",
      "Dados em pastas inacessíveis podem ser perdidos em tentativas de correção forçada"
    ],
    diagnostico: "O diagnóstico começa identificando o contexto exato em que o erro 0x80004005 ocorre. Analisamos os logs do Event Viewer, CBS.log e WindowsUpdate.log para rastrear a causa raiz.\n\nPara erros de rede, verificamos protocolos SMB, firewall e permissões de compartilhamento. Para erros de atualização, inspecionamos o estado dos componentes do Windows Update e a integridade do armazenamento de componentes (WinSxS). O diagnóstico preciso evita tentativas genéricas que podem piorar o problema.",
    solucao: "A solução depende do contexto identificado no diagnóstico. Para Windows Update: reset completo dos componentes (parada de serviços BITS e wuauserv, limpeza de SoftwareDistribution e catroot2, re-registro de DLLs). Para rede: configuração correta de protocolos SMB e permissões de compartilhamento.\n\nPara erros de virtualização: resolução de conflitos entre Hyper-V, VBS e VirtualBox com configuração adequada de cada tecnologia. Em todos os casos, validamos a integridade do sistema com SFC /scannow e DISM /RestoreHealth após a correção.",
    quandoCompensa: "Na maioria dos casos, o erro 0x80004005 é resolvível com diagnóstico correto. Compensa sempre investir no reparo, pois geralmente é um problema de software sem custo de peças.",
    quandoNaoCompensa: "Raramente não compensa, exceto quando o erro é sintoma de corrupção profunda do Windows que exigiria reinstalação completa — nesse caso, o custo-benefício depende do tempo de backup e reinstalação vs. reparo.",
    whatsappMessage: "Olá! Estou com o erro 0x80004005 no Windows e preciso de ajuda para resolver. Podem me atender?",
    conteudoExtra: `## Contextos Comuns do Erro 0x80004005\n\n### Windows Update\nO erro durante atualizações geralmente indica corrupção no cache de downloads ou nos componentes do serviço de atualização. A solução envolve resetar esses componentes e, em casos graves, usar o DISM para reparar a imagem do sistema.\n\n### Rede e Compartilhamento\nEm ambientes de rede, o erro frequentemente está relacionado à desabilitação do SMBv1 nas versões recentes do Windows 10/11. Dispositivos mais antigos (NAS, impressoras de rede) podem exigir este protocolo.\n\n### Máquinas Virtuais\nO conflito entre Hyper-V (usado pelo WSL2, Docker e Windows Sandbox) e o VirtualBox é uma causa frequente. É necessário escolher uma tecnologia ou configurar o VirtualBox para usar o backend Hyper-V.`,
    relatedPages: [
      { to: "/erro-0x80070005-curitiba", label: "Erro 0x80070005" },
      { to: "/erro-0xc000021a-curitiba", label: "Erro 0xc000021a" },
      { to: "/erro-0xc00000e-curitiba", label: "Erro 0xc00000e" },
      { to: "/tela-azul-windows-curitiba", label: "Tela Azul Windows" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ======= pc-travando-em-jogos-curitiba =======
  {
    slug: "pc-travando-em-jogos-curitiba",
    title: "PC Travando em Jogos em Curitiba | Freezes e Crashes — Técnico Gamer",
    metaDescription: "PC travando em jogos em Curitiba? Diagnóstico de hardware e software para eliminar freezes, crashes e quedas de FPS. Atendimento especializado.",
    h1: "PC Travando em Jogos — Diagnóstico e Otimização em Curitiba",
    categoria: "Performance",
    intro: "Travamentos durante jogos são um dos problemas mais frustrantes para gamers. Diferente de lentidão geral, os crashes em jogos podem ter causas muito específicas: desde drivers de GPU desatualizados até RAM com erros intermitentes que só aparecem sob carga pesada.\n\nO diagnóstico de travamentos em jogos exige uma abordagem metódica. É preciso distinguir entre problemas de hardware (superaquecimento, RAM defeituosa, fonte insuficiente) e software (drivers, DirectX, configurações do jogo, sistema operacional). Cada tipo de travamento — freeze completo, tela preta, crash to desktop, BSOD — aponta para causas diferentes.\n\nNosso técnico especializado realiza testes de estresse controlados em cada componente para identificar exatamente onde está o gargalo ou a falha, garantindo que você volte a jogar sem interrupções.",
    sintomas: [
      { titulo: "Jogo congela e o PC não responde", desc: "A tela fica estática, o áudio trava em loop e é necessário forçar reinicialização. Indica possível problema de GPU ou driver.", gravidade: "Alta" },
      { titulo: "Crash to Desktop (CTD) sem mensagem de erro", desc: "O jogo fecha abruptamente voltando para a área de trabalho sem aviso, comum em problemas de RAM ou driver.", gravidade: "Moderada" },
      { titulo: "Tela preta durante o jogo com som continuando", desc: "A GPU para de enviar sinal de vídeo mas o jogo continua rodando, típico de superaquecimento da placa de vídeo.", gravidade: "Alta" },
      { titulo: "Quedas severas de FPS após minutos jogando", desc: "O jogo começa fluido mas degrada progressivamente, forte indicativo de throttling térmico.", gravidade: "Moderada" },
      { titulo: "Tela azul (BSOD) durante jogos pesados", desc: "Crash do sistema com tela azul aparece apenas em jogos exigentes, pode indicar RAM defeituosa ou fonte instável.", gravidade: "Alta" },
      { titulo: "Artefatos visuais (glitches, texturas corrompidas)", desc: "Blocos coloridos, texturas distorcidas ou flickering indicam problema na GPU ou VRAM.", gravidade: "Alta" }
    ],
    causas: [
      { titulo: "Superaquecimento da GPU", desc: "A placa de vídeo atinge temperaturas acima de 90°C sob carga de jogos, causando throttling ou desligamento de proteção.", tipo: "hardware" },
      { titulo: "Memória RAM com erros intermitentes", desc: "Módulos de RAM com setores defeituosos que só falham sob alta utilização, passando despercebidos em uso normal.", tipo: "hardware" },
      { titulo: "Fonte de alimentação subdimensionada", desc: "A fonte não entrega potência suficiente nos picos de consumo da GPU, causando instabilidade.", tipo: "hardware" },
      { titulo: "Driver de GPU desatualizado ou corrompido", desc: "Drivers antigos ou mal instalados causam incompatibilidade com jogos recentes.", tipo: "software" },
      { titulo: "SSD/HD com setores defeituosos", desc: "Dados do jogo armazenados em setores ruins causam falhas ao carregar texturas ou níveis.", tipo: "hardware" },
      { titulo: "Overclock instável", desc: "Configurações de overclock na CPU ou GPU que não são 100% estáveis falham sob carga prolongada de jogos.", tipo: "erro-humano" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reinstalação limpa de drivers (DDU), otimização de configurações do jogo e limpeza de arquivos temporários.", tempo: "1-2 horas", custo: "R$100–R$160" },
      { nivel: "Médio", desc: "Diagnóstico térmico + limpeza/repaste da GPU, teste de RAM com MemTest86 e ajuste de fonte.", tempo: "2-4 horas", custo: "R$160–R$280" },
      { nivel: "Complexo", desc: "Substituição de componente defeituoso (RAM, fonte ou GPU) + diagnóstico completo de estabilidade.", tempo: "4-8 horas", custo: "R$280–R$500+" }
    ],
    riscos: [
      "Continuar jogando com GPU superaquecendo pode causar dano permanente ao chip gráfico",
      "RAM defeituosa pode corromper saves de jogos e arquivos do sistema operacional",
      "Fonte subdimensionada pode queimar componentes em picos de consumo",
      "Ignorar artefatos visuais pode indicar GPU em estágio inicial de falha",
      "Overclock instável pode degradar a vida útil do processador ou GPU"
    ],
    diagnostico: "O diagnóstico para travamentos em jogos segue uma sequência metódica: primeiro, monitoramento térmico em tempo real (GPU-Z, HWiNFO) durante execução de benchmarks (FurMark, 3DMark). Depois, teste de estresse de RAM com MemTest86 por múltiplos passes.\n\nVerificamos a saúde do SSD/HD com CrystalDiskInfo, testamos a estabilidade da fonte com multímetro e software de monitoramento de voltagens. Por fim, realizamos instalação limpa de drivers com DDU e teste em jogos específicos para validar a correção.",
    solucao: "A solução é personalizada conforme o diagnóstico. Para problemas de driver: remoção completa com DDU em modo de segurança e instalação limpa da versão mais estável. Para superaquecimento: limpeza e repaste da GPU com pasta térmica de alta performance.\n\nPara RAM defeituosa: substituição dos módulos com falha. Para fonte insuficiente: upgrade para modelo com potência adequada e certificação 80 Plus. Após qualquer correção, realizamos teste prolongado de estabilidade em jogos para garantir que o problema foi completamente resolvido.",
    quandoCompensa: "Na maioria dos casos, vale a pena investigar. Problemas de driver e térmicos são resolvidos com custo baixo. Mesmo substituição de RAM é acessível e resolve crashes frustrantes.",
    quandoNaoCompensa: "Se a GPU apresenta artefatos permanentes mesmo em temperaturas normais, o chip está danificado e a substituição da placa é o caminho — o custo-benefício depende do valor do PC e da placa necessária.",
    whatsappMessage: "Olá! Meu PC está travando durante jogos e preciso de diagnóstico. Podem me ajudar?",
    conteudoExtra: `## Ferramentas de Diagnóstico para Gamers\n\n| Ferramenta | Finalidade | Gratuita |\n|---|---|---|\n| MSI Afterburner | Monitoramento de GPU em tempo real | Sim |\n| HWiNFO64 | Temperaturas e voltagens detalhadas | Sim |\n| MemTest86 | Teste completo de memória RAM | Sim |\n| FurMark | Stress test de GPU | Sim |\n| CrystalDiskInfo | Saúde do SSD/HD | Sim |\n| DDU (Display Driver Uninstaller) | Remoção limpa de drivers | Sim |\n\n## Temperaturas Ideais para Gaming\n\n- **CPU durante jogo**: 60-80°C (aceitável até 85°C)\n- **GPU durante jogo**: 65-83°C (aceitável até 90°C)\n- **Acima de 90°C**: Throttling ativo, desempenho comprometido\n- **Acima de 100°C**: Risco de dano permanente`,
    relatedPages: [
      { to: "/notebook-esquentando-muito-curitiba", label: "Notebook Esquentando" },
      { to: "/computador-muito-barulhento-curitiba", label: "PC Barulhento" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/tela-azul-windows-curitiba", label: "Tela Azul Windows" },
      { to: "/pc-reiniciando-sozinho-curitiba", label: "PC Reiniciando Sozinho" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
  },

  // ======= impressora-nao-imprime-curitiba =======
  {
    slug: "impressora-nao-imprime-curitiba",
    title: "Impressora Não Imprime em Curitiba | Diagnóstico e Reparo — Técnico Especializado",
    metaDescription: "Impressora não imprime em Curitiba? Diagnóstico de driver, spooler, conexão e hardware. Atendimento profissional para todas as marcas.",
    h1: "Impressora Não Imprime — Diagnóstico e Solução em Curitiba",
    categoria: "Periféricos",
    intro: "Uma impressora que para de funcionar pode paralisar a produtividade de um escritório inteiro. O problema pode ser tão simples quanto uma fila de impressão travada ou tão complexo quanto uma cabeça de impressão entupida ou placa lógica com defeito.\n\nO diagnóstico correto é essencial porque as causas variam enormemente: problemas de driver, serviço de spooler travado, conexão USB ou de rede instável, cartuchos incompatíveis, e falhas mecânicas internas. Cada marca (HP, Epson, Brother, Canon, Samsung) tem particularidades que exigem conhecimento específico.\n\nNosso técnico atende todas as marcas e modelos, incluindo impressoras a laser, jato de tinta, multifuncionais e tanque de tinta. Resolvemos desde problemas de software até reparos mecânicos.",
    sintomas: [
      { titulo: "Impressora aparece como offline no Windows", desc: "O sistema mostra a impressora como 'Offline' mesmo estando ligada e conectada, impedindo qualquer impressão.", gravidade: "Moderada" },
      { titulo: "Documentos ficam presos na fila de impressão", desc: "Os trabalhos de impressão acumulam na fila mas nunca são impressos, e não podem ser cancelados.", gravidade: "Moderada" },
      { titulo: "Impressão sai em branco ou com falhas", desc: "As folhas saem totalmente brancas ou com listras e falhas, indicando problema no cartucho ou cabeça de impressão.", gravidade: "Moderada" },
      { titulo: "Impressora não é reconhecida pelo computador", desc: "O Windows não detecta a impressora ao conectar via USB, indicando problema de driver ou porta.", gravidade: "Moderada" },
      { titulo: "Erro de 'papel preso' sem papel visível", desc: "Sensores de papel reportam obstrução mesmo sem papel preso, pode ser sensor sujo ou defeituoso.", gravidade: "Baixa" },
      { titulo: "Impressora Wi-Fi desconecta constantemente", desc: "A conexão wireless cai frequentemente, impedindo impressão remota de outros dispositivos.", gravidade: "Moderada" }
    ],
    causas: [
      { titulo: "Serviço Print Spooler travado", desc: "O serviço do Windows responsável por gerenciar a fila de impressão trava ou corrompe, bloqueando todas as impressões.", tipo: "software" },
      { titulo: "Driver incompatível ou corrompido", desc: "Driver errado, desatualizado ou corrompido impede a comunicação correta entre o sistema e a impressora.", tipo: "software" },
      { titulo: "Cabeça de impressão entupida", desc: "Tinta seca nos bicos da cabeça de impressão (jato de tinta) bloqueia a passagem de tinta, causando falhas.", tipo: "desgaste" },
      { titulo: "Cartucho vazio ou incompatível", desc: "Cartuchos remanufaturados com chip incompatível ou toner esgotado não são reconhecidos pela impressora.", tipo: "hardware" },
      { titulo: "Cabo USB ou porta defeituosa", desc: "Cabos danificados ou portas USB com mau contato impedem a comunicação estável.", tipo: "hardware" },
      { titulo: "Configuração de rede incorreta", desc: "IP fixo alterado, rede Wi-Fi trocada ou firewall bloqueando a porta de impressão na rede.", tipo: "software" }
    ],
    cenarios: [
      { nivel: "Simples", desc: "Reset do spooler de impressão, limpeza da fila, reinstalação de driver e verificação de conexão.", tempo: "30min–1 hora", custo: "R$80–R$130" },
      { nivel: "Médio", desc: "Limpeza de cabeça de impressão, configuração de rede Wi-Fi, troca de cartucho e calibração.", tempo: "1-2 horas", custo: "R$130–R$220" },
      { nivel: "Complexo", desc: "Reparo mecânico interno, substituição de cabeça de impressão ou placa lógica da impressora.", tempo: "2-5 horas", custo: "R$220–R$400" }
    ],
    riscos: [
      "Tentativas de limpeza manual da cabeça de impressão podem danificá-la permanentemente",
      "Usar cartuchos remanufaturados de baixa qualidade pode entupir os bicos de impressão",
      "Forçar remoção de 'papel preso' pode danificar sensores e rolos internos",
      "Reinstalar drivers incorretos pode causar conflitos com outros dispositivos",
      "Ignorar vazamentos de tinta pode danificar componentes eletrônicos internos"
    ],
    diagnostico: "O diagnóstico avalia a impressora em múltiplas camadas: primeiro verificamos a conectividade (USB, rede, Wi-Fi) e o reconhecimento pelo sistema operacional. Depois, testamos o serviço de spooler, driver e fila de impressão.\n\nPara problemas de qualidade de impressão, executamos a página de teste interna da impressora (sem depender do PC) para isolar se o problema é no equipamento ou no software. Em impressoras jato de tinta, verificamos o estado dos bicos com teste de padrão de impressão.",
    solucao: "Para problemas de software: reset completo do spooler (parada do serviço, limpeza de arquivos em C:\\Windows\\System32\\spool\\PRINTERS, reinstalação limpa do driver oficial). Para problemas de qualidade: ciclos de limpeza automática e manual da cabeça de impressão.\n\nPara impressoras de rede: reconfiguração de IP fixo, verificação de firewall e teste de porta. Em casos mecânicos: substituição de peças internas (rolos de alimentação, sensores, fusores em impressoras laser). Após o reparo, imprimimos página de teste e documento real para validação.",
    quandoCompensa: "Impressoras laser e multifuncionais de médio/alto porte geralmente compensam o reparo. Problemas de software são resolvidos rapidamente e sem custo de peças.",
    quandoNaoCompensa: "Impressoras jato de tinta de entrada (sub R$500 novas) com cabeça de impressão integrada geralmente não compensam reparo mecânico — o custo da peça se aproxima do valor de uma impressora nova.",
    whatsappMessage: "Olá! Minha impressora não está imprimindo e preciso de ajuda para resolver. Podem me atender?",
    conteudoExtra: `## Marcas que Atendemos\n\n- **HP**: LaserJet, DeskJet, OfficeJet, Smart Tank\n- **Epson**: EcoTank, WorkForce, Expression\n- **Brother**: HL (laser), DCP e MFC (multifuncionais)\n- **Canon**: PIXMA, MAXIFY, imageCLASS\n- **Samsung/Xerox**: Impressoras laser monocromáticas e coloridas\n\n## Dicas de Manutenção Preventiva\n\n1. **Imprima ao menos 1 página por semana** para evitar ressecamento da tinta\n2. **Use papel de boa qualidade** para evitar acúmulo de resíduos nos rolos\n3. **Mantenha o driver atualizado** através do site oficial do fabricante\n4. **Em impressoras Wi-Fi**, configure IP fixo para evitar perda de conexão\n5. **Nunca force a remoção de papel preso** — siga o procedimento do manual`,
    relatedPages: [
      { to: "/computador-sem-wifi-curitiba", label: "PC Sem Wi-Fi" },
      { to: "/computador-lento-curitiba", label: "Computador Lento" },
      { to: "/formatacao-computador-curitiba", label: "Formatação" },
      { to: "/redes-wifi-curitiba", label: "Redes e Wi-Fi" },
      { to: "/atendimento-domicilio", label: "Atendimento a Domicílio" },
      { to: "/servicos", label: "Todos os Serviços" }
    ]
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
