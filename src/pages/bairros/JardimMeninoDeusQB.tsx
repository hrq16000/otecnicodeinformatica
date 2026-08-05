import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Menino Deus",
  slug: "jardim-menino-deus-qb",
  cidade: "Quatro Barras",
  metaTitle: "Técnico de Informática no Jardim Menino Deus | Quatro Barras | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Menino Deus, Quatro Barras. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Menino Deus – Quatro Barras",
  subtitulo: "Atendimento técnico profissional a domicílio no Jardim Menino Deus. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Jardim Menino Deus é um bairro de Quatro Barras, cidade ao nordeste de Curitiba com acesso pela BR-116. Com perfil residencial e crescimento constante, a demanda por suporte técnico é cada vez maior. Nosso técnico de informática atende o Jardim Menino Deus a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Quatro Barras", "Zona residencial", "Comércio local", "Bairros vizinhos de Quatro Barras", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const JardimMeninoDeusQB = () => <BairroTemplate data={data} />;

export default JardimMeninoDeusQB;
