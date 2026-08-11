# RODADA 4I-Q — Auditoria premium de conversão e confiança

Somente leitura. Zero alteração de produto.

## 1. HEAD

- Commit: `99f155afd3d1334edbcd75e2abb73c2a8b41ff0e`
- Branch: `edit/edt-7100fc53-4126-41e8-9414-94334bf28443`
- Data/hora da auditoria: 2026-08-11 04:29 UTC (01:29 America/Sao_Paulo)

## 2. Git (entrada)

```
git status --short   → (vazio)
git diff --stat      → (vazio)
```

Working tree limpo antes da auditoria.

## 3. Rotas auditadas

Renderização real (dev server) em 1440×900 e 390×844, todas HTTP 200:

`/`, `/servicos`, `/sobre`, `/como-funciona`, `/precos-e-politicas`, `/faq`, `/contato`,
`/areas-atendidas`, `/atendimento-domicilio`, `/atendimento-remoto`, `/coleta-e-entrega`,
`/empresa-de-ti-curitiba`, `/servicos/suporte-tecnico-empresarial`, `/servicos/formatacao` (fluxo de funil).

Nenhum slug inventado. Verticais congeladas (TV, placas, monitor) não foram auditadas nem tocadas.

## 4. Home — primeira dobra

| Elemento | 1440×900 | 390×844 |
|---|---|---|
| Badge | "Atuação em informática desde 1998 · Assistência técnica em Curitiba" | igual |
| H1 | "Soluções para computador, notebook, Wi-Fi e empresas" | igual (3 linhas) |
| Subtítulo | "Escolha o serviço que precisa, entenda como funciona o atendimento e envie as informações pelo WhatsApp para iniciar a triagem." | igual |
| CTA primário | "Iniciar atendimento" | visível acima da dobra |
| CTA secundário | "Ver serviços" | visível |
| Linha de contexto | "Atendimento em Curitiba e região · Diagnóstico a partir de R$ 99,99 · Sem promessa falsa" | parcialmente coberta pelo banner de cookies |
| Atalhos de serviço | 8 chips + "Ver todos os serviços" | 4 chips (restante oculto por design 3P) e cobertos pelo banner |
| Prova | nenhuma prova visual na dobra (chips são claims/processo) | idem |

Em até 5 segundos o visitante entende: quem somos (marca + informática), onde atendemos (Curitiba e região),
o que resolvemos (PC/notebook/Wi-Fi/empresas) e o próximo passo (Iniciar atendimento).

**Classificação: CLARO** no desktop; **PARCIAL** no mobile — o banner de cookies ocupa ~40% da dobra e
esconde contexto geográfico, faixa de preço e chips (o CTA primário permanece visível e clicável).

## 5. Posicionamento

O que a home realmente comunica: **SERVIÇO LOCAL** de informática com camada institucional
(processo + transparência), levemente inclinado a **TÉCNICO DE INFORMÁTICA**.

Estratégia aprovada após a 4I-P.2: home = portal local amplo; `/tecnico-informatica-curitiba` = informática específica.

Divergência: o H1 da home ainda nomeia equipamentos de informática ("computador, notebook, Wi-Fi"),
enquanto title/description já foram ampliados. Divergência **baixa e não bloqueante** — o gate
`check:cannibalization` passa. Registrada, não corrigida.

## 6. Diferenciação

| Item exibido | Classificação |
|---|---|
| "Atuação em informática desde 1998" | PROMESSA/declaração (não prova externa) |
| "Diagnóstico honesto" | CLAIM GENÉRICO |
| "Preço aprovado antes do reparo" | PROCESSO (diferencial real quando cumprido) |
| "Atendimento local e direto" | CLAIM GENÉRICO |
| "Sem promessa falsa" | CLAIM |
| "Diagnóstico a partir de R$ 99,99" | PROCESSO/oferta transparente |
| Chips de serviço (8) | NAVEGAÇÃO |
| HeroTrustBanner (valor aprovado antes de qualquer execução) | PROCESSO |

