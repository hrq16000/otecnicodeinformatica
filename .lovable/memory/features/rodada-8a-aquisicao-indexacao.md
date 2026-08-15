---
name: Rodada 8A — aquisição, indexação e contrato de atribuição
description: Coortes de descoberta no GSC, canal "internal" (CTA/QA nunca é aquisição), proibição de UTM falsificada e veredito de soft-404
type: feature
---

## Indexação (evidência real, 13/08/2026)

- `/tecnico-informatica-curitiba` está **indexada** (canônico self, Breadcrumb válido).
- Serviços, bairros e serviço×cidade estão em "Discovered — currently not indexed": comportamento normal de domínio novo (go-live 06/08/2026).
- `/problemas/computador-lento` estava **desconhecida do Google** → falha de descoberta do cluster mais novo; corrigir com links internos das páginas já indexadas, nunca com nova página.
- Regra: só mudar estrutura de indexação com evidência do Search Console.

## Soft-404

Rotas inexistentes respondem HTTP 200 (SPA). Mitigação vigente: `NotFound.tsx` força `noindex, nofollow`, remove canonical e JSON-LD. Google não indexou nenhuma URL inexistente. Corrigir o status real só é possível na borda (`cloudflare/worker.js`, hoje em modo `dns`). Veredito: observar, não bloquear rodadas.

## Contrato de atribuição (obrigatório)

Fonte única: `src/lib/canalAtribuicao.ts`.

- Canal `internal` ("Interno / QA") para `utm_source` em site/ci/ga4ci/qa/test/e2e ou `utm_medium` em cta/cta_interno/internal/qa/test. **Nunca conta como aquisição** (`CANAIS_DE_AQUISICAO` não o inclui).
- Rótulos legados normalizados na leitura: `direto`→`direct`, `ads`→`google_ads`, `organico`→`organic`. Histórico do banco não é reescrito.
- Proibido carimbar `utm_medium=organic|cpc|paid|seo|referral` como default em link de saída (`utmCapture.appendUtmsToUrl` usa `cta_interno`).
- Gate bloqueante: `npm run check:acquisition-attribution`. Política: `docs/governanca-utm.md`.
- Consequência: sessões elegíveis de aquisição = 0 → experimentos de CRO seguem NOT_READY.

## Instrumento novo

`npm run report:discovery-coverage` — amostra estratificada dos sitemaps curados no URL Inspection e classifica em INDEXADA / DESCOBERTA_NAO_INDEXADA / RASTREADA_NAO_INDEXADA / DESCONHECIDA / BLOQUEADA. Fail-soft sem credenciais.

## Dados de leitura pública (segurança)

Público lê parceiros por `public.partners_public` e avaliações por `public.reviews_public` (ambas `security_invoker=true`), nunca as tabelas base. `documento`, `documento_tipo`, `client_phone`, `origin_protocol` e `origin_path` seguem revogados para `anon`.
