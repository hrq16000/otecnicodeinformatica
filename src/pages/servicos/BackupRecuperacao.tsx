import { Link } from "react-router-dom";
import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// RODADA 4C — página dominante da intenção "backup e recuperação de dados em
// Curitiba". Sem percentual de sucesso, sem promessa de recuperação, sem preço
// fechado por nível: o orçamento depende do estado real da mídia.

const Extra = (
  <>
    {/* Limites e riscos */}
    <section className="py-14 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            O que precisa ficar claro antes de começar
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Recuperação de dados não é garantida.</strong> Trabalhamos com
              tentativa técnica. Há mídias cujo conteúdo não retorna, e dizemos isso antes, não depois.
            </li>
            <li>
              <strong className="text-foreground">Continuar usando o aparelho reduz as chances.</strong> Gravar,
              instalar programa de recuperação ou reiniciar várias vezes pode sobrescrever justamente o que você
              quer de volta.
            </li>
            <li>
              <strong className="text-foreground">Tentativas anteriores atrapalham.</strong> Mídia já aberta,
              congelada, colocada em outro equipamento ou submetida a software de recuperação chega em condição
              pior.
            </li>
            <li>
              <strong className="text-foreground">Alguns casos exigem terceiros.</strong> Falha mecânica interna
              pode demandar ambiente e peças doadoras de laboratório especializado, com prazo e custo próprios.
            </li>
            <li>
              <strong className="text-foreground">O orçamento depende do estado da mídia.</strong> Só é possível
              precificar depois de avaliar o dispositivo — não há tabela única para recuperação.
            </li>
            <li>
              <strong className="text-foreground">Acesso ao conteúdo exige autorização.</strong> Manipulamos
              apenas o necessário para a tentativa, conforme a{" "}
              <Link className="underline" to="/politica-de-privacidade">
                política de privacidade
              </Link>
              .
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* Prevenção */}
    <section className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Backup é mais barato que tentativa de recuperação
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            A maior parte das perdas que chegam até nós teria sido evitada por uma rotina simples: uma cópia local
            em disco externo e uma cópia fora de casa, em nuvem. Configuramos essa rotina, testamos a restauração
            (backup que nunca foi restaurado não é backup) e explicamos o que fica de fora, como caixas de e-mail
            e pastas de programas.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Quando o disco ainda funciona mas dá sinais de desgaste — lentidão intermitente, travamento ao abrir
            arquivo, ruído —, a decisão costuma ser copiar tudo primeiro e depois planejar a{" "}
            <Link className="underline" to="/servicos/upgrade-ssd-memoria">
              troca por SSD
            </Link>
            . Se o equipamento nem inicia, a avaliação começa pelo{" "}
            <Link className="underline" to="/servicos/conserto-pc-notebook">
              conserto de PC e notebook
            </Link>
            , porque o problema pode estar fora do disco.
          </p>
        </div>
      </div>
    </section>
  </>
);

