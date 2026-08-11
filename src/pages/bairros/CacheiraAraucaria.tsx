import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Cachoeira",
  slug: "cachoeira-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Cachoeira | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Cachoeira, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Cachoeira – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Cachoeira. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Cachoeira é uma região de Araucária com perfil residencial, próxima ao centro e com fácil acesso pelas principais vias. Atendemos com serviços completos de informática a domicílio.`,
  pontosReferencia: [
    "Centro de Araucária (acesso)",
    "Capela Velha (divisa)",
    "BR-476"
  ],
  tempoDeslocamento: "Chegamos em 40-55 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const CacheiraAraucaria = () => <BairroTemplate data={data} />;

export default CacheiraAraucaria;
