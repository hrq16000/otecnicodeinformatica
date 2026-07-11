import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Batel",
  slug: "batel",
  cidade: "Curitiba",
  indexavel: true,
  metaTitle: "Técnico de Informática no Batel (Curitiba) | Notebook e PC",
  metaDescription:
    "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para home office. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
  h1: "Técnico de Informática no Batel – Curitiba",
  subtitulo: "Conserto de notebook, manutenção de computador e suporte para home office no Batel e arredores",
  descricaoLonga: `O Batel é um dos bairros mais movimentados de Curitiba, com residências de alto padrão, 
    escritórios executivos e empresas de diversos segmentos. Atendemos toda a região do Batel com técnico 
    de informática para conserto de notebook, manutenção de computador, formatação com backup, remoção de 
    vírus e upgrade de SSD e memória. O atendimento é feito em domicílio, com horário agendado, ou por 
    coleta e entrega — da Alameda Dr. Carlos de Carvalho às proximidades do Shopping Crystal e do Alto da XV.`,
  conteudoExclusivo: `O Batel concentra muita gente que trabalha em casa e depende do computador funcionando o tempo todo. Por isso, os atendimentos mais frequentes na região envolvem notebook lento ou esquentando, formatação com backup, upgrade de SSD e memória para ganho de desempenho e configuração de Wi-Fi estável para reuniões e home office. Em todos os casos, o diagnóstico vem antes do orçamento — nada é trocado sem necessidade.

Para escritórios e pequenas empresas do Batel, damos suporte a estações de trabalho, rede interna, impressoras e rotinas de backup, de forma pontual ou recorrente sob consulta. Como muitos negócios da região não podem parar, a manutenção preventiva costuma ser o melhor caminho para evitar imprevistos no meio do expediente.

Nas residências, o que mais aparece é computador lento, vírus e pop-ups, Wi-Fi que não cobre o apartamento inteiro e necessidade de formatação. Boa parte desses casos se resolve no mesmo dia, com transparência total sobre o que está sendo feito e o valor aprovado antes de qualquer serviço.`,
  problemasComuns: [
    "Notebook lento ou esquentando durante o home office",
    "Computador travando ao abrir vários programas",
    "Wi-Fi fraco em apartamentos e escritórios",
    "Vírus, pop-ups e navegador sequestrado",
    "Necessidade de formatação com backup dos arquivos",
    "Upgrade de SSD e memória para ganho de desempenho",
  ],
  dicasLocais: `Se você trabalha em home office no Batel e sente o notebook lento, um upgrade de SSD e memória geralmente resolve sem precisar trocar de aparelho. Para reuniões online estáveis, vale avaliar o posicionamento do roteador ou um sistema mesh, especialmente em apartamentos com muitas paredes. E, antes de aprovar qualquer serviço, você sempre recebe o orçamento — sem surpresa. Fale pelo WhatsApp para combinar o atendimento.`,
  pontosReferencia: [
    "Alameda Dr. Carlos de Carvalho",
    "Shopping Crystal",
    "Praça do Japão",
    "Alto da XV",
    "Rua Bispo Dom José",
    "Hospital Pequeno Príncipe",
  ],
  tempoDeslocamento: "Atendimento agendado no mesmo dia",
  servicosDestaque: [
    "Conserto de notebook",
    "Manutenção de computador",
    "Formatação com backup",
    "Upgrade de SSD e memória",
    "Suporte para home office",
    "Redes e Wi-Fi",
  ],
};

const Batel = () => <BairroTemplate data={data} />;

export default Batel;
