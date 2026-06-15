# Plano de execução

Ordem rígida — cada etapa só inicia quando a anterior terminar.

---

## 1. Limpeza definitiva do bucket `funnel-uploads`

Como Postgres bloqueia `DELETE` em `storage.buckets`, vou usar a **Storage API REST** via uma migração que chama `net.http_delete` (extensão `pg_net` já habilitada no Lovable Cloud) para o endpoint `/storage/v1/bucket/funnel-uploads`. Antes, esvazio o bucket com a função `storage.empty_bucket` (helper oficial do Supabase).

Sequência:
1. `SELECT storage.empty_bucket('funnel-uploads')` — limpa objetos.
2. `net.http_delete` autenticado com `service_role` → remove o bucket.
3. Grep final no projeto procurando `funnel-uploads`, `MediaUploader`, `funnelMedia` — deve retornar 0 ocorrências.
4. Atualizar memória do projeto registrando "0 dependências de storage no funil".

Se o `http_delete` falhar (rede/permissão), faço fallback: removo apenas as policies/grants restantes e marco o bucket como órfão na memória para limpeza manual posterior.

## 2. Centralizar o aviso final em uma única constante

- Criar `src/lib/funnelWarning.ts` exportando:
  - `VIDEO_WARNING` (texto markdown WhatsApp — fotos completas, etiqueta traseira, vídeo sem áudio/ruído, atendimento não inicia sem mídia).
  - `VIDEO_WARNING_HTML` (mesma cópia em JSX para o modal).
  - `buildFinalWhatsAppMessage(answers)` helper que sempre acrescenta `VIDEO_WARNING` ao final.
- Substituir todas as ocorrências hard-coded em:
  - `src/components/WhatsAppFunnel.tsx` (constante local + bloco visual do step 3).
  - `src/components/WhatsAppChatbot.tsx`, `WhatsAppFloat.tsx`, `WhatsAppChat.tsx`, `ExitIntentPopup.tsx`, `TopOfferBanner.tsx`, `PageHero.tsx` e qualquer outro CTA que monte mensagem própria.
  - `src/pages/FunilIndisponivel.tsx` (mensagem de fallback também recebe o aviso).
- Teste unitário verificando que a string termina exatamente com `VIDEO_WARNING`.

## 3. Export CSV + PDF no admin

Em `src/pages/admin/AdminFunnel.tsx`:
- Refatorar o `exportCsv` atual para incluir todas as colunas relevantes (data, equipamento, marca, sintoma, requires_coleta, status, wa_message inteira, UTMs, gclid, notas_admin, atendido_em).
- Adicionar `exportPdf` usando `jspdf` + `jspdf-autotable` (instalar via bun). PDF com cabeçalho "Leads do funil — Técnico Curitiba", data de geração, filtros aplicados, e tabela paginada das submissões visíveis. Cada linha clicável vira uma página de detalhe? Não — manter simples: tabela única + apêndice com `wa_message` completa por lead.
- Botão dropdown "Exportar" com opções CSV / PDF substituindo o botão atual.
- Garantir que mídia NÃO aparece em nenhum dos dois exports (alinhado ao novo fluxo).

## 4. Testes automatizados de validação (Vitest + RTL)

Novo arquivo `src/components/WhatsAppFunnel.integration.test.tsx` cobrindo as 3 jornadas exigidas:

**Cenário 1 — Cliente Simples (PC > Lento/Limpeza)**
- Render do funil, abre via evento `wa-funnel:open`.
- Seleciona PC → marca Dell → sintoma "Lento / travando".
- Verifica que pula step 2 (sem coleta) e vai direto a confirmação.
- Verifica que `R$ 99,99` e `R$ 90` aparecem em algum bloco de transparência/coleta-info.
- Verifica que o texto que iria pro WhatsApp termina exatamente com `VIDEO_WARNING`.

**Cenário 2 — Barreira de Fogo (TV > Não liga)**
- Seleciona TV → Samsung → "Não liga".
- Confirma que `requiresColeta` ativa (`ColetaRequiredCard` no DOM).
- Confirma que botão "Continuar" do step 2 está `disabled` enquanto `coletaAccepted=false`.
- Tenta forçar `submit` programaticamente sem aceite → confirma que step volta para 2 e NÃO abre `wa.me`.
- Marca o checkbox → botão libera → submit gera URL contendo "COLETA E ENTREGA" e "R$ 300".

**Cenário 3 — Tela Quebrada (TV/Celular)**
- Seleciona Celular → iPhone → "Tela trincada".
- Avança normalmente, aceita coleta.
- Captura o `text` da URL `wa.me` gerada → assert que contém: "fotos", "etiqueta traseira", "vídeo", "sem áudio", "atendimento não será iniciado".

**Testes unitários de regras** (mesmo arquivo ou `equipmentBranches.test.ts` existente expandido):
- Toda sintoma com `requiresColeta` também precisa ser sintoma de equipamento real (sanity check do array).
- `validateStep` retorna `ok:false` quando obrigatórios faltam — cobertura step a step.

Mock de `window.open` para capturar URL final sem abrir popup. Mock de `supabase.from(...).insert` para não bater no backend.

## 5. Auditoria de furos + correções

Durante a escrita dos testes, percorrer:
- `WhatsAppFunnel.tsx` (canAdvance, next, submit, validateStep).
- `equipmentBranches.ts` (flags requiresColeta consistentes).
- Geração da URL (`appendUtms`, `buildMessage`).

Furos a procurar e corrigir caso existam:
- `submit` exposto em ref / window que permita bypass.
- `next()` aceitando avanço sem revalidar quando step pulado.
- Mensagem final montada em outros CTAs sem o aviso (resolvido na etapa 2 com a constante única).
- `presetMessage` sobrescrevendo o aviso (verificar ordem da concatenação no `buildMessage`).
- Reset de `coletaAccepted` ao trocar de sintoma (se trocar de "lento" para "não liga" depois de aceitar uma coleta anterior, o aceite anterior pode vazar — adicionar reset quando `sintoma` muda).

## 6. Relatório de QA

Ao final, entrego relatório em markdown com:
- Resultado de cada cenário (PASS/FAIL + assert que confirmou).
- Lista de furos encontrados durante a auditoria + commit/diff que corrigiu.
- Confirmação explícita: "Travas de segurança 100% funcionais — nenhuma rota permite gerar mensagem sem o aviso obrigatório nem burlar a etapa de Coleta".
- Comando `bunx vitest run` com output verde anexado.

---

## Detalhes técnicos

- Dependências novas: `jspdf`, `jspdf-autotable` (peso < 200KB gz, tree-shakable só no admin).
- Sem novas migrações além da etapa 1 (limpeza do bucket).
- Memória atualizada: `mem://features/whatsapp-funnel-v2.md` recebe nota "v3.1 — aviso centralizado em `funnelWarning.ts`, 0 storage" e `mem://features/technical-components` registra export PDF.
- Nenhuma rota/URL pública removida (respeita memória core de evolução SEO).

## Fora de escopo

- Reescrita visual do admin.
- Push notifications de novo lead.
- Integração CRM externo.
- Internacionalização dos exports.

---

**Posso seguir nessa ordem?**
