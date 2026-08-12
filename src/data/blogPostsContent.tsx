import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { EditorialReferences } from "@/components/BlogPostFAQ";
import windowsKb5074105Image from "@/assets/blog/windows-11-kb5074105-update.jpg";
import { BRAND_NAME } from "@/lib/siteConfig";


export type BlogPostContent = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content: ReactNode;
};

export const blogPostsContentBase: Record<string, BlogPostContent> = {

  "organizacao-de-ti-para-pequenos-escritorios": {
    title: "Organização de TI para pequenos escritórios: o guia prático",
    excerpt: "Como organizar equipamentos, arquivos, acessos e rotina de manutenção em um escritório pequeno, sem contratar estrutura de TI que não cabe no negócio.",
    date: "2026-08-06",
    readTime: "10 min",
    category: "Empresas",
    content: (
      <>
        <p className="lead">Escritório pequeno raramente tem alguém dedicado a TI. Na prática, o computador é problema de quem senta nele — até o dia em que a máquina do fechamento para, o arquivo some ou ninguém sabe a senha do sistema. Organizar TI num escritório de 3 a 20 pessoas não exige contratar departamento: exige inventário, rotina e decisões escritas.</p>

        <h2>Resposta curta</h2>
        <p>Comece pelo inventário dos equipamentos, defina onde os arquivos de trabalho ficam, estabeleça quem autoriza acessos, crie uma rotina simples de cópia de segurança e registre por escrito quem responde por cada sistema contratado. Esses cinco pontos resolvem a maior parte das paradas evitáveis.</p>

        <h2>1. Inventário: você não protege o que não conhece</h2>
        <p>Antes de qualquer decisão, liste o que existe. Uma planilha simples basta: identificação da máquina, quem usa, tipo (desktop ou notebook), idade aproximada, tipo de armazenamento, quantidade de memória, sistema operacional, se está na garantia e quais programas críticos rodam nela. Some os periféricos que param a operação quando falham — impressora, leitor, roteador, nobreak.</p>
        <p>O inventário responde perguntas que costumam travar decisões: qual máquina é a mais antiga, quantas ainda usam disco mecânico, quem depende de um programa específico e qual equipamento não pode ficar fora do ar por um dia inteiro. Sem essa lista, toda compra vira palpite e toda parada vira urgência.</p>

        <h2>2. Onde os arquivos moram</h2>
        <p>O padrão silencioso da maioria dos escritórios é o pior possível: cada pessoa guarda o que produz na própria área de trabalho. Quando a máquina falha, o trabalho vai junto. Defina um único lugar oficial para arquivos de trabalho — uma pasta sincronizada em nuvem, um armazenamento em rede ou uma combinação dos dois — e trate a área de trabalho como espaço temporário.</p>
        <p>Combine também nomes de pastas e de arquivos. Padrão de nomenclatura parece burocracia até o dia em que três versões do mesmo documento circulam por e-mail. Ano, cliente ou projeto, tipo de documento e versão resolvem quase tudo.</p>

        <h2>3. Cópia de segurança que alguém realmente confere</h2>
        <p>Sincronização em nuvem não é cópia de segurança: se um arquivo é apagado ou corrompido, a alteração se propaga. Cópia de segurança é ter uma versão anterior recuperável. A regra prática mais usada é manter três cópias dos dados importantes, em dois tipos de mídia diferentes, com uma delas fora do local de trabalho.</p>
        <p>Mais importante do que a ferramenta escolhida é o teste. Defina uma data no mês para restaurar um arquivo qualquer e confirmar que a cópia funciona. Cópia nunca testada é suposição. O detalhamento dessa rotina está em <Link to="/servicos/backup-para-empresas" className="text-accent">backup para empresas</Link>.</p>

        <h2>4. Acessos, senhas e quem autoriza o quê</h2>
        <p>Escritório pequeno costuma operar com uma senha compartilhada por todo mundo. Funciona até alguém sair da equipe. Organize em três camadas: contas individuais para cada pessoa, um gerenciador de senhas para credenciais compartilhadas de sistemas e uma lista de quem pode autorizar alterações, compras e liberações.</p>
        <p>Registre por escrito qual pessoa é a responsável administrativa de cada sistema contratado, qual e-mail recebe a recuperação de conta e onde ficam guardados os códigos de autenticação em duas etapas. Perder acesso ao e-mail de recuperação costuma custar mais tempo do que qualquer defeito de hardware. As responsabilidades entre empresa, técnico e fornecedor estão detalhadas em <Link to="/seguranca-dos-dados" className="text-accent">segurança dos dados</Link>.</p>

        <h2>5. Rede, energia e o que ninguém olha</h2>
        <p>Boa parte das reclamações de “internet lenta” em escritório é distribuição interna, não plano contratado: roteador no lugar errado, cabo antigo, equipamento doméstico atendendo vinte dispositivos ou rede sem separação entre uso interno e visitantes. Vale mapear onde estão os pontos de rede, quais máquinas usam cabo e quais dependem de sinal sem fio.</p>
        <p>Se o sinal sem fio não cobre a sala inteira ou a rede cai em horário de pico, a avaliação da estrutura interna está descrita em <Link to="/servicos/redes-e-wifi" className="text-accent">redes e Wi-Fi</Link>.</p>
        <p>Energia é o item mais esquecido. Máquina que guarda arquivos, servidor local, roteador e a estação do fechamento merecem proteção contra queda. Desligamento abrupto durante gravação de arquivo é uma das causas mais comuns de corrupção de dados.</p>

        <h2>6. Rotina de manutenção em vez de urgência</h2>
        <p>Manutenção só acontece quando entra no calendário. Um ciclo simples funciona bem: verificação mensal de espaço em disco e de atualizações pendentes, revisão trimestral de limpeza física e de temperatura, conferência semestral do estado de armazenamento e da idade das máquinas, e planejamento anual de substituição do que já passou da vida útil confortável.</p>
        <p>Essa lógica é a mesma da <Link to="/servicos/manutencao-preventiva-empresas" className="text-accent">manutenção preventiva para empresas</Link>: a troca de um armazenamento que dá sinais de falha custa muito menos que a tentativa de recuperar dados depois.</p>

        <h2>7. O que registrar antes de pedir suporte</h2>
        <p>Chamado bem descrito reduz ida e volta. Antes de acionar suporte, anote qual equipamento e qual pessoa foram afetados, o horário aproximado do início, a mensagem de erro exata, o programa envolvido, qualquer alteração recente, quantas pessoas estão paradas e se o acesso remoto é possível. Nunca envie senhas ou códigos de autenticação por mensagem.</p>

        <h2>8. Onde termina o computador e começa o fornecedor</h2>
        <p>Sistema contratado — contábil, jurídico, de gestão, e-mail corporativo, certificado digital — é mantido por terceiros. O suporte técnico atua na camada da máquina, da rede e do acesso: instalar, conectar, corrigir sessão, ajustar permissão e periférico. Erro interno do sistema, licença, indisponibilidade do servidor e recuperação de conta são do fornecedor. Deixar isso claro por escrito evita expectativa errada nos dois lados. O escopo completo está em <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">suporte técnico empresarial</Link>.</p>

        <h2>Checklist de organização</h2>
        <ul>
          <li>Inventário atualizado de máquinas, periféricos e programas críticos</li>
          <li>Local único e conhecido para os arquivos de trabalho</li>
          <li>Padrão de nomes de pastas e documentos</li>
          <li>Cópia de segurança com teste de restauração agendado</li>
          <li>Contas individuais e gerenciador para senhas compartilhadas</li>
          <li>Lista de quem autoriza acessos, alterações e compras</li>
          <li>Responsável administrativo definido para cada sistema contratado</li>
          <li>Proteção de energia nos equipamentos que não podem cair</li>
          <li>Calendário de manutenção mensal, trimestral e anual</li>
          <li>Plano de substituição das máquinas mais antigas</li>
        </ul>

        <h2>Por onde começar se estiver tudo desorganizado</h2>
        <p>Não tente resolver os dez itens ao mesmo tempo. Faça o inventário na primeira semana, resolva a cópia de segurança na segunda, organize acessos na terceira e coloque a manutenção no calendário na quarta. Em um mês o escritório sai do modo urgência. O diagnóstico do ambiente e o acompanhamento contínuo estão descritos em <Link to="/empresa-de-ti-curitiba" className="text-accent">empresa de TI em Curitiba</Link>.</p>
      </>
    ),
  },

  "como-escolher-uma-workstation": {
    title: "Como escolher uma workstation: checklist de requisitos",
    excerpt: "Checklist prático para dimensionar uma estação de trabalho profissional: o que levantar antes de comprar peça.",
    date: "2026-08-06",
    readTime: "11 min",
    category: "Hardware",
    content: (
      <>
        <p className="lead">Workstation não é “o computador mais caro da loja”. É um conjunto dimensionado para uma carga de trabalho específica, que roda horas seguidas, com arquivos grandes e pouca tolerância a parada. Escolher errado custa dos dois lados: gastar demais em um componente que a aplicação não usa, ou economizar exatamente onde o trabalho trava.</p>

        <h2>Resposta curta</h2>
        <p>Antes de escolher peça, levante o que roda, o tamanho dos arquivos, quantas aplicações ficam abertas ao mesmo tempo, quantos monitores e em que resolução, quanto tempo a máquina fica sob carga e quanto há disponível para investir. A configuração é consequência desse levantamento — nunca o contrário.</p>

        <h2>Checklist de requisitos</h2>
        <ul>
          <li>Programas efetivamente utilizados no dia a dia, com versão</li>
          <li>Requisitos oficiais publicados pelo fabricante de cada programa</li>
          <li>Tamanho típico dos arquivos e dos projetos abertos</li>
          <li>Quantidade de aplicações simultâneas em um dia comum</li>
          <li>Quantidade de monitores e resolução de cada um</li>
          <li>Tempo diário sob carga contínua</li>
          <li>Volume de armazenamento para sistema, projetos e cache</li>
          <li>Necessidade de expansão nos próximos dois a três anos</li>
          <li>Vida útil esperada da máquina</li>
          <li>Compatibilidade com o que já existe no ambiente</li>
          <li>Rotina de cópia de segurança dos projetos</li>
          <li>Faixa de investimento disponível</li>
        </ul>

        <h2>O papel real de cada componente</h2>
        <h3>Processador</h3>
        <p>Relaciona-se ao tipo e à duração da carga. Tarefas longas e contínuas — exportação, compilação, processamento em lote — pedem um conjunto diferente de tarefas curtas e intercaladas. Contagem alta de núcleos ajuda quando o programa distribui o trabalho; quando não distribui, o ganho é bem menor do que a diferença de preço sugere.</p>
        <h3>Memória</h3>
        <p>Relaciona-se ao volume dos projetos e à quantidade de aplicações abertas ao mesmo tempo. Memória insuficiente é o gargalo mais comum e o mais fácil de identificar: a máquina começa bem e degrada conforme o dia avança. Deixar espaço para expansão futura costuma valer mais do que preencher todos os encaixes na compra inicial.</p>
        <h3>Placa de vídeo</h3>
        <p>Só é decisiva quando a aplicação usa aceleração gráfica compatível. Muita carga profissional depende mais de processador, memória e armazenamento do que de uma placa cara. Verifique nos requisitos oficiais do programa se a aceleração existe e qual tipo é suportado antes de investir nesse componente.</p>
        <h3>Armazenamento</h3>
        <p>Dimensione três coisas separadas: sistema e programas, projetos ativos e arquivos de cache. Trabalhar direto em unidade quase cheia degrada o desempenho e aumenta o risco. Reserve também espaço para a rotina de cópia — a estação não substitui a cópia de segurança.</p>
        <h3>Fonte e refrigeração</h3>
        <p>Devem ser compatíveis com o conjunto e com a carga prevista, não com o pico de um teste rápido. Máquina que trabalha horas seguidas depende de dissipação estável. Fonte subdimensionada é causa frequente de desligamento sob carga e de instabilidade difícil de diagnosticar.</p>

        <h2>Limites operacionais: o que nenhuma montagem garante</h2>
        <p>Este é o ponto que quase nenhuma loja diz em voz alta: <strong>a montagem correta não garante desempenho específico dentro de um programa</strong>. Desempenho depende da versão do software, do tipo de projeto, dos plugins usados, do formato dos arquivos e das próprias limitações da aplicação. Configuração dimensionada reduz gargalos — não promete número.</p>
        <p>Por isso, desconfie de promessa de quadros por segundo, de tempo de renderização, de resultado de teste comparativo sem medição na sua própria máquina e de selo de homologação que o fabricante do software não publica. Quando o desempenho é crítico, o caminho honesto é testar com um projeto real antes de padronizar a compra para a equipe.</p>

        <h2>Comprar pronta, montar sob medida ou fazer melhoria</h2>
        <p>Máquina pronta de fabricante traz garantia unificada e menos decisões, com menos flexibilidade de peça. Montagem sob medida permite dimensionar cada componente para a carga e planejar expansão, exigindo critério na escolha. Melhoria de uma máquina existente costuma ser a melhor relação custo-benefício quando o gargalo é isolado — memória insuficiente ou armazenamento lento — e o restante do conjunto ainda atende.</p>
        <p>Quando o gargalo é isolado, a intervenção pontual está descrita em <Link to="/servicos/upgrade-ssd-ram" className="text-accent">upgrade de SSD e memória</Link>. Os tipos de equipamento avaliados estão em <Link to="/equipamentos-atendidos" className="text-accent">equipamentos atendidos</Link>, e as condições de execução em <Link to="/precos-e-politicas" className="text-accent">preços e políticas</Link>.</p>
        <p>Antes de decidir, vale medir onde o trabalho realmente trava hoje. Trocar tudo por causa de um gargalo pontual é o erro mais caro dessa categoria. Os critérios de peças, garantia e execução estão em <Link to="/servicos/montagem-de-pc" className="text-accent">montagem de PC</Link> e em <Link to="/politica-de-pecas-do-cliente" className="text-accent">política de peças do cliente</Link>.</p>

        <h2>A estação dentro do ambiente da empresa</h2>
        <p>Estação nova raramente vive isolada: entra numa rede, imprime, guarda arquivos, depende de acesso a sistemas e precisa de rotina de cópia. Planeje a entrada da máquina no ambiente junto com a compra — perfil de usuário, permissões, acesso aos arquivos compartilhados e inclusão na rotina de manutenção. Esse acompanhamento é descrito em <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">suporte técnico empresarial</Link>. A rotina de cópia dos projetos da equipe é tratada em <Link to="/servicos/backup-para-empresas" className="text-accent">backup para empresas</Link>.</p>

        <h2>Erros mais comuns na escolha</h2>
        <ul>
          <li>Copiar configuração pronta da internet sem checar os requisitos do próprio programa</li>
          <li>Investir em placa de vídeo cara para aplicação que não usa aceleração</li>
          <li>Economizar em memória e comprometer todo o conjunto</li>
          <li>Ignorar o espaço necessário para cache e projetos ativos</li>
          <li>Escolher fonte pelo preço, sem considerar a carga contínua</li>
          <li>Não prever expansão e travar a máquina no primeiro upgrade</li>
          <li>Tratar a estação como cópia de segurança dos projetos</li>
        </ul>

        <h2>Como conduzir a decisão</h2>
        <p>Levante os requisitos, confronte com os requisitos oficiais das aplicações, defina a faixa de investimento, dimensione o conjunto a partir do gargalo real e só então escolha as peças. Se o uso for crítico, teste com um projeto verdadeiro antes de repetir a configuração para a equipe inteira. Uma decisão documentada hoje evita a discussão de “por que essa máquina não dá conta” daqui a seis meses.</p>
      </>
    ),
  },

  "linux-vs-windows-diferencas-qual-escolher": {
    title: "Linux vs Windows: Diferenças Reais e Qual Escolher em 2026",
    excerpt: "Comparativo técnico completo entre Linux e Windows.",
    date: "2026-04-13",
    readTime: "14 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">A eterna batalha entre Linux e Windows não é sobre qual é "melhor" — é sobre <strong>qual é melhor para o seu caso</strong>. Neste comparativo técnico, analisamos desempenho, segurança, compatibilidade, custo e facilidade de uso para ajudá-lo a decidir.</p>

        <h2>O Que é Linux, Afinal?</h2>
        <p>Linux não é um sistema operacional único — é um <strong>kernel</strong> (núcleo) sobre o qual centenas de distribuições foram criadas. Ubuntu, Mint, Fedora, Debian, Arch — todas usam o kernel Linux, mas oferecem experiências diferentes. É como dizer que "Android é Linux" — tecnicamente correto, mas a experiência é completamente diferente de um desktop Ubuntu.</p>

        <h2>Desempenho: Linux Leva Vantagem</h2>
        <p>Em hardware idêntico, o Linux geralmente é mais rápido que o Windows. Motivos:</p>
        <ul>
          <li><strong>Menos processos em segundo plano</strong> — o Windows roda dezenas de serviços de telemetria, Cortana, indexação, etc.</li>
          <li><strong>Menos consumo de RAM</strong> — Ubuntu com GNOME usa ~1.2 GB de RAM; Windows 11 usa ~3-4 GB em repouso</li>
          <li><strong>Melhor gerenciamento de I/O</strong> — o sistema de arquivos ext4/btrfs é mais eficiente que NTFS para leitura/escrita intensiva</li>
          <li><strong>Sem antivírus pesado</strong> — o modelo de segurança do Linux dispensa antivírus na maioria dos cenários</li>
        </ul>
        <p>Para PCs antigos, a diferença é brutal: um Celeron com 2 GB de RAM roda Lubuntu fluentemente, mas mal consegue iniciar o Windows 10.</p>

        <h2>Segurança: Linux é Mais Seguro (Mas Não Invulnerável)</h2>
        <p>O modelo de permissões do Linux é mais robusto por design:</p>
        <ul>
          <li>Usuário comum <strong>nunca tem acesso root</strong> por padrão</li>
          <li>Instalação de software via repositórios oficiais verificados</li>
          <li>Menos de 1% dos malwares no mundo são feitos para Linux desktop</li>
          <li>Atualizações de segurança geralmente são mais rápidas no ecossistema open-source</li>
        </ul>
        <p>No entanto, servidores Linux são alvos frequentes. A segurança depende sempre de configuração adequada.</p>

        <h2>Compatibilidade de Software</h2>
        <p>Aqui o Windows ainda domina:</p>
        <ul>
          <li><strong>Jogos:</strong> Steam Proton melhorou muito, mas nem todos os títulos AAA rodam perfeitamente no Linux</li>
          <li><strong>Adobe Suite:</strong> Photoshop, Premiere, Illustrator — não há versão nativa para Linux. Alternativas como GIMP e DaVinci Resolve existem, mas a curva de aprendizado é real</li>
          <li><strong>Microsoft Office:</strong> LibreOffice é compatível, mas formatação avançada pode quebrar. Office 365 Web funciona em qualquer navegador</li>
          <li><strong>Drivers:</strong> impressoras e periféricos nem sempre têm driver Linux. Antes de migrar, verifique compatibilidade</li>
        </ul>

        <h2>Custo: Linux é Gratuito</h2>
        <p>Uma licença do Windows 11 Pro custa R$ 1.099 (preço oficial). O Linux é <strong>100% gratuito</strong> — sistema, atualizações e a maioria dos softwares. Para empresas com dezenas de máquinas, a economia é significativa.</p>

        <h2>Facilidade de Uso em 2026</h2>
        <p>O mito de que "Linux é difícil" está desatualizado. Distribuições como <strong>Linux Mint</strong> e <strong>Ubuntu</strong> oferecem experiência tão intuitiva quanto o Windows. A instalação leva 15 minutos, o gerenciador de software é uma "loja de apps" e a maioria das tarefas não exige terminal.</p>

        <h2>Tabela Comparativa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Critério</th><th className="text-left p-2 border-b">Windows</th><th className="text-left p-2 border-b">Linux</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Custo</td><td className="p-2 border-b">R$ 1.099+</td><td className="p-2 border-b">Gratuito</td></tr>
              <tr><td className="p-2 border-b">Desempenho</td><td className="p-2 border-b">Bom</td><td className="p-2 border-b">Excelente</td></tr>
              <tr><td className="p-2 border-b">Segurança</td><td className="p-2 border-b">Requer antivírus</td><td className="p-2 border-b">Nativo robusto</td></tr>
              <tr><td className="p-2 border-b">Jogos</td><td className="p-2 border-b">Excelente</td><td className="p-2 border-b">Bom (Proton)</td></tr>
              <tr><td className="p-2 border-b">Software profissional</td><td className="p-2 border-b">Excelente</td><td className="p-2 border-b">Limitado</td></tr>
              <tr><td className="p-2 border-b">PC antigo</td><td className="p-2 border-b">Pesado</td><td className="p-2 border-b">Ideal</td></tr>
              <tr><td className="p-2 border-b">Privacidade</td><td className="p-2 border-b">Telemetria ativa</td><td className="p-2 border-b">Total controle</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Quando Usar Windows?</h2>
        <ul>
          <li>Jogos AAA com anti-cheat (Valorant, Fortnite)</li>
          <li>Adobe Creative Suite</li>
          <li>Softwares empresariais específicos (SAP, AutoCAD)</li>
          <li>Usuários que não querem aprender nada novo</li>
        </ul>

        <h2>Quando Usar Linux?</h2>
        <ul>
          <li>Servidores e infraestrutura</li>
          <li>Desenvolvimento e programação</li>
          <li>PCs antigos que precisam "renascer"</li>
          <li>Quem prioriza privacidade e controle total</li>
          <li>Empresas que querem reduzir custos com licenças</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Instalar Linux ou Dual Boot?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico configura Linux, dual boot ou migração completa no seu computador. Atendemos em Curitiba e região metropolitana.</p>
        </div>
      </>
    ),
  },
  "comandos-linux-essenciais-iniciantes": {
    title: "50 Comandos Linux Essenciais Para Iniciantes e Técnicos",
    excerpt: "Guia definitivo de comandos do terminal.",
    date: "2026-04-13",
    readTime: "16 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O terminal do Linux pode parecer intimidador, mas dominar os comandos básicos transforma sua produtividade. Este guia reúne <strong>50 comandos essenciais</strong> organizados por categoria, com exemplos práticos.</p>

        <h2>Navegação e Arquivos</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`pwd          # Mostra o diretório atual
ls           # Lista arquivos e pastas
ls -la       # Lista com detalhes e ocultos
cd /caminho  # Navega para um diretório
cd ..        # Volta um nível
cd ~         # Vai para o home do usuário
mkdir pasta  # Cria diretório
rmdir pasta  # Remove diretório vazio
rm arquivo   # Remove arquivo
rm -rf pasta # Remove pasta e conteúdo (CUIDADO!)
cp orig dest # Copia arquivo
mv orig dest # Move ou renomeia
touch arq    # Cria arquivo vazio
cat arquivo  # Mostra conteúdo do arquivo
less arquivo # Mostra com paginação
head -n 20 arq # Primeiras 20 linhas
tail -f log  # Acompanha arquivo em tempo real`}</code></pre>

        <h2>Busca e Filtros</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`find / -name "*.log"        # Busca arquivos por nome
find . -size +100M          # Arquivos maiores que 100MB
grep "texto" arquivo        # Busca texto em arquivo
grep -r "texto" /pasta/     # Busca recursiva
grep -i "texto" arq         # Ignora maiúsculas
wc -l arquivo               # Conta linhas
sort arquivo                # Ordena conteúdo
uniq                        # Remove duplicatas
diff arq1 arq2              # Compara dois arquivos`}</code></pre>

        <h2>Permissões e Usuários</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`chmod 755 arquivo    # Define permissões (rwxr-xr-x)
chmod +x script.sh   # Torna executável
chown user:grupo arq # Altera dono do arquivo
sudo comando         # Executa como root
whoami               # Mostra usuário atual
id                   # Mostra UID, GID e grupos
passwd               # Altera senha
adduser nome         # Cria novo usuário
usermod -aG grupo user # Adiciona user ao grupo`}</code></pre>

        <h2>Processos e Sistema</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`ps aux           # Lista todos os processos
top              # Monitor em tempo real
htop             # Monitor interativo (instalar)
kill PID         # Encerra processo por PID
kill -9 PID      # Força encerramento
systemctl status serviço  # Status de serviço
systemctl restart serviço # Reinicia serviço
df -h            # Espaço em disco
du -sh /pasta    # Tamanho de uma pasta
free -h          # Uso de memória RAM
uname -a         # Info do kernel
uptime           # Tempo ligado`}</code></pre>

        <h2>Rede</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`ip a             # Mostra interfaces de rede
ping google.com  # Testa conectividade
curl url         # Faz requisição HTTP
wget url         # Baixa arquivo da web
ss -tulnp        # Portas em uso
traceroute host  # Rota até o destino
nslookup domínio # Consulta DNS
scp arq user@host:/path  # Copia via SSH
ssh user@host    # Acesso remoto seguro`}</code></pre>

        <h2>Compactação</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`tar -czf backup.tar.gz /pasta  # Compacta com gzip
tar -xzf backup.tar.gz        # Descompacta
zip -r backup.zip /pasta       # Compacta em ZIP
unzip backup.zip               # Descompacta ZIP`}</code></pre>

        <h2>Dicas de Produtividade no Terminal</h2>
        <ul>
          <li><strong>Tab</strong> — autocompleta comandos e caminhos</li>
          <li><strong>Ctrl+R</strong> — busca no histórico de comandos</li>
          <li><strong>!!</strong> — repete o último comando (útil: <code>sudo !!</code>)</li>
          <li><strong>Ctrl+C</strong> — cancela comando em execução</li>
          <li><strong>Ctrl+L</strong> — limpa a tela</li>
          <li><strong>comando1 | comando2</strong> — pipe: saída de um vira entrada do outro</li>
          <li><strong>comando &gt; arquivo</strong> — redireciona saída para arquivo</li>
          <li><strong>comando &gt;&gt; arquivo</strong> — adiciona ao final do arquivo</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda com Linux?</h3>
          <p className="text-muted-foreground mb-0">Instalamos, configuramos e damos suporte a Linux em Curitiba e região. De servidores a desktops.</p>
        </div>
      </>
    ),
  },
  "como-instalar-ubuntu-do-zero": {
    title: "Como Instalar Ubuntu do Zero: Guia Completo 2026",
    excerpt: "Passo a passo desde o pendrive bootável até a configuração pós-instalação.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O Ubuntu é a distribuição Linux mais popular do mundo — e por bons motivos. É gratuito, seguro, leve e fácil de usar. Este guia mostra <strong>como instalar o Ubuntu do zero</strong>, desde a criação do pendrive bootável até as configurações essenciais pós-instalação.</p>

        <h2>Requisitos Mínimos</h2>
        <ul>
          <li>Processador dual-core de 2 GHz ou superior</li>
          <li>4 GB de RAM (recomendado 8 GB)</li>
          <li>25 GB de espaço em disco (recomendado 50 GB)</li>
          <li>Pendrive USB de 4 GB ou mais</li>
          <li>Conexão com internet (recomendado)</li>
        </ul>

        <h2>Passo 1: Baixar a ISO do Ubuntu</h2>
        <p>Acesse <strong>ubuntu.com/download</strong> e baixe a versão LTS mais recente (Ubuntu 24.04 LTS). A versão LTS tem suporte de 5 anos — ideal para estabilidade.</p>

        <h2>Passo 2: Criar Pendrive Bootável</h2>
        <p>No Windows, use o <strong>Rufus</strong> (gratuito):</p>
        <ol>
          <li>Baixe e abra o Rufus</li>
          <li>Selecione o pendrive USB</li>
          <li>Em "Seleção de Boot", escolha a ISO do Ubuntu</li>
          <li>Partição: GPT (para UEFI) ou MBR (para BIOS legado)</li>
          <li>Clique em "Iniciar" e aguarde</li>
        </ol>

        <h2>Passo 3: Configurar Boot pelo Pendrive</h2>
        <p>Reinicie o computador e acesse o menu de boot:</p>
        <ul>
          <li><strong>Dell/Lenovo:</strong> F12</li>
          <li><strong>HP:</strong> F9</li>
          <li><strong>ASUS/Acer:</strong> F2 ou ESC</li>
          <li><strong>MSI:</strong> F11</li>
        </ul>
        <p>Selecione o pendrive USB na lista de dispositivos de boot.</p>

        <h2>Passo 4: Instalação</h2>
        <ol>
          <li>Selecione "Instalar Ubuntu" (não "Experimentar")</li>
          <li>Escolha o idioma: <strong>Português do Brasil</strong></li>
          <li>Marque "Instalar software de terceiros" (codecs, drivers Wi-Fi)</li>
          <li>Tipo de instalação: "Apagar disco e instalar Ubuntu" (para instalação limpa)</li>
          <li>Selecione fuso horário: <strong>São Paulo</strong></li>
          <li>Crie seu usuário e senha</li>
          <li>Aguarde a instalação (10-20 minutos)</li>
          <li>Reinicie e remova o pendrive quando solicitado</li>
        </ol>

        <h2>Passo 5: Configurações Pós-Instalação</h2>
        <p>Após o primeiro boot, execute no terminal:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Atualizar tudo
sudo apt update && sudo apt upgrade -y

# Instalar codecs multimídia
sudo apt install ubuntu-restricted-extras -y

# Instalar ferramentas essenciais
sudo apt install git curl wget htop neofetch -y

# Instalar navegador alternativo (ex: Chrome)
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# Instalar Flatpak (mais apps)
sudo apt install flatpak gnome-software-plugin-flatpak -y
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`}</code></pre>

        <h2>Softwares Essenciais Para Instalar</h2>
        <ul>
          <li><strong>LibreOffice</strong> — já vem instalado (equivalente ao Office)</li>
          <li><strong>VLC</strong> — player de mídia universal</li>
          <li><strong>GIMP</strong> — editor de imagens (alternativa ao Photoshop)</li>
          <li><strong>Visual Studio Code</strong> — editor de código</li>
          <li><strong>Timeshift</strong> — backup/restauração do sistema</li>
          <li><strong>Flameshot</strong> — captura de tela avançada</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Instalação Profissional de Linux</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico instala Ubuntu, Mint ou qualquer distribuição no seu computador com todos os drivers e softwares configurados. Atendemos em Curitiba e região.</p>
        </div>
      </>
    ),
  },
  "distribuicoes-linux-qual-melhor-para-voce": {
    title: "Distribuições Linux: Qual a Melhor Para Você?",
    excerpt: "Comparativo entre as principais distros.",
    date: "2026-04-13",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Existem centenas de distribuições Linux, mas <strong>5-6 dominam o mercado desktop</strong>. Cada uma tem um foco diferente. Veja qual combina com seu perfil.</p>

        <h2>Ubuntu — O Mais Popular</h2>
        <p><strong>Para quem:</strong> iniciantes, escritório, uso geral.</p>
        <ul>
          <li>Interface GNOME moderna e polida</li>
          <li>Maior comunidade e mais tutoriais em português</li>
          <li>Loja de apps com milhares de opções</li>
          <li>Versão LTS com 5 anos de suporte</li>
          <li><strong>Requisitos:</strong> 4 GB RAM, 25 GB disco</li>
        </ul>

        <h2>Linux Mint — O Mais Parecido com Windows</h2>
        <p><strong>Para quem:</strong> quem vem do Windows e quer transição suave.</p>
        <ul>
          <li>Interface Cinnamon: barra de tarefas, menu Iniciar, desktop familiar</li>
          <li>Tudo funciona "out of the box" (codecs, drivers)</li>
          <li>Baseado no Ubuntu, mas sem as polêmicas (Snap)</li>
          <li><strong>Requisitos:</strong> 2 GB RAM, 20 GB disco</li>
        </ul>

        <h2>Fedora — O Mais Atualizado</h2>
        <p><strong>Para quem:</strong> desenvolvedores e entusiastas.</p>
        <ul>
          <li>Sempre com as versões mais recentes do kernel e GNOME</li>
          <li>Patrocinado pela Red Hat (líder em servidores)</li>
          <li>Excelente para desenvolvimento de software</li>
          <li><strong>Requisitos:</strong> 4 GB RAM, 20 GB disco</li>
        </ul>

        <h2>Debian — O Mais Estável</h2>
        <p><strong>Para quem:</strong> servidores e quem prioriza estabilidade absoluta.</p>
        <ul>
          <li>Base do Ubuntu e dezenas de outras distros</li>
          <li>Testes rigorosos antes de cada release</li>
          <li>Ideal para servidores que não podem falhar</li>
          <li><strong>Requisitos:</strong> 1 GB RAM, 10 GB disco</li>
        </ul>

        <h2>Arch Linux — Para Avançados</h2>
        <p><strong>Para quem:</strong> quem quer controle total e aprender Linux a fundo.</p>
        <ul>
          <li>Instalação manual via terminal (sem interface gráfica por padrão)</li>
          <li>Rolling release: sempre na última versão</li>
          <li>AUR: o maior repositório de pacotes do mundo Linux</li>
          <li>Documentação (Arch Wiki) considerada a melhor da comunidade Linux</li>
        </ul>

        <h2>Tabela Comparativa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Distro</th><th className="text-left p-2 border-b">Nível</th><th className="text-left p-2 border-b">RAM Mín.</th><th className="text-left p-2 border-b">Melhor Para</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Ubuntu</td><td className="p-2 border-b">Iniciante</td><td className="p-2 border-b">4 GB</td><td className="p-2 border-b">Uso geral</td></tr>
              <tr><td className="p-2 border-b">Mint</td><td className="p-2 border-b">Iniciante</td><td className="p-2 border-b">2 GB</td><td className="p-2 border-b">Ex-Windows</td></tr>
              <tr><td className="p-2 border-b">Fedora</td><td className="p-2 border-b">Intermediário</td><td className="p-2 border-b">4 GB</td><td className="p-2 border-b">Desenvolvimento</td></tr>
              <tr><td className="p-2 border-b">Debian</td><td className="p-2 border-b">Intermediário</td><td className="p-2 border-b">1 GB</td><td className="p-2 border-b">Servidores</td></tr>
              <tr><td className="p-2 border-b">Arch</td><td className="p-2 border-b">Avançado</td><td className="p-2 border-b">512 MB</td><td className="p-2 border-b">Controle total</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Não Sabe Qual Escolher?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico avalia seu hardware e necessidades para recomendar e instalar a melhor distribuição. Atendemos em Curitiba e região.</p>
        </div>
      </>
    ),
  },
  "trocar-windows-por-linux-vale-a-pena": {
    title: "Trocar o Windows Por Linux: Vale a Pena?",
    excerpt: "O que funciona, o que não funciona e como migrar.",
    date: "2026-04-13",
    readTime: "10 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Você está cansado de lentidão, vírus e atualizações finformadas do Windows? A migração para Linux pode ser a solução — mas <strong>não é para todos</strong>. Veja quando vale a pena e como fazer a transição.</p>

        <h2>Quando Vale a Pena Trocar</h2>
        <ul>
          <li><strong>PC antigo/lento</strong> — Linux roda bem em máquinas com 2 GB de RAM</li>
          <li><strong>Uso básico</strong> — internet, e-mail, documentos, vídeos</li>
          <li><strong>Desenvolvimento</strong> — terminal nativo, Docker sem WSL, melhor para programação</li>
          <li><strong>Privacidade</strong> — sem telemetria, sem conta Microsoft obrigatória</li>
          <li><strong>Economia</strong> — sem custo de licença</li>
        </ul>

        <h2>Quando NÃO Vale a Pena</h2>
        <ul>
          <li><strong>Jogos competitivos</strong> — Valorant, Fortnite e outros com anti-cheat não rodam</li>
          <li><strong>Adobe</strong> — sem Photoshop, Premiere, After Effects nativos</li>
          <li><strong>Software específico</strong> — AutoCAD, SAP, softwares contábeis brasileiros</li>
          <li><strong>Impressoras/scanners antigos</strong> — alguns não têm driver Linux</li>
        </ul>

        <h2>Alternativa: Dual Boot</h2>
        <p>Não precisa escolher um ou outro. O <strong>dual boot</strong> permite ter Windows e Linux no mesmo computador. Ao ligar, você escolhe qual sistema iniciar. Assim, você pode usar Linux no dia a dia e Windows quando precisar de um software específico.</p>

        <h2>Equivalências de Software</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Windows</th><th className="text-left p-2 border-b">Linux</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Microsoft Office</td><td className="p-2 border-b">LibreOffice / OnlyOffice</td></tr>
              <tr><td className="p-2 border-b">Photoshop</td><td className="p-2 border-b">GIMP / Krita</td></tr>
              <tr><td className="p-2 border-b">Premiere</td><td className="p-2 border-b">DaVinci Resolve / Kdenlive</td></tr>
              <tr><td className="p-2 border-b">Outlook</td><td className="p-2 border-b">Thunderbird / Evolution</td></tr>
              <tr><td className="p-2 border-b">Notepad++</td><td className="p-2 border-b">VS Code / Kate</td></tr>
              <tr><td className="p-2 border-b">WinRAR</td><td className="p-2 border-b">File Roller (nativo)</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Passo a Passo da Migração</h2>
        <ol>
          <li><strong>Faça backup</strong> de todos os seus arquivos (HD externo ou nuvem)</li>
          <li><strong>Liste</strong> todos os programas que você usa e verifique equivalentes</li>
          <li><strong>Teste antes</strong> — rode o Ubuntu pelo pendrive (Live USB) sem instalar</li>
          <li><strong>Instale em dual boot</strong> para período de adaptação</li>
          <li>Após 30 dias confortável, <strong>remova o Windows</strong> se quiser</li>
        </ol>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Migração Assistida</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico faz backup dos seus dados, instala Linux, configura dual boot e transfere seus arquivos. Sem risco de perder nada.</p>
        </div>
      </>
    ),
  },
  "linux-para-pc-antigo-leve-rapido": {
    title: "Linux Para PC Antigo: 5 Distros Leves Que Ressuscitam Seu Computador",
    excerpt: "Distros leves para máquinas com pouca RAM.",
    date: "2026-04-13",
    readTime: "9 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Seu computador antigo está jogado no canto porque "não roda mais nada"? Antes de jogá-lo fora, experimente <strong>instalar Linux</strong>. Com a distribuição certa, máquinas com 1-2 GB de RAM voltam a funcionar perfeitamente para tarefas do dia a dia.</p>

        <h2>1. Lubuntu — O Ubuntu Ultraleve</h2>
        <ul>
          <li><strong>Interface:</strong> LXQt (leve e funcional)</li>
          <li><strong>RAM mínima:</strong> 1 GB (recomendado 2 GB)</li>
          <li><strong>Disco mínimo:</strong> 8 GB</li>
          <li>Baseado no Ubuntu — mesmos repositórios e suporte</li>
          <li>Ideal para netbooks e PCs com Celeron/Atom</li>
        </ul>

        <h2>2. Linux Lite — Feito Para Ex-Usuários Windows</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce customizada (parece Windows)</li>
          <li><strong>RAM mínima:</strong> 1 GB (recomendado 2 GB)</li>
          <li>Já vem com Chrome, LibreOffice e VLC</li>
          <li>Atualizações simples com interface gráfica</li>
          <li>Documentação toda em linguagem acessível</li>
        </ul>

        <h2>3. Xubuntu — Equilíbrio Perfeito</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce (leve mas bonita)</li>
          <li><strong>RAM mínima:</strong> 1.5 GB (recomendado 2 GB)</li>
          <li>Mais bonito que Lubuntu, mais leve que Ubuntu</li>
          <li>Excelente para escritório e navegação</li>
        </ul>

        <h2>4. Peppermint OS — Focado em Web Apps</h2>
        <ul>
          <li><strong>Interface:</strong> Xfce com integração web</li>
          <li><strong>RAM mínima:</strong> 1 GB</li>
          <li>Transforma sites em "apps" (Gmail, Google Docs, etc.)</li>
          <li>Ideal para quem usa tudo no navegador</li>
        </ul>

        <h2>5. antiX — O Mais Leve de Todos</h2>
        <ul>
          <li><strong>Interface:</strong> IceWM / Fluxbox</li>
          <li><strong>RAM mínima:</strong> 256 MB (!)</li>
          <li><strong>Disco mínimo:</strong> 3 GB</li>
          <li>Roda em Pentium III e Pentium 4</li>
          <li>Interface minimalista, mas totalmente funcional</li>
        </ul>

        <h2>Comparativo de Consumo de RAM</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Sistema</th><th className="text-left p-2 border-b">RAM em Repouso</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Windows 11</td><td className="p-2 border-b">3.5 - 4.5 GB</td></tr>
              <tr><td className="p-2 border-b">Windows 10</td><td className="p-2 border-b">2.5 - 3.5 GB</td></tr>
              <tr><td className="p-2 border-b">Ubuntu (GNOME)</td><td className="p-2 border-b">1.2 - 1.8 GB</td></tr>
              <tr><td className="p-2 border-b">Xubuntu (Xfce)</td><td className="p-2 border-b">600 - 900 MB</td></tr>
              <tr><td className="p-2 border-b">Lubuntu (LXQt)</td><td className="p-2 border-b">400 - 600 MB</td></tr>
              <tr><td className="p-2 border-b">antiX (IceWM)</td><td className="p-2 border-b">150 - 250 MB</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Ressuscite Seu PC Antigo</h3>
          <p className="text-muted-foreground mb-0">Instalamos a melhor distro Linux para o seu hardware antigo. Seu computador volta a funcionar sem gastar com equipamento novo.</p>
        </div>
      </>
    ),
  },
  "como-configurar-servidor-web-apache-nginx-linux": {
    title: "Como Configurar Servidor Web Apache e Nginx no Linux: Guia Completo",
    excerpt: "Passo a passo para instalar e configurar Apache e Nginx no Ubuntu/Debian e CentOS/Fedora.",
    date: "2026-04-13",
    readTime: "15 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Hospedar sites e aplicações web no Linux é uma das tarefas mais comuns para administradores de sistemas. Neste guia, cobrimos <strong>Apache e Nginx</strong> — os dois servidores web mais usados no mundo — com instalação, configuração, virtual hosts, SSL e otimização de performance.</p>

        <h2>Apache vs Nginx: Qual Escolher?</h2>
        <p>Ambos são excelentes, mas têm perfis diferentes:</p>
        <ul>
          <li><strong>Apache:</strong> Mais antigo, altamente configurável via .htaccess, ideal para hospedagem compartilhada e aplicações PHP tradicionais (WordPress, Laravel)</li>
          <li><strong>Nginx:</strong> Mais leve, orientado a eventos, excelente como proxy reverso e para servir conteúdo estático. Usado por Netflix, Cloudflare e WordPress.com</li>
          <li><strong>Recomendação:</strong> para sites PHP simples, Apache. Para alta performance e proxy reverso, Nginx. Para o melhor dos dois mundos, Nginx como proxy + Apache como backend</li>
        </ul>

        <h2>Instalando Apache no Ubuntu/Debian</h2>
        <pre><code>{`sudo apt update
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo systemctl start apache2

# Verificar status
sudo systemctl status apache2

# Testar no navegador: http://IP-DO-SERVIDOR
# Deve aparecer a página padrão do Apache`}</code></pre>

        <h2>Configurando Virtual Hosts no Apache</h2>
        <p>Virtual Hosts permitem hospedar múltiplos sites no mesmo servidor:</p>
        <pre><code>{`# Criar diretório do site
sudo mkdir -p /var/www/meusite.com.br/html
sudo chown -R $USER:$USER /var/www/meusite.com.br

# Criar arquivo de configuração
sudo nano /etc/apache2/sites-available/meusite.com.br.conf`}</code></pre>
        <pre><code>{`<VirtualHost *:80>
    ServerName meusite.com.br
    ServerAlias www.meusite.com.br
    DocumentRoot /var/www/meusite.com.br/html
    ErrorLog \${APACHE_LOG_DIR}/meusite-error.log
    CustomLog \${APACHE_LOG_DIR}/meusite-access.log combined
    
    <Directory /var/www/meusite.com.br/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>`}</code></pre>
        <pre><code>{`# Ativar o site e desativar o padrão
sudo a2ensite meusite.com.br.conf
sudo a2dissite 000-default.conf
sudo a2enmod rewrite
sudo systemctl reload apache2`}</code></pre>

        <h2>Instalando Nginx no Ubuntu/Debian</h2>
        <pre><code>{`sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Verificar: http://IP-DO-SERVIDOR
# Página "Welcome to nginx!" deve aparecer`}</code></pre>

        <h2>Configurando Server Blocks no Nginx</h2>
        <pre><code>{`sudo mkdir -p /var/www/meusite.com.br/html
sudo nano /etc/nginx/sites-available/meusite.com.br`}</code></pre>
        <pre><code>{`server {
    listen 80;
    server_name meusite.com.br www.meusite.com.br;
    root /var/www/meusite.com.br/html;
    index index.html index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    # Para PHP (com php-fpm)
    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }

    # Bloquear acesso a .htaccess
    location ~ /\\.ht {
        deny all;
    }
}`}</code></pre>
        <pre><code>{`sudo ln -s /etc/nginx/sites-available/meusite.com.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`}</code></pre>

        <h2>SSL Gratuito com Let's Encrypt</h2>
        <pre><code>{`# Instalar Certbot
sudo apt install certbot python3-certbot-apache -y  # Para Apache
sudo apt install certbot python3-certbot-nginx -y   # Para Nginx

# Gerar certificado
sudo certbot --apache -d meusite.com.br -d www.meusite.com.br
# ou
sudo certbot --nginx -d meusite.com.br -d www.meusite.com.br

# Renovação automática (já configurada via cron/timer)
sudo certbot renew --dry-run`}</code></pre>

        <h2>Nginx como Proxy Reverso (Node.js, Python, etc.)</h2>
        <pre><code>{`server {
    listen 80;
    server_name app.meusite.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}`}</code></pre>

        <h2>Otimização de Performance</h2>
        <ul>
          <li><strong>Gzip:</strong> comprima respostas para reduzir tráfego em 60-80%</li>
          <li><strong>Cache de arquivos estáticos:</strong> configure headers Expires e Cache-Control</li>
          <li><strong>Worker processes (Nginx):</strong> ajuste para o número de cores da CPU</li>
          <li><strong>KeepAlive:</strong> mantenha conexões abertas para múltiplas requisições</li>
          <li><strong>HTTP/2:</strong> ative para multiplexação e melhor performance</li>
        </ul>

        <h2>Segurança Essencial</h2>
        <ul>
          <li>Desabilite listagem de diretórios (<code>Options -Indexes</code> no Apache)</li>
          <li>Oculte a versão do servidor (<code>ServerTokens Prod</code> / <code>server_tokens off</code>)</li>
          <li>Configure headers de segurança: X-Frame-Options, X-Content-Type-Options, CSP</li>
          <li>Use fail2ban para proteger contra brute-force</li>
          <li>Mantenha tudo atualizado: <code>sudo apt update && sudo apt upgrade</code></li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa Configurar um Servidor Web?</h3>
          <p className="text-muted-foreground mb-0">Configuramos servidores Apache e Nginx para empresas em Curitiba e região. Desde a instalação até SSL, proxy reverso e otimização de performance.</p>
        </div>
      </>
    ),
  },
  "como-gerenciar-pacotes-apt-dnf-linux": {
    title: "Como Gerenciar Pacotes no Linux com APT e DNF: Guia Completo",
    excerpt: "Domine os gerenciadores de pacotes APT (Debian/Ubuntu) e DNF (Fedora/RHEL) com exemplos práticos.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">No Linux, instalar, atualizar e remover programas é feito pelo <strong>gerenciador de pacotes</strong>. Entender APT e DNF é fundamental para qualquer administrador Linux. Neste guia, cobrimos desde o básico até técnicas avançadas como pinning, repositórios de terceiros e resolução de dependências.</p>

        <h2>APT — Debian, Ubuntu, Mint e Derivados</h2>
        <p>O APT (Advanced Package Tool) é o gerenciador padrão das distribuições baseadas em Debian — as mais populares do mundo.</p>

        <h3>Comandos Essenciais do APT</h3>
        <pre><code>{`# Atualizar lista de pacotes disponíveis
sudo apt update

# Atualizar todos os pacotes instalados
sudo apt upgrade -y

# Atualização completa (inclui remoção de pacotes obsoletos)
sudo apt full-upgrade -y

# Instalar um pacote
sudo apt install nome-do-pacote -y

# Instalar múltiplos pacotes
sudo apt install nginx php mysql-server -y

# Remover pacote (mantém configs)
sudo apt remove nome-do-pacote

# Remover pacote + configurações
sudo apt purge nome-do-pacote

# Remover dependências órfãs
sudo apt autoremove -y

# Buscar pacotes
apt search "servidor web"

# Ver informações de um pacote
apt show nginx

# Listar pacotes instalados
apt list --installed

# Ver pacotes atualizáveis
apt list --upgradable`}</code></pre>

        <h3>Gerenciando Repositórios</h3>
        <pre><code>{`# Adicionar repositório PPA (Ubuntu)
sudo add-apt-repository ppa:ondrej/php
sudo apt update

# Adicionar repositório manualmente
echo "deb http://repo.exemplo.com/ubuntu jammy main" | sudo tee /etc/apt/sources.list.d/exemplo.list

# Adicionar chave GPG do repositório
curl -fsSL https://repo.exemplo.com/key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/exemplo.gpg

# Remover PPA
sudo add-apt-repository --remove ppa:ondrej/php`}</code></pre>

        <h3>APT Pinning — Prioridade de Versões</h3>
        <pre><code>{`# /etc/apt/preferences.d/firefox
Package: firefox
Pin: release a=jammy-security
Pin-Priority: 1000`}</code></pre>
        <p>O pinning permite favaliar o valor uma versão específica de um pacote, útil quando você precisa manter uma versão estável mesmo com repositórios mais novos adicionados.</p>

        <h2>DNF — Fedora, RHEL, CentOS Stream, AlmaLinux</h2>
        <p>O DNF (Dandified YUM) é o gerenciador padrão da família Red Hat — dominante em servidores corporativos.</p>

        <h3>Comandos Essenciais do DNF</h3>
        <pre><code>{`# Atualizar lista + instalar atualizações
sudo dnf upgrade -y

# Instalar pacote
sudo dnf install nginx -y

# Remover pacote
sudo dnf remove nginx

# Buscar pacotes
dnf search "servidor web"

# Ver informações
dnf info nginx

# Listar instalados
dnf list installed

# Ver histórico de transações
dnf history

# Desfazer última transação
sudo dnf history undo last

# Limpar cache
sudo dnf clean all

# Instalar grupo de pacotes
sudo dnf groupinstall "Development Tools"

# Listar grupos disponíveis
dnf grouplist`}</code></pre>

        <h3>Repositórios no DNF</h3>
        <pre><code>{`# Habilitar repositório EPEL (Enterprise Linux)
sudo dnf install epel-release -y

# Adicionar RPM Fusion (codecs e drivers)
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm

# Listar repositórios
dnf repolist

# Desabilitar um repositório temporariamente
sudo dnf --disablerepo=epel install pacote`}</code></pre>

        <h2>Comparativo APT vs DNF</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Ação</th><th className="text-left p-2 border-b">APT</th><th className="text-left p-2 border-b">DNF</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Atualizar lista</td><td className="p-2 border-b">apt update</td><td className="p-2 border-b">(automático)</td></tr>
              <tr><td className="p-2 border-b">Atualizar tudo</td><td className="p-2 border-b">apt upgrade</td><td className="p-2 border-b">dnf upgrade</td></tr>
              <tr><td className="p-2 border-b">Instalar</td><td className="p-2 border-b">apt install pkg</td><td className="p-2 border-b">dnf install pkg</td></tr>
              <tr><td className="p-2 border-b">Remover</td><td className="p-2 border-b">apt remove pkg</td><td className="p-2 border-b">dnf remove pkg</td></tr>
              <tr><td className="p-2 border-b">Buscar</td><td className="p-2 border-b">apt search</td><td className="p-2 border-b">dnf search</td></tr>
              <tr><td className="p-2 border-b">Desfazer</td><td className="p-2 border-b">❌</td><td className="p-2 border-b">dnf history undo</td></tr>
              <tr><td className="p-2 border-b">Formato</td><td className="p-2 border-b">.deb</td><td className="p-2 border-b">.rpm</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Flatpak e Snap — Alternativas Universais</h2>
        <p>Além de APT e DNF, existem formatos universais que funcionam em qualquer distro:</p>
        <ul>
          <li><strong>Flatpak:</strong> sandbox seguro, usado pelo GNOME Software. Ideal para apps desktop (Firefox, LibreOffice, VLC)</li>
          <li><strong>Snap:</strong> desenvolvido pela Canonical. Atualizações automáticas, mas mais pesado que Flatpak</li>
          <li><strong>AppImage:</strong> executável portátil sem instalação. Basta dar permissão e executar</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Suporte Linux Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Gerenciamos servidores Linux, configuramos repositórios e mantemos seus sistemas atualizados e seguros. Atendimento em Curitiba e região.</p>
        </div>
      </>
    ),
  },
  "como-configurar-ssh-seguro-linux": {
    title: "Como Configurar SSH Seguro no Linux: Guia Anti-Invasão",
    excerpt: "Hardening completo do SSH: chaves, fail2ban, porta customizada e autenticação de dois fatores.",
    date: "2026-04-13",
    readTime: "13 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O SSH (Secure Shell) é a porta de entrada para administrar servidores Linux remotamente — e também o alvo número 1 de atacantes. Neste guia, mostramos como configurar o SSH de forma <strong>realmente segura</strong>, com autenticação por chaves, fail2ban, porta customizada e MFA.</p>

        <h2>Por Que a Configuração Padrão do SSH é Insegura?</h2>
        <ul>
          <li>Porta 22 é escaneada automaticamente por bots 24/7</li>
          <li>Login por senha permite ataques de força bruta</li>
          <li>Root com acesso direto é um risco crítico</li>
          <li>Sem rate-limiting, um bot pode testar milhares de senhas por minuto</li>
        </ul>
        <p>Um servidor na internet sem hardening recebe <strong>centenas de tentativas de login por hora</strong>. Veja como se proteger:</p>

        <h2>Passo 1: Gerar Par de Chaves SSH</h2>
        <p>Autenticação por chaves é infinitamente mais segura que senhas:</p>
        <pre><code>{`# No seu computador local (não no servidor!)
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Vai gerar:
# ~/.ssh/id_ed25519       (chave privada - NUNCA compartilhe!)
# ~/.ssh/id_ed25519.pub   (chave pública - copie para o servidor)

# Copiar chave pública para o servidor
ssh-copy-id usuario@IP-DO-SERVIDOR

# Testar conexão com chave
ssh usuario@IP-DO-SERVIDOR
# Deve conectar sem pedir senha`}</code></pre>

        <h2>Passo 2: Hardening do sshd_config</h2>
        <pre><code>{`sudo nano /etc/ssh/sshd_config

# Altere as seguintes linhas:
Port 2222                          # Porta customizada (evita 99% dos bots)
PermitRootLogin no                 # Bloqueia login como root
PasswordAuthentication no          # Desabilita login por senha
PubkeyAuthentication yes           # Somente chaves SSH
MaxAuthTries 3                     # Máximo de tentativas
LoginGraceTime 30                  # Tempo máximo para autenticar
ClientAliveInterval 300            # Desconecta sessões ociosas
ClientAliveCountMax 2              # Após 2 pings sem resposta
AllowUsers seuusuario              # Somente usuários específicos
Protocol 2                         # Somente protocolo SSH2
X11Forwarding no                   # Desabilita X11 (desnecessário)
PermitEmptyPasswords no            # Bloqueia senhas vazias

# Reiniciar SSH (mantenha a sessão atual aberta!)
sudo systemctl restart sshd`}</code></pre>
        <p className="text-sm text-muted-foreground"><strong>⚠️ IMPORTANTE:</strong> Antes de reiniciar o SSH, abra uma segunda sessão SSH para testar. Se algo der errado, você ainda terá acesso pela sessão original.</p>

        <h2>Passo 3: Instalar fail2ban</h2>
        <p>O fail2ban monitora logs e bane IPs que tentam força bruta:</p>
        <pre><code>{`sudo apt install fail2ban -y  # Debian/Ubuntu
sudo dnf install fail2ban -y  # Fedora/RHEL

# Criar configuração local
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local`}</code></pre>
        <pre><code>{`[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600`}</code></pre>
        <pre><code>{`sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Ver IPs banidos
sudo fail2ban-client status sshd`}</code></pre>

        <h2>Passo 4: Firewall (UFW)</h2>
        <pre><code>{`# Permitir apenas a porta SSH customizada
sudo ufw allow 2222/tcp
sudo ufw enable

# Verificar regras
sudo ufw status verbose`}</code></pre>

        <h2>Passo 5: Autenticação de Dois Fatores (MFA)</h2>
        <pre><code>{`sudo apt install libpam-google-authenticator -y

# Configurar para seu usuário
google-authenticator
# Responda: y, y, y, n, y
# Escaneie o QR code com Google Authenticator ou Authy

# Editar PAM
sudo nano /etc/pam.d/sshd
# Adicionar no final:
auth required pam_google_authenticator.so

# Editar sshd_config
sudo nano /etc/ssh/sshd_config
# Alterar:
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive

sudo systemctl restart sshd`}</code></pre>

        <h2>Checklist de Segurança SSH</h2>
        <ul>
          <li>✅ Porta customizada (não 22)</li>
          <li>✅ Autenticação somente por chaves</li>
          <li>✅ Root login desabilitado</li>
          <li>✅ fail2ban ativo e configurado</li>
          <li>✅ Firewall permitindo apenas portas necessárias</li>
          <li>✅ MFA habilitado (para ambientes críticos)</li>
          <li>✅ Logs monitorados regularmente</li>
          <li>✅ Atualizações de segurança automáticas</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa Proteger Seu Servidor?</h3>
          <p className="text-muted-foreground mb-0">Fazemos hardening completo de servidores Linux: SSH, firewall, fail2ban, atualizações automáticas e monitoramento. Consultoria técnica em Curitiba e remoto.</p>
        </div>
      </>
    ),
  },
  "como-usar-docker-linux-guia-completo": {
    title: "Como Usar Docker no Linux: Guia Completo Para Iniciantes e Técnicos",
    excerpt: "Instalação, containers, Docker Compose, volumes, redes e boas práticas para ambientes de produção.",
    date: "2026-04-13",
    readTime: "16 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">O Docker revolucionou a forma como deployamos aplicações. Em vez de instalar tudo diretamente no servidor, você empacota a aplicação + dependências em um <strong>container</strong> isolado e portátil. Neste guia, cobrimos desde a instalação até Docker Compose para ambientes de produção.</p>

        <h2>O Que é Docker e Por Que Usar?</h2>
        <ul>
          <li><strong>Isolamento:</strong> cada container tem seu próprio sistema de arquivos, rede e processos</li>
          <li><strong>Portabilidade:</strong> "funciona na minha máquina" vira "funciona em qualquer lugar"</li>
          <li><strong>Reprodutibilidade:</strong> Dockerfile define exatamente o ambiente necessário</li>
          <li><strong>Eficiência:</strong> containers são mais leves que VMs — inicializam em segundos</li>
          <li><strong>Versionamento:</strong> imagens têm tags, permitindo rollback fácil</li>
        </ul>

        <h2>Instalando Docker no Ubuntu/Debian</h2>
        <pre><code>{`# Remover versões antigas
sudo apt remove docker docker-engine docker.io containerd runc

# Instalar dependências
sudo apt update
sudo apt install ca-certificates curl gnupg -y

# Adicionar repositório oficial Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Adicionar usuário ao grupo docker (evita sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalação
docker --version
docker run hello-world`}</code></pre>

        <h2>Instalando Docker no Fedora/RHEL</h2>
        <pre><code>{`sudo dnf install dnf-plugins-core -y
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER`}</code></pre>

        <h2>Comandos Essenciais do Docker</h2>
        <pre><code>{`# Baixar imagem
docker pull nginx:latest

# Listar imagens
docker images

# Rodar container
docker run -d --name meu-nginx -p 8080:80 nginx

# Listar containers rodando
docker ps

# Listar todos (incluindo parados)
docker ps -a

# Ver logs do container
docker logs meu-nginx

# Acessar terminal do container
docker exec -it meu-nginx bash

# Parar container
docker stop meu-nginx

# Remover container
docker rm meu-nginx

# Remover imagem
docker rmi nginx

# Limpar tudo não utilizado
docker system prune -a`}</code></pre>

        <h2>Criando Seu Próprio Dockerfile</h2>
        <pre><code>{`# Dockerfile para aplicação Node.js
FROM node:20-alpine

WORKDIR /app

# Copiar package.json primeiro (cache de camadas)
COPY package*.json ./
RUN npm ci --production

# Copiar código
COPY . .

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["node", "server.js"]`}</code></pre>
        <pre><code>{`# Buildar a imagem
docker build -t minha-app:1.0 .

# Rodar
docker run -d -p 3000:3000 --name app minha-app:1.0`}</code></pre>

        <h2>Docker Compose — Múltiplos Containers</h2>
        <p>Docker Compose orquestra múltiplos containers com um único arquivo:</p>
        <pre><code>{`# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./site:/usr/share/nginx/html
    depends_on:
      - app
    restart: unless-stopped

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    restart: unless-stopped

volumes:
  postgres_data:`}</code></pre>
        <pre><code>{`# Subir todos os serviços
docker compose up -d

# Ver status
docker compose ps

# Ver logs
docker compose logs -f

# Parar tudo
docker compose down

# Parar e remover volumes (⚠️ apaga dados)
docker compose down -v`}</code></pre>

        <h2>Volumes — Persistência de Dados</h2>
        <pre><code>{`# Volume nomeado (gerenciado pelo Docker)
docker run -d -v meus-dados:/var/lib/mysql mysql

# Bind mount (mapeamento direto)
docker run -d -v /home/user/site:/usr/share/nginx/html nginx

# Listar volumes
docker volume ls

# Inspecionar volume
docker volume inspect meus-dados`}</code></pre>

        <h2>Redes no Docker</h2>
        <pre><code>{`# Criar rede customizada
docker network create minha-rede

# Rodar containers na mesma rede
docker run -d --name app --network minha-rede minha-app
docker run -d --name db --network minha-rede postgres

# Containers na mesma rede se comunicam pelo nome!
# app pode acessar db via: postgresql://db:5432`}</code></pre>

        <h2>Boas Práticas Para Produção</h2>
        <ul>
          <li><strong>Use imagens Alpine:</strong> muito menores (5 MB vs 100+ MB)</li>
          <li><strong>Multi-stage build:</strong> compile em uma imagem, rode em outra menor</li>
          <li><strong>Não rode como root:</strong> use <code>USER</code> no Dockerfile</li>
          <li><strong>Limite recursos:</strong> <code>--memory=512m --cpus=1</code></li>
          <li><strong>Use .dockerignore:</strong> evite copiar node_modules, .git, etc.</li>
          <li><strong>Tags específicas:</strong> use <code>nginx:1.25-alpine</code> em vez de <code>nginx:latest</code></li>
          <li><strong>Health checks:</strong> configure <code>HEALTHCHECK</code> no Dockerfile</li>
          <li><strong>Logs centralizados:</strong> use driver de log do Docker ou ferramenta externa</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda com Docker?</h3>
          <p className="text-muted-foreground mb-0">Configuramos ambientes Docker para empresas em Curitiba: desde a instalação até orquestração com Compose, redes customizadas e deploy em produção.</p>
        </div>
      </>
    ),
  },
  "inteligencia-artificial-evolucao-historia": {
    title: "A Evolução da Inteligência Artificial: De Turing ao ChatGPT",
    excerpt: "Uma jornada pela história da IA.",
    date: "2026-04-13",
    readTime: "13 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A Inteligência Artificial não nasceu com o ChatGPT. São <strong>mais de 70 anos de pesquisa</strong>, desde os primeiros conceitos teóricos até os modelos generativos que transformam o mundo em 2026. Conheça essa história fascinante.</p>

        <h2>1950 — O Teste de Turing</h2>
        <p>Alan Turing publicou o artigo "Computing Machinery and Intelligence", propondo a pergunta: <strong>"As máquinas podem pensar?"</strong>. O Teste de Turing propõe que uma máquina é "inteligente" se um humano não conseguir distinguir suas respostas das de outro humano. Esse conceito guia a pesquisa em IA até hoje.</p>

        <h2>1956 — Nasce o Termo "Inteligência Artificial"</h2>
        <p>Na conferência de Dartmouth, John McCarthy cunhou oficialmente o termo. Pesquisadores acreditavam que em 20 anos teríamos máquinas tão inteligentes quanto humanos. Estavam otimistas demais — mas a semente foi plantada.</p>

        <h2>1960-1970 — Primeiros Sistemas Especialistas</h2>
        <p>Programas como ELIZA (1966) simulavam conversas terapêuticas. DENDRAL (1969) analisava estruturas moleculares. Eram sistemas baseados em regras — "se X, então Y" — sem aprendizado real.</p>

        <h2>1980-1990 — O Inverno da IA</h2>
        <p>Expectativas irreais levaram a cortes de financiamento. A IA ficou "adormecida" por quase duas décadas, com avanços lentos em redes neurais e processamento de linguagem natural.</p>

        <h2>1997 — Deep Blue Vence Kasparov</h2>
        <p>O computador da IBM derrotou o campeão mundial de xadrez Garry Kasparov. Não era IA no sentido moderno (era força bruta computacional), mas mostrou ao mundo que <strong>máquinas podiam superar humanos em tarefas complexas</strong>.</p>

        <h2>2012 — A Revolução do Deep Learning</h2>
        <p>A rede neural AlexNet venceu a competição ImageNet com precisão inédita. Isso inaugurou a era do <strong>deep learning</strong> — redes neurais profundas treinadas com grandes volumes de dados. GPU (placas de vídeo) se tornaram essenciais para treinar modelos.</p>

        <h2>2017 — Transformers Mudam Tudo</h2>
        <p>O artigo "Attention Is All You Need" do Google introduziu a arquitetura <strong>Transformer</strong>, base de todos os grandes modelos de linguagem atuais: GPT, BERT, LLaMA, Gemini. Essa arquitetura permitiu processar texto de forma paralela, acelerando o treinamento exponencialmente.</p>

        <h2>2022-2026 — A Era Generativa</h2>
        <ul>
          <li><strong>ChatGPT (2022)</strong> — democratizou o acesso à IA conversacional</li>
          <li><strong>GPT-4 (2023)</strong> — multimodal (texto + imagem), raciocínio avançado</li>
          <li><strong>Midjourney / DALL-E</strong> — geração de imagens por texto</li>
          <li><strong>GPT-5 (2025)</strong> — agentes autônomos, raciocínio longo</li>
          <li><strong>Gemini 2.5 (2026)</strong> — contexto de 1 milhão de tokens, multimodal nativo</li>
          <li><strong>IA em dispositivos</strong> — modelos rodando localmente em celulares e PCs</li>
        </ul>

        <h2>O Que Vem Pela Frente</h2>
        <p>A tendência aponta para <strong>agentes de IA</strong> que executam tarefas complexas de forma autônoma: navegar na web, escrever código, gerenciar e-mails. A IA está saindo do "responder perguntas" para "executar ações no mundo real".</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Usar IA no Seu Negócio?</h3>
          <p className="text-muted-foreground mb-0">Ajudamos empresas de Curitiba a implementar ferramentas de IA para produtividade, atendimento e automação.</p>
        </div>
      </>
    ),
  },
  "como-usar-ia-no-dia-a-dia-dicas-praticas": {
    title: "Como Usar IA no Dia a Dia: 15 Dicas Práticas Para Trabalho e Estudo",
    excerpt: "Dicas práticas de IA para o cotidiano.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A IA já não é coisa do futuro — é ferramenta do presente. <strong>Quem não usa, está ficando para trás.</strong> Veja 15 formas práticas de usar inteligência artificial no trabalho, nos estudos e no dia a dia.</p>

        <h2>No Trabalho</h2>
        <h3>1. Resumir Documentos Longos</h3>
        <p>Cole um PDF, relatório ou artigo no ChatGPT ou Gemini e peça: "Resuma este documento em 5 pontos principais". Economiza horas de leitura.</p>

        <h3>2. Escrever E-mails Profissionais</h3>
        <p>"Escreva um e-mail educado recusando uma proposta comercial, agradecendo o interesse." A IA ajusta tom, formalidade e estrutura.</p>

        <h3>3. Criar Planilhas e Fórmulas</h3>
        <p>"Crie uma fórmula Excel que calcule a comissão de 5% sobre vendas acima de R$ 10.000." Funciona com PROCV, SE, SOMASES e qualquer complexidade.</p>

        <h3>4. Analisar Dados</h3>
        <p>O ChatGPT com Code Interpreter analisa arquivos CSV, cria gráficos e identifica tendências. "Analise esta planilha de vendas e mostre os 3 melhores meses."</p>

        <h3>5. Automatizar Tarefas Repetitivas</h3>
        <p>Use o Microsoft Copilot no Word, Excel e PowerPoint para gerar conteúdo, formatar documentos e criar apresentações com um clique.</p>

        <h2>Nos Estudos</h2>
        <h3>6. Explicar Conceitos Difíceis</h3>
        <p>"Explique cálculo integral como se eu tivesse 15 anos." A IA adapta a explicação ao seu nível de conhecimento.</p>

        <h3>7. Criar Flashcards e Resumos</h3>
        <p>"Crie 20 flashcards sobre a Segunda Guerra Mundial para vestibular." Perfeito para revisão rápida.</p>

        <h3>8. Corrigir e Melhorar Textos</h3>
        <p>Cole sua redação e peça: "Corrija erros gramaticais, melhore a coesão e sugira vocabulário mais sofisticado."</p>

        <h3>9. Simular Entrevistas e Provas</h3>
        <p>"Faça 10 perguntas de entrevista para vaga de analista financeiro." Ou: "Crie uma prova de biologia sobre genética."</p>

        <h2>No Dia a Dia</h2>
        <h3>10. Planejar Viagens</h3>
        <p>"Monte um roteiro de 5 dias em Lisboa com valor do atendimento de R$ 5.000 incluindo passagens." A IA sugere voos, hotéis, restaurantes e pontos turísticos.</p>

        <h3>11. Receitas com o Que Tem na Geladeira</h3>
        <p>"Tenho frango, batata, cebola e creme de leite. Qual receita posso fazer?" Personalizado e instantâneo.</p>

        <h3>12. Tradução Contextual</h3>
        <p>Muito superior ao Google Tradutor para textos longos. A IA entende contexto, gírias e expressões idiomáticas.</p>

        <h3>13. Gerar Imagens</h3>
        <p>DALL-E, Midjourney e Gemini geram imagens a partir de descrições textuais. Útil para posts de redes sociais, apresentações e projetos criativos.</p>

        <h3>14. Assistente de Saúde (Informativo)</h3>
        <p>"Quais alimentos ajudam a reduzir colesterol?" A IA não substitui médico, mas é excelente para informação inicial e educação em saúde.</p>

        <h3>15. Programação e Automação</h3>
        <p>Mesmo sem saber programar, você pode pedir: "Crie um script Python que renomeie todos os arquivos de uma pasta adicionando a data." A IA gera código funcional em segundos.</p>

        <h2>Melhores Ferramentas Gratuitas</h2>
        <ul>
          <li><strong>ChatGPT</strong> — versão gratuita com GPT-4o mini</li>
          <li><strong>Google Gemini</strong> — integrado ao Google Workspace</li>
          <li><strong>Microsoft Copilot</strong> — integrado ao Edge e Office</li>
          <li><strong>Claude</strong> — excelente para textos longos e análise</li>
          <li><strong>Perplexity</strong> — pesquisa com fontes citadas</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Treinamento de IA Para Empresas</h3>
          <p className="text-muted-foreground mb-0">Oferecemos consultoria e treinamento para equipes que querem integrar IA na rotina de trabalho. Presencial em Curitiba ou remoto.</p>
        </div>
      </>
    ),
  },
  "melhores-ferramentas-ia-gratuitas-2026": {
    title: "Melhores Ferramentas de IA Gratuitas em 2026",
    excerpt: "Lista curada de IAs gratuitas.",
    date: "2026-04-13",
    readTime: "10 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">Você não precisa pagar para usar IA de qualidade. Em 2026, as melhores ferramentas oferecem planos gratuitos surpreendentemente capazes. Aqui está a <strong>lista definitiva organizada por categoria</strong>.</p>

        <h2>Texto e Conversação</h2>
        <ul>
          <li><strong>ChatGPT (OpenAI)</strong> — GPT-4o mini gratuito, com limite generoso. O mais versátil.</li>
          <li><strong>Google Gemini</strong> — Gemini 2.5 Flash gratuito. Excelente para pesquisa e textos longos.</li>
          <li><strong>Microsoft Copilot</strong> — Baseado em GPT-4, gratuito no Edge. Gera imagens também.</li>
          <li><strong>Claude (Anthropic)</strong> — Janela de contexto enorme. Melhor para análise de documentos longos.</li>
          <li><strong>Perplexity AI</strong> — Pesquisa com IA que cita fontes. Substitui o Google para pesquisas complexas.</li>
        </ul>

        <h2>Geração de Imagens</h2>
        <ul>
          <li><strong>Microsoft Designer (DALL-E 3)</strong> — Gratuito via Copilot. Qualidade profissional.</li>
          <li><strong>Leonardo.ai</strong> — 150 créditos/dia gratuitos. Modelos diversos.</li>
          <li><strong>Ideogram</strong> — Excelente para texto em imagens (logotipos, banners).</li>
          <li><strong>Stable Diffusion (local)</strong> — 100% gratuito, roda no seu PC com GPU.</li>
        </ul>

        <h2>Código e Programação</h2>
        <ul>
          <li><strong>GitHub Copilot Free</strong> — Autocomplete de código em VS Code. Gratuito para uso pessoal.</li>
          <li><strong>Codeium</strong> — Alternativa gratuita ao Copilot, sem limitações.</li>
          <li><strong>Replit AI</strong> — IDE online com IA integrada para prototipar rápido.</li>
          <li><strong>ChatGPT / Claude</strong> — Excelentes para explicar código, debugar e converter entre linguagens.</li>
        </ul>

        <h2>Áudio e Vídeo</h2>
        <ul>
          <li><strong>ElevenLabs</strong> — Síntese de voz com qualidade humana. 10.000 caracteres/mês grátis.</li>
          <li><strong>Whisper (OpenAI)</strong> — Transcrição de áudio para texto. Open source e gratuito.</li>
          <li><strong>CapCut</strong> — Edição de vídeo com legendas automáticas por IA.</li>
          <li><strong>Suno.ai</strong> — Geração de músicas com IA a partir de texto.</li>
        </ul>

        <h2>Produtividade</h2>
        <ul>
          <li><strong>Notion AI</strong> — Resumos, brainstorm e organização integrados ao Notion.</li>
          <li><strong>Gamma.app</strong> — Gera apresentações profissionais a partir de um prompt.</li>
          <li><strong>Canva Magic</strong> — IA integrada para design (remover fundo, gerar imagens, redimensionar).</li>
          <li><strong>Otter.ai</strong> — Transcreve reuniões em tempo real.</li>
        </ul>

        <h2>Tabela Resumo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Ferramenta</th><th className="text-left p-2 border-b">Categoria</th><th className="text-left p-2 border-b">Limite Gratuito</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">ChatGPT</td><td className="p-2 border-b">Texto</td><td className="p-2 border-b">Ilimitado (GPT-4o mini)</td></tr>
              <tr><td className="p-2 border-b">Gemini</td><td className="p-2 border-b">Texto</td><td className="p-2 border-b">Ilimitado (Flash)</td></tr>
              <tr><td className="p-2 border-b">Leonardo.ai</td><td className="p-2 border-b">Imagem</td><td className="p-2 border-b">150 créditos/dia</td></tr>
              <tr><td className="p-2 border-b">Copilot Free</td><td className="p-2 border-b">Código</td><td className="p-2 border-b">2000 completions/mês</td></tr>
              <tr><td className="p-2 border-b">ElevenLabs</td><td className="p-2 border-b">Áudio</td><td className="p-2 border-b">10k chars/mês</td></tr>
              <tr><td className="p-2 border-b">Gamma.app</td><td className="p-2 border-b">Apresentação</td><td className="p-2 border-b">10 decks</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Configuração de IA no Seu Computador</h3>
          <p className="text-muted-foreground mb-0">Instalamos e configuramos ferramentas de IA no seu PC, incluindo modelos locais como Stable Diffusion e LLMs via Ollama.</p>
        </div>
      </>
    ),
  },
  "ia-para-pequenas-empresas-como-comecar": {
    title: "IA Para Pequenas Empresas: Como Começar Sem Gastar Muito",
    excerpt: "Automação e IA acessível para pequenos negócios.",
    date: "2026-04-13",
    readTime: "11 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">Você não precisa ser uma big tech para usar IA. <strong>Pequenas empresas de Curitiba</strong> já estão usando inteligência artificial para atender clientes, criar conteúdo e analisar dados — muitas vezes de graça.</p>

        <h2>1. Atendimento ao Cliente com Chatbots</h2>
        <p>Ferramentas como <strong>Tidio</strong>, <strong>ManyChat</strong> e <strong>Chatfuel</strong> permitem criar chatbots para WhatsApp e Instagram que respondem perguntas frequentes 24/7. Resultado: menos tempo respondendo as mesmas perguntas, mais tempo vendendo.</p>
        <p><strong>Custo:</strong> Gratuito até certo volume, planos a partir de R$ 50/mês.</p>

        <h2>2. Geração de Conteúdo Para Redes Sociais</h2>
        <p>Use ChatGPT ou Gemini para criar legendas, carrosséis e ideias de posts. Combine com Canva (que tem IA integrada) para gerar artes profissionais em minutos. Uma semana de conteúdo que levava 8 horas agora leva 2.</p>

        <h2>3. E-mail Marketing Inteligente</h2>
        <p>Plataformas como <strong>Mailchimp</strong> e <strong>Brevo</strong> usam IA para otimizar horários de envio, segmentar listas e escrever assuntos que aumentam a taxa de abertura.</p>

        <h2>4. Análise de Dados e Relatórios</h2>
        <p>Cole sua planilha de vendas no ChatGPT e peça: "Identifique os 5 produtos mais vendidos, o mês com maior faturamento e a tendência dos últimos 6 meses." Insights que custariam horas com um analista.</p>

        <h2>5. Transcrição de Reuniões</h2>
        <p><strong>Otter.ai</strong> e <strong>Fireflies.ai</strong> transcrevem reuniões do Zoom/Google Meet automaticamente, geram resumos e listam tarefas pendentes.</p>

        <h2>6. Automatização de Processos</h2>
        <p>Use <strong>Zapier</strong> ou <strong>Make</strong> com módulos de IA para automatizar fluxos: "Quando receber um e-mail com fatura, extraia o valor e adicione à planilha automaticamente."</p>

        <h2>Quanto Custa Implementar IA?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left p-2 border-b">Solução</th><th className="text-left p-2 border-b">Investimento</th><th className="text-left p-2 border-b">Economia Estimada</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border-b">Chatbot WhatsApp</td><td className="p-2 border-b">R$ 0-150/mês</td><td className="p-2 border-b">4-6h/semana</td></tr>
              <tr><td className="p-2 border-b">IA para conteúdo</td><td className="p-2 border-b">R$ 0-100/mês</td><td className="p-2 border-b">6-10h/semana</td></tr>
              <tr><td className="p-2 border-b">Transcrição de reuniões</td><td className="p-2 border-b">R$ 0-80/mês</td><td className="p-2 border-b">2-3h/semana</td></tr>
              <tr><td className="p-2 border-b">Automação (Zapier)</td><td className="p-2 border-b">R$ 0-200/mês</td><td className="p-2 border-b">5-8h/semana</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Por Onde Começar?</h2>
        <ol>
          <li><strong>Identifique tarefas repetitivas</strong> — o que consome mais tempo da equipe?</li>
          <li><strong>Comece com gratuitos</strong> — ChatGPT, Gemini, Canva Free</li>
          <li><strong>Meça resultados</strong> — horas economizadas, leads gerados, satisfação do cliente</li>
          <li><strong>Escale gradualmente</strong> — invista em planos pagos apenas quando o ROI for claro</li>
        </ol>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Consultoria de IA Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Ajudamos pequenas empresas de Curitiba a implementar IA de forma prática e acessível. Do diagnóstico à execução.</p>
        </div>
      </>
    ),
  },
  "ia-substituir-empregos-mitos-verdades": {
    title: "A IA Vai Substituir Empregos? Mitos, Verdades e Como Se Preparar",
    excerpt: "O que a pesquisa mostra sobre IA e empregos.",
    date: "2026-04-13",
    readTime: "10 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">"A IA vai tirar meu emprego?" é a pergunta mais comum de 2026. A resposta honesta: <strong>depende</strong>. Alguns empregos vão desaparecer, outros vão se transformar, e muitos novos serão criados. Veja o que sabemos.</p>

        <h2>O Que a IA Já Substituiu</h2>
        <ul>
          <li><strong>Atendentes de telemarketing</strong> — chatbots e URAs inteligentes já lidam com 60-80% dos chamados</li>
          <li><strong>Tradutores de textos simples</strong> — DeepL e Google Tradutor são suficientes para documentos padrão</li>
          <li><strong>Digitadores e data entry</strong> — OCR e automação eliminaram boa parte dessas funções</li>
          <li><strong>Caixas de supermercado</strong> — self-checkout e apps de compra</li>
        </ul>

        <h2>O Que a IA NÃO Vai Substituir (Tão Cedo)</h2>
        <ul>
          <li><strong>Trabalhos manuais especializados</strong> — eletricistas, encanadores, técnicos de manutenção</li>
          <li><strong>Profissões de empatia</strong> — enfermeiros, psicólogos, assistentes sociais</li>
          <li><strong>Criatividade estratégica</strong> — diretores criativos, designers de experiência, estrategistas</li>
          <li><strong>Tomada de decisão complexa</strong> — gestores, advogados, médicos (IA ajuda, mas não decide)</li>
          <li><strong>Trabalhos físicos não-padronizados</strong> — construção civil, jardinagem, manutenção predial</li>
        </ul>

        <h2>O Que Está se Transformando</h2>
        <p>A maioria das profissões não será substituída — será <strong>aumentada</strong> pela IA:</p>
        <ul>
          <li><strong>Programadores</strong> — Copilot gera código, mas o desenvolvedor ainda arquiteta, revisa e decide</li>
          <li><strong>Designers</strong> — IA gera rascunhos, mas o designer refina, ajusta e cria identidade</li>
          <li><strong>Contadores</strong> — IA automatiza lançamentos, mas o contador interpreta, planeja e orienta</li>
          <li><strong>Jornalistas</strong> — IA redige notícias factuais, mas investigação e análise permanecem humanas</li>
        </ul>

        <h2>Novas Profissões Criadas pela IA</h2>
        <ul>
          <li><strong>Engenheiro de Prompts</strong> — especialista em extrair o melhor das IAs</li>
          <li><strong>Treinador de IA</strong> — prepara e valida dados para modelos</li>
          <li><strong>Auditor de IA</strong> — verifica viés, ética e conformidade</li>
          <li><strong>Consultor de Automação com IA</strong> — implementa soluções em empresas</li>
          <li><strong>Curador de Conteúdo IA</strong> — edita e valida conteúdo gerado por IA</li>
        </ul>

        <h2>Como Se Preparar</h2>
        <ol>
          <li><strong>Aprenda a usar IA como ferramenta</strong> — quem usa IA produz 2-3x mais que quem não usa</li>
          <li><strong>Desenvolva habilidades complementares</strong> — pensamento crítico, comunicação, liderança</li>
          <li><strong>Especialize-se</strong> — conhecimento profundo é mais difícil de automatizar que tarefas genéricas</li>
          <li><strong>Fique atualizado</strong> — a tecnologia muda rápido, quem para de aprender fica para trás</li>
          <li><strong>Foque em resolver problemas</strong> — a IA executa tarefas, mas entender o problema ainda é humano</li>
        </ol>

        <h2>A Perspectiva Realista</h2>
        <p>A cada revolução tecnológica (máquina a vapor, eletricidade, internet), empregos desapareceram e novos surgiram. Com a IA não será diferente. A diferença é a <strong>velocidade</strong> — a adaptação precisa ser mais rápida do que nunca.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Atualize Seus Conhecimentos</h3>
          <p className="text-muted-foreground mb-0">Oferecemos treinamentos práticos de IA para profissionais e empresas em Curitiba. Aprenda a usar as ferramentas que estão transformando o mercado.</p>
        </div>
      </>
    ),
  },
  "computador-lento-causas-solucoes": {
    title: "Computador lento: causas possíveis e como decidir o próximo passo",
    excerpt: "Entenda por que um computador fica lento, o que dá para verificar com segurança e quando formatar, fazer upgrade ou buscar manutenção realmente faz diferença.",
    date: "2026-04-06",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Um computador lento quase nunca tem uma causa única. Costuma ser uma soma de fatores — disco antigo, pouca memória, programas em segundo plano ou o sistema já desgastado pelo tempo. Antes de formatar ou gastar com peças, vale entender o que a lentidão pode indicar e o que você mesmo consegue verificar com segurança.</p>

        <h2>O que a lentidão costuma indicar</h2>
        <p>Repare em <strong>quando</strong> a lentidão aparece, porque isso ajuda a separar as possibilidades:</p>
        <ul>
          <li>Demora só para ligar e chegar até a área de trabalho.</li>
          <li>Demora para abrir programas depois que o sistema já iniciou.</li>
          <li>Travamentos e congelamentos no meio do uso.</li>
          <li>Lentidão apenas no navegador ou em um programa específico.</li>
          <li>Lentidão que piora com o tempo de uso, acompanhada de aquecimento.</li>
        </ul>
        <p>Cada padrão aponta para grupos de causas diferentes. Nenhum diagnóstico à distância é definitivo: aqui o objetivo é entender a situação, não confirmar a causa sem verificar.</p>

        <h2>Verificações seguras que você pode fazer</h2>
        <ul>
          <li>Reinicie o computador por completo — muita coisa acumulada some com um reinício.</li>
          <li>Veja quanto espaço livre resta no disco do sistema; discos quase cheios deixam tudo lento.</li>
          <li>Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) e observe o que consome disco, memória e processador.</li>
          <li>Revise os programas que iniciam junto com o sistema e desative os que você não usa.</li>
          <li>Confira se há atualizações do sistema pendentes.</li>
        </ul>
        <p>Essas ações não apagam dados e não exigem abrir o equipamento. Se a lentidão continuar, a causa provavelmente é mais profunda.</p>

        <h2>Causas possíveis, por grupo</h2>
        <h3>Armazenamento</h3>
        <p>Um disco rígido mecânico (HD) antigo é uma das razões mais frequentes de lentidão geral. HDs também se desgastam e podem apresentar setores com falha, o que trava a leitura. Migrar para um SSD costuma trazer o ganho mais perceptível — mas isso <Link to="/blog/quando-trocar-hd-por-ssd" className="text-accent">precisa ser avaliado caso a caso</Link>.</p>
        <h3>Memória (RAM)</h3>
        <p>Pouca memória faz o sistema recorrer ao disco como memória virtual, e tudo fica arrastado, principalmente com várias abas ou programas abertos.</p>
        <h3>Software e inicialização</h3>
        <p>Programas que iniciam sozinhos, atualizadores e serviços em segundo plano consomem recursos o tempo todo. Um navegador cheio de extensões também pesa bastante.</p>
        <h3>Temperatura</h3>
        <p>Quando o processador aquece demais, ele reduz a velocidade para se proteger. Poeira e ventilação obstruída são causas comuns de aquecimento.</p>
        <h3>Segurança</h3>
        <p>Alguns programas maliciosos consomem processamento e rede em silêncio. Se a lentidão veio junto com comportamento estranho, vale <Link to="/blog/como-saber-se-pc-tem-virus-malware" className="text-accent">investigar sinais de vírus</Link> e considerar a <Link to="/servicos/remocao-de-virus" className="text-accent">remoção profissional</Link>.</p>
        <h3>Sistema desgastado</h3>
        <p>Com o tempo, o sistema acumula configurações, restos de programas e arquivos que degradam o desempenho.</p>
        <h3>Hardware limitado para o uso atual</h3>
        <p>Equipamentos muito antigos podem simplesmente não dar conta de programas e sistemas atuais, mesmo após ajustes.</p>

        <h2>Formatar nem sempre resolve</h2>
        <p>Formatar reinstala o sistema do zero e pode ajudar quando o problema é de software acumulado ou corrompido. Mas não resolve lentidão causada por HD desgastado, pouca memória, superaquecimento ou hardware defasado. Formatar sem entender a causa costuma dar um alívio temporário — e o problema volta. Veja <Link to="/servicos/formatacao" className="text-accent">como avaliamos quando a formatação faz sentido</Link>.</p>

        <h2>Sinais de que é melhor não insistir</h2>
        <ul>
          <li>Ruídos, cliques ou estalos vindos do disco.</li>
          <li>Arquivos que somem ou ficam corrompidos.</li>
          <li>Aquecimento excessivo e desligamentos repentinos.</li>
          <li>Reinicializações constantes ou tela azul recorrente.</li>
        </ul>
        <p>Nesses casos, continuar usando pode aumentar o risco de perda de dados. Fazer um backup dos arquivos importantes é a primeira medida antes de qualquer tentativa.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se as verificações seguras não resolveram, ou se há sinais de falha física, um diagnóstico presencial identifica a causa real antes de qualquer troca de peça ou formatação. Assim você evita pagar por uma solução que não ataca o problema certo.</p>

        <h2>Limpeza, upgrade ou formatação: o que cada caminho resolve</h2>
        <p>Os três caminhos costumam ser tratados como sinônimos, mas atacam problemas diferentes. A limpeza (física e de software) devolve estabilidade quando o computador acumulou poeira, pasta térmica ressecada ou dezenas de programas iniciando junto com o sistema. O upgrade muda o teto de desempenho: só faz sentido quando o gargalo real é disco mecânico ou memória insuficiente para o uso atual. A formatação zera o sistema e é útil quando há corrupção de arquivos do Windows ou resíduos de infecção — e inútil quando o problema é hardware.</p>
        <p>Na prática, a ordem importa. Trocar o disco de uma máquina que superaquece só transfere a frustração: o computador continuará reduzindo desempenho para se proteger do calor. Do mesmo modo, formatar um notebook com HD com setores defeituosos costuma resultar em uma instalação lenta desde o primeiro dia. Por isso o diagnóstico vem antes: ele diz qual dos três caminhos muda o resultado percebido no dia a dia.</p>
        <ul>
          <li><strong>Ficou lento de forma gradual, ao longo de meses:</strong> normalmente software acumulado, disco cheio ou disco mecânico no limite.</li>
          <li><strong>Piorou de repente:</strong> investigar atualização recente, infecção, falha de disco ou superaquecimento.</li>
          <li><strong>Lento só em tarefas específicas:</strong> pode ser falta de memória para aquele uso, não lentidão geral.</li>
          <li><strong>Trava com barulho ou desliga sozinho:</strong> parar de insistir e priorizar avaliação técnica antes de perder dados.</li>
        </ul>

        <h2>Lentidão em máquinas de trabalho e home office</h2>
        <p>Em computadores usados para trabalho, o custo da lentidão raramente está no equipamento: está nas horas paradas. Quem trabalha com planilhas grandes, videochamadas simultâneas, sistemas de gestão no navegador e vários aplicativos abertos ao mesmo tempo sente primeiro a falta de memória — o sistema passa a usar o disco como memória auxiliar e tudo fica arrastado, mesmo com processador razoável.</p>
        <p>Um segundo padrão comum em home office é o acúmulo de agentes em segundo plano: antivírus duplicados, clientes de sincronização de nuvem, atualizadores de fabricantes e aplicativos de reunião que iniciam junto com o sistema. Cada um consome pouco; somados, competem por disco e memória exatamente nos primeiros minutos do expediente, quando você mais precisa da máquina pronta. Documentar o que está ativo antes de mexer evita desligar algo essencial para o trabalho.</p>
        <p>Se o computador é a ferramenta principal de renda, vale tratar a lentidão como manutenção preventiva e não como emergência: uma avaliação com o equipamento ainda funcionando permite planejar troca de disco, ampliação de memória ou reinstalação em um horário que não interrompa entregas.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer descobrir a causa real da lentidão?</h3>
          <p className="text-muted-foreground mb-3">Um diagnóstico técnico mostra se o caso pede limpeza, upgrade, formatação ou reparo — sem chute.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">Manutenção de computador</Link></li>
            <li><Link to="/servicos/upgrade-ssd-ram" className="text-accent">Upgrade de SSD e memória</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnóstico técnico</Link></li>
          </ul>
        </div>
      </>
    ),
  },
  "como-saber-se-pc-tem-virus-malware": {
    title: "Como saber se o computador está com vírus ou malware",
    excerpt: "Pop-ups, navegador alterado, lentidão repentina ou arquivos bloqueados? Veja os sinais de infecção.",
    date: "2026-04-05",
    readTime: "10 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Muitos programas maliciosos são silenciosos: não travam a tela nem exibem avisos óbvios. Outros são barulhentos, cheios de pop-ups e alertas falsos. Este guia ajuda a diferenciar <strong>sintoma</strong> de <strong>confirmação</strong> e a agir com segurança — sem cair em golpes que se disfarçam de solução.</p>

        <h2>Sinais que merecem atenção</h2>
        <ul>
          <li>Pop-ups e propagandas abrindo sozinhos, inclusive fora do navegador.</li>
          <li>Página inicial, buscador ou extensões do navegador alterados sem sua ação.</li>
          <li>Programas que você não instalou aparecendo na lista de aplicativos.</li>
          <li>Lentidão repentina e uso alto de processador mesmo sem programas abertos.</li>
          <li>Alertas dizendo que o computador está infectado e mandando ligar para um número ou instalar algo.</li>
          <li>Redirecionamentos de sites e resultados de busca estranhos.</li>
          <li>Contas acessadas sem autorização ou mensagens enviadas sem você saber.</li>
          <li>Arquivos renomeados, com extensão trocada ou inacessíveis (possível ransomware).</li>
          <li>Antivírus desativado sozinho e sem permitir reativar.</li>
        </ul>
        <p>Um sinal isolado nem sempre significa infecção — pode ser configuração, extensão indesejada ou até hardware. A confirmação depende de análise; o importante é não ignorar vários sinais juntos.</p>

        <h2>O que fazer com segurança</h2>
        <ul>
          <li>Em um incidente grave (arquivos bloqueados, conta invadida), desconecte o equipamento da internet para conter o problema.</li>
          <li>Não pague nem siga instruções de alertas de "suporte técnico" — são táticas de golpe.</li>
          <li>Não instale "limpadores" ou "aceleradores" aleatórios; muitos trazem mais malware.</li>
          <li>Se houver suspeita de senhas comprometidas, troque-as a partir de outro dispositivo confiável.</li>
          <li>Em ambiente empresarial, preserve as evidências e evite mexer antes de orientar a equipe responsável.</li>
        </ul>

        <h2>O que evitar</h2>
        <ul>
          <li>Formatar por conta própria sem backup — você pode perder dados que ainda dariam para preservar.</li>
          <li>Desativar a segurança do sistema de forma permanente.</li>
          <li>Compartilhar senhas ou dar acesso remoto a quem entrou em contato do nada.</li>
          <li>Confiar em promessas de remoção "sem risco nenhum": dependendo da ameaça, há chance de perda de dados, e isso precisa ser avaliado.</li>
        </ul>

        <h2>Golpe de falso suporte</h2>
        <p>Uma das fraudes mais comuns exibe uma tela de alerta assustadora com um telefone para "ajuda". Ninguém sério trabalha assim. Feche a janela, não ligue para o número e não instale nada que essa tela peça. Se não conseguir fechar, desligue o computador.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se há sinais de ransomware, invasão de contas ou infecção que volta sempre, a remoção profissional avalia o tipo de ameaça e prioriza preservar seus dados. Em muitos casos dá para orientar por <Link to="/atendimento-remoto" className="text-accent">atendimento remoto</Link>, e o <Link to="/diagnostico-tecnico" className="text-accent">diagnóstico</Link> define o caminho mais seguro.</p>

        <h2>Como reduzir o risco de reinfecção</h2>
        <p>Remover a ameaça é metade do trabalho: se o caminho de entrada continuar aberto, o problema volta. Na maioria dos casos domésticos o vetor é previsível — instalador baixado de site de terceiros, extensão de navegador instalada sem atenção, arquivo recebido por mensagem ou reaproveitamento da mesma senha em vários serviços. Corrigir o hábito vale mais do que trocar de antivírus.</p>
        <ul>
          <li>Baixe programas apenas do site oficial do fabricante ou da loja do próprio sistema.</li>
          <li>Revise as extensões do navegador e remova o que você não reconhece ou não usa há meses.</li>
          <li>Mantenha o sistema e o navegador atualizados: boa parte das infecções explora falhas já corrigidas.</li>
          <li>Troque as senhas dos serviços críticos depois da limpeza, preferencialmente de outro dispositivo confiável.</li>
          <li>Ative a verificação em duas etapas em e-mail e banco — é a barreira que impede o dano maior.</li>
        </ul>
        <p>Depois de uma limpeza, observe o comportamento por alguns dias: reaparecimento de páginas iniciais alteradas, novos ícones ou consumo de rede sem motivo indica que algo persistiu ou que o mesmo caminho foi usado de novo.</p>

        <h2>Quando a suspeita envolve uma rede com vários computadores</h2>
        <p>Em escritórios e pequenas empresas, tratar apenas a máquina que apresentou sintoma costuma ser insuficiente. Compartilhamentos de arquivos, pendrives que circulam entre estações e credenciais reutilizadas fazem com que uma infecção se espalhe silenciosamente. O sinal de alerta mais comum é a repetição: dois ou três computadores apresentando o mesmo comportamento estranho na mesma semana.</p>
        <p>Nesses casos, a prioridade muda de ordem. Antes de limpar, é importante isolar a estação suspeita da rede, verificar se há backup íntegro e recente e confirmar quem tem acesso administrativo. Arquivos que ficaram inacessíveis ou renomeados exigem cuidado redobrado: continuar usando o equipamento pode reduzir as chances de recuperação. Se o ambiente tem servidor, sistema de gestão ou dados de clientes, a avaliação deve considerar a rede inteira, e não apenas o computador que reclamou primeiro.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Suspeita de vírus no computador?</h3>
          <p className="text-muted-foreground mb-3">Avaliamos o tipo de infecção e agimos priorizando a preservação dos seus arquivos.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/remocao-de-virus" className="text-accent">Remoção de vírus e malware</Link></li>
            <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">Recuperação de dados</Link></li>
            <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Como manter um backup preventivo</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="como-saber-se-pc-tem-virus-malware" />
      </>

    ),
  },
  "notebook-nao-liga-o-que-fazer": {
    title: "Notebook não liga: o que verificar antes da assistência",
    excerpt: "Veja verificações seguras para um notebook que não liga, liga sem imagem ou desliga sozinho e saiba quando interromper os testes.",
    date: "2026-04-04",
    readTime: "10 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Você aperta o botão do notebook e não acontece nada — ou ele reage, mas não chega ao sistema. "Não liga" pode significar coisas bem diferentes, de um carregador com defeito a uma falha interna. Observar <strong>o comportamento exato</strong> ajuda a entender a situação e evita medidas que podem piorar o quadro.</p>

        <h2>Identifique o comportamento do notebook</h2>
        <ul>
          <li><strong>Nenhum sinal:</strong> nenhuma luz, nenhum som, nenhuma ventoinha.</li>
          <li><strong>LED acende, mas não inicia:</strong> a luz de energia acende, mas nada aparece na tela.</li>
          <li><strong>Liga sem imagem:</strong> ventoinha gira e há sinais de atividade, mas a tela fica preta.</li>
          <li><strong>Inicia e desliga:</strong> liga por alguns segundos e apaga sozinho.</li>
          <li><strong>Não carrega:</strong> conectado ao carregador, a bateria não indica carregamento.</li>
          <li><strong>Liga só na tomada:</strong> funciona com o carregador, mas não segura a bateria.</li>
          <li><strong>LED pisca ou há bipes</strong> em sequência ao tentar ligar.</li>
          <li><strong>Desligou após aquecimento ou queda de energia</strong> e não voltou.</li>
        </ul>
        <p>Cada comportamento aponta para grupos diferentes de possíveis causas. Nada disso confirma a causa sozinho; o diagnóstico é o que fecha o quadro.</p>

        <h2>Verificações seguras (sem abrir o notebook)</h2>
        <ul>
          <li>Teste o carregador em uma tomada que você sabe que funciona e observe se o LED do carregador acende.</li>
          <li>Confira o cabo e o conector do carregador externamente, procurando por danos visíveis.</li>
          <li>Com o notebook conectado ao carregador, aguarde alguns minutos antes de tentar ligar.</li>
          <li>Remova periféricos externos (pendrives, HD externo, impressora) e tente ligar só com o essencial.</li>
          <li>Se liga sem imagem, conecte um monitor ou TV externa por HDMI para ver se a imagem aparece.</li>
          <li>Observe e anote o padrão de luzes e bipes — isso ajuda muito no diagnóstico.</li>
          <li>Siga apenas procedimentos oficiais do fabricante quando eles estiverem claramente identificados para o seu modelo.</li>
        </ul>
        <p>São checagens de baixo risco. A partir daí, mexer no interior exige preparo.</p>

        <h2>O que não fazer</h2>
        <ul>
          <li>Não abra o carregador nem a bateria.</li>
          <li>Não faça "ponte" nem improvise ligações elétricas.</li>
          <li>Não desmonte o notebook nem remova componentes internos sem experiência.</li>
          <li>Não use carregador incompatível — tensão ou conector errados podem causar dano.</li>
          <li>Se caiu líquido, não use secador nem calor: isso espalha o líquido e piora a corrosão. Desligue e não tente ligar.</li>
          <li>Não insista em ligar diante de cheiro, fumaça ou calor anormal.</li>
        </ul>

        <h2>Sinais para parar na hora</h2>
        <p>Pare de tentar ligar se houver <strong>cheiro de queimado, fumaça, estalos, aquecimento anormal, líquido no equipamento ou carregador danificado</strong>. Nesses casos, continuar tentando aumenta o risco de dano maior.</p>

        <h2>Os limites das verificações caseiras</h2>
        <p>Sintomas parecidos podem envolver o carregador, o conector de energia, a bateria, a memória, a tela, o armazenamento, o sistema, a placa ou uma proteção térmica que interrompeu o funcionamento. Não dá para afirmar qual é a causa sem diagnóstico — testar às cegas troca peças boas e não resolve o problema real. Em desktops o roteiro é diferente e envolve outros componentes; aqui o foco é o notebook.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se as verificações básicas não resolveram, o próximo passo é um diagnóstico: ele identifica onde está o problema antes de qualquer troca. Tentar abrir o notebook sem conhecimento pode transformar um problema simples em um prejuízo maior.</p>

        <h2>Erros comuns que pioram o quadro</h2>
        <p>Boa parte dos danos que chegam à bancada não vem do defeito original, e sim da tentativa de resolvê-lo às pressas. Um notebook que não liga geralmente tolera espera; o que ele não tolera é improviso elétrico e abertura sem ferramenta adequada.</p>
        <ul>
          <li><strong>Usar carregador de outro aparelho</strong> com conector parecido, mas tensão ou amperagem diferentes.</li>
          <li><strong>Insistir no botão de energia dezenas de vezes</strong> quando já há sinal de curto ou cheiro de queimado.</li>
          <li><strong>Abrir a base com chave de fenda comum</strong>, danificando presilhas e o cabo flexível do teclado ou do touchpad.</li>
          <li><strong>Ligar depois de contato com líquido</strong> — energizar uma placa molhada costuma transformar um caso recuperável em perda de placa.</li>
          <li><strong>Aplicar produto de limpeza</strong> ou secador quente diretamente nos componentes internos.</li>
        </ul>
        <p>Se em algum momento aparecer cheiro forte, estalo, aquecimento anormal no carregador ou o aparelho tiver sofrido queda, o passo mais seguro é desconectar da tomada, remover a bateria quando ela for removível e parar os testes ali.</p>

        <h2>O que informar ao acionar o técnico</h2>
        <p>Um relato preciso encurta o diagnóstico e reduz a chance de troca desnecessária de peças. Antes do atendimento, reúna as informações que só você tem: elas descrevem o histórico que nenhum teste de bancada reconstrói sozinho.</p>
        <ul>
          <li>Marca, modelo e, se souber, o ano aproximado do equipamento.</li>
          <li>O que aconteceu imediatamente antes da falha: queda, oscilação de energia, atualização, líquido, calor excessivo.</li>
          <li>O comportamento exato hoje: LED aceso ou apagado, ventoinha girando, bipes, tela preta com luz de fundo.</li>
          <li>Se já houve reparo anterior, e o que foi trocado.</li>
          <li>Se existem dados importantes sem backup — isso muda a ordem das etapas do serviço.</li>
        </ul>
        <p>Vale também combinar antes como o equipamento será transportado. Levar o carregador original junto é essencial: sem ele, parte dos testes de energia fica inconclusiva e o diagnóstico pode precisar de uma segunda etapa.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Notebook que não liga?</h3>
          <p className="text-muted-foreground mb-3">O diagnóstico mostra a causa real e as opções antes de você decidir.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">Manutenção de notebook</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnóstico técnico</Link></li>
            <li><Link to="/precos-e-politicas" className="text-accent">Preços e políticas de atendimento</Link></li>
          </ul>

        </div>

        <EditorialReferences slug="notebook-nao-liga-o-que-fazer" />
      </>
    ),

  },
  "diferenca-camera-wifi-dvr-qual-escolher": {
    title: "Câmera Wi-Fi ou DVR: Qual a Diferença e Qual Escolher?",
    excerpt: "Entenda as diferenças técnicas entre câmeras Wi-Fi e sistemas DVR.",
    date: "2026-02-14",
    readTime: "8 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Na hora de instalar câmeras de segurança, a dúvida mais comum é: <strong>câmera Wi-Fi ou sistema DVR com cabo?</strong> Cada tecnologia tem vantagens e limitações. Neste guia, explicamos tudo de forma clara para você decidir com segurança.</p>

        <h2>Câmera Wi-Fi: Praticidade com Ressalvas</h2>
        <p>Câmeras Wi-Fi se conectam à internet sem fio e são fáceis de instalar. São populares para uso doméstico simples, mas possuem limitações importantes:</p>
        <ul>
          <li><strong>Dependem 100% da internet:</strong> se o Wi-Fi cair, a câmera para de funcionar</li>
          <li><strong>Interferência de sinal:</strong> paredes, distância e outros dispositivos podem prejudicar a qualidade</li>
          <li><strong>Vulnerabilidade:</strong> invasores podem usar inibidores de sinal para desativar as câmeras</li>
          <li><strong>Armazenamento limitado:</strong> muitas dependem de nuvem com mensalidade</li>
        </ul>

        <h2>Sistema DVR com Cabo: Estabilidade e Confiança</h2>
        <p>O sistema DVR (Digital Video Recorder) utiliza câmeras conectadas por cabo coaxial ou UTP diretamente ao gravador. É a escolha profissional para segurança real:</p>
        <ul>
          <li><strong>Funciona sem internet:</strong> grava localmente no HD mesmo se a internet cair</li>
          <li><strong>Sem interferência:</strong> conexão por cabo é 100% estável</li>
          <li><strong>Imune a inibidores:</strong> não pode ser desativado por equipamentos de bloqueio</li>
          <li><strong>Gravação contínua 24h:</strong> HD local armazena dias de gravação sem custo mensal</li>
          <li><strong>Acesso remoto:</strong> você ainda vê pelo celular quando tem internet no local</li>
        </ul>

        <h2>Comparativo Direto</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead><tr className="bg-muted"><th className="p-3 text-left">Característica</th><th className="p-3 text-left">Wi-Fi</th><th className="p-3 text-left">DVR (Cabo)</th></tr></thead>
            <tbody>
              <tr><td className="p-3 border-t">Estabilidade</td><td className="p-3 border-t">Média</td><td className="p-3 border-t">Alta</td></tr>
              <tr><td className="p-3 border-t">Funciona sem internet</td><td className="p-3 border-t">Não</td><td className="p-3 border-t">Sim</td></tr>
              <tr><td className="p-3 border-t">Vulnerável a inibidor</td><td className="p-3 border-t">Sim</td><td className="p-3 border-t">Não</td></tr>
              <tr><td className="p-3 border-t">Gravação local</td><td className="p-3 border-t">Limitada</td><td className="p-3 border-t">Contínua 24h</td></tr>
              <tr><td className="p-3 border-t">Mensalidade</td><td className="p-3 border-t">Geralmente sim</td><td className="p-3 border-t">Não</td></tr>
              <tr><td className="p-3 border-t">Indicação</td><td className="p-3 border-t">Uso casual</td><td className="p-3 border-t">Segurança real</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Qual Escolher?</h2>
        <p>Para <strong>segurança real e profissional</strong>, o sistema DVR com câmeras Intelbras é a escolha certa. Funciona independente da internet, não pode ser desativado remotamente e grava continuamente sem custo mensal.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Kit 4 Câmeras Intelbras com Instalação</h3>
          <p className="text-muted-foreground mb-0">Sistema DVR profissional completo com 4 câmeras HD, DVR, HD de gravação e instalação inclusa por <strong>R$ 1.350</strong>. Atendemos Curitiba, São José dos Pinhais e Litoral do PR.</p>
        </div>
      </>
    ),
  },
  "seguranca-casas-praia-itapoa-guaratuba": {
    title: "Segurança em Casas de Praia: Como Proteger Seu Imóvel em Itapoá e Guaratuba",
    excerpt: "Imóveis de veraneio ficam meses desocupados e são alvos fáceis.",
    date: "2026-02-12",
    readTime: "7 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Quem tem casa de praia no litoral do Paraná conhece a preocupação: <strong>o imóvel fica vazio durante 9 meses do ano</strong>. Sem vigilância, se torna alvo fácil para furtos, vandalismo e invasões. Veja como resolver isso de forma definitiva.</p>

        <h2>O Problema: Imóvel Vazio = Alvo Fácil</h2>
        <p>Cidades como <strong>Itapoá</strong> e <strong>Guaratuba</strong> recebem turistas no verão, mas fora da temporada as ruas ficam vazias. Criminosos sabem disso e aproveitam a baixa movimentação para agir:</p>
        <ul>
          <li>Furto de eletrodomésticos e móveis</li>
          <li>Vandalismo e depredação</li>
          <li>Invasão para uso irregular do imóvel</li>
          <li>Danos na rede elétrica e hidráulica</li>
        </ul>

        <h2>A Solução: Monitoramento Remoto 24h</h2>
        <p>Com câmeras de segurança e acesso remoto, você transforma seu celular em uma central de monitoramento. Funciona assim:</p>
        <ul>
          <li><strong>Câmeras com visão noturna</strong> captam tudo, mesmo no escuro</li>
          <li><strong>DVR grava continuamente</strong> no HD local, sem depender de internet estável</li>
          <li><strong>App no celular</strong> permite ver ao vivo de Curitiba ou qualquer cidade</li>
          <li><strong>Alerta de movimento</strong> avisa quando alguém se aproxima</li>
        </ul>

        <h2>Casos Reais no Litoral</h2>
        <p>Proprietários que instalaram câmeras em casas de praia relatam resultados imediatos: identificação de invasores, acionamento da PM em tempo real e <strong>redução total de ocorrências</strong> após a instalação visível das câmeras.</p>

        <h2>Dicas Extras de Segurança</h2>
        <ul>
          <li>Mantenha a vegetação do terreno aparada (mato alto indica casa vazia)</li>
          <li>Use timer em lâmpadas para simular presença</li>
          <li>Peça a um vizinho de confiança para verificar periodicamente</li>
          <li>Instale câmeras visíveis na fachada (efeito deterrente)</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Proteja Sua Casa de Praia</h3>
          <p className="text-muted-foreground mb-0">O Técnico de Informática instala câmeras Intelbras em <strong>Itapoá, Guaratuba e todo o litoral do PR</strong>. Kit completo com 4 câmeras, DVR e acesso remoto por R$ 1.350. Equipe especializada desde 1999.</p>
        </div>
      </>
    ),
  },
  "como-escolher-melhor-kit-cameras-seguranca": {
    title: "Como Escolher o Melhor Kit de Câmeras de Segurança Para Sua Casa ou Comércio",
    excerpt: "Guia completo para escolher o kit ideal de CFTV.",
    date: "2026-02-10",
    readTime: "9 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Comprar câmeras de segurança pode parecer simples, mas <strong>escolher errado significa jogar dinheiro fora</strong>. Neste guia, explicamos os critérios técnicos que realmente importam para proteger seu imóvel.</p>

        <h2>1. Quantas Câmeras Você Precisa?</h2>
        <p>A regra geral é cobrir todos os acessos e pontos vulneráveis:</p>
        <ul>
          <li><strong>Casa pequena/apartamento:</strong> 2 a 4 câmeras (entrada, garagem, quintal)</li>
          <li><strong>Casa grande:</strong> 4 a 8 câmeras (perímetro completo)</li>
          <li><strong>Comércio:</strong> 4 a 16 câmeras (caixa, estoque, entrada, corredor)</li>
          <li><strong>Condomínio:</strong> 8+ câmeras (portaria, garagem, áreas comuns)</li>
        </ul>

        <h2>2. Resolução: HD, Full HD ou 4K?</h2>
        <p>Para a maioria dos casos, <strong>câmeras HD (720p) ou Full HD (1080p)</strong> são suficientes e oferecem excelente custo-benefício. Câmeras 4K são indicadas para grandes áreas onde é necessário dar zoom nas imagens.</p>

        <h2>3. Visão Noturna</h2>
        <p>Essencial. A maioria dos crimes acontece à noite. Procure câmeras com <strong>infravermelho (IR)</strong> que captam imagens em até 20-30 metros de distância no escuro total.</p>

        <h2>4. Armazenamento</h2>
        <ul>
          <li><strong>HD 1TB:</strong> armazena aproximadamente 7-10 dias com 4 câmeras</li>
          <li><strong>HD 2TB:</strong> aproximadamente 15-20 dias</li>
          <li>A gravação é contínua e quando o HD enche, sobrescreve as mais antigas</li>
        </ul>

        <h2>5. Marca do Equipamento</h2>
        <p>No Brasil, a <strong>Intelbras</strong> é líder absoluta em CFTV. Oferece equipamentos de qualidade, suporte nacional, garantia real e app de acesso remoto estável. Evite marcas desconhecidas — economia no equipamento pode sair caro na segurança.</p>

        <h2>6. Instalação: Profissional ou Faça Você Mesmo?</h2>
        <p>Instalação amadora é a principal causa de sistemas que não funcionam corretamente. Um técnico profissional garante:</p>
        <ul>
          <li>Posicionamento correto das câmeras</li>
          <li>Passagem adequada dos cabos</li>
          <li>Configuração correta do DVR e acesso remoto</li>
          <li>Teste completo de todas as câmeras</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Kit Recomendado: 4 Câmeras Intelbras</h3>
          <p className="text-muted-foreground mb-0">Kit completo com 4 câmeras HD, DVR 4 canais, HD de gravação, cabos, conectores e <strong>instalação profissional inclusa</strong> por R$ 1.350. Garantia de 1 ano. Atendemos Curitiba e região.</p>
        </div>
      </>
    ),
  },
  "monitoramento-24-horas-como-funciona": {
    title: "Monitoramento 24 Horas: Como Funciona e Por Que Você Precisa",
    excerpt: "Saiba como funciona a gravação contínua e o acesso remoto.",
    date: "2026-02-08",
    readTime: "6 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Monitoramento 24 horas não é mais exclusividade de grandes empresas. Com um kit de câmeras Intelbras e um celular, <strong>qualquer pessoa pode vigiar seu imóvel em tempo real</strong>, de qualquer lugar do mundo.</p>

        <h2>Como Funciona na Prática</h2>
        <p>O sistema é composto por câmeras conectadas a um DVR (gravador digital) que registra tudo continuamente em um HD interno. Ao mesmo tempo, o DVR se conecta à internet e transmite as imagens para o app no seu celular.</p>
        <ul>
          <li><strong>Gravação local:</strong> funciona 24h, mesmo sem internet</li>
          <li><strong>Acesso remoto:</strong> veja ao vivo pelo app (Android/iPhone)</li>
          <li><strong>Playback:</strong> volte e reveja gravações passadas</li>
          <li><strong>Alertas:</strong> notificação quando detecta movimento</li>
        </ul>

        <h2>Por Que o Monitoramento Contínuo é Essencial?</h2>
        <p>A maioria dos crimes é planejada. Criminosos observam rotinas e escolhem momentos de vulnerabilidade. Com monitoramento 24h:</p>
        <ul>
          <li>Toda atividade suspeita é registrada como prova</li>
          <li>Câmeras visíveis inibem ações criminosas</li>
          <li>Você pode acionar a polícia em tempo real</li>
          <li>Funcionários sabem que estão sendo monitorados</li>
        </ul>

        <h2>Precisa Pagar Mensalidade?</h2>
        <p><strong>Não!</strong> Diferente de serviços de monitoramento terceirizados, o sistema com DVR é 100% seu. Não há mensalidade, não há contrato. Você paga uma vez e usa para sempre.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Monte Seu Sistema de Monitoramento</h3>
          <p className="text-muted-foreground mb-0">Kit 4 câmeras Intelbras com DVR, HD e instalação profissional por <strong>R$ 1.350</strong>. Configuramos o app no seu celular na hora. Sem mensalidade, sem burocracia.</p>
        </div>
      </>
    ),
  },
  "equipe-especializada-cftv-litoral-parana": {
    title: "Equipe Especializada em CFTV no Litoral do Paraná: Por Que Contratar Profissionais",
    excerpt: "Instalação amadora pode comprometer toda a segurança.",
    date: "2026-02-06",
    readTime: "7 min",
    category: "CFTV",
    content: (
      <>
        <p className="lead">Comprar câmeras de segurança é apenas metade do trabalho. A <strong>instalação profissional é o que diferencia um sistema funcional de um equipamento inútil</strong>. No litoral do Paraná, onde as condições são mais desafiadoras, isso é ainda mais crítico.</p>

        <h2>Os Riscos da Instalação Amadora</h2>
        <ul>
          <li><strong>Posicionamento errado:</strong> câmeras que não cobrem os pontos vulneráveis</li>
          <li><strong>Cabos expostos:</strong> fáceis de cortar por invasores</li>
          <li><strong>Configuração incorreta:</strong> gravação que não funciona ou acesso remoto instável</li>
          <li><strong>Falta de proteção contra intempéries:</strong> no litoral, a maresia e umidade destroem equipamentos mal instalados</li>
        </ul>

        <h2>O Que Uma Equipe Especializada Faz de Diferente</h2>
        <ul>
          <li><strong>Análise do local:</strong> identificação de todos os pontos vulneráveis antes da instalação</li>
          <li><strong>Passagem protegida dos cabos:</strong> dentro de conduítes, protegidos e invisíveis</li>
          <li><strong>Configuração completa:</strong> DVR, gravação, acesso remoto e alertas no celular</li>
          <li><strong>Proteção contra maresia:</strong> selagem adequada dos conectores e escolha de pontos protegidos</li>
          <li><strong>Teste completo:</strong> verificação de cada câmera, visão noturna e gravação antes de entregar</li>
        </ul>

        <h2>Por que o Técnico de Informática no Litoral?</h2>
        <p>A equipe do <strong>Mestre dos Serviços (Henrique da Cruz)</strong> atua desde 1999 e conhece as particularidades do litoral paranaense. Já instalamos câmeras em centenas de imóveis em <strong>Itapoá, Guaratuba, Matinhos e Pontal do Paraná</strong>.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Instalação Profissional no Litoral do PR</h3>
          <p className="text-muted-foreground mb-0">Kit 4 câmeras Intelbras com instalação especializada por <strong>R$ 1.350</strong>. Atendemos todo o litoral do Paraná com equipe própria. Garantia de 1 ano.</p>
        </div>
      </>
    ),
  },
  "windows-11-atualizacao-kb5074105-novidades": {
    title: "Windows 11 KB5074105: Todas as Novidades da Atualização de Janeiro 2026",
    excerpt: "A Microsoft liberou a atualização KB5074105 para Windows 11 25H2 e 24H2 com recursos inéditos: Smart App Control configurável, sincronização celular-PC, melhorias no Windows Hello e correções críticas.",
    date: "2026-01-30",
    readTime: "10 min",
    category: "Windows 11",
    image: windowsKb5074105Image,
    content: (
      <>
        <p className="lead">
          A <strong>Microsoft</strong> começou a liberar a atualização <strong>KB5074105</strong> para o <strong>Windows 11</strong>, 
          e desta vez não é só mais um pacote de correções pontuais. O update opcional de janeiro de 2026 traz mudanças importantes 
          tanto para a versão <strong>25H2 quanto para a 24H2</strong>, incluindo algo que usuários pediam há tempos: a possibilidade 
          de ativar ou desativar o Controle de Aplicativos Inteligentes sem precisar reinstalar o sistema.
        </p>

        <h2>Onde Baixar o Patch KB5074105</h2>
        <p>
          A atualização já está disponível via <strong>Windows Update</strong> e também pode ser baixada manualmente por meio dos 
          instaladores offline (.msu). Por padrão, ela não é instalada automaticamente, a menos que o usuário ative a opção de 
          receber atualizações assim que elas ficarem disponíveis.
        </p>
        <p>
          Nos testes, o pacote aparece identificado como <strong>2026-01 Update (KB5074105)</strong> e leva o sistema para a 
          <strong> build 26200.7705 no Windows 11 25H2</strong> ou <strong>26100.7705 no 24H2</strong>.
        </p>
        <p>
          <strong>Atenção:</strong> Apesar de opcional, trata-se de um update grande. Os instaladores passam facilmente dos 4 GB, 
          algo que já virou motivo de crítica. O motivo para um arquivo desse tamanho é a inclusão de modelos de IA no pacote, 
          mesmo em PCs que não possuem NPU ou qualquer recurso de aceleração para inteligência artificial.
        </p>
        <p>
          Em uma conexão de 200 Mbps, o download e a instalação levam cerca de 15 minutos, seguidos por um reinício obrigatório. 
          A boa notícia é que, diferente das atualizações do Patch Tuesday, essa <strong>pode ser desinstalada</strong> a qualquer momento.
        </p>

        <h2>Principais Novidades da KB5074105</h2>
        
        <h3>1. Retomar Tarefas Entre Celular e PC</h3>
        <p>
          Um dos destaques da KB5074105 é a evolução do recurso <strong>Retomar</strong>, que funciona como uma espécie de Handoff do Windows. 
          O sistema permite iniciar uma tarefa no celular e continuar exatamente de onde parou ao desbloquear o PC.
        </p>
        <p>
          Antes, o recurso era bastante limitado e funcionava basicamente com o OneDrive. Com essa atualização, o suporte foi ampliado para 
          aplicativos populares, como o <strong>Spotify</strong>. Se você estiver ouvindo uma música no celular, por exemplo, o Windows passa 
          a exibir um aviso na barra de tarefas para retomar a reprodução instantaneamente no desktop.
        </p>
        <p>
          O mesmo vale para documentos do Word, Excel e PowerPoint, além de navegadores de terceiros e até do Microsoft 365 Copilot.
        </p>

        <h3>2. Smart App Control Finalmente Configurável</h3>
        <p>
          Outro avanço muito aguardado envolve o <strong>Smart App Control</strong>, recurso de segurança que bloqueia aplicativos 
          considerados não confiáveis. Embora a proposta seja proteger o usuário, na prática ele acabava barrando softwares legítimos 
          e criava uma situação absurda: <strong>para desativar o recurso, era necessário reinstalar o Windows</strong>.
        </p>
        <p>
          Com a KB5074105, isso finalmente muda. Agora é possível ativar ou desativar o Controle de Aplicativos Inteligentes 
          diretamente pelo app de Segurança do Windows, sem instalação limpa e sem gambiarras.
        </p>

        <h3>3. Melhorias no Windows MIDI</h3>
        <p>
          Quem trabalha com música também ganha melhorias importantes. O <strong>Windows MIDI Services</strong> recebeu ajustes que 
          tornam o funcionamento mais estável e rápido tanto no MIDI 1.0 quanto no MIDI 2.0. Isso significa menos conflitos e 
          possibilidade de compartilhar portas MIDI entre aplicativos.
        </p>

        <h3>4. Windows Hello Mais Seguro</h3>
        <p>
          A atualização também amplia o suporte ao <strong>Windows Hello Enhanced Sign-in Security (ESS)</strong>. Até agora, 
          o nível extra de segurança só funcionava com sensores de impressão digital integrados ao notebook. Com a KB5074105, 
          sensores periféricos passam a ser compatíveis.
        </p>

        <h3>5. Novo Cartão de Dispositivo nas Configurações</h3>
        <p>
          A página inicial do aplicativo Configurações também recebeu ajustes. Um novo <strong>cartão de Dispositivo</strong> passa 
          a exibir informações básicas sobre o computador, como armazenamento e uso geral, facilitando o acesso rápido às informações 
          mais importantes.
        </p>

        <h2>Correções de Bugs Importantes</h2>
        <p>
          Além dos novos recursos, a Microsoft corrigiu uma série de problemas que vinham incomodando usuários:
        </p>
        <ul>
          <li>Travamentos do explorer.exe</li>
          <li>Sumiço da barra de tarefas</li>
          <li>Erros de personalização no Explorador de Arquivos</li>
          <li>Casos raros de tela preta após a atualização</li>
          <li>Erros de BSOD relacionados à dxgmms2.sys em algumas GPUs</li>
          <li>Problemas no menu Iniciar</li>
          <li>Falhas na tela de bloqueio</li>
          <li>Movimentação inesperada de ícones na área de trabalho</li>
          <li>Erros no Windows Sandbox</li>
        </ul>

        <h2>Problemas Conhecidos</h2>
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">⚠️ Atenção: Bug da Tela Preta</h3>
          <p className="text-muted-foreground mb-4">
            A atualização obrigatória do Windows 11 liberada em janeiro de 2026 ainda apresenta problemas para alguns usuários. 
            Mesmo após a Microsoft liberar um patch emergencial (KB5078127), alguns usuários seguem enfrentando <strong>tela preta, 
            travamentos e falhas de inicialização</strong>.
          </p>
          <p className="text-muted-foreground mb-0">
            Os sistemas afetados podem exibir o erro <strong>UNMOUNTABLE_BOOT_VOLUME</strong> ou <strong>UNEXPECTED_KERNEL_MODE_TRAP</strong>. 
            Em alguns casos, o caminho mais consistente é <strong>formatar e reinstalar o Windows</strong>.
          </p>
        </div>

        <p>
          A Microsoft também confirmou que ainda investiga um bug antigo em que o <strong>ícone de senha desaparece da tela de login</strong>, 
          um problema detectado desde 2025. A empresa afirma estar trabalhando em uma correção, mas ainda não divulgou prazo.
        </p>

        <h2>Vale a Pena Instalar a KB5074105?</h2>
        <p>
          Se você não está enfrentando problemas com o Windows 11 atual, pode esperar alguns dias para ver se novos bugs são reportados. 
          Porém, se você precisa dos novos recursos (especialmente a possibilidade de desativar o Smart App Control), a atualização 
          traz melhorias significativas.
        </p>
        <p>
          <strong>Recomendação:</strong> Faça um backup completo antes de instalar qualquer atualização major. Se algo der errado, 
          você poderá restaurar o sistema ou seus arquivos.
        </p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Problemas com Atualização do Windows 11?</h3>
          <p className="text-muted-foreground mb-0">
            Se você instalou a atualização e está enfrentando tela preta, travamentos ou erros de inicialização, 
            um <strong>técnico especializado em Windows 11</strong> pode ajudar a recuperar seu sistema ou fazer uma 
            <strong> formatação segura</strong> preservando seus arquivos. Atendimento em Curitiba e região conforme a agenda disponível.
          </p>
        </div>
      </>
    ),
  },
  "como-escolher-um-bom-antivirus": {
    title: "Como escolher um antivírus: o que muda de verdade na proteção",
    excerpt:
      "Critérios técnicos para escolher a proteção do Windows: o que o antivírus do sistema já cobre, quando um pago faz diferença, o que é só marketing e como reconhecer falso antivírus.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">A pergunta que chega na bancada quase sempre é "qual é o melhor antivírus?". A resposta honesta é que o programa importa menos do que a combinação entre sistema atualizado, hábitos de download e uma conta de usuário que não seja administradora o tempo todo. Ainda assim, a escolha da ferramenta faz diferença — e há critérios objetivos para decidir.</p>

        <h2>O que já vem instalado no Windows</h2>
        <p>Desde o Windows 10, o sistema inclui uma solução de segurança ativa por padrão, com proteção em tempo real, verificação de arquivos baixados, filtro de reputação no navegador padrão e firewall integrado. Ela é atualizada pelo mesmo canal do sistema e desliga sozinha quando outro antivírus assume o posto.</p>
        <p>Na prática, isso muda o ponto de partida: em um computador doméstico com o sistema em dia, o cenário não é "sem proteção", e sim "com proteção básica funcionando". A pergunta correta passa a ser o que uma solução adicional acrescenta ao que já existe.</p>

        <h2>Os quatro critérios que realmente pesam</h2>
        <h3>1. Detecção por comportamento, não só por assinatura</h3>
        <p>Assinatura é o "retrato falado" de um arquivo já conhecido. Ameaças novas mudam de forma justamente para escapar disso. O que segura um ataque recente é a análise de comportamento: um programa que começa a renomear e criptografar arquivos em massa, ou que tenta se registrar para iniciar com o sistema, precisa ser interrompido mesmo sem estar em nenhuma lista.</p>

        <h3>2. Proteção contra ransomware com controle de pastas</h3>
        <p>É o recurso que mais evita prejuízo real. Ele restringe quais programas podem gravar em pastas de documentos, imagens e área de trabalho. Exige um ajuste inicial — programas legítimos podem ser bloqueados e precisam ser liberados —, mas é a diferença entre um susto e a perda de anos de arquivos.</p>

        <h3>3. Impacto no desempenho</h3>
        <p>Uma suíte pesada em um computador com disco mecânico e 4 GB de memória transforma segurança em lentidão, e o desfecho previsível é o usuário desativando tudo. Em máquinas antigas, uma proteção leve que permanece ligada vale mais do que uma completa que será desligada na primeira semana.</p>

        <h3>4. Transparência de quem publica</h3>
        <p>Fabricante identificável, política de privacidade legível, canal de suporte e presença em testes independentes de laboratórios reconhecidos. Programa distribuído por site de download genérico, sem página oficial própria, não entra na lista de candidatos.</p>

        <h2>Gratuito ou pago: onde está a fronteira</h2>
        <p>Para uso doméstico comum — navegação, streaming, banco, estudo, home office com documentos —, a proteção nativa do sistema somada a atualizações em dia e a um navegador atualizado cobre a maior parte dos cenários. O custo aqui é de disciplina, não de licença.</p>
        <p>A versão paga passa a fazer sentido em situações específicas:</p>
        <ul>
          <li>Vários computadores para administrar, com necessidade de visão central do que está acontecendo.</li>
          <li>Uso profissional com dados de terceiros, em que a indisponibilidade tem custo direto.</li>
          <li>Ambiente com muitos usuários no mesmo equipamento, inclusive crianças e adolescentes.</li>
          <li>Histórico de infecções repetidas, que indica necessidade de camadas extras enquanto os hábitos mudam.</li>
        </ul>
        <p>Não existe licença que compense sistema desatualizado, senha repetida em todos os serviços e download de instalador "ativado" de origem desconhecida. Essa é a ordem de prioridade — ferramenta depois de hábito.</p>

        <h2>Recursos que soam bem e merecem leitura atenta</h2>
        <ul>
          <li><strong>Otimizador e limpador de registro:</strong> costuma entregar ganho imperceptível e, em alguns casos, remove entradas úteis. Não é motivo para escolher um pacote.</li>
          <li><strong>VPN inclusa:</strong> útil em rede pública, mas a qualidade varia muito entre fabricantes e o limite de tráfego do plano básico costuma ser baixo.</li>
          <li><strong>Gerenciador de senhas:</strong> pode ser um bom recurso, desde que você saiba como exportar os dados caso decida trocar de fornecedor.</li>
          <li><strong>Extensões de navegador:</strong> instale apenas a oficial do fabricante e apenas se for usar. Cada extensão amplia a superfície de acesso ao que você digita.</li>
        </ul>

        <h2>Como reconhecer um falso antivírus</h2>
        <p>O golpe mais comum não invade o computador: ele convence o usuário a instalar. A imagem de capa deste guia mostra exatamente esse padrão — uma tela alarmante afirmando que a máquina está infectada. Os sinais que se repetem:</p>
        <ul>
          <li>Janela do navegador em tela cheia dizendo que "vírus foram detectados agora" e exibindo contagem regressiva.</li>
          <li>Número de telefone para "suporte imediato" — nenhum fabricante de antivírus faz isso por pop-up.</li>
          <li>Verificação que "roda" dentro de uma página web. Nenhum site consegue varrer o seu disco.</li>
          <li>Pedido de pagamento por link para "liberar a limpeza".</li>
          <li>Programa que se instala sem pedir confirmação e depois resiste à desinstalação.</li>
        </ul>
        <p>Se a tela apareceu no navegador, feche a janela pelo Gerenciador de Tarefas e não clique em nada dentro dela. Se um programa já foi instalado, o caminho é remoção assistida e verificação do que mais entrou junto — normalmente vem acompanhado de adware e de sequestro da página inicial.</p>

        <h2>Erros de instalação que enfraquecem a proteção</h2>
        <ol>
          <li><strong>Dois antivírus ativos ao mesmo tempo.</strong> Eles disputam os mesmos arquivos, geram falsos positivos e derrubam o desempenho. Um em tempo real; qualquer segundo programa apenas sob demanda.</li>
          <li><strong>Baixar de site agregador.</strong> Sempre pelo domínio oficial do fabricante, digitado à mão ou vindo de resultado orgânico verificado.</li>
          <li><strong>Aceitar o instalador completo sem ler.</strong> É onde entram barras de ferramentas e trocas de buscador padrão.</li>
          <li><strong>Desligar a proteção para instalar algo que ela bloqueou.</strong> Se foi bloqueado, o motivo merece verificação antes da exceção.</li>
          <li><strong>Ignorar a fila de atualizações do sistema.</strong> Boa parte das infecções explora falha corrigida meses antes.</li>
        </ol>

        <h2>O que fazer quando a suspeita já existe</h2>
        <p>Se o computador apresenta comportamento estranho, o primeiro passo é diagnóstico, não instalação de mais programas. Vale conferir os sinais reunidos em <Link to="/blog/como-saber-se-pc-tem-virus-malware">como saber se o PC tem vírus ou malware</Link> e, se houver arquivos importantes envolvidos, garantir cópia antes de qualquer limpeza — o roteiro está em <Link to="/blog/backup-como-proteger-seus-arquivos">backup: como proteger seus arquivos</Link>.</p>
        <p>Quando a infecção já alterou navegador, tarefas agendadas ou serviços do sistema, a remoção manual passa a exigir método. Nesses casos, a <Link to="/servicos/remocao-de-virus">remoção de vírus e malware</Link> inclui verificação do que ficou para trás, e a <Link to="/servicos/formatacao">formatação com reinstalação do sistema</Link> entra em cena quando o estrago compromete componentes do próprio Windows. Antes de decidir, entenda o critério em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Mantenha o sistema atualizado, use a proteção nativa como base, avalie uma solução paga apenas diante de necessidade concreta, desconfie de qualquer aviso que apareça dentro do navegador e nunca mantenha dois antivírus disputando o mesmo computador. Essa combinação resolve a maioria dos casos que chegariam à bancada como "peguei um vírus".</p>
      </>
    ),
  },
  "dicas-manter-notebook-funcionando-bem": {
    title: "Dicas Para Manter o Notebook Funcionando Bem (E Evitar Assistência)",
    excerpt:
      "Cuidados simples que aumentam a vida útil do notebook: limpeza, bateria, armazenamento, temperaturas, atualizações e hábitos que evitam travamentos.",
    date: "2024-02-01",
    readTime: "6 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">
          Notebook é prático, mas sofre com calor, poeira e falta de manutenção. Com alguns hábitos simples
          você reduz travamentos, aumenta a vida útil e evita gastos com conserto.
        </p>

        <h2>1) Use em superfície rígida (cama e sofá são vilões)</h2>
        <p>
          Quando você usa o notebook em tecido, as entradas/saídas de ar ficam bloqueadas e a temperatura
          sobe. Calor constante causa queda de desempenho e pode danificar componentes.
        </p>

        <h2>2) Controle o armazenamento (disco cheio deixa tudo lento)</h2>
        <ul>
          <li>Mantenha pelo menos <strong>15–20%</strong> do disco livre</li>
          <li>Remova programas que você não usa</li>
          <li>Organize downloads e mova arquivos pesados para nuvem/HD externo</li>
        </ul>

        <h2>3) Atualize Windows, drivers e navegador</h2>
        <p>
          Atualizações corrigem falhas e melhoram estabilidade. Navegador atualizado reduz risco de golpes e
          melhora performance.
        </p>

        <h2>4) Cuidado com carregador e bateria</h2>
        <ul>
          <li>Use carregador original ou compatível de boa procedência</li>
          <li>Evite aquecer a bateria (deixe o notebook ventilado)</li>
          <li>Se a bateria estufar, pare de usar e procure assistência imediatamente</li>
        </ul>

        <h2>5) Limpeza preventiva e pasta térmica (quando faz sentido)</h2>
        <p>
          Se a ventoinha fica muito barulhenta ou o notebook esquenta demais, pode ser hora de
          <strong> limpeza interna</strong> e, dependendo do caso, troca de pasta térmica.
        </p>

        <h2>6) A melhor melhoria custo-benefício: SSD</h2>
        <p>
          Se o notebook ainda usa HD, trocar por SSD costuma dar o maior ganho de velocidade.
          O sistema inicia mais rápido e programas abrem quase instantaneamente.
        </p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Seu notebook está lento ou esquentando?</h3>
          <p className="text-muted-foreground mb-0">
            A gente faz diagnóstico, limpeza preventiva, upgrade (SSD/RAM) e ajustes para deixar o notebook
            estável e rápido — com orientação clara do que vale a pena fazer.
          </p>
        </div>
      </>
    ),
  },
  "como-deixar-computador-mais-rapido": {
    title: "Como Deixar o Computador Mais Rápido: 7 Dicas Práticas",
    excerpt: "Seu PC está lento? Descubra 7 técnicas simples que você pode aplicar hoje mesmo para melhorar a velocidade do seu computador sem gastar nada.",
    date: "2024-01-10",
    readTime: "5 min",
    category: "Dicas",
    content: (
      <>
        <p className="lead">Se você está cansado de esperar o computador ligar ou programas demorarem para abrir, este artigo é para você. Veja 7 dicas práticas que podem ser aplicadas hoje mesmo.</p>
        
        <h2>1. Desative Programas na Inicialização</h2>
        <p>Muitos programas se configuram para iniciar junto com o Windows, deixando o boot mais lento. Abra o Gerenciador de Tarefas (Ctrl+Shift+Esc), vá em "Inicializar" e desative os programas que não precisa abrir automaticamente.</p>
        
        <h2>2. Limpe Arquivos Temporários</h2>
        <p>O Windows acumula arquivos temporários que ocupam espaço e podem deixar o sistema lento. Use o "Limpeza de Disco" (digite na busca do Windows) para remover esses arquivos com segurança.</p>
        
        <h2>3. Desinstale Programas que Não Usa</h2>
        <p>Vá em Configurações {'>'} Aplicativos e remova programas que você não utiliza mais. Além de liberar espaço, alguns podem estar rodando processos em segundo plano.</p>
        
        <h2>4. Verifique se Há Vírus</h2>
        <p>Malwares consomem recursos do computador. Execute uma verificação completa com o Windows Defender ou um antivírus de sua confiança.</p>
        
        <h2>5. Atualize Drivers e Windows</h2>
        <p>Drivers desatualizados podem causar problemas de desempenho. Mantenha o Windows e os drivers sempre atualizados através do Windows Update.</p>
        
        <h2>6. Verifique o Espaço em Disco</h2>
        <p>Um disco muito cheio prejudica a performance. Idealmente, mantenha pelo menos 15-20% do disco livre. Se necessário, mova arquivos para um HD externo ou nuvem.</p>
        
        <h2>7. Considere um Upgrade de Hardware</h2>
        <p>Se seu computador tem mais de 5 anos, pode ser hora de um upgrade. Adicionar mais memória RAM ou trocar o HD por um SSD pode fazer seu PC parecer novo.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Ainda está lento?</h3>
          <p className="text-muted-foreground mb-0">Se após seguir essas dicas o computador continuar lento, pode haver um problema mais sério. Um técnico especializado pode fazer um diagnóstico completo e identificar a causa.</p>
        </div>
      </>
    ),
  },
  "sinais-computador-com-virus": {
    title: "5 Sinais de Que Seu Computador Está com Vírus",
    excerpt: "Aprenda a identificar os principais sintomas de uma infecção por vírus ou malware e saiba quando é hora de procurar um técnico especializado.",
    date: "2024-01-08",
    readTime: "4 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Vírus e malwares evoluem constantemente, mas alguns sintomas clássicos continuam sendo bons indicadores de infecção. Conheça os principais sinais.</p>
        
        <h2>1. Lentidão Repentina</h2>
        <p>Se o computador que funcionava bem começou a ficar lento do dia para a noite, pode ser sinal de malware consumindo recursos do sistema em segundo plano.</p>
        
        <h2>2. Pop-ups e Propagandas Estranhas</h2>
        <p>Janelas de propaganda aparecendo mesmo quando você não está navegando, ou anúncios diferentes dos habituais em sites conhecidos, são sinais clássicos de adware.</p>
        
        <h2>3. Programas Desconhecidos</h2>
        <p>Note programas que você não lembra de ter instalado? Barras de ferramentas no navegador? Isso indica que algum software malicioso pode ter se instalado sem seu conhecimento.</p>
        
        <h2>4. Redirecionamentos no Navegador</h2>
        <p>Ao pesquisar no Google você é redirecionado para sites estranhos? Sua página inicial mudou sozinha? Esses são sinais de sequestro de navegador.</p>
        
        <h2>5. Arquivos Desaparecendo ou Criptografados</h2>
        <p>Este é o sinal mais grave. Se seus arquivos sumiram ou aparece uma mensagem pedindo pagamento para recuperá-los, você pode ter sido vítima de ransomware.</p>
        
        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">⚠️ Atenção</h3>
          <p className="text-muted-foreground mb-0">Se você identificou algum desses sinais, evite fazer transações bancárias ou digitar senhas importantes até resolver o problema. Um técnico pode remover as ameaças e garantir que seus dados estejam seguros.</p>
        </div>
      </>
    ),
  },
  "quando-trocar-hd-por-ssd": {
    title: "Vale a pena trocar o HD por SSD? Como avaliar o upgrade",
    excerpt: "O SSD acelera a inicialização e a abertura de programas, mas não resolve tudo. Veja o que muda.",
    date: "2024-01-05",
    readTime: "9 min",
    category: "Hardware",
    content: (
      <>
        <p className="lead">Trocar o HD por um SSD é um dos upgrades mais perceptíveis em computadores mais antigos. Ainda assim, não é uma solução para qualquer problema. Vale entender o que realmente muda, o que continua limitado e o que precisa ser avaliado antes de investir.</p>

        <h2>O que muda com o SSD</h2>
        <p>O SSD guarda dados em memória flash, sem partes móveis. Na prática, o que mais se sente:</p>
        <ul>
          <li>Inicialização do sistema mais rápida.</li>
          <li>Programas e arquivos abrindo mais rápido.</li>
          <li>Menos travamentos ligados à leitura lenta do disco.</li>
          <li>Funcionamento silencioso e mais resistente a solavancos.</li>
        </ul>

        <h2>O que o SSD não muda</h2>
        <p>O SSD acelera o armazenamento, mas não substitui outros componentes:</p>
        <ul>
          <li>Se falta memória (RAM), o sistema ainda vai sofrer com muitos programas abertos.</li>
          <li>Um processador muito antigo continua sendo o limite em tarefas pesadas.</li>
          <li>Lentidão por malware ou sistema corrompido não some só com o disco novo.</li>
          <li>Não é realista esperar que qualquer equipamento fique como um modelo atual.</li>
        </ul>

        <h2>Compatibilidade: o que verificar</h2>
        <ul>
          <li><strong>Interface:</strong> há SSDs SATA (formato 2,5") e SSDs NVMe (formato M.2). Nem todo computador aceita NVMe.</li>
          <li><strong>Espaço físico:</strong> notebooks finos podem ter só um slot; alguns aceitam SSD e HD juntos.</li>
          <li><strong>Capacidade:</strong> escolha conforme o volume dos seus arquivos, não só pelo preço.</li>
        </ul>
        <p>Essa checagem depende do modelo. Quando há dúvida, confirmar o slot e a interface antes de comprar evita frustração.</p>

        <h2>Clonar ou instalar do zero?</h2>
        <p>É possível clonar o sistema atual para o SSD ou fazer uma instalação limpa. Clonar mantém tudo como está — inclusive eventuais problemas de um sistema já corrompido. A instalação limpa costuma deixar o funcionamento mais estável, mas exige reinstalar programas. Em ambos os casos, o disco antigo pode estar desgastado, então <strong>fazer backup antes é indispensável</strong>.</p>

        <h2>Antes de decidir</h2>
        <p>Se o HD atual apresenta ruídos, cliques ou erros de leitura, trate isso como sinal de alerta e priorize o backup dos dados. Avaliar o estado do disco atual e o restante do hardware ajuda a decidir se o SSD sozinho resolve ou se faz mais sentido dentro de uma manutenção completa.</p>

        <h2>SATA, M.2 e NVMe: o que muda na prática</h2>
        <p>Nem todo SSD se conecta da mesma forma, e essa diferença define tanto a compatibilidade quanto o ganho percebido. O SSD SATA de 2,5" usa o mesmo cabo e o mesmo encaixe de um HD de notebook, o que o torna a troca mais direta em máquinas antigas. O formato M.2 dispensa cabos e é parafusado direto na placa — mas exige que a placa tenha o slot correspondente. Dentro do M.2 ainda existem dois padrões distintos de comunicação: SATA e NVMe.</p>
        <p>Para uso doméstico e de escritório, a diferença mais sentida é a primeira: sair de HD mecânico para qualquer SSD. A troca de um SSD SATA por um NVMe entrega números melhores em transferências grandes, mas o ganho é discreto em tarefas cotidianas como abrir o sistema, o navegador e um editor de textos. Vale conferir antes:</p>
        <ul>
          <li>Se a placa possui slot M.2 e qual padrão ele aceita (SATA, NVMe ou ambos).</li>
          <li>Se há espaço físico e suporte para manter o disco antigo como armazenamento secundário.</li>
          <li>Se a máquina tem limitações de firmware que impedem inicializar por NVMe.</li>
          <li>Se o objetivo é desempenho ou apenas mais espaço — as duas metas pedem escolhas diferentes.</li>
        </ul>

        <h2>Sinais de que o disco atual já está falhando</h2>
        <p>Existe uma diferença importante entre "quero mais desempenho" e "meu disco está morrendo". No segundo caso, o upgrade deixa de ser opcional e vira urgência de preservação de dados, porque a janela para copiar arquivos com segurança pode ser curta.</p>
        <ul>
          <li>Ruídos repetitivos de clique ou zumbido vindos do disco mecânico.</li>
          <li>Travamentos longos com o cursor parado ao abrir pastas específicas.</li>
          <li>Arquivos que somem, abrem corrompidos ou não copiam até o fim.</li>
          <li>Reinicializações inesperadas e mensagens do sistema sobre erro de disco.</li>
          <li>Verificações de integridade que ficam cada vez mais frequentes ao ligar o computador.</li>
        </ul>
        <p>Diante desses sinais, o passo mais seguro é reduzir o uso do equipamento e priorizar a cópia dos dados antes de qualquer clonagem. Clonar um disco já com setores defeituosos pode transportar o problema para o SSD novo — ou interromper a cópia no meio, deixando o sistema inutilizável. Em casos assim, instalar o sistema do zero no SSD e recuperar os arquivos em separado costuma ser mais previsível.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer avaliar se o upgrade compensa?</h3>
          <p className="text-muted-foreground mb-3">Verificamos a compatibilidade, o estado do disco atual e o restante do hardware antes de qualquer troca.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/upgrade-ssd-ram" className="text-accent">Upgrade de SSD e memória</Link></li>
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">Manutenção de notebook</Link></li>
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">Manutenção de computador</Link></li>
            <li><Link to="/servicos/formatacao" className="text-accent">Formatação e instalação do sistema</Link></li>
          </ul>
        </div>
      </>
    ),
  },
  "backup-como-proteger-seus-arquivos": {
    title: "Como evitar perder arquivos: guia de backup preventivo",
    excerpt: "Backup não é copiar arquivos para outra pasta do mesmo disco. Entenda cópias local, externa e em nuvem.",
    date: "2024-01-02",
    readTime: "9 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Fotos, documentos e trabalho podem sumir em segundos por falha de disco, vírus ou descuido. Backup preventivo é o que separa um susto de um prejuízo. E, ao contrário do que muita gente pensa, mover arquivos para outra pasta do mesmo disco <strong>não é backup</strong> — se o disco falhar, tudo vai junto.</p>

        <h2>O que conta como backup de verdade</h2>
        <p>Backup é ter cópias em lugares independentes do original. Quanto mais separados os riscos, melhor:</p>
        <ul>
          <li><strong>Cópia local:</strong> em outro disco do mesmo computador — protege de erro humano, mas não de furto ou incêndio.</li>
          <li><strong>Cópia externa:</strong> em HD ou SSD externo guardado desconectado, fora do computador.</li>
          <li><strong>Cópia em nuvem:</strong> acessível de qualquer lugar e fora de casa fisicamente.</li>
        </ul>
        <p>Manter cópias em mídias diferentes, com pelo menos uma fora do local, reduz bastante o risco de perder tudo de uma vez. Trate isso como orientação, não como regra rígida — o essencial é ter mais de uma cópia independente.</p>

        <h2>Sincronização não é sempre backup</h2>
        <p>Pastas sincronizadas com a nuvem são úteis, mas se um arquivo é apagado ou criptografado, a alteração pode se espalhar para todas as cópias sincronizadas. Um backup real guarda versões que não são sobrescritas automaticamente.</p>

        <h2>Com que frequência</h2>
        <p>Depende de quanto os dados mudam e do quanto você não pode perdê-los. Arquivos de trabalho que mudam todo dia pedem cópias frequentes; fotos que raramente mudam podem ser copiadas de tempos em tempos. O que importa é a rotina existir.</p>

        <h2>Teste de restauração</h2>
        <p>Backup que nunca foi testado pode não servir na hora da emergência. De tempos em tempos, abra um arquivo restaurado da cópia para confirmar que ela realmente funciona.</p>

        <h2>Cuidados de segurança</h2>
        <ul>
          <li>Um disco externo permanentemente conectado também pode ser atingido por ransomware — mantenha ao menos uma cópia desconectada.</li>
          <li>Para dados sensíveis, considere criptografia e cuidado com onde as cópias ficam guardadas.</li>
          <li>Guarde senhas e acessos em um gerenciador confiável, não em arquivos soltos.</li>
          <li>Dados empresariais costumam ter exigências próprias de retenção e privacidade.</li>
        </ul>

        <h2>Backup preventivo x recuperação de dados</h2>
        <p>São coisas diferentes. Backup é o que você faz <strong>antes</strong> de qualquer problema. Recuperação é tentar resgatar dados <strong>depois</strong> de uma falha — um processo mais incerto, que nem sempre traz tudo de volta. Por isso o backup preventivo é sempre o caminho mais seguro.</p>

        <h2>A regra 3-2-1 aplicada à rotina de casa</h2>
        <p>A referência mais usada em proteção de dados resume três exigências simples: manter três cópias do que importa, em dois tipos diferentes de mídia, com uma delas fora do local onde está o computador. Em casa, isso não exige estrutura corporativa. Uma configuração comum é o arquivo original no computador, uma cópia em disco externo guardado em outro cômodo e uma terceira em nuvem confiável.</p>
        <p>O ponto que costuma falhar é o "fora do local". Um disco externo permanentemente conectado ao mesmo computador está exposto aos mesmos riscos do original: sobretensão elétrica, furto, incêndio e criptografia por ransomware. Desconectar o disco após a cópia é uma medida barata e eficaz.</p>
        <ul>
          <li>Defina o que é insubstituível: documentos, fotos, trabalhos, arquivos de projetos.</li>
          <li>Separe o que pode ser rebaixado a "recuperável": instaladores, filmes, arquivos temporários.</li>
          <li>Registre onde cada cópia está — um backup que ninguém encontra não é backup.</li>
          <li>Verifique o espaço livre antes de cada rodada para não gerar cópias incompletas.</li>
        </ul>

        <h2>Backup em pequenos negócios: onde a rotina costuma quebrar</h2>
        <p>Em escritórios pequenos, o backup normalmente existe no papel e falha em três pontos previsíveis: depende de uma pessoa lembrar, cobre só uma máquina e nunca foi testado. Quando o sistema de gestão, as notas fiscais e a base de clientes estão em um único computador, a interrupção deixa de ser inconveniente e passa a impedir o faturamento.</p>
        <p>Uma rotina mínima e realista costuma incluir cópia automática diária dos dados do sistema de gestão, cópia semanal completa em mídia que fica desconectada e um responsável nomeado por conferir o resultado. Também é importante considerar quem tem acesso: credenciais compartilhadas entre toda a equipe tornam impossível saber o que foi alterado ou apagado, e ampliam o estrago de uma infecção.</p>
        <p>Se o negócio depende de dados que não podem ser reconstruídos manualmente, o teste de restauração deveria acontecer em intervalo definido — restaurar um arquivo aleatório e confirmar que ele abre é o que transforma uma pasta de cópias em um plano de continuidade.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa organizar um backup confiável?</h3>
          <p className="text-muted-foreground mb-3">Ajudamos a montar uma rotina adequada ao seu uso e a avaliar riscos de perda de dados.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">Recuperação de dados</Link></li>
            <li><Link to="/servicos/remocao-de-virus" className="text-accent">Remoção de vírus e malware</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnóstico técnico</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="backup-como-proteger-seus-arquivos" />
      </>

    ),
  },
  "notebook-superaquecendo-o-que-fazer": {
    title: "Notebook superaquecendo: sinais, prevenção e o que fazer",
    excerpt: "Aquecimento normal ou comportamento de risco? Veja o que observar no superaquecimento, o que fazer com segurança e os sinais que pedem desligar o equipamento.",
    date: "2023-12-28",
    readTime: "9 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Todo computador esquenta — o problema é quando o calor deixa de ser normal e vira queda de desempenho, desligamento repentino ou risco para os componentes. Este guia ajuda a separar aquecimento esperado de superaquecimento real, mostra o que dá para observar em casa com segurança e indica o momento em que insistir no uso sai mais caro do que parar.</p>

        <h2>Resposta curta</h2>
        <p>Aquecimento com ventoinha acelerada durante tarefas pesadas é esperado. Preocupe-se quando o calor aparece em tarefas leves, quando o desempenho cai poucos minutos depois de ligar, quando o equipamento desliga sozinho ou quando surge cheiro, ruído estranho, bateria deformada ou calor que impede o toque. Nesses casos, o caminho é parar o uso e pedir avaliação — não é ajuste de configuração.</p>

        <h2>Como o calor é dissipado (e onde o processo falha)</h2>
        <p>O calor gerado pelo processador e pela placa de vídeo passa por uma interface térmica, segue por tubos de cobre até um radiador e é expulso pela ventoinha através das grades de saída. Basta um elo dessa cadeia perder eficiência para a temperatura subir: interface ressecada transfere pior, radiador entupido por poeira e fiapos reduz o fluxo, ventoinha com rolamento gasto gira menos do que deveria e grade obstruída faz o ar quente circular dentro do gabinete.</p>
        <p>Quando o sensor interno detecta temperatura alta demais, o próprio sistema reduz a frequência de trabalho para se proteger. É por isso que muita gente descreve o sintoma como “ficou lento”, sem associar ao calor: a máquina não travou, ela se limitou. Se a temperatura continua subindo, o desligamento abrupto é o último recurso de proteção.</p>

        <h2>Aquecimento normal x superaquecimento</h2>
        <ul>
          <li>Normal: ventoinha acelera em jogos, edição de vídeo, renderização, videochamada longa ou atualização do sistema, e volta ao ritmo comum depois.</li>
          <li>Normal: base morna no notebook, com o ar saindo quente pela lateral ou pelo fundo.</li>
          <li>Anormal: queda de desempenho depois de alguns minutos ligado, mesmo com poucos programas abertos.</li>
          <li>Anormal: desligamento repentino durante o uso, sem tela de erro.</li>
          <li>Anormal: base muito quente em tarefas leves, como navegar ou digitar.</li>
          <li>Anormal: ventoinha sempre no máximo — ou silêncio total, quando antes havia ruído.</li>
          <li>Anormal: travamento de imagem, artefatos na tela ou reinício em ciclos.</li>
        </ul>

        <h2>Causas mais comuns no dia a dia</h2>
        <p>Poeira acumulada no radiador é a campeã, principalmente em casas com animais, obra por perto ou uso do notebook direto no chão. Depois vem o bloqueio de fluxo: usar o equipamento sobre cama, sofá, almofada ou colo fecha justamente as entradas de ar do fundo. Interface térmica ressecada aparece em máquinas com anos de uso — não existe um intervalo universal para a troca, ela depende do modelo, do ambiente e da carga.</p>
        <p>Há ainda causas de software: um processo travado consumindo processador o tempo todo, atualização rodando em segundo plano, extensão de navegador problemática ou infecção ativa mantendo o equipamento em carga máxima sem que você perceba. Nesses casos o calor é consequência, e limpar o hardware resolve pouco enquanto a origem continuar rodando.</p>
        <p>Ambiente também pesa: verão curitibano, cômodo abafado, móvel fechado sem circulação ou luz do sol batendo direto no equipamento elevam a temperatura de partida e reduzem a margem de trabalho.</p>

        <h2>O que você pode verificar com segurança</h2>
        <ul>
          <li>Use o equipamento sobre superfície dura e plana, com as saídas de ar livres.</li>
          <li>Um suporte que eleve a traseira do notebook melhora a entrada de ar.</li>
          <li>Observe as grades: se estiverem visivelmente cobertas de poeira, é sinal de manutenção pendente.</li>
          <li>Repare quando o calor aparece — em tarefas pesadas ou já no uso comum — e anote o comportamento.</li>
          <li>Feche programas pesados que ficaram abertos e verifique se algum processo mantém o uso alto sem motivo.</li>
          <li>Registre mensagens de erro e o horário dos desligamentos; isso encurta o diagnóstico depois.</li>
        </ul>

        <h2>O que não fazer</h2>
        <p>Não abra o equipamento ligado ou conectado à tomada. Não use secador, ar comprimido em jato forte direto na ventoinha travada, gelo, freezer ou qualquer fonte de calor ou frio externa. Não fure, dobre nem pressione bateria estufada. Não retire a proteção térmica de fábrica achando que “vai ventilar melhor” e não deixe o equipamento rodando em carga máxima esperando que o problema se resolva sozinho.</p>
        <p>Limpeza interna e troca de interface térmica exigem desmontagem, torque correto e recolocação de conectores frágeis. Feito sem prática, o conserto vira dano — flat de tela partido, parafuso perdido e trilha rompida são acidentes comuns nesse tipo de tentativa.</p>

        <div className="bg-destructive/10 rounded-xl p-6 my-8 border border-destructive/20">
          <h3 className="text-destructive font-bold mb-2">Desligue imediatamente se notar</h3>
          <ul className="text-muted-foreground mb-0">
            <li>Cheiro de queimado, fumaça ou estalos.</li>
            <li>Bateria estufada, deformada ou empurrando o teclado / a base.</li>
            <li>Aquecimento extremo que impede o toque.</li>
          </ul>
          <p className="text-muted-foreground mt-3 mb-0">Nesses casos: desconecte da tomada, não tente resfriar por fora e não abra o equipamento. Procure avaliação técnica antes de voltar a usar.</p>
        </div>

        <h2>Limites deste guia</h2>
        <p>Não existe temperatura única de risco válida para todos os modelos, e leitura de sensor isolada não fecha diagnóstico: dois equipamentos com o mesmo número na tela podem ter estados internos completamente diferentes. Só a avaliação presencial mostra o estado do radiador, da ventoinha e da interface térmica, e só ela indica se o problema é térmico, de alimentação ou de placa. Este conteúdo orienta a observação — ele não substitui o diagnóstico do equipamento.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se o cuidado com ventilação e o encerramento de programas pesados não mudaram nada, se há desligamento por calor ou se a queda de desempenho já atrapalha o trabalho, é hora de avaliação. Adiar costuma sair mais caro: calor constante castiga bateria, armazenamento e solda, e transforma uma limpeza simples em troca de peça. Se o equipamento guarda arquivos sem cópia, mantenha o backup em dia antes de qualquer intervenção.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Equipamento esquentando demais?</h3>
          <p className="text-muted-foreground mb-3">Avaliamos ventilação, comportamento térmico e estado interno antes de recomendar qualquer serviço.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/manutencao-de-notebook" className="text-accent">Manutenção de notebook: limpeza interna e avaliação térmica</Link></li>
            <li><Link to="/servicos/manutencao-de-computador" className="text-accent">Manutenção de computador de mesa</Link></li>
            <li><Link to="/problemas/computador-lento" className="text-accent">Quando a lentidão vem do calor: investigar o sintoma</Link></li>
            <li><Link to="/atendimento-domicilio" className="text-accent">Atendimento técnico no endereço</Link></li>
            <li><Link to="/como-funciona" className="text-accent">Como funciona o atendimento, do diagnóstico à entrega</Link></li>
          </ul>
        </div>
      </>
    ),
  },

  "wifi-lento-como-melhorar": {
    title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal",
    excerpt: "Dicas práticas para melhorar a cobertura e velocidade da sua internet sem fio. Do posicionamento do roteador às configurações ideais.",
    date: "2023-12-25",
    readTime: "5 min",
    category: "Redes",
    content: (
      <>
        <p className="lead">A internet funciona bem perto do roteador, mas some em outros cômodos? Veja como resolver problemas de cobertura Wi-Fi.</p>
        
        <h2>1. Posicione o Roteador Corretamente</h2>
        <p>O lugar onde o roteador está faz toda diferença:</p>
        <ul>
          <li>Coloque no centro da casa, não em um canto</li>
          <li>Deixe em local alto (prateleira ou parede)</li>
          <li>Evite colocar dentro de armários ou atrás de móveis</li>
          <li>Mantenha longe de micro-ondas, telefones sem fio e outros equipamentos que causam interferência</li>
        </ul>
        
        <h2>2. Escolha o Canal Certo</h2>
        <p>Se muitos vizinhos usam o mesmo canal Wi-Fi, há congestionamento. Acesse as configurações do roteador e troque para um canal menos usado. Aplicativos como "WiFi Analyzer" ajudam a identificar o melhor canal.</p>
        
        <h2>3. Use a Frequência 5GHz</h2>
        <p>Roteadores modernos oferecem duas frequências:</p>
        <ul>
          <li><strong>2.4GHz:</strong> Alcança mais longe, mas é mais lenta e sofre mais interferência</li>
          <li><strong>5GHz:</strong> Mais rápida, menos interferência, mas alcance menor</li>
        </ul>
        <p>Use 5GHz onde o sinal chega bem e 2.4GHz nos cômodos mais distantes.</p>
        
        <h2>4. Considere um Repetidor ou Mesh</h2>
        <p>Se a casa é grande ou tem muitas paredes, um repetidor Wi-Fi ou sistema mesh pode ser necessário para cobrir todos os ambientes.</p>
        
        <h2>5. Atualize o Roteador</h2>
        <p>Roteadores muito antigos podem não suportar velocidades altas ou ter tecnologia ultrapassada. Se seu roteador tem mais de 4-5 anos, considere trocar por um modelo mais moderno.</p>
        
        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de ajuda com a rede?</h3>
          <p className="text-muted-foreground mb-0">Um técnico pode analisar a cobertura da sua casa, configurar o roteador corretamente e instalar equipamentos adicionais se necessário.</p>
        </div>
      </>
    ),
  },

  "erros-comuns-upgrade-computador": {
    title: "5 Erros Comuns ao Fazer Upgrade no Computador (e Como Evitar Prejuízo)",
    excerpt: "Comprar RAM incompatível, instalar SSD errado, favaliar o valor peças no slot — veja os erros que causam prejuízo.",
    date: "2026-04-06",
    readTime: "8 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Fazer upgrade no computador pode ser a solução mais inteligente para ganhar desempenho sem trocar a máquina. Mas quando feito sem conhecimento técnico, o resultado pode ser <strong>prejuízo financeiro e até danos permanentes</strong>. Veja os 5 erros mais comuns que encontramos no dia a dia.</p>

        <h2>1. Comprar RAM Incompatível</h2>
        <p>Nem toda memória RAM serve em qualquer computador. É preciso verificar o <strong>tipo (DDR3, DDR4, DDR5)</strong>, a frequência suportada pela placa-mãe e o número máximo de slots. Muita gente compra DDR4 para um notebook que só aceita DDR3 — e descobre tarde demais que não encaixa.</p>
        <p><strong>Como evitar:</strong> Consulte o manual da placa-mãe ou use ferramentas como CPU-Z para verificar as especificações antes de comprar.</p>

        <h2>2. Instalar SSD Sem Verificar a Interface</h2>
        <p>Existem SSDs SATA (2.5") e SSDs NVMe (M.2). Nem toda placa-mãe tem slot M.2, e mesmo as que têm podem suportar apenas SATA no slot M.2, não NVMe. Instalar o tipo errado significa que o SSD simplesmente <strong>não será reconhecido</strong>.</p>
        <p><strong>Como evitar:</strong> Verifique no manual se há slot M.2 e se ele suporta NVMe ou apenas SATA.</p>

        <h2>3. Favaliar o valor Peças no Slot Errado</h2>
        <p>Memória DDR4 não encaixa em slot DDR3 — os encaixes são diferentes propositalmente. Mas vemos casos de clientes que <strong>favaliar o valoram a peça e quebraram o slot ou a própria memória</strong>. O mesmo vale para conectores de energia, cabos SATA e até ventoinhas.</p>
        <p><strong>Regra de ouro:</strong> Se não encaixou com pressão leve, está errado. Nunca force.</p>

        <h2>4. Não Reinstalar o Windows Após Trocar HD por SSD</h2>
        <p>Alguns usuários copiam o HD antigo para o SSD novo usando programas de clonagem — mas o Windows pode não iniciar corretamente ou ficar instável. A clonagem funciona em muitos casos, mas em outros traz <strong>erros de driver, tela azul e lentidão inesperada</strong>.</p>
        <p><strong>Recomendação:</strong> Sempre que possível, faça uma instalação limpa do Windows no SSD novo. É mais rápido e confiável.</p>

        <h2>5. Ignorar a Fonte de Alimentação</h2>
        <p>Ao adicionar uma placa de vídeo potente, é preciso uma fonte que suporte a potência necessária. Uma fonte fraca causa <strong>desligamentos aleatórios, travamentos e pode até queimar componentes</strong>. Muitos PCs de fábrica vêm com fontes de 300W — insuficiente para GPUs dedicadas.</p>
        <p><strong>Dica:</strong> Calcule a potência necessária antes e invista em uma fonte de qualidade (80 Plus certificada).</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Fazer Upgrade Com Segurança?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico analisa seu equipamento, indica as peças compatíveis e faz a instalação profissional. Sem risco de prejuízo. Atendemos em Curitiba e região.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/servicos/upgrade-ssd-ram" className="text-accent">Upgrade de SSD e memória RAM</Link></li>
          <li><Link to="/quando-nao-compensa" className="text-accent">Quando não compensa reparar</Link></li>
        </ul>
      </>
    ),
  },

  "quando-trocar-computador-ou-reparar": {
    title: "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia Técnico)",
    excerpt: "PC antigo, lento ou com defeito? Descubra os critérios técnicos que definem se vale investir no reparo ou se é hora de partir para um equipamento novo.",
    date: "2026-04-06",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Essa é a dúvida mais comum dos nossos clientes: <strong>"Vale a pena consertar ou é melhor comprar outro?"</strong>. A resposta depende de critérios técnicos e financeiros que vamos detalhar neste guia.</p>

        <h2>Quando Vale a Pena Reparar</h2>
        <ul>
          <li><strong>Processador de até 5 anos:</strong> Intel Core i3/i5/i7 de 8ª geração pra cima ainda são muito úteis</li>
          <li><strong>Custo do reparo até 40% do valor de um novo:</strong> Se o conserto fica abaixo desse limite, compensa</li>
          <li><strong>Problema é específico:</strong> Tela, teclado, SSD, RAM — peças que se trocam facilmente</li>
          <li><strong>O equipamento atende suas necessidades:</strong> Se faz o que você precisa, não há motivo para trocar</li>
        </ul>

        <h2>Quando NÃO Compensa Reparar</h2>
        <ul>
          <li><strong>Processador muito antigo:</strong> Celeron, Pentium ou Core de 2ª/3ª geração</li>
          <li><strong>Placa-mãe com defeito em equipamento antigo:</strong> Placa-mãe nova pode não existir para modelos descontinuados</li>
          <li><strong>Custo do reparo acima de 50-60% do novo:</strong> O investimento não se justifica</li>
          <li><strong>Múltiplos problemas simultâneos:</strong> Placa-mãe + tela + bateria = melhor trocar</li>
        </ul>

        <h2>Análise Custo-Benefício na Prática</h2>
        <p>Notebook i5 de 2019 com HD lento e 4 GB de RAM: trocar por SSD (R$ 200) + 8 GB de RAM (R$ 150) = R$ 350 + mão de obra. Resultado: notebook rodando como novo por menos de R$ 500. <strong>Compensa muito.</strong></p>
        <p>Notebook Celeron de 2015 com tela quebrada: tela nova R$ 400 + mão de obra R$ 150 = R$ 550. E o desempenho continuará ruim. <strong>Não compensa.</strong></p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Dúvida Se Vale Reparar?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico faz o diagnóstico e dá a opinião honesta: se não compensa, a gente avisa. Diagnóstico a partir de R$ 99,99.</p>
        </div>
      </>
    ),
  },

  "manutencao-preventiva-computador-guia": {
    title: "Manutenção Preventiva do Computador: O Guia Que Evita 80% dos Problemas",
    excerpt: "Rotinas simples que prolongam a vida útil do seu PC e evitam chamados técnicos.",
    date: "2026-04-06",
    readTime: "9 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">A maioria dos problemas que resolvemos diariamente poderiam ter sido evitados com <strong>manutenção preventiva simples</strong>. Veja o que fazer para manter seu computador funcionando bem por anos.</p>

        <h2>1. Limpeza Física (a cada 6 meses)</h2>
        <p>Poeira acumulada causa superaquecimento, travamentos e reduz a vida útil dos componentes. Use ar comprimido para limpar as saídas de ar e ventoinhas. Em notebooks, uma limpeza interna profissional a cada 1-2 anos é ideal.</p>

        <h2>2. Mantenha o Windows Atualizado</h2>
        <p>Atualizações corrigem falhas de segurança e melhoram o desempenho. Configure para atualizar automaticamente, mas evite versões major no primeiro mês (espere a estabilização).</p>

        <h2>3. Faça Backup Regularmente</h2>
        <p>HD externo, nuvem (OneDrive, Google Drive) ou ambos. A regra 3-2-1: 3 cópias, em 2 mídias diferentes, 1 fora de casa. <strong>Sem backup, qualquer problema vira catástrofe.</strong></p>

        <h2>4. Use Antivírus Confiável</h2>
        <p>O Windows Defender já é suficiente para a maioria. Mantenha-o ativo e atualizado. Evite instalar dois antivírus ao mesmo tempo — eles conflitam.</p>

        <h2>5. Desinstale Programas Não Usados</h2>
        <p>Programas desnecessários ocupam espaço, consomem recursos e podem ter vulnerabilidades. Remova pelo Painel de Controle o que não usa há mais de 3 meses.</p>

        <h2>6. Monitore a Temperatura</h2>
        <p>Programas como HWMonitor mostram a temperatura em tempo real. CPU acima de 85°C sob carga é preocupante. Acima de 95°C, desligue e procure um técnico.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Manutenção Preventiva Profissional</h3>
          <p className="text-muted-foreground mb-0">Fazemos limpeza interna, troca de pasta térmica, otimização do sistema e verificação completa. Atendimento a domicílio em Curitiba e região.</p>
        </div>
      </>
    ),
  },

  "diagnostico-tecnico-por-que-e-pago": {
    title: "Por Que o Diagnóstico Técnico é Pago? Entenda de Uma Vez",
    excerpt: "Explicamos por que o diagnóstico tem custo, o que ele envolve e como evita prejuízos maiores.",
    date: "2026-04-05",
    readTime: "7 min",
    category: "Atendimento",
    content: (
      <>
        <p className="lead">Muitos clientes perguntam: <strong>"Por que cobram pelo diagnóstico?"</strong>. A resposta é simples: diagnóstico técnico é um serviço especializado que exige conhecimento, ferramentas e tempo.</p>

        <h2>O Que Envolve um Diagnóstico</h2>
        <ul>
          <li>Testes de hardware: memória, HD/SSD, processador, placa de vídeo</li>
          <li>Análise de software: sistema operacional, drivers, malwares</li>
          <li>Verificação de temperatura e voltagem</li>
          <li>Identificação da causa raiz, não apenas do sintoma</li>
          <li>Valor detalhado com opções de solução</li>
        </ul>

        <h2>Por Que Não é Grátis?</h2>
        <p>O diagnóstico é a parte mais importante do atendimento. Um diagnóstico errado leva a reparos desnecessários e prejuízo. O técnico usa anos de experiência e ferramentas especializadas para chegar à causa correta.</p>
        <p><strong>Analogia:</strong> Você não espera que um médico faça exames de graça. O diagnóstico técnico segue a mesma lógica.</p>

        <h2>E Se Eu Aprovar o Serviço?</h2>
        <p>Na maioria dos casos, <strong>o valor do diagnóstico é abatido do serviço</strong>. Ou seja, se você aprovar o reparo, o diagnóstico sai "grátis" na prática.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Diagnóstico Profissional</h3>
          <p className="text-muted-foreground mb-0">A partir de R$ 99,99. Atendimento a domicílio em Curitiba e região metropolitana. Valor abatido em caso de aprovação do serviço.</p>
        </div>
      </>
    ),
  },

  "como-proteger-computador-golpes-internet": {
    title: "Como se proteger de golpes na internet: o que checar antes de clicar",
    excerpt:
      "Phishing, sites clonados, falso suporte técnico e extensões maliciosas: como reconhecer cada padrão, o que verificar antes de clicar e o que fazer nas primeiras horas depois de cair em um golpe.",
    date: "2026-08-12",
    readTime: "12 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Golpe digital raramente depende de uma falha técnica sofisticada. Ele depende de pressa, medo e distração. Quase todos os casos que chegam para atendimento seguem o mesmo roteiro: uma mensagem urgente, um link, uma página parecida com a original e uma senha digitada em lugar errado.</p>

        <h2>Os quatro formatos que mais aparecem</h2>
        <h3>Phishing por e-mail, SMS ou aplicativo de mensagem</h3>
        <p>Mensagem que imita banco, operadora, loja ou órgão público, com aviso de dívida, entrega pendente, benefício disponível ou bloqueio de conta. O objetivo é levar a um formulário de login idêntico ao real. Instituições sérias não pedem senha, código de aplicativo ou dados de cartão por link.</p>

        <h3>Falso suporte técnico</h3>
        <p>Pop-up ou ligação afirmando que o computador está infectado e oferecendo ajuda imediata, geralmente pedindo instalação de um programa de acesso remoto. A partir daí, quem está do outro lado enxerga a tela, acessa o banco aberto e instala o que quiser. Nenhum fabricante de sistema ou de antivírus liga para o usuário oferecendo limpeza.</p>

        <h3>Site clonado em anúncio de busca</h3>
        <p>O endereço aparece no topo dos resultados como anúncio, com layout idêntico ao original e um domínio levemente diferente. É o formato mais eficaz contra quem confia no primeiro link. Para serviços sensíveis, digitar o endereço ou usar um favorito salvo elimina o problema.</p>

        <h3>Extensão e programa "gratuito"</h3>
        <p>Conversor de arquivos, acelerador de downloads, tradutor, cupom automático. Uma extensão com permissão de "ler e alterar dados em todos os sites" enxerga tudo o que é digitado, inclusive senhas e códigos de verificação.</p>

        <h2>O que verificar antes de clicar</h2>
        <ol>
          <li><strong>Leia o domínio de trás para frente.</strong> O que vale é o que está imediatamente antes da primeira barra. Em <code>banco.com.br.seguro-acesso.net</code>, o site é <code>seguro-acesso.net</code>.</li>
          <li><strong>Passe o cursor sobre o link antes de clicar.</strong> No computador, o endereço real aparece no canto da tela; no celular, um toque longo mostra o destino.</li>
          <li><strong>Ignore o cadeado como prova de idoneidade.</strong> Ele indica conexão criptografada, não que o site seja legítimo. Páginas de golpe também têm cadeado.</li>
          <li><strong>Estranhe a urgência.</strong> Prazo de poucos minutos, ameaça de bloqueio e pedido de sigilo são sinais de engenharia social, não de processo real.</li>
          <li><strong>Confirme por outro canal.</strong> Fechou a mensagem e ligou para o número oficial do cartão? O suposto problema costuma desaparecer.</li>
        </ol>

        <h2>As proteções que mais reduzem o estrago</h2>
        <h3>Senha única por serviço</h3>
        <p>O maior multiplicador de dano é a senha repetida: um vazamento em um site pequeno abre e-mail, banco e redes sociais. Um gerenciador de senhas resolve isso sem exigir memória — basta uma frase longa como senha mestra.</p>

        <h3>Verificação em duas etapas onde ela importa</h3>
        <p>Comece pelo e-mail principal, porque é ele que recupera todo o resto. Aplicativo autenticador é preferível ao código por SMS, que fica exposto a golpes de troca de chip. E o código nunca deve ser repassado a ninguém, por nenhum motivo.</p>

        <h3>Conta de uso diário sem privilégio de administrador</h3>
        <p>É a medida menos usada e uma das mais eficazes em computador doméstico. Ela transforma uma instalação silenciosa em um pedido de senha visível.</p>

        <h3>Sistema, navegador e roteador atualizados</h3>
        <p>Grande parte dos ataques em massa depende de falha antiga. Vale lembrar do roteador, que quase nunca recebe atenção: painel com senha de fábrica é porta aberta. O procedimento está em <Link to="/blog/como-configurar-roteador-wifi-iniciantes">como configurar um roteador do zero</Link>.</p>

        <h3>Backup em cópia separada</h3>
        <p>É o que transforma um ataque de ransomware em transtorno em vez de perda definitiva. A cópia precisa ficar desconectada quando não estiver em uso — disco externo permanentemente plugado é criptografado junto.</p>

        <h2>Caiu no golpe: as primeiras horas</h2>
        <ol>
          <li><strong>Desconecte da rede</strong> se houve acesso remoto ou instalação de programa desconhecido. Isso interrompe o que estiver em andamento.</li>
          <li><strong>Troque as senhas de outro dispositivo confiável</strong>, começando pelo e-mail e depois pelos serviços financeiros. Trocar senha na máquina possivelmente comprometida apenas entrega a nova.</li>
          <li><strong>Encerre as sessões ativas</strong> nas contas principais — todos os grandes serviços têm essa opção — e revise dispositivos autorizados.</li>
          <li><strong>Comunique o banco</strong> pelos canais oficiais e registre o ocorrido. Contestação tem prazo, e o registro conta.</li>
          <li><strong>Revise regras de encaminhamento do e-mail.</strong> É comum o invasor criar uma regra que envia cópia de tudo e some com os avisos de segurança.</li>
          <li><strong>Verifique o computador antes de voltar a usá-lo para assuntos sensíveis.</strong> Programa de acesso remoto instalado por terceiros precisa ser localizado e removido.</li>
        </ol>

        <h2>O que não ajuda</h2>
        <ul>
          <li>Instalar vários antivírus ao mesmo tempo depois do susto — eles conflitam e não desfazem o acesso já concedido.</li>
          <li>Confiar em "limpeza" oferecida pelo mesmo pop-up que gerou o problema.</li>
          <li>Formatar imediatamente sem preservar arquivos e sem entender o que aconteceu; parte da evidência se perde.</li>
          <li>Trocar apenas a senha do serviço afetado e manter a mesma combinação nos demais.</li>
        </ul>

        <h2>Quando pedir ajuda técnica</h2>
        <p>Acesso remoto concedido a desconhecido, arquivos que passaram a abrir com extensão estranha, navegador redirecionando sozinho e programas que reaparecem depois de removidos são cenários em que a limpeza superficial não resolve. Nesses casos, a <Link to="/servicos/remocao-de-virus">remoção de vírus e malware</Link> parte de uma varredura do que foi alterado no sistema; se houver arquivos criptografados ou apagados, vale verificar antes o que ainda pode ser preservado em <Link to="/servicos/recuperacao-de-dados">recuperação de dados</Link>. Para escolher a proteção que fica no computador depois da limpeza, veja <Link to="/blog/como-escolher-um-bom-antivirus">como escolher um antivírus</Link>.</p>
      </>
    ),
  },

  "como-instalar-windows-11-pc-antigo": {
    title: "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0",
    excerpt: "Método seguro e testado por técnicos.",
    date: "2024-01-14",
    readTime: "10 min",
    category: "Windows 11",
    content: (
      <>
        <p className="lead">O Windows 11 exige TPM 2.0 e Secure Boot, mas muitos PCs bons não têm esses recursos. Veja como instalar mesmo assim, <strong>de forma segura e testada</strong>.</p>

        <h2>Por Que o Windows 11 Exige TPM 2.0?</h2>
        <p>A Microsoft quer garantir segurança mínima no hardware. O TPM (Trusted Platform Module) é um chip de segurança que protege chaves de criptografia. Mas muitos processadores de 6ª e 7ª geração Intel rodam Windows 11 perfeitamente — só não têm TPM 2.0.</p>

        <h2>Método Oficial (Modificação no Registro)</h2>
        <p>A própria Microsoft disponibiliza uma forma de contornar a verificação:</p>
        <ul>
          <li>Abra o Regedit e navegue até <code>HKEY_LOCAL_MACHINE\SYSTEM\Setup\MoSetup</code></li>
          <li>Crie um valor DWORD chamado <code>AllowUpgradesWithUnsupportedTPMOrCPU</code> = 1</li>
          <li>Execute a instalação normalmente pela ISO montada</li>
        </ul>

        <h2>Método via Rufus (Instalação Limpa)</h2>
        <p>O programa Rufus permite criar um pendrive de instalação que já remove as verificações de TPM, Secure Boot e RAM. É o método mais usado por técnicos.</p>

        <h2>Riscos e Considerações</h2>
        <p>A Microsoft alerta que PCs sem TPM 2.0 podem não receber todas as atualizações futuras. Na prática, até o momento todas as atualizações funcionam normalmente. O risco é baixo, mas existe.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Atualizar Para o Windows 11?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico verifica se seu PC é compatível, faz a instalação segura e configura tudo. Atendimento a domicílio.</p>
        </div>
      </>
    ),
  },

  "windows-11-lento-como-resolver": {
    title: "Windows 11 lento: como descobrir a causa antes de sair otimizando",
    excerpt:
      "Lentidão no Windows 11 quase nunca tem uma causa única. Como ler os sinais, separar limite de hardware de software mal configurado e decidir entre ajuste, upgrade e reinstalação.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">A maior parte das listas de "otimização" trata sintoma. Elas desativam animação, limpam pasta temporária e prometem velocidade — sem nunca perguntar por que a máquina ficou lenta. Aqui o caminho é o contrário: primeiro identificar qual recurso está saturado, depois agir só onde faz diferença.</p>

        <h2>Lentidão não é um sintoma só</h2>
        <p>Antes de qualquer ajuste, descreva com precisão o que está lento. Demora para chegar à área de trabalho é um problema. Travamento momentâneo ao abrir programas é outro. Interface que engasga ao rolar página é outro ainda. Cada um aponta para um recurso diferente e exige decisão diferente.</p>
        <ul>
          <li><strong>Demora na inicialização:</strong> disco lento ou fila grande de programas iniciando junto com o sistema.</li>
          <li><strong>Travadas curtas e repetidas:</strong> falta de memória — o sistema passa a usar o disco como memória de apoio.</li>
          <li><strong>Lentidão constante em tudo:</strong> processador saturado por algum processo em segundo plano ou por limite térmico.</li>
          <li><strong>Só o navegador pesa:</strong> excesso de abas, extensões e cache — não é o Windows.</li>
          <li><strong>Piorou de repente:</strong> atualização mal aplicada, driver trocado ou software indesejado instalado.</li>
        </ul>

        <h2>Leia o Gerenciador de Tarefas antes de mexer</h2>
        <p>Abra o Gerenciador de Tarefas e observe a aba de desempenho durante alguns minutos de uso normal, não com a máquina parada. O que interessa é qual coluna encosta no teto:</p>
        <ol>
          <li><strong>Disco em 100% de forma contínua:</strong> gargalo clássico de disco mecânico com Windows 11. Nenhum ajuste de software resolve de forma duradoura.</li>
          <li><strong>Memória acima de 80% em uso comum:</strong> a máquina está trabalhando no limite; qualquer programa a mais gera engasgo.</li>
          <li><strong>Processador alto sem você fazer nada:</strong> vale identificar o processo. Indexação e atualização em andamento são temporários; mineração, adware e antivírus duplicado não são.</li>
          <li><strong>Tudo baixo e mesmo assim lento:</strong> suspeite de disco com setores em falha ou de queda de desempenho por temperatura.</li>
        </ol>
        <p>Essa leitura de dois minutos evita horas de ajustes inúteis, porque troca palpite por evidência.</p>

        <h2>Limite de hardware não se resolve com ajuste</h2>
        <p>O Windows 11 assume armazenamento de estado sólido e folga de memória. Em disco mecânico, o sistema fica preso na fila de leitura mesmo com processador sobrando: é por isso que a máquina demora para abrir a área de trabalho e trava por alguns segundos ao clicar em qualquer coisa. Trocar para SSD é a mudança com maior efeito perceptível, e nenhum ajuste de configuração substitui isso.</p>
        <p>Memória é a segunda barreira. Com pouca RAM, o sistema empurra parte do conteúdo para o arquivo de paginação no disco, e a lentidão vira ciclo: falta memória, sobra acesso a disco, tudo engasga. Antes de comprar módulo, porém, confirme a leitura no Gerenciador de Tarefas — máquina com memória sobrando não melhora nada com mais memória.</p>
        <p>Existe ainda o caso do notebook que começa rápido e vai perdendo desempenho depois de alguns minutos. Isso não é software: é refrigeração saturada reduzindo a frequência do processador para conter temperatura. O tratamento está em <Link to="/blog/como-limpar-notebook-por-dentro">limpeza interna e manutenção da refrigeração</Link>, não em configuração do Windows.</p>

        <h2>O que ajustar quando o gargalo é software</h2>
        <p>Quando o hardware é compatível e a máquina ainda arrasta, os ajustes que realmente pesam são poucos:</p>
        <ul>
          <li><strong>Programas na inicialização:</strong> tudo que sobe junto com o sistema disputa disco e memória no pior momento. Mantenha só o necessário.</li>
          <li><strong>Antivírus duplicado:</strong> duas soluções de proteção ativas ao mesmo tempo verificam o mesmo arquivo duas vezes e brigam entre si. Uma é o bastante.</li>
          <li><strong>Sincronização de nuvem:</strong> pastas grandes sincronizando em segundo plano consomem disco e rede continuamente. Vale limitar as pastas envolvidas.</li>
          <li><strong>Driver de vídeo e chipset:</strong> instalados pelo fabricante do equipamento, resolvem travamento de interface que nenhuma limpeza corrige.</li>
          <li><strong>Espaço livre no disco do sistema:</strong> disco quase cheio degrada desempenho de forma real. Deixe folga de trabalho.</li>
        </ul>
        <p>Efeitos visuais e "dicas do sistema" entram por último, e com expectativa modesta: mudam a sensação de resposta, não a capacidade da máquina.</p>

        <h2>Quando desconfiar de infecção</h2>
        <p>Lentidão que aparece de um dia para o outro, junto com anúncios fora do lugar, página inicial trocada ou processos desconhecidos consumindo processador, tem cara de software indesejado. Nesse caso, otimizar não adianta — o consumo volta. O caminho está em <Link to="/blog/como-remover-virus-windows-iniciantes">como remover vírus e adware do Windows</Link>, e só depois vale reavaliar o desempenho.</p>

        <h2>Reinstalar: quando faz sentido e quando é atalho errado</h2>
        <p>Reinstalação limpa resolve acúmulo de configuração quebrada, software residual e perfil corrompido. É a saída correta quando a máquina foi usada por anos, passou por várias instalações e continua lenta mesmo com hardware adequado.</p>
        <p>Não é a saída quando o gargalo é disco mecânico ou pouca memória: nesses casos o sistema fica rápido por alguns dias e volta ao mesmo ponto. Reinstalar também exige backup verificado antes — arquivo copiado e conferido, não presumido. O procedimento de resguardo está em <Link to="/servicos/recuperacao-de-dados">recuperação e proteção de dados</Link>.</p>

        <h2>Ordem de trabalho que usamos na bancada</h2>
        <ol>
          <li>Reproduzir a lentidão descrita pelo cliente, no mesmo cenário de uso.</li>
          <li>Medir qual recurso satura durante essa reprodução.</li>
          <li>Verificar saúde do disco e temperatura sob carga.</li>
          <li>Descartar software indesejado e proteção duplicada.</li>
          <li>Ajustar inicialização, drivers e sincronização.</li>
          <li>Só então propor upgrade ou reinstalação, com o motivo medido registrado.</li>
        </ol>
        <p>Essa ordem existe para não vender peça antes de provar necessidade. O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>; quando o desfecho é troca de armazenamento, o passo a passo está em <Link to="/blog/como-clonar-hd-para-ssd">como clonar o HD para SSD sem perder nada</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Descreva o tipo de lentidão, meça qual recurso satura, elimine causas externas (infecção, proteção duplicada, temperatura) e trate o gargalo real. Ajuste de sistema muda sensação; disco, memória e refrigeração mudam capacidade. Quando a máquina está lenta em Curitiba e você não quer trocar peça no escuro, o atendimento começa pela medição — não pela venda.</p>
      </>
    ),
  },



  "windows-11-vale-a-pena-atualizar": {
    title: "Windows 11: Vale a Pena Atualizar?",
    excerpt: "Requisitos, novidades, vantagens e desvantagens.",
    date: "2026-01-15",
    readTime: "8 min",
    category: "Windows 11",
    content: (
      <>
        <p className="lead">O Windows 11 já está maduro e estável. Mas <strong>será que vale a pena atualizar?</strong> Depende do seu hardware e do que você faz no computador.</p>

        <h2>Vantagens do Windows 11</h2>
        <ul>
          <li>Interface moderna e mais organizada</li>
          <li>Melhor gerenciamento de múltiplas janelas (Snap Layouts)</li>
          <li>Desempenho superior em jogos (DirectStorage, Auto HDR)</li>
          <li>Integração com Android (apps no PC)</li>
          <li>Segurança aprimorada com TPM 2.0</li>
        </ul>

        <h2>Desvantagens</h2>
        <ul>
          <li>Requisitos de hardware mais exigentes</li>
          <li>Barra de tarefas com menos opções de personalização</li>
          <li>Alguns programas antigos podem ter incompatibilidade</li>
          <li>Menu Iniciar centralizado (nem todos gostam)</li>
        </ul>

        <h2>Quando Atualizar</h2>
        <p>Se seu PC atende os requisitos e você usa Windows 10, <strong>vale atualizar</strong>. O Windows 10 perde suporte em outubro de 2025. Após isso, não recebe mais atualizações de segurança.</p>

        <h2>Quando NÃO Atualizar</h2>
        <p>Se seu PC não tem TPM 2.0 nativamente, se você usa softwares específicos que podem não ser compatíveis, ou se está satisfeito e não quer arriscar instabilidades.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Quer Atualizar Com Segurança?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico verifica compatibilidade, faz backup e atualiza sem risco de perder dados.</p>
        </div>
      </>
    ),
  },

  "office-365-guia-completo-empresas": {
    title: "Office 365 Para Empresas: Guia Completo",
    excerpt: "Teams, SharePoint, OneDrive e todas as ferramentas.",
    date: "2024-01-11",
    readTime: "12 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead">O Microsoft 365 (antigo Office 365) é muito mais do que Word, Excel e PowerPoint. É uma plataforma completa de produtividade e colaboração. Veja como aproveitar ao máximo.</p>

        <h2>O Que Inclui o Microsoft 365 Business</h2>
        <ul>
          <li><strong>Word, Excel, PowerPoint, Outlook:</strong> Aplicativos clássicos, sempre atualizados</li>
          <li><strong>Teams:</strong> Videoconferência, chat e colaboração</li>
          <li><strong>OneDrive:</strong> 1 TB de armazenamento na nuvem por usuário</li>
          <li><strong>SharePoint:</strong> Intranet e compartilhamento de documentos</li>
          <li><strong>Exchange:</strong> E-mail profissional com seu domínio</li>
        </ul>

        <h2>Planos e Preços</h2>
        <p>O plano Business Basic (só web + Teams) começa em torno de R$ 30/mês por usuário. O Business Standard (apps desktop + web) fica em torno de R$ 60/mês. Para a maioria das empresas pequenas, o Standard é a melhor escolha.</p>

        <h2>Benefícios Para Empresas</h2>
        <ul>
          <li>Sempre atualizado — sem precisar comprar nova versão</li>
          <li>Acesso de qualquer lugar (web, celular, tablet)</li>
          <li>Backup automático na nuvem</li>
          <li>Controle administrativo centralizado</li>
          <li>Conformidade e segurança corporativa</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Implantação de Microsoft 365</h3>
          <p className="text-muted-foreground mb-0">Configuramos e-mails, Teams, OneDrive e treinamos sua equipe. Suporte técnico para empresas em Curitiba.</p>
        </div>
      </>
    ),
  },

  "office-365-vs-office-tradicional": {
    title: "Office 365 vs Office Tradicional: Qual Escolher?",
    excerpt: "Comparativo completo entre assinatura e licença perpétua.",
    date: "2024-01-10",
    readTime: "6 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead"><strong>Assinatura mensal ou licença vitalícia?</strong> Essa é a dúvida de muitos. Vamos comparar os dois modelos.</p>

        <h2>Office 365 (Assinatura)</h2>
        <ul>
          <li>Pagamento mensal ou anual</li>
          <li>Sempre na última versão</li>
          <li>Inclui 1 TB de OneDrive</li>
          <li>Inclui Teams, SharePoint e mais</li>
          <li>Suporte da Microsoft incluso</li>
        </ul>

        <h2>Office Tradicional (Licença Perpétua)</h2>
        <ul>
          <li>Pagamento único</li>
          <li>Versão fixa — não recebe novos recursos</li>
          <li>Sem armazenamento na nuvem incluso</li>
          <li>Suporte limitado (5 anos de atualizações)</li>
          <li>Não inclui Teams e serviços online</li>
        </ul>

        <h2>Qual Escolher?</h2>
        <p><strong>Para empresas:</strong> Microsoft 365 sem dúvida. A colaboração em tempo real, backup na nuvem e e-mail profissional justificam o custo mensal.</p>
        <p><strong>Para uso pessoal básico:</strong> Se você só precisa de Word e Excel esporadicamente, a licença perpétua pode bastar. Mas considere que ela fica desatualizada.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Precisa de Ajuda Para Decidir?</h3>
          <p className="text-muted-foreground mb-0">Analisamos seu uso e indicamos o melhor plano. Instalação e configuração profissional.</p>
        </div>
      </>
    ),
  },

  "configurar-email-outlook-office-365": {
    title: "Como Configurar Email Empresarial no Outlook 365",
    excerpt: "Tutorial com sincronização celular e backup automático.",
    date: "2024-01-09",
    readTime: "5 min",
    category: "Office 365",
    content: (
      <>
        <p className="lead">E-mail com domínio próprio (seunome@suaempresa.com.br) transmite profissionalismo. Veja como configurar no Outlook 365.</p>

        <h2>1. Configure o Domínio no Microsoft 365</h2>
        <p>Acesse o painel administrativo do Microsoft 365, adicione seu domínio e configure os registros DNS (MX, CNAME, TXT) no seu provedor de hospedagem.</p>

        <h2>2. Crie as Caixas de E-mail</h2>
        <p>No painel admin, crie os usuários e atribua licenças. Cada usuário recebe 50 GB de caixa postal e 1 TB de OneDrive.</p>

        <h2>3. Configure o Outlook no PC</h2>
        <p>Abra o Outlook, faça login com o e-mail corporativo. O Outlook detecta automaticamente as configurações do Exchange Online. Em segundos, tudo está sincronizado.</p>

        <h2>4. Sincronize no Celular</h2>
        <p>Instale o app Outlook no celular (iOS ou Android), faça login e pronto. E-mails, calendário e contatos sincronizados em tempo real.</p>

        <h2>5. Configure Assinaturas</h2>
        <p>Crie uma assinatura profissional com logo, cargo e telefone. No Outlook: Arquivo → Opções → Email → Assinaturas.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Configuração Profissional de E-mail</h3>
          <p className="text-muted-foreground mb-0">Configuramos tudo para você: domínio, DNS, Outlook no PC e celular, assinaturas e backup. Suporte para empresas em Curitiba.</p>
        </div>
      </>
    ),
  },

  "seguranca-digital-empresas-guia-2024": {
    title: "Segurança Digital Para Empresas: Guia Essencial",
    excerpt: "Firewall, antivírus corporativo, backup e políticas.",
    date: "2024-01-08",
    readTime: "15 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Empresas são alvos cada vez mais frequentes de ataques cibernéticos. <strong>PMEs são as mais vulneráveis</strong> porque geralmente não investem em segurança. Veja o mínimo necessário.</p>

        <h2>1. Firewall Configurado</h2>
        <p>O firewall do Windows deve estar ativo em todos os computadores. Para empresas maiores, um firewall dedicado (hardware) no roteador é recomendado.</p>

        <h2>2. Antivírus Corporativo</h2>
        <p>O Windows Defender é bom para uso pessoal, mas empresas se beneficiam de soluções como Bitdefender GravityZone ou Kaspersky Small Office, que oferecem gestão centralizada.</p>

        <h2>3. Backup Automatizado</h2>
        <p>Regra 3-2-1: 3 cópias, 2 mídias diferentes, 1 fora do local. Use backup na nuvem (OneDrive, Google Workspace) + backup local em HD externo ou NAS.</p>

        <h2>4. Senhas e Autenticação</h2>
        <p>Política de senhas fortes + autenticação em dois fatores (2FA) em todos os acessos críticos. Use gerenciadores de senha corporativos.</p>

        <h2>5. Treinamento da Equipe</h2>
        <p>O maior risco é o fator humano. Treine funcionários para reconhecer phishing, não usar pen drives desconhecidos e não compartilhar senhas.</p>

        <h2>6. Atualizações em Dia</h2>
        <p>Mantenha Windows, Office, navegadores e todos os softwares atualizados. Vulnerabilidades conhecidas são as mais exploradas.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Segurança Para Sua Empresa</h3>
          <p className="text-muted-foreground mb-0">Fazemos auditoria de segurança, configuração de backup, antivírus e políticas. Suporte empresarial em Curitiba.</p>
        </div>
      </>
    ),
  },

  "ransomware-como-proteger-empresa": {
    title: "Ransomware em pequenas empresas: como o ataque entra e o que realmente segura o prejuízo",
    excerpt:
      "Por onde o ransomware entra numa empresa pequena, por que o backup comum costuma ser criptografado junto, o que fazer nas primeiras horas e quais medidas realmente reduzem o risco.",
    date: "2026-08-12",
    readTime: "12 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Ransomware criptografa os arquivos da empresa e cobra resgate para devolvê-los. O que quase ninguém explica é a parte que decide o desfecho: na maioria dos casos que chegam à bancada, o backup existia — e foi criptografado junto, porque estava conectado à mesma rede.</p>

        <h2>Por onde o ataque entra</h2>
        <p>Em empresa pequena, o caminho raramente é sofisticado. São quatro portas recorrentes:</p>
        <ul>
          <li><strong>Anexo ou link em e-mail.</strong> Cobrança falsa, boleto, currículo, nota fiscal. O remetente pode ser um contato real cuja conta foi invadida — por isso "conheço quem mandou" não é critério de segurança.</li>
          <li><strong>Acesso remoto exposto na internet.</strong> Área de trabalho remota liberada para fora com senha fraca é o vetor mais explorado em escritórios que precisaram improvisar trabalho fora da empresa.</li>
          <li><strong>Programa desatualizado.</strong> Falhas conhecidas em sistema operacional, navegador e utilitários de rede continuam sendo exploradas anos depois da correção existir.</li>
          <li><strong>Credencial reaproveitada.</strong> Senha de administrador repetida entre máquinas transforma uma infecção isolada em ataque a toda a rede.</li>
        </ul>

        <h2>Por que o backup normalmente falha justamente na hora</h2>
        <p>O ransomware não ataca só o computador onde foi executado. Ele procura tudo que estiver acessível a partir dali: pastas compartilhadas, unidades mapeadas, servidor de arquivos, HD externo plugado e, em vários casos, a pasta sincronizada com a nuvem.</p>
        <p>Isso significa que backup em HD externo permanentemente conectado não é proteção contra ransomware — é mais um alvo. O mesmo vale para a pasta sincronizada: se a versão criptografada sobe para a nuvem, o arquivo bom é substituído.</p>
        <p>O que resiste tem três características:</p>
        <ul>
          <li><strong>Cópia desconectada</strong>, que só é ligada durante a rotina de backup e depois removida.</li>
          <li><strong>Versionamento</strong>, que permite voltar a um estado anterior à criptografia mesmo depois da sincronização.</li>
          <li><strong>Credencial separada</strong>, para que o usuário infectado não tenha permissão de apagar o destino do backup.</li>
        </ul>
        <p>O critério prático de teste é simples e vale mais que qualquer plano no papel: se a empresa não consegue restaurar um arquivo de duas semanas atrás em poucos minutos, o backup ainda não foi validado. O desenho dessa rotina está em <Link to="/servicos/backup-para-empresas">backup para empresas</Link>.</p>

        <h2>Primeiras horas depois do ataque</h2>
        <ol>
          <li><strong>Isolar, não desligar às pressas.</strong> Tire as máquinas afetadas da rede — cabo e Wi-Fi. Isso interrompe a propagação sem destruir informação que ainda pode ajudar a identificar o que aconteceu.</li>
          <li><strong>Desconectar os destinos de backup</strong> antes que sejam alcançados, se ainda não foram.</li>
          <li><strong>Não formatar nada</strong> enquanto o cenário não estiver mapeado. Formatação apressada elimina a chance de recuperar o que sobrou.</li>
          <li><strong>Levantar o alcance real:</strong> quais máquinas, quais pastas de rede, qual servidor e desde quando.</li>
          <li><strong>Preservar os arquivos criptografados.</strong> Em parte dos casos existe ferramenta de decriptação pública para a variante específica, publicada depois do ataque.</li>
        </ol>

        <h2>Sobre pagar o resgate</h2>
        <p>Pagar não garante devolução, não garante que a chave funcione em todos os arquivos e não impede um segundo ataque — pelo contrário, marca a empresa como pagadora. Além disso, o acesso que permitiu a entrada continua aberto enquanto não for fechado. A decisão é da empresa, mas ela precisa ser tomada sabendo que o pagamento não resolve a causa.</p>

        <h2>O que reduz risco de verdade em empresa pequena</h2>
        <ul>
          <li><strong>Fechar o acesso remoto exposto.</strong> Se é necessário acesso de fora, ele deve passar por um túnel autenticado, nunca por porta aberta na internet.</li>
          <li><strong>Contas de trabalho sem privilégio de administrador.</strong> Grande parte dos ataques depende do usuário poder instalar o que aparecer.</li>
          <li><strong>Senhas distintas por máquina e segundo fator no e-mail.</strong> E-mail comprometido é a origem de boa parte das fraudes que vêm depois.</li>
          <li><strong>Atualizações em rotina definida</strong>, não quando alguém lembra.</li>
          <li><strong>Filtro de e-mail e bloqueio de anexos executáveis.</strong></li>
          <li><strong>Rotina de restauração testada por amostragem</strong>, com registro de quem testou e quando.</li>
        </ul>
        <p>Essas verificações fazem parte da rotina descrita em <Link to="/servicos/manutencao-preventiva-empresas">manutenção preventiva para empresas</Link> e do acompanhamento em <Link to="/servicos/suporte-tecnico-empresarial">suporte técnico empresarial</Link>.</p>

        <h2>O erro mais caro: tratar como incidente de uma máquina</h2>
        <p>Quando a empresa limpa apenas o computador que apareceu com a mensagem de resgate e volta a operar, o acesso original continua disponível. Reinfecção em poucas semanas é o desfecho comum. O encerramento correto envolve identificar a porta de entrada, trocar credenciais, revisar o que era acessível a partir da máquina afetada e só então restaurar.</p>

        <h2>Quando chamar atendimento</h2>
        <p>Vale acionar suporte imediatamente quando arquivos passaram a abrir com extensão estranha, quando surgiu arquivo de texto pedindo resgate nas pastas, quando o servidor de arquivos ficou inacessível ou quando mais de uma máquina apresentou o mesmo comportamento. O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>, e a avaliação de dados já atingidos aparece em <Link to="/servicos/recuperacao-de-dados">recuperação de dados</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Ransomware entra por e-mail, acesso remoto exposto, software desatualizado ou senha reaproveitada. Backup só protege se estiver desconectado ou versionado e se a restauração já tiver sido testada. Diante do ataque, isole a rede, preserve os arquivos, mapeie o alcance e feche a porta de entrada antes de restaurar — limpar só a máquina visível costuma resultar em reinfecção.</p>
      </>
    ),
  },

  "phishing-como-identificar-golpes": {
    title: "Phishing: Como Identificar e Evitar Golpes por Email",
    excerpt: "Reconheça tentativas de phishing e proteja seus dados.",
    date: "2024-01-06",
    readTime: "7 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">Phishing é a técnica de golpe mais comum na internet. O criminoso se passa por uma empresa ou pessoa confiável para <strong>roubar seus dados</strong>. Veja como identificar.</p>

        <h2>Sinais de Um E-mail de Phishing</h2>
        <ul>
          <li><strong>Urgência exagerada:</strong> "Sua conta será bloqueada em 24 horas!"</li>
          <li><strong>Erros de português:</strong> Empresas grandes revisam seus textos</li>
          <li><strong>Remetente suspeito:</strong> banco@seguranca-atualizar.com não é do banco</li>
          <li><strong>Links estranhos:</strong> Passe o mouse sobre o link (sem clicar) e veja o endereço real</li>
          <li><strong>Pedido de dados pessoais:</strong> Bancos nunca pedem senha por e-mail</li>
        </ul>

        <h2>O Que Fazer Se Receber</h2>
        <ul>
          <li>Não clique em nenhum link</li>
          <li>Não baixe anexos</li>
          <li>Marque como spam/phishing no seu e-mail</li>
          <li>Se tiver dúvida, acesse o site oficial digitando o endereço no navegador</li>
        </ul>

        <h2>Caí No Golpe. E Agora?</h2>
        <p>Troque imediatamente a senha da conta comprometida. Ative 2FA. Se informou dados bancários, entre em contato com o banco. Se instalou algum programa, procure um técnico para limpar o computador.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Caiu em Um Golpe?</h3>
          <p className="text-muted-foreground mb-0">Nosso técnico verifica se seu computador foi comprometido, remove ameaças e configura proteção adequada.</p>
        </div>
      </>
    ),
  },

  "backup-nuvem-empresas-qual-escolher": {
    title: "Backup em nuvem para empresas: o que diferencia sincronização de backup de verdade",
    excerpt:
      "Por que pasta sincronizada não é backup, quais critérios comparar antes de contratar, como estruturar cópias em camadas e o teste que revela se a rotina realmente funciona.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">A maioria das empresas pequenas acredita ter backup porque os arquivos ficam em uma pasta na nuvem. Sincronização e backup, porém, resolvem problemas diferentes — e a confusão entre os dois só aparece no dia em que algo precisa ser restaurado.</p>

        <h2>A diferença que decide tudo</h2>
        <p><strong>Sincronização</strong> mantém o mesmo conteúdo em vários lugares. Se o arquivo é apagado, corrompido ou criptografado, a alteração se propaga para todas as cópias — foi exatamente o que se pediu que ela fizesse.</p>
        <p><strong>Backup</strong> guarda estados anteriores, independentes do arquivo atual. Ele responde a uma pergunta que a sincronização não responde: como estava esse arquivo na semana passada, antes do erro.</p>
        <p>Serviços de nuvem corporativa costumam oferecer histórico de versões e lixeira com prazo, o que aproxima o comportamento de um backup — desde que o prazo de retenção seja maior que o tempo típico entre o problema e a descoberta dele. Erro percebido depois do prazo é erro sem volta.</p>

        <h2>Critérios que realmente importam na comparação</h2>
        <p>Espaço em disco é o critério menos relevante e o mais usado em propaganda. Antes de olhar preço por terabyte, compare:</p>
        <ul>
          <li><strong>Retenção.</strong> Por quantos dias é possível voltar? Trinta dias resolve erro humano; incidente descoberto tarde exige mais.</li>
          <li><strong>Granularidade da restauração.</strong> Dá para recuperar um arquivo só, uma pasta inteira ou apenas tudo de uma vez?</li>
          <li><strong>Escopo.</strong> A ferramenta copia só documentos, ou também bancos de dados, e-mail, configurações e sistema completo?</li>
          <li><strong>Imutabilidade.</strong> Uma conta comprometida consegue apagar as cópias? Se consegue, o backup não protege contra ataque, só contra defeito de disco.</li>
          <li><strong>Tempo de restauração.</strong> Baixar centenas de gigabytes por link comum leva horas. Isso precisa ser conhecido antes, não durante a emergência.</li>
          <li><strong>Onde os dados ficam</strong> e o que o contrato diz sobre acesso, em especial para empresas que tratam dados pessoais de clientes.</li>
        </ul>

        <h2>Estrutura em camadas que funciona em empresa pequena</h2>
        <ol>
          <li><strong>Cópia operacional.</strong> Arquivos do dia a dia em nuvem corporativa com histórico de versões ativo — resolve exclusão acidental e edição errada, que são a maioria dos incidentes.</li>
          <li><strong>Cópia local rápida.</strong> Servidor ou disco dedicado dentro da empresa, para restaurações grandes sem depender da internet.</li>
          <li><strong>Cópia isolada.</strong> Destino desconectado ou com escrita protegida, fora do alcance de qualquer credencial de usuário comum. É a camada que sobrevive a ransomware, conforme detalhado em <Link to="/blog/ransomware-como-proteger-empresa">ransomware em pequenas empresas</Link>.</li>
        </ol>
        <p>Nem toda empresa precisa das três de imediato. O que não pode faltar é uma camada que não seja alcançável a partir da estação de trabalho comum.</p>

        <h2>O que costuma ficar de fora — e faz falta</h2>
        <ul>
          <li><strong>E-mail.</strong> Muita gente assume que a caixa corporativa está coberta. A retenção padrão da plataforma pode ser bem menor que a necessidade da empresa.</li>
          <li><strong>Sistema de gestão e banco de dados.</strong> Copiar o arquivo do banco com ele em uso pode gerar cópia inconsistente, que só falha na hora de restaurar.</li>
          <li><strong>Máquinas individuais.</strong> Se o time salva no computador local, o backup do servidor não cobre esse conteúdo.</li>
          <li><strong>Configurações e licenças.</strong> Restaurar arquivos é rápido; reconstruir a configuração de todos os postos é o que costuma tomar dias.</li>
        </ul>

        <h2>O teste que separa rotina real de rotina no papel</h2>
        <p>Uma vez por mês, escolha um arquivo aleatório e tente restaurá-lo em uma versão de duas ou três semanas atrás. Cronometre. Registre quem fez e o resultado.</p>
        <p>Esse teste revela, sem custo, os três problemas mais comuns: rotina interrompida há meses sem ninguém perceber, retenção menor do que se imaginava e ausência da senha ou da permissão necessária para restaurar. Backup nunca testado é uma expectativa, não uma garantia.</p>

        <h2>Como decidir sem depender de marca</h2>
        <p>Comece pela pergunta inversa: quanto tempo a empresa aguenta parada e quanto trabalho ela pode perder. Uma empresa que aceita perder um dia de trabalho e ficar meio dia parada precisa de uma estrutura muito mais simples — e mais barata — do que uma que não pode perder uma hora. Definidos esses dois números, a escolha de ferramenta vira consequência técnica, não preferência de fornecedor.</p>
        <p>A implantação, o monitoramento das rotinas e o teste periódico fazem parte de <Link to="/servicos/backup-para-empresas">backup para empresas</Link>, acompanhados dentro de <Link to="/servicos/suporte-tecnico-empresarial">suporte técnico empresarial</Link>. Quando a perda já ocorreu e não há cópia utilizável, o caminho passa por <Link to="/servicos/recuperacao-de-dados">recuperação de dados</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Pasta sincronizada não é backup. Compare retenção, granularidade, escopo, imutabilidade e tempo de restauração antes de comparar preço. Mantenha ao menos uma camada fora do alcance das estações de trabalho, inclua e-mail e bancos de dados no escopo e teste a restauração todo mês — o teste é a única evidência de que a rotina existe.</p>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // ARTIGOS — PLATAFORMA PRECISO DE UM
  // ═══════════════════════════════════════════════════════════════

  "preciso-de-um-plataforma-prestadores": {
    title: "Preciso de Um: A Plataforma Que Conecta Prestadores de Serviços a Clientes",
    excerpt: "Conheça a plataforma que está revolucionando a forma como profissionais autônomos encontram clientes em todo o Brasil.",
    date: "2026-04-08",
    readTime: "8 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se você é profissional autônomo ou prestador de serviço, sabe como é difícil conseguir clientes de forma constante. O <strong><a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a></strong> surgiu exatamente para resolver esse problema: <strong>conectar quem precisa de um serviço ao profissional certo, de forma rápida e gratuita</strong>.</p>

        <h2>O Que é o Preciso de Um?</h2>
        <p>O <strong>Preciso de Um</strong> é uma plataforma digital que funciona como um marketplace de serviços. Clientes buscam profissionais por categoria e localização, comparam perfis, avaliações e portfólios, e entram em contato direto — sem intermediários, sem comissão e sem burocracia.</p>
        <p>A plataforma já conta com <strong>mais de 2.800 serviços cadastrados</strong> e atende profissionais de diversas cidades do Brasil, com destaque para Curitiba e região metropolitana, São Paulo, Rio de Janeiro e Belém.</p>

        <h2>Como Funciona na Prática?</h2>
        <p>O processo é simples e transparente, tanto para clientes quanto para profissionais:</p>
        <ol>
          <li><strong>🔍 Busca:</strong> O cliente digita o serviço que precisa (ex: "eletricista", "pintor", "técnico em informática") e sua localização.</li>
          <li><strong>⭐ Comparação:</strong> A plataforma exibe profissionais verificados com avaliações, experiência e faixas de preço.</li>
          <li><strong>💬 Contato direto:</strong> O cliente fala diretamente com o profissional via WhatsApp ou formulário — sem taxas.</li>
        </ol>

        <h2>Quem Pode Participar?</h2>
        <p>A grande força do Preciso de Um é a <strong>diversidade de categorias</strong>. A plataforma aceita profissionais de praticamente qualquer ramo:</p>
        <ul>
          <li>⚡ Eletricistas</li>
          <li>🏗️ Construção Civil (pedreiros, mestres de obras)</li>
          <li>🎨 Pintores</li>
          <li>🛠️ Marido de Aluguel</li>
          <li>💻 Técnicos em Informática</li>
          <li>🧹 Diaristas e serviços de limpeza</li>
          <li>🎉 Profissionais de eventos</li>
          <li>📲 Social Media e marketing digital</li>
          <li>📦 Fretistas e mudanças</li>
          <li>❄️ Instalação e manutenção de ar-condicionado</li>
          <li>E muito mais...</li>
        </ul>

        <h2>Parceiros de Peso</h2>
        <p>O Preciso de Um já conta com parceiros e patrocinadores de renome como <strong>Balaroti Home Center</strong>, <strong>Philips do Brasil</strong> e <strong>Leroy Merlin</strong>. Isso comprova a credibilidade e o potencial de crescimento da plataforma.</p>

        <h2>Quanto Custa?</h2>
        <p><strong>O cadastro é 100% gratuito.</strong> O profissional cria seu perfil, adiciona seus serviços, define sua área de atuação e começa a receber contatos. Não há comissão sobre os serviços fechados.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Cadastre-se Agora no Preciso de Um</h3>
          <p className="text-muted-foreground mb-4">Crie seu perfil gratuitamente e comece a receber clientes na sua região. É rápido, gratuito e sem comissão.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Faça seu cadastro grátis →
          </a>
        </div>
      </>
    ),
  },

  "como-cadastrar-preciso-de-um": {
    title: "Como Se Cadastrar no Preciso de Um e Começar a Receber Clientes Hoje",
    excerpt: "Passo a passo completo para profissionais de qualquer ramo se cadastrarem gratuitamente na plataforma.",
    date: "2026-04-08",
    readTime: "6 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se você é prestador de serviço e quer ampliar sua carteira de clientes, <strong>cadastrar-se no <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> é o primeiro passo</strong>. O processo é simples, leva poucos minutos e é completamente gratuito.</p>

        <h2>Passo 1: Acesse a Plataforma</h2>
        <p>Entre em <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold">precisodeum.com.br/cadastro</a>. Você pode acessar pelo celular ou computador — a plataforma é responsiva e funciona como um app instalável.</p>

        <h2>Passo 2: Crie Seu Perfil Profissional</h2>
        <p>Preencha seus dados básicos:</p>
        <ul>
          <li><strong>Nome completo ou nome da empresa</strong></li>
          <li><strong>Categoria de serviço</strong> (eletricista, pintor, técnico, diarista, etc.)</li>
          <li><strong>Cidade e região de atuação</strong></li>
          <li><strong>Anos de experiência</strong></li>
          <li><strong>Foto de perfil</strong> (profissionais com foto recebem até 3x mais contatos)</li>
          <li><strong>WhatsApp para contato direto</strong></li>
        </ul>

        <h2>Passo 3: Adicione Seus Serviços</h2>
        <p>Descreva os serviços que você oferece. Quanto mais detalhado, melhor sua visibilidade nas buscas. Você pode incluir:</p>
        <ul>
          <li>Descrição do serviço</li>
          <li>Faixa de preço estimada</li>
          <li>Fotos de trabalhos realizados (portfólio)</li>
          <li>Área de atendimento</li>
        </ul>

        <h2>Passo 4: Comece a Receber Clientes</h2>
        <p>Assim que seu perfil estiver ativo, clientes da sua região poderão encontrá-lo ao buscar pelo serviço que você oferece. O contato é feito diretamente via WhatsApp — <strong>sem intermediários e sem comissão</strong>.</p>

        <h2>Dicas Para Se Destacar</h2>
        <ol>
          <li><strong>Use foto profissional:</strong> Perfis com foto transmitem mais confiança.</li>
          <li><strong>Descreva seus diferenciais:</strong> Experiência, certificações, garantia de serviço.</li>
          <li><strong>Mantenha o perfil atualizado:</strong> Adicione novos trabalhos e atualize preços.</li>
          <li><strong>Responda rápido:</strong> Clientes priorizam profissionais que respondem com agilidade.</li>
          <li><strong>Peça avaliações:</strong> Boas avaliações são seu melhor marketing na plataforma.</li>
        </ol>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Comece Agora — É Grátis!</h3>
          <p className="text-muted-foreground mb-4">Não perca mais tempo esperando clientes. Cadastre-se no Preciso de Um e seja encontrado por quem precisa do seu serviço.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Criar meu perfil grátis →
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-todos-os-ramos": {
    title: "Preciso de Um Aceita Todos os Ramos: Eletricista, Pintor, Diarista e Muito Mais",
    excerpt: "De construção civil a eventos, veja como profissionais de qualquer área podem participar e lucrar.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Uma dúvida comum entre prestadores de serviço é: <strong>"Minha área de atuação é aceita na plataforma?"</strong>. A resposta é simples: <strong>sim</strong>. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> foi criado para abranger todos os ramos profissionais.</p>

        <h2>Categorias Disponíveis na Plataforma</h2>
        <p>Atualmente, o Preciso de Um já possui profissionais cadastrados em dezenas de categorias. Veja algumas:</p>

        <h3>🏠 Serviços Residenciais</h3>
        <ul>
          <li><strong>Eletricista:</strong> Instalações elétricas, troca de fiação, disjuntores</li>
          <li><strong>Encanador:</strong> Vazamentos, desentupimento, instalação hidráulica</li>
          <li><strong>Pintor:</strong> Pintura residencial e comercial</li>
          <li><strong>Marido de Aluguel:</strong> Pequenos reparos, montagem de móveis</li>
          <li><strong>Diarista:</strong> Limpeza residencial e comercial</li>
          <li><strong>Ar-condicionado:</strong> Instalação, limpeza e manutenção</li>
        </ul>

        <h3>🏗️ Construção e Reformas</h3>
        <ul>
          <li><strong>Construção Civil:</strong> Pedreiros, mestres de obras, reformas</li>
          <li><strong>Serralheiro:</strong> Portões, grades, estruturas metálicas</li>
          <li><strong>Drywall:</strong> Divisórias, forros, acabamentos</li>
          <li><strong>Montagem de Móveis:</strong> Planejados e modulados</li>
        </ul>

        <h3>💻 Tecnologia</h3>
        <ul>
          <li><strong>Técnico em Informática:</strong> Manutenção de PCs, notebooks, redes</li>
          <li><strong>Suporte Técnico:</strong> Configuração, instalação de software</li>
          <li><strong>Social Media:</strong> Gestão de redes sociais, marketing digital</li>
        </ul>

        <h3>🎉 Outros</h3>
        <ul>
          <li><strong>Eventos:</strong> Decoração, buffet, animação</li>
          <li><strong>Fretista:</strong> Mudanças e transporte</li>
          <li><strong>Produção Musical:</strong> Gravação, mixagem, masterização</li>
        </ul>

        <h2>Não Encontrou Sua Categoria?</h2>
        <p>Novas categorias são adicionadas constantemente. Se a sua área ainda não aparece na lista, basta se cadastrar e solicitar a inclusão. A plataforma está em constante expansão para atender todos os tipos de profissionais.</p>

        <h2>Por Que a Diversidade Importa?</h2>
        <p>Quanto mais categorias a plataforma oferece, mais clientes ela atrai. E quanto mais clientes buscam serviços, <strong>mais oportunidades surgem para todos os profissionais cadastrados</strong>. É um ciclo virtuoso onde todos ganham.</p>

        <h2>Exemplos Reais de Profissionais na Plataforma</h2>
        <ul>
          <li><strong>Eletricistas em Curitiba e Araucária</strong> com 6 a 20+ anos de experiência</li>
          <li><strong>Pintores em Curitiba</strong> com 21+ anos de experiência</li>
          <li><strong>Construtores em Fazenda Rio Grande</strong> com 10+ anos no mercado</li>
          <li><strong>Serralheiros em Araucária</strong> com 31+ anos de experiência</li>
          <li><strong>Diaristas, fretistas, profissionais de eventos</strong> e muito mais</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Seu Ramo Também Tem Espaço!</h3>
          <p className="text-muted-foreground mb-4">Não importa qual seja seu serviço — o Preciso de Um é para você. Cadastre-se gratuitamente e amplie seus clientes.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Cadastrar meu serviço →
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-vagas-oportunidades": {
    title: "Vagas e Oportunidades no Preciso de Um: Como Encontrar Trabalho Rápido",
    excerpt: "A plataforma também oferece vagas de emprego e oportunidades de serviço. Veja como aproveitar.",
    date: "2026-04-08",
    readTime: "5 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Além de conectar prestadores a clientes, o <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> também funciona como um <strong>painel de vagas e oportunidades de serviço</strong>. Empresas e particulares podem publicar vagas gratuitamente, e profissionais podem se candidatar com um clique.</p>

        <h2>Como Funciona o Painel de Vagas?</h2>
        <p>O Preciso de Um possui uma seção dedicada a vagas, onde empregadores publicam oportunidades e profissionais podem encontrá-las filtradas por:</p>
        <ul>
          <li><strong>Tipo:</strong> Serviço avulso, emprego presencial, freelance</li>
          <li><strong>Localização:</strong> Cidade e bairro</li>
          <li><strong>Categoria:</strong> Área profissional</li>
          <li><strong>Urgência:</strong> Vagas recentes com destaque</li>
        </ul>

        <h2>Exemplos de Vagas Publicadas</h2>
        <p>Veja alguns exemplos reais de vagas disponíveis na plataforma:</p>
        <ul>
          <li>📌 <strong>Assistente Administrativo</strong> — Curitiba</li>
          <li>📌 <strong>Operador de Empilhadeira</strong> — Curitiba, Bairro Xaxim</li>
          <li>📌 <strong>Representante Comercial</strong> — Toledo/PR</li>
        </ul>
        <p>As vagas são atualizadas diariamente e os profissionais recebem notificações de novas oportunidades na sua área.</p>

        <h2>Como Publicar Uma Vaga</h2>
        <p>Se você é empresário ou precisa contratar alguém rapidamente:</p>
        <ol>
          <li>Acesse <a href="https://precisodeum.com.br/dashboard/vagas" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold">precisodeum.com.br/dashboard/vagas</a></li>
          <li>Descreva a vaga (cargo, requisitos, localização)</li>
          <li>Publique gratuitamente</li>
          <li>Receba candidatos diretamente no WhatsApp</li>
        </ol>

        <h2>Vantagens Para Quem Busca Trabalho</h2>
        <ul>
          <li>✅ Vagas verificadas e atualizadas</li>
          <li>✅ Contato direto com o contratante</li>
          <li>✅ Sem intermediários ou taxas</li>
          <li>✅ Vagas de serviço avulso e emprego formal</li>
          <li>✅ Filtros por região para encontrar oportunidades perto de você</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Encontre Vagas Agora</h3>
          <p className="text-muted-foreground mb-4">Acesse o painel de vagas do Preciso de Um e encontre oportunidades na sua região.</p>
          <a href="https://precisodeum.com.br/vagas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Ver vagas disponíveis →
          </a>
        </div>
      </>
    ),
  },

  "por-que-todo-prestador-deve-estar-preciso-de-um": {
    title: "Por Que Todo Prestador de Serviço Deve Estar no Preciso de Um",
    excerpt: "Visibilidade, credibilidade e clientes: os motivos para todo profissional se cadastrar agora.",
    date: "2026-04-07",
    readTime: "9 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">O mercado de prestação de serviços é competitivo. <strong>Depender apenas de indicação boca a boca não é mais suficiente.</strong> Profissionais que investem em presença digital conseguem mais clientes, cobram melhor e crescem mais rápido. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> é a ferramenta ideal para essa transformação.</p>

        <h2>1. Visibilidade Imediata</h2>
        <p>Ao se cadastrar, seu perfil aparece nas buscas da plataforma. Clientes que precisam exatamente do seu serviço na sua região <strong>vão te encontrar</strong>. Sem precisar gastar com anúncios ou ter um site próprio.</p>

        <h2>2. Credibilidade Profissional</h2>
        <p>Ter um perfil verificado em uma plataforma com parceiros como <strong>Balaroti, Philips e Leroy Merlin</strong> transmite confiança. Clientes preferem contratar profissionais que estão em plataformas organizadas — parece mais seguro do que um anúncio aleatório no Facebook.</p>

        <h2>3. Zero Custo Para Começar</h2>
        <p>Diferente de outras plataformas que cobram mensalidade ou comissão, o <strong>Preciso de Um permite cadastro gratuito</strong>. Você cria seu perfil, adiciona seus serviços e começa a receber contatos sem pagar nada.</p>

        <h2>4. Contato Direto Via WhatsApp</h2>
        <p>O cliente fala diretamente com você pelo WhatsApp. <strong>Sem intermediários, sem chat da plataforma, sem espera.</strong> Isso agiliza o fechamento e permite um atendimento personalizado.</p>

        <h2>5. Vagas e Oportunidades Extra</h2>
        <p>Além dos clientes que buscam serviços, a plataforma tem um <strong>painel de vagas</strong> onde empresas e particulares publicam oportunidades. É uma fonte adicional de trabalho para quem está cadastrado.</p>

        <h2>6. App Disponível (PWA)</h2>
        <p>O Preciso de Um pode ser instalado no celular como um app — sem ocupar espaço. Assim você recebe notificações e acessa seu perfil de qualquer lugar, com avaliação de <strong>4.8 estrelas</strong>.</p>

        <h2>7. Presente em Diversas Cidades</h2>
        <p>A plataforma já atende profissionais em Curitiba, São José dos Pinhais, Araucária, Pinhais, Campo Largo, Fazenda Rio Grande, São Paulo, Rio de Janeiro, Belém e outras cidades. <strong>E está em constante expansão.</strong></p>

        <h2>O Que Você Perde ao NÃO Estar na Plataforma?</h2>
        <ul>
          <li>❌ Clientes que estão buscando exatamente o seu serviço — e encontrando o concorrente</li>
          <li>❌ Oportunidade de construir reputação online com avaliações</li>
          <li>❌ Vagas de serviço publicadas na sua região</li>
          <li>❌ Presença digital sem investimento</li>
        </ul>

        <h2>Não Importa Seu Ramo</h2>
        <p>Eletricista, pintor, pedreiro, técnico em informática, diarista, fretista, profissional de eventos, social media, serralheiro, montador de móveis, instalador de ar-condicionado — <strong>a plataforma é para todos</strong>.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Não Fique de Fora</h3>
          <p className="text-muted-foreground mb-4">Enquanto você não está na plataforma, seus concorrentes estão recebendo os clientes que poderiam ser seus. Cadastre-se agora — é grátis e leva 5 minutos.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Quero me cadastrar →
          </a>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/preciso-de-um-plataforma-prestadores" className="text-accent">O que é o Preciso de Um?</Link></li>
          <li><Link to="/blog/como-cadastrar-preciso-de-um" className="text-accent">Como se cadastrar passo a passo</Link></li>
          <li><Link to="/blog/preciso-de-um-todos-os-ramos" className="text-accent">Quais ramos são aceitos?</Link></li>
          <li><Link to="/blog/preciso-de-um-vagas-oportunidades" className="text-accent">Vagas e oportunidades na plataforma</Link></li>
          <li><Link to="/seja-parceiro" className="text-accent">Seja parceiro da O Técnico de Informática</Link></li>
        </ul>
      </>
    ),
  },

  // ═══════════════════════════════════════════════════════════════
  // ARTIGOS — PROCEDIMENTOS TÉCNICOS
  // ═══════════════════════════════════════════════════════════════

  "como-trocar-pasta-termica-notebook": {
    title: "Troca de pasta térmica no notebook: quando faz sentido e como não errar",
    excerpt:
      "O que a pasta térmica faz, como saber se ela é mesmo a causa do aquecimento, a sequência correta de remoção e aperto do dissipador e os erros que danificam a placa.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">A pasta térmica é uma camada muito fina de composto entre a superfície do processador e a base do dissipador. Ela não esfria nada sozinha: apenas preenche as imperfeições microscópicas das duas peças para que o calor atravesse por contato em vez de por ar. Quando resseca, esse contato piora e a temperatura sobe mesmo com a refrigeração limpa.</p>

        <h2>O que a troca resolve — e o que não resolve</h2>
        <p>Trocar o composto recupera a transferência de calor no ponto de contato. É a resposta certa quando o conjunto está limpo, a ventoinha gira normalmente e ainda assim a máquina aquece rápido sob carga.</p>
        <p>Não é a resposta quando as aletas estão obstruídas por poeira compactada, quando a ventoinha tem rolamento gasto, quando o heatpipe está amassado ou quando o problema é lentidão de software confundida com calor. Nesses casos, o composto novo dura pouco tempo antes de o sintoma voltar. A parte de obstrução está detalhada em <Link to="/blog/como-limpar-notebook-por-dentro">limpeza interna de notebook</Link>.</p>

        <h2>Sinais que apontam para interface térmica ruim</h2>
        <ul>
          <li>Temperatura sobe muito rápido logo no início da carga e demora a cair depois.</li>
          <li>Refrigeração já foi limpa recentemente e o quadro não mudou.</li>
          <li>Queda de desempenho sob carga com ventoinha em rotação alta e saída de ar quente e forte — sinal de que o ar circula, mas o calor não chega bem até ele.</li>
          <li>Equipamento com vários anos de uso e histórico de temperatura alta contínua.</li>
        </ul>
        <p>Se a saída de ar está fraca, o caso é obstrução, não composto. Essa distinção evita abrir a máquina duas vezes.</p>

        <h2>Preparação: onde a maioria dos danos acontece</h2>
        <p>Antes de qualquer ferramenta encostar no equipamento:</p>
        <ul>
          <li>Desligue por completo — desligar não é suspender nem fechar a tampa.</li>
          <li>Retire o carregador. Em modelos com bateria interna, desconecte o conector da bateria assim que a tampa sair, antes de mexer em qualquer outra coisa.</li>
          <li>Descarregue a estática do corpo tocando uma superfície metálica aterrada, ou use pulseira antiestática.</li>
          <li>Registre a posição dos parafusos. Comprimentos diferentes em posições diferentes são regra; trocar dois de lugar pode perfurar a placa.</li>
          <li>Use ferramenta plástica para as travas da carcaça. Chave metálica quebra presilha que costuma não ter reposição avulsa.</li>
        </ul>

        <h2>Remoção do dissipador</h2>
        <p>Os parafusos do dissipador vêm numerados na própria peça. A ordem existe porque a pressão precisa sair e entrar de forma distribuída: pressão desigual empena a base, e base empenada não faz contato uniforme com o chip.</p>
        <ol>
          <li>Solte os parafusos aos poucos, alternando entre eles, na ordem inversa à numeração — sem soltar um de cada vez até o fim.</li>
          <li>Desconecte o cabo da ventoinha pelo conector, nunca puxando pela fiação.</li>
          <li>Levante o conjunto com movimento suave. Se estiver aderido pela pasta endurecida, aplique um leve giro para romper a aderência em vez de puxar com força — puxar arranca o chip do soquete em alguns modelos.</li>
        </ol>

        <h2>Limpeza das superfícies</h2>
        <p>O composto antigo precisa sair por inteiro, tanto do chip quanto da base do dissipador. Resíduo endurecido misturado com pasta nova mantém o problema. Use álcool isopropílico de alta concentração e material que não solte fibras; álcool comum contém água e deixa resíduo. Trabalhe até a superfície ficar espelhada e seca, sem líquido escorrendo para as trilhas ao redor.</p>
        <p>Se houver almofada térmica sobre chips vizinhos — memória de vídeo ou controlador —, ela não é substituída por pasta. É outro material, com espessura própria; comprimir a peça sem essa almofada cria folga e piora o resfriamento daquele componente.</p>

        <h2>Aplicação do composto</h2>
        <p>Quantidade é a parte mais errada do procedimento. A camada útil é fina o bastante para preencher rugosidade — o excesso não melhora nada, escorre para fora sob pressão e, em compostos condutivos, pode fechar contato onde não deve.</p>
        <ul>
          <li>Um ponto central pequeno, proporcional ao tamanho do chip, é suficiente na maioria dos processadores de notebook.</li>
          <li>Não espalhe com o dedo. A pressão de aperto do dissipador distribui melhor e evita bolhas de ar.</li>
          <li>Em chips retangulares maiores, uma linha fina no eixo maior distribui de forma mais previsível do que um ponto único.</li>
          <li>Prefira composto não condutivo em manutenção doméstica: o ganho de compostos metálicos é pequeno perto do risco de curto por escorrimento.</li>
        </ul>
        <p>Este guia não indica marca nem modelo de composto. O que define o resultado é a espessura correta e o contato limpo, não o rótulo.</p>

        <h2>Remontagem e verificação</h2>
        <ol>
          <li>Posicione o dissipador de uma vez, sem arrastar sobre o chip — arrastar espalha a pasta para fora da área útil.</li>
          <li>Aperte os parafusos na ordem numerada, em passes leves e alternados, até a pressão ficar uniforme. Nada de apertar um até o fim antes dos demais.</li>
          <li>Reconecte a ventoinha e confira o encaixe do conector.</li>
          <li>Feche a carcaça só depois de conferir que nenhum cabo ficou preso entre a tampa e a placa.</li>
          <li>Ligue e acompanhe o comportamento sob carga real por alguns minutos, comparando com o que acontecia antes.</li>
        </ol>
        <p>Sem essa comparação não há como afirmar que a troca funcionou. E se a temperatura continuar alta com a refrigeração limpa e a pasta nova, o próximo suspeito é o próprio conjunto de dissipação ou a ventoinha.</p>

        <h2>Erros que custam caro</h2>
        <ul>
          <li>Abrir sem desconectar a bateria interna e provocar curto com a ferramenta.</li>
          <li>Soltar os parafusos do dissipador em ordem aleatória e empenar a base.</li>
          <li>Usar quantidade excessiva de composto, especialmente do tipo condutivo.</li>
          <li>Limpar com álcool diluído e deixar umidade sobre a placa.</li>
          <li>Esquecer de reconectar a ventoinha — a máquina liga, aquece e desliga sozinha em poucos minutos.</li>
          <li>Aquecer a região com secador para soltar o dissipador, deformando peças plásticas próximas.</li>
        </ul>
        <p>Em equipamentos dentro da garantia de fábrica, confira as condições do fabricante antes de abrir: a abertura por terceiro pode afetar a cobertura.</p>

        <h2>Quando não fazer sozinho</h2>
        <p>Modelos em que o dissipador só é alcançado após remover teclado, placa e cabos de tela concentram risco maior do que ganho. O mesmo vale para máquinas com bateria inchada, líquido derramado, cheiro de queimado ou desligamento imediato ao ligar — nesses casos o aquecimento é sintoma, não o problema principal.</p>
        <p>O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>. O procedimento completo de refrigeração faz parte da <Link to="/servicos/manutencao-de-notebook">manutenção de notebook</Link>, e quando o equipamento não pode sair do lugar existe o <Link to="/atendimento-domicilio">atendimento no endereço</Link>. Se o quadro for de calor recorrente, comece por <Link to="/blog/notebook-superaquecendo-o-que-fazer">notebook superaquecendo: o que fazer</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Troque a pasta quando a refrigeração já estiver limpa e o aquecimento persistir. Corte a energia da bateria antes de tudo, remova o dissipador em passes alternados, limpe as duas superfícies por completo, aplique uma camada fina e aperte na ordem numerada. Depois, teste sob carga e compare — é o teste que confirma o serviço, não a aparência da montagem.</p>
      </>
    ),
  },

  "como-clonar-hd-para-ssd": {
    title: "Clonar HD para SSD: quando clonar, quando reinstalar e onde o processo falha",
    excerpt:
      "A diferença real entre clonar e reinstalar, como saber se o disco de origem aguenta a clonagem, os pontos em que o processo trava e o que conferir antes de apagar o disco antigo.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Clonar copia o disco inteiro para outro: sistema, programas, arquivos e configurações. A máquina volta igual, só que em um disco mais rápido. É prático — mas nem sempre é a melhor decisão, e há pontos em que a clonagem falha de forma previsível.</p>

        <h2>Clonar ou reinstalar</h2>
        <p>Clonar preserva tudo, inclusive o que estava errado. Reinstalar limpa tudo, inclusive o que estava certo. A escolha depende do estado atual do sistema.</p>
        <ul>
          <li><strong>Clonagem faz sentido</strong> quando o sistema está saudável, com programas licenciados difíceis de reinstalar e configurações que levariam horas para refazer.</li>
          <li><strong>Reinstalação faz sentido</strong> quando há travamentos, erros recorrentes, infecção recente ou histórico longo de instalações e desinstalações. Clonar um sistema problemático apenas leva o problema para o disco novo, mais rápido.</li>
        </ul>

        <h2>Antes de começar: a origem aguenta?</h2>
        <p>Clonagem lê o disco inteiro de ponta a ponta — é a leitura mais exigente que um disco recebe. Se o HD já apresenta setores defeituosos, ruído mecânico ou travamentos, esse esforço pode ser o empurrão final.</p>
        <p>Nesse cenário, a ordem correta se inverte: primeiro copia-se os arquivos pessoais para outro lugar, depois se avalia a clonagem. Disco com sinal de falha física não é caso de clonagem doméstica; é caso de recuperação, tratado em <Link to="/blog/como-recuperar-dados-hd-com-defeito">recuperação de dados em HD com defeito</Link>.</p>
        <p>Existe ainda o requisito de espaço: o que importa não é a capacidade do disco antigo, e sim o volume realmente ocupado. Um HD de 1 TB com 180 GB usados cabe em um SSD de 240 GB, desde que a ferramenta consiga redimensionar as partições.</p>

        <h2>Preparação que evita retrabalho</h2>
        <ol>
          <li><strong>Backup separado dos arquivos que não podem sumir.</strong> Clonagem não é backup: se algo der errado no meio, você precisa de uma cópia independente.</li>
          <li><strong>Liberar espaço antes.</strong> Arquivos temporários e downloads antigos ocupam tempo de cópia sem servir para nada.</li>
          <li><strong>Conferir como o disco será conectado.</strong> Em desktop, sobra porta interna. Em notebook, quase sempre é preciso um adaptador USB para conectar o disco novo durante o processo.</li>
          <li><strong>Alimentação estável.</strong> Queda de energia no meio da cópia deixa o destino inconsistente. Em notebook, com carregador ligado.</li>
        </ol>

        <h2>Onde o processo costuma falhar</h2>
        <ul>
          <li><strong>Erro de leitura na origem.</strong> A ferramenta para em determinada porcentagem e não avança: são setores ilegíveis. Insistir castiga o disco.</li>
          <li><strong>Partição de inicialização ausente.</strong> Copiar apenas a partição visível do sistema deixa de fora a partição de boot, e o computador não inicia. A cópia precisa incluir todas as partições do disco, não só a maior.</li>
          <li><strong>Destino menor que o ocupado.</strong> A cópia nem começa, ou começa e para no fim.</li>
          <li><strong>Disco antigo ainda conectado no primeiro boot.</strong> Dois discos com o mesmo identificador de sistema geram confusão de inicialização. O primeiro boot deve ser feito só com o disco novo.</li>
          <li><strong>Modo de inicialização divergente.</strong> Se o firmware está configurado de um jeito e o disco clonado espera outro, a máquina não encontra sistema — e o sintoma engana, parecendo clonagem malfeita.</li>
        </ul>

        <h2>Depois da clonagem</h2>
        <ol>
          <li>Inicie apenas com o disco novo instalado e confirme que o sistema sobe normalmente.</li>
          <li>Confira se os arquivos pessoais estão todos lá — pastas de documentos, imagens e área de trabalho.</li>
          <li>Verifique se o espaço total do novo disco aparece disponível. Sobra não alocada significa que a partição não foi expandida e precisa ser ajustada.</li>
          <li>Use a máquina alguns dias antes de apagar o disco antigo. Ele é a sua rede de segurança nesse intervalo.</li>
        </ol>
        <p>Só depois desse período faz sentido reaproveitar o disco antigo como armazenamento secundário — procedimento descrito em <Link to="/blog/como-instalar-segundo-ssd-notebook">segundo SSD no notebook</Link>.</p>

        <h2>O que a troca de disco resolve — e o que não resolve</h2>
        <p>Sair de HD mecânico para SSD muda a percepção de velocidade de forma clara: o sistema inicia mais rápido, programas abrem quase imediatamente e a máquina para de travar durante tarefas simples. Esse ganho é real e não depende de configuração.</p>
        <p>O que não muda: pouca memória continua limitando quem trabalha com muitas abas e programas simultâneos; processador antigo continua sendo o limite em tarefas pesadas; e sistema cheio de programas iniciando junto continua demorando a ficar utilizável. Esses fatores estão separados em <Link to="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</Link>.</p>

        <h2>Quando levar para a bancada</h2>
        <p>Faz sentido buscar atendimento quando o disco de origem faz ruído, quando a clonagem trava sempre no mesmo ponto, quando a máquina não inicia depois da cópia ou quando os dados envolvidos não têm backup nenhum. Nesses casos, cada tentativa adicional por conta própria reduz a chance de recuperar o que ainda está lá.</p>
        <p>O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>, e a migração completa faz parte do <Link to="/servicos/upgrade-ssd-ram">upgrade de SSD e memória</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Clone quando o sistema está saudável e reinstale quando não está. Confira a saúde do disco de origem antes, tenha backup independente dos arquivos essenciais, copie o disco inteiro e não apenas a partição visível, inicie com um disco só e mantenha o antigo intacto por alguns dias antes de apagar qualquer coisa.</p>
      </>
    ),
  },
  "como-testar-fonte-de-alimentacao-pc": {
    title: "Testar a fonte do PC: o que o teste prova, o que ele não prova e quando trocar",
    excerpt:
      "Como separar defeito de fonte de defeito de placa antes de comprar peça: o que cada teste mede, por que fonte que liga pode estar ruim e quais sinais fecham a decisão de troca.",
    date: "2026-08-12",
    readTime: "10 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">A fonte é o componente que mais leva a culpa e o que menos é testado direito. Ela alimenta tudo, então qualquer falha estranha parece "problema de fonte". O objetivo aqui não é decorar valores: é entender o que cada teste realmente prova, para não trocar peça boa nem insistir em peça ruim.</p>

        <h2>Por que a fonte engana o diagnóstico</h2>
        <p>Uma fonte não falha só de um jeito. Ela pode não ligar, pode ligar e entregar tensão fora de faixa, pode entregar tensão certa em repouso e afundar quando o processador e a placa de vídeo puxam corrente ao mesmo tempo, ou pode entregar tensão média correta com ruído elétrico alto o suficiente para reiniciar o sistema. Só o primeiro caso é óbvio.</p>
        <p>Por isso o padrão de sintomas importa mais do que qualquer leitura isolada. Falha que aparece só sob carga, só depois de aquecer, ou só ao ligar o computador com tudo conectado aponta para regulação sob demanda — exatamente o que um teste rápido de bancada não vê.</p>

        <h2>Sintomas que combinam com fonte</h2>
        <ul>
          <li>Nada acende: sem LED, sem giro de ventoinha, sem reação ao botão.</li>
          <li>Liga por um instante e desliga sozinho, em ciclo repetido.</li>
          <li>Reinício súbito sob esforço — jogo, renderização, cópia grande de arquivos.</li>
          <li>Desligamentos que aumentam quando a máquina já está quente.</li>
          <li>Cheiro de queimado ou ruído elétrico agudo vindo do gabinete.</li>
        </ul>
        <p>Os mesmos sintomas aparecem em memória com contato sujo, em refrigeração saturada e em placa-mãe com regulagem defeituosa. Nenhum deles fecha diagnóstico sozinho: eles apenas colocam a fonte na lista de suspeitos.</p>

        <h2>Segurança antes de qualquer teste</h2>
        <p>Fonte de computador guarda energia em capacitores mesmo depois de desligada da tomada. Isso muda as regras:</p>
        <ul>
          <li>Não abra a caixa metálica da fonte. Não há manutenção doméstica ali dentro.</li>
          <li>Trabalhe sempre com o cabo de força retirado ao conectar ou desconectar qualquer coisa.</li>
          <li>Nunca teste com o gabinete apoiado em superfície metálica ou úmida.</li>
          <li>Se houver marca de queimado, estufamento visível ou cheiro forte, o teste acabou: a peça é descartada, não investigada.</li>
        </ul>

        <h2>Teste 1 — a fonte reage sozinha?</h2>
        <p>Existe um teste clássico que força a fonte a ligar fora da placa-mãe, curtocircuitando o sinal de acionamento a um terra do conector principal. Ele responde uma única pergunta: a fonte reage ao comando de ligar.</p>
        <p>É um teste de exclusão, não de aprovação. Fonte que gira a ventoinha nesse teste pode continuar entregando tensão errada. E fonte que não reage também pode estar apenas em proteção por causa de curto em outro componente ligado a ela. Por isso o teste vale com todos os cabos de periférico desconectados.</p>

        <h2>Teste 2 — medir com o multímetro</h2>
        <p>Medir tensão contínua nos conectores mostra se a saída está dentro das faixas previstas pelo padrão de fonte do PC. As linhas principais toleram cerca de 5% de variação; a linha auxiliar de standby permanece ativa mesmo com a máquina desligada, o que explica placa com LED aceso e computador que não liga.</p>
        <ol>
          <li>Ajuste o instrumento para tensão contínua, em escala compatível.</li>
          <li>Fixe a ponta de referência em um terra do próprio conector.</li>
          <li>Toque as linhas positivas uma a uma e anote cada leitura em vez de decidir na hora.</li>
          <li>Repita a medição com a máquina montada e ligada, não apenas em teste isolado.</li>
        </ol>
        <p>Leitura estável dentro da faixa em repouso não aprova a fonte. Aprova só aquele momento, naquela demanda.</p>

        <h2>Teste 3 — o único que vale a decisão: sob carga</h2>
        <p>A prova real é medir enquanto o computador trabalha. Se a linha de 12 V cai abaixo da faixa quando o processador e o vídeo puxam junto, ou se a leitura oscila de forma visível, a fonte não está regulando. É esse comportamento que derruba a máquina no meio de um jogo e volta a "funcionar perfeitamente" no teste seguinte em repouso.</p>
        <p>O mesmo raciocínio vale para a temperatura: fonte que só falha depois de meia hora ligada precisa ser testada depois de meia hora ligada. Teste de dois minutos aprova defeito térmico.</p>

        <h2>Substituição controlada: o teste mais confiável</h2>
        <p>Em bancada, o método que menos erra não é medição — é troca por uma fonte sabidamente boa e de capacidade adequada. Se o sintoma some, a peça estava ruim. Se o sintoma continua idêntico, a fonte foi descartada como causa e o próximo suspeito é a placa, a memória ou a refrigeração. Esse cruzamento evita comprar peça por eliminação errada.</p>

        <h2>Quando trocar sem hesitar</h2>
        <ul>
          <li>Tensão fora de faixa em qualquer linha principal, mesmo que só sob carga.</li>
          <li>Oscilação perceptível durante a medição.</li>
          <li>Sem reação no teste de acionamento com tudo desconectado.</li>
          <li>Sinais físicos: estufamento, vazamento, marca de queimado, ruído elétrico.</li>
          <li>Fonte genérica sem especificação clara em máquina que ganhou placa de vídeo dedicada.</li>
        </ul>
        <p>Não trocamos fonte por idade. Trocamos por comportamento medido ou por evidência física — e registramos qual dos dois motivou a decisão.</p>

        <h2>Quando o caso deixa de ser doméstico</h2>
        <p>Se a máquina já queimou fonte mais de uma vez, se houve surto elétrico, se há marca de carbonização na placa ou se o computador desliga também com fonte boa, o problema saiu da fonte. Nesse ponto o caminho é diagnóstico de placa, não substituição repetida de peça.</p>
        <p>O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>. Quando o quadro é de máquina que não dá sinal, comece por <Link to="/servicos/computador-nao-liga">computador não liga</Link>; se a suspeita passa para a eletrônica, o procedimento está em <Link to="/servicos/conserto-placa">conserto de placa</Link>. Para separar os dois casos, veja <Link to="/blog/como-diagnosticar-placa-mae-defeituosa">como diagnosticar placa-mãe defeituosa</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Comece pelos sintomas e pelo padrão em que eles aparecem. Confirme reação da fonte com tudo desconectado, meça as linhas em repouso, repita sob carga real e, se ainda houver dúvida, troque por uma fonte boa para cruzar o resultado. Decisão de troca vem de medição fora de faixa, oscilação ou dano físico — nunca de suposição.</p>
      </>
    ),
  },

  "como-limpar-notebook-por-dentro": {
    title: "Limpeza interna de notebook: o que muda de verdade e onde estão os riscos",
    excerpt:
      "Como a poeira compromete a refrigeração de um notebook, o que dá para verificar sem abrir o equipamento, o que a limpeza interna resolve, o que ela não resolve e quais erros custam caro na bancada.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Boa parte dos notebooks que chegam com queixa de aquecimento não tem defeito eletrônico: tem um caminho de ar obstruído. A limpeza interna corrige exatamente esse ponto — e apenas esse. Entender o limite do procedimento evita frustração depois, porque nem todo aquecimento vem de poeira.</p>

        <h2>Por que a poeira derruba a refrigeração</h2>
        <p>O calor gerado pelo processador e pelo chip de vídeo é conduzido por tubos de cobre até um bloco de aletas metálicas, e uma ventoinha empurra ar por esse bloco para jogar o calor para fora. É um circuito fechado: entrada de ar, aletas, saída de ar.</p>
        <p>A poeira não se espalha por igual. Ela se compacta em uma manta fina bem na face das aletas, no ponto exato onde o ar deveria atravessar. O resultado é contraintuitivo: a ventoinha gira mais rápido e faz mais barulho justamente porque está movendo menos ar útil. O usuário escuta esforço e sente a base quente enquanto a saída de ar sopra fraco.</p>
        <p>Quando a temperatura passa de um limite definido pelo próprio fabricante, o sistema reduz a frequência de trabalho para se proteger. É por isso que a máquina começa rápida e vai ficando lenta depois de alguns minutos — o desempenho está sendo cortado de propósito para evitar dano.</p>

        <h2>Sinais que apontam para obstrução</h2>
        <ul>
          <li>Ventoinha acelerada em tarefas leves, como navegador e editor de texto.</li>
          <li>Ar quente saindo fraco pela grade lateral ou traseira, mesmo com a ventoinha audível.</li>
          <li>Base muito quente na região próxima à saída de ar.</li>
          <li>Queda de desempenho progressiva durante o uso, e não desde o primeiro minuto.</li>
          <li>Desligamento repentino em tarefas pesadas, sem tela de erro.</li>
        </ul>
        <p>Nenhum desses sinais isolado fecha diagnóstico. Ventoinha barulhenta também aparece em rolamento gasto; queda de desempenho também aparece em disco mecânico saturado; desligamento súbito também aparece em falha de energia. Por isso a verificação vem antes da desmontagem.</p>

        <h2>O que dá para verificar antes de abrir</h2>
        <ul>
          <li>Observe a saída de ar contra a luz: aletas visivelmente cinzentas ou cobertas indicam obstrução.</li>
          <li>Use o notebook sobre superfície rígida por alguns minutos. Se o comportamento muda bastante, parte do problema é bloqueio das entradas inferiores por cama, sofá ou colo.</li>
          <li>Acompanhe se a lentidão aparece só depois de aquecer. Lentidão desde o boot costuma ser disco ou memória, não temperatura.</li>
          <li>Confira se a ventoinha realmente gira em algum momento. Silêncio absoluto sob carga é outro problema — pode ser ventoinha travada ou desconectada.</li>
        </ul>

        <h2>Por que ar comprimido "por fora" resolve pouco</h2>
        <p>Soprar ar pela grade externa costuma empurrar a poeira para dentro do gabinete em vez de retirá-la, e ela se realoja sobre a placa. Pior: quando a ventoinha é girada em alta rotação pelo jato de ar, ela funciona como gerador e pode enviar corrente para a placa, além de castigar o rolamento.</p>
        <p>Aspirador doméstico também não é o caminho. Além de não ter força direcionada onde interessa, o atrito do fluxo de ar em bico plástico gera carga estática perto de componentes sensíveis.</p>
        <p>A limpeza que muda o quadro é a que remove a manta compactada das aletas com o conjunto acessível, retirando a sujeira do equipamento em vez de redistribuí-la.</p>

        <h2>O procedimento como é feito na bancada</h2>
        <ol>
          <li><strong>Desligar por completo e cortar a energia.</strong> Não é suspender: é desligar, retirar o carregador e, em modelos com bateria interna, desconectar o conector da bateria antes de qualquer outro passo.</li>
          <li><strong>Abrir com registro de posição.</strong> Parafusos de comprimentos diferentes em posições diferentes são regra, não exceção. Trocar dois deles de lugar pode perfurar a placa ou impedir o fechamento.</li>
          <li><strong>Soltar as travas plásticas com ferramenta plástica.</strong> Chave metálica marca a carcaça e quebra presilhas que raramente têm reposição avulsa.</li>
          <li><strong>Retirar a poeira das aletas com a ventoinha imobilizada.</strong> A manta sai inteira quando é solta pela face correta; jogar ar contra ela só a compacta mais.</li>
          <li><strong>Verificar o rolamento da ventoinha.</strong> Ruído metálico ou folga axial indicam desgaste que a limpeza não corrige — é peça, e isso muda o orçamento.</li>
          <li><strong>Avaliar a interface térmica.</strong> Com o dissipador removido, faz sentido renovar o composto térmico; recolocar um dissipador sobre pasta ressecada devolve o problema em poucas semanas.</li>
          <li><strong>Remontar e testar sob carga.</strong> Fechar sem testar é adivinhação: o comportamento tem que ser comparado antes e depois, com o equipamento trabalhando de verdade.</li>
        </ol>
        <p>O detalhe do composto térmico tem regras próprias — quantidade, ordem de aperto e limpeza das superfícies. Elas estão em <Link to="/blog/como-trocar-pasta-termica-notebook">como trocar a pasta térmica do notebook</Link>.</p>

        <h2>O que a limpeza não resolve</h2>
        <ul>
          <li><strong>Rolamento de ventoinha gasto.</strong> O barulho volta porque a peça está no fim.</li>
          <li><strong>Heatpipe amassado ou saturado.</strong> A condução cai e nenhuma limpeza recupera.</li>
          <li><strong>Projeto térmico apertado.</strong> Modelos finos com processador potente aquecem por concepção; a limpeza devolve o normal do aparelho, não um patamar melhor do que ele nunca teve.</li>
          <li><strong>Lentidão de origem lógica.</strong> Disco mecânico, pouca memória e sistema saturado continuam iguais depois da limpeza. Esse caminho está descrito em <Link to="/blog/computador-lento-causas-solucoes">computador lento: causas e como decidir</Link>.</li>
          <li><strong>Aquecimento por bateria inchada.</strong> Aqui há risco físico e a prioridade deixa de ser temperatura.</li>
        </ul>

        <h2>Erros que transformam manutenção em conserto</h2>
        <ul>
          <li>Abrir com a bateria interna ainda conectada e provocar curto ao encostar a ferramenta na placa.</li>
          <li>Forçar a tampa em um ponto ainda parafusado e trincar a carcaça.</li>
          <li>Puxar o cabo flat da ventoinha pela fiação em vez de soltar o conector.</li>
          <li>Aplicar produto de limpeza doméstico sobre a placa.</li>
          <li>Fechar sem reconectar a ventoinha — a máquina liga, aquece e desliga em minutos.</li>
        </ul>
        <p>Se o notebook ainda está em garantia de fábrica, verifique as condições do fabricante antes de abrir: em muitos casos a abertura por terceiro afeta a cobertura.</p>

        <h2>De quanto em quanto tempo</h2>
        <p>Não existe intervalo universal, porque o que define é o ambiente. Máquina usada sobre mesa, em local sem carpete e sem animais, acumula pouco. Notebook usado na cama, em obra, em cozinha ou em casa com pets acumula muito mais rápido. O critério prático é o comportamento: quando a ventoinha passa a trabalhar acelerada em tarefas leves e a saída de ar enfraquece, chegou a hora — independentemente do calendário.</p>

        <h2>Quando levar para a bancada</h2>
        <p>Faz sentido buscar atendimento quando há ruído metálico na ventoinha, desligamento sob carga, cheiro de queimado, líquido derramado ou quando o modelo exige remoção do teclado e da placa para chegar ao conjunto de refrigeração. Nesses casos o risco de dano na desmontagem é maior do que o ganho de fazer sozinho.</p>
        <p>Na prática, o roteiro é: entender o sintoma, confirmar se é térmico e só então abrir. O critério de cobrança e o que é verificado estão em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>, e o procedimento completo de refrigeração faz parte da <Link to="/servicos/manutencao-de-notebook">manutenção de notebook</Link>. Quando o equipamento não pode sair do lugar, o <Link to="/atendimento-domicilio">atendimento no endereço</Link> cobre parte desses casos. Se o quadro for de calor recorrente, vale ler antes <Link to="/blog/notebook-superaquecendo-o-que-fazer">notebook superaquecendo: o que fazer</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Poeira compactada nas aletas é a causa mais comum de aquecimento em notebook com alguns anos de uso, e a limpeza interna bem feita devolve o comportamento original do aparelho. Ela não corrige ventoinha gasta, projeto térmico limitado nem lentidão de origem lógica. Antes de abrir, confirme que o sintoma é realmente térmico; ao abrir, corte a energia da bateria e trate parafuso, trava plástica e conector com o cuidado que eles exigem.</p>
      </>
    ),
  },

  "como-recuperar-dados-hd-defeituoso": {
    title: "Como Recuperar Dados de HD Defeituoso: Métodos e Ferramentas",
    excerpt: "Técnicas profissionais para recuperar arquivos de discos com setores defeituosos.",
    date: "2026-04-07",
    readTime: "13 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Um HD pode falhar sem aviso. Cliques, travamentos, arquivos corrompidos — quando isso acontece, a prioridade é <strong>recuperar os dados antes que o disco pare de vez</strong>. Este guia cobre os métodos técnicos que usamos para recuperar dados em diferentes cenários de falha.</p>

        <h2>Tipos de Falha em HDs</h2>

        <h3>Falha Lógica (Software)</h3>
        <p>O disco funciona fisicamente, mas os dados estão inacessíveis por corrupção do sistema de arquivos, formatação acidental, exclusão de partição ou ataque de vírus/ransomware. <strong>Taxa de recuperação: 80-95%.</strong></p>

        <h3>Falha Física (Hardware)</h3>
        <p>Componentes internos do disco estão danificados: cabeças de leitura, motor do spindle, placa controladora ou superfície magnética. Sintomas: cliques rítmicos, HD não gira, não é reconhecido na BIOS. <strong>Taxa de recuperação: 40-70%</strong> (requer sala limpa em casos graves).</p>

        <h3>Setores Defeituosos (Bad Sectors)</h3>
        <p>Áreas do disco que não conseguem mais ser lidas. O HD ainda funciona, mas fica lento e alguns arquivos ficam inacessíveis. <strong>Taxa de recuperação: 70-90%.</strong></p>

        <h2>Procedimento de Recuperação — Falha Lógica</h2>

        <h3>Método 1: Recuva (Gratuito)</h3>
        <ol>
          <li>Conecte o HD como disco secundário (nunca instale programas no disco defeituoso)</li>
          <li>Instale o Recuva em outro disco</li>
          <li>Execute varredura profunda na partição afetada</li>
          <li>Selecione os arquivos encontrados e recupere para outro disco</li>
        </ol>

        <h3>Método 2: TestDisk + PhotoRec (Gratuito, Open Source)</h3>
        <p>Para casos mais complexos como partição excluída:</p>
        <ol>
          <li><strong>TestDisk:</strong> Analisa e reconstrói a tabela de partições</li>
          <li><strong>PhotoRec:</strong> Recupera arquivos por assinatura (file carving), ignorando o sistema de arquivos</li>
        </ol>

        <h3>Método 3: R-Studio (Profissional)</h3>
        <p>Ferramenta profissional que suporta reconstrução de RAID, recuperação de partições formatadas e varredura por assinatura de arquivo. É o software que usamos para casos complexos.</p>

        <h2>Procedimento de Recuperação — Setores Defeituosos</h2>

        <h3>Clonagem com ddrescue</h3>
        <p>Antes de tentar recuperar dados de um HD com bad sectors, <strong>clone-o primeiro</strong> usando ddrescue (Linux):</p>
        <ol>
          <li>Crie um boot USB com Linux</li>
          <li>Execute: <code>ddrescue /dev/sdX /dev/sdY rescue.log</code></li>
          <li>O ddrescue faz múltiplas passagens, priorizando áreas legíveis e retornando às áreas difíceis depois</li>
          <li>Trabalhe a recuperação de dados sobre o clone, não sobre o disco original</li>
        </ol>

        <h2>O Que NÃO Fazer</h2>
        <ul>
          <li>❌ <strong>Não formate o disco</strong> achando que vai resolver</li>
          <li>❌ <strong>Não instale programas no disco defeituoso</strong> — pode sobrescrever dados recuperáveis</li>
          <li>❌ <strong>Não abra o HD</strong> — a contaminação por poeira destrói a superfície</li>
          <li>❌ <strong>Não coloque no freezer</strong> — mito que causa condensação e mais danos</li>
          <li>❌ <strong>Não continue usando o disco</strong> se ouvir cliques — cada hora de uso reduz as chances de recuperação</li>
        </ul>

        <h2>Quando Procurar Ajuda Profissional</h2>
        <ul>
          <li>HD fazendo cliques ou não sendo reconhecido</li>
          <li>Dados críticos (fotos de família, documentos empresariais)</li>
          <li>Tentativas iniciais de recuperação falharam</li>
          <li>Suspeita de ransomware</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Perdeu Dados? Podemos Ajudar</h3>
          <p className="text-muted-foreground mb-0">Fazemos diagnóstico e recuperação de dados em HD, SSD e pen drives. Atendimento em Curitiba e região com valor prévio.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Backup: como proteger seus arquivos</Link></li>
          <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">Recuperação de dados e backup</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-rede-wifi-empresarial": {
    title: "Como Configurar Rede Wi-Fi Empresarial: VLANs, QoS e Segurança",
    excerpt: "Procedimento técnico para montar rede corporativa com segmentação e priorização de tráfego.",
    date: "2026-04-07",
    readTime: "14 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Uma rede Wi-Fi empresarial é completamente diferente de uma rede doméstica. Não basta colocar um roteador potente — é preciso <strong>segmentação, segurança, priorização de tráfego e escalabilidade</strong>. Este guia cobre o procedimento técnico que aplicamos em empresas de 5 a 200 funcionários.</p>

        <h2>Planejamento: Antes de Instalar Qualquer Coisa</h2>

        <h3>1. Levantamento de Requisitos</h3>
        <ul>
          <li><strong>Quantidade de dispositivos simultâneos</strong> (computadores, celulares, impressoras, câmeras)</li>
          <li><strong>Tipos de uso:</strong> Navegação, VoIP, videoconferência, transferência de arquivos</li>
          <li><strong>Área de cobertura:</strong> Planta do imóvel, número de andares, paredes</li>
          <li><strong>Rede de visitantes:</strong> Necessidade de rede separada para clientes</li>
          <li><strong>Largura de banda contratada</strong> do provedor</li>
        </ul>

        <h3>2. Site Survey (Análise do Local)</h3>
        <p>Antes de posicionar access points, fazemos um site survey para mapear:</p>
        <ul>
          <li>Interferências de redes vizinhas (canais congestionados)</li>
          <li>Obstáculos físicos (paredes de concreto, vidro, metal)</li>
          <li>Pontos ideais para instalação de APs</li>
          <li>Necessidade de cabeamento estruturado</li>
        </ul>

        <h2>Arquitetura Recomendada</h2>

        <h3>Equipamentos</h3>
        <ul>
          <li><strong>Firewall/Router:</strong> pfSense, MikroTik ou Ubiquiti EdgeRouter</li>
          <li><strong>Switch gerenciável:</strong> TP-Link JetStream, Ubiquiti USW ou MikroTik CRS</li>
          <li><strong>Access Points:</strong> Ubiquiti UniFi, TP-Link Omada ou Aruba Instant On</li>
          <li><strong>Controlador:</strong> UniFi Controller ou Omada Controller (centraliza configuração)</li>
        </ul>

        <h3>VLANs (Segmentação de Rede)</h3>
        <p>VLANs separam o tráfego em redes virtuais independentes:</p>
        <ul>
          <li><strong>VLAN 10 — Corporativa:</strong> Computadores e servidores da empresa</li>
          <li><strong>VLAN 20 — VoIP:</strong> Telefones IP com prioridade de tráfego</li>
          <li><strong>VLAN 30 — Visitantes:</strong> Acesso limitado à internet (sem acesso à rede interna)</li>
          <li><strong>VLAN 40 — IoT/Câmeras:</strong> Dispositivos IoT isolados por segurança</li>
        </ul>

        <h3>QoS (Quality of Service)</h3>
        <p>Priorização de tráfego para evitar que downloads pesados prejudiquem videoconferências:</p>
        <ul>
          <li><strong>Prioridade Alta:</strong> VoIP, videoconferência (Zoom, Teams, Meet)</li>
          <li><strong>Prioridade Média:</strong> Navegação web, email, ERP</li>
          <li><strong>Prioridade Baixa:</strong> Downloads, atualizações, streaming</li>
        </ul>

        <h2>Segurança</h2>
        <ul>
          <li><strong>WPA3-Enterprise</strong> com autenticação RADIUS (ou WPA2-Enterprise como mínimo)</li>
          <li><strong>Portal Captive</strong> para rede de visitantes (aceite de termos de uso)</li>
          <li><strong>Firewall rules</strong> entre VLANs (visitantes não acessam rede corporativa)</li>
          <li><strong>DNS filtering</strong> (bloqueio de sites maliciosos via Pi-hole ou OpenDNS)</li>
          <li><strong>Atualização de firmware</strong> em todos os equipamentos de rede</li>
        </ul>

        <h2>Monitoramento</h2>
        <p>Após a instalação, configuramos monitoramento contínuo:</p>
        <ul>
          <li>Dashboard centralizado (UniFi Controller / Omada)</li>
          <li>Alertas de dispositivos offline</li>
          <li>Gráficos de uso de banda por VLAN</li>
          <li>Logs de segurança e tentativas de acesso</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Rede Wi-Fi Empresarial em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Projetamos, instalamos e configuramos redes empresariais com VLANs, QoS e segurança. Atendemos empresas de 5 a 200 funcionários em Curitiba e região.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/wifi-lento-como-melhorar" className="text-accent">Wi-Fi lento: como melhorar o sinal</Link></li>
          <li><Link to="/servicos/redes-e-wifi" className="text-accent">Redes e Wi-Fi</Link></li>
          <li><Link to="/servicos/suporte-tecnico-empresarial" className="text-accent">Suporte técnico empresarial</Link></li>
        </ul>
      </>
    ),
  },

  "como-diagnosticar-placa-mae-defeituosa": {
    title: "Placa-mãe defeituosa: como confirmar antes de trocar a peça errada",
    excerpt:
      "Inspeção visual, teste mínimo e eliminação sistemática para distinguir falha de placa-mãe de falha de memória, fonte ou refrigeração — e quando reparo eletrônico ainda faz sentido.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Placa-mãe é o diagnóstico que mais se conclui por eliminação e o que mais se erra por pressa. Ela não costuma dar um sintoma próprio: ela faz outro componente parecer defeituoso. Confirmar exige método, e o método é sempre reduzir a máquina até sobrar uma variável.</p>

        <h2>Por que o sintoma engana</h2>
        <p>A placa distribui energia, comanda o vídeo integrado, controla memória, armazenamento e portas. Quando um desses caminhos falha na própria placa, o efeito aparece no periférico ligado ali. Um slot de memória com contato ruim gera erro que parece pente defeituoso; uma regulagem instável na placa gera reinício que parece fonte fraca; um controlador de USB travado parece cabo ou dispositivo.</p>
        <p>Por isso a regra é simples: nunca se conclui placa por sintoma. Conclui-se placa quando todo o resto já foi testado e o comportamento não mudou.</p>

        <h2>Inspeção visual — o passo que resolve muitos casos</h2>
        <p>Antes de qualquer teste, com o cabo de força retirado, observe a placa com boa luz:</p>
        <ul>
          <li><strong>Capacitores deformados ou com resíduo:</strong> topo abaulado, aberto ou com crosta escura indicam peça no fim.</li>
          <li><strong>Escurecimento e carbonização:</strong> trilha ou componente queimado é evidência direta.</li>
          <li><strong>Corrosão:</strong> manchas esverdeadas ou esbranquiçadas indicam umidade ou líquido derramado, comum em máquinas guardadas.</li>
          <li><strong>Dano mecânico:</strong> pino torto no soquete, trava de slot quebrada, trilha rompida perto de furo de parafuso.</li>
          <li><strong>Poeira compactada e pasta térmica ressecada:</strong> não é defeito de placa, mas muda o comportamento térmico e precisa ser corrigido antes de qualquer conclusão.</li>
        </ul>

        <h2>Teste mínimo: reduzir até sobrar o essencial</h2>
        <p>A montagem mínima existe para eliminar interferência. Ficam apenas placa, processador com refrigeração, um módulo de memória e a fonte. Saem armazenamento, placa de vídeo dedicada, periféricos e cabos de painel frontal que não sejam necessários.</p>
        <ol>
          <li>Monte só o essencial e tente ligar usando o vídeo integrado, quando existir.</li>
          <li>Se chegar à tela de configuração da BIOS, a placa responde no nível básico — o defeito está no que foi removido.</li>
          <li>Se não chegar, devolva um componente por vez e observe em qual deles o comportamento muda.</li>
          <li>Anote cada passo. Diagnóstico de placa se perde quando se troca duas coisas ao mesmo tempo.</li>
        </ol>

        <h2>Isolando memória e slots</h2>
        <p>Teste um módulo por vez, e cada módulo em cada slot. Se um módulo específico falha em todos os slots, o módulo é o problema. Se qualquer módulo falha sempre no mesmo slot, o defeito é do slot — e slot é placa. Antes de concluir, limpe os contatos e verifique se o módulo está travado até o fim, porque encaixe parcial produz exatamente o mesmo sintoma.</p>

        <h2>Descartando a fonte antes de acusar a placa</h2>
        <p>Metade dos casos de "placa morta" é energia. Confirme a fonte com medição sob carga ou, melhor, com substituição por uma fonte sabidamente boa. O procedimento completo está em <Link to="/blog/como-testar-fonte-de-alimentacao-pc">como testar a fonte de alimentação</Link>. Só depois desse descarte o diagnóstico de placa começa a ter valor.</p>

        <h2>Sinais de diagnóstico da própria placa</h2>
        <p>Muitas placas indicam onde o processo parou: sequência sonora quando existe alto-falante interno, LEDs de estágio identificando processador, memória, vídeo ou inicialização, e visor de código em modelos mais completos. Esses códigos variam por fabricante — o valor deles é apontar a etapa que travou, não entregar a peça culpada. Confira o significado no manual do modelo exato, nunca em tabela genérica.</p>

        <h2>Quando a placa é o veredito</h2>
        <ul>
          <li>Montagem mínima não inicia mesmo com fonte, memória e processador comprovados em outra máquina.</li>
          <li>Slot ou porta específica falha de forma reproduzível com qualquer peça.</li>
          <li>Dano físico visível: queimado, corrosão, trilha rompida, pino do soquete danificado.</li>
          <li>Instabilidade persistente após descartar energia, memória e temperatura.</li>
        </ul>

        <h2>Reparar ou substituir</h2>
        <p>Nem todo defeito de placa é fim de linha. Capacitor deformado, conector de energia danificado e trilha rompida em região acessível costumam ter reparo eletrônico viável. Já falha de chipset, corrosão espalhada por líquido e dano após surto elétrico com marcas em vários pontos raramente compensam o reparo — o custo se aproxima do de uma placa compatível, e a confiabilidade não volta.</p>
        <p>A decisão também depende da plataforma: placa antiga exige processador e memória da mesma geração, então trocar a placa às vezes puxa dois componentes junto. Esse cálculo é apresentado antes de qualquer autorização, com peça e mão de obra separadas.</p>

        <h2>O que não fazer</h2>
        <ul>
          <li>Insistir em ligar repetidamente uma máquina com cheiro de queimado.</li>
          <li>Aquecer a placa com fonte de calor doméstica na esperança de reativar solda.</li>
          <li>Trocar processador por suspeita, sem descarte prévio de fonte e memória.</li>
          <li>Comprar placa antes de confirmar compatibilidade com o processador e a memória que já existem.</li>
        </ul>

        <h2>Próximo passo</h2>
        <p>Se a máquina não dá nenhum sinal, comece por <Link to="/servicos/computador-nao-liga">computador não liga</Link>. Quando a suspeita se firma na eletrônica, o procedimento de bancada está em <Link to="/servicos/conserto-placa">conserto de placa</Link>, e o critério de verificação e cobrança em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Inspecione antes de testar, reduza a máquina ao mínimo, isole memória por slot, descarte a fonte com substituição e só então trate a placa como responsável. Com dano físico evidente, o veredito é imediato; sem ele, é a eliminação registrada passo a passo que sustenta a decisão de reparar ou substituir.</p>
      </>
    ),
  },

  "como-instalar-segundo-ssd-notebook": {
    title: "Segundo SSD no notebook: quando cabe, quando não cabe e o que muda",
    excerpt:
      "Como descobrir se o notebook aceita um segundo disco, a diferença entre slot M.2 livre e caddy no lugar do leitor óptico, os limites de cada caminho e o que fazer depois da instalação.",
    date: "2026-08-12",
    readTime: "10 min",
    category: "Manutenção",
    content: (
      <>
        <p className="lead">Adicionar um segundo disco é a saída para quem já tem SSD rápido de pouca capacidade e não quer trocar tudo de novo. Só que nem todo notebook aceita — e os dois caminhos possíveis, slot M.2 livre e caddy no lugar do leitor óptico, entregam resultados bem diferentes.</p>

        <h2>Antes de comprar qualquer peça</h2>
        <p>A pergunta certa não é "qual SSD comprar", é "o que este modelo aceita". Comprar antes de conferir é o erro mais caro dessa história, porque peça de armazenamento aberta raramente volta.</p>
        <ul>
          <li><strong>Existe slot M.2 livre?</strong> Muitos notebooks finos têm apenas um, já ocupado. Outros têm dois, sendo o segundo com comprimento limitado.</li>
          <li><strong>O slot é NVMe, SATA ou aceita os dois?</strong> São conectores parecidos com chaveamento diferente. Um disco NVMe em slot só SATA simplesmente não é reconhecido.</li>
          <li><strong>Existe baia de 2,5 polegadas?</strong> Comum em modelos com alguns anos, rara em ultrafinos.</li>
          <li><strong>Ainda existe leitor óptico?</strong> Se sim, o caddy vira alternativa. Se não, esse caminho está fechado.</li>
        </ul>
        <p>A resposta está no manual de serviço do fabricante para o número exato do modelo, não para a linha comercial. Dois notebooks com o mesmo nome de família podem ter placas diferentes.</p>

        <h2>Caminho 1 — slot M.2 livre</h2>
        <p>É o melhor cenário: o disco entra direto na placa, sem cabo, sem adaptador e sem perda de desempenho. Pontos que costumam travar a instalação:</p>
        <ul>
          <li><strong>Comprimento.</strong> O formato mais comum é 2280 (80 mm), mas há slots que só comportam 2242 ou 2230. O parafuso de fixação indica o tamanho previsto.</li>
          <li><strong>Chaveamento do conector.</strong> A posição do recorte diferencia módulos SATA de NVMe. Se não encaixa sem esforço, é incompatibilidade — forçar quebra o slot.</li>
          <li><strong>Espaço de dissipação.</strong> Modelos com pouco espaço interno esquentam; disco quente reduz a velocidade para se proteger.</li>
        </ul>

        <h2>Caminho 2 — caddy no lugar do leitor óptico</h2>
        <p>O caddy é um adaptador que ocupa a baia do leitor de DVD e recebe um disco de 2,5 polegadas. Funciona, mas com ressalvas que precisam ficar claras antes:</p>
        <ul>
          <li>A porta do leitor óptico costuma ser mais lenta que a porta principal. Colocar ali o disco do sistema é desperdício — o caddy serve para armazenamento, não para boot rápido.</li>
          <li>A espessura importa: caddies de 9,5 mm e de 12,7 mm não são intercambiáveis. Medir o leitor antes evita a peça errada.</li>
          <li>Alguns modelos deixam de reconhecer o disco quando a bateria está muito baixa ou em modos de economia agressivos.</li>
          <li>O acabamento frontal nem sempre encaixa bem; a tampa original do leitor às vezes precisa ser transferida para o caddy.</li>
        </ul>

        <h2>Instalação com segurança</h2>
        <ol>
          <li>Desligue por completo, retire o carregador e desconecte o conector da bateria interna antes de tocar na placa.</li>
          <li>Descarregue a estática do corpo antes de manusear o disco. Segure o módulo pelas bordas, nunca pelos contatos.</li>
          <li>Registre a posição de cada parafuso; comprimentos diferentes em posições diferentes são regra.</li>
          <li>No M.2, encaixe em ângulo até o módulo assentar e só então aperte o parafuso — sem pressionar o módulo para baixo antes do encaixe.</li>
          <li>Feche a máquina somente depois de conferir que nenhum cabo ficou preso.</li>
        </ol>

        <h2>Depois de instalar: o disco não aparece sozinho</h2>
        <p>Disco novo vem sem partição. Ele não surge no explorador de arquivos até ser inicializado e formatado pela ferramenta de gerenciamento de discos do sistema. Se nem lá ele aparece, o problema é anterior: encaixe, chaveamento incompatível ou slot desabilitado no firmware.</p>
        <p>Um cuidado extra vale para quem move as pastas pessoais para o disco novo: mover a pasta de perfil inteira por caminhos improvisados costuma quebrar atualizações do sistema. Redirecionar apenas as bibliotecas de documentos, imagens e vídeos é o caminho estável.</p>
        <p>Se a intenção é migrar o sistema atual para o disco novo em vez de apenas ampliar espaço, o procedimento é outro — está em <Link to="/blog/como-clonar-hd-para-ssd">clonagem de HD para SSD</Link>.</p>

        <h2>O que esperar de ganho</h2>
        <p>Um segundo disco amplia espaço; ele não deixa o sistema mais rápido por si só. A percepção de velocidade vem de onde o sistema está instalado e de quanta memória a máquina tem. Notebook com sistema em HD mecânico continua lento mesmo com um SSD adicional guardando arquivos.</p>

        <h2>Quando não vale a pena fazer sozinho</h2>
        <ul>
          <li>Modelos que exigem remover teclado, placa ou tela para chegar ao slot.</li>
          <li>Equipamento na garantia de fábrica — confira as condições antes de abrir.</li>
          <li>Notebook com bateria inchada: a prioridade passa a ser a bateria, não o armazenamento.</li>
          <li>Dúvida sobre compatibilidade do slot: uma peça errada custa mais do que a verificação.</li>
        </ul>
        <p>O critério de verificação e cobrança está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>. A instalação e a migração fazem parte do <Link to="/servicos/upgrade-ssd-ram">upgrade de SSD e memória</Link>, e o roteiro de escolha entre SATA e NVMe está em <Link to="/blog/como-fazer-upgrade-ssd-nvme">upgrade para SSD NVMe</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Confirme no manual de serviço do modelo exato se existe slot M.2 livre, qual o comprimento aceito e qual o tipo suportado. Havendo slot, ele é sempre o melhor caminho. O caddy resolve armazenamento, não desempenho. Corte a energia da bateria antes de abrir, inicialize o disco depois da montagem e não espere ganho de velocidade em uma máquina cujo sistema continua em disco mecânico.</p>
      </>
    ),
  },
  "como-crimpar-cabo-de-rede-rj45": {
    title: "Como Crimpar Cabo de Rede RJ45: Padrão T568A e T568B",
    excerpt: "Procedimento técnico completo para crimpar cabos de rede Cat5e e Cat6 com testagem.",
    date: "2026-04-08",
    readTime: "8 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Crimpar cabos de rede é uma habilidade fundamental para qualquer técnico. Um cabo mal crimpado causa conexão intermitente, lentidão e perda de pacotes. Este guia cobre o procedimento correto com os padrões <strong>T568A e T568B</strong>.</p>

        <h2>Material Necessário</h2>
        <ul>
          <li><strong>Cabo UTP Cat5e ou Cat6</strong> (na metragem desejada, máximo 100m por trecho)</li>
          <li><strong>Conectores RJ45</strong> (use Cat6 se o cabo for Cat6)</li>
          <li><strong>Alicate de crimpagem RJ45</strong></li>
          <li><strong>Decapador de cabo</strong> (ou estilete com cuidado)</li>
          <li><strong>Testador de cabo de rede</strong></li>
        </ul>

        <h2>Padrões de Cores</h2>
        <h3>T568B (Mais Usado no Brasil)</h3>
        <ol>
          <li>Branco/Laranja</li>
          <li>Laranja</li>
          <li>Branco/Verde</li>
          <li>Azul</li>
          <li>Branco/Azul</li>
          <li>Verde</li>
          <li>Branco/Marrom</li>
          <li>Marrom</li>
        </ol>

        <h3>T568A</h3>
        <ol>
          <li>Branco/Verde</li>
          <li>Verde</li>
          <li>Branco/Laranja</li>
          <li>Azul</li>
          <li>Branco/Azul</li>
          <li>Laranja</li>
          <li>Branco/Marrom</li>
          <li>Marrom</li>
        </ol>

        <p><strong>Cabo direto (patch cable):</strong> Use o mesmo padrão nas duas pontas (B-B ou A-A).<br />
        <strong>Cabo crossover:</strong> Use T568A em uma ponta e T568B na outra (raramente necessário hoje).</p>

        <h2>Procedimento Passo a Passo</h2>

        <h3>1. Decape o Cabo</h3>
        <p>Remova cerca de <strong>3 cm da capa externa</strong>, tomando cuidado para não cortar os fios internos. Gire o decapador ao redor do cabo sem pressionar demais.</p>

        <h3>2. Separe e Organize os Pares</h3>
        <p>Destrança cada par e organize os 8 fios na ordem correta do padrão escolhido. Mantenha-os paralelos e retos — <strong>não cruze os fios</strong>.</p>

        <h3>3. Corte Reto</h3>
        <p>Com o alicate, corte os fios retos a aproximadamente <strong>12-14mm</strong> de comprimento. Todos devem ter o mesmo tamanho. A capa do cabo deve entrar pelo menos 5mm dentro do conector.</p>

        <h3>4. Insira no Conector RJ45</h3>
        <p>Segure o conector com a trava para baixo e o lado dos contatos de cobre para cima. Insira os fios mantendo a ordem. <strong>Empurre até que todos os fios toquem a parede frontal do conector</strong> — se algum ficar curto, não haverá contato.</p>

        <h3>5. Crimpe</h3>
        <p>Insira o conector no alicate de crimpagem e pressione com firmeza. Os pinos de cobre devem perfurar o isolamento de cada fio, criando contato elétrico.</p>

        <h3>6. Teste</h3>
        <p>Use o testador de cabo. Todos os 8 LEDs devem acender em sequência (1-8). Se algum não acender ou acender fora de ordem, recorte e refaça.</p>

        <h2>Erros Comuns</h2>
        <ul>
          <li>❌ Fios não encostam no fundo do conector</li>
          <li>❌ Capa do cabo não entra no conector (cabo solto com o tempo)</li>
          <li>❌ Ordem dos fios trocada</li>
          <li>❌ Usar conector Cat5e em cabo Cat6 (diâmetro diferente)</li>
          <li>❌ Decapar demais (fios expostos fora do conector)</li>
        </ul>

        <h2>Cat5e vs Cat6: Qual Usar?</h2>
        <ul>
          <li><strong>Cat5e:</strong> Suporta até 1 Gbps, frequência de 100 MHz. Suficiente para 90% das instalações residenciais e pequenas empresas.</li>
          <li><strong>Cat6:</strong> Suporta até 10 Gbps (em até 55m), frequência de 250 MHz. Recomendado para instalações novas e redes empresariais.</li>
          <li><strong>Cat6a:</strong> 10 Gbps em até 100m. Para data centers e instalações de alta performance.</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Instalação de Rede em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Fazemos cabeamento estruturado, crimpagem, certificação e passagem de cabos em residências e empresas. atendimento sem compromisso.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/como-configurar-rede-wifi-empresarial" className="text-accent">Como configurar rede Wi-Fi empresarial</Link></li>
          <li><Link to="/servicos/redes-e-wifi" className="text-accent">Redes e Wi-Fi</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-bios-uefi-corretamente": {
    title: "Como Configurar BIOS/UEFI Corretamente: Guia Para Técnicos",
    excerpt: "Boot order, XMP, Secure Boot, CSM, TPM — todas as configurações essenciais explicadas.",
    date: "2026-04-08",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">A BIOS/UEFI é o primeiro software que roda quando o computador liga. <strong>Configurações incorretas causam desde lentidão até impossibilidade de dar boot.</strong> Este guia cobre as configurações essenciais que todo técnico precisa conhecer.</p>

        <h2>BIOS vs UEFI: Qual a Diferença?</h2>
        <ul>
          <li><strong>BIOS (Basic Input/Output System):</strong> Interface legada, texto em tela azul, suporta discos MBR até 2TB, boot lento</li>
          <li><strong>UEFI (Unified Extensible Firmware Interface):</strong> Interface gráfica moderna, suporta discos GPT maiores que 2TB, Secure Boot, boot rápido. Todo PC fabricado após 2012 usa UEFI</li>
        </ul>

        <h2>Como Acessar a BIOS/UEFI</h2>
        <p>Pressione a tecla correta durante a inicialização (antes do logo do Windows):</p>
        <ul>
          <li><strong>Del / Delete:</strong> Maioria das placas desktop (ASUS, Gigabyte, MSI, ASRock)</li>
          <li><strong>F2:</strong> Notebooks (Dell, Acer, Lenovo, ASUS)</li>
          <li><strong>F10:</strong> HP</li>
          <li><strong>F1:</strong> Lenovo ThinkPad</li>
          <li><strong>ESC:</strong> Menu de boot em muitos fabricantes</li>
        </ul>

        <h2>Configurações Essenciais</h2>

        <h3>1. Boot Order (Ordem de Boot)</h3>
        <p>Define qual dispositivo o PC tenta iniciar primeiro:</p>
        <ul>
          <li><strong>Para uso normal:</strong> 1º SSD/HD → 2º USB (para emergências)</li>
          <li><strong>Para instalação do Windows:</strong> 1º USB → 2º SSD</li>
          <li><strong>Após instalação:</strong> Voltar para 1º SSD</li>
        </ul>

        <h3>2. AHCI vs IDE (Modo SATA)</h3>
        <p><strong>Sempre use AHCI</strong> para SSDs e HDs modernos. O modo IDE é para compatibilidade com sistemas antigos. Trocar após instalar o Windows causa tela azul — configure antes da formatação.</p>

        <h3>3. XMP / DOCP (Perfil de Memória)</h3>
        <p>A RAM DDR4/DDR5 roda na velocidade base (2133 MHz para DDR4) até que você ative o perfil XMP/DOCP. Se comprou RAM de 3200 MHz e ela roda a 2133 MHz, <strong>ative o XMP na BIOS</strong>.</p>

        <h3>4. Secure Boot</h3>
        <ul>
          <li><strong>Ativado:</strong> Necessário para Windows 11 e impede boot de sistemas não assinados</li>
          <li><strong>Desativado:</strong> Necessário para instalar Linux em algumas configurações ou dar boot por pendrives não UEFI</li>
        </ul>

        <h3>5. CSM (Compatibility Support Module)</h3>
        <ul>
          <li><strong>Desativado:</strong> Para Windows 11 e sistemas UEFI puros (recomendado)</li>
          <li><strong>Ativado:</strong> Para compatibilidade com sistemas legados e hardware antigo</li>
        </ul>

        <h3>6. TPM 2.0</h3>
        <p><strong>Obrigatório para Windows 11.</strong> Em processadores AMD, ative "fTPM" na BIOS. Em Intel, ative "Intel PTT". Geralmente está na seção Security ou Advanced.</p>

        <h3>7. Virtualização (VT-x / AMD-V)</h3>
        <p>Ative se usar máquinas virtuais (VirtualBox, VMware, WSL2, Docker). Geralmente em Advanced → CPU Configuration.</p>

        <h3>8. Fan Control (Controle de Ventiladores)</h3>
        <p>Configure as curvas de ventoinha para equilíbrio entre silêncio e refrigeração. Perfis comuns: Silent (silencioso), Standard (equilibrado), Performance (máxima refrigeração).</p>

        <h2>Configurações Para Evitar Problemas</h2>
        <ul>
          <li>✅ Sempre salve e anote as alterações feitas</li>
          <li>✅ Use "Load Optimized Defaults" se algo der errado</li>
          <li>✅ Atualize a BIOS apenas quando necessário (e nunca durante queda de energia)</li>
          <li>❌ Nunca altere voltagens sem conhecimento (pode queimar componentes)</li>
          <li>❌ Nunca desative o Secure Boot sem motivo</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">PC Não Está Dando Boot?</h3>
          <p className="text-muted-foreground mb-0">Configurações incorretas na BIOS causam vários problemas. Nosso técnico resolve no local em Curitiba e região.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/como-diagnosticar-placa-mae-defeituosa" className="text-accent">Como diagnosticar placa-mãe defeituosa</Link></li>
          <li><Link to="/blog/como-montar-pc-do-zero-guia-completo" className="text-accent">Como montar um PC do zero</Link></li>
          <li><Link to="/servicos/computador-nao-liga" className="text-accent">Computador não liga: causas e soluções</Link></li>
        </ul>
      </>
    ),
  },

  "como-montar-pc-do-zero-guia-completo": {
    title: "Como Montar um PC do Zero: Guia Técnico Passo a Passo",
    excerpt: "Da escolha de componentes à primeira inicialização, com dicas para evitar erros comuns.",
    date: "2026-04-08",
    readTime: "15 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Montar um PC é mais simples do que parece — mas <strong>erros na montagem podem custar caro</strong>. Um componente incompatível, um cabo esquecido ou um cooler mal instalado podem causar desde mau desempenho até danos permanentes. Este guia cobre todo o processo do zero.</p>

        <h2>1. Compatibilidade de Componentes</h2>
        <p>Antes de comprar qualquer peça, verifique a compatibilidade:</p>
        <ul>
          <li><strong>CPU + Placa-mãe:</strong> O soquete deve ser compatível (ex: Intel LGA 1700, AMD AM5)</li>
          <li><strong>RAM + Placa-mãe:</strong> DDR4 não encaixa em slot DDR5 e vice-versa</li>
          <li><strong>Fonte + GPU:</strong> A fonte precisa ter potência e conectores suficientes</li>
          <li><strong>Gabinete + Placa-mãe:</strong> ATX, Micro-ATX ou Mini-ITX devem combinar</li>
          <li><strong>Cooler + Soquete:</strong> Verifique se o cooler suporta o soquete da CPU</li>
        </ul>

        <h2>2. Preparação do Ambiente</h2>
        <ul>
          <li>Superfície limpa, ampla e bem iluminada</li>
          <li>Pulseira antiestática (ou toque no gabinete frequentemente)</li>
          <li>Chave Phillips #1 e #2</li>
          <li>Manuais das peças abertos para consulta</li>
        </ul>

        <h2>3. Ordem de Montagem</h2>

        <h3>Passo 1: Instalar CPU na Placa-Mãe</h3>
        <p>Abra o mecanismo de retenção do soquete. Alinhe o triângulo dourado da CPU com a marca no soquete. <strong>Não force — a CPU encaixa por gravidade.</strong> Feche a trava.</p>

        <h3>Passo 2: Instalar a RAM</h3>
        <p>Abra as travas dos slots. Alinhe o encaixe (notch) do pente com o slot. Pressione firmemente até ouvir o clique nas duas extremidades. <strong>Para 2 pentes, use os slots alternados</strong> (geralmente 2 e 4) para ativar dual-channel.</p>

        <h3>Passo 3: Instalar o SSD M.2 (se aplicável)</h3>
        <p>Localize o slot M.2 na placa-mãe. Insira em ângulo de 30°, pressione e fixe com o parafuso.</p>

        <h3>Passo 4: Instalar o Cooler</h3>
        <p>Aplique pasta térmica (grão de arroz no centro). Monte o cooler seguindo as instruções do fabricante. <strong>Conecte o cabo do fan no header CPU_FAN</strong> — sem isso, o PC pode não ligar.</p>

        <h3>Passo 5: Instalar Placa-Mãe no Gabinete</h3>
        <p>Coloque o I/O shield (espelho traseiro). Posicione a placa sobre os standoffs (espaçadores). Parafuse sem apertar demais.</p>

        <h3>Passo 6: Instalar a Fonte</h3>
        <p>Fixe a fonte no gabinete. Conecte os cabos: ATX 24 pinos (placa-mãe), EPS 8 pinos (CPU), SATA power (HDs/SSDs).</p>

        <h3>Passo 7: Instalar a Placa de Vídeo</h3>
        <p>Remova as tampas traseiras necessárias. Insira no slot PCIe x16 até ouvir o clique. Conecte os cabos de energia (6+2 pinos). <strong>Não use adaptadores Molex → PCIe</strong>.</p>

        <h3>Passo 8: Conectar Cabos do Painel Frontal</h3>
        <p>Power SW, Reset SW, Power LED, HDD LED — consulte o manual da placa-mãe para a posição exata dos pinos. USB 3.0 frontal conecta no header interno.</p>

        <h3>Passo 9: Gerenciamento de Cabos</h3>
        <p>Organize os cabos atrás da bandeja do gabinete para melhor fluxo de ar.</p>

        <h2>4. Primeira Inicialização</h2>
        <ol>
          <li>Conecte monitor, teclado e mouse</li>
          <li>Ligue a fonte (chave traseira)</li>
          <li>Pressione o botão power</li>
          <li>Entre na BIOS e verifique se CPU, RAM e discos são reconhecidos</li>
          <li>Configure boot order para USB e instale o Windows</li>
        </ol>

        <h2>Checklist de Problemas Comuns</h2>
        <ul>
          <li><strong>PC não liga:</strong> Verifique cabo ATX 24 pinos e EPS 8 pinos. Chave da fonte está ligada?</li>
          <li><strong>Sem imagem:</strong> RAM encaixada corretamente? GPU com energia? Monitor no cabo certo?</li>
          <li><strong>Apenas ventiladores giram:</strong> RAM incompatível ou mal encaixada é a causa mais comum</li>
          <li><strong>Reinicia em loop:</strong> CPU sem cooler ou pasta térmica</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Montagem de PC em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Montamos seu PC gamer, workstation ou escritório com componentes de sua escolha. Teste de estresse incluso. Atendimento em Curitiba.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/como-configurar-bios-uefi-corretamente" className="text-accent">Como configurar BIOS/UEFI corretamente</Link></li>
          <li><Link to="/blog/erros-comuns-upgrade-computador" className="text-accent">5 erros comuns ao fazer upgrade</Link></li>
          <li><Link to="/servicos/montagem-pc" className="text-accent">Serviço de Montagem de PC</Link></li>
        </ul>
      </>
    ),
  },

  "como-instalar-linux-dual-boot-windows": {
    title: "Como Instalar Linux em Dual Boot com Windows: Procedimento Seguro",
    excerpt: "Ubuntu, Mint ou Fedora ao lado do Windows sem perder dados. Procedimento passo a passo.",
    date: "2026-04-08",
    readTime: "10 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Dual boot permite ter <strong>Windows e Linux no mesmo computador</strong>, escolhendo qual sistema usar a cada inicialização. É ideal para quem quer experimentar Linux sem abandonar o Windows. O procedimento exige cuidado para não perder dados.</p>

        <h2>Pré-Requisitos</h2>
        <ul>
          <li><strong>Backup completo dos dados importantes</strong> (essencial!)</li>
          <li>Pen drive de 8 GB ou mais</li>
          <li>Pelo menos 50 GB de espaço livre no disco</li>
          <li>Distribuição Linux escolhida (Ubuntu, Linux Mint, Fedora)</li>
          <li>Software para criar USB bootável: <strong>Rufus</strong> (Windows) ou <strong>Balena Etcher</strong></li>
        </ul>

        <h2>Passo 1: Escolha a Distribuição</h2>
        <ul>
          <li><strong>Ubuntu:</strong> Mais popular, maior comunidade, ideal para iniciantes</li>
          <li><strong>Linux Mint:</strong> Interface similar ao Windows, muito amigável</li>
          <li><strong>Fedora:</strong> Mais atual, bom para desenvolvedores</li>
          <li><strong>Pop!_OS:</strong> Excelente para hardware NVIDIA</li>
        </ul>

        <h2>Passo 2: Criar Espaço no Disco</h2>
        <p>No Windows, abra <strong>Gerenciamento de Disco</strong> (diskmgmt.msc):</p>
        <ol>
          <li>Clique com botão direito na partição do Windows (geralmente C:)</li>
          <li>Selecione "Diminuir Volume"</li>
          <li>Insira o tamanho a reduzir (mínimo 50.000 MB = 50 GB)</li>
          <li>O espaço ficará como "Não Alocado" — deixe assim</li>
        </ol>

        <h2>Passo 3: Criar USB Bootável</h2>
        <ol>
          <li>Baixe a ISO da distribuição escolhida (site oficial)</li>
          <li>Abra o Rufus, selecione o pen drive e a ISO</li>
          <li>Esquema de partição: <strong>GPT</strong> (para UEFI)</li>
          <li>Clique em Iniciar e aguarde</li>
        </ol>

        <h2>Passo 4: Desativar Fast Startup e Secure Boot</h2>
        <ul>
          <li><strong>Fast Startup:</strong> Painel de Controle → Opções de Energia → "Alterar o que os botões de energia fazem" → Desmarque "Ligar inicialização rápida"</li>
          <li><strong>Secure Boot:</strong> Desative na BIOS (pode ser reativado depois em algumas distros)</li>
          <li><strong>BitLocker:</strong> Se ativo, suspenda antes de mexer nas partições</li>
        </ul>

        <h2>Passo 5: Boot pelo Pen Drive</h2>
        <p>Reinicie e entre no menu de boot (geralmente F12, F8 ou ESC). Selecione o pen drive USB UEFI.</p>

        <h2>Passo 6: Instalação do Linux</h2>
        <ol>
          <li>Escolha "Instalar ao lado do Windows" (opção mais segura)</li>
          <li>O instalador reconhece o espaço não alocado automaticamente</li>
          <li>Se preferir particionamento manual: crie partição <strong>EXT4</strong> para / (raiz) e opcionalmente uma partição <strong>swap</strong> (igual à RAM)</li>
          <li>Selecione o bootloader no disco principal (sda ou nvme0n1)</li>
          <li>Prossiga com a instalação normalmente</li>
        </ol>

        <h2>Passo 7: GRUB (Menu de Boot)</h2>
        <p>Após reiniciar, o <strong>GRUB</strong> aparecerá oferecendo a escolha entre Linux e Windows. Se o GRUB não aparecer, entre na BIOS e altere a ordem de boot para o Linux primeiro.</p>

        <h2>Problemas Comuns</h2>
        <ul>
          <li><strong>Windows não aparece no GRUB:</strong> Execute <code>sudo update-grub</code> no Linux</li>
          <li><strong>Horário errado alternando entre sistemas:</strong> No Linux, execute <code>timedatectl set-local-rtc 1</code></li>
          <li><strong>Wi-Fi não funciona no Linux:</strong> Alguns chips Realtek e Broadcom precisam de drivers adicionais</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Instalação de Linux em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Instalamos e configuramos Linux (Ubuntu, Mint, Fedora) em dual boot com Windows, com drivers e aplicativos. Atendimento em domicílio.</p>
        </div>
      </>
    ),
  },

  "como-configurar-backup-automatizado": {
    title: "Como Configurar Backup Automatizado: Local e Nuvem",
    excerpt: "Procedimento técnico para implementar backup 3-2-1 com agendamento automático.",
    date: "2026-04-08",
    readTime: "9 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">A regra de ouro do backup é a <strong>estratégia 3-2-1</strong>: 3 cópias dos dados, em 2 tipos de mídia diferentes, com 1 cópia off-site (fora do local). Este guia mostra como implementar backup automatizado para residências e empresas.</p>

        <h2>A Regra 3-2-1 Na Prática</h2>
        <ul>
          <li><strong>Cópia 1:</strong> Dados originais no computador (SSD/HD principal)</li>
          <li><strong>Cópia 2:</strong> Backup local — HD externo, NAS ou outro disco</li>
          <li><strong>Cópia 3:</strong> Backup na nuvem — Google Drive, OneDrive, Backblaze, etc.</li>
        </ul>

        <h2>Backup Local Automatizado no Windows</h2>

        <h3>Método 1: Histórico de Arquivos (Windows 10/11)</h3>
        <ol>
          <li>Conecte um HD externo</li>
          <li>Configurações → Atualização e Segurança → Backup</li>
          <li>Ative "Fazer backup automaticamente dos meus arquivos"</li>
          <li>Em "Mais opções", configure intervalo (a cada 1 hora é ideal) e quais pastas incluir</li>
        </ol>

        <h3>Método 2: Imagem do Sistema (Backup Completo)</h3>
        <ol>
          <li>Painel de Controle → Backup e Restauração (Windows 7)</li>
          <li>Clique em "Criar uma imagem do sistema"</li>
          <li>Selecione o disco de destino</li>
          <li>Inclua todas as partições do sistema</li>
          <li>Para automatizar, crie uma tarefa no <strong>Agendador de Tarefas</strong> usando <code>wbAdmin</code></li>
        </ol>

        <h3>Método 3: Robocopy (Para Técnicos)</h3>
        <p>Script batch automatizado com Robocopy para backup incremental:</p>
        <p><code>robocopy "C:\Users\Dados" "D:\Backup" /MIR /R:3 /W:10 /LOG:D:\backup.log</code></p>
        <p>Agende no <strong>Agendador de Tarefas</strong> para rodar diariamente às 2h da manhã.</p>

        <h2>Backup na Nuvem</h2>

        <h3>Opções Gratuitas</h3>
        <ul>
          <li><strong>Google Drive:</strong> 15 GB grátis. App Desktop sincroniza pastas automaticamente</li>
          <li><strong>OneDrive:</strong> 5 GB grátis (15 GB com Microsoft 365). Integrado ao Windows</li>
          <li><strong>Mega:</strong> 20 GB grátis com criptografia de ponta a ponta</li>
        </ul>

        <h3>Opções Profissionais (Ilimitado)</h3>
        <ul>
          <li><strong>Backblaze:</strong> US$ 7/mês, backup ilimitado, ideal para empresas pequenas</li>
          <li><strong>Acronis Cyber Protect:</strong> Backup + antivírus + anti-ransomware integrado</li>
          <li><strong>Veeam:</strong> Solução empresarial, suporta servidores e máquinas virtuais</li>
        </ul>

        <h2>Backup Para Empresas (NAS)</h2>
        <p>Para empresas com múltiplos computadores, o ideal é um <strong>NAS (Network Attached Storage)</strong>:</p>
        <ul>
          <li><strong>Synology DS220+:</strong> 2 baias, interface web intuitiva, apps de backup automático</li>
          <li><strong>QNAP TS-251D:</strong> 2 baias, suporte a RAID 1 (espelhamento)</li>
          <li>Configure <strong>RAID 1</strong> para que se um HD falhar, o outro mantém os dados</li>
          <li>Sincronize o NAS com nuvem (Synology C2 ou Backblaze B2) para backup off-site</li>
        </ul>

        <h2>Testando o Backup</h2>
        <p><strong>Um backup que nunca foi testado não é um backup.</strong> Periodicamente:</p>
        <ul>
          <li>Tente restaurar um arquivo aleatório do backup</li>
          <li>Verifique se o backup mais recente está sendo feito (veja data e hora)</li>
          <li>Teste a restauração completa do sistema em uma máquina separada</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Configuração de Backup em Curitiba</h3>
          <p className="text-muted-foreground mb-0">Implementamos backup automatizado para sua casa ou empresa. Local + nuvem com monitoramento. Nunca mais perca arquivos importantes.</p>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/backup-como-proteger-seus-arquivos" className="text-accent">Backup: como proteger seus arquivos</Link></li>
          <li><Link to="/blog/backup-nuvem-empresas-qual-escolher" className="text-accent">Backup na nuvem para empresas</Link></li>
          <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">Recuperação de dados e backup</Link></li>
        </ul>
      </>
    ),
  },

  "preciso-de-um-para-eletricistas": {
    title: "Preciso de Um Para Eletricistas: Como Conseguir Mais Clientes",
    excerpt: "Guia completo para eletricistas se cadastrarem e se destacarem na plataforma.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Se você é eletricista e ainda depende só de indicação, está perdendo clientes para colegas que já estão online. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> é a plataforma onde clientes buscam eletricistas por região — e <strong>os profissionais cadastrados recebem contatos diretos via WhatsApp</strong>.</p>

        <h2>Por Que Eletricistas Devem Estar na Plataforma?</h2>
        <p>Eletricista é uma das <strong>categorias mais procuradas</strong> no Preciso de Um. Serviços elétricos são urgentes por natureza — quando uma tomada para de funcionar ou um curto-circuito acontece, o cliente precisa de alguém <strong>agora</strong>. Quem aparece primeiro, fecha o serviço.</p>

        <h2>Serviços Que Você Pode Oferecer</h2>
        <ul>
          <li>⚡ Instalação e troca de fiação elétrica</li>
          <li>⚡ Troca de disjuntores e quadro de distribuição</li>
          <li>⚡ Instalação de tomadas, interruptores e luminárias</li>
          <li>⚡ Instalação de chuveiro elétrico</li>
          <li>⚡ Laudo técnico e adequação de instalações</li>
          <li>⚡ Instalação de geradores e nobreaks</li>
          <li>⚡ Projetos elétricos residenciais e comerciais</li>
        </ul>

        <h2>Faixa de Preço na Plataforma</h2>
        <p>Serviços elétricos no Preciso de Um têm faixa de <strong>R$ 120 a R$ 216</strong> para serviços básicos. Projetos maiores como adequação de quadro ou troca completa de fiação podem chegar a R$ 2.000+. Você define seus preços.</p>

        <h2>Como Se Destacar Como Eletricista</h2>
        <ol>
          <li><strong>Destaque certificações:</strong> NR-10, NR-35, CREA se tiver</li>
          <li><strong>Fotos de trabalhos:</strong> Quadros organizados, instalações limpas</li>
          <li><strong>Resposta rápida:</strong> Clientes com problema elétrico não esperam</li>
          <li><strong>Área de atendimento clara:</strong> Defina bairros e cidades que atende</li>
          <li><strong>Ofereça garantia:</strong> Diferencial que transmite segurança</li>
        </ol>

        <h2>Exemplo de Sucesso</h2>
        <p>Eletricistas como <strong>Angel Americo</strong> (Araucária, 6+ anos de experiência) e <strong>Eloiza Kirach</strong> (Pinhais) já estão na plataforma recebendo contatos diários. Você pode ser o próximo.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Cadastre-se Como Eletricista</h3>
          <p className="text-muted-foreground mb-4">Crie seu perfil gratuito no Preciso de Um e comece a receber clientes que precisam de serviços elétricos na sua região.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Cadastrar agora →
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-para-pintores-pedreiros": {
    title: "Preciso de Um Para Pintores e Pedreiros: Sua Vitrine Digital",
    excerpt: "Como profissionais de construção e pintura podem atrair clientes pela plataforma.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">Pintores e pedreiros são profissionais com altíssima demanda — mas que frequentemente dependem apenas do boca a boca. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> funciona como sua <strong>vitrine digital</strong>: clientes buscam profissionais de construção e pintura, veem seu portfólio e entram em contato direto.</p>

        <h2>Construção Civil: A Categoria Mais Forte</h2>
        <p><strong>Construção Civil é a categoria com mais profissionais</strong> no Preciso de Um — o que comprova a demanda. Profissionais como <strong>Rodrigo Macariu</strong> (Fazenda Rio Grande, 10+ anos) e <strong>Sidnei Santos de Paula</strong> (Araucária, serralheiro com 31+ anos) já estão presentes e recebendo contatos.</p>

        <h2>Serviços de Pintura</h2>
        <ul>
          <li>🎨 Pintura residencial interna e externa</li>
          <li>🎨 Pintura comercial</li>
          <li>🎨 Textura e efeitos decorativos</li>
          <li>🎨 Pintura de fachadas</li>
          <li>🎨 Impermeabilização</li>
          <li>🎨 Pintura epóxi para pisos</li>
        </ul>

        <h2>Serviços de Construção</h2>
        <ul>
          <li>🏗️ Reformas residenciais e comerciais</li>
          <li>🏗️ Alvenaria e reboco</li>
          <li>🏗️ Pisos e revestimentos</li>
          <li>🏗️ Construção de muros e portões</li>
          <li>🏗️ Telhados e coberturas</li>
          <li>🏗️ Acabamento e gesso</li>
        </ul>

        <h2>O Poder do Portfólio Visual</h2>
        <p>Para pintores e pedreiros, <strong>fotos de trabalhos anteriores são o melhor argumento de venda</strong>. Na plataforma, você pode adicionar fotos do antes e depois, mostrando a qualidade do seu trabalho.</p>

        <h3>Dicas Para Fotos de Portfólio</h3>
        <ul>
          <li>📸 Tire fotos do <strong>antes e depois</strong></li>
          <li>📸 Fotografe com boa iluminação (luz natural)</li>
          <li>📸 Mostre detalhes de acabamento</li>
          <li>📸 Inclua obras de diferentes tamanhos (apartamento, casa, comercial)</li>
        </ul>

        <h2>Por Que o Digital é Essencial</h2>
        <p>O cliente moderno pesquisa antes de contratar. Se você não está online, ele vai contratar quem está. Com um perfil no Preciso de Um, você:</p>
        <ul>
          <li>✅ É encontrado por clientes que precisam do seu serviço AGORA</li>
          <li>✅ Mostra experiência e portfólio</li>
          <li>✅ Recebe contato direto no WhatsApp</li>
          <li>✅ Não paga nada — o cadastro é gratuito</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Mostre Seu Trabalho ao Mundo</h3>
          <p className="text-muted-foreground mb-4">Cadastre-se no Preciso de Um, monte seu portfólio e receba clientes que precisam de pintores e pedreiros na sua região.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Criar meu perfil grátis →
          </a>
        </div>
      </>
    ),
  },

  "preciso-de-um-para-tecnicos-informatica": {
    title: "Preciso de Um Para Técnicos em Informática: Amplie Sua Atuação",
    excerpt: "Como técnicos de TI podem usar a plataforma para expandir a carteira de clientes.",
    date: "2026-04-08",
    readTime: "7 min",
    category: "Plataformas",
    content: (
      <>
        <p className="lead">O mercado de assistência técnica em informática é competitivo — e a maioria dos técnicos depende apenas de indicação e redes sociais. O <a href="https://precisodeum.com.br" target="_blank" rel="noopener noreferrer" className="text-accent">Preciso de Um</a> oferece um canal adicional de captação de clientes que <strong>funciona 24 horas, é gratuito e traz clientes que já estão procurando exatamente o que você faz</strong>.</p>

        <h2>Por Que Técnicos de Informática São Essenciais na Plataforma</h2>
        <p><strong>"Técnico em Informática"</strong> está entre as categorias mais buscadas no Preciso de Um, com profissionais cadastrados em Curitiba, São Paulo, Rio de Janeiro e Belém. A demanda é constante porque computadores quebram todos os dias.</p>

        <h2>Serviços Que Você Pode Anunciar</h2>
        <ul>
          <li>💻 Formatação de computador e notebook</li>
          <li>💻 Remoção de vírus e malware</li>
          <li>💻 Upgrade de SSD e memória RAM</li>
          <li>💻 Conserto de hardware (tela, teclado, placa-mãe)</li>
          <li>💻 Configuração de redes Wi-Fi</li>
          <li>💻 Backup e recuperação de dados</li>
          <li>💻 Montagem de PC gamer e workstation</li>
          <li>💻 Suporte remoto para empresas</li>
          <li>💻 Instalação de câmeras CFTV</li>
        </ul>

        <h2>Estratégia Para Se Destacar</h2>
        <ol>
          <li><strong>Especialize-se:</strong> "Técnico em informática" é genérico. Destaque especialidades: "Especialista em notebook", "Recuperação de dados", "Redes empresariais"</li>
          <li><strong>Defina sua região:</strong> Clientes buscam por proximidade. Quanto mais específico, melhor</li>
          <li><strong>Preço transparente:</strong> Indique faixas de preço. Clientes não gostam de surpresas</li>
          <li><strong>Tempo de resposta:</strong> Seja rápido no WhatsApp. O primeiro que responde geralmente fecha</li>
          <li><strong>Peça avaliações:</strong> Após cada serviço, peça ao cliente para avaliar na plataforma</li>
        </ol>

        <h2>Vantagem Sobre Outras Plataformas</h2>
        <ul>
          <li>✅ <strong>Sem comissão:</strong> Você recebe 100% do valor do serviço</li>
          <li>✅ <strong>Contato direto:</strong> WhatsApp, sem chat intermediário</li>
          <li>✅ <strong>Cadastro gratuito:</strong> Sem mensalidade ou taxa de adesão</li>
          <li>✅ <strong>Parceiros de peso:</strong> Balaroti, Philips e Leroy Merlin validam a credibilidade</li>
        </ul>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Expanda Sua Carteira de Clientes</h3>
          <p className="text-muted-foreground mb-4">Cadastre-se gratuitamente no Preciso de Um e comece a receber chamados de clientes que precisam de técnico em informática na sua região.</p>
          <a href="https://precisodeum.com.br/cadastro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
            Quero me cadastrar →
          </a>
        </div>

        <p><strong>Leia também:</strong></p>
        <ul>
          <li><Link to="/blog/preciso-de-um-plataforma-prestadores" className="text-accent">O que é o Preciso de Um?</Link></li>
          <li><Link to="/blog/como-cadastrar-preciso-de-um" className="text-accent">Como se cadastrar passo a passo</Link></li>
          <li><Link to="/seja-parceiro" className="text-accent">Seja parceiro da O Técnico de Informática</Link></li>
        </ul>
      </>
    ),
  },

  "como-configurar-servidor-de-arquivos": {
    title: "Como Configurar Servidor de Arquivos em Rede Local (Windows e Linux)",
    excerpt: "Procedimento técnico completo para montar um file server com permissões, mapeamento e backup.",
    date: "2026-04-13",
    readTime: "14 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Um servidor de arquivos centraliza o armazenamento e o compartilhamento de documentos em uma rede local, eliminando pen drives e pastas duplicadas. Neste guia, mostramos como configurar um file server tanto no <strong>Windows</strong> quanto no <strong>Linux</strong>, com permissões, mapeamento automático e rotina de backup.</p>

        <h2>Quando Vale a Pena Ter um Servidor de Arquivos</h2>
        <ul>
          <li>Escritórios com 3+ computadores que precisam compartilhar documentos</li>
          <li>Empresas que precisam de controle de acesso por usuário/departamento</li>
          <li>Ambientes que exigem backup centralizado e versionamento</li>
          <li>Substituição de soluções em nuvem por questões de privacidade ou velocidade</li>
        </ul>

        <h2>Opção 1: Windows — Compartilhamento com Permissões</h2>

        <h3>Passo 1: Preparar o Computador Servidor</h3>
        <ul>
          <li>Use Windows 10/11 Pro ou Windows Server (o Home tem limitação de 20 conexões)</li>
          <li>Defina IP fixo: <code>Configurações → Rede → Ethernet → Editar → Manual → IPv4</code></li>
          <li>Exemplo: IP <code>192.168.1.100</code>, Máscara <code>255.255.255.0</code>, Gateway <code>192.168.1.1</code></li>
        </ul>

        <h3>Passo 2: Criar a Estrutura de Pastas</h3>
        <pre><code>{"D:\\SERVIDOR\\\n├── Financeiro\\\n├── Comercial\\\n├── RH\\\n├── TI\\\n└── Público\\"}</code></pre>

        <h3>Passo 3: Criar Usuários e Grupos</h3>
        <ol>
          <li>Abra <code>lusrmgr.msc</code> (Gerenciamento de Usuários Locais)</li>
          <li>Crie usuários: <code>joao.silva</code>, <code>maria.rh</code>, etc.</li>
          <li>Crie grupos: <code>GRP_Financeiro</code>, <code>GRP_Comercial</code>, <code>GRP_RH</code></li>
          <li>Adicione cada usuário ao grupo correspondente</li>
        </ol>

        <h3>Passo 4: Compartilhar e Definir Permissões</h3>
        <ol>
          <li>Clique com botão direito na pasta → Propriedades → Compartilhamento Avançado</li>
          <li>Marque "Compartilhar esta pasta"</li>
          <li>Em Permissões: remova "Todos", adicione o grupo com Controle Total</li>
          <li>Na aba Segurança (NTFS): configure permissões granulares</li>
        </ol>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <p className="text-sm"><strong>⚠️ Regra de ouro:</strong> As permissões de Compartilhamento e NTFS são cumulativas — a mais restritiva prevalece. Configure ambas corretamente.</p>
        </div>

        <h3>Passo 5: Mapear nos Clientes</h3>
        <pre><code>{"net use S: \\\\192.168.1.100\\Financeiro /user:joao.silva Senha123! /persistent:yes"}</code></pre>

        <h2>Opção 2: Linux — Samba File Server</h2>

        <h3>Instalação do Samba</h3>
        <pre><code>{"sudo apt update\nsudo apt install samba samba-common-bin -y"}</code></pre>

        <h3>Criar Estrutura e Usuários</h3>
        <pre><code>{"sudo mkdir -p /srv/samba/financeiro\nsudo mkdir -p /srv/samba/publico\nsudo groupadd grp_financeiro\nsudo useradd -M -s /usr/sbin/nologin joao\nsudo smbpasswd -a joao\nsudo chown -R root:grp_financeiro /srv/samba/financeiro\nsudo chmod -R 2770 /srv/samba/financeiro"}</code></pre>

        <h3>Configurar smb.conf</h3>
        <pre><code>{"[Financeiro]\n   path = /srv/samba/financeiro\n   browseable = yes\n   read only = no\n   valid users = @grp_financeiro\n   create mask = 0660\n\n[Publico]\n   path = /srv/samba/publico\n   browseable = yes\n   read only = no\n   guest ok = yes"}</code></pre>

        <h2>Opção 3: NAS Dedicado</h2>
        <ul>
          <li><strong>Synology DS224+</strong> — ideal para até 20 usuários, interface web intuitiva</li>
          <li><strong>QNAP TS-264</strong> — com saída HDMI e virtualização</li>
          <li>Configure RAID 1 (espelhamento) para proteção contra falha de disco</li>
          <li>Habilite snapshots automáticos para versionamento</li>
        </ul>

        <h2>Backup do Servidor</h2>
        <pre><code>{"# Windows (Robocopy)\nrobocopy D:\\SERVIDOR\\ E:\\BACKUP\\ /MIR /LOG:C:\\Logs\\backup.log\n\n# Linux (rsync + cron)\n0 23 * * * rsync -avz --delete /srv/samba/ /mnt/backup/"}</code></pre>

        <h2>Checklist Final</h2>
        <ul>
          <li>✅ IP fixo configurado no servidor</li>
          <li>✅ Pastas com estrutura departamental</li>
          <li>✅ Usuários e grupos com permissões NTFS + compartilhamento</li>
          <li>✅ Mapeamento automático nos clientes</li>
          <li>✅ Backup agendado (local + off-site)</li>
          <li>✅ Firewall configurado e antivírus ativo</li>
        </ul>
      </>
    ),
  },

  "como-fazer-manutencao-impressora": {
    title: "Como Fazer Manutenção em Impressora: Jato de Tinta e Laser",
    excerpt: "Limpeza de cabeçote, troca de toner, reset de contador e diagnóstico de falhas comuns.",
    date: "2026-04-13",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Impressoras exigem manutenção preventiva regular. Sem ela, entupimento de cabeçote, manchas e atolamento se tornam frequentes. Este guia cobre os dois tipos mais comuns: <strong>jato de tinta</strong> e <strong>laser</strong>.</p>

        <h2>Manutenção de Impressora Jato de Tinta</h2>

        <h3>Cabeçote Entupido (Impressão com Falhas)</h3>
        <p>O problema mais comum — acontece quando a impressora fica sem uso por mais de 7-10 dias.</p>

        <h4>Limpeza Via Software</h4>
        <ol>
          <li>Abra o painel da impressora (HP Smart, Epson Utility, Canon IJ)</li>
          <li>Execute "Limpeza de Cabeçote" — força tinta pelos bicos</li>
          <li>Imprima página de teste de bicos (nozzle check)</li>
          <li>Se persistir, execute "Limpeza Profunda" (consome mais tinta)</li>
          <li>Repita no máximo 3 vezes — mais pode danificar o cabeçote</li>
        </ol>

        <h4>Limpeza Manual do Cabeçote</h4>
        <ol>
          <li>Remova os cartuchos de tinta</li>
          <li>Se o cabeçote for removível (HP, Canon): retire com cuidado</li>
          <li>Coloque com os bicos para baixo em água destilada morna (~50°C)</li>
          <li>Deixe de molho por 2-4 horas</li>
          <li>Seque com papel toalha sem esfregar</li>
          <li>Reinstale e execute 2 ciclos de limpeza via software</li>
        </ol>

        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <p className="text-sm"><strong>⚠️ Epson:</strong> O cabeçote é fixo (não removível). Use seringa sem agulha com água destilada para injetar lentamente pelos encaixes dos cartuchos.</p>
        </div>

        <h3>Impressora Puxa Múltiplas Folhas</h3>
        <ul>
          <li>Limpe os rolos com pano úmido e álcool isopropílico</li>
          <li>Verifique se o papel não está úmido</li>
          <li>Abanem a resma antes de colocar na bandeja</li>
          <li>Rolos gastos (lisos) precisam ser substituídos</li>
        </ul>

        <h3>Não Reconhece Cartucho</h3>
        <ul>
          <li>Limpe contatos elétricos com cotonete e álcool isopropílico</li>
          <li>Limpe também os contatos dentro da impressora</li>
          <li>Cartuchos remanufaturados podem ter chip incompatível</li>
        </ul>

        <h2>Manutenção de Impressora Laser</h2>

        <h3>Impressão com Manchas ou Listras</h3>
        <ul>
          <li><strong>Listras verticais:</strong> Toner com defeito ou cilindro riscado — substitua</li>
          <li><strong>Manchas repetitivas:</strong> Fusor sujo — limpe com pano seco quando frio</li>
          <li><strong>Fundo cinza:</strong> Toner vazando — verifique vedação</li>
          <li><strong>Pontos pretos:</strong> Cilindro com marca — troca do drum</li>
        </ul>

        <h3>Atolamento Frequente</h3>
        <ol>
          <li>Remova papel atolado puxando na direção do fluxo</li>
          <li>Verifique pedaços de papel presos nos rolos</li>
          <li>Limpe os rolos de alimentação</li>
          <li>Use papel 75g/m² ou 80g/m²</li>
        </ol>

        <h3>Trocar o Toner</h3>
        <ol>
          <li>Desligue a impressora e abra a tampa frontal</li>
          <li>Retire o cartucho antigo pelo puxador</li>
          <li>Balance o novo toner horizontalmente 5-6 vezes</li>
          <li>Remova a fita de proteção</li>
          <li>Insira até ouvir o clique</li>
        </ol>

        <h3>Reset do Contador de Toner</h3>
        <pre><code>{"Brother HL-L2350DW:\n1. Abra a tampa frontal\n2. Segure botão OK\n3. Navegue até Reset Toner → Confirme\n\nSamsung M2020/M2070:\n1. Ligue segurando Menu\n2. Configurações → Manutenção → Vida do Toner\n3. Selecione Reset"}</code></pre>

        <h2>Cronograma de Manutenção Preventiva</h2>
        <ul>
          <li><strong>Semanal:</strong> Imprimir 1 página colorida (jato de tinta)</li>
          <li><strong>Mensal:</strong> Limpeza de cabeçote via software / limpar exterior</li>
          <li><strong>Trimestral:</strong> Limpar rolos de alimentação</li>
          <li><strong>Anual:</strong> Troca de almofada de resíduos / kit fusor</li>
        </ul>

        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
          <p className="text-sm"><strong>🚫 NUNCA use aspirador de pó comum em impressora laser.</strong> O pó de toner passa pelo filtro, danifica o motor e espalha partículas tóxicas. Use apenas aspiradores com filtro HEPA para toner.</p>
        </div>
      </>
    ),
  },

  "como-configurar-vpn-empresarial": {
    title: "Como Configurar VPN Empresarial: Acesso Remoto Seguro",
    excerpt: "Procedimento técnico para implementar VPN com WireGuard, OpenVPN e Windows Server.",
    date: "2026-04-13",
    readTime: "13 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Uma VPN permite que colaboradores acessem a rede interna da empresa de forma segura pela internet. Essencial para home office, filiais e acesso remoto a servidores. Mostramos 3 abordagens: <strong>WireGuard</strong>, <strong>OpenVPN</strong> e <strong>Windows Server RRAS</strong>.</p>

        <h2>Quando Sua Empresa Precisa de VPN</h2>
        <ul>
          <li>Home office com acesso a arquivos do servidor</li>
          <li>Filiais se comunicando com a matriz</li>
          <li>Acesso remoto a ERP, câmeras CFTV ou servidores</li>
          <li>Proteção de dados em redes Wi-Fi públicas</li>
          <li>Conformidade com LGPD — criptografia em trânsito</li>
        </ul>

        <h2>Opção 1: WireGuard (Recomendada)</h2>
        <p>Protocolo mais moderno: rápido, leve e com criptografia state-of-the-art.</p>

        <h3>Instalação no Servidor Linux</h3>
        <pre><code>{"sudo apt update && sudo apt install wireguard -y\n\n# Gerar chaves\nwg genkey | tee /etc/wireguard/server_private.key | wg pubkey > /etc/wireguard/server_public.key\nchmod 600 /etc/wireguard/server_private.key"}</code></pre>

        <h3>Configuração do Servidor (wg0.conf)</h3>
        <pre><code>{"[Interface]\nAddress = 10.0.0.1/24\nListenPort = 51820\nPrivateKey = SERVER_PRIVATE_KEY\nPostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE\nPostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE\n\n[Peer]\nPublicKey = CLIENTE_PUBLIC_KEY\nAllowedIPs = 10.0.0.2/32"}</code></pre>

        <h3>Ativar</h3>
        <pre><code>{"echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf\nsudo sysctl -p\nsudo wg-quick up wg0\nsudo systemctl enable wg-quick@wg0"}</code></pre>

        <h3>Configuração do Cliente</h3>
        <pre><code>{"[Interface]\nAddress = 10.0.0.2/32\nPrivateKey = CLIENTE_PRIVATE_KEY\nDNS = 8.8.8.8\n\n[Peer]\nPublicKey = SERVER_PUBLIC_KEY\nEndpoint = IP_PUBLICO:51820\nAllowedIPs = 192.168.1.0/24, 10.0.0.0/24\nPersistentKeepalive = 25"}</code></pre>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 my-6">
          <p className="text-sm"><strong>✅ Split Tunnel vs Full Tunnel:</strong> Use <code>AllowedIPs = 192.168.1.0/24</code> para acessar apenas a rede interna, ou <code>0.0.0.0/0</code> para rotear todo o tráfego pela VPN.</p>
        </div>

        <h2>Opção 2: OpenVPN</h2>
        <p>Protocolo mais estabelecido — funciona em praticamente qualquer dispositivo e firewall.</p>

        <h3>Instalação Rápida</h3>
        <pre><code>{"curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh\nchmod +x openvpn-install.sh\nsudo ./openvpn-install.sh"}</code></pre>
        <p>O script interativo configura tudo e gera um arquivo <code>.ovpn</code> para importar no OpenVPN Connect do colaborador.</p>

        <h3>Adicionar Novos Usuários</h3>
        <pre><code>{"sudo ./openvpn-install.sh\n# Selecione 'Add a new client'\n# O .ovpn será gerado em /root/"}</code></pre>

        <h2>Opção 3: Windows Server RRAS</h2>
        <ol>
          <li>Server Manager → Add Roles → Remote Access → RRAS</li>
          <li>Configure SSTP ou IKEv2 (mais seguros que PPTP)</li>
          <li>Defina pool de IPs para clientes VPN</li>
          <li>Configure NPS para controle de acesso via Active Directory</li>
        </ol>

        <h2>Portas e Firewall</h2>
        <ul>
          <li><strong>WireGuard:</strong> UDP 51820</li>
          <li><strong>OpenVPN:</strong> UDP 1194</li>
          <li><strong>IKEv2:</strong> UDP 500, 4500</li>
          <li><strong>SSTP:</strong> TCP 443</li>
        </ul>
        <p>Configure port forwarding no roteador e libere no firewall do servidor.</p>

        <h2>Comparativo</h2>
        <ul>
          <li><strong>WireGuard:</strong> Mais rápido e simples. Ideal para PMEs sem AD</li>
          <li><strong>OpenVPN:</strong> Mais compatível. Funciona atrás de proxies e firewalls restritivos</li>
          <li><strong>RRAS:</strong> Integração nativa com Active Directory. Requer licença Windows Server</li>
        </ul>

        <h2>Segurança</h2>
        <ul>
          <li>Use certificados + senha (two-factor) quando possível</li>
          <li>Ative logging para auditoria de conexões</li>
          <li>Limite acesso VPN apenas aos recursos necessários</li>
          <li>Revogue acesso imediatamente ao desligar colaborador</li>
          <li>Mantenha o software VPN sempre atualizado</li>
        </ul>

        <h2>Checklist de Implementação</h2>
        <ul>
          <li>✅ Protocolo escolhido adequado ao cenário</li>
          <li>✅ IP fixo ou DDNS configurado</li>
          <li>✅ Port forwarding no roteador</li>
          <li>✅ Firewall configurado</li>
          <li>✅ Chaves/certificados para cada usuário</li>
          <li>✅ Teste de conexão externa (4G do celular)</li>
          <li>✅ Documentação entregue aos colaboradores</li>
          <li>✅ Procedimento de revogação documentado</li>
        </ul>
      </>
    ),
  },

  "como-configurar-firewall-pfsense": {
    title: "Como Configurar Firewall pfSense: Guia Completo Para Redes Empresariais",
    excerpt: "Instalação, regras de firewall, NAT, VPN e monitoramento com pfSense.",
    date: "2026-04-13",
    readTime: "16 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">O <strong>pfSense</strong> é o firewall open-source mais utilizado no mundo corporativo. Baseado em FreeBSD, ele oferece recursos de nível enterprise — NAT, VPN, IDS/IPS, proxy, balanceamento de carga — sem custo de licenciamento. Neste guia, cobrimos desde a instalação até configurações avançadas.</p>

        <h2>1. O Que é o pfSense e Por Que Usar?</h2>
        <p>O pfSense transforma qualquer computador com duas placas de rede em um firewall de alto desempenho. Ele é usado em empresas de todos os tamanhos por oferecer:</p>
        <ul>
          <li><strong>Firewall stateful</strong> com inspeção de pacotes e filtragem por porta, protocolo e IP</li>
          <li><strong>NAT avançado</strong> — port forwarding, 1:1 NAT, outbound NAT customizado</li>
          <li><strong>VPN integrada</strong> — OpenVPN e IPsec nativos</li>
          <li><strong>Proxy e filtro de conteúdo</strong> — Squid + SquidGuard para controle de acesso web</li>
          <li><strong>IDS/IPS</strong> — Snort ou Suricata para detecção de intrusão</li>
          <li><strong>Dashboard em tempo real</strong> — monitoramento de tráfego, conexões ativas, logs</li>
          <li><strong>Alta disponibilidade</strong> — CARP para failover entre dois firewalls</li>
        </ul>

        <h2>2. Requisitos de Hardware</h2>
        <p>O pfSense roda em hardware modesto, mas o dimensionamento depende do throughput desejado:</p>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Cenário</th><th>CPU</th><th>RAM</th><th>Disco</th><th>NICs</th></tr></thead>
            <tbody>
              <tr><td>Escritório pequeno (até 20 usuários)</td><td>Dual-core 1.5 GHz</td><td>2 GB</td><td>16 GB SSD</td><td>2x Gigabit</td></tr>
              <tr><td>Empresa média (20-100 usuários)</td><td>Quad-core 2.0 GHz</td><td>4 GB</td><td>32 GB SSD</td><td>3-4x Gigabit</td></tr>
              <tr><td>Empresa grande (100+ usuários, VPN, IDS)</td><td>Xeon / Ryzen</td><td>8-16 GB</td><td>64 GB SSD</td><td>4-6x Gigabit</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Dica:</strong> placas de rede Intel (i210, i350) são as mais compatíveis e estáveis com pfSense. Evite Realtek em produção.</p>

        <h2>3. Instalação Passo a Passo</h2>
        <ol>
          <li>Baixe a ISO oficial em <strong>pfsense.org/download</strong> (AMD64, USB Memstick Installer)</li>
          <li>Grave no pendrive com <strong>Rufus</strong> (Windows) ou <code>dd</code> (Linux): <code>dd if=pfSense.img of=/dev/sdX bs=4M status=progress</code></li>
          <li>Configure o BIOS para boot por USB e inicie a instalação</li>
          <li>Aceite o layout de teclado e selecione <strong>Install pfSense</strong></li>
          <li>Escolha o disco de destino (ZFS recomendado para ambientes de produção)</li>
          <li>Após reiniciar, atribua as interfaces: <strong>WAN</strong> (internet) e <strong>LAN</strong> (rede interna)</li>
          <li>Acesse o painel web em <code>https://192.168.1.1</code> (usuário: <code>admin</code>, senha: <code>pfsense</code>)</li>
        </ol>

        <h2>4. Configuração Inicial (Wizard)</h2>
        <p>O assistente de configuração cobre os pontos essenciais:</p>
        <ul>
          <li><strong>Hostname e domínio</strong> — ex: <code>fw01.empresa.local</code></li>
          <li><strong>DNS</strong> — configure servidores confiáveis (1.1.1.1, 8.8.8.8 ou DNS interno)</li>
          <li><strong>Fuso horário</strong> — importante para logs corretos</li>
          <li><strong>WAN</strong> — DHCP (provedor), PPPoE ou IP estático</li>
          <li><strong>LAN</strong> — defina a sub-rede interna (ex: 10.0.1.0/24)</li>
          <li><strong>Senha do admin</strong> — troque imediatamente!</li>
        </ul>

        <h2>5. Regras de Firewall</h2>
        <p>O pfSense processa regras de cima para baixo, com a primeira regra correspondente vencendo:</p>
        <ul>
          <li><strong>LAN → WAN</strong>: por padrão, tudo é permitido. Recomendamos restringir:</li>
          <li>Bloquear portas conhecidas de malware (445, 135-139 para internet)</li>
          <li>Permitir apenas DNS para servidores específicos (evita DNS leak)</li>
          <li>Criar aliases para agrupar IPs e portas (facilita manutenção)</li>
        </ul>
        <p>Exemplo de regra restritiva:</p>
        <pre><code>{`Action: Pass
Interface: LAN
Source: LAN net
Destination: any
Port: 80, 443, 53
Protocol: TCP/UDP
Description: Navegação web + DNS`}</code></pre>

        <h2>6. NAT e Port Forwarding</h2>
        <p>Para expor serviços internos (câmeras, servidores):</p>
        <ol>
          <li>Vá em <strong>Firewall → NAT → Port Forward</strong></li>
          <li>Crie uma regra: Interface WAN, porta externa 8080 → IP interno 10.0.1.50, porta 80</li>
          <li>O pfSense cria automaticamente a regra de firewall correspondente</li>
        </ol>

        <h2>7. VPN com OpenVPN</h2>
        <p>O pfSense tem um assistente de VPN que simplifica muito a configuração:</p>
        <ol>
          <li>Vá em <strong>VPN → OpenVPN → Wizards</strong></li>
          <li>Crie uma CA (Autoridade Certificadora) interna</li>
          <li>Crie o certificado do servidor</li>
          <li>Configure: protocolo UDP, porta 1194, túnel 10.8.0.0/24</li>
          <li>Instale o pacote <strong>openvpn-client-export</strong> para gerar configs prontas para download</li>
          <li>Distribua os arquivos .ovpn para os colaboradores</li>
        </ol>

        <h2>8. Proxy com Squid + SquidGuard</h2>
        <p>Para controle de acesso à internet:</p>
        <ul>
          <li>Instale os pacotes <strong>Squid</strong> e <strong>SquidGuard</strong> em System → Package Manager</li>
          <li>Configure o Squid em modo transparente (intercepta HTTP sem configurar navegadores)</li>
          <li>Use listas de bloqueio do SquidGuard para categorias (redes sociais, streaming, adult)</li>
          <li>Gere relatórios de acesso com <strong>LightSquid</strong></li>
        </ul>

        <h2>9. IDS/IPS com Suricata</h2>
        <p>Detecção e prevenção de intrusão em tempo real:</p>
        <ul>
          <li>Instale o pacote <strong>Suricata</strong></li>
          <li>Configure na interface WAN para monitorar tráfego de entrada</li>
          <li>Ative as regras <strong>ET Open</strong> (gratuitas) ou <strong>Snort VRT</strong> (com registro)</li>
          <li>Modo IDS = apenas alerta; modo IPS = bloqueia automaticamente</li>
        </ul>

        <h2>10. Monitoramento e Logs</h2>
        <ul>
          <li><strong>Dashboard</strong> — widgets de tráfego em tempo real, uso de CPU/RAM, conexões ativas</li>
          <li><strong>Status → System Logs</strong> — logs detalhados de firewall, DHCP, VPN</li>
          <li><strong>Pacote ntopng</strong> — análise profunda de tráfego por host, protocolo e aplicação</li>
          <li><strong>Exportar logs</strong> — envie para um servidor syslog centralizado</li>
        </ul>

        <h2>11. Backup e Restauração</h2>
        <p>Sempre mantenha backup da configuração:</p>
        <ul>
          <li><strong>Diagnostics → Backup & Restore</strong> — exporta arquivo XML com todas as configurações</li>
          <li>Configure backup automático com o pacote <strong>AutoConfigBackup</strong></li>
          <li>Armazene backups em local seguro fora do pfSense</li>
        </ul>

        <h2>Checklist de Segurança do pfSense</h2>
        <ul>
          <li>✅ Senha do admin alterada</li>
          <li>✅ Acesso ao painel web apenas pela LAN (ou VPN)</li>
          <li>✅ HTTPS habilitado no painel com certificado válido</li>
          <li>✅ Regras de firewall restritivas (deny by default na WAN)</li>
          <li>✅ Atualizações de firmware aplicadas regularmente</li>
          <li>✅ Backup da configuração salvo externamente</li>
          <li>✅ Logs monitorados periodicamente</li>
        </ul>

        <h2>Precisa de Ajuda com Firewall Empresarial?</h2>
        <p>A <strong>{BRAND_NAME}</strong> configura e mantém firewalls pfSense para empresas em Curitiba e região metropolitana. Desde a escolha do hardware até a configuração de VPN e IDS — cuidamos de toda a infraestrutura de segurança da sua rede.</p>
      </>
    ),
  },

  "como-montar-rack-de-rede": {
    title: "Como Montar um Rack de Rede Profissional: Guia Técnico Completo",
    excerpt: "Escolha do rack, organização de cabos, patch panel, switch e ventilação.",
    date: "2026-04-13",
    readTime: "14 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Um rack de rede bem montado é a espinha dorsal de qualquer infraestrutura de TI profissional. Organização, ventilação e identificação corretas evitam problemas futuros e facilitam a manutenção. Neste guia, mostramos como montar um rack do zero seguindo as melhores práticas.</p>

        <h2>1. Tipos de Rack</h2>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Tipo</th><th>Tamanho (U)</th><th>Ideal Para</th><th>Preço Médio</th></tr></thead>
            <tbody>
              <tr><td>Rack de parede (aberto)</td><td>5U - 12U</td><td>Escritórios pequenos, SOHO</td><td>R$ 200 - 600</td></tr>
              <tr><td>Rack de parede (fechado)</td><td>6U - 18U</td><td>Escritórios médios, segurança física</td><td>R$ 400 - 1.200</td></tr>
              <tr><td>Rack de piso (torre)</td><td>20U - 44U</td><td>Data centers, salas de TI</td><td>R$ 1.500 - 5.000</td></tr>
              <tr><td>Rack aberto (two-post)</td><td>20U - 45U</td><td>Patch panels, switches leves</td><td>R$ 800 - 2.000</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Regra prática:</strong> compre um rack com pelo menos 30% de espaço livre para expansão futura.</p>

        <h2>2. Componentes Essenciais</h2>
        <ul>
          <li><strong>Patch Panel (24 ou 48 portas)</strong> — centraliza todas as conexões de cabeamento estruturado</li>
          <li><strong>Switch gerenciável</strong> — distribui a rede com VLANs e QoS</li>
          <li><strong>Organizador de cabos (1U)</strong> — mantém cabos alinhados entre patch panel e switch</li>
          <li><strong>Régua de energia (PDU)</strong> — alimentação com proteção contra surtos</li>
          <li><strong>Nobreak (UPS)</strong> — autonomia em caso de queda de energia</li>
          <li><strong>Bandeja para equipamentos</strong> — suporte para modem, roteador, firewall</li>
          <li><strong>Ventilador de teto</strong> — exaustão do ar quente acumulado</li>
          <li><strong>Kit de parafusos e porcas gaiola</strong> — fixação dos equipamentos</li>
        </ul>

        <h2>3. Planejamento da Distribuição (Layout)</h2>
        <p>A ordem dos equipamentos no rack segue uma lógica de peso e fluxo de ar:</p>
        <ol>
          <li><strong>Topo:</strong> Patch panel + organizador de cabos (cabos sobem)</li>
          <li><strong>Meio-superior:</strong> Switches e firewall (equipamentos ativos leves)</li>
          <li><strong>Meio:</strong> Servidores (se houver)</li>
          <li><strong>Base:</strong> Nobreak e PDU (equipamentos pesados embaixo)</li>
          <li><strong>Teto do rack:</strong> Ventiladores de exaustão</li>
        </ol>
        <p>Deixe 1U de espaço vazio entre grupos de equipamentos para circulação de ar.</p>

        <h2>4. Cabeamento Estruturado</h2>
        <h3>Padrão de Cores (TIA/EIA-568)</h3>
        <p>Use o padrão <strong>T568B</strong> (mais comum no Brasil):</p>
        <pre><code>{`Pino 1: Branco-Laranja
Pino 2: Laranja
Pino 3: Branco-Verde
Pino 4: Azul
Pino 5: Branco-Azul
Pino 6: Verde
Pino 7: Branco-Marrom
Pino 8: Marrom`}</code></pre>

        <h3>Categorias de Cabo</h3>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Categoria</th><th>Velocidade</th><th>Distância Máx.</th><th>Uso Recomendado</th></tr></thead>
            <tbody>
              <tr><td>Cat5e</td><td>1 Gbps</td><td>100m</td><td>Escritórios básicos</td></tr>
              <tr><td>Cat6</td><td>10 Gbps (até 55m)</td><td>100m (1G)</td><td>Empresas, CFTV IP</td></tr>
              <tr><td>Cat6a</td><td>10 Gbps</td><td>100m</td><td>Data centers, alta performance</td></tr>
            </tbody>
          </table>
        </div>

        <h2>5. Montagem Passo a Passo</h2>
        <ol>
          <li><strong>Fixe o rack</strong> — em parede (use buchas metálicas para concreto) ou posicione no piso com nivelamento</li>
          <li><strong>Instale a PDU</strong> na lateral ou na base do rack</li>
          <li><strong>Monte o patch panel</strong> — conecte os cabos que vêm dos pontos de rede usando ferramenta de impacto (punch-down)</li>
          <li><strong>Instale o organizador de cabos</strong> logo abaixo do patch panel</li>
          <li><strong>Posicione o switch</strong> — conecte patch cords do patch panel ao switch</li>
          <li><strong>Adicione bandeja</strong> para modem/roteador/firewall</li>
          <li><strong>Instale ventiladores</strong> no topo do rack</li>
          <li><strong>Posicione o nobreak</strong> na base</li>
          <li><strong>Organize os cabos</strong> — use velcro (nunca abraçadeiras plásticas que apertam os cabos)</li>
          <li><strong>Identifique tudo</strong> — etiquetas em cada cabo, porta do patch panel e porta do switch</li>
        </ol>

        <h2>6. Identificação e Documentação</h2>
        <p>Um rack sem identificação é uma bomba-relógio. Padrão de etiquetagem recomendado:</p>
        <pre><code>{`Formato: ANDAR-SALA-PONTO
Exemplo: 2F-RH-P01 = 2º andar, sala RH, ponto 01

Patch Panel porta 01 → Switch porta 01 → Ponto 2F-RH-P01
Patch Panel porta 02 → Switch porta 02 → Ponto 2F-RH-P02`}</code></pre>
        <p>Mantenha um mapa de portas atualizado em planilha ou sistema de documentação.</p>

        <h2>7. Ventilação e Temperatura</h2>
        <ul>
          <li>Temperatura ideal: <strong>18-27°C</strong> (ASHRAE recomendação)</li>
          <li>Fluxo de ar: <strong>frente para trás</strong> (cold aisle / hot aisle em data centers)</li>
          <li>Monitore com sensor de temperatura (disponível em switches gerenciáveis ou sensores USB)</li>
          <li>Em racks fechados, ventiladores de exaustão no topo são obrigatórios</li>
        </ul>

        <h2>8. Testes Pós-Montagem</h2>
        <ul>
          <li>✅ Teste de continuidade em todos os pontos com <strong>testador de cabos</strong></li>
          <li>✅ Certificação de cabos com <strong>Fluke</strong> ou similar (para garantias)</li>
          <li>✅ Teste de velocidade em cada ponto (iperf3 entre estações)</li>
          <li>✅ Verificação de energia — nobreak segurando a carga estimada</li>
          <li>✅ Documentação fotográfica do rack montado</li>
        </ul>

        <h2>9. Erros Comuns a Evitar</h2>
        <ul>
          <li>❌ Usar abraçadeiras de nylon que esmagam os cabos</li>
          <li>❌ Não deixar folga nos cabos (dificulta manutenção)</li>
          <li>❌ Misturar cabos de energia com cabos de dados no mesmo caminho</li>
          <li>❌ Não identificar cabos e portas</li>
          <li>❌ Rack sem ventilação em ambiente fechado</li>
          <li>❌ Comprar rack sem espaço para expansão</li>
        </ul>

        <h2>Montagem Profissional de Rack em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> realiza montagem de rack, cabeamento estruturado e certificação de pontos de rede para empresas em Curitiba e região metropolitana. Garantimos organização, documentação e testes completos.</p>
      </>
    ),
  },

  "como-configurar-active-directory": {
    title: "Como Configurar Active Directory no Windows Server: Passo a Passo",
    excerpt: "Instalação do AD DS, criação de domínio, GPOs e integração com estações.",
    date: "2026-04-13",
    readTime: "15 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">O <strong>Active Directory (AD)</strong> é o coração da infraestrutura de TI corporativa baseada em Windows. Ele centraliza autenticação, políticas de segurança, gerenciamento de computadores e permissões de acesso. Neste guia, configuramos um domínio AD do zero no Windows Server 2022.</p>

        <h2>1. O Que é o Active Directory?</h2>
        <p>O AD é um serviço de diretório da Microsoft que funciona como uma base de dados hierárquica de objetos de rede:</p>
        <ul>
          <li><strong>Usuários</strong> — contas de login com senhas, permissões e dados de perfil</li>
          <li><strong>Computadores</strong> — máquinas ingressadas no domínio, gerenciáveis remotamente</li>
          <li><strong>Grupos</strong> — agrupamento lógico para aplicar permissões em lote</li>
          <li><strong>GPOs (Group Policy Objects)</strong> — políticas de configuração aplicadas automaticamente</li>
          <li><strong>Unidades Organizacionais (OUs)</strong> — pastas lógicas para organizar objetos</li>
        </ul>

        <h2>2. Requisitos</h2>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Componente</th><th>Mínimo</th><th>Recomendado</th></tr></thead>
            <tbody>
              <tr><td>Windows Server</td><td>2016</td><td>2022 Standard/Datacenter</td></tr>
              <tr><td>CPU</td><td>Dual-core 1.4 GHz</td><td>Quad-core 2.0 GHz+</td></tr>
              <tr><td>RAM</td><td>2 GB</td><td>8 GB+</td></tr>
              <tr><td>Disco</td><td>40 GB</td><td>100 GB SSD</td></tr>
              <tr><td>Rede</td><td>1x Gigabit (IP fixo)</td><td>2x Gigabit (teaming)</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Importante:</strong> o servidor AD DEVE ter IP fixo e ser o DNS primário da rede.</p>

        <h2>3. Instalação do AD DS (Active Directory Domain Services)</h2>
        <ol>
          <li>Abra o <strong>Server Manager</strong> → <strong>Add Roles and Features</strong></li>
          <li>Selecione <strong>Role-based installation</strong></li>
          <li>Marque <strong>Active Directory Domain Services</strong></li>
          <li>Aceite os recursos dependentes (inclui ferramentas de gerenciamento)</li>
          <li>Conclua a instalação e clique em <strong>"Promote this server to a domain controller"</strong></li>
        </ol>

        <h2>4. Criação do Domínio (Promoção do DC)</h2>
        <p>No assistente de promoção:</p>
        <ol>
          <li>Selecione <strong>"Add a new forest"</strong> (primeiro domínio da empresa)</li>
          <li>Defina o nome do domínio raiz: ex: <code>empresa.local</code> ou <code>corp.empresa.com.br</code></li>
          <li>Nível funcional da floresta: <strong>Windows Server 2016</strong> (compatibilidade) ou superior</li>
          <li>Marque <strong>DNS Server</strong> (será configurado automaticamente)</li>
          <li>Defina a senha de <strong>DSRM</strong> (Directory Services Restore Mode) — guarde com segurança!</li>
          <li>Aceite os caminhos padrão (NTDS, SYSVOL) ou personalize</li>
          <li>Revise e clique em <strong>Install</strong> — o servidor reiniciará como Domain Controller</li>
        </ol>

        <h2>5. Configuração do DNS</h2>
        <p>O AD depende fortemente do DNS. Após a promoção:</p>
        <ul>
          <li>Verifique se a zona de pesquisa direta (<code>empresa.local</code>) foi criada automaticamente</li>
          <li>Adicione um <strong>forwarder</strong> para resolução externa: DNS → Properties → Forwarders → 1.1.1.1, 8.8.8.8</li>
          <li>Configure as estações para usar o IP do servidor AD como DNS primário</li>
          <li>Teste com <code>nslookup empresa.local</code> de uma estação</li>
        </ul>

        <h2>6. Estrutura de Unidades Organizacionais (OUs)</h2>
        <p>Organize objetos por departamento ou localidade:</p>
        <pre><code>{`empresa.local
├── OU=Curitiba
│   ├── OU=TI
│   │   ├── OU=Usuarios
│   │   └── OU=Computadores
│   ├── OU=Financeiro
│   │   ├── OU=Usuarios
│   │   └── OU=Computadores
│   └── OU=RH
│       ├── OU=Usuarios
│       └── OU=Computadores
├── OU=Servidores
└── OU=Grupos`}</code></pre>

        <h2>7. Criação de Usuários e Grupos</h2>
        <h3>Via Interface (ADUC)</h3>
        <ol>
          <li>Abra <strong>Active Directory Users and Computers</strong></li>
          <li>Navegue até a OU desejada → Botão direito → <strong>New → User</strong></li>
          <li>Preencha: nome, sobrenome, logon name (ex: <code>joao.silva</code>)</li>
          <li>Defina senha e políticas (trocar no primeiro login, não expira, etc.)</li>
        </ol>
        <h3>Via PowerShell (em massa)</h3>
        <pre><code>{`# Criar usuário individual
New-ADUser -Name "João Silva" -SamAccountName "joao.silva" \\
  -UserPrincipalName "joao.silva@empresa.local" \\
  -Path "OU=Usuarios,OU=TI,OU=Curitiba,DC=empresa,DC=local" \\
  -AccountPassword (ConvertTo-SecureString "Senha@123" -AsPlainText -Force) \\
  -Enabled $true

# Importar usuários de CSV
Import-Csv "C:\\usuarios.csv" | ForEach-Object {
  New-ADUser -Name $_.Nome -SamAccountName $_.Login \\
    -Path $_.OU -AccountPassword (ConvertTo-SecureString $_.Senha -AsPlainText -Force) \\
    -Enabled $true
}`}</code></pre>

        <h2>8. Ingressar Estações no Domínio</h2>
        <ol>
          <li>Na estação, configure o DNS para apontar ao IP do servidor AD</li>
          <li><strong>Configurações → Sistema → Sobre → Ingressar em um domínio</strong></li>
          <li>Digite o nome do domínio: <code>empresa.local</code></li>
          <li>Informe credenciais de administrador do domínio</li>
          <li>Reinicie a estação — ela aparecerá em <strong>Computers</strong> no ADUC</li>
          <li>Mova o objeto para a OU correta</li>
        </ol>

        <h2>9. Group Policy Objects (GPOs)</h2>
        <p>GPOs são o recurso mais poderoso do AD — permitem configurar centenas de políticas remotamente:</p>
        <h3>GPOs Essenciais Para Empresas</h3>
        <ul>
          <li><strong>Política de senha</strong> — mínimo 8 caracteres, complexidade, expiração a cada 90 dias</li>
          <li><strong>Bloqueio de conta</strong> — bloquear após 5 tentativas incorretas por 30 minutos</li>
          <li><strong>Mapeamento de unidades de rede</strong> — drives compartilhados por departamento</li>
          <li><strong>Restrição de Painel de Controle</strong> — impedir alterações em configurações de rede</li>
          <li><strong>Configuração de proxy</strong> — favaliar o valor uso do proxy corporativo</li>
          <li><strong>Papel de parede corporativo</strong> — identidade visual nos desktops</li>
          <li><strong>Instalação de software</strong> — distribuir programas automaticamente</li>
          <li><strong>Windows Update (WSUS)</strong> — controlar atualizações centralizadamente</li>
        </ul>

        <h2>10. Segundo Domain Controller (Redundância)</h2>
        <p>Nunca opere com um único DC. Para adicionar um segundo:</p>
        <ol>
          <li>Instale Windows Server no segundo servidor (IP fixo, DNS apontando ao DC1)</li>
          <li>Instale a role AD DS</li>
          <li>Na promoção, selecione <strong>"Add a domain controller to an existing domain"</strong></li>
          <li>Informe o nome do domínio e credenciais de admin</li>
          <li>O AD replicará automaticamente todos os objetos</li>
        </ol>

        <h2>Checklist de Implantação do AD</h2>
        <ul>
          <li>✅ Servidor com IP fixo e DNS configurado</li>
          <li>✅ AD DS instalado e domínio promovido</li>
          <li>✅ Estrutura de OUs criada por departamento</li>
          <li>✅ Usuários e grupos criados</li>
          <li>✅ Estações ingressadas no domínio</li>
          <li>✅ GPOs essenciais aplicadas</li>
          <li>✅ Segundo DC configurado para redundância</li>
          <li>✅ Backup do System State agendado</li>
          <li>✅ Senha DSRM armazenada em cofre seguro</li>
        </ul>

        <h2>Implantação de Active Directory em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> implanta e gerencia ambientes Active Directory para empresas em Curitiba e região metropolitana. Do planejamento à migração de usuários, GPOs e políticas de segurança — sua infraestrutura Windows em mãos experientes.</p>
      </>
    ),
  },

  "como-fazer-manutencao-nobreak": {
    title: "Como Fazer Manutenção em Nobreak: Testes, Troca de Bateria e Calibração",
    excerpt: "Procedimento para manter nobreaks funcionando: testes, troca de bateria e calibração.",
    date: "2026-04-13",
    readTime: "12 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">O <strong>nobreak (UPS)</strong> é a última linha de defesa contra perda de dados e danos em equipamentos causados por quedas e oscilações de energia. Mas um nobreak sem manutenção é um nobreak que vai falhar na hora que mais precisa. Neste guia, cobrimos testes, troca de bateria, calibração e cuidados preventivos.</p>

        <h2>1. Como Funciona um Nobreak</h2>
        <p>Existem três topologias principais:</p>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Tipo</th><th>Funcionamento</th><th>Tempo de Comutação</th><th>Uso Ideal</th></tr></thead>
            <tbody>
              <tr><td><strong>Standby (Offline)</strong></td><td>Alimenta pela rede; baterias ativam na queda</td><td>5-12 ms</td><td>PCs domésticos, impressoras</td></tr>
              <tr><td><strong>Line-Interactive</strong></td><td>Regula tensão (AVR); baterias na queda</td><td>2-4 ms</td><td>Escritórios, servidores pequenos</td></tr>
              <tr><td><strong>Online (Dupla Conversão)</strong></td><td>Sempre alimenta pela bateria (AC→DC→AC)</td><td>0 ms</td><td>Servidores, data centers, equipamentos críticos</td></tr>
            </tbody>
          </table>
        </div>

        <h2>2. Sinais de Que o Nobreak Precisa de Manutenção</h2>
        <ul>
          <li>🔴 <strong>Bip contínuo ou intermitente</strong> mesmo com energia normal</li>
          <li>🔴 <strong>Autonomia reduzida</strong> — desliga em poucos segundos sem energia</li>
          <li>🔴 <strong>Bateria estufada</strong> — risco de vazamento ácido</li>
          <li>🔴 <strong>Cheiro de queimado</strong> — possível curto ou sobreaquecimento</li>
          <li>🔴 <strong>Falha ao ligar em modo bateria</strong> — circuito inversor com defeito</li>
          <li>🟡 <strong>LED de bateria fraca</strong> — hora de trocar</li>
          <li>🟡 <strong>Mais de 2 anos sem troca de bateria</strong> — preventiva recomendada</li>
        </ul>

        <h2>3. Teste de Autonomia</h2>
        <p>Procedimento para verificar a capacidade real da bateria:</p>
        <ol>
          <li>Conecte a carga típica ao nobreak (PC + monitor, ou o que ele protege normalmente)</li>
          <li>Certifique-se de que a bateria está 100% carregada (mínimo 8h conectado à rede)</li>
          <li>Desconecte o nobreak da tomada (simule uma queda de energia)</li>
          <li>Cronometre quanto tempo ele mantém os equipamentos ligados</li>
          <li>Compare com a especificação do fabricante</li>
        </ol>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Resultado</th><th>Diagnóstico</th><th>Ação</th></tr></thead>
            <tbody>
              <tr><td>Autonomia acima de 70% do especificado</td><td>Bateria em bom estado</td><td>Manter monitoramento</td></tr>
              <tr><td>Autonomia entre 40-70%</td><td>Bateria degradada</td><td>Planejar troca em 1-3 meses</td></tr>
              <tr><td>Autonomia abaixo de 40%</td><td>Bateria esgotada</td><td>Trocar imediatamente</td></tr>
              <tr><td>Desliga instantaneamente</td><td>Bateria morta ou defeito</td><td>Trocar bateria; se persistir, avaliar circuito</td></tr>
            </tbody>
          </table>
        </div>

        <h2>4. Troca de Bateria</h2>
        <h3>Tipos de Bateria</h3>
        <p>A maioria dos nobreaks usa baterias <strong>VRLA (Valve Regulated Lead-Acid)</strong>, também chamadas de seladas ou "estacionárias":</p>
        <ul>
          <li><strong>12V 7Ah</strong> — nobreaks de 600-1400 VA (mais comum)</li>
          <li><strong>12V 9Ah</strong> — nobreaks de 1500-2200 VA</li>
          <li><strong>12V 12Ah ou maior</strong> — nobreaks de alta capacidade</li>
          <li>Modelos maiores usam <strong>baterias em série</strong> (24V, 36V, 48V)</li>
        </ul>

        <h3>Procedimento de Troca</h3>
        <ol>
          <li><strong>Desligue</strong> o nobreak e desconecte da tomada</li>
          <li><strong>Abra a tampa</strong> — geralmente parafusos Phillips na traseira ou lateral</li>
          <li><strong>Identifique a bateria</strong> — anote a especificação (V, Ah, dimensões)</li>
          <li><strong>Desconecte os cabos</strong> — primeiro o negativo (preto), depois o positivo (vermelho)</li>
          <li><strong>Remova a bateria velha</strong> — cuidado com o peso (bateria de 7Ah pesa ~2.5 kg)</li>
          <li><strong>Instale a nova</strong> — conecte primeiro o positivo, depois o negativo</li>
          <li><strong>Feche a tampa</strong> e ligue o nobreak na tomada</li>
          <li><strong>Deixe carregar por 8-12 horas</strong> antes do primeiro teste de autonomia</li>
        </ol>
        <p><strong>⚠️ Descarte correto:</strong> baterias de chumbo-ácido são resíduos perigosos. Devolva ao fabricante, revenda ou ponto de coleta autorizado. Nunca descarte no lixo comum!</p>

        <h2>5. Calibração do Nobreak</h2>
        <p>Após trocar a bateria, é importante calibrar o circuito de monitoramento:</p>
        <ol>
          <li>Carregue a bateria nova completamente (8-12h)</li>
          <li>Desconecte da tomada e deixe descarregar até o nobreak desligar sozinho</li>
          <li>Reconecte à tomada e carregue novamente por 8-12h sem interrupção</li>
          <li>Repita o ciclo uma vez para "ensinar" o circuito a capacidade real da nova bateria</li>
        </ol>
        <p>Alguns modelos têm software próprio para calibração automática (APC PowerChute, SMS Manager).</p>

        <h2>6. Manutenção com Multímetro</h2>
        <p>Testes que podem ser feitos com um multímetro digital básico:</p>
        <ul>
          <li><strong>Tensão da bateria:</strong> posicione na escala 20V DC — bateria 12V saudável marca 12.4-13.2V em repouso</li>
          <li><strong>Tensão de saída:</strong> escala 200V AC — deve marcar entre 110-120V ou 220-230V dependendo do modelo</li>
          <li><strong>Tensão de carga:</strong> com nobreak ligado na tomada, a bateria deve marcar 13.5-14.2V (carga float)</li>
        </ul>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Leitura da Bateria 12V</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>12.7V ou mais</td><td>100% carregada</td></tr>
              <tr><td>12.4V</td><td>~75%</td></tr>
              <tr><td>12.0V</td><td>~50%</td></tr>
              <tr><td>11.8V</td><td>~25%</td></tr>
              <tr><td>Abaixo de 11.5V</td><td>Descarregada / defeituosa</td></tr>
            </tbody>
          </table>
        </div>

        <h2>7. Dimensionamento Correto</h2>
        <p>Um nobreak subdimensionado é tão ruim quanto nenhum nobreak. Calcule:</p>
        <pre><code>{`Potência necessária = Soma das potências dos equipamentos × 1.3 (margem)

Exemplo:
- PC desktop: 300W
- Monitor: 40W
- Roteador: 15W
Total: 355W × 1.3 = ~460W

Nobreak recomendado: 600VA / 480W (mínimo)
Ideal: 1000VA / 600W (para crescimento)`}</code></pre>

        <h2>8. Manutenção Preventiva — Cronograma</h2>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>Frequência</th><th>Ação</th></tr></thead>
            <tbody>
              <tr><td>Mensal</td><td>Verificar LEDs, ventilação, limpeza externa</td></tr>
              <tr><td>Trimestral</td><td>Teste de autonomia rápido (desligar da tomada por 2 min)</td></tr>
              <tr><td>Semestral</td><td>Teste de autonomia completo com carga real</td></tr>
              <tr><td>Anual</td><td>Medir tensão da bateria com multímetro, limpeza interna</td></tr>
              <tr><td>A cada 2 anos</td><td>Trocar bateria preventivamente (mesmo se ainda funciona)</td></tr>
              <tr><td>A cada 5 anos</td><td>Avaliar troca do nobreak completo</td></tr>
            </tbody>
          </table>
        </div>

        <h2>9. Cuidados Importantes</h2>
        <ul>
          <li>✅ Mantenha o nobreak em local ventilado (calor reduz vida útil da bateria)</li>
          <li>✅ Não conecte impressoras laser ou ar-condicionado ao nobreak</li>
          <li>✅ Use régua com filtro de linha antes do nobreak (proteção extra)</li>
          <li>✅ Mantenha firmware/software do nobreak atualizado</li>
          <li>❌ Não empilhe objetos sobre o nobreak</li>
          <li>❌ Não opere com tampa aberta</li>
          <li>❌ Não descarte baterias no lixo comum</li>
        </ul>

        <h2>Manutenção de Nobreak em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> realiza manutenção preventiva e corretiva de nobreaks para empresas em Curitiba e região metropolitana. Teste de autonomia, troca de bateria com descarte correto e dimensionamento adequado para sua infraestrutura.</p>
      </>
    ),
  },

  "como-fazer-upgrade-ssd-nvme": {
    title: "Upgrade para SSD NVMe: quando compensa e como é feito",
    excerpt: "Como saber se a sua placa aceita NVMe, o que muda de verdade no uso diário e quais são as etapas do serviço feito em bancada.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Trocar o disco por um SSD NVMe é uma das poucas intervenções que mudam a sensação de uso de um computador inteiro. Mas nem toda máquina aceita NVMe, e nem todo travamento vem do disco. Este guia explica como identificar se o upgrade se aplica ao seu caso, o que esperar do resultado e como o serviço é executado em bancada.</p>

        <h2>O que diferencia um NVMe de um SSD comum</h2>
        <p>Um SSD SATA conversa com a placa-mãe pelo mesmo barramento que os HDs usavam há mais de uma década. Um SSD NVMe usa linhas PCI Express diretamente, o que reduz muito a latência de cada leitura e permite várias filas de comandos em paralelo. Na prática, os dois eliminam o gargalo mecânico do HD; a diferença entre eles aparece principalmente em cópias grandes, compilação, edição de vídeo e abertura de projetos pesados.</p>
        <p>Por isso a resposta honesta é: sair de HD para qualquer SSD é uma mudança que se percebe no primeiro boot. Sair de SSD SATA para NVMe é um ganho real, porém mais discreto em uso comum de navegador e pacote de escritório. Quando alguém promete que o NVMe vai "resolver tudo", desconfie — o disco é apenas um dos componentes envolvidos.</p>

        <h2>Antes de comprar: a máquina aceita NVMe?</h2>
        <p>Três verificações resolvem a dúvida antes de qualquer compra:</p>
        <ul>
          <li><strong>Existe slot M.2?</strong> Placas e notebooks anteriores a essa geração podem não ter nenhum, ou ter apenas um slot com chave B destinado a SSD M.2 SATA.</li>
          <li><strong>O slot é PCIe ou apenas SATA?</strong> O conector é parecido, mas nem todo M.2 entrega linhas PCIe. O manual da placa ou do modelo do notebook informa isso.</li>
          <li><strong>A UEFI enxerga discos NVMe para boot?</strong> Algumas máquinas de transição reconhecem o disco como armazenamento, mas não conseguem iniciar o sistema a partir dele.</li>
        </ul>
        <p>Também vale conferir o comprimento suportado (2280 é o mais comum, mas notebooks compactos usam 2230 ou 2242) e se há folga para o dissipador. Em desktops, o slot M.2 costuma compartilhar linhas com uma porta SATA: ocupar o M.2 pode desativar automaticamente uma porta, o que surpreende quem tem HD secundário instalado.</p>

        <h2>Quando o upgrade não é a resposta</h2>
        <p>Existem situações em que instalar um NVMe apenas troca a peça errada:</p>
        <ul>
          <li>Memória insuficiente para a rotina de trabalho — o sistema continua recorrendo ao arquivo de paginação e a lentidão volta.</li>
          <li>Superaquecimento com redução de frequência do processador: a máquina fica rápida por alguns minutos e cai de novo.</li>
          <li>Sistema comprometido por programas indesejados ou por dezenas de itens em inicialização automática.</li>
          <li>Placa com defeito intermitente, que se manifesta como travamento e é frequentemente confundido com disco lento.</li>
        </ul>
        <p>É por isso que, em atendimento, o disco só é indicado depois de um diagnóstico que observa temperatura, consumo de memória, integridade do disco atual e comportamento sob carga. Trocar antes de medir é o caminho mais rápido para gastar sem resolver.</p>

        <h2>Como o serviço é executado em bancada</h2>
        <h3>1. Leitura de saúde do disco atual</h3>
        <p>A primeira etapa é verificar os indicadores de saúde do disco de origem. Um disco com setores realocados em crescimento ou com erros de leitura muda toda a estratégia: nesse caso, não se clona — copiam-se os dados enquanto o disco ainda responde, e a instalação do sistema é feita do zero no disco novo.</p>
        <h3>2. Decisão entre clonar e instalar limpo</h3>
        <p>Clonar preserva programas, licenças locais e configurações, e é a opção mais confortável quando o sistema está saudável. Instalação limpa é preferível quando o sistema já acumulou anos de camadas, drivers antigos e falhas de atualização. As duas rotas são apresentadas ao cliente com a diferença de tempo envolvida antes da execução.</p>
        <h3>3. Cópia de segurança antes de tocar no hardware</h3>
        <p>Nenhum disco é aberto ou substituído sem cópia prévia dos arquivos do usuário em mídia separada. Esse passo é inegociável, porque é justamente durante uma migração que aparecem os defeitos silenciosos de um disco antigo.</p>
        <h3>4. Instalação física</h3>
        <p>O equipamento é desligado da tomada e, em notebooks, tem a bateria desconectada quando o projeto permite. O SSD entra em ângulo no slot M.2, é apoiado e só então parafusado — pressionar o módulo para baixo antes de encaixar é o erro que mais danifica o conector. Quando existe dissipador ou espuma térmica de fábrica, o contato é refeito.</p>
        <h3>5. Configuração de firmware</h3>
        <p>Com o disco instalado, confere-se na UEFI se ele foi reconhecido, se o modo de operação está correto e se a ordem de inicialização aponta para o disco novo. Em máquinas que vieram com criptografia de disco ativa, a chave de recuperação precisa estar em mãos antes de qualquer alteração — sem ela, o sistema pode não iniciar após a mudança.</p>
        <h3>6. Testes e devolução</h3>
        <p>Antes de devolver, o equipamento passa por reinicializações sucessivas, verificação de temperatura em carga, checagem de espaço e conferência de que os arquivos do usuário estão íntegros. O disco antigo é entregue ao cliente ou, mediante autorização por escrito, higienizado.</p>

        <h2>Detalhes que evitam retrabalho</h2>
        <ul>
          <li><strong>Espaço reservado:</strong> manter uma folga livre no SSD ajuda o controlador a distribuir a escrita e preserva a estabilidade de desempenho.</li>
          <li><strong>Firmware do SSD:</strong> alguns modelos receberam correções de estabilidade depois do lançamento; conferir a versão evita problemas que parecem defeito de placa.</li>
          <li><strong>Temperatura:</strong> NVMe em notebook fino esquenta. Sem contato térmico adequado, ele reduz a velocidade justamente nas tarefas longas.</li>
          <li><strong>Backup continua necessário:</strong> SSD falha de forma diferente do HD — costuma avisar menos. O upgrade não substitui rotina de cópia.</li>
        </ul>

        <h2>Quando levar para atendimento técnico</h2>
        <p>Faz sentido buscar ajuda quando o notebook exige desmontagem completa para chegar ao slot, quando o sistema está com criptografia ativa, quando o disco atual apresenta erros de leitura ou quando os dados não podem ser perdidos em hipótese alguma. Nesses cenários, o custo do erro é maior do que o do serviço.</p>
        <p>Se quiser conferir antes se o gargalo é mesmo o disco, o caminho é o <Link to="/diagnostico-tecnico">diagnóstico técnico</Link>. Para o serviço de troca e migração, veja <Link to="/servicos/upgrade-ssd-ram">instalação de SSD e upgrade de memória</Link>; se a intenção for reinstalar o sistema no disco novo, a página de <Link to="/servicos/formatacao">formatação e instalação</Link> explica o procedimento.</p>
      </>
    ),
  },
  "como-recuperar-dados-hd-com-defeito": {
    title: "Recuperação de dados de HD com defeito: o que é possível",
    excerpt: "Como diferenciar falha lógica de falha mecânica, o que fazer nos primeiros minutos e por que insistir em ligar o disco reduz a chance de recuperar.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Quando um disco para de responder, a decisão tomada nos primeiros minutos costuma pesar mais do que qualquer ferramenta usada depois. Este guia explica como identificar o tipo de falha, o que evitar antes de procurar ajuda e como um serviço de recuperação é conduzido — sem promessa de resultado, porque recuperação de dados não tem garantia de sucesso.</p>

        <h2>Primeiro: pare de usar o disco</h2>
        <p>Cada tentativa de ligar um disco que já apresenta falha pode transformar um problema recuperável em perda definitiva. Se o disco faz ruído repetitivo, some do sistema durante o uso ou ficou lento a ponto de travar o computador inteiro, o passo correto é desligar e não repetir tentativas de boot.</p>
        <p>Também evite formatar "para ver se resolve", instalar sistema por cima ou rodar utilitários de correção de disco. Ferramentas de reparo trabalham reescrevendo estruturas — exatamente o que se quer preservar quando o objetivo é recuperar arquivos.</p>

        <h2>Falha lógica e falha física: o divisor de águas</h2>
        <p>Chamamos de <strong>falha lógica</strong> quando o hardware ainda responde, mas a estrutura de arquivos foi comprometida: partição apagada, tabela corrompida, exclusão acidental, formatação indevida, interrupção de energia durante escrita. Nesses casos, o disco é reconhecido, aceita leitura e a recuperação acontece por software, sempre a partir de uma cópia — nunca do original.</p>
        <p>Chamamos de <strong>falha física</strong> quando há dano no próprio conjunto mecânico ou eletrônico: motor que não gira, cabeças de leitura danificadas, placa lógica queimada, conector rompido. O sinal clássico é ruído cíclico, clique repetido ou ausência total de reconhecimento. Aqui, software não faz nada — e insistir apenas espalha o dano.</p>
        <p>Existe ainda uma faixa intermediária muito comum: o disco funciona, mas com setores instáveis. Ele monta, copia parte dos arquivos e trava em determinados trechos. É o cenário em que a estratégia de cópia faz toda a diferença.</p>

        <h2>Sinais que ajudam a classificar antes de abrir</h2>
        <ul>
          <li><strong>Clique rítmico:</strong> típico de problema no conjunto de cabeças. Desligue imediatamente.</li>
          <li><strong>Zumbido sem giro:</strong> normalmente motor travado ou falha de alimentação na placa.</li>
          <li><strong>Reconhecido, mas com capacidade errada:</strong> costuma indicar defeito de firmware ou da placa lógica.</li>
          <li><strong>Cópias que travam sempre no mesmo arquivo:</strong> setores defeituosos localizados.</li>
          <li><strong>Sumiço de partições em SSD:</strong> comportamento distinto do HD; o controlador pode entrar em modo de proteção e o disco fica somente leitura ou invisível.</li>
        </ul>

        <h2>Como o trabalho é conduzido em bancada</h2>
        <h3>1. Avaliação sem escrita</h3>
        <p>O disco é conectado em uma porta configurada para leitura e observa-se se ele estabiliza, quanto tempo leva para responder e o que os indicadores de saúde relatam. Nada é gravado no disco de origem em nenhum momento.</p>
        <h3>2. Imagem setor a setor</h3>
        <p>Quando o disco sustenta leitura, a prioridade é gerar uma imagem completa em outra mídia. Trabalhar sobre a imagem protege o original e permite repetir tentativas sem novo desgaste. Em discos instáveis, a leitura é feita por blocos, adiando as áreas problemáticas para o fim — muitas vezes é isso que salva a maior parte dos arquivos.</p>
        <h3>3. Reconstrução da estrutura</h3>
        <p>Com a imagem em mãos, a estrutura de arquivos é reconstruída. Quando não há metadados aproveitáveis, resta a recuperação por assinatura de arquivo: os arquivos voltam pelo conteúdo, geralmente sem os nomes e pastas originais.</p>
        <h3>4. Conferência do que foi recuperado</h3>
        <p>Arquivo recuperado que não abre não conta como recuperado. Documentos, fotos e bancos de dados são abertos por amostragem antes de qualquer entrega, e o cliente recebe a relação real do que foi obtido.</p>
        <h3>5. Entrega em mídia nova</h3>
        <p>Os dados são entregues em mídia diferente da que falhou. Devolver arquivos para o mesmo disco é repetir a condição que causou o problema.</p>

        <h2>O que exige laboratório especializado</h2>
        <p>Casos com falha mecânica confirmada — cabeças danificadas, motor travado, discos que sofreram queda ou contato com líquido — exigem abertura em ambiente controlado e peças doadoras compatíveis. Isso não é feito em bancada comum, e qualquer tentativa caseira de abrir o disco encerra as chances. Nesses casos, o papel do atendimento é diagnosticar corretamente, explicar a situação e encaminhar, deixando claro que o custo e o prazo são maiores.</p>

        <h2>Expectativa realista</h2>
        <p>Recuperação de dados é trabalho de probabilidade, não de certeza. Um mesmo sintoma pode terminar em recuperação integral ou em perda definitiva, e isso só fica conhecido depois da avaliação. Por isso, o compromisso possível é de método e transparência: avaliar, informar o que foi encontrado, dizer o que pode ser tentado e não cobrar por promessa que não pode ser sustentada.</p>
        <p>E a lição que aparece em quase todo atendimento: o custo de uma rotina de cópia é sempre menor que o de uma tentativa de recuperação. Vale ler o guia de <Link to="/blog/backup-como-proteger-seus-arquivos">backup para proteger seus arquivos</Link> antes de precisar deste aqui.</p>

        <h2>Próximo passo</h2>
        <p>Se o disco ainda está conectado ao computador, desligue-o. Para avaliação, veja como funciona a <Link to="/servicos/recuperacao-de-dados">recuperação de dados</Link> e o que é observado no <Link to="/diagnostico-tecnico">diagnóstico técnico</Link>. Se os arquivos já estão salvos e o objetivo é voltar a usar a máquina, a página de <Link to="/servicos/upgrade-ssd-ram">troca de disco e upgrade</Link> descreve o serviço.</p>
      </>
    ),
  },
  "como-trocar-tela-notebook-passo-a-passo": {
    title: "Como Trocar a Tela do Notebook: Passo a Passo Profissional",
    excerpt: "Guia técnico para identificar a tela correta, desmontar com segurança e instalar a nova sem danificar o flat cable.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Realizar <strong>trocar a tela do notebook</strong> exige procedimento técnico, ferramentas adequadas e atenção a detalhes que separam o trabalho amador do profissional. Neste guia, você vai aprender o passo a passo real usado em laboratórios de assistência técnica em Curitiba.</p>

        <h2>Por Que o Procedimento Importa</h2>
        <p>Trabalhar em hardware sem método é a principal causa de dano permanente em equipamentos. Pequenos descuidos — descarga eletrostática, parafuso errado, conector mal encaixado — podem transformar um serviço simples em um problema irreversível. Por isso, todo técnico profissional segue um <strong>checklist documentado</strong> antes, durante e depois de cada intervenção.</p>
        <p>O custo médio de um erro evitável em manutenção de hardware varia entre R$ 200 e R$ 2.000, dependendo da peça danificada. Já o custo de seguir o procedimento correto é apenas o tempo de leitura deste artigo.</p>

        <h2>Ferramentas e Materiais Necessários</h2>
        <p>Antes de começar, separe todo o material. Interromper o procedimento no meio para buscar uma chave Phillips é como abrir uma cirurgia sem o instrumental.</p>
        <ul>
          <li><strong>Pulseira antiestática</strong> (ESD) — protege componentes contra descarga eletrostática, principal causa silenciosa de morte de placas</li>
          <li><strong>Chaves Phillips e Torx</strong> — kit de precisão com bits magnéticos, indispensável para notebooks modernos</li>
          <li><strong>Pasta térmica de qualidade</strong> — Arctic MX-6, Noctua NT-H2 ou Thermal Grizzly Kryonaut (evite genéricas)</li>
          <li><strong>Álcool isopropílico 99,9%</strong> — para limpeza de pasta térmica antiga e contatos oxidados</li>
          <li><strong>Pincel antiestático</strong> e pano de microfibra — limpeza segura de placas e dissipadores</li>
          <li><strong>Pinça de precisão</strong> — manuseio de conectores flat cable e parafusos pequenos</li>
          <li><strong>Pendrive com Ventoy</strong> — para boot de utilitários (MemTest86, Hiren's BootCD, Hard Disk Sentinel)</li>
        </ul>
        <p>Investir R$ 300-500 num kit profissional retorna em economia já no primeiro serviço evitando danos.</p>

        <h2>Preparação do Ambiente</h2>
        <p>O local de trabalho influencia diretamente a qualidade do serviço. Profissionais sérios trabalham em ambientes controlados — não em cima do sofá da sala.</p>
        <ul>
          <li><strong>Bancada plana e iluminada</strong> — preferencialmente com manta antiestática</li>
          <li><strong>Recipientes para parafusos</strong> — separe por etapa da desmontagem (use bandejas magnéticas ou organizadores)</li>
          <li><strong>Documentação aberta</strong> — manual de serviço do equipamento, vídeos do iFixit, fórum específico</li>
          <li><strong>Câmera ou celular</strong> — fotografe cada etapa antes de desconectar (especialmente conectores flat)</li>
          <li><strong>Sem animais ou crianças</strong> — peças pequenas se perdem em frações de segundo</li>
          <li><strong>Temperatura ambiente</strong> — entre 18-25°C, sem umidade alta (problemas comuns em Curitiba no inverno)</li>
        </ul>

        <h2>Diagnóstico Inicial</h2>
        <p>Nunca comece um procedimento sem entender o estado atual do equipamento. O diagnóstico determina se a intervenção planejada é realmente a correta — ou se você está prestes a substituir uma peça boa enquanto o problema real é outro.</p>
        <p>Documente:</p>
        <ul>
          <li>Modelo exato do equipamento e número de série</li>
          <li>Sintomas relatados pelo usuário e quando começaram</li>
          <li>Última intervenção realizada (atualização, queda, contato com líquido)</li>
          <li>Estado físico aparente — pontos de impacto, sinais de líquido, cheiro de queimado</li>
          <li>Comportamento ao ligar — LEDs, ventoinhas, beeps, mensagens de POST</li>
        </ul>
        <p>Esse registro vale ouro: serve de proteção em caso de discussão sobre danos pré-existentes e ajuda a refinar o diagnóstico se o problema persistir.</p>

        <h2>Procedimento Passo a Passo</h2>
        <p>Com tudo preparado, execute o procedimento na ordem correta. <strong>Pular etapas é o caminho mais curto para o retrabalho.</strong></p>
        <ol>
          <li><strong>Backup completo dos dados</strong> — antes de qualquer intervenção em hardware com armazenamento, copie tudo. HD/SSD podem morrer durante o processo.</li>
          <li><strong>Desligue completamente</strong> — não basta hibernar. Desconecte da tomada e remova a bateria (se removível). Aguarde 30 segundos para descarga residual.</li>
          <li><strong>Aterre-se</strong> — toque numa parte metálica aterrada antes de manusear componentes. Use pulseira ESD em peças sensíveis (RAM, GPU, SSD NVMe).</li>
          <li><strong>Desmontagem documentada</strong> — fotografe cada parafuso retirado e cada conector desconectado. Use bandejas separadas por etapa.</li>
          <li><strong>Execução técnica</strong> — siga o procedimento específico para o tipo de intervenção. Não force nada. Se está duro, há algo errado.</li>
          <li><strong>Limpeza durante a montagem</strong> — aproveite o equipamento aberto para limpeza completa de coolers, dissipadores e contatos.</li>
          <li><strong>Remontagem na ordem inversa</strong> — sem pular conectores. Confira cada flat cable e cada parafuso antes de fechar.</li>
          <li><strong>Teste antes de fechar definitivamente</strong> — ligue com a tampa solta e verifique se tudo funciona. Só então parafuse tudo.</li>
        </ol>

        <h2>Erros Comuns Que Devem Ser Evitados</h2>
        <p>Mesmo técnicos experientes cometem erros recorrentes. Conhecê-los previamente reduz drasticamente as chances de problema.</p>
        <ul>
          <li><strong>Excesso de pasta térmica</strong> — uma quantidade do tamanho de um grão de arroz é suficiente. Excesso prejudica a dissipação.</li>
          <li><strong>Apertar parafusos demais</strong> — especialmente em notebooks, pode quebrar o plástico ou empenar a placa</li>
          <li><strong>Favaliar o valor conectores</strong> — flat cables têm orientação específica. Se está duro, está errado.</li>
          <li><strong>Misturar parafusos</strong> — usar parafuso longo onde deveria ser curto pode perfurar componentes internos</li>
          <li><strong>Trabalhar com o equipamento ligado</strong> — exceto em testes específicos, sempre desligue. Curtos acidentais são fatais.</li>
          <li><strong>Pular o teste pós-procedimento</strong> — fechar tudo sem testar é receita para retrabalho</li>
        </ul>

        <h2>Validação e Testes Pós-Procedimento</h2>
        <p>O serviço só está concluído quando passa nos testes. Profissionais entregam o equipamento com relatório de testes, não com base em "tá funcionando".</p>
        <ul>
          <li><strong>Teste de boot completo</strong> — entrar no SO sem erros, sem mensagens de POST anormais</li>
          <li><strong>Stress test de CPU</strong> — Cinebench R23 ou Prime95 por 30 minutos, monitorando temperatura</li>
          <li><strong>Stress test de GPU</strong> — FurMark ou 3DMark por 20 minutos (em GPUs dedicadas)</li>
          <li><strong>Teste de memória RAM</strong> — MemTest86 por pelo menos um ciclo completo</li>
          <li><strong>Teste de disco</strong> — CrystalDiskInfo (saúde) e CrystalDiskMark (performance)</li>
          <li><strong>Teste de carga prolongada</strong> — uso real por algumas horas antes de devolver ao cliente</li>
        </ul>

        <h2>Quando Chamar um Profissional</h2>
        <p>Há situações em que tentar resolver sozinho não compensa. O custo do erro é maior que o do serviço técnico.</p>
        <ul>
          <li>Equipamento ainda em garantia — abrir cancela a cobertura do fabricante</li>
          <li>Problema envolve solda em placa-mãe (BGA, SMD, microsoldagem)</li>
          <li>Recuperação de dados de HD com falha mecânica (cabeça travada, motor queimado)</li>
          <li>Contato com líquido — cada minuto sem limpeza profissional causa mais corrosão</li>
          <li>Falta de ferramenta específica (estação de retrabalho, microscópio, oscilador)</li>
          <li>Quando o equipamento tem valor sentimental ou contém dados insubstituíveis</li>
        </ul>

        <h2>Garantia e Documentação do Serviço</h2>
        <p>Todo serviço técnico profissional vem com <strong>garantia escrita</strong> e documentação. Se o serviço não tem nota fiscal, ordem de serviço e prazo de garantia, não é serviço profissional.</p>
        <p>Em Curitiba, a {BRAND_NAME} emite ordem de serviço completa com:</p>
        <ul>
          <li>Diagnóstico inicial documentado</li>
          <li>Lista de peças trocadas (com nota fiscal das peças)</li>
          <li>Procedimentos realizados</li>
          <li>Testes executados e resultados</li>
          <li>Garantia mínima de 90 dias para serviços e peças</li>
        </ul>

        <h2>Fazendo Trocar a Tela do Notebook em Curitiba</h2>
        <p>Se você prefere deixar o serviço com quem faz isso todos os dias, a <strong>{BRAND_NAME}</strong> realiza trocar a tela do notebook em Curitiba e região metropolitana. Atendimento a domicílio, laboratório próprio, garantia escrita e valor transparente antes da execução.</p>
        <p>Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande. Diagnóstico via WhatsApp em até 5 minutos.</p>

      </>
    ),
  },

  "como-fazer-backup-completo-windows-11": {
    title: "Como Fazer Backup Completo do Windows 11: Imagem do Sistema e Arquivos",
    excerpt: "Procedimento técnico para backup de imagem (Acronis, Macrium) e backup incremental de arquivos críticos.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Realizar <strong>fazer backup completo do windows 11</strong> exige procedimento técnico, ferramentas adequadas e atenção a detalhes que separam o trabalho amador do profissional. Neste guia, você vai aprender o passo a passo real usado em laboratórios de assistência técnica em Curitiba.</p>

        <h2>Por Que o Procedimento Importa</h2>
        <p>Trabalhar em hardware sem método é a principal causa de dano permanente em equipamentos. Pequenos descuidos — descarga eletrostática, parafuso errado, conector mal encaixado — podem transformar um serviço simples em um problema irreversível. Por isso, todo técnico profissional segue um <strong>checklist documentado</strong> antes, durante e depois de cada intervenção.</p>
        <p>O custo médio de um erro evitável em manutenção de hardware varia entre R$ 200 e R$ 2.000, dependendo da peça danificada. Já o custo de seguir o procedimento correto é apenas o tempo de leitura deste artigo.</p>

        <h2>Ferramentas e Materiais Necessários</h2>
        <p>Antes de começar, separe todo o material. Interromper o procedimento no meio para buscar uma chave Phillips é como abrir uma cirurgia sem o instrumental.</p>
        <ul>
          <li><strong>Pulseira antiestática</strong> (ESD) — protege componentes contra descarga eletrostática, principal causa silenciosa de morte de placas</li>
          <li><strong>Chaves Phillips e Torx</strong> — kit de precisão com bits magnéticos, indispensável para notebooks modernos</li>
          <li><strong>Pasta térmica de qualidade</strong> — Arctic MX-6, Noctua NT-H2 ou Thermal Grizzly Kryonaut (evite genéricas)</li>
          <li><strong>Álcool isopropílico 99,9%</strong> — para limpeza de pasta térmica antiga e contatos oxidados</li>
          <li><strong>Pincel antiestático</strong> e pano de microfibra — limpeza segura de placas e dissipadores</li>
          <li><strong>Pinça de precisão</strong> — manuseio de conectores flat cable e parafusos pequenos</li>
          <li><strong>Pendrive com Ventoy</strong> — para boot de utilitários (MemTest86, Hiren's BootCD, Hard Disk Sentinel)</li>
        </ul>
        <p>Investir R$ 300-500 num kit profissional retorna em economia já no primeiro serviço evitando danos.</p>

        <h2>Preparação do Ambiente</h2>
        <p>O local de trabalho influencia diretamente a qualidade do serviço. Profissionais sérios trabalham em ambientes controlados — não em cima do sofá da sala.</p>
        <ul>
          <li><strong>Bancada plana e iluminada</strong> — preferencialmente com manta antiestática</li>
          <li><strong>Recipientes para parafusos</strong> — separe por etapa da desmontagem (use bandejas magnéticas ou organizadores)</li>
          <li><strong>Documentação aberta</strong> — manual de serviço do equipamento, vídeos do iFixit, fórum específico</li>
          <li><strong>Câmera ou celular</strong> — fotografe cada etapa antes de desconectar (especialmente conectores flat)</li>
          <li><strong>Sem animais ou crianças</strong> — peças pequenas se perdem em frações de segundo</li>
          <li><strong>Temperatura ambiente</strong> — entre 18-25°C, sem umidade alta (problemas comuns em Curitiba no inverno)</li>
        </ul>

        <h2>Diagnóstico Inicial</h2>
        <p>Nunca comece um procedimento sem entender o estado atual do equipamento. O diagnóstico determina se a intervenção planejada é realmente a correta — ou se você está prestes a substituir uma peça boa enquanto o problema real é outro.</p>
        <p>Documente:</p>
        <ul>
          <li>Modelo exato do equipamento e número de série</li>
          <li>Sintomas relatados pelo usuário e quando começaram</li>
          <li>Última intervenção realizada (atualização, queda, contato com líquido)</li>
          <li>Estado físico aparente — pontos de impacto, sinais de líquido, cheiro de queimado</li>
          <li>Comportamento ao ligar — LEDs, ventoinhas, beeps, mensagens de POST</li>
        </ul>
        <p>Esse registro vale ouro: serve de proteção em caso de discussão sobre danos pré-existentes e ajuda a refinar o diagnóstico se o problema persistir.</p>

        <h2>Procedimento Passo a Passo</h2>
        <p>Com tudo preparado, execute o procedimento na ordem correta. <strong>Pular etapas é o caminho mais curto para o retrabalho.</strong></p>
        <ol>
          <li><strong>Backup completo dos dados</strong> — antes de qualquer intervenção em hardware com armazenamento, copie tudo. HD/SSD podem morrer durante o processo.</li>
          <li><strong>Desligue completamente</strong> — não basta hibernar. Desconecte da tomada e remova a bateria (se removível). Aguarde 30 segundos para descarga residual.</li>
          <li><strong>Aterre-se</strong> — toque numa parte metálica aterrada antes de manusear componentes. Use pulseira ESD em peças sensíveis (RAM, GPU, SSD NVMe).</li>
          <li><strong>Desmontagem documentada</strong> — fotografe cada parafuso retirado e cada conector desconectado. Use bandejas separadas por etapa.</li>
          <li><strong>Execução técnica</strong> — siga o procedimento específico para o tipo de intervenção. Não force nada. Se está duro, há algo errado.</li>
          <li><strong>Limpeza durante a montagem</strong> — aproveite o equipamento aberto para limpeza completa de coolers, dissipadores e contatos.</li>
          <li><strong>Remontagem na ordem inversa</strong> — sem pular conectores. Confira cada flat cable e cada parafuso antes de fechar.</li>
          <li><strong>Teste antes de fechar definitivamente</strong> — ligue com a tampa solta e verifique se tudo funciona. Só então parafuse tudo.</li>
        </ol>

        <h2>Erros Comuns Que Devem Ser Evitados</h2>
        <p>Mesmo técnicos experientes cometem erros recorrentes. Conhecê-los previamente reduz drasticamente as chances de problema.</p>
        <ul>
          <li><strong>Excesso de pasta térmica</strong> — uma quantidade do tamanho de um grão de arroz é suficiente. Excesso prejudica a dissipação.</li>
          <li><strong>Apertar parafusos demais</strong> — especialmente em notebooks, pode quebrar o plástico ou empenar a placa</li>
          <li><strong>Favaliar o valor conectores</strong> — flat cables têm orientação específica. Se está duro, está errado.</li>
          <li><strong>Misturar parafusos</strong> — usar parafuso longo onde deveria ser curto pode perfurar componentes internos</li>
          <li><strong>Trabalhar com o equipamento ligado</strong> — exceto em testes específicos, sempre desligue. Curtos acidentais são fatais.</li>
          <li><strong>Pular o teste pós-procedimento</strong> — fechar tudo sem testar é receita para retrabalho</li>
        </ul>

        <h2>Validação e Testes Pós-Procedimento</h2>
        <p>O serviço só está concluído quando passa nos testes. Profissionais entregam o equipamento com relatório de testes, não com base em "tá funcionando".</p>
        <ul>
          <li><strong>Teste de boot completo</strong> — entrar no SO sem erros, sem mensagens de POST anormais</li>
          <li><strong>Stress test de CPU</strong> — Cinebench R23 ou Prime95 por 30 minutos, monitorando temperatura</li>
          <li><strong>Stress test de GPU</strong> — FurMark ou 3DMark por 20 minutos (em GPUs dedicadas)</li>
          <li><strong>Teste de memória RAM</strong> — MemTest86 por pelo menos um ciclo completo</li>
          <li><strong>Teste de disco</strong> — CrystalDiskInfo (saúde) e CrystalDiskMark (performance)</li>
          <li><strong>Teste de carga prolongada</strong> — uso real por algumas horas antes de devolver ao cliente</li>
        </ul>

        <h2>Quando Chamar um Profissional</h2>
        <p>Há situações em que tentar resolver sozinho não compensa. O custo do erro é maior que o do serviço técnico.</p>
        <ul>
          <li>Equipamento ainda em garantia — abrir cancela a cobertura do fabricante</li>
          <li>Problema envolve solda em placa-mãe (BGA, SMD, microsoldagem)</li>
          <li>Recuperação de dados de HD com falha mecânica (cabeça travada, motor queimado)</li>
          <li>Contato com líquido — cada minuto sem limpeza profissional causa mais corrosão</li>
          <li>Falta de ferramenta específica (estação de retrabalho, microscópio, oscilador)</li>
          <li>Quando o equipamento tem valor sentimental ou contém dados insubstituíveis</li>
        </ul>

        <h2>Garantia e Documentação do Serviço</h2>
        <p>Todo serviço técnico profissional vem com <strong>garantia escrita</strong> e documentação. Se o serviço não tem nota fiscal, ordem de serviço e prazo de garantia, não é serviço profissional.</p>
        <p>Em Curitiba, a {BRAND_NAME} emite ordem de serviço completa com:</p>
        <ul>
          <li>Diagnóstico inicial documentado</li>
          <li>Lista de peças trocadas (com nota fiscal das peças)</li>
          <li>Procedimentos realizados</li>
          <li>Testes executados e resultados</li>
          <li>Garantia mínima de 90 dias para serviços e peças</li>
        </ul>

        <h2>Fazendo Fazer Backup Completo do Windows 11 em Curitiba</h2>
        <p>Se você prefere deixar o serviço com quem faz isso todos os dias, a <strong>{BRAND_NAME}</strong> realiza fazer backup completo do windows 11 em Curitiba e região metropolitana. Atendimento a domicílio, laboratório próprio, garantia escrita e valor transparente antes da execução.</p>
        <p>Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande. Diagnóstico via WhatsApp em até 5 minutos.</p>

      </>
    ),
  },

  "como-instalar-windows-11-do-zero": {
    title: "Como preparar uma instalação limpa do Windows 11",
    excerpt: "Entenda backup, requisitos, mídia oficial, licença, drivers e riscos antes de fazer uma instalação limpa do Windows 11.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Uma instalação limpa do Windows 11 apaga o disco do sistema e começa tudo do zero. Bem feita, ela deixa o sistema estável; feita às pressas, pode custar seus arquivos. Este guia é de <strong>preparação e decisão segura</strong> — o que conferir antes, durante e depois — e não um tutorial de bypass ou ativação.</p>

        <h2>O que é instalação limpa</h2>
        <ul>
          <li><strong>Atualização:</strong> mantém arquivos, programas e configurações e apenas atualiza o sistema.</li>
          <li><strong>Restauração:</strong> volta o sistema a um ponto anterior, quando há um ponto salvo.</li>
          <li><strong>Redefinição:</strong> recurso do próprio Windows que reinstala o sistema com opção de manter ou remover arquivos.</li>
          <li><strong>Reinstalação:</strong> instala o sistema novamente, com graus variados de preservação.</li>
          <li><strong>Instalação limpa:</strong> apaga o disco do sistema e instala o Windows 11 do zero.</li>
        </ul>
        <p>A instalação limpa é a mais radical. Só faz sentido depois de descartar as opções mais leves e com backup pronto.</p>

        <h2>Antes de começar</h2>
        <ul>
          <li><strong>Backup:</strong> copie e confira documentos, fotos e pastas pessoais em outro lugar.</li>
          <li><strong>Contas e senhas:</strong> anote acessos de e-mail, navegador e serviços que serão reconfigurados.</li>
          <li><strong>Criptografia:</strong> discos protegidos por BitLocker podem exigir a chave de recuperação — tenha-a em mãos para não perder o acesso.</li>
          <li><strong>Programas e licenças:</strong> liste o que precisa reinstalar e onde estão as licenças legítimas.</li>
          <li><strong>Drivers:</strong> identifique os componentes que vão precisar de drivers após a instalação.</li>
          <li><strong>Edição e compatibilidade:</strong> confira a edição correta do Windows e se o equipamento atende aos requisitos oficiais do Windows 11.</li>
        </ul>

        <h2>Mídia oficial</h2>
        <p>Baixe o Windows 11 e crie a mídia de instalação apenas pelas <strong>ferramentas e downloads oficiais da Microsoft</strong>. Este conteúdo não indica ativadores, cracks, chaves, bypass de requisitos, imagens modificadas, downloads de terceiros ou scripts para contornar verificações — além do risco de segurança, essas práticas comprometem a licença e a estabilidade do sistema.</p>

        <h2>Durante e após a instalação</h2>
        <ul>
          <li>A seleção de disco exige cuidado: partições podem conter seus dados.</li>
          <li>A instalação limpa apaga arquivos do disco escolhido — por isso o backup vem antes.</li>
          <li>Instale drivers a partir do fabricante do equipamento ou do Windows Update.</li>
          <li>A ativação depende de uma licença legítima já vinculada ao equipamento ou adquirida oficialmente.</li>
          <li>Os programas precisam ser reinstalados depois.</li>
          <li>Confira o backup antes de apagar qualquer coisa em definitivo.</li>
        </ul>

        <h2>Quando não prosseguir</h2>
        <p>A instalação limpa organiza o sistema, mas <strong>não resolve</strong> problemas físicos: se o disco, a memória ou outra peça estão com defeito, reinstalar o Windows 11 não corrige a falha. Interrompa a instalação limpa se houver <strong>disco com sinais de falha, arquivos ainda sem backup, chave de recuperação desconhecida, equipamento sem compatibilidade confirmada, dúvida sobre partições, suspeita de falha física ou necessidade de recuperar dados</strong>. Nesses casos, seguir em frente pode apagar dados sem retorno. Se os arquivos já estão inacessíveis, o caminho é a <Link to="/servicos/recuperacao-de-dados" className="text-accent">recuperação de dados</Link>, não a instalação limpa.</p>


        <h2>Quanto tempo leva e o que esperar</h2>
        <p>A instalação em si costuma ser a parte mais curta do processo. O tempo real é consumido pelas etapas em volta: conferir e copiar arquivos, criar a mídia oficial, instalar drivers e reinstalar programas. Em equipamentos com disco mecânico antigo, cada etapa se alonga; em máquinas com SSD saudável, o mesmo roteiro é bem mais rápido. Planeje a instalação limpa para um período em que o equipamento possa ficar indisponível sem prejudicar trabalho ou estudo.</p>
        <p>Depois de concluir, o sistema volta sem seus programas, sem suas contas conectadas e sem as configurações que você tinha. Isso é esperado: a instalação limpa devolve um sistema padrão. Reserve tempo para reconfigurar impressora, rede, navegador, e-mail e os programas usados no dia a dia, e só apague o backup depois de confirmar que tudo voltou.</p>

        <h2>Erros comuns que custam arquivos</h2>
        <ul>
          <li><strong>Confiar em um backup nunca conferido:</strong> copiar não é o mesmo que verificar. Abra alguns arquivos no destino antes de prosseguir.</li>
          <li><strong>Guardar o backup no próprio disco do sistema:</strong> a instalação limpa apaga justamente esse disco.</li>
          <li><strong>Ignorar o BitLocker:</strong> sem a chave de recuperação, o conteúdo do disco pode ficar inacessível.</li>
          <li><strong>Escolher a partição errada:</strong> em equipamentos com mais de um disco, a seleção precisa ser conferida com calma.</li>
          <li><strong>Reinstalar por cima de uma falha física:</strong> disco ou memória com defeito continuam com defeito depois da instalação.</li>
          <li><strong>Perder acessos:</strong> contas com verificação em duas etapas podem exigir códigos que ficaram só no equipamento antigo.</li>
        </ul>
        <p>Nenhum desses pontos exige conhecimento avançado — exige apenas ordem. Quando a ordem é respeitada (conferir, salvar, validar, então instalar), a instalação limpa deixa de ser um risco e vira manutenção previsível.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se você não tem certeza sobre requisitos, partições, licença ou backup, um diagnóstico define o melhor caminho antes de apagar o disco. Assim você evita reinstalar o sistema e perder arquivos no processo.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Vai fazer instalação limpa do Windows 11?</h3>
          <p className="text-muted-foreground mb-3">Cuidamos do backup e conferimos requisitos e licença antes da instalação.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/formatacao" className="text-accent">Formatação e instalação do sistema</Link></li>
            <li><Link to="/servicos/recuperacao-de-dados" className="text-accent">Recuperação de dados</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnóstico técnico</Link></li>
            <li><Link to="/precos-e-politicas" className="text-accent">Preços e políticas de atendimento</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="como-instalar-windows-11-do-zero" />
      </>
    ),
  },


  "como-resolver-tela-azul-windows": {
    title: "Como Resolver Tela Azul do Windows (BSOD): Diagnóstico e Solução",
    excerpt: "Análise de códigos de erro, dump de memória, drivers problemáticos e procedimento profissional de correção.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Realizar <strong>resolver tela azul do windows (bsod)</strong> exige procedimento técnico, ferramentas adequadas e atenção a detalhes que separam o trabalho amador do profissional. Neste guia, você vai aprender o passo a passo real usado em laboratórios de assistência técnica em Curitiba.</p>

        <h2>Por Que o Procedimento Importa</h2>
        <p>Trabalhar em hardware sem método é a principal causa de dano permanente em equipamentos. Pequenos descuidos — descarga eletrostática, parafuso errado, conector mal encaixado — podem transformar um serviço simples em um problema irreversível. Por isso, todo técnico profissional segue um <strong>checklist documentado</strong> antes, durante e depois de cada intervenção.</p>
        <p>O custo médio de um erro evitável em manutenção de hardware varia entre R$ 200 e R$ 2.000, dependendo da peça danificada. Já o custo de seguir o procedimento correto é apenas o tempo de leitura deste artigo.</p>

        <h2>Ferramentas e Materiais Necessários</h2>
        <p>Antes de começar, separe todo o material. Interromper o procedimento no meio para buscar uma chave Phillips é como abrir uma cirurgia sem o instrumental.</p>
        <ul>
          <li><strong>Pulseira antiestática</strong> (ESD) — protege componentes contra descarga eletrostática, principal causa silenciosa de morte de placas</li>
          <li><strong>Chaves Phillips e Torx</strong> — kit de precisão com bits magnéticos, indispensável para notebooks modernos</li>
          <li><strong>Pasta térmica de qualidade</strong> — Arctic MX-6, Noctua NT-H2 ou Thermal Grizzly Kryonaut (evite genéricas)</li>
          <li><strong>Álcool isopropílico 99,9%</strong> — para limpeza de pasta térmica antiga e contatos oxidados</li>
          <li><strong>Pincel antiestático</strong> e pano de microfibra — limpeza segura de placas e dissipadores</li>
          <li><strong>Pinça de precisão</strong> — manuseio de conectores flat cable e parafusos pequenos</li>
          <li><strong>Pendrive com Ventoy</strong> — para boot de utilitários (MemTest86, Hiren's BootCD, Hard Disk Sentinel)</li>
        </ul>
        <p>Investir R$ 300-500 num kit profissional retorna em economia já no primeiro serviço evitando danos.</p>

        <h2>Preparação do Ambiente</h2>
        <p>O local de trabalho influencia diretamente a qualidade do serviço. Profissionais sérios trabalham em ambientes controlados — não em cima do sofá da sala.</p>
        <ul>
          <li><strong>Bancada plana e iluminada</strong> — preferencialmente com manta antiestática</li>
          <li><strong>Recipientes para parafusos</strong> — separe por etapa da desmontagem (use bandejas magnéticas ou organizadores)</li>
          <li><strong>Documentação aberta</strong> — manual de serviço do equipamento, vídeos do iFixit, fórum específico</li>
          <li><strong>Câmera ou celular</strong> — fotografe cada etapa antes de desconectar (especialmente conectores flat)</li>
          <li><strong>Sem animais ou crianças</strong> — peças pequenas se perdem em frações de segundo</li>
          <li><strong>Temperatura ambiente</strong> — entre 18-25°C, sem umidade alta (problemas comuns em Curitiba no inverno)</li>
        </ul>

        <h2>Diagnóstico Inicial</h2>
        <p>Nunca comece um procedimento sem entender o estado atual do equipamento. O diagnóstico determina se a intervenção planejada é realmente a correta — ou se você está prestes a substituir uma peça boa enquanto o problema real é outro.</p>
        <p>Documente:</p>
        <ul>
          <li>Modelo exato do equipamento e número de série</li>
          <li>Sintomas relatados pelo usuário e quando começaram</li>
          <li>Última intervenção realizada (atualização, queda, contato com líquido)</li>
          <li>Estado físico aparente — pontos de impacto, sinais de líquido, cheiro de queimado</li>
          <li>Comportamento ao ligar — LEDs, ventoinhas, beeps, mensagens de POST</li>
        </ul>
        <p>Esse registro vale ouro: serve de proteção em caso de discussão sobre danos pré-existentes e ajuda a refinar o diagnóstico se o problema persistir.</p>

        <h2>Procedimento Passo a Passo</h2>
        <p>Com tudo preparado, execute o procedimento na ordem correta. <strong>Pular etapas é o caminho mais curto para o retrabalho.</strong></p>
        <ol>
          <li><strong>Backup completo dos dados</strong> — antes de qualquer intervenção em hardware com armazenamento, copie tudo. HD/SSD podem morrer durante o processo.</li>
          <li><strong>Desligue completamente</strong> — não basta hibernar. Desconecte da tomada e remova a bateria (se removível). Aguarde 30 segundos para descarga residual.</li>
          <li><strong>Aterre-se</strong> — toque numa parte metálica aterrada antes de manusear componentes. Use pulseira ESD em peças sensíveis (RAM, GPU, SSD NVMe).</li>
          <li><strong>Desmontagem documentada</strong> — fotografe cada parafuso retirado e cada conector desconectado. Use bandejas separadas por etapa.</li>
          <li><strong>Execução técnica</strong> — siga o procedimento específico para o tipo de intervenção. Não force nada. Se está duro, há algo errado.</li>
          <li><strong>Limpeza durante a montagem</strong> — aproveite o equipamento aberto para limpeza completa de coolers, dissipadores e contatos.</li>
          <li><strong>Remontagem na ordem inversa</strong> — sem pular conectores. Confira cada flat cable e cada parafuso antes de fechar.</li>
          <li><strong>Teste antes de fechar definitivamente</strong> — ligue com a tampa solta e verifique se tudo funciona. Só então parafuse tudo.</li>
        </ol>

        <h2>Erros Comuns Que Devem Ser Evitados</h2>
        <p>Mesmo técnicos experientes cometem erros recorrentes. Conhecê-los previamente reduz drasticamente as chances de problema.</p>
        <ul>
          <li><strong>Excesso de pasta térmica</strong> — uma quantidade do tamanho de um grão de arroz é suficiente. Excesso prejudica a dissipação.</li>
          <li><strong>Apertar parafusos demais</strong> — especialmente em notebooks, pode quebrar o plástico ou empenar a placa</li>
          <li><strong>Favaliar o valor conectores</strong> — flat cables têm orientação específica. Se está duro, está errado.</li>
          <li><strong>Misturar parafusos</strong> — usar parafuso longo onde deveria ser curto pode perfurar componentes internos</li>
          <li><strong>Trabalhar com o equipamento ligado</strong> — exceto em testes específicos, sempre desligue. Curtos acidentais são fatais.</li>
          <li><strong>Pular o teste pós-procedimento</strong> — fechar tudo sem testar é receita para retrabalho</li>
        </ul>

        <h2>Validação e Testes Pós-Procedimento</h2>
        <p>O serviço só está concluído quando passa nos testes. Profissionais entregam o equipamento com relatório de testes, não com base em "tá funcionando".</p>
        <ul>
          <li><strong>Teste de boot completo</strong> — entrar no SO sem erros, sem mensagens de POST anormais</li>
          <li><strong>Stress test de CPU</strong> — Cinebench R23 ou Prime95 por 30 minutos, monitorando temperatura</li>
          <li><strong>Stress test de GPU</strong> — FurMark ou 3DMark por 20 minutos (em GPUs dedicadas)</li>
          <li><strong>Teste de memória RAM</strong> — MemTest86 por pelo menos um ciclo completo</li>
          <li><strong>Teste de disco</strong> — CrystalDiskInfo (saúde) e CrystalDiskMark (performance)</li>
          <li><strong>Teste de carga prolongada</strong> — uso real por algumas horas antes de devolver ao cliente</li>
        </ul>

        <h2>Quando Chamar um Profissional</h2>
        <p>Há situações em que tentar resolver sozinho não compensa. O custo do erro é maior que o do serviço técnico.</p>
        <ul>
          <li>Equipamento ainda em garantia — abrir cancela a cobertura do fabricante</li>
          <li>Problema envolve solda em placa-mãe (BGA, SMD, microsoldagem)</li>
          <li>Recuperação de dados de HD com falha mecânica (cabeça travada, motor queimado)</li>
          <li>Contato com líquido — cada minuto sem limpeza profissional causa mais corrosão</li>
          <li>Falta de ferramenta específica (estação de retrabalho, microscópio, oscilador)</li>
          <li>Quando o equipamento tem valor sentimental ou contém dados insubstituíveis</li>
        </ul>

        <h2>Garantia e Documentação do Serviço</h2>
        <p>Todo serviço técnico profissional vem com <strong>garantia escrita</strong> e documentação. Se o serviço não tem nota fiscal, ordem de serviço e prazo de garantia, não é serviço profissional.</p>
        <p>Em Curitiba, a {BRAND_NAME} emite ordem de serviço completa com:</p>
        <ul>
          <li>Diagnóstico inicial documentado</li>
          <li>Lista de peças trocadas (com nota fiscal das peças)</li>
          <li>Procedimentos realizados</li>
          <li>Testes executados e resultados</li>
          <li>Garantia mínima de 90 dias para serviços e peças</li>
        </ul>

        <h2>Fazendo Resolver Tela Azul do Windows (BSOD) em Curitiba</h2>
        <p>Se você prefere deixar o serviço com quem faz isso todos os dias, a <strong>{BRAND_NAME}</strong> realiza resolver tela azul do windows (bsod) em Curitiba e região metropolitana. Atendimento a domicílio, laboratório próprio, garantia escrita e valor transparente antes da execução.</p>
        <p>Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande. Diagnóstico via WhatsApp em até 5 minutos.</p>

      </>
    ),
  },

  "como-fazer-overclock-cpu-com-seguranca": {
    title: "Como Fazer Overclock de CPU com Segurança: Procedimento Técnico",
    excerpt: "Passo a passo para overclock estável: voltagem, temperatura, stress test e estabilidade de longo prazo.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Realizar <strong>fazer overclock de cpu com segurança</strong> exige procedimento técnico, ferramentas adequadas e atenção a detalhes que separam o trabalho amador do profissional. Neste guia, você vai aprender o passo a passo real usado em laboratórios de assistência técnica em Curitiba.</p>

        <h2>Por Que o Procedimento Importa</h2>
        <p>Trabalhar em hardware sem método é a principal causa de dano permanente em equipamentos. Pequenos descuidos — descarga eletrostática, parafuso errado, conector mal encaixado — podem transformar um serviço simples em um problema irreversível. Por isso, todo técnico profissional segue um <strong>checklist documentado</strong> antes, durante e depois de cada intervenção.</p>
        <p>O custo médio de um erro evitável em manutenção de hardware varia entre R$ 200 e R$ 2.000, dependendo da peça danificada. Já o custo de seguir o procedimento correto é apenas o tempo de leitura deste artigo.</p>

        <h2>Ferramentas e Materiais Necessários</h2>
        <p>Antes de começar, separe todo o material. Interromper o procedimento no meio para buscar uma chave Phillips é como abrir uma cirurgia sem o instrumental.</p>
        <ul>
          <li><strong>Pulseira antiestática</strong> (ESD) — protege componentes contra descarga eletrostática, principal causa silenciosa de morte de placas</li>
          <li><strong>Chaves Phillips e Torx</strong> — kit de precisão com bits magnéticos, indispensável para notebooks modernos</li>
          <li><strong>Pasta térmica de qualidade</strong> — Arctic MX-6, Noctua NT-H2 ou Thermal Grizzly Kryonaut (evite genéricas)</li>
          <li><strong>Álcool isopropílico 99,9%</strong> — para limpeza de pasta térmica antiga e contatos oxidados</li>
          <li><strong>Pincel antiestático</strong> e pano de microfibra — limpeza segura de placas e dissipadores</li>
          <li><strong>Pinça de precisão</strong> — manuseio de conectores flat cable e parafusos pequenos</li>
          <li><strong>Pendrive com Ventoy</strong> — para boot de utilitários (MemTest86, Hiren's BootCD, Hard Disk Sentinel)</li>
        </ul>
        <p>Investir R$ 300-500 num kit profissional retorna em economia já no primeiro serviço evitando danos.</p>

        <h2>Preparação do Ambiente</h2>
        <p>O local de trabalho influencia diretamente a qualidade do serviço. Profissionais sérios trabalham em ambientes controlados — não em cima do sofá da sala.</p>
        <ul>
          <li><strong>Bancada plana e iluminada</strong> — preferencialmente com manta antiestática</li>
          <li><strong>Recipientes para parafusos</strong> — separe por etapa da desmontagem (use bandejas magnéticas ou organizadores)</li>
          <li><strong>Documentação aberta</strong> — manual de serviço do equipamento, vídeos do iFixit, fórum específico</li>
          <li><strong>Câmera ou celular</strong> — fotografe cada etapa antes de desconectar (especialmente conectores flat)</li>
          <li><strong>Sem animais ou crianças</strong> — peças pequenas se perdem em frações de segundo</li>
          <li><strong>Temperatura ambiente</strong> — entre 18-25°C, sem umidade alta (problemas comuns em Curitiba no inverno)</li>
        </ul>

        <h2>Diagnóstico Inicial</h2>
        <p>Nunca comece um procedimento sem entender o estado atual do equipamento. O diagnóstico determina se a intervenção planejada é realmente a correta — ou se você está prestes a substituir uma peça boa enquanto o problema real é outro.</p>
        <p>Documente:</p>
        <ul>
          <li>Modelo exato do equipamento e número de série</li>
          <li>Sintomas relatados pelo usuário e quando começaram</li>
          <li>Última intervenção realizada (atualização, queda, contato com líquido)</li>
          <li>Estado físico aparente — pontos de impacto, sinais de líquido, cheiro de queimado</li>
          <li>Comportamento ao ligar — LEDs, ventoinhas, beeps, mensagens de POST</li>
        </ul>
        <p>Esse registro vale ouro: serve de proteção em caso de discussão sobre danos pré-existentes e ajuda a refinar o diagnóstico se o problema persistir.</p>

        <h2>Procedimento Passo a Passo</h2>
        <p>Com tudo preparado, execute o procedimento na ordem correta. <strong>Pular etapas é o caminho mais curto para o retrabalho.</strong></p>
        <ol>
          <li><strong>Backup completo dos dados</strong> — antes de qualquer intervenção em hardware com armazenamento, copie tudo. HD/SSD podem morrer durante o processo.</li>
          <li><strong>Desligue completamente</strong> — não basta hibernar. Desconecte da tomada e remova a bateria (se removível). Aguarde 30 segundos para descarga residual.</li>
          <li><strong>Aterre-se</strong> — toque numa parte metálica aterrada antes de manusear componentes. Use pulseira ESD em peças sensíveis (RAM, GPU, SSD NVMe).</li>
          <li><strong>Desmontagem documentada</strong> — fotografe cada parafuso retirado e cada conector desconectado. Use bandejas separadas por etapa.</li>
          <li><strong>Execução técnica</strong> — siga o procedimento específico para o tipo de intervenção. Não force nada. Se está duro, há algo errado.</li>
          <li><strong>Limpeza durante a montagem</strong> — aproveite o equipamento aberto para limpeza completa de coolers, dissipadores e contatos.</li>
          <li><strong>Remontagem na ordem inversa</strong> — sem pular conectores. Confira cada flat cable e cada parafuso antes de fechar.</li>
          <li><strong>Teste antes de fechar definitivamente</strong> — ligue com a tampa solta e verifique se tudo funciona. Só então parafuse tudo.</li>
        </ol>

        <h2>Erros Comuns Que Devem Ser Evitados</h2>
        <p>Mesmo técnicos experientes cometem erros recorrentes. Conhecê-los previamente reduz drasticamente as chances de problema.</p>
        <ul>
          <li><strong>Excesso de pasta térmica</strong> — uma quantidade do tamanho de um grão de arroz é suficiente. Excesso prejudica a dissipação.</li>
          <li><strong>Apertar parafusos demais</strong> — especialmente em notebooks, pode quebrar o plástico ou empenar a placa</li>
          <li><strong>Favaliar o valor conectores</strong> — flat cables têm orientação específica. Se está duro, está errado.</li>
          <li><strong>Misturar parafusos</strong> — usar parafuso longo onde deveria ser curto pode perfurar componentes internos</li>
          <li><strong>Trabalhar com o equipamento ligado</strong> — exceto em testes específicos, sempre desligue. Curtos acidentais são fatais.</li>
          <li><strong>Pular o teste pós-procedimento</strong> — fechar tudo sem testar é receita para retrabalho</li>
        </ul>

        <h2>Validação e Testes Pós-Procedimento</h2>
        <p>O serviço só está concluído quando passa nos testes. Profissionais entregam o equipamento com relatório de testes, não com base em "tá funcionando".</p>
        <ul>
          <li><strong>Teste de boot completo</strong> — entrar no SO sem erros, sem mensagens de POST anormais</li>
          <li><strong>Stress test de CPU</strong> — Cinebench R23 ou Prime95 por 30 minutos, monitorando temperatura</li>
          <li><strong>Stress test de GPU</strong> — FurMark ou 3DMark por 20 minutos (em GPUs dedicadas)</li>
          <li><strong>Teste de memória RAM</strong> — MemTest86 por pelo menos um ciclo completo</li>
          <li><strong>Teste de disco</strong> — CrystalDiskInfo (saúde) e CrystalDiskMark (performance)</li>
          <li><strong>Teste de carga prolongada</strong> — uso real por algumas horas antes de devolver ao cliente</li>
        </ul>

        <h2>Quando Chamar um Profissional</h2>
        <p>Há situações em que tentar resolver sozinho não compensa. O custo do erro é maior que o do serviço técnico.</p>
        <ul>
          <li>Equipamento ainda em garantia — abrir cancela a cobertura do fabricante</li>
          <li>Problema envolve solda em placa-mãe (BGA, SMD, microsoldagem)</li>
          <li>Recuperação de dados de HD com falha mecânica (cabeça travada, motor queimado)</li>
          <li>Contato com líquido — cada minuto sem limpeza profissional causa mais corrosão</li>
          <li>Falta de ferramenta específica (estação de retrabalho, microscópio, oscilador)</li>
          <li>Quando o equipamento tem valor sentimental ou contém dados insubstituíveis</li>
        </ul>

        <h2>Garantia e Documentação do Serviço</h2>
        <p>Todo serviço técnico profissional vem com <strong>garantia escrita</strong> e documentação. Se o serviço não tem nota fiscal, ordem de serviço e prazo de garantia, não é serviço profissional.</p>
        <p>Em Curitiba, a {BRAND_NAME} emite ordem de serviço completa com:</p>
        <ul>
          <li>Diagnóstico inicial documentado</li>
          <li>Lista de peças trocadas (com nota fiscal das peças)</li>
          <li>Procedimentos realizados</li>
          <li>Testes executados e resultados</li>
          <li>Garantia mínima de 90 dias para serviços e peças</li>
        </ul>

        <h2>Fazendo Fazer Overclock de CPU com Segurança em Curitiba</h2>
        <p>Se você prefere deixar o serviço com quem faz isso todos os dias, a <strong>{BRAND_NAME}</strong> realiza fazer overclock de cpu com segurança em Curitiba e região metropolitana. Atendimento a domicílio, laboratório próprio, garantia escrita e valor transparente antes da execução.</p>
        <p>Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande. Diagnóstico via WhatsApp em até 5 minutos.</p>

      </>
    ),
  },

  "como-montar-pc-gamer-2026": {
    title: "Como Montar um PC Gamer em 2026: Guia Técnico Completo",
    excerpt: "Escolha de componentes, montagem física, cable management, instalação de SO e otimização para jogos.",
    date: "2026-04-20",
    readTime: "13 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Realizar <strong>montar um pc gamer em 2026</strong> exige procedimento técnico, ferramentas adequadas e atenção a detalhes que separam o trabalho amador do profissional. Neste guia, você vai aprender o passo a passo real usado em laboratórios de assistência técnica em Curitiba.</p>

        <h2>Por Que o Procedimento Importa</h2>
        <p>Trabalhar em hardware sem método é a principal causa de dano permanente em equipamentos. Pequenos descuidos — descarga eletrostática, parafuso errado, conector mal encaixado — podem transformar um serviço simples em um problema irreversível. Por isso, todo técnico profissional segue um <strong>checklist documentado</strong> antes, durante e depois de cada intervenção.</p>
        <p>O custo médio de um erro evitável em manutenção de hardware varia entre R$ 200 e R$ 2.000, dependendo da peça danificada. Já o custo de seguir o procedimento correto é apenas o tempo de leitura deste artigo.</p>

        <h2>Ferramentas e Materiais Necessários</h2>
        <p>Antes de começar, separe todo o material. Interromper o procedimento no meio para buscar uma chave Phillips é como abrir uma cirurgia sem o instrumental.</p>
        <ul>
          <li><strong>Pulseira antiestática</strong> (ESD) — protege componentes contra descarga eletrostática, principal causa silenciosa de morte de placas</li>
          <li><strong>Chaves Phillips e Torx</strong> — kit de precisão com bits magnéticos, indispensável para notebooks modernos</li>
          <li><strong>Pasta térmica de qualidade</strong> — Arctic MX-6, Noctua NT-H2 ou Thermal Grizzly Kryonaut (evite genéricas)</li>
          <li><strong>Álcool isopropílico 99,9%</strong> — para limpeza de pasta térmica antiga e contatos oxidados</li>
          <li><strong>Pincel antiestático</strong> e pano de microfibra — limpeza segura de placas e dissipadores</li>
          <li><strong>Pinça de precisão</strong> — manuseio de conectores flat cable e parafusos pequenos</li>
          <li><strong>Pendrive com Ventoy</strong> — para boot de utilitários (MemTest86, Hiren's BootCD, Hard Disk Sentinel)</li>
        </ul>
        <p>Investir R$ 300-500 num kit profissional retorna em economia já no primeiro serviço evitando danos.</p>

        <h2>Preparação do Ambiente</h2>
        <p>O local de trabalho influencia diretamente a qualidade do serviço. Profissionais sérios trabalham em ambientes controlados — não em cima do sofá da sala.</p>
        <ul>
          <li><strong>Bancada plana e iluminada</strong> — preferencialmente com manta antiestática</li>
          <li><strong>Recipientes para parafusos</strong> — separe por etapa da desmontagem (use bandejas magnéticas ou organizadores)</li>
          <li><strong>Documentação aberta</strong> — manual de serviço do equipamento, vídeos do iFixit, fórum específico</li>
          <li><strong>Câmera ou celular</strong> — fotografe cada etapa antes de desconectar (especialmente conectores flat)</li>
          <li><strong>Sem animais ou crianças</strong> — peças pequenas se perdem em frações de segundo</li>
          <li><strong>Temperatura ambiente</strong> — entre 18-25°C, sem umidade alta (problemas comuns em Curitiba no inverno)</li>
        </ul>

        <h2>Diagnóstico Inicial</h2>
        <p>Nunca comece um procedimento sem entender o estado atual do equipamento. O diagnóstico determina se a intervenção planejada é realmente a correta — ou se você está prestes a substituir uma peça boa enquanto o problema real é outro.</p>
        <p>Documente:</p>
        <ul>
          <li>Modelo exato do equipamento e número de série</li>
          <li>Sintomas relatados pelo usuário e quando começaram</li>
          <li>Última intervenção realizada (atualização, queda, contato com líquido)</li>
          <li>Estado físico aparente — pontos de impacto, sinais de líquido, cheiro de queimado</li>
          <li>Comportamento ao ligar — LEDs, ventoinhas, beeps, mensagens de POST</li>
        </ul>
        <p>Esse registro vale ouro: serve de proteção em caso de discussão sobre danos pré-existentes e ajuda a refinar o diagnóstico se o problema persistir.</p>

        <h2>Procedimento Passo a Passo</h2>
        <p>Com tudo preparado, execute o procedimento na ordem correta. <strong>Pular etapas é o caminho mais curto para o retrabalho.</strong></p>
        <ol>
          <li><strong>Backup completo dos dados</strong> — antes de qualquer intervenção em hardware com armazenamento, copie tudo. HD/SSD podem morrer durante o processo.</li>
          <li><strong>Desligue completamente</strong> — não basta hibernar. Desconecte da tomada e remova a bateria (se removível). Aguarde 30 segundos para descarga residual.</li>
          <li><strong>Aterre-se</strong> — toque numa parte metálica aterrada antes de manusear componentes. Use pulseira ESD em peças sensíveis (RAM, GPU, SSD NVMe).</li>
          <li><strong>Desmontagem documentada</strong> — fotografe cada parafuso retirado e cada conector desconectado. Use bandejas separadas por etapa.</li>
          <li><strong>Execução técnica</strong> — siga o procedimento específico para o tipo de intervenção. Não force nada. Se está duro, há algo errado.</li>
          <li><strong>Limpeza durante a montagem</strong> — aproveite o equipamento aberto para limpeza completa de coolers, dissipadores e contatos.</li>
          <li><strong>Remontagem na ordem inversa</strong> — sem pular conectores. Confira cada flat cable e cada parafuso antes de fechar.</li>
          <li><strong>Teste antes de fechar definitivamente</strong> — ligue com a tampa solta e verifique se tudo funciona. Só então parafuse tudo.</li>
        </ol>

        <h2>Erros Comuns Que Devem Ser Evitados</h2>
        <p>Mesmo técnicos experientes cometem erros recorrentes. Conhecê-los previamente reduz drasticamente as chances de problema.</p>
        <ul>
          <li><strong>Excesso de pasta térmica</strong> — uma quantidade do tamanho de um grão de arroz é suficiente. Excesso prejudica a dissipação.</li>
          <li><strong>Apertar parafusos demais</strong> — especialmente em notebooks, pode quebrar o plástico ou empenar a placa</li>
          <li><strong>Favaliar o valor conectores</strong> — flat cables têm orientação específica. Se está duro, está errado.</li>
          <li><strong>Misturar parafusos</strong> — usar parafuso longo onde deveria ser curto pode perfurar componentes internos</li>
          <li><strong>Trabalhar com o equipamento ligado</strong> — exceto em testes específicos, sempre desligue. Curtos acidentais são fatais.</li>
          <li><strong>Pular o teste pós-procedimento</strong> — fechar tudo sem testar é receita para retrabalho</li>
        </ul>

        <h2>Validação e Testes Pós-Procedimento</h2>
        <p>O serviço só está concluído quando passa nos testes. Profissionais entregam o equipamento com relatório de testes, não com base em "tá funcionando".</p>
        <ul>
          <li><strong>Teste de boot completo</strong> — entrar no SO sem erros, sem mensagens de POST anormais</li>
          <li><strong>Stress test de CPU</strong> — Cinebench R23 ou Prime95 por 30 minutos, monitorando temperatura</li>
          <li><strong>Stress test de GPU</strong> — FurMark ou 3DMark por 20 minutos (em GPUs dedicadas)</li>
          <li><strong>Teste de memória RAM</strong> — MemTest86 por pelo menos um ciclo completo</li>
          <li><strong>Teste de disco</strong> — CrystalDiskInfo (saúde) e CrystalDiskMark (performance)</li>
          <li><strong>Teste de carga prolongada</strong> — uso real por algumas horas antes de devolver ao cliente</li>
        </ul>

        <h2>Quando Chamar um Profissional</h2>
        <p>Há situações em que tentar resolver sozinho não compensa. O custo do erro é maior que o do serviço técnico.</p>
        <ul>
          <li>Equipamento ainda em garantia — abrir cancela a cobertura do fabricante</li>
          <li>Problema envolve solda em placa-mãe (BGA, SMD, microsoldagem)</li>
          <li>Recuperação de dados de HD com falha mecânica (cabeça travada, motor queimado)</li>
          <li>Contato com líquido — cada minuto sem limpeza profissional causa mais corrosão</li>
          <li>Falta de ferramenta específica (estação de retrabalho, microscópio, oscilador)</li>
          <li>Quando o equipamento tem valor sentimental ou contém dados insubstituíveis</li>
        </ul>

        <h2>Garantia e Documentação do Serviço</h2>
        <p>Todo serviço técnico profissional vem com <strong>garantia escrita</strong> e documentação. Se o serviço não tem nota fiscal, ordem de serviço e prazo de garantia, não é serviço profissional.</p>
        <p>Em Curitiba, a {BRAND_NAME} emite ordem de serviço completa com:</p>
        <ul>
          <li>Diagnóstico inicial documentado</li>
          <li>Lista de peças trocadas (com nota fiscal das peças)</li>
          <li>Procedimentos realizados</li>
          <li>Testes executados e resultados</li>
          <li>Garantia mínima de 90 dias para serviços e peças</li>
        </ul>

        <h2>Fazendo Montar um PC Gamer em 2026 em Curitiba</h2>
        <p>Se você prefere deixar o serviço com quem faz isso todos os dias, a <strong>{BRAND_NAME}</strong> realiza montar um pc gamer em 2026 em Curitiba e região metropolitana. Atendimento a domicílio, laboratório próprio, garantia escrita e valor transparente antes da execução.</p>
        <p>Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande. Diagnóstico via WhatsApp em até 5 minutos.</p>

      </>
    ),
  },

  "como-criar-script-bash-iniciantes": {
    title: "Como Criar Scripts Bash no Linux: Guia Para Iniciantes e Técnicos",
    excerpt: "Variáveis, loops, condicionais e funções em Bash — automatize tarefas repetitivas no servidor ou desktop.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Criar Scripts Bash no Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-monitorar-servidor-linux": {
    title: "Como Monitorar Servidor Linux: htop, Glances, Netdata e Prometheus",
    excerpt: "Ferramentas profissionais de monitoramento de CPU, memória, disco, rede e processos em servidores Linux.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Monitorar Servidor Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-configurar-cron-jobs-linux": {
    title: "Como Configurar Cron Jobs no Linux: Agendamento de Tarefas",
    excerpt: "Sintaxe do crontab, exemplos práticos, debug e boas práticas para agendar backups, scripts e manutenção.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Configurar Cron Jobs no Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-instalar-postgresql-linux": {
    title: "Como Instalar e Configurar PostgreSQL no Linux: Guia Profissional",
    excerpt: "Instalação, criação de usuários, permissões, backup, restore e tuning básico do PostgreSQL no Ubuntu/Debian.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Instalar e Configurar PostgreSQL no Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-usar-systemd-linux": {
    title: "Como Usar systemd no Linux: Serviços, Logs e Boot Otimizado",
    excerpt: "Criar serviços customizados, gerenciar logs com journalctl e otimizar o tempo de boot do Linux.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Usar systemd no Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-configurar-rede-linux-netplan": {
    title: "Como Configurar Rede no Linux com Netplan: Guia Completo",
    excerpt: "IP estático, DHCP, múltiplas interfaces, bridge, bonding e VLAN em servidores Ubuntu/Debian modernos.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Configurar Rede no Linux com Netplan é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-instalar-lamp-stack-ubuntu": {
    title: "Como Instalar LAMP Stack no Ubuntu: Apache, MySQL e PHP",
    excerpt: "Procedimento técnico completo para configurar stack LAMP em servidor Ubuntu de produção com segurança.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Instalar LAMP Stack no Ubuntu é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-usar-rsync-backup-linux": {
    title: "Como Usar rsync Para Backup no Linux: Guia Definitivo",
    excerpt: "Sincronização local e remota, backup incremental, exclusões e automação com cron — o canivete suíço do sysadmin.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Linux",
    content: (
      <>
        <p className="lead">Usar rsync Para Backup no Linux é uma das habilidades mais valorizadas em ambientes de servidor e desenvolvimento. Neste guia técnico, vamos cobrir desde os conceitos fundamentais até os comandos avançados que técnicos e sysadmins usam no dia a dia.</p>

        <h2>Por Que Aprender Esse Recurso do Linux</h2>
        <p>Linux domina mais de 96% dos servidores web do mundo. Cada loja online, cada streaming, cada API que você usa provavelmente roda em Linux. Dominar suas ferramentas é dominar a infraestrutura moderna.</p>
        <p>Para profissionais de TI em Curitiba, conhecimento sólido de Linux é diferencial competitivo direto: empresas pagam mais por quem sabe administrar servidores Linux do que por quem só sabe Windows.</p>

        <h2>Pré-Requisitos Antes de Começar</h2>
        <p>Para acompanhar este guia com proveito, você deve ter:</p>
        <ul>
          <li>Uma instalação Linux funcional — Ubuntu 22.04+, Debian 12+ ou derivada</li>
          <li>Acesso ao terminal com privilégios sudo</li>
          <li>Conhecimento básico de navegação por linha de comando (cd, ls, mv, cp)</li>
          <li>Editor de texto preferido (nano para iniciantes, vim para experientes)</li>
          <li>Conexão à internet para instalação de pacotes</li>
        </ul>
        <p>Se nunca usou Linux, comece com nossos artigos sobre comandos essenciais antes de avançar.</p>

        <h2>Conceitos Fundamentais</h2>
        <p>Antes de digitar qualquer comando, é importante entender <strong>por que</strong> as coisas funcionam de determinada forma no Linux. Diferente do Windows, onde muitas operações são abstraídas pela interface, no Linux você está mais próximo do sistema operacional real.</p>
        <ul>
          <li><strong>Tudo é arquivo</strong> — dispositivos, processos, sockets, tudo é representado como arquivo no filesystem</li>
          <li><strong>Permissões granulares</strong> — leitura, escrita, execução para dono, grupo e outros</li>
          <li><strong>Pipes e composição</strong> — comandos pequenos que se combinam para tarefas complexas</li>
          <li><strong>Configuração em texto puro</strong> — quase tudo é configurado em arquivos /etc/* legíveis</li>
          <li><strong>Open Source</strong> — você pode auditar, modificar e contribuir para qualquer ferramenta</li>
        </ul>

        <h2>Instalação e Configuração Inicial</h2>
        <p>A maioria das ferramentas que vamos usar já vem pré-instalada nas distribuições principais. Quando não vem, a instalação é direta:</p>
        <pre><code>{`sudo apt update
sudo apt install -y curl wget git build-essential`}</code></pre>
        <p>Para distribuições baseadas em RHEL (Fedora, Rocky, AlmaLinux), substitua <code>apt</code> por <code>dnf</code>. Para Arch Linux, use <code>pacman -S</code>.</p>
        <p>Depois da instalação, verifique a versão dos pacotes para garantir compatibilidade com este guia:</p>
        <pre><code>{`uname -a              # informações do kernel
lsb_release -a       # versão da distribuição
which bash python3   # caminho dos interpretadores`}</code></pre>

        <h2>Comandos e Operações Principais</h2>
        <p>Os comandos básicos que você vai usar com frequência:</p>
        <ul>
          <li><strong>ls -lah</strong> — listagem detalhada com tamanhos legíveis</li>
          <li><strong>grep -r "padrao" .</strong> — busca recursiva por texto em arquivos</li>
          <li><strong>find /var/log -name "*.log" -mtime -7</strong> — encontra logs modificados nos últimos 7 dias</li>
          <li><strong>tail -f /var/log/syslog</strong> — monitora arquivo em tempo real</li>
          <li><strong>ps aux | grep nome</strong> — encontra processos por nome</li>
          <li><strong>du -sh *</strong> — tamanho de cada diretório no atual</li>
          <li><strong>df -h</strong> — espaço livre em todas as partições</li>
          <li><strong>journalctl -u nome.service -f</strong> — logs de serviço em tempo real</li>
        </ul>
        <p>Combine comandos com pipes para tarefas complexas. Por exemplo, encontrar os 10 maiores arquivos do sistema:</p>
        <pre><code>{`sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10`}</code></pre>

        <h2>Configuração Avançada</h2>
        <p>Depois do básico, é hora de aprofundar. As configurações avançadas separam o usuário casual do profissional.</p>
        <p>Edite o arquivo de configuração com permissão adequada:</p>
        <pre><code>{`sudo nano /etc/configuracao.conf`}</code></pre>
        <p>Aplique as alterações:</p>
        <ul>
          <li><strong>Recarregar configuração</strong> sem reiniciar o serviço quando possível</li>
          <li><strong>Reiniciar o serviço</strong> com <code>sudo systemctl restart nome</code></li>
          <li><strong>Verificar status</strong> com <code>sudo systemctl status nome</code></li>
          <li><strong>Ver logs recentes</strong> com <code>sudo journalctl -u nome -n 50</code></li>
        </ul>
        <p>Sempre faça backup de arquivos de configuração antes de editar:</p>
        <pre><code>{`sudo cp /etc/configuracao.conf /etc/configuracao.conf.bak`}</code></pre>

        <h2>Boas Práticas de Segurança</h2>
        <p>Servidores Linux são alvos constantes na internet. Seguir boas práticas não é opcional, é obrigatório.</p>
        <ul>
          <li><strong>Nunca rode como root</strong> em uso normal — use sudo apenas quando necessário</li>
          <li><strong>Mantenha o sistema atualizado</strong> — <code>sudo apt update && sudo apt upgrade</code> semanalmente</li>
          <li><strong>Configure firewall</strong> — UFW para desktops, iptables/nftables para servidores</li>
          <li><strong>Desabilite serviços não usados</strong> — menos superfície de ataque</li>
          <li><strong>Use chaves SSH</strong> em vez de senha — desabilite login por senha em produção</li>
          <li><strong>Fail2ban</strong> — bloqueia IPs após tentativas falhas de login</li>
          <li><strong>Monitore logs</strong> — falhas de autenticação suspeitas em /var/log/auth.log</li>
        </ul>

        <h2>Troubleshooting de Problemas Comuns</h2>
        <p>Quando algo dá errado — e vai dar — saber depurar é fundamental.</p>
        <ul>
          <li><strong>Comando não encontrado</strong> — verifique o PATH com <code>echo $PATH</code></li>
          <li><strong>Permissão negada</strong> — confira as permissões com <code>ls -la</code> e quem é o dono</li>
          <li><strong>Disco cheio</strong> — use <code>df -h</code> e <code>du -sh *</code> para encontrar consumidores</li>
          <li><strong>Processo travado</strong> — identifique com <code>htop</code> e termine com <code>kill -9 PID</code></li>
          <li><strong>Serviço não inicia</strong> — sempre comece por <code>journalctl -u nome.service</code></li>
          <li><strong>Rede não funciona</strong> — teste com <code>ping</code>, <code>ip a</code>, <code>ss -tuln</code></li>
        </ul>

        <h2>Automação e Produtividade</h2>
        <p>O verdadeiro poder do Linux está em automatizar tudo. Tarefas que levam horas em interfaces gráficas são resolvidas em segundos com scripts.</p>
        <p>Crie um script bash básico para tarefas repetitivas:</p>
        <pre><code>{`#!/bin/bash
set -euo pipefail
echo "Iniciando manutencao em $(date)"
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo journalctl --vacuum-time=7d
echo "Concluido em $(date)"`}</code></pre>
        <p>Torne executável e agende com cron para rodar automaticamente:</p>
        <pre><code>{`chmod +x manutencao.sh
crontab -e
# adicione: 0 3 * * 0 /caminho/manutencao.sh > /var/log/manut.log 2>&1`}</code></pre>

        <h2>Suporte Linux em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece suporte profissional para servidores e desktops Linux em Curitiba e região. Configuração de servidores web, e-mail, samba, firewall, monitoramento, backup e migração de Windows para Linux. Atendemos empresas de todos os portes com SLA definido e técnicos certificados.</p>
        <p>Cobertura: Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande.</p>

      </>
    ),
  },

  "como-criar-prompts-eficazes-chatgpt": {
    title: "Como Criar Prompts Eficazes Para ChatGPT: Guia Profissional",
    excerpt: "Técnicas avançadas de engenharia de prompt: contexto, persona, exemplos e refinamento iterativo de respostas.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>criar prompts eficazes para chatgpt</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "melhores-ias-para-programacao-2026": {
    title: "Melhores IAs Para Programação em 2026: Copilot, Cursor, Claude e Mais",
    excerpt: "Comparativo das principais IAs para desenvolvedores: assistentes de código, geração de testes e refatoração.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>melhores ias para programação em 2026</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "como-rodar-ia-localmente-no-pc": {
    title: "Como Rodar IA Localmente no PC: Ollama, LM Studio e LLMs Open Source",
    excerpt: "Procedimento técnico para executar modelos de linguagem (Llama, Mistral, Phi) localmente sem depender da nuvem.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>rodar ia localmente no pc</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "como-criar-imagens-com-stable-diffusion": {
    title: "Como Criar Imagens com Stable Diffusion: Instalação e Prompts",
    excerpt: "Guia técnico para instalar Stable Diffusion (Automatic1111, ComfyUI) e gerar imagens profissionais localmente.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>criar imagens com stable diffusion</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "automatizar-tarefas-com-ia-n8n-make": {
    title: "Como Automatizar Tarefas com IA: n8n, Make e Zapier",
    excerpt: "Crie automações poderosas conectando IA a planilhas, e-mails, WhatsApp e CRMs sem precisar programar.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>automatizar tarefas com ia</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "ia-para-criacao-conteudo-profissional": {
    title: "Como Usar IA Para Criação de Conteúdo Profissional",
    excerpt: "Workflow real de criação de textos, imagens, vídeos e áudios com IA mantendo qualidade e originalidade.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>usar ia para criação de conteúdo profissional</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "diferenca-llm-machine-learning-deep-learning": {
    title: "Diferença Entre LLM, Machine Learning e Deep Learning Explicada",
    excerpt: "Entenda os fundamentos técnicos por trás da IA moderna sem complicação — conceitos, exemplos e aplicações reais.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>diferença entre llm, machine learning e deep learning explicada</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "como-treinar-ia-customizada-fine-tuning": {
    title: "Como Treinar uma IA Customizada: Fine-Tuning e RAG Explicados",
    excerpt: "Procedimento técnico para customizar modelos de IA com seus próprios dados via fine-tuning ou retrieval augmented generation.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Inteligência Artificial",
    content: (
      <>
        <p className="lead">A inteligência artificial deixou de ser promessa futurista e virou ferramenta de trabalho diário. Saber <strong>treinar uma ia customizada</strong> é uma das habilidades mais procuradas no mercado em 2026. Neste guia, vamos cobrir o assunto de forma prática e técnica, sem hype.</p>

        <h2>O Estado Atual da IA em 2026</h2>
        <p>Em 2026, modelos de IA atingiram capacidades que pareciam impossíveis há cinco anos. GPT-5, Claude 4, Gemini 2.5 e modelos open source como Llama 4 e Mistral Large rivalizam com humanos em tarefas específicas: programação, redação técnica, análise de dados, geração de imagens e até raciocínio matemático complexo.</p>
        <p>O custo despencou: tarefas que custavam centavos por consulta agora custam frações de centavo. E modelos rodam localmente em hardware de consumidor — uma RTX 4070 já roda Llama 3 70B com qualidade impressionante.</p>

        <h2>Conceitos Essenciais Para Começar</h2>
        <p>Antes de aplicar IA ao seu trabalho, entenda os termos que você vai encontrar:</p>
        <ul>
          <li><strong>LLM (Large Language Model)</strong> — modelo treinado em bilhões de tokens de texto, capaz de gerar e entender linguagem natural</li>
          <li><strong>Token</strong> — unidade básica processada pelo modelo, tipicamente 3-4 caracteres ou metade de uma palavra</li>
          <li><strong>Contexto</strong> — quantidade de texto que o modelo consegue "lembrar" durante uma conversa (de 4K a 2M tokens nos modelos modernos)</li>
          <li><strong>Prompt</strong> — instrução enviada ao modelo, base de toda interação</li>
          <li><strong>Temperatura</strong> — parâmetro que controla criatividade vs determinismo (0 = previsível, 1+ = criativo)</li>
          <li><strong>Embedding</strong> — representação vetorial de texto usada em buscas semânticas</li>
          <li><strong>RAG (Retrieval Augmented Generation)</strong> — técnica que combina IA com base de conhecimento própria</li>
          <li><strong>Fine-tuning</strong> — treinar um modelo base com dados específicos do seu domínio</li>
        </ul>

        <h2>Ferramentas e Plataformas Disponíveis</h2>
        <p>O ecossistema de IA cresceu absurdamente. Aqui estão as plataformas mais relevantes para profissionais:</p>
        <ul>
          <li><strong>ChatGPT</strong> (OpenAI) — referência geral, melhor para tarefas multimodais</li>
          <li><strong>Claude</strong> (Anthropic) — destaque em raciocínio, código e conversas longas</li>
          <li><strong>Gemini</strong> (Google) — integração profunda com Google Workspace</li>
          <li><strong>Perplexity</strong> — busca web com IA e citações de fontes</li>
          <li><strong>Cursor / Windsurf</strong> — editores de código com IA integrada</li>
          <li><strong>Ollama / LM Studio</strong> — rodar modelos open source localmente</li>
          <li><strong>Hugging Face</strong> — repositório de modelos, datasets e ferramentas</li>
          <li><strong>OpenRouter</strong> — API unificada para dezenas de modelos diferentes</li>
        </ul>

        <h2>Caso de Uso 1: Produtividade Pessoal</h2>
        <p>O ganho mais imediato com IA é em tarefas pessoais repetitivas. Em poucos minutos por dia, você economiza horas por semana.</p>
        <ul>
          <li><strong>Resumos de reuniões</strong> — grave a reunião, transcreva com Whisper, peça à IA para extrair decisões e ações</li>
          <li><strong>E-mails profissionais</strong> — descreva o que quer dizer em uma frase, peça versão formal e revisada</li>
          <li><strong>Planejamento</strong> — descreva objetivos e restrições, deixe a IA propor cronograma</li>
          <li><strong>Pesquisa rápida</strong> — Perplexity para buscas com fontes, ChatGPT para sintetizar informações</li>
          <li><strong>Aprendizado</strong> — peça explicações de conceitos no seu nível, com analogias do seu domínio</li>
        </ul>

        <h2>Caso de Uso 2: Aplicação Profissional</h2>
        <p>No ambiente de trabalho, IA bem aplicada gera vantagem competitiva real. Empresas que dominam IA produzem mais com menos pessoas.</p>
        <p>Aplicações de alto impacto:</p>
        <ul>
          <li><strong>Atendimento ao cliente</strong> — chatbots que respondem 80% das dúvidas comuns automaticamente</li>
          <li><strong>Análise de dados</strong> — peça à IA para escrever queries SQL, interpretar planilhas, gerar relatórios</li>
          <li><strong>Marketing</strong> — geração de copy, ideias de campanha, A/B testing automatizado</li>
          <li><strong>Programação</strong> — Copilot e Cursor multiplicam a produtividade do desenvolvedor</li>
          <li><strong>Documentação técnica</strong> — IA gera primeira versão, humano revisa e ajusta</li>
          <li><strong>Tradução profissional</strong> — qualidade próxima de tradutor humano em frações do custo</li>
        </ul>

        <h2>Boas Práticas e Limitações</h2>
        <p>IA não é mágica. Conhecer as limitações é tão importante quanto conhecer as capacidades.</p>
        <ul>
          <li><strong>Alucinações</strong> — modelos podem inventar fatos com total convicção. Sempre verifique informações críticas.</li>
          <li><strong>Viés</strong> — modelos refletem vieses dos dados de treinamento. Tenha consciência disso em decisões sensíveis.</li>
          <li><strong>Conhecimento defasado</strong> — modelos têm cutoff de treinamento. Use ferramentas com busca web para informações atuais.</li>
          <li><strong>Privacidade</strong> — não envie dados sensíveis para APIs públicas. Use modelos locais ou contratos enterprise.</li>
          <li><strong>Custo em escala</strong> — APIs ficam caras quando rodam milhões de requisições. Otimize prompts e use modelos menores quando possível.</li>
          <li><strong>Dependência</strong> — não automatize crítica completamente. Mantenha humano no loop em decisões importantes.</li>
        </ul>

        <h2>Segurança e Privacidade</h2>
        <p>Com poder vem responsabilidade. Usar IA sem cuidado pode vazar dados sensíveis ou criar vulnerabilidades.</p>
        <ul>
          <li><strong>Não cole dados de clientes</strong> em ChatGPT pessoal — use versão Team/Enterprise com proteções contratuais</li>
          <li><strong>Modelos locais para dados confidenciais</strong> — Ollama com Llama 3 mantém tudo no seu hardware</li>
          <li><strong>Audit trail</strong> — registre interações com IA em sistemas críticos para conformidade</li>
          <li><strong>Validação de output</strong> — código gerado por IA deve passar por revisão humana e testes</li>
          <li><strong>Filtros de saída</strong> — em aplicações para o público, filtre conteúdo gerado para evitar respostas problemáticas</li>
        </ul>

        <h2>Implementação Prática Passo a Passo</h2>
        <p>Vamos sair da teoria. Aqui está um plano de 30 dias para integrar IA ao seu trabalho:</p>
        <ol>
          <li><strong>Semana 1</strong> — assine ChatGPT Plus ou Claude Pro. Use diariamente para tarefas pessoais. Aprenda o básico de prompts.</li>
          <li><strong>Semana 2</strong> — identifique 3 tarefas profissionais repetitivas. Crie templates de prompt para cada uma.</li>
          <li><strong>Semana 3</strong> — experimente integrações: extensões de browser, plugins de editor, APIs em scripts simples.</li>
          <li><strong>Semana 4</strong> — escale o que funciona. Documente processos. Compartilhe com a equipe. Meça ganhos.</li>
        </ol>
        <p>Em 30 dias você sai do "ouvi falar" para "uso profissionalmente". Em 90 dias, IA será parte invisível do seu workflow.</p>

        <h2>Tendências e o Que Vem Pela Frente</h2>
        <p>O ritmo de evolução da IA continua acelerado. As tendências consolidadas para 2026/2027:</p>
        <ul>
          <li><strong>Agentes autônomos</strong> — IAs que executam tarefas multi-passo com mínima supervisão humana</li>
          <li><strong>Multimodalidade total</strong> — texto, imagem, áudio, vídeo e código no mesmo modelo</li>
          <li><strong>IAs especialistas</strong> — modelos verticais para medicina, direito, engenharia com performance superior à general purpose</li>
          <li><strong>Edge AI</strong> — processamento direto em smartphones e dispositivos IoT</li>
          <li><strong>Regulamentação</strong> — leis de IA entrando em vigor globalmente, requerendo compliance</li>
        </ul>

        <h2>Suporte e Consultoria em IA em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria em implementação de IA para empresas de Curitiba e região. Configuração de modelos locais (Ollama, LM Studio), integração com sistemas existentes, treinamento de equipes e desenvolvimento de soluções customizadas. Atendimento presencial em Curitiba, São José dos Pinhais, Pinhais, Colombo e demais cidades da região metropolitana.</p>

      </>
    ),
  },

  "como-configurar-firewall-ufw-linux": {
    title: "Como Configurar Firewall UFW no Linux: Guia Definitivo",
    excerpt: "Configuração de regras, portas, serviços e logs do UFW para proteger servidores e desktops Linux.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como configurar firewall ufw no linux de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-proteger-rede-wifi-empresa": {
    title: "Como Proteger a Rede Wi-Fi da Sua Empresa: Guia Técnico",
    excerpt: "WPA3, segregação de redes (VLAN), captive portal, RADIUS e monitoramento — segurança real para SMB.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como proteger a rede wi-fi da sua empresa de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-detectar-invasao-rede": {
    title: "Como Detectar Invasão na Rede: IDS/IPS, Logs e Análise de Tráfego",
    excerpt: "Ferramentas e procedimentos para identificar atividades suspeitas: Suricata, Wireshark, fail2ban e análise forense.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como detectar invasão na rede de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-configurar-2fa-em-tudo": {
    title: "Como Configurar 2FA (Autenticação de Dois Fatores) em Tudo",
    excerpt: "Guia prático para ativar 2FA em e-mail, redes sociais, bancos, servidores e aplicações empresariais.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como configurar 2fa (autenticação de dois fatores) em tudo de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "melhores-antivirus-2026-comparativo": {
    title: "Melhores Antivírus em 2026: Comparativo Real Para Casa e Empresa",
    excerpt: "Análise técnica de Bitdefender, Kaspersky, ESET, Windows Defender e mais — qual realmente protege.",
    date: "2026-04-20",
    readTime: "11 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como melhores antivírus em 2026 de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-configurar-vlan-rede-corporativa": {
    title: "Como Configurar VLAN em Rede Corporativa: Guia Profissional",
    excerpt: "Segmentação de rede com VLAN: configuração em switches gerenciáveis, trunking e roteamento entre VLANs.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como configurar vlan em rede corporativa de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-fazer-pentest-basico-rede": {
    title: "Como Fazer Pentest Básico na Sua Rede: Ferramentas e Procedimento",
    excerpt: "Introdução prática a nmap, Nessus, OpenVAS e Metasploit para testar a segurança da própria infraestrutura.",
    date: "2026-04-20",
    readTime: "13 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como fazer pentest básico na sua rede de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },

  "como-recuperar-conta-hackeada": {
    title: "Como Recuperar Conta Hackeada: Procedimento de Emergência",
    excerpt: "Passo a passo profissional para recuperar contas de Gmail, Instagram, WhatsApp e bancos comprometidas.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">Segurança digital deixou de ser problema só de grandes corporações. Em 2026, ataques cibernéticos atingem desde pessoas comuns até pequenas empresas em Curitiba todos os dias. Este guia técnico mostra como recuperar conta hackeada de forma profissional e eficaz.</p>

        <h2>Cenário de Ameaças em 2026</h2>
        <p>O custo médio de um incidente de segurança para pequenas empresas brasileiras passou de R$ 80 mil em 2025, segundo levantamentos do setor. Os ataques mais comuns que vemos no atendimento técnico em Curitiba:</p>
        <ul>
          <li><strong>Ransomware</strong> — criptografia dos arquivos e cobrança de resgate (R$ 5 mil a R$ 500 mil)</li>
          <li><strong>Phishing direcionado</strong> — e-mails personalizados que enganam até usuários experientes</li>
          <li><strong>Engenharia social</strong> — ligações se passando por banco, suporte técnico ou parceiro</li>
          <li><strong>Invasão por credenciais vazadas</strong> — senhas reutilizadas em sites comprometidos</li>
          <li><strong>Ataques a roteadores domésticos</strong> — captura de tráfego e redirecionamento DNS</li>
          <li><strong>Sequestro de WhatsApp Business</strong> — uso da conta para golpes contra clientes</li>
        </ul>

        <h2>Princípios Fundamentais de Segurança</h2>
        <p>Antes de ferramentas e configurações, internalize os princípios. Eles guiam toda decisão de segurança.</p>
        <ul>
          <li><strong>Defesa em profundidade</strong> — múltiplas camadas, nunca dependa de uma única proteção</li>
          <li><strong>Princípio do menor privilégio</strong> — cada usuário e processo só tem acesso ao mínimo necessário</li>
          <li><strong>Zero Trust</strong> — nunca confie automaticamente, verifique sempre, mesmo dentro da rede</li>
          <li><strong>Segregação de funções</strong> — quem aprova não é quem executa, quem audita não é quem opera</li>
          <li><strong>Backup imune</strong> — pelo menos uma cópia offline ou imutável, fora do alcance de ransomware</li>
          <li><strong>Atualização contínua</strong> — vulnerabilidades conhecidas são as mais exploradas</li>
        </ul>

        <h2>Avaliação de Riscos Inicial</h2>
        <p>Não é possível proteger o que você não conhece. O primeiro passo é mapear sua infraestrutura.</p>
        <p>Faça um inventário completo:</p>
        <ul>
          <li>Quais dispositivos estão conectados à rede (computadores, celulares, IoT, impressoras)</li>
          <li>Quais sistemas e aplicativos são usados (sistemas internos, SaaS, e-mail)</li>
          <li>Quais dados são tratados (cadastros, financeiro, saúde, propriedade intelectual)</li>
          <li>Quem tem acesso a quê (usuários, fornecedores, parceiros)</li>
          <li>Onde estão os backups e qual a frequência</li>
          <li>Quais ferramentas de segurança já estão em uso</li>
        </ul>
        <p>Esse mapeamento revela vulnerabilidades óbvias que muitas vezes passam despercebidas — como aquela impressora que ninguém mais usa mas continua acessível pela rede.</p>

        <h2>Configuração Técnica Recomendada</h2>
        <p>Com o mapeamento em mãos, parta para a configuração técnica. As recomendações abaixo são baseline mínimo para qualquer ambiente profissional.</p>
        <ul>
          <li><strong>Firewall configurado</strong> — bloqueia portas não usadas, limita acesso externo a serviços essenciais</li>
          <li><strong>Antivírus em todos os endpoints</strong> — Bitdefender, ESET ou Kaspersky em versão corporativa</li>
          <li><strong>Patch management</strong> — atualizações de SO e aplicativos aplicadas em até 30 dias da liberação</li>
          <li><strong>EDR (Endpoint Detection and Response)</strong> — para detectar ataques que escapam do antivírus tradicional</li>
          <li><strong>VPN para acesso remoto</strong> — nada de RDP exposto direto na internet</li>
          <li><strong>2FA em todos os serviços críticos</strong> — e-mail, ERP, painel administrativo, redes sociais corporativas</li>
          <li><strong>Logs centralizados</strong> — pelo menos 90 dias de retenção para investigação de incidentes</li>
        </ul>

        <h2>Procedimento Detalhado de Implementação</h2>
        <p>Vamos ao passo a passo prático. Adapte ao seu ambiente, mas siga a ordem — pular etapas deixa brechas.</p>
        <ol>
          <li><strong>Inventário e classificação</strong> — saiba o que precisa proteger e qual a criticidade de cada ativo</li>
          <li><strong>Hardening de senhas</strong> — gerenciador de senhas (Bitwarden, 1Password) para todos os usuários</li>
          <li><strong>2FA universal</strong> — comece pelo e-mail (porta de entrada para tudo), depois bancos, redes sociais e sistemas internos</li>
          <li><strong>Firewall e segmentação</strong> — separe rede de visitantes, IoT e produção</li>
          <li><strong>Backup 3-2-1</strong> — 3 cópias, 2 mídias diferentes, 1 offsite</li>
          <li><strong>Atualizações automáticas</strong> — configure janela de manutenção e aplique patches</li>
          <li><strong>Treinamento de usuários</strong> — phishing é o vetor #1, e usuário treinado é a melhor defesa</li>
          <li><strong>Monitoramento contínuo</strong> — logs revisados periodicamente, alertas configurados para anomalias</li>
          <li><strong>Plano de resposta a incidentes</strong> — quem chamar, o que fazer, como comunicar quando algo der errado</li>
          <li><strong>Auditoria periódica</strong> — pentest anual e revisão de configurações trimestral</li>
        </ol>

        <h2>Ferramentas Recomendadas</h2>
        <p>Mercado de segurança tem centenas de ferramentas. Para o cenário típico de SMB em Curitiba, essa stack cobre o essencial:</p>
        <ul>
          <li><strong>Bitdefender GravityZone</strong> ou <strong>ESET Protect</strong> — antivírus + EDR centralizado</li>
          <li><strong>pfSense</strong> ou <strong>OPNsense</strong> — firewall corporativo open source</li>
          <li><strong>Bitwarden Business</strong> — gerenciador de senhas com SSO e auditoria</li>
          <li><strong>Veeam Backup</strong> ou <strong>Acronis</strong> — backup empresarial com replicação</li>
          <li><strong>Wazuh</strong> — SIEM open source para correlação de logs</li>
          <li><strong>Cloudflare</strong> — proteção DDoS e WAF para sites e aplicações</li>
          <li><strong>YubiKey</strong> ou <strong>Authy</strong> — 2FA físico e em apps</li>
        </ul>

        <h2>Erros Comuns Que Geram Vulnerabilidade</h2>
        <p>Os ataques bem-sucedidos quase sempre exploram falhas conhecidas e evitáveis.</p>
        <ul>
          <li><strong>Senha "12345678"</strong> ou similar em conta administrativa</li>
          <li><strong>Reutilizar senha</strong> entre serviços pessoais e corporativos</li>
          <li><strong>Adiar atualizações</strong> de SO e aplicativos por meses ou anos</li>
          <li><strong>Antivírus expirado</strong> sem que o usuário perceba</li>
          <li><strong>Backup que nunca é testado</strong> — descobrir que não funciona depois do incidente</li>
          <li><strong>Compartilhar credenciais</strong> entre funcionários por WhatsApp</li>
          <li><strong>Acesso remoto direto via RDP</strong> sem VPN</li>
          <li><strong>Wi-Fi corporativo</strong> com senha conhecida por todos os funcionários, terceiros e clientes</li>
        </ul>

        <h2>Resposta a Incidentes</h2>
        <p>Cedo ou tarde, algo vai dar errado. Ter um plano definido é diferença entre incidente controlado e desastre.</p>
        <ol>
          <li><strong>Detecção</strong> — usuário relata, alerta de monitoramento dispara, antivírus bloqueia</li>
          <li><strong>Contenção</strong> — desconectar máquinas afetadas da rede imediatamente</li>
          <li><strong>Erradicação</strong> — remover malware, fechar vetor de entrada, trocar credenciais comprometidas</li>
          <li><strong>Recuperação</strong> — restaurar de backup limpo, validar integridade antes de voltar à produção</li>
          <li><strong>Lições aprendidas</strong> — documentar o que aconteceu, ajustar processos para evitar recorrência</li>
        </ol>
        <p><strong>Nunca pague resgate de ransomware sem consultar especialista.</strong> Pagar não garante recuperação dos dados e marca sua empresa como alvo fácil para futuras extorsões.</p>

        <h2>Conformidade e LGPD</h2>
        <p>Empresas que tratam dados pessoais têm obrigações legais. A LGPD não é opcional, e multas chegam a 2% do faturamento limitado a R$ 50 milhões por infração.</p>
        <ul>
          <li><strong>Mapeamento de dados pessoais</strong> coletados e tratados</li>
          <li><strong>Base legal documentada</strong> para cada tratamento</li>
          <li><strong>Política de privacidade</strong> clara e acessível</li>
          <li><strong>Encarregado de proteção de dados</strong> (DPO) designado</li>
          <li><strong>Plano de resposta a incidentes</strong> que inclua notificação à ANPD em até 48h</li>
          <li><strong>Direitos dos titulares</strong> implementados (acesso, correção, exclusão)</li>
        </ul>

        <h2>Suporte em Segurança em Curitiba</h2>
        <p>A <strong>{BRAND_NAME}</strong> oferece consultoria e implementação de segurança digital para empresas em Curitiba e região metropolitana. Auditoria, hardening, configuração de firewall, implementação de backup, treinamento de usuários e resposta a incidentes. Atendemos Curitiba, São José dos Pinhais, Pinhais, Colombo, Almirante Tamandaré, Araucária, Campo Largo, Campo Magro, Piraquara, Quatro Barras e Fazenda Rio Grande com técnicos certificados em segurança ofensiva e defensiva.</p>

      </>
    ),
  },
  "como-deixar-windows-11-mais-rapido-iniciantes": {
    title: "Como Deixar o Windows 11 Mais Rápido em 2026: Guia Passo a Passo (Curitiba)",
    excerpt: "PC lento em Curitiba? Aprenda como acelerar o Windows 11 com 5 passos simples — sem instalar nada e sem risco de quebrar o computador.",
    date: "2026-04-29",
    readTime: "8 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Se o seu Windows 11 está lento, travando ou demorando para abrir programas, calma — na maioria das vezes a solução é simples e você mesmo consegue fazer. Este guia foi feito para quem não é técnico: tudo explicado passo a passo, com palavras do dia a dia.</p>

        <h2>1. Reinicie o Computador (Sim, de Verdade)</h2>
        <p>O Windows 11 acumula 'lixo' na memória conforme você usa. Suspender ou fechar a tampa do notebook NÃO é a mesma coisa que reiniciar.</p>
        <p>Clique no botão Iniciar (ícone do Windows na barra) → Ligar/Desligar → <strong>Reiniciar</strong>. Espere ele voltar e teste.</p>

        <h2>2. Desligue Programas Que Abrem Sozinhos</h2>
        <p>Muitos programas se instalam para abrir junto com o Windows e isso deixa tudo lento.</p>
        <ol>
          <li>Aperte as teclas <strong>Ctrl + Shift + Esc</strong> ao mesmo tempo (abre o Gerenciador de Tarefas)</li>
          <li>Clique na aba <strong>Aplicativos de inicialização</strong></li>
          <li>Veja os que estão como 'Habilitado'</li>
          <li>Clique com o botão direito nos que você não usa (Spotify, Steam, Skype, OneDrive se não usar) e escolha <strong>Desabilitar</strong></li>
        </ol>

        <h2>3. Libere Espaço no Disco</h2>
        <p>Quando o disco fica cheio, o Windows trava. O ideal é ter pelo menos 20% livre.</p>
        <ol>
          <li>No campo de busca, digite <strong>Limpeza de Disco</strong> e abra</li>
          <li>Selecione o disco C: e clique OK</li>
          <li>Marque tudo que aparece (arquivos temporários, lixeira, miniaturas) e clique OK</li>
          <li>Confirme e espere terminar</li>
        </ol>

        <h2>4. Atualize o Windows</h2>
        <p>Atualizações corrigem problemas de desempenho. Vá em <strong>Configurações → Windows Update → Verificar atualizações</strong> e instale o que aparecer. Reinicie depois.</p>

        <h2>5. Quando Chamar um Técnico</h2>
        <p>Se mesmo depois disso seu PC continuar lento, pode ser disco antigo (HD em vez de SSD), pouca memória RAM ou vírus. Nesses casos, a <strong>O Técnico de Informática</strong> faz diagnóstico em casa em Curitiba e região metropolitana — chame pelo WhatsApp.</p>

      </>
    ),
  },
  "como-fazer-backup-fotos-windows-iniciantes": {
    title: "Como Fazer Backup de Fotos no Windows 11: 3 Métodos Seguros (Guia 2026)",
    excerpt: "Aprenda como fazer backup das suas fotos no Windows usando pendrive, OneDrive ou Google Fotos. Atendimento técnico em Curitiba se precisar de ajuda.",
    date: "2026-04-29",
    readTime: "7 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Perder fotos da família é um dos maiores arrependimentos que ouvimos de clientes. A boa notícia: fazer backup é mais fácil do que você imagina. Veja três formas, da mais simples para a mais segura.</p>

        <h2>Forma 1: Pendrive ou HD Externo (Mais Fácil)</h2>
        <ol>
          <li>Conecte o pendrive ou HD externo na entrada USB</li>
          <li>Espere aparecer a notificação 'Dispositivo pronto'</li>
          <li>Abra o <strong>Explorador de Arquivos</strong> (ícone de pasta amarela)</li>
          <li>Vá em <strong>Imagens</strong> no lado esquerdo</li>
          <li>Selecione tudo (Ctrl + A) e arraste para o pendrive na lateral</li>
          <li>Espere a cópia terminar antes de remover</li>
        </ol>

        <h2>Forma 2: Google Fotos (Salva Sozinho na Internet)</h2>
        <p>Vantagem: backup automático e você acessa de qualquer lugar.</p>
        <ol>
          <li>Acesse <strong>photos.google.com</strong> no navegador</li>
          <li>Faça login com sua conta do Google (mesma do Gmail)</li>
          <li>Clique em <strong>Carregar → Computador</strong></li>
          <li>Selecione a pasta de fotos e espere subir</li>
        </ol>

        <h2>Forma 3: OneDrive (Já Vem no Windows)</h2>
        <p>O Windows 11 já tem OneDrive instalado. Configure assim:</p>
        <ol>
          <li>Clique no ícone de nuvem azul na barra de baixo (perto do relógio)</li>
          <li>Faça login com seu e-mail Microsoft</li>
          <li>Marque a opção <strong>Fotos</strong> para sincronizar</li>
          <li>Pronto — toda foto nova vai para a nuvem automaticamente</li>
        </ol>

        <h2>Dica de Ouro: Faça Dois Backups</h2>
        <p>Especialistas recomendam a regra <strong>3-2-1</strong>: três cópias, em dois lugares diferentes, sendo uma fora de casa (nuvem). Assim, mesmo que tudo dê errado, suas fotos estão seguras.</p>

        <h2>Ajuda Profissional</h2>
        <p>Não conseguiu? A O Técnico de Informática faz backup completo em sua casa, configura nuvem e ainda recupera fotos de HDs com defeito. Atendemos Curitiba, São José dos Pinhais e região via WhatsApp.</p>

      </>
    ),
  },
  "como-instalar-impressora-windows-passo-a-passo": {
    title: "Instalar impressora no Windows: por que ela some da rede e como deixar a instalação estável",
    excerpt:
      "O que muda entre instalar por cabo e instalar em rede, por que a impressora desaparece depois de reiniciar o roteador e como fixar o endereço para a instalação parar de se perder.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Redes",
    content: (
      <>
        <p className="lead">Instalar impressora quase nunca é o problema. O problema aparece depois: o aparelho imprime hoje, some da lista amanhã e volta a funcionar sozinho na semana seguinte. Esse comportamento tem causa técnica conhecida — e ela não está no computador, está em como a impressora recebe endereço na rede.</p>

        <h2>Duas instalações diferentes com o mesmo nome</h2>
        <p>Existe uma diferença de fundo entre os dois modos de instalação, e ela explica quase todos os atendimentos desse tipo:</p>
        <ul>
          <li><strong>Por cabo USB</strong>, o computador enxerga um dispositivo fixo. Enquanto o cabo estiver conectado, o endereço não muda e a fila de impressão não se perde. A limitação é óbvia: imprime só quem está naquele computador.</li>
          <li><strong>Em rede (Wi-Fi ou cabo de rede)</strong>, o computador não fala com um dispositivo — fala com um endereço. Se o endereço mudar, a instalação continua existindo, mas aponta para um lugar onde não há mais ninguém. É por isso que o Windows mostra a impressora como "offline" mesmo com o aparelho ligado e imprimindo página de teste pelo próprio painel.</li>
        </ul>

        <h2>Por que o endereço muda sozinho</h2>
        <p>O roteador distribui endereços por empréstimo temporário. Quando o prazo vence, quando a rede reinicia ou quando entram novos aparelhos, o roteador pode entregar à impressora um número diferente do anterior. O computador continua procurando o número antigo. Nada quebrou: a referência é que ficou velha.</p>
        <p>Essa é a razão de o sintoma sempre voltar depois de queda de energia, troca de roteador, mudança de senha do Wi-Fi ou troca de plano de internet. Reinstalar a impressora resolve por alguns dias porque a instalação nova pega o endereço atual — até ele mudar de novo.</p>

        <h2>A instalação que fica de pé</h2>
        <p>A ordem que evita retrabalho é esta:</p>
        <ol>
          <li><strong>Deixar a impressora na rede antes de mexer no computador.</strong> Conectar o aparelho ao Wi-Fi pelo painel dele, ou ligar o cabo de rede, e imprimir a página de configuração do próprio equipamento. Essa página mostra o endereço que ele recebeu.</li>
          <li><strong>Reservar esse endereço no roteador.</strong> É o passo que quase ninguém faz e que resolve o problema de raiz: o roteador passa a entregar sempre o mesmo número para aquele aparelho. Alguns modelos de impressora também permitem fixar o endereço no próprio painel — nesse caso, o número escolhido precisa estar fora da faixa que o roteador distribui, ou dois aparelhos vão brigar pelo mesmo endereço.</li>
          <li><strong>Instalar o driver oficial do fabricante</strong>, baixado do site do fabricante do equipamento. O driver genérico que o Windows instala sozinho costuma imprimir, mas frequentemente não expõe digitalização, frente e verso, bandeja alternativa e nível de suprimento.</li>
          <li><strong>Adicionar a impressora pelo endereço</strong>, não pela descoberta automática. Descoberta automática é conveniente e frágil; endereço reservado é estável.</li>
          <li><strong>Testar de cada computador que vai usar</strong>, e não apenas daquele onde a instalação foi feita.</li>
        </ol>

        <h2>Quando a impressora não aparece de jeito nenhum</h2>
        <p>Antes de reinstalar pela terceira vez, vale verificar quatro coisas que respondem pela maioria dos casos:</p>
        <ul>
          <li><strong>Redes diferentes.</strong> Roteadores modernos criam faixas de 2,4 GHz e 5 GHz e, em muitos casos, uma rede de visitantes isolada. Impressora numa rede e computador em outra não se enxergam — principalmente quando o aparelho caiu na rede de visitantes, que é isolada por projeto.</li>
          <li><strong>Impressora só em 2,4 GHz.</strong> Boa parte dos modelos domésticos não opera em 5 GHz. Se as duas faixas têm o mesmo nome, o aparelho pode simplesmente não encontrar a rede.</li>
          <li><strong>Isolamento de clientes ativo no roteador.</strong> Recurso comum em redes de operadora: os aparelhos acessam a internet, mas não conversam entre si. Nesse cenário nenhuma impressora de rede vai funcionar até o recurso ser desativado.</li>
          <li><strong>Fila travada.</strong> Um documento com erro parado na fila bloqueia tudo o que vem depois, mesmo com a impressora perfeitamente conectada. Limpar a fila e reiniciar o serviço de impressão devolve o funcionamento sem reinstalar nada.</li>
        </ul>
        <p>O desenho dessa parte — faixas, reserva de endereço, separação da rede de visitantes — é o mesmo trabalho descrito em <Link to="/servicos/redes-e-wifi">redes e Wi-Fi</Link>.</p>

        <h2>Escritório: compartilhamento pelo computador é o erro mais comum</h2>
        <p>Em escritório pequeno ainda é frequente encontrar a impressora instalada em um computador e compartilhada a partir dele. O arranjo funciona até o dia em que aquele computador é desligado, entra em suspensão ou recebe atualização — e o escritório inteiro para de imprimir.</p>
        <p>Se o aparelho tem rede, cada estação deve falar direto com ele pelo endereço reservado. O computador deixa de ser ponto único de falha, e a manutenção de uma máquina para de derrubar a impressão de todo mundo. Esse ajuste costuma entrar junto do restante da organização descrita em <Link to="/servicos/suporte-tecnico-empresarial">suporte técnico empresarial</Link>.</p>

        <h2>Imprimir do celular</h2>
        <p>Celular e impressora precisam estar na mesma rede — e, de novo, a rede de visitantes atrapalha. Android usa o serviço de impressão padrão do sistema; iPhone descobre automaticamente aparelhos compatíveis com o protocolo de impressão sem driver. Quando o modelo não é compatível, o caminho é o aplicativo do próprio fabricante. Nenhum dos dois casos exige instalar programa no computador.</p>

        <h2>Onde este atendimento começa e termina</h2>
        <p>O que tratamos aqui é configuração, comunicação e compartilhamento em rede: driver oficial, endereço fixo, compartilhamento entre estações, fila travada, descoberta na rede, digitalização em rede quando o modelo suporta e reconexão depois da troca de roteador.</p>
        <p>Reparo mecânico ou eletrônico do aparelho — cabeçote, fusor, tracionamento de papel, placa — está fora do escopo, assim como fornecimento de toner e tinta. Se a avaliação apontar falha física, informamos e orientamos a assistência do fabricante em vez de empurrar um serviço que não resolveria. O critério de verificação e cobrança está descrito em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Impressora em rede não some por defeito: some porque o endereço dela mudou. Conecte o aparelho à rede primeiro, imprima a página de configuração, reserve o endereço no roteador, instale o driver oficial e adicione a impressora pelo endereço em cada computador. Se mesmo assim ela não aparece, verifique faixas de Wi-Fi diferentes, rede de visitantes, isolamento de clientes e fila travada — nessa ordem.</p>
      </>
    ),
  },

  "como-remover-virus-windows-iniciantes": {
    title: "Remover vírus e adware do Windows: o que funciona, o que só disfarça",
    excerpt:
      "Como reconhecer infecção de verdade, limpar sem quebrar o sistema, entender por que o problema volta e saber a hora em que remoção deixa de ser a resposta certa.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Procedimentos Técnicos",
    content: (
      <>
        <p className="lead">Grande parte do que as pessoas chamam de "vírus" hoje é adware e sequestro de navegador: programa instalado junto com outro, que ganha dinheiro exibindo anúncio e redirecionando busca. Isso muda o tratamento — e explica por que tantas limpezas caseiras não seguram o problema por uma semana.</p>

        <h2>Antes de tudo: é infecção mesmo?</h2>
        <p>Lentidão sozinha não prova infecção. O que aponta para software malicioso é mudança de comportamento sem que você tenha mudado nada:</p>
        <ul>
          <li>Anúncio aparecendo fora do navegador, inclusive na área de trabalho.</li>
          <li>Página inicial e buscador trocados, voltando sozinhos depois de corrigidos.</li>
          <li>Abas abrindo sem clique, com redirecionamento para páginas de promoção ou download.</li>
          <li>Antivírus, atualização do sistema ou gerenciador de tarefas bloqueados.</li>
          <li>Extensão de navegador que você não instalou e não consegue remover.</li>
          <li>Processo desconhecido consumindo processador de forma constante.</li>
        </ul>
        <p>Se nenhum desses aparece e a queixa é só desempenho, o diagnóstico provável é outro: veja <Link to="/blog/windows-11-lento-como-resolver">como descobrir a causa real da lentidão</Link> antes de sair varrendo o sistema.</p>

        <h2>Primeiro passo: conter, não limpar</h2>
        <p>Antes de rodar qualquer varredura vale reduzir dano. Se houver suspeita de roubo de credencial — senha que parou de funcionar, e-mail com atividade estranha, cobrança desconhecida — desconecte a máquina da rede e troque as senhas críticas usando outro aparelho, nunca o computador suspeito. Trocar senha de dentro da máquina infectada apenas entrega a senha nova.</p>
        <p>Se a tela exibe cobrança para "liberar arquivos", pare aqui. Isso é ransomware, e a resposta é diferente: desligar, não pagar e tratar o caso como incidente. O procedimento está em <Link to="/blog/ransomware-como-proteger-empresa">ransomware: prevenção e resposta</Link>.</p>

        <h2>Limpeza em camadas — a ordem importa</h2>
        <ol>
          <li><strong>Programas instalados:</strong> revise a lista de aplicativos por data de instalação. Adware quase sempre aparece ali, com nome genérico, instalado no mesmo dia em que o problema começou.</li>
          <li><strong>Extensões do navegador:</strong> remova o que não reconhece e verifique também os atalhos do navegador — o sequestro costuma acrescentar um endereço ao final do atalho.</li>
          <li><strong>Inicialização e tarefas agendadas:</strong> é o que faz o problema voltar. Enquanto existir uma entrada reinstalando o componente, cada limpeza dura até o próximo reinício.</li>
          <li><strong>Varredura completa com a proteção nativa do Windows:</strong> atualizada, com o sistema ocioso, sem interromper no meio.</li>
          <li><strong>Segunda opinião antimalware:</strong> uma ferramenta específica de adware pega o que a proteção genérica classifica como "programa potencialmente indesejado" e ignora.</li>
        </ol>
        <p>Uma proteção residente por vez. Dois antivírus ativos simultaneamente não protegem em dobro: disputam o mesmo arquivo, derrubam desempenho e às vezes bloqueiam um ao outro.</p>

        <h2>Por que o problema volta</h2>
        <p>Reinfecção rápida quase sempre tem uma explicação simples:</p>
        <ul>
          <li>Ficou uma entrada de inicialização ou tarefa agendada reinstalando o componente.</li>
          <li>O perfil do navegador foi sincronizado com a conta e trouxe a extensão de volta.</li>
          <li>A origem continua ativa: instalador pirata, "ativador" de sistema, driver baixado de site agregador.</li>
          <li>Outro equipamento da mesma casa ou empresa segue infectado e reintroduz o arquivo pela rede ou por pendrive.</li>
        </ul>
        <p>Por isso a última etapa de qualquer limpeza séria é descobrir a porta de entrada. Sem isso, o serviço vira assinatura mensal de reinstalação.</p>

        <h2>O que não fazer</h2>
        <ul>
          <li>Instalar vários "otimizadores" e limpadores de registro: parte deles é o próprio adware.</li>
          <li>Apagar arquivos de sistema por indicação de vídeo aleatório.</li>
          <li>Desativar a proteção do Windows para instalar algo que o antivírus bloqueou.</li>
          <li>Confiar em varredura que "encontrou 3.000 problemas" e cobra para corrigir.</li>
          <li>Pagar resgate em caso de arquivos criptografados.</li>
        </ul>

        <h2>Quando remoção deixa de ser a resposta</h2>
        <p>Existe um ponto em que limpar sai mais caro e menos confiável do que reinstalar. Ele chega quando o sistema já não permite atualização, quando a proteção não inicia mais, quando há sinal de credencial comprometida ou quando o mesmo componente retorna após duas limpezas bem feitas. Nesses casos, a decisão técnica é backup verificado dos dados, reinstalação limpa e restauração seletiva — nunca restauração de imagem inteira do sistema infectado.</p>
        <p>Em ambiente de empresa, o corte é mais cedo: máquina com suspeita de credencial vazada é isolada da rede antes de qualquer tentativa de limpeza, para evitar propagação lateral. A política de resguardo está em <Link to="/servicos/backup-para-empresas">backup para empresas</Link>.</p>

        <h2>Depois da limpeza: fechar a porta</h2>
        <p>Concluída a remoção, o trabalho ainda não acabou. Atualize o sistema e o navegador, revise permissões e senhas salvas, reative a proteção nativa, confirme que a inicialização está limpa e verifique se o backup dos arquivos importantes está funcionando de verdade — restaurando um arquivo de teste, não apenas olhando a pasta.</p>

        <h2>Resumo prático</h2>
        <p>Confirme que é infecção, contenha o dano, limpe em camadas na ordem certa, elimine a origem e verifique o resultado. Se o componente volta ou o sistema perdeu funções básicas, reinstalar com backup verificado é mais rápido e mais seguro do que insistir. Em Curitiba, atendemos esses casos com diagnóstico antes de qualquer decisão — o critério está em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>.</p>
      </>
    ),
  },

  "como-organizar-arquivos-windows-iniciantes": {
    title: "Como Organizar Arquivos no Windows 11: Método Simples Para Achar Tudo Rápido",
    excerpt: "Aprenda como organizar pastas, documentos e fotos no Windows 11 com um método prático que nunca mais vai te deixar perder arquivos.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Área de trabalho cheia de arquivos? Documentos espalhados? Aprenda a organizar de um jeito simples que vai durar para sempre.</p>

        <h2>Use as Pastas Que o Windows Já Criou</h2>
        <p>O Windows tem pastas prontas para você: <strong>Documentos, Imagens, Vídeos, Downloads</strong>. Aproveite-as em vez de jogar tudo na Área de Trabalho.</p>

        <h2>Crie Subpastas Por Assunto</h2>
        <ol>
          <li>Abra <strong>Documentos</strong></li>
          <li>Clique com o botão direito numa área vazia → <strong>Novo → Pasta</strong></li>
          <li>Dê um nome claro: 'Trabalho', 'Família', 'Banco', 'Receitas'</li>
          <li>Dentro de 'Trabalho' crie outras: 'Contratos 2026', 'Notas fiscais'</li>
          <li>Arraste seus arquivos soltos para dentro das pastas certas</li>
        </ol>

        <h2>Renomeie Arquivos com Datas</h2>
        <p>Em vez de 'Documento1.pdf' use <strong>'2026-04-Conta-Luz.pdf'</strong>. O ano-mês na frente faz tudo ficar em ordem cronológica automaticamente.</p>

        <h2>Use a Busca do Windows</h2>
        <p>Aperte a tecla <strong>Windows</strong> e comece a digitar o nome do arquivo. Ele aparece em segundos. Por isso bons nomes ajudam tanto.</p>

        <h2>Limpe a Área de Trabalho</h2>
        <p>A Área de Trabalho deveria ter no máximo 10 ícones. Mova tudo para Documentos. PC mais limpo = PC mais rápido.</p>

        <h2>Faça Backup Depois de Organizar</h2>
        <p>Agora que está organizado, faça backup (veja nosso guia de backup de fotos). Se precisar de ajuda, a O Técnico de Informática organiza seus arquivos e configura backup automático em casa.</p>

      </>
    ),
  },
  "como-atualizar-windows-corretamente": {
    title: "Como Atualizar o Windows 11 Sem Travar: Guia Seguro 2026",
    excerpt: "Atualização do Windows travando ou dando erro? Aprenda como atualizar o Windows 11 corretamente. Suporte técnico em Curitiba se precisar.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Atualizar o Windows é importante para segurança, mas no momento errado vira pesadelo. Veja como fazer com tranquilidade.</p>

        <h2>Quando Atualizar</h2>
        <ul>
          <li>Quando você tem 1-2 horas livres</li>
          <li>Com o notebook na tomada</li>
          <li>Internet boa e estável</li>
          <li>Sem trabalho urgente para entregar</li>
        </ul>

        <h2>Passo a Passo</h2>
        <ol>
          <li>Salve e feche todos os programas abertos</li>
          <li>Vá em <strong>Configurações → Windows Update</strong></li>
          <li>Clique em <strong>Verificar atualizações</strong></li>
          <li>Espere baixar (pode demorar)</li>
          <li>Quando aparecer 'Reiniciar agora', clique e <strong>NÃO desligue</strong> o PC enquanto estiver instalando</li>
        </ol>

        <h2>Se Travar</h2>
        <p>Espere pelo menos 2 horas antes de fazer qualquer coisa. Atualizações grandes parecem travadas mas estão trabalhando. Se passar disso, force desligar (segurar o botão por 10 segundos), ligue de novo e o Windows volta sozinho.</p>

        <h2>Programe o Horário</h2>
        <p>Em <strong>Windows Update → Opções avançadas → Horário ativo</strong> diga ao Windows quando você usa o PC. Ele só atualiza fora desse horário.</p>

        <h2>Atualização Não Funciona</h2>
        <p>Erros recorrentes (códigos como 0x80070002) podem indicar problema de disco ou arquivos corrompidos. A O Técnico de Informática resolve em domicílio em Curitiba sem perder seus dados.</p>

      </>
    ),
  },
  "como-recuperar-arquivos-apagados-windows": {
    title: "Como Recuperar Arquivos Apagados no Windows 11: 3 Métodos Que Funcionam",
    excerpt: "Apagou um arquivo importante? Aprenda como recuperar arquivos deletados no Windows com Recuva, lixeira e histórico. Recuperação profissional em Curitiba.",
    date: "2026-04-29",
    readTime: "7 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Apagar arquivo importante por engano acontece com todo mundo. Não entre em pânico — na maioria das vezes dá para recuperar.</p>

        <h2>Método 1: Lixeira (O Mais Óbvio)</h2>
        <ol>
          <li>Abra a <strong>Lixeira</strong> (ícone na Área de Trabalho)</li>
          <li>Procure seu arquivo (use a busca no canto superior se tiver muita coisa)</li>
          <li>Clique com botão direito → <strong>Restaurar</strong></li>
          <li>Ele volta para o lugar original</li>
        </ol>

        <h2>Método 2: Recuva (Quando Esvaziou a Lixeira)</h2>
        <p>O Recuva é um programa grátis que recupera arquivos mesmo depois de a Lixeira ser esvaziada — desde que você não tenha gravado muita coisa nova depois.</p>
        <ol>
          <li>Acesse <strong>ccleaner.com/recuva</strong> e baixe a versão grátis</li>
          <li>Instale e abra</li>
          <li>Escolha o tipo de arquivo (Imagens, Documentos, etc.) e clique <strong>Avançar</strong></li>
          <li>Selecione onde estava e clique <strong>Iniciar</strong></li>
          <li>Marque os arquivos com bolinha verde (chance alta de recuperar) e clique <strong>Recuperar</strong></li>
          <li><strong>SALVE EM OUTRO DRIVE</strong> (pendrive ou HD externo) — não no mesmo lugar</li>
        </ol>

        <h2>Método 3: Histórico de Arquivos</h2>
        <p>Se você ativou o backup automático antes (em Configurações → Atualização e Segurança → Backup), pode restaurar versões anteriores.</p>
        <ol>
          <li>Clique com botão direito na pasta onde estava o arquivo</li>
          <li>Escolha <strong>Restaurar versões anteriores</strong></li>
          <li>Selecione a data e restaure</li>
        </ol>

        <h2>Regra de Ouro</h2>
        <p>Quanto MENOS você usar o computador depois de apagar, MAIOR a chance de recuperar. Não instale programas, não baixe arquivos grandes, não desfragmente.</p>

        <h2>Casos Difíceis</h2>
        <p>HD com defeito, formatação acidental, arquivos muito antigos? A O Técnico de Informática tem ferramentas profissionais de recuperação. Atendemos Curitiba e região — quanto mais rápido, melhor a chance.</p>

      </>
    ),
  },
  "como-trocar-papel-de-parede-tela-bloqueio-windows": {
    title: "Como Trocar Papel de Parede e Tela de Bloqueio no Windows 11 (2026)",
    excerpt: "Personalize seu Windows 11 com fotos suas. Veja como trocar o papel de parede e a tela de bloqueio em 3 cliques.",
    date: "2026-04-29",
    readTime: "4 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Personalizar o computador deixa o uso mais agradável. Veja como trocar o fundo de tela e a imagem que aparece quando o PC está bloqueado.</p>

        <h2>Trocar Papel de Parede</h2>
        <ol>
          <li>Clique com botão direito numa área vazia da Área de Trabalho</li>
          <li>Escolha <strong>Personalizar</strong></li>
          <li>Clique em <strong>Plano de fundo</strong></li>
          <li>Em <strong>Personalizar seu plano de fundo</strong> escolha <strong>Imagem</strong></li>
          <li>Clique <strong>Procurar fotos</strong> e selecione a imagem que quiser</li>
        </ol>

        <h2>Apresentação de Slides (Várias Fotos)</h2>
        <p>Quer várias fotos rodando? Em vez de 'Imagem' escolha <strong>Apresentação de Slides</strong>, selecione uma pasta com suas fotos e defina de quantos em quantos minutos trocar.</p>

        <h2>Trocar Tela de Bloqueio</h2>
        <ol>
          <li>Em <strong>Personalização</strong>, clique <strong>Tela de bloqueio</strong></li>
          <li>Em 'Personalizar sua tela de bloqueio' escolha <strong>Imagem</strong></li>
          <li>Clique <strong>Procurar fotos</strong> e escolha</li>
        </ol>

        <h2>Use Fotos Suas em Alta Qualidade</h2>
        <p>Para boa aparência, use fotos com pelo menos <strong>1920x1080</strong>. Fotos do celular hoje são bem maiores que isso, então funcionam ótimo.</p>

      </>
    ),
  },
  "como-criar-conta-usuario-windows-criancas": {
    title: "Como Criar Conta de Usuário Para Crianças no Windows 11 (Controle Parental)",
    excerpt: "Aprenda como criar uma conta infantil no Windows 11 com controle parental, limite de tempo e bloqueio de sites. Configuração ajudada em Curitiba.",
    date: "2026-04-29",
    readTime: "7 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Criar uma conta separada para crianças protege seus arquivos, controla o tempo de uso e bloqueia conteúdos inadequados. Veja como configurar.</p>

        <h2>Por Que Criar Conta Separada</h2>
        <ul>
          <li>Suas senhas e e-mail ficam protegidos</li>
          <li>Histórico do navegador da criança fica separado</li>
          <li>Você controla horário de uso</li>
          <li>Bloqueia downloads e instalações</li>
          <li>Recebe relatório semanal do que foi acessado</li>
        </ul>

        <h2>Passo 1: Criar a Conta</h2>
        <ol>
          <li>Vá em <strong>Configurações → Contas → Família</strong></li>
          <li>Clique em <strong>Adicionar alguém</strong></li>
          <li>Escolha <strong>Criar uma para uma criança</strong></li>
          <li>Digite um e-mail novo (Outlook cria de graça) e siga os passos</li>
          <li>Defina senha fácil para a criança lembrar</li>
        </ol>

        <h2>Passo 2: Definir Limites</h2>
        <p>Acesse <strong>family.microsoft.com</strong> com sua conta. Lá você pode:</p>
        <ul>
          <li>Definir horário máximo de uso por dia da semana</li>
          <li>Bloquear sites adultos</li>
          <li>Aprovar ou bloquear cada app que ela tentar instalar</li>
          <li>Ver relatórios do que foi acessado</li>
          <li>Receber pedidos de compra antes de qualquer cobrança</li>
        </ul>

        <h2>Passo 3: Aplicativos Educativos</h2>
        <p>Algumas sugestões grátis para crianças: <strong>Khan Academy Kids</strong>, <strong>Microsoft Education</strong>, <strong>Scratch Junior</strong> (programação infantil).</p>

        <h2>Não Conseguiu Configurar?</h2>
        <p>Configurar Microsoft Family pode ser confuso. A O Técnico de Informática configura controle parental, antivírus e backup em casa em Curitiba — proteja toda a família via WhatsApp.</p>

      </>
    ),
  },
  "como-imprimir-pdf-windows": {
    title: "Como Salvar em PDF no Windows 11 Sem Programa: Guia Completo 2026",
    excerpt: "Aprenda como salvar qualquer página, e-mail ou documento em PDF no Windows 11 sem instalar nada. Funciona em qualquer impressora virtual.",
    date: "2026-04-29",
    readTime: "5 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">PDF é o formato mais usado para enviar documentos por e-mail. O Windows 10 e 11 já fazem isso sem precisar instalar nada. Veja como.</p>

        <h2>O Truque: 'Imprimir' Para PDF</h2>
        <p>O Windows tem uma 'impressora virtual' chamada <strong>Microsoft Print to PDF</strong>. Em vez de imprimir no papel, ela cria um arquivo PDF.</p>

        <h2>Passo a Passo (Funciona em Qualquer Programa)</h2>
        <ol>
          <li>Abra o que você quer salvar (página de site, Word, e-mail)</li>
          <li>Aperte <strong>Ctrl + P</strong> (atalho universal de imprimir)</li>
          <li>Onde diz 'Impressora', selecione <strong>Microsoft Print to PDF</strong></li>
          <li>Clique em <strong>Imprimir</strong></li>
          <li>Escolha onde salvar e dê um nome</li>
          <li>Pronto — o PDF está salvo</li>
        </ol>

        <h2>Salvar Página de Site Inteira</h2>
        <p>No Chrome ou Edge: <strong>Ctrl + P</strong> → escolha 'Salvar como PDF' (ou Microsoft Print to PDF) → ajuste se quer só a página atual ou todas → Salvar.</p>

        <h2>Juntar Vários PDFs em Um</h2>
        <p>Para juntar vários PDFs, use o site grátis <strong>ilovepdf.com</strong> (não precisa instalar nada).</p>

        <h2>Editar PDF</h2>
        <p>Editar PDF (mudar texto, assinar) é mais avançado. Use o <strong>Adobe Acrobat Reader</strong> grátis para assinar e o <strong>ilovepdf.com</strong> para edições simples. Para casos complexos, a O Técnico de Informática ajuda em sua casa.</p>

      </>
    ),
  },
  "como-deixar-celular-android-mais-rapido": {
    title: "Como Deixar o Celular Android Mais Rápido em 2026: 8 Ajustes Que Funcionam",
    excerpt: "Celular Android travando ou lento? Aprenda como acelerar seu celular com 8 dicas práticas, sem instalar app limpador. Suporte em Curitiba.",
    date: "2026-04-29",
    readTime: "7 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Celular Android lento, fechando aplicativos sozinho ou descarregando rápido? Antes de pensar em comprar outro, faça essas limpezas.</p>

        <h2>1. Reinicie o Celular</h2>
        <p>Sim, parece bobo, mas a maioria das pessoas nunca reinicia. Segure o botão de ligar → escolha <strong>Reiniciar</strong>. Faça isso 1 vez por semana.</p>

        <h2>2. Apague Apps Que Você Não Usa</h2>
        <ol>
          <li>Vá em <strong>Configurações → Aplicativos</strong></li>
          <li>Veja a lista — quantos você usa de verdade?</li>
          <li>Toque nos que não usa há mais de 1 mês e clique <strong>Desinstalar</strong></li>
        </ol>

        <h2>3. Limpe Espaço</h2>
        <p>Celular cheio = celular lento. Vá em <strong>Configurações → Armazenamento</strong> e veja onde está o espaço. Geralmente: WhatsApp, fotos e vídeos. Apague o que não precisa, mande as fotos para Google Fotos.</p>

        <h2>4. Limpe o Cache do WhatsApp</h2>
        <ol>
          <li>Abra o <strong>WhatsApp</strong></li>
          <li>Toque nos 3 pontos → <strong>Configurações → Armazenamento e dados → Gerenciar armazenamento</strong></li>
          <li>Apague vídeos antigos e conversas pesadas</li>
        </ol>

        <h2>5. Atualize o Sistema</h2>
        <p><strong>Configurações → Sistema → Atualização do sistema</strong>. Se tiver atualização disponível, instale (com o celular na tomada e Wi-Fi).</p>

        <h2>6. Atualize os Apps</h2>
        <p>Abra a <strong>Play Store</strong> → toque na sua foto → <strong>Gerenciar apps e dispositivo</strong> → <strong>Atualizar tudo</strong>.</p>

        <h2>7. Desligue Animações</h2>
        <p>Em <strong>Configurações → Acessibilidade</strong> ou <strong>Sobre o telefone → Opções do desenvolvedor</strong>, reduza animações. Celular fica mais ágil.</p>

        <h2>8. Última Opção: Restaurar de Fábrica</h2>
        <p>Faça backup primeiro! Depois <strong>Configurações → Sistema → Opções de redefinição → Apagar todos os dados</strong>. Volta como novo.</p>

        <h2>Não Resolveu?</h2>
        <p>Pode ser bateria velha ou problema mais sério. A O Técnico de Informática avalia celulares em Curitiba e indica o que vale a pena consertar — chame pelo WhatsApp.</p>

      </>
    ),
  },
  "como-economizar-bateria-celular": {
    title: "Como Economizar Bateria do Celular: 12 Ajustes Reais (Android e iPhone 2026)",
    excerpt: "Bateria do celular acabando rápido? Aprenda como economizar bateria com 12 ajustes que dobram a autonomia — Android e iPhone.",
    date: "2026-04-29",
    readTime: "8 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Apps que prometem 'economizar bateria' geralmente atrapalham mais que ajudam. O que realmente funciona são ajustes simples no próprio sistema. Veja os 12 mais eficazes.</p>

        <h2>1. Reduza o Brilho da Tela</h2>
        <p>A tela é o que mais consome bateria. Deixe o brilho automático ligado ou em uns 40-50%.</p>

        <h2>2. Tela Escura (Modo Escuro)</h2>
        <p>Em celulares com tela OLED (maioria dos topo de linha), o modo escuro economiza bateria de verdade. Vá em <strong>Configurações → Tela → Tema escuro</strong>.</p>

        <h2>3. Tempo de Tela Apagada</h2>
        <p>Configure para a tela apagar em 30 segundos. <strong>Configurações → Tela → Tempo de espera da tela</strong>.</p>

        <h2>4. Desligue Localização Quando Não Usar</h2>
        <p>Apps usando GPS sugam bateria. Em <strong>Configurações → Localização</strong> deixe ligado, mas em <strong>Permissões de apps</strong> coloque 'Permitir apenas durante o uso' para todos.</p>

        <h2>5. Wi-Fi Em Vez de Dados Móveis</h2>
        <p>Wi-Fi consome muito menos bateria que rede 4G/5G. Conecte sempre que possível.</p>

        <h2>6. Desligue 5G se Não Precisa</h2>
        <p>O 5G consome mais bateria. Em <strong>Configurações → Rede → Tipo de rede preferido</strong> escolha 4G/LTE no dia a dia.</p>

        <h2>7. Notificações Só do Necessário</h2>
        <p>Cada notificação acende a tela. Em <strong>Configurações → Notificações</strong> desative apps que não importam (jogos, lojas, cupons).</p>

        <h2>8. Apps em Segundo Plano</h2>
        <p>Em <strong>Configurações → Bateria → Uso da bateria</strong> veja o que mais gasta. Restrinja apps que ficam rodando sem você usar.</p>

        <h2>9. Modo Economia de Bateria</h2>
        <p>Quando estiver com 30% ou menos, ative <strong>Economia de Bateria</strong>. Pode dobrar a duração.</p>

        <h2>10. Não Deixe no Carro Quente</h2>
        <p>Calor estraga bateria. Nunca deixe celular ao sol direto ou no painel do carro.</p>

        <h2>11. Não Carregue 100% Toda Hora</h2>
        <p>Para cuidar da bateria a longo prazo, mantenha entre 20% e 80%. Carregar até 100% todo dia degrada mais rápido.</p>

        <h2>12. Carregador Original</h2>
        <p>Carregadores baratos podem danificar bateria. Use sempre o original ou marca conhecida.</p>

        <h2>Bateria Não Dura Nem Meio Dia?</h2>
        <p>Pode ser hora de trocar a bateria. A O Técnico de Informática faz troca de bateria de celular em Curitiba com peças de qualidade e garantia.</p>

      </>
    ),
  },
  "como-fazer-backup-celular-android": {
    title: "Como Fazer Backup do Celular Android Completo: Fotos, Contatos e WhatsApp (2026)",
    excerpt: "Aprenda como fazer backup do Android em 15 minutos: fotos, contatos, WhatsApp e configurações. Ajuda profissional em Curitiba se precisar.",
    date: "2026-04-29",
    readTime: "8 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Trocar de celular ou ter o aparelho roubado é estressante — sem backup, vira tragédia. Aprenda a salvar tudo de forma segura.</p>

        <h2>Fotos e Vídeos: Google Fotos (Grátis)</h2>
        <ol>
          <li>Baixe o app <strong>Google Fotos</strong> (já vem em quase todo Android)</li>
          <li>Faça login com sua conta Google</li>
          <li>Toque na sua foto no canto → <strong>Configurações do Fotos</strong></li>
          <li>Ative <strong>Backup</strong></li>
          <li>Escolha qualidade <strong>Original</strong> (cobra do seu plano) ou <strong>Economia de armazenamento</strong> (grátis e ilimitado em qualidade boa)</li>
        </ol>

        <h2>Contatos: Conta Google</h2>
        <p>Vá em <strong>Configurações → Contas → Google</strong>. Veja se <strong>Contatos</strong> está com sincronização ligada. Pronto — toda vez que adicionar contato, vai para a nuvem.</p>

        <h2>WhatsApp: Backup no Google Drive</h2>
        <ol>
          <li>Abra o <strong>WhatsApp</strong></li>
          <li>Toque nos 3 pontos → <strong>Configurações → Conversas → Backup de conversas</strong></li>
          <li>Toque em <strong>Conta do Google</strong> e selecione sua conta</li>
          <li>Em <strong>Frequência</strong> escolha <strong>Semanal</strong> ou <strong>Diário</strong></li>
          <li>Ative <strong>Incluir vídeos</strong> se tiver espaço</li>
        </ol>

        <h2>Apps e Configurações</h2>
        <p>Em <strong>Configurações → Sistema → Backup</strong> ative <strong>Fazer backup pelo Google One</strong>. Salva apps instalados, papéis de parede, senhas Wi-Fi e configurações.</p>

        <h2>Mensagens SMS</h2>
        <p>Use o app <strong>SMS Backup & Restore</strong> da Play Store. Salva tudo no Google Drive.</p>

        <h2>Como Restaurar no Celular Novo</h2>
        <p>Ao ligar o celular novo, escolha <strong>Copiar do dispositivo</strong> ou faça login com sua conta Google. Tudo volta automaticamente.</p>

        <h2>Para Quem Quer Total Segurança</h2>
        <p>A O Técnico de Informática faz backup completo do celular em casa, configura sincronização automática e ainda transfere tudo para celular novo. Atendemos Curitiba e região via WhatsApp.</p>

      </>
    ),
  },
  "como-conectar-celular-tv": {
    title: "Como Conectar o Celular na TV: 4 Formas Que Funcionam em 2026 (Com e Sem Cabo)",
    excerpt: "Aprenda como espelhar o celular na Smart TV usando Chromecast, HDMI, Miracast ou AirPlay. Funciona com Android e iPhone.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Quer mostrar fotos das férias na TV ou assistir vídeo grande? Tem várias formas. Veja qual serve para você.</p>

        <h2>Forma 1: Smart TV + Mesmo Wi-Fi (Sem Cabo)</h2>
        <p>Se sua TV é Smart e está no mesmo Wi-Fi do celular, é o jeito mais fácil.</p>
        <ol>
          <li>No app YouTube ou Netflix do celular, abra um vídeo</li>
          <li>Toque no ícone de transmissão (retângulo com ondinhas)</li>
          <li>Selecione sua TV na lista</li>
          <li>Pronto — toca direto na TV</li>
        </ol>

        <h2>Forma 2: Espelhar a Tela do Celular</h2>
        <ol>
          <li>No celular Android, puxe a barra de cima → <strong>Transmitir</strong> ou <strong>Smart View</strong></li>
          <li>Selecione sua TV</li>
          <li>Tudo que aparecer no celular aparece na TV</li>
        </ol>

        <h2>Forma 3: Chromecast (TV Antiga Vira Smart)</h2>
        <p>Se sua TV não é Smart, compre um <strong>Chromecast</strong> (R$ 250 aprox.) ou <strong>Fire Stick</strong>. Plug no HDMI da TV e siga as instruções no celular.</p>

        <h2>Forma 4: Cabo HDMI (Mais Confiável)</h2>
        <p>Para celulares Android: cabo <strong>USB-C para HDMI</strong>. Para iPhone: <strong>adaptador Lightning para HDMI</strong> da Apple. Plug no celular, plug na TV, escolha a entrada HDMI correta na TV.</p>

        <h2>Não Funciona?</h2>
        <p>Verifique se TV e celular estão no MESMO Wi-Fi. Reinicie os dois. Se não resolver, a O Técnico de Informática configura espelhamento, Smart TV, Chromecast e até instala TV box em casa em Curitiba.</p>

      </>
    ),
  },
  "como-bloquear-numero-celular": {
    title: "Como Bloquear Número de Telemarketing no Celular: Android e iPhone (2026)",
    excerpt: "Cansado de ligações de telemarketing e spam? Aprenda como bloquear números no celular um a um ou em lista. Funciona em qualquer aparelho.",
    date: "2026-04-29",
    readTime: "5 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Telemarketing constante, número desconhecido toda hora, golpes? Veja como bloquear no Android e iPhone.</p>

        <h2>Bloquear Número Específico (Android)</h2>
        <ol>
          <li>Abra o app <strong>Telefone</strong></li>
          <li>Vá em <strong>Recentes</strong> e ache o número</li>
          <li>Pressione e segure → <strong>Bloquear / Sinalizar como spam</strong></li>
          <li>Confirme</li>
        </ol>

        <h2>Bloquear no iPhone</h2>
        <ol>
          <li>Abra <strong>Telefone → Recentes</strong></li>
          <li>Toque no ícone (i) ao lado do número</li>
          <li>Role até o final → <strong>Bloquear contato</strong></li>
        </ol>

        <h2>Bloquear Telemarketing em Massa</h2>
        <p>Cadastre seu número grátis no <strong>Não Me Perturbe</strong> (naomeperturbe.com.br). Operadoras param de fazer ofertas em até 30 dias. Para outras empresas, instale o app <strong>Truecaller</strong> que identifica e bloqueia spam automaticamente.</p>

        <h2>Bloquear no WhatsApp</h2>
        <ol>
          <li>Abra a conversa do número</li>
          <li>Toque no nome no topo</li>
          <li>Role até o final → <strong>Bloquear</strong></li>
        </ol>

        <h2>Cuidado com Golpes</h2>
        <p>Nunca clique em links de números desconhecidos. Banco e Receita Federal NÃO ligam pedindo senha. Em dúvida, chame a O Técnico de Informática antes de fazer qualquer coisa — atendemos via WhatsApp.</p>

      </>
    ),
  },
  "como-usar-google-fotos-iniciantes": {
    title: "Como Usar o Google Fotos em 2026: Guia Completo Para Iniciantes",
    excerpt: "Aprenda como usar o Google Fotos para fazer backup automático, organizar e editar fotos do celular. Tutorial passo a passo para qualquer idade.",
    date: "2026-04-29",
    readTime: "8 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Google Fotos é o aplicativo mais útil para quem tem muitas fotos. Faz backup automático, organiza por pessoa e lugar, e ainda edita. Veja como aproveitar tudo.</p>

        <h2>Instalar e Configurar</h2>
        <ol>
          <li>Baixe <strong>Google Fotos</strong> da Play Store (Android) ou App Store (iPhone)</li>
          <li>Abra e faça login com sua conta Google</li>
          <li>Aceite ativar <strong>Backup</strong></li>
          <li>Escolha <strong>Economia de armazenamento</strong> (grátis e ilimitado, qualidade ótima)</li>
        </ol>

        <h2>Como Funciona o Backup</h2>
        <p>Toda foto que você tira fica salva na nuvem automaticamente. Mesmo que perca o celular, suas fotos estão seguras. Acessa de qualquer dispositivo em <strong>photos.google.com</strong>.</p>

        <h2>Buscar Fotos Por Pessoa</h2>
        <p>O Google reconhece rostos. Toque na barra de busca → role até <strong>Pessoas</strong>. Toque numa pessoa para ver todas as fotos dela. Pode dar nomes para ficar mais fácil.</p>

        <h2>Buscar Por Lugar ou Coisa</h2>
        <p>Pode buscar por <strong>'Praia'</strong>, <strong>'Cachorro'</strong>, <strong>'Aniversário'</strong>, <strong>'Curitiba'</strong> e ele acha. Funciona impressionantemente bem.</p>

        <h2>Editar Fotos</h2>
        <ol>
          <li>Abra a foto</li>
          <li>Toque no ícone de edição (3 linhas com bolinhas)</li>
          <li>Use <strong>Aprimorar</strong> para melhoria automática</li>
          <li>Ajuste brilho, contraste, corte, gire</li>
          <li>Aplique filtros se quiser</li>
          <li>Salve</li>
        </ol>

        <h2>Liberar Espaço no Celular</h2>
        <p>Depois que tudo está na nuvem, toque no menu → <strong>Liberar espaço</strong>. Apaga as fotos do celular (mantém na nuvem) e libera GB.</p>

        <h2>Compartilhar Álbuns</h2>
        <p>Crie álbuns com várias fotos e compartilhe link com a família. Todos podem ver e adicionar fotos próprias. Ótimo para casamentos e viagens em grupo.</p>

        <h2>Não Está Subindo Backup?</h2>
        <p>Verifique Wi-Fi, espaço na conta Google (15 GB grátis, depois compra plano), e configurações do app. A O Técnico de Informática ajuda a configurar Google Fotos e organizar fotos antigas em domicílio em Curitiba.</p>

      </>
    ),
  },
  "como-instalar-aplicativos-celular-com-seguranca": {
    title: "Como Instalar Aplicativos no Celular Com Segurança: Evite Vírus e Golpes (2026)",
    excerpt: "Aprenda como instalar apps no Android e iPhone com segurança, evitando vírus, apps falsos e golpes. Atendimento de suporte em Curitiba.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">App falso é uma das principais formas de roubarem seu celular. Veja como instalar com segurança e identificar perigos.</p>

        <h2>Use Só a Loja Oficial</h2>
        <p>Android: <strong>Google Play Store</strong>. iPhone: <strong>App Store</strong>. NUNCA instale APK de site aleatório, mesmo se 'oficial' do banco.</p>

        <h2>Antes de Instalar, Verifique</h2>
        <ul>
          <li>Nome do desenvolvedor — bate com o real? (Banco do Brasil S.A. e não 'Banc do Brasil')</li>
          <li>Quantas vezes foi baixado? Apps reais têm milhões de downloads</li>
          <li>Estrelas e comentários — leia os mais recentes</li>
          <li>Data da última atualização — se foi há anos, suspeito</li>
        </ul>

        <h2>Cuidado com Permissões</h2>
        <p>Por que um app de lanterna quer acessar seus contatos? Quando instalar e ele pedir permissões estranhas, NEGUE. Em <strong>Configurações → Aplicativos → Permissões</strong> você revisa tudo.</p>

        <h2>Apps de Banco: Sempre Diretos</h2>
        <p>Procure pelo nome do banco na loja oficial. Se aparecerem 5 apps com mesmo nome, escolha o do desenvolvedor oficial. Em dúvida, abra o site do banco e clique no link de download lá.</p>

        <h2>Sinais de App Malicioso</h2>
        <ul>
          <li>Bateria descarrega anormalmente rápido</li>
          <li>Anúncios aparecem fora dos apps</li>
          <li>Cobranças estranhas no cartão</li>
          <li>Celular esquenta sem motivo</li>
          <li>Apps que você não instalou aparecem</li>
        </ul>

        <h2>Removeu Mas Continua?</h2>
        <p>Alguns vírus se reinstalam. A O Técnico de Informática faz limpeza completa do celular em casa em Curitiba, identifica apps maliciosos e configura proteção. Chame pelo WhatsApp.</p>

      </>
    ),
  },
  "como-transferir-dados-celular-novo": {
    title: "Como Transferir Dados Para Celular Novo: Android e iPhone (Guia 2026)",
    excerpt: "Comprou celular novo? Aprenda como transferir contatos, fotos, WhatsApp e apps do celular antigo para o novo, sem perder nada.",
    date: "2026-04-29",
    readTime: "8 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Trocar de celular não precisa ser dor de cabeça. Os sistemas modernos transferem quase tudo automaticamente. Veja como.</p>

        <h2>Android Para Android</h2>
        <ol>
          <li>Ligue o celular novo e siga as telas iniciais</li>
          <li>Quando perguntar 'Copiar do dispositivo?', escolha <strong>Sim</strong></li>
          <li>Conecte os dois com cabo USB ou siga as instruções de Wi-Fi</li>
          <li>Faça login na MESMA conta Google</li>
          <li>Marque o que quer transferir (apps, fotos, mensagens, configurações)</li>
          <li>Espere terminar — pode demorar 1 hora</li>
        </ol>

        <h2>iPhone Para iPhone</h2>
        <p>Ligue o iPhone novo perto do antigo. Aparece <strong>Configuração Rápida</strong>. Aponte a câmera do antigo para a animação do novo. Pronto — segue as instruções e tudo passa via Wi-Fi.</p>

        <h2>Android Para iPhone</h2>
        <ol>
          <li>No iPhone novo, na hora de configurar, escolha <strong>Mover dados do Android</strong></li>
          <li>No Android, baixe o app <strong>Move to iOS</strong> da Play Store</li>
          <li>Abra e siga os passos — ele gera um código que você digita no iPhone</li>
          <li>Marque o que quer mover (contatos, fotos, mensagens)</li>
          <li>Espere terminar</li>
        </ol>

        <h2>iPhone Para Android</h2>
        <p>Use o app <strong>Switch to Android</strong> da Apple. Funciona similar ao Move to iOS, mas no sentido contrário.</p>

        <h2>WhatsApp Especificamente</h2>
        <p>WhatsApp tem migração própria entre iPhone e Android. No celular novo, ao instalar, escolha 'Transferir conversas'. Siga as instruções (precisa estar na mesma rede Wi-Fi).</p>

        <h2>Não Conseguiu?</h2>
        <p>A O Técnico de Informática faz transferência completa entre celulares (até de marcas diferentes), garantindo que nada se perca. Atendemos em casa em Curitiba — chame pelo WhatsApp.</p>

      </>
    ),
  },
  "como-fazer-print-tela-celular": {
    title: "Como Tirar Print no Celular: Android, iPhone e Print Rolando (Guia 2026)",
    excerpt: "Aprenda como tirar screenshot no celular Android e iPhone, incluindo print de página inteira (rolando). Atalhos de todas as marcas.",
    date: "2026-04-29",
    readTime: "4 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Print de tela (screenshot) é útil para mostrar problemas, salvar conversa, guardar reserva. Veja como em qualquer celular.</p>

        <h2>Android (Maioria dos Modelos)</h2>
        <p>Aperte ao mesmo tempo: <strong>Botão de Ligar + Botão de Diminuir Volume</strong>. Mantenha por 1 segundo. Toca um som e aparece o print.</p>

        <h2>iPhone com Face ID (Sem Botão Home)</h2>
        <p><strong>Botão Lateral + Botão Aumentar Volume</strong> ao mesmo tempo, rapidamente.</p>

        <h2>iPhone Com Botão Home</h2>
        <p><strong>Botão Home + Botão Lateral</strong> ao mesmo tempo.</p>

        <h2>Onde Fica o Print</h2>
        <p>Android: aplicativo <strong>Galeria</strong> ou <strong>Google Fotos</strong>, na pasta 'Screenshots'. iPhone: app <strong>Fotos</strong>, álbum 'Capturas de Tela'.</p>

        <h2>Print Rolando (Página Inteira)</h2>
        <p>Samsung, Xiaomi e iPhone novos permitem capturar página inteira. Logo depois do print normal, aparece um botão 'Capturar mais' ou 'Página inteira'. Clique nele.</p>

        <h2>Compartilhar o Print</h2>
        <p>Depois de tirar, toque no preview que aparece no canto. Você pode editar (cortar, marcar) e compartilhar direto pelo WhatsApp, e-mail ou redes sociais.</p>

      </>
    ),
  },
  "como-recuperar-conta-google-bloqueada": {
    title: "Como Recuperar Conta Google Bloqueada ou Esquecida: Guia Oficial 2026",
    excerpt: "Esqueceu a senha do Gmail ou conta foi hackeada? Veja o passo a passo oficial para recuperar a conta Google. Suporte técnico em Curitiba.",
    date: "2026-04-29",
    readTime: "7 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Perder acesso à conta Google é grave: você perde Gmail, fotos, contatos, YouTube, e o acesso ao próprio celular Android. Veja como recuperar com calma.</p>

        <h2>Passo 1: Use o Recuperador Oficial</h2>
        <p>Acesse <strong>g.co/recover</strong> (no celular ou computador) e digite seu e-mail.</p>

        <h2>Passo 2: Escolha Como Recuperar</h2>
        <ul>
          <li>Confirmar via celular já cadastrado (envia notificação)</li>
          <li>Receber código por SMS</li>
          <li>Receber código no e-mail alternativo</li>
          <li>Responder pergunta de segurança</li>
          <li>Lembrar de senha antiga</li>
        </ul>

        <h2>Passo 3: Se Não Tem Mais Acesso ao Celular Cadastrado</h2>
        <p>Clique em <strong>'Tentar de outro modo'</strong> em cada tela. O Google vai pedir mais informações: ano de criação da conta, contatos frequentes, assuntos de e-mails recentes. Quanto mais responder corretamente, maior a chance.</p>

        <h2>Passo 4: Pode Demorar Dias</h2>
        <p>Para contas mais antigas ou com pouca informação, o Google pode levar alguns dias analisando. Tenha paciência. Se negar, espere 24h e tente de novo respondendo melhor.</p>

        <h2>Para Não Acontecer de Novo</h2>
        <ul>
          <li>Cadastre celular E e-mail alternativo</li>
          <li>Use senha forte (não use a mesma de outros sites)</li>
          <li>Ative <strong>Verificação em duas etapas</strong> (g.co/2sv)</li>
          <li>Anote os <strong>códigos de backup</strong> em papel</li>
          <li>Imprima e guarde em local seguro</li>
        </ul>

        <h2>Conta Foi Hackeada</h2>
        <p>Se ainda consegue entrar mas notou atividade estranha: vá em <strong>myaccount.google.com → Segurança → Atividade recente</strong>. Saia de todos os dispositivos e troque a senha imediatamente.</p>

        <h2>Caso Difícil?</h2>
        <p>A O Técnico de Informática ajuda na recuperação de contas, configura segurança em 2 etapas e protege todas as suas contas em domicílio em Curitiba. Chame pelo WhatsApp.</p>

      </>
    ),
  },
  "como-melhorar-sinal-wifi-em-casa": {
    title: "Wi-Fi caindo ou com sinal fraco: como diagnosticar",
    excerpt: "Wi-Fi que cai, fica lento ou não chega em alguns cômodos? Veja como separar problema da rede local e falha da operadora.",
    date: "2026-04-29",
    readTime: "9 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">"O Wi-Fi está ruim" pode significar coisas bem diferentes: sinal que não chega, conexão que cai ou internet que simplesmente não funciona mesmo com o Wi-Fi conectado. Identificar qual é o seu caso evita gastar com repetidor ou roteador novo sem necessidade.</p>

        <h2>Qual é exatamente o problema?</h2>
        <ul>
          <li><strong>Sem sinal em alguns cômodos:</strong> questão de alcance e obstáculos.</li>
          <li><strong>Conectado, mas sem internet:</strong> costuma apontar para a operadora ou para o roteador.</li>
          <li><strong>Só um aparelho com problema:</strong> provavelmente é o aparelho, não a rede.</li>
          <li><strong>Todos os aparelhos caindo juntos:</strong> aponta para roteador ou operadora.</li>
          <li><strong>Quedas em horários específicos:</strong> pode ser saturação ou interferência.</li>
        </ul>

        <h2>Rede local x operadora</h2>
        <p>Muita gente troca de roteador quando o problema estava na operadora — e vice-versa. Um jeito simples de separar: se <strong>todos</strong> os aparelhos ficam sem internet ao mesmo tempo e o problema persiste após reiniciar os equipamentos, há boa chance de ser a operadora ou o equipamento dela. Se a internet funciona perto do roteador mas some em cômodos distantes, o tema é alcance da rede local.</p>

        <h2>Verificações seguras</h2>
        <ul>
          <li>Compare aparelhos: teste em dois ou três dispositivos para ver se é geral ou isolado.</li>
          <li>Teste perto do roteador: se melhora muito de perto, é questão de alcance.</li>
          <li>Confira os cabos externos do modem/roteador — um conector solto derruba tudo.</li>
          <li>Reinicie de forma controlada: desligue o roteador da tomada, aguarde alguns instantes e ligue de novo.</li>
          <li>Observe as luzes do equipamento; luzes de internet apagadas ou vermelhas costumam indicar falha de linha.</li>
          <li>Confirme se a operadora não está com indisponibilidade na sua região.</li>
          <li>Anote horários e o padrão das quedas — ajuda muito no diagnóstico.</li>
        </ul>

        <h2>O que pode influenciar o alcance</h2>
        <ul>
          <li>Posição do roteador (canto ou chão pioram; local alto e central ajuda).</li>
          <li>Paredes grossas, espelhos e metal entre você e o roteador.</li>
          <li>Interferência de outros aparelhos e de redes vizinhas no mesmo canal.</li>
          <li>Distância grande, que pode pedir mesh em vez de repetidor simples.</li>
          <li>Roteador antigo, que pode não acompanhar o uso atual.</li>
        </ul>
        <p>Trocar o roteador nem sempre resolve: se a causa é a operadora, o cabeamento ou o posicionamento, o aparelho novo repete o mesmo problema. Por isso o diagnóstico vem antes da compra.</p>

        <h2>Quando procurar atendimento técnico</h2>
        <p>Se as verificações não resolveram, ou se a casa é grande e tem pontos cegos, uma análise no local identifica onde o sinal se perde e o que realmente faz diferença — do posicionamento a um sistema mesh bem dimensionado. Casos mais simples podem até ser orientados remotamente.</p>

        <h2>Alvenaria, lajes e apartamentos: por que o sinal cai de um cômodo para o outro</h2>
        <p>O alcance divulgado por fabricantes considera ambientes abertos. Em residências e apartamentos brasileiros, a realidade é outra: paredes de alvenaria com estrutura metálica, lajes de concreto, caixas d'água, espelhos grandes e armários embutidos absorvem ou refletem o sinal. Um roteador instalado no fundo da casa, dentro de um armário do rack de TV, perde parte relevante da cobertura antes mesmo de chegar ao segundo cômodo.</p>
        <p>Em prédios, soma-se um segundo fator: a quantidade de redes vizinhas competindo pelos mesmos canais. Nesse cenário, a banda de 5 GHz costuma entregar conexão mais estável perto do roteador, enquanto a de 2,4 GHz atravessa melhor as paredes, porém com mais interferência. Distribuir dispositivos entre as duas faixas costuma render mais estabilidade do que trocar o equipamento.</p>
        <ul>
          <li>Posicione o roteador em local alto, central e ventilado, longe de metal e de aparelhos que geram interferência.</li>
          <li>Evite instalar dentro de racks fechados, atrás da TV ou no chão.</li>
          <li>Mantenha antenas na vertical em ambientes de um pavimento; em sobrados, incline uma delas.</li>
          <li>Anote em quais cômodos a queda acontece — o mapa do problema orienta a solução.</li>
        </ul>

        <h2>Repetidor, mesh ou cabo: como escolher sem gastar à toa</h2>
        <p>Cada solução resolve um tipo diferente de problema, e é comum comprar a errada. O repetidor amplia a área de cobertura reaproveitando o sinal existente — só ajuda se estiver em um ponto onde o sinal ainda chega bem, e normalmente reduz a velocidade disponível. O sistema mesh usa vários pontos que se comunicam entre si e mantêm o mesmo nome de rede, o que evita a troca manual entre redes ao andar pela casa. Já o cabo de rede continua sendo a opção mais estável para computador fixo, videogame, TV e escritório em cômodo distante.</p>
        <p>Uma combinação frequente e eficiente é levar cabo até o cômodo problemático e colocar ali o segundo ponto de acesso: o sinal chega íntegro e a cobertura nasce forte no destino, em vez de ser reciclada pela metade. Antes de comprar qualquer equipamento, vale confirmar se a velocidade contratada chega ao roteador por cabo — se o problema estiver na entrada ou no equipamento da operadora, nenhum repetidor resolve.</p>

        <div className="bg-accent/10 rounded-xl p-6 my-8">
          <h3 className="text-accent font-bold mb-2">Wi-Fi caindo ou com pontos cegos?</h3>
          <p className="text-muted-foreground mb-3">Analisamos a cobertura no local e indicamos o que resolve de fato, sem trocar equipamento à toa.</p>
          <ul className="mb-0">
            <li><Link to="/servicos/redes-e-wifi" className="text-accent">Redes e Wi-Fi</Link></li>
            <li><Link to="/atendimento-domicilio" className="text-accent">Atendimento em domicílio</Link></li>
            <li><Link to="/atendimento-remoto" className="text-accent">Atendimento remoto</Link></li>
            <li><Link to="/diagnostico-tecnico" className="text-accent">Como funciona o diagnóstico técnico</Link></li>
          </ul>
        </div>

        <EditorialReferences slug="como-melhorar-sinal-wifi-em-casa" />
      </>

    ),
  },
  "como-configurar-roteador-wifi-iniciantes": {
    title: "Como configurar um roteador Wi-Fi do zero, sem complicação",
    excerpt: "Ordem correta das etapas, o que mudar na primeira configuração e os ajustes que evitam a maior parte dos problemas de sinal depois.",
    date: "2026-04-22",
    readTime: "11 min",
    category: "Redes e Wi-Fi",
    content: (
      <>
        <p className="lead">Configurar um roteador é simples quando a ordem das etapas é respeitada. A maior parte das dores de cabeça com Wi-Fi doméstico nasce de três decisões tomadas nos primeiros minutos: onde o aparelho foi colocado, qual senha ficou ativa e se ele continua repetindo a função do modem da operadora. Este guia percorre a configuração inicial na sequência correta.</p>

        <h2>Antes de ligar: escolha o lugar</h2>
        <p>Wi-Fi é rádio. O aparelho deve ficar em posição central em relação aos cômodos usados, elevado do chão, longe de caixas metálicas, do micro-ondas e de espelhos grandes. Roteador dentro do armário do corredor ou atrás da TV é a causa mais comum de queda de sinal — e nenhuma configuração compensa isso depois.</p>
        <p>Se o ponto de entrada da operadora fica num canto ruim da casa, vale mais estender o cabo até um ponto central do que aceitar a posição imposta pela tomada.</p>

        <h2>Modem, roteador e o duplo NAT</h2>
        <p>Muitas operadoras entregam um aparelho que já faz modem e roteador. Ao acrescentar um roteador próprio, ficam duas redes em série, cada uma distribuindo endereços — o chamado duplo NAT. Nem sempre isso quebra a navegação, mas costuma atrapalhar jogos, câmeras, acesso remoto e transferências dentro da rede.</p>
        <p>Há dois caminhos: colocar o aparelho da operadora em modo ponte, deixando o roteador próprio como único responsável pela rede; ou manter o roteador próprio em modo ponto de acesso, sem roteamento. Escolher um dos dois — e não os dois roteando ao mesmo tempo — resolve uma classe inteira de problemas.</p>

        <h2>Primeiro acesso ao painel</h2>
        <p>Com o cabo da internet na porta WAN e o computador ligado a uma porta LAN, o painel é aberto pelo endereço impresso na etiqueta do aparelho. Duas coisas devem mudar imediatamente:</p>
        <ul>
          <li><strong>A senha de administração</strong>, que vem padrão e é pública na internet. Ela não é a senha do Wi-Fi — é a que protege as configurações.</li>
          <li><strong>O acesso remoto ao painel</strong>, que deve permanecer desligado a menos que exista motivo claro para o contrário.</li>
        </ul>

        <h2>Nome da rede e segurança</h2>
        <p>Defina um nome de rede que não identifique morador, apartamento ou empresa. Em segurança, escolha WPA3 quando todos os aparelhos suportarem, ou WPA2 com AES quando houver equipamento antigo. Nunca deixe a rede aberta e evite WEP ou TKIP, que são padrões vencidos.</p>
        <p>A senha deve ser longa e fácil de digitar — uma frase com quatro ou cinco palavras funciona melhor que uma sequência curta de símbolos. Desative o WPS: a comodidade de parear com um botão não compensa o risco que ele abre.</p>

        <h2>2,4 GHz e 5 GHz: para que serve cada faixa</h2>
        <p>A faixa de 2,4 GHz alcança mais longe e atravessa paredes com menos perda, mas é a mais congestionada e a mais lenta. A de 5 GHz entrega muito mais velocidade e sofre menos interferência, porém perde força com obstáculos.</p>
        <p>Manter o mesmo nome nas duas faixas simplifica o uso e deixa o aparelho escolher. Separar em dois nomes dá controle manual e ajuda quando algum equipamento antigo insiste em conectar na faixa errada. As duas abordagens funcionam; o erro é desligar a faixa de 5 GHz achando que "não pega bem" quando o problema real é a posição do roteador.</p>

        <h2>Canais e largura</h2>
        <p>Em prédios, dezenas de redes disputam o mesmo espaço. Em 2,4 GHz, use apenas os canais 1, 6 ou 11 — os demais se sobrepõem e pioram a situação de todos. Em 5 GHz, o automático costuma resolver bem. Largura de canal maior aumenta a velocidade de pico e reduz o alcance útil: em ambiente cheio, largura menor costuma render mais estabilidade real.</p>

        <h2>Depois de configurar: os ajustes que valem</h2>
        <ul>
          <li><strong>Atualize o firmware.</strong> Correções de segurança e de estabilidade de conexão saem com frequência.</li>
          <li><strong>Reserve endereços fixos</strong> para impressora, câmeras e servidores locais — evita que "sumam" da rede depois de uma queda de energia.</li>
          <li><strong>Crie a rede de visitantes</strong> e use-a também para equipamentos de automação, isolando-os da rede principal.</li>
          <li><strong>Anote as senhas</strong> em local seguro; a de administração some da memória exatamente quando é necessária.</li>
        </ul>

        <h2>Quando o problema não é configuração</h2>
        <p>Se o sinal cai sempre no mesmo cômodo, nenhuma configuração resolve — o caso é de cobertura, e a saída é um ponto de acesso adicional ligado por cabo, não um repetidor colocado onde o sinal já é fraco. Se a queda ocorre na casa toda, em horários fixos, a investigação passa pelo enlace da operadora. E se o roteador reinicia sozinho, o suspeito costuma ser a fonte de alimentação ou o superaquecimento.</p>
        <p>Para melhorar cobertura, veja o guia de <Link to="/blog/como-melhorar-sinal-wifi-em-casa">como melhorar o sinal de Wi-Fi em casa</Link>. Para saber quem está conectado à sua rede, leia <Link to="/blog/como-saber-quem-esta-usando-meu-wifi">como identificar dispositivos no Wi-Fi</Link>. Quando o projeto envolve vários pontos, cabeamento ou rede de empresa, a página de <Link to="/servicos/redes-e-wifi">configuração de redes e Wi-Fi</Link> descreve como o serviço é feito.</p>
      </>
    ),
  },
  "como-trocar-senha-wifi": {
    title: "Como Trocar a Senha do Wi-Fi: Passo a Passo Para Qualquer Roteador (2026)",
    excerpt: "Vizinho usando seu Wi-Fi? Aprenda como trocar a senha do Wi-Fi em 5 minutos em qualquer roteador (TP-Link, Intelbras, Vivo, Claro).",
    date: "2026-04-29",
    readTime: "5 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Trocar a senha do Wi-Fi é simples e deve ser feito sempre que suspeitar de uso indevido ou tiver compartilhado com alguém que não deveria ter mais acesso.</p>

        <h2>O Que Você Precisa</h2>
        <ul>
          <li>Estar conectado no Wi-Fi (por cabo ou pelo próprio Wi-Fi atual)</li>
          <li>Saber o IP do roteador (geralmente 192.168.0.1 ou 192.168.1.1)</li>
          <li>Senha de administrador (na etiqueta do roteador)</li>
        </ul>

        <h2>Passo a Passo</h2>
        <ol>
          <li>Abra o navegador e digite o IP do roteador na barra</li>
          <li>Faça login (admin/admin geralmente)</li>
          <li>Procure menu <strong>Wireless</strong>, <strong>Wi-Fi</strong> ou <strong>Sem fio</strong></li>
          <li>Clique em <strong>Segurança</strong> ou <strong>Senha</strong></li>
          <li>Mude a senha para algo forte (12+ caracteres, com letras, números e símbolos)</li>
          <li>Mantenha o tipo de segurança em <strong>WPA2-PSK</strong> ou <strong>WPA3</strong></li>
          <li>Salve e aplique</li>
        </ol>

        <h2>Depois de Trocar</h2>
        <p>Você será desconectado. Reconecte celulares, TV, notebook, câmeras com a nova senha. Anote em local seguro.</p>

        <h2>Senha Forte É Assim</h2>
        <ul>
          <li>Mínimo 12 caracteres</li>
          <li>Misture LETRAS maiúsculas e minúsculas</li>
          <li>Inclua números e símbolos (!@#$)</li>
          <li>NÃO use nome, data de nascimento ou 'minhacasa123'</li>
          <li>Exemplo bom: <strong>Curitiba!2026#Casa</strong></li>
        </ul>

        <h2>Esqueci a Senha do Painel?</h2>
        <p>Aperte e segure o botão <strong>Reset</strong> atrás do roteador por 10 segundos. Volta para configuração de fábrica e você reconfigura. Atenção: vai apagar a senha do Wi-Fi também e voltar para a padrão de etiqueta.</p>

        <h2>Ajuda Profissional</h2>
        <p>A O Técnico de Informática configura segurança avançada, rede separada para visitas e reset de roteador em casa em Curitiba — atendimento via WhatsApp.</p>

      </>
    ),
  },
  "como-usar-rede-wifi-para-visitas": {
    title: "Como Criar Rede Wi-Fi de Visitantes: Proteja Sua Senha Principal (2026)",
    excerpt: "Aprenda como criar uma rede Wi-Fi separada para visitas em qualquer roteador, sem dar a senha principal. Configuração ajudada em Curitiba.",
    date: "2026-04-29",
    readTime: "5 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Dar a senha do seu Wi-Fi para todo mundo é arriscado: uma vez que a senha vaza, qualquer um pode usar. A solução é criar uma rede de visitas (Guest Network).</p>

        <h2>Vantagens da Rede de Visitas</h2>
        <ul>
          <li>Senha separada — pode trocar quando quiser sem afetar sua casa</li>
          <li>Visitas não acessam seus computadores nem seu Chromecast</li>
          <li>Pode limitar a velocidade</li>
          <li>Pode programar para desligar à noite</li>
        </ul>

        <h2>Como Criar</h2>
        <ol>
          <li>Acesse o painel do roteador (192.168.0.1 ou 192.168.1.1)</li>
          <li>Faça login</li>
          <li>Procure <strong>Rede de Visitas</strong>, <strong>Guest Network</strong> ou <strong>Wi-Fi Convidados</strong></li>
          <li>Ative</li>
          <li>Defina nome (ex: 'CasaVisitas')</li>
          <li>Defina senha simples para passar</li>
          <li>Marque <strong>Isolar da rede principal</strong> ou similar</li>
          <li>Salve</li>
        </ol>

        <h2>Compartilhe Por QR Code</h2>
        <p>No celular Android, vá em <strong>Configurações → Wi-Fi → toque na rede ativa → Compartilhar (QR Code)</strong>. Visitas escaneiam e conectam sem precisar digitar a senha.</p>

        <h2>Roteadores Que Não Têm Essa Função</h2>
        <p>Roteadores antigos podem não ter. Considere atualizar o firmware ou trocar por modelo recente. A O Técnico de Informática indica e instala roteadores adequados ao seu uso em Curitiba.</p>

      </>
    ),
  },
  "como-configurar-repetidor-wifi": {
    title: "Como Configurar Repetidor de Wi-Fi: Passo a Passo Simples (Guia 2026)",
    excerpt: "Comprou um repetidor de Wi-Fi mas não sabe instalar? Aprenda como configurar em 10 minutos. Instalação profissional em Curitiba se preferir.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Repetidor estende o sinal do roteador para áreas que não pegam. A configuração é simples seguindo este guia.</p>

        <h2>Onde Colocar o Repetidor</h2>
        <p>O lugar certo é <strong>no meio do caminho</strong> entre o roteador e o lugar onde o sinal é fraco. Não adianta colocar onde você quer o sinal — coloque onde ainda tem sinal médio do roteador.</p>

        <h2>Método 1: Botão WPS (Mais Fácil)</h2>
        <ol>
          <li>Plug o repetidor próximo ao roteador (perto, na primeira vez)</li>
          <li>Espere 1 minuto</li>
          <li>Aperte o botão <strong>WPS</strong> do roteador</li>
          <li>Em até 2 minutos, aperte o botão <strong>WPS</strong> do repetidor</li>
          <li>Espere a luz parar de piscar e ficar fixa</li>
          <li>Mova o repetidor para o local definitivo</li>
        </ol>

        <h2>Método 2: Manual (Quando WPS Não Tem)</h2>
        <ol>
          <li>Plug o repetidor e conecte no Wi-Fi dele (nome aparece na etiqueta)</li>
          <li>Acesse no navegador o endereço da etiqueta (ex: <strong>tplinkrepeater.net</strong>)</li>
          <li>Faça login (admin geralmente)</li>
          <li>Escolha sua rede Wi-Fi principal</li>
          <li>Digite a senha</li>
          <li>Defina o nome do Wi-Fi do repetidor (pode ser igual ou com '_EXT')</li>
          <li>Salve e mova para o local</li>
        </ol>

        <h2>Verificando se Funcionou</h2>
        <p>Vá ao local com sinal fraco e veja se aparece a rede do repetidor. Conecte e teste velocidade. Se ainda fraco, mude o repetidor de lugar.</p>

        <h2>Limites do Repetidor</h2>
        <p>Repetidor reduz velocidade pela metade. Para casas grandes, sistema <strong>Mesh</strong> (vários pontos integrados) é muito superior. A O Técnico de Informática instala mesh em Curitiba e região com cobertura total.</p>

      </>
    ),
  },
  "como-saber-quem-esta-usando-meu-wifi": {
    title: "Como saber quem está usando o seu Wi-Fi (e o que fazer)",
    excerpt: "Como listar os dispositivos conectados, identificar cada um pelo nome e pelo endereço físico e retomar o controle da rede sem quebrar o que funciona.",
    date: "2026-04-22",
    readTime: "10 min",
    category: "Redes e Wi-Fi",
    content: (
      <>
        <p className="lead">A suspeita costuma começar assim: a internet ficou lenta sem motivo, ou apareceu um aparelho desconhecido na lista do roteador. Antes de trocar tudo, vale entender o que a lista de dispositivos realmente mostra — e o que ela não mostra.</p>

        <h2>Onde ver os aparelhos conectados</h2>
        <p>O lugar confiável é o painel do próprio roteador, normalmente em uma seção chamada "dispositivos conectados", "clientes DHCP" ou "mapa da rede". Ali aparecem o nome informado por cada aparelho, o endereço IP recebido e o endereço físico (MAC) da placa de rede.</p>
        <p>Aplicativos de celular que "escaneiam a rede" ajudam a ter uma visão rápida, mas só enxergam o que responde no momento da varredura. Um aparelho desligado ou em economia de energia não aparece — por isso a lista do roteador é a referência.</p>

        <h2>Por que a lista parece cheia de estranhos</h2>
        <p>Uma casa comum tem mais dispositivos conectados do que as pessoas imaginam: TV, console, caixa de som, aspirador, lâmpadas, câmeras, relógio, tablet antigo esquecido na gaveta. Muitos se apresentam com nomes genéricos ou apenas com um código do fabricante.</p>
        <p>Some-se a isso a privacidade de endereço MAC: celulares modernos geram um endereço aleatório por rede, o que faz o mesmo aparelho aparecer com identidades diferentes ao longo do tempo. Ou seja, um nome estranho na lista não é prova de invasão.</p>

        <h2>Como identificar cada aparelho com método</h2>
        <ol>
          <li>Liste o que você tem. Escreva todos os equipamentos da casa que usam rede, inclusive os raramente ligados.</li>
          <li>Desligue o Wi-Fi de um aparelho por vez e observe qual entrada some da lista. É lento, mas elimina a dúvida.</li>
          <li>Renomeie o que reconhecer. Muitos roteadores permitem apelidar dispositivos — depois disso, qualquer novidade fica evidente.</li>
          <li>Reserve endereços fixos para os equipamentos permanentes. A lista passa a ter uma ordem estável.</li>
        </ol>

        <h2>Sinais que merecem atenção de verdade</h2>
        <ul>
          <li>Dispositivo conectado enquanto todos os aparelhos da casa estão desligados.</li>
          <li>Alteração de configurações que você não fez — DNS trocado, acesso remoto habilitado, rede de visitantes ligada sozinha.</li>
          <li>Tráfego contínuo em horários em que ninguém usa a internet.</li>
          <li>Senha do painel que deixou de funcionar.</li>
        </ul>
        <p>Esse conjunto aponta para acesso indevido ou para roteador comprometido — e aí não basta bloquear um endereço.</p>

        <h2>Retomando o controle da rede</h2>
        <h3>1. Troque a senha do Wi-Fi</h3>
        <p>Use uma frase longa e mude o padrão de segurança para WPA3 ou WPA2 com AES. Todos os aparelhos precisarão reconectar — separe uma hora tranquila para isso.</p>
        <h3>2. Troque a senha de administração</h3>
        <p>É diferente da senha do Wi-Fi e é a que realmente protege as configurações. Se ela ainda era a de fábrica, considere que qualquer pessoa que já esteve na rede pôde acessá-la.</p>
        <h3>3. Desative WPS e acesso remoto</h3>
        <p>O WPS permite entrar sem digitar senha e é o atalho mais explorado em redes domésticas. O acesso remoto ao painel expõe o roteador à internet inteira.</p>
        <h3>4. Atualize o firmware</h3>
        <p>Boa parte das invasões de roteador explora falhas já corrigidas pelo fabricante em versões mais novas.</p>
        <h3>5. Isole o que não precisa da rede principal</h3>
        <p>Câmeras, automação e aparelhos de visitantes ficam melhor na rede de convidados. Se um deles for comprometido, o restante da casa não vai junto.</p>

        <h2>Sobre bloquear por endereço MAC</h2>
        <p>O filtro de MAC parece a solução óbvia, mas é uma barreira fraca: o endereço pode ser copiado, e a lista dá trabalho de manter. Ele funciona como organização, não como segurança. A proteção real vem da senha forte, do padrão de criptografia atual e do painel fechado.</p>

        <h2>Quando a lentidão não é intrusão</h2>
        <p>Antes de concluir que alguém está usando sua internet, verifique atualizações de sistema em segundo plano, backups em nuvem, streaming em alta resolução e câmeras enviando vídeo o tempo todo. Também é comum o gargalo estar na cobertura, e não na banda contratada — o teste de velocidade próximo ao roteador e no cômodo problemático mostra a diferença em poucos minutos.</p>
        <p>Se o diagnóstico apontar cobertura, o caminho está em <Link to="/blog/como-melhorar-sinal-wifi-em-casa">como melhorar o sinal de Wi-Fi em casa</Link>. Se o roteador nunca passou por uma configuração cuidadosa, comece por <Link to="/blog/como-configurar-roteador-wifi-iniciantes">como configurar um roteador do zero</Link>. Para revisão completa de rede, cabeamento e pontos de acesso, veja <Link to="/servicos/redes-e-wifi">configuração de redes e Wi-Fi</Link>.</p>
      </>
    ),
  },
  "como-conectar-wifi-tv-nao-conecta": {
    title: "Smart TV não conecta no Wi-Fi: como separar problema de rede de defeito da TV",
    excerpt:
      "Como descobrir se a Smart TV não conecta por causa da rede, da faixa de 5 GHz, do isolamento do roteador ou de falha no módulo Wi-Fi do aparelho — e o que fazer em cada caso.",
    date: "2026-08-12",
    readTime: "11 min",
    category: "Redes",
    content: (
      <>
        <p className="lead">Smart TV que não conecta tem duas famílias de causa muito diferentes: a rede não está entregando conexão utilizável naquele ponto da casa, ou o módulo Wi-Fi da própria TV está falhando. Os dois sintomas parecem iguais na tela. A diferença aparece no teste, e é ela que decide se o caso se resolve no roteador ou exige avaliação do aparelho.</p>

        <h2>O teste que separa os dois cenários</h2>
        <p>Antes de qualquer configuração, leve um celular até o local exato da TV — mesma altura, mesma parede, TV ligada. Depois observe:</p>
        <ul>
          <li><strong>Celular também pega mal ali:</strong> o problema é cobertura. A TV está apenas na pior posição da casa, normalmente atrás de móvel, em parede com estrutura metálica ou no cômodo mais distante do roteador.</li>
          <li><strong>Celular conecta bem e a TV não enxerga a rede:</strong> o caso costuma ser de faixa ou de configuração do roteador, não de alcance.</li>
          <li><strong>A TV conecta, mas cai sozinha depois de minutos ou horas:</strong> comportamento típico de rede saturada, canal congestionado ou módulo Wi-Fi do aparelho com falha térmica — nessa ordem de probabilidade.</li>
          <li><strong>A TV não enxerga nenhuma rede, nem a do vizinho:</strong> forte indício de falha no módulo Wi-Fi do aparelho.</li>
        </ul>

        <h2>Faixa de 5 GHz: a causa mais frequente de "a rede não aparece"</h2>
        <p>Muitas TVs, inclusive modelos recentes de linha de entrada, operam apenas em 2,4 GHz. Se o roteador transmite as duas faixas com o mesmo nome de rede, a TV pode simplesmente não listar nada — para ela, aquela rede não existe.</p>
        <p>A solução é separar os nomes das faixas no roteador e conectar a TV explicitamente à faixa de 2,4 GHz. Ela alcança mais longe e atravessa parede melhor; a perda de velocidade é irrelevante para vídeo, que consome muito menos banda do que a maioria das pessoas imagina.</p>

        <h2>Isolamento de clientes e rede de visitantes</h2>
        <p>Roteadores de operadora frequentemente vêm com rede de visitantes ativa e isolamento entre aparelhos. A TV conectada nessa rede acessa a internet, mas não conversa com celular nem computador — e aí o espelhamento de tela e os aplicativos de controle deixam de funcionar, mesmo com o vídeo rodando normalmente.</p>
        <p>Quando o sintoma é "a TV tem internet mas o celular não a encontra", esse é o primeiro item a verificar. A separação correta entre rede de trabalho, rede doméstica e rede de visitantes faz parte do que ajustamos em <Link to="/servicos/redes-e-wifi">redes e Wi-Fi</Link>.</p>

        <h2>Canal congestionado em prédio</h2>
        <p>Em edifício, dezenas de redes disputam as mesmas frequências. A TV conecta, o ícone fica normal, e mesmo assim o vídeo trava e a conexão cai. Não é defeito: é disputa por espaço no ar. Fixar um canal menos ocupado em 2,4 GHz e reposicionar o roteador para longe de metal, espelho, caixa d'água e do próprio armário costuma mudar o resultado mais do que trocar de aparelho.</p>

        <h2>O que fazer, na ordem que evita retrabalho</h2>
        <ol>
          <li><strong>Desligar TV e roteador da tomada</strong> por um minuto, religando primeiro o roteador e aguardando ele estabilizar. Isso limpa sessões travadas dos dois lados.</li>
          <li><strong>Esquecer a rede na TV e reconectar</strong>, digitando a senha com atenção a maiúsculas e minúsculas — o teclado da TV frequentemente ativa maiúscula automática na primeira letra.</li>
          <li><strong>Conectar à faixa de 2,4 GHz</strong> com nome próprio, se as faixas ainda estiverem unificadas.</li>
          <li><strong>Verificar rede de visitantes e isolamento de clientes</strong> no roteador.</li>
          <li><strong>Atualizar o sistema da TV</strong>, quando ela conseguir conectar ao menos por cabo — correções de conectividade são comuns nessas atualizações.</li>
          <li><strong>Testar por cabo de rede.</strong> É o teste decisivo: se por cabo funciona perfeitamente e por Wi-Fi nunca funciona, o módulo sem fio do aparelho é o suspeito principal.</li>
        </ol>
        <p>Reset de fábrica só faz sentido depois desses passos. Ele apaga contas, aplicativos e preferências e raramente resolve o que os itens anteriores não resolveram.</p>

        <h2>Quando é defeito da TV — e o que isso significa na prática</h2>
        <p>Quando a TV não lista nenhuma rede, conecta por cabo sem falha e o problema persiste após atualização e reset, o cenário aponta para o módulo Wi-Fi do aparelho. Nesse ponto entra uma conversa honesta de custo: em boa parte dos televisores de linha de entrada, o reparo dessa parte custa mais do que resolver o uso com conexão cabeada ou com um aparelho externo de streaming ligado à porta HDMI.</p>
        <p>Não prometemos reparo antes de avaliar, e não trocamos placa por suposição. A avaliação de imagem, som, placa e alimentação segue o escopo descrito em <Link to="/servicos/conserto-tv">conserto de TV</Link>, com o critério de verificação e cobrança explicado em <Link to="/diagnostico-tecnico">como funciona o diagnóstico técnico</Link>.</p>

        <h2>Resumo prático</h2>
        <p>Compare a TV com o celular no mesmo ponto para separar cobertura de configuração. Se a rede não aparece na lista, quase sempre é faixa de 5 GHz; se aparece e cai, é congestionamento ou distância; se o celular não encontra a TV, é rede de visitantes ou isolamento; se por cabo funciona e por Wi-Fi nunca funciona, é o módulo sem fio do aparelho — e aí vale comparar o custo do reparo com a solução por cabo ou aparelho externo.</p>
      </>
    ),
  },

  "como-fazer-teste-velocidade-internet": {
    title: "Como Testar a Velocidade da Internet Corretamente: Guia 2026",
    excerpt: "Internet lenta em Curitiba? Aprenda como fazer um teste de velocidade confiável e descobrir se o problema é da operadora ou do seu Wi-Fi.",
    date: "2026-04-29",
    readTime: "5 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Antes de reclamar com a operadora, faça o teste do jeito certo. Resultados errados levam à conclusão errada.</p>

        <h2>Como Testar Corretamente</h2>
        <ol>
          <li>Conecte o computador no roteador POR CABO (não por Wi-Fi)</li>
          <li>Feche todos os programas, sites e downloads</li>
          <li>Pause Netflix, YouTube, downloads</li>
          <li>Acesse <strong>fast.com</strong> ou <strong>speedtest.net</strong></li>
          <li>Clique em <strong>Iniciar</strong> e espere terminar</li>
          <li>Anote o resultado de DOWNLOAD e UPLOAD</li>
        </ol>

        <h2>Resultado Por Wi-Fi É Sempre Menor</h2>
        <p>Wi-Fi sempre dá menos que cabo. Não compare com sua velocidade contratada usando Wi-Fi — só cabo é o teste real.</p>

        <h2>Se Está Bem Abaixo do Contratado</h2>
        <p>Você contratou 300 mega e o teste por cabo deu 40 mega? Isso é problema da operadora. Por lei, devem entregar pelo menos 80% do contratado em média (40% mínimo a qualquer momento).</p>

        <h2>O Que Reclamar Para Operadora</h2>
        <p>Ligue ou abra chat e diga: <strong>'Fiz teste por cabo direto no modem, todos os outros equipamentos desligados, e estou recebendo X mega de Y contratados. Quero técnico no local ou crédito proporcional.'</strong></p>

        <h2>Continuou Lento Mesmo Após Visita Técnica?</h2>
        <p>Pode ser cabeamento interno antigo, modem velho ou interferência. A O Técnico de Informática faz análise independente e ajuda a comprovar para a operadora — atendemos Curitiba via WhatsApp.</p>

      </>
    ),
  },
  "como-bloquear-acesso-internet-criancas": {
    title: "Como Bloquear Internet em Horários Específicos: Controle Parental no Roteador (2026)",
    excerpt: "Filhos online o dia inteiro? Aprenda como bloquear o Wi-Fi em horários no próprio roteador, sem instalar app. Configuração ajudada em Curitiba.",
    date: "2026-04-29",
    readTime: "6 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Em vez de brigar todo dia para o filho desligar o tablet, programe o próprio roteador para cortar a internet em determinados horários. Funciona sem app no celular dele.</p>

        <h2>Pelo Roteador (Mais Eficaz)</h2>
        <ol>
          <li>Acesse o painel (192.168.0.1)</li>
          <li>Procure <strong>Controle dos Pais</strong>, <strong>Parental Controls</strong> ou <strong>Agendamento</strong></li>
          <li>Adicione o dispositivo (celular ou tablet do filho)</li>
          <li>Defina horários permitidos (ex: 7h-22h em dias de semana, livre fim de semana)</li>
          <li>Salve</li>
        </ol>

        <h2>No Celular Android (Family Link)</h2>
        <ol>
          <li>No SEU celular, instale <strong>Google Family Link</strong></li>
          <li>No celular da criança, instale <strong>Family Link Para Crianças</strong></li>
          <li>Vincule as duas contas seguindo os passos</li>
          <li>No seu app, defina tempo de tela e horário de descanso</li>
          <li>Pode aprovar/negar cada app, ver localização e mais</li>
        </ol>

        <h2>No iPhone (Tempo de Uso)</h2>
        <ol>
          <li>Configurações → Tempo de Uso → Configurar Como Tempo de Uso de Pais e Filhos</li>
          <li>Defina tempo permitido por categoria (jogos, redes sociais)</li>
          <li>Defina horário de descanso</li>
          <li>Bloqueie compras e instalação de apps</li>
        </ol>

        <h2>Para Bloquear Sites Adultos</h2>
        <p>No painel do roteador, procure <strong>Filtro de Sites</strong> ou <strong>Bloqueio por DNS</strong>. Use o DNS do <strong>OpenDNS Family Shield</strong> (208.67.222.123 e 208.67.220.123) — bloqueia conteúdo adulto automaticamente.</p>

        <h2>Configuração Completa</h2>
        <p>Configurar tudo isso é trabalhoso. A O Técnico de Informática configura controle parental completo, filtro de conteúdo e horários no roteador, no celular e no computador — atendemos Curitiba e região.</p>

      </>
    ),
  },
  "como-mudar-nome-rede-wifi": {
    title: "Como Mudar o Nome da Rede Wi-Fi (SSID): Passo a Passo 2026",
    excerpt: "Aprenda como trocar o nome da sua rede Wi-Fi (SSID) em qualquer roteador — TP-Link, Intelbras, Vivo, Claro, Oi. Tutorial em 5 minutos.",
    date: "2026-04-29",
    readTime: "4 min",
    category: "Tutoriais Domésticos",
    content: (
      <>
        <p className="lead">Mudar o nome da rede (SSID) é simples e útil para identificar facilmente seu Wi-Fi entre vários da vizinhança.</p>

        <h2>Por Que Mudar</h2>
        <ul>
          <li>Identificar fácil entre redes vizinhas</li>
          <li>Personalizar com criatividade</li>
          <li>Não revelar marca do roteador (segurança)</li>
          <li>Diferenciar 2.4GHz e 5GHz se for dual band</li>
        </ul>

        <h2>Como Mudar</h2>
        <ol>
          <li>Acesse o painel do roteador (192.168.0.1 ou 192.168.1.1)</li>
          <li>Faça login</li>
          <li>Vá em <strong>Wireless</strong>, <strong>Wi-Fi</strong> ou <strong>Sem Fio</strong></li>
          <li>Procure o campo <strong>SSID</strong> ou <strong>Nome da Rede</strong></li>
          <li>Digite o novo nome (até 32 caracteres)</li>
          <li>Se for dual band, mude separado o 2.4GHz e o 5GHz</li>
          <li>Salve</li>
        </ol>

        <h2>O Que Acontece Depois</h2>
        <p>Todos os dispositivos serão desconectados. Eles não vão reconectar sozinhos porque o 'novo' Wi-Fi parece outro. Conecte cada um manualmente com o nome novo e mesma senha.</p>

        <h2>Dicas de Nomes</h2>
        <ul>
          <li>Evite nomes ofensivos (vizinhos veem)</li>
          <li>Não coloque número da casa nem sobrenome (segurança)</li>
          <li>Pode ser engraçado: 'NaoSouSeuVizinho', 'WifiTrancado', 'Pegue Pago R$10'</li>
          <li>Para dual band: 'CasaSilva' e 'CasaSilva_5G'</li>
        </ul>

        <h2>Esconder o Nome da Rede</h2>
        <p>Existe opção <strong>Ocultar SSID</strong>. Não recomendamos: traz mais problemas que segurança real. Use senha forte em vez disso.</p>

      </>
    ),
  },
};

