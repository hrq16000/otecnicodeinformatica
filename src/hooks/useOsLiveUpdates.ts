import { useEffect, useRef, useState } from "react";

/**
 * Atualização em tempo quase real do status da OS via SSE, com fallback
 * automático para polling.
 *
 * Regras de robustez:
 *  • sem evento algum em 30s (nem heartbeat) → considera o stream morto;
 *  • erro de conexão, token inválido ou fim de stream → cai para polling;
 *  • aba oculta não dispara atualização (economia de requisições).
 */

const HEARTBEAT_TIMEOUT_MS = 30_000;
const POLL_MS = 45_000;

export type OsLiveMode = "conectando" | "sse" | "polling";

interface Options {
  streamToken: string | null;
  ativo: boolean;
  onUpdate: () => void;
}

export function useOsLiveUpdates({ streamToken, ativo, onUpdate }: Options) {
  const [modo, setModo] = useState<OsLiveMode>("conectando");
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (!ativo) return;

    const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    let fallbackTimer: number | undefined;
    let watchdog: number | undefined;
    let pollTimer: number | undefined;
    let source: EventSource | null = null;
    let encerrado = false;

    const dispararSeVisivel = () => {
      if (document.visibilityState === "visible") onUpdateRef.current();
    };

    const iniciarPolling = () => {
      if (encerrado || pollTimer) return;
      setModo("polling");
      pollTimer = window.setInterval(dispararSeVisivel, POLL_MS);
    };

    const derrubarStream = () => {
      source?.close();
      source = null;
      window.clearTimeout(watchdog);
      iniciarPolling();
    };

    const armarWatchdog = () => {
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(() => {
        console.warn("[os-stream] sem heartbeat, alternando para polling");
        derrubarStream();
      }, HEARTBEAT_TIMEOUT_MS);
    };

    if (!streamToken || !baseUrl || typeof EventSource === "undefined") {
      iniciarPolling();
    } else {
      try {
        source = new EventSource(
          `${baseUrl}/functions/v1/os-stream?t=${encodeURIComponent(streamToken)}`,
        );
        // Se o stream não abrir em 8s, não deixa o cliente sem atualização.
        fallbackTimer = window.setTimeout(() => {
          if (source && source.readyState !== EventSource.OPEN) derrubarStream();
        }, 8000);

        source.addEventListener("ready", () => {
          window.clearTimeout(fallbackTimer);
          setModo("sse");
          armarWatchdog();
        });
        source.addEventListener("ping", armarWatchdog);
        source.addEventListener("update", () => {
          armarWatchdog();
          dispararSeVisivel();
        });
        source.addEventListener("bye", () => {
          console.info("[os-stream] stream encerrado pelo servidor");
          derrubarStream();
        });
        source.onerror = () => {
          console.warn("[os-stream] erro de conexão, alternando para polling");
          window.clearTimeout(fallbackTimer);
          derrubarStream();
        };
      } catch {
        iniciarPolling();
      }
    }

    return () => {
      encerrado = true;
      source?.close();
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(watchdog);
      window.clearInterval(pollTimer);
    };
  }, [streamToken, ativo]);

  return modo;
}
