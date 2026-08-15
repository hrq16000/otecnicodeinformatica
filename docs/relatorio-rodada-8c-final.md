# Rodada 8C — Aquisição local controlada (relatório final)

## 1. Baseline zero limpo

`npm run report:acquisition-performance` (janela 30 dias, gerado em 2026-08-14):

| Grupo | Eventos | % |
| --- | ---: | ---: |
| interno | 40 | 100% |
| aquisição real | 0 | 0% |
| bot | 0 | 0% |
| desconhecido | 0 | 0% |

Sessões distintas: 19 · Sessões de aquisição real: **0**.

**Veredito:** não há aquisição externa mensurável. Todo o volume registrado é
CTA do próprio site / QA (`UTM_INTERNA_OU_CTA_PROPRIO`). O baseline parte de
zero limpo — nenhum número foi estimado e nenhum tráfego artificial foi gerado.

## 2. Link builder de aquisição (`/admin/link-builder`)

Fonte única em `src/lib/utmLinkBuilder.ts`, com presets canônicos:

| Preset | source | medium | campaign |
| --- | --- | --- | --- |
| GBP — perfil | google | organic | gbp_profile |
| GBP — post | google | organic | gbp_post |
| Facebook orgânico | facebook | organic | facebook_organic |
| Instagram orgânico | instagram | organic | instagram_organic |
| WhatsApp perfil → site | whatsapp | organic | whatsapp_profile |
| Offline / QR | offline | qr | offline_qr |

Validações fail-closed: destino precisa ser caminho interno canônico (sem host
externo, sem `javascript:`, sem query própria); valores de UTM em minúsculas
`[a-z0-9_-]` até 64 caracteres; PII (e-mail, telefone, CPF/CNPJ) recusada;
`utm_source` interno/QA nunca é aceito como aquisição.

## 3. Governança (gate bloqueante)

`npm run check:utm-governance` verifica:

1. nenhum `utm_` em sitemaps, `llms.txt`, `robots.txt` ou canonical;
2. nenhum link interno permanente com UTM em `src/`;
3. presets de aquisição só existem no link builder e nunca usam source interno;
4. a busca diagnóstica não envia a frase digitada pelo visitante.

## 4. Painel de indexação

`AlertaIndexacao` passa a exibir **badge de severidade** por URL e o
**reason code sempre visível**. Quando a fonte não informa motivo, o painel diz
exatamente isso (`UNKNOWN_SEM_MOTIVO_REPORTADO`) em vez de inferir causa.
Cada família mostra o contador de `UNKNOWN` em destaque.

## 5. Busca diagnóstica

Eventos categóricos, sem texto livre: `diagnostic_search_start`
(`query_length`), `diagnostic_search_result` (`result_type`,
`matched_category`, `confidence`), `diagnostic_no_result` e
`diagnostic_result_click`. Intenções ambíguas continuam abrindo pergunta
complementar antes de rotear.

## 6. Pop-up de saída

O modal passou a ser renderizado por portal no `<body>`: ancestrais com
`transform`/`filter` criavam novo containing block e tiravam o `position: fixed`
da viewport. Agora fica centralizado em qualquer rolagem e viewport, com
rolagem interna quando o conteúdo excede a altura da tela.

## 7. Pendência conhecida

O Worker de borda (404 real) segue **não publicado** por falta de
`CLOUDFLARE_API_TOKEN`. O smoke `smoke:edge:post-deploy` continua acusando o
grupo `url-inexistente` — é exatamente a vigilância esperada até o deploy.

## 8. Próximo passo de medição

Só reavaliar aquisição após publicar os links do GBP gerados pelo builder.
Antes disso, qualquer variação é ruído interno.
