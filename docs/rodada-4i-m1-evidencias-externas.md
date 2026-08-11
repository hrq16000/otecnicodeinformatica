# RODADA 4I-M.1 — Execução externa assistida (validação de evidências)

Rodada de **documentação + checklist + validação**. Zero alteração de produto.
Fonte de verdade: `docs/rodada-4i-m-execucao-manual.md` e `docs/gbp-pacote-canonico.md`
(HEAD vence memória antiga). Este arquivo registra apenas o **estado verificável hoje**.

## 1. HEAD e estado do repositório

```text
HEAD              = 0e806fffe325f623670d283bdd8ff1ac99454d81
git status --short= (vazio antes desta rodada)
git diff --stat   = (vazio)
git diff src/     = (vazio)
git diff scripts/ = (vazio)
git diff public/  = (vazio)
```

Único arquivo tocado nesta rodada: este documento em `docs/`.

## 2. PARTE A — Google Business Profile (parâmetros aprovados, confirmados)

```text
TIPO                    Service Area Business (SAB)
ENDEREÇO PÚBLICO        NÃO
CEP PÚBLICO             NÃO
CNPJ PÚBLICO NESTA FASE NÃO
ÁREAS AUTORIZADAS       Curitiba · São José dos Pinhais (nenhuma outra neste gate)
HORÁRIOS                Seg–Sex 08:30–18:00 · Sáb 09:00–13:00 · Dom fechado
CATEGORIA PRINCIPAL     planejada: "Serviço de reparo de computadores"
                        (registrar o nome real exibido pelo Google na execução)
SECUNDÁRIAS PLANEJADAS  reparo de eletrônicos · reparo de televisores · serviço de TI
                        (somente se disponíveis; nada de áudio/celular/eletrodoméstico/autorizada)
DESCRIÇÃO               versão canônica de `docs/gbp-pacote-canonico.md` (Parte 7)
SERVIÇOS                12 itens da Parte 6, sem preço; não transportar preço de
                        informática para TV, placas ou monitor
```

Status verificável hoje:

```text
GBP criado:                      NÃO
Status:                          NÃO CRIADO
Data:                            —
URL pública:                     —
Categoria principal efetiva:     — (não preenchível sem execução real)
Categorias secundárias efetivas: —
Áreas publicadas:                —
Horários publicados:             —
Serviços publicados (qtd):       0
```

## 3. PARTE B — Provas visuais reais

Nenhum arquivo de foto operacional nova foi entregue para validação nesta rodada;
`docs/registro-provas-visuais.md` não recebeu linha nova.

| Foto | Tipo | Arquivo | Data | Real | Privacidade | EXIF/GPS | Aprovada | Publicada |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Bancada geral | — | — | — | não avaliada | — | NÃO | NÃO |
| 2 | Microscópio + placa | — | — | — | não avaliada | — | NÃO | NÃO |
| 3 | Instrumentação | — | — | — | não avaliada | — | NÃO | NÃO |

Gate de privacidade por foto (15 itens) e remoção de EXIF/GPS permanecem obrigatórios
antes de qualquer aprovação — ver `docs/rodada-4i-m-execucao-manual.md`, Etapa 2.
Captions autorizadas: descrição factual do que aparece; proibido superlativo.

## 4. PARTE C — Citations (Prioridade A, lista já aprovada — não ampliar)

| # | Fonte | Data | Status | URL pública | Exige endereço? | Observação |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Google Business Profile | — | NÃO INICIADA | — | não (SAB) | depende do GBP |
| 2 | Bing Places | — | NÃO INICIADA | — | verificar | — |
| 3 | Apple Business Connect | — | NÃO INICIADA | — | verificar | — |
| 4 | Instagram Business | — | NÃO INICIADA | — | não | — |
| 5 | Facebook (serviço local) | — | NÃO INICIADA | — | não | — |
| 6 | LinkedIn — página | — | NÃO INICIADA | — | não | — |
| 7 | YouTube — canal | — | NÃO INICIADA | — | não | — |
| 8 | WhatsApp Business | — | NÃO INICIADA | — | não | — |

NAP parcial autorizado: nome · URL · WhatsApp · área de atendimento. Endereço/CEP/CNPJ
seguem bloqueados. Formulário que exija endereço público ⇒ DESCARTADA. `nofollow` não
desqualifica citation legítima.

## 5. PARTE D — Reviews

```text
Solicitações realizadas: 0
Avaliações recebidas:    0
```

Não é requisito para 4J. Só ativar com GBP apto **e** OS real concluída, mensagem neutra
única por atendimento. Proibido incentivo, pedido de nota e review gating.

## 6. PARTE E/G — Prova de presença externa e claims

Nada nesta rodada conta como evidência externa: não houve ação externa real
(perfil criado, foto capturada, formulário submetido). Documento interno, checklist e
copy preparada não pontuam.

Check de claims no material externo preparado: `desde 1998`, `nº 1`, `melhor`,
`mais avaliado`, `autorizado`, `todas as marcas`, `atendimento imediato`, `24h` —
todos aparecem em `docs/gbp-pacote-canonico.md` **apenas como termos bloqueados**,
nunca como texto publicável. PASS.

## 7. PARTE F — Score

`6/50` mantido. Sem recálculo nesta rodada; recálculo pertence à 4J.

---

## RESUMO OPERACIONAL FINAL

```text
GBP
Status: NÃO CRIADO
Categoria principal efetiva: —
Categorias secundárias: —
Áreas: Curitiba · São José dos Pinhais (aprovadas, não publicadas)
URL/perfil: —

FOTOS
Capturadas: 0
Aprovadas: 0
Publicadas: 0

1. Bancada geral — pendente
2. Microscópio + placa — pendente
3. Instrumentação — pendente

CITATIONS
Submetidas: 0
Ativas: 0

1. Google Business Profile — NÃO INICIADA — —
2. Bing Places — NÃO INICIADA — —
3. Apple Business Connect — NÃO INICIADA — —

REVIEWS
Solicitações: 0
Avaliações recebidas: 0

GATE 4J
GBP criado/em verificação: NÃO
3 fotos aprovadas: NÃO
2 citations submetidas/ativas: NÃO

STATUS: 4I-M — AGUARDANDO EXECUÇÃO HUMANA
```

## DECISÃO FINAL

```text
4I-M — AGUARDANDO EXECUÇÃO HUMANA
```

4J **não** liberada. Nenhuma rodada de produto nova deve ser criada para compensar a
ausência de autoridade externa: a continuidade é exclusivamente a execução manual de
GBP → 3 fotos reais → 2 citations, com preenchimento desta folha.
