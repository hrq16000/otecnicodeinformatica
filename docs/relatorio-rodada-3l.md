# RODADA 3L — MONTAGEM DE COMPUTADOR E PC GAMER

## 1. Resumo executivo
Auditoria operacional concluída com as 12 capacidades centrais confirmadas por fontes internas.
Criada uma única rota nova, `/servicos/montagem-de-pc` (~1.889 palavras no HTML servido), e
aprofundado o tema de impressoras/periféricos em rede dentro de `/servicos/redes-e-wifi`,
sem nova rota. Nenhuma alteração em infraestrutura, preços globais, logística ou identidade.

## 2. Auditoria operacional
Fonte única: `src/lib/politicaMontagem.ts` (`CAPACIDADES_MONTAGEM`), com capacidade, fonte e limite
por item. Capacidades centrais confirmadas: montagem física, compatibilidade, fonte e consumo,
refrigeração a ar, BIOS/UEFI, drivers oficiais, testes de memória, temperatura e estabilidade,
registro das peças, garantia da mão de obra e autorização comercial.
Water cooler selado e atualização de BIOS ficaram com limite explícito (condicionais).

## 3. Decisão da rota
**CAPACIDADE CONFIRMADA — CRIAR PÁGINA**

## 4. Políticas
- `PECAS_DO_CLIENTE` / `PECAS_ADQUIRIDAS`: compatibilidade, procedência, integridade, defeito de
  fábrica, item usado, autorização prévia e separação entre garantia da peça e da mão de obra.
- `REGRA_BIOS`: atualização apenas com motivo técnico, consentimento registrado e recusa em placas
  sem recurso de recuperação.
- `TESTES_MONTAGEM`: lista fechada do que é efetivamente testado (memória, armazenamento, boot,
  temperatura, estabilidade, portas, rede, áudio e vídeo).
- `GARANTIA_MONTAGEM`: distingue montagem, configuração, peça e fabricante; exclui overclock, uso
  inadequado e alterações feitas pelo cliente.

## 5. Página criada
- URL: `/servicos/montagem-de-pc` · H1: "Montagem de PC e PC Gamer em Curitiba"
- Title exclusivo, canonical self, BreadcrumbList, Service e FAQPage (10 perguntas em paridade).
- HTML servido: 1.889 palavras. Sem preço fechado e sem promessa de desempenho/FPS.
- Links de saída: manutenção de computador, upgrade SSD/RAM, equipamentos atendidos, preços e
  políticas, como funciona, coleta e entrega.
- Links de entrada: `/servicos` (card), `/equipamentos-atendidos` (PC gamer),
  `/servicos/manutencao-de-computador` e `/servicos/upgrade-ssd-ram` (relacionados).

## 6. Redes, impressoras e periféricos
`/servicos/redes-e-wifi` recebeu a seção "Impressoras e periféricos conectados à rede", restrita a
configuração, comunicação e compartilhamento, com a mensagem obrigatória de limite para defeitos
mecânicos ou eletrônicos. Nenhuma rota nova; nenhuma rota antiga de impressoras liberada.

## 7. Canibalização
Comparação P0 verde: montagem (construir e validar conjunto novo) × manutenção (reparar existente)
× upgrade (modernizar armazenamento/memória) × equipamentos atendidos (hub).

## 8. Sitemap
Manifesto curado 57 URLs indexáveis = 57 no XML emitido; `lastmod` 2026-08-06 para a nova rota e
para redes-e-wifi.

## 9. Gates

| Gate | Resultado | Evidência |
| --- | --- | --- |
| build + postbuild (seo, curated, jsonld-refs, route-manifest) | ✓ | 51 rotas curadas OK, 266 HTMLs pré-renderizados |
| check:pc-assembly-service (novo) | ✓ | capacidade confirmada, 10 FAQs, links e CTA |
| check:soft404 | ✓ | 220 verificações |
| check:cannibalization | ✓ | 19 páginas P0 |
| check:internal-links | ✓ | nenhum link quebrado |
| check:sitemap-source | ✓ | 57 = 57 |
| check:editorial-governance | ✓ | fail-closed OK |
| check:jsonld-parity | ✓ | 319 páginas |
| check:trust-claims | ✓ | sem claim não comprovável |
| vitest | ✓ | 73 testes |
| check:copy | ✗ pré-existente | falso positivo em `src/lib/technicalCaseDraftStore.ts` (regex de PII), fora do escopo |

## 10. Navegador
390 px e 1280 px: H1 correto, CTA acima da dobra, FAQ renderizada, sem overflow;
`/servicos/redes-e-wifi` exibe a seção de impressoras em ambos. Apenas warnings de dev pré-existentes.

## 11. Decisão
**RODADA 3L APROVADA**

## 12. Próximo passo
Auditar a demanda empresarial por segmento e decidir se advocacia e consultórios justificam páginas
próprias ou apenas seções dentro do hub empresarial.
