import { CURITIBA_BAIRROS_NOMES } from "@/lib/bairrosSelect";
import { DISPOSITIVOS, URGENCIAS, type ContextoTriagem, type UrgenciaChave } from "@/lib/problemasWaTemplates";

/**
 * Triagem rápida (3 campos) que pré-preenche todas as mensagens de WhatsApp
 * da página de sintoma: equipamento, bairro/cidade e urgência.
 * Nada é enviado a servidor: só monta a mensagem do link.
 */
export function TriagemContexto({
  valor,
  onChange,
  titulo = "Deixe a mensagem pronta antes de chamar",
}: {
  valor: ContextoTriagem;
  onChange: (v: ContextoTriagem) => void;
  titulo?: string;
}) {
  return (
    <section
      aria-labelledby="triagem-contexto"
      className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5 animate-fade-in"
    >
      <h2 id="triagem-contexto" className="font-heading text-lg font-bold text-foreground">
        {titulo}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Três toques e todos os botões desta página passam a abrir o WhatsApp com equipamento,
        bairro e urgência já preenchidos — sem você digitar nada.
      </p>

      <fieldset className="mt-4">
        <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Equipamento
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DISPOSITIVOS.map((d) => {
            const ativo = valor.dispositivo === d.chave;
            return (
              <button
                key={d.chave}
                type="button"
                aria-pressed={ativo}
                onClick={() => onChange({ ...valor, dispositivo: ativo ? undefined : d.chave })}
                className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  ativo
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="triagem-bairro"
            className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
          >
            Bairro ou cidade
          </label>
          <input
            id="triagem-bairro"
            list="triagem-bairros"
            value={valor.bairro ?? ""}
            onChange={(e) => onChange({ ...valor, bairro: e.target.value || undefined })}
            placeholder="Ex.: Batel"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <datalist id="triagem-bairros">
            {CURITIBA_BAIRROS_NOMES.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </div>

        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Urgência
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {URGENCIAS.map((u) => {
              const ativo = valor.urgencia === u.chave;
              return (
                <button
                  key={u.chave}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() =>
                    onChange({ ...valor, urgencia: ativo ? undefined : (u.chave as UrgenciaChave) })
                  }
                  className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    ativo
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {u.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </section>
  );
}

export default TriagemContexto;
