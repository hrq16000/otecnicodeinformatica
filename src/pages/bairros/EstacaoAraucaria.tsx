import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Estação",
  slug: "estacao-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Estação | Araucária | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Estação, Araucária. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Estação – Araucária",
  subtitulo: "Atendimento técnico profissional a domicílio no Estação. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Estação é um bairro de Araucária com forte identidade local e crescimento residencial constante. Moradores e pequenos negócios da região precisam de suporte técnico rápido e confiável para seus equipamentos. Nosso técnico de informática atende o Estação a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Estação ferroviária", "Centro (próx.)", "Costeira (divisa)", "Fazenda Velha (divisa)", "Zona comercial", "Terminal de ônibus"],
  tempoDeslocamento: "Atendimento em 40-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const EstacaoAraucaria = () => <BairroTemplate data={data} />;

export default EstacaoAraucaria;
