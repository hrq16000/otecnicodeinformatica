import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Cândida",
  slug: "vila-candida-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Vila Cândida | Campo Largo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Vila Cândida, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Vila Cândida – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Vila Cândida. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Vila Cândida é um bairro residencial de Campo Largo com acesso facilitado pelo centro. Oferecemos suporte técnico completo a domicílio.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Jardim América (divisa)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 45-60 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const VilaCandidaCL = () => <BairroTemplate data={data} />;

export default VilaCandidaCL;
