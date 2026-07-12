import { useEffect } from "react";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { getArticleSources } from "@/lib/blogEditorialSources";


type FAQItem = { q: string; a: string };

const BASE_FAQ: FAQItem[] = [
  {
    q: "Quanto custa o atendimento em Curitiba?",
    a: "A visita técnica em Curitiba começa em R$ 99,99 e o orçamento do serviço é apresentado antes da execução. Você só aprova se concordar.",
  },
  {
    q: "Em quanto tempo o técnico atende?",
    a: "Atendemos no mesmo dia em Curitiba e região metropolitana, conforme disponibilidade da agenda. Confirme o horário pelo WhatsApp.",
  },
  {
    q: "Atende em domicílio ou só na bancada?",
    a: "Atendemos a domicílio em Curitiba e região, com opção de coleta e entrega quando o serviço exigir bancada.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos PIX, dinheiro e cartão. Pagamento somente após o serviço entregue e aprovado.",
  },
];

const CATEGORY_EXTRA: Record<string, FAQItem[]> = {
  CFTV: [
    {
      q: "Vocês instalam câmeras em residência e comércio?",
      a: "Sim. Fazemos projeto, passagem de cabos, instalação de DVR/NVR e configuração de acesso remoto pelo celular.",
    },
  ],
  Formatação: [
    {
      q: "A formatação apaga meus arquivos?",
      a: "Antes da formatação fazemos backup dos seus arquivos importantes. Você aprova o que deve ser preservado.",
    },
  ],
  Vírus: [
    {
      q: "Vocês removem vírus sem perder meus arquivos?",
      a: "Na maioria dos casos sim. Avaliamos o tipo de infecção e priorizamos preservar seus dados.",
    },
  ],
  Notebook: [
    {
      q: "Vocês consertam qualquer marca de notebook?",
      a: "Atendemos as principais marcas: Dell, Lenovo, Acer, HP, Samsung, Asus, Positivo, Apple e outras.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FAQ EDITORIAL POR ARTIGO (pilotos em revisão).
// Perguntas específicas por tema, distintas entre si, sem preço,
// sem prazo prometido e sem promessa de resultado. Quando um slug
// tem override aqui, ele NÃO usa o BASE_FAQ nem os extras de
// categoria (que contêm valores comerciais).
// ─────────────────────────────────────────────────────────────
const PILOT_FAQ: Record<string, FAQItem[]> = {
  "notebook-nao-liga-o-que-fazer": [
    {
      q: "O computador não dá nenhum sinal ao ligar. O que pode ser?",
      a: "Depende do comportamento: pode estar relacionado à alimentação (tomada, cabo, fonte), à memória, ao armazenamento ou à placa. As verificações seguras ajudam a estreitar, mas a causa só se confirma no diagnóstico.",
    },
    {
      q: "Liga, mas a tela fica preta. É a tela?",
      a: "Nem sempre. Ligar o equipamento a um monitor externo ajuda a saber se o problema é da tela ou da parte que gera a imagem.",
    },
    {
      q: "Posso abrir o equipamento para verificar?",
      a: "Verificações externas (tomada, cabo, periféricos, monitor externo) são seguras. Abrir a fonte ou desmontar sem preparo pode piorar o quadro e é melhor evitar.",
    },
    {
      q: "Parou depois de uma queda de energia. Tem solução?",
      a: "É preciso avaliar. Oscilações podem afetar fonte ou placa; o diagnóstico define quais são as opções antes de qualquer troca.",
    },
  ],
  "computador-lento-causas-solucoes": [
    {
      q: "Formatar resolve a lentidão?",
      a: "Só quando a causa é software acumulado ou corrompido. Não resolve lentidão por HD desgastado, pouca memória, superaquecimento ou hardware antigo.",
    },
    {
      q: "Trocar por SSD deixa o computador rápido?",
      a: "Costuma ajudar bastante na inicialização e na abertura de programas, mas o ganho depende do restante do hardware.",
    },
    {
      q: "Como sei se a lentidão é vírus?",
      a: "Lentidão acompanhada de pop-ups, navegador alterado ou uso alto de recursos sem motivo são sinais. A confirmação exige análise.",
    },
    {
      q: "Vale a pena investir num computador antigo?",
      a: "Depende do uso e do estado do equipamento. Às vezes um upgrade simples compensa; em outros casos, não.",
    },
  ],
  "como-instalar-windows-11-do-zero": [
    {
      q: "Qual a diferença entre restaurar e formatar?",
      a: "Restaurar tenta reparar o sistema preservando mais coisas; formatar apaga o disco do sistema e instala tudo do zero.",
    },
    {
      q: "Formatar apaga meus arquivos?",
      a: "Sim, o disco do sistema é apagado. Por isso o backup dos dados vem antes de qualquer formatação.",
    },
    {
      q: "Formatar resolve qualquer problema?",
      a: "Não. Se a causa é física, como disco, memória ou aquecimento, a formatação não resolve.",
    },
    {
      q: "Vocês fornecem chave ou ativador do Windows?",
      a: "Não. Trabalhamos apenas com licenças legítimas e não orientamos formas de burlar licenciamento.",
    },
  ],
  "quando-trocar-hd-por-ssd": [
    {
      q: "O SSD deixa qualquer computador rápido?",
      a: "Ele acelera bastante o armazenamento, mas não substitui memória ou processador limitados.",
    },
    {
      q: "Qualquer computador aceita qualquer SSD?",
      a: "Não. É preciso conferir a interface (SATA ou NVMe) e o espaço físico disponível no equipamento.",
    },
    {
      q: "É melhor clonar o sistema ou instalar do zero?",
      a: "Clonar mantém tudo, inclusive problemas do sistema atual; a instalação limpa costuma ser mais estável. Em qualquer caso, backup antes é indispensável.",
    },
    {
      q: "Preciso trocar o computador todo ou só o disco?",
      a: "Depende do estado do equipamento. A avaliação do hardware ajuda a decidir se o SSD sozinho resolve.",
    },
  ],
  "notebook-superaquecendo-o-que-fazer": [
    {
      q: "Meu notebook esquenta muito. É normal?",
      a: "Em tarefas pesadas o calor sobe. Desligamentos, base muito quente em uso leve ou queda de desempenho já são sinais de alerta.",
    },
    {
      q: "Posso fazer a limpeza interna sozinho?",
      a: "A limpeza externa das saídas de ar é segura. Abrir para limpeza interna e trocar a pasta térmica exige prática para não danificar peças.",
    },
    {
      q: "A bateria está estufada. O que faço?",
      a: "Pare de usar, não fure nem pressione a bateria e procure um técnico. Bateria deformada é sinal de risco.",
    },
    {
      q: "De quanto em quanto tempo trocar a pasta térmica?",
      a: "Varia conforme o equipamento e o uso. Não existe um prazo único que sirva para todos os casos.",
    },
  ],
  "backup-como-proteger-seus-arquivos": [
    {
      q: "Copiar para outra pasta do mesmo disco é backup?",
      a: "Não. Se o disco falhar, a cópia na mesma unidade se perde junto com o original.",
    },
    {
      q: "Sincronizar com a nuvem é backup?",
      a: "Ajuda, mas se um arquivo é apagado ou criptografado a mudança pode se espalhar. Backup guarda versões que não são sobrescritas automaticamente.",
    },
    {
      q: "Com que frequência devo fazer backup?",
      a: "Conforme o quanto os dados mudam e o quanto você não pode perdê-los. O essencial é manter uma rotina.",
    },
    {
      q: "Já perdi arquivos. Ainda dá para recuperar?",
      a: "Às vezes sim, mas não há garantia. Por isso o backup preventivo é sempre mais seguro do que depender de recuperação.",
    },
  ],
  "como-saber-se-pc-tem-virus-malware": [
    {
      q: "Todo computador lento está com vírus?",
      a: "Não. Lentidão tem várias causas possíveis; vírus é uma delas e precisa ser confirmado por análise.",
    },
    {
      q: "Apareceu um alerta com telefone de suporte. Devo ligar?",
      a: "Não. É um golpe de falso suporte. Feche a janela, não ligue para o número e não instale nada que a tela pedir.",
    },
    {
      q: "Dá para remover vírus sem perder arquivos?",
      a: "Em muitos casos sim, mas depende do tipo de ameaça. Não é possível prometer que nunca haverá perda de dados.",
    },
    {
      q: "Meus arquivos ficaram bloqueados ou criptografados. O que faço?",
      a: "Pode ser ransomware. Desconecte da internet, não pague o resgate e busque avaliação antes de mexer nos arquivos.",
    },
  ],
  "como-melhorar-sinal-wifi-em-casa": [
    {
      q: "Como sei se o problema é do roteador ou da operadora?",
      a: "Se todos os aparelhos ficam sem internet ao mesmo tempo e o problema persiste após reiniciar, tende a ser a operadora. Se cai só longe do roteador, é alcance da rede local.",
    },
    {
      q: "Trocar de roteador resolve?",
      a: "Nem sempre. Se a causa é a operadora, o cabeamento ou o posicionamento, o aparelho novo repete o mesmo problema.",
    },
    {
      q: "Repetidor ou sistema mesh?",
      a: "Depende do tamanho e do layout do imóvel. Casas grandes com pontos cegos costumam se beneficiar de mesh.",
    },
    {
      q: "O Wi-Fi cai só em um aparelho. É a rede?",
      a: "Provavelmente não. Quando o problema é isolado em um dispositivo, a causa costuma estar no próprio aparelho.",
    },
  ],
};

export const BlogPostFAQ = ({ category, slug }: { category: string; slug: string }) => {
  const override = PILOT_FAQ[slug];
  const extras = CATEGORY_EXTRA[category] ?? [];
  const items = override ?? [...extras, ...BASE_FAQ].slice(0, 5);

  useEffect(() => {
    const id = `faq-jsonld-${slug}`;
    document.getElementById(id)?.remove();
    // Fail-closed: FAQPage (rich result) apenas para conteúdo aprovado.
    // Conteúdo em revisão/rascunho mantém a FAQ visível, mas sem schema.
    if (!isEditorialApproved(slug)) {
      return () => {
        document.getElementById(id)?.remove();
      };
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [slug, items]);

  return (
    <section className="not-prose mt-12">
      <h2 className="font-heading font-bold text-primary text-xl md:text-2xl mb-4">
        Perguntas frequentes
      </h2>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
        {items.map((it, i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4 md:p-5 font-semibold text-foreground hover:bg-muted/40 transition-colors">
              <span>{it.q}</span>
              <span className="text-accent text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default BlogPostFAQ;
