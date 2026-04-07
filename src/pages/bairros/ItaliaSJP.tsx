import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Itália",
  slug: "italia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Itália | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Itália, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Itália – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Itália. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O bairro Itália é uma região residencial de São José dos Pinhais, próxima ao centro da cidade. Com muitas casas e prédios, a região tem alta demanda por serviços de manutenção de computadores. Nosso técnico atende Itália a domicílio com agilidade, oferecendo formatação, conserto, remoção de vírus e suporte técnico completo.`,
  pontosReferencia: ["Centro de SJP (próximo)", "Rua XV de Novembro (próxima)", "Cruzeiro (divisa)", "Rua Joinville"],
  tempoDeslocamento: "Atendimento em até 35 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ItaliaSJP = () => <BairroTemplate data={data} />;

export default ItaliaSJP;
