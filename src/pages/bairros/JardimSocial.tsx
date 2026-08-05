import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Social",
  slug: "jardim-social",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Jardim Social | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Social, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Social – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Jardim Social. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Jardim Social é um bairro residencial de alto padrão em Curitiba, vizinho ao Tarumã e ao Alto da XV. Com casas amplas e ruas arborizadas, a região abriga moradores exigentes que buscam serviço técnico de qualidade. Nosso técnico atende o Jardim Social com atendimento personalizado, desde suporte para home office até configuração de redes premium, passando por formatação, upgrade SSD e manutenção preventiva.`,
  pontosReferencia: ["Rua Atílio Bório", "Tarumã (divisa)", "Alto da XV (próximo)", "Rua Moyses Marcondes", "Parque São Lourenço (próximo)"],
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

const JardimSocial = () => <BairroTemplate data={data} />;

export default JardimSocial;
