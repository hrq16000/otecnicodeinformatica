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
    <div
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: "50%",
        bottom: "16px",
        transform: "translateX(-50%)",
        width: "min(640px, calc(100vw - 24px))",
        background: "rgba(15,23,42,0.96)",
        color: "#fff",
        borderRadius: "14px",
        padding: "14px 16px",
        boxShadow: "0 18px 38px rgba(0,0,0,.35)",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(10px)",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "14px",
        lineHeight: 1.45,
      }}
    >
      <p style={{ margin: 0, marginBottom: 10 }}>
        Usamos cookies para medir audiência e melhorar sua experiência. Você pode aceitar ou recusar.
        Veja nossos <a href="/termos-e-condicoes" style={{ color: "#fdba74", textDecoration: "underline" }}>Termos</a>.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={() => decide(false)}
          style={{
            minHeight: 40, padding: "0 14px", borderRadius: 10,
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
            minHeight: 40, padding: "0 16px", borderRadius: 10,
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
