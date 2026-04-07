import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Batel",
  slug: "batel",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Batel Curitiba | Atendimento Premium | Técnico Curitiba",
  metaDescription: "Técnico de informática no Batel, Curitiba. Atendimento para residências e empresas. Serviço profissional com garantia. Visita técnica a partir de A partir de R$ 69,99.",
  h1: "Técnico de Informática no Batel – Curitiba",
  subtitulo: "Atendimento profissional no Batel e arredores. Residências e empresas.",
  descricaoLonga: `O Batel é um dos bairros mais sofisticados de Curitiba, abrigando residências 
    de alto padrão, escritórios executivos e empresas de diversos segmentos. Nossa assistência 
    técnica em informática atende toda a região do Batel com o profissionalismo que você espera: 
    técnico identificado, pontualidade, equipamentos de qualidade e atendimento personalizado. 
    Atendemos desde apartamentos na Alameda Dr. Carlos de Carvalho até escritórios próximos 
    ao Shopping Crystal e região do Alto da XV. Para clientes do Batel, oferecemos agendamento 
    prioritário e atendimento discreto, respeitando a privacidade e o ambiente residencial.`,
  pontosReferencia: [
    "Alameda Dr. Carlos de Carvalho",
    "Shopping Crystal",
    "Praça do Japão",
    "Alto da XV",
    "Rua Bispo Dom José",
    "Hospital Pequeno Príncipe"
  ],
  tempoDeslocamento: "Atendimento agendado no mesmo dia",
  servicosDestaque: [
    "Suporte para home office",
    "Configuração de smart home",
    "Formatação e upgrade",
    "Backup na nuvem",
    "Redes Wi-Fi premium",
    "Suporte para Apple e PC"
  ]
};

const Batel = () => <BairroTemplate data={data} />;

export default Batel;