const data: ServicoLandingData = {
  path: "backup-recuperacao",
  trackingKey: "backup-recuperacao",
  metaTitle: "Backup e Recuperação de Dados em Curitiba | Avaliação de Mídia",
  metaDescription:
    "Backup e tentativa de recuperação de dados em Curitiba: HD, SSD, pendrive e cartão. Avaliação da mídia, limites explicados e orçamento conforme o estado do dispositivo.",
  serviceName: "Backup e Recuperação de Dados",
  serviceDescription:
    "Criação de rotina de backup, transferência de arquivos e tentativa de recuperação de dados em HD, SSD, pendrive e cartão de memória em Curitiba, com avaliação prévia da mídia e limites informados.",
  eyebrow: "Dados e backup em Curitiba",
  h1: "Backup e recuperação de dados em Curitiba",
  h1Accent: "com avaliação honesta da mídia",
  intro:
    "Perdeu arquivos ou quer evitar perder? Separamos dois trabalhos diferentes: montar uma rotina de backup que funcione e tentar recuperar o que já sumiu. Recuperação é tentativa técnica, avaliada mídia a mídia — e explicamos o limite antes de você gastar.",
  whatsappMessage: "Olá! Preciso de ajuda com backup ou recuperação de arquivos.",
  precoNota: "avaliação",
  incluso: [
    { title: "Criação de rotina de backup", desc: "Cópia local em disco externo e cópia em nuvem, com restauração testada." },
    { title: "Transferência de arquivos", desc: "Migração de dados entre computadores, discos ou para o equipamento novo." },
    { title: "Recuperação lógica", desc: "Exclusão acidental, formatação recente, partição perdida e sistema que não inicia." },
    { title: "Avaliação de HD", desc: "Leitura de saúde do disco, setores defeituosos e viabilidade de cópia da imagem." },
    { title: "Avaliação de SSD", desc: "Verificação de reconhecimento, controladora e limite técnico do caso." },
    { title: "Pendrive e cartão", desc: "Mídia removível não reconhecida, corrompida ou com arquivos ilegíveis." },
  ],
  sinais: [
    "Apagou arquivos ou esvaziou a lixeira por engano",
    "Formatou o disco ou o cartão antes de copiar os dados",
    "O computador não inicia e os arquivos estão dentro dele",
    "O HD externo pede formatação ao ser conectado",
    "O disco faz clique, zumbido ou some do sistema no meio do uso",
    "Pendrive ou cartão não aparece, ou aparece com capacidade errada",
    "Pastas apareceram vazias ou com nomes estranhos após queda de energia",
    "Quer parar de depender de uma única cópia dos arquivos",
  ],
  processo: [
    { step: "1", title: "Contexto da perda", desc: "O que aconteceu, o que foi tentado e quais arquivos são prioridade — isso muda a estratégia." },
    { step: "2", title: "Avaliação da mídia", desc: "Testes de reconhecimento e saúde para dizer se há caminho e qual, incluindo cópia de imagem quando possível." },
    { step: "3", title: "Retorno com limites", desc: "Informamos o cenário realista, o custo e quando o caso exige laboratório especializado." },
    { step: "4", title: "Tentativa e entrega", desc: "Execução da tentativa aprovada e entrega do que for recuperado em mídia separada." },
  ],
  fatoresValor: [
    { title: "Estado da mídia", desc: "Falha lógica, setores defeituosos e falha mecânica são trabalhos de complexidade muito diferente." },
    { title: "Tipo de dispositivo", desc: "HD, SSD, cartão e pendrive exigem abordagens distintas — SSD com controladora comprometida é o caso mais restritivo." },
    { title: "Tentativas anteriores", desc: "Uso continuado e software de recuperação já aplicado costumam encarecer e limitar o trabalho." },
    { title: "Volume e prioridade", desc: "Copiar uma pasta específica é diferente de resgatar todo o conteúdo de um disco grande." },
    { title: "Mídia de destino", desc: "Os dados recuperados precisam ir para outro dispositivo, que pode ser seu ou fornecido à parte." },
    { title: "Necessidade de laboratório", desc: "Abertura em ambiente controlado e peças doadoras entram como custo e prazo de terceiro." },
  ],
  atendimento: {
    residencial:
      "Fotos, documentos, trabalhos e arquivos pessoais. Configuração de rotina de backup na casa do cliente ou remotamente.",
    empresarial:
      "Arquivos de trabalho, base de sistema e pastas compartilhadas em atendimento avulso, com organização da cópia e do local de armazenamento.",
  },
  extra: Extra,
  blocoLocal: [
    {
      titulo: "Perda lógica x perda física: por que a diferença muda tudo",
      paragrafos: [
        "Na perda lógica, o dispositivo continua sendo reconhecido: houve exclusão, formatação, corrupção de partição ou falha do sistema de arquivos. O conteúdo em geral ainda está gravado, e a chance depende de quanto foi escrito por cima desde o incidente. Por isso o pedido mais importante é parar de usar o aparelho imediatamente.",
        "Na perda física, o dispositivo apresenta comportamento anormal: ruído, aquecimento incomum, sumiço intermitente, capacidade errada. Aqui não se roda software de recuperação em cima do disco original — cada tentativa força um hardware já comprometido. O caminho é avaliar e, quando viável, trabalhar sobre uma cópia de imagem em vez do disco doente.",
        "SSD merece um parágrafo próprio. Como o controlador gerencia os blocos internamente e há descarte automático de dados apagados, recuperação em SSD tem limite técnico maior do que em HD, e falha de controladora frequentemente encerra o caso. Preferimos dizer isso na primeira conversa a cobrar por uma tentativa sem perspectiva.",
      ],
    },
    {
      titulo: "Como atendemos casos de perda de dados em Curitiba",
      paragrafos: [
        "Recebemos o relato pelo WhatsApp, orientamos sobre o que não fazer e combinamos a avaliação. Quando o equipamento inteiro está envolvido — computador que não liga, notebook com queda —, o atendimento pode começar com suporte para computador e notebook na cidade e só depois isolar a questão dos arquivos.",
        "Casos que dependem de tempo de bancada ou de laboratório especializado envolvem retirada do equipamento, com registro do que foi recebido. Os dados recuperados são entregues em outro dispositivo, e o material original é devolvido junto.",
      ],
    },
  ],
  linksLocais: [
    { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
    { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
    { label: "Política de privacidade", to: "/politica-privacidade" },
    { label: "Preços e políticas", to: "/precos-e-politicas" },
  ],
  faqs: [
    { question: "Vocês garantem que meus arquivos voltam?", answer: "Não. Recuperação de dados é tentativa técnica: depende do tipo de falha, do estado da mídia e do que aconteceu depois da perda. Avaliamos e informamos o cenário realista antes de qualquer cobrança de execução." },
    { question: "O que eu devo fazer agora que perdi os arquivos?", answer: "Pare de usar o dispositivo. Não instale programas de recuperação, não salve nada nele e não formate. Cada gravação nova pode sobrescrever o que ainda estava lá." },
    { question: "Dá para recuperar dados de SSD?", answer: "Em alguns casos lógicos, sim. Mas o SSD apaga blocos internamente e, quando a falha é de controladora, normalmente não há caminho. Avaliamos e dizemos claramente quando não há perspectiva." },
    { question: "Quanto custa a recuperação?", answer: "Não existe valor único. O orçamento sai depois da avaliação da mídia, porque falha lógica, setores defeituosos e falha mecânica exigem trabalhos completamente diferentes." },
    { question: "Vocês veem o conteúdo dos meus arquivos?", answer: "Manipulamos apenas o necessário para executar a tentativa e conferir a integridade do que foi recuperado, conforme a política de privacidade publicada no site." },
    { question: "Como monto um backup que realmente funciona?", answer: "Duas cópias em lugares diferentes — uma local em disco externo e uma em nuvem — com restauração testada pelo menos uma vez. Configuramos e mostramos como conferir se está rodando." },
  ],
  relacionados: [
    { label: "Conserto de PC e notebook", to: "/servicos/conserto-pc-notebook" },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria" },
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
  ],
  dateModified: "2026-08-05",
};

const BackupRecuperacao = () => <ServicoLandingLayout data={data} />;

export default BackupRecuperacao;
