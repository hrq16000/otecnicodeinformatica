/**
 * Cluster EQUIPAMENTOS — entrada por aparelho (notebook, desktop, impressora,
 * roteador) ligando sintoma → serviço → modalidade de atendimento.
 *
 * Regra do cluster (igual ao de PROBLEMAS): só entra equipamento que tem
 * conteúdo técnico próprio, sintomas reais observados em atendimento e
 * caminho definido. Nada de página gerada trocando marca ou bairro.
 */

export type EquipamentoFaq = { q: string; a: string };

export type ClusterEquipamento = {
  slug: string;
  path: string;
  titulo: string; // H1
  metaTitle: string;
  metaDescription: string;
  resumo: string;
  waMessage: string;
  /** Sintomas mais frequentes desse equipamento, com o que significam. */
  sintomas: { titulo: string; desc: string }[];
  /** O que é verificado na avaliação técnica. */
  verificacoes: string[];
  /** O que evitar para não agravar o caso. */
  naoFaca: string[];
  /** Modalidade indicada por tipo de caso. */
  modalidades: { titulo: string; desc: string }[];
  faq: EquipamentoFaq[];
  /** Links contextuais para soluções/serviços e para páginas de sintoma. */
  relacionados: { to: string; titulo: string; desc: string }[];
  foto?: string;
};

