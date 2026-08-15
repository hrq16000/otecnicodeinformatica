# RODADA 4I — Ativação externa controlada (GBP · fotos · citations · reviews)

Escopo: documentação operacional. Nenhum arquivo de aplicação alterado.
Verticais congeladas (`/servicos/conserto-tv`, `/servicos/conserto-placa`,
`/servicos/conserto-monitor`), funil, tracking, schema comercial, preços e garantia: intocados.

Vocabulário de estado usado em todo o documento:

```text
PREPARADO   → material pronto no repositório, sem ação externa
EXECUTADO   → ação externa iniciada por pessoa
PUBLICADO   → visível publicamente
VERIFICADO  → confirmado pela plataforma com evidência
```

Nada é declarado EXECUTADO/PUBLICADO/VERIFICADO sem evidência anexada.
O agente não tem acesso a Google Business Profile, câmera, nem contas de terceiros:
tudo que depende disso permanece PREPARADO.

---

## 1. Resumo executivo

A 4I fecha o último campo bloqueante do pacote GBP (horário) e organiza a execução
externa em checklists verificáveis. O que muda de fato nesta rodada:

- `HORÁRIO GBP = APROVADO` — faixa confirmada pelo responsável e registrada na Parte 8 do pacote canônico.
- Checklist GBP com todos os campos em estado `pronto`, exceto fotos (`pendentes`).
- Registro de estado real do perfil, das fotos, das citations e das reviews — todos com evidência exigida.
- Score de prova recalculado apenas por fato consumado: permanece **6/50**.

## 2. Git inicial

```text
git diff -- src/      → vazio
git diff -- scripts/  → vazio
```

## 3. Horário aprovado

```text
HORÁRIO GBP = APROVADO
```

| Dia | Horário |
| --- | --- |
| Segunda a sexta | 08:30–18:00 |
| Sábado | 09:00–13:00 |
| Domingo | Fechado |

Proibido no perfil: "24 horas", "atendimento imediato", "plantão".
Registrado em `docs/gbp-pacote-canonico.md` (Parte 1 e Parte 8).

## 4. GBP — estado

```text
NÃO CRIADO
```

Motivo: criação e reivindicação exigem conta Google do responsável e ação humana.
Nada foi criado pelo Lovable — declarar o contrário seria falso.

Checklist humano (Fase 3), a marcar por quem executar:

```text
[ ] criar/reivindicar perfil
[ ] selecionar modelo Service Area Business
[ ] ocultar endereço
[ ] adicionar Curitiba
[ ] adicionar São José dos Pinhais
[ ] categoria principal aprovada
[ ] categorias secundárias aprovadas
[ ] URL canônica https://tecnico.curitiba.br
[ ] telefone/WhatsApp +55 41 99708-6380
[ ] horários aprovados (item 3)
[ ] descrição ≤750 caracteres
[ ] serviços aprovados (item 8)
[ ] iniciar verificação
```

## 5. Verificação GBP

```text
VERIFICAÇÃO: NÃO INICIADA
```

`CRIADO` nunca conta como `VERIFICADO`. Só passa a `VERIFICADO` com confirmação
da própria plataforma (tela/e-mail de aprovação) registrada aqui com data.

## 6. Configuração — checklist de prontidão (Fase 2)

| Campo | Estado |
| --- | --- |
| Nome | pronto |
| Categoria principal | pronta |
| Categorias secundárias | prontas |
| Site | pronto |
| WhatsApp | pronto |
| Área | pronta |
| Endereço | oculto |
| Horário | pronto |
| Serviços | prontos |
| Descrição ≤750 | pronta |
| Fotos | pendentes |

## 7. Categorias

```text
PRINCIPAL = Serviço de reparo de computadores
SECUNDÁRIAS = reparo de eletrônicos · reparo de televisores · serviço de TI
```

Se o catálogo do GBP apresentar nomenclatura diferente no momento da configuração:
selecionar o item real e **registrar aqui o nome exato exibido**. Proibido inventar
categoria ou forçar equivalência.

| Categoria pretendida | Nome real selecionado | Data |
| --- | --- | --- |
| Serviço de reparo de computadores | — | — |
| Serviço de reparo de eletrônicos | — | — |
| Serviço de reparo de televisores | — | — |
| Serviço de TI | — | — |

## 8. Serviços

Os 12 serviços aprovados na 4H (Parte 6 do pacote canônico), sem preço.
Escopos negativos obrigatórios: monitor sem troca de painel; placa sujeita a
viabilidade; recuperação de dados sem garantia de resultado.

