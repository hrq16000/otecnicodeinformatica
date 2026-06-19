import { BairroTemplate } from "./BairroTemplate";

const MaracanaColombo = () => {
  const data = {
    nome: "Maracanã",
    slug: "maracana-colombo",
    cidade: "Colombo",
    metaTitle: "Técnico de Informática no Maracanã (Colombo) | Conserto e Formatação | Técnico Curitiba",
    metaDescription: "Técnico de informática no Maracanã, Colombo PR. Conserto de notebook, formatação, vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Maracanã – Colombo",
    subtitulo: "Atendimento a domicílio no Maracanã com suporte técnico completo e garantia.",
    descricaoLonga: `O Maracanã é um dos bairros mais populosos de Colombo, com grande concentração residencial e comércio local ativo. A região tem acesso fácil pela Estrada da Ribeira e pela divisa com o bairro Atuba de Curitiba.

Atendemos o Maracanã com serviços completos de informática: formatação, limpeza de vírus, upgrades de hardware, conserto de notebook e configuração de redes. Nosso técnico conhece bem a região e chega rapidamente com todo o equipamento necessário para resolver no local.`,
    pontosReferencia: ["Região do Maracanã", "Divisa com Atuba (Curitiba)", "Comércio local", "Escolas da região"],
    tempoDeslocamento: "Chegamos em 25-40 minutos",
    servicosDestaque: ["Formatação e otimização", "Remoção de vírus e malware", "Upgrade SSD + migração", "Conserto de notebook", "Configuração de rede", "Backup na nuvem"],
  };
  return <BairroTemplate data={data} />;
};
export default MaracanaColombo;
