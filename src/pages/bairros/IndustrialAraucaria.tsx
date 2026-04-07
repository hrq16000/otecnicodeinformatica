import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Industrial",
  slug: "industrial-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Industrial | Araucária | Técnico Curitiba",
  metaDescription: "Técnico de informática no Industrial, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Industrial – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Industrial. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O bairro Industrial de Araucária concentra empresas e indústrias da região. Atendemos com suporte técnico corporativo e residencial, incluindo manutenção de redes e servidores.`,
  pontosReferencia: [
    "CIAR",
    "Thomaz Coelho (divisa)",
    "Av. das Araucárias"
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

const IndustrialAraucaria = () => <BairroTemplate data={data} />;

export default IndustrialAraucaria;
