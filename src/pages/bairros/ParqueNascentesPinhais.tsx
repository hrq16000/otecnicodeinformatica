import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Parque das Nascentes",
  slug: "parque-nascentes-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Parque das Nascentes | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Parque das Nascentes, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Parque das Nascentes – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Parque das Nascentes. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Parque das Nascentes é uma região de Pinhais com perfil residencial e áreas verdes. Atendemos com visita técnica agendada.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Vargem Grande (divisa)",
    "Av. Iraí"
  ],
  tempoDeslocamento: "Chegamos em 25-40 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ParqueNascentesPinhais = () => <BairroTemplate data={data} />;

export default ParqueNascentesPinhais;
