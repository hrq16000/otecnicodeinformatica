import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Espigão Alegre",
  slug: "espigao-alegre-cm",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no Espigão Alegre | Campo Magro | Técnico Curitiba",
  metaDescription: "Técnico de informática no Espigão Alegre, Campo Magro. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Espigão Alegre – Campo Magro",
  subtitulo: "Atendimento profissional a domicílio no Espigão Alegre. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Espigão Alegre é uma região de Campo Magro. Nosso técnico de informática atende a domicílio com visita agendada, oferecendo manutenção completa de computadores e notebooks.`,
  pontosReferencia: ["Campo Magro Centro (acesso)", "Jardim Boa Vista (divisa)", "PR-090"],
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

const EspigoAlegreCM = () => <BairroTemplate data={data} />;

export default EspigoAlegreCM;
