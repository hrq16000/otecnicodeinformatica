import { BairroTemplate } from "./BairroTemplate";

const CentroAT = () => {
  const data = {
    nome: "Centro (Almirante Tamandaré)",
    slug: "centro-almirante-tamandare",
    cidade: "Almirante Tamandaré",
    metaTitle: "Técnico de Informática no Centro de Almirante Tamandaré | Técnico Curitiba",
    metaDescription: "Técnico de informática no Centro de Almirante Tamandaré. Formatação, conserto, vírus, upgrade. Atendimento a domicílio rápido. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Centro de Almirante Tamandaré",
    subtitulo: "Assistência técnica profissional no Centro de Almirante Tamandaré com diagnóstico transparente e garantia.",
    descricaoLonga: `O Centro de Almirante Tamandaré é a região mais movimentada da cidade, com comércio ativo e grande fluxo residencial. O acesso rápido pela Rodovia dos Minérios facilita o deslocamento do nosso técnico.

Atendemos o Centro com todos os serviços de informática: formatação, remoção de vírus, upgrade de hardware, conserto de notebook e configuração de rede. Diagnóstico no local, orçamento antes da execução e garantia por escrito.`,
    pontosReferencia: ["Prefeitura de Almirante Tamandaré", "Rodovia dos Minérios", "Comércio central", "Terminal de ônibus"],
    tempoDeslocamento: "Chegamos em 30-45 minutos",
    servicosDestaque: ["Formatação Windows 10/11", "Remoção de vírus e malware", "Upgrade SSD e RAM", "Conserto de notebook", "Configuração Wi-Fi", "Backup"],
  };
  return <BairroTemplate data={data} />;
};
export default CentroAT;
