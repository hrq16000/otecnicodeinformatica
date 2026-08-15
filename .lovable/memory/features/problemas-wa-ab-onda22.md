---
name: Onda 22 — A/B, fallback e eventos de FAQ em /problemas
description: A/B das mensagens de WhatsApp, fallback WhatsApp Web, eventos GA4 de âncora/link interno da FAQ e testes automáticos dos parâmetros de CTA.
type: feature
---
- `src/lib/problemasWaVariants.ts`: variante "a" (controle) / "b" (pede próximo passo), sorteada uma vez por visitante em localStorage; SSR sempre "a".
- `buildProblemaWaHref` acrescenta `utm_term=msg_<variante>` e `variante=<a|b>`; `rotuloEvento` acrescenta `msg<variante>`.
- `buildProblemaWaFallbackHref`: converte wa.me em api.whatsapp.com/send preservando `text` e todos os parâmetros de tracking (usado no link "abrir no WhatsApp Web").
- Eventos GA4 novos: `faq_anchor_click` e `faq_internal_link` (`trackFaqLinkClick`), com `faq_question` + `link_target` para correlacionar dúvida × intenção de serviço.
- Teste automático: `src/lib/problemasWaTemplates.test.ts` valida UTM, rota, sintoma, seção, rolagem, variante e paridade do fallback.
- Ligações telefônicas continuam proibidas (gate check:cta-funnel) — contato só por WhatsApp.
