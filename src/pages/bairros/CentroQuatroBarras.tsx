import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Centro",
  slug: "centro-quatro-barras",
  cidade: "Quatro Barras",
  metaTitle: "Técnico de Informática no Centro | Quatro Barras | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Centro, Quatro Barras. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Centro – Quatro Barras",
  subtitulo: "Atendimento técnico profissional a domicílio no Centro. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Centro é um bairro de Quatro Barras, cidade ao nordeste de Curitiba com acesso pela BR-116. Com perfil residencial e crescimento constante, a demanda por suporte técnico é cada vez maior. Nosso técnico de informática atende o Centro a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Quatro Barras", "Zona residencial", "Comércio local", "Bairros vizinhos de Quatro Barras", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const CentroQuatroBarras = () => <BairroTemplate data={data} />;

export default CentroQuatroBarras;
