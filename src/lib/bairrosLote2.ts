// ─────────────────────────────────────────────────────────────
// RODADA 5E — LOTE 2 DE BAIRROS ÂNCORA (Curitiba + São José dos Pinhais).
// Nenhuma rota nova: todos os slugs abaixo já existiam em /bairros/*.
// Conteúdo autoral por bairro. Proibido nesta camada: unidade/oficina no
// bairro, técnico residente, tempo de deslocamento, distância em km,
// volume de clientes, avaliação ou SLA específico.
// A indexabilidade é decidida exclusivamente por src/lib/localIndexPolicy.json.
// ─────────────────────────────────────────────────────────────
import type { BairroLocalData } from "@/lib/bairrosData";

export const BAIRROS_LOTE_2: Record<string, BairroLocalData> = {
  // ── SANTA FELICIDADE (Curitiba) ─────────────────────────────
  "santa-felicidade": {
    slug: "santa-felicidade",
    nome: "Santa Felicidade",
    nomeLocativo: "em Santa Felicidade",
    cidade: "Curitiba",
    areaName: "Santa Felicidade, Curitiba",
    metaTitle: "Técnico de Informática em Santa Felicidade | Curitiba",
    metaDescription:
      "Informática em Santa Felicidade, Curitiba: Wi-Fi que não cobre a casa toda, manutenção de computador, formatação e suporte ao comércio. Triagem pelo WhatsApp.",
    h1: "Atendimento de informática em Santa Felicidade – Curitiba",
    subtitulo:
      "Terrenos e casas maiores mudam o projeto de rede: aqui a conversa começa pelo alcance do Wi-Fi e pelo que realmente precisa de visita.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática em Santa Felicidade, Curitiba. Pode me orientar?",
    introducaoLocal: [
      "Santa Felicidade é uma região de casas com mais área construída, muros altos e imóveis com dois pavimentos ou edícula nos fundos. Esse formato tem consequência direta em informática: o roteador entregue pelo provedor costuma ficar no cômodo onde o cabo entrou e não alcança o restante da casa. Boa parte dos chamados que chegam daqui começa como 'internet ruim' e termina como projeto de cobertura de rede, não como defeito de computador.",
      "A outra metade da demanda vem do comércio da região, com restaurantes, lojas e prestadores que dependem de um único computador para emitir documento fiscal, imprimir e acessar sistema. Nesse caso, o objetivo do atendimento é reduzir o tempo de parada: primeiro entender pelo WhatsApp se dá para resolver remotamente, depois decidir entre visita e coleta.",
    ],
    contextoLocal: [
      "Nas residências, os pedidos mais comuns são de cobertura de sinal em cômodo distante, computador de mesa antigo com disco mecânico e notebook de estudo que ficou lento depois de anos sem manutenção. Em casa grande, repetidor colocado no lugar errado costuma piorar a experiência: o aparelho conecta no sinal fraco e mantém a conexão ruim mesmo perto de um ponto melhor. A avaliação verifica onde o sinal cai de fato antes de indicar equipamento.",
      "No comércio, o padrão muda para impressora que parou de ser reconhecida, sistema que não abre depois de atualização e máquina compartilhada por vários funcionários sem separação de usuários. Esse último ponto é o que mais gera reincidência: sem contas separadas, qualquer instalação indevida vira problema de todo mundo.",
    ],
    logisticaLocal: [
      "Casa com portão fechado e cachorro solto é detalhe operacional, não curiosidade: combinamos pelo WhatsApp quem recebe o técnico e onde o equipamento estará ligado, para que a avaliação comece assim que a porta abre. Quando o serviço envolve cabeamento ou passagem entre pavimentos, avisamos antes que o tempo em campo é maior.",
      "Quando o caso é de bancada — reparo interno, troca de peça, tentativa de recuperação de dados — a coleta costuma ser melhor do que abrir o equipamento no local. O equipamento sai identificado, o serviço é executado em bancada e a devolução acontece no mesmo endereço, com a peça trocada disponível para conferência.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp separando problema de rede de problema de máquina",
      "Teste de cobertura de sinal antes de indicar repetidor ou mesh",
      "Diagnóstico antes do valor; execução só após sua aprovação",
      "Registro do que foi feito, para o histórico ficar com você",
    ],
    atendimentoLocal: [
      "Ajuste de Wi-Fi e cobertura em casas de dois pavimentos",
      "Instalação e configuração de roteador, repetidor ou mesh",
      "Formatação com backup conferido antes",
      "Suporte ao computador de balcão do comércio da região",
    ],
    coletaBancada: [
      "Troca de SSD ou memória em desktop antigo",
      "Notebook que não liga ou desliga sozinho por superaquecimento",
      "Tentativa de recuperação de arquivos em disco com falha",
    ],
    publicoAtendido: [
      "Famílias com mais de um computador em casa",
      "Home office em imóvel amplo, com sinal irregular",
      "Comércio de bairro com uma ou duas estações de trabalho",
    ],
    servicosPrioritarios: [
      "/servicos/redes-e-wifi",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
    ],
    servicosCidade: [
      {
        to: "/servicos/redes-wifi/curitiba",
        label: "Redes e Wi-Fi em Curitiba",
        desc: "Como funciona a visita para rede e Wi-Fi na cidade.",
      },
    ],
    faqLocal: [
      {
        question: "Meu Wi-Fi não chega no segundo andar. Isso é resolvido em visita?",
        answer:
          "Normalmente sim, mas depende do imóvel. A visita mede onde o sinal cai e testa posicionamento antes de indicar repetidor, mesh ou cabo até um segundo ponto. Só indicamos equipamento quando o teste mostra que ele resolve.",
      },
      {
        question: "Vocês atendem o comércio de Santa Felicidade?",
        answer:
          "Sim, para computador de balcão, impressora e rede local. A prioridade é reduzir a parada: tentamos remoto primeiro quando o sintoma permite e, se não resolver, combinamos visita.",
      },
      {
        question: "Preciso comprar o roteador antes de chamar?",
        answer:
          "Não. Compre depois da avaliação. Comprar antes é o erro mais comum: em muitos casos o aparelho atual serve e o problema está no posicionamento ou na configuração.",
      },
      {
        question: "Dá para resolver sem levar o computador?",
        answer:
          "Muitos casos sim — formatação, limpeza de sistema e configuração podem ser feitos no local. Reparo interno e recuperação de dados são serviços de bancada e seguem por coleta, com sua aprovação.",
      },
    ],
  },

  // ── BOA VISTA (Curitiba) ────────────────────────────────────
  "boa-vista": {
    slug: "boa-vista",
    nome: "Boa Vista",
    nomeLocativo: "na Boa Vista",
    cidade: "Curitiba",
    areaName: "Boa Vista, Curitiba",
    metaTitle: "Técnico de Informática na Boa Vista | Curitiba",
    metaDescription:
      "Informática na Boa Vista, Curitiba: manutenção de computador, formatação, remoção de vírus e suporte a consultórios e escritórios. Diagnóstico antes do valor.",
    h1: "Atendimento de informática na Boa Vista – Curitiba",
    subtitulo:
      "Região residencial extensa, com consultórios e escritórios pequenos misturados às ruas de casas. A triagem define se o caso é remoto, visita ou bancada.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática na Boa Vista, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "A Boa Vista é um bairro grande e majoritariamente residencial, com ruas de casas intercaladas por consultórios, clínicas pequenas e escritórios de profissionais liberais. Essa mistura produz dois perfis de chamado bem diferentes: o computador de casa que ficou lento com o tempo e a máquina de trabalho que não pode parar porque roda o sistema de agendamento e os prontuários.",
      "Em ambos, o caminho é o mesmo: descrever o sintoma pelo WhatsApp, receber as primeiras orientações e só então definir a modalidade. O que muda é a prioridade — em consultório, a primeira pergunta é sempre onde estão os dados e se existe cópia recente.",
    ],
    contextoLocal: [
      "Nos atendimentos residenciais do bairro predominam lentidão por disco mecânico, sistema cheio de programas iniciando junto com o Windows e navegador com extensões instaladas sem intenção. Nesses casos, medir antes de trocar peça evita gasto desnecessário: às vezes o ganho vem da limpeza de inicialização, às vezes só o SSD resolve de verdade.",
      "Nos consultórios e escritórios, o que aparece com frequência é backup inexistente ou nunca testado, sistema de gestão travando após atualização e impressora compartilhada que deixa de responder quando o computador principal é desligado. Antes de qualquer formatação em máquina de trabalho, conferimos a cópia dos dados junto com você.",
    ],
    logisticaLocal: [
      "Em consultório, o horário importa mais do que o endereço: combinamos a avaliação na janela em que a agenda está livre, para não interromper atendimento. Quando existe sistema de terceiros envolvido, pedimos antes o contato do suporte do software, porque parte das falhas depende de liberação do fornecedor.",
      "Serviços que exigem abrir o equipamento são feitos em bancada. A retirada é combinada, o equipamento sai identificado e a devolução ocorre no mesmo endereço. Em máquina com dados sensíveis, o procedimento inclui registro do que foi acessado e devolução de qualquer mídia envolvida.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com pergunta sobre backup logo no início",
      "Medição do gargalo real antes de indicar troca de peça",
      "Diagnóstico técnico antes de informar o valor",
      "Agendamento na janela livre da agenda, quando for consultório",
    ],
    atendimentoLocal: [
      "Remoção de vírus e limpeza de sistema com verificação de reincidência",
      "Formatação com backup conferido antes da execução",
      "Configuração de impressora compartilhada na rede local",
      "Suporte pontual a estação de trabalho de consultório ou escritório",
    ],
    coletaBancada: [
      "Upgrade de SSD e memória com migração do sistema",
      "Falha intermitente que não se reproduz em visita curta",
      "Disco com setores defeituosos e risco de perda de arquivos",
    ],
    publicoAtendido: [
      "Residências com computador de uso diário",
      "Consultórios e clínicas pequenas do bairro",
      "Escritórios de profissionais liberais",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/remocao-de-virus",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    servicosCidade: [
      {
        to: "/servicos/remocao-virus/curitiba",
        label: "Remoção de vírus em Curitiba",
        desc: "Urgência, contenção em rede e decisão entre remoto e visita.",
      },
    ],
    faqLocal: [
      {
        question: "Atendem consultórios e clínicas na Boa Vista?",
        answer:
          "Sim, com suporte pontual à estação de trabalho, à impressora e à rotina de cópia dos dados. O agendamento é combinado para a janela em que a agenda estiver livre.",
      },
      {
        question: "Vocês formatam sem apagar meus arquivos?",
        answer:
          "A formatação apaga o sistema, por isso a cópia dos dados é conferida com você antes. Se não houver espaço ou mídia para o backup, isso é resolvido antes de qualquer execução.",
      },
      {
        question: "Meu computador ficou lento de repente. É vírus?",
        answer:
          "Pode ser, mas nem sempre. Lentidão súbita também aparece por disco em falha, atualização mal concluída ou programa novo consumindo memória. O diagnóstico separa as causas antes de indicar o serviço.",
      },
      {
        question: "O atendimento pode ser remoto?",
        answer:
          "Quando o computador liga e conecta à internet, boa parte dos casos de software é resolvida remotamente. Problemas de hardware, rede física e equipamento que não inicia exigem presença.",
      },
    ],
  },

  // ── BIGORRILHO (Curitiba) ───────────────────────────────────
  bigorrilho: {
    slug: "bigorrilho",
    nome: "Bigorrilho",
    nomeLocativo: "no Bigorrilho",
    cidade: "Curitiba",
    areaName: "Bigorrilho, Curitiba",
    metaTitle: "Técnico de Informática no Bigorrilho | Curitiba",
    metaDescription:
      "Informática no Bigorrilho, Curitiba: notebook de home office, Wi-Fi em apartamento, upgrade de SSD e coleta combinada com a portaria. Diagnóstico a partir de R$ 99,99.",
    h1: "Atendimento de informática no Bigorrilho – Curitiba",
    subtitulo:
      "Bairro verticalizado: aqui o detalhe que mais afeta o atendimento é o acesso ao apartamento e a interferência de Wi-Fi entre unidades.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Bigorrilho, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Bigorrilho é um dos bairros mais verticalizados de Curitiba, com prédios residenciais e salas comerciais no mesmo quarteirão. O perfil de equipamento acompanha: notebook como máquina principal, monitor externo, dock e rede doméstica dividida entre trabalho e streaming. Praticamente todo chamado passa por uma dessas três coisas.",
      "Em prédio, o Wi-Fi tem um problema que casa não tem: dezenas de redes vizinhas competindo pelos mesmos canais. Quando o relato é 'a internet cai só à noite', o primeiro teste é de canal e interferência, não de velocidade contratada.",
    ],
    contextoLocal: [
      "Nos notebooks de home office aparecem com frequência bateria que já não segura carga, teclado com teclas falhando, dock que derruba a conexão do monitor e aquecimento após anos sem limpeza interna. São defeitos que se acumulam devagar e costumam ser confundidos com 'computador velho'.",
      "Do lado da rede, o roteador do provedor instalado atrás da TV, dentro do armário ou no hall de entrada explica boa parte das quedas. Antes de vender equipamento novo, testamos o reposicionamento e a mudança de canal — quando isso não basta, aí sim faz sentido discutir mesh ou ponto cabeado até o escritório.",
    ],
    logisticaLocal: [
      "Em condomínio, o acesso precisa ser combinado antes: nome do técnico liberado na portaria, apartamento, horário e vaga de visitante quando houver. Isso evita a situação clássica de o técnico chegar e não conseguir subir.",
      "A coleta em prédio funciona bem quando é combinada com a portaria e o equipamento é entregue já desconectado, com fonte e acessórios. Registramos o que foi retirado na conversa do WhatsApp, e a devolução acontece pelo mesmo caminho combinado.",
    ],
    operacaoLocal: [
      "Liberação na portaria combinada antes da visita",
      "Teste de canal e interferência antes de sugerir equipamento",
      "Diagnóstico antes do valor, com sua aprovação para executar",
      "Registro por escrito do que foi retirado, quando houver coleta",
    ],
    atendimentoLocal: [
      "Ajuste de Wi-Fi em apartamento com muitas redes vizinhas",
      "Configuração de home office: monitor, dock e periféricos",
      "Formatação e reinstalação limpa do sistema",
      "Limpeza interna e troca de pasta térmica em notebook",
    ],
    coletaBancada: [
      "Upgrade de SSD ou memória em notebook",
      "Troca de tela, teclado ou bateria",
      "Notebook que não liga ou reinicia sozinho",
    ],
    publicoAtendido: [
      "Home office e trabalho híbrido em apartamento",
      "Salas comerciais pequenas do bairro",
      "Estudantes e profissionais com notebook como máquina única",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    servicosCidade: [
      {
        to: "/servicos/conserto-notebook/curitiba",
        label: "Conserto de notebook em Curitiba",
        desc: "Coleta, visita e prazo de bancada na cidade.",
      },
      {
        to: "/servicos/upgrade-ssd/curitiba",
        label: "Upgrade de SSD em Curitiba",
        desc: "Quem fornece a peça, prazo e migração sem formatar.",
      },
    ],
    faqLocal: [
      {
        question: "Como funciona a coleta em prédio?",
        answer:
          "Combinamos horário e liberação com a portaria pelo WhatsApp. O equipamento é entregue desconectado, com fonte, e o que foi retirado fica registrado na conversa. A devolução segue o mesmo combinado.",
      },
      {
        question: "Minha internet cai à noite. É problema do provedor?",
        answer:
          "Nem sempre. Em prédio, o horário de pico junta muitas redes nos mesmos canais. Testamos canal, posicionamento e a conexão com fio antes de concluir que a falha é do provedor.",
      },
      {
        question: "Vale trocar o notebook ou fazer upgrade?",
        answer:
          "Depende do equipamento. Em máquina com processador ainda adequado, SSD e memória mudam bastante a experiência por um custo menor que a troca. Avaliamos e explicamos antes de indicar.",
      },
      {
        question: "Vocês atendem sala comercial no bairro?",
        answer:
          "Sim, para estação de trabalho, impressora e rede local. Chamados recorrentes de empresa são combinados sob consulta, sempre com escopo definido antes.",
      },
    ],
  },

  // ── CABRAL (Curitiba) ───────────────────────────────────────
  cabral: {
    slug: "cabral",
    nome: "Cabral",
    nomeLocativo: "no Cabral",
    cidade: "Curitiba",
    areaName: "Cabral, Curitiba",
    metaTitle: "Técnico de Informática no Cabral | Curitiba",
    metaDescription:
      "Informática no Cabral, Curitiba: suporte a consultórios e escritórios, manutenção de computador, backup e rede de apartamento. Orçamento pelo WhatsApp.",
    h1: "Atendimento de informática no Cabral – Curitiba",
    subtitulo:
      "Consultórios, escritórios pequenos e residências no mesmo quarteirão — a triagem separa o que é urgência de trabalho do que pode esperar.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Cabral, em Curitiba. Pode me orientar?",
    introducaoLocal: [
      "O Cabral concentra consultórios, escritórios de profissionais liberais e prédios residenciais próximos. O efeito prático é que boa parte dos chamados chega com prazo: a máquina que parou é a mesma que emite documento, guarda o histórico do cliente e roda o sistema do dia. Por isso a triagem começa perguntando o que está bloqueado agora.",
      "Quando o equipamento é de trabalho, tratamos primeiro a continuidade — o que dá para destravar hoje — e depois a causa. Essa separação evita a decisão apressada de formatar uma máquina que ainda tinha arquivo sem cópia.",
    ],
    contextoLocal: [
      "Os casos mais comuns em escritório do bairro são sistema de gestão que não abre após atualização, certificado digital que deixou de ser reconhecido, impressora fiscal ou multifuncional fora da rede e computador que ficou lento com o acúmulo de anos de uso. Nenhum deles se resolve bem no escuro: é preciso ver a mensagem de erro real.",
      "Na parte residencial, aparecem notebooks compartilhados por mais de uma pessoa, sem contas separadas, e roteador antigo entregue pelo provedor há vários contratos. Contas separadas e uma configuração de rede feita com calma resolvem uma parte grande das reclamações recorrentes.",
    ],
    logisticaLocal: [
      "Para escritório e consultório, combinamos o horário considerando o expediente: início do dia e fim de tarde costumam permitir mexer na máquina sem interromper atendimento. Quando o problema envolve software de terceiros, pedimos o contato do suporte do fornecedor antes da visita.",
      "Serviços de bancada seguem por coleta com registro do que foi retirado. Em equipamento com dados de clientes, a orientação é conferir a cópia antes da retirada e definir por escrito o que pode ou não ser acessado durante o serviço.",
    ],
    operacaoLocal: [
      "Triagem começa pelo que está bloqueando o trabalho agora",
      "Verificação de cópia dos dados antes de qualquer formatação",
      "Diagnóstico antes do valor e aprovação antes da execução",
      "Escopo por escrito quando o chamado é de empresa",
    ],
    atendimentoLocal: [
      "Suporte a sistema de gestão e certificado digital",
      "Configuração de impressora e digitalização em rede",
      "Rotina de backup em nuvem ou disco externo",
      "Manutenção preventiva da estação de trabalho",
    ],
    coletaBancada: [
      "Upgrade de SSD com migração do sistema em uso",
      "Computador que desliga sozinho sob carga",
      "Tentativa de recuperação de dados de disco com falha",
    ],
    publicoAtendido: [
      "Consultórios e escritórios pequenos",
      "Profissionais liberais com máquina única de trabalho",
      "Residências em prédios do entorno",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-computador",
      "/servicos/recuperacao-de-dados",
      "/servicos/upgrade-ssd-ram",
    ],
    servicosCidade: [
      {
        to: "/servicos/backup-recuperacao/curitiba",
        label: "Backup e recuperação em Curitiba",
        desc: "Coleta, sigilo e devolução combinados na cidade.",
      },
    ],
    faqLocal: [
      {
        question: "Meu sistema de gestão parou depois de uma atualização. Vocês resolvem?",
        answer:
          "Avaliamos o ambiente — sistema operacional, permissões, rede e certificado. Parte das falhas depende de liberação do fornecedor do software; nesse caso, tratamos junto com o suporte dele em vez de reinstalar às cegas.",
      },
      {
        question: "Vocês configuram rotina de backup para o escritório?",
        answer:
          "Sim. Definimos o que precisa de cópia, com que frequência e para onde vai, e testamos a restauração. Backup que nunca foi restaurado não conta como backup.",
      },
      {
        question: "Atendem fora do horário comercial?",
        answer:
          "O agendamento é combinado caso a caso pelo WhatsApp, considerando a agenda disponível. Não prometemos horário antes de confirmar a disponibilidade real.",
      },
      {
        question: "O certificado digital parou de ser reconhecido. É problema do computador?",
        answer:
          "Pode ser driver, navegador, atualização do sistema ou o próprio token. A avaliação testa cada camada antes de indicar reinstalação ou contato com a autoridade certificadora.",
      },
    ],
  },

  // ── AFONSO PENA (São José dos Pinhais) ──────────────────────
  "afonso-pena": {
    slug: "afonso-pena",
    nome: "Afonso Pena",
    nomeLocativo: "no Afonso Pena",
    cidade: "São José dos Pinhais",
    areaName: "Afonso Pena, São José dos Pinhais",
    metaTitle: "Técnico de Informática no Afonso Pena | São José dos Pinhais",
    metaDescription:
      "Informática no Afonso Pena, São José dos Pinhais: suporte a empresas perto do aeroporto, manutenção de computador, rede e backup. Combine pelo WhatsApp.",
    h1: "Atendimento de informática no Afonso Pena – São José dos Pinhais",
    subtitulo:
      "Região com forte presença de empresas e serviços ligados ao aeroporto, somada a ruas residenciais — o atendimento é planejado por janela de agenda.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Afonso Pena, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Afonso Pena, em São José dos Pinhais, é conhecido pela vizinhança do aeroporto e pela presença de empresas de logística, transporte e serviços. Isso puxa a demanda para o lado corporativo: estações de trabalho que operam em turno, impressoras compartilhadas e rede que precisa se manter estável durante o expediente.",
      "Ao mesmo tempo, as ruas residenciais do bairro geram chamados de computador de casa, notebook de estudo e Wi-Fi que não cobre o imóvel inteiro. A triagem pelo WhatsApp serve para saber qual dos dois cenários é o seu antes de deslocar equipe.",
    ],
    contextoLocal: [
      "Em empresa, o que mais aparece é máquina compartilhada entre turnos sem usuários separados, atualização adiada por meses e ausência de cópia dos dados fora do próprio computador. Quando o equipamento falha nesse contexto, o problema deixa de ser técnico e vira operacional: ninguém sabe o que estava salvo só ali.",
      "Nas residências, os pedidos seguem o padrão de bairro extenso: computador antigo com disco mecânico, notebook aquecendo por falta de limpeza interna e roteador posicionado onde o cabo entrou, e não onde o sinal é usado.",
    ],
    logisticaLocal: [
      "Como o bairro é grande e cruzado por vias de tráfego pesado, o agendamento é feito por janela combinada, e não por promessa de chegada imediata. Em empresa, definimos com quem opera o equipamento o horário em que a máquina pode ficar parada.",
      "Quando o serviço é de bancada, a coleta é combinada com retirada e devolução no mesmo endereço em São José dos Pinhais. Para máquina crítica de operação, a orientação é programar a retirada fora do turno de produção.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp identificando se é chamado residencial ou de empresa",
      "Janela de agendamento combinada, sem promessa de tempo de chegada",
      "Diagnóstico antes do valor; execução após sua aprovação",
      "Registro do atendimento por equipamento e setor, quando for empresa",
    ],
    atendimentoLocal: [
      "Suporte a estações de trabalho e impressoras em rede",
      "Configuração de usuários separados em máquina compartilhada",
      "Formatação com backup conferido antes",
      "Ajuste de rede e Wi-Fi em residência ou escritório",
    ],
    coletaBancada: [
      "Reparo interno de desktop e notebook",
      "Upgrade de SSD e memória com migração do sistema",
      "Tentativa de recuperação de dados em disco com falha",
    ],
    publicoAtendido: [
      "Empresas de logística, transporte e serviços do entorno",
      "Escritórios administrativos com poucas estações",
      "Residências do bairro",
    ],
    servicosPrioritarios: [
      "/servicos/suporte-tecnico-empresarial",
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/formatacao",
    ],
    faqLocal: [
      {
        question: "Vocês atendem empresas no Afonso Pena?",
        answer:
          "Sim, com suporte pontual ou recorrente sob consulta a estações de trabalho, impressoras e rede. O escopo é definido antes, e o registro do atendimento fica com a empresa.",
      },
      {
        question: "O técnico vai até São José dos Pinhais ou preciso levar o equipamento?",
        answer:
          "As duas modalidades existem. Visita e coleta são combinadas em São José dos Pinhais conforme o problema; casos de software costumam ser resolvidos remotamente.",
      },
      {
        question: "Em quanto tempo o técnico chega?",
        answer:
          "Não prometemos tempo de chegada. O agendamento é por janela combinada, considerando a agenda do dia e o deslocamento até o bairro.",
      },
      {
        question: "Como funciona o backup em máquina usada por vários funcionários?",
        answer:
          "Primeiro separamos os usuários, depois definimos o que precisa de cópia e para onde vai. O teste de restauração faz parte do serviço — sem ele, não há garantia de que a cópia serve.",
      },
    ],
  },

  // ── CRUZEIRO (São José dos Pinhais) ─────────────────────────
  cruzeiro: {
    slug: "cruzeiro",
    nome: "Cruzeiro",
    nomeLocativo: "no Cruzeiro",
    cidade: "São José dos Pinhais",
    areaName: "Cruzeiro, São José dos Pinhais",
    metaTitle: "Técnico de Informática no Cruzeiro | São José dos Pinhais",
    metaDescription:
      "Assistência de informática no Cruzeiro, São José dos Pinhais: conserto de notebook, formatação, remoção de vírus e Wi-Fi. Diagnóstico antes do valor, com aprovação sua.",
    h1: "Atendimento de informática no Cruzeiro – São José dos Pinhais",
    subtitulo:
      "Bairro residencial com comércio de rua: a maior parte dos chamados é de notebook e computador de casa, com decisão entre remoto, visita e coleta.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Cruzeiro, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Cruzeiro é um bairro predominantemente residencial de São José dos Pinhais, com comércio de rua distribuído entre as quadras. A demanda que chega daqui é sobretudo doméstica: notebook de estudo e trabalho, computador de mesa da família e o roteador único que precisa atender a casa inteira.",
      "Como boa parte desses casos é de software, a triagem tenta primeiro entender se dá para resolver remotamente. Quando o equipamento não liga, quando o problema é físico ou quando a rede precisa ser vista no imóvel, aí a visita faz sentido.",
    ],
    contextoLocal: [
      "Os relatos mais frequentes são de lentidão progressiva, tela com aviso falso pedindo pagamento, arquivos que sumiram depois de uma atualização e notebook desligando ao rodar programas mais pesados. Cada um leva a um caminho diferente: limpeza de sistema, remoção de ameaça, tentativa de recuperação ou limpeza interna com troca de pasta térmica.",
      "Também aparecem impressoras domésticas que param de imprimir após atualização do sistema e TVs e consoles disputando a mesma rede à noite. Ajustar prioridade e posicionamento resolve mais do que trocar o plano de internet.",
    ],
    logisticaLocal: [
      "As visitas no Cruzeiro são combinadas por janela de horário pelo WhatsApp, com confirmação de endereço e de quem estará no local. Quando o problema é de rede, pedimos que o roteador e os aparelhos com queixa estejam acessíveis durante a avaliação.",
      "Quando o caso é de bancada, a coleta é combinada com retirada e devolução no mesmo endereço em São José dos Pinhais. O equipamento sai identificado e a peça substituída fica disponível para conferência na entrega.",
    ],
    operacaoLocal: [
      "Tentativa de solução remota quando o sintoma permite",
      "Visita combinada por janela, com o equipamento acessível",
      "Diagnóstico antes do valor e aprovação antes de executar",
      "Peça substituída disponível para conferência na entrega",
    ],
    atendimentoLocal: [
      "Remoção de vírus e de avisos falsos de bloqueio",
      "Formatação com backup conferido antes",
      "Configuração de impressora doméstica",
      "Ajuste de Wi-Fi para cobrir a casa",
    ],
    coletaBancada: [
      "Notebook que não liga ou desliga sozinho",
      "Troca de tela, teclado ou bateria",
      "Upgrade de SSD e memória",
    ],
    publicoAtendido: [
      "Famílias com computador ou notebook de uso diário",
      "Estudantes e trabalho remoto",
      "Comércio de rua com uma estação de trabalho",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/remocao-de-virus",
      "/servicos/formatacao",
      "/servicos/redes-e-wifi",
    ],
    faqLocal: [
      {
        question: "Apareceu um aviso pedindo pagamento para desbloquear o PC. O que faço?",
        answer:
          "Não pague e não instale nada indicado pela mensagem. Descreva o aviso pelo WhatsApp: na maioria das vezes é golpe e o equipamento é liberado com uma limpeza de sistema.",
      },
      {
        question: "Dá para resolver sem o técnico ir até minha casa?",
        answer:
          "Quando o computador liga e conecta à internet, muitos casos de software são resolvidos remotamente, com sua autorização e acompanhamento na tela.",
      },
      {
        question: "Vocês fazem coleta no Cruzeiro?",
        answer:
          "Sim, para serviços de bancada. A retirada e a devolução são combinadas no mesmo endereço, em São José dos Pinhais, com registro do que foi retirado.",
      },
      {
        question: "Meu notebook esquenta muito. Isso tem conserto?",
        answer:
          "Na maior parte dos casos sim: limpeza interna, troca de pasta térmica e verificação das ventoinhas. Se o aquecimento vier de defeito em componente, isso aparece no diagnóstico antes do orçamento.",
      },
    ],
  },

  // ── COSTEIRA (São José dos Pinhais) ─────────────────────────
  costeira: {
    slug: "costeira",
    nome: "Costeira",
    nomeLocativo: "na Costeira",
    cidade: "São José dos Pinhais",
    areaName: "Costeira, São José dos Pinhais",
    metaTitle: "Técnico de Informática na Costeira | São José dos Pinhais",
    metaDescription:
      "Informática na Costeira, São José dos Pinhais: manutenção de computador, upgrade de SSD, formatação e rede doméstica. Diagnóstico antes do valor, coleta combinada.",
    h1: "Atendimento de informática na Costeira – São José dos Pinhais",
    subtitulo:
      "Bairro residencial próximo à divisa com Curitiba, onde a maioria dos chamados envolve equipamento antigo que ainda pode render alguns anos.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática na Costeira, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "A Costeira fica na porção de São José dos Pinhais que faz divisa com Curitiba, num trecho essencialmente residencial. A característica que mais define os chamados daqui é o parque de equipamentos: muitos computadores de mesa com anos de uso, ainda funcionais, que perderam desempenho e nunca passaram por manutenção.",
      "Nesse cenário, o serviço mais útil raramente é o mais caro. Antes de sugerir troca de máquina, medimos o que está segurando o desempenho — disco, memória, temperatura ou sistema — e mostramos o que muda com cada intervenção.",
    ],
    contextoLocal: [
      "É comum encontrar desktop com disco mecânico saturado, memória insuficiente para o uso atual e fonte genérica próxima do limite. A ordem importa: colocar SSD numa máquina que desliga por fonte instável só transfere o problema.",
      "Nas redes domésticas, aparece o roteador antigo do provedor tentando atender celular, TV e computador ao mesmo tempo. Antes de trocar equipamento, verificamos posicionamento, canal e se o cabeamento interno da casa comporta um ponto adicional.",
    ],
    logisticaLocal: [
      "Por estar na divisa, muita gente da Costeira pergunta se o atendimento é 'de Curitiba' ou 'de São José'. O endereço da visita é o que define: chamados na Costeira são atendidos como São José dos Pinhais, com agendamento combinado por janela.",
      "Para serviço de bancada, a coleta é combinada com retirada e devolução no mesmo endereço. Em desktop, normalmente só o gabinete é retirado — monitor, teclado e mouse ficam com você.",
    ],
    operacaoLocal: [
      "Medição do gargalo real antes de indicar peça",
      "Verificação de alimentação e temperatura antes de upgrade",
      "Diagnóstico antes do valor, com aprovação sua",
      "Coleta só do gabinete quando o caso é de desktop",
    ],
    atendimentoLocal: [
      "Limpeza interna e revisão térmica do desktop",
      "Formatação com backup conferido antes",
      "Configuração de rede doméstica e posicionamento do roteador",
      "Instalação e configuração de periféricos",
    ],
    coletaBancada: [
      "Upgrade de SSD e memória com migração do sistema",
      "Troca de fonte em computador que desliga sob carga",
      "Tentativa de recuperação de arquivos em disco antigo",
    ],
    publicoAtendido: [
      "Famílias com desktop de vários anos de uso",
      "Estudo e trabalho em casa",
      "Quem quer estender a vida útil do equipamento antes de trocar",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    faqLocal: [
      {
        question: "Meu computador tem mais de cinco anos. Vale investir?",
        answer:
          "Depende do que está limitando. Em muitas máquinas, SSD e memória devolvem uso fluido por um custo bem menor que a troca. Quando não vale, dizemos isso no diagnóstico em vez de empurrar peça.",
      },
      {
        question: "Preciso levar o monitor junto na coleta?",
        answer:
          "Não. Em desktop, normalmente só o gabinete é retirado. Monitor, teclado e mouse ficam com você, a menos que a queixa seja justamente em um deles.",
      },
      {
        question: "A Costeira é atendida como Curitiba ou São José dos Pinhais?",
        answer:
          "Como São José dos Pinhais, porque o endereço da visita é o que define o atendimento. A divisa não muda a forma de agendar nem as modalidades disponíveis.",
      },
      {
        question: "Vocês instalam o SSD sem reinstalar tudo?",
        answer:
          "Quando o sistema atual está íntegro, a migração preserva programas e arquivos. Se o sistema já apresenta falhas, a instalação limpa costuma render um resultado melhor — isso é combinado antes.",
      },
    ],
  },

  // ── GUATUPÊ (São José dos Pinhais) ──────────────────────────
  guatupe: {
    slug: "guatupe",
    nome: "Guatupê",
    nomeLocativo: "no Guatupê",
    cidade: "São José dos Pinhais",
    areaName: "Guatupê, São José dos Pinhais",
    metaTitle: "Técnico de Informática no Guatupê | São José dos Pinhais",
    metaDescription:
      "Atendimento de informática no Guatupê, São José dos Pinhais: computador de comércio, rede local, formatação e manutenção. Triagem e orçamento pelo WhatsApp.",
    h1: "Atendimento de informática no Guatupê – São José dos Pinhais",
    subtitulo:
      "Perfil misto, com residências e pequenas operações comerciais: o critério principal aqui é o tempo que o equipamento pode ficar parado.",
    whatsappMessage:
      "Olá! Preciso de atendimento de informática no Guatupê, em São José dos Pinhais. Pode me orientar?",
    introducaoLocal: [
      "O Guatupê mistura ruas residenciais com pequenas operações comerciais e prestadores que trabalham no próprio imóvel. Isso cria uma pergunta prática logo na triagem: esse computador pode ficar parado hoje? A resposta muda a modalidade e a ordem do serviço.",
      "Para quem depende da máquina no balcão ou no atendimento, o objetivo é devolver a operação primeiro e tratar a causa em seguida. Para uso doméstico, dá para planejar a intervenção com mais calma e aproveitar para resolver o que estava se acumulando.",
    ],
    contextoLocal: [
      "Nos pequenos negócios do bairro, os chamados costumam envolver o computador que emite documento e imprime, a rede que liga o balcão ao escritório dos fundos e o backup que ninguém confere. Uma cópia testada evita que uma falha simples de disco vire perda de histórico.",
      "Na parte residencial, o que domina é lentidão acumulada, sistema desatualizado e Wi-Fi irregular em imóvel comprido, em que o sinal precisa atravessar vários cômodos até chegar ao fundo da casa.",
    ],
    logisticaLocal: [
      "As visitas são combinadas por janela e, no comércio, preferencialmente em horário de menor movimento, para que o equipamento fique livre. Quando existe mais de uma máquina com queixa, listamos as prioridades antes para aproveitar melhor o tempo em campo.",
      "Serviços de bancada seguem por coleta, com retirada e devolução no mesmo endereço em São José dos Pinhais e registro do que foi retirado. Em máquina usada na operação, combinamos a retirada para o período em que ela não é necessária.",
    ],
    operacaoLocal: [
      "Primeira pergunta da triagem: esse equipamento pode ficar parado hoje?",
      "Prioridades listadas antes quando há mais de uma máquina",
      "Diagnóstico antes do valor, com aprovação sua",
      "Coleta programada para o período de menor impacto",
    ],
    atendimentoLocal: [
      "Suporte ao computador de balcão e à impressora",
      "Configuração de rede local entre balcão e escritório",
      "Rotina de backup com teste de restauração",
      "Formatação e reinstalação do sistema",
    ],
    coletaBancada: [
      "Reparo interno de desktop usado na operação",
      "Upgrade de SSD e memória",
      "Disco com falha e risco de perda de histórico",
    ],
    publicoAtendido: [
      "Pequenos comércios e prestadores do bairro",
      "Profissionais que trabalham no próprio imóvel",
      "Residências com computador de uso diário",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/redes-e-wifi",
      "/servicos/recuperacao-de-dados",
      "/servicos/formatacao",
    ],
    faqLocal: [
      {
        question: "O computador do meu comércio parou. Dá para resolver no mesmo dia?",
        answer:
          "Depende da agenda e do tipo de falha. Na triagem verificamos se existe solução remota imediata e, quando não houver, combinamos a janela de visita mais próxima possível — sem prometer horário antes de confirmar.",
      },
      {
        question: "Vocês configuram rede entre o balcão e o escritório?",
        answer:
          "Sim. A avaliação verifica se o caminho comporta cabo ou se a melhor solução é um ponto sem fio adicional, considerando a estrutura do imóvel.",
      },
      {
        question: "Como sei se meu backup está funcionando?",
        answer:
          "Testando a restauração. Configuramos a rotina e restauramos um arquivo de exemplo junto com você, para confirmar que a cópia é utilizável.",
      },
      {
        question: "Atendem também residências no Guatupê?",
        answer:
          "Sim. O fluxo é o mesmo: triagem pelo WhatsApp, diagnóstico antes do valor e escolha entre remoto, visita ou coleta conforme o problema.",
      },
    ],
  },
};
