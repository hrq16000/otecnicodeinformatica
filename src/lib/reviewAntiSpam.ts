/**
 * Anti-spam client-side da página /avaliar.
 * Três camadas simples e sem PII:
 *  1. honeypot (campo oculto que humano não preenche);
 *  2. tempo mínimo de permanência antes do submit;
 *  3. trava de duplicidade por protocolo de OS (ou por sessão sem OS).
 * A validação forte continua nas policies do banco (RLS) — isto apenas
 * reduz ruído e envios repetidos acidentais.
 */

const KEY = "review_submitted_v1";
/** Tempo mínimo, em ms, entre abrir o formulário e enviar. */
export const MIN_DWELL_MS = 4000;

function readSent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function submissionKey(protocolo: string): string {
  return protocolo.trim() ? `os:${protocolo.trim().toUpperCase()}` : "sem-os";
}

export function alreadySubmitted(protocolo: string): boolean {
  return readSent().includes(submissionKey(protocolo));
}

export function markSubmitted(protocolo: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = [...new Set([...readSent(), submissionKey(protocolo)])].slice(-50);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage indisponível — segue sem trava local */
  }
}

export type AntiSpamVerdict =
  | { ok: true }
  | { ok: false; reason: "honeypot" | "too_fast" | "duplicate"; message: string };

export function checkAntiSpam(input: {
  honeypot: string;
  openedAt: number;
  protocolo: string;
}): AntiSpamVerdict {
  if (input.honeypot.trim().length > 0) {
    return {
      ok: false,
      reason: "honeypot",
      message: "Não conseguimos validar este envio. Fale com a gente pelo WhatsApp.",
    };
  }
  if (Date.now() - input.openedAt < MIN_DWELL_MS) {
    return {
      ok: false,
      reason: "too_fast",
      message: "Aguarde alguns segundos e envie novamente — é uma verificação simples.",
    };
  }
  if (alreadySubmitted(input.protocolo)) {
    return {
      ok: false,
      reason: "duplicate",
      message: "Já recebemos uma avaliação para este atendimento. Obrigado!",
    };
  }
  return { ok: true };
}
