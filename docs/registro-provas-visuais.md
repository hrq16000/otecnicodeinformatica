# Registro de provas visuais — auditoria da Rodada 4A

Regra fail-closed: **nenhuma imagem pode fingir prova operacional**. Só entra em
bloco rotulado como "prova real" o material fotografado na nossa bancada, com
origem comprovada e autorização de uso.

## Auditoria dos assets em uso (agosto/2026)

| Arquivo / chave | Origem comprovada | Categoria | Publicável como prova | Motivo |
| --- | --- | --- | --- | --- |
| `smartTv` | Banco licenciado (Unsplash/Pexels) | Ilustração de contexto | Não | Não é a nossa bancada |
| `estacaoSolda` | Banco licenciado | Ilustração de contexto | Não | Equipamento genérico, não identificável como nosso |
| `microsoldagem` | Banco licenciado | Ilustração de contexto | Não | Placa não é de atendimento nosso |
| `microscopio` | Banco licenciado | Ilustração de contexto | Não | Sem rastreabilidade de OS |
| `bancadaTecnica` | Banco licenciado | Ilustração de contexto | Não | Sem rastreabilidade de OS |
| `diagnostico` | Banco licenciado | Ilustração de contexto | Não | Sem rastreabilidade de OS |
| `coletaEntrega` | Banco licenciado | Ilustração de contexto | Não | Sem rastreabilidade de OS |

Nenhuma imagem gerada por IA está publicada no portal. Todas as fotos em uso são
fotografia real licenciada, com crédito visível (gate `check:image-credits`), e
são apresentadas como **ilustração de contexto**, nunca como registro de
atendimento.

## Situação das verticais publicadas (revisado na Rodada 4C)

```text
/servicos/conserto-tv       → PROVA VISUAL AINDA INCOMPLETA
/servicos/conserto-placa    → PROVA VISUAL AINDA INCOMPLETA
/servicos/conserto-monitor  → PROVA VISUAL AINDA INCOMPLETA (ilustração rotulada)
```

Nenhuma galeria de "provas de bancada" foi publicada nestas páginas. Não há
placeholder promocional. O restante da rodada seguiu normalmente.

### Fila de captura (ordem de prioridade por vertical)

| Vertical | 1ª prioridade | 2ª prioridade | 3ª prioridade | Secundárias |
| --- | --- | --- | --- | --- |
| TV | TV real registrada na entrada | Placa em bancada | Teste final ligado | Embalagem/coleta, instrumentação, backlight |
| Placas | Placa real identificada | Microscópio/instrumentação | Validação/teste | ESD, retrabalho, embalagem |
| Monitor | Monitor real em bancada | Placa/fonte do monitor | Teste final em duas entradas | Embalagem |

Padrão obrigatório de captura: sem dados pessoais, sem OS com nome/endereço,
serial oculto quando necessário, sem tela de cliente/WhatsApp, fundo limpo,
bancada organizada, boa luz e equipamento como foco. Cenário montado é proibido.

Legenda: factual e curta ("Diagnóstico de placa principal em bancada").
Proibida qualquer legenda superlativa ou comparativa.


## O que libera a publicação de provas reais (máximo 3 por página)

TV: equipamento identificado na entrada · placa sob diagnóstico · teste final.
Placa: placa identificada · instrumentação/microscopia em uso · validação.

Cada foto precisa de: origem comprovada (nossa bancada), OS de referência,
autorização do cliente quando o equipamento for identificável, `alt` factual,
legenda curta sem claim promocional, dimensões explícitas, `loading="lazy"` fora
da dobra e remoção de metadados pessoais.

Quando o material existir, adicione a linha da página neste arquivo — o gate
`check:premium-tv-board-4a` só aceita bloco rotulado como prova real para rotas
listadas aqui.

## Páginas com prova real aprovada

_(nenhuma até o momento)_
