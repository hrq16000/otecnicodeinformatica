// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Condor",
  slug: "jardim-condor-frg",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Jardim Condor | Fazenda Rio Grande | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Condor, Fazenda Rio Grande. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Condor – Fazenda Rio Grande",
  subtitulo: "Atendimento profissional a domicílio no Jardim Condor. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Condor é um bairro residencial de Fazenda Rio Grande. Nosso técnico atende a domicílio com diagnóstico profissional no local, formatação, conserto e configuração de redes com preços acessíveis.`,
  pontosReferencia: ["Centro de FRG (próximo)", "Santa Terezinha (divisa)", "Gralha Azul (acesso)"],
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

const JardimCondorFRG = () => <BairroTemplate data={data} />;

export default JardimCondorFRG;
