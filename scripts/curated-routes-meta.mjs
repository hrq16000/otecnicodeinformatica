// AUTO-CURADO — metadata estática por rota para prerender pré-hidratação.
// Fonte de verdade em runtime: componentes PageSEO/servicosCore/cidadesData (DOM hidratado).
// Este mapa espelha os títulos/descrições curados apenas para crawlers SEM JS
// (canonical/og:url por rota no HTML estático). Se um título de página mudar,
// atualize também esta lista rodando a captura em scripts/prerender-curated.
// NÃO adicionar rotas fora do manifesto curado (scripts/lib/curated-urls.mjs).
import { SERVICO_BAIRRO } from "./lib/curated-urls.mjs";
import { servicoBairroMeta } from "./lib/servico-bairro-meta.mjs";
import { priorityFaq } from "./lib/priority-faq.mjs";
import { priorityOffers } from "./lib/priority-offers.mjs";
import { servicoBlocos } from "./lib/servico-blocos.mjs";
import { servicoFaqs } from "./lib/servico-faqs.mjs";

const BASE_ROUTES = [
  {
    "path": "/",
    "title": "Técnico em Curitiba | PC, Notebook, Wi-Fi e Suporte Empresarial",
    "description": "Diagnóstico, manutenção e suporte para computadores, notebooks, redes e empresas em Curitiba. Escolha o serviço e continue pelo WhatsApp."
  },
  {
    "path": "/servicos",
    "title": "Serviços de Informática em Curitiba | PC e Notebook",
    "description": "Conheça os serviços de formatação, manutenção de computadores e notebooks, SSD, vírus, recuperação de dados, Wi-Fi e suporte empresarial."
  },
  {
    "path": "/servicos/formatacao",
    "title": "Formatação de PC e Notebook em Curitiba | Windows",
    "description": "Formatação de PC e notebook em Curitiba com backup, Windows original, drivers e programas essenciais. Diagnóstico a partir de R$ 99,99. Atendimento via WhatsApp."
  },
  {
    "path": "/servicos/manutencao-de-notebook",
    "title": "Assistência Técnica de Notebook em Curitiba | Diagnóstico",
    "description": "Assistência técnica de notebook em Curitiba: lentidão, aquecimento, tela, teclado, bateria e limpeza interna. Todas as marcas. Diagnóstico antes de informar o valor via WhatsApp."
  },
  {
    "path": "/servicos/manutencao-de-computador",
    "title": "Assistência Técnica de Computador em Curitiba | PC",
    "description": "Assistência técnica de computador em Curitiba: travamentos, fonte, memória, HD/SSD e placa-mãe. Casa e empresa. Diagnóstico honesto antes de informar o valor via WhatsApp."
  },
  {
    "path": "/servicos/upgrade-ssd-ram",
    "title": "Instalação de SSD e Upgrade de Memória em Curitiba",
    "description": "Instalação de SSD e upgrade de memória RAM em Curitiba com avaliação de compatibilidade, clonagem e backup. Ganho real de desempenho, sem promessa de milagre. Via WhatsApp."
  },
  {
    "path": "/servicos/remocao-de-virus",
    "title": "Remoção de Vírus e Malware em Curitiba | PC e Notebook",
    "description": "Remoção de vírus, malware e sequestro de navegador em Curitiba. Limpeza segura, proteção dos seus dados e reinstalação quando necessário. Atendimento via WhatsApp."
  },
  {
    "path": "/servicos/recuperacao-de-dados",
    "title": "Recuperação de Dados em Curitiba | HD, SSD e Pendrive",
    "description": "Recuperação de dados em Curitiba de HD, SSD, pendrive e cartão. Exclusão acidental, sistema que não inicia e falhas. Avaliação primeiro — recuperação não é garantida."
  },
  {
    "path": "/servicos/redes-e-wifi",
    "title": "Configuração de Redes e Wi-Fi em Curitiba | Roteadores",
    "description": "Configuração de redes e Wi-Fi em Curitiba: internet instável, roteador, repetidor, cabeamento e rede empresarial. Cobertura melhor em casa e no trabalho. Via WhatsApp."
  },
  {
    "path": "/servicos/suporte-tecnico-empresarial",
    "title": "Suporte Técnico para Empresas em Curitiba | Informática",
    "description": "Suporte técnico de informática para empresas em Curitiba, com atendimento para computadores, usuários, redes, impressoras e manutenção preventiva."
  },
  {
    "path": "/sobre",
    "title": "Sobre o Técnico em Curitiba | Informática, PC, Notebook e Suporte",
    "description": "Conheça o Técnico em Curitiba: foco em informática, notebook, PC, redes e suporte empresarial em Curitiba e região, com diagnóstico honesto e valor transparente.",
    "blocos": [
      {
        "titulo": "Por que diagnosticamos antes de falar em peça",
        "paragrafos": [
          "A maior parte do prejuízo em assistência técnica não vem do conserto caro: vem do conserto errado. Formatar uma máquina cujo gargalo era o disco mecânico, trocar memória quando o problema era temperatura, comprar fonte nova quando o defeito estava no botão. Em todos esses casos o cliente paga, a melhora é curta e o sintoma volta. Por isso a nossa ordem é fixa: entender, confirmar, informar e só então executar.",
          "O diagnóstico segue eliminação por etapas. Primeiro confirmamos se há energia chegando, depois se o equipamento inicializa, em seguida se há imagem e se o sistema carrega. Cada etapa descartada reduz hipóteses e evita a troca de componente por suposição. Quando o comportamento é intermitente, testamos sob uso real em vez de confiar apenas em um teste rápido de bancada.",
          "Também tratamos sintoma e serviço como coisas diferentes. Quem chega dizendo que o computador está lento ou que o notebook não liga está descrevendo um efeito, não uma causa. Traduzir esse efeito em causa provável é justamente o trabalho técnico — e é o que separa uma indicação honesta de uma venda de peça."
        ]
      },
      {
        "titulo": "Experiência acumulada e limites do escopo",
        "paragrafos": [
          "A atuação em informática vem desde 1998, período em que o equipamento do dia a dia deixou de ser o desktop de escritório e passou a incluir notebooks finos, armazenamento em estado sólido, redes domésticas com vários dispositivos e home office. Essa continuidade importa por um motivo prático: boa parte do diagnóstico rápido vem de já ter visto o mesmo padrão de falha antes, em modelos e gerações diferentes.",
          "O escopo é deliberadamente estreito. Trabalhamos com computadores, notebooks, sistema, armazenamento, memória, segurança, redes e suporte a pequenas estruturas empresariais — e não com áreas fora dessa competência. Quando o caso exige laboratório especializado, como falha mecânica interna de disco, dizemos isso em vez de improvisar. Recusar um serviço fora do nosso alcance é parte de fazer bem o que está dentro dele.",
          "Atendemos Curitiba e municípios da região metropolitana. Não mantemos loja anunciada em cada bairro nem equipe fixa em outras cidades: o atendimento acontece por visita técnica combinada ou por coleta e entrega, com as condições, valores de partida e prazos publicados na página de preços e políticas."
        ]
      }
    ]
  },
  {
    "path": "/como-funciona",
    "title": "Como Funciona o Atendimento Técnico em Curitiba | Passo a Passo Completo",
    "description": "Entenda como funciona o atendimento técnico de informática em Curitiba e região. Passo a passo completo: solicitação via WhatsApp, diagnóstico, execução e garantia. Técnico a domicílio no mesmo dia.",
    "blocos": [
      {
        "titulo": "1. Triagem inicial pelo WhatsApp",
        "paragrafos": [
          "O contato começa por uma triagem curta: equipamento, sintoma percebido, há quanto tempo acontece, se houve queda, líquido ou queda de energia, e a região de atendimento. Essas respostas indicam a modalidade mais adequada — remoto, domicílio ou bancada com coleta.",
          "A triagem orienta a modalidade, mas não substitui o diagnóstico: a causa só é confirmada com o equipamento avaliado."
        ]
      },
      {
        "titulo": "2. Definição da modalidade de atendimento",
        "paragrafos": [
          "Atendimento remoto resolve o que é software: sistema lento por configuração, atualização travada, e-mail, impressora em rede e ajustes de conta. Atendimento em domicílio cobre o que depende do ambiente físico, como rede, cabeamento, montagem e limpeza. Bancada com coleta e entrega é o caminho quando há suspeita de placa, energia, tela ou armazenamento.",
          "Quando a modalidade escolhida não resolve, explicamos o motivo e indicamos a alternativa antes de qualquer execução."
        ]
      },
      {
        "titulo": "3. Diagnóstico técnico antes de qualquer execução",
        "paragrafos": [
          "O diagnóstico segue uma ordem: energia, inicialização, imagem, sistema e armazenamento. Cada etapa elimina hipóteses e reduz a chance de troca desnecessária de peça.",
          "Ao final, você recebe a explicação do que foi encontrado, o que pode ser feito e o valor correspondente ao serviço."
        ]
      },
      {
        "titulo": "4. Autorização, execução e testes",
        "paragrafos": [
          "Nenhuma execução adicional acontece sem a sua autorização. Peças, componentes e materiais são tratados à parte do serviço e dependem de disponibilidade e do modelo do equipamento.",
          "Após o reparo, o equipamento passa por testes de uso real antes da devolução: inicialização, temperatura, estabilidade, rede e acesso aos arquivos."
        ]
      },
      {
        "titulo": "5. Prazos, cancelamento e garantia",
        "paragrafos": [
          "Prazos dependem de fila, complexidade, testes e disponibilidade de peça — por isso são confirmados na avaliação, e não na triagem. Cancelamento e desistência seguem as políticas vigentes, considerando o serviço efetivamente executado.",
          "A garantia cobre o serviço executado e a peça aplicada, dentro do escopo descrito na página de preços e políticas. Falhas de causa diferente da tratada exigem nova avaliação."
        ]
      }
    ]
  },
  {
    "path": "/precos-e-politicas",
    "title": "Preços e Políticas | Técnico em Curitiba",
    "description": "Preços e políticas do atendimento de informática em Curitiba: mão de obra a partir de R$ 99,99, valor após avaliação e regras claras sobre peças, prazos e dados.",
    "blocos": [
      {
        "titulo": "Como o valor do atendimento é definido",
        "paragrafos": [
          "Não existe preço fechado por telefone para reparo, e isso não é falta de transparência: é o contrário. O que temos publicado é o ponto de partida de cada modalidade — visita técnica de inspeção a partir de R$ 99,99 por até (ou a cada) 30 minutos, pacote pré-acordado de até 2 horas por R$ 279,99 e diagnóstico com compromisso, coleta e entrega inclusas, com mínimo pré-aprovado de R$ 299,99. O valor final depende do que a avaliação confirmar.",
          "Quatro fatores pesam no resultado: a causa real confirmada no diagnóstico, o modelo e o estado do equipamento, a necessidade de bancada e ferramenta específica, e a disponibilidade de peça compatível. Um mesmo sintoma — o computador que não liga, por exemplo — pode terminar em uma verificação simples de alimentação ou em um reparo de placa, e cobrar o mesmo pelos dois seria injusto com quem tem o caso mais leve.",
          "Peças, componentes, licenças e materiais são sempre tratados à parte da mão de obra e só são adquiridos após a sua autorização. Nada além do que foi combinado é executado sem aprovação. Se o caminho técnico mudar durante o serviço, você é avisado antes, não depois."
        ]
      },
      {
        "titulo": "O que está incluído e o que não está",
        "paragrafos": [
          "Estão incluídos na modalidade contratada: a avaliação técnica do equipamento e a identificação da causa provável, a explicação em linguagem clara do que foi encontrado, a execução dos procedimentos autorizados dentro do escopo combinado, a coleta e entrega na modalidade de diagnóstico com compromisso e a garantia de 90 dias sobre a mão de obra do serviço executado.",
          "Não estão incluídos: peças, componentes, licenças de software e materiais; abertura e reparo de placas na modalidade de visita avulsa; garantia de recuperação de dados, que é sempre uma tentativa; promessa de prazo fixo de chegada ou de conclusão sem avaliação; e serviços fora do escopo de informática e redes."
        ]
      },
      {
        "titulo": "Prazos, garantia e cuidado com seus dados",
        "paragrafos": [
          "O prazo depende da complexidade e da peça. Serviços de software, como reinstalação de sistema e limpeza, costumam ser mais rápidos do que reparos que dependem de componente específico. Trabalhamos com prazo estimado informado após a avaliação, e avisamos quando ele muda — em vez de prometer antes de olhar o equipamento.",
          "A garantia de 90 dias cobre a mão de obra do serviço que foi executado, no mesmo defeito tratado. Peças e componentes seguem a garantia do fornecedor ou fabricante. Ficam de fora da garantia: falha de causa diferente da tratada, dano por queda, líquido, surto elétrico ou mau uso, intervenção de terceiros após o atendimento, e desgaste natural de bateria e de armazenamento.",
          "Sobre dados: recomendamos backup antes de qualquer intervenção que envolva armazenamento, e quando possível fazemos cópia preventiva. O acesso a arquivos se limita ao necessário para o serviço autorizado. Tentativa de recuperação de conteúdo já perdido é outro serviço e não tem resultado garantido. Quando o reparo deixa de fazer sentido diante do valor do equipamento, dizemos isso abertamente."
        ]
      }
    ]
  },
  {
    "path": "/faq",
    "title": "FAQ Técnico Curitiba | Preço, Prazo e Garantia",
    "description": "Dúvidas sobre preço, prazo, garantia, formatação, vírus e atendimento técnico em Curitiba. Veja respostas rápidas e chame no WhatsApp."
  },
  {
    "path": "/contato",
    "title": "Contato Técnico Curitiba | WhatsApp Hoje R$ 99,99",
    "description": "Fale com técnico de informática em Curitiba pelo WhatsApp. Atendimento hoje para PC, notebook, vírus, formatação e SSD a partir de R$ 99,99."
  },
  {
    "path": "/tecnico-informatica-curitiba",
    "title": "Técnico de Informática em Curitiba | PC e Notebook",
    "description": "Atendimento técnico em Curitiba para computador, notebook, formatação, SSD, vírus, recuperação de dados, Wi-Fi e suporte para empresas."
  },
  {
    "path": "/tecnico-informatica-sao-jose-pinhais",
    "title": "Técnico em São José dos Pinhais para Notebook e PC | Técnico em Curitiba",
    "description": "Técnico de informática em São José dos Pinhais: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte a empresas. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-pinhais",
    "title": "Técnico em Pinhais para Notebook, PC e Redes | Técnico em Curitiba",
    "description": "Técnico de informática em Pinhais: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-colombo",
    "title": "Técnico em Colombo para Notebook, PC e Informática | Técnico em Curitiba",
    "description": "Técnico de informática em Colombo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-araucaria",
    "title": "Técnico em Araucária para Notebook, PC e Empresas | Técnico em Curitiba",
    "description": "Técnico de informática em Araucária: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-campo-largo",
    "title": "Técnico em Campo Largo para Notebook, PC e Redes | Técnico em Curitiba",
    "description": "Técnico de informática em Campo Largo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/empresa-de-ti-curitiba",
    "title": "Empresa de TI em Curitiba | Soluções para Pequenas Empresas",
    "description": "Soluções de informática para empresas em Curitiba: diagnóstico do ambiente, computadores, redes, manutenção e organização do suporte técnico."
  },
  {
    "path": "/bairros/cic",
    "title": "Técnico de Informática no CIC (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/batel",
    "title": "Técnico de Informática no Batel (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/agua-verde",
    "title": "Técnico de Informática no Água Verde (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Água Verde, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/centro",
    "title": "Técnico de Informática no Centro de Curitiba | Notebook e PC",
    "description": "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/portao",
    "title": "Técnico de Informática no Portão (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Atendimento a domicílio a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/atendimento-domicilio",
    "title": "Técnico de Informática em Domicílio em Curitiba | Atendimento",
    "description": "Atendimento técnico de informática em domicílio em Curitiba para computadores, redes e situações que possam ser avaliadas no local."
  },
  {
    "path": "/atendimento-remoto",
    "title": "Suporte Remoto de Informática | Atendimento em Curitiba",
    "description": "Suporte remoto para configurações, sistemas, programas, acesso, orientações e problemas de informática que não exigem intervenção física."
  },
  {
    "path": "/coleta-e-entrega",
    "title": "Coleta e Entrega de Computador e Notebook em Curitiba",
    "description": "Coleta e entrega agendada para computadores e notebooks que precisam de diagnóstico, manutenção ou serviço técnico em bancada."
  },
  {
    "path": "/diagnostico-tecnico",
    "title": "Diagnóstico Técnico de Computador e Notebook em Curitiba",
    "description": "Diagnóstico técnico para identificar falhas em computadores e notebooks, avaliar a viabilidade do serviço e orientar o valor."
  },
  {
    "path": "/equipamentos-atendidos",
    "title": "Equipamentos Atendidos | Assistência Técnica Curitiba - Computadores, Notebooks, TVs",
    "description": "Conheça todos os equipamentos que atendemos em Curitiba: computadores, notebooks, Smart TVs, roteadores, servidores e mais. Diagnóstico profissional e reparo com garantia."
  },
  {
    "path": "/problemas/computador-lento",
    "title": "Computador Lento? Diagnóstico Técnico em Curitiba",
    "description": "Computador ou notebook lento para ligar e abrir programas? Veja os sintomas, as causas possíveis, quando SSD ou memória resolvem, quando formatar e quando trocar o equipamento.",
    "h1": "Computador lento: sintomas, causas possíveis e o que realmente resolve",
    "subtitulo": "Lentidão quase nunca tem uma causa única: armazenamento, memória, temperatura e software se manifestam de formas diferentes e exigem soluções diferentes.",
    "blocos": [
      {
        "titulo": "Lentidão é sintoma, não diagnóstico",
        "paragrafos": [
          "Existem quatro famílias de causa bem diferentes: armazenamento, memória, temperatura e software. Demora para ligar aponta para o disco; travar com vários programas abertos aponta para memória; piorar com o tempo de uso aponta para aquecimento; ficar lento de repente após uma atualização aponta para software.",
          "A triagem pergunta quando a lentidão aparece e o que está aberto no momento. Ela orienta a modalidade de atendimento, mas a causa só é confirmada com o equipamento avaliado."
        ]
      },
      {
        "titulo": "O que você pode observar antes do atendimento",
        "paragrafos": [
          "Reiniciar e notar se a lentidão aparece logo ou depois de um tempo, conferir o espaço livre do disco do sistema, observar aquecimento e ruído do cooler, anotar quais programas estão abertos e se o problema também ocorre sem internet.",
          "O que não recomendamos: instalar \"otimizadores\" baixados por anúncio, acumular mais de um antivírus e desativar serviços do sistema por tutorial."
        ]
      },
      {
        "titulo": "O que resolve cada tipo de causa",
        "paragrafos": [
          "Instalação de SSD é a intervenção de maior impacto quando o sistema ainda roda em HD mecânico. Ampliação de memória é indicada quando a máquina trava com muitos programas abertos, respeitando o limite suportado pela placa.",
          "Limpeza interna resolve a lentidão ligada ao aquecimento. Formatação resolve o que é software — sistema corrompido, infecção persistente ou acúmulo de instalações — e não corrige disco lento nem falta de memória.",
          "Quando a placa não suporta mais memória, quando o processador limita o uso pretendido ou quando a soma das peças se aproxima do valor de um equipamento equivalente, explicamos o cenário e a alternativa, incluindo a migração dos seus dados."
        ]
      }
    ]
  },
  {
    "path": "/problemas/notebook-nao-liga",
    "title": "Notebook Não Liga? Assistência Técnica em Curitiba",
    "description": "Notebook não liga ou liga sem imagem? Entenda os sinais, as causas possíveis, os testes externos seguros e como funciona o diagnóstico técnico em Curitiba.",
    "h1": "Notebook não liga: o que pode estar acontecendo e como é feito o diagnóstico",
    "blocos": [
      {
        "titulo": "\"Não liga\" e \"liga sem imagem\" são problemas diferentes",
        "paragrafos": [
          "Quando o equipamento não reage de nenhuma forma — sem LED, sem ventoinha, sem vibração —, a investigação começa pela alimentação: carregador, tomada, conector de energia, bateria e circuito de entrada da placa.",
          "Quando existe algum sinal de vida, a investigação passa para memória, vídeo, tela, cabo interno, BIOS e armazenamento. Essa distinção evita o erro mais caro na prática: trocar peça por suposição."
        ]
      },
      {
        "titulo": "Testes externos que você pode fazer com segurança",
        "paragrafos": [
          "Testar outra tomada, observar se algum LED acende ou pisca, remover periféricos externos, conferir a integridade do carregador e registrar sons, piscadas ou mensagens na tela.",
          "Não recomendamos desmontagem, medições com o aparelho energizado, intervenções na fonte ou ressolda. Após líquido, cheiro de queimado, estalo, bateria inchada ou queda, o correto é não insistir e encaminhar para avaliação."
        ]
      },
      {
        "titulo": "Como funciona o diagnóstico e o que influencia o reparo",
        "paragrafos": [
          "A avaliação confirma primeiro se há energia entrando, depois se o equipamento inicializa e, por fim, se apresenta imagem e carrega o sistema. Cada etapa elimina hipóteses e reduz troca desnecessária de peça.",
          "O esforço e o valor variam conforme a causa confirmada, o modelo, a disponibilidade da peça e a necessidade de bancada. Peças e materiais são tratados à parte, e nada é executado sem a sua autorização.",
          "Em boa parte dos casos os arquivos continuam preservados, porque a falha está na energia, na tela ou na placa. Quando a suspeita recai sobre o armazenamento, preservar os dados passa a ser prioridade."
        ]
      }
    ],
    "subtitulo": "Sinais que separam falta de energia de falta de imagem, causas possíveis, verificações seguras, situações em que não se deve insistir e como a avaliação técnica confirma a causa antes de qualquer valor informado."
  },
  {
    "path": "/quando-nao-compensa",
    "title": "Quando NÃO Compensa Reparar | Guia Técnico - Curitiba",
    "description": "Guia completo sobre quando compensa e quando NÃO compensa reparar computadores, notebooks, TVs e outros equipamentos. Dicas de um técnico profissional em Curitiba."
  }
];

// Landings serviço × bairro: metadados espelhados de servicoBairroFactory.ts
// (H1 e FAQ reais), garantindo paridade entre HTML estático e hidratação.
const SERVICO_BAIRRO_ROUTES = SERVICO_BAIRRO.map((e) => servicoBairroMeta(e.path)).filter(Boolean);

// P0 comerciais: anexa a FAQ real já exibida na página (sem inventar conteúdo),
// para que FAQPage estático e conteúdo visível fiquem em paridade.
const BASE_ROUTES_WITH_FAQ = BASE_ROUTES.map((r) => {
  const faq = r.faq ?? priorityFaq(r.path) ?? servicoFaqs(r.path);
  const offers = priorityOffers(r.path);
  const blocos = r.blocos ?? servicoBlocos(r.path);
  return { ...r, ...(faq ? { faq } : {}), ...(offers ? { offers } : {}), ...(blocos ? { blocos } : {}) };
});

export const CURATED_ROUTES = [...BASE_ROUTES_WITH_FAQ, ...SERVICO_BAIRRO_ROUTES];
