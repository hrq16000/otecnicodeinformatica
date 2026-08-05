import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Upgrade SSD em Santa Felicidade Curitiba | Computador Mais Rápido | Técnico Curitiba",
  metaDescription: "Upgrade de SSD e memória RAM em Santa Felicidade, Curitiba. Deixe seu computador até 10x mais rápido. Instalação profissional com migração de dados.",
  
  servico: "Upgrade SSD e Memória",
  servicoSlug: "upgrade-ssd-memoria",
  bairro: "Santa Felicidade",
  bairroSlug: "santa-felicidade",
  cidade: "Curitiba",
  
  h1: "Upgrade de SSD em Santa Felicidade – Curitiba",
  subtitulo: "Transforme seu computador lento em uma máquina rápida. Upgrade de SSD com migração completa de dados.",
  
  precoBase: "R$ 149,99",
  precoDescricao: "Serviço de instalação + migração. SSD não incluso (ou consulte combos com peça).",
  
  descricaoLonga: `Santa Felicidade é um bairro tradicional de Curitiba, conhecido por sua forte 
    presença de famílias e pequenos negócios. Nossa equipe oferece serviço de upgrade de SSD 
    e memória RAM para deixar seu computador significativamente mais rápido. Com a substituição 
    do HD tradicional por SSD, seu sistema inicia em segundos, programas abrem instantaneamente 
    e o computador para de travar. Atendemos desde residências próximas ao Parque Tanguá até 
    estabelecimentos na Via Gastronômica. Realizamos a migração completa dos seus dados, 
    Windows e programas – você não perde nada!`,
  
  beneficios: [
    "Computador até 10x mais rápido",
    "Windows iniciando em 15-20 segundos",
    "Programas abrindo instantaneamente",
    "Migração completa de dados sem perda",
    "Clonagem do sistema operacional",
    "Formatação limpa opcional",
    "SSD com garantia do fabricante",
    "Instalação profissional inclusa",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos compatibilidade e melhor SSD" },
    { titulo: "Backup", descricao: "Clonamos ou salvamos todos os dados" },
    { titulo: "Instalação", descricao: "Instalamos SSD e migramos sistema" },
    { titulo: "Testes", descricao: "Verificamos velocidade e funcionamento" },
  ],
  
  faq: [
    { 
      pergunta: "Qual a diferença entre SSD e HD?", 
      resposta: "O SSD não tem partes móveis, é muito mais rápido, silencioso e consome menos energia. A diferença de velocidade é de 5 a 10 vezes em relação ao HD tradicional." 
    },
    { 
      pergunta: "Vou perder meus arquivos no upgrade?", 
      resposta: "Não! Fazemos a migração completa do seu sistema, programas e arquivos. Tudo continua exatamente como estava, só que muito mais rápido." 
    },
    { 
      pergunta: "Vocês fornecem o SSD?", 
      resposta: "Trabalhamos com SSDs de qualidade (Kingston, Samsung, Crucial). Você pode comprar conosco ou usar um SSD próprio." 
    },
    { 
      pergunta: "Vale a pena colocar SSD em notebook antigo?", 
      resposta: "Sim! Notebooks com 4-5 anos ficam muito mais rápidos com SSD. É uma alternativa econômica à compra de um novo equipamento." 
    },
  ],
  
  pontosReferencia: [
    "Parque Tanguá",
    "Via Gastronômica",
    "Bosque Zaninelli",
    "Igreja de São José",
    "Vinícola Santa Felicidade",
    "Portal Italiano",
  ],
  
  tempoAtendimento: "Agendamento para o Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Formatação", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Montagem de PC", slug: "montagem-pc" },
  ],
  
  bairrosProximos: [
    { nome: "Cascatinha", slug: "cascatinha" },
    { nome: "São João", slug: "sao-joao" },
    { nome: "Butiatuvinha", slug: "butiatuvinha" },
    { nome: "Lamenha Pequena", slug: "lamenha-pequena" },
  ],
};

const UpgradeSsdSantaFelicidade = () => <ServicoBairroTemplate data={data} />;
export default UpgradeSsdSantaFelicidade;
