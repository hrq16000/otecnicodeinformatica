// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Novo Mundo",
  slug: "novo-mundo",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Novo Mundo | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Novo Mundo, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Novo Mundo – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Novo Mundo. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Novo Mundo é um bairro residencial e comercial de Curitiba, com excelente infraestrutura e acesso fácil por vias como a BR-476. A região possui muitas residências e empresas que dependem de suporte técnico confiável. Nosso técnico de informática atende o Novo Mundo a domicílio com diagnóstico profissional, serviços de formatação, conserto de PC e notebook, configuração de redes e backup de dados.`,
  pontosReferencia: ["BR-476 (Linha Verde)", "Rua Eduardo Sprada", "Portão (divisa)", "Fazendinha (divisa)", "Terminal Fazendinha (próximo)"],
  tempoDeslocamento: "Atendimento em até 35 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const NovoMundo = () => <BairroTemplate data={data} />;

export default NovoMundo;
