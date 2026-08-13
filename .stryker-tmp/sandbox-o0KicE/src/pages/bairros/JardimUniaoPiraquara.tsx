// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim União",
  slug: "jardim-uniao-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Jardim União | Piraquara | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim União, Piraquara. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim União – Piraquara",
  subtitulo: "Atendimento profissional a domicílio no Jardim União. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim União é um bairro residencial de Piraquara com comunidade ativa. Nosso técnico de informática atende Jardim União a domicílio com diagnóstico profissional, formatação, conserto de notebooks, remoção de vírus e configuração de redes.`,
  pontosReferencia: ["Centro de Piraquara (próximo)", "Planta Deodoro (divisa)", "Rua Curitiba", "Guarituba (acesso)"],
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

const JardimUniaoPiraquara = () => <BairroTemplate data={data} />;

export default JardimUniaoPiraquara;
