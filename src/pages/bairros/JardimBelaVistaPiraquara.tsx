import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Bela Vista",
  slug: "jardim-bela-vista-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Jardim Bela Vista | Piraquara | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Bela Vista, Piraquara. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Bela Vista – Piraquara",
  subtitulo: "Atendimento técnico profissional a domicílio no Jardim Bela Vista. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Jardim Bela Vista pertence a Piraquara, na região leste da Grande Curitiba. Com mais de 110 mil habitantes, a cidade tem demanda crescente por serviços de informática a domicílio. Nosso técnico de informática atende o Jardim Bela Vista a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Piraquara", "Zona residencial", "Comércio local", "Bairros vizinhos de Piraquara", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const JardimBelaVistaPiraquara = () => <BairroTemplate data={data} />;

export default JardimBelaVistaPiraquara;
