import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Japão",
  slug: "jardim-japao-qb",
  cidade: "Quatro Barras",
  metaTitle: "Técnico de Informática no Jardim Japão | Quatro Barras | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Japão, Quatro Barras. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Japão – Quatro Barras",
  subtitulo: "Atendimento profissional a domicílio no Jardim Japão. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Japão é uma região residencial de Quatro Barras. Nosso técnico atende a domicílio com equipamento profissional para diagnóstico e reparo de computadores e notebooks.`,
  pontosReferencia: ["Centro de Quatro Barras (acesso)", "Vila Maria (divisa)", "Borda do Campo (próximo)"],
  tempoDeslocamento: "Atendimento agendado",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimJaponeQB = () => <BairroTemplate data={data} />;

export default JardimJaponeQB;
