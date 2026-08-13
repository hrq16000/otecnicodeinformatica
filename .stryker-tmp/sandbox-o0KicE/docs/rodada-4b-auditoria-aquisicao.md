# Rodada 4B — Auditoria de aquisição, conversão e governança pós-4A

TV + Placas + reconciliação de Monitor · leitura primeiro · sem nova expansão.

## 1. Resumo executivo
As duas verticais da 4A estão tecnicamente prontas para medição: rota indexável,
prerender estático, H1 único, JSON-LD, funil instrumentado ponta a ponta e origem
do lead preservada até o WhatsApp. A auditoria encontrou **1 P0 real**:
`/servicos/conserto-monitor` estava no sitemap como indexável (prioridade 0.85)
**sem entrada em `curated-routes-meta.mjs`**, portanto sem HTML prerenderizado —
o crawler recebia apenas o shell da SPA. Corrigido com a alteração mínima e o
gate 3Y foi estendido para impedir recorrência. Nenhuma copy, layout ou preço
foi alterado.

## 2. Git inicial
`git status --short` e `git diff --stat` vazios → **REPOSITÓRIO LIMPO**.

## 3. Estado TV — /servicos/conserto-tv
| Métrica | Valor |
| --- | --- |
| Indexável | sim (manifesto curado) |
| Sitemap | `sitemap-servicos.xml`, weekly, 0.85 |
| Canonical | self, absoluto |
| HTTP | 200 (gate soft-404, 235 verificações) |
| H1 | 1 |
| Palavras (DOM) | ~4.230 |
| HTML estático | 46 KB |
| FAQ / Service / Breadcrumb | presentes (check:jsonld-parity OK) |
| CTA editoriais na página | 3 (hero, intermediário, final) |
| CTA fixo contado como editorial | não |

## 4. Estado placas — /servicos/conserto-placa
| Métrica | Valor |
| --- | --- |
| Indexável | sim |
| Sitemap | weekly, 0.85 |
| Canonical | self |
| HTTP | 200 |
| H1 | 1 |
| Palavras (DOM) | ~3.380 |
| HTML estático | 41 KB |
| FAQ / Service / Breadcrumb | presentes |
| CTA editoriais | 3 |

## 5. Monitor — reconciliação obrigatória
| Item | Estado |
| --- | --- |
| Rota existe | sim (`src/LegacyApp.tsx`, `ServicoCore slug="conserto-monitor"`) |
| Componente | ServicoCore data-driven + blocos próprios |
| Sitemap | sim, `sitemap-servicos.xml` |
| Canonical / robots | self / index |
| Prerender antes da 4B | **não** (ausente de `curated-routes-meta.mjs`) |
| Service schema | sim |
| Origem | Rodada 3Z (aprovação P1: rota única de monitor, recusa de painel) |

**Classificação: EXISTE E INDEXÁVEL.**
Não há violação de governança: a 3Z recusou **áudio** como rota própria e
**aprovou** monitor como rota única. O relatório da 4A está correto; a leitura
de que "monitor = sem rota" era da fase de auditoria da 3Z, antes da aprovação.
O que existia era um defeito técnico (sem prerender), tratado como P0 abaixo.

## 6. Indexação
Sitemap derivado da fonte curada, sem noindex/alias/redirect; sem `lastmod`
sintético; 200 em todas as rotas; sem soft-404; sitemap de imagens com 64
páginas e 120 imagens existentes no build.

## 7. Contrato de eventos (nomes reais, sem nomenclatura paralela)
| Evento real | TV | Placa | Payload | Persistência |
| --- | --- | --- | --- | --- |
| `page_view` (GA4 SPA) | sim | sim | page_path, route_type | GA4 |
| `cta_visible` | sim | sim | cta_location, viewport_bucket | GA4 |
| `wa_funnel_open` | sim | sim | cta_location=`conserto-tv_hero`, funnel_stage=`cta_click` | GA4 + `click_events` |
| `wa_funnel_modal_open` / `_impression` | sim | sim | cta_location | GA4 |
| `wa_funnel_step` | sim | sim | step, equipamento | GA4 |
| `wa_funnel_submit` | sim | sim | modalidade, equipamento | GA4 + `click_events` |
| `wa_click` / `call_click` | sim | sim | cta_location, customer_type, UTM | GA4 + `click_events` |
| `funnel_stage` | sim | sim | cta_click / triagem / autorizacao / execucao | `click_events` |
| `generate_lead` / `conversion` | sim | sim | Ads | GA4 |

Verificado em execução real (390×844) em `/servicos/conserto-tv`: 1 POST em
`click_events` com `cta_location=conserto-tv_hero`, `viewport_bucket=390`,
`funnel_stage=cta_click`, `variant=decisao`.

## 8. Funil mensurável
`VISITA → CTA → TRIAGEM ABERTA → TRIAGEM INICIADA → TRIAGEM CONCLUÍDA → WHATSAPP`
Todos os degraus têm evento real. **Denominadores atuais: AMOSTRA INSUFICIENTE**
(páginas recém-publicadas). Nenhuma taxa é reportada aqui para não induzir
decisão sobre ruído.

## 9. CTAs
| Página | CTA | contexto enviado |
| --- | --- | --- |
| TV | hero | `conserto-tv_hero` + service |
| TV | intermediário | cta_location própria |
| TV | final | cta_location própria |
| Placa | hero | `conserto-placa_hero` |
| Placa | intermediário / final | cta_location própria |
Header e botão flutuante são globais e **não** foram contados como CTA editorial.

