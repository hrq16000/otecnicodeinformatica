import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import DOMPurify from "dompurify";

const WHATSAPP_NUMBER = "5541997452053";

// Fluxo do chatbot baseado no prompt profissional
const chatFlow = {
  inicio: {
    mensagem: "Olá! 👋 Sou o assistente virtual do **Técnico Curitiba**. Estou aqui para ajudar você com:\n\n• Agendamento de visitas técnicas\n• Informações sobre serviços e preços\n• Diagnóstico inicial do problema\n\nComo posso ajudar?",
    opcoes: [
      { label: "Preciso de atendimento técnico", proximo: "tipo_atendimento" },
      { label: "Quero saber os preços", proximo: "precos" },
      { label: "Tenho dúvidas sobre o serviço", proximo: "duvidas" },
    ]
  },
  tipo_atendimento: {
    mensagem: "Ótimo! Para direcionar você corretamente, qual tipo de atendimento você precisa?",
    opcoes: [
      { label: "Computador/Notebook lento ou travando", proximo: "problema_lentidao" },
      { label: "Vírus ou problemas de segurança", proximo: "problema_virus" },
      { label: "Preciso formatar o computador", proximo: "problema_formatacao" },
      { label: "Problema de hardware (não liga, tela quebrada)", proximo: "problema_hardware" },
      { label: "Outro problema", proximo: "outro_problema" },
    ]
  },
  problema_lentidao: {
    mensagem: "**Computador lento** é um dos problemas mais comuns! Geralmente é resolvido com:\n\n• Limpeza de sistema e programas desnecessários\n• Upgrade de SSD (deixa o PC 10x mais rápido)\n• Aumento de memória RAM\n\n**💰 Valores:**\n• Visita técnica: R$ 99,99/30min\n• Upgrade SSD: a partir de R$ 80 (mão de obra)\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita técnica presencial", proximo: "agendar_visita" },
      { label: "Quero diagnóstico com coleta", proximo: "diagnostico_coleta" },
      { label: "Prefiro suporte remoto", proximo: "suporte_remoto" },
    ]
  },
  problema_virus: {
    mensagem: "**Vírus e malwares** podem causar sérios danos aos seus dados e privacidade!\n\n**O que fazemos:**\n• Remoção completa de vírus, trojans e ransomware\n• Limpeza profunda do sistema\n• Instalação de proteção permanente\n\n**💰 Valores:**\n• Remoção simples: a partir de R$ 99,99\n• Remoção complexa + proteção: a partir de R$ 180\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita técnica", proximo: "agendar_visita" },
      { label: "Tentar suporte remoto", proximo: "suporte_remoto" },
    ]
  },
  problema_formatacao: {
    mensagem: "**Formatação completa** deixa o computador como novo!\n\n**O que está incluso:**\n• Instalação limpa do Windows 10/11\n• Instalação de drivers atualizados\n• Instalação de programas essenciais\n• Backup dos seus arquivos (opcional)\n\n**💰 Valor:** a partir de R$ 150\n**⏱️ Tempo médio:** 30-60 minutos no local\n\nComo prefere ser atendido?",
    opcoes: [
      { label: "Agendar visita em casa", proximo: "agendar_visita" },
      { label: "Enviar para coleta/entrega", proximo: "diagnostico_coleta" },
    ]
  },
  problema_hardware: {
    mensagem: "**Problemas de hardware** geralmente precisam de diagnóstico presencial ou em bancada.\n\n**Problemas comuns:**\n• Notebook não liga\n• Tela quebrada ou com manchas\n• Teclado com teclas falhando\n• Superaquecimento\n\n**💰 Modalidades:**\n• Visita diagnóstica: R$ 100 (sem compromisso)\n• Coleta + diagnóstico: incluso no reparo até R$ 300\n\nComo prefere proceder?",
    opcoes: [
      { label: "Visita técnica (só diagnóstico)", proximo: "visita_diagnostico" },
      { label: "Coleta para reparo em bancada", proximo: "diagnostico_coleta" },
    ]
  },
  outro_problema: {
    mensagem: "Sem problemas! Me conte um pouco mais sobre o que está acontecendo com seu equipamento.\n\nPara agilizar, você pode já falar com nosso técnico pelo WhatsApp:",
    opcoes: [
      { label: "Falar com técnico no WhatsApp", proximo: "whatsapp_geral" },
    ]
  },
  agendar_visita: {
    mensagem: "Perfeito! Para agendar a **visita técnica presencial**, preciso de algumas informações:\n\n📋 **Dados necessários:**\n• Seu nome completo\n• Endereço com bairro\n• Descrição breve do problema\n• Preferência de data/horário\n\n**💰 Política de cobrança:**\nR$ 99,99 a cada 30 minutos de atendimento.\n\nVou direcionar você para o WhatsApp para finalizar o agendamento:",
    opcoes: [
      { label: "Agendar pelo WhatsApp", proximo: "whatsapp_visita" },
    ]
  },
  visita_diagnostico: {
    mensagem: "**Visita Técnica - Sem Compromisso**\n\n📋 **Como funciona:**\n• Valor: R$ 100,00 (até 30 minutos)\n• O técnico avalia o equipamento no local\n• Você recebe um diagnóstico completo\n• Não obriga a fazer o reparo\n• Se não aprovar, paga apenas a visita\n\nDeseja agendar?",
    opcoes: [
      { label: "Agendar visita diagnóstica", proximo: "whatsapp_diagnostico" },
    ]
  },
  diagnostico_coleta: {
    mensagem: "**Diagnóstico com Coleta**\n\n📋 **Como funciona:**\n• Buscamos seu equipamento em casa\n• Diagnóstico completo em laboratório\n• Reparos até R$ 300 executados automaticamente\n• Acima de R$ 300 = consultamos antes\n• Coleta + entrega inclusas\n\n⚠️ **Em caso de desistência:**\nTaxa de diagnóstico: R$ 90 a R$ 100\n\n📸 **Para agendar, precisamos:**\n• Fotos/vídeo do defeito\n• Marca e modelo do equipamento\n• Endereço completo\n\nVamos agendar?",
    opcoes: [
      { label: "Agendar coleta pelo WhatsApp", proximo: "whatsapp_coleta" },
    ]
  },
  suporte_remoto: {
    mensagem: "**Suporte Remoto**\n\n📋 **Como funciona:**\n• Atendimento imediato via TeamViewer ou AnyDesk\n• Você compartilha a tela conosco\n• Resolvemos o problema em tempo real\n\n**💰 Valores:**\n• Suporte básico: a partir de R$ 79,99\n• Hora técnica: R$ 99,99/hora\n\n⚠️ **Importante:** Não indicado para problemas de hardware ou quando o PC não liga.\n\nQuer iniciar agora?",
    opcoes: [
      { label: "Iniciar suporte remoto", proximo: "whatsapp_remoto" },
    ]
  },
  precos: {
    mensagem: "**Tabela de Preços - Principais Serviços**\n\n💻 **Visita Técnica**\n• R$ 99,99 a cada 30 minutos\n\n🔧 **Formatação Completa**\n• A partir de R$ 150\n\n🛡️ **Remoção de Vírus**\n• A partir de R$ 99,99\n\n💾 **Upgrade SSD**\n• A partir de R$ 80 (mão de obra)\n\n📦 **Diagnóstico com Coleta**\n• Até R$ 300 pré-aprovado\n\n🖥️ **Suporte Remoto**\n• A partir de R$ 79,99\n\nQuer ver a tabela completa ou agendar um serviço?",
    opcoes: [
      { label: "Ver tabela completa de preços", proximo: "link_precos" },
      { label: "Quero agendar um serviço", proximo: "tipo_atendimento" },
    ]
  },
  duvidas: {
    mensagem: "Claro! Sobre o que você tem dúvidas?",
    opcoes: [
      { label: "Como funciona o atendimento?", proximo: "como_funciona" },
      { label: "Vocês dão garantia?", proximo: "garantia" },
      { label: "Quais formas de pagamento?", proximo: "pagamento" },
      { label: "Atendem minha região?", proximo: "regioes" },
    ]
  },
  como_funciona: {
    mensagem: "**Como funciona o atendimento:**\n\n1️⃣ Você descreve o problema\n2️⃣ Agendamos data e horário\n3️⃣ Técnico vai até você (ou coletamos)\n4️⃣ Diagnóstico + orçamento transparente\n5️⃣ Você aprova o serviço\n6️⃣ Executamos e emitimos garantia\n\n**Formas de atendimento:**\n• Visita técnica presencial\n• Coleta + entrega\n• Suporte remoto\n\nPosso ajudar com algo específico?",
    opcoes: [
      { label: "Quero agendar", proximo: "tipo_atendimento" },
      { label: "Falar com técnico", proximo: "whatsapp_geral" },
    ]
  },
  garantia: {
    mensagem: "**Sim, todos os serviços têm garantia!** ✅\n\n• Garantia por escrito: 30 a 90 dias\n• Peças: garantia do fabricante\n• Nota fiscal emitida\n\nSe tiver qualquer problema no período de garantia, voltamos sem custo adicional.\n\nMais alguma dúvida?",
    opcoes: [
      { label: "Quero agendar um serviço", proximo: "tipo_atendimento" },
      { label: "Falar com técnico", proximo: "whatsapp_geral" },
    ]
  },
  pagamento: {
    mensagem: "**Formas de pagamento aceitas:**\n\n• PIX (preferencial)\n• Dinheiro\n• Cartão de débito\n• Cartão de crédito\n• Faturado (empresas com contrato)\n\n💡 Pagamento após conclusão do serviço.\n\nMais alguma dúvida?",
    opcoes: [
      { label: "Quero agendar um serviço", proximo: "tipo_atendimento" },
      { label: "Voltar ao início", proximo: "inicio" },
    ]
  },
  regioes: {
    mensagem: "**Atendemos Curitiba e região metropolitana!** 🗺️\n\n**Curitiba:**\nCentro, Batel, Portão, CIC, Campo Comprido, Santa Felicidade e mais.\n\n**São José dos Pinhais:**\nCentro, Afonso Pena, Cruzeiro, Aristocrata, Braga e região.\n\n**Outras cidades:**\nConsulte disponibilidade.\n\nQual seu bairro?",
    opcoes: [
      { label: "Moro em Curitiba", proximo: "agendar_visita" },
      { label: "Moro em São José dos Pinhais", proximo: "agendar_visita" },
      { label: "Outra cidade", proximo: "whatsapp_geral" },
    ]
  },
  link_precos: {
    mensagem: "Você pode ver nossa tabela completa de preços em:\n\n🔗 **tecnicocuritiba.com.br/precos-e-politicas**\n\nOu podemos conversar sobre valores específicos para seu caso:",
    opcoes: [
      { label: "Falar sobre meu caso", proximo: "whatsapp_geral" },
      { label: "Agendar serviço", proximo: "tipo_atendimento" },
    ]
  },
  // Estados finais que redirecionam para WhatsApp
  whatsapp_visita: { redirect: true, mensagem: "Olá! Gostaria de agendar uma visita técnica presencial.\n\nMeu nome: [NOME]\nEndereço: [ENDEREÇO/BAIRRO]\nProblema: [DESCREVA O PROBLEMA]\nPreferência: [DATA/HORÁRIO]\n\nLi e concordo com a política de preços (R$99,99/30min)." },
  whatsapp_diagnostico: { redirect: true, mensagem: "Olá! Gostaria de agendar uma visita diagnóstica (sem compromisso).\n\nMeu nome: [NOME]\nEndereço: [ENDEREÇO/BAIRRO]\nProblema: [DESCREVA O PROBLEMA]\n\nEntendo que o valor da visita é R$100." },
  whatsapp_coleta: { redirect: true, mensagem: "Olá! Gostaria de agendar diagnóstico com coleta.\n\nMeu nome: [NOME]\nEndereço: [ENDEREÇO COMPLETO]\nEquipamento: [MARCA/MODELO]\nProblema: [DESCREVA O PROBLEMA]\n\nEstou ciente da taxa de R$90-100 em caso de desistência e do valor pré-aprovado de até R$300." },
  whatsapp_remoto: { redirect: true, mensagem: "Olá! Preciso de suporte remoto.\n\nMeu nome: [NOME]\nProblema: [DESCREVA O PROBLEMA]\n\nEstou disponível para atendimento agora." },
  whatsapp_geral: { redirect: true, mensagem: "Olá! Vim pelo site e gostaria de mais informações sobre os serviços de informática." },
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
              Atendimento humano via <span className="text-whatsapp font-medium">WhatsApp</span> • (41) 99745-2053
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
