
# Plano — Analytics, Validação, Galeria, FAQ e Bairros (Wi-Fi + TV Smart)

## 1. Analytics — Fallback "unknown" nos CTAs
Arquivo: `src/lib/funnelAnalytics.ts` e `src/components/WhatsAppFunnel.tsx`.
- Em `trackWaClick` / `trackCallClick`, sempre garantir params `modalidade` e `problema`; quando ausentes → `"unknown"`.
- Novo helper `trackCtaWithContext(type, location, ctx?)` que lê `sessionStorage['wa-funnel:last-triage']` e completa faltantes com `"unknown"`.
- Aplicar nos botões "WhatsApp Agora" e "Ligar Agora" globais (Header, Float, HeroPremium, ProblemaPage).

## 2. Evento dedicado para serviços internos em `/problema/*`
- Novo evento GA4 `problema_service_click` em `src/lib/funnelAnalytics.ts`.
- Payload: `{ problema_slug, servico_slug, servico_href, cta_location: 'problema_internal_link' }`.
- Emitido pelos cards/links internos que apontam para `/servicos/*` dentro de `ProblemaPage.tsx`.

## 3. Validação de links internos + tracking de falhas
- Criar `src/lib/internalLinkAudit.ts` com whitelist de rotas `/servicos/*` derivada de `servicosCore.ts` e `servicosLocal.ts`.
- Ao renderizar `ProblemaPage`, validar cada href; se inválido:
  - Não renderizar link quebrado (fallback para texto).
  - Emitir `problema_link_broken` com `{ problema_slug, target_href, reason }`.
- Script CI opcional: `scripts/check-problema-internal-links.mjs` (varre `problemaSummaries` e confirma rotas).

## 4. Scroll depth + visibilidade de CTAs em `/problema/*`
- Novo hook `src/hooks/useScrollDepthTracking.ts` disparando `scroll_depth` em 25/50/75/100% (uma vez por sessão por página).
- Novo hook `useCtaVisibility.ts` usando IntersectionObserver: dispara `cta_visible` com `{ cta_type, cta_location, visible_at_ms }` quando ≥50% visível por 400ms.
- Wire nos CTAs principais de `ProblemaPage.tsx` (hero WhatsApp, sticky mobile, bloco final).

## 5. Galeria WebP — Wi-Fi e TV Smart
- Gerar 6 imagens WebP via imagegen (3 Wi-Fi: site survey, roteador/mesh, cabeamento; 3 TV Smart: painel aberto, medição, tela nova instalada).
- Externalizar via `lovable-assets` como `.asset.json`.
- Novo componente `src/components/gallery/ServiceGallery.tsx` (grid responsivo, `loading="lazy"`, `decoding="async"`, alt e figcaption).
- Aplicar em `src/pages/servicos/RedesWifi.tsx` e `src/pages/servicos/ManutencaoTV.tsx`.

## 6. FAQ de triagem (Wi-Fi e TV Smart)
- Fonte: catálogo em `src/lib/funnel/triageConfig.ts` (sintomas por equipamento).
- Adicionar 4–6 perguntas por página em Wi-Fi e TV Smart:
  - "O que fazer antes da visita" (reboot, cabos, checagens seguras).
  - "Sinais de falha" (piscar de LED, listras, quedas intermitentes).
  - "Como definimos o orçamento" (mínimo R$ 99,99, coleta R$ 299,99 quando aplicável).
- FAQ renderizada no componente existente + JSON-LD `FAQPage`.

## 7. Páginas dedicadas por bairro (Wi-Fi e TV Smart)
**Decisão de política:** memória diz "12 bairros-âncora indexáveis; resto noindex". Vamos usar os 5 bairros já curados no `sitemap-bairros.xml`: **Batel, Centro, Água Verde, CIC, Portão** — indexáveis. Outros bairros ficam fora deste escopo.

- Estrutura:
  - `/redes-wifi/<bairro>` → 5 páginas.
  - `/manutencao-tv-smart/<bairro>` → 5 páginas.
- Reutilizar `ServicoBairroTemplate` (adaptando ou clonando) com:
  - Copy exclusiva por bairro (referências geográficas locais).
  - CTAs disparando o funil V5 (`wa-funnel:open` com preset `{ equipamento, bairro }`).
  - JSON-LD `LocalBusiness` + `Service` + `FAQPage`.
  - `noindex` OFF (indexáveis).
- Registrar no `sitemap-bairros.xml` (10 novas URLs) e no gerador `scripts/generate-sitemaps.mjs`.

## Detalhes técnicos
- Sem alterações no funil V5, apenas em consumidores.
- Testes: adicionar unit tests para `internalLinkAudit`, `useScrollDepthTracking`, e um E2E `problema-analytics.spec.ts` verificando disparo dos eventos.
- CI: novo gate `check:problema-internal-links` no `package.json`.
- Assets: uso obrigatório do CLI `lovable-assets` para as 6 imagens WebP.

## Escopo NÃO incluído
- Não gerar páginas para bairros fora dos 5 curados (respeita a política de poda).
- Não alterar preços/regras do funil.
- Não indexar conteúdo editorial (fundação editorial fail-closed mantida).

## Confirmações antes de iniciar
1. Confirmar os 5 bairros indexáveis (Batel, Centro, Água Verde, CIC, Portão) para as novas landing pages.
2. Confirmar rotas `/redes-wifi/<bairro>` e `/manutencao-tv-smart/<bairro>` (alternativa: manter padrão `/servicos-bairro/<servico>-<bairro>` já existente).
