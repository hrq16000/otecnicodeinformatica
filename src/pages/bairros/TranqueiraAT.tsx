import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Tranqueira",
  slug: "tranqueira-at",
  cidade: "Almirante Tamandaré",
  metaTitle: "Técnico de Informática no Tranqueira | Almirante Tamandaré | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Tranqueira, Almirante Tamandaré. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Tranqueira – Almirante Tamandaré",
  subtitulo: "Atendimento técnico profissional a domicílio no Tranqueira. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Tranqueira é um bairro de Almirante Tamandaré, ao norte de Curitiba. Com perfil residencial e crescimento constante, a comunidade local precisa de assistência técnica confiável. Nosso técnico de informática atende o Tranqueira a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Almirante Tamandaré", "Zona residencial", "Comércio local", "Bairros vizinhos de Almirante Tamandaré", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const TranqueiraAT = () => <BairroTemplate data={data} />;

export default TranqueiraAT;
