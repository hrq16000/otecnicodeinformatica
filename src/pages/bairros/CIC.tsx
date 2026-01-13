import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "CIC",
  slug: "cic",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no CIC Curitiba | Suporte Técnico | Técnico Curitiba",
  metaDescription: "Técnico de informática no CIC (Cidade Industrial de Curitiba). Suporte para empresas e residências. Manutenção de computadores. A partir de R$99,99.",
  h1: "Técnico de Informática no CIC – Curitiba",
  subtitulo: "Suporte técnico para empresas e residências na Cidade Industrial de Curitiba",
  descricaoLonga: `A Cidade Industrial de Curitiba (CIC) é o maior bairro de Curitiba em extensão, 
    abrigando centenas de indústrias, comércios e milhares de residências. Nossa equipe de 
    técnicos de informática oferece atendimento especializado para toda a região do CIC, 
    entendendo as necessidades tanto de empresas quanto de moradores. Para as empresas, 
    oferecemos suporte técnico com SLA, manutenção preventiva de equipamentos e atendimento 
    emergencial. Para residências, trazemos a mesma qualidade profissional com preços 
    acessíveis. Conhecemos bem a região, desde as proximidades da Rua João Bettega até 
    as áreas mais industriais próximas à Linha Verde. Atendimento ágil mesmo em uma 
    região tão extensa.`,
  pontosReferencia: [
    "Rua João Bettega",
    "Linha Verde",
    "Terminal CIC",
    "Augusta",
    "São Miguel",
    "Tatuquara"
  ],
  tempoDeslocamento: "Atendimento programado - cobertura completa",
  servicosDestaque: [
    "Suporte para empresas",
    "Manutenção de servidores",
    "Rede corporativa",
    "Formatação em lote",
    "Backup empresarial",
    "Suporte residencial"
  ]
};

const CIC = () => <BairroTemplate data={data} />;

export default CIC;
