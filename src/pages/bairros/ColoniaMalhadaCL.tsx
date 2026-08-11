import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Colônia Malhada",
  slug: "colonia-malhada-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Colônia Malhada | Campo Largo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Colônia Malhada, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Colônia Malhada – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Colônia Malhada. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Colônia Malhada é uma região de Campo Largo com características rurais e residenciais. Atendemos com visita agendada.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Bateias (divisa)",
    "PR-423"
  ],
  tempoDeslocamento: "Chegamos em 55-75 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ColoniaMalhadaCL = () => <BairroTemplate data={data} />;

export default ColoniaMalhadaCL;
