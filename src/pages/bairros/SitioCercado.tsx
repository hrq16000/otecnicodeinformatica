import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Sítio Cercado",
  slug: "sitio-cercado",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Sítio Cercado | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Sítio Cercado, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Sítio Cercado – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Sítio Cercado. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Sítio Cercado é um dos bairros mais populosos de Curitiba, com comunidade ativa e crescente. A região tem alta demanda por serviços de informática acessíveis e de qualidade. Nosso técnico atende o Sítio Cercado a domicílio com preços justos, realizando formatação, remoção de vírus, conserto de notebooks, upgrade SSD e configuração de redes Wi-Fi. Atendimento com horário agendado e transparência total no orçamento.`,
  pontosReferencia: ["Terminal Sítio Cercado", "Rua Izaac Ferreira da Cruz", "Rua João Eloy de Souza", "Bairro Novo (próximo)", "Ganchinho (divisa)"],
  tempoDeslocamento: "Atendimento em 40-60 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const SitioCercado = () => <BairroTemplate data={data} />;

export default SitioCercado;
