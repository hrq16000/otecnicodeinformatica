import { Link } from "react-router-dom";
import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// RODADA 4C — página dominante da intenção "formatação de computador em
// Curitiba". Sem promessa de licença inclusa, sem software pirata e sem
// prometer preservação de dados fora do backup combinado.

const Extra = (
  <section className="py-14 md:py-16 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
          Formatação não corrige defeito de hardware
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Se a máquina desliga sozinha, reinicia em uso pesado, esquenta demais, faz ruído ou trava com tela azul
          sempre no mesmo momento, a causa provável é física: fonte, memória, temperatura ou armazenamento
          desgastado. Formatar nesses casos devolve um sistema limpo por alguns dias e o sintoma volta. O caminho
          é o{" "}
          <Link className="underline" to="/servicos/conserto-pc-notebook">
            diagnóstico de hardware do computador ou notebook
          </Link>
          .
        </p>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Também é comum a lentidão não ser do sistema, e sim do disco. Máquina com HD mecânico continua lenta
          depois de formatada — o ganho real vem da{" "}
          <Link className="underline" to="/servicos/upgrade-ssd-memoria">
            troca por SSD e do reforço de memória
          </Link>
          , frequentemente feitos na mesma visita da instalação limpa.
        </p>
        <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-foreground">O que não está incluído</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">Licenças pagas de terceiros.</strong> Office, antivírus premium e
            programas comerciais são instalados com a licença que você já possui. Não fornecemos ativação
            irregular.
          </li>
          <li>
            <strong className="text-foreground">Recuperação de dados já perdidos.</strong> Se os arquivos sumiram
            antes da formatação, o caso é de{" "}
            <Link className="underline" to="/servicos/backup-recuperacao">
              avaliação de recuperação
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Peças.</strong> Se o disco estiver no fim da vida, a substituição é
            orçada à parte antes da instalação do sistema.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

const data: ServicoLandingData = {
  path: "formatacao-computador",
  trackingKey: "formatacao-computador",
  metaTitle: "Formatação de Computador em Curitiba | PC e Notebook",
  metaDescription:
    "Formatação de PC e notebook em Curitiba: quando formatar realmente resolve, backup antes, drivers, programas licenciados e testes. Orçamento aprovado antes do serviço.",
  serviceName: "Formatação de Computador e Notebook",
  serviceDescription:
    "Instalação limpa do sistema em computadores e notebooks em Curitiba, com cópia prévia dos arquivos combinada, drivers, atualizações e testes de entrega.",
  eyebrow: "Formatação em Curitiba",
  h1: "Formatação de computador e notebook em Curitiba",
  h1Accent: "feita quando realmente resolve",
  intro:
    "Formatar é reinstalar o sistema do zero — resolve sistema corrompido, praga persistente e acúmulo de anos, mas não conserta hardware. Antes de executar, avaliamos se é esse o caminho e combinamos a cópia dos seus arquivos.",
  whatsappMessage: "Olá! Estou avaliando formatar meu computador. Pode me orientar?",
  incluso: [
    { title: "Avaliação do caso", desc: "Confirmamos se o problema é de sistema antes de partir para a instalação limpa." },
    { title: "Cópia dos arquivos combinada", desc: "Documentos, fotos e pastas de trabalho copiados antes, conforme o que você indicar." },
    { title: "Instalação limpa do sistema", desc: "Windows reinstalado do zero, com particionamento adequado ao equipamento." },
    { title: "Drivers e atualizações", desc: "Chipset, vídeo, rede, áudio e periféricos instalados e atualizados." },
    { title: "Programas essenciais", desc: "Navegador, leitor de PDF, compactador e antivírus do sistema configurados." },
    { title: "Testes e devolução dos dados", desc: "Verificação de rede, som, portas e restauração dos arquivos no lugar." },
  ],
  sinais: [
    "Sistema corrompido, que não inicia ou entra em reparo automático",
    "Praga que volta mesmo depois de limpeza e remoção",
    "Erros constantes do Windows depois de atualização malsucedida",
    "Anos de programas acumulados, inicialização cheia e comportamento instável",
    "Máquina que vai ser vendida, repassada ou trocará de usuário",
    "Instalação de SSD com opção de começar o sistema do zero",
    "Perfil de usuário danificado ou permissões bagunçadas",
  ],
  processo: [
    { step: "1", title: "Triagem", desc: "Você descreve o sintoma; verificamos se formatar resolve ou se o caso é outro." },
    { step: "2", title: "Backup combinado", desc: "Definimos juntos o que precisa ser copiado e conferimos a cópia antes de apagar qualquer coisa." },
    { step: "3", title: "Instalação e drivers", desc: "Sistema limpo, drivers, atualizações e programas essenciais configurados." },
    { step: "4", title: "Testes e entrega", desc: "Rede, áudio, portas, impressora e conta de usuário testados, com seus arquivos de volta." },
  ],
  fatoresValor: [
    { title: "Volume de dados a copiar", desc: "Copiar 30 GB de documentos é diferente de mover centenas de gigabytes de fotos e vídeos." },
    { title: "Estado do armazenamento", desc: "Disco com leitura lenta ou setores ruins aumenta muito o tempo de cópia e instalação." },
    { title: "Programas a reconfigurar", desc: "Sistemas de trabalho, impressoras de rede e contas de e-mail exigem configuração adicional." },
    { title: "Idade do equipamento", desc: "Máquinas antigas podem precisar de driver específico fora do catálogo automático." },
    { title: "Modalidade", desc: "Atendimento no endereço, remoto ou com retirada do equipamento muda o formato do serviço." },
  ],
  atendimento: {
    residencial:
      "Computador de casa, notebook de estudo e máquina compartilhada pela família, com contas de usuário separadas quando fizer sentido.",
    empresarial:
      "Estação de trabalho em atendimento avulso, com atenção a sistema utilizado, impressora de rede e pastas compartilhadas.",
  },
  extra: Extra,
  blocoLocal: [
    {
      titulo: "Quando formatar e quando não formatar",
      paragrafos: [
        "Formatação faz sentido quando o problema está no sistema: arquivos de inicialização corrompidos, atualização que quebrou o ambiente, perfil danificado, infecção persistente ou uma década de instalações sobrepostas. Nesses casos a instalação limpa é mais rápida e mais confiável do que remendar item por item.",
        "Não faz sentido quando o sintoma tem origem física ou quando existe solução menor. Travamento em jogos e programas pesados costuma ser temperatura. Lentidão constante desde sempre costuma ser HD mecânico ou memória insuficiente. Um único programa problemático não justifica apagar o computador inteiro.",
        "Também vale lembrar do que a formatação apaga junto: senhas salvas no navegador, licenças ativadas localmente, conteúdo de e-mail configurado apenas no computador, projetos guardados dentro de pastas de programas. Levantamos esses pontos na conversa antes, porque depois não há como voltar atrás sem cópia.",
      ],
    },
    {
      titulo: "Depois da formatação: o que fica sob sua responsabilidade",
      paragrafos: [
        "Entregamos o sistema atualizado, com drivers e programas básicos. Contas de e-mail, senhas, licenças pagas e sistemas específicos de trabalho dependem dos seus acessos — vale separar login e chave antes do atendimento.",
        "Recomendamos aproveitar a máquina limpa para deixar uma rotina de cópia rodando, tema tratado em backup e proteção de arquivos. É o momento mais barato de organizar isso, e evita repetir a mesma perda na próxima falha.",
      ],
    },
  ],
  linksLocais: [
    { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
    { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
    { label: "Backup e proteção de arquivos", to: "/servicos/backup-recuperacao" },
    { label: "Preços e políticas", to: "/precos-e-politicas" },
  ],
  faqs: [
    { question: "A formatação apaga meus arquivos?", answer: "Sim, a instalação limpa apaga o conteúdo da partição do sistema. Por isso combinamos antes o que será copiado e conferimos a cópia com você antes de iniciar." },
    { question: "Formatar vai deixar meu computador rápido?", answer: "Se a lentidão vier do sistema, sim. Se vier de HD mecânico, pouca memória ou superaquecimento, o ganho é temporário — nesses casos indicamos upgrade ou diagnóstico de hardware." },
    { question: "Vocês instalam Windows e Office ativados?", answer: "Instalamos o sistema e ativamos com licença legítima que você possua. Não trabalhamos com ativação irregular nem incluímos licença paga no valor do serviço." },
    { question: "Meus programas voltam depois?", answer: "Programas precisam ser reinstalados. Deixamos o essencial pronto e reinstalamos o que você tiver instalador ou login; sistemas específicos de trabalho podem exigir apoio do fornecedor." },
    { question: "Dá para formatar sem perder nada?", answer: "Não existe formatação que preserve o sistema anterior. O que preserva os arquivos é a cópia feita antes — e é ela que conferimos com você." },
    { question: "Quanto tempo leva?", answer: "Depende do volume de dados, da velocidade do disco e dos programas a configurar. Damos a estimativa depois de saber o equipamento e o que precisa ser copiado." },
  ],
  relacionados: [
    { label: "Remoção de vírus", to: "/servicos/remocao-virus" },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria" },
    { label: "Conserto de PC e notebook", to: "/servicos/conserto-pc-notebook" },
  ],
  dateModified: "2026-08-05",
};

const FormatacaoComputador = () => <ServicoLandingLayout data={data} />;

export default FormatacaoComputador;
