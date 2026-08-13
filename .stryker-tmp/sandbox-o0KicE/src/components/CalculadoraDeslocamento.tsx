// @ts-nocheck
import { useState } from "react";
import { calcularDeslocamento, deslocamentoConfig, formatarBRL } from "@/lib/deslocamentoConfig";
import { MapPin } from "lucide-react";

/**
 * Transparência de deslocamento: o cliente vê o custo estimado ANTES de
 * confirmar o chamado. Valores e raio vêm da configuração, não do código.
 */
export const CalculadoraDeslocamento = () => {
  const [km, setKm] = useState("");
  const distancia = Number(km.replace(",", "."));
  const calculo = calcularDeslocamento(distancia);
  const preenchido = km.trim().length > 0 && Number.isFinite(distancia) && distancia > 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="inline-flex items-center gap-2 font-heading text-lg font-bold text-foreground">
        <MapPin className="h-5 w-5" aria-hidden="true" />
        Custo de deslocamento, antes de fechar
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Até {deslocamentoConfig.raioLivreKm} km não há adicional de deslocamento, conforme a
        modalidade. Acima disso, o valor de referência é{" "}
        {formatarBRL(deslocamentoConfig.valorPorKm)} por quilômetro excedente.
      </p>

      <label className="mt-4 block text-sm font-semibold text-foreground">
        Distância aproximada até você (km)
        <input
          value={km}
          onChange={(e) => setKm(e.target.value)}
          inputMode="decimal"
          placeholder="Ex.: 22"
          className="mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <p className="mt-4 text-sm text-foreground" aria-live="polite">
        {!preenchido
          ? "Informe a distância para ver a estimativa."
          : calculo.dentroDoRaio
            ? `Dentro do raio de ${deslocamentoConfig.raioLivreKm} km: sem adicional de deslocamento.`
            : `${calculo.kmExcedentes} km excedentes → estimativa de ${formatarBRL(calculo.valor)} de deslocamento.`}
      </p>

      <p className="mt-3 text-xs text-muted-foreground">{deslocamentoConfig.baseCalculo}</p>
      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
        {deslocamentoConfig.excecoes.map((e) => (
          <li key={e}>• {e}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Estimativa de referência. O valor exato é confirmado na triagem, junto com diagnóstico,
        mão de obra e eventuais peças.
      </p>
    </div>
  );
};

export default CalculadoraDeslocamento;
