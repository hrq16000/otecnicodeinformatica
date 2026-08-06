import { useEffect, useState } from "react";

const KEY = "lgpd_consent_v1";

const updateConsent = (granted: boolean) => {
  if (typeof window === "undefined" || !window.gtag) return;
  const v = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
};

export const ConsentBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch {}
    updateConsent(granted);
    setOpen(false);
  };

  if (!open) return null;

  return (
    // Rodada 3P — banner compacto ancorado à esquerda: não cobre o CTA
    // principal nem o botão flutuante de WhatsApp (canto inferior direito).
    <div
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: "12px",
        right: "auto",
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        width: "min(320px, calc(100vw - 108px))",
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
        Usamos cookies para medir audiência.{" "}
        <a href="/termos-e-condicoes" style={{ color: "#fdba74", textDecoration: "underline" }}>Saiba mais</a>.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => decide(false)}
          style={{
            minHeight: 44, padding: "0 14px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,.25)", background: "transparent",
            color: "#fff", fontWeight: 600, cursor: "pointer",
          }}
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          style={{
            minHeight: 44, padding: "0 16px", borderRadius: 10,
            border: "none", background: "hsl(145,63%,42%)",
            color: "#fff", fontWeight: 700, cursor: "pointer",
          }}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
