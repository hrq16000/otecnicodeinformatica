# Rodada 5C — Serviço × Curitiba (relatório final)

Data: 14/08/2026 · Escopo: rotas já existentes `/servicos/:servico/curitiba` · Nenhuma rota nova criada.

## 1. Resumo executivo

A camada serviço × cidade foi provada em Curitiba em três lotes, sem criar nenhuma URL nova:
o roteamento `/servicos/:servico/:cidade` já existia e a promoção acontece exclusivamente pela
política central (`src/lib/localIndexPolicy.json`) somada a conteúdo local autoral declarado em
`src/lib/servicoCuritibaBlocos.json`.

- 13 rotas serviço × Curitiba indexáveis, todas com conteúdo local próprio.
- `check:local-service-intent`: 13/13 conformes.
- `check:local-doorway`: nenhum padrão de doorway (teto 0,45 preservado, não relaxado).
- `npm run build` verde, 9/9 gates de pré-build, 557 testes unitários passando.

## 2. Rotas serviço × Curitiba encontradas

A rota é genérica (`/servicos/:servico/:cidade`), portanto qualquer slug de serviço resolve.
A existência da rota **não** implica indexação: sem blocos autorais, a política mantém
`canonicalized` para o serviço-pai e fora do sitemap (fail-closed).

## 3. Lote escolhido (lote 3 desta rodada — 6 URLs)

| URL local | Serviço pai | Pai existe? | Index | Canonical | Sitemap |
|---|---|---|---|---|---|
| /servicos/suporte-tecnico-empresarial/curitiba | /servicos/suporte-tecnico-empresarial | sim | index | self | sim |
| /servicos/manutencao-preventiva-empresas/curitiba | /servicos/manutencao-preventiva-empresas | sim | index | self | sim |
| /servicos/backup-para-empresas/curitiba | /servicos/backup-para-empresas | sim | index | self | sim |
| /servicos/montagem-de-pc/curitiba | /servicos/montagem-de-pc | sim | index | self | sim |
| /servicos/suporte-home-office/curitiba | /servicos/suporte-home-office | sim | index | self | sim |
| /servicos/pc-gamer/curitiba | /servicos/pc-gamer | sim | index | self | sim |

Lotes anteriores já promovidos (7): conserto-notebook, conserto-pc, redes-wifi,
backup-recuperacao, formatacao-computador, remocao-virus, upgrade-ssd.

Fora do lote por decisão: TV, celular, CFTV, videogame, som e demais verticais adjacentes.

## 4. Relação serviço global × local

| Serviço | Intenção global | Intenção Curitiba | Risco |
|---|---|---|---|
| Suporte empresarial | modelos de suporte, escopo, níveis de serviço | abrir chamado, remoto imediato × visita, deslocamento por região | baixo |
| Preventiva empresas | o que é preventiva, checklist, periodicidade | agendar em lotes sem parar o expediente, relatório por máquina | baixo |
| Backup empresas | estratégias, 3-2-1, retenção, versionamento | implantação no escritório, cópia externa, teste de restauração | baixo |
| Montagem de PC | componentes, compatibilidade, etapas técnicas | quem compra a peça, bancada, transporte, garantia dividida | baixo |
| Home office | requisitos do posto remoto, boas práticas | resolver no mesmo dia, sinal no cômodo, notebook corporativo | baixo |
| PC gamer | configurações, gargalos, refrigeração | montagem/revisão/reparo em bancada, coleta e transporte da torre | baixo |

## 5. Similaridade antes/depois

Antes: rotas sem conteúdo próprio (template herdado) → mantidas canonicalizadas.
Depois: blocos autorais por serviço; gate antidoorway não acusou nenhuma página
acima do teto de 0,45 nem contra o serviço-pai nem entre pares locais.

## 6–10. Conteúdo, metadata, canonical, robots e sitemap

- Conteúdo: 6 blocos autorais + 5 perguntas de FAQ operacional por página, sem repetir
  causas técnicas, diagnóstico ou comparações do serviço-pai.
