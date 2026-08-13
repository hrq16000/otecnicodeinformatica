// @ts-nocheck
import { PROVAS_BANCADA, provasPublicaveis, temProvasReais } from "@/lib/provasBancada";

const LABEL: Record<string, string> = {
  bancada: "Bancada técnica",
  uniforme: "Identificação do técnico",
  atendimento: "Atendimento",
  processo: "Processo",
};

/**
 * Fotos reais da bancada, do técnico identificado e do atendimento.
 * Fail-closed: sem fotos próprias aprovadas no manifesto, nada é renderizado
 * (nunca publicar banco de imagens ou IA como prova). Nenhum endereço exibido.
 */
export const BancadaRealSection = () => {
  if (!temProvasReais()) return null;
  const fotos = provasPublicaveis(PROVAS_BANCADA);

  return (
    <section className="border-y border-border bg-secondary py-14 md:py-18" aria-labelledby="bancada-real-title">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Prova real</span>
          <h2 id="bancada-real-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Bancada, técnico identificado e atendimento
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Fotos da nossa operação — sem banco de imagens e sem cenário montado. Atendimento por agendamento em
            Curitiba e região, com coleta quando aplicável.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((f) => (
            <li key={f.src} className="overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={f.src}
                alt={f.alt}
                width={f.width}
                height={f.height}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover"
              />
              <div className="p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {LABEL[f.categoria] ?? "Operação"}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">{f.legenda}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Fotos da própria operação. Nenhum dado de cliente, documento ou tela é exibido.
        </p>
      </div>
    </section>
  );
};

export default BancadaRealSection;
