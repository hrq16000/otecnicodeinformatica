import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Boa Vista Araucária",
  slug: "jardim-boa-vista-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Boa Vista Araucária | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Boa Vista Araucária, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Boa Vista Araucária – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Jardim Boa Vista Araucária. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Boa Vista é um bairro residencial de Araucária com ruas tranquilas e boa infraestrutura. Atendemos com manutenção de computadores e notebooks a domicílio.`,
  pontosReferencia: [
    "Centro de Araucária (acesso)",
    "Costeira (divisa)",
    "BR-476"
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

const JardimBoaVistaAraucaria = () => <BairroTemplate data={data} />;

export default JardimBoaVistaAraucaria;
