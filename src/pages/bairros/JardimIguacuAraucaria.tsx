import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Iguaçu",
  slug: "jardim-iguacu-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Iguaçu | Araucária | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Iguaçu, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Iguaçu – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Jardim Iguaçu. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Iguaçu é um bairro residencial de Araucária próximo ao Rio Iguaçu. Nosso técnico atende a domicílio com ferramentas profissionais para diagnóstico e reparo.`,
  pontosReferencia: [
    "Iguaçu (divisa)",
    "Centro (acesso)",
    "Campina da Barra (próximo)"
  ],
  tempoDeslocamento: "Chegamos em 40-55 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimIguacuAraucaria = () => <BairroTemplate data={data} />;

export default JardimIguacuAraucaria;
