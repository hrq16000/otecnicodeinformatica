// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Agrícola",
  slug: "agricola-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Agrícola | São José dos Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Agrícola, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Agrícola – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Agrícola. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O bairro Agrícola é uma região em desenvolvimento de São José dos Pinhais, com perfil residencial e industrial. Nosso técnico atende Agrícola a domicílio, oferecendo suporte técnico profissional para computadores e notebooks, incluindo formatação, limpeza de vírus, upgrade SSD e manutenção preventiva.`,
  pontosReferencia: ["Contorno Leste", "BR-376 (próxima)", "Afonso Pena (próximo)", "Centro Industrial de SJP"],
  tempoDeslocamento: "Atendimento em até 45 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const AgricolareSJP = () => <BairroTemplate data={data} />;

export default AgricolareSJP;
