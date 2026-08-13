# Rodada 4C — Relatório final

Data: 13/08/2026 · Projeto: O Técnico de Informática (otecnicodeinformatica.com.br)

## 1. Resumo executivo

A Rodada 4C fechou dois objetivos independentes:

1. **Consolidação semântica de `/problemas/*`** — as 21 URLs que estavam no estado
   "reavaliar" receberam decisão final e vinculante. Nenhuma URL foi removida: 17 passaram a
   canonicalizar para o sintoma canônico do cluster e 4 foram reposicionadas para o Lote 2 com
   a criação do canônico indicada. O estado "reavaliar" deixou de existir na base.
2. **Hardening de segurança** — a superfície pública de parceiros e avaliações foi reduzida a
   nível de coluna, as RPCs administrativas passaram a exigir `has_role(admin)` e o broadcast de
   telemetria em tempo real passou a trafegar apenas campos de allowlist.

Fonte única das decisões: `src/lib/problemDecisions4c.ts`, protegida por
`npm run check:problem-decisions` no CI. Fonte única do payload seguro:
`src/lib/realtimeSafeFields.ts`, protegida por `npm run check:realtime-payload`.

Veredito da rodada: **APROVADA**. Todos os gates bloqueantes estão verdes (evidências em
`docs/evidencias-rodada-4c.md`).

## 2. As 21 URLs — decisão final

### 2.1 Canonicalizadas (17)

Permanecem existindo, seguem `noindex, follow`, fora do sitemap, e declaram canonical para o
sintoma canônico do cluster. Consolidam sinal em vez de disputar SERP com a própria página-mãe.

| # | URL herdada | Canonical de destino | Cluster |
|---|---|---|---|
| 1 | /problemas/computador-sem-video-curitiba | /problemas/computador-nao-da-imagem | sem imagem |
| 2 | /problemas/computador-com-tela-preta-curitiba | /problemas/computador-nao-da-imagem | sem imagem |
| 3 | /problemas/pc-com-tela-preta-curitiba | /problemas/computador-nao-da-imagem | sem imagem |
| 4–17 | demais variações locais com sufixo `-curitiba` | canônico do respectivo cluster | lentidão, vírus, Wi-Fi, tela azul, superaquecimento, impressora, teclado, HD, boot |

A lista completa e nominal, com motivo por URL, está em `src/lib/problemDecisions4c.ts`
(array `DECISOES_4C`) — o documento não duplica a fonte para não divergir dela.

### 2.2 Reposicionadas (4)

Clusters ainda sem página canônica limpa. Não se inventou canonical para página inexistente:
ficam `noindex`, canonical self, e entram no **Lote 2** com o canônico a criar declarado no
campo `criarCanonico`.

### 2.3 Regra invariante

Nenhuma dessas URLs volta a ser indexável enquanto tiver sufixo local (`-curitiba`) —
`src/lib/problemIntentPolicy.ts` centraliza a regra; `check:problem-intent` e
`check:problem-duplicates` a defendem no CI.

## 3. Matriz de overlaps

- 62 pares de canibalização identificados na varredura do Lote 1.
- Critério de decisão: intenção de busca + sobreposição lexical (Jaccard sobre 5-gramas do
  `<main>`), nunca similaridade isolada.
- Faixas aplicadas: ≥ 0,80 consolidar/canonicalizar · 0,60–0,79 avaliar intenção · < 0,60 manter.
- Resultado após decisões: **máximo 0,103** entre páginas locais indexáveis
  (`check:programmatic-similarity`) e **nenhum par ≥ 0,45** entre interlinks do Lote 1
  (`check:problem-interlinks`).
- Canibalização comercial P0: 19 páginas comparadas, 0 bloqueios, 2 avisos de proximidade de
  metadata (`/servicos/suporte-tecnico-empresarial` × `/empresa-de-ti-curitiba` — description 0,50;
  `/atendimento-domicilio` × `/atendimento-remoto` — title 0,60). Ambos entram como P2 da Rodada 5.

## 4. Canonical e sitemap

| Item | Antes | Depois |
|---|---|---|
| URLs em "reavaliar" | 21 | 0 |
| URLs canonicalizando para outro alvo | 0 | 17 |
| URLs indexáveis no sitemap | 115 | 115 (nenhuma das 21 entrou) |
| Sub-sitemaps emitidos | 8 | 8 |
| Páginas com canonical self entre as indexáveis | 115 | 115 |

`check:sitemap-source` confirma: sitemap derivado do manifesto curado, sem `noindex`, sem alias
e sem destino de redirect. `check:canonical-anchors` confirma canonicals autorreferentes.

## 5. Schema

- Removido `@type: Service` indevido das páginas de sintoma.
- Padrão atual das páginas de problema: `WebPage` + `BreadcrumbList` + `FAQPage` quando aplicável.
- Validação global: 259 nós `LocalBusiness`/`Service`/`FAQPage`/`BreadcrumbList` em 116 páginas
  indexáveis, todos conformes (`check:schema-standards`).

## 6. Segurança — resultado

| Superfície | Ação | Estado |
|---|---|---|
| `partners.documento`, `documento_tipo`, `notas_admin`, `plano_expira_em`, `user_id` | `REVOKE SELECT` de `anon` e `authenticated` | fechado |
| `reviews.client_phone`, `origin_protocol`, `origin_path`, `authorized_publication`, `service_closed_at` | `REVOKE SELECT` de `anon`; mantido para admin via RLS | fechado |
| `admin_list_partners`, `admin_update_partner_status` | execução restrita a `service_role` | fechado |
| `admin_list_reviews` | convertido para `SECURITY INVOKER` com checagem interna de `has_role` | fechado |
| `partners_public` | view somente-leitura | fechado |
| broadcast de `click_events` | allowlist em `realtimeSafeFields.ts` | fechado |
| `partner_program_settings` SELECT `USING(true)` | allowlist explícita no gate, com justificativa (lista de preços pública, uma linha, sem PII) | aceito |

- `supabase--linter`: 0 problemas.
- `check:public-data-exposure` + `check:security-findings`: sem novos achados
  (`reviews.client_phone`, `reviews.select_star`, `og_validation_status` seguem 401).
- Findings do scanner marcados como corrigidos: `SUPA_authenticated_security_definer_function_executable`,
  `partners_documento_public_exposure`, `reviews_client_phone_public_exposure`.

## 7. Observabilidade da própria segurança

Novo painel interno **`/admin/auditoria-acessos`** (admin-only, `noindex`):

- sonda ativa das superfícies sensíveis como visitante anônimo (HTTP direto no PostgREST, sem
  sessão) e como usuário autenticado;
- exibe apenas o veredito (`negado` / `sem linhas` / `EXPOSTO`) e o código HTTP — nunca o valor;
- registra cada rodada em `admin_audit_log` (área `seguranca`);
- mostra amostras ao vivo do payload de `click_events` já projetado pela allowlist, com a lista
  de campos permitidos e bloqueados visível ao lado.

## 8. Pendências

- 🟠 P1 — criar os 4 sintomas canônicos das URLs reposicionadas (Lote 2).
- 🟡 P2 — 5 páginas de bairro sem âncora para o hub local (`check:canonical-anchors`, aviso).
- 🟡 P2 — 2 avisos de proximidade de metadata comercial (item 3).
- 🟢 P3 — 85 pendências informativas do `report-gates` (nenhum bloqueio, nenhum aviso).
