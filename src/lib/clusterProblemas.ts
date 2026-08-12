/**
 * Cluster PROBLEMAS (Etapa 12) — conteúdo autoral por sintoma.
 *
 * Regra do cluster: só entra aqui o problema que tem resposta técnica real,
 * checagem que o visitante consegue fazer sozinho e caminho de atendimento
 * definido. Nada de página gerada trocando equipamento/cidade.
 */

export type ClusterFaq = { q: string; a: string };

export type ClusterProblema = {
  slug: string;
  path: string;
  titulo: string;          // H1
  metaTitle: string;
  metaDescription: string;
  resumo: string;          // parágrafo de abertura
  waMessage: string;
  sintomas: { titulo: string; desc: string }[];
  causas: { titulo: string; desc: string }[];
  antesDeChamar: string[]; // checagens do próprio visitante
  naoFaca: string[];
  modalidades: { titulo: string; desc: string }[];
  faq: ClusterFaq[];
  relacionados: { to: string; titulo: string; desc: string }[];
  foto?: string;           // slug em fotosLicenciadas
};

export const CLUSTER_PROBLEMAS: ClusterProblema[] = [
  {
    slug: "wifi-instavel",
    path: "/problemas/wifi-instavel",
    titulo: "Wi-Fi caindo ou lento em parte da casa ou do escritório",
    metaTitle: "Wi-Fi caindo ou lento: causas e o que checar | O Técnico de Informática",
    metaDescription:
      "Wi-Fi que cai, fica lento em alguns cômodos ou desconecta sozinho quase nunca é problema do plano. Veja as causas reais, o que testar antes e quando chamar técnico.",
    resumo:
      "Na maior parte dos atendimentos de Wi-Fi instável o plano contratado está entregando o que promete — o sinal é que não chega. A investigação separa três coisas diferentes: a internet que entra no imóvel, o equipamento que distribui o sinal e o caminho físico até o aparelho que está reclamando.",
    waMessage:
      "Olá! Vim da página sobre Wi-Fi instável. Meu sinal cai/fica lento e preciso de diagnóstico da rede.",
    sintomas: [
      {
        titulo: "Cai só em alguns cômodos ou andares",
        desc: "Sinal que desaparece em um ponto específico indica atenuação por parede, laje, espelho ou caixa metálica. Nesses casos trocar de plano não muda nada: o problema é cobertura, resolvido com posicionamento, repetidor cabeado ou malha mesh.",
      },
      {
        titulo: "Desconecta sozinho em horários parecidos",
        desc: "Queda com hora marcada costuma ter causa externa: interferência de rede vizinha no mesmo canal, forno micro-ondas, equipamento com temporizador ou reinício automático do roteador da operadora.",
      },
      {
        titulo: "Conecta, mas 'sem internet'",
        desc: "O aparelho enxerga a rede e não navega. Aqui a falha está entre roteador e provedor: DNS, arrendamento de IP, cabo de entrada mal encaixado ou modem em modo incorreto — não na antena do notebook.",
      },
      {
        titulo: "Rápido no celular, lento no computador",
        desc: "Quando um aparelho vai bem e outro não, a rede está saudável e o problema é do dispositivo: driver de rede, adaptador antigo, banda 2.4 GHz saturada ou economia de energia desligando a placa.",
      },
    ],
    causas: [
      {
        titulo: "Roteador em local ruim",
        desc: "Dentro de armário, atrás da TV, no chão ou colado à parede externa. O equipamento distribui sinal em esfera; obstáculo próximo derruba a cobertura inteira.",
      },
      {
        titulo: "Equipamento da operadora fazendo tudo sozinho",
        desc: "Modem/roteador combinado atende bem apartamentos pequenos. Em imóvel grande, com laje ou muitas paredes, ele não dá conta e precisa de um distribuidor adicional — de preferência ligado por cabo.",
      },
      {
        titulo: "Canal e faixa saturados",
        desc: "Em prédio, dezenas de redes disputam os mesmos canais de 2.4 GHz. Reorganizar canal e separar as faixas 2.4/5 GHz costuma devolver estabilidade sem trocar nada.",
      },
      {
        titulo: "Cabeamento e conectores",
        desc: "Cabo de rede prensado por móvel, conector mal crimpado ou emenda improvisada geram queda intermitente que parece 'problema da internet'.",
      },
      {
        titulo: "Repetidor mal configurado",
        desc: "Repetidor colocado onde o sinal já é fraco repete sinal fraco e ainda divide a banda pela metade. É a causa mais comum de rede que piorou depois de uma 'melhoria'.",
      },
    ],
    antesDeChamar: [
      "Teste a velocidade com o aparelho ao lado do roteador e depois no cômodo que reclama — a diferença já indica se é cobertura ou provedor.",
      "Ligue um notebook por cabo no roteador. Se por cabo funciona bem, a internet está chegando e o problema é a distribuição sem fio.",
      "Anote o horário das quedas por dois ou três dias. Padrão de horário muda completamente o diagnóstico.",
      "Verifique se a rede piorou depois de alguma mudança: móvel novo, repetidor, troca de plano, mudança do roteador de lugar.",
    ],
    naoFaca: [
      "Não resete o roteador da operadora sem ter as credenciais de acesso — em algumas conexões a reconfiguração exige suporte do provedor.",
      "Não instale vários repetidores em sequência. Cada salto divide a banda e aumenta a instabilidade.",
      "Não troque de plano antes do diagnóstico: se o gargalo é cobertura, mais megas não chegam ao cômodo.",
    ],
    modalidades: [
      {
        titulo: "Suporte remoto",
        desc: "Ajuste de canal, separação de faixas, DNS, configuração de repetidor e revisão de dispositivos podem ser feitos com acesso remoto, quando ainda existe conexão utilizável.",
      },
      {
        titulo: "Atendimento no endereço",
        desc: "Medição de sinal cômodo a cômodo, teste de cabeamento, reposicionamento e definição de onde realmente vale instalar ponto adicional. É a modalidade indicada quando a queixa é cobertura.",
      },
      {
        titulo: "Projeto de rede para empresa",
        desc: "Escritório com muitos dispositivos, impressora em rede e sistema em nuvem pede segmentação, cabeamento e equipamento adequado — não repetidor doméstico.",
      },
    ],
    faq: [
      {
        q: "Trocar o roteador resolve Wi-Fi que cai?",
        a: "Resolve quando o equipamento é o gargalo — modelo antigo, sem 5 GHz ou com defeito. Não resolve quando o problema é posicionamento, cabo ou interferência. Por isso o diagnóstico vem antes da indicação de compra.",
      },
      {
        q: "Mesh é melhor que repetidor?",
        a: "Em geral sim, porque os pontos trabalham como uma rede só e o aparelho troca de ponto sem cair. Mas mesh também depende de bom posicionamento e, quando possível, de ligação por cabo entre os pontos.",
      },
      {
        q: "Preciso trocar meu plano de internet?",
        a: "Só se o teste com cabo mostrar que a velocidade contratada não está chegando. Se por cabo o resultado é bom, o plano não é o problema.",
      },
      {
        q: "Dá para resolver sem visita?",
        a: "Parte dos casos sim — configuração e ajuste de canal são feitos remotamente. Cobertura, cabeamento e interferência física exigem medição no local.",
      },
      {
        q: "Vocês vendem o equipamento?",
        a: "Indicamos o que atende ao caso e você decide onde comprar. Se preferir, a instalação e a configuração ficam por nossa conta depois que o equipamento chegar.",
      },
    ],
    relacionados: [
      { to: "/servicos/redes-e-wifi", titulo: "Redes e Wi-Fi", desc: "Escopo do serviço de rede, cobertura e configuração." },
      { to: "/empresas", titulo: "Atendimento para empresas", desc: "Rede instável parando o escritório: prioridade e escopo próprios." },
      { to: "/atendimento", titulo: "Solicitar atendimento", desc: "Funil em 4 etapas com estimativa de deslocamento." },
    ],
    foto: "roteador-wifi",
  },
  {
    slug: "tela-azul",
    path: "/problemas/tela-azul",
    titulo: "Tela azul no Windows: o que o erro está dizendo",
    metaTitle: "Tela azul no Windows: causas, o que anotar e como resolver | O Técnico de Informática",
    metaDescription:
      "Tela azul travando o computador? O código do erro aponta a origem: memória, driver, disco ou energia. Veja o que anotar antes de reiniciar e quando o reparo compensa.",
    resumo:
      "Tela azul não é um defeito — é o sistema interrompendo tudo porque encontrou uma falha que não conseguia contornar com segurança. O código exibido e o momento em que ela aparece são as duas informações que direcionam o diagnóstico, e as duas costumam ser perdidas quando o equipamento é reiniciado às pressas.",
    waMessage:
      "Olá! Vim da página sobre tela azul no Windows. Meu computador está travando com tela azul e preciso de diagnóstico.",
    sintomas: [
      {
        titulo: "Tela azul aleatória, sem padrão de uso",
        desc: "Falha que aparece navegando, em repouso ou em jogo aponta para hardware: memória com erro, alimentação instável ou superaquecimento. Software raramente falha de forma tão distribuída.",
      },
      {
        titulo: "Sempre no mesmo programa ou ao conectar um dispositivo",
        desc: "Padrão claro indica driver. Placa de vídeo, adaptador de rede, impressora e periférico USB são os candidatos mais frequentes.",
      },
      {
        titulo: "Depois de atualização do Windows",
        desc: "Atualização que sobrepõe driver antigo por versão incompatível é causa comum. Nesses casos existe caminho de reversão, sem formatação.",
      },
      {
        titulo: "Tela azul e o sistema não volta mais",
        desc: "Quando o equipamento entra em ciclo de reparo automático, a prioridade muda: primeiro preservar os dados, depois recuperar o sistema.",
      },
    ],
    causas: [
      {
        titulo: "Memória RAM com erro",
        desc: "Módulo defeituoso, mal encaixado ou perfil de frequência instável. Teste de memória é uma das primeiras verificações porque explica travamentos aparentemente aleatórios.",
      },
      {
        titulo: "Driver incompatível ou corrompido",
        desc: "Instalação por programas 'atualizadores de driver' e versões genéricas causam boa parte das telas azuis com padrão repetido.",
      },
      {
        titulo: "Disco com setores defeituosos",
        desc: "HD ou SSD com falha de leitura derruba o sistema no meio de uma operação. Aqui o cuidado com backup vem antes de qualquer tentativa de correção.",
      },
      {
        titulo: "Superaquecimento",
        desc: "Temperatura alta em processador ou placa de vídeo provoca desligamento de proteção, às vezes precedido de tela azul.",
      },
      {
        titulo: "Fonte de alimentação instável",
        desc: "Fonte no limite ou com capacitores degradados entrega tensão irregular sob carga — sintoma típico em máquinas que travam apenas em jogo ou renderização.",
      },
    ],
    antesDeChamar: [
      "Fotografe a tela azul inteira, com o código de erro e o nome do arquivo citado. Essa foto encurta o diagnóstico.",
      "Anote o que estava sendo feito no momento e se houve mudança recente: atualização, peça nova, queda de energia.",
      "Se o sistema ainda abre, copie os arquivos importantes para um pendrive ou nuvem antes de qualquer teste.",
      "Observe se o travamento se repete em modo de segurança — quando não repete, a suspeita recai sobre driver ou programa.",
    ],
    naoFaca: [
      "Não instale 'otimizadores' ou atualizadores de driver automáticos: eles costumam trocar o driver certo por um genérico e agravar a falha.",
      "Não formate antes de checar disco e memória. Formatação em disco defeituoso apaga dados e não resolve o defeito.",
      "Não force reinícios seguidos quando aparece reparo automático — cada tentativa pode piorar o estado do sistema de arquivos.",
    ],
    modalidades: [
      {
        titulo: "Suporte remoto",
        desc: "Leitura de log de falha, reversão de driver, correção de atualização e verificação de integridade do sistema, quando o Windows ainda inicia.",
      },
      {
        titulo: "Bancada",
        desc: "Teste de memória, verificação de disco, medição térmica e teste de fonte. É a modalidade indicada quando a suspeita é hardware.",
      },
      {
        titulo: "Prioridade de dados",
        desc: "Se o disco apresentar sinal de falha, a cópia dos dados vem antes de qualquer tentativa de reparo do sistema.",
      },
    ],
    faq: [
      {
        q: "Tela azul significa que o computador vai parar de funcionar?",
        a: "Não necessariamente. Muitos casos são driver ou atualização e se resolvem sem troca de peça. O que define é o diagnóstico: memória, disco, temperatura e alimentação são verificados antes de qualquer conclusão.",
      },
      {
        q: "Formatar resolve tela azul?",
        a: "Só quando a origem é o sistema. Se a causa for memória, disco ou fonte, a tela azul volta depois da formatação — e os dados já terão sido perdidos.",
      },
      {
        q: "Perco meus arquivos no reparo?",
        a: "O procedimento padrão preserva os dados. Quando o disco apresenta falha física, a cópia é feita primeiro e o risco real é informado antes de qualquer intervenção — sem promessa de recuperação total.",
      },
      {
        q: "O código do erro é mesmo importante?",
        a: "É o melhor atalho que existe. Códigos ligados a memória, disco e driver direcionam o teste inicial e reduzem o tempo de bancada.",
      },
      {
        q: "Dá para fazer o diagnóstico remotamente?",
        a: "Quando o Windows inicia, sim: log, driver e integridade são verificados remotamente. Teste de memória e de fonte exige o equipamento em bancada.",
      },
    ],
    relacionados: [
      { to: "/problemas/computador-lento", titulo: "Computador lento", desc: "Quando o sintoma é lentidão e não travamento." },
      { to: "/servicos/formatacao", titulo: "Formatação e sistema", desc: "Reinstalação com preservação de dados e drivers corretos." },
      { to: "/atendimento", titulo: "Solicitar atendimento", desc: "Descreva o erro e receba a modalidade indicada." },
    ],
    foto: "placa-eletronica",
  },
  {
    slug: "arquivos-apagados",
    path: "/problemas/arquivos-apagados",
    titulo: "Arquivos apagados ou disco que não abre: o que fazer agora",
    metaTitle: "Arquivos apagados ou HD que não abre: primeiros passos | O Técnico de Informática",
    metaDescription:
      "Apagou arquivos, formatou por engano ou o HD parou de abrir? O que você faz na primeira hora define a chance de recuperação. Veja o que evitar e como funciona a avaliação.",
    resumo:
      "Em recuperação de dados, o maior inimigo é a tentativa apressada. Arquivo apagado normalmente continua no disco até ser sobrescrito — e cada programa instalado, cada cópia nova e cada tentativa de reparo automático aumenta a chance de sobrescrever exatamente o que você quer de volta. Nenhum profissional sério promete recuperação total antes da avaliação.",
    waMessage:
      "Olá! Vim da página sobre arquivos apagados. Preciso de avaliação para tentar recuperar dados.",
    sintomas: [
      {
        titulo: "Apaguei e esvaziei a lixeira",
        desc: "Cenário com boa chance quando o equipamento é desligado logo. O sistema apenas marcou o espaço como livre; o conteúdo permanece até algo gravar por cima.",
      },
      {
        titulo: "Formatei o disco ou o pendrive por engano",
        desc: "Formatação rápida não zera os dados. A estrutura de índice é refeita, mas os blocos continuam lá — desde que nada novo seja gravado.",
      },
      {
        titulo: "O disco pede para ser formatado ao conectar",
        desc: "Sinal de estrutura de arquivos corrompida. Aceitar a formatação é o erro mais caro dessa situação.",
      },
      {
        titulo: "HD externo fazendo barulho de clique",
        desc: "Ruído repetitivo indica problema mecânico. Aqui cada nova ligação pode danificar mais a superfície: o correto é desligar e não insistir.",
      },
    ],
    causas: [
      {
        titulo: "Exclusão acidental",
        desc: "Inclui limpeza de pastas, sincronização de nuvem que replicou a exclusão e programa que removeu arquivos temporários com dados dentro.",
      },
      {
        titulo: "Corrupção lógica",
        desc: "Queda de energia durante gravação, remoção do pendrive sem ejetar e falha de atualização deixam a tabela de arquivos inconsistente.",
      },
      {
        titulo: "Falha física do disco",
        desc: "Setores defeituosos, placa eletrônica danificada ou problema mecânico. Este cenário sai do software e exige avaliação específica, com limites claros.",
      },
      {
        titulo: "Ransomware",
        desc: "Arquivos criptografados por invasão não são 'recuperáveis' por programa comum. O caminho passa por isolar a máquina, avaliar backup e conter o incidente.",
      },
    ],
    antesDeChamar: [
      "Pare de usar o equipamento ou o disco imediatamente. Não instale nada nele — nem o programa de recuperação.",
      "Se for disco externo ou pendrive, desconecte e guarde. Reconectar várias vezes piora casos mecânicos.",
      "Liste o que precisa voltar: pastas, período, tipos de arquivo. Isso orienta a busca e a validação do resultado.",
      "Verifique se existe cópia esquecida: nuvem, e-mail, celular, HD antigo. Boa parte dos casos se resolve antes de qualquer laboratório.",
    ],
    naoFaca: [
      "Não aceite a formatação sugerida pelo sistema quando o disco 'pede para formatar'.",
      "Não rode utilitários de correção de disco no volume afetado — eles reorganizam a estrutura e podem eliminar o que ainda seria recuperável.",
      "Não abra o disco rígido. Ambiente doméstico contamina os pratos e encerra a chance de recuperação mecânica.",
      "Não grave nada novo no dispositivo, nem os próprios arquivos recuperados.",
    ],
    modalidades: [
      {
        titulo: "Avaliação técnica",
        desc: "Identificação do tipo de perda (lógica ou física), estado do dispositivo e estimativa realista de chance. A avaliação vem antes de qualquer orçamento de recuperação.",
      },
      {
        titulo: "Recuperação lógica",
        desc: "Exclusão, formatação e corrupção de estrutura, trabalhando sempre sobre cópia do dispositivo, nunca no original.",
      },
      {
        titulo: "Encaminhamento especializado",
        desc: "Casos mecânicos ou que exigem sala limpa são encaminhados com transparência sobre custo e limites, sem prometer resultado.",
      },
    ],
    faq: [
      {
        q: "Vocês garantem que os arquivos voltam?",
        a: "Não. Nenhuma avaliação séria garante recuperação antes de examinar o dispositivo. O que informamos é o cenário encontrado, a chance estimada e o custo — para você decidir com clareza.",
      },
      {
        q: "Quanto custa recuperar dados?",
        a: "Depende do tipo de falha. Casos lógicos têm custo previsível; casos físicos dependem de peça, tempo e encaminhamento. O valor é apresentado depois da avaliação e antes de qualquer execução.",
      },
      {
        q: "Programas de recuperação que baixo na internet funcionam?",
        a: "Às vezes, em exclusão simples. O risco é instalar o programa no mesmo disco e sobrescrever justamente os arquivos que você quer. Se os dados forem importantes, não é o primeiro passo indicado.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Varredura lógica costuma levar de horas a alguns dias, conforme o tamanho do disco. Casos físicos dependem de avaliação e de peça compatível.",
      },
      {
        q: "Depois de recuperar, como evitar de novo?",
        a: "Backup em duas frentes: uma cópia local e uma em nuvem, com verificação periódica. Configuramos a rotina junto com a entrega, se você quiser.",
      },
    ],
    relacionados: [
      { to: "/servicos/recuperacao-de-dados", titulo: "Recuperação de dados", desc: "Escopo, limites e como funciona a avaliação." },
      { to: "/servicos/backup-para-empresas", titulo: "Backup", desc: "Rotina de cópia para não repetir o problema." },
      { to: "/atendimento", titulo: "Solicitar avaliação", desc: "Descreva o que aconteceu e receba a orientação inicial." },
    ],
    foto: "bancada-tecnica",
  },
  {
    slug: "computador-desliga-sozinho",
    path: "/problemas/computador-desliga-sozinho",
    titulo: "Computador desligando sozinho ou reiniciando do nada",
    metaTitle: "Computador desliga sozinho: causas e o que checar | O Técnico de Informática",
    metaDescription:
      "Desligamento súbito quase sempre é temperatura, fonte ou alimentação — raramente vírus. Veja como identificar a causa, o que testar antes e quando parar de usar.",
    resumo:
      "Desligamento sem aviso, sem tela azul e sem mensagem é um comportamento de proteção: alguma coisa cortou a energia ou o processador atingiu o limite térmico e o equipamento se desligou para não queimar. Por isso o diagnóstico começa por temperatura e alimentação, não por formatação.",
    waMessage:
      "Olá! Vim da página sobre computador que desliga sozinho. Preciso de diagnóstico de temperatura/fonte.",
    sintomas: [
      {
        titulo: "Desliga depois de alguns minutos de uso pesado",
        desc: "Jogo, edição de vídeo ou videochamada elevam a carga e a temperatura. Se o desligamento acontece justamente nesses momentos e o equipamento volta a ligar depois de esfriar, o padrão é térmico: dissipador entupido, ventoinha parada ou pasta térmica ressecada.",
      },
      {
        titulo: "Desliga a qualquer momento, mesmo parado",
        desc: "Corte sem relação com carga aponta para alimentação: fonte com capacitor no fim da vida, cabo de força folgado, régua sobrecarregada ou oscilação na tomada. Nesses casos o equipamento apaga de forma seca, como se tirassem o plugue.",
      },
      {
        titulo: "Reinicia sozinho e volta na tela de boas-vindas",
        desc: "Reinício imediato, sem apagar de vez, costuma ser driver, atualização mal aplicada ou memória instável. É o único cenário desta lista em que o software entra como suspeito principal.",
      },
      {
        titulo: "Não volta a ligar logo em seguida",
        desc: "Quando o botão não responde por alguns minutos, a proteção da fonte foi acionada. Insistir em ligar repetidamente nessa condição é o caminho mais rápido para danificar placa-mãe e disco.",
      },
    ],
    causas: [
      {
        titulo: "Superaquecimento por sujeira ou pasta térmica vencida",
        desc: "Poeira compactada entre as aletas do dissipador reduz a troca de calor e a pasta térmica perde eficiência com o tempo. O processador chega ao limite e o desligamento é a última defesa antes do dano permanente.",
      },
      {
        titulo: "Fonte de alimentação degradada ou subdimensionada",
        desc: "Fonte que entrega tensão instável sob carga derruba a máquina sem registrar erro nenhum no sistema. Verificamos tensão sob carga real, não apenas se a fonte 'liga'.",
      },
      {
        titulo: "Energia elétrica do ambiente",
        desc: "Régua com muitos aparelhos, tomada sem aterramento e queda breve de rede provocam desligamentos que parecem defeito do computador. Um teste simples em outro ponto de energia separa as hipóteses.",
      },
      {
        titulo: "Memória ou placa-mãe com falha intermitente",
        desc: "Módulo de memória com contato oxidado ou capacitor estufado gera instabilidade que só aparece depois de aquecer. Diagnóstico com teste de memória e inspeção visual da placa.",
      },
    ],
    antesDeChamar: [
      "Anote se o desligamento acontece sempre em atividade pesada ou também com a máquina ociosa — essa distinção já separa causa térmica de causa elétrica.",
      "Confira se as ventoinhas giram e se sai ar quente pela traseira; ruído alto e constante é sinal de esforço térmico.",
      "Teste em outra tomada, sem régua e sem extensão, para descartar a instalação elétrica.",
      "Verifique se o gabinete está encostado na parede ou dentro de nicho fechado, sem espaço para o ar sair.",
      "Se houver cheiro de queimado ou estalo, não ligue de novo: desligue da tomada e trate como caso de bancada.",
    ],
    naoFaca: [
      "Não insista em apertar o botão de ligar várias vezes seguidas quando a máquina não responde.",
      "Não formate: desligamento por temperatura ou fonte volta igual depois da formatação, e os dados já terão ido embora.",
      "Não use ar comprimido segurando as ventoinhas soltas — girar acima da rotação nominal danifica o rolamento.",
      "Não substitua a fonte por outra genérica sem conferir potência e conectores; fonte errada leva placa-mãe junto.",
    ],
    modalidades: [
      {
        titulo: "Triagem remota",
        desc: "Leitura de temperatura, histórico de eventos e comportamento sob carga por acesso remoto — útil para confirmar o padrão antes de deslocar alguém.",
      },
      {
        titulo: "Visita técnica",
        desc: "Limpeza interna, troca de pasta térmica e medição de tensão no local, quando o equipamento não pode sair do ambiente.",
      },
      {
        titulo: "Bancada",
        desc: "Teste de fonte sob carga, teste de memória prolongado e inspeção de placa — necessário quando a falha é intermitente e precisa de horas de observação.",
      },
    ],
    faq: [
      {
        q: "Computador que desliga sozinho é vírus?",
        a: "Quase nunca. Vírus costuma deixar o sistema lento, exibir anúncios ou travar programas — não cortar a energia da máquina. Desligamento seco é sinal físico: temperatura, fonte ou alimentação.",
      },
      {
        q: "Só limpar por dentro resolve?",
        a: "Resolve quando a causa é térmica e o dissipador está entupido. Se a fonte estiver degradada ou a memória instável, a limpeza melhora por alguns dias e o problema volta.",
      },
      {
        q: "Posso continuar usando até resolver?",
        a: "Se o desligamento é térmico e esporádico, o risco é moderado. Se acontece durante gravação de arquivos, o risco de corromper dados é real — a orientação é fazer cópia dos arquivos importantes antes de qualquer coisa.",
      },
      {
        q: "Como vocês descobrem se é a fonte?",
        a: "Medindo tensão sob carga real e, quando possível, substituindo por uma fonte de teste compatível. Fonte que 'liga' não significa fonte saudável: o defeito aparece justamente quando o consumo sobe.",
      },
      {
        q: "Notebook também desliga sozinho por temperatura?",
        a: "Sim, e com mais frequência que desktop, porque o espaço interno é menor. Em notebook a limpeza envolve desmontagem parcial e troca de pasta térmica — procedimento de bancada, não de mesa do cliente.",
      },
    ],
    relacionados: [
      { to: "/servicos/computador-nao-liga", titulo: "Computador não liga", desc: "Quando o desligamento evolui para máquina que não dá sinal nenhum." },
      { to: "/servicos/manutencao-de-notebook", titulo: "Manutenção preventiva", desc: "Limpeza interna, troca de pasta térmica e revisão de refrigeração." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "bancada-tecnica",
  },
  {
    slug: "notebook-nao-carrega",
    path: "/problemas/notebook-nao-carrega",
    titulo: "Notebook conectado na tomada e a bateria não carrega",
    metaTitle: "Notebook não carrega: causas e o que testar | O Técnico de Informática",
    metaDescription:
      "Notebook ligado na tomada que não carrega pode ser fonte, conector, bateria ou placa. Veja como identificar cada caso, o que testar sozinho e o que evita gasto errado.",
    resumo:
      "“Conectada, não carregando” é uma mensagem que aparece em quatro cenários bem diferentes: carregador entregando tensão errada, conector de energia com mau contato, bateria no fim da vida útil ou circuito de carga da placa-mãe com falha. Cada um tem custo e solução distintos — e trocar a bateria por palpite é o erro mais comum.",
    waMessage:
      "Olá! Vim da página sobre notebook que não carrega. A bateria não sobe mesmo na tomada e preciso de diagnóstico.",
    sintomas: [
      {
        titulo: "Fica em 0% e desliga ao tirar da tomada",
        desc: "O notebook funciona ligado na energia mas apaga instantaneamente sem ela. A bateria não está recebendo carga nenhuma — pode ser célula morta, conector interno solto ou circuito de carga inativo.",
      },
      {
        titulo: "Trava em uma porcentagem e não sobe",
        desc: "Parar em 40%, 60% ou 80% e não avançar costuma indicar célula desequilibrada ou política de carga do fabricante. Nem sempre é defeito: alguns modelos limitam a carga por configuração de saúde da bateria.",
      },
      {
        titulo: "Carrega só em certas posições do cabo",
        desc: "Se mexer no plugue faz o LED piscar ou a carga voltar, o problema é físico: cabo rompido junto ao conector ou jack de energia com solda trincada na placa.",
      },
      {
        titulo: "Descarrega mesmo ligado na tomada",
        desc: "Carregador com potência abaixo do exigido alimenta o consumo básico, mas não dá conta do uso pesado. Comum quando o carregador original foi substituído por um genérico.",
      },
    ],
    causas: [
      {
        titulo: "Carregador com defeito ou incompatível",
        desc: "Fonte com tensão correta mas corrente insuficiente, cabo rompido internamente ou conector USB-C que não negocia a potência certa. É a primeira hipótese porque é a mais barata de confirmar.",
      },
      {
        titulo: "Jack de energia com mau contato",
        desc: "O conector onde o carregador entra sofre esforço mecânico e a solda trinca com o tempo. O reparo é ressolda ou troca do jack — serviço de bancada com microssolda, não troca de peça inteira.",
      },
      {
        titulo: "Bateria no fim da vida útil",
        desc: "Bateria é peça de consumo: perde capacidade por ciclos e por idade. Verificamos capacidade real e contagem de ciclos antes de indicar troca, para você não pagar por uma peça que não é o problema.",
      },
      {
        titulo: "Circuito de carga da placa-mãe",
        desc: "Quando carregador e bateria estão bons e a carga não acontece, a falha está no controlador de carga da placa. É o cenário mais caro e o que mais exige diagnóstico honesto antes do orçamento.",
      },
    ],
    antesDeChamar: [
      "Teste com outro carregador do mesmo modelo e potência, se conseguir emprestado — isso elimina ou confirma a hipótese mais comum de uma vez.",
      "Confira a etiqueta do carregador e compare tensão e amperagem com o que o fabricante do notebook exige.",
      "Observe se o LED de carga acende, pisca ou fica apagado, e anote o comportamento para relatar no atendimento.",
      "Veja no próprio Windows o relatório de bateria (powercfg /batteryreport) e compare capacidade projetada com capacidade original.",
      "Se o notebook esquentar de forma anormal na região do conector, pare de usar e trate como caso de bancada.",
    ],
    naoFaca: [
      "Não compre bateria antes do diagnóstico: em boa parte dos casos a bateria está boa e o defeito é carregador ou jack.",
      "Não use carregador universal genérico de forma permanente — tensão aproximada danifica o circuito de carga.",
      "Não force o plugue nem improvise apoio para 'segurar o contato': isso agrava a trinca na solda da placa.",
      "Não perfure, dobre nem descarte a bateria no lixo comum; bateria estufada precisa de manuseio e descarte adequados.",
    ],
    modalidades: [
      {
        titulo: "Triagem remota",
        desc: "Leitura do relatório de bateria, ciclos e capacidade real por acesso remoto — separa desgaste natural de defeito antes de qualquer deslocamento.",
      },
      {
        titulo: "Visita técnica",
        desc: "Teste com carregador de referência e verificação do conector no local, quando o equipamento não pode sair.",
      },
      {
        titulo: "Bancada",
        desc: "Ressolda ou troca do jack de energia, medição no circuito de carga e substituição de bateria com peça compatível.",
      },
    ],
    faq: [
      {
        q: "Trocar a bateria resolve notebook que não carrega?",
        a: "Só quando a bateria é a causa. Carregador defeituoso, jack trincado e circuito de carga da placa produzem exatamente o mesmo sintoma — por isso o diagnóstico vem antes da compra da peça.",
      },
      {
        q: "Posso usar o notebook sem bateria, direto na tomada?",
        a: "Na maioria dos modelos sim, mas você fica exposto a qualquer oscilação de energia: uma queda breve desliga a máquina e pode corromper arquivos abertos.",
      },
      {
        q: "Bateria parada em 80% é defeito?",
        a: "Nem sempre. Vários fabricantes limitam a carga para prolongar a vida útil da bateria, e isso é configurável. Conferimos a configuração antes de tratar como falha.",
      },
      {
        q: "Bateria estufada é perigosa?",
        a: "Sim. Estufamento indica degradação química e risco de vazamento ou incêndio. A orientação é parar de usar, não perfurar e encaminhar para troca e descarte correto.",
      },
      {
        q: "Vocês vendem a bateria?",
        a: "Indicamos a peça compatível com o seu modelo e você decide onde comprar; se preferir, cuidamos da aquisição e da troca. Peça e mão de obra são informadas separadamente antes da aprovação.",
      },
    ],
    relacionados: [
      { to: "/servicos/manutencao-de-notebook", titulo: "Manutenção de notebook", desc: "Escopo de bancada, troca de componentes e revisão elétrica." },
      { to: "/servicos/conserto-placa", titulo: "Conserto de placa", desc: "Quando a falha está no circuito de carga da placa-mãe." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "placa-eletronica",
  },
  {
    slug: "hd-fazendo-barulho",
    path: "/problemas/hd-fazendo-barulho",
    titulo: "HD fazendo barulho: clique, estalo ou zumbido no disco",
    metaTitle: "HD fazendo barulho: clique, estalo e risco de perder dados | O Técnico de Informática",
    metaDescription:
      "Clique repetido, estalo ou zumbido vindo do HD é sinal mecânico e urgente. Entenda cada ruído, o que fazer imediatamente e o que destrói a chance de recuperar os arquivos.",
    resumo:
      "Ruído novo vindo do disco rígido é o único sintoma de informática que muda a ordem das prioridades: antes de qualquer reparo vem a cópia dos dados. HD é peça mecânica com pratos girando e um braço de leitura a micrômetros da superfície — quando esse conjunto começa a fazer barulho, cada minuto ligado pode transformar um arquivo recuperável em perda definitiva.",
    waMessage:
      "Olá! Vim da página sobre HD fazendo barulho. Meu disco está com ruído e preciso de orientação urgente sobre os dados.",
    sintomas: [
      {
        titulo: "Clique repetido em intervalo regular",
        desc: "O famoso 'click of death': o braço de leitura tenta encontrar a trilha, falha e recalibra em ciclo. É o ruído mais grave da lista e costuma significar cabeça de leitura ou motor comprometidos. Desligue o equipamento.",
      },
      {
        titulo: "Estalo seco seguido de travamento",
        desc: "O sistema congela por alguns segundos junto com o estalo e depois volta. Indica setores defeituosos e tentativas de releitura. O disco ainda entrega dados — é a janela para copiar tudo, não para formatar.",
      },
      {
        titulo: "Zumbido ou vibração contínua",
        desc: "Rolamento desgastado ou disco mal fixado no gabinete. Sozinho é o ruído menos alarmante, mas vibração constante acelera o desgaste mecânico e costuma preceder falhas de leitura.",
      },
      {
        titulo: "Chiado agudo ou raspagem",
        desc: "Som metálico de raspagem sugere contato da cabeça com o prato. Nesse cenário cada segundo ligado remove material da superfície magnética e reduz a chance de recuperação em sala limpa.",
      },
    ],
    causas: [
      {
        titulo: "Desgaste natural das partes móveis",
        desc: "HD tem vida útil mecânica. Depois de alguns anos ligado diariamente, rolamento e atuador acumulam desgaste — o ruído é o aviso antecipado da falha, não a falha em si.",
      },
      {
        titulo: "Queda ou impacto com o disco em rotação",
        desc: "Notebook que caiu ligado, gabinete derrubado ou transporte sem desligar. O impacto desalinha o braço de leitura e produz clique imediato ou intermitente.",
      },
      {
        titulo: "Setores defeituosos crescendo",
        desc: "A eletrônica remapeia setores ruins até acabar a reserva. Quando essa reserva se esgota, o disco passa a insistir na leitura e o estalo aparece junto com travamentos do sistema.",
      },
      {
        titulo: "Alimentação instável",
        desc: "Fonte degradada ou cabo de energia com mau contato faz o motor perder rotação e reiniciar. O ruído cíclico, nesse caso, é consequência da alimentação e não do disco — algo que só a medição sob carga separa.",
      },
      {
        titulo: "Superaquecimento",
        desc: "Disco sem ventilação, prensado em gaveta fechada ou em gabinete cheio de poeira, trabalha acima da temperatura de projeto e antecipa o desgaste mecânico.",
      },
    ],
    antesDeChamar: [
      "Desligue o equipamento se o ruído for clique repetido ou raspagem: manter ligado só reduz a chance de recuperar os arquivos.",
      "Se o sistema ainda abre e o ruído é ocasional, copie primeiro os arquivos insubstituíveis para um HD externo ou nuvem — documentos e fotos antes de programas.",
      "Confirme de onde vem o som: cooler com pá empenada e fonte com rolamento gasto também fazem barulho e são muito mais baratos de resolver.",
      "Anote se o ruído começou depois de queda, mudança de lugar, queda de energia ou instalação de peça nova.",
      "Não conte com o backup automático sem verificar: sincronização de nuvem replica exclusão e corrupção, então confira se os arquivos realmente estão lá.",
    ],
    naoFaca: [
      "Não rode utilitário de correção de disco (chkdsk, scan de superfície) em HD com ruído mecânico: a varredura força milhares de leituras justamente onde o disco está frágil.",
      "Não abra o disco, não congele e não bata no equipamento — o interior é montado em sala limpa e qualquer partícula risca o prato.",
      "Não formate nem reinstale o sistema esperando que o ruído pare: formatação não conserta defeito mecânico e apaga referências que ajudariam a recuperação.",
      "Não ligue e desligue várias vezes para 'testar se voltou'. Cada partida é o momento de maior esforço mecânico.",
    ],
    modalidades: [
      {
        titulo: "Orientação remota imediata",
        desc: "Antes de mover o equipamento, orientamos por WhatsApp o que desligar e o que copiar primeiro. Essa conversa costuma valer mais que qualquer procedimento posterior.",
      },
      {
        titulo: "Bancada com clonagem antes de tudo",
        desc: "O procedimento correto é gerar uma imagem setor a setor do disco em outro dispositivo e trabalhar sobre a cópia. Só depois avaliamos reparo lógico, troca por SSD e reinstalação.",
      },
      {
        titulo: "Encaminhamento para sala limpa",
        desc: "Quando o dano é físico na cabeça ou no prato, o caso exige laboratório especializado. Informamos isso com clareza em vez de tentar procedimento que reduza a chance de sucesso.",
      },
    ],
    faq: [
      {
        q: "HD fazendo clique tem conserto?",
        a: "O disco em si raramente volta a ser confiável — o objetivo passa a ser recuperar os dados, não salvar a peça. Depois da cópia, a recomendação é substituir por um SSD e aposentar o disco com ruído.",
      },
      {
        q: "Dá tempo de copiar os arquivos?",
        a: "Depende do ruído. Estalo ocasional com sistema ainda funcional geralmente permite clonagem completa. Clique repetido significa que o disco já não encontra as trilhas, e cada tentativa reduz a janela.",
      },
      {
        q: "Congelar o HD funciona?",
        a: "Não. É um mito antigo que causa condensação dentro do disco e destrói o que ainda restava. Nenhum laboratório sério usa esse procedimento.",
      },
      {
        q: "SSD também faz barulho?",
        a: "Não, porque não tem partes móveis. Se o ruído aparece em uma máquina só com SSD, a fonte é outra: cooler, fonte de alimentação ou drive óptico.",
      },
      {
        q: "Quanto custa recuperar os dados?",
        a: "Depende do tipo de dano. Clonagem e recuperação lógica em bancada têm um custo; caso físico em sala limpa é outro patamar e é orçado à parte. Diagnóstico, mão de obra e peça são informados separadamente e nada é executado sem aprovação.",
      },
    ],
    relacionados: [
      { to: "/problemas/arquivos-apagados", titulo: "Arquivos apagados ou HD que não abre", desc: "Quando o disco não faz ruído, mas os arquivos sumiram ou a unidade não monta." },
      { to: "/solucoes/backup", titulo: "Backup e cópia de segurança", desc: "Como montar a rotina que evita o próximo susto." },
      { to: "/solucoes/ssd", titulo: "Troca por SSD", desc: "Substituição do disco mecânico com migração do sistema e dos arquivos." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "bancada-tecnica",
  },
  {
    slug: "notebook-molhado",
    path: "/problemas/notebook-molhado",
    titulo: "Notebook molhado: o que fazer nos primeiros minutos",
    metaTitle: "Notebook molhado com água ou café: o que fazer agora | O Técnico de Informática",
    metaDescription:
      "Derramou líquido no notebook? Os primeiros minutos decidem o custo do reparo. Veja o que desligar, o que nunca fazer (arroz e secador) e quando o caso é de bancada.",
    resumo:
      "Líquido derramado é o acidente em que a reação do usuário pesa mais que o próprio derramamento. O dano imediato costuma ser pequeno: o que destrói a placa é a corrosão que avança nas horas seguintes e o curto provocado por quem religa o equipamento para 'ver se funciona'. Água, café com açúcar, refrigerante e cerveja produzem estragos bem diferentes.",
    waMessage:
      "Olá! Vim da página sobre notebook molhado. Derramei líquido no equipamento e preciso de orientação urgente.",
    sintomas: [
      {
        titulo: "Desligou na hora e não liga mais",
        desc: "Proteção elétrica atuando ou curto já estabelecido. Não insista em ligar: com líquido presente entre trilhas, cada tentativa aumenta a área danificada da placa.",
      },
      {
        titulo: "Continua funcionando normalmente",
        desc: "O cenário mais enganoso. Funcionar hoje não significa que passou: a corrosão dos contatos evolui por dias e a falha aparece depois, quando já não se associa ao acidente.",
      },
      {
        titulo: "Teclas travadas, repetindo ou digitando sozinhas",
        desc: "Líquido açucarado sob as membranas do teclado. Muitas vezes se resolve com limpeza ou troca da peça do teclado, sem envolver a placa-mãe.",
      },
      {
        titulo: "Liga, mas com comportamento estranho",
        desc: "Áudio mudo, touchpad errático, portas USB que não respondem ou carga instável indicam trilhas afetadas em pontos específicos — mapeáveis em bancada.",
      },
      {
        titulo: "Manchas ou cheiro depois de dias",
        desc: "Marcas esverdeadas nos contatos e cheiro adocicado indicam corrosão em andamento. Ainda é tratável, mas o tempo joga contra.",
      },
    ],
    causas: [
      {
        titulo: "Curto entre trilhas energizadas",
        desc: "Líquido conduz. Com a bateria conectada, há tensão na placa mesmo com o notebook desligado pelo botão — por isso desligar a energia é a primeira medida real.",
      },
      {
        titulo: "Corrosão eletroquímica",
        desc: "Resíduo de café, refrigerante ou suco ataca solda e cobre por dias. Um equipamento que 'sobreviveu' pode falhar duas semanas depois pela mesma causa.",
      },
      {
        titulo: "Açúcar e ácido do líquido",
        desc: "Água limpa é o melhor cenário. Refrigerante, café com açúcar e cerveja deixam resíduo pegajoso e condutivo que exige limpeza química, não apenas secagem.",
      },
      {
        titulo: "Secagem improvisada",
        desc: "Secador aquece componentes e empurra líquido para regiões ainda secas; arroz não remove umidade interna e ainda deposita amido e pó dentro do equipamento.",
      },
    ],
    antesDeChamar: [
      "Desligue segurando o botão de energia e retire o carregador imediatamente — nada de desligar pelo menu.",
      "Se o modelo permitir, remova a bateria. Em bateria interna, não improvise: o objetivo é apenas não religar o equipamento.",
      "Vire o notebook com a tela entreaberta em formato de tenda para o líquido escorrer para fora, sobre uma toalha.",
      "Retire pen drives, cartão e periféricos e seque o excesso externo com pano macio, sem esfregar o teclado.",
      "Anote o que derramou, a quantidade aproximada e o horário: água, café e refrigerante mudam o procedimento de limpeza.",
      "Leve para bancada o quanto antes. Em líquido açucarado, o intervalo útil se mede em horas, não em dias.",
    ],
    naoFaca: [
      "Não ligue para testar. É a atitude que mais transforma limpeza em troca de placa.",
      "Não use secador nem forno: calor espalha o líquido e desloca componentes colados.",
      "Não mergulhe em arroz — não seca o interior e adiciona resíduo dentro do equipamento.",
      "Não coloque para carregar 'só para ver se acende'.",
      "Não deixe o caso para a semana seguinte esperando secar sozinho: o que danifica é o resíduo, e ele não evapora.",
    ],
    modalidades: [
      {
        titulo: "Orientação imediata por WhatsApp",
        desc: "Nos primeiros minutos, a instrução certa vale mais que qualquer serviço. Orientamos o desligamento e o transporte antes mesmo de abrir atendimento.",
      },
      {
        titulo: "Bancada com desmontagem e limpeza técnica",
        desc: "Desmontagem completa, remoção de resíduo com solução apropriada, secagem controlada e inspeção da placa sob lupa. Só depois vem o teste de energização.",
      },
      {
        titulo: "Reparo de placa quando houver dano",
        desc: "Trilha rompida ou componente corroído pode exigir microssolda. Diagnóstico, mão de obra e peça são informados separadamente, e a viabilidade é discutida antes de qualquer execução.",
      },
    ],
    faq: [
      {
        q: "Meu notebook molhou e continua funcionando. Preciso levar?",
        a: "Sim, e de preferência logo. A corrosão avança por dias com o equipamento aparentemente normal; a limpeza feita cedo costuma custar uma fração do reparo de placa depois.",
      },
      {
        q: "Arroz funciona para secar notebook?",
        a: "Não. O arroz não alcança a umidade interna, não remove resíduo de açúcar e ainda deposita pó e amido dentro do equipamento. É um mito que atrasa o único procedimento que ajuda: a limpeza técnica.",
      },
      {
        q: "Quanto tempo tenho para levar?",
        a: "Água limpa dá alguma folga; café, refrigerante e outros líquidos açucarados corroem rápido e o intervalo útil é de horas. Em qualquer caso, mantenha o equipamento desligado e sem carregador até a bancada.",
      },
      {
        q: "Só o teclado molhou. Precisa mexer na placa?",
        a: "Nem sempre. Em vários modelos o teclado é uma peça separada e a placa fica preservada. A desmontagem é o que confirma até onde o líquido chegou — sem abrir, é palpite.",
      },
      {
        q: "Tem garantia no reparo de equipamento molhado?",
        a: "A garantia cobre o serviço executado e a peça trocada, com escopo descrito na ordem de serviço. Dano por líquido pode evoluir depois em pontos não relacionados ao reparo, e isso é explicado antes da aprovação, sem promessa que não podemos cumprir.",
      },
    ],
    relacionados: [
      { to: "/servicos/conserto-placa", titulo: "Conserto de placa", desc: "Microssolda e reparo de trilhas quando a corrosão atinge a placa-mãe." },
      { to: "/servicos/manutencao-de-notebook", titulo: "Manutenção de notebook", desc: "Desmontagem, limpeza técnica e troca de componentes em bancada." },
      { to: "/problemas/notebook-nao-carrega", titulo: "Notebook não carrega", desc: "Quando o efeito do líquido aparece no circuito de carga." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "placa-eletronica",
  },
  {
    slug: "computador-nao-da-imagem",
    path: "/problemas/computador-nao-da-imagem",
    titulo: "Computador liga mas não aparece imagem no monitor",
    metaTitle: "Computador liga e não dá imagem: causas e o que testar | O Técnico de Informática",
    metaDescription:
      "Gabinete liga, coolers giram e o monitor fica preto ou em “sem sinal”. Veja como separar monitor, cabo, memória, placa de vídeo e fonte antes de trocar qualquer peça.",
    resumo:
      "Ligar e não dar imagem não é um defeito só: é o resultado visível de qualquer falha que impeça o computador de concluir a inicialização. O diagnóstico útil começa separando três blocos — o que exibe (monitor e cabo), o que gera vídeo (placa de vídeo ou vídeo integrado) e o que permite ligar (fonte, memória e placa-mãe). Trocar peça antes dessa separação é a forma mais cara de descobrir o problema.",
    waMessage:
      "Olá! Vim da página sobre computador que liga e não dá imagem. Preciso de diagnóstico do meu equipamento.",
    sintomas: [
      {
        titulo: "Monitor mostra “sem sinal” e entra em espera",
        desc: "O monitor está funcionando e informando que nada chega até ele. A investigação vai para cabo, entrada selecionada e saída de vídeo usada — muita gente liga o cabo na saída da placa-mãe com uma placa de vídeo dedicada instalada.",
      },
      {
        titulo: "Tela totalmente preta, sem mensagem nenhuma",
        desc: "Nem a mensagem do monitor aparece. Costuma indicar que o monitor não está recebendo energia, está com defeito próprio ou que a fonte do computador não sustenta o consumo depois do primeiro instante.",
      },
      {
        titulo: "Coolers giram, luzes acendem, nada acontece",
        desc: "O computador aparenta ligar, mas não passa do POST. Memória mal encaixada, contato oxidado, placa de vídeo mal assentada e falha de placa-mãe são as causas mais comuns nesse padrão.",
      },
      {
        titulo: "Bipes ou LEDs piscando em sequência",
        desc: "Bipes e LEDs de diagnóstico da placa-mãe são código, não ruído. A sequência aponta o subsistema que travou — normalmente memória, vídeo ou CPU — e reduz muito o tempo de bancada.",
      },
      {
        titulo: "Imagem aparece e some depois de alguns segundos",
        desc: "Chega a mostrar o logotipo e apaga. Aponta para superaquecimento imediato, fonte incapaz de sustentar carga ou falha do driver de vídeo já dentro do sistema.",
      },
    ],
    causas: [
      {
        titulo: "Cabo, adaptador ou entrada errada",
        desc: "Cabo HDMI danificado, adaptador de má qualidade e entrada do monitor no canal errado respondem por uma parcela grande dos chamados. É a primeira verificação justamente porque não custa nada.",
      },
      {
        titulo: "Memória RAM com mau contato ou defeituosa",
        desc: "Pente deslocado, contato oxidado ou módulo com falha impedem o POST. O teste é metódico: um módulo por vez, alternando slots, com limpeza dos contatos.",
      },
      {
        titulo: "Placa de vídeo mal assentada ou sem alimentação",
        desc: "Placa dedicada exige encaixe firme e, em muitos modelos, conectores de energia próprios da fonte. Sem isso o sistema liga e não gera vídeo.",
      },
      {
        titulo: "Fonte degradada",
        desc: "Fonte que entrega tensão só no instante inicial faz o computador ligar sem concluir a inicialização. É uma causa frequente em máquinas com anos de uso e só se confirma com teste sob carga.",
      },
      {
        titulo: "Placa-mãe com capacitor ou trilha comprometidos",
        desc: "Capacitor estufado, marca de queima ou trilha rompida após surto elétrico. Aqui a inspeção visual em bancada, com lupa, vale mais que qualquer software.",
      },
      {
        titulo: "Processador ou dissipador mal instalado",
        desc: "Comum depois de limpeza ou troca de pasta térmica: dissipador frouxo, soquete com pino torto ou cooler não conectado ao conector correto fazem a máquina desligar ou nem iniciar o vídeo.",
      },
    ],
    antesDeChamar: [
      "Teste outro cabo e outra entrada do monitor, e confirme no menu do monitor qual entrada está selecionada.",
      "Se houver placa de vídeo dedicada, confirme que o cabo está na saída da placa e não na saída da placa-mãe.",
      "Ligue o monitor em outro aparelho (notebook, videogame ou TV box) para descobrir se o problema é do monitor.",
      "Desligue da tomada, abra o gabinete e reencaixe firmemente memória e placa de vídeo até ouvir o clique das travas.",
      "Anote bipes, LEDs piscando e se algo mudou antes da falha: queda de energia, limpeza, troca de peça ou transporte.",
    ],
    naoFaca: [
      "Não fique ligando e desligando pelo botão repetidamente esperando que “pegue”: cada partida força a fonte e a placa.",
      "Não compre placa de vídeo ou memória por palpite antes do diagnóstico — na maior parte dos casos a peça nova não era necessária.",
      "Não mexa em componentes sem desligar da tomada e sem descarregar a energia estática tocando parte metálica do gabinete.",
      "Não force o pente de memória nem o conector da placa de vídeo: pino torto no soquete transforma um caso simples em troca de placa-mãe.",
      "Não limpe contatos com produto abrasivo ou objeto metálico; a superfície dourada é fina e o risco é permanente.",
    ],
    modalidades: [
      {
        titulo: "Orientação remota antes de mover o equipamento",
        desc: "Pelo WhatsApp conduzimos os testes de cabo, entrada e reencaixe. Boa parte dos casos de “sem sinal” se resolve nessa conversa, sem custo de deslocamento.",
      },
      {
        titulo: "Visita técnica com peças de referência",
        desc: "Quando o computador precisa ficar onde está, a visita leva cabo, memória e fonte de teste para isolar o componente no local, em janela de até 30 minutos de inspeção.",
      },
      {
        titulo: "Bancada para teste sob carga",
        desc: "Fonte, placa-mãe e vídeo exigem medição com instrumentos e substituição controlada. O orçamento separa diagnóstico, mão de obra e peça, e nada é executado sem aprovação.",
      },
    ],
    faq: [
      {
        q: "Meu computador liga e não dá imagem: é a placa de vídeo?",
        a: "Pode ser, mas é a conclusão menos provável logo de início. Cabo, entrada errada, memória com mau contato e fonte degradada aparecem com muito mais frequência. A placa de vídeo só é apontada depois de testada em outro equipamento ou substituída por uma de referência.",
      },
      {
        q: "Os bipes ajudam a descobrir o problema?",
        a: "Ajudam bastante. A sequência de bipes e os LEDs de diagnóstico da placa-mãe indicam qual subsistema travou — memória, vídeo ou processador. Anotar o padrão antes de abrir chamado reduz o tempo de diagnóstico.",
      },
      {
        q: "Vale a pena consertar ou é melhor trocar o computador?",
        a: "Depende da peça envolvida e da idade da máquina. Memória e fonte costumam ter custo baixo diante do valor do equipamento; placa-mãe antiga com defeito, muitas vezes não. Informamos a estimativa antes para você decidir, sem empurrar reparo inviável.",
      },
      {
        q: "Perco meus arquivos nesse tipo de reparo?",
        a: "Falha de vídeo não afeta o disco na maioria dos casos, e o procedimento padrão preserva os dados. Se durante o diagnóstico o disco também apresentar problema, avisamos antes de qualquer intervenção e a cópia vem primeiro.",
      },
      {
        q: "Dá para resolver sem levar o computador?",
        a: "Cabo, entrada, reencaixe e configuração resolvem uma parte relevante dos casos remotamente ou em visita. Teste de fonte sob carga e inspeção de placa exigem bancada, com instrumentos que não vão para a casa do cliente.",
      },
    ],
    relacionados: [
      { to: "/servicos/manutencao-de-computadores", titulo: "Manutenção de computadores", desc: "Diagnóstico, limpeza técnica e troca de componentes com teste sob carga." },
      { to: "/servicos/conserto-monitor", titulo: "Conserto de monitor", desc: "Quando o teste mostra que o problema está na tela, não no gabinete." },
      { to: "/problemas/computador-desliga-sozinho", titulo: "Computador desliga sozinho", desc: "Quando a máquina chega a iniciar e depois cai — fonte, temperatura e alimentação." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "bancada-tecnica",
  },
  {
    slug: "cheiro-de-queimado",
    path: "/problemas/cheiro-de-queimado",
    titulo: "Cheiro de queimado no computador, fonte ou carregador",
    metaTitle: "Cheiro de queimado no computador: o que fazer imediatamente | O Técnico de Informática",
    metaDescription:
      "Cheiro de queimado vindo do gabinete, da fonte ou do carregador é sinal elétrico e urgente. Veja o que desligar agora, o que nunca fazer e como o diagnóstico é conduzido.",
    resumo:
      "Cheiro de queimado é um dos poucos sintomas em que a orientação certa é parar de usar o equipamento imediatamente. Ele indica que algum componente ultrapassou a temperatura de projeto ou que houve falha elétrica — e o risco deixa de ser só perder a peça: envolve dano em cascata na placa e, em casos extremos, princípio de incêndio. O diagnóstico depois é técnico e frio; o primeiro passo é elétrico e imediato.",
    waMessage:
      "Olá! Vim da página sobre cheiro de queimado. Senti cheiro no meu equipamento e preciso de orientação urgente.",
    sintomas: [
      {
        titulo: "Cheiro forte de plástico ou verniz queimado",
        desc: "Odor acre, parecido com fio derretido. Costuma vir de fonte de alimentação, carregador ou cabo com mau contato aquecendo no conector.",
      },
      {
        titulo: "Cheiro seguido de desligamento imediato",
        desc: "O equipamento apaga junto com o odor e não volta. Padrão típico de proteção da fonte atuando ou de componente que abriu em curto.",
      },
      {
        titulo: "Cheiro adocicado ou de peixe",
        desc: "Odor característico de capacitor eletrolítico rompido e de alguns retardantes de chama em sobreaquecimento. Merece inspeção visual da placa antes de religar.",
      },
      {
        titulo: "Estalo ou clarão junto do cheiro",
        desc: "Houve descarga. Nesse cenário a tomada deve ser desligada primeiro e o equipamento não pode ser religado para testar, sob risco de propagar o dano.",
      },
      {
        titulo: "Marca escura, derretimento ou fumaça leve",
        desc: "Sinal visível no conector, na fonte, no carregador ou na placa. O ponto queimado indica onde investigar, mas quase nunca é o único componente afetado.",
      },
    ],
    causas: [
      {
        titulo: "Fonte de alimentação em fim de vida",
        desc: "Capacitores secos e ventilação obstruída fazem a fonte trabalhar acima do limite. É a origem mais comum de cheiro em computador de mesa e costuma envolver troca da peça, não reparo.",
      },
      {
        titulo: "Carregador ou cabo com mau contato",
        desc: "Conector frouxo aquece por resistência. Em notebook, o cheiro aparece no plugue ou na fonte externa, e o cabo derrete localizadamente antes de qualquer falha da placa.",
      },
      {
        titulo: "Surto elétrico ou raio",
        desc: "Descarga na rede queima o estágio de entrada da fonte e pode atingir placa-mãe, rede e disco. Após surto, religar sem inspeção costuma ampliar o prejuízo.",
      },
      {
        titulo: "Poeira acumulada e ventilação bloqueada",
        desc: "Camada de poeira sobre dissipadores e fonte funciona como isolante térmico. O calor concentrado degrada o verniz da placa e produz odor mesmo sem falha elétrica declarada.",
      },
      {
        titulo: "Capacitor rompido ou componente em curto",
        desc: "Capacitor estufado, bobina queimada ou circuito de alimentação em curto liberam odor característico. A inspeção sob lupa localiza o ponto antes de qualquer energização.",
      },
      {
        titulo: "Bateria inchada ou danificada",
        desc: "Célula de lítio deformada é risco separado: além do odor, existe possibilidade de aquecimento descontrolado. O procedimento correto é remover a bateria e descartar em ponto adequado.",
      },
    ],
    antesDeChamar: [
      "Desligue o equipamento pelo botão de energia e tire o plugue da tomada — em notebook, retire também o carregador e a bateria removível.",
      "Não religue para “ver se o cheiro volta”: se houve curto, a nova energização amplia o dano.",
      "Identifique de onde vem o odor com o equipamento já desligado: fonte, carregador, régua, tomada ou monitor têm caminhos de reparo diferentes.",
      "Verifique se há marca escura, derretimento no conector ou capacitor estufado, e fotografe o que encontrar para adiantar a triagem.",
      "Se houver bateria visivelmente inchada, mantenha o aparelho em superfície não inflamável, longe de material combustível, até o atendimento.",
    ],
    naoFaca: [
      "Não use o equipamento “só um pouco para salvar arquivos” — o risco elétrico é maior que o benefício, e a cópia pode ser feita depois com o disco fora da máquina.",
      "Não troque a fonte por outra qualquer sem confirmar a potência e a origem do problema: fonte inadequada repete a falha em pouco tempo.",
      "Não ligue o aparelho em régua improvisada, benjamim ou extensão subdimensionada, que aquecem no próprio conector.",
      "Não perfure, não pressione e não jogue no lixo comum bateria inchada.",
      "Não aplique produto de limpeza líquido sobre a placa tentando remover a marca de queima antes da inspeção técnica.",
    ],
    modalidades: [
      {
        titulo: "Orientação imediata por WhatsApp",
        desc: "Primeiro cuidamos da segurança: o que desligar, o que remover e como transportar. Essa orientação é dada antes de qualquer agendamento e não depende de contratar serviço.",
      },
      {
        titulo: "Bancada com inspeção antes de energizar",
        desc: "O procedimento correto começa com inspeção visual sob lupa e medição sem energizar. Só depois a fonte é testada em bancada, isolada da placa, com carga controlada.",
      },
      {
        titulo: "Recuperação dos dados em separado",
        desc: "Quando a placa está comprometida, o disco costuma estar íntegro. Retiramos a unidade e copiamos os arquivos independentemente da decisão sobre reparar ou substituir o equipamento.",
      },
    ],
    faq: [
      {
        q: "Senti cheiro de queimado e o computador ainda liga. Posso usar?",
        a: "Não é recomendado. Cheiro indica componente fora da faixa térmica ou falha elétrica em andamento; continuar usando aumenta a chance de dano em cascata na placa e de risco elétrico. Desligue da tomada e trate como caso urgente.",
      },
      {
        q: "Como sei se o problema é a fonte ou a placa-mãe?",
        a: "Pelo teste isolado. A fonte é avaliada fora do computador, com carga controlada, e a placa é inspecionada sob lupa antes de qualquer energização. Sem essa separação, trocar a fonte pode apenas repetir a queima em uma placa já comprometida.",
      },
      {
        q: "Meus arquivos estão perdidos?",
        a: "Na maioria dos casos elétricos o disco continua íntegro, mesmo quando a placa não tem reparo viável. Retiramos a unidade e copiamos os dados em separado. Não prometemos recuperação total antes de examinar o dispositivo.",
      },
      {
        q: "Estabilizador ou nobreak evita esse problema?",
        a: "Reduz o risco de surto pela rede, mas não substitui manutenção: poeira, fonte no fim da vida e conector com mau contato queimam mesmo com proteção instalada. Um bom filtro de linha ajuda; limpeza periódica e fonte adequada ajudam mais.",
      },
      {
        q: "Vale a pena consertar um equipamento que queimou?",
        a: "Depende de qual componente foi atingido. Fonte, carregador e cabo têm custo baixo e troca direta. Placa-mãe com dano elétrico em máquina antiga costuma não compensar, e dizemos isso com clareza — diagnóstico, mão de obra e peça são informados separadamente antes de qualquer execução.",
      },
    ],
    relacionados: [
      { to: "/servicos/manutencao-de-computadores", titulo: "Manutenção de computadores", desc: "Limpeza técnica, teste de fonte e substituição de componentes em bancada." },
      { to: "/problemas/computador-desliga-sozinho", titulo: "Computador desliga sozinho", desc: "Quando a falha elétrica ou térmica aparece antes do cheiro." },
      { to: "/servicos/conserto-placa", titulo: "Conserto de placa", desc: "Inspeção sob lupa, medição e microssolda quando o dano é localizado." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "placa-eletronica",
  },
];


export const clusterProblema = (slug: string) =>
  CLUSTER_PROBLEMAS.find((p) => p.slug === slug);
