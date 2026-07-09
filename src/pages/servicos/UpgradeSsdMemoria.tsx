import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

const data: ServicoLandingData = {
  path: "upgrade-ssd-memoria",
  trackingKey: "upgrade-ssd-memoria",
  metaTitle: "Upgrade de SSD e Memória RAM em Curitiba a partir de R$ 99,99 | Técnico em Curitiba",
  metaDescription:
    "Instalação de SSD e memória RAM em notebook e PC em Curitiba. Mão de obra a partir de R$ 99,99, com clonagem do Windows e orientação honesta sobre o ganho real.",
  serviceName: "Upgrade de SSD e Memória RAM",
  serviceDescription:
    "Instalação de SSD e memória RAM em notebooks e computadores, com clonagem do sistema, testes e orientação honesta sobre o ganho de desempenho, em Curitiba e região.",
  eyebrow: "Upgrade de desempenho em Curitiba",
  h1: "Upgrade de SSD e memória RAM em Curitiba",
  h1Accent: "seu PC muito mais rápido",
  intro:
    "A forma mais barata de deixar um notebook ou PC rápido de novo é trocar o HD por SSD e reforçar a memória RAM. Avaliamos seu equipamento e indicamos o upgrade que realmente vale a pena.",
  whatsappMessage: "Olá! Quero fazer upgrade de SSD/memória no meu computador. Pode me ajudar?",
  precoNota: "mão de obra",
  incluso: [
    { title: "Avaliação de compatibilidade", desc: "Verificamos o que seu equipamento suporta antes de indicar peças." },
    { title: "Instalação do SSD", desc: "SSD SATA ou NVMe instalado conforme o seu modelo." },
    { title: "Clonagem do sistema", desc: "Migramos o Windows e seus dados sem reinstalar tudo (quando possível)." },
    { title: "Upgrade de RAM", desc: "Instalação de memória compatível para multitarefa e desempenho." },
    { title: "Testes de desempenho", desc: "Conferimos temperatura, velocidade e estabilidade após o upgrade." },
    { title: "Orientação honesta", desc: "Se o upgrade não compensar no seu caso, avisamos antes." },
  ],
  sinais: [
    "Notebook demora vários minutos para ligar",
    "Trava ao abrir várias abas ou programas",
    "Ainda usa HD mecânico (não SSD)",
    "Pouca memória RAM para o uso do dia a dia",
    "Barulho ou lentidão típicos de HD desgastado",
    "Quer estender a vida útil de um equipamento antigo",
  ],
  processo: [
    { step: "1", title: "Avaliação", desc: "Você informa o modelo pelo WhatsApp e avaliamos o upgrade ideal." },
    { step: "2", title: "Orçamento", desc: "Apresentamos peças e mão de obra com valor aprovado antes." },
    { step: "3", title: "Instalação", desc: "Instalamos o SSD/RAM e clonamos o sistema quando possível." },
    { step: "4", title: "Entrega", desc: "Equipamento testado, mais rápido e pronto para uso." },
  ],
  faqs: [
    { question: "Quanto custa o upgrade de SSD ou memória?", answer: "A mão de obra começa em R$ 99,99, somada ao valor das peças. Passamos o orçamento completo antes de executar." },
    { question: "Preciso reinstalar o Windows e meus programas?", answer: "Na maioria dos casos não. Fazemos a clonagem do sistema para o SSD, mantendo Windows, programas e arquivos como estavam." },
    { question: "Qual dá mais resultado: SSD ou mais RAM?", answer: "Em geral o SSD é o upgrade que mais acelera um PC antigo. A RAM ajuda na multitarefa. Avaliamos seu caso e indicamos o melhor custo-benefício." },
    { question: "Vocês vendem as peças ou eu levo as minhas?", answer: "As duas opções. Podemos fornecer SSD e memória compatíveis ou instalar peças que você já tenha." },
    { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com atendimento em domicílio ou coleta e entrega." },
  ],
  relacionados: [
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Computador lento", to: "/servicos/computador-lento" },
    { label: "Montagem de PC", to: "/servicos/montagem-pc" },
  ],
  dateModified: "2026-07-09",
};

const UpgradeSsdMemoria = () => <ServicoLandingLayout data={data} />;

export default UpgradeSsdMemoria;