Não cadastrar: áudio, soundbar, receiver, videogame, celular, eletrodoméstico,
venda de peças ou qualquer serviço sem rota publicada.

## 9. Áreas

```text
Curitiba (PR)              → principal
São José dos Pinhais (PR)  → secundária
```

Nenhuma outra cidade. Promoção de cidade só com atendimento real concluído e registrado.

## 10. Descrição

Usar exclusivamente a versão de 701 caracteres da Parte 7 do pacote canônico.

Validação de termos proibidos executada sobre essa versão:

| Termo | Presente |
| --- | --- |
| desde 1998 | não |
| melhor | não |
| nº 1 | não |
| mais avaliada | não |
| autorizada | não |
| todas as marcas | não |
| atendimento imediato | não |

## 11. Fotos capturadas

```text
0 fotos
```

Prioridades 1–3 (bancada geral · microscópio · instrumentação) permanecem
`AGUARDANDO CAPTURA`. O agente não pode fotografar; banco de imagens e IA são
proibidos como prova.

## 12. Fotos aprovadas

```text
0 fotos
```

Aprovação exige a sequência completa: `CAPTURADA + REVISADA + APROVADA`.

## 13. Fotos publicadas

```text
0 fotos
```

Primeiro lote, quando houver material aprovado: 1 bancada + 1 microscopia + 1 instrumentação.
Proibido despejar a shot list inteira de uma vez.

## 14. Privacidade

Gate aplicado a cada imagem antes da aprovação — reprovação automática se aparecer:
nome, telefone, endereço, WhatsApp, e-mail, OS identificável, serial desnecessário,
QR code sensível, senha, rede/senha Wi-Fi, documento, arquivo pessoal, tela privada,
etiqueta de cliente.

Procedimento: revisão em 100% de zoom → remoção de EXIF/GPS → registro no manifesto.
Em dúvida, não publica.

Imagens avaliadas nesta rodada: 0. Reprovadas: 0.

## 15. Manifesto

`docs/registro-provas-visuais.md` **não recebeu linha nova** — não existe foto para registrar.
Formato obrigatório por foto: arquivo · data · origem (própria) · tipo · equipamento · etapa ·
privacidade (aprovada/reprovada) · GBP (sim/não) · site futuro (sim/não) · legenda factual.

Legendas autorizadas (Fase 11):

```text
Bancada técnica utilizada no diagnóstico de equipamentos.
Inspeção de placa eletrônica com microscópio.
Instrumentação utilizada em diagnóstico eletrônico de bancada.
```

Legendas proibidas: superlativas, comparativas ou com promessa de resultado.

## 16. Citations A

| # | Fonte | Estado | URL pública | Nome | Telefone | URL do site | Área | Exige endereço visível |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Google Business Profile | PENDENTE | — | ok | ok | ok | CWB + SJP | não |
| 2 | Bing Places for Business | PENDENTE | — | ok | ok | ok | CWB + SJP | não |
| 3 | Apple Business Connect | PENDENTE | — | ok | ok | ok | CWB + SJP | não |
| 4 | Instagram Business | PENDENTE | — | ok | ok | ok | CWB | não |
| 5 | Facebook (serviço local) | PENDENTE | — | ok | ok | ok | CWB + SJP | não |
| 6 | LinkedIn — página | PENDENTE | — | ok | ok | ok | CWB | não |
| 7 | YouTube — canal | PENDENTE | — | ok | ok | ok | CWB | não |
| 8 | WhatsApp Business | PENDENTE | — | ok | ok | ok | CWB | não |

Regra de descarte: plataforma que **obrigue endereço visível** → `DESCARTADA`.
Proibido preencher endereço fictício para destravar cadastro.

## 17. Citations ativas

```text
0 ativas · 8 pendentes · 0 rejeitadas · 0 descartadas
```

Uma citation só vira `ATIVA` com URL pública ou comprovante de status.
Formulário enviado sem publicação continua `PENDENTE`.

Backlink (Fase 15): não é requisito. `nofollow` não desqualifica citation legítima —
a função é entidade e consistência local.

## 18. NAP

```text
NOME     Técnico em Curitiba
TELEFONE +55 41 99708-6380 (WhatsApp, canal único)
URL      https://tecnico.curitiba.br
ÁREA     Curitiba · São José dos Pinhais
ENDEREÇO não publicar
CEP      não publicar
CNPJ     não publicar nesta fase
```

## 19. Reviews

```text
PROCESSO PRONTO · NÃO ATIVADO
```

Bloqueio: depende de GBP apto a receber avaliações. Gatilho definido: OS real concluída,
uma única solicitação por atendimento, mensagem neutra de `docs/processo-reviews-google.md`.
Sem desconto, recompensa, sorteio, pressão ou review gating.

