import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Planta Deodoro",
  slug: "planta-deodoro",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Planta Deodoro | Piraquara | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Planta Deodoro, Piraquara. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Planta Deodoro – Piraquara",
  subtitulo: "Atendimento técnico profissional a domicílio no Planta Deodoro. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Planta Deodoro pertence a Piraquara, na região leste da Grande Curitiba. Com mais de 110 mil habitantes, a cidade tem demanda crescente por serviços de informática a domicílio. Nosso técnico de informática atende o Planta Deodoro a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Piraquara", "Zona residencial", "Comércio local", "Bairros vizinhos de Piraquara", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const PlantaDeodoroPiraquara = () => <BairroTemplate data={data} />;

export default PlantaDeodoroPiraquara;
