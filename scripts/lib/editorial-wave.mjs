/**
 * ============================================================================
 * PRIMEIRA ONDA EDITORIAL INDEXÁVEL — Rodada 4H
 * ============================================================================
 * Fonte única (build/gates) dos artigos editoriais liberados para indexação.
 * Espelha `APPROVED_EDITORIAL_CONTENT` em `src/lib/blogEditorialRegistry.ts`
 * (paridade validada por `scripts/check-editorial-governance.mjs`).
 *
 * Regras da onda:
 *   • Só entra artigo com revisão técnica concluída (blogEditorialSources.ts),
 *     imagem própria com origem declarada e aprovação editorial datada.
 *   • Todo artigo aqui é indexável, entra no sitemap-editorial.xml e recebe
 *     HTML estático próprio com BlogPosting + BreadcrumbList.
 *   • Qualquer artigo fora desta lista permanece noindex, follow e fora de
 *     todos os sitemaps (fail-closed).
 */

export const EDITORIAL_WAVE = [
  {
    slug: "quando-trocar-hd-por-ssd",
    approvedAt: "2026-08-06",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória",
    apoio: "/quando-nao-compensa",
    apoioLabel: "Quando o reparo não compensa",
    cover: "/blog/quando-trocar-hd-por-ssd.jpg",
  },
  {
    slug: "como-saber-se-pc-tem-virus-malware",
    approvedAt: "2026-08-06",
    pilar: "/servicos/remocao-de-virus",
    pilarLabel: "Remoção de vírus e malware",
    apoio: "/servicos/formatacao",
    apoioLabel: "Formatação e instalação do sistema",
    cover: "/blog/como-saber-se-pc-tem-virus-malware.jpg",
  },
  {
    slug: "backup-como-proteger-seus-arquivos",
    approvedAt: "2026-08-06",
    pilar: "/servicos/recuperacao-de-dados",
    pilarLabel: "Recuperação de dados",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/backup-como-proteger-seus-arquivos.jpg",
  },
  {
    slug: "como-melhorar-sinal-wifi-em-casa",
    approvedAt: "2026-08-06",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Redes e Wi-Fi",
    apoio: "/atendimento-domicilio",
    apoioLabel: "Atendimento técnico no endereço",
    cover: "/blog/como-melhorar-sinal-wifi-em-casa.jpg",
  },
  {
    slug: "notebook-superaquecendo-o-que-fazer",
    approvedAt: "2026-08-06",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/atendimento-domicilio",
    apoioLabel: "Atendimento técnico no endereço",
    cover: "/blog/notebook-superaquecendo-o-que-fazer.jpg",
  },
  // ── Rodada 3O — onda educacional empresarial (2 conteúdos, 0 rotas novas).
  {
    slug: "organizacao-de-ti-para-pequenos-escritorios",
    approvedAt: "2026-08-06",
    pilar: "/empresa-de-ti-curitiba",
    pilarLabel: "Empresa de TI em Curitiba",
    apoio: "/servicos/suporte-tecnico-empresarial",
    apoioLabel: "Suporte técnico empresarial",
    cover: "/blog/organizacao-de-ti-para-pequenos-escritorios.jpg",
  },
  {
    slug: "como-escolher-uma-workstation",
    approvedAt: "2026-08-06",
    pilar: "/servicos/montagem-de-pc",
    pilarLabel: "Montagem de PC sob medida",
    apoio: "/servicos/upgrade-ssd-ram",
    apoioLabel: "Upgrade de SSD e memória",
    cover: "/blog/como-escolher-uma-workstation.jpg",
  },
  // ── Rodada 4X — instalação limpa do Windows 11 (capa fotográfica licenciada).
  {
    slug: "como-instalar-windows-11-do-zero",
    approvedAt: "2026-08-12",
    pilar: "/servicos/formatacao",
    pilarLabel: "Formatação e instalação do sistema",
    apoio: "/servicos/recuperacao-de-dados",
    apoioLabel: "Recuperação de dados",
    cover: "/blog/como-instalar-windows-11-do-zero.jpg",
  },
  // ── Rodada 4Y — dois guias herdados reformados (0 rotas novas, capas reais).
  {
    slug: "como-resolver-tela-azul-windows",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-computador",
    pilarLabel: "Manutenção de computador",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/como-resolver-tela-azul-windows.jpg",
  },
  {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/quando-nao-compensa",
    apoioLabel: "Quando o reparo não compensa",
    cover: "/blog/como-trocar-tela-notebook-passo-a-passo.jpg",
  },
  // ── Rodada 4Z — dois guias herdados de maior volume, mais consolidação
  // de 4 duplicatas por 301 (ver src/lib/redirectMatrix.ts).
  {
    slug: "notebook-nao-liga-o-que-fazer",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/notebook-nao-liga-o-que-fazer.jpg",
  },
  {
    slug: "computador-lento-causas-solucoes",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-computador",
    pilarLabel: "Manutenção de computador",
    apoio: "/servicos/upgrade-ssd-ram",
    apoioLabel: "Upgrade de SSD e memória",
    cover: "/blog/computador-lento-causas-solucoes.jpg",
  },
  // ── Rodada 5A — dois procedimentos técnicos herdados reescritos do zero
  // (texto-modelo e marca de origem removidos), com capas fotográficas reais.
  {
    slug: "como-recuperar-dados-hd-com-defeito",
    approvedAt: "2026-08-12",
    pilar: "/servicos/recuperacao-de-dados",
    pilarLabel: "Recuperação de dados",
    apoio: "/diagnostico-tecnico",
    apoioLabel: "Como funciona o diagnóstico técnico",
    cover: "/blog/como-recuperar-dados-hd-com-defeito.jpg",
  },
  {
    slug: "como-fazer-upgrade-ssd-nvme",
    approvedAt: "2026-08-12",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória",
    apoio: "/servicos/formatacao",
    apoioLabel: "Formatação e instalação do sistema",
    cover: "/blog/como-fazer-upgrade-ssd-nvme.jpg",
  },
  // ── Rodada 5B — cluster de redes Wi-Fi doméstica.
  {
    slug: "como-configurar-roteador-wifi-iniciantes",
    approvedAt: "2026-08-12",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Configuração de redes e Wi-Fi",
    apoio: "/blog/como-melhorar-sinal-wifi-em-casa",
    apoioLabel: "Como melhorar o sinal de Wi-Fi em casa",
    cover: "/blog/como-configurar-roteador-wifi-iniciantes.jpg",
  },
  {
    slug: "como-saber-quem-esta-usando-meu-wifi",
    approvedAt: "2026-08-12",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Configuração de redes e Wi-Fi",
    apoio: "/blog/como-configurar-roteador-wifi-iniciantes",
    apoioLabel: "Como configurar um roteador do zero",
    cover: "/blog/como-saber-quem-esta-usando-meu-wifi.jpg",
  },
  // ── Rodada 5C — cluster de segurança (antivírus e golpes on-line).
  {
    slug: "como-escolher-um-bom-antivirus",
    approvedAt: "2026-08-12",
    pilar: "/servicos/remocao-de-virus",
    pilarLabel: "Remoção de vírus e malware",
    apoio: "/servicos/formatacao",
    apoioLabel: "Formatação e instalação do sistema",
    cover: "/blog/como-escolher-um-bom-antivirus.jpg",
  },
  {
    slug: "como-proteger-computador-golpes-internet",
    approvedAt: "2026-08-12",
    pilar: "/servicos/remocao-de-virus",
    pilarLabel: "Remoção de vírus e malware",
    apoio: "/servicos/recuperacao-de-dados",
    apoioLabel: "Recuperação de dados",
    cover: "/blog/como-proteger-computador-golpes-internet.jpg",
  },
  // ── Rodada 5D — manutenção física de notebook (limpeza interna e pasta térmica).
  {
    slug: "como-limpar-notebook-por-dentro",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/blog/notebook-superaquecendo-o-que-fazer",
    apoioLabel: "Notebook superaquecendo: o que fazer",
    cover: "/blog/como-limpar-notebook-por-dentro.jpg",
  },
  {
    slug: "como-trocar-pasta-termica-notebook",
    approvedAt: "2026-08-12",
    pilar: "/servicos/manutencao-de-notebook",
    pilarLabel: "Manutenção de notebook em Curitiba",
    apoio: "/blog/como-limpar-notebook-por-dentro",
    apoioLabel: "Limpeza interna de notebook",
    cover: "/blog/como-trocar-pasta-termica-notebook.jpg",
  },
  // ── Rodada 5E — armazenamento (clonagem e segundo disco).
  {
    slug: "como-clonar-hd-para-ssd",
    approvedAt: "2026-08-12",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória em Curitiba",
    apoio: "/blog/como-fazer-upgrade-ssd-nvme",
    apoioLabel: "Upgrade para SSD NVMe",
    cover: "/blog/como-clonar-hd-para-ssd.jpg",
  },
  {
    slug: "como-instalar-segundo-ssd-notebook",
    approvedAt: "2026-08-12",
    pilar: "/servicos/upgrade-ssd-ram",
    pilarLabel: "Upgrade de SSD e memória em Curitiba",
    apoio: "/blog/como-clonar-hd-para-ssd",
    apoioLabel: "Clonar HD para SSD",
    cover: "/blog/como-instalar-segundo-ssd-notebook.jpg",
  },
  // ── Rodada 5F — continuidade empresarial (ransomware e backup em nuvem).
  {
    slug: "ransomware-como-proteger-empresa",
    approvedAt: "2026-08-12",
    pilar: "/servicos/backup-para-empresas",
    pilarLabel: "Backup para empresas em Curitiba",
    apoio: "/blog/backup-nuvem-empresas-qual-escolher",
    apoioLabel: "Backup em nuvem para empresas",
    cover: "/blog/ransomware-como-proteger-empresa.jpg",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    approvedAt: "2026-08-12",
    pilar: "/servicos/backup-para-empresas",
    pilarLabel: "Backup para empresas em Curitiba",
    apoio: "/blog/ransomware-como-proteger-empresa",
    apoioLabel: "Ransomware em pequenas empresas",
    cover: "/blog/backup-nuvem-empresas-qual-escolher.jpg",
  },
  // ── Rodada 5G — impressora em rede e Smart TV no Wi-Fi.
  {
    slug: "como-instalar-impressora-windows-passo-a-passo",
    approvedAt: "2026-08-12",
    pilar: "/servicos/redes-e-wifi",
    pilarLabel: "Redes e Wi-Fi em Curitiba",
    apoio: "/blog/como-configurar-roteador-wifi-iniciantes",
    apoioLabel: "Configurar roteador Wi-Fi do zero",
    cover: "/blog/como-instalar-impressora-windows-passo-a-passo.jpg",
  },
  {
    slug: "como-conectar-wifi-tv-nao-conecta",
    approvedAt: "2026-08-12",
    pilar: "/servicos/conserto-tv",
    pilarLabel: "Conserto de TV em Curitiba",
    apoio: "/blog/como-instalar-impressora-windows-passo-a-passo",
    apoioLabel: "Impressora em rede: por que ela some",
    cover: "/blog/como-conectar-wifi-tv-nao-conecta.jpg",
  },
  // ── Rodada 5H — energia e placa-mãe (diagnóstico de bancada).
  {
    slug: "como-testar-fonte-de-alimentacao-pc",
    approvedAt: "2026-08-12",
    pilar: "/servicos/computador-nao-liga",
    pilarLabel: "Computador não liga em Curitiba",
    apoio: "/blog/como-diagnosticar-placa-mae-defeituosa",
    apoioLabel: "Placa-mãe defeituosa: como confirmar",
    cover: "/blog/como-testar-fonte-de-alimentacao-pc.jpg",
  },
  {
    slug: "como-diagnosticar-placa-mae-defeituosa",
    approvedAt: "2026-08-12",
    pilar: "/servicos/conserto-placa",
    pilarLabel: "Conserto de placa em Curitiba",
    apoio: "/blog/como-testar-fonte-de-alimentacao-pc",
    apoioLabel: "Testar a fonte do PC sem trocar peça boa",
    cover: "/blog/como-diagnosticar-placa-mae-defeituosa.jpg",
  },
  // ── Rodada 5I — desempenho do Windows e remoção de malware.
  {
    slug: "windows-11-lento-como-resolver",
    approvedAt: "2026-08-12",
    pilar: "/servicos/formatacao",
    pilarLabel: "Formatação e otimização em Curitiba",
    apoio: "/blog/como-remover-virus-windows-iniciantes",
    apoioLabel: "Remover vírus e adware sem quebrar o sistema",
    cover: "/blog/windows-11-lento-como-resolver.jpg",
  },
  {
    slug: "como-remover-virus-windows-iniciantes",
    approvedAt: "2026-08-12",
    pilar: "/servicos/remocao-de-virus",
    pilarLabel: "Remoção de vírus em Curitiba",
    apoio: "/blog/windows-11-lento-como-resolver",
    apoioLabel: "Windows 11 lento: achar a causa real",
    cover: "/blog/como-remover-virus-windows-iniciantes.jpg",
  },
  // ── Rodada 8E — cluster piloto formatação (informacional + comercial).
  {
    slug: "como-formatar-pc-sem-perder-arquivos",
    approvedAt: "2026-08-14",
    pilar: "/servicos/formatacao",
    pilarLabel: "Formatação e instalação do sistema",
    apoio: "/blog/quanto-custa-formatar-um-computador",
    apoioLabel: "Quanto custa formatar um computador",
    cover: "/blog/como-formatar-pc-sem-perder-arquivos.jpg",
  },
  {
    slug: "quanto-custa-formatar-um-computador",
    approvedAt: "2026-08-14",
    pilar: "/servicos/formatacao",
    pilarLabel: "Formatação e instalação do sistema",
    apoio: "/blog/como-formatar-pc-sem-perder-arquivos",
    apoioLabel: "Formatar sem perder arquivos: o guia",
    cover: "/blog/quanto-custa-formatar-um-computador.jpg",
  },
];

export const EDITORIAL_WAVE_SLUGS = EDITORIAL_WAVE.map((a) => a.slug);

const BY_SLUG = new Map(EDITORIAL_WAVE.map((a) => [a.slug, a]));

export function getWaveArticle(slug) {
  return BY_SLUG.get(slug);
}

export function isWaveApproved(slug) {
  return BY_SLUG.has(slug);
}
