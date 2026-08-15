# AUDITORIA COMPLETA — Técnico em Curitiba

> **Projeto auditado:** `tecnico.curitiba.br` (domínio canônico oficial em código).
> ⚠️ O briefing mencionou `tecnicocuritiba.com.br`, mas **todo o código usa `https://tecnico.curitiba.br`** (sem `www`, sem `.com.br`). O `.com.br` antigo consta como migrado na memória do projeto. Confirmar qual domínio está de fato publicado.
> **Data:** 11/07/2026 · **Escopo:** somente leitura (nenhum código alterado) · **Stack:** React 18 + Vite 5 + Tailwind + shadcn/ui, SPA pré-renderizada por plugin Vite.

---

## 1. SEO ON-PAGE

### Estado atual
- **Superfície de rotas:** ~**357 rotas** declaradas em `src/LegacyApp.tsx` (357 `<Route>`), das quais **33 URLs estratégicas** nos sitemaps e **~108+ rotas legadas/programáticas** marcadas `noindex, follow` (arrumar-pc nacional, conserto-*/local, cftv, bairros extras, marcas, problemas).
- **Head base** (`index.html`): `<html lang="pt-BR">` ✅, viewport ✅, `charset` ✅, `robots` explícito ✅, canonical ✅, favicon/apple-touch-icon ✅, `manifest.json` ✅, Open Graph completo ✅, Twitter `summary_large_image` ✅, `og:image` 1200×630 no domínio oficial ✅, `theme-color` ✅, geo tags ✅.
- **Metadados por rota:** `src/components/PageSEO.tsx` injeta title/description/canonical/OG/Twitter/robots em runtime; `scripts/curated-routes-meta.mjs` espelha os mesmos valores no **HTML estático** (prerender pré-hidratação) para as 33 URLs curadas.
- **JSON-LD:** `LocalBusiness`/`ProfessionalService`/`ComputerRepairService` no `Footer.tsx`; `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting` distribuídos (CityServiceSchema, ServiceLandingSchema, BlogPostFAQ etc.). `aggregateRating` é dinâmico e só aparece quando há reviews reais (sem invenção).

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **28 de 33 meta descriptions > 155 caracteres** (ex.: `/servicos` = 173, `/servicos/manutencao-de-notebook` = 171) | `scripts/curated-routes-meta.mjs` | Reduzir para 150–155 chars — evita truncamento no SERP. |
| 🟡 Médio | **15 de 33 titles > 60 caracteres** (ex.: `/como-funciona` = 72, `/tecnico-informatica-colombo` = 72) | `scripts/curated-routes-meta.mjs` | Encurtar para ≤ 60 chars (≈ 580px). |
| 🟡 Médio | **Sitemaps “mortos”**: `sitemap-marcas.xml`, `sitemap-news.xml`, `sitemap-problemas.xml` com **0 URLs**, mas rotas de marca/problema existem no app | `public/sitemap-*.xml` | Ou popular (se indexáveis) ou remover do repositório para não confundir crawlers. |
| 🟢 Baixo | `sitemap-index.xml` e `sitemap.xml` são **idênticos** (duplicação) | `public/sitemap-index.xml` = `public/sitemap.xml` | Manter um só como índice; `robots.txt` já aponta ambos. |
| 🟢 Baixo | `robots.txt` não lista os sub-sitemaps individuais, só os índices | `public/robots.txt` | OK funcionalmente (o índice resolve), mas pode listar todos. |
| 🟢 Baixo | Meta `keywords` presente (ignorada pelo Google, sem dano) | `index.html` | Opcional remover. |
| 🟢 Baixo | `NotFound.tsx` sem `noindex` (risco de soft-404 indexável) | `src/pages/NotFound.tsx` | Adicionar `noindex` via PageSEO. |

**Nota:** os "2 `<h1>`" em `ProblemaPage.tsx` e `MarcaPage.tsx` são **ramos condicionais** (estado "não encontrado" × conteúdo) — apenas um renderiza por vez. ✔️ Não é bug.

---

## 2. SEO LOCAL

