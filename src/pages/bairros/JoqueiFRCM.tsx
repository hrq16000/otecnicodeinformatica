import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jóquei Clube",
  slug: "joquei-clube-cm",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no Jóquei Clube | Campo Magro | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jóquei Clube, Campo Magro. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jóquei Clube – Campo Magro",
  subtitulo: "Atendimento profissional a domicílio no Jóquei Clube. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jóquei Clube é uma região de Campo Magro com perfil residencial e rural. Nosso técnico de informática atende a domicílio com visita agendada, equipamento profissional e diagnóstico no local.`,
  pontosReferencia: ["Centro de Campo Magro (acesso)", "Sede (divisa)", "PR-090", "São Sebastião (próximo)"],
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

const JoqueiFRCM = () => <BairroTemplate data={data} />;

export default JoqueiFRCM;
