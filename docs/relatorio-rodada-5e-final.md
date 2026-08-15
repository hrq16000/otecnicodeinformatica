# Rodada 5E — Bairros âncora (Lote 2)

_Gerado automaticamente por `scripts/report-rodada-5e.mjs` em 2026-08-14T14:46:01.769Z._

## Resumo executivo

- Bairros âncora totais: **13** (Lote 1: 5 · Lote 2: 8).
- Vereditos: INDEX 50 · CANONICALIZED_TO_PARENT 0 · NOINDEX 6 · DISABLED 0 (56 rotas locais governadas).
- Gates bloqueantes: **todos verdes**.
- Nenhuma página de bairro declara filial, técnico residente, tempo de chegada ou distância — proibições verificadas pelo gate `check:local-neighborhood-intent`.

## Lote 2 promovido

| Bairro | Cidade-pai | Intenção declarada | Veredito | Gates |
| --- | --- | --- | --- | --- |
| [santa-felicidade](/bairros/santa-felicidade) | Curitiba | atendimento de informática em Santa Felicidade (casas amplas, comércio de bairro e Wi-Fi com alcance difícil) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [boa-vista](/bairros/boa-vista) | Curitiba | atendimento de informática na Boa Vista (residencial extenso e clínicas/escritórios de bairro) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [bigorrilho](/bairros/bigorrilho) | Curitiba | atendimento de informática no Bigorrilho (prédios verticais, home office e coleta em portaria) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [cabral](/bairros/cabral) | Curitiba | atendimento de informática no Cabral (consultórios, escritórios pequenos e rede de apartamento) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [afonso-pena](/bairros/afonso-pena) | São José dos Pinhais | atendimento de informática no Afonso Pena, SJP (empresas do entorno do aeroporto e residências) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [cruzeiro](/bairros/cruzeiro) | São José dos Pinhais | atendimento de informática no Cruzeiro, SJP (residencial e comércio de rua) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [costeira](/bairros/costeira) | São José dos Pinhais | atendimento de informática na Costeira, SJP (residencial próximo à divisa com Curitiba) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [guatupe](/bairros/guatupe) | São José dos Pinhais | atendimento de informática no Guatupê, SJP (misto residencial e pequenas operações) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |

## Lote 1 (mantido)

| Bairro | Cidade-pai | Intenção declarada | Veredito | Gates |
| --- | --- | --- | --- | --- |
| [cic](/bairros/cic) | Curitiba | atendimento de informática na CIC (indústria e residencial) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [batel](/bairros/batel) | Curitiba | atendimento de informática no Batel (escritórios e home office) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [agua-verde](/bairros/agua-verde) | Curitiba | atendimento de informática no Água Verde (residencial denso) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [centro](/bairros/centro) | Curitiba | atendimento de informática no Centro (comércio e coleta) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |
| [portao](/bairros/portao) | Curitiba | atendimento de informática no Portão (residencial e comércio de bairro) | **INDEX** | index-policy:pass · doorway:pass · service-intent:n/a · neighborhood-intent:pass |

## Similaridade (antidoorway)

Máximo observado: **ver evidência**. Evidência: `reports/local-doorway.json`.

## Evidências

- `public/local-gates.json` — status de gate por rota (painel `/admin/gates-locais`).
- `public/local-audit.json` — canonical/robots/sitemap por rota (painel `/admin/auditoria-local`).
- `reports/local-regression.json` — revalidação diária (workflow `local-guardrails`).
- `src/lib/localIndexPolicy.json` — política central (fonte única de verdade).