### Estado atual
- **Cidades âncora indexáveis:** Curitiba, São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo (+ hub `/empresa-de-ti-curitiba`). Demais cidades RMC e dezenas de bairros existem como rotas, majoritariamente `noindex`.
- **NAP:** Nome ("Técnico em Curitiba") e Telefone (E.164 em `siteConfig`) consistentes. Schema `LocalBusiness` com `telephone`, `geo`, `openingHoursSpecification`, `areaServed` (6 cidades) e `PostalAddress`.
- **Keywords locais** presentes no conteúdo e nos títulos das landing pages de cidade/bairro.
- **Mapa de cobertura:** `CoverageMapSection.tsx` (carregado deferido).

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **NAP incompleto** — `PostalAddress` só tem `addressLocality/Region/Country`, sem `streetAddress` nem `postalCode` | `src/components/Footer.tsx:73` | Se houver endereço comercial real, adicionar; se for atendimento a domicílio sem endereço público, documentar como `serviceArea business` no Google Business Profile. |
| 🟡 Médio | **Endereço não visível no rodapé** (só cidades atendidas) | `Footer.tsx:150` | GBP exige endereço ou área de atendimento clara; alinhar site ↔ perfil. |
| 🟢 Baixo | Risco de **conteúdo similar** entre landing pages de cidade (mesmo template) | `src/pages/TecnicoInformatica*.tsx` | Garantir parágrafos únicos por cidade (bairros, referências locais). |

---

## 3. CONTEÚDO E BLOG

### Estado atual
- **Blog existe** com ~**22 posts programáticos** (`src/data/blogProgrammaticPosts.tsx`) + conteúdo editorial em `blogPostsContent.tsx` (**10.538 linhas**, 761 KB de chunk). Rotas `/blog` e `/blog/:slug`.
- **Links internos:** ecossistema forte entre serviços ↔ cidades ↔ bairros; navegação e footer ricos.
- **Alt text de imagens:** **32 de 33** `<img>` têm `alt`; apenas **1 sem alt** em conteúdo de post.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | `blogPostsContent.tsx` com **10.5k linhas / 761 KB** num único arquivo/chunk | `src/data/blogPostsContent.tsx` | Dividir por post (lazy por slug) para reduzir parse e facilitar manutenção. |
| 🟢 Baixo | 1 `<img>` sem `alt` | `src/pages/BlogPost.tsx:311` | Adicionar `alt` derivado do título/legenda. |
| 🟢 Baixo | Slides do hero usam `alt=""` (decorativo) | `src/components/home/HeroPremium.tsx:98` | OK se puramente decorativo; caso ilustrem serviço, dar alt descritivo. |
| 🟢 Baixo | Links quebrados internos: não detectados estaticamente, mas **não há gate automatizado** | — | Adicionar verificação de links internos no CI (evolução futura). |

---

## 4. PERFORMANCE (Core Web Vitals)

### Estado atual
- **JS total (dist):** ~**5,4 MB** em **383 arquivos** (code splitting agressivo ✅). Maiores chunks: `vendor` 1,5 MB (461 KB gzip), `problemaPagesData` 1,24 MB (356 KB gzip), `blogPostsContent` 761 KB — **todos code-split**, não carregados na home.
- **CSS:** ~**202 KB** em 2 arquivos.
- **Imagens:** WebP/AVIF nas rotas React; porém **PNGs pesados em `public/lovable-uploads`** (13 MB no diretório; vários de **~1,1 MB**), e `og-image.png` = 858 KB.
- **Fontes:** auto-hospedadas (Montserrat variável 38 KB + Poppins 600/700), com `preload` + fallback `size-adjust` (anti-FOUT) ✅.
- **Preconnect/dns-prefetch:** GTM e GA ✅. LCP preload de logo + hero webp com `fetchpriority=high` ✅.
- **Bibliotecas pesadas isoladas:** `recharts`, `jspdf`, `jspdf-autotable` usados **só em admin** (1 arquivo cada) ✅. `react-markdown` só no blog ✅. `embla-carousel` 1 uso.
- **Code splitting por rota:** ativo via import dinâmico (`routeImportMap` + LegacyApp lazy) ✅.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🔴 Crítico | **PNGs de ~1,1 MB** em `public/lovable-uploads` e **`og-image.png` 858 KB** | `du -sh public/lovable-uploads` = 13 MB | Converter para WebP/AVIF e comprimir (`squoosh`/`sharp`); og-image alvo < 200 KB. |
| 🟡 Médio | `vendor` 1,5 MB (461 KB gzip) num único chunk | `dist/assets/vendor-*.js` | `manualChunks` para separar recharts/jspdf/markdown do vendor comum. |
| 🟡 Médio | `problemaPagesData` 1,24 MB — dado grande carregado por rota de problema | `dist/assets/problemaPagesData-*.js` | Fragmentar por slug/lazy sob demanda. |
| 🟢 Baixo | 126 imports nomeados de `lucide-react` | vários | OK com Vite ESM (tree-shake por ícone); sem ação. |

