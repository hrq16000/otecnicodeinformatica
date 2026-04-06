import { BairroTemplate } from "./BairroTemplate";

const GuaraitubaColombo = () => {
  const data = {
    nome: "Guaraituba",
    slug: "guaraituba-colombo",
    cidade: "Colombo",
    metaTitle: "Técnico de Informática no Guaraituba (Colombo) | Atendimento Domicílio | Técnico Curitiba",
    metaDescription: "Técnico de informática no Guaraituba, Colombo PR. Formatação, conserto, vírus, upgrade e redes. Atendimento a domicílio. A partir de R$ 99,99.",
    h1: "Técnico de Informática no Guaraituba – Colombo",
    subtitulo: "Assistência técnica no Guaraituba com atendimento domiciliar, diagnóstico preciso e preços justos.",
    descricaoLonga: `O Guaraituba é um bairro extenso e populoso de Colombo, com perfil predominantemente residencial. Muitos moradores dependem do computador para trabalho remoto, estudos e comunicação.

Se o seu computador está lento, travando, com vírus ou precisa de upgrade, nosso técnico atende o Guaraituba com serviços completos. Fazemos desde formatação e limpeza até troca de SSD, expansão de memória e configuração de rede Wi-Fi para toda a casa.`,
    pontosReferencia: ["Região do Guaraituba", "Acesso pela Estrada da Ribeira", "Área residencial extensa", "Bairros próximos (Maracanã, Campo Pequeno)"],
    tempoDeslocamento: "Chegamos em 35-50 minutos",
    servicosDestaque: ["Formatação Windows 10/11", "Remoção de vírus", "Upgrade SSD e RAM", "Conserto de notebook/PC", "Configuração de Wi-Fi", "Backup e recuperação"],
  };
  return <BairroTemplate data={data} />;
};
export default GuaraitubaColombo;