Sem a logo, a primeira dobra **PARCIALMENTE** poderia pertencer a qualquer assistência: o único elemento
difícil de copiar (transparência de preço-antes-do-reparo) aparece em texto, não em prova.

## 7. Confiança

| Sinal | Estado |
|---|---|
| Processo de atendimento | VISÍVEL (`/como-funciona`, 7 etapas) |
| Diagnóstico | VISÍVEL |
| Autorização antes de executar | VISÍVEL (hero + preços) |
| Garantia delimitada (90 dias mão de obra do ponto reparado) | VISÍVEL, porém ENTERRADO na home |
| Critérios de aceite | VISÍVEL no funil (CriteriosAceiteCard) |
| Critérios de recusa | ENTERRADO (`/sobre` — bloco "o que não prometemos") |
| Políticas / privacidade / cookies | VISÍVEL (footer + banner) |
| Empresa/entidade | PARCIAL: gestor responsável existe, sem CNPJ/endereço (governança 4G) |
| Atendimento local | VISÍVEL |
| Bancada | ENTERRADO (BancadaRealSection fora da home) |
| Coleta | VISÍVEL (`/coleta-e-entrega`) |
| Nota fiscal | VISÍVEL em `/precos-e-politicas` e `/como-funciona` |

## 8. Provas

| Item | Classificação |
|---|---|
| Fotos de pontos turísticos no hero | ILUSTRAÇÃO |
| Fotos de bancada/componentes (RealImageSection, 124 imagens no sitemap de imagens) | ILUSTRAÇÃO/PROVA REAL conforme crédito em `src/lib/imageCredits.ts` — as de banco permanecem ILUSTRAÇÃO |
| Casos técnicos reais (`technicalCases`) | PROVA REAL (declarada, sem mídia externa) |
| "desde 1998" | CLAIM declaratório |
| Reviews/estrelas | AUSENTE (correto — nada fabricado) |
| Logos de marcas atendidas | ILUSTRAÇÃO |
| Números agregados de atendimento | AUSENTE |
| Processo documentado | PROVA de contrato, não operacional |

## 9. Gap de prova (máx. 5)

1. "Atuação em informática desde 1998" na dobra — sem qualquer artefato verificável associado.
2. "Preço aprovado antes do reparo" — nenhuma evidência de OS/orçamento real anonimizado na home.
3. "Diagnóstico a partir de R$ 99,99" — sem exemplo de caso com valor final vs. estimativa.
4. Garantia de 90 dias — sem documento/termo visual anexado ao claim na home.
5. Bancada e coleta — descritas em texto; fotos existem no site, mas não junto do claim principal.

## 10. Hub `/servicos`

- Catálogo compreensível: sim; agrupado com títulos + subtítulos curtos.
- Excesso de opções: há muitos cartões e blocos secundários (Como funciona, Equipamentos, Coleta, Quando não compensa, Casos reais, Contato) competindo com o catálogo em si.
- Priorização: os 8 serviços principais aparecem, mas com peso visual semelhante ao dos blocos institucionais.
- Cards com importância aparentemente igual: sim.
- Escolha sem termo técnico: parcialmente ("Upgrade SSD/RAM" exige familiaridade).
- Confusão residencial × empresarial: baixa — "Suporte empresarial" está sinalizado.
- Rotas congeladas com destaque desproporcional: **não** — TV/placas/monitor não dominam o hub.
- **Achado técnico**: `/servicos` renderiza **sem landmark `<main>`** (todas as demais rotas prioritárias têm). Regressão pontual em relação à correção da Rodada 3W.

## 11. Arquitetura de decisão

Modelos presentes: SERVIÇO (dominante), EQUIPAMENTO (secundário), PROBLEMA (páginas de sintoma),
MODALIDADE (domicílio/remoto/coleta), TIPO DE CLIENTE (PF/PJ no funil).

Modelo dominante: **SERVIÇO**.
Mais natural para leigo: **PROBLEMA** ("não liga", "está lento"). O caminho por problema existe,
mas não é a entrada primária da home. Registrado, não implementado.

