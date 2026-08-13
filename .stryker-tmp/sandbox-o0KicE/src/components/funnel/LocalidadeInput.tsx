// @ts-nocheck
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
    const cepId = useId();
    const [manual, setManual] = useState(false);
    const [cep, setCep] = useState("");
    const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "ok" | "erro">("idle");

    const handleCep = async (raw: string) => {
      const next = formatCep(raw);
      setCep(next);
      if (!isValidCep(next)) {
        setCepStatus("idle");
        return;
      }
      setCepStatus("loading");
      const found = await lookupCep(next);
      if (!found) {
        setCepStatus("erro");
        return;
      }
      setCepStatus("ok");
      onChange(cepToLocalidade(found));
    };

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
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (!v) return;
            const [primeiro, segundo] = v.split(",").map((p) => p.trim());
            // Persiste a escolha do visitante: vale mais do que qualquer
            // inferência automática e alimenta a mensagem do WhatsApp.
            setGeoFromUser(
              segundo
                ? { city: segundo, neighborhood: primeiro }
                : { city: primeiro },
            );
          }}
          placeholder={placeholder ?? "Ex.: Batel, Curitiba"}
          aria-describedby={ariaDescribedBy}
          className="min-h-11 text-base"
        />
        <datalist id={listId}>
          {LOCALIDADES.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>

        <div className="mt-2">
          <label htmlFor={cepId} className="text-xs font-medium text-muted-foreground">
            Prefere pelo CEP? (opcional)
          </label>
          <Input
            id={cepId}
            value={cep}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            onChange={(e) => void handleCep(e.target.value)}
            placeholder="00000-000"
            className="mt-1 min-h-11 text-base"
          />
          {cepStatus === "loading" && (
            <p className="mt-1 text-xs text-muted-foreground">Consultando CEP…</p>
          )}
          {cepStatus === "ok" && (
            <p className="mt-1 text-xs text-primary">Bairro e cidade preenchidos pelo CEP.</p>
          )}
          {cepStatus === "erro" && (
            <p className="mt-1 text-xs text-muted-foreground">
              CEP não encontrado. Você pode digitar o bairro e a cidade acima.
            </p>
          )}
        </div>


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
