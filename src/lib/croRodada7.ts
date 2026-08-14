/**
 * RODADA 7 — INFRAESTRUTURA DE CRO CONTROLADO (sem experimento ativo)
 * -------------------------------------------------------------------
 * Este módulo prepara o terreno para testes de conversão, mas NÃO liga
 * nenhum experimento. Regras inegociáveis:
 *
 *  1. FAIL-CLOSED: todo experimento nasce `ativo: false`. Sem toggle
 *     explícito, o visitante sempre vê o controle.
 *  2. REGISTRO ANTES DE ATIVAR: um experimento só pode ficar ativo se
 *     estiver 100% instrumentado no funil (`registroFunil` completo).
 *     Falta de registro = experimento cego = proibido.
 *  3. ESCOPO EXPLÍCITO: rota e cidade são declaradas. Sem curinga
 *     silencioso e sem fallback geográfico para Curitiba.
 *  4. SOMENTE APRESENTAÇÃO: variação nunca altera preço, prazo, escopo,
 *     garantia ou triagem técnica.
 *  5. DETERMINÍSTICO POR SESSÃO: o mesmo visitante vê sempre a mesma
 *     variação enquanto a sessão existir.
 */

export type EtapaFunil = "page_view" | "cta_click" | "triage_start" | "whatsapp_open" | "lead" | "os";

/** Etapas que precisam estar instrumentadas antes de qualquer ativação. */
export const ETAPAS_OBRIGATORIAS: EtapaFunil[] = [
  "page_view",
  "cta_click",
  "triage_start",
  "whatsapp_open",
  "lead",
];

export type VarianteCro = {
  id: string;
  /** Rótulo humano para o painel. Não é copy de página. */
  rotulo: string;
  /** Peso relativo de distribuição (inteiro positivo). */
  peso: number;
};

export type ExperimentoCro = {
  id: string;
  hipotese: string;
  /** Rotas exatas onde o experimento pode rodar. */
  rotas: string[];
  /** Cidades (slug) permitidas. Vazio = qualquer cidade das rotas. */
  cidades: string[];
  /** Toggle mestre. Sempre nasce falso. */
  ativo: boolean;
  variantes: VarianteCro[];
  /** Etapas do funil já instrumentadas para este experimento. */
  registroFunil: EtapaFunil[];
  /** Sessões mínimas por variação antes de qualquer leitura. */
  amostraMinima: number;
};

/**
 * Registro central. Editar aqui é a única forma de ligar um experimento —
 * não existe toggle em runtime nem em localStorage.
 */
export const EXPERIMENTOS_CRO: ExperimentoCro[] = [
  {
    id: "cro7-cta-servico-curitiba",
    hipotese:
      "Um CTA que nomeia a cidade e a modalidade de atendimento converte mais que o CTA genérico nas rotas serviço × Curitiba.",
    rotas: [
      "/servicos/manutencao-de-notebook/curitiba",
      "/servicos/manutencao-de-computador/curitiba",
      "/servicos/formatacao/curitiba",
    ],
    cidades: ["curitiba"],
    ativo: false,
    variantes: [
      { id: "controle", rotulo: "CTA atual", peso: 1 },
      { id: "cidade-modalidade", rotulo: "CTA com cidade e modalidade", peso: 1 },
    ],
    registroFunil: ["page_view", "cta_click", "triage_start", "whatsapp_open"],
    amostraMinima: 200,
  },
];

export type MotivoBloqueio =
  | "sem_experimento"
  | "toggle_desligado"
  | "rota_fora_do_escopo"
  | "cidade_fora_do_escopo"
  | "registro_funil_incompleto"
  | "variantes_invalidas";

export type DecisaoCro =
  | { habilitado: true; experimento: ExperimentoCro; variante: VarianteCro }
  | { habilitado: false; motivo: MotivoBloqueio; experimentoId?: string };

/** Etapas obrigatórias ainda não instrumentadas. */
export function lacunasDeRegistro(exp: ExperimentoCro): EtapaFunil[] {
  return ETAPAS_OBRIGATORIAS.filter((e) => !exp.registroFunil.includes(e));
}

/** Um experimento só é elegível quando o funil inteiro já registra. */
export function prontoParaAtivar(exp: ExperimentoCro): boolean {
  return lacunasDeRegistro(exp).length === 0 && exp.variantes.length >= 2;
}

/** Hash estável (FNV-1a) → distribuição determinística por sessão. */
function hash(texto: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Escolhe a variação por peso, de forma estável para a mesma sessão. */
export function escolherVariante(exp: ExperimentoCro, sessionId: string): VarianteCro | null {
  const validas = exp.variantes.filter((v) => Number.isInteger(v.peso) && v.peso > 0);
  if (validas.length < 2) return null;
  const total = validas.reduce((acc, v) => acc + v.peso, 0);
  let ponto = hash(`${exp.id}:${sessionId}`) % total;
  for (const v of validas) {
    if (ponto < v.peso) return v;
    ponto -= v.peso;
  }
  return validas[validas.length - 1];
}

/**
 * Decide se há experimento para a rota/cidade e qual variação aplicar.
 * Qualquer dúvida devolve `habilitado: false` — nunca "meio ligado".
 */
export function decidirExperimento(params: {
  path: string;
  cidade?: string | null;
  sessionId: string;
  registro?: ExperimentoCro[];
}): DecisaoCro {
  const registro = params.registro ?? EXPERIMENTOS_CRO;
  const candidato = registro.find((e) => e.rotas.includes(params.path));
  if (!candidato) return { habilitado: false, motivo: "sem_experimento" };
  if (!candidato.ativo) return { habilitado: false, motivo: "toggle_desligado", experimentoId: candidato.id };
  if (candidato.cidades.length > 0) {
    if (!params.cidade || !candidato.cidades.includes(params.cidade)) {
      return { habilitado: false, motivo: "cidade_fora_do_escopo", experimentoId: candidato.id };
    }
  }
  if (!prontoParaAtivar(candidato)) {
    return { habilitado: false, motivo: "registro_funil_incompleto", experimentoId: candidato.id };
  }
  const variante = escolherVariante(candidato, params.sessionId);
  if (!variante) return { habilitado: false, motivo: "variantes_invalidas", experimentoId: candidato.id };
  return { habilitado: true, experimento: candidato, variante };
}

/** Linha de prontidão para o painel administrativo. */
export type ProntidaoCro = {
  id: string;
  ativo: boolean;
  rotas: number;
  cidades: string[];
  lacunas: EtapaFunil[];
  pronto: boolean;
};

export function inventarioProntidao(registro: ExperimentoCro[] = EXPERIMENTOS_CRO): ProntidaoCro[] {
  return registro.map((e) => ({
    id: e.id,
    ativo: e.ativo,
    rotas: e.rotas.length,
    cidades: e.cidades,
    lacunas: lacunasDeRegistro(e),
    pronto: prontoParaAtivar(e),
  }));
}
