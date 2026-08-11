import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Seminário",
  slug: "seminario",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Seminário | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Seminário, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Seminário – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Seminário. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Seminário é um bairro residencial de Curitiba, vizinho ao Campo Comprido e ao Campina do Siqueira. A região tem crescido nos últimos anos com novos empreendimentos e abriga famílias que dependem de tecnologia no dia a dia. Nosso técnico de informática realiza atendimento a domicílio no Seminário com equipamento profissional, oferecendo serviços completos de manutenção, formatação, upgrade e suporte técnico para residências e pequenas empresas.`,
  pontosReferencia: ["Rua Capitão Souza Franco", "Campina do Siqueira (divisa)", "Campo Comprido (divisa)", "Rua Padre Anchieta", "Terminal Campina do Siqueira"],
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

const Seminario = () => <BairroTemplate data={data} />;

export default Seminario;
