// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São José",
  slug: "sao-jose-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no São José | Campo Largo | O Técnico de Informática",
  metaDescription: "Técnico de informática no São José, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no São José – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no São José. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `São José é um bairro tradicional de Campo Largo. Oferecemos assistência técnica a domicílio para PCs, notebooks e configuração de redes.`,
  pontosReferencia: [
    "Centro de Campo Largo (próximo)",
    "Santa Cruz (divisa)",
    "PR-423"
  ],
  tempoDeslocamento: "Chegamos em 45-60 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const SaoJoseCampoLargo = () => <BairroTemplate data={data} />;

export default SaoJoseCampoLargo;
