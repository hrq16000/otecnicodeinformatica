
# Plano de Implementação

5 entregas independentes, integradas ao ecossistema atual (WhatsAppFunnel global, Lovable Cloud, prerender de cidades).

---

## 1. Banner topo da home — Oferta R$ 99,99 / 30 min

**Novo componente** `src/components/TopOfferBanner.tsx`:
- Banner fixo logo abaixo do `<Header />` (acima do `HeroSection`), visível em mobile e desktop.
- Conteúdo: "⚡ Serviço Rápido até 30 min — **R$ 99,99**" + CTA "Chamar agora" (abre o `WhatsAppFunnel`) + link "Termos e Condições" → `/termos-e-condicoes`.
- Pode ser fechado (X) e o estado persiste em `sessionStorage` (volta na próxima sessão).
- Cores marca (gradient accent), altura compacta (~44px desktop / 64px mobile), sem quebrar LCP.
- Aplicado **apenas na home** (`src/pages/Index.tsx`) para preservar o layout das demais páginas.

**Importante:** o `PricingBanner` atual mostra R$ 69,99. Conforme a memória, manter coexistência: o novo banner promove a oferta-âncora de 30 min (R$ 99,99), enquanto o `PricingBanner` continua como "visita técnica padrão a partir de R$ 69,99" para os atendimentos não-expressos.

---

## 2. WhatsAppFunnel ramificado por equipamento

Refatoração de `src/components/WhatsAppFunnel.tsx` mantendo a API pública (`wa-funnel:open`, intercepção global de `wa.me`, sessionStorage, UTMs, transparência) e adicionando ramificação:

### Novo fluxo
1. **Step 0 — Tipo de equipamento** (substitui o atual "O que você precisa?"):
   - PC / Notebook
   - TV
   - Celular / Tablet
   - Som / Áudio (home-theater, caixa, soundbar)
   - Videogame (PS, Xbox, Switch)
   - Outro / só orçamento

2. **Step 1 — Perguntas múltipla escolha específicas** por categoria (estrutura declarativa em `src/components/funnel/equipmentBranches.ts`):
   - **PC/Notebook**: marca → sintoma (não liga / lento / tela / vírus / outro) → tem áudio/imagem?
   - **TV**: tamanho → sintoma (não liga / tela quebrada / sem imagem / sem som / linhas/manchas / liga e desliga sozinha)
   - **Celular**: marca → sintoma (tela trincada / não carrega / molhou / lento / sem som)
   - **Som**: tipo → sintoma (sem som / chiado / não liga / Bluetooth)
   - **Videogame**: console → sintoma (não liga / não lê disco / HDMI / drift de controle / superaquecimento)

