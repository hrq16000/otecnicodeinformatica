// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Centro",
  slug: "centro-campo-magro",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no Centro | Campo Magro | Atendimento Domicílio | O Técnico de Informática",
  metaDescription: "Técnico de informática no Centro, Campo Magro. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Centro – Campo Magro",
  subtitulo: "Atendimento técnico profissional a domicílio no Centro. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Centro é uma localidade de Campo Magro, cidade ao noroeste de Curitiba. Com cerca de 30 mil habitantes e perfil misto entre urbano e rural, o bairro conta com nosso atendimento profissional. Nosso técnico de informática atende o Centro a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Magro", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Magro", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const CentroCampoMagro = () => <BairroTemplate data={data} />;

export default CentroCampoMagro;
