import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Hauer",
  slug: "hauer",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Hauer | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Hauer, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Hauer – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Hauer. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Hauer é um bairro tradicional de Curitiba, com perfil residencial e comercial equilibrado. Próximo ao Boqueirão e ao Xaxim, a região tem acesso fácil por vias importantes como a Av. Marechal Floriano Peixoto. Nosso técnico de informática atende o Hauer a domicílio com rapidez, oferecendo serviços de formatação, conserto de notebook, remoção de vírus, configuração de rede e manutenção preventiva para residências e empresas.`,
  pontosReferencia: ["Terminal Hauer", "Av. Marechal Floriano Peixoto", "Boqueirão (divisa)", "Xaxim (divisa)", "Rua Francisco Derosso (próxima)"],
  tempoDeslocamento: "Atendimento em até 30 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const Hauer = () => <BairroTemplate data={data} />;

export default Hauer;