## 12. `/como-funciona`

Cobre contato, triagem, diagnóstico, coleta/visita, autorização, execução, teste, garantia e devolução.
Lacunas: prazo de devolução aparece de forma qualitativa; teste final é citado sem checklist visível.
Nenhuma promessa desalinhada da operação foi identificada.

## 13. `/precos-e-politicas`

Transparência alta (visita, coleta, pré-aprovação, peças, materiais do cliente, desistência, garantia,
prazo, modalidades, pagamento e nota fiscal), com custo de **complexidade**: página longa com 6 âncoras.
Resposta: **sim**, o cliente consegue entender o que pode ser cobrado antes de abrir o WhatsApp,
desde que role até a tabela — a informação de entrada (R$ 99,99) já aparece na home e no hero.

## 14. Consistência comercial

| Termo | Onde | Consistente? |
|---|---|---|
| R$ 99,99 | home (hero), `/contato` (title+H1), `PricingBanner`, `/precos-e-politicas` | Sim no valor; **divergente na moldura** — home diz "a partir de", `/contato` exibe "WhatsApp hoje · R$ 99,99" sem qualificador |
| R$ 99 (sem centavos) | não encontrado | — |
| R$ 299 / 299,99 | não encontrado | Sim (inexistente) |
| grátis/gratuito/sem custo | ~20 arquivos, sempre ligado a "estimativa/orçamento pelo WhatsApp" | Sim |
| orçamento | 1 ocorrência (`AssistenciaTecnicaCuritiba.tsx`) | Dívida conhecida (vertical congelada), já registrada na 4I-P.2 |
| diagnóstico | uso uniforme | Sim |

Divergência nova: apenas a moldura de preço em `/contato`.

## 15. Garantia

Fonte única: `politicaComercial.ts` — "90 dias de garantia sobre a mão de obra do serviço executado";
`fichaComercial.ts` reforça "cobre a mão de obra do ponto reparado, não o aparelho inteiro".
Classificação: **CORRETO** nas fontes canônicas. Nenhuma generalização encontrada nas rotas institucionais.

## 16. Prazos

- "48h" (ServicesSection) → PRAZO OPERACIONAL declarado.
- "24 horas" (TermosConteudo) → PRAZO CONTRATUAL.
- "72h" (painel admin de reviews) → interno, não público.
- "imediato" em `PrecosEPoliticas` e `EmpresaConversao` → linguagem, não prazo.
- "atendimento imediato" em `problemaPagesData` (páginas de problema, indexáveis) → **CLAIM PROMOCIONAL** sem lastro operacional.

Conflito real: nenhum entre prazos numéricos; risco reside no claim "atendimento imediato".

## 17. CTAs

| CTA | Página | Ação real | Abre funil? | Contexto preservado? |
|---|---|---|---|---|
| Iniciar atendimento | `/` (hero e header) | intercepta e abre triagem | Sim | Sim (origem + CTA location) |
| Ver serviços | `/` | navega `/servicos` | Não | n/a |
| Iniciar atendimento no WhatsApp | `/servicos`, `/precos-e-politicas` | triagem | Sim | Sim |
| Chamar no WhatsApp | `/como-funciona`, `/contato` | triagem | Sim | Sim |
| Verificar atendimento em domicílio | `/atendimento-domicilio` | triagem | Sim | Sim |
| Verificar se o atendimento remoto é adequado | `/atendimento-remoto` | triagem | Sim | Sim |
| Agendar Coleta | `/coleta-e-entrega` | triagem/formulário | Sim | Sim |
| Conversar sobre a estrutura de TI | `/empresa-de-ti-curitiba` | triagem PJ | Sim | Sim |
| Falar sobre o suporte da empresa | `/servicos/suporte-tecnico-empresarial` | triagem PJ | Sim | Sim |
| Fale com Técnico (float) | todas | triagem + toast | Sim | Sim |

