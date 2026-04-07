import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim das Pedras",
  slug: "jardim-das-pedras-frg",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Jardim das Pedras | Fazenda Rio Grande | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim das Pedras, Fazenda Rio Grande. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim das Pedras – Fazenda Rio Grande",
  subtitulo: "Atendimento profissional a domicílio no Jardim das Pedras. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim das Pedras é um bairro de Fazenda Rio Grande com perfil residencial. Nosso técnico atende a domicílio com equipamento profissional para diagnóstico, manutenção e reparo de computadores e notebooks.`,
  pontosReferencia: ["Centro de FRG (acesso)", "Iguaçu (divisa)", "BR-116 (próxima)", "São Lourenço (próximo)"],
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

const JardimDasPedrasFRG = () => <BairroTemplate data={data} />;

export default JardimDasPedrasFRG;
