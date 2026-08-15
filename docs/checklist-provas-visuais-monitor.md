# Checklist operacional de provas visuais — Conserto de monitor

Versão 1.0 · 07/08/2026 · Categoria `monitor` (`src/lib/operacaoCategorias.ts`)
Contrato correspondente: `src/lib/contratosOperacionais.ts` → `categoria: "monitor"`
Página pública: `/servicos/conserto-monitor`

Regra central: **fail-closed**. Uma ordem de serviço de monitor não é encerrada
enquanto as quatro provas visuais obrigatórias não estiverem anexadas. Nenhuma
dessas fotos é ilustrativa, de banco de imagens ou gerada por inteligência
artificial — todas são do aparelho real que está na bancada.

---

## 1. As quatro provas obrigatórias

| # | Prova | Momento | O que precisa aparecer | Bloqueia |
|---|---|---|---|---|
| P1 | **Entrada** | na coleta, antes de embalar | tela inteira sob luz difusa, moldura, traseira com etiqueta legível, base/pedestal, fonte e cabos recebidos | início do diagnóstico |
| P2 | **Placa lógica** | com o aparelho aberto, antes do reparo | placa completa e, em segundo enquadramento, a região afetada com detalhe do componente | autorização do reparo |
| P3 | **Teste final** | após o reparo, com o monitor remontado | monitor ligado exibindo imagem, em duas entradas de vídeo diferentes, com o cronômetro do período contínuo visível na OS | entrega |
| P4 | **Embalagem** | imediatamente antes da entrega | aparelho protegido dentro da caixa, com o mesmo estado de painel registrado em P1 | encerramento da OS |

Sem P1 não se abre o monitor. Sem P2 não se pede autorização. Sem P3 não se
entrega. Sem P4 não se encerra.

---

## 2. Roteiro de captura

**P1 — Registro de entrada**
1. Painel desligado, luz difusa lateral, sem flash direto (flash esconde trinca fina).
2. Um enquadramento frontal completo + um rasante para revelar mancha de pressão.
3. Etiqueta traseira com marca, modelo e número de série legíveis.
4. Foto única com todos os acessórios recebidos lado a lado (base, fonte, cabos).
5. Qualquer avaria pré-existente recebe foto própria e descrição na OS.

**P2 — Placa lógica e alimentação**
1. Placa inteira dentro do quadro, com a serigrafia do modelo visível.
2. Detalhe macro da região afetada: capacitor estufado, trilha rompida, conector solto, marca de aquecimento.
3. Quando houver medição relevante, fotografar o instrumento com o valor lido.
4. Depois do reparo, repetir o enquadramento macro do mesmo ponto para comparação antes/depois.

**P3 — Teste final**
1. Monitor montado, em pé sobre a base, ligado e exibindo imagem de teste.
2. Segundo registro na outra entrada de vídeo (HDMI e DisplayPort, ou a combinação disponível).
3. Registro de uniformidade de brilho em tela clara e em tela escura.
4. Anotar na OS o horário de início e fim do período contínuo (mínimo 2 horas).

**P4 — Embalagem**
1. Aparelho protegido, tela voltada para o lado protegido, sem pressão sobre o painel.
2. Acessórios conferidos contra a lista de entrada, dentro da mesma caixa.
3. Caixa fechada e identificada com o número da OS.

---

## 3. O que é proibido

- Imagem gerada por inteligência artificial em qualquer prova.
- Foto de banco de imagens usada como se fosse o aparelho do cliente.
- Reaproveitar prova de outra OS, mesmo em modelo idêntico.
- Publicar prova visual com dado pessoal visível (etiqueta com nome, tela com conteúdo do cliente, número de telefone em post-it).
- Publicar contador de OS ou qualquer número agregado que não tenha base registrada.

## 4. Uso público das provas

Prova visual nasce interna. Para sair da OS e virar conteúdo público (galeria,
caso técnico, imagem da página de serviço), precisa de:

1. autorização do cliente registrada por escrito;
2. remoção de qualquer dado pessoal do enquadramento;
3. crédito e licenciamento cadastrados em `src/lib/imageCredits.ts`, como qualquer outra foto do site;
4. aprovação no gate `check:image-credits`.

Enquanto isso não acontecer, `/servicos/conserto-monitor` usa fotografia
licenciada de bancada, exatamente como as demais páginas de serviço — nunca
imagem de IA.

## 5. Ligação com os gates automatizados

| Item | Gate |
|---|---|
| Rota única de monitor, sem hub e sem variação por marca/sintoma | `check:multielectronics-3y` |
| Conteúdo mínimo de 1.200 palavras editoriais | `check:multielectronics-3y` |
| Blocos obrigatórios (aceite/recusa, garantia, coleta, bancada) | `check:multielectronics-3y` |
| Rota presente no manifesto curado e no sitemap | `check:sitemap-source` |
| Nenhum prazo ou garantia sem lastro publicado | `check:trust-claims` |
| FAQ visível 1:1 com o FAQPage | `check:faq-parity`, `check:jsonld-parity` |
| Título e descrição únicos e dentro do limite | `check:meta-uniqueness` |
| Crédito e licença de toda foto publicada | `check:image-credits` |
