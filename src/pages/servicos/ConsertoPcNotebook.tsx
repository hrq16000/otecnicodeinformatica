import { Link } from "react-router-dom";
import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// RODADA 4C — página dominante da intenção "conserto/manutenção de computador e
// notebook em Curitiba". Sem promessa de prazo de chegada, sem afirmar que todo
// defeito é reparável, sem preço fechado de peça.

const Extra = (
  <>
    {/* O que não está incluído */}
    <section className="py-14 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            O que não está incluído no conserto
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Peças de reposição.</strong> Fonte, bateria, tela, dobradiça,
              teclado, SSD ou memória são orçados à parte, com aprovação antes da compra.
            </li>
            <li>
              <strong className="text-foreground">Recuperação de dados de mídia danificada.</strong> Conserto de
              hardware não é recuperação de arquivos — esse caso é tratado em{" "}
              <Link className="underline" to="/servicos/backup-recuperacao">
                backup e recuperação de dados
              </Link>
              .
            </li>
            <li>
              <strong className="text-foreground">Licenças de software de terceiros.</strong> Programas pagos
              precisam de licença do próprio cliente.
            </li>
            <li>
              <strong className="text-foreground">Garantia sobre defeito latente não relacionado.</strong> A
              garantia cobre o reparo executado, conforme as{" "}
              <Link className="underline" to="/precos-e-politicas">
                condições publicadas
              </Link>
              .
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* Quando o reparo pode não compensar */}
    <section className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Quando o reparo pode não compensar
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Nem todo defeito vale o conserto. Placa-mãe com corrosão extensa por líquido, notebook com chassi
            partido somado a falha elétrica, equipamento cuja peça saiu de linha e só existe em lote usado, ou
            reparo cujo custo se aproxima do valor de mercado da máquina: nesses casos dizemos abertamente que
            não compensa e explicamos por quê. Você decide com a informação na mão, e o critério que usamos está
            detalhado em{" "}
            <Link className="underline" to="/quando-nao-compensa">
              quando o conserto não compensa
            </Link>
            .
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Em parte dos equipamentos antigos que chegam como “sem conserto”, o problema real é armazenamento
            desgastado ou memória insuficiente — situação resolvida por{" "}
            <Link className="underline" to="/servicos/upgrade-ssd-memoria">
              instalação de SSD e reforço de memória
            </Link>{" "}
            por uma fração do custo de troca da máquina.
          </p>
        </div>
      </div>
    </section>
  </>
);

