import React from "react";

export type ProgrammaticPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content: React.ReactNode;
};

type Section = { h: string; p?: string; list?: string[] };
type PostDef = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  readTime?: string;
  lead: string;
  sections: Section[];
  whenToCall: string;
};

const WA = "https://wa.me/5541997452053?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20um%20problema%20no%20PC.";

const renderPost = (d: PostDef): React.ReactNode => (
  <>
    <p className="lead">{d.lead}</p>
    {d.sections.map((s, i) => (
      <React.Fragment key={i}>
        <h2>{s.h}</h2>
        {s.p && <p>{s.p}</p>}
        {s.list && (
          <ul>
            {s.list.map((li, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
            ))}
          </ul>
        )}
      </React.Fragment>
    ))}
    <h2>Quando chamar um técnico</h2>
    <p>{d.whenToCall}</p>
    <p>
      <strong>
        <a href={WA} target="_blank" rel="noopener noreferrer">
          Fale com o Técnico Curitiba no WhatsApp
        </a>
      </strong>{" "}
      — atendimento remoto para todo o Brasil. Diagnóstico gratuito, você paga apenas se o problema for resolvido.
    </p>
  </>
);

const defs: PostDef[] = [
  {
    slug: "pc-nao-liga-o-que-fazer",
    title: "PC Não Liga: O Que Fazer Passo a Passo (Guia 2026)",
    excerpt: "PC não dá sinal de vida? Veja o passo a passo para identificar se é fonte, placa-mãe, memória ou apenas mau contato.",
    category: "Problemas de Computador",
    lead: "Quando o PC simplesmente não liga, o pânico bate — mas em 70% dos casos o problema é simples: fonte, conexão, ou memória RAM. Veja como diagnosticar.",
    sections: [
      { h: "1. Verifique a alimentação", p: "Antes de qualquer coisa, confirme o básico: cabo de força conectado, régua/estabilizador ligado e tomada funcionando (teste com outro aparelho)." },
      {
        h: "2. Identifique os sinais",
        list: [
          "<strong>Nada acontece</strong> (sem LED, sem som): fonte ou cabo de força",
          "<strong>LED acende, ventoinhas giram, mas não dá vídeo</strong>: memória RAM ou placa de vídeo",
          "<strong>Liga e desliga sozinho</strong>: superaquecimento ou fonte fraca",
          "<strong>Beeps repetidos</strong>: erro de POST (consulte o manual da placa-mãe)",
        ],
      },
      {
        h: "3. Teste a fonte",
        p: "Desconecte o cabo ATX (24 pinos) da placa-mãe. Use um clipe para fazer ponte entre o fio verde e qualquer preto no conector. Se a ventoinha da fonte girar, a fonte tem vida — mas isso não garante que está entregando tensão correta.",
      },
      {
        h: "4. Reassente memória RAM e placa de vídeo",
        p: "Tire da tomada, abra o gabinete, remova os pentes de RAM e a GPU. Limpe os contatos com borracha branca, recoloque firmemente até travar. Em muitos casos isso resolve.",
      },
      {
        h: "5. Limpe a CMOS",
        p: "Remova a bateria da placa-mãe (CR2032) por 30 segundos e recoloque. Isso reseta a BIOS e pode resolver problemas após upgrade ou configuração errada.",
      },
    ],
    whenToCall: "Se após esses passos o PC continua sem ligar, provavelmente é placa-mãe ou fonte com defeito interno — casos que exigem multímetro, fonte de bancada e às vezes microsoldagem.",
  },
  {
    slug: "tela-azul-windows-como-resolver",
    title: "Tela Azul no Windows: Como Resolver de Verdade (BSOD 2026)",
    excerpt: "Aprenda a interpretar os códigos de tela azul (BSOD) e resolva travamentos do Windows 10/11 com método profissional.",
    category: "Problemas de Computador",
    lead: "Tela azul (BSOD) no Windows é o sistema avisando que encontrou algo que não consegue tratar. O código de erro é a chave para resolver.",
    sections: [
      {
        h: "Códigos mais comuns e o que significam",
        list: [
          "<strong>DRIVER_IRQL_NOT_LESS_OR_EQUAL</strong>: driver corrompido ou incompatível",
          "<strong>PAGE_FAULT_IN_NONPAGED_AREA</strong>: memória RAM com defeito",
          "<strong>SYSTEM_SERVICE_EXCEPTION</strong>: serviço do Windows ou driver",
          "<strong>WHEA_UNCORRECTABLE_ERROR</strong>: hardware (CPU, RAM ou placa-mãe)",
          "<strong>CRITICAL_PROCESS_DIED</strong>: arquivo de sistema corrompido",
        ],
      },
      {
        h: "Passo 1 — Verifique atualizações recentes",
        p: "Se a tela azul começou após um Windows Update, vá em Configurações → Windows Update → Histórico → Desinstalar atualizações. Remova a última.",
      },
      {
        h: "Passo 2 — Teste a memória RAM",
        p: "Pressione Windows+R, digite mdsched.exe e reinicie. O teste pode demorar 30 minutos. Se aparecer erro, pelo menos um pente está com defeito.",
      },
      {
        h: "Passo 3 — Verifique arquivos de sistema",
        p: "Abra o Prompt de Comando como administrador e rode: sfc /scannow seguido de DISM /Online /Cleanup-Image /RestoreHealth.",
      },
      {
        h: "Passo 4 — Atualize drivers",
        p: "Drivers de placa de vídeo, chipset e rede são os maiores causadores. Baixe sempre do site do fabricante, nunca de sites genéricos.",
      },
    ],
    whenToCall: "Se a tela azul persiste após esses passos, há indícios de defeito em hardware. Um diagnóstico profissional identifica em minutos se é memória, SSD ou placa-mãe.",
  },
  {
    slug: "notebook-superaquecendo-solucoes",
    title: "Notebook Esquentando Muito: 7 Causas e Como Resolver",
    excerpt: "Notebook quente demais derrete componentes e perde desempenho. Veja as causas reais e as soluções definitivas.",
    category: "Notebook",
    lead: "Notebook quente perde 30-50% de desempenho automaticamente (thermal throttling) e tem vida útil reduzida. A boa notícia: 90% dos casos são resolvidos com limpeza interna.",
    sections: [
      {
        h: "Por que esquenta",
        list: [
          "Pasta térmica ressecada (acontece em 2-3 anos)",
          "Cooler entupido com poeira e pelos",
          "Uso em superfícies macias (cama, sofá) bloqueia entradas de ar",
          "Programas pesados rodando em segundo plano",
          "Drivers de GPU desatualizados",
          "BIOS antiga sem otimização térmica",
          "Bateria inchada empurrando o teclado",
        ],
      },
      { h: "Sinal de alerta — use um monitor", p: "Instale o HWMonitor (gratuito). Temperatura saudável: CPU abaixo de 80°C em uso pesado. Acima de 90°C é crítico." },
      { h: "Limpeza externa imediata", p: "Use ar comprimido nas saídas laterais e traseiras. Faça em curtos jatos, segurando a ventoinha com um palito para não girá-la." },
      { h: "Limpeza interna (faz diferença real)", p: "Desmontar o notebook, retirar o cooler, limpar com pincel macio e trocar a pasta térmica. Reduz a temperatura em 10-20°C." },
      { h: "Base refrigerada ajuda?", p: "Em parte. Reduz 3-5°C. Não substitui a limpeza interna." },
    ],
    whenToCall: "Se a temperatura passa de 90°C mesmo após limpeza superficial, a pasta térmica precisa ser trocada e o cooler aberto. É um serviço delicado que pede técnico experiente.",
  },
  {
    slug: "wifi-caindo-toda-hora",
    title: "Wi-Fi Caindo Toda Hora? 10 Soluções Que Funcionam em 2026",
    excerpt: "Internet caindo sem motivo aparente? Veja como resolver problemas de Wi-Fi instável em roteadores TP-Link, Intelbras, Vivo e outros.",
    category: "Redes",
    lead: "Wi-Fi instável é um dos problemas mais frustrantes — e raramente é culpa da operadora. Veja o método que técnicos usam para diagnosticar e resolver.",
    sections: [
      {
        h: "Diagnóstico em 30 segundos",
        list: [
          "Cai só no celular ou também no PC com cabo?",
          "Cai em todos os cômodos ou só em um?",
          "Cai sempre no mesmo horário?",
          "Começou após algum evento (mudança, novo aparelho, atualização)?",
        ],
      },
      { h: "Solução 1: mude o canal Wi-Fi", p: "No painel do roteador (geralmente 192.168.0.1 ou 192.168.1.1), troque o canal de 'Automático' para 1, 6 ou 11 (em 2.4GHz). Apartamentos sofrem com interferência de vizinhos." },
      { h: "Solução 2: separe as bandas 2.4 e 5GHz", p: "Crie SSIDs diferentes. Use 5GHz para celulares e notebooks próximos; 2.4GHz para dispositivos longe ou IoT." },
      { h: "Solução 3: atualize o firmware do roteador", p: "Firmware antigo trava periodicamente. Verifique no site do fabricante." },
      { h: "Solução 4: posicionamento", p: "Roteador no centro da casa, alto, longe de espelhos, micro-ondas, paredes de concreto e aquários." },
      { h: "Solução 5: dispositivos demais", p: "Roteadores básicos travam com mais de 15 conexões simultâneas. IoT (lâmpadas, câmeras) somam rapidamente." },
    ],
    whenToCall: "Se o Wi-Fi continua caindo após essas otimizações, pode ser hora de migrar para roteador mesh ou reconfigurar a rede com VLANs. Posso ajudar remotamente em qualquer cidade do Brasil.",
  },
  {
    slug: "pc-muito-lento-como-acelerar",
    title: "PC Muito Lento: Como Acelerar em 30 Minutos (Sem Formatar)",
    excerpt: "Aprenda o método dos técnicos para deixar o PC mais rápido sem precisar formatar. Funciona em Windows 10 e 11.",
    category: "Software / Sistema",
    lead: "PC lento raramente é 'velho demais' — geralmente está sobrecarregado de programas em background, disco fragmentado ou com pouca RAM livre. Dá para acelerar muito sem formatar.",
    sections: [
      { h: "1. Limpe a inicialização", p: "Ctrl+Shift+Esc → aba Inicializar. Desative tudo que não for essencial (Spotify, Steam, Adobe, OneDrive se não usa). Reduz o tempo de boot em até 70%." },
      { h: "2. Desinstale o que não usa", p: "Configurações → Apps → ordene por tamanho. Toolbars, antivírus duplicados e jogos esquecidos consomem disco e CPU em segundo plano." },
      { h: "3. Use o SSD que você já tem", p: "Se ainda usa HD mecânico, esse é o gargalo. Um SSD básico de 240GB transforma qualquer PC em ~10x mais rápido na inicialização e abertura de programas." },
      { h: "4. Aumente a RAM se possível", p: "Abaixo de 8GB no Windows 10/11 é sofrimento. Em notebooks, verifique slots livres com o CPU-Z." },
      { h: "5. Limpe arquivos temporários", p: "Windows+R → digite %temp% → Delete tudo. Faça também 'Limpeza de Disco' como administrador." },
      { h: "6. Verifique vírus e mineradores", p: "Use Malwarebytes (gratuito). Mineradores escondidos podem consumir 80% da CPU sem você perceber." },
    ],
    whenToCall: "Se mesmo após esses passos o PC continua arrastado, vale o diagnóstico para ver se há problema de hardware (HD com bad blocks, RAM com defeito) ou se é caso de formatação limpa.",
  },
  {
    slug: "como-remover-virus-sem-formatar",
    title: "Como Remover Vírus do PC Sem Formatar (Guia Profissional 2026)",
    excerpt: "Aprenda a remover vírus, trojans, ransomware e adware sem perder seus arquivos. Método usado por técnicos profissionais.",
    category: "Segurança",
    lead: "Em 95% dos casos, dá para remover vírus sem formatar e sem perder arquivos. O segredo é a ordem correta das ferramentas.",
    sections: [
      {
        h: "Sinais de infecção",
        list: [
          "Anúncios pop-up mesmo com navegador fechado",
          "Página inicial mudou sozinha",
          "PC muito lento e ventoinha sempre máxima",
          "Programas abrindo sozinhos",
          "Antivírus desativado e não liga mais",
          "Arquivos com extensão estranha (.locky, .crypto) — sinal de ransomware",
        ],
      },
      { h: "Passo 1 — Entre em Modo de Segurança", p: "No Windows 11: Configurações → Sistema → Recuperação → Inicialização Avançada → Reiniciar. Escolha 'Modo de Segurança com Rede'." },
      { h: "Passo 2 — Rode Malwarebytes", p: "Baixe e instale o Malwarebytes Free. Faça verificação completa (não a rápida). Remove tudo que encontrar e reinicie." },
      { h: "Passo 3 — Rode AdwCleaner", p: "Mesma fabricante. Especialista em adware, sequestradores de navegador e PUPs. Gratuito." },
      { h: "Passo 4 — Limpe os navegadores", p: "Resete Chrome/Edge/Firefox. Remova todas as extensões que você não reconhece. Limpe DNS local: ipconfig /flushdns no cmd." },
      { h: "Passo 5 — Verifique inicialização e tarefas agendadas", p: "Muitos malwares se recolocam via Agendador de Tarefas. Use Autoruns (Sysinternals) para auditar." },
    ],
    whenToCall: "Se for ransomware (arquivos criptografados pedindo resgate), NÃO pague e NÃO formate ainda. Em alguns casos é possível recuperar com ferramentas específicas — chame um técnico antes.",
  },
  {
    slug: "windows-nao-atualiza-erros",
    title: "Windows Não Atualiza: Como Resolver Erros do Windows Update",
    excerpt: "Erro 0x80070002, 0x8024a105, atualização travada em 0%? Veja como resolver de forma definitiva.",
    category: "Software / Sistema",
    lead: "Windows Update travado é um dos problemas mais frequentes — e a Microsoft só piorou com o Windows 11. Veja o passo a passo profissional.",
    sections: [
      { h: "Solução 1: o reset clássico", p: "Pare os serviços (Windows Update, BITS, Cryptographic), apague a pasta C:\\Windows\\SoftwareDistribution e reinicie os serviços. Resolve 60% dos casos." },
      { h: "Solução 2: solucionador de problemas", p: "Configurações → Sistema → Solução de Problemas → Outros Solucionadores → Windows Update → Executar." },
      { h: "Solução 3: DISM + SFC", p: "Prompt como admin: DISM /Online /Cleanup-Image /RestoreHealth seguido de sfc /scannow. Repara componentes corrompidos." },
      { h: "Solução 4: instale manualmente", p: "Vá no Catálogo do Microsoft Update, busque pelo número da KB que está falhando e baixe o .msu manualmente." },
      { h: "Solução 5: in-place upgrade", p: "Última cartada não destrutiva: baixe a ISO oficial do Windows, monte e rode setup.exe escolhendo 'Manter tudo'. Reinstala o sistema preservando arquivos e programas." },
    ],
    whenToCall: "Quando nenhum dos passos resolve, geralmente há corrupção profunda. O in-place upgrade remoto, feito por um técnico, salva sem perder nada.",
  },
  {
    slug: "impressora-nao-imprime-solucoes",
    title: "Impressora Não Imprime: 8 Soluções (HP, Epson, Brother, Canon)",
    excerpt: "Impressora aparece offline, na fila ou simplesmente ignora seus comandos? Veja como resolver em minutos.",
    category: "Problemas de Impressora",
    lead: "Impressora 'offline' é quase sempre problema de comunicação, não de hardware. Veja como diagnosticar rapidamente.",
    sections: [
      { h: "1. Reinicie tudo (regra de ouro)", p: "Desligue impressora da tomada por 30 segundos. Reinicie o roteador. Reinicie o PC. Resolve 40% dos casos." },
      { h: "2. Defina como padrão", p: "Configurações → Bluetooth e Dispositivos → Impressoras → escolha a sua → Definir como padrão. Desative 'Permitir que o Windows gerencie a impressora padrão'." },
      { h: "3. Limpe a fila", p: "Configurações → abrir a impressora → 'Abrir fila de impressão' → cancele todos os documentos travados." },
      { h: "4. Reinstale o driver", p: "Remova a impressora, baixe o driver oficial do site do fabricante (HP/Epson/Brother/Canon) e reinstale. Drivers genéricos do Windows costumam falhar." },
      { h: "5. Verifique o IP", p: "Em impressoras de rede, o IP pode mudar se o roteador reiniciar. Imprima o relatório de configuração da impressora para confirmar." },
      { h: "6. Spooler de impressão", p: "Win+R → services.msc → Spooler de Impressão → Reiniciar." },
      { h: "7. Firewall e antivírus", p: "Antivírus de terceiros (especialmente Avast e McAfee) bloqueiam comunicação com impressoras. Teste desativando temporariamente." },
      { h: "8. Cartucho ou toner", p: "Algumas impressoras bloqueiam a impressão se um único cartucho colorido estiver vazio, mesmo imprimindo em preto. Troque ou reset." },
    ],
    whenToCall: "Quando o problema persiste, geralmente é incompatibilidade entre versão do Windows e driver, ou configuração de rede. Resolvo remotamente em minutos.",
  },
  {
    slug: "ssd-vs-hd-vale-a-pena-upgrade",
    title: "SSD vs HD: Vale a Pena o Upgrade em 2026? (Resposta Honesta)",
    excerpt: "Comparativo real entre SSD e HD mecânico: velocidade, preço, durabilidade. Veja se o upgrade compensa para o seu uso.",
    category: "Hardware",
    lead: "Sim — em 99% dos casos vale a pena trocar HD por SSD. É o upgrade com melhor custo-benefício da história da computação pessoal.",
    sections: [
      {
        h: "Velocidade na vida real",
        list: [
          "<strong>Boot do Windows</strong>: HD ~90s / SSD SATA ~15s / SSD NVMe ~8s",
          "<strong>Abrir Chrome</strong>: HD 5s / SSD instantâneo",
          "<strong>Abrir Photoshop</strong>: HD 25s / SSD 4s",
          "<strong>Copiar 10GB</strong>: HD 4 min / SSD 30s / NVMe 5s",
        ],
      },
      { h: "Tipos de SSD", p: "SATA: o básico, conecta como HD comum. NVMe: 5x mais rápido, conecta direto na placa-mãe (slot M.2). Verifique no manual da sua placa." },
      { h: "Tamanho ideal", p: "240GB para uso básico, 480GB para uso comum, 1TB se tem muitos jogos. Não economize muito: ficar com 90% cheio reduz a vida útil do SSD." },
      { h: "Marcas confiáveis", p: "Kingston, Samsung, Crucial, WD. Evite marcas desconhecidas com preço muito abaixo do mercado — costumam ter 1/3 da vida útil." },
      { h: "Posso reaproveitar o HD?", p: "Sim, ótima ideia: SSD para sistema + programas; HD antigo para arquivos, fotos e backup." },
    ],
    whenToCall: "Faço migração completa remoto: clono o sistema do HD para o SSD sem perder nada (programas, arquivos, senhas). Em notebooks, oriento a troca física por vídeo-chamada.",
  },
  {
    slug: "como-fazer-backup-na-nuvem",
    title: "Como Fazer Backup na Nuvem em 2026: Guia Completo e Seguro",
    excerpt: "Aprenda a configurar backup automático na nuvem (Google Drive, OneDrive, Mega) e nunca mais perca fotos e documentos.",
    category: "Segurança",
    lead: "A regra 3-2-1 do backup: 3 cópias, em 2 mídias diferentes, com 1 fora de casa (nuvem). Veja como fazer sem complicação.",
    sections: [
      {
        h: "Compare os serviços (planos gratuitos)",
        list: [
          "<strong>Google Drive</strong>: 15GB grátis, integração com Android e Gmail",
          "<strong>OneDrive</strong>: 5GB grátis, integrado ao Windows 11",
          "<strong>Mega</strong>: 20GB grátis, foco em privacidade (criptografia)",
          "<strong>iCloud</strong>: 5GB grátis, melhor para usuários Apple",
        ],
      },
      { h: "Backup das fotos (o mais importante)", p: "Instale Google Fotos no celular e ative 'Backup'. Faça o mesmo no PC com Google Drive Desktop apontando para a pasta Imagens." },
      { h: "Backup de documentos", p: "Mova a pasta Documentos para dentro do OneDrive ou Google Drive. Tudo que salvar ali sincroniza automaticamente." },
      { h: "Backup de WhatsApp", p: "WhatsApp → Configurações → Conversas → Backup → diário no Google Drive (Android) ou iCloud (iPhone). Ative criptografia." },
      { h: "Backup local também (regra 3-2-1)", p: "Compre um HD externo de 1TB e use o 'Histórico de Arquivos' do Windows. Mantenha desconectado quando não estiver fazendo backup (proteção contra ransomware)." },
    ],
    whenToCall: "Configuro backup automático na nuvem + local remotamente em ~40 minutos. Ideal para quem tem fotos de família e documentos importantes e não quer arriscar.",
  },
  {
    slug: "como-formatar-pc-sem-perder-arquivos",
    title: "Como Formatar o PC Sem Perder Arquivos: Guia Passo a Passo 2026",
    excerpt: "Formatação limpa do Windows preservando seus documentos, fotos e configurações. Método profissional para Windows 10 e 11.",
    category: "Procedimentos Técnicos",
    lead: "Dá para 'formatar' o Windows mantendo arquivos pessoais — usando o recurso 'Redefinir este PC' ou um in-place upgrade. Veja o método correto.",
    sections: [
      { h: "Antes de tudo: backup completo", p: "Mesmo que o Windows prometa manter arquivos, faça backup em HD externo ou nuvem das pastas Documentos, Imagens, Downloads, Área de Trabalho. Backup é sagrado." },
      { h: "Anote licenças e contas", p: "Liste programas pagos (Office, Photoshop, antivírus), senhas de Wi-Fi, contas de e-mail no Outlook. Exporte favoritos do navegador." },
      { h: "Opção 1: Redefinir este PC (mantém arquivos)", p: "Configurações → Sistema → Recuperação → Redefinir o PC → 'Manter meus arquivos' → 'Download na nuvem' (mais limpo)." },
      { h: "Opção 2: In-place upgrade (mais limpo ainda)", p: "Baixe a ISO oficial do Windows, monte o arquivo, execute setup.exe e escolha 'Manter arquivos, configurações e aplicativos pessoais'. Repara o sistema sem perder nada." },
      { h: "Opção 3: Formatação completa (recomendada para vírus)", p: "Crie pendrive bootável com Media Creation Tool, dê boot pelo pendrive, formate a partição C: e instale do zero. Mais demorado mas mais seguro." },
      { h: "Após formatar", p: "Instale drivers (chipset primeiro, depois GPU, áudio, rede). Ative Windows. Restaure backup. Instale programas essenciais." },
    ],
    whenToCall: "Faço formatação remota completa com backup, instalação de drivers, programas essenciais e ativação do Windows — tudo via AnyDesk em 2-3 horas.",
  },
  {
    slug: "como-recuperar-arquivos-apagados",
    title: "Como Recuperar Arquivos Apagados (Mesmo da Lixeira)",
    excerpt: "Apagou por engano? Esvaziou a lixeira? Pen drive corrompido? Veja como recuperar arquivos com ferramentas gratuitas e profissionais.",
    category: "Procedimentos Técnicos",
    lead: "Arquivo apagado raramente é arquivo perdido — o Windows apenas marca o espaço como livre. Quanto mais rápido você agir, maior a chance de recuperação.",
    sections: [
      { h: "Regra de ouro: pare de usar o disco", p: "Cada gravação nova pode sobrescrever os dados apagados. Se o arquivo era do C:, não baixe ferramenta de recuperação no C: — use outro disco ou pen drive." },
      {
        h: "Ferramentas gratuitas que funcionam",
        list: [
          "<strong>Recuva</strong> — clássica, fácil para iniciantes",
          "<strong>PhotoRec</strong> — gratuita, recupera fotos, vídeos e documentos por assinatura de arquivo",
          "<strong>Disk Drill</strong> — interface bonita, versão gratuita até 500MB",
          "<strong>EaseUS Data Recovery</strong> — boa taxa de sucesso, gratuita até 2GB",
        ],
      },
      { h: "Cartão SD ou pen drive corrompido", p: "Não formate quando o Windows pedir! Use o PhotoRec apontando para o cartão. Funciona mesmo em mídias que aparecem como 'precisa formatar'." },
      { h: "HD com bad blocks", p: "Use HDDScan ou Victoria para mapear setores ruins. Se o HD ainda for reconhecido, dá para clonar com ddrescue (Linux) e recuperar do clone." },
      { h: "SSD apagado: chances baixas", p: "TRIM apaga permanentemente em SSDs. Recuperação só é possível em raros casos (TRIM desativado, RAID específico). Backup é a única defesa real." },
    ],
    whenToCall: "Em casos sérios (HD físico danificado, ransomware, partição perdida), evite mexer — cada tentativa amadora reduz as chances. Faço diagnóstico remoto antes de qualquer ação destrutiva.",
  },
  {
    slug: "como-aumentar-velocidade-internet",
    title: "Como Aumentar a Velocidade da Internet em Casa (Sem Mudar de Plano)",
    excerpt: "Internet contratada de 300MB e só chega 50? Veja como recuperar a velocidade real sem pagar mais à operadora.",
    category: "Redes",
    lead: "Em 80% dos casos, a internet 'lenta' não é da operadora — é do seu Wi-Fi, do roteador ou de algum dispositivo sugando banda em segundo plano.",
    sections: [
      { h: "1. Teste com cabo", p: "Conecte um notebook direto no modem com cabo. Se a velocidade chega correta, o problema é o Wi-Fi. Se não chega, é a operadora." },
      { h: "2. Posicione o roteador corretamente", p: "Centro da casa, alto, longe de eletrodomésticos, paredes de concreto e aquários (água absorve sinal de Wi-Fi)." },
      { h: "3. Use 5GHz sempre que possível", p: "5GHz é até 3x mais rápido que 2.4GHz em curtas distâncias. Configure SSIDs separados para escolher quando quiser." },
      { h: "4. Atualize o firmware do roteador", p: "Roteadores fornecidos por operadora costumam ficar anos sem atualização. Verifique no painel administrativo." },
      { h: "5. Mude os DNS", p: "Use 1.1.1.1 (Cloudflare) ou 8.8.8.8 (Google). Costuma deixar a navegação 20-30% mais rápida que os DNS da operadora." },
      { h: "6. Limite dispositivos pesados", p: "Smart TVs em 4K, downloads automáticos do Steam/Xbox e backups de celular podem consumir toda a banda. Configure horários." },
      { h: "7. Considere mesh ou repetidor", p: "Casas com mais de 80m² ou 2 andares precisam de mais de um ponto de Wi-Fi. Mesh é melhor que repetidor." },
    ],
    whenToCall: "Configuro otimização completa de rede (roteador, mesh, DNS, QoS) remotamente. Tipicamente recupero 50-70% da velocidade que estava sendo desperdiçada.",
  },
  {
    slug: "como-saber-se-pc-tem-virus",
    title: "Como Saber Se Meu PC Tem Vírus: 10 Sinais Reais (2026)",
    excerpt: "Aprenda os sinais reais de infecção por vírus, trojan ou minerador de criptomoeda — e como confirmar sem pânico.",
    category: "Segurança",
    lead: "Nem todo PC lento tem vírus, e nem todo vírus deixa o PC lento. Veja os sinais reais de infecção que técnicos identificam.",
    sections: [
      {
        h: "Sinais de infecção comum",
        list: [
          "Anúncios pop-up mesmo com o navegador fechado",
          "Página inicial do navegador mudou sozinha",
          "Extensões novas no Chrome/Edge que você não instalou",
          "Antivírus desativado e não liga mais",
          "PC muito quente em uso leve (sinal de minerador)",
          "Ventoinha sempre máxima sem motivo",
          "Programas abrindo sozinhos",
          "Internet lenta mas sem download ativo",
          "Arquivos com extensão estranha (.locky, .crypted) — ransomware",
          "Amigos recebendo mensagens estranhas vindas de você",
        ],
      },
      { h: "Como confirmar", p: "Gerenciador de Tarefas (Ctrl+Shift+Esc) → ordene por CPU. Processos desconhecidos consumindo CPU em momento de ociosidade são suspeitos. Pesquise o nome no Google." },
      { h: "Faça uma varredura combinada", p: "Use Defender (já vem no Windows) + Malwarebytes + AdwCleaner, nessa ordem. Cada um pega coisas diferentes." },
      { h: "Verifique inicialização e tarefas agendadas", p: "Muitos malwares se recolocam após cada boot. Use Autoruns (Microsoft Sysinternals) — ferramenta gratuita e oficial." },
    ],
    whenToCall: "Se confirmou infecção, especialmente ransomware, NÃO formate por impulso. Faço análise remota e identifico se dá para limpar sem perder seus arquivos.",
  },
  {
    slug: "como-clonar-hd-para-ssd-passo-a-passo",
    title: "Como Clonar HD para SSD Sem Perder Nada (Guia Passo a Passo 2026)",
    excerpt: "Migre do HD para SSD mantendo Windows, programas e arquivos exatamente como estão. Sem reinstalar nada.",
    category: "Procedimentos Técnicos",
    lead: "Clonar é melhor que formatar quando você quer apenas trocar o disco e manter tudo funcionando — Windows, programas, drivers, configurações.",
    sections: [
      { h: "O que você precisa", p: "SSD novo (igual ou maior que os dados usados no HD), case USB para SSD (R$ 30-50) ou conexão SATA, ferramenta de clonagem." },
      {
        h: "Ferramentas gratuitas confiáveis",
        list: [
          "<strong>Macrium Reflect Free</strong>: o padrão profissional",
          "<strong>Samsung Data Migration</strong>: oficial Samsung, simples",
          "<strong>Acronis True Image WD/SanDisk</strong>: gratuito se você comprar SSD dessas marcas",
          "<strong>Clonezilla</strong>: open source, mais técnico",
        ],
      },
      { h: "Passo 1 — Conecte o SSD", p: "Use case USB para conectar o SSD novo. O Windows pode pedir para inicializar — apenas inicialize sem formatar." },
      { h: "Passo 2 — Faça a clonagem", p: "Abra o Macrium Reflect → 'Clone this disk' → selecione HD como origem e SSD como destino. Marque a opção de redimensionar partições para usar todo o espaço do SSD." },
      { h: "Passo 3 — Troque os discos", p: "Desligue o PC. Tire o HD e coloque o SSD no lugar. Em notebooks, o SSD geralmente vai onde estava o HD." },
      { h: "Passo 4 — Boot e otimização", p: "Ligue. Se não der boot, entre na BIOS e mude a ordem de boot para o SSD. Após o Windows carregar, ative o TRIM (rode 'fsutil behavior set DisableDeleteNotify 0' como admin)." },
    ],
    whenToCall: "Faço clonagem remota completa: oriento a conexão por vídeo, executo a clonagem, ajusto BIOS e otimizo o SSD. Tudo em 1-2 horas.",
  },
  {
    slug: "como-instalar-windows-11-do-zero-2026",
    title: "Como Instalar Windows 11 do Zero (Passo a Passo Atualizado 2026)",
    excerpt: "Instalação limpa do Windows 11 com pendrive bootável, drivers e ativação. Guia completo para iniciantes e técnicos.",
    category: "Procedimentos Técnicos",
    lead: "Instalação limpa do Windows 11 é mais simples do que parece — mas tem detalhes importantes em 2026 com os requisitos de TPM e Secure Boot.",
    sections: [
      { h: "Requisitos mínimos atualizados", p: "TPM 2.0 ativado na BIOS, Secure Boot habilitado, 4GB RAM, 64GB de disco, processador compatível (Intel 8ª gen+ ou Ryzen 2000+). PCs sem TPM podem instalar com truques de registro, mas perdem updates." },
      { h: "Passo 1 — Crie o pendrive bootável", p: "Baixe o Media Creation Tool no site oficial da Microsoft. Use pendrive de 8GB+. Aceite formatar." },
      { h: "Passo 2 — Faça backup", p: "Backup completo dos seus arquivos. Mesmo escolhendo formatar só uma partição, acidentes acontecem." },
      { h: "Passo 3 — Boot pelo pendrive", p: "Reinicie. Aperte a tecla de boot menu (F12 / F11 / Esc dependendo da marca). Escolha o pendrive." },
      { h: "Passo 4 — Instalação", p: "Idioma → Português Brasil. Escolha 'Instalação personalizada' → apague todas as partições antigas → instale na partição não alocada (Windows cria as 4 partições automáticas)." },
      { h: "Passo 5 — Conta local (se quiser)", p: "Windows 11 força conta Microsoft. Para usar conta local: na tela de internet, aperte Shift+F10 → digite 'oobe\\bypassnro' → reinicie → 'Não tenho internet' → 'Continuar com configuração limitada'." },
      { h: "Passo 6 — Drivers e ativação", p: "Instale drivers do site do fabricante. Ative com a sua chave (Configurações → Sistema → Ativação). Se for upgrade de Windows 10, geralmente ativa sozinho." },
    ],
    whenToCall: "Faço instalação remota completa: orientação para criar pendrive, instalação via vídeo-chamada, drivers, ativação e configurações personalizadas.",
  },
  {
    slug: "como-trocar-pasta-termica",
    title: "Como Trocar a Pasta Térmica do PC e Notebook (Guia 2026)",
    excerpt: "Aprenda quando trocar a pasta térmica e como aplicar corretamente para reduzir até 20°C de temperatura.",
    category: "Hardware",
    lead: "Pasta térmica ressecada é a causa #1 de superaquecimento em PCs e notebooks com mais de 2 anos. Trocar custa R$ 30 e devolve a performance.",
    sections: [
      { h: "Quando trocar", p: "PCs: a cada 3-4 anos. Notebooks: a cada 2 anos (térmicas mais críticas). Quando a temperatura passa de 85°C em uso normal, é hora." },
      { h: "Material necessário", p: "Pasta térmica (Cooler Master MasterGel, Arctic MX-4 ou Thermal Grizzly), pano de microfibra, álcool isopropílico 99%, chaves Philips." },
      { h: "Passo 1 — Acesse o cooler", p: "PC: abra a lateral, solte os 4 parafusos do cooler ou trava. Notebook: remova a tampa inferior, desconecte a bateria, solte os parafusos numerados do cooler." },
      { h: "Passo 2 — Remova a pasta antiga", p: "Com cotonete embebido em álcool isopropílico, limpe completamente o die da CPU/GPU e a base do cooler. Tem que ficar espelhado." },
      { h: "Passo 3 — Aplique a nova pasta", p: "Para CPUs pequenas: gota do tamanho de um grão de arroz no centro. Para CPUs grandes: linha fina ou método X. Nunca espalhe com o dedo — o cooler espalha sozinho." },
      { h: "Passo 4 — Reinstale o cooler", p: "Aperte os parafusos em X, gradualmente, sem forçar. Em notebooks, siga a ordem numerada estampada no cooler." },
      { h: "Passo 5 — Teste", p: "Após ligar, monitore com HWMonitor por 15 minutos. Em uso normal, a temperatura deve cair 10-20°C em relação ao que estava antes." },
    ],
    whenToCall: "Em notebooks modernos (especialmente gamer e Apple), a troca é delicada e exige desmontagem completa. Oriento por vídeo-chamada ou indico técnico próximo da sua cidade.",
  },
  {
    slug: "como-resetar-senha-windows",
    title: "Como Resetar Senha do Windows (Esqueceu a Senha? Resolva)",
    excerpt: "Esqueceu a senha do Windows 10/11? Veja métodos legítimos para resetar sem perder arquivos.",
    category: "Software / Sistema",
    lead: "Esquecer a senha não é fim do mundo — existem métodos legítimos para resetar sem reinstalar o Windows. Veja em ordem de simplicidade.",
    sections: [
      { h: "Método 1: conta Microsoft", p: "Se sua conta é Microsoft (e-mail), vá em account.microsoft.com em outro dispositivo e use 'Esqueci minha senha'. Após resetar, espere alguns minutos e tente no PC com a nova senha." },
      { h: "Método 2: perguntas de segurança (conta local)", p: "Na tela de login, após errar a senha, aparece 'Redefinir senha'. Responda as perguntas que você configurou ao criar a conta." },
      { h: "Método 3: pendrive de redefinição", p: "Se você criou um pendrive de redefinição antes (Painel de Controle → Contas), use-o agora." },
      { h: "Método 4: outro usuário admin", p: "Se há outra conta de administrador, faça login e mude a senha em 'Gerenciar outra conta'." },
      { h: "Método 5: modo de recuperação (avançado)", p: "Inicie pelo pendrive de instalação do Windows → 'Reparar o computador' → Prompt de Comando → renomeie utilman.exe para utilman.bak e copie cmd.exe como utilman.exe. Na tela de login, clique no ícone de acessibilidade — abrirá cmd. Digite: net user [usuário] [novasenha]." },
      { h: "BitLocker ligado?", p: "Se o disco está criptografado e você não tem a chave de recuperação (salva na conta Microsoft), não há como recuperar — só formatando." },
    ],
    whenToCall: "Faço reset remoto após a conta ser desbloqueada, ou oriento o método correto para o seu caso (conta local, BitLocker, Pro vs Home). Sempre legal e sem perder arquivos.",
  },
  {
    slug: "diferenca-windows-10-vs-11",
    title: "Windows 10 vs Windows 11: Devo Atualizar em 2026? (Análise Honesta)",
    excerpt: "Comparativo real entre Windows 10 e 11 em 2026: performance, recursos, problemas e quando vale (ou não) atualizar.",
    category: "Software / Sistema",
    lead: "Windows 10 perdeu suporte oficial em outubro de 2025. Em 2026, atualizar para o 11 deixou de ser opcional para a maioria dos usuários — mas tem ressalvas.",
    sections: [
      {
        h: "Por que migrar (lado bom)",
        list: [
          "Atualizações de segurança (Windows 10 não recebe mais)",
          "Suporte oficial a TPM 2.0 e Secure Boot",
          "Snap Layouts e desktops virtuais muito melhores",
          "Interface mais moderna e consistente",
          "Melhor desempenho em CPUs Intel 12ª gen+ (eficiência híbrida)",
          "Recursos de IA integrados (Copilot)",
        ],
      },
      {
        h: "Por que adiar (lado ruim)",
        list: [
          "Requisitos de hardware mais altos (TPM, Secure Boot)",
          "Menu Iniciar e barra de tarefas menos customizáveis",
          "Drivers antigos podem não ser compatíveis",
          "Programas legados podem ter problemas",
          "Curva de adaptação para usuários acostumados ao Win10",
        ],
      },
      { h: "Seu PC é compatível?", p: "Use o aplicativo 'PC Health Check' da Microsoft. Verifica TPM 2.0, Secure Boot, processador e memória." },
      { h: "PC não passa nos requisitos — e agora?", p: "Opção 1: instalar com bypass (perde updates). Opção 2: migrar para Linux Mint (interface familiar, leve, atualizado). Opção 3: trocar o PC." },
      { h: "Como atualizar com segurança", p: "Backup completo → desconecte periféricos não essenciais → use o assistente oficial → reserve 1-2 horas." },
    ],
    whenToCall: "Faço upgrade remoto do Windows 10 para 11 com backup, verificação de compatibilidade e validação de drivers — tudo em ~2 horas, sem perder seus arquivos.",
  },
  {
    slug: "melhores-antivirus-gratuitos-2026",
    title: "Melhores Antivírus Gratuitos em 2026: Comparativo Honesto",
    excerpt: "Veja quais antivírus gratuitos realmente protegem em 2026 — sem propaganda, baseado em testes de laboratório.",
    category: "Segurança",
    lead: "O Windows Defender (já incluso no Windows) virou um dos melhores antivírus do mundo. Mas existem casos onde vale combinar com outras ferramentas. Sem hype, veja a verdade.",
    sections: [
      {
        h: "Top 5 antivírus gratuitos (com base nos testes AV-Test e AV-Comparatives 2025-2026)",
        list: [
          "<strong>Microsoft Defender</strong> (já vem no Windows) — protege bem, não pesa, integrado",
          "<strong>Bitdefender Antivirus Free</strong> — leve, motor excelente, sem propagandas",
          "<strong>Avast Free</strong> — bom motor, mas mostra muitas propagandas e tenta vender extras",
          "<strong>Kaspersky Security Cloud Free</strong> — excelente detecção (avaliar implicações geopolíticas)",
          "<strong>AVG Antivirus Free</strong> — mesmo motor da Avast, mais simples",
        ],
      },
      { h: "A combinação que técnicos usam", p: "Microsoft Defender (sempre ativo) + Malwarebytes Free (varredura mensal) + AdwCleaner (quando suspeitar de adware). Cobertura praticamente total sem pagar nada." },
      { h: "Antivírus pagos valem a pena?", p: "Para usuários comuns: não. Para empresas, gamers e quem usa internet banking: vale o ESET, Bitdefender Total Security ou Norton 360 (~R$ 200/ano)." },
      { h: "Sinais de antivírus falso", p: "Pop-up agressivo dizendo 'seu PC tem 234 vírus, clique para limpar' — sempre fraude. Antivírus legítimo não usa esse tipo de marketing." },
      { h: "Boas práticas valem mais que antivírus", p: "Não baixar de sites suspeitos, não abrir anexos de e-mails desconhecidos, manter Windows atualizado, usar gerenciador de senhas, ativar 2FA em tudo." },
    ],
    whenToCall: "Configuro proteção em camadas (Defender + Malwarebytes + DNS seguro + backup) remotamente. Mais eficaz que qualquer antivírus pago sozinho.",
  },
];

const HOWTO_DEFAULT_DATE = "2026-06-14";

export const programmaticPosts: Record<string, ProgrammaticPost> = defs.reduce(
  (acc, d) => {
    acc[d.slug] = {
      title: d.title,
      excerpt: d.excerpt,
      date: d.date || HOWTO_DEFAULT_DATE,
      readTime: d.readTime || "8 min",
      category: d.category,
      content: renderPost(d),
    };
    return acc;
  },
  {} as Record<string, ProgrammaticPost>,
);

// Metadata only (for use in Blog listing)
export const programmaticPostsMeta = defs.map((d) => ({
  slug: d.slug,
  title: d.title,
  excerpt: d.excerpt,
  date: d.date || HOWTO_DEFAULT_DATE,
  readTime: d.readTime || "8 min",
  category: d.category,
}));
