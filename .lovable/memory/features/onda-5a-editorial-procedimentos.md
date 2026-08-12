---
name: Onda 5A — procedimentos técnicos + limpeza de marca herdada
description: Reescrita integral de dois guias herdados (recuperação de dados e upgrade NVMe), teto de 14 artigos indexáveis e purga da marca de origem no acervo editorial.
type: feature
---

- Artigos promovidos: `como-recuperar-dados-hd-com-defeito` e `como-fazer-upgrade-ssd-nvme`. Ambos foram REESCRITOS do zero (o texto-modelo programático herdado foi descartado), com ~1.400–1.500 palavras no estático.
- Capas: fotografias reais do Wikimedia Commons — HD Toshiba (CC BY-SA 2.0, Brian Wong) e SSD NVMe M.2 (CC0 1.0, User5515). Nenhuma imagem de IA.
- Teto de indexáveis: `MAX_INDEXAVEIS = 14` em `scripts/check-editorial-wave-3o.mjs`.
- Ao criar uma nova onda `WAVE_XX` em `src/lib/blogEditorialRegistry.ts`, é obrigatório acrescentar o bloco correspondente ao parser de paridade em `scripts/check-editorial-wave-3o.mjs` E em `scripts/check-editorial-governance.mjs` — os dois leem o registro por regex por onda.
- Limpeza de marca: 42 ocorrências da marca de origem em `src/data/blogPostsContent.tsx` foram substituídas por `{BRAND_NAME}` (import de `@/lib/siteConfig`). Nenhum texto editorial pode voltar a citar marca herdada.
- Conteúdo de recuperação de dados declara explicitamente que NÃO há garantia de sucesso e encaminha falha mecânica a laboratório especializado — não prometer taxa de sucesso, prazo ou preço.
