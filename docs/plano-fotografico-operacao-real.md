# Plano fotográfico da operação real (Rodada 4H)

Objetivo não é "ter fotos". É provar três coisas, nesta ordem:

```text
EXISTÊNCIA   → a operação existe fisicamente
CAPACIDADE   → há instrumentação para o que é prometido
PROCESSO     → há método: recebimento, diagnóstico, teste, entrega
```

Estado atual: `src/lib/provasBancada.ts` está **vazio** e a seção do site não renderiza (fail-closed).
Nenhuma foto de banco de imagens ou gerada por IA pode ocupar esse espaço.

---

## Shot list

### Prioridade 1 — Bancada geral (prova de EXISTÊNCIA)

| # | Enquadramento | Obrigatório na cena | Proibido na cena |
| --- | --- | --- | --- |
| 1.1 | Bancada completa, plano aberto | Bancada organizada, iluminação de trabalho, ferramentas em uso | Cliente, tela com dados, etiqueta com nome |
| 1.2 | Área ESD em detalhe | Tapete/pulseira antiestática, aterramento visível | Fachada, janela com placa de rua |
| 1.3 | Equipamentos reais em fila de serviço | Equipamentos sem identificação de dono | Etiqueta de OS legível, serial legível |

Quantidade alvo: 3 fotos.

### Prioridade 2 — Microscópio (prova de CAPACIDADE)

| # | Enquadramento | Obrigatório | Observação |
| --- | --- | --- | --- |
| 2.1 | Microscópio com placa posicionada | Placa real sob a ótica | Cena não pode ser montada só para a foto |
| 2.2 | Vista pela ocular / captura da tela do microscópio | Trilha, componente ou solda em detalhe | Sem sobreposição de marca ou filtro |

Quantidade alvo: 2 fotos.

### Prioridade 3 — Osciloscópio / instrumentação

| # | Enquadramento | Obrigatório | Proibido |
| --- | --- | --- | --- |
| 3.1 | Instrumento em uso real (pontas conectadas à placa) | Leitura na tela | Parâmetro que vire tutorial de risco |
| 3.2 | Fonte de bancada / estação de solda em uso | Equipamento ligado, trabalho em andamento | Procedimento de alta tensão em detalhe |

Quantidade alvo: 2 fotos. Sem dados confidenciais, sem passo a passo perigoso.

### Prioridade 4 — TV

| # | Etapa | O que registrar |
| --- | --- | --- |
| 4.1 | Recebimento | TV registrada na entrada, sem etiqueta legível |
| 4.2 | Placa | Placa da TV em bancada sob diagnóstico |
| 4.3 | Bancada | Aparelho aberto com instrumentação conectada |
| 4.4 | Teste | Teste final com imagem estável na tela |

### Prioridade 5 — Placa

| # | Etapa | O que registrar |
| --- | --- | --- |
| 5.1 | Identificação | Placa identificada (modelo/versão sem dado de cliente) |
| 5.2 | Microscopia | Área do defeito sob microscópio |
| 5.3 | Instrumentação | Medição em ponto de teste |
| 5.4 | Validação | Placa validada após reparo |

### Prioridade 6 — Monitor

| # | Etapa | O que registrar |
| --- | --- | --- |
| 6.1 | Equipamento | Monitor em bancada |
| 6.2 | Placa/fonte | Placa lógica ou fonte aberta |
| 6.3 | Bancada | Reparo em andamento |
| 6.4 | Teste | Teste final em duas entradas |

**Nota de coerência:** as fotos de TV, placa e monitor destinam-se ao GBP e ao manifesto.
As páginas `/servicos/conserto-tv`, `/servicos/conserto-placa` e `/servicos/conserto-monitor`
permanecem **congeladas** nesta rodada — nenhuma publicação nelas sem uma rodada específica.

---

## Gate de privacidade (obrigatório, fail-closed)

Uma foto é descartada se contiver **qualquer** um dos itens:

```text
nome de pessoa                 telefone
endereço                       CEP
etiqueta com dados do cliente  número de OS associável
mensagem de WhatsApp           arquivo pessoal em tela
senha                          rede/senha de Wi-Fi
documento                      e-mail
qualquer conteúdo privado em tela
fachada com numeração          placa de rua
rosto de terceiro sem autorização
```

Procedimento antes de qualquer publicação:
1. Revisar a foto em tela cheia, 100% de zoom, procurando texto legível.
2. Remover metadados EXIF (inclusive GPS).
3. Registrar `privacidadeRevisada = true` só depois dessa checagem.
4. Em dúvida, **não publica**.

Serial de equipamento: ocultar quando legível. Equipamento identificável de cliente exige
autorização registrada.

---

## Padrão visual

```text
REAIS · LIMPAS · TÉCNICAS
SEM FILTRO EXAGERADO · SEM MOCKUP · SEM IA · SEM CENA MONTADA
```

- Luz difusa, sem flash direto; fundo limpo e sem poluição.
- Foco no equipamento/instrumento, não na decoração.
- Enquadramento horizontal 4:3 ou 3:2; mínimo 1200px no lado maior.
- Nada de sobreposição de logo grande, moldura, borda decorativa ou colagem.
- Nada de estética de banco de imagens (mãos genéricas, teclado azulado, código na tela).
- Legenda factual e curta. Proibida legenda superlativa ou comparativa.

---

## Manifesto (Parte 12)

`docs/registro-provas-visuais.md` só é atualizado **depois** que a foto existir e passar no gate.
Formato da linha a acrescentar:

| Asset | Data | Origem | Tipo | Privacidade | Aprovado GBP | Aprovado site |
| --- | --- | --- | --- | --- | --- | --- |
| `bancada-geral-01.jpg` | AAAA-MM-DD | Nossa bancada | Bancada | Revisada | Sim/Não | Sim/Não |

Regras:
- Origem "banco de imagens" ou "IA" ⇒ nunca recebe "Aprovado" como prova.
- "Aprovado site" só passa a valer com o item inserido em `src/lib/provasBancada.ts`.
- A seção do site só aparece com **3 ou mais** fotos aprovadas (`MIN_PROVAS_PARA_PUBLICAR`).
- Nada é publicado como prova antes da aprovação registrada nesta tabela.

---

## Calendário de publicação no GBP (Parte 13)

| Semana | Publicar | Qtd. |
| --- | --- | --- |
| 1 | Bancada geral · microscópio · instrumentação | 3 |
| 2 | TV · placa · monitor | 3 |
| 3 | Processo: recebimento · embalagem · teste final | 3 |
| 4+ | Somente quando houver material novo e real | 1–2 |

Sem volume artificial para "alimentar algoritmo". Se não houver foto nova aprovada na semana,
não se publica nada — repetição e enchimento degradam a prova.

---

## STATUS

```text
SHOT LIST PRONTA — AGUARDANDO CAPTURA
```

Total planejado na primeira leva: 7 fotos (prioridades 1–3) + 12 fotos por vertical (prioridades 4–6).
Nenhuma foto capturada até a data desta rodada.
