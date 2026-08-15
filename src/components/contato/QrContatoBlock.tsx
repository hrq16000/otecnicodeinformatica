import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { MessageCircle, QrCode } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { trackQrCode, trackWaClick } from "@/lib/funnelAnalytics";

interface QrContatoBlockProps {
  /** Ex.: "contato", "bairro-batel", "servico-montagem" */
  location?: string;
  servico?: string;
  bairro?: string;
  mensagem?: string;
  className?: string;
}

function buildWaUrl(params: { servico?: string; bairro?: string; mensagem?: string; location: string }) {
  const q = new URLSearchParams({
    utm_source: "qrcode",
    utm_medium: "offline",
    utm_campaign: "contato_direto",
    utm_content: params.location,
  });
  if (params.servico) q.set("utm_term", params.servico);
  const texto =
    params.mensagem ??
    `Olá! Vim pelo QR Code${params.servico ? ` (${params.servico})` : ""}${
      params.bairro ? ` — ${params.bairro}` : ""
    } e preciso de um técnico.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `${texto}\n\n(origem: ${q.toString()})`,
  )}`;
}

/**
 * QR code rastreável do WhatsApp: útil no mobile (câmera de outro aparelho),
 * em materiais impressos e para quem chega pelo desktop.
 */
export const QrContatoBlock = ({
  location = "contato",
  servico,
  bairro,
  mensagem,
  className = "",
}: QrContatoBlockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url] = useState(() => buildWaUrl({ servico, bairro, mensagem, location }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    void QRCode.toCanvas(canvas, url, {
      width: 176,
      margin: 1,
      color: { dark: "#0b1320", light: "#ffffff" },
    });
    trackQrCode("open", "whatsapp", location);
  }, [url, location]);

  return (
    <section className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="rounded-xl bg-white p-3 shrink-0">
          <canvas ref={canvasRef} aria-label="QR Code para abrir o WhatsApp" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-heading text-lg font-semibold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <QrCode className="h-5 w-5 text-accent" aria-hidden="true" />
            Aponte a câmera e fale agora
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            O QR Code abre a conversa no WhatsApp com a mensagem já preenchida
            {servico ? ` para ${servico}` : ""}
            {bairro ? ` em ${bairro}` : ""}. Cada leitura é identificada por origem, então sabemos
            exatamente de qual página ou material impresso você veio.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackQrCode("scan_hint", "whatsapp", location);
              trackWaClick(`qr-${location}`, { servico: servico ?? null, regiao: bairro ?? null });
            }}
            className="mt-4 inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-6 font-semibold text-accent-foreground"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Abrir WhatsApp neste aparelho
          </a>
        </div>
      </div>
    </section>
  );
};

export default QrContatoBlock;
