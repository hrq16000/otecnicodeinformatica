// @ts-nocheck
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CONSENT_EVENT,
  loadAdsScript,
  readConsent,
  applyConsent,
  saveConsent,
} from "@/lib/consentStore";

export const ConsentBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setOpen(true);
    } else {
      applyConsent(saved);
      if (saved.ads) loadAdsScript();
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === null) setOpen(true);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const decide = (analytics: boolean, ads: boolean) => {
    saveConsent({ analytics, ads });
    setOpen(false);
  };

  // Rodada 3W — publica a altura ocupada pelo banner para que o botão
  // flutuante de WhatsApp suba enquanto ele estiver visível (sem colisão).
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.style.removeProperty("--consent-banner-h");
      root.removeAttribute("data-consent-banner");
      return;
    }
    root.setAttribute("data-consent-banner", "open");
    const apply = () => {
      const h = ref.current?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--consent-banner-h", `${Math.round(h)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--consent-banner-h");
      root.removeAttribute("data-consent-banner");
    };
  }, [open]);

  if (!open) return null;

  const secondaryBtn: React.CSSProperties = {
    minHeight: 44,
    padding: "0 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.25)",
    background: "transparent",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
  };

  return (
    // Rodada 3P — banner compacto ancorado à esquerda: não cobre o CTA
    // principal nem o botão flutuante de WhatsApp (canto inferior direito).
    <div
      ref={ref}
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: "12px",
        right: "auto",
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        width: "min(340px, calc(100vw - 108px))",
        background: "rgba(15,23,42,0.96)",
        color: "#fff",
        borderRadius: "12px",
        padding: "10px 12px",
        boxShadow: "0 14px 30px rgba(0,0,0,.35)",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(10px)",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12.5px",
        lineHeight: 1.4,
      }}
    >
      <p style={{ margin: 0, marginBottom: 8 }}>
        Usamos <strong>cookies opcionais</strong> de análise e anúncios. Mesmo sem aceitá-los, o
        site registra diretamente dados técnicos mínimos das interações no funil de atendimento
        para medir etapas e conversões, sem armazenar IP, nome, telefone ou texto livre.{" "}
        <a
          href="/politica-de-privacidade#telemetria-funil"
          style={{ color: "#7dd3fc", textDecoration: "underline" }}
        >
          Saiba mais
        </a>{" "}
        ·{" "}
        <a
          href="/politica-de-cookies-e-anuncios"
          style={{ color: "#7dd3fc", textDecoration: "underline" }}
        >
          Cookies e anúncios
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => decide(false, false)} style={secondaryBtn}>
          Recusar
        </button>
        <button type="button" onClick={() => decide(true, false)} style={secondaryBtn}>
          Só análise
        </button>
        <button
          type="button"
          onClick={() => decide(true, true)}
          style={{
            minHeight: 44,
            padding: "0 16px",
            borderRadius: 10,
            border: "none",
            background: "hsl(145,65%,28%)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Aceitar tudo
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
