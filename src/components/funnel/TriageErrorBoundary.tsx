import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  /** Reinicia a triagem (limpa estado) e fecha/reabre em estado seguro. */
  onReset: () => void;
}

interface State {
  hasError: boolean;
}

/**
 * Error Boundary específico do modal de triagem.
 * Evita que qualquer estado inválido derrube a página inteira e oferece
 * recuperação amigável ("Reiniciar triagem").
 */
export class TriageErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log de desenvolvimento sem dados sensíveis do cliente.
    console.error("[triage] render error:", error.message, info.componentStack?.slice(0, 300));
  }

  private handleReset = () => {
    this.props.onReset();
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <AlertTriangle className="h-8 w-8 text-amber-500" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-foreground">Algo saiu do lugar na triagem</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Podemos recomeçar do zero — suas informações anteriores serão limpas com segurança.
          </p>
        </div>
        <Button onClick={this.handleReset} size="sm" className="gap-2">
          <RotateCcw className="h-4 w-4" /> Reiniciar triagem
        </Button>
      </div>
    );
  }
}

export default TriageErrorBoundary;
