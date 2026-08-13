import { type ReactNode } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import { FadeIn } from "./FadeIn";

interface AsyncContentProps<T> {
  loading: boolean;
  error?: unknown;
  data?: T[] | T | null;
  /** Esqueleto com a estrutura real do conteúdo (obrigatório). */
  skeleton: ReactNode;
  empty?: ReactNode;
  errorLabel?: string;
  children: ReactNode;
  /** Mantém o conteúdo atual visível durante refetch (listas/tabelas). */
  keepPreviousOnRefetch?: boolean;
}

const isEmpty = (data: unknown) =>
  data == null || (Array.isArray(data) && data.length === 0);

/**
 * Envelope padrão de conteúdo assíncrono: loading (skeleton estrutural),
 * erro, vazio e sucesso — sempre com texto + ícone, nunca só movimento.
 * Em refetch, preserva o conteúdo já renderizado e sinaliza `aria-busy`.
 */
export function AsyncContent<T>({
  loading,
  error,
  data,
  skeleton,
  empty,
  errorLabel = "Não foi possível carregar agora. Tente novamente.",
  children,
  keepPreviousOnRefetch = true,
}: AsyncContentProps<T>) {
  const temConteudo = !isEmpty(data);

  if (loading && (!temConteudo || !keepPreviousOnRefetch)) {
    return (
      <div role="status" aria-busy="true" aria-live="polite">
        <span className="sr-only">Carregando conteúdo…</span>
        {skeleton}
      </div>
    );
  }

  if (error) {
    return (
      <FadeIn className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground" role="alert">
        <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" aria-hidden="true" />
        <span>{errorLabel}</span>
      </FadeIn>
    );
  }

  if (!temConteudo) {
    return (
      <FadeIn className="flex items-center gap-3 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        <Inbox className="h-4 w-4" aria-hidden="true" />
        <span>{empty ?? "Nada por aqui ainda."}</span>
      </FadeIn>
    );
  }

  return (
    <div aria-busy={loading || undefined} data-refetching={loading ? "true" : undefined}>
      {children}
    </div>
  );
}

export default AsyncContent;
