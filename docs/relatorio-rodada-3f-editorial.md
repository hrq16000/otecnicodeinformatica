# RODADA 3F — Liberação controlada do conteúdo educacional

Data: 2026-08-06 · Responsável editorial: Técnico em Curitiba (autoria institucional)

## 1. Resumo executivo

A onda editorial indexável foi **rotacionada, não ampliada**. A auditoria mostrou que
dois dos seis artigos aprovados na onda anterior passaram a disputar a mesma intenção
das páginas de sintoma criadas nas Rodadas 3B/3C (`/problemas/notebook-nao-liga` e
`/problemas/computador-lento`). Esses dois voltaram para revisão (noindex, follow, fora
do sitemap) e um guia com revisão técnica já concluída entrou no lugar, apoiando
`/servicos/manutencao-de-notebook`. Nenhum artigo novo, nenhuma rota nova, nenhuma
página comercial alterada.

Onda indexável final: **5 artigos** (limite da rodada: 6).

## 2. Inventário editorial

| Métrica | Valor |
| --- | --- |
| Artigos no acervo | 157 |
| Manuais | 137 |
| Programáticos | 20 |
| Fora do core (celular, CFTV, TV, Linux avançado, outra marca) | 50 |
| Aprovados antes da rodada | 6 |
| Aprovados depois da rodada | 5 |

Fonte: `reports/editorial-inventory.md` (`node scripts/report-editorial-inventory.mjs`).

## 3. Artigos selecionados

| Artigo | Slug real | Antes | Depois | Serviço principal | Status |
| --- | --- | --- | --- | --- | --- |
| Vale a pena trocar o HD por SSD? | `quando-trocar-hd-por-ssd` | aprovado | mantido | `/servicos/upgrade-ssd-ram` | indexável |
| Como saber se o PC tem vírus ou malware | `como-saber-se-pc-tem-virus-malware` | aprovado | mantido | `/servicos/remocao-de-virus` | indexável |
| Guia de backup preventivo | `backup-como-proteger-seus-arquivos` | aprovado | mantido | `/servicos/recuperacao-de-dados` | indexável |
| Como melhorar o sinal de Wi-Fi em casa | `como-melhorar-sinal-wifi-em-casa` | aprovado | mantido | `/servicos/redes-e-wifi` | indexável |
| Superaquecimento: sinais, prevenção e quando parar de usar | `notebook-superaquecendo-o-que-fazer` | in_review · 392 palavras | aprovado · ~1.150 palavras | `/servicos/manutencao-de-notebook` | **promovido** |

## 4. Artigos rejeitados / despromovidos

| Slug | Motivo |
| --- | --- |
| `notebook-nao-liga-o-que-fazer` | CANIBALIZAÇÃO com `/problemas/notebook-nao-liga` (mesma intenção de sintoma) → volta a noindex |
| `computador-lento-causas-solucoes` | CANIBALIZAÇÃO com `/problemas/computador-lento` → volta a noindex |
| `como-instalar-windows-11-do-zero` | DESATUALIZADO — depende de versão/prazo de suporte do Windows sem fonte confirmada |
| ~50 artigos de celular, TV, CFTV, impressora, IA, pentest, outra marca | OFF-TOPIC |
| Duplicados (`notebook-superaquecendo-solucoes`, `como-recuperar-dados-hd-*`, `como-clonar-hd-*`, `como-instalar-windows-11-do-zero-2026`) | DUPLICADO — mesma intenção do selecionado |
| Temas “sinais de falha em HD/SSD”, “quanto de RAM”, “o que fazer antes de levar à assistência” | SEM ARTIGO EQUIVALENTE no acervo — regra de substituição aplicada, nenhum artigo novo criado |

## 5. Contrato editorial (artigo × página comercial)

| Artigo | Papel do artigo | Papel da página comercial |
| --- | --- | --- |
| Superaquecimento | sinais, prevenção, limites e quando parar de usar | manutenção de notebook: diagnóstico, limpeza interna e reparo |
| SSD | decisão e contexto do upgrade | upgrade SSD/RAM: compatibilidade, execução e garantia |
| Vírus | identificação de sinais | remoção de vírus: execução e preservação de dados |
| Backup | prática preventiva | recuperação de dados: tentativa após a perda |
| Wi-Fi | ajustes no ambiente doméstico | redes e Wi-Fi: avaliação e instalação |

