/**
 * POLÍTICA DE DESLOCAMENTO — configurável, nunca hardcoded na UI.
 *
 * Regra comercial: até o raio livre não há adicional de deslocamento
 * (conforme a modalidade). Acima disso, cobra-se um valor de referência por
 * quilômetro excedente, sempre informado ANTES da confirmação do chamado.
 *
 * Tudo é lido de env para que o administrador ajuste sem alterar código:
 *   VITE_DESLOCAMENTO_RAIO_KM        (padrão 15)
 *   VITE_DESLOCAMENTO_VALOR_KM       (padrão 2)
 *   VITE_DESLOCAMENTO_BASE           (rótulo textual da base de cálculo)
 *   VITE_DESLOCAMENTO_EXCECOES       (lista separada por vírgula)
 */

import { envList, envNum, envStr } from "@/lib/config/env";

export const deslocamentoConfig = {
  /** Raio, em km, sem adicional de deslocamento. */
  raioLivreKm: envNum("VITE_DESLOCAMENTO_RAIO_KM") ?? 15,
  /** Valor de referência por km excedente, em reais. */
  valorPorKm: envNum("VITE_DESLOCAMENTO_VALOR_KM") ?? 2,
  /** Como a distância é medida (transparência para o cliente). */
  baseCalculo:
    envStr("VITE_DESLOCAMENTO_BASE") ??
    "Distância rodoviária estimada entre a base de atendimento e o endereço informado.",
  /** Exceções configuráveis (ex.: modalidades sem deslocamento). */
  excecoes: envList("VITE_DESLOCAMENTO_EXCECOES").length
    ? envList("VITE_DESLOCAMENTO_EXCECOES")
    : [
        "Atendimento remoto não tem deslocamento.",
        "Coleta e entrega seguem a política própria de logística.",
        "Trechos com pedágio, balsa ou acesso restrito são informados à parte.",
      ],
} as const;

export const formatarBRL = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

export type CustoDeslocamento = {
  kmExcedentes: number;
  valor: number;
  dentroDoRaio: boolean;
};

/** Cálculo puro: nenhuma surpresa depois, o número sai antes do agendamento. */
export function calcularDeslocamento(distanciaKm: number): CustoDeslocamento {
  const km = Number.isFinite(distanciaKm) && distanciaKm > 0 ? distanciaKm : 0;
  const excedente = Math.max(0, km - deslocamentoConfig.raioLivreKm);
  return {
    kmExcedentes: Math.round(excedente * 10) / 10,
    valor: Math.round(excedente * deslocamentoConfig.valorPorKm * 100) / 100,
    dentroDoRaio: excedente === 0,
  };
}
