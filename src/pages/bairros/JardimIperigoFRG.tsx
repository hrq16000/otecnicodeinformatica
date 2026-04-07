import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Ipê",
  slug: "jardim-ipe-frg",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Jardim Ipê | Fazenda Rio Grande | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Ipê, Fazenda Rio Grande. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Ipê – Fazenda Rio Grande",
  subtitulo: "Atendimento profissional a domicílio no Jardim Ipê. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Ipê é uma região residencial de Fazenda Rio Grande. Nosso técnico de informática atende Jardim Ipê a domicílio, resolvendo problemas de computador com diagnóstico profissional e preço justo.`,
  pontosReferencia: ["Centro de FRG (acesso)", "Nações (divisa)", "Pioneiros (próximo)", "BR-116"],
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

const JardimIperigoFRG = () => <BairroTemplate data={data} />;

export default JardimIperigoFRG;
