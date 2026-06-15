## Objetivo
Entregar 5 frentes coesas: painel admin, tracking analítico, conteúdo legal/serviço, padronização de schema e testes do funil.

---

### 1. Painel Administrativo `/admin/funnel`
- Rota protegida por autenticação (Lovable Cloud auth + tabela `user_roles` com role `admin`).
- Listagem paginada de `funnel_submissions` com filtros: data, equipamento, marca, requires_coleta, utm_source/campaign, busca em `wa_message`.
- Drawer de detalhe: dados completos + galeria de mídias (signed URLs do bucket `funnel-uploads`, 1h).
- Campo `status_atendimento` (novo/contatado/agendado/fechado/perdido) editável inline.
- Export CSV do filtro atual.

**Migração**
- `ALTER TABLE funnel_submissions ADD status_atendimento text DEFAULT 'novo', notas_admin text, atendido_em timestamptz, atendido_por uuid`.
- Criar enum `app_role` + tabela `user_roles` + função `has_role` (padrão do projeto).
- Adicionar policies: `SELECT/UPDATE` em `funnel_submissions` para `has_role(auth.uid(),'admin')`.
- Edge function `admin-funnel-media-url` que gera signed URL (valida `has_role` server-side).

### 2. Tracking de eventos (GA4 + UTMs)
- `src/lib/funnelAnalytics.ts` com helpers `trackFunnelOpen`, `trackStep`, `trackSubmit`, `trackWaClick`, `trackCallClick`.
- Eventos GA4 via `window.gtag` (já carregado pelo projeto). Fallback silencioso se ausente.
- Capturar UTMs + `gclid` da URL no primeiro hit, persistir em `sessionStorage` (`utm_payload`), reaproveitar no insert do `funnel_submissions` e em todo clique `wa.me`/`tel:`.
- Disparar eventos em: `WhatsAppFunnel` (abrir, cada step concluído, submit, bloqueio), `WhatsAppFloat`, `WhatsAppChatbot`, `ExitIntentPopup`, `Header`, `Footer`, `PageHero`.

### 3. Páginas `/termos-e-condicoes` e `/coleta-e-entrega`
- `/termos-e-condicoes` já existe (`TermosCondicoes.tsx`) — apenas auditar links internos e garantir rota registrada.
- `/coleta-e-entrega`: já existe `ColetaEntrega.tsx` mas será expandida — verificar conteúdo, adicionar:
  - Tabela transparente de preços (mín R$ 300, diagnóstico R$ 90, prazo 3-7 dias).
  - Schema `Service` + `Offer` + `FAQPage` + `BreadcrumbList`.
  - Bloco "Quando é obrigatório" (sintomas "não liga / desliga sozinho").
  - CTA que abre `WhatsAppFunnel` já no branch correto.
  - Links internos para hubs (PC, TV, etc.) e Termos.

### 4. JSON-LD e headings dos hubs/locais
- Auditar `CategoryLocalTemplate.tsx`, `ArrumarPCCityTemplate.tsx`, `ServicoBairroTemplate.tsx`:
  - Garantir 1 `<h1>` por página, hierarquia h2/h3 coerente.
  - `Service` com `provider.@id` apontando ao `#localbusiness` único.
  - `Offer` com `price`, `priceCurrency`, `priceSpecification` (R$ 99,99 visita / R$ 90 diagnóstico / mín R$ 300).
  - `FAQPage` com ≥ 3 perguntas localizadas.
  - `BreadcrumbList` com itens corretos (Início → Categoria → Cidade/Bairro).
  - `AggregateRating` no LocalBusiness sitewide.
- Estender `scripts/validate-jsonld.mjs` para validar 1 amostra de hub (`/conserto-tv-curitiba`) e 1 de local (`/conserto-tv-curitiba/batel`).

### 5. Testes automatizados do funil
- Playwright (`e2e/whatsapp-funnel.spec.ts` já existe — expandir):
  - Branch PC, TV, celular, som, videogame.
  - Sintoma "não liga" → exibe `ColetaRequiredCard` com R$ 300 e bloqueia botão WhatsApp até aceitar.
  - Upload obrigatório: tentar avançar sem mídia → erro visível.
  - Validação de tamanho (>50MB vídeo) e formato.
  - Mobile viewport (iPhone 12) — modal deve ser scrollável.
- Vitest: `MediaUploader` (validações puras), `equipmentBranches` (regras), `funnelAnalytics` (envio gtag).
- Rota fallback `/funil-indisponivel` para erro de upload/insert (link para `wa.me` direto **com aviso explícito** e marcação `data-funnel-skip="1"`).

---

## Detalhes técnicos
- **Auth admin**: usar Lovable Cloud auth (email/senha). Não auto-confirma email. Primeiro admin promovido manualmente via SQL.
- **Storage**: signed URLs com `createSignedUrl(path, 3600)` apenas no edge function.
- **GA4**: medir `wa_funnel_open`, `wa_funnel_step`, `wa_funnel_submit`, `wa_funnel_blocked`, `wa_click`, `call_click` — todos com `equipamento`, `sintoma`, `utm_*` como params.
- **Sem mudanças no PricingBanner / preços visuais** — apenas refletir no schema.
- **Não remover** rotas/legacy (memória core).

## Arquivos
**Criar**: `src/pages/admin/AdminFunnel.tsx`, `src/pages/admin/AdminLogin.tsx`, `src/pages/admin/SubmissionDrawer.tsx`, `src/pages/FunilIndisponivel.tsx`, `src/lib/funnelAnalytics.ts`, `src/lib/utmCapture.ts`, `src/hooks/useAdminAuth.ts`, `supabase/functions/admin-funnel-media-url/index.ts`, testes vitest e playwright novos.
**Editar**: `WhatsAppFunnel.tsx`, `ColetaEntrega.tsx`, `App.tsx`, `CategoryLocalTemplate.tsx`, `ArrumarPCCityTemplate.tsx`, `scripts/validate-jsonld.mjs`, `sitemap.xml`.
**Migração**: colunas admin + user_roles + has_role + policies.

## Fora de escopo
- Notificações push de novo lead (futuro).
- Integração com CRM externo.
- Refazer design dos hubs.

---

**Pergunta antes de executar:** algum ponto a remover/repriorizar, ou posso seguir com tudo?