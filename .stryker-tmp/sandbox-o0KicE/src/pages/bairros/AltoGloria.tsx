// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Alto da Glória",
  slug: "alto-da-gloria",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Alto da Glória | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Alto da Glória, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Alto da Glória – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Alto da Glória. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Alto da Glória é um bairro residencial tradicional de Curitiba, próximo ao Centro Cívico e ao Passeio Público. Com muitas residências antigas e edifícios, a região concentra moradores que valorizam praticidade e proximidade do centro. Nosso técnico de informática atende o Alto da Glória a domicílio com rapidez, realizando diagnóstico no local, formatação, conserto de notebooks e configuração de redes. Atendemos tanto residências quanto pequenos escritórios da região, com pontualidade e equipamento profissional.`,
  pontosReferencia: ["Passeio Público", "Centro Cívico", "Rua Amintas de Barros", "Praça Eufrásio Correia", "Shopping Mueller (próximo)", "Rua Ubaldino do Amaral"],
  tempoDeslocamento: "Atendimento em até 40 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const AltoGloria = () => <BairroTemplate data={data} />;

export default AltoGloria;
