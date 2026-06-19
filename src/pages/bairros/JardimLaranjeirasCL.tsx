import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim das Laranjeiras",
  slug: "jardim-laranjeiras-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Jardim das Laranjeiras | Campo Largo | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim das Laranjeiras, Campo Largo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim das Laranjeiras – Campo Largo",
  subtitulo: "Atendimento profissional a domicílio no Jardim das Laranjeiras. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim das Laranjeiras é um bairro residencial de Campo Largo com boa infraestrutura. Nosso técnico atende a domicílio com diagnóstico e reparo completo.`,
  pontosReferencia: [
    "Centro de Campo Largo (acesso)",
    "Ferraria (divisa)",
    "BR-277"
  ],
  tempoDeslocamento: "Chegamos em 50-70 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimLaranjeirasCL = () => <BairroTemplate data={data} />;

export default JardimLaranjeirasCL;