## 6. Conteúdo produzido

`notebook-superaquecendo-o-que-fazer` reescrito de 392 para ~1.150 palavras úteis:
resposta curta, dissipação térmica e onde o processo falha, normal × anormal, causas
(hardware, software e ambiente), verificações seguras, o que não fazer, bloco de parada
imediata, limites do guia e quando procurar avaliação.

## 7. Segurança técnica

Sem abertura energizada, sem ressolda, sem freezer/gelo/secador, sem jato forte em
ventoinha travada, sem manipulação de bateria estufada, sem remoção de proteção térmica.
Orientações limitadas a observação, ventilação, registro de sintomas e interrupção do uso.

## 8. Atualidade e fontes

Fact-check registrado em `src/lib/blogEditorialSources.ts` (2026-07-12,
`stableKnowledge: true`): sem temperatura universal de risco, sem intervalo universal de
troca de pasta térmica. `approvedAt` = 2026-08-06 (clamp anti-data-futura ativo no
registro e em `scripts/lib/lastmod.mjs`).

## 9. Autoria

Autoria institucional existente (`org:tecnico-em-curitiba`). Nenhuma pessoa, formação,
certificação ou equipe editorial inventada.

## 10–14. HTML, interlinking, hub, registro e sitemap

- HTML servido do artigo aprovado: H1 real, lead real, sumário de H2 reais, links de
  saída para pilar + apoio + `/servicos` + `/blog`, CTA de triagem central (sem wa.me).
- Saídas do artigo: manutenção de notebook (pilar), manutenção de computador,
  `/problemas/computador-lento`, `/atendimento-domicilio`, `/como-funciona`.
- Hub `/blog`: lista somente aprovados — os dois despromovidos saíram da listagem.
- Registro fail-closed preservado: aprovação explícita por slug em
  `APPROVED_EDITORIAL_CONTENT`, espelhado em `scripts/lib/editorial-wave.mjs`.
- Sitemap: 63 → 62 URLs (−2 artigos despromovidos, +1 promovido), sem duplicidade e sem
  lastmod futuro. Nenhum shard novo criado.

## 15–17. JSON-LD, canibalização e conversão

BlogPosting + BreadcrumbList no artigo aprovado; nenhum Service/Offer/Review em artigo.
Gate de canibalização P0 verde. CTA discreto e exclusivo do fluxo central de triagem.

## 18. Arquivos alterados

| Arquivo | Motivo |
| --- | --- |
| `src/lib/blogEditorialRegistry.ts` | rotação da onda aprovada e fila de revisão |
| `scripts/lib/editorial-wave.mjs` | espelho de build/gates da onda |
| `src/lib/blogEditorialCovers.ts` | capa própria do artigo promovido |
| `public/blog/notebook-superaquecendo-o-que-fazer.jpg` | capa 1200×630 gerada para uso próprio |
| `src/data/blogPostsContent.tsx` | aprofundamento do artigo promovido |

## 19. Gates

| Gate | Resultado | Evidência |
| --- | --- | --- |
| build | ✅ | dist emitido, route-manifest + 404 |
| check:seo:curated | ✅ | 50 rotas curadas OK |
| check:cannibalization | ✅ | 18 páginas P0, 0 conflito |
| check:internal-links | ✅ | 0 link quebrado, 62 URLs de sitemap |
| check:sitemap-source | ✅ | 56 URLs indexáveis, 6 sub-sitemaps |
| check:editorial-governance | ✅ | 157/157 artigos, 5 indexáveis, sem data futura |
| check:jsonld-parity | ✅ | 318 páginas, 236 FAQ |
| check:trust-claims | ✅ | nenhum claim não comprovável |
| soft-404 | ✅ | 219 verificações |

## 22. Decisão

RODADA 3F APROVADA

## 23. Próximo passo

Avaliar os primeiros artigos publicados no Search Console e planejar uma onda de casos
técnicos reais somente após reunir ordens de serviço, fotos próprias e resultados
documentados.
