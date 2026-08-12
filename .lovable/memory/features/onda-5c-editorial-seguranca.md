---
name: Onda 5C — cluster editorial de segurança
description: Reescrita indexável de "como escolher um antivírus" e "golpes na internet", teto de 18 artigos e capas licenciadas do Commons.
type: feature
---

# Onda 5C — segurança (antivírus e golpes on-line)

- Slugs promovidos a indexáveis: `como-escolher-um-bom-antivirus` e
  `como-proteger-computador-golpes-internet` (bloco `WAVE_5C` em
  `src/lib/blogEditorialRegistry.ts` + `scripts/lib/editorial-wave.mjs`).
- Teto atual de artigos indexáveis: **18** (`MAX_INDEXAVEIS` em
  `scripts/check-editorial-wave-3o.mjs`). Toda nova onda exige: bloco
  `WAVE_<id>` no registro, parser correspondente nos dois gates editoriais,
  entrada em `blogEditorialCovers.ts`, `blogEditorialSources.ts` e links de
  entrada em `editorialInboundLinks.ts` (máx. 3 por página comercial).
- Capas: fotografias reais licenciadas do Wikimedia Commons —
  MEMZ Trojan (CC BY-SA 4.0, BrayLockBoy) e Computer virus scam (CC0,
  Packer1028). Sem IA. Crédito impresso no `<figcaption>` estático.
- Ambos os artigos apontam para `/servicos/remocao-de-virus` como pilar;
  apoio em `/servicos/formatacao` e `/servicos/recuperacao-de-dados`.
- Regras de conteúdo aplicadas: sem ranking de fabricante, sem promessa de
  detecção total, HTTPS/cadeado tratado como não-atestado de idoneidade.
