import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Alto Boqueirão",
  slug: "alto-boqueirao",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Alto Boqueirão | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Alto Boqueirão, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Alto Boqueirão – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Alto Boqueirão. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Alto Boqueirão é uma das regiões mais populosas de Curitiba, com forte presença residencial e comercial. A região abriga milhares de famílias que dependem de tecnologia para trabalho, estudos e entretenimento. Nosso técnico de informática atende todo o Alto Boqueirão a domicílio, com diagnóstico profissional no local e preços acessíveis. Resolvemos desde computador lento até configuração de redes e backup de dados importantes.`,
  pontosReferencia: ["Terminal Boqueirão", "Rua Francisco Derosso", "Av. Marechal Floriano Peixoto", "Shopping Total (próximo)", "Parque Iguaçu"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const AltoBoqueiraoCtba = () => <BairroTemplate data={data} />;

export default AltoBoqueiraoCtba;
