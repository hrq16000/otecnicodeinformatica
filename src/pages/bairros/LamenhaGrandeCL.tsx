import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Lamenha Grande",
  slug: "lamenha-grande-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Lamenha Grande | Campo Largo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Lamenha Grande, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Lamenha Grande – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Lamenha Grande. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Lamenha Grande é uma região de Campo Largo próxima à divisa com Curitiba. Atendemos com serviços de formatação, vírus e upgrade.`,
  pontosReferencia: [
    "Campo Comprido/Curitiba (divisa)",
    "Centro de CL (acesso)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 40-55 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const LamenhaGrandeCL = () => <BairroTemplate data={data} />;

export default LamenhaGrandeCL;
