// @ts-nocheck
import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Instalação de Redes Wi-Fi em São José dos Pinhais | Técnico Especializado | O Técnico de Informática",
  metaDescription: "Instalação e configuração de redes Wi-Fi em São José dos Pinhais. Internet rápida em toda casa ou empresa. Roteadores, repetidores e mesh. A partir de R$ 129,99.",
  
  servico: "Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "São José dos Pinhais",
  bairroSlug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  
  h1: "Instalação de Redes Wi-Fi em São José dos Pinhais",
  subtitulo: "Wi-Fi lento ou com sinal fraco? Instalamos e configuramos redes profissionais para casa e empresa em SJP.",
  
  precoBase: "R$ 139,99",
  precoDescricao: "Inclui configuração completa do roteador, otimização de sinal e visita técnica.",
  
  descricaoLonga: `Uma rede Wi-Fi bem configurada é essencial para produtividade em São José dos Pinhais, 
    seja em casa, escritório ou empresa. Nossa equipe configura redes profissionais com cobertura total, 
    segurança avançada e velocidade máxima. Resolvemos problemas de sinal fraco, internet lenta e 
    instabilidade. Para empresas do distrito industrial e comércios do Centro, oferecemos soluções 
    corporativas com access points profissionais e redes mesh. Atendemos toda SJP com técnico local.`,
  
  beneficios: [
    "Configuração profissional de roteador",
    "Cobertura Wi-Fi em toda a área",
    "Redes mesh para grandes espaços",
    "Segurança com senha forte e firewall",
    "Separação de rede para visitantes",
    "Otimização de canais e frequência",
    "Atendimento em toda SJP",
    "Suporte pós-instalação incluso",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Analisamos o espaço e necessidades" },
    { titulo: "Projeto", descricao: "Definimos a melhor solução" },
    { titulo: "Instalação", descricao: "Configuração profissional completa" },
    { titulo: "Teste", descricao: "Validamos cobertura e velocidade" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês instalam redes Wi-Fi em empresas de SJP?", 
      resposta: "Sim! Atendemos desde pequenos escritórios até galpões industriais no distrito industrial de SJP com soluções profissionais." 
    },
    { 
      pergunta: "O que é rede mesh e quando preciso?", 
      resposta: "Rede mesh usa múltiplos pontos de acesso para cobrir áreas grandes. É ideal para casas com mais de 100m² ou empresas com múltiplos ambientes." 
    },
    { 
      pergunta: "Vocês fornecem o roteador?", 
      resposta: "Podemos indicar o melhor roteador para seu caso ou trabalhar com o equipamento que você já possui. Também vendemos equipamentos com preço competitivo." 
    },
    { 
      pergunta: "Quanto tempo leva a instalação?", 
      resposta: "Em média 1 a 2 horas para residências. Empresas com múltiplos pontos de acesso podem levar meio dia." 
    },
  ],
  
  pontosReferencia: [
    "Centro de São José dos Pinhais",
    "Distrito Industrial",
    "Aeroporto Afonso Pena",
    "Avenida das Torres",
    "Shopping São José",
    "Terminal Central SJP",
  ],
  
  tempoAtendimento: "Agendamento para Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "CFTV e Câmeras", slug: "cftv" },
  ],
  
  bairrosProximos: [
    { nome: "Afonso Pena", slug: "afonso-pena" },
    { nome: "Cruzeiro", slug: "cruzeiro" },
    { nome: "Aristocrata", slug: "aristocrata" },
    { nome: "Costeira", slug: "costeira" },
  ],
};

const RedesWifiSaoJosePinhais = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiSaoJosePinhais;
