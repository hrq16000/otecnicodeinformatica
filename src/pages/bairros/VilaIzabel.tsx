import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Izabel",
  slug: "vila-izabel",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Vila Izabel | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Vila Izabel, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Vila Izabel – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Vila Izabel. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Vila Izabel é um bairro residencial acolhedor de Curitiba, conhecido pela tranquilidade e pelo comércio local. Próximo ao Portão e ao Campo Comprido, a região possui muitas casas e prédios residenciais cujos moradores dependem de computadores para trabalho remoto e estudos. Nosso técnico atende Vila Izabel a domicílio com diagnóstico profissional no local, resolvendo problemas como computador lento, vírus, tela azul e configuração de Wi-Fi.`,
  pontosReferencia: ["Rua Bom Jesus de Iguape", "Praça Vila Izabel", "Av. República Argentina (próxima)", "Portão (divisa)", "Rua Holanda"],
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

const VilaIzabel = () => <BairroTemplate data={data} />;

export default VilaIzabel;