Nenhum CTA quebrado. Zero links `tel:` (conforme regra de contato exclusivo por WhatsApp).

## 18. Fricção

| Fluxo | Cliques até WhatsApp | Passos | Campos | Tempo conceitual |
|---|---|---|---|---|
| HOME → WhatsApp | 1 clique + 7 etapas | 7 | ~6 obrigatórios (etapa 3) | 60–110 s |
| SERVIÇO → WhatsApp | 1 clique + 7 etapas | 7 | idem | 60–110 s |
| EMPRESA → WhatsApp | 1 clique + ramo PJ | 7 | nome + empresa + contexto | 70–120 s |

Classificação: **FRICÇÃO CONTROLADA**. A etapa 3 concentra 6 campos numa única tela (nome, bairro/cidade,
tipo, marca/modelo, estado de energia, objetivo) — é o ponto de maior peso cognitivo do funil.

## 19. Triagem

7 etapas, ordem lógica (público → equipamento → dados → sintoma → condições → revisão → saída).
Campos condicionais por equipamento funcionam. Dados coletados são úteis para deslocamento e orçamento.
Observação: marca/modelo poderia ser tratado depois sem perda de triagem — não alterado.

## 20. Contexto no WhatsApp

Mensagem final montada em `triageMachine.buildWhatsAppMessage` inclui: abertura personalizada
(nome/bairro/sintoma), confirmação de triagem, linhas rotuladas do resumo, **`*Página de origem:* <url>`**,
aceite das condições, observação adicional e linha de rastreio (categoria, sintoma, bairro, serviço).
Serviço, equipamento, problema, modalidade, cidade, bairro e origem estão contemplados conforme disponibilidade.
Nenhuma conversa real foi enviada.

## 21. `/contato`

Classificação: **INSTITUCIONAL NECESSÁRIA**, com sobreposição de CTAs.
Tem função própria (canal único, expectativa de resposta, links de política), mas o title e o H1
"Contato Técnico Curitiba · WhatsApp hoje · R$ 99,99" transformam a página em oferta e criam a
moldura de preço sem "a partir de".

## 22. `/sobre`

- HISTÓRIA: presente e sóbria.
- CLAIMS: "desde 1998" tratado como declaração do responsável (badge/`experienciaLabel`), **não** como prova externa — mantido correto.
- PROCESSO: 4 blocos (triagem, diagnóstico, valor aprovado, garantia).
- ENTIDADE: gestor responsável com bio; sem CNPJ/endereço.
- DIFERENCIAIS: bloco "o que não prometemos" (5 itens) — moat de honestidade, hoje enterrado.

## 23. FAQ

12 perguntas visíveis. Distribuição: PRÉ-VENDA (preço, prazo, garantia, regiões) 5; OPERACIONAL 4;
TÉCNICA 1; INSTITUCIONAL 2 (inclui "o número de WhatsApp fica visível no site?").
O FAQ reduz objeções reais; a orientação semântica existe, mas não domina.

## 24. Áreas atendidas

`/areas-atendidas` lista bairros de Curitiba e cidades da região (São José dos Pinhais, Pinhais, Colombo,
Araucária, Campo Largo etc.) com CTA contextual por região. O GBP planejado (Curitiba + São José dos Pinhais)
é subconjunto do atendimento real declarado — **consistente factualmente**, sem contradição.

## 25. Modalidades

| Rota | Diferença clara | Sobreposição |
|---|---|---|
| `/atendimento-domicilio` | visita presencial, equipamentos que não podem sair | — |
| `/atendimento-remoto` | elegibilidade, sessão assistida, limites explícitos | leve com domicílio no bloco "o que não resolve remotamente" |
| `/coleta-e-entrega` | logística agendada, formulário próprio | leve com domicílio na promessa de conveniência |

Sobreposição semântica **baixa e controlada**; já monitorada como P2 desde a 4I-P.2 (similaridade 0.60 em title, abaixo do bloqueio).

## 26. Empresas

