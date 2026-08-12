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
      { to: "/servicos/redes-wifi", titulo: "Redes e Wi-Fi", desc: "Escopo do serviço de rede, cobertura e configuração." },
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
      { to: "/servicos/formatacao-e-sistema", titulo: "Formatação e sistema", desc: "Reinstalação com preservação de dados e drivers corretos." },
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
      { to: "/servicos/backup", titulo: "Backup", desc: "Rotina de cópia para não repetir o problema." },
      { to: "/atendimento", titulo: "Solicitar avaliação", desc: "Descreva o que aconteceu e receba a orientação inicial." },
    ],
    foto: "bancada-tecnica",
  },
];

export const clusterProblema = (slug: string) =>
  CLUSTER_PROBLEMAS.find((p) => p.slug === slug);