- Metadata: title, description, H1 e subtítulo próprios; colisão de title entre
  `/servicos/manutencao-preventiva-empresas` e sua página local foi detectada pelo gate GEO e corrigida.
- Canonical: self em todas as promovidas; demais variantes seguem apontando para o pai.
- Robots e sitemap: derivados exclusivamente da política central; sem lista paralela.

## 11–13. Schemas, areaServed e interlinking

- `Service` + `WebPage` + `BreadcrumbList` (Início → Serviços → serviço → Curitiba) e `FAQPage`.
- `provider` do grafo institucional único (sem novo LocalBusiness por serviço); `areaServed` = Curitiba.
- Interlinks por página: serviço pai (obrigatório) + Curitiba + áreas atendidas + 1–2 contextuais
  (problema relacionado, hub empresarial, coleta e entrega ou outra página local do mesmo núcleo).

## 14–15. CTA e FAQ

CTA contextual com serviço, cidade e origem `service-city-page`, usando a infraestrutura de funil
existente (WhatsApp). FAQ operacional distinta por serviço — nenhuma pergunta repetida entre páginas.

## 16–17. Gates

- `check:local-doorway`: 21 páginas analisadas, nenhum padrão de doorway.
- `check:local-service-intent`: 13 rotas conformes (pai real, intenção distinta, canonical, sitemap, volume mínimo de 550 palavras).
- `check:local-index-policy`, `check:geo`, `check:schema-standards`, `check:robots`: verdes.

## 18–22. Performance, CLS, motion, mobile, a11y e segurança

Sem novos componentes, imagens ou rotas: templates e orçamentos de performance inalterados,
skeletons e `prefers-reduced-motion` preservados. Nenhuma alteração em RLS, RPCs administrativas,
view pública de parceiros, allowlist de broadcast ou auditoria de acessos.

## 23–24. Build e testes

- `npm run build`: verde, 9/9 gates de pré-build, postbuild completo.
- Vitest: **557 testes / 17 arquivos**, 100% aprovados.

## 25. Rotas rejeitadas para indexação (e correção proposta)

| Rota | Motivo da rejeição | Correção para entrar num próximo lote |
|---|---|---|
| /servicos/conserto-tv/curitiba | vertical adjacente fora do núcleo de informática nesta rodada | provar demanda local e escrever operação própria (coleta de TV, recusa de painel) |
| /servicos/conserto-placa/curitiba | serviço de bancada sem operação local diferenciada | descrever fluxo real de recebimento, laudo e prazo de bancada |
| /servicos/conserto-monitor/curitiba | mesma operação de coleta já descrita em outras páginas | criar conteúdo próprio de logística ou manter canonicalizada |
| Demais `/servicos/:slug/curitiba` sem blocos | fail-closed: sem conteúdo local declarado | escrever blocos + FAQ operacional antes de qualquer promoção |

## 26. Oportunidades não executadas

Serviço × São José dos Pinhais; serviço × bairro âncora para o núcleo empresarial;
blocos de preço dinâmicos a partir da fonte comercial central nas páginas locais.

## 27. Pendências

- 🔴 P0 — nenhuma.
- 🟠 P1 — titles/descriptions longos herdados em `/problemas/*` e `/solucoes/*` (avisos do gate GEO).
- 🟡 P2 — avaliar `Offer` nas páginas locais somente se a fonte comercial central permitir.
- 🟢 P3 — revisitar verticais adjacentes (TV, placa, monitor) em rodada própria.

## Vereditos

**1 — Intenções suficientemente diferentes para coexistir?**
SIM para as 13 rotas promovidas (6 deste lote + 7 anteriores). NÃO para as demais, que seguem canonicalizadas.

**2 — Gate antidoorway:** 6/6 no lote atual · 13/13 no acumulado.

**3 — Pronto para replicar em São José dos Pinhais?** SIM, POR LOTE CONTROLADO.

## Próximo passo recomendado (não executado)

**A — Serviço × São José dos Pinhais**, em lote de 3–4 serviços de maior tração,
com operação local real (deslocamento e coleta intermunicipal) descrita antes da promoção.