Público: micro e pequenas empresas de Curitiba com poucas estações e sem TI interna.
Problema resolvido: paradas de estação, rede instável, backup e previsibilidade.
Proposta diferenciada: sim (prioridade por impacto, chamado estruturado, NF).
NF/faturamento/SLA: descritos de forma factual, sem SLA numérico prometido.
Excesso de páginas dizendo o mesmo: risco moderado entre `/empresa-de-ti-curitiba` e
`/servicos/suporte-tecnico-empresarial` — diferenciação existe (hub vs. serviço), mas os blocos se repetem.
CTA contextualizado para empresa: sim.

## 27. Trust footer

Presentes: marca, domínio, políticas (privacidade, cookies/anúncios, preços e políticas), contato por WhatsApp,
área de atuação. **Ausentes por governança 4G**: endereço, CEP e CNPJ — confirmado que **não** estão publicados.
Sem exposição indevida → **não há P0 de entidade**.

## 28. Claims proibidos

Busca por "4.9", "5 estrelas", "mais bem avaliado", "nº 1", "melhor de Curitiba", "15.000", "milhares",
"atendimento imediato", "técnicos online":

- Zero avaliação/rating fabricado. `check:trust-claims` e `check:aggregate-rating` limpos.
- Ocorrências residuais de linguagem promocional: "solução nº 1 para computador lento" (legenda de imagem em
  `/servicos/computador-lento`), "atendimento imediato" (`problemaPagesData`, contexto PDV), "milhares" em
  textos editoriais descritivos. Nenhuma é claim de reputação; são **linguagem promocional**, registradas como P2.

## 29. Acessibilidade de conversão

- Labels: campos da triagem rotulados com marcação de obrigatoriedade.
- Foco: modal com foco inicial e botão de fechar acessível.
- Teclado: navegação funcional nos CTAs e no modal.
- Contraste: mantido conforme 3W (8.13:1 nos textos críticos).
- Mensagens de erro: presentes, com foco no primeiro campo incompleto.
- Botões desabilitados: "Continuar" desabilita até completar obrigatórios — comportamento correto, porém sem
  texto explicativo permanente do que falta.
- **Bloqueio real encontrado**: `/servicos` sem `<main>` (navegação por landmark prejudicada).
- Console: apenas warnings de `forwardRef` do React em dev; nenhum erro de runtime.

## 30. Performance percebida

Hero com `fetchpriority=high` e AVIF/WebP responsivos; sem layout shift perceptível nas dobras auditadas;
fontes carregam sem flash relevante; modal abre em <300 ms. Nenhum problema que afete a experiência real.

## 31. Paridade HTML × DOM

Nas rotas prioritárias: title, description, canonical, robots (`index, follow`), H1 único e JSON-LD presentes
e coerentes no DOM. Gates `check:meta-uniqueness` (235 rotas) e `check:soft404` (241 verificações) passam
sobre o `dist` construído. Sem divergência.

## 32. Concorrência (base: achados 4F-PRE)

Vantagens concorrentes ainda mais fortes que a nossa dentro do site:
1. **GBP com reviews** — nossa ausência é total (dependência externa 4I-M).
2. **Loja física** — concorrente exibe endereço; nós, por decisão SAB, não.
3. **Vídeo real de bancada** — não temos.
4. Tempo de mercado: empatado (declaratório de ambos os lados).
5. Autorização de fabricante: não aplicável.

Maior desvantagem visível: **GBP/reviews**.

## 33. Moats visíveis

| Moat | Existe | Visível ao cliente | Fácil de entender |
|---|---|---|---|
| Critérios de aceite/recusa | Sim | Parcial (dentro do funil e em `/sobre`) | Sim |
| Garantia delimitada | Sim | Parcial (não está na dobra) | Sim |
| Triagem estruturada | Sim | Sim (é o próprio funil) | Sim |
| Transparência de preço/políticas | Sim | Sim | Parcial (página longa) |
| Governança técnica (gates, telemetria) | Sim | Não | Não |

## 34. Problema principal

**PROVA.**

