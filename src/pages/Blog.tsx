import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { trackPageView } from "@/lib/analytics";
import { IMAGES } from "@/lib/images";
import { getUniqueImage } from "@/lib/blogImages";
import { problemaPagesData } from "@/lib/problemaPagesData";
import {
  Calendar, Clock, ArrowRight, Search, Sparkles, Cpu, Monitor,
  Smartphone, Tv, Wrench, Shield, Wifi, HardDrive, Printer,
  Radio, Zap, TrendingUp, BookOpen, ChevronDown, Layers, Star,
  Eye, Flame, Filter, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── Blog Posts Data (each with its own unique image slug) ───
const blogPosts = [
  { slug: "linux-vs-windows-diferencas-qual-escolher", title: "Linux vs Windows: Diferenças Reais e Qual Escolher em 2026", excerpt: "Comparativo técnico completo entre Linux e Windows: desempenho, segurança, compatibilidade e custo.", date: "2026-04-13", readTime: "14 min", category: "Linux" },
  { slug: "comandos-linux-essenciais-iniciantes", title: "50 Comandos Linux Essenciais Para Iniciantes e Técnicos", excerpt: "Guia definitivo de comandos do terminal: navegação, arquivos, processos, rede e permissões.", date: "2026-04-13", readTime: "16 min", category: "Linux" },
  { slug: "como-instalar-ubuntu-do-zero", title: "Como Instalar Ubuntu do Zero: Guia Completo 2026", excerpt: "Passo a passo desde o pendrive bootável até a configuração pós-instalação.", date: "2026-04-13", readTime: "12 min", category: "Linux" },
  { slug: "distribuicoes-linux-qual-melhor-para-voce", title: "Distribuições Linux: Qual a Melhor Para Você? (Ubuntu, Mint, Fedora, Debian)", excerpt: "Comparativo entre as principais distros para desktop, servidor e PC antigo.", date: "2026-04-13", readTime: "11 min", category: "Linux" },
  { slug: "trocar-windows-por-linux-vale-a-pena", title: "Trocar o Windows Por Linux: Vale a Pena? Guia Prático de Migração", excerpt: "O que funciona, o que não funciona e como fazer a transição sem dor de cabeça.", date: "2026-04-13", readTime: "10 min", category: "Linux" },
  { slug: "linux-para-pc-antigo-leve-rapido", title: "Linux Para PC Antigo: 5 Distros Leves Que Ressuscitam Seu Computador", excerpt: "Lubuntu, Xubuntu, Linux Lite, Peppermint e antiX — qual usar em máquinas com pouca RAM.", date: "2026-04-13", readTime: "9 min", category: "Linux" },
  { slug: "inteligencia-artificial-evolucao-historia", title: "A Evolução da Inteligência Artificial: De Turing ao ChatGPT", excerpt: "Uma jornada pela história da IA, dos primeiros algoritmos até os modelos generativos de 2026.", date: "2026-04-13", readTime: "13 min", category: "Inteligência Artificial" },
  { slug: "como-usar-ia-no-dia-a-dia-dicas-praticas", title: "Como Usar IA no Dia a Dia: 15 Dicas Práticas Para Trabalho e Estudo", excerpt: "ChatGPT, Copilot, Gemini e outras IAs que já fazem parte da rotina de milhões de pessoas.", date: "2026-04-13", readTime: "12 min", category: "Inteligência Artificial" },
  { slug: "melhores-ferramentas-ia-gratuitas-2026", title: "Melhores Ferramentas de IA Gratuitas em 2026: Texto, Imagem, Código e Áudio", excerpt: "Lista curada de IAs gratuitas para produtividade, criação de conteúdo e programação.", date: "2026-04-13", readTime: "10 min", category: "Inteligência Artificial" },
  { slug: "ia-para-pequenas-empresas-como-comecar", title: "IA Para Pequenas Empresas: Como Começar Sem Gastar Muito", excerpt: "Automação de atendimento, geração de conteúdo e análise de dados com ferramentas acessíveis.", date: "2026-04-13", readTime: "11 min", category: "Inteligência Artificial" },
  { slug: "ia-substituir-empregos-mitos-verdades", title: "A IA Vai Substituir Empregos? Mitos, Verdades e Como Se Preparar", excerpt: "O que a pesquisa mostra sobre automação, novas profissões e habilidades do futuro.", date: "2026-04-13", readTime: "10 min", category: "Inteligência Artificial" },
  { slug: "como-configurar-servidor-de-arquivos", title: "Como Configurar Servidor de Arquivos em Rede Local (Windows e Linux)", excerpt: "Procedimento técnico completo para montar um file server com permissões, mapeamento e backup.", date: "2026-04-13", readTime: "14 min", category: "Procedimentos Técnicos" },
  { slug: "como-fazer-manutencao-impressora", title: "Como Fazer Manutenção em Impressora: Jato de Tinta e Laser", excerpt: "Limpeza de cabeçote, troca de toner, reset de contador e diagnóstico de falhas comuns.", date: "2026-04-13", readTime: "11 min", category: "Procedimentos Técnicos" },
  { slug: "como-configurar-vpn-empresarial", title: "Como Configurar VPN Empresarial: Acesso Remoto Seguro", excerpt: "Procedimento técnico para implementar VPN com WireGuard, OpenVPN e Windows Server.", date: "2026-04-13", readTime: "13 min", category: "Procedimentos Técnicos" },
  { slug: "preciso-de-um-plataforma-prestadores", title: "Preciso de Um: A Plataforma Que Conecta Prestadores de Serviços a Clientes", excerpt: "Conheça a plataforma que está revolucionando a forma como profissionais autônomos encontram clientes em todo o Brasil.", date: "2026-04-08", readTime: "8 min", category: "Plataformas" },
  { slug: "como-cadastrar-preciso-de-um", title: "Como Se Cadastrar no Preciso de Um e Começar a Receber Clientes Hoje", excerpt: "Passo a passo completo para profissionais de qualquer ramo se cadastrarem gratuitamente na plataforma.", date: "2026-04-08", readTime: "6 min", category: "Plataformas" },
  { slug: "preciso-de-um-todos-os-ramos", title: "Preciso de Um Aceita Todos os Ramos: Eletricista, Pintor, Diarista e Muito Mais", excerpt: "De construção civil a eventos, veja como profissionais de qualquer área podem participar e lucrar.", date: "2026-04-08", readTime: "7 min", category: "Plataformas" },
  { slug: "preciso-de-um-vagas-oportunidades", title: "Vagas e Oportunidades no Preciso de Um: Como Encontrar Trabalho Rápido", excerpt: "A plataforma também oferece vagas de emprego e oportunidades de serviço. Veja como aproveitar.", date: "2026-04-08", readTime: "5 min", category: "Plataformas" },
  { slug: "por-que-todo-prestador-deve-estar-preciso-de-um", title: "Por Que Todo Prestador de Serviço Deve Estar no Preciso de Um", excerpt: "Visibilidade, credibilidade e clientes: os motivos para todo profissional se cadastrar agora.", date: "2026-04-07", readTime: "9 min", category: "Plataformas" },
  { slug: "como-trocar-pasta-termica-notebook", title: "Como Trocar a Pasta Térmica do Notebook: Guia Técnico Completo", excerpt: "Passo a passo profissional para substituir a pasta térmica e resolver superaquecimento.", date: "2026-04-08", readTime: "10 min", category: "Procedimentos Técnicos" },
  { slug: "como-clonar-hd-para-ssd", title: "Como Clonar HD Para SSD Sem Perder Dados: Procedimento Técnico", excerpt: "Migração segura de disco com clonagem setor a setor usando ferramentas profissionais.", date: "2026-04-08", readTime: "12 min", category: "Procedimentos Técnicos" },
  { slug: "como-testar-fonte-de-alimentacao-pc", title: "Como Testar a Fonte de Alimentação do PC com Multímetro", excerpt: "Procedimento técnico para diagnosticar defeitos na fonte ATX usando multímetro.", date: "2026-04-08", readTime: "9 min", category: "Procedimentos Técnicos" },
  { slug: "como-limpar-notebook-por-dentro", title: "Como Limpar o Notebook Por Dentro: Desmontagem e Limpeza Profissional", excerpt: "Procedimento completo de abertura, limpeza de cooler, dissipador e placa-mãe.", date: "2026-04-08", readTime: "11 min", category: "Procedimentos Técnicos" },
  { slug: "como-recuperar-dados-hd-defeituoso", title: "Como Recuperar Dados de HD Defeituoso: Métodos e Ferramentas", excerpt: "Técnicas profissionais para recuperar arquivos de discos com setores defeituosos.", date: "2026-04-07", readTime: "13 min", category: "Procedimentos Técnicos" },
  { slug: "como-configurar-rede-wifi-empresarial", title: "Como Configurar Rede Wi-Fi Empresarial: VLANs, QoS e Segurança", excerpt: "Procedimento técnico para montar rede corporativa com segmentação e priorização de tráfego.", date: "2026-04-07", readTime: "14 min", category: "Procedimentos Técnicos" },
  { slug: "como-diagnosticar-placa-mae-defeituosa", title: "Como Diagnosticar Placa-Mãe Defeituosa: Testes e Sinais", excerpt: "Procedimentos de diagnóstico visual, elétrico e lógico para identificar defeitos em placas-mãe.", date: "2026-04-07", readTime: "11 min", category: "Procedimentos Técnicos" },
  { slug: "como-instalar-segundo-ssd-notebook", title: "Como Instalar um Segundo SSD no Notebook (Caddy ou M.2)", excerpt: "Procedimento técnico para adicionar armazenamento extra substituindo o drive óptico ou via slot M.2.", date: "2026-04-07", readTime: "8 min", category: "Procedimentos Técnicos" },
  { slug: "como-crimpar-cabo-de-rede-rj45", title: "Como Crimpar Cabo de Rede RJ45: Padrão T568A e T568B", excerpt: "Procedimento técnico completo para crimpar cabos de rede Cat5e e Cat6 com testagem.", date: "2026-04-08", readTime: "8 min", category: "Procedimentos Técnicos" },
  { slug: "como-configurar-bios-uefi-corretamente", title: "Como Configurar BIOS/UEFI Corretamente: Guia Para Técnicos", excerpt: "Boot order, XMP, Secure Boot, CSM, TPM — todas as configurações essenciais explicadas.", date: "2026-04-08", readTime: "11 min", category: "Procedimentos Técnicos" },
  { slug: "como-montar-pc-do-zero-guia-completo", title: "Como Montar um PC do Zero: Guia Técnico Passo a Passo", excerpt: "Da escolha de componentes à primeira inicialização, com dicas para evitar erros comuns.", date: "2026-04-08", readTime: "15 min", category: "Procedimentos Técnicos" },
  { slug: "como-instalar-linux-dual-boot-windows", title: "Como Instalar Linux em Dual Boot com Windows: Procedimento Seguro", excerpt: "Ubuntu, Mint ou Fedora ao lado do Windows sem perder dados. Procedimento passo a passo.", date: "2026-04-08", readTime: "10 min", category: "Procedimentos Técnicos" },
  { slug: "como-configurar-backup-automatizado", title: "Como Configurar Backup Automatizado: Local e Nuvem", excerpt: "Procedimento técnico para implementar backup 3-2-1 com agendamento automático.", date: "2026-04-08", readTime: "9 min", category: "Procedimentos Técnicos" },
  { slug: "preciso-de-um-para-eletricistas", title: "Preciso de Um Para Eletricistas: Como Conseguir Mais Clientes", excerpt: "Guia completo para eletricistas se cadastrarem e se destacarem na plataforma.", date: "2026-04-08", readTime: "7 min", category: "Plataformas" },
  { slug: "preciso-de-um-para-pintores-pedreiros", title: "Preciso de Um Para Pintores e Pedreiros: Sua Vitrine Digital", excerpt: "Como profissionais de construção e pintura podem atrair clientes pela plataforma.", date: "2026-04-08", readTime: "7 min", category: "Plataformas" },
  { slug: "preciso-de-um-para-tecnicos-informatica", title: "Preciso de Um Para Técnicos em Informática: Amplie Sua Atuação", excerpt: "Como técnicos de TI podem usar a plataforma para expandir a carteira de clientes.", date: "2026-04-08", readTime: "7 min", category: "Plataformas" },
  { slug: "quando-trocar-computador-ou-reparar", title: "Quando Trocar o Computador e Quando Vale a Pena Reparar (Guia Técnico)", excerpt: "PC antigo, lento ou com defeito? Descubra os critérios técnicos que definem se vale investir no reparo ou se é hora de partir para um equipamento novo.", date: "2026-04-06", readTime: "11 min", category: "Manutenção" },
  { slug: "erros-comuns-upgrade-computador", title: "5 Erros Comuns ao Fazer Upgrade no Computador (e Como Evitar Prejuízo)", excerpt: "Comprar RAM incompatível, instalar SSD errado, forçar peças no slot — veja os erros que causam prejuízo.", date: "2026-04-06", readTime: "8 min", category: "Manutenção" },
  { slug: "manutencao-preventiva-computador-guia", title: "Manutenção Preventiva do Computador: O Guia Que Evita 80% dos Problemas", excerpt: "Rotinas simples que prolongam a vida útil do seu PC e evitam chamados técnicos.", date: "2026-04-06", readTime: "9 min", category: "Manutenção" },
  { slug: "diagnostico-tecnico-por-que-e-pago", title: "Por Que o Diagnóstico Técnico é Pago? Entenda de Uma Vez", excerpt: "Explicamos por que o diagnóstico tem custo, o que ele envolve e como evita prejuízos maiores.", date: "2026-04-05", readTime: "7 min", category: "Atendimento" },
  { slug: "como-proteger-computador-golpes-internet", title: "Como Proteger Seu Computador Contra Golpes e Fraudes na Internet", excerpt: "Links falsos, phishing, extensões maliciosas — aprenda a se proteger.", date: "2026-04-05", readTime: "10 min", category: "Segurança" },
  { slug: "computador-lento-causas-solucoes", title: "Computador Lento: 12 Causas Reais e Como Resolver (Guia 2026)", excerpt: "As 12 causas mais comuns e o que realmente funciona para resolver.", date: "2026-04-06", readTime: "12 min", category: "Manutenção" },
  { slug: "como-saber-se-pc-tem-virus-malware", title: "Como Saber se Seu PC Tem Vírus ou Malware: Sinais, Testes e Soluções", excerpt: "Aprenda a identificar se seu computador foi infectado e o que fazer.", date: "2026-04-05", readTime: "10 min", category: "Segurança" },
  { slug: "notebook-nao-liga-o-que-fazer", title: "Notebook Não Liga: O Que Pode Ser e O Que Fazer", excerpt: "Tela preta, LED piscando ou sem imagem? Veja as causas mais comuns.", date: "2026-04-04", readTime: "9 min", category: "Manutenção" },
  { slug: "diferenca-camera-wifi-dvr-qual-escolher", title: "Câmera Wi-Fi ou DVR: Qual Escolher?", excerpt: "Diferenças técnicas entre câmeras Wi-Fi e DVR com cabo.", date: "2026-02-14", readTime: "8 min", category: "CFTV" },
  { slug: "seguranca-casas-praia-itapoa-guaratuba", title: "Segurança em Casas de Praia: Itapoá e Guaratuba", excerpt: "Como câmeras com acesso remoto protegem sua casa de praia.", date: "2026-02-12", readTime: "7 min", category: "CFTV" },
  { slug: "como-escolher-melhor-kit-cameras-seguranca", title: "Como Escolher o Melhor Kit de Câmeras de Segurança", excerpt: "Guia completo: quantidade, resolução, visão noturna e instalação.", date: "2026-02-10", readTime: "9 min", category: "CFTV" },
  { slug: "monitoramento-24-horas-como-funciona", title: "Monitoramento 24 Horas: Como Funciona", excerpt: "Gravação contínua, acesso remoto e por que é essencial.", date: "2026-02-08", readTime: "6 min", category: "CFTV" },
  { slug: "equipe-especializada-cftv-litoral-parana", title: "Equipe Especializada em CFTV no Litoral do Paraná", excerpt: "Por que uma equipe profissional faz diferença na instalação.", date: "2026-02-06", readTime: "7 min", category: "CFTV" },
  { slug: "windows-11-atualizacao-kb5074105-novidades", title: "Windows 11 KB5074105: Todas as Novidades", excerpt: "Smart App Control, sincronização celular-PC, melhorias no Windows Hello.", date: "2026-01-30", readTime: "10 min", category: "Windows 11" },
  { slug: "windows-11-vale-a-pena-atualizar", title: "Windows 11: Vale a Pena Atualizar?", excerpt: "Requisitos, novidades, vantagens e desvantagens.", date: "2026-01-15", readTime: "8 min", category: "Windows 11" },
  { slug: "como-instalar-windows-11-pc-antigo", title: "Como Instalar Windows 11 em PC Antigo Sem TPM 2.0", excerpt: "Método seguro e testado por técnicos.", date: "2024-01-14", readTime: "10 min", category: "Windows 11" },
  { slug: "windows-11-lento-como-resolver", title: "Windows 11 Lento? 10 Soluções Para Acelerar", excerpt: "10 dicas práticas para otimizar o desempenho.", date: "2024-01-12", readTime: "7 min", category: "Windows 11" },
  { slug: "office-365-guia-completo-empresas", title: "Office 365 Para Empresas: Guia Completo", excerpt: "Teams, SharePoint, OneDrive e todas as ferramentas.", date: "2024-01-11", readTime: "12 min", category: "Office 365" },
  { slug: "office-365-vs-office-tradicional", title: "Office 365 vs Office Tradicional: Qual Escolher?", excerpt: "Comparativo completo entre assinatura e licença perpétua.", date: "2024-01-10", readTime: "6 min", category: "Office 365" },
  { slug: "configurar-email-outlook-office-365", title: "Como Configurar Email Empresarial no Outlook 365", excerpt: "Tutorial com sincronização celular e backup automático.", date: "2024-01-09", readTime: "5 min", category: "Office 365" },
  { slug: "seguranca-digital-empresas-guia-2024", title: "Segurança Digital Para Empresas: Guia Essencial", excerpt: "Firewall, antivírus corporativo, backup e políticas.", date: "2024-01-08", readTime: "15 min", category: "Segurança" },
  { slug: "ransomware-como-proteger-empresa", title: "Ransomware: Como Proteger Sua Empresa", excerpt: "Como funcionam os ataques e medidas preventivas.", date: "2024-01-07", readTime: "10 min", category: "Segurança" },
  { slug: "phishing-como-identificar-golpes", title: "Phishing: Como Identificar e Evitar Golpes por Email", excerpt: "Reconheça tentativas de phishing e proteja seus dados.", date: "2024-01-06", readTime: "7 min", category: "Segurança" },
  { slug: "backup-nuvem-empresas-qual-escolher", title: "Backup na Nuvem Para Empresas: Qual Escolher?", excerpt: "Comparativo entre OneDrive, Google Drive e soluções profissionais.", date: "2024-01-05", readTime: "8 min", category: "Segurança" },
  { slug: "como-escolher-um-bom-antivirus", title: "Como Escolher um Bom Antivírus em 2024", excerpt: "O que realmente importa, opções gratuitas x pagas.", date: "2024-02-02", readTime: "7 min", category: "Segurança" },
  { slug: "como-deixar-computador-mais-rapido", title: "Como Deixar o Computador Mais Rápido: 7 Dicas", excerpt: "7 técnicas simples para melhorar a velocidade.", date: "2024-01-04", readTime: "5 min", category: "Dicas" },
  { slug: "dicas-manter-notebook-funcionando-bem", title: "Dicas Para Manter o Notebook Funcionando Bem", excerpt: "Cuidados que aumentam a vida útil do notebook.", date: "2024-02-01", readTime: "6 min", category: "Manutenção" },
  { slug: "sinais-computador-com-virus", title: "5 Sinais de Que Seu Computador Está com Vírus", excerpt: "Principais sintomas de infecção por vírus ou malware.", date: "2024-01-03", readTime: "4 min", category: "Segurança" },
  { slug: "quando-trocar-hd-por-ssd", title: "Quando Vale a Pena Trocar o HD por SSD?", excerpt: "Vantagens do SSD, quanto custa e para quem vale.", date: "2024-01-02", readTime: "6 min", category: "Hardware" },
  { slug: "backup-como-proteger-seus-arquivos", title: "Backup: Como Proteger Seus Arquivos Importantes", excerpt: "Melhores práticas para manter seus arquivos seguros.", date: "2024-01-01", readTime: "5 min", category: "Segurança" },
  { slug: "notebook-superaquecendo-o-que-fazer", title: "Notebook Superaquecendo: O Que Fazer?", excerpt: "Causas do superaquecimento e como resolver.", date: "2023-12-28", readTime: "4 min", category: "Manutenção" },
  { slug: "wifi-lento-como-melhorar", title: "Wi-Fi Lento em Casa? Veja Como Melhorar o Sinal", excerpt: "Dicas práticas para melhorar cobertura e velocidade.", date: "2023-12-25", readTime: "5 min", category: "Redes" },
  { slug: "como-configurar-firewall-pfsense", title: "Como Configurar Firewall pfSense: Guia Completo Para Redes Empresariais", excerpt: "Instalação, regras de firewall, NAT, VPN, Squid e monitoramento com pfSense — o firewall open-source mais usado do mundo.", date: "2026-04-13", readTime: "16 min", category: "Procedimentos Técnicos" },
  { slug: "como-montar-rack-de-rede", title: "Como Montar um Rack de Rede Profissional: Guia Técnico Completo", excerpt: "Escolha do rack, organização de cabos, patch panel, switch, ventilação e identificação — tudo o que você precisa saber.", date: "2026-04-13", readTime: "14 min", category: "Procedimentos Técnicos" },
  { slug: "como-configurar-active-directory", title: "Como Configurar Active Directory no Windows Server: Passo a Passo", excerpt: "Instalação do AD DS, criação de domínio, GPOs, unidades organizacionais e integração com estações de trabalho.", date: "2026-04-13", readTime: "15 min", category: "Procedimentos Técnicos" },
  { slug: "como-fazer-manutencao-nobreak", title: "Como Fazer Manutenção em Nobreak: Testes, Troca de Bateria e Calibração", excerpt: "Procedimento técnico para manter nobreaks funcionando: testes de autonomia, troca de bateria selada e calibração do circuito.", date: "2026-04-13", readTime: "12 min", category: "Procedimentos Técnicos" },
];

// ─── Category config ───
const CATEGORY_MAP: Record<string, { label: string; icon: typeof Cpu; color: string }> = {
  "Hardware": { label: "Hardware", icon: Cpu, color: "from-blue-600 to-cyan-500" },
  "Problemas de Celular": { label: "Celular", icon: Smartphone, color: "from-purple-600 to-pink-500" },
  "Problemas de TV": { label: "TV", icon: Tv, color: "from-red-600 to-orange-500" },
  "Problemas de Computador": { label: "Computador", icon: Monitor, color: "from-indigo-600 to-blue-500" },
  "Notebook": { label: "Notebook", icon: Monitor, color: "from-teal-600 to-emerald-500" },
  "Problemas de Rádio / Som": { label: "Rádio & Som", icon: Radio, color: "from-amber-600 to-yellow-500" },
  "Software / Sistema": { label: "Software", icon: Layers, color: "from-violet-600 to-purple-500" },
  "Procedimentos Técnicos": { label: "Procedimentos", icon: Zap, color: "from-orange-600 to-red-500" },
  "Problemas de Impressora": { label: "Impressora", icon: Printer, color: "from-slate-600 to-gray-500" },
  "Erros e Casos Reais": { label: "Casos Reais", icon: Star, color: "from-rose-600 to-pink-500" },
  "Reparo de Placa-Mãe": { label: "Placa-Mãe", icon: Cpu, color: "from-emerald-600 to-teal-500" },
  "Redes": { label: "Redes", icon: Wifi, color: "from-sky-600 to-blue-500" },
  "Segurança": { label: "Segurança", icon: Shield, color: "from-green-600 to-emerald-500" },
  "Periféricos": { label: "Periféricos", icon: HardDrive, color: "from-zinc-600 to-slate-500" },
  "Plataformas": { label: "Plataformas", icon: TrendingUp, color: "from-emerald-600 to-teal-500" },
};
const DEFAULT_CAT = { label: "Outros", icon: Wrench, color: "from-gray-600 to-slate-500" };

function getCat(cat: string) {
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (cat.includes(key) || key.includes(cat)) return val;
  }
  return DEFAULT_CAT;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

type ContentItem = {
  type: "blog" | "problema" | "servico";
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  category: string;
  image: string; // now unique per item
  readTime?: string;
  date?: string;
  gravidade?: string;
};

const SERVICO_PAGES: ContentItem[] = [
  { type: "servico", slug: "formatacao", path: "/servicos/formatacao-computador", title: "Formatação de Computador", excerpt: "Formatação profissional com backup, instalação de drivers e programas essenciais.", category: "Serviços", image: getUniqueImage("svc-formatacao") },
  { type: "servico", slug: "remocao-virus", path: "/servicos/remocao-virus", title: "Remoção de Vírus e Malware", excerpt: "Limpeza completa de vírus, trojans, ransomware e adware com ferramentas profissionais.", category: "Serviços", image: getUniqueImage("svc-remocao-virus") },
  { type: "servico", slug: "upgrade-ssd", path: "/servicos/upgrade-ssd-memoria", title: "Upgrade de SSD e Memória RAM", excerpt: "Deixe seu PC até 10x mais rápido com SSD NVMe e mais memória RAM.", category: "Serviços", image: getUniqueImage("svc-upgrade-ssd") },
  { type: "servico", slug: "conserto-pc", path: "/servicos/conserto-pc-notebook", title: "Conserto de PC e Notebook", excerpt: "Reparo profissional de hardware e software para computadores e notebooks.", category: "Serviços", image: getUniqueImage("svc-conserto-pc") },
  { type: "servico", slug: "redes-wifi", path: "/servicos/redes-wifi", title: "Redes e Wi-Fi", excerpt: "Instalação, configuração e otimização de redes domésticas e empresariais.", category: "Serviços", image: getUniqueImage("svc-redes-wifi") },
  { type: "servico", slug: "conserto-placa", path: "/servicos/conserto-placa", title: "Conserto de Placa Eletrônica", excerpt: "Reparo de placa-mãe, GPU e componentes com microsoldagem profissional.", category: "Serviços", image: getUniqueImage("svc-conserto-placa") },
  { type: "servico", slug: "manutencao-tv", path: "/servicos/manutencao-tv", title: "Manutenção de TV", excerpt: "Reparo de TV LED, LCD, Smart TV e OLED com diagnóstico profissional.", category: "Serviços", image: getUniqueImage("svc-manutencao-tv") },
  { type: "servico", slug: "cftv", path: "/cftv", title: "CFTV — Câmeras de Segurança", excerpt: "Instalação e manutenção de sistemas de câmeras de segurança.", category: "Serviços", image: getUniqueImage("svc-cftv") },
  { type: "servico", slug: "montagem-pc", path: "/servicos/montagem-pc", title: "Montagem de PC", excerpt: "Montagem personalizada de computadores para jogos, trabalho e estudo.", category: "Serviços", image: getUniqueImage("svc-montagem-pc") },
  { type: "servico", slug: "backup", path: "/servicos/backup-recuperacao", title: "Backup e Recuperação de Dados", excerpt: "Recuperação de arquivos perdidos e backup profissional em nuvem ou HD externo.", category: "Serviços", image: getUniqueImage("svc-backup") },
  { type: "servico", slug: "procedimentos", path: "/procedimentos-placa", title: "Procedimentos Técnicos em Placa", excerpt: "Reflow, Reballing, Troca de Chip BGA, Microsoldagem e Recapacitação.", category: "Serviços", image: getUniqueImage("svc-procedimentos") },
  { type: "servico", slug: "coleta", path: "/coleta-e-entrega", title: "Coleta e Entrega", excerpt: "Coleta do equipamento na sua casa e entrega após o reparo.", category: "Serviços", image: getUniqueImage("svc-coleta") },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 12, 15, 20, 30];
const DEFAULT_ITEMS_PER_PAGE = 12;

// ─── Animated Counter Hook ───
function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { value, ref };
}

