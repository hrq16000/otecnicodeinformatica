// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São Miguel",
  slug: "sao-miguel-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no São Miguel | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no São Miguel, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no São Miguel – Araucária",
  subtitulo: "Atendimento profissional a domicílio no São Miguel. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `São Miguel é um bairro de Araucária com perfil misto residencial e comercial. Nosso técnico oferece suporte completo para PCs, notebooks e redes.`,
  pontosReferencia: [
    "Centro de Araucária (próximo)",
    "Chapada (divisa)",
    "Av. das Araucárias"
  ],
  tempoDeslocamento: "Chegamos em 35-50 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const SaoMiguelAraucaria = () => <BairroTemplate data={data} />;

export default SaoMiguelAraucaria;
