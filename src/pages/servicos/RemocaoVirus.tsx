import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

const data: ServicoLandingData = {
  path: "remocao-virus",
  trackingKey: "remocao-virus",
  metaTitle: "Remoção de Vírus e Malware em Curitiba a partir de R$ 99,99 | Técnico em Curitiba",
  metaDescription:
    "Remoção de vírus, malware, adware e ransomware em Curitiba a partir de R$ 99,99. Limpeza completa, proteção configurada e diagnóstico honesto via WhatsApp.",
  serviceName: "Remoção de Vírus e Malware",
  serviceDescription:
    "Remoção completa de vírus, malware, adware e ransomware, com limpeza do sistema, proteção configurada e orientação de prevenção, em Curitiba e região.",
  eyebrow: "Remoção de vírus em Curitiba",
  h1: "Remoção de vírus e malware em Curitiba",
  h1Accent: "sem perder seus dados",
  intro:
    "Pop-ups, propaganda que não para, computador lento ou arquivos bloqueados? Fazemos a limpeza completa de vírus, malware, adware e ransomware, preservando seus arquivos sempre que possível.",
  whatsappMessage: "Olá! Meu computador está com vírus. Pode me ajudar?",
  incluso: [
    { title: "Varredura completa", desc: "Análise profunda do sistema, inicialização e navegadores." },
    { title: "Remoção de ameaças", desc: "Vírus, malware, adware, spyware e sequestradores de navegador." },
    { title: "Limpeza de resíduos", desc: "Remoção de extensões e tarefas maliciosas que voltam sozinhas." },
    { title: "Proteção configurada", desc: "Antivírus e defesas do sistema ajustados corretamente." },
    { title: "Preservação de dados", desc: "Priorizamos manter seus arquivos sempre que possível." },
    { title: "Orientação de prevenção", desc: "Dicas práticas para não ser infectado de novo." },
  ],
  sinais: [
    "Pop-ups e propagandas aparecendo sem parar",
    "Navegador com página inicial ou busca trocadas",
    "Computador muito lento sem motivo aparente",
    "Programas abrindo ou fechando sozinhos",
    "Arquivos com extensão estranha ou bloqueados (ransomware)",
    "Antivírus desativado sem você ter mexido",
    "Cobranças ou logins suspeitos após usar o PC",
  ],
  processo: [
    { step: "1", title: "Diagnóstico", desc: "Você descreve os sintomas pelo WhatsApp e recebe orientação." },
    { step: "2", title: "Análise", desc: "Identificamos o tipo de ameaça e o risco para seus dados." },
    { step: "3", title: "Limpeza", desc: "Removemos as ameaças e reforçamos a proteção do sistema." },
    { step: "4", title: "Entrega", desc: "Máquina limpa, protegida e com orientação de prevenção." },
  ],
  faqs: [
    { question: "Quanto custa remover vírus em Curitiba?", answer: "A remoção começa em R$ 99,99. O valor final pode variar conforme a gravidade da infecção e a necessidade de recuperação de dados." },
    { question: "Vou perder meus arquivos?", answer: "Na maioria dos casos não. Priorizamos a limpeza preservando seus dados. Em casos graves de ransomware, avaliamos as chances de recuperação antes de qualquer ação." },
    { question: "Vocês removem ransomware?", answer: "Fazemos avaliação da situação para informar as chances reais de recuperar arquivos criptografados, sem prometer o que não é possível garantir." },
    { question: "Preciso formatar para remover o vírus?", answer: "Nem sempre. Muitas infecções são resolvidas com limpeza. A formatação só é indicada quando o sistema está muito comprometido — e sempre com seu consentimento." },
    { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com atendimento em domicílio ou coleta e entrega do equipamento." },
  ],
  relacionados: [
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Backup e recuperação", to: "/servicos/backup-recuperacao" },
    { label: "Computador lento", to: "/servicos/computador-lento" },
  ],
  dateModified: "2026-07-09",
};

const RemocaoVirus = () => <ServicoLandingLayout data={data} />;

export default RemocaoVirus;