const StatCard = ({ icon: Icon, label, targetValue, color }: { icon: typeof Cpu; label: string; targetValue: number; color: string }) => {
  const { value, ref } = useAnimatedCounter(targetValue);
  return (
    <div ref={ref} className="glass-card gradient-border rounded-xl p-4 text-center hover-lift group cursor-default">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-foreground tabular-nums count-bounce">{value}+</p>
      <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
    </div>
  );
};

// ─── Pagination component ───
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) => {
  const pages = useMemo(() => {
    const items: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (currentPage > 3) items.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) items.push(i);
      if (currentPage < totalPages - 2) items.push("...");
      items.push(totalPages);
    }
    return items;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-1 mt-10 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Primeira página"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-300 btn-feedback ${
              currentPage === p
                ? "bg-accent text-accent-foreground shadow-[var(--shadow-accent)] scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Próxima página"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Última página"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

// ─── The component ───
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"todos" | "artigos" | "problemas" | "servicos">("todos");
  const [activeCat, setActiveCat] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_ITEMS_PER_PAGE;
    const stored = localStorage.getItem("blog_items_per_page");
    return stored ? Number(stored) : DEFAULT_ITEMS_PER_PAGE;
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = "Explorar Conteúdo — Blog, Serviços, Problemas e Soluções | Técnico Curitiba";
    trackPageView("/blog", "Blog — Explorar Conteúdo");
  }, []);

  // Back to top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build content with UNIQUE images per item
  const allContent = useMemo<ContentItem[]>(() => {
    const blogItems: ContentItem[] = blogPosts.map((p) => ({
      type: "blog" as const,
      slug: p.slug,
      path: `/blog/${p.slug}`,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      image: getUniqueImage(`blog-${p.slug}`),
      readTime: p.readTime,
      date: p.date,
    }));

    const problemaItems: ContentItem[] = problemaPagesData.map((p) => ({
      type: "problema" as const,
      slug: p.slug,
      path: p.slug.startsWith("reflow-") || p.slug.startsWith("reballing-") || p.slug.startsWith("troca-chip-") || p.slug.startsWith("microsoldagem-") || p.slug.startsWith("recapacitacao-")
        ? `/procedimentos/${p.slug}` : `/problemas/${p.slug}`,
      title: p.h1,
      excerpt: p.intro.slice(0, 180).replace(/\*\*/g, "").replace(/\n/g, " ").trim() + "…",
      category: p.categoria,
      image: getUniqueImage(`prob-${p.slug}`),
      gravidade: p.sintomas[0]?.gravidade,
    }));

    return [...blogItems, ...problemaItems, ...SERVICO_PAGES];
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allContent.forEach((c) => cats.add(c.category));
    return ["Todos", ...Array.from(cats).sort()];
  }, [allContent]);

  const filtered = useMemo(() => {
    let items = allContent;
    if (activeTab === "artigos") items = items.filter((c) => c.type === "blog");
    else if (activeTab === "problemas") items = items.filter((c) => c.type === "problema");
    else if (activeTab === "servicos") items = items.filter((c) => c.type === "servico");
    if (activeCat !== "Todos") items = items.filter((c) => c.category === activeCat);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      items = items.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [allContent, activeTab, activeCat, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    localStorage.setItem("blog_items_per_page", String(value));
  }, []);

  const featured = useMemo(() => pickRandom(
    allContent.filter((c) => c.type === "problema" && c.excerpt.length > 100),
    3
  ), [allContent]);

  const editorPicks = useMemo(() => pickRandom(
    allContent.filter((c) => c.type === "blog"),
    4
  ), [allContent]);

  const stats = useMemo(() => ({
    artigos: allContent.filter((c) => c.type === "blog").length,
    problemas: allContent.filter((c) => c.type === "problema").length,
    servicos: allContent.filter((c) => c.type === "servico").length,
    total: allContent.length,
  }), [allContent]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setActiveCat("Todos");
    setActiveTab("todos");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Smooth scroll to grid
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTabChange = useCallback((tab: typeof activeTab) => {
    setActiveTab(tab);
    setActiveCat("Todos");
    setCurrentPage(1);
  }, []);

  const handleCatChange = useCallback((cat: string) => {
    setActiveCat(cat);
    setCurrentPage(1);
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const hasActiveFilters = searchTerm.trim() || activeCat !== "Todos" || activeTab !== "todos";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Explorar Conteúdo — Blog, Serviços e Soluções | Técnico Curitiba"
        description="Explore todos os artigos, guias de problemas, serviços e soluções técnicas. Mais de 200 páginas de conteúdo especializado em informática."
        path="/blog"
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }]}
      />
      <JsonLdSchema />
      <Header />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={30} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-[80px] animate-float" />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

          <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-28 px-4">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white/90 mb-6 border border-white/15 shimmer">
                  <Sparkles className="h-4 w-4 text-accent animate-bounce-subtle" />
                  <span>{stats.total}+ conteúdos técnicos</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-5">
                  <span className="block" style={{ animation: 'heroFadeUp 0.6s ease-out both' }}>Explore Todo o</span>
                  <span className="block gradient-text-animated text-5xl md:text-7xl lg:text-8xl" style={{ animation: 'heroFadeUp 0.6s ease-out 0.15s both' }}>Conhecimento</span>
                </h1>
                <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed" style={{ animation: 'heroFadeUp 0.7s ease-out 0.3s both' }}>
                  Artigos, guias de problemas, procedimentos técnicos e serviços especializados — tudo num só lugar.
                </p>
                <div className="glow-separator max-w-[200px] mx-auto mt-6" style={{ animation: 'heroFadeIn 1s ease-out 0.5s both' }} />
              </div>
            </AnimatedSection>

            {/* Search */}
            <AnimatedSection delay={200}>
              <div className={`max-w-xl mx-auto relative mb-12 transition-all duration-500 ${searchFocused ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 blur-md transition-opacity duration-500 ${searchFocused ? 'opacity-100' : 'opacity-0'}`} />
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 pointer-events-none ${searchFocused ? 'text-accent' : 'text-white/40'}`} />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Buscar conteúdo — ex: notebook não liga, formatação, vírus..."
                    className="pl-12 pr-10 py-6 text-base bg-white/10 backdrop-blur-xl border-white/15 text-white placeholder:text-white/35 focus:bg-white/15 focus:border-accent/50 rounded-xl shadow-lg"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={350}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <StatCard icon={BookOpen} label="Artigos" targetValue={stats.artigos} color="from-blue-500 to-cyan-500" />
                <StatCard icon={Wrench} label="Problemas" targetValue={stats.problemas} color="from-orange-500 to-amber-500" />
                <StatCard icon={TrendingUp} label="Serviços" targetValue={stats.servicos} color="from-green-500 to-emerald-500" />
                <StatCard icon={Layers} label="Total" targetValue={stats.total} color="from-accent to-orange-600" />
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* ═══════════ FEATURED HIGHLIGHTS ═══════════ */}
        <section className="py-14 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[100px]" />
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
                    <Flame className="h-5 w-5 text-accent" />
                  </span>
                  Destaques do Dia
                </h2>
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Atualiza a cada visita</span>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((item, i) => {
                const cat = getCat(item.category);
                return (
                  <AnimatedSection key={item.slug} delay={120 * i}>
                    <Link to={item.path} className="group block h-full">
                      <div className="relative rounded-2xl overflow-hidden h-full gradient-border hover-glow-ring hover-lift bg-card">
                        <div className="relative h-52 overflow-hidden">
                          <img src={item.image + "&w=800&h=400"} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-[800ms] ease-out" loading="lazy" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-50 mix-blend-multiply`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1.5 bg-white/15 backdrop-blur-xl text-white text-xs font-semibold rounded-full border border-white/20 shadow-lg">{cat.label}</span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-accent/80 text-white text-[10px] font-bold rounded-md shadow-md">DESTAQUE</span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">{item.excerpt}</p>
                          <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            <Eye className="h-4 w-4" /> Ler agora <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ EDITOR'S PICKS ═══════════ */}
        <section className="py-8 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" /> Escolhas do Editor
              </h3>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {editorPicks.map((item, i) => (
                <AnimatedSection key={item.slug} delay={80 * i}>
                  <Link to={item.path} className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image + "&w=120&h=120"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.readTime}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TABS + FILTERS (sticky) ═══════════ */}
        <section ref={gridRef} className="py-6 bg-background border-b border-border sticky top-0 z-30 backdrop-blur-xl bg-background/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {([
                { key: "todos", label: "Tudo", count: allContent.length, icon: Layers },
                { key: "artigos", label: "Artigos", count: stats.artigos, icon: BookOpen },
                { key: "problemas", label: "Problemas & Soluções", count: stats.problemas, icon: Wrench },
                { key: "servicos", label: "Serviços", count: stats.servicos, icon: TrendingUp },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 btn-feedback ${
                    activeTab === tab.key
                      ? "bg-accent text-accent-foreground shadow-[var(--shadow-accent)] scale-[1.02]"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                  <span className={`ml-0.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20" : "bg-foreground/5"}`}>{tab.count}</span>
                </button>
              ))}

              {hasActiveFilters && (
                <button onClick={clearFilters} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-destructive hover:text-destructive/80 rounded-full bg-destructive/10 hover:bg-destructive/15 transition-all">
                  <X className="h-3 w-3" /> Limpar filtros
                </button>
              )}
            </div>

            {activeTab !== "servicos" && (
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                <Filter className="h-3.5 w-3.5 text-muted-foreground self-center mr-1 flex-shrink-0" />
                {categories
                  .filter((c) => {
                    if (activeTab === "artigos") return ["Todos", "Manutenção", "Segurança", "CFTV", "Windows 11", "Office 365", "Hardware", "Dicas", "Redes", "Atendimento"].includes(c);
                    return true;
                  })
                  .slice(0, 20)
                  .map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCatChange(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap btn-feedback ${
                        activeCat === cat
                          ? "bg-accent/15 text-accent border border-accent/30 shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ CONTENT GRID + PAGINATION ═══════════ */}
        <section className="py-10 bg-background relative">
          <div className="container mx-auto px-4">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                  <Search className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <p className="text-muted-foreground text-lg mb-1">Nenhum conteúdo encontrado</p>
                <p className="text-muted-foreground/60 text-sm mb-5">Tente outro termo ou limpe os filtros</p>
                <Button variant="outline" onClick={clearFilters} className="gap-2 rounded-full">
                  <X className="h-3.5 w-3.5" /> Limpar filtros
                </Button>
              </div>
            ) : (
              <>
                {/* Results bar */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filtered.length}</span> resultado{filtered.length !== 1 ? "s" : ""}
                    {totalPages > 1 && (
                      <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                        Página {currentPage} de {totalPages}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label htmlFor="perPage" className="text-xs text-muted-foreground whitespace-nowrap">Exibir:</label>
                      <select
                        id="perPage"
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="text-xs bg-muted border border-border rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all cursor-pointer"
                      >
                        {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                          <option key={n} value={n}>{n} por página</option>
                        ))}
                      </select>
                    </div>
                    {totalPages > 1 && (
                      <span className="text-xs text-muted-foreground">
                        {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} de {filtered.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {displayed.map((item, i) => {
                    const cat = getCat(item.category);
                    const Icon = cat.icon;
                    const typeBadge = item.type === "blog" ? "Artigo" : item.type === "servico" ? "Serviço" : "Solução";
                    const typeBadgeColor = item.type === "blog"
                      ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      : item.type === "servico"
                      ? "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20"
                      : "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20";

                    return (
                      <div
                        key={`${item.type}-${item.slug}-${i}`}
                        className="stagger-item"
                        style={{ animationDelay: `${Math.min(60 * (i % 12), 700)}ms` }}
                      >
                        <Link to={item.path} className="group block h-full">
                          <article className="relative rounded-xl overflow-hidden h-full border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 bg-card hover-streak">
                            <div className="relative h-36 overflow-hidden">
                              <img
                                src={item.image + "&w=500&h=280"}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-35 mix-blend-multiply`} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                              <div className="absolute top-2 left-2 flex gap-1.5">
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${typeBadgeColor} backdrop-blur-sm`}>{typeBadge}</span>
                              </div>
                              <div className="absolute top-2 right-2">
                                <div className="w-7 h-7 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                  <Icon className="h-3.5 w-3.5 text-white/80" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 left-2 right-2">
                                <span className="text-[10px] text-white/70 font-medium bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">{item.category}</span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-sm text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">{item.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{item.excerpt}</p>
                              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  {item.readTime && <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {item.readTime}</span>}
                                  {item.date && <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {new Date(item.date).toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })}</span>}
                                  {item.gravidade && (
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                      item.gravidade === "Complexo" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                      item.gravidade === "Médio" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    }`}>{item.gravidade}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-1">
                                  <span className="text-[10px] font-semibold">Ver</span>
                                  <ArrowRight className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

                {/* Page info below pagination */}
                {totalPages > 1 && (
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Mostrando {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} de {filtered.length} conteúdos
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 premium-gradient opacity-95" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[120px] animate-breathe" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white/80 mb-5 border border-white/10">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Atendimento especializado
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Não encontrou o que procura?</h2>
                <p className="text-white/60 mb-8 text-lg">Fale com um técnico especializado — atendimento em Curitiba e região metropolitana.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://wa.me/5541997452053?text=Olá! Preciso de ajuda técnica." target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white rounded-full px-8 py-6 text-base shadow-[var(--shadow-whatsapp)] hover-glow-cta cta-pulse">WhatsApp</Button>
                  </a>
                  <Link to="/contato">
                    <Button variant="outline" className="gap-2 rounded-full px-8 py-6 text-base border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 hover-glow-cta font-semibold backdrop-blur-sm">
                      Contato <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 right-5 z-40 w-11 h-11 rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-accent)] flex items-center justify-center transition-all duration-300 hover:scale-110 btn-feedback ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Blog;
