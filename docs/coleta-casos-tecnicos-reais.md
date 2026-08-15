# Coleta de casos técnicos reais

Documento operacional da Rodada 3G. Define como registrar atendimentos reais para,
no futuro, publicar provas técnicas verificáveis.

Regra central: **nenhum caso é público automaticamente**. O registro só habilita
publicação quando passa no gate `npm run check:technical-cases` com status
`approved` e todos os requisitos abaixo cumpridos.

## 1. Onde fica o registro

- Modelo de dados e validação fail-closed: `src/lib/technicalCases.ts`
- Componentes de exibição (ainda não montados em rota): `src/components/casos/TechnicalCaseBlocks.tsx`
- Gate: `scripts/check-technical-cases.mjs`

Nesta rodada o registro está vazio de propósito. Não existe rota pública de casos.

## 2. Escopo de categorias

Permitidas: manutenção de notebook, manutenção de computador, formatação,
remoção de vírus, upgrade SSD/RAM, recuperação de dados, redes e Wi-Fi,
suporte empresarial, manutenção preventiva, backup empresarial, atendimento
remoto e home office.

Fora do escopo (não registrar): TV, celular, eletrodomésticos, CFTV, videogame,
áudio, elétrica e qualquer serviço off-topic.

## 3. Checklist por atendimento

### Antes

- [ ] Obter autorização do cliente para registro e uso de imagens.
- [ ] Verificar se fotos são permitidas no local (residência ou empresa).
- [ ] Registrar o sintoma informado, com as palavras do cliente resumidas.
- [ ] Registrar equipamento (categoria, marca, modelo, ano aproximado).
- [ ] Remover da cena qualquer documento, etiqueta ou tela com dado pessoal.

### Durante

- [ ] Fotografar apenas o necessário para comprovar o defeito e a intervenção.
- [ ] Registrar os testes realizados (o que foi medido e com qual ferramenta).
- [ ] Registrar o diagnóstico confirmado — não a suspeita inicial.
- [ ] Registrar peças utilizadas.
- [ ] Registrar limitações encontradas durante a execução.

### Depois

- [ ] Registrar o resultado observado, sem adjetivos de garantia.
- [ ] Registrar recomendações ao cliente.
- [ ] Revisar cada foto (tela, etiqueta, reflexo, localização).
- [ ] Anonimizar: nome, telefone, e-mail, endereço, CPF/CNPJ, número de série.
- [ ] Solicitar revisão técnica de outra leitura.
- [ ] Decidir se o caso tem valor editorial. Na dúvida, manter em `review`.

## 4. Fotos

Permitidas: equipamento recebido, detalhe externo do defeito, componente
danificado, poeira e refrigeração, armazenamento substituído, bancada, teste
técnico sem dados pessoais, organização interna, resultado físico verificável.

Proibidas: rosto sem autorização, documento, conversa de WhatsApp, etiqueta com
número de série, área de trabalho com arquivos, e-mail aberto, sistema
empresarial, credenciais, tela bancária, endereço, ordem de serviço integral,
foto de banco de imagens apresentada como real e imagem gerada por IA
apresentada como atendimento.

Cada foto exige: `alt` descritivo, legenda factual, classificação (`kind`),
EXIF removido/revisado e indicação explícita de "imagem do atendimento" ou
"imagem ilustrativa".

## 5. Privacidade

Nunca armazenar no registro: nome, telefone, endereço, e-mail, CPF, CNPJ,
número de série completo, senha, IP privado, arquivos do cliente, tela com dados
pessoais ou a ordem de serviço integral. A referência de atendimento é apenas um
código interno (`workOrderReference`).

Localidade sempre ampla: cidade e, no máximo, região/bairro — nunca endereço.

## 6. Números e medições

Só publicar número quando houve medição real. Para cada medição registrar:
ferramenta, método, momento, unidade e limitações. Exemplos válidos: temperatura
antes e depois, tempo de inicialização, capacidade instalada, erros encontrados,
setores defeituosos, espaço recuperado, intensidade de sinal medida, quantidade
de equipamentos revisados. Não arredondar nem estimar para melhorar a narrativa.

## 7. Linguagem

Usar: "o diagnóstico confirmou", "foi identificado", "foi realizado", "após os
testes", "o equipamento apresentou", "o resultado observado", "neste caso
específico".

Evitar: "sempre resolve", "resultado garantido", "igual ao novo", "100%
recuperado", "reparo definitivo", "melhor assistência", "serviço perfeito".

Título permitido (exemplo estrutural): "Notebook com superaquecimento e
desligamentos no Portão". Título proibido: "Consertamos qualquer notebook
superaquecendo em poucas horas".

## 8. Template de caso

Todo caso aprovado deve conseguir preencher, sem lacunas: título factual,
equipamento, sintoma informado, verificações realizadas, diagnóstico confirmado,
solução aplicada, resultado observado, limitações, recomendações, serviço
relacionado, localidade ampla, galeria aprovada, aviso de que resultados variam
e CTA para triagem.

## 9. SEO futuro

Quando houver casos aprovados: usar `Article`/`BlogPosting` e `BreadcrumbList`,
canonical próprio, data real, autor real, imagem própria e links para serviço e
problema. Não usar `Review`, `aggregateRating` nem `Product`. Nada de schema
antes de a rota existir.

## 10. Próximo passo operacional

Coletar pelo menos três atendimentos reais completos (documentados, revisados e
anonimizados) antes de considerar a criação de qualquer rota pública de casos.
