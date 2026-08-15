import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Botânico",
  slug: "jardim-botanico",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Jardim Botânico | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Botânico, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Botânico – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Jardim Botânico. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Jardim Botânico é um dos bairros mais icônicos de Curitiba, com forte turismo e também muitas residências e escritórios. A região atrai profissionais liberais e empresas criativas que dependem de tecnologia. Nosso técnico de informática atende o Jardim Botânico a domicílio com profissionalismo, oferecendo suporte para home office, formatação, conserto de notebooks, configuração de redes premium e backup na nuvem.`,
  pontosReferencia: ["Jardim Botânico de Curitiba", "Rua Engenheiro Ostoja Roguski", "UFPR (próxima)", "Prado Velho (divisa)", "Rua Imaculada Conceição"],
  tempoDeslocamento: "Atendimento agendado conforme a disponibilidade da agenda",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const AguaVerdeBairro = () => <BairroTemplate data={data} />;

export default AguaVerdeBairro;
