import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Afonso Pena",
  slug: "afonso-pena",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Afonso Pena SJP | Técnico Curitiba",
  metaDescription: "Técnico de informática no Afonso Pena, São José dos Pinhais. Visita técnica a domicílio. Conserto de PC, formatação e suporte. A partir de A partir de R$ 69,99.",
  h1: "Técnico de Informática no Afonso Pena – SJP",
  subtitulo: "Atendimento técnico no Afonso Pena e proximidades do aeroporto",
  descricaoLonga: `O bairro Afonso Pena em São José dos Pinhais é uma região estratégica próxima 
    ao Aeroporto Internacional. Nossa assistência técnica atende residências e empresas locais 
    com serviços completos de informática. Atendemos também bairros vizinhos como Aviação e Costeira.`,
  pontosReferencia: ["Aeroporto Afonso Pena", "Aviação", "Costeira", "Guatupê"],
  tempoDeslocamento: "Atendimento no mesmo dia",
  servicosDestaque: ["Formatação", "Remoção de vírus", "Upgrade", "Rede Wi-Fi", "Backup", "Suporte remoto"]
};

const AfonsoPena = () => <BairroTemplate data={data} />;
export default AfonsoPena;
