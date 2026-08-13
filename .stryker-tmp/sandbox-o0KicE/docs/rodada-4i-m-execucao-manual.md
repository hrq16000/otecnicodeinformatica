# RODADA 4I-M — Execução humana e coleta de evidências

Esta rodada **não é executável pelo Lovable**. Nada aqui é feito por código: criar GBP,
fotografar a bancada e cadastrar citations exigem pessoa, conta e câmera.
Este arquivo é a **folha de coleta** — preencher durante a execução e trazer para a 4J.

Congelado durante toda a 4I-M: TV · Placas · Monitor · funil · triagem · SEO · tracking · banco.
Nenhum arquivo de aplicação pode ser alterado. `git diff -- src/` e `git diff -- scripts/`: vazios.

Ordem obrigatória: **1) GBP → 2) Fotos → 3) Citations → 4) Reviews**. Não buscar backlink
antes de consolidar a entidade local.

---

## ETAPA 1 — Google Business Profile

Fonte única de copy: `docs/gbp-pacote-canonico.md`. Não improvisar texto.

```text
MODELO            Service Area Business
ENDEREÇO          oculto
ÁREA PRINCIPAL    Curitiba
ÁREA SECUNDÁRIA   São José dos Pinhais
SITE              https://tecnico.curitiba.br
WHATSAPP          +55 41 99708-6380
DESCRIÇÃO         versão de 701 caracteres (Parte 7)
SERVIÇOS          os 12 da Parte 6, sem preço
```

Horário a inserir:

| Dia | Horário |
| --- | --- |
| Segunda a sexta | 08:30–18:00 |
| Sábado | 09:00–13:00 |
| Domingo | Fechado |

Bloqueado no perfil: `desde 1998` · `melhor` · `nº 1` · `mais avaliada` · `líder` ·
`autorizada` · `atendimento imediato` · `24 horas`.

### Preencher durante a execução

```text
GBP_STATUS = [ NÃO CRIADO | CRIADO | VERIFICAÇÃO PENDENTE | VERIFICADO | SUSPENSO ]
DATA       = ____-__-__
EVIDÊNCIA  = captura da tela de status (sem dado pessoal)
```

| Campo | Valor efetivamente aplicado |
| --- | --- |
| Categoria principal (nome real exibido pelo Google) | |
| Secundária 1 | |
| Secundária 2 | |
| Secundária 3 | |
| Áreas publicadas | |
| Horários conferidos | |
| URL/ID do perfil ou evidência equivalente | |
| Método de verificação | |

Se a nomenclatura do catálogo divergir: **registrar o nome oferecido**, não adivinhar
equivalência nem adicionar categoria por oportunidade.

---

## ETAPA 2 — Três primeiras provas fotográficas

| Foto | Conteúdo | Padrão |
| --- | --- | --- |
| 1 | Bancada geral com contexto operacional real | real · nítido · organizado |
| 2 | Microscópio com placa real, uso real | sem cenário montado |
| 3 | Instrumentação (osciloscópio, fonte de bancada ou estação de retrabalho) | em uso |

Proibido: IA, mockup, banco de imagens, filtro pesado, colagem, moldura, logo grande.

### Gate de privacidade — marcar item a item, por foto

```text
[ ] sem nome de cliente      [ ] sem telefone        [ ] sem endereço
[ ] sem e-mail               [ ] sem WhatsApp        [ ] sem documento
[ ] sem OS identificável     [ ] sem senha           [ ] sem rede/senha Wi-Fi
[ ] sem arquivo pessoal      [ ] sem tela privada    [ ] sem QR sensível
[ ] sem etiqueta identificável                       [ ] EXIF/GPS removido
```

Dúvida = **não publicar**.

### Registro de captura

| Foto | Arquivo | Data | Origem | Tipo | Equipamento | Etapa | Privacidade | GBP? | Site? | Legenda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | própria | | | | aprovada/reprovada | | | |
| 2 | | | própria | | | | aprovada/reprovada | | | |
| 3 | | | própria | | | | aprovada/reprovada | | | |

Só depois de **capturada + revisada + aprovada** a linha entra em
`docs/registro-provas-visuais.md`. Foto reprovada não vira prova e não pontua.

Legendas autorizadas:

```text
Bancada técnica utilizada no diagnóstico de equipamentos.
Inspeção de placa eletrônica com microscópio.
Instrumentação utilizada em diagnóstico eletrônico de bancada.
```

Primeiro lote no GBP: **1 bancada + 1 microscopia + 1 instrumentação**. Nada além disso.

---

## ETAPA 3 — Citations prioridade A

NAP autorizado: nome · WhatsApp · URL · Curitiba (e SJP quando aplicável).
Endereço público obrigatório no formulário ⇒ **abortar** e classificar
`DESCARTADA — ENDEREÇO PÚBLICO OBRIGATÓRIO`. Nunca endereço fictício, virtual ou emprestado.

| # | Fonte | Status | URL pública | Data | Observação |
| --- | --- | --- | --- | --- | --- |
| 1 | Google Business Profile | | | | |
| 2 | Bing Places for Business | | | | |
| 3 | Apple Business Connect | | | | |
| 4 | Instagram Business | | | | |
| 5 | Facebook (serviço local) | | | | |
| 6 | LinkedIn — página | | | | |
| 7 | YouTube — canal | | | | |
| 8 | WhatsApp Business | | | | |

Status válidos: `PENDENTE` · `SUBMETIDA` · `AGUARDANDO APROVAÇÃO` · `ATIVA` · `REJEITADA` · `DESCARTADA`.
`ATIVA` exige URL pública verificável (ou status equivalente comprovável).
`nofollow` **não** invalida a citation — o sinal buscado é entidade e consistência.

---

## ETAPA 4 — Reviews

Não iniciar só porque o perfil existe. Condição cumulativa:

```text
GBP apto a receber avaliações  +  OS real concluída
```

Uma solicitação neutra por atendimento, mensagem de `docs/processo-reviews-google.md`.
Proibido: desconto, benefício, brinde, sorteio, pedido de 5 estrelas, pedido de avaliação
positiva, review gating. Zero avaliações é estado válido — review fabricada, nunca.

| OS | Conclusão | Solicitação enviada? | Data |
| --- | --- | --- | --- |
| | | | |

---

## Critério de encerramento da 4I-M

Mínimo para abrir a 4J:

```text
GBP criado ou em verificação
+ 3 fotos reais aprovadas
+ 2 citations submetidas ou ativas
```

Ideal:

```text
GBP VERIFICADO
+ 3 ou mais provas reais publicadas
+ 3 ou mais citations ativas
```

Reviews não são requisito — dependem de clientes reais.

Quando o mínimo for atingido, registrar aqui:

```text
4I-M — EVIDÊNCIAS EXTERNAS DISPONÍVEIS
DATA = ____-__-__
```

e então abrir **RODADA 4J — AUDITORIA DA AUTORIDADE EXTERNA REAL**.

O score **não** é editado manualmente: será recalculado na 4J a partir das evidências.

---

## STATUS ATUAL

```text
4I-M — AGUARDANDO EXECUÇÃO HUMANA
GBP        = NÃO CRIADO
FOTOS      = 0 capturadas · 0 aprovadas · 0 publicadas
CITATIONS  = 0 ativas · 8 pendentes
REVIEWS    = 0
SCORE      = 6/50 (inalterado)
```

Enquanto não houver evidência externa: **não criar páginas novas para compensar a
ausência de autoridade**.
