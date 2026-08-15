---
name: Rodada 4C — consolidação semântica e hardening
description: Decisão das 21 páginas "reavaliar" de /problemas, canonical consolidado e restrições de segurança em parceiros/telemetria
type: feature
---

## Consolidação semântica (/problemas)

- Fonte única: `src/lib/problemDecisions4c.ts`. Nenhuma URL foi removida (Fase 40).
- 21 URLs herdadas com sufixo `-curitiba` saíram de "reavaliar": **17 CANONICALIZAR** (noindex + canonical para o sintoma canônico do cluster) e **4 REPOSICIONAR** (canonical self, noindex, entram no Lote 2).
- Canônicos pendentes que o Lote 2 deve criar: `/problemas/computador-nao-liga` e `/problemas/bluetooth-nao-conecta` (consolida as 3 variações de Bluetooth).
- `ProblemaPage.tsx` aplica `canonicalDecidido()`; canonical em cadeia é proibido.
- Gate `check:problem-decisions` (CI): falha se alguma URL "reavaliar" do inventário ficar sem decisão, se o alvo não for indexável ou se uma URL com sufixo local voltar ao sitemap.

## Hardening

- `partners`: privilégios por COLUNA. `documento` e `notas_admin` fora do alcance de qualquer usuário logado — só admin via `admin_list_partners()`.
- `partners_public`: somente SELECT para anon/authenticated.
- `click_events`: anon só INSERT; authenticated SELECT (RLS admin) + INSERT. Sem UPDATE/DELETE para ninguém além de service_role.
- `admin_list_partners` / `admin_list_reviews`: fail-closed com `RAISE EXCEPTION` para não-admin (antes devolviam lista vazia). O aviso do linter "SECURITY DEFINER executável por logados" é **aceito**: são RPCs de admin que precisam ser chamadas por sessão autenticada e checam `has_role` na primeira linha.
- Broadcast realtime de `click_events` passa por `projetarEventoClique` (`src/lib/realtimeSafeFields.ts`); campos `bairro`, `cidade`, `problema`, `equipamento`, `modalidade`, `viewport_width` nunca entram no estado da UI. Gate `check:realtime-payload`.
