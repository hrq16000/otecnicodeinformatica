---
name: Rodada 8E — cluster editorial de aquisição orgânica
description: Cluster piloto formatação/lentidão, mapa de intenção único por URL, gate check:content-intent e teto de 32 artigos indexáveis.
type: feature
---

- Fonte única de intenção editorial: `src/lib/contentIntentMap.ts`. Uma intenção por URL
  (informacional, diagnóstica, comercial, comercial local). Nunca criar duas páginas para
  o mesmo par tema × intenção.
- Cluster piloto: `/blog/como-formatar-pc-sem-perder-arquivos` (informacional, rota
  reaproveitada e reescrita) + `/blog/quanto-custa-formatar-um-computador` (comercial, única
  rota nova) → pontes para `/servicos/formatacao`, `/problemas/computador-lento` e
  `/diagnostico-tecnico`.
- Teto de artigos editoriais indexáveis: **32** (bloco `WAVE_8E` em `blogEditorialRegistry.ts`).
- Gate bloqueante `npm run check:content-intent` (prebuild + weekly-gates): valida unicidade
  de intenção, aprovação no registro, existência real das pontes no corpo do artigo,
  proibição de repetir tutorial na página comercial e conferência de todo valor monetário
  contra `src/lib/precosConfig.ts`.
- `check-editorial-governance.mjs` agora detecta qualquer bloco `WAVE_XX` por regex genérica —
  não editar o gate a cada nova onda.
- Slug editorial **nunca** recebe cidade; localização é função das páginas locais.
- Rascunhos programáticos homônimos devem ser removidos ao promover um slug para
  `blogPostsContent.tsx` (evita duas versões da mesma URL).
- Relatório: `npm run report:content-intent` → `reports/content-intent-8e.md`.
