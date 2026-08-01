# RODADA 4B — Migração SEO `tecnicocuritiba.com.br` → `tecnico.curitiba.br`

> **Status: PREPARADO, NÃO PUBLICADO.** Nenhum redirect, DNS, sitemap do
> domínio antigo ou telefone foi alterado em produção nesta rodada.

## 1. Estado inicial dos repositórios

| Item | Domínio novo (`tecnico.curitiba.br`) | Domínio antigo (`tecnicocuritiba.com.br`) |
|---|---|---|
| Repositório | este projeto Lovable | **não acessível nesta sessão** |
| Branch | `edit/edt-d5ce8183-8a63-4ddc-b692-04370240ef59` | — |
| Último commit | `7eeeca07 Corrigiu e reportou falhas WebKit` | — |
| `git status` | limpo antes desta rodada | — |
| Hospedagem | Lovable (SPA + prerender curado) | **a confirmar** (serve build antigo do mesmo produto) |
| Arquivo de redirect | `public/_redirects` (`/* → /index.html 200`) | não observável externamente |
| Sitemaps | index + main/servicos/regioes/bairros | index + main/servicos/bairros/marcas/problemas/news |
| robots | `Allow: /`, `Host: https://tecnico.curitiba.br` | `Allow: /` (sem diretiva de migração) |
| Canonical | self-referente no domínio novo | **self-referente no domínio ANTIGO** (competindo) |
| WhatsApp | `5541997086380` (oficial em `siteConfig.ts`) | **`5541997452053`** (divergente, ativo em produção) |

### Decisões pendentes (bloqueiam a publicação)

1. **Quem controla o deploy de `tecnicocuritiba.com.br`?** Repositório, plataforma e
   se há Cloudflare/proxy na frente. Sem isso não há onde aplicar os 301.
2. **Confirmação oficial do WhatsApp.** O portal antigo captura leads para
   `5541997452053`. Só o dono do negócio pode confirmar qual número prevalece —
   não inferimos pelo código.
3. **Acesso ao Search Console** das duas propriedades (para "Mudança de endereço").

## 2. Dados orgânicos (Semrush, base BR)

- 94 keywords orgânicas, tráfego estimado 4/mês, Authority Score 6.
- 221 backlinks / **2 domínios referenciadores** (`precisodeumprofissional.com.br`
  concentra 220 links, majoritariamente imagem/footer).
- Página com tráfego real: `/tecnico-informatica-fazenda-rio-grande` (pos. 6–8,
  100% do traffic share).
- Boas posições: `/tecnico-informatica-colombo` (pos. 9, "assistencia tecnica colombo").
- **Canibalização confirmada** em `tecnico informatica curitiba`: `/valores` (24),
  `/bairros/jardim-das-americas` (47), `/` (63) — três URLs antigas na mesma SERP,
  além do domínio novo.

## 3. Inventário

- Fonte: os 6 sitemaps do domínio antigo → **622 URLs deduplicadas**
  (`docs/migracao/old-paths.txt`).
- Todas responderam **HTTP 200** na amostragem (nenhum redirect já ativo).
- Comparação com as rotas reais do app novo (`src/App.tsx` + `src/LegacyApp.tsx`).

## 4. Matriz origem → destino

Gerada por `scripts/build-migration-matrix.mjs`:

- `docs/migracao/matriz-redirects.csv` — 622 linhas com intenção, destino, decisão e motivo.
- `redirects/tecnicocuritiba.map.json` — 612 regras 301 (`published: false`).

| Decisão | Qtd |
|---|---|
| 301 (destino auditado) | 612 |
| Manter temporariamente (sem destino) | 10 |
| 410 | 0 |

### Consolidações explícitas (canibalização e renomeação de slug)

| URL antiga | URL nova | Tipo |
|---|---|---|
| `/valores` | `/precos-e-politicas` | consolidada |
| `/index` | `/` | duplicata |
| `/privacidade` | `/politica-de-privacidade` | alias |
| `/servicos/conserto-pc-notebook` | `/servicos/manutencao-de-notebook` | consolidada |
| `/servicos/formatacao-computador` | `/servicos/formatacao` | consolidada |
| `/servicos/remocao-virus` | `/servicos/remocao-de-virus` | consolidada |
| `/servicos/redes-wifi` | `/servicos/redes-e-wifi` | consolidada |
| `/servicos/upgrade-ssd-memoria` | `/servicos/upgrade-ssd-ram` | consolidada |
| `/servicos/backup-recuperacao` | `/servicos/recuperacao-de-dados` | consolidada |
| `/manutencao-notebook-pc-curitiba` | `/servicos/manutencao-de-notebook` | equivalente |
| `/autor/tecnico-curitiba` | `/gestor-responsavel` | utilitária |
| `/atendimento/<cidade>[/<bairro>]` | `/tecnico-informatica-<cidade>` | consolidada |
| `/atendimento` | `/atendimento-domicilio` | equivalente |

Alias de slug divergente: `sao-jose-dos-pinhais` → `sao-jose-pinhais`.

### URLs sem destino (manter temporariamente — 10)

