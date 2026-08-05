import { Link } from "react-router-dom";
import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// RODADA 4C — página dominante da intenção "instalação de SSD e upgrade de
// memória em Curitiba". Sem prometer velocidade específica, sem afirmar
// compatibilidade sem avaliação e sem preço fixo de peça.

const Extra = (
  <section className="py-14 md:py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
          Compatibilidade e peças: o que é avaliado antes
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Nenhuma peça é indicada sem olhar o equipamento. Verificamos qual conexão o modelo aceita (SATA 2,5", M.2
          SATA ou M.2 NVMe), se há slot livre, o tipo e a frequência da memória suportada, o limite total que a
          placa reconhece e se o sistema instalado aproveita o que será colocado. Notebook fino com um único slot
          e memória soldada, por exemplo, muda completamente a recomendação.
        </p>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Peças são orçadas separadamente da mão de obra e a garantia do componente segue o fornecedor. Você pode
          fornecer o SSD ou a memória que já tem — nesse caso conferimos a compatibilidade antes de instalar. As
          condições comerciais estão em{" "}
          <Link className="underline" to="/precos-e-politicas">
            preços e políticas
          </Link>
          .
        </p>
        <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-foreground">Quando o upgrade não é a resposta</h3>
        <p className="leading-relaxed text-muted-foreground">
          Se a máquina desliga sozinha, esquenta muito ou reinicia em uso pesado, trocar disco e memória não
          resolve — antes disso vale o{" "}
          <Link className="underline" to="/servicos/conserto-pc-notebook">
            diagnóstico de hardware
          </Link>
          . E se o disco atual já dá sinais de falha, a prioridade é copiar os dados: o assunto está em{" "}
          <Link className="underline" to="/servicos/backup-recuperacao">
            backup e recuperação de arquivos
          </Link>
          .
        </p>
      </div>
    </div>
  </section>
);