---

## 5. ACESSIBILIDADE (a11y)

### Estado atual
- **Landmarks:** `<main>` em 47 arquivos, `<nav>`, `<header>`, `<footer>` presentes ✅.
- shadcn/Radix cobre ARIA dos primitivos (dialog, dropdown, tooltip) ✅.
- Splash com `role="status"` + `aria-live` e label sr-only ✅.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **384 ocorrências de cores hardcoded** (`text-white/black/gray-*`, `bg-black/white`, hex `#rrggbb`) fora dos tokens do design system | `src/components/**`, `src/pages/**` | Migrar para tokens semânticos (`text-foreground`, `bg-background`) — garante contraste WCAG AA e consistência. |
| 🟡 Médio | Botões só de ícone: auditar `aria-label` em todos os `size="icon"` | vários componentes | Verificar caso a caso (menu, fechar, chat) e adicionar `aria-label`. |
| 🟢 Baixo | Foco visível / ordem de tabulação não auditados automaticamente | — | Rodar axe/Lighthouse a11y e validar navegação por teclado. |
| 🟢 Baixo | Formulários (Coleta) — validar `label htmlFor` ↔ `id` e mensagens de erro com `aria-describedby` | `src/pages/ColetaFormulario.tsx` | Revisar associação de labels. |

---

## 6. UX E CONVERSÃO

### Estado atual
- **CTAs WhatsApp** onipresentes: hero, seções, footer, **botão flutuante** (`WhatsAppFloat`), funil global (`WhatsAppFunnel`), chatbot (`WhatsAppChatbot`), e **fallbacks no `<noscript>` e na barra de timeout de hidratação** — conversão garantida mesmo sem JS/hidratação lenta ✅.
- **Preço mínimo visível** ("R$ 99,99") com disclaimer honesto ✅.
- **Prova social:** `ReviewsGrid`, `DynamicAggregateRating` (reais, via backend), `TestimonialsPlaceholder`, selos de garantia/tempo.
- **Contato = WhatsApp** (deep link), **Coleta** = formulário que monta mensagem WhatsApp.
- **Diagnóstico 60s** e **modal de agendamento** como caminhos alternativos.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **Número WhatsApp hardcoded** em ≥ 10 componentes em vez de `siteConfig` | `CTASection.tsx:5`, `HeroSection.tsx:8`, `PageHero.tsx:7`, `WhatsAppFunnel.tsx:33` … | Centralizar em `siteConfig.whatsappNumber`/`whatsappLink()` — evita divergência futura (viola regra de fonte única). |
| 🟢 Baixo | Botão flutuante — confirmar reserva de espaço para evitar CLS | `src/components/WhatsAppFloat.tsx` | Garantir `position:fixed` com dimensões fixas (provável já OK). |
| 🟢 Baixo | Formulário de coleta — feedback de envio é a abertura do WhatsApp | `ColetaFormulario.tsx:244` | Adicionar confirmação visual antes do redirect. |

---

## 7. QUALIDADE DE CÓDIGO

### Estado atual
- TypeScript: apenas **8 usos de `any`** em toda a base ✅ (muito bom).
- Estrutura de pastas organizada (`pages/`, `components/`, `lib/`, `data/`, `hooks/`).
- Chave exposta no client é apenas a **publishable/anon** do backend (segura) ✅.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **Arquivos muito longos (> 300 linhas):** `blogPostsContent.tsx` (10.538), `Blog.tsx` (927), `LegacyApp.tsx` (893), `ComoFunciona.tsx` (809), `AssistenciaTecnicaCuritiba.tsx` (676), `ColetaFormulario.tsx` (640), `WhatsAppFunnel.tsx` (606) | `wc -l src/**` | Extrair subcomponentes/dados; melhora manutenção e HMR. |
| 🟡 Médio | Constante `WHATSAPP_NUMBER` duplicada em ~10 arquivos | ver item §6 | Fonte única em `siteConfig`. |
| 🟢 Baixo | **21 `console.log/warn/error`** em código de produção | `src/**` (não-teste) | Remover ou trocar por logger condicional a `import.meta.env.DEV`. |
| 🟢 Baixo | Warnings de runtime não capturados nesta auditoria estática | — | Validar com console no preview. |

