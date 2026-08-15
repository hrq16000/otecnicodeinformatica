# Modelo preenchível — Evidências externas 4I-M

Preencher **durante** a execução real (GBP, fotos, citations). Nada aqui é evidência
enquanto o campo estiver vazio ou marcado como planejado. Regras e proibições:
`docs/rodada-4i-m-execucao-manual.md` · copy canônica: `docs/gbp-pacote-canonico.md`.

Fluxo das fotos antes de anexar em qualquer lugar:

```bash
node scripts/strip-photo-exif.mjs <pasta-original> --out fotos-limpas
node scripts/check-photo-privacy.mjs fotos-limpas --ocr
```

O primeiro remove EXIF/GPS/IPTC/XMP (nunca sobrescreve o original); o segundo reprova
qualquer arquivo com metadado residual ou com telefone/e-mail/CPF/CEP/senha legível na
imagem. Só entra no registro abaixo o arquivo com **PASS** nos dois.

---

## 1. Google Business Profile

```text
GBP criado:                  SIM / NÃO
Status:                      NÃO CRIADO | CRIADO | EM VERIFICAÇÃO | VERIFICADO | SUSPENSO
Data:                        ____-__-__
Método de verificação:       ______________________
URL/ID público:              ______________________
```

| Campo | Planejado | Efetivamente aplicado |
| --- | --- | --- |
| Tipo | Service Area Business (sem endereço público) | |
| Categoria principal | Serviço de reparo de computadores | |
| Secundária 1 | reparo de eletrônicos | |
| Secundária 2 | reparo de televisores | |
| Secundária 3 | serviço de TI | |
| Áreas | Curitiba · São José dos Pinhais | |
| Horários | Seg–Sex 08:30–18:00 · Sáb 09:00–13:00 · Dom fechado | |
| Serviços publicados (qtd) | 12, sem preço | |
| Descrição | versão canônica (Parte 7) | |

Registrar o nome real exibido pelo Google — não traduzir nem inventar equivalência.
Endereço, CEP e CNPJ permanecem **não públicos** nesta fase.

---

## 2. Fotos (primeiro lote obrigatório)

| # | Tipo | Arquivo final | Data | Real (própria) | Privacidade | EXIF/GPS | Aprovada | Publicada GBP | Legenda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Bancada geral | | | SIM/NÃO | PASS/FAIL | REMOVIDO/NÃO | SIM/NÃO | SIM/NÃO | |
| 2 | Microscópio + placa | | | SIM/NÃO | PASS/FAIL | REMOVIDO/NÃO | SIM/NÃO | SIM/NÃO | |
| 3 | Instrumentação | | | SIM/NÃO | PASS/FAIL | REMOVIDO/NÃO | SIM/NÃO | SIM/NÃO | |

Checagem visual por foto (15 itens — marcar todos antes de aprovar):

```text
[ ] sem nome de cliente   [ ] sem telefone      [ ] sem WhatsApp     [ ] sem e-mail
[ ] sem endereço          [ ] sem documento     [ ] sem senha        [ ] sem rede/senha Wi-Fi
[ ] sem arquivo pessoal   [ ] sem tela privada  [ ] sem OS legível   [ ] sem etiqueta de cliente
[ ] sem serial            [ ] sem QR sensível   [ ] sem GPS/EXIF
```

Legendas factuais autorizadas (sem superlativo, sem "melhor", "nº 1", "único"):

```text
Bancada técnica utilizada no diagnóstico de equipamentos.
Inspeção de placa eletrônica com microscópio.
Instrumentação utilizada em diagnóstico eletrônico de bancada.
```

Proibido: IA, mockup, banco de imagens, cena montada, fachada falsa, OS fictícia.

---

## 3. Citations (lista Prioridade A — não ampliar)

| # | Fonte | Data | Status | URL pública | Exige endereço? | Observação |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Google Business Profile | | | | | |
| 2 | Bing Places | | | | | |
| 3 | Apple Business Connect | | | | | |
| 4 | Instagram Business | | | | | |
| 5 | Facebook (serviço local) | | | | | |
| 6 | LinkedIn — página | | | | | |
| 7 | YouTube — canal | | | | | |
| 8 | WhatsApp Business | | | | | |

Status: `NÃO INICIADA` · `SUBMETIDA` · `AGUARDANDO APROVAÇÃO` · `ATIVA` · `REJEITADA` · `DESCARTADA`.
NAP autorizado: nome · URL · WhatsApp · área de atendimento. Formulário que exija endereço
público ⇒ `DESCARTADA`. `nofollow` não desqualifica.

---

## 4. Reviews (não bloqueia a 4J)

| OS | Conclusão | Solicitação enviada? | Data |
| --- | --- | --- | --- |
| | | | |

```text
Solicitações: ____
Recebidas:    ____
```

Mensagem neutra única por atendimento real concluído. Proibido incentivo, pedido de nota
ou review gating.

---

## 5. Check de claims no material externo

```text
[ ] "desde 1998" ausente        [ ] "nº 1" ausente          [ ] "melhor" ausente
[ ] "mais avaliado" ausente     [ ] "autorizado" ausente    [ ] "todas as marcas" ausente
[ ] "atendimento imediato" ausente                          [ ] "24h" ausente
```

---

## 6. Bloco final para exportar

```text
GBP
Status:
Categoria principal efetiva:
Categorias secundárias:
Áreas:
URL/perfil:

FOTOS
Capturadas:      Aprovadas:      Publicadas:
1.
2.
3.

CITATIONS
Submetidas:      Ativas:
1. Fonte — status — URL
2. Fonte — status — URL
3. Fonte — status — URL

REVIEWS
Solicitações:    Avaliações recebidas:

GATE 4J
GBP criado/em verificação:
3 fotos aprovadas:
2 citations submetidas/ativas:

STATUS: 4I-M — AGUARDANDO EXECUÇÃO HUMANA | EXECUÇÃO PARCIAL | EVIDÊNCIAS EXTERNAS DISPONÍVEIS
```

Exportação: este arquivo já é o documento final em Markdown — preencher, salvar como
`docs/rodada-4i-m-evidencias-preenchido.md` e anexar na 4J.