`/atendimento/{balsa-nova, contenda, mandirituba, rio-branco-do-sul, tijucas-do-sul}`
e seus `/centro`. Cidades sem hub no domínio novo; **criar cidade está fora do
escopo desta rodada**. Mantidas 200 com canonical próprio até haver destino.

### Páginas fora do foco (Etapa 6)

TV, celular, CFTV, impressora, som, videogame, eletrodomésticos e `/marcas/*`
**existem com a mesma rota no domínio novo** → classificação **A** (destino
equivalente, sem troca de intenção). Nenhuma foi apontada para serviço de
informática, portanto não há risco de soft 404 por intenção incompatível.
`/marcas/motorola` (pos. 50) e `/servicos/conserto-tv` (5 keywords) seguem
1:1 para as rotas homônimas.

## 5. Prioritárias validadas individualmente

`/`, `/valores`, `/tecnico-informatica-curitiba`, `/tecnico-informatica-fazenda-rio-grande`,
`/tecnico-informatica-colombo`, `/assistencia-tecnica-curitiba`,
`/bairros/jardim-das-americas`, `/servicos/conserto-pc-notebook/portao`,
`/diagnostico-60s`, `/suporte-empresas`, `/seja-parceiro` (backlinks).

## 6. Gate automatizado

`scripts/check-redirects.mjs` (`npm run check:redirects`) valida por URL:
status 301/308, `Location` exato, salto único, destino 200, HTTPS, ausência de
loop/retorno ao domínio antigo, canonical final self-referente, ausência de
`noindex` e ausência de redirect genérico para `/`. Relatório em
`reports/redirect-gate.json`.

Execução atual: **todas as origens em estado `PENDENTE` (200)** — esperado, pois
os redirects ainda não foram publicados. Com `--enforce` o gate falha enquanto
houver pendência (usar após a publicação).

## 7. Sitemaps

- **Antigo**: após os 301, remover as 612 URLs redirecionadas; manter apenas as
  10 sem destino durante a transição. *(Ação no repositório do domínio antigo — pendente de acesso.)*
- **Novo**: sitemap curado permanece inalterado. Nenhum bairro ou cidade novo
  adicionado nesta rodada; `lastmod` não foi tocado.

## 8. Links internos, NAP e WhatsApp

- Domínio novo: **nenhuma referência a `tecnicocuritiba.com.br` no código** (verificado por busca).
- Domínio antigo: 7 auto-referências absolutas ao próprio domínio na home +
  `wa.me/5541997452053`. Correção preparada mas **bloqueada** pela decisão #2.
- NAP do domínio novo (fonte única `src/lib/siteConfig.ts`): nome, CNPJ
  41.723.708/0001-58, cidade, telefone E.164 — inalterado.

## 9. Search Console (checklist operacional — não executado)

1. Verificar propriedade de domínio de `tecnicocuritiba.com.br` e de `tecnico.curitiba.br`.
2. Publicar os 301 e validar com o gate.
3. Enviar `https://tecnico.curitiba.br/sitemap-index.xml` na propriedade nova.
4. Aplicar **Mudança de endereço** na propriedade antiga (exige 301 da home ativa).
5. Inspecionar as 11 URLs críticas e solicitar indexação dos destinos.
6. Monitorar por 90 dias: cobertura, "Página com redirecionamento", canonical
   escolhido pelo Google, 404/soft 404.

**Sem acesso concedido nesta sessão — nada foi executado.**

## 10. Analytics

Domínio novo permanece o destino principal. Nenhuma camada nova criada. Durante a
transição, manter os eventos do domínio antigo em propriedade separada; não
habilitar cross-domain (a sessão termina no 301, sem navegação cruzada real).

## 11. Riscos

| Risco | Mitigação |
|---|---|
| WhatsApp divergente continuar captando leads | Bloquear publicação até a decisão #2 |
| Redirect publicado sem controle do repositório antigo | Etapa 1 pendente |
| Cadeia de redirects se houver Cloudflare com regra prévia | Gate detecta `hops > 1` |
| Perda de `/tecnico-informatica-fazenda-rio-grande` (único tráfego real) | 301 exato 1:1 + inspeção manual |
| 10 URLs sem destino ficarem indexadas indefinidamente | Reavaliar em rodada de cidades |

## 12. Rollback

| Arquivo | Estado anterior | Reversão |
|---|---|---|
| Config de redirect do domínio antigo | sem redirects (200) | remover as regras e republicar |
| `redirects/tecnicocuritiba.map.json` | inexistente | `git revert` do commit desta rodada |
| DNS | inalterado | — |

Prazo de observação: 30 dias. Sinais para rollback: queda >30% de impressões no
domínio novo, aumento de soft 404, ou cadeia/loop detectados pelo gate.
O domínio antigo **não deve** ser desligado — precisa responder os 301.

## 13. Confirmação

Nenhuma publicação foi feita. Nenhum preço, funil PF/PJ, conteúdo comercial,
banco ou DNS foi alterado. Aguardando as três decisões pendentes da seção 1
antes da Etapa 17.

**Próximo passo recomendado:** informar o repositório/hospedagem do domínio
antigo e confirmar o número oficial de WhatsApp.