export const CLUSTER_EQUIPAMENTOS: ClusterEquipamento[] = [
  {
    slug: "notebook",
    path: "/equipamentos/notebook",
    titulo: "Notebook: sintomas mais comuns e como cada um é resolvido",
    metaTitle: "Notebook com problema: sintomas e reparos | O Técnico de Informática",
    metaDescription:
      "Notebook lento, que não liga, superaquecendo, com tela apagada ou bateria que não segura carga. Veja o que cada sintoma indica e qual atendimento resolve.",
    resumo:
      "Notebook concentra em pouco espaço fonte, bateria, placa, tela e dissipação — por isso o mesmo sintoma pode ter origens completamente diferentes. A avaliação começa separando o que é energia, o que é imagem, o que é temperatura e o que é software, antes de falar em peça.",
    waMessage:
      "Olá! Vim da página de notebook. Meu notebook está com problema e preciso de avaliação técnica.",
    sintomas: [
      {
        titulo: "Lento depois de alguns anos de uso",
        desc: "Na maioria dos casos o gargalo é o disco mecânico e a memória insuficiente para o uso atual, não o processador. Antes de indicar troca de peça, medimos onde o tempo realmente é perdido.",
      },
      {
        titulo: "Desliga sozinho ou trava em uso pesado",
        desc: "Sinal clássico de dissipação comprometida: pasta térmica ressecada, cooler obstruído por poeira ou fluxo de ar bloqueado. Quando persiste depois da limpeza, a investigação passa para alimentação e memória.",
      },
      {
        titulo: "Não carrega ou bateria dura poucos minutos",
        desc: "É preciso separar três coisas: carregador, circuito de carga da placa e célula da bateria. Trocar bateria sem checar o circuito é o erro mais comum — e o mais caro.",
      },
      {
        titulo: "Liga mas a tela fica apagada",
        desc: "Ventoinha girando com tela preta aponta para tela, cabo flat, iluminação ou vídeo da placa. O teste com monitor externo já separa metade dos cenários em poucos minutos.",
      },
      {
        titulo: "Teclas falhando ou dobradiça solta",
        desc: "Dano mecânico progressivo. Dobradiça folgada tende a trincar a carcaça e romper o flat da tela; quanto antes for avaliada, menor o conjunto de peças envolvido.",
      },
    ],
    verificacoes: [
      "Teste de alimentação: carregador, entrada de energia e comportamento sem bateria.",
      "Leitura de saúde do disco (SMART) e da memória, com registro do resultado.",
      "Temperatura sob carga antes e depois da limpeza, para comprovar o ganho real.",
      "Verificação de imagem com monitor externo para separar tela de placa.",
      "Checagem de sistema, drivers e programas iniciando junto com o Windows.",
    ],
    naoFaca: [
      "Insistir em ligar repetidamente depois de contato com líquido — cada tentativa amplia a corrosão.",
      "Comprar bateria ou carregador genérico antes do diagnóstico do circuito de carga.",
      "Abrir a carcaça forçando encaixes: as travas plásticas quebram e passam a fazer parte do orçamento.",
      "Instalar 'otimizadores' baixados da internet quando a lentidão já é evidente.",
    ],
    modalidades: [
      {
        titulo: "Remoto",
        desc: "Lentidão de software, vírus, configuração, backup e ajustes de sistema, desde que o notebook ligue e conecte à internet.",
      },
      {
        titulo: "Visita técnica",
        desc: "Inspeção, diagnóstico e tentativa de reparo rápido no local, sem compromisso de execução. Peças não estão inclusas.",
      },
      {
        titulo: "Coleta e entrega",
        desc: "Casos de bancada — limpeza interna com troca de pasta, troca de tela, reparo de carga, upgrade de SSD ou memória. Buscamos e devolvemos: não temos balcão de atendimento ao público.",
      },
    ],
    faq: [
      {
        q: "Vale a pena consertar um notebook antigo?",
        a: "Depende do custo do reparo diante do que o equipamento ainda entrega. Informamos o valor da solução e o cenário realista de vida útil para você comparar com a compra de outro — sem empurrar reparo que não se paga.",
      },
      {
        q: "Trocar por SSD resolve mesmo a lentidão?",
        a: "Resolve quando o gargalo é o disco, que é o caso mais comum em máquinas com disco mecânico. Se a origem for memória insuficiente, superaquecimento ou infecção, o SSD melhora a inicialização mas o sintoma volta em uso real.",
      },
      {
        q: "Meus arquivos são preservados?",
        a: "O procedimento padrão preserva os dados. Quando há falha física de disco, a cópia é tentada primeiro e o risco é informado antes de qualquer intervenção — sem promessa de recuperação total.",
      },
      {
        q: "Vocês atendem notebook de qualquer marca?",
        a: "Atendemos as marcas de mercado mais comuns. O que define a viabilidade não é a marca e sim a disponibilidade de peça compatível, informada antes de você aprovar qualquer coisa.",
      },
    ],
    relacionados: [
      { to: "/problemas/computador-lento", titulo: "Computador ou notebook lento", desc: "O que realmente causa a lentidão e o que muda com SSD e memória." },
      { to: "/problemas/notebook-nao-liga", titulo: "Notebook não liga", desc: "Como separar fonte, bateria, placa e tela antes do orçamento." },
      { to: "/servicos/manutencao-notebook", titulo: "Manutenção de notebook", desc: "Limpeza interna, pasta térmica, reparo de carga e troca de tela." },
    ],
  },
  {
    slug: "desktop",
    path: "/equipamentos/desktop",
    titulo: "Desktop e PC: falhas frequentes, upgrades e o que checar",
    metaTitle: "Desktop com problema: falhas e upgrades | O Técnico de Informática",
    metaDescription:
      "PC que não liga, reinicia sozinho, faz barulho ou ficou lento. Entenda o que cada sintoma indica no desktop, o que checar antes e qual atendimento resolve.",
    resumo:
      "No desktop as peças são separadas e acessíveis, o que torna o diagnóstico mais direto — e também mais fácil de errar por substituição no chute. Testamos por eliminação: energia, placa, memória, armazenamento e vídeo, um de cada vez, com registro do resultado.",
    waMessage:
      "Olá! Vim da página de desktop/PC. Meu computador de mesa está com problema e preciso de avaliação.",
    sintomas: [
      {
        titulo: "Não dá sinal de vida ao apertar o botão",
        desc: "Fonte, botão do gabinete, placa ou tomada. O teste começa pela alimentação porque é a causa mais frequente e a mais barata de descartar.",
      },
      {
        titulo: "Liga, ventoinhas giram, mas não aparece imagem",
        desc: "Cenário típico de memória mal encaixada, placa de vídeo ou cabo de vídeo na saída errada. Um passo simples de reencaixe resolve boa parte dos casos.",
      },
      {
        titulo: "Reinicia sozinho sem aviso",
        desc: "Fonte perdendo capacidade, superaquecimento ou memória com falha. É o sintoma que mais leva à troca desnecessária de peça quando não se testa por eliminação.",
      },
      {
        titulo: "Barulho alto ou estalos internos",
        desc: "Ventoinha com rolamento gasto faz ruído contínuo; estalo intermitente vindo do disco mecânico é sinal de risco de perda de dados — nesse caso o backup vem antes de qualquer reparo.",
      },
      {
        titulo: "Lento mesmo com poucas coisas abertas",
        desc: "Disco mecânico, memória no limite, sistema desatualizado ou infecção. A medição indica onde o tempo é perdido antes de qualquer proposta de upgrade.",
      },
    ],
    verificacoes: [
      "Teste da fonte e da alimentação da placa antes de qualquer troca.",
      "Reencaixe e teste individual dos módulos de memória.",
      "Saúde do disco (SMART) e leitura de temperatura sob carga.",
      "Verificação da saída de vídeo — integrada e dedicada — com cabo alternativo.",
      "Avaliação de sistema, inicialização e presença de malware.",
    ],
    naoFaca: [
      "Comprar peça por palpite de vídeo da internet: substituição no chute soma custo sem resolver.",
      "Ligar o PC com o disco fazendo estalos — a cada tentativa a chance de recuperar dados cai.",
      "Usar filtro de linha sobrecarregado como se fosse estabilizador.",
      "Limpar internamente com aspirador doméstico: a estática causa dano permanente.",
    ],
    modalidades: [
      {
        titulo: "Remoto",
        desc: "Lentidão, vírus, configuração de sistema, backup e instalação de programas, com o PC ligando normalmente.",
      },
      {
        titulo: "Visita técnica",
        desc: "Inspeção, diagnóstico e tentativa de reparo rápido no local, sem compromisso de execução. Peças não estão inclusas.",
      },
      {
        titulo: "Coleta e entrega",
        desc: "Reparo de placa, troca de fonte, upgrade de SSD e memória, montagem e limpeza completa. Buscamos e devolvemos — não atendemos em balcão.",
      },
    ],
    faq: [
      {
        q: "Meu PC ficou lento: é melhor upgrade ou máquina nova?",
        a: "Se a base ainda suporta o uso atual, SSD e memória costumam entregar o maior ganho pelo menor custo. Quando a placa e o processador já limitam o que você precisa fazer, dizemos isso com clareza em vez de vender upgrade que não se paga.",
      },
      {
        q: "Quanto tempo leva o diagnóstico de um desktop?",
        a: "Depende do sintoma. Falhas de energia e de inicialização costumam ser identificadas na mesma avaliação; casos intermitentes exigem tempo de teste sob carga, e isso é informado antes.",
      },
      {
        q: "Vocês montam PC com peças que eu já comprei?",
        a: "Sim, com conferência prévia de compatibilidade a partir dos modelos exatos. A montagem é agendada depois dessa conferência, para evitar peça que não encaixa ou fonte insuficiente.",
      },
      {
        q: "Preciso levar monitor, teclado e mouse?",
        a: "Não. Na coleta levamos apenas o gabinete e os cabos necessários, salvo quando o sintoma envolve justamente a imagem ou os periféricos.",
      },
    ],
    relacionados: [
      { to: "/problemas/computador-lento", titulo: "Computador lento", desc: "Onde o tempo é perdido e o que realmente muda o desempenho." },
      { to: "/problemas/tela-azul", titulo: "Tela azul no Windows", desc: "Quando é driver, quando é memória e quando é disco." },
      { to: "/servicos/montagem-pc", titulo: "Montagem e upgrade de PC", desc: "Conferência de compatibilidade, montagem e testes de estabilidade." },
    ],
  },
  {
    slug: "impressora",
    path: "/equipamentos/impressora",
    titulo: "Impressora: instalação, rede e falhas que travam o trabalho",
    metaTitle: "Impressora com problema: instalação e rede | O Técnico de Informática",
    metaDescription:
      "Impressora que some da rede, não imprime, imprime falhado ou não conecta no Wi-Fi. Veja causas reais, o que checar antes e qual atendimento resolve.",
    resumo:
      "Boa parte dos chamados de impressora não é defeito do aparelho: é rede, driver ou fila de impressão. Separar isso antes evita assistência desnecessária — e evita também o oposto, insistir em software quando o problema é mecânico.",
    waMessage:
      "Olá! Vim da página de impressora. Minha impressora está com problema de instalação/rede e preciso de suporte.",
    sintomas: [
      {
        titulo: "Some da rede depois de um tempo",
        desc: "Quase sempre é IP dinâmico: o roteador entrega um endereço novo e o computador continua procurando o antigo. Fixar o endereço resolve de forma definitiva.",
      },
      {
        titulo: "Manda imprimir e nada acontece",
        desc: "Fila travada, spooler parado ou impressora padrão errada. É um dos casos mais rápidos de resolver remotamente.",
      },
      {
        titulo: "Imprime com falhas, riscos ou borrado",
        desc: "Cabeça de impressão entupida, cartucho no fim, papel inadequado ou cilindro desgastado. Aqui a origem é física e a limpeza correta depende da tecnologia do aparelho.",
      },
      {
        titulo: "Não conecta no Wi-Fi",
        desc: "Muitos modelos só operam em 2.4 GHz. Quando a rede está unificada em 5 GHz, a impressora simplesmente não enxerga o sinal — e o ajuste é no roteador, não na impressora.",
      },
      {
        titulo: "Funciona em um computador e no outro não",
        desc: "Driver diferente, perfil de rede como pública ou compartilhamento desligado. A rede é o objeto do diagnóstico, não o aparelho.",
      },
    ],
    verificacoes: [
      "Endereço IP da impressora e reserva no roteador para evitar troca de endereço.",
      "Estado da fila e do serviço de impressão em cada computador envolvido.",
      "Driver correto para o modelo e para a versão do sistema.",
      "Banda de Wi-Fi disponível (2.4 GHz) e qualidade do sinal no local do aparelho.",
      "Teste de impressão direto pelo painel do aparelho para separar hardware de rede.",
    ],
    naoFaca: [
      "Reinstalar o driver várias vezes: acumula filas e impressoras duplicadas.",
      "Limpar cabeça de impressão com produtos improvisados.",
      "Forçar papel preso puxando contra o sentido do mecanismo.",
      "Trocar cartucho por suspeita quando o teste do painel ainda não foi feito.",
    ],
    modalidades: [
      {
        titulo: "Remoto",
        desc: "Instalação, driver, fila de impressão, compartilhamento e configuração de rede — cobre a maioria dos chamados.",
      },
      {
        titulo: "Visita técnica",
        desc: "Configuração no local, ponto de rede, mais de um computador envolvido ou verificação física do aparelho, sem compromisso de execução.",
      },
      {
        titulo: "Coleta e entrega",
        desc: "Quando o caso é mecânico e exige bancada. Buscamos e devolvemos o equipamento — não atendemos em balcão.",
      },
    ],
    faq: [
      {
        q: "Dá para resolver impressora sem ninguém ir até o local?",
        a: "Na maior parte dos casos, sim. Instalação, driver, fila e compartilhamento são resolvidos por acesso remoto; só sai visita quando o problema envolve cabeamento, mais de um ponto ou parte mecânica.",
      },
      {
        q: "Por que a impressora para de funcionar toda semana?",
        a: "Normalmente porque o endereço de rede muda a cada reinício do roteador. Com reserva de IP e configuração correta do driver, o problema deixa de se repetir.",
      },
      {
        q: "Vocês configuram impressora para vários computadores da empresa?",
        a: "Sim. Mapeamos os pontos, padronizamos o driver e deixamos o acesso funcionando em cada estação, com registro do que foi configurado.",
      },
      {
        q: "Compensa consertar impressora ou trocar?",
        a: "Depende do custo da peça em relação ao aparelho. Em modelos de entrada, muitas vezes a troca é mais racional — e dizemos isso mesmo quando significa não executar o reparo.",
      },
    ],
    relacionados: [
      { to: "/problemas/wifi-instavel", titulo: "Wi-Fi instável", desc: "Quando o problema da impressora é, na verdade, a rede." },
      { to: "/servicos/instalacao-impressora", titulo: "Instalação de impressora", desc: "Driver, rede, compartilhamento e teste em cada estação." },
      { to: "/empresas", titulo: "Atendimento para empresas", desc: "Padronização de impressão e suporte para vários pontos." },
    ],
  },
  {
    slug: "roteador",
    path: "/equipamentos/roteador",
    titulo: "Roteador e rede Wi-Fi: cobertura, quedas e configuração",
    metaTitle: "Roteador e Wi-Fi: cobertura e quedas | O Técnico de Informática",
    metaDescription:
      "Roteador com sinal fraco, quedas ou configuração errada derruba a internet inteira. Veja o que checar, o que resolve de verdade e qual atendimento indicar.",
    resumo:
      "O roteador é o equipamento que mais recebe culpa indevida e o que menos costuma ser configurado corretamente. Antes de trocar aparelho ou aumentar o plano, vale entender se o problema é cobertura, interferência, configuração ou o próprio link da operadora.",
    waMessage:
      "Olá! Vim da página de roteador. Minha rede Wi-Fi está com problema e preciso de diagnóstico.",
    sintomas: [
      {
        titulo: "Sinal fraco longe do aparelho",
        desc: "Cobertura, não velocidade. Parede de concreto, laje, espelho e caixa metálica atenuam o sinal — a solução passa por posicionamento, repetidor cabeado ou malha mesh.",
      },
      {
        titulo: "Cai e volta várias vezes por dia",
        desc: "Pode ser interferência de canal, superaquecimento do aparelho, fonte enfraquecida ou instabilidade do link. Cada hipótese tem um teste próprio.",
      },
      {
        titulo: "Velocidade muito abaixo do contratado",
        desc: "Medição no cabo e no Wi-Fi mostra onde a perda acontece. Roteador antigo limitando a banda é frequente em planos que foram aumentados sem trocar o equipamento.",
      },
      {
        titulo: "Muitos aparelhos conectados e tudo trava",
        desc: "Roteador de entrega da operadora costuma ter limite prático bem menor do que o anunciado. Em casa cheia ou escritório, a saída é distribuir a carga entre bandas e pontos.",
      },
      {
        titulo: "Conecta mas 'sem internet'",
        desc: "Falha entre roteador e provedor: DNS, IP, modo do modem ou cabo de entrada. O aparelho que reclama não é o culpado.",
      },
    ],
    verificacoes: [
      "Medição de velocidade no cabo e no Wi-Fi, em pontos diferentes do imóvel.",
      "Análise de canais e interferência de redes vizinhas.",
      "Separação ou unificação de bandas conforme os aparelhos existentes.",
      "Firmware, senha, DNS e modo de operação do roteador.",
      "Mapa simples de cobertura para indicar onde um ponto adicional resolve.",
    ],
    naoFaca: [
      "Instalar repetidor no ponto onde o sinal já é ruim — ele repete o sinal ruim.",
      "Esconder o roteador dentro de armário, atrás da TV ou no chão.",
      "Aumentar o plano antes de confirmar que a perda não é de cobertura.",
      "Trocar senha e configurações no aparelho sem registrar o que foi alterado.",
    ],
    modalidades: [
      {
        titulo: "Remoto",
        desc: "Configuração, senha, DNS, canais e ajustes do roteador quando há alguma conexão funcionando.",
      },
      {
        titulo: "Visita técnica",
        desc: "Medição de cobertura no local, reposicionamento, cabeamento e instalação de pontos adicionais. Inspeção e diagnóstico sem compromisso de execução; peças não inclusas.",
      },
      {
        titulo: "Projeto de rede",
        desc: "Casa grande, sobrado ou escritório: levantamento, definição de pontos e implantação de rede mesh ou cabeada com validação de desempenho.",
      },
    ],
    faq: [
      {
        q: "Repetidor ou mesh: o que é melhor?",
        a: "Mesh mantém a mesma rede e faz a transição entre pontos de forma transparente; repetidor simples divide a banda e costuma criar uma segunda rede. Em imóvel com mais de um pavimento, mesh com ponto cabeado é o que entrega resultado consistente.",
      },
      {
        q: "Trocar o roteador da operadora resolve?",
        a: "Resolve quando o aparelho é o gargalo, o que acontece bastante em planos que subiram sem troca de equipamento. Se o problema for cobertura, trocar o roteador melhora pouco — a medição mostra qual é o caso.",
      },
      {
        q: "Vocês configuram rede para escritório?",
        a: "Sim. Levantamos os pontos, definimos cobertura, separamos rede de visitantes e documentamos as configurações aplicadas para a empresa não ficar dependente de memória de ninguém.",
      },
      {
        q: "Preciso trocar de plano de internet?",
        a: "Só depois de medir. Na maior parte dos atendimentos o plano entrega o contratado no cabo e a perda acontece no Wi-Fi — nesse cenário aumentar o plano não muda nada.",
      },
    ],
    relacionados: [
      { to: "/problemas/wifi-instavel", titulo: "Wi-Fi caindo ou lento", desc: "Causas reais, o que testar antes e quando chamar técnico." },
      { to: "/servicos/redes-wifi", titulo: "Redes e Wi-Fi", desc: "Configuração, cobertura, mesh e cabeamento com validação." },
      { to: "/empresas", titulo: "Rede para empresas", desc: "Cobertura, segmentação e documentação da estrutura." },
    ],
  },
];

export const clusterEquipamento = (slug: string) =>
  CLUSTER_EQUIPAMENTOS.find((e) => e.slug === slug) ?? null;

export const EQUIPAMENTOS_PATHS = CLUSTER_EQUIPAMENTOS.map((e) => e.path);
