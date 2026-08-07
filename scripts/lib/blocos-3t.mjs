// ─────────────────────────────────────────────────────────────
// RODADA 3T — BLOCOS EDITORIAIS DAS TRÊS PÁGINAS DO ESCOPO
//
//   • /servicos/manutencao-preventiva-empresas → planejamento, inspeção,
//     riscos e prioridades (empresarial pura)
//   • /servicos/backup-para-empresas → cópias, restauração e
//     responsabilidades (empresarial pura)
//   • /servicos/redes-e-wifi → público misto (casa, home office,
//     escritório e pequena empresa) — NÃO convertida ao template B2B
//
// Fonte única compartilhada entre o React (src/lib/blocos3t.ts) e o
// HTML estático (scripts/curated-static-body.mjs), garantindo paridade.
//
// Nada aqui cria preço, prazo, SLA, plano mensal, franquia de horas,
// monitoramento contínuo ou promessa absoluta. Apenas reorganiza e
// aprofunda copy compatível com a política já publicada.
// ─────────────────────────────────────────────────────────────

/** Escopo fechado — exatamente três páginas. */
export const BLOCOS_3T_SLUGS = [
  "manutencao-preventiva-empresas",
  "backup-para-empresas",
  "redes-e-wifi",
];

export const BLOCOS_3T = {
  // ── PÁGINA 1 — MANUTENÇÃO PREVENTIVA EMPRESARIAL ──────────────
  "manutencao-preventiva-empresas": {
    tocExtra: [
      { id: "pilares-preventiva", label: "O que a inspeção observa" },
      { id: "fluxo-preventivo", label: "Como a rotina é conduzida" },
      { id: "prioridades", label: "Riscos e prioridades" },
      { id: "limites-preventiva", label: "O que a preventiva não garante" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "pilares-preventiva",
        titulo: "O que a inspeção observa em cada computador",
        intro:
          "A rotina é uma inspeção planejada em computadores empresariais. O objetivo é identificar riscos antes que virem parada, não prometer ausência de falha.",
        cards: [
          {
            titulo: "Inventário e contexto",
            texto:
              "Quais equipamentos existem, quem usa cada um, qual a importância dele para a operação e o histórico de problemas já relatados.",
          },
          {
            titulo: "Armazenamento e desempenho",
            texto:
              "Espaço livre, saúde observável do disco ou SSD, memória disponível e comportamento de inicialização do sistema.",
          },
          {
            titulo: "Limpeza e refrigeração",
            texto:
              "Acúmulo de poeira, ventilação obstruída, temperatura em uso e se há necessidade real de intervenção física no equipamento.",
          },
          {
            titulo: "Riscos e prioridades",
            texto:
              "Recomendações registradas por criticidade, próximos passos sugeridos e itens que ficaram sem autorização para execução.",
          },
        ],
      },
      {
        kind: "fluxo",
        id: "fluxo-preventiva",
        titulo: "Como a rotina preventiva é conduzida",
        passos: [
          "Levantamento dos equipamentos e do uso de cada um",
          "Inspeção física e lógica das estações combinadas",
          "Testes compatíveis com o equipamento e com o ambiente",
          "Identificação dos riscos observados",
          "Definição de prioridades junto com a empresa",
          "Autorização explícita do que será executado",
          "Intervenção, quando contratada e aprovada",
          "Registro escrito das recomendações pendentes",
        ],
        nota:
          "Nem toda recomendação é executada automaticamente: peças não estão incluídas por padrão, falhas inesperadas continuam possíveis e backup é uma disciplina separada, tratada em página própria.",
      },
      {
        kind: "matriz",
        id: "prioridades",
        titulo: "Como as prioridades são registradas",
        colunas: ["Prioridade", "Significado"],
        linhas: [
          ["Imediata", "Risco de falha ou perda que exige avaliação antes de continuar o uso"],
          ["Programada", "Correção recomendada dentro de um prazo planejado com a empresa"],
          ["Acompanhar", "Item funcional hoje, que merece observação nas próximas inspeções"],
          ["Informativa", "Melhoria possível, sem urgência técnica identificada"],
        ],
        nota:
          "A prioridade indica criticidade técnica, não prazo automático de atendimento. A execução depende de autorização e de agenda combinada.",
      },
      {
        kind: "limites",
        id: "limites-preventiva",
        titulo: "O que a preventiva não garante",
        destaque:
          "Manutenção preventiva reduz riscos, mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos.",
        listas: [
          {
            titulo: "Escopos diferentes",
            itens: [
              "Inspeção: observar e registrar o estado do equipamento",
              "Limpeza: intervenção física quando identificada necessidade",
              "Reparo: correção de falha já em curso, com diagnóstico próprio",
              "Troca de peça: depende de aprovação e não está incluída por padrão",
              "Backup: disciplina separada, com escopo e responsabilidades próprios",
              "Suporte recorrente: atendimento de demandas do dia a dia",
            ],
          },
        ],
      },
    ],
  },

  // ── PÁGINA 2 — BACKUP PARA EMPRESAS ───────────────────────────
  "backup-para-empresas": {
    tocExtra: [
      { id: "pilares-backup", label: "O que estruturamos" },
      { id: "conceitos-backup", label: "Sincronização, backup e recuperação" },
      { id: "fluxo-backup", label: "Como a rotina é definida" },
      { id: "teste-restauracao", label: "Teste de restauração" },
      { id: "responsabilidades", label: "Responsabilidades" },
      { id: "limites-backup", label: "Limites" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "pilares-backup",
        titulo: "O que estruturamos na rotina de cópias",
        intro:
          "O trabalho é avaliar como os arquivos da empresa são guardados hoje e organizar cópias compatíveis com essa realidade — sem prometer proteção absoluta.",
        cards: [
          {
            titulo: "O que proteger",
            texto:
              "Documentos, projetos, pastas compartilhadas, bancos de arquivos e configurações relevantes, quando aplicável ao ambiente.",
          },
          {
            titulo: "Onde copiar",
            texto:
              "Mídia local, mídia externa, armazenamento remoto ou nuvem já contratada pelo cliente, conforme o que a empresa mantém.",
          },
          {
            titulo: "Frequência e retenção",
            texto:
              "Intervalo entre cópias, quantidade de versões mantidas, período de retenção e capacidade disponível no destino.",
          },
          {
            titulo: "Restauração e responsabilidade",
            texto:
              "Teste do processo de restauração, responsável indicado pela empresa, acessos autorizados e documentação do que foi configurado.",
          },
        ],
      },
      {
        kind: "conceitos",
        id: "conceitos-backup",
        titulo: "Sincronização, backup e recuperação não são a mesma coisa",
        cards: [
          {
            titulo: "Sincronização",
            texto:
              "Replica alterações entre locais. Se um arquivo é apagado ou corrompido, a alteração também pode ser replicada.",
          },
          {
            titulo: "Backup",
            texto:
              "Mantém cópias separadas, com versões ou retenção definidas na estratégia combinada com a empresa.",
          },
          {
            titulo: "Recuperação de dados",
            texto:
              "É uma tentativa posterior à perda, falha ou indisponibilidade — com resultado incerto por natureza.",
          },
        ],
      },
      {
        kind: "fluxo",
        id: "fluxo-backup",
        titulo: "Como a rotina de backup é definida",
        passos: [
          "Mapear os arquivos que a empresa considera essenciais",
          "Identificar responsáveis por cada conjunto de dados",
          "Avaliar o armazenamento e as cópias já existentes",
          "Definir destinos, frequência e retenção",
          "Configurar as rotinas dentro do escopo autorizado",
          "Testar a restauração dos arquivos combinados",
          "Documentar o que foi configurado e o que ficou de fora",
          "Revisar periodicamente, quando essa revisão for contratada",
        ],
        nota:
          "A revisão periódica não acontece automaticamente: ela existe apenas quando é contratada. Fora disso, mudanças no ambiente precisam ser comunicadas pela empresa.",
      },
      {
        kind: "limites",
        id: "teste-restauracao",
        titulo: "Teste de restauração",
        destaque:
          "Um backup só pode ser considerado confiável quando existe uma cópia separada e o processo de restauração é testado.",
        listas: [
          {
            titulo: "O teste pode depender de",
            itens: [
              "Disponibilidade do ambiente e da janela combinada",
              "Permissões e credenciais fornecidas pela empresa",
              "Tamanho do conjunto de dados a restaurar",
              "Ambiente e aplicação envolvidos na restauração",
              "Recursos oferecidos pelo fornecedor da plataforma",
              "Escopo efetivamente contratado",
            ],
          },
        ],
      },
      {
        kind: "responsabilidades",
        id: "responsabilidades",
        titulo: "Quem responde por cada parte",
        cards: [
          {
            titulo: "Empresa",
            itens: [
              "Definir quais arquivos são essenciais",
              "Autorizar acessos e alterações",
              "Manter credenciais e contas ativas",
              "Indicar o responsável interno",
              "Comunicar mudanças no ambiente",
            ],
          },
          {
            titulo: "Técnico",
            itens: [
              "Configurar dentro do escopo autorizado",
              "Registrar limitações encontradas",
              "Testar a restauração quando contratado",
              "Orientar sobre riscos observados",
            ],
          },
          {
            titulo: "Fornecedor externo",
            itens: [
              "Disponibilidade da plataforma",
              "Armazenamento e capacidade contratada",
              "Conta, licença e políticas próprias",
              "Recuperação interna da própria plataforma",
            ],
          },
        ],
      },
      {
        kind: "limites",
        id: "limites-backup",
        titulo: "Limites declarados",
        listas: [
          {
            titulo: "O que não fazemos",
            itens: [
              "Não oferecemos armazenamento ilimitado nem armazenamento próprio",
              "Não prometemos proteção absoluta dos dados",
              "Não entregamos conformidade automática com norma ou regulamento",
              "Não garantimos recuperação de dados já perdidos",
              "Não monitoramos as rotinas de forma contínua sem contratação específica",
              "Não respondemos por credencial perdida em plataforma de terceiros",
            ],
          },
        ],
      },
    ],
  },

  // ── PÁGINA 3 — REDES E WI-FI (PÚBLICO MISTO) ──────────────────
  "redes-e-wifi": {
    tocExtra: [
      { id: "contextos-rede", label: "Em casa e no escritório" },
      { id: "pilares-rede", label: "Cobertura, capacidade e estabilidade" },
      { id: "cobertura-velocidade", label: "Cobertura não é velocidade" },
      { id: "operadora", label: "O que depende da operadora" },
      { id: "impressoras-rede", label: "Impressoras em rede" },
    ],
    secoes: [
      {
        kind: "contextos",
        id: "contextos-rede",
        titulo: "Em casa, no home office ou no escritório",
        intro:
          "O atendimento de rede vale tanto para residências e home office quanto para escritórios e pequenas empresas. O que muda é o ambiente e a quantidade de dispositivos.",
        cards: [
          {
            titulo: "Em casa ou home office",
            itens: [
              "Cobertura fraca em cômodos distantes",
              "Quedas durante o uso",
              "Roteador antigo ou mal posicionado",
              "Interferência de outros aparelhos",
              "Muitos dispositivos conectados",
              "Chamadas de vídeo instáveis",
            ],
            link: { label: "Ver suporte para home office", to: "/servicos/suporte-home-office" },
          },
          {
            titulo: "No escritório ou empresa",
            itens: [
              "Vários usuários simultâneos",
              "Impressoras compartilhadas em rede",
              "Compartilhamento de pastas e arquivos",
              "Pontos de acesso em ambientes maiores",
              "Cabeamento e organização do rack",
              "Continuidade do trabalho durante o dia",
            ],
            link: {
              label: "Ver suporte técnico empresarial",
              to: "/servicos/suporte-tecnico-empresarial",
            },
          },
        ],
      },
      {
        kind: "pilares",
        id: "pilares-rede",
        titulo: "O que avaliamos na rede",
        cards: [
          { titulo: "Cobertura", texto: "Até onde o sinal alcança em cada ambiente do local." },
          {
            titulo: "Capacidade",
            texto: "Quantidade de dispositivos conectados e uso simultâneo em horário de pico.",
          },
          {
            titulo: "Estabilidade",
            texto: "Quedas de conexão, interferência e comportamento da rede ao longo do dia.",
          },
          {
            titulo: "Infraestrutura",
            texto: "Roteadores, pontos de acesso, cabeamento e posicionamento dos equipamentos.",
          },
        ],
      },
      {
        kind: "limites",
        id: "cobertura-velocidade",
        titulo: "Cobertura não é velocidade",
        destaque:
          "Sinal forte não significa plano rápido, e plano rápido não significa boa cobertura em todos os cômodos.",
        listas: [
          {
            titulo: "O que influencia o resultado",
            itens: [
              "Distância entre o dispositivo e o roteador",
              "Paredes, estruturas metálicas e interferência de outros aparelhos",
              "Idade e capacidade do equipamento instalado",
              "Quantidade de dispositivos usando a rede ao mesmo tempo",
              "Posicionamento do roteador e dos pontos de acesso",
              "O link externo contratado, que segue sob responsabilidade da operadora",
            ],
          },
        ],
      },
      {
        kind: "duas-colunas",
        id: "operadora",
        titulo: "O que verificamos e o que depende da operadora",
        colunas: [
          {
            titulo: "Podemos verificar",
            itens: [
              "Rede local e organização dos equipamentos",
              "Wi-Fi, canais e cobertura por ambiente",
              "Cabos e conexões internas",
              "Roteador e pontos de acesso",
              "Dispositivos conectados",
              "Configuração da rede interna",
            ],
          },
          {
            titulo: "Depende da operadora",
            itens: [
              "Disponibilidade do link contratado",
              "Sinal externo até o imóvel",
              "Autenticação junto ao provedor",
              "Manutenção da rede externa",
              "Velocidade contratada efetivamente entregue",
            ],
          },
        ],
        nota:
          "Quando a causa está fora da rede interna, registramos o que foi verificado para você acionar a operadora. Falha externa não é resolvida por nós.",
      },
      {
        kind: "limites",
        id: "impressoras-rede",
        titulo: "Impressoras e periféricos em rede",
        destaque:
          "O atendimento de impressoras e periféricos se limita à configuração, comunicação e compartilhamento em rede. Defeitos mecânicos ou eletrônicos dependem de assistência específica para o equipamento.",
        listas: [
          {
            titulo: "Fazemos",
            itens: [
              "Instalação do driver oficial do fabricante",
              "Endereço IP e descoberta na rede",
              "Fila de impressão e reconexão",
              "Compartilhamento entre computadores",
              "Scanner em rede, quando o equipamento é compatível",
            ],
          },
          {
            titulo: "Não fazemos",
            itens: [
              "Cabeçote, fusor e partes mecânicas",
              "Tinta, toner e recarga",
              "Reparo eletrônico do equipamento",
              "Manutenção mecânica da impressora",
            ],
          },
        ],
      },
    ],
  },
};

/** CTA intermediário próprio de cada página (mesmo fluxo de triagem). */
export const CTA_3T = {
  "manutencao-preventiva-empresas": {
    titulo: "Quer mapear os riscos antes da próxima parada?",
    texto:
      "Descreva os equipamentos da empresa e o uso de cada um. A partir daí combinamos o escopo da inspeção.",
    label: "Descrever os equipamentos da empresa",
  },
  "backup-para-empresas": {
    titulo: "Sua cópia atual já foi testada?",
    texto:
      "Conte como os arquivos são armazenados hoje e quem responde por eles. A partir daí avaliamos a estratégia de cópias.",
    label: "Descrever como os arquivos são armazenados",
  },
  "redes-e-wifi": {
    titulo: "Quer entender o que está travando a sua rede?",
    texto:
      "Descreva o ambiente, a quantidade de dispositivos e onde o sinal falha — em casa ou no escritório.",
    label: "Descrever o ambiente da rede",
  },
};

export default BLOCOS_3T;
