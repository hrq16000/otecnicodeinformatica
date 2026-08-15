import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Configuração de Redes Wi-Fi no CIC Curitiba | Internet Estável | O Técnico de Informática",
  metaDescription: "Configuração e instalação de redes Wi-Fi no CIC, Curitiba. Roteadores, repetidores, mesh e cabeamento. Cobertura total para empresas e residências. a partir de R$ 99,99.",
  
  servico: "Configuração de Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "CIC",
  bairroSlug: "cic",
  cidade: "Curitiba",
  
  h1: "Configuração de Redes Wi-Fi no CIC",
  subtitulo: "Internet sem travamentos em todo o ambiente. Configuração profissional de roteadores, mesh e cabeamento estruturado no CIC.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Configuração e otimização da rede. Equipamentos com valores à parte.",
  
  descricaoLonga: `Problemas com Wi-Fi no CIC? Sinal fraco, quedas constantes ou velocidade abaixo do contratado? 
    Nossa equipe especializada em redes atende toda a Cidade Industrial de Curitiba com soluções 
    profissionais. Configuramos roteadores, sistemas mesh, repetidores e cabeamento estruturado para 
    empresas e residências. Atendemos galpões industriais, escritórios na Av. das Indústrias, 
    comércios e residências em todo o CIC. Por ser uma região extensa, oferecemos soluções 
    específicas para cobertura de grandes áreas.`,
  
  beneficios: [
    "Configuração de roteadores e access points",
    "Sistema mesh para cobertura total",
    "Cabeamento estruturado Cat5e/Cat6",
    "Otimização de canais e frequências",
    "Segurança WPA3 e firewall configurado",
    "Solução para áreas extensas e galpões",
    "Garantia de 90 dias na configuração",
    "Suporte pós-instalação incluso",
  ],
  
  processoPasso: [
    { titulo: "Análise", descricao: "Mapeamos o local e identificamos pontos de melhoria" },
    { titulo: "Projeto", descricao: "Definimos a melhor solução para seu espaço" },
    { titulo: "Instalação", descricao: "Configuramos toda a rede com segurança" },
    { titulo: "Teste", descricao: "Verificamos cobertura e velocidade em todos os pontos" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês atendem empresas industriais no CIC?", 
      resposta: "Sim! Temos experiência com galpões, fábricas e escritórios industriais. Utilizamos equipamentos profissionais para cobertura de grandes áreas." 
    },
    { 
      pergunta: "Qual a melhor solução para Wi-Fi em galpão?", 
      resposta: "Para galpões recomendamos access points industriais com cabeamento estruturado. Fazemos o projeto completo considerando interferências do ambiente." 
    },
    { 
      pergunta: "Configuram rede para câmeras CFTV?", 
      resposta: "Sim! Configuramos redes dedicadas para sistemas de câmeras com QoS priorizado para vídeo sem quedas." 
    },
    { 
      pergunta: "Quanto custa um sistema mesh?", 
      resposta: "O valor varia conforme a área. Fazemos valor personalizado considerando o tamanho do espaço e número de dispositivos." 
    },
  ],
  
  pontosReferencia: [
    "Av. das Indústrias",
    "Rua João Bettega",
    "Terminal CIC",
    "Parque Barigüi (proximidades)",
    "Rua Pedro Gusso",
    "Barracão Industrial CIC",
    "Rua Desembargador Westphalen",
  ],
  
  tempoAtendimento: "Agendamento em até 24h",
  
  servicosRelacionados: [
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Montagem de PC", slug: "montagem-pc" },
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
  ],
  
  bairrosProximos: [
    { nome: "Portão", slug: "portao" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Centro", slug: "centro" },
  ],
};

const RedesWifiCIC = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiCIC;
