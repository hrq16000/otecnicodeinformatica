import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Gabirobal",
  slug: "gabirobal",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Gabirobal | Colombo | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Gabirobal, Colombo. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Gabirobal – Colombo",
  subtitulo: "Atendimento técnico profissional a domicílio no Gabirobal. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Gabirobal é uma das regiões de Colombo com grande concentração de residências e comércios locais. A demanda por serviços de informática é constante, especialmente para quem trabalha em home office ou precisa do computador para estudos. Nosso técnico de informática atende o Gabirobal a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Zona residencial", "Santa Terezinha (divisa)", "Centro (próx.)", "Roça Grande (divisa)", "Av. João Alves de Souza", "Escolas da região"],
  tempoDeslocamento: "Atendimento em 30-50 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const GabirobalColombo = () => <BairroTemplate data={data} />;

export default GabirobalColombo;
