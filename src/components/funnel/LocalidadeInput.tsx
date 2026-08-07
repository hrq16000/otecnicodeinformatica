import { forwardRef, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { LOCALIDADE_GRUPOS, LOCALIDADES } from "@/lib/bairrosSelect";
import { cepToLocalidade, formatCep, isValidCep, lookupCep } from "@/lib/cepLookup";
import { setGeoFromUser } from "@/lib/geoContext";

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaDescribedBy?: string;
  className?: string;
}

/**
 * Campo de bairro/cidade com autocomplete e seleção manual.
 *
 * A geolocalização é apenas uma sugestão: quando ela falha (IP bloqueado,
 * permissão negada, VPN) o visitante precisa conseguir escolher o local
 * do atendimento — caso contrário a mensagem do WhatsApp sai sem região.
 * Por isso o campo aceita digitação livre (datalist) e oferece um seletor
 * agrupado por Curitiba × Região Metropolitana.
 */
export const LocalidadeInput = forwardRef<HTMLInputElement, Props>(
  ({ id, value, onChange, placeholder, ariaDescribedBy, className }, ref) => {
    const listId = useId();
    const [manual, setManual] = useState(false);

    return (
      <div className={className}>
        <Input
          ref={ref}
          id={id}
          list={listId}
          value={value}
          inputMode="text"
          autoComplete="address-level3"
          enterKeyHint="next"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Ex.: Batel, Curitiba"}
          aria-describedby={ariaDescribedBy}
          className="min-h-11 text-base"
        />
        <datalist id={listId}>
          {LOCALIDADES.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>

        {!manual ? (
          <button
            type="button"
            onClick={() => setManual(true)}
            className="mt-1.5 text-xs font-medium text-primary underline underline-offset-2"
          >
            Não encontrou? Escolher bairro ou cidade na lista
          </button>
        ) : (
          <select
            aria-label="Selecionar bairro ou cidade"
            value={LOCALIDADES.includes(value) ? value : ""}
            onChange={(e) => e.target.value && onChange(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground"
          >
            <option value="">Selecione o bairro ou a cidade…</option>
            {LOCALIDADE_GRUPOS.map((g) => (
              <optgroup key={g.grupo} label={g.grupo}>
                {g.opcoes.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        )}
      </div>
    );
  },
);
LocalidadeInput.displayName = "LocalidadeInput";

export default LocalidadeInput;