const data: ServicoLandingData = {
  path: "upgrade-ssd-memoria",
  trackingKey: "upgrade-ssd-memoria",
  metaTitle: "Instalação de SSD e Upgrade de Memória em Curitiba",
  metaDescription:
    "Instalação de SSD e upgrade de memória RAM em Curitiba: avaliação de compatibilidade, clonagem ou instalação limpa, testes e peças orçadas à parte. Mão de obra aprovada antes.",
  serviceName: "Upgrade de SSD e Memória RAM",
  serviceDescription:
    "Avaliação de compatibilidade, instalação de SSD e ampliação de memória RAM em notebooks e computadores em Curitiba, com clonagem ou instalação limpa e testes após o serviço.",
  eyebrow: "Upgrade de desempenho em Curitiba",
  h1: "Instalação de SSD e upgrade de memória em Curitiba",
  h1Accent: "com avaliação de compatibilidade",
  intro:
    "Trocar o HD por SSD e ampliar a memória costuma ser o caminho mais barato para prolongar a vida de um equipamento. Mas o ganho depende do modelo e do uso: avaliamos o que a sua máquina aceita antes de indicar qualquer peça.",
  whatsappMessage: "Olá! Quero avaliar a instalação de SSD e/ou mais memória no meu computador.",
  precoNota: "mão de obra",
  incluso: [
    { title: "Avaliação de compatibilidade", desc: "Conexão suportada (SATA, M.2 SATA, NVMe), slots livres, tipo de memória e limite da placa." },
    { title: "Instalação do SSD", desc: "Montagem física, ajuste de firmware quando necessário e configuração de inicialização." },
    { title: "Clonagem ou instalação limpa", desc: "Migração do sistema atual quando o cenário permite, ou instalação do zero quando é mais indicado." },
    { title: "Ampliação de memória", desc: "Instalação de módulos compatíveis, em dupla quando o equipamento se beneficia disso." },
    { title: "Testes após o upgrade", desc: "Estabilidade, reconhecimento total da memória, saúde do SSD e temperatura em uso." },
    { title: "Reaproveitamento do disco antigo", desc: "Quando saudável, pode virar armazenamento secundário ou disco externo." },
  ],
  sinais: [
    "O computador ainda usa HD mecânico e demora minutos para iniciar",
    "Trava ao abrir várias abas, planilhas grandes ou programas pesados juntos",
    "O disco fica em 100% de uso em tarefas simples",
    "A memória vive próxima do limite no gerenciador de tarefas",
    "Equipamento bom de processador, mas engasgado no dia a dia",
    "Quer estender a vida útil da máquina em vez de comprar outra",
    "Vai instalar um sistema mais novo e quer o disco preparado antes",
  ],
  processo: [
    { step: "1", title: "Modelo e uso", desc: "Você informa o equipamento e como usa; isso define se o ganho vem de disco, memória ou ambos." },
    { step: "2", title: "Avaliação técnica", desc: "Conferimos slots, conexões, limite suportado e estado do armazenamento atual." },
    { step: "3", title: "Orçamento", desc: "Mão de obra e peças apresentadas separadamente, aprovadas antes da compra e da execução." },
    { step: "4", title: "Instalação e testes", desc: "Montagem, migração ou instalação limpa, verificação de estabilidade e entrega." },
  ],
  fatoresValor: [
    { title: "Tipo de equipamento", desc: "Desktop costuma ser mais simples; notebooks finos exigem desmontagem completa." },
    { title: "Clonagem x instalação limpa", desc: "Migrar o sistema existente e configurar do zero são trabalhos com esforço diferente." },
    { title: "Estado do disco atual", desc: "Disco com leitura ruim torna a clonagem lenta ou inviável, mudando a estratégia." },
    { title: "Quantidade de módulos", desc: "Substituir um módulo é diferente de reorganizar a configuração inteira de memória." },
    { title: "Peças", desc: "SSD e memória são orçados à parte, conforme modelo e disponibilidade — não há preço fixo de componente." },
  ],
  atendimento: {
    residencial:
      "Notebook de estudo, computador de casa e máquina de home office que ficou pesada com o tempo.",
    empresarial:
      "Renovação pontual de estações lentas em atendimento avulso, com padronização do disco e da memória entre máquinas semelhantes.",
  },
  extra: Extra,
  blocoLocal: [
    {
      titulo: "HD, SSD SATA e NVMe: o que muda na prática",
      paragrafos: [
        "O HD mecânico depende de partes móveis, e é por isso que ele domina a lista de gargalos em máquinas antigas: qualquer tarefa que dependa de muitos acessos pequenos ao disco fica presa esperando. O SSD elimina esse tempo de espera, e é isso que produz a sensação de máquina nova — inicialização, abertura de programas e resposta do sistema.",
        "Entre SSD SATA e NVMe existe diferença de barramento, mas o impacto percebido no uso comum é bem menor do que o salto de HD para SSD. Por isso não prometemos número de segundos nem multiplicador de velocidade: indicamos o que o equipamento aceita e o que muda de fato no seu tipo de uso.",
        "A memória atua em outra frente: ela não acelera o que já cabe, ela evita o engasgo quando falta espaço. Máquinas com pouca RAM passam a usar o disco como apoio e travam em multitarefa. Ampliar ajuda quem trabalha com muitas abas, planilhas grandes, edição ou máquinas virtuais; para uso leve, o SSD costuma resolver sozinho.",
      ],
    },
    {
      titulo: "Clonagem ou instalação limpa?",
      paragrafos: [
        "A clonagem mantém sistema, programas e arquivos como estavam e é a opção mais confortável quando o ambiente atual está saudável. Ela exige que o disco de origem seja lido sem erro — disco em falha pode interromper a cópia no meio.",
        "A instalação limpa é preferível quando o sistema já apresentava travamento, infecção ou anos de acúmulo. Nesses casos, levar o problema para dentro do SSD apenas deixa o mesmo desconforto mais rápido. Esse cenário se combina bem com a instalação limpa do sistema, feita no mesmo atendimento.",
        "Nos dois caminhos, a recomendação é a mesma: ter uma cópia dos arquivos antes de mexer no armazenamento. Upgrade é procedimento controlado, mas qualquer trabalho sobre disco tem risco.",
      ],
    },
  ],
  linksLocais: [
    { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
    { label: "Instalação limpa do sistema", to: "/servicos/formatacao-computador" },
    { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
    { label: "Preços e políticas", to: "/precos-e-politicas" },
  ],
  faqs: [
    { question: "Qualquer notebook aceita SSD e mais memória?", answer: "Não. Existem modelos com memória soldada, slot único ou limite baixo de reconhecimento. Só confirmamos compatibilidade depois de verificar o equipamento." },
    { question: "Quanto meu computador vai ficar mais rápido?", answer: "Não damos número. O salto maior aparece em máquinas que ainda usam HD mecânico; em equipamentos que já têm SSD, ampliar memória ajuda principalmente na multitarefa." },
    { question: "Preciso reinstalar tudo depois de colocar SSD?", answer: "Nem sempre. Quando o sistema atual está saudável e o disco antigo é legível, a clonagem preserva o ambiente. Se o sistema já apresentava problemas, a instalação limpa é mais indicada." },
    { question: "Posso comprar a peça e vocês instalarem?", answer: "Pode. Conferimos a compatibilidade antes da instalação. A garantia da peça, nesse caso, é a do fornecedor de onde você comprou." },
    { question: "Quanto custa o SSD ou a memória?", answer: "Peça não tem preço fixo aqui: depende de modelo, capacidade e disponibilidade. Apresentamos mão de obra e peça separadamente no orçamento, antes da execução." },
    { question: "O que acontece com meu HD antigo?", answer: "Se estiver saudável, pode ficar como armazenamento secundário no desktop ou virar disco externo com um case. Se estiver falhando, orientamos o descarte após a cópia dos dados." },
  ],
  relacionados: [
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Computador lento", to: "/servicos/computador-lento" },
    { label: "Backup e recuperação de dados", to: "/servicos/backup-recuperacao" },
  ],
  dateModified: "2026-08-05",
};

const UpgradeSsdMemoria = () => <ServicoLandingLayout data={data} />;

export default UpgradeSsdMemoria;
