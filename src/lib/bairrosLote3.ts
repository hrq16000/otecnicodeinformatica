// ─────────────────────────────────────────────────────────────
// MICRO-RODADA LOCAL 1 — LOTE 3 DE BAIRROS ÂNCORA.
// 4 rotas JÁ EXISTENTES em /bairros/* que estavam com conteúdo raso
// (template com topônimo trocado e promessa de tempo de deslocamento).
// Nenhuma rota nova. Conteúdo autoral por bairro.
// Proibido nesta camada: unidade/oficina no bairro, técnico residente,
// endereço, tempo de chegada, distância em km, volume de clientes,
// avaliação local, SLA ou parceiro exclusivo.
// A indexabilidade é decidida em src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_3: Record<string, BairroLocalData> = {
  // ── XAXIM (Curitiba) ────────────────────────────────────────
  xaxim: {
    slug: "xaxim",
    nome: "Xaxim",
    nomeLocativo: "no Xaxim",
    cidade: "Curitiba",
    areaName: "Xaxim, Curitiba",
    metaTitle: "Informática no Xaxim: notebook, PC e Wi-Fi | Curitiba",
    metaDescription:
      "Atendimento de informática no Xaxim, em Curitiba: notebook lento, PC que trava, formatação com backup e Wi-Fi que não cobre a casa. Triagem pelo WhatsApp.",
    h1: "Atendimento de informática no Xaxim – Curitiba",
    subtitulo:
      "Bairro de casas e sobrados onde a maior parte dos chamados começa com uma máquina de uso diário que ficou lenta — e nem sempre precisa de peça nova.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Xaxim, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Xaxim é uma região majoritariamente residencial de Curitiba, com casas, sobrados e prédios baixos, e é isso que define o perfil dos chamados que chegam daqui. Quase sempre existe um único computador que sustenta tudo ao mesmo tempo: trabalho de quem ficou em home office, tarefa escolar, acesso bancário e streaming. Quando essa máquina fica lenta ou trava, a casa inteira sente, e a pressa costuma levar a decisões ruins — comprar peça sem diagnóstico, reinstalar sistema sem backup ou aceitar orçamento por telefone.",
      "Por isso, o atendimento aqui começa por conversa e não por deslocamento. Na triagem pelo WhatsApp descrevemos junto o que a máquina faz, há quanto tempo, se o problema aparece só em um programa ou o tempo todo, e se o equipamento já foi aberto antes. Muita coisa nesse perfil de chamado é resolvida remotamente; o que sobra vira visita ou coleta, com a avaliação sempre antes do valor.",
    ],
    contextoLocal: [
      "O caso mais frequente no bairro é o computador de mesa ou notebook com cinco anos ou mais, disco mecânico e sistema nunca reinstalado. Nessa combinação, a lentidão não é sintoma de vírus na maioria das vezes: é o disco não dando conta das leituras que o Windows atual exige. A verificação começa pela saúde do armazenamento e pelo consumo de memória em uso real, porque trocar por SSD sem antes confirmar isso é gastar dinheiro no palpite de outra pessoa.",
      "O segundo bloco de chamados é de rede. Casa com laje, cômodos nos fundos e edícula faz o sinal cair justamente onde alguém trabalha ou estuda. Antes de indicar repetidor, medimos onde o sinal enfraquece de fato e verificamos se o roteador do provedor está em um canto sem circulação, atrás da TV ou dentro de armário. Em boa parte dos casos, mudar o ponto e ajustar a configuração já muda a experiência sem compra de equipamento.",
      "Aparece também, com regularidade, o notebook que desliga sozinho depois de alguns minutos ligado. Em máquina usada em casa, com tapete, cama ou sofá bloqueando a entrada de ar, o superaquecimento tem causa mecânica: dissipador saturado e pasta térmica ressecada. Esse caso é de bancada, não de reinstalação de sistema.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando problema de disco, de sistema e de rede",
      "Teste remoto quando a máquina liga e conecta à internet",
      "Diagnóstico antes do valor; execução somente após sua aprovação",
      "Backup conferido antes de qualquer formatação",
    ],
    atendimentoLocal: [
      "Computador lento em uso doméstico, com avaliação de disco e memória",
      "Configuração de roteador e ajuste de cobertura de Wi-Fi na casa",
      "Formatação com salvamento de arquivos e reinstalação de programas essenciais",
      "Remoção de pop-ups, extensões e programas indesejados no navegador",
    ],
    coletaBancada: [
      "Notebook que desliga por superaquecimento e precisa de limpeza interna",
      "Troca de SSD ou de memória em desktop antigo",
      "Tela, dobradiça ou teclado de notebook com dano físico",
    ],
    publicoAtendido: [
      "Famílias com um computador compartilhado por vários usuários",
      "Home office montado em quarto ou sala de casa",
      "Estudantes com notebook de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/manutencao-de-notebook",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "Como separar lentidão de disco, de memória e de software antes de comprar peça." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "O que testar quando o sinal cai só em parte da casa." },
      { to: "/problemas/computador-esquentando", label: "Computador esquentando", desc: "Sinais de superaquecimento que indicam limpeza interna e troca de pasta térmica." },
    ],
    faqLocal: [
      { question: "Meu PC no Xaxim ficou lento. Preciso trocar de computador?", answer: "Na maior parte dos casos, não. Antes disso verificamos a saúde do disco, o uso de memória e o estado do sistema. Máquina com disco mecânico costuma responder muito melhor após troca por SSD, e isso é decidido na avaliação, não por telefone." },
      { question: "Dá para resolver sem visita?", answer: "Se o computador liga e conecta à internet, boa parte dos casos de sistema, lentidão por software, configuração e navegador se resolve por acesso remoto. Problema físico — tela, fonte, superaquecimento, disco com falha — precisa de visita ou coleta." },
      { question: "Vocês fazem backup antes de formatar?", answer: "Sim, e conferimos o backup antes de apagar qualquer coisa. Se o disco estiver com falha de leitura, avisamos antes, porque nesse cenário a cópia pode ser parcial e a decisão muda." },
      { question: "O Wi-Fi não chega nos fundos da casa. Vocês resolvem?", answer: "Avaliamos onde o sinal cai, a posição do roteador e o tipo de construção. A indicação pode ser mudança de ponto, ajuste de configuração, repetidor ou cabeamento — só recomendamos equipamento quando o teste mostra que é necessário." },
      { question: "Quanto custa o atendimento no Xaxim?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da modalidade, da complexidade e de peças, e é sempre informado e aprovado por você antes da execução." },
    ],
  },

  // ── SÍTIO CERCADO (Curitiba) ────────────────────────────────
  "sitio-cercado": {
    slug: "sitio-cercado",
    nome: "Sítio Cercado",
    nomeLocativo: "no Sítio Cercado",
    cidade: "Curitiba",
    areaName: "Sítio Cercado, Curitiba",
    metaTitle: "Técnico de informática no Sítio Cercado | Curitiba",
    metaDescription:
      "Sítio Cercado, Curitiba: conserto de notebook, formatação com backup, remoção de vírus e suporte ao PC do comércio de rua. Avaliação antes do valor.",
    h1: "Técnico de informática no Sítio Cercado – Curitiba",
    subtitulo:
      "Região residencial extensa e com muito comércio de rua: aqui a decisão entre remoto, visita e coleta pesa tanto quanto o próprio reparo.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Sítio Cercado, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Sítio Cercado é um dos bairros mais extensos de Curitiba e mistura duas realidades no mesmo endereço: a casa onde o computador é usado por toda a família e o pequeno comércio de rua que depende de uma única máquina para emitir nota, imprimir e acessar sistema. As duas demandas chegam pelo mesmo canal, mas exigem prioridades diferentes — no comércio o que importa é reduzir o tempo de parada, na residência o que importa é não perder arquivo.",
      "Por causa da extensão do bairro, o roteiro de atendimento é combinado por escrito antes de qualquer deslocamento: quem recebe, onde o equipamento está e se a máquina precisa estar ligada quando o técnico chegar. Isso evita visita improdutiva e mantém previsível o custo do deslocamento, que é informado antes e não aparece como surpresa no final.",
    ],
    contextoLocal: [
      "No comércio da região, os chamados mais comuns são impressora que parou de ser reconhecida depois de uma atualização, sistema de emissão que não abre e computador de balcão compartilhado por vários funcionários sem contas separadas. Esse último ponto é o que mais gera reincidência: sem separar usuários, qualquer instalação indevida afeta todo mundo e o mesmo problema volta em semanas.",
      "Nas residências, predominam três situações: notebook usado para estudo que ficou lento, computador com pop-ups e extensões instaladas junto de algum download, e arquivos que sumiram depois de uma limpeza malfeita. Em caso de arquivo apagado, o mais importante é parar de usar o equipamento na hora — continuar gravando sobre o disco reduz muito a chance de recuperação.",
    ],
    logisticaLocal: [
      "Quando o serviço é de bancada — reparo interno, troca de peça, tentativa de recuperação de dados —, a coleta costuma ser melhor do que abrir o equipamento no local. O aparelho sai identificado, o serviço acontece em bancada, com ferramenta adequada, e a devolução é no mesmo endereço, com a peça substituída disponível para conferência.",
      "Para o comércio, combinamos a janela de atendimento fora do pico de movimento sempre que possível, e deixamos claro na triagem quando o caso exige que a máquina fique parada. Se a parada for inevitável, o cliente sabe disso antes de aprovar, e não no meio do expediente.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com definição de modalidade antes do deslocamento",
      "Combinação prévia de acesso, horário e responsável no local",
      "Diagnóstico antes do valor; nada é executado sem sua aprovação",
      "Resumo por escrito do que foi encontrado e do que foi feito",
    ],
    atendimentoLocal: [
      "Computador de balcão que não abre o sistema ou a impressora",
      "Separação de usuários e organização do PC compartilhado",
      "Remoção de vírus, pop-ups e sequestro de navegador",
      "Formatação com backup conferido e reinstalação de programas de trabalho",
    ],
    coletaBancada: [
      "Notebook que não liga, não dá imagem ou reinicia sozinho",
      "Tentativa de recuperação de arquivos em disco com falha",
      "Troca de fonte, dobradiça, teclado ou armazenamento",
    ],
    publicoAtendido: [
      "Comércio de rua com uma ou duas estações de trabalho",
      "Famílias com computador compartilhado",
      "Autônomos que emitem documento fiscal em casa",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/remocao-de-virus",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
      "/servicos/suporte-tecnico-empresarial",
    ],
    problemasRelacionados: [
      { to: "/problemas/impressora-nao-imprime", label: "Impressora não imprime", desc: "Verificações antes de trocar cabo, driver ou equipamento." },
      { to: "/problemas/arquivos-apagados", label: "Arquivos apagados", desc: "O que fazer nos primeiros minutos para não reduzir a chance de recuperação." },
    ],
    faqLocal: [
      { question: "Atendem o comércio do Sítio Cercado?", answer: "Sim. Damos suporte ao computador de balcão, à impressora e à rede de pequenos comércios, com foco em reduzir o tempo de parada. A janela de atendimento é combinada na triagem." },
      { question: "Apaguei arquivos importantes. Ainda dá para recuperar?", answer: "Depende do que aconteceu depois. Pare de usar o equipamento imediatamente: cada gravação nova reduz a chance de recuperação. A tentativa é feita em bancada e não tem garantia de resultado — isso é dito antes, não depois." },
      { question: "Preciso levar o equipamento até vocês?", answer: "Não. Quando o caso é de bancada, agendamos coleta e devolvemos no mesmo endereço. Não mantemos ponto de atendimento fixo nessa região, e não anunciamos endereço que não temos." },
      { question: "Vocês configuram o PC compartilhado da loja?", answer: "Sim. Criamos contas separadas, ajustamos permissões e organizamos o que cada usuário pode instalar. É a medida que mais reduz reincidência em máquina usada por várias pessoas." },
      { question: "Como sei o valor antes de aprovar?", answer: "O valor é apresentado após a avaliação técnica, com o que foi encontrado explicado em linguagem clara. A partir de R$ 99,99 quando aplicável; peças e deslocamento, quando houver, entram informados separadamente." },
    ],
  },

  // ── AVIAÇÃO (São José dos Pinhais) ──────────────────────────
  aviacao: {
    slug: "aviacao",
    nome: "Aviação",
    nomeLocativo: "no bairro Aviação",
    cidade: "São José dos Pinhais",
    areaName: "Aviação, São José dos Pinhais",
    metaTitle: "Suporte de informática no Aviação | São José dos Pinhais",
    metaDescription:
      "Bairro Aviação, São José dos Pinhais: suporte a estações de trabalho, rede, impressora e notebook para empresas e residências. Triagem antes do deslocamento.",
    h1: "Suporte de informática no bairro Aviação – São José dos Pinhais",
    subtitulo:
      "Perfil misto, com atividade comercial e logística ao redor da região aeroportuária: aqui a conversa começa pelo impacto da parada, não pelo equipamento.",
    whatsappMessage:
      "Olá! Preciso de suporte de informática no bairro Aviação, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O bairro Aviação, em São José dos Pinhais, tem perfil diferente das áreas puramente residenciais da cidade: convive com atividade comercial, prestadores e operações ligadas ao entorno aeroportuário. Isso muda a pergunta inicial do atendimento. Em vez de começar por 'qual é o defeito', começamos por 'o que para de funcionar enquanto esse equipamento estiver fora do ar' — é essa resposta que define se o caso vai para acesso remoto imediato, visita agendada ou coleta.",
      "Existe também demanda residencial no bairro, com notebook de uso doméstico, computador de estudo e rede de casa. As duas frentes são atendidas pelo mesmo processo: triagem por WhatsApp, avaliação técnica antes do valor e execução somente após aprovação.",
    ],
    contextoLocal: [
      "Em ambiente de trabalho, os chamados mais recorrentes são estação que não conecta ao sistema, impressora compartilhada que sumiu da rede e máquina que travou depois de atualização. Nenhum desses casos exige, por padrão, formatação: a maioria se resolve verificando serviço, credencial, driver e configuração de rede. Reinstalar sistema por reflexo custa tempo de parada que ninguém precisava perder.",
      "Em uso doméstico, o padrão é o mesmo do restante da cidade — disco antigo, sistema sobrecarregado de programas de inicialização e Wi-Fi mal posicionado. A diferença é operacional: como parte dos chamados do bairro é de horário comercial apertado, definimos por escrito quanto tempo o equipamento pode ficar indisponível antes de escolher a modalidade.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp começando pelo impacto da parada",
      "Tentativa de resolução remota quando a máquina liga e conecta",
      "Visita ou coleta agendada com janela combinada por escrito",
      "Diagnóstico antes do valor, com aprovação registrada",
    ],
    atendimentoLocal: [
      "Estação de trabalho que não acessa sistema, pasta ou impressora de rede",
      "Reconfiguração de rede local e do roteador após troca de provedor",
      "Manutenção preventiva em máquinas ligadas o dia inteiro",
      "Suporte pontual a notebook de uso profissional",
    ],
    coletaBancada: [
      "Desktop que não liga ou desarma o disjuntor ao ser ligado",
      "Notebook com dano físico em tela, conector de carga ou teclado",
      "Substituição de armazenamento com migração do sistema",
    ],
    publicoAtendido: [
      "Pequenas empresas e prestadores com poucas estações",
      "Profissionais que trabalham de casa em horário comercial",
      "Residências com computador de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-computador",
      "/servicos/upgrade-ssd-ram",
    ],
    problemasRelacionados: [
      { to: "/problemas/windows-nao-inicia", label: "Windows não inicia", desc: "Sequência de verificação antes de partir para reinstalação." },
      { to: "/problemas/wifi-instavel", label: "Wi-Fi instável", desc: "Quando o problema é o roteador e quando é a rede do provedor." },
    ],
    faqLocal: [
      { question: "Vocês atendem empresa no bairro Aviação?", answer: "Sim, com suporte pontual ou recorrente para estações, impressoras e rede local. A triagem começa pelo impacto da parada para definir a ordem de atendimento e a modalidade." },
      { question: "Dá para resolver sem parar o expediente?", answer: "Quando a máquina liga e conecta, boa parte dos casos de sistema, permissão e rede é resolvida por acesso remoto, sem deslocamento. Se a parada for inevitável, avisamos antes da aprovação." },
      { question: "Vocês têm escritório no bairro?", answer: "Não. O atendimento é agendado e acontece no seu endereço, por acesso remoto ou com coleta para bancada. Não anunciamos unidade, endereço ou técnico fixo no bairro." },
      { question: "Fazem manutenção preventiva?", answer: "Sim. Em máquinas ligadas o dia inteiro, a preventiva costuma envolver limpeza interna, verificação térmica, checagem da saúde do disco e revisão de backup — decidido conforme o parque de equipamentos." },
      { question: "Como funciona o valor para empresa?", answer: "A avaliação vem primeiro. Depois apresentamos o valor por atendimento ou por escopo, conforme o caso, sempre aprovado antes da execução. Diária técnica e serviço pontual são coisas diferentes e são informados separadamente." },
    ],
  },

  // ── OURO FINO (São José dos Pinhais) ────────────────────────
  "ouro-fino-sjp": {
    slug: "ouro-fino-sjp",
    nome: "Ouro Fino",
    nomeLocativo: "no Ouro Fino",
    cidade: "São José dos Pinhais",
    areaName: "Ouro Fino, São José dos Pinhais",
    metaTitle: "Conserto de notebook e PC no Ouro Fino | São José dos Pinhais",
    metaDescription:
      "Ouro Fino, São José dos Pinhais: notebook que não liga, PC travando, formatação com backup e melhoria de Wi-Fi em casa. Avaliação antes de informar valor.",
    h1: "Conserto de notebook e computador no Ouro Fino – São José dos Pinhais",
    subtitulo:
      "Bairro residencial de São José dos Pinhais: a maior parte dos chamados é de equipamento doméstico usado todos os dias, com histórico de manutenção antigo.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Ouro Fino, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Ouro Fino é uma região residencial de São José dos Pinhais, e o que chega daqui reflete isso: notebook de família, computador de mesa antigo que ninguém quer trocar ainda e rede doméstica montada com o que o provedor deixou instalado. Não é um recorte corporativo, e o atendimento não finge que é — a prioridade é preservar arquivo, recuperar velocidade de uso e evitar gasto desnecessário com peça.",
      "A triagem por WhatsApp existe justamente para isso. Antes de qualquer deslocamento, entendemos o que a máquina faz, o que mudou recentemente e se existe arquivo importante sem cópia. Muitos casos aqui terminam em orientação simples ou acesso remoto; os que exigem abrir o equipamento seguem para bancada, com coleta agendada.",
    ],
    contextoLocal: [
      "Três situações concentram os chamados residenciais do bairro. A primeira é o notebook que não liga ou liga e apaga: pode ser fonte, bateria, conector de carga ou placa, e a diferença entre elas só aparece em teste, nunca em suposição por telefone. A segunda é o computador que começou a travar depois de anos sem manutenção, quase sempre com disco no fim da vida útil. A terceira é o Wi-Fi que só funciona bem no cômodo onde o roteador está.",
      "Existe ainda um cenário frequente e delicado: a máquina que guarda foto de família, documento e trabalho sem nenhuma cópia. Quando o disco já dá sinal de falha — lentidão extrema, travamento com barulho, arquivos que somem —, a primeira ação é tentar copiar os dados antes de qualquer reparo. Formatar primeiro e pensar depois é o erro mais caro nesse tipo de chamado.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com perguntas sobre o que mudou antes do defeito",
      "Prioridade para preservar arquivos quando há suspeita de falha de disco",
      "Diagnóstico antes do valor; execução somente após sua aprovação",
      "Peça substituída disponível para conferência na devolução",
    ],
    atendimentoLocal: [
      "Computador doméstico travando ou reiniciando durante o uso",
      "Formatação com backup conferido antes de apagar qualquer coisa",
      "Configuração de roteador e melhoria de cobertura de Wi-Fi na casa",
      "Orientação sobre golpe, pop-up e pedido de pagamento para 'liberar' o PC",
    ],
    coletaBancada: [
      "Notebook que não liga, não carrega ou apaga sozinho",
      "Cópia de dados de disco com sinal de falha, antes de qualquer reparo",
      "Troca de armazenamento, memória ou fonte em desktop",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/recuperacao-de-dados",
      "/servicos/formatacao",
      "/servicos/redes-e-wifi",
    ],
    problemasRelacionados: [
      { to: "/problemas/notebook-nao-liga", label: "Notebook não liga", desc: "Testes que separam fonte, bateria, conector e placa." },
      { to: "/problemas/hd-fazendo-barulho", label: "HD fazendo barulho", desc: "Por que desligar o equipamento é a atitude mais importante nesse caso." },
      { to: "/problemas/computador-lento", label: "Computador lento", desc: "O que verificar antes de decidir por formatação ou troca de peça." },
    ],
    faqLocal: [
      { question: "Meu notebook não liga. Vale a pena consertar?", answer: "Depende da causa e do valor da peça diante do equipamento. Por isso o teste vem primeiro: identificamos se é fonte, bateria, conector de carga ou placa e explicamos o que cada caminho custa antes de você decidir." },
      { question: "O disco está fazendo barulho. O que faço agora?", answer: "Desligue o equipamento e não tente reinstalar nada. Disco com ruído mecânico pode piorar a cada minuto ligado. A tentativa de cópia dos dados é feita em bancada e sempre antes de qualquer reparo." },
      { question: "Vocês atendem em casa no Ouro Fino?", answer: "Sim, quando o caso permite avaliação e reparo no local. Serviço interno, troca de peça e tentativa de recuperação de dados são feitos em bancada, com coleta agendada e devolução no mesmo endereço." },
      { question: "Recebi um aviso pedindo pagamento para liberar o computador. É golpe?", answer: "Quase sempre é. Não pague e não instale o que a mensagem pedir. Descreva a tela na triagem pelo WhatsApp: verificamos o caso com segurança antes de qualquer serviço." },
      { question: "Existe garantia do serviço?", answer: "A mão de obra do serviço executado tem 90 dias de garantia no mesmo defeito tratado. Peças seguem a garantia do fornecedor ou fabricante, informada antes da aprovação." },
    ],
  },
};
