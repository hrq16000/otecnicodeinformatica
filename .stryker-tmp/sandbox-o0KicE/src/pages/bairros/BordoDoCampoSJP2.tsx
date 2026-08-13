// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Borda do Campo",
  slug: "borda-campo-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Borda do Campo | São José dos Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Borda do Campo, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Borda do Campo – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Borda do Campo. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Borda do Campo é uma região residencial e de transição em São José dos Pinhais. Nosso técnico atende a domicílio toda a região de Borda do Campo com diagnóstico profissional, serviços de formatação, conserto de notebooks e configuração de redes Wi-Fi. Atendimento agendado com pontualidade.`,
  pontosReferencia: ["BR-376 (próxima)", "Centro de SJP (acesso)", "Rio Pequeno (divisa)", "Contorno Leste"],
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

const BordoDoCampoSJP2 = () => <BairroTemplate data={data} />;

export default BordoDoCampoSJP2;
