// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const CentroColombo = () => {
  const data = {
    nome: "Centro (Colombo)",
    slug: "centro-colombo",
    cidade: "Colombo",
    metaTitle: "Técnico de Informática no Centro de Colombo | Atendimento Rápido | O Técnico de Informática",
    metaDescription: "Técnico de informática no Centro de Colombo PR. Formatação, conserto de notebook/PC, remoção de vírus e upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Centro de Colombo",
    subtitulo: "Assistência técnica no Centro de Colombo com atendimento rápido, diagnóstico profissional e garantia.",
    descricaoLonga: `O Centro de Colombo é a região mais movimentada da cidade, com forte concentração comercial e residencial. A proximidade com Curitiba pela Estrada da Ribeira facilita nosso deslocamento.

Atendemos o Centro de Colombo com foco em resolver problemas do dia a dia: computador lento, notebook que não liga, vírus, Wi-Fi instável e upgrades. Nosso técnico vai até você com equipamento profissional e resolve a maioria dos casos na primeira visita.`,
    pontosReferencia: ["Prefeitura de Colombo", "Estrada da Ribeira", "Comércio central", "Terminal de ônibus"],
    tempoDeslocamento: "Chegamos em 30-45 minutos",
    servicosDestaque: ["Formatação Windows", "Remoção de vírus", "Upgrade SSD/RAM", "Conserto de notebook", "Configuração Wi-Fi", "Backup"],
  };
  return <BairroTemplate data={data} />;
};
export default CentroColombo;