## 35. Score premium

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| Clareza | 15 | 13 | Dobra clara no desktop; mobile parcialmente coberto pelo banner |
| Confiança | 20 | 15 | Contrato forte, mas garantia/recusa fora da dobra |
| Prova visível | 15 | 7 | Nenhuma prova operacional na home; ilustrações dominam |
| Transparência | 15 | 14 | Preços/políticas completos e coerentes |
| Navegação | 10 | 7 | Hub por serviço, sem entrada por problema; `/servicos` sem `<main>` |
| Conversão | 10 | 8 | CTAs consistentes, funil íntegro, fricção controlada |
| Mobile | 10 | 8 | CTA acima da dobra preservado; banner rouba área útil |
| Consistência institucional | 5 | 4 | Moldura de preço divergente em `/contato` |
| **Total** | **100** | **76** | Infraestrutura invisível não pontuou |

## 36. Top 5 achados

1. **Ausência de prova operacional na primeira dobra da home** — evidência: screenshot 1440×900 e 390×844, nenhum artefato real acima da 2ª dobra; URL `/`; impacto: confiança/diferenciação; **P1**.
2. **`/servicos` sem landmark `<main>`** — evidência: DOM (`document.querySelector('main') === null`) nas duas viewports, enquanto 12 outras rotas têm; URL `/servicos`; impacto: acessibilidade de navegação; **P1**.
3. **Moldura de preço divergente em `/contato`** — evidência: title "Contato Técnico Curitiba | WhatsApp hoje R$ 99,99" e H1 idêntico, sem "a partir de"; URL `/contato`; impacto: expectativa comercial; **P1**.
4. **Banner de cookies cobre ~40% da dobra mobile** — evidência: screenshot 390×844 (contexto geográfico, faixa de preço e chips ocultos; CTA preservado); URL `/`; impacto: clareza mobile; **P2**.
5. **Linguagem promocional residual** ("atendimento imediato", "solução nº 1") — evidência: `problemaPagesData.ts:2284`, `ComputadorLento.tsx:116`; impacto: coerência com a política de não prometer; **P2**.

## 37. P0

**Nenhum P0.** Sem informação falsa, sem exposição indevida (CNPJ/endereço/CEP não publicados),
sem CTA ou funil quebrado, sem bloqueio mobile, sem divergência comercial grave.

## 38. P1

- Prova operacional ausente na dobra da home.
- `/servicos` sem `<main>`.
- Moldura de preço em `/contato` sem "a partir de".

## 39. P2

- Banner de cookies dominando a dobra mobile.
- Linguagem promocional residual em duas páginas de informática.
- Sobreposição parcial entre `/empresa-de-ti-curitiba` e `/servicos/suporte-tecnico-empresarial`.
- Ausência de entrada primária por problema na home.

## 40. Impacto × risco

| Oportunidade | Impacto | Risco no baseline | Esforço | Classificação |
|---|---|---|---|---|
| Restaurar `<main>` em `/servicos` | Médio | Nulo | Baixo | PODE AVANÇAR AGORA |
| Ajustar moldura de preço em `/contato` | Médio | Baixo (title/H1 institucional) | Baixo | PODE AVANÇAR AGORA |
| Elevar garantia delimitada para a dobra da home | Alto | Médio (mexe na home) | Médio | DEVE ESPERAR BASELINE |
| Publicar prova operacional real na home | Alto | Baixo | Médio | DEPENDE DE PROVA EXTERNA (4I-M) |
| Reduzir densidade da etapa 3 do funil | Médio | Alto (contamina baseline) | Médio | DEVE ESPERAR BASELINE |
| Entrada por problema na home | Médio | Alto | Alto | DEVE ESPERAR BASELINE |
| Qualquer mudança em TV/placas/monitor | — | — | — | DEVE ESPERAR BASELINE |

## 41. Top 3 possíveis próximas ações

