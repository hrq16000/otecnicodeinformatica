/** Limiares de similaridade configuráveis por cluster (Onda 31). */

export type Cluster = "servico" | "problema" | "bairro";

export type Limiar = { externo: number; interno: number };

export const CLUSTERS: Array<{ id: Cluster; rotulo: string; dica: string }> = [
  { id: "servico", rotulo: "Serviço", dica: "Páginas de /servicos — vocabulário técnico se repete mais, tolerância menor." },
  { id: "problema", rotulo: "Problema", dica: "Páginas de /problemas — sintoma precisa ser único." },
  { id: "bairro", rotulo: "Bairro/cidade", dica: "Conteúdo local — contexto geográfico deve variar bastante." },
];

export const PADRAO: Record<Cluster, Limiar> = {
  servico: { externo: 0.45, interno: 0.35 },
  problema: { externo: 0.4, interno: 0.3 },
  bairro: { externo: 0.35, interno: 0.3 },
};

const CHAVE = "admin:limiares-similaridade";

export function lerLimiares(): Record<Cluster, Limiar> {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? "null") as Record<Cluster, Limiar> | null;
    return salvo ? { ...PADRAO, ...salvo } : { ...PADRAO };
  } catch {
    return { ...PADRAO };
  }
}

export function salvarLimiares(valor: Record<Cluster, Limiar>): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(valor));
  } catch {
    /* modo privado: limiares valem só na sessão */
  }
}

/** Justificativa legível de um bloqueio de similaridade. */
export function justificar(tipo: "externo" | "interno", score: number, limite: number, alvo: string): string {
  const excedente = Math.round((score - limite) * 1000) / 10;
  return tipo === "externo"
    ? `Score ${score.toFixed(3)} contra ${alvo} — ${excedente}pp acima do limite ${limite.toFixed(2)}. Reescreva com dados próprios do local (ruas, prédios, perfil de chamados) em vez de repetir a descrição já publicada.`
    : `Score ${score.toFixed(3)} entre ${alvo} — ${excedente}pp acima do limite ${limite.toFixed(2)}. Os blocos estão contando a mesma coisa: separe contexto (onde), sintomas (o que quebra), atendimento (como resolvemos) e casos (o que aconteceu).`;
}
