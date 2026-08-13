// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Iguaçu",
  slug: "iguacu-frg",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Iguaçu | Fazenda Rio Grande | Atendimento Domicílio | O Técnico de Informática",
  metaDescription: "Técnico de informática no Iguaçu, Fazenda Rio Grande. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Iguaçu – Fazenda Rio Grande",
  subtitulo: "Atendimento técnico profissional a domicílio no Iguaçu. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Iguaçu faz parte de Fazenda Rio Grande, cidade ao sul de Curitiba com crescimento acelerado. A região tem forte demanda por serviços de informática profissional. Nosso técnico de informática atende o Iguaçu a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Fazenda Rio Grande", "Zona residencial", "Comércio local", "Bairros vizinhos de Fazenda Rio Grande", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const IguacuFRG = () => <BairroTemplate data={data} />;

export default IguacuFRG;
