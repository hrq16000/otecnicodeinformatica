import { useEffect, useState } from "react";
import { getSchemaReport, type SchemaReportEntry } from "@/lib/schemaValidation";

/**
 * Painel dev-only que lista schemas JSON-LD validados na sessão atual,
 * agrupados por endpoint, indicando passed/failed e mensagens de erro.
 * Renderiza nada em produção.
 *
 * Use: monte no App em dev (ou via flag) e veja o badge flutuante.
 */
export const JsonLdDevReport = () => {
  if (!import.meta.env?.DEV) return null;
  const [entries, setEntries] = useState<SchemaReportEntry[]>(() => getSchemaReport());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setEntries([...getSchemaReport()]);
    window.addEventListener("jsonld:report", sync);
    const id = window.setInterval(sync, 1500);
    return () => {
      window.removeEventListener("jsonld:report", sync);
      window.clearInterval(id);
    };
  }, []);

  const byEndpoint = entries.reduce<Record<string, SchemaReportEntry[]>>((acc, e) => {
    (acc[e.endpoint] ||= []).push(e);
    return acc;
  }, {});
  const failed = entries.filter((e) => e.status === "failed").length;
  const passed = entries.length - failed;

  return (
    <div style={{ position: "fixed", bottom: 16, left: 16, zIndex: 99999, fontFamily: "monospace", fontSize: 12 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: failed > 0 ? "#dc2626" : "#16a34a",
          color: "#fff",
          padding: "6px 10px",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        JSON-LD {passed}✓ {failed}✗
      </button>
      {open && (
        <div
          style={{
            marginTop: 6,
            maxWidth: 480,
            maxHeight: 420,
            overflow: "auto",
            background: "#0f172a",
            color: "#e2e8f0",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #334155",
          }}
        >
          {Object.keys(byEndpoint).length === 0 && <div>Nenhum schema registrado ainda.</div>}
          {Object.entries(byEndpoint).map(([ep, list]) => (
            <div key={ep} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: "#7dd3fc" }}>{ep}</div>
              {list.map((e) => (
                <div key={e.scriptId + e.at} style={{ marginLeft: 10, marginTop: 4 }}>
                  <span style={{ color: e.status === "passed" ? "#4ade80" : "#f87171" }}>
                    {e.status === "passed" ? "✓" : "✗"}
                  </span>{" "}
                  <strong>{e.scriptId}</strong>
                  {e.errors.length > 0 && (
                    <ul style={{ margin: "4px 0 0 18px", color: "#fca5a5" }}>
                      {e.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                  {e.warnings.length > 0 && (
                    <ul style={{ margin: "4px 0 0 18px", color: "#fcd34d" }}>
                      {e.warnings.map((w, i) => (
                        <li key={i}>⚠ {w}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JsonLdDevReport;
