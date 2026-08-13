// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São José dos Pinhais",
  slug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática em São José dos Pinhais | Atendimento Rápido | O Técnico de Informática",
  metaDescription: "Técnico de informática em São José dos Pinhais. Atendimento em domicílio para PC e notebook. Formatação, vírus, upgrade. a partir de R$ 99,99.",
  h1: "Técnico de Informática em São José dos Pinhais",
  subtitulo: "Atendimento profissional em toda São José dos Pinhais e região metropolitana",
  descricaoLonga: `São José dos Pinhais é um dos maiores municípios da região metropolitana de Curitiba, 
    com forte presença industrial, comercial e residencial. Nossa equipe de técnicos de informática 
    oferece cobertura completa em São José dos Pinhais, atendendo desde o Centro até bairros como 
    Afonso Pena, Cruzeiro, Aristocrata, Braga e região do Aeroporto. Conhecemos bem a cidade e 
    entendemos a necessidade de atendimento rápido para empresas e residências. Oferecemos os 
    mesmos serviços de qualidade disponíveis em Curitiba, com preços justos e transparentes. 
    Se você está em SJP e precisa de um técnico de informática confiável, conte conosco!`,
  pontosReferencia: [
    "Centro de SJP",
    "Afonso Pena",
    "Cruzeiro",
    "Aristocrata",
    "Braga",
    "Aeroporto Afonso Pena"
  ],
  tempoDeslocamento: "Atendimento agendado - cobertura completa em SJP",
  servicosDestaque: [
    "Formatação Windows",
    "Remoção de vírus",
    "Conserto de notebook",
    "Upgrade SSD e memória",
    "Suporte para empresas",
    "Configuração de rede"
  ]
};

const SaoJoseDosPinhais = () => <BairroTemplate data={data} />;

export default SaoJoseDosPinhais;
