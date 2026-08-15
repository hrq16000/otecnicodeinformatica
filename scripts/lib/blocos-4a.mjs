// ─────────────────────────────────────────────────────────────
// RODADA 4A — DOMINAÇÃO COMERCIAL DAS VERTICAIS TV + PLACAS
//
//   • /servicos/conserto-tv     → aquisição (processo premium visível)
//   • /servicos/conserto-placa  → autoridade técnica (nível de componente)
//
// Fonte única compartilhada entre o React (src/lib/blocos4a.ts) e o HTML
// estático (scripts/curated-static-body.mjs). Paridade validada por
// scripts/check-premium-tv-board-4a.mjs.
//
// Regra zero desta rodada: nenhuma URL nova, nenhuma página de monitor,
// áudio, marca, BGA, reballing ou sintoma. Nenhum prazo, preço novo,
// taxa de sucesso, contador de reparos ou promessa universal de reparo.
// Garantia sempre com escopo explícito (mão de obra / ponto reparado).
// ─────────────────────────────────────────────────────────────

/** Escopo fechado — exatamente duas páginas. */
export const BLOCOS_4A_PATHS = ["/servicos/conserto-tv", "/servicos/conserto-placa"];

export const BLOCOS_4A = {
  // ── TV / SMART TV — AQUISIÇÃO ────────────────────────────────
  "/servicos/conserto-tv": {
    eyebrow: "Eletrônicos — TV e Smart TV",
    resumo: [
      { label: "Diagnóstico", value: "Eletrônico, em bancada, com o aparelho aberto" },
      { label: "Reparo", value: "Em nível de componente quando o caso permitir" },
      { label: "Logística", value: "Coleta e entrega conforme avaliação logística" },
      { label: "Execução", value: "Somente após autorização do escopo encontrado" },
    ],
    tocExtra: [
      { id: "avaliacao-tv", label: "O que pode ser avaliado" },
      { id: "reparar-ou-trocar", label: "Reparar ou substituir a placa?" },
      { id: "painel-tv", label: "E quando o problema está no painel?" },
      { id: "coleta-tv", label: "Coleta e entrega passo a passo" },
      { id: "teste-final-tv", label: "O que é verificado depois do reparo" },
      { id: "garantia-tv", label: "Garantia e o que ela cobre" },
    ],
    secoes: [
      {
        kind: "responsabilidades",
        id: "avaliacao-tv",
        titulo: "O que pode ser avaliado em uma TV ou Smart TV",
        intro:
          "A lista abaixo organiza o que entra em avaliação de bancada, por grupo de origem. Ela não substitui diagnóstico: o mesmo sintoma pode ter causas diferentes, e a definição só existe com o aparelho aberto e medido.",
        cards: [
          {
            titulo: "Energia",
            itens: [
              "Aparelho não liga e não reage ao controle nem ao botão físico",
              "Liga e desliga sozinho depois de alguns segundos ou minutos",
              "Estágio de fonte com saída fora do esperado",
              "Alimentação das demais placas interrompida ou instável",
            ],
          },
          {
            titulo: "Imagem",
            itens: [
              "Tela escura com som funcionando normalmente",
              "Imagem muito fraca, visível apenas contra a luz",
              "Conjunto de iluminação interna e o circuito que o alimenta",
              "Falha intermitente que aparece e some com o tempo de uso",
            ],
          },
          {
            titulo: "Placas",
            itens: [
              "Placa fonte",
              "Placa principal",
              "Circuitos e estágios internos das placas",
              "Conectores, chicotes e pontos de contato",
            ],
          },
          {
            titulo: "Conectividade",
            itens: [
              "Entradas HDMI sem imagem em todas as fontes",
              "Wi-Fi da TV sem conexão associado a defeito eletrônico",
              "Inicialização que não completa e trava na tela da marca",
              "Funções Smart afetadas pelo defeito em avaliação",
            ],
          },
        ],
      },
      {
        kind: "fluxo",
        id: "reparar-ou-trocar",
        titulo: "Reparar ou substituir a placa?",
        passos: [
          "Diagnóstico com o aparelho aberto e medição dos estágios envolvidos",
          "Identificação da falha e do ponto exato em que o circuito para de funcionar",
          "Avaliação de reparo localizado: componente disponível, acesso seguro e condição da placa",
          "Comparação com a substituição do módulo completo, considerando disponibilidade e condição do aparelho",
          "Autorização do caminho escolhido antes de qualquer execução",
        ],
        nota:
          "A substituição completa de uma placa não é automaticamente a primeira opção. Quando o defeito localizado pode ser reparado de forma tecnicamente adequada, o reparo em nível de componente pode ser considerado. Nem todo defeito permite esse caminho — a definição vem da avaliação, não da promessa.",
      },
      {
        kind: "limites",
        id: "painel-tv",
        titulo: "E quando o problema está no painel?",
        destaque:
          "Painel e display são avaliados separadamente. Dependendo do modelo e da disponibilidade da peça, a substituição pode não apresentar viabilidade econômica.",
        listas: [
          {
            titulo: "Por que painel é diferente de placa",
            itens: [
              "O painel é a parte física que forma a imagem, não um circuito reparável ponto a ponto",
              "Trinca, marca de impacto e mancha de pressão são dano físico, sem reparo em bancada",
              "Defeito interno de linha ou de camada pertence à estrutura do painel",
              "O transporte de painel tem risco próprio: pressão e torção agravam o dano",
            ],
          },
          {
            titulo: "O que informamos antes da coleta",
            itens: [
              "Quando a descrição já indica dano de painel, isso é dito na triagem",
              "Disponibilidade da peça depende do modelo e pode não existir no mercado",
              "Quando o custo se aproxima do valor do aparelho, dizemos que não compensa",
              "Painel não está coberto pela garantia do serviço executado nas placas",
            ],
          },
        ],
      },
      {
        kind: "fluxo",
        id: "coleta-tv",
        titulo: "Coleta e entrega de TV passo a passo",
        passos: [
          "1. Identificação da TV: marca, modelo e tamanho aproximado informados na triagem",
          "2. Sintoma: o que acontece ao ligar e desde quando",
          "3. Condições de acesso: andar, elevador, escada e espaço para retirada",
          "4. Registro do estado do aparelho antes de sair do endereço",
          "5. Acessórios conferidos: base ou pés, controle, cabo de força e cabos ligados",
          "6. Coleta com apoio e proteção adequados ao tamanho do aparelho",
          "7. Recebimento na bancada com conferência do que foi registrado na origem",
          "8. Diagnóstico com o aparelho aberto e medição dos estágios",
          "9. Autorização: escopo encontrado e valor informados antes da execução",
          "10. Reparo dentro do escopo autorizado",
          "11. Testes das funções relacionadas ao defeito tratado",
          "12. Devolução com registro do serviço executado e dos componentes substituídos",
        ],
        nota:
          "Quando operacionalmente aplicável, o registro de entrada inclui marca, modelo, tamanho aproximado, número de série, estado do painel, riscos e avarias visíveis, pés ou base, controle, cabo, demais acessórios, sintoma relatado e fotos do estado de recebimento.",
      },
      {
        kind: "pilares",
        id: "teste-final-tv",
        titulo: "O que é verificado depois do reparo",
        intro:
          "A verificação final cobre as funções relacionadas ao defeito tratado e ao que foi manipulado na bancada. Não afirmamos revisão integral do aparelho: verificação sem escopo declarado não significa nada.",
        cards: [
          { titulo: "Inicialização", texto: "Ligações repetidas, incluindo partida a frio depois de período desligado." },
          { titulo: "Imagem e som", texto: "Presença, estabilidade e comportamento das funções afetadas pelo defeito." },
          { titulo: "Entradas e conectividade", texto: "Entradas utilizadas no diagnóstico e conexão de rede quando o defeito envolvia esse ponto." },
          { titulo: "Estabilidade", texto: "Período de funcionamento contínuo em bancada antes da devolução." },
        ],
      },
      {
        kind: "limites",
        id: "garantia-tv",
        titulo: "Garantia do conserto de TV e o que ela cobre",
        destaque:
          "90 dias de garantia sobre a mão de obra do serviço executado e sobre o ponto reparado, contados da entrega.",
        listas: [
          {
            titulo: "Dentro da garantia",
            itens: [
              "O defeito tratado, dentro do escopo autorizado",
              "A mão de obra do reparo executado",
              "O ponto reparado na placa",
              "Componente fornecido por nós no mesmo serviço",
            ],
          },
          {
            titulo: "Fora da garantia",
            itens: [
              "Falha diferente, em outro ponto do aparelho, surgida depois da entrega",
              "Evento posterior: nova oscilação elétrica, surto, raio, queda ou infiltração",
              "Manipulação posterior por terceiros ou abertura fora da nossa bancada",
              "Painel e display, que não são peças reparadas por nós",
            ],
          },
        ],
      },
    ],
  },

  // ── PLACAS ELETRÔNICAS — AUTORIDADE TÉCNICA ──────────────────
  "/servicos/conserto-placa": {
    eyebrow: "Bancada eletrônica — nível de componente",
    resumo: [
      { label: "Diagnóstico", value: "Em nível de componente, com instrumentação de bancada" },
      { label: "Intervenção", value: "Retrabalho eletrônico avançado quando indicado" },
      { label: "Recebimento", value: "Placa avulsa ou equipamento completo" },
      { label: "Critérios", value: "Aceite, validação e recusa informados antes" },
    ],
    tocExtra: [
      { id: "niveis-intervencao", label: "Níveis de intervenção" },
      { id: "placa-avulsa", label: "Posso enviar somente a placa?" },
      { id: "aceite-recusa", label: "Aceite, avaliação limitada e recusa" },
      { id: "placas-manipuladas", label: "Placas já manipuladas" },
      { id: "validacao-placa", label: "Validação e teste final" },
      { id: "garantia-placa", label: "Garantia e o que ela cobre" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "niveis-intervencao",
        titulo: "Três níveis de intervenção",
        intro:
          "O nível não é escolhido por preferência: ele decorre do defeito encontrado, da condição da placa e do que pode ser validado depois. O caminho definido é informado antes da execução.",
        cards: [
          {
            titulo: "N1 — módulo",
            texto:
              "Substituição de conjunto quando essa for a saída tecnicamente mais adequada ou economicamente melhor para o caso.",
          },
          {
            titulo: "N2 — componente",
            texto:
              "Intervenção localizada no ponto que falhou, mantendo o restante do circuito original da placa.",
          },
          {
            titulo: "N3 — retrabalho avançado",
            texto:
              "Retrabalho eletrônico avançado, aplicado somente quando o diagnóstico justificar e a placa apresentar condição para isso.",
          },
        ],
        nota:
          "Não divulgamos parâmetros de bancada nem tratamos técnica de retrabalho como produto de catálogo. O que é comunicado é o defeito, o caminho proposto, o que pode ser validado e o que fica fora.",
      },
      {
        kind: "duas-colunas",
        id: "placa-avulsa",
        titulo: "Posso enviar somente a placa?",
        destaque:
          "Sim, em determinados casos. Mas algumas placas não podem ser completamente validadas fora do equipamento de origem.",
        colunas: [
          {
            titulo: "Placa avulsa é viável quando existe",
            itens: [
              "Identificação da placa: marca, modelo e revisão quando impressa",
              "Sintoma descrito, com o comportamento observado no equipamento",
              "Origem conhecida: de qual aparelho a placa saiu",
              "Possibilidade de teste do estágio afetado fora do equipamento",
            ],
          },
          {
            titulo: "Equipamento completo quando dependemos de",
            itens: [
              "Display ou painel para confirmar o resultado",
              "Alimentação específica do próprio aparelho",
              "Periférico, chicote ou conector que só existe no equipamento",
              "Módulo pareado, firmware ou condição específica do conjunto de origem",
            ],
          },
        ],
        nota:
          "Quando a validação depender do equipamento de origem, isso é informado antes: preferimos declarar a limitação a devolver uma placa com reparo que não pôde ser comprovado.",
      },
      {
        kind: "limites",
        id: "aceite-recusa",
        titulo: "Aceite, avaliação limitada e recusa",
        destaque:
          "Os critérios abaixo são informados antes da coleta ou do envio. Cada caso depende da inspeção — usamos pode e depende porque a definição vem da avaliação.",
        listas: [
          {
            titulo: "Candidata a diagnóstico",
            itens: [
              "Origem conhecida do equipamento",
              "Identificação legível da placa",
              "Sintoma descrito de forma verificável",
              "Inspeção visual e ampliada possível",
              "Condições mínimas de teste do estágio afetado",
            ],
          },
          {
            titulo: "Pode ter avaliação limitada",
            itens: [
              "Reparo anterior feito por terceiro",
              "Histórico incompleto do defeito ou do que já foi trocado",
              "Componente ou peça rara, com fornecimento incerto",
              "Dano parcial que reduz o que pode ser comprovado",
              "Ausência do equipamento de origem para validação final",
            ],
          },
          {
            titulo: "Pode ser recusada",
            itens: [
              "Carbonização extensa da placa",
              "Corrosão severa por líquido ou umidade prolongada",
              "Camadas internas destruídas ou trilhas irrecuperáveis",
              "Placa não identificável",
              "Dano estrutural da placa",
              "Intervenção anterior que inviabiliza o reparo",
              "Ausência total de condição de teste",
            ],
          },
        ],
      },
      {
        kind: "pilares",
        id: "placas-manipuladas",
        titulo: "Placas já manipuladas por outro reparo",
        intro:
          "Placas previamente reparadas podem ser avaliadas, mas o histórico de intervenção influencia a complexidade do diagnóstico e as condições de garantia. Quando você souber, informe os pontos abaixo na triagem.",
        cards: [
          { titulo: "Reparo anterior", texto: "O que já foi feito na placa e por quem, quando essa informação existir." },
          { titulo: "Componentes trocados", texto: "Quais peças foram substituídas e se houve emenda ou reforço." },
          { titulo: "Sintoma original", texto: "O comportamento que motivou o primeiro atendimento." },
          { titulo: "Sintoma atual", texto: "O que o equipamento apresenta hoje, depois da intervenção anterior." },
        ],
        nota:
          "Equipamento usado anteriormente na tentativa de reparo também é informação útil: ela evita repetir caminho já descartado e reduz o tempo de bancada.",
      },
      {
        kind: "pilares",
        id: "validacao-placa",
        titulo: "Validação e teste final da placa",
        intro:
          "O escopo do teste depende do que pode ser comprovado no caso concreto — com a placa avulsa ou com o equipamento de origem. O que foi verificado é declarado; o que não pôde ser verificado também.",
        cards: [
          { titulo: "Estágio reparado", texto: "Medição do ponto tratado e confirmação de que o circuito voltou ao comportamento esperado." },
          { titulo: "Função afetada", texto: "Verificação da função que estava comprometida, dentro do que a bancada permite." },
          { titulo: "Estabilidade", texto: "Período de funcionamento contínuo antes da devolução, quando há condição de teste." },
          { titulo: "Limite declarado", texto: "Quando a validação completa depende do equipamento de origem, isso consta no registro do atendimento." },
        ],
      },
      {
        kind: "limites",
        id: "garantia-placa",
        titulo: "Garantia do reparo de placa e o que ela cobre",
        destaque:
          "90 dias de garantia sobre a mão de obra do serviço executado e sobre o ponto reparado, contados da entrega.",
        listas: [
          {
            titulo: "Dentro da garantia",
            itens: [
              "O defeito tratado, dentro do escopo autorizado",
              "A mão de obra do reparo executado",
              "O ponto reparado na placa",
              "Componente fornecido por nós no mesmo serviço",
            ],
          },
          {
            titulo: "Fora da garantia",
            itens: [
              "Falha diferente, em outro estágio da placa, surgida depois da entrega",
              "Evento posterior: surto, raio, líquido, queda ou aquecimento por causa externa",
              "Manipulação posterior por terceiros",
              "Casos com validação limitada declarada, nos limites registrados no atendimento",
            ],
          },
        ],
      },
    ],
  },
};

/** CTA intermediário por página (mesmo fluxo de triagem, sem modal novo). */
export const CTA_4A = {
  "/servicos/conserto-tv": {
    titulo: "Sua TV apresenta algum desses sintomas?",
    texto:
      "Descreva marca, modelo, tamanho e o que acontece ao ligar. A triagem indica se o caso é candidato à avaliação em bancada e como funciona a coleta.",
    label: "Descrever o problema da TV",
  },
  "/servicos/conserto-placa": {
    titulo: "Tem uma placa com defeito para avaliar?",
    texto:
      "Descreva a placa, o equipamento de origem e o sintoma. A triagem indica se ela é candidata a diagnóstico e se o equipamento completo é necessário para validar o reparo.",
    label: "Descrever a placa e o defeito",
  },
};

/** Contexto de triagem esperado por página (sem criar campo novo). */
export const CONTEXTO_4A = {
  "/servicos/conserto-tv": { service: "conserto-tv", equipment: "tv", source: "servico-conserto-tv" },
  "/servicos/conserto-placa": { service: "conserto-placa", source: "servico-conserto-placa" },
};

export default BLOCOS_4A;
