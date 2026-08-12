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
      { to: "/servicos/limpeza-e-manutencao", titulo: "Limpeza e manutenção", desc: "Limpeza interna, troca de pasta térmica e revisão de refrigeração." },
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
      { to: "/servicos/conserto-de-notebook", titulo: "Conserto de notebook", desc: "Escopo de bancada, microssolda e troca de componentes." },
      { to: "/servicos/conserto-placa", titulo: "Conserto de placa", desc: "Quando a falha está no circuito de carga da placa-mãe." },
      { to: "/problemas", titulo: "Outros sintomas", desc: "Volte ao hub e escolha o problema mais parecido com o seu." },
    ],
    foto: "placa-eletronica",
  },
];

export const clusterProblema = (slug: string) =>
  CLUSTER_PROBLEMAS.find((p) => p.slug === slug);