---

## 8. SEGURANÇA E BOAS PRÁTICAS

### Estado atual
- **HTTPS:** 0 links `http://` inseguros ✅.
- **`target="_blank"`:** 101 ocorrências, **todas com `rel="noopener"`** ✅ (nenhuma vulnerável).
- **API keys:** só a **anon/publishable** do backend no client; **nenhum `service_role`/`sk_live`/`AIza` exposto** ✅.
- **LGPD/Consent Mode v2** implementado (tudo `denied` por padrão + banner) ✅.
- **Formulários:** não fazem POST a servidor (viram deep link WhatsApp) → **spam server-side não é vetor** ✅ (por isso ausência de captcha é aceitável).

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **Headers de segurança** (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) dependem do host | há `scripts/check-security-headers.mjs` | Confirmar aplicação no ambiente publicado (Lovable hosting) e documentar. |
| 🟢 Baixo | `manifest.json` com `crossorigin="use-credentials"` | `index.html` | Verificar se necessário; caso contrário, remover. |

---

## 9. ANALYTICS E RASTREAMENTO

### Estado atual
- **GA4:** `G-B9VPHCZC10` (com `anonymize_ip`) ✅.
- **Google Ads:** `AW-17892118207` + evento `conversion` ✅.
- **Google AdSense:** `ca-pub-3762170279587706` ✅.
- **Search Console:** meta `google-site-verification` **injetada por env** (`VITE_GOOGLE_SITE_VERIFICATION`) — plugin em `vite.config.ts`; `msvalidate.01` (Bing) presente porém **vazio**.
- **Eventos de conversão rastreados:** `click_whatsapp`, `click_call`, `cta_click`, `generate_lead`, `conversion` + telemetria de navegação e dedup de leads (`src/lib/analytics.ts`, `funnelAnalytics.ts`, `utmCapture.ts`).

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟡 Médio | **Verificação Search Console depende de env não confirmada** | `vite.config.ts` (googleSiteVerificationPlugin) | Confirmar que `VITE_GOOGLE_SITE_VERIFICATION` está setada no build publicado. |
| 🟢 Baixo | `msvalidate.01` (Bing) vazio | `index.html` | Preencher ou remover. |
| 🟢 Baixo | Sem **Meta Pixel / TikTok Pixel** | — | Adicionar apenas se houver campanhas nessas plataformas. |
| 🟢 Baixo | Evento de **scroll depth** não identificado | `src/lib/analytics.ts` | Adicionar se quiser medir engajamento. |

---

## 10. INTEGRAÇÕES E FLUXOS

### Estado atual
- **WhatsApp `5541997086380`** consistente em todo o código (as ocorrências de `5541999999999` são **apenas placeholders/exemplos em telas de admin**, não produção) ✅.
- **Contato/Coleta:** convertem para deep link `wa.me` (não há e-mail/CRM/webhook de formulário do lado servidor).
- **Backend (Lovable Cloud):** usado para reviews, funil de leads, aggregate rating, IndexNow e auth de admin.
- **Agendamento/orçamento:** `SchedulingModal`, `OrcamentoNotebookCalculator`, `Diagnostico60s` presentes ✅.
- **Chat:** `WhatsAppChatbot` + `WhatsAppFunnel` (interceptação global de cliques) ✅.

### Problemas encontrados
| Severidade | Item | Evidência | Correção |
|---|---|---|---|
| 🟢 Baixo | Sem captura de lead **independente do WhatsApp** (e-mail/CRM) | `Contato.tsx`, `ColetaFormulario.tsx` | Opcional: gravar lead no backend antes do redirect (resgate de quem não conclui no WhatsApp). |

---

## A) RESUMO EXECUTIVO

O site é **tecnicamente maduro e bem acima da média** para o nicho: SPA pré-renderizada com paridade runtime↔HTML estático, code splitting agressivo, LGPD/Consent Mode v2, analytics de conversão robusto, arquitetura SEO local disciplinada (33 URLs curadas vs. ~108 legadas em `noindex`), segurança limpa (sem chaves sensíveis, `rel=noopener` universal, HTTPS total) e TypeScript quase sem `any`. Os pontos fracos concentram-se em **peso de imagens (PNGs de ~1 MB)**, **meta descriptions/titles acima do limite de SERP**, **cores hardcoded fora dos tokens** e **duplicação do número de WhatsApp**. Nenhum problema estrutural bloqueante; o trabalho restante é de **polimento e ganho marginal de ranking/CWV**. Domínio a confirmar (`tecnico.curitiba.br` no código vs. `.com.br` do briefing).

