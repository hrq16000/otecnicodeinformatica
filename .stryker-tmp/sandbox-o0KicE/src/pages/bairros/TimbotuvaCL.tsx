// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Timbotuva",
  slug: "timbotuva-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Timbotuva | Campo Largo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Timbotuva, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Timbotuva – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Timbotuva. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Timbotuva é uma comunidade de Campo Largo com perfil rural e residencial. Nosso técnico atende com visita agendada para diagnóstico e reparo.`,
  pontosReferencia: [
    "Centro de CL (acesso)",
    "Três Córregos (divisa)",
    "PR-423"
  ],
  tempoDeslocamento: "Chegamos em 55-70 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const TimbotuvaCL = () => <BairroTemplate data={data} />;

export default TimbotuvaCL;
