import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Centro",
  slug: "centro",
  cidade: "Curitiba",
  indexavel: true,
  metaTitle: "Técnico de Informática no Centro de Curitiba | Notebook e PC",
  metaDescription:
    "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
  h1: "Técnico de Informática no Centro de Curitiba",
  subtitulo: "Conserto de notebook, manutenção de computador e suporte para escritórios no coração da cidade",
  descricaoLonga: `O Centro de Curitiba concentra escritórios, lojas, consultórios e residências que dependem 
    de computadores funcionando o tempo todo. Nosso técnico de informática atende toda a região central — 
    da Praça Tiradentes e Rua XV de Novembro ao Largo da Ordem e imediações — com conserto de notebook, 
    manutenção de computador de mesa, formatação com backup, remoção de vírus e suporte para pequenas 
    empresas. Entendemos a urgência do ambiente comercial e priorizamos atendimentos rápidos, em domicílio 
    ou por coleta e entrega, para reduzir o impacto no seu trabalho.`,
  conteudoExclusivo: `No Centro, o ritmo é comercial: lojas, escritórios de advocacia e contabilidade, imobiliárias e consultórios que não podem ficar com o computador parado no meio do expediente. Por isso, os atendimentos mais comuns envolvem PC de balcão ou de escritório travando, lentidão ao lidar com sistemas e planilhas, impressora que parou de funcionar e rede instável afetando o caixa e o atendimento. O diagnóstico rápido e honesto é o que evita que um problema pequeno vire prejuízo de um dia inteiro de operação.

Para notebooks — muito usados por profissionais que circulam entre reuniões no Centro —, aparecem lentidão, aquecimento, tela e teclado com defeito e necessidade de upgrade de SSD. Na maioria dos casos, limpeza interna, formatação com backup ou troca de SSD já devolvem a agilidade da máquina.

Também atendemos bastante formatação com backup e remoção de vírus em computadores compartilhados por equipes. Fazemos o backup antes de reinstalar o sistema e entregamos a máquina com drivers, antivírus e os programas essenciais do negócio já configurados, minimizando o tempo de parada.`,
  problemasComuns: [
    "PC de escritório travando no meio do expediente",
    "Notebook lento entre reuniões e deslocamentos",
    "Impressora compartilhada que parou de funcionar",
    "Rede instável afetando caixa e atendimento",
    "Vírus e pop-ups em computadores compartilhados",
    "Formatação com backup em máquinas de equipe",
  ],
  dicasLocais: `Se você tem loja ou escritório no Centro, manutenção preventiva (limpeza, verificação de disco e backup) sai muito mais barato do que uma parada de emergência em dia cheio. Para quem usa notebook em reuniões, um upgrade de SSD melhora bastante a rapidez sem trocar de aparelho. E desconfie de qualquer aviso pedindo pagamento urgente para "desbloquear" o computador — costuma ser golpe. Fale conosco pelo WhatsApp e avaliamos com segurança antes de qualquer serviço.`,
  pontosReferencia: [
    "Praça Tiradentes",
    "Rua XV de Novembro",
    "Largo da Ordem",
    "Rua das Flores",
    "Shopping Mueller",
    "Praça Santos Andrade",
  ],
  tempoDeslocamento: "Atendimento em até 1 hora",
  servicosDestaque: [
    "Conserto de notebook",
    "Manutenção de computador",
    "Suporte para escritórios",
    "Formatação com backup",
    "Remoção de vírus e malware",
    "Configuração de rede",
  ],
};

const Centro = () => <BairroTemplate data={data} />;

export default Centro;
