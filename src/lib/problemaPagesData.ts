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
  { slug: "erro-ao-instalar-memoria-ram", title: "Erro ao Instalar Memória RAM | Guia Técnico", metaDescription: "Erro ao instalar RAM? Computador não liga após trocar memória? Veja causas e soluções. Diagnóstico profissional em Curitiba.", h1: "Erro ao Instalar Memória RAM — O Que Fazer?", categoria: "Erros e Casos Reais", intro: `Instalou memória RAM nova e o computador não liga, emite bips ou fica com tela preta? RAM incompatível, mal encaixada ou frequência diferente são as causas mais comuns. Cada placa-mãe aceita tipos específicos de memória (DDR3, DDR4, DDR5) com frequências específicas. Instalar o módulo errado pode resultar em tela preta, instabilidade ou até dano ao slot.`, sintomas: [{ titulo: "Computador não liga após instalar RAM", desc: "RAM incompatível ou mal encaixada.", gravidade: "Simples" }, { titulo: "Bips ao ligar", desc: "Sequência de bips indica problema de memória.", gravidade: "Simples" }, { titulo: "Instabilidade e travamentos", desc: "RAM funcionou mas é incompatível em frequência ou timings.", gravidade: "Simples a médio" }], causas: [{ titulo: "RAM de geração errada", desc: "DDR4 em slot DDR3 ou vice-versa. Não são compatíveis.", tipo: "erro-humano" }, { titulo: "Frequência incompatível", desc: "RAM com frequência diferente da suportada pela placa.", tipo: "erro-humano" }, { titulo: "Módulo mal encaixado", desc: "Trava não clicou completamente.", tipo: "erro-humano" }, { titulo: "Slot com defeito", desc: "Slot danificado durante a instalação.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reencaixe correto ou troca por módulo compatível.", tempo: "30 min", custo: "R$ 90" }, { nivel: "Médio", desc: "Diagnóstico de compatibilidade + compra do módulo correto.", tempo: "1h", custo: "R$ 100 a R$ 200 + peça" }, { nivel: "Complexo", desc: "Slot danificado — reparo de placa-mãe.", tempo: "3 a 7 dias", custo: "R$ 200 a R$ 500" }], riscos: ["Forçar módulo pode danificar o slot permanentemente", "RAM incompatível pode causar instabilidade em dados"], diagnostico: `Verificação de compatibilidade, teste de módulos, inspeção de slots. Custo: R$ 90.`, solucao: `Identificar módulo compatível, instalar corretamente, testar estabilidade.`, quandoCompensa: "Quase sempre — o erro geralmente é reversível.", quandoNaoCompensa: "Se o slot foi danificado fisicamente em placa antiga.", whatsappMessage: "Olá! Instalei memória RAM e meu computador não funciona. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Como Evitar Erros de RAM\n\n1. Verifique o manual da placa-mãe para saber DDR e frequência suportados\n2. Use sites como Crucial.com para verificar compatibilidade\n3. Sempre desligue e desconecte da tomada antes de instalar\n4. Use pulseira antiestática\n5. Ouça o "click" da trava ao encaixar` },

  { slug: "upgrade-deu-problema", title: "Upgrade Deu Problema | Técnico Curitiba", metaDescription: "Fez upgrade e deu problema? SSD, RAM ou outro componente não funciona? Diagnóstico em Curitiba.", h1: "Upgrade Deu Problema — Como Resolver?", categoria: "Erros e Casos Reais", intro: `Upgrades de hardware são a forma mais eficiente de melhorar o desempenho de um computador. Mas quando feitos sem conhecimento técnico adequado, podem causar problemas sérios: computador que não liga, instabilidade, perda de dados ou até dano permanente. Atendemos dezenas de casos por mês de upgrades mal executados em Curitiba.`, sintomas: [{ titulo: "Não liga após upgrade", desc: "Peça incompatível ou mal instalada.", gravidade: "Simples a médio" }, { titulo: "Instabilidade após upgrade", desc: "Trava, tela azul ou reinicia. Compatibilidade ou instalação.", gravidade: "Simples a médio" }, { titulo: "Performance não melhorou", desc: "Upgrade errado para o gargalo real.", gravidade: "Simples" }], causas: [{ titulo: "Incompatibilidade de componentes", desc: "Peça que não funciona com o hardware existente.", tipo: "erro-humano" }, { titulo: "Instalação incorreta", desc: "Componente mal encaixado, cabo errado, sem pasta térmica.", tipo: "erro-humano" }, { titulo: "BIOS não configurada", desc: "Alguns upgrades exigem ajustes na BIOS para funcionar.", tipo: "erro-humano" }, { titulo: "Componente com defeito de fábrica", desc: "Peça nova já com defeito — acontece.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reconfiguração, reencaixe, ajuste de BIOS.", tempo: "1h", custo: "R$ 90 a R$ 150" }, { nivel: "Médio", desc: "Troca de peça por modelo compatível.", tempo: "1 a 2 dias", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Reparo de dano causado pelo upgrade.", tempo: "3 a 7 dias", custo: "R$ 250 a R$ 600" }], riscos: ["Continuar tentando pode piorar o dano", "Trocar mais peças por achismo desperdiça dinheiro"], diagnostico: `Análise completa do upgrade realizado, teste de compatibilidade, verificação de instalação. Custo: R$ 90.`, solucao: `Correção do upgrade (peça certa, instalação certa, configuração certa).`, quandoCompensa: "Na maioria dos casos — o equipamento original geralmente está intacto.", quandoNaoCompensa: "Quando o upgrade causou curto e danificou a placa-mãe.", whatsappMessage: "Olá! Fiz um upgrade e agora meu computador tem problemas. Podem ajudar?", relatedPages: [...RELATED_BASE, { label: "Erro RAM", to: "/erro-ao-instalar-memoria-ram" }, { label: "Erros Comuns em Upgrade", to: "/erros-comuns-em-upgrade" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Os Upgrades Mais Comuns (e Erros)\n\n| Upgrade | Erro Comum | Como Evitar |\n|---|---|---|\n| SSD | Interface errada (NVMe vs SATA) | Verificar manual da placa |\n| RAM | Geração ou frequência errada | Consultar QVL da placa |\n| GPU | Fonte insuficiente | Calcular TDP total |\n| Processador | Socket incompatível | Verificar compatibilidade exata |` },

  { slug: "placa-mae-queimada", title: "Placa-Mãe Queimada | Diagnóstico Curitiba", metaDescription: "Placa-mãe queimada? Veja sintomas, causas e quando compensa reparar. Diagnóstico profissional em Curitiba.", h1: "Placa-Mãe Queimada — Diagnóstico e Opções", categoria: "Erros e Casos Reais", intro: `Uma placa-mãe queimada é um dos diagnósticos mais temidos — mas nem sempre significa substituição total. Em muitos casos, o dano é localizado (um capacitor, um regulador de tensão, uma trilha) e pode ser reparado em bancada por um valor muito menor que a troca.`, sintomas: [{ titulo: "Computador não liga de jeito nenhum", desc: "Curto na placa impede qualquer inicialização.", gravidade: "Complexo" }, { titulo: "Cheiro de queimado", desc: "Componente queimou. Pode ser localizado ou extenso.", gravidade: "Complexo" }, { titulo: "Funciona parcialmente", desc: "Algumas portas não funcionam, USB mortas, etc.", gravidade: "Médio" }], causas: [{ titulo: "Pico de energia", desc: "Surto na rede elétrica queima componentes. Usar estabilizador/nobreak previne.", tipo: "hardware" }, { titulo: "Curto por líquido ou poeira", desc: "Líquido ou poeira condutiva entre trilhas causa curto.", tipo: "erro-humano" }, { titulo: "Desgaste natural", desc: "Capacitores estufam após 5-10 anos de uso.", tipo: "desgaste" }, { titulo: "Uso de fonte de baixa qualidade", desc: "Fontes genéricas podem enviar tensão irregular e danificar a placa.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Componente localizado (capacitor, fusível). Reparo em bancada.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 400" }, { nivel: "Médio", desc: "Regulador de tensão ou múltiplos capacitores.", tempo: "5 a 10 dias", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Dano extenso — troca de placa necessária.", tempo: "Depende", custo: "R$ 400 a R$ 1500+ (placa nova)" }], riscos: ["Continuar usando com queima parcial pode danificar outros componentes", "Reparo amador pode causar mais curtos"], diagnostico: `Inspeção visual com lupa/microscópio, teste de curto com multímetro, medição de tensões. Custo: R$ 90.`, solucao: `Para dano localizado: reparo com microssolda. Para dano extenso: troca de placa.`, quandoCompensa: "Reparo de componentes localizados quase sempre compensa. Vale verificar antes de comprar placa nova.", quandoNaoCompensa: "Dano extenso em placa antiga onde o custo da troca supera o valor do computador.", whatsappMessage: "Olá! Acho que a placa-mãe do meu computador queimou. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Curto em Placa", to: "/curto-em-placa-eletronica" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }], conteudoExtra: `### Vale a Pena Reparar a Placa-Mãe?\n\nDepende:\n- **Sim**: quando o dano é localizado (1-2 componentes), reparo custa R$ 200-400\n- **Talvez**: quando precisa de análise para determinar extensão\n- **Não**: quando há queima extensa ou a placa é antiga demais` },

  { slug: "gpu-desgastada", title: "GPU Desgastada | Diagnóstico Curitiba", metaDescription: "GPU/placa de vídeo com problemas? Artefatos, tela preta, desempenho baixo? Diagnóstico em Curitiba.", h1: "GPU Desgastada — Sinais e O Que Fazer", categoria: "Erros e Casos Reais", intro: `GPUs (placas de vídeo) são componentes que trabalham sob alta temperatura e carga. Com o tempo, solda, pasta térmica e capacitores degradam. Os sinais mais comuns são artefatos na tela, travamentos em jogos e tela preta. GPUs usadas em mineração de criptomoedas sofrem desgaste acelerado.`, sintomas: [{ titulo: "Artefatos visuais (pixels coloridos)", desc: "Pontos, linhas ou blocos coloridos na tela. Memória da GPU ou chip com defeito.", gravidade: "Médio a complexo" }, { titulo: "Tela preta em jogos", desc: "GPU não aguenta carga e desliga o vídeo.", gravidade: "Médio" }, { titulo: "Performance muito abaixo do esperado", desc: "Temperaturas altas causam throttling ou chip degradado.", gravidade: "Médio" }], causas: [{ titulo: "Desgaste por temperatura", desc: "Anos de uso em temperatura alta degradam a solda e os chips.", tipo: "desgaste" }, { titulo: "Mineração de criptomoedas", desc: "Uso 24/7 em carga máxima acelera o desgaste em 3-5x.", tipo: "desgaste" }, { titulo: "Pasta térmica seca", desc: "GPU esquenta mais que deveria, acelerando degradação.", tipo: "desgaste" }, { titulo: "Solda fria (BGA)", desc: "Microsoldas entre chip e substrato perdem contato.", tipo: "desgaste" }], cenarios: [{ nivel: "Simples", desc: "Troca de pasta térmica e limpeza. Pode resolver throttling.", tempo: "1h", custo: "R$ 120 a R$ 200" }, { nivel: "Médio", desc: "Troca de pasta + pads térmicos + teste extensivo.", tempo: "1 a 2 dias", custo: "R$ 200 a R$ 350" }, { nivel: "Complexo", desc: "Reballing (resolda do chip). Nem sempre funciona.", tempo: "5 a 15 dias", custo: "R$ 300 a R$ 600" }], riscos: ["Reballing não é garantido e a GPU pode falhar novamente", "Continuar usando com artefatos pode causar dano ao monitor (raro)"], diagnostico: `Teste de estresse com monitoramento de temperatura, análise de artefatos, verificação de solda com diagnóstico térmico. Custo: R$ 90.`, solucao: `Para superaquecimento: manutenção térmica. Para solda fria: reballing (quando viável). Para desgaste severo: substituição.`, quandoCompensa: "Limpeza + pasta sempre compensa. Reballing compensa para GPUs de médio a alto valor.", quandoNaoCompensa: "Reballing de GPU de baixo valor (GT 710, GT 1030) ou muito antiga.", whatsappMessage: "Olá! Minha placa de vídeo está com problemas. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Sem Vídeo", to: "/computador-sem-video-curitiba" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }], conteudoExtra: `### GPUs de Mineração: Cuidado\n\nSe você comprou GPU usada que foi usada em mineração, saiba que:\n- A vida útil foi drasticamente reduzida\n- Soldas BGA estão mais frágeis\n- Ventoinhas podem estar desgastadas\n- Reballing pode dar sobrevida temporária` },

  { slug: "curto-em-placa-eletronica", title: "Curto em Placa Eletrônica | Diagnóstico Curitiba", metaDescription: "Curto-circuito em placa eletrônica? Diagnóstico profissional e reparo com microssolda em Curitiba.", h1: "Curto em Placa Eletrônica — Diagnóstico e Reparo", categoria: "Erros e Casos Reais", intro: `Um curto-circuito em placa eletrônica pode afetar computadores, notebooks, TVs e diversos equipamentos. O curto ocorre quando dois pontos que não deveriam estar conectados fazem contato — por líquido, poeira condutiva, componente queimado ou trilha danificada. O diagnóstico com multímetro e câmera térmica localiza o ponto exato do curto.`, sintomas: [{ titulo: "Equipamento não liga", desc: "Curto impede alimentação. Fonte entra em proteção.", gravidade: "Médio a complexo" }, { titulo: "Cheiro de queimado", desc: "Componente em curto gera calor e queima.", gravidade: "Complexo" }, { titulo: "Funciona parcialmente", desc: "Curto em trilha específica afeta apenas uma função.", gravidade: "Médio" }], causas: [{ titulo: "Líquido na placa", desc: "Água, café ou outros líquidos criam caminhos de curto.", tipo: "erro-humano" }, { titulo: "Componente SMD queimado", desc: "Resistor, capacitor ou diodo que falhou e criou curto.", tipo: "hardware" }, { titulo: "Poeira condutiva", desc: "Acúmulo de poeira metálica ou úmida entre trilhas.", tipo: "desgaste" }, { titulo: "Dano por ferramenta", desc: "Chave de fenda escorregou e riscou trilha, criando contato.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Limpeza e remoção do agente causador do curto.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Troca de componente SMD em curto.", tempo: "2 a 5 dias", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Reparo de trilha danificada + troca de componentes.", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 800+" }], riscos: ["Curto em cadeia pode danificar vários componentes", "Tentar reparar sem equipamento adequado causa mais dano"], diagnostico: `Localização do curto com multímetro e câmera térmica, identificação do componente causador, análise da extensão do dano. Custo: R$ 90-150.`, solucao: `Remoção do componente em curto, troca por novo, limpeza e teste completo.`, quandoCompensa: "Quando o curto é localizado e o equipamento tem valor. O reparo é viável na maioria dos casos.", quandoNaoCompensa: "Quando o curto causou dano em cadeia extenso.", whatsappMessage: "Olá! Meu equipamento tem curto-circuito. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Placa-Mãe Queimada", to: "/placa-mae-queimada" }, { label: "Conserto Placa", to: "/servicos/conserto-placa" }], conteudoExtra: `### Como Ocorre um Curto?\n\nImagine trilhas de cobre na placa como estradas. Um curto é como uma ponte ilegal entre duas estradas — a energia vai para onde não deveria, causando dano. O diagnóstico localiza essa "ponte" e a remove.` },

  // ===== SOFTWARE / SISTEMA (31-35) =====
  { slug: "windows-lento-curitiba", title: "Windows Lento em Curitiba | Otimização e Diagnóstico", metaDescription: "Windows lento? Otimização profissional, limpeza e diagnóstico em Curitiba. Resolva sem formatar.", h1: "Windows Lento em Curitiba — Otimização Profissional", categoria: "Software / Sistema", intro: `Windows lento pode ser causado por acúmulo de programas, malware, drivers desatualizados, registro corrompido ou simplesmente hardware insuficiente. Antes de formatar, vale investir em diagnóstico para entender se o problema é software (otimização resolve) ou hardware (upgrade necessário). A formatação é solução válida, mas nem sempre necessária.`, sintomas: [{ titulo: "Boot demorado", desc: "Windows leva minutos para iniciar. Muitos programas na inicialização.", gravidade: "Simples" }, { titulo: "Programas lentos", desc: "Tudo abre devagar. RAM lotada ou disco em 100%.", gravidade: "Simples a médio" }, { titulo: "Windows Update trava", desc: "Atualizações ficam em loop ou travam a máquina.", gravidade: "Simples" }], causas: [{ titulo: "Programas desnecessários na inicialização", desc: "Dezenas de programas abrem junto com o Windows.", tipo: "software" }, { titulo: "Malware oculto", desc: "Vírus ou mineradores consumindo recursos.", tipo: "software" }, { titulo: "Registro corrompido", desc: "Anos de instalações acumulam lixo no registro.", tipo: "software" }, { titulo: "HD mecânico", desc: "O gargalo pode ser hardware, não software.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Otimização, limpeza de inicialização, remoção de bloatware.", tempo: "1h", custo: "R$ 100 a R$ 150" }, { nivel: "Médio", desc: "Formatação limpa + instalação de drivers.", tempo: "2h a 4h", custo: "R$ 150 a R$ 250" }, { nivel: "Complexo", desc: "Diagnóstico de hardware + upgrade.", tempo: "2h a 1 dia", custo: "R$ 250 a R$ 600+" }], riscos: ["CCleaner e similares podem causar mais problemas", "Formatar sem backup perde dados"], diagnostico: `Análise de performance, verificação de malware, teste de disco e RAM. Custo: R$ 90.`, solucao: `Otimização quando possível, formatação quando necessário, upgrade quando o hardware é o gargalo.`, quandoCompensa: "Otimização sempre compensa tentar antes de formatar.", quandoNaoCompensa: "Quando o hardware é muito antigo — otimizar software não compensa o gargalo.", whatsappMessage: "Olá! Meu Windows está muito lento. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }], conteudoExtra: `### Otimização vs Formatação\n\n| Aspecto | Otimização | Formatação |\n|---|---|---|\n| Tempo | 1h | 2-4h |\n| Perde dados | Não | Sim (sem backup) |\n| Eficácia | 70-80% dos casos | 95% dos casos |\n| Custo | Menor | Maior |\n| Recomendado quando | Problema é leve | Sistema muito comprometido |` },

  { slug: "computador-com-virus-curitiba", title: "Computador com Vírus em Curitiba | Remoção", metaDescription: "Computador com vírus? Remoção profissional em Curitiba. Malware, ransomware, adware. Atendimento no mesmo dia.", h1: "Computador com Vírus em Curitiba — Remoção Profissional", categoria: "Software / Sistema", intro: `Vírus, malware, ransomware, adware — cada tipo de ameaça requer uma abordagem diferente. "Passar o antivírus" nem sempre resolve. Ameaças modernas se escondem em processos do sistema, registro e áreas protegidas do disco. A remoção profissional garante eliminação completa sem perda de dados.`, sintomas: [{ titulo: "Pop-ups e propagandas excessivas", desc: "Adware instalado. Programas indesejados abrem sozinhos.", gravidade: "Simples" }, { titulo: "Computador extremamente lento", desc: "Minerador de criptomoedas usando CPU/GPU em segundo plano.", gravidade: "Simples a médio" }, { titulo: "Arquivos criptografados (ransomware)", desc: "Arquivos renomeados com extensão estranha. Pedido de resgate.", gravidade: "Complexo" }, { titulo: "Programas abrindo sozinhos", desc: "Malware executando em segundo plano.", gravidade: "Simples a médio" }], causas: [{ titulo: "Download de programas de fontes não confiáveis", desc: "Cracks, programas piratas e sites duvidosos.", tipo: "erro-humano" }, { titulo: "E-mail com anexo malicioso", desc: "Phishing com arquivo infectado.", tipo: "erro-humano" }, { titulo: "Navegação em sites comprometidos", desc: "Drive-by download — infecção automática.", tipo: "software" }, { titulo: "Pen drive infectado", desc: "Autorun de dispositivos USB.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Remoção de adware e programas indesejados.", tempo: "1h a 2h", custo: "R$ 100 a R$ 180" }, { nivel: "Médio", desc: "Remoção de malware profundo + limpeza completa.", tempo: "2h a 4h", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Ransomware ou rootkit — pode exigir formatação.", tempo: "4h a 1 dia", custo: "R$ 250 a R$ 500" }], riscos: ["Antivírus gratuito nem sempre detecta ameaças avançadas", "Tentar remover manualmente pode apagar arquivos do sistema", "Ransomware: pagar resgate não garante recuperação"], diagnostico: `Análise com ferramentas profissionais (não só antivírus), scan de registro, processos e serviços. Custo: R$ 90.`, solucao: `Remoção completa com ferramentas profissionais + proteção + orientação de prevenção.`, quandoCompensa: "Quase sempre — remoção é mais rápida e barata que formatação na maioria dos casos.", quandoNaoCompensa: "Ransomware com criptografia forte onde os dados não são recuperáveis — formatação é a saída.", whatsappMessage: "Olá! Meu computador está com vírus. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Remoção de Vírus", to: "/servicos/remocao-virus" }, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }], conteudoExtra: `### Prevenção é Melhor que Remediação\n\n1. Nunca baixe programas de sites desconhecidos\n2. Não abra anexos de e-mails suspeitos\n3. Mantenha Windows e antivírus atualizados\n4. Use senhas fortes e diferentes\n5. Faça backup regular dos dados importantes` },

  { slug: "formatacao-resolve-curitiba", title: "Formatação Resolve Meu Problema? | Curitiba", metaDescription: "Será que formatar resolve? Saiba quando a formatação é a solução e quando é desnecessária. Técnico em Curitiba.", h1: "Formatação Resolve Meu Problema? — Guia Honesto", categoria: "Software / Sistema", intro: `"Manda formatar que resolve" é o conselho mais dado — e nem sempre correto. A formatação resolve problemas de software (vírus, sistema corrompido, lentidão por acúmulo), mas NÃO resolve problemas de hardware (HD com defeito, superaquecimento, RAM falhando). Formatar sem diagnóstico pode ser desperdício de tempo e dinheiro. Nesta página, explicamos quando formatar resolve e quando não resolve.`, sintomas: [{ titulo: "Formatar resolve quando:", desc: "Vírus persistente, sistema corrompido, acúmulo de programas, Windows instável.", gravidade: "Simples" }, { titulo: "Formatar NÃO resolve quando:", desc: "HD com setores defeituosos, superaquecimento, RAM com erro, fonte instável.", gravidade: "N/A" }], causas: [{ titulo: "Problemas de software resolvíveis por formatação", desc: "Vírus, drivers corrompidos, registro inchado, bloatware.", tipo: "software" }, { titulo: "Problemas de hardware que formatação ignora", desc: "HD desgastado, RAM defeituosa, processador com throttling.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Formatação resolve — Windows limpo + drivers.", tempo: "2h a 3h", custo: "R$ 150 a R$ 250" }, { nivel: "Médio", desc: "Formatação + diagnóstico para confirmar se é só software.", tempo: "3h a 5h", custo: "R$ 200 a R$ 350" }, { nivel: "Complexo", desc: "Problema é hardware — formatação não resolve.", tempo: "Variável", custo: "Depende do reparo" }], riscos: ["Formatar sem backup = perda total de dados", "Formatar com HD defeituoso = problema volta em semanas", "Formatar notebook com superaquecimento = dinheiro jogado fora"], diagnostico: `Diagnóstico rápido para determinar se é software ou hardware ANTES de formatar. Custo: R$ 90 (economiza formatação desnecessária).`, solucao: `Se é software: formatação limpa. Se é hardware: reparo ou upgrade primeiro, depois formatação se necessário.`, quandoCompensa: "Quando o diagnóstico confirma que é problema de software.", quandoNaoCompensa: "Quando há sintomas claros de hardware (barulhos, superaquecimento, erros em teste de memória).", whatsappMessage: "Olá! Preciso saber se formatação resolve meu problema. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Formatação", to: "/servicos/formatacao-computador" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Windows Lento", to: "/windows-lento-curitiba" }], conteudoExtra: `### Tabela: Quando Formatar Resolve?\n\n| Problema | Formatar Resolve? |\n|---|---|\n| Vírus/malware | ✅ Sim |\n| Windows corrompido | ✅ Sim |\n| Lento por software | ✅ Sim |\n| HD com defeito | ❌ Não |\n| Superaquecimento | ❌ Não |\n| RAM defeituosa | ❌ Não |\n| Fonte instável | ❌ Não |\n| Tela azul por driver | ✅ Sim |\n| Tela azul por hardware | ❌ Não |` },

  { slug: "erro-apos-formatacao", title: "Erro Após Formatação | Técnico Curitiba", metaDescription: "Formatou e continua com problemas? Veja por que a formatação não resolveu e o que fazer. Curitiba.", h1: "Erro Após Formatação — Por Que Não Resolveu?", categoria: "Software / Sistema", intro: `Formatou e o problema continua? Isso acontece quando a causa raiz é hardware, não software. Os erros mais comuns após formatação são: lentidão persistente (HD com setores defeituosos), travamentos (RAM com erro) e desligamentos (superaquecimento). Nesses casos, a formatação foi desnecessária — o próximo passo é diagnóstico de hardware.`, sintomas: [{ titulo: "Continua lento após formatar", desc: "HD com setores defeituosos ou hardware subdimensionado.", gravidade: "Médio" }, { titulo: "Tela azul mesmo após formatação", desc: "RAM, HD ou driver de hardware com problema.", gravidade: "Médio" }, { titulo: "Drivers não instalados corretamente", desc: "Formatação sem os drivers corretos.", gravidade: "Simples" }], causas: [{ titulo: "Problema era hardware", desc: "Formatação só resolve software. Hardware precisa de reparo.", tipo: "hardware" }, { titulo: "Formatação mal feita", desc: "Windows instalado sem drivers, partição errada, modo errado.", tipo: "erro-humano" }, { titulo: "HD defeituoso", desc: "Mesmo com sistema novo, disco com erros causa problemas.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Instalação de drivers faltantes.", tempo: "1h", custo: "R$ 90 a R$ 150" }, { nivel: "Médio", desc: "Diagnóstico de hardware + correção.", tempo: "2h a 4h", custo: "R$ 150 a R$ 400" }, { nivel: "Complexo", desc: "Troca de componente defeituoso + reinstalação.", tempo: "1 a 3 dias", custo: "R$ 250 a R$ 600+" }], riscos: ["Formatar de novo não vai resolver problema de hardware", "Continuar usando com HD defeituoso pode perder dados"], diagnostico: `Diagnóstico de hardware pós-formatação: teste de HD (SMART), RAM (MemTest), temperatura, fonte. Custo: R$ 90.`, solucao: `Identificar e resolver o problema de hardware que a formatação não resolveu.`, quandoCompensa: "Sempre compensa diagnosticar — melhor saber a verdade do que formatar novamente.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Formatei meu computador mas continua com problemas. Podem ajudar?", relatedPages: [...RELATED_BASE, { label: "Formatação Resolve?", to: "/formatacao-resolve-curitiba" }, { label: "Computador Lento", to: "/computador-lento-curitiba" }], conteudoExtra: `### Por Que Isso Acontece?\n\nFormatação é como repintar uma casa com problemas estruturais — fica bonita por fora mas os problemas continuam. O diagnóstico antes de formatar evita esse desperdício.` },

  { slug: "pc-com-programas-pesados", title: "PC com Programas Pesados em Curitiba | Otimização", metaDescription: "PC não roda programas pesados? AutoCAD, Photoshop, jogos? Diagnóstico e upgrade em Curitiba.", h1: "PC com Programas Pesados em Curitiba — Otimização e Upgrade", categoria: "Software / Sistema", intro: `Programas como AutoCAD, Photoshop, Premiere, jogos modernos e softwares de engenharia exigem hardware específico. Se seu computador trava, fica lento ou não abre esses programas, o diagnóstico identifica qual componente é o gargalo e qual upgrade resolve.`, sintomas: [{ titulo: "Programa trava ao abrir", desc: "RAM ou GPU insuficiente para o software.", gravidade: "Simples" }, { titulo: "Lentidão extrema ao usar", desc: "Processador ou disco não acompanha.", gravidade: "Simples a médio" }, { titulo: "Renderização muito lenta", desc: "CPU/GPU insuficiente para processamento pesado.", gravidade: "Simples" }], causas: [{ titulo: "RAM insuficiente", desc: "Programas pesados exigem 16-32GB. Muitos PCs têm 4-8GB.", tipo: "hardware" }, { titulo: "GPU insuficiente", desc: "Jogos e 3D exigem GPU dedicada. Integrada não dá conta.", tipo: "hardware" }, { titulo: "Disco lento (HD)", desc: "Programas grandes precisam de SSD para carregar rápido.", tipo: "hardware" }, { titulo: "Processador antigo", desc: "Processadores de 5+ anos podem não acompanhar software moderno.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Upgrade de RAM + SSD resolve a maioria.", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Médio", desc: "Upgrade de RAM + SSD + GPU.", tempo: "4h a 1 dia", custo: "R$ 600 a R$ 1500" }, { nivel: "Complexo", desc: "Montagem de PC otimizada para a carga de trabalho.", tempo: "Sob consulta", custo: "Sob consulta" }], riscos: ["Comprar peça errada por não saber qual é o gargalo", "Upgrade parcial pode não resolver se o gargalo é outro componente"], diagnostico: `Análise de requisitos do software vs hardware atual, identificação do gargalo, recomendação de upgrade. Custo: R$ 90 (incorporado ao serviço).`, solucao: `Upgrade direcionado ao gargalo identificado. Sem desperdício.`, quandoCompensa: "Quando o upgrade resolve o gargalo e o hardware base ainda é bom.", quandoNaoCompensa: "Quando o hardware todo é defasado e o upgrade seria quase uma montagem nova.", whatsappMessage: "Olá! Meu PC não roda programas pesados. Podem me ajudar com upgrade?", relatedPages: [...RELATED_BASE, { label: "Computador Lento", to: "/computador-lento-curitiba" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }, { label: "Montagem PC", to: "/servicos/montagem-pc" }], conteudoExtra: `### Requisitos Mínimos Recomendados\n\n| Software | RAM Mínima | GPU | SSD |\n|---|---|---|---|\n| AutoCAD | 16GB | Dedicada | Sim |\n| Photoshop | 16GB | 2GB+ | Sim |\n| Premiere Pro | 32GB | 4GB+ | NVMe |\n| Jogos Modernos | 16GB | GTX 1060+ | Sim |\n| Office/Navegação | 8GB | Integrada | Sim |` },

  // ===== DECISÃO DO CLIENTE (36-40) =====
  { slug: "vale-a-pena-consertar-computador", title: "Vale a Pena Consertar o Computador? | Guia", metaDescription: "Vale a pena consertar ou comprar novo? Guia completo para decidir. Diagnóstico profissional em Curitiba.", h1: "Vale a Pena Consertar o Computador? — Guia de Decisão", categoria: "Decisão do Cliente", intro: `Essa é a dúvida mais comum que recebemos. A resposta honesta é: depende. Depende do problema, da idade do equipamento, do custo do reparo e das necessidades do usuário. Nesta página, apresentamos um framework de decisão transparente para ajudar você a tomar a melhor escolha — sem pressão de venda.`, sintomas: [{ titulo: "Regra dos 40%", desc: "Se o reparo custa mais de 40% do valor de um equivalente novo, geralmente não compensa.", gravidade: "N/A" }, { titulo: "Idade do equipamento", desc: "Computadores com mais de 7-8 anos tendem a ter múltiplos problemas em sequência.", gravidade: "N/A" }], causas: [{ titulo: "Problema único e identificável", desc: "Um componente com defeito em equipamento novo — compensa reparar.", tipo: "hardware" }, { titulo: "Múltiplos problemas", desc: "Vários componentes falhando — sinal de desgaste generalizado.", tipo: "desgaste" }, { titulo: "Defasagem tecnológica", desc: "Hardware não suporta software atual — upgrade pode não resolver.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema único com custo baixo → CONSERTAR", tempo: "Variável", custo: "Até 30% do valor de novo" }, { nivel: "Médio", desc: "Problema identificável mas custo moderado → AVALIAR", tempo: "Variável", custo: "30-50% do valor de novo" }, { nivel: "Complexo", desc: "Múltiplos problemas ou custo alto → CONSIDERAR NOVO", tempo: "Variável", custo: "Acima de 50% do valor de novo" }], riscos: ["Reparar sem diagnóstico pode acabar custando mais que novo", "Comprar novo sem avaliar pode ser desperdício quando reparo é simples"], diagnostico: `Diagnóstico profissional + laudo com opções claras: reparar (custo X), upgrade (custo Y) ou trocar. Custo: R$ 90.`, solucao: `Transparência total. Apresentamos as opções com custos e você decide.`, quandoCompensa: "Equipamento com menos de 5-6 anos, problema único, custo do reparo até 40% do novo.", quandoNaoCompensa: "Equipamento com 7+ anos, múltiplos problemas, reparo custando mais de 50% do novo.", whatsappMessage: "Olá! Quero saber se compensa consertar meu computador. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Quando Não Compensa", to: "/quando-nao-compensa" }, { label: "Custo Reparo vs Novo", to: "/custo-reparo-vs-novo" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }], conteudoExtra: `### Checklist de Decisão\n\n✅ Compensa consertar se:\n- Equipamento tem menos de 5 anos\n- Problema é único e identificável\n- Custo do reparo < 40% do novo\n- Hardware atende suas necessidades\n\n❌ Considere trocar se:\n- Equipamento tem 7+ anos\n- Já teve reparos recentes\n- Precisa de mais performance\n- Custo do reparo > 50% do novo` },

  { slug: "vale-a-pena-consertar-notebook", title: "Vale a Pena Consertar o Notebook? | Guia", metaDescription: "Vale a pena consertar o notebook ou comprar novo? Guia de decisão com dados reais. Curitiba.", h1: "Vale a Pena Consertar o Notebook? — Guia Completo", categoria: "Decisão do Cliente", intro: `Notebooks são mais caros de reparar que desktops (componentes integrados, peças específicas). Mas isso não significa que sempre é melhor comprar novo. O diagnóstico profissional identifica o problema e o custo real do reparo para você poder decidir com informação — não com medo.`, sintomas: [{ titulo: "Problema simples em notebook bom", desc: "Troca de tela, teclado, SSD → quase sempre compensa.", gravidade: "Simples" }, { titulo: "Placa-mãe em notebook caro", desc: "Reparo pode valer se o notebook é recente e de valor.", gravidade: "Médio" }, { titulo: "Múltiplos defeitos em notebook antigo", desc: "Geralmente não compensa.", gravidade: "Complexo" }], causas: [{ titulo: "Peças específicas por modelo", desc: "Telas, teclados e baterias são específicos — preço varia muito.", tipo: "hardware" }, { titulo: "Reparo de placa-mãe", desc: "Mais complexo que desktop por componentes soldados.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Troca de SSD, RAM, teclado, bateria → COMPENSA", tempo: "1 a 3 dias", custo: "R$ 150 a R$ 500" }, { nivel: "Médio", desc: "Troca de tela ou reparo de jack → AVALIAR", tempo: "3 a 7 dias", custo: "R$ 300 a R$ 800" }, { nivel: "Complexo", desc: "Reparo de placa-mãe → DEPENDE DO VALOR DO NOTEBOOK", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 1200" }], riscos: ["Comprar notebook novo barato pode ser pior que reparar o atual"], diagnostico: `Diagnóstico completo com laudo detalhado e opções. Custo: R$ 90.`, solucao: `Transparência: laudo com custo de reparo vs custo de equivalente novo.`, quandoCompensa: "Notebook de menos de 4 anos, com problema específico e custo de reparo razoável.", quandoNaoCompensa: "Notebook de baixo valor (< R$ 2000 novo) com placa-mãe defeituosa.", whatsappMessage: "Olá! Quero saber se compensa consertar meu notebook. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar PC?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }], conteudoExtra: `### Tabela de Decisão para Notebooks\n\n| Valor do Notebook Novo | Custo Máximo de Reparo Recomendado |\n|---|---|\n| Até R$ 2.000 | Até R$ 500 |\n| R$ 2.000 - R$ 4.000 | Até R$ 1.000 |\n| R$ 4.000 - R$ 8.000 | Até R$ 1.500 |\n| Acima de R$ 8.000 | Até R$ 2.500 |` },

  { slug: "quando-trocar-computador", title: "Quando Trocar o Computador? | Guia Técnico", metaDescription: "Quando vale trocar o computador por um novo? Guia técnico honesto. Diagnóstico em Curitiba.", h1: "Quando Trocar o Computador? — Guia Técnico Honesto", categoria: "Decisão do Cliente", intro: `Trocar nem sempre é a resposta. Mas às vezes é a decisão mais racional. Nesta página, explicamos os sinais claros de que chegou a hora de trocar, e quando ainda vale investir em reparo ou upgrade.`, sintomas: [{ titulo: "Sinais de que é hora de trocar", desc: "Múltiplos defeitos, lentidão irrecuperável, incompatibilidade com software atual.", gravidade: "N/A" }, { titulo: "Sinais de que NÃO precisa trocar", desc: "Problema único, upgrade resolve, equipamento atende necessidades.", gravidade: "N/A" }], causas: [{ titulo: "Obsolescência real", desc: "Processador não suporta Windows 11, DDR3 não suporta mais RAM, etc.", tipo: "hardware" }, { titulo: "Obsolescência percebida", desc: "Computador parece velho mas um SSD + RAM resolve.", tipo: "software" }], cenarios: [{ nivel: "Simples", desc: "Upgrade resolve → NÃO precisa trocar", tempo: "N/A", custo: "R$ 300 a R$ 600 de upgrade" }, { nivel: "Médio", desc: "Avaliar: upgrade parcial + uso por mais 2-3 anos", tempo: "N/A", custo: "Variável" }, { nivel: "Complexo", desc: "Hardware defasado + múltiplos problemas → TROCAR", tempo: "N/A", custo: "Investir em novo" }], riscos: ["Trocar prematuramente desperdiça dinheiro", "Não trocar quando deveria desperdiça tempo e produtividade"], diagnostico: `Avaliação completa: vale upgrade ou trocar? Custo: R$ 90 (investimento que pode economizar centenas).`, solucao: `Recomendação honesta baseada em dados técnicos, não em venda.`, quandoCompensa: "Trocar quando o custo total de reparos + upgrades ultrapassa 60% de um novo que atende melhor.", quandoNaoCompensa: "Quando um upgrade de R$ 300-500 resolve o problema e estende a vida útil em 3-4 anos.", whatsappMessage: "Olá! Quero saber se devo trocar meu computador ou reparar. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar PC?", to: "/vale-a-pena-consertar-computador" }, { label: "Custo Reparo vs Novo", to: "/custo-reparo-vs-novo" }], conteudoExtra: `### Os 5 Sinais de Que Chegou a Hora\n\n1. Processador anterior a 2015 (não suporta software atual)\n2. Máximo de RAM suportada é 4GB\n3. Não suporta SSD\n4. Terceiro reparo em 12 meses\n5. Não roda mais os programas que você precisa` },

  { slug: "quando-nao-compensa-reparo", title: "Quando Não Compensa o Reparo? | Guia Transparente", metaDescription: "Quando não compensa reparar? Guia honesto sobre custos, riscos e decisões. Curitiba.", h1: "Quando Não Compensa o Reparo — Transparência Total", categoria: "Decisão do Cliente", intro: `Existem situações em que reparar não é a melhor decisão. Nós fazemos questão de informar quando isso acontece, mesmo que signifique não fechar um serviço. Isso faz parte do nosso compromisso com transparência e honestidade técnica. Nesta página, explicamos os cenários onde substituir é mais inteligente que reparar.`, sintomas: [{ titulo: "Custo do reparo > 50% de novo", desc: "Investimento não se justifica.", gravidade: "N/A" }, { titulo: "Equipamento com 8+ anos", desc: "Mais problemas virão em sequência.", gravidade: "N/A" }], causas: [{ titulo: "Desgaste generalizado", desc: "Vários componentes no fim da vida útil.", tipo: "desgaste" }, { titulo: "Tecnologia obsoleta", desc: "Não recebe mais atualizações ou suporte.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Reparo barato → COMPENSA (mesmo em equipamento antigo)", tempo: "N/A", custo: "Baixo" }, { nivel: "Médio", desc: "Reparo moderado em equipamento médio → AVALIAR", tempo: "N/A", custo: "Moderado" }, { nivel: "Complexo", desc: "Reparo caro em equipamento antigo → NÃO COMPENSA", tempo: "N/A", custo: "Alto" }], riscos: ["Gastar em reparo e ter outro problema em semanas"], diagnostico: `Avaliação transparente. Custo: R$ 90.`, solucao: `Recomendação honesta: reparar ou substituir.`, quandoCompensa: "Reparos baratos sempre compensam. A análise deve ser feita caso a caso.", quandoNaoCompensa: "Múltiplos defeitos em equipamento antigo, custo alto relativo ao valor.", whatsappMessage: "Olá! Quero saber se compensa reparar meu equipamento. Podem avaliar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }], conteudoExtra: `### Nossa Filosofia\n\nPreferimos perder um serviço a realizar um reparo que não vale a pena. Quando diagnosticamos um equipamento e concluímos que não compensa, informamos com transparência e orientamos sobre as melhores opções de compra.` },

  { slug: "custo-reparo-vs-novo", title: "Custo de Reparo vs Computador Novo | Comparação", metaDescription: "Quanto custa reparar vs comprar novo? Comparação real com dados atualizados. Curitiba.", h1: "Custo de Reparo vs Computador Novo — Comparação Real", categoria: "Decisão do Cliente", intro: `Para tomar uma decisão inteligente, você precisa comparar números reais. Nesta página, apresentamos os custos médios de reparos comuns versus o preço de computadores novos equivalentes. Dados atualizados para ajudar na sua decisão.`, sintomas: [{ titulo: "Custo médio de reparos", desc: "Desde R$ 90 (diagnóstico) até R$ 800+ (reparo complexo).", gravidade: "N/A" }], causas: [{ titulo: "Cada caso é diferente", desc: "O diagnóstico define o custo real. Sem diagnóstico, qualquer estimativa é achismo.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Limpeza, formatação, troca de peça simples: R$ 90 a R$ 250", tempo: "1h a 4h", custo: "Até R$ 250" }, { nivel: "Médio", desc: "Upgrade SSD+RAM, troca de tela, fonte: R$ 250 a R$ 600", tempo: "1 dia", custo: "R$ 250 a R$ 600" }, { nivel: "Complexo", desc: "Reparo de placa, recuperação de dados: R$ 400 a R$ 1200+", tempo: "Dias", custo: "R$ 400 a R$ 1200+" }], riscos: ["Comprar barato demais pode gerar mais problemas que o equipamento atual"], diagnostico: `Diagnóstico + laudo comparativo: custo do reparo vs preço de equivalente novo. Custo: R$ 90.`, solucao: `Decisão informada com dados reais.`, quandoCompensa: "Quando o reparo custa até 40% de um equivalente novo.", quandoNaoCompensa: "Quando o reparo ultrapassa 50% e o equipamento é antigo.", whatsappMessage: "Olá! Quero comparar custo de reparo vs comprar novo. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Vale Consertar?", to: "/vale-a-pena-consertar-computador" }, { label: "Quando Trocar", to: "/quando-trocar-computador" }, { label: "Quando Não Compensa", to: "/quando-nao-compensa-reparo" }], conteudoExtra: `### Tabela Comparativa (2024-2025)\n\n| Reparo | Custo Médio | PC Novo Equivalente |\n|---|---|---|\n| Troca de SSD + RAM | R$ 350-500 | R$ 2.500-3.500 |\n| Troca de fonte | R$ 200-350 | R$ 2.500-3.500 |\n| Troca de tela notebook | R$ 300-800 | R$ 3.000-5.000 |\n| Formatação completa | R$ 150-250 | R$ 2.500+ |\n| Reparo placa-mãe | R$ 300-600 | R$ 3.000+ |` },

  // ===== BUSCAS EDUCATIVAS (41-45) =====
  { slug: "o-que-fazer-computador-nao-liga", title: "O Que Fazer Quando o Computador Não Liga?", metaDescription: "Passo a passo: o que fazer quando o computador não liga. Verificações, testes e quando chamar técnico.", h1: "O Que Fazer Quando o Computador Não Liga?", categoria: "Buscas Educativas", intro: `Seu computador não ligou e você não sabe o que fazer? Calma. Antes de chamar o técnico, existem verificações simples que você pode fazer em casa. Neste guia, explicamos o passo a passo desde a verificação básica até o momento de buscar ajuda profissional.`, sintomas: [{ titulo: "Verificações que você pode fazer", desc: "Tomada, cabo, monitor, periféricos.", gravidade: "Simples" }], causas: [{ titulo: "Causa pode ser simples", desc: "Em 20% dos casos, é algo que o próprio usuário resolve.", tipo: "hardware" }, { titulo: "Causa pode ser técnica", desc: "Nos outros 80%, precisa de diagnóstico profissional.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema de cabo, tomada ou configuração.", tempo: "5 min", custo: "R$ 0 (você resolve)" }, { nivel: "Médio", desc: "Componente com problema que precisa de técnico.", tempo: "1h+", custo: "R$ 90+" }, { nivel: "Complexo", desc: "Placa-mãe ou curto que precisa de bancada.", tempo: "Dias", custo: "R$ 200+" }], riscos: ["Tentar abrir sem conhecimento pode piorar"], diagnostico: `Se as verificações básicas não resolveram, diagnóstico profissional é o próximo passo. Custo: R$ 90.`, solucao: `Passo a passo de verificação → diagnóstico → reparo.`, quandoCompensa: "Sempre vale verificar antes de chamar — pode economizar uma visita.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Meu computador não liga e já tentei o básico. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Computador Não Liga", to: "/computador-nao-liga-curitiba" }, { label: "Computador Sem Vídeo", to: "/computador-sem-video-curitiba" }], conteudoExtra: `### Checklist Passo a Passo\n\n1. ✅ Verifique se o cabo de energia está conectado\n2. ✅ Teste outra tomada\n3. ✅ Verifique se o monitor está ligado\n4. ✅ Desconecte todos os USB\n5. ✅ Se notebook: remova bateria e tente só na tomada\n6. ✅ Espere 5 min e tente novamente\n7. ❌ Se nada funcionou → chame o técnico` },

  { slug: "o-que-fazer-notebook-lento", title: "O Que Fazer Com Notebook Lento? | Guia Prático", metaDescription: "Notebook lento? Guia prático com verificações e soluções. Quando otimizar, quando fazer upgrade, quando trocar.", h1: "O Que Fazer Com Notebook Lento? — Guia Prático", categoria: "Buscas Educativas", intro: `Notebook lento atrapalha trabalho, estudo e lazer. Mas antes de sair comprando um novo, existem coisas que você pode verificar e ações simples que podem melhorar a performance. Este guia explica o que fazer, desde verificações básicas até quando é hora de buscar upgrade profissional.`, sintomas: [{ titulo: "Coisas que você pode fazer", desc: "Fechar programas, limpar inicialização, verificar disco.", gravidade: "Simples" }], causas: [{ titulo: "Software (você pode resolver)", desc: "Programas desnecessários, navegador pesado, cache cheio.", tipo: "software" }, { titulo: "Hardware (precisa de técnico)", desc: "HD antigo, pouca RAM, superaquecimento.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Otimização de software pelo próprio usuário.", tempo: "30 min", custo: "R$ 0" }, { nivel: "Médio", desc: "Upgrade profissional (SSD + RAM).", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico + upgrade + limpeza interna.", tempo: "1 dia", custo: "R$ 400 a R$ 800" }], riscos: ["Programas de 'otimização' podem piorar", "Upgrade errado desperdiça dinheiro"], diagnostico: `Se as dicas básicas não resolveram, diagnóstico identifica o gargalo. Custo: R$ 90.`, solucao: `Guia de autoajuda + opções de upgrade profissional.`, quandoCompensa: "Upgrade compensa na maioria dos notebooks com menos de 6 anos.", quandoNaoCompensa: "Notebooks muito antigos onde o gargalo é o processador.", whatsappMessage: "Olá! Meu notebook está lento e já tentei otimizar. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Notebook Lento", to: "/notebook-lento-curitiba" }, { label: "Upgrade SSD", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Dicas Rápidas (Faça Você Mesmo)\n\n1. Ctrl+Shift+Esc → Inicializar → Desative programas desnecessários\n2. Desinstale programas que não usa\n3. Limite as abas do Chrome (cada aba = memória)\n4. Verifique espaço no disco (mínimo 20% livre)\n5. Reinicie o notebook (sério, muita gente só fecha a tampa)` },

  { slug: "o-que-causa-curto-em-placa", title: "O Que Causa Curto em Placa Eletrônica?", metaDescription: "Entenda o que causa curto-circuito em placas eletrônicas. Prevenção, causas e reparo. Curitiba.", h1: "O Que Causa Curto em Placa Eletrônica?", categoria: "Buscas Educativas", intro: `Curto-circuito em placas eletrônicas é um dos problemas mais técnicos que atendemos. Entender como ele acontece ajuda a prevenir e a tomar decisões mais informadas sobre reparo. Neste guia educativo, explicamos as causas, como identificar e como prevenir.`, sintomas: [{ titulo: "Equipamento não liga", desc: "Curto impede fornecimento de energia.", gravidade: "Complexo" }], causas: [{ titulo: "Líquido", desc: "Qualquer líquido condutivo entre trilhas energizadas causa curto instantâneo.", tipo: "erro-humano" }, { titulo: "Poeira metálica", desc: "Ambientes com partículas metálicas (oficinas, indústrias).", tipo: "desgaste" }, { titulo: "Componente que falhou", desc: "Capacitor ou transistor que entrou em curto internamente.", tipo: "hardware" }, { titulo: "Dano mecânico", desc: "Ferramenta que riscou trilha, parafuso que caiu na placa.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Limpeza remove causa do curto.", tempo: "1h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Troca de componente em curto.", tempo: "3 a 5 dias", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Reparo de trilha + troca de componentes.", tempo: "5 a 15 dias", custo: "R$ 400 a R$ 800" }], riscos: ["Curto pode causar dano em cadeia", "Reparo amador piora o problema"], diagnostico: `Localização com multímetro e câmera térmica. Custo: R$ 90-150.`, solucao: `Remoção da causa + troca do componente + teste completo.`, quandoCompensa: "Na maioria dos casos quando o curto é localizado.", quandoNaoCompensa: "Quando causou dano extenso em cadeia.", whatsappMessage: "Olá! Meu equipamento teve curto-circuito. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Curto em Placa", to: "/curto-em-placa-eletronica" }, { label: "Placa-Mãe Queimada", to: "/placa-mae-queimada" }], conteudoExtra: `### Como Prevenir Curtos\n\n1. Use estabilizador ou nobreak\n2. Mantenha o equipamento em local seco e limpo\n3. Evite comer/beber perto do computador\n4. Faça limpeza preventiva anual\n5. Use fonte de qualidade` },

  { slug: "erros-comuns-em-upgrade", title: "Erros Comuns em Upgrade de PC | Evite Problemas", metaDescription: "Os erros mais comuns ao fazer upgrade de PC. Evite problemas com RAM, SSD, GPU. Guia técnico.", h1: "Erros Comuns em Upgrade de PC — Evite Problemas", categoria: "Buscas Educativas", intro: `Upgrades são a forma mais inteligente de melhorar o computador. Mas erros na escolha das peças ou na instalação podem transformar uma melhoria em um problema. Neste guia, listamos os erros mais comuns que vemos em Curitiba e como evitá-los.`, sintomas: [{ titulo: "Computador não liga após upgrade", desc: "Peça incompatível ou mal instalada.", gravidade: "Simples a médio" }], causas: [{ titulo: "Comprar peça errada", desc: "RAM DDR4 para placa DDR3, SSD NVMe para slot SATA.", tipo: "erro-humano" }, { titulo: "Não verificar compatibilidade", desc: "Processador incompatível com placa-mãe, fonte insuficiente para GPU.", tipo: "erro-humano" }, { titulo: "Instalação sem cuidado", desc: "Forçar peças, não usar antiestática, conectar cabos errados.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Troca por peça compatível resolve.", tempo: "1h", custo: "R$ 90 + diferença de peça" }, { nivel: "Médio", desc: "Peça incompatível causou dano leve.", tempo: "1 a 2 dias", custo: "R$ 150 a R$ 300" }, { nivel: "Complexo", desc: "Dano a componentes durante instalação.", tempo: "3 a 7 dias", custo: "R$ 250 a R$ 600" }], riscos: ["Cada erro pode ser mais caro que contratar um técnico desde o início"], diagnostico: `Avaliação do upgrade realizado + correção. Custo: R$ 90.`, solucao: `Identificação do erro + correção + orientação.`, quandoCompensa: "Quase sempre — o erro geralmente é reversível.", quandoNaoCompensa: "Quando causou dano físico irreversível.", whatsappMessage: "Olá! Fiz um upgrade e deu problema. Podem me ajudar a corrigir?", relatedPages: [...RELATED_BASE, { label: "Upgrade Deu Problema", to: "/upgrade-deu-problema" }, { label: "Erro RAM", to: "/erro-ao-instalar-memoria-ram" }, { label: "Upgrade SSD/Memória", to: "/servicos/upgrade-ssd-memoria" }], conteudoExtra: `### Top 5 Erros de Upgrade\n\n1. **RAM errada** — DDR4 em placa DDR3 (não encaixa mas tentam forçar)\n2. **SSD errado** — NVMe em slot M.2 SATA (parece igual mas não é)\n3. **Fonte insuficiente** — GPU nova com fonte antiga que não aguenta\n4. **Sem antiestática** — Descarga queima chips invisíveis\n5. **Sem backup** — Trocar SSD sem migrar dados` },

  { slug: "riscos-de-tentar-consertar", title: "Riscos de Tentar Consertar Sozinho | Guia", metaDescription: "Os riscos de tentar consertar computador, notebook ou TV sozinho. Por que o diagnóstico profissional evita prejuízo.", h1: "Riscos de Tentar Consertar Sozinho — Por Que Evitar", categoria: "Buscas Educativas", intro: `Tutoriais do YouTube fazem parecer simples. Mas consertar equipamentos eletrônicos sem conhecimento técnico real é arriscado — e frequentemente sai mais caro que chamar um profissional desde o início. Nesta página, explicamos os riscos reais com exemplos do nosso dia a dia.`, sintomas: [{ titulo: "Tentou e piorou", desc: "A maioria dos casos que recebemos de 'tentei consertar' viram reparos mais caros.", gravidade: "N/A" }], causas: [{ titulo: "Falta de conhecimento técnico", desc: "YouTube mostra o procedimento mas não ensina diagnóstico.", tipo: "erro-humano" }, { titulo: "Falta de ferramentas adequadas", desc: "Chave errada, falta de antiestática, sem multímetro.", tipo: "erro-humano" }, { titulo: "Diagnóstico errado", desc: "Achar que é a fonte quando é a placa, trocar peça errada.", tipo: "erro-humano" }], cenarios: [{ nivel: "Simples", desc: "Tentou e não piorou — técnico resolve normalmente.", tempo: "Normal", custo: "Normal" }, { nivel: "Médio", desc: "Tentou e causou dano adicional.", tempo: "+1 a 2 dias", custo: "+30-50% do reparo original" }, { nivel: "Complexo", desc: "Tentou e inutilizou o equipamento.", tempo: "N/A", custo: "Perda total" }], riscos: ["Descarga eletrostática queima componentes invisivelmente", "Forçar peças danifica conectores", "Trocar peça errada não resolve e gasta dinheiro", "Perder garantia ao abrir sem autorização", "Choque elétrico (especialmente em TVs e monitores)"], diagnostico: `Deixe o diagnóstico com quem tem conhecimento e ferramentas. Custo: R$ 90 vs custo de uma tentativa errada: R$ centenas.`, solucao: `Diagnóstico profissional primeiro. Sempre.`, quandoCompensa: "Verificações básicas (cabo, tomada, reiniciar) são seguras. Abrir equipamento, não.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Tentei consertar e piorou. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" }, { label: "Quando Não Compensa", to: "/quando-nao-compensa" }], conteudoExtra: `### Casos Reais do Nosso Dia a Dia\n\n- Cliente trocou RAM por achismo → queimou o slot → reparo de placa R$ 400\n- Cliente tentou trocar tela do notebook → rompeu flex → custo dobrou\n- Cliente usou secador no notebook molhado → empurrou líquido para placa → perda total\n- Cliente trocou fonte sem testar → fonte errada queimou placa-mãe\n\nO diagnóstico profissional custa R$ 90. Qualquer uma dessas tentativas custou mais.` },

  // ===== LOCAL + INTENÇÃO (46-50) =====
  { slug: "assistencia-tecnica-urgente-curitiba", title: "Assistência Técnica Urgente em Curitiba | Mesmo Dia", metaDescription: "Precisa de assistência técnica urgente em Curitiba? Atendimento no mesmo dia. Computador, notebook, TV. WhatsApp (41) 99745-2053.", h1: "Assistência Técnica Urgente em Curitiba — Atendimento no Mesmo Dia", categoria: "Local + Intenção", intro: `Situações urgentes acontecem: o computador do trabalho parou, o notebook com o TCC travou, a TV da empresa de eventos não liga antes de um evento. Para esses momentos, oferecemos atendimento prioritário em Curitiba e região metropolitana, com visita técnica no mesmo dia (sujeito à disponibilidade).

Nosso atendimento urgente funciona via WhatsApp — descreva a situação, envie fotos/vídeos se possível, e priorizamos seu caso na agenda do dia. Atendemos computadores, notebooks, TVs, redes e equipamentos eletrônicos.`, sintomas: [{ titulo: "Equipamento parou e você precisa dele AGORA", desc: "Atendimento prioritário via WhatsApp.", gravidade: "Urgente" }], causas: [{ titulo: "Qualquer problema técnico", desc: "Atendemos todos os tipos de problema com prioridade.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema resolvido na visita urgente.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico urgente + reparo no mesmo dia.", tempo: "2h a 4h", custo: "R$ 200 a R$ 500" }, { nivel: "Complexo", desc: "Diagnóstico urgente + equipamento vai para bancada com prioridade.", tempo: "1 a 3 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Não deixe para última hora — quanto antes chamar, melhor"], diagnostico: `Diagnóstico presencial prioritário. Custo: R$ 90 (mesmo do normal).`, solucao: `Atendimento priorizado na agenda do dia. WhatsApp para triagem imediata.`, quandoCompensa: "Quando a urgência justifica — trabalho, estudo, evento.", quandoNaoCompensa: "Para problemas que podem esperar, o agendamento normal tem o mesmo custo.", whatsappMessage: "URGENTE! Preciso de atendimento técnico hoje. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Como Funciona", to: "/como-funciona" }, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }], conteudoExtra: `### Como Funciona o Atendimento Urgente\n\n1. Chame no WhatsApp com "URGENTE"\n2. Descreva o problema + envie fotos\n3. Verificamos disponibilidade imediata\n4. Se possível, técnico vai no mesmo dia\n5. Diagnóstico + solução no local (quando viável)` },

  { slug: "tecnico-informatica-emergencia-curitiba", title: "Técnico Informática Emergência Curitiba | 24h", metaDescription: "Técnico de informática para emergência em Curitiba. Atendimento prioritário, computador, notebook, rede. WhatsApp.", h1: "Técnico de Informática para Emergência em Curitiba", categoria: "Local + Intenção", intro: `Emergências técnicas podem acontecer a qualquer momento: servidor da empresa caiu, computador do caixa parou, notebook com apresentação importante travou. Para esses casos, oferecemos atendimento de emergência com prioridade máxima na agenda.

Importante: nosso atendimento é presencial com deslocamento. O tempo de chegada depende da localização e horário, mas priorizamos emergências na fila de atendimento.`, sintomas: [{ titulo: "Equipamento crítico parou", desc: "Servidores, caixas, equipamentos de produção.", gravidade: "Urgente" }], causas: [{ titulo: "Qualquer falha técnica crítica", desc: "Hardware, software, rede, energia.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Problema resolvido no local.", tempo: "1h a 2h", custo: "R$ 150 a R$ 300" }, { nivel: "Médio", desc: "Reparo no local + configuração.", tempo: "2h a 4h", custo: "R$ 250 a R$ 500" }, { nivel: "Complexo", desc: "Diagnóstico + bancada prioritária.", tempo: "1 a 3 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Tempo parado = perda de receita"], diagnostico: `Diagnóstico prioritário. Custo: R$ 90.`, solucao: `Resolução mais rápida possível com foco em retorno à operação.`, quandoCompensa: "Para empresas e profissionais que dependem do equipamento.", quandoNaoCompensa: "Para problemas não críticos que podem esperar agendamento normal.", whatsappMessage: "EMERGÊNCIA! Equipamento crítico parou. Podem atender hoje?", relatedPages: [...RELATED_BASE, { label: "Suporte Empresas", to: "/suporte-empresas" }, { label: "Atendimento Urgente", to: "/assistencia-tecnica-urgente-curitiba" }], conteudoExtra: `### Para Empresas\n\nOferecemos contratos de suporte contínuo para empresas que não podem parar. Manutenção preventiva + atendimento prioritário quando necessário.` },

  { slug: "conserto-computador-domicilio-curitiba", title: "Conserto de Computador a Domicílio em Curitiba", metaDescription: "Conserto de computador e notebook a domicílio em Curitiba e região. Técnico vai até você. Atendimento no mesmo dia.", h1: "Conserto de Computador a Domicílio em Curitiba", categoria: "Local + Intenção", intro: `Não precisa carregar seu computador até uma loja. Nosso técnico vai até o seu endereço em Curitiba e região metropolitana para diagnosticar e resolver o problema no conforto da sua casa ou escritório.

O atendimento a domicílio funciona para a maioria dos problemas: formatação, limpeza, upgrade, configuração de rede, remoção de vírus e diagnóstico inicial. Para reparos que exigem bancada (placa-mãe, soldagem), fazemos a coleta no local e devolvemos pronto.`, sintomas: [{ titulo: "Qualquer problema de computador/notebook", desc: "Atendimento na sua casa ou empresa.", gravidade: "Variável" }], causas: [{ titulo: "Conveniência + eficiência", desc: "Técnico no seu ambiente vê o contexto completo: rede, energia, uso.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Resolvido na visita (formatação, limpeza, configuração).", tempo: "1h a 3h", custo: "R$ 100 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico + upgrade no local.", tempo: "2h a 4h", custo: "R$ 200 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico no local + coleta para bancada.", tempo: "Variável", custo: "R$ 250+" }], riscos: ["Nenhum — atendimento profissional no seu endereço"], diagnostico: `Diagnóstico presencial no seu endereço. Custo: R$ 90 (incorporado ao serviço se aprovado).`, solucao: `Resolução no local quando possível. Coleta + entrega quando precisa de bancada.`, quandoCompensa: "Sempre — economiza tempo e transporte. Técnico vê o ambiente real.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Preciso de conserto a domicílio em Curitiba. Podem atender?", relatedPages: [...RELATED_BASE, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }, { label: "Coleta e Entrega", to: "/coleta-e-entrega" }], conteudoExtra: `### Regiões de Atendimento a Domicílio\n\nAtendemos toda Curitiba (todos os bairros) e região metropolitana: São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro e Quatro Barras.\n\nO agendamento é feito via WhatsApp com escolha de faixa de horário.` },

  { slug: "manutencao-notebook-curitiba-rapido", title: "Manutenção de Notebook Rápida em Curitiba", metaDescription: "Manutenção de notebook rápida em Curitiba. Limpeza, upgrade SSD, troca de tela, formatação. Atendimento no mesmo dia.", h1: "Manutenção de Notebook Rápida em Curitiba", categoria: "Local + Intenção", intro: `Precisa de manutenção rápida no notebook? Limpeza interna, troca de pasta térmica, upgrade de SSD/RAM, formatação, troca de tela — fazemos a maioria dos serviços de manutenção com rapidez e qualidade em Curitiba.

Nosso diferencial é a transparência: você sabe exatamente o que vai ser feito, quanto custa e quanto tempo leva. Sem surpresas, sem venda de serviço desnecessário.`, sintomas: [{ titulo: "Notebook precisando de manutenção", desc: "Lento, esquentando, bateria fraca, tela quebrada.", gravidade: "Variável" }], causas: [{ titulo: "Manutenção preventiva", desc: "Limpeza + pasta térmica a cada 12-18 meses prolonga a vida útil.", tipo: "desgaste" }, { titulo: "Manutenção corretiva", desc: "Reparo de problema específico identificado.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Limpeza, pasta térmica, otimização de software.", tempo: "1h a 2h", custo: "R$ 120 a R$ 250" }, { nivel: "Médio", desc: "Upgrade SSD + RAM + formatação.", tempo: "2h a 4h", custo: "R$ 300 a R$ 600" }, { nivel: "Complexo", desc: "Troca de tela, reparo de jack, placa-mãe.", tempo: "2 a 7 dias", custo: "R$ 300 a R$ 800+" }], riscos: ["Adiar manutenção preventiva leva a reparos mais caros"], diagnostico: `Diagnóstico rápido para definir o que precisa ser feito. Custo: R$ 90 (incorporado se aprovar serviço).`, solucao: `Manutenção focada e rápida com peças de qualidade.`, quandoCompensa: "Sempre — manutenção preventiva é o melhor investimento.", quandoNaoCompensa: "Quando o notebook é tão antigo que a manutenção é paliativa.", whatsappMessage: "Olá! Preciso de manutenção rápida no notebook. Podem me ajudar?", relatedPages: [...RELATED_BASE, { label: "Notebook Lento", to: "/notebook-lento-curitiba" }, { label: "Notebook Esquentando", to: "/notebook-esquentando-curitiba" }, { label: "Conserto Notebook", to: "/servicos/conserto-pc-notebook" }], conteudoExtra: `### Tabela de Tempos Médios\n\n| Serviço | Tempo Médio |\n|---|---|\n| Limpeza + pasta térmica | 1h a 2h |\n| Upgrade SSD (com clonagem) | 2h a 3h |\n| Formatação completa | 2h a 4h |\n| Troca de tela | 1 a 3 dias |\n| Troca de teclado | 1 a 3 dias |` },

  { slug: "tecnico-computador-perto-de-mim", title: "Técnico de Computador Perto de Mim | Curitiba", metaDescription: "Procurando técnico de computador perto de você em Curitiba? Atendimento a domicílio em todos os bairros. WhatsApp (41) 99745-2053.", h1: "Técnico de Computador Perto de Mim em Curitiba", categoria: "Local + Intenção", intro: `Se você está procurando um técnico de computador perto de você em Curitiba e região metropolitana, você está no lugar certo. Atendemos todos os bairros de Curitiba e as cidades da região metropolitana com visita técnica a domicílio.

Diferente de lojas de informática genéricas, somos técnicos especializados em diagnóstico e reparo. Isso significa que você recebe atendimento de quem realmente entende do problema — não de um vendedor que vai tentar empurrar peças.`, sintomas: [{ titulo: "Precisa de técnico na sua região", desc: "Atendimento a domicílio em toda Curitiba e região.", gravidade: "Variável" }], causas: [{ titulo: "Cobertura ampla", desc: "Todos os bairros de Curitiba + 10 cidades da região metropolitana.", tipo: "hardware" }], cenarios: [{ nivel: "Simples", desc: "Visita técnica + resolução no local.", tempo: "1h a 3h", custo: "R$ 90 a R$ 300" }, { nivel: "Médio", desc: "Diagnóstico + upgrade/reparo no local.", tempo: "2h a 4h", custo: "R$ 200 a R$ 600" }, { nivel: "Complexo", desc: "Diagnóstico + coleta para bancada.", tempo: "Variável", custo: "R$ 250+" }], riscos: ["Cuidado com técnicos sem formação ou experiência comprovada"], diagnostico: `Diagnóstico profissional na sua casa. Custo: R$ 90.`, solucao: `Técnico especializado na sua região com atendimento no mesmo dia.`, quandoCompensa: "Sempre — atendimento domiciliar economiza tempo.", quandoNaoCompensa: "N/A", whatsappMessage: "Olá! Preciso de um técnico de computador na minha região. Podem atender?", relatedPages: [...RELATED_BASE, { label: "Curitiba", to: "/tecnico-informatica-curitiba" }, { label: "Atendimento Domicílio", to: "/atendimento-domicilio" }, { label: "Regiões", to: "/tecnico-informatica-curitiba" }], conteudoExtra: `### Bairros e Cidades Atendidas\n\n**Curitiba**: Centro, Batel, Portão, CIC, Santa Felicidade, Campo Comprido, Água Verde, Bigorrilho, Cajuru, Boa Vista, Boqueirão, Cristo Rei, Hauer, Juvevê, Mercês, Pinheirinho, Rebouças, Seminário, Tarumã, Vila Izabel e todos os demais.\n\n**Região Metropolitana**: São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro, Quatro Barras.` },
];

// Helper to get a page by slug
export const getProblemaPageBySlug = (slug: string): ProblemaPageData | undefined => {
  return problemaPagesData.find(p => p.slug === slug);
};

// Get all slugs for routing
export const getAllProblemaSlugs = (): string[] => {
  return problemaPagesData.map(p => p.slug);
};
