import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Santa Felicidade",
  slug: "santa-felicidade",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática em Santa Felicidade Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática em Santa Felicidade, Curitiba. Atendimento para residências e restaurantes. Conserto de PC e notebook. a partir de R$ 99,99.",
  h1: "Técnico de Informática em Santa Felicidade",
  subtitulo: "Atendimento técnico no tradicional bairro italiano de Curitiba",
  descricaoLonga: `Santa Felicidade é um dos bairros mais tradicionais e encantadores de Curitiba, 
    conhecido por sua forte herança italiana, restaurantes típicos e ambiente familiar. Nossa 
    assistência técnica em informática atende toda a região de Santa Felicidade, incluindo 
    as famosas vinícolas, restaurantes da Avenida Manoel Ribas e as áreas residenciais 
    mais tranquilas. Entendemos as necessidades dos comerciantes locais, que precisam de 
    sistemas de ponto de venda funcionando, e das famílias que valorizam serviço de 
    qualidade com atendimento personalizado. Atendemos também os bairros vizinhos como 
    Cascatinha, São Braz e Orleans, sempre com a pontualidade e profissionalismo que 
    você merece.`,
  pontosReferencia: [
    "Avenida Manoel Ribas",
    "Bosque do Papa",
    "Cascatinha",
    "São Braz",
    "Orleans",
    "Parque Tanguá"
  ],
  tempoDeslocamento: "Atendimento agendado - região norte",
  servicosDestaque: [
    "Suporte para restaurantes",
    "Sistemas de PDV",
    "Rede para comércio",
    "Conserto de notebook",
    "Formatação completa",
    "Backup de dados"
  ]
};

const SantaFelicidade = () => <BairroTemplate data={data} />;

export default SantaFelicidade;
