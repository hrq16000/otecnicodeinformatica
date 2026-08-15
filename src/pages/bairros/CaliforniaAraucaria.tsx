import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Califórnia",
  slug: "california-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Califórnia | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Califórnia, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Califórnia – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Califórnia. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Califórnia é uma região em crescimento de Araucária. Atendemos com serviços de formatação, remoção de vírus, upgrade e configuração de redes.`,
  pontosReferencia: [
    "Centro de Araucária (acesso)",
    "Iguaçu (divisa)",
    "BR-476"
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

const CaliforniaAraucaria = () => <BairroTemplate data={data} />;

export default CaliforniaAraucaria;
