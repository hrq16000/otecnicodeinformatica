import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Maria Antonieta",
  slug: "maria-antonieta",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Maria Antonieta | Pinhais | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Maria Antonieta, Pinhais. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Maria Antonieta – Pinhais",
  subtitulo: "Atendimento técnico profissional a domicílio no Maria Antonieta. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Maria Antonieta é um bairro de Pinhais, cidade vizinha de Curitiba com acesso rápido pela região norte/leste. Com forte perfil residencial, o bairro conta com demanda constante por serviços de informática. Nosso técnico de informática atende o Maria Antonieta a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Pinhais", "Zona residencial", "Comércio local", "Bairros vizinhos de Pinhais", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const MariaAntonieta = () => <BairroTemplate data={data} />;

export default MariaAntonieta;