## 20. Review URL

```text
REVIEW_URL = INDISPONÍVEL (perfil não criado)
```

Quando existir, registrar aqui — e **não** expor o link no site nesta rodada.

## 21. Solicitações enviadas

```text
0
```

## 22. Reviews recebidas

```text
0 avaliações
```

Estado válido e preferível a qualquer avaliação fabricada. Respostas, quando houver,
seguem o protocolo 4H: até 48h úteis, sem citar defeito sensível, preço, endereço, OS
ou dado pessoal.

## 23. Score de prova

```text
SCORE ANTES  = 6/50
SCORE DEPOIS = 6/50
```

| Item | Pontos possíveis | Obtidos | Evidência |
| --- | --- | --- | --- |
| GBP verificado | 10 | 0 | perfil não criado |
| Fotos reais aprovadas (≥3) | 8 | 0 | manifesto vazio |
| Citations A ativas | 8 | 0 | nenhuma publicada |
| Reviews reais (≥5) | 8 | 0 | 0 avaliações |
| Vídeo/mídia própria | 6 | 0 | inexistente |
| Menção editorial externa | 5 | 0 | inexistente |
| Base documental e NAP consistente | 5 | 5 | repositório |
| Canal de contato único e funcional | 3 | 1 | WhatsApp ativo, sem verificação externa |

Horário aprovado **não pontua**: é insumo de configuração, não prova externa.

## 24. "Desde 1998"

Verificação executada em `docs/gbp*`, `docs/rodada-4h*`, `docs/rodada-4i*`.
Ocorrências apenas em avisos de bloqueio/governança:

```text
docs/gbp-pacote-canonico.md      → tabela de campo bloqueado · lista de termos proibidos · Parte 25
docs/rodada-4h-ativacao-externa.md → item 22 (governança) e nota de remoção
docs/rodada-4i-ativacao-externa.md → esta seção e a validação do item 10
```

Nenhuma ocorrência em copy destinada a GBP, citation, review ou mídia externa.
No site, o claim permanece exatamente onde já estava, como declaração do responsável.

## 25. P0

Nenhum.

## 26. P1

| # | Item | Bloqueio |
| --- | --- | --- |
| 1 | GBP não criado | ação humana com conta Google |
| 2 | Zero fotos reais capturadas | captura física na bancada |
| 3 | Zero citations ativas | cadastro manual nas 8 fontes A |

## 27. P2

```text
P2 / DÍVIDA DE COPY CONGELADA
```

`src/pages/AssistenciaTecnicaCuritiba.tsx:335` — termo "orçamento" na meta description
contra o vocabulário oficial (`check:copy`). **Não corrigido nesta rodada** por decisão
de congelamento. Resolver em rodada própria de copy.

## 28. Arquivos alterados

```text
docs/gbp-pacote-canonico.md        (Parte 1, Parte 8 e checklist — horário aprovado)
docs/rodada-4i-ativacao-externa.md (novo)
```

`docs/plano-fotografico-operacao-real.md`, `docs/processo-reviews-google.md` e
`docs/registro-provas-visuais.md` permanecem inalterados — não houve fato novo para registrar.

## 29. TV/Placas/Monitor

```text
TV       = 0 alterações
Placas   = 0 alterações
Monitor  = 0 alterações
Funil    = 0 · Tracking = 0 · Banco = 0 · Schema = 0 · Preços = 0 · Garantia = 0
```

## 30. Git final

```text
git diff -- src/      → vazio
git diff -- scripts/  → vazio
Alterações restritas a docs/
```

---

## DECISÃO

```text
PRESENÇA LOCAL EXTERNA AINDA EM IMPLEMENTAÇÃO
```

Justificativa: o pacote está completo e sem pendência de dado, mas nenhuma ação externa
foi executada — GBP não criado, 0 fotos, 0 citations ativas, 0 reviews. Score inalterado em 6/50.

## PRÓXIMO PASSO

Continuar exclusivamente as ações externas pendentes, nesta ordem:
1. Criar o GBP como SAB com os dados do pacote canônico e iniciar a verificação;
2. Capturar as prioridades 1–3 da shot list e passar pelo gate de privacidade;
3. Abrir as 8 citations de prioridade A e coletar as URLs públicas;
4. Ativar o processo de reviews assim que o perfil aceitar avaliações.

A Rodada 4J só abre com GBP verificado, provas reais aprovadas e citations ativas.
Atraso externo não será compensado com novas páginas ou alterações comerciais.
