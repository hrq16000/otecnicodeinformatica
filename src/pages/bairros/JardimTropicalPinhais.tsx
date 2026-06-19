import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Tropical",
  slug: "jardim-tropical-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Tropical | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Tropical, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Tropical – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Tropical. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Tropical é um bairro de Pinhais com boa infraestrutura. Oferecemos manutenção de computadores, notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Palmital (divisa)",
    "Estrada da Graciosa"
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

const JardimTropicalPinhais = () => <BairroTemplate data={data} />;

export default JardimTropicalPinhais;
