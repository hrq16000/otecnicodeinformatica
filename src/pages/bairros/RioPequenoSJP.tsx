import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Rio Pequeno",
  slug: "rio-pequeno-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Rio Pequeno | São José dos Pinhais | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Rio Pequeno, São José dos Pinhais. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Rio Pequeno – São José dos Pinhais",
  subtitulo: "Atendimento técnico profissional a domicílio no Rio Pequeno. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Rio Pequeno é um bairro de São José dos Pinhais, a segunda maior cidade do Paraná. Com milhares de residências e empresas, a região tem forte demanda por serviços de informática profissional. Nosso técnico de informática atende o Rio Pequeno a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de São José dos Pinhais", "Zona residencial", "Comércio local", "Bairros vizinhos de São José dos Pinhais", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const RioPequenoSJP = () => <BairroTemplate data={data} />;

export default RioPequenoSJP;
