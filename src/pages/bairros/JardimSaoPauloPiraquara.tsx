import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim São Paulo",
  slug: "jardim-sao-paulo-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Jardim São Paulo | Piraquara | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim São Paulo, Piraquara. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim São Paulo – Piraquara",
  subtitulo: "Atendimento profissional a domicílio no Jardim São Paulo. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim São Paulo é um bairro residencial de Piraquara com acesso facilitado ao centro. Nosso técnico de informática atende Jardim São Paulo a domicílio, resolvendo problemas como computador lento, vírus, notebook com defeito e rede instável.`,
  pontosReferencia: ["Centro de Piraquara (próximo)", "Caiuá (divisa)", "Rua Curitiba", "Jardim Primavera (acesso)"],
  tempoDeslocamento: "Atendimento em até 50 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimSaoPauloPiraquara = () => <BairroTemplate data={data} />;

export default JardimSaoPauloPiraquara;
