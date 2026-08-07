# Rodada 3X — Auditoria Estratégica e Operacional (Multieletrônicos)

Data: 07/08/2026 · Escopo: TV/Smart TV, monitores, áudio/som, reparo de placas, logística de coleta/entrega
Natureza: **somente leitura** (nenhum arquivo de produto alterado). Nenhuma rota nova publicada nesta rodada.

---

## 1. Inventário atual (o que já existe)

| Categoria | Rota | Estado | Conteúdo próprio |
|---|---|---|---|
| TV (institucional) | `/servicos/manutencao-tv` | rota ativa, **noindex** | ~1.240 palavras |
| TV (comercial) | `/servicos/conserto-tv` | rota ativa, **noindex** | ~970 palavras |
| Celular/tablet | `/servicos/conserto-celular` | rota ativa, **noindex** | ~950 palavras |
| Placas eletrônicas | `/servicos/conserto-placa` | rota ativa, **noindex** | ~715 palavras |
| TV × bairro | `/servicos/manutencao-tv/<bairro>` (~20 rotas) | ativas, **noindex**, fora do sitemap | template |
| Áudio/som | — | **inexistente** | — |
| Monitores | — | **inexistente** (só citado em `/equipamentos-atendidos`) | — |
| Hubs de categoria | `src/pages/hubs/categories.ts` (tv, som, videogame, celular) | dados prontos, **não roteados** | — |

Sitemap curado (`scripts/lib/curated-urls.mjs`): 12 serviços indexáveis, todos do eixo PC/notebook/empresarial. **Nenhuma URL multieletrônicos indexada hoje.** O funil de triagem (`triageConfig.ts`) já cobre tv, celular, som e videogame com `forcedRoute: "coleta"`.

**Conclusão do inventário:** a expansão 3X não é "criar do zero" — é decidir **quais rotas já existentes saem do noindex** e quais lacunas (áudio/som, monitores) valem rota nova. Isso reduz risco e respeita a regra de nunca remover URLs.

---

## 2. Riscos identificados (bloqueadores de publicação)

| # | Risco | Severidade | Efeito se ignorado |
|---|---|---|---|
| R1 | Canibalização `conserto-tv` × `manutencao-tv` (mesma intenção, dois slugs) | **P0** | Google escolhe a URL errada; ambas perdem força |
| R2 | ~20 páginas TV × bairro em template sem copy exclusiva | **P0** | Viola a política de poda de bairros (mín. 300 palavras próprias) |
| R3 | Prazos publicados hoje (15–60 dias úteis para TV) sem SLA medido | **P1** | Expectativa quebrada → avaliação negativa |
| R4 | Sem dado de capacidade de bancada por categoria | **P1** | Demanda entra sem vazão; fila cresce |
| R5 | `conserto-placa` com 715 palavras (abaixo do piso de 800) | **P1** | Página fraca para keyword de alta dificuldade |
| R6 | `categories.ts` (som/videogame) sem rota — dado órfão | **P2** | Débito técnico |
| R7 | Logística de coleta sem métrica de custo/raio | **P1** | Reparo mínimo pode ficar deficitário |

---

## 3. Métricas de SLA propostas (por categoria)

SLA = prazo **medido da coleta ao aviso de pronto**, não incluindo espera de aprovação do cliente nem peça sob encomenda (o relógio pausa, e isso deve estar escrito na página).

| Categoria | Diagnóstico (aviso de laudo) | Reparo padrão | Com peça sob encomenda | Meta de cumprimento |
|---|---|---|---|---|
| Celular / tablet | até 2 dias úteis | 2–5 dias úteis | +10 dias úteis | ≥ 90% |
| Áudio / som portátil | até 3 dias úteis | 3–7 dias úteis | +15 dias úteis | ≥ 85% |
| Áudio (receiver/home-theater) | até 5 dias úteis | 7–15 dias úteis | +20 dias úteis | ≥ 80% |
| Monitor | até 5 dias úteis | 7–15 dias úteis | +30 dias úteis | ≥ 80% |
| TV / Smart TV | até 5 dias úteis | 10–25 dias úteis | até 60 dias úteis | ≥ 80% |
| Reparo de placa (componente) | até 7 dias úteis | 10–20 dias úteis | +30 dias úteis | ≥ 75% |

Indicadores a registrar por OS (a base `os_*` já existe): `t_coleta`, `t_laudo`, `t_aprovacao`, `t_pronto`, `t_entrega`, `motivo_atraso`.

KPIs de governança: **% dentro do SLA**, **taxa de desistência pós-laudo** (paga R$ 99,99), **taxa de reincidência em 90 dias** (garantia), **ticket médio por categoria**, **custo logístico por OS**.

Regra de publicação: **uma categoria só sai do noindex depois de 20 OS reais fechadas com SLA medido** — o número publicado na página tem de ser o P80 real, não uma estimativa.

---

## 4. Capacidade operacional — modelo de cálculo

Como a operação é enxuta (bancada única), a capacidade é o limitador real da expansão. Modelo proposto:

```text
capacidade_semanal(categoria) = horas_bancada_semana × fator_dedicacao(categoria)
                                ÷ horas_medias_por_OS(categoria)

WIP_max(categoria) = capacidade_semanal × prazo_alvo_semanas × 0,8 (folga)
```

Horas médias estimadas por OS (a validar com histórico): celular 1,5h · som portátil 2h · monitor 3h · TV 4h · receiver 5h · placa 6h.

Gatilho de contenção: quando o WIP de uma categoria atinge 80% do `WIP_max`, o funil deve **parar de prometer prazo curto** para aquela categoria (mensagem de fila), e a rota correspondente não deve receber investimento de tráfego.

Isso precisa de três números que só o operador tem: horas úteis de bancada por semana, WIP atual e disponibilidade de peças por categoria (ver perguntas no fim).

---

## 5. Critérios de triagem por categoria (antes de aceitar a OS)

Aplicáveis no funil (já data-driven em `triageConfig.ts`) e no atendimento:

**Comuns a todas as categorias**
- Coleta obrigatória (sem visita) para TV, monitor, áudio, celular e placa — já é o comportamento (`forcedRoute: "coleta"`).
- Reparo mínimo R$ 299,99 pré-aprovado; desistência paga R$ 99,99 de diagnóstico.
- Recusa automática quando: equipamento já aberto por terceiro com dano estrutural, ausência de peça no mercado nacional, ou valor de reparo > 1/3 do valor de mercado do aparelho (encaminhar para `/quando-nao-compensa`).

**TV / Smart TV** — aceitar: não liga, backlight, T-CON, fonte, HDMI, firmware. **Recusar/avisar:** display trincado ou com mancha de impacto (peça inviável economicamente), TV > 65" (logística), TV OLED com burn-in.

**Monitores** — aceitar: fonte, capacitores, placa lógica, backlight. Recusar: painel trincado, modelos < 22" fora de garantia (reparo não compensa).

**Áudio/som** — aceitar: amplificador, fonte, bateria, alto-falante, conector, Bluetooth. Recusar: gabinete destruído, equipamento com corrosão generalizada por líquido açucarado.

**Reparo de placa** — exigir na triagem: histórico (ligou depois de molhar? já foi a outra assistência?), fotos da placa, modelo exato. Recusar: placa com trilhas amplamente corroídas, BGA sem stencil disponível, notebook com dano em multicamadas.

**Celular** — já implementado (fluxo molhou/caiu/carga). Manter.

---

## 6. Logística de coleta/entrega

- Definir **3 faixas de raio** a partir do ponto de operação (até 8 km / 8–15 km / 15–30 km) com taxa e prazo distintos; hoje a taxa é "conforme distância", o que impede previsibilidade e medição.
- Registrar por OS o custo real (combustível/tempo) para calcular `custo_logistico_medio` por categoria. TV e monitor têm custo desproporcional (volume) e devem ter faixa própria.
- Consolidação: agrupar coletas por região em janelas fixas (ex.: 2 janelas/semana por região) em vez de coleta sob demanda — reduz custo por OS e torna o prazo previsível.
- Checklist de recebimento com foto obrigatória (estado do aparelho na coleta) — proteção contra disputa; já existe base de fotos de OS.

---

## 7. Decisão e ordem de liberação recomendada

**Não publicar nada nesta rodada.** Sequência proposta:

1. **Onda 3X-1 (desbloqueio barato):** resolver R1 — escolher `/servicos/conserto-tv` como canônico comercial e apontar `manutencao-tv` para ele (301 ou canonical), sem remover a rota. Sem isso, indexar TV é desperdício.
2. **Onda 3X-2:** medir SLA real de TV e celular por 20 OS. Com o P80 em mãos, atualizar prazos nas páginas e só então remover o `noindex` de `conserto-tv` e `conserto-celular`.
3. **Onda 3X-3:** expandir `conserto-placa` para ≥ 900 palavras com critérios de aceite/recusa (conteúdo que ninguém local publica = diferencial real) e indexar.
4. **Onda 3X-4:** criar `/servicos/conserto-som` e `/servicos/conserto-monitor` apenas se a capacidade calculada na seção 4 comportar — dados de `categories.ts` já servem de base.
5. **Onda 3X-5:** TV × bairro permanece noindex até passar no gate `validate-bairro-copy` (300+ palavras próprias, Jaccard ≤ 0,55). Máx. 3 bairros por vez.

Gates que devem passar antes de qualquer indexação: `check:cannibalization`, `check:sitemap-source`, `validate:bairro-copy`, `check:jsonld-content-parity`, `check:trust-claims` (nenhum prazo/garantia sem lastro).

---

## 8. Pendências que dependem do operador

1. Horas úteis de bancada por semana e WIP atual por categoria.
2. Fornecedores/prazo de peça para TV (backlight, T-CON) e áudio.
3. Confirmação de que monitores e áudio serão realmente aceitos (hoje não há rota nem promessa pública).
4. Raio máximo de coleta e custo por faixa.

Sem (1) e (2), os SLAs da seção 3 permanecem **propostos**, não publicáveis.
