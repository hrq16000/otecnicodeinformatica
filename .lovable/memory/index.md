# Project Memory

## Core
- ALL contact is strictly via WhatsApp. No phone numbers, no `tel:` links.
- "Premium SaaS" aesthetic: clean typography, glassmorphism, NO dark cyberpunk.
- Project is evolutionary: never remove existing pages/URLs to protect SEO.
- Lead generation via WhatsApp & local SEO dominance in Curitiba are primary goals.
- Supabase with RLS for lead privacy.
- ALL `wa.me` anchor clicks are intercepted globally by `WhatsAppFunnel` V2 (5-step branched modal: equipamento → marca/sintoma → upload obrigatório → regra de Coleta → confirmação). Use `data-funnel-skip="1"` to opt out.
- Banner topo da home: oferta-âncora R$ 99,99 / 30 min (`TopOfferBanner`). Coexiste com `PricingBanner` (R$ 69,99 visita padrão).

## Memories
- [Visual Identity & UI](mem://design/visual-identity) — Premium SaaS aesthetic, glassmorphism, dark mode, animations
- [WhatsApp Conversion](mem://features/whatsapp-conversion) — WhatsApp triage logic, global chatbot, exit intent popup
- [WhatsApp Branched Funnel V2](mem://features/whatsapp-funnel-v2) — 5-step funnel: equipamento → sintoma → mídia obrigatória → coleta → envio
- [WhatsApp Global Funnel](mem://features/whatsapp-funnel) — Global click-interception modal architecture
- [Business & Pricing](mem://business/pricing-and-policies) — Coleta e Entrega pricing, BGA warranties, CNPJ
- [SEO Strategy](mem://seo/strategy-and-architecture) — Local SEO hierarchy, LLMs.txt, problem intention engine
- [Hubs SEO Categorias × Local](mem://features/hubs-seo-categorias) — Conserto TV/Som/Videogame/Celular × RMC e bairros
- [Technical Components](mem://features/technical-components) — Admin panel, routing maps, analytics, PWA, AdSense
- [Governança de entidade local (4G)](mem://features/governanca-entidade-4g) — SERVICE AREA BUSINESS, proibido publicar endereço/CEP/CNPJ, "desde 1998" é declaração sem documento.
- [Rede de profissionais parceiros](mem://features/rede-profissionais-parceiros) — /profissionais, perfil por slug, cadastro com análise e plano anual configurável no banco.
- [Funil inteligente em 4 etapas](mem://features/funil-4-etapas) — /atendimento noindex, deslocamento antes da confirmação, data-funnel-skip no CTA final.
- [Cluster de equipamentos](mem://features/cluster-equipamentos) — Hub /equipamentos + 4 páginas por aparelho, espelho estático gerado e sitemap próprio.
- [Cluster de soluções](mem://features/cluster-solucoes) — Hub /solucoes + 5 procedimentos indexáveis (diagnóstico, formatação, SSD, backup, dados), espelho estático e sitemap próprio.
- [Cluster PROBLEMAS — Onda 20](mem://features/cluster-problemas-onda-20) — 2 sintomas novos, 5 pontos obrigatórios por rota e CTAs contextuais por seção (sem tel:).
- [Onda 4V — inventário 82 A](mem://features/onda-4v-inventario-82a) — Blocos extras serviço × bairro, 100% grade A e SmartImage no CFTV/admin.
- [Onda 4W — estados de carregamento](mem://design/onda-4w-loading-states) — Token .skel obrigatório, esqueletos acessíveis em views com dados e aria-busy no envio.
- [Onda 31 — revisão, permissões e auditoria](mem://features/onda-31-revisao-permissoes-auditoria) — Fluxo de status das fotos, perfis admin/revisor, admin_audit_log, export CSV/JSON dos gates e tendências locais.
- [Onda 5C — cluster segurança](mem://features/onda-5c-editorial-seguranca) — Teto de 18 artigos indexáveis, antivírus e golpes on-line reescritos, capas licenciadas do Commons.
- [Onda 5H — hardware e diagnóstico](mem://features/onda-5h-editorial-hardware) — Teto de 28 artigos, fonte de alimentação e placa-mãe reescritas, pilares computador-nao-liga e conserto-placa.
- [Onda 5F — continuidade empresarial](mem://features/onda-5f-editorial-continuidade) — Teto de 24 artigos, ransomware e backup em nuvem reescritos, pilar backup-para-empresas.
- [Onda 5E — cluster armazenamento](mem://features/onda-5e-editorial-armazenamento) — Teto de 22 artigos, clonagem e segundo SSD reescritos, capas reais e pilar upgrade-ssd-ram.
- [Onda 5D — cluster refrigeração](mem://features/onda-5d-editorial-refrigeracao) — Teto de 20 artigos, limpeza interna e pasta térmica reescritas, parser WAVE_5D obrigatório nos gates.
- [Onda 5I — software e desempenho](mem://features/onda-5i-editorial-software) — Teto de 30 artigos, Windows 11 lento e remoção de vírus reescritos, pilares formatacao e remocao-de-virus.
- [Onda 21 — WhatsApp e triagem em /problemas](mem://features/problemas-wa-templates-onda21) — Mensagens pré-preenchidas, UTM por rota/seção/rolagem e FAQs com links internos.
- [Onda 23 — painel A/B e FAQ depth](mem://features/problemas-ab-painel-onda23) — /admin/experimento-wa (msg_a × msg_b por sintoma), variante estável por dispositivo, faq_section_depth e gate E2E dos CTAs.
- [Onda 24 — sintomas urgentes /problemas](mem://features/cluster-problemas-onda-24) — hd-fazendo-barulho e notebook-molhado indexáveis, espelho estático obrigatório e herdadas *-curitiba seguem noindex.
- [Onda 25 — sintomas elétricos + gate JSON-LD](mem://features/cluster-problemas-onda-25) — /problemas/computador-nao-da-imagem, /problemas/cheiro-de-queimado e o gate check:problemas-jsonld (WebPage+FAQPage+Breadcrumb).
- [Onda 32 — Windows não inicia e superaquecimento](mem://features/cluster-problemas-onda-32) — 2 rotas novas em /problemas e os 4 arquivos obrigatórios ao criar sintoma.
- [Onda 33 — impressora e teclado de notebook](mem://features/cluster-problemas-onda-33) — /problemas/impressora-nao-imprime e /problemas/teclado-notebook-nao-funciona, 14 rotas com JSON-LD completo.
- [Onda 26 — observabilidade e qualidade](mem://features/observabilidade-qualidade-onda26) — Sentry/OTLP fail-closed sem SDK, Biome no CI, Stryker semanal e relatório de atribuição /problemas.
- [Onda 27 — governança de publicação](mem://features/governanca-publicacao-onda27) — Painel /admin/publicacao, gate de fotos reais, interlinks gerados com âncoras únicas, rate limit de telemetria e monitor de indexação.
- [Onda 28 — CTA A/B e gate cross-cluster](mem://features/onda-28-cta-ab-intent-gate) — Variantes cta_1/cta_2 (copy + posição), check:intent-collisions e vitals com baseline/OTLP.
- [Onda 29 — indexação e imagens](mem://features/onda-29-indexacao-imagens) — Service JSON-LD em /problemas, gates check:image-integrity e check:canonical-anchors, image sitemap no índice e reindex:pending com backoff.
- [Onda 30 — fotos, editor local e similaridade cruzada](mem://features/onda-30-fotos-editor-similaridade) — /admin/fotos (preview+hash+EXIF), /admin/editor-local com checklist de originalidade, /admin/performance-local (GSC+cliques), ImageObject estático e gate check:cross-cluster.
- [Rodada 4C — consolidação e hardening](mem://features/rodada-4c-consolidacao-hardening) — 21 páginas "reavaliar" decididas (17 canonical, 4 Lote 2), colunas sensíveis de parceiros bloqueadas e realtime sem PII.