1. **AÇÃO**: restaurar landmark `<main>` em `/servicos`. **EVIDÊNCIA**: DOM sem `<main>` nas duas viewports. **URL**: `/servicos`. **POR QUE AGORA**: regressão de acessibilidade já corrigida na 3W nas demais rotas. **RISCO**: nulo (estrutural, sem copy).
2. **AÇÃO**: alinhar title/H1 de `/contato` à moldura "a partir de R$ 99,99". **EVIDÊNCIA**: title e H1 atuais. **URL**: `/contato`. **POR QUE AGORA**: divergência comercial de leitura. **RISCO**: baixo — exige revalidar `check:meta-uniqueness` e `check:cannibalization`.
3. **AÇÃO**: reduzir a altura do banner de cookies no mobile (sem alterar consentimento nem telemetria). **EVIDÊNCIA**: screenshot 390×844. **URL**: `/`. **POR QUE AGORA**: recupera contexto geográfico e faixa de preço na dobra. **RISCO**: médio — toca a home; avaliar apenas em 4I-Q.1.

## 42. O que NÃO fazer

- Não criar novas páginas nem novos artigos.
- Não inventar prova, número, case ou depoimento.
- Não adicionar avaliações, estrelas ou `aggregateRating`.
- Não reduzir a triagem sem dados — a fricção atual é controlada e qualifica.
- Não transformar a home novamente em página de informática (reabriria a canibalização da 4I-P.2).
- Não expandir TV, placas ou monitor.
- Não alterar preços para competir.
- Não publicar endereço, CEP ou CNPJ nesta fase.
- Não mexer em tracking, telemetria, banco ou GBP.

## 43. Gates executados (somente leitura)

| Gate | Resultado |
|---|---|
| `build` | PASS |
| `check:cannibalization` | PASS — nenhuma canibalização entre páginas P0 |
| `check:meta-uniqueness` | PASS — 235 rotas com title/description únicos |
| `check:internal-links` | PASS — nenhum link quebrado |
| `check:sitemap-source` | PASS — sitemap derivado da fonte curada |
| `check:copy` (`forbidden-copy` + `trust-claims`) | PASS — nenhum claim não comprovável |
| `check:soft404` | PASS — 241 verificações |

Nenhum gate novo foi criado.

## 44. Git final

```
git status --short   → apenas docs/rodada-4i-q-auditoria-conversao-confianca.md (novo)
git diff -- src/     → (vazio)
git diff -- scripts/ → (vazio)
```

**ZERO ALTERAÇÃO DE APLICAÇÃO.**

## Perguntas obrigatórias

1. **A home já parece um portal premium ou ainda parece uma assistência genérica?**
   Está no meio: a estrutura é premium (contrato, transparência, navegação), mas a dobra ainda é
   textual e sem prova, então lida sem a logo ela **parcialmente** passaria por assistência genérica.

2. **Qual é o maior gap de confiança visível?**
   Prova operacional própria — todo o diferencial está afirmado em texto, nada é demonstrado.

3. **O funil possui fricção justificável ou desnecessária?**
   Justificável. As 7 etapas qualificam e alimentam a mensagem final com contexto real; o único ponto
   pesado é a densidade da etapa 3.

4. **Qual moat real está subutilizado na experiência?**
   A garantia delimitada somada aos critérios de recusa ("o que não prometemos"): honestidade rara no
   setor, hoje enterrada em `/sobre` e no interior do funil.

5. **Qual melhoria poderia aumentar confiança sem contaminar o baseline?**
   Corrigir a moldura de preço em `/contato` e restaurar o `<main>` em `/servicos` — ambas institucionais,
   fora do funil, sem tocar copy comercial das verticais.

## Decisão

**CAMADA INSTITUCIONAL TEM OPORTUNIDADES CIRÚRGICAS**

## Próximo passo

Abrir 4I-Q.1 com no máximo três alterações institucionais (`<main>` em `/servicos`, moldura de preço em
`/contato` e, se aprovado, altura do banner de cookies no mobile), sem tocar verticais congeladas, funil,
preço, schema ou telemetria. Prioridade permanece na execução humana da 4I-M (GBP, fotos reais, citations).
