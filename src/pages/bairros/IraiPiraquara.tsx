import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Iraí",
  slug: "irai-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Iraí | Piraquara | Técnico Curitiba",
  metaDescription: "Técnico de informática no Iraí, Piraquara. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Iraí – Piraquara",
  subtitulo: "Atendimento profissional a domicílio no Iraí. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Iraí é uma região de Piraquara com perfil residencial. Nosso técnico atende a domicílio com diagnóstico profissional e serviços completos de manutenção de computadores e notebooks. Formatação, conserto, upgrade e suporte técnico com garantia.`,
  pontosReferencia: ["Centro de Piraquara (acesso)", "Prado Velho (divisa)", "BR-116 (próxima)"],
  tempoDeslocamento: "Atendimento agendado",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const IraiPiraquara = () => <BairroTemplate data={data} />;

export default IraiPiraquara;
