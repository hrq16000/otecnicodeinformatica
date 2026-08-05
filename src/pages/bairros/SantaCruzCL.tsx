import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Santa Cruz",
  slug: "santa-cruz-campo-largo",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Santa Cruz | Campo Largo | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Santa Cruz, Campo Largo. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Santa Cruz – Campo Largo",
  subtitulo: "Atendimento técnico profissional a domicílio no Santa Cruz. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Santa Cruz é uma região de Campo Largo, a Capital da Louça, com perfil residencial e comercial. Moradores e empresas locais precisam de suporte técnico rápido e confiável. Nosso técnico de informática atende o Santa Cruz a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Largo", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Largo", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const SantaCruzCL = () => <BairroTemplate data={data} />;

export default SantaCruzCL;
