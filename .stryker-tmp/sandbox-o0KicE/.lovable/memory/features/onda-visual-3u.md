---
name: Onda visual 3U (remoto, dados, montagem)
description: Contratos visuais distintos de /atendimento-remoto, /seguranca-dos-dados e /servicos/montagem-de-pc, fonte única em blocos-3u e gate check:visual-wave-3u
type: feature
---

# Rodada 3U — última propagação visual contextual

Escopo fechado em três páginas, com contratos semânticos distintos (proibido
aplicar um único template):

| Página | Contrato | CTA |
| --- | --- | --- |
| /atendimento-remoto | modalidade de atendimento (não é serviço novo) | "Verificar se o atendimento remoto é adequado" na primeira dobra (360/390/430) |
| /seguranca-dos-dados | WebPage institucional (não é cybersecurity) | sem CTA comercial adicional; máximo 2 na página |
| /servicos/montagem-de-pc | Service comercial | CTA do hero dentro de 750 px + CTA intermediário "Descrever a configuração ou as peças" |

Regras:
- Fonte única da copy: `scripts/lib/blocos-3u.mjs`, espelhada em `src/lib/blocos3u.ts`;
  renderização por `src/components/servico/Blocos3U.tsx` (reusa `SecaoBloco` de Blocos3T, sem estado).
- Paridade obrigatória: `blocos3uHtml()` em `scripts/curated-static-body.mjs`.
- Consolidações: montagem absorveu `MontagemComoFunciona`/`MontagemPoliticaBlocos`;
  segurança absorveu "Senhas e credenciais" e a matriz de responsabilidades duplicada.
- Proibido nessa camada: acesso remoto permanente, software próprio de acesso,
  conformidade/LGPD, cybersecurity, benchmark/FPS, SLA, planos, preços novos, URLs novas.
- Gate: `npm run check:visual-wave-3u` (também no workflow weekly-gates).
