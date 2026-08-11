import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Instalação de Redes Wi-Fi em Araucária | Internet Rápida | O Técnico de Informática",
  metaDescription: "Instalação e configuração de redes Wi-Fi em Araucária. Wi-Fi empresarial, residencial, repetidores e mesh. Técnico especializado. Atendimento conforme a agenda.",
  
  servico: "Instalação de Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Araucária",
  bairroSlug: "araucaria",
  cidade: "Araucária",
  
  h1: "Instalação de Redes Wi-Fi em Araucária",
  subtitulo: "Internet rápida e estável em toda sua casa ou empresa. Configuração profissional de roteadores e repetidores.",
  
  precoBase: "R$ 129,99",
  precoDescricao: "Instalação e configuração de rede Wi-Fi. Equipamentos não inclusos.",
  
  descricaoLonga: `Araucária é uma cidade em crescimento com muitas residências e empresas que 
    precisam de conexão Wi-Fi de qualidade. Nossa equipe oferece instalação e configuração 
    profissional de redes Wi-Fi para garantir internet rápida e estável em todos os cômodos. 
    Trabalhamos com roteadores de alta performance, repetidores, sistemas mesh e access points 
    empresariais. Atendemos desde o Centro de Araucária até bairros como Capela Velha, Thomaz 
    Coelho e região industrial. Para empresas, oferecemos soluções de Wi-Fi empresarial com 
    segurança avançada e gerenciamento centralizado.`,
  
  beneficios: [
    "Análise de cobertura no local",
    "Instalação de roteadores e repetidores",
    "Configuração de sistemas mesh",
    "Wi-Fi para empresas com segurança",
    "Redes separadas para visitantes",
    "Otimização de canais e frequências",
    "Configuração de senha segura",
    "Suporte pós-instalação",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos o ambiente e pontos de instalação" },
    { titulo: "Planejamento", descricao: "Definimos a melhor solução para sua necessidade" },
    { titulo: "Instalação", descricao: "Instalamos e configuramos os equipamentos" },
    { titulo: "Testes", descricao: "Verificamos cobertura e velocidade em todos os ambientes" },
  ],
  
  faq: [
    { 
      pergunta: "O sinal Wi-Fi não chega em todos os cômodos. Vocês resolvem?", 
      resposta: "Sim! Instalamos repetidores ou sistemas mesh para eliminar pontos sem sinal e garantir cobertura total da sua casa ou empresa." 
    },
    { 
      pergunta: "Vocês instalam Wi-Fi para empresas em Araucária?", 
      resposta: "Sim! Oferecemos soluções empresariais com roteadores profissionais, redes seguras e configuração para vários usuários simultâneos." 
    },
    { 
      pergunta: "Qual a diferença entre repetidor e mesh?", 
      resposta: "Repetidores ampliam o sinal mas criam redes separadas. Mesh cria uma rede única e inteligente que se adapta automaticamente, ideal para casas maiores." 
    },
    { 
      pergunta: "Vocês fornecem os equipamentos?", 
      resposta: "Podemos fornecer ou você pode comprar. Recomendamos as melhores marcas (TP-Link, Intelbras, Ubiquiti) conforme sua necessidade e valor do atendimento." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Araucária",
    "Parque Cachoeira",
    "Terminal Central",
    "Bairro Capela Velha",
    "Thomaz Coelho",
    "Região Industrial",
  ],
  
  tempoAtendimento: "Agendamento para Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Formatação", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Suporte Empresarial", slug: "suporte-empresas" },
  ],
  
  bairrosProximos: [
    { nome: "Centro Araucária", slug: "centro-araucaria" },
    { nome: "Capela Velha", slug: "capela-velha" },
    { nome: "Thomaz Coelho", slug: "thomaz-coelho" },
    { nome: "CIC Curitiba", slug: "cic" },
  ],
};

const RedesWifiAraucaria = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiAraucaria;
