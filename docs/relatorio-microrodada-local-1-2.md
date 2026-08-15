# Micro-Rodada Local 1.2 — Correção editorial dos pares serviço × cidade

Escopo: eliminar a dívida editorial apontada por `check:local-doorway`
(similaridade das INTRODUÇÕES entre rotas serviço × cidade), sem tocar em
threshold, normalização, tokenização, comparador, allowlist ou exceptions.

## Diagnóstico

A janela de introdução do gate são as **primeiras 120 palavras do `<main>`**.
Nas rotas serviço × cidade essas 120 palavras eram ocupadas quase inteiramente
pelo cabeçalho compartilhado do template (badge de cidade, H1, subtítulo, chips
e cards de benefício). Sobrava pouquíssimo texto próprio — daí a convergência.

Além dos 3 pares reportados, a medição completa mostrou **28 pares** acima de
0,400 dentro da família `SERVICO_CIDADE` (o relatório anterior só listou os três
piores). A correção foi editorial e estrutural na primeira dobra: cada página
local passou a abrir por uma **introdução autoral própria**, escrita pela
necessidade específica do usuário, renderizada logo abaixo do subtítulo.

## Resultado dos três pares exigidos

| Página A | Página B | Antes | Depois | Resultado |
|---|---|---:|---:|---|
| /servicos/montagem-de-pc/curitiba | /servicos/pc-gamer/curitiba | 0.465 | **0.051** | PASS |
| /servicos/suporte-home-office/curitiba | /servicos/pc-gamer/curitiba | 0.452 | **0.042** | PASS |
| /servicos/conserto-notebook/sao-jose-dos-pinhais | /servicos/conserto-pc/sao-jose-dos-pinhais | 0.426 | **0.098** | PASS |

Maior similaridade de introdução em toda a família após a alteração:
**0.100** (`/servicos/conserto-notebook/curitiba ↔ /servicos/conserto-notebook/sao-jose-dos-pinhais`),
contra o limite de 0.400. Maior similaridade de corpo (Jaccard 5-gramas):
0.200 (`montagem-de-pc/curitiba ↔ pc-gamer/curitiba`), limite 0.45.

## Introduções alteradas e intenção que passou a orientar cada abertura

Curitiba:

| Rota | Intenção da abertura |
|---|---|
| conserto-notebook | sintomas do portátil (tela, dobradiça, bateria, chassi fechado) e triagem por modelo |
| conserto-pc | desktop sem vídeo/reiniciando: teste por substituição de fonte, memória, disco, temperatura |
| redes-wifi | cobertura e distribuição do sinal, canal congestionado, medição por cômodo |
| backup-recuperacao | perda de arquivos: parar de usar a mídia, imagem bit a bit, sem promessa de resultado |
| formatacao-computador | reinstalação limpa condicionada à saúde de disco/memória e ao backup conferido |
| remocao-virus | sequestro de navegador, persistência, credenciais expostas |
| upgrade-ssd | gargalo de armazenamento medido antes de vender peça; clonagem |
| suporte-tecnico-empresarial | fila de chamados do escritório, prioridade e canal único |
| manutencao-preventiva-empresas | reduzir parada não planejada, calendário e relatório |
| backup-para-empresas | criticidade do dado corporativo e teste de restauração |
| montagem-de-pc | "preciso montar um computador": configuração, compatibilidade, montagem física, BIOS/UEFI, testes |
| suporte-home-office | continuidade de trabalho: reunião, VPN, impressora, acesso remoto no expediente |
| pc-gamer | máquina de jogo sob carga: GPU/CPU, temperatura, fonte, estabilidade, upgrade |

São José dos Pinhais:

| Rota | Intenção da abertura |
|---|---|
| conserto-notebook | portátil transportável → coleta combinada por rota, bancada |
| conserto-pc | instalação completa na mesa → visita agendada, gabinete só viaja quando necessário |
| redes-wifi | planta espalhada (térrea/sobrado/galpão) → cobertura, não velocidade contratada |
| backup-recuperacao | logística da mídia, imagem em ambiente controlado, cobrança só com leitura |

## Alterações técnicas

- `src/lib/servicoCuritibaBlocos.json` e `src/lib/servicoSjpBlocos.json`: novo
  campo `intro` (fonte única, também lida pelo espelho de build).
- `src/lib/servicoCuritibaBlocos.ts`: campo `intro?: string[]` na interface.
- `src/pages/servico-bairro/ServicoCidadePage.tsx`: renderiza a introdução
  autoral no hero, abaixo do subtítulo (fail-closed: sem `intro`, nada muda).
- `scripts/report-intro-similarity.mjs`: relatório **não bloqueante** que
  reaproveita a mesma normalização/janela do gate apenas para publicar números.

Não foram alterados: title, description, H1, subtítulo, FAQ, schemas,
interlinking, sitemap, policy, analytics, bairros, cidades, home ou pilares.

## Análise cruzada

Todos os 136 pares indexáveis da família foram recalculados: nenhuma nova
colisão acima de 0.400 (máximo 0.100). Nenhuma colisão nova de corpo, H2 ou FAQ.

## Gates, build e testes

| Verificação | Resultado |
|---|---|
| check:local-index-policy | OK |
| check:local-doorway | OK (nenhum padrão de doorway) |
| check:local-service-intent | OK |
| check:local-neighborhood-intent | OK |
| check:local-seo-quality | OK (11 rotas indexáveis) |
| check:local-interlinking | OK |
| check:schema-standards | OK |
| check:sitemap-source | OK |
| check:robots | OK |
| check:local-regression --strict | 43 rotas promovidas · status healthy |
| typecheck (tsgo) | OK |

## Vereditos

1. Os três pares estão abaixo de 0.400? **3/3**
2. Alguma nova colisão acima do threshold foi criada? **NÃO**
3. `check:local-doorway` está verde? **SIM**
4. Todos os gates locais estão verdes? **SIM**
5. Micro-Rodada Local 2 está autorizada? **SIM**
