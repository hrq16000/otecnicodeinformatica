import { useState } from "react";
import { Download, FileText, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { whatsappLink } from "@/lib/siteConfig";
import { trackCTAClick } from "@/lib/analytics";
import type { DiagnosticoChecklist } from "@/lib/diagnosticoChecklists";
import { checklistShareMessage, downloadChecklistPdf } from "@/lib/checklistPdf";

/**
 * Bloco de checklist em PDF sob demanda. O arquivo é gerado no
 * navegador no clique — nenhuma rota nova, nenhum formulário,
 * nenhum dado coletado.
 */
export const ChecklistPdfCard = ({ checklist }: { checklist: DiagnosticoChecklist }) => {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    setBusy(true);
    try {
      trackCTAClick("download", `checklist-pdf-${checklist.slug}`);
      await downloadChecklistPdf(checklist);
      toast({
        title: "Checklist gerado",
        description: "O PDF foi baixado no seu dispositivo.",
      });
    } catch {
      toast({
        title: "Não foi possível gerar o PDF",
        description: "Tente novamente ou siga o checklist direto nesta página.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">
          <FileText className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Checklist de diagnóstico rápido em PDF
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {checklist.steps.length} verificações objetivas, os sinais que pedem parada imediata e os
            limites honestos do que dá para concluir sem bancada. Gerado na hora, sem cadastro e sem
            deixar e-mail.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => void handleDownload()} disabled={busy}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Baixar checklist em PDF
            </Button>
            <Button variant="outline" asChild onClick={() => trackCTAClick("whatsapp", `checklist-share-${checklist.slug}`)}>
              <a
                href={whatsappLink(checklistShareMessage(checklist))}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location={`checklist_share_${checklist.slug}`}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Compartilhar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
