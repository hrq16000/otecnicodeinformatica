import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Quississana",
  slug: "quississana-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Quississana | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Quississana, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Quississana – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Quississana. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Quississana é um bairro residencial de São José dos Pinhais com crescimento acelerado nos últimos anos. A região abriga muitas famílias e condomínios que dependem de tecnologia. Nosso técnico de informática atende Quississana a domicílio com diagnóstico profissional, formatação, conserto de notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: ["Av. Rui Barbosa (próxima)", "Centro de SJP (próximo)", "Rua Joinville", "Parque da Fonte (próximo)"],
  tempoDeslocamento: "Atendimento em até 40 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const QuissisanaSJP = () => <BairroTemplate data={data} />;

export default QuissisanaSJP;