3. **Step 2 — Mídia obrigatória** (regras "completo + sem áudio + sem ruído"):
   - Upload de **fotos** (mín. 1, máx. 5) e **vídeo** (mín. 1 quando o sintoma envolve tela/display/imagem/som — ver regra abaixo).
   - **Avisos visíveis** com checkboxes obrigatórios:
     - ☐ Equipamento completo no vídeo (mostra entrada de energia, traseira, tela e laterais)
     - ☐ Vídeo SEM áudio de pessoas falando (mute o microfone)
     - ☐ Ambiente SEM ruído de fundo
   - Validação client-side: tipo (image/*, video/*), tamanho (foto ≤ 8MB, vídeo ≤ 50MB), duração mínima 10s para vídeo.
   - Upload para Lovable Cloud Storage (bucket privado `funnel-uploads`) via `supabase.storage`. URLs assinadas (válidas 24h) são incluídas na mensagem do WhatsApp.
   - Se o usuário recusar/falhar upload obrigatório → o botão "Continuar" fica bloqueado e exibe mensagem "Sem fotos/vídeo válidos não conseguimos triagem prévia".

4. **Step 3 — Regra "Não liga / Desliga sozinho" → Coleta e Entrega obrigatória**:
   - Se sintoma ∈ {"não liga", "desliga sozinho", "liga e desliga sozinha", "molhou", "tela quebrada", "sem imagem"} → bloqueia "Levo até parceiro" e "Visita técnica".
   - Mostra card destacado: **"Esse caso exige Coleta e Entrega"**:
     - Valor mínimo do reparo: **R$ 300** (já incluso diagnóstico)
     - Coleta + entrega: conforme tabela atual de `coletaConfig.ts`
     - Prazo: 3–7 dias úteis após diagnóstico aprovado
     - Se desistir após diagnóstico: paga apenas R$ 90
   - Checkbox obrigatório: ☐ "Estou ciente e autorizo a coleta sob estas condições"
   - Link visível para `/coleta-entrega` e `/termos-e-condicoes`.

5. **Step 4 — Confirmação**: revisão + envio para WhatsApp (mensagem inclui URLs assinadas das mídias, sintoma, regra aplicada).

### Bloqueio do atendimento humano
- Hoje qualquer clique em `wa.me` abre o funil, mas o usuário pode fechar e o clique original é cancelado — comportamento já existente.
- **Reforço**: enquanto o funil estiver aberto e a triagem não estiver completa (todos os campos válidos do step atual), o botão "Continuar" fica `disabled` e o botão final de WhatsApp só renderiza no step 4. Não há atalho para `wa.me` direto dentro do modal.
- O `WhatsAppFloat`, `WhatsAppChatbot` e demais entry points continuam interceptados — a triagem é obrigatória sempre.

### Telemetria
- `wa_funnel_branch_select` (equipamento), `wa_funnel_media_upload` (count, total bytes), `wa_funnel_coleta_required` (sintoma), `wa_funnel_blocked` (motivo).

---

## 3. Storage para uploads

**Bucket privado** `funnel-uploads` via `supabase--storage_create_bucket`.

**Tabela** `funnel_submissions` para auditoria:
- `id`, `session_id`, `equipamento`, `marca`, `sintoma`, `requires_coleta` (bool), `media_paths` (jsonb), `wa_message` (text), `utm_*`, `created_at`.
- RLS: INSERT público (anon), SELECT apenas service_role (admin via edge function futura). GRANT explícito.

**Policy de Storage**: INSERT público no bucket (com prefixo de session_id), SELECT só via signed URL.

---

## 4. Hubs SEO locais — TV, Som, Videogame, Celular

Replica a arquitetura `arrumar-pc/*` mas focada em **Curitiba e bairros/cidades RMC** (não capitais nacionais — alinhado à estratégia local da memória).

### Estrutura de pastas (paralela ao `arrumar-pc`):
```
src/pages/conserto-tv/
  ConsertoTVCityTemplate.tsx
  ConsertoTVCity.tsx          (router param wrapper)
  cities.ts                   (Curitiba + 11 RMC + 8 bairros principais)
  cityImages.ts               (reusa fallback genérico de categoria)
src/pages/conserto-som/       (mesma estrutura)
src/pages/conserto-videogame/ (mesma estrutura)
src/pages/conserto-celular/   (mesma estrutura — complementa o existente ConsertoCelular.tsx)
```

### Rotas (`src/App.tsx`)
- `/conserto-tv/:cidade`
- `/conserto-som/:cidade`
- `/conserto-videogame/:cidade`
- `/conserto-celular/:cidade`

Cobertura inicial (cada categoria): `curitiba`, `sao-jose-dos-pinhais`, `araucaria`, `pinhais`, `colombo`, `campo-largo`, `almirante-tamandare`, `fazenda-rio-grande`, `piraquara`, `quatro-barras`, `campo-magro` + 8 bairros (`batel`, `centro`, `cic`, `portao`, `santa-felicidade`, `boqueirao`, `cajuru`, `agua-verde`).

**Total**: 4 categorias × ~19 locais = ~76 páginas geradas via template.

### Cada template entrega:
- Title único: `Conserto de {Categoria} em {Local} | Coleta e Entrega · Técnico Curitiba`
- Meta description com sintomas + preços-âncora
- H1 único: `Conserto de {Categoria} em {Local}`
- `PageHero` com imagem genérica da categoria (reusa assets já gerados ou placeholders, sem gerar 76 imagens novas — opção de hero da categoria + overlay com nome do local)
- Open Graph com og:image da categoria
- **Schema JSON-LD**: `Service` + `LocalBusiness` + `FAQPage` (3 perguntas locais) + `BreadcrumbList`
- Seções: sintomas comuns, processo (coleta → diagnóstico → reparo → entrega), preços, garantia, CTAs WhatsApp (interceptados pelo funil), bairros próximos (interlinking).
- Reaproveita `BenefitsGrid`, `CTASection`, `LocalFAQSection`, `Breadcrumbs`.

### Hub raiz por categoria
- `/conserto-tv-curitiba`, `/conserto-som-curitiba`, `/conserto-videogame-curitiba`, `/conserto-celular-curitiba` — página índice que lista todos os locais e referencia a categoria. (As páginas legadas `ConsertoTV`, `ConsertoCelular`, `ManutencaoTV` permanecem como pretende a memória — adicionamos canonical apontando para o hub novo onde aplicável).

### Sitemap
- Atualiza `public/sitemap.xml` com as ~76 novas URLs + 4 hubs.

### Prerender
- Estende `scripts/prerender-cities.mjs` para também emitir HTML estático de cada nova rota (mesmo padrão de title/meta/og/JSON-LD).

---

## 5. Arquivos & Migrações

### Novos arquivos (alto nível)
- `src/components/TopOfferBanner.tsx`
- `src/components/funnel/equipmentBranches.ts` (dados declarativos)
- `src/components/funnel/MediaUploader.tsx`
- `src/components/funnel/ColetaRequiredCard.tsx`
- `src/pages/conserto-tv/*` (+ som, videogame, celular)
- `src/pages/hubs/{categoria}Hub.tsx` × 4
- `src/lib/funnelMedia.ts` (upload + signed URL helpers)

### Editados
- `src/components/WhatsAppFunnel.tsx` (refatoração)
- `src/pages/Index.tsx` (banner topo)
- `src/App.tsx` (rotas novas)
- `public/sitemap.xml`
- `scripts/prerender-cities.mjs` (incluir novas categorias)

### Migrações Supabase
- `funnel_submissions` (tabela + RLS + GRANT)
- Bucket `funnel-uploads` (privado, via tool dedicada)

---

## Não-objetivos (fora do escopo)
- Não gerar OG/hero individual para cada um dos ~76 novos locais (reusa OG por categoria) — pode ser uma fase 2.
- Não remover páginas legadas (`ConsertoTV.tsx`, `ManutencaoTV.tsx`, `ConsertoCelular.tsx`) — preservação SEO.
- Não alterar o preço do `PricingBanner` existente (R$ 69,99 permanece — coexistência conforme memória).

---

## Estimativa
Implementação grande, mas dividida em commits lógicos: (1) banner, (2) storage+migração, (3) refator funil, (4) categorias TV+som+videogame+celular, (5) sitemap+prerender.

Pronto para executar — me confirma se posso seguir ou ajusta algum ponto (ex.: reduzir bairros, pular alguma categoria, mudar política de uploads).