## 10. Triagem
Abre no clique do CTA da página, preserva `originUrl` (origem + pathname +
search) até a mensagem final do WhatsApp e bloqueia envio sem conclusão
(coberto por 4 testes de integração).

## 11. Mobile — correção do número da 4A
Medição do **CTA do hero da página** (excluindo fixed/sticky), em px do topo:
| Viewport | TV | Placa |
| --- | --- | --- |
| 360×800 | 681 | 731 |
| 390×844 | 609 | 639 |
| 430×932 | 657 | 585 |

Os 56/64 px reportados na 4A pertenciam ao **CTA global fixo**, não ao CTA
comercial do hero. Registrado como P1 (correção de leitura, não de layout).

## 12. Descoberta interna
Links de entrada no HTML servido: TV e Placa aparecem em navegação renderizada
no cliente; no HTML estático o hub `/servicos` não expõe href diretos.
Classificação: **FRACO** para as duas. Nenhum link adicionado nesta auditoria.

## 13. Home
TV e placas são alcançáveis em 2 interações (home → serviços → página) sem
transformar a home em lista de equipamentos. Hero intocado.

## 14. SEO local
Curitiba, assistência técnica, coleta e entrega, diagnóstico e reparo eletrônico
presentes de forma natural nas duas páginas. Densidade não alterada.

## 15. Canibalização
`check:cannibalization` OK. Rotas herdadas de TV vivem sob `/servicos/n/*`, fora
do sitemap curado. Placa mantém contrato distinto de
`manutencao-de-notebook`, `manutencao-de-computador` e `montagem-de-pc`.

## 16. Provas reais
`docs/registro-provas-visuais.md`: nenhuma prova de bancada aprovada. Todas as
imagens são ilustração de contexto licenciada, com crédito. Pendências abertas
para TV (equipamento, registro, placa, bancada, teste final, embalagem) e placa
(placa identificada, microscópio, instrumentação, retrabalho, validação, ESD).
Meta de qualidade: 3 fotos reais excelentes por página.

## 17. Manifesto de provas
O mecanismo atual já declara asset, origem, categoria, aprovação, rota permitida
e legenda factual. Falta apenas **data do registro** — recomendação, não
implementada nesta rodada. **NÃO ALTERAR** o restante.

## 18. Performance
| Métrica | TV | Placa |
| --- | --- | --- |
| HTML estático | 46 KB | 41 KB |
| Erros de console em produção | 0 | 0 |
| Warnings de dev (forwardRef) | sim | sim |
LCP/CLS por rota: **SEM DADO** — Lighthouse não executado nesta rodada.

## 19. Search Console
**DADOS DE SEARCH CONSOLE NÃO DISPONÍVEIS NO REPOSITÓRIO.** Nenhuma conexão GSC
está vinculada ao projeto. Tabelas de consulta/impressão/CTR/posição ficam
preparadas e vazias — nenhum número foi estimado.

## 20. KPIs comerciais
Painel lógico definido (visualizações, CTA, triagens, concluídas, WhatsApp,
conversão, leads com Curitiba). Estado atual: **SEM DADOS**. Nenhum dashboard
novo criado.

## 21. B2B de placas
O funil já registra origem e `customer_type`, o que permitiria distinguir
técnico/assistência/empresa. Decisão: **MERECE AUDITORIA FUTURA** — nada de área,
preço, formulário ou página B2B nesta rodada.

## 22. Diferenciais demonstráveis hoje
Processo em bancada, coleta e entrega, critério explícito de aceite e recusa,
intervenção N1/N2/N3, placa avulsa vs equipamento completo, teste final,
garantia sempre escopada e autorização por escrito antes de qualquer custo.
Nenhuma comparação com concorrente em copy pública.

## 23. P0
1. `/servicos/conserto-monitor` no sitemap como indexável sem prerender
   (ausente de `scripts/curated-routes-meta.mjs`) → crawler recebia shell vazio.
   **Corrigido**: entrada com title/description próprios; build passa a gerar
   `dist/servicos/conserto-monitor/index.html` (46 KB).

## 24. P1
1. CTA do hero das duas verticais fica a ~585–731 px do topo em mobile.
2. Relatório da 4A atribuiu ao hero um número que era do CTA global fixo.
3. Descoberta interna FRACA para TV e placa no HTML servido.
4. `servico` chega `null` no payload persistido em páginas de serviço (há `path`,
   mas a agregação por serviço depende de derivação).
5. Nenhuma prova visual real publicada nas duas verticais.
6. Manifesto de provas sem campo de data do registro.

## 25. P2
1. Warnings de `forwardRef` no dev poluem o console de diagnóstico.
2. LCP/CLS por rota ainda não medidos.
3. Tabelas de consultas de Search Console sem fonte conectada.

## 26. Arquivos alterados
- `scripts/curated-routes-meta.mjs` — entrada de meta estática do monitor (P0).
- `scripts/check-multielectronics-wave-3y.mjs` — gate estendido.

## 27. Gates
Nenhum gate novo. O gate existente mais próximo (`check:multielectronics-3y`)
passou a exigir meta estática/prerender para toda rota da onda.

## 28. Git final
Somente os dois arquivos acima. Build limpo, 23 gates verdes, 90 testes verdes.

## 29. Decisão
**FUNIL TV + PLACAS PRONTO PARA MEDIÇÃO**

## 30. Próximo passo
Preservar o produto atual e iniciar acompanhamento periódico de aquisição e
conversão das verticais TV e placas. Priorizar a produção de provas fotográficas
reais de bancada antes de qualquer nova expansão.
