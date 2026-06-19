import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Instalação de Redes Wi-Fi em Pinhais | Técnico Local | Técnico Curitiba",
  metaDescription: "Instalação e configuração de redes Wi-Fi em Pinhais. Roteador, mesh, repetidor e Wi-Fi corporativo. Atendimento domiciliar. A partir de R$ 129,99.",

  servico: "Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Pinhais",
  bairroSlug: "pinhais",
  cidade: "Pinhais",

  h1: "Instalação de Redes Wi-Fi em Pinhais",
  subtitulo: "Wi-Fi lento ou com sinal fraco em Pinhais? Configuramos redes profissionais para casa e empresa com técnico local.",

  precoBase: "R$ 129,99",
  precoDescricao: "Inclui configuração do roteador, otimização de canais, segurança e visita técnica em Pinhais.",

  descricaoLonga: `Cobertura Wi-Fi em toda Pinhais: Centro, Weissópolis, Pineville, Emiliano Perneta, Maria Antonieta,
    Vargem Grande, Estância e Atuba. Instalamos e configuramos roteadores domésticos, redes mesh para
    sobrados e empresas, access points profissionais e separação de redes (guest, IoT, corporativa).
    Resolvemos quedas constantes, sinal fraco em quartos, lentidão em videochamadas e streaming travando.
    Atendemos residências, comércios da Av. Iraí e empresas do parque industrial com técnico local.`,

  beneficios: [
    "Configuração profissional de roteador",
    "Redes mesh para sobrados e empresas",
    "Wi-Fi corporativo com rede separada",
    "Segurança WPA3, firewall e bloqueio",
    "Otimização de canais 2,4 e 5 GHz",
    "Atendimento em toda Pinhais",
    "Garantia de cobertura testada",
    "Suporte pós-instalação incluso",
  ],

  processoPasso: [
    { titulo: "Avaliação", descricao: "Analisamos o espaço e necessidades" },
    { titulo: "Projeto", descricao: "Definimos roteador / mesh / AP" },
    { titulo: "Instalação", descricao: "Configuração e cabeamento" },
    { titulo: "Teste", descricao: "Validamos cobertura e velocidade" },
  ],

  faq: [
    { pergunta: "Atendem empresas em Pinhais?", resposta: "Sim! Configuramos Wi-Fi corporativo, redes mesh e access points em comércios e indústrias de Pinhais." },
    { pergunta: "Pinhais tem taxa extra?", resposta: "Não! Pinhais é vizinha de Curitiba, sem taxa adicional de deslocamento." },
    { pergunta: "Fornecem o roteador?", resposta: "Indicamos o melhor para seu caso ou trabalhamos com o equipamento que você já tem. Também vendemos com preço competitivo." },
    { pergunta: "Quanto tempo demora?", resposta: "Residências: 1 a 2 horas. Empresas com múltiplos APs: meio período." },
  ],

  pontosReferencia: [
    "Centro de Pinhais",
    "Weissópolis",
    "Pineville",
    "Av. Iraí",
    "Emiliano Perneta",
    "Shopping Pinhais",
  ],

  tempoAtendimento: "Agendamento para mesmo dia ou próximo",

  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
  ],

  bairrosProximos: [
    { nome: "Centro (Curitiba)", slug: "centro" },
    { nome: "Batel (Curitiba)", slug: "batel" },
    { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
    { nome: "Atuba", slug: "atuba-pinhais" },
  ],
};

const RedesWifiPinhais = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiPinhais;
