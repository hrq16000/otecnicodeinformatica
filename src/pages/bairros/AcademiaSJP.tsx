import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Academia",
  slug: "academia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Academia | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Academia, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Academia – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Academia. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O bairro Academia, em São José dos Pinhais, é uma região residencial tranquila com acesso facilitado ao centro da cidade. Nosso técnico atende Academia a domicílio, oferecendo serviços completos de manutenção de computadores e notebooks, incluindo formatação, remoção de vírus, upgrade de hardware e configuração de redes.`,
  pontosReferencia: ["Centro de SJP (próximo)", "Av. Joinville", "Rua XV de Novembro", "Contorno Leste (próximo)"],
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

const AcademiaSJP = () => <BairroTemplate data={data} />;

export default AcademiaSJP;
