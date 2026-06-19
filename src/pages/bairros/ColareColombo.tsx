import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São Dimas",
  slug: "sao-dimas-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no São Dimas | Colombo | Técnico Curitiba",
  metaDescription: "Técnico de informática no São Dimas, Colombo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no São Dimas – Colombo",
  subtitulo: "Atendimento profissional a domicílio no São Dimas. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `São Dimas é um bairro residencial de Colombo com crescimento constante. A região abriga famílias que dependem de computadores para trabalho e estudos. Nosso técnico atende São Dimas a domicílio com pontualidade e equipamento profissional, realizando diagnóstico, manutenção e suporte completo.`,
  pontosReferencia: ["Centro de Colombo (próximo)", "Guaraituba (divisa)", "Rua da Graciosa", "Maracanã (acesso)"],
  tempoDeslocamento: "Atendimento em até 50 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ColareColombo = () => <BairroTemplate data={data} />;

export default ColareColombo;
