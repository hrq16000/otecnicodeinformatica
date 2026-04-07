import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São Marcos",
  slug: "sao-marcos-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no São Marcos | Campo Largo | Técnico Curitiba",
  metaDescription: "Técnico de informática no São Marcos, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no São Marcos – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no São Marcos. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `São Marcos é uma região de Campo Largo com perfil residencial. Atendemos com manutenção completa de computadores e notebooks.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Jardim Guilhermina (divisa)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 45-65 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const SaoMarcosCampoLargo = () => <BairroTemplate data={data} />;

export default SaoMarcosCampoLargo;
