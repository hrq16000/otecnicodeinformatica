import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import DOMPurify from "dompurify";

const WHATSAPP_NUMBER = "5541997086380";

// Fluxo do chatbot com triagem profissional completa
const chatFlow = {
  inicio: {
    mensagem: "Olá! 👋 Sou o assistente virtual do **Técnico Curitiba**. Estou aqui para ajudar você com:\n\n• Agendamento de visitas técnicas\n• Informações sobre serviços e preços\n• Diagnóstico inicial do problema\n\nComo posso ajudar?",
    opcoes: [
      { label: "Preciso de atendimento técnico", proximo: "tipo_equipamento" },
      { label: "Quero saber os preços", proximo: "precos" },
      { label: "Tenho dúvidas sobre o serviço", proximo: "duvidas" },
    ]
  },

  // ===== TRIAGEM POR TIPO DE EQUIPAMENTO =====
  tipo_equipamento: {
    mensagem: "Para direcionar corretamente, qual **tipo de equipamento** precisa de atendimento?",
    opcoes: [
      { label: "🖥️ Computador Desktop", proximo: "problema_desktop" },
      { label: "💻 Notebook / Ultrabook", proximo: "problema_notebook" },
      { label: "📺 Smart TV / Monitor", proximo: "problema_tv" },
      { label: "🌐 Redes / Wi-Fi / Internet", proximo: "problema_rede" },
      { label: "🎵 Áudio / Som / Outro", proximo: "outro_equipamento" },
    ]
  },

  problema_desktop: {
    mensagem: "**Computador Desktop** — qual o problema principal?",
    opcoes: [
      { label: "Lento ou travando", proximo: "triagem_lentidao" },
      { label: "Não liga / Reinicia sozinho", proximo: "triagem_hardware_grave" },
      { label: "Vírus ou comportamento estranho", proximo: "triagem_virus" },
      { label: "Quero formatar", proximo: "triagem_formatacao" },
      { label: "Upgrade (SSD, RAM, Placa)", proximo: "triagem_upgrade" },
      { label: "Montar um PC novo", proximo: "triagem_montagem" },
    ]
  },

  problema_notebook: {
    mensagem: "**Notebook** — qual o problema principal?",
    opcoes: [
      { label: "Lento ou travando", proximo: "triagem_lentidao" },
      { label: "Não liga / Tela preta", proximo: "triagem_hardware_grave" },
      { label: "Tela quebrada / manchas", proximo: "triagem_tela" },
      { label: "Superaquecendo / ventilador barulhento", proximo: "triagem_aquecimento" },
      { label: "Caiu líquido", proximo: "triagem_liquido" },
      { label: "Quero formatar ou upgrade", proximo: "triagem_formatacao" },
    ]
  },

  problema_tv: {
    mensagem: "**Smart TV / Monitor** — qual o problema?\n\n⚠️ **Importante:** O reparo de TVs geralmente custa entre **30-40% do valor de uma TV nova**. Avaliamos caso a caso para garantir que o investimento compense.",
    opcoes: [
      { label: "Tela escura (liga mas não aparece)", proximo: "triagem_tv_escura" },
      { label: "Não liga de jeito nenhum", proximo: "triagem_tv_naoliga" },
      { label: "Tela quebrada por impacto", proximo: "triagem_tv_painel" },
      { label: "Imagem com listras ou manchas", proximo: "triagem_tv_imagem" },
      { label: "Problema de som / Smart", proximo: "triagem_tv_outro" },
    ]
  },

  problema_rede: {
    mensagem: "**Redes e Wi-Fi** — qual o problema?",
    opcoes: [
      { label: "Wi-Fi lento ou caindo", proximo: "triagem_wifi" },
      { label: "Configurar rede nova", proximo: "triagem_rede_nova" },
      { label: "Câmeras CFTV", proximo: "triagem_cftv" },
    ]
  },

  outro_equipamento: {
    mensagem: "Atendemos também **equipamentos de áudio, eletrônicos e placas**.\n\nPara uma avaliação precisa, o melhor é falar com nosso técnico diretamente:",
    opcoes: [
      { label: "Falar com técnico no WhatsApp", proximo: "whatsapp_geral" },
    ]
  },

  // ===== CLASSIFICAÇÃO POR COMPLEXIDADE =====
  triagem_lentidao: {
    mensagem: "**Computador lento** — vamos classificar a complexidade:\n\n📋 **Perguntas rápidas:**\n• Há quanto tempo o equipamento está assim?\n• Qual a idade do equipamento?\n• Já tentou alguma solução?\n\n🟢 **Classificação provável: SIMPLES**\nGeralmente resolvido com limpeza de sistema, upgrade SSD ou otimização.\n\n**💰 Valores:**\n• Visita técnica: A partir de R$ 69,99\n• Upgrade SSD (mão de obra): a partir de R$ 80\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita presencial", proximo: "perguntas_obrigatorias" },
      { label: "Tentar suporte remoto", proximo: "suporte_remoto" },
    ]
  },

  triagem_virus: {
    mensagem: "**Vírus / Malware** — classificação:\n\n🟢 **Simples:** Pop-ups, lentidão, programas indesejados\n🟡 **Médio:** Ransomware, redirecionamento, dados bloqueados\n🔴 **Complexo:** Sistema comprometido, dados criptografados\n\n**💰 Valores:**\n• Remoção simples: a partir de R$ 69,99\n• Remoção complexa + proteção: a partir de R$ 180\n\n⚠️ **NUNCA pague resgate de ransomware.** Traga para diagnóstico.\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita técnica", proximo: "perguntas_obrigatorias" },
      { label: "Tentar suporte remoto", proximo: "suporte_remoto" },
    ]
  },

  triagem_formatacao: {
    mensagem: "**Formatação completa** — geralmente classificado como:\n\n🟢 **SIMPLES** — Resolvido em 30-60 minutos no local\n\n**Incluso:**\n• Windows 10/11 original\n• Drivers atualizados\n• Programas essenciais\n• Backup dos seus arquivos (opcional)\n\n**💰 Valor:** a partir de R$ 150\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita em casa", proximo: "perguntas_obrigatorias" },
      { label: "Coleta e entrega", proximo: "diagnostico_coleta" },
    ]
  },

  triagem_hardware_grave: {
    mensagem: "**Equipamento não liga / reinicia** — isso pode ser:\n\n🟡 **Médio:** Fonte defeituosa, carregador ruim, memória solta\n🔴 **Complexo:** Placa mãe com curto, capacitor queimado, GPU danificada\n\n⚠️ **Importante:** Só o diagnóstico profissional diferencia um problema de R$ 100 de um de R$ 800.\n\n**💰 Diagnóstico:** R$ 99,99 a R$ 100 (abatido do reparo se aprovado)\n**Pré-aprovado:** até R$ 300-400 (reparos dentro desse valor são executados automaticamente)\n\nComo prefere proceder?",
    opcoes: [
      { label: "Visita diagnóstica no local", proximo: "perguntas_obrigatorias" },
      { label: "Coleta para bancada", proximo: "perguntas_coleta" },
    ]
  },

  triagem_upgrade: {
    mensagem: "**Upgrade de componentes:**\n\n🟢 **SIMPLES** — Instalação de SSD, memória RAM\n\n⚠️ **ATENÇÃO:** Instalar peças incompatíveis pode causar **curto-circuito** e danos permanentes. Sempre consulte um técnico antes de comprar.\n\n**💰 Mão de obra:**\n• Upgrade SSD: a partir de R$ 80\n• Upgrade RAM: a partir de R$ 60\n• Combo SSD + RAM: a partir de R$ 120\n\nPeças por conta do cliente ou fornecemos com nota fiscal.",
    opcoes: [
      { label: "Agendar upgrade", proximo: "perguntas_obrigatorias" },
      { label: "Consultar compatibilidade antes", proximo: "whatsapp_upgrade" },
    ]
  },

  triagem_montagem: {
    mensagem: "**Montagem de PC personalizado:**\n\n🟢 **SIMPLES** — Montagem com peças fornecidas pelo cliente\n🟡 **MÉDIO** — Consultoria + montagem + configuração\n\n**💰 Montagem:** a partir de R$ 200\n**Inclui:** Montagem, instalação de SO, drivers e testes\n\nQuer montar com peças que já tem ou precisa de consultoria completa?",
    opcoes: [
      { label: "Já tenho as peças", proximo: "perguntas_obrigatorias" },
      { label: "Preciso de consultoria", proximo: "whatsapp_montagem" },
    ]
  },

  triagem_tela: {
    mensagem: "**Tela de notebook quebrada:**\n\n🟡 **MÉDIO** — Troca de tela é viável na maioria dos casos.\n\n**💰 Custo:** R$ 250 a R$ 600 (depende do modelo)\n**Prazo:** 3-7 dias (depende da disponibilidade da tela)\n\n📸 **Precisamos de:**\n• Marca e modelo exato do notebook\n• Fotos do dano\n• Se é tela touch ou comum",
    opcoes: [
      { label: "Enviar dados pelo WhatsApp", proximo: "whatsapp_tela" },
    ]
  },

  triagem_aquecimento: {
    mensagem: "**Superaquecimento de notebook:**\n\n🟢 **Na maioria das vezes é SIMPLES:**\nPasta térmica ressecada + ventoinha com poeira.\n\n**💰 Limpeza térmica:** R$ 100 a R$ 150\n**Tempo:** 30-60 minutos\n\n⚠️ Ignorar superaquecimento pode queimar a GPU permanentemente.",
    opcoes: [
      { label: "Agendar limpeza", proximo: "perguntas_obrigatorias" },
    ]
  },

  triagem_liquido: {
    mensagem: "**⚠️ URGENTE — Líquido no notebook:**\n\n🔴 **AÇÃO IMEDIATA:**\n1. **DESLIGUE** o notebook agora\n2. **NÃO** tente ligar novamente\n3. **NÃO** use secador de cabelo\n4. Traga para diagnóstico o mais rápido possível\n\nCada hora conta — a oxidação começa em minutos!\n\n**💰 Limpeza ultrassônica:** R$ 200-400\n**Se demorar:** pode chegar a R$ 800+\n\nEntre em contato imediatamente:",
    opcoes: [
      { label: "🚨 Contato urgente WhatsApp", proximo: "whatsapp_urgente" },
    ]
  },

  // ===== TV FLOWS =====
  triagem_tv_escura: {
    mensagem: "**TV com tela escura (liga mas não aparece imagem):**\n\n🟢 **Geralmente é reparável!**\nProblema mais comum: **LEDs de retroiluminação** defeituosos.\n\n**💰 Reparo:** R$ 200 a R$ 400 (10-25% do valor da TV)\n**Prazo:** 5-15 dias em bancada\n\n📸 **Para diagnóstico preciso, precisamos:**\n• Marca e modelo da TV\n• Fotos/vídeo do defeito\n• Idade da TV",
    opcoes: [
      { label: "Enviar dados pelo WhatsApp", proximo: "whatsapp_tv" },
    ]
  },

  triagem_tv_naoliga: {
    mensagem: "**TV não liga de jeito nenhum:**\n\n🟡 **Pode ser simples ou complexo:**\n• Placa fonte defeituosa (reparável, R$ 150-300)\n• Placa principal com defeito (avaliação necessária)\n\n📸 **Precisamos de:**\n• Marca e modelo\n• Se o LED standby acende\n• Se faz algum barulho\n• Idade da TV",
    opcoes: [
      { label: "Enviar dados pelo WhatsApp", proximo: "whatsapp_tv" },
    ]
  },

  triagem_tv_painel: {
    mensagem: "**TV com painel quebrado por impacto:**\n\n🔴 **Na maioria dos casos, NÃO compensa reparar.**\n\nO painel é 60-80% do valor da TV. A troca custa quase o mesmo que uma TV nova.\n\n**Recomendação:** Considere adquirir uma nova.\n\nSe quiser uma avaliação profissional mesmo assim:",
    opcoes: [
      { label: "Consultar mesmo assim", proximo: "whatsapp_tv" },
      { label: "Ver quando não compensa reparar", proximo: "link_quando_nao_compensa" },
    ]
  },

  triagem_tv_imagem: {
    mensagem: "**TV com listras ou manchas na imagem:**\n\n🟡 **Pode ser:**\n• Placa T-CON (reparável, R$ 150-300)\n• Flat cable solto (simples)\n• Painel danificando (complexo)\n\nSó o diagnóstico em bancada diferencia.",
    opcoes: [
      { label: "Agendar coleta para diagnóstico", proximo: "perguntas_coleta" },
    ]
  },

  triagem_tv_outro: {
    mensagem: "Para problemas de **som** ou **sistema Smart**:\n\n🟢 **Geralmente simples:**\n• Reset de fábrica\n• Atualização de firmware\n• Configuração de apps\n\nConverse com nosso técnico para avaliar:",
    opcoes: [
      { label: "Falar com técnico", proximo: "whatsapp_tv" },
    ]
  },

  // ===== REDE/WIFI =====
  triagem_wifi: {
    mensagem: "**Wi-Fi lento ou caindo:**\n\n🟢 **Na maioria das vezes é SIMPLES:**\nRoteador mal configurado, posição inadequada ou interferência.\n\n**💰 Configuração profissional:** a partir de R$ 69,99\n\nUma configuração profissional pode **dobrar a velocidade percebida** sem trocar o plano.",
    opcoes: [
      { label: "Agendar configuração", proximo: "perguntas_obrigatorias" },
      { label: "Consultar pelo WhatsApp", proximo: "whatsapp_geral" },
    ]
  },

  triagem_rede_nova: {
    mensagem: "**Instalação de rede:**\n\n🟡 **MÉDIO** — Requer visita técnica para avaliação do ambiente.\n\n**Serviços:**\n• Rede cabeada (estruturada)\n• Wi-Fi mesh para cobertura total\n• Rede empresarial com firewall\n\n**💰 A partir de:** R$ 200 (ponto de rede)\n\nO melhor é agendar uma visita para avaliar o ambiente:",
    opcoes: [
      { label: "Agendar visita técnica", proximo: "perguntas_obrigatorias" },
    ]
  },

  triagem_cftv: {
    mensagem: "**Câmeras de segurança (CFTV):**\n\nOferecemos instalação completa de sistemas de monitoramento.\n\nVeja nossa página especializada ou fale diretamente com o técnico:",
    opcoes: [
      { label: "Falar sobre CFTV no WhatsApp", proximo: "whatsapp_cftv" },
    ]
  },

  // ===== PERGUNTAS OBRIGATÓRIAS =====
  perguntas_obrigatorias: {
    mensagem: "Para agendar, precisamos de algumas informações:\n\n📋 **Dados obrigatórios:**\n• Seu nome completo\n• Endereço com bairro e cidade\n• Marca e modelo do equipamento\n• Idade do equipamento (novo/usado)\n• Descrição detalhada do problema\n• Preferência de data/horário\n\n📸 **Se possível, envie também:**\n• Fotos ou vídeo do problema\n• Histórico de reparos anteriores\n\n**💰 Política:**\n• Visita técnica: A partir de R$ 69,99\n• Diagnóstico é pago e abatido do reparo\n• Não existe atendimento sem compromisso presencial",
    opcoes: [
      { label: "Enviar dados pelo WhatsApp", proximo: "whatsapp_visita" },
    ]
  },

  perguntas_coleta: {
    mensagem: "Para agendar a **coleta**, precisamos de:\n\n📋 **Dados obrigatórios:**\n• Seu nome completo\n• Endereço completo (com CEP)\n• Marca e modelo do equipamento\n• Idade e origem (novo/usado)\n• Descrição detalhada do problema\n• Histórico de reparos\n\n📸 **Envie obrigatoriamente:**\n• Fotos do equipamento e do defeito\n• Vídeo do problema (se aplicável)\n\n**💰 Política:**\n• Pré-aprovado: R$ 300 a R$ 400\n• Acima: consultamos antes\n• Desistência: taxa de R$ 99,99 a R$ 100\n• Prazo: 15 a 60 dias",
    opcoes: [
      { label: "Enviar dados pelo WhatsApp", proximo: "whatsapp_coleta" },
    ]
  },

  // ===== FLUXOS EXISTENTES MANTIDOS =====
  suporte_remoto: {
    mensagem: "**Suporte Remoto**\n\n📋 **Como funciona:**\n• Atendimento via TeamViewer ou AnyDesk\n• Você compartilha a tela conosco\n• Resolvemos o problema em tempo real\n\n**💰 Valores:**\n• Suporte básico: a partir de R$ 79,99\n• Hora técnica: R$ 99,99/hora\n\n⚠️ **Não indicado para:** problemas de hardware ou quando o PC não liga.",
    opcoes: [
      { label: "Iniciar suporte remoto", proximo: "whatsapp_remoto" },
    ]
  },

  diagnostico_coleta: {
    mensagem: "**Diagnóstico com Coleta**\n\n📋 **Como funciona:**\n• Buscamos seu equipamento em casa\n• Diagnóstico completo em laboratório\n• Reparos até R$ 300 executados automaticamente\n• Acima de R$ 300 = consultamos antes\n• Coleta + entrega inclusas\n\n⚠️ **Em caso de desistência:**\nTaxa de diagnóstico: R$ 99,99 a R$ 100\n\n📸 **Precisamos de:** fotos/vídeo do defeito, marca e modelo, endereço completo.",
    opcoes: [
      { label: "Agendar coleta pelo WhatsApp", proximo: "whatsapp_coleta" },
    ]
  },

  precos: {
    mensagem: "**Tabela de Preços Resumida**\n\n💻 **Visita Técnica por Tempo:**\n• 15 min: R$ 69 | 30 min: R$ 99\n• 1h: R$ 169 | 2h: R$ 199 | 3h: R$ 369\n\n🔧 **Formatação:** a partir de R$ 150\n🛡️ **Remoção de Vírus:** a partir de R$ 69,99\n💾 **Upgrade SSD:** a partir de R$ 80 (mão de obra)\n📦 **Diagnóstico com Coleta:** R$ 99,99 a R$ 100 (abatido do reparo)\n🖥️ **Suporte Remoto:** a partir de R$ 79,99\n\n⚠️ **NÃO existe atendimento sem compromisso presencial.** Estimativas via WhatsApp são aproximadas.",
    opcoes: [
      { label: "Ver tabela completa no site", proximo: "link_precos" },
      { label: "Quero agendar um serviço", proximo: "tipo_equipamento" },
    ]
  },

  duvidas: {
    mensagem: "Claro! Sobre o que você tem dúvidas?",
    opcoes: [
      { label: "Como funciona o atendimento?", proximo: "como_funciona" },
      { label: "Por que diagnóstico é pago?", proximo: "duvida_diagnostico" },
      { label: "Quando compensa reparar?", proximo: "duvida_compensa" },
      { label: "Vocês dão garantia?", proximo: "garantia" },
      { label: "Quais formas de pagamento?", proximo: "pagamento" },
      { label: "Atendem minha região?", proximo: "regioes" },
    ]
  },

  como_funciona: {
    mensagem: "**Como funciona o atendimento:**\n\n1️⃣ Você descreve o problema (WhatsApp)\n2️⃣ Classificamos: simples, médio ou complexo\n3️⃣ Agendamos data e horário\n4️⃣ Técnico vai até você (ou coletamos)\n5️⃣ Diagnóstico profissional (pago)\n6️⃣ Aprovação do cliente\n7️⃣ Execução + garantia\n\n⚠️ **Importante:**\n• Diagnóstico é etapa separada do reparo\n• Problemas simples podem esconder falhas graves\n• O técnico orienta quando NÃO compensa reparar",
    opcoes: [
      { label: "Quero agendar", proximo: "tipo_equipamento" },
      { label: "Falar com técnico", proximo: "whatsapp_geral" },
    ]
  },

  duvida_diagnostico: {
    mensagem: "**Por que o diagnóstico é pago?**\n\n🔍 O diagnóstico envolve:\n• Tempo técnico dedicado (30 min a várias horas)\n• Ferramentas profissionais (multímetro, fonte de teste, etc.)\n• Conhecimento especializado\n• Responsabilidade técnica\n\n💡 **Sem diagnóstico correto:**\n• Peças trocadas desnecessariamente\n• Risco de piorar o problema\n• Gasto duplo ou triplo\n\n✅ **O valor do diagnóstico é abatido do reparo** quando aprovado.",
    opcoes: [
      { label: "Entendi, quero agendar", proximo: "tipo_equipamento" },
      { label: "Ler mais no site", proximo: "link_diagnostico" },
    ]
  },

  duvida_compensa: {
    mensagem: "**Quando compensa reparar?**\n\n✅ **Compensa:** Equipamento <5 anos, problema pontual, custo <40% de um novo\n❌ **Não compensa:** Equipamento >8 anos, múltiplos defeitos, custo >40% de um novo\n\n**Regra de ouro:** Se o reparo custa mais que 40% de um equipamento novo equivalente, geralmente não vale a pena.\n\nO técnico sempre orienta com honestidade.",
    opcoes: [
      { label: "Quero avaliação do meu caso", proximo: "tipo_equipamento" },
      { label: "Ler guia completo", proximo: "link_quando_nao_compensa" },
    ]
  },

  garantia: {
    mensagem: "**Sim, todos os serviços têm garantia!** ✅\n\n• Garantia por escrito: 30 a 90 dias\n• Peças: garantia do fabricante\n• Nota fiscal emitida\n\nSe tiver qualquer problema no período de garantia, voltamos sem custo adicional.",
    opcoes: [
      { label: "Quero agendar um serviço", proximo: "tipo_equipamento" },
      { label: "Falar com técnico", proximo: "whatsapp_geral" },
    ]
  },

  pagamento: {
    mensagem: "**Formas de pagamento aceitas:**\n\n• PIX (preferencial)\n• Dinheiro\n• Cartão de débito\n• Cartão de crédito\n• Faturado (empresas com contrato)\n\n💡 Pagamento após conclusão do serviço.",
    opcoes: [
      { label: "Quero agendar um serviço", proximo: "tipo_equipamento" },
      { label: "Voltar ao início", proximo: "inicio" },
    ]
  },

  regioes: {
    mensagem: "**Atendemos Curitiba e região metropolitana!** 🗺️\n\n**Curitiba:** Centro, Batel, Portão, CIC, Campo Comprido, Santa Felicidade e +20 bairros\n**São José dos Pinhais:** Centro, Afonso Pena, Cruzeiro e região\n**Araucária:** Centro, Capela Velha, Thomaz Coelho\n**Campo Largo:** Centro, Ferraria, Jardim Guilhermina\n**Pinhais:** Centro, Weissópolis, Pineville\n\n📍 Outras cidades da região: consulte disponibilidade.",
    opcoes: [
      { label: "Moro nessas regiões", proximo: "tipo_equipamento" },
      { label: "Outra cidade - consultar", proximo: "whatsapp_geral" },
    ]
  },

  link_precos: {
    mensagem: "Veja a tabela completa em:\n🔗 **tecnico.curitiba.br/precos-e-politicas**\n\nOu converse sobre valores específicos para seu caso:",
    opcoes: [
      { label: "Falar sobre meu caso", proximo: "whatsapp_geral" },
      { label: "Agendar serviço", proximo: "tipo_equipamento" },
    ]
  },

  link_diagnostico: {
    mensagem: "Leia o guia completo em:\n🔗 **tecnico.curitiba.br/diagnostico-tecnico**\n\nOu agende diretamente:",
    opcoes: [
      { label: "Agendar diagnóstico", proximo: "tipo_equipamento" },
    ]
  },

  link_quando_nao_compensa: {
    mensagem: "Veja o guia completo em:\n🔗 **tecnico.curitiba.br/quando-nao-compensa**\n\nSe quiser uma avaliação personalizada:",
    opcoes: [
      { label: "Consultar viabilidade", proximo: "whatsapp_geral" },
    ]
  },

  // ===== ESTADOS FINAIS (REDIRECT WHATSAPP) =====
  whatsapp_visita: { redirect: true, mensagem: "Olá! Gostaria de agendar uma visita técnica.\n\nNome: [NOME]\nEndereço: [ENDEREÇO/BAIRRO]\nEquipamento: [MARCA/MODELO]\nIdade: [TEMPO DE USO]\nProblema: [DESCREVA]\nPreferência: [DATA/HORÁRIO]\n\nEstou ciente da política de preços (A partir de R$ 69,99)." },
  whatsapp_coleta: { redirect: true, mensagem: "Olá! Gostaria de agendar diagnóstico com coleta.\n\nNome: [NOME]\nEndereço: [ENDEREÇO COMPLETO + CEP]\nEquipamento: [MARCA/MODELO]\nIdade: [TEMPO DE USO]\nOrigem: [NOVO/USADO]\nProblema: [DESCREVA]\nHistórico: [REPAROS ANTERIORES?]\n\nEstou ciente da taxa de R$ 99,99 a R$ 100 (desistência) e pré-aprovado até R$300-400." },
  whatsapp_remoto: { redirect: true, mensagem: "Olá! Preciso de suporte remoto.\n\nNome: [NOME]\nEquipamento: [MARCA/MODELO]\nProblema: [DESCREVA]\n\nEstou disponível agora." },
  whatsapp_geral: { redirect: true, mensagem: "Olá! Vim pelo site e gostaria de mais informações sobre os serviços de informática." },
  whatsapp_urgente: { redirect: true, mensagem: "🚨 URGENTE — Caiu líquido no meu notebook!\n\nMarca/Modelo: [MODELO]\nTipo de líquido: [ÁGUA/CAFÉ/OUTRO]\nQuanto tempo faz: [TEMPO]\n\nJá desliguei o equipamento. Preciso de atendimento urgente!" },
  whatsapp_tv: { redirect: true, mensagem: "Olá! Preciso de reparo na minha TV.\n\nMarca/Modelo: [MARCA E MODELO]\nTamanho: [POLEGADAS]\nIdade: [TEMPO DE USO]\nProblema: [DESCREVA]\n\nVou enviar fotos/vídeo do defeito." },
  whatsapp_tela: { redirect: true, mensagem: "Olá! Preciso trocar a tela do meu notebook.\n\nMarca/Modelo: [MARCA E MODELO EXATO]\nTipo: [TOUCH ou COMUM]\nProblema: [DESCREVA]\n\nVou enviar fotos do dano." },
  whatsapp_upgrade: { redirect: true, mensagem: "Olá! Gostaria de fazer upgrade no meu equipamento.\n\nMarca/Modelo: [MARCA E MODELO]\nUpgrade desejado: [SSD/RAM/OUTRO]\n\nGostaria de verificar compatibilidade antes de comprar." },
  whatsapp_montagem: { redirect: true, mensagem: "Olá! Gostaria de consultoria para montagem de PC.\n\nUso: [JOGOS/TRABALHO/ESCRITÓRIO]\nvalor do atendimento: [VALOR DISPONÍVEL]\n\nPreciso de ajuda para escolher os componentes." },
  whatsapp_cftv: { redirect: true, mensagem: "Olá! Tenho interesse em câmeras de segurança (CFTV).\n\nLocal: [RESIDÊNCIA/COMÉRCIO/EMPRESA]\nEndereço: [CIDADE/BAIRRO]\nQuantidade estimada: [CÂMERAS]\n\nGostaria de um valor." },
};