const data: ServicoLandingData = {
  path: "conserto-pc-notebook",
  trackingKey: "conserto-pc-notebook",
  metaTitle: "Conserto de PC e Notebook em Curitiba | Diagnóstico e Reparo",
  metaDescription:
    "Conserto de computador e notebook em Curitiba: não liga, tela azul, superaquecimento, ruído, portas e tela. Diagnóstico primeiro, orçamento aprovado antes do reparo.",
  serviceName: "Conserto de PC e Notebook",
  serviceDescription:
    "Diagnóstico e reparo de computadores e notebooks em Curitiba, separando falha de software, falha de hardware e reparo de placa sob avaliação, com orçamento aprovado antes da execução.",
  eyebrow: "Conserto e manutenção em Curitiba",
  h1: "Conserto de PC e notebook em Curitiba",
  h1Accent: "com diagnóstico antes do orçamento",
  intro:
    "Antes de trocar peça, é preciso saber o que realmente falhou. Avaliamos o equipamento para separar problema de software, defeito de hardware e caso de reparo de placa, e só então apresentamos o orçamento para você aprovar.",
  whatsappMessage: "Olá! Meu computador/notebook apresentou um problema e preciso de avaliação.",
  incluso: [
    { title: "Diagnóstico do defeito", desc: "Testes de alimentação, memória, armazenamento, temperatura e sistema para identificar a origem real." },
    { title: "Separação software x hardware", desc: "Muito 'defeito' é sistema corrompido ou driver — evitamos troca de peça desnecessária." },
    { title: "Limpeza interna e pasta térmica", desc: "Quando o quadro é superaquecimento, desligamento ou ruído de cooler." },
    { title: "Substituição de componentes", desc: "Fonte, memória, armazenamento, bateria, teclado, dobradiça, cooler e conectores." },
    { title: "Reparo de placa sob avaliação", desc: "Circuito de carga e falhas pontuais são avaliados caso a caso, sem garantia prévia de viabilidade." },
    { title: "Testes antes da entrega", desc: "Ligamos, carregamos e usamos o equipamento para confirmar que o sintoma não retorna." },
  ],
  sinais: [
    "Não liga, não dá sinal de energia ou liga e desliga em seguida",
    "Liga com ventoinha girando, mas a tela permanece sem vídeo",
    "Reinicia sozinho, desliga durante o uso ou trava em pontos aleatórios",
    "Tela azul recorrente, mesmo depois de reinstalar o sistema",
    "Esquenta muito, fica com o cooler alto ou reduz a velocidade ao trabalhar",
    "Ruído de clique, arranhado ou zumbido vindo de dentro do gabinete",
    "Entradas USB, HDMI ou conector de carga soltos ou sem resposta",
    "Teclas falhando, touchpad instável, bateria que não segura carga",
    "Tela trincada, com manchas, listras ou dobradiça quebrada",
    "Sumiço de espaço, arquivos corrompidos ou lentidão súbita de leitura",
  ],
  processo: [
    { step: "1", title: "Relato do sintoma", desc: "Você descreve pelo WhatsApp o que acontece, quando começou e o que já tentaram." },
    { step: "2", title: "Diagnóstico", desc: "Testes no equipamento para isolar a causa entre sistema, componente e placa." },
    { step: "3", title: "Orçamento aprovado", desc: "Explicamos o que foi encontrado, o que é reparável e o custo. Nada é executado antes do seu ok." },
    { step: "4", title: "Reparo e testes", desc: "Execução, uso prolongado do equipamento para validar e entrega com o que foi feito descrito." },
  ],
  fatoresValor: [
    { title: "Tipo de falha", desc: "Ajuste de sistema, troca de componente e reparo de placa exigem tempo e recurso muito diferentes." },
    { title: "Peça necessária", desc: "Peças são orçadas à parte, conforme disponibilidade e modelo — não trabalhamos com preço fixo de componente." },
    { title: "Acesso ao interior", desc: "Alguns notebooks exigem desmontagem completa para trocar cooler, teclado ou conector de carga." },
    { title: "Intervenção anterior", desc: "Equipamento já aberto por terceiros costuma exigir revisão de parafusos, flats e conectores." },
    { title: "Modalidade", desc: "Atendimento no endereço, remoto ou com coleta influenciam o formato e o custo do serviço." },
    { title: "Volume de dados", desc: "Quando há necessidade de cópia de arquivos antes do reparo, o tempo de serviço aumenta." },
  ],
  atendimento: {
    residencial:
      "Computador de casa, notebook de estudo e máquina de home office. Casos simples podem ser resolvidos no endereço; desmontagem e reparo de placa normalmente exigem coleta.",
    empresarial:
      "Estação parada no escritório, computador de balcão ou notebook de uso profissional em atendimento avulso. Demanda contínua é avaliada em suporte para empresas.",
  },
  extra: Extra,
  blocoLocal: [
    {
      titulo: "Como decidimos entre reparo, substituição e upgrade",
      paragrafos: [
        "O primeiro corte é elétrico: o equipamento recebe energia? Notebook que não acende LED de carga, desktop que não gira ventoinha e fonte sem tensão estável apontam para alimentação, e não para sistema. Esse teste evita o erro comum de formatar uma máquina cujo problema é elétrico.",
        "O segundo corte é de estabilidade. Travamento em uso pesado, desligamento após alguns minutos e ruído crescente de cooler costumam ter origem térmica: pasta ressecada, dissipador obstruído por poeira ou ventoinha no fim da vida. Curitiba tem períodos secos e poeirentos que aceleram esse acúmulo, principalmente em desktops apoiados no chão.",
        "O terceiro corte é de armazenamento. HD com setores ruins produz lentidão intermitente, travamento ao abrir arquivo e barulho de clique — sintoma que se confunde com vírus. Nesse caso a conversa muda: antes de qualquer intervenção, cuidamos da cópia dos dados, porque uso continuado piora o quadro.",
        "Só depois disso entra a discussão de reparo de placa. Ela é sempre apresentada como avaliação, nunca como resultado garantido: existem falhas cujo componente não é mais fabricado ou cuja trilha está comprometida a ponto de o reparo não se sustentar.",
      ],
    },
    {
      titulo: "Conserto em Curitiba: como o atendimento acontece",
      paragrafos: [
        "Atendemos Curitiba e municípios vizinhos. Problemas de sistema, configuração e periférico costumam ser resolvidos no local ou remotamente. Reparos que exigem bancada — desmontagem de notebook, troca de tela, revisão de placa — são feitos com retirada do equipamento e devolução após os testes.",
        "Se você ainda não sabe qual caminho serve para o seu caso, comece pelo atendimento técnico para computador e notebook na cidade e descreva o sintoma: a triagem indica se dá para resolver a distância, se vale uma visita ou se o equipamento precisa ir para a bancada.",
      ],
    },
  ],
  linksLocais: [
    { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
    { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
    { label: "Coleta e entrega", to: "/coleta-e-entrega" },
    { label: "Preços e políticas", to: "/precos-e-politicas" },
  ],
  faqs: [
    { question: "Vocês descobrem o defeito antes de cobrar o reparo?", answer: "Sim. O diagnóstico vem primeiro. Explicamos o que foi encontrado e o custo do reparo, e o serviço só é executado depois da sua aprovação." },
    { question: "Meu notebook liga mas não aparece nada na tela. É a tela?", answer: "Nem sempre. Esse sintoma também aparece em falha de memória, de vídeo integrado e de conector interno. O teste com monitor externo é um dos primeiros passos para separar os casos." },
    { question: "Todo defeito de placa-mãe tem conserto?", answer: "Não. Alguns são reparáveis, outros não compensam ou não têm mais componente disponível. Tratamos reparo de placa como avaliação, e informamos quando o caminho é substituir a peça ou o equipamento." },
    { question: "O conserto resolve lentidão?", answer: "Depende da causa. Lentidão por sistema é resolvida com manutenção ou formatação; lentidão por HD desgastado ou memória insuficiente é resolvida com upgrade de armazenamento e memória." },
    { question: "Preciso fazer cópia dos meus arquivos antes?", answer: "Recomendamos sempre. Reparo mexe em hardware e qualquer procedimento tem risco; se você não conseguir copiar, avise antes para tratarmos os dados como prioridade." },
    { question: "Vocês consertam no mesmo dia?", answer: "Não trabalhamos com promessa de prazo. O tempo depende do tipo de falha, da agenda e da disponibilidade de peça — a estimativa é informada após o diagnóstico." },
  ],
  relacionados: [
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria" },
    { label: "Backup e recuperação de dados", to: "/servicos/backup-recuperacao" },
    { label: "Computador não liga", to: "/servicos/computador-nao-liga" },
  ],
  dateModified: "2026-08-05",
};

const ConsertoPcNotebook = () => <ServicoLandingLayout data={data} />;

export default ConsertoPcNotebook;
