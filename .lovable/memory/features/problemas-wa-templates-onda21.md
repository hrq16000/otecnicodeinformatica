---
name: Onda 21 — templates WhatsApp e triagem no cluster /problemas
description: Mensagens pré-preenchidas (sintoma, equipamento, bairro, urgência), UTM por rota/seção/rolagem e links internos nas FAQs de /problemas
type: feature
---
- `src/lib/problemasWaTemplates.ts` é a fonte única das mensagens e links do cluster /problemas: monta a mensagem (sintoma + equipamento + bairro + urgência) e o href com utm_medium=cta_problema, utm_campaign=<sintoma>, utm_content=problemas_<secao> e params rota/sintoma/secao/rolagem/dispositivo/urgencia.
- `TriagemContexto` (página de sintoma) e `TriagemRapidaHub` (/problemas) alimentam esse contexto; nada é enviado a servidor.
- Rótulo GA4/Ads padronizado por `rotuloEvento()` → problema_<slug>_<secao>_scroll<faixa>.
- Cada FAQ tem âncora `#faq-N`, link interno contextual para serviço relacionado e CTA "Perguntar isso no WhatsApp".
- Ligação telefônica segue proibida (política: contato só por WhatsApp; gate check:cta-funnel bloqueia tel:).
