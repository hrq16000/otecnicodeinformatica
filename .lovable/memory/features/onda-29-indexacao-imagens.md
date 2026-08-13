---
name: Onda 29 — indexação, schema local e integridade de imagens
description: Gates de canonical/âncoras, integridade e originalidade de imagens, Service JSON-LD em /problemas, image sitemap no índice e rotina de revalidação de indexação com backoff.
type: feature
---

## Schema local
- `/problemas/*` passou a emitir também `Service` (slot `service`), com `provider` apontando para `#organization` e `areaServed` da configuração de geografia. FAQPage, TechArticle, WebPage e Breadcrumb continuam nos slots existentes.

## Gates novos (rodam no postbuild)
- `check:image-integrity` (`scripts/check-image-integrity.mjs`): valida toda imagem referenciada por página indexável — existência, tamanho mínimo (12KB), hash sha256 único por arquivo, assinatura de bloco (recortes/reexports), EXIF com assinatura de gerador de IA e nome de arquivo com marcação de IA. Erro bloqueia; reuso/baixa cobertura vira alerta em `reports/image-integrity.json` (campo `semFotoReal` lista páginas que só têm a marca).
- `check:canonical-anchors` (`scripts/check-canonical-anchors.mjs`): canonical auto-referente obrigatório apenas para URLs curadas (aliases podem canonicalizar para o destino), canonical nunca aponta para origem de redirect 3xx, âncoras internas não apontam para origem de redirect nem para rota inexistente, e checagem de intenção (sintoma precisa linkar serviço; bairro precisa linkar hub local).

## Indexação
- `scripts/generate-image-sitemap.mjs` agora declara `sitemap-images.xml` dentro de `dist/sitemap-index.xml` e `dist/sitemap.xml` (só com domínio configurado).
- `npm run reindex:pending` (`scripts/reindex-pending.mjs`): lê URLs curadas dos sitemaps, inspeciona o estado no índice (URL Inspection = leitura), ressubmete o sitemap e dispara IndexNow em lotes com backoff exponencial + jitter, gerando `reports/reindex-pending.{json,md}` com o motivo de cada pendência. `--dry-run`, `--limit`, `--alert`.
- Edge function `indexnow-ping` deixou de ter o host da marca de origem hardcoded: usa `SITE_DOMAIN`/`INDEXNOW_KEY` do ambiente.
