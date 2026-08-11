import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Planta São Tiago",
  slug: "planta-sao-tiago-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Planta São Tiago | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Planta São Tiago, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Planta São Tiago – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Planta São Tiago. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Planta São Tiago é uma região residencial de Araucária. Realizamos manutenção de computadores, notebooks e redes com visita técnica agendada.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Chapada (divisa)",
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

const PlantaSaoTiagoAraucaria = () => <BairroTemplate data={data} />;

export default PlantaSaoTiagoAraucaria;
