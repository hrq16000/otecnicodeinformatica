import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Planalto II",
  slug: "jardim-planalto-ii-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Jardim Planalto II | Campo Largo | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Planalto II, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Planalto II – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Jardim Planalto II. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Planalto II é uma extensão do Jardim Planalto em Campo Largo, com perfil residencial. Atendemos com serviços completos de informática.`,
  pontosReferencia: [
    "Jardim Planalto (divisa)",
    "Centro (acesso)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 50-65 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimPlanaltoIICL = () => <BairroTemplate data={data} />;

export default JardimPlanaltoIICL;