type ChatFlowKey = keyof typeof chatFlow;

interface Mensagem {
  tipo: "bot" | "user";
  texto: string;
  opcoes?: { label: string; proximo: string }[];
}

export const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [estadoAtual, setEstadoAtual] = useState<ChatFlowKey>("inicio");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listener para abrir chatbot de outros componentes
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
    };
    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    if (isOpen && mensagens.length === 0) {
      const estadoInicial = chatFlow.inicio;
      setMensagens([{
        tipo: "bot",
        texto: estadoInicial.mensagem,
        opcoes: estadoInicial.opcoes
      }]);
    }
  }, [isOpen, mensagens.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const handleOpcaoClick = (opcao: { label: string; proximo: string }) => {
    const proximoEstado = chatFlow[opcao.proximo as ChatFlowKey];
    
    // Adiciona resposta do usuário
    setMensagens(prev => [...prev.slice(0, -1), 
      { ...prev[prev.length - 1], opcoes: undefined },
      { tipo: "user", texto: opcao.label }
    ]);

    // Verifica se é redirect para WhatsApp
    if (proximoEstado && 'redirect' in proximoEstado && proximoEstado.redirect) {
      trackCTAClick("whatsapp", `chatbot_${opcao.proximo}`);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(proximoEstado.mensagem)}`;
      window.open(url, "_blank");
      return;
    }

    // Adiciona resposta do bot após delay
    setTimeout(() => {
      if (proximoEstado && 'mensagem' in proximoEstado) {
        setMensagens(prev => [...prev, {
          tipo: "bot",
          texto: proximoEstado.mensagem,
          opcoes: 'opcoes' in proximoEstado ? proximoEstado.opcoes : undefined
        }]);
        setEstadoAtual(opcao.proximo as ChatFlowKey);
      }
    }, 500);
  };

  const reiniciarChat = () => {
    setMensagens([]);
    setEstadoAtual("inicio");
    const estadoInicial = chatFlow.inicio;
    setMensagens([{
      tipo: "bot",
      texto: estadoInicial.mensagem,
      opcoes: estadoInicial.opcoes
    }]);
  };

  const formatarTexto = (texto: string) => {
    // Converte markdown básico para HTML e sanitiza para prevenir XSS
    const html = texto
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    return DOMPurify.sanitize(html);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-background rounded-xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col">
          {/* Header */}
          <div className="bg-whatsapp p-4 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Assistente Técnico</p>
                  <p className="text-sm text-white/80">Online agora</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={reiniciarChat}
                  className="text-white/80 hover:text-white transition-colors text-xs px-2 py-1 bg-white/10 rounded"
                >
                  Reiniciar
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]">
            {mensagens.map((msg, index) => (
              <div key={index} className={`flex ${msg.tipo === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.tipo === "user" ? "order-1" : ""}`}>
                  <div className="flex items-end gap-2">
                    {msg.tipo === "bot" && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.tipo === "user"
                          ? "bg-accent text-accent-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      <p 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: formatarTexto(msg.texto) }}
                      />
                    </div>
                    {msg.tipo === "user" && (
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Opções */}
                  {msg.opcoes && msg.opcoes.length > 0 && (
                    <div className="mt-3 ml-8 space-y-2">
                      {msg.opcoes.map((opcao, i) => (
                        <button
                          key={i}
                          onClick={() => handleOpcaoClick(opcao)}
                          className="w-full text-left p-3 bg-background border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group flex items-center justify-between"
                        >
                          <span className="text-sm text-foreground">{opcao.label}</span>
                          <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 bg-secondary/50 border-t border-border flex-shrink-0">
            <p className="text-xs text-center text-muted-foreground">
              Atendimento humano via <span className="text-whatsapp font-medium">WhatsApp</span>
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button with Label */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-medium text-foreground whitespace-nowrap">
              💬 Atendimento Rápido
            </p>
            <p className="text-[10px] text-muted-foreground">
              Assistente Virtual 24h
            </p>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-whatsapp hover:bg-whatsapp-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
            !isOpen ? "animate-pulse-soft" : ""
          }`}
          aria-label="Abrir assistente virtual"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <MessageCircle className="h-7 w-7" />
          )}
        </button>
      </div>
    </>
  );
};