| Eixo | Nota |
|---|---|
| SEO on-page | **82**/100 |
| SEO local | **78**/100 |
| Conteúdo | **80**/100 |
| Performance | **72**/100 |
| Acessibilidade | **74**/100 |
| UX/Conversão | **90**/100 |
| Código | **83**/100 |

---

## B) TOP 10 PROBLEMAS CRÍTICOS (impacto × esforço)

| # | Problema | Sev. | Impacto | Esforço |
|---|---|---|---|---|
| 1 | PNGs de ~1,1 MB + og-image 858 KB → LCP/CWV | 🔴 | Alto | P |
| 2 | 28/33 meta descriptions > 155 chars (truncam no SERP) | 🟡 | Alto | P |
| 3 | 15/33 titles > 60 chars | 🟡 | Médio-alto | P |
| 4 | Número WhatsApp hardcoded em ~10 arquivos | 🟡 | Médio (risco) | P |
| 5 | Sitemaps vazios (marcas/news/problemas) confundem crawler | 🟡 | Médio | P |
| 6 | 384 cores hardcoded fora dos tokens (contraste/tema) | 🟡 | Médio | M |
| 7 | `vendor` 1,5 MB sem `manualChunks` | 🟡 | Médio | M |
| 8 | NAP/endereço incompleto (site ↔ Google Business Profile) | 🟡 | Médio | M |
| 9 | Arquivos > 600 linhas (blog/funnel/coleta) | 🟡 | Médio | M |
| 10 | Verificação Search Console / Bing depende de env não confirmada | 🟡 | Médio | P |

---

## C) ROADMAP SUGERIDO

### Fase 1 — Quick wins (imediato)
- [P] Comprimir/converter todas as imagens de `public/lovable-uploads` e `og-image.png` para WebP/AVIF.
- [P] Encurtar as 28 descriptions e 15 titles em `curated-routes-meta.mjs` (e origem em componentes).
- [P] Centralizar `whatsappNumber` em `siteConfig` e substituir os hardcodes.
- [P] Limpar sitemaps vazios e a duplicação `sitemap.xml`↔`sitemap-index.xml`.
- [P] `noindex` na `NotFound`; confirmar env do Search Console; preencher/remover `msvalidate.01`.

### Fase 2 — Curto prazo
- [M] `manualChunks` no Vite (separar recharts/jspdf/markdown do vendor).
- [M] Fragmentar `blogPostsContent.tsx` e `problemaPagesData` por slug (lazy).
- [M] Migrar cores hardcoded críticas para tokens semânticos + rodar axe/Lighthouse a11y.
- [M] Auditar `aria-label` de botões-ícone e labels de formulário.
- [M] Completar NAP e alinhar com Google Business Profile.

### Fase 3 — Médio prazo
- [G] Refatorar arquivos > 600 linhas em subcomponentes.
- [M] Gate de CI para links internos quebrados.
- [M] Gravar lead no backend antes do redirect WhatsApp (resgate de conversão).
- [M] Garantir parágrafos 100% únicos por landing de cidade/bairro.

---

## D) CHECKLIST — AÇÕES EXTERNAS (fora do Lovable)

- [ ] **Confirmar domínio publicado** (`tecnico.curitiba.br` vs `tecnicocuritiba.com.br`) e redirects 301 do antigo.
- [ ] **Google Business Profile**: criar/otimizar (categoria, área de atendimento, horários, fotos, posts).
- [ ] **Google Search Console**: verificar propriedade, enviar `sitemap-index.xml`, monitorar cobertura/CWV.
- [ ] **Bing Webmaster Tools**: verificar (`msvalidate.01`) e enviar sitemap.
- [ ] **Backlinks locais**: diretórios de Curitiba, parcerias, imprensa local, citações NAP consistentes.
- [ ] **Avaliações reais no Google** (alimentam o `aggregateRating` dinâmico do site).
- [ ] **Google Ads/AdSense**: validar tags de conversão em produção com consentimento.
- [ ] Definir variáveis de ambiente de verificação no ambiente de publicação.

---
*Auditoria somente-leitura. Nenhum arquivo de código foi alterado além da criação deste relatório.*
