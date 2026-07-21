## Escopo aprovado

**Política:** teto sobe de 12 → 13 âncoras. Rebaixar Cajuru, Cristo Rei e Boqueirão (viram `noindex`, páginas continuam existindo). Promover Jardim das Américas, Ecoville, Alto da XV e Rebouças.

**Regra de geração:** um bairro só entra como indexável (ou como `noindex` novo) se o gerador produzir ≥ 300 palavras únicas (medidas contra o texto base do template) — validado no build.

**Analytics:** além do clique/submit atuais, medir impressão do botão "Agendar agora" e abertura do modal do funil.

## Alterações

### 1. Governança
- `docs/politica-poda-bairros.md`: teto → 13, nova lista de 13 âncoras, seção explicando rebaixamento (URLs preservadas conforme SEO evolutivo).
- `.lovable/memory/features/bairro-pruning-policy.md` + `mem://index.md`: refletir teto 13 e lista atualizada.

### 2. Dados dos bairros (`src/pages/servico-bairro/wifiTvBairroData.ts`)
- Adicionar campos: `indexable: boolean`, `narrativaLocal: string` (bloco ≥ 220 palavras exclusivas por bairro — perfil urbano, tipos de imóvel, particularidades de rede/TV, referências geográficas), `narrativaTv: string` opcional para nuances de TV.
- Editar 12 âncoras atuais: preencher `narrativaLocal` (base para uniqueness) e marcar Cajuru/Cristo Rei/Boqueirão como `indexable: false`.
- Adicionar 4 novas âncoras (Jardim das Américas, Ecoville, Alto da XV, Rebouças) com `narrativaLocal` próprio.
- `buildWifiBairroData` / `buildTvBairroData`: propagar `indexable`, injetar `narrativaLocal` no início de `descricaoLonga` (fica antes do bloco genérico).

### 3. Páginas e rotas
- Criar 8 componentes em `src/pages/servico-bairro/`:
  `RedesWifi{JardimAmericas,Ecoville,AltoXV,Reboucas}.tsx` e `ManutencaoTv{JardimAmericas,Ecoville,AltoXV,Reboucas}.tsx`.
- `src/LegacyApp.tsx`: importar e rotear as 8 novas páginas.
- `public/sitemap-bairros.xml`: substituir entradas antigas por um bloco curado das 13 âncoras × Wi-Fi/TV (26 URLs, `lastmod` de hoje). Remover Cajuru/Cristo Rei/Boqueirão do sitemap.
- Páginas Cajuru/Cristo Rei/Boqueirão existentes continuam servindo, mas passam a renderizar com `noindex` automaticamente via `indexable: false`.

### 4. Validador de copy (`scripts/validate-bairro-copy.mjs`)
- Importa `BAIRROS_INDEXAVEIS` via `tsx`.
- Para cada bairro: monta `buildWifiBairroData` + `buildTvBairroData`, extrai `descricaoLonga + narrativaLocal + FAQ`, tokeniza, remove stopwords PT-BR e o vocabulário do template compartilhado, exige ≥ 300 palavras próprias.
- Gate adicional: Jaccard entre bairros ≤ 0.55 para evitar duplicação cruzada.
- Falha o build via `check:bairro-copy` no `package.json` e no CI (`.github/workflows/ci.yml`).

### 5. Analytics de impressão / modal
- `src/lib/funnelAnalytics.ts`: adicionar
  - `trackFunnelAgendarImpression({ ctaLocation, modalidade, equipamento })` — dispara 1× por sessão+localização quando o botão "Agendar agora" fica ≥ 50 % visível por 400 ms.
  - `trackFunnelModalOpen({ ctaLocation, hasPreset })` — sempre que o `Dialog` transiciona de fechado→aberto.
  - `trackFunnelModalImpression({ ctaLocation })` — 1× por sessão na primeira montagem visível do modal.
- `src/components/WhatsAppFunnel.tsx`:
  - `useEffect` sobre `open`: dispara `trackFunnelModalOpen` na transição (mantém `trackFunnelOpen` para compat).
  - `IntersectionObserver` no botão "Agendar agora" (ref no botão final): dispara `trackFunnelAgendarImpression` uma vez.
  - `trackFunnelModalImpression` na primeira renderização com `open === true`.
- Deduplicação por chave `sessionId + eventName + ctaLocation` em `sessionStorage`.

### 6. Testes / gates
- Estender `scripts/check-cta-funnel.ts` para exigir presença das novas chamadas de tracking no funil.
- Adicionar `bairro-copy` ao pipeline `ci.yml` (etapa entre lint e build).
- Rodar `npm run check:jsonld` / `check:curated-meta` para garantir que os 8 novos slugs entram nos manifestos.

## Fora de escopo (explícito)

- Geração dos ~200 bairros noindex restantes: **não** será feita agora — a política aprovada é "gerar só com copy exclusiva validada", e não há copy manual para os demais. O gerador + validador ficam prontos para novas ondas.
- Reordenar bairros âncora além dos 4 novos.
- Dashboard admin de conversão (fora deste ciclo).

## Riscos
- Rebaixar Cajuru/Boqueirão perde tráfego local existente até que Ecoville/Alto XV/Rebouças indexem — impacto SEO de 4–8 semanas.
- Se o Jaccard ≥ 0.55 falhar em algum bairro, o build quebra até a narrativa ser reescrita.
