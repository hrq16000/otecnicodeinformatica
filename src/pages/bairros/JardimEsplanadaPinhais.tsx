import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Esplanada",
  slug: "jardim-esplanada-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Esplanada | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Esplanada, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Esplanada – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Esplanada. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Esplanada é uma região de Pinhais com boa acessibilidade. Oferecemos assistência técnica completa a domicílio.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Estância Pinhais (divisa)",
    "Av. Maringá"
  ],
  tempoDeslocamento: "Chegamos em 25-40 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimEsplanadaPinhais = () => <BairroTemplate data={data} />;

export default JardimEsplanadaPinhais;
