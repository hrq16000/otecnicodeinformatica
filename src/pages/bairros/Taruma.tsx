import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Tarumã",
  slug: "taruma",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Tarumã | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Tarumã, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Tarumã – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Tarumã. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Tarumã é um bairro residencial tranquilo de Curitiba, próximo ao Parque São Lourenço e ao Capão da Imbuia. Com ruas arborizadas e perfil familiar, a região tem moradores que dependem de computadores para trabalho remoto e estudos. Nosso técnico de informática atende o Tarumã a domicílio com pontualidade, oferecendo diagnóstico profissional, formatação, limpeza interna, upgrade SSD e configuração de redes.`,
  pontosReferencia: ["Parque São Lourenço (próximo)", "Rua Mateus Leme (próxima)", "Capão da Imbuia (divisa)", "Rua Lothário Boutin"],
  tempoDeslocamento: "Atendimento em até 45 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const Taruma = () => <BairroTemplate data={data} />;

export default Taruma;
