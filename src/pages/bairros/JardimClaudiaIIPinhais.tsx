import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Cláudia II",
  slug: "jardim-claudia-ii-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Cláudia II | Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Cláudia II, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Cláudia II – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Cláudia II. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Cláudia II é uma extensão do Jardim Cláudia em Pinhais. Oferecemos suporte técnico completo a domicílio para computadores e notebooks.`,
  pontosReferencia: [
    "Jardim Cláudia (divisa)",
    "Centro (acesso)",
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

const JardimClaudiaIIPinhais = () => <BairroTemplate data={data} />;

export default JardimClaudiaIIPinhais;
