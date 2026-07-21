import type { ServicoBairroData } from "@/pages/servico-bairro/ServicoBairroTemplate";

/**
 * Fábrica de dados para landings de bairro (indexáveis) dos serviços
 * de Wi-Fi e Manutenção de TV Smart. Cada bairro recebe copy própria
 * (pontos de referência, tempo médio de atendimento e FAQ localizada).
 */

interface BairroContext {
  slug: string;
  nome: string;
  pontosReferencia: string[];
  tempoAtendimento: string;
  bairrosProximos: { nome: string; slug: string }[];
  descricaoLocal: string;
  /**
   * Bloco narrativo exclusivo (≥ 220 palavras próprias) que sustenta a
   * exigência de uniqueness da política de poda. Obrigatório para novos
   * bairros âncora — validado por scripts/validate-bairro-copy.mjs.
   */
  narrativaLocal?: string;
  /**
   * Governa `noindex` no template. `undefined` (âncoras herdadas) → true.
   * Rebaixamentos usam `false` explicitamente para virar `noindex`.
   */
  indexable?: boolean;
}


export const BAIRROS_INDEXAVEIS: Record<string, BairroContext> = {
  batel: {
    slug: "batel",
    nome: "Batel",
    pontosReferencia: ["Shopping Curitiba", "Praça do Japão", "Av. do Batel", "Rua Comendador Araújo"],
    tempoAtendimento: "atendimento no mesmo dia em horário comercial",
    bairrosProximos: [
      { nome: "Água Verde", slug: "agua-verde" },
      { nome: "Centro", slug: "centro" },
      { nome: "Bigorrilho", slug: "bigorrilho" },
    ],
    descricaoLocal:
      "O Batel concentra residências de alto padrão, escritórios e coworkings — cenários em que rede estável e Smart TV funcionando são essenciais para trabalho remoto e reuniões.",
  },
  centro: {
    slug: "centro",
    nome: "Centro",
    pontosReferencia: ["Rua XV de Novembro", "Praça Tiradentes", "Boca Maldita", "Catedral"],
    tempoAtendimento: "atendimento no mesmo dia com deslocamento reduzido",
    bairrosProximos: [
      { nome: "Batel", slug: "batel" },
      { nome: "Água Verde", slug: "agua-verde" },
      { nome: "Rebouças", slug: "reboucas" },
    ],
    descricaoLocal:
      "No Centro atendemos escritórios, clínicas, comércio e residências históricas — ambientes com desafios específicos de cabeamento, roteador antigo e antenas coletivas.",
  },
  "agua-verde": {
    slug: "agua-verde",
    nome: "Água Verde",
    pontosReferencia: ["Av. República Argentina", "Parque da Água Verde", "Shopping Água Verde"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba central-sul",
    bairrosProximos: [
      { nome: "Batel", slug: "batel" },
      { nome: "Portão", slug: "portao" },
      { nome: "Centro", slug: "centro" },
    ],
    descricaoLocal:
      "Água Verde reúne muitos prédios residenciais e escritórios — áreas onde interferência de Wi-Fi entre vizinhos e Smart TVs mais antigas são queixas comuns.",
  },
  cic: {
    slug: "cic",
    nome: "CIC",
    pontosReferencia: ["Terminal do CIC", "Parque Industrial", "Shopping Palladium"],
    tempoAtendimento: "atendimento com agendamento no mesmo dia",
    bairrosProximos: [
      { nome: "Portão", slug: "portao" },
      { nome: "Fazendinha", slug: "fazendinha" },
      { nome: "Campo Comprido", slug: "campo-comprido" },
    ],
    descricaoLocal:
      "O CIC é a maior região habitacional de Curitiba, com casas amplas e residências que frequentemente precisam de sistemas mesh para cobrir toda a metragem.",
  },
  portao: {
    slug: "portao",
    nome: "Portão",
    pontosReferencia: ["Shopping Palladium", "Rua Padre Anchieta", "Parque do Barigui (proximidades)"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba sul-oeste",
    bairrosProximos: [
      { nome: "Água Verde", slug: "agua-verde" },
      { nome: "CIC", slug: "cic" },
      { nome: "Fazendinha", slug: "fazendinha" },
    ],
    descricaoLocal:
      "Portão combina residencial e comercial, com comércio local que depende de rede estável para maquininhas, câmeras e Smart TVs em salas de espera.",
  },
  bigorrilho: {
    slug: "bigorrilho",
    nome: "Bigorrilho",
    pontosReferencia: ["Shopping Mueller (proximidades)", "Praça do Expedicionário", "Champagnat"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba centro-oeste",
    bairrosProximos: [
      { nome: "Batel", slug: "batel" },
      { nome: "Centro", slug: "centro" },
      { nome: "Santa Felicidade", slug: "santa-felicidade" },
    ],
    descricaoLocal:
      "Bigorrilho tem forte perfil residencial vertical, com prédios altos e Smart TVs grandes onde reparo de painel e ajuste de mesh entre andares são frequentes.",
  },
  cabral: {
    slug: "cabral",
    nome: "Cabral",
    pontosReferencia: ["Estádio Couto Pereira", "Praça Redonda", "Av. Paraná"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba centro-norte",
    bairrosProximos: [
      { nome: "Boa Vista", slug: "boa-vista" },
      { nome: "Cristo Rei", slug: "cristo-rei" },
      { nome: "Centro", slug: "centro" },
    ],
    descricaoLocal:
      "O Cabral mistura casas antigas e prédios novos — cenários em que cabeamento herdado e antenas coletivas exigem diagnóstico antes de instalar mesh ou nova Smart TV.",
  },
  "santa-felicidade": {
    slug: "santa-felicidade",
    nome: "Santa Felicidade",
    pontosReferencia: ["Av. Manoel Ribas", "Bosque Italiano", "Cascatinha"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba noroeste",
    bairrosProximos: [
      { nome: "Bigorrilho", slug: "bigorrilho" },
      { nome: "Cascatinha", slug: "cascatinha" },
      { nome: "Campo Comprido", slug: "campo-comprido" },
    ],
    descricaoLocal:
      "Santa Felicidade concentra casas amplas e restaurantes, onde cobertura Wi-Fi em áreas externas e reparo de TV grande são as demandas recorrentes.",
  },
  "boa-vista": {
    slug: "boa-vista",
    nome: "Boa Vista",
    pontosReferencia: ["Shopping Barigüi (proximidades)", "Terminal Boa Vista", "Av. Paraná"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba norte",
    bairrosProximos: [
      { nome: "Cabral", slug: "cabral" },
      { nome: "Cristo Rei", slug: "cristo-rei" },
      { nome: "Bacacheri", slug: "bacacheri" },
    ],
    descricaoLocal:
      "Boa Vista tem grande volume residencial e comércio de bairro — perfil em que roteador da operadora não cobre a casa toda e Smart TVs de médio porte precisam de manutenção.",
  },
  "cristo-rei": {
    slug: "cristo-rei",
    nome: "Cristo Rei",
    pontosReferencia: ["UFPR Politécnico", "Praça Osório de Almeida", "Av. Sete de Setembro"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba leste-central",
    bairrosProximos: [
      { nome: "Jardim Botânico", slug: "jardim-botanico" },
      { nome: "Cabral", slug: "cabral" },
      { nome: "Centro", slug: "centro" },
    ],
    descricaoLocal:
      "Cristo Rei mistura residências, universidades e escritórios técnicos — onde estabilidade de Wi-Fi para estudo/trabalho remoto é crítica e TVs de médio porte são padrão.",
  },
  cajuru: {
    slug: "cajuru",
    nome: "Cajuru",
    pontosReferencia: ["Terminal Cajuru", "Av. das Torres", "Parque Náutico"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba leste",
    bairrosProximos: [
      { nome: "Boqueirão", slug: "boqueirao" },
      { nome: "Jardim Botânico", slug: "jardim-botanico" },
      { nome: "Uberaba", slug: "uberaba" },
    ],
    descricaoLocal:
      "O Cajuru é uma das regiões residenciais mais populosas de Curitiba — muitas casas com Wi-Fi limitado ao roteador da operadora e Smart TVs que precisam de reparo de fonte com frequência.",
  },
  boqueirao: {
    slug: "boqueirao",
    nome: "Boqueirão",
    pontosReferencia: ["Terminal Boqueirão", "Av. Marechal Floriano", "Rodoferroviária (proximidades)"],
    tempoAtendimento: "atendimento no mesmo dia em Curitiba sudeste",
    bairrosProximos: [
      { nome: "Cajuru", slug: "cajuru" },
      { nome: "Hauer", slug: "hauer" },
      { nome: "Xaxim", slug: "xaxim" },
    ],
    descricaoLocal:
      "Boqueirão é um grande bairro residencial com muito comércio local — atendimentos de Wi-Fi para casas grandes e conserto de TV com uso intenso predominam.",
  },
};


export function buildWifiBairroData(bairroSlug: string): ServicoBairroData {
  const b = BAIRROS_INDEXAVEIS[bairroSlug];
  return {
    metaTitle: `Configuração de Wi-Fi no ${b.nome}, Curitiba a partir de R$ 99,99 | Técnico em Curitiba`,
    metaDescription: `Instalação e configuração de Wi-Fi, mesh e roteadores no ${b.nome}, Curitiba. Atendimento presencial, orçamento pelo WhatsApp e valor mínimo de R$ 99,99.`,
    servico: "Configuração de Wi-Fi",
    servicoSlug: "redes-wifi",
    bairro: b.nome,
    bairroSlug: b.slug,
    cidade: "Curitiba",
    cidadeSlug: "curitiba",
    indexable: true,
    h1: `Configuração de Wi-Fi no ${b.nome}, Curitiba`,
    subtitulo: `Sinal estável em toda a casa ou escritório, com ${b.tempoAtendimento}.`,
    precoBase: "R$ 99,99",
    precoDescricao: "Valor mínimo da visita técnica. Serviços mais complexos recebem orçamento próprio.",
    descricaoLonga: `${b.descricaoLocal} Configuramos roteadores, repetidores e sistemas mesh, otimizamos canais 2,4/5 GHz e organizamos cabeamento quando necessário — sempre com aprovação prévia pelo WhatsApp.`,
    beneficios: [
      "Diagnóstico do ambiente e mapeamento de zonas sem sinal",
      "Configuração de roteador, mesh ou repetidor",
      "Otimização de canais para reduzir interferência",
      "Rede segmentada para trabalho, visitas e IoT",
      "Testes de cobertura em cada cômodo antes de finalizar",
      "Nada é executado sem sua aprovação por escrito",
    ],
    processoPasso: [
      { titulo: "Contato pelo WhatsApp", descricao: `Descreva o problema (queda, lentidão, cômodo sem sinal) e o endereço no ${b.nome}.` },
      { titulo: "Triagem e orçamento", descricao: "Confirmamos modalidade (visita ou remoto quando aplicável) e valor mínimo antes do deslocamento." },
      { titulo: "Visita técnica", descricao: `Chegamos ao ${b.nome} com equipamento de análise de espectro e testes de cobertura.` },
      { titulo: "Instalação/ajuste", descricao: "Configuramos roteador, mesh ou repetidor conforme o diagnóstico." },
      { titulo: "Validação e garantia", descricao: "Testamos cada cômodo com o cliente e formalizamos garantia pelo WhatsApp." },
    ],
    faq: [
      { pergunta: `Vocês atendem no ${b.nome}?`, resposta: `Sim, ${b.tempoAtendimento} — próximo a ${b.pontosReferencia.slice(0, 2).join(" e ")}.` },
      { pergunta: "O Wi-Fi não pega em alguns cômodos. Resolve?", resposta: "Sim. Avaliamos o ambiente e indicamos mesh, repetidor ou reposicionamento do roteador. Antes da visita, teste desligar o roteador por 60 segundos e religá-lo para descartar travamento momentâneo." },
      { pergunta: "Quanto custa?", resposta: "A visita começa em R$ 99,99 e cobre configuração básica. Mesh, cabeamento e rede empresarial recebem orçamento próprio antes de qualquer execução." },
      { pergunta: "Precisa comprar equipamento novo?", resposta: "Só se realmente for necessário. Muitas vezes o roteador da operadora atende após reconfiguração e ajuste de canais. Quando trocar compensa, indicamos o modelo certo antes da compra." },
    ],
    pontosReferencia: b.pontosReferencia,
    tempoAtendimento: b.tempoAtendimento,
    servicosRelacionados: [
      { nome: "Formatação de computador", slug: "formatacao-computador" },
      { nome: "Remoção de vírus", slug: "remocao-virus" },
      { nome: "Suporte a empresas", slug: "suporte-empresas" },
    ],
    bairrosProximos: b.bairrosProximos,
  };
}

export function buildTvBairroData(bairroSlug: string): ServicoBairroData {
  const b = BAIRROS_INDEXAVEIS[bairroSlug];
  return {
    metaTitle: `Conserto de Smart TV no ${b.nome}, Curitiba com coleta e entrega | Técnico em Curitiba`,
    metaDescription: `Reparo e troca de tela de Smart TV LED/LCD no ${b.nome}, Curitiba. Diagnóstico em bancada, coleta e entrega, orçamento pelo WhatsApp.`,
    servico: "Conserto de Smart TV",
    servicoSlug: "manutencao-tv",
    bairro: b.nome,
    bairroSlug: b.slug,
    cidade: "Curitiba",
    cidadeSlug: "curitiba",
    indexable: true,
    h1: `Conserto de Smart TV no ${b.nome}, Curitiba`,
    subtitulo: `Reparo de placa, fonte, backlight e troca de tela com coleta e entrega no ${b.nome}.`,
    precoBase: "R$ 299,99",
    precoDescricao: "Taxa mínima de coleta e entrega. O reparo em si é orçado por escrito após diagnóstico em bancada.",
    descricaoLonga: `${b.descricaoLocal} Coletamos a TV no seu endereço, executamos o diagnóstico em bancada com equipamento profissional (multímetro, câmera térmica, estação de solda SMD) e devolvemos a TV testada, com garantia formal.`,
    beneficios: [
      "Coleta e entrega no endereço",
      "Diagnóstico em bancada com câmera térmica",
      "Reparo de fonte, T-CON, mainboard e backlight",
      "Troca de painel LCD quando compensa (avaliação transparente)",
      "Orçamento por escrito antes de qualquer reparo",
      "Garantia formal por WhatsApp",
    ],
    processoPasso: [
      { titulo: "Descrição do defeito pelo WhatsApp", descricao: `Envie marca, modelo, ano e o sintoma da TV (envie foto/vídeo se possível). Coletamos no ${b.nome}.` },
      { titulo: "Coleta agendada", descricao: "Combinamos janela de coleta e emitimos comprovante." },
      { titulo: "Diagnóstico em bancada", descricao: "Análise de placa-fonte, T-CON, mainboard e backlight com equipamento profissional." },
      { titulo: "Orçamento e aprovação", descricao: "Enviamos o orçamento por escrito. Nada é executado sem sua aprovação." },
      { titulo: "Reparo e devolução", descricao: `Executamos o reparo e devolvemos a TV testada no ${b.nome}, com garantia.` },
    ],
    faq: [
      { pergunta: `Vocês coletam TV no ${b.nome}?`, resposta: `Sim. Coletamos com transporte adequado, próximo a ${b.pontosReferencia.slice(0, 2).join(" e ")}. A taxa mínima é R$ 299,99 e cobre retirada, transporte e diagnóstico.` },
      { pergunta: "Como saber se vale a pena consertar?", resposta: "TVs de 40\" ou maiores, com menos de 5 anos e marcas boas (Samsung, LG, Sony) geralmente compensam. Painel LCD trincado raramente compensa — orientamos com transparência antes da coleta." },
      { pergunta: "O que fazer antes de solicitar coleta?", resposta: "Teste em uma tomada diferente sem estabilizador, desconecte cabos HDMI/USB, ligue no botão do painel (não só no controle) e anote se o LED de standby acende. Isso ajuda a pré-diagnosticar." },
      { pergunta: "Qual o prazo?", resposta: "O prazo padrão é de 3 a 10 dias úteis conforme a disponibilidade de peças. Informamos o prazo estimado junto do orçamento." },
    ],
    pontosReferencia: b.pontosReferencia,
    tempoAtendimento: b.tempoAtendimento,
    servicosRelacionados: [
      { nome: "Configuração de Wi-Fi", slug: "redes-wifi" },
      { nome: "Suporte para empresas", slug: "suporte-empresas" },
      { nome: "Coleta e entrega", slug: "coleta-e-entrega" },
    ],
    bairrosProximos: b.bairrosProximos,
  };
}
