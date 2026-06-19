import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Estados",
  slug: "jardim-estados",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Jardim Estados | Fazenda Rio Grande | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Estados, Fazenda Rio Grande. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Estados – Fazenda Rio Grande",
  subtitulo: "Atendimento técnico profissional a domicílio no Jardim Estados. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Jardim Estados faz parte de Fazenda Rio Grande, cidade ao sul de Curitiba com crescimento acelerado. A região tem forte demanda por serviços de informática profissional. Nosso técnico de informática atende o Jardim Estados a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Fazenda Rio Grande", "Zona residencial", "Comércio local", "Bairros vizinhos de Fazenda Rio Grande", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const JardimEstadosFRG = () => <BairroTemplate data={data} />;

export default JardimEstadosFRG;
