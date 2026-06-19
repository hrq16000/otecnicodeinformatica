import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Configuração de Redes Wi-Fi em Santa Felicidade Curitiba | Técnico Curitiba",
  metaDescription: "Configuração de redes Wi-Fi em Santa Felicidade, Curitiba. Roteadores, mesh e cabeamento. Cobertura total para casas e restaurantes. a partir de R$ 99,99.",
  
  servico: "Configuração de Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Santa Felicidade",
  bairroSlug: "santa-felicidade",
  cidade: "Curitiba",
  
  h1: "Configuração de Redes Wi-Fi em Santa Felicidade",
  subtitulo: "Wi-Fi rápido e estável para residências e restaurantes. Configuração profissional com cobertura total em Santa Felicidade.",
  
  precoBase: "R$ 69,99",
  precoDescricao: "Configuração e otimização de rede. Equipamentos à parte.",
  
  descricaoLonga: `Internet instável em Santa Felicidade? Região de casas grandes, restaurantes e comércios que 
    precisam de cobertura Wi-Fi ampla e confiável. Nossa equipe é especializada em projetar redes 
    para ambientes desafiadores — casas com múltiplos andares, restaurantes com área externa e 
    comércios na Av. Manoel Ribas. Utilizamos sistemas mesh, access points profissionais e 
    cabeamento estruturado para garantir Wi-Fi em todos os cantos do seu espaço.`,
  
  beneficios: [
    "Wi-Fi mesh para casas grandes e restaurantes",
    "Cabeamento estruturado Cat5e/Cat6",
    "Configuração para múltiplos andares",
    "Rede dedicada para clientes (hotspot)",
    "Otimização de velocidade e canais",
    "Segurança WPA3 configurada",
    "Garantia de 90 dias na configuração",
    "Suporte remoto pós-instalação",
  ],
  
  processoPasso: [
    { titulo: "Visita", descricao: "Analisamos o espaço e necessidades de cobertura" },
    { titulo: "Projeto", descricao: "Definimos pontos de acesso e cabeamento ideal" },
    { titulo: "Instalação", descricao: "Configuramos toda a rede profissionalmente" },
    { titulo: "Validação", descricao: "Testamos velocidade e cobertura em todos os pontos" },
  ],
  
  faq: [
    { 
      pergunta: "Configuram Wi-Fi para restaurantes em Santa Felicidade?", 
      resposta: "Sim! Temos ampla experiência com restaurantes da região. Criamos redes separadas para clientes e operação, com portal de acesso personalizado." 
    },
    { 
      pergunta: "Minha casa é grande, o Wi-Fi não alcança todos os cômodos", 
      resposta: "O sistema mesh é ideal para esse caso. Instalamos pontos de acesso estratégicos para cobertura total sem perda de velocidade." 
    },
    { 
      pergunta: "Vocês instalam cabeamento de rede?", 
      resposta: "Sim! Fazemos cabeamento estruturado Cat5e e Cat6 com acabamento profissional em canaletas." 
    },
    { 
      pergunta: "Qual a diferença entre repetidor e mesh?", 
      resposta: "O repetidor reduz a velocidade pela metade. O mesh mantém a velocidade total e faz transição automática entre pontos — muito superior para residências grandes." 
    },
  ],
  
  pontosReferencia: [
    "Av. Manoel Ribas",
    "Portal de Santa Felicidade",
    "Restaurante Madalosso",
    "Vinícola Durigan",
    "Bosque Reinhard Maack",
    "Parque Tanguá (proximidades)",
    "Rua Via Vêneto",
  ],
  
  tempoAtendimento: "Agendamento em até 24h",
  
  servicosRelacionados: [
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
  ],
  
  bairrosProximos: [
    { nome: "CIC", slug: "cic" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
    { nome: "Portão", slug: "portao" },
    { nome: "Centro", slug: "centro" },
  ],
};

const RedesWifiSantaFelicidade = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiSantaFelicidade;
