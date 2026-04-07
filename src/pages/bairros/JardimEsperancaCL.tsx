import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Esperança",
  slug: "jardim-esperanca-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Jardim Esperança | Campo Largo | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Esperança, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Esperança – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Jardim Esperança. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Esperança é um bairro residencial de Campo Largo. Nosso técnico realiza manutenção preventiva e corretiva de computadores.`,
  pontosReferencia: [
    "Centro (acesso)",
    "São Silvestre (divisa)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 50-65 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimEsperancaCL = () => <BairroTemplate data={data} />;

export default JardimEsperancaCL;
