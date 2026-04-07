import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Solene",
  slug: "vila-solene",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Vila Solene | Campo Largo | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Vila Solene, Campo Largo. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Vila Solene – Campo Largo",
  subtitulo: "Atendimento técnico profissional a domicílio no Vila Solene. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Vila Solene é uma região de Campo Largo, a Capital da Louça, com perfil residencial e comercial. Moradores e empresas locais precisam de suporte técnico rápido e confiável. Nosso técnico de informática atende o Vila Solene a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Largo", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Largo", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const VilaSoleneCL = () => <BairroTemplate data={data} />;

export default VilaSoleneCL;
