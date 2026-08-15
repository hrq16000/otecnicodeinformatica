/**
 * Espelho estático do cluster EQUIPAMENTOS (src/lib/clusterEquipamentos.ts)
 * para o prerender pré-hidratação. Crawlers sem JS precisam ver H1, meta e
 * conteúdo próprio de cada equipamento — casca vazia não indexa bem.
 *
 * GERADO a partir do TS; ao mudar o conteúdo lá, regenere aqui.
 */
export const CLUSTER_EQUIPAMENTOS_ROUTES = [
  {
    "path": "/equipamentos",
    "title": "Equipamentos atendidos: notebook, PC, impressora e roteador | O Técnico de Informática",
    "description": "Entre pelo equipamento: notebook, desktop, impressora ou roteador. Cada página mostra os sintomas mais comuns, o que é verificado na avaliação e a modalidade indicada.",
    "h1": "Escolha o equipamento e veja o que costuma acontecer",
    "subtitulo": "O mesmo sintoma tem causas diferentes em cada aparelho: veja os problemas frequentes por equipamento, o que é verificado na avaliação e qual modalidade resolve.",
    "blocos": [
      {
        "titulo": "Por que separar por equipamento",
        "paragrafos": [
          "Lentidão em notebook e lentidão em desktop raramente têm a mesma origem: no notebook a temperatura e a fonte pesam muito mais; no desktop o teste por eliminação de peças é direto. Organizar o conteúdo por aparelho evita o diagnóstico genérico que leva à troca desnecessária de componente.",
          "Cada página deste hub reúne os sintomas realmente observados em atendimento, o que verificamos na avaliação técnica, o que evitar antes de chamar alguém e a modalidade indicada — remoto, visita técnica ou coleta com entrega."
        ]
      },
      {
        "titulo": "Como o atendimento é organizado",
        "paragrafos": [
          "Atendemos por acesso remoto, por visita técnica no endereço e por coleta com devolução. Não temos balcão de atendimento ao público: quando o caso exige bancada, buscamos e entregamos o equipamento.",
          "Diagnóstico, deslocamento, mão de obra e peça são informados separadamente e nada é executado sem aprovação prévia. As condições completas estão na página de preços e políticas."
        ]
      },
      {
        "titulo": "Reparo, upgrade ou substituição: como a decisão é tomada",
        "paragrafos": [
          "Antes de orçar peça, a avaliação responde se o aparelho ainda comporta o uso que você faz dele. Notebook de escritório com disco mecânico quase sempre responde melhor a um upgrade para SSD do que a uma formatação; desktop com fonte instável precisa de teste de alimentação antes de qualquer troca de placa; impressora com falha de tracionamento tem custo de peça que costuma superar o valor de um equipamento de entrada.",
          "A régua prática é a mesma para todos os aparelhos: quando o reparo passa de 40% a 50% do preço de um equivalente novo, a recomendação é substituir e aproveitar o que ainda serve — SSD, memória e, em alguns casos, a fonte. Essa conclusão sempre vem depois do diagnóstico, nunca antes."
        ]
      }
,
      {"titulo": "Idade do equipamento muda o diagnóstico", "paragrafos": ["Aparelho com menos de três anos quase nunca falha por desgaste: as causas dominantes são software, atualização malfeita, armazenamento cheio e superaquecimento por pasta térmica seca ou entrada de ar obstruída. Nesses casos o caminho é limpeza interna, revisão térmica e organização do sistema, não substituição de placa.", "Entre três e seis anos entra a faixa em que o upgrade rende mais que qualquer outro serviço: disco mecânico trocado por SSD e memória ampliada devolvem, na prática, a sensação de equipamento novo por uma fração do preço. Acima de seis anos a conta muda de novo — peça de reposição fica escassa, fonte e bateria já perderam capacidade e o custo de manter começa a competir com o de substituir.", "Por isso a avaliação sempre registra idade, uso real e histórico de manutenção antes de qualquer orçamento. Dois notebooks com o mesmo sintoma podem receber recomendações opostas apenas por essa diferença de contexto."]},
      {"titulo": "Peças: o que usamos e o que recusamos", "paragrafos": ["Trabalhamos com peça nova, com procedência informada e com a especificação compatível com o aparelho — não com componente recuperado de outro equipamento com defeito. Quando existe alternativa mais barata e tecnicamente adequada, ela é apresentada junto da original, com a diferença de garantia explicada antes da escolha.", "Há situações em que recusamos o serviço: painel de tela colado com risco de dano estrutural, placa com corrosão generalizada por líquido, equipamento em garantia de fábrica cuja abertura anularia o direito do cliente. Nesses casos indicamos o caminho correto — assistência autorizada ou substituição — mesmo sem faturar o reparo.", "Toda peça substituída fica disponível para devolução ao cliente na entrega, e a garantia de 90 dias cobre a mão de obra do defeito tratado, com a cobertura do componente seguindo o prazo do fabricante."]}
    ],
    "faq": [
      {
        "pergunta": "Vocês atendem só computador?",
        "resposta": "Não. Além de notebook e desktop, atendemos periféricos e infraestrutura de rede: impressoras, roteadores, pontos de Wi-Fi e cabeamento. O que define o atendimento é o sintoma e a viabilidade técnica, informados antes."
      },
      {
        "pergunta": "Preciso saber qual é o defeito antes de chamar?",
        "resposta": "Não. Basta descrever o que está acontecendo em linguagem comum. A triagem identifica o equipamento e a família provável da falha e indica a modalidade adequada."
      },
      {
        "pergunta": "Existe balcão para eu levar o equipamento?",
        "resposta": "Não trabalhamos com balcão de atendimento ao público. Quando o caso exige bancada, fazemos coleta e entrega no endereço combinado."
      }
    ]
  },
  {
    "path": "/equipamentos/notebook",
    "title": "Notebook com problema: sintomas e reparos | O Técnico de Informática",
    "description": "Notebook lento, que não liga, superaquecendo, com tela apagada ou bateria que não segura carga. Veja o que cada sintoma indica e qual atendimento resolve.",
    "h1": "Notebook: sintomas mais comuns e como cada um é resolvido",
    "subtitulo": "Notebook concentra em pouco espaço fonte, bateria, placa, tela e dissipação — por isso o mesmo sintoma pode ter origens completamente diferentes. A avaliação começa separando o que é energia, o que é imagem, o que é temperatura e o que é software, antes de falar em peça.",
    "blocos": [
      {
        "titulo": "Sintomas mais comuns nesse equipamento",
        "paragrafos": [
          "Lento depois de alguns anos de uso: Na maioria dos casos o gargalo é o disco mecânico e a memória insuficiente para o uso atual, não o processador. Antes de indicar troca de peça, medimos onde o tempo realmente é perdido.",
          "Desliga sozinho ou trava em uso pesado: Sinal clássico de dissipação comprometida: pasta térmica ressecada, cooler obstruído por poeira ou fluxo de ar bloqueado. Quando persiste depois da limpeza, a investigação passa para alimentação e memória.",
          "Não carrega ou bateria dura poucos minutos: É preciso separar três coisas: carregador, circuito de carga da placa e célula da bateria. Trocar bateria sem checar o circuito é o erro mais comum — e o mais caro.",
          "Liga mas a tela fica apagada: Ventoinha girando com tela preta aponta para tela, cabo flat, iluminação ou vídeo da placa. O teste com monitor externo já separa metade dos cenários em poucos minutos.",
          "Teclas falhando ou dobradiça solta: Dano mecânico progressivo. Dobradiça folgada tende a trincar a carcaça e romper o flat da tela; quanto antes for avaliada, menor o conjunto de peças envolvido."
        ]
      },
      {
        "titulo": "O que é verificado na avaliação",
        "paragrafos": [
          "Teste de alimentação: carregador, entrada de energia e comportamento sem bateria.",
          "Leitura de saúde do disco (SMART) e da memória, com registro do resultado.",
          "Temperatura sob carga antes e depois da limpeza, para comprovar o ganho real.",
          "Verificação de imagem com monitor externo para separar tela de placa.",
          "Checagem de sistema, drivers e programas iniciando junto com o Windows."
        ]
      },
      {
        "titulo": "O que evitar antes do atendimento",
        "paragrafos": [
          "Insistir em ligar repetidamente depois de contato com líquido — cada tentativa amplia a corrosão.",
          "Comprar bateria ou carregador genérico antes do diagnóstico do circuito de carga.",
          "Abrir a carcaça forçando encaixes: as travas plásticas quebram e passam a fazer parte do orçamento.",
          "Instalar 'otimizadores' baixados da internet quando a lentidão já é evidente."
        ]
      },
      {
        "titulo": "Como o atendimento acontece",
        "paragrafos": [
          "Remoto: Lentidão de software, vírus, configuração, backup e ajustes de sistema, desde que o notebook ligue e conecte à internet.",
          "Visita técnica: Inspeção, diagnóstico e tentativa de reparo rápido no local, sem compromisso de execução. Peças não estão inclusas.",
          "Coleta e entrega: Casos de bancada — limpeza interna com troca de pasta, troca de tela, reparo de carga, upgrade de SSD ou memória. Buscamos e devolvemos: não temos balcão de atendimento ao público."
        ]
      }
    ],
    "faq": [
      {
        "pergunta": "Vale a pena consertar um notebook antigo?",
        "resposta": "Depende do custo do reparo diante do que o equipamento ainda entrega. Informamos o valor da solução e o cenário realista de vida útil para você comparar com a compra de outro — sem empurrar reparo que não se paga."
      },
      {
        "pergunta": "Trocar por SSD resolve mesmo a lentidão?",
        "resposta": "Resolve quando o gargalo é o disco, que é o caso mais comum em máquinas com disco mecânico. Se a origem for memória insuficiente, superaquecimento ou infecção, o SSD melhora a inicialização mas o sintoma volta em uso real."
      },
      {
        "pergunta": "Meus arquivos são preservados?",
        "resposta": "O procedimento padrão preserva os dados. Quando há falha física de disco, a cópia é tentada primeiro e o risco é informado antes de qualquer intervenção — sem promessa de recuperação total."
      },
      {
        "pergunta": "Vocês atendem notebook de qualquer marca?",
        "resposta": "Atendemos as marcas de mercado mais comuns. O que define a viabilidade não é a marca e sim a disponibilidade de peça compatível, informada antes de você aprovar qualquer coisa."
      }
    ]
  },
  {
    "path": "/equipamentos/desktop",
    "title": "Desktop com problema: falhas e upgrades | O Técnico de Informática",
    "description": "PC que não liga, reinicia sozinho, faz barulho ou ficou lento. Entenda o que cada sintoma indica no desktop, o que checar antes e qual atendimento resolve.",
    "h1": "Desktop e PC: falhas frequentes, upgrades e o que checar",
    "subtitulo": "No desktop as peças são separadas e acessíveis, o que torna o diagnóstico mais direto — e também mais fácil de errar por substituição no chute. Testamos por eliminação: energia, placa, memória, armazenamento e vídeo, um de cada vez, com registro do resultado.",
    "blocos": [
      {
        "titulo": "Sintomas mais comuns nesse equipamento",
        "paragrafos": [
          "Não dá sinal de vida ao apertar o botão: Fonte, botão do gabinete, placa ou tomada. O teste começa pela alimentação porque é a causa mais frequente e a mais barata de descartar.",
          "Liga, ventoinhas giram, mas não aparece imagem: Cenário típico de memória mal encaixada, placa de vídeo ou cabo de vídeo na saída errada. Um passo simples de reencaixe resolve boa parte dos casos.",
          "Reinicia sozinho sem aviso: Fonte perdendo capacidade, superaquecimento ou memória com falha. É o sintoma que mais leva à troca desnecessária de peça quando não se testa por eliminação.",
          "Barulho alto ou estalos internos: Ventoinha com rolamento gasto faz ruído contínuo; estalo intermitente vindo do disco mecânico é sinal de risco de perda de dados — nesse caso o backup vem antes de qualquer reparo.",
          "Lento mesmo com poucas coisas abertas: Disco mecânico, memória no limite, sistema desatualizado ou infecção. A medição indica onde o tempo é perdido antes de qualquer proposta de upgrade."
        ]
      },
      {
        "titulo": "O que é verificado na avaliação",
        "paragrafos": [
          "Teste da fonte e da alimentação da placa antes de qualquer troca.",
          "Reencaixe e teste individual dos módulos de memória.",
          "Saúde do disco (SMART) e leitura de temperatura sob carga.",
          "Verificação da saída de vídeo — integrada e dedicada — com cabo alternativo.",
          "Avaliação de sistema, inicialização e presença de malware."
        ]
      },
      {
        "titulo": "O que evitar antes do atendimento",
        "paragrafos": [
          "Comprar peça por palpite de vídeo da internet: substituição no chute soma custo sem resolver.",
          "Ligar o PC com o disco fazendo estalos — a cada tentativa a chance de recuperar dados cai.",
          "Usar filtro de linha sobrecarregado como se fosse estabilizador.",
          "Limpar internamente com aspirador doméstico: a estática causa dano permanente."
        ]
      },
      {
        "titulo": "Como o atendimento acontece",
        "paragrafos": [
          "Remoto: Lentidão, vírus, configuração de sistema, backup e instalação de programas, com o PC ligando normalmente.",
          "Visita técnica: Inspeção, diagnóstico e tentativa de reparo rápido no local, sem compromisso de execução. Peças não estão inclusas.",
          "Coleta e entrega: Reparo de placa, troca de fonte, upgrade de SSD e memória, montagem e limpeza completa. Buscamos e devolvemos — não atendemos em balcão."
        ]
      }
    ],
    "faq": [
      {
        "pergunta": "Meu PC ficou lento: é melhor upgrade ou máquina nova?",
        "resposta": "Se a base ainda suporta o uso atual, SSD e memória costumam entregar o maior ganho pelo menor custo. Quando a placa e o processador já limitam o que você precisa fazer, dizemos isso com clareza em vez de vender upgrade que não se paga."
      },
      {
        "pergunta": "Quanto tempo leva o diagnóstico de um desktop?",
        "resposta": "Depende do sintoma. Falhas de energia e de inicialização costumam ser identificadas na mesma avaliação; casos intermitentes exigem tempo de teste sob carga, e isso é informado antes."
      },
      {
        "pergunta": "Vocês montam PC com peças que eu já comprei?",
        "resposta": "Sim, com conferência prévia de compatibilidade a partir dos modelos exatos. A montagem é agendada depois dessa conferência, para evitar peça que não encaixa ou fonte insuficiente."
      },
      {
        "pergunta": "Preciso levar monitor, teclado e mouse?",
        "resposta": "Não. Na coleta levamos apenas o gabinete e os cabos necessários, salvo quando o sintoma envolve justamente a imagem ou os periféricos."
      }
    ]
  },
  {
    "path": "/equipamentos/impressora",
    "title": "Impressora com problema: instalação e rede | O Técnico de Informática",
    "description": "Impressora que some da rede, não imprime, imprime falhado ou não conecta no Wi-Fi. Veja causas reais, o que checar antes e qual atendimento resolve.",
    "h1": "Impressora: instalação, rede e falhas que travam o trabalho",
    "subtitulo": "Boa parte dos chamados de impressora não é defeito do aparelho: é rede, driver ou fila de impressão. Separar isso antes evita assistência desnecessária — e evita também o oposto, insistir em software quando o problema é mecânico.",
    "blocos": [
      {
        "titulo": "Sintomas mais comuns nesse equipamento",
        "paragrafos": [
          "Some da rede depois de um tempo: Quase sempre é IP dinâmico: o roteador entrega um endereço novo e o computador continua procurando o antigo. Fixar o endereço resolve de forma definitiva.",
          "Manda imprimir e nada acontece: Fila travada, spooler parado ou impressora padrão errada. É um dos casos mais rápidos de resolver remotamente.",
          "Imprime com falhas, riscos ou borrado: Cabeça de impressão entupida, cartucho no fim, papel inadequado ou cilindro desgastado. Aqui a origem é física e a limpeza correta depende da tecnologia do aparelho.",
          "Não conecta no Wi-Fi: Muitos modelos só operam em 2.4 GHz. Quando a rede está unificada em 5 GHz, a impressora simplesmente não enxerga o sinal — e o ajuste é no roteador, não na impressora.",
          "Funciona em um computador e no outro não: Driver diferente, perfil de rede como pública ou compartilhamento desligado. A rede é o objeto do diagnóstico, não o aparelho."
        ]
      },
      {
        "titulo": "O que é verificado na avaliação",
        "paragrafos": [
          "Endereço IP da impressora e reserva no roteador para evitar troca de endereço.",
          "Estado da fila e do serviço de impressão em cada computador envolvido.",
          "Driver correto para o modelo e para a versão do sistema.",
          "Banda de Wi-Fi disponível (2.4 GHz) e qualidade do sinal no local do aparelho.",
          "Teste de impressão direto pelo painel do aparelho para separar hardware de rede."
        ]
      },
      {
        "titulo": "O que evitar antes do atendimento",
        "paragrafos": [
          "Reinstalar o driver várias vezes: acumula filas e impressoras duplicadas.",
          "Limpar cabeça de impressão com produtos improvisados.",
          "Forçar papel preso puxando contra o sentido do mecanismo.",
          "Trocar cartucho por suspeita quando o teste do painel ainda não foi feito."
        ]
      },
      {
        "titulo": "Como o atendimento acontece",
        "paragrafos": [
          "Remoto: Instalação, driver, fila de impressão, compartilhamento e configuração de rede — cobre a maioria dos chamados.",
          "Visita técnica: Configuração no local, ponto de rede, mais de um computador envolvido ou verificação física do aparelho, sem compromisso de execução.",
          "Coleta e entrega: Quando o caso é mecânico e exige bancada. Buscamos e devolvemos o equipamento — não atendemos em balcão."
        ]
      }
    ],
    "faq": [
      {
        "pergunta": "Dá para resolver impressora sem ninguém ir até o local?",
        "resposta": "Na maior parte dos casos, sim. Instalação, driver, fila e compartilhamento são resolvidos por acesso remoto; só sai visita quando o problema envolve cabeamento, mais de um ponto ou parte mecânica."
      },
      {
        "pergunta": "Por que a impressora para de funcionar toda semana?",
        "resposta": "Normalmente porque o endereço de rede muda a cada reinício do roteador. Com reserva de IP e configuração correta do driver, o problema deixa de se repetir."
      },
      {
        "pergunta": "Vocês configuram impressora para vários computadores da empresa?",
        "resposta": "Sim. Mapeamos os pontos, padronizamos o driver e deixamos o acesso funcionando em cada estação, com registro do que foi configurado."
      },
      {
        "pergunta": "Compensa consertar impressora ou trocar?",
        "resposta": "Depende do custo da peça em relação ao aparelho. Em modelos de entrada, muitas vezes a troca é mais racional — e dizemos isso mesmo quando significa não executar o reparo."
      }
    ]
  },
  {
    "path": "/equipamentos/roteador",
    "title": "Roteador e Wi-Fi: cobertura e quedas | O Técnico de Informática",
    "description": "Roteador com sinal fraco, quedas ou configuração errada derruba a internet inteira. Veja o que checar, o que resolve de verdade e qual atendimento indicar.",
    "h1": "Roteador e rede Wi-Fi: cobertura, quedas e configuração",
    "subtitulo": "O roteador é o equipamento que mais recebe culpa indevida e o que menos costuma ser configurado corretamente. Antes de trocar aparelho ou aumentar o plano, vale entender se o problema é cobertura, interferência, configuração ou o próprio link da operadora.",
    "blocos": [
      {
        "titulo": "Sintomas mais comuns nesse equipamento",
        "paragrafos": [
          "Sinal fraco longe do aparelho: Cobertura, não velocidade. Parede de concreto, laje, espelho e caixa metálica atenuam o sinal — a solução passa por posicionamento, repetidor cabeado ou malha mesh.",
          "Cai e volta várias vezes por dia: Pode ser interferência de canal, superaquecimento do aparelho, fonte enfraquecida ou instabilidade do link. Cada hipótese tem um teste próprio.",
          "Velocidade muito abaixo do contratado: Medição no cabo e no Wi-Fi mostra onde a perda acontece. Roteador antigo limitando a banda é frequente em planos que foram aumentados sem trocar o equipamento.",
          "Muitos aparelhos conectados e tudo trava: Roteador de entrega da operadora costuma ter limite prático bem menor do que o anunciado. Em casa cheia ou escritório, a saída é distribuir a carga entre bandas e pontos.",
          "Conecta mas 'sem internet': Falha entre roteador e provedor: DNS, IP, modo do modem ou cabo de entrada. O aparelho que reclama não é o culpado."
        ]
      },
      {
        "titulo": "O que é verificado na avaliação",
        "paragrafos": [
          "Medição de velocidade no cabo e no Wi-Fi, em pontos diferentes do imóvel.",
          "Análise de canais e interferência de redes vizinhas.",
          "Separação ou unificação de bandas conforme os aparelhos existentes.",
          "Firmware, senha, DNS e modo de operação do roteador.",
          "Mapa simples de cobertura para indicar onde um ponto adicional resolve."
        ]
      },
      {
        "titulo": "O que evitar antes do atendimento",
        "paragrafos": [
          "Instalar repetidor no ponto onde o sinal já é ruim — ele repete o sinal ruim.",
          "Esconder o roteador dentro de armário, atrás da TV ou no chão.",
          "Aumentar o plano antes de confirmar que a perda não é de cobertura.",
          "Trocar senha e configurações no aparelho sem registrar o que foi alterado."
        ]
      },
      {
        "titulo": "Como o atendimento acontece",
        "paragrafos": [
          "Remoto: Configuração, senha, DNS, canais e ajustes do roteador quando há alguma conexão funcionando.",
          "Visita técnica: Medição de cobertura no local, reposicionamento, cabeamento e instalação de pontos adicionais. Inspeção e diagnóstico sem compromisso de execução; peças não inclusas.",
          "Projeto de rede: Casa grande, sobrado ou escritório: levantamento, definição de pontos e implantação de rede mesh ou cabeada com validação de desempenho."
        ]
      }
    ],
    "faq": [
      {
        "pergunta": "Repetidor ou mesh: o que é melhor?",
        "resposta": "Mesh mantém a mesma rede e faz a transição entre pontos de forma transparente; repetidor simples divide a banda e costuma criar uma segunda rede. Em imóvel com mais de um pavimento, mesh com ponto cabeado é o que entrega resultado consistente."
      },
      {
        "pergunta": "Trocar o roteador da operadora resolve?",
        "resposta": "Resolve quando o aparelho é o gargalo, o que acontece bastante em planos que subiram sem troca de equipamento. Se o problema for cobertura, trocar o roteador melhora pouco — a medição mostra qual é o caso."
      },
      {
        "pergunta": "Vocês configuram rede para escritório?",
        "resposta": "Sim. Levantamos os pontos, definimos cobertura, separamos rede de visitantes e documentamos as configurações aplicadas para a empresa não ficar dependente de memória de ninguém."
      },
      {
        "pergunta": "Preciso trocar de plano de internet?",
        "resposta": "Só depois de medir. Na maior parte dos atendimentos o plano entrega o contratado no cabo e a perda acontece no Wi-Fi — nesse cenário aumentar o plano não muda nada."
      }
    ]
  }
];
