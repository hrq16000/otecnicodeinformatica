---
name: Triagem V5 — máquina de estados data-driven
description: Funil de triagem reescrito como máquina de estados centralizada, contextual por equipamento, com modalidade automática e governança de valores/termos.
type: feature
---

# Funil de Triagem V5 (Julho 2026)

Reescrita completa do funil obrigatório de WhatsApp. Substitui o antigo `equipmentBranches.ts` + JSX condicional.

## Arquitetura (autocontida, replicável entre projetos)
- `src/lib/funnel/triageConfig.ts` — **fonte única de verdade** (⚙️ CONFIGURÁVEL: `WHATSAPP_NUMBER` (vem do siteConfig), `BRAND_NAME`, `TRIAGE_VERSION`, `PRICING`, prazos, `URGENCY_OPTIONS`, catálogo `EQUIPMENTS` data-driven).
- `src/lib/funnel/triageMachine.ts` — lógica pura testável: `determineServiceRoute`, `getPricingRules`, `getIdentityFields`/`getDetailsFields`/`getEventField`, `getTermsForRoute`, `validateStep`, `getFirstIncompleteField`, `resetForEquipment`/`resetForSymptom`, `buildTriageSummary`, `buildWhatsAppMessage`, `loadPersisted`/`persist` (versionado por `TRIAGE_VERSION`).
- `src/components/WhatsAppFunnel.tsx` — modal (6 etapas) + interceptação global de links WhatsApp (mantida: click capture, evento `wa-funnel:open`, override de `window.open`, hooks `__waFunnelEvents`/gtag).
- `src/components/funnel/TriageField.tsx` — render acessível de campos (single/chips/text/textarea, aria-pressed/radiogroup).
- `src/components/funnel/TriageErrorBoundary.tsx` — recuperação "Reiniciar triagem".

## 6 etapas
0 equipamento · 1 identificação+sintoma · 2 contexto+urgência · 3 modalidade (auto) · 4 ciência/aceite · 5 revisão+WhatsApp.

## Regras de modalidade (críticas)
- **Remoto**: só PC/Notebook + `liga-normal` + objetivo instalar/configurar.
- **Visita**: só PC/Notebook em serviços rápidos compatíveis (R$ 99,99/30min).
- **Coleta**: TV, celular/tablet, Surface, som/áudio, videogame, Outro — e PC que não liga / possível placa / dano físico. Mín. **R$ 299,99**, cancelamento **R$ 99,99**, teto sem re-autorização R$ 300, prazo 3–60 dias úteis.
- `forcedRoute` no config para equipamentos sempre-coleta.

## Regras de conteúdo
- Categoria **"Outro"** (não mais "Outro / Só orçamento").
- Urgência: **"Próximas 72 horas úteis — até 3 dias úteis"** / "Esta semana" / "Sem pressa" (removido "Hoje").
- Evento temporal contextual: `quando_aconteceu` (queda/líquido/tela) vs `quando_comecou` (progressivo) vs `frequencia` (só intermitente).
- CTA final: **"Agendar agora"**. Sem "Abrir WhatsApp/Finalizar/Enviar".
- Faixas de preço são estimativas informativas ("indício"/"possível"), nunca diagnóstico/reparo prometido.

## Robustez (causa raiz da tela de erro anterior)
- Estado versionado (`STORAGE_KEY = triage_state_<version>`) descarta sessionStorage incompatível; sanitização defensiva em `loadPersisted`.
- `isTransitioning` + limpeza de timers evita duplo avanço; `submittingRef` evita dupla submissão.
- Error Boundary específico impede que estado inválido derrube a página.
- Fallback de popup bloqueado: copiar mensagem + link, preservando respostas.

## UX/mobile
- Modal `max-w-[600px]`, `max-h-[92dvh]`, header fixo + área rolável, z-[120].
- `body[data-triage-open="1"]` esconde floats de WhatsApp (CSS em index.css).
- Auto-advance (~420ms, respeita prefers-reduced-motion) nas etapas de seleção; botões "Voltar"/"Continuar" acessíveis.

## Testes
- `src/lib/funnel/triageMachine.test.ts` — 19 testes de rota/validação/mensagem.
- `WhatsAppFunnel.integration.test.tsx` — fluxos PC→remoto e TV→coleta + guards.
- `e2e/whatsapp-funnel.spec.ts` — atualizado para V5.

Número WhatsApp vem sempre de `siteConfig.whatsappNumber` (nunca hardcode).
