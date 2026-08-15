import { Link } from "@/lib/router-compat";
import { ArrowUpRight } from "lucide-react";
import { interlinksDe } from "@/lib/interlinksGerados";

/**
 * Bloco de interlinkagem contextual gerado (scripts/generate-interlinks.mjs).
 * Âncoras únicas em todo o site, derivadas do conteúdo curado de cada destino
 * — nunca "clique aqui" nem repetição de âncora entre páginas.
 */
export const InterlinksContextuais = ({ path }: { path: string }) => {
  const itens = interlinksDe(path);
  if (!itens.length) return null;

  const rotulo: Record<string, string> = {
    servico: "Serviço relacionado",
    problema: "Sintoma relacionado",
    bairro: "Atendimento local",
  };

  return (
    <section aria-labelledby="interlinks-contextuais" className="mt-12">
      <h2 id="interlinks-contextuais" className="text-xl font-semibold text-foreground">
        Continue por aqui
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {itens.map((item) => (
          <li key={item.href + item.anchor}>
            <Link
              to={item.href}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                  {rotulo[item.contexto] ?? "Relacionado"}
                </span>
                <span className="text-sm text-foreground">{item.anchor}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InterlinksContextuais;
