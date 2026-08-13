# Auditoria de demanda — advocacia e consultórios (Curitiba)

Data: 06/08/2026 · Escopo: somente leitura + decisão. Nenhuma rota nova criada.

## 1. Pergunta

Criar páginas próprias (`/suporte-ti-advocacia-curitiba`, `/suporte-ti-consultorios-curitiba`) ou
tratar os dois segmentos como seções dentro do hub `/empresa-de-ti-curitiba`?

## 2. Evidências consideradas

| Sinal | Observação |
| --- | --- |
| Cobertura atual | O hub `/empresa-de-ti-curitiba` e as 4 páginas PJ (suporte empresarial, preventiva, backup, redes) já cobrem 100% das necessidades técnicas desses segmentos. |
| Diferenciação técnica | Escritório de advocacia e consultório usam o mesmo conjunto: estações, rede, impressora/scanner em rede, backup e continuidade. Não há serviço exclusivo por segmento. |
| Risco de canibalização | Páginas por segmento repetiriam o corpo das páginas PJ, com variação apenas de vocabulário — cenário já sinalizado pelo gate `check:cannibalization` entre suporte empresarial e o hub (0,50 de proximidade na description). |
| Volume de busca | Intenção comercial local se concentra em termos genéricos ("suporte de TI para empresas em Curitiba", "assistência técnica empresarial"). Termos por segmento têm cauda muito curta e convertem pelo mesmo funil. |
| Prova real | Não há casos técnicos publicados por segmento (registro fail-closed em `technicalCases`), então uma página vertical nasceria sem prova própria. |
| Política interna | Memória do projeto: nunca inventar prova, nunca criar página sem conteúdo exclusivo (mínimo de conteúdo próprio e interlinking verificado). |

## 3. Decisão

**SEÇÕES NO HUB EMPRESARIAL — NÃO CRIAR PÁGINAS PRÓPRIAS AGORA.**

Advocacia e consultórios entram como blocos de contexto dentro de
`/empresa-de-ti-curitiba` e nas FAQs das páginas PJ, apontando para o mesmo funil de triagem.

## 4. Condição de reavaliação (gatilho objetivo)

Uma página própria só se justifica quando, em conjunto:

1. o Search Console registrar consultas recorrentes do segmento por pelo menos 4 semanas;
2. existirem ao menos 2 casos técnicos aprovados do segmento no registro interno;
3. houver requisito técnico exclusivo documentado (ex.: exigência de retenção específica),
   suficiente para ≥ 500 palavras que não repitam as páginas PJ.

Sem os três, a criação permanece bloqueada pela política de poda e anticanibalização.

## 5. Próximo passo

Monitorar consultas por segmento no relatório semanal do GSC e manter os dois segmentos
mencionados apenas como contexto no hub, sem promessa de especialização setorial.
