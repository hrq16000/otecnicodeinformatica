// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Centro",
  slug: "centro-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Centro | Piraquara | Atendimento Domicílio | O Técnico de Informática",
  metaDescription: "Técnico de informática no Centro, Piraquara. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Centro – Piraquara",
  subtitulo: "Atendimento técnico profissional a domicílio no Centro. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Centro pertence a Piraquara, na região leste da Grande Curitiba. Com mais de 110 mil habitantes, a cidade tem demanda crescente por serviços de informática a domicílio. Nosso técnico de informática atende o Centro a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Piraquara", "Zona residencial", "Comércio local", "Bairros vizinhos de Piraquara", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const CentroPiraquara = () => <BairroTemplate data={data} />;

export default CentroPiraquara;
